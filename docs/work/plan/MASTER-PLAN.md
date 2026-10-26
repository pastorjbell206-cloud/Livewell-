# LiveWell Master Plan

Prepared 2026-10-26 by the lead planner, from the four research files in this
folder (`inventory-content.md`, `inventory-family.md`,
`inventory-tools-design.md`, `benchmark.md`), `docs/work/NOTES.md`, the
surviving church history consensus, and a read of the code on
`claude/todo-implementation-hhp4bm` (main at 3f204cd, #534).

**Revised the same day against `critique.md`.** Every criticism was checked in
the repo before it was applied; the engineering ones held (the reference parser,
the prerender skip, `docs/work/` missing from `main`, the em-dash counts, the
hand-listed family validator, the two `listPublished` handlers, the 42 KB
chapter files). Appendix A lists the few that were modified or declined, and
why. Appendix B maps the first draft's unit numbers to this draft's. The
machine-readable roadmap is `roadmap.json` in this folder. Nothing outside
`docs/work/plan/` was changed to write either.

It answers James's direction of 2026-10-26 ("very functional ... interactive,
and modern ... study tools ... the articles to be very engaging ... family
devotions ... tools and family devotions and topics ... truly help people live
in a post-Christian nation"), read together with 2026-10-14 (the church history
study, doubled, "the best church history study available ... very
interactive") and 2026-10-12 ("a very simple clean site that I continue to add
to ... run that real tight").

---

## 0. How to use this plan (agents read this first)

1. **Read** `CLAUDE.md` in full, then this file, then the research file for
   your lane, then `docs/work/NOTES.md`. Content agents also read
   `docs/VOICE-JAMES-BELL.md`, `docs/EDITORIAL-CONSTITUTION.md`, and
   `docs/work/essays/BRIEF.md`. Where `CLAUDE.md` states James's biography as a
   number (books, years in ministry), NOTES wins: those numbers are unresolved
   and never printed (section 2).
2. **Where work lives.** `docs/work/` exists only on the work branch
   `claude/todo-implementation-hhp4bm`; `git ls-tree origin/main -- docs/work`
   is empty. After U01 it is checked out as its own git worktree at
   `/home/user/livewell-work`, and `autosave.sh` runs there. Code units work in
   the main checkout `/home/user/Livewell-` on their own branch off `main` and
   never stage `docs/work/`. Anything CI reads (stored source texts, a
   quotation cache, fixtures) is committed under `scripts/data/` in the unit's
   own PR, never read from `docs/work/`.
3. **Pick a unit.** Take the next unit in your lane from `roadmap.json`
   (section 10.3 is the same list) whose dependencies are merged and whose James
   gate, if it has one, is answered. Create `docs/work/plan/units/<ID>.md` from
   the unit card. Its first lines carry `status:` (`in progress`, `in review`,
   `blocked`, `merged`), owner, branch, and PR. Only the lead regenerates
   `plan/STATUS.md` from the unit files, and only the lead edits
   `essays/LEDGER.md`; each essay's own status lives in its ledger. Five lanes
   writing one file was a conflict every hour.
4. **Persistence.** A container reset already cost 47 finished essays. Every
   draft, ledger, data file in progress, and screenshot lives under `docs/work/`
   in the worktree and is committed and pushed within 15 minutes of being
   written. Never draft in the scratchpad or `/tmp`. Code branches push at every
   green checkpoint.
5. **One unit is one PR. James merges.** A unit that grows past its size stops
   and splits rather than becoming a large PR.
6. **Done means seen.** Every unit runs `pnpm check`, `pnpm lint`, `pnpm test`,
   the validators it touches, and `pnpm build`. A unit that adds or moves a
   route also runs `pnpm sitemap && pnpm build && pnpm prerender && pnpm
   audit:canonicals` (the blocking canonical-audit step in CI) and passes the
   route checklist in 9.3. A UI unit looks at the changed pages at 390 x 844
   and 1440 x 900 (method at the end of `inventory-tools-design.md`) and saves
   the screenshots to `docs/work/plan/shots/<ID>/` in the worktree. Light theme
   only; dark mode is parked (8.6). The unit file and the PR say what was not
   verified.
7. **The byline rule.** Nothing published under James's name goes live until he
   has read it as a reader would, on a Vercel preview (section 2; question 1
   asks how he wants to do it).

---

## 1. The short version

LiveWell already owns more serious material than almost any site in its field:
a Study Bible with notes on all 1,189 chapters, 40 care pages, 29 eight-week
plans, 68 group study guides, 41 context guides, 14 creeds, a church history
page with 22 essays, 72 weekly family devotions and a 76-question catechism.
What it lacks is not volume. It lacks five things a reader would notice in the
first minute:

1. **A reason to touch anything.** The home page and most hubs are prose for a
   full phone screen before the first control. Nothing says "tonight" or
   "continue," and you cannot look up a verse.
2. **Joins.** Scripture references are dead text everywhere except the Study
   Bible; essays, devotions, plans, and history do not hand the reader to each
   other.
3. **The essays.** 15 of 58 shelf essays are public, all in the older
   register; the 47 rewrites were lost; the Doubt, American Church, and
   Marriage sections are empty, and the guides, answers, and paths built around
   them are missing their middle rungs.
4. **A family product.** The household material is sound and generic, hidden as
   the last of ten links under Resources, and has no "tonight," no page per
   devotion, no table mode, and nothing on the world a Christian child now
   walks into.
5. **The church history study James asked for.** It is a reading page with
   tabs 7.8 phone screens down.

The plan answers each with the smallest set of moves, and pairs every addition
with something it retires:

- **Joins first.** One Scripture reference parser for the whole repo (four
  exist and disagree; the one the first draft named reads only `Jhn.3.16`),
  passage lookup in every search box, and `VerseRef` turning references into
  doors to the Study Bible. Study primitives are built just in time, three at
  first.
- **Advent and The Table, kept apart.** Advent ships on its own by November 18
  so it cannot slip with anything else. The Table's core (tonight, a page per
  devotion, table mode, position on the device) lands by November 24; age
  bands, printables, the library, and a new strand on the world children live
  in follow in December and January.
- **Topics, small.** One index of the questions people are carrying, in their
  words, each row opening the one best page the site already has; three
  hand-built topic pages first (politics and the flag, raising children in a
  secular age, living after Christendom), each retiring the pathway it
  replaces. Never more than six until search data argues for more.
- **The essays redone.** The five approved pilots live by November 2 with their
  claims ledgers rebuilt; the essay page reaches the first sentence on the
  first phone screen; the Doubt section goes to James by December 4.
- **The church history course,** built on a sources survey and a connected
  registry, a four-session slice to James on January 11, Part I live before
  Holy Week.
- **A calmer, more modern frame:** a compact page head on every surface Phase 1
  touches, so James sees the new grammar in November.
- **Cleanup this week.** The folds that need no decision (orphaned crisis
  landings, stale tool copy, unconfirmed archive files) ship before anything is
  added.

Parked until there is room or James asks: dark mode, Greek and Hebrew faces
and word counts, a statistics page, a separate contemporaries view (it becomes a
timeline filter), and the history atlas until James has judged the slice.

The calendar sets the order. The midterm is Tuesday, November 3. Thanksgiving
is Thursday, November 26. Advent begins Sunday, November 29. The New Year
Bible-reading spike is January 1. Lent begins Wednesday, February 10, 2027;
Palm Sunday is March 21; Easter is March 28; Pentecost is May 16.

James is the scarcest resource in this plan: a pastor in Advent and Lent who
must read everything published under his name. Section 10.5 schedules his
reading (about an hour most weeks, two to three hours in five named weeks) and
section 12 dates every question.

---

## 2. Rules that bind every unit

These come from CLAUDE.md, the Decision Log, NOTES, the research, and the
critique. They are listed so no unit has to rediscover them.

- **Calm, simple, serious.** Unhurried, weighted, grown-up. One column for
  reading. Cream is the room; mustard is punctuation under 8% of any viewport;
  cream and black alternate and never three in a row.
- **One in, one out.** A unit that adds a reader-facing surface names, in its
  card and its PR, the surface it retires, folds, or replaces in the same PR or
  the same week. Section 11 pairs each addition with its subtraction.
- **Interactivity where it helps a person learn, find, remember, or do; never
  inside the argument.** Myth checks in history sessions, retrieval questions,
  recite modes, lookup, timelines, table mode: yes. A quiz before an essay,
  streaks, badges, points, scores on anyone's spiritual life, carousels,
  autoplay, scroll-jacking, parallax, animated counters, pop-up email modals, an
  AI chat box, social-proof counters, a map or chart library, a zoomable
  canvas timeline: no. "We did this tonight" is a plain button with no
  flourish and never a count of nights.
- **Position, not performance.** "Week 14 of the year" and "Session 3 of 6"
  are fine. "7-day streak" and "68% complete" are not.
