# Judge: the lead engineer

Step 3 of the design program (`docs/work/NOTES.md`, "James's redesign brief").
Prepared 2026-10-27. One of six seats.

**The seat.** I ask whether a direction can be built in this codebase by a
small team (agents in five lanes, and one pastor who reads everything under his
name) on React 19, Vite and wouter, with static JSON content behind generated
manifests and validators, tokens in `index.css`, and two API runtimes that must
stay in parity. I ask whether it keeps a phone fast, whether it can still be
kept correct a year from now, how much of what is already merged or reviewed it
reuses, and what can go wrong.

**What I read.** `CLAUDE.md`; `CRITIQUE.md`; the mobile and product critics in
full and the other five critics' verdicts; the three syntheses (verdicts, every
pattern a direction cites, the tensions, the completeness sections);
`MASTER-PLAN.md` sections 0 to 3 and 10 (the roadmap, the calendar, the unit
cards in 10.6, and 10.7); `NOTES.md`; all four directions in full; the current
screenshots of Home, John 1 at both widths, church history, Tonight and Find
Help. I did not open the other judges' files, so this verdict is independent of
theirs.

## What I checked in the repo before scoring

Work checkout at 53136af5; the wave 3 integration tree at aa31178a
(`/home/user/livewell-integrate`); `origin/main` at a2a2ad6e (wave 2).

- **Wave 3 is not on `main`.** U07, U11, U18, U19, U21, U25, U28 and U29 are
  merged in the integration tree only. A door label or a route rename made
  before wave 3 reaches `main` costs no redirect, as the Field Guide says.
- **A correction all four directions share.** The `hard` question is filled in
  **1,033** of 1,189 chapter notes (919 as a single question, 114 as a list),
  and `lib/bible-notes.ts` already reads both shapes through `hardQuestions()`.
  A-SYNTHESIS counted only the lists and every direction repeated its "114."
  The question at the head of a chapter is nine-tenths built, not one-tenth.
  The "uneven depth" risk is smaller than any direction says.
- **A correction that cuts against the Study Desk.** Its inventory says every
  chapter carries `teach` (`big`, `outline`, `pitfalls`, `pastoral`). It does
  not: `teach` is filled in **114** chapters, the same 114 that carry
  `interpretation` and `text`. The Teach depth and "a one-page leader's sheet
  for any chapter" must be assembled from what every chapter has (`summary`,
  `outline`, `questions` in all 1,189; `hard` in 1,033), with the `teach` block
  shown only where it exists. That is a smaller promise, still a real one.
- **The Bible data.** Verse notes in 202 chapters, about 4,311 entries;
  `doctrine-verses` in 62 files; John 1's text shard is 5,842 bytes; no
  paragraph or poetry marks in any shard (Psalm 23's superscription runs into
  verse 1). `search-index.json` is 128 KB.
- **The page the plan will hammer.** `StudyBible.tsx` is 843 lines;
  `pages/study-bible/` already holds `ChapterNotes`, `VerseNotes`,
  `GoToPassage` and `shared`. `Sheet.tsx` (89 lines) and `Stepper.tsx` (107)
  exist with tests.
- **Offline is a decision, not a setting.** `vite.config.ts` sets the service
  worker to `selfDestroying: true`.
- **Night has one price in every direction.** `ThemeProvider
  defaultTheme="light"` without `switchable`, and 661 `rgba(` literals in
  `.tsx` files.
- **Fonts.** Cormorant 400, 400 italic, 500, 600 and Inter 400, 500, 600 are
  self-hosted. No text serif and no Inter italic exist yet.
- **The verified corpus.** U07 stores 22 texts (3.1 MB), and every one was
  written before about AD 450: Diognetus, Polycarp, Perpetua, Justin, Irenaeus
  book 3, Tertullian, Origen, Cyprian, Eusebius books 3 and 5 to 8, Athanasius,
  the Creed and synodal letter of 325, Ambrose 40, 41 and 51, Theodoret 5,
  *City of God* 5. Anything that promises verbatim witnesses after 450 is
  promising new fetching and verification work.
