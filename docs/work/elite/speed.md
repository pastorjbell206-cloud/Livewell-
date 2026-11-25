# Speed and polish (unit "speed", 2026-11-23)

Branch `elite/explorer`. James asked (2026-11-23): "Bring every main page to 90 or better on Lighthouse for phones, starting with /downloads, or tell me why one can't get there." "Fix the root cause of the tests that time out when the machine is busy." "Raise the Wisdom Finder's first-answer accuracy to at least 70 percent." /downloads, the home page, /start and the tracks pages were others' work this day, so they were measured and not changed.

## 1. The tests that timed out on a busy machine

### The cause

Every test named in the earlier runs (WisdomTopic, fes, the Explorer, Connect, StudyBible.hash, hq, advent-ready, family-pages, the desk) and the two a loaded run found (the header search, the tools list) is a page-level test in jsdom that used 1 to 3 s of its own CPU on a quiet machine, against a wall-clock budget of 5 s (or findBy's 1 s). A machine shared with other suites gives a test a fraction of a core, and the same work then took three or four times as long. V8's profiler on the slow files showed where the time went:

1. **Role queries over whole pages.** testing-library's `*ByRole` computes the accessible name of every element with the role and checks each is not hidden; each check calls `getComputedStyle`, and jsdom runs its cascade for every call (its default stylesheet's selectors, then every inline property parsed again) and forgets every answer on any change to the document. Role queries were 34 to 49% of the CPU in the slow files. On the family catechism page (850 elements, 95 buttons, since every question in its list is a button) one button query after a click took 323 ms; `findByRole` repeats its query on every DOM change while a page loads.
2. **Many whole pages in one test.** WisdomTopic rendered the 24 heavy topics in one test, the Explorer 13 stops in one and 9 in another, the films test compiled and ran all 43 film drawings in one.
3. **Lazy chunks compiled inside the timed test.** The history timeline, the chapter page's parts, the film player, the header search and its reference parser are lazy imports; the first test that needed one paid for compiling it, and under load that alone ran past findBy's one second.

### What changed

Commits `f251934a` and `0bad3306`.

- `client/src/test/setup.ts` keeps each computed style until a change touches that part of the document (the element, an ancestor, or its parent's children) or any stylesheet comes, goes or changes, read from a MutationObserver before each answer. jsdom's default sheet matches on tag names, attributes and child order only, so nothing else can change a style here. The kept answer is jsdom's own. `client/src/test/style-cache.test.tsx` holds it (an ancestor hidden by style and by `hidden`, a move under a hidden parent, a stylesheet added, edited and removed, alone or inside a page's own `<style>`). On the catechism page a button query after a click: 323 ms before, 34 ms after; the same query again with no change between, 89 ms and 15 ms.
- One page to a test, with the same assertions: the 24 heavy wisdom topics (`it.each`, with a check that there are at least 20); the Explorer's walk (each stop's Next names the next stop on the road, and the walk starts at Creation, so the chain is the same); the 9 older-level stops; the 43 film drawings (with a check that there are more than 30).
- Waits on a page's words or ids, then the role query once; role queries scoped to the section they test (the catechism's card and week sections, the devotions' tabs, each map stop's item and the thread switches, the desk's highlight group and view switch, the history door's age line).
- Lazy parts imported at the top of the tests that wait on them (`hq`, `StudyBible.hash`, `StudyBible.later`, `desk`, `watch-first`, `catechism-week`, `MinimalNav.find`).
- Budgets raised only where a test is heavy by design, each with its reason in a comment: the whole Explorer map (3,300 elements, half of them drawings) 15 s; a whole Study Bible chapter 15 s (StudyBible.hash, StudyBible.later) and 20 s (the desk, where the budget was already there, now explained); the catechism page rendered twice for a reload and the devotions list then its Advent tab 10 s; the tools list, its own lazy chunk, 4 s for its one findBy. No global timeout changed.

### Timings, in ms

