# Project State

> Session-continuity doc (Opus 4.8 pack convention). Read this + CLAUDE.md
> first in a new session, then the source-of-truth file the task touches. Update
> the "Current state" and "Next task" after every major phase. Keep it factual.

## Current phase

**Forensic audit complete (Prompt 1).** The site is post-elevation and healthy;
this was a fresh current-state pass, not a rescue. No public code changed yet.

## Verified commands (this repo, this session)

- `pnpm check` — typecheck (CI gate). **Passing.**
- `pnpm test` — Vitest, server + client workspaces + ~260-route smoke net (CI
  gate). **274 passed / 72 skipped / 0 failed.**
- `pnpm build` — `vite build` + esbuild server bundle (CI gate). **exit 0.**
- `pnpm lint` — ESLint `--max-warnings 0` (not re-run this pass).
- `pnpm scan:citations` — citation-integrity worklist → `docs/audit-corpus/CITATION-SCAN.md`.

## Definition of Done (for changes to this repo)

A change is done when it is *seen green*, not assumed: `pnpm check` + `pnpm test`
pass; user-facing changes referenced against the palette/token contract; API
procedures land in **both** runtimes (`server/` + `api/index.ts`) with
`api-parity.test.ts` green; content changes clear the Forbidden-Language and
citation rules; report what was run and what was **not** verified.

## Completed work (recent, on main)

- Next-Ten program: 7 of 10 done/covered. 27 commission essays merged; 129
  redirects for retired stubs; `pnpm scan:citations` tool + worklist (PR #395,
  merged `93e0680`); server-side stub guard in both runtimes.
- Two six-week email tracks written + verified (`docs/email-tracks/`), awaiting
  owner load into Mailchimp.

## Current state (2026-07 audit findings)

Gate-green. No P0s. No dead routes. Parity clean. Real actionable items, ranked
in `docs/site-audit.md` and distilled in `docs/roadmap.md`. Highlights:
- **P1** perf: `content-data-*.js` is a 2.7 MB (934 kB gz) monolithic chunk.
- **P1** routing: `/books-store` + `/resources-for-pastors` orphaned behind 301s.
- **P1** SEO: dynamic `SEOMeta` on `/nation/*`, prophetic hubs, doctrine slugs
  isn't prerender-covered; canonical host (www vs apex) mismatch vs CLAUDE.md.
- **P1** brand: token-drift in `StartHereQuiz`, `QuoteLibrary`,
  `FamilyDevotionBuilder`, `ArticleCard`.
- **P2** a11y: mobile-drawer + search-overlay focus management.

## Next task

Owner to greenlight the Prompt-2 execution pass (P1 fixes above), and/or the
still-open Next-Ten machine item (#4 depth analytics). Owner-gated (⛔): Stripe
activation, founder photos, canonical-host decision, `/start` vs `/start-here`,
`DATABASE_URL` in the Vercel build.

## Decisions / lessons for future sessions

- This is a **two-runtime** repo (dev `server/*` vs prod `api/index.ts`);
  procedures must exist in both — respect `api-parity.test.ts`.
- Tokens live in `client/src/index.css :root`; never hardcode hex in components.
- Framer Motion is listed in CLAUDE.md's stack but is **not** actually used in
  `client/src` (doc drift — flagged for correction).
- Three roadmap docs existed; `NEXT-TEN.md` is the live program, `docs/roadmap.md`
  is the reconciled top-level list. `docs/audit/ROADMAP.md` is the elevation-era
  archive.
