# Inventory: Tools, Study, and Design

Prepared 2026-10-26 against `main` plus the work branch at `1d3a260` (after
#531 the simplified site, #521 the Grow build-out and design wave, #533 the
home paragraph, #534 "Take it with you"). Read-only survey; nothing in the
site was changed. The site was built (`pnpm build` plus
`scripts/prerender-heads.mjs`) in a scratch copy, served locally with the
tRPC API stubbed to empty results, and walked in Chromium at 390 x 844 (a
phone) and 1440 x 900 (a desktop). Screenshots are in `shots/` beside this
file; the list is at the end.

The question this inventory serves is James's of 2026-10-26: make LiveWell
"very functional," "interactive, and modern," with "study tools," so it truly
helps people live well in a post-Christian America. Behind it sit his
2026-10-14 ask (the best church history study available, "very interactive,"
"the tool to be powerful") and his 2026-10-12 ask (simple, clean, keep what is
actually valuable, everyday language people search for, "run that real
tight").

---

## The short verdict

The site has one genuinely excellent study instrument and a long tail of
uneven ones, all dressed in a strong brand that is being used in a static way.

The excellent one is the **Study Bible** (`/study/bible`): all 66 books, notes
and a title for every one of the 1,189 chapters, verse-by-verse notes on 202
chapters (Genesis and the four Gospels complete), a Greek and Hebrew
interlinear where every word opens its grammar and dictionary entry, cross
references, 62 doctrine studies, 24 reading guides, and an eleven-act story
with "continue where you left off." On a phone the study panel rises as a
bottom sheet. Nothing else on the site comes close to this as a learning tool,
and almost nothing else on the site links into it.

The tail is 36 tools in the `/tools` registry plus about a dozen self-checks.
Several are strong (Test the Case, the self-checks with saved progress and
"change my answers," the Worry Journal, Prayer and Connection Planners, the
Parent and Teen Conversation). But at least five overlap the Study Bible and
each other, one depends on a third-party Bible API in a different translation,
the descriptions still speak the retired IA ("Part of Integrated Life," "the
pillar"), and a first-time visitor has no way to tell which Bible tool is the
real one.

**Church history** (`/theology/history`) is a reading page with tabs, not a
study. 7 eras, 68 events, 11 councils, 10 heresies, 36 people (two women), 22
essays in two overlapping series. On a phone the interactive part (the tabs)
starts 7.8 screens down a page 18 screens long. James's 10-14 ask to double it
and make it powerful has not been built; the design consensus from the lost run
survives in `docs/work/NOTES.md` and should drive it.

The **design system** is coherent and on-brand (cream, charcoal, mustard;
Cormorant and Inter, self-hosted), and that is an asset worth keeping. What
reads dated is the layout grammar laid over it: almost every page opens with
the same full-bleed charcoal block of prose that fills the whole first phone
screen, the instrument sits below it, long pages run 12 to 23 phone screens
with no in-page wayfinding, and the public site has no shared study components
(tabs, popovers, sheets, steppers, progress); each page hand-rolls its own. The
three editorial components #521 added (`EditorialIndex`, `SectionHead`,
`CardGrid`) are good list primitives, not study primitives.

The highest-value, lowest-cost moves are not new tools. They are: a passage
lookup that works everywhere ("John 3:16" in search returns nothing today);
every Scripture reference on the site opening the verse from the Study Bible's
own text; the Study Bible reader fixed for thumbs; the church history study
rebuilt as a connected course; and fewer, clearer tools with the instrument on
screen one.

---

## How a first-time visitor meets it

### On a phone (390 x 844)

The header is calm and works: wordmark, Find Help, search, and a menu that
opens to the five doors (Study, Essays, Books, Resources, About) with My
Library and Subscribe (`shots/flow-phone-menu-open.jpg`). Tap targets in the
header and hubs meet 44 px since #534.

Then the pattern repeats on nearly every page: a charcoal hero, an eyebrow, a
serif headline, and a paragraph that together fill the first screen
(`shots/home-phone.jpg`, `shots/study-phone.jpg`, `shots/tools-phone.jpg`,
`shots/tool-marriage-phone.jpg`, `shots/flow-phone-devotion-builder.jpg`). The
home page is all prose for its first 1.5 screens; its first form control is
the newsletter field 3.8 screens down; it has no search box, no "today," no
tools, and no family door (`shots/home-phone-full.jpg`).

Measured depth of the first form control (button, input, or choice; links not
counted) and page length, in phone screens:

| Page | First control | Page length | Data loaded (JSON) |
|---|---|---|---|
| `/` home | 3.8 (email field) | 5.8 | none |
| `/study` | none, links only | 6.6 | none |
| `/study/bible` | none, links only | 15.3 | 157 KB |
| `/study/bible/john/3` | 0.2 (Reading/Greek) | 12.2 | 703 KB raw, 201 KB gzip |
| `/theology/history` | 7.8 (the tabs) | 18.4 | 408 KB raw, 115 KB gzip |
| `/resources/creeds/nicene-creed` | none | 8.8 | 6 KB |
| `/resources/context` | 0.9 (filter) | 16.8 | 14 KB |
| `/tools` | 0.6 (find a tool) | 12.5 | none |
| `/tools/marriage-assessment` | 0.7 | 4.9 | none |
| `/tools/family-devotions` | 0.6 | 3.7 | none |
| `/tools/test-the-case` | 0.9 | 4.4 | none |
| `/theology/passage` | 0.7 | 3.8 | 741 KB raw, 236 KB gzip |
| `/family` | 1.6 | 14.2 | 338 KB raw, 94 KB gzip |
| `/studyguides` | 1.0 (filter) | 23.0 | 149 KB |

No page scrolls sideways at 390 px. JavaScript is reasonable: the home page
loads four chunks, about 139 KB gzip; a Study Bible chapter about 161 KB; the
heaviest public pages are Deep Bible Companion (232 KB, of which its own chunk
is 91 KB of inline content) and the self-checks (about 218 KB, pulling the 46 KB
Markdown renderer).

### On a desktop (1440 x 900)

The desktop reads better: the header shows the five doors with a Study menu,
Find Help, search, and Subscribe (`shots/home-desktop.jpg`). The Study Bible
reader is the best screen on the site: text on the left, "this chapter at a
glance" on the right, and the panel becomes a sticky study column when a verse
or word is chosen (`shots/bible-john-3-desktop.jpg`,
`shots/flow-desktop-bible-greek-word.jpg`). Elsewhere the same hero-then-list
pattern holds; the white bordered cards with a colored left rule
(`shots/tool-deep-bible-desktop.jpg`, the tools hub) are the most dated
element on the site.

---

## Inventory: the tools registry

`TOOLS` in `client/src/pages/ToolsHub.tsx` holds 36 entries in five groups
(`TOOL_GROUPS`; `ToolsHub.test.ts` requires every href exactly once). The hub
has a working find-a-tool filter, jump chips for the groups, and a My Library
link. On a phone it is 12.5 screens of cards with three-line descriptions.
Every tool route is lazy-loaded; four retired tools (Sermon Outline, Pastor
Burnout, Church Health, Discipleship Table) redirect to `/tools`
(`client/src/App.tsx:452`) while their files, 5,600 lines between them, stay in
the repo.

Judgments below are for a first-time visitor in post-Christian America.
"Keep" means it earns its place; "fold" means its job belongs inside another
surface; "fix" names the specific problem.

**Start with an honest reading (5).** Where Are You With God (`/diagnostic`,
8 questions); Life Audit (24 across 8 areas); Emotional Health (15);
Spiritual Gifts (32, both views on the miraculous gifts left open); Whole-Life
Assessment (`/life/assessment`, 30). All persist progress through
`lib/storage.ts`, offer "change my answers," show history
(`SelfCheckHistory`), and carry crisis blocks where needed. Keep the
mechanics; they are the site's best interactive pattern. Fold: the Life Audit
and the Whole-Life Assessment do the same job (a scan across life areas
ending in next steps) and should be one instrument.

**Scripture and theology (12).** This is where the confusion lives.
- Study Bible: not in the registry at all, though it is the best tool.
- Deep Bible Study Companion (`/tools/deep-bible`): 20 books, "six layers."
  Overlaps the Study Bible's book introductions; 81 hardcoded hex colors in
  `DeepBibleCompanion.tsx`; 2,510 lines of inline content. Fold into the Study
  Bible.
- Bible Study Guide (`/tools/bible-study`): 12 books, themes and questions.
  Same overlap. Fold.
- Passage Context Tool (`/theology/passage`): fetches the passage from
  `https://bible-api.com` in the World English Bible
  (`PassageContext.tsx:194`) and loads a 710 KB notes file up front. The Study
  Bible already has the passage (Berean Standard Bible), its notes, and its
  context. Fold; point `ScriptureRef` at the Study Bible instead.
- Reading Scripture in Context (`/resources/context`): a library, not a tool.
  Keep, file under Study.
- Verse Finder, Misused Verses (`/tools/bible-says`), What the Bible Says About
  (`/tools/bible-on`): three topical verse tools. Keep one front door ("a verse
  for what you are carrying") with Misused Verses as its own strong feature.
- Theology Quiz (10 questions), Glossary, Scripture Memory (40 verses, first
  letter and fill-in modes, local progress): keep. Scripture Memory is a good
  model for creeds and catechism memorization.
- Test the Case (9 published cases, objection by objection, progress saved):
  keep; the most skeptic-ready tool on the site and the one most worth
  surfacing on the home page.
- Which Lens Has You? (13 choices): keep the instrument, fix the ending. Its
  result buttons read "Enter the pillar: The Capture by the Right" and land, via
  redirects, on `/writing?section=faith-and-power` (`WhichLens.tsx:106-139`);
  the pillars it promises no longer exist.

**Wisdom for a real situation (9).** Wisdom hub, Wisdom Finder, Proverbs in
31 Days (date-matched, with a phone reminder), Quote Library, Conflict Guide,
Worry Journal, Prayer Planner, Connection Planner, Prayer Generator. The three
planners and the journal are private to the browser and are exactly the kind
of everyday instrument James asked for. Proverbs in 31 Days is a natural
"today" item for the home page.

**Family, marriage, and the household (7).** Family Devotion Builder (age band
plus one of ten virtue themes; none of the themes is a post-Christian subject:
gratitude, courage, forgiveness, honesty, prayer, generosity, patience,
identity, obedience, hope), Marriage Self-Check (with couple compare),
Parenting Stage Guide, Parent and Teen Conversation, Parenting Verses,
Financial Health, Rule of Life. Keep; the family inventory covers the content
gap.

**The church and the public square (3).** Consistency Check, Party
Scorecard, If We Had a Biblical Government. These are the post-Christian
instruments James most wants and they sit last on the hub, under a group title
a reader in a hurry would skip. Promote them, and pair them with the Christian
nationalism study guide and the context guides on Romans 13 and 2 Chronicles
7:14.

**Stale copy across the registry.** Nine descriptions still name retired
sections ("Part of Integrated Life," "Part of the Theological Depth section,"
"the pillar built to dismantle the lens"): `ToolsHub.tsx` lines 20, 34, 48, 55,
62, 69, 76, 83, 97.

### Self-checks and quizzes

`/assessments` lists twelve: the diagnostic, the Whole-Life Assessment, Start
Here (`/start`), Marriage, Emotional, Financial, Life Audit, Spiritual Gifts,
the Theology Quiz, Which View Am I (`/theology/which-view`), Which Lens, and
the Consistency Check. There are three different "start here" entries
(`/start`, `/diagnostic`, and "Start here: study the Bible" at `/study`); the
home page links none of them.

---

## Inventory: the Study Bible

Files: `client/src/pages/StudyBible.tsx` (front door, book page, reader),
`study-bible/ChapterNotes.tsx`, `study-bible/VerseNotes.tsx`,
`study-bible/shared.tsx`, `StudyBibleStory.tsx`, `StudyBibleDoctrines.tsx`,
`StudyBibleGuides.tsx`. Data in `client/public/bible/` (74 MB: text 36 MB,
notes 26 MB, lexicon 9 MB). The prerender writes 1,352 Study Bible pages, so
every chapter unfurls as itself.

**What works.**
- Coverage: every chapter has notes and a title (1,189 of 1,189); 202 chapters
  have verse notes (Genesis 50, Matthew 28, Mark 16, Luke 24, John 21, Hebrews
  10, Exodus 9, Romans 9, and scattered others); 62 doctrines; 24 guides.
- Reader: a Reading/Greek (or Hebrew) toggle remembered per device; prev/next
  across book boundaries; `#v16` deep links; a verse panel with study notes, the
  Greek or Hebrew, and cross references; a word panel with grammar spelled out
  and the full lexicon entry; words that differ between the Greek editions are
  marked. On a phone the panel
  is a bottom sheet with a close button (`shots/flow-phone-bible-verse-panel.jpg`).
- The story path: eleven acts, each chapter placed in the story, with "Continue
  the story" on the front door once a reader has started.
- Book pages: overview, structure linked to chapters, author, date, setting,
  purpose, Christ, themes, key chapters, reception, and tiered further reading.

**What a first-time visitor runs into.**
- No passage lookup. There is no "go to" box on the front door or the reader,
  and site search returns "Nothing here" for "John 3:16." `parseRef` already
  exists in `lib/bible.ts`.
- On a phone the text of John 3 starts about 930 px down, below the chapter's
  act label, title, and summary (`shots/bible-john-3-phone.jpg`). The reader
  came for the text.
- The verse buttons are 24 px superscripts (`StudyBible.tsx:568`); the verse
  text itself is not a target. 82 controls under 32 px on John 3 at phone
  width. The core interaction of the tool is the hardest to hit.
- Moving to another book or chapter takes the book link, then a long scroll
  through the book page to its chapter grid. The project's own Phase 1 spec
  asks for "book and chapter navigation that works in two taps on a phone"
  (`docs/STUDY-BIBLE-PROMPT.md` §3).
- Each chapter downloads `/catalogue/index.json` (372 KB raw, 96 KB gzip) to
  list related site content (`study-bible/ChapterNotes.tsx:139`) plus a 119 KB
  notes index. The spec's own gate says "no page downloads more than its own
  chapter and the shards it opens" (§4).
- The word panel shows the lexicon but not "how often it occurs, with every
  occurrence one tap away" (Phase 1). Phases 2 to 5 (word study pages and
  concordance search, people and places, reading with the church, a guided
  study method with saved notes, every guide and essay linking in at the verse)
  are not built.
- No way to keep anything: no saved verse, highlight, or note, though My
  Library (#534) and the storage helper make that cheap and private.
- Greek and Hebrew rely on fonts the reader probably does not have
  (`StudyBible.tsx:65-66` names SBL Hebrew, Ezra SIL, SBL Greek, Gentium Plus,
  then Times New Roman). `client/public/fonts/` holds only Latin subsets of
  Cormorant and Inter.

**The single biggest missed connection.** Scripture references across the
site are dead text. None of the context guides, creeds, church history pages,
study guides, family devotions, plans, or essays link a reference into the
Study Bible. The one shared component, `components/ScriptureRef.tsx`, sends
references to the Passage Context tool instead, and only `TheologyDoctrine.tsx`
uses it. `lib/needs.ts:107` has a reference-to-chapter helper the care pages
use. A single verse component that shows the verse from `/bible/ch/<book>/<n>.json`
and offers "Open in the Study Bible" would turn the whole site into a study
surface.

Translation note for the plan: the Study Bible and any verse popover use the
Berean Standard Bible (public domain); CLAUDE.md requires ESV for quotations in
prose. Popovers should name BSB plainly; essays keep quoting ESV.

---

## Inventory: church history

Files: `client/src/pages/TheologyHistory.tsx` (359 lines),
`client/src/pages/history/HistoryEssay.tsx`; data in
`client/public/theology/church-history-{timeline,councils,heresies,figures}.json`
and `client/public/history/essays/*.json` with `essays-index.json`.

**What is there.** A charcoal hero; "The era essays," 22 rows in an
`EditorialIndex`; a statement band; then four pill tabs: the timeline (7 eras
as accordions, one open at a time, each with its events and the essays,
councils, figures, and heresies that fall in its dates), the councils (11
cards), the heresies (10 cards: the claim, why it appealed, what the church
said, who answered, where it returns today), and the people (36 profiles by
era). Total about 4,050 words of timeline, 69 KB of reference data, and 22
essays of 1,485 to 6,856 words (about 57,000 words).

**What a first-time visitor runs into.**
- The study is below the reading list. On a phone the tabs start 6,600 px
  down (7.8 screens) of an 18.4-screen page (`shots/flow-phone-history-timeline.jpg`).
- The tabs are not in the URL. Back, refresh, and share all return to the
  timeline. Choosing a council, person, or heresy inside an era switches tabs
  but does not scroll to or open that entry.
- Two essay series overlap and use different era vocabularies: 14 essays
  labeled by the timeline's eras and 8 labeled "Ancient," "Medieval,"
  "Reformation," "Modern" that cover the same ground (`the-apostolic-age` and
  `the-age-of-martyrs` beside `apostolic-and-persecuted`; `the-great-councils`
  beside `councils-and-creeds`; `the-reformation` beside
  `reformation-and-its-wars`). They appear as one list of 22.
- No primary sources, no Scripture links, no map, no way to check what you
  learned, no progress, no printable session, no leader notes. It informs; it
  does not yet teach.
- History is scattered across separate libraries that do not know about each
  other: the church history timeline (68 events), the injustice timeline
  (`/justice/timeline`, 45 events), three sets of people (36 figures, 15 justice
  witnesses, 16 "witnesses who would not be captured"), and 10 traditions.
- If any data file fails, the page stays on "Loading the story…" forever:
  the fetch swallows the error (`TheologyHistory.tsx:50`), against the
  `fetch-json` plus `LoadFailed` invariant.
- The page also loads about 300 KB of unrelated indexes (study guides,
  how-tos, care pages, life domains) for the `SubjectShelf` at its foot.

**Direction already agreed.** `docs/work/NOTES.md` keeps the judges'
consensus from the lost design run: a primary-sources backbone, about 32 to 36
course sessions (myth check, the story with source cards and ESV Scripture, one
steelman, one mirror, retrieval questions, discussion questions, leader notes,
a printable handout), a connected registry (people, events, places, councils,
sources) with entity sheets, a list-first timeline, an atlas, contemporaries,
and a councils and controversies explorer; vertical slice first; keep
`/theology/history` URLs. Nothing in this inventory contradicts it. The
interactivity it implies (URL-addressable entities, a scrubbable list-first
timeline, retrieval checks, progress) is the right kind.

---

## Inventory: creeds and context guides

**Creeds** (`/resources/creeds`, `CreedsLibrary.tsx`, `CreedDocument.tsx`; 14
documents in `client/public/creeds/`). Four ancient texts in full (Apostles',
Nicene, Athanasian, Chalcedonian), Heidelberg and Westminster Shorter Q1
only, and eight confessions as summaries (Westminster, 1689 London Baptist,
New Hampshire, Schleitheim, Barmen, Augsburg, Dort, Thirty-Nine Articles). Each
has an introduction, the text, and phrase-by-phrase annotations, which render
as a list after the text (`shots/creed-nicene-desktop.jpg`). The annotations
are the interactive opportunity: tapping a phrase in the creed to open its note
is how a reader actually learns a creed. The full texts of the summarized
confessions are public domain and belong on a study site; that is content work.

**Context guides** (`/resources/context`, 41 guides in
`client/public/context/`). Strong material: the ancient Near East, Second
Temple Judaism, the Greco-Roman world, reading Scripture apart from American
politics ("The Kingdom Is Not a Platform," "Left Lens, Right Lens," "Exile,
Not Empire"), and ten "verses everyone quotes" guides (Jeremiah 29:11, Romans
13:1, 2 Chronicles 7:14, Philippians 4:13, and others). These ten are the
site's best answer to "everyday language people search for," and they are the
natural place for a "what we hear / what they heard" reveal. The index page is
16.8 phone screens; its filter at the top works.

---

## Inventory: the design system

**Tokens** (`client/src/index.css`, 719 lines). `:root` holds the palette
(charcoal, bone, bone-warm, card white, ink, ink-muted, mustard with
mustard-deep and mustard-text), semantic score colors, an eleven-hue accent
ramp, motion tokens with a reduced-motion guard, an 8-point spacing scale,
container widths, 2 px radii, and the type families. Debt: about two dozen alias
tokens, several with names that mislead (`--oxblood`, `--rust`, and `--gold` all equal
mustard; `--forest` equals charcoal; `--goldlt` is mustard-text); 664 `rgba()`
literals in components; 46 components that inject their own `<style>` blocks.
An `html.dark` token set exists but the `ThemeProvider` in `App.tsx:717` is not
switchable, so dark mode never runs and the footer toggle never renders.

**Type.** Cormorant Garamond (400, 500, 600, italic 400) and Inter (400, 500,
600), self-hosted as Latin subsets with `font-display: swap`; the 400 weight of each is preloaded. Thirty inline styles ask for `fontWeight: 300`, which no shipped face
supplies. No Greek or Hebrew face is shipped.

**Editorial components from #521** (`client/src/components/editorial/`).
`EditorialIndex` (hairline rows, kicker, serif title, dek, "Read" mark, one or
two columns), `SectionHead` (eyebrow, heading, intro, see-all with count), and
`CardGrid` (lifted cards with a named action, never below 320 px). With
`EditorialBlocks` (`StatementBand`, generated `SectionArt`) they are used on 23
surfaces and they did make the collection pages consistent. They are list and
section primitives. There is no shared tabs component, disclosure, popover,
bottom sheet, stepper, progress bar, sticky context bar, verse reference,
source card, or check-yourself card on the public site; each tool builds its
own. The 50 shadcn/Radix primitives in `components/ui/` (tabs, popover, sheet,
dialog, progress among them) are used only by four admin files and the
lazy toast in `App.tsx`.

**Header and footer.** `client/src/lib/siteNav.ts` is the single committed map
(five doors, Find Help, search, Subscribe; the footer mirrors every group),
held by `site-structure.test.ts`. It paints before the API answers. It is the
right shape; the one gap is that the header search does not resolve a
Scripture reference or a plain question.

**Home** (`client/src/pages/Home.tsx`). James's headline and paragraph, three
doors set as a contents page (Study the Bible, Read the essays, The books), one
quiet line to resources, three essays, the books, the newsletter, and a quiet
line to Find Help. It is calm and true to the emotional brief ("unhurried,
weighted, grown-up"), and it imports nothing heavy. It is also entirely static
reading: no search, no passage lookup, no "today," no "continue," no tools, no
family, no skeptic door (Test the Case), and on a phone nothing to touch for
1.5 screens. The hero markup is mirrored by the static hero in
`scripts/prerender-heads.mjs`; any change must change both.

**What reads dated, specifically.**
- The full-bleed charcoal hero of prose on nearly every page, filling the first
  phone screen before the instrument (tools, self-checks, resources, history,
  essays). Reserve it for Home and About; elsewhere a title and one line, then
  the thing.
- Centered hero text on tool pages, against left-aligned text everywhere else.
- White boxed cards with a colored 4 px left rule (the tools hub, Deep Bible),
  the most dated element on the site.
- Very long single-column pages with no sticky in-page bar: the Study Bible
  front door 15 screens, history 18, context 17, study guides 23.
- Almost no visual teaching: no maps, timelines drawn as timelines, diagrams,
  or charts; the only images are James's portrait, three book covers, and
  generated section art.
- Accordions that hide the teaching on desktop (one era open at a time), where
  the reader would rather scan.

**What is an asset and should stay.** The palette and type pairing (it looks
like a serious book, which is the brand); the hairline index rows; the calm
header; the persistence and "change my answers" pattern; the crisis care built
into the self-checks; Take It With You, My Library, Listen, and text size from
#534; the Study Bible's reader layout on desktop.

---

## Where interactivity helps learning, and where it is noise

Ranked by what it does for a learner against what it costs. Everything here
can be built from committed JSON and per-device storage, with no new API and
no accounts.

1. **Passage lookup everywhere.** Header search, `/search`, the Study Bible
   front door, and the reader accept "John 3:16," "jn 3 16," "Romans 13" and go
   straight to the chapter and verse. Cheap (`parseRef` exists), and it is the
   first thing a Bible reader tries.
2. **Every Scripture reference becomes a door.** One verse component used by
   the Markdown renderer and the JSON libraries: tap a reference, see the verse
   (BSB, from the Study Bible's own files, one small fetch), "Open in the Study
   Bible." This is Phase 5's last bullet and it connects essays, devotions,
   plans, study guides, context guides, creeds, and history to the best tool
   on the site. Retire `ScriptureRef`'s link to the Passage Context tool.
3. **The Study Bible reader for thumbs.** The whole verse is the target, not a
   24 px number; the text starts on screen one with the summary collapsed
   behind "About this chapter"; a sticky bar with a two-tap book and chapter
   picker; occurrences in the word panel; save a verse or a note to My Library;
   load related site content only when asked.
4. **Church history as a course and a registry,** per the agreed consensus.
   First moves that pay immediately: the timeline first, as a list with an era
   jump bar; tabs and entities in the URL so a council or a person can be
   linked, shared, and returned to; one ordered path through the essays instead
   of two overlapping series; retrieval questions at the end of each session
   (three questions, no score); primary-source cards; the injustice timeline and
   the three sets of witnesses folded into the same registry.
5. **A home page that does something on a Tuesday.** A passage and site search
   box; "today" built from committed data (this week's family devotion, today's
   Proverbs chapter, the next chapter of the Story); "continue" from local
   progress (the essay, plan, self-check, or study you started); one visible
   door each for the skeptic (Test the Case), the family, and the public square.
   Read local storage after mount so the first-paint contract holds.
6. **Fewer, clearer tools with the instrument on screen one.** Fold Deep Bible,
   the Bible Study Guide, and the Passage Context tool into the Study Bible;
   merge the Life Audit and the Whole-Life Assessment; one topical verse front
   door; rewrite the stale "pillar" and "Integrated Life" copy; promote the
   public-square instruments.
7. **Creeds you can learn.** Tap a phrase for its annotation; compare Nicene
   325 with 381 and the Apostles' with the Nicene; a memorize mode reusing
   Scripture Memory's first-letter drill; each creed linked to its council in
   the history registry and to its doctrines in the Study Bible.
8. **Context guides that reveal.** On the ten "verses everyone quotes" guides,
   a "what we hear / what the first readers heard" reveal, with the verse
   itself one tap away.
9. **Drawn teaching, sparingly.** A few hand-built inline SVG maps and
   timelines (Paul's cities, the empires between the Testaments, where the
   councils met, the spread of the church) coloured from tokens. No map
   library.

**Noise to refuse.** Streaks, badges, points, or a score on anyone's
spiritual life; an AI chat box; carousels; autoplay; scroll-jacking and
parallax; animated counters; confetti; pop-up email modals; social-proof
counters; a 3D or zoomable canvas timeline; a heavy map library. Also refuse
interactivity that hides the text a reader came for (collapsing the teaching by
default on desktop), and any "quiz" that grades faith rather than helping
recall.

---

## Technical constraints that shape any redesign

- **Content Security Policy** (`vercel.json:65`): `script-src 'self'
  'unsafe-inline' https://js.stripe.com`; `font-src 'self'`; `connect-src
  'self' https:`; `img-src 'self' data: https:`; frames only Stripe and
  YouTube. Every library is bundled, never loaded from a CDN; fonts are
  self-hosted. A Greek or Hebrew face (OFL: Gentium Plus, Ezra SIL, Noto Serif
  Hebrew) can be self-hosted and loaded only on Study Bible routes.
- **Self-hosted fonts** in `client/public/fonts/` with `@font-face` in
  `index.css`; never a fonts CDN (CLAUDE.md elevation standard).
- **Inline styles bound to `:root` tokens;** no hex in components. New study
  components should put their hover, focus, and media rules in `index.css`
  classes (as `.ed-*` and `.home-*` do), not in more per-page `<style>` strings.
  A dark or night-reading mode would first need the 664 `rgba()` literals and
  Deep Bible's 81 hex values tokenized.
- **Prerendered heads.** `scripts/prerender-heads.mjs` extracts `<SEOMeta>`
  titles and descriptions as string literals and writes about 2,841 HTML files,
  including 1,352 Study Bible pages and a static home hero mirrored from
  `Home.tsx`. New pages declare literal meta; a home redesign changes both files.
- **Tests that hold the shape.** `client/src/test/routes.smoke.test.tsx` renders
  every route in the table; `client/src/lib/site-structure.test.ts` holds the
  five doors and the redirects; `ToolsHub.test.ts` holds the registry;
  `validate-links.mjs` fails any hand-written `/writing/<slug>` link to a
  retired essay. Folding a tool means a redirect in `vercel.json`, a
  `redirectTo` stub in `App.tsx`, and updates to these tests.
- **Two API runtimes.** Anything server-backed (reader accounts, synced
  highlights, shared notes) must exist in `server/` and `api/index.ts` and pass
  `api-parity.test.ts`. Every recommendation above avoids the API; cross-device
  sync would be an auth and schema change, which CLAUDE.md says to stop and ask
  about.
- **No reader accounts.** All personal state is per device through
  `lib/storage.ts` (`livewell-progress-*`, My Library). Design "continue" and
  "saved" around that honestly ("on this device").
- **First-paint contract.** Static masthead in `index.html`, nav from the
  committed map, QueryClient `retry: 1`; nothing on Home or the header may wait
  on the network.
- **Bundle discipline.** No Framer Motion or recharts in the client today
  (`docs/ARCHITECTURE.md` still lists both; it is stale). Radix primitives are
  installed and chunked as `vendor-ui` (11 KB gzip) but unused publicly; restyled
  to tokens they are the cheapest accessible base for tabs, popovers, and sheets.
  The 3.1 MB `content-data` chunk is imported only by the admin dashboard.
  The Study Bible's own gate (one chapter plus the shards it opens) should
  become a rule for every study page.
- **Service worker is self-destroying** by design (`vite.config.ts`), so there
  is no offline reading. Offline chapters for a Bible reader would be valuable
  but reverse a deliberate decision; that is James's call.
- **Third parties.** The Passage Context tool calls `bible-api.com`; the home
  portrait and 26 other references load from a legacy CloudFront host
  (`d2xsxph8kpxj0f.cloudfront.net`, `lib/positioning.ts:50`). Both are single
  points of failure worth bringing in-house.

---

## Smaller defects found on the way

1. `TheologyHistory.tsx:50`: failed fetches leave "Loading the story…" on
   screen forever; no `LoadFailed`, no retry.
2. `TheologyHistory.tsx` era panels: council, figure, and heresy buttons switch
   tabs but do not scroll to or open the entry; tab state is not in the URL.
3. `StudyBible.tsx:568`: 24 px verse targets on the main study interaction.
4. `study-bible/ChapterNotes.tsx:139`: the 372 KB catalogue index loads on
   every chapter, against the Study Bible's own payload gate.
5. `lib/siteSearch.ts`: every query word must match, with no stop words, so
   plain questions ("how to talk to my kids about God," "is america a christian
   nation") return nothing from the static libraries; references are not
   recognized ("John 3:16" returns nothing). Essays come from the database and
   were not testable here.
6. `components/ScriptureRef.tsx`: points to the third-party, WEB-translation
   Passage Context tool rather than the Study Bible; used in one file.
7. `tools/WhichLens.tsx:106-139`: "Enter the pillar" calls to action that land
   on essay shelf sections via redirects.
8. `ToolsHub.tsx`: nine descriptions name retired sections.
9. `tools/DeepBibleCompanion.tsx`: 81 hardcoded hex values.
10. `App.tsx:717`: `ThemeProvider` not switchable; the `html.dark` token set
    is unreachable.
11. Retired tools still in the repo: `SermonOutline`, `PastorBurnout`,
    `ChurchHealth`, `DiscipleshipTable` (`App.tsx:452-455` redirect them).
12. Thirty inline styles request `fontWeight: 300`, which no shipped face
    provides.

---

## What I did not verify

- Essays: `/writing` and `/writing/<slug>` read the database; with the API
  stubbed the shelf shows "Nothing on this part of the shelf yet"
  (`flow-desktop-writing` was not kept). The essay reading surface (Listen, text
  size, save, send, print from #534) was not looked at in the browser.
- Real phone fonts: headless Chromium on Linux does not show how Greek and
  Hebrew render on iOS or Android.
- Lighthouse and axe were not run (CI runs them against previews).
- The home portrait did not load here (sandbox network to the CloudFront host);
  in production it does.
- Console errors seen locally (`/_vercel/*` scripts, `/api/track`) are artifacts
  of the local server, not site defects.

How this was produced, so it can be repeated: copy the repo to a scratch
folder, `pnpm install --frozen-lockfile && pnpm build && node
scripts/prerender-heads.mjs`; serve `dist/public` with directory-index and SPA
fallback; answer `/api/trpc/*` with `{"result":{"data":{"json":null}}}` per
batched call; drive Chromium (`/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`,
global Playwright 1.63) at 390 x 844 (mobile, touch, 2x) and 1440 x 900. The
build passed; the only warning was the admin-only `content-data` chunk over
500 KB.

---

## Screenshots (`shots/`)

| File | What it shows |
|---|---|
| `home-phone.jpg`, `home-desktop.jpg` | Home, first screen |
| `home-phone-full.jpg` | Home, whole page on a phone |
| `flow-phone-menu-open.jpg` | The phone menu open |
| `study-phone.jpg` | The Study hub, first screen |
| `study-bible-desktop.jpg` | The Study Bible front door |
| `bible-john-3-phone.jpg`, `bible-john-3-desktop.jpg` | The reader on John 3 |
| `flow-phone-bible-verse-panel.jpg` | John 3:16 tapped: the bottom-sheet study panel |
| `flow-desktop-bible-greek-word.jpg` | Greek interlinear with a word open |
| `history-desktop.jpg` | Church history, first screen |
| `flow-phone-history-timeline.jpg` | Church history tabs, 7.8 screens down on a phone |
| `tools-phone.jpg` | The tools hub on a phone |
| `tool-marriage-phone.jpg` | A self-check: hero before the instrument |
| `flow-phone-devotion-builder.jpg` | The Family Devotion Builder |
| `tool-deep-bible-desktop.jpg` | Deep Bible Companion, overlapping the Study Bible |
| `creed-nicene-desktop.jpg` | A creed page |
| `resources-desktop.jpg` | The Resources hub |
