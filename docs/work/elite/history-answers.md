# Unit: history-answers

Church history as a course, and hard questions a person can find. Built on
2026-11-17 on the local branch `elite/history-answers` (base 6cc48594). Not
pushed.

## What changed and why

### Church history (/theology/history and its essays)

1. **The tabs are at the top.** The row now sits straight under the heading:
   The course, The timeline, The councils, The heresies, The people. Before,
   it was under the essay list, about eight phone screens down. A link can
   name a tab (`/theology/history#timeline`, `#councils`, `#heresies`,
   `#people`).
2. **One numbered course.** The audit left the choice of series open, so the
   fourteen essays that run in order from AD 30 are the course, numbered 1 to
   14, and the eight longer essays sit under the era they belong to as "Go
   deeper". The order is written into `client/public/history/essays-index.json`
   by `scripts/build-history-index.mjs` (`course`, `under`, `sources`). A
   longer essay is filed under the era it shares the most years with, so
   "AD 1648-1800" sits under the modern church. Every course essay shows
   "Essay 4 of 14 in the course" with Previous and Next at the top, and the
   previous and next essay by name at the end. A longer essay says it is one
   of the longer ones and links the course essays for the same years. The hub
   remembers the last course essay opened on this device and offers the way
   back to it (`livewell-progress-history-course`, through `lib/storage`).
3. **Names link to their entries.** Every person, council and heresy on the
   hub has its own address (`#person-augustine-of-hippo`,
   `#council-first-council-of-nicaea`, `#heresy-arianism`). A name tapped in
   the timeline or the era lists goes to that entry, not to the top of a
   list, and the entry is outlined. In an essay, each person or council with
   an entry is linked at its first mention in a section, and in the key
   figures list. Short forms are listed by hand in
   `client/src/lib/historyCourse.ts` (`SHORT_NAMES`), and only where they
   cannot mean someone else: no bare "Gregory", "John", "Ignatius",
   "Francis", "Teresa", "Wesley" or "Lewis". "The Great Schism" is never
   linked, because the medieval essays use the name for the rival popes. A
   short form is also left alone in a sentence dated outside that person's
   life, which is what keeps "In 597 he sent Augustine" (Augustine of
   Canterbury) from linking to Augustine of Hippo. I read every short-form
   link the 22 essays produce and found no wrong one after that rule.
4. **Sources are shown.** Thirty excerpts from the stored, checked
   public-domain texts in `scripts/data/history-sources/` now stand under the
   essay sections that report them, as "Sources", each with the author, the
   work, the reference (chapter and section) and the printed series the
   English comes from. They are in `client/public/history/sources/<slug>.json`,
   which is the folder `scripts/verify-sources.mjs` already gates, so CI fails
   if a word of an excerpt is not in the stored text. Seven essays have them:
   course essays 1, 2, 4, 5 and 6, and the two longer essays on the first
   centuries. Sixteen of the 22 stored texts are used. Each reference was
   checked against the chapter headings in the stored file. The old "Sources"
   list of modern books at the foot of an essay is now headed "Books behind
   this essay", so the two are not confused.
5. **A timeline to step through.** The timeline tab opens on a stepper
   (`client/src/components/history/HistoryTimeline.tsx`): pick one of the seven
   eras, then step through its dated years with Earlier and Later or the left
   and right arrow keys (Home and End jump within the era). Each year shows
   what happened, the council that met, the people in the list who were alive,
   and the essays that cover it. It is built only from the timeline, councils,
   people and essays files, with no library. "Each era in full" (the old
   open-and-close list) sits below it and doubles as the plain list.

### Hard questions (/answers)

6. A **find box** and a **jump list** of all 35 questions at the top; typing
   narrows the list (questions that hold the words first, then answers that
   do). Every answer keeps its address (`/answers#<slug>`), and has "Back to
   the questions" and "Copy a link to this answer" under it ("Copied" only
   when the copy happened). Under an answer, where they truly match: Test the
   Case (matched by the essay the case is built from, nine answers), Compare
   the views and Which View Am I? (matched by hand in
   `client/src/data/answerCompanions.ts`: election and losing salvation to
   "How Are We Saved?", Genesis 1 to the origins pages, the two suffering
   answers to the theodicy comparison). Near misses are left off; the Trinity
   comparison is about the Son's submission, so it is not offered under "How
   can God be three and one?". Compare and Which View now open on a named
   topic (`?doctrine=`, `?topic=`).
7. The **"James is revising this essay" notice** now says first where the
   question is still answered: the Honest Answer built from that essay, and
   Test the Case and the doctrine pages where they match. Those are pages, not
   essays, so the shelf rules (`isPublicEssay`) are untouched. The data loads
   after the notice paints, so the essay bundle did not grow.

## Files

