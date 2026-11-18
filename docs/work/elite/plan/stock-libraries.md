# Taking stock: the content libraries

Inventory of every content library under `client/public` and `client/src/data` in `/home/user/Livewell-`, read on the work branch (`claude/todo-implementation-hhp4bm`, head `7ef918a3`, 2026-11-18). Nothing was edited and nothing was built. Counts come from the files themselves. Word counts are rough (every string in a file is counted, labels included). The state of the writing is taken from `/home/user/voice-audit` and was not redone. Tools and downloads have their own inventories (`stock-tools.md`, `stock-downloads-and-resources.md`); they are mentioned here only where they are also a library.

## The short version

- The site holds **70 libraries and data sets**, about **7.5 million words** of its own writing around a 726,000-word Bible text. The Study Bible is the largest thing here by far: notes on all 1,189 chapters (2.2 million words) and verse-by-verse notes on 202 of them (1.1 million words).
- **Verdicts: keep 36, merge 17, rename 3, rewrite 5, retire 9.**
- The depth is real. The libraries do not know about each other. The data for church history, the creeds, the Bible background guides, the Bible guides and the chapter notes contains **no link to any other library**. A Bible chapter can show related pages from only four kinds (study guide, compare-the-views page, Bible background guide, "What the Bible says" topic), and **719 of 1,189 chapters show none**.
- One subject is often written five or six times in five or six places that do not point at each other. "Was America founded as a Christian nation?" exists as an essay, a `/nation` page, a retired "church and power" topic, a question in the 112-question list, and part of a study guide.
- **Two question-and-answer libraries** sit side by side: 35 Honest Answers and 112 "questions people ask". They overlap on at least twenty questions. A third, the best one, is hidden: **1,033 hard questions answered inside the chapter notes**, listed nowhere and not searchable as questions.
- **29 of the 35 Honest Answers** are built on an essay that is now retired, so the reader gets three paragraphs and no way further. Only one answer leads to an essay that is public today.
- **About 40,000 words can no longer be reached**: 22 justice and "church and power" topic pages whose addresses now redirect. They are still listed in the catalogue with those dead-end addresses.
- **13 of the 15 live essays are not in the code at all.** They exist only in the production database, so nobody working from the repository can read, check or cross-link them.
- The voice audit covered nine libraries. About **1.2 million words were never voice-audited**: the 62 doctrine studies, the 31 compare-the-views pages, the 25 Bible guides, the 41 Bible background guides, the creeds, the 69 life pieces, the 208 "What the Bible says" topics and the 132 how-to guides.

## 1. Where the audit of 2026-11-15 is now out of date

| The audit said | What the code says now |
|---|---|
| Church history is "two overlapping series with no way forward"; 22 essays in one list that restarts at Pentecost | Fourteen essays are numbered as a course (`course: 1` to `14` in `client/public/history/essays-index.json`), each with "Essay n", Previous and Next (`pages/history/HistoryEssay.tsx`). The eight longer essays are filed under the era they belong to (`under`). They still cover the same ground twice. |
| "Claims in the history essays cannot be checked" | Seven essays now carry checked source cards, 30 cards in all (`client/public/history/sources/`), held word for word by `scripts/verify-sources.mjs` against 22 stored primary texts. The other fifteen essays have a book list and no cards. |
| "You cannot search the Bible for a word" | Built: `/study/bible/search`, with its own index (`client/public/bible/search/`, 3.8 MB in nine parts). |
| No topics library was counted | `/topics` exists: three full topic pages and an index of 17 questions (`client/public/topics/`). |
| Family: the nightly path has gaps | Every devotion now has its own address (`/family/devotions/<id>`), `/family/tonight` exists, and 12 of the 72 carry a line for grown-ups. Two "world we live in" devotions are written and switched off (`live: false`) until James reads them. |
| "Two of every three essay addresses answer 'James is revising this essay'" | Still true, with five more landed: 20 of the 60 shelf essays are public (15 live plus 5 rewrites in `client/public/essays/`), 40 are pending. |
| "Only 5 of 66 book pages have Further reading" | Unchanged: Genesis, Matthew, Mark, Luke, John. |
| Voice audit: "36 Honest Answers" | The data holds 35 (`client/src/data/answers.ts`). |
| Catalogue counts | The catalogue file on disk was built 2026-11-17 and is not committed. It still lists 8 books, and 22 justice and "church and power" items whose addresses redirect. The join counts in section 4 were taken from it. |

## 2. The inventory: one row per library

"Voice" is the voice audit's score (human / voice, out of ten) where the library was audited. "Not audited" means no reader has scored it.

