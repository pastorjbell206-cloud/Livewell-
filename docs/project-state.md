# Project State

> Session-continuity doc (Opus 4.8 pack convention). Read this + CLAUDE.md
> first in a new session, then the source-of-truth file the task touches. Update
> the "Current state" and "Next task" after every major phase. Keep it factual.

## Current phase

**Launch gate complete (Prompt 14).** PRs #395/#396/#421 merged; the final
adversarial review ran against the full parallel-merge wave (five fresh-context
reviewers + all gates) — no P0s; verified P1s fixed (BookPreview dialog
keyboard contract, SR-invisible selection state in WhichLens/RuleOfLife, the
emergency-unpublish redeploy requirement now mandatory in the runbook); the P2
punch list is recorded in `docs/final-qa-report.md`. One reviewer P1 was
rejected on verification (ShoppingCart is dead code). Gates on the final tree:
check clean, build exit 0, 288 passed / 0 failed.

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

## Current state (post-execution, 2026-07)

Gate-green (285 tests, 0 failed). No P0s. No dead routes. Parity clean. The
audit's P1 set is **closed**, each line resolved one of three ways (full detail
in `docs/site-audit.md`):
- **Fixed:** ArticleCard token-drift (`--pillar-justice`); JSON-LD `/about`
  URLs derive from `SITE_URL`; `vercel.json` redirect dedupe; mobile-nav
  `aria-controls`; orphaned `/books-store` + `/resources-for-pastors` retired.
- **Decided with evidence:** canonical host is `www` (apex 301s to it, verified
  against the Vercel project); CLAUDE.md aligned.
- **Rejected on verification (do not "fix"):** the 2.7 MB `content-data` chunk
  (lazy, admin-only — readers never load it); the "uncovered SEOMeta" routes
  (prerender reports 0 uncovered); the "missing" `/about` Person schema
  (present); the reading-path "consolidation" (`/reading-paths` and
  `/pathways` are two intentional features).

Next-Ten #4 (depth analytics) is **complete** — all four metrics emit to
Vercel Analytics. PR #421 adds config-safe monthly/annual membership checkout.

## Next task

Merge PR #421 when green (standing owner directive: publish). After that, the
open work is owner-gated or browser-dependent: Stripe activation (paste the
Price ID(s) in Admin → Site Settings, then one live annual test purchase),
founder photos, Mailchimp tracks (owner-deferred), `/start` vs `/start-here`
canonical choice, `DATABASE_URL` in the Vercel build, and the two
browser-verified P2s (mobile-drawer focus trap, FamilyDevotionBuilder
dark-mode cards).

## Decisions / lessons for future sessions

- This is a **two-runtime** repo (dev `server/*` vs prod `api/index.ts`);
  procedures must exist in both — respect `api-parity.test.ts`.
- Tokens live in `client/src/index.css :root`; never hardcode hex in components.
- Framer Motion is listed in CLAUDE.md's stack but is **not** actually used in
  `client/src` (doc drift — flagged for correction).
- Three roadmap docs existed; `NEXT-TEN.md` is the live program, `docs/roadmap.md`
  is the reconciled top-level list. `docs/audit/ROADMAP.md` is the elevation-era
  archive.
