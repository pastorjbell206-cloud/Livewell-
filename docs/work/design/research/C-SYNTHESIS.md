# C. Synthesis: world-class design outside the niche

Prepared 2026-10-27. Wave C of the design research for the LiveWell redesign,
answering James's brief ("the most organized, well-designed website that helps
people to study the Bible, to understand doctrine, to understand what a
post-Christian world is in America, and how to live it ... elite and
world-class, made by some of the best designers in the world, very critical of
what currently is, with a fresh vision ... interactive, with things that draw
people's attention ... a useful tool for people to study and learn and grow").
Wave A looked at Bible and doctrine products and wave B at the Christian
neighbors (church history, family, post-Christian thought, the skeptic). Wave C
looked outside the niche, at the products the design world itself holds up.

**Inputs.** The four cluster reports in this folder:
`C-editorial-design.md` (ED; 44 searches; code read: Tufte CSS, Gwern.net, the
Distill template, Our World in Data's `site/gdocs`, The Pudding's starter, the
Times' ai2html), `C-learning-ux.md` (LX; 43 searches; code read: Orbit, Khan
Academy's Perseus, Mathigon's content, The Evolution of Trust, Anki's strings),
`C-devotional-habit-ux.md` (DH; 44 searches; code read: Venite and Medito) and
`C-organized-systems.md` (OS; 38 searches; code read: the GOV.UK Design System,
publishing components and Smart Answers, the NHS service manual, Wikipedia's
Vector 2022, MDN's front end). Read against `CLAUDE.md`,
`docs/work/plan/benchmark.md`, `docs/work/plan/MASTER-PLAN.md` sections 0 to 3
and 6.2, `A-SYNTHESIS.md`, and the wave B reports wherever a pattern overlaps.
Seven further searches were made for section 4 (listed at the end). Pattern
numbers refer to section 2 of ED, section 4 of LX and section 3 of DH and OS;
"A 8" means pattern 8 of `A-SYNTHESIS.md`; B numbers refer to the ranked section
of the named B report.

**Limits carried over.** No live page or screenshot of any product was seen in
any cluster; no type size, spacing or color was measured. Visual judgments come
from code, design-system guidance, help centers and reviews. Every research
figure below (Lally, Cepeda, Richland, Irrational Labs, Duolingo's experiment
count, Wikipedia's search result) is a planning note under MASTER-PLAN section
2, never a figure for the site, and several reached the clusters secondhand.

**Checked in the repo for this synthesis** (so the patterns are sized right,
and three cluster claims are sharpened):

- `client/src/pages/tools/ScriptureMemory.tsx` stores a one-way "memorized" set
  under `livewell-scripture-memorized` (line 201), prints "{memorizedCount} of
  {totalVerses} memorized" (line 398) and a percentage (line 402). LX's repair
  is owed under MASTER-PLAN section 2 as written.
- `components/Markdown.tsx` renders with remark-gfm (lines 22 and 39), so
  `[^1]` footnotes parse. But no essay JSON exists yet on this branch or on
  `main` (`client/public/essays/` holds only `README.md`), and **none of the 15
  drafts in `docs/work/essays/` carries a single footnote.** Notes beside the
  text (pattern 3) is therefore a drafting convention to add to `BRIEF.md` and
  the rewrite pipeline now, not a renderer switched on over notes that exist.
- All 40 care files in `client/public/needs/` carry a `reviewed` record (for
  example `"on": "2026-09-30"` with a long review note) and a `sources` list;
  `pages/help/CarePage.tsx` renders neither. OS's review dates (pattern 1) are a
  display change over existing data.
- `client/public/theology/theology-glossary.json` holds 114 terms with `term,
  pronunciation, short, definition, seeAlso, doctrine`. It is linked from
  `/study`, the theology hub and theology search, and never from prose
  (pattern 9).
- `ArticleDetail.tsx` already draws no generated art on essays (its header:
  "A real cover sits after the opening section; generated art is not drawn").
  `GeneratedCover` and `GeneratedHero` survive on seven other surfaces
  (`StudyGuidesIndex`, `Discipleship`, `SermonSeries`, `LeadershipLibrary`,
  `ContextLibrary`, `CreedsLibrary`, `EditorialBlocks`). ED's "retires generated
  art" applies there, not to essays.
- The parts most patterns compose already exist: `components/study/Stepper.tsx`
  (driving Table mode with `lib/useWakeLock.ts`), `ListenButton`, `QuickExit`,
  `CitationCopy`, `TakeItWithYou`, `HubGroup`, `editorial/EditorialIndex`,
  `lib/calendar.ts`, `lib/library.ts`, `lib/storage.ts`, `lib/telemetry.ts`,
  and the verified sources corpus and verifier from U07.

---

## 0. The verdict

The four clusters studied fields that rarely look at each other: editorial
design (Gwern, Tufte, Distill, Our World in Data, the Times, the Atlantic,
Increment, Works in Progress, Craig Mod, the Public Domain Review), learning
(Quantum Country and Orbit, Execute Program, Brilliant, Khan Academy, Readwise,
the explorable explanations), the daily devotional habit (the daily-office apps
and the wellness apps), and organized systems (GOV.UK, the NHS, Wikipedia, MDN,
Stripe's documentation, the Stanford Encyclopedia of Philosophy). They agree
more than their fields would predict. The best of them are known less for what
they add than for what they show and what they refuse. They **show their
working**: the note beside the claim, a dated record of revisions and
corrections, a review date, a license, how sure anyone can be. They keep **a
rhythm set by the calendar rather than by the reader's chain**: a numbered
issue, a daily office, a fixed ladder of returns. They **order everything by
the reader's task and hour**. And they **removed** what most products add:
modules nobody clicked, steppers nobody reached, likes, streaks, an AI answer
box. Where they hold attention, they do it by asking the reader something about
himself and then showing him reality, or by bringing back what he met at the
moment he would have lost it.

Each field also holds a counter-family, and its own evidence is the argument:
Duolingo's 600-plus streak experiments and a bandit tuning notifications for
half a percent of daily users; Irrational Labs doubling Headspace course starts
with no rise in practice; Medito building a page for users to edit their own
stats; MDN withdrawing AI Explain within days; the Atlantic removing the
modules nobody used. Attention bought by mechanism does not become the thing a
reader came for.

LiveWell's rules already forbid the counter-family. What it lacks is most of
what the best family does. No page shows a dated record of its own life (the
care pages store one and hide it). Nothing the site asks ever comes back.
Crisis pages list signs without grading them. Tools begin without saying when
they are not the place to start. There is no daily page a reader can return to
at an hour. The shelf only grows. All of it can be built without accounts,
scores, a chart library or AI, and most of it is composition over parts already
in the repo.

**The opening this wave adds to A's.** A theological site with the reading
apparatus of Distill and Tufte, the care discipline of the NHS, the order of
GOV.UK, the finite rhythm of Increment, and the old church's daily office, each
made visible to the skeptic. No product seen does more than two of these, and
none of them is about God.

---

## 1. What world-class means here: the patterns that recur

Thirteen moves recur across the clusters. The table names who does each best,
which clusters found it, and where LiveWell stands.

| # | The move | Done best by | Also strong | Found in | LiveWell today |
|---|---|---|---|---|---|
| 1 | **The text is the interface;** apparatus waits its turn | Tufte CSS (links in the text's color, color reserved for figures) | Gwern's "semantic zoom"; the Atlantic's 2019 redesign; Venite's hideable rubrics; Wikipedia's narrowed column | ED, DH, OS | First sentence on the first screen (U04); Focus mode; no reading room for prayer |
| 2 | **Show your working at the claim** | Tufte and Gwern sidenotes | Distill's hover notes; Brilliant's "Why?" on every answer; NHS "where these facts come from" | ED, LX, OS | Sources planned for the foot (U24); no draft carries a note |
| 3 | **A dated record of the page's own life** | Our World in Data ("Past versions"; "This article is outdated") | Distill's corrections; NHS review dates; the Stanford Encyclopedia's revision dates; Linear's and the NHS's monthly updates | ED, OS | Care pages store `reviewed` and show nothing; essays will show "Revised" |
| 4 | **A rhythm kept by the calendar, not the reader** | The daily-office apps (Venite, Universalis, Sacred Space's dated pages) | Increment's numbered issues; Execute Program's fixed ladder; the NHS's monthly update list | DH, ED, LX, OS | The Table and the 2027 plan are dated; no daily page; the shelf only grows |
| 5 | **The part after the page** | Quantum Country and Orbit | Execute Program; Readwise's Daily Review; Day One's On This Day; Matuschak's salience prompts | LX, DH | Every check happens once; Scripture Memory says "memorized" for good |
| 6 | **Ask before telling, then show reality** | The Evolution of Trust | The Times' You Draw It and dialect quiz; Brilliant; the pretesting effect | LX, ED | Myth checks planned for history sessions only |
| 7 | **Context opens in place** | Mathigon's gloss and biography links | Matuschak's stacked columns; Gwern's popups; Venite's prayer list inside the office | LX, ED, DH | `VerseRef` sheets live; the glossary is never linked from prose |
| 8 | **Order by the reader's task and the hour** | GOV.UK (browse by task; step by step) | NHS hub top tasks; Venite choosing the office by the clock; Headspace's Today | OS, DH | Doors partly by format; Resources sorted by file type |
| 9 | **Say what this is before it starts** | GOV.UK start pages | Diátaxis's four kinds; Gwern's status line; honest lengths in Hallow and Pray As You Go; Psyche's reliability page | OS, ED, DH | Tools state time and privacy; nothing says "this is not the place to start" |
| 10 | **Grade urgency, and let the reader leave** | NHS care cards | GOV.UK Exit this page; Chayn's principles | OS (DH for the Examen's hard nights) | One flat list of signs; `QuickExit` honest but partial |
| 11 | **Free and reusable, said plainly** | Our World in Data ("Reuse this work freely") | Distill; the Public Domain Review; the Library of Congress; Pray As You Go ("always free") | ED, OS, DH | Free in fact; no license stated anywhere |
| 12 | **Calm by refusal** | The Atlantic removing infinite scroll and its modules | Are.na (no likes); MDN withdrawing AI Explain; the Times cutting steppers; Anki's "finished for now" | all four | Already the brand; the plan's refusals hold |
| 13 | **The rules written down, with when not to use them** | The GOV.UK Design System | The NHS service manual; Apple's HIG; Tufte's house moves; Matuschak's prompt guide | OS, ED, LX | Rules in CLAUDE.md, the plan and code comments; no pattern pages |

**What world-class means in this wave.** It is not polish, and it is not
features. The products the design world admires each made a few choices that
cost them something and that a reader can feel as respect. Tufte gives up color
in the text. The Atlantic gave up modules that produced clicks. The NHS
publishes a date that obliges it to review the page again. GOV.UK refuses to
let its own teams restyle a shared component. The office apps refuse to count.
Orbit lets the reader answer "Not yet." Each of those choices maps onto a
commitment `CLAUDE.md` has already made (verify or cut, the steelman before the
verdict, endings that leave weight, the skeptic's distrust of being handled).
LiveWell has those commitments in its rules. The work of this wave is putting
them on its pages, where a reader can see them.

---

## 2. The patterns most worth bringing to LiveWell, ranked

Merged and de-duplicated from the 58 ranked patterns of the four clusters (15
in ED, 13 in LX, 15 in DH, 15 in OS), and checked against A's 25 and the B
reports so nothing already ranked is ranked again.
Where a pattern sharpens one already ranked, it says which. Ranked by value to
the four readers (the skeptic winning ties), weighed against effort and
dependencies. **Fit:** core (the redesign should not ship without it), strong
(clearly right; schedule it), maybe. **Effort:** S is days, M is a unit of one
to two weeks, L is several units or sustained content work. Every pattern obeys
MASTER-PLAN section 2: tokens only, new rules as prefixed classes in
`index.css`, shareable state in the URL, personal state on the device through
`lib/storage.ts` and said plainly, no accounts, no scores, literal `SEOMeta`,
the 9.3 checklist for every param route, and one in, one out (each names what
it retires).

### 1. The honest record: dated, reviewed, corrected, on every page that asks to be trusted

*Merged from:* ED 3; ED 10 (the superseded notice and `/how-we-write`); OS 4,
OS 13. The same need is B-post-christian-thought 4.

**What it is.** Every page that asks to be trusted carries a short, dated record
of its own life where it is read. An essay's foot says when it was first
published, each revision in a line, each correction in a line, how to cite it,
and how to report an error. A care page, topic page or Honest Answer says "Page
last reviewed" and "Next review due" directly under its last section. An older
essay whose subject James has since rewritten says so at its top. One site-level
log lists, by month, what was added, revised, corrected and retired. One page
says how the pieces are made and checked.

**Done best by.** Distill's appendix ("Updates and Corrections," "Reuse,"
"Citation"); Our World in Data's foot ("Cite this work," "Past versions": "We
are a live site and we keep our work maintained") and its "This article is
outdated" notice; the NHS's review dates, moved closer to the text after users
missed them, with the rule that a date means a whole review; Mayo Clinic's
published review cycle; the Stanford Encyclopedia's first-published and
substantive-revision dates; the dated monthly updates of Linear and the NHS
service manual; Psyche's "Are Psyche Guides reliable?".

**On LiveWell.** Essays gain optional `revisions:[{date,note}]` and
`corrections:[{date,note}]`. MASTER-PLAN 6.2 item 9 ("Revised October 2026")
becomes a record block inside the foot's Sources item: First published ·
Revised (one line each) · Corrections (one line each) · Cite (`CitationCopy`) ·
Report an error (the contact form prefilled with the title and "Correction:",
separate from Write to James). Care pages render the `reviewed.on` they already
store and a new `reviewed.next`; `validate-needs.mjs` fails when `next` has
passed, as it already does for crisis-line dates; the long review note stays in
the data. Topic pages and Honest Answers carry the same two lines. A live essay
whose rewrite exists elsewhere opens with "An earlier essay. James has since
written on this in [title]" (not sticky on phones).

**One log, not two.** ED and B propose `/corrections`; OS proposes
`/whats-new`. Build one page, `/whats-new`, generated from the `revisions` and
`corrections` fields plus one hand-written line per PR (a line in the PR
template), with `?only=corrections` as the addressable corrections view the
footer links. `/how-we-write` (about 300 words to start): the draft, the claims
ledger, how quotations are checked and by what method (in the ledger's own
wording), that James reads everything under his name, how care pages are
reviewed and by whom, the corrections policy, what LiveWell will not do, and
that nothing here is legal, medical or financial advice. Leave out Gwern's
certainty words and importance score.

*Retires:* the bare revised date, the silent review, and any "Latest" module
that would otherwise grow on Home.

**Fit, effort.** Core · S (two fields, a builder, two small pages, two validator
rules). The essay half depends on U24. Any reviewer named besides James is his
to name.

**Evidence.** `distill-appendix.js`; OWID `GdocPost.tsx`,
`PastVersionsSection.tsx`, `CitationSection.tsx` and its deprecation notice;
the NHS "Know that a page is up to date" pattern and Standard for creating
health content; Mayo's Health Information Policy (search); SEP about pages
(search); Linear's changelog and the service manual's updates;
psyche.co/are-psyche-guides-reliable; `client/public/needs/*.json` (checked).
(ED 2.3, 2.10; OS 3.4, 3.13.)

### 2. Care that grades urgency, and lets the reader leave safely

*Merged from:* OS 1, OS 3.

**What it is.** On every care page, "When to get more help" becomes up to three
cards with the action in the heading: *This week* ("Talk to your pastor or a
counselor this week if:"), *Today* ("Get help today if:"), *Now* ("Call or text
988 now, or call 911, if:"), each with concrete signs beneath and a visually
hidden level word for screen readers. The emergency card appears only where the
subject calls for it. On pages for readers who may be watched, the existing
quick exit is finished to GOV.UK's tested standard: three presses of Shift, a
hidden link near the top for assistive technology, an instant blank overlay, a
first-time explanation of what it does and cannot do, and a short "Staying safe
online" page.

**Done best by.** NHS care cards (tested: readers "scanning the page stopped to
read the care cards and understood what action to take"; "We want to give
essential information and reassure people, not to scare them"); GOV.UK's Exit
this page component, designed with survivors of domestic abuse and honest that
it "is not a complete solution"; Chayn's trauma-informed principles; Smart
Answers' "Leave this site."

**On LiveWell.** `moreHelp.signs` becomes `moreHelp.cards` (`level`, `heading`,
`items`) in the 40 need files. `CarePage.tsx` renders them in tokens only: no
red; the level lives in the heading, the weight, and a left rule in
`--charcoal` on *Now*. `validate-needs.mjs` requires a *Now* card on every
`high`-sensitivity page, no link inside it but the crisis lines, and concrete
signs ("a child or teenager who talks about wanting to die," not "a struggling
child"). `QuickExit.tsx` gains the Shift sequence (tested, with the five-second
reset), the hidden link, the overlay, the explanation, and clearing any
`sessionStorage` the abuse-related tools hold. `/help/staying-safe-online` is a
short care page reviewed like the rest and registered by the 9.3 checklist. The
button sits in the same place on every page that has it (top, as GOV.UK; or
bottom right for the thumb, as now: James's choice).

*Retires:* the flat "Signs it is time to call someone" list, which today mixes
"call or text 988 now" with "months have passed and you still can't get up."

**Fit, effort.** Core · M. The component and validator are S; re-sorting 40
lists by urgency is pastoral writing and goes to James as one care-page review.

**Evidence.** `nhsuk-service-manual` care-card pattern; `govuk-design-system`
exit-this-page component and pattern; Smart Answers ADR 002; Chayn (search);
`CarePage.tsx`, `QuickExit.tsx`, `crisis-resources.json`. (OS 3.1, 3.3.)

### 3. Notes beside the text

*Merged from:* ED 1.

**What it is.** A note sits in the margin beside its sentence on a wide screen,
opens in place under its paragraph on a phone, and is listed again at the foot
for print. The skeptic checks a claim where it is made.

**Done best by.** Tufte CSS (sidenotes and margin notes; a toggle below 760px);
Gwern.net (sidenotes from 1761px, long notes collapsed, popovers on touch);
Distill's footnote hover boxes.

**On LiveWell.** Essays and history sessions write GFM footnotes, which
`Markdown.tsx` already parses. A rehype step behind a `notes="side"` prop (essay
and session pages only) renders each reference as a numbered button with
`aria-expanded` and each note as an aside after its paragraph. From about 1100px
(to be measured on a preview: the 680px column, a 48px gap and a 240px note
column inside `--w-default`) notes sit in the right margin in Inter 14px
`--ink-muted`; below that, a tap opens the note under the paragraph (no
overlay, a 44px target). The foot keeps a numbered Notes list for print; Listen
already skips the marks. `validate-essays.mjs`: each note under about 60 words,
no verse text in a note, no argument carried in a note.

Two things the cluster could not see, both found in the repo. First, no draft
has a footnote yet, so the convention goes into `BRIEF.md` and the rewrite
pipeline now, while the Doubt section is being written, with each note drawn
from the claims ledger (the ledger stays the full record; the notes are the
part a reader needs at the claim). Second, MASTER-PLAN 6.2 refuses "a right
rail," so 6.2 needs one line saying the note column is not that rail: it holds
only the essay's own notes, nothing else, and is empty when the essay has none.

*Retires:* footnotes as a block at the bottom nobody reaches.

**Fit, effort.** Core · M. Depends on U23 and U24; lands section by section with
the rewrites.

**Evidence.** `tufte-css/tufte.css`; Gwern `js/sidenotes.js` and
`js/popovers.js`; Distill `d-footnote` and `d-hover-box`; Daring Fireball, "Notes
on Notes"; `Markdown.tsx` lines 22 and 39 and `docs/work/essays/*.md` (checked).
(ED 2.1.)

### 4. Before you begin: what it is, how long, where your answers go, and when this is not the place to start

*Merged from:* OS 2; DH 8, DH 15.

**What it is.** One panel above every tool, self-check and practice, always in
the same order: what it does, in a line; how long it takes, with a short form
where one exists; what you will need; where the answers go ("on this device;
nothing is sent"); **when this is not the place to start**, with the right page;
other ways to do it (print it); and a Start button worded as the act ("Begin the
self-check"). Results open with "Your answers," each with its own Change link,
beside Start again.

**Done best by.** GOV.UK start pages ("just enough information to help them
understand what the service does and whether it will meet their need") and its
check-answers page; Smart Answers' "Your answers" and its rule keeping
sensitive answers out of the URL; the stated lengths of Hallow, Abide and Pray
As You Go; Medito's "Free forever. No ads. Not-for-profit." and Day One's
privacy pledge, said where the reader writes.

**On LiveWell.** `components/StartPanel.tsx`, reading new tools-registry fields
(`minutes`, `short`, `needs`, `notFor` with text and href, `paper`) so the panel
and `/tools` share one source; this belongs inside U38 (tools registry
tightening) and U42 (page heads on tools). The Marriage self-check's warning to
a frightened spouse moves from its results (shown today only in the low band,
after fifteen questions) to the panel, before the first question. Answers to
sensitive tools never enter a shareable URL; "I'm not sure" is offered wherever
it is honest. A test: every tool marked sensitive renders `notFor` before Start.

*Retires:* 28 hand-written intro paragraphs, each phrased differently.

**Fit, effort.** Core · S for the component, M to fill 28 tools.

**Evidence.** `govuk-design-system` start-page, question-page and check-answers
patterns; Smart Answers views and ADR 002; Hallow, Abide and Pray As You Go
listings; Medito strings; Day One privacy pledge;
`pages/tools/MarriageAssessment.tsx`. (OS 3.2; DH 3.8, 3.15.)

### 5. A house style drawn from the book

*Merged from:* ED 2; DH 11.

**What it is.** A small, fixed set of typographic moves that make any page
recognizably LiveWell's without decoration: how a piece opens, how a section
turns, how Scripture and prayer are set, how a link looks, how a piece ends.

**Done best by.** Tufte CSS (epigraphs, small-caps "new thought," two heading
levels, links in the text's color); Gwern's drop caps drawn from historic
initials; the Atlantic's 2019 return to the type and mark of its 1857 founding;
Venite's prayer settings (responses in bold, rubrics that can be hidden, verse
numbers off in psalms); Butterick's body-text rules as a check.

**On LiveWell.** Classes under `.ed-` in `index.css`: `.ed-epigraph` (Cormorant
italic about 22px; source in the eyebrow style in `--ink-muted`); `.ed-versal`
(the existing drop cap as a three-line Cormorant initial in mustard: the
rubricator's one red mark, and the body's only mustard); `.ed-newthought` (the
first words after a break in Inter 500 small caps, in place of a heading);
`.ed-break` (a centered asterism in `--ink-muted`); Scripture blocks in
Cormorant about 20px with the reference after it in Inter caps; links in the
text's color with a 1px mustard underline that thickens on hover; two heading
levels (`validate-essays` forbids `####`). Prayer and table texts (`.pr-`, with
pattern 16): the words to say in Cormorant at reading size; instructions in
Inter 0.75rem small caps in `--ink-muted`, with "Hide instructions" kept on the
device; lines said together in Inter 500. One `noindex` house-style page shows
each move once, for devotions, sessions and issues to follow.

*Retires:* per-page heading, blockquote and divider variants.

**Fit, effort.** Core · S. CSS and a few Markdown conventions. This is the
cheapest route to the "elite and world-class" in the brief, because distinction
here comes from a system, not from ornament.

**Evidence.** `tufte-css/index.html` and `tufte.css`; Gwern `css/default.css`
(DROPCAPS); AIGA Eye on Design and It's Nice That on the Atlantic's redesign;
Venite `ldf/src/display-settings.ts`; practicaltypography.com. (ED 2.2; DH
3.11.)

### 6. It comes back: a few questions return, and one is carried into the week

*Merged from:* LX 1, LX 6, LX 9, and LX 11 as a later phase.

**What it is.** A reader who has finished a check may put a few of the page's
own author-written questions on a private shelf on the device. They return on a
fixed ladder (about 5 days, 2 weeks, 5 weeks, 3 months, then "kept"), at most
six in a sitting, answered "I had it," "Not yet" (asked again at the end of the
sitting; the ladder restarts) or "Skip for now." Every sitting ends honestly,
with the date of the next return. Some units end instead with a question meant
to be carried rather than recalled (a salience prompt): it names a situation the
reader will meet, returns once after about three days and once after about
three weeks, is answered with a private line, and retires. At the end of a
history Part, a 2027 act or a care plan, a look back: eight mixed questions
drawn from every session, each linking home. Later, the same shelf holds lines
the reader kept ("Keep this line"), offered back five at a time each week.

**Done best by.** Quantum Country and Orbit (questions written into the text;
the first return at five days, each interval growing 2.3 times; "Review
complete"); Execute Program's fixed ladder (2 days, 1 week, 3 weeks, 2 months);
Khan Academy's six-question Mastery Challenges and its Course Challenge; Anki's
"You have finished this deck for now"; Readwise's Daily Review; Matuschak on
salience prompts and timeful texts. Research: Cepeda and colleagues (2008),
where the best gap grows with the horizon (weeks apart, for a year).

**On LiveWell.** `lib/review.ts` over `lib/storage.ts` (`livewell-review-v1`:
ids and dates only), one `ReviewSitting` component, a "Ready to look at again"
section on `/my-library`, a quiet line under the head of the source page when
something is due, and an optional calendar entry through `lib/calendar.ts`.
Offered at the end of a session's Check yourself (U32), a context-guide reveal
(U45), a catechism answer (U40), a creed phrase (U44) and Scripture Memory
(pattern 7). The look-back sits just before the closing rite (A 15). One
telemetry event, `review_sitting_complete` (source id only), added to
MASTER-PLAN 9.9. Never on Home, never a count of what is due, never a streak,
never a push.

*Retires:* the check that happens once and is forgotten.

**Fit, effort.** Core · M. Depends on U32, U40 and U44 for questions worth
returning; kept lines wait for paragraph anchors (U23).

**Evidence.** Orbit `core/src/schedulers/spacedRepetitionScheduler.ts`,
`core/src/event.ts`, `app/src/reviewSession/ReviewSession.tsx`,
`EmbeddedBanner.tsx`; Matuschak's notes on Execute Program; Khan help center;
Anki `ftl` strings; Readwise docs; notes.andymatuschak.org "Salience prompts";
Cepeda et al., *Psychological Science* 2008 (through summaries; a planning
note). (LX 4.1, 4.6, 4.9, 4.11.)

### 7. Kept, not memorized: repair Scripture Memory

*Merged from:* LX 5. Sharpens A 22 ("Learn it by heart, with no scoreboard").

**What it is.** The tool stops claiming a verse is memorized for good and stops
showing a count, a percentage and bars. It says how long each verse has been
held, in words, and uses its four modes as a scaffold that fades.

**Done best by.** Orbit and Anki, where nothing is ever "memorized," only due
later; Orbit's starburst, which sizes each prompt by how long it has been held
(LX keeps the idea and drops the picture: words carry it with less pull).

**On LiveWell.** In `client/src/pages/tools/ScriptureMemory.tsx`: remove the
one-way toggle under `livewell-scripture-memorized` (line 201), the "{n} of
{total} memorized" counter (line 398), the percentage (line 402) and the
category bars (to about line 528). Add "Say it again in five days," which puts
the verse on pattern 6's ladder; order the modes first letter, then fill the
blank, then full recall; show each verse as *New*, *Comes back Tuesday*, *Held
about a month* or *Kept*. Migrate the old key once: "You marked 7 verses as
memorized. Want them to come back so you can see whether they stayed?" Drop
"Track your progress" from the description. U40 and U44 take the repaired drill,
so there is one drill and one ladder.

*Retires:* a percentage MASTER-PLAN section 2 already forbids.

**Fit, effort.** Core · S. Read the tool's Vercel analytics first: the repair is
owed either way (it is a rule), but its place in the queue depends on use.

**Evidence.** `ScriptureMemory.tsx` lines 16, 201, 398, 402 (checked); Orbit
`ui/src/components/ReviewStarburst.tsx`; Anki `deck-config.ftl`. (LX 4.5.)

### 8. Commit, then compare: the guess before a reveal, the argument said back after an essay

*Merged from:* LX 2, LX 7. Sharpens A 14 ("Your answer before ours").

**What it is.** Before a reveal, the reader commits a guess in one tap or one
line, and the guess stays beside the answer ("You said ... The first readers
heard ..."). Never before an essay, never a gate ("Show me" is always visible),
and the reply is information, not praise. After an essay, the first item of
"To think about, or talk about" asks him to "say the argument in three
sentences, in a form James would sign," then reveals James's own three.

**Done best by.** The Evolution of Trust ("place your bets," predictions
answered plainly); the Times' You Draw It (your line, then reality); Brilliant's
question before the procedure; Coursera's ungraded in-video questions;
Matuschak on why books do not work and Nielsen on writing the card as the way to
understand. Research: Richland, Kornell and Kao (2009), the pretesting effect,
controlled for the mere drawing of attention.

**On LiveWell.** Guesses on U45 context guides ("What do you think this
promised, and to whom?"), on the doctrine map ("First-, second- or third-order?
Your guess, then where the creeds land"; A 8), on Study Bible hard-question
notes, and in U32's myth checks, whose first answers come back beside the
story's answers at the session's end. An `argumentInBrief` field (three
sentences James writes or approves) on each shelf essay; the reader's version
kept on the device per slug; printable with the group guide.

*Retires:* nothing; it gives the existing reveals and the foot's first item a
shape.

**Fit, effort.** Core · S. James gate for each `argumentInBrief`.

**Evidence.** ncase trust `words.html` (`place_your_bets` and the
correct/incorrect ids); FlowingData on You Draw It; brilliant.org; Stanford and
Vanderbilt on in-video quizzes; Richland, Kornell and Kao, *JEP: Applied* 15(3),
2009 (abstract; a planning note); Matuschak, "Why books don't work" (excerpts).
(LX 4.2, 4.7.)

### 9. Words, people and LiveWell links open where you meet them

*Merged from:* LX 4; ED 14.

**What it is.** A technical term or a named person in prose is a quiet link that
opens a sheet in place: a glossary term shows its one-line definition; a person,
council or controversy opens its registry sheet. On a wide screen registry
sheets stack side by side so the trail stays visible (Nicaea, then Athanasius,
then Arius); on a phone they stack with "Back to Nicaea." On desktop only,
resting the pointer on a link to another LiveWell essay or session for about
three quarters of a second shows its title, kind, minutes and first line; on a
phone the link simply goes.

**Done best by.** Mathigon's gloss and biography links (401 and 81 in its
content source); Bret Victor's "contextual information"; Matuschak's notes site,
whose links open in stacked columns; Gwern's popups (a 750ms delay, none while
scrolling); Distill's hover boxes.

**On LiveWell.** A `gloss:` link form in the in-house remark plugin in
`Markdown.tsx` (the route U16 used for `VerseRef`), resolving against
`theology-glossary.json`; people, councils and controversies open their U30
sheets from essays, context guides and Study Bible notes, not only from
sessions; the stack in the URL (`?e=nicaea-325&p=athanasius`); a validator that
every gloss id resolves. Before the first gloss link ships, the 114 `short`
lines get a voice and accuracy pass, because they will now be read inside
James's prose. `LinkPreview` attaches only to internal hrefs passing
`isPublicEssayHref`, draws on the essays manifest already loaded for search
(U15) with no network call, closes on Escape, is off in Focus mode, and never
serves verses (`VerseRef` has its sheet) or external links. Nothing essential
lives only in a preview.

*Retires:* leaving the argument for a glossary page.

**Fit, effort.** Core for gloss links and sheets · M. Previews are maybe and wait
until the sheets exist.

**Evidence.** `mathigon_textbooks` content (gloss and bio counts),
`shared/bios.yaml`, `glossary.yaml`; worrydream.com/ExplorableExplanations;
Obsidian Sliding Panes README; Gwern `js/popups.js`; Distill `d-hover-box.js`;
`theology-glossary.json` (checked). (LX 4.4; ED 2.14.)

### 10. Step by step, for the few tasks that have an order

*Merged from:* OS 5.

**What it is.** A few pages, each a real task with a start and an end, set out
as numbered steps that open to links into pages LiveWell already has, with "and"
and "or" joins, "Show all steps," text inside a step only for what the reader
must know before tapping, and on every member page a line: "Part of: When
someone you love dies, step by step."

**Done best by.** GOV.UK step by step (*What to do when someone dies*, *Learn to
drive a car*), built because one task was scattered across many departments,
refined through eight rounds of research, with written rules against reading
lists, extra steps, and loops between two guides.

**On LiveWell.** `client/public/steps/<slug>.json` (intro; steps with `title`,
`kind: step|and|or`, `links`, optional `note`), a `StepByStep` component and a
`PartOf` line, `validate-steps.mjs` (every link resolves through
`isPublicEssayHref`; at most eight steps; no loops between step-by-steps), and
`/steps/:slug` through the 9.3 checklist. Begin with two: *When someone you love
dies: the first weeks* (its legal and financial items say they are not advice
and point to the professional) and *Starting to read the Bible* (where to begin,
the book's context guide, the first week in the Study Bible, the 2027 plan, a
group). Candidates after Search Console says which: finding a church after a
move, leading a group for the first time, beginning family devotions. Never more
than six.

*Retires:* the reading pathway each one replaces (the `TopicPathway` pages), so
a task has one ordered home.

**Fit, effort.** Core · M.

**Evidence.** `govuk_publishing_components` step-by-step docs and strings;
`govuk-design-system` step-by-step pattern; GOV.UK's own examples (search). (OS
3.5.)

### 11. Reuse and rights, stated plainly

*Merged from:* ED 6; OS 15 (the rights line and the filter).

**What it is.** One sentence under every piece, devotion, handout and download
saying what a reader may do with it, linking to a page that names the license
and where it stops.

**Done best by.** Our World in Data ("Reuse this work freely," with third-party
material under its own terms); Distill's Reuse section; the Public Domain
Review (essays under CC BY, works in the public domain); the Library of
Congress's "Free to Use and Reuse" sets. The counter-example is Aeon's
syndication (an agreement, a fee, images excluded, an embargo).

**On LiveWell.** A reuse line in the record block (pattern 1) and on every
devotion, session handout, printed number and download, for example: "You may
print this for your church or group, read it aloud, and quote it with credit to
James Bell and LiveWell. Please do not change it or sell it." It links to
`/use`, which names the license James chooses (a Creative Commons license such
as BY-NC-ND 4.0 is one candidate) and its limits: Scripture under its
publishers' terms (Crossway's notice is already required), images under their
own credits, book chapters possibly under the publisher's terms. `/downloads`
gains a "Free to reproduce" filter. No form, no fee.

*Retires:* the doubt that stops a pastor's bulletin insert.

**Fit, effort.** Strong · S, gated on James's choice of license (and on his
publisher for book chapters).

**Evidence.** OWID `site/gdocs/components/LicenseSection.tsx`;
`distill-appendix.js`; aeon.co/republish and aeon.co/syndication;
creativecommons.org on the PDR; Library of Congress free-to-use sets (search).
(ED 2.6; OS 3.15.)

### 12. An ending that is allowed to end

*Merged from:* ED 4, with DH's refusal of autoplay into a "next up."

**What it is.** After the last paragraph: a visible end (an ornament, the name,
the date), real white space, then a short, quiet apparatus, pruned by measured
use.

**Done best by.** The Atlantic's relaunch, which removed infinite scroll, a nav
bar, and "five different modules that people didn't click on"; Gwern's end
ornament; The Pudding's footer, which stops at three stories; the office apps,
which end on a blessing and a still screen. Waking Up's default autoplay is the
warning.

**On LiveWell.** An `.ed-end` fleuron in `--ink-muted` with "James Bell" and the
date, about 96px of space, then MASTER-PLAN 6.2's foot grouped under two plain
heads: *To think about* (questions, sources and the record) and *Where next*
(next in this section, related, take it with you, write to James, the book, the
letter, the bio). Count each item's use for 90 days through `lib/telemetry.ts`
(aggregate events only), then remove what almost nobody uses, as a revision to
6.2's list made in the plan first. Nothing above the end. The same rule closes
the office, the Table and every session.

*Retires:* nothing new; it gives 6.2's foot an order and a test.

**Fit, effort.** Strong · S. Depends on U24.

**Evidence.** Digiday and InPublishing on the Atlantic's relaunch; Gwern CSS
"BOTTOM DECORATION"; `pudding-starter` `Footer.svelte`; Venite source; Waking Up
release notes. (ED 2.4; DH 4.10.)

### 13. One primary source, labeled and read alone

*Merged from:* ED 9; LX 8; OS 15 (the tombstone). B-church-history-teaching 1
and B-post-christian-thought 1 own the source card's reading method; this
pattern adds the weekly form, the transfer block and the label.

**What it is.** Three uses of the verified sources corpus. *The Source:* one
excerpt, a title that states what it shows, 150 to 250 words of context, two
doors, one a week, dated. *A source you read alone:* after a session's Check
yourself, one short excerpt the session did not discuss, with two questions
only ("What is this writer afraid of?" and "Where do we do this?") and a short
note on request. *The tombstone:* every quoted primary source opens with a
fixed label (author, date, place, original language, the translation used and
its status).

**Done best by.** The Public Domain Review's weekly presentation of one work
with context; Our World in Data's Data Insights (a title that states the point,
one chart, short text, a door to explore); The Evolution of Trust's sandbox
after the guided chapters; the Met's tombstone data and CC0 mark.

**On LiveWell.** Built on U32's `SourceCard`, with excerpts verbatim from
`scripts/data/history-sources` and gated by `verify-sources.mjs` (U07). A page
per source under the never-redirected history paths (for example
`/theology/history/sources/:slug`), archived in order; "This week's source" on
the history front door and as a fixed feature of the letter; no "of the day," no
counts. The transfer block lives in `client/public/history/sessions/<slug>.json`;
the family edition reads one sentence aloud with one question. Tombstone fields
go in the U07 manifest.

*Retires:* ad hoc source lines.

**Fit, effort.** Strong · S to M. The verification is the work, and U07 has
built the gate.

**Evidence.** Wikipedia on the PDR's weekly format; ourworldindata.org on Data
Insights; ncase trust `js/slides/7_Slides_Sandbox.js`; the Met's open access
(search); `scripts/verify-sources.mjs`. (ED 2.9; LX 4.8; OS 3.15.)

### 14. Every question carries its why, and questions are held to the prose's standard

*Merged from:* LX 3, LX 10.

**What it is.** Every question on the site has a two- or three-sentence "why"
naming the verse or source it rests on, shown after the answer whether the
reader had it or not, and at most one nudge before "Show the answer." A
one-page question style guide and a validator hold every question to the
integrity the prose is held to.

**Done best by.** Brilliant's "Why?" on every interaction, even when the
reader was right; Khan's Perseus hints ("Get another hint," "Show solution");
Matuschak's "How to write good prompts"; Quantum Country's finding that a
handful of questions caused a large share of failures (fix the question, not
the reader). Against: Khanmigo's withholding, which frustrates the learners who
most need help.

**On LiveWell.** One question shape, `{ id, q, a, why, ref, nudge? }`, shared by
session `retrieval[]` and `mythCheck[]`, context-guide reveals, catechism recite
and review sittings. `scripts/validate-questions.mjs` in the content-gates step:
one idea per question, a one-sentence answer, `why` and `ref` present,
references parsed by the U09 parser, no true/false where `secondOrder` is set.
With James's yes, an anonymous `review_outcome` event (question id and outcome
only) finds the few questions that mislead most readers.

*Retires:* question shapes that differ by surface.

**Fit, effort.** Strong · S. Best fixed before U32 and U40 settle their data
shapes.

**Evidence.** A Play Store review of Brilliant quoted by grand-screen.com;
Perseus `packages/perseus/src/strings.ts`; andymatuschak.org/prompts (mirrors);
Matuschak's 2022 letter on Quantum Country; NYU's blog and Pedley-Smith on
Khanmigo. (LX 4.3, 4.10.)

### 15. Where am I: contents that stays, sequences seen whole, one appearance control

*Merged from:* OS 8, OS 9; LX 12.

**What it is.** On long reading pages, a contents list that marks the section in
view (beside the text on desktop; on a phone, a slim bar after the first screen
that opens as a sheet). Where one subject runs across two to eight pages, the
page's own name is the heading with the subject as a caption beneath it, a
contents list at the top marks the current page, and the foot says "Previous:
[title]" and "Next: [title]." Anything shown in steps shows the whole list from
the start, keeps Next always active and "Show me" beside every question, and
remembers the place on the device. One site-wide Appearance control (text size
now; color when dark mode returns).

**Done best by.** Wikipedia's Vector 2022 (pinned contents beginning with
"Beginning," the Appearance menu, the narrowed column, neutral on pageviews);
MDN's "In this module" with titled Previous and Next; the NHS mini-hub (readers
did not notice they had moved pages when the subject was the heading). Against:
Mathigon's "You have to complete the activities to reveal what's next" and
Execute Program's locked lessons.

**On LiveWell.** `ContentsRail` over `IntersectionObserver` on care pages,
history sessions, topic pages and Study Bible chapter notes, and **not on
essays**: MASTER-PLAN 6.2 refuses a sticky section line on essays, and on
desktop the essay's margin belongs to its notes (pattern 3), so essays keep
their contents card. `MiniHub` (the heading rule, contents, titled pager) for
history Parts ("Session 3 of 6"), care plans and multi-page topics. A `Steps`
primitive in the study set (MASTER-PLAN 8.2) for Trace the argument (A 25),
table mode, myth checks and explorables. The essay's Text size and Focus
controls fold into the site Appearance control (one storage key).

*Retires:* the essay page's private text-size control, each non-essay page's own
contents card, and bare Next and Previous links.

**Fit, effort.** Strong · M.

**Evidence.** `wikimedia/mediawiki-skins-Vector` strings and config;
`mdn/fred` curriculum components; `nhsuk-service-manual` mini-hub pattern;
Mathigon `hints.yaml` and `circles/content.md`; Matuschak on Execute Program.
(OS 3.8, 3.9; LX 4.12.)

### 16. Morning and Close of Day: a fixed frame, the right hour, a dated page

*Merged from:* DH 1 to 12 and DH 14, with DH 13 (the bedtime form) as an
option. B-family-discipleship 3 ("four doors in a day") carries the weekly
devotion to morning and bedtime; this is the daily office those doors would
open, for adults and households.

**What it is.** A short service whose order never changes and whose center
changes every day from a calendar: *Morning* (about ten minutes) and *Close of
Day* (about seven), each with a short form of about three, one step per screen.
The page opens on the office that fits the clock; each day's office has its own
address, with yesterday and tomorrow as links; the reader's prayer list appears
at the intercession; Scripture can be heard at prayer pace (a slower voice, a
breath between psalm verses, the reading twice, a bell around a silence); in
Advent and Lent one dated, verified voice from the church sits under the psalm.
A gap is never a debt: on return the page says only what day it is.

**Done best by.** Lectio 365 (P.R.A.Y. in the morning, an Examen at night, a
30-day archive); Sacred Space (six stages; a dated page each day since 1999);
Reimagining the Examen (five fixed steps; the review chosen by the kind of day);
Venite (the office chosen by the clock; read-aloud at rate 0.85 with a 1000ms
psalm pause; the prayer list inside the office; rubrics that can be hidden); the
Church of England's Time to Pray; Pray As You Go's slow reading; Waking Up's
bells. Research: Lally and colleagues (2010) on the harmless missed day, and
Stecher and colleagues (2021) on anchors (both read through summaries).

**On LiveWell.** `/pray` (working name; the door is James's) resolves to
`/pray/<date>/morning` or `/pray/<date>/evening` by the device clock after mount
(Morning from 4 a.m. to 2 p.m.; the turn-over hour adjustable once).
Built on `Stepper`, `useWakeLock` and `ListenButton`, with a prayer-pace mode
used only here and in Table mode. *Morning:* a fixed opening verse; the psalm
for the day on the thirty-day psalter (BSB, from
`client/public/bible/text/psalms/`); the day's reading from U28, so the office
and the 2027 plan are one reading; one question from the chapter's notes; the
Lord's Prayer; today's names from `livewell-prayer-planner`, with "Add a name"
inline; a fixed close. *Close of Day:* a Compline psalm; the Examen, opened by
"Tonight I am coming to this ..." with six plain choices (nothing stored; grief
and conflict keep Find Help one tap away); Psalm 31:5; the Song of Simeon; a
blessing; an optional private line that returns on its date a month or a year
later. "The church remembers" lines from the U30 registry in season only,
verified like every source; outside the seasons the slot is empty. "Nothing you
write here leaves this device," said at the field; no third-party scripts on
`/pray`; one `office_complete` event with the office name only (MASTER-PLAN
9.9). Reminders through `lib/calendar.ts` with an anchor line ("After breakfast:
Morning Prayer"); never web push. The family bedtime form (`?for=family`) is an
option for James. Advent (from November 29) is the natural first season, with a
start and an end.

*Retires:* the standalone daily-habit pieces become the office's parts: the
*Today in Proverbs* widget, the Prayer Planner's "today's names," the Worry
Journal's bedtime step, the Examen how-to's practice. The tool routes stay,
because tools never redirect; only their separate doors in Resources go.

**Fit, effort.** Strong · M. James gates: whether a daily office belongs on
LiveWell at all and behind which door; the fixed frame's wording (approved
once); about thirty Examen questions; whether he records the fixed parts in his
own voice.

**Evidence.** Venite source (`liturgy-select.component.ts`,
`ldf/src/display-settings.ts`, `prayer-list/`, i18n strings); Medito strings (as
the warning); Lectio 365's site and reviews; Sacred Space dated pages;
ignatianspirituality.com on the Examen app; Time to Pray listing; Pray As You
Go listing and the RAPT commentary; Lally (UCL) and Stecher (abstract), planning
notes; `pages/tools/PrayerPlanner.tsx`, `pages/tools/WorryJournal.tsx`. (DH 3.1
to 3.12, 3.14.)

### 17. Finite and numbered: the shelf as contents, the season as an issue, the issue in print

*Merged from:* ED 5, ED 11, ED 13. Overlaps B-post-christian-thought 2 ("the
season's question"); the two clusters differ on cadence (four issues a year
against three seasons), which James settles.

**What it is.** `/writing` reads like a book's contents, with an alternate view
that lists every essay by its first sentence alone. A few times a year a
numbered, dated issue gathers three to seven pieces on one theme under a letter
from James, and ends. Each issue is also a print-ready booklet for the lobby,
the resource wall and the small group.

**Done best by.** Increment (19 issues, one theme each, a final issue); Works in
Progress (six print issues a year, online forever); Craig Mod's Subcompact
Publishing (three to seven articles, clear wayfinding, a fluid schedule); The
Pudding (every story numbered with its month); Plough (in `benchmark.md`); the
index of first lines in hymnals and collections of poems.

**On LiveWell.** Shelf sections become "Part I · The Mirror"; each
`EditorialIndex` row is a Cormorant title, the essay's first sentence in Inter
`--ink-muted` (derived by `build-essays-index.mjs`), and "18 min · Revised
October 2026"; no images; a "Titles | First lines" toggle kept in the URL
(`?view=first-lines`). `/issues/:n` and `/issues`: "No. 1 · Advent 2026," the
theme as title, James's letter (his words, under the byline rule), contents in
reading order with kind and minutes (a shelf essay, a history session or a
Source, the Table strand for those weeks, a group guide, the printed number);
data in `client/public/issues/<n>.json`, validated for 3 to 7 items and public
hrefs. `scripts/build-pdfs.mjs` renders a 16- to 32-page booklet per issue
(cover with a public-domain image, the letter, the pieces, the Table strand as
one pull-out page, QR codes as U21 already prints them, the reuse line on the
back) in US Letter and as a half-letter imposition for church copiers, and it
goes to PCN. Essays in an issue carry "In No. 1" in the kicker.

*Retires:* the "Latest" strip on Home and `/writing` while an issue is current,
and shelf blurbs wherever the first sentence can stand alone.

**Fit, effort.** Strong · M (the shelf view S, the issue page M, the booklet M).
The first issue waits until enough rewrites are live to fill it.

**Evidence.** increment.com/about and its store bundle; Works in Progress's
print announcement and its printer's case study; Scholarly Kitchen and Kottke on
Subcompact Publishing; `pudding-starter` `Footer.Story.svelte`;
`scripts/build-pdfs.mjs`. (ED 2.5, 2.11, 2.13.)

### 18. Search that teaches the map

*Merged from:* OS 6.

**What it is.** Four additions to the search U15 built: under each result, one
line of description and its place in the site ("Study › Church history"); "/" or
Ctrl/Cmd-K opens search on desktop, and selected text becomes the query; an
empty field shows "Recently visited on this device" with Clear; and a
hand-edited file of synonyms and pinned results.

**Done best by.** MDN's quick search (titles, not text, with the full search
behind it); Wikipedia's typeahead with a description line, after which search
sessions rose 28.9% (a planning note); GOV.UK's synonyms and best bets.

**On LiveWell.** `lib/siteSearch.ts` reads `search-bestbets.json` before ranking
("Lord's Supper," "communion," "Eucharist"; "nones," "unaffiliated";
"deconstruction," "deconstructing"; "is the Bible reliable" pins the Honest
Answer; "Christian nationalism" pins the topic page), with a validator that
every pin is live; `SearchEntry` gains `trail`; `lib/recent.ts` on the storage
helper, never synced. Crisis-word detection keeps priority over every pin. The
queries to pin come from Search Console, never from logged query text.

*Retires:* the static `SEARCH_SHORTCUTS` row.

**Fit, effort.** Strong · S to M. Depends on U15.

**Evidence.** `mdn/fred` quick-search component; Vector search config and the
Wikimedia result (search); GOV.UK best bets (search); `lib/siteSearch.ts`. (OS
3.6.)

### 19. Hubs ordered by the reader's question, with an A to Z

*Merged from:* OS 7.

**What it is.** Each hub opens with no more than three top tasks, then primary
cards for the groups most readers need, then secondary cards, each group named
for what the reader is trying to do rather than for a file format. Beside it, an
A to Z of every subject.

**Done best by.** GOV.UK's taxonomy work (no evidence that readers need to browse
by audience or format, reported through a search excerpt); NHS hub pages (top
tasks, primary and secondary cards) and the NHS A to Z.

**On LiveWell.** A `HubPage` layout with three card weights over the existing
`HubGroup`. For `/study`: "Look up a passage," "Start reading the Bible, step by
step," "Church history, from the beginning." `/resources` regrouped by task
("Get through a hard season," "Teach your children," "Study with a group"), with
formats surviving only as filters. `/a-to-z` generated from `search-index.json`
(care needs, topics, doctrines, people in church history, books of the Bible).
The doors themselves remain question 6 for James; the pictures he is shown for
it should use this pattern.

*Retires:* the Resources list grouped by file type.

**Fit, effort.** Strong · M.

**Evidence.** Inside GOV.UK on taxonomy (search excerpt; URL not seen);
`nhsuk-service-manual` hub and card patterns; `components/HubGroup.tsx`. (OS
3.7.)

### 20. Say how widely a view is held

*Merged from:* OS 10. Sharpens A 8 (the doctrine map) and B-skeptic-facing 6
(positions before the verdict).

**What it is.** On doctrine debate pages, topic pages and Honest Answers, the
opening summary names where Christians disagree in its first paragraph, and each
position in a steelman carries one plain line of weight: who holds it, and since
when.

**Done best by.** Wikipedia's lead-section and due-weight rules (which warn
against "a false sense of parity"); MDN's Baseline sentences (how established,
since when, where it does not work); Cochrane's plain-language summaries, which
state certainty in a fixed vocabulary (section 4).

**On LiveWell.** A `held` field per position, in the form "Held by ... since
..."; validators require it on contested pages. Each line is a claim, so it
takes a ledger line with a source, and stays out if it cannot be verified.
`CLAUDE.md`'s first-, second- and third-order sorting stays; this line keeps an
equal-length steelman from implying equal support, which the skeptic and the
Christian from the other side both notice at once.

*Retires:* nothing; it sharpens the existing steelmans.

**Fit, effort.** Strong · S in code, M in content.

**Evidence.** Wikipedia NPOV and lead-section policy (through mirrors); MDN
Baseline; Cochrane plain-language guidance (section 4's searches). (OS 3.10.)

### 21. One kind per page, typed blocks, and a pattern library that says when not to use

*Merged from:* OS 11, OS 12; ED 10 (the kind label).

**What it is.** Every page says what kind of thing it is and stays that kind;
the recurring pieces inside prose (a care card, a step, a church witness, a
Scripture quotation, a "not the place to start" note) are typed blocks the build
validates; and every component has a page saying when to use it, **when not to
use it**, how it works, what has been seen, and its known gaps, with a dated
change list.

**Done best by.** Diátaxis (four kinds kept apart); Stripe's Markdoc (typed tags,
validated); the GOV.UK Design System and NHS service manual (the same headings on
every pattern page, including "When not to use" and "Known issues and gaps");
Apple's single HIG with change logs.

**On LiveWell.** Two axes, kept separate. The site-wide kind (lesson, how-to,
reference, explanation) on every content index; and the essay's own genre in its
kicker (Essay, History, Lament, Letter, Chapter: "Essay · The Mirror, 2 of 6 ·
18 minutes"). Remark directives (`:::care{level=now}`, `:::witness`, `:::step`)
rendered by `Markdown.tsx` and checked by each library's validator.
`docs/patterns/` in Markdown, rendered at a `noindex` route, beginning with
`VerseRef`, `CrisisBlock`, `QuickExit`, the care card, `StartPanel`,
`StepByStep`, `MiniHub`, `EditorialIndex`, `TakeItWithYou`, the page head and the
`.st-` primitives; a test that every publicly exported component has a page. It
is the artifact James can read and say no to, and the one that keeps many agents
building the same thing the same way.

*Retires:* hand-built variants of the same box, and rules scattered through code
comments (the comments stay, pointing to the page).

**Fit, effort.** Strong · M.

**Evidence.** diataxis.fr (search); Markdoc documentation (search);
`govuk-design-system` and `nhsuk-service-manual` source; Apple HIG coverage
(2022); Gwern's `page-status` as the kind label's ancestor. (OS 3.11, 3.12; ED
2.10.)

### 22. Pictures that are witnesses: real art, credited; figures drawn for the phone

*Merged from:* ED 8, ED 7.

**What it is.** Where a page needs an image, it uses a work the church has made
over two thousand years, captioned with artist, title, date, holder and license
and linked to its source. Where it needs a figure, the figure is drawn for 390px
and again for about 880px, labeled in live text, its point stated in the
caption's first sentence, everything visible without hover or tap, with an "As a
list" equivalent.

**Done best by.** The Public Domain Review and its Image Archive (every image
linked to its holding institution); the Times' ai2html (an artboard per width,
live HTML text) and Archie Tse's 2016 rules (scroll; cut steppers, tabs and
sliders; assume a tooltip unseen; redesign for each screen); Our World in Data's
Data Insights (the title states the point).

**On LiveWell.** Figure data `{src, alt, artist, title, date, holder, license,
sourceUrl}`, validated for holder, license and source; images self-hosted under
`client/public` (the first-paint contract); captions in Inter 13px
`--ink-muted`; each image's terms checked at its institution and recorded in the
ledger. Figures as `<figure class="ed-fig" id="fig-...">` with two inline SVGs
switched by media query, Inter labels at 14px or more from tokens, a `<details>`
list, addressable so a pastor can link one, no motion; the first are MASTER-PLAN
8.5's Paul's cities and the councils. Essays stay text: no figure whose meaning
depends on layout.

*Retires:* `GeneratedCover` and `GeneratedHero` on the seven surfaces that still
draw them, as real art lands (essays already draw none).

**Fit, effort.** Strong · M. Sourcing and rights are the work.

**Evidence.** publicdomainreview.org on the Image Archive; ai2html `README.md`,
`examples/nyt.md`, `ai2html.js`; Nieman Lab and Garcia Media on Tse's Malofiej
talk (secondhand); OWID on Data Insights; `ArticleDetail.tsx` and the
`Generated*` imports (checked). (ED 2.7, 2.8.)

### 23. Letters answered in public

*Merged from:* ED 12. The same pattern is B-skeptic-facing 8 and
B-post-christian-thought 5; this wave adds the evidence that a letter can carry
a whole habit.

**What it is.** A dated letter from James at the cadence he can keep, and a
public page of selected reader letters with his answers.

**Done best by.** Craig Mod (a weekly and a monthly letter carrying a membership
of more than a thousand; his "future book" arriving as newsletters and audio);
Edward Tufte's moderated Ask E.T.; The Upshot's conversational, not simplified,
register; Reasonable Faith's numbered Question of the Week (B).

**On LiveWell.** Substack stays the letter's channel; the week's Source (pattern
13) and the current issue (17) are its fixed features. `/letters`: each entry a
reader's question (with permission, consent and date recorded in the ledger, no
name unless asked), James's answer in his words, the essay it concerns, the
date; numbered, in date order, filterable by essay in the URL; no comment
threads, no counts. "Write to James about this essay" says that some letters are
answered there, with permission. No letter is ever composed, merged or
paraphrased, and no agent drafts James's reply.