### 2a. The Study Bible (`client/public/bible/`)

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 1 | Bible text | Berean Standard Bible, 66 books, 1,189 chapters, 726,000 words. Every word carries its Greek or Hebrew, a dictionary number and its grammar; every verse carries cross-references (`ch/`, `text/`). | Everyone | Complete. One translation only. Printed as one block per chapter with no paragraphs, poetry lines or headings (audit finding 3, still open). | **keep** |
| 2 | Greek and Hebrew dictionary | Every word of both Testaments, in 75 files (`lex/`, `morph/`) | Serious reader, pastor | Complete. Raw marks ("<the>") still show (audit finding 10). | **keep** |
| 3 | Word-search index | The whole text, in nine parts (`search/`) | Everyone | Complete. Searches Scripture only, not the notes. | **keep** |
| 4 | Chapter notes | 1,189 chapters, 2.2 million words. Each: summary, where we are in the story, history, culture, how it is built, outline, doctrines taught, key words, Christ in the chapter, study questions. 1,033 chapters also answer one hard question. 114 chapters have the fuller set (how it has been read, text and translations, for teaching). | Serious reader, new Christian, pastor | Every chapter covered. Voice 6 / 5: the 114 rebuilt chapters read like a person, the other 1,075 carry the machine rhythm. Three chapters that touch a wish to die give no help line. No links out to any other library. | **keep** (fix pass on the 1,075; add the three help lines first) |
| 5 | Verse-by-verse notes | 202 chapters in 25 books, 1.1 million words (`notes/<book>/verses/`). Each verse: context, grammar, meaning. | Serious reader, pastor, teacher | Whole books: Genesis, Matthew, Mark, Luke, John. Part: Hebrews 10 of 13, Romans 9 of 16, Exodus 9 of 40, Isaiah 6, Psalms 5, Revelation 3, and one or two chapters in fourteen more. **41 books have none.** Nothing on a chapter says which kind of notes it has. | **keep** (extend; see 3.1) |
| 6 | Book introductions | 66, about 150,000 words: author, date, setting, purpose, structure, themes, key chapters, Christ in the book, how to read it | New Christian, serious reader | Complete. Further reading on 5 of 66. | **keep** |
| 7 | Doctrine studies ("What the Bible Teaches") | 62 studies, 262,000 words, in ten groups. Each: definition, Old Testament, New Testament, key texts, history, where Christians differ, errors, life, questions. 4,305 verses tagged to them (`doctrine-verses/`). | Serious reader, new Christian, group leader | Strong and even (about 4,200 words each). Linked both ways with the chapter notes. 37 of 62 point to a compare-the-views page; none points to a creed, a history lesson, an answer or a catechism question. Not audited for voice. | **keep** |
| 8 | Bible guides | 25 guides, about 102,000 words (`guides/`): 6 "start here", 10 on how to read each kind of writing, 8 on the world of the Bible | New Christian, serious reader | Strong. No links out. Two overlap the Bible background guides (between the Testaments; Pharisees and Sadducees) and three other places explain why translations differ. Not audited. | **keep** |
| 9 | The Story of the Bible | 11 acts with dates, the world of each act, people, and a reading path that covers all 1,189 chapters once (`story.json`) | New Christian, family, serious reader | Complete. | **keep** |
| 10 | Read the Bible in a year (2027) | A dated plan built from the story (`guides/whole-story-2027.json`) | Everyone | Complete; knows today's date. | **keep** |