"Quiet": the slow files in one fork at a load of about 3, before (the tests as they were, the style cache off) and after. "Loaded": the whole suite alongside six CPU burners started for the run and stopped after (load about 10 through the run), before (run F, the old tests checked out for the run) and after (runs D and E). A split test shows its slowest part.

| Test | Quiet before | Quiet after | Loaded before | Loaded after (D / E) |
|---|---|---|---|---|
| WisdomTopic: Find Help on every heavy subject | 2,041 | 207 (24 tests) | 4,408 | 611 / 458 |
| Explorer: Next walks the thirteen stops | 2,223 | 413 (13 tests) | 7,000 | 777 / 684 |
| Explorer: the older level on the newer stops | 1,084 | 219 (9 tests) | 4,552 | 591 / 536 |
| Explorer: every stop a link (15 s budget) | 1,048 | 1,308 | 3,843 | 3,031 / 2,254 |
| Explorer: the reading level kept (15 s budget) | 818 | 1,326 | 3,013 | 4,236 / 3,110 |
| fes: the catechism card, turned and kept | 2,114 | 1,193 | 6,240 | 2,450 / 3,010 |
| fes: read aloud | 1,290 | 318 | 3,658 | 642 / 672 |
| catechism-week: answer hidden until turned | 2,098 | 725 | 5,948 | 1,534 / 1,460 |
| catechism-week: passes over the known ones | 1,281 | 532 | 3,460 | 1,222 / 1,268 |
| family-pages: the devotions list | 813 | 1,015 | 2,622 | 2,438 / 2,171 |
| family-pages: a family's own place | 1,061 | 577 | 2,881 | 1,516 / 1,507 |
| advent-ready: the Advent tab | 597 | 609 | 1,159 | 1,100 / 1,367 |
| StudyBible.hash (15 s budget) | 1,570 | 1,712 | 4,153 | 3,472 / 3,502 |
| desk: a mark through a reload (20 s budget) | 2,741 | 2,130 | 7,960 | 5,433 / 4,664 |
| hq: the history door's ages | 990 | 1,290 | 3,154 | 2,859 / 2,232 |
| Connect (slowest of 10) | 362 | 440 | 1,054 | 985 / 1,061 |
| films: each drawing a lazy chunk | (not run) | 144 (43 tests) | 2,620 | 343 / 212 |
| MinimalNav.find: straight to a verse | (not run) | 350 | 1,204 | 947 / 872 |

Under the same load, the tests that had run past 5 s now run in well under it, and the ones still near it carry a budget with its reason. Some quiet "after" figures are higher than "before": the quiet runs were an hour apart on a machine other agents share, and a scoped wait polls by id where `findByRole` resolved on the first DOM change; the loaded runs are the measure that matters here.

### The loaded runs

