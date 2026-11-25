# A. Text study: the gold standards

Research for the LiveWell redesign, cluster A ("text-study-gold"), prepared
2026-10-27. James's brief asks for "the most organized, well-designed website
that helps people to study the Bible, to understand doctrine ... interactive,
with things that draw people's attention ... a useful tool for people to study
and learn and grow." This file looks at the products that have done text study
best, inside and outside Christianity, and asks what LiveWell should take from
them without betraying "Unhurried. Weighted. Grown-up."

It goes beyond `docs/work/plan/benchmark.md`, which covered the habit, family,
and course products (YouVersion, Hallow, BibleProject, Ligonier, Logos's AI
assistant) and did not look at how a serious reader actually moves between a
text, its commentary, its words, its people, and its history. It assumes the
plan in `MASTER-PLAN.md` sections 0 to 3 and 7 (one reference parser, passage
lookup, `VerseRef`, the history registry, the session page, creeds you can
learn) and proposes only what that plan does not already contain, or a sharper
version of something it parks.

**Method and limits.** Direct page fetches fail in this sandbox, so no live
page of any product was seen. The evidence is of three kinds, and every claim
below says which: (1) **code read directly** from open-source repositories
cloned into the scratchpad (`design-src/`): Sefaria-Project (the React reader,
connections panel, topics, sheets, learning schedules, CSS), the Scaife Viewer
and its frontend packages (Perseus 5.0), quran.com-frontend-next (components and
English UI strings), Theographic Bible Metadata (data and docs), and OpenBible's
Bible-Geocoding-Data (schema and readme); (2) **the product's own words** in
help centers, release notes, developer docs, and product-update pages, reached
through search; (3) **reviews and secondary descriptions**, marked as such. 41
web searches were used. Nothing is described that was not seen described;
unknowns are listed at the end.

**What LiveWell already has, so the patterns below are calibrated.** The Study
Bible (`/study/bible/:book/:chapter`, `client/src/pages/StudyBible.tsx`) is
already a real instrument: a reading and an interlinear mode with every Hebrew
and Greek word tagged (STEPBible data, CC BY 4.0), tap a word for its lexicon
entry, tap a verse for a study panel with notes in layers ("Hebrew and Greek,"
"History," "Doctrine," "Text and quotations"), cross-references (OpenBible.info,
CC BY), parallel accounts, a "Differs between Greek editions" flag, chapter notes
with "What it teaches" and "How it points to Christ," an eleven-act story order,
doctrine pages, context guides, a verse address (`#v16`), and a "Go deeper on
LiveWell" list of up to six related items per chapter, found by passage match
and doctrine-term search. The lexicon entries already carry occurrence counts
and reference lists. What it lacks is what the gold standards have: every
connection to a verse made visible and counted, the church's voice on the verse
across the centuries, honest labels for how sure and how authoritative each
layer is, a way to gather and compare, and a reason to come back that is a
shared rhythm rather than a score.

---

## 0. The short verdict