- **Care pages.** 40 files, each storing `askedAs`, `states`, `sensitivity`,
  `reviewed` and every station the Field Guide names.
- **History data.** 7 eras and 68 events whose years are strings ("around 30",
  "around 49 to 62"), 36 figures, 11 councils, 22 era essays.
- **The Home budget.** `familyYear.generated.ts` is 34.6 KB raw and 6.3 KB
  gzipped; U18 already grew Home's entry chunk by 4.8 KB gzip. Mobile
  Lighthouse on Home sat at 95 to 96 in the U08 runs.

## Criteria and weights

| # | Criterion | Weight | What earns the points |
|---|---|---|---|
| 1 | **Reuse of what is built** | 20 | The direction is composition over merged and reviewed work (U07, U09, U10, U12, U14 to U19, U21, U25, U28) and over data already in `client/public`, rather than new systems. |
| 2 | **Fit to the stack and its contracts** | 15 | Static JSON and client code only; no API procedure (so `api/index.ts` and `api-parity.test.ts` are untouched); generated data with `--check` gates; the first-paint contract (`Home.tsx` and `prerender-heads.mjs` together); the 9.3 checklist for param routes; the never-redirected list. |
| 3 | **Performance on a phone** | 15 | Home's first paint waits on nothing; the chapter page (the most visited page from January 1) loads the least it can; search loads on focus; no new font on Home. |
| 4 | **Maintainability by a small team** | 20 | Few new systems; one source per job with views, not copies; validators that make drift fail in CI; no perpetual hand-tending; one file not edited by three lanes at once. |
| 5 | **Risk** | 15 | Few Decision Log reversals on the critical path; little integrity exposure (dates and quotations as public claims); no new exposure on crisis pages; privacy; correctness of time logic; the design still works under James's "no." |
| 6 | **Delivery against the calendar and the critique** | 15 | The first phases land the critique's critical fixes (the chapter, search, consolidation, the reading surface) before the January 1 Bible-reading spike, without redesigning pages in the Advent run-up. |

## Scores

| Direction | Reuse /20 | Stack fit /15 | Phone /15 | Maintain /20 | Risk /15 | Delivery /15 | **Total** |
|---|---|---|---|---|---|---|---|
| The Study Desk | 18 | 13 | 14 | 15 | 12 | 13 | **85** |
| The Field Guide | 17 | 13 | 13 | 14 | 10 | 10 | **77** |
| The Week | 18 | 12 | 11 | 13 | 10 | 9 | **73** |
| The Long Memory | 14 | 12 | 13 | 12 | 8 | 10 | **69** |

## What the four share, and why it decides little

Read side by side, the four directions propose the same shared lane: a text
serif on reading pages with Inter's true italic as the fallback; one long-read
template with notes in the margin; the chapter rebuilt with the text first, the
outline as headings, whole-verse selection, a detented sheet that is a real
dialog, and an auto-hiding bottom bar; one search index in typed groups; the
folds of Deep Bible, the Passage Context tool and the second glossary; mustard
split into a fill token and a text token, with `validate-design.mjs` taught to
fail mustard as text, inline `outline: none` and inputs under 16px; Night only
after the hero audit; no API change. None of them disagrees on the plumbing.

So the choice is about two things: which spine the site hangs on, and which
large new system gets built first. From this seat the best base is the
direction whose spine **is** the shared lane, because every other direction
depends on those same pieces and adds its own system on top. That is the Study
Desk.

## The Study Desk: 85

**Reuse 18.** The desk is composition. The verse panel is U14's `Sheet` with
rows over data that exists (notes in 1,189 chapters, hard questions in 1,033,
typed verse notes in 202, cross-references already cut to the 12 strongest by
`build-bible.mjs`); Read depth is U16's 5.8 KB shard; references in prose are
U16's `VerseRef` over U09's parser; the inbound citation index is one script
over that same parser; paths are U28's plan. It replaces and pulls forward a
unit already planned (U37). It loses two points for the `teach` overstatement
and for a long tail of new instruments (sheets, compare, trace, the review
ladder).