Before any change, the whole suite on a machine other agents were loading (5 to 10): two tests timed out (WisdomTopic's Find Help loop at 5.2 s, the Explorer's older-level loop at 5.2 s). With six burners and the first fixes, four more appeared (two Explorer map tests, the devotions list, the tools list's lazy findBy) and two in the header search; each was fixed above. Then two full `pnpm test` runs alongside six burners (load about 10 through each run): **D, 2,346 passed, 0 failed (405 s); E, 2,346 passed, 0 failed (401 s).** Run F, the old tests under the same six burners, also passed that once (2,254 tests), which is why the table above, not pass and fail, is the evidence: at that load the old tests ran at 4 to 8 s against 5.

### 2026-11-25: the second cause, pages drawn in slices

After the speed commits of 2026-11-23 (`22c48a4b`), three files timed out again on a busy machine: `client/src/pages/explorer/explorer.test.tsx`, `explorer/films.test.tsx` and `ArticleDetail.test.tsx`, each a wait that gave up after about a second. On a quiet machine the three passed together (212 tests, 19 s).

**The cause.** That work set the Bible Explorer map's data in a transition and took the essay as a deferred value, so React draws each in slices and hands Node's event loop back between them. testing-library's findBy and waitFor run outside act, so the wait's own one-second timer ran in those gaps. A diagnostic test, not kept, measured the map:

- On a quiet machine its drawing cost the same CPU in slices or in one piece (314 to 443 ms), but a 10 ms timer ran 11 to 26 times while it was drawn in slices, and 0 or 1 times while it was drawn in one piece.
- Under six CPU burners it was drawn 0.85 to 1.9 s after it was rendered (0.6 to 1.3 s in one piece), the timer running 28 to 50 times. With a findBy waiting on it at its default second, the findBy gave up before the map was drawn in three rounds of four.
- A V8 profile of those rounds showed React's work in 30 to 38 bursts (median 12 to 16 ms) and, between them, the wait's polling (`queryAllByText`), its timeout (`handleTimeout`) and the error message serializing the page (`serialize`, 34 to 85 ms).

Drawn in one piece, as before, no timer could run until the page was drawn, and the wait's next check found it before its deadline. CPU was not the cause this time; the order of the event loop was.

**What changed** (commit `a9eee015`). `untilDrawn(ready)` in `client/src/test/harness.tsx` runs each turn of the event loop inside act, where React draws without yielding, until the page has what the test needs; the test's own budget still bounds it. The map's tests wait in `mapReady()` and then look once (getBy, not a polled findBy over 3,300 elements); the essay's in `renderEssay()`; the films' map test and the new /downloads page test the same way. No budget raised, no test skipped, the app unchanged.

**Under load, before and after.** The three files together, each run with CPU burners started for it and stopped by PID after:

| Run | Tests | Burners (load) | Result |
|---|---|---|---|
| before, first | as they were | 6 (about 7) | 9 of 212 failed: the map 7, the films' map 1, the essay 1 |
| before, profiled | as they were, the Explorer file alone | 6 (about 6) | 6 of 60 failed |
| before, A1 | as they were | 6 (to 8.4) | 1 of 212 failed |
| before, A2 | as they were | 8 (to 8.9) | 6 of 212 failed |
| after, B1 | with `untilDrawn` | 6 (to 8.2) | 212 passed (38 s) |
| after, B2 | with `untilDrawn` | 8 (to 12.1) | 212 passed (98 s); the slowest map test 7.6 s against its 15 s |

## 2. The Wisdom Finder

The full record is `docs/work/elite/tools-plan.md`, section 23. In short: a second clean holdout (holdout9, 64 sentences) and a tuning set (dev9, 55) were committed first; GloVe 6B word vectors (public domain, 3.40 MB, fetched only once the finder is used) now add each topic's nearest phrasing to the matcher's score. First answer on holdout8 54.2% to 58.3%, on holdout9 50.0% to 54.7%; the first three unchanged at 75.0% and 71.9%. The aim of 70% is not met, and section 23 says why and what would.

## 3. Lighthouse on phones

Pinned Lighthouse 13.6.0 (`scripts/lighthouse-median.mjs`, median of three, phone), Playwright's Chromium, the served build (`scripts/serve-like-vercel.mjs` on port 4671, restarted after each build: it keeps compressed files in memory), each set started at a load under 6.

### What was wrong

A chapter's or an essay's text was on screen at about 1 s, yet Lighthouse put the largest paint near 4 s. The prerender wrote the page's text inside `#root`; when the app started, `lib/prerender-hold.ts` lifted that shell out of `#root` so React would not erase it, and a moved node is painted again. The browser counted that second paint, after the app's code had run, as the largest, and Lighthouse's phone simulation then counted all of the app's code before it. Seen in Chromium: with the app's scripts blocked the largest paint came with the first; with them it came after DOMContentLoaded. On pages with no prerendered text at all (/study/bible, /tools, /help, /search, the Wisdom Finder) the largest paint was always React's.

### What changed (commit `1fb666bd`)

- `scripts/prerender-heads.mjs` writes a page's shell just before `#root`, and `lib/prerender-hold.ts` holds it without moving it (a shell still inside `#root` is lifted as before). /start and /downloads keep the old way, since other work on them was landing the same day. `prerender-hold.test.ts` holds it.
- The held text is set at the reading size (`.prerender-content--read`), a question piece's short answer under a small heading as the page's own card has it (`h2.pre-kicker`), and /explore's lede at the page's lede size (`.pre-lede`), so the real page's paragraph, painted when it arrives, is never the larger.
- `main.tsx` renders a held page as a transition, as Home already did: React works in slices behind the held text, which cut the essay's blocking time.
- Held text for five pages that had none, in each page's own words and from its own data: /study/bible (the 66 books in their seven sections), /tools (every tool in its group), the Wisdom Finder (its head and the areas of life), /explore (its head, then the catalogue) and /search (its head and the line it shows first; no box, so nothing typed into a held copy is lost).
- No dependency, no new preload (the reading face stays unpreloaded, as the type rules say), CLS unchanged.

### On the merged tree: the held text drawn once before it goes

Measured again after the day's other work was merged (`c91ed254`), /family scored 82 in two runs of three, with the load near 7. In those runs the filmstrip stayed blank until 1.2 s: the browser drew no frame (the plates, which wait on an IntersectionObserver and so on a frame, were fetched only then), while the app finished, found its page ready and took the held text away. The first paint was then React's page, 13 ms before its lede (1,281 and 1,294 ms), and because the first and the largest paint were different paints the simulation counted all of the app's code before the largest: 4.6 s. The third run, whose first frame came at 228 ms, scored 94.

- `lib/prerender-hold.ts` keeps the held text until a frame has drawn it (an animation frame and the task after it). A page loading out of sight, in a background tab, is not held for one, since it draws nothing until it is shown. `prerender-hold.test.ts` holds it: a page ready before any frame keeps its held text until one is drawn.
- /study/explorer then measured 93, 90 and 64. Its held line was set as a subtitle and came within a few pixels of the real lede's size; in the run whose first frame was late, the real lede was the larger and took the largest paint. The line is now held at the lede size (`.pre-lede`, as /explore's is): Chromium's own largest-paint entry gives it about 42,600 square pixels on a 412 px phone, where the subtitle had 30,400 and the real lede's whole box is 30,411.
- What was left on /study/explorer was blocking time. A trace showed one task of 132 ms when its data arrived: React rendering and committing the whole map (74 ms), because a value set from a fetch is drawn in one piece, and then the hold's layout of the hidden page (58 ms). `ExplorerMap.tsx` now sets the map's data in a transition, so React renders it in slices: in the next trace React's part of that task was 30 ms, and the task 92 ms. Blocking time went from 589 to 713 ms in the set before to 244 to 500 ms in the set after; the machine was a little quieter for the second, so not all of that is the change.
- The essay's blocking time had the same cause. A trace showed its own render as one task of 141 ms when the essay arrived: a query's data is drawn in one piece. `ArticleDetail.tsx` now takes the essay as a deferred value, so React draws it in slices behind the loading line (or the held text), and a row that arrives after the essay is on screen never sends the reader back to the loading line. In the next trace no task of that render passed 56 ms. Measured in alternating sets of three against the same build without it: blocking time median 293 ms over nine runs against 411 over nine, scores 87, 95 and 94 against 91, 89 and 93.
- Tried and dropped: moving the hold's layout into a task of its own. It looked better on the map, but measured against the same build without it, in alternating sets of three, the essay's blocking time rose (median of six runs 583 ms against 422), so the hold still looks at the page in the task React committed in.

