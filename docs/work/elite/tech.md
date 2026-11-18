# Unit "tech": speed, search and soundness

Branch `elite/tech`, from `6cc48594`. Worktree `/home/user/wt/tech`. Not pushed.
Audit items: section 4 items 2 and 5, section 11, roadmap 16, 22, 24, 25 (the
non-Bible links), 28 to 31 (29 to 31 here; 28 is the truth unit's), 36, and the
Step 2 lines Loading, Search and Reach.

## What changed, and why

### 1. Loading: nothing flashes or jumps on a chapter or an essay

The fault had three parts, and each has its own fix.

- **The prerendered text was unstyled and came before the masthead.**
  `scripts/prerender-heads.mjs` (`writeRoute`) now writes a page's text inside
  the static shell, under the masthead, in one wrapper,
  `.prerender-content`, styled in `client/src/index.css` with the site's
  tokens (Cormorant headings, Inter body, the prose column). The Study Bible
  chapter text is one running block with raised verse numbers, as the reader
  shows it, in place of a numbered list.
- **React erased that text and showed "One moment." while the page's code and
  data loaded.** New `client/src/lib/prerender-hold.ts`, called from
  `main.tsx` just before `createRoot`. When the shell holds prerendered text
  it is lifted out of `#root` (and renamed `#lw-held`, so the self-heal script
  in `index.html` leaves it alone), and React renders underneath with
  `#root.lw-root-wait` (laid out, not painted). When the real page has a
  heading inside `<main>` and nothing marked `data-lw-loading`, the held text
  is removed and the page shown in one step. A six-second limit ends the hold
  if the page never gets there. The front page is not held (it has its own
  static hero).
  `StudyBible.tsx` marks the chapter reader and the book page as loading until
  the parts above the fold have arrived; `TheologyHistory.tsx` does the same
  until its essays and timeline arrive.
- **The footer jumped.** `PageFallback` was already the full height of the
  screen; the footer that moved belonged to each page's own loading state
  inside `Layout`. `Layout`'s `<main>` now has `.lw-main`
  (`min-height: calc(100vh - header)`), so on every page the footer starts at
  or below the bottom of the screen and cannot be thrown down it.
- **An essay with a rewrite file waited for the database.**
  `ArticleDetail.tsx`: the loading test is now
  `rewrite ? rewriteQuery.isLoading : postQuery.isLoading`. Data flow only;
  nothing restyled. The database row (pillar, dates, cover image) fills in
  when it answers.
- **The page's own code was found late.** Each prerendered page now carries
  `<link rel="modulepreload">` for its route's chunk and that chunk's direct
  imports (`chunkPreloads` in `prerender-heads.mjs`, read from the route table
  in `App.tsx` and the built `assets/` folder).

**Measured.** Both builds served the way Vercel serves them (new
`scripts/serve-like-vercel.mjs`: `vercel.json` redirects, then the address's
own prerendered file, then the shell; gzip; `/api/trpc/*` answers with empty
data, since there is no database here).

Lighthouse, mobile, three runs, median (`scripts/lighthouse-median.mjs`):

| Page | | Performance | CLS | LCP |
|---|---|---|---|---|
| `/study/bible/john/3` | before | 64 (58, 64, 69) | 0.221 (0.593, 0.221, 0.202) | 5.0 s |
| | after | 95 (93, 95, 95) | 0.000 | 2.9 s |
| `/writing/what-post-christian-means` | before | 72 (72, 72, 66) | 0.000 (0.000, 0.023, 0.000) | 5.6 s |
| | after | 82 (82, 79, 82) | 0.000 | 3.9 s |
| `/` | before | 100 | 0.000 | 0.9 s |
| | after | 100 | 0.000 | 0.9 s |

The "before" essay shows no shift in Lighthouse here because the stubbed API
answers at once; the audit measured it with the API refused. The second
measure below shows the fault the audit described, and is the better one.

Chromium at 390 by 844 with the phone throttled (4x CPU, 1.6 Mbps, 150 ms
latency), reading layout shift and largest paint from the browser itself
(one run each; screenshots at 0.4, 0.9, 1.5, 2.2, 3.2, 4.5 and 7 s in
`/home/user/elite-shots/tech/before` and `/after`):

| Page | CLS before | CLS after | "One moment." seen before | after |
|---|---|---|---|---|
| `/study/bible/john/3` | 0.605 | 0.004 | yes | no |
| `/writing/what-post-christian-means` | 0.693 | 0.019 | yes | no |
| `/study/bible/john` | 1.152 | 0.000 | yes | no |
| `/studyguides/lament` | 0.615 | 0.000 | yes | no |
| `/theology/history` | 0.315 | 0.000 | yes | no |
| `/topics` | 0.229 | 0.052 | yes | no |
| `/help/anxiety` | 0.143 | 0.000 | yes | no |

In the same trace the chapter's largest paint is the prerendered summary at
about 1.4 s (before: 1.3 s, then wiped). The essay's is the prerendered first
paragraph.

Lighthouse still reports an LCP of 3.9 s on the essay. In a real browser the
largest paint is the prerendered paragraph (confirmed with a
`PerformanceObserver` at Lighthouse's own viewport: one entry, inside
`.prerender-content`). Lighthouse's simulated phone charges the page's code
against that paint because, unthrottled, the code arrives before the paint is
recorded. It is the same artifact `docs/audit/RESULTS.md` describes. I did not
chase it further.

### 2. One font file per typeface

The upright Inter and Cormorant Garamond files are variable fonts (checked
with fontTools: `wght` 100 to 900 and 300 to 700), and the 400, 500 and 600
files of each were the same bytes. `index.css` now declares each upright
subset once with `font-weight: 400 600` against the `-400-` file; the eight
duplicate files are deleted. The preload lines in `index.html` did not need to
change. Rendering is unchanged (the range stops at 600, as before).

### 3. Search finds the site's own main things

`scripts/build-search-index.mjs` adds, to `client/public/search-index.json`
(722 entries, 214 KB, up from 397 entries):

- **Main Pages**: 34 hubs by plain name (The Study Bible, Church history, For
  families, Tonight's family devotion, A year of family devotions, The family
  catechism, Family reading plans, Essays, Books, About James, Contact,
  Subscribe, Topics, Honest Answers, Tools, and the rest). This is the one
  hand-written table in the file: a title, one plain line saying what the page
  holds, and unshown keywords.
- **The Study Bible**: the 66 book introductions ("Introduction to Romans",
  findable by "who wrote romans"), the reading guides, the eleven acts.
- **Doctrine** (62 studies) and **Compare the Views** (31 debated doctrines).
- **Church History**: 36 people, 11 councils, 10 false teachings. Each opens
  its tab: `TheologyHistory.tsx` now reads `?tab=figures|councils|heresies`.
  A false teaching's result line says "A teaching the church answered and
  rejected", never the teaching's own claim.
- **Seasonal devotions**: the 40 days of Thanksgiving, Advent and Holy Week,
  each opening its own day.
- **Honest Answers** carry their essay's title and address as keywords, so
  "trinity" finds "How can God be three and one?".

`client/src/lib/siteSearch.ts`: a title that is exactly what was typed leads
(+160), and Main Pages win a tie. So "church history", "study bible",
"family devotions", "catechism", "books", "contact" and "augustine" now open
the right thing first (`siteSearch.sections.test.ts`).

**Find Help's box** (`client/src/lib/needs.ts`): a page stays only if it
scores at least half of the best page's score, and the list stops at three.
"my husband died" now returns the grief page alone. `Help.tsx` also shows the
help lines above the results when the words call for a person ("i want to
die"), as `/search` already did.

### 4. The Whole-Life Assessment keeps its answers

`client/src/pages/life/WholeLifeAssessment.tsx`, key
`livewell-progress-whole-life` through `lib/storage.ts`: answers and the
screen are saved as the reader goes; a reload opens where they stopped with a
note and "Start over"; a failed save shows the shared sentence. The results
screen has "Change my answers", which reopens the statements and redraws the
same run and rule (weeks already marked are kept) instead of adding a second
check-up. A finished check-up is not reopened as one in progress.

### 5. Links

- **Quote cards.** `QuoteLibrary.tsx` and `WisdomFinder.tsx` build an essay
  link only when `isPublicEssay` says the essay is public; otherwise the
  source is named without a link. `scripts/validate-links.mjs` fails on any
  routed page that links the quote corpus to essays without consulting the
  shelf.
- **Links that passed through a redirect.** `/how-tos` "Make Disciples" goes to
  `/life/making-disciples-at-the-table`; `/disruption/consistency` links
  straight to `/writing?section=faith-and-power` (its closing link now reads
  "Read the essays on faith and power"); the "Raising Believers" item, which
  redirected to the Books page that does not carry it, is removed from the two
  routed book pages. `/writing/witness-without-power` was one of the quote
  links and is covered by the shelf check.
- **Folds.** `/dashboard` to `/my-library` and `/authors/:slug` to `/about`,
  one hop in `vercel.json` with `redirectTo` stubs in `App.tsx`. The page
  files stay in the repo.

### 6. Reach

`scripts/prerender-heads.mjs` writes real text for: `/answers` (every answer
in full, with the FAQPage data the page builds at runtime), the 112 family
devotion pages (Read, Talk, Do, Pray), `/family/catechism` (every question,
both answers and the verse), `/family/reading-plans` (every day),
`/family`, `/family/tonight` and `/family/devotions` (linked lists), the 208
"What the Bible Says" pages, the 31 doctrine pages, and a linked list of the
essays on `/theology/history`. Every line is read from the data the page
renders, under the headings the page uses; `answers.ts` is bundled with
esbuild at prerender time to read it.

`/family/tonight` is in the sitemap. `client/index.html` has one `<noscript>`
line under the masthead.

### 7. The quality job

`.github/workflows/ci.yml`, job `quality` (still non-blocking): serves with
`scripts/serve-like-vercel.mjs`, and runs Lighthouse on Home, John 3 and an
essay through `scripts/lighthouse-median.mjs`, which keeps the
median-of-three and the one retry per run. Home keeps its thresholds; the
chapter and the essay assert CLS at most 0.1, accessibility and SEO at least
95, and performance at least 70 (they measured 95 and 82 here). The axe step
is unchanged.

### 8. `vercel.json`

The `git.deploymentEnabled` entry for `claude/todo-implementation-hhp4bm` is
removed, so the branch gets previews again.

## Files

New: `client/src/lib/prerender-hold.ts` (+ test),
`client/src/lib/siteSearch.sections.test.ts`,
`client/src/pages/life/WholeLifeAssessment.test.tsx`,
`scripts/serve-like-vercel.mjs`, `scripts/lighthouse-median.mjs`.

Changed: `.github/workflows/ci.yml`, `client/index.html`,
`client/public/fonts/` (8 files deleted, README), `client/public/search-index.json`,
`client/src/App.tsx`, `client/src/components/Layout.tsx`, `client/src/index.css`,
`client/src/lib/needs.ts` (+ test), `client/src/lib/siteSearch.ts`,
`client/src/main.tsx`, `client/src/pages/ArticleDetail.tsx`,
`BibleAndTransgenderIdentity.tsx`, `DeconstructionOfFaith.tsx`, `Help.tsx`,
`HowTos.tsx`, `StudyBible.tsx`, `TheologyHistory.tsx`,
`life/WholeLifeAssessment.tsx`, `prophetic/PropheticConsistency.tsx`,
`tools/QuoteLibrary.tsx`, `tools/WisdomFinder.tsx`,
`scripts/build-search-index.mjs`, `scripts/generate-sitemap.mjs`,
`scripts/prerender-heads.mjs`, `scripts/validate-links.mjs`, `vercel.json`.

Shared files touched, each a small local edit: `client/src/App.tsx` (two lazy
imports removed, one `redirectTo` const added after `ToHelpChurchHurtRedirect`,
two route components changed), `client/src/index.css` (the font-face lines; one
block after `.lw-shell-bar`; one line in the 480 px query),
`scripts/prerender-heads.mjs`, `vercel.json` (the `git` block removed; two
redirects appended), `client/index.html` (the noscript block in the shell).
`siteNav.ts` and `llms.txt` are untouched.

## What I ran, and what passed

- `pnpm check`: passed.
- All 33 commands of the content-gates step in `ci.yml`, run one by one: all
  passed, including `validate-links`, `validate-design`, `validate-no-emdash`
  and `build-search-index --check`.
- `pnpm test`: 115 files passed, 7 skipped (database); 1,318 tests passed, the
  route smoke test among them. Run before the last small commit (answer
  keywords and `siteSearch.sections.test.ts`); after it I re-ran the two
  search test files (41 passed), not the whole suite.
- `eslint --max-warnings 0` on every `.ts` and `.tsx` file touched: clean.
  The repo's ESLint config ignores `scripts/`.
- `pnpm run sitemap && pnpm run build && pnpm run prerender` then
  `pnpm run audit:canonicals`: 2,274 sitemap addresses, 0 failures.
- Looked at in Chromium at 390 by 844 and 1440 by 900, screenshots in
  `/home/user/elite-shots/tech/look`: the chapter, `#v16` on the chapter (it
  still scrolls to the verse through the hold), the essay, search for "church
  history" and "family devotions", church history with `?tab=figures`, Find
  Help with "my husband died" and "i want to die", the assessment resumed
  after a reload and at its results, the quote library, the consistency page,
  both folds, Contact, a devotion, the answers page; and with scripts off: the
  chapter, the essay, the answers, a devotion, a "What the Bible Says" page, a
  doctrine page, the catechism, the family page and Home. No sideways scroll,
  no page errors.
- No new colours were added (tokens only), and dark mode is switched off
  site-wide, so there was nothing to check in dark.

## What I did not verify

- Anything on the real domain or a Vercel preview. The CI `quality` job's new
  steps have not run on a GitHub runner; the thresholds are from this machine.
- An essay whose text lives in the database (no database here). The hold ends
  for those when the API answers, or after six seconds.
- A late cover image on a rewritten essay: if the database row carries one, it
  now arrives after the text and will move the body below the first section.
  None of the five rewrite files could be checked for this without the
  database.
- Layout shift on in-site navigation (a tap from one page to the next). The
  hold only covers a first load; the footer fix covers both.
- Safari and Firefox. The hold uses `MutationObserver`, `visibility` and
  absolute positioning only, but I looked in Chromium alone.
- `pnpm lint` on the whole repo (only on the files touched).

## Left for other units, or skipped

- **The tools in the search index**: not added. `Search.tsx` already searches
  the `/tools` registry by name, and a second copy in the JSON would show each
  tool twice. The Main Pages table has the Tools page itself.
- **A Connect page** in the search: it does not exist on this branch. When the
  connect unit adds it, add one row to `MAIN_PAGES` and rebuild the index.
- **Church history names**: a result opens the right tab, not the name itself.
  If the history unit gives each person an address or anchor, change the three
  `href` lines in `history()` in `build-search-index.mjs`.
- **The other two "Raising Believers" items** (`WhereYourTreasureIs.tsx`,
  `ConsiderTheBirds.tsx`): those pages are not routed, so no reader reaches
  them. Left alone.
- **Bible word search**, the Jude outline links, the pastors' redirect, the
  RSS feed, contrast, tap targets, the not-found page: other units.
- **My Library does not list a half-done Whole-Life Assessment** under
  "Continue". `SELF_CHECK_DRAFTS` in `lib/myProgress.ts` would need the new
  key and a registry id; left out to keep this change small.

## For whoever merges

- After merging other units, run `pnpm run search:index`. The index reads the
  family, doctrine, history and answers data, so any unit that edits those
  makes it stale and `--check` will say so.
- If a unit renames a main page or retires one, edit `MAIN_PAGES` in
  `scripts/build-search-index.mjs`.
- A page that loads its top content after its heading can add
  `<span hidden data-lw-loading />` while it waits; the held text then stays
  until the page is whole. Any new prerendered body is styled by
  `.prerender-content` with no further work.
- `Layout`'s `.lw-main` puts the footer below the fold on short pages
  (Contact, Subscribe). That is the intent; the design unit should know.

## Waits for James

- Nothing in this unit needs a decision before it merges.
- The wording of three small lines is mine and he may want to change them:
  the noscript sentence in `client/index.html`; "Your answers so far were kept
  on this device, so you can go on from where you stopped." on the
  assessment; and the 34 one-line descriptions under Main Pages in the search
  (`MAIN_PAGES`). None states a fact about him beyond his name.

## Decision Log lines to add (CLAUDE.md)

- **First paint on a prerendered page (2026-11-18).** A chapter, an essay or a
  guide paints its own text from the HTML, inside the static shell and styled
  by `.prerender-content`; `lib/prerender-hold.ts` keeps it on screen until
  the real page has its heading and nothing marked `data-lw-loading`, then
  swaps in one step. Do not move prerendered text back outside the shell, and
  do not restore a loading screen over it.
- **Measure pages as Vercel serves them.** `scripts/serve-like-vercel.mjs`
  replaces `serve -s` for Lighthouse, axe and local looks; `serve -s` answers
  every address with the home page.
- **Fonts: one variable file per upright subset**, declared
  `font-weight: 400 600`. Never add a second copy of a file under another
  weight's name.
- **Search index holds the hubs.** `MAIN_PAGES` in
  `scripts/build-search-index.mjs` is the list of main pages by plain name; a
  new hub is added there.
- **IA folds:** `/dashboard` to `/my-library`, `/authors/:slug` to `/about`.
- `vercel.json` no longer disables deployments for the work branch.
