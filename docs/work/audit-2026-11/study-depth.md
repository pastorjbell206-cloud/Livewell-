# Study depth: the Study Bible and church history as tools for learning

Audit of 2026-11-17, lens "study-depth". Written for James Bell.

**What I did.** I used the Study Bible and the church history pages the way a student would, in a real browser at phone size (390 by 844) and laptop size (1440 by 900), on the live code (origin/main, served locally) and on the pending build (PR #540). I also counted the data files so the coverage numbers below are facts, not impressions. Screenshots are in `docs/work/audit-2026-11/shots/study-depth/`.

**Two limits to know about.** The local copy has no database, so anything that calls the API shows its empty state. The Study Bible and history pages do not depend on it. The search page does: on the real site it also searches the database of essays, books and resources, so where I say a search found nothing from the study material I mean the part I could see (see finding 1). The sandbox cannot reach outside sites, so the Passage Context tool's Bible text (which it fetches from bible-api.com) did not load here; I say so where it matters. Comparisons with Blue Letter Bible, Bible Hub, STEP Bible, Logos, BibleProject and ESV.org are from my own knowledge of those tools, not from a fresh visit.

**Status words.** LIVE-PROBLEM means visitors meet it today. FIXED-IN-PENDING names the PR that fixes it. STILL-OPEN-AFTER-PENDING means it is live today and nothing waiting to merge changes it. PR #540 does not touch the chapter reader, the history hub, or the history essays, so most findings are still open after it lands.

---

## The short version

The material is better than the tool that holds it. You have written more, and better, study notes than most free Bible sites carry: a note on every one of the 1,189 chapters, about 2.2 million words (and another 1.1 million in the verse-by-verse notes on 202 chapters), with the Hebrew and Greek under every word. A student who finds the right chapter and opens the right drawer gets teaching at the level of a good printed study Bible.

But a student cannot yet *study* here the way he can on the tools he already has. He cannot search the Bible for a word. He cannot see a second translation on the page (five links to other translations sit at the very foot of the notes and open another website). He cannot highlight, take a note, or copy a verse. A psalm is printed as a prose paragraph. The notes sit under the chapter in fourteen or so closed drawers. And the church history study is two overlapping essay series with no "next" link, no links from an essay to the people and councils it names, and book lists in place of citations.

Score against a world-class bar: **6 out of 10 live. 6 after the pending work** (PR #540 adds a real one-year reading plan, which closes one gap, but leaves the reader and the history study as they are).

---

## What is here, counted from the data

### The Study Bible (`client/public/bible/`)

| What | Count | Note |
|---|---|---|
| Books with an introduction | 66 of 66 | Who wrote it, when, why, structure, themes, key chapters |
| Chapters with study notes | 1,189 of 1,189 | Average about 1,870 words a chapter; the shortest is Psalm 117 at about 970 |
| Total words of chapter notes | about 2,228,000 | |
| Chapters with "Key Hebrew/Greek words" | 1,189 of 1,189 | Every chapter has a word-study section |
| Chapters with "A hard question" | 1,033 of 1,189 | |
| Chapters with verse-by-verse notes | 202 of 1,189 (17%) | All of Genesis (50), Matthew (28), Mark (16), Luke (24), John (21); 63 chapters in 20 other books, including Hebrews 1 to 10 (of 13), Romans 1 to 9 (of 16) and nine chapters of Exodus. About 1,123,000 words, on top of the chapter notes |
| Chapters with the fuller notes ("How it has been read", "The text and translations", "For teaching and preaching") | 114 of 1,189 (10%) | Matthew, Mark, Luke, John, and 25 chapters elsewhere |
| Book introductions with "Further reading", "The text of", "How it has been read" | 5 of 66 | Genesis, Matthew, Mark, Luke, John (72 books listed in three tiers) |
| Words tagged with Hebrew or Greek, grammar and dictionary number | about 443,000 | From STEP Bible data (Tyndale House), credited |
| Dictionary entries | about 21,200 | |
| Cross-references | about 273,000 | From OpenBible.info, credited |
| Doctrine studies | 62 | Each: definition, Old Testament, New Testament, key texts, history, where Christians differ, errors, questions |
| Reading guides | 24 | What the Bible is, canon, translations, each kind of writing, tables of kings, money, calendar |
| Chapters with their own address for search engines | 1,189 of 1,189 | Every chapter is in the sitemap and is built as its own page |
| The story path | 11 acts | Walks all 1,189 chapters once, in story order |

The page at `/study` describes the verse-by-verse layer honestly: "Written for Genesis and the four Gospels so far, and for a few chapters elsewhere. The rest of the Bible is still being written, book by book." That sentence is right, and it should stay. (It undersells Hebrews and Romans, which are most of the way done.)

**Translation shown:** the Berean Standard Bible (BSB), public domain. It is named only in small gray type at the foot of the page.

### Church history (`client/public/history/`, `client/public/theology/church-history-*.json`)

| What | Count | Note |
|---|---|---|
| Era essays | 22, about 58,000 words | Two series that overlap: 14 short essays (1,400 to 2,200 words each, about 24,000 in all) and 8 longer ones (2,700 to 6,800 words, about 34,000 in all) |
| Timeline | 7 eras, 68 dated events | |
| People | 36 | |
| Councils | 11 | |
| Heresies | 10 | |
| Traditions (`/theology/traditions`) | 10 | |
| Injustice timeline (`/justice/timeline`) | 45 events | |
| Witnesses | 15 and 16 | Two pages, `/justice/witnesses` and `/disruption/witnesses` |
| Creeds and confessions (`/resources/creeds`) | 14 documents | Four full creeds; eight are titled "(Condensed)"; two are the opening of a catechism (Heidelberg Lord's Day 1; Westminster Shorter, questions 1 to 10) |
| Context guides (`/resources/context`) | 41 | |

**Where the history is thin or missing.** I searched all 22 essays for the subjects a survey course would cover. These appear in no essay at all: the rise of Islam and what it did to the churches of North Africa and the East; Byzantium after 1054; the Church of the East, the Coptic and Armenian churches; the icon controversy; the Black Death; the Puritans; Tyndale and the English Bible; Cranmer, Knox, Bunyan, Spurgeon, Newman, Kierkegaard; Martin Luther King Jr. and the civil rights movement; liberation theology. I searched the essay files for each name; "Muslim" appears twice, both times for the people killed at Jerusalem in 1099. (The timeline names several of them in one line each: "around 622 The rise of Islam", "1453 The fall of Constantinople", "1611 The King James Bible", "1963 The letter from Birmingham Jail". The people tab has Tyndale, Cranmer, Bunyan and Spurgeon as entries. So the hub mentions them, and the essays never tell their story.) The American story is the fullest by far: three of the eight long essays (about 16,600 words) cover the United States from 1800 to now, more than the fourteen-essay series spends on the first thousand years (about 13,400 words). To be fair to those essays, "The American Experiment" does tell part of the Black church's story: Richard Allen and the African Methodist Episcopal Church, the churches driven underground in the South, and a closing line that names the Black church as one of the essay's two standing witnesses.

---

## What is already strong

1. **Notes on every chapter of the Bible, and they are honest.** Blue Letter Bible and Bible Hub lean on public-domain commentaries from the 1700s and 1800s (Matthew Henry, Gill, Barnes). BibleProject has videos and essays but no chapter-by-chapter notes. Free ESV.org does not include the ESV Study Bible notes. Yours are modern, written in plain speech, and cover the whole canon. I do not know another free site that does this. (My knowledge of those tools, not a fresh visit.)
2. **The fuller notes cite real sources a reader can check.** John 3 names "1 Apology 61", "On Baptism 13", "Homilies on John 24 to 31", the manuscripts "P66, P75, Codex Sinaiticus, and Codex Vaticanus", and "Robert Gundry and Russell Howell (Novum Testamentum 41, 1999)". John 1 gives "Antiquities 18.116-119". More than 300 chapters name an ancient writer or work.
3. **"A hard question" on 1,033 chapters.** The note on John 3 opens "The objection is strong" and quotes John Hick by book and year before answering. No large free study tool I know does this on every chapter. It is the skeptic's door into the Bible, and it is your voice.
4. **The Go to field understands people.** I tried about twenty entries. "jn 3 16", "ps 23", "1 cor 13", "Revelations 21", "Canticles 2", "1st John 4:8", "Jude 5", "Philemon 4" and "Mt 5-7" all opened the right place. "born again" answered plainly: "isn't a passage this can open ... or search the site for it."
5. **The interlinear is clean and works on a phone.** Tap "Greek" or "Hebrew" and every word shows the original, a transliteration and a gloss; tap a word for grammar in plain words ("Case: Nominative"), the dictionary entry, and where else it appears. Hebrew runs right to left correctly. Variant dots mark where Greek editions differ. I find it easier to read than the interlinears I know on the big free sites (my own judgment).
6. **The story path.** Reading all 1,189 chapters once, in the order the story happened, with "Mark Genesis 1 as read", "Next in the story: Genesis 2", "3 of 1,189 chapters read in this browser", and a "Continue the story: Genesis 4" button on the front page. I marked chapters across several visits in the same browser and it kept my place each time.
7. **Honest handling of the text.** Missing verses say "[Not in the earliest manuscripts]" and explain why. Where Hebrew and English numbering differ, the page says so. The guide "Why Translations Differ" is 3,600 careful words.
8. **Doctrine studies that are fair.** Justification gives "The Reformation doctrine (Lutheran and Reformed)", "The Roman Catholic doctrine", "The Eastern Orthodox emphasis" and "The New Perspective on Paul", each in its own voice, then lists every chapter that teaches the doctrine.
9. **Credit is given.** Every Study Bible page names the BSB, STEP Bible (Tyndale House, CC BY 4.0) and OpenBible.info.
10. **It is fast.** Chapters opened in under a second locally; a chapter's data is 5 to 35 KB.
11. **The timeline gathers each era.** Open an era on the timeline tab and under it is "Read this era" with links to that era's essays, then its councils, its figures and "What was disputed". That is the beginning of the web a history study needs.
12. **Every chapter can be found from outside.** All 1,189 chapters are in the sitemap and built as their own pages, so a search engine can land a visitor on John 3 directly.
13. **The history essays read well.** "The Constantinian Turn" asks "Was Constantine Sincere" and ends on "What 312 Still Asks". The heresy entries include "why it appealed" and "still seen as", which teaches rather than labels.

---

## Findings, in order of how much they matter to a visitor

### 1. You cannot search the Bible for a word

- **Where:** `/study/bible` and every chapter (the "Go to" field, `client/src/pages/study-bible/GoToPassage.tsx`); `/search` (`client/src/lib/siteSearch.ts`).
- **What a visitor sees:** Typing "born again" into Go to: "“born again” isn’t a passage this can open. Try John 3:16, Romans 8, or Psalm 23, or search the site for it." Following its link to site search returns "I'm a new Christian. What do I do now?", "Why Follow Jesus" and a study guide on political power. John 3 is not in the list. Searching "propitiation", "agape", "hesed" or "Athanasius" finds nothing in the study material. (Locally those four showed "The search didn't load", because the page also asks the database for essays, books and resources and there is no database here. On the real site a visitor may get an essay or a book back. He will not get a verse, a Greek or Hebrew word, or a chapter: the code has no index of the Bible text, in `siteSearch.ts`, in `search-index.json` or in `api/index.ts`.)
- **Why it fails:** People come to a Bible tool with words they half remember ("where is the verse about ..."). Blue Letter Bible, Bible Hub, STEP and ESV.org all answer that (my knowledge of them). Here the Bible's own text is not searchable, so a visitor concludes the tool is thin and goes back to the one he had.
- **Fix:** Build a word index of the BSB text (the text-only chapter files already exist in `client/public/bible/text/`; the index would load only when someone searches, and its size needs measuring) and let Go to fall through to it: a reference opens the passage, anything else lists matching verses with the words marked. Add the 1,189 chapter titles and the dictionary's transliterations so "agape" and "hesed" land on their words.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 2. The notes are away from the verses, in closed drawers

- **Where:** every chapter, for example `/study/bible/john/3` (`client/src/pages/study-bible/ChapterNotes.tsx`).
- **What a visitor sees:** On a phone John 3 is 12.3 screens long and John 1 is 36.8. Verse 1 begins on the second screen. Above it is one quiet link, "Read the study notes on this chapter", which jumps down the page. The study notes start after the last verse (about 5.7 screens down for John 3) as a stack of fourteen drawers, one open ("Where we are in the story") and the rest shut: "The historical setting", "The world behind the text", "How the chapter is built", "What it teaches", "Key Greek words", "Verse by verse: context, language, history, doctrine", "What it shows of Christ", "How it has been read", "The text and translations", "A hard question (1 of 2)", "A hard question (2 of 2)", "For teaching and preaching", "Questions for study or a group". The only way to a verse's note while reading is to tap a verse number 24 pixels square; tapping the words of the verse does nothing, and nothing marks which verses have a note.
- **Why it fails:** Study is reading with a question in hand. Your best writing (the hard questions, the verse notes) is the hardest thing on the page to find. The October critique named this as its first critical finding; it is unchanged today.
- **Fix:** Mark verses that have a note with a quiet dot and let a tap on the verse (not just its number) open the note. Put the chapter outline headings into the text at every width. Bring "A hard question" and the study questions up beside the summary as two visible links, so a reader knows they exist before he scrolls.
- **Size:** L (the full study desk in `docs/work/design/VISION.md`); the dot, the whole-verse tap and the two links are M. **Status:** STILL-OPEN-AFTER-PENDING (designed in the prototype, not built).

### 3. Scripture is not set as Scripture

- **Where:** every chapter in Reading mode (`ReadingText` in `client/src/pages/StudyBible.tsx`).
- **What a visitor sees:** Psalm 23 as one prose paragraph in the site's sans-serif body type (Inter): "1 A Psalm of David. The LORD is my shepherd; I shall not want. 2 He makes me lie down in green pastures; He leads me beside quiet waters. 3 He restores my soul ..." No poetry lines, no paragraph breaks, no section headings, the psalm's title run into verse 1. John 3's 36 verses are one block.
- **Why it fails:** A reader cannot see that a psalm is a poem, where Jesus stops speaking, or where a new scene begins. Printed Bibles, ESV.org and YouVersion show this (my knowledge of them). For a study tool meant to be world-class, the reading text is the first impression, and it reads like raw data. (Screenshot: `live-m-psalm23-text.png`.)
- **Fix:** I believe the BSB is published with paragraph, poetry and heading markup (my knowledge, not checked from this sandbox; confirm at the BSB's own site before planning the work). Carry that markup into `scripts/build-bible.mjs` so the reader can print paragraphs, poetry in lines, and psalm titles on their own line. Whether Scripture should be set in the serif is a design choice for James (the brand contract names Inter for body text).
- **Size:** M to L. **Status:** STILL-OPEN-AFTER-PENDING.

### 4. One translation on the page, named only in the small print, and two others elsewhere on the site

- **Where:** every chapter; the credit line in `client/src/pages/study-bible/shared.tsx`; `/theology/passage` (`client/src/pages/tools/PassageContext.tsx`).
- **What a visitor sees:** The chapter heading says "The Study Bible · John 3". Nothing near the text says which translation it is. At the very foot, in small gray type: "English text: the Berean Standard Bible (public domain)." Under the last drawer of notes there is one line, "Read John 3 in other translations: ESV · NIV · NASB · CSB · KJV"; each opens another website in a new tab. Meanwhile the Passage Context tool, which the verse panel links to as "This passage in context", shows the "World English Bible, public domain"; the essays quote the ESV; and `CLAUDE.md` says ESV is the default for quotation.
- **Why it fails:** A reader who knows John 3:16 as "only begotten Son" or "one and only Son" wants to know whose English this is before he trusts it. A careful reader who meets three translations on one site wonders which one you stand behind. And nobody can compare two translations side by side on the page, which the tools named above offer (my knowledge of them). The five links are a real help, and almost nobody will find them: they sit about eleven phone screens down.
- **Fix:** Put "Berean Standard Bible" in the chapter header with a link to a short "Why this translation" note, and move the "other translations" line up beside it. Add one parallel column from another public-domain text (the WEB or KJV are free to use; the ESV needs Crossway's licence for full chapters). Point Passage Context at the site's own BSB files so it stops calling a third-party server.
- **Size:** S for the label and moving the links; S to M for the Passage Context change; M for a parallel column. **Status:** STILL-OPEN-AFTER-PENDING. *James decides the translation question (see the end).*

### 5. The church history study is two overlapping series with no way forward

- **Where:** `/theology/history` (`client/src/pages/TheologyHistory.tsx`, `client/public/history/essays-index.json`); every essay (`client/src/pages/history/HistoryEssay.tsx`).
- **What a visitor sees:** "The era essays. 22 essays, from Pentecost to the present." The list runs from "The Apostolic and Sub-Apostolic Age" to "The Modern Church and the Global Shift", and then starts again at Pentecost: "The Apostolic and Persecuted Church", "Councils and Creeds", "The Long Middle", "The Reformation and Its Wars" (ten cards after "The Reformation"). At the foot of "The Constantinian Turn" are "← All of Church History" and, once you scroll to the very end, a "More on this" block that offered two related essays ("The Desert and the Rule", "The Fathers at Work"), chosen by shared subject and not by order. There is no "next essay" and no "essay 4 of 14". In the body of the essay there is not one link: the key figures "Ambrose of Milan" and "Augustine of Hippo" are plain text though the hub has entries for both.
- **Why it fails:** You asked that people be able to "study church history" and "understand church history". History is learned in order. A student who finishes essay 4 has to go back to the hub and find essay 5 by eye, and at essay 15 the story restarts without saying why. On a phone the hub is 18 screens; with the "people" tab open it is 43.
- **Fix:** Choose one series as the course and label the other "the short version" (or fold it in). Add "Essay 4 of 14 · Previous · Next" to every essay. Link each key figure and council to its entry.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING. (The master plan's history course, sections 7.2, would replace this; only its source-checking groundwork is in PR #540.)

### 6. Claims in the history essays cannot be checked

- **Where:** all 22 essays, for example `/theology/history/the-age-of-martyrs`.
- **What a visitor sees:** The essays lean on primary texts throughout, mostly by paraphrase: "Asked to sacrifice, he answered that no right-thinking person deserts truth for falsehood" (Justin at his trial), Perpetua's prison diary, the letter from Lyons. None carries a reference. Only 32 passages in quotation marks appear in all 22 essays, all of them in the eight long essays; the fourteen short essays have none. (The first draft of this report said 178 quoted passages. That count was wrong.) At the foot, "Sources" is a list of author and title only: "The Story of Christianity, Volume 1, Justo Gonzalez", "The Early Church, Henry Chadwick". No year, no page, no link, and no primary text named.
- **Why it fails:** You want the site to be "intellectual, academic". An academic reader, and the skeptic you write toward, will ask "where does Perpetua say that?" The Study Bible notes answer that kind of question ("1 Apology 61"). The history essays do not, so the weaker half of the site is the half that makes historical claims.
- **Fix:** Add a short reference wherever an essay reports what an ancient writer said (work, section, a link to a public-domain translation), quote the source's own words where they are strong, and give each book in "Sources" its year. PR #540 already holds 22 verified primary texts and a checker (`scripts/data/history-sources/`, `scripts/verify-sources.mjs`): Athanasius, Eusebius, the Martyrdom of Polycarp, the Passion of Perpetua, Justin's First Apology and more. They are not shown to readers yet; showing them is the fix.
- **Size:** M for the first era, L for all. **Status:** STILL-OPEN-AFTER-PENDING (groundwork in PR #540; nothing visible to a reader).

### 7. A student cannot keep anything: no highlights, no notes, no copy, no share

- **Where:** every chapter.
- **What a visitor sees:** The only thing the reader remembers is "Mark John 3 as read". There is no way to highlight a verse, write a note, bookmark, copy a verse with its reference, or share a link to a verse from the panel.
- **Why it fails:** Every tool a visitor already uses (YouVersion, Blue Letter Bible, Logos, ESV.org) lets him mark his Bible. A pastor preparing Sunday wants to copy "John 3:16 (BSB)" with one tap. Without this, the tool is somewhere to look things up, not somewhere to study.
- **Fix:** Add "Copy verse" and "Copy link" to the verse panel (the site already has `lib/clipboard.ts`). Then highlights and a one-line note per verse, kept on the device with `lib/storage.ts`, shown in My Library.
- **Size:** S for copy and link; M for highlights and notes. **Status:** STILL-OPEN-AFTER-PENDING.

### 8. Most of the Bible has the lighter notes, and the page does not say which kind you are reading

- **Where:** every chapter outside Genesis and the Gospels, for example `/study/bible/romans/8` against `/study/bible/john/3`.
- **What a visitor sees:** John 3 has fourteen drawers including "Verse by verse", "How it has been read", "The text and translations" and "For teaching and preaching". Romans 12 has nine; Romans 8 has ten. Only 5 of 66 book pages have "Further reading". Nothing on a chapter says "fuller notes for this book are coming".
- **Why it fails:** A reader who starts in John and moves to Romans thinks the tool has shrunk. `/study` tells the truth about this; the chapter itself does not.
- **Fix:** On chapters without verse notes, add one line under the notes: "Verse-by-verse notes are written for Genesis and the four Gospels so far." Publish the order the next books will come in. The cheapest books to finish are the ones already begun: Hebrews needs three more chapters (11 to 13) and Romans seven (10 to 16). After that the order is James's call; Psalms and Acts are my suggestion, not a measured fact about what readers open.
- **Size:** S for the line; L for each book. **Status:** STILL-OPEN-AFTER-PENDING.

### 9. On a phone, the study panel covers the page you are studying

- **Where:** every chapter at phone width (the fixed `aside` in `client/src/pages/StudyBible.tsx`).
- **What a visitor sees:** Tap verse 16 and a sheet rises to cover 72 percent of the screen (608 of 844 pixels), leaving 176 pixels of Scripture between the header and the sheet. In Greek mode I could not tap the next word in the verse without first closing the sheet, because the sheet sat on top of it. The sheet's only controls are "Close the study panel" and "Study the whole verse"; there is no previous or next. (The code lets the sheet take up to 72 percent of the screen height.)
- **Why it fails:** Word study means moving from word to word. On a phone each word costs three taps (close, scroll, tap).
- **Fix:** Open the sheet at about 40 percent with a handle to pull it taller, keep the chosen verse scrolled into the visible strip, and add previous and next arrows for verse and word.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING. (Screenshot: `live-m-john3-v16.png`.)

### 10. Raw data marks show through in the word study

- **Where:** Greek and Hebrew mode on every chapter; the word panel.
- **What a visitor sees:** Under the Greek article in John 3:16 the gloss reads "<the>"; in Genesis 1:1 "<obj.>" and "and <obj.>"; in Genesis 1:2 "<it> was", "[was] over", "[the] deep". 34,033 of the 443,201 word glosses carry angle brackets. In the grammar box for "created" in Genesis 1:1: "Voice Active) Mood Indicative)" with stray brackets, and a Hebrew verb described with Greek-grammar words instead of its stem (Qal). The Greek dictionary entry for a small word runs to phrases like "originally a demonstr. pron. (so usually in Hom.) ... al. mult."
- **Why it fails:** An ordinary reader does not know that angle brackets mean "implied, not translated". To him it looks broken. An academic reader sees "Active) Indicative)" on a Hebrew verb and stops trusting the parsing.
- **Fix:** In `scripts/build-bible.mjs` or at display time, show bracketed glosses in italic gray with a one-line key ("gray words are supplied in English"). Fix the Hebrew grammar expansion in `expandGrammar` (`client/src/lib/bible.ts`) so stems read "Qal, perfect". Lead each dictionary panel with the one-line plain definition and fold the full lexicon entry under "Full entry".
- **Size:** S to M. **Status:** STILL-OPEN-AFTER-PENDING. (Screenshots: `live-d-john3-word.png`, `live-m-gen1-hebrew.png`.)

### 11. Site search does not know the Study Bible or the history people

- **Where:** `/search`, the header search (`client/public/search-index.json`).
- **What a visitor sees:** "Augustine" returns "How Do You Fight Temptation and Disordered Desire?" and "Why Is Pride the Root of Every Other Sin?" first, not Augustine's own entry or an era essay. "Nicaea" returns "Can I trust the Bible?" and a study guide first, then the two history essays "The Great Councils" and "Councils and Creeds"; the council's own entry and the Nicene Creed are not in the list. "justification" returns the family catechism and the glossary tool, not the 4,900-word doctrine study. "grace" returns "How Do You Discipline Children With Grace?" among its first three. (These are the results from the site's own index, which is all I could see locally. On the real site the page also lists essays, books and resources from the database. The history essays are in the index, by title and summary. The Study Bible's chapters, the doctrine studies, the people, the councils and the creeds are not.)
- **Why it fails:** A student arrives holding a word. The deepest material on the site (62 doctrine studies, 36 people, 11 councils, 1,189 chapter notes) is the material search cannot find. The October critique found the same; it is unchanged, and PR #540 does not change it (it adds the new topic pages to the index and nothing from Study).
- **Fix:** Add the doctrine studies, the people, councils, heresies, creeds and chapter titles to the search index, and rank a name that matches a title exactly above everything else.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 12. People, councils and heresies are text in tabs: no page of their own and no links out

- **Where:** `/theology/history`, tabs "The councils · 11", "The heresies · 10", "The people · 36".
- **What a visitor sees:** Each tab is a long run of cards. I counted the links inside the councils, heresies and people tabs: none. (The timeline tab does better: an open era lists its essays as links and its councils, figures and heresies by name. But tapping "First Council of Nicaea · 325" there only switches to the councils tab and shows all eleven from the top; it does not take you to Nicaea. See V2.) Athanasius's entry does not link to the Council of Nicaea, the Nicene Creed at `/resources/creeds/nicene-creed`, or the essay "The Great Councils". There is no address for "Augustine" that a teacher could send to a class.
- **Why it fails:** History is a web of who answered whom. A serious survey lets you step from Arius to Nicaea to Athanasius to the creed. Here, outside the timeline's era lists, each is a paragraph on an island.
- **Fix:** Give each person, council and heresy an address (even a `#anchor` on the hub to begin with), make the names in the timeline land on that entry, and link names wherever they appear: in essays, in the creeds' notes, and in the Study Bible's "How it has been read".
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 13. Whole regions of the church's story are missing from the essays

- **Where:** the 22 essays (list above under "Where the history is thin").
- **What a visitor sees:** No essay tells of the rise of Islam, Byzantium after 1054, the Church of the East, the Coptic or Armenian churches, the icon controversy, the Puritans, the English Bible, or the civil rights movement. Three long essays cover the United States since 1800. The Black church appears inside "The American Experiment" (Richard Allen, the churches driven underground), and "The Modern Church and the Global Shift" tells of William Seymour and Azusa Street in 1906. After that the story stops: no King, no Birmingham, no civil rights movement in any essay.
- **Why it fails:** "Christianity is ... older than my culture" is the impression the site is built to leave. A history that is thick on America and silent on the East and on Africa after Augustine teaches the opposite without meaning to. A student from an Orthodox, Coptic or Armenian church will not find his family's story after 1054, and a student from a Black church will find his story told up to 1906 and no further.
- **Fix:** Add four essays to the course in this order: the churches of the East and the rise of Islam (600 to 1453); the English Reformation, the Bible in English and the Puritans; the Black church in America from Richard Allen to Birmingham; the Orthodox world after 1054.
- **Size:** L. **Status:** STILL-OPEN-AFTER-PENDING.

### 14. Cross-references and "where else it appears" send you away; long lists are cut short, and many complete lists say they are cut short

- **Where:** the verse panel ("Cross-references") and the word panel ("Where else it appears").
- **What a visitor sees:** For "created" in Genesis 1:1: "53 times in the Hebrew Old Testament; the first 45 are listed." That sentence misleads. All 45 verses that use the word are in the list; the word simply appears more than once in some of them. The page prints "the first N are listed" on 3,689 dictionary entries. Only 937 of those are really cut short (at 60 verses). The other 2,752 lists are complete and labelled as if they were not (see V1). Each reference is a bare link ("Isaiah 45:7"); tapping it leaves the chapter. (Going back did return me to the same place with the panel still open, which is good.)
- **Why it fails:** A word study is reading every place the word is used. A student wants to see the verses in a list, in English, without leaving. Blue Letter Bible and STEP show every occurrence with its verse text.
- **Fix:** Change the label to "53 times in 45 verses" where the list is complete (S). Show each listed reference with its verse text under it (the text-only chapter files already exist in `client/public/bible/text/`), and for the 937 long words add "Show all". The site already has a verse sheet (`components/VerseRef.tsx`); use it here.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 15. Nobody is named as the author of the notes, and there is no page on how they were made

- **Where:** every Study Bible page; the credit line reads "Study notes, book introductions, and the story path: LiveWell."
- **What a visitor sees:** Full credit for the Greek data, and "LiveWell" for 2.2 million words of commentary. No author, no date, no "how these notes were written and checked", no statement of the theological tradition they come from.
- **Why it fails:** The first question an academic reader asks of a commentary is "who says so, and from where?" The doctrine pages do this well ("Where I think the evidence falls"). The Bible notes do not say who is speaking.
- **Fix:** One page, linked from the credit line: who wrote and reviewed the notes, what sources they draw on, where they stand, how to report an error. *Only James can supply the facts for it.*
- **Size:** S once James has answered. **Status:** STILL-OPEN-AFTER-PENDING.

### 16. A reading plan with days: missing live, built in the pending work

- **Where:** live `/study/bible/story`; pending `/study/bible/guides/whole-story-2027` (`client/src/pages/StudyBibleYear.tsx`).
- **What a visitor sees today:** The story path and "Mark as read", but no days, no pace, no "today's reading".
- **What the pending build shows:** "Read the whole story in 2027. Every chapter of the Bible in a year, in the order the story happened. Ten to fifteen minutes a day." Then "Day 1 of 365 · Friday, January 1 · Genesis 1–2", links to both chapters, two context guides under "In its world", "Mark day 1 read" and "Remind me". This is good, and it is in the Study menu.
- **What is still missing after it:** shorter plans for a beginner (a Gospel in a month, the New Testament in ninety days, Psalms and Proverbs). The dates on the page are fixed to 2027, and the page handles that kindly: "Start early if you like: the days are numbered, so your place is kept whatever the date." A reader who starts in March 2027 or in 2028 will still see dates that do not match his days.
- **Fix:** Merge PR #540; then add two short plans built from the same script.
- **Size:** S each after the merge. **Status:** FIXED-IN-PENDING (PR #540) for the yearly plan; short plans STILL-OPEN-AFTER-PENDING.

### 17. Two of everything: glossaries, creed pages, doctrine systems, passage tools

- **Where:** `/theology/glossary` ("Every word, explained plainly.", 114 terms, 77 phone screens) and `/tools/glossary` ("Theological Vocabulary Glossary", 31 screens); `/resources/creeds` and `/theology/creeds`; `/study/bible/doctrines/justification` and `/theology/doctrine/soteriology`; the chapter reader and `/theology/passage`; `/justice/witnesses` and `/disruption/witnesses`, both headed "It has been done before."
- **Why it fails:** A student who finds two glossaries cannot tell which is the real one. The October critique listed these; all are still live.
- **Fix:** Keep one of each and redirect the other (the Decision Log protects `/theology/glossary` and `/resources/creeds`, so those stay). Link the two doctrine systems to each other by name: "The full argument: How Are We Saved?"
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 18. The creeds shelf has four full texts; the confessions are condensed

- **Where:** `/resources/creeds` (`client/public/creeds/documents/`).
- **What a visitor sees:** Fourteen documents under "Creeds and confessions". The Apostles', Nicene and Athanasian creeds and the Chalcedonian Definition are full texts with notes. Eight others are condensed, and their titles say so plainly: "The Westminster Confession (Condensed)", and likewise Augsburg, Dort, the 1689 London Baptist, the Thirty-Nine Articles, Schleitheim, New Hampshire and Barmen. Two are the opening of a catechism: "The Heidelberg Catechism, Lord's Day 1" and "The Westminster Shorter Catechism, Q. 1–10". The Nicene page does not say whose English translation it prints.
- **Why it fails:** The labels are honest, so nobody is misled. But a student told to "read the Westminster Confession" cannot do it here, and a history study is stronger when its primary texts are the texts.
- **Fix:** Add the full texts of the older confessions and catechisms, with the source edition and translator named (the sixteenth- and seventeenth-century documents are long out of copyright; check each English translation's own status before printing it). Name the translation on the Nicene page.
- **Size:** M to L. **Status:** STILL-OPEN-AFTER-PENDING.

### 19. Where does an ordinary reader begin?

- **Where:** `/study` and `/study/bible`.
- **What a visitor sees:** `/study` is honest and clear, but it is a table of contents with nineteen links, and the Study Bible front page on a phone is 15.4 screens of sixty-six book cards. "Start here" on the front page sends a newcomer to "The Story of the Bible", a 7.7-screen page of eleven acts. Nowhere says "Never read the Bible? Read Mark. It takes ninety minutes. Start with chapter 1."
- **Why it fails:** The family and the new believer you want to serve need one first step, not a syllabus.
- **Fix:** One line and one button at the top of `/study/bible`: a first book to read, with "Start Mark 1". Collapse the sixty-six cards into a compact list by section that opens a chapter grid.
- **Size:** S for the button, M for the list. **Status:** STILL-OPEN-AFTER-PENDING.

### 20. No way to listen, and no night setting

- **Where:** every chapter.
- **What a visitor sees:** No "Listen" on a chapter (the family devotion pages have it). No dark setting; the Bible on a phone at night is a bright cream screen. (The site has a dark theme in its code and keeps it switched off on purpose for now, by a note in `App.tsx`; so this half is a decision to revisit, not an oversight.)
- **Why it fails:** Many people take in Scripture by ear, on a commute or with children. YouVersion and ESV.org have audio (my knowledge of them).
- **Fix:** Reuse the family pages' Listen control on the chapter. I believe free BSB audio recordings exist (my knowledge, unchecked from here; confirm and read their terms before using).
- **Size:** S to M. **Status:** STILL-OPEN-AFTER-PENDING.

### 21. Small dead ends

- **`/study/bible` Go to, "John 3:99":** opens `/study/bible/john/3#v99` and says nothing; the verse does not exist. Say "John 3 has 36 verses". **S.** STILL-OPEN-AFTER-PENDING.
- **Go to, "Gen 1:1-3":** opens verse 1 only; the range is not marked. **S.** STILL-OPEN-AFTER-PENDING.
- **Chapter arrows** sit only at the top; after reading the last verse there is no "John 4" button before the notes begin. **S.** STILL-OPEN-AFTER-PENDING.
- **Timeline** gives thirty years and three hundred the same height. Each era does link to its essays under "Read this era"; the single dated events link nowhere. **M.** STILL-OPEN-AFTER-PENDING.
- **The essay page for a wrong address** says "That essay is not here yet. It may have moved." with a way back. That is handled well.

---

## Findings added at verification

These five were missed in the first pass. Each was checked in the browser and in the code on 2026-11-17.

### V1. "The first 45 are listed" is printed on 2,752 word lists that are complete

- **Where:** the word panel on any chapter, under "Where else it appears" (`client/src/pages/StudyBible.tsx`, the line that prints "the first N are listed"; `scripts/build-bible.mjs`, which keeps one line per verse).
- **What a visitor sees:** For "created" in Genesis 1:1: "53 times in the Hebrew Old Testament; the first 45 are listed." All 45 verses are there.
- **Why it fails:** A careful student thinks eight uses are hidden and goes to another tool to find them. It makes the word study look less complete than it is.
- **Fix:** Where the list holds every verse, print "53 times in 45 verses". Keep "the first 60 are listed" only for the 937 words that really are cut.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### V2. A name in the timeline takes you to a list, not to the name

- **Where:** `/theology/history`, the timeline tab with an era open (`client/src/pages/TheologyHistory.tsx`). Screenshot: `verify-d-history-era-open.png`.
- **What a visitor sees:** Under "The Age of the Councils": "COUNCILS", "First Council of Nicaea · 325"; "FIGURES", "Ambrose of Milan · around 339 to 397". Tapping either switches to the councils tab or the people tab and shows the whole list from its first card. On a phone the people tab makes the page 43 screens long.
- **Why it fails:** The page looks cross-linked and is not. A student who taps "Augustine of Hippo" has to scroll past fourteen people to find him.
- **Fix:** Give each card an id and make the tap open the tab and scroll to that card. This is also the first step of finding 12.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### V3. The other translations are already linked, where almost nobody will see them

- **Where:** every chapter, under the last drawer of notes (`client/src/pages/study-bible/ChapterNotes.tsx`).
- **What a visitor sees:** "Read John 3 in other translations: ESV · NIV · NASB · CSB · KJV", in small gray type, after the whole chapter and all fourteen drawers. Each link opens another website in a new tab.
- **Why it fails:** The comparison a reader wants while reading verse 16 is offered eleven phone screens later.
- **Fix:** Move the line up under the chapter title, beside the translation's name (finding 4), and add the same links to the verse panel so a reader can open that one verse elsewhere.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### V4. The history essays give a group or a class nothing to do

- **Where:** all 22 essays (`client/public/history/essays/*.json` hold only sections, key figures and sources; `client/src/pages/history/HistoryEssay.tsx`).
- **What a visitor sees:** An essay, a list of key figures, a list of books, and a way back. Every Bible chapter ends with "Questions for study or a group" (or "For reflection or a group"). No history essay has a question, a primary reading to do first, or a Bible passage to read alongside.
- **Why it fails:** James wants families and readers to study church history, not only read about it. A small-group leader or a parent teaching a teenager has nothing to ask at the end of "The Constantinian Turn", though the essay itself closes on a section called "What 312 Still Asks".
- **Fix:** Add three to five questions and one short primary reading to each essay, starting with the series chosen as the course (finding 5). The 22 primary texts verified in PR #540 supply the readings for the first centuries.
- **Size:** M for one series. **Status:** STILL-OPEN-AFTER-PENDING.

### V5. Hebrews and Romans are most of the way to full verse notes, and nothing tells the reader

- **Where:** `client/public/bible/notes/hebrews/verses/` (chapters 1 to 10 of 13), `client/public/bible/notes/romans/verses/` (chapters 1 to 9 of 16); the sentence on `/study`.
- **What a visitor sees:** `/study` says verse-by-verse notes are "Written for Genesis and the four Gospels so far, and for a few chapters elsewhere." Romans 8 has the "Verse by verse" drawer; Romans 12 does not. The book pages do not say which chapters have it.
- **Why it fails:** The site is nearer to a third and a fourth finished book than its own description says, and a reader in Romans meets the gap at chapter 10 with no explanation.
- **Fix:** Finish Hebrews 11 to 13 and Romans 10 to 16 (ten chapters), then change the sentence on `/study` to name them. Until then, mark on each book page which chapters have verse notes.
- **Size:** L for the writing (it needs James's review); S for the marks. **Status:** STILL-OPEN-AFTER-PENDING.

---

## What a student cannot do here that a serious tool allows

From my own knowledge of the tools, not a fresh visit:

| A student expects to | Blue Letter Bible / Bible Hub / STEP | LiveWell today |
|---|---|---|
| Search the Bible for a word or phrase | Yes | No |
| Compare translations side by side | Yes | No (one translation on the page; five links out at the foot of the notes) |
| See every place a Hebrew or Greek word is used, with the verses | Yes | Every verse for most words, the first 60 for 937 common ones, as bare links |
| Read poetry as poetry, with paragraphs and headings | ESV.org, YouVersion, BibleProject's reader: yes | No |
| Highlight, take notes, bookmark | Blue Letter Bible, Logos, YouVersion: yes | "Mark as read" only |
| Copy a verse with its reference | Yes | No |
| Listen | Yes | No |
| See maps, a timeline of the Bible, images | Logos, BibleProject: yes | Tables of kings and money; no maps |
| Read modern, plain, honest notes on every chapter, free | Rarely | **Yes** |
| Meet the hardest objection to a chapter, stated fairly | No | **Yes** |
| Read the chapter's place in the whole story | BibleProject in videos | **Yes, on every chapter** |

For church history, a good survey course gives a single ordered path, a map, primary readings for each session, review questions, and a bibliography with editions. Here the prose is as good as a course lecture; the path, the readings, the maps and the review are not there yet.

---

## For the academic reader

- **Are sources cited?** In the Study Bible's fuller notes, yes, and well (ancient works by section, modern scholars by title and year, manuscripts by name). That is 114 chapters. In the other 1,075 chapters, citations are occasional. In the history essays, no: a list of books by author and title, with no year.
- **Are primary texts quoted and linked?** Paraphrased often, quoted only in the eight long essays (32 passages), linked never. The creeds are on the site but the history essays do not link to them.
- **Is there a bibliography?** For five books of the Bible (72 entries in three tiers: "To start with", "For the pastor's shelf", "For deeper study"). The doctrine pages have "Further reading". There is no bibliography for church history beyond the per-essay lists, and none for the Study Bible as a whole.
- **Can a claim be checked?** In John, yes. In "The Age of the Martyrs", only by a reader who already owns Frend.
- **What an academic will miss:** the names of the lexicons behind "Dictionary" (the credit says "STEP Bible data"; the panel should say which lexicon), which Greek text the interlinear follows, an author and method statement for the notes, and stable addresses for people and councils.

---

## The ten changes that would most raise it as a study tool

1. **Search the Bible's words** from the Go to field (finding 1). M.
2. **Set Scripture as Scripture:** paragraphs, poetry lines, headings, psalm titles (finding 3). M to L.
3. **Bring the notes to the verses:** a dot on verses with notes, tap the whole verse, hard questions and study questions visible at the top (finding 2). M.
4. **Name the translation at the top and add one parallel translation** (finding 4). S, then M.
5. **Make church history one course:** one series, numbered, with previous and next, and every person and council linked (findings 5 and 12). M.
6. **Show the primary sources** already verified in PR #540 under the quotations in the history essays, and date the bibliography (finding 6). M.
7. **Let a student keep things:** copy verse, copy link, highlight, a note per verse, all in My Library (finding 7). S, then M.
8. **Fix the phone study sheet** and the raw marks in the word study (findings 9 and 10). M.
9. **Put the Study Bible and the history entries into site search** (finding 11). M.
10. **Finish the layers by a published order:** verse-by-verse notes for the rest of Hebrews and Romans first (ten chapters between them), then the books James chooses; "Further reading" for all 66 books; four history essays for the missing regions (findings 8 and 13). L.

Merging PR #540 gives the year-long reading plan at once; after that, two short plans (finding 16).

---

## What is already better than the big tools

- Modern, plain, whole-Bible chapter notes, free, in one voice. The big free sites give you old commentaries; the good modern study Bibles are paid.
- "A hard question" on 1,033 chapters, with the objection stated in its strongest form first.
- Every chapter placed in one story, with a path that reads the whole Bible in story order and remembers where you are.
- A reference field that reads "jn 3 16" and "Revelations 21" without complaint.
- An interlinear that a beginner can read, with grammar in English words.
- Doctrine studies that give each tradition its own voice before any verdict.
- No advertisements, no account needed, and honest credit to every source of data.

---

## Questions only James can answer

1. **Which English Bible is the Study Bible's text?** It is the BSB today (public domain, so it can be shown in full, searched and reformatted freely). The essays quote the ESV. Showing whole ESV chapters needs Crossway's permission. Keep the BSB as the reading text and say so at the top, or seek an ESV licence?
2. **Which history series is the course?** The fourteen short essays or the eight long ones, and what becomes of the other?
3. **Who should the Study Bible notes be credited to, and what should a "how these notes were made" page say?** I have not written anything about this because it would be inventing facts.
4. **Should readers be able to keep highlights and notes?** On the device only (simple, private, lost if they change phones) or with an account (more work, and it holds people's data)?
5. **Which books get verse-by-verse notes next?** Hebrews and Romans are nearly done. After them I suggest Psalms and Acts; you know what your readers open.
6. **Should the history course cover the Eastern and African churches and the Black church in America as full sessions?** I recommend yes; it is your call on scope and on who reviews them.

---

## Verification

A second reviewer re-checked this report on 2026-11-17 against the live build (origin/main at `fea345a4`, served locally), the pending build (PR #540), and the code and data files. Method: a real browser (Chromium) at 390 by 844 and 1440 by 900, plus fresh counts from `client/public/`. New screenshots are the `verify-*.png` files in `docs/work/audit-2026-11/shots/study-depth/`.

**Checked and confirmed, no change needed:** findings 2, 3, 7, 9, 10, 15, 17, 19 and the Go to items in 21. Findings 1, 5, 8 and 11 are confirmed in substance with a detail corrected (see the table). Every count in the two tables was recounted and matched: 66 introductions; 1,189 chapter notes; 2,228,019 words; shortest note Psalm 117; 1,033 chapters with a hard question; 202 with verse notes; 114 with the fuller notes; 5 book pages with further reading; 443,201 tagged words; 34,033 glosses with angle brackets; 21,232 dictionary entries; 273,169 cross-references; 62 doctrine studies; 24 guides; 22 essays and 58,219 words; 7 eras and 68 events; 36 people, 11 councils, 10 heresies; 10 traditions; 45 events; 15 and 16 witnesses; 14 creed documents; 41 context guides. Screen lengths were measured again (John 3 at 12.3 phone screens, the history hub at 18.4 and at 43.1 with the people tab open, the Study Bible front page at 15.4, the two glossaries at 76.7 and 31.4). The phone sheet measured 608 pixels tall. The pending build was opened: the chapter reader and the history essay are the same there, and the 2027 plan reads as quoted.

**Corrected:**

| Finding | Verdict | What changed |
|---|---|---|
| 6, quoted passages | WRONG count | "178 quoted passages" was not true. There are 32 passages in quotation marks, all in the eight long essays; the essays mostly paraphrase. The finding stands (nothing is referenced). The number and the wording are fixed. |
| 14, lists cut short | OVERSTATED | "3,689 entries are cut short" was wrong. 937 are cut at 60 verses. The other 2,752 are complete and wrongly labelled "the first N are listed". Rewritten, and added as V1. |
| 4, translations | OVERSTATED | The first pass missed the line "Read John 3 in other translations: ESV · NIV · NASB · CSB · KJV" at the foot of every chapter's notes. "Three others elsewhere" was also a miscount (two: the World English Bible and the ESV). Title and text corrected; added as V3. |
| 5, essay links | OVERSTATED | A "More on this" block loads at the very end of each essay with related essays. There is still no previous or next, and no link inside the essay body. Text corrected. |
| 12 and 21, timeline | WRONG in part | The timeline does link each era to its essays ("Read this era") and lists its councils and people. The other three tabs have no links, as stated. Text corrected; the weak tab jump is added as V2. |
| 13, the Black church | OVERSTATED | "The American Experiment" covers Richard Allen and the early Black church, and "The Modern Church and the Global Shift" covers Azusa Street. The civil rights era is absent, as stated. Text corrected. |
| 18, creeds | WRONG in part | The condensed documents are already titled "(Condensed)", so "label each card" was not needed. The Westminster Shorter page is questions 1 to 10, not one question. Retitled and rewritten; what remains is the missing full texts. |
| 16, plan dates | OVERSTATED | The pending plan already says "Start early if you like: the days are numbered". Reworded. |
| 1 and 11, search | API-ARTIFACT in part | "Returns nothing at all" could not be shown locally: the search page also asks the database for essays, books and resources, and with no database it shows "The search didn't load." The substance holds (no Bible text, dictionary entry, doctrine study, person or council is indexed anywhere in the code). Both findings now say what was and was not visible. "Nicaea" does return the two history essays in third and fourth place; corrected. |
| 20, dark setting | CONFIRMED, context added | A dark theme exists in the code and is switched off on purpose (`App.tsx`). Noted. |
| 8, lighter notes | CONFIRMED, detail corrected | John 3 has fourteen drawers, not fifteen. "62 scattered chapters" is 63, and they are not scattered: Hebrews 1 to 10 and Romans 1 to 9 are done. Added as V5. |

**Unsupported claims removed or marked:** "where most of your readers are" (phones; there is no figure for that); "the books people open most" (Romans, Psalms, Acts); "the first thing most people do with a Bible tool"; the phrases "the best Bible study tool in the world" and "which you asked to be the best available", which were set down as if James had said them (his words were "study church history", "understand church history" and "elite, world-class"); "I followed it for three days"; "a compressed index is a few megabytes" (not measured). The statements about the BSB's markup files and audio recordings, and about the copyright of confession texts, are now marked as unchecked knowledge. Comparisons with other Bible sites remain the reviewers' own knowledge, as the report says at the top; none was visited from this sandbox.

**Not re-checked:** the exact figure of 338 chapters naming an ancient source (a looser count gave about 380; the report now says "more than 300"); the 114 glossary terms; the word counts of single doctrine studies and guides; whether any page names the notes' author beyond the credit line in finding 15 (the credit line itself was confirmed); the redesign prototype in `VISION.md`.

**Score.** The corrections cut both ways: translations and the timeline are a little better than first reported, and the word-list label is a new small bug. The score of 6 out of 10 live and 6 after the pending work stands.
