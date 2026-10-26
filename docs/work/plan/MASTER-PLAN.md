# LiveWell Master Plan

Prepared 2026-10-26 by the lead planner, from the four research files in this
folder (`inventory-content.md`, `inventory-family.md`,
`inventory-tools-design.md`, `benchmark.md`), `docs/work/NOTES.md`, the
surviving church history consensus, and a read of the code on
`claude/todo-implementation-hhp4bm` (main at 3f204cd, #534). Nothing outside
`docs/work/plan/` was changed to write it.

It answers James's direction of 2026-10-26 ("very functional ... interactive,
and modern ... study tools ... the articles to be very engaging ... family
devotions ... tools and family devotions and topics ... truly help people live
in a post-Christian nation"), read together with 2026-10-14 (the church history
study, doubled, "the best church history study available ... very
interactive") and 2026-10-12 ("a very simple clean site that I continue to add
to ... run that real tight").

---

## 0. How to use this plan (agents read this first)

1. Read `CLAUDE.md` in full, then this file, then the research file for your
   lane, then `docs/work/NOTES.md`. Content agents also read
   `docs/VOICE-JAMES-BELL.md`, `docs/EDITORIAL-CONSTITUTION.md`, and
   `docs/work/essays/BRIEF.md`.
2. Pick the next unit in your lane from the roadmap (section 10) whose
   dependencies are merged. Create `docs/work/plan/units/<ID>.md` from the
   unit card, mark it `in progress` in `docs/work/plan/STATUS.md`, and keep the
   checklist there as you go.
3. **Persistence rule.** A container reset already cost 47 finished essays.
   Every draft, ledger, data file in progress, and screenshot lives under
   `docs/work/` and is committed and pushed within 15 minutes of being
   written. Never draft in the scratchpad or `/tmp`. Code units work on their
   own branch off `main` and push at every green checkpoint. Section 10.4 has
   the folder map.
4. One unit is one PR. James merges. A unit that grows past its size estimate
   stops and splits rather than becoming a large PR.
5. Done means seen: `pnpm check`, `pnpm test`, the validators the unit
   touches, `pnpm build`, and a look at the changed pages at 390 x 844 and
   1440 x 900 (method at the end of `inventory-tools-design.md`), screenshots
   saved to `docs/work/plan/shots/<ID>/`. Report what was not verified.

---

## 1. The short version

LiveWell already owns more serious material than almost any site in its field:
a Study Bible with notes on all 1,189 chapters, 40 care pages, 29 eight-week
plans, 68 group study guides, 41 context guides, 14 creeds, a church history
page with 22 essays, 72 weekly family devotions and a 76-question catechism.
What it lacks is not volume. It lacks five things a reader would notice in the
first minute:

1. **A reason to touch anything.** The home page and most hubs are prose for a
   full phone screen before the first control. Nothing says "tonight," "today,"
   or "continue," and you cannot look up a verse.
2. **Joins.** Scripture references are dead text everywhere except the Study
   Bible; essays, devotions, plans, and history do not hand the reader to each
   other.
3. **The essays.** 15 of 58 shelf essays are public, all in the older
   register; the 47 rewrites were lost; the Doubt, American Church, and
   Marriage sections are empty, and the ladder of guides, answers, and paths
   built around them is missing its middle rungs.
4. **A family product.** The household material is sound and generic, hidden
   seventh in a menu, and has no "tonight," no per-devotion address, no table
   mode, and nothing on the world a Christian child now walks into.
5. **The church history study James asked for.** It is a reading page with
   tabs 7.8 phone screens down.

The plan answers each with the smallest set of moves that serve every reader
at once:

- **Joins first.** One verse component (`VerseRef`) and passage lookup make
  every page a door into the Study Bible. One set of study primitives (sheet,
  tabs, stepper, source card, check yourself, myth check) replaces the
  hand-rolled controls.
- **The Table.** The family devotions become a weeknight tool: tonight's
  devotion in two taps, one step per screen at the table, two age bands, a
  weekly rhythm keyed to the church year, printables, progress on the device,
  and a new strand on the world we live in.
- **Topics.** A small, hand-built set (ten pages, never more than twelve) on
  the hard questions of post-Christian life, each assembled from what exists:
  an essay, Scripture read in its world, a witness from church history,
  practices, a conversation for the table, and tools. Personal needs keep their
  canonical home at Find Help.
- **The essays redone** to the approved pilots' standard, section by section,
  each switching back on the guides, answers, and paths built for it; and an
  essay page that reaches the first sentence on the first screen and turns
  every reference into a door.
- **The church history course** built from a verified primary-source
  backbone and a connected registry, vertical slice first, one Part per PR.
- **A calmer, more modern frame:** a compact page head in place of the
  charcoal prose hero on every inner page, the instrument on screen one, and
  dark mode switched on only after the tokens can carry it.

The calendar sets the order. The midterm is Tuesday, November 3. Thanksgiving
is Thursday, November 26. Advent begins Sunday, November 29. The New Year
Bible-reading spike is January 1. Lent begins Wednesday, February 10, 2027;
Easter is March 28, 2027. Phase 1 exists to put The Table and Advent in front
of families before November 29.

---

## 2. Rules that bind every unit

These come from CLAUDE.md, the Decision Log, and the research. They are
listed so no unit has to rediscover them.

- **Calm, simple, serious.** Unhurried, weighted, grown-up. One column for
  reading. Cream is the room; mustard is punctuation under 8% of any viewport;
  cream and black alternate and never three in a row.
- **Interactivity where it helps a person learn, find, remember, or do; never
  inside the argument.** Myth checks, retrieval questions, recite modes,
  lookup, timelines, table mode: yes. Streaks, badges, points, scores on
  anyone's spiritual life, carousels, autoplay, scroll-jacking, parallax,
  animated counters, pop-up email modals, an AI chat box, social-proof
  counters, a map library, a zoomable canvas timeline: no.
- **Position, not performance.** "Week 14 of the year" and "Session 3 of 6"
  are fine. "7-day streak" and "68% complete" are not.
- **State lives where it belongs.** Shareable state (a tab, a filter, a council,
  a person) goes in the URL. Personal state (progress, saved verses, answers)
  goes on the device through `lib/storage.ts`, said plainly ("on this
  device"). No reader accounts; cross-device sync is an auth and schema change
  that needs James first.
- **Tokens only.** Inline styles referencing `:root` variables; new hover,
  focus, and media rules as classes in `client/src/index.css` with a
  lane prefix (`.st-` study primitives, `.tb-` The Table, `.hx-` history,
  `.tp-` topics, `.pg-` page head). No new hex or `rgba()` literals in
  components. Every new component is checked in light and with `html.dark`
  forced on, even before dark mode ships.
- **First paint.** Static masthead and home hero from `prerender-heads.mjs`;
  nothing on Home or the header waits on the network; local storage is read
  after mount. Any change to the home hero changes `Home.tsx` and
  `scripts/prerender-heads.mjs` together.
- **Literal meta.** Every new page declares `<SEOMeta title="…"
  description="…">` as string literals.
- **Helpers, not hand-rolls.** `lib/fetch-json.ts` plus `LoadFailed` (no
  infinite "Loading…"), `lib/storage.ts`, `lib/clipboard.ts`,
  `components/Markdown.tsx`, `TakeItWithYou` and `ToolActions` (#534),
  `lib/calendar.ts` reminders, `lib/library.ts` (My Library).
- **Two runtimes.** Only one unit in this plan touches the API (U26, the
  `/writing` listing). It changes `server/` and `api/index.ts` together and
  keeps `api-parity.test.ts` green.
- **The Decision Log holds.** Five header doors, the never-redirected list
  (`/study/*`, church history, `/theology/doctrine/*`, creeds, context guides,
  `/downloads`, `/nation`, `/help`, every tool in `/tools`), and `/theology/history`
  URLs kept with no new redirects there. Anything that would change these is an
  open question for James (section 12), never a unit's own decision.
- **Integrity.** No invented quotation, date, study, statistic, person, or
  biographical line. James's biography is limited to what NOTES confirms. No
  figure from `benchmark.md` reaches the site until it is checked against the
  primary report. Contested second-order questions are stated fairly and left
  open, and the held essays wait for James.

---

## 3. The reader's experience

### 3.1 Who arrives, and what each can do in the first minute

The site writes toward the skeptic and wins the tie for him, but on an
ordinary evening most arrivals are parents and Christians with a question.
Each of the five readers below gets one obvious first move, and the first
minute is designed so that move is visible on the first phone screen.

**The skeptic** usually arrives from search or a shared link, often straight
onto an essay or an Honest Answer. In the first minute he should meet James's
argument in the first sentence (not chrome and generated art), see that the
claims are checkable (a sources list, references that open the text), and find
a way to keep pushing: *Is Christianity actually true?* on the Topics door,
Test the Case, the Doubt essays. The page he lands on never asks him for
anything.

**The doubting Christian** arrives tired of being handled. Topics gives her
the question in her own words with a short answer that does not resolve it too
fast, then the history ("the church has sat in this dark before"), then the
essay. Find Help is one tap away when the doubt has become a crisis.

**The pastor** arrives from PCN or a forwarded essay. In the first minute he
should see that everything is free to print and use with his people: every
essay with discussion questions and a group guide, every history session with
leader notes and a handout, and *This week at your table*, a one-page sheet he
can put in the bulletin or forward on Sunday night.

**The parent** arrives on a weeknight with ten minutes. Two taps from Home:
*Tonight at the table*, then table mode, one step per screen, read aloud if
she wants. The devotion knows the season (Advent from November 29), offers a
younger and an older set of questions, and on some weeks speaks to the world
her children actually live in.

**The seeker and the hurting reader** arrive with a Tuesday-afternoon problem:
a marriage, a phone, money, grief. Find Help already serves them best on the
site and stays in the header. Topics hands any personal question straight to
its care page instead of making a second page about it.

### 3.2 The home page, phone first

Keep James's headline, portrait, and the two paragraphs he chose (#533). Below
them, in this order:

1. **Find.** One field: "Look up a passage or ask a question." "John 3:16"
   goes to the verse in the Study Bible; "christian nationalism" goes to the
   topic; anything else goes to `/search` with results. (U09)
2. **Today**, read from committed data and the device after mount, no network:
   *Tonight at the table* (this week's devotion, or the Advent day in
   season), *Today in Proverbs* (the date-matched chapter that the Proverbs in
   31 Days tool already uses), and *Continue* (the essay, plan, session, or
   self-check this device started, from `myProgress.ts`). Hidden entirely when
   there is nothing to show. (U11)
3. **The doors**, one line each, set as a contents page as today: Study,
   Topics, Family, Essays, Books.
4. **Questions people are carrying**: six topics in the words people type.
5. **Start with these**: three essays (see question 2 for which).
6. The books, the newsletter, the quiet line to Find Help, as now.

The hero stays the first paint. Find and Today render on mount; neither waits
on the API.

### 3.3 The doors

**Today:** Study, Essays, Books, Resources, About, beside Find Help, search,
and Subscribe. Family is the seventh link under Resources; nothing in the
header says "topics."

**Recommended (James decides, question 1):** five doors, renamed for what the
2026-10-26 direction names, with Books moving under About.

| Door | Landing | Holds |
|---|---|---|
| Study | `/study` | The Study Bible, Church history, Creeds, The Bible in its world (context guides), Study with a group, Study tools (`/tools`), Read the Bible in its world (plan) |
| Topics | `/topics` | The hard questions (topic pages and rows to care pages), Honest answers (`/answers`), Eight-week plans (`/plans`) |
| Family | `/family` | Tonight at the table, The year of devotions, The catechism, The church year, Reading plans, When the news comes to dinner, Family tools, This week at your table, Printables |
| Essays | `/writing` | The shelf by section, Start with these, Latest |
| About | `/about` | About James, Books (`/books` and the three titles), Speaking, Contact, Newsletter, PCN, the podcast |

Find Help, search (now with passage lookup), Subscribe, and My Library stay in
the utility row. `/resources` stays live as the one-page list of everything to
use, linked from the foot of each door's menu and the footer; `/tools` stays
as the tools registry.

**Why the change is worth asking for.** James named family devotions, topics,
and tools on 2026-10-26; none is visible in today's header, and the benchmark
names parents as the hinge audience. The count stays at five, so the site stays
as simple as he approved. Books lose a header slot but keep the home row and
gain a natural home under the man who wrote them.

**If James says no,** nothing in this plan blocks: Home carries Family and
Topics doors, the Resources group gains primary links (For families first), and
the Essays group gains Topics as a primary link. Both are within the Decision
Log's own wording ("Resources holds ... families"). Either way the change is one
small PR (U12): `client/src/lib/siteNav.ts`, `client/src/lib/site-structure.test.ts`,
`client/src/lib/siteNav.test.tsx`, the footer, `SEARCH_SHORTCUTS`, and the
Decision Log line in CLAUDE.md once James has said yes.

---

## 4. Topics: the hard questions of life in post-Christian America

### 4.1 What a topic is, and what it is not

A topic page is a hand-built assembly of what the site already has around one
question people are carrying about faith in a post-Christian country. It is
not a new library and not a revival of the pillar hubs folded on 2026-10-12
(`/justice`, `/disruption`, `/post-christian`, `/exile`, the capture pages).
Those failed because they were categories with thin pages under them. A topic
is one question with one answer path.

Three rules keep it tight:

1. **Ten topic pages, never more than twelve.** Each needs a reason a care page,
   an essay section, or a study page cannot serve.
2. **Personal needs keep their home at Find Help.** Fear, anxiety, grief,
   suffering, loneliness, marriage, money, and work are listed on `/topics` in
   the reader's words, and the row opens the care page directly. No second page
   on the same need.
3. **Never an empty slot.** When the lead essay is still pending, the data
   names the best live stand-in (the care page, the plan, or the study guide),
   and the page shows that instead of a gap.

### 4.2 The topics, ranked by need

Ranked by the benchmark's demand evidence weighed against the central question
in the Editorial Constitution and the readiness of existing material. "Wave"
is when the page can ship well.

| # | Asked as | Slug | Why it ranks here | Lead essay (status) | Built from (exists) | Missing | Wave |
|---|---|---|---|---|---|---|---|
| 1 | What does it mean that America is post-Christian, and how do we live in it? | `living-after-christendom` | The mission's own question; 8 in 10 Americans say religion is losing influence (Pew 2024, verify before printing) | *What "Post-Christian" Actually Means* (pilot, ready) | Study guide `after-christendom`; context `exile-not-empire`, `jeremiah-29-11-in-context`; pilot *When the Church Had Nothing to Lose*; history Part I | Family devotion on exile (U21) | 1 |
| 2 | What is Christian nationalism, and how should a Christian think about politics? | `faith-politics-and-the-flag` | Pew and PRRI show rising awareness; pastors name political division as a reason to quit; the midterm is November 3 | *What Christian Nationalism Is, and What It Is Not* (pilot, ready); *Was America Founded as a Christian Nation?* (pilot) | Care `politics`; studies `christian-nationalism`, `the-captive-church`, `church-and-empire`; context `romans-13-1-in-context`, `2-chronicles-7-14-in-context`, `left-lens-right-lens`, `the-kingdom-is-not-a-platform`; tools Consistency Check, Party Scorecard, If We Had a Biblical Government, Which Lens; live essays `when-the-church-married-empire`, `the-conservative-blind-spot`, `the-progressive-blind-spot` | Family "Politics at the table" and "Praying for leaders" (U05) | 1 |
| 3 | Can I trust the Bible, and how do I read it? | `trusting-and-reading-the-bible` | The largest, best-documented demand in the benchmark | `why-trust-the-bible` (pending; stand-in: care `trust-the-bible`) | Care `trust-the-bible`, `reading-the-bible`; plans `reading-the-bible`, `skeptic`; context "verses everyone quotes" set, `the-bible-is-not-an-american-book`, `did-the-gospels-get-jesus-right`; pilot on slavery; Study Bible; Misused Verses; Test the Case | New Year plan (U18) | 1 |
| 4 | How do we hand the faith to our kids in a secular age? | `raising-children-in-a-secular-age` | Parents carry three of the top four topics; talking about faith at home is what predicts children keeping it (research, verify) | `what-fatherhood-requires` (pending; stand-in: care `family-devotions`) | Care `family-devotions`, `parenting`, `fatherless`; plans `parenting`, `fatherless`; studies `raising-believers`, `parenting-formation`, `fatherhood`, `youth-who-am-i`; The Table; catechism; Parent and Teen, Parenting Stage Guide | James's "raising sons" essay (question 4) | 1 |
| 5 | Is Christianity actually true? | `is-christianity-true` | 42% of adults say they have deconstructed (Barna 2024, verify); the skeptic is the reader the site writes toward | Doubt section (pending, U17; stand-in: plan `skeptic`) | 35 Honest Answers; Test the Case; care `curious`, `doubt`, `deconstructing`; plans `doubt`, `deconstruction`, `skeptic`; studies `doubt`, `deconstruction`, `skeptic`, `resurrection` | Doubt essays (U17) | 1 |
| 6 | What are phones and AI doing to us and our kids? | `phones-screens-and-ai` | *The Anxious Generation*, state phone bans, and a third of adults trusting AI's spiritual guidance like a pastor's (Barna and Gloo 2026, verify) | `the-machine-that-forms-you` (pending) | Study `attention`, `habits-and-formation`; Everyday Life technology guide; how-tos on the family screen covenant and the screen conversation by age; care `pornography` | AI discernment guide (U30); family "Truth in the feed" (U21) | 2 |
| 7 | Can I trust the church after what it did? | `when-the-church-fails` | Mars Hill's audience; hypocrisy and hurt among the top reasons people leave | `doubt-after-church-abuse` (pending; stand-in: care `church-hurt`) | Care and plan `church-hurt`; study `alone-in-a-crowded-church`; the blind-spot essays; history reckoning sessions | Family "When the church fails" (U21) | 2 |
| 8 | Why are Sunday mornings still divided, and what did the church do about slavery? | `race-and-the-churchs-past` | High for pastors; the slavery pilot is approved and ready to lead it | *Why Didn't the Bible Just Ban Slavery?* (pilot) | Pending `where-church-was-silent-history-injustice-reckoning`, `black-church-prophetic-justice` (join the page when U39 ships); `/justice/timeline`, `/justice/witnesses`; context `the-slavery-texts`, `what-justice-meant` | The American Church essays (U39) | 2 |
| 9 | My neighbors believe something else. Is Christianity too narrow? | `neighbors-who-believe-differently` | Plain search question; the pluralism every child meets at school | Honest Answer (stand-in) | Answers; theology questions; catechism Q73; context `the-gods-of-the-nations` | Family "Neighbors" (U21) | 3 |
| 10 | What does the church actually teach about sex, gender, and the body? | `the-body-sex-and-identity` | Strong need, the subject parents most want help with | Held | Care `pornography`, `is-it-a-sin`; Everyday Life sex and the body; study `the-image-of-god` | James's position (question 3) | Held |

Rows on `/topics` that open a care page directly: *I can't stop worrying*
(`/help/anxiety`), *I'm afraid of where the country is going*
(`/help/fear-of-the-future`), *Why does God allow suffering?*
(`/help/suffering`), *I'm grieving* (`/help/grief`), *I feel alone, even at
church* (`/help/loneliness`, with a short new section on finding a church after
a move or after hurt added to that care page), *My marriage is in trouble*
(`/help/marriage`), *Money and work* (`/help/money`, `/help/purpose`). The
church history question (*Why are there so many denominations?*) opens
`/theology/traditions`.

### 4.3 What every topic page holds

In this order, each section optional only where the data says why:

1. **The question** as H1, in the asked-as words, and a short answer of 150 to
   250 words in the mature register (derived from the Honest Answer where one
   exists, under the same "nothing not in the source" rule).
2. **Read this first:** one essay, with minutes and the first line; or its
   named stand-in. Up to two further essays below it.
3. **What Scripture says, read in its world:** three to five passages, each a
   `VerseRef` that opens the Study Bible, each with one line and, where one
   exists, the context guide.
4. **The church has been here before:** one or two witnesses from church
   history, each linking to a history session or an entity sheet.
5. **For this week:** two or three practices, drawn from the care page's steps
   or the plan's first week, with a link to the eight-week plan.
6. **At the table:** the family devotion for this topic (younger and older
   questions), and the conversation card where the news makes one useful.
7. **Tools:** one to three from the registry.
8. **With a group:** the study guide and discussion guide.
9. **If this is more than a question:** the care page, with the crisis line
   where self-harm or abuse could be in view.
10. **Go deeper:** the Everyday Life guide, how-tos, wisdom topics (capped at
    six links; `SubjectShelf` may fill this from `lib/subjects.ts` when the
    hand-picked list is short).
11. Take it with you: a one-page printable topic sheet.

### 4.4 Data and code

- `client/public/topics/<slug>.json`, one per topic, and `topics-index.json`
  (the `/topics` list, including the care-page rows), built by
  `scripts/build-topics-index.mjs`.
- Shape: `{ slug, title, askedAs[], short, essay, essayStandIn, alsoEssays[],
  scripture[{ ref, line, context? }], witnesses[{ entity|session, line }],
  practices[{ title, text, from }], plan, table{ devotion, card? },
  tools[], group{ study, discussion? }, care{ href, line, crisis? },
  deeper[], updated, reviewed }`.
- `scripts/validate-topics.mjs`: every href resolves to a live route, a public
  essay (through `isPublicEssay`), or a named stand-in; every reference parses
  with `parseRef`; no slot empty without a stand-in; Forbidden Language, no
  em-dash, no exclamation outside quoted Scripture; at most twelve topic pages.
- Pages: `client/src/pages/Topics.tsx` (`/topics`) and
  `client/src/pages/Topic.tsx` (`/topics/:slug`), built from `PageHead`,
  `EditorialIndex`, `SectionHead`, and `VerseRef`; sitemap and llms.txt entries;
  search entries.

---

## 5. Family devotions: The Table

### 5.1 The product

A family opens LiveWell on a weeknight, taps *Tonight at the table*, and in ten
minutes reads a passage, talks about one idea, answers questions pitched at
their children's ages, does one small thing, and prays. The site remembers
where they are on that device and nothing else. On Sunday a pastor can hand his
church the same week on one page.

It is built from what exists (72 weekly devotions, 40 seasonal, the 76-question
catechism, four reading plans, the Devotion Builder's 40 age-banded pieces, the
family care page and how-tos) plus three new strands.

### 5.2 Structure of one devotion

Every devotion keeps the shape families already know and adds two optional
parts:

| Step | What | Source |
|---|---|---|
| Read | The passage in full (BSB, verbatim, validated), with "Listen" and a link into the Study Bible chapter | existing `passage`, `passageText` |
| Talk | The big idea in one line, and a reflection of 100 to 160 words to read aloud | existing `bigIdea`, `reflection` |
| Ask | Three questions for younger children (about 4 to 10) and three for older (about 11 to 17); "together" shows both | existing `questions` become `questions.younger`; `questions.older` written new or taken from the Builder's teen band where the theme matches; never faked |
| Do | One activity | existing `activity` |
| Remember | This week's catechism question (child's answer, call and answer) or memory verse | catechism, linked by week |
| Pray | A short prayer | existing `prayer` |
| Witness (some weeks) | A paragraph on one person from church history, with a link to the session or entity sheet | new, from the history registry (U31) |
| For the grown-ups (some weeks) | One line and a link to the topic page or essay behind tonight | new, from topics |

The card promises ten minutes. Families who want three short nights instead of
one get a suggested split (Read and Talk; Ask and Do; Remember and Pray), and
"Remind me" sets weekly calendar reminders through `lib/calendar.ts`.

### 5.3 Ages and households

Two bands, *younger* and *older*, with *together* as the default for a mixed
table. The Builder's teen writing (the best family writing on the site) becomes
the seed of the older band. Notes on the family-devotions care page for the
single parent, the split-week home, and the believer married to an unbeliever
become a short "If your table looks different" panel on `/family`, so that care
reaches the devotions themselves. Couples, grandparents, and a household rule of
life are later work (section 10.3), not launch.

### 5.4 The year and the weekly rhythm

One devotion a week, chosen by the calendar, with three strands:

- **Foundations:** the existing 72, de-duplicated (the `forgiveness` and
  `obedience` collisions, the two "Made On Purpose" titles), run on a two-year
  cycle so all of them are used.
- **The world we live in** (new, U21): about one week a month, on what a
  Christian child now meets: being the only Christian kid in class; why we go
  to church when friends do not; exiles in Babylon (Jeremiah 29, Daniel); Jesus
  is Lord and the flag is not (the coin, Mark 12:13-17); praying for leaders we
  did not vote for (1 Timothy 2:1-2); politics at the table; why Christians do
  bad things; truth in the feed (phones, AI, what is real); neighbors who
  believe something else; fear and the future; when someone dies or a family
  breaks. The body and identity waits for James (question 3).
- **The church remembers** (new, U31): about one week a month, a family
  edition of the history course (candidates, each fact verified first:
  Polycarp, Perpetua and Felicity, Nicaea, Augustine, Patrick, the monks who
  kept the books, Tyndale, the Anabaptists, Richard Allen, Wilberforce and the
  people who resisted the trade, Barmen and Bonhoeffer, and a witness from the
  church outside the West).

The church year overrides the plain week when in season: Advent (from the first
Sunday of Advent, November 29 in 2026, not December 1), Christmas and
Epiphany, Lent (from Ash Wednesday, February 10, 2027), Holy Week, Easter's
fifty days, Pentecost (May 16, 2027), All Saints, and Thanksgiving. A plain
committed file, `client/public/family/year.json`, maps dates to devotion ids,
so "tonight" never needs a server.

### 5.5 What changes on screen

- **`/family`** opens on *Tonight at the table* (title, passage, ten minutes,
  "Start"), then *This week* (the catechism question and the weekly sheet),
  then the season, then the library (all devotions by strand and theme), the
  catechism, reading plans, tools, and "If your table looks different."
- **`/family/tonight`** resolves to tonight's devotion, so a printed card's QR
  code, a reminder, and Home can all point at one address.
- **`/family/devotions/:id`** gives every devotion its own page, title, and
  share link, replacing the accordion (which also fixes the duplicate-id bug).
- **Table mode** (`?mode=table`): large type, one step per screen, Next and Back
  at the bottom in thumb reach, Listen on the passage (the existing
  `ListenButton`), a band switch, and the screen kept awake with the Screen Wake
  Lock API where the browser supports it. Ends on "We did this tonight," which
  records the date on the device.
- **Progress:** `livewell-progress-family-v1` holds the start date, band, and
  the dates devotions were done. The page shows position ("Week 14 of the
  year"; "Last time: Exiles in Babylon, Tuesday") and never a streak.
- **Scripture in place:** passages and reading-plan days become `VerseRef`
  links into `/study/bible/:book/:chapter`.
- **One system:** the Devotion Builder (`/tools/family-devotions`, which stays a
  route because tools never redirect) reads the same data, in the same
  translation, and becomes "plan a term" over it.
- **Catechism you can learn:** de-duplicated to its distinct questions, "this
  week" reaching every question, a recite mode (parent asks, child answers,
  reveal), and printable fridge cards.

### 5.6 Printables and the weekly sheet

Existing: devotion cards (two to a page), Advent and Holy Week booklets, plan
booklets, workbooks. New: a card per devotion with a QR code to its page, the
catechism cards, the family reading plans, a Lent booklet, and *This week at
your table* (`/family/this-week`): the week's devotion, the catechism question,
one question for the table, and, when there is one, the essay behind it, on one
printable page with "Take it with you" send and print. It is the thing a pastor
forwards on Sunday night; the channel is question 7.

### 5.7 Translation

The family set already uses the Berean Standard Bible and `validate-family.mjs`
checks it against the site's own text. Keep BSB for the whole household (and
convert the Builder from KJV), because the Study Bible is BSB, so a child who
taps the passage sees the same words; a child memorizes one wording; and the
full passages can print without quotation limits. Essays and sessions keep
quoting ESV. Each surface names its translation. This follows the CLAUDE.md
rule that a translation is named when the choice is doing work; James can
overrule it (question 8).

### 5.8 Repairs that come first (U04)

From `inventory-family.md`: duplicate devotion ids; "72 weeks" labeled as a
year; the catechism's `weekOfYear()` capped at 52 so Q53 to 76 never appear;
duplicate catechism questions (baptism handled two ways is James's call,
question 3); the catalogue's "52-question" copy; infinite "Loading…" on all
three family pages; Advent starting December 1 and the day 24 order; four
translations; `/for-families` landing on `/parenting`; hardcoded `rgba()` in the
heroes; "Ages 1--3" in the Stage Guide; and a structural family validator (unique
ids, unique questions, counts that match the copy, bands present where claimed).

---

## 6. Engaging articles

### 6.1 The shelf, redone

Fifty-two essays: the five approved pilots and 47 to rewrite (40 pending shelf
essays plus seven new ones, listed in NOTES), with three held for James and the
raising-sons essay waiting on his story. The process is the one that produced
the pilots, now with every step written down under `docs/work/essays/` as it
happens:

1. Draft to `docs/work/essays/<slug>.md` from `BRIEF.md`.
2. Claims ledger `docs/work/essays/ledgers/<slug>.md`: every date, name,
   quotation, statistic, and Scripture reference, with its source and who
   checked it.
3. Voice edit against `VOICE-JAMES-BELL.md` and the pilots; the stamp list and
   the AI-tell list in `BRIEF.md`.
4. Audit by a second agent reading as the skeptic and as a pastor.
5. Convert to `client/public/essays/<slug>.json`, run
   `node scripts/build-essays-index.mjs` and `validate-essays.mjs`.
6. Reconnect what was built for it (below), add the 301s for the old slugs it
   absorbs (listed in NOTES), and ship the section in one PR.

Order, by what each section switches on: Doubt and Hard Questions (the
skeptic's section; restores the essay rung for Honest Answers, three Skeptic's
Track stops, four discussion guides); Faith and Power with After Christendom
(the mission's center; lets the `/nation` essays fold if James agrees); The
Ancient Church (coordinated with the history course, whose sessions cover the
same ground in more depth, so the essays are written as essays, not sessions);
The American Church; Reading the Bible in Its World; Marriage, Family and
Ordinary Faithfulness.

**Reconnection with each section:** re-derive each Honest Answer whose essay was
rewritten (the answers promise nothing not in the essay); read each matching
discussion guide against the new text before its "Use this with your small
group" link reappears; point the four study guides that promise five James
Bell essays (`christian-nationalism`, `church-and-empire`, `economic-justice`,
`pastoral-health`) at the rewrites or change their summary line; fix the three
"8-Week Study" titles that hold five sessions; re-point the Skeptic's Track so
it can switch on.

**The fifteen live essays** wait on question 2. Either way: finish the blurbs in
`shelf.json` that stop mid-sentence, label book chapters as such ("From *The
Monster in the Mirror*, chapter 1"), and send the unconfirmed first-person
lines in `women-in-church-history` to James.

### 6.2 The essay page

Ranked by value. Every item stays single column, cream, quiet, and
interruption-free.

1. **The first sentence on the first phone screen.** Contents card closed by
   default under 760 px; reading tools in one row; generated art moved below
   the opening section or dropped where there is no real cover. Measure it on a
   preview (the inventory's 1,500 px figure is computed, not measured).
2. **Every reference is a door.** References in the body render through
   `VerseRef`: a quiet link that opens the chapter in the Study Bible. In
   essays the link goes to the chapter rather than previewing BSB text beside
   an ESV quotation.
3. **Scripture as Scripture; pull-quotes rare.** Block Scripture renders as
   Scripture with its reference. The share card is reserved for one or two
   lines the essay marks as pull-quotes (a `pullQuotes` field), not every
   blockquote.
4. **Questions and a group guide behind them.** An optional `questions` field
   (three to five) renders "To think about, or talk about" after the body, with
   "Use this with your small group" to the full guide. Every shelf essay gets
   both in its section PR.
5. **Sources.** An optional `sources` field renders a short list of the books
   and primary texts the essay names, so the skeptic can check.
6. **Oriented in a long argument.** The progress bar measures the essay body,
   not the page; minutes left beside it; the reader's place remembered on the
   device with "Pick up where you left off" on `/writing` and Home; a slim
   sticky line naming the current section on long essays.
7. **Related, by hand.** A `related` field (two to four validated links to any
   format: the context guide, the Honest Answer, the study guide, the history
   session, the topic).
8. **Series order.** "Essay 2 of 6 in The Mirror" in the kicker and "Next in
   this section" at the foot.
9. **An honest date.** "Revised October 2026" from the rewrite's `updated`.
10. **A way to answer back.** "Write to James about this essay" opens the
    contact form with the title filled in.
11. **Before and after,** sparingly: for history and hard-question essays, one
    "What do you think now?" choice before reading, shown again at the end, kept
    on the device only (`MythCheck`).
12. **James's own voice,** recorded, for the start-with essays and the pilots,
    if he will make them (question 4).

Smaller: `/writing` asks the API for the shelf's slugs only instead of all 959
published rows (both runtimes, U26); search indexes a rewrite's own text; the
shelf blurbs are finished.

Refused: streaks, badges, or completion percentages on the shelf; inline verse
previews beside ESV quotations; a right rail; autoplaying audio; anything
between sections.

---

## 7. Study tools

### 7.1 The Study Bible

It is the best instrument on the site; the work is reach and thumbs.

- **Passage lookup everywhere** (U09): the header search, `/search`, the Study
  Bible front door, and the reader accept "John 3:16," "jn 3 16," "Romans 13."
  `parseRef` in `lib/bible.ts` already exists.
- **`VerseRef` site-wide** (U07): one component and one in-house remark plugin
  for `Markdown.tsx` turn references into links; on study surfaces (devotions,
  plans, context guides, creeds, history, topics) a tap shows the verse from
  `/bible/ch/<book>/<n>.json` in a sheet (BSB, named), with "Open in the Study
  Bible." `ScriptureRef` points at the Study Bible, not the Passage Context
  tool.
- **Thumbs** (U19): the whole verse is the tap target, not a 24 px number; the
  text starts on screen one, with the chapter summary behind "About this
  chapter"; a sticky bar with a two-tap book and chapter picker; related site
  content loaded only when asked (not the 372 KB catalogue on every chapter);
  save a verse or a note to My Library on the device.
- **Words** (U44): self-hosted Greek and Hebrew faces (OFL, e.g. Gentium Plus,
  Ezra SIL or Noto Serif Hebrew), loaded only on Bible routes; "how often this
  word occurs," with every occurrence one tap away, from a build-time index
  sharded by Strong's number.
- **Read the Bible in its world** (U18): a 60-day plan for the new readers the
  2025 data describes, pairing Study Bible chapters with context guides, with
  per-day progress on the device and a phone reminder, live by December 20.

### 7.2 The church history study

James's ask: double it, make it the best church history study available, very
interactive, in his tone, and truly teaching. The consensus that survived the
reset sets the shape; this section makes it buildable.

**Scale.** About two and a half times today's study. Today: 7 eras, 68 events,
11 councils, 10 heresies, 36 people (2 women), 22 essays of about 57,000 words.
Target: 34 sessions of 3,000 to 4,000 words (about 120,000 words of course),
about 170 events, 25 councils, 25 controversies, 90 to 100 people (at least 20
women, the Black church, and the church outside the West after Augustine),
about 60 places, and about 80 primary sources with verified excerpts.

**The course.** Nine Parts, one PR each after the slice. Session titles are
working titles; every date and fact below is a candidate to verify, not a
claim.

| Part | Sessions (about) | Ground |
|---|---|---|
| 0. How to Read the Dead | 1 | Method: what a primary source is, how to read the people we disagree with, why we read our own faults into theirs |
| I. The Church Without Power (to 313) | 6 | The Jerusalem church; Paul's cities; under Rome (the approved pilot); the martyrs (Polycarp, Lyon 177, Perpetua 203); what they believed and how they chose their books; ordinary life, the poor, the plague, the exposed children |
| II. The Church Given Power (313 to 600) | 6 | Constantine; Nicaea 325; the long fight to 381; the desert; Augustine and the two cities; Chalcedon 451 and the churches that parted; the first reckoning, Callinicum 388 and Thessalonica 390 |
| III. The Long Middle (600 to 1500) | 5 | Benedict and the books; the mission north (Patrick, Boniface); the church of the East to China; 1054; the Crusades (a reckoning); Francis; Wycliffe and Hus |
| IV. Reformations (1500 to 1650) | 5 | Luther; the Reformed; the Anabaptists (Schleitheim 1527); Trent; Tyndale and the English Bible; the wars of religion to 1648 (a reckoning) |
| V. Revival, Reason, and Mission (1650 to 1900) | 4 | Pietism and Wesley; the Enlightenment's challenge; the slave trade, the church's complicity and its abolitionists (a reckoning); the missionary century and its entanglements |
| VI. The American Experiment | 4 | Roger Williams and the Baptists; the awakenings; the Black church (Richard Allen) and "the Christianity of this land"; the Civil War as a theological crisis |
| VII. The Twentieth Century | 4 | Fundamentalism and modernism; Barmen and the German Christians (a reckoning); civil rights and the church; the global church's growth |
| VIII. After Christendom | 3 | The Religious Right and the culture war; the church in post-Christian America; reading your own moment (synthesis) |

Each Part keeps its existing era essays as "readings," linked from the session
that covers their ground. The two overlapping essay series become one ordered
reading list; nothing under `/theology/history` redirects.

**A session page** (`/theology/history/session/:slug`):

1. **Before you read:** a myth check of two to four statements ("true," "false,"
   "it's complicated"), kept on the device and shown again at the end.
2. **The story,** 3,000 to 4,000 words in James's register, interleaved with
   **source cards** (a verbatim excerpt, author, work, date, translator,
   public-domain basis, "read more of this source") and ESV Scripture with the
   reference. People, places, and councils in the text open their entity sheet.
3. **How it looked from the other side:** one fair statement of the losing or
   opposing position, in the form its defenders would sign.
4. **Where we do this too:** one mirror, with the writer inside it.
5. **Check yourself:** three to five retrieval questions; tap to reveal; no
   score.
6. **Talk about it:** discussion questions.
7. **For leaders** (behind a toggle): a 45 and a 75-minute plan, the answers
   behind the questions, cautions, and what to do when the room gets heated.
8. **Handout:** a printable page (key dates, the source excerpts, the
   questions), built with the existing PDF pipeline.
9. **Where and when:** a small strip of the session's events and a link into
   the timeline and atlas.
10. Next session; position on the device ("Session 3 of 6 in Part I").

**The registry.** One connected set of committed JSON, read by every view:

- `client/public/history/registry/people.json`, `events.json`,
  `places.json` (with coordinates), `councils.json`, `controversies.json`
  (the ten heresies migrate here, each a question with its positions, the
  council, the creed, and where it returns today), `sources.json` (author,
  work, date, translator, edition, public-domain basis, origin URL and commit).
- `client/public/history/sources/<id>.json`: the verified excerpts.
- `client/public/history/sessions/<slug>.json`: `{ slug, part, n, title,
  standfirst, minutes, mythCheck[], blocks[{ type: prose|source|scripture,
  ... }], otherSide, mirror, retrieval[], discussion[], leader, handout,
  entities[], readings[], updated, reviewed }`. Blocks keep source cards and
  Scripture structured, so the validator can check every quotation.
- Migration: the four `client/public/theology/church-history-*.json` files are
  generated from the registry so existing readers keep working; the justice
  timeline and the two witnesses pages later read from the registry too (their
  URLs stay).

**The views,** all list-first and URL-addressable:

- **Course front door** (`/theology/history`): the Parts and sessions, "continue"
  from the device, then the views; the reading list below. The interactive part
  starts on the first screen.
- **Entity sheets** (`/theology/history/people/:id`, `/events/:id`,
  `/councils/:id`, `/places/:id`, `/sources/:id`): open as a bottom sheet from a
  session, or as a page from a link. Every person entry cites its source.
- **Timeline** (`/theology/history/timeline`): a list by century with an era jump
  bar and filters (Part, kind, region) in the URL; a row opens its sheet.
- **Contemporaries** (`/theology/history/contemporaries`): choose a person, see
  who else was alive, computed from life dates.
- **Councils and controversies** (`/theology/history/controversies`): each
  question, each position at full strength, what was decided, the creed text,
  where it returns today.
- **Atlas** (`/theology/history/atlas`): a few inline SVG base maps drawn once
  from public-domain Natural Earth outlines and committed, colored from tokens,
  places plotted from the registry. No map library.

Static routes are registered before `/theology/history/:slug`, and the
validator forbids an essay slug that collides with a view name.

**Integrity gates** (U14, U15): every source-card excerpt must be a normalized
substring of the stored public-domain text it cites
(`scripts/verify-sources.mjs`); ESV quotations match the ESV cache
(`verify-esv.mjs`); registry ids are unique and every cross-reference resolves;
every person has a citation; no biography beyond the sources; modern sources
still under copyright (Barmen in English, King's letter) are quoted briefly with
attribution or summarized, and the source record says which. Sources come first
from the public-domain ANF and NPNF translations in
`HistoricalChristianFaith/Writings-Database` (reachable through
raw.githubusercontent.com; avoid its machine-translated Migne material), and
from pre-1930 public-domain translations for non-patristic texts, with
provenance kept in `docs/work/history/sources/PROVENANCE.md`.

**Vertical slice first** (U20): *How to Read the Dead*, the Rome session built
on the approved pilot, Nicaea, and Callinicum and Thessalonica as the first
reckoning, with the registry entries they need, the session template, entity
sheets, the timeline for those entries, a handout, and leader notes. Previewed
to James on a Vercel preview before any Part is written.

**The family edition** is The Table's "church remembers" strand (U31), each
devotion linked to its session.

### 7.3 Creeds and context guides

- **Creeds you can learn** (U33): tap a phrase to open its annotation in place
  (today they are a list after the text); compare Nicaea 325 with 381 and the
  Apostles' with the Nicene side by side; a memorize mode reusing Scripture
  Memory's first-letter drill; each creed linked to its council's entity sheet.
  Full public-domain texts of the summarized confessions are content work, later.
- **Context guides that reveal** (U34): on the ten "verses everyone quotes"
  guides, a "what we hear / what the first readers heard" reveal, with the verse
  one tap away.

### 7.4 The tools registry

Thirty-six tools, several excellent, several overlapping, with stale copy.
Without redirecting anything (the Decision Log keeps every registered tool):

- Put the Study Bible in the registry, first.
- Regroup so the post-Christian instruments (Consistency Check, Party Scorecard,
  If We Had a Biblical Government, Which Lens) sit second, under a plain title,
  and pair them with the politics topic.
- Rewrite the nine descriptions that name retired sections, and fix Which
  Lens's "Enter the pillar" ending (`WhichLens.tsx:106-139`).
- Make the Passage Context tool read the site's own BSB text instead of
  `bible-api.com` (WEB), and stop loading its 710 KB notes file up front.
- Instrument on screen one: `PageHead` in place of the charcoal hero on tool
  pages (U35).

The folds that would need redirects (Deep Bible Companion, the Bible Study
Guide, and the Passage Context tool into the Study Bible; the Life Audit with the
Whole-Life Assessment; one topical-verse front door) are question 5.

---

## 8. Design modernization

The brand is an asset: cream, charcoal, mustard, Cormorant and Inter,
self-hosted, a serious book. What reads dated is the layout grammar laid over
it. The changes below keep the brand and change the grammar.

**Page heads.** Reserve the full charcoal prose hero for Home and About. Every
other page gets `PageHead` (`client/src/components/editorial/PageHead.tsx`):
eyebrow, H1, one line, optional actions, and then the thing itself on the first
phone screen. Left-aligned everywhere (tool pages center today). Applied to
tools, self-checks, hubs, history, family, topics (U35).

**Study primitives** (`client/src/components/study/`, U06), built on the Radix
primitives already installed and chunked (`vendor-ui`, 11 KB gzip) and restyled
to tokens:

- `Sheet`: a bottom sheet on phones, a side panel at 1024 px and up, with
  focus trap and close; used by `VerseRef`, entity sheets, word panels.
- `Tabs`: URL-synced (history views, family library, topics).
- `Disclosure`: for leader notes, "About this chapter," the contents card.
- `Stepper`: one step per screen with Back and Next at the bottom (table mode,
  self-checks, recite mode).
- `Position`: a quiet "3 of 6" marker; no percentages.
- `StickyContext`: a slim bar with the title and current section (long essays,
  sessions, the Study Bible).
- `SourceCard`, `CheckYourself`, `MythCheck`, `EntityChip`.

All CSS in `index.css` under `.st-`; reduced motion respected through the
existing motion tokens; 44 px targets; focus visible; tested with testing
library for keyboard and ARIA.

**Cards and lists.** Retire the white boxed card with a 4 px colored left rule
(tools hub, Deep Bible), the most dated element on the site, in favor of
`EditorialIndex` rows and `CardGrid`. Long pages get an in-page jump bar
(`StickyContext` with section links) rather than more scrolling: the Study Bible
front door (15 screens), history (18), context (17), study guides (23).

**Home** as in 3.2 (U11).

**Reading pages** as in 6.2 (U10, U22).

**Drawn teaching, sparingly.** The atlas and the session "where and when"
strips; a handful of hand-built inline SVG figures (Paul's cities, where the
councils met) colored from tokens. No chart or map library.

**Phone first.** Designed at 390 px with a 16 px gutter, no sideways scroll,
44 px targets, controls in thumb reach at the bottom where a hand holds the
phone (table mode, the Study Bible picker).

**Light and dark.** Dark mode is off today for a good reason (`App.tsx` notes
heroes that mix flipping and non-flipping tokens and turn invisible). The plan:
every new component is built and screenshotted with `html.dark` forced on from
U06 onward; U45 then tokenizes the 664 `rgba()` literals and Deep Bible's 81
hex values, fixes hero pairings, collapses the misleading alias tokens
(`--oxblood`, `--rust`, `--gold` equal to mustard; `--forest` equal to
charcoal), and turns on `switchable` with the system preference as default,
behind a Playwright screenshot check of 20 key routes in both themes. The admin
stays light through `.admin-scope`.

**Type.** Remove the thirty `fontWeight: 300` requests no shipped face supplies;
add Greek and Hebrew faces only on Bible routes (U44).

---

## 9. Quality gates

**Existing, keep green:** typecheck; the 22 content validators in
`.github/workflows/ci.yml`; Vitest (server and client, including the
~260-route smoke test, `site-structure.test.ts`, `ToolsHub.test.ts`); build; the
canonical audit. The non-blocking quality job (Lighthouse and axe on home)
already fails Lighthouse on home; that failure predates this plan and U36 owns
it.

**New validators, added to the content-gates step as each lands:**

| Script | Checks | Unit |
|---|---|---|
| `validate-essays.mjs` | Override shape and new fields; Forbidden Language; no em-dash; no exclamation outside quoted Scripture; links only to public pages; references present and parseable; the BRIEF's rulebook-leakage list ("steelman," "verdict," "indictment," "self-implication," "both-sidesism" in prose) | U02 |
| `verify-esv.mjs` | Every ESV quotation in essays, topics, and sessions matches `scripts/data/esv-verified.json` (reference to verified text) after normalizing quotes and spacing | U02 |
| scope extensions | `validate-grow-voice.mjs` and `validate-no-emdash.mjs` cover essays, history, family, topics, context, nation, pathways | U02, U04 |
| `validate-family.mjs` (extended) | Unique ids and questions; counts match copy; bands present where claimed; year map resolves; one translation per surface | U04 |
| `validate-topics.mjs` | Section 4.4 | U16 |
| `validate-history.mjs` | Registry integrity, citations, session completeness, slug and view-name collisions | U15 |
| `verify-sources.mjs` | Every excerpt is in its stored public-domain text; provenance present | U14 |
| `check-payload-budget.mjs` | Per-route JSON and JS budgets (one chapter plus the shards it opens; no unrelated indexes); warning first, blocking once green | U36 |

**The ESV cache.** `scripts/data/esv-verified.json` holds only verses the site
quotes, each entered once from a checked source and recorded with who checked it
and how. It is a build-time fixture within Crossway's quotation terms (check the
current notice when the file is created). The cleanest source is the free ESV
API with James's key, used only at build time and stored as a secret (question
6); without one, each verse is checked by hand against a print ESV and the
ledger says so.

**Human gates, written down per piece:** the claims ledger; a second-agent read
as the skeptic and as the pastor; James's review for anything biographical,
first-person, or contested; the Formation Test from CLAUDE.md for essays,
sessions, and topics.

**Crisis care.** Any topic, devotion, or card touching self-harm, abuse, death,
or sexuality carries a `care` link to its Find Help page; where self-harm could
be in view, the 988 line; where abuse by a church leader is in view, the line
that it should be reported to the authorities; never a diagnosis; never advice
posing as professional. The topic and family validators check the field is
present on pages tagged sensitive.

**Accessibility.** Primitives tested for keyboard and ARIA; 44 px targets;
contrast of mustard text uses `--mustard-text` on cream; Playwright plus axe on
ten key routes against the local build in the quality job (non-blocking at
first).

**Performance.** Diagnose the home Lighthouse failure before fixing it
(candidates, unverified: the portrait served from the legacy CloudFront host,
render-blocking CSS); bring the portrait and the other CloudFront references
in-house; the Study Bible's payload rule ("its own chapter and the shards it
opens") becomes the rule for every study page; history stops loading 300 KB of
unrelated indexes.

---

## 10. Build roadmap

### 10.1 Sizes and lanes

Sizes are honest agent effort: **S** half a day or less; **M** one to two days;
**L** three to five days; **XL** more than a week (split before starting where
the card says how). Content units are dominated by writing and checking, not
code.

Five lanes run in parallel, each owning its hot files to avoid conflicts:

| Lane | Owns | Shares (small hunks, rebase before PR) |
|---|---|---|
| Platform | `components/study/`, `components/VerseRef.tsx`, `lib/siteSearch.ts`, `StudyBible.tsx` and `study-bible/`, `ToolsHub.tsx`, perf and dark mode | `index.css` (`.st-` block), `App.tsx` routes |
| Essays | `client/public/essays/`, `shelf.json`, `ArticleDetail.tsx`, `Writing.tsx`, `data/answers.ts`, `data/discussion-guides.ts` | `vercel.json` (append 301s), `site-structure.test.ts` |
| Family | `client/public/family*`, `pages/Family*.tsx`, `FamilyDevotionBuilder.tsx` | `index.css` (`.tb-`), `App.tsx` |
| History | `client/public/history/`, `pages/TheologyHistory.tsx`, `pages/history/` | `index.css` (`.hx-`), `App.tsx` |
| Topics and frame | `client/public/topics/`, `pages/Topic*.tsx`, `Home.tsx`, `siteNav.ts`, folds | `prerender-heads.mjs`, `vercel.json` |

### 10.2 The calendar

| Date | What must be live |
|---|---|
| Tue Nov 3 | The two politics pilots; `/help/politics` surfaced; if ready, the two politics family pieces (U02, U03, U05) |
| Wed Nov 25 | The Table, Advent redated, Home's Tonight, the weekly sheet, `VerseRef` (U04, U06 to U13) |
| Sun Nov 29 | Advent begins |
| Sun Dec 20 | The New Year plan (U18); the history slice in preview for James (U20) |
| Fri Jan 1 | First five topic pages; the Doubt essays (U16, U17) |
| Wed Feb 3 | The Lent family set and booklet, a week before Ash Wednesday, Feb 10 (U23) |
| Sun Mar 21 | Holy Week (existing set, surfaced by the year map) |
| Sun Mar 28 | Easter; Parts I and II of the course live (U28, U29) |
| Sun May 16 | Pentecost devotions (U23) |

### 10.3 The units, in priority order

| ID | Unit | Lane | Size | Depends on | Target |
|---|---|---|---|---|---|
| U01 | Work hygiene and status board | all | S | none | Oct 27 |
| U02 | Essay integrity gates and ESV cache | Essays | M | U01 | Oct 29 |
| U03 | Ship the five pilots | Essays | S | U02 | Oct 31 |
| U04 | Family repairs and structural validator | Family | M | U01 | Nov 6 |
| U05 | Before the vote | Family, Topics | S to M | U03 | Nov 2 or Thanksgiving |
| U06 | Study primitives and PageHead | Platform | L | U01 | Nov 10 |
| U07 | VerseRef: every reference opens the Study Bible | Platform | M | U06 | Nov 13 |
| U08 | The Table | Family | L | U04, U06, U07 | Nov 20 |
| U09 | Find: passage lookup and plain-language search | Platform | M | U01 | Nov 13 |
| U10 | Essay page, part one | Essays | M | U03, U07 | Nov 20 |
| U11 | Home: Find, Today, the doors | Topics and frame | M | U08, U09 | Nov 24 |
| U12 | Navigation | Topics and frame | S | question 1 | Nov 24 |
| U13 | This week at your table | Family | M | U08 | Nov 25 |
| U14 | History sources corpus and verifier | History | M | U01 | Nov 20 |
| U15 | History registry, entity sheets, timeline | History | L | U06, U14 | Dec 4 |
| U16 | Topics: registry, index, first five pages | Topics and frame | L | U03, U07 | Dec 18 |
| U17 | Essays: Doubt and Hard Questions | Essays | XL (split 5 and 4) | U02, U10 | Jan 1 |
| U18 | Read the Bible in its world (New Year plan) | Platform | M | U07 | Dec 20 |
| U19 | Study Bible for thumbs | Platform | L | U06 | Dec 18 |
| U20 | History session template and vertical slice | History | XL (split template and content) | U14, U15 | Dec 20 preview |
| U21 | The world we live in (family set) | Family | L | U08 | first four by Nov 25, rest by Jan 15 |
| U22 | Essay page, part two | Essays | M | U10 | Jan 8 |
| U23 | The church year for households | Family | L | U08 | Lent by Feb 3 |
| U24 | Catechism you can learn | Family | M | U04, question 3 | Jan 22 |
| U25 | One devotion system | Family | M | U08 | Jan 29 |
| U26 | `/writing` asks for the shelf only (both runtimes) | Essays | S | none | Dec 4 |
| U27 | Essays: Faith and Power, After Christendom | Essays | XL (split by section) | U17 | Feb 12 |
| U28 | History Part I | History | XL | U20 approved | Mar 5 |
| U29 | History Part II | History | XL | U28 | Mar 26 |
| U30 | Topics wave 2 and the AI discernment guide | Topics and frame | L | U16 | Feb 19 |
| U31 | The church remembers (family history set) | Family | M | U15, U20 | Feb 26 |
| U32 | Tools registry tightening | Platform | M | U06 | Jan 15 |
| U33 | Creeds you can learn | Platform | M | U06, U15 | Feb 5 |
| U34 | Context guides that reveal | Platform | S to M | U06, U07 | Feb 12 |
| U35 | Page heads and card retirement across the site | Platform | M | U06 | Jan 29 |
| U36 | Performance: home Lighthouse and payload budgets | Platform | M | none | Jan 8 |
| U37 | When the news comes to dinner | Family, Topics | M | U08, U16 | Feb 26 |
| U38 | Essays: The Ancient Church | Essays | L | U27, U20 | Mar 19 |
| U39 | Essays: The American Church | Essays | L | U27 | Apr 16 |
| U40 | Essays: Reading the Bible in Its World | Essays | L | U27 | May 7 |
| U41 | Essays: Marriage, Family and Ordinary Faithfulness | Essays | M to L | U27, questions 3 and 4 | May 28 |
| U42 | History Parts III to VIII | History | 6 x XL | U29 | one Part every three weeks from April |
| U43 | Atlas, contemporaries, councils and controversies | History | L | U15 | Apr 30 |
| U44 | Greek and Hebrew, word occurrences | Platform | L | U19 | Mar 12 |
| U45 | Dark mode | Platform | XL (split tokenize, pair, enable) | U35 | May |
| U46 | Folds James approved | Topics and frame | M | questions 2, 5 | after answers |
| U47 | Cleanup of dead code and data | Platform | S to M | none | Jan 15 |
| U48 | One reading-order source; pathways into topics | Topics and frame | M | U41 | June |
| U49 | What the numbers say | Topics and frame | L | U16 | June |
### 10.4 Where work in progress lives

```
docs/work/
  NOTES.md                 decisions, append-only
  autosave.sh              commits and pushes docs/work (U01 makes it branch-aware)
  james/QUESTIONS.md       the open questions as sent; ANSWERS.md his words, verbatim
  plan/MASTER-PLAN.md      this file
  plan/STATUS.md           one row per unit: owner, branch, status, PR
  plan/units/<ID>.md       each unit's brief, checklist, and notes
  plan/shots/<ID>/         screenshots that verified the unit
  essays/<slug>.md         drafts; essays/ledgers/<slug>.md claims ledgers; essays/LEDGER.md status of all 52
  history/sessions/<slug>.md, history/registry/*.json, history/sources/ (raw texts, PROVENANCE.md), history/ledgers/
  family/<strand>/<id>.md  drafts; family/ledgers/
  topics/<slug>.md         drafts
  verify/                  ESV cache staging, fact-check logs
```

### 10.5 Unit cards

Each card: scope, files, done when. Dependencies and sizes are in the table.

**U01 Work hygiene and status board.** Make `docs/work/autosave.sh` take the
current branch (it pushes only `claude/todo-implementation-hhp4bm` today) and
document running it in every session; create `plan/STATUS.md`, `plan/units/`,
`james/QUESTIONS.md` (section 12 as sent), `essays/LEDGER.md` (52 rows from
NOTES). Files: `docs/work/` only. Done when a test commit from a feature branch
is pushed by the script.

**U02 Essay integrity gates and ESV cache.** Write `scripts/validate-essays.mjs`
and `scripts/verify-esv.mjs`; create `scripts/data/esv-verified.json` with the
pilots' verses (checked per section 9); extend `validate-grow-voice.mjs` and
`validate-no-emdash.mjs` to `client/public/essays`; add both new scripts to
`ci.yml`. Files: `scripts/`, `.github/workflows/ci.yml`. Done when the gates
pass on an empty essays folder and fail on a seeded bad file in a test.

**U03 Ship the five pilots.** Remove the 79 em-dashes without changing meaning
(verbatim quotations keep their own punctuation); add shelf entries for
`what-post-christian-means` (After Christendom) and
`was-america-founded-as-a-christian-nation` (Faith and Power); write
`client/public/essays/<slug>.json` for each; run `build-essays-index.mjs`; add the
301s for slugs the pilots absorb (`witness-without-power` to
`the-early-church-under-rome`, and the two nationalism slugs in NOTES) only where
the destination is public and the old slug is not itself a shelf entry
(`site-structure.test.ts` enforces both). Files: `client/public/essays/`,
`client/src/lib/shelf.json`, `essayOverrides.generated.ts`, `vercel.json`,
App.tsx stubs. Done when all five render, validators pass, `validate-links.mjs`
passes.

**U04 Family repairs and structural validator.** Section 5.8 in full. Files:
`client/public/family-*.json`, `pages/FamilyDevotions.tsx`,
`FamilyCatechism.tsx`, `FamilyReadingPlans.tsx`, `Family.tsx`,
`scripts/build-catalogue.mjs`, `scripts/validate-family.mjs`,
`scripts/lib/help-printables.mjs` (Advent booklet dates), `vercel.json` and
App.tsx (`/for-families` to `/family`), `tools/ParentingGuide.tsx` (age range).
Done when the validator fails on a seeded duplicate and passes on the repaired
data, and the Advent booklet starts on November 29.

**U05 Before the vote.** Two short family pieces in the existing devotion shape
("Praying for leaders we did not choose," 1 Timothy 2:1-2; "When the grown-ups
vote differently," a conversation card for the table), written in the mature
register, steelmanned in both political directions, BSB verified; surface
`/help/politics` and the two politics pilots on `/family` and on the Faith and
Power shelf. Ship by November 2 only if the pieces have passed the claims ledger
and a second read; otherwise ship for Thanksgiving week. Files:
`client/public/family-devotions-*.json` (or the new strand file), `Family.tsx`.

**U06 Study primitives and PageHead.** Section 8's primitives on Radix, token
styles under `.st-` and `.pg-`, testing-library tests for keyboard and ARIA,
screenshots in light and forced dark. Adopt in one page each to prove them
(the history tabs, one self-check). Files: `client/src/components/study/*`,
`components/editorial/PageHead.tsx`, `index.css`. Size L; split Sheet and Tabs
first if it runs long.

**U07 VerseRef.** `components/VerseRef.tsx` (link mode for essays, sheet mode
for study surfaces, BSB named); a small in-house remark plugin in
`Markdown.tsx` that turns references into `VerseRef` (no new dependency; walk
text nodes); `ScriptureRef.tsx` re-pointed to the Study Bible; references made
live in devotions, catechism, reading plans, plans, context guides, creeds,
history essays. Reuse `parseRef` and `chapterHref` from `lib/bible.ts`. Done when
John 3:16 in a context guide opens the verse sheet and the Study Bible, and an
unparseable reference renders as plain text.

**U08 The Table.** Sections 5.2 to 5.5: `/family/tonight`,
`/family/devotions/:id`, table mode, bands (older questions only where real),
progress, `year.json`, "Remind me," `/family` reorganized with Tonight first,
"If your table looks different." Files: new `pages/family/Tonight.tsx`,
`DevotionPage.tsx`, `TableMode.tsx`; `Family.tsx`, `FamilyDevotions.tsx`
(becomes the library); `client/public/family/year.json`; App.tsx routes with
literal SEOMeta; sitemap; printables per devotion with QR codes. Done when a
phone can go from Home to step one of tonight's devotion in two taps and finish
it at the table.

**U09 Find.** `lib/siteSearch.ts`: recognize references first (to the verse),
stop words for plain questions, and add wisdom topics, Honest Answers, family
devotions and catechism, Christ and the Nation, and (later) topics to the
sources; the header search, `/search`, and a "Go to" field on the Study Bible
front door and reader. Files: `lib/siteSearch.ts` and its test, `pages/Search.tsx`,
the header search component, `StudyBible.tsx`. Done when "John 3:16," "jn 3 16,"
"how to talk to my kids about God," and "is america a christian nation" each
return the right thing in a test.

**U10 Essay page, part one.** Items 1, 2, 3, 6, 8, 9 of 6.2. Files:
`ArticleDetail.tsx`, `ReadingProgressBar.tsx`, `lib/shelf.ts`,
`useEssayCompletion.ts`, `Writing.tsx`, `lib/html-body.ts`, `index.css`. Done when
the first sentence of each pilot is on the first 390 px screen (measured on a
preview) and references link into the Study Bible.

**U11 Home.** Section 3.2: Find, Today (read after mount), Family and Topics
doors (Topics hidden until U16 ships, then shown), Questions people are carrying.
Files: `Home.tsx`, `scripts/prerender-heads.mjs` (hero unchanged unless needed),
`index.css` `.home-` block. Done when first paint is unchanged, Lighthouse on
home is no worse, and the Today strip is empty-safe.

**U12 Navigation.** The approved or interim door set (section 3.3). Files:
`lib/siteNav.ts`, `site-structure.test.ts`, `siteNav.test.tsx`, footer,
`SEARCH_SHORTCUTS`; the Decision Log line in CLAUDE.md only after James's yes.

**U13 This week at your table.** `/family/this-week`, print-first, with Take It
With You; optionally 52 weekly PDFs from `build-pdfs.mjs`. Files: new page,
`scripts/build-pdfs.mjs` or `scripts/lib/help-printables.mjs`. Channel per
question 7.

**U14 History sources corpus and verifier.** Fetch the specific ANF and NPNF
works the slice and Part I need (Pliny's letter 10.96 from a public-domain
translation, the Martyrdom of Polycarp, Eusebius on Lyon, the Passion of
Perpetua, Ambrose's letters on Callinicum and Thessalonica, the Nicene Creed of
325, Athanasius, Augustine) into `docs/work/history/sources/raw/` with
provenance (repository, commit, path, translator, edition, public-domain basis);
write `scripts/verify-sources.mjs`. Done when a seeded altered excerpt fails.

**U15 History registry, entity sheets, timeline.** Registry files and schema;
migration of the four existing files (and generation of the old files from the
registry so nothing breaks); `scripts/validate-history.mjs`; entity sheet pages
and the sheet view; the list-first timeline with URL filters; the course front
door with the interactive part on the first screen; tabs in the URL; the
`LoadFailed` fix (`TheologyHistory.tsx:50`); stop loading unrelated indexes.
Files: `client/public/history/registry/`, `pages/TheologyHistory.tsx`,
`pages/history/*`, App.tsx (static views before `:slug`), `scripts/`.

**U16 Topics.** Section 4.4: build script, validator, `/topics`, `/topics/:slug`;
topics 1 to 5 from the table in 4.2; sitemap, llms.txt, search entries; the care
page rows. Files: `client/public/topics/`, `pages/Topics.tsx`, `Topic.tsx`,
`scripts/build-topics-index.mjs`, `scripts/validate-topics.mjs`, App.tsx.

**U17 Essays: Doubt and Hard Questions.** The nine pending essays in the
`doubt` section of `shelf.json` (`excavation-not-demolition`,
`why-trust-the-bible`, `the-historical-jesus`, `did-the-resurrection-happen`,
`why-does-god-allow-suffering`, `why-does-god-feel-far-away`,
`can-you-be-good-without-god`, `did-god-command-genocide`,
`doubt-after-church-abuse`) through the section 6.1 process, each with
questions, sources, related, and a discussion guide; re-derive the Honest Answers;
re-point the Skeptic's Track and switch it on if every stop is public; 301s from
NOTES. Split into two PRs of five and four.

**U18 Read the Bible in its world.** A 60-day plan as data (day, chapter, the
context guide or Study Bible note to read with it, one question), a page under
`/study/bible/guides` with progress and a reminder. Files:
`client/public/bible/guides/` or a new plan file, `StudyBibleGuides.tsx`.

**U19 Study Bible for thumbs.** Section 7.1, thumbs bullet. Files:
`StudyBible.tsx`, `study-bible/ChapterNotes.tsx`, `VerseNotes.tsx`, `shared.tsx`,
`lib/library.ts` (verse and note items). Done when John 3 shows text on the first
phone screen and every verse is a 44 px target.

**U20 History session template and vertical slice.** Split: U20a the session
page, blocks renderer, myth check, check yourself, leader toggle, handout PDF
(M to L); U20b the four sessions with their registry entries, claims ledgers,
quote ledgers, and ESV ledgers (L). Preview link to James with three questions:
is the voice his, is the depth right, is the length right.

**U21 The world we live in.** Twelve devotions, each with younger and older
questions, a witness where one fits, a topic link, and crisis care where
needed; first four (exile, the coin, praying for leaders, politics at the table)
by November 25 if U05 did not ship them. Files: a new strand file under
`client/public/family/`, `docs/work/family/world/`.

**U22 Essay page, part two.** Items 4, 5, 7, 10, 11 of 6.2, and the
`questions`, `sources`, `related`, `pullQuotes` fields in the essay JSON, in
`build-essays-index.mjs`, and in `validate-essays.mjs`.

**U23 The church year.** A Lent set and booklet (live by February 3), Easter's
fifty days, Pentecost, All Saints; `year.json` extended; the existing Advent,
Holy Week, and Thanksgiving sets placed by date. Files: `client/public/family/`,
`help-printables.mjs`.

**U24 Catechism you can learn.** De-duplicate (James decides the baptism
answer); recite mode on the `Stepper`; printable cards; "this week" reaching
every question. Files: `family-catechism.json`, `FamilyCatechism.tsx`, printables.

**U25 One devotion system.** Move the Builder's 40 pieces into the family data
with bands; convert KJV to BSB from the site's own text; the Builder reads the
shared data. Files: `tools/FamilyDevotionBuilder.tsx`, family JSON, validator.

**U26 `/writing` asks for the shelf only.** Add an optional slugs input to the
listing procedure in `server/` and `api/index.ts` together; `Writing.tsx` passes
the shelf's slugs. This needs both runtimes; `api-parity.test.ts` stays green.

**U27 Essays: Faith and Power and After Christendom.** The remaining pending
essays in both sections plus the new `baptists-and-the-wall-of-separation`,
`what-romans-13-says`, `is-it-wrong-to-love-your-country`,
`end-times-israel-and-american-politics`; point the four study guides at them;
one PR per section.

**U28, U29, U42 History Parts.** One Part per PR on the approved template:
sessions, registry entries, sources, ledgers, handouts, readings linked. Each
Part is drafted entirely under `docs/work/history/` before conversion.

**U30 Topics wave 2.** Topics 6 to 9, and the AI discernment guide ("Can I trust
what an AI tells me about the Bible?"): check the source, the context, the
translation; written as a context-guide-style page and linked from the phones
topic and Honest Answers.

**U31 The church remembers.** Twelve family devotions from the registry, each
linked to its session and entity sheet.

**U32 Tools registry tightening.** Section 7.4 without redirects. Files:
`ToolsHub.tsx` and its test, `tools/WhichLens.tsx`, `PassageContext.tsx`.

**U33, U34.** Section 7.3. Files: `CreedDocument.tsx`, `CreedsLibrary.tsx`,
`client/public/creeds/`; context guide page and the ten verse guides' data.

**U35 Page heads and card retirement.** `PageHead` on tools, self-checks, hubs,
history, family, topics; boxed left-rule cards replaced. Touches many pages;
split by group (tools, hubs) to keep diffs reviewable.

**U36 Performance.** Diagnose the home Lighthouse failure and fix what the
diagnosis shows; move the portrait and other CloudFront assets into
`client/public/`; `check-payload-budget.mjs`; lazy catalogue loading where
U19 has not already done it.

**U37 When the news comes to dinner.** Short conversation cards (an election,
a shooting, a scandal at a church, a death in the news), each with Scripture, a
witness from history, questions by band, and the care guardrails; the card on a
friend who comes out waits on question 3. Lives under `/family`, linked from
topics.

**U38 to U41 Essays.** As 6.1, one section per PR; U41 excludes the held essays
and the raising-sons essay until James answers.

**U43 Atlas and views.** Section 7.2's contemporaries, controversies explorer,
and atlas (the Natural Earth outline converted once to committed SVG by a
script).

**U44 Greek and Hebrew.** Fonts subset and self-hosted, loaded on Bible routes
only; the occurrence index built at build time and sharded.

**U45 Dark mode.** Section 8, in three PRs: tokenize, pair heroes, enable.

**U46 Folds James approved.** Only after his answers to questions 2 and 5:
each fold a one-hop permanent redirect in `vercel.json`, a `redirectTo` stub in
App.tsx, the FOLDED and KEPT lists in `site-structure.test.ts`, and the registry
test.

**U47 Cleanup.** Delete the four retired tool files (their redirects stay), the
unimported data files (`client/src/data/*-articles*.ts`, `devotionals*.ts`; they
carry unconfirmed first-person scenes and must not return), the thirty
`fontWeight: 300` requests, and the duplicate how-tos (one of each pair, with a
redirect).

**U48 One reading-order source.** After the shelf is whole: replace
`reading-paths/index.json`, `lib/readingPaths.ts`, and
`data/reading-paths-post-christian.ts` with one source; the thirteen pathways
become redirects to their topic pages or the matching shelf section (a fold,
so with James's yes).

**U49 What the numbers say.** A maintained page setting each contested pair side
by side (the Bible-reading comeback and Burge's reading; Pew and PRRI on
Christian nationalism) with dates and samples, every figure checked against
the primary report before it is published.

### 10.6 Later, if there is room

A couple's week of devotions; a grandparent's weekend kit; a household rule of
life built on the Rule of Life Builder; full public-domain texts of the
summarized confessions; a recorded reading by James of the start-with essays;
the Integrated Life guides voice-passed where they are the "go deeper" link on a
topic; the how-to library voice-passed (small and most searched).

---

## 11. What to cut, retire, or fold

Folds that need a redirect follow the Decision Log pattern (one permanent hop,
a client stub, the structure test) and are listed with whether James has to
decide.

| What | Move | James? |
|---|---|---|
| Six crisis landings (`/grief`, `/faith-crisis`, `/marriage-crisis`, `/parenting-help`, `/deconstruction`, `/church-hurt`) | Redirect each to its care page; they duplicate them | No |
| `/parenting` and `/marriage` (pre-elevation hubs, empty essay rows) | `/parenting` to `/family`; `/marriage` to `/help/marriage`; `/for-families` to `/family` | No |
| Thirteen topic pathways (47 of 48 essay steps off the shelf) | Redirect to their topic page or shelf section once topics exist (U48) | Yes, with question 5's folds |
| Three reading-path sources | One reading-order source (U48) | No |
| Two overlapping history essay series | One ordered reading list under the course; no redirects | No |
| `/nation` essays that duplicate shelf essays | Redirect to the rewrite when it is live; `/nation` keeps the tools | Yes (question 5) |
| Deep Bible Companion, Bible Study Guide, Passage Context tool | Fold into the Study Bible | Yes (question 5) |
| Life Audit and Whole-Life Assessment | One instrument | Yes (question 5) |
| Three topical verse tools | One front door, Misused Verses kept as its own feature | Yes (question 5) |
| Wisdom topics as a destination | Keep the URLs; make them search results and topic "go deeper" links | No |
| FAQ (10) and compare (6) pages | Link the FAQ pages from `/answers` ("Longer answers") and the compare pages from `/theology/traditions`; fold only where an Honest Answer covers the same question | No |
| Duplicate how-tos (two pairs) | Keep one of each, redirect the other | No |
| Retired tool files (5,600 lines) and unimported data files | Delete (U47) | No |
| The 31 `/theology/doctrine` pages beside 62 Study Bible doctrines | Cross-link each to its Study Bible counterpart; do not redirect (Decision Log) | Only if he wants one home |

And things not to build: reader accounts, streaks and badges, an AI chat, a
map or chart library, carousels, pop-up modals, offline reading (the service
worker is self-destroying by design; reversing it is James's call and not
proposed here), a seventh header door.

---

## 12. Open questions only James can answer

Sent as `docs/work/james/QUESTIONS.md` (U01), with his answers kept verbatim in
`ANSWERS.md`. Nothing in Phases 0 and 1 waits on them except U12.

1. **The doors.** May the header become Study, Topics, Family, Essays, About,
   with Books moving under About and on the home page? (If not, Family and
   Topics get home-page doors and menu places under the current five.)
2. **The fifteen live essays.** Keep them as your signed originals, labeled
   where they are book chapters, or give them the same edit as the rewrites?
   And may *What "Post-Christian" Actually Means* lead "Start with these" in
   place of the introduction to *The Monster in the Mirror*? The first-person
   lines in `women-in-church-history` (seminary; "the church I now pastor" and
   the Holiness stream; "every history I have taught"): true and yours, or
   generalize?
3. **Where you land.** Women in church leadership, submission in marriage,
   Genesis 1, baptism in the family catechism (Q47 and Q61 answer it two
   ways), and the family and topic material on sex, gender, and the body: your
   position, or publish each one open with both sides stated fairly?
4. **Your own words.** Which of these will you write or record: the "raising
   sons in a post-Christian country" essay; what family worship has looked like
   in your home (the family-devotions care page has seven places marked for
   you); being a father without having had one; a recorded reading of the
   start-with essays?
5. **Folds.** The Decision Log keeps every tool and `/nation`. May Deep Bible,
   the Bible Study Guide, and the Passage Context tool fold into the Study
   Bible; the Life Audit merge with the Whole-Life Assessment; the `/nation`
   essays redirect to their rewrites when live; and the pathways redirect to
   topics? Does the Party Scorecard stay?
6. **ESV checking.** Will you get a free ESV API key (api.esv.org) in your name,
   used only at build time to check quotations and never shown to readers? If
   not, each verse is checked by hand against a print ESV.
7. **The weekly sheet.** Should *This week at your table* go out through the
   Substack newsletter, to pastors through PCN, or stay a page people print and
   forward? And may we read the site's Google Search Console and Vercel
   analytics to re-rank the topics by what people actually search?
8. **One household translation.** The family material uses the BSB so the
   words match the Study Bible and can be printed in full; essays quote the ESV.
   Keep that split, or move the family set to ESV?