- `scripts/build-history-index.mjs`, `client/public/history/essays-index.json`
- `client/public/history/sources/*.json` (7 new files, 30 cards)
- `client/src/lib/historyCourse.ts` (+ test), `client/src/lib/findAnswers.ts`
- `client/src/components/history/HistoryTimeline.tsx`
- `client/src/pages/TheologyHistory.tsx`, `client/src/pages/history/HistoryEssay.tsx`
- `client/src/data/answerCompanions.ts` (+ test), `client/src/pages/Answers.tsx`
- `client/src/pages/TheologyCompare.tsx`, `client/src/pages/TheologyDiagnostic.tsx` (open on a named topic)
- `client/src/components/RetiredEssayNotice.tsx`
- `client/src/index.css` (one block, `.hx-*` and `.ax-*`, inserted after `.ed-split-label`; tokens only)

Shared files touched: `client/src/index.css` only.

## What I ran and what passed

- `pnpm check`: passed.
- The whole content-gates step from `.github/workflows/ci.yml`, all 33
  commands, each run and each exited 0, including `validate-design`,
  `validate-no-emdash`, `validate-links`, `validate-answers`,
  `validate-catalogue`, `build-search-index --check` and `verify-sources`
  (22 texts intact, 30 excerpts found).
- `pnpm test`: 115 files passed, 7 skipped; 1,329 tests passed, 73 skipped
  (the skips are the database tests). Route smoke test included.
- `eslint --max-warnings 0` on every touched file under `client/src`: clean.
- Looked at in Chromium at 390x844 and 1440x900 against the vite dev server
  with the API stubbed: the hub (course, timeline, an entry landed on, the
  heresies tab), a course essay (top, sources, previous and next, a name link
  landing on its entry), a longer essay, /answers (find box, a narrowed list,
  a jump, the companion lines, back to the questions), Compare and Which View
  opened on a topic, and the retired-essay notice. Dark tokens were checked by
  forcing `html.dark`. Screenshots: `/home/user/elite-shots/history-answers/`.
  Fixed from looking: a tapped name glided and stopped short on a long page
  (now an instant jump), and the new links carried two underlines.

## What I did not verify

- `pnpm build`, the sitemap, the prerender and the canonical audit were not
  run. No route was added and no page's `SEOMeta` changed.
- The prerendered body of a history essay (`scripts/prerender-heads.mjs`) does
  not print the source cards or the course line. A reader gets them when the
  page loads; a crawler does not yet.
- Not tried with a screen reader or on a real phone.
- The translators and volumes of the stored texts were identified from the
  files, not from a scan (see PROVENANCE.md). So a card names the series and
  volume the manifest gives and does not name a translator.

## Skipped

- Roadmap item 14 (Compare the views in the Study menu, the Study page and
  the search). It needs `siteNav.ts`, a shared file other units are editing,
  and is not one of this unit's seven tasks. Compare is now linked from the
  matching answers and from the retired-essay notice.
- History essay titles and era names (the names-content unit owns them), and
  the bodies of the answers and essays: untouched.
- Sources for essays after AD 451: the folder holds texts for the first era
  only. Life of Antony, Eusebius's Life of Constantine and Book 10 of his
  history are not stored, so essay 3 and the bridge section of essay 4 have
  no cards.

## What waits for James

- **Which series is the course.** I used the fourteen shorter essays as the
  course and put the eight longer ones under their eras as "Go deeper". If he
  wants the longer eight as the course, it is a change to one list in
  `scripts/build-history-index.mjs`.
- Two essays give Polycarp's words in two translations: the longer essay
  quotes "Eighty-six years have I served him, and he has done me no wrong",
  and the source card under it prints the stored 1885 wording. Both are fair;
  he may want the essay to match the card.
- Whether the old book list should be called "Books behind this essay" or
  something else.
- Printing a translator's name on a source card waits on someone checking the
  volume against a scan.

## Decision Log lines to add

- **Church history is one course (2026-11-17).** The fourteen essays filed
  under the seven timeline eras are the course, numbered by
  `scripts/build-history-index.mjs` in `essays-index.json`; the eight longer
  essays are "Go deeper" under the era they share the most years with. Rerun
  the builder after adding a history essay or a sources file.
- **History entries have stable anchors.** `entryId` in
  `client/src/lib/historyCourse.ts` (`person-`, `council-`, `heresy-`). An
  essay links a name only by its full name or a short form listed in
  `SHORT_NAMES`; add a short form only when it cannot mean anyone else.
- **Source cards live in `client/public/history/sources/<essay-slug>.json`**
  and are gated by `verify-sources.mjs`. A card quotes only a text stored in
  `scripts/data/history-sources/`.
- **An answer's companions** are matched by essay for Test the Case and by
  hand for Compare and Which View (`client/src/data/answerCompanions.ts`).
