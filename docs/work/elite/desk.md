# Unit: desk (Study a chapter)

Branch elite/desk, merged with origin claude/todo-implementation-hhp4bm
(bible2's front and book pages) before the gates ran. An earlier run was cut
off by a machine restart; its uncommitted work was reviewed, kept, fixed and
finished here.

## What a visitor sees on a chapter (/study/bible/:book/:chapter)

1. **Read and Study.** One switch under the chapter's name. Read is the text
   alone in the reading face, larger, one centred column, no verse numbers,
   dots, panels or marks, with an "Aa" text-size control (components/TextSize)
   and previous/next. Study is the page as it was. The choice is kept on the
   device (`livewell-chapter-view`). A first visit opens in Study with one line:
   "New here? Read shows the words alone, with nothing in the way." Read loads
   only the small text shard (bible/text, about 4 KB for John 3); Study loads
   the full chapter file as before. Both wait on the prerendered text
   (lib/prerender-hold.ts) so nothing jumps. A `#v16` link still lands on its
   verse in Read.
2. **Study this chapter.** One button in Study opens a full-screen guided walk
   (pages/study-bible/ChapterWalk.tsx, its own chunk and its own CSS,
   walk.css): seven steps, "Step n of 7", Back and Next, a segmented track that
   jumps to any step. Every step shows only the chapter's own files: the text;
   four plain questions with a private box; the chapter summary and the first
   paragraph of the introduction's author, purpose, date and setting; the
   notes' key words, each opening to its Greek or Hebrew, the dictionary entry
   and where else it appears (lex loaded on tap); each verse's
   cross-references opened in place to their verse text; the hard question(s)
   with the answer behind a tap; the study questions, a private box, Copy, and
   one next step (a family devotion on this chapter, else its first doctrine,
   else the next chapter). A missing piece is one plain line (Psalm 23 has no
   hard question; it says so). The step reached and what was written are kept
   per chapter (`livewell-study-walk-v1`). `?study=walk` opens it.
3. **Highlights and notes.** In the verse panel, three quiet colours (new
   tokens `--mark-a/-b/-c/-line`, day in :root and night in html.dark), a note,
   and Remove. Shown in Study only. "My notes on this chapter" lists them under
   the text with one-tap remove, and My Library lists every chapter with marks
   or a guided study (lib/myProgress.ts). Kept in `livewell-marks-v1`.
4. **The verse panel.** The same four tabs on every verse, in order: Notes,
   Words, Cross-references (read in place, components in CrossRefs.tsx),
   Translations (links out to Bible Gateway, as before). Each tab is there even
   when empty, with one plain line. Arrow keys move along the tabs.
5. **/study/how-to-study** ("How to study the Bible"). PageHead with the lens
   plate; the seven steps as icon cards (one source, lib/study-method.ts, also
   used by the walk and by the prerendered body); "Try it on John 3" (or the
   chapter last opened, `livewell-bible-last`) opening the walk. Route
   checklist: App.tsx, sitemap, prerender body (prerender-heads.mjs), llms.txt,
   search MAIN_PAGES (search-index.json rebuilt). siteCatalog.ts not touched.

All new sentences describe what the tool does; none says what a passage means.
The one em-dash in new code is the shared save-failure sentence CLAUDE.md
prescribes word for word.

## Size and scores, John 3 (before is the earlier run's baseline)

- Scripts on first load of /study/bible/john/3: 584,330 B (177,609 gz) before,
  585,261 B (180,114 gz) after; the chapter's own chunk is 16.1 KB gz. New on
  first load: the switch, the button, the text-size control and the small
  bible-desk helper (about 2.5 KB gz in all, part of it bible2's merge). The
  walk, highlight controls, cross-references and word data load only when
  opened.
- Lighthouse, the ci.yml chapter command, three times in a row on port 4471:
  medians performance 88, 89, 89 (before: 71, 85, 86, median 85),
  accessibility 100, SEO 100, CLS 0.000. All passed.
- /study/how-to-study: performance 95, accessibility 100, SEO 100, CLS 0.

## Gates watched

pnpm check; all 34 content-gate commands in ci.yml; pnpm test (one new
test timed out under load on the full run, given a 20 s budget, then passed
7/7 alone; the other 1,581 passed); ESLint on every changed file (clean);
pnpm build; sitemap, prerender (2,994 files, 0 failures), audit:canonicals
(every page canonicalises to itself). New tests:
client/src/pages/study-bible/desk.test.tsx (switch remembered; every step for
John 3; place and writing kept; 3 John 1 walked to the end; Psalm 23's
missing hard question; a highlight and note survive a reload and are removed).

Screenshots: /home/user/elite-shots/desk/ (390 and 1440, day and night:
chapter in Study and Read, Aa open, every walk step for John 3, 3 John 1 at
night, marks and tabs, How to study).

## Not verified

- The walk was looked at for John 3 and 3 John 1 in the browser; Genesis 1,
  Psalm 23, Isaiah 53, Mark 1, Romans 8, Philemon 1 and Jude 1 were checked
  against their files (all have notes, intros, key words in the text and
  cross-references; only Psalm 23 lacks a hard question) and Psalm 23 in
  tests, not by eye.
- No screen-reader pass beyond roles and labels in tests.

## Waits for another unit, then James

- The Bible door's room list (siteCatalog.ts, owned by fes) should point to
  /study/how-to-study.
