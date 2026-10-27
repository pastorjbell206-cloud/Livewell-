# The vision: the long memory, on a study desk

Step 3 of the design program in `docs/work/NOTES.md` ("James's redesign brief"), 2026-10-27. This is the chief design officer's merge of the four directions in `docs/work/design/vision/` (`long-memory.md`, `study-desk.md`, `the-week.md`, `field-guide.md`) and the six judges' verdicts beside them (`judge-james.md`, `judge-skeptic.md`, `judge-pastor.md`, `judge-parent.md`, `judge-director.md`, `judge-engineer.md`). It is a proposal for James to approve, not a decision. Anything here that would change the brand contract in `CLAUDE.md` is listed in 6.10, anything that touches the Decision Log or another of his gates is in 6.11, and none of it goes into code before he answers. The clickable prototype (section 9) is the next step; the master plan is revised after he has seen it (section 10).

**Read for this document.** `CLAUDE.md` in full; `CRITIQUE.md` and the seven critic reports in `critique/`; `research/A-SYNTHESIS.md`, `B-SYNTHESIS.md` and `C-SYNTHESIS.md` (verdicts, ranked patterns, tensions); `docs/work/plan/MASTER-PLAN.md` sections 0 to 3, 7.2, 10.1 to 10.7 and 11; `docs/work/NOTES.md`; all four directions and all six judges in full; the current screenshots in `shots/current/` (home, John 1, church history, Tonight, the strongman essay) and the wave 3 and U18, U19 and U25 captures in `docs/work/plan/shots/`.

**Checked in the repo for this document** (work branch at aa31178a, wave 3 integrated), so the vision is sized to what exists and repeats none of the errors the judges caught:

