# The tools plan: what to build, what to rebuild, and in what order

Written 2026-11-18 for James Bell and for the builders. One of four planning documents. This one covers the interactive pieces and the tools.

James: the first eight sections are for you. They use plain words. The last section, "For the builders", has the file names and the technical detail. You can stop before it.

## How far to trust this page

- **What the site holds** comes from the four stock-takes and the first wave's notes, which were read from the code on 2026-11-18. Nothing here was run in a browser by me.
- **What other sites do** comes only from the eight research files. Those researchers could not open a single page on any site. Every network request was refused. They worked from search results: page titles, addresses, help-page summaries, and reviews. So this plan borrows ideas that the sites' own help pages describe. It says nothing about how any other site looks, because nobody saw one.
- **Nothing is invented.** Where a tool needs a fact, a date, a source, a recording or a sentence of yours that does not exist yet, the tool waits for it and says so.

---

## 1. The short version

The site already has 62 tool-like things. The stock-take's verdict: keep 37, fold 13 into others, rename 2, rebuild 4, retire 6. After the folds the tools page drops from 36 tiles to 22, and no two do the same job.

The first wave built more than the audit knew: word search in the Bible, a tap anywhere on a verse, copy a verse, a year-by-year stepper for church history, source cards on seven history essays, a find box on the answers page, "A devotion for tonight" in three taps, a family's own place in the catechism, reading plans that know today.

So the work now is three kinds:

1. **Join.** The libraries do not know about each other. 719 of 1,189 Bible chapters show nothing beside them. One shared index fixes that, and four of the biggest tools below read from it.
2. **Finish.** The study Bible desk, the timeline, the question box, the catechism, the memory tool, and the road for a new Christian each exist in part.
3. **Fold and repair.** One name per tool. One Bible wording. Every tool remembers its place and leads somewhere next.

This plan lists **35 units of work** in four waves. Wave A is the eleven a visitor will feel first.

**The four pieces people will remember** (the benchmark document names the same four):

1. **Tap a verse and the library opens.** Notes, words, cross-references, a second translation, and "Go deeper" into your own doctrine study, history lesson, hard question and family devotion on that verse.
2. **Twenty centuries on one line you can move with a thumb.** Who was alive, what was decided, the source in the writer's own words.
3. **One box for a hard question.** One best answer. Then: argue it, see where Christians differ, read the passage.
4. **Tonight at the table in three taps,** with the catechism said aloud.

---

## 2. Rules every tool keeps

These come from your brief ("Tools that teach") and from what every research file told us to refuse.

1. **One job.** A person could name it in a sentence. No two tools do the same job.
2. **Phone first.** Every button is a full thumb high. Every tool works at phone width with no sideways scroll.
3. **It remembers.** Close the page, come back, and you are where you stopped. Kept on your own device. No account, ever.
4. **It leads somewhere next.** Every tool ends with one next step that is a real page on this site.
5. **It teaches.** If a piece only decorates, it is cut. The pieces that move (the timeline, the 66 books) must still make sense as a plain list, for a screen reader, for print, and for a slow phone.
6. **It is fast.** Nothing a tool needs is loaded until the person opens that tool. The home page and a Bible chapter must not get slower. (After the first wave, John 3 measured 95 out of 100 for speed. That number is the floor.)
7. **Nothing invented.** Every verse comes from the site's own Bible text, named. Every date has a source. Every quotation is checked word for word against a stored text.
8. **No scores on a soul.** No streaks, badges, points, or "you are 47 days behind." A parent who misses Tuesday meets "Pick up where you left off."
9. **Free, and no sign-up in the way.** Today a study guide's handout still asks for an email first. That comes off.
10. **Three finished before a fourth.** The research's clearest lesson about interactive pieces is to build few and finish each.

---

## 3. What is already built (so we do not build it twice)

| Piece | State today |
|---|---|
| Search the Bible for a word or phrase | Built (`/study/bible/search`). Whole words, phrases first, filter by testament or book. |
| Tap a verse for its notes and words | Built. A tap anywhere on the verse. The phone panel opens at 42 percent with previous and next verse. |
| Copy a verse, copy a link | Built, with the reference and "Berean Standard Bible". |
| Poetry in lines | Built from punctuation. The true layout waits on the translation's own files. |
| Church history as a numbered course | Built: 14 lessons, previous and next, names linked to their entries. |
| Sources shown | Built for 7 essays: 30 checked excerpts. Fifteen essays have none yet. |
| A timeline to step through | Built as a year stepper. Not a drawn line. Not to scale. |
| A find box on the answers | Built. Each answer still has no page of its own. |
| A devotion for tonight in three taps | Built on the family page. |
| A family's own place in the catechism | Built. No out-loud practice yet. |
| Reading plans that know today | Built for the four family plans and the 2027 plan. Nothing for an adult who wants to start today. |
| A road for someone new (`/start`) | Built as six steps. It does not remember which step you are on. |
| My Library (what you saved and started) | Built. It misses four tools and cannot move to a second device. |

---

## 4. The ranked list

Ranked by value to a person studying, divided by cost. Size: **S** is under a day, **M** is a few days, **L** is more. "Needs you" means the unit cannot ship without a decision or a read from James.

| # | The piece, in plain words | Area | Size | Wave | Needs you |
|---|---|---|---|---|---|
| 1 | "Go deeper": every page knows what else the site has on its passage | All | M | A | No |
| 2 | The verse panel, finished: five fixed tabs, cross-references you read in place | Study Bible | M | A | No |
| 3 | Highlights and notes kept on your device | Study Bible | M | A | No |
| 4 | One list of every question the site answers, and a page for each answer | Hard questions | M | A | A sample read of the short answers |
| 5 | The ask box: type a hard question, get one best answer | Hard questions | M | A | Your yes on what happens when nothing fits |
| 6 | One tools page from one list; the doubles folded | Tools | M | A | A yes or no on each fold |
| 7 | The catechism said aloud | Family | M | A | Whether you will record the answers |
| 8 | Tonight in three taps, finished | Family | S | A | No |
| 9 | A road that remembers your place | Discipleship | M | A | Mark or John first |
| 10 | Every history date as a year, with its source (the groundwork for the timeline) | Church history | M | A | No |
| 11 | Small repairs: four tools that forget, six that lead nowhere | Tools | S | A | No |
| 12 | The timeline you can move through | Church history | L | B | Whether the hard record shows as a layer |
| 13 | Who was alive when | Church history | M | B | No |
| 14 | "Read" and "Study": two views of a chapter, one settings menu | Study Bible | M | B | Scripture in the serif face, yes or no |
| 15 | Memory verses that come back | Family, Study | M | B | No |
| 16 | Share cards for verses and quotations | Share | M | B | May they carry your name and the site address |
| 17 | The 66 books at a glance | Study Bible | M | B | May the site carry drawings |
| 18 | A reading plan for one adult that starts today | Study Bible | M | B | No |
| 19 | The week at a glance | Family | M | B | No |
| 20 | Questions after each history lesson, and "Test what you know" | Church history | M | B | You read the questions first |
| 21 | One Bible wording in every tool | Tools | M | B | Confirm the Berean Standard Bible everywhere |
| 22 | My Library holds everything, with a file to carry it to another device | All | S | B | No |
| 23 | One search box that asks what you meant; results by kind | Search | M | C | No |
| 24 | Follow one word through the Bible | Study Bible | M | C | No |
| 25 | A second translation beside the first | Study Bible | M | C | Which translation |
| 26 | People of church history, A to Z | Church history | M | C | Whether the two "witnesses" lists join it |
| 27 | Names and church words that open in place | Study, History | M | C | No |
| 28 | A first course: one Gospel in seven sittings | Discipleship | M | C | Mark or John; you read the questions |
| 29 | A course that starts on a date and is shared by a link | Discipleship | M | C | No |
| 30 | A weekly rhythm that ends on one printed page | Discipleship | S | C | No |
| 31 | "See where Christians differ", opened in place; the argument drawn on one screen | Hard questions | M | C | No |
| 32 | The paper to match: catechism cards, a year chart, lesson handouts, memory cards | Family, History | M | C | You see one sample of anything with doctrine wording |
| 33 | One book of the Bible drawn as a band | Study Bible | M | D | No |
| 34 | The creed, line by line | Church history | L | D | You read every line of connecting text |
| 35 | Trace the argument of a passage | Study Bible | L | D | The sentences are yours to write or approve |

Two more items are writing, not building, and belong to the writing plan: the 36 prayers in "Prayers for When You Have No Words", and the short "what you just read" card after each Bible chapter. They are noted in section 7.

---

## 5. Each piece, one by one

Every card has the same ten lines. "On a phone" is written as the screens and taps a person would count.

### The study Bible desk

Your brief asks that a reader can "read, search for a word, see notes beside the text, compare a translation, follow a cross-reference, and keep a highlight." Word search is built. The other five are pieces 2, 3, 14 and 25. Copy is built; share is piece 16.

#### 1. "Go deeper": every page knows what else the site has on its passage

- **The one job.** From any Bible chapter, show what else you have written on it. From any other page, show the Bible chapter and its neighbors.
- **Who it is for.** Everyone. The serious reader most. It is also the engine under pieces 2, 5, 13 and 19.
- **On a phone.** One screen, no new page. At the foot of a chapter (and inside the verse panel) a short list titled "Go deeper", one row per kind, in the same order every time: the hard question, the doctrine study, the church history lesson, the Bible background guide, the study guide, the family devotion, the catechism question, the care page. One tap opens the page. A kind with nothing shows nothing. The same list sits at the foot of an answer, a lesson, a devotion and a doctrine study.
- **Data it already has.** Passages are already recorded on devotions, catechism questions, care pages, background guides, doctrine studies and study guides, under different field names. The stock-take counted 187 chapters that a devotion, a catechism question or a care page cites and that do not show it. Passages must be added by hand to four kinds: the 35 answers, the history lessons, the creeds, the how-to guides.
- **Replaces or folds in.** The mixed "related" list of up to six items on a chapter. The machine-sorted shelves that the family unit already took off one page. Hand-kept link lists.
- **Where it lives.** No address of its own. It is a block on every content page and a tab in the verse panel.
- **What keeps it fast.** One small file per Bible book, fetched only when the block scrolls near the screen. Nothing is added to the first load.
- **Size.** M.
- **How we will know it works.** John 1 shows the doctrine study on the incarnation, the Nicaea lesson, and a family devotion. Fewer than 400 chapters are left with nothing beside them (today 719). No "Go deeper" row ever lands on a retired essay's notice.
- **From the research.** Three publisher sites file everything by Scripture and by topic; the researcher called one generated cross-index "the single highest-value borrowing in this group." The Bible-tools file calls a "Go deeper" tab that points at one author's own writing "the thing none of the three sites can do."

#### 2. The verse panel, finished

