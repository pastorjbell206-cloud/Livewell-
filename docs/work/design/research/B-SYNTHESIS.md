# B. Synthesis: living after Christendom, church history, faith at home, the skeptic

Prepared 2026-10-27. Wave B of the design research for the LiveWell redesign,
answering James's brief ("the most organized, well-designed website that helps
people to study the Bible, to understand doctrine, to understand what a
post-Christian world is in America, and how to live it ... tools and resources
available ... very critical of what currently is, with a fresh vision ...
interactive, with things that draw people's attention ... a useful tool for
people to study and learn and grow").

**Inputs.** The four cluster reports in this folder:
`B-post-christian-thought.md` (PCT; 44 searches; no code, none of its products
is open source), `B-church-history-teaching.md` (CH; 45 searches; Knight Lab's
TimelineJS3 and StoryMapJS and Sefaria's text timeline read as code),
`B-family-discipleship.md` (FAM; 40 searches; LiveWell's own family code and
data read) and `B-skeptic-facing.md` (SK; 45 searches; Nicky Case's *The
Evolution of Trust* read as code). Read against `CLAUDE.md`,
`docs/work/plan/benchmark.md`, `docs/work/plan/MASTER-PLAN.md` sections 0 to 3,
6 and 7.2, and `A-SYNTHESIS.md` (wave A), whose patterns this file cites as
"A 10" and so on rather than repeating. Nine further searches were made for
section 4 (listed at the end). Pattern numbers in "Merged from" refer to section
2 of PCT and SK and section 4 of CH and FAM.

**Limits carried over.** No live page, screen or app of any product in this
wave was seen; every claim about a product came through search summaries of its
own pages, help text, listings, reviews and church pages that reuse it.
Nothing here describes a layout that a source did not describe in words. No
product figure in this file is a figure for the site (MASTER-PLAN section 2:
no statistics until a person has checked the primary report).

**Checked in the repo for this synthesis**, so the patterns are sized right and
three cluster suggestions are corrected:

- `client/src/data/answers.ts` holds **35** Honest Answers; six of them are
  second- or third-order questions by their slugs (`is-hell-forever-or-does-it-end`,
  `does-god-choose-us-or-do-we-choose-him`, `can-you-lose-your-salvation`,
  `how-should-a-christian-read-genesis-1`, `what-about-those-who-never-heard`,
  `what-does-the-bible-say-about-divorce-and-remarriage`), as SK 6 says.
  `client/src/data/argumentCases.ts` holds **nine** Test the Case arguments
  (resurrection, hell, meaning, evil, gospels, jesus, wishful, pluralism,
  faith), each move carrying `grants`.
- `client/src/pages/SkepticTrack.tsx` imports `NewsletterSignup` (line 16) and
  `PillarLeadMagnet` (line 17) and renders both (from lines 198 and 210). SK 2
  is right that the skeptic's own page asks him for something, against
  MASTER-PLAN 3.1.
- `client/src/lib/shelf.json`: 8 sections, 58 essays, **15 live and 43
  pending**. There is no `/corrections`, `/letters`, `/readings`, `/exchanges`
  or seasons route in `client/src/App.tsx`.
- Family devotion questions are plain strings with no `kind` field
  (`client/public/family-devotions.json`), so FAM 4's labels are a re-tagging
  job plus new writing.
- **The U07 sources survey** (unit in review; the survey is patch
  `docs/work/patches/U07/0002`, and the 22 stored texts are patch 0001, not yet
  in this checkout's `scripts/data/`) was read against every source the
  clusters name. *Stored:* the Martyrdom of Polycarp, the Passion of Perpetua,
  Tertullian's *Apology*, the Epistle to Diognetus, Ambrose's Letters 40, 41
  and 51, Theodoret's *Church History* Book 5, Augustine's *City of God* Book 5
  (Dods), Athanasius's *De Decretis* and *On the Incarnation*, and Pliny 10.96
  inside McGiffert's note to Eusebius 3.33. *Reachable, not stored:* Arius's
  letter in Theodoret 1.4, Lactantius's *Deaths of the Persecutors* 44,
  Eusebius's *Life of Constantine* 1.28 to 1.32, *City of God* 14 and 19,
  Douglass's *Narrative* (PG 23), Woolman's *Journal* (PG 37311), Luther's
  Ninety-five Theses (PG 274, translator not named). *Not reachable:* Luther's
  speech at Worms and the Xi'an monument (781). *Not in the survey at all:*
  Symmachus's memorial on the Altar of Victory and Alexander of Alexandria's
  letters. *In copyright:* King's letter. Patterns 3, 6, 8, 9 and 25 below are
  adjusted to this.
- **A calendar conflict.** PCT 7 proposes a church-history read-along
  beginning Ash Wednesday, February 10, 2027. Part I is due live by March 12
  (MASTER-PLAN 7.2), so a Lent 2027 read-along of Part I cannot start on Ash
  Wednesday. The first read-alongs that fit are the January 2027 whole-story
  plan (U28 exists) and Part I after Easter, or Lent 2028 (pattern 11).

---

## 0. The verdict

Wave A found that the best study products layer depth behind calm. Wave B's
products teach something different: **how a serious house earns trust and a
return visit without a feed.** The best of them share three habits, and none
has all three.

**A shape in time.** *Plough* and *Comment* organize a quarter around one
theme; *Mere Orthodoxy* sends three journals a year; *Breaking Ground* began,
asked one question, ended, and became a book; the Keller Center runs eight
Wednesdays and stops; the Episcopal calendar of witnesses brings a person back
on the same day every year; the Jesse Tree and Resurrection Eggs hang a season
on one object a day. A reader knows what this season is, when it began and
that it ends.

**The other side in a real chair.** *Unbelievable?* has sat a Christian beside
a non-Christian since 2005 and its guests say the atheist sometimes does
better; the Veritas Forum gives equal time and a moderator who is neither
speaker; BioLogos published a decade of dialogue with the camp it disagrees
with; After Babel says it exists "to elicit objections and alternate theories"
and keeps an errors page its own book points to; Smarthistory replaced the
textbook voice with two people who disagree. Stanford's *Reading Like a
Historian* and the OER Project teach the reader to check the source himself.

**Readers turned into hosts.** *Comment* sends a supper kit with each issue
and a Lutheran church reuses it; *First Things* readers run their own monthly
circles; Alpha writes the host's rules down ("not to have all the answers or
to win an argument") and promises "no pressure, no follow up"; the Gospel
Project sends a card home every Sunday; Whitney tells a tired father that ten
minutes, read and pray, is enough.

Where the field fails, it fails the same way in every cluster: debate as sport
and the skeptic as a target (Reasonable Faith's *Questions to Ask an Atheist*);
contests and rewards (Lent Madness's bracket, Superbook's points, the
Cold-Case kids' certificate); urgency and counts (membership deadlines,
Parent Cue's countdown of a child's remaining weeks, conversion counts);
spectacle that replaces the source (Histography's dot cloud, immersive
staging); and a single messenger above question (RZIM).

LiveWell's open ground is to do all three habits on one free site in one
voice, and to make the honesty visible at the level of structure rather than
tone: the objection quoted before the answer, what the answer does not settle
printed beside it, the losing side's own words on the facing page, a public
corrections log, and a church year that gives the reader a reason to come back
that is a date, not a streak. Most of the machinery exists (Test the Case's
`grants`, the U07 verifier, table mode, the year map, *Take it with you*). Most
of the 25 patterns below are structure over content LiveWell already holds or
has already planned; the ones that need James's own writing or time say so.

---

## 1. What world-class means here: the patterns that recur

Ten moves recur across the best products in the four clusters.

| # | The move | Done best by | Also strong | LiveWell today |
|---|---|---|---|---|
| 1 | **A shape in time, not a feed.** A season, an issue or a run with a start, a question and an end. | *Breaking Ground* (2020 to 2021, then a book) | *Plough* and *Comment*'s themed issues; Keller Center cohorts; Explore God's city seasons; *The Big Conversation*'s seasons of six | Advent and Holy Week sets; the 2027 whole-story plan (U28); a Substack newsletter; "Latest" on `/writing` |
| 2 | **The other side gets a real chair.** The objector speaks in his own words, at full strength, before any verdict. | *Unbelievable?* (a Christian and a non-Christian, a host who does not rig it) | Veritas Forum's equal time; BioLogos's comparison page and its published dialogue with Reasons to Believe; Smarthistory's two voices; After Babel's rival theories, one per post | The steelman rule; Test the Case's objections; "How it looked from the other side" planned (7.2); `validate-politics` both directions. No quoted objection field |
| 3 | **Say what the argument does not settle, and what you got wrong.** | AnxiousGeneration.com's "Errors in The Anxious Generation" (June 8, 2024), which the book points to | Psyche's date-stamped, reviewed guides; *The Evolution of Trust* naming its model's limits; Priestley's dotted lines for uncertain dates | Test the Case's `grants`; private claims ledgers; a "Revised" date planned (6.2). No corrections page |
| 4 | **The source in the reader's hand.** | The Trinity Forum's Readings (a classic, introduced, with questions) | Christianity Explored printing all of Mark in the guest's handbook; Uncover's printed Gospel; Stanford's document sets; *A History of the World in 100 Objects* | The U07 corpus and verifier (in review); the Study Bible. No page that sets a primary text before a lay reader |
| 5 | **A way of reading taught once and used everywhere.** | Stanford's four moves (sourcing, contextualization, close reading, corroboration) | OER Project's Three Close Reads and four claim testers; Rapoport's rules; Godly Play's "I wonder" | Part 0, *How to Read the Dead*, and the myth check, both planned (7.2) |
| 6 | **A unit a person can hold.** | Noll's *Turning Points* (about a dozen hinges) | Shelley's scene-first chapters; 100 Objects; one Reading in one sitting; Whitney's ten minutes | 72 devotions; 35 Honest Answers on one long page; sessions planned at 3,000 to 4,000 words |
| 7 | **Readers become hosts.** The publication supplies the kit; the reader convenes. | *Comment* Suppers | *First Things*' ROFTers; Alpha's host guide; Gospel Project's card home each week; Orange's Parent Cue in every folder | 68 group guides with leader notes; *Take it with you* (#534); the weekly sheet planned (U20). No host kit |
| 8 | **One truth at more than one depth, in the same order.** | OER Project's articles at several reading levels | Ligonier's five-minute podcast beside its lectures; *Cold-Case Christianity for Kids* in the adult book's chapter order; McLaughlin's adult and teen books; NCC's two registers | The catechism's two registers; The Table's two bands (U21). No short session, no teen skeptic path |
| 9 | **The household runs on time and objects.** Small promised time, the hours a family already has, a thing to hold. | Whitney's *Family Worship* (read, pray, sing; brief, regular, flexible) | Parent Cue's four daily cues; Resurrection Eggs (the last one empty); the Jesse Tree; *Every Moment Holy*'s liturgies for ordinary acts | Table mode with the screen kept awake; printable cards; the Advent booklet; Listen by device speech |
| 10 | **One messenger, answerable.** A single voice that signs its answers and says who checks it. | Reasonable Faith's Question of the Week (numbered, dated, the letter printed, the answer signed) | Jake Meador's personal letter; Got Questions' named review chain; RZIM (2020 to 2021) as the warning | One voice and the byline rule. No public statement of who holds the writer to account |

**What world-class means in this wave.** It is not polish; no screen in this
wave was seen, and the products that last are rarely the best-looking. It is a
structure of trust (moves 2, 3, 10), a structure of time (1, 9), and a hand-off
from the page to a room (4, 7, 8). The products that come nearest each hold one
piece: the Trinity Forum the primary text, *Unbelievable?* the chair, *Comment*
the table, the calendar of witnesses the date, Whitney the permission. Each is
inside one tradition, or behind a fee, or built on a staff and a crowd of
voices. A free site in one voice can hold all of them at once, and every move
above can be built without accounts, scores, a feed, or a chart library.

---

## 2. The patterns most worth bringing to LiveWell, ranked

Merged and de-duplicated from the 58 ranked patterns of the four clusters.
Ranked by value to the four readers (the skeptic winning ties), the PCN
channel, and effort. **Fit:** core (the redesign should not ship without it),
strong (clearly right; schedule it), maybe. **Effort:** S is days, M is a unit
of one to two weeks, L is several units or sustained content work. Every pattern
obeys MASTER-PLAN section 2: shareable state in the URL, personal state on the
device through `lib/storage.ts` and said plainly, no accounts, no scores, no
counts of people, tokens only, one translation per page, no first person
supplied for James, and one surface retired for each one added.

### 1. The objection at full strength before any answer: four moves, quoted where it matters

*Merged from:* SK 1; PCT 3 (the quoted objection).

**What it is.** Every skeptic-facing answer makes four moves, in order, on the
page: the objection stated so its holders would sign it; what the objection
gets right; the answer; what the answer does not settle. Where an essay or topic
page turns on an objection, the objection is quoted from its strongest named
defender, with source and one line of context, and set apart at the essay's own
hinge, never before the first sentence. Before a piece goes live, someone who
holds the objection reads the first move and says whether it is his view.

**Done best by.** Rapoport's rules as Daniel Dennett gives them (re-express the
other view so well its holder says "I wish I'd thought of putting it that way,"
list agreements, say what you learned, only then rebut); Bryan Caplan's
ideological Turing test (EconLog, 2011); After Babel's stated purpose and its
one-rival-theory-per-post habit; John Dickson's "you have to concede a lot";
*The Evolution of Trust*, which names its model's limits at the conclusion;
LiveWell's own Test the Case `grants`.

**On LiveWell.** In `answers.ts` each entry gains three required fields:
`steelman` (*Put at its strongest*, one or two sentences, rendered first),
`concedes` (*What it gets right*) and `doesNotSettle` (*What this does not
settle*, Test the Case's own word), labeled in small Inter caps over a hairline
as A 3 labels layers. The seeker still gets the direct answer on the entry's
first screen, because the steelman is a sentence, not a section. The `answers`
validator, already in the content gates, requires all three. Essays and topic
pages gain an optional `objections[]` (`quote`, `source`, `context`,
`answeredAt`) rendered as a quiet indented block, *The strongest case against*;
the validator requires a source, and where the objector's text is public domain
the U07 verifier checks the quotation, otherwise the ledger records the method
used. Test the Case intros gain the same `steelman` line. The ledger records
"objection read by someone who holds it: yes, on <date>" or "not yet," with no
name published. Retires nothing; it reshapes `answers.ts` and the essay foot
(a line in MASTER-PLAN 6.2's fixed foot list first).

**Fit, effort.** Core · M (schema, renderer and validator are small; 35
steelmen and the outside reads are the work).

**Evidence.** The Marginalian, Big Think and Skeptic UK on Dennett; LessWrong
and EA Forum on Caplan; Haidt's post on After Babel's goal and the Twenge and
economic-deprivation posts; Eternity News and Outreach on Dickson;
`ncase_trust/words.html`; `argumentCases.ts`. (SK 2.1; PCT 2.3.)

### 2. The skeptic's page speaks to him and asks him for nothing

*Merged from:* SK 2; SK avoid 1, 2, 4, 15; PCT avoid (urgency and social proof).

**What it is.** The pages a skeptic reads speak to him, never about him.
Material that equips Christians to talk with skeptics lives in leader notes,
group guides and the pastor's sheet. No skeptic-facing page asks for an email,
a sign-up or a verdict, and the first screen says who wrote it and what he
believes.

**Done best by.** Alpha's "no pressure, no follow up, no charge" and Nicky
Gumbel's early "no one chasing them"; Christianity Explored, which names its
last session "Come and Die," so its aim is never hidden. Against: Reasonable
Faith's *Questions to Ask an Atheist*, in the archive the atheist is invited to
read; Randal Rauser's "what good is it if you win every argument but lose your
audience?"

**On LiveWell.** (a) `SkepticTrack.tsx` drops `PillarLeadMagnet` and the in-page
`NewsletterSignup` (confirmed above); the footer's quiet newsletter line
remains. (b) A word check in the content gates for skeptic-facing surfaces
(`/answers`, `/skeptic-track`, `/tools/test-the-case`, the Doubt essays, the
*Is Christianity actually true?* topic row) flags "atheist friend," "unbeliever
in your life," "win," "tactic," "ammunition," "defeat," and "lost" used as a
label, with an allowlist for quotations. (c) Equipping copy ("how to use this
with a friend who doubts") moves to group guides and the weekly pastor's sheet.
(d) No "Where do you stand now?" picker after any argument. The page's one
offer becomes the host kit addressed to his friend (pattern 18).

**Fit, effort.** Core · S. Retires the lead magnet on the skeptic track.

**Evidence.** Alpha Team Guide and Equip on Gumbel; Christianity Explored
session list; Reasonable Faith Q&A title; Rauser's essay; Bedard on straw men;
`SkepticTrack.tsx`; MASTER-PLAN 3.1. (SK 2.2.)

### 3. Readings: a primary text, introduced, with questions, gathered in collections

*Merged from:* PCT 1; CH 12 (before and after this text); A 23 (sources in
history's order).

**What it is.** A short primary text from the church's long memory on its own
page: a one-line head (who, when, where), an introduction by James, the
public-domain text with its section numbers (a toggle), five to seven inductive
questions for one evening, and *If you want more* (the history session, the
Study Bible passage, the essay). On creeds, councils and major texts, a dated
list in three parts: *It drew on* (Scripture first), *Written alongside*, and
*Who answered it*, each item opening its sheet. Readings are gathered into
collections across centuries.

**Done best by.** The Trinity Forum's Readings (King's *Letter from Birmingham
Jail* with introductions by Robert M. Franklin and Andrew Young; Sayers's *Creed
or Chaos* with David W. Miller), its Faithful Citizenship and Prisoner's
collections, and its moderator's rule ("lead as inductively as possible ... and
avoids lecturing"); *Mere Fidelity*'s one-classic-text episodes; Sefaria's
`timeline.js`, which partitions a text's links into past, concurrent and future.

**On LiveWell.** `/study/readings` and `/study/readings/:slug` (a param route
through the 9.3 checklist). Texts reuse the U07 corpus and verifier, so every
word on the page is a normalized substring of the stored text; free text on the
page, never a paid download. A first collection, *When the church had no
power*, is buildable from what U07 already stores (the Epistle to Diognetus,
the Martyrdom of Polycarp, *City of God* Book 5 in Dods); a second, *The church
against itself* (Douglass's 1845 appendix on "the Christianity of this land,"
Woolman's *Journal*), needs both texts fetched from their reachable Gutenberg
mirrors first. `sources.json` gains `drewOn[]` with the inverse computed at
build; the validator checks that links resolve and that dates run the right
way. A worked example to verify: the Creed of Nicaea, drawing on Scripture and
earlier rules of faith, answered by Athanasius's *De Decretis* (stored),
restated in 381 and received at Chalcedon. Each Reading prints through *Take it
with you* and carries *Host a table* (pattern 18). James's introductions (600
to 1,200 words each) fall under the byline rule, so the shelf starts at six.
Retires the loose further-reading lists on the history page.

**Fit, effort.** Core · M.

**Evidence.** TTF product pages, collection pages and reading-groups page; a
church's TTF leader guide; Mere Fidelity episode pages; Sefaria
`static/js/timeline.js` (`partitionLinks`, `buildPastTree`, `buildFutureTree`);
the U07 survey. (PCT 2.1; CH 4.12.)

### 4. A season's question, and an archive read by season, passage and date

*Merged from:* PCT 2, PCT 8; SK also-considered (a skeptic season through PCN
churches; Explore God); A 13 (the shared week).

**What it is.** Three seasons a year on the church calendar (Advent to
Epiphany, Lent to Pentecost, the ordinary season), each organized around one
question from the shelf's sections. A season page gathers four to six pieces,
mostly existing, and says when the season ends; past seasons become an archive.
The essay archive can also be read by passage and by date.

**Done best by.** *Plough Quarterly* and *Comment* (one theme per issue;
"a crafted feature of narrative, argument, conversation, and art");
*Mere Orthodoxy*'s three journals a year (Issue 2 on nations and nationalism);
*Breaking Ground* (a declared start, a question, an end, then a book); Explore
God (the same seven questions across a city, on dates); Gospel in Life (every
sermon carries its series, its Scripture and its date).

**On LiveWell.** `/writing/seasons/:slug`: James's opening letter; an essay, a
Reading, a Study Bible passage with its context guide, a history witness, the
family strand's devotion for the season, and the host kit; then "This season
ends on Pentecost, May 16." `/writing` gains a quiet *This season:* line, and
an archive of past seasons replaces *Latest*. `?by=passage` lists essays under
the books and chapters they treat, in canonical order, built from the inbound
citation index A 1 proposes (`build-verse-index.mjs`), so the Study Bible's
"Go deeper" and this view share one data file; `?by=date` lists revised dates.
Topic pages stay evergreen and link the season that treated them. The question
is James's to choose and word; a candidate first season is Lent to Pentecost
2027 from *After Christendom* or *Faith and Power*. The newsletter follows the
season (pattern 19).

**Fit, effort.** Core · M (the season page and its data); S for the passage and
date views once the verse index exists. Retires *Latest* on `/writing`.

**Evidence.** Plough's `llms.txt` and subscription pages; *Comment*'s issue
archive and home page; Mere O's Issue 2 post and membership pages; *Breaking
Ground* book listings and *Foreword Reviews*; Explore God local press;
gospelinlife.com topic pages and About page. (PCT 2.2, 2.8; SK 2 also
considered.)

### 5. Honesty you can see: corrections, review dates, how we check, who holds the writer to account

*Merged from:* PCT 4; SK 12; PCT 13 (the review date only).

**What it is.** A public, dated log of substantive corrections, linked from
every corrected piece; *Reviewed [date]* on counsel pages; a short page on how
claims are checked; and on About, a plain statement of who holds the writer to
account and how a reader can raise a concern with someone other than the
writer.

**Done best by.** AnxiousGeneration.com's "Errors in The Anxious Generation"
(dated June 8, 2024), to which the book itself sends readers ("where I will do
my best to correct any errors I have made"); Psyche's guides, "date-stamped and
routinely reviewed," with a page titled "Are Psyche Guides reliable?"; Got
Questions' named review chain. The warning: RZIM, whose board regretted that
"misplaced trust in Ravi" had given him "less oversight and accountability than
would have been wise and loving."

**On LiveWell.** `/corrections` under About and in the footer (date, piece,
what it said, what it says now), generated from an optional `corrections[]` on
essays, answers, topics and care pages; the essay foot shows *Corrected
[date]: [one line]* beside the planned *Revised* date. Care and topic pages show
*Reviewed [date]*. *How we check* (about 300 words): the claims ledgers, the
verbatim checks against stored texts, the quotation gate, the byline rule,
stated for readers. *Who holds me to account* on `/about`: First Baptist Church
of Fenton and its leadership as James describes them, the review each piece
receives, the corrections page, and a contact for concerns that does not go to
James, only if he names one. No speaking-fee language, no "world-renowned"
framing anywhere. Validator: every correction has a date and a description.

**Fit, effort.** Core · S (the accountability copy is gated on James).

**Evidence.** AnxiousGeneration.com research page and a reader's highlight of
the book's note; psyche.co pitch and reliability pages; Got Questions apply
page; AP, Baptist Press and Premier Christianity on RZIM and the board's letter
as quoted. (PCT 2.4, 2.13; SK 2.12.)

### 6. Read the source like a historian, and say how we know

*Merged from:* CH 1, CH 8; A 9 (honest uncertainty).

**What it is.** Every source card in the history course carries a closed *Read
it closely* disclosure with four prompts (who wrote this, when, to whom, and
why; what was happening; what does it claim, and how; who else saw it, and do
they agree), a pause, then two to four sentences labeled as James's reading.
Where two or three stored sources tell one event, *Compare the witnesses* sets
them side by side in the order they were written, with the gap from the event
stated. Every event and person carries a witness label: eyewitness or
participant, written within a generation, a later account about N years after,
tradition, legend. Part 0 teaches the four moves once; every later card reuses
them.

**Done best by.** Stanford's *Reading Like a Historian* (a central question and
a document set per lesson; sourcing, contextualization, close reading,
corroboration); the OER Project's Three Close Reads and its four claim testers
(intuition, logic, authority, evidence); Priestley's 1765 chart, solid where
dates are certain and dotted where not. The counterexample: *Christian History*
magazine's deliberate choice to drop footnotes.

**On LiveWell.** Session pages (U32): a block `type: "compare"` with two or
three source ids; registry sources gain `written` (a date with a margin);
events and people gain `evidence` (`kind`, `writtenAfterYears`, `note`), shown
in small caps under the date and as a timeline filter
(`/theology/history/timeline?evidence=contemporary`, U31). Candidates checked
against the U07 survey: Thessalonica 390 told by Ambrose's Letter 51,
Theodoret 5.17 to 5.18 and Augustine's *City of God* 5.26, **all three
stored**, so the slice can carry it; Constantine's vision in Lactantius
(*Deaths of the Persecutors* 44) and Eusebius's later *Life of Constantine*
1.28 to 1.32, both reachable but not stored; Pliny 10.96 (stored in
McGiffert's note) beside Tertullian's *Apology* (stored; that the file holds
chapter 2, which discusses the letter, is to check). No score; notes stay on
the device. Validator: every James reading under 80 words and labeled; every
compared source has a `written` date.

**Fit, effort.** Core · M (the component is small; the readings are writing).

**Evidence.** AHA and Common Sense on SHEG; Teaching Civics on the Historical
Thinking Chart; OER Project blog and AP syllabus; University of Oregon on
Priestley; CHI's "Why Christian History doesn't use footnotes"; the U07
survey. (CH 4.1, 4.8.)

### 7. Enter through a person and a question

*Merged from:* CH 3, CH 14, CH 13; A 5 and A 14.

**What it is.** Each session opens with the historical question it answers, in
the reader's words, and under the title a dated scene of one or two sentences
in Cormorant, every detail taken from a source, with a strip beneath (Place ·
Date · Source) that opens the source card. The session closes by returning to
the question: *Answer it now in a sentence*, kept on the device. A person's
sheet may carry *In their own words*: five short verified excerpts with a line
of context each, shown only when five pass the verifier.

**Done best by.** Shelley's *Church History in Plain Language* (every chapter
opens on "characters, setting, plot"); *Christian History*'s house rule to "add
anecdotes" (taking the scene, not the missing footnotes); *A History of the
World in 100 Objects*; Stanford's central question per lesson; Ligonier's
"Luther in 5 Sayings."

**On LiveWell.** The U32 page head and close, tested in the U33 slice. The
candidate scene is Polycarp before the proconsul (the Martyrdom is stored;
chapters to verify). The validator requires `scene.source` to resolve to a
registry source and a verified excerpt; no invented interiority or dialogue; no
first person supplied for James. The close reuses A 14's answer component, so
one component serves the Bible, doctrine and history. Five-sayings sheets start
with the stored writers (Tertullian, Athanasius, Ambrose, and Polycarp's words
as the Martyrdom reports them); Augustine needs more than Book 5 stored first.

**Fit, effort.** Core · S.

**Evidence.** Shelley publisher copy and reviews; CHI editor's column; BBC and
Wikipedia on 100 Objects; StoryMapJS `seurat.json` (overview, then each stop);
AHA on SHEG; Ligonier *5 Minutes* episode index. (CH 4.3, 4.13, 4.14.)

### 8. The shape of two thousand years: a dozen hinges, a region grid that shows its gaps, each Part opened like an issue

*Merged from:* CH 2, CH 10, CH 11; A 10 (the band component).

**What it is.** The course front door hangs the whole story on about a dozen
named hinges, each with a short sheet: *The world before*, *What happened*
(date, place, people, one source line), *The world after*, *What we still
carry*, and *The road to it* (three to five build-up events). Below it, a
compact grid of regions (Latin West, Greek East, Africa, Syria-Persia-Asia, the
Americas, the global church) by the nine Parts: filled cells open the filtered
timeline, empty cells say *Not yet written*. Each Part opener carries the
furniture of a magazine issue: a timeline spread, *Questions people ask*, *In
their own words*, and recommended reading that says which primary sources are
free online.

**Done best by.** Noll's *Turning Points*; Big History's eight thresholds;
Shelley's eight named ages; the Met's Heilbrunn Timeline (region by period, each
cell with an overview, key events and up to ten works); the Dictionary of
African Christian Biography; *Christian History*'s recurring timeline, FAQs,
quotations and resources. The warning: Histography, where a timeline shows only
what its sources (Wikipedia) hold.

**On LiveWell.** `/theology/history` (U31): A 10's band from AD 30 to now with
one tick per hinge, past ticks in `--ink-muted`, one mustard tick for "you are
here," the same hinges as an ordered list beneath; `?hinge=worms-1521`; cells
link to `/theology/history/timeline?part=iii&region=asia`. `events.json` gains
`hinge`, `before`, `after`, `carry`, `road[]`; `regions.json` and a `region` on
every registry entry; `parts.json` with `faq[]`, `quotations[]` (excerpt ids)
and `reading[]`. The validator caps hinges at fifteen and requires a source
line, which the U07 survey complicates: Luther's speech at Worms is not
reachable (and whether he said "Here I stand" is debated), so the Worms sheet
either takes its line from another reachable Luther text or the validator
accepts "told in the narrative, no reachable text" with the reason; the Xi'an
monument (781) is not reachable either, which is exactly the kind of hard cell
the grid exists to show. The empty cells make MASTER-PLAN 7.2's commitments (at
least twenty women, the Black church, the church outside the West after
Augustine) checkable by reader and editor. Part pages are nine param routes with
literal meta, or, if James prefers fewer routes, the head of each Part's first
session. James chooses the hinges from the plan's Parts.

**Fit, effort.** Core · S to M.

**Evidence.** *Themelios* and *Pneuma Review* on *Turning Points*; OER Big
History unit guide; Met TOAH about and chronology pages and the CAA review;
DACB "What is DACB?"; CHI issue 144; FlowingData and USask on Histography; the
U07 survey. (CH 4.2, 4.10, 4.11.)

### 9. Both sides in their own words before the verdict: positions at equal length, and the facing page

*Merged from:* SK 6, CH 7, PCT 3 (*Where faithful Christians disagree*); A 20;
CLAUDE.md, "Handling a contested doctrine."

**What it is.** On a second- or third-order question, each position is set out
in a paragraph of the same width and about the same length, in its defenders'
best terms, with who has held it across the centuries and the verses it rests
on; one line names the order of the question ("This divides faithful churches;
it does not divide the faith"); only then come *Where James lands* and the
objection he has not fully answered. In history, *How it looked from the other
side* becomes the facing page: two verbatim excerpts side by side (stacked on a
phone), the losing side first, one line on what each feared, then James's
labeled verdict below both. Where a side survives only in its enemies'
quotations, the page says so.

**Done best by.** BioLogos's comparison page (its own view beside the three it
rejects) and its decade of dialogue with Reasons to Believe, published as
*Old-Earth or Evolutionary Creation?* (IVP Academic, 2017); Smarthistory's
two-voice conversation, chosen because it "reveal[s] disagreement"; Stanford's
corroboration. The contrast: Got Questions' one house answer to contested
questions ("once you start giving alternative viewpoints, where do you draw the
line?").

**On LiveWell.** The six second-order Honest Answers listed above get a
`positions` block before the answer; the `answers` validator requires it on
entries tagged second-order and fails if one position runs more than half again
as long as another. Topic pages (U25) take the same block. History sessions and
controversy pages (U32, U54) take a `facing` block with two source ids.
Candidates against the U07 survey: Arius's letter to Eusebius of Nicomedia
(Theodoret 1.4) is reachable, but Alexander of Alexandria's side is not in the
survey and must be located; Symmachus's memorial on the Altar of Victory (384)
is not in the survey either, so check whether the NPNF Ambrose volume (already
the source of the stored Letters 40, 41 and 51) carries it before choosing it;
Luther and Erasmus only if both exist in public-domain English. James reads
every landing.

**Fit, effort.** Core · M.

**Evidence.** BioLogos Common Questions comparison title; IVP and reviews of the
RTB dialogue; AP on "gracious dialogue"; gotquestions.blog on alternate
viewpoints; Harris and Zucker, "Conversation is the Key"; the U07 survey.
(SK 2.6; CH 4.7; PCT 2.3.)

### 10. The smallest faithful version, and four doors in a day

*Merged from:* FAM 1, FAM 3, FAM 12; FAM 9 (a recorded voice, gated on James).

**What it is.** A second way to start the devotion that is explicitly enough:
*Read and pray*, about three minutes, still ending on "We did this tonight."
At the foot of each devotion and on the back of its card, the week carried into
the other three times a family is together, under Deuteronomy 6:7: *In the
morning*, *On the road*, *At the table*, *At bedtime*. Under the age switch,
one line on what each age can carry.

**Done best by.** Whitney's *Family Worship* (read, pray, sing in any order;
"brief, regular, flexible"; about ten minutes; one verse sung unaccompanied if
that is all there is); *Long Story Short*'s "go at our own pace"; Lectio for
Families (five to ten minutes; meals, the car, bedtime); Parent Cue's four cues
for morning, drive time, mealtime and bedtime; Chandler and Griffin's time,
moments and milestones; Orange's Phase Guides; David Suchet's reading of *The
Jesus Storybook Bible*.

**On LiveWell.** On `/family/tonight`, each devotion page and the Home
*Tonight* line: under *Start*, a plain *Read and pray* that opens table mode
with only those steps (`?mode=table&parts=read,pray`, a parts filter on
`partsOf`), with one sentence of permission above it in the platform's
register, never a pep talk. The four-doors strip (Deuteronomy 6:7 in the BSB,
verbatim): in the morning, the week's memory line or the catechism's child
answer; on the road, one question from the older band; at the table, the
devotion; at bedtime, one sentence of tonight's prayer for a child to say back
(72 lines, new, read by James's editor). In table mode the strip is the last
screen before "We did this tonight." The U21 calendar reminder can carry the
morning line; no notifications. Under the band switch: "Younger, about 4 to 10:
a story, a promise, a short prayer they can say back" and its older pair, each
linking to the Parenting Stage Guide. Gated: recorded readings *For the car* and
*For bedtime* by James or a reader he names, played with the text in view, each
naming its translation.

**Fit, effort.** Core · S (the minimum and the age lines); S to M (the strip);
the recordings M and gated.

**Evidence.** Crossway on Whitney and reviews; Exodus Books on *Long Story
Short*; 24-7 Prayer on Lectio for Families; Orange's Parent Cue pages and church
pages; Crossway on Chandler and Griffin; Zonderkidz on Suchet's reading;
LiveWell `TableMode.tsx`, `ListenButton.tsx`. (FAM 4.1, 4.3, 4.9, 4.12.)

### 11. Dated runs a church can join, carried by a link

*Merged from:* FAM 2, PCT 7; extends A 17 (a study guide dated for one church)
and A 13.

**What it is.** A pastor chooses a start Sunday and a run, and gets back one
link, a calendar file and a printable sheet per week; a family that opens the
link sees "Week 3 of your church's plan" on Tonight. Separately, the site runs
annual read-alongs on announced dates (the January whole-story plan, a Part of
the history course) with *Use it with your church*: one evening together, each
on their own, or mixed, with leader notes and a handout.

**Done best by.** The Gospel Project's weekly Big Picture Card sent home with
that Sunday's question; Orange's Parent Cue sheet in every folder and cards at
pickup; *Long Story Short* keyed to the Gospel Story curriculum; the Keller
Center's cohorts (eight Wednesday sessions, recordings "in perpetuity," and a
PDF, "Ideas on How to Use TKC Cohorts," giving a church live, own-screen and
asynchronous options); Explore God's dated city season.

**On LiveWell.** The Devotion Builder (U41) gains *Plan for your church*:
`/family/term?start=2027-01-10&d=exiles-in-babylon,the-coin,...`, with the
U20 print path for a sheet per week ending "On Sunday, ask each other what you
heard at church." The device remembers the term
(`livewell-progress-family-term`) until its last week, then falls back to the
calendar. No church name is taken from the URL (arbitrary text in a link is an
impersonation risk), no list of families, nothing reported back. A 17's
`?start=&cadence=` grammar is the same for study guides, so one helper serves
both. Read-alongs show position, not performance ("Week 2 begins Wednesday"),
with `lib/calendar.ts` reminders the reader chooses; no certificate, nothing
recorded about who took part. Dates: the first read-along that fits is the 2027
whole-story plan from January 1; Part I of the history course cannot begin on
Ash Wednesday 2027 because it goes live March 12, so its first run is after
Easter or in Lent 2028.

**Fit, effort.** Core · M.

**Evidence.** Lifeway Gospel Project pages and listings; Orange's Parent Cue
and church pages; Exodus Books on *Long Story Short*; TGC cohort pages and the
church-use PDF; Explore God local press. (FAM 4.2; PCT 2.7.)

### 12. Lives as lines: who was alive together

*Merged from:* CH 4.

**What it is.** A timeline view in which each person is a hairline from birth
to death, solid where attested and dotted at an uncertain end, grouped in
labeled rows by region; a year control moves one vertical rule, and a list
beneath answers *Alive in this year*, with ages.

**Done best by.** Joseph Priestley's *A Chart of Biography* (1765): lives as
bars, dots where dates are uncertain. TimelineJS's labeled group rows; the Met's
regions side by side.

**On LiveWell.** `/theology/history/timeline?view=lives&year=386` (U31), the
plan's "alive in a given year" filter made visible and the separate
contemporaries view it already retired. Inline SVG from tokens: ink lines,
muted dotted ends, one mustard year rule; a number field with step buttons,
keyboard operable; the year in the URL so a teacher can send "who was alive in
1521"; under 600 px it becomes a list with small bars. `people.json` gets
`born` and `died` as `{year, certainty}` and a `region`. No library, no zoom.
The chart is only as honest as the registry: today's 36 people (two of them
women) would draw the course's gaps in plain sight, which is why it ships with
the grid (pattern 8) and grows with the registry toward the plan's 90 to 100.
It is the one drawing in this wave whose whole job is to make the reader see
something he could not hold in prose.

**Fit, effort.** Core · M. Depends on U30.

**Evidence.** Wikipedia, History of Information, NEH and the University of
Oregon's Time Charts on Priestley; TimelineJS `json-format` docs and FAQ on
groups; Met TOAH about page. (CH 4.4.)

### 13. Three depths of one story

*Merged from:* CH 5.

**What it is.** A switch under each session title: *In five minutes* (a 350 to
500 word precis making the same claims from the same sources), *The session*
(about 25 minutes), *At the table* (the family devotion for that session).

**Done best by.** The OER Project's articles at several reading levels;
Ligonier's *5 Minutes in Church History* beside Godfrey's 23-minute lectures;
Ryan Reeves's six- to eight-minute biographies beside thirty-minute lectures;
Christian History Institute's quarterly beside its *Glimpses* bulletin insert
and its Torchlighters films with leader's guides.

**On LiveWell.** Session page (U32) with `?depth=short|full|table`, remembered
on the device; the U49 *church remembers* strand becomes each session's table
depth rather than a separate piece; the handout prints the five-minute version.
Validator: every claim id in the short version appears in the full session; the
table version keeps the hard part of the reckoning sessions. It serves the
pastor deciding whether to use it, the skeptic who wants the claim first, the
reader with time and the family with ten minutes, with one truth for all four.

**Fit, effort.** Core · M.

**Evidence.** OER reading guide and the adjustable-articles thread; Ligonier
Survey and *5 Minutes* pages; listings of Reeves's lectures; CHI Torchlighters
and *Glimpses* listings. (CH 4.5.)

### 14. The church remembers this week, with cards to keep and put in order

*Merged from:* CH 6, FAM 8.

**What it is.** Registry people with a traditional day of remembrance (or a
known death date) are remembered on it: a quiet weekly line opens a card with a
150-word life, one verified line in their own words, one Scripture reading, the
session where they appear, and their own prayer where a stored text preserves
one; a half-page sheet is free to reproduce with credit. The witnesses also
print as cards, four to a sheet, with a *Put them in order* exercise on paper
and on screen.

**Done best by.** *Lesser Feasts and Fasts* and *Holy Women, Holy Men* (a
biography, a collect and readings per commemoration; now *A Great Cloud of
Witnesses*); Concordia Historical Institute's freely reproducible *Today in
History*; *Glimpses* as a bulletin insert; the Gospel Project's card games (hide
the cards, sort them in order); Tiny Theologians' boxed sets.

**On LiveWell.** `people.json` gets `remembered` (`date`, `basis`: traditional
or death). A line on `/theology/history` and in The Table's week (U49),
rendered after mount from the generated year map. Framed for Baptist readers
through Hebrews 12:1 as remembrance, not veneration. The first test fits Lent
2027 (February 10 to March 28): Polycarp, and Perpetua and Felicity, both
stored by U07 (dates to verify against the calendar chosen). The prayer is the
witness's own words from the stored text (the Martyrdom of Polycarp holds one;
chapter to verify) or a psalm; never a collect copied from the Episcopal books
without the publisher's permission. Cards: name, date and place on the front,
two lines and one question on the back, through the #534 print path and the
combined PDF; *Put them in order* is tap-to-order that reveals the true order
and the dates, with a plain *See the order* button, no score, no timer. No count
of weeks remembered, no push beyond the add-to-calendar a reader chooses.

**Fit, effort.** Core · M.

**Evidence.** Wikipedia on *Lesser Feasts and Fasts*; Church Publishing on
*Holy Women, Holy Men*; Episcopal Archives resolution 2022-A010; Concordia
Historical Institute; Reformation21 and Tyndale on *Glimpses*; Lifeway on Big
Picture Cards; Tiny Theologians listings. (CH 4.6; FAM 4.8.)

### 15. Read Mark with a friend

*Merged from:* SK 3; A 5 (the question a chapter raises).

**What it is.** A short, fixed reading of one Gospel in seven sittings, made
for two people (one who believes and one who does not, or two who are unsure),
where the text comes first and the hard question each passage raises is marked
in the margin at the verse where it arises, opening the honest answer.

**Done best by.** Christianity Explored (seven sessions in Mark, the whole
Gospel printed at the front of the guest's handbook, one-to-one or in groups);
UCCF's Uncover (a printed Gospel with QR codes beside passages opening "the
apologetic questions raised by the passage"); Explore God's transcript beside
every video.

**On LiveWell.** A page in the Study door holding seven sittings in LiveWell's
own divisions of Mark. Each sitting opens the Study Bible chapter view; three
open questions written for two readers ("What does this passage claim about
Jesus? What would you need to believe for it to be true? What do you make of
the people around him?"); and, in the margin, a *The question this raises* note
(new `marginQuestions` on the chapter data, the same surface as A 5's chapter
questions) linking to its Honest Answer: the storm and the demoniac (Mark 4:35
to 5:20) to *Are miracles believable?*; Peter's confession (8:27 to 38) to *Was
Jesus just a good teacher?*; the empty tomb to *Did the resurrection actually
happen?*; the short ending at 16:8 to *Why would anyone trust the Bible?*
"Sitting 3 of 7" on this device, never a count of days. A printable booklet with
QR codes to each sitting reuses U21's PDF machinery and is the pastor's handout.
Linked from the Skeptic's Track's last stop and the topics row; no new door.

**Fit, effort.** Core · M (margin notes and questions are new writing for James
to read).

**Evidence.** Christianity Explored course pages and handbook listings; UCCF
Uncover editions and the 2012 *Evangelicals Now* feature; Explore God session
page. (SK 2.3.)

### 16. Inside the devotion: questions by kind, one for the grown-up, and a minute for the parent first

*Merged from:* FAM 4, FAM 5.

**What it is.** The Ask step shows three labeled kinds of question: *What
happened?* (one recall question the youngest can answer), *I wonder* (one or
two open questions, marked as having no right answer), and *Your turn* (a
question the child asks the grown-up). Above the devotion page (not in table
mode), a collapsed note for the parent: what tonight is about in a sentence;
the hard question a child may ask and a two-line honest answer; and, where the
passage involves death, violence, the body or family breakdown, a plain content
note, with the Find Help path where the theme touches grief or fear.

**Done best by.** Godly Play's "I wonder" questions ("sometimes they lead to
uncomfortable spots"); *Long Story Short*'s question for children to ask
parents (on one reader's review); Parent Cue's *Parent Time*; Superbook's
warning that "some scenes may be too intense for young children"; NCC's adult
commentary beside the child's answer.

**On LiveWell.** Each question gains a `kind` (`recall`, `wonder`,
`ask-the-grown-up`); `validate-family.mjs` requires at least one `wonder` and
one `ask-the-grown-up` per devotion. Re-tag the existing strings; write 72
*Your turn* questions ("When was a time you were afraid and God was with you?").
The grown-up's answer is the lesson: the adult is inside the question, which is
the self-implication rule at a kitchen table. Optional `parentNote` and
`contentNote`; the validator requires `contentNote` on devotions tagged with
death, violence or family breakdown. The existing *For the grown-ups* line sits
at the panel's foot.

**Fit, effort.** Core · M (content for 72 devotions and the seasonal days, and
James's editor's read).

**Evidence.** Godly Play descriptions; *Long Story Short* review; Orange's
Parent Cue pages; Superbook discussion guides; NCC; LiveWell
`family-devotions.json`. (FAM 4.4, 4.5.)

### 17. The skeptic and the family at the same time: a teen track in the adult order, and *When your child asks*

*Merged from:* SK 10, FAM 11; `benchmark.md` gap 3.

**What it is.** A seven-stop version of the Skeptic's Track for readers about
13 to 17, one stop for each adult stop, the same question in the same order,
conceding as much as the adult stop, each ending with three questions *To talk
about with a parent*. Beside it, a family page of the questions children
actually put to parents, in the child's words, each answered first for the
parent (what the question usually means at that age, the honest answer, what
not to say), then two sentences for a younger child and two for a teenager,
then the catechism question, Honest Answer or topic page behind it.

**Done best by.** *Cold-Case Christianity for Kids*, written in the adult
book's chapter order "so parents and children can discuss and explore the
evidence together, chapter by chapter"; McLaughlin's adult and teen books on
the same hard questions; BioLogos's *Integrate* for high-school classes;
LiveWell's own catechism part six, *Hard Questions Children Ask* (Q65 to Q76).

**On LiveWell.** `/skeptic-track` gains a *For a teenage reader* switch beside
the stop list (the U21 band pattern, state in the URL); each teen stop is 700
to 1,000 words; The Table can surface a teen stop as a week's older-band
reading, so a parent and a fourteen-year-old read stop 3 on suffering in the
same week. `/family/questions` is built first from Q65 to Q76's parent notes and
the topics index ("Where did Grandpa go?", "Why didn't God fix it?", "Is the
Bible true?", "Why are Christians on TV so angry?"). No academy, no certificate,
no completion count. It doubles existing doors rather than adding one.

**Fit, effort.** Core · L (seven new pieces under the byline rule and a page
of layered answers).

**Evidence.** David C Cook, Biola and Sean McDowell on the kids' book;
McLaughlin publisher listings; BioLogos *Integrate* reviews;
`family-catechism.json` part six; `benchmark.md` 1.2 and 3. (SK 2.10;
FAM 4.11.)

### 18. Readers become hosts: a table, a mixed room, a circle

*Merged from:* PCT 6, SK 9, PCT 9; extends A 16 (*Lead it in the room* and its
host's covenant).

**What it is.** Three printable kits on one layout. *Host a table*, for each
season and each Reading: two pieces to read beforehand with their minutes, a
passage to read aloud, five questions (the first open to a believer or not), a
closing question to take home, and a host's note on welcoming an unbelieving
friend; "A simple meal is enough." *Host an evening of questions*, for a room
with unbelievers in it, built on the Skeptic's Track: six sessions, each an
essay excerpt to read aloud and four to six open questions, with the host's
card (listen, do not win; two hosts; no more than eight guests; a fixed finish;
never more than half the time talking) and the guest's card ("Nobody will
contact you afterward unless you ask. You do not have to say anything. We
finish at 9."). *Read it together*: this month's piece from the season, the
leader sheet, and *Start a circle* (monthly, one piece, an hour, a convener, the
inductive rule).

**Done best by.** *Comment* Suppers (prompts, a recipe, a playlist, a hosting
checklist; a bookmark in every issue; a Lutheran congregation's Fall 2024 kit
with two articles and questions); *First Things*' ROFTers (independent, one
article a month, a directory honest enough to say "Trying to Form"); Alpha's
host guide; Redeemer's *Questioning Christianity* (equal time for talk and
questions, a facilitator who is not the speaker); the Trinity Forum's Bookclub
Box host guide.

**On LiveWell.** Printed through *Take it with you*; distributed through PCN.
PCT names it *Host a table* to keep it apart from The Table's family
devotions; James may prefer another name. No sign-up. No session is built as a climax: the sixth ends with the track's last
stop and the weight it leaves. No public directory of circles now (it needs a
database, moderation and James's consent: a question for him). A 16's room mode
runs any of the three on a screen. The mixed-room kit becomes the Skeptic's
Track's one offer, addressed to the skeptic's friend (pattern 2).

**Fit, effort.** Strong · S to M (writing and print layout; questions reuse the
group guides).

**Evidence.** comment.org/suppers and the Georgetown Lutheran supper page;
firstthings.com/rofters, the 2013 "Readers of First Things, Unite" post and a
Rochester parish's page; Alpha Team Guide and Alpha Canada; byFaith and Gospel
in Life on *Questioning Christianity*; TTF Bookclub Box. (PCT 2.6, 2.9;
SK 2.9.)

### 19. Correspondence, not a feed: James's letter, and readers' letters answered in public

*Merged from:* PCT 5, PCT 14, SK 8, SK 13; A 13 (the Sunday-night letter).

**What it is.** Two kinds of letter. *A letter from James*: monthly, plus one on
each season's first day, with fixed parts the reader learns to expect: the
letter (his writing only), this season's piece, one archive piece brought back
with why now, *What I have been reading* (labeled "not necessarily
endorsements"), what is new, and a short closing piece whose only job is to make
the reader marvel (a manuscript page, a creed's line and the fight that produced
it). *Letters*: a reader writes, James answers one letter at a time, and the
letter (with consent) and the answer are published together, numbered and
dated, filed by question family and linked to the answer and essay. At the
close of each Test the Case, an optional private field, *In your own words, what
is the strongest point against this case?*, kept on the device, with *Send this
to James* opening the letters intake prefilled.

**Done best by.** *Public Discourse*'s *From the Editor's Desk* (a reflection,
the archive brought back, outside reading "not necessarily endorsements,"
events); Jake Meador's letter "for friends of Mere O"; Reasonable Faith's
Question of the Week (numbered and dated, the letter under "Q," the answer to
the writer by first name and signed, a page on "How to Write a Question of the
Week"); *The Behemoth*'s stance (to "behold" rather than "exhort, scold,
theorize, or pontificate"), and its end after about a year and a half as the
warning about cadence.

**On LiveWell.** The Substack becomes *A letter from James*; `/subscribe`
states the cadence exactly and shows the last three letters; no pop-up, no
subscriber count. `/letters` with *No. 14 · 3 March 2027* above each; the
reader's own words with first name or initials by their choice, consent and its
date in the ledger; James's reply in the same column; *Write a letter* explains
what helps (one question, your own words, what you have already read). The
plan's *Write to James* at the essay foot is the intake. No comment threads, no
count of letters received. Absolute: no letter is ever composed, merged or
paraphrased into a letter, and no agent drafts anything in James's first person.
No verdict picker on Test the Case; telemetry records nothing about the note.

**Fit, effort.** Strong · S for the letter's shape and the objection field; M
for `/letters`. All of it is gated on James's time: promise twelve letters and
three seasons only if he can write them.

**Evidence.** Public Discourse newsletter post; Meador's Buttondown archive;
Reasonable Faith Q&A pages and the "How to Write" page; CT's 2014 announcements,
Olsen's "Behold, Now Behemoth" and the 2016 editor's note. (PCT 2.5, 2.14;
SK 2.8, 2.13.)

### 20. One page per hard question, a ladder to the best books on both sides, and the whole argument on one screen

*Merged from:* SK 4, SK 5; A 5 and A 6 (questions as doors).

**What it is.** Each hard question gets its own URL titled exactly as asked, in
a handful of families, with a visible ladder: the four moves (pattern 1); *Test
it step by step* where a case exists; *The full argument* (the essay);
*Further* (the book); and last, *The strongest work on each side*. Beside Test
the Case's stepper, an outline of the whole case on one screen, each objection a
link into the stepper at that point.

**Done best by.** BioLogos's Common Questions (five categories, each question
its own page with related questions and signed scholarly authors); Be Thinking
(question slugs, related resources per item, an index of every title); Got
Questions (one page per question as typed); Reasonable Faith's Popular and
Scholarly writings; Kialo's argument tree, and its critic's point that context
is lost as you move through a tree, which is why the stepper stays the default;
McLaughlin's "Questions Covered in This Episode."

**On LiveWell.** `/answers` becomes the index of five or six families (God;
Jesus and the resurrection; the Bible; suffering and evil; science and being
human; church, doubt and the life of faith); `/answers/:slug` renders one answer
with its ladder, two to four sources per side each with one sentence on what it
argues, verified and ledgered, then *Related questions*. FAQPage JSON-LD moves
to each page; the param route follows the 9.3 checklist; old anchors resolve by
a client-side hash check on `/answers`. On `/tools/test-the-case`, *See the
whole case* toggles a nested list in the prose column (no canvas, no graph
library): "Move 2: The timing," its objections as links, its `grants` in muted
ink; `?case=resurrection&move=early&objection=2` lets a reader send a friend
straight to his objection; *Print the case* makes one page for a group. Each of
the nine cases maps to an answer.

**Fit, effort.** Strong · M (route work and 35 literature lists, which are the
slow part); the outline S.

**Evidence.** BioLogos Common Questions page and URLs; Be Thinking URLs and
index; Got Questions; Reasonable Faith writings sections; Kialo pages and the
forum critique; McLaughlin podcast listings; `Answers.tsx`;
`argumentCases.ts`. (SK 2.4, 2.5.)

### 21. Both directions: the church's failures named first, and myths corrected on both sides

*Merged from:* PCT 12, SK 7; the orthodoxy guardrail ("the same instrument and
the same grief").

**What it is.** The Skeptic's Track opens with four stops that name the church's
failures plainly and set beside each one a witness from inside who opposed it,
one Scripture passage and one Reading, with questions written for believers and
skeptics together. And every myth check, on any page, corrects at least one
myth believers tell beside the myths skeptics hold, each answered from the
record with a source.

**Done best by.** The Centre for Public Christianity's *For the Love of God*
(the church's impact "both good and bad," "for sceptics and believers alike,"
about 150 cinemas and nearly 17,500 tickets before broadcast, then a
four-session, 90-minute course; reviews mixed); Natasha Moore's subtitle, how
the church is "better and worse than you ever imagined"; Dickson's *Undeceptions*
("undeceive ourselves," "simultaneously for the sceptic and for the believer");
Be Thinking's "Isn't the Bible Full of Contradictions?"

**On LiveWell.** The four opening stops draw on *The Mirror* and *The American
Church*; the first pairs slaveholding religion with Douglass's 1845 appendix
against "the Christianity of this land" (reachable, PG 23; to store before use).
It replaces a weaker current opening stop; no new door. Myth checks: the rule
that every set holds a `believerMyth: true` entry, enforced by `validate-history`
or a shared `myths` validator; the reader's *I had heard this* is a private tap
that changes only his own memory on the device. Believer myths are drafted only
after a source check, never from memory. `validate-politics`' both-directions
rule applies to every stop.

**Fit, effort.** Strong · M (S for the myth rule and validator).

**Evidence.** CPX on Wikipedia; Eternity News, *Great Lakes Advocate*, UCA
Insights and Third Space review; Natasha Moore podcast listing; *Undeceptions*
listings and Dickson interviews; Be Thinking index. (PCT 2.12; SK 2.7.)

### 22. Equal chairs: written exchanges and recorded conversations with the other side, published as text

*Merged from:* SK 11, PCT 10.

**What it is.** An occasional correspondence between James and a named,
thoughtful unbeliever (or a Christian across a second-order line) on one
question, in fixed rounds of equal length, published whole, with both voices in
the same type at the same width. If James records conversations, each is
published transcript first, with speaker names and section heads, audio below
the opening, and two to four readings that go deeper.

**Done best by.** *Unbelievable?* (a host who does not rig it; "sometimes the
atheist does better"); *The Big Conversation* (seasons of six, the audience's
questions published too); the Veritas Forum (equal time, a moderator who is
neither speaker); the Trinity Forum's Online Conversations (an edited podcast,
then the full video and transcript, ending in "Readings pertinent to this
discussion"); Reasonable Faith's debate transcripts cut into labeled rounds.

**On LiveWell.** `/exchanges/:slug`: four rounds (case, reply, rebuttal, last
word) under a word cap each; the guest approves every word of his own text and
nothing of his is cut to help James; the last word alternates between
exchanges; no portrait for one and initials for the other, no mustard on one
side; a round index at the top. `/conversations/:slug` under About: who, when
and why; an edited transcript; audio never autoplays; *Read next* with
validated links. Each links its Honest Answer and Test the Case. One or two a
year is enough. No polls, no "who won."

**Fit, effort.** Strong · M (the pages are small; the interlocutor and James's
time are the cost).

**Evidence.** Brierley interviews and guest accounts; *Big Conversation*
listings; Veritas Forum pages and campus reports; TTF podcast and Online
Conversation pages; Reasonable Faith debates page. (SK 2.11; PCT 2.10.)

### 23. The season you can hold: one door a day, opened on its date, the last one empty

*Merged from:* FAM 6.

**What it is.** A seasonal set given a physical anchor and a daily reveal: a
grid of days in which today's door opens, the days ahead stay closed until
their date, and the days past stay open for a family that missed one; one
drawn symbol per day to color, cut and hang; and for Holy Week, a last card
that is blank but for the words of the empty tomb.

**Done best by.** Resurrection Eggs (twelve days, one egg a day, the last one
empty on Easter morning, with a booklet that tells the parent what to say), the
single best piece of teaching design in this wave; the Jesse Tree; *The Advent
Book*'s 25 doors; *Prepare Him Room*'s thirteen nights.

**On LiveWell.** The Advent page shows the season as a grid; Holy Week gets the
same with eight symbols, its last card showing only Luke 24:6 (BSB, checked
verbatim before print). The device remembers which doors were opened; nothing
is counted. The date gate is computed after mount from the generated year map,
so nothing waits on the network. Advent 2026 has already shipped through U13, so
the first use is Holy Week 2027 (Palm Sunday, March 21), then Advent 2027.
Drawings come from pattern 25's single hand.

**Fit, effort.** Strong · M (grid, print sheet, drawings).

**Evidence.** Resurrection Eggs and Jesse Tree listings; *The Advent Book*;
New Growth Press on *Prepare Him Room*; LiveWell `family-seasonal.json`.
(FAM 4.6.)

### 24. Prayers for the moments nobody schedules

*Merged from:* FAM 10; `benchmark.md` 4.2 (*When the news comes to dinner*).

**What it is.** A short shelf of prayable texts for unplanned household moments:
the first day of school, a new baby, a move, a pet dies, after a fight, a
grandparent dies, a frightening diagnosis, a baptism, a birthday, the night
before a test, when the news is frightening, when a parent travels.

**Done best by.** *Every Moment Holy*'s liturgies for ordinary household acts
(its third volume's "After a Fight Among Siblings"); Chandler and Griffin's
moments and milestones.

**On LiveWell.** `/family/moments`, twelve to start, each with one passage
(BSB), a short prayer said together, one question, and for grief and fear the
Find Help path; each prints as a card; reached from `/family`, from the family
and grief care pages, and from a devotion whose theme matches. The form is
borrowed and every word is LiveWell's own (*Every Moment Holy* is in copyright).
One shelf with the planned *When the news comes to dinner* cards rather than
two, which is its one-in, one-out.

**Fit, effort.** Strong · M (content, James's read, a list page and a card
layout).

**Evidence.** Rabbit Room Press on *Every Moment Holy*; Crossway on Chandler
and Griffin; `benchmark.md` 4.2. (FAM 4.10.)

### 25. Images that carry an argument: one thing looked at closely, a caption that says why, one hand for the family

*Merged from:* CH 9, PCT 15, FAM 14; MASTER-PLAN 8.5 ("drawn teaching,
sparingly").

**What it is.** Three uses of image, each chosen rather than decorative. One
public-domain or openly licensed object per Part (later per session) with three
to six numbered details: a tap opens the cropped detail with one or two
sentences and its source, and the sequence reads as a list too. One image on
each season page with a caption paragraph saying why it is there. And one
drawing hand for everything a family touches.

**Done best by.** *A History of the World in 100 Objects*; StoryMapJS's
gigapixel mode and its Seurat example (the overview, then numbered details);
*Comment*'s cover art as "more than wrapping paper," its artists paid as
authors; *Plough*'s "Covering the Cover"; Don Clark's art across *The Biggest
Story*, Jago's in *The Jesus Storybook Bible*, Ned Bustard's across *Every
Moment Holy*.

**On LiveWell.** `objects.json` in the registry (U30) with image, recorded
license, source URL and `details[{n, crop, caption, sourceId}]`, rendered by CSS
`object-position` on one committed image: no tiles, no zoom library. Only
images with a recorded license ship; candidates to check one by one: the
Alexamenos graffito, the Dura-Europos house-church baptistery, a Codex
Sinaiticus leaf (the project's license is CC BY-NC-SA, so link out, never
embed), an early printing of the Ninety-five Theses, the Xi'an stele (whose text
U07 cannot reach, so its caption would carry no verified line). Season images
replace generated art on season pages; nothing stock. The household style: a
single-weight ink line on cream, at most one mustard accent, no gradients, no
mascots, used for the season symbols (pattern 23), the cards (14) and the
moments (24).

**Fit, effort.** Strong · M (objects and captions); L (a commissioned drawing
hand, gated on James).

**Evidence.** Wikipedia and *Australian Book Review* on 100 Objects; StoryMapJS
`BEST_PRACTICES.md` and `compiled/examples/seurat.json`; Ray Pennings's
year-in-review; Plough's "Covering the Cover"; Crossway on *The Biggest Story*;
Rabbit Room Press. (CH 4.9; PCT 2.15; FAM 4.14.)

### Also considered, not ranked

- **One story, and where tonight sits in it** (FAM 7). A 10's band applied to
  each devotion and card, with a *Where this goes* line written for its passage
  or left out (reviewers fault *Training Hearts* for a forced Christ
  connection). Strong, M; build with A 10's component, not before.
- **The open evidence file** (PCT 11). `benchmark.md` gap 4, parked with the
  statistics page. What this wave adds: no tallies of studies (the "vote
  counting" charge against After Babel's review), a paragraph on what the
  evidence cannot settle, and *Send us a study we missed*. Our World in Data's
  chart pages are the format to study (section 4.3). Parked until a named
  person checks every figure against the primary.
- **A set shape for the practical door** (PCT 13). Psyche's fixed order is good;
  its numbered *Key points* box is the clean application turn. Take the review
  date now (pattern 5); unifying the headings of the 40 care pages is maybe, M.
- **Let the older child choose** (FAM 13): PJ Our Way's choice of four. Maybe,
  S; it competes with the church's term and the calendar.
- **Stories in both directions** (SK 14): BioLogos's personal stories,
  including "How Science Shook My Faith." Only James can write *How I got
  here*; other stories only from real people with written consent, and never
  only the ones that end in faith. A request to James, not a unit.
- **The road travelled** (CH 15): a stepper through Paul's cities or the Church
  of the East's road, with an ORBIS travel time named as a model estimate.
  Maybe, L; only if James wants the atlas (U68).
- **From the clusters' own lists:** a free daily layer (no; one writer cannot
  keep it); membership and a print annual of the year's seasons (later, James);
  an annual gathering with a theme through PCN (later); a citation block on
  source sheets (fold into U30); a seasonal story serial with child characters
  (a James question: fiction under his name); an animated short per argument
  (parked; one static diagram inside Test the Case would serve recall better);
  an A to Z index of titles (search work); a volunteer answer team (no; Letters
  is the honest scale).

---

## 3. The tensions: "draw people's attention" against "Unhurried. Weighted. Grown-up."

James asked for things that draw attention. In this wave the pull is not mainly
toward motion, as it was in wave A; it is toward the three oldest attention
engines in publishing and ministry: **novelty** (the feed), **conflict** (the
debate, the scandal) and **reward** (the contest, the prize, the count). The
best products resolve each the same way: **attention earned by time, by the
other side's real voice, and by the thing itself, never by urgency, a scoreboard
or a prize.**

**1. The season against the feed.** The pull: freshness, a *Latest* list, a
daily layer (*Plough*'s *Daily Dig*, *Image*'s *Good Letters*, CT's 2012 relaunch
promising "minute-to-minute news updates"). For one writer a feed exposes the
gaps, trains skimming and pulls toward the hot take. How the best resolve it:
*Plough* and *Comment* make the quarter the unit; *Mere Orthodoxy* promises
three issues a year; *Breaking Ground* ended on purpose and became a book. *The
Behemoth* is the caution: a lovely slow magazine that stopped after about a year
and a half because its cadence outran its funding. **Rule:** a date is the hook.
A season begins and ends, a letter arrives monthly, a witness returns on his
day; nothing on the site shows how recently anything was published, and LiveWell
promises only the cadence James can keep (patterns 4, 14, 19).

**2. Dialogue against debate.** The pull: debate is the genre's biggest draw
(Reasonable Faith's debate archive, highlight clips of "destroying" an atheist,
the risk of not knowing who will win). Its own critics name the cost: Rauser's
"tribalism, competition, and spin-doctoring," and the impression culture Stenger
described. How the best resolve it: *Unbelievable?* keeps the risk and drops the
scoreboard (the guest who sometimes does better is real; nobody is declared the
winner); the Veritas Forum adds a moderator who is neither speaker; BioLogos
publishes a dialogue as a record, not a contest. **Rule:** equal chairs, equal
type, equal length; no polls, no winners, no tallies of studies on either side
(patterns 1, 9, 22).

**3. Reckoning against spectacle.** The pull: the church's failures are the most
read stories in this field, and the strongest way to tell them is often staging
(the Searchable Museum's recreated rooms) or a documentary premiere. How the best
resolve it: CPX pairs every failure with the witness from inside who opposed
it, and calls the result "better and worse than you ever imagined"; Stanford and
Smarthistory tell the hard thing through the documents. **Rule:** a reckoning is
told in sources and prose, always with an inside witness and always as "we"; the
guardrail fires in both political directions with the same instrument (patterns
9, 21).

**4. The line against the dot cloud.** The pull: Histography's fourteen billion
years of Wikipedia dots and the British Museum's WebGL *Museum of the World* drew
the press. One is unmaintained and stops in 2015; the other offered no way off
its main screen except out of the site. How the best resolve it: Priestley drew
lives as lines in 1765 and let dots mean uncertainty; the Met used a grid of
region by period; Noll chose about a dozen hinges. **Rule:** drawings are lines,
ticks and cells on cream with one mustard mark, every one with a list
equivalent; no zoom, no canvas; uncertainty is drawn, not hidden (patterns 8,
12).

**5. The calendar against the contest and the push.** The pull: Lent Madness
teaches the saints through a bracket and a "Golden Halo," and its later rounds
slide by design into "quirks," "legends" and "saintly kitsch"; Google's Daily
Digest makes "on this day" a trivia push; Hallow launches a season with
celebrities. How the best resolve it: the Episcopal calendar and Concordia's *Today
in History* bring a witness back on his day with a life, a reading and a
prayer; Resurrection Eggs hang a season on twelve days. **Rule:**
the date is the door, weekly at most, with a source and a prayer; no vote, no
push beyond a calendar entry the reader chose, no count of weeks (patterns 14,
23).

**6. A child's attention against a child's dignity.** The pull: Superbook's
"points and prizes," the Bible App for Kids' gems, stars and tap-to-animate
scenes, mascots, and Parent Cue's countdown of the weeks before a child leaves
home. How the best resolve it: *The Jesus Storybook Bible* and *The Biggest
Story* are books an adult wants to read aloud; Resurrection Eggs put the lesson
in an absence the child discovers. **Rule:** the reveal is in the content (a
door that opens on its date, an empty last card, the true order of the
witnesses), never a reward; no animation inside the story; one drawing hand;
anything a parent would be embarrassed to read at the table fails; position, not
what is running out (patterns 10, 16, 23, 25).

**7. Asking for something against asking for nothing.** The pull: lead magnets
(on LiveWell's own skeptic track today), membership deadlines ("become a member
before January 10"), member counts ("over 1,100 members"), conversion counts,
follow-up calls, and the emotional climax (Alpha's Holy Spirit weekend, by its
supporters' own account the course's most controversial part). How the best
resolve it: Alpha's own policy, "no pressure, no follow up"; Christianity
Explored names its last session for the cost, so nothing is hidden; Psyche shows
a review date instead of a reader count. **Rule:** real dates only; no counts
of people; the skeptic's page asks him for nothing; the only invitations on it
are addressed to his friend (the host kit) or to his own best objection, kept on
his device (patterns 2, 18, 19). Endings leave weight; they do not press.

**8. One voice against many, and the voice against accountability.** The pull:
institutions add fellows, rotating writers and channels (the Keller Center's
fellows, CT, *Comment*'s four podcast series with names a reader cannot
decode), and a single voice is tempted to stand above question. How the best
resolve it: Reasonable Faith's single voice signs every answer and prints the
letter it answers; Meador writes to readers as a person; RZIM showed what a
messenger without oversight costs everyone who trusted him. **Rule:** James's
voice is the moat (`benchmark.md` gap 10); guests appear under their own names
in exchanges and conversations; the voice is labeled, dated, corrected in public
and answerable to people other than himself (patterns 5, 19, 22).

**9. Credentials against method.** The pull: "a homicide detective
investigates," "a world-class scientist says." How the best resolve it:
Stanford and the OER Project give the reader the method so the argument stands
without the arguer. **Rule:** James's biography is a reason to listen, never a
proof; the reader is taught to check the source himself (patterns 6, 7).

**What draws attention, honestly.** The ranked list already holds what James
asked for, each piece earned by content: Polycarp before the proconsul, in
Cormorant, from the source, at the head of a session (7); a hairline chart with
one mustard year rule that shows Augustine and Jerome alive together (12); the
facing page where the losing side speaks first (9); a quoted objection set apart
at an essay's hinge, stronger than most believers have heard it (1); a season
page that says when it ends (4); an Advent door that will not open until its
day, and a Holy Week card that is empty (23); a letter numbered *No. 14* with a
real reader's question in his own words (19); a grid cell that says *Not yet
written* (8); a margin note in Mark that opens the hardest question of the
passage (15); and, for the skeptic, the most arresting page of all, a dated list
of what the site got wrong (5). None of them needs a counter, a badge, a feed or
a moving picture.

---

## 4. Completeness: what this wave could not see or did not cover

Each item names the product or page, the question, and the pattern it would
change. Ordered by how much the answer could change the plan.

### 4.1 First, LiveWell's own data (outranks everything below)

- **Search Console and Vercel analytics for `/answers`**: which anchors real
  readers land on, from which queries, and whether shared links land mid-page.
  This decides which Honest Answers get their own pages first (pattern 20) and
  which steelmen and outside reads come first (1).
- **The same for `/theology/history` and the 22 history essays**: which events,
  people and essays draw readers, to choose the hinges (8) and the first
  witnesses remembered (14).
- **The U17 table-mode telemetry**: how often a family that starts a devotion
  reaches *Pray* and *We did this tonight*, and where it stops. This is the
  evidence for or against the hard-night minimum (10) and the order of the Ask
  step (16).
- **What the skeptic track's lead magnet and in-page signup actually produced**
  before they are removed (2), from the newsletter provider's own records; a
  planning number, never printed.
- **The contact form**: how many reader questions arrive, on what, and in whose
  words, before *Letters* is promised (19).
- **The Substack's history**: open and click rates by letter type and whether
  archive pieces brought back are read (19); planning numbers only.
- **PCN pastors**: a handful asked, through James, whether they would send a
  church-term link (11), a host kit (18) or *Read Mark with a friend* (15). No
  cluster could reach the channel the plan depends on most.

### 4.2 Nothing was seen live: what to capture when network access widens

Capture each at 390 x 844 and 1440 x 900, and note type, spacing, how the page
breaks on a phone, and load weight.

*Living after Christendom (PCT):*
- **ttf.org**: a Reading's product page and, through a purchase or library copy,
  a Reading's interior: where the introduction, the text and the questions sit,
  and whether there is a further-reading list (pattern 3).
- **comment.org/suppers**: one supper kit's prompts, recipe and playlist, and
  the true table size (the page says both four to eight and six to ten) (18).
- **plough.com**: an issue page, how a theme organizes the web edition, and
  whether the *Daily Dig* is emailed (4).
- **mereorthodoxy.com**: the journal and membership pages and what the 2021
  redesign and the May 2024 "Next Chapter" post produced (4).
- **firstthings.com/rofters**: the current directory and its status labels
  (an archived copy supplied "Active" and "Trying to Form") (18).
- **anxiousgeneration.com**: the actual entries on the errors page (how a
  correction is worded, dated and linked) (5).
- **psyche.co**: one guide's full set of headings and the reliability page (5,
  also considered).
- **gospelinlife.com**: the archive's filters by series, Scripture and date (4).

*Church history (CH):*
- **christianhistoryinstitute.org**: an issue page in HTML (how the timeline
  spread, FAQs and quotations render), whether *Glimpses* still runs and on what
  reuse terms, and the daily "Today in Christian History" (8, 14).
- **metmuseum.org/essays**: whether the Heilbrunn Timeline's region-by-period
  selector and chronology anatomy survived the move (8).
- **smarthistory.org**: a current two-voice page and a *Reframing Art History*
  chapter close (9).
- **Khan Academy's World History (June 2026)** as built: how the OER readings
  and leveled articles sit beside practice (6, 13).
- **dacb.org**: one full person entry, to settle the template beyond its first
  categories (8).
- **Ligonier**: a *5 Minutes in Church History* episode page and the Connect
  church-history player (7, 13).
- **The Episcopal calendar** (*Lesser Feasts and Fasts* 2022 and *A Great Cloud
  of Witnesses*) and the Lutheran *For All the Saints*: one commemoration page
  each, and Church Publishing's reuse terms (14).
- **Histography**: the designer's rationale (the Smashing Magazine interview
  text did not come through) (tension 4).

*Faith at home (FAM):*
- ***Long Story Short*** sample pages: a day's questions, whether younger
  children get their own, the child-asks-parent question (resting on one
  review), and the week count (61 by one listing, 78 in `benchmark.md`) (16).
- **Lifeway's Gospel Project Big Picture Cards**: the card's two sides (11, 14).
- **Orange's Parent Cue**: the fields of a cue card, the price, and whether the
  weeks-left countdown is on by default (10; tension 6).
- **Hallow** kids' screens and whether the family challenges are free (23).
- ***The Biggest Story Bible Storybook***: whether questions follow each story
  (16).
- **Whitney's *Family Worship*, chapter four**: his answers for the unbelieving
  father and very young children (10).
- **Superbook**: the discussion guides and the usability study's findings
  beyond its method (tension 6).

*The skeptic (SK):*
- **reasonablefaith.org**: a Question of the Week page and "How to Write a
  Question of the Week" as currently worded (19).
- **biologos.org**: a Common Question page (ladder, related questions,
  authors) and the comparison page (9, 20).
- **bethinking.org**: what *Explore*, *Engage* and *Relate* hold (inferred so
  far from URL names) (2).
- **christianityexplored.org**: whether a seeker site or online course exists
  (15).
- **alpha.org**: the current session list and length, the Film Series'
  discussion breaks, and Alpha's own response to Stephen Hunt's findings (18;
  tension 7). Hunt's figures reached the cluster through a hostile review and
  must not be quoted.
- **exploregod.com**: a session page, to confirm that the *Pulse of the World*
  videos are ordinary people's voices (4, 18).
- **CPX's own site**, its *Life & Faith* podcast and short films, and an
  *Undeceptions* Q&A episode's structure (21).
- **Rebecca McLaughlin's site**: how her questions are organized for adults and
  teenagers (17).
- **Kialo**: how its "impact" voting weights claims (20).

### 4.3 Products this wave did not cover and should have

- **How the best explainers show a changing country.** James's brief asks the
  site to help people "understand what a post-Christian world is in America."
  This wave studied how Christian publications argue about it; no cluster
  looked at how the best products *show* it. Check: Pew Research Center's
  2023-24 Religious Landscape Study interactive database (published 2025;
  36,908 respondents surveyed July 17, 2023 to March 4, 2024; searchable by
  religious group, demographic group or question, for the nation, 50 states and
  34 metro areas) and its September 2025 "How religious is your state?"; Ryan
  Burge's *Graphs About Religion* (a political scientist and former American
  Baptist pastor whose January 2026 argument was that survey data show no clear
  evidence of a Gen Z revival); PRRI's Census of American Religion; and Our World
  in Data's chart pages, whose fixed parts (*What you should know about this
  data*, *Sources and processing*, a citation block) are the best model found
  for an evidence page that states its own limits (also considered, the open
  evidence file). For the written explainer, James K. A. Smith's *How (Not) to Be
  Secular* (2014), a reader's guide to Charles Taylor, is the closest model of
  making the idea plain without flattening it. No figure from any of these
  reaches the site until a person checks it against the primary report.
- **Narrative church history for a general audience.** Diarmaid MacCulloch's
  BBC series *A History of Christianity* (2009) and its book; Justo González's
  two-volume *The Story of Christianity*, widely used, by a Cuban-American
  historian who gives the church beyond Europe real room; and Tom Holland's *Dominion*
  (2019) and *The Rest Is History* (with Dominic Sandbrook), evidence that
  narrative history holds a secular audience, and Holland the strongest secular
  witness to "older than my culture." Check how each opens a chapter or episode
  (pattern 7) and how González covers the regions the grid will expose (8).
- **Public-domain reference works for the registry.** Wace and Piercy's
  *Dictionary of Christian Biography and Literature to the End of the Sixth
  Century* (1911) and Schaff's *History of the Christian Church*: whether U07's
  mirrors reach them, as checks on people entries, labeled as a nineteenth- and
  early twentieth-century Protestant reading and never the only source for a
  claim (8, 12, 14). *Foxe's Book of Martyrs* belongs on the list only as a
  caution: public domain, polemical, and a reckoning in its own right.
- **The Orthodox calendar.** The Greek Orthodox Archdiocese's saints and feasts
  pages (or the OCA's lives of the saints): how the East remembers its
  witnesses, for pattern 14 and for the grid's Greek East and Asia rows. The
  history cluster saw Western calendars only (Episcopal and Lutheran).
- **The household table outside Christianity.** OneTable, a nonprofit that helps
  young adults host Shabbat dinners, with a guides library and a dinner guide
  that breaks the meal into five sections for beginners (a 2025 *OneTable
  Together* guide is the newest): the closest outside benchmark for *Host a
  table* (18) and for a weekly household rite with set words (10). The Shabbat
  practice of blessing the children at the table is the model to study for a
  fixed weekly line a parent says over a child.
- **Content notes done well.** Common Sense Media's parents' guide (an age,
  a short "what parents need to know," and content categories each rated or
  marked "not present"): take the plain warning for pattern 16's content notes,
  never the star rating.
- **The skeptic's own side.** *Within Reason*, the podcast of Alex O'Connor, an
  agnostic atheist whose guests have included William Lane Craig and David
  Bentley Hart: the reverse of *Unbelievable?*, a skeptic host giving Christians
  the chair; check how he frames a Christian guest (1, 22). Bart Ehrman's blog,
  which writes about the New Testament and early Christianity for
  non-specialists, answers readers' questions and gives its membership fees to
  charity: the strongest scholarly skeptic writing for lay readers, to choose
  the right *strongest work on the other side* for the resurrection and Gospel
  answers (20) and to see how a skeptic answers letters (19). Street
  Epistemology's guide (rapport and consent, the claim, confidence, the reasons,
  no debate), the skeptics' own method for conversations about belief, for the
  host's card (18); a Harvard Misinformation Review paper notes its support is
  so far mostly anecdotal. The Skeptic's Annotated Bible is already flagged in
  A-SYNTHESIS 4.3.
- **The progressive side of the guardrail.** The clusters looked at evangelical,
  Reformed and Catholic products. *The Bible for Normal People* (Pete Enns and
  Jared Byas) and the deconstruction audience it serves should be seen, so that
  pattern 21 and the both-directions rule are tested against the other flank's
  seeker product, not only the apologists'.
- **Depolarizing formats for the politics material.** Braver Angels' Red/Blue
  workshop (two trained moderators; Reds and Blues; ground rules that no one is
  there to change a mind and no "gotcha" questions): the model for a host kit on
  a political topic (18) and for the tone of a facing page on Faith and Power
  (9).

### 4.4 Data, rights and integrity questions left open

- **U07 gaps found here:** Symmachus's memorial and Alexander of Alexandria's
  letters are not in the survey (9); Luther's speech at Worms and the Xi'an
  monument are not reachable (8, 25); Douglass's *Narrative* and Woolman's
  *Journal* are reachable but not stored (3, 21); Augustine beyond *City of God*
  Book 5 is not stored (7); whether the stored Tertullian file holds chapter 2
  (6). U07 is in review and its stored texts are not yet in this checkout.
- **Commemoration texts:** Church Publishing's terms for collects and lives in
  *Lesser Feasts and Fasts*, *Holy Women, Holy Men* and *A Great Cloud of
  Witnesses*; the reuse line on Concordia's *Today in History*; *Glimpses*'
  terms. Until checked, the prayer is the witness's own stored words or a psalm
  (14).
- **Object images:** a recorded license for each candidate (the Alexamenos
  graffito; the Dura-Europos baptistery; a Codex Sinaiticus leaf, CC BY-NC-SA,
  link only; an early printing of the Theses; the Xi'an stele) (25).
- **Quoting living objectors:** brief quotation with attribution, the method
  recorded in the ledger; in an exchange, the guest approves his own text in
  writing (1, 22).
- **Consent records:** for every published letter and every story, the date and
  the form of name the writer chose (19, also considered).
- **Recordings:** who reads, and the BSB's audio and text terms confirmed for
  any recorded reading (10).
- **The read-along calendar:** Part I is live March 12, 2027, after Ash Wednesday
  (11).
- **Usage evidence for any product in this wave** (who hosts suppers, how many
  circles meet, how many families finish a season). None was found and none
  should be quoted.

### 4.5 Questions for James that this wave raises

Collected so the planner can date them: whether to keep three seasons a year
and who words each season's question (pattern 4); a monthly letter in his own
voice, and the closing piece of wonder (19); answering readers' letters in
public, and how often (19); an exchange with a named unbeliever, and recorded
conversations (22); the *Who holds me to account* copy and a contact for
concerns that does not go to him (5); introductions to the first six Readings
under his byline (3); the teen track's seven pieces and *Read Mark with a
friend*'s margin notes (17, 15); host kits and reading circles through PCN, and
whether circles ever get a directory (18); which hinges carry the course (8);
the read-along dates (11); recording his voice for the car and the bedside
(10); a commissioned drawing hand (25); and *How I got here* (also considered).

---

## Sources added in this synthesis

Nine searches, for section 4 only (everything else is in the cluster files'
evidence sections):

- [OneTable, Hosting Shabbat Dinner](https://onetable.org/hosting/), [OneTable Together Shabbat Dinner Guide](https://onetable.org/resources/onetable-together-shabbat-dinner-guide/), [Jewish Philadelphia blog on hosting](https://blog.jewishphilly.org/tips-and-tricks-for-beginners-to-host-shabbat-your-way): host application, guides library, the meal in five sections for beginners.
- [Pew Research Center, Religious Landscape Study database](https://www.pewresearch.org/religion/religious-landscape-study/database/), [RLS FAQ](https://www.pewresearch.org/religion/religious-landscape-study/faq/), [How religious is your state? (September 2025)](https://www.pewresearch.org/short-reads/2025/09/16/how-religious-is-your-state/markdown): sample, dates, geography, search modes. No figure read or used.
- [Ryan Burge at Washington University](https://rap.wustl.edu/?p=8001), [ChurchLeaders on Burge and a Gen Z revival](https://churchleaders.com/news/2211572-ryan-burge-no-gen-z-revival.html), [Deseret News, January 2026](https://www.deseret.com/faith/2026/01/17/ryan-burge-vanishing-church-faith-data/): *Graphs About Religion*, background, the January 2026 argument.
- [Our World in Data, a chart with "What you should know about this indicator"](https://ourworldindata.org/grapher/country-reporting-data-on-covid-vaccinations), [Democracy index chart](https://ourworldindata.org/grapher/democracy-index-polity): the fixed parts of a chart page.
- [Baptist News Global on Alex O'Connor](https://baptistnews.com/article/how-a-youtube-atheist-helped-me-out-of-cynicism/), [David Bentley Hart on his *Within Reason* interview](https://davidbentleyhart.substack.com/p/two-links), [Archania on O'Connor](https://archania.org/p/individuals/internet-personalities/alex-oconnor): guests and the host's stance.
- [Braver Angels, moderators](https://braverangels.org/get-involved/moderator/), [Spectrum News on a 2025 workshop](https://spectrumlocalnews.com/ca/california/politics/2025/09/13/a-place-for-red-and-blue-conversation---community-through-braver-angels): two moderators, Reds and Blues, the no-persuasion and no-gotcha rules.
- [Street Epistemology, the basics](https://www.streetepistemology.com/blog/street-epistemology-the-basics), [Wikiversity guide](https://en.wikiversity.org/wiki/Street_Epistemology), [Harvard Misinformation Review](https://misinforeview.hks.harvard.edu/article/using-an-ai-powered-street-epistemologist-chatbot-and-reflection-tasks-to-diminish-conspiracy-theory-beliefs): the steps, the method, the limited evidence.
- [Common Sense Media via Plex support](https://support.plex.tv/articles/common-sense-media/), [CBS Pittsburgh on detailed ratings](https://www.cbsnews.com/pittsburgh/news/detailed-media-ratings-website-give-parents-much-needed-information/): age, parents' summary, content categories rated or "not present" (secondary descriptions).
- [Bart Ehrman blog, about](https://ehrmanblog.org/?p=46754), [Wikipedia, Bart D. Ehrman](https://en.wikipedia.org/wiki/Bart_D._Ehrman): audience of non-specialists, readers' questions, fees to charity.
