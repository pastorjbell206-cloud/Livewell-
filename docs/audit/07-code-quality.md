# 07 — Code Quality & Maintainability (Future Velocity)

> Site-elevation audit, step 1.7. Question: how hard is it to make this site
> elite and keep it there? Builds on `00-architecture-map.md` (which already
> inventories dead code, 38/50 unused ui primitives, ~90 unwired scripts, two
> lockfiles, `api/index.ts` at 2,691 lines `strict:false` with ~179 `any`,
> zero client tests, no coverage tooling, content trapped in JSX). Those facts
> are not re-derived here; this file quantifies the tax they impose on the
> next change and names the refactors that buy the most future work.
> All counts verified on the working tree, 2026-07-01.

---

## 1. Duplication Patterns — the copy-paste tax, quantified

### 1a. Book funnel pages (24 product pages + 24 thank-you pages, 48 files)

Measured, not estimated. `diff` of two `pages/books/` funnels (digits
normalized) shows **37 changed lines out of ~123** — the pages are **~85%
identical**; only `SLUG`/`TITLE`/`SUBTITLE` constants, the SEO description,
the pitch paragraphs, and the closing line differ
(`client/src/pages/books/Babylon.tsx` vs `HowToReadTheBible.tsx`).

There is not one funnel template — there are **at least three**, which is the
deeper problem:

| Template | Pages | Lines each | Thank-you | Checkout path |
|---|---|---|---|---|
| Gated-PDF (`/api/checkout`) | 13 in `pages/books/` | 117–124 | 10-line `EbookThankYou` wrapper | `BuyEbookButton` → `/api/checkout` → `/api/download` |
| Stripe Payment Link | 5 at `pages/` root (`TheMonsterInTheMirror.tsx`, `BibleAndHomosexuality.tsx`, `BibleAndTransgenderIdentity.tsx`, `IsCriticalRaceTheoryBiblical.tsx`, `TheReliabilityOfScripture.tsx`) | 90–91 | 47–48 lines each, **hardcoding download links** | `StripeBuyButton` → buy.stripe.com |
| Bespoke/older | 6 at root (`ConsiderTheBirds.tsx` 210, `WhereYourTreasureIs.tsx` 210, `WhenGodBlessAmerica.tsx` 157, `DeconstructionOfFaith.tsx` 130, `RaisingBelievers.tsx` 125, `Believe.tsx` 124) | 124–210 | mixed (5–51 lines) | mixed |

Within template 2, `BibleAndHomosexuality.tsx` vs `TheMonsterInTheMirror.tsx`
differ by 33 lines of ~91 — **~82% identical**. Across templates,
`Believe.tsx` vs `books/Babylon.tsx` share almost nothing (175 changed lines)
— the same product page has been reinvented three times, and a fix to one
family (e.g. an SEO or accessibility improvement) silently misses the other
two.

**Totals:** ~2,965 lines of product pages + ~572 lines of thank-you pages =
**~3,540 lines across 48 files**, plus ~48 lazy imports and ~48 route entries
in `client/src/App.tsx` (of its 237 `lazy()` calls and 260 routes).

**What one `BookFunnel` component + a `books.ts` data module eliminates:**
one ~150-line component (hero, sample, buy section, one thank-you), one
~25–35-line data record per book (title, subtitle, slug, cover, description,
pitch prose, checkout mode), two parameterized routes. Net: **delete
~2,800–3,000 lines and 46 files**; a new book becomes **one data entry**
instead of the current 7 hand-edits across 2 runtimes (map §2). It also
forces the two coexisting purchase flows (`BuyEbookButton` vs
`StripeBuyButton`, map §3) through one seam, and gives the 5 payment-link
thank-you pages the session verification the gated-PDF flow already has.

### 1b. FAQ landing pages (10 files, 1,684 lines)

`diff` of `client/src/pages/faq/DoesGodExist.tsx` vs `WhatIsDeconstruction.tsx`
(digits normalized): 70 changed lines of ~148 — **~76% identical**. Each file
is a `FAQ_ITEMS` data array (the real content — long single-line answer
strings) plus an identical ~110-line shell: FAQPage JSON-LD builder, WebPage
schema, accordion state, hero, related-links footer. The schema-builder alone
(`faqSchema`, `DoesGodExist.tsx:52–60`) is pasted ten times.