### 2b. The theology folder (`client/public/theology/`)

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 11 | Compare the views | 31 pages, 157,000 words (`/theology/doctrine/<slug>`): the question, why it matters, each position, the Bible evidence, weighing, how to disagree well, further reading | Serious reader, skeptic, pastor | The best fair-minded writing on contested doctrine here. Five answers point to it. Not audited. | **keep** |
| 12 | "Questions people ask" | 112 questions, 61,000 words, in 11 groups (`questions.json`, `/theology/questions`): short answer, full answer, where Christians differ, passages | Skeptic, new Christian | Good, and nearly hidden: one link from the Answers page. Overlaps the Honest Answers on about twenty questions (the Trinity, hell, losing salvation, slavery, the Canaanites, Genesis, the only way). | **merge** into the Honest Answers as one Questions library (see 5.2) |
| 13 | Passage notes | 230 passages, 114,000 words (`passage-notes.json`), read only by the old "passage in context" tool | Serious reader | A second set of notes on passages the Study Bible already covers. | **merge** into the chapter notes; `/theology/passage?ref=` sends to the chapter |
| 14 | Theology glossary | 114 terms (`/theology/glossary`) | New Christian, serious reader | Useful. Not linked from the notes, where the words are used. | **rename** to "Bible and church words in plain English", and link each term where it appears |
| 15 | Justice glossary | The same 2,800-word file stored twice (`disruption/glossary.json`, `justice/glossary.json`); both addresses redirect | No one today | Orphaned. | **merge** into the glossary (14) |
| 16 | Church traditions | 10 traditions and a shared core (`traditions.json`, `/theology/traditions`) | New Christian, skeptic | Good. `/topics` already offers it under the question people ask. | **rename** to "Why are there so many denominations?" |
| 17 | Creeds summary file | 4 creeds and 9 confessions in short form (`theology-creeds.json`, `/theology/creeds`) | New Christian | Duplicates the creeds library (33) in thinner form. | **merge** into the creeds library; `/theology/creeds` sends to `/resources/creeds` |
| 18 | Biblical theology files | Themes across the Bible, a paragraph on each of the 66 books, how the New Testament uses the Old (three files, about 8,800 words). The page that showed them now redirects. | No one today | Orphaned. Good raw material for "the 66 books at a glance". | **merge** into the book introductions and the planned 66-books view |
| 19 | Bible books and genres file | 66 books by kind (`bible-books.json`), read only by the old passage tool | No one else | Duplicates the book list. | **merge** with 18 |
| 20 | "How to interpret" file | Principles and errors (`theology-hermeneutics.json`, 2,300 words); its page redirects to the Bible guides | No one today | Orphaned; the ten "how to read" guides cover it. | **retire** (address already sends to `/study/bible/guides`) |
| 21 | Theology paths | Reading orders (`paths.json`); page redirects | No one today | Orphaned. | **retire** (address already sends to `/study`) |
| 22 | "How to Use This Section" | First-order, second-order and open questions explained (`methodology.json`, `/theology/how-to-use`) | Serious reader | A page about a section that no longer exists by that name. The idea matters. | **merge** as a short panel at the top of Compare the views, titled "What Christians must agree on, and what they need not" |

### 2c. Church history (`client/public/history/`, `client/public/theology/church-history-*.json`)

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 23 | The course | 14 lessons from Pentecost to today, 24,500 words (about 1,750 each), each with key figures and a book list | Everyone | In order, with Previous and Next. Short for a course: fourteen lessons carry two thousand years, and the last three carry 1730 to today. Voice: ten are good (6.5 to 7.5), four are flat. No questions per lesson. Links go only to other history pages. | **keep** (deepen; see 3.2) |
| 24 | Four older long essays | The Apostolic and Persecuted Church; Councils and Creeds; Nine Hundred Years; The Reformation and Its Wars (11,100 words) | Same reader as the course | They retell lessons 1 to 11 in the older, chopped style (voice as low as 3.5). The voice audit found the pairs disagree on four numbers. | **merge** each into the lessons it repeats, keeping what is better; old addresses send to the matching lesson |
| 25 | Four long modern essays | 1648 to 1800; 1800 to 1950; 1950 to 2010; 2010 to today (22,700 words) | Serious reader, pastor | The best history on the site and the heart of the site's subject (how the American church got here). Also the worst rulebook leaks and 14 unconfirmed sentences about James's life. | **rewrite**, and set them as a second unit of the course: "The American church, 1648 to today" |
| 26 | Timeline | 7 eras, 68 dated events (`church-history-timeline.json`) | Everyone | A year stepper exists. Thin after 1650: one era and 14 events for 375 years. | **keep** (extend) |
| 27 | People | 36 figures with dates, place, role and why they matter | Everyone | Ends at C. S. Lewis (died 1963). Two women. No one from Asia, Latin America, or Africa after Augustine. | **keep** (extend) |
| 28 | Councils | 11, with what was decided and what it gave us | Serious reader | Sound. | **keep** |
| 29 | Heresies | 10 early errors, each with why it appealed and what the church said | Serious reader, new Christian | Sound; all from the first five centuries. | **rename** to "Wrong turns the early church answered" |
| 30 | Source cards | 30 checked quotations on 7 essays (`history/sources/`), against 22 stored texts (`scripts/data/history-sources/`) | Skeptic, serious reader | The right standard. Covers the first four centuries only. | **keep** (extend to every lesson) |
| 31 | "Where the church was silent" timeline | 45 events (`justice/timeline.json`, `/justice/timeline`) | Skeptic, serious reader | A second timeline at a second address, not joined to the first. | **merge** into the one timeline as a layer a reader can switch on; the old address opens the timeline with that layer on |
| 32 | Witnesses | 31 people in two lists (`justice/witnesses.json` 15, `disruption/witnesses.json` 16) at two addresses | Skeptic, serious reader | A third and fourth list of people beside the 36. | **merge** into People (27); both old addresses open People filtered to those names |