- **The one job.** Tap a verse and study it without leaving the chapter.
- **Who it is for.** The serious reader, the new Christian with a question about one verse, the pastor preparing.
- **On a phone.** Screen 1, the chapter. Tap a verse (1 tap). A sheet rises to about 40 percent; the verse stays visible above it. The sheet has five tabs, always in this order: **Notes · Words · Cross-references · Compare · Go deeper.** A tab with nothing for this verse is greyed, not hidden, so the row never jumps. Tap "Cross-references" (2 taps): up to twelve references, each with its verse printed in full under it. Tap one (3 taps) and that verse's chapter opens at that verse. "Previous verse" and "Next verse" at the foot walk the chapter without closing the sheet. "Taller" lifts the sheet to most of the screen. Copy and "Make a card" sit beside them.
- **Data it already has.** Verse notes on 202 chapters; chapter notes on all 1,189; Greek or Hebrew under every word; about 273,000 cross-references, up to twelve a verse; the text of every chapter in small files.
- **Replaces or folds in.** The panel as it stands today (notes and words in one scroll). The Passage tool (`/theology/passage`), whose 230 passage notes and genre guidance move beside the chapter, and whose outside fetch from another site is removed. The 37 six-layer studies in "Book-by-Book Bible Study" become "Go deeper" on their chapters, after each scholar named in them is checked. The 12 "how to read this book" pieces go to the book pages.
- **Where it lives.** Every chapter page. A verse can be linked: the chapter address with the verse and the tab in it, so a pastor can send "John 1:14, cross-references" in one link. Every Scripture reference anywhere on the site already opens a verse; that sheet gains "Open in the Study Bible".
- **What keeps it fast.** The chapter first loads only its plain text (about 4 KB for John 3). Cross-references come from a new small file per chapter with each reference's first line already inside it, so opening the tab is one fetch, not twelve. The heavy word data (about 38 KB for John 3) loads only when "Words" is tapped.
- **Size.** M.
- **How we will know it works.** On a phone, John 3:16 to its cross-references to Romans 5:8 is three taps. The chapter's speed score stays at 90 or better and the page does not jump. A screen reader announces the five tabs and which are empty.
- **From the research.** Blue Letter Bible's help page describes one Tools button per verse with the same fixed tabs every time, and a 2025 post adds Previous and Next. Bible Hub's verse pages print the text under each cross-reference. Refused from those sites: tabs of other people's commentaries, abbreviations as labels, ads.

#### 3. Highlights and notes kept on your device

- **The one job.** Mark a verse and write a line beside it, and find it again.
- **Who it is for.** Anyone who studies with a pencil.
- **On a phone.** Tap a verse (1). In the sheet's foot, tap one of three highlight marks (2). The verse is tinted. Or tap "Note" (2), type, tap "Keep" (3). A small pencil mark shows beside the verse number. Under the note field, always: "Kept on this device only. Nothing you write here leaves it." In My Library a new section, "Your marks", lists every highlight and note by book, each opening its verse. One button there: "Save my marks to a file."
- **Data it already has.** The verse panel; the private-notes code inside the old "Book-by-Book" tool; the storage helper with its honest save-failure line.
- **Replaces or folds in.** The private notes in "Book-by-Book Bible Study". Existing notes are carried over, not lost.
- **Where it lives.** The verse panel and My Library.
- **What keeps it fast.** Marks are a few bytes each, read from the device after the text is on screen. No server.
- **Size.** M.
- **How we will know it works.** Highlight John 3:16, close the browser, reopen: it is there. Fill the device's storage on purpose: the page says "Couldn't save to this browser" and never pretends. Export, clear the browser, import: every mark returns.
- **From the research.** Three of four Bible-reading sites hang highlight and note on the verse, and keep them in an account. The researcher's point: keeping them on the device "is rarer and more honest; it needs a My Library list and a file export so the promise is not a trap."
- **Colors.** The three marks use the site's own tints (a pale mustard, a warm grey, an underline), not a rainbow. Mustard stays under the 8 percent rule.

#### 14. "Read" and "Study": two views of a chapter, one settings menu

- **The one job.** Let a reader put the notes away and simply read, or bring them all out.
- **Who it is for.** The parent reading aloud and the new Christian (Read). The student (Study).
- **On a phone.** Under the chapter title, one control with two words, **Read · Study** (1 tap). *Read*: no verse numbers, no marks, paragraphs and poetry lines, Listen. *Study*: each verse on its own row, a dot on verses with a note, the hard question at the top, the panel one tap away. Beside it "Aa" (1 tap) opens one small menu: text size, verse numbers on or off, note marks on or off. The choice is remembered. A reader arriving from tonight's devotion or a reading plan starts in Read; one arriving from search or a verse link starts in Study.
- **Data it already has.** The same text and notes. The reading typeface the first wave added.
- **Replaces or folds in.** The scattered text-size control; the "Reading / Greek" switch moves inside Study.
- **Where it lives.** Every chapter page.
- **What keeps it fast.** Read loads only the small text file. Study loads the rest when chosen.
- **Size.** M.
- **How we will know it works.** In Read, Psalm 23 is nothing but the psalm. Switching views does not move the reader's place on the page. The choice survives a reload.
- **From the research.** The ESV site's help article lists one settings menu and a "reader's mode" that hides numbers and notes; Bible Gateway's has "Page Options" toggles. Reviews of the NET Bible app complain that notes crowd the text. The lesson taken: Scripture is always set larger than the notes.

#### 17. The 66 books at a glance

- **The one job.** See the whole Bible on one screen and open any book.
- **Who it is for.** The new Christian who does not know the Bible's shape. Everyone, as the front of the Study Bible. It also answers your note that the site has no pictures.
- **On a phone.** One screen. Sixty-six bars in eight labeled groups (Law, History, Poetry and so on), each bar as long as its book. Tap a bar (1): a small card with the book's name, one sentence, and how many chapters, with "Open" (2). A switch, "Show where I have read", marks the bars from the reader's own "mark as read" taps. It is off until asked, so it never becomes a meter to fill. "As a list" turns the drawing into a plain list.
- **Data it already has.** The list of 66 books with chapter counts and kinds; a paragraph on each book in three files no page shows today; the 66 introductions; the read marks.
- **Replaces or folds in.** The plain grid of book names. The three orphaned "biblical theology" files become its one-sentence lines.
- **Where it lives.** The top of `/study/bible`. A small, still version on Home as the door into the Study Bible.
- **What keeps it fast.** It is drawn as simple shapes in the page itself, a few kilobytes, no chart library. The Home version is a fixed picture written into the page before any code runs.
- **Size.** M.
- **How we will know it works.** A stranger can find Jonah in two taps. With the drawing switched off, the page is a complete list. On a reduced-motion phone nothing animates.
- **From the research.** BibleProject's posters are described (by a reviewer, not seen) as one-page pictures of a book's structure. Stripe Press was described as treating a small shelf of books as objects. Borrowed: the idea of a shape a reader can see. Refused: anyone's drawing style, and heavy effects that slow a phone.

#### 18. A reading plan for one adult that starts today

- **The one job.** Give one person today's reading, whenever they start.
- **Who it is for.** The new Christian; any adult. Today only families and the year 2027 have a plan that knows the date.
- **On a phone.** Screen 1: five plans, each with its length in days and minutes a day. Tap one (1), tap "Start today" (2). Screen 2, every day after: **today's reading** and one button, "Read it" (1 tap from the plans page). The chapter opens in Read view. At its end: the chapter's one hard question, one line to pray, and "Done for today" (2). After a gap, two equal buttons and no count: "Pick up where I left off" and "Jump to today". Earlier days are one tap back.
- **Data it already has.** Five charts already written and already printable: the Psalms in 30 days, Matthew in a month, forty days with Mark, the New Testament in 90 days, the Bible in a year. Notes and a hard question on the chapters. The code that already starts a family plan on a date.
- **Replaces or folds in.** Three sets of reading plans in three places (family, the 2027 plan, the printable charts under the eight-week plans) come together on one page, "Bible reading plans". "Proverbs in 31 Days" is listed there too.
- **Where it lives.** `/study/bible/plans`. Linked from the Study Bible front, from `/start`, from Home's "Continue" line once a plan is started.
- **What keeps it fast.** A plan is a short list of references. Today's day is worked out on the device.
- **Size.** M.
- **How we will know it works.** Start the New Testament plan on any date: day 1 is today. Skip four days: no number of days missed appears anywhere. The print chart is one tap from the plan.
- **From the research.** The Bible Recap's start page states the minutes (about 12 to read) and tells late starters what to do. YouVersion's streaks reset to zero on a missed day; that is the thing refused.

#### 24. Follow one word through the Bible

- **The one job.** From one Greek or Hebrew word, see every place it is used.
- **Who it is for.** The serious reader and the pastor. A beginner can follow it without knowing any Greek.
- **On a phone.** In the Words tab, each word shows a short meaning and one line: "9 times in John · 116 times in the New Testament." Each number is a link. Tap one (1) and a page lists those verses with the word marked. At the top of that page: the word, how to say it, its meaning, and "Words from the same root" where there are any.
- **Data it already has.** Every word of the text tagged with its original word and grammar; the dictionary; the word lists the panel already shows (complete lists now say "53 times in 45 verses").
- **Replaces or folds in.** The word list capped at 60 verses. Nothing else.
- **Where it lives.** `/study/bible/word/<id>`, reached from the Words tab and from the search box (piece 23).
- **What keeps it fast.** The counts are worked out once when the site is built. A word's page loads one small file.
- **Size.** M.
- **How we will know it works.** From "love" in John 3:16, two taps reach every use of that word in John. No number code or grammar code is ever shown as a label.
- **From the research.** STEP Bible's user guide describes two counts beside each word that are themselves links, and "related words." Blue Letter Bible's help describes listing each original word behind an English one. Refused: number codes a reader must learn, and a word cloud ("it decorates; it does not teach").

#### 25. A second translation beside the first

- **The one job.** See where two translations differ.
- **Who it is for.** The serious reader; the skeptic who has heard "the translations all disagree."
- **On a phone.** The "Compare" tab in the verse panel shows the one verse in the second translation, named (2 taps from the chapter). Or tap "Compare" above the text (1): the second wording appears under each verse, smaller. On a wide screen it is a second column.
- **Data it already has.** None. This needs a second full text that is free to show, and it needs your choice.
- **Replaces or folds in.** The five links out to another site stay as "Other translations".
- **Where it lives.** Every chapter page.
- **What keeps it fast.** The second text is its own small file per chapter, loaded only when Compare is opened.
- **Size.** M once the text is chosen and its licence is written down.
- **How we will know it works.** John 1:18 shows both wordings with each translation named. With Compare closed, the chapter loads nothing extra.
- **From the research.** Bible Gateway's help describes a second Bible window beside the first. The researcher's advice: two or three translations chosen for contrast, never dozens, and "check the licence of any translation before adding it."
- **Waits on you.** Which translation. The October design work named the King James and the World English Bible as public-domain candidates. That has to be confirmed before anything is built.

#### 33. One book of the Bible drawn as a band

- **The one job.** See how one book is built, and open any part of it.
- **Who it is for.** The new Christian; a group leader starting a book.
- **On a phone.** At the top of a book's page: one band divided into the book's sections by chapter. Tap a section (1): its title, one sentence, and "Start reading at chapter 12" (2).
- **Data it already has.** Each of the 66 introductions has a "structure" part. It has to be turned into chapter ranges, by hand, and checked.
- **Replaces or folds in.** The outline as a text list (the list stays under the drawing).
- **Where it lives.** Each book page. The same band can print on a one-page handout per book.
- **What keeps it fast.** Simple shapes drawn in the page.
- **Size.** M (the data is the work).
- **How we will know it works.** Every book's sections cover the whole book once with no gap. A check fails the build if they do not.