One `FAQLandingPage` component + ten data objects (or JSON files): **delete
~900–1,000 lines**, and every future FAQ page (these are the SEO growth
surface) costs data, not code.

### 1c. Comparison pages (6 files, 1,775 lines)

`diff` of `client/src/pages/comparisons/CatholicVsProtestant.tsx` (275 lines)
vs `BaptistVsMethodist.tsx` (304 lines): 183 changed lines — **~65–70%
identical**. Same anatomy every time: `COMPARISONS` table data,
`SHARED_GROUND`, `RELATED_ARTICLES`, `FAQ_ITEMS`, then an identical two-column
render + schema block. One `ComparisonPage` component: **delete ~700–900
lines**.

### 1d. Total deletable

| Family | Files | Lines now | After consolidation | Deletable |
|---|---|---|---|---|
| Book funnels + thank-yous | 48 | ~3,540 | ~150 component + ~700 data | **~2,900** |
| FAQ pages | 10 | 1,684 | ~120 component + data | **~950** |
| Comparison pages | 6 | 1,775 | ~150 component + data | **~800** |
| App.tsx route/import entries | — | ~100 | ~10 | ~90 |
| **Total** | **64 files** | **~7,100** | **~2,400** | **~4,700 lines** |

This is on top of (and distinct from) the ~14k lines of tool data covered
next. The precedent already exists in-repo: the justice/disruption hubs are
**config-driven twins** — 7 shared components parameterized by two configs
(map §2). The pattern is proven; it just was not applied to the newest,
highest-revenue surfaces.

---

## 2. The Tool Pattern Split — one engine vs six hand-built clones

The repo contains both the disease and the cure, side by side.

**The cure (the JSON engine pattern):**
`client/src/pages/leadership/LeaderAssessment.tsx` is **108 lines** and
renders 5 assessments from `client/public/leadership/assessments/*.json`
(burnout, deacon-readiness, elder-readiness, planting-readiness,
revitalization). `ProfileSurvey.tsx` is **186 lines** for 3 surveys.
**294 lines of code power 8 instruments** — ~37 lines of code per instrument,
with content shipped as JSON (`burnout.json` is 6.7 kB with keys
`slug/title/subtitle/intro/scale/questions/bands/closing` — a complete
assessment grammar already designed).

**The disease (the hardcoded clones):**

| Tool | File | Lines |
|---|---|---|
| Pastor Burnout | `client/src/pages/tools/PastorBurnout.tsx` | 1,681 |
| Life Audit | `client/src/pages/tools/LifeAudit.tsx` | 1,467 |
| Church Health | `client/src/pages/tools/ChurchHealth.tsx` | 1,451 |
| Marriage Assessment | `client/src/pages/tools/MarriageAssessment.tsx` | 1,198 |
| Financial Health | `client/src/pages/tools/FinancialHealth.tsx` | 1,163 |
| Emotional Health | `client/src/pages/tools/EmotionalHealth.tsx` | 970 |
| **Total** | | **7,930** |

All six are the **same shape**: `interface Question` + `interface Category {
questions: Question[] }` (`MarriageAssessment.tsx:11–20`,
`PastorBurnout.tsx:17–26`), 15–24 Likert questions, per-category scoring,
score bands with prose verdicts, category-specific recommendations. The only
engine-relevant deltas: inverted-item scoring (`PastorBurnout.tsx:377–387`),
per-category recommendation blocks, and result-band prose — perhaps 200–300
lines of engine extension total.

The absurdity is already visible in the file tree: **`burnout.json` (an
engine-driven burnout assessment) and `PastorBurnout.tsx` (1,681 hardcoded
lines) both exist**, as do `surveys/church-health.json` and
`ChurchHealth.tsx` (1,451 lines). The platform built the same instruments
twice, once each way, and the JSON way cost ~1/40th the code.

**Migration math:** extend the engine (+~250 lines), extract six JSON files
(content, not code — and it already exists as string literals in the JSX),
delete ~7,900 lines of TSX, collapse 6 routes to one `/tools/assessment/:slug`
(or keep the URLs via a slug map for SEO).

