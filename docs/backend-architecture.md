# Backend Architecture — LiveWell by James Bell

> A senior-systems view of the backend as it exists today, the scaling risks
> that matter, and the minimal target that gets us there without a rewrite.
> Scope: the API/data tier. The React/Vite client and content-as-data pipeline
> (`scripts/*`, `client/public/*`) are covered in `CLAUDE.md`.

---

## 1. System architecture

LiveWell is a content platform: ~247 essays, 21 books, reading paths, quizzes,
tools, a membership/Stripe path, comments/testimonials, lead magnets, and a
pastor team-collaboration area. Reads dominate by orders of magnitude; writes
are admin- and visitor-form-driven.

```
                     ┌────────────────────────────────────────────┐
   Browser ──────────▶  Vercel Edge (vercel.json)                  │
   (React SPA)        │   • static assets + prerendered heads      │
                     │   • redirects / canonical-host rewrite      │
                     │   • security headers (CSP report-only)      │
                     └───────────────┬────────────────────────────┘
                                     │ /api/*  (rewrite)
                                     ▼
                     ┌────────────────────────────────────────────┐
   PRODUCTION ───────▶  api/index.ts   (Vercel serverless fn)      │
                     │   raw mysql2 + bcrypt + superjson           │
                     │   maxDuration 60s                           │
                     └───────────────┬────────────────────────────┘
                                     │
   DEV / LOCAL ──────▶  server/_core/index.ts  (Express + tRPC)    │
                     │   appRouter → 15 domain routers → server/db │
                     └───────────────┬────────────────────────────┘
                                     ▼
                            MySQL (Drizzle ORM, 27 tables)
```

### The defining fact: a dual runtime

There are **two independent implementations of the same API**:

| | Dev / local | Production (Vercel) |
|---|---|---|
| Entry | `server/_core/index.ts` (Express) | `api/index.ts` (serverless) |
| API layer | tRPC `appRouter` → 15 typed routers | one 1,886-line handler, manual routing |
| Data access | Drizzle ORM (`server/db.ts`, typed) | raw `mysql2` SQL strings |
| Connections | one cached Drizzle client | **new connection per request** (`withConn`) |
| Shared code | — | **none** (`api/index.ts` explicitly imports no `server/*`) |

This is the single most important property of the system, and the biggest
scaling liability. Every endpoint must be written **twice**, in two styles, and
the two drift: procedures can exist in the typed `server/` routers yet be
missing from `api/index.ts`, where they silently 404 in production. That class
of defect is invisible to the client's type checker because the client talks to
tRPC types generated from `server/`, not from the function that actually serves
production.

**Target:** collapse to one source of truth. The tRPC `appRouter` is already
the typed contract; production should run *that*, not a parallel rewrite. The
clean path is to mount `appRouter` behind the Vercel function via the tRPC
fetch/serverless adapter and delete the hand-maintained handlers as each domain
is ported. Until then, a CI parity check (enumerate `appRouter` procedures, diff
against what `api/index.ts` serves) converts silent prod 404s into red builds.

---

## 2. Component structure

The `server/` tier is already mostly layered; the goal is to make that the
*only* tier and apply the layering consistently.

```
server/
  _core/            cross-cutting infra (transport, context, env, cache, llm…)
    trpc.ts         publicProcedure / protectedProcedure, context wiring
    context.ts      auth/session resolution
    cache.ts        ← in-process TTL + SWR + single-flight cache (this PR)
    index.ts        dev Express host
  <domain>-router.ts   transport: validate input, delegate (thin)
  <domain>-service.ts  business logic: pure where possible
  db*.ts               data access: Drizzle queries, one module per aggregate
  routers.ts           appRouter composition (the API contract)
drizzle/schema.ts      single schema, 27 tables
api/index.ts           production host (target: thin adapter over appRouter)
```

Layering rule (dependencies point inward, I/O at the edge):

```
router (transport)  ──▶  service (domain logic)  ──▶  db (data access)
        │                                                  │
        └──────────────── _core (cache, trpc, env) ────────┘
```

The codebase already shows both the good and the bad pattern. Good:
`search-router`/`search-service`, `stripe-router`/`stripe-service`,
`community-router` → `db-community`. Tangled (being unwound):
`quiz-router` recently split into `server/quiz/{questions,quiz-service}` +
a thin router, with the scoring logic now unit-tested without a DB. That split
is the template for the rest.

---

## 3. Data flow

**Read (the hot path — e.g. an article list):**

```
client query ─▶ Vercel fn ─▶ [cache.fetch(key, loader)] ─▶ MySQL
                                   │ hit (fresh)  ─▶ return, no DB
                                   │ hit (stale)  ─▶ return now + refresh async
                                   └ miss         ─▶ single-flight load, cache, return
```

Today the bracketed cache step does not exist: **every read reaches MySQL.**
Section 6 adds it.

**Write (e.g. a new comment):**

```
client mutation ─▶ validate (zod) ─▶ service ─▶ db insert ─▶ side-effects
                                                              (notify owner)
                                                            ─▶ invalidate cache key
```

Writes are the cache's invalidation triggers. Because writes here are rare and
already funnel through service functions, invalidation has exactly one natural
home per aggregate (e.g. on comment approve → drop `comments:post:<id>`).

---

## 4. API design

- **Contract:** tRPC. `appRouter` composes 15 domain routers
  (`system, stripe, email, syndication, search, community, feedSync, sitemap,
  relatedArticles, quiz, leadMagnets, teamCollab, recommendations, analytics`).
  Input validation is `zod` at every procedure; transport is superjson-encoded.
