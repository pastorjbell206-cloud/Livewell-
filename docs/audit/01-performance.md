# 01 — Performance Audit

> Site-elevation audit, step 1.1. Read-only investigation on commit `3967e61`
> (branch `site-elevation`, 2026-07-01), against the measured baseline in
> `00-baseline.md` (Lighthouse mobile lab: perf 67–84, LCP 2.6–4.3 s, Speed
> Index 19–21 s on every page, CLS 0.000; build: 17.9 MB JS in 627 chunks,
> dist 67 MB) and the survey in `00-architecture-map.md`. All file:line
> citations verified on this commit; all chunk sizes measured from the
> baseline `dist/` output still on disk.

---

## 0. One correction to the baseline, established first

The baseline table labels `index-*.js` 862 kB raw / 262.7 kB gz as the
"**eager** app shell — everyone pays this" and `index-BwH6iIdR.js` 616 kB as a
"secondary vendor chunk." **The labels are swapped.** Measured from the same
dist:

- `dist/public/index.html` loads exactly three JS files eagerly:
  `assets/index-BwH6iIdR.js` (631,130 B raw / **168,317 B gz**),
  `assets/vendor-react-COd4auuD.js` (11,794 B / 4,231 B gz), and
  `assets/vendor-ui-KRpLdGuX.js` (66,511 B / 23,679 B gz), plus one CSS file
  (`index-C5q5-khT.css`, 99,979 B / 18,036 B gz).
