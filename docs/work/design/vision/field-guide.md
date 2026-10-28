# The Field Guide

One of four competing design directions for the LiveWell redesign (step 3 of the
design program in `docs/work/NOTES.md`). It is a proposal, not a decision.
Anything here that changes the brand contract, the Decision Log or a James gate
is listed in 6.11 and section 7 as his to decide.

**Read for this direction:** `CLAUDE.md` in full; `CRITIQUE.md` and all seven
critic reports in `critique/`; `research/A-SYNTHESIS.md`, `B-SYNTHESIS.md`,
`C-SYNTHESIS.md`, with `C-organized-systems.md` (GOV.UK, NHS) and
`B-post-christian-thought.md` (Psyche, the practical door) for detail;
`MASTER-PLAN.md` sections 0 to 4 and 10.6; `NOTES.md`; the unit files for what
is built or in review (U14 to U19, U21, U25, U28); the current screenshots in
`shots/current/` and the U25 screenshots of the topic pages. Pattern numbers
below are the syntheses' ranked patterns ("A 1" is pattern 1 of
`A-SYNTHESIS.md`). "CRITIQUE #3" is problem 3 of `CRITIQUE.md`; "ia.md C2" is a
finding in a critic's own report.

---

## 1. The promise

**Bring the question you are actually carrying, in your own words; LiveWell
meets it there and walks you down, at your own pace, through Scripture read in
its world, what the church confesses, and what the church has lived through
before, to a way of seeing you can carry back into the room.**

### Why this is the right direction for James's mission

James's brief names five aims: study the Bible, understand doctrine, understand
what a post-Christian America is, learn how to live in it, and have the tools
at hand. Four of the five are things a reader *does with a question*. Nobody
types "doctrine" into a search box. He types "Is the Trinity in the Bible?",
"my son stopped going to church", "our church is splitting over the election",
"why does God feel so far away". The site already writes for that reader, and
the critique found it everywhere but the front door.

1. **The contract already describes this shape.** The Formation Standard says
   every serious piece moves *symptom, cause, wisdom*: "Begin where the reader
   already hurts. Move beneath it to the assumption and the history they did
   not see. Arrive ... at a way of seeing they can carry into rooms the piece
   never mentioned." The Audience Standard settles the tie between the skeptic
   and the seeker: keep both, "the practical door first, the depth behind it."
   The Field Guide makes that movement the site's structure, not only its
   prose.
2. **The best page on the site is already built this way.** The critics who
   judged Find Help praised it ("NHS-quality symptom indexing," ia.md;
   "the best first screen on the site," CRITIQUE section 3). Its care pages
   already carry a descent in their data: `answer`, `happening`, `whyHard`,
   `scripture`, `thisWeek`, `moreHelp`, `helping`, `prayer`, `kit`, `faq`
   (`client/src/lib/needs.ts`). The IA critic's verdict: "The Find Help hub and
   the Study Bible chapter page prove the team already knows how to do this;
   the rest of the site should be rebuilt on their pattern." This direction
   does that.
3. **It answers the critique's two organizing failures directly.** CRITIQUE
   #4: the doors "are named for what you made, not for what a reader came to
   do." CRITIQUE #5: "the site's subject and its first reader both lack a
   front door." A question-first front door with the skeptic's question first
   fixes both, and gives post-Christian America the page it never had.
4. **The research converges on it.** GOV.UK's founding rule, "organize by what
   the user needs to do, not by who made the thing" (C 19; ia.md C1). NHS hubs
   by symptom and care cards by urgency (C 2). BioLogos and Be Thinking give
   every hard question its own page titled as asked (B 20). Sefaria's Guided
   Learning and Got Questions make questions the doors to doctrine (A 5, A 6).
   Shelley and Stanford enter history "through a person and a question" (B 7).
   Psyche gives practical writing one fixed, trusted shape with a review date
   (B-post-christian-thought 13).

### The metaphor, and where it stops

A naturalist's field guide (the genre Roger Tory Peterson's 1934 guide set) is
organized by what you see in the field, not by the taxonomy. You identify the
thing by its field marks, look at the plate, check where and when it occurs,
note what it is often confused with, and then read the full account. Every
part maps to something LiveWell needs:

| In a field guide | On LiveWell |
|---|---|
| Organized by what you see | The Guide: one registry of questions and situations in the reader's words, in seven regions (2.2) |
| The key that narrows it down | "Start from where you are": a field and two optional one-tap questions (4.1) |
| Field marks and "often confused with" | Two lines per entry in James's own "Not X. Y." move (4.3) |
| The plates | Drawn teaching in the house line: the river of two thousand years, the canon, the doctrine rings (6.5) |
| The range map, where and when | "The church has been here before": a verified witness placed on the river (4.5, 4.6) |
| The full account | The descent into the essay, Scripture, the creed and the history (4.2) |
| Field notes | The reader's own answers and kept lines, on the device (4.10) |

Where the metaphor stops: a field guide is a reference, and LiveWell must also
form. So every entry ends below the surface it started on, and the study
surfaces (the Bible, doctrine, history) keep a door of equal weight, so the
text is never only a servant of the reader's agenda. The descent runs both
ways: every chapter, verse, doctrine and era shows the questions in the Guide
that rest on it (4.7).

### What this is not

Not a help desk. "LiveWell" plus a loud "Find Help" already reads to the
skeptic as a wellness brand (visitor.md, section 2); a question-first site
could make that worse. So the Guide's first region is intellectual ("Is any of
it true?"), the second is the site's subject ("What happened to Christian
America?"), and care comes after them, while Find Help keeps its permanent door
for the person in trouble. Not a chatbot: MASTER-PLAN section 2 refuses "an AI
chat box," and so does this direction. Not a feed: nothing on the Guide shows
how recently it was published. Not a list of tips: "This week" holds practices
the site already wrote, and the formation hazards in `CLAUDE.md` (the clean
application turn, the certainty trade) are enforced by validators (8.4).

---

## 2. Information architecture

### 2.1 The doors

**Proposed:** **Questions · Study · Family · Essays · About**, with Find Help,
a visible search field (desktop) or icon (phone), My Library and Subscribe in
the utility row.

James chose **Study, Topics, Family, Essays, About** on 2026-10-26. This
direction keeps four of his five doors exactly and asks for one word and one
position:

- **"Questions" in place of "Topics".** Behind the door is a list of questions
  and situations in the reader's words ("I don't believe, but I'm curious,"
  "Politics is tearing my family apart"), not subjects. "Topics" is a category
  word, the kind of hub James folded on 2026-10-12. MASTER-PLAN 3.3 already
  offered "Questions" as the alternative because "the pages are titled as
  questions." The skeptic gets a door in his own grammar (visitor.md, section 1).
- **First, not second.** The header is read left to right as the table of
  contents (ia.md C1). The contract ranks the skeptic first, and the skeptic's
  way in is a question, not a study.

**What it costs James.** It reverses a word he chose a day ago and the order he
approved, and it edits the Decision Log line U19 wrote. It costs almost nothing
in code *now*: U19 (the doors) and U25 (`/topics`) are reviewed but local only,
not merged, so the label, the order and the route (`/questions`,
`/questions/:slug`) can change before merge with **no redirect**. The wave that
merges them is next in the queue, so the question is time-sensitive. After
merge it costs one 301 per URL and a re-pointed menu. **If James keeps
"Topics," nothing else in this document changes:** read `/topics` for
`/questions` throughout.

**Why not the IA critic's doors** (Bible, Doctrine, History, Our Moment,
Living; ia.md C1). They name James's aims, which is better than naming his
formats, but they still name the site's subjects, and they spend two of five
doors on study. The Field Guide puts "Our Moment" and "Living" inside one
Questions door as regions, and puts Bible, doctrine and history together under
Study, where a reader who came to study expects them.

**Doctrine** gets the second row of Study, "What the church believes," with its
own landing (5.7, A 6). Not a door: James decides that (CRITIQUE question 3).

**Find Help** stays in every header, in `--mustard-text`, crisis lines first on
its page: "the weight of important moments" is what mustard is for, and no
critic asked to remove it. The masthead fix for the wellness reading is a plain
descriptor beside the name (2.3), not demoting the crisis door. On the phone
menu, the first row becomes the search field, not a second Find Help (ia.md,
minor).

### 2.2 The Guide: one registry, seven regions

Today the site answers reader questions from four separate lists: the Find
Help registry (`client/public/needs/index.json`, 40 care pages, each with
`askedAs` phrases and reader `states`), the topics index (U25, three topic pages
and rows to other pages), the Honest Answers (35, in `client/src/data/answers.ts`),
and Test the Case (9 cases in `argumentCases.ts`), plus the `/start` "Find Your
Path" quiz nobody reaches (ia.md M8). That is CRITIQUE #2, the same job built
several times, at the level of the reader's question.

