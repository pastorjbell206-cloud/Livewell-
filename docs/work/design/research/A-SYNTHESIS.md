# A. Synthesis: studying the Bible and doctrine

Prepared 2026-10-27. Wave A of the design research for the LiveWell redesign,
answering James's brief ("the most organized, well-designed website that helps
people to study the Bible, to understand doctrine ... interactive, with things
that draw people's attention ... a useful tool for people to study and learn
and grow").

**Inputs.** The four cluster reports in this folder: `A-bible-readers.md`
(BR; 43 searches; STEPBible, Sefaria and OpenBible code read),
`A-text-study-gold.md` (TS; 41 searches; Sefaria, Scaife Viewer, Quran.com,
Theographic and OpenBible code read), `A-doctrine-catechesis.md` (DC; 45
searches) and `A-courses-learning.md` (CL; 41 searches). Read against
`CLAUDE.md`, `docs/work/plan/benchmark.md` and `docs/work/plan/MASTER-PLAN.md`
sections 0 to 3, 7 and 8. Five further searches were made for section 4 (listed
at the end). Pattern numbers in "Merged from" refer to section 4 of BR, DC and
CL and section 2 of TS.

**Limits carried over.** No live page or screenshot of any product was seen in
any cluster; visual and typographic claims come from code, help centers and
reviews. Nothing here is a figure for the site: product numbers are planning
notes under MASTER-PLAN section 2.

**Checked in the repo for this synthesis** (so the patterns below are sized
right, and two cluster claims are corrected):

- `scripts/build-bible.mjs` (lines 181 to 207) already reads OpenBible's vote
  counts, drops references under one vote, sorts by votes, **keeps the top 12**
  and discards the numbers. So the cross-references are already in strength
  order, and John 3:16's "12" is the cap, not the total. BR pattern 4's "add the
  votes" is already done; showing a count of 12 as if complete would mislead.
- The rich chapter-note fields are not everywhere. Of 1,189 chapter notes,
  `outline` is present in all 1,189, but `hard`, `interpretation` and `text`
  are each filled in **114** (about one chapter in ten). BR's "no new writing
  is needed" for the hard-question and church-reading patterns holds for those
  114; beyond them it is content work.
- Verse-by-verse notes exist for 202 chapters across 25 books
  (`client/public/bible/notes/<book>/verses/<n>.json`).
- The U16 text-only shards exist in the work tree (`client/public/bible/text/`),
  so verse text for cross-references and the verse panel is already cheap.
- The creeds shelf holds 14 documents, but the Heidelberg and Westminster
  Shorter Catechism are present only as Q1, and the 1689 London Baptist and New
  Hampshire confessions only as summaries.

---

## 0. The verdict

The best study products agree on a small number of habits, and none of them has
all of them. Sefaria makes every passage the center of a counted web; Quran.com
labels every layer by who is speaking and keeps a quiet reading mode beside its
study mode; the Catechism of the Catholic Church gives the short answer first
and carries its sources in the margin; Accordance and OpenBible say how sure
anyone can be of a date or a place; BibleProject and Ascension keep a picture of
the whole in view; Daf Yomi, the New City Catechism and the Lord's Days hold
readers for years with a shared calendar and no score; Alpha and Bible Study
Fellowship design for the room where formation actually happens.

LiveWell is unusually well placed, because most of the content these habits
need already exists in the repository: a Study Bible with notes on every
chapter, dated church readings and steelmanned hard questions in 114 chapters,
31 triaged doctrine debate pages, 62 doctrine studies, a 76-question catechism,
68 group study guides with leader notes, and a 2027 whole-story plan. What it
lacks is the presentation and the joins. The 25 patterns in section 2 are
mostly presentation over existing data; the few that need new writing say so.

The one opening nobody holds: the church's long memory set beside the verse,
dated, attributed and verified, for a lay reader. Sefaria does this for its
tradition and the Dartmouth Dante Project for one poem. No Christian reader seen
in this wave does it with dated, sourced, checkable text (section 4 names the
one app that comes closest and why it falls short).

---

## 1. What world-class means here: the patterns that recur

Twelve moves recur across the best products in all four clusters. The table
names who does each best and where LiveWell stands.

| # | The move | Done best by | Also strong | LiveWell today |
|---|---|---|---|---|
| 1 | **The text is the room.** The default view is the quietest; apparatus waits one tap away. | Quran.com (Translation Reading Mode, "read like a book," January 2026, beside Study Mode) | ESV.org reader's mode; Scaife Viewer (praised for what it removed); Bibliotheca as the argument | Clean BSB text; no read mode; notes in about thirteen closed drawers below the text |
| 2 | **Every verse is a hub, counted.** One panel lists every layer that exists, with counts, empty groups hidden, state in the URL. | Sefaria's connections panel | Olive Tree's Resource Guide ("follow my reading" lock); Logos Passage Guide; BLB Tools with Previous and Next | A verse panel with five tabs and a six-item fuzzy "Go deeper on LiveWell" |
| 3 | **Every layer says who is speaking.** Scripture, primary source, editorial note, opinion and the reader's own notes are labeled before they are read. | Quran.com ("should not be taken as authoritative"; "There are no reviewed reflections for this ayah") | NET Bible's typed notes (tn, sn, tc); the Catechism's small print; Sefaria's 2026 Library/Voices split | Subject filters (Hebrew and Greek, History, Doctrine); no authority labels |
| 4 | **The short answer first, the long one beneath.** | The Catechism's "In Brief" | New City Catechism's nested child and adult answers; YOUCAT's bold answer; Logos Factbook's key article | Catechism has both registers; doctrine pages open on the long study |
| 5 | **Every claim carries its text, opened in place.** | Westminster Shorter Catechism "with Scripture proofs"; Pilgrim's proofs that open in its reader | Catechism margin numbers; Reformation Study Bible notes beside the verse; Faithlife's floating verse window | One reference per catechism answer; `VerseRef` sheets now live (U16) |
| 6 | **The tradition speaks, dated and in order.** | Dartmouth Dante Project (75+ commentaries, 1321 to 2015, by line) | Sefaria's chronological sort; NCC's past and present preacher on every question; Counterpoints' replies | Dated witnesses in 114 chapters, in a closed drawer |
| 7 | **Honest uncertainty is part of the interface.** | Accordance (Conservative and Critical dating schemes) | OpenBible geocoding (confidence from 70+ sources; radius of uncertainty) | Not shown |
| 8 | **A map of the whole, with "you are here."** | Ascension's Great Adventure timeline (12 periods; a special episode at every turn) | BibleProject book posters; Ligonier Connect's roadmap "visible throughout" | Eleven acts in `story.json`; outlines in every chapter; no drawing |
| 9 | **Questions are the doors.** | Sefaria Guided Learning ("Key Questions," each with "N Answers") | Quran.com Answers tab; Got Questions' one doctrine as many typed questions; Alpha's session titles | Steelmanned `hard` questions in 114 chapters, near the bottom of the notes |
| 10 | **Cadence, not score.** A shared calendar, open doors at every joint, mercy after a gap, a rite at the end. | Daf Yomi and Sefaria's learning calendars | NCC's 52 weeks and the Heidelberg's 52 Lord's Days; Bible in a Year ("designed to be started at any point"); YouVersion's Catch Me Up; the siyum | U28's "Day 40 of 365" and "pick up at your place, or at today's day" |
| 11 | **The reader makes something.** Notes, sheets, comparisons, recall without a score. | Sefaria source sheets | Quran.com Pin and Compare; Logos notes that stick to verses; first-letter memory drills | My Library on the device; Scripture Memory drill |
| 12 | **The room is designed for.** | Alpha (discussion breaks; the host's covenant) | Bible Study Fellowship's order (your answers first, notes last); Ligonier's group schedule | 68 guides with timing, leader notes and facilitator scripts; no room mode, no dates |

**What world-class means in this wave.** It is not a feature count; Logos and
Accordance have every feature and are built for pastors who pay. It is depth
layered behind calm (moves 1 and 2), honesty made visible (3, 6, 7), a picture
of the whole (8), a reason to return that is a rhythm rather than a tally (10),
and the reader turned from consumer into maker and conversation partner (11,
12). The products that come nearest to the whole set (Sefaria, Quran.com) serve
a community inside one tradition and gate personal features behind sign-up;
none writes toward the skeptic. Every move above can be built at LiveWell's
scale without accounts, scores, a chart library, or AI.

---

## 2. The patterns most worth bringing to LiveWell, ranked

Merged and de-duplicated from the 59 ranked patterns of the four clusters.
Ranked by value to the four readers (the skeptic winning ties), weighed against
effort and dependencies. **Fit:** core (the redesign should not ship without
it), strong (clearly right; schedule it), maybe. **Effort:** S is days, M is a
unit of one to two weeks, L is several units or sustained content work. Every
pattern obeys MASTER-PLAN section 2: shareable state in the URL, personal state
on the device through `lib/storage.ts` and said plainly, no accounts, no
scores, tokens only, no chart or map library, one translation per page.

### 1. The verse panel: everything around a verse, counted, grouped, addressable

*Merged from:* BR 1, BR 15; TS 1.

**What it is.** Tap a verse and one panel (the existing `Sheet`: bottom sheet on
a phone, side panel from 1024 px) headed "John 3:16" lists, as rows in a fixed
order, every layer LiveWell holds for that verse, each with its count, empty
rows hidden. Each row opens in place with Back; Previous and Next verse sit at
the foot so the reader can walk the chapter without closing anything.

**Done best by.** Sefaria's connections panel (counted categories, zeros hidden,
panel mode in the URL); Olive Tree's Resource Guide (a lock that makes the panel
follow the reading); Blue Letter Bible's Previous and Next inside Tools; Bible
Hub's verse page as the place a search lands.