- `assets/index-CUt06uHX.js` (883,160 B raw / **269,044 B gz** — the "862 kB /
  262.7 kB" chunk) appears in `index-BwH6iIdR.js` only inside the
  `__vite__mapDeps` lazy-preload map, and is statically imported by **68 route
  chunks** (ArticleDetail, Babylon, every book funnel, BookReader, the
  leadership handbook pages, etc.), never by the entry.

So the true eager JS payload is **~709 kB raw / ~196 kB gz** (plus 18 kB gz
CSS), and the 862 kB chunk is the **shared markdown/streamdown chunk** paid by
anyone who opens an article or book page. This matters because the fixes for
the two are different: the eager chunk needs code-splitting, the streamdown
chunk needs replacing.

---

## 1. Why Speed Index is ~19–21 s on every page (the compound answer)

Speed Index measures how long the viewport takes to *stop changing*. Four
mechanisms stack here; each is cited and costed.

### 1a. Render-blocking third-party font CSS, then a full-page font swap

`client/index.html:18–21` loads Google Fonts as a plain `<link
rel="stylesheet">` in `<head>` — render-blocking by definition. Preconnects
exist (`index.html:13–14`) and `display=swap` is set, so this is the *good*
version of a blocking font load, but under Lighthouse mobile throttling
(1.6 Mbps / 150 ms RTT) it still costs a cross-origin DNS+TLS+CSS round trip
(~300–600 ms of the 2,406 ms FCP), and `swap` guarantees the opposite problem:
the entire page paints in Georgia/system fallback, then **repaints wholesale**
when Cormorant Garamond and Inter arrive late — a large visual delta deep into
the timeline that Speed Index counts in full. There is no `@font-face` in
`client/src/index.css` (fonts are exclusively the Google CDN; tokens at
`index.css:52–54` reference the families) and no `<link rel="preload"
as="font">` anywhere.

**Cost:** ~300–600 ms of FCP + a full-viewport repaint at font-arrival time
(seconds later under throttling), inflating SI on literally every page.
**Fix:** self-host subsetted woff2 files (Latin subset of Cormorant Garamond
400/500/600 + Inter 400/500/600 ≈ 90–140 kB total), declare `@font-face` with
`font-display: swap` in `index.css`, preload the two above-the-fold faces, and
add metric-compatible `size-adjust`/`ascent-override` fallbacks so the swap is
visually near-null. Removes the third-party critical-path dependency entirely.
**Effort: S–M (3–5 h).**

### 1b. Nothing paints until React boots — and the shell is 196 kB gz

The served HTML body is an empty `<div id="root">` (`client/index.html:52`);
the prerender step (`scripts/prerender-heads.mjs`, run from `vercel.json:2`)
rewrites **heads only** — its own comment says "The body remains the SPA
shell." First paint therefore waits on the full eager bundle described in §0
(~196 kB gz JS + 18 kB gz CSS) plus React 19 boot. FCP 2.4 s / LCP 2.6 s on
the simple pages is exactly this cost. There is no inline critical CSS, no
static hero markup, nothing for the eye until hydration.

**Cost:** ~2.4 s to first pixel on every route (baseline FCP column).
**Fix:** shrink the eager chunk (finding H3 below) and/or paint a static
brand shell (background + masthead) from `index.html` — cream page, black
nav band — so *something* honest paints in ~0.5 s. **Effort: S (2–4 h)** for
the static shell; the chunk diet is H3.

### 1c. Layout-level API dependency with default retry storm

Every public page renders inside `Layout` → `MinimalNav`, and `MinimalNav`
fires a tRPC query on mount: `trpc.posts.navIndex.useQuery`
(`client/src/components/MinimalNav.tsx:185`) — the nav dropdown counts are
DB-driven. The homepage additionally blocks its essay grid on
`trpc.posts.listPublished.useQuery` (`client/src/pages/Home.tsx:87`),
rendering a "Loading…" placeholder meanwhile (`Home.tsx:485–495`). The
`QueryClient` is constructed with **no defaultOptions** (`client/src/main.tsx:12`),
so TanStack Query defaults apply: **3 retries with exponential backoff**
(~1 s, 2 s, 4 s). In the baseline lab there was no API behind `vite preview`,
so every page ran the full retry cycle — nav regions and content slots kept
mutating for ~7–15 s after load. **This is the dominant cause of the 19–21 s
lab Speed Index**, and it is partly a lab artifact — but the mechanism is real
in production: the nav and homepage content wait on a Vercel serverless
cold-start + MySQL round trip on every visit, and any API slowness replays
this pattern for real users. Note `MinimalNav` already contains a static
slug→category fallback map ("so the menu works without a DB backfill",
`MinimalNav.tsx:190–193`) — the dependency is avoidable with code that already
exists.

**Cost:** lab SI inflated by ~10–15 s; field: nav/homepage settle gated on API
latency (hundreds of ms to seconds on cold start).
**Fix:** (1) emit `navIndex` counts as a build-time JSON/module the same way
every other manifest is built (`scripts/build-*-index.mjs` pattern), falling
back to the live query only in admin; (2) set QueryClient defaults
(`retry: 1`, sane `staleTime`) in `main.tsx`; (3) give the homepage grid a
fixed-height skeleton so late data doesn't move pixels. **Effort: M (4–8 h).**

### 1d. Spinner-only Suspense fallback

All ~256 lazy routes share one Suspense fallback: a full-viewport spinner
(`client/src/App.tsx:281–287`, `PageFallback` — `animate-spin`, min-h-screen).
Direct-loading any lazy route paints blank → spinner → content; the spinner is
a continuously animating element, which keeps the visual delta alive for
Speed Index while the route chunk downloads. Client-side navigations likewise
blank the whole page to a spinner instead of keeping the old view (React
`startTransition` would).

**Cost:** contributes to SI on every lazy route; poor perceived quality
("Unhurried. Weighted. Grown-up." is not a Tailwind spinner).
**Fix:** static shell fallback (nav band + cream page + content skeleton), and
wrap wouter navigation in `startTransition` so in-app navigations keep the
old page until the next one is ready. **Effort: S (2–3 h).**

---

## 2. JS bundle findings

### 2a. CRITICAL — Streamdown: a streaming-AI markdown engine rendering static trusted prose

The single largest performance fact in the repo. `streamdown@1.4.0` (a
"drop-in replacement for react-markdown, designed for AI-powered streaming" —
its own package description) is imported in **21 files** plus the shared
wrapper `client/src/lib/prose.tsx:11,50`: `ArticleDetail.tsx:14`, all 12
`pages/books/*` sample-rendering funnels (e.g. `Babylon.tsx:8`),
`BookReader.tsx:10`, `HowToArticle.tsx:10`, `WholeBibleSermons.tsx:10`,
`ServantLeadershipHandbook.tsx:9`, `FormationGuides.tsx:10`, `AdminAbout.tsx:6`.

What it costs, measured:

- Its dist **statically** imports `shiki` + `shiki/engine/javascript`, katex
  (rehype-katex), react-markdown, marked, remark-gfm, rehype-raw
  (verified: `node_modules/streamdown/dist/index.js` import list). Rollup
  hoists all of that into the shared chunk `index-CUt06uHX.js` — **883 kB raw
  / 263 kB gz**, statically imported by **68 route chunks**. Every article,
  every book funnel, every reader page pays 263 kB gz of markdown machinery
  to render prose.
- shiki's full bundle registers every grammar as a lazy chunk: that is the
  long tail of the 627 chunks and most of the 17.9 MB — `emacs-lisp` 762 kB,
  `cpp` 611 kB, `wasm` 608 kB (baseline §2). `mermaid.core` 442 kB +
  `cytoscape.esm` 432 kB + `treemap` 322 kB are streamdown's diagram path.
  These are dynamically imported (fetched only if a matching code block ever
  renders — for this site, never), so they are **deploy weight and build
  time, not visitor bytes**, but they are ~14 MB of the 17.9 MB and the
  entire reason for the chunk-size build warning.
- Streamdown's props (`shikiTheme`, `mermaidConfig`, `controls` —
  `node_modules/streamdown/dist/index.d.ts:14–19`) allow *theming*, not
  *exclusion*: there is no supported way to strip shiki/katex/mermaid from
  its import graph. Restricting languages is not available; replacement is
  the fix.

