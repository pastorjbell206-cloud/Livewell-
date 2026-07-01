# 02 — SEO Audit

> Site-elevation audit, step 1.2. Read-only. Companion: `00-architecture-map.md`
> (route inventory), `00-baseline.md` (Lighthouse SEO 100 on 5 sampled pages).
> Lighthouse checks tags, not reach — this goes underneath it. All file:line
> references verified on branch `site-elevation`, 2026-07-01.

**The one-sentence verdict:** the on-page machinery is genuinely good — near-total
SEOMeta coverage, real JSON-LD, a build-time sitemap, per-route prerendered heads —
but roughly **120 indexable pages (including all 16 FAQ/compare pages built
specifically to win search) are missing from the sitemap, and the FAQ/compare
cluster has zero inbound internal links**, so the pages most designed for Google
are the ones Google is least likely to ever find.

---

## 1. Technical foundation

### 1.1 robots.txt — one real problem

`client/public/robots.txt`:

- Allows everything, disallows `/admin`, `/api`, `/.env`, `/node_modules`
  (`robots.txt:6–9`); sitemap declared with the correct www host (`robots.txt:12`).
- **`Disallow: /api` blocks the site's own OG images.** Every social card and the
  default `og:image` is served from `/api/og?title=…` (`client/src/lib/site.ts:34`
  `OG_DEFAULT_IMAGE`; `scripts/prerender-heads.mjs:36`; `client/index.html:29`).
  Facebook's and Twitter's crawlers respect robots.txt when fetching `og:image`;
  Google Images and Discover also honor it. The result: link previews can render
  **without an image** and essay images are excluded from image search, despite
  a working Edge function (`api/og.tsx`). `/rss.xml` is unaffected (rewritten path
  is not under `/api`, `vercel.json:39`).
- `Crawl-delay: 1` (`robots.txt:15`) is ignored by Google, honored by Bing —
  harmless, but on a 500+-URL site it slows Bing's full crawl; not needed.
- `Disallow: /.env` and `/node_modules` are cargo-cult lines (nothing is served
  there through the SPA rewrite) — harmless.

### 1.2 Sitemap — the biggest single gap

`scripts/generate-sitemap.mjs` runs in the Vercel build (`vercel.json:2`) and
merges three layers: 82 hand-curated `STATIC_PAGES` (`generate-sitemap.mjs:39–125`),
10 JSON-manifest sources (`:132–150`, 442 URLs today), and DB queries for posts /
books / reading paths (`:226–241`). Measured against the actual route table
(258 unique paths in `client/src/App.tsx`; 210 static, non-admin,
non-parameterized routes):

- **148 of 210 static routes are absent from the generated sitemap.** After
  subtracting the ones that *should* be absent (21 noindexed `/thank-you` pages,
  5 redirect aliases like `/articles` and `/quiz`, `/dashboard`,
  `/membership/success`), **~120 indexable routes are missing.**