*Retires:* nothing; it gives Write to James a public end.

**Fit, effort.** Strong · M. James's time is the cost; he sets the cadence.

**Evidence.** craigmod.com Ridgeline and membership pages; the Scratching the
Surface interview; edwardtufte.com/bboard; the NPR transcript with Leonhardt.
(ED 2.12.)

### 24. Make this study your group's

*Merged from:* OS 14. Builds on A 16 ("Lead it in the room").

**What it is.** On each group study guide, a mode for the leader: choose the
sessions, put them in her order, add her own questions and a note to the group,
then print or share a link. The copy is headed "Adapted from [guide] on LiveWell
by your group's leader"; the original never changes.

**Done best by.** The Smithsonian Learning Lab (copy a collection, add notes,
questions and hotspots, share it for others to adapt); Are.na (one item in many
channels).

**On LiveWell.** A `GroupGuide` edit mode over the existing 68 guides; state in
the URL as a compact list of choices and the leader's short text, or on the
device when the text is long ("kept on this device"); print through
`TakeItWithYou`.

*Retires:* nothing; it extends the guides.

**Fit, effort.** Strong for pastors, maybe overall · L. After A 16's room mode.

**Evidence.** The Smithsonian Learning Lab guide (2019; current features
unseen); Are.na (search). (OS 3.14.)

