# Backend Unification Plan — LiveWell

> Status: **proposal for review.** No code or database change is implied by this
> document. Nothing here runs until James signs off.

## Why this exists

LiveWell currently runs **two independent backends that do not share code**, and
this is the root cause of most "it's hard to manage / it broke in production but
worked locally" problems.

| | Development (`pnpm dev` / `pnpm start`) | Production (Vercel) |
|---|---|---|
| Entry | `server/_core/index.ts` (Express) | `api/index.ts` (one 1,500-line function) |
| API | tRPC router `server/routers.ts` | hand-written `switch` re-implementing a subset |
| Data access | Drizzle ORM, typed schema | raw `mysql2` SQL strings |
| Auth | OAuth + `users` table + `role` | single `ADMIN_PASSWORD_HASH` + hand-rolled HMAC cookie |
| Search, reading paths, files, recommendations, lead magnets, analytics | implemented | **absent** (unknown procedures silently return `[]` or 404) |
| Post storage | `posts` table | reads `posts`, **falls back to an orphan `articles` table** that is not in the Drizzle schema or any migration |

**Consequences we have already seen in the commit history:**
- `fix(writing): point essay index at posts.listPublished (was 404ing on listForIndex)` — a procedure that existed in tRPC but not in the production function.
- Every new feature must be written twice (once in Drizzle/tRPC, once in raw SQL) or it will not appear in production.
- The richer fields the dev API returns (`audience`, `coverImage`, `format`, etc.) do not exist in the production query, so anything depending on them silently breaks in prod (this is why `ForPastors`/`ForLeaders` could not move to the slim endpoint).

The goal: **one backend, one data model, one auth model.**

---

## Recommended target

**Deploy the existing tRPC `appRouter` as a single Vercel serverless (Node) function and delete `api/index.ts`.**

The tRPC layer is already the better-engineered side: typed, validated (zod),
with correct `adminProcedure`/`protectedProcedure` guards and real feature
coverage (search, reading paths, etc.). The hand-written function exists only
because it was a quick way to ship on Vercel. tRPC has a first-class fetch/Node
adapter that runs fine on Vercel functions.

Rejected alternative: *keep the hand-written function but code-generate it from
the tRPC layer.* More moving parts, no real upside over just deploying tRPC.

---

## The hard part: `posts` vs `articles`

Before any unification, the data must be reconciled. Production reads from BOTH
a `posts` table and an `articles` table; the schema/ORM only knows `posts`.

**Step 0 — investigate (read-only, do first):**
1. `SELECT COUNT(*) FROM posts; SELECT COUNT(*) FROM articles;`
2. Compare slugs: which rows exist in `articles` but not `posts`, and vice-versa.
3. Determine which table the live site is actually serving from (instrument
   `trpcListPosts` / check which branch returns rows in prod logs).
4. Diff the column sets of the two tables.

**Step 1 — decide the canonical table.** Almost certainly `posts` (it is the
ORM-managed one with the migration history). `articles` is treated as legacy.

**Step 2 — backfill.** Write an idempotent migration script (in `scripts/`,
run once against a backup first) that copies any `articles` rows missing from
`posts` into `posts`, mapping columns, deduping on `slug`. Keep `articles`
intact (do not drop yet) as a safety net.

**Step 3 — freeze `articles`.** Point all reads at `posts` only; remove the
silent `catch → query articles` fallback.

**Step 4 — drop `articles`** only after a sober period (e.g. 2–4 weeks) with no
regressions and a verified backup.

---

## Phased rollout (each phase independently shippable + reversible)

**Phase A — Make the tRPC server deployable on Vercel (no behavior change).**
- Add `api/trpc/[trpc].ts` (or `api/[...trpc].ts`) that mounts `appRouter` via
  the tRPC fetch/Node adapter, reusing `server/_core/context.ts`.
- Keep `api/index.ts` in place but route only the non-tRPC endpoints
  (`/rss.xml`, `/api/sitemap.xml`, `/api/og`) to their handlers; route
  `/api/trpc/*` to the new tRPC function via `vercel.json`.
- Provide `DATABASE_URL` + auth secrets to the function. Verify in a Vercel
  **preview** deploy that the homepage, an essay, search, books, and reading
  paths all load from the tRPC function.

**Phase B — Reconcile data** (Steps 0–3 above) in preview, against a copy of
prod data.

**Phase C — Unify auth.** Pick one model. Simplest that preserves current admin
UX: keep the single-admin bcrypt + signed-cookie scheme but move it behind a
tRPC `authProcedure`/context (so it is the same code path the rest of the API
uses), and apply the C1/C2 hardening from the security audit (separate
`SEED_KEY`, header-only, constant-time, remove seed endpoints from the
deployed surface). If multi-user/OAuth is desired later, the `users`/`role`
table is already there.

**Phase D — Cut over & delete.** Route ALL `/api/*` to the tRPC function (plus
the three static handlers), delete `api/index.ts`, delete the raw-SQL
re-implementations. Add `api/` to CI typecheck (already done) and add a smoke
test that hits the deployed tRPC endpoint.

**Phase E — Decommission `articles`** (Step 4) and remove the orphan-table code.

---

## Verification & rollback

- **Each phase ships to a Vercel preview first**, validated against a prod-data
  copy, before promotion.
- **Contract tests:** add tests that call the deployed tRPC endpoint for the
  hot procedures (`posts.listForIndex`, `posts.getBySlug`, `search.global`,
  `books.listPublished`, `relatedArticles.getRelated`) and assert shape.
- **Rollback:** because `api/index.ts` is kept until Phase D, reverting a
  `vercel.json` rewrite restores the old backend instantly. The `articles`
  table is not dropped until Phase E, so data is recoverable throughout.
- **Backups:** a full DB dump before Phase B and before Phase E.

---

## Effort & sequencing

- Phase A: ~1–2 focused days (adapter + routing + preview verification).
- Phase B: depends entirely on what Step 0 reveals about `posts` vs `articles`.
- Phases C–E: ~1–2 days plus the soak period before dropping `articles`.

This is the highest-leverage "make it manageable" change on the board: once it
lands, the admin editor writes to the same model production reads, new features
are written once, and a clean editor (image upload via the existing S3 presign,
scheduling, drafts) becomes straightforward.

## What I need from you to start

1. Approval to run the **read-only Step 0 investigation** against the database.
2. Confirmation of where prod's `DATABASE_URL` points and whether a
   preview/staging database (or a safe copy) is available.
3. A preference on auth: keep single-admin (fastest) or move to multi-user now.
