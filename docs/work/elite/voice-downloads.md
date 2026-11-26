# The downloads: the spoken-voice pass

James, 2026-11-25: "i also want you to go through all the book, pdfs, and downloadable content to make it sound human and like me", and "use full paragraphs in the books too". The books have their own records in `voice-books/`. This record covers the rest of what a reader can download (`shared/download-items.json`), except the study guides (another pass) and the context guides (already done).

## Method

Every item here is short, so each was read whole, in the data its PDF is built from, before anything was changed. Edits are exact old/new pairs on the source strings, punctuation and joining only: a long dash recast as a comma, a colon, a semicolon or brackets; fragments joined into a sentence, where joining needs at most a joining word ("and", "but"). No word that carries a claim was added, removed or replaced. Each item's edit was checked by a fact diff over every string it changed (`/home/user/vs6/jedit.py`): the words of each string must be the same before and after except for joining words, and every quotation, every number and every reference must be identical; no dash may be added. Scripture, care lines, help and crisis lines, phone numbers, safety-plan steps and anything that tells a person in danger what to do stay byte for byte. Things that are genuinely lists (a worksheet's prompts, a referral list's categories, a card's questions) stay lists.

The PDFs are not kept in the repository; `pnpm run pdfs` builds them from these sources on every deploy (`build:vercel`). After each edit the builder was run (603 PDFs, no error) and the changed PDFs were read back as text and looked at as images.

## Group 1: workbooks, worksheets, reading plans, reading paths, family booklets, card sets

**Most of this group needed nothing.** The workbooks, worksheets, reading plans, family booklets and both card sets were written recently, already in the register `docs/VOICE-JAMES-BELL.md` asks for: developed paragraphs, contractions, no long dashes outside Scripture, no stock turns, no word from the Forbidden Language list. Reading them whole found nothing that punctuation or joining would improve without flattening something he meant. Only the reading paths, which are older, carried the old habits.

| Item | Source | Words read | Dashes in his text (before → after) | Edits | Fact diff |
|---|---|---|---|---|---|
| Workbook: A Weekend for Two | `client/public/workbooks/a-weekend-for-two.json` | 5,642 | 0 → 0 (the 3 in the file are in BSB quotations) | 0 | n/a |
| Workbook: Before You Marry | `client/public/workbooks/before-you-marry.json` | 8,481 | 0 → 0 (the 3 in the file are in BSB quotations) | 0 | n/a |
| Worksheets (10): worry log, prayer list, budget, grief journal, conversation guide for couples, referral list, holidays after loss, first response, prayer journal, rule of life | `scripts/lib/help-printables.mjs` (the text is in the builder) | about 2,600 | 0 → 0 | 0 | n/a |
| Reading plans (5) | `client/src/data/bible-reading-plans.json`, `scripts/lib/reading-plans.mjs` | about 400 | 0 → 0 | 0 | n/a |
| Reading paths (4): skeptic, doubt, marriage, parenting | `client/public/reading-paths/index.json` | 763 | 9 → 0 | 11 pairs in 9 strings | PASS |
| Family booklets (3): Thanksgiving, Advent, Holy Week | `client/public/family-seasonal.json` and the booklet's opening in `help-printables.mjs` | 4,414 (reflections, questions, prayers) | 0 → 0 | 0 | n/a |
| Card set: Scripture to carry | `MEMORY_VERSES` and the opening in `help-printables.mjs` | about 150 besides the verses | 0 → 0 | 0 | n/a |
| Card set: Family table cards | the card fields of `family-devotions.json` and `family-devotions-2.json` (big idea, questions, prayer) and the opening in `help-printables.mjs` | 10,603 | 0 → 0 | 0 | n/a |

The reading paths' tell count (their reader-facing text: subtitles, introductions, the why of each stop, closings) went from 29 to 18 (38.0 to 23.5 per 1,000 words); words 763 to 765, the two added words being the joining "but" and "and". The fifth dash in the file is in its internal `note` field, which no reader sees, and was left.

**Left alone, and why.** The worksheets' prompts and headings ("What part of this is mine to do tomorrow?"; "Believe them, and say so.") are a list a person writes under, and stay a list. The first-response sheet, the referral list and every crisis line, number and "call 911" sentence are as they were. The family devotions' short lines ("Love God. Love people.", in the Holy Week booklet) are said to children and are the point. Scripture is the Berean Standard Bible and keeps its own dashes.

### Five pairs (reading paths; the only kind in this group that changed)