- Missing, by group (all verified against the script's STATIC_PAGES + manifests):
  - **All 10 `/faq/*` pages and all 6 `/compare/*` pages — zero of the 16
    search-intent landing pages are in the sitemap.** These pages exist *only*
    to capture queries like "does god exist" and "calvinism vs arminianism";
    they carry FAQPage schema (§4) and are invisible to the one file that tells
    Google they exist.
  - 22 of 27 tool pages (only `/tools`, `/tools/theology-quiz`, `/tools/verse-finder`,
    `/tools/prayer-generator`, `/tools/family-devotions` are listed,
    `generate-sitemap.mjs:73,121–124`).
  - All 11 crisis/topic landers (`/pastoral-burnout`, `/grief`, `/deconstruction`,
    `/church-hurt`, `/post-christian`, …) — high-intent, high-empathy queries.
  - All 9 `/books/`-prefixed funnels (`/books/when-god-bless-america`,
    `/books/believe`, …). These slugs are **not** in `EBOOK_CATALOG`
    (`api/index.ts:389–404` — only `when-god-bless-america` is, pointing at the
    funnel), so the DB `books` query does not reliably cover them either.
  - Whole taxonomy hubs: `/justice`, `/disruption`, `/nation` (+7 sub-routes each),
    `/exile`, `/pillars`, `/wisdom`, `/living-well`, 10 `/theology/*` sub-routes,
    8 `/leadership/*` instruments, plus index pages `/studyguides`, `/table`,
    `/how-tos`, `/read`, `/search`, `/privacy`, `/terms`, `/accessibility`.
- **The checked-in `client/public/sitemap.xml` is stale** (354 URLs): it still
  contains `/after-christendom` — which `vercel.json:28` now 301s to `/babylon` —
  and lacks `/babylon` and `/healwell`, which the current script includes. Prod
  regenerates it at build, so this is drift, not breakage; but anything reading
  the repo copy (dev, `llms.txt` consumers, this audit's predecessor) sees a
  wrong sitemap.
- **Silent degradation:** on DB failure the script writes a static-only fallback
  and exits 0 (`generate-sitemap.mjs:206–223, 257–262`) — a lost `DATABASE_URL`
  in the Vercel env would silently drop all 161+ essays from the sitemap on the
  next deploy with a green build.
- The sitemap includes 8 query-string URLs (`/writing?pillar=…`, `?track=…`,
  `?series=true`, `generate-sitemap.mjs:68–83`). `Writing.tsx:192–197` does
  self-canonicalize them with an explicit `url` prop, so they are at least
  consistent — but faceted query URLs in a sitemap are weak spend; real path
  hubs would index better.

### 1.3 Canonicals and host

- `SEOMeta` derives the canonical from the wouter pathname when no explicit
  `url` is passed (`SEOMeta.tsx:51–52`) — each page self-canonicalizes; homepage
  drops the trailing slash. 35 pages pass explicit canonicals; all point at the
  correct host (verified sample: `nation/NationPolicy.tsx:33`,
  `leadership/BudgetCalculator.tsx:47`).
- Apex → www is a permanent server-side redirect (`vercel.json:30–35`). Good.
- **Trailing-slash duplicates are unmanaged.** `vercel.json` sets no
  `trailingSlash` option, and the prerender writes directory-style files
  (`dist/public/<route>/index.html`, `prerender-heads.mjs:322–331`), so
  `/about` and `/about/` can both resolve 200. The client canonical echoes
  whatever path was requested (`SEOMeta.tsx:52`), so `/about/` self-canonicalizes
  to the slashed variant — two indexable versions of every page. Low-grade
  duplicate risk; one `"trailingSlash": false` line closes it.
- Query strings are dropped from derived canonicals (wouter's pathname excludes
  search), so `?utm_source=` variants canonicalize correctly.

### 1.4 The SPA problem — what crawlers actually receive

This is a client-rendered SPA. `scripts/prerender-heads.mjs` (runs last in the
build, `vercel.json:2`) rewrites **only the `<head>`** per route — "the body
remains the SPA shell" (`prerender-heads.mjs:14–16`). What actually gets a
per-route static head:

| Prerendered (own head) | Evidence |
|---|---|
| 13 hand-listed static pages (`/`, `/about`, `/writing`, `/books`, `/reading-paths`, `/marriage`, `/parenting`, `/tools`, `/work-with-james`, `/skeptic-track`, `/pastors-resource-wall`, `/roadmap`, `/library`, `/diagnostic`) | `prerender-heads.mjs:40–127` |
| 6 JSON-library types: `/leadership/article/*`, `/resources/context/*`, `/leadership/formation/*`, `/life/*`, `/resources/creeds/*`, `/theology/history/*` | `:378–385` |
| All DB essays `/writing/:slug` — **including full Article JSON-LD with `articleBody` (markdown stripped to plain text) and `wordCount`** | `:211–241, 404–435` |
| All DB books `/books/:slug` (Book schema) and `/reading-paths/:slug` | `:438–474` |

Everything else — **all 16 FAQ/compare pages, all 11 crisis landers, all 21 book
funnels, all 30 tools, every hub (`/theology`, `/justice`, `/leadership`, `/life`),
plus 4 manifest types the sitemap knows about (`/studyguides/:slug`, `/table/:slug`,
`/how-tos/:slug`, `/read/:slug`)** — is served the raw SPA shell whose head is the
*homepage* head (`client/index.html:7–38`: homepage title, homepage description,
`og:url` pointing at `/`). Until JS executes, those URLs look like duplicate
homepages. Google renders JS, but rendering is deferred and budgeted — and this
site ships 17.9 MB of JS in 627 chunks (baseline §3), which is exactly the
profile where the render queue hurts. Non-Google crawlers, social scrapers, and
most AI/answer-engine fetchers never see the real title, let alone the words.

One inconsistency worth naming: `client/index.html:44–46` claims Organization +
WebSite JSON-LD "are injected once at the React app root (see client/src/App.tsx →
SiteStructuredData)" — **no such component exists anywhere in the repo** (verified
by repo-wide grep). The schemas are actually emitted only by `Home.tsx:102`. The
comment is fiction; the effect (homepage-only sitewide schema) is acceptable, but
the doc-rot should go.