### 2d. Creeds and Bible background

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 33 | Creeds and confessions | 14 documents, 20,000 words (`creeds/`): four ecumenical creeds in full with notes, two catechism openings, eight confessions condensed | New Christian, serious reader, pastor | The four creeds are done well. The confessions are summaries, not the texts. No link to the doctrine they confess, the council that wrote them or the history lesson. Not audited. | **keep** (see 3.3) |
| 34 | Bible background guides | 41 guides, 52,000 words (`context/`), in seven groups, including ten on "the verses everyone quotes" | Everyone | Strong idea, each with key texts and sources. Reached from a chapter only when the catalogue matches a verse. Not audited. | **keep** |

### 2e. Questions, topics and help

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 35 | Honest Answers | 35 questions, three paragraphs each, 11,000 words (`client/src/data/answers.ts`) | Skeptic, new Christian | Voice 5 / 6, with 101 fixes ready. Each was written as a short form of an essay: 29 of those essays are retired, 5 are pending, 1 is public. No Scripture reference is stored, so no chapter can point to an answer. | **rewrite** (apply the fixes; give each answer its passages and a living next step) |
| 36 | Topics | 3 full pages and an index of 17 questions (`topics/`). A full page joins the essay, Scripture with its background guide, a witness from history, tonight's devotion, a study guide, tools and care. | Everyone | The only place on the site where the libraries meet on one page. Three pages. Voice 7.5 / 7. | **keep** (this is the pattern; grow it, see 5.3) |
| 37 | Find Help | 40 care pages, 244,000 words (`needs/`): the answer, what is happening, Scripture read in its setting, why it is hard, this week, more help, helping someone else, prayer, questions, sources | A person in a hard season; the friend or pastor beside them | The cleanest and best-linked library (voice 7 / 7; a help line on every page; links to study guides, plans, tools, the Study Bible). 36 pages repeat one sentence about James. Each holds notes where only James can add a memory. | **keep** |
| 38 | Eight-week plans | 29 plans, 75,000 words (`plans/`) | The same person, over two months | Good; well linked to the Study Bible and tools. Three plans have no care page (deconstruction, forgiveness, skeptic; the care pages are named differently) and 14 care pages have no plan. | **keep** |
| 39 | "What the Bible says about..." | 208 topics, 91,000 words (`wisdom/topics.json`, `/wisdom/<id>`): framing, culture, history, application, verses | Everyone, by search | Wide. Every topic points to a life piece and a how-to list. Stored twice (one file and 26 part files). Not audited. Not in the menu. | **keep** (list every topic in the Topics index) |
| 40 | Life pieces ("Everyday life") | 69 long pieces, 398,000 words (`life/`, `/life/<slug>`), each in eight parts: a scene, the cost, Scripture, the church's history, what research says tested against Scripture, where Christians differ, what God forms, practice | Seeker, Christian adult | The deepest treatment of marriage, work, money, the body and the seasons of life on the site. Titles are plain questions. Not in the menu. Not audited. | **keep** (make each the long read of its topic) |
| 41 | How-to guides | 132 guides, 118,000 words (`howtos/`), twelve in each of eleven subjects | New Christian, parent, seeker | Even and practical (about 950 words each). Almost no links out. Not audited. Footer only. | **keep** |
| 42 | Pathways | 12 one-page routes through a subject (`pathways/`, `/pathways/<slug>`) | Seeker | The same job as a topic page, done earlier and thinner. Most of their 45 essay links point at essays that are now retired. | **merge** into Topics; each address sends to its topic |
| 43 | Reading paths | 4 lists in `reading-paths/index.json` and 9 more in `reading-paths-post-christian.ts` (71 essay entries) | Skeptic, reader of essays | Lists of essays, most retired. | **retire**; `/reading-paths/<slug>` sends to the matching topic, or to `/writing` |

### 2f. For groups and churches

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 44 | Small group study guides | 68 guides, 1.65 million words (`studyguides/`), five sessions each (one has six), with leader's notes, a script, questions, a book list | Group leaders, teachers, pastors | Voice 4 / 4, the weakest writing on the site. Six newer guides are good; sixty-two came from one mould. Five that touch despair name no help line; three that touch abuse do not say to report it. About 300 book notes end "Leader to confirm". Only two guides study a part of the Bible itself (the Sermon on the Mount, the Psalms). | **rewrite** (help lines first; then the sixty-two on the model of the six) |
| 45 | Essay discussion guides | 90 sets of questions, 31,000 words (`discussion-guides.ts`, `/group-guide/<slug>`) | Groups reading an essay | 79 belong to retired essays. One belongs to an essay that is public today. | **merge**: print the questions at the foot of their essay; a guide whose essay is retired sends to `/studyguides` |
| 46 | Sermon series | 6 outlines, 10,000 words (`sermon-series.ts`); the page redirects | Pastors | Orphaned. Material for pastors, which the brief keeps outside the site. | **retire** (address already sends to `/study`) |
| 47 | Booklets for elders and church leaders | 10 booklets as PDF and EPUB (`booklets.ts`, `ebook/`) | Elders, pastors | See the downloads inventory: seven of ten name the Pastors Connection Network inside the file. | **keep** |
| 48 | Workbooks | 2 (before you marry; a weekend for two), 14,000 words | Couples | Sound. | **keep** |