**What it unlocks (the real prize, beyond deletion):**
1. **New assessments without code.** A "Deacon's Marriage," "Elder Board
   Health," or seasonal Advent examen becomes a JSON file + registry line —
   authorable by Bell or a content agent, gated by a validator like the other
   JSON libraries (`scripts/validate-*.mjs` pattern, CI-enforced).
2. **Voice/quality gates apply to assessment prose.** Today the verdict copy
   in six tools is invisible to `voice-audit.test.ts` and the validators
   because it lives in TSX; as JSON it joins the content pipeline.
3. **Fix once, fix everywhere.** Persistence, email-results, a11y,
   copy-to-clipboard, retry UI — currently six divergent implementations
   (see §3–4: today these six tools have **no persistence at all** — a page
   refresh at question 23 of 24 loses everything, verified: zero
   `localStorage` references in `MarriageAssessment.tsx`/`PastorBurnout.tsx`).
4. It sets the template for the remaining giant tools (`DeepBibleCompanion`
   1,906, `BibleReference` 1,693, `TheologyGlossary` 1,647, `ConflictGuide`
   1,462, `SermonOutline` 1,088 — reference-data tools that need a
   data-extraction pass even if they keep bespoke UIs).

---

## 3. Error Handling — failures are silent by design

The pattern across `client/src` is: happy path rendered, failure path
swallowed.

- **One ErrorBoundary for the whole app**, mounted at the root
  (`client/src/App.tsx:561`, component at
  `client/src/components/ErrorBoundary.tsx:14–64`). It catches **render**
  errors only; its recovery is `window.location.reload()`
  (`ErrorBoundary.tsx:45`). Async/fetch/tRPC failures never reach it.
- **50 silent `.catch(() => {})` handlers** across pages (48 in `pages/`, 2 in
  `pages/tools/`) — the standard idiom for JSON-library fetches. Zero error
  handling of any kind in `lib/`.

Sampled failure behavior (what a user actually sees):

| Site | On failure | Cite |
|---|---|---|
| `ArticleDetail.tsx` (tRPC `posts.getBySlug`) | "Article not found" card + Back to Writing. Graceful, but a *network* error renders the same as a genuine 404 — no distinction, no retry | `ArticleDetail.tsx:398–464` |
| `leadership/ProfileSurvey.tsx` (JSON engine) | `.catch(() => {})` at line 39; `setData` never fires; the page shows **"Loading…" forever** (h1 at line 78). Same idiom in `LeaderAssessment.tsx` | `ProfileSurvey.tsx:29–40` |
| `studyguides/StudyGuide.tsx` (JSON library) | `.catch(() => setMissing(true))` → bare "Not found" heading, no links, no retry | `StudyGuide.tsx:82–96,111` |
| `tools/PassageContext.tsx` | **two** silent catches for its data files — a failed load renders an empty tool | `PassageContext.tsx:127–128` |
| Money path: `BuyEbookButton.tsx` | best-in-repo: 503 → "coming soon" email fallback; other errors → red message + email link. No retry | `BuyEbookButton.tsx:64–90,116–121` |
| Money path: `EbookThankYou.tsx` | `.catch(() => setStatus("unpaid"))` — a **network blip after a successful payment shows "We couldn't confirm a purchase"**. Honest copy + email fallback, but no re-check button; the customer who just paid must reload or email | `EbookThankYou.tsx:26–36` |

**Retry/recovery UI exists only in the admin** (`AdminResources.tsx:348`,
`AdminPosts.tsx:791`, `AdminBooks.tsx:180`, `AdminDeduplicate.tsx:87`). **No
public page offers retry.** tRPC errors are logged to console only
(`main.tsx:27–41`).

Why this slows future work: every new JSON-driven page copies the silent-catch
idiom (it is the local convention), production content failures are invisible
(no error state, no telemetry, nothing to observe), and debugging a user
report of "the survey never loads" starts from zero. One shared
`fetchJson` helper with a typed error state and a `<LoadFailed retry={...}>`
block fixes all 50 sites and changes the default for every future page.

---

## 4. State Management

### localStorage: 18 keys, three naming conventions, one versioned