### 25. A few explorables, only where the idea is a mechanism

*Merged from:* LX 13, with ED's "one visual essay a year" deferred.

**What it is.** At most three interactive pages, each a process the reader
operates, on The Evolution of Trust's shape: a real event first, play, a bet
before each reveal, a sandbox last, sourced notes. Each has a plain-text
equivalent, uses inline SVG from tokens and no library, is safe under reduced
motion, and is never placed inside an essay's argument.

**Done best by.** Nicky Case's The Evolution of Trust; Bret Victor's reactive
documents; Bartosz Ciechanowski's Mechanical Watch; Red Blob Games; Distill's
"Research Debt" on why explanation is real work.

**On LiveWell.** Candidates, each verified in the U07 sources survey first: how
a text survives copying (the mechanism behind "Is the Bible reliable?"); "alive
in the same year" as a draggable year on the history timeline (the reactive form
of MASTER-PLAN 7.2's timeline filter); early New Testament book lists side by
side by date. Build one after James judges the history slice, and the next only
if the first is used.

*Retires:* any hover-dependent diagram it replaces.

**Fit, effort.** Strong · L.

**Evidence.** ncase trust chapter files, `words.html` and notes;
worrydream.com/ExplorableExplanations; Hacker News on Mechanical Watch;
redblobgames.com; distill.pub/2017/research-debt; the CHI 2026 study in
`benchmark.md` (engagement and recall rose; comprehension did not). (LX 4.13.)