### 2g. Family

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 49 | Weekly family devotions | 72, about 24,000 words (`family-devotions.json` 12, `family-devotions-2.json` 60): passage, big idea, reflection, questions by age, activity, prayer | A parent at the table | Voice 5 / 4. Sound and kind, one shape seventy-two times, no contractions in words meant to be read aloud. Two reflections misstate their passage. Each is a virtue or a subject; drawn from 27 Bible books. Every one links to its passage in the Study Bible. | **rewrite** (on the model of the Thanksgiving week) |
| 50 | "The world we live in" devotions | 2, written and switched off | Parents of older children | Waiting for James to read. | **keep** (hidden until he says yes) |
| 51 | Seasonal sets | Advent 25 days, Holy Week 8, Thanksgiving 7 (`family-seasonal.json`) | Families | Thanksgiving is the best family writing on the site. No Lent, no Easter week, no Christmas to Epiphany. | **keep** |
| 52 | Family catechism | 76 questions in six parts, 12,000 words: answer, child's answer, verse, commentary, prayer | Families, new Christians | Complete. Wording changes only on James's word. No link to the doctrine study on the same subject. | **keep** |
| 53 | Family reading plans | 4 plans, 111 days (Life of Jesus, Old Testament story, Psalms, 21 days for a family new to faith) | Families | Sound. Cannot be printed. | **keep** |
| 54 | Printable reading plans | 5 plans (`bible-reading-plans.json`), shown at the foot of the eight-week plans page | Any reader | A third set of reading plans in a third place, beside the family plans and the year plan. | **merge** onto one "Bible reading plans" page with the family plans and the year plan |