Full inventory (writer file cited): `lw-admin-sidebar-collapsed`
(`AdminLayout.tsx:72`), `lw-discipleship-v1` (`Discipleship.tsx:31` — **the
only versioned key in the app**), `lw-formation-inventory`
(`FormationInventory.tsx:20`), `lw-plan-${slug}` (`CarePlan.tsx:31`),
`lw-whole-life` (`WholeLifeAssessment.tsx:20`), `lw-toolkit-unlocked`
(`GatedDownload.tsx:10`), `livewell:audience` (`SegmentedSignup.tsx:88`),
`livewell:bookmarks` (`ArticleDetail.tsx:83`), `livewell-sermon-workbench`
(`SermonWorkbench.tsx:12`), `livewell-workflow-${slug}`
(`GuidedWorkflow.tsx:34`), `livewell-service-${slug}`
(`ServiceBuilder.tsx:30`), `livewell-decision-log`, `livewell-visitor-tracker`,
`livewell-meeting-builder`, `livewell-illustration-library`,
`livewell-budget-calculator`, ScriptureMemory's key
(`ScriptureMemory.tsx:246`), and bare `theme` (`ThemeContext.tsx:26`).

Three prefixes (`lw-`, `livewell:`, `livewell-`) plus one unprefixed. No
migration strategy anywhere; no schema check on read except defensive
filtering in `WholeLifeAssessment`. Concretely: **if a question set changes,
saved history silently mismatches** — `FormationInventory`/`WholeLifeAssessment`
store score history keyed by domain/statement ids (resilient-ish), but
workflow/service builders store answers keyed to the current JSON's ids with
no version stamp; editing a workflow JSON strands or misbinds old answers.
Meanwhile the six biggest assessments (§2) persist **nothing** — the
highest-effort user sessions on the site (24 questions) are the only ones a
refresh destroys.

### React Query / tRPC

`new QueryClient()` with **no defaults** (`client/src/main.tsx:12`):
staleTime 0, `refetchOnWindowFocus: true` — every tab switch refetches
content that changes weekly. Exactly one component overrides it
(`MinimalNav.tsx`: navIndex with 5-min staleTime). Zero `setQueryData`, zero
`invalidateQueries` — after admin mutations, freshness relies on manual
`refetch()` (34 call sites, admin-only). One global error subscriber
redirects to login on auth errors and console-logs the rest
(`main.tsx:27–41`).

This is not currently broken — it is *undefended*. A sane default
(`staleTime: 5m` for a content site, `refetchOnWindowFocus: false`) is a
3-line change that removes a whole class of future "why is this refetching"
work.

### Contexts / prop drilling

Healthy: two contexts (Theme, Toast), `Layout` takes one prop, no drilling
pain found. Not a debt area.

---

## 5. Consistency

- **Import alias: effectively perfect.** ~800 `@/` imports vs ~1 relative
  across `client/src`. Not a debt.
- **Naming collisions:** `pages/books/RuleOfLife.tsx` (funnel) vs
  `pages/tools/RuleOfLife.tsx` (builder) — two default exports named
  `RuleOfLife` for different things; likewise `TheologyGlossary` exists as
  both `pages/TheologyGlossary.tsx` and `pages/tools/TheologyGlossary.tsx`
  (both real, both routed). Grep-and-jump costs a wrong hop every time.
- **Funnel location split:** 11 funnels at `pages/` root, 13 in
  `pages/books/` — the same page type in two directories, correlating with
  the three-template drift in §1a. New-book authors copy whichever they find
  first.
- **Date handling:** 5 distinct approaches, no shared util —
  `toLocaleDateString("en-US", {...})` (`CitationCopy.tsx:36`),
  `toISOString()` (`useFavorites.ts:18`), bare `toLocaleDateString()`
  (`WholeLifeAssessment.tsx:253`), manual construction
  (`useFormationTracker.ts:14`), `toLocaleTimeString()` (admin). Low
  individual cost; guarantees drift in rendered formats.