- **AuthZ:** `publicProcedure` vs `protectedProcedure`; admin gating is checked
  inside procedures today (e.g. `ctx.user?.role !== "admin"`). That check is
  duplicated ~8× in `community-router` alone — a cross-cutting concern that
  belongs in an `adminProcedure` middleware built on `protectedProcedure`, so a
  forgotten check can't ship.
- **Public endpoints** outside tRPC: `rss.xml`/`feed`, `sitemap.xml`, and seed
  utilities, routed by `vercel.json` rewrites to the function.
- **Conventions to hold:** thin routers; consistent envelope (`{ success, … }`
  is used in community/search — standardize or drop deliberately, don't mix);
  errors carry a cause; never leak raw DB errors to clients.

---

## 5. Database schema

MySQL via Drizzle ORM, **27 tables**, one schema file (`drizzle/schema.ts`),
migrations in `drizzle/`. Grouped by aggregate:

- **Content:** `posts`, `books`, `resources`, `reading_paths`,
  `reading_path_articles`, `featured_articles`, `related_articles`,
  `author_profiles`, `book_bundles`, `bundle_books`
- **Audience / growth:** `subscribers`, `lead_magnet_signups`,
  `email_campaigns`, `book_purchases`
- **Community:** `comments`, `testimonials`
- **Pastor collaboration:** `teams`, `team_members`, `team_channels`,
  `team_posts`, `team_tasks`, `team_announcements`
- **Platform:** `users`, `site_settings`, `notifications`,
  `admin_notifications`, `files`

Scaling notes:
- **Indexing is the first lever.** Hot filters are `posts.published`,
  `posts.pillar`, `posts.slug`, `posts.subPathway`, and `comments.postId +
  approved`. These should be covered by indexes before any caching is credited
  with a win — verify with `EXPLAIN`.
- **Read amplification:** `listPosts()` selects full bodies; the index path
  correctly uses `listPostsForIndex()` (no body). Keep body reads off list
  endpoints — it is the difference between a 5 KB and a multi-MB response.
- **Connections are the prod ceiling.** `api/index.ts` opens a fresh TLS
  connection per request; managed MySQL caps connections low (often ~100).
  Pooling (§6) is required before traffic grows.

---

## 6. Caching strategy

Today: **none.** Every request hits MySQL; every prod request also pays a fresh
TLS handshake. Two cheap, ordered tiers fix the bulk of it.

### Tier 0 — connection reuse (correctness + latency floor)
Reuse one pooled/cached connection across warm invocations instead of
`withConn`'s per-request connect/close. `api/index.ts` already proves the
pattern with `withPubConn` (a cross-invocation cached connection with a
liveness `SELECT 1` and reconnect-on-fatal). Generalize it to all reads. This
removes the per-request handshake and protects the connection cap.

### Tier 1 — in-process read cache (this PR: `server/_core/cache.ts`)
A dependency-free `TTLCache` sized for serverless warm instances:

- **TTL** bounds staleness (e.g. article lists 60 s, site settings 300 s).
- **Stale-while-revalidate** serves the last good value instantly and refreshes
  in the background, so an expired key never parks a user behind a slow query.
- **Single-flight** collapses concurrent misses into one loader call —
  stampede protection when a popular key expires under load.
- **LRU bound** keeps a warm instance's memory finite.

Adoption is a one-line read-through at the call site, e.g.:

```ts
import { createCache } from "./_core/cache";
const published = createCache<Post[]>({ ttlMs: 60_000, staleMs: 60_000 });

// instead of: await listPosts(true)
const posts = await published.fetch("all", () => listPosts(true));
```

Invalidation is explicit and local: content mutations call `published.delete("all")`.
The primitive ships **fully tested but unwired** — it changes no current
behavior. Wiring is a deliberate, per-endpoint follow-up so cache-invalidation
semantics get reviewed where correctness matters.

### Tier 2 — shared cache (when one instance isn't enough)
The same `fetch(key, loader)` seam fronts Redis/Upstash with zero call-site
changes once concurrency outgrows per-instance memory or cross-instance
coherence is required. HTTP-layer `Cache-Control` / Vercel CDN caching on
public GET routes (RSS, sitemap, OG) is the cheapest win of all and is
orthogonal to the above.

---

## 7. Production-ready implementation (this PR)

Shipped:
- `server/_core/cache.ts` — the Tier-1 primitive above. No dependencies; works
  identically in the Express dev host and the serverless function.
- `server/cache.test.ts` — 9 tests covering TTL, single-flight (stampede),
  stale-while-revalidate, LRU eviction, and error pass-through. Runs without a
  database, so it executes in CI on every push.

Deliberately **not** shipped here (sequenced, higher blast radius):
1. Mount `appRouter` in `api/index.ts` and retire the parallel handlers — the
   structural fix for the dual runtime. Land per-domain behind a CI parity gate.
2. Generalize `withPubConn`-style connection reuse to all read paths.
3. `adminProcedure` middleware to centralize the duplicated admin check.
4. Verify hot-filter indexes with `EXPLAIN`.

### Roadmap (minimal, in dependency order)

| Stage | Change | Payoff | Risk |
|------|--------|--------|------|
| 0 | CI parity gate (router procedures vs `api/index.ts`) | prod 404s become red builds | none |
| 1 | Connection reuse on all reads | latency + connection-cap headroom | low |
| 2 | Adopt Tier-1 cache on hottest reads | DB load drop, stampede safety | low |
| 3 | Port domains onto `appRouter` in prod, delete duplicates | one source of truth | medium, staged |
| 4 | CDN `Cache-Control` on public GETs; Redis if needed | edge offload, multi-instance | low |

The throughline: **one API contract, reads cached and pooled, writes that
invalidate locally.** None of it requires a rewrite — each stage is independently
shippable and independently verifiable.