**On LiveWell.** `/study/bible/john/3?v=16&panel=church` opens the verse with
its panel. Rows: *Study note* · *Words (25)* · *Elsewhere in Scripture* · *The
church on this verse* · *A question it raises* · *On LiveWell* (essays,
devotions, plans, creeds, doctrines and topics that cite it). The last row comes
from a generated inbound citation index: `scripts/build-verse-index.mjs` runs
the U09 parser over every essay, devotion, plan, context guide, creed
annotation, Honest Answer and history session and writes
`client/public/bible/refs/<book>/<n>.json`, with a `--check` drift gate (the
`build-story-plan.mjs` precedent). It replaces the chapter-level "Go deeper on
LiveWell" fuzzy search, and every `VerseRef` sheet gains one line, "Cited in 3
other places on LiveWell." On desktop, a "Follow my reading" lock; `/` focuses
Find, arrows change chapter, Esc closes. Because the build keeps only the 12
strongest cross-references, the row reads "the 12 strongest" rather than a bare
count, unless the cap is raised. One in, one out: it retires "Go deeper on
LiveWell" and folds the current five-tab verse panel.

**Fit, effort.** Core · M. Depends on U09, U16, U37.

**Evidence.** Sefaria `ConnectionsPanel.jsx` (`urlConnectionsMode`, hidden zero
counts) and help center "How to Find Interconnected Texts"; Olive Tree help
center, Resource Guide and Study Center; BLB blog (Previous and Next in Tools);
LiveWell `ChapterNotes.tsx` ("Go deeper," six items) and `build-bible.mjs`
lines 181 to 207. (BR 4.1, TS 2.1.)

### 2. Read and Study: the quiet page by default, the instruments one tap away

*Merged from:* BR 2; TS 8.

**What it is.** A segmented control under the chapter title. **Read** sets the
chapter as literature: paragraphs and poetry lines, no verse numbers or
markers, Cormorant at reading size, 68ch. **Study** shows verse numbers, the
section headings from the chapter's `outline`, and a quiet mark on verses with
panel content. The existing interlinear stays as a third state, *Hebrew and
Greek*. The choice is remembered on the device and travels in a shared link
(`?mode=read`).

**Done best by.** Quran.com's Translation Reading Mode beside its Study Mode;
ESV.org's reader's mode and toolbar toggles; the Scaife Viewer, praised for
letting the reader "read undeterred"; Bibliotheca, whose maker argued that
Bible typography is "designed with reference, not readability, in mind."

**On LiveWell.** On `/study/bible/:book/:chapter`, Read is the default when the
reader arrives from Home, a devotion or the 2027 plan; Study when he arrives
from search or a verse link. Tapping a paragraph in Read offers "Study this
passage." Text size and line width sit in the same menu. The `outline` field is
present in all 1,189 chapters, so Study's headings need no new writing.

**Fit, effort.** Core · S.

**Evidence.** Crossway articles on reader's mode; Quran.com product updates
(January 16 and 22, 2026); Sansom's SCS review of Scaife (2019); Fast Company on
Bibliotheca (2014). (BR 4.2, TS 2.8.)

### 3. Every layer says who is speaking

*Merged from:* TS 2; BR 2.8 (NET's typed notes); DC 2.3 (the Catechism's small
print).