- **fetch vs tRPC split (mapped, and mostly rational):** tRPC for
  queries/mutations (91 call sites); raw `fetch("/api/...")` in 15 files for
  transactional endpoints that deliberately live outside tRPC in prod —
  checkout (`BuyEbookButton.tsx`), `/api/subscribe` (`Membership.tsx`,
  `MembershipSuccess.tsx`, `GatedDownload.tsx`), `/api/contact`
  (`WorkWithJames.tsx`, `EmailResults.tsx`), auth + one-shot admin ops
  (`AdminLogin.tsx`, `AdminDashboard.tsx`), `/api/rss/substack` imports; plus
  ~25 files fetching public JSON (the content-as-data pattern — fine). The
  cost is not the split itself but that the raw-fetch class has **no shared
  client** — each site hand-rolls headers, error mapping, and JSON parsing
  (see §3, §6).

---

## 6. Type Escapes beyond `api/`

`client/src` totals: **121 `as any`/`: any` across 47 files** (vs ~179 in
`api/index.ts` alone — already mapped). Top 10 files:

| File | Count |
|---|---|
| `pages/AdminPosts.tsx` | 13 |
| `pages/AdminLoadDrafts.tsx` | 11 |
| `data/money-vocation-articles.ts` | 10 |
| `pages/AdminSetupNavigation.tsx` | 9 |
| `pages/AdminDeduplicate.tsx` | 8 |
| `pages/TheologySearch.tsx` | 7 |
| `pages/AdminPublishContent.tsx` | 7 |
| `pages/AdminImportSubstack.tsx` | 6 |
| `data/manhood-articles.ts` | 6 |
| `pages/Search.tsx` | 4 |

Pattern: **the escapes cluster in the admin** (8 of 10) — the surface that
mutates the database. The public reading surface is comparatively clean.

**Untyped boundaries:** 82 `.json()` calls in `client/src`; **zod has zero
imports in `client/src`** despite zod 4 being a dependency and the schema
grammar existing server-side. Every JSON-library page, the checkout response
(`EbookThankYou.tsx:34`), the search endpoint (`Search.tsx:67`), and every
admin one-shot (`AdminDashboard.tsx:34,59,214`, `AdminSetupNavigation.tsx:37`,
`AdminLoadDrafts.tsx:44,82`) trusts the wire shape blindly. A malformed
regenerated `index.json` fails as `undefined is not a function` in a
component instead of a named validation error at the boundary. (Non-null
assertions: 10, nearly all guarded Map-group idioms — fine.)

The fix rides the same vehicle as §3: one `fetchJson(url, schema?)` helper
gives typing, validation, and error UI in a single seam.

---

## 7. Testability — why the client is hard to test, and the minimum harness

What makes it hard today (verified):

1. **No harness exists at all.** `vitest.config.ts:17` includes only
   `server/**/*.test.ts`; no `jsdom`/`happy-dom`, no `@testing-library/*`, no
   Playwright/Cypress anywhere in `package.json`. Zero `data-testid`
   attributes in all of `client/src`.
2. **Data-in-JSX** (§1–2): you cannot unit-test PastorBurnout's scoring
   (inversion logic at `PastorBurnout.tsx:377–387`) without mounting a
   1,681-line component — the scoring function and the data are module-private
   to a page. The JSON-engine pattern is inherently testable (pure engine ×
   fixture JSON); the hardcoded tools are not.
3. **tRPC coupling**: pages import the live `trpc` client; there is no msw or
   handler-level fixture layer, so any page mount needs the full
   provider stack + network mocking from scratch.
4. Selection would rely on prose text (which the voice pass rewrites) — no
   stable hooks. Inline styles are not the problem; the absence of any stable
   selector contract is.

**Minimum harness for the money paths (the 20% that protects revenue):**

- Add a vitest **jsdom project** for `client/**` (config + `@testing-library/react`
  + msw or plain `fetch` stubs; ~half a day).
- **Contract tests for the funnel pair** (~1 day):
  `BuyEbookButton` — mock `/api/checkout` → `{url}` redirects; `503` renders
  the email fallback (`BuyEbookButton.tsx:74–88`); `500` renders the error +
  email link. `EbookThankYou` — mock `/api/download?check=1` → paid renders
  download; unpaid renders the "couldn't confirm" state; network error should
  *not* claim "no purchase" (this test fails today — see §3 — and that is the
  point).
- **Route smoke test** (~1 day): iterate the route table in `App.tsx`, render
  each page inside providers with fetch/tRPC stubbed to fixtures, assert no
  throw and non-empty main content. At 260 routes this is the single
  highest-leverage test in the repo — it is what makes the §1/§2 deletions
  safe to execute.
