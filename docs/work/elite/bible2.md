# Unit bible2: the pages inside the Bible door

Branch `elite/bible2`, from `origin/claude/todo-implementation-hhp4bm` at 9939de8b. Date: 2026-11-18.

James on the new Home: "I want this to be kind of distinct to like how to study and how to understand the Bible, and for it to be easy to access." Of the old pages: "It just looks like a lot of words." This unit gives the Study Bible's front page, every book's page, the background guides, the creeds and a new page of reading plans the look of Home and /study: something to look at and something to touch first, words after.

## What changed, page by page

### The Study Bible's front page (/study/bible)

- PageHead (label "Bible", H1 "The Study Bible", the open-book plate) with one line naming the translation: "The Berean Standard Bible, with notes on every chapter."
- The Go to box sits in the head, in the first screen at 390 and 1440. It already takes a reference ("John 3:16") or words to find ("born again", which opens the Bible search).
- "Pick up where you left off: Romans 9" shows when this device has marked a chapter read (the chapter after the last one marked, from `livewell-progress-bible`), with "Or the story at ..." beside it when the story path's next chapter differs.
- One line for a beginner: "New to the Bible? Begin with the Gospel of John."
- **The 66 books in their seven sections** (`study-bible/BookCase.tsx`, new), on a charcoal band. A fuller version of Home's shelf in the same hand: two cases, each parted into its sections (Law, History, Poetry, Prophets; Gospels, Letters, Revelation) with a post between sections and each section named under its books. Spines are as wide as their books are long, coloured by kind, named where the name fits. Touch a spine or slide a finger along a shelf: the card under the case gives the name, testament and place ("book 45 of 66"), kind and chapters, and the book's one line (from `theology/bible-books.json`), with Open, every chapter as a 44px tile, and previous and next. The legend lights one kind. "As a list" turns the drawing into the 66 names as links under the seven sections. One tab stop for the case; arrow keys, Home and End move along it.
- "Other ways in": six icon tiles (the Bible's story, what it teaches, guides to reading it, search, reading plans, Bible background).
- The front page draws at once from the committed table of books (`lib/scripture-ref`), so it no longer shows "Opening the Study Bible..." and then moves (that was a layout shift of 0.20 on a phone).

### A book's page (/study/bible/:book), one component for all 66

`study-bible/BookFront.tsx` and `study-bible/BookGlance.tsx` (new), fed only by the book's files:

- PageHead: label "The Study Bible", the book's name, its tagline from intro.json, the small open-book plate, then testament, its act in the story, and "Go to the chapters".
- **At a glance**, on a warm band:
  - Where it sits: the 66 books as a strip of marks coloured by kind, this book raised, "Genesis" and "Revelation" at the ends, "Book 45 of 66 · The Letters", and links to the books before and after.
  - Kind (the genre in `bible-books.json`, named plainly: Story, Law, Poetry, Wisdom, Prophecy, Apocalyptic, Gospel, Letter) and chapters (`books.json`).
  - Who wrote it, and When: the first sentence of the introduction's own "author" and "date" notes, word for word ("Genesis never names its author."; "Two main dates are proposed."), each with a jump to the whole note. No author or date is summarised or invented.
  - **How it is built**: the introduction's outline as a band, each part as wide as the stretch of the book it covers. Touch a part: its range, title and summary, and "Start at Romans 3:21" (a part that starts mid-chapter opens at its verse; a one-chapter book's parts are verses). Previous and next parts; arrow keys, Home and End. The parts are listed under the band as links.
