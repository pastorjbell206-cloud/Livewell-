# Unit "bible": the Study Bible chapter as a place to study

Branch `elite/bible`, from `6cc48594`. Audit: AUDIT.md section 4 item 7, section 8, roadmap 19 to 21, 25, 27; lens report `study-depth.md`.

## What changed, and why

**The chapter page (`/study/bible/:book/:chapter`).**

- A tap or click anywhere on a verse opens its study panel. The verse number stays a real button for the keyboard and screen readers. A reader who is selecting words to copy does not trigger the panel.
- A small dot beside a verse number marks a verse that has notes of its own (202 chapters have them). The line under the text says what the dot means.
- The phone panel opens at 42 percent of the screen (it was 72). The chosen verse scrolls to the top of what is left, so it stays readable. The panel has previous verse, next verse, a "taller" button (82 percent) and close.
- "Copy verse" and "Copy link" in the panel, through `lib/clipboard.ts`. The verse is copied with its reference and "Berean Standard Bible" on a second line. "Copied" shows only on a real copy; a failed copy says what to do by hand.
- The heading names the Berean Standard Bible, with the links to ESV, NIV, NASB, CSB and KJV beside it (they were at the foot of the notes). The panel also offers the one verse in those translations.
- Verse 1 is on the first phone screen: John 3 verse 1 starts at 647 px of 844 (it was 999), Psalm 23 at 576. The head is tighter, and on a phone the chapter summary shows three lines with "Whole summary" to open it.
- "A hard question", "Study questions" and "Study notes" are links at the top. Directly after the text, the hard question is printed in the open with "Read an answer" under it, and the study questions are printed in full. They were the last two of fifteen closed drawers. In the drawers, "Where we are in the story" and "What it teaches" are open by default.
- A previous-chapter and next-chapter link after the last verse.
- Poetry is set in lines for Psalms, Proverbs, Song of Solomon, Lamentations and Job 3 to 41: one verse to a block, a new line after each sentence, semicolon or colon, later lines indented. See "Poetry" below for the limit.
- The word study: the grammar box no longer prints "Voice Active) Mood Indicative)". A Hebrew verb now reads "Stem: Qal (action: simple; voice: active)". The source's angle and square brackets are gone from the word meanings; the words they held are set in gray italic, with one line of explanation in Hebrew or Greek mode. A long dictionary entry is folded under "The full dictionary entry" so the short meaning leads.
- Complete word lists say "53 times in 45 verses of the Hebrew Old Testament." Only a list that reached the cap of 60 verses says "The first 60 verses are listed."

**The book page.** The outline links in Jude, 2 John and 3 John open the verse (`/study/bible/jude/1#v3`), not a chapter that does not exist. An address for a chapter a book does not have now has a heading, its own title, `noindex`, and for a one-chapter book a link straight to the chapter.

**Bible word search (new).** `/study/bible/search?q=born again` lists John 3:3, John 3:7 and 1 Peter 1:23, then the one verse that has both words apart. Whole words only, the way a concordance works; verses with the words side by side come first; filters for Old or New Testament and for one book; the matched words are underlined. The Go to box sends anything that is not a reference there. `/search` shows the first three verses under "In the Bible's own words" with a link to all of them (after the typing pauses, never for a query that raises the crisis block). The words are in eight static files under `client/public/bible/search/` (3.9 MB on disk, about 1.24 MB gzipped), fetched only when someone searches.

## Poetry: what was possible

The BSB source is not in the repo (`scripts/build-bible.mjs` reads it from a path outside it), and the text the repo holds has no line breaks. berean.bible and bereanbible.com are not reachable from this session (the proxy refuses them). So the lines follow the translation's own punctuation, in the browser; no data file changed and `build-bible.mjs` did not need to run. A psalm's title lands on its own line when it ends with a full stop (most do). Paragraphs and section headings for prose are not done: they need the BSB's own markup.

## Files

