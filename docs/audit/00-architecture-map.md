# 00 — Architecture Map

> Site-elevation audit, step 0.1. Read-only survey of what exists as of commit
> `3967e61` (branch `site-elevation`, 2026-07-01). Companion baseline metrics:
> `00-baseline.md`. Line numbers cited were verified on this commit.

---

## 1. Framework, Language, Build Tooling, Hosting (detected, not assumed)

| Layer | What's actually there | Evidence |
|---|---|---|
| Language | TypeScript end to end, `"type": "module"` | `package.json`, `tsconfig.json` |
| UI framework | React **19.2.1** SPA (no SSR framework) | `package.json` deps |
| Routing | **wouter 3.3.5** (client-side), with a checked-in patch for 3.7.1 — version skew between dependency range and patch target | `patches/wouter@3.7.1.patch`, `package.json` |
| Build | **Vite 7.1.7** + `@vitejs/plugin-react`; esbuild bundles the dev server for `pnpm start` | `vite.config.ts`, `package.json` scripts |
| Styling | **Tailwind v4** via `@tailwindcss/vite` (no tailwind.config file; CSS-based config) — but the dominant styling is **inline styles referencing CSS variables** (~425 inline `style=` vs ~207 `className=` uses); tokens live in `client/src/index.css` `:root` | `vite.config.ts:2`, components sweep §3 |
| PWA | `vite-plugin-pwa` with a deliberately **self-destroying service worker** (`selfDestroying: true`) — installed to kill an earlier SW that cached stale deploys; full runtime-caching config still present | `vite.config.ts:8–140` |
| Data layer | tRPC v11 + TanStack Query v5, superjson transformer | `package.json` |
| Database | MySQL via **Drizzle ORM** (schema) + **mysql2** (driver); 27 tables in `drizzle/schema.ts` + 4 in `drizzle/bundles-schema.ts` | `drizzle/schema.ts` |
| Dev server | Express at `server/_core/index.ts` mounting the full tRPC router (`pnpm dev`) | `package.json` scripts |
| **Prod runtime** | **Vercel serverless**: one self-contained function `api/index.ts` (**2,691 lines**) re-implementing every client-called procedure by hand against pooled MySQL. This is the single most important architectural fact in the repo. | `api/index.ts`, `vercel.json:5–7` |
| Hosting | Vercel. Build command chains 7 content/asset generators before `vite build` + prerender | `vercel.json:2` |
| Package manager | pnpm **10.4.1** (pinned with SHA). ⚠️ **Both `pnpm-lock.yaml` AND `package-lock.json` are tracked in git** — two lockfiles for one project is drift waiting to happen | `git ls-files` |
| CI | `.github/workflows/ci.yml`: blocking `build` job (typecheck → 4 content validators → vitest → vite build), non-blocking `quality` job (Lighthouse on `/` only + axe on 3 pages — axe currently **skips in CI** due to Chrome/ChromeDriver skew). Node 20 (deprecation warnings already firing). Second workflow: `publish-articles.yml`. | ci.yml; CI log for job 84615277311 |
| Odd build detail | `@builder.io/vite-plugin-jsx-loc` runs in the **production** build (a dev/debug plugin adding JSX location attributes) | `vite.config.ts:1,9` |

**Scale snapshot:** 243 page files · 260 routes · 91 component files · 143 files in `scripts/` · 65 server TS files · 27+4 DB tables · 30 docs files · dist output 67 MB (17.9 MB raw JS in 627 chunks).

---

## 2. Route / Page Tree (260 routes, `client/src/App.tsx:293–553`)

Routing: wouter `<Route>` list, React 19 `lazy()` for all but four eager pages
(`NotFound` L3, `Home` L12, `Writing` L13, `Books` L15 — intentional: the
highest-traffic pages skip the lazy round-trip). Suspense fallback is a spinner
(`PageFallback`, L281–287). **No scroll-to-top handling on navigation** (wouter
default). Admin routes are wrapped in `<ProtectedRoute requireAdmin>`.

