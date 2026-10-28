# A. Bible readers: how the best present Scripture, and what LiveWell should take

Prepared 2026-10-27 for the design research cluster "bible-readers," answering
James's brief ("the most organized, well-designed website that helps people to
study the Bible ... interactive, with things that draw people's attention ... a
useful tool for people to study and learn and grow"). Companion to
`docs/work/plan/benchmark.md`, which covered these products at the level of
audience and strategy. This file goes one level down, to the reading surface:
what a person sees and does with a chapter open, and how each product moves
them from reading to understanding.

**Method and limits.** Page fetches fail in this sandbox (WebFetch on
crossway.org returned `ENOTFOUND`), so no live page or screenshot was seen. I
used 43 web searches aimed at help centers, release notes, design write-ups,
app-store descriptions and reviews, and I read source code where a product is
open: STEPBible (`STEPBible/step`, its Backbone views and UI string bundles),
Sefaria (`Sefaria-Project`, its reader and connections panel), and OpenBible.info's
geocoding data (`openbibleinfo/Bible-Geocoding-Data`, readme and license). The
clones are in the scratchpad at
`/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/design-src/`.
I also read LiveWell's own Study Bible code and data so that every pattern
lands on something real. Nothing below describes a feature I did not see
described; where a source was third-party or old it is marked, and section 6
lists what I could not see.

---

## 0. The short verdict

