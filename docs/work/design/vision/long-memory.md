# The Long Memory

One of four competing design directions for the LiveWell redesign (step 3 of
the design program in `docs/work/NOTES.md`, "James's redesign brief"). It is a
proposal, not a decision. Anything here that would change the brand contract,
the Decision Log or a James gate is listed in 6.10 as his to decide, and none
of it goes into code before he answers.

**Starting conviction.** The church has been here before. The organizing spine
of the site is time: the long story of the church, its people, councils,
creeds and crises, with the American present read against twenty centuries.
The Bible, doctrine and today are entered through that story. This document
pushes the conviction as far as it honestly goes, answers the whole brief, and
says where the conviction stops.

**Read for this direction:** `CLAUDE.md` in full; `CRITIQUE.md` and the seven
reports in `critique/` (above all `ia.md`, `learning.md`, `brand.md`,
`visitor.md`); `research/A-SYNTHESIS.md`, `B-SYNTHESIS.md`, `C-SYNTHESIS.md`,
with `B-church-history-teaching.md` and `B-post-christian-thought.md` for
detail; `MASTER-PLAN.md` sections 0 to 3, 7.1 to 7.4, 8, 10.3 and 10.6;
`NOTES.md`; the unit files and patches for U07, U18, U19, U25 and U28; the
screenshots in `shots/current/`. Pattern numbers are the syntheses' ranked
patterns ("A 4" is pattern 4 of `A-SYNTHESIS.md`, "B 12" of `B-SYNTHESIS.md`,
"C 3" of `C-SYNTHESIS.md`). "CRITIQUE #8" is problem 8 of `CRITIQUE.md`;
"ia.md C5" is a finding in a critic's own report.

**Checked in the repo for this document**, so the direction is sized to what
exists:

- `client/public/theology/church-history-timeline.json` holds seven eras (30
  to 100, 100 to 313, 313 to 590, 590 to 1054, 1054 to 1500, 1500 to 1650,
  1650 to today) and 68 events. Every year is a string ("around 30", "312",
  "around 49 to 62"), so a drawing to scale needs the strings normalized into a
  year and a certainty. That is a parse, not new research.
- The 22 era essays in `client/public/history/essays/` each carry a
  `dateRange`. They are two series laid over each other: fourteen with fine
  ranges (`The Constantinian Turn`, AD 312-430; `The Great Councils`, AD
  325-451) and eight with broad ones (`The Apostolic and Persecuted Church`,
  AD 30-313; `The American Experiment`, AD 1800-1950; `The Attractional Era`,
  AD 1950-2010; `After Christendom`, AD 2010-present). The kickers use two
  periodizations (`Ancient`, `Modern` against `The Age of the Councils`).
- `church-history-figures.json` holds 36 people with dates as strings
  ("around 35 to 108"); `church-history-councils.json` holds 11 councils with
  a year each.