```
/
├── Core
│   ├── /                      Home.tsx            homepage: mission doors + latest essays
│   ├── /about · /help · /doubt · /search · /subscribe (EmailSignup) · /work-with-james
│   ├── /privacy · /terms · /accessibility
│   └── /404 + catch-all       NotFound.tsx        (L552–553)
├── Writing
│   ├── /writing               Writing.tsx         essay index, track/pillar filters
│   ├── /writing/:slug         ArticleDetail.tsx   article + progress bar + KeepReadingBook funnel
│   └── /articles → /writing   inline redirect component (L269–273)
├── Taxonomy hubs
│   ├── /pillars · /framework · /living-well · /exile
│   ├── /theology + 14 sub-routes (methodology, doctrine/:slug, biblical, hermeneutics,
│   │       history + history/:slug, creeds, compare, glossary, questions, traditions,
│   │       search, paths, passage)               pages/Theology*.tsx, pages/history/
│   ├── /justice + /disruption  config-driven twin hubs — same 7 components parameterized
│   │       by JUSTICE/DISRUPTION configs (PropheticHub/Posture/Topic/Glossary/
│   │       Questions/Witnesses/Consistency, L146–153) + /justice/timeline + /lament
│   └── /nation + 7 sub-routes (5 essays via one NationEssay component + scorecard + policy)
├── Leadership (26 routes under /leadership) — hub, articles, library, governance,
│   │   sermon-series, bible-sermons(+:bookId), formation index/guides/:slug/topic,
│   │   handbook, servant-leadership, inventory
│   └── interactive: sermon-prep, illustrations, meeting, visitation, assessment/:slug,
│       survey/:slug, workflow/:slug, service/:slug, decision-log, budget, before-you-post
├── Pastors: /pastors · /for-pastors · /for-leaders · /pastors-resource-wall
│       · /resources-for-pastors
├── Life & family: /life · /life/:slug · /life/assessment · /marriage · /parenting
│       · /family (+catechism, devotions, reading-plans) · /for-families→/parenting (L275)
├── Tools: /tools hub + 27 sub-routes (see §4) · /quiz alias → TheologyQuiz
├── Books & commerce
│   ├── /books (catalog) · /books/:slug (detail) · /books-store · /read · /read/:slug
│   ├── 12 root-level ebook funnels (product + /thank-you pairs): consider-the-birds,
│   │   where-your-treasure-is, alone-in-a-crowded-church, covenant, babylon,
│   │   how-to-read-the-bible, be-true-to-yourself, what-belongs-to-the-poor,
│   │   rule-of-life, why-not-what, sermon-on-the-mount-as-politics,
│   │   prophetic-justice-101, marriage-in-ministry, the-loneliness-of-the-pastor, healwell
│   ├── 9 /books/-prefixed funnels (when-god-bless-america, believe, deconstruction-of-faith,
│   │   raising-believers, the-monster-in-the-mirror, the-reliability-of-scripture,
│   │   bible-and-homosexuality, bible-and-transgender-identity, critical-race-theory-biblical)
│   └── /book-bundles · /lead-magnets/:magnetId · /substack
│   ⚠️ 21 funnel pairs = 42 near-identical hand-registered routes; each new book costs
│      2 imports + 2 routes + Books.tsx card + EBOOKS registry + EBOOK_CATALOG + sitemap
│      + Stripe script — 7 hand-edits across 2 runtimes.
├── Guides & reference: /studyguides(+:slug) · /table(+:slug) · /resources
│       (+context/:slug, creeds/:slug, hard-issues-series) · /how-tos(+:slug)
│       · /library · /reading-paths(+:slug) · /article-collections · /authors/:slug
├── Discipleship: /discipleship · /disciple-making · /wisdom · /skeptic-track
├── Entry diagnostics: /start (StartHereQuiz) · /start-here (StartHereDiagnostic)
│       · /diagnostic · /plans/:slug (care plans) · /roadmap · /dashboard
├── Comparison landing pages (6): /compare/* (catholic-vs-protestant, calvinism-vs-
│       arminianism, baptist-vs-methodist, evangelical-vs-mainline, orthodox-vs-catholic,
│       liturgical-vs-contemporary)
├── FAQ landing pages (10): /faq/* (why-are-people-leaving-church, what-is-deconstruction,
│       is-the-bible-historically-accurate, what-denomination-should-i-join, does-god-exist,
│       hell, catholic-vs-protestant, religious-trauma, young-people, science-and-faith)
├── Crisis/topic landing pages (11): /pastoral-burnout /faith-crisis /marriage-crisis
│       /grief /parenting-help /deconstruction /church-history /church-hurt
│       /honest-questions /post-christian /sermon-series
└── Admin (23 protected routes, L245–267): login, dashboard, posts(+new/:id/edit),
        resources(+editors), books(+editors), about, settings, subscribers, sync,
        publish-content, setup-navigation, deduplicate, load-drafts, import-substack,
        moderation, notifications
```

