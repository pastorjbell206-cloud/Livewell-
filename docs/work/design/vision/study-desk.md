# The Study Desk

A design direction for the LiveWell redesign, one of four written in step 3 of
the design program (`docs/work/NOTES.md`, "James's redesign brief"). Prepared
2026-10-27.

**Starting conviction.** LiveWell is first an instrument for studying Scripture
and doctrine, as serious as Sefaria or Logos and as calm as a good library.
Everything else (essays, history, family, topics) hangs off the text and the
verse. This document pushes that as far as it honestly goes, and says where it
stops.

**Read before writing:** `CLAUDE.md`; `docs/work/design/CRITIQUE.md` and the
seven reports in `critique/`; `research/A-SYNTHESIS.md`, `B-SYNTHESIS.md`,
`C-SYNTHESIS.md`; `docs/work/plan/MASTER-PLAN.md` sections 0 to 3, 7, 8, 10.6
and 11; `docs/work/NOTES.md`; the screenshots in `shots/current/`.

**Checked in the repo for this document**, so the direction is sized to what
exists:

- Every one of the 1,189 chapter notes (`client/public/bible/notes/<book>/<n>.json`)
  carries `summary`, `story`, `historical`, `cultural`, `literary`, `outline`,
  `doctrines`, `words`, `christ`, `teach` (`big`, `outline`, `pitfalls`,
  `pastoral`) and `questions` (`observe`, `interpret`, `apply`). `hard`,
  `interpretation` and `text` are filled in 114 chapters (A-SYNTHESIS, checked).
- Verse-by-verse notes exist for 202 chapters in 25 books: 4,311 verse
  entries whose fields are already typed by kind (`context` 4,311, `refs`
  4,309, `grammar` 4,274, `words` 4,274, `theology` 3,241, `history` 1,504,
  `parallels` 1,360, `text` 897, `ot` 678, `nt` 78).
- `client/public/bible/doctrine-verses/` holds 62 files, one per doctrine, each
  a list of `book/chapter`, verse and note: the data a "thread across the
  canon" needs already exists.
- John 1 costs 5.8 KB as a text shard (`bible/text/john/1.json`, U16), 36 KB as
  notes and 54 KB as the full chapter with the interlinear (`bible/ch/john/1.json`).
- Neither the shards nor the full chapter files carry paragraph or poetry
  marks: Psalm 23's superscription runs into verse 1 ("A Psalm of David. The
  LORD is my shepherd..."). Paragraphing Scripture is new data, not a style.
- `books.json` has `code`, `slug`, `name`, `testament`, `chapters`; no division.
- `search-index.json` is 128 KB; `bible/notes-index.json` (chapter titles) 122
  KB; `theology/theology-glossary.json` 74 KB; `bible/doctrines.json` 31 KB.
- `client/src/pages/StudyBible.tsx` is 843 lines; `components/study/Sheet.tsx`
  89; `components/VerseRef.tsx` 176; `lib/siteSearch.ts` 270.
- `vite.config.ts` line 22 sets the service worker to `selfDestroying: true`,
  so the runtime caching rules below it do not run today. Offline reading is a
  decision, not a setting (MASTER-PLAN 11 lists it as not proposed).
- On `main` (waves 1 and 2, #536 and #538): the essay gate and first screen,
  cleanup, the one Scripture parser (`lib/scripture-ref.ts`), the church-year
  rules, family repairs, `Sheet`, `Stepper`, `Position`, `PageHead`, The Table
  (Tonight, devotion pages, table mode), Advent, Find in the header and
  `/search`, `VerseRef` with text shards, the faster home page. Built and
  reviewed on the work branch, awaiting James's merge: U07 (sources corpus and
  verifier), U11, U18 (Home Find and tonight), U19 (the doors), U21, U25
  (topics), U28 (the 2027 plan), U29.

**Conventions.** "A 1" is pattern 1 of `A-SYNTHESIS.md`, likewise B and C.
"Critique #3" is problem 3 in `CRITIQUE.md`; "critique Q5" is its question 5.
Units are MASTER-PLAN units. No product feature is named here that the
research did not report, and no LiveWell fact that was not checked.

---

## 1. The promise

**In one sentence:** open any verse on LiveWell and the whole library gathers
around it, each layer labeled by who is speaking: what the words say, what the
first readers heard, what the church has said about it across twenty
centuries, where Christians still differ, and what it asks of an ordinary
Tuesday in post-Christian America.

**Why this is the right direction for James's mission.**