**What it is.** Five labels in small Inter caps over a hairline rule, no color
coding, used site-wide in the same words: **Scripture** (translation named),
**The church's witness** (dated, verbatim, sourced), **Study note** (typed
further as *What the words say*, *What the first readers heard*, *Where the
manuscripts differ*, *How it fits the whole Bible*), **James Bell** (his signed
judgments, so his voice is never mistaken for the text) and **Your notes (on
this device)**. An empty layer says so once, in words ("No early-church reading
is recorded for this verse yet").

**Done best by.** Quran.com's Study Mode notices ("distinct from primary
sources"; "should not be taken as authoritative"; "not exhaustive"); the NET
Bible's tn, sn and tc notes; the Catechism's small print for historical and
apologetic material; Sefaria's 2026 split of the Library from user Voices;
Scaife's attributions by role.

**On LiveWell.** A required `kind` on every block in the Bible notes, doctrine
pages and history sessions, enforced by extending `validate-bible-notes` (and
the session validator when U32 lands). The existing subject filters stay as a
second axis. On the debate pages, each position is labeled by who holds it, and
James's landing is labeled as his. This is foundational: patterns 1, 4, 5, 7
and 19 all use the labels.

**Fit, effort.** Core · S.

**Evidence.** `quran.com-frontend-next` `locales/en/quran-reader.json`; NET
note types (Logos, Bible Gateway, Naselli); Catechism "Practical Directions"
18 to 22 (vatican.va); Sefaria newsletter, February 2026. (TS 2.2.)

### 4. The church on this verse: dated, in order, verified

*Merged from:* BR 5; TS 3; DC 5.

**What it is.** The church's readers of a verse or passage, oldest first on a
thin time rule, each with name, place, date and work; paraphrase marked as
paraphrase, quotations verbatim and checked; where readers genuinely disagree,
one line saying so and naming the order of the question. The same source card
serves the catechism as "From the church's memory": one verbatim witness of up
to 80 words per question, beside James's own word.

**Done best by.** The Dartmouth Dante Project and Dante Lab (seven centuries of
readers under each line); Sefaria's commentary categories and its
"Chronological" sort; the New City Catechism's past and contemporary voice on
every question; in print, IVP's *Ancient Christian Commentary on Scripture*
(Thomas Oden, from 1998), a chain of early comments on each passage. The
closest Christian app, Catena (2015, run by volunteers), is the caution: a
reviewer reports it never names the edition it quotes.

**On LiveWell.** Two stages. *Stage one (M):* present what exists. The
`interpretation` field in 114 chapters already names its witnesses with dates
(John 3: Justin Martyr around AD 155, *1 Apology* 61; Tertullian around AD 200,
*On Baptism* 13; Chrysostom). Set it as a small dated rule at the foot of the
chapter, each dot opening its witness, and as a panel row for the verses it
names, labeled *Study note* because it is paraphrase. *Stage two (L):* verbatim
source cards (author, work, date, translator, public-domain basis) gated by
U07's `verify-sources.mjs`, so every excerpt is a normalized substring of a
stored public-domain text. Start with the verses the creeds rest on, the ten
"verses everyone quotes" guides, the passages the Part I and II sessions quote,
and the 76 catechism questions. Each card links to its writer's registry card
and history session (U30, U32).

**Fit, effort.** Core · M, then L. James reads the 76 catechism witnesses.

**Evidence.** Dartmouth Dante Project and Dante Lab about pages; Sefaria
`TopicPage.jsx` sort options; newcitycatechism.com; Wikipedia and IVP on the
ACCS; learnofchrist.com review of Catena; LiveWell
`client/public/bible/notes/john/3.json`. (BR 4.5, TS 2.3, DC 4.5.)

### 5. Questions first: the question this chapter, or this doctrine, raises

*Merged from:* BR 6; TS 5; DC 8.

**What it is.** At the head of a chapter's notes and of each doctrine page, the
one to four questions an honest reader already brings, the skeptic's first.
Each opens an answer that states the objection at full strength, names who
holds it, answers, and points onward (the church strip, the context guide, the
Honest Answer or essay). Doctrine pages add "Questions people ask," phrased the
way people type them ("Is the Trinity in the Bible?", "Did Nicaea invent the
deity of Jesus?"), and a quiet "Ask James a question" line that opens the
contact form with the page named.

**Done best by.** Sefaria's Guided Learning ("Key Questions," each with "N
Answers," AI-assisted and labeled); Quran.com's Answers tab; Logos Factbook's
suggested questions (November 2025); Got Questions, which splits one doctrine
into the questions people type; TGC's essays titled as questions; Alpha's
session titles ("Who is Jesus?").

**On LiveWell.** The `hard` field already holds steelmanned questions in 114
chapters (John 3: "If God loved the world, how can he condemn those who do not
believe, including those who never heard of Jesus?"). Surface it after "Where
we are in the story" as *The question this chapter raises*, set in Cormorant,
opening in the `Sheet`, and as a row in the verse panel. Beyond the 114, new
`questions[]` entries are content, chosen from Search Console data, written and
reviewed like any note. Rows feed the topics index (U25), passage search (U15)
and `llms.txt`. No AI, no chatbot, no promised reply time.

**Fit, effort.** Core · S for the 114 chapters; M for new content.

**Evidence.** Sefaria `GuideBox.jsx`; `quran-reader.json` Q&A keys; Logos
"What's New November 2025"; gotquestions.org Trinity pages; TGC Essays; Alpha
episode titles. (BR 4.6, TS 2.5, DC 4.8.)

### 6. One door for doctrine, entered by question, with the same ladder under every answer

*Merged from:* DC 1 (with its orientation note).

**What it is.** One landing where all of LiveWell's doctrine meets, with three
ways in: *By question* (the 76 catechism questions in the adult register, the
children's answer one tap away), *By the map* (pattern 8), *By the Bible's
order* (the ten loci and 62 doctrines). Under every answer the same short ladder
in the same order: **In Scripture** (the Study Bible doctrine study), **Confessed**
(the creed phrase that says it, opened at its annotation), **Where Christians
differ** (the debate page with its triage badge), **Words** (glossary terms). A
reader asks "Who is Jesus Christ?" and in three taps is reading what Nicaea said
and why Arius lost.

**Done best by.** New City Catechism (doctrine as 52 questions); the
Catechism's Compendium (each answer carries the full Catechism's paragraph
numbers); the Catechism's four pillars; Ligonier's Topic Index and Scripture
Index pair.

**On LiveWell.** Today the material sits on five shelves under five names:
`/family/catechism`, `/theology/doctrine/:slug` (31 pages), `/study/bible/doctrines/:id`
(62), `/resources/creeds/:slug` (14) and `/theology/glossary`. One joins file
maps catechism number to doctrine ids, creed phrase ids and glossary terms, with
a validator that every question has a doctrine link and every link resolves (37
of the 62 doctrines already point to a debate page). Each question gets a page;
the family page keeps its route and links to them. No redirects
(`/theology/doctrine/*` is on the Decision Log's never-redirected list). A
Doctrine row in the Study door is an IA change for James (MASTER-PLAN 3.3,
question 6).

**Fit, effort.** Core · M. James decides the door.

**Evidence.** EFCA blog on NCC; Compendium via Zenit and publisher listings;
vatican.va prologue; learn.ligonier.org; LiveWell `family-catechism.json`,
`theology/index.json`, `bible/doctrines.json`. (DC 4.1.)

### 7. In brief, with its proofs and its words

*Merged from:* DC 2, DC 4, DC 11.

**What it is.** Two to four sentences at the top of every doctrine and catechism
answer that a reader could carry out of the room. Each clause carries a small
letter that opens its Scripture in place. Technical terms keep their place in
the sentence, faintly underlined, with a two-line definition on tap.

**Done best by.** The Catechism's "In Brief" ("condensed formulae" that "could be
memorized"), and the Ascension Edition's boxed In Brief; NCC's adult answer
running "a sentence or two" past the child's; the Westminster Shorter Catechism
"with Scripture proofs" (OPC); Pilgrim, whose proof texts open in its reader;
YOUCAT's definitions in the margin.

**On LiveWell.** A white card lifted on the cream page, eyebrow "In brief" in
mustard, Cormorant Garamond 500, with Copy (`lib/clipboard.ts`) and Learn it
(pattern 22). Data: `inBrief` (60 words or fewer, checked for forbidden
language, read by James) and `proofs: [{ clause, refs }]` parsed by
`client/src/lib/scripture-ref.ts`, each opening a `VerseRef` sheet in the
page's one translation. On the debate pages the In brief states the triage in
sentences: what the church confesses, where faithful churches differ, where
LiveWell lands. In the catechism, where the wording allows, the children's
answer is the opening clause of the adult answer. Glossary terms from
`theology-glossary.json` open in place on a phone and in a right margin from
about 1100 px.

**Fit, effort.** Core · S for the components; M for the writing.

**Evidence.** vatican.va and USCCB on In Brief; Ascension Edition pages; OPC and
GCP proof editions; Pilgrim App Store listing; Ignatius Press on YOUCAT.
(DC 4.2, 4.4, 4.11.)

### 8. The doctrine map: what the creeds bind, what faithful churches dispute, what is open

*Merged from:* DC 3.

**What it is.** The order of importance drawn as three rings in ink on cream.
The center holds the confessional floor CLAUDE.md names (the Trinity, the deity
and humanity of Christ, the bodily resurrection, salvation by grace through the
cross, Scripture, the life of the world to come), each pointing to its Study
Bible study and creed phrase, not to a "debate." The middle ring holds the 20
second-order pages, the outer the 6 third-order ones. Tap a point: its question,
triage note and an Open link. A plain list below carries the same data in the
same order.

**Done best by.** C. Michael Patton's essentials chart and his "pushing
essentials" (described secondhand; the chart itself was not seen); the Ascension
Edition's color per pillar as the wayfinding idea, without the colors.

**On LiveWell.** Inline SVG from tokens on the doctrine landing; mustard only on
the selected point. It also shows James his own filing at a glance: today
"problem-of-evil" is filed first-order and the bodily resurrection has no page
of its own, both worth his confirming.

**Fit, effort.** Core · M. James confirms the filing.

**Evidence.** Credo House blog index and JBER article; Ascension Edition pages;
LiveWell `client/public/theology/index.json` (5 first-order, 20 second, 6
third). (DC 4.3.)

### 9. Honest uncertainty: two dates, and how sure we are of a place

*Merged from:* TS 4; BR 11; TS 14 (the authorship line of "About this book").

**What it is.** Where scholarship disagrees, the page shows the range and why.
"The Exodus: about 1446 BC on the early dating; about 1260 BC on the late
dating," with "Why two dates?" (each case at its strongest; a second-order
question). Primeval events carry no year. Places carry "certain," "likely" or
"disputed (3 proposals)." Authorship gives the traditional and the critical view
in one steelmanned sentence each.

**Done best by.** Accordance's Timeline, where the reader chooses "the scheme of
dates" (Exodus at 1446 BC or about 1250 BC); OpenBible's geocoding data
(confidence from more than seventy sources, a radius of uncertainty, CC BY 4.0).
The counterexample is Theographic, whose single Ussher and Jones chronology
(Creation 4004 BC) is stored as fact under a share-alike license.

**On LiveWell.** An "About this book" card on each book page and in the panel
(genre and how to read it; when and where, both schemes where disputed;
authorship both ways; place in the eleven acts), the same date line in
`story.json` acts and timelines, and a *Places in this chapter* list in Study
mode built at build time from OpenBible's `ancient.jsonl`, with attribution. A
validator rule: any pre-monarchy date needs `range` or `schemes`. Small locator
drawings on five or six hand-built regional outlines touch the parked atlas
(MASTER-PLAN 10.7), so they go to James with that question.

**Fit, effort.** Core · S to M (about thirty contested dates; the places list is
a build script).

**Evidence.** Accordance help, "Understanding Conservative vs. Critical Dates"
and "The Timeline"; `openbibleinfo/Bible-Geocoding-Data` readme and license;
Theographic `docs/chronology-and-dates.md`. (TS 2.4, BR 4.11, TS 2.14.)

### 10. The shape of the whole, with "you are here": the book, the story, the plan

*Merged from:* BR 3, BR 9; CL 1.

**What it is.** One drawing grammar used everywhere a reader needs bearings: a
horizontal band divided into labeled sections, the reader's place marked. The
book's band (Romans 1 to 4, 5 to 8, 9 to 11, 12 to 16) is the hero of the book
page and a 6 px strip under every chapter title that opens it. The eleven-act
band sits on every day of the 2027 plan ("Day 214 · The Prophets and Exile"),
and the first day of each act is an *act opening* that uses the act's existing
`world` and `watch` text. Later, a *By section* option lets a reader read Genesis
1:1 to 2:3, or the Sermon on the Mount, whole.

**Done best by.** BibleProject's book overview posters (a reviewer's practice:
read the text, then watch with the poster beside it); Ascension's Great
Adventure timeline (twelve periods, the books that carry the story told apart
from the books placed inside it, a special episode at every turn); Ligonier
Connect's roadmap; the ESV Study Bible's outlines.

**On LiveWell.** Inline SVG from tokens: past and future sections in
`--ink-muted`, the current one in `--ink`, a single mustard tick for "you are
here" (not Ascension's twelve hues, which the palette forbids). Data: one
hand-written section list per book (66 short entries) checked against the
`outline` field every chapter already carries; a "Written in this moment" label
where a prophet or psalm is set into the story. This is MASTER-PLAN 8.5's
"drawn teaching, sparingly," not a chart library.

**Fit, effort.** Core · M (the 66 lists; one component). *By section* reading:
strong, M to L, later.

**Evidence.** Faraday Institute and Loughborough pages on BibleProject posters;
Christian Post and BibleProject on movements; Ascension's Great Adventure hub,
colors PDF and help center; Ligonier on Connect; LiveWell
`guides/chapters-and-verses.json` (Langton's chapters "for teaching and
reference, not as an analysis of each book's structure"). (BR 4.3, 4.9; CL 4.1.)

### 11. Cross-references that show their words and say why

*Merged from:* BR 4 (with TS 15's quotation list as its seed).

**What it is.** Each reference prints the first line of the verse it points to,
strongest first, with its kind named where it has been checked ("quoted here,"
"the same promise," "the same word"). Tap to expand and "Read it in context."
Five show, then "Show all."

**Done best by.** The ESV app (cross-references in a sheet that can go full
screen); the Faithlife Study Bible and Lexham dictionary's floating verse
window; STEP's *Old Testament in New Testament* table; OpenBible's votes.

**On LiveWell.** Verse text comes from U16's text shards. Order is already by
votes (the build keeps the 12 strongest). The new work is printing the text and
a short, hand-checked list of New Testament quotations of the Old, starting
with the passages the essays and plans use most. If the build keeps the vote
numbers, the panel can say which links are strong without implying a total.

**Fit, effort.** Core · M.

**Evidence.** ESV Bible App Store note; Faithlife reviews (secondhand, 2013);
STEP `html/ot_in_nt.html`; `scripts/build-bible.mjs` line 207. (BR 4.4.)

### 12. Plans with doors and mercy

*Merged from:* BR 8; CL 2, CL 9, CL 13.

**What it is.** A plan shows position and today's reading, never missed days.
After a gap it offers two equal choices: pick up at your place, or join today.
It publishes its doors: a *Before Day 1* section, then an on-ramp at every act
and movement, each with a date and a calendar file. Long acts are divided into
movements of two to four weeks, each with its own start and close. Each day has
a fixed, short shape: the reading, a brief word after it, a line of prayer.

**Done best by.** Ascension's Bible in a Year ("designed to be started at any
point in the year"); The Bible Recap (prep episodes before January 1; "pick up
on today's reading"; read first, recap after); YouVersion's Catch Me Up; and
YouVersion's own partner rules, which accept fewer 365-day plans because
completion peaks between 3 and 21 days.

**On LiveWell.** U28 already has "Day 40 of 365," the place on the device and
"pick up at your place, or at today's day." Add *Before Day 1* from December 26;
one line all year ("Starting now? *The Kingdom* begins on Day 91, Thursday,
April 1," with Add to calendar); movements for the four long acts (the Kingdom
93 days, the Prophets and Exile 78, Exodus and Sinai 53); and *After you read*,
two or three sentences drawn from the existing chapter-note summaries. A daily
note in James's voice would be 365 pieces under the byline rule and waits on his
decision.

**Fit, effort.** Core · S (M for *After you read*).

**Evidence.** Ascension help center; thebiblerecap.com/start and church FAQs;
The Sweet Setup on Catch Me Up; YouVersion Partners plan FAQs; U28 patch
schedule counts. (BR 4.8; CL 4.2, 4.9, 4.13.)

### 13. The shared week: one rhythm across the Bible, the catechism, the table and the church

*Merged from:* TS 13; DC 10; CL 10.

**What it is.** One line and one page saying what LiveWell is reading this week
in every strand: the story (days 302 to 308, Jeremiah), the catechism question,
the devotion at the table, the season of the church year. Each item opens where
it lives. The same week goes out as a Sunday-night letter that doubles as the
pastor's sheet. Where a family devotion or reading plan belongs to the act the
adults are reading, the table says so.

**Done best by.** Sefaria's learning calendars (Daf Yomi, a page a day through
2,711 pages in about seven and a half years; the weekly portion module; a
weekly study-companion email); NCC's 52 weeks and the Heidelberg's 52 Lord's
Days; Ascension's Family Edition on the same timeline as the adult plan.

**On LiveWell.** `/study/this-week`, composed from what is already generated
(U28's schedule, the catechism's this-week pick in `familyCatechism.ts`, U17's
Tonight, `familyYear.ts`), and a one-line module on Home and the Study door,
rendered after mount from local data per the first-paint rules. Phrased as a
place in a shared rhythm ("Day 302 of 365"), never as a tally. Consider keying
the catechism to the church year (the Trinity questions in the week of Trinity
Sunday, the incarnation in Advent).

**Fit, effort.** Core · S to M. The letter is James's call (Substack).

**Evidence.** Sefaria `CalendarsPage.jsx`, `NavSidebar.jsx`, Daf Yomi page; EFCA
blog on NCC; Pilgrim listing; Ascension Family Edition announcements.
(TS 2.13; DC 4.10; CL 4.10.)

### 14. Your answer before ours, in your own words

*Merged from:* CL 3, CL 7.

**What it is.** The reader meets the question before the explanation, ordered
but never gated. Each plan day ends with the same short question and a one-line
field kept on the device; at the end of an act the lines come back in order.

**Done best by.** Bible Study Fellowship's fixed order (personal questions, then
the group, then teaching, notes last); The Bible Recap's daily lens and its
study guide with space to write; the testing effect (Roediger and Karpicke,
2006).

**On LiveWell.** On 2027 day cards: *What did today's reading show you about
God? What did it show you about us?* (wording for James; the second half keeps
the reader inside the indictment). On study guides, the participant view shows
the questions and key Scripture before the `teaching` text, which sits in a
*Read the teaching* disclosure. In history sessions, at least one source card
comes with two questions before James's narrative. No count of answered days, no
sharing.

**Fit, effort.** Core · S.

**Evidence.** bsfinternational.org; Christianbook listing of the Bible Recap
study guide; Roediger and Karpicke (*Psychological Science*, 2006). (CL 4.3,
4.7.)

### 15. A closing rite, not a certificate

*Merged from:* CL 8; DC 12.

**What it is.** When a part of the work ends (an act, a movement, a care plan, a
study guide, a history Part, a doctrine page), the reader gets an ending with
weight: Scripture, a prayer the church has prayed (verbatim, public domain,
sourced) or a short one in James's voice, the reader's own lines read back, and
the next door with its date. Doctrine pages end in prayer, never a takeaway
box.

**Done best by.** Daf Yomi's siyum at the end of every tractate; NCC's prayer at
the end of every question; Practicing the Way, which ends in a Rule of Life the
person makes. Against: Classroom's and ODBU's certificates, Hallow's "Longest
Streak," YouVersion's badges, Tabletalk's Coram Deo application box.

**On LiveWell.** One closing component reused by U28's acts, the care plans, the
study guides and the history Parts, with a printable closing for a group's last
meeting. No certificate, no confetti, no percentage.

**Fit, effort.** Core · S to M.

**Evidence.** Wikipedia on the siyum and Siyum HaShas; newcitycatechism.com;
Practicing the Way session 7; Hallow streaks FAQ; Ligonier on Tabletalk.
(CL 4.8; DC 4.12.)

### 16. Lead it in the room

*Merged from:* CL 4, CL 11; DC 14.

**What it is.** A full-screen mode for running a session in a room, large enough
for a television or a laptop at the head of a table: one step per screen, each
discussion question held on the screen while people talk, the leader's notes on
the leader's own phone. Its first screen is the host's covenant: no one has to
speak; the leader listens more than he talks; the hardest objection in the room
is welcome and is stated at its strongest before anyone answers; we stop on
time; eight or fewer around one table. Every doctrine debate page gains a
one-page group session in the same shape.

**Done best by.** Alpha's Film Series with Discussion Breaks (the host pauses and
the question appears on screen) and its host and team guides ("not to have all
the answers or to win an argument"); BibleProject Classroom's two named group
formats; Ligonier's flipped classroom.

**On LiveWell.** Built on The Table's `TableFrame` and `Stepper`:
`/studyguides/:slug?lead=1&step=4`, with `&leader=1` for notes. All 68 guides
already carry `timing`, `discussion` with a `behind` note and a
`facilitatorScript`. Segment minutes show as a quiet "about 35 minutes," never a
countdown; the screen is kept awake. History sessions (U32) reuse it. Doctrine
group pages are built to PDF by `scripts/build-pdfs.mjs`.

**Fit, effort.** Core · M.

**Evidence.** Alpha Film Series with Discussion Breaks; Alpha USA host notes and
team guides; BibleProject help center on groups; Ligonier on Sunday school;
LiveWell `client/public/studyguides/*.json`, `family/TableMode.tsx`. (CL 4.4,
4.11; DC 4.14.)

### 17. The whole path on screen one, dated for your church

*Merged from:* CL 5, CL 6.

**What it is.** Every course-shaped thing opens with its full path: numbered
sessions titled as the questions they answer, each with its length and kind of
work and a quiet mark for the ones done on this device. A leader picks a start
date and one of the guide's cadences, and the page writes the date beside every
session and hands back a link, a calendar file and a printable schedule. No one
tracks anyone.

**Done best by.** Ligonier Connect's roadmap; Alpha's question-shaped titles;
Dwell's plan names that state their size ("Romans in 7 Days"); Ligonier's group
schedule (without its member tracking).

**On LiveWell.** `/studyguides/after-christendom?start=2027-01-10&cadence=8`
opens the same dated roadmap for everyone it is sent to; *Add every meeting to
my calendar* (`.ics`) and *Print the schedule* (with the guide's `promoKit`
bulletin blurb). "Session 3 of 5" yes, "68% complete" no. Turning statement
titles into questions is a content edit for James.

**Fit, effort.** Core · S for the path; M for the schedule.

**Evidence.** Ligonier Connect posts; Alpha episode lists; Dwell App Store
listing. (CL 4.5, 4.6.)

### 18. The original languages: glance, then go deep, and the chapter's key words

*Merged from:* BR 7; TS 9.

**What it is.** A first touch on a word shows a small card: the original,
transliteration, gloss, "5 times in John, 13 in the New Testament." A second
touch opens the full entry. *Where else it appears* gains a 66-tick strip, one
per book. At the head of the chapter notes, three to six writer-chosen *Key
words* (John 3 turns on *anōthen*, "again" and "from above").

**Done best by.** STEP's quick lexicon ("Touch the word again to see more
information") and verse vocabulary; Logos's Bible Word Study (translation ring,
frequency sparkline); the Scaife word list.

**On LiveWell.** Built from the `w` array in each chapter file and the lexicon's
existing `n` and `r` data; morphology in plain words ("aorist active indicative:
a simple past act"). Word counts touch the parked "how often this word occurs"
(MASTER-PLAN 10.7), so the key-words chips wait on James, after Lent.

**Fit, effort.** Strong · S for the glance card; M for key words.

**Evidence.** STEP `view_quick_lexicon.js` and `InteractiveBundle.properties`;
Logos Grow and wiki on Bible Word Study; Scaife `WordList.vue`. (BR 4.7,
TS 2.9.)

### 19. Where the English had to choose, and translations compared

*Merged from:* TS 10; BR 12.

**What it is.** On about fifty verses where translation is interpretation (John
1:5 "overcome" or "understood"; John 3:3 "again" or "from above"; Romans 3:22;
Isaiah 7:14; Genesis 1:2), a faint dotted underline in Study mode opens *Other
ways to render this*: the renderings, two to four sentences on the Hebrew or
Greek, and the order of the question. A *Compare* row in the verse panel sets
the BSB beside the KJV, ASV or WEB with differences marked and, where the
difference comes from the manuscripts, one sentence linked to the chapter's
`text` note.

**Done best by.** Quran.com's Layers (phrase groups, "Alternative
Translations," expand and contract); the NET Bible's translator's and
text-critical notes; STEP's comparison modes that highlight differences.

**On LiveWell.** Typed as a *What the words say* note with a phrase anchor.
Public-domain texts are quoted; others are described, never quoted beyond
license. The `text` field exists in 114 chapters. One translation per page
holds: Compare is an instrument, not a second reading text.

**Fit, effort.** Strong · M (careful content, each reading steelmanned).

**Evidence.** Quran.com `StudyModeLayersTab`; NET note types; STEP comparison
strings. (TS 2.10, BR 4.12.)

### 20. Compare side by side: passages, creeds, and views with their replies

*Merged from:* TS 7; DC 6.

**What it is.** One compare view. Passages (Isaiah 53 beside Matthew 8:17; Mark
beside Matthew). Creeds (325 beside 381; the Apostles' beside the Nicene).
Doctrinal positions, row by row: in one line, the best case, the key texts, how
each reads the other's text, the text hardest for each, and each view's reply to
the other. A *Pin* action on any verse or source card fills a quiet foot bar
("2 pinned · Compare").

**Done best by.** Quran.com's Pin and Compare with its pinned-verses bar; Dante
Lab (up to four texts, "modeled on the analogue workspace of the professional
Dantista"); Zondervan's Counterpoints (essay, responses, rejoinder); Logos's
Theology Guide.

**On LiveWell.** `/study/compare?p=isa.53.4-6,matt.8.17`: columns on wide
screens, stacked with labels under 600 px. The Study Bible's parallel accounts
open it in one tap; U44's creed comparison uses it; the 26 second- and
third-order debate pages gain a Compare control, with a new `reply` field per
position in the form its own defenders would sign. James's landing stays in
"Weighing," after both sides. Pins live on the device.

**Fit, effort.** Strong · M (the `reply` writing is M).

**Evidence.** `quran-reader.json` pin and compare strings; Dante Lab about page;
Counterpoints publisher descriptions; Logos Theology Guide pages. (TS 2.7,
DC 4.6.)

### 21. Make something: notes on the verse, a study sheet to print

*Merged from:* BR 13; TS 6.

**What it is.** A note written from the verse panel reappears beside that verse
and gathers on *My notes in John*. *Add to my sheet* on every verse, source
card, study note and essay pull-quote builds a one- or two-page study at
`/study/sheet`: passage, card, note, the reader's own comment, a discussion
question; reorder, title, print, share.

**Done best by.** Sefaria's source sheets ("Add to Sheet" from inside the
reader; sheets attached to the passages they cite; export); Logos's notes that
"stick to the verses"; Olive Tree's notes stored on the device.

**On LiveWell.** `lib/library.ts` through `lib/storage.ts`, with the house
save-failure line. Print through a print stylesheet (the Crossway notice where
ESV is quoted). Share encodes references and ids in the URL, so a recipient
opens the same sheet with no server and no account. No public gallery; a few
starter sheets by LiveWell for pastors. Reuses `TakeItWithYou`; pins (pattern
20) hand off to it.

**Fit, effort.** Strong · M for notes; L for the sheet.

**Evidence.** Sefaria help on sheets, `SheetOptions.jsx`,
`SheetsWithRefPage.jsx`; logos.com on notes; Olive Tree help center. (BR 4.13,
TS 2.6.)

### 22. Learn it by heart, with no scoreboard

*Merged from:* DC 9 (with BR's memory-app notes).

**What it is.** A short private drill on any catechism answer, In brief, creed,
or saved verse: read it; first letters only; words fading; say it, then reveal.
What the reader knows shows only as a quiet "You know these" list on his own
page.

**Done best by.** The Heidelberg Catechism (RCUS) app's three memorization tabs;
first-letter recall in biblememory.com and Remember Me; NCC's songs (not ours
to copy; sung settings are a question for James).

**On LiveWell.** Reuse the first-letter drill in
`client/src/pages/tools/ScriptureMemory.tsx`, as U44 already plans for the
creeds; `livewell-progress-catechism`; the children's answer by default when the
family band is set. No streaks, no reminders, no points.

**Fit, effort.** Strong · S.

**Evidence.** RCUS Heidelberg App Store listing; biblememory.com and remem.me
technique pages; PuritanBoard on word-perfect recall. (DC 4.9.)

### 23. Threads across the canon, and sources in history's order

*Merged from:* BR 10; TS 12.

**What it is.** A doctrine, theme or word drawn as one band of the 66 books with
a mark where it is taught, each mark opening the chapter at its note. Doctrine
and topic pages gain a *Sources* section that switches between *In the Bible's
order* and *In history's order*: Scripture first, then dated source cards, then
LiveWell's own writing, last and labeled.

**Done best by.** BibleProject's Themes and Word Studies; Sefaria's topic pages
(Notable Sources; "Relevance" or "Chronological"; relevance drawn from the
*Aspaklaria*, a thirty-volume human index, not from clicks); Logos's Topic Guide.

**On LiveWell.** The band tops `/study/bible/doctrines/:id`, using pattern 10's
component so the site has one drawing language. `?order=time` on doctrine pages
and U25 topic pages. On "the poor," the reader moves from Deuteronomy and Amos
through Basil and Chrysostom to the Reformers and sees the concern is older than
any party, which is the Constitution's "older than my culture" delivered by
structure. Hand-curated; no trending.

**Fit, effort.** Strong · M (depends on patterns 1 and 4).

**Evidence.** BibleProject help center video categories; Sefaria `TopicPage.jsx`
and "Topics: What Are You Curious About?"; Logos wiki Topic Guide. (BR 4.10,
TS 2.12.)

### 24. People, places and events as cards on one registry, Genesis to now

*Merged from:* TS 11 (with BR 11's places).

**What it is.** Every name opens a card: who, when (honestly dated), where (with
confidence), family, and every scene in order ("Nicodemus: by night, John 3;
in the council, John 7; at the tomb, John 19"). A *People and places* reading
mode underlines the names.

**Done best by.** Theographic's shape (every verse linked to its people, places
and events); the Scaife Viewer's named-entities mode with an entity map;
Sefaria's person topics ("Lived," "Works on Sefaria"); Bible Odyssey's people,
places and passages.

**On LiveWell.** Extend the history registry (U30) backward so one registry
runs from Abraham to Barmen with one sheet component. Seed from STEPBible's
TIPNR and OpenBible's geocoding (both CC BY 4.0), never Theographic (CC BY-SA,
Ussher dates, Easton's 1897 dictionary). Cards open by query parameter
(`?person=nicodemus`); pages only past the plan's 150-word threshold.

**Fit, effort.** Strong · L.

**Evidence.** Theographic readme, `people.json` field counts, data-source
bibliography; Scaife frontend packages; Sefaria `TopicPage.jsx`; Brandeis and
SBL on Bible Odyssey. (TS 2.11.)

### 25. Trace the argument

*Merged from:* DC 7.

**What it is.** For the ten or twelve passages that carry the most doctrinal
weight (John 1:1 to 18, Philippians 2:5 to 11, Colossians 1:15 to 20, Romans
3:21 to 26, Ephesians 2:1 to 10, 1 Corinthians 15:1 to 8), the passage set as
phrases with subordinate clauses indented. Each tap of Next draws one mark (the
repeated word underlined, an arc from "for" to the claim it grounds, a bracket
around the purpose clause) with one sentence of James's beneath. The last step
shows the whole marked passage and the doctrine it grounds.

**Done best by.** Desiring God's Look at the Book (the camera on the text while
the pen underlines and draws connections); Biblearc (phrasing and arcing).

**On LiveWell.** Inline SVG and text, keyboard operable; with reduced motion
every mark shows at once; text in the page's one translation within
MASTER-PLAN 9.4's limits. It is the most attention-holding pattern in this
wave that stays honest: the interaction is the reader looking harder at the
text (section 3).

**Fit, effort.** Strong · L (the component is M; each passage is M of careful
work).

**Evidence.** Faithlife and Logos product pages for Look at the Book;
biblearc.com; desiringgod.org labs listings. (DC 4.7.)

### Also considered, not ranked

- **How the New Testament quotes the Old, drawn once** (TS 15): a 66-book
  baseline with arcs only for checked quotations and allusions, each opening
  both passages in pattern 20's compare view, with a list equivalent. Maybe, M,
  after patterns 11 and 20. The one spectacle in this wave that tells the truth;
  it waits because it is worthless until every arc opens real text.
- **Listening with the text following** (BR 14, CL 15): maybe, L. Depends on
  James recording; any recording ships with its full text and a listening guide.
- **"What do I actually believe?" self-check** (DC 13): maybe, M. High value to
  pastors; real risk of the certainty trade if the copy slips into scoring.
- **A companion book for Lent** (CL 14, Augustine's *Confessions* in NPNF) and
  **a practice from the church's own past per history session** (CL 12): both
  belong to the history course and the church year; James decides.
- **A verse-link script for PCN church websites** (Sefaria's Linker, 150+
  sites): strong for distribution, after the verse index exists.
- **Art at each catechism part** (the Compendium's fourteen works): good;
  rights checked work by work.
- **A human chat** (Ask Ligonier): beyond one pastor; pattern 5's "Ask James"
  line is the honest version.

---

## 3. The tensions: "draw people's attention" against "Unhurried. Weighted. Grown-up."

James asked for things that draw attention. The brand asks for a quiet room
with good light. These pull against each other in seven places. In each, the
best products show a resolution, and the resolution is nearly always the same:
**let attention be earned by what the text and the tradition actually hold,
shown at the moment the reader reaches for it, and never by motion, counters,
or rewards.**

**1. Spectacle against the text.** The pull: arcs, animated maps, video,
hover effects. Harrison and Römhild's 63,779 cross-reference arcs were made
"more beautiful than functional"; a viz.bible remake had to collapse them to
chapters; Underbelly's spotlight hover suited a campaign site, not a reader; the
BibleProject app's videos "take FOREVER to load," a Play Store user writes, and
a reviewer calls it "not a full Bible reader." How the best resolve it: BibleProject's lasting artifact is the
*poster*, one still drawing of a book's design that people keep; Scaife earned
praise for what it removed; Dwell wrote "digital wellbeing" into its player
goals. The research in `benchmark.md` agrees: interactivity raised engagement
and recall but not comprehension (CHI 2026), and Snow Fall's imitators became
"bells and whistles." **Rule:** every drawing opens into texts and has a list
equivalent; motion appears only where it carries meaning (the mark that moves
with a narrator, the next step of Trace the argument) and stops under reduced
motion; no autoplay, no zoomable canvas.

**2. Habit against dignity.** The pull: the streak is the most effective habit
mechanic anyone has found (a reviewer's verdict on YouVersion), and Hallow and
Quran.com count streaks, minutes and goals. How the best resolve it: Daf Yomi
holds readers through a seven-and-a-half-year cycle with no badge, by a shared
page and a rite at the end; NCC and the Lord's Days hold families with one
question a week; YouVersion's own Catch Me Up and partner data concede that
long chains break. The meta-analysis CL cites (Deci, Koestner and Ryan, 1999)
is the general argument against completion rewards for a practice meant to be
loved. **Rule:** position, not performance; the habit is the shared calendar,
the open door at every joint, and the closing rite (patterns 12, 13, 15).

**3. Depth against the first phone screen.** The pull: LiveWell has more per
chapter than most free readers, and the temptation is to show it. STEP's own
guide admits "a lot of functionality packed in"; Sefaria's panel carries twenty
buttons including "Share on X" and "Feedback." How the best resolve it: one
panel, counted rows, empty rows hidden, everything one tap away, and the
default view the quietest (Sefaria's counts, Quran.com's reading mode, ESV's
reader's mode). **Rule:** the first phone screen shows the chapter's words; the
depth is visible as a short table of contents in the panel, never as apparatus
in the line (patterns 1 and 2).

**4. Counts as information against counts as applause.** Sefaria's count of
the sheets that use a verse tells a reader where depth is. Hallow's "1.91M joined" and
Sefaria's own "Trending Topics" and sheets sorted by views import popularity
into a library. **Rule:** count things in the library (references, witnesses,
essays that cite a verse), never people, and never a number no one has checked.

**5. Color as wayfinding against the palette.** Ascension codes twelve periods
in twelve colors and the four pillars of the Catechism in four; Sefaria gives
each genre a colored line. It works, and it would break a contract that keeps
mustard under 8% of any viewport. **Rule:** position, label and one mustard
tick carry the same information (pattern 10); authority is labeled in small
caps over a hairline, not color (pattern 3).

**6. One trusted voice against the many voices of the church.** The pull: The
Bible Recap and Fr. Mike Schmitz show people will follow one voice through the
whole Bible, and James's voice is LiveWell's moat (`benchmark.md` gap 10). The
risk is a single voice that sounds like the text, or a single tradition that
sounds like "what the Bible says" (the criticism Got Questions, TGC's essays and
the State of Theology all draw), or a persona that claims authority it lacks
(Catholic Answers' "Father Justin," withdrawn within a day). How the best
resolve it: NCC sets a past and a present voice on every question;
Counterpoints lets each view answer the others; Quran.com labels each layer;
Bible Study Fellowship puts the reader's own answer first. **Rule:** James
speaks clearly and is labeled as James, after the text, after the church's
witnesses, and after the reader has answered for himself (patterns 3, 4, 14,
20); no bot speaks in his name.

**7. Personal features against no accounts, and groups against surveillance.**
The pull: notes, sheets and progress usually sit behind sign-up (Sefaria,
ESV.org, Quran.com), and group platforms track members (Ligonier's leader view,
RightNow's assignment completion, YouVersion's friends' progress). How LiveWell
resolves it, ahead of the products: personal state on the device, said plainly,
with print and share-by-URL so it can leave the browser; group state as a dated
schedule in a link, with nothing recorded about who attended. The honest cost
(notes do not follow a reader to another device) is stated, not hidden.

**What draws attention, honestly.** The ranked list already contains the
attention James asked for, each piece earned by content: a hard question set in
Cormorant at the head of a chapter (5); a verse whose panel shows "The church on
this verse" with a dated rule from AD 155 to now (1, 4); the reveal that John 3
turns on a word meaning both "again" and "from above" (18, 19); a drawn band
that says "you are here" in Romans (10); the doctrine map that shows, in one
glance, what is the faith and what is argument (8); Trace the argument, step by
step (25); a This week line that tells a reader others are on the same page
(13); and a sheet a pastor can print in ten minutes (21). None needs a counter,
a badge, or a moving picture.

---

## 4. Completeness: what this wave could not see or did not cover

Each item names the product or page, the question, and why it matters to a
pattern above. Ordered by how much the answer could change the plan.

### 4.1 First, LiveWell's own data (outranks everything below)

- **Search Console and Vercel analytics for `/study/bible/*`, `/theology/doctrine/*`,
  `/family/catechism` and `/answers`.** Which chapters, verses and doctrines
  real readers arrive on, and from which queries. This decides which chapters
  get new `questions[]` beyond the 114 (pattern 5), where the church strip
  starts (4), which fifty verses get translation notes (19), and whether the
  verse panel or the chapter page is the real landing (1). No cluster could
  reach it.
- **Telemetry on the current Study Bible (MASTER-PLAN 9.9).** How often the
  verse panel, word panel and each chapter-notes drawer are opened today, as a
  baseline before patterns 1 and 2 change them.

### 4.2 Nothing was seen live: what to capture when network access widens

Capture each at 390 x 844 and 1440 x 900, and note type, spacing, panel
behavior on a phone, focus handling and load weight:

- **Sefaria** `sefaria.org/Genesis.1.1` with the connections panel open (how
  counts and hidden rows look; how the panel behaves at phone width) and one
  topic page with the Chronological sort (patterns 1, 23).
- **Quran.com** a verse in Study Mode (tab order, how the authority notices are
  set, Layers expand and contract) and Translation Reading Mode (patterns 2, 3,
  19).
- **ESV.org** John 3 in reader's mode and with notes; whether study notes sit in
  a side column on the web; keyboard shortcuts (pattern 2).
- **BibleProject** a book overview page and poster, and whether the website has
  its own reader (pattern 10).
- **Bible Hub** `biblehub.com/john/3-16.htm` and **Blue Letter Bible**'s Tools
  for John 3:16: density, ad load (reported, unconfirmed) (pattern 1).
- **STEP** the quick lexicon on touch (pattern 18).
- **newcitycatechism.com** a question page: is there an adult/child toggle on
  the web, and how do the two commentaries and the video sit (patterns 4, 7)?
- **Ligonier** learn.ligonier.org's Topic Index and Scripture Index; its own
  Reformation Study Bible reader (pattern 6).
- **TGC Essays** a page layout and the twelve category names; **Got Questions**
  an article's structure (summary, related questions, sourcing) (pattern 5).
- **A logged-in course player** (BibleProject Classroom, Ligonier Connect,
  RightNow) and **Hallow**'s screens, through trials: how the roadmap and resume
  are drawn (patterns 16, 17).
- **Accordance**'s Timeline: how a reader switches the dating scheme in
  practice (pattern 9).
- **YouVersion** the current streak design and the help-center wording for
  Plans with Friends; **Bible in a Year**'s Messianic Checkpoint placement
  across the year (patterns 12, 13).
- **Desiring God** a Look at the Book lab page (pattern 25); Patton's
  essentials chart itself (pattern 8; the ring labels used so far are a
  commenter's).

### 4.3 Products this wave did not cover and should have

- **Catena: Bible & Commentaries** (catenabible.com and apps, since 2015). The
  closest existing product to pattern 4: patristic comments attached to verses
  (one reviewer counts 222 comments on John 3's 36 verses). Check how it dates
  and attributes each comment, since the same review says it never names the
  edition it quotes, and how it orders them. It is the competitor to beat on
  pattern 4, and the proof that undated, unsourced is the failure mode.
- **IVP's *Ancient Christian Commentary on Scripture*** (Thomas Oden, from
  1998, about 29 volumes) and ***Reformation Commentary on Scripture*** (Timothy
  George). The print catena. Check one page of each for how excerpts are chosen,
  dated and cited. They are in copyright, so LiveWell links or paraphrases with
  attribution, never quotes at length.
- **Thomas Aquinas's *Catena Aurea*** on the four Gospels, in the English edited
  by John Henry Newman (Oxford, 1841 to 1845), public domain by date. A
  candidate stored text for U07 that would give the Gospels a verified,
  verse-ordered chain of patristic comment. Check that the online copy (CCEL and
  mirrors) reproduces the 1841 to 1845 text and not a modern reprint.
- **The Codex Sinaiticus Project** (codexsinaiticus.org): choose a book,
  chapter and verse and see the manuscript page beside its transcription. A
  "see it in the manuscript" link would give *Where the manuscripts differ*
  (patterns 3, 19) a primary witness. Its license is CC BY-NC-SA, so link out,
  never embed; a DFG-funded project plans a replacement portal, so check
  link stability. Also check the INTF's New Testament Virtual Manuscript
  Room and CSNTM for the same.
- **The Skeptic's Annotated Bible** (Steve Wells; online since 1999, KJV,
  annotations sorted into categories such as contradictions and injustice, a
  print edition in 2013). The skeptic's own verse-level study tool. Check which
  chapters its most-cited objections land on and whether LiveWell's `hard`
  entries (114 chapters) meet them. Writing toward the skeptic requires seeing
  his reference shelf, and no cluster looked at it.
- **Other traditions' catechesis.** The ACNA catechism *To Be a Christian*
  (2020), Luther's Small Catechism in its apps, and an Orthodox source (the
  *Orthodox Study Bible*'s notes). The doctrine cluster saw Reformed and
  Catholic models only; the both-directions guardrail and pattern 20's "each
  view answers the other" need the others seen.
- **Baptist confessional texts on LiveWell's own shelf.** The 1689 London
  Baptist Confession and the New Hampshire Confession are summaries; the
  Heidelberg and Westminster Shorter Catechism are only Q1; Keach's Baptist
  Catechism (1693) is absent. Patterns 4, 6 and 7 need full public-domain texts
  stored for verification (MASTER-PLAN 7.3 already calls this content work).
  Never imply Southern Baptist membership in how they are framed.
- **Explorable explanations and interactive essays** (Bret Victor's and Nicky
  Case's work, newsroom interactives). The best outside models for pattern 25
  and the tension in section 3, item 1; belongs with the wave on engaging
  articles.
- **Audio Bible sources** (Faith Comes By Hearing's Bible Brain and any BSB
  recording): license and availability, for "Listening with the text
  following."

### 4.4 Data and license questions left open

- **OpenBible cross-references:** the license as stated at the source (a third
  party says CC BY 4.0; the build records CC BY), what a vote means, and why the
  source carries negative votes (the build's regex accepts them and drops
  anything under one). Decide whether to raise the cap of 12 and keep the vote
  numbers (patterns 1, 11).
- **OpenBible's NT-to-OT subset:** how many links and how they are marked, for
  the checked quotation list (pattern 11, and the arc page if it is ever built).
- **STEPBible TIPNR:** current license and coverage of biblical people and
  places (pattern 24).
- **Theographic:** the repository says CC BY-SA 4.0 and an older page CC BY 4.0;
  the plan is not to use it, but record the decision.
- **The ESV:** Crossway's current permissions page, read verbatim, before any
  pattern quotes ESV text in proofs, compare views or printed sheets
  (MASTER-PLAN 9.4).
- **Usage evidence for any study feature** in any product (which features
  readers actually use). None was found; none should be quoted.

### 4.5 Questions for James that this wave raises

Collected so the planner can date them: the Doctrine door in the Study menu
(pattern 6); the triage filing of problem-of-evil and a page for the bodily
resurrection (8); places and locator drawings with the atlas question (9); key
words and counts, after Lent (18); the wording of the daily question (14); a
James-voiced daily note in the 2027 plan, or none (12); the Sunday-night study
letter (13); sung settings of the catechism (22); and the Lent companion book
(also considered).

---

## Sources added in this synthesis

Five searches, for section 4 only (everything else is in the cluster files'
evidence sections):

- [faith.tools, Catena Bible and Commentaries](https://faith.tools/app/274-catena-bible-and-commentaries), [learnofchrist.com, Catena review](https://learnofchrist.com/resources/catena-bible), [App Store, Catena](https://apps.apple.com/app/id1218663640): patristic comments per verse; founded 2015 by Coptic Orthodox volunteers; density on John 3; the edition not named.
- [Wikipedia, Ancient Christian Commentary on Scripture](https://en.wikipedia.org/wiki/Ancient_Christian_Commentary_on_Scripture) and [IVP, Genesis 1-11 (ACCS)](https://www.ivpress.com/genesis-1-11-accs-ebook): Oden as series editor; catena form; first volume 1998.
- [Wikipedia, Catena (biblical commentary)](https://en.wikipedia.org/wiki/Catena_(biblical_commentary)) and [Newman Friends International bibliography](https://www.newmanfriendsinternational.org/en/?p=4850): the *Catena Aurea* in Newman's edition, Oxford 1841 to 1845.
- [Codex Sinaiticus Project, the edition](https://codexsinaiticus.org/en/project/edition.aspx), [transcription](https://codexsinaiticus.org/en/project/transcription_detailed.aspx), [DFG project](https://gepris.dfg.de/gepris/projekt/492870185?fontSize=0): verse navigation to image and transcription; CC BY-NC-SA; a replacement portal planned.
- [Inland 360 on the Skeptic's Annotated Bible](https://inland360.com/books/2013/08/doub%25E2%2580%25A0ing-s%25E2%2580%25A0ephen-skeptics-version-of-the-bible-by-moscow-author-questions-how-good-the-good-book-really-is/) and [Amateur Exegete review](https://amateurexegete.com/2021/02/13/evangelical-atheist-eisegesis-the-skeptics-annotated-bible-3/): online since 1999; print 2013; annotation categories.
