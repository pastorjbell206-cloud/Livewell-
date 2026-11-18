# Unit: deeper (join the libraries by passage)

Branch elite/deeper, from origin claude/todo-implementation-hhp4bm at 357ecaf8.

## What changed

1. **One index.** `scripts/build-passage-index.mjs` (rules and sources in
   `scripts/lib/passage-index.mjs`) writes
   `client/public/index/chapters/<book>/<n>.json`, one small file for each
   chapter that has anything (John 3 is 1.1 KB, Romans 8 4.7 KB). A chapter
   with nothing has no file. `--check` is in the content-gates step of ci.yml
   (35 commands now; CLAUDE.md still says 34). `--stats` prints the counts.
2. **"Go deeper" on a chapter** (Study view only, never Read):
   `components/GoDeeper.tsx` + `go-deeper.css`, its own chunk. It sits right
   after the hard question and the study questions. A 220px box holds its
   place; its code, CSS and the chapter's file load only when it comes within
   600px of the screen. It groups the rows by kind, with the library's own
   icon and name from the site menu, three to a kind, then "See all N".
   A chapter with nothing shows nothing. It replaces the old "Go deeper on
   LiveWell" list in the notes, which mixed in keyword search results (a guess)
   and fetched the 379 KB catalogue on every chapter's first load.
3. **Step 7 of the guided walk** shows the same list as "Next steps: go
   deeper", with "Or read on to ..." under it. A chapter with nothing keeps the
   old one next step (a doctrine it teaches, else the next chapter).
4. **The other way.** Study guides: each session's key Scripture now has
   "Read it in the Study Bible" (chapter and verse), in the Leader and
   Participant tabs. Not added elsewhere, because: a family devotion already
   has "Open ... in the Study Bible"; a doctrine study's key texts already link
   to the Study Bible; an Honest Answer and a history lesson carry no main
   passage in their data, so none was invented.
5. **Catechism addresses.** `/family/catechism#q42` opens question 42 and
   scrolls to it, so the index can link to one question.

## The rule for "treats" (written in passage-index.mjs)

- Honest Answer: every passage its three paragraphs cite.
- Doctrine study: its key texts. Background guide: its key texts.
- History lesson and essay: only a passage the text quotes (a reference
  straight beside a quotation). A passing mention does not count.
- Study guide: each session's key Scripture (not the longer reading lists).
- Family devotion (live ones): its passage. Catechism: its proof text.
- Find Help page: the passages it prints in full.
- Eight-week plan: a week that sends the reader to that chapter.
- What the Bible says, by subject (/wisdom): the verses it prints in full.
- Read any verse in context (/theology/passage): chapters with a passage guide.
- A reference over more than 4 chapters (a whole book) counts for none.
- Essays only while public (scripts/lib/shelf.mjs).

## Counts

584 of 1,189 chapters now show something; **605 still show nothing**
(the brief's count before: 719 with nothing).

| Kind | Items with a passage | Rows | Chapters |
|---|---|---|---|
| Honest Answers | 30 of 35 | 57 | 50 |
| Doctrine studies | 62 of 62 | 924 | 386 |
| Church history | 7 of 22 | 15 | 15 |
| Bible background | 41 of 41 | 124 | 99 |
| Study guides | 68 of 68 | 304 | 171 |
| Family devotions | 112 of 112 | 112 | 82 |
| Catechism | 76 of 76 | 76 | 50 |
| Find Help | 40 of 40 | 173 | 131 |
| Eight-week plans | 29 of 29 | 99 | 83 |
| By subject (wisdom) | 208 of 208 | 1,024 | 306 |
| Essays (public) | 5 of 20 | 40 | 35 |
| Passage guide | 230 | 230 | 230 |

Only 5 public essays count: 13 of the live shelf essays have their text only
in the database, not in the repository, so the build cannot read them.

## Speed (John 3, serve-like-vercel, Lighthouse median of three)

- Before (357ecaf8): performance 87, accessibility 100, CLS 0.
- After: 91 and 90 on two runs, accessibility 100, SEO 100, CLS 0.
- First load: scripts 623,294 B before, 622,860 B after; JSON 717,660 B
  before, 338,443 B after (the catalogue no longer loads). The index file is
  not fetched on first load.
- /studyguides/anxiety: performance 92, CLS 0, accessibility 99. The miss is
  heading-order on the page's existing session titles (h3), not the new link.

## Gates watched

pnpm check; all 35 content-gate commands; pnpm test (143 files, 1,635 passed,
73 skipped); ESLint on every changed client file (clean; scripts/ is outside
ESLint's reach); pnpm build; sitemap; prerender (2,994 files); audit:canonicals
(every page canonicalises to itself).

New tests: `client/src/lib/passageIndex.test.ts` (John 3 has an answer, three
doctrine studies, study guides, catechism questions and the passage guide;
every file names a real chapter in kind order; no essay that is not public;
every address resolves to a real route), `client/src/components/GoDeeper.test.tsx`
(John 3 from its own file only; three then "See all 14" on Romans 8; Genesis 36
draws nothing). `desk.test.tsx` updated for step 7.

Screenshots: /home/user/elite-shots/deeper/ (John 3 block at 390 and 1440, day
and night; Romans 8 with "See all"; Genesis 36 with nothing; walk step 7; the
study guide line; catechism #q42).

## Not verified

- A real phone or Safari. No screen-reader pass beyond roles in tests.
- The verse panel still has its own "On LiveWell" list from the catalogue; it
  was left alone.

## Waits for James

- Whether to add a main passage by hand to the Honest Answers and the history
  lessons (they have none in their data, so they get no Study Bible line).
- The 13 live essays whose text is only in the database.