The prerendered-essay story deserves credit: putting the full plain-text
`articleBody` in JSON-LD (`prerender-heads.mjs:188–209, 228`) means non-JS
crawlers *can* read every essay's words. It is a workaround, not visible body
HTML — Google treats visible content as primary — but it is far better than
nothing and most SPAs don't do it.

### 1.5 llms.txt — stale and thin

`client/public/llms.txt` is served at the root and is well-written, but:

- It links **`/after-christendom`** (`llms.txt:56`) — a URL that has been a 301
  to `/babylon` since `vercel.json:28`. An answer engine following it lands on a
  redirect; the actual `/babylon` funnel is never named.
- The ebook list names 10 of the 21 funnels; missing: `/babylon` (the flagship),
  `/consider-the-birds`, `/where-your-treasure-is`, `/be-true-to-yourself`,
  `/what-belongs-to-the-poor`, `/rule-of-life`, `/how-to-read-the-bible`, and 8
  of the 9 `/books/*` funnels.
- Zero mentions of the FAQ pages, compare pages, or crisis landers (grep: 0
  matches for `faq|compare`) — the pages most shaped like answer-engine food.

---

## 2. Indexability by page type — are the words in the HTML?

| Page type (count) | Initial HTML for a non-JS crawler | Verdict |
|---|---|---|
| DB essays `/writing/:slug` (161+) | Real head + full `articleBody` in JSON-LD; body visible only after JS | **Good** (best-in-repo) — `prerender-heads.mjs:404–435` |
| DB books `/books/:slug` | Real head + Book schema; no body | OK |
| 6 prerendered JSON-library types (leadership articles, context, formation, life, creeds, history) | Real head (title/desc/OG per page); content after JS | OK |
| `/studyguides/:slug`, `/table/:slug`, `/how-tos/:slug`, `/read/:slug` | **Homepage head**; in sitemap but not in `prerender-heads.mjs` `LIBRARY_SOURCES` (`:378–385` lists only 6 of the sitemap's 10 manifest sources) | **Gap** — sitemap invites Google to URLs that present as duplicate homepages pre-render |
| FAQ (10) + compare (6) | Homepage head; not in sitemap; hardcoded prose + FAQPage schema render only after JS | **Worst case** — real content, invisible twice over |
| Crisis landers (11) | Homepage head; not in sitemap | Gap |
| Book funnels (21 pairs) | Homepage head; 14 root-level funnels are in the sitemap (`generate-sitemap.mjs:44–57` — note `/alone-in-a-crowded-church` is missing even there), 9 `/books/*` funnels in neither | Gap |
| Tools (30) | Homepage head; 5 in sitemap; content is client-state (inputs/results), thin by nature for crawlers | Acceptable for interactive tools, but the reference-data tools (glossary 1,647 lines, Bible Reference 1,693 lines) contain genuinely indexable words no crawler will get |
| Hubs (`/theology`, `/justice`, `/nation`, `/leadership`, `/life`, …) | Homepage head; partially in sitemap | Gap |
| Admin (24 routes) | robots.txt-blocked; 19 admin pages render no meta noindex (only robots Disallow) | OK-ish; note a Disallowed page can still index by URL reference — meta noindex can't be seen through the Disallow, so this is as good as it gets without an auth-wall header |

Local `dist/` confirms the shape: only 1 `index.html` exists under `dist/public`
(prerender wasn't run in this local build; it runs on Vercel per `vercel.json:2`).

Thin-content risk: `/help` (231 lines, ~49 links — a triage link wall) sits in
the sitemap at priority 0.9 (`generate-sitemap.mjs:101`); it serves users well
but is index-thin; that priority belongs on essays. Tool pages and `/subscribe`,
`/search`, `/dashboard` should stay out of (or noindexed in) any expanded sitemap.

---

## 3. On-page

### 3.1 SEOMeta coverage — effectively complete

**209 of 243 page files render `SEOMeta` directly.** The 34 without: 19 admin
pages (fine) and 15 ebook thank-you pages — which all render `EbookThankYou`,
and that shared component emits `SEOMeta … noindex` itself
(`client/src/components/EbookThankYou.tsx:46`). The 10 non-shared thank-you
pages also pass `noindex` (e.g. `BelieveThankYou.tsx:22`). **Coverage of public
pages is 100%; all 25 thank-you pages are correctly noindexed.** (An earlier
sweep claiming 108 pages lacked SEOMeta was verified false by direct grep.)

Titles are templated `${title} | LiveWell by James Bell` (`SEOMeta.tsx:45`); no
duplicate titles or descriptions were found across FAQ/compare/tool samples.
Some FAQ/prophetic titles run long (>60 chars) — they truncate in SERPs but the
keywords lead, which is the right tradeoff.

### 3.2 Headings — clean

One `<h1>` per page on every audited template: `Home.tsx:156`,
`ArticleDetail.tsx:561` (markdown-sourced leading headings are stripped at
`ArticleDetail.tsx:697`, preventing double-h1 from essay bodies — a nice touch),
`tools/VerseFinder.tsx:217`, `faq/DoesGodExist.tsx:83` (FAQ questions are h2s —
correct for FAQPage rich results). One weakness: funnel pages like `Babylon.tsx`
have an h1 (`:61`) and **no h2s at all** — pitch sections are unlabeled
`<section>`s, giving Google no topical outline of a page trying to rank for its
book's subject.

### 3.3 Images — near-clean

60 `<img>` tags in `client/src`; 57 have meaningful alts (`BookCover.tsx:35`
`alt={title}`, `ArticleDetail.tsx:645` `alt={post.title}`); 3 have `alt=""`, of
which one correctly adds `aria-hidden` (`ResourcesForPastors.tsx:49`) and two do
not (`Pastors.tsx:22`, `Substack.tsx:25` — decorative, should be `aria-hidden`).
Not an SEO problem; noted for the a11y pass.

### 3.4 Internal linking — the orphan clusters

Verified by repo-wide href grep (only `App.tsx` route definitions reference these
paths from outside their own files):

- **The 10 FAQ pages cross-link each other richly** ("Related questions" blocks,
  e.g. `faq/WhyArePeopleLeavingChurch.tsx:303–305`) and link out to essays
  (`faq/WhatIsDeconstruction.tsx:127` → `/writing/deconstruction-is-not-destruction`)
  — **but zero pages outside the FAQ folder link into any FAQ page.** Not the
  Footer (`Footer.tsx:16–124`), not `MinimalNav.tsx`, not `/help`, not `/doubt`,
  not the essays they cite. The cluster is a sealed island.
- **The 6 compare pages are worse:** the only inbound link in the entire codebase
  is `faq/WhatIsTheDifferenceBetweenCatholicAndProtestant.tsx:119` → 
  `/compare/catholic-vs-protestant` — i.e., an orphan linking to an orphan. The
  other 5 compare pages have zero inbound links. They also don't cross-link each
  other.
- Combined with §1.2: **the 16 FAQ/compare pages are in neither the sitemap nor
  the site's link graph.** Short of an external backlink, Google cannot discover
  them at all.
- Crisis landers are healthier: linked from `Help.tsx:102,134` and
  `StartHereDiagnostic.tsx:146–214`; the four link-out hubs (`Deconstruction.tsx:220`
  etc.) point to `/post-christian`.
- Three reference tools are true orphans (zero inbound links, unregistered on
  the `/tools` hub): `/tools/bible-says`, `/tools/quotes`, `/tools/glossary`
  (Footer links the quiz at `Footer.tsx:74`, not these). `/tools/saved` has 3
  inbound links.
- **URL-structure inconsistency:** 12+ funnels live at root (`/babylon`,
  `/covenant`) while 9 live under `/books/` (`/books/believe`) — two conventions
  for the same page type (map §2). Root-level slugs also permanently occupy
  namespace (`/grief` the lander vs `/covenant` the funnel are siblings). Not
  worth churning existing equity now, but every *new* funnel should pick one
  convention (`/books/*` is the honest one) and the root funnels should carry
  Book breadcrumbs so Google understands the hierarchy their URL denies.

---

## 4. Structured data

What actually ships (grep-verified counts, representative evidence):

| @type | Where | State |
|---|---|---|
| Organization + WebSite (w/ SearchAction) | Homepage only (`Home.tsx:102`; helpers `SEOMeta.tsx:113–148`) | OK (homepage-only is fine) |
| Article + BreadcrumbList | `ArticleDetail.tsx:483–497`; prerendered variant adds `articleBody` + `wordCount` (`prerender-heads.mjs:211–241`) | Good; client version omits articleBody/wordCount/articleSection that the helper supports (`SEOMeta.tsx:150–160`) — prod prerender covers the gap for essays |
| FAQPage | **All 10 FAQ + all 6 compare pages** (e.g. `faq/DoesGodExist.tsx:49`, `comparisons/CalvinismVsArminianism.tsx:89`) + 5 landers | Correct Question/acceptedAnswer structure — wasted while unindexed (§1.2, §3.4) |
| Book + Offer ($9.99 USD) | 16 funnel pages + `BookDetail.tsx` | Two tiers: rich (`ConsiderTheBirds.tsx:62–80`: description, publisher, image, availability) vs minimal (`Babylon.tsx:35–44` and ~13 others: **no description, no image, no publisher**) — the minimal tier won't earn rich results with product info |
| WebApplication + $0 Offer | 17 tool pages (e.g. `tools/BibleReference.tsx:1299`) | Good idea, incomplete (~13 tools lack it) |
| CollectionPage | 4 pages (`Books.tsx`, `ToolsHub.tsx`, `SermonSeries.tsx`, `PostChristian.tsx`) | Sparse |
| BreadcrumbList | 5 page types | Missing on FAQ/compare/funnels/hubs |
| Course | 1 (`FormationGuides.tsx`) | One-off |

Validation of emitted blocks:

- **`publisher.logo` is `favicon.svg`** (`SEOMeta.tsx:184`, `prerender-heads.mjs:237`)
  — Google requires a raster logo (PNG/JPG/WebP, ≥112×112px) for Article
  publisher logos; an SVG favicon fails that spec on every essay. Same value is
  baked into every prerendered essay head.
- Book/Offer blocks are structurally valid (`price: "9.99"`, `priceCurrency:
  "USD"`); the minimal tier is *valid but empty-handed* — no image means no
  book-cover rich result.
- FAQPage blocks are structurally correct. Note Google now shows FAQ rich
  results mostly for well-known authoritative sites — the schema still helps
  answer engines and AI overviews, which is precisely this platform's skeptic
  audience.
- No Person page-level schema on `/about` in the client (prerender adds it,
  `prerender-heads.mjs:53,138–153`) — fine.

Missing where it would pay: Article (or LearningResource) on the JSON-library
essay types beyond the prerender head; BreadcrumbList on FAQ/compare/funnels;
`sameAs`/`@id` linking of the Person entity across pages (entity consolidation
for "James Bell" queries); `isbn`/`datePublished` on Book where real.

---

## 5. Social / OG

- `SEOMeta` emits complete OG + Twitter tags with dimensions on every page
  (`SEOMeta.tsx:73–96`); prerender mirrors them statically (`prerender-heads.mjs:271–298`).
- Real per-page OG images exist only for the 6 prerendered library types +
  studyguides (`build-og-images.mjs:31–40, 105–112` — sharp-rendered brand
  cards; note studyguide OG images are generated but studyguide pages are *not*
  in the prerender, so nothing references them statically). Essays get dynamic
  `/api/og?title=…` cards or their cover image (`prerender-heads.mjs:414–416`).
  Everything else — FAQ, compare, funnels (unless they pass a cover), tools,
  hubs — falls to the branded default card.
- **All of it is undermined by `Disallow: /api`** (§1.1): scrapers that honor
  robots.txt can't fetch the card. This can silently null the entire social
  image system for the platform's primary distribution channel (Facebook, where
  Bell's existing audience lives).
- Client-side social meta on non-prerendered pages is irrelevant to scrapers
  (they don't run JS) — so FAQ/compare/funnel/tool pages currently unfurl as
  "LiveWell by James Bell" homepage cards regardless. Same fix as §1.4.
- No `twitter:site`/`twitter:creator` (no X account exists — correct to omit).
  `og:locale` absent (trivial, optional).

---

## 6. Findings ranked

| # | Severity | Finding | Evidence | Effort |
|---|---|---|---|---|
| 1 | **Critical** | ~120 indexable routes missing from sitemap — including all 16 FAQ/compare pages, 11 crisis landers, 22 tools, 9 `/books/*` funnels, major hubs | §1.2; `generate-sitemap.mjs:39–125` vs App.tsx route table | **S** — extend `STATIC_PAGES` or generate from a route manifest; half-day |
| 2 | **Critical** | FAQ + compare clusters have zero inbound internal links (sealed islands); 3 tools fully orphaned | §3.4; repo-wide href grep; `Footer.tsx:16–124` | **S–M** — footer "Common questions" block + links from `/doubt`, `/help`, `/post-christian`, related essays; 1 day |
| 3 | **High** | `Disallow: /api` in robots.txt blocks every OG image (`/api/og`) from social scrapers and image search | §1.1; `robots.txt:7`; `site.ts:34` | **XS** — `Allow: /api/og` line above the Disallow; 5 minutes |
| 4 | **High** | Non-prerendered pages (FAQ, compare, funnels, tools, hubs, 4 sitemap'd library types) serve the homepage head to non-JS crawlers — duplicate-homepage signature + no social unfurl | §1.4; `prerender-heads.mjs:40–127,378–385`; `client/index.html:7–38` | **M** — extend prerender with a static-route manifest (title/desc per route) + the 4 missing library sources; 1–2 days. (Full body prerender/SSG is the L-size follow-up.) |
| 5 | **High** | FAQ/compare content invisible twice (no sitemap + no links) while carrying correct FAQPage schema — the site's purpose-built search surface is dead weight | §1.2, §3.4, §4 | Covered by #1 + #2 |
| 6 | **Medium** | `publisher.logo` = `favicon.svg` on all Article schema (client + every prerendered essay) — fails Google's raster-logo requirement | `SEOMeta.tsx:184`; `prerender-heads.mjs:237` | **XS** — ship a 512×512 PNG logo, change two lines |
| 7 | **Medium** | 14 minimal-tier Book schemas lack description/image/publisher (vs the rich `ConsiderTheBirds.tsx:62–80` pattern); no BreadcrumbList on funnels/FAQ/compare | §4 | **S** — align on the rich pattern; half-day |
| 8 | **Medium** | llms.txt stale: links the 301'd `/after-christendom`, names 10 of 21 ebooks, omits FAQ/compare/crisis pages entirely | §1.5; `llms.txt:56`; `vercel.json:28` | **XS–S** — rewrite once; or generate from route data |
| 9 | **Medium** | Checked-in `sitemap.xml` stale (contains dead `/after-christendom`, missing `/babylon`); sitemap falls back silently (exit 0) to article-less output on DB failure | §1.2; `generate-sitemap.mjs:257–262` | **XS** — gitignore or regenerate the artifact; fail the build (or alert) on fallback |
| 10 | **Medium** | Trailing-slash duplicates unmanaged (no `trailingSlash` in vercel.json; directory-style prerender output; canonical echoes the requested path) | §1.3 | **XS** — add `"trailingSlash": false` |
| 11 | **Low** | Funnel URL split (12 root-level vs 9 `/books/*`); `/alone-in-a-crowded-church` missing even from the funnel block in STATIC_PAGES | §3.4; `generate-sitemap.mjs:44–57` | **XS** for the sitemap line; convention decision for new books |
| 12 | **Low** | Funnel pages (e.g. `Babylon.tsx`) have no h2 outline; 2 decorative imgs lack `aria-hidden`; index.html references a nonexistent `SiteStructuredData` component | §3.2–3.3; `client/index.html:44–46` | **XS** each |
| 13 | **Low** | 8 query-string URLs spend sitemap budget on faceted `/writing?…` views; `/help` at priority 0.9; `Crawl-delay` unnecessary | §1.2, §2 | **XS** |

---

## 7. Highest-leverage SEO fixes (search + word-of-mouth audience)

The audience arrives two ways: typed questions into Google ("does god exist",
"pastor burnout", "calvinism vs arminianism") and links shared by people —
pastors to congregations, readers to friends — mostly on Facebook and in texts.
The fixes below serve exactly those two doors, in order of return per hour:

1. **Put the missing ~120 pages in the sitemap and link the FAQ/compare cluster
   into the site** (findings 1, 2, 5). The site already wrote the content that
   matches its audience's actual queries and then hid it from both discovery
   mechanisms. A footer "Common questions" section, links from `/doubt`, `/help`,
   `/post-christian` and the related essays, plus ~120 sitemap lines. One day of
   work; it activates 16 purpose-built landing pages and dozens more.

2. **`Allow: /api/og` in robots.txt** (finding 3). Five minutes. Every link a
   pastor shares on Facebook — the platform's stated highest-yield channel —
   currently risks unfurling without an image because the site blocks its own
   card renderer.

3. **Extend the head prerender to every static route** (finding 4). The
   machinery exists and works (`prerender-heads.mjs`); it just stops at 13
   hand-listed pages + 6 library types. A route-manifest pass so FAQ, compare,
   funnels, crisis landers, tools, and hubs each ship their own title,
   description, canonical, and OG card turns ~150 duplicate-homepage URLs into
   distinct pages for every non-JS consumer — social scrapers, Bing, and the
   AI answer engines the skeptic audience increasingly asks first.

4. **Fix the Article publisher logo and enrich the 14 minimal Book schemas**
   (findings 6, 7). Small, mechanical, and it upgrades the two page types that
   can actually win rich results: 161+ essays (valid logo → publisher credit)
   and the $9.99 funnels (image + description → book rich results with price).

5. **Regenerate llms.txt from the live route data** (finding 8). For a platform
   whose hardest-case reader now asks ChatGPT and Perplexity before Google, the
   one file written for answer engines should not point at a redirect and omit
   half the catalog and all the question pages.

Not recommended yet: full SSG/SSR migration. The head-prerender + JSON-LD
articleBody pattern already covers the essays (the content that matters most),
and the Decision Log rules out a framework rewrite. Do items 1–5 first; measure
Search Console coverage for 6–8 weeks; revisit body prerendering only if the
rendered-vs-crawled gap still shows.