### Also considered, not ranked

- **An instrument of self-placement** (ED 15): eight second-order questions
  under an essay on the church's divisions, each answer mapped to the traditions
  that have held it, ending "On the Nicene Creed, with all of them." Maybe · M.
  The Times' dialect quiz shows the pull; the risk is a sorting quiz dressed as
  history. Only after A 8's doctrine map, with every mapping verified and
  James's yes; it might retire Which Lens.
- **The family bedtime form** (DH 13): folded into pattern 16 as an option;
  B-family 3 may meet the need through the weekly devotion.
- **Backlinks on essays** (ED; Gwern): extend A 1's inbound citation index when
  it exists rather than building a second index.
- **A seasonal masthead line** ("Advent, week 1"): only if A 13's shared week
  ships.
- **A disclosure for technical detail** (OWID's Expander): context guides only;
  never for an argument or a steelman.
- **Links masked in Focus mode** (Gwern's reader mode): cheap; test it first.
- **"Was this page helpful?"** (GOV.UK, MDN): a form and moderation for little
  gain at LiveWell's size.
- **Fixed citable editions** (the Stanford Encyclopedia): for the history course,
  once pastors quote it.
- **The GOV.UK task list:** its quiet black "Completed" is worth remembering;
  position-not-performance already covers it.
- **Orbit's starburst:** honest, but a drawn measure of memory invites
  comparison; words carry the same information (pattern 7).

---

## 3. The tensions: "draw people's attention" against "Unhurried. Weighted. Grown-up."

A named seven tensions for study products. This wave meets eight, several of them
new, because it looked at the fields that invented the attention mechanics.
The resolution is the same in each, and the best products outside the niche
state it more plainly than anyone inside it: **attention is earned by what the
page shows the reader about the claim, about himself, or about the day, at the
moment he reaches for it; never by motion, counters, rewards, or novelty for its
own sake.**

**1. The hook against the rhythm.** *The pull:* the streak is the most effective
attendance mechanic anyone has measured; Duolingo ran more than 600 experiments
on it; Hallow, Calm, Headspace and Medito all count. *What the evidence from
inside says:* Irrational Labs doubled Headspace's course starts and did not move
practice; Medito had to build "Edit stats" and twenty restorable snapshots
because the number had become the thing. *How the best resolve it:* the office
family holds people for decades by a frame and a calendar (Universalis since
1995, Sacred Space since 1999, Pray As You Go since 2006: longevity rather than
measured return, which DH notes honestly); Execute Program returns on a fixed
ladder; Lectio keeps a 30-day archive so a missed day is a page, not a loss.
DH's four tests make the line usable: does the mechanic measure the practice or
the person; does a missed day create a debt; who chose the interruption; would
it make sense if nobody ever saw the number. **Rule:** the calendar keeps the
date; the reader is never handed a number to protect. A return is allowed only
when it serves his keeping (a question back in five days), ends honestly, and
shows no backlog (patterns 6, 7, 16).

**2. Interaction against the argument.** *The pull:* James asked for interactive
pages, and the Times' most-loved interactives (the dialect quiz, You Draw It)
made the reader the subject. *How the best resolve it:* Archie Tse told the 2016
Malofiej summit that if a reader must do anything but scroll, "something
spectacular has to happen," that the Times had cut steppers, tabs and sliders,
and that content behind a tooltip should be assumed unseen; The Pudding states
its finding first and lets the reader explore after; the CHI 2026 study in
`benchmark.md` found engagement and recall, not comprehension. **Rule:**
interaction lives in three places only: before a reveal (the guess, kept beside
the answer), after the argument (the foot's questions and the return), and in a
separate instrument where the idea is a mechanism (at most three explorables).
Never between an essay's first sentence and its last (patterns 8, 6, 25).

**3. Apparatus against the first screen.** *The pull:* honesty wants notes,
records, kind lines, previews and sources, and Gwern's density shows where that
ends: it needed its own reader mode to mask its links. *How the best resolve
it:* Gwern's "semantic zoom" and Tufte's margin give apparatus fixed places;
Distill and Our World in Data put the record at the foot; previews appear only
on desktop and only after a pause. **Rule:** every piece of apparatus has one
home (the kicker line, the margin, the foot) and appears nowhere else; the first
sentence stays on the first phone screen; an item that cannot name its home is
not added. This is MASTER-PLAN 6.2's "a new panel needs a line in this list
first," extended to the margin and the kicker (patterns 1, 3, 9, 12, 21).

**4. Freshness against finitude.** *The pull:* "new" is the cheapest attention
there is: a Latest strip, a feed, infinite scroll, "trending." *How the best
resolve it:* the Atlantic removed infinite scroll and the modules nobody used;
Increment published 19 issues and a final one; Works in Progress prints six a
year and keeps everything online; Craig Mod asks for issues of three to seven
pieces; the NHS lists its changes by month. **Rule:** new things arrive on a
calendar, are announced once (the letter, the dated log, an issue's contents),
and stay where they were put. Nothing refreshes itself, nothing scrolls forever,
and every page ends (patterns 1, 12, 17).

**5. Urgency against calm.** *The pull:* the one place where seizing attention is
a duty is the crisis page, and the temptation is red banners and alarms on every
hard page. *How the best resolve it:* the NHS grades urgency, puts the action in
the heading, shows the emergency card only where the subject calls for it, and
says plainly that it wants "to reassure people, not to scare them"; GOV.UK
places its exit button only where the subject calls for it, because the button
itself can make a reader who does not see herself at risk feel the page is not
for her, and it says what the button cannot do. **Rule:** LiveWell raises its
voice in exactly one card on the pages that need it, by words and position,
never by color or motion, and it never promises a safety it cannot give
(pattern 2).

**6. Delight against information.** *The pull:* praise and celebration feel
warm: Mathigon's thirteen emoji praise lines, Duolingo's flame, The
Evolution of Trust's "Congrats, you placed your bet on the right horse," mood
check-ins, progress rings. *How the best resolve it:* Brilliant shows its "Why?"
even when the reader was right; Anki says "You have finished this deck for now";
Orbit's answers are "Remembered," "Forgotten," "Skipped"; the Examen asks what
happened and where God was, and stores nothing about the reader's state.
**Rule:** the reply to anything the reader does is information with its source;
the only measure of a person's progress is time held, in words (patterns 7, 8,
14, 16).

**7. Ornament against witness.** *The pull:* generated covers and stock art are
the fastest way to make a page look finished; Snow Fall's imitators became
"bells and whistles"; a 3D shelf (rumored, never confirmed, for Stripe Press)
spends the reader's first seconds on the wrapper; and every agent building a
page is tempted to make it a showpiece. *How the best resolve it:* the Public
Domain Review builds on real, credited works; the Atlantic found its distinction
in its 1857 heritage; Tufte keeps color for figures; GOV.UK will not let a team
restyle a shared component, because a box that looks different teaches the
reader it means something different. **Rule:** an image is a witness or it is
absent; distinction comes from the house system, never from a page's own
ornament (patterns 5, 21, 22).

**8. The private room against the shared table.** *The pull:* the most personal
features (a prayer list, a line from the Examen, kept lines, a self-check's
answers) are the most valuable and the most sensitive data the site would ever
hold, while the pastor's channel wants things that travel (links, printouts,
adapted guides). Other products resolve it by accounts, feeds and, at the worst,
data trade (Pray.com's attribution SDKs and data-broker files). *How the best
resolve it:* Day One encrypts by default and says so; Smart Answers keeps
sensitive answers out of the URL; the Learning Lab shares an adapted collection,
never the students' answers. **Rule:** what the reader writes stays on the
device and is said to stay there, at the field; what a leader shapes may travel
by link; nothing about a person ever enters a URL or telemetry. A covered this
for notes and progress (A's tension 7); prayer text and self-check answers raise
the stakes (patterns 4, 16, 24).

**What draws attention, honestly.** The ranked list holds the attention James
asked for, each piece earned by content: a numbered note that opens beside the
claim it supports (3); a correction dated and owned by the site (1); a care page
that tells a frightened reader in one heading what to do now (2); the office
that opens on the right hour with today's psalm (16); last week's question
coming back on Tuesday (6); the guess the reader made, sitting beside what the
first readers heard (8); "No. 1 · Advent 2026" on a booklet in a church lobby
(17); a figure whose caption says what it shows (22); one primary source a week,
dated and checkable (13). None needs a counter, a badge, or a moving picture.

---

## 4. Completeness: what this wave could not see or did not cover

Each item names the product or page, the question, and the pattern the answer
could change. Ordered by how much the answer could change the plan.

### 4.1 First, LiveWell's own data (outranks everything below)

- **Vercel analytics for `/tools/scripture-memory`, `/theology/glossary`,
  `/my-library`, `/tools/prayer-planner` and `/tools/worry-journal`.** Whether
  patterns 6, 7, 9 and 16 build on surfaces readers already use or revive ones
  they do not. No cluster could reach it.
- **Search Console queries.** Which tasks earn the first step-by-steps (10),
  which queries get pins and synonyms (18), the three top tasks on each hub (19),
  and which care pages most need the urgency cards first (2).
- **A baseline for the essay foot.** Once U24 lands, 90 days of each foot item's
  use (aggregate events only), before pattern 12 prunes anything.
- **Care-page visits and the existing `QuickExit`.** Visits per care page, and
  whether the exit is used at all, counted without identifying anyone, before
  pattern 2 changes them.
- **What cannot be measured, and should not be.** Device-only state (the review
  shelf, the prayer list, kept lines) stays unmeasured beyond the named
  completion events; no pattern here justifies collecting more.

### 4.2 Nothing was seen live: what to capture when network access widens

Each row is a page to open at 390 x 844 and 1440 x 900, with the one question it
answers.

| Product | Page | The question | Pattern |
|---|---|---|---|
| Gwern.net | Any long essay | How sidenotes become popovers on a phone; how dense the first screen really is | 3, 9 |
| Tufte CSS | The demo page (`tufte-css` index) | Does the margin-note toggle read as a control on a phone | 3 |
| Distill | Any article's appendix | The order and weight of Updates, Reuse and Citation as rendered | 1 |
| Our World in Data | An article with "Past versions"; one with the outdated notice | How the notice behaves when scrolling on a phone; how past versions are listed | 1 |
| Stanford Encyclopedia | Any entry's head and foot | The wording of "First published ... substantive revision" and "How to cite this entry" | 1 |
| NHS.uk | A condition page with care cards; "Where to get urgent help for mental health" | How the three levels look; the exact wording of the emergency card | 2 |
| GOV.UK | A page with Exit this page, on a phone | Its placement, the Shift dots, the overlay's speed | 2 |
| GOV.UK | *What to do when someone dies* | How "and" and "or" joins and "Show all steps" look; the side column on desktop | 10 |
| GOV.UK | A start page and a check-answers page | Exact order and wording; how the Change links return | 4 |
| Wikipedia | A long article in Vector 2022 | The pinned contents, the Appearance menu, the sticky header; the findings of its contents test (report exists, unread) | 15 |
| MDN | Quick search, empty and with a query | Recently visited; how results show their place; how the index is ordered | 18 |
| The Atlantic | The end of any article | What follows the last paragraph today; the relaunch's date | 12 |
| Works in Progress | A web essay; a print issue | Notes and figures on the web; how print differs | 3, 17, 22 |
| Stripe Press, Increment | A book page; an issue page | Whether Stripe Press uses WebGL (the avoid list); Increment's art direction | 17 |
| The Public Domain Review | An essay and an image caption | The caption format and where the holder link sits | 22 |
| Quantum Country | The first essay | How embedded questions sit in the text on a phone; the review session's screens (Orbit was read, not the live site) | 6 |
| Execute Program, Readwise | A review screen; Daily Review's end | How many items appear; the closing words | 6 |
| Mathigon | A course with gloss and bio links | How the popup reads on a phone | 9 |
| The Evolution of Trust | The "place your bets" screens | How a guess is shown and returned | 8 |
| Brilliant | One lesson | How "Why?" is drawn and whether it is always offered | 14 |
| Lectio 365 | Morning and night prayer | Whether it shows a streak or keeps a journal (only a directory says "no streak guilt"); audio lengths | 16 |
| Pray As You Go | One day's session | The sequence and timing; whether the reading is really heard twice (one commentary says so) | 16 |
| Sacred Space | A dated daily-prayer page | The Conversation stage's wording; how the date is shown | 16 |
| dailyoffice2019 | Morning Prayer and its settings | Its settings and source (the repository was not found under the names DH tried) | 16 |
| Hallow | The session player and length picker | Whether lengths are free; the post-prayer journal (as contrast) | 16 |
| Chayn | Its 2025 trauma-informed design white paper | The definitions of its eight principles | 2, 4 |
| Smithsonian Learning Lab | A collection's adapt flow | Whether the 2019 features still exist | 24 |

### 4.3 Primary texts to read before anything here is quoted

None of these is for the site (MASTER-PLAN section 2); each shaped a pattern and
reached the cluster through an abstract, a summary or a secondary write-up:
Lally and colleagues, *European Journal of Social Psychology* (2010), on the
missed day; Stecher and colleagues (2021) on anchors; Richland, Kornell and Kao,
*JEP: Applied* 15(3) (2009), and Kornell, Hays and Bjork (2009) on pretesting;
Cepeda and colleagues, *Psychological Science* (2008), on spacing; Settles and
Meeder (2016) on half-life regression; Matuschak's own texts ("Why books don't
work," "How to write good prompts," the mnemonic-medium results); Hohman and
colleagues, Distill (2020); Tse's 2016 Malofiej slides; the GOV.UK taxonomy post
and "Building a better step by step"; the Irrational Labs Headspace case study;
Wikimedia's report behind the 28.9% search figure; Duolingo's own streak
accounts (every one reached LX through podcasts or third parties).

### 4.4 Products this wave did not cover and should have

Seven searches were made for this list (section "Sources added"). Products
marked *(not searched)* are named from general knowledge and must be checked
before anyone relies on them.

**Editorial.**
- **Lapham's Quarterly.** Each issue a theme built from dated excerpts of
  primary texts across history; on hiatus from fall 2023, relaunched in summer
  2025 under Bard College's Hannah Arendt Center (its own Substack
  announcement). *Question:* how an issue sets an excerpt (author, date, place,
  translation) and how its front charts and maps work. It is the closest model
  anywhere for an issue made of the church's own voices (patterns 13, 17).
- **Standard Ebooks.** Open-source public-domain ebooks with a Manual of Style
  dedicated to the public domain (CC0) that defers to Chicago. *Question:* its
  typography rules (quotation marks, dashes, ellipses, small caps, headings) as
  the setting rules for primary sources, and whether its editions of early
  Christian texts are usable starting points (patterns 5, 13).
- **Low-tech Magazine.** A solar-powered site whose printed books, since 2019,
  are made from the same Markdown files as the site, with offline reading as a
  stated purpose. *Question:* the pipeline from site Markdown to book, and how a
  site states its own limits honestly (pattern 17; the first-paint contract).
- **LessWrong** (ForumMagnum, open source). Hover previews on internal links and
  footnotes; Sequences as ordered reading with read tracking. *Question:* how
  its previews behave on touch, and whether its read tracking stays on the side
  of position or slides into completion (patterns 9, 15). Read the code, not the
  community.
- **Kindle X-Ray and Apple Books' Look Up** *(not searched)*. People and terms in
  place, inside a book. *Question:* how X-Ray groups people, terms and places,
  and what it shows a reader who has not reached them yet (pattern 9).

**Learning.**
- **Oak National Academy** *(not searched)*. A free national curriculum whose
  lessons, as generally described, open with a starter quiz and close with an
  exit quiz. *Question:* how a free curriculum checks before and after without
  grading the pupil (patterns 6, 8).
- **A spaced-repetition Bible-memory app** (A covered Remember Me's first-letter
  technique only). *Question:* how it schedules and words its reviews, and
  whether it shows a backlog (pattern 7).

**Devotional.**
- **The Church of England's Daily Prayer on the web and the ACNA's 2019 daily
  office site** *(not searched)*. DH saw only the Time to Pray app listing and
  could not find dailyoffice2019's source. *Question:* how a web page, not an
  app, lays out the office, the psalter and the date (pattern 16).
- **Echo Prayer and Insight Timer** *(not searched)*. A prayer list with
  reminders; a large free meditation library that uses milestones. *Question:*
  how Echo handles answered prayer without a tally; how Insight Timer's
  milestones compare with Medito's freezes (pattern 16; the avoid lists).

**Organized systems and care.**
- **988lifeline.org, Crisis Text Line and Samaritans** *(not searched)*. The
  crisis services' own sites. *Question:* the wording each uses for "call or
  text now," so LiveWell's *Now* card matches the services' own guidance
  (pattern 2).
- **MedlinePlus** (NIH). Its 2007 redesign put plain-language summaries at the
  top of health topic pages and a "Start Here" group of overviews, after users
  said they felt overwhelmed by long lists of links. *Question:* today's topic
  page and A to Z (patterns 19, 1).
- **Cochrane plain-language summaries.** Its guidance requires the certainty of
  the evidence in the key messages and hedged wording when certainty is not
  high; by GRADE convention, plain statements for high certainty, "probably" for
  moderate, "may" for low, "very uncertain" for very low (confirm against the
  current Cochrane Handbook). *Question:* whether a fixed vocabulary of
  certainty suits pattern 20's `held` line and A 9's "how sure" (patterns 20; A
  9).
- **The U.S. Web Design System** *(not searched)*. The American government's
  equivalent of GOV.UK's. *Question:* whether its step indicator, process list
  and site alerts match what an American reader expects better than GOV.UK's
  forms (patterns 4, 10).

**Engineering.**
- **Ink & Switch, "Local-first software" (2019).** Seven ideals, the device's
  copy as primary and servers as secondary copies for sync, built on CRDTs.
  *Question for the platform lane:* whether notes, kept lines, the prayer list
  and the review shelf could ever follow a reader to a second device without
  accounts. It is an auth and schema question, so James first (MASTER-PLAN
  section 2).

**Wave-level gaps.**
- **Audio.** No player built for prayer or for long listening was seen, only
  described. If James records the office's fixed frame or his essays, a later
  wave should look at Pray As You Go, Lectio and Time to Pray's players and an
  audiobook app's chapter list (pattern 16; MASTER-PLAN 6.2 item 12).
- **The letter's layout.** B-post-christian-thought 5 covers its parts; nobody
  looked at a weekly letter's design (pattern 23).
- **Print in a real church.** Only Works in Progress, through its printer's case
  study. Half-letter imposition, black-only copiers and what a church office
  actually prints are questions for PCN pastors, not for search (pattern 17).
- **Offline.** Lectio and Low-tech Magazine treat offline reading as a feature;
  whether `/pray` and table mode should work offline (PWA icons already sit in
  `client/public`) was not studied (pattern 16).
- **Measured accessibility.** No product was tested; the plan's axe and
  Lighthouse runs on LiveWell's previews remain the check.

### 4.5 Conflicts between the clusters, and with the plan, for the lead

1. **`/corrections` against `/whats-new`.** Settled here as one generated log at
   `/whats-new` with a `?only=corrections` view (pattern 1).
2. **Issue cadence.** ED proposes four numbered issues a year; B-post-christian-
   thought 2 proposes three seasons. James decides; the data shape is the same.
3. **A contents bar on essays.** OS 8 proposes one; MASTER-PLAN 6.2 refuses a
   sticky section line on essays. Settled: not on essays (pattern 15).
4. **The note column against "a right rail."** 6.2 needs one sentence saying the
   essay's own notes are not the refused rail (pattern 3).
5. **Two "kind" lists.** Diátaxis's four kinds (OS 11) and the essay genres (ED
   10) are two axes, not rivals (pattern 21).
6. **New telemetry events.** `review_sitting_complete` (6), `office_complete`
   (16), and, only with James's yes, `review_outcome` (14) each need a line in
   MASTER-PLAN 9.9 before they ship.
7. **Retiring "Latest."** Patterns 1 and 17 and B-post 2 each retire it. Only one
   thing replaces it on `/writing` (the current issue, or the current season if
   James prefers B's form); `/whats-new` sits in the footer.
8. **One memory drill.** Pattern 7's repair, A 22, U40 (catechism) and U44
   (creeds) must share one drill and one ladder.
9. **The glossary becomes reader-facing in prose.** Its 114 `short` lines need a
   voice and accuracy pass before gloss links ship (pattern 9).
10. **`/pray` and the never-redirected list.** The Prayer Planner and Worry
    Journal routes stay; only their separate doors in Resources fold (pattern
    16). The office's own door is part of James's question 6.

### 4.6 Questions for James this wave raises

1. Should LiveWell offer a morning and close-of-day prayer at all; if so, behind
   which door, with the Examen, and will he record the fixed frame once? (16)
2. Which license for reuse (CC BY-NC-ND 4.0 is one candidate), and what does his
   publisher allow for book chapters? (11)
3. Numbered issues: yes or no; three or four a year; is Advent 2026 too soon for
   No. 1? (17)
4. A public letters page, and at what cadence? (23)
5. A public corrections log, and a `/how-we-write` that names him as the reader
   of every piece; will anyone besides him review the care pages? (1, 2)
6. Will he write or approve a three-sentence `argumentInBrief` for each shelf
   essay? (8)
7. The anonymous `review_outcome` event (question id and outcome only): yes or
   no? (14)
8. The quick exit at the top of the page, as GOV.UK places it, or bottom right,
   as now? (2)
9. The self-placement instrument: at all? (Also considered)

---

## Sources added in this synthesis

Seven searches, for section 4; each result was read only as a search summary.

- Lapham's Quarterly's relaunch: [Lapham's Quarterly Returns in Summer 2025](https://laphamsquarterly.substack.com/p/laphams-quarterly-returns-in-summer); [The Way of Improvement Leads Home](https://thewayofimprovement.blog/2025/03/24/laphams-quarterly-is-back).
- Standard Ebooks: [Manual of Style](https://standardebooks.org/manual/latest).
- MedlinePlus: [NLM Technical Bulletin, MedlinePlus health topic page redesign (2007)](https://nlm.nih.gov/pubs/techbull/ma07/ma07_medlineplus_health_topic.html).
- Ink & Switch: [Local-first software](https://inkandswitch.com/local-first/); [Wikipedia, Local-first software](https://en.wikipedia.org/wiki/Local-first_software).
- Cochrane: [How to write a Cochrane plain language summary (2017)](https://fertility-regulation.cochrane.org/sites/fertility-regulation.cochrane.org/files/uploads/images/how_to_write_a_cochrane_pls_27th_march_2017_1.pdf); [GRADE training slides](https://training.cochrane.org/sites/training.cochrane.org/files/public/uploads/Nancy%20Santesso%20slides.pdf).
- LessWrong: [Link previews](https://www.greaterwrong.com/posts/tmdRw8h6hm7rCsfiu/new-feature-link-previews); [Footnotes with hover previews](https://www.greaterwrong.com/posts/Fg8dtE8HHkDoiGcwt/new-feature-support-for-footnotes); [LessWrong 2.0 roadmap (Sequences)](https://www.greaterwrong.com/posts/6XZLexLJgc5ShT4in/lesswrong-2-0-feature-roadmap-and-feature-suggestions).
- Low-tech Magazine: [The printed website (2019)](https://solar.lowtechmagazine.com/2019/03/printed-website.html); [Offline reading](https://solar.lowtechmagazine.com/offline-reading).