**Stack fit 13.** Everything is static and client-side; no API. Its best
engineering decision is that a verse is a state (`?v=14&panel=church`) and not
a page, so there are no 31,000 thin routes and nothing for the prerender to
skip. The citation index, the doctrine joins and the label mapping are each a
generated or hand-filed file with a validator. It is honest that paragraphing
Scripture is new data and holds poetry lines until a formatted BSB source is
licensed. It loses points for one seam: Home "embeds this week's verse at build
time," so the deployed page shows the verse of the week it was built until the
next deploy. The verse must come from a generated week map read after mount,
with the build week's verse as the static fallback in a reserved box.

**Phone 14.** The only direction with a payload plan for the page that matters
most: Read loads the shard only, notes after first paint, the 54 KB interlinear
only on request, the next chapter prefetched past the last verse, related site
content only when asked, search in kind shards loaded on focus with today's
128 KB as the ceiling. Home stays mostly static, and the verse panel's code and
data load on the first tap.

**Maintainability 15.** It is the direction that removes the most code to
maintain (Deep Bible, the Passage Context tool and its 230 notes, the second
glossary, the regex subject shelves, the "Go deeper" keyword cards) and puts
one surface in their place. It plans the `StudyBible.tsx` refactor (D4) before
any feature lands and runs D5 to D9 in order in one lane, which is exactly the
collision this file would otherwise cause. It loses five points for breadth:
ten signature instruments aimed at one page are a long queue and an invitation
to the Logos cockpit its own risk list names.

**Risk 12.** It keeps James's five doors. Its gates (the text serif, the BSB on
study surfaces, the folds) are the same gates every direction needs. Nothing
waits on new writing to be useful. It loses points for its Home hero, which
replaces the #533 hero James chose and leads with a product card that a
skeptic may read as "a Bible app," and for device-only notes that a cleared
browser erases (mitigated by export from the first note).

**Delivery 13.** It is the only direction that times its work to the calendar
the master plan already keeps: foundations only before Advent (tokens, the
label mapping, the citation index, the refactor), then the desk between
November 29 and January 10, because the 2027 plan sends a reader to a chapter
every day from January 1. It answers critique #1, #2, #3 and #7 head-on, #8
through the band grammar and #5 through the skeptic's door and the topic page.
It loses points for ambition: five serial units over Christmas in one lane is
tight.

**Strongest.** It spends the engineering budget on the one page the 2027 plan
will send a reader to every day from January 1, as composition over data
already in the repo, with an explicit payload plan, a refactor-first step for
the 843-line `StudyBible.tsx`, no API change, and the consolidation that
retires three duplicate study tools.

**Weakest.** Breadth: ten instruments on one page invite a cockpit and a long
Platform-lane queue. Two factual seams: `teach` exists in 114 chapters, not
all, and the build-time weekly verse on Home goes stale between deploys.

## The Field Guide: 77