- `client/public/bible/story.json` holds the Bible's story in eleven acts,
  each with a `dates` line that already states its uncertainty ("Before
  recorded history"; "The fifteenth or the thirteenth century BC"; "About AD
  30 to 95" for the church and the Spirit).
- U25's topic data (`docs/work/patches/U25/0001`) already gives every topic
  page a `witness` (on the post-Christian page, the Letter to Diognetus,
  linked to the era essay *The Apostolic and Persecuted Church*). The witness
  is the seed of "Asked before" (4.7).
- U07 stores 22 public-domain texts byte for byte with a verifier, among them
  the Martyrdom of Polycarp, the Passion of Perpetua, the Epistle to
  Diognetus, Pliny 10.96 (inside McGiffert's note to Eusebius), Cyprian *On
  the Lapsed*, Ambrose's Letters 40, 41 and 51, Theodoret Book 5, Augustine's
  *City of God* Book 5, and Athanasius's *De Decretis*. Its survey covers 136
  planned sources (22 stored, 74 reachable, 16 reachable only in early
  spelling, 17 not reachable, 7 in copyright).
- Self-hosted fonts are Cormorant Garamond (400, 400 italic, 500, 600) and
  Inter (400, 500, 600). There is no text serif and no Inter italic.
- `components/study/` holds `Sheet`, `Stepper` and `Position`;
  `components/editorial/` holds `PageHead`, `EditorialIndex`, `CardGrid` and
  `SectionHead`. `lib/` holds `storage`, `calendar`, `familyYear` (with the
  generated year map), `myProgress`, `library`, `scripture-ref`, `siteSearch`
  and `telemetry`.
- `client/public/article-art/covenant.svg` is the seed of a house line: ink
  hairlines on cream, one mustard mark where the two rings bind.

---

## 1. The promise

**Whatever you bring, the church has been here before: LiveWell lays the
Bible, the creeds and the American present on one line of time twenty
centuries long, marks where you are standing, and lets you meet, in their own
words, the people who stood there first.**

### Why this is the right direction for James's mission

1. **The contract already asks for it, in its own words.** The voice section
   requires "the full historical arc, never starting at the proximate cause."
   The Scholarship Standard says "1517, 1648, 1789, 1965: the turns are named,
   not gestured at." The Formation Test asks whether a reader is "more rooted
   (nearer Scripture and the long memory of the church than the news cycle)."
   The final impression every piece must leave begins "Christianity is deeper
   than my politics. Older than my culture." A site whose spine is time makes
   those sentences a structure a reader can see, not a register he has to
   take on trust.

2. **James asked for it twice, and his headline is a claim about time.** On
   2026-10-14 he asked for "the best church history study available ... very
   interactive." On his home page he chose to write: "What does it look like
   to follow Jesus when the culture around you no longer shares your
   assumptions? The early church knew. So did believers in every age who
   lived without power." "Post-Christian" is a statement that something
   ended, which no one can understand without a picture of when it began.
   The learning critic said of a scaled timeline with a mark on After
   Christendom: "That one image teaches the post-Christian thesis better than
   a paragraph can" (`learning.md` M5). The critique ranks the subject's
   missing front door and history's missing shape as two of its ten problems
   (CRITIQUE #5 and #8).

3. **It holds the opening nobody holds.** Wave A's verdict: "The one opening
   nobody holds: the church's long memory set beside the verse, dated,
   attributed and verified, for a lay reader." The closest Christian app,
   Catena, never names the edition it quotes, by a reviewer's account; Sefaria
   and the Dartmouth Dante Project do the work well for other texts and
   traditions (A 4). LiveWell has the verifier (U07) that turns the
   long memory from a mood into checkable text.

4. **It meets the skeptic on ground he does not have to concede.** History is
   the one subject a skeptic will read without first deciding the faith is
   true. The visitor critic's line for the history hub is the line for the
   whole site: "Whether or not you believe it, this is the story that made the
   country you live in." The best trust moment the visitor found was in the
   history: Tacitus, "no friend of the faith." Wave B names Tom Holland's
   *Dominion* and *The Rest Is History* as evidence that narrative history
   holds a secular audience (B-SYNTHESIS 4.3). And history can teach a method
   instead of asking for trust in a credential (B 6, B tension 9): who wrote
   this, when, to whom, and who else saw it.

5. **It resolves "draw attention" against "Unhurried. Weighted. Grown-up."
   with something true.** The most arresting thing LiveWell can show is a
   proportion: the church's first three centuries without power at the left
   end of a line, the long bracket of Christendom, the American row a short
   stretch at the right end, and one mustard tick marked "You are here." It
   is a still drawing in ink on cream. It earns a second look because it is
   accurate, not because it moves. The brand critic asked for exactly this
   ("a proportional time river ... in the tradition of John B. Sparks's
   *Histomap*"), and every synthesis rules out the alternatives (the dot
   cloud, the zoomable canvas, the streak).

6. **Time organizes without asking anyone to learn a taxonomy.** Every reader
   already knows before and after. One periodization ends the three that
   disagree today (`ia.md` C5). A sequence gives every page a "next," which
   the era essays lack. Dates are the controlled vocabulary the site's labels
   have never had.

7. **It gives doctrine and Scripture their "why."** A doctrine taught as a
   finished list is a lecture; a doctrine taught as the words the church was
   forced to find, in a dated fight, with the losing side heard, is history a
   reader remembers (`learning.md` M4: the creed as the spine, each article
   with "the council or heresy that forced the words"). A verse read with its
   readers from AD 155 to now is a verse that has been tested.

### Where the conviction stops

A direction that cannot say where it ends is a fashion. This one stops in five
places, and the design is built around the stops, not over them.

- **Not every reader comes for the past.** The person in crisis needs Find
  Help, which stays outside the line, one tap from every page, crisis lines
  first. The parent at seven in the evening needs tonight's devotion, which
  runs on the second clock (the church year, 4.9), not the line. The seeker
  with a marriage in trouble gets the practical door first and the depth
  behind it, as the contract's audience standard says.
- **Time is not an argument.** "The church has been here before" can become a
  sedative (the certainty trade the Formation Standard refuses) or a
  nostalgia for Christendom. So the line draws the church's failures in the
  same ink as its councils: Callinicum and Thessalonica, the Crusades, the
  slave trade, the German Christians beside Barmen. The reckonings are hinges
  too.
- **The rhyme is not identity.** The church before Constantine had no
  Christian past to lose; America does. Every place the site sets the two
  ends of the line side by side, one sentence says where the likeness breaks.
- **The line is only as honest as the registry.** Today it holds 36 people,
  two of them women. A drawing shows its gaps more plainly than prose does.
  The design draws them on purpose ("Not yet written," B 8) and grows the
  registry toward the plan's 90 to 100.
- **Scripture is read as Scripture first.** The Bible is not reduced to a
  period of history. The chapter opens on the text; dates and witnesses wait
  in the margin and the panel.

### The metaphor, and its limit

The map in a museum lobby: one drawing of the whole building, one dot that
says *You are here*, every room reachable from it. The limit of the metaphor
is that a museum is about the past. This site is about the reader's present,
so the line always ends at a mustard tick dated this year, and every room
opens back onto now.

The direction runs on **two clocks**. *The Line* is linear time: Pentecost to
this year, to scale. *The Year* is the church's cyclical time: the seasons,
the week, tonight, the witness remembered on his day. The study door and the
history door live on the Line; the family door lives on the Year; the 2027
whole-story plan and the twelve-week course live on both. The home page shows
both clocks.

---

## 2. Information architecture

### 2.1 The doors

James chose **Study, Topics, Family, Essays, About** on 2026-10-26, and U19 has
built it.

**My recommendation: Study · History · Topics · Family · Essays,** with About
moved into the masthead.

| Door | Landing | What it is for |
|---|---|---|
| Study | `/study` | The text and what the church confesses: the Study Bible, the story Scripture tells, doctrine, the creeds, the Bible in its world, group studies, the 2027 plan |
| History | `/theology/history` (URL kept) | The people and the events: the Line, the course in nine Parts, the twelve turns, people, councils and controversies, Readings, the church remembers |
| Topics | `/topics` | The present end of the line: the questions people carry in their own words, each read against the long arc; Honest Answers, plans, self-checks, tools |
| Family | `/family` | The second clock: tonight, the year, devotions, the catechism, the seasons |
| Essays | `/writing` | The shelf, this season, letters if James wants them |

About (James, Books, Speaking, Contact, How we write) becomes the masthead
itself: "LiveWell" opens Home, "by James Bell" opens About, on every page and
at every width. It also stays in the utility row on desktop and in the footer.

**Why it is better.** James's own two largest asks, the Bible and "the best
church history study available," each get a door, and doctrine stops being a
row on a hub because Study can hold it beside the Bible (`ia.md` C1). History
is the door a skeptic will open that does not ask him to believe anything
first. Study and History split cleanly: Study holds what is confessed and
read (the text, the creed); History holds who and when (the person, the
council). A creed page lives in Study and links its council in History; the
council page lives in History and links its creed in Study. Each thing has one
home.

**What it costs him.**
- It contradicts the Decision Log entry of 2026-10-26, which he made three
  days before this document. The change is one PR in the files U19 touched
  (`siteNav.ts`, `site-structure.test.ts`, `siteNav.test.tsx`, `Footer.tsx`,
  `MinimalNav.tsx`, `SEARCH_SHORTCUTS`) and the Decision Log line.
- About stops being a door. His face and his atheist story are the
  platform's strongest credential with the skeptic (`visitor.md`), so the
  masthead link must be real and visible, and the home page must carry the
  story on its first screen (section 3). Books, already moved under About on
  10-26, is one level further from the header; that matters more once Stripe
  is live.
- Readers may at first look for a creed under History. The breadcrumb and the
  cross-links carry them; the search answers either way.

**If James keeps his five,** nothing in this direction breaks. Study's menu
opens with "The whole story, Pentecost to now" (the Line), church history
becomes the first section of `/study`, and Study's landing leads with the Line
instead of a list. History is then one tap deeper than it should be, and that
is the whole cost.

### 2.2 The top-level map

| Door | Holds (in menu order) |
|---|---|
| **Study** `/study` | The Study Bible (`/study/bible`, the canon in seven divisions and the story in eleven acts) · Doctrine (`/study/doctrine`, new: the creed with its dates, the doctrine map, by question) · Creeds and confessions (`/resources/creeds`, URL kept) · The Bible in its world (`/resources/context`, URL kept) · Study with a group (`/studyguides`) · Read the whole story in 2027 (`/study/bible/guides/whole-story-2027`, U28) |
| **History** `/theology/history` | The whole story (the Line, the landing itself) · The course: nine Parts (`/theology/history/part/:n`, new) · Twelve weeks, twelve turns (`/theology/history/twelve`, new) · People (`/theology/history/people`, a new list over U31's person pages and sheets) · Councils and controversies (`/theology/history/controversies`, U54) · Timeline, as a list (`/theology/history/timeline`, U31) · Readings (`/theology/history/sources`, a new list over C 13's source pages and B 3) · The church remembers (a line, and its page) |
| **Topics** `/topics` | Every question (`/topics`, U25) · Honest answers (`/answers`) · Eight-week plans (`/plans`) · Self-checks · Tools (`/tools`) · Everything, on one page (`/resources`, footer and menu foot) |
| **Family** `/family` | Tonight at the table (`/family/tonight`) · The year (the second clock, on `/family`) · The devotions (`/family/devotions`) · The catechism (`/family/catechism`) · Advent and Holy Week · This week at your table (`/family/this-week`, U20) |
| **Essays** `/writing` | The shelf by section · This season · Letters (if James wants them) |
| **Masthead** | About (`/about`): James, Books, Speaking, Contact, How we write, What's new and corrections |
| **Utility** | Find Help (first, every page) · Search (a field on desktop, `/` to focus) · Subscribe · My Library |

Every URL on the Decision Log's never-redirected list stays where it is
(`/study/*`, `/theology/history`, `/theology/doctrine/*`, the creeds, the
context guides, `/downloads`, `/nation`, `/help`, every tool). The new routes
above are static paths registered before `/theology/history/:slug`, except
`/theology/history/part/:n`, which is a param route through the 9.3 checklist.
Breadcrumbs follow the door, not the old path, so `/resources/creeds/nicene-creed`
reads "Study › Creeds › The Nicene Creed" and the Study door lights (`ia.md`
M1).

### 2.3 Page types

| Page type | Example | Template |
|---|---|---|
| Home | `/` | 3 |
| Door landing | `/study`, `/topics`, `/family`, `/writing` | one screen of distinct choices, then "see all" lists (`ia.md` M10, C 19) |
| The Line (History landing) | `/theology/history` | 5.6a |
| Part (an issue of the course) | `/theology/history/part/2` | 5.6b |
| Session | `/theology/history/session/nicaea` | 5.6c |
| Person (page above the plan's threshold; sheet below it) | `?p=athanasius` | 5.6d |
| Event and hinge (sheet) | `?e=nicaea-325` | 5.6e |
| Council and controversy | `/theology/history/controversies/arius` | 5.6f |
| Reading (one primary source) | `/theology/history/sources/diognetus` | 5.6g |
| Bible book | `/study/bible/john` | 5.1 |
| Bible chapter | `/study/bible/john/1` | 5.1 |
| Verse (panel state) | `/study/bible/john/3?v=16&panel=church` | 5.2 |
| Doctrine landing and doctrine page | `/study/doctrine`, `/study/bible/doctrines/:id` | 5.5 |
| Creed | `/resources/creeds/nicene-creed` | 5.5 |
| Topic | `/topics/living-after-christendom` | 5.4 |
| Honest Answer | `/answers` (later `/answers/:slug`, B 20) | 5.4, short form |
| Essay | `/writing/:slug` | 5.3 |
| Tonight, devotion, table mode | `/family/tonight` | 5.7 |
| Tool | `/tools/test-the-case` | 5.8 |
| Course, plan | `/theology/history/twelve`, `/plans/:slug` | 5.9 |
| Care page | `/help/:slug` | unchanged in shape; C 2's urgency cards |
| Search | `/search` | 2.5 |

### 2.4 How each reader enters, and where they go next

**The skeptic** arrives from search on an essay, an Honest Answer or a topic
page, or on the home page. On Home his door is in his own words on the first
screen: *Not sure you believe any of this? Start with the case.* It opens Test
the Case at Move 1, with Honest Answers and the two church-hurt care pages
beside it (`visitor.md`). His second step is History: the Line, which asks
nothing of him, and a session that teaches him to read a source himself (B 6).
His third is the facing page, where the losing side speaks first (B 9), and
*Read Mark with a friend* (B 15) when he is ready for the text. Nothing he
lands on asks for his email (B 2).

**The doubting Christian** arrives tired of being handled, usually on Topics
with her question in her own words. The topic page answers it without
resolving it too fast, then shows her *Asked before* (4.7): a dated witness who
sat in the same dark, in his own words. She goes next into that witness's
session, or into the twelve turns at the *Studying* depth. Find Help is one tap
away when the doubt has become a crisis.

**The pastor** arrives from PCN or a forwarded essay, and his door is History.
Every session has leader notes, a 45- and a 75-minute plan, and a handout
(MASTER-PLAN 7.2). The twelve turns can be dated for his church (`?start=` and
`?cadence=`, A 17 and B 11) and printed. *The church remembers* gives him a
witness a week for the bulletin (B 14). Nothing tracks his people.

**The seeker** arrives with a Tuesday problem, from search on a care page or a
topic page. The practical door is first (the care page's steps for this week);
the depth sits behind it (the topic's long arc, a session). From Home she has
*Tonight at the table* and Find.

**The parent** arrives on a weeknight. Home's tonight line, then table mode:
two taps (U17, U18). The second clock tells her where the household is in the
year; once a week a witness from the church remembers comes to the table.

### 2.5 Search

One index and one box everywhere (CRITIQUE #3), answering in typed groups with
the canonical answer first: Passage, Word, Doctrine, Glossary, **People and
events**, then Essays, Help and Tools. "John 3:16" still goes straight to the
verse, and crisis words keep priority over everything.

What the Long Memory adds:

- **Type a year.** "325", "AD 325", "1517", "the fourth century" or "4th
  century" open the Line at that year: what happened, who was alive and how
  old, which era and Part, and the session that covers it
  (`/theology/history/timeline?year=325`). A bare number is read as a year only
  when the reference parser finds no book in the query, so "John 3:16" can
  never become a date.
- **Every result that has a date shows it.** "Nicaea · 325 · Council";
  "Athanasius · about 296 to 373 · Person" (dates from the registry, with its
  certainty). The reader sees where a result sits in time before he opens it.
- **"In history's order."** A switch on the results, on topic pages and on
  doctrine pages, that sorts by date instead of relevance: Scripture first,
  then the dated witnesses, then LiveWell's own writing last and labeled (A
  23). On "the poor" or "grace," the order itself teaches that the concern is
  older than any party.
- **A line per result** that says where it lives ("History › Part II ›
  Nicaea"), and `/` to focus the box on desktop (C 18).

Every local box (the Study Bible's Go to, `/writing`, `/help`) becomes a scoped
view of the one search that keeps the query when widened. `/theology/search`
folds into it. The index stays client-side and static, so no API procedure
changes and neither runtime is touched.

### 2.6 The joins: time as the shared key

The critique asks for a typed relation model (passage, doctrine, creed,
council, heresy, person, era, essay) rendered as one "Connected" block on every
page (`ia.md` M6). This direction adds one rule to it: **every node that has a
date carries one, with its certainty.** A council, a person, a source, a creed
phrase, an essay's hinge, a witness on a verse. Because they share a time axis,
any page can draw its own neighbors on a short line (the topic's long arc, the
verse's readers, the essay's history) with the same component, and any two
things can be ordered without a human deciding the order. The relations are
hand-filed and checked by a validator; nothing is matched by keyword
(`ia.md` M9).

### 2.7 Folded or cut, in short

The two interleaved era series become one ordered reading list on the Line; the
accordion timeline becomes the Line and its list; three periodizations become
one; the keyword shelves become hand-filed relations; the theology quiz is
retired. Section 7 has the full list with reasons.

---

## 3. The home page

James chose the headline, the portrait and the two paragraphs (#533). This
design keeps his words and changes their order and setting. The home hero is
one of the two places MASTER-PLAN 8.1 reserves the black field for, and it
earns it here.

### 3.1 The first screen at 390 x 844

From the top, with approximate positions:

1. **Masthead, 0 to 56 px, cream.** The logotype "LiveWell" (drawn, 6.10 P6;
   live Cormorant until then) and beneath it "by James Bell" in Inter 500
   caps, which is the link to About. Right side: *Find Help* in
   `--mustard-text`, at the weight of the other controls (not the loudest
   thing a stranger sees, `visitor.md`), a search icon, and the menu. The
   masthead hides on the way down and returns on the way up (CRITIQUE #9).
2. **Black hero begins, 56 px.** 24 px of air.
3. **The headline, 80 to 250 px.** Cormorant 400 at 40 px, line height 1.05,
   cream: *Learning to follow Jesus, and live well, in post-Christian
   America.* James's words; the two em-dashes become commas (his call, 6.10
   P10), so no line starts on a dash.
4. **His sentence, 266 to 370 px.** A 56 x 70 portrait at the left (the real
   photograph once it is in `client/public`, U08), and beside it his own words
   from #533 in Inter 17 px, `--charcoal-fg-muted`: *I was raised without a
   father and came to faith as an adult, after years as an atheist, so I know
   the objections from the inside.* The atheist line is on the first screen,
   not the last (`visitor.md`).
5. **The Line, 394 to 486 px.** The full width of the column (358 px), drawn
   in cream hairlines on black. Left end: "AD 30". A band at the left a little
   under a seventh of the width, labeled "Without power." Above it, starting
   at 313, the long hairline bracket labeled "Christendom," solid at first and
   dotted where its end is argued over (6.10 P9 asks James to set the words).
   At the right, below the main line, a short row labeled "In America" that
   begins in the seventeenth century: about a fifth of the line. At the right
   end, one mustard tick, 16 px tall, labeled "You are here" in `--mustard`,
   and the year. Nothing else is labeled on a phone.
6. **The caption, 498 to 548 px.** James's own sentences, in Cormorant italic
   at 19 px: *The early church knew. So did believers in every age who lived
   without power.* Beneath it, in Inter 14 px, a text link: *See the whole
   story* (to `/theology/history`), and the drawing itself is one tap target to
   the same place.
7. **Find, 568 to 624 px.** One field, 16 px text so iOS does not zoom:
   *A passage, a person, a year, or a question.* The parser and book list load
   on focus (U15, U18).
8. **The skeptic's door, 644 to 700 px.** A full-width row on black with a
   hairline above it: *Not sure you believe any of this? Start with the case*
   and an arrow. It opens Test the Case at Move 1.
9. **The hero ends at about 760 px.** The cream band below shows its first
   line at the foot of the screen: *Tonight at the table · Strong Enough To Be
   Gentle* (the title in the capture; rendered after mount from the year map,
   never the network; empty when there is nothing to show).

What is not on the first screen: the mission paragraph (it moves to About, as
the critique asks), Subscribe (the masthead has none on a phone; one form lives
in the ending), the book.

### 3.2 A returning reader

After mount, from the device only (`myProgress.ts`, `storyPlan`, the course's
position), the row under the Line changes from the skeptic's door to the
reader's own place on the two clocks, in one line each, at most two lines:

- *Day 302 of 365 · The Prophets and Exile · Continue*
- *Part II, session 3 of 6 · Nicaea · Continue*
- *Week 4 of the twelve turns · Nicaea, 325 · Continue*

On the Line itself, a second, quieter tick (ink, not mustard) marks the point
in the story the reader has reached in the course, so he sees how far he has
walked toward "You are here." Position, never performance: no percentage, no
count of days kept. The skeptic's door moves one row down; it never disappears.

### 3.3 The first screen at 1440 x 900

1. **Masthead, 0 to 72 px, cream.** Logotype and "by James Bell" at the left.
   The doors, Inter 500 at 15 px: *Study · History · Topics · Family ·
   Essays*. At the right: *Find Help*, a search field 240 px wide showing
   "Search, or press /", and *Subscribe* as an ink outline button (not a
   mustard fill).
2. **Black hero, 72 to about 860 px,** on the 12-column grid at
   `--w-default` (1180 px).
3. **Columns 1 to 8, from 136 px:** the headline in Cormorant 400 at 5.5 rem
   (88 px), three lines. Under it, 24 px down, James's sentence in Inter 19 px,
   two lines.
4. **Columns 9 to 12:** the portrait at real scale (about 280 x 350), his name,
   and "About James" (the visitor's "a portrait large enough to read an
   expression").
5. **The Line, about 540 to 760 px, across all twelve columns.** At this width
   the drawing carries its full grammar, to scale from AD 30 to this year:
   - the nine Parts as bands of alternating fill (no color coding), each
     labeled in Inter caps above the line ("I · Without power", "II · Given
     power", and so on to "VIII · After Christendom");
   - up to twelve hinge ticks with their years (312, 325, 451, 1054, 1517,
     1648, 1934 among the candidates; James chooses, B 8);
   - the Christendom bracket above, solid then dotted;
   - the "In America" row below, short at the right;
   - at the far left, a cap not drawn to scale, labeled "Before: the story
     Scripture tells, in eleven acts," which opens the Study Bible's story;
   - at the far right, past the mustard tick, a dotted stretch to the frame
     edge labeled with a reference to Revelation 21 and the words "not yet,"
     with a caption that marks it as confession: *The line is dotted past
     today because Christians confess an end they have not seen.*
   Pointer or focus on a tick shows its title; a click opens its hinge sheet
   (4.2). Under the drawing at the left, James's caption; at the right,
   *As a list* and *See the whole story*.
6. **At about 800 px,** Find (560 px wide) and, beside it, the skeptic's door.
   The tonight line sits just below the fold.

### 3.4 The rest of the page

Six bands below the hero, alternating so no three share a background:

1. **This week (cream): the second clock.** Left half, *In the year*: a strip
   of 52 thin ticks with this week marked and the season named ("Ordinary
   Time · week 44"), then *Tonight at the table* with Start, the catechism
   question of the week, and, in the weeks it falls, *The church remembers*:
   one witness, a line, and a date (B 14). Right half, *In the story*: for a
   returning reader, the Continue rows of 3.2; for a new one, *This week's
   source* (C 13), one primary text with its tombstone (author, date, place,
   translation, and its public-domain basis), a title that states what it
   shows, and two doors.
2. **Start where you stand (cream-warm).** Four rows, the skeptic first, in
   the words `/help` already uses: *I'm not sure I believe any of this* (Test
   the Case, Honest Answers, Read Mark with a friend); *I have a question I
   can't shake* (Topics); *I'm new to the faith* (the Beginnings eight weeks,
   moved out of "Help in a hard season," `learning.md` C2); *I teach or lead
   people* (sessions with leader notes, the twelve turns dated for a church,
   This week at your table).
3. **Twelve weeks, twelve turns (black).** The course in one view (A 17): twelve
   numbered rows, each a year and a title set as a question, with a quiet mark
   for the weeks done on this device. *Begin with week 1.* This band and the
   hero are the only black on the page besides the ending.
4. **This season (cream).** The current season or numbered issue on the essay
   shelf (B 4, C 17): its question, three to five pieces with dates and
   minutes, and when it ends.
5. **Asked before (cream-warm).** Three present questions from Topics, each
   paired with its dated witness: the question in Cormorant, the witness's
   year and name in Inter caps, one verified line. It is the shortest
   demonstration on the site that the questions are old.
6. **The ending (black, merged with the footer).** James at portrait scale,
   the first lines of "My story in my own words" verbatim from `/about`, *How
   the writing works*, one newsletter form ("Written slowly. Sent once a
   week," `visitor.md`), and the footer as a real index of the site.

About six phone screens. The current "Start with these" picks by the current
book, the books band, and the second newsletter form are gone; the book
appears as a line in the ending.

### 3.5 Why it draws attention, and still feels unhurried, weighted and grown-up

It draws attention because the first thing a stranger sees after the headline
is a picture of a fact he did not know he could see: how short the American
chapter is, how long the church lived without power, and that he is standing
at a tick near the end. The picture invites a second look and a tap, and
everything it opens is real text. It stays unhurried because nothing moves,
nothing counts, and the only color is one mustard tick. It is weighted because
the black field is reserved for the headline and the line of twenty centuries.
It is grown-up because it speaks to every reader on the same terms, names the
skeptic's door in his own words, and puts the confession ("not yet") on the
page marked as confession instead of hiding it or pressing it.

The limits, stated as plainly as the panel asked (CRITIQUE question 13): no
streaks, badges, counters of people, autoplay, parallax, scroll-triggered
animation, pop-ups, "latest" feeds, or a zoomable canvas. The Line is never
animated on load.

---

## 4. Signature interactions

Ten. Each one is something the reader does to look harder at a text or a
time, not something the site does to keep him.

### 4.1 The Line: *You are here*

**What the reader does.** Looks at the line of twenty centuries on Home, the
History door or a Part page; taps a band, a tick or "As a list."
**What happens.** A band opens its Part page. A tick opens its hinge sheet
(4.2) in the existing `Sheet` (bottom sheet on a phone, side panel from 1024
px), addressed in the URL (`?e=nicaea-325`) so a pastor can send it. "As a
list" opens the same marks as an ordered list with dates, in a `<details>`.
On the History door's phone layout, the line sits as an overview at the top
and the list of Parts and sessions scrolls beneath it; the overview's ink tick
follows the item in view (position only, no tween), so the reader always sees
where in the twenty centuries he is reading.
**Where it lives.** Home (3.1, 3.3), the History landing (5.6a), every Part
page (the Part's own span), the topic page's long arc (4.7), the essay foot
(5.3).
**From the research.** Sparks's *Histomap* and the time river (`brand.md`);
the Met's Heilbrunn Timeline and Noll's turning points (B 8); the one band
grammar with a single mustard "you are here" (A 10); Priestley's dotted lines
for uncertain dates (B 12, B tension 4); Tse's rules: drawn for each width,
nothing behind a hover (C 22).
**Why it serves study.** History is learned as shape before detail
(CRITIQUE #8). The line is the shape. It gives every page a place in a
sequence and every reader a "you are here," which is the first thing a novice
needs and the last thing a scholar outgrows.

### 4.2 The hinge: the world before and the world after

**What the reader does.** Opens a hinge from the Line, a session, search, or a
date link in an essay.
**What happens.** A sheet in five short parts, always in the same order:
*The world before* (two or three sentences); *What happened* (date with its
certainty, place, people, one verified source line); *The world after*; *What
we still carry* (one sentence that reaches the reader's present); *The road to
it* (three to five earlier events, each a tick on a short line, each opening
its own sheet). A witness label sits under the date: "told by a participant,"
"written within a generation," "a later account, about 120 years after,"
"tradition" (B 6). At the foot: the session that covers it, and its Reading if
one exists.
**Where it lives.** `?e=` on the History door, the timeline, Part pages and
sessions; reachable from search by year.
**From the research.** B 8 (Noll's hinges; *The world before*, *What
happened*, *The world after*, *What we still carry*, *The road to it*); B 6
(the witness label); A 9 (honest uncertainty).
**Why it serves study.** It teaches causation in a form a reader can carry
into a room the site never mentioned, which is the Formation Test's fourth
question. "What we still carry" is where the past becomes the reader's own.

### 4.3 Who was alive: the year rule

**What the reader does.** On the History door's *Lives* view, sets a year with
a number field and step buttons (or types a year into search, or follows a link
a teacher sent: `?view=lives&year=386`).
**What happens.** Each person in the registry is a hairline from birth to
death, solid where attested and dotted at an uncertain end, grouped in labeled
rows by region. One vertical rule (the drawing's single mustard mark) moves to
the year. Beneath it, *Alive in 386*: each name with his age that year, and a
line under the list for *Written by then* (the creeds and texts that existed),
from the registry's sources. Under 600 px the chart becomes a list with small
bars. The year is in the URL.
**Where it lives.** `/theology/history/timeline?view=lives`, person pages
("Alive at the same time"), and the year search.
**From the research.** Priestley's *A Chart of Biography* (B 12); the plan's
"alive in a given year" filter, which replaces a separate contemporaries view
(MASTER-PLAN 7.2); C 25's one candidate explorable, "alive in the same year."
**Why it serves study.** It shows what prose cannot hold: in the registry's own
dates, Ambrose, Jerome, Chrysostom and Augustine were all alive in 386, and
Polycarp was a boy when Ignatius died. It makes the
registry's gaps visible (two women today), which keeps the editor honest and
gives the reader the truth about the course's coverage. It is a lookup, not a
game: no score, no timer.

### 4.4 The church on this verse: a dated strip under the text

**What the reader does.** Opens a verse's panel in the Study Bible and chooses
*The church on this verse*, or reaches *How it has been read* at the foot of a
chapter.
**What happens.** A thin time rule from AD 30 to today with a dot for each
witness who read the verse, oldest first; each dot shows name, place, date
and work, and opens its card. Where U07 stores the text, the card is verbatim
and verified, with its tombstone; where it does not, the card says *Study
note: a paraphrase* (A 3's labels). Where two witnesses disagree, one line
says so and names the order of the question. At the end of the rule, the
mustard tick: *You are here*, and the reader's own note field ("Your note, on
this device").
**Where it lives.** The verse panel (`?v=16&panel=church`) and the chapter foot.
Stage one uses the `interpretation` field already written for 114 chapters
(John 3: Justin Martyr around AD 155, *1 Apology* 61; Tertullian around AD 200,
*On Baptism* 13; Chrysostom). Stage two adds verified source cards from U07,
starting with the verses the creeds rest on.
**From the research.** A 4 (the Dartmouth Dante Project; Sefaria's
chronological sort; Catena as the caution about undated, unsourced comment);
A 1 (the counted panel).
**Why it serves study.** It is how the Bible is entered through the long
memory without turning Scripture into a history exhibit: the text stays first,
and the reader learns that he is not the first person to read this line, nor
the first to find it hard.

### 4.5 Where the words came from: the creed phrase and its fight

**What the reader does.** Taps a phrase of the Nicene Creed ("of one substance
with the Father") on the creed page or on the doctrine landing.
**What happens.** Beside the phrase (in the margin from about 1100 px; under
the phrase on a phone), a note in a fixed order: the year the church had to say
it and the council; the question that forced it, in one sentence; the losing
side's own words where a reachable text exists (Arius's letter in Theodoret
1.4 is reachable, not yet stored); the answer in its defender's words
(Athanasius's *De Decretis*, stored); the Scripture it rests on (John 1:1-18,
opened in a sheet); and the doctrine study. A small vertical line down the
creed's left edge marks the date each article was fought for, so the reader
sees that the creed was written over time, under pressure, and not in one
sitting.
**Where it lives.** The creed pages (U44), the doctrine landing (5.5), and
every doctrine page's *How the church came to say this*.
**From the research.** `learning.md` M4 (Packer and the Heidelberg: the creed
as the spine; the split-attention effect of notes 1,500 px from their text);
A 6 and A 7 (one door for doctrine; In brief with proofs); B 3 (*It drew on*,
*Written alongside*, *Who answered it*).
**Why it serves study.** Doctrine taught as the words the church was forced to
find is doctrine a reader can explain. It also answers the skeptic's suspicion
that the creed was invented by power: he can read both sides and the date.

### 4.6 The facing page, and compare the witnesses

**What the reader does.** Reaches a contested moment in a session or a
controversy page; or opens *Compare the witnesses* on an event with more than
one source.
**What happens.** *The facing page*: two verbatim excerpts side by side on a
wide screen, stacked on a phone, the losing side first, one line on what each
feared, then James's verdict below both and labeled as his (B 9). Where a side
survives only in its enemies' quotations, the page says so. *Compare the
witnesses*: two or three stored sources that tell one event, in the order they
were written, with the gap from the event stated above each (B 6). The first
built is Thessalonica in 390, told by Ambrose's Letter 51, Theodoret 5.17 to
5.18 and Augustine's *City of God* 5.26, all three stored by U07. Each card
carries *Read it closely*: four questions (who wrote this, when, to whom and
why; what was happening; what does it claim and how; who else saw it, and do
they agree), a pause, then James's reading in under 80 words.
**Where it lives.** Sessions (U32), controversy pages (U54), the hinge sheet's
foot.
**From the research.** B 9 (BioLogos, Smarthistory's two voices); B 6
(Stanford's *Reading Like a Historian*, the OER Project's close reads); B 21
(the church's failures named first, both directions).
**Why it serves study.** It hands the reader the method instead of the
verdict. The test in the contract ("a thoughtful Christian from the other side
... should finish feeling understood, not beaten") is met on the page, where
the skeptic can check it.

### 4.7 Asked before: the present question set on the line

**What the reader does.** Reads a topic page (or the foot of an essay) and
reaches *Asked before*; or switches any topic, doctrine or search list to *In
history's order*.
**What happens.** A short line in the margin or under the short answer: a dot
for each dated witness who faced the same question, and the mustard tick for
now. The first dot opens its card: on the post-Christian page, the Letter to
Diognetus ("every foreign land is a homeland to them," in the U25 data, to be
set verbatim from the stored text); on a page about believers who gave way
under pressure, Cyprian's *On the Lapsed* (stored); on a page about the church
and the state's sword, Ambrose and Theodosius in 390 (stored). *In history's
order* reorders the page's sources by date: Scripture, then the witnesses, then
LiveWell's own writing last and labeled.
**Where it lives.** Every topic page (U25's `witness` field, grown into a list
of dated, verified cards), the essay foot (5.3), doctrine pages, search.
**From the research.** A 23 (Sefaria's topic pages with a chronological sort;
"the concern is older than any party"); B 3 (Readings); the U25 witness field.
**Why it serves study.** It is the direction's thesis made into a small,
honest object on every present-tense page: the doubting Christian sees that
"the church has sat in this dark before" (the contract's audience standard),
and the skeptic sees a source he can check.

### 4.8 How far from the event? The gap ruler

**What the reader does.** In Test the Case, at a move that rests on sources
(the resurrection, the Gospels), opens *How far from the event?*
**What happens.** A short ruler with the event at the left and each source
placed by when it was written, with its date range and certainty, and one
sentence each on what it is (a letter, a narrative, a hostile report). Below
it, the move's own *What this move does not settle*. Every date on the ruler
carries a ledger line; any date that cannot be verified stays off the ruler.
**Where it lives.** Test the Case (5.8); later the matching Honest Answers.
**From the research.** B 6 (witness labels, "written N years after"); A 9
(how sure anyone can be); B 1 (the objection at full strength, what the answer
does not settle).
**Why it serves study.** The skeptic's question about the Gospels is a
question about time. The ruler lets him see the claim and its limits in one
glance and argue with the data instead of with the pastor. It is built last
(phase 4), and only on cases whose dates the ledger can stand behind.

### 4.9 The second clock: the year, tonight, and the church remembers

**What the reader does.** Opens Family or the home page's *This week*; taps
tonight's devotion, the catechism question, or this week's witness.
**What happens.** A strip of 52 thin ticks for the church year, the current
week marked, the season named. Tonight's devotion leads (U17). In Advent and
Holy Week the strip becomes the season's doors, today's open and the days ahead
closed until their date, the last Holy Week card blank but for its verse (B
23). In the weeks a registry witness falls on his traditional day of
remembrance, a line appears: the witness, a 150-word life, one verified line
in his own words, one Scripture reading, and a half-page card a pastor may
reproduce (B 14). Polycarp and Perpetua and Felicity, both stored by U07, are
the first, in Lent (dates to verify against the calendar James chooses).
**Where it lives.** `/family`, Home's *This week*, `/family/this-week`, the
History door's foot.
**From the research.** B 14 (*Lesser Feasts and Fasts*, Concordia's *Today in
History*, as remembrance and never a vote), B 23 (Resurrection Eggs, the Jesse
Tree), A 13 (the shared week), C 16 (a rhythm kept by the calendar, not the
reader).
**Why it serves study.** It is the long memory at the scale of a household: a
date, not a streak. A missed week is not a debt; the strip only says what week
it is. Framed for Baptist readers through Hebrews 12:1 as remembrance, not
veneration.

### 4.10 Before and after: the myth check, and the question that comes back

**What the reader does.** Opens a session and answers two to four statements
("true," "false," "it's complicated") before reading; at the end, answers the
session's question in one sentence; days later, meets one of the session's
questions again.
**What happens.** The first answers wait on the device and come back beside
the session's own answers at the end, as information with its source, never a
score (C 8). Every myth check holds at least one myth believers tell beside the
ones skeptics hold (B 21). The session's question returns on a fixed ladder
(about 5 days, 2 weeks, 5 weeks, 3 months) on the reader's private shelf, "I
had it," "Not yet," or "Skip for now" (C 6). The twelve turns open each week
with one question from the week before (`learning.md` C1).
**Where it lives.** Sessions (U32), the twelve turns (5.9), creed phrases, the
catechism.
**From the research.** C 6 (Quantum Country and Orbit), C 8 (the pretesting
effect), C 14 (every question carries its why), MASTER-PLAN 7.2's myth check.
**Why it serves study.** Retrieval and spacing are what turn an informed
reader into one who remembers what *homoousios* answered (`learning.md` C4).
Nothing is counted; the only measure is time held, in words.

---

## 5. Templates

Every template is phone first at 390 px with a 16 px gutter, and every long
read uses the one long-read template (6.1): the text serif for reading, Inter
for the interface, Cormorant for display, a centered column of about 62
characters, a 240 px margin from about 1100 px, notes beside the text on wide
screens and under their paragraph on a phone (C 3).

### 5.1 Bible chapter (`/study/bible/:book/:chapter`) and book page

**Structure.** Kicker: "Act 9 of 11 · Christ, the Center" (the existing act
placement). Beneath it a 6 px band of the eleven acts with the reader's act
in ink and a single mustard tick on this chapter (A 10); tapping it opens the
story. H1 "John 1". One line: *When*, from the book's "About this book" card,
with both dates where scholars disagree and no year for primeval events (A 9).
Two-line summary; then three short rows: *John 1 in eight movements* (the
`outline` every chapter carries), *The question this chapter raises* (the
`hard` field, where it exists, A 5), and *Read with these in mind* (the
Observe questions, `learning.md` M1). A Read · Study · Teach switch (A 2,
`learning.md` M7). The text in the text serif with the outline's headings in
the text. After the last verse, a full-width *Next in the story: John 2*
(the existing story path), then the notes in the order the depth switch
chooses, ending with *How it has been read*: the dated strip (4.4).
**Interactive layer.** The whole verse selects (44 px target, U37); the panel
with counted rows (A 1): Study note, Words, Elsewhere in Scripture, The church
on this verse, A question it raises, On LiveWell. A bottom bar that hides while
reading: previous, the book-and-chapter picker, next, Aa, Listen. Notes and
marks on the device (A 21).
**First screen (phone).** Kicker and act band (to 120 px), H1, the two-line
summary, the three rows collapsed to one line each (to about 380 px), and verse
1 beginning by about 420 px. The masthead has hidden.

**Book page and the Study Bible index.** The index opens on the canon in its
seven divisions as a compact list that opens a chapter grid in place
(CRITIQUE #1), and on a second view, *The story Scripture tells*: the eleven
acts as a vertical line with each act's `dates` line, ending at act 10 with
*and the story since* opening the History door. The book page leads with its
band of sections (A 10), *About this book*, and its place in the acts.

### 5.2 Verse (panel state, `?v=16&panel=church`)

**Structure.** Heading "John 3:16" with Previous and Next verse at the foot so
the reader walks the chapter without closing anything (A 1). Rows in a fixed
order with counts, empty rows hidden. *The church on this verse* is a dated
strip (4.4), not a list.
**Interactive layer.** Each row opens in place with Back; state in the URL; on
desktop a *Follow my reading* lock; Copy with reference; *Add to my sheet*
(A 21).
**First screen.** On a phone the sheet opens at about 40 percent with the
verse still visible above it (CRITIQUE #1), focus moved in, the counted rows
visible.

### 5.3 Essay (`/writing/:slug`)

**Structure.** Masthead: kicker "Essay · After Christendom, 2 of 6 · 18 min",
title, dek, byline with date. The first sentence on the first phone screen
(U04). The text in the text serif; Scripture as block Scripture with its
reference beneath; no bold in prose; notes beside the text (C 3). People,
councils and dates in the prose are quiet links that open their sheets in
place (C 9): "Barmen, 1934" opens its hinge without leaving the argument.
Where the essay turns on an objection, *The strongest case against* sits at
that hinge, quoted with its source (B 1). An end mark (C 12), real space, then
a foot in two plain groups. *Test this yourself* (`learning.md` M6): the
passage (opened in a sheet, with *Read it with the notes*), **the history**
(a short line holding the dated hinges the essay rests on, each a tick that
opens its sheet, with the mustard tick for now), and one question to carry out
of the room. Then *Sources and record* (C 1): sources, first published,
revisions, corrections, cite, report an error. Then one next read chosen by an
editor, the book as one quiet line when it is the natural sequel, and the
author line.
**Interactive layer.** One Aa control (size, Night, Listen); one share menu at
the end mark (Save, Print, Send on desktop, Cite). Nothing interactive between
the first sentence and the last (C tension 2).
**First screen (phone).** Kicker, title, dek, byline, and the first two lines
of the essay with its versal.

### 5.4 Topic (`/topics/:slug`), with the post-Christian page as the flagship

**Structure.** U25's page, kept: the question as H1, the short answer, the
lead essay, Scripture, the witness, the table, use it, care. The Long Memory
adds two parts and an order:
1. The short answer's first paragraph (the definition first, as the Stanford
   Encyclopedia leads an entry, CRITIQUE #5).
2. **The long arc:** a vertical line of four to six dated turns, each a tick
   with a year, a title and one sentence, each opening its era essay or
   session, ending at the mustard tick. On the post-Christian page the turns
   are the ones the critique names and the essays already cover: *The
   Constantinian Turn* (AD 312-430), the wars of religion to 1648, *The
   American Experiment* (AD 1800-1950), *The Attractional Era* (AD 1950-2010)
   and *After Christendom* (AD 2010-present). One sentence under the arc says
   where the rhyme with the early church breaks.
3. The rest of the short answer, then *Asked before* (4.7) with its verified
   witness cards.
4. *The strongest case against*, or on a second-order question the positions
   at equal length with who has held each since when (B 9, C 20).
5. Scripture, with *In history's order* (A 23).
6. The table, use it (the instruments, including the `/nation` pages linked as
   the subject's deeper library), care, and the record (*Reviewed* and *Next
   review due*, C 1).
**Interactive layer.** The arc's ticks and witness cards open sheets; the order
switch is in the URL (`?order=time`).
**First screen (phone).** The question, two to three lines of the short
answer, and the top of the long arc with its first tick.

`/post-christian` and `/exile`, which today 301 to an essay section holding one
essay, are re-pointed to `/topics/living-after-christendom` (6.10 P9). The page
leads with James's own two sentences from `/about` ("Nobody owes Christianity a
hearing anymore") if he approves that use.

An **Honest Answer** uses the same frame at a smaller size: the four moves (put
at its strongest, what it gets right, the answer, what this does not settle,
B 1), *Asked before* where a witness exists, and the ladder to Test the Case,
the essay and the strongest work on each side (B 20).

### 5.5 Doctrine: the landing, a doctrine page, and a creed

**The landing (`/study/doctrine`, new).** Three ways in, one per tab in the URL
(A 6). *The creed and its dates* (default): the Nicene Creed set in sense-lines
down the page, at display size, with a hairline down its left edge carrying a
tick for each article at the date it was fought for; each article opens its
doctrine page. *By how much it matters*: the doctrine map in three rings, what
the creeds bind at the center (A 8), with its list equivalent. *By question*:
the 76 catechism questions in the adult register.
**A doctrine page.** In brief, with its proofs opening in place (A 7); *How the
church came to say this* (4.5: the question, the people, the council, the
facing page, the creed phrase); *In Scripture* (the Study Bible doctrine
study and a thread across the canon, A 23); *Where Christians differ*, with
the order of the question named first; *Words* (glossary); *Sources in
history's order*; a closing prayer, verbatim and sourced (A 15); one question
that comes back (4.10).
**A creed (`/resources/creeds/:slug`, URL kept).** The text first on a phone
(CRITIQUE page table), phrase notes beside their phrases, the 325 and 381
switch, a memorize mode on the repaired drill (C 7), and links to the council,
Arius, Athanasius, the Trinity study and John 1 (`ia.md` M6).
**First screen (phone), the landing.** H1 *What the church confesses, and when
it had to say it*, one line, and the creed's first two articles with their
ticks.

### 5.6 Church history

**5.6a The Line: the History landing (`/theology/history`).** PageHead on cream
(not a black slab): H1 *Twenty centuries, and where you are standing* (wording
James's), and one line addressed to every reader: *Whether or not you believe
it, this is the story that made the country you live in* (`visitor.md`). Then
the Line at full width (desktop) or as a sticky overview over the list
(phone), then the nine Parts as rows: number, title, years, the question the
Part answers, sessions with minutes, and the reader's place on the device. Then
the views (Lives, Timeline list, Councils and controversies, People, Readings),
then the one ordered reading list (the 22 era essays filed under their Parts,
the eight-essay series marked *The short version*). *After Christendom* is
pinned above the Parts as *Start where you are standing*.
**First screen (phone):** H1, the line for every reader, the overview line with
the mustard tick, and Part I's row.

**5.6b Part (`/theology/history/part/:n`), opened like an issue (B 8).** The
Part's span drawn on its own line (the hinges inside it, the people alive in
it); the question it answers; its sessions; *Questions people ask*; *In their
own words* (verified excerpts); its region cells, with *Not yet written* where
the course has nothing (B 8); one public-domain object looked at closely (B
25); readings.
**First screen:** "Part II · 313 to 600 · The Church Given Power", the question,
and the Part's line.

**5.6c Session (`/theology/history/session/:slug`).** MASTER-PLAN 7.2's ten
parts, with three changes. It opens on a dated scene in Cormorant, every detail
from a source, with the strip *Place · Date · Source* that opens the source
card, and the question the session answers (B 7). A depth switch under the
title: *In five minutes*, *The session*, *At the table* (B 13). Source cards
carry *Read it closely* and, where the sources allow, *Compare the witnesses*
(4.6). A series rail at the top and foot: previous, "Part II, session 3 of 6",
next.
**First screen (phone):** kicker and rail, H1 (the question), the scene, and the
myth check's first statement.

**5.6d Person.** Name; dates as a life-line on a short stretch of the Line,
solid or dotted; place and role; *Alive at the same time* (4.3); *In their own
words* only when five excerpts pass the verifier (B 7); where they appear;
remembered on (B 14); sources. A sheet below the plan's 150-word threshold, a
page above it.

**5.6e Event and hinge (sheet, `?e=`).** As 4.2.

**5.6f Council and controversy.** The question; each position in its own words
on the facing page (4.6); what was decided; the creed text; where it returns
today; and its tick on the Line (U54).

**5.6g Reading (`/theology/history/sources/:slug`).** One primary text: a
tombstone (author, date, place, original language, translation and its
public-domain basis), James's introduction under the byline rule, the text with
section numbers, five to seven questions for one evening, *It drew on*,
*Written alongside*, *Who answered it* on a short line, and *Host a table*
(B 3, B 18, C 13). The first collection, *When the church had no power*, is
buildable from what U07 stores (Diognetus, Polycarp, *City of God* Book 5).

### 5.7 Family: Tonight, the devotion, and the year

**Structure.** `/family` leads with the second clock: the year strip (4.9), then
*Tonight at the table* with its title, the verse set large in the text serif,
*Start at the table*, and beside it *Read and pray* (about three minutes, the
smallest faithful version, B 10). The church remembers when it falls. The
devotion page puts the verse first after the title and moves utilities to the
end (CRITIQUE page table); a thin act band shows where tonight's passage sits
in the Bible's story (FAM 7 in B's also-considered list); the Ask step labels
its questions by kind (B 16); the four doors of the day under Deuteronomy 6:7
close the page (B 10).
**Interactive layer.** Table mode, unchanged (U17): one step per screen, the
screen kept awake, "We did this tonight" as a plain button that counts nothing.
The Advent and Holy Week door grids (B 23).
**First screen (phone), Tonight.** Kicker "Family · Tonight · Week 44", title,
verse, *Start at the table*, *Read and pray*. No "Send to my phone" on a phone.

### 5.8 A tool (Test the Case as the model)

**Structure.** A start panel in a fixed order: what it does, how long, where
your answers go ("on this device; nothing is sent"), when this is not the
place to start, and *Begin* worded as the act (C 4). Move 1 on the first phone
screen; other cases below it. One move per screen with a thin position line
("Move 2 of 5"); *Next move* and *Not convinced, but go on* side by side
(`visitor.md`); *What this move does not settle* in body type. *See the whole
case* as an outline (B 20). At moves that rest on sources, *How far from the
event?* (4.8). At the end, a private field, *In your own words, the strongest
point against this case*, kept on the device (B 19), and three doors: read
(the essay), the history (the session behind the move), ask (Honest Answers).
Cases worked through are remembered on the device.
**First screen (phone).** Kicker, H1, the one-line start panel summary, and
Move 1's claim.

### 5.9 A path or plan: *Twelve weeks, twelve turns*, and the others

**Structure.** `/theology/history/twelve` shows the whole path on screen one
(A 17): twelve numbered weeks, each a year and a title as a question, with
length and kind of work and a quiet mark for weeks done on this device. A
leader picks a start date and cadence and gets a dated schedule, a calendar
file and a print (A 17, B 11). Three depths: Reading, Studying, Teaching (the
last with a printable leader's sheet) (`learning.md` C1, M7). Each week is one
sitting of thirty to forty minutes, in the same order: last week's question
(4.10); the passage in the Study Bible; the hinge (its sheet and its era essay
or session); the creed line it grounds; one essay that carries it into the
present; one question to write an answer to, kept on the device; a closing
(A 15). The end of week 12 is a closing rite and a look back of eight mixed
questions, not a certificate (C 6, A 15).

**A worked week (week 4, Nicaea, 325).** The question: *What did the church
mean when it called Jesus God, and why did it have to decide?* Last week's
question returns first. The passage is John 1:1-18. The hinge sheet gives the
world before (Arius's teaching), what happened, the world after, and what we
still carry. The era essay is *The Great Councils*. The creed line is "of one
substance with the Father," opened at its phrase note (4.5). The essay into the
present is the shelf's Nicaea essay once it is public (NOTES lists *What Was
Decided at the Council of Nicaea?*), and until then the era essay alone. The
question to write: one sentence on why the word mattered.

**The twelve turns, as candidates for James** (B 8 makes the choice his): 1.
Pentecost and the Jerusalem church; 2. Under Rome (Pliny's letter, Polycarp);
3. Constantine, 312 to 313; 4. Nicaea, 325; 5. The bishop and the emperor,
Thessalonica, 390; 6. Chalcedon, 451; 7. The rule and the desert; 8. East and
West, 1054; 9. Wittenberg, 1517; 10. The wars end, 1648; 11. The American
experiment; 12. From Barmen, 1934, to After Christendom. The course can launch
on the era essays that exist and gain sessions as each Part lands.

**The other paths.** The 2027 whole-story plan (U28) gains the act band on every
day and a *Starting now?* on-ramp at each act (A 12). The skeptic's and the new
believer's eight weeks move from "Help in a hard season" to the Study door's
router (`learning.md` C2), unchanged inside. Care plans stay under Find Help.

---

## 6. Visual language, inside the brand contract

### 6.1 Type

Three faces with three jobs (CRITIQUE #7): Cormorant Garamond for display,
Inter for interface and metadata, and a text serif for everything read at
length, proposed to James as P1 (6.10). Until he answers, long reading stays in
Inter and Inter's true italic is added so emphasis and Scripture stop being
faked (the critique's minimum).

A declared scale, held as `:root` tokens (P4):

| Token | Size (phone / desktop) | Face | Use |
|---|---|---|---|
| `--fs-eyebrow` | 0.75 rem | Inter 500, caps, 0.18 em | Kickers, line labels |
| `--fs-meta` | 0.875 rem | Inter 400 | Bylines, dates, captions, notes |
| `--fs-ui` | 1 rem | Inter 500 | Buttons, inputs (never under 16 px) |
| `--fs-text` | 1.1875 / 1.25 rem | Text serif 400, line height 1.65 | Essays, Scripture, notes, sessions, devotions |
| `--fs-lede` | 1.25 / 1.5 rem | Cormorant 400 italic | Deks, captions under drawings |
| `--fs-h3` | 1.375 / 1.5 rem | Cormorant 500 | Subheads |
| `--fs-h2` | 2 / 2.75 rem | Cormorant 400 | Section titles |
| `--fs-h1` | 2.5 / 4 rem | Cormorant 400, -0.02 em | Page titles |
| `--fs-display` | 2.5 / 5.5 to 7 rem | Cormorant 400, -0.02 em | Home and Part openers only |

Cormorant never below about 22 px, where it turns frail (`brand.md`).
Sentence case everywhere, titles included.

### 6.2 Rhythm and grid

An 8 px base. Sections 64 px apart on a phone, 96 px on desktop. One phone
gutter, 16 px, held as a token (`--gutter`). From 768 px an 8-column grid; from
1100 px a 12-column grid at `--w-default` (1180 px). The long-read template:
a 680 px text column, a 48 px gap, a 240 px margin for notes (C 3), centered,
one paper color, no section-by-section background changes inside a long read.
Hairlines (1 px, `--line`) replace shadows; corners stay square at 2 px.

### 6.3 Mustard

Mustard is the mark of *now* and *this*. It has four uses and no others:

1. the *You are here* tick, one per drawing (the Line, the act band, the year
   strip, the year rule);
2. the versal, the three-line initial that opens a long read (C 5's
   rubricator's mark);
3. the 1 px underline of a link, thickening on hover;
4. the current step's underline in a stepper.

Rules: one non-link mustard mark per viewport; `--mustard-text` is the only
mustard for text on a light surface; bright `--mustard` only on black; never a
button fill, a background, a band, or a word in a headline (`brand.md`).
`validate-design.mjs` learns to fail mustard used as text on light surfaces
(CRITIQUE engineering question 21). On a screen holding the Line and a versal,
the versal is dropped. That keeps mustard well under 8 percent of any viewport
even where drawings want it.

### 6.4 Cream and black

Cream is the room. Black is reserved for weight: the home hero, the verdict
bands (rare, as now), the twelve turns band on Home, and the ending merged with
the footer (`brand.md`: the black hero is no longer the default page head;
MASTER-PLAN 8.1). Door landings, the History landing, Part pages and sessions
open on cream with `PageHead`. No three consecutive sections share a
background; inside a long read, the background never changes.

### 6.5 Iconography and illustration

**The house line.** Grown from `covenant.svg`: ink hairlines at 1 to 1.6 px on
cream, one mustard point where the meaning is. Every drawing on the site is in
this hand: the Line, the act band, the year strip, the life-lines, the region
grid, the creed's date rail, the gap ruler, and a small glyph set (the nine
Parts, the five doors, about fifteen instruments), drawn once and reused. No
stock icon set for anything a reader must recognize (`brand.md`).

**Witnesses, not ornament.** One public-domain object per Part (and later per
session), captioned with artist or maker, title, date, holder and license and
linked to its source, opened by numbered details (B 25, C 22). Candidates to
check one by one: the Alexamenos graffito, the Dura-Europos baptistery, an
early printing of the Ninety-five Theses. Codex Sinaiticus is linked, never
embedded (its license is CC BY-NC-SA). No generated art anywhere: the seven
surfaces that still draw `GeneratedCover` or `GeneratedHero` lose them as real
witnesses land (C 22). The family pages share one drawing hand for the season
symbols and cards (B 25), gated on James.

**Photographs** of real rooms (the desk, Fenton, a PCN table), only if James
supplies or approves them (CRITIQUE question 11).

### 6.6 The diagram grammar

Lines, ticks, bands and cells. That is the whole vocabulary.

- **Time runs left to right** on wide screens and top to bottom on a phone.
  Linear years, to scale, from AD 30 to this year; anything not to scale (the
  Bible's acts before AD 30) is drawn as a labeled cap and says so.
- **Certainty is drawn:** solid for attested, dotted for uncertain (an end, a
  birth year, Christendom's close), and a short range bar where scholars give a
  range. A pre-monarchy biblical date carries a range or two schemes (A 9).
- **Position, label and one mustard tick carry meaning; color never does** (A
  tension 5; `B-church-history-teaching.md` section 5, item 14). Bands alternate `--bone` and `--bone-warm`.
- **Labels in live text,** Inter at 12 px or more in `--ink-muted`, never
  baked into an image; each drawing is drawn twice, for 390 px and for about
  880 px and up (C 22).
- **Every drawing has an equal list** in a `<details>` ("As a list"), and every
  mark is a real button with an accessible name ("Council of Nicaea, 325").
  Nothing is available only on hover (Tse's rule, C 22).
- **No zoom, no pan, no canvas,** no chart or map library (MASTER-PLAN 2).

### 6.7 Data graphics

Only data the site holds and has checked: the Line, the life-lines, the region
grid with its empty cells, the creed's date rail, the act band, the year strip,
the gap ruler, the canon list's chapter counts. No statistics about religion
in America on any graphic until a named person has checked each figure against
its primary report (MASTER-PLAN 2). Counts are of things in the library
("seven witnesses on this verse"), never of people.

### 6.8 Motion

Motion appears only where it carries meaning, and is instant under
`prefers-reduced-motion`:

- a sheet rises in 200 ms on the existing motion tokens;
- the year rule steps to the new year in 120 ms when the reader changes it;
- the History overview's ink tick changes position as the list scrolls (no
  easing, no animation; it is a position, not an effect);
- the Line is never drawn on, faded in, or animated on load.

No parallax, scroll-jacking, autoplay or animated counters.

### 6.9 Night (dark mode)

Night is one low band, not black and cream alternating (CRITIQUE question 17):
the warm near-black already written as dark `--bone` (`#14110C`), surfaces one
step up (`--bone-warm`), ink as the light cream, hairlines in the dark `--line`.
Black sections become the same band, set apart by a hairline and spacing
instead of a fill. Drawings invert by token (ink lines become `--ink`, the tick
label uses dark `--mustard-text`). Night is offered in the Aa control and
follows the system theme. It ships only after the token audit and a render test
under the dark theme (CRITIQUE engineering question 19; MASTER-PLAN 10.7). The
admin stays a light workspace.

### 6.10 Proposed changes to the contract (proposals for James, not decisions)

- **P1. A text serif.** Add Source Serif 4, self-hosted under its open font
  licence, with its true italic, for Scripture, essays, notes, creeds, sessions
  and devotions. *Reason:* every long text is set in the button face and every
  italic is faked (CRITIQUE #7); a book is set in a text serif. Source Serif 4
  over Literata or EB Garamond because it is sturdier at 19 to 20 px on a
  phone and keeps Cormorant clearly the display voice; any of the three meets
  the need.
- **P2. The doors.** Study · History · Topics · Family · Essays, with About in
  the masthead. *Reason:* section 2.1. *Cost:* it reverses part of his
  2026-10-26 decision.
- **P3. Night.** Turn dark mode on as Night, after the audit. *Reason:* the
  pages that matter most are read in the dark (CRITIQUE #9). *Cost:* it
  reverses MASTER-PLAN 8.6's parking, and James has not asked for it.
- **P4. A type scale held as tokens,** with 7 rem as the ceiling for home and
  Part openers rather than a size every H1 reaches. *Reason:* headline sizes
  run from 44 to 80 px with no scale (CRITIQUE #7).
- **P5. The mustard rule made exact:** the four uses in 6.3 and "one non-link
  mustard mark per viewport," added to the palette rules; mustard-filled
  buttons (the footer Subscribe, "Read the book") retired. *Reason:* mustard
  is spent as paint today (CRITIQUE #10), and the drawings need a budget they
  can be held to.
- **P6. A drawn logotype and monogram,** and a series design for the three
  covers. *Reason:* nothing survives at 16 px; the favicon is a text "L" in
  whatever serif the device has (`brand.md`).
- **P7. A witness art program and real photographs:** one public-domain
  object per Part with a verified caption and recorded license; photographs
  of real rooms if James supplies them. *Reason:* there is not one map,
  diagram or image of the history on 25 pages (`brand.md`).
- **P8. One descriptor beside the name,** in James's words (the contract's
  tagline is one candidate). *Reason:* the masthead reads as a wellness brand
  to a stranger (`visitor.md`); the site has three taglines (`brand.md`).
- **P9. `/post-christian` and `/exile` re-pointed** from the one-essay section
  to the post-Christian topic page, and the wording of the Christendom bracket
  and the "not yet" caption set by James. *Reason:* the URLs already earn links
  and should land on the definition (`visitor.md`); the bracket is an argument
  his After Christendom essays make, and it is his to word.
- **P10. His headline without em-dashes:** "Learning to follow Jesus, and live
  well, in post-Christian America." *Reason:* no line should start on a dash
  (CRITIQUE page table); it is his chosen copy, so it is his to change.

---

## 7. What it cuts or folds from today's site

Each with its reason. Folds that need a redirect or touch the never-redirected
list are James's (CRITIQUE question 7; MASTER-PLAN section 12, question 12;
U66); nothing under `/theology/history` redirects.

| Today | Becomes | Why |
|---|---|---|
| "22 era essays" in one grid of two overlapping series | One ordered reading list on the Line, filed by Part; the eight broad essays marked *The short version* | Two series and three periodizations tell a careful reader the site does not know its own story (CRITIQUE #8, MASTER-PLAN 7.2) |
| Three periodizations (two essay kickers, the timeline's seven eras) | One: the course's Parts, used everywhere | Critique question 6; a drawing needs one spine |
| The timeline as seven equal accordions | The Line, to scale, and its list | Thirty years and three hundred took the same height (CRITIQUE #8) |
| Era essays ending in two links back to the hub | A series rail and *Next* on every one | A sequence with no next ends every reader after part one (`ia.md` C5) |
| "Everything on this" keyword shelves (`subjects.ts`) on history and family | Hand-filed relations through the time-keyed model (2.6) | Dating advice under church history; a promise about America under home and family (`ia.md` M9) |
| "The story you were born into" and "the creeds you confess" | An address to every reader | The skeptic was not born into it (`visitor.md`) |
| The black slab as the default page head | `PageHead` on cream; black only for weight | Used everywhere, black stopped marking weight (`brand.md`) |
| Home's "Start with these" chosen by the current book, the books band, two newsletter forms | Doors by the reader's question; the book as a line in the ending; one form | It narrowed the subject to nationalism and read as a funnel (`visitor.md`) |
| The essay's ending sales sequence | End mark, *Test this yourself*, sources and record, one next read | Endings leave weight (CRITIQUE #7) |
| "Send to my phone" on a phone | Desktop only | It offers to send the page to the phone in the reader's hand |
| The theology quiz | Retired; the twelve turns' questions at week 0 and week 12 | It tests disposition, scores into a retired taxonomy and uses a forbidden word (`learning.md` M3) |
| Deep Bible, the Bible Study Guide, the Passage Context tool | Folded into the Study Bible as notes and book introductions, one-hop redirects | One job built four ways (CRITIQUE #2); James's question 7 |
| The second glossary, second doctrine set, second creed hub | One each | CRITIQUE #2; James's question 7 |
| A separate contemporaries view (planned) | The year rule (4.3) | Already the plan's choice (MASTER-PLAN 7.2) |
| `/nation` as an orphan | Linked from the post-Christian topic page as its deeper library (URL kept; it is on the never-redirected list) | Seven fragments of the subject across five doors and an orphan (`ia.md` C2) |
| "Latest" on Home and `/writing` | The season or numbered issue | A feed exposes gaps and trains skimming (B tension 1, C tension 4) |
| The lead magnet and in-page signup on the skeptic track | Removed; the footer line stays | The skeptic's page asks him for nothing (B 2) |
| Scripture Memory's "memorized" toggle, counter and percentage | "Kept, not memorized," on the review ladder | MASTER-PLAN 2 forbids the percentage (C 7) |
| `GeneratedCover` and `GeneratedHero` on seven surfaces | Witness art or nothing | An image is a witness or it is absent (C tension 7) |
| The skeptic and new-believer plans under "Help in a hard season" | The Study door's router | Filed as pathology beside addiction and grief (`learning.md` C2) |
| Two back links to the same hub on deep pages | One, inside the breadcrumb | `ia.md` M6 |

---

## 8. Build path in this codebase

React 19 and Vite, wouter, static JSON content with validators, tokens in
`index.css`, inline SVG only, and two API runtimes. **Nothing in this
direction adds or changes an API procedure.** The Line, the registry, search
and every view read committed static JSON, so `api/index.ts` and `server/`
are untouched and `api-parity.test.ts` stays as it is. The one planned API
unit (U29) is unaffected.

### 8.1 The core pieces

- **`lib/line.ts`** (new, with tests): parse the site's date strings ("around
  30", "around 49 to 62", "c. AD 410-1000", "to AD 1054") into `{ from, to,
  certainty }` with `certainty` one of `exact`, `about`, `range`, `disputed`,
  `traditional`; the scale (year to x on a given width); label collision (at
  most five labels at 358 px, twelve at 1180 px); the "now" year, read from
  the build for prerender and from the device after mount.
- **`scripts/build-line.mjs`** (new): reads the registry (U30), or until it
  lands the existing `church-history-timeline.json`, the essays' `dateRange`
  and the councils, and writes `client/public/history/line.json` (Parts,
  hinges, the Christendom bracket, the America row) plus a small generated
  module for Home's static drawing. `--check` fails CI on drift (the
  `build-story-plan.mjs` precedent).
- **`components/history/Line.tsx`** (new): horizontal and vertical variants;
  inline SVG for the drawing with real HTML buttons positioned over the marks
  for focus and names; `As a list` in a `<details>`; marks open the existing
  `Sheet` with the id in the URL. Styles under `.hx-line` in `index.css`,
  tokens only.
- **Registry fields** (U30's files, MASTER-PLAN 7.2): `parts.json` (`id`, `n`,
  `title`, `from`, `to`, `question`); events gain `date` (`year` or `from`/`to`
  plus `certainty`), `part`, `hinge`, `before`, `after`, `carry`, `road[]`,
  `evidence`; people gain `born` and `died` as `{ year, certainty }`, `region`
  and `remembered`; sources gain `written`. `validate-history.mjs` checks:
  every mark has a certainty and a source; no hinge without a source line (or
  the stated reason it has none, B 8); at most fifteen hinges; no date after
  today; the Christendom bracket's end is uncertain; the home set stays legible
  at 358 px.
- **Search** (`lib/siteSearch.ts`, U15): a year recognizer after the reference
  parser and the crisis words; date fields on entity results; `?order=time`.
- **Joins:** a `date` on every relation node that has one, read by the topic
  arc, the essay foot, the verse strip and search through the same component.

### 8.2 Phases

**Phase 0, now to mid-November: decisions, no code.** Questions to James (in
the U02 manner, with pictures of the doors at 390 and 1440): P1 to P10, the
periodization (CRITIQUE question 6; this direction answers *the course's
Parts*), the hinges, the Christendom bracket's wording. Nothing below waits on
all of them; each item names its gate.

**Phase 1, November to December 18: the Line, inside the history units.**
`lib/line.ts`, `build-line.mjs` and `Line.tsx` built with U30 (registry) and
U31 (views): the History landing leads with the Line instead of the accordion
and the 22-row grid (U31's own retirement); hinge sheets by query parameter;
the timeline list; the year recognizer in search. The type-scale tokens and,
if James says yes to P1, the text serif's `@font-face` and tokens (a font file
and a token change, no layout work yet). Gate: none for the Line on the
History door (U31 already owns that page); P1 for the serif.

**Phase 2, December to January 11: the door and the home.** The session
template (U32) with the scene head, the depth switch, *Read it closely* and
*Compare the witnesses* (Thessalonica, all three sources stored); the Lives
view; the slice (U33) to James on January 11 as planned. Home's hero gains the
Line: `Home.tsx` and `scripts/prerender-heads.mjs` change together, the
drawing is static SVG in the prerendered HTML so first paint waits on nothing,
and Lighthouse must be no worse than after U08 (U18's bar). The doors PR,
only if James approves P2 (the U19 files and the Decision Log line). Gates: P2
for the doors; P10 and the bracket wording for the hero copy.

**Phase 3, January to March 12: into the Bible, doctrine and topics.** *The
church on this verse* (stage one, the 114 chapters' `interpretation` field)
and the act band, inside U37 (Study Bible for thumbs); *Where the words came
from* inside U44 (creeds); the doctrine landing at `/study/doctrine` (a static
route); topic pages gain `arc[]` and a list of verified witness cards in
U25's data and validator (the U48 window), with the post-Christian page as the
flagship and `/post-christian` re-pointed if James approves P9; the essay
foot's *Test this yourself* as a revision to U24's fixed foot order (written
into MASTER-PLAN 6.2 first); *Twelve weeks, twelve turns* on the era essays
that exist, with `?start=` and `?cadence=`; *The church remembers* in Lent with
Polycarp and Perpetua (U49); Part I live by March 12 (U51). Gates: the hinges
and the twelve turns' titles (James); his byline read on any new prose.

**Phase 4, spring to September 2027: the rest of the course and the
instruments.** Parts II to VIII (U53, U60 to U65), each adding its marks to the
Line; the region grid with its *Not yet written* cells; facing pages and the
controversies explorer (U54); stage two of the verse strip (verified source
cards); the gap ruler in Test the Case, only on cases whose dates the ledger
can stand behind; Night after the token audit (P3); the witness art program
(P7).

### 8.3 What reuses work already merged or reviewed

- **U07:** the corpus of 22 stored texts, the manifest and `verify-sources.mjs`
  (every source card, *Asked before*, *This week's source*, *Compare the
  witnesses*, *In their own words*); the survey decides which cards can exist.
- **U14:** `Sheet` (every hinge, person, verse and witness), `Stepper` (myth
  checks, table mode, the twelve turns' sittings), `PageHead` (every cream page
  head); `Position` ("Session 3 of 6").
- **U15:** `siteSearch.ts`, reference-first; the year recognizer sits after it.
- **U16:** `VerseRef` and the text shards (every passage in a hinge, a session,
  a topic arc or the twelve turns opens in a sheet).
- **U17, U18, U13, U10:** Tonight, table mode and the tonight line; the
  generated year map and `familyYear.ts` drive the year strip and *The church
  remembers*; the Advent surfacing helper becomes the season doors.
- **U19:** the committed nav map and `site-structure.test.ts`, which carry the
  doors change in one PR.
- **U21:** the age bands, reused by the session's *At the table* depth.
- **U25:** the topic pages and their `witness` field, grown into *Asked
  before*; `validate-topics.mjs` and `validate-politics.mjs` extended, not
  replaced.
- **U28:** the 2027 plan, which gains the act band and on-ramps.
- **Data already in the repo:** `story.json`'s eleven acts and their `dates`;
  the timeline's 68 events; 11 councils; 36 people; the 22 era essays and
  their `dateRange`; the `interpretation` field in 114 chapters;
  `covenant.svg` as the line style.
- **Helpers:** `lib/storage.ts`, `lib/calendar.ts`, `lib/myProgress.ts`,
  `lib/telemetry.ts`, `TakeItWithYou`, `EditorialIndex`.

### 8.4 What is new

`lib/line.ts`, `scripts/build-line.mjs`, `components/history/Line.tsx` and
`.hx-line` styles; the hinge sheet; the Lives view and year rule; the year
recognizer and date fields in search; the doctrine landing and the creed's date
rail; the verse strip; the topic arc block; the essay foot's history line;
`/theology/history/part/:n` (param route, 9.3 checklist),
`/theology/history/twelve` and `/study/doctrine` (static routes, literal
`SEOMeta`); the twelve turns' data in `client/public/history/twelve.json` with
a validator (twelve weeks, each with a passage, a hinge, a creed line, a
question; every link public through `isPublicEssayHref`); the text serif and
type tokens if approved; one telemetry event, `hinge_open` with the hinge id
only, added to MASTER-PLAN 9.9 before it ships.

### 8.5 The biggest risks

1. **The drawing promises more than the course holds.** The Line spans twenty
   centuries in the first week; the sessions arrive Part by Part until
   September 2027, and the registry holds 36 people. *Mitigation:* every mark
   opens something real today (an era essay, a timeline entry); the region
   grid says *Not yet written*; the twelve turns launch on the era essays; the
   Line never shows a mark that opens nothing.
2. **Every date is a claim.** A to-scale drawing turns every year into an
   assertion a skeptic will check. *Mitigation:* certainty is drawn; the
   validator requires a certainty and a source on every mark; each hinge's
   date and source line goes in a ledger; anything unverifiable is cut, as the
   contract says.
3. **Legibility on a phone.** Two thousand years in 358 px is about a sixth of
   a pixel per year, and the fourth and sixteenth centuries crowd.
   *Mitigation:* the phone draws Parts and at most five labeled ticks; the
   full detail lives in the list, the vertical overview and the sheets; the
   collision check runs in CI on the home set.
4. **History crowding out the reader with a Tuesday problem.** *Mitigation:*
   Find Help first in every header; the tonight line on Home's first screen;
   care pages keep their practical first screen; the Line is a door, never a
   gate.
5. **Nostalgia, triumph or a sedative.** "The church has been here before" can
   become comfort that excuses the present, or a lament for Christendom.
   *Mitigation:* the reckonings are hinges drawn in the same ink;
   `validate-politics.mjs`' both-directions rule runs on every arc and hinge;
   the rhyme sentence says where the likeness breaks; the mirror in every
   session speaks as "we."
6. **James's time and his gates.** The doors, the serif, the periodization, the
   twelve hinges, the bracket's wording, the introductions to Readings, the
   art program. *Mitigation:* each item ships independently; the History-door
   Line needs no gate; the questions go out together with pictures, and the
   defaults are stated (keep his five doors; Inter with a true italic; the
   course's Parts).
7. **First paint and payload on Home.** *Mitigation:* the hero drawing is
   static SVG generated at build (target under 8 KB), prerendered with the
   hero, no script needed to see it; the interactive layer hydrates after
   mount; Lighthouse is checked against U08's result, as U18 was.
8. **Accessibility of drawings.** *Mitigation:* every mark is a real button
   with a name; the list equivalent is always one tap away; contrast of every
   label checked on cream and black; axe on the History door and Home in the
   blocking set (CRITIQUE engineering question 21).
9. **Scope creep toward spectacle.** A successful Line invites a zoom, a map,
   an animated river. *Mitigation:* the rules in 6.6 and 6.8 written into the
   pattern page for `Line` (C 21) with "when not to use it"; the atlas stays
   James's call after the slice (U68).
10. **The doors change lands three days after the last one.** *Mitigation:* the
    direction works with his five; P2 is offered, not assumed.