### Before and after

Performance, largest paint, layout shift. "Before" is the first set, on the code as it was this morning. "First pass" is the last set on commit `1fb666bd`, before the merge. "Final" is the last set on the merged tree with the changes above: for /study/explorer and the essay on the final build, for every other page on the build with the frame wait, whose code for those pages is the final code. Pages bound by blocking time move by several points between sets on this shared machine, so their range over the day's sets is given. "Merged, last check" is the re-measure on the tree after the last merge (`e94b5cce`), every page, with the machine quiet (load 1 to 6).

| Page | Before | First pass | Final | Merged, last check |
|---|---|---|---|---|
| /study/bible | 80, 4.5 s, 0 | 95, 1.1 s, 0 | 99, 1.1 s, 0 | 100, 1.1 s, 0 |
| /study/bible/john/3 | 79, 4.0 s, 0 | 93, 1.1 s, 0 | 99, 1.1 s, 0 | 100, 1.1 s, 0 |
| /writing | 92, 2.9 s, 0 | 99, 1.1 s, 0 | 99, 1.1 s, 0 | 99, 1.1 s, 0 |
| /writing/what-post-christian-means | 74, 4.3 s, 0 | 93, 1.1 s, 0 | 94, 1.1 s, 0 (87 to 95) | 96, 1.1 s, 0 |
| /questions | 91, 3.2 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 |
| /questions/jesus/did-jesus-exist | 69, 5.4 s, 0 | 91, 1.1 s, 0 | 98, 1.1 s, 0 | 99, 1.1 s, 0 |
| /family | 89, 3.7 s, 0.006 | 100, 1.1 s, 0.006 | 100, 1.1 s, 0.006 | 96, 1.1 s, 0.006 |
| /family/catechism | 83, 4.6 s, 0.004 | 99, 1.1 s, 0.004 | 99, 1.1 s, 0.004 | 100, 1.1 s, 0.004 |
| /tools | 89, 3.6 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 |
| /tools/wisdom-finder | 77, 4.4 s, 0 | 97, 1.1 s, 0 | 98, 1.1 s, 0 | 99, 1.1 s, 0 |
| /help | 84, 3.8 s, 0.137 | 83, 3.8 s, 0.137 | 80, 3.8 s, 0.137 (not changed; see below) | 84, 3.7 s, 0.137 |
| /explore | 82, 3.6 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 |
| /tracks | 86, 3.9 s, 0 | 87, 3.9 s, 0 | 88, 3.9 s, 0 (not changed; see below) | 89, 3.8 s, 0 |
| /study/explorer | 81, 4.0 s, 0 | 94, 1.1 s, 0 | 97, 1.1 s, 0 (88 to 97) | 99, 1.1 s, 0 |
| /study/explorer/watch/bible-two-minutes | 86, 3.9 s, 0 | 95, 1.1 s, 0 | 94, 1.1 s, 0 | 100, 1.1 s, 0 |
| /theology/history | 94, 3.0 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 |
| /search | 81, 5.1 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 | 100, 1.1 s, 0 |
| / (recorded only) | 100, 1.1 s, 0.016 | 99, 1.1 s, 0.016 | 99, 1.1 s, 0 | 100, 1.1 s, 0 |
| /start (recorded only) | 89, 3.8 s, 0 | 88, 3.8 s, 0 | 88, 3.9 s, 0 | 87, 3.9 s, 0 |
| /downloads (recorded only) | 65, 5.2 s, 0 | 62, 5.2 s, 0 | 70, 4.0 s, 0 | 71, 4.3 s, 0 |

