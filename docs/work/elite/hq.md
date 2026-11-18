# Unit hq: the History door and the Questions door, and a page for each Honest Answer

Branch `elite/hq`, from `origin/claude/todo-implementation-hhp4bm` at 9939de8b. Date: 2026-11-18.

James on the new Home: "I want you to go full-blown and design all the websites... organized... easy to find, easy to operate." Of the old pages: "It just looks like a lot of words." This unit carries Home's look and its interactive pieces onto the History door and the Questions door, and gives each Honest Answer its own page.

## What changed, page by page

### History door (`/theology/history`)

1. PageHead, door size: label "History", H1 "Church history", line "Two thousand years, from the apostles to today.", the basilica plate, and the way into the course: "Start at lesson 1", or "Pick up at lesson N" when this device remembers the last lesson (`livewell-progress-history-course`, unchanged).
2. The timeline is the centrepiece, on a charcoal band (`components/history/EraLine.tsx`). The seven ages sit on one line with their roundels; under them a ruler draws every age's band exactly as long as its years, with 500, 1000 and 1500 marked. Choose an age by tapping it, by sliding a finger or the mouse along the line, by Earlier and Later, or by the arrow keys (Home and End jump to the ends; one tab stop for the line). The panel shows the age: its lessons in the course, who was alive (people whose lives overlap it, each a link to their card), what was decided (its councils, and the heresies dated to it, each opening its entry in place), what happened (its dated events, four shown, tap for the note, "All N events"), and "About this age" (the era summary). "Step through year by year" opens the old stepper (`HistoryTimeline`, now loaded only when opened).
3. The rooms as picture cards, four across: The course (arch plate; "14 lessons. Start at lesson 1" or "Pick up at lesson N"), People (quill), Creeds and confessions (books), Christian traditions (jars).
4. The course: the 14 lessons in order, each with its age's roundel, number, title and years (no blurbs), then the eight longer essays as "Go deeper".
5. Look it up: The councils and The heresies open in place (every entry and its anchor kept, word for word), The people and the Glossary as links.

Every old tab's content is still reachable: the course (section `#course`), the timeline (`#timeline`, which also opens the year stepper), the councils (`#councils`, `#council-…`), the heresies (`#heresies`, `#heresy-…`), and the people (`#people`, `#person-…` forward to the people page). The era summaries and every event are in the panel. Cut: the charcoal intro paragraph, the "You did not start the faith" band, the footer nav and the subject shelf under the page.

For a screen reader the line is an ordered list of seven buttons, each saying its age and years and whether it is chosen; the panel is a live region. With scripts off or slow, the prerendered page lists the seven ages with their lessons, the course, the longer essays and the rooms (`historyDoorBody` in `scripts/prerender-heads.mjs`).

### A lesson (`/theology/history/:slug`)

Only the top changed: the charcoal block is now an inner PageHead on cream with the age's roundel in a small frame, the label "Church history · Lesson N of 14" (or "Church history" for a longer essay), the title, the standfirst and subtitle, the age and years, and the Previous and Next line as before. Sections, sources, key figures, the end nav and the reading face are untouched. (`AGE_ID_BY_NAME` in `lib/historyAges.ts` maps the essays index's era names to roundels; a test checks it against the timeline file.)

### People (`/theology/history/people`, new address)