- Defer full E2E; one Playwright spec against a Vercel preview covering
  `/babylon → checkout redirect` and `/writing/:slug` can come later and slot
  into the existing non-blocking `quality` CI job.

Total: **2–3 days to make refactoring safe.** This is a prerequisite, not a
nice-to-have — every consolidation in this report touches revenue pages.

---

## 8. Documentation That Actively Lies (beyond the drift already mapped)

Spot-checked claims vs behavior. For an AI-heavy workflow these are worse
than missing docs — agents read them as ground truth.

| Claim | Truth | Severity |
|---|---|---|
| `design-system.md:18,21,22` — bone `#F4F1EA`, mustard `#C8A951`, mustard-deep `#A88838`; file claims to be "the single source of truth for every visual decision" | `client/src/index.css:21,31,32` — `--bone:#F5F0E6`, `--mustard:#D4A017`, `--mustard-deep:#B08A12`. **Three core brand hexes are wrong** in the doc that claims authority | **Critical** — an agent obeying design-system.md repaints the brand wrong |
| `docs/ARCHITECTURE.md:33` — `api/index.ts` "~2,040 lines" | 2,691 lines (32% under) | High — undersells the prod-runtime burden the doc exists to warn about |
| `docs/ARCHITECTURE.md:9` — "~190 routes" | 260 `<Route>` tags in `App.tsx` | Medium |
| `CLAUDE.md:621` (Decision Log) — "the **five pillars** are the only taxonomy spine" | `CLAUDE.md:435` and `client/src/lib/taxonomy.ts:260–267` — **six** pillars (`PILLARS_V2`, ids 1–6). The repo's constitution contradicts itself on the content spine | High |
| `CLAUDE.md` Decision Log — "all tools are registered in /tools" | 4 tools unreachable from the hub (map §4) | Medium (already mapped; restated because it is a Decision Log entry, the doc tier agents trust most) |