Accessibility 100, best practices 96 and SEO 100 on every page, before and after.

### Under 90, and why

As measured on 2026-11-23. All four pages below now measure 90 or better: see "The last four pages" after this list.

- **/help (80 to 84).** Its layout shift of 0.137 is the crisis section moving down when "What people bring most" arrives with the needs index, after first paint; its largest paint is React's lede. What it would take: the chips from data committed in the bundle (or their space held while they load), and held text for the page. Not done here: it is the crisis page, its held text would have to carry the help lines word for word, and its first screen is not a change to make in passing.
- **/tracks (87 to 89).** Its held text is right, but the real track card's description is set larger than the held line, so the largest paint comes when the app has run. What it would take: the held description at the card's size. The tracks pages were others' work this day.
- **/start (87 to 89) and /downloads (62 to 71).** Recorded only, as asked. Both still have the shell moved at run time (they were left out of the new placement on purpose). /downloads now carries its first shelf of covers in its held text, merged from the shelf's own work today, and rose from 62 to 70 and 71; its largest paint still comes after the app's code. Placing their shell before `#root`, as every other held page now has it, is one line in `SHELL_STAYS_IN_ROOT` once that work has settled.
- **Pages bound by blocking time.** The essay and /study/explorer paint their largest text at 1.1 s in every run; what moves their score is blocking time, which on this shared machine rises with its load. On the final code the essay measured 87, 95 and 94 in three sets, and the map 88, 88 and 97; at the last check, on the merged tree with the machine quiet, 96 and 99. What is left on the map is the hold's layout of about 3,300 elements (62 ms in a trace on a desktop machine) and React's commit (30 ms); on the essay, the commit of a long page. What would take them further is drawing less before it is needed, such as the map's lower sections only as they near the screen: a change to those pages' structure rather than a speed fix.