#### 35. Trace the argument of a passage

- **The one job.** Watch a hard passage being read slowly, one mark at a time.
- **Who it is for.** The serious reader; a teacher.
- **On a phone.** The passage is set in short lines. Tap "Next" (1 per step): one mark appears (a repeated word underlined, a "for" joined to the claim it supports) with one sentence under it. The last step shows the whole marked passage and the doctrine it teaches.
- **Data it already has.** Verse-by-verse notes on the first passages (John 1:1 to 18 has them). The sentences beside each mark are new.
- **Where it lives.** A link on its chapter, and a short list under Study.
- **What keeps it fast.** Text and a few drawn marks. No video.
- **Size.** L. Start with three passages, not twelve.
- **How we will know it works.** It reads correctly with every mark shown at once (which is what a reduced-motion phone gets).
- **From the research.** Desiring God describes "Look at the Book" as video where the text stays on screen while the teacher marks it. The researcher's proposal is to do it in text, with no video.
- **Waits on you.** Each sentence is your reading of the passage. Nothing ships unread.

### Church history

Your brief asks for "one ordered path from the apostles to today, with sources a reader can check, a timeline to move through, and questions for each lesson." The path is built. The other three are pieces 10, 12, 13, 20, 26 and 34.

#### 10. Every history date as a year, with its source

- **The one job.** This is groundwork, not a thing a visitor taps. It makes one true list of dated events that every history tool reads.
- **Why it comes first.** Dates are held today as words ("around 35 to 108"). A line cannot be drawn from words. And two pages can disagree: the voice audit found pairs of essays that differ on four numbers.
- **What a visitor gets from it at once.** The year stepper that exists today starts showing each event's source, and a search for a year ("325") finds what happened.
- **Data it already has.** 68 dated events, 36 people, 11 councils, 10 early errors, 45 events on the "where the church was silent" timeline, 31 people in two "witnesses" lists, the Bible's own dates in the eleven-part story.
- **Size.** M. It is hand work: a start year and an end year for each entry, a mark for "about", and a source.
- **How we will know it works.** A check fails the build if any event lacks a source, if a name does not match the People list, or if one event has two different years anywhere on the site.
- **From the research.** World History Encyclopedia's search results showed two different end dates for the same book on two of its own pages. The researcher's note: "a timeline is only as good as its one source of truth."

#### 12. The timeline you can move through

- **The one job.** See twenty centuries in order and stop on any year.
- **Who it is for.** Everyone. The audit called this "the one people will remember."
- **On a phone.** One screen. A line across the top, drawn to scale from AD 30 to this year, with the seven eras as bands. Drag the line with a thumb, or tap **Earlier** and **Later** (full-size buttons). Under the line, a card for the year you stopped on: what happened, in one sentence; who was alive; the council that met; **the source**, quoted, with author, work and section; the lesson that covers it ("Read lesson 4"); and the Bible chapters to read beside it. Three switches above the line add rows: **The Bible being written**, **America**, and **Where the church failed** (the hard record). "As a list" shows every event in date order.
- **Data it already has.** Everything in piece 10, the 30 checked source cards, the 14 lessons.
- **Replaces or folds in.** The year stepper becomes its "Earlier / Later" and its list. The second timeline (`/justice/timeline`) keeps its address and opens this one with the hard-record row switched on, if you agree.
- **Where it lives.** `/theology/history#timeline`. A small slice of it sits at the top of each lesson ("you are here"). A still picture of it can sit on Home.
- **What keeps it fast.** Drawn as simple shapes in the page from one small file. No chart library and no map library. Dozens of events, not thousands. It loads only when the timeline tab is opened.
- **Size.** L. It ships in two steps: the row switches and sources on the stepper first (days), then the drawn line.
- **How we will know it works.** On a phone, a thumb can go from Pentecost to the Reformation and stop on 1517 without a mis-tap. Every event on the line opens a source. With the drawing ignored, the list tells the same story. A visitor asked afterward can say roughly how long it was from Paul to Nicaea.
- **From the research.** Ciechanowski's pages were described as teaching with a picture the reader moves, placed inside the explanation. One search result quoted an educator calling a famous all-of-history timeline "too overwhelming for use with students." So: few events, each sourced.

#### 13. Who was alive when

- **The one job.** Pick a year and see who was living.
- **Who it is for.** The student who cannot keep the centuries straight; a teacher.
- **On a phone.** A second view of the same timeline, "Lives". Type a year or tap Earlier and Later. Below: "Alive in 386", each name with dates and age that year ("about 32"), and one line on what each had done by then. Tap a name (1) to open that person. On a wide screen each life is a thin line and one upright rule marks the year.
- **Data it already has.** The 36 people with dates. By the site's own dates, six of them were alive in 386. In 325 it finds one, which shows where the list is thin.
- **Replaces or folds in.** The "who was alive" line inside the stepper.
- **Where it lives.** `/theology/history#timeline`, the "Lives" view; a link from every person and every lesson ("Who else was alive?").
- **What keeps it fast.** The same small file as the timeline.
- **Size.** M after piece 10.
- **How we will know it works.** Enter 108: Ignatius, Polycarp and Justin appear, and Polycarp's age reads "about 39". A person with an uncertain date says "about". An empty year says so plainly.

#### 20. Questions after each history lesson, and "Test what you know"

- **The one job.** Check what you just learned, and think about it.
- **Who it is for.** The student; a Sunday class and its teacher.
- **On a phone.** At the end of a lesson: four to six questions to talk over, one of them "How do we know this?" Then "Check yourself" (1 tap): three to five questions, one per screen, each answer followed by one sentence of why and a link back to the place in the lesson. No score is kept as a grade. It says "3 of 4 the first time" once, privately, and offers "Next lesson".
- **Data it already has.** The 14 lessons, their sources, and the pattern the self-checks already use. The questions themselves are new writing.
- **Replaces or folds in.** The **Theology Quiz**, which today sorts people into three section names the site retired and cannot run without the server. Its address goes to "Test what you know": one short check per history lesson, one per doctrine study, one on the story of the Bible. Until the questions are written and read, that address goes to "Which view do I lean toward?", the nearest honest thing.
- **Where it lives.** The foot of each lesson; `/tools/test-what-you-know` as the list of all of them.
- **What keeps it fast.** Questions are a small file per lesson. No server and no database.
- **Size.** M to build. The writing is the larger part.
- **How we will know it works.** It runs with the network unplugged after the lesson has loaded. No question asks only for a year. You have read every question.
- **From the research.** Christian History Institute's modules were summarised as one source, a short introduction, then questions that ask the reader to weigh the source as a historian would. World History Encyclopedia bundles a lesson with a timeline and quiz questions. Refused: "quizzes that test trivia."

#### 26. People of church history, A to Z

- **The one job.** Look up a person and see their life in order.
- **Who it is for.** The student who meets a name in a lesson.
- **On a phone.** One page with a letter bar. Tap a letter (1), tap a name (2): dates, place, one sentence on why they matter, a small timeline of their life, the lessons they appear in, and "In their own words" where a checked source is stored.
- **Data it already has.** 36 people, each with an anchor already; 31 more in the two witnesses lists; the source cards.
- **Replaces or folds in.** The People tab's long list. The two witnesses pages keep their addresses and open this page filtered, if you agree.
- **Where it lives.** `/theology/history#people`, and each name everywhere it appears.
- **Size.** M.
- **How we will know it works.** Searching "Augustine" lands on Augustine himself, not on the top of a list.
- **From the research.** New Advent's Fathers index was described as an A to Z letter bar with a breadcrumb on every page and short addresses that never change.

#### 34. The creed, line by line

- **The one job.** Tap a line of the Nicene Creed and learn why the church had to say it.
- **Who it is for.** The serious reader; a new Christian learning the creed; a class.
- **On a phone.** The creed set large. Tap a line (1): the year and council, the question that forced it in one sentence, the Scripture it rests on (opens in place), the doctrine study, and the catechism question. A switch sets the creed of 325 beside the creed of 381.
- **Data it already has.** The four creeds in full with notes; the Creed of 325 stored and checked; councils; the 62 doctrine studies.
- **Size.** L. The connecting sentences are new.
- **Waits on you.** Every connecting sentence. It touches doctrine.

### Hard questions

Your brief asks for "ask box, one best answer, see where Christians differ."

#### 4. One list of every question the site answers, and a page for each answer

- **The one job.** Make every answered question findable as a question.
- **Who it is for.** The skeptic and the new Christian, who mostly arrive from a search engine on the question itself.
- **On a phone.** Each of the 35 Honest Answers gets its own page. The page opens with the question as its title, then (once you have read them) a short answer of two or three sentences, then the full answer as written. At the foot, the same four lines every time: back to the group, the next question, read the passage, the full study. For a question faithful churches answer differently (losing salvation, Genesis 1, and the like) there is no short answer on top; the page says first "Faithful Christians differ on this" and opens the views.
- **Data it already has.** 35 Honest Answers; 112 "questions people ask" with short and full answers, nearly hidden today; **1,033 hard questions already answered inside the chapter notes**, listed nowhere; 62 doctrine studies; 9 argument cases; 31 debates; ten orphaned FAQ pages.
- **Replaces or folds in.** The one long answers page of 11,000 words becomes the index. `/theology/questions` and the ten `/faq/*` pages fold in, each after a side-by-side read. Old `#anchor` links keep working.
- **Where it lives.** `/answers/<question>`; the index at `/answers`; a new shelf, "Hard questions in the Bible, by book".
- **What keeps it fast.** Each answer is its own small page, already written into the HTML before code runs. The list of all questions is one compact file fetched only when someone types.
- **Size.** M.
- **How we will know it works.** "Why did God tell Abraham to kill Isaac" finds Genesis 22's hard question. Every answer has a working way back and a way on. No answer's "full study" link lands on a retired essay.
- **From the research.** GotQuestions says in its own blog that every title is the question in the asker's words, that most readers arrive from search, and that each answer ends with a short direct summary. Refused: unsigned answers, closing an open question in 700 words, a book-selling block under every answer.

#### 5. The ask box

- **The one job.** Type a hard question in your own words and get one best answer.
- **Who it is for.** The skeptic with one question. It is on Home because that is who you write toward.
- **On a phone.** Screen 1 (Home, `/topics` or `/answers`): one field, "Ask a hard question", with one sentence of yours beside it: "You can walk away unconvinced at any point and I will not chase you." Type. As you type, up to three matching questions appear. Tap one (1 tap after typing). Screen 2: **the one best answer**, short, then three buttons in the same order every time: **Argue it with me** (the argument case, where one exists), **See where Christians differ** (the views, opened in place), **Read the passage** (the chapter with its notes). A fourth, quieter: "The long version." If the words call for a person, not an answer ("I want to die"), the help lines come first, as they do in search today.
- **When nothing fits.** It says so: "I have not written on this yet." It offers the two nearest questions and "Send this question to James." That button opens the contact form with the question filled in. It makes no promise of a reply.
- **Data it already has.** Everything in piece 4. The search code already ranks an exact title first and already knows other words for four answers.
- **Replaces or folds in.** Four hard-question indexes become one box and one index. The find box on `/answers` becomes this box.
- **What keeps it fast.** Home loads only the empty field. The question list is fetched the first time the field is touched. Nothing is sent anywhere while a person types.
- **Size.** M after piece 4.
- **How we will know it works.** Ten real questions typed the way a stranger would type them each return a fitting answer first, or say plainly that there is none. No answer is written by a machine. A message sent from the box reaches you (today contact messages are saved and not emailed; see the decisions).
- **From the research.** A review said GotQuestions' search returns questions to choose between. Reasonable Faith's page on writing a question asks readers to check the archive first and says not every question is answered. Bible Odyssey's "Ask a Scholar" was singled out by a reviewer. Refused: a chat box that writes answers, and a promise to answer everyone.

