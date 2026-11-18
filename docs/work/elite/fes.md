# fes: Family, Essays, Start

Unit brief: /start's five roads (with chips on Home), the Family door, the catechism said aloud, the essay shelf, an essay's controls, and the seams in `siteCatalog.ts`. A machine restart cut the first run off in the middle of merging origin. The second run finished the merge, closed the last seams, fixed a layout shift on the catechism page, and ran the checks.

## What changed

**/start ("Start where you are").** PageHead, then five picture cards: I'm skeptical, I'm new to this, I've stepped back from faith, I want to go deeper, I'm leading a family. Each road is four to six steps. A step is one sentence and one link, and every link is a public page (start.test.tsx checks them against App.tsx and `isPublicEssay`). `/start#<road>` opens a road. The old six steps are now "I'm new to this", word for word, with "What next" after them. "I've stepped back from faith" opens with the Find Help page for church hurt. This device keeps the ticks (lib/storage, `livewell-progress-start-roads-v1`), and coming back shows "Pick up where you left off". There are no scores and no streaks. The roads are data in `client/src/lib/startRoad.json`, typed in `client/src/lib/startRoads.ts`. A step that opens a tool uses the tool's own name from `toolsList.ts`.

**Home.** The five roads are one quiet row of chips under the Find field and tonight's line. They appear in the live hero (`Home.tsx`, `home/roadChips.ts`) and in the static first-paint hero (`scripts/prerender-heads.mjs`, `homeHeroHtml`). Measured with Playwright at 390 and 1440: the headline, Find field, chip row and plate are the same size in both. With JS off, everything moves down by the same amount (144 px at 390, 96 px at 1440). That gap is the `<noscript>` notice, which only shows without JS. On a phone the plate, headline, purpose sentence and Find field stay on the first screen.

**/family.** PageHead with the house plate. Tonight's devotion comes first as a picture-led card. Then the week at a glance (`family/WeekGlance.tsx`): the week's devotion, the catechism question, a reading and the season's sets. Then three rooms as picture cards: All family devotions, The family catechism, Family reading plans. The How-to shelf and the teen years are compact tiles. Parenting, marriage, a different table and the tools for the home are closed rows. The help box stays open at the foot. No link was dropped except two tools origin folded into others. The parenting verses link now goes to /wisdom/parenting-struggles. The verse finder and Bible study guide now go to the wisdom finder and "Every tool". Tool names come from `toolName()`.

**/family/catechism.** A new "Say it aloud" section (`family/CatechismPractice.tsx`): the question large on a card, and a tap turns it to the little-ones line and the full answer, exactly as written. Previous and next buttons, the family's place remembered, and "Read it to me" only where `speechSynthesis` exists. No wording or order was changed.

**/writing.** PageHead, one essay to start with, and sections as picture-led groups, each with a drawn mark and dates. Only public essays show, and empty sections are hidden.

**Essay page (`ArticleDetail.tsx`).** The title block and reading text are untouched. The top has "Listen" and one "Aa" size control. The end has one row: Save, Share (which opens Share on Facebook, Copy link, Cite this, Send to my phone, Send to...), Print. After that come one next essay and one Substack box.

**Seams in `siteCatalog.ts`.** "For skeptics" goes to /skeptics. History's people goes to /theology/history/people. The Bible door's sixth room is now "Reading plans" (/study/plans), with the 2027 year plan inside it, named as on /study. "Guides to reading it" matches /study. "How to study the Bible" (/study/how-to-study, which arrived from the desk unit in the last merge) sits inside "Guides to reading it", because the Bible door already has its six rooms. Home's question picker, the search shortcuts and the topics rows point at /answers/SLUG.

**Catechism layout shift.** The page showed itself before the questions loaded, so the static text jumped (CLS 0.36). The loading line now carries `data-lw-loading`, so the held prerendered text stays until the questions arrive. CLS is now 0.004.

## Visible words (Playwright, inside `<main>`, before and after)

| Page | 390 before | 390 after | Phone screens before, after |
|---|---|---|---|
| / | 357 | 381 (the chips) | 10.1, 10.3 |
| /start | 430 | 73 (road closed; one open road adds its steps) | 5.2, 2.4 |
| /family | 1250 | 632 | 15.1, 7.0 |
| /family/tonight | 473 | 473 | 5.8, 5.8 |
| /family/catechism | 730 | 734 | 11.0, 11.3 |
| /writing | 330 | 152 | 4.4, 4.6 |
| essay (what-post-christian-means) | 4171 | 4154 | 29.0, 28.8 |

## What ran and passed (watched)

- `pnpm check`: passed.
- All 34 commands of the content-gates step in ci.yml: passed.
- `pnpm test`: 139 files passed, 7 skipped; 1617 tests passed, 73 skipped (after the last merge with origin).
- ESLint (`--max-warnings 0`) on every changed .ts/.tsx file: clean.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (no failures), `pnpm run audit:canonicals`: passed.
- Lighthouse median of three (`scripts/lighthouse-median.mjs`):

| Page | Performance | Accessibility | CLS |
|---|---|---|---|
| / | 98 | 100 | 0.000 |
| /start | 91 | 100 | 0.000 |
| /family | 90 | 100 | 0.010 |
| /family/catechism | 90 | 100 | 0.004 |
| /writing | 95 | 100 | 0.000 |
| essay | 82 | 100 | 0.000 |

- Screenshots at 390x844 and 1440x900, day and night, read: `/home/user/elite-shots/fes/` (home, start, each road, reload and resume, family full page, catechism and the turned card, writing, essay top, essay end with Share open, Aa).

## What was not done or not verified

- **Essay performance is 82, below the brief's 85.** The quality job's floor is 70. The tech unit measured 82 before this unit. The essay's chunk grew by 0.3 kB gzipped. The LCP of 4.2 s is the Lighthouse simulation effect described in `docs/work/elite/tech.md`. Not fixed.
- "Read it to me" was checked only for whether it shows. No speech was heard in headless Chromium.
- The essay page was checked against the static essay. The database essays need the API.

## Waits for James

- Whether the five road names and the steps on each road say it the way he would.