- The chapters as numbered tiles (the chapter titles are in each tile's name for a screen reader and its tooltip).
- Then the introduction in the reading face, as before: what the book is; who wrote it, when, the world, why; the story and Christ; themes as numbered cards; chapters to start with; how to read it well; doctrines. The text's history, how the book has been read, and further reading now open on a tap ("Going further"). Related LiveWell pages last.
- Checked for Genesis (11 parts, two of them a few verses), Psalms (the five books), Isaiah, Mark (with its longer ending), Romans, Philemon (verses) and Revelation; a test runs every one of the 66.

### Bible background (/resources/context)

PageHead (label "Bible", the jar plate, the old first sentence as the line). Then the seven groups as picture cards, each with its own plate and count ("Choose a world": the Old Testament's world, Jewish life in Jesus's day, the Roman world, honor and shame, verses everyone quotes, the hard questions, reading past our politics), each jumping to its group. Then a find box and the 41 guides as titles under their groups, each group with a ruled icon. The two long paragraphs, the blurbs and the closing line are gone; a failed load now says so with Try again.

### The creeds (/resources/creeds)

PageHead (label "History", per the approved map; the basilica plate). Then, on a charcoal band, the 14 documents on one line of years from AD 100 to 2000, each a mark at the first year its manifest date names, coloured by group. Touch a group chip (44px): its marks stand out, its span is named ("AD 1530 to 1647 · Reformation Confessions"), and the list below shows that group alone; a card under the pointer or keyboard lights its own mark. The cards are date and title only, oldest first in each group. The survey at /theology/creeds stays linked.

### Bible reading plans (/study/plans), new

PageHead (label "Bible", the sundial plate). Twelve plans as cards: the 2027 year plan; the five charts to print (the Bible in a year, the New Testament in 90 days, the Psalms in 30 days, Matthew in a month, Mark in Lent; US Letter and A4); Proverbs in 31 days; the Bible's story at your own pace; the four family plans. Each card draws its plan as days (a square a day, a column a week; one mustard square for day one), says its length and who it is for, and opens the real plan. Two rows of chips narrow them: who is reading (anyone, just me, with my family) and how long (a month or less, a season, a year, my own pace). "Started here" shows on a plan this device has begun; no count of days missed anywhere.

Route checklist: `App.tsx` (lazy route), `scripts/generate-sitemap.mjs`, `scripts/prerender-heads.mjs` (a hub listing of every plan), `client/public/llms.txt`, `scripts/build-search-index.mjs` (and `search-index.json` rebuilt), string-literal `<SEOMeta>`; `site-routes.mjs` reads App.tsx. `BiblePlans.test.tsx` holds the family plans and the print charts to their files and checks every link is a route or a chart.

The "Reading plans" card on /study now opens /study/plans (the one line in `Study.tsx`: title "Reading plans", note "Every plan, by length"). **The header menu's "Reading plans" room should point here too**; `siteNav.ts` belongs to another unit and was not touched.

### A chapter page

Not restyled. The reader's code is unchanged; the front page and book page moved out of `StudyBible.tsx` into their own lazy chunks, so a chapter no longer carries their code or styles.

## Words, before and after

Visible text inside `<main>` (not header or footer, not screen-reader-only, not hidden), counted in Chromium on the built site after scrolling every lazy piece in.

| Page | Before (390 / 1440) | After (390 / 1440) |
|---|---|---|
| /study/bible | 2,264 / 2,264 | 191 / 274 |
| /resources/context | 1,689 / 1,689 | 445 / 445 |
| /resources/creeds | 551 / 551 | 175 / 179 |
| /study/plans | new | 255 / 255 |
| Genesis | 5,317 | 4,599 |
| Psalms | 4,195 | 2,867 |
| Isaiah | 3,579 | 2,967 |
| Mark | 5,002 | 4,600 |
| Romans | 2,857 | 2,631 |
| Philemon | 2,051 | 2,066 |
| Revelation | 2,690 | 2,466 |
| John 3 (unchanged) | 15,469 / 15,537 | 15,469 / 15,537 |

Honest reading: the front page, the background guides and the creeds now carry a tenth to a third of their words. A book's page is still mostly its introduction, as asked ("the introduction text below in the reading face"); it lost the outline summaries (now one at a time in the band), the chapter titles in the tiles, and the three longest notes behind a tap. Philemon, whose introduction has none of those long notes, gained 15 words from the drawing's labels.

## Files

New: `client/src/pages/study-bible/` `BibleFront.tsx`, `BookCase.tsx`, `BookFront.tsx`, `BookGlance.tsx`, `bookFacts.ts`, `bible.css`, `bookFacts.test.ts`, `bookPages.test.tsx`; `client/src/pages/BiblePlans.tsx`, `BiblePlans.test.tsx`, `plans.css`; `client/src/pages/resources/libraries.css`.

Changed: `client/src/pages/StudyBible.tsx` (front and book pages out, lazy; reader untouched), `resources/ContextLibrary.tsx`, `resources/CreedsLibrary.tsx`, `Study.tsx` (one line), `App.tsx`, `client/public/llms.txt`, `client/public/search-index.json`, `scripts/generate-sitemap.mjs`, `scripts/prerender-heads.mjs`, `scripts/build-search-index.mjs`.

CSS went into page-scoped files beside the pages (as Home does with `home.css`) rather than `index.css`, so it loads with each page's chunk and does not collide with the other units' appends. No new colour token; every colour is an existing variable, day and night. No hex (`validate-design` passes). The art kit's files were not edited; the pages reuse Home's shelf classes and controls by importing `home.css`.

## What I ran

- `pnpm check`: pass.
- All 34 commands of the content-gates step in `ci.yml`: pass.
- `pnpm test`: 130 files passed, 7 skipped; 1,521 tests passed, 73 skipped. New: `bookFacts.test.ts` (70: the seven sections cover the 66 once; every book has a kind; every one of the 66 outlines becomes a band that runs the whole book once, in order, with no gap; the first sentences are word for word), `bookPages.test.tsx` (the case, the card, chapters, the list, resume; the glance for the seven named books and Philemon's verses), `BiblePlans.test.tsx`.
- ESLint `--max-warnings 0` on every changed source file: clean.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass ("Every audited page canonicalises to itself, exactly once").
- Lighthouse (`scripts/lighthouse-median.mjs`, three runs, median; `serve-like-vercel.mjs`; Playwright's Chromium via `CHROME_PATH`): `/study/bible` performance 87, accessibility 100, CLS 0.000 (LCP 4.0 s); `/study/bible/romans` 91, 100, 0.000; `/study/bible/genesis` 89, 100, 0.000. `/study/bible/john/3` with the CI quality job's command (`--min performance=70,accessibility=95,seo=95 --max-cls 0.1`): performance 87, accessibility 100, SEO 100, CLS 0.000, pass.
- Layout shifts traced in a throttled phone: /resources/context 0.000, /resources/creeds 0.006, /study/plans 0.000, Psalms 0.000.
- Screenshots, 390 x 844 and 1440 x 900, day and night, first screen and full page, of /study/bible, the seven books, /study/plans, /resources/context, /resources/creeds, /study and John 3: `/home/user/elite-shots/bible2/final-*`. With the pieces used: `touch-*` (the case on Romans with its chapters open, the case lit for the prophets, the case as a list, Philemon's and Revelation's bands, the family plans, the Reformation confessions on the line, a jump to the Roman world), `glance-*`. Before: `before/`. Read and fixed on the way: spine names that never appeared (measured before the page's styles arrived), "Revelation" cut off under the shelf, plan drawings too small to read, the band below the fold on a phone (now before the facts), "Psalms 73" (now "Psalm 73"), and the front page's layout shift.

## Not verified

- A real phone or Safari; touch-sliding along the case only by clicks in Chromium.
- The spines and the narrowest parts of a band are under 44px (66 books, or Genesis's three-verse parts, cannot be wider in a phone's width). Every book and part is also reachable by 44px controls: previous and next, the legend, the list, the parts listed under the band.
- axe was not run on its own; Lighthouse accessibility only on the three pages above.
- The print charts' PDFs are built by `pnpm pdfs`, which was not run here; the links are the same ones /plans already uses.
- Lighthouse was not run on /study/plans, /resources/context or /resources/creeds.

## Waits for James

1. The header menu's "Reading plans" room should open `/study/plans` (siteNav.ts, the menu unit's file).
2. Two of the site's notes disagree on Mark's date: the short line in `theology/bible-books.json` says "roughly the late 50s to 60s", the introduction says "between the late 60s and the early 70s". The book page shows only the introduction's sentence; the short line still feeds Home's shelf. One of them should change.
3. The book page still carries the whole introduction. If he wants it shorter still, the next step is to open "The world it was written in", "Why it was written" and "Where it sits in the story" on a tap too.
4. The creeds page is labelled with the History door (the approved map puts creeds there) though it is listed among the Bible door's pages in this brief.
