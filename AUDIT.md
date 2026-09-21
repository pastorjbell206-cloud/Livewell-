# AUDIT.md — LiveWell by James Bell

Phase 0 of the master site prompt. Read-only. Measured from this repository on
2026-09-21 at branch `claude/todo-implementation-hhp4bm` (PR #522, draft).
Production could not be fetched from this environment (egress proxy denies
`livewellbyjamesbell.co`); production-only numbers are taken from CI on the
same commit and are marked as such.

## 0. What differs from the prompt's assumptions

The prompt expects Next.js App Router, MDX, Fraunces / Source Serif / Hanken
Grotesk, a paper-forest-oxblood-brass palette, and a DB of ~85 unaudited posts
with IDs #145–#160 in flight. The repository is different, and rule 2 says
report and adapt rather than migrate:

| Assumed | Actual | Consequence |
|---|---|---|
| Next.js App Router, MDX | React 19 + Vite 7 SPA, wouter routing, tRPC v11, Drizzle + MySQL, Vercel. Prerendered per-route heads (`scripts/prerender-heads.mjs`, 1,442 HTML files) — not SSR/ISR. | No framework migration without written approval. "Statically generated essay pages" means extending the prerender step, not adopting Next. |
| Tokens: paper / forest / oxblood / brass | Tokens exist and govern (`client/src/index.css` `:root`; contract in `CLAUDE.md`): cream `#F5F0E6`, black `#1A1A1A`, mustard `#D4A017`, ink `#14110C`. Dark mode is deliberately disabled site-wide (`App.tsx` ThemeProvider). | Per rule 4.2, the repo's token file governs. The prompt's palette is a conflict, reported here, not applied. Night reading is a new feature request, not a restoration. |
| Fraunces / Source Serif 4 / Hanken Grotesk | Cormorant Garamond (display) + Inter (body/UI), self-hosted, subset, `font-display: swap`, preloaded. | Typeface change = brand change; needs James. |
| Voice exemplars "You Are Not the Exception" and "Zanah…" on the site | "You Are Not the Exception" exists locally only as a 123-word placeholder (retired in this branch; the real essay is on Substack). "Zanah" does not exist as a post; the word appears inside two other essays. | Both exemplars must be imported from Substack before Phase 4 can calibrate against them. |
| Audit backlog ~85 posts; #145/#146/#147/#160 states | No DB access here (`DATABASE_URL` unset). The local seed (`client/src/data/content-data.json`) holds 350 posts; DB row IDs are not in it. | Cannot confirm the #145–#160 states. The voice audit on this branch covers all 350 (see §2). |
| `readme.md`, `brief.md`, `handover.md`, `log.md` | `README.md` exists. The other three do not. | Created `log.md` this session; `brief.md` and `handover.md` are Phase 1 deliverables. |
| Admin at `/admin/posts/{ID}/edit` | Present (`client/src/pages/AdminPostEditor.tsx`). Two runtimes implement the API: dev Express (`server/`) and prod serverless (`api/index.ts`), guarded by `server/api-parity.test.ts`. | Every API change lands twice. |

One more thing the prompt could not know: this branch already carries
substantial change from the two prior briefs (the voice audit and the
world-class-site prompt). It is all on the draft PR, nothing is live, and
none of it touched production data. It is listed in §2 and §6 so James can
keep or reverse it.

## 1. Codebase

**Stack (verified from `package.json`).** React 19.2, Vite 7.1, wouter 3.3,
tRPC 11.6, Drizzle 0.45, mysql2 3.15, Tailwind 4.1, TypeScript 5.9
(`strict: true`), Vitest 2.1, Stripe SDK 20 (config-driven, not live),
vite-plugin-pwa (service worker precaches nothing — 608 bytes), pnpm 10.

**Rendering.** Every route is a client-rendered SPA route; ~245 are
`React.lazy` chunks, `Home` is eager. The prerender step writes a per-route
`index.html` with the correct head (title, description, canonical, OG,
JSON-LD) and, for essays and libraries, the article body injected for
crawlers. Essays are therefore readable without JavaScript in the raw HTML
but the reading experience is client-rendered.

**Environment.** `DATABASE_URL`, `JWT_SECRET` (session HMAC), `SEED_KEY`
(one-shot admin endpoints; deliberately not the JWT secret), `ADMIN_PASSWORD_HASH`
(bcrypt), optional Stripe / Mailchimp / S3, `VITE_*` inlined at build.
Analytics: Vercel Analytics + a first-party web-vitals beacon.

**Dependencies.** `pnpm audit`: 2 critical, 77 high, 53 moderate, 6 low.
The high/critical set is dominated by transitive build-tool packages (pnpm
itself, tar, brace-expansion, xmldom, undici, vite, sharp, postcss) — build
and script surface, not the client bundle. 168 packages outdated. **P1.**

**Quality tooling.** ESLint (`--max-warnings 0`; `scripts/` is ignored),
Prettier, Vitest with a client + server workspace: 313 tests pass (route smoke
net over all ~249 routes, API parity, money-path contracts). CI on every PR:
typecheck → three content validators → tests → build → canonical audit; a
non-blocking `quality` job runs Lighthouse + axe on `/` only. Lighthouse
thresholds are now asserted (added on this branch) and the job fails at 83.

**Hygiene.** 0 TODO/FIXME in `src`. **262 hardcoded hex values** in
`client/src/pages` + `components` despite the tokens-only rule (**P2**, but a
prerequisite for any dark theme). 9 `console.*` calls in client code, all in
error paths. 2 `<img>` without `alt` (`Substack.tsx:25`, `Pastors.tsx:24`;
**P1**, a11y). Inline styles are the house convention (CSS-var references), so
"inline styles" is not a finding here.

## 2. Routes and content

**Routes.** 249 concrete routes in `client/src/App.tsx` (plus param routes),
20 under `/admin`. 33 are redirects; 3 more (`/start-here`, `/framework`,
`/church-history`) were made redirects on this branch. Full per-route
verdicts: `docs/audit-site/ledger.json`. Prerender coverage: every route gets
its own head; the only "uncovered" entries were redirect components (now
skipped by design).

**Content inventory** (`client/src/data/content-data.json`, the seed; the DB
is the runtime source and could not be read here):

| | count |
|---|---|
| Posts | 350 |
| Published essays (≥200 words) | 222 — 534,083 words, median 2,212 |
| Placeholder "posts" under 200 words, previously published | 128 — retired on this branch (`published: false`, hidden, every listing reference removed, 24 reading-path entries flipped to "Coming soon"). Prod DB still serves them until `scripts/unpublish-stubs.mjs` runs. **P0 as found; fixed on branch, pending prod.** |
| Books | 21 (3 by hand on the shelf; the rest archived) |
| Content-as-data libraries | family (5), church history (councils 11, figures 36, heresies 10, timeline 7 eras), 22 history essays, wisdom 208 topics, life domains 69, plus study guides, how-tos, creeds, plans |
| Post fields | title, slug, body, excerpt, pillar, published, publishedAt — **no `substackUrl`, no structured Scripture / word / witness / date metadata, no tags** |

**Voice audit state (this branch, `docs/audit-voice/ledger.json`).** All 648
units carry a verdict against `docs/VOICE-JAMES-BELL.md`: essays — 20 pass,
195 revise, 4 rewrite, 2 exempt (Susanna Bell's), 1 cut (a 627-word PCN
import); pages/books/libraries — 176 pass, 121 flagged, of which 120 were
repaired as copy. 43 essay bodies were rewritten and gated in
(`scripts/apply-essay-repairs.mjs`); 156 remain. **Under the master prompt's
rule 5, none of the 43 should be treated as approved**: they sit on the
branch, not in production, and have no side-by-side diff in admin yet.
Recurring failure patterns across the 222: mean 12.6 "Not X. Y." turns per
essay (193 essays ≥ 8); 40 recap endings; 24 essays carry first-person lines
beyond the known biography (listed in `docs/audit-voice/decisions.md` for
James). 14 published posts contain exclamation marks (18 total).

**Links, images, orphans** (`docs/audit-site/walk.json`, real-browser walk of
all 229 public routes): 0 load errors; **65 routes not reachable from `/` in
three clicks** (mostly thank-you pages and book landings, but also
`/search`, `/dashboard`, `/pastors-resource-wall`, four tools); **11 dead
ends** — of which 7 are the `PastorsMovedRedirect` pages (`/pastors`,
`/for-pastors`, `/the-pastoral-angle`, `/sermon-series`…) that show one
sentence and hop to an external domain, and 3 are the Ordinary Holiness /
Consider the Birds thank-you shells with no `<title>` and no `<html lang>`.
External links were not checked (proxy). **P1.**

**Missing pieces the prompt requires that do not exist:** a notes content
type; a Substack importer; a Facebook importer; Scripture reference
detection/popovers; a lexicon; a witnesses index; a dated-marker timeline
link; structured metadata on posts; RSS exists (`/rss.xml`, full text) but
no notes feed; no `/styleguide`.

## 3. Quality baselines

Measured with Lighthouse 12 (mobile emulation, 4× CPU) on the built,
prerendered site; the home-page row is also the CI number on this commit.

| Page | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` (CI, commit `HEAD`) | **83** | 100 | 96 | 100 | — | — | — |
| `/` (local, 3 runs) | 92 / 85 / 93 | — | — | — | 2.9–3.9 s | 90–170 ms | 0 |

Before this branch's work the CI performance score was **79**, LCP 4.0 s.
Two changes moved it (hero painted from HTML; Radix/sonner out of the
initial graph; the LCP paragraph's italic face preloaded). The remaining
variance is the web-font swap on the LCP paragraph; options recorded in
`docs/audit-site/decisions.md` §5. Initial payload: **154 KB gzipped**
(essay routes add a lazy chunk; `Markdown` chunk 156 KB raw).

**axe** (WCAG 2.x A/AA, every public route): serious/critical on **44
routes** — `color-contrast` ×39, `document-title` ×3, `html-has-lang` ×3,
`select-name` ×2 (`/theology/compare`, `/theology/passage`),
`scrollable-region-focusable` ×1. **Rendered contrast** (every text node,
light mode): 36 routes fail; the recurring offenders are the bright-mustard
eyebrow/label pattern on cream (2.09:1 — 74 inline instances of
`color: var(--mustard)` on `.eyebrow`), the `Use Tool →` link colored by the
tool's accent (2.38:1, 7 routes), and `/substack`'s hero at 1:1 (text on its
own color). **P1.**

**Console / hydration.** The route smoke net renders every route in jsdom
without an ErrorBoundary trip; one pre-existing React duplicate-key warning
(`/theology/history/the-awakenings`). No hydration (no SSR).

**Structured data / SEO.** Per-route `SEOMeta` with JSON-LD (Article,
Organization, WebSite, Person, Breadcrumb); sitemap generated at build from
static routes + manifests + DB; `robots.txt`, `llms.txt`, full-text RSS.
Not validated against Google's tester from here.

## 4. Security

- **Headers:** HSTS, CSP, X-Frame-Options, Referrer-Policy,
  Permissions-Policy, X-Content-Type-Options all set in `vercel.json`.
- **Auth:** bcrypt password → HMAC-SHA256 `HttpOnly; Secure` session cookie;
  `verifySession` in `api/index.ts`; 29 `/api/admin/*` endpoints with 64
  auth checks in the handler file; one-shot seed endpoints keyed by a
  dedicated `SEED_KEY` (not the JWT secret). Protection is per-handler, not
  a middleware layer — the prompt's "middleware and handler" double guard is
  **P1** to add.
- **Rate limiting:** present on `/api/subscribe` (10/min); absent on admin
  login. **P1.**
- **Secrets:** none tracked; the only `sk_` strings are the literal
  `sk_test_placeholder` sentinel. Client bundle clean.
- **CSRF:** cookie-based admin session with no explicit CSRF token; CSP and
  SameSite behavior not verified from here. **P1 to verify.**
- **CVEs:** see §1. **P1.**

## 5. Findings, ranked

**P0 — broken or dangerous**
1. 128 placeholder articles served as published in production
   (`scripts/unpublish-stubs.mjs` written; needs `DATABASE_URL` and `--apply`).
2. 65 routes unreachable in three clicks and 11 dead-end pages, including
   external hops that leave the reader on a one-line interstitial.

**P1 — hurts readers or search**
3. 44 routes with serious axe violations; 36 with failing rendered contrast
   (`.eyebrow` mustard-on-cream, `Use Tool →`, `/substack` hero,
   `/theology/compare` and `/theology/passage` unlabeled selects, three
   thank-you shells with no title/lang).
4. Home performance 83 in CI against a 90 floor; essay pages unmeasured in CI.
5. Voice: 199 of 222 essays below the standard by the audit's own verdicts;
   18 exclamation marks in published prose; 24 essays with unconfirmed
   biography.
6. No admin middleware guard, no login rate limit, CSRF unverified.
7. 2 critical / 77 high dependency advisories; 168 outdated packages.
8. Two `<img>` without alt.
9. No structured metadata on posts (Scripture, words, witnesses, dates),
   which every Study/History feature in the prompt depends on.
10. Exemplar essays missing from the site.

**P2 — polish**
11. 262 hardcoded hex values in components/pages (blocks any dark theme).
12. Pillar label drift in data (`Pastoral Ministry` vs `pastoral-ministry`
    etc.; the map was patched on this branch).
13. `Dashboard.tsx` mirrors `ReadingPaths.tsx` by hand (refilled on branch;
    should import one source).
14. Lighthouse `quality` job still `continue-on-error`.

## 6. Plan — Phases 1–7 (effort in engineer-days; ±40%)

| Phase | Scope | Effort | Gate |
|---|---|---|---|
| 1 Debug & stabilize | Close P0/P1 3–8: prod stub retirement, contrast + axe fixes (tokenize `.eyebrow` on light, label the selects, title/lang on the two shells), dead-end interstitials → real pages or server 301s, reach fixes, middleware auth + login rate limit + CSRF check, dependency upgrade wave, alt text, essay-page Lighthouse in CI, `brief.md` / `handover.md`. | 6–8 | — |
| 2 Design system | Reconcile the prompt's tokens/type with the governing `CLAUDE.md` contract (**decision for James**: keep cream/mustard/Cormorant, or rebrand); `/styleguide` route; component states; the essay template tested against stacked one-liners and 250-word paragraphs; dark theme only if approved (needs the 262-hex sweep first). | 8–12 | Gate 2 |
| 3 IA & library | Post metadata (Scripture/word/witness/date/tags) + tagging tooling; `/study` ↔ `/history` hubs (partly built on branch); notes type; Substack importer + weekly check; Facebook importer with review queue; Scripture popovers (ESV API terms or BSB fallback); lexicon seeded from corpus; witnesses; timeline deep links; Pagefind search. | 20–30 | Gate 3 |
| 4 Voice | `voice:lint` (kill list, structural tells, exclamation, variance, they-only) wired into admin + CI; A–D triage of all 222 + notes; batches of three with side-by-side diff and editor's note; import and protect the two exemplars first. The branch's 43 gated rewrites re-enter this pipeline as candidates, not as done. | 25–40 (mostly writing-model time) | Gate 4 after batch 1 |
| 5 Search visibility | Per-type sitemaps, `FAQPage`/`DefinedTerm`/`PodcastEpisode` JSON-LD, OG image template, notes feed, metadata-driven internal links, breadcrumbs. | 4–6 | — |
| 6 Perf/a11y/privacy | Budgets in CI (95 / LCP 2.0 / INP 200 / CLS 0.05 / 90 KB JS on essays); font-metric fallbacks; screen-reader passes; nightly DB backup with tested restore; error tracking. | 5–8 | — |
| 7 Finish | Device/browser/keyboard/screen-reader walks, forms, error states, copy read-aloud, closing report. | 4–6 | Done |

Total: roughly 70–110 engineer-days, of which the voice phase is the largest
and the least parallelizable, because it waits on James at every batch.