**Orphans (verified both directions):**
- **`client/src/pages/StartHere.tsx` is the only orphaned page file** — no route, no importer. (An earlier sweep flagged Home/Writing/Books/NotFound/LeadMagnetLanding too; verified false — the first four are eager-loaded and routed, `LeadMagnetLanding.tsx` is imported by `LeadMagnets.tsx:1`.)
- No route points at a missing file.
- vercel.json adds server-side redirects the SPA also needs to know nothing about: `/articles`, `/for-families`, `/books-store`, `/quiz`, `/resources-for-pastors`, `/after-christendom(+/thank-you)` → `/babylon` (`vercel.json:22–29`).

---

## 3. Reusable Components (`client/src/components/`, 41 + 50 ui primitives)

### High-reuse core (the real design system)
| Component | Role | Uses |
|---|---|---|
| `SEOMeta` | per-route head tags + JSON-LD | ~210 |
| `Layout` | page shell: `MinimalNav` + `Footer` + CommandPalette + skip link | ~200 |
| `AdminLayout` | admin sidebar shell | 18 |
| `EbookThankYou` / `BuyEbookButton` | the ebook funnel pair (Stripe session verify / checkout) | 15 each |
| `NewsletterSignup` | the one real signup form (trpc subscribe + toast; inline/footer/minimal variants) | 11 |
| `StripeBuyButton` | *second* buy path — direct Stripe Payment Link (vs `BuyEbookButton`'s /api/checkout flow); two coexisting purchase flows | 8 |
| `MinimalNav`, `Footer` | nav + 6-column footer | via Layout |
| `TrackChip`, `ToolActions`, `TriageBadge`, `EmailResults` | badges & tool actions | 3–6 |

Single-use but intentional (16): `AuthorBio`, `BookCover`, `BookPreview`, `BookRecommendations`, `AudienceLabel`, `AudienceShare`, `CitationCopy`, `Breadcrumb`, `GatedDownload`, `KeepReadingBook`, `ReadingProgressBar`, `SampleChapterForm`, `SegmentedSignup`, `GeneratedHero` (procedural SVG hero art), 3 admin panels.

### Dead components (zero importers — 6 files)
`ArticleProgress`, `ArticleNav`, `ArticleHero`, `ArticleNextSteps`, `TableOfContents`, `ShoppingCart` — the first five are shadowed by local re-implementations inside `ArticleDetail.tsx` (the component versions were built, then bypassed).

### ui/ primitives (shadcn-style, 50 files)
Only **12 of 50 are imported anywhere** (button 12×, separator 4×, dialog 3×, tooltip/label/input 2×, toggle/textarea/sonner/skeleton/sheet/card 1×). All 24 `@radix-ui/*` packages in package.json are imported *by the wrapper files*, so nothing errors — but 38 wrappers (accordion, carousel, calendar, command, dropdown-menu, form, popover, etc.) are repo clutter that tree-shaking removes from the bundle while still costing reading time and install weight.

### Styling reality
Inline `style={{}}` with `var(--token)` references is the system (472 CSS-var references). **62 hardcoded hex values in 10 files violate the token rule** — concentrated in the admin: `AdminSyncPanel` (22), `AdminLayout` (20), `AdminTestimonialsPanel`/`AdminCommentsPanel` (6 each), plus `Footer` (#ffffff ×2) and `ArticleCard.tsx:31` (#2D4A3E). Tailwind classes appear mostly as layout utilities. `design-system.md` (root) claims to be "the single source of truth for every visual decision" while `CLAUDE.md` assigns that to `index.css` `:root` — two documents claiming the same authority.

---

## 4. Interactive Tools / Instruments (52 total)

### /tools hub (30 tool pages; 26 registered on the hub, ToolsHub.tsx:7–190)
| Tool | Route | What it does | Implementation |
|---|---|---|---|
| Deep Bible Study Companion | /tools/deep-bible | 12 books × 6 analysis layers, seminary-level | `tools/DeepBibleCompanion.tsx` (1,906 lines, all data inline) |
| Theology Quiz | /tools/theology-quiz | 20-question scored quiz, personalized recommendations | `TheologyQuiz.tsx` — **the only API-backed tool** (trpc.quiz.*) |
| Verse Finder | /tools/verse-finder | topic → curated verses, copy/share | `tools/VerseFinder.tsx` |
| Prayer Generator | /tools/prayer-generator | 9+ prayer types, templated variations | `tools/PrayerGenerator.tsx` |
| Bible Study Guide | /tools/bible-study | study guides for 12 books | `tools/BibleStudy.tsx` |
| Marriage Assessment | /tools/marriage-assessment | 15 Qs / 5 categories, browser-scored | `tools/MarriageAssessment.tsx` (1,199 lines) |
| Financial Health | /tools/financial-health | 15 Qs / 5 stewardship domains | `tools/FinancialHealth.tsx` (1,164 lines) |
| Parenting Guide | /tools/parenting-guide | stage-by-stage guidance | `tools/ParentingGuide.tsx` |
| Parenting Verses | /tools/parenting-verses | Scripture for parenting moments | `tools/ParentingVerses.tsx` |
| Emotional Health | /tools/emotional-health | 15 Qs / 5 domains | `tools/EmotionalHealth.tsx` |
| Sermon Outline | /tools/sermon-outline | topic+audience → 3-point outlines | `tools/SermonOutline.tsx` (1,088 lines) |
| Scripture Memory | /tools/scripture-memory | 40 verses, 3 practice modes, progress | `tools/ScriptureMemory.tsx` |
| Conflict Guide | /tools/conflict-guide | 5-step process × 8 conflict types | `tools/ConflictGuide.tsx` (1,462 lines) |
| Pastor Burnout | /tools/pastor-burnout | 24-Q diagnostic + recovery roadmap | `tools/PastorBurnout.tsx` (1,682 lines) |
| Life Audit | /tools/life-audit | 24 Qs / 8 life areas | `tools/LifeAudit.tsx` (1,468 lines) |
| Church Health | /tools/church-health | 18-Q congregational check | `tools/ChurchHealth.tsx` (1,452 lines) |
| Family Devotion Builder | /tools/family-devotions | age band + theme → full devotion | `tools/FamilyDevotionBuilder.tsx` |
| Discipleship Table | /tools/discipleship-table | small-group plan builder | `tools/DiscipleshipTable.tsx` |
| Rule of Life Builder | /tools/rule-of-life | multi-step practice builder | `tools/RuleOfLife.tsx` |
| Bible On Topic | /tools/bible-on | curated verses by topic | `tools/BibleOnTopic.tsx` |
| Wisdom Finder | /tools/wisdom-finder | struggle → verses + context | `tools/WisdomFinder.tsx` |
| Proverbs 31 | /tools/proverbs-31 | chapter-a-day by calendar date | `tools/Proverbs31.tsx` |
| Passage Context | /theology/passage | reference → context, genre, cross-refs | `tools/PassageContext.tsx` |

**Unregistered on the hub (reachable only by direct URL)** — contradicts the Decision Log claim that "all tools are registered in /tools":
1. `/tools/bible-says` — `tools/BibleReference.tsx` (1,693 lines, ~18 topics with misuse warnings)
2. `/tools/quotes` — `tools/QuoteLibrary.tsx`
3. `/tools/glossary` — `tools/TheologyGlossary.tsx` (1,647 lines)
4. `/tools/saved` — `tools/SavedItems.tsx` (meta-tool; localStorage favorites)

### /leadership interactive instruments (11)
Sermon Workbench (4-stage prep, localStorage, exportable), Meeting Builder, Visitation Tracker, Budget Calculator, Decision Log, Before You Post (8-question examen), plus **4 JSON-driven engines** that each power multiple instruments from `client/public/leadership/*/{slug}.json`: `LeaderAssessment` (assessments/), `ProfileSurvey` (surveys/), `GuidedWorkflow` (workflows/), `ServiceBuilder` (services/ — wedding & funeral). This engine pattern is the best architecture in the tools estate.

### Entry diagnostics (3)
`/diagnostic` (8 Qs → route to essay/book/email), `/start` (3-step branching quiz), `/start-here` (6 weighted Qs → 6 profiles).

**Cross-cutting tool facts:** everything except Theology Quiz is client-only (localStorage persistence, no accounts); no tool has tests; ~14,000 lines of reference data are hardcoded inside the 10 largest tool components rather than living as content data.

---

## 5. Third-Party Dependencies (68 deps / 34 devDeps)

Healthy core: React 19, Vite 7, tRPC 11, TanStack Query 5, Drizzle 0.44, zod 4, Tailwind 4, TypeScript 5.9.3, vitest 2, eslint 10 — all current major versions. No duplicate markdown/date/icon/animation libraries in actual use.

**Flagged:**
| Package | Problem | Evidence |
|---|---|---|
| `date-fns` ^4.1.0 | **Unused** — zero imports (native Date used) | repo-wide grep |
| `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` | **Unused** — zero imports; files feature uses a storage proxy | repo-wide grep |
| `tw-animate-css` | **Unused**; `tailwindcss-animate` already in deps | grep |
| `vite-plugin-manus-runtime` | **Unused** — not referenced in `vite.config.ts` (leftover from a scaffold) | vite.config.ts |
| `@types/google.maps` | **Unused** — no Maps code anywhere | grep |
| `mammoth` | Misfiled in `dependencies`; only used by publish scripts → devDeps | scripts/publish-*.ts |
| `@types/xml2js` | Type package in `dependencies` → devDeps | package.json |
| `streamdown` ^1.4.0 | **Oversized for its job.** 21 imports for rendering trusted markdown, but it drags shiki (every language grammar), mermaid, cytoscape, KaTeX into the build → hundreds of the 627 chunks; single grammar chunks up to 761 kB (`emacs-lisp-*.js`), `cpp` 611 kB, `wasm` 607 kB, mermaid.core 441 kB, cytoscape 432 kB. A theology site renders prose, not C++ | dist output (see baseline §3) |
| Radix ×24 | All imported, but only via ui/ wrappers of which 38/50 are unused (see §3) | components sweep |
| Missing `engines` field | No Node version pin; CI on Node 20 (being deprecated by GitHub) | package.json, CI logs |
| Dual lockfiles | `package-lock.json` and `pnpm-lock.yaml` both tracked | git ls-files |

---

## 6. Dead Code, Unused Files, Orphaned Routes

| Category | Finding |
|---|---|
| Pages | `client/src/pages/StartHere.tsx` (orphan, no route/importer) |
| Components | 6 dead: `ArticleProgress`, `ArticleNav`, `ArticleHero`, `ArticleNextSteps`, `TableOfContents`, `ShoppingCart`; 38 unused ui/ primitives |
| Server | `server/routers/stripe.ts` — stale duplicate of the mounted `server/stripe-router.ts` (imported in `server/routers.ts:9`), never imported itself |
| Scripts | Of **143 files** in `scripts/`, only **15 are wired** into package.json / CI / the Vercel build. ~90+ are one-shot artifacts kept around: 13 per-book PDF builders superseded by `build-pdfs.mjs`, 8 legacy per-library index builders, 30+ historical `add-*/insert-*/seed-*` data loads, one-time audits/migrations |
| Deps | 5 fully unused packages (§5) |
| Assets | `client/public` JSON/MD is mostly *live* (fetched via dynamic paths — naive grep overcounts orphans); genuinely suspect: legacy `/ebook/*` PDFs for retired titles, stale book samples. ⚠️ `admin-article-bodies.json` (4.3 MB) ships publicly in dist |
| Docs | `docs/audit/` pre-existing files (REPORT.md, PATCHES.md dated June 8) are stale; `docs/AUDIT-STATUS.md` overdue; `docs/ARCHITECTURE.md` line/table counts off ±30% (says api/index.ts ~2,040 lines; actual 2,691) |
| Root | `CHANGES.md` (finished work log), `design-system.md` (authority conflict with CLAUDE.md), `PUBLISH-INSTRUCTIONS.md` |

---

## 7. Where Content Lives (five stores + generated layer)

1. **MySQL via Drizzle** (source of truth for essays/books at runtime): `posts` (161+ articles), `books`, `bookBundles`, `resources`, `readingPaths`(+join), `authorProfiles`; ops tables: users, subscribers, comments, testimonials, notifications, bookPurchases, emailCampaigns, siteSettings, featured/related articles.
2. **JSON libraries in `client/public/`** (content-as-data, fetched at runtime by slug): studyguides/, wisdom/, prophetic/ + justice/, plans/, history/essays/, nation/, theology/ (incl. 675 kB passage-notes.json), family-*.json, leadership/ (manuals, assessments, surveys, workflows, services, sermon-series) — each with a generated `index.json` manifest from `scripts/build-*-index.mjs`, gated in CI by 4 validators.
3. **Markdown in `content/`** (~700 files): `content/books/*.md` manuscripts (gated PDFs built from these into `api/_ebooks/`), `content/articles/`, `content/drafts/`. Consumed by seed/publish scripts → DB; not served directly.
4. **Hardcoded in components** — the big one: ~14k lines of reference data inside the 10 largest tool pages (§4); all 21 book funnel pages carry hand-written marketing copy; comparison/FAQ/landing pages are fully hardcoded prose.
5. **`api/index.ts` inline catalogs**: `EBOOK_CATALOG` (L389–400, seeds the DB books grid) and the `EBOOKS` gated-download registry (L2487–2560) duplicate book metadata that also lives in Books.tsx cards, product pages, `scripts/create-stripe-books.mjs`, and `scripts/generate-sitemap.mjs`.

**Generated layer:** `sitemap.xml` (build-time, DB+manifests+static merge), OG images (`build-og-images.mjs`), PDFs (`build-pdfs.mjs` → `client/public/downloads/`), RSS/feed (runtime via api/index.ts rewrites), `llms.txt` (checked in at `client/public/llms.txt`), `api/static-library.generated.ts`.

**Single-source-of-truth violations (worst first):** book metadata in ~6 places per book; article bodies in markdown + DB + `admin-article-bodies.json` + `article-library.json` (admin edits don't flow back to markdown; reseeds don't overwrite DB); lead magnets defined inline across page files with no central config; tool reference data trapped in JSX.

---

## 8. Tests, Types, Documentation

**Tests** — 27 vitest files, ~292 cases, **server-only** (`vitest.config.ts` includes `server/**/*.test.ts`).
- Highlights: `api-parity.test.ts` (the dev/prod ratchet — scans client tRPC calls vs api/index.ts case labels; `KNOWN_PROD_GAPS` is currently **empty**, api/index.ts:36), `voice-audit.test.ts` (forbidden-language gate), content validators, links audit, quiz scoring, cache logic.
- 21 suites skip silently without `DATABASE_URL` (72 of 304 tests skipped in CI and locally).
- **Zero client tests**: no `*.test.tsx`, no testing-library, no Playwright/Cypress. 243 pages, 91 components, 52 tools — untested. `api/index.ts`'s 91 handler branches have no integration tests (parity checks existence, not behavior).
- **No coverage tooling configured** (no @vitest/coverage-*).

**Types** — root `tsconfig.json` is `strict: true` (tests excluded from typecheck); `api/tsconfig.json` sets **`strict: false`** deliberately (line 8). `any` density: ~179 in api/index.ts (~6.6%/lines) vs ~107 across all of server/. Zero `@ts-ignore`/`@ts-expect-error` repo-wide; 3 justified eslint-disables.

**API two-runtime state** — dev mounts 13 routers (`server/routers.ts:40–53`) + nested auth/files/posts/resources/books/settings/sync/subscribers/notifications; prod re-implements 91 case branches in one 2,691-line file. Parity is enforced by test, but **behavioral** parity is not (only name coverage). Auth: bcrypt → HMAC-SHA256 HttpOnly cookie (good, api/index.ts:1996 hard-fails on missing JWT_SECRET); CORS allow-list (good); one soft spot: `SEED_KEY || JWT_SECRET || ""` fallback at api/index.ts:89. SQL is parameterized throughout.

**Docs** — 30 files in docs/. Current: EDITORIAL-CONSTITUTION, VISION, TAXONOMY-PROPOSAL, VOICE, WORLD-CLASS-BRIEF, backend-architecture, content-library, CLAUDE.md (root). Stale: ARCHITECTURE.md (counts ±30%), AUDIT-STATUS.md, audit/REPORT.md + PATCHES.md (June 8). `.env.example` documents 6 vars but omits everything Stripe (`STRIPE_SECRET_KEY`, five `STRIPE_PRICE_*`), Mailchimp, `SEED_KEY` — a fresh deploy following it cannot sell books.

---

## 9. Plain-Language Summary

**What's solid.** The bones are genuinely good. The content estate is enormous and real — 161+ essays, 21 book funnels, 5 full-length manuscripts, and 52 working interactive tools, several of which (the JSON-driven leadership engines, the burnout diagnostic, Deep Bible Companion) are better than anything comparable sites offer. The design system is disciplined where it matters: one token file drives the brand, the voice is enforced by CI-level validators and a voice-audit test, and SEO fundamentals are strong (per-page meta + JSON-LD everywhere, generated sitemap, llms.txt, 100/100 Lighthouse SEO). The dev/prod API parity ratchet is a smart guard most codebases of this shape never build. Accessibility starts from a high floor (one serious axe violation across five audited pages). CI blocks on typecheck, content validity, tests, and build.

**What's fragile.** Everything that grows, grows by copy-paste: a new book touches seven files across two runtimes; 42 funnel routes are near-identical pairs; 90+ dead scripts and 6 dead components sit beside live ones and nothing distinguishes them; book metadata lives in six places and article bodies in four. The production API is one 2,691-line hand-typed file with strict mode off — it works, but every procedure added in dev must be re-written there by hand, and only its *existence* is tested, never its behavior. The client has no tests at all, so the 243 pages and 52 tools are protected only by the TypeScript compiler. And the payload is heavy: 17.9 MB of JS in 627 chunks, most of it syntax-highlighting grammars and diagram engines the site never uses, plus a 4.3 MB admin JSON file shipped to the public.

**The five things that most limit making this site elite:**

1. **The two-runtime API** (`api/index.ts` 2,691 lines, strict:false, 179 `any`, hand-mirrored from `server/`). Every backend improvement costs double and the prod copy is the lower-quality one. Until this is unified or generated, velocity on anything server-side is halved. *(§1, §8)*
2. **Payload bloat with a single dominant cause** — streamdown's transitive shiki/mermaid/cytoscape universe (multi-hundred-kB grammar chunks for languages a theology site will never render) plus `admin-article-bodies.json` (4.3 MB) and `article-library.json` (1.1 MB) shipped publicly. `/babylon` already pays for it: LCP 4.3s, perf 67. This is the biggest Core-Web-Vitals lever on the site. *(§5, baseline §2–3)*
3. **Zero client-side test coverage.** The product surface — pages, tools, funnels, checkout — has no automated protection. Elite requires at minimum smoke tests over routes and the money paths (buy → thank-you → download). *(§8)*
4. **Content trapped in code.** ~14k lines of tool reference data inside JSX, 21 hand-written funnel pages, book metadata duplicated across six locations. The site's own content-as-data pattern (JSON + manifest + validator) already exists and is proven — it just isn't applied to the newest, most valuable surfaces. *(§4, §7)*
5. **Accumulated mass with no pruning ritual** — 90+ one-shot scripts, 38 unused ui primitives, 6 dead components, a dead router, 5 unused dependencies, two lockfiles, stale architecture docs (±30% off) and a stale `.env.example` that can't produce a working deploy. None of it breaks the site; all of it taxes every future change and misleads every future contributor (human or AI). *(§3, §5, §6, §8)*

None of these are rewrites. Items 2 and 5 are days of work; 3 and 4 are incremental; only 1 is structural, and the parity test makes even that safe to do in slices.