**The Guide is one generated registry** (`client/public/guide/index.json`, built
by `scripts/build-guide-index.mjs` from those sources, checked by
`scripts/validate-guide.mjs`). Each row: `id`, `askedAs[]` (the reader's
phrasings, the first shown), `kind`, `href`, `regions[]` (the first is home),
`for[]` (me, someone I love, people I lead; mapped from the existing
`ReaderState`), `sensitivity`, `line` (one sentence), `waiting` (a pending essay
with its live stand-in, U25's rule). Find Help, `/questions`, `/answers`, the
home key and search are **views of this one file**, never copies.

**Entry kinds** (what a row opens):

| Kind | What it is | Count today |
|---|---|---|
| Field entry | One question with one assembled answer across formats (U25's topic page, extended in 5.1) | 3 (cap 6 under MASTER-PLAN 4.1; 12 proposed, 6.11) |
| Care entry | A care page, practical door first (5.2) | 40 |
| Honest Answer | One hard question on its own page, four moves (5.3, B 1, B 20) | 35 |
| Case | A Test the Case argument, one move at a time (5.10) | 9 |
| Step by step | A task with an order (4.9, C 10) | 0; two proposed |
| Path | An eight-week plan or study course (5.11) | the existing plans |
| Pointer | A row that opens the one best existing page (an essay, a study guide, a history page), U25's index rule | about a dozen in U25 |

**The seven regions**, ordered by the contract's audiences (the skeptic first),
then the site's subject, then the hard places. Each region head carries a drawn
glyph (6.4), its name as a question, and, where James has already said it, one
line of his own published text verbatim. No region head is new writing in his
voice without his read.

| Region | Head line (verbatim where it exists) | What it holds today (care pages by slug) | Held for James |
|---|---|---|---|
| **1. Is any of it true?** | "If you do not believe any of this, I am not going to pretend your reasons are stupid." (`/about`) | `curious`, `trust-the-bible`; the 35 Honest Answers by family; the 9 cases; Which Lens; the skeptic's eight weeks ("Eight Weeks of Reading Like an Adult"); the Doubt essays as they go live | |
| **2. What happened to Christian America?** | "Nobody owes Christianity a hearing anymore." (`/about`) | Field entries `living-after-christendom`, `faith-politics-and-the-flag`; `politics`, `fear-of-the-future`; the `/nation` library (a hub and thirteen pages, today an orphan, ia.md C2); the After Christendom, Faith and Power and American Church shelf sections; the `attention` study guide; the slavery pilot; `/theology/traditions` | |
| **3. When faith is coming apart** | none yet | `doubt`, `deconstructing`, `church-hurt`, `empty`, `prayer` | the Doubt essays (due to James December 4) |
| **4. Marriage, children and home** | none yet | Field entry `raising-children-in-a-secular-age`; `marriage`, `divorce`, `dating`, `infertility`, `parenting`, `fatherless`, `family-devotions`, `caregiving`; the Integrated Life guides on marriage and family (69 guides in no menu today, ia.md C1) | "My grown child has left the faith." Today the row can open the `helping` section of `/help/deconstructing`; a field entry needs James's own story (NOTES: raising sons "needs James's own story; not written") |
| **5. Work, money, the body and the screen** | none yet | `work-burnout`, `money`, `job-loss`, `purpose`, `decisions`, `pornography`, `addiction`, `is-it-a-sin`; the Integrated Life guides on work, money and the body | the body, sex and identity (MASTER-PLAN question 11) |
| **6. Grief, fear and the long night** | crisis lines first, one line | `anxiety`, `grief`, `suffering`, `loneliness`, `diagnosis`, `healing`, `cant-forgive`, `anger`, `pets-and-heaven` | |
| **7. Growing, and helping others grow** | none yet | `new-believer`, `whole-life`, `reading-the-bible`, `fasting`, `pastors`, `refer-to-counselor`; Beginnings ("Eight Weeks of Beginnings"); the 68 group guides; the 2027 story plan | |

All 40 care pages are placed (2 + 2 + 5 + 8 + 8 + 9 + 6). An entry may sit in
two regions (`suffering` is also a question about truth). The validator fails
an entry with no region, a region with fewer than three entries, an `href`
that does not resolve through `scripts/lib/site-routes.mjs` or
`isPublicEssayHref`, and a duplicated `askedAs` phrase.

**The three situations in this direction's own brief, honestly placed:**

- *A son who left the faith:* region 4. No page answers it today; the interim
  row opens the care page's section for helpers; the field entry waits on
  James.
- *A church split over politics:* region 2, "Our church is splitting over
  politics," opening the field entry `faith-politics-and-the-flag` (its pilot
  essays, the "asked of both sides" block U25 built, Ambrose and Theodosius as
  the witness, 4.5) with `/help/politics` beside it; *When Your Church Becomes
  a Voting Bloc* shows as waiting until its rewrite is live.
- *A doubt that will not go away:* region 3, `/help/doubt`, with the Honest
  Answers and, when live, the Doubt essays.

### 2.3 The top-level map

**Masthead.** The wordmark, "by James Bell," and from 1100px a plain
descriptor in Inter 13px `--ink-muted`: "Theology that carries the weight of
everyday life." (the footer line and `lib/positioning.ts`; CRITIQUE #10 asks
James for one tagline, 6.11).