### The last four pages (2026-11-25)

James's step 9, finished: "Bring every main page to 90 or better on Lighthouse for phones, starting with /downloads, or tell me why one can't get there." Same method as above: Lighthouse 13.6.0 from `scripts/lighthouse-median.mjs`, phone, median of three, against `scripts/serve-like-vercel.mjs` on port 4671 (restarted after each build), each set started with the 1-minute load under 6. Each number was reproduced before anything was changed, and each cause was read from a trace: the largest-paint candidates in a saved Lighthouse trace, Lighthouse's own Lantern graph run on that trace (which requests and tasks the simulated largest paint waited on), and Chromium's largest-paint and layout-shift entries in a Playwright run at the phone's size.

Performance, largest paint, layout shift and blocking time (medians):

| Page | Before | After | Merged, last check |
|---|---|---|---|
| /downloads | 74, 4.3 s, 0, 468 ms | 91, 3.5 s, 0, 8 ms and 93, 3.3 s, 0, 9 ms | 92, 3.3 s, 0, 253 ms |
| /start | 89, 3.5 s, 0, 71 ms | 100, 1.1 s, 0, 1 ms | 100, 1.1 s, 0, 7 ms |
| /tracks | 89, 3.8 s, 0, 21 ms | 100, 1.1 s, 0, 1 ms | 99, 1.1 s, 0, 112 ms |
| /help | 89, 3.7 s, 0 (0.137 in Chromium), 93 ms | 100, 1.1 s, 0, 9 ms | 100, 1.1 s, 0, 45 ms |

"Merged, last check" is the tree after merging the shared branch (`83a6a513`), measured while another agent's work kept the machine near a load of 6, which is where the blocking times come from. Accessibility 100, best practices 96 and SEO 100 throughout. At 390 and 1440 wide, in the served build, none of the four scrolls sideways, held or loaded; none logs an error but three 404s for addresses only the live site answers (`/_vercel/insights/script.js`, `/_vercel/speed-insights/script.js`, `/api/track`), on every page alike; none shifts (/downloads 0.0001 on a phone), and the crisis section on /help is drawn once, where it stays.

**/downloads, three fixes.**

