# ADR 0001: Canonical Backend Architecture (api/ vs server/)

- Status: PROPOSED (awaiting owner decision)
- Date: 2026-06-03
- Deciders: James Bell (owner)

## Context

The repository contains TWO backend implementations:

1. **`api/index.ts`** — a single ~1,535-line Vercel serverless function. Requests are
   routed by a 64-case `switch` on a tRPC-style procedure path. Uses `mysql2` directly
   with parameterized queries, `bcryptjs` for passwords, and HMAC-signed session cookies
   via `node:crypto`. It imports `superjson` to match the tRPC wire format. This is what
   `vercel.json` deploys: all `/api/*` (including `/api/trpc/*`) requests rewrite to it.

2. **`server/`** — ~77 files implementing a tRPC API: an `appRouter` (`server/routers.ts`)
   that mounts 13 feature routers, plus a `_core` infrastructure layer. This tree is richer
   than `api/` but does NOT appear to be wired into the Vercel deployment.

The 20 server-side test files (`server/*.test.ts`) test the `server/` code — i.e. they
validate code that is not served in production, while the deployed `api/index.ts` has
effectively no direct test coverage. The README also describes the stack as
"tRPC + Drizzle ORM," but `api/index.ts` uses raw mysql2 and custom HMAC sessions.

## Decisive evidence: what the live frontend actually calls

Network capture on the live site (`www.livewellbyjamesbell.co`) shows the frontend
issuing tRPC HTTP batch requests, e.g.:

```
GET /api/trpc/posts.listPublished?batch=1&input=<superjson>
```

So the frontend speaks the **tRPC wire protocol**, and `api/index.ts` is a hand-written
re-implementation of that same contract (its switch cases ARE the tRPC procedure paths).
Conclusion: `server/` is the original/proper tRPC router; `api/index.ts` is a drifted
re-implementation of the same contract that dropped several features. They are not
"tRPC vs non-tRPC" — they are two implementations of ONE tRPC contract.

## Feature coverage comparison

Deployed `api/index.ts` namespaces (12 namespaces, ~48 endpoints):
auth, posts, books, resources, community (comments + testimonials), quiz, feedSync,
notifications, adminNotifications, settings, subscribe, subscribers.

`server/` appRouter mounts (13 sub-routers): system, stripe, email, syndication, search,
community, feedSync, sitemap, relatedArticles, quiz, leadMagnets, recommendations,
analytics — plus inline posts/books/resources/auth procedures.

### Present in `server/` but MISSING from deployed `api/`
- **stripe** — checkout sessions, purchase history, book prices, sales stats
- **analytics** — trackView, trackConversion, getMetrics, getTrending, funnel, referrals
- **search** — search endpoints (4 procedures)
- **recommendations** — recommendation engine (3 procedures)
- **relatedArticles** — related-article lookup
- **leadMagnets** — signup, stats
- **email** — email sequence handling
- **syndication** — content syndication
- **sitemap** — server-generated sitemap

### In BOTH (parity to verify)
auth, posts, books, resources, community, quiz, feedSync.

### Only in deployed `api/`
notifications, adminNotifications, settings, subscribe, subscribers.

## Decision (PROPOSED — choose ONE)

**Option A — `api/index.ts` is canonical; retire `server/`.**
Port the missing features into `api/index.ts`, repoint tests at deployed code, delete
`server/`. Pros: matches what's deployed; one file; no infra change. Cons: large untyped
file (~93 `any`); manual re-port loses tRPC type-safety; high effort to re-add features.

**Option B — `server/` (tRPC) is canonical; deploy it.**
Add a tRPC adapter entrypoint (e.g. `api/trpc/[trpc].ts`) that serves the existing
`appRouter`, migrate the few `api/`-only namespaces (notifications, settings, subscribe,
subscribers) into routers, then delete `api/index.ts`. Pros: richer features already built
and tested; full type-safety; frontend already speaks this contract. Cons: infra change +
careful auth/session migration; must verify every deployed endpoint keeps working.

## Recommendation

**Option B.** The frontend already calls the tRPC contract, the `server/` routers are the
more complete and already-tested implementation, and `api/index.ts` is the drifted stopgap
that dropped features. Deploying `server/` restores stripe/analytics/search/recommendations
and re-aligns the test suite with production. Migrate carefully and verify auth parity.

## Consequences

- Until resolved, do not add backend features to `api/index.ts` and `server/` in parallel.
- The test suite's value is currently misleading; fixing the split restores it.
- README / CLAUDE.md must be updated to describe the real stack once decided.

## Verification steps before acting

1. Diff every deployed `api/index.ts` switch case against the matching `server/` procedure
   to ensure behavioral parity before cutover.
2. Inventory env vars each backend expects (DATABASE_URL, JWT_SECRET, ADMIN_PASSWORD_HASH,
   STRIPE_SECRET_KEY) and ensure parity.
3. Confirm session cookie format is compatible (or plan a forced re-login at cutover).
4. Stand up Option B on a Vercel preview and run the full README test checklist before merge.