**Effect on the baseline numbers:** `/babylon` (perf **67**, LCP **4,273 ms**,
TBT **178 ms**) loads a 6.4 kB page chunk that statically drags the 263 kB gz
markdown chunk, then fetches the 4,638-word sample with `cache: "no-store"`
(`Babylon.tsx:23`), then parses/renders it — a three-stage serial waterfall
after the app shell. That is the entire gap between /babylon and the 84-scoring
pages.

**Fix:** one shared `<Markdown>` component wrapping `react-markdown` +
`remark-gfm` (both already installed as streamdown's own deps; the content is
trusted first-party prose — no raw HTML, no math, no diagrams, no code
highlighting needed). Swap the 22 import sites to it (most already funnel
through `lib/prose.tsx`). Estimated result: shared markdown chunk drops from
263 kB gz to ~35–45 kB gz (react-markdown + micromark pipeline), dist JS drops
~14 MB, chunk count ~627 → ~180, the build warning disappears, and /babylon's
LCP loses its biggest serial dependency (est. **4.3 s → ~2.6–2.9 s**, TBT
178 ms → well under 100 ms). **Effort: M (4–6 h, mechanical + visual diff of
one article and one book sample). Priority: Critical.**

### 2b. HIGH — the eager chunk is 631 kB raw and carries three pages plus data tables

Contents of the eager `index-BwH6iIdR.js` (631 kB raw / 168 kB gz), from
source-level analysis:

- **react-dom lives here, not in the vendor chunk.** `vendor-react-*.js` is
  only 11.8 kB — the `manualChunks` config (`vite.config.ts:148–155`) failed
  its main job (verified: `scheduler`/`createRoot` strings are in the index
  chunk, absent from vendor-react). Cache-busting consequence: every content
  deploy invalidates the chunk containing React itself.
- **Three full pages are eagerly imported** in `client/src/App.tsx:12–15`
  (`Home`, `Writing`, `Books` — deliberate) — but with them come their data
  tables: `lib/subpathwayMap.generated.ts` (35.5 kB source),
  `lib/pillar-assignments.ts` (34.7 kB), `lib/taxonomy.ts` (12.4 kB),
  `lib/prophetic.ts` (11.5 kB, imported at `App.tsx:7`), plus `Books.tsx`
  (48.7 kB source with hardcoded reading paths). ~145 kB of source that only
  /writing and /books need.
