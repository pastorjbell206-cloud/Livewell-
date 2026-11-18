# The Week

One of four competing directions for the LiveWell redesign, 2026-10-27. Starting conviction: **formation happens in rhythm, not in visits.** LiveWell becomes a companion through the day, the week and the church's year: one shared week across Scripture, the catechism, the family table, an essay and prayer, so that a person or a household comes back because it fits their life.

**Read for this direction.** `CLAUDE.md`; `docs/work/design/CRITIQUE.md` and all seven critic reports (`learning.md`, `ia.md`, `mobile.md`, `brand.md` read in full or in their findings); `research/A-SYNTHESIS.md`, `B-SYNTHESIS.md`, `C-SYNTHESIS.md` in full and `C-devotional-habit-ux.md` sections 0, 2 and 3; `docs/work/plan/MASTER-PLAN.md` sections 0 to 7 and 10.6; `docs/work/NOTES.md`; the unit files for U18 and the merged code in the integration tree (`familyYear.ts` and its generated map, `familyTable.ts`, `familyCatechism.ts`, `storyPlan.ts`, `siteNav.ts`, `Home.tsx`, `index.css` tokens); the current screenshots (home, study, John 1, the essay, church history, family, Tonight).

**Data checked for this direction.** Every example week below was computed from the repo's own generated data on 2026-10-27 (the family year map from U10, the catechism week index from U12, the 2027 story plan from U28, the Advent and Holy Week sets), not typed by hand. Pattern numbers refer to the research syntheses: "A 13" is pattern 13 of `A-SYNTHESIS.md`, "C 16" of `C-SYNTHESIS.md`, "DH" the devotional habit cluster. Problem numbers ("critique #6") refer to section 2 of `CRITIQUE.md`.

---

## 1. The promise

**LiveWell keeps a week with you: a passage to read, a question of the faith to learn, a table to keep, an essay to think with and the prayers of the day, set to the church's year, so that a person or a household is formed by returning rather than by visiting.**

### Why this is the right direction for James's mission

**It extends the one thing on the site that already teaches.** The panel's learning critic ran a twelve-week test on the current site and concluded that a curious adult who visits weekly "is better informed. He is not formed. His children, doing the Tuesday devotion at the table, are formed" (`critique/learning.md`, verdict). The children are formed because the family table is the only part of LiveWell built on a rhythm: one devotion a week, one catechism question a week, Read, Talk, Ask, Do, Remember, Pray, and a plain "We did this tonight." Every critic named that loop as the best learning design on the site and "the template the adult study should be rebuilt on" (`CRITIQUE.md` section 4). The Week does exactly that, for every reader, and keeps the children's loop at its center.

**It is how learning actually holds.** Critique #6 calls LiveWell "a library with no teacher" and cites the two most robust findings in the science of learning: retrieval and spacing. Spacing needs time between meetings, and retrieval needs something to come back. A visit-shaped site cannot do either; a week-shaped site does both by its structure. Wave A's recurring move 10 ("cadence, not score") and wave C's move 4 ("a rhythm kept by the calendar, not the reader") are the same finding from two fields: the products that hold readers for years (Daf Yomi, the New City Catechism's 52 weeks, the Heidelberg's Lord's Days, the daily-office apps that have run since the 1990s) hold them with a shared calendar and no score.

**It is the honest answer to "how to live it."** James's headline promises help to "follow Jesus, and live well, in post-Christian America." Christendom kept a calendar for its people: the culture rested on Sunday, marked Christmas and Easter, and carried the story whether anyone opened a Bible. After Christendom nobody keeps that calendar for us, and something else keeps time instead: the feed, the news cycle, the election cycle, the phone. James's own shelf names this (`the-machine-that-forms-you`, "What Is Your Phone Doing to Your Soul?"), and James K. A. Smith, one of the structural witnesses `CLAUDE.md` names, argues across *Desiring the Kingdom* (2009) and *You Are What You Love* (2016) that people are formed less by what they are told than by the practices that train what they love, including secular ones he calls liturgies (a paraphrase, offered as one). The Week turns that diagnosis into a design: living after Christendom is not a list of tips; it is keeping a different week on purpose. That is reconstruction in the Constitution's sense, the older calendar dug up and built on, and it delivers the final impression structurally: Christianity is *older than my culture*, because every page knows what week of the church's year it is.

**It is a cadence one writer can keep.** Wave B's sharpest warning is *The Behemoth*, a slow magazine that stopped "because its cadence outran its funding," and its refusal of "a free daily layer (no; one writer cannot keep it)" (B tension 1, "Also considered"). The Week is built so that James never has to write daily or even weekly. The **daily** layer is Scripture and the calendar (the day's chapter from the 2027 plan, the day's psalms, fixed frames from Scripture). The **weekly** layer is composed from libraries already written and checked: 72 weekly devotions and three seasonal sets, the 76-question catechism, notes and Observe, Interpret and Apply questions on all 1,189 chapters, the essays. The **seasonal** layer, three or four times a year, is the only place James writes new: a season's question and, if he wants, a letter.

**It puts distribution where the pastor already lives.** A church runs on Sunday. A week that begins on Sunday, prints on one page and can be started by a whole congregation on a date the pastor chooses (A 17, B 11) is a thing a PCN pastor can hand to his people without asking them to adopt a website. Every "For Sunday" sheet carries the address of the week it came from.

**And it is the right thing for the skeptic, within a limit this document keeps.** The skeptic does not want a devotional rhythm, and The Week will not hand him one. What a rhythm gives him is what wave B found earns his trust: a shape in time with a start and an end instead of a feed (B 4), honesty dated in public (B 5, C 1), and finite reading courses that end on a date and ask him for nothing (B 2, B 15). The limit: the week is never the skeptic's first door. He enters by his question; the rhythm is what he finds if he stays. Section 2.5 and the first risk in section 8.4 hold that line.

### What this direction is not

Not a devotional app with a streak; not a daily content machine; not a feed with a calendar painted on it; not a liturgical site that asks a Baptist reader to adopt a prayer book. It counts no days, sends no push notifications, and never says "you missed." It uses the four tests of the devotional-habit cluster (DH section 2) as hard rules: the mechanic measures the practice, not the person; a missed day creates no debt; the reader chooses any interruption; nothing depends on a number being seen.

### The seam that proves the work is real

The site already owns most of the clockwork. U10 generates a five-year map of weeks (Sunday to Saturday) with the church year computed from rules; U17 resolves tonight's devotion from it; U12 walks the 76 catechism questions one a week; U28 schedules the whole Bible over 365 days of 2027. But they are four separate clocks, and they do not yet make one week. Computed from the data:

- **Advent, week 1 (November 29, 2026):** the table reads the Advent calendar ("The Long Wait Begins," Genesis 3:15, on December 1) while the catechism's rolling pick is Q49, "Why and how should we pray?"
- **Holy Week 2027 (March 21 to 27):** the table keeps Holy Week ("The Wrong Kind of King," Matthew 21:8-9, through "He Is Not Here," Matthew 28:5-6); the 2027 plan reads Joshua 21 to 22 (day 80) and Judges 5 to 6 (day 83); the catechism asks Q65, "If God is good, why is there suffering and evil?"
- **Trinity:** Q76, "How can God be three and one at the same time?", falls in the week of June 6, 2027; Trinity Sunday is May 23.
- **A small one:** wave A's illustration of the shared week (A 13) says days 302 to 308 are Jeremiah. In the generated plan, days 302 to 308 are Luke 8 to Luke 22 (the act "Christ, the Center" begins on day 280). The week must always be generated from the data, never typed.

Making four clocks into one week, without forcing connections the texts do not make, is the central design problem of this direction. Section 2.4 solves it.

---

## 2. Information architecture

### 2.1 The doors: keep James's five, add a date

**The doors stay: Study · Topics · Family · Essays · About.** James chose them on 2026-10-26, U19 built them, and U19 carries the Decision Log update. The Week does not need a door of its own, and giving it one would be a mistake: the doors name subjects a reader came for, and a week is a time, not a subject. A sixth door would also cost every page's header width and every phone menu a row.

**What The Week adds is a dateline.** The way a newspaper carries its date under the masthead and a prayer book carries its rubric, LiveWell's header carries one quiet line: **"Tuesday, December 1 · Advent, the first week."** It links to `/week`. Outside the named seasons it is only the date ("Tuesday, October 27"), with no "Ordinary Time" and no lectionary vocabulary. Wave C considered exactly this ("A seasonal masthead line ('Advent, week 1'): only if A 13's shared week ships," C also-considered); this direction ships the shared week, so it ships the line.

- **Desktop:** the dateline sits to the right of the wordmark in Inter 12px small caps, `--ink-muted`, on the header's one row. No added height.
- **Phone:** to protect every deep page's first screen, the dateline appears only on Home, the week, the day, `/family` and Tonight, and as the top line of the menu sheet. Deep pages (an essay, a chapter) keep the 56px header that hides on scroll (critique #9).

Inside each door, the week's own items come first, one line each:

| Door | First, from the week | Then (U19's map, unchanged) |
|---|---|---|
| Study | This week's reading · Doctrine, a question a week (`/study/catechism`) · Courses that begin on a Sunday (`/study/courses`) | The Study Bible, Church history, Creeds and confessions, The Bible in its context, Study with a group |
| Topics | This season's question | Every topic, Honest answers, Eight-week plans, Self-checks, All tools, All resources |
| Family | Tonight at the table · This week, on one page | The year of devotions, The family catechism, Family reading plans |
| Essays | This season (No. 1 · Advent 2026) | The shelf, Seasons past |
| About | The week, by letter · What's new and corrections · How we write | About James, Books, Speaking, Contact |

**The phone menu** opens as a bottom sheet with a scrim (critique #9). Its three largest targets sit at the bottom, in thumb reach: **Today · This week · Tonight.** The five doors sit above them, Find Help at the top.

**What it costs James.** Three things, each his to say no to. (1) One more element in the header, which the Decision Log governs. (2) Church-year names on the pages a reader returns to; for a Baptist pastor that is a choice of identity, not a design detail (section 6.11, proposal 5). (3) Four new top-level addresses (`/week`, `/today`, `/year`, `/seasons`). If he declines the dateline, nothing breaks: the week is reached from Home and from the first line of the Study and Family menus.

### 2.2 The top-level map

```
/                         Home: the week as a specimen for a first visit; your week on a returning device
/week                     resolves after mount to /week/<this Sunday>
/week/:sunday             The week (dated, shareable; e.g. /week/2026-11-29)
/week/:sunday/print       For Sunday: the week on one page (absorbs U20)
/today                    resolves to /day/<today>?office=<by the hour>
/day/:date                The day: Morning and Close of Day
/year                     The church's year: the band, the seasons, who is remembered when
/seasons                  Seasons past and present (the archive of issues)
/seasons/:slug            A season (No. 1 · Advent 2026)

Study      /study                      the door: this week's reading, "start from where you stand", contents
           /study/bible/...            books, chapters, the verse panel (?v=)
           /study/catechism            Doctrine, a question a week: the 76, the doctrine map
           /study/catechism/:n         one question at three depths
           /study/courses              finite courses that begin on a Sunday
           /study/mark-with-a-friend   seven sittings (B 15)
           /theology/history/...       church history (URLs unchanged), + /theology/history/sources/:slug (C 13)
           /resources/creeds, /resources/context, /studyguides   unchanged URLs
Topics     /topics, /topics/:slug      U25, + "When this comes round"
           /answers, /plans/:slug      unchanged URLs; plans gain ?start=
Family     /family, /family/tonight, /family/devotions/:id, /family/catechism
           /family/this-week           resolver to /week/<Sunday>/print?for=table
Essays     /writing, /writing/:slug    the season at the head of the shelf
About      /about, /books, /speaking, /contact, /subscribe
           /whats-new (?only=corrections), /how-we-write, /letters (gated)
Utility    /help/... (Find Help, unchanged), /search, /tools/... (registry), /my-library ("On this device")
```

### 2.3 Page types

| Type | Address | Built from | New or changed |
|---|---|---|---|
| Home | `/` | `Home.tsx`, U18's Find and tonight | Changed: the week card replaces the tonight line |
| The week | `/week/:sunday` | U10 map, U12 index, U17 `tonightOn`, U28 plan | New |
| The day | `/day/:date` | `Stepper`, `useWakeLock`, `ListenButton`, BSB psalm shards (U16), Prayer Planner storage | New (C 16) |
| A season | `/seasons/:slug` | `client/public/seasons/*.json` | New (B 4, C 17) |
| The year | `/year` | U10 map, seasons, registry | New |
| For Sunday | `/week/:sunday/print` | U20's plan, #534 print path, U21's QR codes | Changed (U20 becomes this) |
| Door hubs | `/study`, `/topics`, `/family`, `/writing`, `/about` | U19 | Changed: the week's line first |
| Bible chapter and verse | `/study/bible/:book/:chapter?v=` | `StudyBible.tsx`, U37 | Changed (critique #1, A 1 to 3, A 10) |
| Doctrine question | `/study/catechism/:n` | `family-catechism.json` (answer, kidsAnswer, scripture, commentary, prayer already present) | New page over existing data (A 6, A 7) |
| Essay | `/writing/:slug` | U23, U24 | Changed: season kicker, a carried question |
| Topic | `/topics/:slug` | U25 | Changed: "When this comes round," "Start a course on this" |
| Church history | era, person, event, session, source | U30 to U33 | Changed (B 6 to 8, B 12, B 14, C 13) |
| Family devotion, Tonight, table mode | `/family/...` | U17, U21 | Changed (B 10, B 16) |
| A course (a run) | `/plans/:slug?start=`, `/studyguides/:slug?start=&cadence=` | plans and guides data | Changed (A 17, B 11, A 12) |
| Tool | `/tools/...` | `ToolsHub.tsx` registry | Changed: `StartPanel` (C 4); some become parts of the day |
| Care page | `/help/...` | `CarePage.tsx` | Unchanged by this direction beyond C 2 |
| Search | `/search` | U15 | Changed: time words, catechism results |

### 2.4 The week, composed

A week on LiveWell is seven days, Sunday to Saturday (the year map's weeks already run that way), and seven strands. Each strand keeps its own source and its own cycle; the week only sets them side by side and says where we are in each.

| Strand | What the reader sees | Source today | Chosen by | When there is nothing |
|---|---|---|---|---|
| **Read** | The Scripture for each day | U28's 2027 plan (365 days); in a week a daily set serves, the chapter behind each night's verse | The date; one rule (below) | The chapter behind the week's devotion passage |
| **Learn** | One catechism question | `family-catechism.json`, 76 questions | U12's `catechismWeekIndex`, with season pins (below) | Never empty |
| **Table** | Tonight's devotion | U10 year map, U17 `tonightOn` | The date | Never empty on the map |
| **Think** | One piece from the season's issue | `client/public/seasons/<slug>.json` | The week it is assigned in the issue | Row omitted, never filled with "latest" |
| **Pray** | Morning and Close of Day | The 30-day psalter, the plan, fixed frames from Scripture | The date and the hour | Row omitted until the day ships (phase 3) |
| **Remember** | A witness from the church on their day | `people.json` `remembered` (B 14, after U30) | The date | Row omitted |
| **Carry** | One question to take into the week | The Read chapter's own Apply question, or an essay's marked question | A rule, below | Never empty |

**The Read rule, one sentence.** In a week a daily set serves (Advent, Holy Week, Thanksgiving), Read is the whole chapter behind each night's table verse, so the adults read Genesis 3 on the night the children hear Genesis 3:15; in other weeks of 2027, Read is the plan's day ("Day 302 · Luke 8 to 9"), and the plan simply waits through the set's week with U28's existing mercy, "pick up at your place, or at today's day." Before January 1, 2027, ordinary weeks read the chapter behind the week's devotion (Philippians 4 for "Strong Enough To Be Gentle"). This one rule fixes the Holy Week seam in section 1 with no new writing: in Holy Week 2027 the adults read Matthew 21, 22, 26, 27 and 28 and John 13 and 19 beside the table, and Joshua waits a week.

**Season pins for the catechism (a proposal for James to approve once).** The rolling cycle stays, but a few questions are pinned to the seasons that are about them, so the household learns the incarnation in Advent and the resurrection at Easter (A 13: "Consider keying the catechism to the church year"). Candidate pins, from the questions as they stand: Advent, Q25 to Q27 ("Who is Jesus Christ?", "Why did the Son of God become a man?", "How was Jesus born?") and Q51 ("Will Jesus return?"); Holy Week, Q29 and Q30; Easter, Q31 to Q33; Pentecost, Q41 and Q42; the week of Trinity Sunday, Q4 ("Is God one, or is God three?"); All Saints, Q46 ("What is the church?"). Pinned questions come every year in their season and are skipped by the rolling cycle; a validator checks that every question appears at least once in any 24 months. The repeated questions in the list as it stands (for example Q21 and Q58, Q47 and Q61, which U40 is planned to resolve once James answers question 7) are settled there first.

**Coherence is shown only when the data makes it.** The week never writes a sentence connecting the strands. Where two strands share a tag in their data (the table's theme and the catechism's part, for example both on prayer), the week page may show one generated line, "This week the table and the catechism both turn on prayer." Otherwise the strands sit side by side and the reader makes the connections. Wave B records reviewers faulting a family curriculum for "a forced Christ connection" (B also-considered, FAM 7); a forced bridge is the clean application turn wearing a calendar.

**Where the data lives.** `scripts/build-week-map.mjs` reads the U10 map, the catechism and its pins (`client/public/week-overrides.json`), the plan schedule, the sets and the seasons, and writes `client/src/lib/weekMap.generated.ts` (titles included, as U18 did for tonight) with a `--check` drift gate and U10's twelve-month horizon check. `client/src/lib/week.ts` reads it: `weekOf(date)`, `dayOf(date)`, `dateline(date)`, `seasonLabel(week)`. Pure functions, real-date tests, no network.

### 2.5 How each reader enters, and where they go next

**The skeptic** arrives from a search onto an essay, an Honest Answer or a topic page. What he meets: the argument first (critique #7's first sentence on the first screen), sources he can check, and nothing that asks for anything (B 2). The season appears only as a kicker for context ("Essay · After Christendom · In No. 1, Advent 2026"). He is never shown the day's office or the table on his way in. Where he goes next, at the essay's foot and on `/answers`: *Test it step by step* (Test the Case); *A reading course with an end* (Eight Weeks of Reading Like an Adult, the existing skeptic plan, or *Read Mark with a friend*, seven sittings for one who believes and one who does not, B 15); *This week's source* (one primary text, verified by U07's verifier, C 13); and *What's new and corrections*, the dated record of what the site got wrong (B 5, C 1), which wave B called "the most arresting page of all" for him. If he starts a course, the week page shows it as "Week 2 of 8 begins Sunday" and pushes nothing else. On Home, the skeptic's door sits directly under James's atheist sentence (section 3).

**The doubting Christian** arrives from a topic row in her own words or from Find Help. The topic page or care page answers first. What The Week adds: a place to keep the question inside the faith rather than leaving to keep it (the Audience Standard). Close of Day's Examen opens "Tonight I am coming to this..." with plain choices, and grief or conflict keep Find Help one tap away (C 16). The season's question names what the church has sat in before, with a witness who sat in it (B 7, B 14). Her eight-week plan for doubt stays under Find Help, where care belongs, and can be started on a Sunday like any course.

**The pastor** arrives from a PCN link to a week, a season or a course. What he finds in a minute: *For Sunday*, the week on one printable page with a QR code to its address; a course he can start for his group on a date he picks, which hands back one link, a calendar file for every meeting and a printed schedule (A 17, B 11); the season's booklet for the lobby (C 17); room mode for running a session on a screen (A 16); and one plain sentence of what he may reproduce (C 11, gated on James's license). Nothing reports who in his church used anything.

**The seeker, and the parent** arrive with a Tuesday-afternoon problem. The seeker goes to Find Help (unchanged; the best first screen on the site, per the critique) and may start its eight-week plan on a Sunday. The parent taps the Table row on Home after the turn-over hour and is at step one of tonight in two taps (U17's measure, kept). After "We did this tonight," the last screen of table mode shows the week carried into the morning, the road and bedtime (B 10), and one line, quiet, that this week's catechism question has an adult answer too.

### 2.6 Search

The Week keeps U15's reference-first Find and the critique's one index (critique #3, C 18) and adds three things. **Time words resolve to dated pages:** "this week," "today," "tonight," "Advent," "Lent," "Holy Week," "Easter," "Pentecost," "All Saints" open the current week, day, devotion or season. **The catechism answers doctrine words:** "grace" leads with Q35, "What is grace?", as a definition card with its Scripture, before any application (`critique/learning.md` m1). **The empty field shows the week:** its five rows, then "Recently on this device" with Clear (C 18), replacing the static `SEARCH_SHORTCUTS` row. Season pages are indexed; dated weeks and days are not. Crisis words keep priority over everything (C 18).

### 2.7 Folded or cut, in short

Home's tonight line folds into the week card; `/family`'s separate "This week" panel becomes the shared week; U20's page becomes the week's print view; the theology quiz is retired (with James's yes) for the season's look-back; Scripture Memory loses its counts; the daily-habit tools become parts of the day; "Latest" gives way to the season; the beginner courses leave "Help in a hard season." Section 7 has the full list with reasons.

---

## 3. The home page

The home page has two jobs and must do both on the first phone screen: tell a stranger who this is for (the critique's first agreement: "name the readers in the first three seconds, and give the skeptic a door in his own words"), and show a returning reader where he is this week. The week card does the second job and, for a stranger, is the product itself as a specimen: real content for this week, not a description of features.

Example date throughout: **Tuesday, December 1, 2026**, the first weekday of the Advent calendar (computed from the data: the week of November 29; tonight "The Long Wait Begins," Genesis 3:15; the catechism's rolling question Q49, or Q26 if James approves the Advent pins).

### 3.1 Phone, 390 x 844, a first visit

Heights are estimates for the builder to measure on a preview.

1. **Header, 56px** (static shell, as today): "LiveWell" in Cormorant 22px over "by James Bell" in Inter 10px caps; on the right, Find Help (Inter 14px 500, ink), search (44px), menu (44px). It hides on the way down and returns on the way up (critique #9).
2. **Dateline, 32px:** "TUESDAY, DECEMBER 1 · ADVENT, THE FIRST WEEK" in Inter 11px caps, 0.14em, `--ink-muted`, a hairline beneath. The prerendered shell reserves the row with the words "This week"; the date fills in after mount, so nothing moves.
3. **Headline, about 120px:** James's headline, kept, in Cormorant 400 at 36px, line height 1.08, letter spacing -0.02em: *Learning to follow Jesus, and live well, in post-Christian America.* (His chosen words, with commas where the two dashes were, under his own no-dash rule. Critique row for `/`: "headline without a line starting on a dash.")
4. **Who, about 96px:** a real portrait, 56 x 70, square corners (critique #10 asks for a face you can read), beside one sentence in Inter 16px/1.5, ink: *I'm James Bell, a pastor. I came to faith as an adult, after years as an atheist, so I know the objections from the inside.* (Cut from his own `HOME_WHO`; the cut is his to approve.)
5. **The skeptic's door, 44px:** *Not sure you believe any of this? Start with the hardest questions.* One link, Inter 16px 500, a 1px mustard underline, opening `/answers` with Test the Case at its head. Placed here because it answers the sentence above it.
6. **The week card, about 330px:** a white card lifted on cream (the contract's use for white), 1px `--line` border, square. Its head: "This week" in Cormorant 24px, and "Nov 29 to Dec 5" in Inter 13px `--ink-muted`. Under it, the seven-day strip: seven cells, S M T W T F S with the date beneath each, 44px tall; Tuesday carries the screen's one mustard mark, a 2px tick under its letter. Then five rows, each at least 48px, a label in Inter 11px caps `--ink-muted` on the left and the content in Inter 16px ink:
   - **READ** · Genesis 3 · the chapter behind tonight's verse
   - **LEARN** · Why and how should we pray? · Question 49
   - **TABLE** · The Long Wait Begins · Genesis 3:15 · ten minutes
   - **THINK** · What "Post-Christian" Actually Means (the pilot, once James approves it; the row is absent until a season item is live)
   - **PRAY** · Morning · Close of Day (from phase 3; absent before)
7. **Find, about 56px,** beginning just inside the first screen: U18's field, unchanged ("Look up a passage or ask a question").

Nothing on this screen asks for an email. Nothing counts. The only mustard is Tuesday's tick and the skeptic door's underline; the hairline under the dateline is `--line`.

### 3.2 Phone, a returning device

Everything above the card is prerendered and does not change, so there is no layout shift. After mount, the card reads the device (U17's family position, U28's plan position, the day's last date, any course in progress) and fills in place:

- The head gains "Last here: Sunday," in words, and nothing else about the past. Never "you missed," never a count of days.
- The first row follows the hour (C 16, DH 3): before 2 p.m., **TODAY · Morning · Psalms for the 1st · Genesis 3**; after it, **TONIGHT · The Long Wait Begins · Start at the table.**
- A course in progress appears as one row: **COURSE · Eight Weeks of Beginnings · Week 3 begins Sunday.** U18's *Continue* folds into this row.
- If the reader chose, on this device, to keep only some strands ("Keep these," section 5.1), those come first and the others collapse into "Also this week."

### 3.3 Desktop, 1440 x 900

1. **Header, 72px:** wordmark at left (Cormorant 26px, byline in Inter caps), then the dateline as a quiet link, "Advent · the first week"; the five doors in Inter 15px 500; a visible search field (240px, "John 3:16, or a question"; critique #4 asks for a field, not an icon); Find Help; Subscribe as a text button so it no longer outweighs the wordmark (`critique/brand.md`).
2. **The first screen, inside the 1180px container on a 12-column grid with 24px gutters, cream:**
   - **Columns 1 to 7:** the dateline repeated as an eyebrow; the headline in Cormorant at 64px over three lines; the portrait at 120 x 150 beside James's sentence in Inter 18px/1.6; the skeptic's door; Find at 480px wide.
   - **Columns 8 to 12:** the week card as a page set apart: "The week of November 29" in Cormorant 30px; the seven-day strip with 56px cells; the five rows with their lengths; at the foot two text links, "See the whole week" and "For Sunday: print this week on one page."
3. **Below the fold line (about y = 780):** the top edge of the charcoal year band, so the page signals there is more without a carousel or an arrow.

### 3.4 The rest of the page

Sections alternate as the contract requires: cream, charcoal, cream warm, cream, charcoal.

2. **The church's year (charcoal).** "Where we are in the year," Cormorant 34px in `--charcoal-fg`. The year band (section 6.7): Advent to Advent as segments sized by their days, each labeled, one mustard tick for today, every segment a link to its season. Beneath it, **This season**: "No. 1 · Advent 2026," the season's question in James's words, its three to seven pieces as a short contents list with kind and minutes, and "This season ends on [date]." On a phone the band runs full width and its labels drop into the list beneath (the list is also the accessible equivalent).
3. **Courses that begin on a Sunday (cream warm).** A contents list, not cards (C 17, A 17): title, length, who it is for in the reader's words, and the next start date. *The Gospel first* (Mark in sixteen days; new, generated from chapters, `critique/learning.md` M2). *Read Mark with a friend* (seven sittings; B 15; gated on its margin notes). *Eight Weeks of Reading Like an Adult* (for the reader who is not sure he believes; exists). *Eight Weeks of Beginnings* (for the new believer; exists). *Eight Weeks With an Open Bible* (exists). *Read the whole story in 2027* (365 days, begins Friday, January 1; exists, U28). *The church's story, Part I* (when it is live). Each row: "Next start: Sunday, December 6."
4. **Start with these (cream).** Kept from today: three essays chosen by the question each answers.
5. **The ending (charcoal).** One dark ending (`critique/brand.md`: no band, sliver and footer): the books as one line ("James's books: *When God Bless America Replaces Thy Kingdom Come*, *The Monster in the Mirror*, *Believe*. The opening of each is free to read."), **The week, by letter** (one form, once per page, "Sent on Sunday evening"), and the footer as a real index of the site.

### 3.5 Why it draws attention, and still feels unhurried, weighted and grown-up

**What draws the eye is the date.** A page that knows what day it is, and what week of a two-thousand-year calendar, is one of the oldest hooks in publishing and in prayer: the newspaper's dateline, the prayer book's rubric, the Advent calendar's door. It is attention earned by the thing itself (A section 3's rule), and it changes every week without anything flashing. The specimen does the rest: a stranger sees real Scripture, a real question of the faith and a real devotion for tonight, not a promise of features. The seven-day strip with one tick and the year band with one tick are the only pictures, and both teach where you are.

**What keeps it unhurried is that the week holds still.** Nothing on Home changes between Sunday and Saturday except the hour-dependent row. Nothing refreshes itself, nothing scrolls forever, and every row says how long it takes. The page tells the reader what is enough (ten minutes at the table; the short form of the day's prayer, three minutes) rather than how much more there is.

**What makes it weighted and grown-up is whose calendar it is.** The rhythm is the church's, not the product's: it existed before LiveWell and asks nothing of the reader but attention. There is no score, no flame, no badge, no "join 10,000 others." James is named, with his face and his atheist sentence, and then the page gets out of the way.

---

## 4. Signature interactions

Ten, each with what the reader does, what happens, where it lives, the research behind it, and why it serves study and growth rather than engagement.

### 4.1 Every week has an address

**What the reader does.** Taps the dateline, or "See the whole week."
**What happens.** `/week` resolves to this week's Sunday, `/week/2026-11-29`. The page shows the seven-day strip, the week's word (the table's key verse, set large in the text serif: *"Let your gentleness be apparent to all. The Lord is near."* Philippians 4:5, BSB, in the week of October 25), and the strands as rows that expand in place. Arrows step to the previous and next week. Any week, past or future, opens at its own address, and the URL carries nothing but the Sunday, so a pastor can send "the week of March 21" in March or in February.
**Where.** `/week/:sunday`; reached from the dateline, Home, the Study and Family menus, the phone menu's bottom row.
**Research.** A 13 (the shared week, a one-line module and a page); C 16 and DH 7 (every day is an address, yesterday and tomorrow are links); B 4 (a shape in time); the seasonal masthead line C left for this direction.
**Why it serves growth.** It answers the question critique #6 says no page answers: "what to study this week." It replaces a decision with a place, and position with a date that is shared with everyone else reading, which is what wave A found holds readers for years without a score.

### 4.2 The hour decides the door: Morning and Close of Day

**What the reader does.** Taps "Today" (phone menu, Home row) or opens `/today`.
**What happens.** The page opens on Morning before 2 p.m. and on Close of Day after (the turn-over hour can be changed once and is kept on the device). "Begin" runs the office one step per screen on the `Stepper` that already drives table mode, with the screen kept awake and Listen reading at prayer pace (slower, with a pause between psalm verses; DH 4). *Morning* (about ten minutes; short form about three): a fixed opening from Scripture, the morning psalms for the day on the thirty-day psalter (BSB, from the psalm shards U16 already ships), the day's chapter, one Observe question from that chapter's notes, the Lord's Prayer (Matthew 6:9-13), today's names from the reader's own prayer list with "Add a name" inline, a fixed close. *Close of Day* (about seven minutes): an evening psalm; the Examen, opened by "Tonight I am coming to this..." with plain choices (grief and conflict keep Find Help one tap away); *"Into Your hands I commit my spirit; You have redeemed me, O LORD, God of truth."* (Psalm 31:5, BSB); the Song of Simeon (Luke 2:29-32); a blessing from Scripture; an optional private line that comes back on its date a month later (DH 12). It ends on a still screen: "Tomorrow is Wednesday, December 2." After a gap it says only what day it is.
**Where.** `/today`, `/day/:date?office=morning|evening`; the Pray row of the week.
**Research.** C 16 (Morning and Close of Day; Venite's clock-chosen office, Lectio 365, Sacred Space's dated pages); DH 1 to 5, 11, 12 and 15; the C-wave verdict that "no Protestant product found in this wave offers a free, web-first, unhurried morning and close-of-day prayer" that carries the church's memory and refuses every counter.
**Why it serves growth.** It turns the site's scattered daily pieces (the Proverbs tool, the Prayer Planner's names, the Worry Journal's bedtime step, the Examen how-to that teaches prayer without letting anyone pray it) into one practice with a frame the church has used for centuries. The frame removes every decision but one, to begin, so attention goes to the text. Every fixed line is Scripture or a historic prayer quoted verbatim with its source; nothing is invented; James approves the frame once.

### 4.3 One question, three depths, one household

**What the reader does.** Taps the Learn row.
**What happens.** `/study/catechism/26` (in a week the Advent pins hold) opens the question, "Why did the Son of God become a man?", at three depths that the data already holds: **At the table** (the `kidsAnswer`), **In brief** (the adult `answer`, with each clause carrying a small letter that opens its Scripture in a sheet; A 7), and **Going further** (the existing `commentary`). Under it, the same ladder on every question (A 6): *In Scripture* (the Study Bible doctrine study), *Confessed* (the creed phrase that says it, opened at its note), *Where Christians differ* (the debate page with its first-, second- or third-order label, positions at equal length; B 9, C 20), *Words* (glossary terms open in place; C 9). *Learn it by heart* runs the first-letter drill with no score (A 22, C 7). The page ends in the question's own `prayer`, which the data already carries (A 15: doctrine pages end in prayer, never a takeaway box).
**Where.** `/study/catechism/:n`; the Learn row; Tonight's Remember step links to it; `/family/catechism` lists into it.
**Research.** A 6, A 7, A 8, A 13 (key the catechism to the church year), A 22; B 13 (one truth at three depths); C 7 (kept, not memorized).
**Why it serves growth.** Doctrine stops being taught in five unconnected places (`critique/learning.md` M4) and becomes one question a week that the whole household holds at once: the child learns the child's answer at the table on the same Tuesday the parent reads the adult answer and the creed line it grounds. It also makes the confessional floor visible in the order of importance (A 8's doctrine map heads `/study/catechism`).

### 4.4 Carry it into the week, and it comes back

**What the reader does.** At the end of the week page, a chapter, an essay or a devotion, reads one question under *Carry this into the week* and may write a line under it, kept on the device ("Nothing you write here leaves this device," said at the field).
**What happens.** The question is chosen by rule, not written new: the Apply question of the week's Read chapter (every one of the 1,189 chapters has Observe, Interpret and Apply questions), or the question an essay marks as its carried one in its `questions` field (U24). It comes back once about three days later, as a quiet line on the week page, and once about three weeks later, and then retires (C 6's salience prompts). Separately, the week page opens with *Last week*: last week's catechism question, "Say it, then show the answer," using the question's own answer. A reader who opts in can put a page's own questions on a private ladder that returns them at about five days, two weeks, five weeks and three months, at most six in a sitting, each answered "I had it," "Not yet" or "Skip for now," ending with the date of the next return (C 6).
**Where.** The week page (*Carry*, *Last week*, *Ready to look at again*), the foot of essays and chapters, `/my-library` ("On this device"). Never on Home, never a count of what is due, never a push (C 6's own limits).
**Research.** C 6 (it comes back), C 8 (commit, then compare), A 14 (your answer before ours), DH 12 (a private line that returns on its date); `critique/learning.md` C4 (nothing asks an adult to remember anything).
**Why it serves growth.** It is the retrieval and spacing the critique says the site lacks entirely, delivered by the week's own clock. And a carried question is the opposite of the clean application turn: it names a situation the reader will meet and lets him answer it there.

### 4.5 The table, and four doors in a day

**What the reader does.** Opens Tonight (from Home, the week, or `/family/tonight`).
**What happens.** Everything U17 and U21 built stays: the page per devotion, table mode, the band switch, the three-night split, "We did this tonight" as a plain button. Added: under *Start*, a plain *Read and pray*, about three minutes, still ending on "We did this tonight," with one sentence of permission above it (B 10); the Ask step labels its questions by kind, *What happened?*, *I wonder* and *Your turn* (a question the child asks the grown-up; B 16); a collapsed note for the parent above the devotion (not in table mode). The last screen before "We did this tonight" carries the week into the other three times a family is together, under *"And you shall teach them diligently to your children and speak of them when you sit at home and when you walk along the road, when you lie down and when you get up."* (Deuteronomy 6:7, BSB): in the morning, the catechism's child answer; on the road, one older-band question; at bedtime, one line of tonight's prayer for a child to say back.
**Where.** `/family/tonight`, `/family/devotions/:id`, table mode; the Table row of the week and Home.
**Research.** B 10 (the smallest faithful version, four doors in a day), B 16 (questions by kind, a minute for the parent first), A 13; the critique's "keep" list.
**Why it serves growth.** It makes the minimum honest (Whitney's "brief, regular, flexible," B 10) so a tired household keeps the week instead of dropping it, and it puts the adult inside the question at his own table, which is the self-implication rule at a kitchen table (B 16).

### 4.6 The year you can see, and seasons that end

**What the reader does.** Taps the year band on Home or opens `/year`; opens a season.
**What happens.** The band shows Advent to Advent as segments sized by their days, labeled, with one mustard tick for today. Each segment opens its season: `/seasons/advent-2026`, "No. 1 · Advent 2026," the season's question in James's words, his letter if he wrote one, three to seven pieces in reading order with the week each belongs to, the family set, the host kit, and "This season ends on [date]." In Advent and Holy Week the family set appears as a grid of doors that open on their dates, past doors staying open for a family that missed one, and in Holy Week the last card empty but for the words of the empty tomb (B 23; Advent 2026 already shipped through U13, so the grid's first use is Holy Week 2027, Palm Sunday March 21). A finished season moves to `/seasons` with "This season ended on [date]."
**Where.** Home (charcoal band), `/year`, `/seasons/:slug`, the head of `/writing` and of `/topics` ("This season's question").
**Research.** B 4 (a season's question and an archive), C 17 (finite and numbered, the season as an issue, the issue in print), B 23 (the season you can hold), A 10 (the band grammar), B 8 (the shape in time).
**Why it serves growth.** It replaces the feed with finitude: a reader knows what this season is, when it began and that it ends (B tension 1, C tension 4). The question gives three months of reading a spine, and the end gives it a closing (4.10). James's mission subject, post-Christian America, gets a season-length treatment instead of a scattered shelf (critique #5).

### 4.7 Begin on a Sunday: courses for one, a household or a church

**What the reader does.** On any finite course (an eight-week plan, a study guide, *Read Mark with a friend*, a history Part), picks a start Sunday.
**What happens.** The whole path appears on the first screen with a date beside every week (A 17); "Add every week to my calendar" writes one calendar file through `lib/calendar.ts`; "Print the schedule" makes one page; "Share" hands back a link that carries only the start date and cadence (`/studyguides/after-christendom?start=2027-01-10&cadence=8`), so a pastor sends one schedule to a whole group. The device remembers the course; the week page shows "Week 3 of 8 begins Sunday." After a gap the page offers two equal choices, *Pick up at week 3* or *Join this week at week 5*, and never mentions the weeks between (A 12).
**Where.** `/plans/:slug`, `/studyguides/:slug`, `/study/courses`, the Course row of the week and Home.
**Research.** A 17 (the whole path on screen one, dated for your church), B 11 (dated runs a church can join, carried by a link), A 12 (plans with doors and mercy); `critique/learning.md` C2 and M2 (the best curricula filed as crisis care; the first lesson Genesis 1 of 1,189).
**Why it serves growth.** A close, concrete goal with a start and an end is what sustains effort (`critique/learning.md` M2); a shared start is how formation reaches the room, where it actually happens (A move 12). No one tracks anyone: nothing about who joined is recorded or reported.

### 4.8 The church remembers this week, and this week's source

**What the reader does.** Sees a Remember row on the week page, or "This week's source" on `/theology/history`.
**What happens.** A witness from the registry with a traditional day of remembrance or a known death date is remembered on it: a card with a life of about 150 words, one verified line in their own words, one Scripture reading, the session where they appear, and their own prayer where a stored text preserves one, framed for Baptist readers by *"Therefore, since we are surrounded by such a great cloud of witnesses..."* (Hebrews 12:1, BSB) as remembrance, not veneration (B 14). Separately, one short primary text a week, from U07's verified corpus, on its own dated page with a fixed label (author, date, place, original language, translation and its status) and two doors (C 13).
**Where.** The Remember row; `/theology/history` ("Remembered this week," "This week's source"); `/year` (who is remembered when); `/theology/history/sources/:slug`.
**Research.** B 14, C 13, B 7 (enter through a person), B 6 (read the source like a historian).
**Why it serves growth.** It brings the long memory into the week instead of leaving it in a reference hub, and it lets the skeptic check a primary text himself. Dates are verified against the calendar chosen before any card ships (B 14 says so for Polycarp and Perpetua, the first candidates, both stored by U07).

### 4.9 For Sunday: the week on one page, and by letter

**What the reader does.** Taps "For Sunday" on the week page.
**What happens.** `/week/2026-11-29/print` lays the week on one Letter or A4 page: the dateline and season; the week's word; Read for each day in a compact table; Learn (the question, the adult answer, the child's answer); At the table (title, passage, the three-night split); one question *For the room* (the devotion's grown-ups line or the Read chapter's Interpret question); *Carry*; a QR code to the week's address (U21's QR machinery); the reuse line, if James chooses a license (C 11). `/family/this-week` resolves to the same page with the table first. The same week can go out as "The week, by letter" on Sunday evening: a dated table of contents with no first person from James, so it needs no weekly byline read; his own letter comes only when a season opens, if he writes one (B 19).
**Where.** `/week/:sunday/print`, `/family/this-week`, the newsletter.
**Research.** MASTER-PLAN U20 (*This week at your table*, print-first, a QR to Tonight), B 11 (Gospel Project's card home every Sunday; Parent Cue in every folder), B 18 (readers become hosts), A 13 (a Sunday-night letter that doubles as the pastor's sheet), C 11.
**Why it serves growth.** It hands the week from the screen to the room and the refrigerator door, which is where a household's week is actually kept, and it is the distribution channel the contract ranks highest (PCN) without a single ask.

### 4.10 The look back, and the closing rite

**What the reader does.** Reaches the end of a season or a course.
**What happens.** A look back of about eight mixed questions drawn from the weeks just finished, each linking home (C 6), then a closing with weight: Scripture, a prayer the church has prayed (verbatim, public domain, sourced) or the season's own, the reader's own carried lines read back in order from the device, and the next door with its date (A 15). No certificate, no confetti, no percentage.
**Where.** The last week of each season and course; a printable closing for a group's last meeting.
**Research.** C 6 (the look-back before the closing), A 15 (a closing rite, not a certificate; Daf Yomi's siyum); the critique's ask to retire or rebuild the theology quiz (question 12).
**Why it serves growth.** It replaces a quiz that tested disposition with real recall at the moment it does the most good, and it gives a season an ending that leaves weight, the contract's rule for every ending.

---

## 5. Templates

Each template: structure, the interactive layer, the first screen at 390 x 844. All follow MASTER-PLAN section 2: tokens only, shareable state in the URL, personal state on the device through `lib/storage.ts` and said plainly, literal `SEOMeta`, the 9.3 checklist for every new param route.

### 5.1 The week (`/week/:sunday`)

**Structure.** `PageHead` (eyebrow "The week" and the season, H1 the date range "November 29 to December 5", previous and next week arrows at 44px); the seven-day strip; the week's word in the text serif; the strands as rows (Read, Learn, Table, Think, Pray, Remember, Course), each expanding in place to one line and its door ("Open Genesis 3 in the Study Bible," "Start at the table," "Read the essay, 14 minutes," "Pray Morning"); *Carry this into the week*; *Last week*; *Ready to look at again* (only when something is due, never a count); *For Sunday* (print and share); *Keep these* (choose which strands come first on this device); previous and next week again; "The year."
**Interactive layer.** A day in the strip opens `/day/:date`; rows expand; the carry field and recall reveal live on the device; *Keep these* writes one storage key; print through `TakeItWithYou`.
**First screen.** Header (hides on scroll), eyebrow and H1 and arrows (about 110px), the strip (56px), the week's word (about 100px), and the first three rows. The rest is one scroll.
**SEO.** `/week` carries literal meta ("This week on LiveWell"). Dated weeks are registered by the 9.3 checklist and marked `noindex, follow`: they are generated pages, useful to share, thin to search.

### 5.2 The day (`/day/:date?office=morning|evening`)

**Structure.** Dateline; a segmented switch *Morning · Close of Day* (the hour chooses the default); H1 the office's name; "Tuesday, December 1 · about 10 minutes · short form about 3"; *Begin* and *Short form*. Below, for a reader who would rather read than be stepped through, the office as a contents list with each part readable in place (Venite's reading room; C 5, DH 11): rubrics in Inter 12px caps `--ink-muted` with "Hide instructions" kept on the device, the words to say in the text serif, lines said together in Inter 500.
**Interactive layer.** The `Stepper` in a full-screen frame (table mode's frame), Next and Back at the bottom in thumb reach, `useWakeLock`, `ListenButton` with a prayer-pace setting used only here and in table mode; the prayer list read from and written to the Prayer Planner's own storage; the Examen's choices store nothing; the private line returns on its date; one `office_complete` telemetry event with the office name only (C 16); no third-party script on these pages.
**First screen.** Dateline, switch, "Close of Day" in Cormorant 40px, the date and length, *Begin* (ink button) and *Short form* (outline), and the first line of the evening psalm as a preview.
**Night.** Follows the system theme once dark mode is on (section 6.9); until then, light.

### 5.3 The season (`/seasons/:slug`) and the year (`/year`)

**Season structure.** Eyebrow "No. 1 · Advent 2026"; H1 the season's question; the dates ("November 29, 2026 to February 9, 2027"); James's letter, if he wrote one (never a placeholder); the contents in reading order, grouped by week, each item with its kind (essay, Reading, passage and its context guide, history session or source, the family set, a group guide) and minutes; the host kit (*Host a table*, B 18); the booklet (C 17: a 16- to 32-page PDF from `build-pdfs.mjs`, half-letter for church copiers, QR codes, the reuse line); "This season ends on Tuesday, February 9." In the last week, the look back and the closing (4.10).
**Year structure.** The band; under it, each season as a list row with its dates, question and pieces; "Remembered this year," by date; seasons past.
**Interactive layer.** The band's segments and ticks are links; the door grid (Advent, Holy Week) opens on dates and remembers on the device which doors were opened, counting nothing (B 23).
**First screens.** Season: eyebrow, the question in Cormorant 34px, dates, and the first contents rows (the letter follows the contents on a phone so the reader sees what the season holds before reading about it). Year: H1 "The church's year," the band full width, today's season named beneath it.
**Data.** `client/public/seasons/<slug>.json` (`number`, `title`, `season`, `start`, `end` from the year map, `letter` with `approvedBy` and date or absent, `items[{ week, kind, href, minutes, line }]`, `family`, `host`, `booklet`); `scripts/validate-seasons.mjs`: three to seven items, every href public (`isPublicEssayHref`, `site-routes.mjs`), weeks inside the window, forbidden language, no em-dash, no letter without James's approval recorded.

### 5.4 Bible chapter (`/study/bible/:book/:chapter`)

**Structure** (critique #1's world-class version, with A 1, A 2, A 3, A 5, A 10 and `critique/learning.md` M1 and M7): a 6px band under the title showing where the chapter sits in its book and act (A 10); the title; when the reader came from the week or the plan, one line of position, "Day 302 · Friday, October 29, 2027 · Christ, the Center"; a two-line summary with "More"; *Read with these in mind*, the chapter's three Observe questions, collapsed to one line on a phone; *Read · Study* switch (A 2; Read is the default from the week, Home and the plan, Study from search); the text in the text serif at 20px, paragraphed, the outline's headings in the text at every width, verse numbers small and muted with a 40px hit area, the prologue or poetry in lines; at the last verse, *Mark as read* (moved from screen 12) and a full-width next ("Tomorrow: Luke 10 to 11" in the plan, otherwise "Luke 9"); *Answer one*, the Interpret and Apply questions with a private field; the notes under a depth switch *Reading · Studying · Teaching* (M7), Teaching adding a one-page leader's sheet; *Carry this into the week*.
**Interactive layer.** Whole-verse selection opens the verse panel (5.5); an auto-hiding bottom bar with previous chapter, a "Luke 8" book-and-chapter picker, next chapter, Aa, Listen (`critique/mobile.md` 2); state in the URL (`?mode=read`, `?v=16`).
**First screen.** The band, "Luke 8" in Cormorant 34px, the position line, the summary's two lines, the one-line questions chip, and verse 1 beginning on the first screen.

### 5.5 Verse (the panel, `?v=`)

**Structure.** A1's counted rows in a fixed order, empty rows hidden: *Study note*, *Words*, *Elsewhere in Scripture* ("the 12 strongest," since the build keeps only twelve; A 1), *The church on this verse* (dated, A 4), *A question it raises* (A 5), *On LiveWell* (every essay, devotion, catechism proof, plan and topic that cites it, from the generated inbound index A 1 proposes). Every layer labeled by who is speaking in small Inter caps over a hairline (A 3). The Week adds one action, *Carry this verse*, which puts it on the private ladder (C 7) and shows "Comes back Tuesday."
**Interactive layer.** The existing `Sheet`: a bottom sheet with detents on a phone (about 40 percent, the verse still visible), a side panel from 1024px; focus moves in and back; previous and next verse at the foot.
**First screen.** The sheet at 40 percent: "Luke 8:15" and its text, then the first two rows.

### 5.6 Essay (`/writing/:slug`)

**Structure** (critique #7 and MASTER-PLAN 6.2): kicker with the season ("Essay · After Christendom · In No. 1, Advent 2026"); title, dek, byline, "Revised" date and minutes; one Aa control (size, theme, Listen); the first sentence on the first phone screen; the body in the text serif with no bold, block Scripture with its reference, live references (U23), notes beside the text from about 1100px and under the paragraph on a phone (C 3); an end mark and real silence; then 6.2's fixed foot, where the first item, *To think about*, marks one question as the one to carry, offers C 8's "say the argument in three sentences, then see James's," and offers *Read it with others* (the group guide with a start date). The book appears as one line only where it is the natural sequel.
**Interactive layer.** Nothing between the first sentence and the last (C tension 2). After the end: the carry field, the commit-then-compare, the dated course link.
**First screen.** Kicker, title, dek, byline line, the Aa control in one row, and the first sentence.

### 5.7 Topic (`/topics/:slug`)

**Structure.** U25's six sections unchanged (the question and short answer; Read this first; Scripture read in its world; the church has been here before; at the table; use this), plus two lines at the foot: *When this comes round* (the season or weeks that treat this question, and, for the politics page, the weeks of the civic calendar where it matters, such as the week after an election, where "Praying for leaders we did not choose" belongs), and *Start a course on this* (the matching eight-week plan with a start date). Topic pages stay evergreen; seasons link to them, never the reverse (B 4).
**First screen.** The question as H1 and the first lines of the short answer, as U25 built it.

### 5.8 Doctrine (`/study/catechism` and `/study/catechism/:n`)

**Structure of a question page.** Eyebrow "Doctrine · Question 26 of 76" and, if it is this week's, "the question for the week of November 29"; H1 the question; *In brief* (the adult answer) on a white card with proof letters opening their Scripture; *At the table* (the child's answer); *Going further* (the commentary); the ladder (*In Scripture*, *Confessed*, *Where Christians differ* with its order label, *Words*); *The church's witness* (one dated, verified excerpt, when A 4's stage two lands); *Learn it by heart*; previous and next question; the closing prayer.
**Structure of the landing.** The doctrine map (A 8: three rings drawn in ink, the confessional floor at the center, second- and third-order questions outward, a plain list beneath), then the 76 in their six parts with this week's question marked, then the 62 doctrine studies and 31 debate pages by locus. `/theology/doctrine/*` stays (never redirected); the question pages link to it.
**Interactive layer.** Proof sheets (`VerseRef`), gloss links (C 9), the drill (C 7), the guess before a doctrine-map reveal (C 8: "First-, second- or third-order? Your guess, then where the creeds land").
**First screen.** Eyebrow, H1, and the *In brief* card's first two lines.

### 5.9 Church history: era, person, event

**Era essay** (`/theology/history/:era`): the one long-read template (critique #7, #8): series rail "Era 2 of 7" with previous and next; the era's segment of the time river as a 6px band under the title; byline and date; linked figures, councils and Scripture; a line map where one helps; one *In their own words* excerpt from the verified corpus; sources in the margin; three *Can you say it back?* prompts; *Remembered this week* when a figure of this era has their day. First screen: rail, band, title, date range, first sentence.
**Person** (a sheet by query parameter, a page past the plan's 150-word threshold): name; dates with certainty (solid or dotted, B 12); one line of who; *Remembered on* where `remembered` is set; *In their own words* (five verified excerpts, only when five pass the verifier; B 7); the sessions and essays where they appear; Scripture they read or wrote on; a *lives as lines* strip of contemporaries (B 12); the card to print (B 14). First screen: name, dates, the line, the first excerpt.
**Event or hinge** (B 8): *The world before*, *What happened* (date, place, people, one source line), *The world after*, *What we still carry*, *The road to it*; the witness label (eyewitness, within a generation, later account, tradition; B 6); *Compare the witnesses* where two or three stored sources tell it (Thessalonica 390 in Ambrose, Theodoret and Augustine, all three stored, per B 6). First screen: date and place, H1, a one- or two-sentence scene from a source (B 7).
**The course as weeks.** A history session (U32) started as a course shows "Session 3 of 6 · the week of [date]" and joins the week's Course row. The first run that fits is Part I after Easter 2027 (it goes live March 12, so it cannot begin on Ash Wednesday; B's calendar note).

### 5.10 Family devotion and Tonight

**Structure** (U17 and U21 kept): eyebrow "Tonight · Tuesday, December 1"; title; the passage set large in the text serif first after the title (critique row for `/family/tonight`); *Start* (about ten minutes) and *Read and pray* (about three); the band switch; Read, Talk, Ask (by kind), Do, Remember (with a link to the catechism question's page), Pray; the collapsed parent note above, not in table mode; utilities (save, send, print) at the end; one position line, the date and the season, instead of "69 of 72 · Week 44 of the year."
**Table mode.** Unchanged, plus the four-doors screen before "We did this tonight," and in a daily set's week, "Tomorrow: A Family for the World."
**First screen.** Eyebrow, title, the verse in serif at 24px with its reference, *Start* and *Read and pray*.

### 5.11 A tool (Test the Case; the Worry Journal)

**Test the Case.** `StartPanel` (C 4) collapsed to two lines on a phone; Move 1 on the first screen with the case picker below "Other questions"; "Next move" beside "Not convinced, but go on" (critique #10); *See the whole case* (B 20); at the close, the private field *In your own words, the strongest point against this case*, with one opt-in offer, *Bring this back in a week*, which returns the reader's own objection on its date (DH 12) and nothing else. No verdict picker, no email, no week strip. The skeptic's tool does not wear the rhythm unless he asks for it.
**The Worry Journal.** Its route and page stay (tools never redirect); its bedtime step also becomes a step of Close of Day, reading the same storage, so a reader who uses both keeps one journal.
**First screen.** For Test the Case: the case title, the two-line panel, and Move 1's claim.

### 5.12 A path or plan (a course)

**Structure** (`/plans/skeptic?start=2026-12-06`): title; "8 weeks · about 30 minutes a week" and who it is for in the reader's words; *Begin on* (a Sunday picker, defaulting to next Sunday); the whole path with a date beside each week and this week marked; each week in the existing shape (focus, why, practice, read, tool, reflection); *Add every week to my calendar*; *Print the schedule*; *Share*; position on the device ("Week 3 of 8"); the two equal choices after a gap; the closing (4.10) with the reader's own reflections read back. Study guides add `&cadence=` and room mode (A 16).
**First screen.** Title, length and reader line, the start picker, and the first two weeks of the path.

### 5.13 For Sunday (`/week/:sunday/print`)

**Structure.** One page at Letter and A4 (U20's test): masthead and dateline; the week's word; *Read* (seven short rows); *Learn* (question, adult answer, child's answer); *At the table* (title, passage, three nights); *For the room*; *Carry*; QR code; the reuse line. Screen view shows the same page with *Print* and *Share* at the top.

---

## 6. Visual language, inside the brand contract

### 6.1 The idea: time made visible

The palette, the faces and "Unhurried. Weighted. Grown-up." stay. What The Week adds is one picture used everywhere a reader needs bearings, **the band**: a horizontal line divided into labeled segments, hairlines between them, and one mustard tick for "you are here." It is wave A's drawing grammar (A 10) used at four scales, so the site has one visual language that is also its argument: you are somewhere in a story older than you.

### 6.2 Type scale

Held as `:root` tokens beside the existing ones (MASTER-PLAN 8.7, critique #7: "a declared type scale held as `:root` tokens"). Phone first; desktop from about 1024px through `clamp()`.

| Token | Phone | Desktop | Face | Use |
|---|---|---|---|---|
| `--t-display` | 40px / 1.04 | 72px / 1.02 | Cormorant 400, -0.02em | Home headline, a season's question |
| `--t-h1` | 34px / 1.08 | 56px / 1.04 | Cormorant 400, -0.02em | Page titles |
| `--t-h2` | 28px / 1.12 | 34px / 1.1 | Cormorant 400 | Section titles |
| `--t-h3` | 22px / 1.2 | 24px / 1.2 | Cormorant 500 | Subheads; never smaller |
| `--t-word` | 22px / 1.45 | 26px / 1.45 | Text serif 400 (proposal 1) | The week's word, a psalm verse set large |
| `--t-read` | 19px / 1.6 | 20px / 1.6 | Text serif 400 (proposal 1); Inter until approved | Scripture, essays, prayers, devotions |
| `--t-lead` | 17px / 1.6 | 18px / 1.6 | Inter 400 | Decks, the who sentence |
| `--t-ui` | 16px / 1.5 | 16px / 1.5 | Inter 400 and 500 | Interface, rows, inputs (16px also stops iOS zoom; critique #9) |
| `--t-meta` | 13px / 1.4 | 14px / 1.4 | Inter 400, `--ink-muted` | Metadata, captions |
| `--t-eyebrow` | 11px | 12px | Inter 500, caps, 0.18em | Eyebrows, row labels, the dateline |

Rule: Cormorant never below 22px (`critique/brand.md`: a display cut pressed to body sizes "looks frail"). Body measure 62 to 68 characters (`--w-prose` 680px).

### 6.3 Rhythm and grid

The existing 8pt spacing tokens (`--s-1` to `--s-9`) with a 4px step for type. One phone gutter as a token, `--gutter: 16px` (critique #9: gutters drift between 16, 24, 32 and 48). Desktop: 12 columns inside `--w-default` (1180px), 24px gutters; reading pages a 680px column with a 240px note margin from about 1100px (C 3). Rows on rhythm pages are at least 48px so every row is a thumb target. Square corners, hairlines instead of shadows (kept).

### 6.4 Mustard

**One mark per screen, beside the link underlines.** On any screen with a band or a strip, the mustard is the tick for today. On an essay it is the versal (C 5's drop cap as the rubricator's one red mark). Links keep their 1px mustard underline, which is punctuation, not a mark. Eyebrows and row labels set in type use `--mustard-text` (5.27:1 on cream) or `--ink-muted`, never raw `--mustard` on a light surface (critique #9's AA failure). Never a fill, a button, a word inside a headline, or a bar on a card (`critique/brand.md`). With these rules a screen spends well under the contract's 8 percent.

### 6.5 Cream and black: day and night

**Cream is the day.** The week, the day's Morning, the table, every reading page. **Charcoal is weight and night.** On Home, the year band and the ending; elsewhere the verdict bands, the era heroes and the footer; never the default page header (`critique/brand.md`: black "used everywhere ... no longer marks weight"). Close of Day and Tonight are where the night palette (6.9) first matters.

### 6.6 Iconography and the house line

The house line grows from the seed the critique found, `client/public/article-art/covenant.svg`: a one-pixel ink line on cream with at most one mustard mark on the point that matters. A small glyph set drawn in that line at 24px: the strands (Read, Learn, Table, Think, Pray, Remember, Carry), the seasons (Advent, Christmas, Epiphany, Lent, Holy Week, Easter, Pentecost, All Saints), and, over time, one per tool to replace the 15 stock glyphs on 36 cards. The season symbols are also the drawings for the Advent and Holy Week door grids (B 23), from one hand for everything a family touches (B 25). Commissioned or drawn in-house; James approves (critique question 11).

### 6.7 Diagrams and data graphics: the band at four scales

| Scale | Where | Segments | The tick |
|---|---|---|---|
| The week | Home, the week, the day | Seven days, Sunday first | Today |
| The year | Home, `/year`, seasons | The seasons, sized by days | Today |
| The story | The chapter head, the 2027 plan, book pages | Eleven acts by days of the plan (day 1, 2, 5, 20, 73, 91, 184, 262, 280, 319, 360), a book's sections | The chapter |
| The church's two thousand years | `/theology/history`, era essays | Eras, councils as ticks, people as lines (B 8, B 12) | After Christendom, "you are here" |

Every band is inline SVG from tokens (one component, `components/study/Band.tsx`), labels in live text at 14px or more, drawn for 390px and again for about 880px (C 22), every segment a link, everything visible without hover, with a list equivalent beneath, no zoom, no canvas, no chart library. The doctrine map's three rings (A 8) are the only other figure on rhythm pages. There are no charts of people and no counts of readers anywhere (A tension 4).

### 6.8 Motion

Purposeful and few: a sheet rises (240ms, the existing `--ease`); a step of the office or the table cross-fades (about 200ms); a door in the Advent or Holy Week grid opens on its date (about 300ms); the reading header hides and returns. Nothing animates a number. Nothing autoplays. All of it stops under `prefers-reduced-motion` through the existing global guard and `lib/motion.ts`, and every state is reachable without it.

### 6.9 Dark mode: the night room

The pages this direction adds are read at night: Close of Day, Tonight, the anxiety page's "Why is my anxiety worse at night?" (critique #9). So The Week pulls dark mode forward from MASTER-PLAN 10.7, in order: finish the hero token audit; add a render test that mounts every hero and the new pages under `html.dark`; then follow `prefers-color-scheme` with *Paper · Night · Follow my phone* in the one Aa menu. At night every section sits in one low band (`--charcoal` and `--charcoal-soft` lifted for cards), cream text, the mustard tick unchanged (7.33:1 on charcoal), and `theme-color` follows the theme shown. Until the audit lands, everything ships light, and the office still works.

### 6.10 What The Week refuses, written as rules

The four tests (DH section 2) become rules a reviewer can check:

1. No streak, no count of days kept, no percentage, no badge, no "in a row," no "you missed," no "don't break."
2. The seven-day strip shows only the calendar and today. It never marks days the reader did something; a row of filled dots is a streak by another name.
3. Position is said in words and dates ("Last here: Sunday," "Week 3 of 8 begins Sunday"), never as a number to protect.
4. No push notifications; reminders only as calendar entries the reader writes to his own calendar (`lib/calendar.ts`).
5. No counts of people, no "latest," no "trending."
6. What a reader writes stays on the device and says so at the field; nothing about a person enters a URL or telemetry (C tension 8).

A copy check in `scripts/validate-design.mjs` (or a small `validate-rhythm-copy.mjs`) fails on those phrases in `client/src` strings, and a component test asserts that the strip reads no storage but the date.

### 6.11 Changes to the contract proposed to James

These are proposals, each with its reason; none goes into code before his answer.

1. **A text serif for words read long or said aloud** (Source Serif 4 or Literata, self-hosted, with a true italic) for Scripture, essays, the office, devotions, creeds and notes, Cormorant kept for display and Inter for the interface. *Reason:* a prayer said aloud and a chapter read at night are the core of this direction, and the critique's first type finding is that long reading is set in the button face with browser-faked italics (critique question 1). If he declines, the minimum is Inter's true italic.
2. **Dark mode switched on as "night," following the phone,** after the token audit. *Reason:* Close of Day and Tonight are night pages; today the site puts a screen of bright paper into dark-adapted eyes (critique #9).
3. **A dateline in the header** (the Decision Log line on the header). *Reason:* it is the week's only door and the only way a deep page says what week it is; desktop only on deep pages, so no phone first screen pays for it.
4. **Eyebrow labels on light surfaces in `--mustard-text`,** written into the typography table. *Reason:* the contract says eyebrows are "mustard color"; raw mustard on cream fails AA at 2.09:1 (critique #9).
5. **Name the church's year on LiveWell, lightly.** The great seasons by their plain names (Advent, Christmas, Lent, Holy Week, Easter, Pentecost, All Saints), dates only outside them, no lectionary vocabulary, and the remembered witnesses framed by Hebrews 12:1. *Reason:* this is an identity choice for a Baptist pastor's site, not a style choice; the household calendar already does it (U10, U13), and this proposal extends it to adults.
6. **A type scale as tokens, with Cormorant never below 22px,** added to the typography table. *Reason:* sizes today run from 44 to 80px with no scale (critique #7).

Not contract changes, but his alone: the season cadence (three or four a year; B 4 and C 17 disagree); each season's question and any letter; the office's fixed frame (approved once), whether the office belongs on LiveWell at all, and about thirty Examen lines; the catechism pins; whether the weekly letter replaces the current newsletter; the reuse license (C 11); retiring the theology quiz (a tool, and tools are never redirected under the Decision Log).

---

## 7. What it cuts or folds

| Today | In The Week | Why | Route |
|---|---|---|---|
| Home's black hero as the page header | A cream first screen with the week card; charcoal kept for the year band and the ending | Black should mark weight, not every header (`critique/brand.md`) | Same page |
| Home's tonight line and Continue (U18) | The Table row and the Course row of the week card | One module, not two; U18's helpers are reused | Same page |
| Home's "Also here, all free" line | *Courses that begin on a Sunday* | A sequence instead of a drawer (`critique/learning.md` C1) | Same page |
| Home's books band and second subscribe form | One line in the dark ending; one form | Depth over reach (critique question 9); "two forms in one scroll is a funnel" | Same page |
| `/family`'s separate "This week" panel | The shared week (same data, one place) | One source of truth for the week | Panel links to `/week` |
| U20's planned `/family/this-week` page | The week's print view; `/family/this-week` resolves to it | U20 is not built yet, so no churn | Resolver, no redirect |
| `SEARCH_SHORTCUTS` row | The week's rows and "Recently on this device" in search's empty state | C 18 | None |
| The theology quiz | The look-back at a season's end | It tests disposition, scores into a retired taxonomy and uses a forbidden word (`critique/learning.md` M3) | James's yes needed: tools are never redirected |
| Scripture Memory's "memorized" toggle, count and percentage | Kept, not memorized: the ladder | MASTER-PLAN section 2 already forbids the percentage (C 7) | Route stays |
| Proverbs in 31 days, the Prayer Planner's names, the Worry Journal's bedtime step, the Examen how-to | Parts of the day's office | One practice instead of four separate doors (C 16) | Tool routes stay |
| "Latest" on `/writing` | The season at the head of the shelf | Finitude over freshness (B 4, C 17) | Same page |
| The skeptic, new-believer and open-Bible plans under "Help in a hard season" | *Courses* under Study and on Home | "The placement tells the skeptic his questions are a pathology" (`critique/learning.md` C2) | `/plans/:slug` unchanged |
| The Story of the Bible's single "Start at the beginning" (Genesis 1 of 1,189, unpaced) | Three paced courses: the Gospel first, the whole story in 2027, every chapter | `critique/learning.md` M2 | Same pages |
| "Mark as read" on screen 12 of 13 | At the last verse | critique #1 | Same page |
| "69 of 72 · Weekly devotions · Week 44 of the year" | The date and the season | One position, in words (critique row for `/family/tonight`) | Same page |
| The skeptic track's lead magnet and in-page newsletter | Removed; the only offer is the host kit for his friend | B 2 | Same page |
| Generated covers on seven surfaces | Season images and the house line | C 22 | Same pages |
| `/nation` as an orphan | Folded into the after-Christendom topic page | critique #5 (James's question 12) | Not The Week's to decide; listed so it is not lost |
| Duplicate systems (critique #2) | One catechism (U40), one devotion system (U41) first; the rest by James's question 7 | The week cannot compose from two of anything | One-hop redirects, as the site already does |

---

## 8. Build path in this codebase

### 8.1 What The Week stands on (already built or in review)

This direction is mostly composition over work already done, which is its main engineering argument.

- **The clock.** U10's church-year rules and five-year map (`familyYear.generated.ts`, weeks Sunday to Saturday, seasons, set windows, the twelve-month horizon check); U12's `catechismWeekIndex` walking all 76; U17's `tonightOn` and family position (`livewell-progress-family-v1`); U28's 365-day plan with act starts and position on the device; U13's Advent copy and dates.
- **The frames.** U14's `Stepper`, `Sheet` and `PageHead`; `useWakeLock`; `ListenButton`; table mode (U17); the band switch, three-night split and *Remind me* (U21).
- **The joins.** U09's one reference parser; U16's `VerseRef` and the text-only chapter shards, psalms included; U15's Find.
- **The hand-off.** #534's *Take it with you*; U21's combined PDF with QR codes; `lib/calendar.ts`.
- **The record.** `lib/storage.ts`, `lib/telemetry.ts`, `lib/myProgress.ts` (U18's `continueHere`), `lib/library.ts`.
- **The memory.** U07's verified sources corpus and `verify-sources.mjs`.
- **The doors and topics.** U19's map; U25's topics index and three pages.
- **The precedent for Home.** U18 put tonight's title on Home without the network by generating titles into the year map; its entry chunk grew 4.8 KB gzip and Lighthouse stayed level. The week card follows the same pattern.

### 8.2 Phases

Each phase is a few units of one PR each, with James's gate where content or the contract is touched. Target dates follow the calendar the master plan already keeps.

**Phase 1. The week exists.** Target: Advent Sunday, November 29, 2026, if wave 3's merges have landed; otherwise Epiphany, January 6, 2027.
- **W1 The week map.** `scripts/build-week-map.mjs` and `client/src/lib/weekMap.generated.ts` (per week: the Sunday, season, the devotion's id and title, the catechism number and question with pins from `client/public/week-overrides.json`, Read labels per day by the rule in 2.4, the Think item from seasons, remembered ids); `--check` drift and horizon gates in CI; `client/src/lib/week.ts` (pure: `weekOf`, `dayOf`, `dateline`, `seasonLabel`); tests on the real dates in this document (Advent week 1, 2026; Holy Week 2027; the week of June 6, 2027; October 29, 2027, day 302). Budget: no more than 5 KB gzip added to the entry chunk, measured as U18 measured it; if over, Home imports the current year's slice after mount.
- **W2 The week page, the band and Home.** `/week`, `/week/:sunday` (9.3 checklist, `noindex` for dated weeks); `components/study/Band.tsx` for the strip; Home's week card replacing U18's tonight line (one in, one out; `Home.tsx` and `prerender-heads.mjs` change together for the reserved dateline row); the dateline in `MinimalNav.tsx` on desktop and on the named phone pages (James's gate: proposal 3). Telemetry: one `week_open` event with no personal data.
- **W3 For Sunday.** `/week/:sunday/print` (absorbs U20: one page at Letter and A4, QR code, *Take it with you*), `/family/this-week` as a resolver.

**Phase 2. Seasons and courses.** Target: No. 2 opens on Ash Wednesday, February 10, 2027; No. 1 can open in Advent 2026 as contents only if James has no letter ready.
- **W4 Seasons and the year.** `client/public/seasons/*.json`, `scripts/validate-seasons.mjs`, `/seasons`, `/seasons/:slug`, `/year`; the essay kicker "In No. n"; the season at the head of `/writing` (retiring *Latest*) and `/topics`; the booklet through `build-pdfs.mjs`. Gate: James chooses each season's question and cadence.
- **W5 Courses that begin on a Sunday.** `lib/runs.ts` (`?start=&cadence=`, the dated roadmap, one calendar file for every meeting, position on the device per course, the two-choice mercy rule) applied to `/plans/:slug` and `/studyguides/:slug`; `/study/courses`; *The Gospel first* generated from Mark's chapters; *Read Mark with a friend* (B 15) when its margin notes pass James's sample read.

**Phase 3. The day.** Target: Ash Wednesday, February 10, 2027; James approves the frame in January, after Advent and Christmas.
- **W6 Morning and Close of Day.** The thirty-day psalter table (the Prayer Book division, stored and checked against a public-domain copy before use, with a validator that every reference parses with U09's parser and resolves to a BSB shard); `/today`, `/day/:date`; the offices on `Stepper` with `useWakeLock` and a prayer-pace `ListenButton`; the Prayer Planner's list read in place; the Examen's choices; the private line with its return date; `office_complete`; the tools' separate doors in menus folded. Gate: whether the office belongs on LiveWell, the frame wording, about thirty Examen lines, the turn-over hour default.

**Phase 4. Doctrine, a question a week.** Target: after Easter 2027, with U40.
- **W7 The catechism spine.** U40's de-duplication first (question 7 decides baptism); the pins; `/study/catechism` with the doctrine map (A 8) and `/study/catechism/:n` over the existing fields; a joins file (catechism number to doctrine ids, creed phrase ids, glossary terms, debate pages) and its validator (A 6); the repaired drill (C 7) shared with U44's creeds.

**Phase 5. Carry and return.** With U32, U40 and U44, so the questions worth returning exist.
- **W8 The ladder.** `lib/review.ts` (`livewell-review-v1`, ids and dates only), the *Carry* block on the week, chapters, essays and devotions, *Last week* recall, *Ready to look at again* on the week and `/my-library`, the look-back and the closing component (A 15, C 6); one question shape and `scripts/validate-questions.mjs` (C 14).

**Phase 6. The church remembers.** After U30's registry.
- **W9 Remember and the source.** `remembered` on registry people with its basis, the Remember strand, *This week's source* pages (C 13), the cards and *Put them in order* (B 14), the Holy Week door grid (B 23) by Palm Sunday, March 21, 2027.

**Phase 7. Night.** In parallel, whenever the token audit can be staffed.
- **W10 Night.** The hero audit, the dark render test, *Paper · Night · Follow my phone* in the Aa menu (proposal 2), the day and the table first.

**The shared lane** (needed by every direction; scheduled from the critique, not from this one): the reading surface (the text serif if approved, U23 and U24 for essays, U37 and A 1 to 3 for chapters), one search (critique #3), consolidation (question 7), the history course (U30 to U33).

### 8.3 Against the master plan's units

- **Changed:** U18 (its tonight line and Continue fold into the week card); U20 (becomes the week's print view); U28 (gains the Read rule's set-week overlay and, before 2028, a generated 2028 plan or the "every chapter" course, so the Read strand does not end on December 31, 2027); U40 (gains the pins and the question pages); U44 (shares the drill and ladder); U49 (*The church remembers* becomes the Remember strand and its family edition); 10.7's dark mode (brought forward as W10).
- **New:** W1 to W10 above.
- **Prerequisite, already planned:** U41 (one devotion system, so the Table strand reads one set in one translation), U30 (the registry), U32 (the session template).
- **Retired by The Week:** the separate `/family` "This week" panel, *Latest* on `/writing`, the static search shortcuts, the theology quiz (with James's yes).
- **No API change.** Everything is static data generated at build time and read on the client. Neither `api/index.ts` nor `server/` changes, so `api-parity.test.ts` is untouched. If the weekly letter is ever generated by the site rather than pasted into Substack, that is a separate decision and probably a separate runtime question.

### 8.4 Risks, in order

1. **The skeptic meets a devotional site.** A rhythm-first home could read as a prayer app for insiders, and the skeptic is the reader the contract ranks first. *Held by:* the first phone screen names him and gives him a door before the week card; the week card shows real content anyone can read; the office and the table never appear on skeptic-facing pages (`/answers`, Test the Case, the Doubt essays); his pages ask for nothing (B 2); his rhythm offers are opt-in and private ("Bring this back in a week"). A judge from the skeptic's seat should test exactly this.
2. **Streak creep.** The strip, "We did this tonight," "Mark as read" and course positions can become a streak by accretion, one reasonable feature at a time. *Held by:* section 6.10's rules, the copy check, the strip test, and the four tests applied in review of every rhythm feature.
3. **The cadence outruns James.** *Held by:* daily is Scripture and the calendar; weekly is composed from what exists; only seasons need his writing, and a season with no letter simply has none. Never promise a letter, a season or an issue he has not written (B tension 1).
4. **Incoherent weeks.** Four clocks side by side can feel random (section 1's seams). *Held by:* the Read rule, the catechism pins, and generated coherence lines only where the data shares a tag; never a forced bridge.
5. **Time is hard.** Time zones (read the reader's own date after mount; `localISODate`), the prerender (no date in static HTML except the reserved row), the map's horizon (U10's build failure under twelve months), Advent's changing length (U13 already met it), the 2027 plan ending (8.3), daylight saving (U12 counts calendar days). *Held by:* W1's real-date tests.
6. **First paint and weight on Home.** *Held by:* U18's pattern and budget, reserved heights, Lighthouse measured as U18 measured it, no new network call before mount.
7. **A Baptist site and the church's year.** Some readers will hear the calendar as foreign. *Held by:* only the great seasons by plain names, no lectionary vocabulary, remembrance framed by Hebrews 12:1, and James's decision (proposal 5).
8. **Privacy at the most personal points.** Prayer names, Examen lines and carried answers are the most sensitive things the site would hold. *Held by:* device only, said at the field, never in a URL or an event, no third-party script on `/day` (C 16, C tension 8).
9. **Dated pages and search engines.** Hundreds of generated weeks could look like thin content. *Held by:* `noindex, follow` on dated weeks and days, literal meta on `/week`, `/today` and `/year`, seasons indexed.
10. **James's review load.** Pins, the office frame, Examen lines, season questions, *In brief* checks and *Read Mark with a friend* all touch his name. *Held by:* sample review per batch (his rule of 2026-10-26), and every gate scheduled outside Advent and Holy Week.

### 8.5 How we will know it worked

By the contract's measures, not reach (critique question 24), all as aggregate events with no personal data: returning devices by week; `office_complete` by office; `family_devotion_complete` (U17); course weeks walked; essays finished; *For Sunday* prints. And one qualitative test from the Formation Standard, asked of a reader at the end of a season: is he more thoughtful, more humble, more rooted, better able to see? A week is the right length to ask it, because by then he has come back.