- `client/src/pages/StudyBible.tsx`, `client/src/pages/study-bible/ChapterNotes.tsx`, `VerseNotes.tsx`, `shared.tsx`, `GoToPassage.tsx` (+ test)
- `client/src/pages/StudyBibleSearch.tsx`, `client/src/pages/study-bible/BibleSearchResults.tsx` (new)
- `client/src/lib/bible.ts` (+ test), `client/src/lib/bible-search.ts` (+ test, new), `client/src/lib/bible-notes.ts`
- `client/src/pages/Search.tsx`
- `scripts/build-bible-search.mjs`, `scripts/lib/bible-search.mjs` (new), `scripts/build-bible.mjs` (header comment only)
- `client/public/bible/search/` (9 generated files)
- Shared files, small local edits: `client/src/App.tsx` (one lazy import, one route), `client/src/index.css` (one block appended after `.sb-section`), `.github/workflows/ci.yml` (one line)

## What I ran

- `pnpm check`: passed.
- The whole content-gates step, now 34 commands (all 33 plus `node scripts/build-bible-search.mjs --check`): all passed, including `validate-design`, `validate-no-emdash`, `validate-links`, `validate-bible`, `build-bible-text --check`.
- `pnpm test` once at the end: 114 files passed, 7 skipped, 1318 tests passed, route smoke included.
- ESLint on every `client/src` file I touched, `--max-warnings 0`: clean. (The `scripts/` folder is outside ESLint's scope in this repo.)
- `pnpm run build`, then `pnpm run sitemap`, `prerender`, `audit:canonicals`: built; 2273 pages, 0 failures. `/study/bible/search` gets its own prerendered head from its literal `SEOMeta`. `dist/` deleted afterwards.
- Bundle sizes, before and after (bytes, gzip in brackets): entry `index` 253,686 (73,933) to 253,932 (74,001), which is the one route line; `StudyBible` chunk 52,184 (13,703) to 59,633 (15,830); new lazy chunks `StudyBibleSearch` 7,738 (2,996) and `BibleSearchResults` 4,429 (2,107); `Search` 8,938 (3,176) to 9,589 (3,453).
- Looked at in Chromium at 390x844 and 1440x900 on the vite dev server: John 3 (top, panel open, copy, questions block), Psalm 23, Job 3, Genesis 1 in Hebrew with the word panel, Jude's book page and `/study/bible/jude/9`, the Bible search (results, empty, no result, a three-word query), `/search?q=born again`; dark mode on John 3 with the panel, Psalm 23 and the search. Screenshots in `/home/user/elite-shots/bible/`. Copy was checked by reading the clipboard back.

## Not verified

- No real phone or Safari. Poetry line splitting avoids regex lookbehind for old Safari, but nothing was run there.
- The 1.24 MB search download was only used on localhost; no timing on a slow connection.
- Lighthouse and axe were not run.
- The links to other translations go to biblegateway.com, which this session cannot reach; the address pattern is the one the page already used.
- `/search` was seen with the API stubbed, so not beside real database results.

## Skipped or left for later

- BSB paragraphs, section headings and true poetry layout (needs the BSB's marked-up source).
- A second translation in a column, highlights, a note per verse, listening (roadmap Step 3).
- Verse text under each cross-reference and "Show all" for the 937 long word lists.
- A beginner's line at the top of the Study Bible (roadmap 19): waits on decision 20.
- The 8 quote links and 5 redirected links of roadmap 25 are outside the Study Bible and were not touched.
- `/study/bible/search` is not in the sitemap or `llms.txt`, the same as `/search`.

## Waits for James

- Whether Scripture should be set in the serif face (the brand contract names Inter for body text; unchanged here).
- The hard question's answer sits one tap under the question, so a reader thinks first. Say so if he would rather it be open.
- Poetry lines come from punctuation, not the BSB's own layout. If he can supply the BSB USFM files, the real layout can replace this.
- Who is named as author of the notes (decision 18) is still open.

## Decision Log lines to add

- **Bible word search**: `/study/bible/search` scans the Berean Standard Bible in the browser from eight generated files in `client/public/bible/search/` (`scripts/build-bible-search.mjs`, drift-checked in CI; run it after `build-bible.mjs` and `build-bible-text.mjs`). Whole words, phrase matches first. Not in the sitemap, like `/search`.
- **CI**: the content-gates step now runs 34 commands (adds `build-bible-search.mjs --check`); CLAUDE.md still says 33.
- **Study Bible chapter**: the hard question and study questions print directly after the text; the phone study panel opens at 42 percent; poetry books are set in lines from the translation's punctuation until the BSB's own layout is available.
