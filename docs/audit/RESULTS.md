# RESULTS — Site Elevation Program, measured close

> Section 5.2 of the playbook: the re-baseline. Same method as
> `00-baseline.md` — Lighthouse (default mobile emulation + throttling,
> one run per page, ±3 noise), axe via `@axe-core/playwright` (WCAG 2.1
> A/AA, node counts), `vite build` stats — run against the final build of
> branch `site-elevation` (through HS-7). Honest column included: what
> did not improve, and why.

## 1. Lighthouse, the same five pages

| Page | Perf (was → now) | A11y | SEO | Speed Index (was → now) | CLS |
|---|---|---|---|---|---|
| Home | 84 → **87** | 98 → 98 | 100 → 100 | 19.2 s → **2.1 s** | 0.000 → 0.000 |
| /writing | 84 → **85** | 98 → 98 | 100 → 92* | 20.4 s → **2.2 s** | 0.000 → 0.000 |
| /babylon | 67 → **79** | 100 → 100 | 100 → 92* | 21.2 s → **2.1 s** | 0.000 → 0.000 |
| /tools/theology-quiz | 83 → **85** | 98 → 98 | 100 → 100 | 20.6 s → **2.1 s** | 0.000 → 0.000 |
| /tools/life-audit | 81 → **81** | **90 → 100** | 100 → 92* | 21.0 s → **2.2 s** | 0.000 → **0.022** |

\* The SEO 92s are a measurement artifact of this local method: the
prerendered pages now carry canonicals pointing (correctly) at the
production domain, which Lighthouse cannot validate from `localhost`.
In production the canonical matches the served URL.

**The number that matters most is not in the table.** The Lighthouse
*observed* trace (real browser, before throttling simulation): first
paint was **~13.9 seconds** at baseline — blank cream — on every page.
It is now **60–105 ms** (the static masthead shell), with observed LCP
at 0.2–1.5 s. The *simulated* LCP column (2.5→4.0 s range on lazy
routes) moved the other way because the lantern model prices the
cache-stable vendor-react split as an extra request chain link; the
chunk is modulepreloaded and loads in parallel in real browsers. Both
facts stated; the observed trace is the reader's experience.

**What did not improve:** /tools/life-audit gained 0.022 CLS (was a
perfect 0.000) from the self-hosted font swap landing post-paint; the
fix — a metric-adjusted fallback face — is deferred rather than shipping
invented font metrics. TBT on /babylon rose from a trivial base (178 ms
baseline → 150 ms now; within noise across runs).

## 2. Bundle & build

| Metric | Baseline | Now |
|---|---|---|
| Total JS emitted | **17.90 MB** across 627 chunks | **~6.5 MB** across 301 chunks |
| Eager entry chunk | 862 kB raw / 262.7 kB gz | **358 kB raw / 96.5 kB gz** |
| React runtime caching | re-downloaded on every deploy (inside entry) | stable `vendor-react` chunk, modulepreloaded |
| Shiki grammars / KaTeX / mermaid in dist | ~14 MB (emacs-lisp alone 762 kB) | **0** |
| Fonts | Google Fonts (third-party, blocking, GDPR IP disclosure) | self-hosted subsets, preloaded, zero external requests |
| Build wall time | 27.4 s | **6.6–18 s** |
| Prerendered route heads | ~215 (13 curated + libraries + DB) | **609** (148 extracted from component SEOMeta + 4 new library families + curated) |

## 3. Accessibility (axe, WCAG 2.1 A/AA, node counts)

| Page | Baseline | Now |
|---|---|---|
| All five pages combined | 1 serious rule × 14 nodes (+2 hero contrast nodes found in QW-7) | **0 violations, 0 nodes** |

## 4. Tests

| Metric | Baseline | Now |
|---|---|---|
| Client-side tests | **0** (across 243 pages, 52 tools, the checkout path) | **30** (11 money-path contracts, 19 helper contracts) + the ~260-route render-smoke net |
| Server tests | 232 passing / 72 DB-skipped | unchanged, still green |
| Suite duration | 5.4 s | ~80 s (72 s of it is the smoke net earning its keep) |

## 5. The trust ledger (not measurable by Lighthouse)

- Every fake email-capture form now posts to the real list; every
  "we'll send it" promise reduced to what the system actually does.
- Invented statistics, testimonials, and discount sequences deleted or
  quarantined behind do-not-ship headers; the two stats that survive are
  attributed on-page to their real sources.
- ~50 silent failure modes made visible and recoverable: copy buttons
  that only say "Copied" when true; loaders that offer Try-again instead
  of spinning forever; storage that says "Couldn't save to this browser"
  instead of losing sermon prep silently.
- The money path is contract-tested: a buyer on hotel wifi is told
  "your payment stands," never "no purchase found."
- The heaviest reader sessions (24-answer assessments, 90-answer
  instruments) survive refresh and can be revised non-destructively;
  pastoral-care records export out of the browser.
- 33 voice violations cleared against the canon; 26 sealed pages joined
  the link graph; every shared link unfurls as itself.

## 6. Deploys

Ten hours of red deploys traced to one line (the sitemap guard firing on
preview builds — my own change, own commit `397bb02` tells the story).
Since the fix: **nine consecutive green deploys**; the branch preview is
live and current.