1. Before: I came to faith from atheism at twenty-four. Not because someone won an argument. Because the questions I thought ended the conversation turned out to be the beginning of one.
   After: I came to faith from atheism at twenty-four, not because someone won an argument but because the questions I thought ended the conversation turned out to be the beginning of one.
2. Before: No conversion bait. No bad apologetics. The questions worth asking, and the answers I actually have for them.
   After: No conversion bait and no bad apologetics: the questions worth asking, and the answers I actually have for them.
3. Before: Learning to pray the Psalms as they are — the anger, the ache, and the trust that comes after them, not instead of them.
   After: Learning to pray the Psalms as they are: the anger, the ache, and the trust that comes after them, not instead of them.
4. Before: What marriage is before it is anything you feel — a promise that holds when the feeling does not. The frame everything else hangs on.
   After: What marriage is before it is anything you feel: a promise that holds when the feeling does not, the frame everything else hangs on.
5. Before: Three studies from a father of five — formation over performance, presence over advice.
   After: Three studies from a father of five: formation over performance, presence over advice.

### For James (group 1), none of it changed

1. ★ **The age he came to faith.** The Skeptic's Reading Path says "I came to faith from atheism at twenty-four." The Reliability of Scripture says "At eighteen, I was convinced I was right ..." and "The first time was at eighteen, when a Christian roommate sat with my atheist questions" (its chapter 25 and its conclusion). One of them needs to change.
2. The reading paths' file describes them, in its internal note, as "email-gated lead magnets on the pillar pages". The site no longer gates downloads behind an email (they are plain links with a suggested gift); the note is not shown to readers, but it describes something the site no longer does.
3. Before You Marry and A Weekend for Two carry contested questions (remarriage after divorce, the roles of husband and wife, birth control, whether forgiveness waits for repentance) set out from both sides with each side's comfort. They were read and not touched.

## Group 2: care pages (40) and care plans (29)

**Nothing was changed.** The care pages and the care plans were written recently in the register the voice standard asks for, and on these pages the rule was to touch only the surrounding explanatory prose and, when unsure, to leave it.

**What was read, and what was searched.** A care page's download (the one-page guide, the prayer card, the Scripture cards and the week page, built by `guidePdf`, `prayerPdf`, `scripturePdf` and `weekPdf` in `scripts/lib/help-printables.mjs` from `client/public/needs/<slug>.json`) prints the page's answer, its "this week" introduction, the week's steps, the signs that it is time to call someone, a prayer, Scripture and the help lines. The explanatory prose of all forty (the answer and the week's introduction, 7,284 words) was read whole. The steps, the signs, the prayers, the Scripture and the help lines are instructions, lists, prayers, quotation or crisis text, and were not edited; they were searched, with every other field, for long dashes, runs of fragments, stock turns, filler intensifiers and the Forbidden Language list (24,269 words in the printed fields). The one long dash found is inside a quotation of Proverbs 18:13 (the politics page) and stays.

A care plan's booklet (`planBookletPdf`, from `client/public/plans/<slug>.json`) prints its title, subtitle, introduction, care note and the eight weeks. The introductions and care notes of ten plans (addiction to empty) were read whole; all twenty-nine plans, 73,219 words in every field, were searched the same way. There is no long dash in any of them, no run of fragments, no stock turn and no word from the list (two hits for "at the end of the day" are the time of day, not the stock phrase).

| Kind | Items | Words searched | Read whole | Dashes | Edits | Fact diff |
|---|---|---|---|---|---|---|
| Care pages | 40 | 24,269 (printed fields) | answer and week introduction of all 40 (7,284 words) | 1, in Scripture | 0 | n/a |
| Care plans | 29 | 73,219 (all fields) | introductions and care notes of 10 | 0 | 0 | n/a |

There are no pairs for this group, because nothing changed. The PDFs were rebuilt by `pnpm run pdfs` with the rest (603 written, no error); they are unchanged.

**Not done.** Not every word of the twenty-nine plans' eight weeks was read; the search above is what stands behind "nothing to change" there. If James wants them read line by line, that is a further pass.

### For James (group 2), none of it changed

1. `client/public/needs/anger.json` keeps a working note in its sources list ("Confirmed from search excerpts only (direct fetches are blocked here); re-check at the source before release."). The care page does not show its sources, so no reader sees it, but the check it asks for was never recorded as done.
2. The plans write "an eight week plan" in some introductions and "an eight-week plan" in others. Nothing else in them needed a hand.