1. **It is where the material already is.** Notes on every chapter, Greek and
   Hebrew under every word, 4,311 typed verse notes, 62 doctrine studies with
   their verses, dated church readings and steelmanned hard questions in 114
   chapters, 31 triaged debate pages, a 76-question catechism, 14 creeds, 41
   context guides. Every critic found the same thing: the depth is there and
   the joins are not (critique §1: "Most of the distance is arrangement, not
   material").
2. **It is the critique's own conclusion, finished.** Seven critics with seven
   lenses landed on "one study surface, the Study Bible chapter, that
   everything else plugs into" (critique §1, #1, #2, #3). The Study Desk takes
   that sentence as the organizing principle of the whole site rather than as
   one fix among ten.
3. **It wins the skeptic with structure, not tone.** He trusts what he can
   check. "A reference that does not open cannot be checked, and being
   checkable is the site's trust contract with the skeptic" (critique #3). On
   the desk every claim is one tap from its text, every voice is labeled, and
   the church's witnesses carry their dates.
4. **It holds the one opening nobody else holds.** Wave A's verdict: "the
   church's long memory set beside the verse, dated, attributed and verified,
   for a lay reader." Sefaria does it for its tradition and the Dartmouth Dante
   Project for one poem; of the closest Christian app (Catena), a reviewer
   reports that it never names the edition it quotes.
5. **It answers the post-Christian question the way the church always has: by
   reading.** Jeremiah 29 was written to exiles, Daniel 1 to 6 is court life
   under a foreign king, 1 Peter is addressed "To the elect who are exiles of
   the Dispersion" (1 Peter 1:1, BSB).
   Set beside the dated record of how the church read those texts under Rome,
   after Constantine and after Christendom, the reader sees that the concern
   is "older than my culture," which is the Constitution's final impression
   delivered by structure (A 23).
6. **It settles the tension in the brief honestly.** James asked for things
   that draw attention; the brand asks for a quiet room. The most arresting
   thing a study site can show is a verse that opens: a hard question set in
   Cormorant at the head of the chapter, a thin time rule from AD 180 to now
   under one verse, a band that says "you are here" in the whole canon (A §3,
   "What draws attention, honestly").

**What it is not.** Not Logos: no feature count, no accounts, no paywall, no
reading list of 40 panes. Not a Bible app with streaks: position, never
performance (MASTER-PLAN 2). Not a reference engine that drowns James: his
voice is a labeled layer, placed after the text and the church's witnesses and
after the reader has answered for himself (A tension 6), and his essays keep
their own door.

**Where the conviction stops.** A desk is for people who came to study. The
parent at 9 p.m. and the seeker whose marriage is in trouble did not. So the
desk does not stand in front of Family or Find Help; it stands under them.
Tonight and Find Help keep their own front doors and their own first screens.
Every page they hold leads, when the reader wants it, down to the same text on
the same desk. The practical door first, the depth behind it (CLAUDE.md,
"When they conflict").

---

## 2. Information architecture

### 2.1 The doors: keep James's five

**Recommendation: Study, Topics, Family, Essays, About**, with Find, Find Help
and Subscribe beside them, exactly as James chose on 2026-10-26 and as U19
built.

I tested two stronger desk shapes against it: the IA critic's *Bible ·
Doctrine · History · Our Moment · Living*, and a desk-native *Bible ·
Doctrine · History · Topics · Family* with Essays and About moved to the
utility row. I decline both:

- James chose his doors one day before this document, and changing them again
  contradicts a Decision Log entry only he can change.
- Both demote Essays, which is James's voice and the platform's moat
  (`benchmark.md` gap 10), and About, which is the man the skeptic needs to see
  before he trusts the desk.
- In this direction the strongest door is not a label. It is the Find field,
  present on every page, that opens any passage, word, doctrine, person or
  question. A door named "Bible" adds less than a field that opens John 1:14
  from anywhere.

**What it asks of James** (critique Q3): let Study hold three named rooms,
*The Bible*, *Doctrine*, *Church history*, as the first three rows of its menu,
each with a one-line descriptor, so doctrine is one tap from the header
without a sixth door. That is a menu edit in `siteNav.ts`, not a new door.

**The menus** (phone: a bottom sheet with the `--scrim` behind it and the Find
field in the top slot, per the mobile and IA critics; desktop: a short panel
under each door):

| Door | Rows, in order |
|---|---|
| **Study** `/study` | The Bible (66 books, every chapter) · Doctrine (what the church confesses, where it differs) · Church history (two thousand years, one story) · Paths (where to start, at your pace) · Creeds and confessions · The Bible in its world (context guides) · Read with a group · This week |
| **Topics** `/topics` | The questions, in your words · What "post-Christian" means · Honest answers · Test the Case · Eight-week plans for a hard season · Find Help |
| **Family** `/family` | Tonight at the table · The devotions · The catechism · The church year · This week at your table · Moments (when nobody planned it) |
| **Essays** `/writing` | The shelf · Essays by passage · Start with these |
| **About** `/about` | James · Books · Speaking · Contact · How we write · What's new and corrections |

Rows for pages not yet built (Paths, This week, Moments, How we write, What's
new) appear only when their pages ship; until then the menus hold what U19
built.

**The utility row.** Find (a visible field on desktop with a `/` hint, an icon
on phone), Find Help in `--mustard-text` (unchanged, the one colored item),
Subscribe as an outline button (today's black fill outweighs the wordmark,
brand critic), My Library inside the menu sheet on phone and as an icon on
desktop. On reading pages (the desk, essays, sessions, care pages) the header
hides on a downward scroll and returns on an upward one (mobile #17).

**"You are here."** Every page carries a breadcrumb that names its door and
room ("Study › Doctrine › Creeds › The Nicene Creed"), and the door lights for
every page beneath it, whatever the URL says (IA M1). URLs do not move; the
breadcrumb is the map.

### 2.2 The map

URLs on the Decision Log's never-redirected list stay where they are. New
routes are few and each goes through the 9.3 route checklist.

| Room | Routes | State |
|---|---|---|
| Home | `/` | Rebuilt (section 3) |
| Study, the door | `/study` | Rebuilt as the desk's front door (5.1) |
| The Bible | `/study/bible` (canon map), `/study/bible/:book` (book page), `/study/bible/:book/:chapter` (**the desk**), verse state `?v=14&panel=church&depth=study` | Rebuilt; URLs kept |
| Doctrine | `/study/doctrine` (new landing), `/study/doctrine/q/:n` (new: 76 question pages), `/study/bible/doctrines/:id` (the 62 studies), `/theology/doctrine/:slug` (31 debate pages), `/resources/creeds/:slug`, `/theology/glossary` | Landing and question pages new; the rest kept and re-headed |
| Church history | `/theology/history` and everything under it (U30 to U33, U54): sessions, people, councils, controversies, timeline, sources | Kept; drawn on the desk grammar (5.7) |
| Readings | `/study/readings`, `/study/readings/:slug` (B 3) | New, later phase |
| Paths | `/study/paths` (new index); paths keep their own URLs: `/plans/:slug`, `/study/bible/guides/...` (U28), `/studyguides/:slug` | Index new |
| Instruments of the desk | `/study/compare` (A 20), `/study/sheet` (A 21), `/study/this-week` (A 13) | New, later phases |
| Topics | `/topics`, `/topics/:slug` (U25), `/answers`, `/answers/:slug` (B 20), `/tools/test-the-case`, `/plans`, `/help` and `/help/*` | U25 in review; answer pages new |
| Family | `/family`, `/family/tonight`, `/family/devotions/:id`, `/family/catechism`, `/family/this-week` (U20), `/family/moments` (B 24) | Kept; moments later |
| Essays | `/writing`, `/writing/:slug`, `/writing?by=passage` | Kept; by-passage view new |
| About | `/about`, `/books`, `/speaking`, `/contact`, `/how-we-write` and `/whats-new` (C 1) | Two record pages new |
| Search | `/search` (one index); `/theology/search` kept as a scoped view of it (it is on the never-redirected list) | Rebuilt |
| Tools | `/tools` (about fifteen instruments, grouped by job); every tool route kept | Regrouped (U38) |

### 2.3 Page types

Home · door landing (one `HubPage` layout for all five) · **the desk** (a
chapter, with a verse selected or not) · book page · canon index · doctrine
landing · catechism question · doctrine study · debate page · creed · context
guide · history front door · Part · session · person, council or controversy
page · sheet (event, place, short person entry) · reading (one primary source)
· topic · Honest Answer · essay · path · day card · family devotion · Tonight
· instrument (tool) · care page · step by step (C 10) · search results · My
Library · record pages (How we write, What's new).

Each is one *kind* and says so in its kicker (C 21): a reader always knows
whether he is reading Scripture, a study note, an essay, a source, a tool or
a care page.

### 2.4 How each reader enters, and where the desk sends him next

| Reader | Usually arrives | His first screen gives him | Then |
|---|---|---|---|
| **The skeptic** (wins ties) | Search ("what does post-Christian mean," "was Jesus real"), a shared essay, an Honest Answer | On Home: "Not sure you believe any of this? Start here," and James's atheist sentence on the first screen. On a topic or answer: the objection stated at full strength before the answer (B 1). On the desk: the chapter's hard question in Cormorant, and every claim opening its text | `/skeptic-track` rebuilt as a one-screen chooser that asks him for nothing (B 2): *Read Mark with a friend* (B 15), *Test the Case*, *Honest answers*, *Hurt by church* (the care pages). From any of them, the verse on the desk with *The church on this verse* and its dated witnesses, including the hostile ones ("Tacitus, no friend of the faith") |
| **The doubting Christian** | A question typed into Find or Topics; a care page | The question named more honestly than she has heard it, with "Where Christians differ" and the order of the question named before any verdict | The doctrine map (A 8): the first thing it teaches is what is confession and what is argument, which lowers the panic of a doubt that thinks everything is at stake. Then a path at Study depth |
| **The pastor** | PCN, a forwarded essay | The desk's **Teach** depth, a one-page leader's sheet for any chapter, and, once James chooses a licence, the reuse line under every piece (C 11) | Read with a group (room mode, A 16; dated schedule, A 17), study sheets (A 21), This week as a sheet for the bulletin (A 13, U20) |
| **The seeker** | Find Help, a Topics row, a search about marriage or money | The care page as today (the best first screen on the site), with urgency graded (C 2) | Every Scripture reference on the care page opens the desk in a sheet; *Starting to read the Bible* as a step by step (C 10); *The Gospel first* path |
| **The parent** (most arrivals on an evening) | Home, `/family`, a church's weekly link | Tonight in two taps (U17, U18) | The passage at the table is the same passage the adults' week reads where the plan allows (A 13); *Read it on the desk* for the parent, Read depth by default |

### 2.5 Search: one index, answering by kind

The critique's problem #3 is the desk's first dependency: a study site that
cannot find "grace" in its own doctrine is not a desk.

- **One field everywhere.** The header Find, the Home Find, the Study Bible's
  "Go to," `/search` and `/theology/search` are one component over one index.
  The local boxes on `/writing`, `/tools` and `/help` become scoped views that
  keep the query when widened (IA C3). Find Help keeps its care-first ranking
  over the same index, and crisis words outrank every pin (U15's rule).
- **Reference first** (kept from U15): "John 3:16" or "jn 3 16" opens the desk
  at the verse with its panel open.
- **Answers grouped by kind, canonical answer first:** *Passage* (with the
  verse text) · *Word* (charis, with its gloss and where it occurs) ·
  *Doctrine* (the catechism question and the study) · *Glossary* (the one-line
  definition shown in the result) · *History* (people, councils, controversies)
  · *Topics and answers* · *Essays* · *Help* · *Tools*. Groups show counts;
  empty groups are hidden. A doctrine word opens with a definition card built
  from the glossary and the catechism answer (learning m1).
- **Each result says where it lives** ("Study › Doctrine"), with one line of
  description (C 18, after MDN and Wikipedia's typeahead).
- **Pins and synonyms** in a hand-edited `search-bestbets.json` ("Lord's
  Supper," "communion," "Eucharist"; "nones"; "deconstruction"), validated so
  every pin is live (C 18). Queries to pin come from Search Console, never
  from logged queries.
- **Budget.** The index is built in kind shards, loaded when the field is
  focused (the first-paint rule). The head shard (titles, kinds, trails for
  every page, the doctrine list, the glossary's short lines) loads first;
  chapter summaries and the lexicon load only when the query is a word rather
  than a reference. The ceiling is set by U35's payload check and measured on a
  preview; today's 128 KB index is the floor to beat, not a target to grow
  past. All client-side, so no API change and no second runtime (U15's
  precedent).
- **Desktop keys:** `/` or Ctrl/Cmd-K opens Find; selected text becomes the
  query (C 18).

### 2.6 The joins: one relation model, read by every page

Two generated indexes and one hand-filed file replace the keyword shelves that
filed dating advice under church history (IA C5, M9).

1. **The inbound citation index** (A 1): `scripts/build-verse-index.mjs` runs
   the U09 parser over every essay, devotion, plan, context guide, creed note,
   Honest Answer, topic page and history session and writes
   `client/public/bible/refs/<book>/<n>.json` (verse to the pages that cite
   it), with `--check` in CI. It feeds the *On LiveWell* row in the verse
   panel, *Discussed on LiveWell* at the foot of each chapter, "Cited in 3
   other places on LiveWell" in every `VerseRef` sheet, and `/writing?by=passage`
   (B 4). One file, four uses.
2. **The doctrine joins** (A 6): `client/public/doctrine/joins.json` maps each
   catechism question to its doctrine studies, creed phrases, glossary terms
   and debate page, validated so every question has a doctrine and every id
   resolves. It feeds the doctrine ladder, the verse panel's *Where it is
   confessed* row, and the creed's links to its council, its heretic, its
   defender and its passages (IA M6).
3. **The history registry** (U30) as already planned: people, events, places,
   councils, controversies, sources, with every cross-reference resolved by
   `validate-history.mjs`.

Together they render one *Connected* block on every kind of page, in the same
order: Scripture · Doctrine · History · Essays · For the household · To use.
Hand-filed, validated, never matched by regex.

### 2.7 Folded or cut

In brief: the four ways to study a passage become one (the desk); two
glossaries, two creed hubs and two doctrine sets each get one canonical home;
the keyword "Go deeper" cards give way to the counted *On LiveWell* row; the
regex subject shelves go; the theology quiz is retired or rebuilt; the
skeptic track's lead magnet goes. Section 7 has the full table, with which
folds need James.

---

## 3. The home page

The home page's job in this direction: in three seconds, say who this is for
and who wrote it, hand the reader a field that opens anything, give the
skeptic his door, and show the desk working on a real verse. Critique Q5 asks
what leads; my answer is the product, with James's sentence and the skeptic's
door on the same screen.

### 3.1 The first screen at 390 x 844

Cream page, one column, a 20px gutter. Positions are approximate and assume
no browser bars.

| y (px) | Element | Specification |
|---|---|---|
| 0 to 56 | **Header** | Wordmark at left (the drawn logotype if James commissions it, section 6.12; until then today's). At right, three 44px targets: *Find Help* (Inter 500, `--mustard-text`), the Find icon, the menu. On Home the header does not hide. |
| 80 to 248 | **Headline** | Cormorant Garamond 400, 38/42px, -0.02em, `--ink`, four lines: "Learning to follow Jesus, / and live well, in / post‑Christian / America." James's #533 headline with the two em-dashes replaced by commas (so no line starts on a dash; editorial critic) and a non-breaking hyphen in "post‑Christian." The punctuation change is his to approve. |
| 264 to 360 | **James, and his sentence** | At left, his portrait at 64 x 80 (a face that reads, not today's 56 x 70 thumbnail), served from `client/public` as a sized AVIF or WebP; a real photograph in a real room when James supplies one. Beside it, Inter 400, 17/26px, `--ink` (not muted), about four lines: "I was raised without a father and came to faith as an adult, after years as an atheist, so I know the objections from the inside." Verbatim from the #533 paragraph, moved from the bottom of the screen to the top (visitor critic). The portrait links to `/about`. |
| 384 to 436 | **Find** | A 52px field, 17px text, square corners, 1px `--ink` border, placeholder "A passage, a word, or a question." "John 1:14" opens the desk at the verse; "grace" opens grouped results; "is the Bible reliable" opens the Honest Answer (U15 behavior, section 2.5 groups). The parser loads on focus. |
| 448 to 492 | **The skeptic's door** | One 44px row: "Not sure you believe any of this? *Start here.*" Inter 17px `--ink`, "Start here" with the 1px mustard underline, a chevron. Opens `/skeptic-track` (section 5.9). |
| 504 to 548 | **Tonight or Continue** | U18's line, rendered after mount from local data, hidden when empty: "Tonight at the table: *Strong Enough to Be Gentle*" (the generated year map), or, when this device has a place, "Continue: John 4 · Day 40 of the 2027 story." Position, never performance. |
| 576 to 600 | **This week's verse, kicker** | Inter 500, 12px caps, 0.18em, `--mustard-text`, with the short leading rule: "THIS WEEK · JOHN 1:14". |
| 612 to 780 | **The verse** | The text serif (section 6.1; Cormorant 500 if James declines), 22/33px, `--ink`: "The Word became flesh and made His dwelling among us. We have seen His glory, the glory of the one and only Son from the Father, full of grace and truth." (BSB, verbatim from `bible/text/john/1.json`). Embedded at build time so it paints with the page: no network on first paint. |
| 792 to 810 | **The invitation** | Inter 13px `--ink-muted`: "Tap the verse to see what is gathered around it · Berean Standard Bible". |

Tapping the verse opens the real verse panel (signature interaction 1) as a
sheet over Home: the same component, the same data, the same URL it would
have on the desk. The reader's first touch on LiveWell is the product.

**Where the week's verse comes from.** From January 1, 2027, the shared week
(A 13): one hand-picked reference per week from the days U28's plan covers,
in `client/public/week/verses.json` (52 references, no prose, parsed by the
U09 parser in CI). In Advent, Lent and Holy Week, from the year map's season.
Before January, a short editor's list. A reference list is not writing under
James's name, but he sees it once.

### 3.2 A returning reader

Nothing on Home counts anything or says what is due (C 6: review is "never on
Home"). The only change is the Continue line: the last chapter opened on this
device, or the plan day, or the history session in progress, whichever is
most recent. The week's verse stays, because it is shared, not personal: the
same verse this week for every reader, which is the point of a shared week.

### 3.3 The first screen at 1440 x 900

Cream page. A 12-column grid, 1200px wide, centered (x = 120 to 1320), 24px
gutters.

- **Header, 72px.** Wordmark at x = 120. Doors, Inter 500 15px: Study, Topics,
  Family, Essays, About. At right: Find Help (`--mustard-text`), Subscribe
  (outline, ink). On Home the header Find is an icon only, because the hero
  holds the field; on every other page it is a visible 260px field with a `/`
  hint.
- **Left, columns 1 to 6 (x = 120 to 696).**
  - Headline, Cormorant 400, 64/68px, -0.02em, three lines: "Learning to
    follow Jesus, / and live well, in / post‑Christian America." (y = 140 to
    344).
  - His portrait at 120 x 150 beside James's sentence, Inter 19/30px `--ink`,
    three lines (y = 372 to 522 for the pair; the rows below move down to
    match).
  - Find, 56px tall, the full six columns (y = 464 to 520).
  - "Not sure you believe any of this? Start here." (y = 548).
  - Tonight or Continue, when present (y = 588).
- **Right, columns 8 to 12 (x = 820 to 1320): the desk, working.** A white
  sheet (white is for things that must feel lifted) with a hairline border and
  no shadow, y = 140 to 780:
  - Kicker: "THIS WEEK · JOHN 1:14".
  - The verse in the text serif, 26/38px.
  - A hairline, then the verse's layers as rows in Inter 15px, each label in
    small caps naming who is speaking and each count right-aligned in
    `--ink-muted`: *Study note* · *The words* (the Greek under each word) ·
    *Elsewhere in Scripture* ("the 12 strongest") · *The church on this
    verse* · *On LiveWell*. Rows with nothing behind them do not appear. Each
    row opens in place in the card; *Open on the desk* goes to
    `/study/bible/john/1?v=14`.
  - At the foot, the 6px canon strip: 66 ticks, John's in mustard (the only
    mustard mark on the card), and the line "John, in Act Nine of the story:
    Christ, the Center" (the chapter's existing kicker).
- **Below the fold at y ≈ 840:** the top of section 2's heading shows, so the
  page reads as continuing.

### 3.4 The rest of the page

Six sections in all, alternating cream and cream-warm, ending in one dark
ending. On a phone the whole page should stay near six screens.

1. **The first screen** (cream), as above.
2. **Three rooms of the desk** (cream-warm). Three objects drawn in the house
   line (section 6.7), each a door: *The Bible*, the canon map in miniature
   (66 bars, width by chapter count, in seven divisions; "Notes on all 1,189
   chapters, and the Hebrew and Greek under every word"); *Doctrine*, the
   three rings ("What the creeds bind, where faithful churches differ, what
   is open"); *Church history*, the time river with one mustard tick on After
   Christendom ("Two thousand years, and where you are standing in it"). On
   desktop three columns; on phone stacked, each about 200px.
3. **The question of our moment** (cream). The definition first, in James's
   two sentences from `/about` (the critique's choice for the post-Christian
   page; quoted verbatim, never rewritten), then three texts the church read
   when it had no standing, each a line that opens the desk: *Jeremiah 29*
   ("to the exiles"), *Daniel 1*, *1 Peter 1*. Then "Read the whole page" to
   `/topics/living-after-christendom` (U25), and the second door this subject
   needs: *Test the Case*.
4. **This week** (cream-warm). Four lines, each opening where it lives (A 13):
   the story (U28's days from January, for example "Days 302 to 308:
   Jeremiah"), the
   catechism question, tonight's devotion, the church's season. On Sunday
   evenings a fifth line: "Print this week for your church." No count, no
   streak, nothing that knows the reader.
5. **Essays** (cream). The lead essay with its date and its first sentence,
   then two more rows in the "first lines" view (C 17), then "The shelf." No
   images, no "Latest" strip (C 1 retires it).
6. **The dark ending** (black). One verdict line already in James's words
   ("You did not start the faith. You were handed it.", from the history
   page), the newsletter once, and the footer as a real index of the site,
   folded into disclosures on a phone (mobile #15). One dark band, not a band,
   a sliver and a footer (brand critic).

Not on Home: a second subscribe box, the books band as a band (the books live
in About and appear on Home only as a line under the essays when a new one is
out), the mission paragraph (once, on `/about`), *Today in Proverbs*.

### 3.5 Why it draws attention, and why it still feels unhurried

It draws attention because the most interesting object on the first screen
is real: a verse that opens onto what Irenaeus did with it around 180 and
what the Greek says, not a picture of a product. It is unhurried because the
first screen holds six things and each has one job; nothing moves on its own;
there is one field, two lines of invitation and one verse. It is weighted
because the type is large and the verse is set like Scripture, not like a
caption. It is grown-up because nothing asks for an email, counts readers or
promises a result. The limits, stated plainly: no motion except a sheet the
reader opened, no counter of people, no carousel, no "verse of the day"
notification, no pop-up, and the only mustard on the first screen is a rule,
a link underline and the canon tick.

---

## 4. Signature interactions

Ten, in the order a builder should build them. Each serves study (reading
with a question in hand, remembering, checking) and none serves time-on-site.

### 4.1 The verse opens the library

- **The reader** taps a verse, anywhere in it, not only its number (in Study
  or Teach depth); or arrives from a link such as `/study/bible/john/1?v=14`.
- **What happens.** On a phone a sheet rises to about 40% of the screen with
  the chosen verse still visible above it, marked by a 2px mustard rule in the
  left margin (the screen's one mustard mark). The sheet is a real dialog:
  focus moves to its heading ("John 1:14"), returns to the verse on close;
  Escape and a 44px close; drag to full height; swipe down to dismiss; buttons
  for every gesture. *Previous verse* and *Next verse* sit at its foot, so the
  reader walks the chapter without closing anything. From 1100px wide the
  same content lives in the right margin of the desk instead of a sheet.
- **The rows, in a fixed order, each with a count of things in the library,
  empty rows hidden:** *Study note* (the verse note where one exists, else the
  chapter note for the outline section that holds the verse) · *The words*
  (each Greek or Hebrew word: a glance card first, the full entry on a second
  touch, A 18) · *Elsewhere in Scripture* (the 12 strongest, each with its
  first line printed, A 11) · *The church on this verse* (4.3) · *The question
  it raises* (4.4) · *Where it is confessed* (a creed phrase, from the joins) ·
  *On LiveWell* (from the citation index) · *Your note*. At the foot, one line
  for what is not yet written: "Not yet written for this verse: the church's
  reading." Honest without clutter.
- **State in the URL:** `?v=14&panel=church` (A 1), so a pastor can send the
  exact view.
- **From:** Sefaria's connections panel (counted categories, zeros hidden,
  mode in the URL); Olive Tree's Resource Guide and its "follow my reading"
  lock; Blue Letter Bible's Previous and Next inside its tools; the ESV app's
  sheet; Apple Maps' detents, which the mobile critic names (mobile #5; A 1,
  A 11, A 18).
- **Why it serves study:** the answer is where the question is; the reader
  never loses the sentence he was holding (critique #1). Counts are of things
  in the library, never of people (A tension 4).

### 4.2 Read, Study, Teach

- **The reader** chooses a depth under the chapter title: a segmented control,
  44px, remembered on the device (`livewell-desk-depth`) and carried in a
  shared link (`?depth=read`).
- **What happens.** *Read* sets the chapter as literature: paragraphs and
  poetry lines (once the data exists, section 8.5), no verse numbers, no marks,
  the outline's headings in the text, Listen in the bottom bar. Tapping a
  paragraph offers "Study this passage." *Study* adds quiet verse numbers with a
  40px hit area, a hollow dot on verses with a study note, the three Observe
  questions above the text, the hard question at the head of the notes, and
  the verse panel. *Teach* adds the chapter's `teach` notes (`big`, `outline`,
  `pitfalls`, `pastoral`), the group questions with room to write, and *Print a
  leader's sheet* (one page: the big idea, the outline, three questions, the
  hard question with its short answer). *Hebrew and Greek* stays as a switch
  inside Study.
- **Defaults:** Read when the reader comes from Home's Tonight, a devotion or
  the 2027 plan; Study when he comes from Find or a verse link (A 2).
- **From:** Quran.com's Translation Reading Mode beside its Study Mode; ESV.org's
  reader's mode; the ESV Reader's Bible and Study Bible as one text set for two
  jobs; Logos layouts by task (A 2; learning M7, the expertise-reversal
  effect).
- **Why:** what helps a beginner burdens a pastor and the reverse. One page,
  three settings, one text: two readers served without two products
  (critique Q16).

### 4.3 The church on this verse

- **The reader** opens the row, or taps a dot on the thin time rule that sits
  under the chapter's notes in Study depth.
- **What happens.** A horizontal rule from AD 30 to now with a dot for each
  witness, oldest first. Each dot opens a source card: who, where, when, the
  work, and either a verbatim excerpt (with translator and public-domain
  basis) or a paraphrase marked as paraphrase. Where readers genuinely
  disagree, one line says so and names the order of the question. On John 1,
  the existing note already gives the material: Heracleon around 170, Irenaeus
  of Lyon (*Against Heresies*, around 180) using verse 14 "against teachers who
  denied that the Word truly took flesh," Origen's commentary begun in
  Alexandria before his move to Caesarea around 231, Athanasius and Nicaea in
  325.
- **Two stages** (A 4). *Stage one* sets the `interpretation` field of the 114
  chapters as dated rules, labeled *Study note* because it is paraphrase.
  *Stage two* adds verbatim cards gated by U07's `verify-sources.mjs`, so every
  excerpt is a normalized substring of a stored public-domain text, starting
  with the verses the creeds rest on and the passages the history sessions
  quote.
- **From:** the Dartmouth Dante Project and Dante Lab (seven centuries of
  readers under each line); Sefaria's chronological sort; the New City
  Catechism's past and present voice per question; the *Ancient Christian
  Commentary on Scripture* as a print catena; Catena (the app) as the warning
  about undated, unsourced comment (A 4, A §4.3).
- **Why:** it is the opening nobody holds, and it does the Constitution's work
  by structure: the reader sees that the church read this verse long before
  his tribe did.

### 4.4 The question this chapter raises

- **The reader** meets, at the head of the chapter's notes in Study depth, the
  chapter's hard question in Cormorant 500 at 24px. John 1: "Does John 1:1 say
  the Word was 'a god', and can a Jewish monotheist say the Word was God at
  all?"
- **What happens.** It opens an answer in four labeled moves (B 1): *Put at its
  strongest* (the objection in a form its holders would sign) · *What it gets
  right* · *The answer* · *What this does not settle*. Then onward: *Test the
  Case* where a case exists, the Honest Answer, the context guide. On Mark,
  the same questions sit in the margin at the verse where they arise for *Read
  Mark with a friend* (B 15).
- **Data:** the `hard` field in 114 chapters; new questions beyond them are
  content, chosen from Search Console data and written under the byline rule.
  The `answers` validator already in the gates requires the three new fields
  (B 1).
- **From:** Sefaria's Guided Learning "Key Questions"; Quran.com's Answers;
  Christianity Explored and UCCF's Uncover (questions beside the passage);
  Rapoport's rules as Dennett gives them; Test the Case's own "What this move
  does not settle" (A 5, B 1, B 15).
- **Why:** the skeptic's question is put on the text, at full strength, by the
  site itself. Nothing is more trust-building, and nothing draws a thinking
  reader further into a chapter.

### 4.5 Your answer first

- **The reader** sees three Observe questions above the text, labeled "Read
  with these in mind" (collapsed to one line on a phone). Under the text, the
  Interpret and Apply questions, each with a one-line field kept on the
  device ("Nothing you write here leaves this device," said at the field). On
  a translation note or a hard note, a one-tap guess comes before the reveal
  ("What do you think 'overcome' means in verse 5?"), and the guess stays
  beside the answer. "Show me" is always visible; nothing is gated.
- **What happens at the end of a chapter:** "Mark as read" becomes "I've
  answered these," and the reader's lines gather in My Library under John.
- **From:** Bible Study Fellowship's order (your answers first, notes last);
  the pretesting effect (Richland, Kornell and Kao, 2009, a planning note);
  The Evolution of Trust's "place your bets"; the Times' You Draw It;
  Brilliant's "Why?" shown even when the reader was right (A 14, C 8, C 14;
  learning M1).
- **Why:** writing an answer beats recognizing one, and a question asked
  before reading directs attention. The questions already exist for all 1,189
  chapters; today they sit last, collapsed.

### 4.6 Every reference opens the desk, and the desk knows who cites it

- **The reader** taps "1 Samuel 8:5" inside an essay, a care page, a devotion or
  a session.
- **What happens.** On pages that quote the BSB or nothing, the verse opens in
  a sheet with "Open on the desk"; on pages that quote the ESV it is a link
  that opens the desk at that verse (MASTER-PLAN 2's one-translation rule).
  Glossary terms in prose open their one-line definition; people, councils and
  controversies open their registry sheets, stacked so the trail stays
  visible ("Nicaea, then Athanasius, then Arius," with "Back to Nicaea" on a
  phone) (C 9). In the other direction, every chapter ends with *Discussed on
  LiveWell* and every verse panel carries *On LiveWell*, both from the citation
  index (2.6).
- **Notes beside the text:** on essays and history sessions, notes sit in the
  right margin from about 1100px and open under their paragraph on a phone
  (C 3, Tufte CSS and Gwern). The margin holds only the page's own notes.
- **From:** Faithlife's RefTagger and Wikipedia's previews (product #6);
  Mathigon's gloss and biography links; Matuschak's stacked notes; Sefaria's
  connections; Tufte CSS and Gwern.net (A 1, C 3, C 9).
- **Why:** a claim that cannot be checked in place is a claim the skeptic
  discounts. Two-way links turn 700 pages into a web around the text.

### 4.7 One drawing grammar: the band

- **The reader** sees, wherever bearings matter, the same drawing: a
  horizontal band divided into labeled sections, past sections in
  `--ink-muted`, the current one in `--ink`, and one mustard tick for "you are
  here." Tap a section to go there. Every band has a list beneath it with the
  same data in the same order.
- **Where it appears.** *The canon map* (66 bars, width by chapter count, in
  seven divisions) as the hero of `/study/bible`, filling from this device's
  read chapters. *The book band* under every chapter title (Romans 1 to 4, 5 to
  8, 9 to 11, 12 to 16), 6px tall, opening the book's outline. *The story band*
  (the eleven acts of `story.json`) on every day of the 2027 plan. *The
  thread* across the 66 books for a doctrine, a mark wherever
  `doctrine-verses/<id>.json` places it, each mark opening the chapter at its
  note. *The time river* on the history front door (eras as bands, councils
  as marks, a tick on After Christendom). *Lives as lines* in the history
  timeline (Priestley's form: a hairline from birth to death, dotted where
  uncertain, one mustard year rule, `?year=386` in the URL).
- **From:** BibleProject's book posters; Ascension's Great Adventure timeline
  (without its twelve colors); Logos's Bible Word Study; Joseph Priestley's
  *A Chart of Biography* (1765); John B. Sparks's *Histomap* (1931) and the
  Met's Heilbrunn Timeline as the brand and IA critics name them; Noll's
  dozen *Turning Points* (A 10, A 23, B 8, B 12).
- **Why:** history and Scripture are learned as shape before detail (critique
  #8). One grammar means the reader learns to read it once. Inline SVG from
  tokens; no chart or map library.

### 4.8 Trace the argument

- **The reader** opens *Trace the argument* on one of ten to twelve
  load-bearing passages (John 1:1 to 18, Philippians 2:5 to 11, Colossians 1:15
  to 20, Romans 3:21 to 26, Ephesians 2:1 to 10, 1 Corinthians 15:1 to 8).
- **What happens.** The passage is set as phrases, subordinate clauses
  indented. Each *Next* draws one mark (a repeated word underlined, an arc from
  "for" to the claim it grounds, a bracket around a purpose clause) with one
  sentence beneath, labeled as James's reading. The last step shows the whole
  marked passage and the doctrine it grounds, which opens its doctrine page.
  Keyboard operable; under reduced motion every mark appears at once; built on
  `Stepper`.
- **From:** Desiring God's Look at the Book (the pen drawing on the text);
  Biblearc's phrasing and arcing (A 25).
- **Why:** the most attention-holding pattern in the research that stays
  honest, because the interaction is the reader looking harder at the text.

### 4.9 Compare, and the creed beside its phrases

- **The reader** taps *Compare* on a parallel account, a creed or a contested
  doctrine, or pins two verses and taps "2 pinned · Compare."
- **What happens.** `/study/compare?p=isa.53.4-6,matt.8.17` sets texts side by
  side on a wide screen and stacked with labels under 600px. Creeds: 325
  beside 381 with the added clauses marked, the Apostles' beside the Nicene
  (U44). Doctrinal positions row by row, each in the form its own defenders
  would sign, with each view's reply to the other, then *Weighing*, labeled
  as James's, after both. On a creed's own page, each annotated phrase is
  underlined; tapping it opens the note in the margin (desktop) or under the
  line (phone), the way a pastor's pencil would sit (brand critic).
- **From:** Quran.com's Pin and Compare; Dante Lab (up to four texts);
  Zondervan's Counterpoints (essay, responses, rejoinder); Genius-style inline
  annotation as the product critic names it (A 20; product #11).
- **Why:** comparison is how a reader sees what a creed fought for and where
  faithful churches part; equal width and equal length keep it fair (B 9).

### 4.10 Keep it: pencil marks, notes, the sheet, and what comes back

- **The reader** marks a verse, writes a note, adds a verse or a source card to
  a study sheet, or chooses "Bring this back" on a question he answered.
- **What happens.** A mark is a hairline bracket in `--ink-muted` in the left
  margin beside the verses, like a pencil in a printed Bible: no color, so the
  palette holds. A note shows as a small filled dot after its verse and
  gathers in My Library by book. *Add to my sheet* builds a one- or two-page
  study at `/study/sheet` (passage, card, note, a question); reorder, title,
  print, or share by a URL that carries references and ids, never the
  reader's text unless he chooses. *Bring this back* puts the question on a
  fixed ladder (about 5 days, 2 weeks, 5 weeks, 3 months, then "kept"),
  answered "I had it," "Not yet" or "Skip for now," at most six in a sitting,
  ending with the date of the next return. Scripture Memory is repaired to the
  same ladder: no "memorized," no percentages, only "Held about a month" in
  words (C 7). Everything lives on the device through `lib/storage.ts`, with
  the house save-failure line and an export (JSON to import elsewhere, Markdown
  to read), because no accounts means a year of notes must still be portable.
- **From:** YouVersion's verse action bar (without its colors); Readwise's
  review; Sefaria's source sheets; Logos notes that stick to verses; Orbit and
  Quantum Country; Execute Program's fixed ladder; Anki's "finished for now"
  (A 21, A 22, C 6, C 7; product #2).
- **Why:** a tool that keeps nothing of the reader's thinking is a reference
  shelf. Retrieval and spacing are the two strongest findings in the science
  of learning (learning C4). The register is a ruled notebook: no streaks, no
  flames, nothing on Home.

---

## 5. Templates

Every template uses the same frame: `PageHead` (kicker naming the kind, H1,
one line), one reading column, a margin on wide screens, and the house ending
(an end mark, real space, then a short foot, C 12).

### 5.1 Door: Study (`/study`), the desk's front door

**Structure.** `PageHead`: kicker "STUDY," H1 "Learn the whole Bible, and the
church that carried it." (the framing line every critic kept). The Find field.
A three-way router in `/help`'s own register (learning C2): *I'm not sure I
believe this* (Read Mark with a friend; the skeptic's eight weeks) · *I'm new
to the faith* (The Gospel first, 16 days in Mark; Eight Weeks of Beginnings)
· *I've read it for years* (the 2027 story; the twelve weeks at Study depth).
Continue (this device). Then the three rooms with their drawn objects (the
canon map, the rings, the river), Paths, Creeds, The Bible in its world, Read
with a group.

**Interactive layer.** The router, Find, Continue.

**First screen (390).** Kicker, H1 in three lines, Find, the three router rows
(44px each). The rooms begin on screen two. One link per destination (IA M4:
today three of its links go to one address).

### 5.2 The desk: a Bible chapter (`/study/bible/:book/:chapter`)

**Structure, phone.**
1. Compact head: kicker "JOHN · ACT NINE OF THE STORY," H1 "John 1"
   (Cormorant 40px), the 6px book band with John 1's tick, the depth control
   (Read · Study · Teach).
2. The chapter title and a two-line summary with *More* (today the summary is
   eleven lines before verse 1; mobile #2).
3. In Study: "John 1 in eight movements" (the outline, one line, opens) and
   "Read with these in mind" (the Observe questions, one line, opens).
4. **The text**, starting on the first screen: the text serif at 20/32px,
   `--ink`, the outline's eight headings set in the text as section heads
   (Inter 500 small caps over a hairline), verse numbers small and
   `--ink-muted` (not mustard), each verse a selectable span.
5. At the last verse, before anything else: a full-width "John 2" button.
6. Below: the hard question in Cormorant (4.4), the Interpret and Apply
   questions with fields (4.5), the time rule of the church's readings (4.3),
   then the chapter's notes as a typed list with labels of who is speaking:
   *Where we are in the story* · *What the first readers heard* (historical,
   cultural) · *How it is built* (literary) · *What it teaches* (doctrines) ·
   *The words* · *Christ in this chapter* · *How it has been read* · *Where the
   manuscripts differ* · *For teaching* (Teach depth only). Each opens in place.
   Then *Discussed on LiveWell* and *Next in the story*.

**Bottom bar** (auto-hiding, returns on an upward scroll or a tap, mobile #2):
previous chapter · "John 1" (opens a book and chapter picker sheet: the seven
divisions, then the chapter grid in place) · next chapter · Aa (size, Paper or
Night, line width) · Listen (the device's voice, `ListenButton`).

**Structure, desktop (from 1100px).** A three-part desk: an optional left
rail (from 1280px) with the eight movements as contents, marking the section
in view (C 15); the text column (640 to 680px); the right margin (280 to
320px). Until a verse is chosen, the margin *follows the reading*: for the
section in view it shows the section's verse notes where they exist, and
otherwise the chapter's layers as a contents list that opens in the margin
(987 chapters have no verse notes, and the margin says what it has rather than
pretending). A "Follow my reading" lock. Arrow keys change chapter; `/`
focuses Find; Escape closes.

**Interactive layer.** Verse selection and the panel (4.1), depth (4.2),
marks and notes (4.10), Trace the argument where it exists (4.8), Compare on
parallel accounts (4.9), next chapter fetched when the reader passes the last
verse (mobile #13).

**First screen (390).** Header (hides on scroll), the compact head, the
summary in two lines, and verse 1 by about 420px. The rest of John 1:1 to 5
fills the screen. (Today verse 1 begins about 980px down; mobile #2.)

**Loading.** Read depth loads only the 5.8 KB text shard. Study loads the
notes (36 KB for John 1) after first paint. The interlinear chapter (54 KB)
loads only when *Hebrew and Greek* is on. Related site content loads only when
asked (MASTER-PLAN 7.1: not the 372 KB catalogue on every chapter).

### 5.3 The verse

A verse is a state of the desk, not a page: `/study/bible/john/1?v=14`. A
search for "John 1:14" lands on the chapter scrolled to verse 14, the verse
marked, the panel open (40% on a phone, the margin on desktop). There are no
separate verse pages; 31,000 thin pages would be the opposite of "fewer,
truer things," and prerendering skips param routes anyway (MASTER-PLAN 2).
The chapter's prerendered head carries the chapter's title.

**First screen (390).** The verse in view at the top third, marked by its
mustard rule, and the panel's first rows below it.

### 5.4 Book page and the canon index

**Canon index (`/study/bible`).** Hero: the canon map (desktop: 66 bars in
seven labeled divisions, width by chapter count, read chapters filled in
`--ink`; phone: a compact list in seven divisions, each book a 44px row with a
thin bar for its length and its progress). Tap a book: its chapter grid opens
in place. "Pick up where you stopped" for the last chapter opened, beside
Continue for the plan (product #7). Then the three plans (*The Gospel first*,
*The story in 2027*, *Every chapter*; learning M2). The 66 book descriptions
move to the book pages. About three phone screens instead of 15.4.

**Book page.** The book's band as hero (its sections from a 66-entry list
checked against every chapter's `outline`, A 10), then *About this book*:
genre and how to read it, when and where (both dating schemes where
scholarship disagrees, each at its strongest), authorship both ways, its
place in the eleven acts (A 9). Then the chapter grid (48px cells, kept).

### 5.5 The essay (`/writing/:slug`)

**Structure.** MASTER-PLAN 6.2's order, with three desk additions:
1. Head: kicker (genre · section · minutes), title, dek, byline, then *the
   first sentence on the first phone screen* (U04 started this). One quiet row:
   Listen · Aa · Save · Share ("Share" on touch, never "Send to my phone" on
   the phone; mobile #4).
2. Body in the text serif, 62ch, the versal (a three-line Cormorant initial in
   mustard, the essay's one mustard mark in the body), no bold in prose,
   long Scripture as block Scripture with its reference beneath (ESV, named,
   Crossway's notice at the foot).
3. **Every reference is a door to the desk** (4.6), in link mode because essays
   quote the ESV.
4. **Notes beside the text** (C 3): numbered, in the margin from about 1100px,
   under the paragraph on a phone, listed again at the foot for print.
5. **The objection at full strength** where the essay turns on one: a quiet
   indented block, *The strongest case against*, quoted from its strongest
   named defender with a source (B 1).
6. **The ending allowed to end** (C 12): an end mark, about 96px of space,
   then *To think about* (three questions, the first asking him to say the
   argument in three sentences "in a form James would sign," then James's own
   three, C 8; then *Test this yourself*: the passage on the desk, the history
   behind it, one question, learning M6) and *Where next* (one next read
   chosen by an editor, the record block of C 1: first published, revised,
   corrections, cite, report an error; the book as one quiet line when it is
   the natural sequel; the newsletter once, in the footer).

**First screen (390).** Kicker, title, dek, byline, the tool row, and at least
two lines of the essay.

### 5.6 The topic (`/topics/:slug`)

**Structure.** U25's page (the question as H1, the short answer with every
reference a link to the desk, Read this first, What Scripture says read in
its world, The church has been here before, At the table, Use this), with
the desk's addition at the top: **The texts this question turns on**, three
to five passages as one-line doors to the desk, each with the line of the
note that matters. On the post-Christian page: Jeremiah 29, Daniel 1, 1 Peter
1, Acts 17, and the time river's After Christendom tick ("You are standing
here"). On contested topics, positions at equal length before any verdict,
each with who has held it and since when (B 9, C 20). Page last reviewed and
next review due (C 1).

**First screen (390).** The question, the first two sentences of the short
answer, and the first passage door.

### 5.7 Doctrine

**Doctrine landing (`/study/doctrine`).** Three ways in (A 6): *By question*
(the 76 catechism questions in the adult register, the children's answer one
tap away), *By the map* (the three rings: the confessional floor CLAUDE.md
names at the center, the 20 second-order and 6 third-order debate pages
around it, a list beneath; A 8; before revealing where the creeds land, the
reader may guess first-, second- or third-order, C 8), *By the Bible's order*
(the 10 loci, 62 studies). **First screen (390):** H1 "What the church
confesses, and where it differs," Find scoped to doctrine, the three ways as
three rows, the rings beginning below.

**A catechism question (`/study/doctrine/q/:n`), the doctrine page a reader
meets first.** H1 the question ("Who is Jesus Christ?"). Then a white card,
*In brief*: two to four sentences (60 words or fewer) with a small letter on
each clause that opens its Scripture in place (A 7), and *Learn it* (the
first-letter drill on the repaired ladder). Then the ladder, the same on
every answer (A 6): **In Scripture** (the study, topped by the doctrine's
thread across the canon from `doctrine-verses`) · **Confessed** (the creed
phrase, opened at its note) · **Where Christians differ** (the debate page with
its order named) · **Words** (glossary) · **The church remembers** (dated
witnesses, A 23's "in history's order") · then a prayer the church has
prayed, sourced, as the closing rite (A 15). **First screen (390):** the
question, In brief with its proof letters, the first ladder rung.

**Doctrine study (`/study/bible/doctrines/:id`)** and **debate page
(`/theology/doctrine/:slug`)** keep their URLs (the debate pages are on the
never-redirected list) and gain the same head, the thread, the Compare
control (4.9) and a link to their question page. The two sets cross-link; one
home for a doctrine is James's call (MASTER-PLAN 11).

### 5.8 Church history

The course (MASTER-PLAN 7.2, U30 to U33) is already planned in depth; the
desk contributes its grammar and its joins.

**Front door (`/theology/history`).** `PageHead` addressed to every reader
("Whether or not you believe it, this is the story that made the country you
live in," the critique's line), the time river with "Start where you are
standing" on After Christendom, the Parts and sessions with Continue, the
region grid that says *Not yet written* where a cell is empty (B 8), *This
week's source* (C 13), then the one ordered reading list. **First screen
(390):** H1, the river as a compact vertical list with the tick, the first
Part.

**Era or Part.** Opened like an issue (B 8): its band, its hinges as short
sheets (the world before, what happened, the world after, what we still
carry), questions people ask, *In their own words*, its sessions ("Session 3
of 6"), a series rail (previous, Part 2 of 8, next). The 22 era essays are
filed under their Parts as readings.

**Session (`/theology/history/session/:slug`).** U32's ten parts, with the
desk joined in: every Scripture block opens the desk; every person, council
and place opens its sheet; the myth check is a guess that returns beside the
story's answer; *Read it closely* on each source card (B 6); *Check yourself*
can be brought back on the ladder (4.10). **First screen (390):** the
historical question, the dated scene in Cormorant with Place · Date · Source
beneath it (B 7), and the first myth-check statement.

**Person page or sheet.** Name, dates with their certainty, a lifeline among
contemporaries (4.7), what we know and how (the witness label: eyewitness,
within a generation, later, tradition; B 6), *In their own words* only when
five excerpts pass the verifier, the sessions they appear in, *Scripture they
read* (from the citation index), and the day the church remembers them (B
14). Pages only past the 150-word threshold; shorter entries are sheets.

**Event sheet.** Date, place, the witnesses compared side by side in the order
they were written, with the gap from the event stated (B 6).

### 5.9 The skeptic's door (`/skeptic-track`, rebuilt)

**Structure.** One screen. H1 in his words, "Not sure you believe any of
this?" A paragraph of the house's existing stance ("You can walk away
unconvinced at any point and I will not chase you," Test the Case's own
line). Four rows: *Read Mark with a friend* (seven sittings) · *Test the case:
did the resurrection happen?* · *Honest answers to hard questions* · *Hurt by
church* (the care pages). No email field, no lead magnet, no verdict picker
(B 2; `SkepticTrack.tsx` drops `PillarLeadMagnet` and `NewsletterSignup`). The
only offer on the page is the host kit addressed to his friend (B 18).

**First screen (390).** All of it.

### 5.10 Family devotion and Tonight

**Structure.** The Table as built (Read, Talk, Ask, Do, Remember, Pray; table
mode; "We did this tonight"), with four changes from the desk and the
research:
1. The verse first after the title, set large in the text serif (editorial
   critic), the utilities moved to the end.
2. *Read and pray* as an explicit smallest faithful version, about three
   minutes (B 10, Whitney's ten minutes).
3. Questions labeled by kind: *What happened?* · *I wonder* · *Your turn* (the
   child asks the grown-up) (B 16).
4. For the parent, collapsed above the devotion: what tonight is about in a
   sentence, the hard question a child may ask with a two-line honest answer,
   and *Read it on the desk* (the chapter at Read depth). One counter only:
   "Week 44" (product #18).

**First screen (390).** Kicker "FAMILY · TONIGHT," the title, the verse in the
serif, *Start at the table*, *Read and pray*.

### 5.11 An instrument (Test the Case as the model)

**Structure.** C 4's start panel, the same on every tool: what it does in a
line, how long, what you will need, where the answers go ("on this device;
nothing is sent"), **when this is not the place to start** with the right
page, other ways to do it (print), and a Start button worded as the act. Then
the instrument itself on the first screen. Results open with "Your answers,"
each with Change. For Test the Case specifically: Move 1 on the first phone
screen with the case picker behind *Other questions* (mobile #7); every
piece of evidence opens its text on the desk (1 Corinthians 15:3 to 8);
*Next move* beside *Not convinced, but go on*; *See the whole case* as an
outline (B 20); *Who says so* citing only sources James has verified;
position kept on the device. The tools hub shows each instrument by a small
specimen of its output in the house line, not a stock icon (brand critic).

**First screen (390).** The case as a title, one line, Move 1 and its two
responses.

### 5.12 A path or plan

**Structure.** The whole path on the first screen (A 17): numbered sittings
titled as the questions they answer, each with its length and kind of work,
a quiet mark for those done on this device, "Session 3 of 8," never a
percentage. A leader can choose a start date and cadence
(`?start=2027-01-10&cadence=8`) and get dated sessions, a calendar file and a
printable schedule. A day card: the reading opens on the desk at Read depth,
two or three sentences after (*After you read*, drawn from the chapter
summary), one question with a private line, a line of prayer. After a gap,
two equal doors: "Pick up at your place" or "Join today" (A 12). At the end of
an act or path, a closing rite: Scripture, a prayer the church has prayed, the
reader's own lines read back, the next door with its date (A 15).

**The paths the desk offers first** (all but one already exist as data):
*The Gospel first* (Mark in 16 days, matching the beginner plans), *Read Mark
with a friend* (seven sittings, new writing, B 15), *Read the whole story in
2027* (U28, built), *Eight Weeks of Reading Like an Adult* and *Eight Weeks of
Beginnings* (existing plans, moved from "Help in a hard season" to Study;
learning C2). *Twelve weeks* (the spine the learning critic asks for) waits
on James: its connecting lines and recall questions are new writing.

**First screen (390).** Title, size ("Mark in 16 days"), Start or Continue,
and the first four sittings.

### 5.13 Search results (`/search`)

Grouped by kind with counts (2.5), the definition card first for a doctrine
word, each row with its trail, the query highlighted, labels in
`--mustard-text`, square corners, filters in reader words (Bible, Doctrine,
History, Topics, Essays, Help, Tools). **First screen (390):** the field with
the query, the definition card, the first group.

---

## 6. Visual language, inside the contract

### 6.1 Faces

Three faces with three jobs (critique #7, editorial critic):

| Face | Job | Sizes |
|---|---|---|
| Cormorant Garamond 400 and 500 (self-hosted, kept) | Display, titles, the hard question, the house's verdict lines, the versal | 22px and up; never for labels or anything tapped (mobile #20) |
| **A text serif**, Source Serif 4 (optical sizes) or Literata (built for e-reading), self-hosted with a true italic | Scripture, essays, notes, creeds, devotions, session prose | 17 to 26px |
| Inter 400, 500, 600 (kept) plus its true italic, self-hosted | Interface, labels, metadata, short copy, captions | 12 to 19px |

The text serif is a contract change (6.12). If James declines it, the
fallback is Cormorant 500 for Scripture blocks at 21px and up, Inter for
essays, and Inter's true italic self-hosted so no italic is faked.

### 6.2 Type scale, held as `:root` tokens

| Token | Phone | Desktop | Use |
|---|---|---|---|
| `--fs-label` | 12px | 12px | Eyebrows: Inter 500, caps, 0.18em |
| `--fs-meta` | 13px | 13px | Captions, metadata, counts (Inter, `--ink-muted`) |
| `--fs-ui` | 16px | 15px | Buttons, rows, chips (inputs never under 16px) |
| `--fs-body` | 17px | 18px | Inter body and short copy, line-height 1.7 |
| `--fs-read` | 19px | 20px | Text-serif reading, line-height 1.6 |
| `--fs-scripture` | 20px | 21px | The desk's text; block Scripture |
| `--fs-h3` | 22px | 26px | Cormorant 500 |
| `--fs-h2` | 28px | 36px | Cormorant 400 |
| `--fs-h1` | 36 to 40px | 56 to 64px | Cormorant 400, -0.02em |
| `--fs-display` | 44px | 88 to 112px | Home and era openers only (the contract's 7rem) |

Measure: 62ch for reading, never more than 68ch. Line heights: display 1.05,
headings 1.15, serif reading 1.6, Inter body 1.7 (the contract), UI 1.4.

### 6.3 Rhythm and grid

- **Spacing:** an 8px base, as tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96. Section
  spacing on hubs 64px phone, 96px desktop; inside reading pages paragraphs
  space by line height, not margins.
- **Phone:** one column, one gutter token, 20px, everywhere (today it is 16, 24,
  32 or 48 by page; mobile #19). This supersedes MASTER-PLAN 8.6's 16px, so it
  goes in the plan first.
- **Desktop:** a 12-column grid at 1200px. **The desk grid:** left rail 200px
  (from 1280px) · 48 · text 640 to 680 · 48 · margin 280 to 320. Essays and
  sessions use the same text and margin columns without the rail, so a reader
  learns one page shape. Hubs use the 12 columns.

### 6.4 Mustard

- **Two roles, never mixed:** `--mustard` is a fill and rule token only;
  `--mustard-text` (5.27:1 on cream) is the only mustard for text on light
  surfaces. On charcoal, `--mustard` as text passes (7.33:1).
- **Marks of meaning, at most one per screen:** the "you are here" tick, the
  selected verse's rule, the essay's versal, the end mark, the kicker's
  leading rule. Link underlines are 1px and do not count, but never thicken
  past 2px on hover.
- **Never:** a filled button, a colored word in a headline, a card bar, a
  background, a highlight color.
- **Gate:** `validate-design.mjs` fails mustard used as text on bone or card
  surfaces, inline `outline: none` and inputs under 16px (critique,
  engineering Q21).

### 6.5 Cream and black

Cream is the desk. Black is weight, used in four places only: the dark ending
of every page, the verdict lines (rare, one per page at most), room mode for a
group on a television (cream text on charcoal, less glare), and About's hero,
where the man is the subject. Reading pages are **one paper** from head to
end mark: no alternating bands inside an argument (editorial critic). The
contract's alternation applies to hubs and Home, where it already works.

### 6.6 Labels of who is speaking

Five labels in Inter 500 small caps over a hairline, no color coding, the same
words site-wide (A 3): **Scripture** (with the translation named) · **The
church's witness** (dated; verbatim or marked paraphrase) · **Study note**,
typed further as *What the words say*, *What the first readers heard*, *Where
the manuscripts differ*, *How it fits the whole Bible* · **James Bell** (his
signed judgments) · **Your notes (on this device)**. The 4,311 verse notes
already carry typed fields that map onto these (`grammar` and `words` to *What
the words say*; `context` and `history` to *What the first readers heard*;
`text` to *Where the manuscripts differ*; `ot`, `nt`, `parallels`, `refs` to
*How it fits the whole Bible*; `theology` to *What it teaches*), so the
labels are a mapping and a validator, not a re-tagging of four thousand
entries.

### 6.7 Iconography and drawing

- **The house line** grows from the seed the site owns,
  `client/public/article-art/covenant.svg`: one-pixel ink on cream, one
  mustard mark on the point that matters (brand critic).
- **Glyphs** drawn in that line for the things readers sort by: the eight
  history Parts, the shelf's sections, the instruments (each a specimen of its
  output), the devotion themes (the family hand, B 25). Stock Lucide glyphs
  stay only for controls (search, close, chevrons, play, print).
- **Diagrams** in the same line: the band family (4.7), the doctrine rings, the
  marks of Trace the argument, line maps for history and context (Paul's
  cities, where the councils met; MASTER-PLAN 8.5), and figures a guide's
  paragraph asks for (the honor, shame and guilt triangle). Each drawn twice,
  for 390 and about 880px, labeled in live text at 14px or more, with a
  caption that states its point and an "As a list" equivalent (C 22).
- **Images** are witnesses or absent (C tension 7): one public-domain work per
  era and long essay, captioned with artist, title, date, holder and licence,
  each licence checked like a citation. Generated covers retire as real art
  lands.

### 6.8 Data graphics

The desk counts things in the library, never people: references, witnesses,
chapters, the essays that cite a verse. The canon map and the time river are
the site's data graphics; both are proportional, both have lists. No
percentages of anything a person did. No number on the site that a person
has not checked against its source (MASTER-PLAN 2).

### 6.9 Motion

Only where motion carries meaning, all of it on `--ease` and `--dur` (240ms)
and fully off under `prefers-reduced-motion`:

- The sheet rising and following a drag; on reduced motion it appears at its
  detent.
- Trace the argument drawing one mark per step; on reduced motion every mark
  shows at once.
- The year rule on *Lives as lines* moving with its input.
- A 2px pending bar under the header once a page change passes 150ms (mobile
  #13), and pressed states on every tappable thing.
- The header hiding and returning on reading pages.

No scroll-triggered reveals, no parallax, no animated counters, no autoplay.

### 6.10 Night

At two in the morning the anxiety page, the bedtime devotion and the Bible in
bed should not put bright paper into dark-adapted eyes (critique #9).

- **Paper, Night, Auto** in the Aa menu, Auto following `prefers-color-scheme`.
- **One low band:** the page `--charcoal`, sheets and lifted cards
  `--charcoal-soft`, reading text in cream at a slightly reduced strength (a
  new `--night-ink` token defined in `index.css`), `--ink-muted` equivalents
  re-checked for AA, mustard unchanged as a mark. No black and cream
  alternation in Night.
- **Before it ships:** finish the hero token audit `App.tsx` names (every
  charcoal hero takes `--charcoal-fg`), add a render test under `html.dark`
  for every page head, and make `theme-color` follow the theme shown. The
  admin stays light through `.admin-scope`.

### 6.11 The accessibility floor

44px targets everywhere (verses get a 40px hit area through a pseudo-element
so the glyph stays small); every overlay a dialog with focus moved in and
returned; the global focus ring restored wherever an inline `outline: none`
removed it; inputs at 16px or more; every drawing with a list; axe blocking on
the 25 captured routes (U34 extended); the crisis lines as three full 44px
buttons on the first screen of `/help` and every care page (mobile #8).

### 6.12 Changes to the contract, proposed to James

These are proposals, not decisions. Each changes `CLAUDE.md` and is James's
alone.

1. **Add a text serif** (Source Serif 4 or Literata, self-hosted) for
   Scripture, essays, notes, creeds and devotions; Cormorant for display only;
   Inter for interface. *Reason:* serious books set long reading and Scripture
   in a text serif, the site's italics are faked today, and Scripture appears
   in three typographic voices (critique #7, editorial and brand critics).
2. **Name mustard's two roles in the table:** `--mustard` for fills and rules,
   `--mustard-text` for any mustard text on cream, including the eyebrow
   labels the table currently colors "mustard." *Reason:* raw mustard as text
   is 2.09:1 on cream, an AA failure on `/search` (mobile #3).
3. **Black is weight, not the default hero.** Amend "Black: primary surface
   (hero, dark sections, footer)" to reserve black for the dark ending,
   verdict lines, room mode and About. *Reason:* used as every page head, the
   black slab no longer marks anything (brand critic), and the desk is a cream
   room.
4. **Reading pages keep one paper.** The rule that cream and black alternate
   applies to hubs and Home, not inside an essay, session or chapter.
   *Reason:* each color change inside an argument reads as a page ending
   (editorial critic).
5. **Turn on Night.** A reading theme following the system, with the low-band
   palette above. *Reason:* the pages read in the dark are the ones that
   matter most (critique #9). It reverses the plan's parking of dark mode
   (MASTER-PLAN 8.6), so it is his call.
6. **Declare the type scale** in the typography table as tokens. *Reason:*
   headlines run from 44 to 80px with no scale today (editorial critic).
7. **Drop JetBrains Mono from the table**, or self-host it. *Reason:* the
   table names it and the site does not ship it; Inter's tabular figures
   serve Strong's numbers and ISBNs.
8. **Commission a drawn logotype and a monogram** that survives 16px, derived
   from the house line. *Reason:* the wordmark is typed and the favicon is a
   Georgia "L" (brand critic). Not strictly a contract change, but it adds an
   asset the contract would then govern.

---

## 7. What it cuts or folds

One in, one out (MASTER-PLAN 2). Folds that need a redirect use the existing
one-hop pattern, a `redirectTo` stub and `site-structure.test.ts`. URLs on the
never-redirected list stay and are re-headed instead.

| What | Move | Reason | James? |
|---|---|---|---|
| Deep Bible Companion (`/tools/deep-bible`), Bible Study Guide (`/tools/bible-study`), Passage Context tool (`/theology/passage`) | Fold into the desk: the 37 worked passages and 230 passage notes become notes on their chapters (merged text reviewed); book themes become book introductions | Four ways to study one passage, three translations, a "flagship" smaller than the real one (critique #2) | Yes (MASTER-PLAN Q12; tools are on the never-redirected list) |
| `/tools/glossary` (104 terms) | One glossary, `/theology/glossary` (114), opened from prose and the verse panel | Two glossaries with different counts (product #3) | Yes (a tool route) |
| `/theology/creeds` | Links to `/resources/creeds` as "The confessions surveyed" section of the one library | Two creed hubs (IA C4) | No, if kept as a section; yes if redirected |
| `/theology/search` | Kept as a scoped view of the one search | Never redirected; one engine behind it | No |
| "Go deeper on LiveWell" keyword cards on chapters | Replaced by the counted *On LiveWell* row and *Discussed on LiveWell* | Keyword matches read as machine filing (product #19, learning m4) | No |
| Regex subject shelves (`lib/subjects.ts` driving related lists) | Replaced by the hand-filed joins | Dating advice under church history (IA C5, M9) | No |
| The chapter's 13 collapsed accordions | Replaced by typed, labeled layers and the margin | Notes severed from verses (critique #1) | No |
| "Mark as read" alone | "I've answered these," plus the private lines | Records exposure, not learning (learning M1) | No |
| `/tools/theology-quiz` | Retire, or rebuild as twelve real questions keyed to a path, offered at the start and end | Tests disposition, scores into a retired taxonomy, uses a forbidden word (learning M3) | Yes (critique Q12) |
| Scripture Memory's "memorized," counter, percentage and bars | Replaced by the ladder and words ("Held about a month") | A percentage the plan already forbids (C 7) | No |
| Skeptic track's `PillarLeadMagnet` and in-page signup | Removed | The skeptic's page asks him for nothing (B 2) | No |
| The two overlapping history essay series | One spine (the course's Parts), the era essays filed under them as readings | Three periodizations on one page (critique #8) | James chooses the spine (critique Q6) |
| Home's biography-first black hero, the duplicate subscribe box, the books band | The desk-first cream hero; one newsletter ask; books as a line | The first screen is a letter, not a door (brand, visitor critics) | Yes (the hero is his #533 choice) |
| Essay end matter (book band, four essays, two newsletter forms) | The ending allowed to end | Six asks after the last line (critique #7) | Confirm (critique Q9) |
| `/resources` as a door | A footer page and the foot of the Topics menu (U19 already does this) | A drawer named for nothing a reader wants (IA M2) | Done by his 10-26 answer |
| `GeneratedCover` and `GeneratedHero` on seven surfaces | Retired as real art and the house line land | Ornament, not witness (C 22) | No |
| `/post-christian` and `/exile` 301 targets | Point them at `/topics/living-after-christendom` instead of a one-essay section | The URL built for the skeptic's exact question should land on the page that answers it (visitor critic) | Yes (critique Q4) |

Not built in this direction, as in MASTER-PLAN 11: reader accounts, streaks,
badges, an AI chat, a chart or map library, carousels, modals, a quiz before an
essay, a zoomable canvas, verse pages for 31,000 verses, a sixth door.

---

## 8. Build path in this codebase

### 8.1 What it reuses

The desk is mostly composition over parts already merged or reviewed:

- **Merged (#536, #538):** `lib/scripture-ref.ts` (U09) for every reference
  and the citation index; `VerseRef` and the text shards (U16) for the sheet
  and for Read depth's 5.8 KB load; `Sheet`, `Stepper`, `Position`, `PageHead`
  (U14) for the panel, Trace the argument, room mode and every head; Find
  (U15) as the seed of the one search; The Table (U17) and its `TableMode`,
  `useWakeLock` and `ListenButton` for room mode and Listen; the essay first
  screen (U04) and the essay gate (U03).
- **Reviewed, awaiting merge:** U07's sources corpus and `verify-sources.mjs`
  for the church's verbatim witnesses; U18's Home Find and tonight line; U19's
  doors; U25's topic pages; U28's story plan and `lib/storyPlan.ts` for the
  shared week; U29.
- **Older helpers:** `lib/storage.ts`, `lib/library.ts` (My Library),
  `lib/calendar.ts`, `lib/telemetry.ts`, `lib/clipboard.ts`, `TakeItWithYou`,
  `ToolActions`, `CitationCopy`, `TextSize`, `EditorialIndex`, `CardGrid`,
  `HubGroup`, `QuickExit`, `CrisisBlock`, `Markdown.tsx` and its remark plugin,
  `scripts/build-bible.mjs`, `scripts/build-pdfs.mjs`.
- **Data already present:** chapter notes with outline, OIA questions and
  `teach` in all 1,189; `hard`, `interpretation`, `text` in 114; typed verse
  notes in 202 chapters; `doctrine-verses` for all 62 doctrines; the 12
  strongest cross-references per verse; `story.json`'s eleven acts; the
  catechism, creeds, glossary and debate pages.

### 8.2 Phases

Mapped onto MASTER-PLAN units; new units are marked **D** (desk). Code-only
units merge on green checks with screenshots (James's answer 1); anything
under his byline goes through the sample review.

**Phase 1, now to November 28 (no page redesign during the run-up to Advent).**
- **D1 Type and tokens.** The type scale, spacing and gutter tokens, the
  `.ed-` house classes (C 5), the five labels component; the text serif
  self-hosted if James approves (otherwise Inter's italic). `validate-design.mjs`
  gains the mustard-as-text, `outline: none` and input-size rules. Small, and
  every later unit depends on it.
- **D2 Layer kinds.** The mapping of note fields to the five labels in
  `lib/bible-notes.ts`, enforced by `validate-bible-notes`; empty-layer text.
- **D3 The citation index.** `scripts/build-verse-index.mjs` and its `--check`;
  data only, consumed later.
- **D4 Refactor `StudyBible.tsx`** (843 lines) into `pages/study-bible/`
  modules (head, text, panel, notes, bar) with no visible change, so the
  Platform lane's next units do not collide in one file.

**Phase 2, November 29 to January 10: the desk before the New Year.** The 2027
plan (U28) sends readers to a chapter every day from January 1, so the
chapter page is the most visited page the site will have. This phase replaces
and enlarges **U37** (Study Bible for thumbs, January 29) and pulls it
forward.
- **D5 The text first.** Compact head, outline headings in the text, the two-
  line summary, the bottom bar with the book and chapter picker, "John 2" at
  the last verse, next chapter prefetched, Listen. Verse 1 on the first phone
  screen.
- **D6 The verse panel.** Whole-verse selection, the sheet with detents and
  dialog semantics (extending `Sheet`), the margin that follows the reading
  from 1100px, the counted rows, Previous and Next verse, URL state, *On
  LiveWell* from D3.
- **D7 Depth.** Read, Study, Teach; the Observe questions above and the
  private Interpret and Apply fields below; the hard question at the head; the
  leader's sheet print stylesheet.
- **D8 Marks and notes.** The pencil bracket, notes, My Library by book, export
  and import (`livewell-desk-v1` through `lib/storage.ts`).
- **D9 The canon index.** The canon map and the compact phone list, chapter
  grids in place, Pick up where you stopped; books get a `division` field.

**Phase 3, January 11 to March 28: the joins and the rooms.**
- **D10 One search** (extends U15): kind shards, grouped results, the
  definition card, best bets, trails, keys. Before essays, because the
  doctrine door depends on it.
- **D11 Gloss and registry links in prose** (C 9) and **notes beside the text**
  on essays (with U23 and U24; the footnote convention goes into `BRIEF.md`
  now, while the Doubt essays are being written).
- **D12 The band component** and the book band on every chapter; the thread
  on doctrine studies; the time river on the history front door (with U31).
- **D13 The doctrine door**: `/study/doctrine`, the joins file and its
  validator, the 76 question pages through the 9.3 checklist, the rings. *In
  brief* texts (60 words each) and their proofs are writing for James's
  review; the pages ship with the catechism's existing adult answers until
  they exist.
- **D14 The church on this verse, stage one** (the 114 `interpretation` fields
  as dated rules).
- **D15 Night**, after the hero audit and the dark render test.
- **U44 Creeds you can learn** takes the phrase-in-the-margin layout and
  Compare for 325 and 381; **U45 context guides** take the guess before the
  reveal.

**Phase 4, from March 29: the paths and the instruments of study.**
- **D16 Paths**: `/study/paths`, *The Gospel first*, the two eight-week plans
  moved to Study, *Read Mark with a friend* (new writing), the shared week page
  (`/study/this-week`) and Home's week verse list.
- **D17 Bring it back**: `lib/review.ts` and the ladder, Scripture Memory
  repaired onto it (C 6, C 7).
- **D18 Compare and the study sheet** (A 20, A 21).
- **D19 Trace the argument**: the component, then one passage at a time.
- **D20 The church on this verse, stage two**: verbatim witnesses gated by
  U07's verifier, starting with the creedal verses.
- **D21 Room mode for group guides** (A 16) on `TableMode` and `Stepper`.
- The folds James approves (**U66**), each paired with the desk feature that
  absorbs it.

### 8.3 Two runtimes

Nothing in this direction needs the API. The desk, search, joins, marks,
paths and review are static JSON and client code, as U15 established for
search. No procedure is added to `server/routers.ts`, so `api/index.ts` and
`api-parity.test.ts` are untouched. If James later wants notes to follow a
reader across devices, that is an auth and schema change with both runtimes,
and it is his call first.

### 8.4 Performance budget

- Home: the week's verse and James's sentence are in the prerendered head
  (`Home.tsx` and `prerender-heads.mjs` change together); the verse panel's
  code and data load on the first tap; Lighthouse on home no worse than U08's
  95 to 96 runs.
- The desk: Read depth loads the text shard only; notes after first paint;
  the interlinear on request; next chapter prefetched; U35's budget check
  covers the chapter route.
- Search: kind shards on focus (2.5).

### 8.5 The biggest risks

1. **The desk becomes Logos.** Depth shown everywhere turns a quiet room into a
   cockpit (A tension 3; STEP's own guide admits "a lot of functionality
   packed in"). *Guard:* Read is the default from every household and plan
   door; the first phone screen shows words; the panel is a short counted list
   with empty rows hidden; every new layer needs a line in 4.1's fixed order
   before it is built.
2. **Uneven depth shows.** Verse notes cover 202 of 1,189 chapters; hard
   questions and dated readings 114. A reader who meets three rich chapters
   and then a thin one may think the site is unfinished. *Guard:* the panel
   says what is not yet written in one honest line, counts are never padded,
   and the plans route first through the richest chapters (the Gospels and
   Genesis).
3. **Scripture paragraphs need data the build does not have.** No paragraph or
   poetry marks exist in the shards. *Guard:* the outline's headings carry the
   breaks from Phase 2; paragraphs and poetry lines wait on a formatted BSB
   source (USFM-style markup) whose availability and terms must be checked
   before `build-bible.mjs` reads it. Nothing in Read depth may promise poetry
   lines before then.
4. **Translation seams.** The desk shows the BSB; essays quote the ESV. A
   reader who taps an essay's reference and sees different words may read it
   as a mistake. *Guard:* every surface names its translation at the point of
   quotation; essay references open the desk as a link with "Berean Standard
   Bible" in the panel head; Compare offers public-domain texts only; Crossway's
   terms read verbatim before any ESV appears in a print sheet (MASTER-PLAN
   9.4, critique Q2).
5. **James's time.** *In brief* for 76 questions, 35 steelmen, *Read Mark with
   a friend*, Twelve weeks, the leader's sheet wording and the week's verse
   list all pass through him. *Guard:* every one of these ships with existing
   text first and improves when he has read the new; nothing waits on writing
   to be useful.
6. **The skeptic reads "a Bible app" and leaves.** The desk can look like a
   believer's tool. *Guard:* the skeptic's door is on the first screen of Home
   in his own words, the hard question is the first thing in the notes, the
   hostile witnesses are on the time rule beside the friendly ones, and
   nothing he lands on asks for an email.
7. **The seeker and the parent feel sent to a library.** *Guard:* Family and
   Find Help keep their own front doors and first screens; the desk is offered
   to them, never required.
8. **Gestures and accessibility.** Detented sheets and swipes fail keyboard
   and switch users if built as gestures only. *Guard:* every gesture has a
   button; the sheet is a dialog; the test suite checks focus in and out.
9. **One file, many lanes.** `StudyBible.tsx` would be touched by D5 to D9,
   U37's remains and the search work. *Guard:* D4's refactor first; D5 to D9
   in order in the Platform lane, never in parallel.
10. **Device-only notes can be lost.** Cleared site data erases a year of
    notes. *Guard:* say so at the field, offer export from the first note, and
    show "Couldn't save to this browser" when storage fails (the house line).

### 8.6 Decisions this direction needs from James

1. The text serif (6.12, item 1), or the Inter-italic fallback.
2. The other contract proposals (6.12, items 2 to 8).
3. Keep the five doors, with Doctrine as a named room in the Study menu.
4. The Home hero: the desk-first cream screen, with his headline's dashes
   replaced by commas and his atheist sentence moved to the top.
5. One reading text on every study surface (the BSB), the ESV named wherever an
   essay quotes it (critique Q2).
6. The canonical history spine: this direction recommends the course's Parts
   (I to VIII) as the one periodization, with the era essays as readings
   (critique Q6).
7. The folds in section 7 marked "Yes," especially the three passage tools into
   the desk (MASTER-PLAN Q12).
8. `/post-christian` and `/exile` pointed at the post-Christian topic page
   (critique Q4).
9. Offline reading of the Bible text and the care pages, which means reversing
   the service worker's `selfDestroying` setting for those paths.
10. The writing only he can approve: *In brief*, the steelmen, *Read Mark with
    a friend*, Twelve weeks, the week's verse list.
