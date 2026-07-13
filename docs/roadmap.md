# LiveWell — Roadmap

> Reconciled 2026-07. This is the top-level, current roadmap. It supersedes the
> old PR #102 / `charming-cori` version that used to live here. Two companions:
> **`NEXT-TEN.md`** is the detailed program (the board's ten recommendations,
> 7/10 done); **`docs/audit/ROADMAP.md`** is the archived site-elevation plan.
> New fix items below come from `docs/site-audit.md` (the 2026-07 forensic pass).

Status: ☐ not started · ◐ in progress · ☑ shipped · ⛔ owner-gated

## The live program — see `NEXT-TEN.md`

- ☑ 27 commission essays; stub triage + 129 redirects; citation scan tool.
- ◐ Email discipleship tracks written — ⛔ owner loads into Mailchimp.
- ☐ **#4 Depth analytics** — scroll-to-finish, reading-path completion, return
  visits, essay→book clickthrough + owner dashboard (biggest open machine item).
- ☐ #8 Unify assessments into one "Where are you actually?" spine.
- ☐ #9 Answer-engine surface — JSON-LD per essay, denser internal linking.
- ⛔ #5 Stripe activation (`docs/GO-LIVE-PAYMENTS.md`) · #6 founder photos.

## Audit fixes — 2026-07 (from `docs/site-audit.md`)

Ordered by leverage. No P0s surfaced.

### P1
- ~~Perf: split `content-data`~~ — **rejected on verification.** The 2.7 MB
  chunk is a *lazy, admin-only* dynamic import (`AdminDashboard` only); public
  readers never load it (they use tRPC). No refactor warranted.
- ☑ **Routing: orphaned pages retired** — removed the `/books-store` +
  `/resources-for-pastors` routes/imports and deleted the orphaned components;
  the 301s to `/books` / `/for-pastors` stay.
- ~~SEO: prerender the dynamic-meta routes~~ — **rejected on verification.**
  Running `prerender-heads.mjs` reports **0 uncovered routes**; `/nation/*`, the
  prophetic hubs, etc. are already covered by the curated `STATIC_PAGES` block.
  Only `:slug` param routes remain client-rendered, by design.
- ◐ **Brand: tokenize the four drift files** — ☑ `ArticleCard.tsx`
  (`bg-[#2D4A3E]` → `var(--pillar-justice)`). ☐ `StartHereQuiz.tsx` +
  `tools/QuoteLibrary.tsx` off-palette category hues (design call: keep + token,
  or re-treat on-brand). ☐ `tools/FamilyDevotionBuilder.tsx` `#FFFFFF` cards →
  `var(--card)` (a dark-mode fix — needs browser verification before shipping).
- ☑ **SEO: canonical host settled** — `www` confirmed canonical (apex 301s to
  it, per `vercel.json` + the Vercel project); code was already correct, CLAUDE.md
  aligned.

### P2
- ◐ ☑ Deduped `vercel.json` (`complicity-not-innocence` was listed twice).
  ☐ Remove the dead SPA redirect components (`/articles`, `/for-families`,
  `/quiz`) — deletes components, so left for the owner's redirect-or-keep call.
- ☐ A11y focus management: mobile drawer + search overlay (focus trap,
  move-in/restore, `aria-controls`/`role="dialog"`).
- ☑ `Person` schema on `/about` — already present inline (the audit finding was
  overstated); enrichment optional, no fabrication.
- ☑ Derived the two hardcoded `www` `/about` URLs from `SITE_URL` (comparison pages).
- ☐ OG coverage for `/how-tos/:slug`, `/table/:slug`, wisdom, `/read/:slug`.
- ☑ Doc fix: removed Framer Motion from CLAUDE.md stack (0 imports in `client/src`).
- ⛔ Confirm `DATABASE_URL` is exposed to the Vercel **build** (sitemap + DB
  prerender heads); confirm `/start` vs `/start-here` canonical.

## If you do only three things
1. Greenlight #4 depth analytics — so you can *see* the corpus working.
2. Load the two email tracks into Mailchimp (written + verified; ~10 min each).
3. The owner keys: activate Stripe, send 3–4 founder photos.

(The audit's headline perf/SEO items were rejected on verification — the site is
in better shape than the first-pass findings implied.)