#### 31. "See where Christians differ", opened in place; the argument drawn on one screen

- **The one job.** Show the views side by side without sending the reader away. And show the shape of an argument before walking it.
- **Who it is for.** The skeptic; the Christian from "the other side" of a question.
- **On a phone.** From an answer, tap "See where Christians differ" (1): a sheet with each position in one line, who has held it, and the passage each leans on. Tap a position for its paragraph. At the top, one of three plain labels: "All Christians confess this", "Faithful churches differ", "An open question". In Test the Case, each case opens with a one-screen outline: the steps, the objection at each, and "what this does not settle". Tap a step to start there.
- **Data it already has.** 31 debates, each position in one line and in brief; the "first-order, second-order, open" page that explains the three labels; 9 cases of five moves each; the hand-made matches between answers and debates.
- **Replaces or folds in.** The page "How to Use This Section" becomes the short panel that explains the three labels.
- **Where it lives.** A sheet on answers, doctrine studies and chapter hard questions. The full page stays at `/theology/compare`.
- **Size.** M.
- **How we will know it works.** A reader cannot tell from the one-line positions alone which one you hold. No near-miss match is shown (the Trinity debate is not offered under "How can God be three and one?", as the first wave already decided).
- **From the research.** Bible Odyssey sets out the range of readings; the researcher's advice is to borrow the fairness and refuse the neutrality. Reasonable Faith's short videos, one per argument, suggested "one argument, one short visual summary."

### Family

Your brief asks for "tonight in three taps, catechism aloud, memory verses, a week at a glance."

#### 8. Tonight in three taps, finished

- **The one job.** Get a tired parent from the home page to a devotion at the table.
- **Who it is for.** A parent at the table tonight.
- **On a phone.** Home, tap "Tonight" (1). First screen: tonight's title, the verse set large, and two buttons: **Start at the table** (about ten minutes) and **Short night** (about five: read, ask, pray). Tap one (2). Or, for a different night: **who is at the table** (little ones, older, mixed), **how long**, **what is going on** (3 taps), then Start. The device remembers the first two, so the next night is one tap. With "little ones" chosen, the first screen at the table is the thing to do or talk about, so a five-year-old is in before the reading starts.
- **Data it already has.** The chooser, table mode's six screens, 72 devotions, the three short nights, Listen, "We did this tonight".
- **Repairs in this unit.** "72 of 72 · Foundations · Week 47 of the year" reads as two counters; it becomes tonight's date. "Send to my phone" is no longer offered on a phone. The family page, fifteen screens long on a phone, is cut to what tonight needs and a short list of doors.
- **Replaces or folds in.** The old Family Devotion Builder (`/tools/family-devotions`), which reads the King James to three-year-olds. Its ages 3 to 6 material is the only writing for little ones on the site, so it is set aside for you to read, not thrown away.
- **Size.** S.
- **How we will know it works.** Three taps from Home to the first screen at the table, counted on a phone. The second night of a week offers something new. No number on the page counts nights done or missed.
- **From the research.** The Good Book Company's Table Talk is described as about five minutes at a meal, opening with a question or activity before the reading.

#### 7. The catechism said aloud