- `cmdk` (CommandPalette, mounted in `Layout` on every page,
  `components/CommandPalette.tsx:2`), tRPC + TanStack Query + superjson
  (`main.tsx:1–10`), wouter, sonner, Radix tooltip.
- `vendor-ui` (67 kB raw / 24 kB gz) is modulepreloaded on every page and pins
  five Radix packages (`vite.config.ts:152`) — dialog, dropdown-menu, tabs,
  tooltip, select — of which the public shell uses roughly tooltip and dialog.

**Fix (smallest set):** lazy-load `Writing` and `Books` like every other
route (keep `Home` + `NotFound` eager); fix or delete `manualChunks` so
react+react-dom actually land in a stable vendor chunk; lazy-mount
CommandPalette on first ⌘K/tap. Estimated eager payload: 196 kB gz →
**~120–140 kB gz**, and FCP/LCP improve roughly 300–500 ms under mobile
throttling on every page. **Effort: S–M (3–6 h). Priority: High.**

### 2c. MEDIUM — a debug plugin ships location attributes to production

`@builder.io/vite-plugin-jsx-loc` runs unconditionally (`vite.config.ts:1,11`).
Measured in dist: **10,613 `data-loc` occurrences across the JS output**
(~550 kB raw), **903 in the eager chunk alone** (~50 kB raw / ~8–10 kB gz),
and every one becomes a DOM attribute at runtime (larger DOM, slower
serialization). **Fix:** include it only when `mode === "development"` — one
line. **Effort: S (0.5 h). Priority: Medium (trivial cost/benefit).**

### 2d. MEDIUM — AdminDashboard chunk, 2.1 MB

`assets/AdminDashboard-p2M_CWSo.js` is 2,137,239 B raw / 709 kB gz, lazy
(`App.tsx:246`) — zero cost to visitors, slow for the one admin on a pastoral
laptop. Worth a look inside (likely a charting/editor dependency) during the
admin pass, not this one. **Effort: M. Priority: Medium-low.**

### 2e. LOW — 627 chunks and per-icon lucide splitting

Navigation waterfalls request many tiny chunks (per-icon lucide files like
`mail-*.js`, `copy-*.js` are visible in the preload map). HTTP/2 multiplexing
makes this cheap; fixing 2a removes ~450 of the 627. No separate action.
The 38 unused `ui/` primitives and 24 Radix packages (architecture map §3)
are already tree-shaken out of the bundle — they are repo hygiene, not bytes,
except the five pinned by `manualChunks` (2b).

---

## 3. Images

- **Book covers are the only heavy rasters.** 16 JPGs over 200 kB in
  `client/public/books/` (largest: `bible-and-transgender-identity.jpg`
  281 kB, `bible-and-homosexuality.jpg` 277 kB, `deacon-qualifications.jpg`
  244 kB…). The /books catalog grid renders many covers at ~150–210 px wide —
  full-resolution JPGs downscaled by CSS. Several funnel heroes are SVG
  (`/books/babylon.svg` — cheap, cacheable, sharp; good pattern), and
  `GeneratedHero` produces procedural SVG art (no raster cost).
  **Fix:** batch-convert covers to WebP/AVIF at 2× display size (~30–60 kB
  each; −2.5–3 MB total across the catalog), via a small script in the
  existing `scripts/` pipeline. **Effort: S (2–3 h). Priority: Medium.**
- **Sizing/CLS:** measured CLS is 0.000 on all five audited pages, so nothing
  is currently shifting above the fold. But `BookCover`'s `<img>`
  (`components/BookCover.tsx:35–43`) has `loading="lazy"` (good) and style-only
  sizing (no intrinsic `width`/`height` attributes), and nine page files
  contain `<img>` tags with no `width=` at all (`Substack.tsx`,
  `LeadMagnetLanding.tsx`, `BooksStore.tsx`, `HardIssuesSeries.tsx`,
  `Pastors.tsx`, `RoadMap.tsx`, `BookDetail.tsx`, `ResourcesForPastors.tsx`,
  `AdminBooks.tsx`) — latent CLS on unaudited pages. Counter-example done
  right: `Babylon.tsx:53–54` sets `width={210} height={315}`.
  **Fix:** add intrinsic dimensions to `BookCover` and the nine files.
  **Effort: S (1–2 h). Priority: Low (no measured CLS today).**