**Reuse 17.** Its central move is the cleanest data change in any direction:
one generated registry (`guide/index.json`) built from four lists that already
exist (the 40 care pages with `askedAs`, `states`, `sensitivity` and
`reviewed`; U25's topic rows; the Honest Answers; the cases), with `/help`,
`/topics`, `/answers` and the empty search state as views of it. The care
pages already store every station of its descent. `Topic.tsx` is extended, not
replaced.

**Stack fit 13.** Static, client-side, no API. The rename to `/questions`
genuinely costs no redirect before wave 3 reaches `main`. New param routes
(`/questions/:slug`, `/answers/:slug`, `/steps/:slug`) go through 9.3 with
literal meta. Its search routing by kind of query (reference, plain question,
doctrine word, crisis word) is the best search specification of the four, and
it keeps high-sensitivity free text out of URLs.

**Phone 13.** Home's key rows and the river plate are static, prerendered HTML
(the plate under 6 KB), Home loads no new font, and only the tonight row fills
after mount. The chapter page inherits the shared lane but gets no payload plan
of its own.

**Maintainability 14.** One registry with a validator ("a test that each page
reads `guide/index.json`") is exactly the discipline this codebase needs. But
the stations grammar spreads across four page kinds, the 40 care pages are
restructured, and field entries, field marks, region heads and step by steps
add writing under James's name and the byline rule. It asks to lift the topic
cap from six to twelve.

**Risk 10.** Its first heavy work restructures the crisis-facing care pages
(urgency cards, a Now card, the exit button), the highest-stakes surface on the
site and the one the care rule guards most closely. It asks James to reverse a
label he chose a day earlier, under time pressure. It names its own risk of
reading as a help desk to the skeptic.

**Delivery 10.** It puts the Guide, Home and Help into Phase 1 (November to
mid-December) and the chapter page and verse panel into Phase 3 (January to
Lent), after the January 1 spike. Critique #1, the critical problem every
critic raised, waits.

**Strongest.** The Guide registry: one generated file from four question lists
that already exist, with every question surface a view of it and a validator
behind it, and a static Home key that costs first paint nothing.

**Weakest.** It defers the chapter page past January 1 and begins with a
restructure of the 40 care pages and a door rename, the riskiest surface and
the most time-sensitive decision on the site.

## The Week: 73

**Reuse 18.** On paper the most composed of the four: the week is a generated
map over clocks that already exist and are tested (U10's year map, U12's
catechism index, U17's `tonightOn`, U28's plan), read by pure functions
(`weekOf`, `dayOf`, `dateline`, `seasonLabel`) with real-date tests. It absorbs
U20 into a print view instead of adding a page, and it found a real seam in
the data (days 302 to 308 are Luke, not Jeremiah) by computing rather than
typing.

**Stack fit 12.** Static and client-side, no API, `noindex` on dated weeks and
days, a horizon gate in CI. But it adds the most routes (`/week`,
`/week/:sunday`, `/week/:sunday/print`, `/today`, `/day/:date`, `/year`,
`/seasons`, `/seasons/:slug`, `/study/catechism`, `/study/catechism/:n`,
`/study/courses`), an unbounded dated URL space, and a header dateline that
the Decision Log governs.

**Phone 11.** Its Home is date-dependent by design, so the largest block on
the first screen (the week card) cannot be in the static HTML; it is a reserved
box filled after hydration. On the slow-4G runs the mobile critic measured, a
stranger sees an empty card for about a second. The week map must also fit a
5 KB gzip budget on top of U18's 4.8 KB, when the year map alone is 6.3 KB
gzipped; it will need the year slice it names as a fallback.

**Maintainability 13.** Every piece is testable, but a calendar product carries
a permanent tax: horizons that fail the build when under twelve months, a 2028
plan before the Read strand runs out on December 31, 2027, Advent's changing
length, Easter's date, season cadence, a psalter table, about thirty Examen
lines. Four clocks shown side by side also need coherence rules forever.

**Risk 10.** Whether a daily office belongs on a Baptist pastor's site at all is
an identity question only James can answer, and it sits in the direction's
center. Prayer names and Examen lines are the most sensitive data the site
would ever hold on a device. Streak creep is held by rules it writes down well.

**Delivery 9.** It targets Advent Sunday for a new Home card and the week page,
in the very run-up the Advent work (U13, U18, U20) already crowds, and leaves
the chapter page to a "shared lane" outside its own phases.

**Strongest.** The week is composition over four tested clocks, read by pure
functions with real-date tests and a horizon gate, and it absorbs U20 rather
than adding a page.

**Weakest.** The most new surface and a permanent calendar-maintenance tax, a
Home whose largest block fills after hydration, and a schedule that lands in
the Advent run-up while leaving the chapter page to others.

## The Long Memory: 69

**Reuse 14.** It uses the U07 corpus and verifier more than any direction and
rides on U14, U15, U16, U25's `witness` field and the family year. But its core
is new (`lib/line.ts`, `build-line.mjs`, `Line.tsx`, hinge sheets, the Lives
view, a year recognizer, the creed date rail, the gap ruler, the twelve turns)
and it depends on the history registry (U30), which is planned and not built.

**Stack fit 12.** The Line is a well-specified, bounded component: a parse of
the existing date strings into `{ from, to, certainty }` with tests, a
generator with `--check`, inline SVG with real buttons and an "As a list"
`<details>`. But assigning a certainty to 68 events and 36 lives is editorial
judgment, not a parse; fitting twenty centuries into 358 px needs a label
collision check in CI; and the year recognizer must be fenced so that a bare
"23" never becomes AD 23. The doors change touches U19's files and the
Decision Log line.

**Phone 13.** Home's Line is static SVG under 8 KB in the prerendered hero and
is never animated; the history door's sticky overview is light. Good.

**Maintainability 12.** It makes "every node that has a date carries one, with
its certainty" a schema rule, and every tick a line in a ledger. That is
admirable and heavy. Two clocks are two systems. The spine the home page draws
is filled by Parts that arrive one per PR until September 2027.

**Risk 8.** Every tick on the home page is a public, checkable claim, and the
Christendom bracket and the "In America" row are arguments drawn rather than
written, on the first screen, where `validate-politics.mjs` cannot easily reach.
Verbatim witnesses exist for about four of the twenty centuries (the corpus
stops near 450). It reverses James's doors three days after he chose them and
takes About, the skeptic's best credential, off the header.

**Delivery 10.** Building the Line inside U30 and U31 is well aligned with the
plan, but the chapter page waits for Phase 3 inside U37, after January 1.

**Strongest.** The Line is a bounded, testable component that lands inside
history units already planned, uses the verifier more than anyone, and gives
Home a static hero that teaches the site's thesis in one drawing.

**Weakest.** It hangs the whole site on a to-scale drawing whose every tick is
a claim, over a registry that does not exist yet and a corpus that stops near
AD 450, and it reverses the doors.

## Winner: The Study Desk

It is the only direction whose first two phases fix the critique's critical
problems in the order the calendar demands; its spine is the shared lane the
other three also need; it adds the fewest systems that must be tended forever;
it changes no door; and it removes more code than it adds. The other three
each contribute one well-built system that belongs in the merge as a bounded
module on top of the desk, not as the spine.

## What the Study Desk should graft

From **the Field Guide**:

1. **The Guide registry.** `client/public/guide/index.json`, built by
   `scripts/build-guide-index.mjs` with `--check`, merging `needs/index.json`,
   U25's topic rows, `data/answers.ts` and `data/argumentCases.ts`; checked by
   `scripts/validate-guide.mjs` (no orphan entry, every `href` public through
   `site-routes.mjs` or `isPublicEssayHref`, no duplicate `askedAs`). `/topics`
   (James's word, unless he says otherwise before wave 3 reaches `main`),
   `/help`, `/answers` and the empty search state become views, with a test
   that each reads the one file. It retires the `/start` quiz. This is the
   desk's own one-source rule applied to the question layer.
2. **Search routed by the kind of query**, on top of the desk's kind shards: a
   reference opens the verse; a plain-language question shows "In the Guide"
   first by `askedAs` (Help's `searchNeeds` generalized); a doctrine word opens
   the definition card from the glossary's `short` line and the catechism
   answer; crisis words outrank every pin; free text that matches a
   high-sensitivity care page is never written into a URL.
3. **A static phone first screen.** On the phone, replace the desk's weekly
   verse block with the Field Guide's prerendered key (the skeptic's row first,
   the post-Christian question second, tonight filled after mount, the leaders'
   row last) beneath James's sentence and Find. Keep the desk's live verse card
   as the desktop right column, its verse taken from the generated week map
   (graft 10) after mount, with the build week's verse as the static fallback
   in a reserved box.
4. **Care entries, as one later unit.** The crisis lines as three 44 px
   buttons; care cards by urgency (This week, Today, Now) only on
   high-sensitivity pages; "Page last reviewed" from the `reviewed` field all
   40 files already store; the Worry Journal opened inline and steps that tick
   on the device. Gated on James's care review, and scheduled after the desk,
   not first.
5. **Honest Answers as pages** (`/answers/:slug`) with the four-move fields
   (put at its strongest, what it gets right, the answer, what this does not
   settle) in data with a validator, old `#anchors` resolved on `/answers` by a
   hash check; and **"Asked in the Guide"** as one more row in the verse panel,
   fed by the same citation index.

From **the Long Memory**:

6. **The Line as the implementation of the desk's band grammar for time.**
   `lib/line.ts` (the date-string parse with a `certainty` enum, the scale, the
   label collision rule), `scripts/build-line.mjs` with `--check` and a
   collision check at 358 px, and `components/history/Line.tsx` (inline SVG,
   real buttons over the marks, "As a list"). Built inside U30 and U31 on the
   history door. Not on Home's first screen.
7. **The hinge sheet** (`?e=nicaea-325`) in five fixed parts (the world
   before, what happened, the world after, what we still carry, the road to
   it) with the witness label, and **Compare the witnesses** for Thessalonica
   in 390 (Ambrose's Letter 51, Theodoret 5, *City of God* 5.26, all three
   stored), inside U32 and U54.
8. **The year recognizer in search**, run after the reference parser and fenced
   to three- or four-digit numbers or explicit "AD" and century forms, opening
   the timeline at `?year=`; and a date on every search result that has one.
9. **The creed's phrase notes in the margin with a date rail**, inside U44 with
   the 325 and 381 switch; and **"Asked before"**: U25's single `witness`
   field grown into a list of witness cards on topic pages, verbatim only where
   `verify-sources.mjs` passes and marked as narration where it does not.

From **the Week**:

10. **The week engine for the desk's "This week."** `scripts/build-week-map.mjs`
    writing `client/src/lib/weekMap.generated.ts`, read by `client/src/lib/week.ts`
    (`weekOf`, `dayOf`, `seasonLabel`), with `--check`, U10's twelve-month
    horizon gate and real-date tests (Advent 2026, Holy Week 2027, day 302).
    Adopt its Read rule (in a week a daily set serves, Read is the chapter
    behind the table's verse; otherwise the plan's day) and its rule that a
    line joining two strands appears only where the data tags match. It powers
    the desk's `/study/this-week`, Home's This week section and the desktop
    verse card. Load the current year's slice after mount if the map breaks the
    5 KB gzip budget.
11. **For Sunday** at `/week/:sunday/print`, absorbing U20 as a print view,
    with U21's QR code; dated pages `noindex, follow`.
12. **`lib/runs.ts`** for `?start=&cadence=` on plans and study guides (a dated
    roadmap, one calendar file for every meeting, a printed schedule, and the
    two equal choices after a gap). The desk's paths section uses it.
13. **Its refusals as gates:** a copy check that fails streak phrases ("in a
    row," "you missed," "don't break") in `client/src` strings, and a component
    test that any day or week strip reads no storage but the date.
14. **Read and pray and the four doors screen** in table mode (all four
    directions agree; both are a few screens in `TableMode`).

**Considered and not grafted now.** The Week's daily office (`/today`,
`/day/:date`) until James says whether it belongs on the site at all; the
header dateline (header width and a Decision Log line for little gain); the
Long Memory's doors change and its Line as the Home hero (the drawing belongs
on the history door until its ticks are verified and the registry exists); the
Field Guide's rename to "Questions" unless James chooses it before wave 3
reaches `main`; the Field Guide's field marks and cap of twelve field entries
(writing load first, search data second).

## Conflicts the merge must settle

- **Phone gutter.** The desk says 20 px; the other three and MASTER-PLAN 8.6
  say 16 px. Either is one token; shipping both is the bug the mobile critic
  found. Pick one before any template unit starts.
- **Type tokens.** `--fs-*` (desk, Long Memory) against `--t-*` (Field Guide,
  Week). One naming, one scale, in D1.
- **Teach depth.** Build the leader's sheet from `summary`, `outline`,
  `questions` and `hard`; show `teach` only in the 114 chapters that have it.
- **History spine.** All four point at the course's Parts; settle it once
  (critique question 6) and use it in the Line, the era kickers and search.

## What must not be lost in any merge

1. **No API procedure.** Everything is static JSON and client code; `api/index.ts`,
   `server/` and `api-parity.test.ts` stay untouched. Notes that follow a
   reader across devices are an auth and schema change, and James's call first.
2. **The first-paint contract.** `Home.tsx` and `prerender-heads.mjs` change
   together; nothing date- or device-dependent sits in static HTML except
   reserved boxes; no new font on Home; mobile Lighthouse on Home no worse than
   U08's 95 to 96; the text serif loads only on reading pages.
3. **The chapter's payload plan.** Read depth loads the text shard only, notes
   after paint, the interlinear on request, the next chapter prefetched; U35's
   budget covers the chapter route; search loads in kind shards on focus, with
   today's 128 KB index as the ceiling, not the target.
4. **Refactor before features.** `StudyBible.tsx` split into
   `pages/study-bible/` modules with no visible change first, then the desk
   units in order in one lane, never in parallel.
5. **One source per job, views not copies.** One search index, one guide
   registry, one citation index, one history registry, one week map, each
   generated with a `--check` drift gate; joins hand-filed and validated; no
   regex shelves.
6. **A verse is state, not a page.** `?v=14&panel=church` in the URL; no
   per-verse routes; every new param route through the 9.3 checklist with
   literal `SEOMeta`.
7. **The reader's things stay on the device.** Through `lib/storage.ts`, with
   the house save-failure line and export and import from the first note;
   nothing personal in a URL or in telemetry; every new telemetry event written
   into MASTER-PLAN 9.9 before it ships.
8. **Drawings are honest components.** Inline SVG from tokens, live labels,
   real buttons with names, an "As a list" equivalent, drawn for 390 and about
   880 px, nothing behind hover, no chart or map library, no canvas or zoom, no
   mark that opens nothing.
9. **Verification gates the claims.** Verbatim text only through
   `verify-sources.mjs`; paraphrase labeled as a study note; every drawn date
   with a certainty and a source; nothing promised past what the corpus holds.
10. **The accessibility floor.** Sheets as dialogs with focus moved in and
    returned; every gesture with a button; 44 px targets, verses with a 40 px
    hit area through a pseudo-element; inputs at 16 px or more; axe blocking on
    the 25 captured routes; `validate-design.mjs` failing mustard as text,
    inline `outline: none` and small inputs.
11. **Night only after the audit.** The hero token audit and a render test
    under `html.dark` before the switch is shown; the admin stays light.
12. **The Decision Log's structure.** The never-redirected list holds; every
    fold is one hop with a `redirectTo` stub and the `site-structure.test.ts`
    lists updated.
13. **Ship with what exists.** Every surface goes live with text already
    written and improves when James has read the new; no unit blocks on his
    writing.
14. **The corrected counts.** Hard questions in 1,033 chapters, `teach`,
    `interpretation` and `text` in 114; build on `hardQuestions()`, and say
    "not yet written" in one honest line where a layer is empty.

## What I did not verify

I rendered nothing; every position and payload in the directions is an
estimate until a preview is measured at 390 x 844 and 1440 x 900. I did not
measure the entry-chunk cost of a week map, the gzipped size of a Line or river
SVG, or the cost of kind-sharded search. I did not run the gates. I did not
check the license or file size of Source Serif 4 or Literata, the availability
of a paragraphed BSB source, or the reachability of any text the directions
would add to the corpus. The care-page restructure was judged for engineering
risk only; its pastoral content is for James and the care review.