- **The one job.** Help a family learn one question and answer by heart, out loud.
- **Who it is for.** Parents and children; a new Christian learning alone.
- **On a phone.** On a question's page, tap **Practise aloud** (1). The question fills the screen. The family says the answer. Tap **Show the answer** (2). Then one of two full-width buttons (3): **We know it** or **Again next week**. A switch at the top, **Grown-ups · Little ones**, shows the long answer or the short one, and the choice travels in the link, so a parent can text the child's version. **Listen** reads the question and answer. Under the answer, the same kit every time: the verse (opens in place), why it matters, a two-sentence prayer, and "Go deeper" to the doctrine study. A line at the top: "Question 14 of 76".
- **Data it already has.** 76 questions with an adult answer, a child's answer, a verse, a commentary and a prayer. The family's own place, kept on the device. A Listen button.
- **Replaces or folds in.** Nothing. It finishes the catechism page.
- **Where it lives.** `/family/catechism`, each question; "This week's question" on the family page and at the end of tonight's devotion.
- **What keeps it fast.** The practice screen is a small piece loaded on the first tap of "Practise aloud".
- **Size.** M.
- **How we will know it works.** Three taps per question. "Again next week" brings that question back the next week, once, without a tally. The little-ones link opens on the short answer.
- **From the research.** The New City Catechism's children's mode was seen in search results as a switch on the same address, with the answers set to music. Borrowed: one switch, same address, two depths. Refused: an app, a panel of other voices, any copied wording or melody.
- **Waits on you.** (1) Whether you will record the 76 answers yourself (about twenty minutes of recording, by the researcher's estimate). Until then Listen uses the phone's own voice. (2) The five questions asked twice (8 and 64, 11 and 56, 21 and 58, 47 and 61, 48 and 62). A family going in order meets each repeat. No wording is touched without you.

#### 15. Memory verses that come back

- **The one job.** Learn a verse by heart and keep it.
- **Who it is for.** A family, a child, an adult.
- **On a phone.** Screen 1: "Today's verses" (the ones that are due) and one button, **Practise** (1). Each verse runs four short steps, one per screen: read it, first letters only, fill the blanks, say it from memory. Then **I had it** or **Not yet** (full-width). A verse you had comes back tomorrow, then in three days, a week, a month. One you did not comes back tomorrow. To add a verse: in the Study Bible, tap a verse, tap **Learn this verse** (2). This week's family verse and this week's catechism verse are added for you. It ends with "Done for today. Next: Thursday."
- **Data it already has.** The four practice steps; the site's own Bible text for any verse; the family's weekly verse; the catechism verses.
- **Replaces or folds in.** "Memorize Scripture: 40 Key Verses", which today uses wording that reads as a copyrighted translation, names no translation, lets nobody add a verse, and never brings one back. The 40 verses stay as a starter set, redrawn from the site's own text.
- **Where it lives.** `/tools/scripture-memory` (same address); "Learn this verse" in the verse panel; one line in My Library.
- **What keeps it fast.** A verse is fetched from the same small chapter file the reader already uses.
- **Size.** M.
- **How we will know it works.** The "not checked word for word" notice is gone because every verse is drawn from the site's Bible. A verse marked "I had it" on Monday is offered again on Tuesday and not on Wednesday. No count of verses "due" nags from the home page.
- **From the research.** Truth78's memory programme was described as numbered sets of 52, one verse a week, each with a theme, tied to the weekly devotion.

#### 19. The week at a glance

- **The one job.** Show a family, and a pastor, the whole week on one page.
- **Who it is for.** The parent planning the week. The pastor who wants one sheet for the bulletin.
- **On a phone.** One screen, four rows: **At the table** (this week's devotion, and whether it is done), **Learn** (the catechism question, child's answer one tap away), **Remember** (the memory verse, "Practise"), **Read** (today's day in the family's reading plan). Each row is one tap into the thing. Two buttons at the foot: **Print this week** (one page, with a code that opens the same week) and **Add to my calendar**.
- **Data it already has.** The family year map made in the build, the catechism's weekly walk, the reading plans, the "Done this week" card the first wave built, the calendar helper, the code-on-a-card pattern from the devotion cards.
- **Replaces or folds in.** The "Done this week" card grows into this page.
- **Where it lives.** `/family/this-week`; one line on the family page and on Home after the first visit.
- **What keeps it fast.** The week's four rows are written into the page when the site is built.
- **Size.** M.
- **How we will know it works.** A printed sheet from three months ago still opens its own week. The four rows never show a count of what was missed.
- **From the research.** Truth78 shows a whole plan on one chart. The Village Church was described as using one three-part frame on every seasonal guide so a parent learns it once.

### Discipleship

Your brief asks for "a path that remembers your place."

#### 9. A road that remembers your place

- **The one job.** Tell a new or returning Christian the next step, every time they come back.
- **Who it is for.** The new Christian who does not know where to start.
- **On a phone.** `/start` shows six steps in order. The step you are on is open, with one large button: "Go on: read John 3." The steps behind you are ticked and closed. The steps ahead are named and quiet. Each step, when finished, hands you back to the road with the next one open. Home shows one line after your first visit: "Continue: step 2 of 6, learning to pray."
- **Data it already has.** The six steps and the pages they point to (a Gospel in the Study Bible, the eight-week prayer plan, finding a church, the new-Christian plan, the catechism, the New Believers study guide); the place each of those already keeps for itself.
- **Replaces or folds in.** The "Find Your Path" quiz (`/start/quiz`), which still sorts people into "Pastoral Ministry" and other retired categories. `/discipleship` and `/disciple-making`, which land on the tools page today, land here.
- **Where it lives.** `/start`; the first item under Study; Home's "New here? Start here" and its Continue line; a "What next" line at the foot of every plan, study guide and self-check.
- **What keeps it fast.** The road reads six small "where am I" notes from the device. Nothing is fetched.
- **Size.** M.
- **How we will know it works.** Finish step 1, close the phone, return a week later: step 2 is open. A reader is never offered two starting points on one screen.
- **From the research.** Practicing the Way's getting-started page gives one first step, behind a sign-up. Christianity Explored keeps a guest in the path by making the next sitting the one large button. Borrowed: one first step, one big button. Refused: the sign-up.

#### 28. A first course: one Gospel in seven sittings

- **The one job.** Give a skeptic or new Christian a short course with a visible end.
- **Who it is for.** The person who has read one answer and wants to see for themselves. A pastor who wants something to run with seekers.
- **On a phone.** One page lists seven sittings. Tap the first (1): a passage to read (opens in Read view), one hard question from that chapter's notes, two questions to talk over. "3 of 7" at the top. At the end, one large button: the next sitting. A leader's version adds timings and prints.
- **Data it already has.** Notes and a hard question on every chapter of Mark and of John, and verse-by-verse notes on both.
- **Where it lives.** `/study/courses/<name>`; step 1 of `/start`; the foot of each Honest Answer ("Read it for yourself").
- **Size.** M.
- **How we will know it works.** A reader can stop at any sitting and nothing chases them. No sitting presses for a decision.
- **Waits on you.** Mark or John. `/start` says John; your own eight-week plan for a new Christian reads Mark. And the two talk-it-over questions per sitting are new writing for you to read.
- **From the research.** Christianity Explored's course was described as seven conversations through Mark.

#### 29. A course that starts on a date and is shared by a link

- **The one job.** Let a group all see the same "this week" without anyone signing up.
- **Who it is for.** A small group, a family, a class.
- **On a phone.** On an eight-week plan, a study guide or the history course, tap **Start on a date** (1), pick a Sunday (2). The whole path appears with a date beside each week. **Share** (3) gives a link that carries only the start date. Anyone who opens it sees the same week marked "this week". After a gap, two equal buttons: "Pick up at week 3" and "Join this week at week 5".
- **Data it already has.** 29 plans, 68 study guides, 14 lessons, the calendar helper.
- **Size.** M.
- **How we will know it works.** Two phones with the same link show the same week. The link holds no name and nothing about who opened it.
- **From the research.** YouVersion's plans can be done with friends, inside accounts. Borrowed: doing a plan together. Refused: the accounts, the feed.

#### 30. A weekly rhythm that ends on one printed page

- **The one job.** Help a person set a small weekly rhythm of prayer and rest, and put it on the fridge.
- **On a phone.** Pick from a short list of practices by tapping (never dragging), place each in morning, evening, weekly or yearly, tap **Print** for one page.
- **Data it already has.** The rule-of-life builder; the rule the Whole-Life Self-Check suggests; the one-page print sheet.
- **Replaces or folds in.** Two rules of life kept in two places become one. The Whole-Life results hand their suggestion to the builder.
- **Size.** S.
- **How we will know it works.** A person has one rule in one place, and My Library shows it once.
- **From the research.** Practicing the Way's builder was described as drag-and-drop behind a login; a reviewer warned against treating it as a scorecard.

### Share

#### 16. Share cards for verses and quotations

- **The one job.** Turn a verse or a line of yours into a picture someone can post or text.
- **Who it is for.** Readers who share; you, for Facebook.
- **On a phone.** In the verse panel or on a quotation, tap **Make a card** (1). A preview appears: cream ground, the line in the serif face, a thin mustard rule, the reference and "Berean Standard Bible" (or the essay's title). Two shapes: square and tall. Tap **Share** (2) for the phone's own share sheet, or **Save picture**.
- **Data it already has.** The Bible text; about 400 quotations (to be rebuilt from essays that are public, since most came from essays now retired); copy and share as text.
- **Replaces or folds in.** Nothing. The site has no picture-making code today.
- **Where it lives.** The verse panel, the quotations page, the end of an essay, a catechism answer.
- **What keeps it fast.** The picture is drawn on the phone itself, by a small piece loaded only when "Make a card" is tapped. Nothing is uploaded.
- **Size.** M.
- **How we will know it works.** A card made on a phone is sharp when posted. A long verse shrinks to fit and never cuts off. A quotation from a retired essay cannot be made into a card. The translation is always named on the card.
- **From the research.** YouVersion's help describes a ready-made verse image to download and share.
- **Waits on you.** May cards carry your name and the site's address, and in what words.

### Finding things, and the tools themselves

#### 6. One tools page from one list; the doubles folded

- **The one job.** Show everything a person can use, once, under one name each.
- **On a phone.** About four screens, four groups a person would name: **Study** (6), **Hard questions** (3), **Check yourself** (6), **Pray and practise** (7). Each tile says the job in one sentence, how long it takes, and what it keeps. A find box at the top. Family tools are listed on the family page with one line pointing there.
- **What changes underneath.** Today three lists name the same tools three ways ("A Quick Check on Eight Areas of Life" is "The Life Audit" on another page and "Life Audit" in My Library). One list feeds the tools page, My Library, search, the start road and every "what next" line.
- **The folds** (each keeps its old address working, and each waits on your yes, because tool addresses are on your never-redirect list):

| The job | Survivor | Folds into it |
|---|---|---|
| "What does the Bible say about X?" (five tools, four Bible wordings) | "What the Bible says about..." (`/wisdom`, 208 topics) | The wisdom finder's search box and saves; Bible-On; the verse finder; parenting verses |
| "Help me study this passage" | The Study Bible | Book-by-Book (20 books), How to Study a Book (12), the Passage tool |
| "Check my whole life" | Whole-Life Self-Check | The eight-area quick check, with its 55 next-step links |
| "A devotion for tonight" | The chooser on the family page | The Devotion Builder |
| "What does this word mean?" | The glossary (114 terms) | The tools glossary (100 terms, three depths kept) |
| "Where do I start?" | `/start` | The start quiz |
| "What have I saved?" | My Library | Saved Items |
| "All the self-checks" | The tools page | `/assessments` |
| "Search the site" | Search, with a "Doctrine" filter | The doctrine search |

- **Also in this unit.** The worn-out pastor who follows the old burnout link lands on the pastors' care page, not on a list of tiles. Two reading pages about politics come off the tools page if you agree (they stay reachable). The sign-up form comes off the study guide handouts.
- **Size.** M.
- **How we will know it works.** 22 tiles. A test fails if any tool has two names anywhere on the site. Every old tool address still opens something useful in one hop.

#### 11. Small repairs to tools that are kept

- **Remember the place** in the four that forget on a reload: the Parent and Teen Conversation, Which View, the fight guide, Which Lens.
- **Lead somewhere next** in the six that end with no link or one: Misused Bible Verses, Scripture Memory, Parenting Verses, Which View, the both-sides check, the parenting guide.
- **Two renames:** "What your child needs at each age" and "Work through a fight in five steps".
- **Size.** S. **How we will know:** reload each of the four mid-way and you are where you were.

#### 21. One Bible wording in every tool

- **The one job.** Every verse a tool shows comes from the site's own Bible, named.
- **Why.** The tools mix the King James, wording that reads as a copyrighted translation, the site's own paraphrase, and a text fetched from another site. Six tools print "The verse text here has not been checked word for word."
- **On a phone.** Nothing new to tap. Each verse in a tool becomes a live reference that opens in place, and the notice disappears.
- **Size.** M. **How we will know:** a check fails the build if a tool holds verse text that is not drawn from the site's Bible. The notice appears on no page.
- **Waits on you.** Confirm that everything moves to the Berean Standard Bible.

#### 22. My Library holds everything, with a file to carry it

- **The one job.** One place for what you saved, started and wrote, and a way to take it to another phone.
- **On a phone.** My Library gains the four tools it cannot see today (a half-done Whole-Life check, the old Bible notes, a devotion series, Test the Case progress), the new marks, the road, and the plans. One button: **Save everything to a file.** On the other device: **Open my file.**
- **Size.** S. **How we will know:** move a library from one browser to another and everything is there. Nothing about a care page for a hard season is listed unless the reader chose to keep it.

#### 23. One search box that asks what you meant; results by kind

- **The one job.** Find the right thing whatever a person types.
- **On a phone.** Type "love" in the one box. It offers, in this order: the passage (if it reads as one), **pages on this site named for it**, the questions the site answers about it, the English word in the Bible, and the Greek and Hebrew words behind it. Results are grouped by kind with a count on each group, capped, so nobody scrolls forty verses to find your page. "Col 3:19; 3:21" opens both verses.
- **Data it already has.** The search index (722 entries), the Bible word index, the reference reader that already understands "jn 3 16".
- **Fixes named by the first wave's reviewers.** For one word such as "resurrection", forty Bible verses come before the site's own pages. "church history sources" finds nothing.
- **Size.** M. **How we will know:** ten plain searches ("resurrection", "catechism", "Augustine", "lonely", "timeline") each put the right page first.
- **From the research.** STEP Bible's guide describes one box that offers the matching Greek or Hebrew word; Blue Letter Bible's help describes results in tabs by kind. Reasonable Faith's own search returned 468 flat results for one term, the thing to avoid.

#### 27. Names and church words that open in place

- **The one job.** Tap a name or a hard word where you meet it and get two sentences.
- **On a phone.** In a chapter note, a lesson or a doctrine study, a person, council, place or church word is marked once per section. Tap it (1): a small sheet with a two-sentence entry and "Read more".
- **Data it already has.** 114 glossary terms, 36 people, 11 councils, 10 early errors, the sheet that already opens a verse, the careful name-matching rules the history unit wrote (no bare "Gregory" or "John").
- **Size.** M. **How we will know:** "Augustine" in a sentence about the year 597 does not open Augustine of Hippo. No word is linked more than once in a section.
- **From the research.** A library review said nearly everything on Bible Odyssey is cross-linked and that passages open in popup boxes.

#### 32. The paper to match

- **The one job.** Put the page a person wants on the page where they want it.
- **What gets made.** The catechism as cards and as a booklet. The family year on one chart. Each family reading plan as a chart. A one-page handout for each history lesson with its source and questions. Cards for the memory verses. One "Print the whole kit" file per care page.
- **On a phone.** One shared "Print this" block on every page that has paper: both paper sizes, the file size, no sign-up, one tap.
- **Size.** M. **How we will know:** a check fails the build when a file is made and listed nowhere. Every printable says "Free to print and hand out" only once you have given that sentence.
- **Waits on you.** You see one sample of the catechism booklet and cards before they ship, since they print doctrine wording exactly as it stands.

---

## 6. What the best sites have that we lack, and that fits

Every row is from the research files. Remember that those are search-result findings, not pages seen.

| What the research found | Where | In this plan as |
|---|---|---|
| One button per verse, the same fixed tabs every time, previous and next inside | Blue Letter Bible (help page, 2025 blog post) | Piece 2 |
| Cross-references with the verse printed beneath | Bible Hub (verse page snippets) | Piece 2 |
| Word counts that are links | STEP Bible (user guide) | Piece 24 |
| One search box that offers the original word | STEP Bible; Blue Letter Bible | Piece 23 |
| One settings menu; a reader's mode | ESV.org and Bible Gateway (help articles) | Piece 14 |
| A second translation beside the first | Bible Gateway (help) | Piece 25 |
| Highlights and notes on the verse | YouVersion, ESV.org, Bible Gateway (in accounts) | Piece 3, on the device |
| A ready-made verse image to share | YouVersion (help) | Piece 16 |
| A plan that states its minutes and forgives a gap | The Bible Recap (start page) | Piece 18 |
| A shape for each book | BibleProject (posters, by a reviewer's account) | Pieces 17 and 33 |
| Everything filed by Scripture and by topic | The Gospel Coalition, Desiring God, Ligonier | Piece 1 |
| The text marked up in front of you | Desiring God ("Look at the Book") | Piece 35, in text |
| One source per lesson, with questions that weigh it | Christian History Institute | Pieces 12 and 20 |
| A timeline as a view of the same dated entries as the articles | World History Encyclopedia | Pieces 10, 12, 13 |
| A to Z people with stable addresses | New Advent | Piece 26 |
| The title is the question; a short answer first | GotQuestions (own blog) | Piece 4 |
| Check the archive before you ask | Reasonable Faith | Piece 5 |
| A short course through one Gospel with a visible end | Christianity Explored | Piece 28 |
| A child's answer and an adult's on one address | New City Catechism | Piece 7 |
| Five honest minutes; open with the hook | The Good Book Company | Piece 8 |
| The whole plan on one chart | Truth78 | Pieces 19 and 32 |
| One first step; a rhythm that ends as a plan in hand | Practicing the Way | Pieces 9 and 30 |
| Names and passages that open in place | Bible Odyssey (library review) | Piece 27 |
| A picture the reader moves, inside the explanation; few and finished | Ciechanowski | Pieces 12, 13, 17 |

Two smaller things from the research cost almost nothing and ride along with other units: **the minutes stated** on every chapter, lesson and plan (The Bible Recap, Aeon), and **"Cite this page"** under each lesson and answer (World History Encyclopedia).

---

## 7. What is cut, and what waits

**Cut as toys or as harm.** Each was proposed somewhere in the inputs.

| Cut | Why |
|---|---|
| Streaks, badges, points, a "days behind" count | They turn Scripture into a score. One old page still showed "0 DAY STREAK"; it is gone. |
| A Bible that fills in as you read, by default | A meter to protect. The 66-books view shows what you read only if you ask. |
| A word cloud | The research's own verdict: it decorates and does not teach. |
| A tilting 3D book or shelf | Heavy on a phone, and teaches nothing. The 66 books are drawn flat. |
| A chat box that writes answers | No machine-written answers. The ask box returns only what is written. |
| A verse of the day | Tonight's devotion does that job better for these readers. |
| Drag-and-drop as the only way to do anything | Taps and a list work for every thumb and every screen reader. |
| A workspace of many panels | One text and one panel. Two columns on a wide screen. |
| Public notes, friends, a feed, comments | No accounts and nothing to moderate. |
| A quote-of-the-day feed; "on this day" | Only if every entry has a checked source. The list is too thin today. It can return later as one dated line. |
| Dozens of translations; a catalogue of plans by many hands | Judgment over volume. Two translations, five plans. |
| The old Theology Quiz as it stands | It measures taste, not knowledge, and sorts into names the site retired. |

**Waiting, not cut.**

| Waits | On what |
|---|---|
| Maps | Your yes. The site holds no place data at all. If yes: three or four simple line maps drawn once in the site's own hand, not a map tool. |
| Listening to a Bible chapter in a recorded voice | A recording with a licence. Until then the phone's own voice reads. |
| "A reader asks": your answers to real questions, in public | Your yes, and real questions. It cannot be faked. |
| Keeping a book on the device for reading with no signal | The October plan chose not to build offline reading. Revisit after Wave B. |
| A page for every verse | Not built. A verse is a state of its chapter with a link of its own. Thousands of thin pages made for search engines are what the research said to refuse. |
| A monthly theme on Home | An editor's choice, not a tool. It belongs to the map and design plans. |
| Practice pages ("who has done this before us") | New writing in your naming. It belongs to the writing plan. |
| Leader's sheet printed from a chapter | Folded into piece 32 once Read and Study are in. |

**Writing, not building** (handed to the writing plan): the 36 stock prayers in "Prayers for When You Have No Words", to be replaced by psalms in the site's Bible, public-domain prayers of the church each with its source, and a few of your own; the short "what you just read" card after each chapter; a line for ages 3 to 6 on each devotion; the short answers on top of the Honest Answers.

---

## 8. What only you can decide

Nothing else waits on you. Each line says what happens if you say nothing.

| # | The decision | If you say nothing |
|---|---|---|
| 1 | The nine folds in piece 6, a yes or no on each | The tools page is rebuilt from one list with one name each, and the doubles stay as separate tiles |
| 2 | One Bible wording for every tool (the Berean Standard Bible) | Tools are moved to it, since the Study Bible and family pages already use it; the King James builder is the one left alone |
| 3 | A second translation, and which | The Compare tab stays greyed |
| 4 | May share cards carry your name and the site address | Cards are built and held back from the public pages |
| 5 | May the site carry drawings (the timeline, the 66 books) | Your word on the first preview asked for visuals, so they are built and shown to you on a preview first |
| 6 | Should the "where the church was silent" timeline and the two witnesses lists show inside the main timeline and People | Their addresses stay as they are and each links to the other |
| 7 | Mark or John as the first Gospel | The road keeps John, and the seven-sitting course waits |
| 8 | Will you record the 76 catechism answers | The phone's own voice reads them |
| 9 | The five doubled catechism questions | Families keep meeting each repeat |
| 10 | The Theology Quiz: replace with "Test what you know" (new questions for you to read) | Its address goes to "Which view do I lean toward?" |
| 11 | Should a question sent from the ask box be emailed to you | It is saved to the admin inbox, as contact messages are today, and the box says "saved for James to read" |
| 12 | May a short answer sit on top of each Honest Answer | Answers get their own pages with no short answer |
| 13 | The ages 3 to 6 devotions in the old builder: read them and say if they move into the family library | They are kept off the site, not deleted |
| 14 | Maps, yes or no | No maps |
| 15 | The six-layer studies name scholars and commentaries. Keep each only after it is checked, or drop that layer | The layer is dropped and the rest moves beside the chapters |
| 16 | The sentence that lets a church print and hand out the guides | No reuse line is printed |

---

## 9. The build order

Four waves. About ten units each. **Every unit owns its own files**, listed in the builders' section, so ten can be built at once without colliding. Shared files (the route table, the stylesheet, the menus, the sitemap) are touched only by the person who joins the wave together, from a short list each unit hands in.

Each wave ends the way the brief requires: independent reviewers, every check green, a preview link, a half-page of what changed, and the short list of decisions for you.

### Wave A: join the library, and the first things a visitor feels (11 units)

| Unit | Piece | Size |
|---|---|---|
| A1 | 1. "Go deeper" and the shared index | M |
| A2 | 2. The verse panel, finished | M |
| A3 | 3. Highlights and notes | M |
| A4 | 4. One question list; a page per answer | M |
| A5 | 5. The ask box | M |
| A6 | 6. One tools page from one list; folds you have approved | M |
| A7 | 7. The catechism said aloud | M |
| A8 | 8. Tonight, finished | S |
| A9 | 9. A road that remembers your place | M |
| A10 | 10. History dates as years, with sources | M |
| A11 | 11. Small repairs | S |

After Wave A, three of the four pieces people will remember are in a visitor's hands (the verse, the question box, tonight), and the fourth has its groundwork.

### Wave B: the timeline, and the daily habits (11 units)

| Unit | Piece | Size |
|---|---|---|
| B1 | 12. The timeline you can move through | L |
| B2 | 13. Who was alive when | M |
| B3 | 14. Read and Study | M |
| B4 | 15. Memory verses that come back | M |
| B5 | 16. Share cards | M |
| B6 | 17. The 66 books at a glance | M |
| B7 | 18. A reading plan that starts today | M |
| B8 | 19. The week at a glance | M |
| B9 | 20. Lesson questions and "Test what you know" | M |
| B10 | 21. One Bible wording in every tool | M |
| B11 | 22. My Library holds everything | S |

### Wave C: depth for the serious reader, and the group (10 units)

| Unit | Piece | Size |
|---|---|---|
| C1 | 23. One search box; results by kind | M |
| C2 | 24. Follow one word | M |
| C3 | 25. A second translation (only if chosen) | M |
| C4 | 26. People, A to Z | M |
| C5 | 27. Names and words that open in place | M |
| C6 | 28. One Gospel in seven sittings | M |
| C7 | 29. A course on a date, shared by a link | M |
| C8 | 30. A weekly rhythm on one page | S |
| C9 | 31. Where Christians differ, in place; the argument on one screen | M |
| C10 | 32. The paper to match | M |

### Wave D: three deep pieces, each waiting on your words (3 units)

| Unit | Piece | Size |
|---|---|---|
| D1 | 33. One book drawn as a band | M |
| D2 | 34. The creed, line by line | L |
| D3 | 35. Trace the argument (three passages first) | L |

Wave D is short on purpose. Each piece is slow, each needs your sentences, and the rule is three finished before a fourth.

---

## For the builders

Everything above is bound by `CLAUDE.md`. The points that bite on this plan:

- **No API work is needed for 34 of the 35 units.** Every tool here is static JSON in `client/public/*` plus state on the device. The one exception is A5 if James says yes to emailing a question (decision 11): that is a change to the contact procedure and must land in **both** `server/` and `api/index.ts`, with `server/api-parity.test.ts` green. Until then A5 posts through the existing contact procedure unchanged.
- **State** goes through `client/src/lib/storage.ts` (`readStoredJSON` / `writeStoredJSON` with a shape guard, the house save-failure sentence). New keys use the `livewell-` prefix. Four old tools use `lw-`; B11 migrates them once and reads both.
- **Copy** goes through `lib/clipboard.ts`. **Loading** goes through `lib/fetch-json.ts` and `components/LoadFailed`. **Markdown** through `components/Markdown.tsx`.
- **No hex in components.** New tints are tokens at `:root` in `client/src/index.css`, added by the integrator. `scripts/validate-design.mjs` must not rise above its baseline.
- **New pages declare `<SEOMeta title="…" description="…">` as string literals.** New routes follow the route checklist: `App.tsx`, `scripts/generate-sitemap.mjs`, `scripts/prerender-heads.mjs`, `client/public/llms.txt`.
- **Redirects:** one permanent hop in `vercel.json`, a `redirectTo` stub in `App.tsx`, an entry in `FOLDED` in `client/src/lib/site-structure.test.ts`, every in-app link re-pointed. Tool addresses and the never-redirect list (`/theology/search`, `/justice/timeline`, both witnesses addresses, `/theology/creeds`) are first removed from `KEPT`, which is why each needs James.
- **Essay links** go through `isPublicEssay` / `isPublicEssayHref`. `validate-links.mjs` fails otherwise.
- **Crisis care:** the ask box and search show the help lines first when the words call for a person, using the logic already in `Search.tsx` and `Help.tsx`. High-sensitivity care pages are never listed in My Library by default.

### B.1 The speed contract

Measured on `scripts/serve-like-vercel.mjs`, never `serve -s` (the first wave's reviewers were misled by the latter).

| Rule | Detail |
|---|---|
| Home's entry chunk does not grow | `App.tsx` imports `Home` eagerly, so anything Home imports ships to every route. The ask box (A5) on Home is an empty field in the static hero; its logic and `questions/index.json` are a lazy chunk fetched on first focus. The 66-books picture on Home (B6) is static SVG written by `homeHeroHtml()` in `prerender-heads.mjs`, not a component import. Budget: entry chunk within 1 KB gzip of 74,001 bytes per wave. |
| A chapter stays light | First load is the text shard only (`client/public/bible/text/<book>/<n>.json`, about 4.4 KB for John 3). `ch/<book>/<n>.json` (37.8 KB for John 3, holds `w` words and `x` cross-references) loads only when Words opens. Cross-references get their own file (A2). The second translation is its own file (C3). |
| Every tool is its own lazy route chunk | As `StudyBibleSearch` and `BibleSearchResults` are today (3.0 KB and 2.1 KB gzip). |
| No chart, map, canvas-drawing or animation library | The Line, Lives, the canon bars and the book band are hand-written inline SVG, colours from tokens. Share cards use the browser's own canvas, in a chunk imported on the tap. `vaul` and `qrcode-generator` are already installed; nothing else is added without the integrator's yes. |
| Generated data is sharded | Per book or per chapter, with a `--check` drift step in the content-gates step of `.github/workflows/ci.yml`, the same pattern as `build-bible-search.mjs --check`. |
| The floors | Lighthouse mobile, median of three (`scripts/lighthouse-median.mjs`): `/` 100, `/study/bible/john/3` at least 90 (measured 95), an essay at least 80 (measured 82); CLS at most 0.1 on every page touched. |
| Prerender hold | A page that loads top content after its heading adds `<span hidden data-lw-loading />` so `lib/prerender-hold.ts` keeps the prerendered text until the page is whole. |
| Reduced motion | Every drawn piece honours `prefers-reduced-motion` and has an "As a list" equivalent in the DOM (not hidden from assistive technology). |

### B.2 Shared data shapes

Names marked **(proposed)** do not exist yet. Shapes agree with section 5 of `BENCHMARK.md`.

**Tags and the cross-index (A1).** Extend `scripts/build-catalogue.mjs`; today it carries Scripture references for four kinds only.

```ts
type Passage = { book: string; chapter: number; verses?: [number, number] };
type Tags = {
  passages: Passage[];
  doctrines: string[];        // the 62 ids in client/public/bible/doctrines.json
  topic?: string;             // slug from client/public/topics/
  years?: [number, number];   // history only
  people?: string[];          // ids from the People list
};
type IndexRow = { kind: Kind; title: string; href: string; passage?: Passage };
type Kind = 'question' | 'doctrine' | 'history' | 'background' | 'guide'
          | 'devotion' | 'catechism' | 'care' | 'plan' | 'essay' | 'tool';
```

Passage fields that exist under other names: devotions `passage`, catechism `scripture`, care pages `scripture.passages`, background guides `keyTexts`, doctrine studies `keyTexts`, study guides. To add by hand and then gate: `client/src/data/answers.ts` (35), `client/public/history/essays-index.json` (22), `client/public/creeds/` (14), how-tos. Outputs **(proposed)**: `client/public/index/by-chapter/<book>.json`, `client/public/index/by-topic.json`. Component **(proposed)**: `client/src/components/GoFurther.tsx`, fixed kind order, lazy on intersection. Test counts to hit: 58 chapters cited by a devotion, 50 by a catechism question, 131 by a care page; 719 chapters bare today.

**Cross-references per chapter (A2) (proposed).** `client/public/bible/xref/<book>/<n>.json`, written by `scripts/build-bible.mjs` or a sibling builder from the `x` arrays already in `ch/` (up to 12 a verse; mean 11 in John 3):

```ts
type Xref = { [verse: number]: { ref: string; first: string }[] };  // ref "Rom.5.8"; first = the verse text, trimmed
```

**Reader's marks (A3).**

```ts
// key: livewell-marks-v1
type Mark = { ref: string; color?: 'a' | 'b' | 'c'; note?: string; updated: string };  // ref "jhn.3.16"; colors are token names
```

Carry over `lw-deep-bible` notes on first read. Export and import as one JSON file (shared with B11's `lib/backup.ts`).

**Questions (A4) (proposed).** `client/public/questions/index.json`, built by `scripts/build-questions.mjs` from `answers.ts`, `client/public/theology/questions.json` (112), the `hard` field of the chapter notes (1,033, via `hardQuestions()` in `lib/bible-notes.ts`), the doctrine studies, `argumentCases.ts` and the 31 debates:

```ts
type Question = {
  id: string;
  question: string;            // the asker's words
  aliases?: string[];
  short?: string;              // only where James has read it; never on a second-order question
  order?: 'first' | 'second' | 'open';
  source: 'answer' | 'chapter' | 'doctrine' | 'case' | 'debate';
  href: string;
  passages: Passage[];
  doctrines: string[];
  next?: { argue?: string; views?: string; passage?: string; study?: string };
};
```

`validate-answers.mjs` gains: every `next` target resolves; no `short` where `order` is `second` or `open`. Route `/answers/:slug`; `/answers#slug` anchors handled client-side; `FAQPage` JSON-LD per answer through `SEOMeta`.

**History events (A10) (proposed).** `client/public/history/events.json`:

```ts
type HistoryEvent = {
  id: string;                  // frozen once issued
  start: number; end?: number; // years; negative for BC
  certainty: 'attested' | 'about' | 'range' | 'tradition';
  title: string; sentence: string;
  people?: string[]; place?: string;
  lesson?: string;             // course lesson slug
  passages?: Passage[];
  source: string;              // id of a card in client/public/history/sources/, or a named published source
  layer: 'church' | 'bible' | 'america' | 'record';
};
type Person = { id: string; name: string; born?: number; died?: number; certainty: ...; place: string; role: string; summary: string };
```

Sources: `client/public/theology/church-history-timeline.json` (7 eras, 68 events; dates as strings such as "around 30 to 100"), `church-history-figures.json` (36; `dates` as strings), `church-history-councils.json` (11), `church-history-heresies.json` (10), `client/public/justice/timeline.json` (45, as `layer: 'record'`), the two witnesses files (31), `client/public/bible/story.json` (dates per act, as `layer: 'bible'`). A parser for the date strings lives in `client/src/lib/historyEvents.ts` **(proposed)**; ambiguous strings are resolved by hand in the data, not by the parser. Validator **(proposed)** `scripts/validate-history-events.mjs` in the content-gates step: every event has a source; every person and lesson id resolves; one year per id site-wide; no date after today.

**Review ladder (B4, A7) (proposed).** `client/src/lib/review.ts`: pure functions, real-date tests.

```ts
// key: livewell-review-v1
type ReviewItem = { id: string; kind: 'verse' | 'catechism'; ref: string; step: 0|1|2|3|4; due: string };
// intervals in days: [1, 3, 7, 30]; "Not yet" resets to step 0; never surfaces a count outside its own page
```

**Tools registry (A6) (proposed).** `client/src/lib/toolsRegistry.ts`, the one list read by `ToolsHub.tsx`, `Assessments.tsx`, `lib/myProgress.ts`, `Search.tsx`, `Start.tsx` and self-check results:

```ts
type Tool = {
  id: string; href: string; name: string; job: string;   // one sentence, a visitor's words
  group: 'study' | 'questions' | 'check' | 'practise' | 'family';
  minutes?: number; keeps?: string; storageKeys?: string[];
  next: { label: string; href: string }[];               // at least one
  action: 'Start' | 'Read';
};
```

A test fails if a tool name string appears in a page file that does not come from the registry, and if any tool has an empty `next`.

**The road (A9).** `client/src/lib/startRoad.json` gains per step `{ id, doneWhen: { key: string; test: 'exists' | 'finished' } }`; position in `livewell-progress-start-road`. The step's "done" is read from the storage key the target page already writes; where a target writes none (finding a church), the reader ticks it.

**Dated runs (C7) (proposed).** `client/src/lib/runs.ts`: `?start=2027-01-10&cadence=7` on `/plans/:slug`, `/studyguides/:slug`, the history course, `/study/courses/:slug`. The link carries nothing else.

**Week map (B8) (proposed).** `scripts/build-week-map.mjs` reads `familyYear.generated.ts`, the catechism walk, `family-reading-plans.json` and `whole-story-2027.json`; writes one small file per week under `client/public/family/weeks/`. `client/src/lib/week.ts` (`weekOf`, `dayOf`). Never imported by Home.

**Second translation (C3) (proposed).** `client/public/bible/text2/<book>/<n>.json`, same shape as `text/`; a `LICENCE.md` beside the builder naming the source and its terms. Not started until decision 3.

**Word index (C2) (proposed).** `client/public/bible/words/<id>.json` `{ id, lemma, translit, gloss, counts: { [book]: number }, total, verses: string[], related: string[] }`, built from `ch/`, `lex/`, `morph/`. No dictionary text is copied beyond what `lex/` already holds.

**Book structure (D1) (proposed).** `client/public/bible/book-structure.json` `{ book, sections: [{ title, from, to, sentence }] }`; validator: sections cover the book once, no gaps, no overlaps.

### B.3 Units and the files each owns

Shared files are **not** in any unit's list: `client/src/App.tsx`, `client/src/index.css`, `client/src/lib/siteNav.ts`, `vercel.json`, `scripts/generate-sitemap.mjs`, `scripts/prerender-heads.mjs`, `client/public/llms.txt`, `.github/workflows/ci.yml`, `client/src/lib/site-structure.test.ts`, `client/src/pages/Home.tsx`, `client/src/pages/StudyBible.tsx`. Each unit hands the integrator a list of lines to add (routes, tokens, CI commands, mounts). Where two units meet on a page, one owns the page and exposes a slot; the other ships a component.

**Wave A**

| Unit | Owns | Hands the integrator |
|---|---|---|
| A1 cross-index | `scripts/build-catalogue.mjs`, `scripts/build-cross-index.mjs` (new), `client/public/index/**`, `client/src/lib/crossIndex.ts`, `client/src/components/GoFurther.tsx`, passage fields added to `client/src/data/answers.ts`*, `client/public/history/essays-index.json` via `scripts/build-history-index.mjs`, `client/public/creeds/*` | CI `--check`; mount of `GoFurther` on chapter, answer, lesson, devotion, doctrine pages |
| A2 verse panel | `client/src/pages/study-bible/VersePanel.tsx` (new shell with five tab slots), `VerseNotes.tsx`, `CrossRefsTab.tsx` (new), `WordsTab.tsx` (new, lifted from `shared.tsx`), `scripts/build-bible-xref.mjs` (new), `client/public/bible/xref/**`, `client/src/components/VerseRef.tsx` ("Open in the Study Bible") | Mount in `StudyBible.tsx`; CI `--check`; `?v=&tab=` handling |
| A3 marks | `client/src/lib/marks.ts` (+ test), `client/src/pages/study-bible/MarkControls.tsx`, `client/src/components/library/MarksSection.tsx` | Slot in A2's panel foot; section mount in `MyLibrary.tsx`; three tint tokens |
| A4 questions | `scripts/build-questions.mjs`, `client/public/questions/**`, `client/src/pages/Answer.tsx` (new), `client/src/pages/Answers.tsx`, `client/src/lib/findAnswers.ts`, `scripts/validate-answers.mjs`, `client/src/pages/TheologyQuestions.tsx` (fold), the ten `pages/faq/*` (fold after side-by-side read) | Route `/answers/:slug`; sitemap, prerender body, llms; redirects for `/theology/questions`, `/faq/*` |
| A5 ask box | `client/src/components/AskBox.tsx`, `client/src/components/AskResult.tsx`, `client/src/lib/ask.ts` (+ test with the ten typed questions) | Static field in the Home hero and its lazy mount; mounts on `Topics.tsx`, `Answers.tsx`; contact prefill through session storage, never a URL |
| A6 tools registry | `client/src/lib/toolsRegistry.ts` (+ test), `client/src/pages/ToolsHub.tsx`, `client/src/pages/Assessments.tsx`, `client/src/lib/myProgress.ts`, `client/src/pages/StartHereQuiz.tsx` (fold), `client/src/pages/wisdom/*` (takes the finder's search, saves, daily entry), `client/src/pages/tools/{WisdomFinder,BibleOnTopic,VerseFinder,ParentingVerses,TheologyGlossary,SavedItems,LifeAudit}.tsx` (fold only those James approves), `client/src/components/GatedDownload.tsx` (open links) | Redirects per approved fold; `/tools/pastor-burnout` to `/help/pastors`; `/discipleship`, `/disciple-making` to `/start` |
| A7 catechism aloud | `client/src/pages/family/CatechismAloud.tsx` (new), `client/src/pages/FamilyCatechism.tsx`, `client/src/lib/familyCatechism.ts` (`?little=1`, "again next week") | None beyond one CSS block |
| A8 tonight | `client/src/pages/family/{Tonight,TonightCard,TonightChooser,TableMode}.tsx`, `client/src/lib/familyChooser.ts`, `client/src/pages/Family.tsx`, `client/src/pages/tools/FamilyDevotionBuilder.tsx` (fold on James's yes; ages 3 to 6 text exported to `content/held-for-james/`) | Redirect `/tools/family-devotions` on approval |
| A9 the road | `client/src/pages/Start.tsx`, `client/src/lib/startRoad.json`, `client/src/lib/startRoad.ts` (new, + test), `client/src/components/WhatNext.tsx` (new) | Home's Continue line (reads one key, in the existing lazy tonight chunk); `WhatNext` mounts on plans, study guides, self-check results |
| A10 history events | `client/public/history/events.json`, `client/public/history/people.json`, `scripts/build-history-events.mjs`, `scripts/validate-history-events.mjs`, `client/src/lib/historyEvents.ts` (+ test), `client/src/components/history/HistoryTimeline.tsx` (reads the new file; shows the source per event) | CI command; search index rows by year (`scripts/build-search-index.mjs` is the integrator's) |
| A11 repairs | `client/src/pages/tools/{ParentTeenConversation,ConflictGuide,WhichLens,ParentingGuide,BibleReference}.tsx`, `client/src/pages/TheologyDiagnostic.tsx`, `client/src/pages/prophetic/PropheticConsistency.tsx` | Two renamed titles flow from A6's registry |

\* `answers.ts` is edited by A1 (passages) and read by A4. A1 lands first inside the wave, or A1 keeps answer passages in a sidecar `client/src/data/answerPassages.ts` that A4's builder reads. Use the sidecar.

Order inside Wave A: A1 and A10 are data and start first. A2, A4, A6, A7, A8, A9, A11 run alongside. A3 builds against A2's slot contract and A5 against A4's `Question` shape, both given above, so neither waits.

**Wave B**

| Unit | Owns | Depends on |
|---|---|---|
| B1 the Line | `client/src/components/history/TheLine.tsx`, `client/src/lib/line.ts` (scale, label collision, + test), `client/src/components/history/EventCard.tsx`, `client/src/components/history/LessonSlice.tsx` | A10. Mounted in `TheologyHistory.tsx` and `history/HistoryEssay.tsx` by the integrator. `/justice/timeline` behaviour on decision 6 |
| B2 Lives | `client/src/components/history/Lives.tsx`, `client/src/lib/lives.ts` (+ test: 386 finds six; 108 finds three; 325 finds one) | A10 |
| B3 Read and Study | `client/src/pages/study-bible/{DepthSwitch,TextSettings,ReadView,StudyView}.tsx`, `client/src/lib/readerSettings.ts` (`livewell-reader-v1`), `client/src/components/TextSize.tsx` | A2. Integrator rewires `StudyBible.tsx` |
| B4 memory | `client/src/pages/tools/ScriptureMemory.tsx`, `client/src/lib/review.ts` (+ test), `client/src/data/memory-starter.json` (40 references only, no text), `client/src/pages/study-bible/LearnThisVerse.tsx` | A2's foot slot |
| B5 share cards | `client/src/lib/shareCard.ts` (canvas, two sizes, font-ready wait, text fit), `client/src/components/ShareCard.tsx`, `client/src/pages/tools/QuoteLibrary.tsx`, `client/src/data/social-quotes.ts` (rebuilt from public essays; each row keeps its essay slug for `isPublicEssay`) | Decision 4 for the footer line on the card |
| B6 66 books | `client/src/components/study/CanonBars.tsx`, `client/src/lib/canon.ts`, `client/public/bible/canon.json` (kind, chapters, words, one sentence; merged from `theology/bible-books.json` and the three `biblical-theology-books-*.json` files) | Integrator mounts on the Study Bible index and writes the static Home SVG |
| B7 reading plans | `client/src/pages/ReadingPlans.tsx` (new, `/study/bible/plans`), `client/src/pages/ReadingPlanDay.tsx`, `client/src/lib/readingPlan.ts` (shares `familyPlans.ts` date logic; `livewell-progress-reading-plan-v1`), `client/src/data/bible-reading-plans.json`, `client/src/pages/tools/Proverbs31.tsx` (listed here; its verse text is B10's) | B3 for Read view (falls back to today's chapter page) |
| B8 the week | `client/src/pages/family/ThisWeek.tsx`, `scripts/build-week-map.mjs`, `client/public/family/weeks/**`, `client/src/lib/week.ts` (+ real-date tests), `client/src/pages/family/DoneThisWeek.tsx`, `scripts/lib/week-printable.mjs` | B4 for the Remember row (shows the verse without "Practise" until B4 lands) |
| B9 lesson questions | `client/public/history/questions/<lesson>.json`, `scripts/validate-history-questions.mjs`, `client/src/components/history/LessonQuestions.tsx`, `client/src/components/CheckYourself.tsx`, `client/src/pages/tools/TestWhatYouKnow.tsx`, `client/src/pages/TheologyQuiz.tsx` (retire) | Writing read by James. `/tools/theology-quiz` and `/quiz` redirect per decision 10. Removes the quiz's server and database dependence; if the tRPC quiz procedures are deleted, delete them in **both** runtimes |
| B10 one wording | `scripts/validate-tool-verses.mjs` (new gate), `client/src/pages/tools/{Proverbs31,ConflictGuide,BibleReference}.tsx` verse blocks, `client/src/lib/verse-text.ts` | Coordinates file-level with A11 (earlier wave) and B7 (B7 does not touch verse blocks) |
| B11 My Library | `client/src/pages/MyLibrary.tsx`, `client/src/lib/backup.ts` (+ test), `client/src/lib/library.ts` | A3's `MarksSection`, A6's registry `storageKeys` |

**Wave C**

| Unit | Owns |
|---|---|
| C1 search | `client/src/lib/siteSearch.ts`, `client/src/pages/Search.tsx`, `client/src/pages/study-bible/GoToPassage.tsx`, `client/src/lib/scripture-ref.ts` (several passages in one string), `client/src/pages/TheologySearch.tsx` (fold on decision), `scripts/build-search-index.mjs` (source cards, years, questions as a group) |
| C2 word pages | `scripts/build-word-index.mjs`, `client/public/bible/words/**`, `client/src/pages/StudyBibleWord.tsx`, `client/src/pages/study-bible/WordsTab.tsx` (counts as links; handed over from A2) |
| C3 second translation | `scripts/build-bible-second.mjs`, `client/public/bible/text2/**`, `client/src/pages/study-bible/CompareTab.tsx`, `client/src/pages/study-bible/CompareColumn.tsx` |
| C4 people | `client/src/pages/history/People.tsx`, `client/src/components/history/PersonCard.tsx`, `client/src/lib/historyCourse.ts` (anchors already frozen there) |
| C5 names in place | `client/src/components/TermRef.tsx`, `client/src/lib/termRefs.ts` (the `SHORT_NAMES` rules reused), a remark plugin beside `MarkdownVerseRefs.tsx`, `scripts/build-terms-index.mjs`, `client/public/index/terms.json` |
| C6 Gospel course | `client/public/courses/<slug>.json`, `scripts/validate-courses.mjs`, `client/src/pages/Course.tsx`, `client/src/pages/CourseSitting.tsx` |
| C7 dated runs | `client/src/lib/runs.ts` (+ test), `client/src/components/StartOnADate.tsx`, `client/src/lib/calendar.ts` |
| C8 rhythm | `client/src/pages/tools/RuleOfLife.tsx`, `client/src/pages/life/WholeLifeAssessment.tsx` (hand-off only), `client/src/lib/ruleOfLife.ts` (one key; migrates the second rule) |
| C9 views in place | `client/src/components/ViewsSheet.tsx`, `client/src/data/answerCompanions.ts`, `client/src/pages/TheologyCompare.tsx`, `client/src/pages/tools/TestTheCase.tsx` (outline screen), `client/src/components/CaseOutline.tsx` |
| C10 paper | `scripts/lib/family-printables.mjs`, `scripts/lib/history-printables.mjs`, `scripts/lib/help-printables.mjs` (whole-kit file), `scripts/build-pdfs.mjs`, `client/src/components/PrintThis.tsx`, `scripts/validate-catalogue.mjs` (built-but-unlisted check) |

**Wave D**

| Unit | Owns |
|---|---|
| D1 book band | `client/public/bible/book-structure.json`, `scripts/validate-book-structure.mjs`, `client/src/components/study/BookBand.tsx` |
| D2 creed | `client/public/creeds/nicene-lines.json`, `client/src/pages/creeds/CreedLines.tsx`, `scripts/validate-creed-lines.mjs` (every quotation through `verify-sources.mjs`) |
| D3 trace | `client/public/bible/traces/<passage>.json`, `client/src/pages/study-bible/Trace.tsx`, `client/src/components/Stepper` reuse |

### B.4 Checks each unit must leave behind

1. `pnpm check`, the whole content-gates step, `pnpm test`, `pnpm build`, then `pnpm sitemap && pnpm prerender && pnpm audit:canonicals` when a route, title or description changed. Report what ran and what did not.
2. A unit test for every pure function (`marks`, `review`, `line`, `lives`, `week`, `runs`, `ask`, `readingPlan`, `backup`), with real dates where dates are involved.
3. A look in Chromium at 390 x 844 and 1440 x 900 on `serve-like-vercel`, with the tap count in section 5 counted and written down.
4. Tap targets 44 px or more; keyboard path; a screen-reader name on every control; an "As a list" twin for every drawing.
5. The save-failure path exercised once by hand (storage full or blocked).
6. No new string that states a fact about James. No new quotation without a stored text. No verse text typed into a component.
7. Lighthouse median on the three reference pages; the entry chunk size before and after.

### B.5 What I read, and what I did not verify

Read in full: `PROJECT-PROMPT.md`; all eight research files; all four stock-takes; `WAVE-1.md` and the unit notes `bible.md`, `family.md`, `history-answers.md`, `tech.md`, `design.md`, `home-start.md`. Read in the parts that bear on tools: `AUDIT.md` sections 7 to 10 and 13; `VISION.md` "Decisions for James", section 1.5 (what it chose not to do) and section 4 (the thirteen signature interactions); `BENCHMARK.md` sections 3 to 5 (a sibling document, read so the shapes agree). Read by headings only: `CRITIQUE.md`, `VOICE-AUDIT.md`, the unit notes `connect.md`, `truth.md`, `names-content.md`, `names-pages.md`, and the rest of `AUDIT.md` and `VISION.md`. Whoever acts on this plan should treat those as unread by this document.

Checked in the code, read-only, on branch `claude/todo-implementation-hhp4bm` at `32089d4b`: the file names in B.3 that are not marked new; that `ch/john/3.json` carries `w` and `x` (12 cross-references on John 3:16) at 37.8 KB beside a 4.4 KB text shard; that timeline and people dates are strings; that `bible-reading-plans.json` holds the plans; that `vaul` and `qrcode-generator` are installed and no canvas or image library is; that `ListenButton` uses the device's speech.

Not verified: anything in a browser; the tap counts (they are targets, to be counted when built); the sizes S, M and L (estimates from the stock-takes, not from a spike); whether each proposed fold pair is truly one job (the stock-take says each needs a side-by-side read first); every statement about another site beyond what its research file reports from search results.
