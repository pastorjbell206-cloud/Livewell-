# The Site Elevation — one page

> Section 5.3 of the playbook. What changed, what it means, what to do
> next. Full detail: `ROADMAP.md` (the plan), `QA-REPORT.md` (the
> regression pass), `RESULTS.md` (the measured before/after).

## What happened

Nineteen audits produced a ranked roadmap; then thirty Quick Wins and the
first seven High-Impact Structural items were executed, verified, and
deployed — 30+ commits on `site-elevation` (PR #298), each one gated by
typecheck, tests, build, lint-parity, and voice/brand sweeps, with
Playwright hand-drives for the flows that matter.

## What a reader feels

- **The site appears in 60–105 ms** where it was ~14 seconds of blank
  cream on a slow phone. Speed Index fell from ~20 s to ~2.1 s.
- **Nothing lies anymore.** Fake forms post to the real list; "Copied"
  means copied; loaders fail visibly with a way forward; a buyer on bad
  wifi is told "your payment stands." Invented statistics and
  testimonials are gone or quarantined.
- **Long work survives.** The 24-answer assessments and 90-answer
  instruments persist through refresh, results screens gained a
  non-destructive "Change my answers," pastors' single-slot tools got
  named saved copies, and care records export out of the browser.
- **Every shared link unfurls as itself** — 609 routes carry their own
  title, description, and card (was ~215, with ~150 unfurling as the
  homepage). Twenty-six purpose-built pages joined the link graph.
- **Zero WCAG A/AA violations** on the audited pages (was 16 nodes).

## What an engineer inherits

- 13.5 MB less JavaScript (17.9 → 6.5 MB; entry 263 → 96 kB gz), fonts
  self-hosted, React runtime in a deploy-stable cached chunk.
- A client test harness where there was none: money-path contracts,
  helper contracts, and a ~260-route render-smoke net proven able to
  catch a planted failure — the safety net every future consolidation
  stands on.
- Four shared helpers (`lib/clipboard`, `lib/storage`, `lib/fetch-json`,
  `components/LoadFailed`) and one `components/Markdown` — the estate's
  failure behavior is now consistent by default.
- Docs that tell the truth (design-system, architecture, voice all
  reconciled to the code) and a prerender that reads each page's own
  SEOMeta.

## The three highest-value next items (from the standing roadmap)

1. **HS-11 — Record purchases + give the buyer a next step.** Money
   changes hands and the platform keeps no durable record and offers no
   follow-on; the highest-trust moment on the site is currently its most
   under-built. (Pairs with LT-8 durable purchase infrastructure.)
2. **HS-10 — Signup unification on the Substack-completion pattern.**
   Every list signup should complete the way the one real channel
   completes; this is the top conversion-integrity item left.
3. **HS-12 — Dark-mode repair + hex tokenization.** The remaining
   user-visible dark-mode defects and stray hexes; finishes the brand
   contract the tokens promise.

Owner actions still open (blocking specific wins, not the program):
expose `DATABASE_URL` to the Vercel build (production sitemap + DB
prerender heads), set `SEED_KEY`, re-stage CSP enforcement and the
frozen lockfile (both proven innocent of the deploy failures), and the
roadmap's named decisions (/start vs /start-here, ESP choice, PWA).