**Questions** (`/questions`, U25's `/topics` renamed before merge)
- `/questions`: the Guide. The key, the seven regions, a one-line crisis link.
  Menu: Every question; the seven regions (anchors); at the foot, Honest
  answers, Tools, Everything A to Z.
- `/questions/:slug`: field entries (5.1).
- `/help`, `/help/:slug`: the Guide opened at care, crisis first (never
  redirected, Decision Log); care entries (5.2).
- `/answers`, `/answers/:slug`: the "Is any of it true?" index by family; one
  page per answer (B 20); old `#anchors` resolve on `/answers` by a hash check.
- `/tools/test-the-case` and the other instruments (5.10); `/plans/:slug`;
  `/steps/:slug` (4.9); `/skeptic-track` as a path; `/nation/*` reachable from
  region 2 (not in the menu, as the Decision Log says).
- `/resources`: "Everything, A to Z" (C 19), generated from the Guide and the
  search index. It stays live as the Decision Log requires.

**Study** (`/study`)
- `/study`: one screen of choices (ia.md M4, C 19): three top tasks ("Look up
  a passage," "Start reading the Bible, step by step," "Church history from
  the beginning"), then The Bible, What the church believes, Church history,
  Creeds, The Bible in its world, Study with a group, Read the whole story in
  2027.
- `/study/bible`, `/study/bible/:book`, `/study/bible/:book/:chapter`
  (`?v=16` opens the verse panel, `?mode=read|study`).
- `/study/doctrine` (new landing, A 6), feeding the 31 debate pages at
  `/theology/doctrine/:slug` and the 62 studies at `/study/bible/doctrines/:id`
  (both kept; `/theology/doctrine/*` is never redirected).
- `/theology/history` and its era, person, council and session pages (U30 to
  U33); `/resources/creeds/:slug`; `/resources/context/:slug`;
  `/studyguides/:slug`; `/study/bible/guides/whole-story-2027` (U28).

**Family** (`/family`): Tonight at the table, the year of devotions, the
catechism, family reading plans, and two new shelves gated on James: *When your
child asks* (`/family/questions`, B 17) and prayers for ordinary moments
(`/family/moments`, B 24).

**Essays** (`/writing`): the shelf as contents (C 17), sections, a first-lines
view; `/writing/:slug`.

**About** (`/about`): About James, Books, Speaking, Contact, How we write and
check (C 1), What's new and corrections (C 1), Reuse (C 11), the letter
(Subscribe).

**Footer:** a real index of every door and region (ia.md minor; GOV.UK and the
NYT), Find Help, My Library, the newsletter form once, legal, PCN and the
podcast.

### 2.4 Page types

Field entry, care entry, Honest Answer, case (tool), step by step, path or
plan, the Guide index; Bible book, chapter and verse panel; doctrine landing
and doctrine page; church-history era, event (hinge), person, session; essay
and shelf; family devotion and Tonight; About pages; search results. Section 5
specifies each.

### 2.5 How each reader enters, and where they go next

| Reader | Usually arrives | First move | Next, and next |
|---|---|---|---|
| **The skeptic** | From search or a shared link, onto an essay or an Honest Answer (MASTER-PLAN 3.1) | The page asks him for nothing (B 2). The answer page opens on "Put at its strongest," with the direct answer on the first screen. From home: the first key row, "I don't believe, but I'm curious." | Test the Case at the move his objection names (`?case=&move=`), then the skeptic's eight weeks, then *Read Mark with a friend* (B 15) when written. The essay foot offers the Guide entry and "The strongest work on each side." Never an email box on these pages. |
| **The doubting Christian** | From search ("why does God feel far away") or a friend | Home key row 3, "I'm not sure I believe anymore," into region 3 | The care entry's In brief, then *Underneath* (the church has sat in this dark before), the lament psalms in their world, then a plan. Find Help is one tap away if doubt has become a crisis. |
| **The pastor** | From PCN or a forwarded essay | Home key row 5, "I lead a church or a small group," opens the Guide's leaders view (`?for=leading`, Help's existing "I'm leading a group" state) | Every field entry ends "With your group": the study guide with a dated run for his church (A 17, B 11), room mode (A 16), the printable handout and *Host a table* (B 18). *This week at your table* (U20) for the bulletin. Pastoral material that moved to PCN stays there. |
| **The seeker and the parent** | A Tuesday-afternoon problem, or 9 p.m. at the table | Home key row 4, Tonight at the table, or the field: "my marriage" | The care entry opens on *This week*, the practical door, with the depth below it; the parent goes to table mode in two taps (U17). |

### 2.6 Search

One box, everywhere (U15's `lib/siteSearch.ts`, extended, not replaced): the
header field on desktop with `/` to focus (C 18); on the phone, the search icon
opens a full-screen dialog with the field focused. Empty, it shows the five key
rows and "Recently visited on this device" (C 18).

Results are grouped by what the query is (CRITIQUE #3; product.md #4):

- **A reference** ("John 3:16," "jn 3 16") goes straight to the verse, as
  today.
- **A plain-language question** ("how do I talk to my kids about God") shows
  **In the Guide** first, matched on `askedAs` (Help's `searchNeeds`,
  generalized to the registry), then Essays, Study, Tools.
- **A doctrine word** ("grace," "justification") opens with a definition card
  (the glossary's `short` line and the catechism answer, learning.md m1), then
  Doctrine, Passage (Ephesians 2:8-9), Word, History, then the Guide.
- **Crisis words** keep priority over every pin (C 18).

Best bets and synonyms in a hand-edited `search-bestbets.json` with a validator
(C 18). The local boxes become scoped views that keep the query when widened:
Find Help (care-first ranking), `/writing`, `/tools`, and `/theology/search`
(kept, never redirected, now the one search scoped to Study). Free text that
matches a high-sensitivity care page is never written into a URL; the result
page carries the page's slug instead (Smart Answers' ADR 002,
C-organized-systems 1.1).

### 2.7 Folds and cuts, in short

The Guide absorbs the separate question lists and the `/start` quiz; `/answers`
becomes pages; `/resources` becomes the A to Z; `/nation` and the 69 Integrated
Life guides gain homes in regions; the skeptic track loses its lead magnet; the
essay's sales sequence goes; duplicate study tools fold into the Study Bible
with James's yes. Section 7 has the full list with reasons.

---

## 3. The home page

The home page has one job in this direction: in three seconds, tell each of
the four readers that his question has a door here, and that the person behind
the site knows the objections from the inside. James's headline and his
sentence stay; what changes is that the first screen *routes*.

### 3.1 Phone, 390 x 844, first screen

From the top (y in px, approximate):

1. **Header, 0 to 56, cream (`--nav-bg`).** Wordmark "LiveWell" (Cormorant 20px)
   over "BY JAMES BELL" (Inter 10px caps). Right: "Find Help" (Inter 15px 600,
   `--mustard-text`), search icon and menu icon, each a 44px target. The header
   hides on scroll down and returns on scroll up (mobile.md #2).
2. **Hero, from 56, black (`--charcoal`).** 24px top padding, 16px side
   gutters (one phone gutter, held as a token; mobile.md).
3. **H1, about 84 to 236.** James's headline as he chose it (#533), its words
   unchanged. Cormorant 400, 34px, line height 1.1, `--charcoal-fg`, four
   lines, broken by hand so that no line begins with a dash (today two do at
   390px, CRITIQUE section 3). Whether the two dashes become commas ("Learning
   to follow Jesus, and live well, in post-Christian America.") is his copy
   (6.11).
4. **The sentence, about 252 to 372.** Beside a real portrait (64 x 80, the
   self-hosted photograph from U08, not the 56px thumbnail), his published
   sentence moved up, verbatim: *"I was raised without a father and came to
   faith as an adult, after years as an atheist, so I know the objections from
   the inside."* Inter 17px, line height 1.5 (Home loads no new font; 8.4),
   full `--charcoal-fg`, not the 78% muted cream that sets it today
   (editorial.md, gray for primary text).
   The rest of the two paragraphs James chose (#533) moves, unchanged, to the
   top of "From James" on the next screens (3.3); MASTER-PLAN 3.2 keeps them on
   Home, and they stay on Home (6.11 item 8).
5. **Find, about 392 to 468.** U18's field as built: label "Look up a passage
   or ask a question" (Inter 14px 500), a 52px field on `--card` with Inter
   16px (no iOS zoom), placeholder "John 3:16, or your question," a Find
   button inside the right edge. The parser loads on focus, never on mount.
6. **The key, about 492 to 772.** A label, "Or start from where you are"
   (Inter 12px caps, `--charcoal-fg-muted`) after a 12px mustard rule, the
   screen's one mustard mark. Then five rows, each 52px, Cormorant 20px
   `--charcoal-fg`, an arrow at the right, a `--charcoal-line` hairline
   between. Skeptic first, in words already on the site:
   1. *I don't believe, but I'm curious.* (the `curious` care page's own
      title) opens region 1.
   2. *What does it mean that America is post-Christian?* opens the field entry.
   3. *I'm not sure I believe anymore.* (the `doubt` care page's title) opens
      region 3.
   4. *Tonight at the table: Strong Enough To Be Gentle.* U18's tonight line,
      folded in as a row: the static HTML says "Tonight at the table"; the
      title is filled after mount from the generated year map, never the
      network. In Advent it reads "Advent, day 6: ...".
   5. *I lead a church or a small group.* opens the Guide's leaders view.
7. **772 to 844:** the cream of the next section begins, so the page visibly
   continues.

Every row and its `href` are static HTML in the prerendered hero
(`scripts/prerender-heads.mjs` changes with `Home.tsx`, MASTER-PLAN section 2),
so the first paint does not wait on anything.

### 3.2 Desktop, 1440 x 900, first screen

1. **Header, 72px.** Wordmark and the descriptor at left. Doors at right:
   Questions, Study, Family, Essays, About (Inter 15px 500, `--ink`; the active
   door carries a 2px underline and lights for every page beneath it, ia.md
   M1). Find Help in `--mustard-text`. A visible search field, 260px, with a
   `/` hint. Subscribe as a text link with a 1px mustard underline, not a black
   button that outweighs the wordmark (brand.md).
2. **Hero, 72 to about 690, black,** on the 1180px container's 12 columns.
   - **Columns 1 to 7.** The H1 in Cormorant 400 at 64px, three lines. Then a
     portrait at 120 x 150 beside the sentence in Inter at 20px. Then
     the Find field, 56px tall and 560px wide.
   - **Columns 8 to 12: Plate I, the river.** An inline SVG about 460 x 300
     drawn in `--charcoal-fg` hairlines: one horizontal line from AD 30 to
     today, century labels every five hundred years in Inter 12px, five small
     ticks named for the era essays already written (the Constantinian turn,
     Westphalia in 1648, the American experiment, the attractional era, after
     Christendom; ia.md and visitor.md), and a band labeled *Christendom* in
     Cormorant italic whose ends are drawn **dotted**, because when it began and
     when it ended in America are argued (Priestley's convention, B 12). At the
     right end, a single mustard tick: *You are here.* The caption, in Inter
     13px `--charcoal-fg-muted`, is the field entry's own description line:
     "What has ended in America is Christendom, not the faith." Under it, a
     link to the entry. The band's dates come from the era essays and the
     history registry, checked by the validator, never typed into the drawing.
3. **Cream strip, about 690 to 900: the key.** "Start from where you are" in
   Inter 12px caps `--ink-muted` (no mustard here; the river's tick is this
   screen's mark). Five columns of about 236px, each a Cormorant 22px question
   over a hairline with an arrow, the same five rows as the phone.

### 3.3 The rest of the page

Backgrounds: black, cream, cream-warm, cream, black footer. No three in a row
share one, and no sliver bands between (editorial.md).

1. **This week** (cream; shown only when the device has something, rendered
   after mount from local data): Day 214 of the 2027 story plan if the reader
   has started it; one question coming back (4.10) if one is due; Continue
   (the last essay, plan or chapter, `lib/myProgress.ts`). Position, never
   performance (MASTER-PLAN section 2). A first visit sees nothing here.
2. **The Guide** (cream). The seven regions as a contents list: a drawn glyph,
   the region's question in Cormorant 24px, three of its questions as links in
   Inter 16px `--ink`, and "All 12 questions." On the phone, one column; on
   desktop, a two-column contents page, not cards.
3. **The ground underneath** (cream-warm). Three plates, each a door:
   - *The whole Bible:* Plate II, the canon map (66 bars, width by chapter
     count, in the seven divisions; CRITIQUE #1), with "Pick up where you
     stopped: John 4" when the device knows.
   - *What the church believes:* Plate III, the doctrine rings (A 8): what the
     creeds bind at the center, what faithful churches dispute in the middle
     ring, what is open at the edge.
   - *Two thousand years:* Plate I in its era mode (the seven eras labeled; on
     the phone this is the river's first appearance).
4. **From James** (cream). First the two paragraphs he chose for Home (#533),
   unchanged. Then the lead essay with its date, minutes and
   first sentence (C 17), or the current season when James has one (B 4). Then a
   short About: the portrait, "My story in my own words" (a link to `/about`),
   the PCN line. Books as one quiet line, not a band.
5. **Footer** (black). The real index. The newsletter form appears here once,
   and nowhere else on the page (CRITIQUE #7; ia.md minor).

### 3.4 Why it draws attention, and still feels unhurried, weighted and grown-up

It draws attention with things worth looking at: a reader seeing his own
question in his own words on the first screen; a drawing that shows, before a
word is read, that Christendom was a period and the faith is older; a pastor's
sentence that admits he was on the other side. Nothing moves on its own,
nothing counts, nothing asks for an address. The page is unhurried because it
offers five doors, not fifty; weighted because the black hero and the river
carry the subject; grown-up because it assumes the reader knows what he came
for. CRITIQUE #13 asks the vision to name its limits: no streaks, badges,
counts of people, carousels, autoplay, pop-ups, AI box, scroll-jacking or
parallax, here or anywhere.

---

## 4. Signature interactions

Ten. Each one either helps a person find the one right page, see the shape of
a thing, check a claim, or remember. None rewards a visit.

### 4.1 The key: "Start from where you are"

- **The reader:** types in his own words, or taps one of five rows on home. On
  `/questions` he may also answer two one-tap questions, both skippable: *For
  whom?* (me, someone I love, people I lead) and *What kind?* (whether it is
  true, something I'm going through, what is happening around us, wanting to
  grow).
- **What happens:** the Guide narrows in place, regions first, then rank. A
  line at the top says "Your answers: someone I love, something they're going
  through," each with Change, and Start again (GOV.UK's check answers). Typed
  words match `askedAs` across the registry first ("Closest in the Guide"),
  then the one search's other groups. Nothing is gated: the whole Guide is
  below.
- **Where:** home's first screen, the head of `/questions`, `/help` (opened at
  "carrying," crisis first), the empty search dialog.
- **Research:** GOV.UK start pages and Smart Answers (C-organized-systems 1.1;
  C 4); NHS hubs with at most three top tasks (C 19); Find Help's "Type it in
  your own words" and its reader states (CRITIQUE section 4); a placement
  question at the front door (ia.md M8; learning.md M9).
- **Why it serves growth:** "a novice cannot sequence a field he does not yet
  know" (learning.md C1). The key spends one tap to reach the one best page.
  It keeps nothing but a filter in the URL, and it retires the `/start` quiz.

### 4.2 The descent: stations and depths

- **The reader:** reads down a page, or taps a station by name, or chooses a
  depth: *In brief*, *The whole account*, *At the table*.
- **What happens:** every question-shaped page is built from fixed stations in
  a fixed order for its kind, each labeled by who is speaking (A 3). On a field
  entry: In brief (James Bell), Underneath, In Scripture, What the church
  confesses, The church has been here before, This week, At the table. A care
  entry starts at This week (5.2). On desktop a slim rail in the left margin
  lists the stations on a vertical hairline; the current one is ink with a
  12px mustard tick. On the phone, after the first screen, the auto-hiding
  bottom bar carries "In Scripture, 3 of 7," which opens a `Sheet` listing
  every station. *In brief* shows only In brief and This week; *At the table*
  jumps to the household version. The choice is kept on the device.
- **Where:** field entries, care entries, Honest Answers, history sessions.
- **Research:** C 15 (contents that stays; the NHS mini-hub; Wikipedia's Vector
  2022); B 13 (three depths of one story); A 2 (the quiet page by default);
  A 3 (every layer says who is speaking); Psyche's set shape
  (B-post-christian-thought 13); the Formation Standard's movement.
- **Why:** the structure teaches symptom, cause, wisdom without saying so. The
  seeker can stop at This week and is not trapped; the skeptic can go straight
  to Underneath; the station names are the same on every page, so the grammar
  is learned once (GOV.UK's "consistent, not uniform"). Stations with nothing
  in them do not render.

### 4.3 Field marks: "Not this. This."

- **The reader:** sees, under In brief, one or two lines in James's own
  ground-clearing move (`CLAUDE.md` structural move 1), each opening the place
  the distinction is argued.
- **Examples, drawn from text already on the site:** on the post-Christian
  entry, a mark distilled from U25's short answer ("What has ended in America
  is Christendom ... The faith itself has not ended."), worded for James's
  read, for example "Christendom is not the faith. What has ended is the
  arrangement." On the politics entry the pilot essay's own title already is
  the mark: *What Christian Nationalism Is, and What It Is Not.*
- **Data:** `marks: [{ not, is, href }]`, at most two per page (the revision
  pass: "One 'Not X. Y.' per movement, not per paragraph. Repeated, it becomes
  a tic."); the validator checks both halves are present, the `href`
  resolves, the Forbidden Language list is clean, and James's read is
  recorded.
- **Research:** the field guide's field marks; the visitor critic's demand that
  the definition come first, as the Stanford Encyclopedia leads an entry
  (visitor.md, section 0); C 20 (say how widely a view is held) for the same
  honesty about scope.
- **Why:** a careful reader needs the distinction before the argument. It also
  guards against the certainty trade by naming what the page does *not* claim.

### 4.4 The objection at full strength

- **The reader:** on an Honest Answer, a skeptic-facing entry or a case, meets
  four labeled moves: *Put at its strongest*, *What it gets right*, *The
  answer*, *What this does not settle*. In Test the Case he moves on with "Next
  move" or "Not convinced, but go on," never with "That's fair, keep going"
  (visitor.md, section 8). At the end, an optional private field: "In your own
  words, the strongest point against this," kept on the device, with *Send this
  to James* opening the contact form prefilled (B 19).
- **Where:** `/answers/:slug`, field entries (an `objections[]` block, *The
  strongest case against*, set at the hinge, never before the first sentence),
  the case pages.
- **Research:** B 1 (Rapoport's rules, Caplan's ideological Turing test, Test
  the Case's own `grants`); B 2 (the skeptic's page asks him for nothing); B 20
  (one page per hard question, "the whole argument on one screen").
- **Why:** honesty made visible in structure, so the skeptic "cannot accuse us
  of dishonesty" (`CLAUDE.md`, the Audience Standard). No verdict picker, no
  "Where do you stand now?", nothing recorded about his answer.

### 4.5 "The church has been here before": the witness card

- **The reader:** taps the witness on an entry. A sheet opens: the verbatim
  excerpt, its tombstone (author, date, place, original language, the
  translation and its public-domain status; C 13), *Read it closely* closed
  (four prompts, then James's reading in two to four labeled sentences; B 6),
  its tick on the river, and links to the era essay or session and the
  person's card.
- **Examples already stored by U07:** the Letter to Diognetus on the
  post-Christian entry (U25's witness line paraphrases it today; the card
  would quote the stored translation verbatim); Ambrose and Theodosius after
  Thessalonica in 390 on the politics entry (Ambrose's Letter 51, Theodoret
  5.17 to 5.18, *City of God* 5.26, all three stored, so *Compare the
  witnesses* can set them side by side, B 6); Polycarp before the proconsul
  for the cost of faith (the Martyrdom, stored).
- **Research:** B 3 (Readings), B 6 (read the source like a historian), B 7
  (enter through a person and a question), C 13 (one primary source, labeled),
  A 4 (the church on this verse).
- **Why:** it puts a person from the past in the reader's hand in his own
  words, which is "older than my culture" delivered by structure. Every
  excerpt must pass `verify-sources.mjs`; a witness whose text is not stored
  appears as a narrated line with no quotation, and says so.

### 4.6 The river (Plate I)

- **The reader:** sees one horizontal line of two thousand years and taps a
  band, a tick or a dotted end. Each opens its era essay or hinge sheet. On
  `/theology/history` a year control moves one vertical rule, and the list
  beneath answers "Alive in this year" (B 12); the year goes in the URL
  (`?year=1521`) so a teacher can send it.
- **Modes:** the *Christendom* mode on home and the post-Christian entry; the
  *era* mode on the history hub and each era page (the era filled in ink); the
  *witness* mode on any entry (only that entry's witnesses and hinges ticked).
- **Data:** era and hinge dates from the history registry (U30) with a
  `certainty` field; at most fifteen hinges, chosen by James (B 8).
- **Research:** A 10 and B 8 (one band grammar with "you are here"); B 12
  (Priestley's lives as lines, dotted where uncertain); John B. Sparks's 1931
  *Histomap* and the Met's Heilbrunn Timeline (CRITIQUE #8); learning.md M5:
  "That one image teaches the post-Christian thesis better than a paragraph
  can."
- **Why:** history is learned as shape before detail. Inline SVG from tokens, a
  "As a list" equivalent under every drawing, no zoom, no canvas, no library.

### 4.7 Up from the text: "Asked in the Guide"

- **The reader:** in the Study Bible, opens a verse panel or reaches a
  chapter's foot and sees *Asked in the Guide*: the questions that rest on this
  passage (Jeremiah 29 lists "What does it mean that America is
  post-Christian?"), then *On LiveWell*: the essays, devotions, plans and
  context guides that cite it.
- **Data:** A 1's inbound citation index, `scripts/build-verse-index.mjs`
  running U09's parser over Guide entries, essays, devotions, plans, context
  guides, creed notes and Honest Answers into
  `client/public/bible/refs/<book>/<n>.json`, with a `--check` drift gate.
  Doctrine pages and era pages get the same block from the same index.
- **Research:** A 1 (Sefaria's counted connections panel); product.md #6
  ("Discussed on LiveWell," Obsidian's backlinks); B 4's "read the archive by
  passage" from the same file.
- **Why:** the descent runs both ways. A reader who came to study finds where
  the text meets a life, and a reader who came with a life finds the whole
  passage, never a proof-text. It replaces John 1's keyword-matched "Go deeper
  on LiveWell" (learning.md m4).

### 4.8 Care cards by urgency, and a safe exit

- **The reader:** on a care entry, meets "When to get more help" as up to three
  cards, the action in the heading: *This week* ("Talk to your pastor or a
  counselor this week if:"), *Today*, *Now* ("Call or text 988 now, or call
  911, if:"). The Now card appears only on high-sensitivity pages and holds no
  link but the crisis lines. Exit this page is finished to GOV.UK's tested
  standard (three presses of Shift, a blank overlay, a first-time explanation
  of what it cannot do).
- **Research:** C 2 (NHS care cards; GOV.UK Exit this page; Chayn); mobile.md
  (the crisis lines as three full 44px buttons; "911" is a 21 x 17px target
  today).
- **Why:** the site raises its voice in exactly one card, by words and
  position, never by red or motion, and calm everywhere else is credible.

### 4.9 Step by step, for the few situations that have an order

- **The reader:** opens a numbered list of steps, each collapsed, each opening
  pages the site already has, joined by "and" or "or," with "Show all steps."
  Every member page shows "Part of: When someone you love dies, step by step."
  Ticks stay on the device.
- **First two:** *When someone you love dies: the first weeks* (its legal and
  money steps say they are not advice and point to the professional) and
  *Starting to read the Bible* (one ordered home for what three pages teach
  today, learning.md m6). Never more than six.
- **Research:** C 10 (GOV.UK step by step, eight rounds of research, and its
  rule against using it for reading lists).
- **Why:** a task scattered across six pages gets one ordered home. It retires
  the reading pathway each one replaces.

### 4.10 Field notes that come back

- **The reader:** at the foot of an entry, a chapter's Apply questions or an
  era essay, answers in one line (*Answer it now in a sentence*, B 7; A 14),
  keeps a line or a verse, and may put one of the page's own author-written
  questions on a return shelf. That question comes back after about five days,
  then two weeks, then five, answered "I had it," "Not yet" or "Skip for now,"
  and a sitting ends with the date of the next return (C 6).
- **Where:** My Library on the device ("on this device; nothing is sent," at
  the field), with Export so a year of notes is never trapped (product.md #2);
  a quiet "Ready to look at again" line on the page it came from.
- **Research:** A 14, A 21, C 6 (Orbit, Execute Program, Anki's "finished for
  now"), C 8 (commit, then compare); learning.md C4 (Roediger and Karpicke,
  2006; Cepeda and colleagues, 2006).
- **Why:** formation needs retrieval and a reason to return that is not a
  streak. Never on Home as a count, never a push, never a percentage.

---

## 5. Templates

Every template obeys the reading shell (6.10): the first screen begins with the
thing itself; the header hides on the way down; the phone's page controls sit
in an auto-hiding bottom bar within thumb reach.

### 5.1 Field entry (`/questions/:slug`; U25's `Topic.tsx`, extended)

**Structure.**
1. Head: kicker "Questions · What happened to Christian America?" (the
   region), the question as H1 in the asked-as words, a one-line dek in ink, a
   meta line "Reviewed 27 October 2026 · In brief, two minutes" (C 1). The depth
   switch.
2. **In brief:** U25's short answer, 150 to 250 words, in the text serif;
   every reference opens its verse (`VerseRef`); the field marks (4.3).
3. **Underneath:** the lead essay as a card with its first sentence and
   minutes (or U25's named stand-in, marked "waiting"); the river in witness
   mode; *The strongest case against* where the question turns on an
   objection; on politics entries, U25's "Asked of both sides" block, held by
   `validate-politics.mjs`.
4. **In Scripture:** three to five passages, each with one line and its
   context guide, in the page's one translation (MASTER-PLAN section 2: sheet
   mode where the page quotes the BSB or nothing, link mode where it quotes the
   ESV).
5. **What the church confesses:** the creed phrase and doctrine page that bear
   on the question, with the order of the question named (first, second or
   third; `CLAUDE.md`, "Handling a contested doctrine"). Hidden when nothing
   fits; never forced.
6. **The church has been here before:** the witness card (4.5).
7. **This week:** the plan, a step by step, at most two tools; the care page
   when one fits; crisis care only when the entry is flagged sensitive.
8. **At the table, and with your group:** the devotion (Start at the table),
   *When your child asks* where one exists, the study guide with a dated run,
   *Host a table*.
9. Foot: *Answer it now in a sentence*; the record (reviewed, corrected); Take
   it with you; two or three hand-filed related questions. No `SubjectShelf`.

**Interactive layer:** the descent rail and depth switch, verse sheets, the
witness sheet, the river, field notes.

**First screen, phone:** header; kicker with its 12px mustard rule (the mark);
H1 in Cormorant 32px, three or four lines; dek; the depth switch as a 44px
segmented control; the first lines of In brief in the text serif at 19px. U25's
screenshot already puts the short answer on the first screen; this adds the
switch and the marks below it.

### 5.2 Care entry (`/help/:slug`)

**Structure** (the practical door first, the depth behind it): on
high-sensitivity pages, one crisis line with three 44px buttons and Exit this
page; H1 in the reader's words ("I can't stop worrying"); **In brief** (the
`answer`); **This week** (the `thisWeek` steps made actionable in place: the
Worry Journal opens inline, "Tell one person" becomes a prefilled text, Psalm
131 opens in a sheet, steps tick and are remembered; product.md #15); **When to
get more help** (care cards, 4.8); **What is happening** (`happening`);
**Underneath** (`whyHard`); **In Scripture**; **If you are helping someone**;
**A prayer**; the church has been here before (optional); Go deeper (`kit`);
Questions (`faq`); "Page last reviewed" and "Next review due" under the last
section (C 1; every care file already stores `reviewed`).

**First screen, phone:** the crisis line (high sensitivity only), H1, the first
sentences of In brief, and a 44px "This week: six steps" jump. The bottom bar
carries the stations sheet with "Help now" first.

### 5.3 Honest Answer (`/answers/:slug`)

**Structure:** kicker with the family ("Jesus and the resurrection"); H1 as
asked; *Put at its strongest* (one or two sentences); *The answer in brief*, so
the seeker has the direct answer on the first screen (B 1); *What it gets
right*; *The answer*; *What this does not settle*; *Test it step by step* (the
case, opened at the matching move); *The full argument* (the essay); *Further*
(a book as a line); *The strongest work on each side* (two to four per side,
each with one sentence on what it argues, verified and ledgered); related
questions; the record. On the six second-order answers, a positions block at
equal length before the answer, with who holds each and since when (B 9, C 20).

**First screen, phone:** H1, the steelman sentence, the first paragraph of the
answer in brief.

### 5.4 Bible chapter (`/study/bible/:book/:chapter`)

**Structure** (CRITIQUE #1; product.md #1; learning.md M1): kicker "John · Act
Nine of the story" over Plate IV, the book band (a 6px strip of the book's
sections with one mustard tick where this chapter sits, A 10); H1 "John 1";
*Read | Study* (A 2), plus Hebrew and Greek as the third state; a two-line
summary with More; "John 1 in eight movements" (the `outline`, present in all
1,189 chapters); *Read with these in mind* (the three Observe questions,
collapsed to one line); *The question this chapter raises* where the `hard`
field exists (114 chapters, A 5); the text in the text serif at 20px with the
outline's headings in the text, the prologue in sense-lines, verse numbers small
and muted with a 40px hit area, a quiet dot on verses with a note; a
full-width "John 2" after the last verse; then the notes in one order, the
Interpret and Apply questions with private answer fields (4.10), *The church on
this chapter* as a dated rule (A 4), *Asked in the Guide* and *On LiveWell*
(4.7); "Mark as read" becomes "I've answered these."

**Interactive layer:** whole-verse selection opens the verse panel (5.5); the
bottom bar (previous chapter, a "John 1" book-and-chapter picker, next, Aa,
Listen); the depth setting (Reading, Studying, Teaching; learning.md M7)
decides which notes open.

**First screen, phone:** the kicker and band, H1, the Read and Study control,
the two-line summary, the collapsed questions line, the first outline heading
and verse 1 in the serif. Verse 1 is on the first screen (today it starts about
980px down, mobile.md #2).

### 5.5 Verse (the panel, `?v=16`)

**Structure:** U14's `Sheet` (bottom sheet on the phone at about 45 percent
with the verse visible above it; a 440px side panel from 1024px with "Follow my
reading"). Header "John 3:16" with previous and next verse at the foot. Rows
with counts, empty rows hidden, each opening in place with Back (A 1): Study
note; A question it raises; **Asked in the Guide**; Elsewhere in Scripture
("the 12 strongest," each with its first line, A 11); Words (A 18); The church
on this verse (A 4); On LiveWell; Your note.

**First screen:** the verse in the serif, then the first three rows. Search
landing on a verse opens the chapter at the verse with the panel open.

### 5.6 Essay (`/writing/:slug`)

**Structure** (CRITIQUE #7; editorial.md; C 3, C 12): kicker "Essay · After
Christendom"; title in Cormorant; dek in the serif's true italic; one byline
line ("James Bell · 14 minutes · Revised October 2026"); one row with Aa,
Listen and Save (the rest of #534's tools move into one share menu at the end);
the body in the text serif, 62 to 66 characters, no bold in prose, long
Scripture as block Scripture with its reference beneath, at most one pull
quote; notes in the right margin from about 1100px and opening under their
paragraph on a phone (C 3); *The strongest case against* at the essay's own
hinge where it has one (B 1); an end mark, then real space; the foot under two
heads, *To think about* (questions; "Say the argument in three sentences, in a
form James would sign," then his three, C 8; sources and the record) and
*Where next* (one next read chosen by an editor; **"This essay is the long
account in the Guide: [question]"**; take it with you; write to James; the
book as a line).

**First screen, phone:** kicker, title (34px), dek, byline, the one tool row,
and the first paragraph with its versal beginning by about 430px. "Send to my
phone" appears only on desktop (visitor.md, section 5).

### 5.7 Doctrine (`/study/doctrine` and the doctrine pages)

**Landing:** three ways in (A 6): *By question* (the catechism's 76 questions in
the adult register, the children's answer one tap away); *By the map* (Plate
III, the rings, with a plain list below in the same order); *By the Bible's
order* (the ten loci and the 62 studies). A guess before the reveal on the map
("First, second or third order? Your guess, then where the creeds land," C 8).

**Page:** kicker "What the church believes · Confessed by the creeds" (or
"Divides faithful churches," or "Open"); H1 as a question ("Who is Jesus
Christ?"); the *In brief* card (a white `--card` lifted on cream, 60 words or
fewer, each clause with a small letter that opens its proof text, A 7); the
ladder: In Scripture (the Study Bible doctrine study), Confessed (the creed
phrase, opened at its note), Where Christians differ (positions at equal length
with who holds each, B 9, C 20; where James lands, labeled as his), Words (the
glossary, opening in place, C 9), The church on this (dated witnesses),
Questions people ask (A 5), Asked in the Guide (4.7), Learn it by heart (A 22,
the repaired drill, C 7). The page ends in a prayer the church has prayed,
never a takeaway box (A 15).

**First screen, phone:** kicker, H1, the In brief card, "Learn it by heart."

### 5.8 Church history: era, event and person

**Era** (`/theology/history/:era`; CRITIQUE #8; B 7, B 8): kicker "Church history
· Era 2 of 7" with dates from the one spine James chooses (CRITIQUE question
6); Plate I in era mode; the question the era answers; an opening scene of one
or two sentences in Cormorant, every detail from a stored source, with Place ·
Date · Source beneath opening the source card (B 7); the body in the long-read
template, with sources and key figures in the margin and figures opening their
sheets (C 9); Acts and every reference live; *In their own words*, one verified
excerpt; *Questions this era answers in the Guide* (the reverse link);
"Can you say it back?", three prompts with their why (C 14); a byline; *Up next*
with the next era's dates and one line.

**Event (a hinge):** a sheet first (B 8): The world before, What happened (date,
place, people, one source line), The world after, What we still carry, The road
to it, and *Compare the witnesses* where two or three stored sources tell it
(Thessalonica 390).

**Person:** a registry sheet first, a page only past the plan's 150-word
threshold: name; dates with their certainty; a lifeline on the river (B 12); *In
their own words* only when five excerpts pass the verifier (B 7); where they
appear; the day the church remembers them (B 14), framed for Baptist readers as
remembrance through Hebrews 12:1.

**First screen, phone (era):** kicker, H1, the river strip with the era filled,
the question, and the scene with its source strip.

### 5.9 Family devotion and Tonight (`/family/tonight`, `/family/devotions/:id`)

Built in U17 and U21; this direction changes the first screen and adds two
doors. **First screen, phone:** kicker "Tonight · Week 44" (one counter, not
"69 of 72 · Weekly devotions · Week 44 of the year"; product.md #18); the
title; the verse set first and large in the serif at 22px (CRITIQUE section 3);
*Start at the table* (ink button) and *Read and pray* (outline; the smallest
faithful version, B 10); "About ten minutes · Younger | Older" (U21's band).
Send, Save, Print and Listen move to the end. **Added:** the four-doors strip
(morning, on the road, at the table, at bedtime) as table mode's last screen
before "We did this tonight" (B 10); *When your child asks* where the theme has
one (B 17); the Ask step's questions labeled by kind (B 16). The Guide's
region 4 links each family field entry to its devotion, and every devotion
whose theme matches a Guide entry says "For the grown-ups: [question]."

### 5.10 A tool (Test the Case as the example)

**Structure** (C 4): a start panel above every tool and self-check, always in
one order: what it does in a line, how long, what you will need, where your
answers go ("on this device; nothing is sent"), **when this is not the place to
start** with the right page, other ways to do it (print), and a Start button
worded as the act. One step per screen (`Stepper`); a thin position line
("Move 2 of 5"); results open with *Your answers*, each with Change; the end
links "Where this sits in the Guide."

**Test the Case, first screen, phone:** H1 "Did the resurrection happen?"; his
own promise, kept: "You can walk away unconvinced at any point and I will not
chase you."; Move 1's title and first paragraph; "Next move" and "Not
convinced, but go on." The nine-case picker goes behind "Other questions"
(product.md #16). *See the whole case* opens an outline with each objection as
a link into the stepper (B 20). Position kept on the device.

### 5.11 A path or plan (`/plans/:slug`, courses, step by step)

**Structure:** the whole path on screen one (A 17): numbered sittings titled as
the questions they answer, each with its length and kind, and a quiet mark for
the ones done on this device ("Week 3 of 8," never a percentage); *Use it with
your church*: a start date and cadence write the dates beside every sitting and
give back a link, a calendar file and a printable schedule (A 17, B 11); doors
and mercy after a gap ("pick up at your place, or join today," A 12); each
sitting ends with its question answered in a line; the path ends in a closing
rite, never a certificate (A 15).

**Moves:** "Eight Weeks of Reading Like an Adult" leaves "Help in a hard
season" for region 1 and Study; "Eight Weeks of Beginnings" for region 7 and
Study (learning.md C2). A step by step (4.9) is the same template with tasks in
place of sittings.

**First screen, phone:** title, one line on who it is for, the first three
sittings with lengths, "Begin week 1," and "Use it with your church."

### 5.12 The Guide index (`/questions`) and its `/help` view

**Structure:** `PageHead` with U25's H1, "Hard questions, and where to start,"
and its dek, "Each question opens the one page on this site that answers it
best."; the field (the one search, scoped "In the Guide" first); the two
optional key questions as one-tap chips with *Your answers* and Change (4.1); one
quiet line, "In danger right now? Call or text 988," linking the full crisis
lines; then the seven regions, each a glyph, its question, its verbatim head
line where one exists, and its first six rows (kind in the kicker: Question,
Care, Honest answer, Case, Step by step, Plan; the question in Cormorant 20px;
one line in ink), with "All 12 in this region" opening the rest in place (a hub
is one screen of choices, ia.md M10). Desktop adds a sticky contents list of
the regions in the left margin. The foot links Everything A to Z. `/help` is
the same component opened at "I'm carrying something," with Help's current
first screen kept as it is (crisis lines and "What people bring most" first);
"Hurt by church, or no longer sure" gets its own row near the top (visitor.md,
section 10).

**First screen, phone:** kicker, H1, dek, the field, the two chip rows, the
crisis line, and the head of region 1.

---

## 6. Visual language, inside the brand contract

### 6.1 Type

Three faces with three jobs (CRITIQUE #7; editorial.md; brand.md):

- **Cormorant Garamond** for display only, at 24px and above: H1, H2, the
  questions in the Guide, region names, scene lines.
- **A text serif** (proposed, 6.11): Source Serif 4 or Literata, self-hosted
  under the open font licence, with a true italic, for Scripture, essays, notes,
  creeds, devotions, In brief and every long read. If James declines, Inter's
  true italic is self-hosted so no emphasis is faked.
- **Inter** for interface, labels, metadata, captions and plate labels.

**Scale** as `:root` tokens on a ratio near 1.25 from 18px (editorial.md):
`--t-cap` 13px; `--t-ui` 15px; `--t-body` 18px; `--t-read` 19px phone, 20px
desktop (the serif); `--t-lead` 22.5px; `--t-h3` 28px; `--t-h2` 35px; `--t-h1`
44px (32 to 36px on phone); `--t-display` 55px; `--t-hero` 64 to 69px (home,
desktop only). Line height: serif 1.6; Inter 1.55; Cormorant 1.05 to 1.15.
Measure: 62 to 66 characters for the serif.

### 6.2 Rhythm and grid

An 8px base on the existing `--s-1` to `--s-9` tokens. Section spacing
`--s-6` on phone, `--s-7` on desktop. **Phone:** four columns, one 16px gutter
token on every page (today 16, 24, 32 and 48px, mobile.md). **Desktop:** twelve
columns in `--w-default` (1180px). Reading pages: the 680px column
(`--w-prose`), a 48px gap and a 240px note margin on the right from about
1100px (C 3); the descent rail in the left margin. Only one margin per side:
notes right, stations left; nothing else lives there (C tension 3).

### 6.3 Color: cream, black, and the mustard budget

- **Cream is the room.** Every long read is one paper color from title to end
  mark; no section-by-section color changes inside a piece (editorial.md).
- **Black is weight, earned:** the home hero, at most one verdict band on a
  page that has earned it, and the footer. Inner page heads move to
  cream through `PageHead` (brand.md: the black slab "no longer marks weight").
  This narrows the contract's "hero" to the moments that carry weight (6.11).
- **Mustard is punctuation:** at most one mustard mark per screen besides link
  underlines and the header's Find Help, the one standing exception. The marks
  it may make: the kicker's 12px rule, the river's "you are here" tick, the
  descent rail's current tick, the essay's versal and end mark, the selected
  point on the doctrine rings, the book band's tick.
  `--mustard` is fill and rule only; text on light surfaces uses
  `--mustard-text` (5.27:1 on cream) and only in a page's first kicker.
  Buttons are ink or outline; headlines carry no colored words.
  `validate-design.mjs` learns to fail `var(--mustard)` as a text color on
  light surfaces (CRITIQUE question 21).

### 6.4 Iconography

A drawn glyph set in the house line grown from `client/public/article-art/covenant.svg`
(brand.md): a 24px grid, a 1.25px ink stroke, one mustard point on the part
that matters. Seven region glyphs, seven era glyphs, a glyph per study kind and
per instrument (about fifteen). Lucide stays for interface controls only
(search, close, chevrons), and leaves the 36 tool cards where it is used as
decoration today.

### 6.5 Plates: the diagram language

Field-guide plates, drawn, never charted: **I. The river** (time, 4.6); **II. The
canon** (66 bars by chapter count in seven divisions, the Study Bible's hero);
**III. The doctrine rings** (A 8); **IV. The book band** (A 10); **V. Lives as
lines** (B 12, on the history timeline). Rules: inline SVG from tokens, live
text labels in Inter at 14px or more, drawn twice (for 390px and about 880px)
and switched by media query (C 22), every plate with an "As a list" `<details>`
equivalent, every mark opening text, no hover-only content, no zoom, one plate
per screen. Uncertainty is drawn, dotted, not hidden (B 12). Components live in
`client/src/components/plates/` with `.pl-` classes in `index.css`.

### 6.6 Images

An image is a witness or it is absent (C tension 7): one public-domain work or
artifact per era essay and long essay, toned to ink and cream, with a verified
caption (artist, title, date, holder, licence), and a small set of real
photographs of James and his rooms (CRITIQUE question 11). Generated covers
retire as real art lands (C 22).

### 6.7 Data graphics

None of people and none of statistics (MASTER-PLAN section 2: no figure on the
site until a named person has checked it against the primary report). Counts
appear only of library things: "the 12 strongest cross-references," "12
questions in this region" (A tension 4).

### 6.8 Motion

Only to show a change of state: a sheet opening (240ms, `--ease`), the header
hiding and returning, the depth switch cross-fading in 150ms, the next step of
Trace the argument (A 25). Nothing draws itself on load, nothing loops, nothing
moves while the reader scrolls. Under `prefers-reduced-motion`, every
transition is instant (the site already honors this).

### 6.9 Night

The pages that matter most are read in the dark (mobile.md #1). Night follows
the system by default, with Paper, Night and Auto in the one Aa menu beside
text size. In Night, every section sits in one low band (`--charcoal` and
`--charcoal-soft`), not black and cream; long text in cream at reduced
brightness; plates in `--charcoal-fg` hairlines; mustard text in the existing
dark `--mustard-text` (#E0B945); images toned down; `theme-color` follows the
shown theme. It ships only after the hero token audit and a render test of each
hero under `html.dark` (CRITIQUE question 19). The admin stays light.

### 6.10 The phone shell and accessibility

The header hides on the way down; an auto-hiding bottom bar carries the page's
own controls (chapter: previous, picker, next, Aa, Listen; entry: stations, Aa,
Save). Every target 44px; every input 16px or larger; the global focus ring
restored where 37 inline `outline: none` remove it; sheets and the search
overlay are dialogs (U14's `Sheet` already is); a thin pending bar after 150ms;
the Bible, the care pages, the Guide and the history kept offline by the
service worker within a stated budget (CRITIQUE question 22); axe blocking on
every captured route (CRITIQUE question 21).

### 6.11 Proposed changes to the contract and plan, for James

Proposals, not decisions. Each is his.

1. **Add a text serif** (Source Serif 4 or Literata) to the typography table
   for Scripture and long reading, with Cormorant for display and Inter for the
   interface; body line height 1.6 and a 62 to 66 character measure for the
   serif. *Reason:* long reading, Scripture and James's essays are set in the
   button face with fake italics (CRITIQUE #7).
2. **"Questions" for "Topics," first in the header**, at `/questions` before
   U25 merges. *Reason:* 2.1. *Cost:* his word of 2026-10-26 and the Decision
   Log line.
3. **Eyebrow labels in mustard only for a page's first kicker**; later section
   labels in `--ink-muted`. *Reason:* the contract's eyebrow rule and its 8
   percent mustard rule pull against each other on long pages, and six eyebrow
   styles have drifted (brand.md).
4. **"Black: primary surface (hero ...)" read as the home hero, an earned
   verdict band and the footer,** not every page head. *Reason:* brand.md and
   mobile.md (weight spent everywhere, and strobing bands on the phone).
5. **Night reading on, following the system,** after the hero audit.
   *Reason:* mobile.md #1. MASTER-PLAN parks dark mode; this asks to unpark it.
6. **Field entries up to twelve by the end of 2027,** each chosen from search
   data and read by James, against MASTER-PLAN 4.1's cap of six. *Reason:* the
   Guide routes most rows to existing pages, but the site's subject needs more
   than three assembled answers.
7. **One tagline,** used verbatim as the masthead descriptor: "Theology that
   carries the weight of everyday life." *Reason:* three taglines today
   (CRITIQUE #10).
8. **The home copy.** The headline's dashes become commas, or the line breaks
   are set by hand; and the two paragraphs he chose (#533) move below the key,
   with only his atheist sentence above it. *Reason:* lines begin with a dash
   at 390px, and the skeptic's credential sits at the bottom of the first
   screen today (CRITIQUE section 3; visitor.md, section 1). His copy, his
   call.
9. **A drawn wordmark and monogram, the glyph set, a public-domain art program
   and real photographs** (CRITIQUE question 11). *Reason:* brand.md.
10. **The folds in section 7 that touch the never-redirected list** (tools) or
    a Decision Log entry.

---

## 7. What it cuts or folds

| Today | Becomes | Why | James? |
|---|---|---|---|
| Four separate question lists (Find Help registry, U25's topics index, `/answers`, the case list) | One Guide registry with views | CRITIQUE #2 at the question layer: one job, one source of truth | No (data) |
| `/start` "Find Your Path" quiz, `/start-here`, `StartHereDiagnostic` | The key on `/questions`; one-hop redirects, re-pointing `/start-here` so it stays one hop | A second router nobody reaches (ia.md M8) | No |
| U18's separate tonight line on Home | Home key row 4 | One in, one out | No |
| `/resources` as a drawer sorted by file type | "Everything, A to Z," generated (stays live) | ia.md M2; C 19 | No |
| `/answers` as one long page | An index by family and one page per answer; old anchors resolve | B 20 | No |
| `/nation` as an orphan | Reachable from region 2 and the politics entry (no redirect) | ia.md C2 | No |
| 69 Integrated Life guides in no menu | Filed in regions 4 and 5 | ia.md C1 | No |
| The skeptic track's lead magnet and in-page signup | Removed; the footer line remains | B 2 | No |
| Home's in-page newsletter box; the essay's book band and stacked asks | One form in the footer; the book as a line | CRITIQUE #7, question 9 | Confirm depth over reach |
| Keyword-matched `SubjectShelf` lists ("dating advice under Church history") | Hand-filed related questions and the verse index | ia.md M9 | No |
| The skeptic and new-believer eight weeks under "Help in a hard season" | Regions 1 and 7, and Study | learning.md C2 | No |
| 36 tools at equal weight, stock icons | About fifteen instruments by the reader's job, each with a start panel and a glyph (U38) | product.md #12; ia.md M3 | No |
| Generated covers on seven surfaces | Retired as real art lands | C 22 | Art program |
| Deep Bible, the Bible Study Guide, the Passage Context Tool, `/tools/glossary`, `/theology/creeds`, the overlapping verse finders and `/wisdom` | Folded into the Study Bible, one glossary, one creeds library, and one "What Scripture says about ..." index inside the Guide | CRITIQUE #2 | **Yes:** tools are on the never-redirected list (CRITIQUE question 7) |
| `/theology/search` as a second engine | The one search scoped to Study (the URL stays) | CRITIQUE #3; never redirected | No |
| The theology quiz | Retired, or rebuilt as real questions keyed to a course | learning.md M3 | **Yes** (question 12) |
| "That's fair, keep going" | "Next move" and "Not convinced, but go on" | visitor.md, section 8 | No |

---

## 8. Build path in this codebase

### 8.1 What this reuses

Nearly every part exists or is in review: U14's `Sheet`, `Stepper`, `PageHead`;
U15's `lib/siteSearch.ts` (reference-first, plain questions, the parser loaded
on focus); U16's `VerseRef` and the 1,189 text shards; U17's Tonight, devotion
pages and table mode; U18's Home Find field and tonight resolver; U19's map in
`siteNav.ts` and its tests; U21's bands; U25's topic data, `validate-topics.mjs`,
`Topic.tsx`, `Topics.tsx` and the `.tp-` styles; U28's story plan; U07's
verified source corpus and `verify-sources.mjs`; U09's shared parser; the needs
registry with `askedAs`, `states` and `reviewed`; `lib/storage.ts`,
`lib/library.ts`, `lib/myProgress.ts`, `lib/calendar.ts`, `lib/telemetry.ts`,
`TakeItWithYou`, `CrisisBlock`, `QuickExit`, `EditorialIndex`, `HubGroup`,
`LoadFailed`.

### 8.2 Phases

**Phase 0, this week, before U19 and U25 merge.** James answers 6.11 item 2.
If "Questions": U25 renames its routes and kicker, U19 changes one label and
the order; no redirect exists to write. If "Topics": nothing changes.

**Phase 1, November to mid-December: the Guide and the front door.**
- *G1 The Guide registry.* `scripts/build-guide-index.mjs` (with `--check` in
  CI) merges the needs index, the topics rows, the answers and the cases into
  `client/public/guide/index.json`; `scripts/validate-guide.mjs` in the
  content-gates step (2.2's rules, Forbidden Language, no em-dash). U25's
  topic rows move into it.
- *G2 `/questions` and `/help` as views.* `Topics.tsx` becomes the Guide page
  (key, regions, crisis line); `Help.tsx` reads the same registry, crisis
  first. Retires `/start`.
- *G3 The home first screen.* `Home.tsx` and `scripts/prerender-heads.mjs`
  together: the key rows static, the river plate static (target under 6 KB of
  inline SVG), U18's Find unchanged, the tonight row filled after mount.
  Lighthouse no worse than after U08.
- *G4 The field entry template.* `Topic.tsx` gains a `ContentsRail` (C 15, new,
  shared with care pages and sessions), the depth switch, field marks, and a
  witness card that uses U32's `SourceCard` when it exists and a narrated line
  until then.

**Phase 2, December to January: the reading surface and the instruments.**
- *G5 The long-read template* with the text serif if James says yes (folds into
  U23 and U24 for essays; C 3 notes, C 12 ending).
- *G6 Care entries* (care cards, actionable steps, review dates; the 40 re-sorted
  lists go to James as one care-page review).
- *G7 Honest Answers as pages* with the four-move fields and validator (B 1,
  B 20; the 35 steelmen are the writing).
- *G8 Plates* I to IV in `components/plates/`; the river reads U30's registry.
- U38 (tools registry) takes the start-panel fields (C 4).

**Phase 3, January to Lent: the ground underneath.**
- *G9 The verse index and "Asked in the Guide"* (A 1), with U37 (Study Bible
  for thumbs) and the verse panel.
- *G10 The doctrine landing* (A 6) after James places doctrine.
- *G11 Two step by steps* (C 10). *G12 Field notes and returns* (C 6) once U32,
  U40 and U44 have questions worth returning.

**Phase 4, Easter onward:** U31's history views with the river and hinges;
Night after the hero audit; seasons and the letter (B 4, B 19) only at the
cadence James can keep; *Host a table* kits (B 18).

**Units that change:** U19 (label, order), U25 (routes, template), U18 (the
tonight line becomes a row), U38 (start panel), U42 (page heads), U48 (topics
wave 2 becomes Guide wave 2, cap per James), U66 (the folds he approves), U67
(the one reading-order source is the Guide's paths). No planned unit is
retired.

### 8.3 The two runtimes

This direction adds **no API procedure.** The Guide, the plates, the verse index
and the search are static JSON read on the client; the only API unit in the
plan, U29 (`/writing` asks for the shelf), is untouched, so `api/index.ts` and
`server/` need no paired change and `api-parity.test.ts` is unaffected. Every
new param route (`/questions/:slug`, `/answers/:slug`, `/steps/:slug`) goes
through the 9.3 checklist with literal `SEOMeta`, because `prerender-heads.mjs`
skips paths containing `:`.

### 8.4 The biggest risks

1. **It reads as a help desk.** A question-first front door can tell the
   skeptic "counseling brand." *Guard:* the skeptic's row and the truth region
   first, the subject second, care after; the descriptor in the masthead;
   every entry descends to Scripture and history; the Forbidden Language gate
   already catches the therapy register ("hold space," "lean into").
2. **The clean application turn.** "This week" could slide into tips.
   *Guard:* This week holds only practices the site already wrote (care steps,
   plans, tools); `validate-guide.mjs` fails a numbered takeaway box in In
   brief; a field entry cannot ship without Underneath.
3. **Another duplicate index.** If `/help`, `/questions` and `/answers` keep
   their own data, CRITIQUE #2 returns. *Guard:* one file, views only; a test
   that each page reads `guide/index.json`.
4. **James's time.** Field entries, field marks, region heads, the 35 steelmen
   and the re-sorted care cards are writing under his name and the byline rule.
   *Guard:* most rows point to existing pages; region heads use only his
   published lines until he writes more; entries ship a few at a time on his
   read.
5. **The guardrail firing one way.** Region 2 is the place partisanship would
   show. *Guard:* `validate-politics.mjs`'s both-directions check on every
   region-2 entry and head, as U25 already does for the politics page.
6. **The home page's speed.** *Guard:* static rows and plate, no new font on
   Home (the text serif loads on reading pages), Lighthouse held at U08's mark.
7. **The Decision Log.** The label, the never-redirected tools, dark mode and
   the topic cap are all his. *Guard:* each is a question in 6.11, with the
   design working under his "no."
8. **Plates becoming decoration.** *Guard:* one plate per screen, a list
   equivalent, every mark opens text, the river's dates come from data.
9. **Too much structure.** Seven stations on every page could feel like a form.
   *Guard:* empty stations do not render; In brief is one tap away; the
   stations are the page's headings, not a wizard.

### 8.5 What this direction did not verify

No screen proposed here was rendered; positions in section 3 are estimates to
be measured on a preview at 390 x 844 and 1440 x 900. The 40 care pages'
`askedAs` phrases were not checked one by one against the key's two questions.
The fit of each of the 69 Integrated Life guides to regions 4 and 5 was not
checked. The river's era dates and the Christendom band's ends are to come from
the era essays and the registry, not from this document. The text serif's
licence and file sizes are to be confirmed before it is proposed in a PR.
