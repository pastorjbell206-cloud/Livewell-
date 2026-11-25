# Unit inner: the last old-looking pages take the kit's look

Branch `elite/inner`, from `origin/claude/todo-implementation-hhp4bm` at 7494f183 (origin's four later commits merged in). Date: 2026-11-18.

The review (REVIEW.md, S6, S7, S8, S12 and the mustard note) left about twenty-five inner pages with the old top: a charcoal block of text, no picture, a label in an old style or none. Opening every address in the catalogue and every link on /explore found about seventy (the Study Bible pages, already rebuilt, aside). Every one of them now opens with the kit's page top, built through shared pieces, not page by page.

## Shared pieces (new)

- `lib/pagePlace.ts` (`placeFor(path)`, tested in `pagePlace.test.ts`): where a page sits on the map, read from `siteCatalog.ts`. A door's own page or a room's own page is labelled with the door alone ("Questions"); a page one step inside a room gets the door and the room ("Questions · Everyday life"). A tool the catalogue does not list by address takes its place from its group in `toolsList.ts` ("Tools · Pray and practise", "Tools · Tools for hard questions"); the family tools say "Family". The test fails if a label ever uses a name the catalogue does not.
- `components/art/InnerHead.tsx`: the kit's PageHead at the inner size with that label (both parts linked). The small plate is fetched only after the words have painted (two animation frames after mount; its frame holds the space), because fetching the plates' chunk first made every inner page paint later. On a phone the plate sits beside the label and the title only, and the line under them takes the full width.
- The small parts these pages share are at the end of `index.css` ("Inner pages"): the section bands (`.home-sec`, `.home-wrap`, the same rules as `pages/home/home.css`, so an inner page needs no second stylesheet before it paints), the question list (`.lw-faq`), the find box on cream or charcoal (`.lw-find`), the chips (`.lw-chip`), the icon-card index (`.lw-index`), the arenas, the prose band, and the /theology/compare cards. Tokens only.
- `lib/pagePlace.ts` keeps its own copy of each tool's group, so a page top does not load the whole tools list; `pagePlace.test.ts` fails if the copy and `toolsList.ts` disagree.
- `components/FaqPage.tsx`: the one template for the ten /faq pages. Each page keeps its questions, answers, line, "go deeper" link and related questions word for word; it passes them as data. The questions open one at a time, as before, now as real buttons inside headings, with the answers in the page (hidden until opened).
- `pages/comparisons/compareStyles.ts`: the six /compare pages shared one style object, copied six times; it is now one file on the kit's scale (labels, `--fs-h2`, bands, gutter). The dark closing button is the kit's `.btn btn--on-dark` (it was a button inside a link).
- `components/art/LibraryIndex.tsx`: the body of a library index, built the way a door's page is: a find box on a charcoal band first, the groups as kit chips (the chip can ride in the address: `?topic=`, `?theme=`), then the items as icon cards in sections by group. Typing or choosing a chip narrows to one list and says how many match. While the list loads, the chips and a screen's height are held so nothing jumps, and a chip's count is spoken to screen readers, not shown, since a number arriving with the list widened the chips and moved the page (CLS on /life went from 0.29 to 0.002).

## What each page got

**Index pages (README "How a door's page is built")**

| Page | H1 now (was) | First thing | Then |
|---|---|---|---|
| /life | Everyday life ("Following Jesus in every part of life", kept as the line) | Find a guide, 7 pillar chips | 69 guides as icon cards in 7 pillar sections; the 7 links it always offered as tiles; its two paragraphs and the assessment paragraph moved, word for word, to "How these guides are written" |
| /how-tos | How-to guides ("How-to guides for everyday Christian life", kept) | Find a guide, 11 subject chips, `?topic=` kept | 132 guides in 11 sections; its paragraph and three links moved below |
| /wisdom | What the Bible says, by subject ("Wisdom for all of life", kept) | the 14 arenas as icon cards on charcoal, each with its "Read the guide" link | Wisdom for today, the band, the three ways in as picture cards, its two paragraphs and the pull quote under "Why wisdom" |
| /plans | Eight-week plans ("Eight-week plans for a hard season", kept) | Find a plan (its find box, now on the band) | 29 plans as cards with progress; how a plan works (its paragraph and the Find Help line); the printed Bible plans; the crisis block, unchanged |
| /studyguides | Small group study guides ("Free Bible study guides for small groups", kept) | Find a study guide, 10 shelf chips, `?theme=` kept | 68 guides in shelf sections; what each guide holds (its paragraph and closing line) with its two links as tiles |
| /downloads | Downloads ("Every printable, in one place", kept) | Find a printable, with its Letter/A4 line | the 11 shelves as icon cards with counts, then the shelves as before, each under a kit section head |
| /help | Find Help ("What are you facing?", kept) | the crisis lines, first and unchanged, nothing above them; then the page top; then "Type it in your own words" on the band | the crisis block unchanged; "Where are you?" with kit chips and section head |

**Visible words in `<main>` on the first screen, phone 390 x 844** (same method before and after: Playwright, the page's main text, elements in the first 844px):

| Page | Before | After | Whole page before / after |
|---|---|---|---|
| /life | 114 | 38 | 4,523 / 4,637 |
| /how-tos | 85 | 49 | 5,609 / 5,427 |
| /wisdom | 107 | 68 | 537 / 574 |
| /plans | 73 | 56 | 965 / 922 |
| /studyguides | 96 | 38 | 3,302 / 3,376 |
| /help | 86 | 80 | 1,595 / 1,595 |
| /downloads | 60 | 60 to 74 (the count moves with where the shelves have loaded) | 4,193 / 4,241 |

On a laptop (1440 x 900), after: /life 32, /how-tos 37, /wisdom 108, /plans 56, /studyguides 37, /help 132, /downloads 68. The whole-page totals barely move because no words were cut: the long paragraphs moved below the lists, and the items keep their lines (clamped to two lines on the cards). /help and /downloads already led with their box; they now lead with the kit's top and the box on its band.

**Pages with a slogan for a headline** now carry the plain name, the slogan word for word directly under it: /life, /how-tos, /wisdom, /plans, /studyguides, /downloads, /help, /theology/compare (Where Christians differ), /theology/glossary (Theology glossary), /theology/questions (More questions, answered short), /family/reading-plans (Family reading plans), /theology/creeds (The creeds in brief), /theology/traditions (Christian traditions), /nation (Christ and the nation). Each plain name is the catalogue's.

**Page tops only (bodies untouched):** every tool page (28 listed, the 7 folded ones, /tools/saved, /tools/theology-quiz), /diagnostic, /life/assessment, /theology/which-view, /theology/passage, /theology/how-to-use, /theology/search, /resources/hard-issues-series, /nation/scorecard, /nation/policy, /disruption/consistency, /justice/timeline, /justice/witnesses, /disruption/witnesses, /my-library, /search, the ten /faq pages and the six /compare pages. Where a page top held a tool's box (Wisdom Finder, Read any verse in context, the two glossaries, the doctrine search, Scripture Memory's progress), the box moved into a charcoal band directly under the top, unchanged. The Connection Planner keeps 988 and 911 in its page top (its test now looks in `.pg-head`) and keeps its link to Find help: loneliness. Self-check heads keep their print classes (`fdb-screen`, `db-screen`, `wla-screen`). The reminder buttons lost their `onDark` styling with the dark block.

## The two small items

- **/theology/compare's empty first column.** On a phone each view is now its own card (name, then In one line, The case, Voices, Key texts), so no column stands empty; the laptop table keeps its columns, with "View" in the corner cell and table roles for screen readers.
- **Mustard as a button fill.** Gone from /wisdom (now `.btn`), the ebook buttons on the book pages (`BuyEbookButton`, `StripeBuyButton`: a light button with the mustard rule, readable on cream and on charcoal), the eight-week plan's "Begin week one" and "Go to week" (`.btn btn--on-dark`), Wisdom Finder's "Find wisdom" and Read in context's button. Left: the "Worked in depth" chips are now kit chips. Still mustard-filled and not touched: the old book thank-you pages, the five /landing pages and the leadership workbench buttons (none is on the map).

## What I ran, watched pass

- `pnpm check`: pass.
- All 34 commands of the content-gates step in ci.yml: 0 failures (validate-design, links and no-emdash among them).
- `pnpm test`: 141 files passed, 7 skipped; 1,624 tests passed, 73 skipped (new: `lib/pagePlace.test.ts`; changed: one line in `ConnectionPlanner.test.tsx`).
- ESLint `--max-warnings 0` on every changed file: clean except warnings that were there before (`no-explicit-any` in TheologyCreeds, TheologySearch, TheologyQuiz, PassageContext; two in TestTheCase).
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass ("Every audited page canonicalises to itself").
- Screenshots, every page above at 390 x 844 and 1440 x 900 by day, and ten at night on both sizes: `/home/user/elite-shots/inner/` (`before/` holds the base). Night: every heading reads (the old charcoal heroes, whose text went dark at night, are gone from these pages).
- Lighthouse (`scripts/lighthouse-median.mjs`, three runs, median; Chrome from Playwright; both sites served by `serve-like-vercel.mjs` after sitemap and prerender), the base branch (port 4501, origin at e2aa104a) and this branch (port 4500) measured one after the other on the same machine:

| Page | Base: perf / a11y / CLS | This branch: perf / a11y / CLS |
|---|---|---|
| /life | 92 / 100 / 0.000 | 89 / 100 / 0.002 (90 on a second run) |
| /how-tos | 89 / 100 / 0.115 | 90 / 100 / 0.002 |
| /wisdom | 83 / 100 / 0.006 | 81 / 100 / 0.000 (84 on a second run) |
| /plans | 88 / 100 / 0.108 | 90 / 100 / 0.000 |
| /studyguides | 91 / 100 / 0.000 | 94 / 100 / 0.000 |
| /downloads | 79 / 100 / 0.000 | 82 / 100 / 0.000 |
| /help | 84 / 100 / 0.169 | 85 / 100 / 0.137 |
| /search | 84 / 98 | 82 / 100 |
| /my-library | 87 / 100 | 87 / 100 |
| /faq/does-god-exist | 94 / 100 | 92 / 100 |
| /compare/catholic-vs-protestant | 94 / 100 | 93 / 100 |
| /tools/prayer-generator | 91 / 94 | 91 / 100 |
| /theology/compare | 91 / 100 | 90 / 100 |
| /tools/marriage-assessment | 84 / 100 | 84 / 100 |
| /theology/glossary | 90 / 100 | 91 / 100 |

Accessibility is 100 on every page measured (two fixed here: /search's headings were out of order, and the prayer page's "Prayer of the Day" label was mustard on white at 2.4:1). CLS is under 0.1 everywhere except /help (0.137, down from 0.169; it comes from the needs list arriving under the search box, unchanged here). Performance moved within about three points either way; the run-to-run spread on this machine is about that (the same build of /life read 89 and 90, /wisdom 81 and 84). /wisdom, /search, /downloads, /help and the marriage self-check sit under 85 on both branches. The first measurement of this branch was worse (CLS 0.29 to 0.33 on three index pages, /downloads 74): the fixes were holding the list's space while it loads, keeping chip widths still, fetching the small plate after the words paint, moving the shared CSS into the main stylesheet, and no longer loading the tools list for a label.

## Not verified

- A real phone, Safari, or a screen reader.
- Pages that need the database (the Theology Quiz renders nothing without it; its top was changed but not seen).
- Lighthouse on every tool page; it was run on the pages in the table. The GitHub runner itself.

## Waits for James

1. The plain names now used as H1s are the catalogue's (list above). The old headlines are still on each page, under the title. If any should stay the headline, it is one line per page.
2. Tool pages keep their own H1s where they differ from the tool list ("Prayers for when you have no words" and "Prayers for When You Have No Words", "Did the resurrection happen?" on Test the Case). Not changed here; listed by the tools unit.
3. The three book pages and Believe keep their own tops (each already leads with its cover). Their buy buttons are no longer mustard-filled.
4. The Connection Planner's top is still long (its own three paragraphs and the crisis line); shortening it means rewording a tool.
