# QA Report — Site Elevation Program

> Section 5.1 of the elevation playbook: the regression pass. What was
> verified, how, and what is knowingly left open. Written at the close of
> the execution program (Quick Wins 1–30 + Structural HS-1…HS-7), branch
> `site-elevation`, PR #298. Method for every number: watched runs, never
> assumed — commands and counts below are from this session's actual output.

## 1. The standing gates (every commit)

| Gate | Method | State at close |
|---|---|---|
| Typecheck | `pnpm check` (tsc --noEmit) | Clean on every landed commit |
| Tests | `pnpm test` (two vitest projects since HS-3) | **262 passed / 72 DB-skipped / 0 failed** |
| Build | `vite build` | Green; 6.6–18 s (was 27.4 s at baseline) |
| Full deploy chain | vercel.json's exact command sequence, run locally incl. `VERCEL=1 VERCEL_ENV=preview` | Green end-to-end |
| Lint discipline | eslint per changed file, **parity-proven against HEAD** (stdin or temp-copy comparison) | Zero new findings introduced by any batch; three interim regressions were caught *by this comparison* during work and fixed before commit |
| Voice/brand sweeps | grep of every diff's added lines | Zero forbidden words, zero exclamation points in copy, zero new hardcoded hex |

## 2. The client test net (new in this program)

- **Money-path contracts (11 tests):** BuyEbookButton (success redirect,
  503 email fallback, 5xx "Nothing was charged", 4xx passthrough, network
  failure, in-flight disable) and EbookThankYou (missing/paid/unpaid/
  network-error states; Try-again re-verifies to paid; failed download
  shows recovery, never a dead click).
- **Helper contracts (19 tests):** clipboard honesty on every path,
  guarded storage (corrupt/wrong-shape/quota/sessionStorage), fetchJson's
  three throw conditions.
- **Route smoke net (~260 routes, ~72 s):** renders the real `<App/>`
  offline at every path in the route table; passes only when the actual
  page mounts past the Suspense fallback with visible content and no
  ErrorBoundary. **Proven able to fail:** a deliberately planted throw
  was caught and named by route, then reverted. Ran green after every
  structural batch, including the new `/faq` route it discovered itself.

## 3. Hand-driven end-to-end checks (real built app, Playwright)

- **HS-1 (markdown swap):** three surfaces byte-identical in rendered
  text; `/babylon` pixel-identical; the reader/how-to pages *improved*
  (streamdown's wrapper had been defeating the paragraph-spacing rule).
- **HS-2 (first paint):** no-JS shell renders the masthead; zero external
  requests on a full home load; both font families active from own
  origin; 7 nav dropdowns at first paint in an API-less preview;
  navigation works; first Ctrl+K mounts and opens the palette.
- **HS-5 (persistence):** MarriageAssessment driven end-to-end — answers
  persist while answering; refresh restores the banner with answers
  visibly selected; Start-fresh clears; completion reaches results;
  **Change-my-answers returns with every answer intact and results
  reachable without re-answering**; Retake clears the key. Six for six.
- **HS-7 (link mesh):** `/faq` screenshotted on brand; link-graph grep
  proves all 26 previously-sealed pages now have inbound links.

## 4. Accessibility

axe (`@axe-core/playwright`, WCAG 2.1 A/AA, same five pages and method as
the baseline): **0 violations, 0 nodes** on home, /writing, /babylon,
/tools/theology-quiz, /tools/life-audit. Baseline was 1 serious rule
across 14 nodes plus 2 hero contrast nodes found during QW-7. The
two-tone focus ring (ink outline + bone halo) is verified live.

## 5. Deploys

Every push since the sitemap-guard fix (`397bb02`) has deployed green —
eight consecutive Ready deployments at close. The ten hours of failures
before it were caused by that one guard (my own QW-10 change) firing on
preview builds; the full account, including why local reproduction
missed it, is in that commit's message.

## 6. Known-open items (deliberate, tracked)

| Item | State | Where tracked |
|---|---|---|
| QW-22 (b)(c): CSP enforce + frozen lockfile | Bisected out while chasing the deploy failures — the true culprit was the sitemap guard, so both are innocent and safe to re-stage | ROADMAP QW-22 |
| `DATABASE_URL` in Vercel **build** env | Owner action; until set, production builds intentionally refuse to ship an essay-less sitemap, and essay/book prerender heads only generate when the build can reach the DB | ROADMAP QW-10 note |
| `SEED_KEY` env | Owner action; admin one-shot endpoints fail closed until set | ROADMAP QW-22(a) |
| 15 prerender-uncovered routes | Config-driven prophetic/nation sub-pages + two leadership hubs; the script prints the list on every build | HS-6 commit |
| Lighthouse simulated LCP/TTI on lazy routes | Model prices the vendor-react split as an extra chain link; chunk is modulepreloaded (parallel in real browsers); observed LCP is 0.2–1.5 s | HS-2 commit |
| /tools/life-audit CLS 0.022 (was 0.000) | Font-swap reflow; fix is a metric-adjusted fallback face — deferred rather than shipping invented font metrics | HS-2 commit |
| Pre-existing eslint debt (~30 findings) | `set-state-in-effect` fetch effects + `no-explicit-any`; catalogued, untouched by design (behavior-changing refactors) | Audit 07 |
| 72 DB-gated server test suites | Skip without DATABASE_URL — unchanged behavior from baseline | 00-baseline §4 |
| Two-runtime API parity | Untouched this program; `api-parity.test.ts` still guards it | CLAUDE.md |

## 7. Verdict

No regression found in anything the program touched, at the depth the
gates + smoke net + hand-drives can see. The two measured regressions
that exist (simulated-LCP model artifact; one page's 0.022 CLS) are
documented in their commits with their causes and their fixes named.