The best Bible readers solve one of two problems well and almost never both.
The reference tools (Blue Letter Bible, Bible Hub, STEP, Logos, Olive Tree)
answer "what does this word, this verse, this cross-reference say," anchored to
the verse, with everything one tap away and nothing curated. The reading tools
(BibleProject, ESV's reader's mode, Dwell, the reader's Bibles) answer "what is
this book, how is it built, how do I hear it whole," and leave the verse-level
questions to someone else. YouVersion does neither deeply and wins on habit.

LiveWell is in an unusual position. Its Study Bible already holds, per chapter,
more considered content than most free readers show: the story so far, the
historical and cultural setting, the literary structure and outline, doctrines,
key Greek and Hebrew words, how the chapter points to Christ, **how the church
has read it (with dated witnesses)**, the manuscript and translation questions,
**steelmanned hard questions**, and questions for a group, plus the original
language under every word and OpenBible cross-references on every verse. What it
lacks is the presentation the best readers have worked out: text first and
clean, depth layered behind one tap, a picture of where you are in the book, the
connections around a verse counted and grouped, and plans that forgive.

The single biggest opening is the one nobody owns. Sefaria shows that a reader
can treat a tradition's commentary as first-class, connected data around each
line. No Christian reader does this for the church's long memory in a way a lay
reader can use: dated, attributed, short, and honest about disagreement.
LiveWell's `interpretation` field already is that content. Put it beside the
verse and the site has something no Bible app has.

---

## 1. What LiveWell already has on this ground

Read from the code on 2026-10-27 so the patterns below are concrete.

- **Routes.** `/study/bible` (front door with four doors: the Story of the Bible,
  the Sixty-Six Books, the Doctrines, Guides and Tools), `/study/bible/:book`,
  `/study/bible/:book/:chapter`, `/study/bible/story` and `/story/:act` (eleven
  acts), `/study/bible/doctrines/:id`, `/study/bible/guides/:id` (25 guides).
- **Chapter data** (`client/public/bible/ch/<book>/<n>.json`): BSB text per
  verse (`t`), the original words with transliteration, gloss, Strong's number
  and morphology (`w`, from STEP's tagged texts), and cross-references (`x`)
  built from OpenBible.info's CC BY data (`scripts/build-bible.mjs`). John 3:16
  carries twelve, as bare OSIS addresses (`Rom.5.8`, `1Jn.4.9` ...).
- **Chapter notes** (`client/public/bible/notes/<book>/<n>.json`): `title`,
  `summary`, `story`, `historical`, `cultural`, `literary`, `outline` (verse
  ranges with headings), `doctrines`, `words`, `christ`, `interpretation`
  (reception history: John 3 cites Justin Martyr around AD 155, Tertullian
  around AD 200, Chrysostom), `text` (manuscript differences, e.g. "which is in
  heaven" at 3:13), `teach`, `hard` (each a question with an answer that states
  the objection at its strongest first), `questions` (observe, interpret, apply).
- **Presentation today** (`client/src/pages/StudyBible.tsx`,
  `study-bible/ChapterNotes.tsx`): the chapter text, then the notes below it as
  about thirteen disclosure sections ("Where we are in the story," "The
  historical setting," "The world behind the text," "How the chapter is built,"
  "What it teaches," "Key Greek words," "Verse by verse," "What it shows of
  Christ," "How it has been read," "The text and translations," "A hard
  question," "For teaching and preaching," "For reflection or a group").
  Tapping a verse opens a panel (Study notes, Word by word, Cross-references,
  On LiveWell, Go deeper); tapping a word opens Grammar, Dictionary, Where else
  it appears, Greek editions.
- **Planned** (`MASTER-PLAN.md` 7.1 and 8.2): one reference parser (U09),
  passage lookup everywhere (U15), `VerseRef` with a text-only verse sheet
  (U16), thumbs and a sticky book-and-chapter picker (U37), the 2027 whole-story
  plan with position on the device (U28), the `Sheet`, `Stepper`, `Position`
  and `Tabs` primitives, and the rules: interactivity where it helps a person
  learn, find, remember or do; position, not performance; personal state on the
  device; no map or chart library; no zoomable canvas timeline.

So the content problem is mostly solved. The design problem is that a reader
opening John 3 meets the text, then a stack of about thirteen closed drawers, and has
to know which drawer holds the thing they wanted.

---

## 2. The products

Each entry: who it serves; how it is organized; signature features and the
interaction behind them; look and type where described; how it holds
attention; what to steal; what is weak.

### 2.1 BibleProject (website, app, reading plans, Classroom)

**Who.** Free, donor-funded, no account needed in the app (bibleproject.com/app
answers "Do I need to create an account?" with "Nope"). Audience mostly 18 to 45 per
`benchmark.md`; widely used by churches.

**How it is organized.** The video library has named categories, among them
Themes ("repeated patterns and themes seen throughout the biblical story": Tree
of Life, Sabbath, Justice, Holy Spirit) and Word Studies ("a deep dive into a
significant Hebrew or Greek word, tracing its usage in the story of the Bible":
Gospel/Euangelion, Peace/Shalom, Sin/Khata), alongside Book Overviews
(help.bibleproject.com). Reading plans run mainly inside YouVersion (over thirty;
the flagship *One Story that Leads to Jesus* is 358 days with more than 150
videos and, updated for 2026, daily devotional content and reflection
questions). Classroom adds three or four classes a year and recommends starting
with *Introduction to the Hebrew Bible*; a third-party listing says sessions run
20 to 30 minutes with lectures filmed before a live cohort, teacher's notes,
quizzes and reflection questions. The app's help center groups Getting Started,
Finding Resources (classes, "the Torah Journey and Skills studies"), and a
Bible Reader whose translation can be changed.

**Signature features and the interaction behind them.**
- *The book overview as a picture.* Each overview video "breaks down the literary
  design of the book and its flow of thought" and ends with a completed poster,
  free to download, with author, characters, location and background up front
  and the major themes laid out graphically. A reviewer's practice: read the
  text, then watch the video with the poster beside it.
- *Reading by movements.* The app's "Journey" section (its name) is a guided
  tour through the Torah organized into "movements," "groups of stories or poems
  the original authors arranged together to form a meaningful whole," and it
  teaches the reader to trace "links," repeated words or ideas, across them; the
  reader can "collect Scripture links." The Bible Reader lets a reader "go beyond
  chapters and verses to experience sections of Scripture intended to be
  understood together." A 2022 church guide describes a Skills area with
  Patterns (trace words, images and themes) and Style (literary genres), and a
  "Storyline" book order offered beside Traditional and Hebrew orders.
- *Orientation inside plans.* Before each new book in the yearly plan, an
  overview video "outlines the structure of the book and its central themes";
  each day includes a psalm "to meditate on through quiet reflection and
  prayer"; theme videos sit behind hyperlinks in the readings.

**Look and type.** One illustrated visual grammar across hundreds of videos and
posters (`benchmark.md`). A design case study by Underbelly, for an
end-of-year announcement site, describes a "spotlight hover" built with Framer
Motion and **audio-synced text**: the founders' recorded voices play while
matching words appear in step, built by converting audio to time-stamped JSON
with Google's speech-to-text and syncing it to HTML5 audio. A former product
designer's portfolio (2018 to 2024) lists "navigation, information
architecture" and content engagement among the work.

**Attention and habit.** Free, no account, every format feeding the others,
plans distributed through YouVersion where the habit already lives.

**Steal.** The book's shape as one drawn picture the reader can hold. Reading
in the author's units, not the chapter's. Teaching the reader a skill (spot the
repeated word) instead of handing over a conclusion. Orientation before each
new book.

**Weak.** A third-party review says the videos are overview-level, not verse by
verse, and that the app is "not a full Bible reader" and does not carry every
translation; a Play Store user says videos "take FOREVER to load unless
downloaded first." A reviewer notes the *Read Scripture* plan is chronological,
which confuses readers expecting canonical order. Little church history and
little of the present American fight (`benchmark.md`).

### 2.2 Blue Letter Bible

**Who.** Lay students who want the original languages and the older
commentaries, free. A comparison site calls it "the more comprehensive free
option" against Bible Hub and says it "covers the most common workflows without
payment."

**How it is organized.** Verse rows, each with a **Tools** button. BLB's own
help says the Tools tab opens "a list of all audio, video, and text commentaries
relating to the selected verse" and "suggested scriptures that relate to the
verse"; a university library guide names the tabs Interlinear (original
language, Strong's numbers linked to concordance and dictionary entries), Bibles
(other translations), Commentaries and Dictionaries. BLB's blog reports
"Previous" and "Next" buttons added inside Tools so a reader can move between
tool panels without backing out, an inline horizontal interlinear (2022), and a
Study menu that lists the language resources.

**Steal.** Tools anchored to the verse row; Previous and Next inside the panel
so the reader keeps their place.

**Weak.** The same library guide finds the Commentary and Dictionary tabs not
especially useful; the commentary list is a wall of sources of very uneven date
and tradition with no editorial hand. I could not see its visual design.

### 2.3 STEP Bible (Tyndale House, Cambridge; open source, code read)

**Who.** "Scripture Tools for Every Person": free, hundreds of languages,
online and as an offline desktop app, run by a UK charity of "Bible scholars and
computer enthusiasts" (README).

**How it is organized.** One search box for passages, original words and
subjects; one or more passage panels that can be linked ("These two panels are
linked. Click this icon to break the link"); a sidebar with five tabs, read from
`view_sidebar.js`: Lexicon, Analysis (word frequency), History, Color
(grammar color-coding) and Help. Beside the reader sit plain HTML reference
tables that open passages: maps by period (Middle East, Exodus and Conquest,
Tribes of Israel, Judah and Israel, Time of Jesus, Jerusalem, Early Church,
Pre-modern maps), *Old Testament in New Testament*, *Harmony of the Gospels*,
biblical places, miracles, names, M'Cheyne and Horner plans, and chronological
plans that pair Old Testament readings with related New Testament passages. Two
small apps, a genealogy family tree and a chronology, open in a three-frame
layout linked to the passage.

**Signature features and the interaction behind them** (UI strings from
`InteractiveBundle.properties`, behavior from `view_quick_lexicon.js`).
- *Glance, then go deep.* Hover (or touch) a word: a quick-lexicon box shows the
  gloss, transliteration, Greek or Hebrew, a short definition, and "Occurs %1$d
  times in %2$s" with "%1$dx in book, %2$dx in Bible"; then "Click on the word to
  see more information," or on a phone, "Touch the word again to see more
  information." The full lexicon opens in the sidebar without leaving the text.
- *Verse vocabulary.* Hovering a verse number shows every original word in the
  verse, and the help notes this works even for translations without word
  tagging.
- *Display modes.* Interleaved, Interleaved with comparison ("highlights the
  textual differences"), Interlinear ("links the words from different versions
  and presents the chosen text word by word"), Column view, Column view with
  comparison. Options add vocabulary or transliteration under each word and
  color-code grammar.
- *Small mercies.* A copy flow ("Select the *first* verse to copy," then the
  last); a one-time offer to "Restore previous session" ("You will not be asked
  to restore these items again ... you can quickly find them in the bookmarks
  tab"); keyboard shortcuts (type the first two letters of a book to open the
  reference window, left and right arrows for the previous or next chapter, "?"
  for the welcome panel).

**Look and type.** Utilitarian. The helper pages hard-code a teal accent and set
tables in Georgia; the genealogy app uses Arial. Not a visual reference.

**Attention and habit.** None beyond usefulness, which is the point.

**Steal.** The two-step word help, made for touch. Comparison that marks the
differences instead of making the reader hunt. Reference tables (OT in NT,
Gospel harmony) as doors into the text. Keyboard and restore conveniences that
ask once.

**Weak.** Feature density: its own guide says "there is a lot of functionality
packed into STEP Bible." Its usability page notes many interface translations
are machine-made. One reviewer, though, found it "extremely organized" and
praised the "generous use of popups so that you remain on the screen you're
already working on."

### 2.4 Logos web app and the Faithlife Study Bible

**Who.** Pastors, scholars, serious students; a paid library model.

**How it is organized.** Library-first. **Factbook** is the starting point:
look up a passage, a Greek or Hebrew lemma, a word sense, a manuscript, a person;
each entry opens with a key article and links deeper. **Passage Guide** searches
a passage across the user's resources and opens each at the right page; its
**Insights** panel shows "what your study Bibles and commentaries say" about
the passage being read. **Notes** "automatically stick to the verses you're
studying" and gather into Notebooks. **Workflows** give step-by-step study
guidance. The **Bible Sense Lexicon** organizes words by meaning in a hierarchy,
with a graph of how often a sense occurs, book by book. `benchmark.md` covers
the Study Assistant (AI answers from the user's own library, with citations).

**The Faithlife Study Bible** (free app; reviews mostly from about 2013): text
above, running commentary below, the two windows linked so both move when
either advances; longer notes signed by their authors and revised over time;
"over 400 photos, videos, and infographics" that open in an image viewer; the
*Lexham Bible Dictionary*, whose Scripture references open a floating verse
window; a print-edition companion app that scans a page with the camera.

**Steal.** An Insights view of what exists for this passage. Notes that stick
to the verse. Signed notes. Meaning-by-book frequency drawn as a picture. A
floating verse window for any reference inside a note.

**Weak.** Price and complexity. Robert Rouse (Theographic, viz.bible) names the
deeper problem in 2018: most tools "organize information according to a library
of resources instead of a set of subjects." The reader has to know which book
to open.

### 2.5 Bible Gateway and Bible Gateway Plus

**Who.** The broadest general audience; quick lookup; free with ads, Plus paid.

**How it is organized.** Passage lookup and keyword search; a **Page Options**
button on every passage page that shows or hides footnotes, verse numbers,
headings and cross-references. Footnotes, verse numbers and headings are on by
default; cross-references are off (Bible Gateway's blog). Footnotes are
lowercase letters in brackets; cross-references are uppercase letters in
parentheses whose references open the passage. Reading plans by web, app and
email. Audio for many versions. Plus removes ads and adds a shelf of study
Bibles and commentaries (counts vary by source: 40, 60, 70+). Plus members can
turn on a **reverse interlinear** for the NIV from the page options menu: the
original-language text appears below the English, and selecting a word opens
its entry in a right-hand sidebar.

**Steal.** Sensible defaults with one place to change them. The interlinear
line under the English plus a sidebar for the entry. Plans by email.

**Weak.** Ads on the free tier; the study layer behind a paywall; volume
(dozens of translations and devotionals) with no editorial voice.

### 2.6 YouVersion (the Bible App)

**Who.** Everyone; a billion installs (`benchmark.md`); free, no ads.

**How it is organized.** I could not confirm the current tab structure. Seen
described: the Bible reader; plans (searchable by topic; thousands, from many
publishers); Verse of the Day; Guided Prayer; videos (saved videos added
September 2026); a **Recents** list that "resumes where you left off" (September
2026); a curated **Daily Refresh** home feed "built to lead you through daily
connection and reflection" (release notes, secondhand); an embedded reader
offered free to other ministries (March 2026: 1,487 Bibles, 36 publishers, 1,283
languages).

**Interactions.** Highlights in colors, notes, bookmarks, verse images to share,
Compare Versions (one verse across translations, offline), plans with friends
where "friends can see each other's reading plan progress, react to shared verse
highlights, and comment." **Catch Me Up** (in the plan's menu) "resets Today's
reading to the day after the last complete day." A reviewer calls the Verse of
the Day plus streak system "unrivaled" as a habit mechanic.

**Steal.** Catch Me Up. Recents. Compare Versions at a verse.

**Weak.** Plan depth varies by publisher (`benchmark.md`). Progress visible to
friends and a streak make reading a performance. Verse images detach a line
from its chapter. Wikipedia records 2026 criticism for hosting The Passion
Translation, with a petition of over 12,000 signatures: the cost of being a
platform rather than an editor.

### 2.7 ESV.org and the ESV Bible app (Crossway)

**Who.** ESV readers; free reader, paid study layer.

**How it is organized.** Much works without signing in; a free account adds
notes, highlights and "interactive reading plans," synced between web and app.
A layout control offers one, two or three columns. A toolbar or settings gear
toggles verse numbers, paragraph view, red letters, footnotes, cross-references
and headings, and **reader's mode** hides verse and chapter numbers and works
without signing in. The app's redesign (dated sources) introduced "a two-column
view for reading study content next to the text," a Verse-by-Verse mode, and
cross-references and footnotes in pop-up boxes; the current App Store note says
cross-references "now open in a sheet that allows full-screen reading." The free
ESV Global Study Bible is included; a subscription opens the ESV Study Bible
(Crossway's listing: about 20,000 notes, 200+ charts and timelines, 240+ maps and
illustrations, 50+ articles, 120 character profiles). Audio has several
narrators, thematic playlists and background music. Plans were historically
offered by web, RSS, podcast, email, iCal, mobile and print (2009), and Crossway
has published plan-shaped audio (a chronological year narrated by Michael
Reeves; M'Cheyne narrated by Robert Smith Jr.).

**Steal.** Reader's mode. Study content in a column beside the text on wide
screens. A cross-reference sheet that can grow to full screen. Plans that reach
the reader by the door they already use, including a calendar file. A named
human voice per plan.

**Weak.** Personal notes need an account. The deepest notes are paid. One
translation's world.

### 2.8 NET Bible and Lumina (bible.org)

**Who.** Readers who want to see translation decisions. Now "NET Bible (Formerly
Lumina)" in the App Store.

**Signature.** Nearly 60,000 notes, **typed**: Translator's Notes (tn), Study
Notes (sn), Text-Critical Notes (tc). Lumina (review of 2016): two panes, the
text on the left; the right pane switches between NET notes, commentaries by
Thomas Constable, Alexander MacLaren and Matthew Henry, the reader's own notes,
a parallel translation, or the Greek and Hebrew with parsing, Thayer's
definitions and a Strong's word search. The app syncs highlights, notes and
bookmarks.

**Steal.** The note's kind visible before it is opened: a reader knows whether
they are about to read a translation choice, history, or a manuscript question.

**Weak.** Old commentaries sit beside new notes with no date or tradition
shown; the interface sources are old.

### 2.9 Bible Hub

**Who.** Search arrivals on a single verse; a free reference.

**Signature.** **The verse as a page.** A verse page shows many translations
stacked vertically with clickable Hebrew or Greek along the top, plus parallel
texts, cross-references, the Treasury of Scripture Knowledge and classic
commentaries for that verse; it links to "a menu of 25 versions." A comparison
site describes it as "built around translation comparison, with 30+ English
versions stacked vertically per verse."

**Steal.** A permanent, shareable address for one verse with its context
gathered, which is what a person searching "what does John 3:16 mean" lands on.

**Weak.** Everything at once, uncurated; the classic commentaries are given
without dates or traditions. I could not confirm reports about its ads.

### 2.10 Dwell

**Who.** Listeners. Co-founder Joshua Bailey: other apps "focused on the reading
experience, while nobody was really focusing on the listening experience," and
"the primary way Christians have taken in scripture throughout the centuries
has been through listening." Kickstarter, 2018.

**Signature.** 20+ voices, 14 translations, optional background music, a
**read-along** mode that scrolls the text in sync with the narrator, 75+
listening plans, themed playlists, sleep mode, memorization tools, offline;
about $41.99 a year. Its player redesign, "arguably the most important screen,"
had three stated goals: "a return to simplicity, digital wellbeing, and one
player for all guided experiences," and folded four controls for voice, version
and music into two. A former designer's portfolio says the Bible does not suit
the audiobook model because listeners jump around, so Dwell borrowed music-app
patterns, and that accessibility was a priority.

**Steal.** One player. Digital wellbeing as a written design goal. Text that
follows the voice.

**Weak.** No teaching or context; subscription.

### 2.11 Olive Tree

**Who.** Buyers of a digital study library; Bible+ subscription for sync.

**Signature** (Olive Tree help center). A **Study Center** opens as a resizable
split window beside the text with four tabs: Resource Guide, Parallel, Notes,
Lookup. The Resource Guide "automatically gathers and displays content from your
library that relates to the passage currently open": commentaries,
cross-references, maps, notes, tagged items. It "updates as you scroll," and each
section can be **locked** to follow the reading or unlocked to browse without
moving the main passage. A link icon makes a parallel window follow the main
text. Sections can be switched off in settings. Notes and highlights are stored
on the device and work offline.

**Steal.** "Follow my reading" as a lock the reader controls. Letting the reader
turn off sections they never use.

**Weak.** The library-purchase model; I could not see the visual design.

### 2.12 Added: Sefaria (open source, code read)

Not a Christian product, and the best text-with-connections reader I found.

**The interaction.** Click any passage (long-press on the app) and a Resource
Panel opens beside it (help.sefaria.org). From `ConnectionsPanel.jsx`: a top row
of **About this Text**, **Table of Contents**, **Search in this Text**,
**Translations** (with a count), and, where it exists, **Guided Learning**; then
**Related Texts** grouped by category with counts (Commentary, Tanakh, Mishnah,
and so on), where choosing a category lists the works and choosing a work opens
it in a new stacked panel; then **Resources** with counts (Sheets, Web Pages,
Topics, Manuscripts, Torah Readings); then **Tools** (Add to Sheet,
Dictionaries, Compare Text, Notes, Share, Feedback, Advanced). Buttons with a
zero count are hidden unless the user is a moderator. *Guided Learning*
(`GuideBox.jsx`, marked experimental) shows **"Key Questions,"** each with "N
Answers" drawn from the commentaries, plus summaries; the component imports an
AI-information tooltip, so I take it that some of this content is AI-assisted
and labeled as such (I did not see the content itself).

**Steal.** Counted categories that hide what is empty. The tradition's
commentary as structured data around the line. Key questions answered by named
sources. "About this text" as a door from any verse.

**Weak.** Many controls for a newcomer (my judgment from the component count).
Notes gated behind a sign-up modal.

### 2.13 Added: OpenBible.info (open data)

**Cross-references.** Expands Torrey's *Treasury of Scripture Knowledge* to
more than 340,000 connections (viz.bible); a third-party project describes them
as "community-curated cross-references with transparent voting (CC BY 4.0)" and
filters them by minimum votes. LiveWell's Study Bible already builds on this
data (`scripts/build-bible.mjs`), without the votes.

**Geocoding** (repository read). Every identifiable place in the Protestant
Bible, catalogued by verse, from "over seventy modern sources ... with over 400
unique sources cited," with **confidence in each identification** on a stated
scale (yes, likely, map, most likely, possible, unlikely, no), the place's
rendering in ten English translations, and thumbnails. License: CC BY 4.0
(OpenStreetMap geometry is ODbL). Emmaus, for example, carries several
candidate sites with separate scores (Qalunya, Emmaus Nicopolis and others).

**Steal.** Data that says how sure it is. For a site that writes toward the
skeptic, "the site of Emmaus is uncertain; here are the candidates" is worth
more than a confident pin.

### 2.14 Added: Bibliotheca and the reader's Bibles (design reference)

Adam Lewis Greene's case: "The Bible's typography is designed with reference,
not readability, in mind," and "Could it be that the encyclopedic nature of our
contemporary Bibles is what's driving this idea that the biblical literature is
dry and boring?" (Fast Company, 2014). Bibliotheca removes chapter and verse
numbers, sets a ragged-right column in his own typeface (Katharos), and splits
the Bible into volumes "to avoid thin paper and tiny print," drawing on Robert
Bringhurst and Eric Gill for type and on Robert Alter and N. T. Wright for the
reading. Its crowdfunding far exceeded its goal (Christian Post headline; I saw
only the headline). ESV's reader's mode is the same idea on a screen.

### 2.15 Smaller references

- **Theographic / viz.bible** (Robert Rouse): "a knowledge graph of the Bible,
  weaving data about people, places, and periods of time," CC BY 4.0; the
  argument that a timeline should link to the people and places in each event.
- **Chris Harrison's cross-reference arcs** (2007, with Christoph Römhild):
  63,779 cross-references drawn as arcs. Beautiful and copyrighted for
  non-commercial use; a viz.bible remake had to roll up to the chapter level
  because it "cannot efficiently display curved lines for every single verse
  connection."
- **Bible memory apps** (biblememory.com, Remember Me): first-letter cued recall
  ("see only the initial letter of each word and try to recall the rest"),
  progressive word removal, and spaced review. A smaller app, VerseFlow, markets
  streak counters and milestone badges.

---

## 3. What the best readers share: five moves from reading to understanding

Reading the products side by side, a reader who understands a chapter has made
five moves. Each product serves some of them.

| Move | The reader's question | Who does it best | LiveWell today |
|---|---|---|---|
| 1. Orient | Where am I in this book and in the whole story? | BibleProject (posters, movements, overview before each book); ESV Study Bible intros | Book intros, "Where we are in the story," the eleven acts; no picture of the book's shape on the chapter page |
| 2. Read | Let me hear it whole, without clutter | ESV reader's mode, Bibliotheca, Dwell read-along | Clean BSB text; no read mode; no audio |
| 3. Look closer | What does this word or line mean? | STEP (glance then deep), Bible Gateway Plus, Logos, BLB | Word tap with grammar, dictionary, frequency; verse notes |
| 4. Connect | What else in Scripture, and how has the church read it? | Sefaria (connections by category), Olive Tree (Resource Guide), Bible Hub (verse page) | Cross-references as addresses; reception history in a closed drawer at chapter level |
| 5. Carry | What do I take with me? | Logos notes, memory apps, YouVersion plans | Questions for a group; My Library on the device; the 2027 plan coming |

The gap at move 4 is LiveWell's opening, and the gap at moves 1 and 2 is its
cheapest win.

---

## 4. The patterns most worth bringing to LiveWell, ranked

Ranked by value to LiveWell's readers against effort, with the brand contract
("Unhurried. Weighted. Grown-up.") and the plan's rules as the filter. Effort:
S is days, M is a unit, L is several units or needs new content or recording.

### 1. One panel for everything around a verse, counted and grouped

*Seen in:* Sefaria's Resource Panel; Olive Tree's Resource Guide; Logos's Passage
Guide and Insights; Blue Letter Bible's Tools with Previous and Next; Bible Hub's
verse page.

*What it is.* Tap a verse and one panel lists every layer that exists for that
verse, grouped, each with a count, and with empty groups hidden. The reader sees
the whole shape of what is available before choosing.

*Why it works.* It replaces "which drawer?" with a table of contents for this
one verse. Counts tell the reader where the depth is without a word of
explanation. Hiding empty groups keeps the panel honest and short.

*On LiveWell.* On `/study/bible/john/3`, tapping verse 16 opens the existing
`Sheet` (bottom sheet on a phone, side panel from 1024 px) headed "John 3:16,"
then rows, for example: *Study note* · *Words (25)* · *Elsewhere in Scripture
(12)* · *How the church has read it* · *A hard question* · *On LiveWell*, each
with its count (25 original words and 12 cross-references are the real figures
for John 3:16 in the current data). Each row
opens in place with a Back at the top, and Previous verse and Next verse sit at
the bottom so the reader can walk the chapter without closing anything (BLB's
lesson). The open verse goes in the URL (`?v=16`), so a search result or a shared
link lands on the verse with its panel open, which is Bible Hub's verse page
without a second page. On desktop, a "Follow my reading" lock in the side panel
(Olive Tree) updates the panel as the reader scrolls.

*Fit:* core. *Effort:* M (the data exists; this is the panel and the
per-verse index of which chapter-level notes mention which verse).

### 2. A Read mode and a Study mode

*Seen in:* ESV.org and the ESV app (reader's mode hides verse and chapter
numbers; toolbar toggles for numbers, headings, footnotes, cross-references);
Bible Gateway's Page Options with sensible defaults; Bibliotheca.

*What it is.* One switch at the top of the chapter. **Read** sets the chapter
as literature: paragraphs and poetry lines, no verse numbers, no headings, no
markers, the Cormorant-and-Inter page at its quietest. **Study** shows numbers,
section headings from the outline, and a quiet mark on each verse that has
something in the panel. The choice is remembered on the device.

*Why it works.* Greene's argument is right: a reference layout makes the Bible
read like an encyclopedia. Readers who came to read should not have to wade
through apparatus; readers who came to study need it. Giving both, with one
control, is exactly "unhurried" for the first and "weighted" for the second.

*On LiveWell.* A two-state segmented control under the chapter title on
`/study/bible/:book/:chapter`; Read is the default when arriving from the 2027
plan or a devotion, Study when arriving from search or a verse link. Tapping a
paragraph in Read mode offers "Study this passage," which switches mode with that
paragraph in view.

*Fit:* core. *Effort:* S.

### 3. The shape of the book, drawn, with "you are here"

*Seen in:* BibleProject's book overview posters and videos; the ESV Study Bible's
book introductions and outlines; Logos's frequency-by-book graph as a drawing
idiom.

*What it is.* A single horizontal band for the book, divided into its major
sections with their names, the reader's current chapter marked. At the book
level it is the hero of the page; at the chapter level it shrinks to a thin
strip under the title.

*Why it works.* Orientation is the move most readers skip and most need.
BibleProject's success says a picture of the book's design is the thing people
keep. It costs one glance and pays back every chapter.

*On LiveWell.* On `/study/bible/romans`, under the introduction, an inline SVG
band drawn from tokens (charcoal rule, mustard only for "you are here"): Romans
1 to 4, 5 to 8, 9 to 11, 12 to 16, each labeled in Cormorant, each a link. On
`/study/bible/romans/8`, a 6 px strip with the marker, which opens the band on
tap. Data: a hand-written section list per book (66 short entries), checked
against the existing chapter `outline` fields. This is "drawn teaching,
sparingly" under MASTER-PLAN 8.5, not a chart library.

*Fit:* core. *Effort:* M (66 section lists need writing and checking; the
drawing is one component).

### 4. Cross-references that show the words and say why

*Seen in:* the ESV app (cross-references in a sheet that can go full screen);
the Faithlife Study Bible and Lexham dictionary (a floating verse window);
Bible Hub (Treasury of Scripture Knowledge per verse); OpenBible.info (votes);
STEP (*Old Testament in New Testament*, *Harmony of the Gospels*).

*What it is.* Each cross-reference shows the first line of the verse it points
to, ranked by strength, with the strongest kinds named where known ("quoted
here," "the same promise," "the same word"); tapping expands the full verse and
offers "Read it in context."

*Why it works.* A bare address ("Rom 5:8") asks the reader to leave. Showing
the words lets the connection do its work in place, and ranking keeps twelve
references from feeling like twelve equal homework assignments. It also models
reading Scripture by Scripture rather than verse as missile.

*On LiveWell.* In the verse panel's *Elsewhere in Scripture* row, use the
text-only shards U16 already generates (`client/public/bible/text/...`) to print
each reference's verse; order by OpenBible vote count (add the votes to
`build-bible.mjs`); label direct New Testament quotations of Old Testament verses
from a short hand-checked list, starting with the passages the essays and plans
use most. Show five, then "Show all twelve."

*Fit:* core. *Effort:* M.

### 5. "How the church has read it," dated, beside the verse

*Seen in:* Sefaria (commentary as a counted category of related texts, opened
in a panel beside the line); Lumina (Constable, MacLaren and Matthew Henry beside
the NET); Bible Hub and Blue Letter Bible (classic commentaries per verse, but
undated and uncurated).

*What it is.* For a verse or passage, the church's readers across time, each as
a short paraphrase with name, date, place and work (Justin Martyr, Rome, about
AD 155, *1 Apology* 61), ordered by date on a thin time rule, with any verbatim
quotation marked as a quotation and sourced.

*Why it works.* It is the move nobody in the Christian reader market makes
well, and it is LiveWell's mission: the church has sat with this text before,
and the reader is not the first to ask. For the skeptic it is evidence that the
faith has a memory and argued with itself; for the doubting Christian it is
company. The dates are what separate it from Bible Hub's undated wall.

*On LiveWell.* The existing `interpretation` field becomes a *How the church has
read it* row in the verse panel (for the verses each paragraph names) and, at the
chapter level, a section with a small dated rule: AD 155, AD 200, AD 390, 1540,
and so on, each a dot that opens its witness. Links reach the history study's
registry of people (MASTER-PLAN 7.2) when it ships. The integrity rule holds:
paraphrase offered as paraphrase, quotations verbatim and checked, nothing
attributed from a summary.

*Fit:* core. *Effort:* M for the presentation of what exists; L to extend to
more verses.

### 6. The hard questions first, answered by the strongest objection

*Seen in:* Sefaria's Guided Learning ("Key Questions," each with "N Answers"
from named commentators); LiveWell's own `hard` field.

*What it is.* At the head of a chapter's notes, the one or two questions an
honest reader is likely already asking ("If God loved the world, how can he
condemn those who never heard?"), each opening an answer that states the
objection in its strongest form, names who holds it, and only then answers.

*Why it works.* It meets the skeptic and the doubting Christian at the question
they brought instead of making them dig to a drawer near the bottom of the
page. It is the site's
whole posture compressed into a reading habit.

*On LiveWell.* On the chapter page, after "Where we are in the story," a quiet
row titled *The question this chapter raises* with the question in Cormorant;
tapping opens the answer in the `Sheet`. The same question appears as a row in
the verse panel for the verses it concerns. No new writing is needed for the
chapters that already carry `hard` entries.

*Fit:* core. *Effort:* S.

### 7. Glance, then go deep, for the original languages

*Seen in:* STEP (hover or touch a word for the quick lexicon, touch again for the
full entry in the sidebar; hover the verse number for the verse's whole
vocabulary; optional vocabulary under each word); Bible Gateway Plus (reverse
interlinear line under the English, word entry in a right sidebar); Logos (Bible
Sense Lexicon graph of a sense across books).

*What it is.* First touch on a word shows a small inline card: the Greek or
Hebrew, transliteration, gloss, and "13 times in the New Testament, 5 in John."
Second touch opens the full entry in the panel. An optional "Show the Greek under
each word" line is available in Study mode only.

*Why it works.* Most readers want one gloss, not a lexicon. The two-step keeps
them reading while the depth stays one touch away, and it is built for thumbs
(STEP's own string: "Touch the word again to see more information").

*On LiveWell.* The word tap already opens Grammar, Dictionary, Where else it
appears and Greek editions. Insert the glance card before that panel, drawn from
the same `w` array, and add a small 66-book strip to *Where else it appears*
marking the books where the word occurs (Logos's idea, drawn in SVG, no library).
Keep morphology codes behind "Grammar" in plain words ("aorist active
indicative: a simple past act").

*Fit:* strong. *Effort:* S to M.

### 8. Plans that forgive

*Seen in:* YouVersion (Catch Me Up; Recents that resume where you left off);
BibleProject's plans (an overview before each new book, a psalm a day for
meditation); ESV (plans by web, email, RSS, podcast, iCal and print; named
narrators for plan audio); STEP (chronological Old Testament paired with related
New Testament).

*What it is.* A plan shows position ("Day 41 of 365") and today's reading, never
a count of missed days. If the reader has been away, it says where they stopped
and offers two equal choices: pick up there, or join today's reading. Each new
book in the plan opens with the book's shape (pattern 3). The plan reaches the
reader by a calendar file and, if James wants it, the newsletter.

*Why it works.* YouVersion's own "Catch Me Up" concedes the problem: plans
break when life does, and a plan that scolds is abandoned. The research on
streaks says breaking one is "extra demotivating" (CU Boulder's Alix Barasch).
LiveWell's rule ("position, not performance") already points here; the steal is
the mercy and the orientation.

*On LiveWell.* The 2027 whole-story plan (U28): a *Today* line with the
reading, a *You last read Day 37* line only when it applies, two plain buttons,
and an "Add to calendar" `.ics` with the year's readings. Before day one of each
book, its shape band and the book introduction. A psalm line per day is possible
later and needs James's view.

*Fit:* core. *Effort:* S to M (U28 is mostly built; this is copy, state and the
calendar file).

### 9. Read in the author's units

*Seen in:* BibleProject's app ("movements," "sections of Scripture intended to be
understood together," a guided Torah reading with collected "links").

*What it is.* An option to read by literary unit (Genesis 1:1 to 2:3; the
Sermon on the Mount whole) with chapter numbers secondary, and a short note at
each unit's head on how it is built, naming one repeated word to watch for.

*Why it works.* The Study Bible's own guide (`guides/chapters-and-verses.json`)
already says that Stephen Langton worked out the chapters in Paris around the
first decade of the thirteenth century "for teaching and reference, not as an
analysis of each book's structure," and that "Genesis 1 ends before the seventh
day of creation." Units teach the reader to see design, which is the skill that
turns reading into understanding.

*On LiveWell.* On a book page, a toggle between *By chapter* and *By section*,
the sections coming from the same list as pattern 3. In the 2027 plan, a day's
reading can end on a unit boundary rather than a chapter break where the
schedule allows. The "repeated word" note is one sentence per unit drawn from the
existing `literary` fields.

*Fit:* strong. *Effort:* M to L (the unit list is shared with pattern 3; reading
across chapter files needs a small loader).

### 10. Threads across the canon

*Seen in:* BibleProject's Themes (Tree of Life, Sabbath, Justice) and Word
Studies (Shalom, Euangelion, Khata); Logos's sense graph by book; Theographic's
argument for organizing by subject, not by library; the cross-reference arcs as
a caution.

*What it is.* A doctrine, theme or word drawn as one band of the 66 books in
canonical order, with a mark in each book where it is taught or used; tapping a
mark opens that chapter at the right note.

*Why it works.* The whole-Bible view is what BibleProject made famous, and it
is the shape of the reader's real question ("where does the Bible talk about
this?"). One band per thread is readable on a phone; the famous arc chart is
not.

*On LiveWell.* On `/study/bible/doctrines/:id` (already "traced through every
chapter that teaches it"), a band at the top built from the doctrine's chapter
list, the same visual grammar as pattern 3 so the site has one drawing language.
The same band sits in the word panel's *Where else it appears* (pattern 7).

*Fit:* strong. *Effort:* M.

### 11. Places named honestly

*Seen in:* OpenBible.info's geocoding (verse-indexed, confidence-rated, CC BY
4.0); STEP's maps by period; Theographic.

*What it is.* A *Places in this chapter* list in Study mode: each place with a
one-line identification and an honest confidence label ("Bethany: certain";
"Emmaus: uncertain, three candidate sites"), and a small locator drawn on one of
a few hand-built regional outlines.

*Why it works.* It answers the question every new reader has (where is this?)
and models the intellectual honesty the skeptic is testing for. The data does
the hard part and says how sure it is.

*On LiveWell.* A build script reads `ancient.jsonl` into a per-chapter list at
build time (no runtime map, no tiles, no library); five or six inline SVG
regional outlines (Canaan, Jerusalem, the Roman East, Mesopotamia and Egypt)
colored from tokens, with a dot or a shaded radius for uncertain places;
attribution to OpenBible.info on the page. MASTER-PLAN parks the history atlas
until James judges the slice; this is smaller and per chapter, but it should go
to James with the atlas question.

*Fit:* strong. *Effort:* M.

### 12. Translations side by side, with the difference explained

*Seen in:* STEP (comparison modes that highlight textual differences); Bible Hub
(stacked versions per verse); YouVersion (Compare Versions); NET (text-critical
notes).

*What it is.* At a verse, the BSB beside one or two public-domain translations
(KJV, ASV, WEB), differences marked, and where a difference comes from the
manuscripts, the reason in a sentence with a link to the chapter's *text* note.

*Why it works.* "Is the Bible reliable?" is the top question in `benchmark.md`.
Showing a difference and explaining it plainly (John 3:13's "which is in heaven")
is more persuasive than any assurance.

*On LiveWell.* A *Compare* row in the verse panel. Only public-domain texts and
the BSB, so no new permissions are needed; the ESV stays a quotation source in
essays, not a reader text (MASTER-PLAN's one-translation rule).

*Fit:* strong. *Effort:* M (the texts need importing and a diff; the `text`
notes exist).

### 13. Notes that stick to the verse, kept on this device

*Seen in:* Logos (notes attach to verses and gather into notebooks); Olive Tree
(notes from highlights, tags, stored on the device, offline); ESV.org (notes
and highlights, with an account).

*What it is.* Save a verse or write a note on it from the verse panel; the note
reappears beside that verse on every visit and gathers on *My notes in John*;
print or send them. Stored on the device, said plainly.

*Why it works.* Writing is how reading becomes one's own. Keeping it on the
device respects the no-accounts rule and the reader's privacy, and "print or
send" gives it a life outside the browser.

*On LiveWell.* Extend `lib/library.ts` (My Library) with verse notes through
`lib/storage.ts`, with the house failure line if saving fails. A *Your note*
row in the verse panel when one exists; a quiet dot in Study mode on verses with
a note.

*Fit:* strong. *Effort:* M.

### 14. Listening with the text following

*Seen in:* Dwell (read-along that scrolls with the narrator; one simplified
player; "digital wellbeing" as a goal); Underbelly's BibleProject site
(time-stamped words synced to audio); ESV (named narrators per plan).

*What it is.* A chapter or a psalm read aloud, the current sentence gently
marked as it is read, one player with play, pause and speed, nothing else.

*Why it works.* Dwell's founders are right that the church first received
Scripture by ear, and the table, the car and the reader with poor sight all
benefit. Sync keeps the eye and ear together without a video.

*On LiveWell.* Start with the places where James's voice is the product: his
essays and, if he records them, a few psalms or the Sermon on the Mount. Time
stamps come from the recording at build time (a forced-alignment script),
stored as JSON next to the audio. Whole-Bible audio depends on finding a
recording whose license allows it, which I could not check.

*Fit:* maybe. *Effort:* L.

### 15. Small conveniences that ask once

*Seen in:* STEP (two letters of a book open the reference picker; arrows for the
previous and next chapter; "?" for help; a one-time offer to restore the last
session); YouVersion (Recents).

*What it is.* On desktop, `/` focuses Find, left and right arrows move between
chapters, `Esc` closes the panel; on return, *Continue in John 3* once, then the
offer folds into My Library.

*Why it works.* Serious readers reward a tool that respects their hands and
time; asking once and then going quiet is the grown-up version of a resume
prompt.

*On LiveWell.* The Study Bible page and the planned sticky picker (U37); the
*Continue* line already planned for Home (MASTER-PLAN 3.2) reads the same
position.

*Fit:* strong. *Effort:* S.

**Also considered, not ranked.** First-letter memory practice for a saved verse
(fits as a quiet "Learn it by heart" with no score, but it is outside this
cluster's core and the catechism already plans a recite mode). Multiple linked
reading panels on desktop (STEP, Sefaria): powerful for scholars, too much for
the four audiences. A camera that scans a printed page (Faithlife's companion):
no. Verse images for sharing: see the avoid list.

---

## 5. What to avoid

Each of these is seen in a product above and would betray "Unhurried. Weighted.
Grown-up." or the integrity rules.

1. **Streaks and missed-day counts.** YouVersion's streak is praised by a
   reviewer as its most effective habit mechanic, and a smaller app markets
   "streak counters and milestone badges." The research summary I found says
   breaking a streak is "extra demotivating" and that apps now forgive missed
   days to soften it. LiveWell's rule stands: position, not performance.
2. **Progress shown to others.** Plans where "friends can see each other's
   reading plan progress" turn Scripture reading into a public metric. For a
   skeptic, it is surveillance; for anyone, it is performance.
3. **Verse images and the verse of the day as share-bait.** A single line
   rendered as a picture detaches it from its chapter, the proof-text reflex
   CLAUDE.md names ("a verse is not a missile"). If a verse is shared, it is
   shared as a link that opens in context.
4. **A home feed.** YouVersion's curated *Daily Refresh* feed and any infinite
   list replace the text with a stream. The Study Bible opens on Scripture.
5. **The firehose.** Bible Hub's 25-plus stacked versions and Blue Letter Bible's
   wall of commentaries present volume as depth and put a 19th-century
   devotional beside a modern critical note with no date or tradition. Every
   witness LiveWell shows carries a name, a date and a tradition, and the panel
   shows what exists, not everything that could exist.
6. **Depth behind a paywall or an account.** Bible Gateway Plus, the ESV Study
   Bible subscription, Dwell's subscription, Logos's library, ESV.org and
   Sefaria's account walls for notes. LiveWell's study layer stays free and
   needs no sign-in; personal notes live on the device.
7. **Apparatus before the text.** STEP and Logos are dense by design. On a phone,
   LiveWell's first screen shows the chapter's words, not controls, which is
   the plan's U37 rule.
8. **Video in place of reading.** Overview videos are excellent orientation, but
   the BibleProject app's slow loads and the review that it is "not a full Bible
   reader" show the risk of video becoming the product. LiveWell orients with a
   drawing and a paragraph and keeps the text central; no autoplay.
9. **Motion as decoration.** Underbelly's spotlight hover suits a one-off
   campaign site; in a reader it is noise. Motion only where it carries
   meaning (the mark moving with the narrator), and always under reduced-motion
   settings.
10. **Data art that teaches nothing about the verse in front of you.** The
    cross-reference arc chart is beautiful and copyrighted, and even its remake
    had to collapse to chapters. Canvas zoomable timelines and map libraries are
    already ruled out by the plan; one band per thread is the alternative.
11. **Unlabeled machine-written guidance.** Sefaria labels what appears to be
    AI-assisted guidance; LiveWell has no AI layer in the reader at all, and any
    summary on the page is written and checked by a person.
12. **A platform's indifference to what it hosts.** YouVersion's 2026 petition
    over a disputed translation is the cost of carrying everything. LiveWell is
    an editor: one translation per page, named, chosen.

---

## 6. What I could not see

- Any live page or screenshot of these products; visual design and typography
  are described only where a source described them.
- BibleProject: the current app reader in detail; the app's launch date (sources
  disagree between 2019 and 2023); whether the website has its own reader.
- YouVersion: the current tab structure, how streaks work today, and anything
  official on "Guided Scripture."
- ESV.org: whether there has been a recent redesign, keyboard shortcuts, and
  whether study-Bible notes sit in a side column on the web today.
- Bible Gateway Plus: the note panel's layout and current price.
- Lumina and the Faithlife Study Bible: current interfaces (sources from 2013 to
  2016).
- Blue Letter Bible: the current Tools tab list and the 2022 interlinear
  announcement itself.
- Logos web app: the reader layout in practice.
- Olive Tree: the visual design.
- Dwell: how read-along timing is produced; the former designer's write-up was
  referenced but not retrieved.
- Sefaria: the content of Guided Learning (only the component code).
- OpenBible.info cross-references: the license stated at the source (a
  third-party project says CC BY 4.0; LiveWell's build script records CC BY).
- The license and availability of a whole-Bible BSB audio recording.
- Any usage data showing which study features readers actually use.

---

## 7. Evidence

Web sources, each with what it showed. "Secondhand" marks a third-party or
dated source.

**BibleProject**
- [BibleProject Help Center, reading plans](https://help.bibleproject.com/hc/en-us/articles/5586207821847-Bible-reading-plans): 30+ plans in YouVersion; overview video before each book; theme videos behind links; a psalm a day; *One Story that Leads to Jesus* 358 days, 150+ videos, updated for 2026 with devotional content and reflection questions.
- [BibleProject, video categories](https://help.bibleproject.com/hc/en-us/articles/4479282424087-How-do-I-get-started-with-your-video-library): Themes and Word Studies definitions and examples.
- [BibleProject App page](https://bibleproject.com/app/) and [Help Center app category](https://help.bibleproject.com/hc/en-us/categories/360002902393-BibleProject-App): Journey, Skills, Torah Journey, collecting Scripture links, no account; help-center sections.
- [Christian Post, app launch](https://www.christianpost.com/news/the-bible-project-launches-new-app-with-biblical-storytelling.html): guided reading through movements; "sections of Scripture intended to be understood together."
- [BibleProject, Movements & Links](https://bibleproject.com/videos/collections/movements-links/): definition of movements and links.
- [Life Church Charlotte guide (2022, secondhand)](https://www.lifechurchclt.com/blog/2022/4/22/how-to-use-the-bibleproject-app): Journey tour of the first five books, Skills with Patterns and Style, Storyline order.
- [App Store](https://apps.apple.com/us/app/bibleproject/id1523687027) and [Google Play](https://play.google.com/store/apps/details?id=com.bibleproject): free videos, podcasts, classes; a user report of slow video loads.
- [Learn of Christ app review (secondhand)](https://learnofchrist.com/resources/bibleproject-app): "not a full Bible reader"; overview-level videos.
- [Read Scripture review (secondhand)](https://learnofchrist.com/resources/read-scripture): chronological plan confusion.
- [BibleProject Classroom](https://bibleproject.com/classroom/) and [faith.tools listing (secondhand)](https://faith.tools/app/36-bibleproject-classroom): three or four classes a year; session format.
- [Faraday Institute resource preview](https://faraday.cam.ac.uk/churches/church-resources/posts/resource-preview-the-bible-project) and [Loughborough poster page (secondhand)](https://lbas.lboro.ac.uk/poster/bible-project-poster.html): overview videos end in downloadable posters; poster contents and a reader's practice.
- [Underbelly case study](https://www.underbelly.is/making-it-awesome-with/bibleproject): spotlight hover with Framer Motion; audio-synced text from speech-to-text JSON and HTML5 audio; React Context.
- [Jeremy Spingath portfolio](https://www.jeremyspingath.com/project/bibleproject): product design work on the site's menus ("navigation") and information architecture, 2018 to 2024.

**Blue Letter Bible**
- [BLB help, using BLB](https://www.blueletterbible.org/help/using_blb.cfm): Tools tab lists commentaries and related scriptures per verse.
- [Princeton Seminary KB (secondhand)](https://ptsem.teamdynamix.com/TDClient/72/Portal/KB/ArticleDet?ID=872): Interlinear, Bibles, Commentary, Dictionary tabs and a librarian's assessment.
- [BLB blog, original-language resources](https://blogs.blueletterbible.org/blb/2022/12/29/original-language-resources/) and [interlinear tag](https://blogs.blueletterbible.org/blb/tag/interlinear/): Previous and Next in Tools; inline interlinear; Study menu.
- [Learn of Christ comparison (secondhand)](https://learnofchrist.com/resources/compare/bible-hub-vs-blue-letter-bible): BLB as the more comprehensive free option; Bible Hub as translation comparison.

**STEP Bible**
- Source code, `STEPBible/step` (cloned): `InteractiveBundle.properties` (display modes, quick lexicon, verse vocabulary, comparison, copy, restore strings), `view_sidebar.js` (Lexicon, Analysis, History, Color, Help tabs), `view_quick_lexicon.js` (pop-up contents and counts), `html/*` (maps by period, OT in NT, Gospel harmony, places, plans), `html/keyboard_shortcut.html`, `J_Genealogy` and `J_Chronology` apps.
- [STEP user guide, Bible Displays](https://stepweb.atlassian.net/wiki/spaces/SUG/pages/9797667/Bible+Displays) and [popup options](https://stepweb.atlassian.net/wiki/spaces/SUG/blog/2016/04/12/69074946/Popup+options+while+hovering): hover and click behavior, verse vocabulary, interlinear and color-coding.
- [STEP Quick overview](https://stepweb.atlassian.net/wiki/display/SUG/Quick+overview): "a lot of functionality packed into STEP Bible."
- [Disciples Today review](https://disciplestoday.org/a-brief-review-of-step-scripture-tools-for-every-person/): "extremely organized," popups that keep you on screen.

**Logos and Faithlife**
- [Logos, what is Logos](https://www.logos.com/grow/what-is-logos-bible-study/), [Logos mobile](https://www.logos.com/bible-app), [Logos apps](https://www.logos.com/apps): Factbook, Passage Guide, Insights, Notes and Notebooks, Workflows.
- [Logos support, Bible Sense Lexicon](https://support.logos.com/hc/en-us/articles/360016188011): sense hierarchy and frequency graph by book.
- [Logos, reverse interlinears](https://logos.com/features/reverse-interlinears): word order kept to the English.
- [Reading Acts, Faithlife Study Bible (2013, secondhand)](https://readingacts.com/2013/04/05/free-niv-bible-for-the-faithlife-study-bible) and [Craig Towens review (secondhand)](https://craigtowens.com/tag/app/): linked dual pane, signed notes, infographics, Lexham dictionary floating verse window, camera companion.
- [viz.bible, Envisioning the Next Phase of Bible Applications](https://viz.bible/bible-app-vision): Rouse's "library of resources instead of a set of subjects."

**Bible Gateway**
- [Bible Gateway blog, page options](https://www.biblegateway.com/blog/?p=3893): Page Options, defaults, footnote and cross-reference markers.
- [Bible Gateway blog, reverse interlinear for Plus](https://www.biblegateway.com/blog/?p=54526): interlinear below the English, word entry in a right sidebar.
- [App Store](https://apps.apple.com/app/506512797) and [faith.tools](https://faith.tools/app/132-biblegateway): highlights, notes, sync, iPad side-by-side, Plus contents.
- [selfpublishing.com guide (secondhand)](https://selfpublishing.com/biblegateway-guide/): plans by web, app and email; audio.

**YouVersion**
- [YouVersion blog, What's New September 2026](https://blog.youversion.com/2026/10/whats-new-in-the-bible-app-september-2026-v2/): saved videos, Recents.
- [YouVersion Platform announcement](https://www.youversion.com/news/introducing-youversion-platform): embedded reader, 1,487 Bibles, 36 publishers, 1,283 languages.
- [Bible in a Year review (secondhand)](https://www.bibleinyear.com/blog/youversion-bible-app): plans with friends, progress visible to friends, highlights, sync.
- [APKMirror release notes (secondhand)](https://www.apkmirror.com/apk/life-church/bible/bible-9-19-0-1-release/): Daily Refresh home feed.
- [The Sweet Setup, Catch Me Up](https://thesweetsetup.com/use-catch-feature-youversions-reading-plans/): resets today's reading to the day after the last completed day.
- [Bible Buying Guide (secondhand)](https://biblebuyingguide.com/youversion-bible-app-significant-update/): verse images, Compare Versions, plan discovery by topic.
- [Learn of Christ YouVersion review (secondhand)](https://learnofchrist.com/resources/youversion): streak praised as the most effective habit mechanic.
- [Wikipedia, YouVersion](https://en.wikipedia.org/wiki/YouVersion): 2026 criticism and petition over The Passion Translation.

**ESV / Crossway**
- [Crossway, 12 Things about ESV.org](https://www.crossway.org/articles/12-things-you-might-not-know-about-esv-org/): free account features, 1/2/3 columns, audio, Global Study Bible.
- [Crossway, Reader's Bible experience on ESVBible.org](https://www.crossway.org/articles/the-readers-bible-experience-using-esvbible-org/) and [reader's mode in the app](https://www.crossway.org/articles/untitled-12/): reader's mode and toggles.
- [Crossway, new ESV app](https://www.crossway.org/articles/introducing-the-new-esv-bible-app/), [app FAQ](https://www.crossway.org/articles/esv-bible-for-ios-faq/), [new and improved app](https://www.crossway.org/articles/introducing-the-new-and-improved-esv-bible-app): two-column study view, verse-by-verse mode, pop-up notes, sync, narrators, 50+ plans.
- [App Store, ESV Bible](https://apps.apple.com/us/app/esv-bible/id361797273): cross-references now open in a full-screen-capable sheet.
- [Crossway, ESV Study Bible listing](https://www.crossway.org/bibles/esv-study-bible-bltr/): notes, maps, charts, articles, profiles counts.
- [Justin Taylor, six ways to access ESV plans (2009)](https://blogs.thegospelcoalition.org/justintaylor/2009/12/30/six-ways-to-access-the-esv-bible-reading-plans/) and [Crossway, resources for the new year](https://www.crossway.org/articles/resources-to-help-you-meditate-on-scripture-in-the-new-year): plan delivery channels; narrated chronological and M'Cheyne audio.
- [Learn of Christ ESV.org review (secondhand)](https://learnofchrist.com/resources/esv-org): current toolbar toggles.

**NET Bible and Lumina**
- [NET Bible Full Notes listing (secondhand)](https://www.abebooks.com/9781400337231/NET-Bible-Full-Notes-Edition-1400337232/plp): nearly 60,000 notes typed tn, sn, tc.
- [Bite-sized Exegesis, Lumina review (2016)](https://bitesizedexegesis.com/2016/09/28/review-lumina/): two-pane layout and right-pane contents.
- [App Store, NET Bible (Formerly Lumina)](https://apps.apple.com/us/app/net-bible-formerly-lumina/id687558432): rename and sync.

**Bible Hub**
- [biblehub.com index](https://biblehub.com/index2.html): parallel texts, cross-references, Treasury, commentaries, verse menu of versions.
- [Learn of Christ Bible Hub review (secondhand)](https://learnofchrist.com/resources/bible-hub-app) and [e-n.org.uk review](https://e-n.org.uk/reviews/2022-10-free-bible-hub-help): stacked translations, clickable original words, tools.

**Dwell**
- [App Store, Dwell](https://apps.apple.com/app/id1343917374): voices, translations, read-along, plans, offline.
- [Christian Chronicle Q&A with Joshua Bailey](https://christianchronicle.org/qa-with-dwell-co-founder-joshua-bailey/): listening as the primary historical practice.
- [Dwell blog, streamlined listening player](https://blog.dwellapp.io/?p=534): three goals including digital wellbeing; controls consolidated.
- [Jordan Koschei, Dwell](https://jordankoschei.com/work/dwell/): music-app patterns, accessibility.
- [Dwell help center](https://help.dwellapp.io/article/100-what-is-the-difference-between-dwell-and-other-bible-apps): read-along purpose.

**Olive Tree**
- [Olive Tree help, Resource Guide (Windows)](https://help.olivetree.com/hc/en-us/articles/45582970692365-Windows-Resource-Guide), [Mac](https://help.olivetree.com/hc/en-us/articles/45517172296717-Mac-Resource-Guide), [Android](https://help.olivetree.com/hc/en-us/articles/45629042819341-Android-Resource-Guide), [Study Center](https://help.olivetree.com/hc/en-us/articles/360018338672-Windows-Study-Center): Study Center tabs, lock to follow reading, linked parallel, section toggles, device storage.

**Sefaria**
- Source code, `Sefaria-Project` (cloned): `ConnectionsPanel.jsx` (About this Text, Table of Contents, Search in this Text, Translations, Guided Learning, Resources and Tools lists, counts, hidden empties), `GuideBox.jsx` (Key Questions with answer counts, summaries, AI tooltip import).
- [Sefaria Help, interconnected texts](https://help.sefaria.org/hc/en-us/articles/18613227644316-How-to-Find-Interconnected-Texts) and [connections on the app](https://help.sefaria.org/hc/en-us/articles/19815191391388-How-to-Access-Connections-on-the-Sefaria-Library-App): click or long-press to open; category, then work; stacked panels.

**OpenBible.info and visual references**
- `openbibleinfo/Bible-Geocoding-Data` (cloned): readme (70+ sources, 400+ cited, confidence scale, ten translations), `license.txt` (CC BY 4.0), `ancient.jsonl` (Emmaus candidates with scores).
- [viz.bible, 340,000 cross-references](https://viz.bible/340,000-bible-cross-references-gallery/) and [remaking the visualization](https://viz.bible/remaking-influential-cross-reference-visualization/): expansion of the Treasury; the chapter-level roll-up.
- [CrossRefViz (third-party)](https://github.com/lggcs/crossrefviz): votes and CC BY 4.0 description of OpenBible cross-references.
- [Chris Harrison, BibleViz](https://www.chrisharrison.net/projects/bibleviz/): 63,779 cross-references; non-commercial license.
- [Theographic, About](https://theographic.notion.site/About-Theographic-bb40cb93b1ac43bd98252abce225d530): knowledge graph; CC BY 4.0.
- `client/` and `scripts/build-bible.mjs` in this repo: LiveWell already builds cross-references from OpenBible.info (CC BY).

**Reader's Bibles and memory**
- [Fast Company, redesigning the Bible with readability in mind](https://www.fastcompany.com/3033067/redesigning-the-bible-with-readability-in-mind), [Bible Design Blog, Bibliotheca](https://bibledesignblog.com/blog/2017/6/7/bibliotheca-mon-amour), [Christian Post headline](https://assets.christianpost.com/news/elegant-bible-version-without-chapters-outsells-expectation-by-1100-percent.html): Greene's argument, typeface, volumes, influences.
- [biblememory.com, techniques](https://biblememory.com/scripture-memory-techniques) and [Remember Me, spaced repetition](https://www.remem.me/spaced-repetition): first-letter recall, progressive removal, spaced review (vendor material).
- [mwm.ai, VerseFlow listing](https://mwm.ai/apps/verseflow-bible-reading/6760966209): streak counters and badges marketed.
- [CU Boulder Today, Barasch on streaks](https://www.colorado.edu/today/node/55849): breaking a streak is demotivating; apps forgive missed days (via search summary).

**LiveWell code read for section 1**
- `client/src/App.tsx` (Study Bible routes), `client/src/pages/StudyBible.tsx`
  (front-door doors, verse and word panels), `client/src/pages/study-bible/ChapterNotes.tsx`
  (section list), `client/public/bible/ch/john/3.json` and
  `client/public/bible/notes/john/3.json` (data fields),
  `scripts/build-bible.mjs` (sources and licenses),
  `docs/work/plan/MASTER-PLAN.md` sections 2, 3, 7.1, 8.
