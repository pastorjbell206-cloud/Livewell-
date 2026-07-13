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
- ☐ **Perf: split `content-data`** (2.7 MB / 934 kB gz single chunk). Load only
  the essays a page needs, or move listing/detail behind the API. Measure LCP.
- ☐ **Routing: resolve the orphaned pages** — `/books-store` and
  `/resources-for-pastors` render live components but are 301-shadowed. Redirect
  **or** keep, not both.
- ☐ **SEO: prerender the dynamic-meta routes** — give `/nation/*` (10 essays),
  the `/justice` + `/disruption` hubs, and `/theology/doctrine/:slug` literal /
  prerender-resolvable `SEOMeta` so they stop unfurling as the homepage.
- ☐ **Brand: tokenize the four drift files** — `StartHereQuiz.tsx`,
  `tools/QuoteLibrary.tsx`, `tools/FamilyDevotionBuilder.tsx`, `ArticleCard.tsx`
  (`bg-[#2D4A3E]` → token).
- ⛔ **SEO: settle the canonical host** — code is all `www.`; CLAUDE.md writes
  the apex. Confirm Vercel's primary host, then align code + doc.

### P2
- ☐ Dedupe `vercel.json` (`complicity-not-innocence` listed twice); remove the
  dead SPA redirect components (`/articles`, `/for-families`, `/quiz`).
- ☐ A11y focus management: mobile drawer + search overlay (focus trap,
  move-in/restore, `aria-controls`/`role="dialog"`).
- ☐ Add a top-level `Person` schema on `/about`.
- ☐ OG coverage for `/how-tos/:slug`, `/table/:slug`, wisdom, `/read/:slug`.
- ☐ Doc fix: CLAUDE.md lists Framer Motion but it's not used in `client/src`.
- ⛔ Confirm `DATABASE_URL` is exposed to the Vercel **build** (sitemap + DB
  prerender heads); confirm `/start` vs `/start-here` canonical.

## If you do only three things
1. Split `content-data` (the one big, measurable perf win).
2. Resolve the orphaned pages + prerender the dynamic-meta routes (SEO integrity).
3. Greenlight #4 depth analytics — so you can *see* the corpus working.