1. *Its held shelf painted twice* (commit `4a309550`). The page was still in `SHELL_STAYS_IN_ROOT`, so its held text was written inside `#root` and `lib/prerender-hold.ts` lifted it out while the app's entry module ran (an InvalidateLayout with that stack at 180 ms). The first paint at 146 ms was never reported; the only largest-paint candidate, the first cover, came at 213 ms, after the app's code, and Lantern counted the entry bundle and its run before it. Taken out of the set, the shell is written before `#root` like every other held page, and main.tsx draws the page as a transition behind it. 74 to 85 (81, 85, 85), 4.3 to 3.2 s.
2. *The catalogue drawn in one piece* (commit `3d001d07`). Blocking time was 340 to 600 ms. A profile showed one task of 142 ms when the catalogue arrived: React rendering and committing every shelf, about 8,000 elements, at once. The catalogue is now set in a transition, as the map's data is; in the next profile the longest React task in that render was 18 ms. Blocking time 3 to 139 ms; 92 and 92 in two sets, but 86 to 93 from run to run (next).
3. *The page's own code ahead of the first cover* (commit `25a35c6b`). The first cover is the largest paint, and for a picture Lighthouse counts every file the page fetched before it was drawn; on this machine every file arrives within 100 ms and the first frame comes at 120 to 190. Lantern's graph showed the stylesheet, the fonts, the cover and the two dozen files of the page's own code that the prerender preloaded from the head: 600 to 700 ms of the simulated largest paint (3.2 to 2.6 s, and 4.0 to 3.4 s, with them taken out). In about half the runs the app's entry also ran before the first frame and was counted (4.0 s, 86 to 88). The prerender no longer preloads the page's code on a page whose held text opens on a picture fetched first (only /downloads); the app fetches it when it starts, behind a held page whose every file is already a plain link. 91, 91, 92 and 93, 92, 93, in runs where the entry ran before the first frame; before the merge, 11 runs of 11 at 90 or better (with the five of the trial that removed the preloads by hand).

What is left on /downloads: a picture's largest paint still counts the stylesheet, the fonts and the React bundle, which on this machine, where every file is served at once, arrive before the first frame (3.3 to 3.5 s simulated). And its blocking time still rises with the machine's load, from the browser laying out the catalogue's 8,000 elements when they arrive: in the merged check, with another agent's work running, one run of three had 479 ms and scored 80; the median was 92.

**/start** (commit `9e0b0f27`). The same cause as /downloads's first: the shell still in `#root`, lifted while the entry ran, the only candidate a paragraph of the held list at 194 ms, after the module (166 ms), though the first paint came at 160. It was the last page in `SHELL_STAYS_IN_ROOT`, so the set is gone: every held page is written before `#root`. 89 to 100.

**/tracks** (commit `86215bbe`). The held list was painted first, its largest block a track's description cut to 160 characters at 15px (29,088 square pixels); the first card's own description, whole and at 17px (`.tk-track__dek`, 50,544), became the largest paint at 624 ms, after the app. The held list now gives each track's description whole at the card's size, its lines a little more open (`.pre-dek`, 17px, line height 1.7 to the card's 1.6): Chromium gives it 53,460 square pixels, so the card's never replaces it. At the card's own line height the two came out equal to the pixel, too close to trust. 89 to 100.

**/help, two fixes.**

1. *The crisis section moved* (commit `38dd66ab`). In Chromium at a phone's size every load had a layout shift of 0.137: "What people bring most" came with the needs index after first paint and pushed the crisis section ("If you're in trouble right now", 674 px down a 412 px screen) out of view. Lighthouse counted it 0 in this session's runs only because a shift within half a second of a recorded input is excused; the trace has it, with `had_recent_input` set, and the earlier record had it at 0.137. The twelve chips are now written with the index by `scripts/build-needs-index.mjs` into `client/src/data/help-chips.json` (checked against the index by `validate-needs.mjs`) and drawn from the first paint, so nothing above the crisis lines waits on the index. No shift; 89 to 90.
2. *Nothing to call until the app ran* (commit `1ebf549d`). The page had no held text: the masthead alone until React's page, whose lede was the largest paint at 470 to 580 ms (3.7 s simulated). The prerendered page now holds, in the page's own words, the crisis line first, word for word with its links (988, HOME to 741741, 911, More lines below), then the page's head, its lede at the held lede's size (66,468 square pixels against the real lede's 47,601) and the twelve chips. 988 can be called from the first paint, before the app loads and with scripts off. The crisis section itself is not held, so it is never drawn in one place and then another: it comes with the page, under the chips, and stays (one position through each load at both widths). A link to `/help#help-now` waits for the held page to go before it scrolls (`lib/followHash`). `Help.test.tsx` checks the held crisis line and head against the page, word for word and link for link. 90 to 100.