The best text-study products share one idea: **a text is the center of a
web, and the reader should be able to see the whole web from any strand.**
Sefaria makes every passage a hub (commentary, sheets, topics, translations,
dictionaries, counted and one tap away) and every topic a hub of passages that
can be read by relevance or in the order history produced them. Perseus's Scaife
Viewer keeps the page clean and moves everything else into collapsible widgets
and interchangeable reading modes. The Dartmouth Dante Project puts seven
centuries of commentary under each line of one poem. Quran.com, the most
polished religious-text reader seen in this research, labels each layer by its
authority ("Reflections are personal perspectives ... and should not be taken as
authoritative"), lets the reader pin verses and compare them, and shows where a
translation had to choose. Accordance offers two dating schemes, "Conservative"
and "Critical," and lets the reader choose. OpenBible.info's atlas records how
confident modern scholarship is in every place identification.

None of them is built for LiveWell's reader. Sefaria and Quran.com serve
communities inside a tradition; Perseus serves classicists; Logos and Accordance
serve pastors and scholars who pay; Precept Austin and Enduring Word serve the
Bible teacher preparing a lesson. None writes toward the skeptic. The opening
for LiveWell is to take the web-around-a-text structure that these products
perfected and fill it with what LiveWell alone holds: the Study Bible, the
church's long memory (the history registry and its verified primary sources),
James's essays, and the questions a post-Christian reader actually brings,
with every layer honest about who is speaking and how sure anyone can be.

The fifteen patterns in section 2 are ranked by how much they would change a
reader's first ten minutes and how well they fit the brand. The top five are
core: the verse as a hub of everything that touches it; layers labeled by
authority; the church on this verse, in the order the centuries read it;
honest uncertainty (two dating schemes, confidence in places); and questions as
the doorway into a chapter.

---

## 1. The products

### 1.1 Sefaria (sefaria.org; open source, read in code)

**Who it serves.** A free, open library of Jewish texts for learners at every
level, from the curious to rabbis and teachers who build lessons ("source
sheets") on it. Sefaria's own help pages address individual learners and
educators; its code carries educator-facing modules ("Study Companion,"
"Create a Sheet"). In early 2026 Sefaria split into three spaces: the Library
(canonical texts), **Voices on Sefaria** (user-made sheets and the sheet
editor), and Developers. Library search now returns only books "from the
digital stacks, without any user-created content" (Sefaria educator newsletter,
February 2026, reached through search).

**Information architecture.** A header with Texts and Explore (the July 2021
redesign renamed Topics to Explore; Sefaria's own timeline says the 2021
redesign "lines the library with explanatory text"). Texts is a shelf of
categories (Tanakh, Mishnah, Talmud, Midrash, Halakhah, and on), and each
category page opens with a description (`TextCategoryPage.jsx`, `categoryDescription`
from `enDesc` and `enShortDesc`). Each book has an "About this text" box with
author, description, and a "Composed: place date" line (`AboutBox.jsx` lines
160 to 195). A side column on index pages is built from small, typed modules
(`NavSidebar.jsx`): "Weekly Torah Portion," "Daily learning" (Daf Yomi),
"Learning Schedules," "About Topics," "Related Topics," "Visualizations,"
"Study Companion," "Recently Viewed," and fundraising modules ("Support Sefaria,"
"Sponsor a Day"). A reader finds things by search (with `#` jumping straight to
a topic page), by browsing the shelves, by topic pages (5,400+, per Sefaria),
or from any passage outward.

**Signature features and the interactions behind them.**

- *The connections panel.* Clicking any passage opens a side panel
  (`ConnectionsPanel.jsx`). Its default "Resources" mode has three sections in
  this order: top tools ("About this Text," "Table of Contents," "Search in this
  Text," "Translations" with a count, and, where one exists, an experimental
  "Guided Learning"); **Related Texts** (commentary, Midrash, Halakhah and so on,
  each category with a count, collapsible behind "More" and "See Less"); then
  **Resources** (Sheets, Web Pages, Topics, Manuscripts, Torah Readings, each
  with a count and hidden when zero); then **Tools** ("Add to Sheet,"
  "Dictionaries," "Compare Text," "Notes," "Share," "Feedback," "Advanced").
  Selecting words switches the panel to the lexicon. The panel's mode is written
  into the URL (`urlConnectionsMode`), so a reader can send someone straight to
  "the sheets that cite this verse." The help center describes the same flow:
  click a passage, scroll to Related Texts, pick a category.
- *Guided Learning (experimental).* `GuideBox.jsx` shows "Key Questions" for a
  passage; each question lists how many commentary answers it has; choosing one
  shows short summaries of what each commentator says, each opening the
  commentary itself. Summaries carry an AI notice (`AiInfoTooltip`). A related
  overlay (`GuideOverlay.jsx`) pages through cards with a title, optional video,
  and text.
- *Topic pages.* `TopicPage.jsx` builds tabs from data: "Notable Sources,"
  "Sources" (all), and "Sheets," with sort options "Relevance" and
  "Chronological" for sources ("Relevance," "Views," "Newest" for sheets), a
  filter, and a source/translation toggle. Author topics add "Works on Sefaria."
  A side column shows "Lived" (period and year range) and "Learn More"
  (Wikipedia, the Jewish Encyclopedia, the National Library of Israel). Sefaria
  says topic relevance is driven by the *Aspaklaria*, a 30-volume index of
  Jewish texts, so the curation rests on a human reference work, not on clicks.
- *Source sheets.* Users build lessons from blocks: a "Source" from the library
  (by typing a reference or browsing), outside "Text," "Comment," and media; the
  sheet autosaves after the first save; sheets can be exported to Google Docs
  (`SheetOptions.jsx`); every public sheet is attached to the passages it cites,
  so a verse page can say "these 40 sheets use this verse" (`SheetsWithRefPage.jsx`).
  Adding to a sheet works from inside the reader ("Add to Sheet") as well as
  inside the editor.
- *Learning schedules.* `CalendarsPage.jsx` lists the shared cycles: Parashat
  Hashavua and Haftarah, Daf Yomi (the whole Babylonian Talmud, a page a day, in
  a cycle of about seven and a half years), Daily Mishnah, Daily Rambam, Daf a
  Week, Halakhah Yomit, Tanakh Yomi, and more. The weekly portion appears as a
  small module on index pages, and a "Weekly Parashah Study Companion" email is
  offered beside it.
- *Reader settings.* `ReaderDisplayOptionsMenu.jsx`: source, translation, or
  both; side by side or stacked (side by side is hidden below 600 px when both
  languages are on); continuous or segmented; vowels and cantillation; Torah
  reading divisions.
- *Visualizations.* `explore.js` and `timeline.js` are d3 pages: "Tanakh &
  Talmud," "Talmud & Mishneh Torah," and similar link maps between corpora.
- *The Linker.* A script any website can embed (or a bookmarklet a reader can
  run) that finds Jewish text citations on the page, links them, and optionally
  shows the text in a popup; linking sites then appear in Sefaria's own sidebar
  for that passage. Sefaria lists over 150 sites using it (developer docs).

**Visual and typographic choices.** Read from the CSS: the text in a serif
(Adobe Garamond Pro, falling back to Crimson Text and Georgia; Taamey Frank for
Hebrew), the interface in a sans (Roboto; Heebo for Hebrew). Each genre has a
color used as a thin line above its section and on its cards: Tanakh a deep
teal (`--tanakh-teal`), Talmud a gold, Commentary a blue, Midrash a green,
sheets another green (`color-palette.css`, `RainbowLine.jsx`). The color is a
wayfinding code: a reader learns that the gold line means Talmud.

**How it holds attention and builds habit.** By the shared calendar (a page a
day that thousands of others are on the same day, a portion a week that the
whole community reads), by the endless but meaningful outward links from every
passage, and by letting teachers make and share their own lessons. It has
fundraising modules and a "Trending Topics" list; no streaks were found in the
code read.

**Excellent and stealable.** The passage as hub, with counts that are
information, not applause; the panel state in the URL; topic pages that sort
sources by relevance or by time; the about-this-text box with when and where;
the shared reading calendar; sheets attached to the passages they cite; the
separation of the library from user voices.

**Weak.** The connections panel is crowded: twenty-odd buttons across tools,
resources, and administration, including "Share on X" and "Feedback," compete
with the commentary. Notes and "Add to Sheet" open a sign-up modal for a reader
without an account (`toggleSignUpModal`). "Trending Topics" and sheet sorting by
"Views" import popularity into a library. The AI-summarized Guided Learning is
labeled, but it moves toward summary in place of reading.

### 1.2 Perseus Digital Library and the Scaife Viewer (open source, read in code)

**Who it serves.** Students and scholars of Greek and Latin; the Scaife Viewer
is "the first installment of Perseus 5.0" and is meant to replace the older
Perseus Hopper interface (Sansom's review for the Society for Classical
Studies, March 2019).

**Information architecture.** A library of "Text Groups" and "Works," each work
in one or more "Versions," each passage addressed by a CTS URN, a permanent
citation identifier (`static/*.vue`: `Library.vue`, `CTSTocList.vue`,
`CTSVersionList.vue`, "CTS URN" labels). The reader sits in the middle; widgets
sit in collapsible sidebars, finding your place on the left and presentation and
information on the right (Sansom).

**Signature features.** The frontend is a set of interchangeable **reader
modes** (packages `reader-interlinear-mode`, `reader-alignments-mode`,
`reader-commentaries-mode`, `reader-named-entities-mode` with an entity map,
`reader-metrical-mode`, `reader-syntax-trees-mode`, `reader-image-mode`) and
**widgets** (`widget-word-list`, `widget-morphology`, `widget-passage-lemma-traversal`
"to [find] passages sharing the selected lemma," `widget-scholia`,
`widget-commentary`, `widget-passage-ancestors`, `-children`, `-siblings`,
`widget-text-size`, `widget-text-width`, `widget-attributions`, "Export
Passage"). The word list widget shows the vocabulary of the passage on screen,
each word with a short definition and, in parentheses, its "frequency per 10k in
this work" (`WordList.vue`). The attributions widget lists, by role, the people
and institutions who prepared the text. Clicking a word gives its morphology and
a short definition from Logeion; a translation can run in parallel (Sansom; a
2019 overview). Perseus's older Vocabulary Tool reported frequencies,
key-term scores, and short definitions; the Greek front end at
vocab.perseus.org adds flashcards.

**Visual choices.** Sansom's review praises what was removed: "floating text
boxes, the blurry title card, and the cluttered browsing bars"; readers can
collapse both sidebars "and read undeterred."

**Attention and habit.** None engineered. It holds a reader by getting out of
the way and answering every word on demand.

**Stealable.** Reading modes on one surface; the passage word list; "where else
does this word occur"; text width as a setting; attributions by role; permanent
citation addresses.

**Weak.** No apparatus criticus (Sansom's one complaint): the reader cannot see
where the manuscripts differ. The automatic parsing sometimes contradicts the
hand-made notes of scholarly commentaries (Dickinson College Commentaries blog,
2012, on the Hopper tool).

### 1.3 Logos Bible Software: Factbook, Bible Word Study, the Guides

**Who it serves.** Pastors, students, and scholars with a paid library; what a
reader sees depends on the package owned ("The available Guides and sections
depend on your Logos/Verbum base packages," and sections without data appear
grayed out, per the Logos wiki and forum). Releases ship every six weeks.

**Information architecture.** Not a site but a set of **guides** that assemble
the user's library around a question: the **Passage Guide** (commentaries,
cross-references, parallel passages), the **Exegetical Guide** (the original
words, textual variants, grammatical constructions, linking onward to word
studies), the **Topic Guide** (dictionary articles, "Key Passages," tagged
sermons), the **Sermon Starter Guide** (key passages, related pericopes,
quotations, illustrations, thematic outlines, figurative language), the **Bible
Word Study** guide, and **Factbook**, the general starting point.

**Signature features.**

- *Factbook.* Looks up people, places, concepts, passages, Greek and Hebrew
  lemmas and word senses, manuscripts, authors, and resources. Logos's own
  advice: start with the Key Article for a quick summary, then click through. A
  passage article opens with the biblical text and then sections that link to
  other Factbook articles, commentaries, and a "Dig Deeper" section that opens
  the Exegetical Guide. In Logos 46 (November 2025) Factbook began showing
  **suggested questions** on a topic ("How have theologians understood this
  concept over time?"), with answers "with citations" from the user's library;
  these reached mobile in December 2025.
- *Bible Word Study.* Sections named Lemma, Translation, Root, Senses,
  Preposition Use, and Septuagint Translation. The Lemma section shows a
  **translation ring** (how the word is rendered across a chosen range; hover
  for a preview, click to open the full Translation section), a transliteration,
  a gloss, and a **frequency sparkline**. The Senses ring, driven by the Bible
  Sense Lexicon, puts the lemma at the center and its senses around it with
  counts ("3 of 11"). Results can be redrawn as bar, pie, donut, or line charts.

**Attention and habit.** Depth and the sunk cost of a library; not engineered
habit.

**Stealable.** The suggested question as a doorway into a topic; the
translation ring (a picture of how one word became many English words); the
frequency sparkline; the passage article that begins with the text and branches.

**Weak.** Expensive and package-gated; the gray, empty sections tell a reader
what he cannot have. Built for preparation, not formation.

### 1.4 Accordance

**Who it serves.** Pastors, students, and scholars, historically on the Mac;
paid modules.

**Signature features (from Accordance's help files and reviews).**

- *Info Pane* (version 11): beside the text, the covers of the first five
  commentaries that comment on the verse at the top of the window; it updates
  as the reader scrolls. A later user describes it showing pericope boundaries,
  themes, and cross-references.
- *Instant Details:* hovering a tagged word shows parsing, definition, grammar,
  cross-references, or footnotes. A Themelios reviewer found a cross-reference
  that opened the wrong passage (Rev 11:11's allusion to Ezek 37:5 opening Ezra
  10:5), a reminder that a link that lies is worse than no link.
- *Research tab* (version 11): background searches across the whole library,
  grouped by library category.
- *Timeline:* more than 3,000 periods, people, and events across 13 regions;
  the reader chooses regions and **"the scheme of dates."** The help page
  "Understanding Conservative vs. Critical Dates" explains the two schemes: the
  conservative takes biblical chronology at face value; the critical "takes the
  Bible's account of history as generally trustworthy, but not necessarily
  accurate in every detail." Its example: the Exodus at 1446 BC (conservative)
  or about 1250 BC under Rameses II (critical). An older supplement describes
  clicking a point in time to get a report of everything happening then.
- *Bible Atlas:* layers over a base map (sites, roads, regions, routes), custom
  layers, a 3D fly-over, animated journeys. A separate purchase; not on mobile.

**Stealable.** The dating-scheme switch, which is the most honest single
interface choice found in this research; the commentary pane that follows the
reader's position; "what was happening in the world at this moment."

**Weak.** Paid, desktop-centered, module-gated; the hover-heavy interaction does
not survive a phone.

### 1.5 Theographic Bible Metadata (open data, read in the repository)

**Who it serves.** Developers, "Bible students," and "visual storytellers"
(its readme); it powers the visual work at viz.bible (for example an
interactive "Divisions of the Bible" picker).

**What it is.** A knowledge graph in which every verse of the KJV (1769) is
linked to the people, places, events, and Easton's Bible Dictionary entries it
mentions: 3,067 people, 1,298 places with coordinates, 450 events with dates,
durations, predecessors, participants, and locations, 23 people groups, 6,519
Easton entries; JSON, CSV, GeoJSON (including Paul's journeys), Neo4j scripts,
and a GraphQL API (`readme.md`). Counted in `json/people.json`: 1,584 people have
a father, 963 have children, 944 siblings, 200 a mother, 173 partners; only 70
have a birth year and 61 a death year.

**Critical caveats found in the data.**

- *One chronology, stated as fact.* `docs/chronology-and-dates.md`: events and
  people follow Floyd Nolen Jones, who "builds on Archbishop James Ussher's
  *Annals of the World*" and "works only from the biblical text": Creation 4004
  BC, the Flood 2348 BC, the Exodus 1491 BC. There is no second scheme. A
  skeptic who meets "Creation, 4004 BC" on a LiveWell card will close the tab,
  and a doubting Christian will be handed a certainty the church never required.
- *License.* The repository says CC BY-SA 4.0 (share-alike, which would bind
  LiveWell's derived data); an older Notion "About" page says CC BY 4.0. The
  repository is current and governs.
- *Dated and partial sources.* Easton's dictionary is from 1897; person records
  carry a `status` field, often `"wip"`. Its own bibliography credits STEPBible's
  **TIPNR** (proper names with all references, CC BY 4.0), the same provider
  LiveWell already credits.

**Stealable.** The shape: every verse knows its people, places, and events, and
every person knows their verses and family. **Not stealable as is:** the
chronology and the share-alike data. Build LiveWell's biblical people and places
from STEPBible's TIPNR and OpenBible's geocoding (both CC BY), and date them the
Accordance way.

### 1.6 OpenBible.info: cross-references and the Bible atlas (data read in the repository)

**Who it serves.** Developers and readers; its data sits under many Bible tools,
including LiveWell's own cross-references.

**Cross-references.** More than 340,000 connections extending R. A. Torrey's
*Treasury of Scripture Knowledge* (public domain), scored by community votes;
CC BY 4.0. A downstream developer filters to at least 3 votes and the top 10 per
verse (secondary; the vote method itself was not seen).

**The atlas (Bible-Geocoding-Data).** "Attempts to catalog the location of every
identifiable place mentioned in the Protestant Bible," drawing on more than
seventy modern sources (commentaries, dictionaries, encyclopedias, atlases) with
over 400 cited, and "the confidence in the identification of that place"
(`readme.md`). Each identification carries vote tags aggregated from those
sources: `confidence_yes` ("no substantial doubt"), `likely`, `mostlikely`,
`possible`, `unlikely`, `no`, and `map` (placed from a map, not a text); how the
sources phrased it ("is identified," "has been identified"); modifiers such as
"near," "along," "on"; an approximate radius of uncertainty for regions; how ten
English translations name the place; Wikidata links; a thumbnail image for every
location. CC BY 4.0. BYU's *Scriptures, Mapped*, built on this data, warns that
many identifications are speculative.

**Stealable.** Confidence as a first-class field, shown to the reader; the
radius of uncertainty instead of a false pin.

**Weak.** The older topical Bible was built by mining web search results for
verse references (a 2011 review), so it measures what people say the Bible says.

### 1.7 BiblicalTraining.org

**Who it serves.** Christians who want seminary-level teaching free; churches
that want a discipleship track. Donor-funded; certificates cost a fee; no
degrees (credit through Okanagan Bible College).

**Information architecture.** Classes at four levels plus a leadership track:
**Basics** (for people who have never studied the Bible), **Foundations** (nine
classes, about 70 hours, framed for churches as a nine-month discipleship
program), **Academy** (nine classes, about 120 hours, "about two years at two
hours a week"), **Institute** (the nine core seminary classes, taught by
professors from 18 schools), and **Leadership** (for vetting and training elders
and lay leaders). Class pages list a description, the professor's biography, and
lessons, each with a progress indicator. Groups are told to listen alone and use
group time to discuss and apply.

**Stealable.** Levels named by readiness, with the hours stated honestly; a
church track; position shown per lesson.

**Weak.** Lecture audio and video at length, mostly one professor per class; the
reading surface is not the product. Lesson-level features (transcripts,
quizzes) were not seen.

### 1.8 Precept Austin (preceptaustin.org)

**Who it serves.** Bible teachers preparing a lesson, often in the inductive
method. Its study tools include Greek and Hebrew word studies, a guide to
inductive study (observation, interpretation, application), and a Greek quick
reference.

**Information architecture.** By book: a "Commentaries" page with a "Verse By
Verse" section by chapter (sometimes by single verse, for example a Galatians
5:22 page) and a "Miscellaneous" section of older material (Spurgeon, Maclaren).
Its own pages say the commentary is "revised and updated almost daily," the
Greek word studies several times a week, and the site held "over 20,000 pages"
as of 2023; some chapters are marked "Under Construction," and its old index has
been "dormant" for years.

**Stealable.** The instinct that a verse deserves a page of everything the
church has said about it.

**Weak.** Aggregation without editing: twenty thousand pages, unfinished
sections, an abandoned index. It is the cautionary case for pattern 3 below:
the church's voice must be chosen, dated, and verified, not piled.

### 1.9 Enduring Word (enduringword.com)

**Who it serves.** Bible teachers and readers who want plain, warm,
verse-by-verse exposition. David Guzik's commentary is free online, "organized
chapter by chapter," and outlined verse by verse "from Genesis to Revelation";
translated into about fifteen languages (Spanish, Portuguese, Arabic, Persian,
Chinese, Tamil, Kiswahili, Russian, and others); a Media menu (audio and video,
radio, podcasts, a weekly devotional); an app; paid print, Logos, Mantis, and
Kindle editions. The site says these resources have been online "for more than
30 years" and "always completely free." A user-review summary praises it as
"thorough, cross-referenced, understandable" with "quotes from other Christian
leaders."

**Stealable.** One voice through the whole canon, free, in many languages;
the chapter outline as the reader's map.

**Weak (as seen).** One teacher's reading, without the steelman of the other
side; how it cites the older voices it quotes was not visible.

### 1.10 Added: Quran.com (open source, read in code)

Added because it is the most refined religious-text reader found, and its code
is public.

**Who it serves.** Muslims reading and studying the Qur'an in many languages.

**Signature features (UI strings in `locales/en/*.json`, components, and the
product-update pages).**

- *Two reading modes:* an Arabic reading view and, since January 16, 2026, a
  **Translation Reading Mode** that shows the translation "in a continuous,
  book-style layout."
- *Study Mode* (January 22, 2026), a modal with tabs (`StudyModeBodyTabs.tsx`):
  **Tafsirs** (the classical commentaries), **Lessons**, **Reflections**,
  **Answers** (curated "Questions," each with "Summary," "Clarification," and
  "Tafsir"), **Related verses**, **Layers**, **Qiraat** (the variant readings),
  and, from February 10, 2026, **Hadith**.
- *Every layer says what it is.* "Lessons are informed insights from scholars
  and seekers of knowledge, distinct from primary sources such as Tafsir (the
  scholarly interpretation of the Quran)." "Reflections are personal
  perspectives (reviewed for quality) and should not be taken as
  authoritative." "Only hadith that explicitly reference Quranic verses are
  included, and this selection is not exhaustive." When a layer is empty it says
  so: "There are no reviewed reflections for this ayah."
- *Layered translation* (`tabs/StudyModeLayersTab`): a verse is split into
  phrase groups; each group can show "Alternative Translations" and "Read
  Explanation"; the whole can be expanded or contracted ("Expand Tafsir,"
  "Contract Tafsir") so a reader sees the bare translation or the translation
  with its interpretive fill.
- *Word by word:* translation, transliteration, and recitation for each word.
- *Pin and Compare:* "Pin verse," "Pin all verses," "Compare," "Save pinned to
  collection," "Load from collection"; a pinned-verses bar follows the reader.
- *Revelation order:* the reader can read in order of revelation instead of
  canonical order, with a notice to switch back.
- *Surah info:* revelation place (Mecca or Medina).

**Attention and habit.** Here it crosses LiveWell's line. Reading goals with
"Day streak," "Track Streaks, Create Custom Goals, Stay Consistent," "Goal
Completed! 🎉"; end-of-chapter prompts to "Set a Goal"; learning-plan banners
inside the reader; sign-in prompts to "Save Your Progress"; flashcards to "mark
words as mastered"; fundraising and donate pop-up components.

**Stealable.** The authority labels; layered translation; pin and compare;
Answers per verse; a read-like-a-book mode beside the study mode; alternate
reading orders. **Not stealable:** the streak and goal machinery.

### 1.11 Added: the Dartmouth Dante Project and Dante Lab

**Who it serves.** Students and scholars of Dante. Begun 1982 to 1988, the
Project puts the full text of more than 75 commentaries on the *Commedia* into
a searchable database, from 1321 to Nicola Fosca (2003 to 2015), searchable by
line. **Dante Lab** lets a reader "read and compare up to four texts" at once
(the critical edition, Longfellow's 1867 translation, the commentaries) and was
"modeled on the 'analogue' workspace of the professional Dantista": poem, early
commentaries, and concordance side by side. A scholarly assessment calls both
vital but aging.

**Stealable.** Seven centuries of readers under a single line, in date order;
a four-up comparison desk. This is the closest analogue to what the church's
reading of Scripture looks like, and no Bible site seen does it with verified,
dated, primary text.

### 1.12 Also seen: NET Bible notes, STEPBible, Bible Odyssey, the cross-reference arcs

- **NET Bible.** 60,932 translators' notes, each typed by an abbreviation:
  **tn** (translator's note: why this rendering, and the alternatives), **sn**
  (study note: background, context, theology), **tc** (text-critical note:
  manuscript variants), and map notes. The type is stated before the note.
- **STEPBible** (Tyndale House, Cambridge; free, no ads). Built for "people
  without theological or biblical-language training"; any word's original,
  definition, and every other place it is used; word clouds that "track themes
  as they unfold in a book"; 58 English translations compared in columns or line
  by line; hovering a word shows the original and other translations of it in
  the same passage. LiveWell already uses its data.
- **Bible Odyssey** (Society of Biblical Literature, NEH-supported, launched
  2014). Organized by **people, places, and passages**; short essays by
  scholars; art, short videos, maps, interactive timelines; an "Ask a Scholar"
  service; three or four new articles a month; academic rather than devotional.
- **Chris Harrison and Christoph Römhild's cross-reference arcs (2007).** Each
  of 63,779 cross-references drawn as one arc above a bar chart of every
  chapter (bar length by verse count), colored by the distance between the two
  chapters. Harrison says they aimed for something "more beautiful than
  functional," since study software already did the function. Widely shared;
  copyrighted.

---

## 2. The patterns, ranked

Fit: **core** (LiveWell should not ship the redesign without it), **strong**
(clearly right, schedule it), **maybe** (good if there is room). Effort: **S**
(days, mostly data or copy on existing components), **M** (a unit of one to two
weeks), **L** (a multi-unit build or sustained content work).

Every pattern below obeys `MASTER-PLAN.md` section 2: shareable state in the
URL, personal state on the device through `lib/storage.ts`, no accounts, no
scores, no chart or map library, tokens only, one translation per page.

### 1. The verse as a hub: everything on LiveWell that touches this verse

*Seen in:* Sefaria's connections panel (counts by kind, panel mode in the URL,
sheets-with-ref); the Sefaria Linker (links run both ways); Accordance's Info
Pane; Logos's Passage Guide and Factbook passage article.

*What it is.* Tap a verse and see, counted and grouped, every place the library
connects to it, with the panel's state in the address.

*Why it works.* It turns a library into a web from any point. The count is
information ("3 essays cite this verse") that tells the reader whether a door is
worth opening, and it shows the depth of the place without a word of promotion.

*On LiveWell.* In the Study Bible, tapping verse 16 of John 3 opens the study
panel as today, with a new first block, **On LiveWell**, listing only rows that
exist: *Study note*; *Cross-references (12)*; *The church on this verse (4)*
(pattern 3); *Questions it raises (2)* (pattern 5); *Essays that cite it (3)*;
*At the table (1 family devotion)*; *In the creeds (Nicene Creed, "for us and for
our salvation")*; *Doctrines (Love of God, Atonement)*; *Topics (1)*. Each row
opens in place. The data is a generated **inbound citation index**:
`scripts/build-verse-index.mjs` runs the U09 reference parser over every essay,
devotion, plan, context guide, creed annotation, Honest Answer, history session,
and source card, and writes `client/public/bible/refs/<book>/<chapter>.json`
(verse number to a list of `{kind, id, title, href}`), with a `--check` drift
gate in CI (the `build-story-plan.mjs` precedent). The panel's state goes in the
URL (`/study/bible/john/3?panel=church#v16`) so a pastor can send "what the
church said about John 3:16" as a link. This replaces the chapter-level "Go
deeper on LiveWell" search (six fuzzy matches) with exact, complete citations.
The reverse also holds: every `VerseRef` sheet (U16) gains one line, "Cited in 3
other places on LiveWell." Keep the panel to the rows LiveWell actually has;
Sefaria's twenty buttons are the warning.

*Fit:* core. *Effort:* M (index script, panel block; depends on U09 and U16).

### 2. Layers labeled by authority: who is speaking, and how much weight it bears

*Seen in:* Quran.com's Study Mode disclaimers ("distinct from primary sources";
"personal perspectives ... should not be taken as authoritative"; "not
exhaustive"; "There are no reviewed reflections for this ayah"); Sefaria's 2026
split of the Library from Voices; the NET Bible's typed notes (tn, sn, tc);
Scaife's attributions widget.

*What it is.* Every block of study content says what kind of thing it is before
the reader reads it.

*Why it works.* The skeptic's first question of any religious site is "who is
telling me this, and are they passing their opinion off as the text?" Labels
answer it before it is asked. They also protect Scripture from being blurred
with commentary, which is the integrity rule of CLAUDE.md in interface form.

*On LiveWell.* Five labels, set as small Inter caps over a hairline rule (no
color coding; mustard stays punctuation), used site-wide in the same words:
**Scripture** (with the translation named), **The church's witness** (a dated,
verbatim primary source with its source card), **Study note** (LiveWell's
editorial notes, typed further as *What the words say*, *What the first readers
heard*, *Where the manuscripts differ* (the data already flags "Differs between
Greek editions"), *How it fits the whole Bible*), **James Bell** (his essays and
signed judgments, so his voice is never mistaken for the text), and **Your notes
(on this device)**. Empty layers say so plainly ("No source from the early
church is recorded for this verse yet"). The study panel's existing subject
filters ("Hebrew and Greek," "History," "Doctrine") stay; the authority label is
a second, always-visible axis. A validator (`validate-scripture.mjs` or a small
new one) requires every block in the Bible notes and session JSON to carry a
`kind`.

*Fit:* core. *Effort:* S (labels and a `kind` field on existing data).

### 3. The church on this verse, in the order the centuries read it

*Seen in:* the Dartmouth Dante Project (75+ commentaries, 1321 to 2015, by
line) and Dante Lab; Sefaria's commentary groups and its topic sort by
"Chronological"; Accordance's Info Pane; Precept Austin and Enduring Word,
which gather older voices without (as far as could be seen) dating and
verifying them.

*What it is.* Under a verse, a short run of verbatim excerpts from the church's
readers across time, oldest first, each dated and sourced.

*Why it works.* It is LiveWell's thesis made visible: the reader watches
Irenaeus, Augustine, Luther, Calvin, Wesley, and a nineteenth-century Black
preacher read the same sentence, and sees both the continuity and the
disagreements. It makes the reader "more rooted" (the Formation Test) without a
lecture, and it answers the skeptic's suspicion that modern Christians invented
their reading last Tuesday.

*On LiveWell.* A **The church on this verse** strip in the study panel and at
the foot of the chapter notes: three to five excerpts, each a source card
(author, work, date, translator, public-domain basis, "read more of this
source"), sorted by date with a thin time rule showing the gaps, and where the
readers genuinely disagree, a one-line note that says so and which order of
question it is. Built on the history registry's `sources.json` and the U07
`verify-sources.mjs` gate: every excerpt must be a normalized substring of a
stored public-domain text, so not one quotation is invented. Start where it
matters most and the sources reach: the verses the creeds rest on, the ten
"verses everyone quotes" context guides, and the passages the Part I and II
history sessions already quote (the ANF and NPNF texts the plan can reach).
This is also the Bible-side door into the church history course: each card links
to the session where that writer appears.

*Fit:* core. *Effort:* L (content, gated by U07 and U30; the UI is M).

### 4. Honest uncertainty: two dating schemes, and how sure we are of a place

*Seen in:* Accordance's Timeline ("Conservative" and "Critical" schemes; the
Exodus at 1446 BC or about 1250 BC); OpenBible's atlas (confidence from
"no substantial doubt" to "unlikely," built from 70+ sources, with a radius of
uncertainty); and, as the counterexample, Theographic's single Ussher and Jones
chronology (Creation 4004 BC) stored as fact.

*What it is.* Wherever scholarship disagrees about a date or a location, the
interface shows the range and says why, instead of one confident number or pin.

*Why it works.* It is the Scholarship Standard ("sort by how much it actually
matters") in a single line of interface. The skeptic sees that LiveWell is not
hiding the hard parts; the doubting Christian learns that the faith does not
stand or fall on 1446 versus 1260.

*On LiveWell.* In the Study Bible's book introductions and the eleven-act story
(`story.json`), in history and Bible timelines, and on place cards: a date line
such as "The Exodus: about 1446 BC on the early dating; about 1260 BC on the
late dating," with a "Why two dates?" disclosure (two sentences each, the
strongest form of each case, and "a second-order question: faithful Christians
hold both"). Primeval events carry no year at all. Places show "Location:
certain," "likely," or "disputed (3 proposals)," derived from OpenBible's vote
tags, with the proposals listed. A data rule in the validator: any date field on
a pre-monarchy event requires either `range` or `schemes`. Never import
Theographic dates.

*Fit:* core. *Effort:* S to M (data fields, a small disclosure component,
content for about thirty contested dates).

### 5. Questions as the doorway into a chapter

*Seen in:* Sefaria's Guided Learning ("Key Questions," each with a count of
answers that open the commentaries); Quran.com's Answers tab ("Questions," each
with "Summary," "Clarification," "Tafsir"); Logos Factbook's suggested
questions (November 2025).

*What it is.* A passage opens with the questions a real reader brings to it,
each leading to a short answer and onward to the sources.

*Why it works.* People arrive with a question, not a curriculum. Starting from
the question meets the reader where he already is (symptom), then hands him the
text and the church's reading (cause and wisdom). It is also the honest form of
what the AI products do: curated, signed, and sourced, with no machine guessing.

*On LiveWell.* At the top of the chapter notes, under the chapter title, two to
four **Questions this chapter raises**, the skeptic's first: on Exodus 9, "Why
does God harden Pharaoh's heart?"; on John 3, "What does 'born again' actually
mean?"; on Joshua 6, "Is this genocide?" Each opens in place: a 120 to 200-word
answer in the study-note register that quotes the verse, concedes what is true
in the objection, and points to the church strip (pattern 3), the context guide,
and the Honest Answer or essay that goes further. Questions are content in the
chapter note JSON (`questions[]`), written and reviewed like any note, and they
feed the topics index (U25) as rows in the reader's own words. No AI.

*Fit:* core. *Effort:* M (component S; content for the 150 most-read chapters is
the work).

### 6. The study sheet: gather, arrange, print, hand out

*Seen in:* Sefaria's source sheets (Source, Text, Comment, and media blocks;
"Add to Sheet" from the reader; autosave; export to Google Docs; sheets attached
to the passages they cite); Quran.com's collections.

*What it is.* A reader builds a one- or two-page study from pieces of the
library and his own words, then prints or shares it.

*Why it works.* It turns reading into making, which is how teachers learn, and
it serves the pastor audience directly: a Sunday-school handout or a small-group
sheet in ten minutes. For Sefaria, sheets became a whole second publication.

*On LiveWell.* Every verse panel, source card, study note, and essay pull-quote
gets **Add to my sheet**. `/study/sheet` assembles the blocks in order: passage
(with the translation named), source card, LiveWell note, the reader's own
comment, a discussion question; reorder by drag or up and down buttons; a title.
Stored on the device (`livewell-sheet-*` through `lib/storage.ts`), with the
standard save-failure message. **Print** produces a clean handout through a
print stylesheet (cream becomes white paper; Cormorant titles; the Crossway
notice where ESV is quoted). **Share** encodes the sheet as references and ids in
the URL, so a recipient opens the same sheet with no server and no account. No
public gallery (that needs accounts and moderation); instead, LiveWell publishes
a few **sheets by LiveWell** as starters (for example "Romans 13 and Revelation
13 side by side," "What the early church said about the poor"). Reuses
`TakeItWithYou`.

*Fit:* strong. *Effort:* M to L.

### 7. Pin and compare: up to four texts, side by side

*Seen in:* Quran.com's "Pin & Compare" and pinned-verses bar; Dante Lab (four
texts at once, modeled on the scholar's desk); Sefaria's "Compare Text" panel;
STEPBible (columns or line by line).

*What it is.* The reader pins passages or sources as he reads, then opens them
together.

*Why it works.* Comparison is where understanding happens: an Old Testament
promise beside its New Testament quotation, Mark beside Matthew, the creed of
325 beside 381. It needs no new content; it reuses what is there.

*On LiveWell.* A **Pin** action on every verse and source card; a quiet bar at
the foot of the screen ("2 pinned · Compare"); `/study/compare?p=isa.53.4-6,matt.8.17`
opens them in columns on a wide screen and stacked with section labels on a
phone (Sefaria's rule: no side-by-side under 600 px). Starter links built in where
the data already exists: the "Parallel accounts" in the Study Bible notes open as
a compare view in one tap; the creeds comparison planned in U44 uses the same
view. "Save as a sheet" hands the pins to pattern 6. Pins live on the device.

*Fit:* strong. *Effort:* M.

### 8. Reading modes on one quiet surface

*Seen in:* the Scaife Viewer's reader modes and collapsible widgets (praised for
what it removed); Quran.com's Translation Reading Mode ("read like a book") beside
Study Mode; Sefaria's layout settings (stacked or beside, continuous or
segmented).

*What it is.* One page, several ways to see it, and the default is the quietest.

*Why it works.* It serves the unhurried reader and the student with the same
text, and it lets the page be calm by default ("Unhurried. Weighted. Grown-up.")
while the instruments wait one tap away.

*On LiveWell.* The Study Bible's two modes become four, in a segmented control
remembered on the device: **Read** (no verse numbers in the line, paragraphs and
section headings, Cormorant at reading size, 68ch, the way a reader's edition
looks; the default for arrivals from Home and the 2027 story plan), **Study**
(verse numbers tappable, the panel, today's reading mode), **Hebrew/Greek**
(today's interlinear), and **People and places** (the names in the chapter
quietly underlined, each opening its card; pattern 11). A text-size and
line-width setting (Scaife's widgets) in the same menu. Mode goes in the URL when
shared (`?mode=read`).

*Fit:* strong. *Effort:* S to M (Read mode is mostly typography over existing
data; People and places waits on pattern 11).

### 9. Key words in this passage, and one word across the whole Bible

*Seen in:* the Scaife word list ("frequency per 10k in this work"); Perseus's
vocabulary tool; Logos's Bible Word Study (translation ring, frequency
sparkline, senses with counts); STEPBible (where else the word is used, word
clouds by book); Scaife's lemma traversal.

*What it is.* Before or beside a chapter, the handful of words that carry its
weight, each with what it means, how often it occurs, and where.

*Why it works.* Most readers will never learn Greek, but they can learn that
John 3 turns on a word that means both "again" and "from above," and see where
else John uses it. It gives the "aha" of the original languages without the
apparatus, and it draws attention honestly: the discovery is in the text.

*On LiveWell.* At the head of the chapter notes, **Key words**: three to six
lemmas chosen by the note writer (not machine-picked), each a chip with the
transliteration, a one-line gloss, the count in this book and in the Bible (from
the lexicon's existing `n` and `r` data), a hairline **distribution strip** of
66 ticks (one per book, drawn as inline SVG at build time, no chart library),
and "Translated as: born again (ESV), born from above (NRSV)" where the
difference matters. Tapping a chip opens the existing lexicon sheet with a new
"Every occurrence, by book" list that opens each verse. Note: the plan parks
"how often this word occurs" (10.7); this proposes a small, curated version
after Lent, and James decides.

*Fit:* strong. *Effort:* M.

### 10. Where the English had to choose: translation layers on the hard verses

*Seen in:* Quran.com's Layers (phrase groups, "Alternative Translations,"
"Read Explanation," expand and contract); the NET Bible's translator's notes;
Sefaria's Translations panel with a count.

*What it is.* On a verse where translation is interpretation, the disputed
phrase is marked; tapping it shows the honest range of renderings and why.

*Why it works.* "The Bible has been mistranslated" is one of the skeptic's
standing objections, and the doubting Christian has often been told there is
nothing to see. Showing the choice, with its reasons, defuses both: the reader
learns that translators argue in the open and that the disagreement is usually
smaller than rumor.

*On LiveWell.* On about fifty verses to start (John 1:5 "overcome" or
"understood"; John 3:3 "again" or "from above"; Romans 3:22 "faith in Jesus
Christ" or "the faithfulness of Jesus Christ"; Isaiah 7:14 "young woman" or
"virgin"; Genesis 1:2 "Spirit of God" or "wind from God"), a faint dotted
underline in Study mode; tap to open **Other ways to render this**: the
renderings (public-domain translations quoted; others described, never quoted
beyond license), a two- to four-sentence explanation of the Hebrew or Greek, and
the order of the question. Typed as a *What the words say* study note (pattern
2), so it needs only a `phrase` anchor added to the note schema.

*Fit:* strong. *Effort:* M (mostly careful content; each entry steelmans both
readings).

### 11. People, places, and events as cards on one registry, from Genesis to now

*Seen in:* Theographic (every verse linked to its people, places, events,
families); the Scaife named-entities mode with an entity map; Sefaria's person
topics ("Lived," "Works on Sefaria"); Logos Factbook; Bible Odyssey's people,
places, passages; OpenBible's atlas.

*What it is.* Every name in the Bible opens a card: who, when (honestly dated),
where (with confidence), family, every scene in order.

*Why it works.* Narrative memory runs on people and places. A card that says
"Nicodemus appears three times: by night (John 3), defending Jesus in the council
(John 7), carrying spices to the tomb (John 19)" teaches more in ten seconds than
a paragraph, and draws the reader into the next scene.

*On LiveWell.* Extend the history registry the plan already builds (U30:
`people.json`, `places.json`, `events.json`) backward into Scripture, so one
registry runs from Abraham to Barmen and the same sheet component serves both.
Seed biblical people and places from STEPBible's TIPNR (CC BY 4.0) and
OpenBible's geocoding (CC BY 4.0), not Theographic (CC BY-SA, Ussher dates).
Cards open as sheets addressed by a query parameter (`?person=nicodemus`), no
new routes (the plan's rule for short entries). In the Study Bible's People and
places mode (pattern 8) names are tappable; each card lists "Where he appears"
in order, each line opening the verse. Pages only for the few with real
teaching (Abraham, Moses, David, Paul), per the plan's 150-word threshold.

*Fit:* strong. *Effort:* L (data import and review; the sheet exists).

### 12. Topic and doctrine pages built from sources, sorted by canon or by time

*Seen in:* Sefaria's topic pages ("Notable Sources," "Sources," "Sheets";
"Relevance" or "Chronological"; "Lived"; "Related"; relevance from the
*Aspaklaria* index); Logos's Topic Guide (dictionary articles, Key Passages)
and Sermon Starter Guide.

*What it is.* A topic page is not an essay about the topic; it is the sources,
curated, which the reader can read in the order of the canon or the order of
history.

*Why it works.* The chronological sort is the quiet revelation: on "the poor,"
the reader sees Deuteronomy, then Amos, then Luke, then Basil of Caesarea, then
Chrysostom, then the Reformers, and realizes the church's concern is older than
any political party. That is the Constitution's final impression ("older than
my culture") delivered by structure.

*On LiveWell.* The doctrine pages (`/study/bible/doctrines/:id`) and the topic
pages (U25) gain a **Sources** section with a two-way switch, *In the Bible's
order* and *In history's order*: key passages (Scripture), then source cards
from the registry, then LiveWell's own writing last and labeled (pattern 2). A
"Related" line at the foot. The switch lives in the URL (`?order=time`). Curated
by hand; no relevance algorithm, no "trending."

*Fit:* strong. *Effort:* M (depends on the registry and the verse index).

### 13. The shared calendar, not the streak

*Seen in:* Sefaria's learning schedules (Daf Yomi, the weekly portion,
Tanakh Yomi), its "Weekly Torah Portion" and "Daily learning" modules, and its
weekly study-companion email; set against Quran.com's "Day streak" and "Goal
Completed! 🎉."

*What it is.* The habit comes from reading what many others are reading this
day or this week, not from a personal count.

*Why it works.* Daf Yomi has kept people in a seven-and-a-half-year cycle with
no badge at all: the motivation is communion with other readers and the
dignity of the text. It is the church's own oldest method (the lectionary, the
daily office) and it costs nothing in integrity.

*On LiveWell.* A **This week** page (`/study/this-week`) and a one-line module on
Home and the Study door: "This week: the story of the Bible, days 302 to 308
(Jeremiah); the catechism, question 43; at the table, *Exile*; the church year,
Advent begins Sunday." Each item opens where it lives (U28 story plan, the
catechism, U17 Tonight, the church-year material). Phrased as a place in a
shared rhythm ("Day 302 of 365"), never as a personal tally. The same content
goes out as a Sunday-night "study companion" letter through Substack, which is
also the pastor's weekly sheet (benchmark gap 9). No streaks, no "you missed a
day."

*Fit:* core. *Effort:* S to M (mostly composition of existing generated
schedules).

### 14. Every shelf explains itself: about this book, about this source

*Seen in:* Sefaria's category descriptions and "About this text" (author,
description, "Composed: place date"); Sefaria's 2021 redesign "lines the library
with explanatory text"; Scaife's attributions by role; Quran.com's surah info
(revelation place); Bible Odyssey's short scholarly essays.

*What it is.* Every book, collection, and source carries a short, consistent
card that says what it is, who made it, when, where, and how to read it.

*Why it works.* It orients a new reader in one glance and quietly answers the
skeptic's provenance questions.

*On LiveWell.* Each Bible book gets an **About this book** card at the head of
its book page and in the study panel: genre and how to read it; written when and
where (both schemes where disputed, pattern 4); authorship, traditional view
and the critical view steelmanned in one sentence each; its place in the
eleven-act story. Each source card and creed carries **Prepared by** with roles
(author, translator, editor, edition, public-domain basis), Scaife's way. Much of
the content exists in book introductions and "To start with"; the work is a
consistent card and the missing fields.

*Fit:* strong. *Effort:* S.

### 15. One beautiful map of the Bible quoting itself, as a door and not a poster

*Seen in:* Harrison and Römhild's 63,779 arcs ("more beautiful than
functional"); Sefaria's Explore link maps between corpora; viz.bible's
"Divisions of the Bible"; STEPBible's word clouds.

*What it is.* A single data drawing that shows the whole Bible's internal
connections, where every mark opens the texts it joins.

*Why it works.* James asked for things that draw attention. This is the one
kind of spectacle that tells the truth: the Bible's unity is visible in the
data, and the reader can test it by tapping any arc.

*On LiveWell.* A page in Study, **How the New Testament quotes the Old**: the 66
books as a baseline of ticks (one per chapter, sized by verses), arcs only for
direct New Testament quotations and clear allusions (a few hundred, curated from
the OpenBible data's NT-to-OT subset and checked, not 340,000), drawn once as
inline SVG by a build script in tokens (ink lines on cream; mustard only for the
arc under the reader's finger). Tapping an arc opens the two passages in pattern
7's compare view. A list view below it for screen readers and phones. No zoom,
no animation, no library (plan section 2).

*Fit:* maybe. *Effort:* M.

### Also considered, not ranked

- **A LiveWell verse-link script for church websites** (Sefaria's Linker, 150+
  sites). PCN pastors could add one script tag so references on their church
  sites open the verse with "Study on LiveWell." Strong for distribution, but it
  is a product for other people's sites and should wait for the verse index.
- **Readiness levels** (BiblicalTraining's Basics, Foundations, Academy,
  Institute). The Study Bible already uses "Start here," "For deeper study," and
  "For the pastor's shelf"; extend those three labels consistently to the
  history course and the study guides rather than inventing tiers.
- **Alternate reading orders** (Quran.com's revelation order). LiveWell already
  has the story order (eleven acts); a "historical order of writing" option for
  Paul's letters is a small addition when the dating work in pattern 4 lands.

---

## 3. What to avoid

Each item names where it was seen and the LiveWell rule it would break.

1. **Streaks, goals, and confetti.** Quran.com: "Day streak," "Track Streaks,
   Create Custom Goals, Stay Consistent," "Goal Completed! 🎉," "Set a Goal" at
   the end of every chapter. YouVersion and Hallow (benchmark.md). Breaks
   "position, not performance."
2. **"Mark as mastered" and swipe-to-answer flashcards.** Quran.com learning
   plans ("Tap to flip and swipe to answer," "mark words as mastered"). Retrieval
   practice is good (the plan's "Check yourself," tap to reveal, no score); a
   mastery tally is a score on the reader.
3. **Sign-up walls on study tools.** Sefaria's notes and "Add to Sheet" open a
   sign-up modal; Quran.com's "Sign in to save your progress." LiveWell has no
   accounts; everything personal works on the device and says so.
4. **Popularity inside a library.** Sefaria's "Trending Topics" and sheets
   sorted by "Views." Popularity is engagement bait on a serious subject; sort by
   relevance (hand-curated) or by time.
5. **Promotions inside the reader.** Quran.com's learning-plan banners in the
   reading view, donate pop-ups and fundraising components; Sefaria's "Promo,"
   "Sponsor a Day," and "Support Sefaria" modules beside the text. The reading
   surface carries the text and its instruments, nothing else.
6. **A panel of twenty buttons.** Sefaria's tools list mixes commentary with
   "Share on X," "Feedback," "Advanced," and admin tools. Show only the rows
   LiveWell actually has for that verse; hide zeros.
7. **Aggregation without editing.** Precept Austin's twenty thousand pages,
   "Under Construction" chapters, and a dormant index. The church strip shows
   three to five chosen, dated, verified excerpts, not everything ever said.
8. **One chronology stated as fact.** Theographic's Ussher and Jones dates
   (Creation 4004 BC). Never import them; date contested events with both
   schemes and primeval events with none.
9. **Share-alike data in the core.** Theographic's CC BY-SA 4.0 would bind
   LiveWell's derived registry. Use the CC BY sources (STEPBible TIPNR,
   OpenBible).
10. **Unlabeled machine summaries.** Sefaria's AI-summarized Guided Learning is
    labeled, but it moves toward summary in place of reading; Logos's assistant
    answers from a library. The plan forbids an AI chat box; questions and
    answers on LiveWell are written, signed, and sourced.
11. **Links that lie.** Accordance's cross-reference that opened Ezra 10:5 for
    Ezekiel 37:5. Every generated link (the verse index, compare views, arcs) is
    covered by a drift check and the route validator; a wrong link is worse than
    none.
12. **Spectacle for its own sake.** Harrison's arcs were made "more beautiful
    than functional." Any data drawing on LiveWell must open into the texts, have
    a list equivalent, and avoid zoomable canvases, animation, and map or chart
    libraries (plan section 2).
13. **Package-gated grayness.** Logos's grayed-out sections and Accordance's
    separate atlas purchase show a reader what he cannot have. LiveWell's
    material is free; a layer with no content says so in words, once, and does
    not tease.
14. **Infinite outward links.** Sefaria's web is endless by design. LiveWell's
    panels end: each opens to a chosen set, and the page ends with a verdict or a
    question, not "more."

---

## 4. What could not be seen

- No live page of any product was rendered; screens, spacing, motion, and the
  actual feel of the Sefaria, Scaife, and Quran.com readers are inferred from
  code and help text, not observed.
- Logos: the actual Factbook and Bible Word Study screens; the
  Grammatical Relationships section; the "Key Articles" and "Dig Deeper"
  sections beyond Logos's own one-line descriptions; how the suggested questions
  are generated.
- Accordance: the current Timeline and Atlas interfaces; how a reader switches
  the dating scheme in practice; whether Timeline links to Atlas.
- OpenBible.info: the cross-reference vote mechanics, and the blog post
  "Rethinking the Bible Atlas" (named in the data readme, not found by search).
- Theographic and viz.bible: any reader-facing application beyond the data,
  docs, and the "Divisions of the Bible" picker.
- BiblicalTraining.org: lesson pages in detail (transcripts, quizzes,
  outlines).
- Precept Austin and Enduring Word: page layouts, and how each cites the older
  writers it quotes (edition and page or not); Enduring Word's app features.
- Sefaria: any written design rationale or case study (none found); the exact
  launch date of Voices on Sefaria (newsletters point to January 2026); how
  "Notable Sources" are selected beyond the *Aspaklaria* note.
- Perseus: the "New Alexandria" commentary widget's behavior; the current
  production reader.
- Dante Lab: its present interface (descriptions only).
- Bible Odyssey: its visual design.
- Engagement or usage numbers for any feature named here; none were sought or
  should be quoted.

---

## 5. Evidence

### Code and data read directly (cloned into the scratchpad `design-src/`)

- **Sefaria-Project** (`github.com/Sefaria/Sefaria-Project`, sparse clone of
  `static/js`, `static/css`):
  `ConnectionsPanel.jsx` (Resources mode sections, ToolsButton labels and
  counts, `urlConnectionsMode`, ResourcesList, ToolsList, sign-up modal for notes
  and sheets); `GuideBox.jsx` and `GuideOverlay.jsx` ("Key Questions,"
  answers count, commentary summaries, AI tooltip, card overlay);
  `TopicPage.jsx` (tabs notable-sources, sources, sheets; sort options;
  "Works on Sefaria"; "Lived"; "Learn More"; Related); `NavSidebar.jsx` (module
  types, Weekly Torah Portion, Daf Yomi, Study Companion, About Topics text,
  Visualizations, Trending Topics); `CalendarsPage.jsx` (learning schedules);
  `ReaderDisplayOptionsMenu.jsx`, `LayoutButtons.jsx`, `ReaderPanel.jsx`
  (language and layout options, 600 px rule); `AboutBox.jsx` ("About this text,"
  "Author," "Composed: place date"); `TextCategoryPage.jsx` (category
  descriptions); `sheets/SheetOptions.jsx` ("Export to Google Docs"),
  `sheets/SheetsWithRefPage.jsx`; `explore.js`, `timeline.js` (d3 link maps);
  `RainbowLine.jsx` and `static/css/*.css` (fonts and genre colors).
- **Scaife Viewer** (`github.com/scaife-viewer/scaife-viewer`, `static/*.vue`):
  library and CTS components, widget names, labels ("CTS URN," "Text Width,"
  "Export Passage," "Attributions").
- **Scaife Viewer frontend** (`github.com/scaife-viewer/frontend`, `packages/`):
  reader-mode and widget packages; `widget-word-list/src/WordList.vue`
  ("frequency per 10k in this work"); `widget-passage-lemma-traversal` readme;
  `widget-attributions/src/Attributions.vue` (attributions by role).
- **quran.com-frontend-next** (`github.com/quran/quran.com-frontend-next`, sparse
  clone of `src/components`, `locales/en`): `locales/en/quran-reader.json`
  (study mode, layers, lessons and reflections disclaimers, hadith notice, Q&A,
  pin and compare, revelation order, streak prompts), `reading-goal.json`
  (goals and streaks), `learn.json` (learning plans, flashcards),
  `surah-info.json`, `layers.json`; `QuranReader/ReadingView/StudyModeModal/`
  (`StudyModeBodyTabs.tsx`, `tabs/StudyModeLayersTab/index.tsx` and
  `LayerControls.tsx`), `PinnedVersesBar/`, `PinnedVerses/`; components
  `ReadingGoal`, `DonatePopup`, `Fundraising`.
- **Theographic Bible Metadata** (`github.com/robertrouse/theographic-bible-metadata`):
  `readme.md` (tables, counts, formats, license CC BY-SA 4.0),
  `docs/chronology-and-dates.md` (Jones and Ussher, anchor dates),
  `docs/data-source-bibliography.md` (STEPBible TIPNR, CC BY 4.0),
  `json/people.json`, `events.json`, `places.json` (fields counted).
- **OpenBible Bible-Geocoding-Data** (`github.com/openbibleinfo/Bible-Geocoding-Data`):
  `readme.md` (scope, 70+ sources, 400+ cited, confidence vote tags, modifiers,
  radius, translations, Wikidata, thumbnails), `license.txt` (CC BY 4.0).
- **LiveWell's own code**, for calibration: `client/src/pages/StudyBible.tsx`,
  `client/src/pages/study-bible/VerseNotes.tsx` (layers), `ChapterNotes.tsx`
  ("Go deeper on LiveWell," catalogue search), `shared.tsx` (attributions),
  `client/public/bible/` (`ch/`, `lex/`, `notes/`, `story.json`,
  `sources.json`), `client/src/App.tsx` (routes).

### Web sources (reached through search; what each showed)

- Sefaria Help Center, "How to Find Interconnected Texts"
  (https://help.sefaria.org/hc/en-us/articles/18613227644316-How-to-Find-Interconnected-Texts):
  clicking a passage opens the resource panel; Related Texts by category; About
  This Text.
- Sefaria Help Center, "How to Access Connections on the Sefaria Library App"
  (https://help.sefaria.org/hc/en-us/articles/19815191391388-How-to-Access-Connections-on-the-Sefaria-Library-App):
  the panel at the bottom on the app; commentaries listed alphabetically.
- Sefaria Help Center, "How to Create a New Sheet"
  (https://help.sefaria.org/hc/en-us/articles/20512034977308) and "How to Create
  and Edit Sheets" (https://help.sefaria.org/hc/en-us/articles/20512002085276):
  account required; Create; autosave after first save; Source, Text, Comment.
- Sefaria Help Center, "How to Format and Edit Sheets"
  (https://help.sefaria.org/hc/en-us/articles/20531238413468-How-to-Format-and-Edit-Sheets):
  formatting toolbar, moving and deleting items.
- Sefaria, "How to Make a Source Sheet" (https://www.sefaria.org/sheets/155507)
  and educator course lesson 3 (https://www.sefaria.org/sheets/128972): Source,
  Insert (whole parasha), Text, Comment.
- Voices on Sefaria about and newsletters (https://voices.sefaria.org/about;
  https://voices.sefaria.org/sheets/674324): Library and Voices separate; sheet
  editor moved; library search excludes user content (February 2026 newsletter);
  April 2025 editor transition; June 2026 search fix.
- Sefaria, "Topics: What Are You Curious About?"
  (https://voices.sefaria.org/sheets/664892) and related educator sheets: 5,400+
  topic pages; relevance from the *Aspaklaria*; A-Z; `#` search.
- Sefaria Daf Yomi page (https://www.sefaria.org/daf-yomi): 2,711 pages, about
  seven and a half years, through the Calendar.
- Sefaria Developers, Linker v3 and Linker docs
  (https://developers.sefaria.org/docs/linker-v3;
  https://developers.sefaria.org/docs/linker;
  https://developers.sefaria.org/docs/sites-using-the-linker): recognizes
  references, popups, bookmarklet or embed, 150+ sites.
- Wikipedia, "Sefaria" (https://en.wikipedia.org/wiki/Sefaria) and Sefaria's
  July 2021 help sheet: 2016 redesign and apps; 2021 header with Texts and
  Explore; "lines the library with explanatory text."
- Religion News Service, 2023 (https://religionnews.com/2023/08/28/10-year-old-jewish-digital-library-revolutionizes-the-people-of-the-book/):
  topic search on contemporary subjects.
- Stephen Sansom, "Review: Perseus Digital Library Scaife Viewer," Society for
  Classical Studies, 2019
  (https://classicalstudies.org/scs-blog/stephensansom/review-perseus-digital-library-scaife-viewer):
  collapsible widget sidebars, Morphology and Word List from Logeion, clutter
  removed, no apparatus criticus, Perseus 5.0 replacing Hopper.
- Sententiae Antiquae, "Introduction to Scaife Viewer"
  (https://sententiaeantiquae.com/tag/technology/): vocabulary lists for the
  displayed text, parallel translations, tagged and treebanked texts.
- Perseus Vocabulary Tool help (deprecated)
  (https://www.perseus.tufts.edu/hopper/help/archived/VocabHelp.jsp) and
  vocab.perseus.org (https://vocab.perseus.org/): frequencies, key-term scores,
  short definitions; flashcards.
- Dickinson College Commentaries, "Do the Flaws in the Perseus Word Study Tool
  Matter?" (https://blogs.dickinson.edu/dcc/2012/07/10/more-on-the-perseus-word-study-tool/):
  automatic parsing can contradict handmade notes.
- Logos support, "What can I do with the Factbook?"
  (https://support.logos.com/hc/en-us/articles/360016146691): lookup types;
  start with the Key Article; passage articles; Dig Deeper; lemma entries.
- Logos, "What's New in Logos? November 2025"
  (https://www.logos.com/grow/release-november-2025/) and December 2025
  (https://www.logos.com/grow/release-december-2025/): Factbook questions with
  cited answers; mobile; six-week release cadence.
- Logos Grow post on Bible Word Study (https://www.logos.com/grow/?p=114507),
  Logos wiki "Charts" (https://wiki.logos.com/Charts), Logos community threads
  on Senses and the Septuagint Translation section
  (https://community.logos.com/forums/t/92821.aspx;
  https://community.logos.com/discussion/comment/1188060): Lemma, Translation,
  Root, Senses, Preposition Use, Septuagint Translation; translation ring with
  hover preview; frequency sparkline; senses ring with counts; chart types.
- Logos wiki "Guides" (https://wiki.logos.com/Guides) and "Topic Guide"
  (https://wiki.logos.com/Topic_Guide); Logos community "Sermon prep, what tools
  or guides do you use?" (https://community.logos.com/discussion/comment/1193495):
  Passage, Exegetical, Topic, and Sermon Starter guides and their sections;
  package-dependent, grayed headers.
- Accordance help, "New Features in Version 11"
  (https://accordancefiles1.com/helpfiles/14-Win/win14/content/topics/01_welcome_help/new_v_11.htm):
  Research tab; Info Pane.
- Themelios review, "Accordance 10 Ultimate Collection"
  (https://www.thegospelcoalition.org/themelios/review/accordance-10-ultimate-collection/):
  Instant Details; the Ezek 37:5 cross-reference that opened Ezra 10:5; search
  speed.
- Accordance help, "The Timeline"
  (https://accordancefiles1.com/helpfiles/OSX13/content/topics/08_time/the_timeline.htm)
  and "Understanding Conservative vs. Critical Dates"
  (https://accordancefiles1.com/helpfiles/Win13/content/topics/08_time/understanding_conserv_vs_critical.htm):
  3,000+ items, 13 regions, scheme of dates; conservative and critical
  definitions; Exodus 1446 BC or about 1250 BC.
- Accordance help, "The Bible Atlas"
  (https://accordancefiles1.com/helpfiles/OSX13/content/topics/07_atlas/the_bible_atlas.htm):
  layers, custom layers, 3D, separate package, not on mobile.
- Accordance Timeline supplement 5.6
  (https://accordancefiles1.com/exchange/downloads/documents/timsup.pdf): click a
  point in time for a report.
- Theographic "About" (https://theographic.notion.site/About-Theographic-bb40cb93b1ac43bd98252abce225d530):
  knowledge graph; CC BY 4.0 on the older page (conflicts with the repository).
- Viz.Bible, "Divisions of the Bible" (https://viz.bible/divisions-of-the-bible-gallery/):
  interactive section picker; and "340,000 Bible Cross References"
  (https://viz.bible/340,000-bible-cross-references-gallery/).
- Hugging Face dataset card, OpenBible cross-references
  (https://huggingface.co/datasets/NuBerea/openbible) and the crossrefviz project
  (https://github.com/lggcs/crossrefviz): 340,000+ connections extending the TSK,
  community votes, NT-to-OT subset, CC BY 4.0; a 3-vote filter (one developer's
  choice).
- BYU, *The Scriptures, Mapped* (https://scriptures.byu.edu/mapscrip/): built on
  OpenBible locations; warns identifications are speculative.
- Evangelicals Now, "An ESV / Yahoo mashup"
  (https://www.e-n.org.uk/reviews/2025-08-an-esv-yahoo-mashup/) and John Piippo,
  2011 (https://www.johnpiippo.com/2011/12/openbibleinfo.html): the topical Bible
  built from web search results.
- BiblicalTraining.org programs, church, about, and class pages
  (https://www.biblicaltraining.org/programs; https://www.biblicaltraining.org/church;
  https://www.biblicaltraining.org/church/pastors; https://biblicaltraining.org/about;
  https://biblicaltraining.org/learn/nurture/cm100-mentoring-the-new-believer/mentoring-new-believer-cm100-00):
  four levels and Leadership; hours; nine-month discipleship; free, donor-funded;
  certificates; Okanagan credit; class pages with lesson progress; group model.
- Precept Austin pages (https://preceptaustin.org/bybook/48;
  https://www.preceptaustin.org/bytopic/106; https://www.preceptaustin.org/bybook/30):
  per-book Commentaries, Verse By Verse, Miscellaneous; updated almost daily;
  20,000+ pages; "Under Construction"; dormant index; study tools.
- Enduring Word (https://enduringword.com/commentary/;
  https://enduringword.com/commentary-translations/): free, chapter by chapter,
  verse-by-verse outline; translations; media; app; paid editions; "more than 30
  years ... always completely free."
- Justuse, Enduring Word Commentary app reviews
  (https://justuseapp.com/en/app/1436262209/enduring-word-commentary/reviews):
  user praise ("thorough, cross-referenced," quotes from other leaders); one
  dissent.
- Quran.com product updates (https://quran.com/product-updates;
  https://quran.com/product-updates/new-translation-reading-mode-read-like-a-book;
  https://quran.com/it/explore/simplifying-word-by-word-and-audio-settings):
  Translation Reading Mode (January 16, 2026), Study Mode (January 22, 2026),
  Hadith tab (February 10, 2026), Pin and Compare, word-by-word settings.
- Dartmouth Dante Project, about and commentaries
  (https://dante.dartmouth.edu/about.php; https://dante.dartmouth.edu/commentaries.php),
  Dante Lab (https://dantelab.dartmouth.edu/about), and "Dante Virtually at
  Dartmouth" (https://penn.manifoldapp.org/read/dante-virtually-at-dartmouth):
  75+ commentaries 1321 to 2015 by line; compare up to four; modeled on the
  scholar's desk; aging infrastructure.
- NET Bible notes: Logos, "A Tool You Didn't Know You Had"
  (https://www.logos.com/grow/?p=296); Bible Gateway, NET version page
  (https://biblegateway.com/versions/New-English-Translation-NET-Bible);
  Andy Naselli (https://andynaselli.com/the-net-bible): 60,932 notes; tn, sn, tc,
  map.
- STEPBible: TGC, Justin Taylor
  (https://www.thegospelcoalition.org/blogs/justin-taylor/scripture-tools-for-every-person-step-a-new-free-online-bible-study-resource/);
  STEP user guide quick overview
  (https://stepweb.atlassian.net/wiki/display/SUG/Quick+overview); EFCA blog
  (https://blogs.efca.org/posts/tyndale-house-and-the-step-bible-online-and-free-resource):
  audience, word lookup and other uses, word clouds, 58 English translations,
  compare columns or line by line, hover.
- Bible Odyssey: Brandeis, 2015
  (https://www.brandeis.edu/now/2015/march/bible-odyssey-brettler.html); SBL
  newsletter 2014 (https://sbl-site.org/assets/media/2014_SBLnewsletter_March13.html);
  Psephizo (https://www.psephizo.com/?p=3454): people, places, passages; scholars;
  media; Ask a Scholar; cadence; academic framing.
- Chris Harrison, "Bible Cross-References"
  (https://www.chrisharrison.net/index.php/Visualizations/BibleViz), Curator
  Magazine (https://www.curatormagazine.com/nia-kiesow/visualizing-more-than-63000-cross-references-in-the-bible/),
  Mark Meynell (https://www.markmeynell.net/2010/01/08/a-stunning-visualization-of-the-bibles-63779-cross-references/):
  63,779 arcs, color by distance, chapter bar chart, "more beautiful than
  functional," copyrighted.

Searches used: 41.