- Chapter notes: 1,189 chapters carry `summary`, `outline` and three `questions`; `hard` (a question with its answer) is filled in **1,033**; `teach`, `interpretation` (dated church readings) and typed Observe, Interpret and Apply questions are filled in **114** (the four Gospels and 25 Old Testament chapters). Verse-by-verse notes exist for John 1, and John 1:14 carries `context`, `grammar` (sarx, egeneto, eskēnōsen "pitched his tent"), `words` and `theology` (Chalcedon, 451).
- The BSB text of John 1:14 in `client/public/bible/text/john/1.json`: "The Word became flesh and made His dwelling among us. We have seen His glory, the glory of the one and only Son from the Father, full of grace and truth."
- The U07 corpus in `scripts/data/history-sources/texts/` (22 public-domain texts, all written before about AD 450). Irenaeus, *Against Heresies* 3.11.3, quotes John 1:14 in the stored text: "Therefore the Lord's disciple, pointing them all out as false witnesses, says, "And the Word was made flesh, and dwelt among us."" The stored Epistle to Diognetus, Martyrdom of Polycarp, Creed of 325, Ambrose's Letter 51, Augustine's *City of God* Book 5 and Theodoret's *Church History* Book 5 were read for the excerpts named in section 9.
- The registry: 36 people (two women, Perpetua and Teresa of Avila), 7 eras, 68 events, 11 councils; Ignatius "around 35 to 108," Polycarp "around 69 to 155"; six of its people alive in 386 by its dates (the two Gregorys, Ambrose, John Chrysostom, Jerome and Augustine), and in 325 only Athanasius. The 22 era essays are two series: fourteen with fine ranges and eight broad ones (`apostolic-and-persecuted`, `councils-and-creeds`, `the-long-middle`, `reformation-and-its-wars`, `awakenings-and-enlightenment`, `the-american-experiment`, `the-attractional-era`, `after-christendom-era`).
- The 2027 plan (`bible/guides/whole-story-2027.json`): day 12 (Tuesday, January 12, 2027) is Genesis 31 to 32 in Act Three, Abraham and the Promise; day 302 (Friday, October 29, 2027) is Luke 8 to 9 in Act Nine, Christ, the Center.
- The family year map and the catechism's weekly walk (`familyYear.generated.ts`, `catechismWeekIndex`): the week of November 8, 2026 holds the devotion "Keep Going" (Hebrews 12:1) and catechism question 46, "What is the church?"; the week of January 10, 2027 holds "The Weight You Put Down" (Ephesians 4:32) and question 55, "Why do we call God Father?". Advent's daily set runs December 1 to 25; Advent begins November 29. Fourteen devotions carry a `grownups` line that opens a care page ("If money is a worry in your house, start here.").
- The landed essays: none on the work branch yet; five pilots sit on `origin/claude/essays` (PR #539, waiting on James's sample read), among them `what-post-christian-means` (*What "Post-Christian" Actually Means*) and `the-early-church-under-rome` (*When the Church Had Nothing to Lose*).
- The doors James chose on 2026-10-26 (Study, Topics, Family, Essays, About) are built in `client/src/lib/siteNav.ts` (U19, reviewed, integrated). U25's `/topics/living-after-christendom` carries a `witness` that paraphrases the Letter to Diognetus.
- Tokens: `--s-1` to `--s-9`, `--w-prose` 680px, `--w-default` 1180px, `--mustard-text` #7A6010, `--charcoal-fg-muted` at 78 percent cream. No type-scale tokens. Fonts self-hosted: Cormorant Garamond and Inter only, no text serif, no Inter italic.

**Conventions.** "A 1" is ranked pattern 1 of `A-SYNTHESIS.md`, likewise B and C. "Critique #3" is problem 3 of `CRITIQUE.md`; "critique Q5" is its question 5. "LM," "SD," "TW" and "FG" are the four directions; "LM 4.4" is section 4.4 of `long-memory.md`. Unit IDs U01 to U68 are the master plan's; U69 onward are new (section 10).

---

## 0. The vision

**To read aloud.**

LiveWell is a place to study the Bible, the faith and the long story of the church, made for a country that no longer hands anyone the faith. Its front page shows one drawing: twenty centuries of the church on a single line, drawn to scale, the long stretch of Christendom bracketed above it, and one small mark at the end that says *You are here*. Everything opens from that line or from the text. Open any chapter and the words come first, set the way Scripture is set in a good book. Touch a verse and the library gathers around it, every voice labeled: what the words say, what the first readers heard, what the church said about it and when, in quotations anyone can check, and your own answer, asked for before anyone else's. Open the history and meet the people who stood where we stand, in their own words, with the losing side heard first and the church's failures drawn in the same ink as its councils. Bring a hard question and find it named in plain words, answered at full strength, and left open where faithful Christians differ. At the end of the day, tonight's devotion for the family table is two taps from the front page, and on Sunday a pastor can print the week on one sheet. Nothing counts you, chases you, or asks you to sign up. The hope is a reader who leaves steadier and humbler than he came, having seen that the faith is older than his culture, deeper than his politics, and more demanding than he had been told.

**The promise, in one sentence.** Open any verse, any question or any year, and LiveWell sets it on the long line of the church: the text first, every voice labeled and dated, the strongest objection heard, and one mark that says where you are standing.

---

## 1. Why this, and what we chose not to do

### 1.1 What the judges said

| Direction | James | Skeptic | Pastor | Director | Engineer | Parent | Total | Seats won |
|---|---|---|---|---|---|---|---|---|
| The Study Desk | 85 | 83 | **84** | 81 | **85** | 63 | **481** | 2 |
| The Field Guide | 71 | 78 | 80 | 78 | 77 | **83** | 467 | 1 |
| The Long Memory | **87** | **89** | 78 | **87** | 69 | 53 | 463 | 3 |
| The Week | 75 | 66 | 81 | 70 | 73 | 77 | 442 | 0 |

Three seats chose the Long Memory: James's own brief, the skeptic (the reader the contract ranks first and gives the tie), and the design director. Two chose the Study Desk: the pastor and the engineer. The parent chose the Field Guide. The Study Desk has the highest total.

### 1.2 The base: the Long Memory as the spine and the face, the Study Desk as the engine

The base is **the Long Memory**: its organizing idea (time, with the American present read against twenty centuries), its signature drawing (the Line), its drawing grammar, its history study, and its claim on the home page. Its reading surface is replaced, whole, by **the Study Desk's**: the chapter page, the verse panel, Read · Study · Teach, the labels of who is speaking, the search, and the build order. The other two give their best systems as bounded modules: the Week its household and congregational machinery, the Field Guide its question registry and its care discipline.

This is not the highest total, and the reasons the judges gave are why.

1. **The Study Desk's lead is the shared lane, not a spine.** The engineer said it plainly: all four directions propose the same reading surface, text serif, search and folds, and "the best base is the direction whose spine is the shared lane." That is an argument for building the Desk's surface first, which this vision does (section 10), not for making a desk the site's identity. On identity, the Desk lost the seats that judge identity: James's ("it makes the site a believer's instrument first"), the skeptic's ("tells a man who does not believe that he has arrived at a Bible app"), and the director's ("the signature is shaped like an interface").
2. **The Long Memory is James's thesis, drawn.** His headline is a claim about time; his own hero paragraph says "The early church knew. So did believers in every age who lived without power"; the Decision Log names "the church's long history" as half the site's purpose; he asked twice for "the best church history study available ... very interactive." No other direction makes that the centerpiece (judge-james 4). It is also the one opening no one in the niche holds: "the church's long memory set beside the verse, dated, attributed and verified, for a lay reader" (A verdict).
3. **The skeptic wins the tie, and he chose it.** History is the one door he will open without conceding anything first, and the Long Memory builds honesty into the method (the losing side first, witness labels, the church's failures drawn as hinges, gaps drawn as *Not yet written*) rather than into tone (judge-skeptic).
4. **Its low scores are about build and the household, and those are exactly what the grafts fix.** The engineer scored it 69 for a new core over a registry not yet built and every tick a public claim; the parent scored it 53 because the Line pushed Tonight down the first screen and the care pages went untouched. This vision takes the Desk's build order, puts the Line on the history door before the home page and only after its ledger, holds Tonight high on Home's first screen, and takes the Field Guide's care work and the Week's household machinery whole.

Read the merge as one sentence: **the text on a desk, the story on a line, the week at the table, the question at full strength.**

### 1.3 What each direction gives

| From | What the merge takes | Where |
|---|---|---|
| **The Long Memory** | The Line and its grammar; the hinge sheet; Who was alive; the church on this verse as a dated strip; where the words came from (the creed's date rail); the facing page and Compare the witnesses; Asked before; the gap ruler (late, ledgered); Twelve weeks, twelve turns; the church remembers; the history front door, Part, session and person templates; type a year in search; mustard as the mark of *now* and *this*; the black hero | 3, 4.1, 4.2, 4.3, 4.7 to 4.10, 5.10 to 5.15, 6 |
| **The Study Desk** | The chapter page and its first screen; the verse panel exactly as specified; Read · Study · Teach with the leader's sheet (corrected); your answer first; the hard question at the head of the notes; the five labels of who is speaking; the citation index; search that answers by kind; the doctrine question pages; Trace the argument; the pencil marks; the skeptic's door as one screen; the reading grid; the build order (refactor first, the desk before January 1) | 4.3 to 4.6, 4.13, 5.4 to 5.9, 6, 10 |
| **The Week** | The week engine (generated from data, tested on real dates); For Sunday on one printed page; courses that begin on a Sunday with the mercy rule; Read and pray and the four doors in a day; carry this into the week; the refusals written as checks; "coherence shown only when the data makes it"; the prayer-book setting for words to be said | 4.11, 5.22, 5.23, 6, 7 |
| **The Field Guide** | One Guide registry behind the Topics door; care cards by urgency and a safe exit; crisis lines as three 44px buttons; Honest Answers one page each; two step by steps; sensitive free text never in a URL; region heads only in James's published words; the masthead descriptor; the drawings as a finite, captioned series; one margin per side; mustard text only in a page's first kicker; the dek in the text serif's italic | 2.5, 2.6, 4.12, 5.16 to 5.21, 6 |

### 1.4 Conflicts, resolved

Every place the directions or the judges disagreed, with the resolution and its reason.

| # | Conflict | Positions | Resolution | Why |
|---|---|---|---|---|
| 1 | The doors | LM: Study · History · Topics · Family · Essays, About to the masthead. FG: Questions first. SD, TW, and the James, pastor and engineer seats: keep his five | **Keep Study, Topics, Family, Essays, About.** Church history is a named row of the Study menu and the first thing on `/study`'s page. "by James Bell" in the masthead also opens About. The History door and the "Questions" label go to James as pictures at 390 and 1440, his five the default | He chose them on 2026-10-26 and U19 built them; About is the face the skeptic needs; a congregation told where to look should not be told again in a month (judge-pastor) |
| 2 | Home's first screen | LM: the Line in a black hero. SD: a cream hero with this week's verse. FG: five question rows. TW: the week card | **Black hero: headline, James's sentence beside his face, two rows (the skeptic's door, then Tonight), then the Line with his own sentences as its caption, then Find.** The verse specimen moves to the This week band; the question rows to the band below (phone) and a cream strip (desktop); the week card becomes the This week band | James's headline and face lead; the skeptic is addressed before anything speaks to believers; Tonight survives the browser's toolbars; the signature is still on the first screen |
| 3 | Tonight's place | Parent: high on the first screen at every hour, never either/or with Continue. LM: first line at the foot | **A fixed second row in the hero, directly under the skeptic's door.** Only its words follow the hour. Continue never takes its place; it sits at the top of the first band | judge-parent's first must-not-lose |
| 4 | The Line on Home, now or later | James, skeptic, director: on the first screen. Engineer: on the history door until its ticks are verified and the registry exists | **Shown to James in the prototype now; built on the history door first (U31, December); on Home only after its marks pass the ledger and validator (U84, January)** | Both are right in sequence: the drawing is the face, and no drawing ships before its ledger (judge-james condition 2) |
| 5 | James's sentence on the hero | LM: `--charcoal-fg-muted`. Others: full strength | **Full `--charcoal-fg`**, verbatim, keeping "raised without a father" | Gray for primary text was the editorial critic's finding; the skeptic's best credential |
| 6 | Portrait size | LM: 56 x 70 on a phone | **64 x 80 on a phone, about 240 x 300 on desktop**, a real photograph when James supplies one | "A face you can read" (visitor, brand critics) |
| 7 | Phone gutter | SD: 20px. Others and MASTER-PLAN 8.6: 16px | **16px, one token** | Two gutters is the bug the mobile critic found |
| 8 | Type token names | `--fs-*` (LM, SD) against `--t-*` (TW, FG) | **`--fs-*`**, one scale (6.2) | One naming, decided before any template unit |
| 9 | Cormorant at small sizes | LM's caption at 19px and deks at 20px | **Cormorant never below 22px.** Captions and deks in the text serif's italic (Inter's true italic if the serif is declined) | Director: "the spindly size the editorial critic faulted" |
| 10 | Black on Home | LM: hero, the twelve turns band and the ending | **Hero and ending only.** The twelve turns sit on cream | Black is for weight; a course list is not a verdict |
| 11 | A dateline in the header | TW proposes; the director would take it on desktop; James's and the engineer's seats would not | **No dateline in the header.** The date and season live in Home's This week band, on `/family` and Tonight, and on the week page | Header width and a Decision Log line for little gain; the date still shows where the week is used |
| 12 | Find Help's color | FG and parent: `--mustard-text`. TW: ink. Skeptic: never the loudest thing, with a descriptor | **`--mustard-text`, Inter 500 at the doors' size, not bolder**, with the masthead descriptor beside the name from 1100px | The crisis door keeps its signal; the stranger meets a name, a descriptor and a door, not a wellness brand |
| 13 | Search group order | SD: doctrine first. LM: people and events added. Parent: a sentence about a life must reach care first | **The order is chosen by the kind of query** (FG 2.6): a reference opens the verse; a plain sentence shows the Guide and care first; a doctrine word opens the definition card; a year opens the Line; crisis words outrank all | One index, four kinds of question; no fixed order serves all four |
| 14 | The Guide registry and the skeptic | FG merges Honest Answers into the care registry. Skeptic: "his doubt becomes one situation in a triage" | **One data file, separate views.** `/answers` and `/skeptic-track` are their own pages; "Is any of it true?" never shares a screen with a crisis line; every row says its kind | One source of truth without filing his questions as a pathology (learning C2) |
| 15 | Field marks ("Not this. This.") | FG on every entry | **Not taken.** His signature moves stay at genuine hinges in his prose | `VOICE-JAMES-BELL.md` puts repeated antithesis on the avoid list; NOTES found stock phrases "became a stamp" |
| 16 | The stations rail | FG on every question-shaped page | **Only on long care pages and topic pages** | Director and parent: it becomes a form |
| 17 | Teach depth | SD: a leader's sheet "for any chapter" from `teach` | **The sheet is built from what every chapter has** (summary, outline, the three questions, the hard question where it exists); the `teach` block appears only in the 114 chapters that carry it, and the sheet says so | `teach` is in 114 chapters, not 1,189 (judge-pastor, judge-engineer) |
| 18 | "Read with these in mind" | SD: Observe questions above every chapter | **Above the text only where typed Observe questions exist (114 chapters).** Elsewhere the chapter's three questions sit after the text with their private fields | The other 1,075 are untyped; the vision does not invent a typing |
| 19 | The hard question's reach | Three documents: 114 chapters | **1,033 chapters.** The question at the head of the notes ships almost everywhere | `hardQuestions()` already reads both shapes |
| 20 | This week's verse on Home | SD: embedded at build time | **The table's verse of the week, from the generated week map, read after mount, with the build week's verse as a static fallback in a reserved box** | A build-time verse goes stale between deploys (judge-engineer); the table's verse puts household and study on one passage (A 13) with no new writing |
| 21 | When Night arrives | LM: last. FG: Easter onward. SD: phase 3. TW and parent: forward, household first | **Phase 3, after the hero token audit and a render test, with Tonight, table mode, the care pages and the chapter first** | The pages read in the dark are the ones that matter most (critique #9) |
| 22 | Room mode for groups | SD: from March 29 | **Phase 3** on `TableMode` | The pastor's seat; the parts exist |
| 23 | Dated courses | SD: phase 4 | **Phase 2 (`lib/runs.ts`, U81)** so a pastor can start a run in January | judge-pastor graft 3 |
| 24 | The care pages | FG: restructure first. Engineer: the riskiest surface, not first | **Three crisis buttons early (Phase 2, small and safe); urgency cards, review dates and the exit in Phase 3, before Lent, after James's care review** | Stakes and sequence |
| 25 | New top-level addresses | TW: `/week`, `/today`, `/day`, `/year`, `/seasons` | **Only `/week/:sunday` and its print view, `noindex`.** No daily office, year page or seasons until James answers | Fewer, truer things; the office is an identity question for him |
| 26 | Seasons and numbered issues | TW, C 17, B 4 | **His question (6.11).** "Latest" retires either way; the shelf leads with one dated essay | One writer's cadence (B tension 1) |
| 27 | The history spine | All four point at the course's Parts | **The course's Parts (0 to VIII) everywhere**: the Line, era kickers, search; the 22 era essays filed under them, the eight broad ones marked *The short version* | Critique Q6; one periodization replaces three |
| 28 | Twelve weeks, twelve turns | LM specifies; SD leaves it to James | **Build the frame on the era essays that exist; James chooses the turns** | Ships on existing text (judge-james must-not-lose 17) |
| 29 | Doctrine's home | IA critic: a door. SD: a room | **A named room under Study, landing at `/study/doctrine`**, entered by the creed and its dates (default), by question, or by the map | One tap from the header without a sixth door |
| 30 | `/post-christian` and `/exile` | LM, SD, skeptic: point them at the topic page | **His call (6.11)**; until he answers they stay as they are | The 2026-10-12 fold is a Decision Log entry |
| 31 | The verse panel's rows | SD's eight; FG adds "Asked in the Guide" | **SD's order; "Asked in Topics" becomes the first group inside *On LiveWell*** | One counted list, one more source, no ninth row |
| 32 | Who gives the gaps a voice | LM draws *Not yet written*; SD writes it in one line | **Both: drawings show empty cells, panels say one honest line** | Honest gaps, not padded counts |

### 1.5 What we chose not to do, and why

- **The Study Desk's cream verse hero.** A verse to tap as the first object tells the skeptic he has reached a Bible app for people who already believe, and it replaces the black, biography-first hero James chose in #533. The verse specimen survives in the This week band and opens the real panel.
- **The Week's week card as Home's lead, its header dateline, the daily office and the Examen.** The form is a planner's, the visual family the research found buying attention (judge-director); for the skeptic the home page's center of gravity becomes a devotional practice he does not keep (judge-skeptic). Whether LiveWell offers a morning and evening prayer at all is James's question, later, behind a door he names (C-SYNTHESIS 4.6, question 1).
- **The Field Guide's question-first front door, "Questions" as a door first in line, and field marks.** The front door risks reading as a help desk, the therapeutic religion the guardrails name; the label and order reverse a choice James made a day earlier; field marks template his signature move.
- **The Long Memory's door change and its About-in-the-masthead.** Offered to James as a picture, with his five as the default.
- **The IA critic's five-aim doors** (Bible, Doctrine, History, Our Moment, Living). They spend two doors on study and contradict a Decision Log entry; the rooms under Study carry the same distinctions.
- **What no direction should do, and none does here:** reader accounts, streaks, badges, percentages of a person, counts of people, push notifications, pop-ups, modals, carousels, autoplay, parallax, scroll-triggered reveals, an AI chat box, a chart or map library, a zoomable canvas, per-verse pages, a sixth door, a quiz before an essay, "Latest" feeds.
- **Building beyond the corpus.** No verbatim witness after about AD 450 until U07's survey has fetched and verified one; no statistic on a drawing; no mark on the Line that opens nothing.

### 1.6 Facts corrected before anything goes to James

| Claim | Where | What the data says | Now |
|---|---|---|---|
| "Polycarp was a boy when Ignatius died," "in the registry's own dates" | LM 4.3 | Registry: Ignatius around 35 to 108, Polycarp around 69 to 155. Polycarp was about 39 | The Who was alive example in 4.9 is recomputed |
| "Day 302 of 365 · The Prophets and Exile" | LM 3.2 | Day 302 is Luke 8 to 9, Act Nine, Friday, October 29, 2027 | Every returning-reader example in this document is computed (3.3, 9) |
| "Days 302 to 308: Jeremiah" | SD 3.4 (and A 13) | Luke 8 to 9 through Luke 21 to 22 | Same |
| `hard` in 114 chapters | SD, FG, A-SYNTHESIS | 1,033 | 1.4 row 19 |
| `teach` in every chapter | SD | 114 | 1.4 row 17 |
| Observe questions in every chapter | SD 4.5 | Typed in 114; untyped arrays of three elsewhere | 1.4 row 18 |
| The week's verse embedded at build | SD 3.1 | Stale until the next deploy | 1.4 row 20 |
| The house line's seed has one mustard mark | all four | `covenant.svg` carries five (judge-director) | The house line is redrawn with one (6.6) |

**The rule that prevents the next one** (TW 1, judge-james condition 2): every week, day, date, age and example in a design document, a test, a caption or a prototype is computed from committed data, never typed from memory or a summary. Section 9 lists the data each prototype screen reads.

---

## 2. Information architecture

### 2.1 The doors

**Study · Topics · Family · Essays · About**, as James chose on 2026-10-26 and U19 built. Beside them: **Find Help** (first in the utility row, every page), **Search** (a visible field on desktop with a `/` hint; an icon on a phone that opens a full-screen dialog), **Subscribe** (an ink outline button, never a black or mustard fill that outweighs the wordmark), and **My Library** (an icon on desktop, a row in the phone menu, "On this device").

**The masthead.** The wordmark "LiveWell" (live Cormorant until a drawn logotype exists, P9), and beneath it "by James Bell" in Inter 500 caps, which is a link to About on every page and at every width. From 1100px, a plain descriptor in Inter 13px `--ink-muted` beside the name, in words James chooses (P8; the contract's tagline is one candidate). The descriptor is what stops "LiveWell" beside a colored "Find Help" from reading as a wellness brand to a stranger (visitor critic).

**The menus.** On desktop a short panel under each door; on a phone a bottom sheet over a `--scrim`, the search field in its top slot, its largest targets at the foot within thumb reach (*Tonight at the table*, *Find Help*, *Search*; TW 2.1 fitted to these doors). Rows for pages not yet built appear only when the page ships.

| Door | Rows, in order (each with a one-line descriptor in the panel) |
|---|---|
| **Study** `/study` | The Study Bible (66 books, every chapter) · Church history (twenty centuries, and where you are standing) · Doctrine (what the church confesses, and when it had to say it) · Creeds and confessions · The Bible in its world · Courses and plans (where to start, at your pace) · Study with a group · Read the whole story in 2027 |
| **Topics** `/topics` | Every question, in your words · What "post-Christian" means · Not sure you believe any of this? · Honest answers · Test the case · Eight-week plans · Self-checks · Tools · Everything, A to Z (`/resources`) |
| **Family** `/family` | Tonight at the table · This week, on one page · The year of devotions · The family catechism · Family reading plans · Starting family devotions (a step by step) |
| **Essays** `/writing` | The shelf · By section · By passage (from the citation index) |
| **About** `/about` | About James · Books · Speaking · Contact · How we write · What's new and corrections · Newsletter · the Pastors Connection Network and the podcast (external) |

**Why the Study Bible keeps the first row and church history the first screen.** James's seat asked that Study open with "the whole story"; the Study Desk asked that it open with the Bible. Both are served. The menu is a table of contents read in the order of James's brief (the Bible first, and from January 1 the 2027 plan sends readers to a chapter every day), and `/study`'s own first screen is the Line, so church history is the first thing a reader sees when he opens the door (5.2).

**"You are here."** Every page carries a breadcrumb that names its door and room, whatever its URL says ("Study › Creeds › The Nicene Creed" on `/resources/creeds/nicene-creed`), and the door lights for every page beneath it (ia.md M1). URLs do not move; the breadcrumb is the map. On reading pages (chapters, essays, sessions, care pages) the header hides on the way down and returns on the way up.

### 2.2 The map

URLs on the Decision Log's never-redirected list stay where they are (`/study/*`, `/theology/history` and church history, `/theology/glossary`, `/theology/search`, `/theology/doctrine/*`, the creeds, the context guides, `/downloads`, `/nation`, `/help`, every tool). Nothing under `/theology/history` redirects. Every new param route goes through the master plan's 9.3 checklist with literal `SEOMeta`.

| Door | Route | What it is | State |
|---|---|---|---|
| Home | `/` | The first screen in section 3 | Changed (U84) |
| Study | `/study` | The Line as the first screen, then the three rooms and a router | Changed (U84 with U75) |
| | `/study/bible` | The canon in seven divisions, a chapter grid in place, three paced plans | Changed (U79) |
| | `/study/bible/:book` | Book page: its band, About this book (both dating schemes, authorship both ways), its acts | Changed (U79) |
| | `/study/bible/:book/:chapter` | The desk: the chapter, and the verse as a state (`?v=14&panel=church&depth=study`) | Changed (U76 to U78) |
| | `/study/doctrine` | The doctrine room: the creed and its dates (default), by question, by the map | New, static (U90) |
| | `/study/doctrine/q/:n` | One catechism question, adult register first | New, param (U90) |
| | `/study/bible/doctrines/:id`, `/theology/doctrine/:slug` | The 62 studies and 31 debate pages, re-headed and cross-linked | Kept |
| | `/resources/creeds/:slug` | Creed with phrase notes beside their phrases and a date rail | Changed (U44) |
| | `/resources/context/:slug` | Context guide in the long-read template | Changed (U45) |
| | `/theology/history` | The Line, the Parts, the views | Changed (U31, U75) |
| | `/theology/history/part/:n` | A Part, opened like an issue | New, param (U31) |
| | `/theology/history/session/:slug` | A session (master plan 7.2) | New, param (U32) |
| | `/theology/history/twelve` | Twelve weeks, twelve turns | New, static (U91) |
| | `/theology/history/people/:id`, `/councils/:id`, `/controversies/:id` | Pages above the 150-word threshold; sheets below it (`?p=`, `?e=`) | New (U31, U54) |
| | `/theology/history/sources/:slug` | One primary text, introduced (B 3, C 13) | Later (Phase 4) |
| | `/theology/history/timeline` | The list, `?year=` and `?view=lives` | Changed (U31) |
| | `/studyguides/:slug`, `/plans/:slug` | Courses, with `?start=&cadence=` | Changed (U81) |
| Topics | `/topics` | The Guide index (one registry, views) | Changed (U86) |
| | `/topics/:slug` | Topic page with the long arc and Asked before | Changed (U25, U48) |
| | `/answers`, `/answers/:slug` | The index by family; one page per answer | Changed and new, param (U87) |
| | `/skeptic-track` | One screen that asks for nothing | Changed (U82) |
| | `/tools`, `/tools/test-the-case` and every tool | About fifteen instruments by the reader's job; every tool route kept | Changed (U38, U82) |
| | `/steps/:slug` | Step by step (three) | New, param (U93) |
| | `/help`, `/help/:slug` | Find Help and the 40 care pages | Changed (U83, U88) |
| | `/resources` | Everything, A to Z, generated | Changed (U86) |
| Family | `/family`, `/family/tonight`, `/family/devotions/:id`, `/family/catechism` | As built (U17, U21), with the changes in 5.22 | Changed |
| | `/week/:sunday`, `/week/:sunday/print` | The week, and For Sunday on one page; `noindex, follow` | New, param (U20 changed) |
| | `/family/this-week` | Resolves to this week's print view, table first | Changed (U20) |
| Essays | `/writing`, `/writing/:slug` | The shelf; the one long-read template | Changed (U23, U24) |
| About | `/about`, `/books`, `/speaking`, `/contact`, `/subscribe` | The man first; one fact sheet | Changed (U92) |
| | `/how-we-write`, `/whats-new` (`?only=corrections`) | The record (C 1, B 5) | New, static (U92) |
| Utility | `/search`, `/theology/search` | One index; `/theology/search` a scoped view | Changed (U85) |
| | `/my-library` | On this device: marks, notes, answers, export | Changed (U96) |

### 2.3 Page types

Each is one kind and says so in its kicker (C 21), so a reader always knows whether he is reading Scripture, a study note, an essay, a primary source, a tool or a care page. Templates are in section 5.

Home · door landing · the Line (history front door) · Part · session · hinge sheet · person, council and controversy (page or sheet) · reading (one primary source) · canon index · book page · chapter (the desk) · verse (panel state) · doctrine landing · doctrine question · doctrine study and debate page · creed · context guide · Topics index (the Guide) · topic · Honest Answer · the skeptic's door · tool (Test the Case as the model) · course, plan and Twelve weeks · step by step · Tonight, devotion and table mode · the week and For Sunday · care page and Find Help · essay · the shelf · search results · My Library · About and the record pages.

### 2.4 How each reader enters, and where he goes next

| Reader | Usually arrives | His first screen gives him | Then | Never |
|---|---|---|---|---|
| **The skeptic** (wins ties) | Search onto an essay, an Honest Answer or a topic page ("what does post-Christian mean," "did the resurrection happen"); a friend's link to Home | On Home: James's atheist sentence beside his face, then "Not sure you believe any of this? Start with the case." On a topic: the definition in the first paragraph. On an Honest Answer: the objection put at its strongest, then the answer in brief. On Test the Case: Move 1 | `/skeptic-track`'s four rows (Read Mark with a friend, Test the case, Honest answers, Hurt by church); the Line, which asks nothing of him; a session that teaches him to read a source himself; the facing page with the losing side first; *What's new and corrections* at the foot of every essay and on `/answers` | An email field, a lead magnet, a verdict picker, the second clock (the year strip, The church remembers, Tonight) on his pages |
| **The doubting Christian** | A topic row in her own words; a care page | The question named more honestly than she has heard it, with "Where Christians differ" and the order of the question named before any verdict | *Asked before*: a dated witness who sat in the same dark, in his own words; the doctrine map, which shows what is confession and what is argument; a course at Study depth; Find Help one tap away | Being resolved too fast |
| **The pastor** (PCN) | A forwarded essay, a week, a session | Teach depth and the leader's sheet on any chapter; For Sunday; a course he can date for his church | Twelve weeks, twelve turns with leader notes and handouts; room mode; Host a table; the reuse line when James chooses a licence | Anything that tracks his people |
| **The seeker** | A plain sentence in search ("my husband left," "I lost my job"); a care page | The care page as today, the best first screen on the site: his words as its title, In brief, *This week* made actionable in place, care cards graded by urgency | The depth behind it: every reference opens the desk; the topic's long arc; a plan he can start on a Sunday with a calendar entry | A sermon in place of help; a doctrine-first answer to a sentence about his life |
| **The parent** | Home at nine at night; a church's link to the week | Tonight in two taps from Home's first screen; the Tonight page opening on the verse, *Start at the table* and *Read and pray* | Table mode; the four doors in a day; the catechism question at three depths; For Sunday on the refrigerator; the grown-ups line where a devotion has one ("If money is a worry in your house, start here.") | Being told what she missed |

### 2.5 Search

One index and one box everywhere (critique #3): the header field, Home's Find, the Study Bible's Go to, `/search` and `/theology/search` are one component over one index. The local boxes on `/writing`, `/tools` and `/help` become scoped views that keep the query when widened; Find Help keeps its care-first ranking over the same index.

**The answer depends on the kind of query** (FG 2.6, resolving 1.4 row 13):

1. **Crisis words** outrank everything, every pin and every group (U15's rule).
2. **A reference** ("John 1:14," "jn 1 14," "1 cor 15") opens the desk at the verse with its panel open.
3. **A year** ("325," "AD 325," "1517," "the fourth century") opens the Line at that year (`/theology/history/timeline?year=325`): what happened, who was alive, which Part, the session that covers it. The recognizer runs after the reference parser and is fenced to three- or four-digit numbers, an explicit "AD" or "BC," or a century form, so "John 3:16" or a stray "23" never becomes a date (judge-engineer).
4. **A doctrine word** ("grace," "justification," "homoousios") opens with a definition card: the glossary's short line and the catechism answer, verbatim ("Grace is the free and undeserved favor of God ..."), then Doctrine, Passage (Ephesians 2:8-9), Word (charis), History, then the rest.
5. **A plain sentence** ("how do I talk to my kids about God," "my marriage is falling apart") shows *In Topics* first, matched on the Guide's `askedAs` phrasings (Help's `searchNeeds`, generalized), then Essays, Study, Tools.

Every result says where it lives ("Study › Church history › Part II") and carries its date where it has one ("Nicaea · 325 · Council"). On any list of dated results, *In history's order* sorts Scripture first, then the dated witnesses, then LiveWell's own writing, last and labeled (LM 2.5, A 23). Pins and synonyms live in a hand-edited `search-bestbets.json` with a validator that every pin is live; queries to pin come from Search Console, never from logged queries. Free text that matches a high-sensitivity care page is never written into a URL; the result carries the page's slug instead (Smart Answers' ADR 002). The empty field shows the reader rows from Home and "Recently visited on this device," with Clear.

**Budget.** The index is built in kind shards, loaded when the field is focused (the first-paint rule): a head shard (titles, kinds, trails, the doctrine list, the glossary's short lines, the Guide's phrasings) first, chapter summaries and the lexicon only when the query is a word. Today's 128 KB index is the ceiling to beat. All client-side; no API procedure changes, so neither runtime is touched (U15's precedent).

### 2.6 The joins

The keyword shelves that filed dating advice under church history (`lib/subjects.ts`, ia.md M9) are replaced by four committed files, each generated or hand-filed and each with a validator. Nothing is matched by regex.

1. **The history registry** (U30), with one rule added from the Long Memory: **every node that has a date carries one, with its certainty** (`exact`, `about`, `range`, `disputed`, `traditional`) and a ledger line naming its source. Because every dated thing shares one axis, any page can draw its neighbors on a short line with the same component.
2. **The citation index** (SD 2.6; U72): `scripts/build-verse-index.mjs` runs the one reference parser (U09) over every essay, devotion, plan, context guide, creed note, Honest Answer, topic page and session, and writes verse-to-page files under `client/public/bible/refs/` with a `--check` drift gate. One file, five uses: *On LiveWell* in the verse panel, *Discussed on LiveWell* at a chapter's foot, "Cited in N other places" in every verse sheet, the essay shelf *By passage*, and the candidates for *Asked before*.
3. **The doctrine joins** (SD 2.6): `client/public/doctrine/joins.json`, each catechism question to its doctrine studies, creed phrases, glossary terms and debate page.
4. **The Guide registry** (FG 2.2; U86): `client/public/guide/index.json`, generated from the 40 care pages (`askedAs`, `states`, `sensitivity`, `reviewed`), U25's topic rows, the 35 Honest Answers and the nine cases. `/topics`, `/help`, `/answers`, Home's rows and search's plain-sentence group are views of it, never copies, with a test that each reads the one file.

Together they render one *Connected* block on every kind of page, in one order: **Scripture · Doctrine · History · Essays · For the household · To use.** Empty groups do not render.

### 2.7 Folds, cuts and redirects

Each fold uses the pattern the site already uses well: one permanent hop in `vercel.json`, a `redirectTo` stub in `App.tsx`, and the folded and kept lists in `site-structure.test.ts`. Folds of anything on the never-redirected list (every tool) are James's (critique Q7, MASTER-PLAN Q12); they are carried out in U66 after his answer, each paired with the feature that absorbs it.

| Today | Becomes | Redirect | James? |
|---|---|---|---|
| Deep Bible (`/tools/deep-bible`) | Its 37 worked passages become notes on their chapters (merged text through his sample review) | `/tools/deep-bible` to `/study/bible` | Yes |
| Bible Study Guide (`/tools/bible-study`) | Its themes become book introductions | `/tools/bible-study` to `/study/bible` | Yes |
| Passage Context tool (`/theology/passage`, 230 notes in the World English Bible) | Notes on their chapters, in the one reading text | `/theology/passage` to `/study/bible` | Yes |
| The second glossary (`/tools/glossary`, 104 terms) | One glossary, `/theology/glossary` (114), opened from prose and the panel | `/tools/glossary` to `/theology/glossary` | Yes |
| The second creed hub (`/theology/creeds`) | A section of `/resources/creeds` | `/theology/creeds` to `/resources/creeds` | Yes |
| The theology quiz | Retired; Twelve weeks' look-back replaces it | `/tools/theology-quiz` to `/study/doctrine` | Yes |
| Three topical verse tools; Life Audit and Whole-Life Assessment | One front door each (Misused Verses kept) | One hop each | Yes |
| `/start` "Find Your Path," `/start-here` | The Topics index and Home's rows | One hop each to `/topics` | No |
| `/post-christian`, `/exile` (today a one-essay shelf section) | `/topics/living-after-christendom` | Re-point the existing 301s | Yes |
| `/answers` as one long page | An index and one page per answer | None: old `#anchors` resolve by a hash check on `/answers` | No |
| Two overlapping history essay series; three periodizations | One ordered reading list under the Parts; the eight broad essays marked *The short version* | None (nothing under `/theology/history` redirects) | Spine is his (Q6) |
| The timeline's seven equal accordions | The Line and its list | None | No |
| Keyword "Go deeper" cards and subject shelves | The counted *On LiveWell* row and hand-filed relations | None | No |
| The chapter's thirteen collapsed accordions | Typed, labeled layers and the margin | None | No |
| "Mark as read" alone | "I've answered these," with the private lines | None | No |
| Scripture Memory's "memorized," counter and percentage | Kept, not memorized, on the return ladder | None | No |
| The skeptic track's lead magnet and in-page signup | Removed | None | No |
| Home's second subscribe form, the books band, "Start with these" chosen by the current book | One form in the ending; the books as a line; rows by the reader's question | None | His hero (P7, D9) |
| The essay's ending sales sequence | End mark, *Test this yourself*, the record, one next read, the book as a line | None | Confirm depth over reach (critique Q9) |
| "Latest" on `/writing` | The shelf led by one dated essay | None | No |
| `GeneratedCover` and `GeneratedHero` on seven surfaces | A public-domain witness or nothing | None | Art program (P10) |
| `/nation` as an orphan (on the never-redirected list) | Linked from the post-Christian topic page as its deeper library | None | No |

---

## 3. The home page

James chose the headline, the portrait and the two paragraphs (#533). This page keeps his words and changes their order and setting. The hero is one of the two places black is spent (6.4), and it earns it here.

### 3.1 What the first screen must hold

These come from the judges' must-not-lose lists and are the test for every pixel below.

1. James's headline words, his face at a size you can read, and his atheist sentence in full-strength type, keeping "raised without a father" (James, skeptic, director).
2. The skeptic's door in his own words, directly under that sentence, before anything addresses believers (skeptic).
3. Tonight at the table, two taps from step one, high enough to survive a phone browser's toolbars, at every hour, never traded for Continue (parent).
4. The signature drawing, still and to scale, captioned in James's own published words (James, director).
5. Nothing asked, nothing counted, nothing moving. First paint waits on nothing: everything in the hero is static HTML from `scripts/prerender-heads.mjs`, which changes together with `Home.tsx` (MASTER-PLAN 2).

Positions are measured on a bare 390 x 844 viewport. On a real phone the browser's bars take part of that, so the rule is stricter: **the sentence, the skeptic's door and Tonight must sit above about 520px**, and the prototype measures them with the bars showing (section 9).

### 3.2 Phone, 390 x 844, a first visit (Tuesday, November 10, 2026, evening)

| y (px) | Element | Specification |
|---|---|---|
| 0 to 56 | **Masthead**, cream (`--nav-bg`) | "LiveWell" in Cormorant 22px over "BY JAMES BELL" in Inter 500 10px caps (a link to About). At right, three 44px targets: *Find Help* (Inter 500 15px, `--mustard-text`), search, menu. Hides on the way down, returns on the way up |
| 56 | **Black hero begins** | `--charcoal`, 16px gutters, 24px top padding |
| 80 to 227 | **The headline** | Cormorant 400, 34px, line height 1.08, -0.02em, `--charcoal-fg`, four lines broken by hand so that no line begins with a dash. With James's yes, the dashes become commas: *Learning to follow Jesus, and live well, in post‑Christian America.* (P7; a non-breaking hyphen in "post‑Christian") |
| 243 to 373 | **James, and his sentence** | At left his portrait, 64 x 80, square corners, the self-hosted photograph from U08 (a real photograph in a real room when he supplies one); it links to `/about`. Beside it, Inter 400 17/26px in full `--charcoal-fg`, verbatim from #533: *I was raised without a father and came to faith as an adult, after years as an atheist, so I know the objections from the inside.* |
| 389 to 441 | **Row: the skeptic's door** | A full-width 52px row, a `--charcoal-line` hairline above: "Not sure you believe any of this? *Start with the case.*" Inter 500 17px; "Start with the case" carries the 1px mustard underline; a chevron. Opens Test the Case at Move 1 |
| 441 to 493 | **Row: Tonight** | Same row style. The static HTML says "Tonight at the table"; the title fills after mount from the generated year map in a reserved width, never from the network: "Tonight at the table: *Keep Going*." Before the turn-over hour (2 p.m., on the device) the words read "This week at the table: *Keep Going*"; the row never moves. In Advent it reads "Advent, day 10: ..." from the daily set. Opens `/family/tonight` |
| 517 to 605 | **The Line** (Plate I, phone variant) | The full column, 358px, cream hairlines on black, to scale from AD 30 to this year (about a sixth of a pixel a year). A band at the left to 313, labeled "Without power" (about a seventh of the width). Above it, from 313, the long bracket labeled "Christendom," solid at first and dotted where its end is argued (where the dots begin, and the words, are James's: D5). Below it at the right, a short row labeled "In America," dotted at its start. At the right end one mustard tick, 16px tall, labeled "You are here" and the year. No more than five labels; nothing else. The whole drawing is one link to `/theology/history` with an accessible name ("Twenty centuries of the church, drawn to scale; open the whole story"), and its list equivalent is one tap away there |
| 613 to 721 | **The caption** | James's own sentences from #533, in the text serif's italic at 19px (Inter's true italic if the serif is declined), `--charcoal-fg`: *The early church knew. So did believers in every age who lived without power.* Beneath, Inter 14px: *See the whole story* |
| 745 to 797 | **Find** | U18's field, unchanged in behavior: 52px, 16px text so iOS does not zoom, "John 3:16, a person, a year, or your question." The parser loads on focus |
| about 821 | **The hero ends** | The cream band's first line shows at the foot, so the page reads as continuing |

**What is not on this screen:** the mission paragraph and the rest of #533 (unchanged, in "From James" at the page's end, 3.5), Subscribe (one form, in the ending), the books, a count of anything, a verse to tap, a week card.

### 3.3 Phone, a returning device (Tuesday, January 12, 2027, evening)

Everything in the hero is the same HTML, so nothing shifts. After mount, read from the device only (`myProgress.ts`, `storyPlan.ts`, the course's position):

- The Tonight row's words: "Tonight at the table: *The Weight You Put Down*."
- On the Line, if the reader has a place in Twelve weeks or a history Part, one quieter tick in ink (not mustard) at that turn, labeled on focus ("Week 4 of the twelve turns: Nicaea, 325"), so he sees how far he has walked toward *You are here*. Position, never performance: no percentage, no count of days. A component test asserts the tick reads position only.
- The first band below the hero opens with **Where you are**, at most two rows, most recent first: "Read the whole story · Day 12 · Genesis 31 to 32 · Continue" and "Last opened: John 1 · Continue." These never replace Tonight and never sit in the hero.

### 3.4 Desktop, 1440 x 900

1. **Header, 0 to 72, cream.** At left the wordmark, "by James Bell" and, from 1100px, the descriptor (P8). The doors, Inter 500 15px, the active one with a 2px ink underline. At right *Find Help* (`--mustard-text`, same size and weight as the doors), a 240px search field ("Search, or press /"), *Subscribe* as an ink outline button.
2. **Black hero, 72 to about 740,** on the 12-column grid at `--w-default` (1180px).
   - **Columns 1 to 8:** the headline in Cormorant 400 at 80px, line height 1.04, three lines (y about 120 to 370); James's sentence in Inter 19/30px, full `--charcoal-fg`, two lines (about 394 to 454); then the two rows as one line of two text links (about 478): "Not sure you believe any of this? *Start with the case*" and "Tonight at the table: *Keep Going*."
   - **Columns 10 to 12:** the portrait at about 240 x 300 (y 120 to 420), his name and *About James* beneath.
   - **Columns 1 to 12, y about 540 to 680: the Line, in its full grammar** (4.1): the Parts as alternating bands labeled in Inter caps ("I · Without power," "II · Given power," and on to "VIII · After Christendom"); up to twelve hinge ticks with their years, at least two of them reckonings; the Christendom bracket above; the "In America" row below; at the far left a cap not drawn to scale, "Before: the story Scripture tells, in eleven acts," opening the Study Bible's story; at the far right, past the mustard tick, a dotted stretch to the frame edge with a caption that marks itself as confession (its words James's, D5). Pointer or focus on a mark shows its title; a click opens its sheet.
   - **Under the drawing:** the caption at left (text serif italic, 20px), and at right *As a list* and *See the whole story*.
3. **Cream strip, about 740 to 900.** At left (columns 1 to 5) Find, 52px, "A passage, a person, a year, or a question." At right (columns 6 to 12) "Start where you stand" in Inter 12px caps `--ink-muted` (no mustard here; the Line's tick is this screen's mark) and four rows in Cormorant 22px over hairlines, two by two: *I have a question I can't shake* · *I'm new to the faith* · *I teach or lead people* · *Something hard is happening at home or work.*

### 3.5 The rest of the page

Backgrounds alternate as the contract requires, and black is spent only on the hero and the ending. Phone: black (hero), cream (This week), cream-warm (Start where you stand), cream (the rooms), cream-warm (the moment), cream (essays), black (the ending). Desktop: black (hero), cream (the strip), cream-warm (This week), cream (the rooms), cream-warm (the moment), cream (essays), black (the ending). No three in a row share a background. About six phone screens.

1. **This week (cream on a phone, cream-warm on desktop).** For a returning device, *Where you are* first (3.3). Then "The week of November 8" in Cormorant 28px, and four rows, each opening where it lives, computed by the week engine (U74), never typed:
   - *At the table:* "Keep Going" · Hebrews 12:1 · about ten minutes, with *Start at the table* (ink button) and *Read and pray* (outline, about three minutes).
   - *This week's question:* "What is the church?" · Question 46 of 76 · the adult answer, with the child's answer one tap away (opens `/study/doctrine/q/46`).
   - *This week's verse:* the table's verse set in the text serif at 22/33px, "Therefore, since we are surrounded by such a great cloud of witnesses ..." with "Hebrews 12:1 · Berean Standard Bible." Tapping it opens the real verse panel (4.3) over Home, at the same URL state it has on the desk. One passage, two depths: the child hears it at the table, the adult opens it on the desk (A 13).
   - From January 1: *Read the whole story:* "Day 12 · Genesis 31 to 32 · Abraham and the Promise." In a week a daily set serves (Advent, Holy Week, Thanksgiving), the adults' row reads the chapter behind each night's table verse (the Week's Read rule).
   - A quiet line: *For Sunday: print this week* (`/week/:sunday/print`).
   The band is a reserved box. Its static HTML holds the build week's content; after mount it is replaced from the week map, so a deploy never shows a stale week for longer than the first paint (1.4 row 20).
2. **Start where you stand (cream-warm; phone only, the desktop strip holds it).** Five rows in the words `/help` already uses, opening the one best page: *I have a question I can't shake* (Topics) · *I'm not sure I believe anymore* (`/help/doubt`) · *I'm new to the faith* (Eight Weeks of Beginnings, moved out of "Help in a hard season") · *I teach or lead people* (Study with a group, `/studyguides`, whose first screen gathers a leader's tools: courses dated for his church, the leader's sheet, room mode, For Sunday) · *Something hard is happening at home or work* (`/help`).
3. **The three rooms of Study (cream).** Three drawn doors in the house line (6.6): *The Bible*, the canon in miniature (Plate II: 66 bars, width by chapter count, in seven divisions), "Notes on all 1,189 chapters, and the Greek and Hebrew under every word"; *Doctrine*, the rings (Plate VI), "What the creeds bind, where faithful churches differ, what is left open"; *Church history*, *Twelve weeks, twelve turns* as twelve numbered rows, each a year and a question, "Begin with week 1" (until James has chosen the turns, the nine Parts with their years). On desktop three columns; on a phone stacked.
4. **The question of our moment (cream-warm).** The definition first: James's own sentences from `/about` ("America is not the churched country it used to be ... Nobody owes Christianity a hearing anymore ..."), quoted verbatim with his punctuation, if he approves that use (D2). Then the long arc as a short vertical line of five dated turns, each opening its era essay: *The Constantinian Turn* (AD 312 to 430), *The Reformation and Its Wars* (to 1648), *The American Experiment* (1800 to 1950), *The Attractional Era* (1950 to 2010), *After Christendom* (2010 to now), ending at the mustard tick. Then *Asked before*: the Letter to Diognetus in its stored translation, "Every foreign land is to them as their native country, and every land of their birth as a land of strangers," with its tombstone. Then *Read the whole page* and *Test the case*.
5. **Essays (cream).** The lead essay with its date, minutes and first sentence; two more rows in the same form; *The shelf*. No images, no "Latest."
6. **The ending (black, merged with the footer).** *From James*: the portrait at real scale, and #533's two paragraphs exactly as he chose them; *My story in my own words* (`/about`); *How the writing works* (`/how-we-write`). One newsletter form, its line his to approve ("Written slowly. Sent once a week."). His books as one line. The footer as a real index of the site, folded into disclosures on a phone.

### 3.6 What the home page will not hold

A second subscribe form; the books as a band; *Today in Proverbs*; a carousel; a count of readers, days or anything a person did; a "Latest" strip; anything that moves on load; a modal; a cookie wall. The mission paragraph appears once, in the ending.

### 3.7 Why it draws attention, and stays unhurried, weighted and grown-up

It draws attention because, after the headline and a face, the first object is a picture of a fact a stranger did not know he could see: how long the church lived without power, how long the bracket of Christendom ran, how short the American stretch is, and that he stands at a tick near the end. Every mark opens real text. It is unhurried because nothing moves, nothing counts, and the only color is one mustard tick. It is weighted because black is spent on the headline and twenty centuries, and on the ending, nowhere else. It is grown-up because it addresses the skeptic before it speaks to believers, names his door in his own words, gives the tired parent her table in one tap, and puts the confession ("not yet") on the page marked as confession, neither hidden nor pressed.

---

## 4. Signature interactions

Thirteen. Each is something the reader does to look harder at a text, a time or his own question, never something the site does to keep him. Each names what the reader does, what happens, where it lives, the data it needs, the research pattern behind it, and the component or unit it builds on.

### 4.1 The Line: *You are here*

- **The reader** looks at twenty centuries on Home, on `/study`, on the history door or a Part page; taps a band, a tick or *As a list*; on a phone, scrolls the history door's list of Parts.
- **What happens.** A band opens its Part page. A tick opens its hinge sheet (4.2) in the existing `Sheet` (a bottom sheet on a phone, a side panel from 1024px), addressed in the URL (`?e=nicaea-325`) so a pastor can send it. *As a list* opens the same marks in date order inside a `<details>`. On the history door at phone width the Line sits as a sticky overview above the list, and its ink tick follows the Part in view (a position, not an animation). A returning reader with a place in a course sees one quieter ink tick at that turn.
- **Where.** Home's hero (3.2, 3.4); `/study`'s first screen; `/theology/history`; every Part (its own span); a topic's long arc (a short vertical variant); the history line in an essay's *Test this yourself* foot; search's year results.
- **The honesty it carries.** Certainty is drawn: solid where attested, dotted where a date or an end is argued, a short range bar where scholars give a range. At least two of the hinges are reckonings, drawn in the same ink as the councils (Callinicum and Thessalonica, the Crusades, the slave trade, the German Christians beside Barmen; the dates enter the ledger before the ticks are drawn). Wherever the two ends of the Line are set side by side, one sentence says where the likeness breaks (the church before Constantine had no Christian past to lose; America does). The bracket's words, where its dots begin, and the "not yet" caption are James's. `validate-politics.mjs`'s both-directions check runs on every hinge title and arc.
- **Data.** `client/src/lib/line.ts` parses the site's date strings ("around 30," "around 49 to 62," "c. AD 410-1000," "to AD 1054") into `{ from, to, certainty }` and holds the scale and the label-collision rule; `scripts/build-line.mjs` reads the registry (U30; until it lands, `church-history-timeline.json`, the era essays' `dateRange` and the councils) and writes `client/public/history/line.json` and a small generated module for Home's static drawing, with `--check` in CI. `validate-history.mjs` fails a mark without a certainty and a source line, more than twelve hinges, a date after today, a Christendom bracket whose end is not drawn uncertain, more than five labels at 358px, or a mark that opens nothing.
- **From the research.** John B. Sparks's *Histomap* and the Met's Heilbrunn Timeline (brand critic); Noll's dozen turning points and the band with one "you are here" (B 8, A 10); Priestley's dotted lines for uncertain dates (B 12, B tension 4: the line against the dot cloud); Tse's rules for drawings on a phone (C 22).
- **Builds on.** U30 (registry), U31 (views), U14's `Sheet`, the timeline's 68 events and 7 eras, 11 councils, 22 era essays; the house line of `covenant.svg`, redrawn with one mustard mark. New: U75.

### 4.2 The hinge: the world before and the world after

- **The reader** opens a hinge from the Line, a session, search by year, or a date link in an essay ("Barmen, 1934").
- **What happens.** A sheet in five short parts, always in this order: *The world before* (two or three sentences) · *What happened* (the date with its certainty, the place, the people, one verified source line) · *The world after* · *What we still carry* (one sentence that reaches the reader's present) · *The road to it* (three to five earlier events, each a tick on a short line, each opening its own sheet). Under the date, a witness label: "told by a participant," "written within a generation," "a later account, about N years after," or "tradition" (B 6). At its foot: the session that covers it, the era essay, and *Compare the witnesses* where two or more stored sources tell it (4.8). Every block carries its label of who is speaking (6.5).
- **Where.** `?e=` on the history door, the timeline, Part pages and sessions; the Line everywhere it is drawn.
- **Data.** Registry events gain `date`, `part`, `hinge`, `before`, `after`, `carry`, `road[]`, `evidence` (LM 8.1). The prose is taken from the era essays and sessions where they already say it; any new connecting line is drafted for James's sample read and shows nothing until he has read it.
- **From the research.** B 8 (Noll's hinges, *the world before*, *the world after*); B 6 (the witness label); A 9 (honest uncertainty).
- **Builds on.** `Sheet`; U32's `SourceCard`; the verifier. New: U80.

### 4.3 The verse opens the library

- **The reader** taps a verse, anywhere in it, not only its number (in Study or Teach depth), or arrives from a link such as `/study/bible/john/1?v=14&panel=church`.
- **What happens.** On a phone a sheet rises to about 40 percent of the screen with the chosen verse still visible above it, marked by a 2px mustard rule in the left margin (the screen's one mustard mark). The sheet is a real dialog: focus moves to its heading ("John 1:14") and returns to the verse on close; Escape and a 44px close; drag to full height and swipe down to dismiss, each with a button. *Previous verse* and *Next verse* sit at its foot, so the reader walks the chapter without closing anything. From 1100px the same content lives in the right margin of the desk instead of a sheet, with a *Follow my reading* lock.
- **The rows,** in a fixed order, each with a count of things in the library (never of people), empty rows hidden: *Study note* (the verse note where one exists, else the note for the outline section that holds the verse) · *The words* (each Greek or Hebrew word, a glance card first, the full entry on a second touch) · *Elsewhere in Scripture* ("the 12 strongest," since the build keeps twelve, each with its first line printed) · *The church on this verse* (a thin time rule from AD 30 to now, a dot for each witness, oldest first, ending at the mustard tick; each dot opens a source card) · *The question it raises* (4.6) · *Where it is confessed* (the creed phrase and catechism question, from the doctrine joins) · *On LiveWell* (from the citation index; *Asked in Topics* first, then essays, devotions, plans, sessions) · *Your note* (on this device). At the foot, one line for what is not yet written: "Not yet written for this verse: the church's reading."
- **Two stages for the church's witnesses** (A 4). Stage one sets the `interpretation` field of the 114 chapters as dated rules, labeled *Study note: a paraphrase*, because it is one. Stage two adds verbatim cards gated by `verify-sources.mjs`, each a normalized substring of a stored public-domain text, starting with the verses the creeds rest on. The first is already stored: Irenaeus, *Against Heresies* 3.11.3, on John 1:14 (section 9).
- **Data.** Text shards (U16, 5.8 KB for John 1), chapter notes, verse notes (202 chapters), the twelve strongest cross-references from `build-bible.mjs`, the interlinear (loaded only when *The words* opens), the citation index (U72), the doctrine joins (U90), the registry and the corpus. State in the URL: `?v=14&panel=church`.
- **From the research.** Sefaria's connections panel (counted categories, zeros hidden, the mode in the URL), Olive Tree's "follow my reading," Blue Letter Bible's Previous and Next, the ESV app's sheet (A 1, A 11, A 18); the Dartmouth Dante Project and Sefaria's chronological sort, with Catena as the warning about undated, unsourced comment (A 4); Apple Maps' detents (mobile critic).
- **Builds on.** U14's `Sheet` (extended with detents and a foot), `VerseRef`, `lib/bible-notes.ts`. New: U77.

### 4.4 Read · Study · Teach

- **The reader** chooses a depth under the chapter title: a 44px segmented control, remembered on the device (`livewell-desk-depth`) and carried in a shared link (`?depth=teach`).
- **What happens.** *Read* sets the chapter as literature: no verse numbers, no marks, the outline's headings in the text, Listen in the bottom bar; paragraph and poetry lines only once a formatted BSB source has been licensed and read by `build-bible.mjs` (nothing promises poetry lines before then). Tapping a passage offers *Study this passage*. *Study* adds quiet verse numbers with a 40px hit area, a hollow dot on verses with a note, the question at the head of the notes, and the verse panel. *Teach* adds the group questions with room to write and **Print a leader's sheet**: one page with the chapter's title and summary, the big idea (from `teach` where it exists, else the summary's first sentence), the outline, the chapter's three questions, the hard question with the first two sentences of its answer and the address for the rest, and, in the 114 chapters that carry it, the `teach` block's pitfalls and pastoral notes. The sheet says which it is.
- **Defaults.** Read when the reader comes from Tonight, a devotion, a care page or the 2027 plan; Study when he comes from search or a verse link (A 2).
- **From the research.** Quran.com's Translation Reading Mode beside its Study Mode; ESV.org's reader's mode; the ESV Reader's Bible and Study Bible as one text set for two jobs; the expertise-reversal effect (learning critic M7; A 2).
- **Builds on.** U16's shards (Read loads the 5.8 KB shard only), `ListenButton`, the print stylesheet from #534. New: U78.

### 4.5 Your answer first, and what comes back

- **The reader** sees, in the 114 chapters with typed questions, the three Observe questions above the text as *Read with these in mind* (one line on a phone, opening in place); below the text, the Interpret and Apply questions, each with a one-line field. In the other 1,075 chapters the three questions sit after the text with their fields. Every field says at the field: "Nothing you write here leaves this device." On a translation note, a one-tap guess comes before the reveal and stays beside the answer. *Show me* is always visible; nothing is gated.
- **What happens at the end.** "Mark as read" becomes "I've answered these," and the reader's lines gather in My Library under the book. One question is carried into the week, chosen by rule, never written new (the Apply question of the week's chapter where it is typed; else the first of the chapter's three questions unless the week map's overrides name another; or the question an essay marks as its carried one): it comes back once after about three days and once after about three weeks, as a quiet line on the week page and in My Library, then retires. A reader who opts in can put any page's own questions on a ladder that returns them at about five days, two weeks, five weeks and three months, answered "I had it," "Not yet" or "Skip for now," at most six in a sitting, ending with the date of the next return. In history sessions the myth check comes first and the reader's first answers return beside the session's at the end, as information with its source, never a score; every myth check corrects at least one myth believers tell (B 21).
- **Never** on Home, never a count of what is due, never a push.
- **From the research.** Bible Study Fellowship's order, your answers first (A 14); the pretesting effect (C 8); Quantum Country and Orbit, Execute Program's fixed ladder, Anki's "finished for now" (C 6); Scripture Memory repaired onto the same ladder, "kept, not memorized" (C 7).
- **Builds on.** `lib/storage.ts` with the house save-failure line, `lib/library.ts`, U32's `MythCheck` and `CheckYourself`. New: U78 (fields), U96 (the ladder, `lib/review.ts`, export and import).

### 4.6 The question at full strength

- **The reader** meets, at the head of a chapter's notes in Study depth, the chapter's hard question in Cormorant 500 at 24px (1,033 chapters). John 1: "Does John 1:1 say the Word was 'a god', and can a Jewish monotheist say the Word was God at all?" On an Honest Answer, the objection put at its strongest comes before anything else. In Test the Case, Move 1 is on the first phone screen.
- **What happens.** The chapter's question opens its answer as written, and onward doors (Test the Case where a case exists, the Honest Answer, the context guide). Wherever the data carries them (the Honest Answers through the `answers` validator, Test the Case's `grants`), the answer is set in four labeled moves: *Put at its strongest* · *What it gets right* · *The answer* · *What this does not settle*. Chapter answers gain the four labels only through James's sample review, never by an agent splitting his text. In Test the Case the reader moves on with *Next move* or *Not convinced, but go on* (never "That's fair, keep going"); every piece of evidence opens its text in a sheet (1 Corinthians 15:3 to 8); *See the whole case* opens an outline with each objection a link into the stepper; *Who says so* cites only sources James has verified. At the close of every case, a private field, "In your own words, the strongest point against this," with two opt-in doors: *Send this to James* (the contact form, prefilled) and *Bring this back in a week* (only his own words return). No verdict picker, no "Where do you stand now?", nothing recorded about his answer.
- **From the research.** B 1 (Rapoport's rules, the four moves, Test the Case's own `grants`); B 2 (the skeptic's page asks him for nothing); B 20 (one page per hard question, the whole argument on one screen, the strongest work on each side); A 5 (questions first).
- **Builds on.** `hardQuestions()` in `lib/bible-notes.ts`, `argumentCases.ts`, `data/answers.ts`, `Stepper`, `VerseRef`. New: U78 (the chapter's question), U82 (Test the Case and the skeptic's door), U87 (Honest Answers as pages).

### 4.7 Where the words came from: the creed and its fight

- **The reader** taps a phrase of the Nicene Creed ("being of one substance with the Father") on the creed page or the doctrine room.
- **What happens.** Beside the phrase (in the margin from 1100px, under the phrase on a phone) a note in a fixed order: the year the church had to say it, and the council · the question that forced it, in one sentence · the losing side's own words where a stored text holds them, and where it does not, a narrated line that says so (Arius's letter, preserved in Theodoret, is reachable and not yet stored) · the answer in its defender's words (Athanasius, *De Decretis*, stored) · the Scripture it rests on (John 1:1-18, in a sheet) · the doctrine page. A hairline down the creed's left edge carries a tick at the date each article was fought for, so the reader sees the creed was written over time, under pressure, not in one sitting. A switch sets the creed of 325 beside the creed of 381 with the added clauses marked; *Learn it* runs the shared memorization drill on the repaired ladder.
- **Where.** The creed pages (U44), the doctrine room's default tab (5.7), every doctrine page's *How the church came to say this*.
- **Data.** The stored Creed of 325 ("We believe in one God, the Father Almighty, maker of all things visible and invisible; and in one Lord Jesus Christ, the Son of God, the only-begotten of his Father, of the substance of the Father ..."), the creeds library's phrase notes, registry dates and councils, the doctrine joins.
- **From the research.** The learning critic's M4 (the creed as the spine, each article with the council or heresy that forced its words; notes kept beside their text); A 6, A 7 (one door for doctrine, in brief with its proofs); B 3 (*It drew on*, *Written alongside*, *Who answered it*); A 20 (compare 325 and 381).
- **Builds on.** `CreedDocument.tsx`, `CreedsLibrary.tsx`, `client/public/creeds/`, U07. Changed: U44.

### 4.8 Compare the witnesses, and the facing page

- **The reader** reaches a contested moment in a session or a controversy page, or opens *Compare the witnesses* on an event more than one stored source tells.
- **What happens.** *Compare the witnesses* sets two or three stored sources that tell one event in the order they were written, with the gap from the event stated above each. The first built is Thessalonica in 390, from three texts U07 already stores: Ambrose's Letter 51, written to the emperor after the massacre; Augustine's *City of God* 5.26; and Theodoret's *Church History* 5.17 (section 9 has the excerpts). Each card carries *Read it closely*: four questions (who wrote this, when, to whom and why; what was happening; what does it claim and how; who else saw it, and do they agree), a pause, then James's reading in under 80 words, labeled *James Bell*. Where he has not written it, the card says "Not yet written: James's reading." *The facing page* sets two verbatim excerpts side by side on a wide screen and stacked on a phone, the losing side first, one line on what each side feared, and James's verdict below both, labeled as his. Where a side survives only in its enemies' quotations, the page says so.
- **From the research.** B 6 (Stanford's *Reading Like a Historian*, the OER Project's close reads, the witness label); B 9 (BioLogos, Smarthistory's two voices, positions at equal length); B 21 (the church's failures named first).
- **Builds on.** U32's `SourceCard`, U54's controversies explorer, `verify-sources.mjs`. New: U80. The Thessalonica comparison is in the history slice to James on January 11 (U33).

### 4.9 Who was alive: lives as lines

- **The reader** opens the timeline's *Lives* view and sets a year with a number field and step buttons, types a year into search, or follows a teacher's link (`?view=lives&year=386`).
- **What happens.** Each person in the registry is a hairline from birth to death, solid where attested and dotted at an uncertain end, grouped in labeled rows by region. One vertical rule, the drawing's single mustard mark, moves to the year. Beneath it, *Alive in 386*: each name with his dates and his age that year (prefixed "about" where the registry's date is "around"), and a line for what had been written by then. By the registry's own dates six of its people were alive in 386: Gregory of Nazianzus (around 329 to 390), Gregory of Nyssa (around 335 to 395), Ambrose of Milan (around 339 to 397), John Chrysostom (around 347 to 407), Jerome (around 347 to 420) and Augustine of Hippo (354 to 430). In 108 the rule finds Ignatius, Polycarp and Justin Martyr, and Polycarp (around 69 to 155) was a man of about 39, not a boy, when Ignatius died. In 325 it finds only Athanasius, and says so: the registry is thin on the fourth century until the course reaches it. Under 600px the chart becomes a list with small bars. The registry's gaps show plainly: two women among 36 people today, and the rows the course has not yet reached say *Not yet written*.
- **From the research.** Priestley's *A Chart of Biography* (B 12); the plan's "alive in a given year" filter, which replaces a separate contemporaries view (MASTER-PLAN 7.2); C 25's one candidate explorable.
- **Builds on.** U31's timeline with its "alive in" filter (the list first). New: U100 (the drawing).

### 4.10 Asked before

- **The reader** reads a topic page or the foot of an essay and reaches *Asked before*; or switches a topic, doctrine or search list to *In history's order*.
- **What happens.** A short line in the margin, or under the short answer on a phone: a dot for each dated witness who faced the same question, and the mustard tick for now. The first dot opens its card: on the post-Christian page, the Letter to Diognetus in its stored translation; on the politics page, Ambrose and Theodosius after Thessalonica; on a page about what faith costs, Polycarp before the proconsul ("Eighty and six years have I served Him, and He never did me any injury: how then can I blaspheme my King and my Saviour?"); on a page about believers who gave way under pressure, Cyprian's *On the Lapsed*. A witness is paired with a present question only where the source actually speaks to it, never by a forced bridge (TW 2.4). Verbatim only where `verify-sources.mjs` passes; otherwise a narrated line that says it is narration. *In history's order* reorders a page's sources by date: Scripture, then the witnesses, then LiveWell's own writing, last and labeled (`?order=time`).
- **Data.** U25's single `witness` field grown into `witnesses[]`, each with a source id, an excerpt, its tombstone and a verified flag, checked by `validate-topics.mjs`; the citation index proposes candidates, a person files them.
- **From the research.** A 23 (Sefaria's topic pages in chronological order: "the concern is older than any party"); B 3 (Readings); B 14.
- **Builds on.** U25's topic pages and validator, U07. Changed: U25 and U48.

### 4.11 Tonight, the week on one page, and courses that begin on a Sunday

- **The parent** taps the Tonight row on Home and is on the Tonight page, whose first screen is the title, the verse set large in the text serif, *Start at the table* (about ten minutes) and *Read and pray* (about three minutes, with one sentence of permission: on a hard night, read the verse and pray, and that is enough). Table mode is unchanged: one step per screen, Next and Back at the foot in thumb reach, the screen kept awake, Listen, and "We did this tonight" as a plain button that counts nothing. Its last screen before that button carries the week into the other three times a family is together, under Deuteronomy 6:7 ("And you shall teach them diligently to your children and speak of them when you sit at home and when you walk along the road, when you lie down and when you get up."): in the morning, the catechism's child answer; on the road, one older question; at bedtime, one line of tonight's prayer. Above the devotion, collapsed and never in table mode, a minute for the parent: the devotion's `bigIdea` sentence, and in the fourteen devotions that carry one, its grown-ups line ("If money is a worry in your house, start here."), which is the quiet way from the table to the care pages that the parent's seat asked for. Position is a date ("Tonight · Tuesday, November 10"), not "69 of 72."
- **The pastor** opens *For Sunday* (`/week/:sunday/print`): the week on one Letter or A4 page, the week's word, *Read* for each day (the Read rule: in a week a daily set serves, the whole chapter behind each night's table verse; before January 1, the chapter behind the week's devotion; from January 1, the 2027 plan's day), *Learn* (the catechism question with the adult and the child's answer), *At the table* (title, passage, the three-night split), one question *For the room* (the devotion's older question), *Carry*, the current turn of a course his church is running, and a QR code to the week's address. `/family/this-week` resolves to the same page with the table first. It absorbs U20.
- **Anyone** starting a finite course (an eight-week plan, a study guide, Twelve weeks, a history Part) picks a start Sunday: the whole path appears on the first screen with a date beside every week; *Add every week to my calendar* writes one calendar file; *Print the schedule* makes one page; *Share* hands back a link that carries only the start date and cadence (`/studyguides/after-christendom?start=2027-01-10&cadence=8`). After a gap, two equal choices: *Pick up at week 3* or *Join this week at week 5*. Nothing about who joined is recorded.
- **Data.** The week engine: `scripts/build-week-map.mjs` reads the family year map (U10), the catechism walk (U12) and its season pins if James approves them, the 2027 plan (U28) and the daily sets, and writes `client/src/lib/weekMap.generated.ts`; `client/src/lib/week.ts` reads it (`weekOf`, `dayOf`, `seasonLabel`), pure functions with real-date tests (the week of November 8, 2026; Advent week 1; Holy Week 2027; the week holding day 302). Budget: no more than 5 KB gzip on Home's entry chunk, measured as U18 measured; over it, the current year's slice loads after mount. `lib/runs.ts` for courses. Coherence lines between strands appear only where the data shares a tag.
- **From the research.** B 10 (the smallest faithful version, four doors in a day); B 16 (a minute for the parent); A 13 (the shared week); A 17 and B 11 (the whole path dated for your church, dated runs carried by a link); A 12 (plans with doors and mercy).
- **Builds on.** U17 (`Tonight`, `TableMode`, `useWakeLock`, `ListenButton`), U21 (bands, three-night split, QR codes), U10, U12, U28, `lib/calendar.ts`, `TakeItWithYou`. New: U74 (engine), U81 (runs); changed: U20.

### 4.12 Care that grades urgency, and a safe exit

- **The reader in trouble** lands on `/help` or a care page. On `/help` and every crisis or high-sensitivity page, the crisis lines are three full 44px buttons on the first screen (today "911" is a 21 x 17px target), worded to match the services' own guidance (checked before shipping). "Hurt by church, or no longer sure" gets its own row near the top of `/help`.
- **What happens on a care page.** The page opens on the practical door: his words as its title, *In brief*, and a 44px jump to *This week* on the first screen. *This week*'s steps work in place (the Worry Journal opens inline, "Tell one person" becomes a prefilled text, Psalm 131 opens in a sheet, steps tick and are kept on the device). *When to get more help* becomes up to three cards with the action in the heading: *This week* ("Talk to your pastor or a counselor this week if:"), *Today*, and *Now* ("Call or text 988 now, or call 911, if:"), the *Now* card only on high-sensitivity pages and holding nothing but the crisis lines. The page raises its voice in that one card, by words and position, never by red or motion. *Exit this page* is finished to GOV.UK's tested behavior (three presses of Shift, a blank overlay, a first-time line saying what it cannot do). "Page last reviewed" and "Next review due" show under the last section, from the `reviewed` record every care file already stores. On a long care page a contents sheet in the bottom bar puts "Help now" first, reachable from every screen. No field marks, no slogans; the pages keep their own voice.
- **Gate.** James's care review of the graded cards, before any ships (the cards re-sort text he has approved; the grading is new).
- **From the research.** C 2 (NHS care cards, GOV.UK Exit this page, Chayn); C 1 (review dates); the mobile critic (the crisis buttons).
- **Builds on.** `CarePage.tsx`, `CrisisBlock`, `QuickExit`, `lib/needs.ts`. New: U83 (the buttons), U88 (cards, exit, review dates, actionable steps).

### 4.13 Trace the argument

- **The reader** opens *Trace the argument* on one of ten to twelve load-bearing passages (John 1:1-18 first; then Philippians 2:5-11, Colossians 1:15-20, Romans 3:21-26, Ephesians 2:1-10, 1 Corinthians 15:1-8).
- **What happens.** The passage is set as phrases, subordinate clauses indented. Each *Next* draws one mark (a repeated word underlined, an arc from "for" to the claim it grounds, a bracket around a purpose clause) with one sentence beneath, labeled as James's reading. The last step shows the whole marked passage and the doctrine it grounds. Keyboard operable; under reduced motion every mark appears at once.
- **Gate.** The sentences are James's writing; each passage ships after his read.
- **From the research.** Desiring God's Look at the Book; Biblearc's phrasing and arcing (A 25); C tension 2 (interaction lives in a separate instrument, never inside the argument).
- **Builds on.** `Stepper`. New: U97.

---

## 5. Templates

Every template is phone first at 390px with the 16px gutter, and every long read uses the one reading grid (6.3): the text serif for reading, Inter for the interface, Cormorant for display, a centered column of about 62 characters, notes and the verse panel in the right margin from about 1100px and under their paragraph on a phone, a contents rail on the left only where 6.3 allows it, one paper color from title to end mark. Every page head is `PageHead` on cream (kicker naming the kind, H1, one line); black page heads retire. Every page carries its breadcrumb. "First screen" means 390 x 844.

### 5.1 Door landings (Topics, Family, Essays, About)

**Structure.** One `HubPage` layout: `PageHead`; at most three top tasks in the reader's words (C 19); then one screen of distinct choices as a contents list, not cards; then "see all" lists. One link per destination. **First screen:** kicker, H1, one line, the three top tasks as 44px rows.

### 5.2 Study (`/study`)

**Structure.** `PageHead`: kicker "Study," H1 "Learn the whole Bible, and the church that carried it." (the framing line every critic kept). Then the Line in its widest form: the eleven acts of the story Scripture tells as a labeled cap at the left (not to scale, and it says so), opening the Study Bible's story, then twenty centuries to *You are here*. Then a three-way router in `/help`'s own register: *I'm not sure I believe this* (Read Mark with a friend; Eight Weeks of Reading Like an Adult) · *I'm new to the faith* (The Gospel first, Mark in sixteen days; Eight Weeks of Beginnings) · *I've read it for years* (the 2027 story; Twelve weeks at Study depth). Continue (this device). Then the three rooms as drawn doors (The Bible, Doctrine, Church history), then Creeds, The Bible in its world, Courses and plans, Study with a group. **First screen:** kicker, H1, the Line (phone variant, with the acts cap), the first router row.

### 5.3 The canon index (`/study/bible`) and a book page

**Index.** Hero: the canon (Plate II). Desktop: 66 bars in seven labeled divisions, width by chapter count, chapters read on this device filled in `--ink`. Phone: a compact list in seven divisions, each book a 44px row with a thin bar for its length and its progress. Tapping a book opens its chapter grid in place (48px cells). *Pick up where you stopped* (the last chapter opened) beside *Continue* for the plan. Then three paced plans: *The Gospel first* (Mark in sixteen days), *Read the whole story in 2027* (U28), *Every chapter*. The 66 book descriptions move to the book pages. About three phone screens instead of 15.4. **First screen:** H1, *Pick up where you stopped* when the device knows, the first two divisions.

**Book page.** The book's band as hero (Plate IV: its sections from a 66-entry list checked against every chapter's `outline`), then *About this book*: genre and how to read it, when and where (both dating schemes where scholarship disagrees, each at its strongest), authorship given both ways, its place in the eleven acts. Then the chapter grid. **First screen:** kicker "Book · Act Nine of the story," H1, the band, the first lines of *About this book*.

### 5.4 The chapter: the desk (`/study/bible/:book/:chapter`)

**Phone.** (1) A compact head: kicker "John · Act Nine of the story: Christ, the Center"; H1 "John 1" (Cormorant 40px); the 6px book band with this chapter's mustard tick; the depth control, Read · Study · Teach. (2) The chapter title and a two-line summary with *More* (today the summary runs eleven lines before verse 1). (3) In Study depth: *John 1 in eight movements* (the outline, one line, opens) and, in the 114 typed chapters, *Read with these in mind* (one line, opens). (4) **The text**, beginning on the first screen: the text serif at 20/32px in `--ink`, the outline's headings set in the text as Inter 500 small caps over a hairline, verse numbers small and `--ink-muted` (never mustard) with a 40px hit area, each verse a selectable span, a hollow dot after verses with a note. (5) After the last verse, before anything else, a full-width *John 2* button. (6) Below: the question at full strength (4.6); the chapter's questions with private fields (4.5); *The church on this chapter* as a dated rule (stage one: the `interpretation` field, labeled as a study note); then the notes as typed layers, each with its label of who is speaking: *Where we are in the story* · *What the first readers heard* · *How it is built* · *What it teaches* · *The words* · *Christ in this chapter* · *How it has been read* · *Where the manuscripts differ* · *For teaching* (Teach depth only, where present). Each opens in place. Then *Discussed on LiveWell* and *Next in the story*.

**Bottom bar** (hides while reading, returns on an upward scroll or a tap): previous chapter · "John 1" (a picker sheet: the seven divisions, then the chapter grid) · next chapter · Aa (size, Paper or Night, line width) · Listen.

**Desktop, from 1100px.** The reading grid: an optional left rail from 1280px with the eight movements as contents, marking the section in view; the text column; the right margin. Until a verse is chosen, the margin follows the reading: the section's verse notes where they exist, otherwise the chapter's layers as a contents list that opens there (987 chapters have no verse notes, and the margin says what it has rather than pretending). Arrow keys change chapter; `/` focuses search; Escape closes.

**Loading.** Read depth loads only the text shard (5.8 KB for John 1). Study loads the notes after first paint (36 KB). The interlinear (54 KB) loads only when *The words* opens. The next chapter is fetched when the reader passes the last verse. Related site content loads only when asked, never the 372 KB catalogue on every chapter. U35's budget check covers the route.

**First screen.** Header (hides on scroll), the compact head, the summary in two lines, and verse 1 by about 420px, with John 1:1 to 5 filling the screen. (Today verse 1 begins about 980px down.)

### 5.5 The verse (a state of the desk, not a page)

`/study/bible/john/1?v=14&panel=church`. A search for "John 1:14" lands on the chapter scrolled to verse 14, the verse marked, the panel open (4.3). No separate verse pages: 31,000 thin pages would be the opposite of fewer, truer things, and the prerender skips param routes anyway. **First screen:** the verse in the top third under its 2px mustard rule, the sheet at about 40 percent with "John 1:14" and its first rows.

### 5.6 The doctrine room (`/study/doctrine`)

**Structure.** H1 *What the church confesses, and when it had to say it* (wording James's), one line, and three ways in, one tab each, in the URL: **The creed and its dates** (default): the Nicene Creed set in sense-lines down the page at display size with the date rail (4.7), each article opening its doctrine page. **By question:** the 76 catechism questions in the adult register, the child's answer one tap away. **By the map:** the doctrine rings (Plate VI): the confessional floor `CLAUDE.md` names at the center, the 20 second-order and 6 third-order debate pages outward, with a plain list beneath, and a guess before the reveal ("First, second or third order? Your guess, then where the creeds land"). The 62 doctrine studies are listed under the map by locus. **First screen:** H1, the line, the three tabs, the creed's first two articles with their ticks.

### 5.7 A doctrine question (`/study/doctrine/q/:n`)

**Structure.** Kicker "Doctrine · Question 46 of 76" (and "This week's question" when it is). H1, the question: "What is the church?" A white card, *In brief*: the catechism's adult answer, verbatim ("The church is the whole company of God's people, gathered by the Spirit around Christ, called to worship God, love one another, and make him known to the world."), with a small letter on its proof that opens 1 Peter 2:9 in place; a future 60-word *In brief* with proofs on every clause is writing for James's review, and until he has read it the page carries the existing answer. *At the table*: the child's answer ("The church is God's family who follow Jesus together."). *Going further*: the existing commentary. Then the ladder, the same on every question: **In Scripture** (the doctrine study, topped by its thread across the canon from `doctrine-verses`) · **Confessed** (the creed phrase, opened at its note) · **Where Christians differ** (the debate page, its order named first, positions at equal length) · **Words** (glossary terms opening in place) · **The church remembers** (dated witnesses in history's order) · *Learn it by heart* (the shared drill). It ends in the question's own prayer, already in the data, never a takeaway box. **First screen:** kicker, H1, the *In brief* card, *At the table*.

### 5.8 A doctrine study and a debate page

`/study/bible/doctrines/:id` and `/theology/doctrine/:slug` keep their URLs (the debate pages are on the never-redirected list) and gain the same head, the thread across the canon (Plate IV's band grammar across 66 books, a mark wherever `doctrine-verses/<id>.json` places a verse), *How the church came to say this* (4.7), the four moves on contested positions, and a link to their question page. One home for a doctrine is James's call (MASTER-PLAN 11). **First screen:** kicker naming the kind and its order ("Confessed by the creeds," "Divides faithful churches," "Open"), H1, the first paragraph, the thread.

### 5.9 A creed and a context guide

**Creed** (`/resources/creeds/:slug`). The text first on a phone, in sense-lines at display size, as the summit of the page; phrase notes beside their phrases (4.7); the 325 and 381 switch; the date rail; *Learn it*; links to the council, Arius, Athanasius, the Trinity study and John 1; one back link inside the breadcrumb. **First screen:** kicker, H1, the creed's first lines (today the text begins 2,100px down).

**Context guide** (`/resources/context/:slug`). The long-read template; key texts in the margin; the figure its paragraph describes, drawn in the house line (the honor, shame and guilt triangle); one worked exercise (Luke 14:7-11 read with the lens); a guess before the reveal (U45). **First screen:** kicker, H1, dek, the first paragraph.

### 5.10 The history front door (`/theology/history`)

**Structure.** `PageHead` on cream (not a black slab): H1 *Twenty centuries, and where you are standing* (wording James's), and one line addressed to every reader: *Whether or not you believe it, this is the story that made the country you live in.* Then the Line at full width (desktop) or as a sticky overview over the list (phone). *After Christendom* pinned above the Parts as *Start where you are standing*. Then the nine Parts as rows: number, title, years, the question the Part answers, its sessions with minutes, its era essays as readings (the eight broad essays marked *The short version*), and the reader's place on the device. Then the views (Lives, Timeline as a list, Councils and controversies, People, Readings), *This week's source* when the corpus has one for the week, and *Twelve weeks, twelve turns*. **First screen:** H1, the line for every reader, the overview Line with its tick, *Start where you are standing*, Part I's row.

### 5.11 A Part (`/theology/history/part/:n`)

Opened like an issue (B 8): "Part II · 313 to 600 · The Church Given Power"; the question it answers; the Part's span drawn on its own line (its hinges, the people alive in it); its sessions ("Session 3 of 6"); *Questions people ask*; *In their own words* (verified excerpts); its region cells, with *Not yet written* where the course has nothing; one public-domain object looked at closely when the art program exists; its readings; a series rail (previous, Part 2 of 8, next). **First screen:** the kicker line, the question, the Part's line.

### 5.12 A session (`/theology/history/session/:slug`)

The master plan's ten parts (7.2), with four additions. It opens on a dated scene in Cormorant, every detail from a source, with the strip *Place · Date · Source* that opens the source card (B 7), and the question the session answers. A depth switch under the title: *In five minutes*, *The session*, *At the table* (B 13), the last using U21's age bands. Source cards carry *Read it closely* and, where the sources allow, *Compare the witnesses* (4.8); every block carries its label of who is speaking; "How it looked from the other side" is a facing page where both sides survive. A series rail at the top and the foot. **First screen:** kicker and rail, H1 (the question), the scene with its source strip, the myth check's first statement.

### 5.13 Hinge, person, council and controversy

The hinge is a sheet (4.2). A **person** is a sheet below the plan's 150-word threshold and a page above it: name; dates as a lifeline on a short stretch of the Line, solid or dotted; place and role; what we know and how (the witness label); *Alive at the same time* (4.9); *In their own words* only when five excerpts pass the verifier; *Scripture they read* (from the citation index); where they appear; the day the church remembers them, framed by Hebrews 12:1 as remembrance; sources. A **council or controversy** page: the question; each position in its own words on the facing page (4.8); what was decided; the creed text; where it returns today; its tick on the Line (U54). **First screen (person page):** name, dates with their line, the one-line who, the first excerpt.

### 5.14 A reading (`/theology/history/sources/:slug`, Phase 4)

One primary text: a tombstone (author, date, place, original language, translator, edition and its public-domain basis), James's introduction under the byline rule, the text with its section numbers, five to seven questions for one evening, *It drew on*, *Written alongside*, *Who answered it* on a short line, and *Host a table* (B 3, B 18, C 13). The first collection, *When the church had no power*, is buildable from what U07 stores (Diognetus, the Martyrdom of Polycarp, *City of God* Book 5). **First screen:** the tombstone and the first lines of the text.

### 5.15 Twelve weeks, and any course or plan

**Structure.** The whole path on the first screen (A 17): numbered sittings titled as the questions they answer, each with its length and kind of work, a quiet mark for those done on this device ("Week 3 of 12," never a percentage); *Begin on* (a Sunday picker, defaulting to next Sunday) with the dated schedule, the calendar file, the print and the share link (4.11); three depths (Reading, Studying, Teaching with a leader's sheet). **Twelve weeks, twelve turns** (`/theology/history/twelve`): each sitting of thirty to forty minutes in one order: last week's question first; the passage on the desk at Read depth; the hinge (its sheet and its era essay or session); the creed line it grounds; one essay that carries it into the present; one question to write an answer to, kept on the device; a closing prayer the church has prayed. The end of week 12 is a closing, not a certificate: a look back of about eight questions, the prayer, the reader's own lines read back in order, and the next door with its date (A 15, C 6); a printable version for a group's last meeting. The twelve turns are James's choice (the Long Memory's candidates are in LM 5.9: Pentecost, under Rome, Constantine, Nicaea, Thessalonica, Chalcedon, the rule and the desert, 1054, Wittenberg, 1648, the American experiment, Barmen to After Christendom); the course launches on the era essays that exist and gains sessions as each Part lands. **First screen:** title, length and who it is for, *Begin on*, the first four sittings.

### 5.16 The Topics index, the Guide (`/topics`)

**Structure.** U25's `PageHead` ("Hard questions, and where to start"; "Each question opens the one page on this site that answers it best."); the field, scoped to the Guide first; then the regions, each a glyph, its name as a question, its head line only where James has already published one verbatim, its first six rows (the kind in the kicker: Question, Honest answer, Case, Care, Step by step, Plan; the question in Cormorant 20px; one line in ink) and "All N in this region" opening the rest in place. Region order: *Is any of it true?* (headed by James's own "If you do not believe any of this, I am not going to pretend your reasons are stupid."), *What happened to Christian America?*, *When faith is coming apart*, *Marriage, children and home*, *Work, money, the body and the screen*, *Grief, fear and the long night*, *Growing, and helping others grow*. No crisis line on this page's first screen; Find Help is a door of its own. The foot links *Everything, A to Z*. Desktop adds a sticky contents list of the regions on the left. **First screen:** kicker, H1, dek, the field, the head of the first region.

### 5.17 A topic page (`/topics/:slug`)

U25's page kept, with an order and two additions. (1) The question as H1; the short answer's first paragraph first, so the definition leads (on the post-Christian page: "What has ended in America is Christendom ..."), every reference opening its verse. (2) **The long arc**: a short vertical line of four to six dated turns, each a tick with a year, a title and one sentence, each opening its era essay or session, ending at the mustard tick, and one sentence under the arc saying where the rhyme with the early church breaks (James's line). (3) The rest of the short answer, then *Asked before* (4.10). (4) *The strongest case against*, or on a second-order question the positions at equal length with who has held each since when. (5) Scripture, with *In history's order*. (6) At the table, Use this (the instruments; on the post-Christian page the `/nation` pages as the subject's deeper library), care, and the record (*Reviewed*, *Next review due*). A contents rail on the left from 1280px. **First screen:** the question, the first two or three lines of the short answer, the top of the long arc.

### 5.18 An Honest Answer (`/answers/:slug`)

Kicker with its family ("Jesus and the resurrection"); H1 as asked; *Put at its strongest* (one or two sentences); *The answer in brief*, so the direct answer is on the first screen; *What it gets right*; *The answer*; *What this does not settle*; *Test it step by step* (the case opened at the matching move, `?case=&move=`); *The full argument* (the essay); *Asked before* where a witness exists; *The strongest work on each side* (two to four per side, one sentence each, every one verified and ledgered); related questions; the record; *What's new and corrections*. On the six second-order answers, a positions block at equal length before the answer. **First screen:** H1, the steelman, the first lines of the answer in brief.

### 5.19 The skeptic's door (`/skeptic-track`)

One screen. H1 in his words: "Not sure you believe any of this?" One paragraph of the house's existing stance ("You can walk away unconvinced at any point and I will not chase you," Test the Case's own line). Four rows: *Read Mark with a friend* (seven sittings, when written) · *Test the case: did the resurrection happen?* · *Honest answers to hard questions* · *Hurt by church* (the care pages). No email field, no lead magnet (`PillarLeadMagnet` and `NewsletterSignup` removed), no verdict picker; the only offer on the page is the host kit addressed to his friend. Home's door opens Test the Case at Move 1; the Topics menu row and `/answers` send him here. **First screen:** all of it.

### 5.20 A tool (Test the Case as the model)

A start panel above every tool, the same on every one (C 4), collapsed to two lines on a phone: what it does in a line, how long, where your answers go ("on this device; nothing is sent"), **when this is not the place to start** with the right page, other ways to do it (print), and a Start button worded as the act. Then the instrument itself on the first screen, one step per screen on `Stepper` with a thin position line ("Move 2 of 5"); results open with *Your answers*, each with Change; the end links where the tool sits in Topics. Test the Case as in 4.6. The tools hub (`/tools`) shows about fifteen instruments grouped by the reader's job, each by a small specimen of its output in the house line, not a stock icon. **First screen (Test the Case):** H1 "Did the resurrection happen?", the promise, Move 1's first lines, *Next move* and *Not convinced, but go on*.

### 5.21 A care page and Find Help

**Care page** (`/help/:slug`) as in 4.12, practical door first. **Find Help** (`/help`): today's first screen kept as it is (crisis lines first, now as three 44px buttons; "Type it in your own words"; "What people bring most"; Exit), with "Hurt by church, or no longer sure" as a row near the top; it is the Guide opened at "I'm carrying something," care-first. **First screen (care page):** on high-sensitivity pages the three crisis buttons and Exit; H1 in the reader's words; the first sentences of *In brief*; the *This week* jump.

### 5.22 Tonight, the devotion and table mode

U17 and U21 kept, with 4.11's changes: the verse set large in the text serif first after the title; *Start at the table* and *Read and pray*; Younger · Older · Together (U21's bands); Read, Talk, Ask, Do, Remember, Pray; the parent's collapsed minute; the four doors as table mode's last screen; *Remember* linking to the question page at *At the table*; Send, Save, Print and Listen moved to the end ("Send to my phone" never on a phone); position as a date. In the weeks a registry witness falls on his day of remembrance (U49), a line for him, framed by Hebrews 12:1. *If your table looks different*, the panel MASTER-PLAN 5.3 specifies for the single parent, the split-week home and the believer married to an unbeliever, sits on `/family` and behind a quiet link on Tonight; its words are for James's read (D13). A thin act band under the verse (below it, never above) shows where tonight's passage sits in the story. `/family` leads with Tonight (not with a year strip), then *This week, on one page*, the year of devotions, the catechism, and for a device with no family position, *Starting family devotions*, a step by step (5.26). **First screen (Tonight):** kicker "Family · Tonight · Tuesday, November 10," the title "Keep Going," Hebrews 12:1 in the serif at 24px, *Start at the table*, *Read and pray*.

### 5.23 The week and For Sunday (`/week/:sunday`, `/week/:sunday/print`)

**The week.** `PageHead`: eyebrow "The week" and the season's plain name inside the great seasons; H1 the date range ("November 8 to 14"); previous and next week at 44px. The week's word (the table's verse) in the text serif; then the rows, each expanding in place to one line and its door: Read (each day), Learn, At the table, the course a reader keeps on this device, Carry, *Last week* (last week's question: "Say it, then show the answer"). *For Sunday* (print and share). `noindex, follow`; `/week` resolves after mount to this week's Sunday. **For Sunday** as in 4.11, one page at Letter and A4, set in the house type with rubrics in Inter caps `--ink-muted` and the words to say in the text serif. **First screen (the week):** eyebrow, H1 with the arrows, the week's word, the first three rows.

### 5.24 The essay (`/writing/:slug`): the one long-read template

The same template serves the era essay, the session's prose, the context guide and the creed's notes, with variants named in their kickers.

1. **Head.** Kicker (kind · section · minutes), title in Cormorant, dek in the text serif's true italic in ink (two or three lines), one byline line ("James Bell · 18 minutes · Revised October 27, 2026," the minutes computed as the essay page does, words over 225), and one quiet row: Aa (size, Paper or Night, Listen) · Save · Share. "Send to my phone" appears only on desktop. The first sentence is on the first phone screen.
2. **Body.** The text serif at 19/30px (20/32 on desktop), 62 characters, the versal (a three-line Cormorant initial in mustard, the essay's one mustard mark in the body, dropped on any screen that also holds a drawing's tick), no bold in prose, at most one pull quote, long Scripture as block Scripture with its reference beneath (ESV, named, with Crossway's notice at the foot copied verbatim). Every reference is a door to the desk, in link mode because essays quote the ESV and the desk shows the BSB. People, councils and dates in the prose are quiet links that open their sheets in place. Numbered notes sit in the right margin from about 1100px and open under their paragraph on a phone, and are listed again at the foot for print. Where the essay turns on an objection, *The strongest case against* sits at that hinge, quoted from its strongest named defender with a source. Nothing interactive between the first sentence and the last.
3. **The ending, allowed to end.** An end mark (a small square in mustard), about 96px of space, then the foot under two plain heads. *To think about*: "Say the argument in three sentences, in a form James would sign," then his own three where he has written them; *Test this yourself*: the passage on the desk, **the history** (a short line holding the dated hinges the essay rests on, each a tick that opens its sheet, ending at *You are here*), and one question to carry out of the room. *Where next*: one next read chosen by an editor; *Sources and record* (sources, first published, revised, corrections, cite, report an error); *What's new and corrections*; *Take it with you* and, once James chooses a licence, one plain line saying what a pastor may reproduce; the book as one quiet line where it is the natural sequel. The newsletter appears once, in the footer.

**First screen:** kicker, title, dek, byline, the tool row, and at least the first two lines of the essay with its versal.

### 5.25 The shelf (`/writing`)

"A short shelf, kept short on purpose" kept. One lead essay with its date and first sentence; then the sections as a contents list, every row with its date and minutes, no essay listed twice, one-essay sections folded, deks in house punctuation; the *By passage* view from the citation index. No "Latest." A pending essay's row says so in the house's short notice rather than linking to it. **First screen:** H1, the line, the lead essay.

### 5.26 Step by step (`/steps/:slug`)

A numbered list of steps, each collapsed, each opening pages the site already has, joined by "and" or "or," with *Show all steps*; ticks kept on the device; every member page shows "Part of: [title], step by step" (C 10). Three: *Starting to read the Bible* (one ordered home for what three pages teach today), *Starting family devotions* (from `/help/family-devotions`: what you need, how long, the youngest who will not sit still, the spouse who does not believe), and *When someone you love dies: the first weeks* (its legal and money steps saying plainly they are not legal or financial advice, and pointing to the professional). Never more than six. **First screen:** H1, one line, the first four steps.

### 5.27 Search results (`/search`)

Grouped by kind with counts, the order chosen by the kind of query (2.5); a definition card first for a doctrine word; each row with its trail and its date; the query highlighted; labels in `--mustard-text`; square corners; filters in reader words (Bible, Doctrine, History, Topics, Essays, Help, Tools); *See all* keeps the query. **First screen:** the field with the query, the card or the first group.

### 5.28 My Library (`/my-library`)

"On this device," said at the top. By book: marks, notes, answers, carried questions, *Ready to look at again* only when something is due (never a count). *Export* (JSON to import elsewhere, Markdown to read) and *Import* from the first note, because a cleared browser erases a year of notes. **First screen:** the line saying where this lives, Export, the first book.

### 5.29 About and the record (`/about`, `/how-we-write`, `/whats-new`)

**About** leads with the man and the atheist line, not the mission paragraph: "My story in my own words," the portrait at real scale, real photographs when James supplies them; About's hero is the one inner page head that may be black, because the man is the subject. One fact sheet, used verbatim everywhere; until James settles the numbers, no page prints a book count, a title or years in ministry. **How we write** says who reads every piece (James), how quotations are checked, how corrections are made, and, if he names one, a contact for concerns that does not go to him (B 5). **What's new** is one dated log with a corrections view (`?only=corrections`).

### 5.30 A held or pending essay

The house's short, honest notice, never a dead 404: the title, "James is revising this essay," a date, and *Read instead* pointed at the one best live page (for `the-rise-of-the-nones`, the After Christendom era essay or the post-Christian topic page).

---

## 6. The design system

The palette, the three color roles, square corners, hairlines instead of shadows, no gradients, no stock photography, and "Unhurried. Weighted. Grown-up." all stay. What follows is how they are held, and what is proposed to James where the contract itself would change (6.10).

### 6.1 Faces

Three faces with three jobs (critique #7):

| Face | Job | Sizes |
|---|---|---|
| **Cormorant Garamond** 400 and 500 (self-hosted, kept) | Display: titles, section heads, the hard question, the scene that opens a session, verdict lines, the versal, the questions on the Topics index | 22px and up, never smaller; never for labels or anything tapped |
| **A text serif**, Source Serif 4 (self-hosted under its open licence, with its true italic), proposed as P1 | Everything read at length or said aloud: Scripture, essays, notes, creeds, devotions, prayers, session prose, deks and captions (italic) | 17 to 26px |
| **Inter** 400, 500, 600, plus its true italic (self-hosted) | Interface, labels, metadata, short copy, the labels of who is speaking, plate labels | 12 to 19px |

Source Serif 4 over Literata or EB Garamond because it is sturdy at 19 to 20px on a phone and keeps Cormorant clearly the display voice; any of the three meets the need, and its licence and file sizes are checked before the PR. **If James declines P1,** long reading stays in Inter, Inter's true italic is self-hosted so no emphasis or Scripture is faked, and Scripture blocks of 21px and up may use Cormorant 500. Home loads no new face: the text serif loads on reading pages, and Home's caption falls back to Inter's italic until it is cached.

### 6.2 Type scale and rhythm

A declared scale, held as `:root` tokens beside the existing ones (P2), one naming (`--fs-*`):

| Token | Phone | Desktop | Face | Use |
|---|---|---|---|---|
| `--fs-label` | 12px | 12px | Inter 500, caps, 0.18em | Eyebrows, labels of who is speaking (small caps), row labels |
| `--fs-meta` | 13px | 14px | Inter 400, `--ink-muted` | Bylines, dates, counts of library things, plate labels (13px is their floor) |
| `--fs-ui` | 16px | 16px | Inter 500 | Buttons, rows, inputs (never under 16px, so iOS never zooms) |
| `--fs-body` | 17px | 18px | Inter 400, line height 1.7 | Interface prose and short copy (the contract's body) |
| `--fs-read` | 19px | 20px | Text serif 400, line height 1.6 | Essays, notes, devotions, sessions, prayers |
| `--fs-scripture` | 20px | 21px | Text serif 400, line height 1.6 | The desk's text and block Scripture |
| `--fs-lede` | 19px | 22px | Text serif italic | Deks, captions under drawings |
| `--fs-word` | 22px | 26px | Text serif 400, line height 1.45 | The week's verse, Tonight's verse |
| `--fs-h3` | 22px | 26px | Cormorant 500 | Subheads; the floor for Cormorant |
| `--fs-h2` | 28px | 36px | Cormorant 400 | Section titles |
| `--fs-h1` | 34 to 40px | 56 to 64px | Cormorant 400, -0.02em | Page titles |
| `--fs-display` | 34 to 40px | 80 to 112px | Cormorant 400, -0.02em | Home and Part openers only; the contract's 7rem is the ceiling, not a size every H1 reaches |

**Line heights:** display 1.04 to 1.08; headings 1.1 to 1.15; the text serif 1.6; Inter body 1.7 (the contract); interface 1.4. **Measure:** 62 characters for reading, never more than 68. **Sentence case** everywhere, titles included. **Rhythm:** the existing 8px spacing tokens (`--s-1` to `--s-9`), a 4px step only for type; sections 64px apart on a phone and 96px on desktop; inside reading pages paragraphs space by line height, not margins.

### 6.3 Grid, the reading grid and the phone shell

- **Phone:** four columns, one gutter token, `--gutter: 16px`, on every page (today 16, 24, 32 or 48px by page). **From 768px:** eight columns. **From 1100px:** twelve columns inside `--w-default` (1180px), 24px gutters.
- **The reading grid,** one page shape a reader learns once, used by the chapter, the essay, the session, the era essay, the creed, the context guide and the topic page: an optional left rail of 200px from 1280px · 48px · the text column at 640 to 680px (`--w-prose`) · 48px · a right margin of 280 to 320px.
- **One margin per side** (FG): the right margin holds only the page's own notes and the verse panel; the left rail holds only contents (a chapter's movements, a session's parts, a long care or topic page's stations). Essays get no contents rail (C 4.5: refused on essays); their "In this essay" sits in the head, closed.
- **Every apparatus has one home** (C tension 3): the kicker line, the head's tool row, the margin, the foot. An item that cannot name its home is not added; a new panel needs a line in its template's fixed order first (MASTER-PLAN 6.2).
- **The phone shell:** the first screen begins with the thing itself; on reading pages the header hides on the way down and returns on the way up; an auto-hiding bottom bar carries the page's own controls (a chapter: previous, the picker, next, Aa, Listen; a care page: Help now and the contents; an essay: Aa and Save) within thumb reach; the menu is a bottom sheet over a scrim.

### 6.4 Color, inside the contract

- **Cream is the room.** Every page background is `--bone`. `--bone-warm` alternates on Home and the hubs. Inside a long read the background never changes, from title to end mark (P5).
- **Black is weight, spent in five places only** (P4): Home's hero, the ending merged with the footer on every page, at most one verdict band on a page that has earned it, room mode on a television, and About's hero, where the man is the subject. Every other page head moves to cream through `PageHead`.
- **White** (`--card`) is for things lifted: the *In brief* card, the verse panel's sheet, inputs, the print preview of For Sunday.
- **Ink** sets body text. `--ink-muted` is for metadata only, never primary text; on black, primary text is full `--charcoal-fg`.
- **Mustard means *now* and *this*** (P3). Its marks: the *You are here* tick, one per drawing; the selected verse's 2px rule; the essay's versal and end mark; the current step's underline in a stepper; a page's first kicker and its short leading rule. Link underlines are 1px and do not count (never thicker than 2px on hover). Find Help in `--mustard-text` is the one standing exception, at the doors' size and weight. **One non-link mark per viewport:** where a drawing's tick shares a screen with a versal or a kicker rule, the tick wins and the other drops. `--mustard-text` (5.27:1 on cream) is the only mustard for text on a light surface; bright `--mustard` is text only on charcoal (7.33:1). Never a button fill, a background, a band, a card bar, a highlight color or a word in a headline. Section labels after the first kicker are `--ink-muted`.
- **No color coding.** Position, label and one tick carry meaning (A tension 5). The `--accent-*` and `--pillar-*` colors stay out of new work, and the misleading aliases (`--oxblood` and `--rust` resolve to mustard) retire as their files are touched.
- **The gate.** `validate-design.mjs` learns to fail mustard used as text on light surfaces, inline `outline: none`, and inputs under 16px, with a baseline like its hex baseline so new debt fails and old debt is paid down and locked in (U70).

### 6.5 Labels of who is speaking

Five labels in Inter 500 small caps over a hairline, no color, the same words site-wide (A 3, SD 6.6): **Scripture** (with its translation named) · **The church's witness** (dated; verbatim with its tombstone, or marked "a paraphrase") · **Study note** (typed further: *What the words say*, *What the first readers heard*, *Where the manuscripts differ*, *How it fits the whole Bible*, *What it teaches*) · **James Bell** (his signed judgments) · **Your notes** ("on this device"). The 4,311 verse notes already carry typed fields that map onto them (`grammar` and `words` to *What the words say*; `context` and `history` to *What the first readers heard*; `text` to *Where the manuscripts differ*; `ot`, `nt`, `parallels` and `refs` to *How it fits the whole Bible*; `theology` to *What it teaches*), so the labels are a mapping and a validator in `validate-bible-notes`, not a re-tagging. Every block on the verse panel, the chapter's layers, hinge sheets, facing pages, source cards and topic pages carries one; the verdict under a facing page is labeled *James Bell*. No bot ever speaks in his name.

### 6.6 Iconography, drawings and images

**The house line.** Ink hairlines of 1 to 1.6px on cream, one mustard point where the meaning is. It is redrawn from `client/public/article-art/covenant.svg`, which today carries five mustard marks; the redrawn seed carries one, or it will teach the opposite of the rule (judge-director).

**The plates: a finite, numbered series** (FG 6.5), in `client/src/components/plates/` with `.pl-` classes. A new drawing needs a place in the series, a caption whose first sentence states its point, and a pattern page that says when not to use it, before it is drawn.

| Plate | Drawing | Where |
|---|---|---|
| I | **The Line**: twenty centuries to scale, Parts as bands, hinges as ticks, the Christendom bracket, the America row, *You are here* | Home, `/study`, the history door, Parts, topic arcs, essay feet, search |
| II | **The canon**: 66 bars, width by chapter count, in seven divisions, read chapters filled | `/study/bible`, Home's rooms |
| III | **The story**: the eleven acts as a band, one tick on this chapter | The chapter head, the 2027 plan's days, the devotion under its verse |
| IV | **The book band**: a book's sections; in the same grammar, a doctrine's thread across the 66 books | Chapter heads, book pages, doctrine studies |
| V | **Lives as lines**: lifelines by region, one year rule | The timeline's Lives view, person pages |
| VI | **The doctrine rings**: what the creeds bind, what divides faithful churches, what is open | The doctrine room, Home's rooms |
| VII | **The gap ruler**: an event and its sources placed by when they were written | Test the Case, later Honest Answers (Phase 4) |

**The grammar** (LM 6.6): lines, ticks, bands and cells, nothing else. Time runs left to right on wide screens and top to bottom on a phone, linear and to scale; anything not to scale (the Bible's acts before AD 30) is a labeled cap that says so. Certainty is drawn: solid for attested, dotted for uncertain, a short range bar where scholars give a range. Position, label and one mustard tick carry meaning; color never does; bands alternate `--bone` and `--bone-warm` (on black, hairlines in `--charcoal-fg` and `--charcoal-line`). Labels are live text, never baked into an image. Each drawing is drawn twice, for 390px and for about 880px and up. Every drawing has an equal list in a `<details>` ("As a list"), every mark is a real button with an accessible name ("Council of Nicaea, 325"), and nothing is available only on hover. No zoom, pan or canvas, no chart or map library. Where first paint matters (Home's Line) the drawing is static SVG generated at build, under 8 KB.

**Glyphs.** Drawn in the house line on a 24px grid for the things readers sort by: the nine Parts, the regions of the Guide, about fifteen instruments (each a small specimen of its output), the devotion themes (one drawing hand for everything a family touches, B 25). The first seven are drawn and judged before the set grows. Lucide stays for interface controls only (search, close, chevrons, play, print).

**Images are witnesses or absent** (C tension 7; P10): one public-domain work or artifact per Part and per long essay, toned to the palette, captioned with maker, title, date, holder and licence, linked to its source, each licence checked like a citation (Codex Sinaiticus is linked, never embedded: CC BY-NC-SA). Real photographs of James and his rooms (the desk, Fenton, a PCN table) only if he supplies or approves them. The generated covers and heroes on seven surfaces retire as witnesses land, or leave nothing.

**Data graphics.** Only data the site holds and has checked: the Line, the lifelines, the region grid with its empty cells, the creed's date rail, the act and book bands, the canon's chapter counts, the gap ruler. Counts are of things in the library ("the 12 strongest," "seven witnesses on this verse"), never of people. No statistic about religion in America appears on any drawing until a named person has checked it against its primary report (MASTER-PLAN 2).

### 6.7 Components

Classes live in `client/src/index.css` with a lane prefix (`.st-` study primitives, `.pl-` plates, `.hx-` history, `.tp-` topics, `.tb-` the table, `.pg-` page heads, `.ed-` the reading template, `.cr-` care). Tokens only; no new hex or `rgba()` in components.

| Kept as built | Changed | New |
|---|---|---|
| `PageHead`, `Stepper`, `Position` (U14) | `Sheet`: detents, a foot with Previous and Next, dialog semantics on every use | `Line` and the other plates (I to VII) |
| `VerseRef` and the text shards (U16) | `MinimalNav`: hides on scroll on reading pages; bottom-sheet menu with scrim; desktop search field; masthead descriptor; Subscribe as outline | `SpeakerLabel` (6.5) |
| `TableMode`, `useWakeLock`, `ListenButton` (U17) | `Footer`: one dark ending with the real index and the one newsletter form | `VersePanel`, `DepthSwitch`, `BottomBar`, `ChapterPicker` |
| `TakeItWithYou`, `ToolActions` (#534) | `CrisisBlock`: three full 44px buttons | `HingeSheet`, `ReadClosely`, `CompareWitnesses`, `FacingPage` |
| `CitationCopy`, `EditorialIndex`, `HubGroup`, `LoadFailed`, `Markdown.tsx`, `ScriptureRef` | `QuickExit`: GOV.UK's tested behavior | `SourceCard`, `MythCheck`, `CheckYourself` (U32, as planned) |
| The global focus ring and the skip link | `TextSize`: becomes the one Aa control (size, Paper · Night · Follow my phone, Listen) | `AnswerField` (private, said at the field, the house save-failure line) |
| `lib/storage.ts`, `lib/calendar.ts`, `lib/myProgress.ts`, `lib/library.ts`, `lib/telemetry.ts`, `lib/siteSearch.ts`, `lib/scripture-ref.ts` | The essay toolbar: one row in the head, a share menu (Save, Print, Send on desktop, Cite) at the end mark | `CareCards`, `StartPanel`, `StepByStep`, `ContentsRail` |
| | One eyebrow style, three buttons (ink, outline, text), one quote device, replacing six, seven and three | `RunPicker` (`lib/runs.ts`), `WeekPrint`, `LeaderSheet` (print) |
| | | `ArticleEnd` (end mark, the foot), `RecordBlock`, `Versal` |
| | | `DefinitionCard`, `SearchGroups`, `GuideIndex` |

### 6.8 Motion

Only where motion carries meaning, on the existing `--ease` and `--dur` (240ms), and instant under `prefers-reduced-motion` through the global guard and `lib/motion.ts`: a sheet rising and following a drag; the year rule stepping to a new year (120ms); Trace the argument drawing one mark per step; a step of table mode or a session cross-fading (about 200ms); the reading header hiding and returning; a 2px pending bar under the header once a page change passes 150ms; pressed states on everything tappable. The Line is never drawn on, faded in, or animated on load. No parallax, scroll-jacking, scroll-triggered reveals, autoplay or animated counters.

### 6.9 Night, and the accessibility floor

**Night** (P6) is one low band, not black and cream alternating: the page in `--charcoal`, sheets and lifted cards in `--charcoal-soft`, reading text in cream at slightly reduced strength (a new `--night-ink` token), `--ink-muted` equivalents re-checked for AA, the mustard tick unchanged, mustard text in the dark `--mustard-text` (#E0B945), images toned down, and black sections becoming the same band set apart by a hairline and space. Drawings invert by token. It is offered in the Aa control as *Paper · Night · Follow my phone* and `theme-color` follows the theme shown. It ships only after the hero token audit (the 661 `rgba(` literals and Deep Bible's hex values) and a render test of every page head under `html.dark`, and it reaches the pages read in the dark first: Tonight and table mode, `/help` and the care pages, the chapter, then essays and the rest. The admin stays a light workspace through `.admin-scope`.

**The accessibility floor.** 44px targets everywhere (a verse gets a 40px hit area through a pseudo-element so its number stays small); every overlay a dialog with focus moved in and returned; every gesture with a button; the global focus ring restored wherever the 37 inline `outline: none` declarations removed it; inputs at 16px or more; every drawing with a list equivalent and every mark named; nothing only on hover; `lang` on Greek and Hebrew; contrast checked on cream, warm cream, white and charcoal for every label, including plate labels; the crisis lines as three full 44px buttons; axe blocking on the 25 captured routes plus Home, the history door, a chapter with the panel open, Tonight and a care page (U34 extended); the whole site usable with motion off.

### 6.10 Proposals to James that touch the brand contract and its identity

Each is a proposal, not a decision, and none goes into code before his answer. P1 to P6 and P8 and P11 change text in `CLAUDE.md`; P7, P9 and P10 change his chosen copy or add assets the contract would then govern.

- **P1. A text serif.** Add Source Serif 4, self-hosted with its true italic, to the typography table for Scripture, essays, notes, creeds, devotions, prayers, deks and captions; Cormorant for display only; Inter for the interface; the serif at line height 1.6 and a 62-character measure. *Reason:* every long text is set in the button face and every italic is faked by the browser (critique #7); a serious book sets long reading in a text serif. *If no:* Inter's true italic, self-hosted, so nothing is faked.
- **P2. A type scale held as tokens,** with Cormorant never below 22px and 7rem as the ceiling for Home and Part openers. *Reason:* headlines run from 44 to 80px with no scale today, and Cormorant at small sizes turns frail (editorial and brand critics).
- **P3. Mustard made exact.** Add to the palette rules: mustard means *now* and *this*; the marks in 6.4; one non-link mark per viewport; `--mustard-text` for any mustard text on a light surface (the eyebrow row of the typography table today says "mustard color," which at 2.09:1 on cream fails AA); mustard in a page's first kicker only; mustard-filled buttons retired. *Reason:* mustard is spent as paint today (critique #10), and the drawings need a budget they can be held to.
- **P4. Black reserved for weight.** Amend "Black: primary surface (hero, dark sections, footer)" to the five places in 6.4. *Reason:* used as every page head, the black slab no longer marks anything (brand critic), and full-width bands strobe on a phone (mobile critic).
- **P5. Reading pages keep one paper.** The rule that cream and black alternate applies to Home and the hubs, not inside an essay, a session, a chapter or a guide. *Reason:* a color change inside an argument reads as a page ending (editorial critic).
- **P6. Night.** Turn dark mode on as Night, after the audit. *Reason:* the pages that matter most are read in the dark (critique #9). *Cost:* it reverses MASTER-PLAN 8.6's parking.
- **P7. The headline without em-dashes:** "Learning to follow Jesus, and live well, in post-Christian America." *Reason:* two lines begin on a dash at 390px, and the em-dash is on his own avoid list. It is his chosen copy (#533), so it is his to change; *if no*, the lines are broken by hand so none begins with a dash.
- **P8. One tagline, used as the masthead descriptor.** The contract's "Connecting the depth of theology to the weight of everyday life." or the footer's "Theology that carries the weight of everyday life," his choice, verbatim everywhere. *Reason:* the site has three taglines (brand critic), and a stranger reads "LiveWell" and a colored "Find Help" as a wellness brand (visitor critic).
- **P9. A drawn logotype and monogram,** derived from the house line, that survive at 16px, and a series design for the three book covers. *Reason:* the wordmark is typed and the favicon is a text "L" in whatever serif the device has.
- **P10. A witness art program and real photographs** (6.6). *Reason:* there is not one map, diagram or image of the history on 25 pages (brand critic); an image that is not a witness is ornament.
- **P11. JetBrains Mono** dropped from the typography table, or self-hosted. *Reason:* the table names it and the site does not ship it; Inter's tabular figures serve Strong's numbers and ISBNs.

### 6.11 Other decisions for James (the Decision Log, the content, the gates)

In the order they block work. Each ships a default if he does not answer.

- **D1. The doors.** Keep Study, Topics, Family, Essays, About (the default), or take a History door, or "Questions" for "Topics." Shown as pictures at 390 and 1440.
- **D2. His definition and the subject's page.** His sentences from `/about` ("Nobody owes Christianity a hearing anymore ...") on Home's moment band and leading the post-Christian topic page; `/post-christian` and `/exile` re-pointed to `/topics/living-after-christendom`. *Default:* the topic page leads with its own short answer and the 301s stay as they are.
- **D3. The folds** in 2.7 marked "Yes," above all Deep Bible, the Bible Study Guide and the Passage Context tool into the chapter page, and retiring the theology quiz (critique Q7, Q12). *Default:* nothing on the never-redirected list moves.
- **D4. One reading text per surface:** the BSB on every study and household surface, the ESV named wherever an essay or session quotes it, Crossway's notice copied verbatim (critique Q2). *Default:* as MASTER-PLAN 2 states it today.
- **D5. The Line's words.** The Christendom bracket's label and where its dots begin; the start of the "In America" row; the "not yet" caption; up to twelve hinges, at least two of them reckonings; the sentence that says where the rhyme breaks. *Default:* the History door draws the Parts and the councils only; Home keeps its current hero until he has worded the bracket.
- **D6. The history spine and the twelve turns:** the course's Parts as the one periodization, the 22 era essays filed under them, the eight broad ones marked *The short version* (critique Q6); the twelve turns chosen by him.
- **D7. The course:** stand behind Twelve weeks at three depths, and move *Eight Weeks of Reading Like an Adult* and *Eight Weeks of Beginnings* from "Help in a hard season" to the Study door's router (critique Q8).
- **D8. The essay's ending:** the book as a quiet line and the newsletter once (critique Q9: depth over reach).
- **D9. Home's copy:** his two paragraphs move, unchanged, to the ending; his atheist sentence moves to the top beside his face; the rows' wording; the newsletter's line. *Default:* the hero keeps #533 as it is, with only the Find field and the Tonight row added (U18).
- **D10. One fact sheet** (critique Q10): books, years of ministry, PCN's size, one sentence used verbatim everywhere. *Default:* no page prints a count.
- **D11. Offline reading** of the Bible text, Tonight and the care pages, which means reversing the service worker's `selfDestroying` for those paths within a stated budget.
- **D12. The catechism's season pins** (the incarnation in Advent, the resurrection at Easter, the Trinity on Trinity Sunday), approved once.
- **D13. His writing the merge asks for,** each shipping first on existing text: *In brief* for the 76 questions, the four labeled moves on chapter answers, James's readings under *Read it closely*, the rhyme sentences, *Read Mark with a friend*, Trace the argument's sentences, the parent's two-line answers to a child's hard question, and the *If your table looks different* panel.
- **D14. The care review** of the graded cards before U88 ships (and whether anyone besides him reviews the care pages).
- **D15. Later questions:** whether LiveWell offers a morning and evening prayer at all, and behind which door; seasons or numbered issues; letters answered in public; the reuse licence; a statement of who holds the writer to account, with a contact that does not go to him (B 5).

---

## 7. How it draws attention, and stays unhurried, weighted and grown-up

James asked for a site that draws people's attention; the brand asks for a quiet room where the light is good. The three research waves resolved the tension the same way, and this vision adopts their sentence as its rule: **attention is earned by what the page shows the reader (about the text, about the past, about himself, about the day) at the moment he reaches for it, and never bought by motion, counters, rewards or novelty** (A 3, B 3, C 3).

### 7.1 What draws attention, honestly

Every one of these is a true object, and every one opens real text.

- Twenty centuries drawn to scale, the bracket of Christendom, and one tick that says *You are here* (4.1).
- A verse that opens: "pitched his tent" under John 1:14, Irenaeus around 180 quoting it against teachers who denied the Word took flesh, in his own words from a stored text, with the date and the translation named (4.3, section 9).
- The chapter's hardest question, set in Cormorant at the head of its notes, at full strength, in 1,033 chapters (4.6).
- The creed with a hairline down its edge, ticked at the year each article was fought for (4.7).
- Three witnesses to Thessalonica in the order they were written, with the gap from the event stated, so the reader can see the story grow (4.8).
- The two Gregorys, Ambrose, Jerome, Chrysostom and Augustine alive in the same year, 386, on one rule (4.9).
- A letter from the second century saying of Christians that every foreign land is to them as their native country, beside the question an American asks this year (4.10).
- The guess the reader made, sitting beside the answer (4.5).
- A care page that tells a frightened reader in one heading what to do now (4.12).
- Tonight's verse, set large enough to read aloud at a table (4.11).
- A week on one printed page in a church lobby, with a QR code to its address (4.11).
- A dated list of what the site got wrong (5.29).

### 7.2 The rules

Each rule names how it is checked, so it survives many hands.

1. **One signature drawing, still and to scale.** The Line is never drawn on, faded in or animated on load, never zoomed, never panned. *Check:* the pattern page for `Line`; a render test that the static SVG has no animation.
2. **Every mark opens real text, and every date is a claim with a source.** No mark that opens nothing; certainty drawn; a ledger line for every tick. *Check:* `validate-history.mjs` (U30, U75).
3. **Every example is computed from data.** Weeks, days, ages, plan days and counts in captions, tests, prototypes and design documents. *Check:* real-date tests in `week.test.ts` and `line.test.ts`; section 9's data list.
4. **Ask before telling.** The guess before a reveal, the myth check before a session, the reader's answer before the notes (4.5). The reply to anything a reader does is information with its source, never praise.
5. **Interaction lives in three places only:** before a reveal, after the argument, and in a separate instrument. Nothing interactive between an essay's first sentence and its last (C tension 2). *Check:* the long-read template has no slot for it.
6. **Position, never performance.** No streak, no count of days, no percentage of a person, no badge, no "in a row," no "you missed," no "don't break," no filled dots for days done. Position is said in words and dates ("Week 3 of 8 begins Sunday," "Last here: Tuesday"). *Check:* a copy check in `validate-design.mjs` that fails those phrases in `client/src` strings, and a component test that any strip or tick reads the date or a position and nothing else (U70).
7. **Counts are of library things, never people.** No "join 10,000 others," no reader counts, no trending. *Check:* review, and the copy check.
8. **Nothing moves on its own, and nothing pushes.** No autoplay, parallax, scroll-triggered reveals, animated counters, pop-ups, modals or push notifications; reminders only as calendar entries the reader writes to his own calendar. *Check:* `prefers-reduced-motion` turns every transition off and every state is still reachable.
9. **A date is the hook, not freshness.** No "Latest," no feed, no infinite scroll; new things arrive on a calendar and stay where they were put; every page ends (C tension 4). *Check:* the shelf and Home have no "latest" slot.
10. **Mustard means now and this.** One non-link mark per viewport. *Check:* `validate-design.mjs`'s mustard rules; screenshots at 390 and 1440 in every UI unit.
11. **Black only where weight is earned.** Five places (6.4). *Check:* `PageHead` is the only page head; a black head needs its reason in the PR.
12. **Images are witnesses or absent.** Credited, licensed, captioned with their point. *Check:* the art program's ledger (P10).
13. **Every apparatus has one home.** Kicker, head row, margin, foot. *Check:* a new panel needs a line in its template's fixed order first.
14. **The skeptic's pages ask nothing.** No email, sign-up, lead magnet or verdict picker on `/skeptic-track`, `/answers`, Test the Case or the Doubt essays, and the second clock (Tonight, the year, *The church remembers*) never appears on them. *Check:* a test over those routes for forms and the household components.
15. **Care raises its voice in one card,** by words and position, never by color or motion; the crisis lines are buttons, not banners.
16. **The ending is allowed to end.** End mark, silence, one next read, the book as a line, the newsletter once. *Check:* the essay foot renders in one fixed order (U24).
17. **His voice is placed and labeled.** After the text, after the church's witnesses, after the reader's own answer; never templated; never supplied by an agent; never a bot. *Check:* the labels (6.5) and the byline rule.
18. **The same instrument both ways.** The church's failures drawn in the same ink as its councils; myth checks correct believers' myths beside skeptics'; `validate-politics.mjs` on every arc, hinge, region head and topic.
19. **Baptist identity respected.** The church's witnesses are remembered through Hebrews 12:1, as remembrance and never veneration; the great seasons go by their plain names only (Advent, Christmas, Lent, Holy Week, Easter, Pentecost); no lectionary vocabulary; never an implied Southern Baptist membership.
20. **Contested questions left open.** Second-order questions get positions at equal length with the order of the question named first, and James lands only where he has said so; the essays held for him stay held.
21. **One translation per surface, named where it is quoted.** The BSB on study and household surfaces, the ESV in essays and sessions with Crossway's notice copied verbatim, references in link mode where the two meet (D4).
22. **What a reader writes stays his.** It stays on the device and says so at the field; nothing about a person enters a URL or telemetry; free text that matches a sensitive care page never becomes an address.

### 7.3 Why it stays unhurried, weighted and grown-up

**Unhurried,** because nothing on any page changes while the reader looks at it, the week holds still from Sunday to Saturday, and every row says how long it takes and what is enough (ten minutes at the table, three on a hard night). **Weighted,** because black is spent on a headline, twenty centuries and an ending, Scripture is set as Scripture, and the type is large where it should be said aloud. **Grown-up,** because the site speaks to every reader on the same terms, shows its seams on purpose (*Not yet written*, two women among 36 people, the dates it is unsure of, the things it got wrong), asks nobody for anything on the pages where trust is being decided, and leaves the last word of every piece with the reader.

---

## 8. What changes on today's site, page by page, and what stays

From `CRITIQUE.md` section 3, with the unit that carries each change (section 10). Pages read from code in the critique are marked so.

| Page | What stays | What changes | Unit, phase |
|---|---|---|---|
| Header and menu, site-wide | Find Help in every header, crisis lines first on its page; 44px controls, Escape, scroll lock, safe-area padding; one committed map in `siteNav.ts`; the five doors (U19) | Masthead descriptor (P8); "by James Bell" opens About; desktop search field; Subscribe as outline; Find Help at the doors' weight; the door lights for every page under it; a breadcrumb on every page; bottom-sheet menu with scrim; header hides while reading; Study menu rows with Doctrine and Church history named | U70, U84; menu rows in U90's PR |
| Type, color, components, site-wide | The palette and tokens; Cormorant at display size; square corners, hairlines, no gradients; `--mustard-text` | Text serif (P1) and Inter's true italic; the type scale as tokens; mustard as meaning (P3); ink for body; one eyebrow, three buttons, one quote device; aliases retired; Night after the audit | U70, U89 |
| Footer, site-wide | Real links to help, legal pages, PCN and the podcast | One dark ending; a real index (adding doctrine, the catechism, devotions, the Integrated Life guides); one newsletter form per page; folded into disclosures on a phone | U84 |
| `/` | The headline and #533's words; the atheist sentence; the quiet; U18's Find and tonight line | Section 3 in full: the sentence beside his face at the top, the skeptic's door, Tonight as a fixed row, the Line, the bands, one form, the books as a line | U84 (Phase 3) |
| `/study` | The table-of-contents layout; "Learn the whole Bible, and the church that carried it." | The Line first; the router; three rooms with drawn doors; one link per destination; doctrine as a room | U84 with U75, U90 |
| `/study/bible` | The Go to parser; the book descriptions (moved to book pages); the Story of the Bible | The canon as hero; the compact list in seven divisions with a chapter grid in place; progress per book; *Pick up where you stopped*; three paced plans | U79 |
| `/study/bible/john/1` and every chapter | Notes on every chapter; the questions; Greek and Hebrew; "This chapter at a glance"; the act placement; Before and Next in the story; Mark as read (renamed); the hard questions | Text first in the serif with headings in the text; verse 1 on the first screen; whole-verse selection; the verse panel; Read · Study · Teach; the leader's sheet; the bottom bar and picker; the question at the head; answer fields; *Discussed on LiveWell*; Listen | U73, U76, U77, U78 (Phase 2) |
| `/writing` | "A short shelf, kept short on purpose"; the numbered "Start with these"; contents rows | A lead essay with its date; date and minutes on every row; no essay twice; one-essay sections folded; distinct titles for the two fear essays; *By passage*; no "Latest" | U23, U24 |
| `/writing/strongman-theology` and every essay | The prose and its ending; the title block; 62ch, the drop cap; Listen, text size, Focus, Cite | The text serif; the first sentence on the first screen; one Aa control and a share menu at the end mark; no bold in prose; block Scripture; live references in link mode; notes beside the text; *The strongest case against* at its hinge; the ending allowed to end, with *Test this yourself* and the history line; *Sources and record*; "Send to my phone" on desktop only | U23, U24 (Phase 2) |
| `/writing/the-rise-of-the-nones` (pending) | The short, honest notice | *Read instead* pointed at the After Christendom era essay or the post-Christian page; a dated "being rewritten" line | U24 |
| `/theology/history` | Date kickers over Cormorant titles; "You did not start the faith. You were handed it."; the people, councils and heresies as data | `PageHead` on cream, addressed to every reader; the Line; the Parts; one reading list with *The short version* marked; *Start where you are standing*; the views | U31, U75 (Phase 2) |
| `/theology/history/the-apostolic-age` and every era essay | The prose and its verdict; Tacitus "no friend of the faith"; the Sources panel | The long-read template; a series rail with *Next*; linked figures and Acts; one verified *In their own words*; a line map where one helps; byline and date; three *Can you say it back?* prompts; filed under its Part | U31, U32, U51 on |
| `/resources/creeds/nicene-creed` | The phrase notes as writing; history, text, notes | The text first on a phone, in sense-lines, as the summit; notes beside phrases; the date rail; 325 and 381; *Learn it*; links to the council, Arius, Athanasius, the Trinity study and John 1 | U44 (Phase 3) |
| `/resources/context/honor-shame-vs-guilt` and every guide | Live verse sheets; named sources; "Keep reading"; the PDF; "A Lens, Not a Master Key"; the closing question | The long-read template; key texts in the margin; the triangle drawn; one worked exercise; a guess before the reveal | U45 |
| `/books` | The free openings; "Looking for a book that used to be here?" | A series design for the covers (P9); each opening sentence and contents beside its cover; the counts in one sentence (D10); "Every word mine." and the coffee line cut; *Believe* first for a reader from the skeptic's door | U92 |
| `/resources` | The contents pattern | Everything, A to Z, generated from the Guide and the search index; linked from each door's menu foot and the footer | U86 |
| `/topics` (U25, built) | The index of questions in readers' words; the three pages | The Guide registry behind it; regions; kinds; no crisis line on its first screen | U86 |
| `/tools` | The instruments themselves | About fifteen, grouped by the reader's job, each a specimen in the house line; one naming scheme; a breadcrumb back; a title that matches the page | U38, U42 |
| `/tools/test-the-case` | One move at a time; the objection as a button; "What this move does not settle"; "I will not chase you" | Move 1 on the first screen, the case picker behind *Other questions*; *Next move* and *Not convinced, but go on*; the concession in body type; a position line; *Who says so*; evidence in sheets; *See the whole case*; the private objection field; cases remembered on the device; later the gap ruler | U82 (Phase 2), U99 |
| `/tools/which-lens` | One question per screen; two honest answers; private answers | A thin position line; answers in Inter; a glyph per lens; a door from the skeptic's track | U38 |
| `/tools/deep-bible` | Its worked passages, as material | Folded into the Study Bible (D3); until then, no "Flagship," canonical order, full passages | U66 |
| `/tools/theology-quiz` (from code) | Nothing as built | Retired (D3); Twelve weeks' look-back replaces it | U66 |
| `/nation` (from code) | Its pages, on the never-redirected list | Reached from the post-Christian topic page as the subject's deeper library | U48 |
| `/theology/search` (from code) | Its reach | The one search, scoped to Study | U85 |
| `/family` | Tonight and Start on the first screen; "The household is the first church a child ever attends." | One pull-quote style; Tonight first, then *This week, on one page*; *Starting family devotions* for a new device; a line drawing per theme (family hand); duplicates removed | U20, U93 |
| `/family/tonight` | Read, Talk, Ask, Do, Remember, Pray; table mode; Listen; the catechism question; "We did this tonight"; Before and Next | The verse first and large; *Read and pray*; utilities to the end; position as a date; the parent's minute; the four doors; Night first | U101 (Phase 2); U89 for Night |
| `/family/devotions` | Before and Next on every devotion; the 72-week cycle | Jump by season and theme; sentence-case titles; the theme drawings | U21 follow-up |
| `/help` | The best first screen on the site; "Type it in your own words"; crisis lines with call and text; Exit; the intent tabs | Three 44px crisis buttons; "Hurt by church, or no longer sure" near the top; a placeholder that fits a phone; the Guide opened at care | U83 (Phase 2), U86 |
| `/help/anxiety` and every care page | The skeleton and jump chips; Scripture with the reference; "Go deeper" | Care cards by urgency; *This week* actionable in place; *Help now* on every screen; live references; Exit clear of the text; review dates; Night first | U88 (Phase 3), U89 |
| `/about` | "My story in my own words"; "I am not going to pretend your reasons are stupid"; "How the writing works"; the closing panel | The man and the atheist line first; real photographs; the one fact sheet; *How we write* and *What's new* linked | U92 |
| `/subscribe` | The four reader cards with the skeptic first; "Nothing else comes with it" | The form on the first screen; an address accepted without a label; an ink button that is never dead; no mustard word in the headline | U92 |
| `/search?q=grace` | The reference-first jump | One index, grouped by kind with counts, the order by the kind of query, the definition card, filters in reader words, the query highlighted, labels in `--mustard-text`, square corners, *See all* keeps the query | U85 (Phase 3) |

**What stays, in sum** (CRITIQUE section 4): the material (notes on every chapter, the interlinear, 62 doctrine studies, 22 era essays, the creed notes, 41 context guides, the eight-week plans, 68 group guides with their leader notes); the voice and its microcopy ("A short shelf, kept short on purpose," "I will not chase you," "Looking for a book that used to be here?"); the verdict bands, because they are rare; the pending-essay notice; the quiet; the instruments (Find Help, Tonight and its loop, Test the Case's pedagogy, Which Lens, the Study Bible's Go to and act placement); the stance (things kept on the device, said plainly, no accounts); the plumbing (self-hosted fonts, the static masthead shell, the first-paint contract, the focus ring and skip link, one committed map, one-hop redirects, `site-structure.test.ts`, `validate-links.mjs`).

---

## 9. The prototype brief

**What it is for.** James approves a direction by seeing it, not by reading this document. Twelve screens, clickable where it matters, built from the site's own data and set in its own tokens, so that what he judges is what would ship. It answers his questions with pictures: the hero (P7, D5, D9), the doors (D1), the text serif (P1), Night (P6), the Line's words (D5), the one reading text (D4).

**How it is built.** On a throwaway branch in the repo (as U02's door pictures were), never a PR: real React pages where they exist, static pages where they do not, reading the committed JSON (`client/public/bible/`, `family-*.json`, `theology/church-history-*.json`, `history/essays/`, `topics/`, `needs/`, `family-catechism.json`), the stored texts in `scripts/data/history-sources/texts/`, and the five pilots from `origin/claude/essays`. Tokens from `index.css`, plus the proposed scale and the text serif loaded only for the prototype. It is served as a Vercel preview at 390 and 1440, with two switches in a corner James can try: *Text serif · Inter only* (P1) and *Paper · Night* (P6).

**Its clock is fixed,** so every computed thing is reproducible: **Tuesday, November 10, 2026, 8 p.m., a first visit** (the week of November 8: tonight "Keep Going," Hebrews 12:1; question 46, "What is the church?") and **Tuesday, January 12, 2027, 8 p.m., a returning device** (the week of January 10: tonight "The Weight You Put Down," Ephesians 4:32; question 55, "Why do we call God Father?"; the 2027 plan on day 12, Genesis 31 to 32). Both come from the generated year map, `catechismWeekIndex` and the plan; none is typed.

**Its honesty rules.** No placeholder text anywhere. Every quotation from a stored text passes `verify-sources.mjs` before the prototype is shown. Anything that would be new writing (the bracket's words, a hinge's connecting sentence, a rhyme sentence, James's reading of a source, the care cards' grading) carries a small visible tag, *Draft for James*, or is shown as the honest empty state ("Not yet written"). The essay screen says plainly that the pilot is awaiting his sample read (PR #539) and is shown only to judge the template.

**What it must measure.** Home, Tonight and one care page at 390 x 844 with a phone browser's bars showing, recording where the sentence, the skeptic's door, Tonight and the *This week* jump actually land (judge-parent); the Line's labels at 358px; the first screen of John 1 (verse 1 by about 420px).

### The twelve screens

**1. Home, phone and desktop, with the two dates.** *Content:* the #533 headline, with a switch between commas (P7) and hand-broken dashes; the atheist sentence verbatim beside the U08 portrait at 64 x 80; the skeptic's row; the Tonight row filled after a simulated mount ("Keep Going," then on January 12 "The Weight You Put Down"); the Line drawn from `church-history-timeline.json`, the era essays' `dateRange` and the Parts in MASTER-PLAN 7.2, with "Christendom" tagged *Draft for James*; the caption from #533; the This week band (question 46's adult and child answers verbatim; Hebrews 12:1 in the BSB: "Therefore, since we are surrounded by such a great cloud of witnesses, let us throw off every encumbrance and the sin that so easily entangles, and let us run with endurance the race set out for us."); on January 12, *Where you are* with "Day 12 · Genesis 31 to 32 · Abraham and the Promise"; the moment band with the `/about` sentences (D2 switch), the five-turn arc and Diognetus; the essays band from the pilots; the ending with #533's two paragraphs. *Clickable:* the skeptic's row (screen 8), the Tonight row (screen 9), the Line and any tick (screens 4 and 5), the week's verse (the panel of screen 3 over Home), Find with "grace," "325" and "my husband left" (screen 11), the menu (the doors as built, with the Study rows of 2.1). *James judges:* the hero's order, P7, D5, D9, and whether the Line belongs on his first screen.

**2. The chapter: John 1, phone and desktop.** *Content:* the BSB text of John 1:1 to 51 from `bible/text/john/1.json`, set in the serif with the eight movements from the chapter note as headings in the text ("The Word in the beginning: life and light," "John, a witness to the Light," and on); the kicker "John · Act Nine of the story: Christ, the Center" over the act band (Plate III from `story.json`); the two-line summary; *Read with these in mind* with John 1's typed Observe questions ("List every title given to Jesus in this chapter and who gives it. Which one does Jesus give himself?"); the hard question at the head of the notes ("Does John 1:1 say the Word was 'a god', and can a Jewish monotheist say the Word was God at all?") with its answer as written; *John 2* at the last verse; the bottom bar. *Teach:* the print preview of the leader's sheet from John 1's `teach.big`, outline, questions and hard question. Beside it, **Romans 8's** sheet, which has no `teach` block and no typed questions, to show James the honest thinner sheet a pastor would get for an epistle. *Clickable:* Read · Study · Teach; verse 14 (screen 3); the movements and questions lines; the picker; *Print a leader's sheet*. *James judges:* the reading surface, P1, and the leader's sheet.

**3. The verse panel: John 1:14.** *Content, row by row, each with its label of who is speaking:* *Study note* (the verse note's `context`: "The center of the prologue. The Word of verse 1 became flesh and lived among us, and eyewitnesses saw his glory."); *The words* (the `grammar` note: sarx, "flesh"; egeneto, "became"; eskēnōsen, "pitched his tent," with the Strong's entries G4561, G1096, G4637, G2300, G1391, G3439, G4134 from `bible/lex/`); *Elsewhere in Scripture* (the twelve strongest from `bible/ch/john/1.json`, each with its first line); *The church on this verse* (a rule from AD 30 to now: Heracleon around 170, Irenaeus around 180, Origen's commentary begun before about 231, Nicaea in 325, Chrysostom's homilies around 390, from the chapter's `interpretation` field and labeled *Study note: a paraphrase*; and one verbatim card, Irenaeus, *Against Heresies* 3.11.3, from the stored Ante-Nicene Fathers text, with its tombstone and the translator as `PROVENANCE.md` identifies him, to be confirmed: "But according to the opinion of no one of the heretics was the Word of God made flesh. ... Therefore the Lord's disciple, pointing them all out as false witnesses, says, "And the Word was made flesh, and dwelt among us.""); *The question it raises*; *Where it is confessed* (catechism question 25, "Who is Jesus Christ?", whose proof text is John 1:14, and the Creed of 325's "was incarnate and was made man"); *On LiveWell* (computed by a dry run of the citation index over the site's content); *Your note* ("Nothing you write here leaves this device"). *Clickable:* each row opening in place with Back; a witness dot opening its card; Previous and Next verse; the note field; the URL changing to `?v=14&panel=church`. *James judges:* the labels (6.5) and the church on the verse.

**4. The history front door, phone and desktop.** *Content:* `PageHead` with the H1 and the line for every reader, both tagged *Draft for James*; the Line in its full grammar on desktop and as a sticky overview on the phone; Parts I to VIII with their years from MASTER-PLAN 7.2 (Parts VI to VIII with years to set, tagged); the 22 era essays filed under their Parts, the eight broad ones marked *The short version*; *Start where you are standing* opening `after-christendom-era`; up to twelve candidate hinges drawn from the councils file and the timeline, at least two of them reckonings, all tagged as candidates; the Lives view with its year stepper at 386 (six people), at 108 (Ignatius, Polycarp, Justin) and at 325 (Athanasius alone, and the line that says the registry is thin there). *Clickable:* the ticks (screen 5), Part II as an issue skeleton, *As a list*, the year stepper. *James judges:* D5, D6 and the history door's first screen.

**5. History, close up: the hinge of 325, and Thessalonica.** *Nicaea, 325, as a hinge sheet:* *What happened* sets the stored Creed of 325 ("We believe in one God, the Father Almighty, maker of all things visible and invisible; and in one Lord Jesus Christ, the Son of God, the only-begotten of his Father, of the substance of the Father, God of God, Light of Light, very God of very God, begotten ... not made, being of one substance ... with the Father.", the ellipses standing where the stored text gives the Greek in brackets), labeled as the council's text as later sources preserve it; *The world before*, *The world after*, *What we still carry* and *The road to it* are sentences taken from *The Great Councils* era essay where it already says them, otherwise tagged. *Compare the witnesses, Thessalonica, 390,* in the order written, each with its gap from the event (dates to be entered in the ledger before the screen is shown): Ambrose's Letter 51 to Theodosius ("I dare not offer the sacrifice if you intend to be present."); Augustine, *City of God* 5.26 ("... being laid hold of by the discipline of the church, did penance in such a way that the sight of his imperial loftiness prostrated made the people who were interceding for him weep more than the consciousness of offence had made them fear it when enraged"); Theodoret, *Church History* 5.17 ("It is said that seven thousand perished." and "Ambrosius met him outside the outer porch and forbade him to step over the sacred threshold."). *Read it closely* with its four questions; James's reading shown as "Not yet written." *Clickable:* the five parts, the cards in order, *Read it closely*, each tombstone, *Read more of this source*. *James judges:* whether this is the history study he asked for.

**6. The essay: *What "Post-Christian" Actually Means* (a preview of the pilot).** *Content:* the head (kicker, title, the `excerpt` as dek in the serif's italic, "James Bell · 18 minutes"), the first sentence on the first phone screen ("On April 8, 1966, Time magazine ran a cover with no picture on it, the first in its history."); the body in the serif under its own headings ("Three Ways to Be Secular" through "How to Live After Christendom"); its Scripture references in link mode, so Jeremiah 29:7 quoted in the ESV opens the desk at the BSB's wording, the panel head naming the Berean Standard Bible (the seam D4 asks about, shown honestly); one margin note from its claims ledger; the ending exactly as written ("Few of us will live to see the answer. / Most of the exiles never saw theirs, and God kept His word anyway.") and its three closing Scripture lines; then the end mark, the space, *Test this yourself* (Jeremiah 29:4-7 on the desk; the history line through *The Constantinian Turn*, *The Reformation and Its Wars*, *The American Experiment*, *After Christendom* and *You are here*; one question tagged *Draft for James*), *Sources and record* from the ledger, one next read ("When the Church Had Nothing to Lose"), the book as a line, Crossway's notice as U04 recorded it. *Clickable:* Aa, a reference, a date link opening its hinge, a note on the phone, the share menu at the end mark. *James judges:* P1, D8 and the ending.

**7. The topic: "What does it mean that America is post-Christian, and how do we live in it?"** *Content:* U25's page with the definition first (its short answer's first paragraph, or with the D2 switch his `/about` sentences); the long arc of five dated turns opening their era essays; *Asked before* with the Letter to Diognetus from the stored text ("They dwell in their own countries, but simply as sojourners. ... Every foreign land is to them as their native country, and every land of their birth as a land of strangers."), replacing the data's paraphrase; the rhyme sentence tagged *James to write*; Scripture, the table ("You Are Not Just A Keeper"), the study guide and the care row as built. *Clickable:* the arc's ticks, the witness card, *In history's order*. *James judges:* D2.

**8. The skeptic's door and Test the Case.** *Content:* `/skeptic-track` as one screen with the rows that exist (Test the case, Honest answers, Hurt by church; *Read Mark with a friend* appears only once written) and no form; Test the Case's intro, Move 1, its two objection buttons and its `grants` verbatim from `argumentCases.ts`; *Next move* and *Not convinced, but go on*; *See the whole case* as the outline of its five moves; 1 Corinthians 15:3-8 in a sheet in the BSB; at the close, the private field with *Send this to James* and *Bring this back in a week*. *Clickable:* all of it. *James judges:* whether a skeptic would keep going.

**9. Tonight and table mode, phone, in Night.** *Content:* "Keep Going": Hebrews 12:1 set large in the serif; *Start at the table* and *Read and pray*; the parent's minute with its `bigIdea` ("Perseverance is keeping on, one step at a time, all the way to the end, when quitting would be easier."); Younger and Older with their questions verbatim; the activity and the prayer; the four doors under Deuteronomy 6:7 in the BSB; question 46's child answer ("The church is God's family who follow Jesus together.") as the morning door. Beside it, the following week's "Taking Care Of What Is Not Yours" (1 Corinthians 4:2) to show a grown-ups line in place ("If money is a worry in your house, start here."). *Clickable:* Start, each step, *Read and pray*, the band switch, "We did this tonight" (it counts nothing), *Paper · Night*. *James judges:* P6 and the table.

**10. For Sunday: the week of November 8, on one page.** *Content, as a Letter print preview:* the week's word (Hebrews 12:1); *Read*: Hebrews 12 (before January 1, the chapter behind the week's devotion); *Learn*: question 46 with both answers verbatim; *At the table*: "Keep Going" and its three-night split; *For the room*: the devotion's older question ("The 'great cloud of witnesses' are the people of Hebrews 11, and some of them failed badly and kept going. Whose story gives you courage to keep running?"); *Carry*: Hebrews 12's first question ("What encumbrances, not necessarily sins, slow you down in following Jesus, and what would it take to set one of them aside?"); a QR code to `/week/2026-11-08`. A second sheet for the week of January 10, 2027, with *Read* as the plan's days 10 to 16 (Genesis 26 to 27 through Genesis 41 to 42). *Clickable:* print, share. *James judges:* whether he would hand it to PCN.

**11. Search: "grace," "325" and "my husband left."** *Content:* for "grace," the definition card (the glossary's short line, "God's unearned favor and kindness toward those who deserve the opposite.", and catechism question 35, "Grace is the free and undeserved favor of God, by which he gives sinners what they could never earn and forgives what they could never repay."), then Passage (Ephesians 2:8-9 in the BSB), Doctrine ("Salvation by Grace Through Faith"), Word (charis), History (Pelagianism, fifth century), then Essays, Help, Tools; for "325," the timeline at 325 (the First Council of Nicaea, Arianism, Athanasius alive); for "my husband left," Topics and the marriage and divorce care pages first, the URL carrying a page's slug and never the sentence. *Clickable:* the three queries and their first results. *James judges:* whether the site can find its own best material.

**12. A care page at night: "I can't stop worrying" (`/help/anxiety`, phone, Night).** *Content:* the page as it stands (a high-sensitivity page), with the three 44px crisis buttons and *Exit this page* on the first screen; *In brief* and the *This week* jump; the steps working in place (the Worry Journal opening inline, a step that ticks); *When to get more help* as three cards whose sorting of the page's existing signs is tagged *Draft for James's care review*; "Page last reviewed: September 29, 2026" from its `reviewed` record. *Clickable:* Exit (three presses of Shift, the blank overlay), the jump, a step, the journal, *Paper · Night*. *James judges:* D14.

---

## 10. The build plan

Phases follow the calendar the master plan already keeps (10.2): Advent begins Sunday, November 29; the 2027 plan sends readers to a chapter every day from January 1; Lent begins February 10; Palm Sunday is March 21 and Easter March 28. James is the scarcest resource; nothing below waits on his writing to be useful, and his reading avoids December 13 to January 6 and Holy Week. Every unit keeps the master plan's rules: one unit is one PR and James merges; done means seen (`pnpm check`, `pnpm lint`, `pnpm test`, the validators it touches, `pnpm build`, screenshots at 390 and 1440); one in, one out.

**Both runtimes are untouched.** Everything in this vision is static JSON generated at build and client code: the Line, the registry, the citation index, the Guide, search, the week engine, courses, marks and notes. No procedure is added to `server/routers.ts`, so `api/index.ts`, `server/` and `api-parity.test.ts` do not change. Notes that follow a reader to another device would be an auth and schema change, and James's call first.

### 10.1 Phase 0, October 28 to November 17: decisions and the prototype

- **U02, changed:** the questions to James gain P1 to P11 and D1 to D15, each with its default, ordered by when it blocks work, with pictures at 390 and 1440 of the door options (D1) and the hero (P7, D5, D9).
- **U69, new: the prototype** (section 9). Frame and Platform lanes, M, a throwaway branch, not a PR. To James by Friday, November 13; his read (about 45 minutes, on his phone and a laptop) by Tuesday, November 17, beside questions 7 and 8 in the master plan's reading schedule.
- **Wave 3** (U07, U11, U18, U19, U21, U25, U28, U29, integrated on the work branch) goes to James to merge as it stands; nothing in this vision asks to reopen it before he has seen the prototype.

### 10.2 Phase 1, November 4 to November 28: foundations, and nothing a reader sees redesigned before Advent

| Unit | What | Lane, size | Depends | Target | Gate |
|---|---|---|---|---|---|
| **U70** Type, tokens and the design gates | The `--fs-*` scale, `--gutter`, the reading-grid tokens, `.ed-` classes, `SpeakerLabel`; Inter's true italic self-hosted; `validate-design.mjs` fails mustard as text on light surfaces, inline `outline: none`, inputs under 16px (with a baseline) and the streak copy (7.2 rule 6); the text serif's files and tokens only if P1 is yes | Platform, M | U14 | Nov 20 | P1 for the serif; P2 and P3 written into `CLAUDE.md` only after his yes |
| **U71** Who is speaking | The mapping of verse-note fields to the five labels in `lib/bible-notes.ts`, enforced by `validate-bible-notes`; the one-line empty states | Platform, S | U09 | Nov 20 | none |
| **U72** The citation index | `scripts/build-verse-index.mjs` with `--check`; data only, consumed later | Platform, M | U09, U16 | Nov 24 | none |
| **U73** The Study Bible, refactored | `StudyBible.tsx` (843 lines) split into `pages/study-bible/` modules with no visible change, so the units after it do not collide in one file | Platform, M | none | Nov 27 | none |
| **U74** The week engine | `scripts/build-week-map.mjs`, `client/src/lib/weekMap.generated.ts`, `lib/week.ts`; `--check` and the twelve-month horizon gate; real-date tests (the weeks of November 8, 2026 and January 10, 2027, Advent week 1, Holy Week 2027, the week holding day 302); the Read rule; the 5 KB budget | Family, M | U10, U12, U28 | Nov 27 | D12 for the pins (defaults to the rolling walk) |
| **U30, changed** | The registry gains `date` with `certainty`, the event fields of 4.2, people's `born`, `died`, `region`, `remembered`, and a ledger line per mark; `lib/line.ts` parses the legacy strings, with tests | History, L | U07 | Dec 4 | none |

### 10.3 Phase 2, November 29 to January 10: the desk before the New Year, the Line on the history door

The 2027 plan makes the chapter page the most visited page the site will have from January 1. U76 to U78 **replace U37 and pull it forward**, serially in the Platform lane, never in parallel.

| Unit | What | Lane, size | Depends | Target | Gate |
|---|---|---|---|---|---|
| **U83** Crisis lines as buttons | Three full 44px buttons on `/help` and every crisis and high-sensitivity care page; wording checked against the services' own | Frame, S | none | Dec 4 | none |
| **U23, U24, changed** | The one long-read template (5.24): the text serif if approved, the head's one row, notes beside the text, block Scripture, live references in link mode, the end mark and the fixed foot with *Test this yourself* and *Sources and record*, one next read, the book as a line, "Send to my phone" on desktop only | Essays, M + M | U05, U16 | Dec 4, Dec 11 | D8 |
| **U76** The chapter: text first | The compact head, the headings in the text, verse 1 on the first screen, the bottom bar and picker, *John 2* at the last verse, prefetch, Listen | Platform, L | U73, U70 | Dec 11 | none |
| **U75** The Line | `scripts/build-line.mjs`, `line.json`, `Line.tsx` (horizontal and vertical, phone and desktop), *As a list*, the collision check at 358px, the static Home module (built, not yet placed) | History, M | U30 | Dec 18 | D5 for the bracket's words; the History door draws Parts and councils until then |
| **U31, changed** | The history front door leads with the Line on cream; the Parts; the one reading list with *The short version*; *Start where you are standing*; the Lives view as a list; sheets by query parameter | History, L | U14, U30, U75 | Dec 18 | D6 |
| **U32, changed** | The session template with the scene head, the depth switch, labels on every block, *Read it closely* | History, L | U14, U30 | Dec 18 | none |
| **U82** The skeptic's door | `/skeptic-track` as one screen with nothing asked; Test the Case with Move 1 first, *Next move* and *Not convinced, but go on*, evidence in sheets, *See the whole case*, the private objection field | Frame, M | U16 | Dec 18 | none |
| **U20, changed** | *For Sunday* and the week page (`/week/:sunday`, `/week/:sunday/print`, `noindex`), `/family/this-week` resolving to it | Family, M | U74, U21 | Dec 16, Epiphany at the latest | none |
| **U77** The verse panel | Whole-verse selection, the sheet with detents and dialog semantics, the margin that follows the reading, the counted rows, Previous and Next verse, URL state, *On LiveWell*, the church on the verse at stage one | Platform, L | U76, U71, U72 | Dec 22 | none |
| **U78** Read · Study · Teach | The depth control, the questions with private fields, the question at the head of the notes, *I've answered these*, the leader's sheet | Platform, M | U77 | Jan 8 | none |
| **U80** The hinge and the witnesses | The hinge sheet in five parts; *Compare the witnesses* on Thessalonica from the three stored texts; the facing page component | History, M | U31, U32 | Jan 8 | none |
| **U81** Courses that begin on a Sunday | `lib/runs.ts`: `?start=&cadence=`, dates on the whole path, one calendar file, a printed schedule, the two choices after a gap, on `/plans/:slug` and all 68 `/studyguides/:slug` | Frame, M | none | Jan 8 | none |
| **U101** Tonight's first screen | The verse first and large, *Read and pray*, the parent's minute (`bigIdea` and the grown-ups line), the four doors as table mode's last screen, utilities to the end, position as a date (after Christmas, so the Advent set is never disturbed) | Family, S | U17, U21 | Jan 6 | none |
| **U33, changed** | The history slice to James includes Compare the witnesses | History, L | U80 | Jan 11 | as planned |

### 10.4 Phase 3, January 11 to March 28: the front door, the joins, care before Lent, Night

| Unit | What | Lane, size | Depends | Target | Gate |
|---|---|---|---|---|---|
| **U84** Home and `/study` | Section 3 and 5.2: `Home.tsx` and `prerender-heads.mjs` together; the Line as static SVG under 8 KB; the two rows; the bands; one form; Lighthouse no worse than after U08 | Frame, M | U75, U74, U18 | Jan 22 | P7, D5, D9 |
| **U79** The canon index and book pages | The canon (Plate II), the list in seven divisions, chapter grids in place, *Pick up where you stopped*, three paced plans; books gain `division`; book pages with *About this book* | Platform, M | U78 | Jan 29 | none |
| **U88** Care, graded | Care cards (*This week*, *Today*, *Now*), *Exit this page* to GOV.UK's behavior, review dates, *This week* in place, *Help now* on every screen, "Hurt by church, or no longer sure" on `/help` | Frame, M | U83 | Feb 3, a week before Lent | D14 (his care review about January 20) |
| **U86** The Guide behind Topics | `client/public/guide/index.json` and `validate-guide.mjs`; `/topics`, `/help`, `/answers` and search's plain-sentence group as views; `/resources` as the A to Z; retires `/start` | Frame, M | U25 | Feb 5 | D1 (the label stays Topics by default) |
| **U44, changed** | Creeds: the date rail, phrase notes beside phrases, 325 and 381, the shared drill | Platform, M | U14, U30 | Feb 5 | none |
| **U85** One search | Kind shards on focus; the order by the kind of query; the definition card; the year recognizer, fenced; best bets; dates and trails on results; the sensitive-text rule; `/theology/search` as a scoped view | Platform, L | U72, U86 | Feb 12 | none |
| **U45, changed** | Context guides in the long-read template, the guess before the reveal, the drawn figure | Platform, M | U14, U16 | Feb 12 | none |
| **U87** Honest Answers, one page each | `/answers/:slug` with the four moves as fields and a validator; *The strongest work on each side*; old anchors resolved | Essays, M | U86, U36 | Feb 19 | D13 for the steelmen's new lines |
| **U25, U48, changed** | Topic pages gain the long arc, *Asked before* with verified witness cards, *In history's order*; the post-Christian page leads with the definition | Frame, L | U25, U75 | Feb 19 | D2 |
| **U92** About and the record | About led by the man; `/how-we-write`; `/whats-new` with its corrections view; the essay's record block; `/books` and `/subscribe` per section 8 | Essays, M | U24 | Feb 26 | D10, D15 |
| **U90** The doctrine room | `/study/doctrine`, the doctrine joins and their validator, the 76 question pages, the rings, the Study menu's Doctrine row | Platform, M | U40, U44 | Feb 26 | D13 for *In brief*; ships on the existing answers |
| **U91** Twelve weeks, twelve turns | `twelve.json` and its validator; the course on the era essays that exist, dated by U81, at three depths, with its closing | History, M | U80, U81 | frame Mar 5; live when he has chosen the turns | D6, D7 |
| **U89** Night | The hero token audit, the `html.dark` render test, the Aa control, `--night-ink`; live first on Tonight, table mode, the care pages and the chapter | Platform, L | U70 | audit Feb; Night Mar 12 | P6 |
| **U93** Step by steps | *Starting family devotions*, *Starting to read the Bible*, *When someone you love dies* | Frame, M | U88 | Mar 19 | D14 for the third |
| **U94** Room mode | Group guides on a television on `TableMode` and `Stepper`, cream on charcoal | Platform, M | U81 | Mar 19 | none |
| **U95** The house line and the plates | `covenant.svg` redrawn with one mark; the plates' pattern pages; the first seven glyphs drawn and judged | Lead, M (ongoing from Phase 1) | none | first seven by Feb 19 | P9 for a commissioned mark |
| **U49, U51, as planned** | The church remembers, framed by Hebrews 12:1; Part I live March 12, adding its marks and cells to the Line | Family, History | as planned | Feb 26, Mar 12 | as planned |

### 10.5 Phase 4, March 29 to autumn 2027

- **U53, U60 to U65** (Parts II to VIII), each adding its hinges, people and region cells to the Line, and its sessions to Twelve weeks.
- **U54, changed:** the councils and controversies explorer with facing pages.
- **U96 Marks, notes and what comes back** (Platform, L): the pencil bracket and note dot, My Library by book, export and import from the first note, `lib/review.ts` and the return ladder, Scripture Memory repaired onto it, *Carry this into the week*.
- **U97 Trace the argument** (Platform, M, then one passage at a time on James's read).
- **U98 The church on this verse, stage two** (verbatim cards through the verifier, the creedal verses first, as U07's survey fetches more texts).
- **U99 The gap ruler** in Test the Case, only on cases whose dates the ledger can stand behind.
- **U100 Lives as lines, drawn** (Plate V), on the Lives list U31 built.
- **U66** the folds James approved (D3); **U67** one reading-order source; **U68** the atlas, only if he asks after the slice.
- The witness art program (P10) and a commissioned mark (P9), after his answers.

### 10.6 What changes in the master plan

- **New units:** U69 to U101 above.
- **Changed:** U02, U20, U23, U24, U25, U30, U31, U32, U33, U44, U45, U48, U49 (framing), U54, and U51 and later Parts (each adds to the Line). MASTER-PLAN 8.6 ("dark later") and 10.7's dark mode become U89 and P6; 8.6's 16px gutter is confirmed; 6.2's essay foot order gains *Test this yourself* with its history line and *Sources and record* (written into 6.2 before U24 starts).
- **Replaced:** U37 (Study Bible for thumbs), by U73 and U76 to U79, pulled forward to land before January 1 and enlarged.
- **Retired, not built:** the separate contemporaries view (already folded into U31's filter); the Study Desk's `/study/this-week`, `/study/compare` and `/study/sheet` (comparison lives on the creed page; a study sheet waits until marks show use); the Week's `/today`, `/day`, `/year`, `/seasons` and header dateline (D15); the Field Guide's `/questions` rename and field marks; the Long Memory's History door (D1); the theology quiz and the `/start` quiz; "Latest" on `/writing`; the keyword shelves.
- **The lanes stay as they are,** with three rules: `StudyBible.tsx` and `pages/study-bible/` belong to the Platform lane alone after U73; `Home.tsx` is touched by U84 alone in Phase 3; `siteNav.ts` changes only in U90's PR (the Study rows) and only for rows whose pages exist.
- **Telemetry,** written into MASTER-PLAN 9.9 before it ships, aggregate and with no personal data: `hinge_open` (the hinge id), `verse_panel_open` (the row opened), `leader_sheet_print`, `week_print`, `run_started` (the course slug and cadence, never who). The measures are the contract's, not reach: returning devices by week, essays finished, sessions and devotions completed, course weeks walked, sheets printed.

### 10.7 The biggest risks, and what holds each

1. **James's time in Advent and Lent.** Fifteen decisions and a prototype land on a pastor's busiest season. *Held by:* one batch of questions with pictures and defaults (U02); the prototype read on November 17; his care review about January 20; nothing a reader sees redesigned during Advent; every surface ships on existing text.
2. **Every date is a claim.** A drawing to scale turns each year into an assertion a skeptic will check. *Held by:* no drawing before its ledger; certainty drawn; `validate-history.mjs`; every example computed (1.6's rule); the Polycarp and day-302 errors corrected here before anything goes to James.
3. **The Line as persuasion.** Its bracket and its "You are here" carry James's After Christendom argument and could become the site's slickest piece of rhetoric. *Held by:* dotted ends; his words, not ours; the rhyme sentence wherever the two ends meet; the church's failures as hinges in the same ink; the both-directions check on every arc and hinge; the Line on the history door before Home.
4. **The Line on a phone.** Two thousand years in 358px. *Held by:* five labels at most, a collision check in CI, the list one tap away, the detail in sheets.
5. **The New Year spike against Christmas.** *Held by:* the refactor before Advent, three serial units in one lane through December, and a fallback: if U77 slips, U76 alone (text first, the bar, verse 1 on the first screen) still ships before January 1.
6. **The cockpit.** A desk that shows all its depth at once. *Held by:* Read as the default from every household, plan and care door; counted rows with empty rows hidden; a new layer needs a line in the panel's fixed order first.
7. **Uneven depth.** Typed questions, `teach` and dated readings in 114 chapters; verse notes in 202. *Held by:* the honest one-line empty states; the leader's sheet saying what it is; the plans routing first through the richest chapters (the Gospels).
8. **Translation seams.** The desk shows the BSB; essays quote the ESV. *Held by:* the translation named at every quotation; essay references in link mode with the BSB named in the panel's head; D4.
9. **Streak creep.** The canon's fill, the Line's ink tick, "I've answered these," course positions. *Held by:* rule 6's copy check and the position-only component tests.
10. **First paint on Home.** *Held by:* static SVG under 8 KB, reserved boxes, no new face on Home, the week engine's 5 KB budget, Lighthouse checked against U08 as U18 was.
11. **The care pages.** The highest-stakes surface. *Held by:* buttons first (small and safe), the graded cards only after James's care review, nothing removed from a care page, no slogans.
12. **Notes lost with a cleared browser.** *Held by:* said at the field, export from the first note, the house save-failure line.
13. **Spectacle by accretion.** A successful Line invites a zoom, a map, an animated river. *Held by:* the plates as a finite series with pattern pages that say when not to use them; the atlas stays James's call.

---

## Not verified

No screen in this document was rendered: every position and size is an estimate to be measured on the prototype at 390 x 844 (with a phone browser's bars showing) and 1440 x 900. The Line's legibility at 358px, its label collisions and the weight of its static SVG are claims for the prototype to test. The licence and file sizes of Source Serif 4 were not checked. The registry's dates were read, not verified against sources; every mark enters the ledger before it is drawn. The dates given for Ambrose's Letter 51, Augustine's *City of God* Book 5 and Theodoret's *Church History* are candidates for the ledger, not settled claims; the translators of the stored texts are as `PROVENANCE.md` identifies them and are to be confirmed against a scan before a name is printed. The crisis services' own wording for the *Now* card was not read. The 40 care pages' sorting into urgency cards, the fit of the 69 Integrated Life guides to the Guide's regions, and the payload of kind-sharded search were not checked. No gate was run for this document, which changes no code.