- **State lives where it belongs.** Shareable state (a tab, a filter, a council,
  a person) goes in the URL. Personal state (progress, saved verses, answers)
  goes on the device through `lib/storage.ts`, said plainly ("on this
  device"). No reader accounts; cross-device sync is an auth and schema change
  that needs James first.
- **Tokens only.** Inline styles referencing `:root` variables; new hover,
  focus, and media rules as classes in `client/src/index.css` with a lane
  prefix (`.st-` study primitives, `.tb-` The Table, `.hx-` history, `.tp-`
  topics, `.pg-` page head). No new hex or `rgba()` literals in components. This
  keeps dark mode possible later without a screenshot tax now.
- **First paint.** Static masthead and home hero from `prerender-heads.mjs`;
  nothing on Home or the header waits on the network; local storage is read
  after mount; the reference parser and book list load when the Find field is
  focused, not on mount. Any change to the home hero changes `Home.tsx` and
  `scripts/prerender-heads.mjs` together.
- **Literal meta, registered routes.** Every new page declares `<SEOMeta
  title="…" description="…">` as string literals. A literal is not enough for a
  param route: `prerender-heads.mjs` skips any path containing `:` (about line
  1160), so every new param route is registered by the checklist in 9.3.
- **Helpers, not hand-rolls.** `lib/fetch-json.ts` plus `LoadFailed` (no
  infinite "Loading…"), `lib/storage.ts`, `lib/clipboard.ts`,
  `components/Markdown.tsx`, `TakeItWithYou` and `ToolActions` (#534),
  `lib/calendar.ts` reminders, `lib/library.ts` (My Library), `lib/myProgress.ts`,
  and `lib/telemetry.ts` for completion events (9.9).
- **Two runtimes.** Only one unit touches the API (U29, the `/writing`
  listing). `api/index.ts` handles `posts.listPublished` in two places (about
  lines 1657 and 2562); both change with the dev router, and
  `api-parity.test.ts` stays green. Search of rewritten essays is done on the
  client (U15), not the server, so it is not a second API change.
- **The Decision Log holds.** Five header doors, the never-redirected list
  (`/study/*`, church history, `/theology/doctrine/*`, creeds, context guides,
  `/downloads`, `/nation`, `/help`, every tool in `/tools`), and `/theology/history`
  URLs kept with no new redirects there. Anything that would change these is a
  question for James (section 12), never a unit's own decision.
- **One translation per page.** Essays and history sessions quote the ESV
  (unless James's answer to question 2 changes it); household surfaces quote
  the BSB (question 8). `VerseRef` shows verse text in a sheet only on pages
  that quote nothing or quote the BSB; on a page that quotes the ESV it is a
  link. Every surface names its translation, and every page that quotes the
  ESV carries Crossway's notice, copied verbatim from Crossway's current
  permissions page, never paraphrased from memory.
- **Integrity.**
  - *Biography.* Confirmed facts only: came to faith as an adult from
    atheism; raised without a father; wife Susanna; five sons; a pastor of
    First Baptist Church of Fenton, Michigan; founded the Pastors Connection
    Network. "Baptist" is fine; never imply Southern Baptist membership. Never
    print years in ministry, a title, or a book count (CLAUDE.md says 21 and 25
    books and 15 years; NOTES records both as unresolved). No invented scenes,
    conversations, or congregants.
  - *No supplied first person.* An agent never writes a first-person
    experience of James's. Any "I" line not already in his published text comes
    from him in writing and is recorded in the ledger with the date he gave it.
    "Vulnerable, in my tone" (2026-10-14) is reached by conceding the church's
    and the tradition's failures honestly, never by inventing his.
  - *No statistics* on the site within this plan unless a person with access
    has checked the figure against the primary report and the ledger names who.
    The figures in `benchmark.md` are planning notes; the sandbox could not
    reach the primary reports. Short answers argue from Scripture, history, and
    the essay.
  - *Ledgers record the method actually used,* in those words ("matched against
    search results from esv.org and BibleGateway on 2026-10-29"). An agent has
    no print ESV and never writes that it checked one.
  - *Held for James* (not drafted for publication until he answers):
    `women-and-leadership-church`, `what-the-bible-says-about-submission`,
    `how-to-read-genesis-one`, the raising-sons essay, and
    `what-fatherhood-requires` (an agent writing about fatherhood under the
    byline of a man raised without a father will be pulled toward his story).
  - *Do not read or reuse* `client/src/data/*-articles*.ts` or
    `devotionals*.ts`: they carry unconfirmed first-person scenes as James. U06
    deletes them.
  - Contested second-order questions are stated fairly and left open.
- **The byline rule.** No piece published under James's name goes live until
  he has read it as a reader would. Each content PR carries a Vercel preview
  link and, in its description, a reading list: title, minutes, what changed,
  and which claims the ledger could not fully settle. The same holds for *This
  week at your table* if it goes out in his name. Question 1 asks him how he
  wants this done.
- **The same instrument.** New writing about politics (the politics topic page,
  the family politics pieces, the election conversation card) passes the
  both-directions check that `validate-politics.mjs` already applies to the
  nation essays.

---

## 3. The reader's experience

### 3.1 Who arrives, and what each can do in the first minute

The site writes toward the skeptic and wins the tie for him, but on an
ordinary evening most arrivals are parents and Christians with a question.
Each of the five readers below gets one obvious first move, visible on the
first phone screen.

**The skeptic** usually arrives from search or a shared link, often straight
onto an essay or an Honest Answer. In the first minute he should meet James's
argument in the first sentence (not chrome and generated art), see that the
claims are checkable (sources at the foot, references that open the text), and
find a way to keep pushing: the *Is Christianity actually true?* row on the
topics index opens the Honest Answers with Test the Case beside it, and later
the Doubt essays. The page he lands on never asks him for anything.

**The doubting Christian** arrives tired of being handled. The topics index
gives her the question in her own words and opens the one page that answers it
best: an Honest Answer, a care page, or a topic page that does not resolve the
question too fast and shows that the church has sat in this dark before. Find
Help is one tap away when the doubt has become a crisis.

**The pastor** arrives from PCN or a forwarded essay. In the first minute he
should see that everything is free to print and use with his people: essays
with discussion questions and a group guide, history sessions with leader notes
and a handout, and *This week at your table*, a one-page sheet he can put in
the bulletin or forward on Sunday night.

**The parent** arrives on a weeknight with ten minutes. Two taps from Home:
*Tonight at the table*, then table mode, one step per screen, read aloud if
she wants. The devotion knows the season (Advent from November 29), offers a
younger and an older set of questions where real ones exist, and on some weeks
speaks to the world her children actually live in.

**The seeker and the hurting reader** arrive with a Tuesday-afternoon problem:
a marriage, a phone, money, grief. Find Help already serves them best on the
site and stays in the header. The topics index sends any personal question
straight to its care page instead of making a second page about it.

### 3.2 The home page, phone first

Keep James's headline, portrait, and the two paragraphs he chose (#533). Add
two things below them and stop:

1. **Find.** One field: "Look up a passage or ask a question." "John 3:16" or
   "jn 3 16" goes to the verse in the Study Bible; "christian nationalism" goes
   to the topic; anything else goes to `/search` with results. The parser and
   book list load when the field is focused. (U15, U18)
2. **Tonight.** One line, rendered after mount from the generated year map and
   the device, never the network: in Advent, *Advent, day 6: …*; otherwise
   *Tonight at the table: …*. Beside it, *Continue* only when this device has
   an essay, plan, session, or self-check to continue (`myProgress.ts`). Hidden
   when there is nothing to show. (U13, U18)

Then the page as today: the doors (three today; Family joins them in U18, and
Topics when its pages ship), *Start with these* (question 4), the books, the
newsletter, the quiet line to Find Help.

Not on Home: *Today in Proverbs* (a daily-habit widget in the hero's shadow; the
tool is one tap away under Study) and a list of questions (the Topics door and
its index carry it). U08 diagnoses the failing home Lighthouse step before U18
touches Home, and U18 must leave first paint unchanged and Lighthouse no worse.

### 3.3 The doors

**Today:** Study, Essays, Books, Resources, About, beside Find Help, search,
and Subscribe. *For families* is the last of ten links under Resources; nothing
in the header says "topics."

**Two shapes for James (question 6), shown to him as pictures, not prose:**

| Door | Option A landing | Holds |
|---|---|---|
| Study | `/study` | The Study Bible, Church history, Creeds, The Bible in its world (context guides), Study with a group, Study tools (`/tools`), Read the whole story in 2027 |
| Topics | `/topics` | The index of questions (topic pages and rows to care pages, Honest Answers, sections), Honest answers (`/answers`), Eight-week plans (`/plans`) |
| Family | `/family` | Tonight at the table, The year of devotions, The catechism, The church year, Reading plans, When the news comes to dinner, Family tools, This week at your table |
| Essays | `/writing` | The shelf by section, Start with these, Latest |
| About | `/about` | About James, Books (`/books` and the three titles), Speaking, Contact, Newsletter, PCN, the podcast |

**Option B** keeps Books as a door (James approved it on 2026-10-12, and book
purchases through Stripe are pending) and moves About to the utility row beside
Find Help and to the footer: Study, Topics, Family, Essays, Books. Home already
introduces him above the fold.

In both, Find Help, search (now with passage lookup), Subscribe, and My Library
stay in the utility row; `/resources` stays live as the one-page list of
everything to use, linked from the foot of each door's menu and the footer;
`/tools` stays as the tools registry.

**The label.** "Topics" is James's own word on 2026-10-26 ("tools and family
devotions and topics that we need to deal with") and is the default. The pages
are titled as questions, so "Questions" is offered as the alternative.

**If James says no to both,** nothing blocks: *For families* becomes a primary
link in the Resources group, *Topics* a primary link in the Essays group once
U25 ships, and Home gains the Family door. That is within the Decision Log's own
wording ("Resources holds ... families"). Either way the change is one small PR
(U19): `client/src/lib/siteNav.ts`, `client/src/lib/site-structure.test.ts`,
`client/src/lib/siteNav.test.tsx`, `client/src/components/Footer.tsx`,
`client/src/components/MinimalNav.tsx`, `SEARCH_SHORTCUTS`, and the Decision
Log line in CLAUDE.md once James has said yes.

---

## 4. Topics: the hard questions of life in post-Christian America

### 4.1 What a topic page is, and why it is not the folded hub

On 2026-10-12 James folded `/justice`, `/disruption`, `/post-christian`,
`/exile`, the capture pages, and the `/pathways` index into shelf sections and
`/study`. They were categories with thin pages under them. A shelf section
holds essays only. A topic page is one question with one assembled answer
across formats: an essay, Scripture read in its world, a witness from church
history, a devotion for the family table, and the plan and tools to act on it.
Where the site already has one page that answers a question, the index row
opens that page and no topic page is built.

U25's PR says this in its description, and James sees the preview before it
merges. If he reads it as the hub coming back, it does not ship.

Five rules keep it tight:

1. **One index.** `/topics` is a single list of questions in the words people
   type. Each row opens the one best page: a topic page, a care page, an Honest
   Answer, a shelf section, or a tool. `/answers` stays live and is linked from
   the index, not listed beside it.
2. **A topic page only where no single page assembles the answer.** Three
   first. At most six until search data (question 5) supports more; raising the
   cap is James's call.
3. **Personal needs keep their home at Find Help.** Fear, anxiety, grief,
   suffering, loneliness, marriage, money, and work appear on the index in the
   reader's words, and the row opens the care page directly. Improvements go
   into those pages, not around them.
4. **Never an empty slot.** When the lead essay is pending, the data names the
   best live stand-in, and the page shows that.
5. **Each page retires what it replaces.** The matching pathway at
   `/pathways/<slug>` (pages whose subtitles promise four essays that are off the
   site) redirects to the topic page in the same PR, if James says yes
   (question 6). If he says no, the pathway links to the page instead.

### 4.2 The index, and the three pages first

Order: the mission's central question first, then the demand evidence in
`benchmark.md` (planning notes only; none of its figures reaches the site), then
the readiness of what exists.

**The three topic pages (U25):**

| # | Asked as | Slug | Lead essay | Built from (exists) | Retires |
|---|---|---|---|---|---|
| 1 | What is Christian nationalism, and how should a Christian think about politics? | `faith-politics-and-the-flag` | *What Christian Nationalism Is, and What It Is Not* (pilot), with *Was America Founded as a Christian Nation?* (pilot) | Care `politics`; studies `christian-nationalism`, `the-captive-church`, `church-and-empire`; context `romans-13-1-in-context`, `2-chronicles-7-14-in-context`, `left-lens-right-lens`, `the-kingdom-is-not-a-platform`; the four public-square tools (Consistency Check, Party Scorecard, If We Had a Biblical Government, Which Lens); live essays `when-the-church-married-empire`, `the-conservative-blind-spot`, `the-progressive-blind-spot`; the family politics pieces (U11) | Pathways `christian-nationalism` (*Faith and the Flag*) and `progressive-captivity` (*Faith and the Cause*), both, so the fold itself holds right and left with the same instrument |
| 2 | How do we hand the faith to our kids in a secular age? | `raising-children-in-a-secular-age` | Stand-in: care `family-devotions` (the essay waits on James, question 13) | Care `family-devotions`, `parenting`, `fatherless`; plans `parenting`, `fatherless`; studies `raising-believers`, `parenting-formation`, `fatherhood`, `youth-who-am-i`; The Table; the catechism; Parent and Teen, Parenting Stage Guide | Pathway `parenting` (*Raising Kids Who Keep the Faith*) |
| 3 | What does it mean that America is post-Christian, and how do we live in it? | `living-after-christendom` | *What "Post-Christian" Actually Means* (pilot) | Study `after-christendom`; context `exile-not-empire`, `jeremiah-29-11-in-context`; pilot `the-early-church-under-rome`; history Part I when live; the family exile devotion (U22) | No pathway. The page names itself the companion to the After Christendom shelf section and links it first |

**Rows that open an existing page:**

| Asked as | Opens | Later |
|---|---|---|
| Is Christianity actually true? | `/answers`, with Test the Case beside it on the row | The Doubt section once U26 is live |
| Can I trust the Bible, and how do I read it? | `/help/trust-the-bible` | |
| Can I trust the church after what it did? | `/help/church-hurt` | |
| What are phones and AI doing to us and our kids? | The `attention` study guide | Wave 2 candidate, with the AI discernment guide |
| Why are Sunday mornings still divided, and what did the church do about slavery? | *Why Didn't the Bible Just Ban Slavery?* (pilot) | Wave 2 candidate after the American Church essays |
| My neighbors believe something else. Is Christianity too narrow? | The matching Honest Answer | Wave 2 candidate |
| Why are there so many denominations? | `/theology/traditions` | |
| I can't stop worrying | `/help/anxiety` | |
| I'm afraid of where the country is going | `/help/fear-of-the-future` | |
| Why does God allow suffering? | `/help/suffering` | The Doubt essay when live |
| I'm grieving | `/help/grief` | |
| I feel alone, even at church | `/help/loneliness` (gains a short section on finding a church after a move or after hurt) | |
| My marriage is in trouble | `/help/marriage` | |
| Money and work | `/help/money`, `/help/purpose` | |

**Wave 2 (U48), three pages at most, chosen by search data:** candidates
`phones-screens-and-ai` (with the AI discernment guide),
`race-and-the-churchs-past` (after the American Church essays), and
`neighbors-who-believe-differently`. **Held:** the body, sex, and identity
(question 11); no row until James answers.

### 4.3 What every topic page holds

Six sections, in this order:

1. **The question** as H1, in the asked-as words, and a short answer of 150 to
   250 words in the mature register, derived from the lead essay or Honest
   Answer under the "nothing not in the source" rule. No statistics.
2. **Read this first:** one essay with minutes and its first line, or its named
   stand-in; up to two further essays.
3. **What Scripture says, read in its world:** three to five passages, each a
   `VerseRef` in link mode with one line and, where one exists, its context
   guide.
4. **The church has been here before:** one witness from church history,
   linking to a history session or person page (until the registry exists, the
   history essay that tells it).
5. **At the table:** the family devotion for this question.
6. **Use this:** the eight-week plan, the study guide, and at most two tools.
   Crisis care appears here only where the page is flagged `sensitive`.

*Take it with you* (the #534 row) prints the page. No "go deeper" list and no
`SubjectShelf` fallback; search is the long tail.

### 4.4 Data and code

- `client/public/topics/<slug>.json`, one per page, and
  `client/public/topics/index.json` (every row of 4.2), built by
  `scripts/build-topics-index.mjs`.
- Page shape: `{ slug, title, askedAs[], short, essay, essayStandIn,
  alsoEssays[], scripture[{ ref, line, context? }], witness{ href, line },
  table{ devotion }, use{ plan?, study?, tools[] }, care?{ href, line, crisis? },
  sensitive, folds[], updated, reviewed }`. Index row: `{ askedAs, href, kind,
  also? }`.
- `scripts/validate-topics.mjs`: every href resolves through
  `scripts/lib/site-routes.mjs` (a live route, a public essay through
  `isPublicEssay`, or a named stand-in); every reference parses with the shared
  parser (U09); no slot empty without a stand-in; Forbidden Language, no
  em-dash, no exclamation outside quoted Scripture; no percentage or "N in 10"
  in a short answer; `sensitive` pages carry `care`; the politics page passes
  `validate-politics.mjs`'s both-directions check; at most six pages.
- Pages: `client/src/pages/Topics.tsx` (`/topics`) and
  `client/src/pages/Topic.tsx` (`/topics/:slug`), built from `PageHead`,
  `EditorialIndex`, `SectionHead`, and `VerseRef`; registered by the 9.3
  checklist; search entries; the `topic_lead_open` event (9.9). The URL follows
  the label James chooses; `/topics` is the default.

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
parts. The core (U17) ships what exists; the rest follows.

| Step | What | Source | When |
|---|---|---|---|
| Read | The passage in full (BSB, verbatim, validated), with "Listen" and a link into the Study Bible chapter | existing `passage`, `passageText` | U17 (link); U16 adds the verse sheet |
| Talk | The big idea in one line, and a reflection of 100 to 160 words to read aloud | existing `bigIdea`, `reflection` | U17 |
| Ask | Three questions for younger children (about 4 to 10) and three for older (about 11 to 17); "together" shows both | existing `questions` shown as "together" in U17; `questions.younger` and `questions.older` in U21, older ones written new or taken from the Builder's teen band where the theme matches; never faked | U17, U21 |
| Do | One activity | existing `activity` | U17 |
| Remember | This week's catechism question or memory verse | catechism, linked by week | U17 |
| Pray | A short prayer | existing `prayer` | U17 |
| Witness (some weeks) | A paragraph on one person from church history, linked to the session or person page | history registry | U49 |
| For the grown-ups (some weeks) | One line and a link to the topic page or essay behind tonight | topics | U21 |

The card promises ten minutes. Families who want three short nights get a
suggested split (Read and Talk; Ask and Do; Remember and Pray), and "Remind me"
sets weekly calendar reminders through `lib/calendar.ts` (U21).

### 5.3 Ages and households (U21)

Two bands, *younger* and *older*, with *together* as the default for a mixed
table. The Builder's teen writing (the best family writing on the site) seeds
the older band. The family-devotions care page's notes for the single parent,
the split-week home, and the believer married to an unbeliever become a short
"If your table looks different" panel on `/family`. Couples, grandparents, and
a household rule of life are later work (10.7).

### 5.4 The year and the weekly rhythm (U10)

One devotion a week, chosen by the calendar, computed from rules rather than
typed by hand so it never runs out:

- `scripts/lib/church-year.mjs` computes Advent Sunday (the fourth Sunday before
  Christmas), Easter (the computus), Ash Wednesday and Pentecost from Easter,
  Holy Week, All Saints, and US Thanksgiving (the fourth Thursday of November).
- `scripts/build-family-year.mjs` writes
  `client/src/lib/familyYear.generated.ts` for five years ahead (season
  boundaries and the devotion id for each week), imported statically so Home
  and `/family` need no network (the `essayOverrides.generated.ts` precedent).
- Tests: the rules give the known dates (Advent Sunday 2026 is November 29;
  Easter 2027 is March 28, Ash Wednesday February 10, Pentecost May 16);
  regenerating changes nothing; the build fails when fewer than twelve months
  remain in the generated map. Hand overrides live in a separate small file,
  `client/public/family-year-overrides.json`.

Three strands:

- **Foundations:** the existing 72, de-duplicated (the `forgiveness` and
  `obedience` collisions, the two "Made On Purpose" titles), on a two-year
  cycle so all of them are used.
- **The world we live in** (U11, then U22): about one week a month on what a
  Christian child now meets: being the only Christian kid in class; why we go
  to church when friends do not; exiles in Babylon (Jeremiah 29, Daniel); Jesus
  is Lord and the flag is not (the coin, Mark 12:13-17); praying for leaders we
  did not vote for (1 Timothy 2:1-2); when the grown-ups vote differently; why
  Christians do bad things; truth in the feed (phones, AI, what is real);
  neighbors who believe something else; fear and the future; when someone dies
  or a family breaks. The body and identity waits for James (question 11).
- **The church remembers** (U49): about one week a month, a family edition of
  the history course (candidates, each fact verified first: Polycarp, Perpetua
  and Felicity, Nicaea, Augustine, Patrick, the monks who kept the books,
  Tyndale, the Anabaptists, Richard Allen, Wilberforce and the people who
  resisted the trade, Barmen and Bonhoeffer, and a witness from the church
  outside the West).

The church year overrides the plain week in season: Advent, Christmas and
Epiphany, Lent (from Ash Wednesday, February 10, 2027), Holy Week, Easter's
fifty days, Pentecost, All Saints, and Thanksgiving. Outside those seasons the
plain weeks run from Epiphany to Ash Wednesday and from Pentecost to Advent.

### 5.5 What changes on screen

**The core (U17), by November 24:**

- **`/family`** opens on a `PageHead` and *Tonight at the table* (title,
  passage, ten minutes, "Start"), then *This week* (the catechism question and,
  after U20, the weekly sheet), then the season, then the existing library,
  catechism, reading plans, and tools. It loses the four essay rows (`teen-`,
  `apologetics-`, `parenting-`, `marriage-`), which render empty, and the
  `posts.listPublished` call that feeds them (`Family.tsx:47`, which downloads
  every published row to show nothing).
- **`/family/tonight`** resolves to tonight's devotion, so a printed card's QR
  code, a reminder, and Home can all point at one address.
- **`/family/devotions/:id`** gives every devotion its own page, title, and
  share link, replacing the accordion (which also fixes the duplicate-id bug),
  with a print stylesheet so the page prints as a card.
- **Table mode** (`?mode=table`): large type, one step per screen on the
  `Stepper`, Next and Back at the bottom in thumb reach, Listen on the passage
  (the existing `ListenButton`), and the screen kept awake with the Screen Wake
  Lock API where the browser supports it. Ends on a plain "We did this tonight"
  button, which records the date on the device.
- **Position:** `livewell-progress-family-v1` holds the start date, band, and
  the dates devotions were done. The page shows position ("Week 14 of the
  year"; "Last time: Exiles in Babylon, Tuesday") and never a streak.

**Part two (U21), by December 18:** the band switch and older questions where
real; the library by strand and theme; "If your table looks different";
"Remind me"; the one combined PDF of cards (5.6).

**Later:** one devotion system (U41): the Devotion Builder
(`/tools/family-devotions`, which stays a route because tools never redirect)
reads the same data, in the same translation, and becomes "plan a term" over
it. Catechism you can learn (U40): de-duplicated to its distinct questions,
"this week" reaching every question, a recite mode (parent asks, child answers,
reveal), and fridge cards printed from the page.

### 5.6 Printables and the weekly sheet

Print from the page, not from a hundred committed files. Each devotion page and
the weekly sheet carry a print stylesheet through the #534 *Take it with you*
print path. For churches that print in bulk, `pnpm pdfs` builds one combined PDF
of the year's cards, each with a QR code to `/family/devotions/:id`
(`qrcode-generator` is already a dependency). Existing booklets (Advent, Holy
Week, plans, workbooks) stay.

Devotion ids are frozen by U12 the day before the first card can be printed: a
test fails if any id in the committed data is removed or renamed without a
redirect entry, because a QR code on paper cannot be recalled.

*This week at your table* (`/family/this-week`, U20): the week's devotion, the
catechism question, one question for the table, and, when there is one, the
essay behind it, on one printable page with *Take it with you*. It is the thing
a pastor forwards on Sunday night; the channel is question 14.

### 5.7 Translation

The family set uses the Berean Standard Bible, and `validate-family.mjs` checks
it against the site's own text. Keep BSB for the whole household (and convert
the Builder from KJV in U41): the Study Bible is BSB, so a child who taps the
passage sees the same words; a child memorizes one wording; and full passages
print without quotation limits. Essays and sessions keep quoting the ESV. Each
surface names its translation. James can overrule this (question 8).

### 5.8 Repairs that come first (U12)

From `inventory-family.md`: duplicate devotion ids; "72 weeks" labeled as a
year; the catechism's `weekOfYear()` capped at 52, so Q53 to Q76 never appear;
the catalogue's "52-question" copy; infinite "Loading…" on all three family
pages; four translations across the family surfaces (each named now, converted
in U41); hardcoded `rgba()` in the heroes; "Ages 1--3" in the Stage Guide.
Duplicate catechism questions are flagged here and removed in U40 once James
answers question 7 (baptism, Q47 and Q61).

**File layout, decided:** the five root files (`client/public/family-*.json`)
stay where they are, so no fetch, printable, catalogue entry, or PDF changes.
New strands follow the same naming (`family-devotions-world.json`,
`family-devotions-church.json`). `validate-family.mjs` stops listing files by
hand and globs `client/public/family-*.json`; it checks unique ids and
questions, counts that match the copy, bands present where claimed, the
generated year map resolving to real ids, and one translation per surface. Its
no-em-dash check exempts text inside quoted Scripture (the 8 em-dashes in the
family files are all in quoted BSB).

### 5.9 Advent ready (U13)

The existing 25-day set runs December 1 to 25. Advent 2026 runs November 29 to
December 24 (26 days), and its length changes every year (22 to 28 days), so
"redate it to start November 29" leaves days unwritten. Question 3 asks James
whether the set stays a December 1 to 25 Advent calendar (the household custom)
or becomes a set that starts on Advent Sunday. **If he has not answered by
November 13:** keep the calendar, change every line of copy that says Advent
begins December 1, and add no new writing. Either way, fix the order (day 24
reads Luke 2:1-5 after days 20 and 21 have read Luke 2:6-11) and the booklet's
copy, and surface the set on `/family` and Home from November 22, date-gated
after mount from the generated year map. U13 depends on nothing in The Table,
so Advent ships even if The Table slips.

### 5.10 Before and after the vote

**Before November 3 (U05):** the two politics pilots live, and `/help/politics`
and the pilots surfaced on `/family` and on the Faith and Power shelf.

**After (U11):** "When the grown-ups voted differently" (a conversation card for
the table) and "Praying for leaders we did not choose" (1 Timothy 2:1-2), in
the mature register, both directions stated fairly and checked by
`validate-politics.mjs`, BSB verified, read by James. Live by November 8 if he
approves; otherwise they open the world strand in U22. The useful moment is the
week after the vote, when the results come to dinner; publishing two new
politics pieces the day before an election, unread by James, was the riskiest
move in the first draft.

### 5.11 The weekly devotions themselves

The family inventory judges the 72 weekly devotions kind, usable, and generic
("could have been written by any careful Christian publisher"); the strongest
family writing is the catechism's parent notes and the Builder's teen band.
Question 10 asks James whether the weeks the year serves first get a voice
pass. Because Advent through Pentecost is served by seasonal sets, the first
plain weeks after this winter's five run from May 17, 2027, so the pass (U55)
targets those sixteen weeks, in two PRs of eight, and asks nothing of James in
Advent. Question 13 asks him for the seven places on the family-devotions care
page marked for what family worship has looked like in his home.

---

## 6. Engaging articles

### 6.1 The shelf, redone

Fifty-two essays: the five approved pilots and 47 to rewrite (40 pending shelf
essays plus seven new ones, listed in NOTES), of which five are held for James
(section 2). The process is the one that produced the pilots, with every step
written down under `docs/work/essays/` in the worktree as it happens:

1. Draft to `docs/work/essays/<slug>.md` from `BRIEF.md`.
2. Claims ledger `docs/work/essays/ledgers/<slug>.md`: every date, name,
   quotation, statistic, and Scripture reference, with its source, who checked
   it, and the method actually used.
3. Voice edit against `VOICE-JAMES-BELL.md` and the pilots; the stamp list and
   the AI-tell list in `BRIEF.md`.
4. Audit by a second agent reading as the skeptic and as a pastor.
5. Convert to `client/public/essays/<slug>.json`, run
   `node scripts/build-essays-index.mjs` and `validate-essays.mjs`.
6. Reconnect what was built for it (below), add the 301s for the old slugs it
   absorbs (listed in NOTES), and open the section's PR with a preview link and
   reading list for James (the byline rule).

**The pilots first (U05).** The reset kept their text and lost their ledgers.
Before they ship, each gets a quotation-and-date ledger rebuilt from the text
(every quotation, date, name, and reference, its source, and the method used to
check it). Their 79 em-dashes come out without changing meaning (verbatim
quotations keep their own punctuation). Preview to James by October 30; live by
November 2.

**Order of sections, by what each switches on:**

1. **Doubt and Hard Questions** (the skeptic's section; restores the essay rung
   for Honest Answers, three Skeptic's Track stops, four discussion guides).
   Part A, five essays, to James by December 4 on a preview of the current
   essay page, live from January 1 with the U24 fields:
   `excavation-not-demolition`, `why-trust-the-bible`, `the-historical-jesus`,
   `did-the-resurrection-happen`, `can-you-be-good-without-god` (U26). Part B,
   four, after Epiphany: `why-does-god-allow-suffering`,
   `why-does-god-feel-far-away`, `did-god-command-genocide`,
   `doubt-after-church-abuse` (U36; the last needs the most careful read).
2. **Faith and Power** (U46) and **After Christendom** (U47), the mission's
   center; they let the `/nation` essays fold if James agrees (question 12).
3. **The Ancient Church** (U56), coordinated with the history course, whose
   sessions cover the same ground in more depth, so the essays are written as
   essays, not sessions.
4. **The American Church** (U57).
5. **Reading the Bible in Its World** (U58).
6. **Marriage, Family and Ordinary Faithfulness** (U59), without the held
   essays until James answers.

**Reconnection with each section:** re-derive each Honest Answer whose essay was
rewritten (the answers promise nothing not in the essay); read each matching
discussion guide against the new text before its "Use this with your small
group" link reappears; point the four study guides that promise five James
Bell essays (`christian-nationalism`, `church-and-empire`, `economic-justice`,
`pastoral-health`) at the rewrites or change their summary line; fix the three
"8-Week Study" titles that hold five sessions; re-point the Skeptic's Track so
it can switch on.

**The fifteen live essays** wait on question 4. Either way: finish the blurbs in
`shelf.json` that stop mid-sentence, label book chapters as such ("From *The
Monster in the Mirror*, chapter 1"), and hold the unconfirmed first-person
lines in `women-in-church-history` until James answers.

### 6.2 The essay page

Ranked by value. Every item keeps the page single column, cream, quiet, and
free of interruption.

1. **The first sentence on the first phone screen** (U04). Contents card closed
   by default under 760 px; reading tools in one row; generated art moved below
   the opening section or dropped where there is no real cover. Measured on a
   preview, not computed.
2. **Every reference is a door** (U23). References in the body render through
   `VerseRef` in link mode, a quiet link that opens the chapter in the Study
   Bible. No BSB text beside an ESV quotation.
3. **Scripture as Scripture; pull-quotes rare** (U23). Block Scripture renders
   as Scripture with its reference. The share card is reserved for one or two
   lines the essay marks as pull-quotes (a `pullQuotes` field), not every
   blockquote.
4. **Questions and a group guide behind them** (U24). An optional `questions`
   field (three to five) renders "To think about, or talk about" after the
   body, with "Use this with your small group" to the full guide. Every shelf
   essay gets both in its section PR.
5. **Sources** (U24). An optional `sources` field renders the books and primary
   texts the essay names, so the skeptic can check.
6. **Oriented in a long argument** (U23). The progress bar measures the essay
   body, not the page; minutes left beside it; the reader's place remembered on
   the device with "Pick up where you left off" on `/writing` and as Home's
   *Continue*. No sticky section line on essays: on a 390 px screen it takes a
   line from the column for good.
7. **Series order** (U23, U24). "Essay 2 of 6 in The Mirror" in the kicker, and
   "Next in this section" at the foot, **replacing** `ArticleNextSteps` (whose
   reading paths are mostly empty).
8. **Related, by hand** (U24). A `related` field (two to four validated links to
   any format: the context guide, the Honest Answer, the study guide, the history
   session, the topic), **replacing** `RelatedEssays` (four from the same
   section).
9. **An honest date** (U23). "Revised October 2026" from the rewrite's
   `updated`.
10. **A way to answer back** (U24). "Write to James about this essay" opens the
    contact form with the title filled in.
11. **The ESV notice** (U04), on every essay that quotes the ESV.
12. **James's own voice,** recorded, for the start-with essays and the pilots,
    if he will make them (question 13; later).

**The foot, fixed (U24).** After the last paragraph, in this order and nothing
else: (1) To think about, or talk about; (2) Sources; (3) Next in this section;
(4) Related; (5) *Take it with you* (save, send, print, cite, send to a skeptic,
a pastor, or a spouse; the #534 row); (6) Write to James; (7) the book, where
the essay is a chapter; (8) the newsletter; (9) the short bio. `RelatedEssays`
and `ArticleNextSteps` leave the essay page; the `path_step_complete` event name
stays reserved for the pathway pages that remain. A new panel needs a line in
this list, in this file, first.

**Smaller:** `/writing` asks the API for the shelf's slugs only instead of all
959 published rows (both runtimes, U29). Search finds a rewrite by its own title
and excerpt on the client, from the essays override manifest, and drops any
server result whose slug has an override (U15). The shelf blurbs are finished.

**Refused:** a myth check before an essay (it puts a quiz between the reader and
James's first sentence); a sticky section line; streaks, badges, or completion
percentages on the shelf; inline verse previews beside ESV quotations; a right
rail; autoplaying audio; anything between sections.

---

## 7. Study tools

### 7.1 The Study Bible

It is the best instrument on the site; the work is reach and thumbs.

- **One reference parser** (U09). The repo has four: `lib/bible.ts:101`
  `parseRef` (OSIS codes only, `Jhn.3.16`), `lib/bible-notes.ts:213` `refHref`
  (full names, no abbreviations), `lib/needs.ts:108` `studyBibleHref` (string
  munging), and `scripts/lib/bsb.mjs:44` `parseRef` (an alias table, ranges,
  cross-chapter ranges, verse lists; the best). Build
  `client/src/lib/scripture-ref.ts` from `bsb.mjs`'s alias table and logic,
  extended with common abbreviations (jn, rom, 1 cor, ps, prov, gen, matt, mk,
  lk, and the rest) and loose spacing ("jn 3 16"); give `bsb.mjs` the same
  aliases; and add a test that runs both on one fixture list and fails on any
  disagreement (the `shelf.ts` and `scripts/lib/shelf.mjs` precedent). Retire
  `refHref` and `studyBibleHref` onto it. The OSIS parser stays for the Study
  Bible's internal codes.
- **Passage lookup everywhere** (U15): the header search, `/search`, the Study
  Bible front door, and the reader accept "John 3:16," "jn 3 16," "Romans 13."
- **`VerseRef` site-wide** (U16): one component, two modes. Link mode opens the
  chapter in the Study Bible. Sheet mode shows the verse in a `Sheet`, renders
  `<ScriptureNote>` (so `validate-scripture.mjs` passes and the BSB is named),
  and offers "Open in the Study Bible." The sheet reads a text-only chapter
  shard (`client/public/bible/text/<book>/<n>.json`, verse number and text,
  generated from `client/public/bible/ch/` by script, committed, with a drift
  check), because a full chapter file carries the interlinear words (John 3 is
  41,942 bytes) and five references would cost about 200 KB. A small in-house
  remark plugin in `Markdown.tsx` turns references into `VerseRef`.
  `ScriptureRef` points at the Study Bible, not the Passage Context tool.
  References become live in devotions, catechism, reading plans, plans, context
  guides, and creeds; essays (U23), topics (U25), and sessions (U32) use link
  mode in their own units.
- **Thumbs** (U37): the whole verse is the tap target, not a 24 px number; the
  text starts on screen one, with the chapter summary behind "About this
  chapter"; a sticky bar with a two-tap book and chapter picker; related site
  content loaded only when asked (not the 372 KB catalogue on every chapter);
  save a verse or a note to My Library on the device.
- **Read the whole story in 2027** (U28): the Study Bible already holds the
  whole Bible in story order (`client/public/bible/story.json`, eleven acts).
  A schedule derived from it (chapters for each day, each day linking its
  context guide where one exists), per-day position on the device, and a phone
  reminder, live by December 20. Mostly code, little new writing. A shorter
  60-day "in its world" plan with a written question per day can follow in Lent
  if James wants it.
- **Parked** (10.7): self-hosted Greek and Hebrew faces and "how often this word
  occurs."

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
reading list on the course front door in U31, replacing today's 22-row list in
the same PR; nothing under `/theology/history` redirects.

**A session page** (`/theology/history/session/:slug`, U32):

1. **Before you read:** a myth check of two to four statements ("true," "false,"
   "it's complicated"), kept on the device and shown again at the end.
2. **The story,** 3,000 to 4,000 words in James's register, interleaved with
   **source cards** (a verbatim excerpt, author, work, date, translator,
   public-domain basis, "read more of this source") and ESV Scripture with the
   reference. People, councils, and controversies in the text open their sheet.
3. **How it looked from the other side:** one fair statement of the losing or
   opposing position, in the form its defenders would sign.
4. **Where we do this too:** one mirror. It speaks as "we" (the church,
   Baptists, American Christians, pastors) and never supplies a first-person
   experience of James's; any "I" line comes from James in writing, recorded in
   the ledger with its date (question 9 asks which voice the course takes).
5. **Check yourself:** three to five retrieval questions; tap to reveal; no
   score.
6. **Talk about it:** discussion questions.
7. **For leaders** (behind a `Disclosure`): a 45 and a 75-minute plan, the
   answers behind the questions, cautions, and what to do when the room gets
   heated.
8. **Handout:** a printable page (key dates, the source excerpts, the
   questions) from a print stylesheet on the session.
9. **Where and when:** a small strip of the session's events, each opening its
   sheet on the timeline.
10. Next session; position on the device ("Session 3 of 6 in Part I"); the
    Crossway notice at the foot; the `history_session_complete` event (9.9).

**The registry** (U30). One connected set of committed JSON, read by every view:

- `client/public/history/registry/people.json`, `events.json`,
  `places.json` (with coordinates), `councils.json`, `controversies.json`
  (the ten heresies migrate here, each a question with its positions, the
  council, the creed, and where it returns today), `sources.json` (author,
  work, date, translator, edition, public-domain basis, origin URL and commit).
- `client/public/history/sources/<id>.json`: the verified excerpts. The full
  public-domain texts they are checked against live in
  `scripts/data/history-sources/` (U07), so CI can read them on `main`.
- `client/public/history/sessions/<slug>.json`: `{ slug, part, n, title,
  standfirst, minutes, mythCheck[], blocks[{ type: prose|source|scripture,
  ... }], otherSide, mirror, retrieval[], discussion[], leader, handout,
  entities[], readings[], updated, reviewed }`. Blocks keep source cards and
  Scripture structured, so the validator can check every quotation.
- Migration: the four `client/public/theology/church-history-*.json` files are
  generated from the registry so existing readers keep working, committed, with
  a CI check that regenerating them changes nothing (the
  `essayOverrides.generated.ts` pattern). The justice timeline and the two
  witnesses pages later read from the registry too; their URLs stay.

**Pages and sheets.** Pages, with their own URL, prerendered head, and sitemap
entry, only for entries that carry real teaching: councils
(`/theology/history/councils/:id`), controversies
(`/theology/history/controversies/:id`), and people
(`/theology/history/people/:id`) whose entry clears the validator's threshold
(at least 150 words and a cited source). Everything else (events, places,
sources, and the shorter people entries) opens as a sheet addressed by a query
parameter on the page that shows it (`/theology/history/timeline?e=nicaea-325`),
with no route, sitemap entry, or head of its own. That keeps the new URLs near
150, not 435, and none of them a paragraph.

**The views** (U31), all list-first and URL-addressable:

- **Course front door** (`/theology/history`): a `PageHead`, the Parts and
  sessions, "continue" from the device, then the views, then the one ordered
  reading list. The interactive part starts on the first screen.
- **Timeline** (`/theology/history/timeline`): a list by century with an era jump
  bar and filters (Part, kind, region, and "alive in a given year," which
  replaces a separate contemporaries view) in the URL; a row opens its sheet.
- **Councils and controversies** (`/theology/history/controversies`, U54): each
  question, each position at full strength, what was decided, the creed text,
  where it returns today.
- **Atlas** (`/theology/history/atlas`, U68): a few inline SVG base maps drawn
  once from public-domain Natural Earth outlines and committed, colored from
  tokens, places plotted from the registry; no map library. Built only if James,
  after the slice, wants it.

Static routes are registered before `/theology/history/:slug`, and the
validator forbids an essay slug that collides with a view name.

**Integrity gates** (U07, U30). Every source-card excerpt must be a normalized
substring of the stored public-domain text it cites
(`scripts/verify-sources.mjs`); Scripture quotations pass the quotation gate
(U27); registry ids are unique and every cross-reference resolves; every person
has a citation; no biography beyond the sources; modern sources still under
copyright (Barmen in English, King's letter) are quoted briefly with
attribution or summarized, and the source record says which.

**Sources first, and honestly** (U07). The sandbox reaches the public-domain
ANF and NPNF translations in `HistoricalChristianFaith/Writings-Database`
(through raw.githubusercontent.com; avoid its machine-translated Migne
material), which covers Parts I and II. It does not reach CCEL, Wikisource,
Gutenberg, or New Advent, and Luther, Calvin, Schleitheim, Trent, Wesley,
Richard Allen, Douglass, and Barmen are not in that database. So U07 begins with
a survey of every planned source for every Part: a reachable public-domain text
and its provenance, or "not reachable." James sees the survey with the slice.
Where a source cannot be reached, the session tells it in the narrative and says
so, rather than carrying a card no gate can check. Provenance is kept in
`scripts/data/history-sources/PROVENANCE.md`.

**Vertical slice first** (U31 to U33): *How to Read the Dead*, the Rome session
built on the approved pilot, Nicaea, and Callinicum and Thessalonica as the
first reckoning, with the registry entries they need, the session template,
sheets, the timeline for those entries, a handout, and leader notes. Previewed
to James on January 11, after Epiphany, with three questions: is the voice his,
is the depth right, is the length right. If it is ready in the first week of
December it is offered then, not pushed; December 20 is the worst week of a
pastor's year to judge whether 15,000 words sound like him.

**Then the Parts:** Part I to James by March 5 and live by March 12, before Holy
Week; Part II to James April 8, after Easter, live April 22; Parts III to VIII
about one every three weeks from June, each only as far as the survey says its
sources reach.

**The family edition** is The Table's "church remembers" strand (U49), each
devotion linked to its session.

### 7.3 Creeds and context guides

- **Creeds you can learn** (U44): tap a phrase to open its annotation in place
  (today they are a list after the text); compare Nicaea 325 with 381 and the
  Apostles' with the Nicene side by side; a memorize mode reusing Scripture
  Memory's first-letter drill; each creed linked to its council's page. Full
  public-domain texts of the summarized confessions are content work, later.
- **Context guides that reveal** (U45): on the ten "verses everyone quotes"
  guides, a "what we hear / what the first readers heard" reveal, with the verse
  one tap away.

### 7.4 The tools

Thirty-six tools, several excellent, several overlapping, with stale copy.
Without redirecting anything (the Decision Log keeps every registered tool):

- **This week (U06):** rewrite the nine registry descriptions that name retired
  sections, and Which Lens's "Enter the pillar" ending (`WhichLens.tsx:106-139`).
- **Tools where the reader is (U25):** Test the Case on the *Is Christianity
  actually true?* row of the topics index; the four public-square instruments
  (Consistency Check, Party Scorecard, If We Had a Biblical Government, Which
  Lens) on the politics topic page in its first PR.
- **January (U38):** put the Study Bible in the registry, first; regroup so the
  public-square instruments sit second under a plain title; make the Passage
  Context tool read the site's own BSB text instead of `bible-api.com` (WEB)
  and stop loading its 710 KB notes file up front.
- **Instrument on screen one (U42):** `PageHead` in place of the charcoal hero
  on the ten most-used tools and the self-checks.

The folds that would need redirects (Deep Bible Companion, the Bible Study
Guide, and the Passage Context tool into the Study Bible; the Life Audit with the
Whole-Life Assessment; one topical-verse front door) are question 12.

---

## 8. Design modernization

The brand is an asset: cream, charcoal, mustard, Cormorant and Inter,
self-hosted, a serious book. What reads dated is the layout grammar laid over
it. The changes below keep the brand and change the grammar.

### 8.1 Page heads, early

Reserve the full charcoal prose hero for Home and About. U14 creates
`client/src/components/editorial/PageHead.tsx` (eyebrow, H1, one line, optional
actions, left-aligned), and Phase 1 and 2 apply it to every surface they
already touch (`/family`, the devotion pages, `/family/this-week`, the topics
pages, the history front door and sessions), so James sees the new grammar in
November, not in late January. There is no shared hero to swap: 197 page files
hand-roll their own charcoal head. So U42 is scoped to the ten most-used tools
and the self-checks; the rest change only when a unit touches them.

### 8.2 Study primitives, just in time

Built on the Radix primitives already installed and chunked (`vendor-ui`,
11 KB gzip), restyled to tokens, under `.st-` in `index.css`, with
testing-library tests for keyboard and ARIA, 44 px targets, focus visible, and
reduced motion through the existing motion tokens. Each is built by the first
unit that needs it, and no sooner:

| Primitive | Built in | First use |
|---|---|---|
| `Sheet` (bottom sheet on phones, side panel from 1024 px, focus trap) | U14 | `VerseRef` in devotions (U16) |
| `Stepper` (one step per screen, Back and Next at the bottom) | U14 | Table mode (U17) |
| `PageHead` | U14 | `/family` (U17) |
| `Position` (a quiet "3 of 6") | U17 | The Table |
| `Tabs` (URL-synced) | U31 | History views |
| `EntityChip` | U31 | History sheets |
| `SourceCard`, `CheckYourself`, `MythCheck`, `Disclosure` | U32 | Sessions |
| `StickyContext` (title and current section) | U37, only if it earns its line | The Study Bible; never essays |

### 8.3 Cards and lists

Retire the white boxed card with a 4 px colored left rule (tools hub, Deep
Bible), the most dated element on the site, in favor of `EditorialIndex` rows
and `CardGrid` (U42). Long pages get an in-page jump bar where it earns its
place (the Study Bible front door, 15 screens; history, 18) rather than more
scrolling.

### 8.4 Home and reading pages

Home as in 3.2 (U18). Reading pages as in 6.2 (U04, U23, U24).

### 8.5 Drawn teaching, sparingly

A handful of hand-built inline SVG figures (Paul's cities, where the councils
met) colored from tokens, where a session needs one. The atlas waits on James
(U68). No chart or map library.

### 8.6 Phone first; light, and dark later

Designed at 390 px with a 16 px gutter, no sideways scroll, 44 px targets,
controls in thumb reach at the bottom where a hand holds the phone (table mode,
the Study Bible picker).

Dark mode is off today for a good reason (`App.tsx` notes heroes that mix
flipping and non-flipping tokens and turn invisible), and James has not asked
for it. It is parked (10.7). The tokens-only rule keeps it possible; nothing in
this plan screenshots forced dark.

### 8.7 Type

Remove the thirty `fontWeight: 300` requests no shipped face supplies (U39).

---

## 9. Quality gates

### 9.1 Existing, kept green

Typecheck; the 22 content validators in `.github/workflows/ci.yml`; Vitest
(server and client, including the ~260-route smoke test,
`site-structure.test.ts`, `ToolsHub.test.ts`); build; the canonical audit; and
`pnpm lint`. The non-blocking quality job (Lighthouse and axe on home) already
fails Lighthouse on `main` (CI run 40382670533); that predates this plan and
U08 owns it.

### 9.2 New gates, added to the content-gates step as each lands

| Script or test | Checks | Unit |
|---|---|---|
| `validate-essays.mjs` | Override shape and fields; Forbidden Language; no em-dash; no exclamation outside quoted Scripture; links only to public pages; references present (parsed once U09 lands); the BRIEF's rulebook-leakage list ("steelman," "verdict," "indictment," "self-implication," "both-sidesism" in prose) | U03 |
| Scope extensions | `validate-grow-voice.mjs` and `validate-no-emdash.mjs` extended to `client/public/essays/` only. New surfaces (topics, new family strand files, history sessions) are born inside their own validators. The history essays (about 200 em-dashes) stay as course readings in the older register and the pathways (46) fold, so neither is swept | U03 |
| `scripture-ref` agreement test | Client and script parsers agree on one fixture list | U09 |
| `validate-family.mjs` (extended) | Globs `family-*.json`; unique ids and questions; counts match copy; bands present where claimed; year map resolves; one translation per surface; em-dash rule outside quoted Scripture | U12 |
| Id freeze test | No devotion id in the committed data removed or renamed without a redirect entry | U12 |
| Year map tests | Rules give known dates; regeneration is a no-op; at least twelve months remain | U10 |
| Text-shard drift check | Regenerating the text-only chapter shards changes nothing | U16 |
| `validate-politics.mjs` (extended) | Both directions, within the same word band, on the family politics pieces, the politics topic page, and the election card | U11, U25, U50 |
| `validate-topics.mjs` | Section 4.4 | U25 |
| `verify-sources.mjs` | Every excerpt is in its stored public-domain text under `scripts/data/history-sources/`; provenance present | U07 |
| `validate-history.mjs` | Registry integrity, citations, the page threshold, session completeness, slug and view-name collisions, generated legacy files unchanged on regeneration | U30 |
| Quotation verifier | Section 9.4 | U27 |
| `check-payload-budget.mjs` | Per-route JSON and JS budgets (one chapter plus the shards it opens; no unrelated indexes); warning first, blocking once green | U33 |

### 9.3 The route checklist

Every unit that adds a param route (`/family/devotions/:id`, `/topics/:slug`,
`/theology/history/session/:slug`, `/theology/history/people/:id`,
`/theology/history/councils/:id`, `/theology/history/controversies/:id`)
registers it in the same PR in all of these:

1. `client/src/App.tsx` (static views before any `:slug` on the same prefix).
2. A committed manifest the page reads.
3. `LIBRARY_SOURCES` in `scripts/prerender-heads.mjs` (about line 988); without
   it the route has no prerendered head and the canonical audit fails.
4. `scripts/generate-sitemap.mjs`.
5. `paramSources()` in `scripts/lib/site-routes.mjs`, or the Grow validators
   treat links to it as unverified.
6. `client/public/llms.txt`.
7. `PARAM_SAMPLES` in `client/src/test/routes.smoke.test.tsx` when the default
   sample would not render.
8. `client/src/lib/site-structure.test.ts` when a door or fold changes.

Then it runs `pnpm sitemap && pnpm build && pnpm prerender && pnpm
audit:canonicals`. Sheets addressed by a query parameter add none of these.

### 9.4 Quotations and the ESV

The site quotes the ESV and today carries no Crossway notice (only
`ScriptureNote.tsx:31` names the translation). U04 adds the notice to the essay
page and U32 to the session template, copied verbatim from Crossway's current
permissions page (read through search results if esv.org is unreachable, and
the quotation limits noted at the same time); if it cannot be read, James is
asked to paste it.

Checking the quotations themselves depends on question 2:

- **If James provides a free ESV API key,** an agent fills
  `scripts/data/esv-verified.json` once, for the verses the site quotes, records
  the date and method, and commits it; `verify-esv.mjs` checks every ESV
  quotation in essays, topics, and sessions against it. The Vercel build never
  calls the API, and the key never reaches the client.
- **If James allows the BSB in essays and sessions,** a verifier checks every
  quotation word for word against the site's own BSB text, as
  `validate-family.mjs` already does.
- **If neither,** quotations are matched against search results from esv.org and
  BibleGateway, the ledger says exactly that, and the gate checks only that each
  page matches the recorded text. The PR says the gate cannot catch a wrong
  entry.

The pilots ship before this is settled (U05), with ledgers that state the
method used. U27 builds whichever verifier James's answer allows.

### 9.5 Human gates

Written down per piece: the claims ledger with the method used; a second-agent
read as the skeptic and as the pastor; James's read on a preview of everything
published under his name (the byline rule); the Formation Test from CLAUDE.md
for essays, sessions, topic pages, and devotions.

### 9.6 Crisis care

Any topic, devotion, or card touching self-harm, abuse, death, or sexuality
carries a `care` link to its Find Help page; where self-harm could be in view,
the 988 line; where abuse by a church leader is in view, the line that it should
be reported to the authorities; never a diagnosis; never advice posing as
professional. The topic and family validators check the field is present on
items flagged `sensitive`.

### 9.7 Accessibility

Primitives tested for keyboard and ARIA; 44 px targets; mustard text uses
`--mustard-text` on cream. U34 adds Playwright with `@axe-core/playwright` on
ten key routes against the local build in the quality job, waiting for each
route's `main` landmark (the CLI evaluates the empty shell of a lazy route,
which is why `ci.yml` audits only `/` today). Non-blocking at first.

### 9.8 Performance

U08 diagnoses the home Lighthouse failure before U18 touches Home (candidates,
unverified: the portrait served from the legacy CloudFront host,
render-blocking CSS) and brings the portrait and other CloudFront references
in-house. U33 makes the Study Bible's payload rule ("its own chapter and the
shards it opens") the rule for every study page, with budgets. History stops
loading 300 KB of unrelated indexes (U31).

### 9.9 Telemetry

CLAUDE.md defines success as depth, and `lib/telemetry.ts` already forwards
privacy-light events to Vercel Analytics with stable names. Three are added,
each with an id or slug and nothing personal, and added to the module's
stable-names list: `family_devotion_complete` (U17), `topic_lead_open` (U25),
`history_session_complete` (U32). Reader-facing copy stays honest: personal
state is "on this device"; anonymous counts follow the telemetry contract.

---

## 10. Build roadmap

### 10.1 Sizes, lanes, phases

Sizes are honest agent effort: **S** half a day or less; **M** one to two days;
**L** three to five days; **XL** more than a week. Content units are dominated
by writing and checking, not code.

| Lane | Owns | Shares (small hunks, rebase before PR) |
|---|---|---|
| Lead | `docs/work/` structure, `STATUS.md`, `essays/LEDGER.md`, `james/` | none |
| Platform | `components/study/`, `components/VerseRef.tsx`, `lib/scripture-ref.ts`, `lib/siteSearch.ts`, `StudyBible.tsx` and `study-bible/`, `ToolsHub.tsx`, creeds, context guides, performance | `index.css` (`.st-`, `.pg-`), `App.tsx` routes |
| Essays | `client/public/essays/`, `shelf.json`, `ArticleDetail.tsx`, `Writing.tsx`, `data/answers.ts`, `data/discussion-guides.ts`, `scripts/validate-essays.mjs` | `vercel.json` (append 301s), `site-structure.test.ts` |
| Family | `client/public/family-*.json`, `pages/Family*.tsx`, `pages/family/`, `FamilyDevotionBuilder.tsx`, the church-year scripts | `index.css` (`.tb-`), `App.tsx`, one line in `Home.tsx` (U13) |
| History | `client/public/history/`, `scripts/data/history-sources/`, `pages/TheologyHistory.tsx`, `pages/history/` | `index.css` (`.hx-`), `App.tsx` |
| Frame and topics | `client/public/topics/`, `pages/Topic*.tsx`, `Home.tsx`, `siteNav.ts`, `MinimalNav.tsx`, `Footer.tsx`, folds | `prerender-heads.mjs`, `vercel.json` |

| Phase | Window | Aim |
|---|---|---|
| 0 | Oct 27 to Nov 3 | Hygiene, questions out, the pilots live, the cleanup that needs no decision, the history sources survey started |
| 1 | Nov 4 to Nov 28 | Advent ready, family repairs, one parser and Find, three primitives, VerseRef, The Table core, Home, the doors |
| 2 | Nov 29 to Jan 10 | The weekly sheet, The Table part two, the world strand begun, the essay page, topics index and three pages, Doubt A, the New Year plan, the history registry, views, template, and slice |
| 3 | Jan 11 to Mar 28 | Doubt B, Faith and Power, After Christendom, Study Bible for thumbs, tools, catechism, Lent, creeds, context, topics wave 2, Part I, Easter to Pentecost |
| 4 | Mar 29 to autumn | Part II and Parts III to VIII, the remaining essay sections, controversies, the voice pass, folds James approved, the atlas if he wants it |

### 10.2 The calendar

| Date | What must be ready |
|---|---|
| Wed Oct 28 | Questions 1 to 14 sent to James, dated, with two pictures of the doors (U02) |
| Fri Oct 30 | The five pilots on a preview for James (U05); questions 1 to 5 due |
| Mon Nov 2 | The pilots live; `/help/politics` and the politics pilots on `/family` (U05) |
| Tue Nov 3 | Election Day. Cleanup that needs no decision merged (U06) |
| Sun Nov 8 | "When the grown-ups voted differently" and the leaders prayer, if James approved them (U11) |
| Tue Nov 10 | Question 6 due. Family repairs (U12), primitives (U14), home diagnosis (U08) |
| Fri Nov 13 | Find live (U15); Advent default applies if question 3 is unanswered |
| Wed Nov 18 | Advent ready (U13) |
| Sun Nov 22 | Advent surfaced on Home and `/family` |
| Tue Nov 24 | The Table core (U17); the doors (U19) if question 6 was answered |
| Wed Nov 25 | Home: Find and tonight (U18) |
| Thu Nov 26 | Thanksgiving (existing set, placed by the year map) |
| Sun Nov 29 | Advent begins |
| Wed Dec 2 | This week at your table (U20) |
| Fri Dec 4 | Doubt A to James (U26); history registry (U30); essay page part one (U23) |
| Fri Dec 11 | Topics preview to James (U25); essay page part two (U24) |
| Fri Dec 18 | Topics index and three pages live (U25); The Table part two (U21); history views and template (U31, U32); first four world devotions to James (U22) |
| Sun Dec 20 | Read the whole story in 2027 (U28) |
| Fri Jan 1 | Doubt A live, if James approved it |
| Fri Jan 8 | First four world devotions live (U22) |
| Mon Jan 11 | The history slice and the sources survey to James (U33) |
| Fri Jan 15 | Doubt B to James (U36); Study Bible for thumbs under way (U37) |
| Wed Jan 27 | The Lent set to James (U43) |
| Wed Feb 3 | The Lent set and booklet live, a week before Ash Wednesday (U43) |
| Fri Feb 5 | Faith and Power essays to James (U46) |
| Fri Feb 19 | After Christendom essays to James (U47); topics wave 2 (U48), if search data exists |
| Fri Feb 26 | The church remembers and the news cards to James (U49, U50) |
| Fri Mar 5 | History Part I to James (U51); live by Mar 12 |
| Fri Mar 19 | Easter's fifty days and Pentecost devotions live (U52) |
| Sun Mar 21 | Palm Sunday; Holy Week (existing set, placed by the year map) |
| Sun Mar 28 | Easter |
| Thu Apr 8 | History Part II to James (U53); live Apr 22 |
| Sun May 16 | Pentecost; the plain weeks resume May 17 (voice pass, U55, by May 6 if James wants it) |

### 10.3 The units, in priority order

`roadmap.json` holds the same list with scope, files, dependencies, size, and
whether a unit can run beside others. A James gate is named in the card; a
gated unit does not start its gated part until the answer is in
`docs/work/james/ANSWERS.md`.

| ID | Unit | Lane | Size | Depends on | Target |
|---|---|---|---|---|---|
| U01 | Work hygiene: worktree and per-unit status | Lead | S | none | Oct 27 |
| U02 | Questions to James, dated, with two pictures of the doors | Lead | S | U01 | Oct 28 |
| U03 | Essay gate (without the ESV cache) | Essays | S | U01 | Oct 29 |
| U04 | Essay first screen and the ESV notice | Essays | S | U01 | Oct 30 |
| U05 | Ship the five pilots | Essays | M | U03, U04 | preview Oct 30, live Nov 2 |
| U06 | Cleanup that needs no decision | Frame | M | U01 | Nov 3 |
| U07 | History sources survey, corpus, and verifier | History | L | U01 | survey Nov 13, verifier Nov 20 |
| U08 | Home performance diagnosis | Platform | M | U01 | Nov 10 |
| U09 | One Scripture reference parser | Platform | M | U01 | Nov 6 |
| U10 | Church-year rules and the generated year map | Family | S | U01 | Nov 6 |
| U11 | After the vote (two family pieces) | Family | S | U01 | Nov 8, James gate |
| U12 | Family repairs and the structural validator | Family | M | U01 | Nov 10 |
| U13 | Advent ready | Family | S | U02, U10 | Nov 18 |
| U14 | Study primitives, first three (Sheet, Stepper, PageHead) | Platform | M | U01 | Nov 10 |
| U15 | Find: passage lookup and plain-language search | Platform | M | U09 | Nov 13 |
| U16 | VerseRef and text-only chapter shards | Platform | L | U09, U14 | Nov 20 |
| U17 | The Table, core | Family | L | U10, U12, U14 | Nov 24 |
| U18 | Home: Find and tonight | Frame | M | U08, U13, U15, U17 | Nov 25 |
| U19 | The doors | Frame | S | U02 | Nov 24, James gate |
| U20 | This week at your table | Family | M | U17 | Dec 2 |
| U21 | The Table, part two | Family | L | U17 | Dec 18 |
| U22 | The world we live in (family strand) | Family | L | U12 | four by Jan 8, eight more by Apr 30 |
| U23 | Essay page, part one | Essays | M | U05, U16 | Dec 4 |
| U24 | Essay page, part two | Essays | M | U23 | Dec 11 |
| U25 | Topics: the index and three pages | Frame | L | U02, U05, U09, U14, U16 | preview Dec 11, live Dec 18 |
| U26 | Essays: Doubt, part A (five) | Essays | L | U03, U24 | to James Dec 4, live Jan 1 |
| U27 | Quotation verifier | Essays | M | U02, U03 | Jan 15, James gate |
| U28 | Read the whole story in 2027 | Platform | M | U09 | Dec 20 |
| U29 | `/writing` asks for the shelf only (both runtimes) | Essays | S | U01 | Dec 4 |
| U30 | History registry and validator | History | L | U07 | Dec 4 |
| U31 | History views: front door, pages and sheets, timeline | History | L | U14, U30 | Dec 18 |
| U32 | History session template | History | L | U14, U30 | Dec 18 |
| U33 | History vertical slice | History | L | U07, U31, U32 | to James Jan 11 |
| U34 | Accessibility on lazy routes | Platform | S | U01 | Jan 8 |
| U35 | Payload budgets | Platform | M | U08 | Jan 8 |
| U36 | Essays: Doubt, part B (four) | Essays | L | U26 | to James Jan 15, live Jan 29 |
| U37 | Study Bible for thumbs | Platform | L | U14 | Jan 29 |
| U38 | Tools registry tightening | Platform | M | U14 | Jan 15 |
| U39 | Cleanup, second pass | Platform | S | U06 | Jan 15 |
| U40 | Catechism you can learn | Family | M | U02, U12, U14 | Jan 22, James gate |
| U41 | One devotion system | Family | M | U02, U21 | Jan 29, James gate |
| U42 | Page heads on tools and self-checks | Platform | M | U14, U38 | Jan 29 |
| U43 | Lent for households | Family | L | U10, U17 | to James Jan 27, live Feb 3 |
| U44 | Creeds you can learn | Platform | M | U14, U30 | Feb 5 |
| U45 | Context guides that reveal | Platform | M | U14, U16 | Feb 12 |
| U46 | Essays: Faith and Power | Essays | L | U24 | to James Feb 5, live Feb 19 |
| U47 | Essays: After Christendom | Essays | L | U24 | to James Feb 19, live Mar 5 |
| U48 | Topics, second wave, and the AI discernment guide | Frame | L | U02, U25 | Feb 19, James gate (search data) |
| U49 | The church remembers (family strand) | Family | M | U12, U33 | to James Feb 26 |
| U50 | When the news comes to dinner | Family | M | U21, U25 | to James Feb 26 |
| U51 | History Part I | History | XL | U33 | to James Mar 5, live Mar 12 |
| U52 | Easter to Pentecost for households | Family | M | U43 | Mar 19 |
| U53 | History Part II | History | XL | U51 | to James Apr 8, live Apr 22 |
| U54 | Councils and controversies explorer | History | M | U31 | Apr 30 |
| U55 | Weekly devotions voice pass | Family | L | U02, U12 | May 6, James gate |
| U56 | Essays: The Ancient Church | Essays | L | U24, U33 | May 13 |
| U57 | Essays: The American Church | Essays | L | U24 | Jun 3 |
| U58 | Essays: Reading the Bible in Its World | Essays | L | U24 | Jun 24 |
| U59 | Essays: Marriage, Family and Ordinary Faithfulness | Essays | M | U02, U24 | Jul 15, James gate |
| U60 | History Part III | History | XL | U53 | Jun |
| U61 | History Part IV | History | XL | U60 | Jul |
| U62 | History Part V | History | XL | U61 | Jul |
| U63 | History Part VI | History | XL | U62 | Aug |
| U64 | History Part VII | History | XL | U63 | Sep |
| U65 | History Part VIII | History | XL | U64 | Sep |
| U66 | Folds James approved | Frame | M | U02 | after his answers, James gate |
| U67 | One reading-order source | Frame | M | U25, U66 | Jun |
| U68 | History atlas, if James wants it | History | L | U31, U33 | after Part II, James gate |

### 10.4 Where work in progress lives

All of this lives in the worktree at `/home/user/livewell-work` on the work
branch, never on `main`:

```
docs/work/
  NOTES.md                 decisions, append-only
  autosave.sh              commits and pushes docs/work from the worktree
  james/QUESTIONS.md       the questions as sent; ANSWERS.md his words, verbatim
  plan/MASTER-PLAN.md      this file; plan/roadmap.json the same units as data
  plan/STATUS.md           generated by the lead from plan/units/*.md
  plan/units/<ID>.md       each unit's status line, brief, checklist, notes
  plan/shots/<ID>/         screenshots that verified the unit
  essays/<slug>.md         drafts; essays/ledgers/<slug>.md claims ledgers (status inside); essays/LEDGER.md lead only
  history/sessions/<slug>.md, history/registry/*.json (drafts), history/ledgers/, history/sources/SURVEY.md
  family/<strand>/<id>.md  drafts; family/ledgers/
  topics/<slug>.md         drafts
  verify/                  quotation staging, fact-check logs
```

What CI reads ships in the unit's PR under `scripts/data/` (the stored
public-domain texts, any quotation cache), never from `docs/work/`.

### 10.5 James's reading, scheduled

Every piece under his name reaches him as a preview link with a reading list
(the byline rule). If he answers question 1 by letting code-only PRs merge on
green CI with screenshots, his load is the reading below plus the questions. If
not, code PRs come to him in one weekly batch.

| When | What he reads | About |
|---|---|---|
| Oct 30 | The five pilots; questions 1 to 5 | 90 minutes |
| Nov 6 | Two short family pieces after the vote | 10 minutes |
| Nov 10 | Question 6 and the two door pictures | 10 minutes |
| Nov 17 | Questions 7 and 8 | 5 minutes |
| Nov 23 | The Table core, on his phone | 15 minutes |
| Dec 4 | Doubt A, five essays | 90 minutes |
| Dec 11 | Three topic pages | 30 minutes |
| Dec 18 | Four world devotions | 15 minutes |
| Jan 11 | The history slice (four sessions) and the sources survey | 2 hours |
| Jan 15 | Doubt B, four essays | 75 minutes |
| Jan 27 | The Lent set | 30 minutes |
| Feb 5 | Faith and Power essays | 2 hours |
| Feb 19 | After Christendom essays | 2 hours |
| Feb 26 | The church remembers and the news cards | 45 minutes |
| Mar 5 | History Part I (six sessions) | 3 hours |
| Mar 12 | Easter to Pentecost devotions | 30 minutes |
| Apr 8 | History Part II | 3 hours |

The heavy weeks avoid December 13 to January 6 and Holy Week.

### 10.6 Unit cards

Each card: scope, files, done when, and the James gate where there is one.
Dependencies, sizes, and targets are in 10.3. Every UI unit also meets section
0 item 6; every route-adding unit meets 9.3.

**U01 Work hygiene.** Commit and push `docs/work/`; switch the main checkout at
`/home/user/Livewell-` to `main` (a branch cannot be checked out in two
worktrees); `git worktree add /home/user/livewell-work
claude/todo-implementation-hhp4bm`; point `autosave.sh` at the worktree path and
keep it staging only `docs/work`; create `plan/units/`, the STATUS generator (a
few lines of shell or node that reads each unit's status line), `james/`, and
`essays/LEDGER.md` (52 rows from NOTES); add the do-not-reuse line for the
archive data files to NOTES. Done when a feature-branch checkout in the main tree
leaves `docs/work` untouched and the autosave pushes a test commit from the
worktree.

**U02 Questions to James.** Section 12 as `james/QUESTIONS.md`, ordered by
deadline, each with what it unblocks and the default if unanswered. Two pictures
of the header (options A and B) rendered from a throwaway local branch, not a
PR, at 390 and 1440 px, saved beside the questions. The lead relays them to
James. Done when sent and the send date is recorded.

**U03 Essay gate.** `scripts/validate-essays.mjs` (9.2, references present but
not yet parsed); extend `validate-grow-voice.mjs` and `validate-no-emdash.mjs`
to `client/public/essays/` only; add the gate to `ci.yml`. No ESV cache. Files:
`scripts/`, `.github/workflows/ci.yml`. Done when the gates pass on the current
essays folder and fail on a seeded bad file in a test.

**U04 Essay first screen and the ESV notice.** `ArticleDetail.tsx`: contents card
closed by default under 760 px; reading tools in one row; generated art below the
opening section, or dropped where there is no real cover. Crossway's notice on
essays that quote the ESV (9.4). Files: `ArticleDetail.tsx`, `index.css`. Done
when the first sentence of two live essays is on the first 390 px screen,
measured on a preview, and the notice text is recorded with its source.

**U05 Ship the five pilots.** Rebuild each pilot's quotation-and-date ledger in
the worktree with the method used; remove the 79 em-dashes without changing
meaning; add shelf entries for `what-post-christian-means` (After Christendom)
and `was-america-founded-as-a-christian-nation` (Faith and Power); write
`client/public/essays/<slug>.json` for each; run `build-essays-index.mjs`; add
the 301s for slugs the pilots absorb (`witness-without-power` to
`the-early-church-under-rome`; `the-flag-in-the-sanctuary` and
`two-kingdoms-one-pledge` to `what-christian-nationalism-is-and-is-not`) only
where the destination is public and the old slug is not itself a shelf entry;
surface `/help/politics` and the two politics pilots on `/family` and the Faith
and Power shelf. Files: `client/public/essays/`, `client/src/lib/shelf.json`,
`essayOverrides.generated.ts`, `vercel.json`, `App.tsx` stubs, one hunk in
`Family.tsx`. Preview and reading list to James by October 30. Done when all
five render, validators and `validate-links.mjs` pass, and James has approved.

**U06 Cleanup that needs no decision.** Delete `client/src/data/*-articles*.ts`
(20 files) and `devotionals.ts`, `devotionals-2.ts`, after a grep and `pnpm
check` confirm nothing imports them (keep `client/src/data/articles/`, which
`server/routers.ts` imports). Rewrite the nine stale tool descriptions and Which
Lens's ending. Redirect, one hop each, in `vercel.json` with `redirectTo` stubs
in `App.tsx`: the six orphaned crisis landings (`/grief`, `/faith-crisis`,
`/marriage-crisis`, `/parenting-help`, `/deconstruction`, `/church-hurt`) to
their care pages; `/for-families` and `/parenting` to `/family`; `/marriage` to
`/help/marriage`; and re-point every existing redirect that lands on
`/parenting` today so each stays one hop. Re-point the Start Here diagnostic's
links to the crisis landings. Make the pathway subtitles that promise essays off
the site say what is there. Update the folded lists in `site-structure.test.ts`.
Retires: eight duplicate pages and the archive hazard. Done when the structure
test, links validator, and canonical audit pass.

**U07 History sources survey, corpus, and verifier.** For every planned source
in Parts 0 to VIII: a reachable public-domain text and its provenance, or "not
reachable" (`docs/work/history/sources/SURVEY.md`). Fetch the texts the slice and
Part I need (Pliny's letter 10.96 in a public-domain translation, the Martyrdom
of Polycarp, Eusebius on Lyon, the Passion of Perpetua, Ambrose's letters on
Callinicum and Thessalonica, the Nicene Creed of 325, Athanasius, Augustine)
into `scripts/data/history-sources/` (only the works or chapters cited) with
`PROVENANCE.md` (repository, commit, path, translator, edition, public-domain
basis). Write `scripts/verify-sources.mjs` and add it to CI. Done when the survey
is complete and a seeded altered excerpt fails.

**U08 Home performance diagnosis.** Read the failing quality job's log on
`main`; reproduce on a preview; record the cause in the unit file; fix what the
diagnosis shows, starting with moving the portrait and other CloudFront assets
into `client/public/`. Files: whatever the diagnosis names; `Home.tsx` only if
needed. Done when the Lighthouse step passes on the PR or the unit file says
exactly why not.

**U09 One Scripture reference parser.** Section 7.1. Files:
`client/src/lib/scripture-ref.ts` and its test, `scripts/lib/bsb.mjs`,
`lib/bible-notes.ts`, `lib/needs.ts`, `validate-essays.mjs` (parse check on).
Done when "John 3:16," "jn 3 16," "1 cor 13," "Romans 13," "Ps 23:1-3," and
"Philippians 4:6-7" parse identically in both, and an unknown book returns null.

**U10 Church-year rules and the generated year map.** Section 5.4. Files:
`scripts/lib/church-year.mjs` and its test, `scripts/build-family-year.mjs`,
`client/src/lib/familyYear.generated.ts`,
`client/public/family-year-overrides.json`, the drift and horizon checks in CI.
Done when the tests give the known dates and fail with under twelve months left.

**U11 After the vote.** Section 5.10. The two pieces in
`client/public/family-devotions-world.json` in the existing devotion shape;
`validate-family.mjs` globs `family-*.json` (whichever of U11 and U12 lands
first adds the glob); `validate-politics.mjs` extended to them; a short panel on
`/family` reads the file until The Table does. Drafts and ledger in
`docs/work/family/world/`. James gate: he reads both; live by November 8 only
with his yes.

**U12 Family repairs and the structural validator.** Section 5.8 in full, ids
frozen with the no-removal test. Files: `client/public/family-*.json`,
`pages/FamilyDevotions.tsx`, `FamilyCatechism.tsx`, `FamilyReadingPlans.tsx`,
`Family.tsx`, `scripts/build-catalogue.mjs`, `scripts/validate-family.mjs`,
`tools/ParentingGuide.tsx`. Done when the validator fails on a seeded duplicate
id and passes on the repaired data, and Q53 to Q76 reach "this week."

**U13 Advent ready.** Section 5.9. Files: `client/public/family-seasonal.json`,
`pages/FamilyDevotions.tsx`, `scripts/lib/help-printables.mjs` (booklet copy),
`Family.tsx`, one date-gated line in `Home.tsx`. Gate: question 3, with the
November 13 default. Done when no copy says Advent begins December 1 (or the set
starts November 29, per James), day 24 is in order, and the set appears on Home
and `/family` from November 22 in a date-mocked test.

**U14 Study primitives, first three.** `Sheet`, `Stepper`, `PageHead` (8.1, 8.2)
with `.st-` and `.pg-` styles and tests for keyboard and ARIA. Adopt `PageHead`
on one existing page to prove it. Files: `client/src/components/study/`,
`client/src/components/editorial/PageHead.tsx`, `index.css`. Done when the tests
pass and the proving page is screenshotted at both widths.

**U15 Find.** `lib/siteSearch.ts`: recognize references first (to the verse),
stop words for plain questions, and add wisdom topics, Honest Answers, family
devotions and catechism, Christ and the Nation, and the essays override manifest
(a rewrite found by its own title and excerpt; server essay results with an
override dropped) to the sources; the header search (`MinimalNav.tsx`),
`/search`, and a "Go to" field on the Study Bible front door and reader. Parser
loaded on focus. Files: `lib/siteSearch.ts` and its test, `pages/Search.tsx`,
`MinimalNav.tsx`, `StudyBible.tsx`. Done when "John 3:16," "jn 3 16," "how to
talk to my kids about God," and "is america a christian nation" each return the
right thing in a test.

**U16 VerseRef and text-only chapter shards.** Section 7.1. Files:
`components/VerseRef.tsx`, a shard script under `scripts/` and its output in
`client/public/bible/text/`, `Markdown.tsx` (the remark plugin),
`ScriptureRef.tsx`, the family, plans, context-guide, and creed pages that gain
live references. Done when John 3:16 in a context guide opens the verse sheet
with `ScriptureNote` and then the Study Bible, an unparseable reference renders
as plain text, `validate-scripture.mjs` passes, and the shard drift check is in
CI.

**U17 The Table, core.** Section 5.5, core. Files: new
`pages/family/Tonight.tsx`, `DevotionPage.tsx`, `TableMode.tsx`; `Family.tsx`
(PageHead, Tonight first, essay rows and `listPublished` removed),
`FamilyDevotions.tsx` (becomes the library); `App.tsx` routes with literal
SEOMeta; the 9.3 checklist for `/family/devotions/:id`; the print stylesheet;
the `family_devotion_complete` event. Retires: the accordion, the empty essay
rows, the all-posts download. Done when a phone goes from Home to step one of
tonight's devotion in two taps and finishes it at the table, and the route
passes the canonical audit.

**U18 Home: Find and tonight.** Section 3.2. Files: `Home.tsx`, `index.css`
(`.home-` block), `scripts/prerender-heads.mjs` only if the hero changes (it
should not). Done when first paint is unchanged, Lighthouse on home is no worse
than after U08, and the tonight line is empty-safe.

**U19 The doors.** The shape James chose, or the interim (3.3). Files: 3.3's
list. James gate: question 6. Not run beside U06 or U66 (same files).

**U20 This week at your table.** `/family/this-week`, print-first, with *Take it
with you*, a QR code to `/family/tonight`, one week from the year map. Files:
new page, `App.tsx`, `index.css` (`.tb-`). Channel per question 14. Done when it
prints on one page at Letter and A4.

**U21 The Table, part two.** Sections 5.3 and 5.5, part two; the combined PDF
(5.6). Files: the family JSON (older questions where real), `pages/family/`,
`Family.tsx`, `scripts/build-pdfs.mjs`. Done when every devotion that claims an
older band has one (validator), and the combined PDF builds in `pnpm pdfs`.

**U22 The world we live in.** Twelve devotions (5.4), each with younger and
older questions, a witness where one fits, a topic link, and crisis care where
needed, in `family-devotions-world.json` (opening with U11's pieces if they did
not ship). Drafts and ledgers in `docs/work/family/world/`. The first four
(exile, the coin, praying for leaders, politics at the table) to James by
December 18 and live by January 8; the other eight by April 30.

**U23 Essay page, part one.** Items 2, 3, 6, 7 (kicker), and 9 of 6.2. Files:
`ArticleDetail.tsx`, `ReadingProgressBar.tsx`, `lib/shelf.ts`,
`lib/useEssayCompletion.ts`, `Writing.tsx`, `lib/html-body.ts`, `index.css`.
Done when references in each pilot link into the Study Bible and the progress
bar measures the body.

**U24 Essay page, part two.** Items 4, 5, 7 (foot), 8, and 10 of 6.2, and the
fixed foot order; the `questions`, `sources`, `related`, `pullQuotes` fields in
the essay JSON, `build-essays-index.mjs`, and `validate-essays.mjs`. Retires:
`RelatedEssays` and `ArticleNextSteps` on the essay page. Done when a pilot shows
the foot exactly in the 6.2 order.

**U25 Topics: the index and three pages.** Sections 4.1 to 4.4: the index, the
three pages, the build script and validator, the 9.3 checklist, search entries,
Test the Case on its row, the public-square tools on the politics page, the
`topic_lead_open` event. Pathway folds per question 6 (the politics page folds
two). The PR states what the 10-12 fold decided and why a topic page differs.
Files: `client/public/topics/`, `pages/Topics.tsx`, `pages/Topic.tsx`,
`scripts/build-topics-index.mjs`, `scripts/validate-topics.mjs`,
`scripts/validate-politics.mjs`, `App.tsx`, `vercel.json` (folds). Gate: question
6 (label and folds); James reads the preview by December 11.

**U26 Essays: Doubt, part A.** The five essays in 6.1 through the full process,
each with questions, sources, related, and a discussion guide; re-derive the
matching Honest Answers; the 301s from NOTES. Drafting starts October 28 in the
worktree. James reads the five on a preview of the current essay page by
December 4 (the text is what he judges); their questions, sources, and related
fields are added once U24 merges, and the PR goes live from January 1.

**U27 Quotation verifier.** Section 9.4, whichever branch question 2 allows.
Files: `scripts/data/esv-verified.json` or a BSB verifier, `scripts/`,
`ci.yml`. Done when a seeded wrong quotation fails.

**U28 Read the whole story in 2027.** Section 7.1. Files: a schedule derived
from `client/public/bible/story.json` by script, `StudyBibleGuides.tsx` or a new
page under `/study/bible/guides`, `lib/calendar.ts` reminder. Done when day 1 to
day 365 resolve to real chapters and position is kept on the device.

**U29 `/writing` asks for the shelf only.** An optional slugs input on
`posts.listPublished` in the dev router and both handlers in `api/index.ts`
(about lines 1657 and 2562); `Writing.tsx` passes the shelf's slugs. This needs
both runtimes; `api-parity.test.ts` stays green.

**U30 History registry and validator.** Registry files and schema (7.2);
migration of the four existing files and their regeneration with a drift check;
`scripts/validate-history.mjs` with the page threshold. Files:
`client/public/history/registry/`, `client/public/theology/church-history-*.json`,
`scripts/`. Done when the legacy pages render unchanged from generated files.

**U31 History views.** The course front door with `PageHead` and the one
reading list (retiring the 22-row list), person, council, and controversy pages
that clear the threshold, sheets by query parameter for the rest, the timeline
with URL filters and "alive in," `Tabs` and `EntityChip`, the `LoadFailed` fix
(`TheologyHistory.tsx:50`), and no unrelated indexes loaded. Files:
`pages/TheologyHistory.tsx`, `pages/history/`, `components/study/`, `App.tsx`,
the 9.3 checklist. Done when the front door's first screen holds the course and
every sheet has a URL.

**U32 History session template.** The session page (7.2), blocks renderer,
`SourceCard`, `CheckYourself`, `MythCheck`, `Disclosure`, leader toggle, print
handout, Crossway notice, the mirror rule written into the template's README,
the `history_session_complete` event, the 9.3 checklist for
`/theology/history/session/:slug`. Done with one test session that exercises
every block type.

**U33 History vertical slice.** The four sessions (7.2) with their registry
entries, claims ledgers, quotation ledgers, and the U07 survey, drafted in the
worktree. Gate: question 9 (the course's voice). Preview to James on January 11.

**U34 Accessibility on lazy routes.** Section 9.7. Files: `ci.yml` (quality
job), a Playwright script, `@axe-core/playwright` as a dev dependency.

**U35 Payload budgets.** `scripts/check-payload-budget.mjs`, warning first; lazy
catalogue loading where U37 has not already done it.

**U36 Essays: Doubt, part B.** The four essays in 6.1; re-point the Skeptic's
Track and switch it on if every stop is public. To James January 15.

**U37 Study Bible for thumbs.** Section 7.1, thumbs. Files: `StudyBible.tsx`,
`study-bible/ChapterNotes.tsx`, `VerseNotes.tsx`, `shared.tsx`, `lib/library.ts`
(verse and note items). Done when John 3 shows text on the first phone screen and
every verse is a 44 px target.

**U38 Tools registry tightening.** Section 7.4, January items. Files:
`ToolsHub.tsx` and its test, `tools/PassageContext.tsx`.

**U39 Cleanup, second pass.** Delete the four retired tool files (their
redirects stay; about 5,600 lines), the thirty `fontWeight: 300` requests, and
one of each duplicate how-to pair, with a redirect.

**U40 Catechism you can learn.** De-duplicate (question 7 decides baptism);
recite mode on the `Stepper`; "this week" reaching every question; fridge cards
printed from the page. Files: `family-catechism.json`, `FamilyCatechism.tsx`.

**U41 One devotion system.** Move the Builder's 40 pieces into the family data
with bands; convert KJV to BSB from the site's own text (question 8); the
Builder reads the shared data. Files: `tools/FamilyDevotionBuilder.tsx`, family
JSON, validator.

**U42 Page heads on tools and self-checks.** `PageHead` on the ten most-used
tools and the self-checks; the boxed left-rule cards replaced on the tools hub
and Deep Bible. Two PRs (tools, self-checks). Not run beside U19 or U66.

**U43 Lent for households.** A Lent set and booklet, placed by the year map;
Holy Week's existing set placed by date. Files: `family-seasonal.json` or a new
`family-*.json`, `help-printables.mjs`. To James January 27, live February 3.

**U44 Creeds you can learn.** Section 7.3. Files:
`pages/resources/CreedDocument.tsx`, `pages/resources/CreedsLibrary.tsx`,
`client/public/creeds/`.

**U45 Context guides that reveal.** Section 7.3. Files:
`pages/resources/ContextGuide.tsx` and the ten verse guides' data.

**U46 Essays: Faith and Power.** The section's pending essays plus the new
`baptists-and-the-wall-of-separation`, `what-romans-13-says`,
`is-it-wrong-to-love-your-country`, `end-times-israel-and-american-politics`;
point the four study guides at the rewrites; the 301s; the politics topic page
updated to lead with them.

**U47 Essays: After Christendom.** The section's pending essays; the 301s; the
after-Christendom topic page updated.

**U48 Topics, second wave, and the AI discernment guide.** Up to three pages
(cap six) chosen from search data (question 5), each retiring what it replaces;
the AI discernment guide ("Can I trust what an AI tells me about the Bible?":
check the source, the context, the translation) as a context-guide-style page;
improvements to the care pages the index rows open, in place.

**U49 The church remembers.** Twelve family devotions from the registry, each
linked to its session and person page, in `family-devotions-church.json`, under
the mirror and biography rules.

**U50 When the news comes to dinner.** Short conversation cards (an election, a
shooting, a scandal at a church, a death in the news), each with Scripture, a
witness from history, questions by band, the care guardrails, and the politics
check. The card on a friend who comes out waits on question 11. Lives under
`/family`, linked from topics.

**U51 History Part I; U53 Part II; U60 to U65 Parts III to VIII.** One Part per
PR on the approved template: sessions, registry entries, sources, ledgers,
handouts, readings linked. Each Part is drafted entirely in the worktree before
conversion, and carries source cards only where U07's survey found a reachable
text.

**U52 Easter to Pentecost for households.** Easter's fifty days, Pentecost,
and All Saints, placed by the year map.

**U54 Councils and controversies explorer.** `/theology/history/controversies`
(7.2).

**U55 Weekly devotions voice pass.** Section 5.11; two PRs of eight. James
gate: question 10.

**U56 to U59 Essays.** As 6.1, one section per PR. U59 excludes the held essays
until James answers questions 11 and 13.

**U66 Folds James approved.** Only after question 12: each fold a one-hop
permanent redirect in `vercel.json`, a `redirectTo` stub in `App.tsx`, the
FOLDED and KEPT lists in `site-structure.test.ts`, and the registry test.

**U67 One reading-order source.** Replace `reading-paths/index.json`,
`lib/readingPaths.ts`, and `data/reading-paths-post-christian.ts` with one
source; the pathways not already folded by topic pages follow question 12.

**U68 History atlas.** Section 7.2, only if James asks for it after the slice.

### 10.7 Later, if there is room

Dark mode (tokenize the 664 `rgba()` literals and Deep Bible's 81 hex values,
fix hero pairings, collapse the alias tokens, then enable, behind a two-theme
screenshot check); self-hosted Greek and Hebrew faces and word occurrences; a
"what the numbers say" page, only once a person with access can check every
figure against its primary report; a 60-day "in its world" Bible plan; a
couple's week of devotions; a grandparent's weekend kit; a household rule of
life built on the Rule of Life Builder; full public-domain texts of the
summarized confessions; a recorded reading by James of the start-with essays;
the Integrated Life guides voice-passed where they are a topic's further
reading; the how-to library voice-passed; the history essays brought into the
essay register.

---

## 11. What to cut, retire, or fold

Folds that need a redirect follow the Decision Log pattern (one permanent hop,
a client stub, the structure test). Each is paired with the addition it offsets.

| What | Move | When | Paired with | James? |
|---|---|---|---|---|
| Six crisis landings (`/grief`, `/faith-crisis`, `/marriage-crisis`, `/parenting-help`, `/deconstruction`, `/church-hurt`) | Redirect each to its care page; they are orphaned duplicates | U06, this week | Topics index rows to care pages | No |
| `/parenting`, `/marriage`, `/for-families` (pre-elevation hubs, empty essay rows) | `/parenting` and `/for-families` to `/family`; `/marriage` to `/help/marriage` | U06 | The Table | No |
| Archive data files (unimported, unconfirmed first-person scenes) | Delete | U06 | none needed | No |
| Stale tool copy (nine descriptions, Which Lens ending) | Rewrite | U06 | none needed | No |
| `/family`'s empty essay rows and its all-posts download | Remove | U17 | Tonight at the table | No |
| The devotion accordion | Replaced by a page per devotion | U17 | `/family/devotions/:id` | No |
| Three pathways (`christian-nationalism`, `progressive-captivity`, `parenting`) | Redirect to their topic pages | U25 | The three topic pages | Yes (question 6) |
| Two overlapping history essay series | One ordered reading list on the course front door; no redirects | U31 | The course | No |
| `RelatedEssays` and `ArticleNextSteps` on essays | Replaced by hand-picked related and "Next in this section" | U24 | Essay page part two | No |
| Retired tool files (5,600 lines), `fontWeight: 300`, duplicate how-tos (two pairs) | Delete; keep one how-to of each pair and redirect the other | U39 | none needed | No |
| `/nation` essays that duplicate shelf essays | Redirect to the rewrite when it is live; `/nation` keeps the tools | U66 | Faith and Power essays | Yes (question 12) |
| Deep Bible Companion, Bible Study Guide, Passage Context tool | Fold into the Study Bible | U66 | Study Bible for thumbs | Yes (question 12) |
| Life Audit and Whole-Life Assessment | One instrument | U66 | none | Yes (question 12) |
| Three topical verse tools | One front door, Misused Verses kept as its own feature | U66 | none | Yes (question 12) |
| The other ten pathways and three reading-path sources | One reading-order source; pathways to topics or shelf sections | U67 | Topics wave 2, the whole shelf | Yes (question 12) |
| Wisdom topics as a destination | Keep the URLs; make them search results | U15 | Find | No |
| FAQ (10) and compare (6) pages | Link the FAQ pages from `/answers` ("Longer answers") and the compare pages from `/theology/traditions`; fold only where an Honest Answer covers the same question | U48 | Topics wave 2 | No |
| The 31 `/theology/doctrine` pages beside 62 Study Bible doctrines | Cross-link each to its Study Bible counterpart; do not redirect (Decision Log) | U37 | Study Bible for thumbs | Only if he wants one home |

Not to build: reader accounts, streaks and badges, an AI chat, a map or chart
library, carousels, pop-up modals, a quiz before an essay, a hundred committed
devotion PDFs, offline reading (the service worker is self-destroying by design;
reversing it is James's call and not proposed here), a sixth header door.

---

## 12. Open questions only James can answer

Sent as `docs/work/james/QUESTIONS.md` by U02 on October 28, ordered by when the
answer is needed; his answers kept verbatim in `ANSWERS.md`. Each says what it
unblocks and what happens if he does not answer.

**By Friday, October 30**

1. **Reviewing what goes out under your name.** Should every essay, session,
   and devotion be read by you on a preview before it goes live (the plan's
   default), or a sample per section, or read for voice by someone you trust
   while you keep biography and contested claims? May PRs that change only code
   merge on green checks with screenshots? And CLAUDE.md gives two book counts
   (21 and 25) and a years-in-ministry figure: if you want either printed,
   which is right? (Until then neither is.) *Unblocks every content unit and
   your merge load.*
2. **Checking the ESV.** Will you get a free ESV API key (api.esv.org) in your
   name, used once by us to fill a committed list of the verses the site quotes,
   and never by the build or by readers? If not, may essays and history sessions
   quote the BSB, named, so the build can check every word against the site's
   own text? If neither, quotations are matched against search results and the
   records say exactly that. *Unblocks U27.*
3. **Advent.** The family Advent set is a December 1 to 25 calendar. Advent this
   year runs November 29 to December 24 and changes length every year. Keep the
   calendar (the household custom) with its copy corrected, or rebuild it to
   start on Advent Sunday? *Default by November 13: keep the calendar, fix the
   copy and order, no new writing.*
4. **The fifteen live essays.** Keep them as your signed originals (labeled
   where they are book chapters), or give them the same edit as the rewrites?
   May *What "Post-Christian" Actually Means* lead "Start with these" in place
   of the introduction to *The Monster in the Mirror*? The first-person lines in
   `women-in-church-history` (seminary; "the church I now pastor" and the
   Holiness stream; "every history I have taught"): true and yours, or
   generalize? *Unblocks Home's essay row and that essay.*
5. **Search data.** May we read the site's Google Search Console and Vercel
   Analytics (or will you export the top search queries), so the topics are
   ranked by what people actually search? *Unblocks the topics ranking before
   U25 and wave 2 (U48).*

**By Tuesday, November 10**

6. **The doors and the topics.** Two pictures are attached. (A) Study, Topics,
   Family, Essays, About, with Books under About and on Home. (B) Study, Topics,
   Family, Essays, Books, with About beside Find Help. Which? Is "Topics" (your
   word on October 26) the label, or "Questions"? Does a topic page, as
   described in 4.1, read to you as the folded hubs coming back? And may each old
   pathway (*Faith and the Flag*, *Faith and the Cause*, *Raising Kids Who Keep
   the Faith*) redirect to its topic page when the page ships? *Unblocks U19 and
   U25's folds. Default: the interim doors; pathways link to topic pages
   without redirecting.*

**By Tuesday, November 17**

7. **Baptism in the family catechism.** Q47 and Q61 answer it two ways. Which
   answer, or both stated fairly? *Unblocks U40.*
8. **One household translation.** The family material uses the BSB so the words
   match the Study Bible and print in full; essays quote the ESV. Keep that
   split, or move the family set to the ESV? *Unblocks U41. Default: keep the
   split.*

**By Tuesday, December 1**

9. **The history course's voice.** Written in your first person under your
   name, or as the site's course in your register with no first person (any "I"
   line coming from you in writing)? *Unblocks U33. Default: no first person.*

**By Monday, February 1**

10. **The 72 weekly devotions.** Keep them as they are, or a voice pass on the
    sixteen weeks served first after Pentecost? *Unblocks U55.*

**By Monday, March 1**

11. **Where you land.** Women in church leadership, submission in marriage,
    Genesis 1, and sex, gender, and the body in the family and topic material:
    your position, or published open with both sides stated fairly? *Holds
    three essays, part of the Marriage section, a topic, and one family card.*
12. **Folds.** The Decision Log keeps every tool and `/nation`. May Deep Bible,
    the Bible Study Guide, and the Passage Context tool fold into the Study
    Bible; the Life Audit merge with the Whole-Life Assessment; the `/nation`
    essays redirect to their rewrites when live; and the remaining ten pathways
    redirect to topics or shelf sections? Does the Party Scorecard stay?
    *Unblocks U66 and U67.*

**Whenever you are ready**

13. **Your own words.** Which of these will you write or record: the "raising
    sons in a post-Christian country" essay; *What Does the Bible Say About
    Being a Father?* (held, because an agent should not write it under your
    name); what family worship has looked like in your home (the
    family-devotions care page has seven places marked for you); being a father
    without having had one; a recorded reading of the start-with essays?
14. **The weekly sheet.** Should *This week at your table* go out through the
    Substack newsletter, to pastors through PCN, or stay a page people print and
    forward? Under your name or the site's?

---

## Appendix A. Criticisms modified or declined, and why

Every other criticism in `critique.md` was accepted and applied where it
pointed. These were modified or declined:

1. **Park the atlas (§1.7).** Modified. Dark mode, Greek and Hebrew faces, word
   occurrences, and the numbers page are parked as recommended, and
   contemporaries became a timeline filter. The atlas stays as a late unit
   (U68) gated on James's verdict on the slice: it is part of the history
   consensus that James's "very interactive ... powerful" brief of 2026-10-14
   produced, so it is not something he did not ask for, but it is not built
   until he says the course is worth drawing.
2. **The label "Topics" (§2).** Modified. The default stays "Topics" because it
   is James's own word on 2026-10-26; "Questions" goes to him as the
   alternative in question 6, as the critique asked.
3. **A December 1 to 25 calendar with Sunday readings added (§5.2).** Modified.
   The default if James does not answer is the calendar with corrected copy and
   no new writing, because anything new under his name needs his read in the
   busiest month of his year.
4. **The family file layout (§4.5).** The critique left the choice to the unit;
   the plan decides it: keep the root `family-*.json` naming and glob it, the
   smallest blast radius (no fetch, printable, catalogue, or PDF changes).
5. **`year.json` generated from rules (§4.11).** Accepted, with one change: the
   generator writes a TypeScript module imported statically rather than a JSON
   file fetched at runtime, so Home's tonight line never waits on the network.
6. **The history slice in the first week of December (§5.3).** Not adopted as
   the target. The sources survey, registry, template, and four sessions cannot
   honestly be done and ledgered by then; the target is January 11, and an
   earlier preview is offered only if the work is ready.
7. **A voice pass on the weeks served December to March (§6).** Modified.
   Advent through Pentecost is served by seasonal sets, so only five plain weeks
   run this winter. The pass targets the sixteen weeks from May 17 and the
   question moves to February 1, which spares James in Advent.
8. **Questions numbered 9 to 12 appended (§7).** Modified. The questions are
   renumbered 1 to 14 in deadline order; question 7 was split so the search-data
   ask goes out this week while the newsletter channel can wait; the pathway
   fold joins the doors question, where it belongs; the CLAUDE.md biography
   numbers were added to question 1.
9. **Pages for people (§1.6).** Accepted and tightened: a person gets a page only
   when the entry clears a teaching threshold the validator checks (at least 150
   words and a cited source); shorter entries are sheets.
10. **One topic page per pathway (§1.2).** Accepted and extended: the politics
    page folds both `christian-nationalism` and `progressive-captivity`, so the
    fold itself criticizes right and left with the same instrument.
11. **Phase 0 folds (§1.1).** Accepted and extended: `/parenting` and `/marriage`
    fold in the same PR, since the first draft had already judged them
    no-decision duplicates, with the redirects that land on `/parenting` today
    re-pointed to stay one hop.
12. **U35's shared shell (§4.14).** Took the critique's other option: the page
    head sweep is scoped to the ten most-used tools and the self-checks, and
    other pages change only when a unit touches them.
13. **"The history essays are superseded by the course" (§4.4).** Wording
    declined: they stay as course readings. The conclusion stands: no em-dash
    sweep now; bringing them into the essay register is listed under later.

## Appendix B. First-draft unit numbers to this draft

| First draft | Now |
|---|---|
| U01 | U01 (worktree added); U02 (questions) is new |
| U02 | U03 (gate without ESV cache); U27 (quotation verifier) |
| U03 | U05 (with ledgers); U04 (first screen and ESV notice, from U10) |
| U04 | U12 (Advent moved to U13) |
| U05 | U11 (after the vote) and the pre-vote surfacing in U05 |
| U06 | U14 (three primitives); the rest built in U17, U31, U32, U37 |
| U07 | U16 (with text shards); U09 (parser) is new |
| U08 | U17 (core) and U21 (part two) |
| U09 | U15 |
| U10 | U04 (item 1) and U23 |
| U11 | U18 (reduced) |
| U12 | U19 |
| U13 | U20 |
| U14 | U07 (with the survey) |
| U15 | U30 (registry) and U31 (views) |
| U16 | U25 (three pages) |
| U17 | U26 (part A) and U36 (part B) |
| U18 | U28 (from the story path) |
| U19 | U37 |
| U20 | U32 (template) and U33 (slice) |
| U21 | U22 |
| U22 | U24 |
| U23 | U43 (Lent) and U52 (Easter to Pentecost) |
| U24 | U40 |
| U25 | U41 |
| U26 | U29 |
| U27 | U46 and U47 |
| U28, U29 | U51, U53 |
| U30 | U48 |
| U31 | U49 |
| U32 | U06 (stale copy) and U38 |
| U33, U34 | U44, U45 |
| U35 | U42 (scoped) |
| U36 | U08 (diagnosis) and U35 (budgets) |
| U37 | U50 |
| U38 to U41 | U56 to U59 |
| U42 | U60 to U65 |
| U43 | U54 (controversies), U68 (atlas, gated); contemporaries folded into U31 |
| U44 | Later (10.7) |
| U45 | Later (10.7) |
| U46 | U66 |
| U47 | U06 (archive files, Phase 0) and U39 |
| U48 | U25 (three pathways) and U67 |
| U49 | Later (10.7) |
| new | U02 questions, U09 parser, U10 church year, U13 Advent ready, U34 accessibility, U55 voice pass |