All 36 people from `church-history-figures.json`, A to Z (with a letter bar) or by age (grouped under each age's roundel and name). Each card: the roundel of the age that holds the middle of their life (no portrait or likeness), the years as the library words them, the age, the one line the library gives (role and place), and "Read the entry", which opens their summary and "Why they matter" in place. Each card keeps the hub's anchor (`#person-augustine-of-hippo`), and a link to it lands on the card, opened. `entryHref("person", …)` in `lib/historyCourse.ts` now points here, so a name linked in a lesson opens the person's card; councils and heresies still point at the hub.

### Questions door (`/topics`, "Hard questions")

1. PageHead, door size: label "Questions", H1 "Hard questions", line "Ask in your own words. Get a straight answer.", the lantern plate, "All 35 Honest Answers".
2. The ask box first, on a charcoal band (`components/questions/AskBox.tsx`, built on Home's picker classes): type a question; it shows the one closest page (an Honest Answer's own page, with its opening sentences word for word, or a topics row), then up to three next steps (Test the Case, Compare the views, Which View Am I?, Find Help where `answerCompanions` already matches; the public essay; then the next-closest questions). Before typing, three questions to try. When nothing fits it says "Nothing here answers that yet." and offers the whole-site search and Find Help. Words that call for a person bring the help lines first (the same `crisisTopicsFor` and `CrisisBlock` search uses). Nothing is sent anywhere; nothing is generated.
3. "What people ask": every Honest Answer and every topics row in nine groups, each a card with a lucide icon: Is it true?, God and suffering, Jesus and other beliefs, What Christians believe, Church and doubt, Faith in public, Home and family, Worry, money and work, A hard season. Four questions show per group, "All N" opens the rest in place. The groups are in `client/src/data/questionGroups.ts`; a test fails if an answer or a row is missing.
4. Go deeper, as picture cards: Honest Answers, For skeptics, What Christians believe (`/study/bible/doctrines`), Where Christians differ (`/theology/compare`), Everyday life (`/life`); then "Carrying something heavy right now? Find Help."

Fixed from the last review: the resurrection, Jesus and God now each have a card by name ("Did the resurrection actually happen?", "Was Jesus just a good teacher?", "Does God actually exist?"). "Can I trust the Bible" and "Can I trust the church" now carry "Guide", not "Find Help" (`READING_GUIDES` in `lib/topics.ts`); the real care pages still say "Find Help". Two rows are not listed on their own: "Is Christianity actually true?" (it opened all of /answers, which the door already offers) and the neighbours row (it opened the same answer as "Is Jesus really the only way to God?"). The slavery row opens the essay while it is public; while it is not, its stand-in is the same answer already listed, so it is not shown twice.

### Answers index (`/answers`)

PageHead (label "Questions", the tomb plate, the same H1, one line), the find box (`findAnswers`, unchanged), and every question as a short link, grouped as on the door. Typing narrows to a flat list of matches. "Not here? Ask it on Hard questions, or browse every question." The FAQPage structured data left this page (the answers are no longer on it).

### A page for each Honest Answer (`/answers/<slug>`, 35 new addresses)

The question is the H1 (inner PageHead with the tomb plate, label "Honest answers" linking to the index); the three paragraphs follow word for word in the reading face; then, where they already apply, the full essay (only while public), the book, Test the Case, Compare the views, Which View Am I?, Find Help; then Previous and Next by question, "All the questions" and "Copy a link to this answer". An unknown slug says "That answer is not here." with a link to all of them (noindex). Each page is prerendered with its own head built at build time from the answer: title is the question, description is the first paragraph cut to a whole sentence, breadcrumb Home › Honest Answers › question, and the body is the answer itself with previous, next and back links. No answer's wording was changed.

### For skeptics (`/skeptics`, new address)

PageHead (label "Questions", the lens plate, H1 "For skeptics", line "Weigh the case at your own pace. Push back anywhere.", "Open Test the Case"); the nine Test the Case cases as cards on a charcoal band, each opening its case; the first questions (the nine "Is it true?" answers, each to its page); then "Take longer": Eight Weeks for the Curious Skeptic (`/plans/skeptic`), the public essays among the skeptic's track and the essays behind the answers listed (today one: "Why Didn't the Bible Just Ban Slavery?"), and Hard questions. New sentences on the page: the line above, the section titles, and "A reading plan, one week at a time". `/skeptic-track` is untouched.

## Words on each page

Visible text inside `<main>` (not the header or footer, not screen-reader-only or hidden text), after scrolling so every lazy piece is on the page, counted in Chromium on the built site with tRPC stubbed. "Before" is the base commit built and served the same way. The count is the same at 390 and 1440.

| Page | Before | After |
|---|---|---|
| /theology/history | 1,814 (course tab) | 423 |
| People | 4,910 (hub, People tab) | 663 (/theology/history/people, entries closed) |
| /topics | 601 | 409 |
| /answers | 11,029 | 309 |
| An answer page | (was a section of /answers) | 266 (resurrection), 330 (salvation) |
| /skeptics | (new) | 178 |
| A lesson (the great councils) | 1,639 | 1,775 |

The lesson's text is the same except the top: a text diff of the two pages shows only the label (now "Church history · Lesson 6 of 14") and the age and years moved under the subtitle, about three words more. The rest of the measured difference is the counting method against a prerendered page versus a plain build, not new words.

## New addresses

- `/theology/history/people`
- `/answers/<slug>` for each of the 35 Honest Answers
- `/skeptics`

Route checklist: `App.tsx` (people before `/theology/history/:slug`, `/answers/:slug` before `/answers`), `scripts/generate-sitemap.mjs` (the three static pages, and the answers read from `answers.ts`), `scripts/prerender-heads.mjs` (per-answer heads and bodies; bodies for `/answers`, `/theology/history`, the people page and `/skeptics`; the history hub listing replaced by the door's body), `scripts/lib/site-routes.mjs` (`/answers/:slug` in `paramSources`), `client/public/llms.txt` (the three pages and every answer's address). The route smoke test needed no sample (an unknown answer renders its own page). No redirect was added.

## How old answer links behave

- `/answers#<slug>` with scripts on: the index opens `/answers/<slug>` in place of itself (history replace, so Back is not trapped).
- With scripts off: the prerendered index gives each question's row the answer's slug as its id, so the anchor lands on the link to the answer.
- `/answers#<slug>` links left in the site (Home's question picker, the retired-essay notice, the search index, the catalogue, two topics rows) work through the first path. They were not rewritten, to keep this change off Home and off the generated indexes; pointing them at `/answers/<slug>` directly is a small follow-up.
- `/theology/history#people` and `#person-…` open the people page (and the card); `#council-…`, `#heresy-…`, `#councils`, `#heresies`, `#timeline`, `#course` still land on the hub.

## What I ran, and what passed

- `pnpm check`: pass.
- Every command of the content-gates step in `ci.yml` (34, including `validate-answers`, `validate-topics`, `validate-links`, `validate-design`, `validate-no-emdash`, `build-topics-index --check`, `build-search-index --check`, `verify-sources`): all pass, run twice (before and after the last changes).
- `pnpm test`: 128 files passed, 7 skipped; 1,454 tests passed, 73 skipped. New: `client/src/pages/hq.test.tsx` (15 tests: the groups hold every answer and row, the ask matching, the ages, the history door moved through three ages by touch and keys, old anchors, a lesson's top, the people page, the answers index and pages, the old-anchor redirect, /skeptics). Changed: the /topics tests in `pages/topics.test.tsx` (the door, the labels, the named cards, the ask box, nothing-fits and help lines) and one href in `lib/historyCourse.test.ts`.
- ESLint `--max-warnings 0` on every changed source file: clean (the three changed `scripts/*.mjs` are on ESLint's ignore list).
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (35 Honest Answer pages written), `pnpm run audit:canonicals`: pass, 2,306 pages, every one canonicalises to itself.
- Lighthouse (`scripts/lighthouse-median.mjs`, three runs, median, served by `serve-like-vercel.mjs`): `/theology/history` performance 96, accessibility 100, CLS 0.000; `/topics` 91, 100, 0.000; `/answers/did-the-resurrection-actually-happen` 88, 100, 0.000 (the first run found a heading-order miss on the answer page; fixed with a hidden H2 and rerun).
- Screenshots at 390 x 844 and 1440 x 900, day and night, first screen and full page, in `/home/user/elite-shots/hq/`: the history door with the line moved through three ages (`history-*-touched.png`), a lesson, the people page, the questions door with a question typed (`topics-*-touched.png`), the answers index, two answer pages, /skeptics. Read and fixed: the "2000" and "today" marks sat on each other at the end of the ruler; four history rooms left one orphan card under three; /skeptics listed twenty questions (now the nine "Is it true?"); too much space under the people and answers heads.

## After the merge

The push met the map unit's commits (`siteCatalog.ts`, /explore). One conflict in `scripts/prerender-heads.mjs` (my history-door body beside their catalogue reader) was resolved by keeping both. Their `siteCatalog.test.ts` checks that the history page answers each hash a room names; the page now names them in one map (`HASHES` in `TheologyHistory.tsx`). After the merge: `pnpm check` pass, all 34 content gates pass, `pnpm test` 130 files passed, 7 skipped (1,470 tests passed, 73 skipped), build, sitemap, prerender and the canonical audit pass. The screenshots and Lighthouse runs were taken before the merge; the merge changed none of these pages' code except that hash map.

## Not verified

- A real phone, Safari, or a screen reader. Sliding a finger along the line was checked by its code and by clicks and keys in Chromium only.
- axe on its own (Lighthouse accessibility 100 on the three pages only; people, /answers and /skeptics were not run through Lighthouse).
- The ask box was tried with a handful of questions (in the tests and by hand), not the ten-stranger test the plan names. "Why does God allow suffering?" matches the Find Help page of that name first, ahead of the Honest Answer, because the row is the question word for word; the answer is the first next step.
- Mustard was judged by eye on the screenshots, not pixel-counted.

## Waits for James

1. The groups' names on the Questions door (Is it true?, God and suffering, Jesus and other beliefs, What Christians believe, Church and doubt, Faith in public, Home and family, Worry, money and work, A hard season) and which question sits where.
2. "Guide" as the label for "Can I trust the Bible" and "Can I trust the church" (they open Find Help pages).
3. The line on /skeptics, "Weigh the case at your own pace. Push back anywhere."
4. Whether the people of the two witnesses lists (/justice/witnesses, /disruption/witnesses) should join the people page. They were left where they are.

## Menu rooms that should now point to the new pages

For the unit that owns `siteNav.ts`, `siteCatalog.ts`, the footer and /explore (I did not touch them). The catalogue merged in from `elite/map` today has:

- `history.people` at `/theology/history#people`: works (forwards to the people page), but should be `/theology/history/people`.
- `questions.skeptics` at `/skeptic-track`: should be `/skeptics`, the new page for the person who does not believe (`/skeptic-track` is still noindex while its essays are pending).

And:

- History door, "People": `/theology/history/people`.
- History door, "The timeline": `/theology/history#timeline`.
- Questions door, "For skeptics": `/skeptics`.
- Questions door, "Honest Answers": `/answers` (the index; each answer is now one tap in).
- /explore and search may list the 35 answer pages by their own addresses.

## Files

New: `client/src/components/history/EraLine.tsx`, `client/src/components/questions/AskBox.tsx`, `client/src/components/questions/QuestionGroups.tsx`, `client/src/data/questionGroups.ts`, `client/src/lib/askQuestion.ts`, `client/src/lib/historyAges.ts`, `client/src/pages/AnswerPage.tsx`, `client/src/pages/Skeptics.tsx`, `client/src/pages/history/HistoryPeople.tsx`, `client/src/pages/hq.test.tsx`, this file.

Changed: `client/src/pages/TheologyHistory.tsx`, `client/src/pages/history/HistoryEssay.tsx` (top only), `client/src/pages/Topics.tsx`, `client/src/pages/Answers.tsx`, `client/src/pages/topics.test.tsx`, `client/src/lib/topics.ts` (`READING_GUIDES`), `client/src/lib/historyCourse.ts` (`entryHref` for people) and its test, `client/src/App.tsx` (three routes), `client/src/index.css` (one appended block, tokens only), `client/public/llms.txt`, `scripts/prerender-heads.mjs`, `scripts/generate-sitemap.mjs`, `scripts/lib/site-routes.mjs`.
