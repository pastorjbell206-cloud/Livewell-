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

- **/help (80 to 84).** Its layout shift of 0.137 is the crisis section moving down when "What people bring most" arrives with the needs index, after first paint; its largest paint is React's lede. What it would take: the chips from data committed in the bundle (or their space held while they load), and held text for the page. Not done here: it is the crisis page, its held text would have to carry the help lines word for word, and its first screen is not a change to make in passing.
- **/tracks (87 to 89).** Its held text is right, but the real track card's description is set larger than the held line, so the largest paint comes when the app has run. What it would take: the held description at the card's size. The tracks pages were others' work this day.
- **/start (87 to 89) and /downloads (62 to 71).** Recorded only, as asked. Both still have the shell moved at run time (they were left out of the new placement on purpose). /downloads now carries its first shelf of covers in its held text, merged from the shelf's own work today, and rose from 62 to 70 and 71; its largest paint still comes after the app's code. Placing their shell before `#root`, as every other held page now has it, is one line in `SHELL_STAYS_IN_ROOT` once that work has settled.
- **Pages bound by blocking time.** The essay and /study/explorer paint their largest text at 1.1 s in every run; what moves their score is blocking time, which on this shared machine rises with its load. On the final code the essay measured 87, 95 and 94 in three sets, and the map 88, 88 and 97; at the last check, on the merged tree with the machine quiet, 96 and 99. What is left on the map is the hold's layout of about 3,300 elements (62 ms in a trace on a desktop machine) and React's commit (30 ms); on the essay, the commit of a long page. What would take them further is drawing less before it is needed, such as the map's lower sections only as they near the screen: a change to those pages' structure rather than a speed fix.