Good news, for calibration: component header comments sampled
(`BuyEbookButton.tsx`, `EbookThankYou.tsx`, `SEOMeta.tsx`, the funnel page
headers) are **accurate**, and README's "Filing a piece" matches
`pillar-assignments.ts` (fallback confirmed at `taxonomy.ts:299`). The rot is
in the standalone design/architecture docs, not the code-adjacent comments.
Fix is hours: correct the three hexes (or delete `design-system.md` and point
at `index.css` per CLAUDE.md's own precedence rule), refresh ARCHITECTURE.md
counts, reconcile the five/six pillar sentence.

---

## 9. Debt Ranked by Drag on Future Improvement

| # | Debt | Why it slows the future | Rank | Effort |
|---|---|---|---|---|
| 1 | **Content trapped in JSX** — ~7,100 lines of funnel/FAQ/compare templates (§1) + ~7,900 lines of same-shape assessments (§2) + remaining giant tools | Every content improvement is an engineering task; voice/validator gates can't see the prose; every new instance is a copy-paste that widens the drift | **Critical** | Incremental; see refactors R2/R3 |
| 2 | **Zero client harness, zero stable selectors** (§7) | Blocks every refactor above from being executed safely; the money path has no contract | **Critical** | 2–3 days (R1) |
| 3 | Two-runtime API (`api/index.ts`) — already mapped (map §8, item 1) | Halves server-side velocity; noted here only for rank position | **Critical** | Structural, sliceable |
| 4 | **Silent failure idiom** — 50 `.catch(() => {})`, no public retry UI, post-payment network blip reads as "no purchase" (§3) | New pages copy the idiom; prod content failures unobservable; user-trust risk on the one page that follows payment | **High** | 1–2 days (R4) |
| 5 | **Untyped fetch boundaries** — 82 `.json()`, zod unused client-side (§6) | Every content-pipeline bug surfaces as a deep component crash instead of a boundary error | **High** | rides R4 |
| 6 | **localStorage anarchy** — 18 keys, 3 conventions, 1 versioned, no migrations; big assessments persist nothing (§4) | Any evolution of a tool's question set corrupts or strands user state; per-tool rework forever | **High** | 1–2 days (one `storage.ts` util + version stamps), or free inside R3's engine |
| 7 | Doc lies — wrong brand hexes, contradictory pillar count (§8) | Misleads every future agent session; brand-integrity risk | **High** (cheap) | Hours |
| 8 | Three funnel templates / two buy flows / two page directories (§1a, §5) | New books copy the wrong template; fixes miss 2 of 3 families | Medium (folds into R2) | — |
| 9 | Admin `any` cluster + raw one-shot endpoints (§6) | Mutating surface with weakest types; but low-traffic and behind auth | Medium | Opportunistic |
| 10 | QueryClient defaults (staleTime 0, refocus refetch) (§4) | Wasted refetches; future perf mystery | Medium (3-line fix) | Minutes |
| 11 | Date handling ×5, naming collisions | Paper cuts | Low | Opportunistic |

(Dead scripts/primitives/lockfiles/deps: already ranked in map §9 item 5;
nothing found here changes that assessment.)

---

## 10. The Refactors That Unlock the Most Future Work

Ordered — R1 makes R2/R3 safe; R4 can run in parallel.

**R1 — Client test harness: route smoke + money-path contracts.**
*What:* vitest jsdom project; contract tests for `BuyEbookButton`/`EbookThankYou`
(checkout 200/503/500; thank-you paid/unpaid/network); a 260-route render-smoke
loop with stubbed fetch/tRPC.
*Deletes:* nothing.
*Makes possible:* every deletion below without fear; catches today's real
bug (post-payment network error → "no purchase"); gives CI its first grip on
the client.
*Effort:* **2–3 days.**

**R2 — One `BookFunnel` component + book data module.**
*What:* single parameterized product page + thank-you, one data record per
book, two routes; unify the two buy flows behind one prop.
*Deletes:* **~2,900 lines, 46 files, ~48 routes/imports** (§1a).
*Makes possible:* a new book = one data entry (today: 7 edits across 2
runtimes); SEO/a11y/CRO improvements land on all 24 funnels at once; the data
record becomes the seed for collapsing the 6-places-per-book metadata
duplication (map §7). Follow-on: same move for FAQ (+~950) and comparisons
(+~800) with a component each.
*Effort:* **2–3 days** (plus 1–2 for FAQ/compare follow-on).

**R3 — One assessment engine; migrate the six clones onto JSON.**
*What:* extend the proven 108-line `LeaderAssessment` engine (inverted items,
per-category bands/recommendations, email-results) into a general
`/tools/assessment/:slug` engine; extract six JSON files; add engine-level
localStorage persistence with a version stamp; add a
`validate-assessments.mjs` CI gate.
*Deletes:* **~7,900 lines of TSX** (§2).
*Makes possible:* **new assessments without code** — the single biggest
content-velocity unlock on the platform (assessments are the top lead-gen
surface); voice gates over verdict prose; persistence + resume for the
longest user sessions; scoring becomes unit-testable pure functions.
*Effort:* **4–6 days.**

**R4 — `fetchJson<T>(url, schema?)` + `<LoadFailed retry>` sweep.**
*What:* one helper (fetch, zod-optional parse, typed error) and one small
error/retry block; sweep the 50 silent catches and the 15 raw `/api/*`
call sites onto it; set QueryClient defaults while in there.
*Deletes:* ~50 hand-rolled fetch idioms.
*Makes possible:* failures become visible, recoverable, and observable;
every future JSON page inherits the right behavior by default; the content
pipeline gets boundary validation for free.
*Effort:* **1–2 days.**

**R5 — Truth pass on the governing docs.**
*What:* fix design-system.md's three hexes (or retire the file), refresh
ARCHITECTURE.md counts, reconcile CLAUDE.md's five/six-pillar contradiction,
register or delist the 4 orphan tools.
*Deletes:* the lies.
*Makes possible:* every future agent session starts from true premises —
disproportionate value in a repo maintained largely by AI sessions.
*Effort:* **hours.**

Run R1 → R2 → R3 with R4/R5 interleaved: roughly **two working weeks** that
remove ~12,000 lines (~15% of the client), turn the three biggest content
surfaces into data, and leave the site with its first client-side safety net.
The verdict: the codebase's best patterns already exist inside it — the JSON
engine, the config-driven twins, the parity ratchet. Elite here is not
invention. It is applying the house's own best ideas to the rooms that pay
the bills.