---

## 4. Unused CSS/JS

CSS is a non-issue: 0.12 MB total emitted (18 kB gz on the eager path) —
Tailwind v4 plus the token system is lean. The unused-JS story *is* finding
2a (shiki grammars, mermaid, cytoscape ≈ 14 MB of dist that no visitor ever
needs) plus 2c (`data-loc` bloat). The 38 unused ui primitives cost the
repo, not the bundle.

---

## 5. Caching / CDN — currently there is (almost) none

This is the second critical finding, and it is field-data (CrUX) territory:
repeat visits and cross-page navigations get no help at all.

- **`vercel.json:8–20` sets only security headers. There is no
  `Cache-Control` anywhere in the repo config.** With a custom
  `buildCommand`/`outputDirectory` (`vercel.json:2–3`), static files from
  `dist/public` are served with Vercel's default `cache-control: public,
  max-age=0, must-revalidate` — including `/assets/*`, whose filenames are
  content-hashed and therefore safely immutable. Every repeat visit
  revalidates every chunk (hundreds of conditional requests at mobile RTTs).
  **Fix:** add a headers block: `/assets/(.*)` → `public, max-age=31536000,
  immutable`; book covers/PDF samples → `public, max-age=86400,
  stale-while-revalidate=604800`; content JSON → `public, max-age=300,
  stale-while-revalidate=86400`. **Effort: S (1–2 h incl. verifying live
  response headers). Priority: Critical (cheapest big win in the audit).**
- **The service worker cannot help because it destroys itself.**
  `vite.config.ts:18` sets `selfDestroying: true` (deliberate — stale-deploy
  scars), and the emitted `dist/public/sw.js` is a 608-byte unregister stub
  (verified). Consequence: the entire 67-line `runtimeCaching` config at
  `vite.config.ts:62–128` — including the `CacheFirst` rule for `/assets/`
  (lines 99–107) that the "one architectural fact" comments rely on for
  offline reading — **is dead configuration that executes never**. Either
  remove `VitePWA` entirely (honest) or re-enable a real SW now that
  `NetworkFirst` navigation + immutable assets make stale deploys impossible.
  **Effort: S to remove, M to re-enable properly. Priority: High (mostly as
  a truthfulness fix; HTTP caching above does the perf work).**
- **The app actively defeats caching with `cache: "no-store"` at ~85 call
  sites** — every content-JSON and book-sample fetch in the client (e.g.
  `pages/tools/PassageContext.tsx:127–128` re-downloads
  `theology/passage-notes.json` — **676 kB** — on every single visit;
  `pages/books/Babylon.tsx:23` refetches the 4,638-word sample markdown
  no-store on the flagship product page; the whole `leadership/`, `theology/`,
  `prophetic/`, `life/`, `studyguides/` families follow the same pattern).
  `no-store` bypasses even 304 revalidation — the full body re-downloads
  every time. This was presumably scar tissue from the same stale-SW era.
  **Fix:** delete the `cache: "no-store"` option (default HTTP caching +
  the CDN headers above take over), or centralize content fetching in a tiny
  `fetchJson` helper with sane cache semantics. **Effort: S–M (2–4 h,
  mechanical). Priority: High.**

---

## 6. Hydration / INP cost

Small, honestly. TBT is 5–55 ms on ordinary pages and 178 ms only on /babylon
(streamdown parse — fixed by 2a). The 260-route wouter `<Switch>`
(`App.tsx:289+`) is a linear regex match per navigation — microseconds; the
~256 `lazy()` declarations at module top (`App.tsx:14–267`) are cheap
closures. Providers (`main.tsx:58–64`, `App.tsx` ErrorBoundary → Theme →
Toast → Tooltip) are standard. No INP red flags in the audited pages; the
inline `onMouseEnter` style mutations (e.g. `Home.tsx:523–528`) are
single-element and fine. No action beyond 2a and 1d (navigation transitions).

---

## 7. The 4.3 MB + 1.1 MB public JSON exports

Who actually fetches them (verified by grep, all callers):

- `admin-article-bodies.json` (4,311 kB): fetched **only** by
  `pages/AdminPublishContent.tsx:31`, on demand inside the admin.
- `article-library.json` (1,076 kB): fetched **only** by
  `pages/AdminLoadDrafts.tsx:77` (alongside `/draft-essays.json`), on demand
  inside the admin.

**No public page-load cost** — no visitor ever downloads them, and the PWA
precache globs (`vite.config.ts:54–59`) don't match them. The real costs:
(1) ~5.4 MB of dist/deploy weight per build; (2) **exposure** — the full
bodies of every article, and draft essays, sit at guessable public URLs for
any scraper (an editorial/content-integrity concern more than a perf one —
flag for the security/content audit); (3) they mislead audits into thinking
they're hot-path weight. **Fix:** move them out of `client/public` — serve
through the authed admin API (`api/index.ts` already has an auth model), or
have the admin tools accept a file upload. **Effort: S–M (2–4 h).
Priority: Medium (Low for perf, higher for exposure).**

---

## 8. Ranked findings table

| # | Finding | Evidence | Measured/est. cost | Fix | Effort | Rank |
|---|---|---|---|---|---|---|
| 1 | Streamdown renders static prose; drags shiki+katex (static, 263 kB gz shared chunk × 68 routes) and mermaid/cytoscape/450 grammar chunks (~14 MB dist) | `lib/prose.tsx:11`; 21 imports; `streamdown/dist/index.js` imports `shiki`; dist `index-CUt06uHX.js` 883 kB/263 kB gz | /babylon LCP 4,273 ms, TBT 178 ms; 263 kB gz on every article/book view; 14 MB dist | Replace with `react-markdown`+`remark-gfm` behind one `<Markdown>` | **M (4–6 h)** | **Critical** |
| 2 | No Cache-Control headers; hashed `/assets/` served `max-age=0, must-revalidate` | `vercel.json:8–20` | Every repeat visit revalidates ~200 kB gz + all route chunks | Immutable headers for `/assets/`, SWR for content | **S (1–2 h)** | **Critical** |
| 3 | `cache:"no-store"` on ~85 content fetches defeats all caching | e.g. `PassageContext.tsx:127–128` (676 kB JSON every visit), `Babylon.tsx:23` | Full re-download of every content JSON/sample on every view | Remove option / central fetch helper | **S–M (2–4 h)** | **High** |
| 4 | Layout-level `navIndex` tRPC query + no QueryClient retry config; homepage content API-gated | `MinimalNav.tsx:185`, `Home.tsx:87,485`, `main.tsx:12` | Dominant cause of lab SI 19–21 s (retry storm); field: settle gated on serverless+DB | Build-time navIndex JSON; `retry:1` + staleTime defaults; fixed-height skeletons | **M (4–8 h)** | **High** |
| 5 | Render-blocking Google Fonts CSS + late full-page swap | `index.html:13–21`; no `@font-face` in `index.css` | ~300–600 ms FCP; whole-page repaint seconds in, on every page | Self-host subsetted woff2, preload, metric-compatible fallbacks | **S–M (3–5 h)** | **High** |
| 6 | Eager chunk 631 kB raw/168 kB gz: react-dom mis-chunked, Writing+Books+~85 kB taxonomy data eager, cmdk always mounted | `App.tsx:12–15`, `vite.config.ts:148–155`, dist measurements §0 | ~60–70 kB gz avoidable on first paint; deploys bust the React chunk | Lazy Writing/Books, fix `manualChunks`, lazy CommandPalette | **S–M (3–6 h)** | **High** |
| 7 | Spinner-only Suspense fallback; navigations blank the page | `App.tsx:281–287` | SI contribution on every lazy route; perceived quality | Static shell fallback + `startTransition` navigations | **S (2–3 h)** | **Medium** |
| 8 | Debug plugin ships 10,613 `data-loc` attrs to prod | `vite.config.ts:11`; dist grep | ~550 kB raw dist, ~50 kB raw (~9 kB gz) eager, DOM bloat | Dev-only conditional | **S (0.5 h)** | **Medium** |
| 9 | 16 book-cover JPGs 200–281 kB, no modern format/responsive sizes | `client/public/books/*.jpg` | ~2.5–3 MB across catalog surfaces | WebP/AVIF pipeline script | **S (2–3 h)** | **Medium** |
| 10 | 4.3 MB + 1.1 MB admin JSON in public dist | callers: `AdminPublishContent.tsx:31`, `AdminLoadDrafts.tsx:77` | 5.4 MB deploy weight; content exposure (incl. drafts) | Serve via authed API / remove from public | **S–M (2–4 h)** | **Medium** |
| 11 | Dead PWA runtimeCaching config (self-destroying SW) | `vite.config.ts:18,62–128`; `dist/public/sw.js` (608 B) | 0 runtime; misleading config | Remove VitePWA or re-enable deliberately | **S** | **Medium** |
| 12 | AdminDashboard 2.1 MB lazy chunk | dist; `App.tsx:246` | Admin-only load time | Investigate in admin pass | **M** | **Low** |
| 13 | Unsized `<img>` in BookCover + 9 pages | `BookCover.tsx:35`; grep list §3 | Latent CLS (0.000 measured on audited pages) | Intrinsic width/height | **S (1–2 h)** | **Low** |
| 14 | 627-chunk request waterfalls | dist | Minor under HTTP/2; mostly fixed by #1 | None separate | — | **Low** |

Estimated end-state if 1–7 land: eager payload ~130 kB gz, article/book pages
+~40 kB gz instead of +263 kB gz, dist ~4 MB JS in ~180 chunks, /babylon LCP
~2.5 s, FCP ~1.4–1.7 s, Speed Index in single digits, repeat visits nearly
free. Total effort: roughly 20–30 focused hours, no rewrites, no schema or
API changes (the navIndex manifest is a build script + one fallback branch).

---

## The three changes that would move Core Web Vitals the most

1. **Replace Streamdown with a plain react-markdown pipeline** (finding #1,
   M). The flagship product page is the worst page on the site — /babylon
   perf 67, LCP 4,273 ms, TBT 178 ms — precisely because reading *anything*
   costs a 263 kB gz syntax-highlighting/math/diagram engine before the words
   can render, on all 68 markdown routes. This one change fixes the worst LCP
   on the site (est. −1.4 to −1.7 s), cuts TBT below 100 ms, removes ~14 MB
   of dist and the build warning, and touches nothing but one wrapper and 21
   mechanical imports.

2. **Give the site an actual caching layer: immutable `/assets/` headers in
   `vercel.json` + delete the ~85 `cache:"no-store"` fetch options**
   (findings #2 + #3, S each). Today every visit — first or hundredth —
   re-downloads or revalidates everything: the app shell, every route chunk,
   a 676 kB theology JSON, the flagship's sample chapter. Content-hashed
   filenames make the asset half of this risk-free, and real users (CrUX,
   which is what Google actually scores) live in repeat-visit land. This is
   the highest field-data-impact-per-hour item in the audit.

3. **Decouple first meaningful paint from the fonts and the API** (findings
   #4 + #5, with #6/#7 as amplifiers). FCP 2.4 s and Speed Index 19–21 s on
   *every* page share one shape: an empty `<div id="root">` waits on a
   render-blocking Google Fonts stylesheet, then on 196 kB gz of JS, then on
   a `posts.navIndex` round trip (with a 3-retry default storm when the API
   is slow or absent) before the page stops changing. Self-hosted preloaded
   fonts, a build-time nav manifest (the static fallback already exists in
   `MinimalNav.tsx`), and `retry: 1` turn first paint into a static,
   local, single-round-trip event — est. FCP → ~1.5 s and lab SI from ~20 s
   to low single digits, across all 260 routes at once.
