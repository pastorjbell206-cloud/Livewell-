# Critique of the LiveWell Master Plan

Prepared 2026-10-26 by the critic, against `MASTER-PLAN.md` and the four
research files in this folder, James's directions of 2026-10-12, 10-14 and
10-26, `CLAUDE.md`, `docs/work/NOTES.md`, and the code on
`claude/todo-implementation-hhp4bm` (main at 3f204cd, #534). Every
engineering claim below was checked in the repo; file and line references are
given so the planner can confirm them. Nothing outside `docs/work/plan/` was
changed.

---

## 0. The verdict

The plan is careful, honest about what exists, and right about most of what to
refuse. Its readings of the site are accurate, its calendar dates are correct
(midterm Nov 3, Thanksgiving Nov 26, Advent Nov 29, Ash Wednesday Feb 10,
Easter Mar 28, Pentecost May 16), and its "things not to build" list is the
right list. James would recognize his site in it.

It is not yet tight enough to hand to agents. Five problems run through it:

1. **It adds far more than it subtracts, and it subtracts late.** Ten topic
   pages, a sixth and seventh family route, five history entity types, a
   timeline, an atlas, a contemporaries view, a statistics page, a
   conversation-card set, a Lent set, and twelve new essay-page features arrive
   from November; the folds that would offset them (pathways, the two history
   essay series, Deep Bible, the `/nation` duplicates) sit in U46 to U48, in
   May and June. For eight months the site gets busier. James asked on
   2026-10-12 for "a very simple clean site that I continue to add to ... run
   that real tight." Adding is in his words. Sprawl is not.
2. **Several engineering claims are wrong in ways that would break CI.** The
   reference parser the plan builds on does not parse human references; new
   param routes are not prerendered by the mechanism the plan names; a CI
   verifier reads a folder that is not on `main`; and the validator scope
   extensions would fail the build on existing content. Section 4.
3. **The critical path to Advent runs through a platform library.** The Table
   (U08) waits on ten study primitives (U06, size L) and VerseRef (U07). If
   either slips, the one thing that must be live by November 29 is not.
4. **Its ESV gate depends on a check no agent can perform** ("checked by hand
   against a print ESV"), and the five pilots it gates were stripped of their
   claims ledgers in the reset. Section 3.
5. **It never budgets James.** Forty-nine units, one PR each, "James merges";
   about 47 essays and 34 history sessions drafted by agents and published
   under his name; eight open questions. A pastor in Advent and Lent is the
   scarcest resource in this plan, and nothing schedules him.

The ten fixes that matter most, in order:

1. Ship the five pilots by Nov 2 without waiting on the ESV cache; reconstruct
   their quotation ledgers and add the Crossway notice instead (3.1, 3.2, 5.1).
2. Make "Advent ready" its own small unit, independent of The Table (5.1).
3. Cut The Table's dependency to the two primitives it needs; build the rest
   just in time (5.2).
4. Write one shared reference parser; the one the plan names parses only
   `Jhn.3.16` (4.1).
5. Register every new param route in prerender, sitemap, and site-routes, and
   add the canonical audit and lint to "Done means seen" (4.2).
6. Keep `docs/work/` on the work branch through a git worktree; move
   CI fixtures to `scripts/data/` (4.3).
7. Topics: one index and three pages first, each built by upgrading and folding
   the matching pathway in the same PR; no topic page where a care page
   already answers the question (1.2).
8. Pair every addition with its fold in the same week; move the folds that need
   no decision (crisis landings, stale tool copy, archive data files) into
   Phase 0 (1.1, 5.1).
9. Park dark mode, the atlas, contemporaries, Greek and Hebrew faces, word
   occurrences, and the numbers page; drop the dual-theme screenshot tax (1.7).
10. Put James's review load in the plan: what he must read, when, and in what
    form; add four questions to section 12 and order all of them by deadline
    (section 7).

---

## 1. What would make the site busier rather than more useful

### 1.1 Additions land now; subtractions land in June

Count what the plan adds to the reader's site, by when:

| Phase | Adds | Takes away |
|---|---|---|
| To Nov 25 | Home: Find, Today (three items), Questions people are carrying; `/family/tonight`, `/family/devotions/:id` (112 pages), `/family/this-week`, table mode; nav doors; essay page items 1, 2, 3, 6, 8, 9 | `/for-families` repointed |
| Dec to Jan | `/topics` and five topic pages; a 60-day plan; history registry, entity pages, timeline, course front door; essay page items 4, 5, 7, 10, 11 | none |
| Feb to May | Topics wave 2, AI guide, Lent set, Easter, Pentecost, news cards, creeds compare, context reveals, Greek and Hebrew, atlas, contemporaries, controversies, dark mode, 34 sessions | U46 folds (after answers), U47 cleanup |
| June | Numbers page | U48: pathways and three reading-path sources |

The 13 pathways at `/pathways/:slug` are the clearest case. They already are
topic pages (`christian-nationalism` is "Faith and the Flag", `parenting` is
"Raising Kids Who Keep the Faith", `doubt-and-deconstruction` is "When Faith
Has Questions"), their subtitles promise "four essays" that are off the site,
and the plan leaves them live beside the new `/topics/*` pages until June.

**Fix.** Adopt a "one in, one out" rule in section 2: a unit that adds a reader
surface names the surface it retires or folds, in the same PR or the same week.
Concretely:

- Topics fold the matching pathway when each topic ships (ask James now; it is
  already inside question 5).
- The Table removes the dead essay rows from `/family` (the `teen-`,
  `apologetics-`, `parenting-`, `marriage-` lists, which render empty) and
  drops its `posts.listPublished` call (`Family.tsx:47`, which downloads all 959
  rows to show nothing).
- The six crisis landings, the stale tool copy, and the archive data files go in
  Phase 0 (they need no decision; section 11 says so).
- The history course front door replaces the 22-row essay list with the one
  ordered reading list in the same PR (U15), not later.

### 1.2 Topics duplicate four things that already exist

The plan's own rule is that a topic page needs "a reason a care page, an essay
section, or a study page cannot serve." The table in 4.2 does not give that
reason, and for most first-wave rows there is none:

- Topic 3 (*Can I trust the Bible*) leads with care page `trust-the-bible`.
- Topic 4 (*raising children*) leads with care page `family-devotions`.
- Topic 5 (*Is Christianity true*) leads with plan `skeptic` and sits beside
  care pages `curious`, `doubt`, `deconstructing` and 35 Honest Answers.
- Topic 7 (*church after what it did*) leads with care page `church-hurt`.
- Topics 1 and 2 (*living after Christendom*, *politics and the flag*) are the
  same ground as `/post-christian`, `/exile` and `/disruption`, which James
  folded into the After Christendom and Faith and Power shelf sections on
  2026-10-12 (`vercel.json` redirects). The inventory's own cluster analysis
  (inventory-content §6, item 2) names the Faith and Power section as the home
  for Christian nationalism. The plan contradicts its research without saying
  why.

There are also two "hard questions" lists (`/answers` and `/topics`), and a
third surface (the shelf sections) with the same subjects.

**Fix.**

1. **One index.** `/topics` is a single list of questions in the words people
   type. Each row opens the one best page: a care page, an Honest Answer, a
   shelf section, or a topic page. `/answers` stays live and is linked from it,
   not listed beside it.
2. **Three topic pages first,** where no single page assembles the answer and
   the subject is the post-Christian question itself: *faith, politics and the
   flag* (fold pathway `christian-nationalism`), *raising children in a secular
   age* (fold pathway `parenting`), *living after Christendom* (no pathway; make
   it the After Christendom section's companion and say so in the page). Rows
   for topics 3, 5 and 7 open the care page or Honest Answer directly, and the
   work goes into improving those pages instead.
3. **Cap at six** until question 7's search data exists, not twelve.
4. **Say in the PR what the 10-12 fold decided** and why a topic page is
   different from the folded hub. If James reads it as the hub coming back, he
   should be able to say so before it ships.

### 1.3 The topic page anatomy is a link farm in waiting

Eleven sections, each optional, each a list of links (4.3). That is what the
folded hubs became: categories with thin pages under them. The care page kit
already does sections 5 to 10 well.

**Fix.** Six sections, in this order: the question and short answer; read this
first (the essay, or the honest stand-in); Scripture read in its world (three
to five references, link mode, see 4.8); the church has been here before (one
witness); at the table (the family devotion); and one "use this" strip (the
plan, the study guide, at most two tools). Crisis care sits in the strip only
where the validator's `sensitive` flag requires it. Drop "Go deeper" and the
`SubjectShelf` fallback; the search page is the long tail.

### 1.4 The home page gains five sections

Today Home is James's headline and paragraphs, three doors, three essays, the
books, the newsletter, and Find Help (`Home.tsx`, 268 lines). The plan keeps all
of that and adds a Find field, a Today strip of three items, Family and Topics
doors, and six "Questions people are carrying." On a phone that is several more
screens before the books, on a page whose Lighthouse thresholds step already
fails on `main` (CI run 40382670533, `quality` job).

**Fix.** Add two things and stop: the Find field, and one line under it that
says the single most useful thing for tonight (in Advent, the Advent day; at
other times *Tonight at the table*), with *Continue* beside it only when the
device has something to continue. Drop *Today in Proverbs* (it is a tool, one
tap away under Study) and drop "Questions people are carrying" (the Topics door
and the `/topics` index carry it). Run the U36 diagnosis before U11, not after,
and lazy-load the reference parser and book list on focus, not on mount.

### 1.5 The essay page gains features and loses none

Item 1 of 6.2 is right and is the most valuable change on the page: put the
first sentence on the first phone screen. Items 6 and 11 then add chrome back:
a sticky section line, minutes left, and a "What do you think now?" choice
*before* the essay. Item 11 contradicts item 1 directly. At the foot, the page
already has save and send twice, cite, send to a skeptic, a pastor or a spouse,
the group-guide link, the book, the reading-path next step, four related
essays, the newsletter, the bio, and the end links (inventory-content §7). The
plan adds questions, sources, related, next in this section, a revised date,
and "Write to James," and removes nothing.

**Fix.** Drop item 11 from essays; keep myth checks for history sessions,
where the judges' consensus put them. Drop the sticky section line on essays.
Make items 7 and 8 replacements, not additions: the hand-picked `related` field
and "Next in this section" replace `RelatedEssays` (four from the same
section) and `ArticleNextSteps` (reading paths that are mostly empty). State
the order of the foot in the unit card so the next agent does not stack a
seventh panel.

### 1.6 Four hundred thin history pages

Entity sheets as pages (`/people/:id`, `/events/:id`, `/councils/:id`,
`/places/:id`, `/sources/:id`) at the plan's scale (about 170 events, 100
people, 60 places, 25 councils, 80 sources) put roughly 435 new URLs in the
sitemap, the prerender, and the canonical audit. Most will be a paragraph.
That is thin content for search and a much larger site to keep.

**Fix.** Pages for people, councils and controversies, which carry real
teaching. Events, places and sources open as sheets addressed by a query
parameter on the page that shows them (`/theology/history/timeline?e=nicaea-325`),
with no route, sitemap entry or prerendered head of their own.

### 1.7 Expensive things James did not ask for

Dark mode (U45, XL in three PRs), Greek and Hebrew faces (U44, L), the atlas
(U43, part of L), the contemporaries view, and "What the numbers say" (U49, L)
are not in any of James's three directions. Two of them also tax every other
unit: section 2 requires "every new component is checked in light and with
`html.dark` forced on, even before dark mode ships," which doubles the
screenshot work of every UI unit for a feature planned for May.

**Fix.** Move U43, U44, U45 and U49 to 10.6 ("Later, if there is room"). Keep
the tokens-only rule, which already keeps dark mode possible, and drop the
forced-dark screenshot requirement until James asks for dark mode. Fold
"contemporaries" into the timeline as a filter ("alive in a given year") rather
than a view. U49 is also not buildable under the plan's own integrity rule
(3.6).

### 1.8 One hundred and twelve committed PDFs

"A card per devotion with a QR code to its page" through `build-pdfs.mjs`
means 112 binary files in `client/public/downloads/` that change every time a
devotion is edited, plus 52 optional weekly PDFs for the sheet.

**Fix.** Print from the page: a print stylesheet on `/family/devotions/:id` and
`/family/this-week` (the #534 Take It With You print path already exists). One
combined PDF of the year's cards, regenerated by `pnpm pdfs`, is enough for
churches that print in bulk. `qrcode-generator` is already a dependency, so a
QR on the printed page costs nothing new.

---

## 2. Off-brand or gimmicky

Most of the plan's interactivity passes the brand test ("unhurried, weighted,
grown-up"). Five items do not, or are close:

- **A myth check before an essay** (6.2 item 11). It puts a quiz between a
  reader and James's first sentence. Keep it in history sessions only.
- **"We did this tonight."** Right idea; keep it a plain button with no
  confirmation flourish, and never show a count of nights.
- **Today in Proverbs on Home.** A daily-habit widget in the hero's shadow reads
  like an app's engagement row. One tap away under Study is enough.
- **A sticky context bar on essays.** On a 390 px screen it permanently takes a
  line from a single-column essay. Sessions and the Study Bible may earn it;
  essays do not.
- **The label "Topics."** It is the word a CMS uses. The pages are questions,
  titled as questions, and the index is a list of questions. Put the label to
  James with the doors (question 1): "Questions" or "Hard questions" may say
  what the door holds better than "Topics."

---

## 3. Fabrication and invented-biography risks

### 3.1 The ESV check cannot be done as written

Section 9 says the ESV cache is filled from the ESV API with James's key, or,
without one, "each verse is checked by hand against a print ESV and the ledger
says so." An agent has no print ESV. `NOTES.md` records that esv.org is
unreachable from the sandbox and that verification has been done from search
snippets, which can return another translation or a misquotation. A ledger line
saying "checked against a print ESV" written by an agent would itself be a
fabricated record. And `verify-esv.mjs` only checks that a page matches the
cache, so a wrong cache entry passes forever.

There is a second gap: the site quotes the ESV without the copyright notice the
ESV permission terms require. No page or component carries "Scripture
quotations are from the ESV Bible ... copyright Crossway" (only
`ScriptureNote.tsx:31` names the translation).

**Fix.**

- Ledgers record the method actually used, in those words ("matched against
  search results from esv.org and BibleGateway on <date>"), never a method that
  was not used.
- Ask James question 6 this week, and add an alternative: if he will not get a
  key, may essays and sessions quote the BSB, named, which the build can verify
  word for word against the site's own text the way `validate-family.mjs`
  already does? That turns an unverifiable gate into a mechanical one. It
  changes a CLAUDE.md default, so it is his decision, not the plan's.
- Add the Crossway notice to the essay page footer and the session template
  (U03 and U20a), after reading the current permission notice for its exact
  wording and quotation limits. Do not paraphrase it from memory.
- Do not run the ESV API from the Vercel build. If James provides a key, an
  agent fills the cache once, commits it, and the build never calls out.

### 3.2 The pilots lost their ledgers

The five pilots were fact-checked before the reset; only the text survived
(`docs/work/essays/` holds the five drafts and no ledgers). U03 removes 79
em-dashes from them, which touches the quotations' surroundings, and then ships
them. The plan's own process (6.1 step 2) requires a claims ledger.

**Fix.** U03 includes a quotation-and-date ledger for each pilot (every
quotation, date, name and reference, its source, and the method used to check
it). This is a day's work across five essays and it protects the essays that
will define the site to a new reader.

### 3.3 "Vulnerable, in my tone" invites invented confession

James's 10-14 brief asks for the history study to be "authentic, genuine, deep,
vulnerable in my tone and style." The session template's "Where we do this too:
one mirror, with the writer inside it" is exactly where an agent writing in his
voice will reach for a first-person scene ("When I was an atheist, I ...", "In
my own church ..."). The plan's integrity rule covers this in general; it does
not name the place where the pressure will be greatest.

**Fix.** Add to the U20a template and to every history unit card: the mirror
speaks as "we" (the church, Baptists, American Christians, pastors) and never
supplies a first-person experience of James's. Any "I" line in a session comes
from James in writing, quoted in the ledger with the date he gave it.
"Vulnerable" is achieved by conceding the church's and the tradition's failures
honestly, not by inventing his.

### 3.4 Biography: the facts in CLAUDE.md disagree with each other

`CLAUDE.md` says "21 books" in one place and "25 books" and "15 years of
ministry" in the positioning statement. `NOTES.md` says never state years in
ministry, a title, or a book count, because they are unresolved. An agent that
reads CLAUDE.md first (as the plan instructs) will find both.

**Fix.** Section 2's integrity bullet should state the NOTES rule outright:
confirmed facts only (came to faith as an adult from atheism; raised without a
father; wife Susanna; five sons; a pastor of First Baptist Church of Fenton;
founded PCN); never years in ministry, a book count, or Southern Baptist
membership; no invented scenes, conversations, or congregants. Add
`what-fatherhood-requires` (pending in the Marriage section, and topic 4's lead
essay) to the list that waits for James, beside the raising-sons essay: an
agent writing about fatherhood under the byline of a man raised without a
father will be pulled toward his story.

### 3.5 The archive data files are a standing hazard

`client/src/data/*-articles*.ts` and `devotionals*.ts` contain first-person
scenes as James that nobody has confirmed (inventory-family §J flags "my son,
sixteen and furious"). The family inventory notes these "may be reusable" on
exactly the subjects the family and topic units will write about in November.
The plan deletes them in U47, in January.

**Fix.** Delete them in Phase 0 (they are imported by nothing; confirm with a
grep and the typecheck). Until then, put a line in NOTES: do not read or reuse.

### 3.6 Statistics on the site

The benchmark says plainly that no figure in it was read off a primary report,
because the sandbox's proxy refused Barna, Relevant and Google. U49 ("What the
numbers say") requires checking each figure against the primary report; from
this sandbox that is not possible. Topic 1's "8 in 10" and topic 5's "42%" are
marked "verify," but a topic page's short answer is where an agent will be
tempted to use them.

**Fix.** Rule in section 2: no statistic appears on the site in this plan's
scope unless a person with access has checked it against the primary report and
the ledger names who. Park U49 (1.7). Topic short answers argue from Scripture,
history, and the essay; they do not need numbers.

### 3.7 Primary sources for Parts III to VIII may not be reachable

`NOTES.md` lists what the sandbox can reach: the Writings-Database through
raw.githubusercontent.com; not CCEL, Wikisource, Gutenberg or New Advent. That
covers the patristic Parts (I and II). Luther, Calvin, Schleitheim, Trent,
Wesley, Richard Allen, Douglass, and the Barmen declaration are not in that
database. If their public-domain texts cannot be fetched, `verify-sources.mjs`
cannot pass, and Parts III to VIII cannot carry the source cards the course
promises.

**Fix.** U14 begins with an availability survey for every Part: for each
planned source, a reachable public-domain text and its provenance, or "not
reachable." Show the result to James with the slice. Where a source cannot be
reached, the session summarizes it in the narrative and says so, rather than
carrying an unverifiable card.

### 3.8 The byline

About 47 essays and 34 sessions, drafted by agents, publish under James's name.
The plan's human gates name "James's review for anything biographical,
first-person, or contested." Under that wording an essay with no first person
and no contested claim could go live without James reading it. A diff of JSON
in a PR is not a reading experience either.

**Fix.** No piece published under James's name goes live without his having
read it as a reader would. Each content PR carries a Vercel preview link and a
reading list in its description (title, minutes, what changed, which claims the
ledger could not fully settle). Question 9 (section 7) asks him how he wants
this. The same rule covers *This week at your table* if it goes out in his
name.

---

## 4. Engineering: parity, prerender, tests, validators

### 4.1 The reference parser the plan builds on parses only OSIS codes

The plan (7.1, U07, U09, 4.4) says passage lookup and VerseRef reuse `parseRef`
in `lib/bible.ts`. That function matches `^([1-3]?[A-Za-z]{2,3})\.(\d+)\.(\d+)`:
it reads `Jhn.3.16`, not "John 3:16," "jn 3 16," or "Romans 13"
(`client/src/lib/bible.ts:101`). The repo has four different reference parsers:

- `lib/bible.ts:101` `parseRef`: OSIS codes only.
- `lib/bible-notes.ts:213` `refHref`: full book names, no abbreviations.
- `lib/needs.ts:108` `studyBibleHref`: string munging, two special cases.
- `scripts/lib/bsb.mjs:44` `parseRef`: build side, with an alias table, ranges,
  cross-chapter ranges and verse lists. The best of the four.

**Fix.** A new unit before U07 and U09 (size S to M): one shared, tested
reference module usable from client and scripts, built from `bsb.mjs`'s alias
table and logic, extended with common abbreviations (jn, rom, 1 cor, ps, prov,
gen, matt, mk, lk) and loose spacing ("jn 3 16"). Retire `refHref` and
`studyBibleHref` onto it; leave the OSIS parser for the Study Bible's internal
codes. `validate-topics.mjs`, `validate-family.mjs` and VerseRef all use it.

### 4.2 New param routes are not prerendered by literal SEOMeta

Section 2 and U08, U16 and U20 rely on "literal meta." `prerender-heads.mjs`
skips every route containing `:` (`if (routePath.includes(":") ...) continue;`,
around line 1159). Param routes are reached only through the `LIBRARY_SOURCES`
manifest pass (line 988). The canonical audit, a blocking CI step, fails any
sitemap URL that has no prerendered head. And `scripts/lib/site-routes.mjs`
resolves links for the Grow validators from its own `paramSources()` map; a
link to an unregistered param route resolves as "unverified."

**Fix.** Every unit that adds a param route (`/family/devotions/:id`,
`/topics/:slug`, `/theology/history/session/:slug`, `/theology/history/people/:id`
and the other entity pages that survive 1.6) registers it in the same PR in:
`App.tsx`; a manifest the route reads; `LIBRARY_SOURCES` in
`prerender-heads.mjs`; `generate-sitemap.mjs`; `paramSources()` in
`site-routes.mjs`; `llms.txt`; and `PARAM_SAMPLES` in
`routes.smoke.test.tsx` if the sample slug would not render. Add to "Done means
seen" (section 0 item 5): `pnpm lint` (CLAUDE.md's self-check) and, for any
unit that adds or moves a route, `pnpm sitemap && pnpm build && pnpm prerender
&& pnpm audit:canonicals`, the CI step the plan's list omits.

### 4.3 `docs/work/` is not on `main`

`git ls-tree origin/main -- docs/work` returns nothing; the folder lives only on
`claude/todo-implementation-hhp4bm`. Two consequences:

- U14 stores raw source texts in `docs/work/history/sources/raw/` and adds
  `verify-sources.mjs` to CI. On a PR to `main` the raw texts are not there, so
  the gate fails or is vacuous.
- U01 makes `autosave.sh` "take the current branch." Today it commits
  `docs/work` on whatever branch is checked out and pushes the work branch
  (`git push origin claude/todo-implementation-hhp4bm`), so commits made on a
  feature branch are either lost or, once made branch-aware, ride into feature
  PRs and land drafts and ledgers on `main`.

**Fix.** Keep `docs/work/` on the work branch in its own git worktree
(`git worktree add /home/user/livewell-work claude/todo-implementation-hhp4bm`)
and point `autosave.sh` at that path; code units work in the main checkout on
their own branches and never stage `docs/work`. Anything CI reads (the verified
source excerpts and their stored public-domain texts, the ESV cache) is a
committed fixture under `scripts/data/` that ships in the unit's PR.

Also: five lanes editing one `plan/STATUS.md` and one `essays/LEDGER.md` will
conflict constantly. Keep status in each `plan/units/<ID>.md` (one file per
unit) and generate `STATUS.md` from them, or let only the lead edit it.

### 4.4 The validator scope extensions would fail the build

U02 and U04 extend `validate-no-emdash.mjs` and `validate-grow-voice.mjs` to
essays, history, family, topics, context, nation and pathways. Today
`client/public/history` holds about 200 em-dashes, `client/public/pathways`
46, and the family files 8 (all inside quoted BSB Scripture, per the family
inventory). Extending the gate means either a red build or about 250 edits to
the history essays hidden inside a unit sized M. It also goes past CLAUDE.md,
which permits the em-dash "sparingly"; the no-em-dash rule in NOTES is James's
rule for essay prose.

**Fix.** U02 extends both gates to `client/public/essays/` only. New surfaces
(topics, new family strand files, history sessions) are born inside the gate.
The history essays are superseded by the course and the pathways are folded,
so neither needs a sweep. Any gate on family files exempts text inside quoted
Scripture.

### 4.5 `validate-family.mjs` lists its files by hand

Its `SOURCES` array (lines 27 to 31) names `family-devotions.json`,
`family-devotions-2.json` and `family-catechism.json`. The plan puts new
strands, the year map, and the Builder's 40 pieces under a new
`client/public/family/` folder. Nothing would validate them.

**Fix.** U04 decides one layout (either move the five root `family-*.json`
files into `client/public/family/` and update every fetch, printable and the
catalogue, or keep the root naming for new files), and makes the validator
glob the folder instead of naming files.

### 4.6 VerseRef in sheet mode must satisfy `validate-scripture.mjs`

That gate fails any component that renders a verse record's `.text` without
rendering `<ScriptureNote>`. A sheet that shows BSB text must render it. The
plan says "BSB, named," which is the intent; name the component and the gate
in U07 so the agent does not hand-roll a label that the validator will not
recognize.

### 4.7 The same-instrument rule should cover the new politics material

`validate-politics.mjs` mechanizes CLAUDE.md's "criticize the right and the
left with the same instrument" for the nation essays and the folded topics. The
politics topic page, the "Before the vote" pieces, and the "When the news comes
to dinner" election card are the most trust-sensitive new writing in the plan,
and no new gate holds them to it.

**Fix.** Extend `validate-politics.mjs` (or have `validate-topics.mjs` reuse
its checks) to the politics topic and the family politics pieces: both
directions present, within the same word band.

### 4.8 Two translations on one page

The plan refuses BSB previews beside ESV quotations on essays (6.2 item 2), then
puts sheet-mode VerseRef on topics and history sessions, which quote the ESV in
their prose and source blocks. A reader would see Romans 13:1 in the ESV in the
short answer and in the BSB in the sheet.

**Fix.** One rule: where a page quotes the ESV, VerseRef is link-only. Sheet
mode is for surfaces that quote nothing or quote the BSB (devotions, catechism,
reading plans, the Study Bible's own guides, creeds' Scripture notes).

### 4.9 A verse sheet downloads the whole interlinear chapter

`/bible/ch/john/3.json` is 41,942 bytes because each verse carries its Greek
words, transliteration, gloss, Strong's number and parsing. A topic page with
five references would download about 200 KB to show five verses, against the
payload budget the plan itself sets in U36.

**Fix.** Generate a text-only shard at build time (verse number and text, no
`w` array), one small file per chapter or per book, and have VerseRef read that.

### 4.10 The one API unit, and a second one hiding in 6.2

- U26: `api/index.ts` handles `posts.listPublished` in two places (around line
  1657 and around line 2562). Both must take the new input, and the dev router
  too, or parity breaks on one path.
- 6.2 says "search indexes a rewrite's own text." Essay search runs on the
  server (`trpc.search.global` and `search.articles` in `Search.tsx`), so done
  there it is a second two-runtime change. Do it on the client instead: add the
  essays override manifest to the static library sources so a rewrite's own
  title and excerpt are searched, and let the server results drop any slug that
  has an override.
- The Table should remove `Family.tsx`'s `listPublished` call outright (1.1),
  which is a bigger saving than U26 for the family audience.

### 4.11 A hand-kept date map will rot

`client/public/family/year.json` "maps dates to devotion ids." Hand-entered
dates stop working on the first day after the last entry, and nobody notices
until a family sees no devotion.

**Fix.** Compute the church year from rules (Advent Sunday as the fourth Sunday
before Christmas; Easter by the computus; Ash Wednesday and Pentecost from
Easter) in a small tested module, generate `year.json` from it by script for
several years ahead, and add a test that fails when fewer than twelve months
remain in the generated map. Hand overrides live in a separate small file.

### 4.12 Devotion ids become permanent the day a card is printed

QR codes on paper cannot be recalled. U04 renames the colliding ids
(`forgiveness`, `obedience`); after that, every id must be stable.

**Fix.** U04 freezes the ids and adds a test that no id present in the
committed index is ever removed or renamed without a redirect entry.

### 4.13 Generated legacy files need a drift check

U15 generates the four `church-history-*.json` files from the registry "so
existing readers keep working." CLAUDE.md names index drift as a known trap.

**Fix.** Commit the generated files and add a CI check that regenerating them
changes nothing (the pattern `essayOverrides.generated.ts` already follows).

### 4.14 Sizes that are wrong

- **U06 (L)** is ten components with tests and two theme screenshots each.
  Split by need (5.2).
- **U08 The Table (L)** holds tonight, 112 devotion pages, table mode, bands,
  progress, the year map, reminders, the hub reorganized, a new panel, and 112
  QR printables. It is XL. Split: U08a tonight, devotion pages, table mode and
  progress (the Advent-critical part); U08b bands, printables, the library.
- **U15 (L)** holds the registry schema, migration, generated legacy files, a
  validator, entity pages, the sheet view, the timeline, the course front door,
  URL tabs, the `LoadFailed` fix and the payload fix. It is XL. Split
  registry and validator from views.
- **U35 (M)** retires the charcoal hero "across the site." There is no shared
  hero: 197 page files reference `var(--charcoal)` and hand-roll their own.
  Either build a shared tool-page shell first, or scope U35 to the surfaces
  this plan touches plus the ten most-used tools.

### 4.15 Accessibility checks on lazy routes

Section 9 proposes axe on ten routes in the quality job. `ci.yml` explains
why it audits only `/`: every other route is lazy-loaded and the CLI evaluates
the empty shell before the route mounts, which produced false positives. Use
Playwright with `@axe-core/playwright`, waiting for the route's `main`
landmark, or the job will report noise.

---

## 5. Prioritization: what gives James the most, soonest

### 5.1 Phase 0 and the first week (to Nov 3)

The plan's best instinct is to get the five approved pilots live before the
midterm. Its sequencing endangers that: U03 waits on U02, and U02 waits on an
ESV cache that needs James's key or a check an agent cannot do.

Do this instead, in this order:

1. **Work hygiene through a worktree** (4.3). One hour.
2. **Ship the pilots** (U03) with `validate-essays.mjs` covering shape,
   Forbidden Language, the em-dash rule, exclamation points and public links;
   the reconstructed ledgers (3.2); the Crossway notice (3.1); and the one piece
   of U10 that matters most for a showcase essay, the first sentence on the
   first phone screen (contents card closed under 760 px, generated art below
   the opening). `verify-esv.mjs` follows when question 6 is answered and does
   not block the ship. Preview to James by Oct 30, live by Nov 2.
3. **A no-decision cleanup PR:** delete the archive data files (3.5); rewrite
   the nine stale registry descriptions and Which Lens's "Enter the pillar"
   ending; point `/for-families` at `/family`; redirect the six crisis landings
   to their care pages. These are visible defects today and need no question.
4. **Send James the questions now,** ordered by deadline (section 7), with the
   two nav options as screenshots rather than prose.

**U05 should move to after the vote.** Two new family pieces on politics,
written, ledgered, second-read and published in six days, the day before an
election, without James reading them, is the riskiest content move in the plan.
The more useful piece is also the later one: "When the grown-ups voted
differently" serves a family on November 4 to 10, when the results come to
dinner. Ship the pilots and surface `/help/politics` on `/family` before the
vote; send James the family pieces for the week after.

### 5.2 To Advent (Nov 4 to Nov 25)

- **Advent ready (new unit, S, by Nov 18).** The existing 25-day set runs
  December 1 to 25; Advent 2026 runs November 29 to December 24, and its
  length changes every year (22 to 28 days). "Redate to start November 29"
  leaves two days unwritten. Ask James (question 11) whether the set stays a
  December 1 to 25 Advent calendar, the common household convention, with a
  reading added for each Sunday of Advent and copy that no longer claims Advent
  begins December 1; or becomes a liturgical set of variable length. Fix the day
  24 order either way. Surface it on Home and `/family` from November 22,
  date-gated after mount. This unit depends on nothing else, so Advent ships
  even if The Table slips.
- **U04 family repairs** by Nov 10, with the layout decision (4.5) and frozen
  ids (4.12).
- **The shared reference parser and passage lookup** (4.1, U09) by Nov 13.
- **Primitives just in time.** The Table needs `Stepper` (table mode) and
  `Sheet` (VerseRef in devotions). Build those two, with `PageHead`, and stop.
  `Tabs` arrives with U15, `SourceCard`, `CheckYourself` and `MythCheck` with
  U20a, `StickyContext` with the Study Bible thumbs work if it earns its line.
- **U08a The Table core** by Nov 24: tonight, a page per devotion, table mode,
  progress on the device. Two age bands are U08b: the plan's own rule is "older
  questions only where real," and 72 devotions need about 216 new questions,
  which should not hold Advent hostage.
- **Home** (U11, reduced per 1.4) after the U36 diagnosis.

### 5.3 December and January

- **The Doubt essays:** first five to James by Dec 4, before the busiest weeks
  of Advent; the other four after Epiphany. Target Jan 1 for the first PR live,
  not the whole section.
- **Topics, reduced** (1.2): the `/topics` index and three pages by Dec 18, each
  folding its pathway.
- **The New Year plan from what exists.** The Study Bible already has the whole
  Bible in story order with "continue" (`bible/story.json`, eleven acts). A
  "Read the whole story in 2027" schedule derived from it (chapters per day,
  each day linking its context guide where one exists, a reminder) is mostly
  code and needs little new writing. The 60-day plan with a written question per
  day can follow in Lent if James wants a shorter path.
- **The history lane starts now, not Nov 20.** U14 depends only on U01. The
  slice preview should reach James either in the first week of December or
  after Epiphany (Jan 11); December 20 is the worst week of a pastor's year to
  ask him to judge whether 15,000 words sound like him. The same holds for the
  Easter target of Parts I and II: aim them at the second week of March, before
  Holy Week, or after Easter.

### 5.4 What gives James the most, ranked

1. The five pilots live, readable from the first screen (Nov 2).
2. Advent in front of families, dated right (Nov 18 to 22).
3. Typing "John 3:16" or "Romans 13" anywhere and landing on the verse
   (Nov 13).
4. Tonight at the table in two taps, with table mode (Nov 24).
5. The Doubt essays in front of the skeptic (from Jan 1).
6. The church history slice for his verdict (early Dec or mid Jan).
7. The politics, family, and after-Christendom question pages (Dec 18).

Everything after that is worth doing and can wait for his answers.

---

## 6. Missing pieces James asked for

- **The family devotions themselves.** James said "I want it to be very the
  family devotions." The plan rebuilds the mechanics (tonight, table mode,
  bands, year map) and adds two new strands. It never asks whether the 72
  existing devotions, which the family inventory judges kind, usable and
  generic ("could have been written by any careful Christian publisher"), get
  better. The year map will serve them for two years. Add a modest voice pass on
  the first twelve to sixteen weeks the map will serve (December to March),
  measured against the catechism parent notes and the Builder's teen bands,
  which the inventory names as the strongest family writing. Ask James
  (question 4 already) for the seven family-worship slots on the care page.
- **Tools, visibly.** James named tools on 10-26. In the recommended nav they
  sit inside Study as one link among seven. The skeptic's best tool, Test the
  Case, is on no door and not on Home; the inventory recommends surfacing it.
  Put Test the Case on the `is-christianity-true` row of `/topics`, and give the
  four public-square tools their place on the politics topic page in its first
  PR, not in U32 in January.
- **"Modern" that James can see soon.** The plan's most visible modernizing
  change, the compact page head in place of the charcoal prose hero, lands in
  U35 on January 29. Apply `PageHead` in Phase 1 to the pages the plan already
  touches (`/family`, the devotion pages, `/topics`, the history front door) so
  James sees the new grammar in November.
- **A way to know if any of this works.** CLAUDE.md defines success as depth
  (finished essays, returning readers, completed paths), and
  `lib/telemetry.ts` already sends privacy-light completion events to Vercel
  Analytics. The plan adds no events. Add a few with stable names and no
  personal data: a family devotion finished, a history session finished, a
  topic's lead essay opened from the topic. Keep the reader-facing copy honest:
  personal state is "on this device"; anonymous counts follow the telemetry
  contract.
- **Search data first, not last.** Question 7 asks for Search Console and
  Vercel analytics. The topic ranking, the Home questions, and the essay order
  all depend on it. Ask for it this week; re-rank topics before U16 builds a
  single page.

---

## 7. James's questions: add four, and order them by deadline

The plan's eight questions are good. Send them in this order, with dates, and
add these:

| By | Question | Unblocks |
|---|---|---|
| Oct 30 | 6. ESV key, **with the BSB alternative** (3.1) | The ESV gate; pilots' quotation checks |
| Oct 30 | 2. The fifteen live essays and "Start with these" | Home's essay row; pilots on the shelf |
| Oct 30 | **9 (new). How do you want to review work published under your name?** Every essay and session read on a preview before it goes live, or a sample per section? Should code-only PRs merge on green with screenshots? | Every content unit; James's merge load |
| Nov 10 | **11 (new). Advent:** a December 1 to 25 calendar with Sunday readings, or a set that starts on Advent Sunday and changes length each year? | Advent ready |
| Nov 10 | 1. The doors, **with option B** (below) and the label "Topics" versus "Questions" | U12, Home |
| Nov 10 | 5, part. **May each pathway fold into its topic page when the page ships?** (pull this out of question 5) | Topics without duplicates |
| Nov 17 | 3, baptism only (Q47 and Q61) | Catechism de-duplication |
| Nov 17 | 8. One household translation | The Table, U25 |
| Dec 1 | **10 (new). The history course:** written in your first person under your name, or as the site's course in your register with no first person? | U20 tone, the mirror rule (3.3) |
| Dec 1 | **12 (new). The 72 weekly devotions:** keep as they are, or a voice pass on the weeks served first? | Section 6 |
| Any time | 3 (the rest), 4, 5 (the rest), 7 | Held essays, his own words, folds, channels |

**Option B for question 1.** The recommended doors move Books under About. Books
is a door James approved on 2026-10-12, and the strategic reminders name book
purchases through Stripe as pending. Offer a second shape: Study, Topics (or
Questions), Family, Essays, Books, with About moving to the utility row beside
Find Help and to the footer (Home already introduces him above the fold). Let
him choose between two pictures.

---

## 8. Edits to make in MASTER-PLAN.md

Section by section, so the planner can apply them directly:

- **§0 item 5:** add `pnpm lint`; add the sitemap, prerender and canonical
  audit for any unit that adds or moves a route (4.2); drop the forced-dark
  screenshot.
- **§0 item 3 and §10.4:** `docs/work/` lives in a worktree on the work branch;
  CI fixtures live in `scripts/data/`; status lives in one file per unit (4.3).
- **§2:** add "one in, one out" (1.1); state the NOTES biography rule in full
  (3.4); add the no-statistics rule (3.6); add the byline rule (3.8); replace
  "`html.dark` forced on" with "tokens only, so dark mode stays possible" (1.7);
  add the one-translation-per-page rule (4.8).
- **§3.2:** Home adds Find and one tonight line with Continue; remove Today in
  Proverbs and Questions people are carrying (1.4).
- **§3.3:** add option B and the label question (section 7).
- **§4:** one index, three pages first, cap six, rows to care pages for topics
  3, 5, 7; each topic folds its pathway; six-section anatomy (1.2, 1.3).
- **§4.4:** `validate-topics.mjs` uses the shared reference parser and
  `site-routes.mjs`'s `resolveHref`; extends the politics same-instrument rule
  to the politics topic (4.1, 4.7).
- **§5.4:** `year.json` generated from rules with a horizon test (4.11).
- **§5.5 and §5.6:** print from the page; one combined PDF; ids frozen
  (1.8, 4.12); remove `listPublished` from `Family.tsx` (4.10).
- **§5.8:** settle the family file layout; validator globs the folder (4.5);
  add the Advent convention question (5.2).
- **§6.2:** drop item 11 for essays and the sticky line; items 7 and 8 replace
  `RelatedEssays` and `ArticleNextSteps`; "search indexes a rewrite" is done
  client-side (1.5, 4.10); add the Crossway notice (3.1).
- **§7.1:** VerseRef reads a text-only shard; sheet mode renders
  `ScriptureNote` and is link-only on pages that quote the ESV (4.6, 4.8, 4.9);
  replace "`parseRef` already exists" with the new shared parser unit (4.1).
- **§7.1, U18:** derive the New Year plan from the story path (5.3).
- **§7.2:** pages for people, councils and controversies only; events, places
  and sources as sheets by query parameter (1.6); the mirror rule (3.3);
  sources survey across all Parts before the slice is approved (3.7); fold
  contemporaries into the timeline; move the atlas to later (1.7); generated
  legacy files with a drift check (4.13).
- **§8:** primitives built just in time; U35 scoped or preceded by a shared
  shell (4.14, 5.2); `PageHead` on Phase 1 surfaces (section 6).
- **§9:** ESV ledger records the real method; the API is never called from
  the build (3.1); scope extensions limited to new surfaces (4.4); axe through
  Playwright (4.15); add telemetry events (section 6).
- **§10.2 and §10.3:** add the Phase 0 cleanup PR, the shared parser unit, and
  Advent ready; reorder to section 5; move U05 after the vote; split U06, U08,
  U15; start U14 now; move U36's diagnosis before U11; move U47's archive
  deletion into Phase 0; move U43, U44, U45, U49 to §10.6; collapse U48 into the
  topic units; retime the history preview and Parts I and II away from
  December 20 and Holy Week.
- **§12:** add questions 9 to 12 and the pathway fold; date every question
  (section 7).

---

## Appendix: what was checked

- `client/src/lib/bible.ts:101` (`parseRef`, OSIS only);
  `lib/bible-notes.ts:213`; `lib/needs.ts:108`; `scripts/lib/bsb.mjs:44`.
- `scripts/prerender-heads.mjs`: `LIBRARY_SOURCES` at about line 988; the param
  route skip at about line 1159. `.github/workflows/ci.yml`: the canonical audit
  step; the quality job's comment on axe and lazy routes.
- `scripts/lib/site-routes.mjs` `paramSources()`.
- `scripts/validate-family.mjs` `SOURCES`; `scripts/validate-no-emdash.mjs`
  `DIRS`; `scripts/validate-scripture.mjs`; `scripts/validate-politics.mjs`.
- Em-dash counts: `client/public/history` about 200, `client/public/pathways`
  46, family files 8.
- `git ls-tree origin/main -- docs/work`: empty. `docs/work/autosave.sh`: pushes
  a fixed branch.
- `api/index.ts`: `posts.listPublished` handled at about lines 1657 and 2562;
  `Family.tsx:47` calls it; `Search.tsx` uses `trpc.search.*` for essays.
- `client/public/bible/ch/john/3.json`: 41,942 bytes with interlinear words.
- `client/public/pathways/index.json`: 13 pathways and their subtitles.
- `vercel.json`: `/exile`, `/post-christian`, `/disruption`, `/pathways`
  redirects; no `/topics` route or redirect exists.
- `package.json`: `qrcode-generator` present; Radix primitives present;
  `lint` script present.
- 197 files under `client/src/pages` reference `var(--charcoal)`; no shared
  hero component; `PageHead.tsx` does not yet exist.
- No ESV copyright notice in `client/src/components` or `client/src/pages`.
- CI run 40382670533 on `main` (#534): `build` passed; `quality` failed at the
  Lighthouse thresholds step, as the plan says.
- Not checked: Lighthouse category scores (the job log was not readable here);
  the current wording of the ESV permission notice and the ESV API terms (to be
  read when the notice is added and before any cache is built).