### 2h. Essays and books

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 55 | Live essays | 15 on the shelf (`client/src/lib/shelf.json`) | Everyone | 13 exist only in the production database; two are in the code. The voice audit could read three: two read as machine-drafted, one reads like James. | **keep** (bring the text into the code so it can be checked) |
| 56 | Essays being revised | 45 pending. 5 rewrites have landed and are public (`client/public/essays/`, 18,700 words). 15 more are rewritten and corrected and not yet landed. 25 have no rewrite. | Everyone | The 25 rewritten essays score 8 to 9 human and 7.5 to 8.5 voice. Five rewritten essays are not on the shelf list at all. | **keep** (land the fifteen; decide the twenty-five) |
| 57 | Essay archive | 350 older posts, 555,000 words (`content-data.json`) | No one: each address shows a "being revised" notice | Retired already. Twenty-nine Honest Answers still depend on essays in it. | **retire** (stays retired); send each address to the best living page on its subject, not to a notice |
| 58 | Seed article sets | 118 articles in 22 files (`client/src/data/articles/`), read only by the server's seeding code | No one | Not a reader's library. | **retire** from the site's data once nothing seeds from it |
| 59 | Books shelf | 3 titles (`bookShelf.ts`) | Everyone | Sound. | **keep** |
| 60 | Five taken-down book pages | Still routed, not listed, with a buy button (see the downloads inventory) | No one | Half removed. | **retire**; each address sends to `/books` |
| 61 | Old book records and samples | 21 book records in `content-data.json`, 20 opening samples and about 90 cover files in `client/public/books/` | No one | Left over from the larger catalogue. | **retire** (keep the files off the site, in James's archive) |

### 2i. Older sections, and the files that join things

| # | Library | Holds | Who it serves | Depth and state | Verdict |
|---|---|---|---|---|---|
| 62 | "Christ and the Nation" | 11 essays, a party scorecard and a law-by-law page, 29,000 words (`nation/`); reachable, not in the menu | Skeptic, Christian | Good material. Three pieces repeat shelf essays by title (the Christian-nation question, Christian nationalism, render to Caesar). | **merge** into the topic page on faith, politics and the flag, with the essays; addresses send to the topic or the matching essay |
| 63 | "Church and power" topics | 12 pieces, 23,000 words (`disruption/topics/`); every address redirects | No one today | Unreachable. Each is built fairly: Scripture, the church's record, where we agree, how the left and the right each bend it, the cost. | **merge** into topic pages |
| 64 | Justice topics | 10 pieces, 18,000 words (`justice/topics/`): the poor, the immigrant, the prisoner, race, wages, creation, abuse, life; every address redirects | No one today | Unreachable, and the only treatment of several of these subjects on the site. | **merge** into topic pages |
| 65 | Orphan files | `disruption/questions.json`, both `methodology.json` files, both `topics-index.json` files | No one | Nothing reads the method files. | **retire** |
| 66 | Lament page | Sections and prayers (`prophetic/lament.json`); `/lament` already lands on the lament study guide | No one today | Orphaned prayers. | **merge** the prayers into the lament study guide |
| 67 | Quotations | About 400 lines drawn from the essays (`social-quotes.ts`) | Readers who share | Drawn mostly from essays now retired. | **rewrite**: rebuild from the public essays and the Study Bible as the source for share cards |
| 68 | The catalogue | One list of 931 published things, built at deploy | Powers the Library page, downloads, and "related" under a chapter | The one joiner. Carries Scripture references for only four kinds. Still lists 22 dead-end items. | **keep** (extend; see 5.1) |
| 69 | Search index | 724 entries from ten sources | Everyone | Holds the Study Bible, doctrine, history, family, answers and the 208 topics. Care pages, study guides, how-tos, creeds and background guides come from other code and were not traced here. | **keep** |
| 70 | Help-line lists | `crisis-resources.json`, `sensitive-pages.json` | People in crisis | The source for every help line the site prints. | **keep** |

**Count: keep 36, merge 17, rename 3, rewrite 5, retire 9. Total 70.**

Not counted here because they are tools or plumbing: the argument cases for Test the Case, the "which view" quizzes, the consistency check, the filing maps (`pillar-assignments.ts`, `subpathway-mapping.json`), the book-name table, and `llms.txt`.

## 3. The gaps a serious student would find

### 3.1 The Study Bible

- **Verse-by-verse notes: 41 books have none.** In the New Testament: 2 Corinthians, 1 and 2 Thessalonians, 1 and 2 Timothy, Titus, Philemon, James, 1 and 2 Peter, 1, 2 and 3 John, Jude. In the Old Testament, every book except Genesis, Exodus, Leviticus, Deuteronomy, 2 Samuel, Psalms, Isaiah, Jeremiah, Ezekiel, Daniel, Micah and Zechariah. Of those twelve, only Genesis is whole.
- **Closest to done:** Hebrews (chapters 11 to 13 missing) and Romans (seven chapters missing). Acts has one chapter of 28, Psalms five of 150.
- **Further reading** on 5 of 66 books.
- **One translation.** No second text to set beside it. (The audit raised this; it is James's call.)
- **Chapters with nothing beside them:** 719 of 1,189 show no related page. Eight books show none on any chapter: 1 Chronicles, Ezra, Esther, Obadiah, Nahum, Haggai, Zechariah, 2 John.
- **The 1,033 hard questions** have no list, no address of their own and no place in search.
- **Maps, and a table of who lived when in the Bible.** No file holds either. (The story file has dates and people for each act, which is the start of one.)

### 3.2 Church history

Judged by searching the 22 essays and the timeline for the words, not by a full reading:

- **The East after 1054 is missing.** "Byzantium" does not appear; Russia appears once. The course follows the Latin West from the schism onward.
- **The church outside the Roman world is missing.** No mention of the Church of the East, Armenia, or the Coptic church; Ethiopia and the Syriac churches appear once each. The rise of Islam appears twice.
- **Between the Reformation and the revivals** there is no Puritan and no Quaker, and nothing on the English settlement beyond the Reformation lesson's own summary.
- **The twentieth century is one lesson.** No mention of the Holocaust, apartheid, the World Council of Churches or liberation theology; the Second Vatican Council is in the councils list and not in an essay; the civil rights movement and Martin Luther King appear once.
- **The Black church** has no lesson. An essay on it is on the shelf, pending.
- **People:** 36, none living after 1963, two women, none from Asia or Latin America.
- **Course furniture:** no questions for a lesson, no "what to read from the period itself", sources on 7 of 22.

### 3.3 Creeds and confessions

Eight of the ten confessions are condensed, and two catechisms give only their opening. A student who wants the Westminster Confession's words on Scripture cannot read them here. Not present at all, among documents a Baptist reader or a student would look for: the Baptist Faith and Message, the Belgic Confession, the Lausanne Covenant, the Chicago Statement on inerrancy. (Which to add, and whether to print full texts, is for James.)

### 3.4 Doctrine

Sixty-two studies is a full set. Going by study names and their listed terms, these have no study of their own: grace (it lives inside salvation and justification), adoption, assurance (inside perseverance), glorification, conscience, miracles and healing (a compare-the-views page exists), Satan and demons (inside angels), church discipline, fasting. Baptism and the Lord's Supper share one study.

### 3.5 Questions with no answer

Going by the titles of the 35 answers and the 112 questions together, nothing is titled on: abortion; same-sex attraction and gender; suicide and whether it can be forgiven; women as pastors (an essay is pending); how Catholics and Protestants differ; Mormons and Jehovah's Witnesses; tongues and healing today; racism; immigration; the death penalty; mental illness and medicine; Judaism, Hinduism or Buddhism (Islam has an answer). Racism, immigration and a consistent ethic of life are written already, in the unreachable justice topics (64). James took down two books on sexuality and gender; whether the site answers those questions is his decision.

### 3.6 Family

- No walk through the Bible's story for children: the 72 devotions are subjects and virtues. No devotion comes from Exodus, Ruth, Esther, Daniel or Jonah.
- No Lent, Easter week or Christmas-to-Epiphany set.
- The catechism and the reading plans cannot be printed (audit F12, unchanged).
- Sixty of the 72 have no line for grown-ups.

### 3.7 Group study

Only two of 68 guides study a book or passage of the Bible. A group that wants to work through Mark, Romans or Genesis has the richest notes on the site and no guide built from them.

## 4. How the libraries connect today

Counted from the data files and the page code.

| From | Links it has | Links it lacks |
|---|---|---|
| A Bible chapter | The doctrines it teaches (both ways). Up to eight related pages by Scripture reference, from four kinds only: study guides, compare-the-views pages, background guides, "What the Bible says" topics. 470 chapters get at least one. | The family devotion on the passage, the catechism question that cites it, the care page that reads it, the creed, the history lesson, the answer, the eight-week plan. 187 chapters are cited by a devotion, a catechism question or a care page and do not know it. |
| A doctrine study | Its verses and chapters; 37 of 62 to a compare-the-views page | The creed that confesses it, the council and heresy in its own history section, the catechism questions, the answers, the family devotion |
| A compare-the-views page | Other such pages, the 112 questions, the old passage tool | The doctrine study (one way only), the creeds, history |
| A church history lesson | The next lesson; people and councils on the hub; its source cards | Everything else: no creed, no Bible passage, no doctrine, no shelf essay on the same century, no study guide |
| A creed | Nothing | The council, the lesson, the doctrine studies, the catechism |
| A Bible background guide | Nothing in its data; its verses become live references | The chapter it explains (the chapter may find it; it does not point back), the Bible guides |
| An Honest Answer | A book; an essay if public (one is); five have a compare-the-views link; ten have an argument to test | Scripture, the doctrine study, the 112 questions, a topic |
| A family devotion | Its passage in the Study Bible; a care page where the subject is heavy | The catechism question on the same subject, anything for the parent to read |
| A catechism question | Its verse | The doctrine study, the devotion |
| A care page | Study guides, life pieces, how-tos, topics, plans, tools, the Study Bible, background guides, a few doctrine pages | History; the answers |
| A study guide | Care pages and plans | The Bible chapters it studies, the doctrine study, history |
| A topic page | Essay, Scripture and its background guide, a witness, a devotion, a study guide, tools, care | Only that there are three of them |

In plain words: Find Help and the three topic pages are well joined. The study side (Bible, doctrine, history, creeds, background) is four separate shelves.

## 5. Proposals

### 5.1 One set of tags, carried by every piece

Give every piece in every library the same four tags, and let the catalogue builder (`scripts/build-catalogue.mjs`) collect them:

1. **Passages**: book, chapter, verses. Already present, under different names, in devotions (`passage`), the catechism (`scripture`), care pages (`scripture.passages`), background guides (`keyTexts`), doctrine studies (`keyTexts`), and study guides. Absent from answers, history lessons, creeds and how-tos; those need them added.
2. **Doctrines**: the 62 ids the Study Bible already uses.
3. **Topic**: one slug from the topics list.
4. **When and who** (history only): years, and names from the People list.

Then every page can end with the same short rail, "Go further", with one of each kind that truly matches and nothing where nothing does. No hand-kept link lists.

### 5.2 One Questions library

Merge the 112 questions into the Honest Answers: one page, one search box, one address per question. Where both answer the same question, keep the better and send the other address to it. Add a third shelf, "Hard questions in the Bible, by book", drawn from the 1,033 already written in the chapter notes, each opening in its chapter. Every answer shows its passages, the doctrine study, the compare-the-views page where Christians differ, and the essay only when it is public.

### 5.3 Topics as the place where the libraries meet

The three topic pages already do what the whole site should do. Grow the list by folding in what is scattered: the 12 pathways, the 11 nation pages, the 22 justice and "church and power" pieces, and a row for each of the 40 care pages and each of the 208 "What the Bible says" topics. A full topic page needs: the question in the reader's words, a short answer, the passage with its background, what the church has said (a witness and a history lesson), the long read (a life piece or an essay), tonight's devotion, a study guide, a tool, and care. A subject without all of those gets a row, not a page.

### 5.4 The joins that would make it one study library

| Join | What the reader sees | What it takes |
|---|---|---|
| Chapter to family | "Tonight at the table: [devotion]" on the 58 chapters a devotion uses; "The catechism asks: [question]" on the 50 chapters a question cites | Read `passage` and `scripture` into the catalogue |
| Chapter to care | "If this is where you are: [care page]" on the 131 chapters a care page reads | Read `scripture.passages` into the catalogue |
| Chapter to background | The ten "verses everyone quotes" guides shown on their own verse, not under the chapter | A verse-level match |
| Chapter to history | "How this passage has been read" pointing to a lesson (Romans 13, Matthew 16, John 1) | Passages added to lessons |
| Doctrine to creed, council and heresy | In the study's history section, the Nicene Creed, Nicaea and Arianism become links | Doctrine ids added to the creeds, councils and heresies |
| Doctrine and compare the views, both ways | "What the Bible teaches" and "Where Christians differ" as a pair on both pages | The link exists one way on 37 studies |
| Doctrine to catechism | "For children: questions 12 to 15" | Doctrine ids on the 76 questions |
| History lesson to creeds and Scripture | The creed written in that century opens beside the lesson; Bible references open as live verses | Tags, and the existing verse component |
| History lesson to essay | "James on this period" when a shelf essay is public (the ancient church section has nine) | Years on essays |
| Devotion to parent | "For you, before the table: [doctrine study or answer]" | Doctrine ids on devotions |
| Answer to everything | Passages, doctrine, views, topic | Section 5.2 |
| Study guide to Bible | Each session opens its passage in the Study Bible | References are in the data already |

### 5.5 One list of people, one timeline

Fold the 31 witnesses into the 36 people and the 45 "silence" events into the 68 timeline events. A reader then has one list of 67 people and one timeline of 113 events, with the hard record as a layer that can be switched on, and "who was alive when" has all its data in one place.

### 5.6 Stop keeping the same thing twice

The 208 topics are stored whole and again in 26 parts. The justice glossary is stored twice. Translations are explained in four places (a Bible guide, a compare-the-views page, a live essay, a question). Between the Testaments and the Pharisees each have a Bible guide and a background guide. Choose one home for each and send the other address to it.

### 5.7 Order of work for the writing

The brief's order stands (study guides, devotions, answers, history, Bible notes, pages, Find Help). Two additions from this inventory. First, put the eleven missing help lines in before anything else (five study guides on despair, three on abuse, and three Bible chapters). Second, have the 1.2 million unaudited words read by the same two readers before they are trusted: the doctrine studies and compare-the-views pages first, since they are what a pastor will judge the site by.

## 6. What only James can decide

1. **Which books get verse-by-verse notes next.** Hebrews and Romans are nearly done. After them: Acts, Psalms, the shorter letters?
2. **A second translation** to set beside the Berean Standard Bible, and whether quoted Scripture elsewhere on the site moves to match it.
3. **The Decision Log protects `/nation`, `/justice/timeline` and both witnesses addresses from redirects.** Merging them (rows 31, 32, 62) keeps every address working but changes what opens there. Yes or no.
4. **The 22 unreachable justice and "church and power" pieces.** Bring them back inside topic pages, rewrite them first, or leave them down. They cover race, immigration, the poor, the prisoner, abuse and a consistent ethic of life.
5. **Questions the site does not answer** (section 3.5), above all sexuality and gender after the two books came down. Which does he want answered, and which left alone?
6. **The 25 pending essays with no rewrite**, and the five rewritten essays that are on no list. Which go on the shelf?
7. **The 29 Honest Answers whose essay is retired.** Let the answer stand alone, bring its essay back, or drop the answer.
8. **The eight older and longer history essays.** Fold the four older ones into the course, and make the four modern ones a unit on the American church?
9. **Creeds:** print full texts of the confessions, and add the Baptist Faith and Message and others?
10. **Doctrines with no study** (section 3.4): which, if any, he wants written. Doctrine wording is his.
11. **The 62 study guides from the one mould:** rewrite a few at a time, or take the weakest down until they are done. And whether he wants guides that study books of the Bible.
12. **Sermon series and anything written for pastors:** leave off the site, as the brief says, or keep a small shelf.
13. **The 13 live essays that are only in the database:** may their text be brought into the code so it can be checked and linked.
14. **The memory slots on the 40 care pages** and the 14 unconfirmed sentences about his life in the modern history essays: supply the real detail, or cut the sentence.
15. **Family:** does he want a year that walks children through the Bible's story, beside the 72 subject devotions; and Lent and Easter sets.
