# A. Doctrine and catechesis: how the best teach doctrine to ordinary people, and what LiveWell should take

Prepared 2026-10-27 for the design research cluster "doctrine-catechesis,"
answering James's brief ("the most organized, well-designed website that helps
people to study the Bible, to understand doctrine ... interactive, with things
that draw people's attention ... a useful tool for people to study and learn
and grow"). Companion to `docs/work/plan/benchmark.md`, which placed New City
Catechism, Ligonier Connect, TGC and BibleProject at the level of audience and
strategy, and to the two sibling files in this folder:
`A-bible-readers.md` (the reading surface) and `A-text-study-gold.md` (the
study surface, including "topic and doctrine pages built from sources, sorted
by canon or by time"). This file does not repeat them. It looks at one
question: how the best products teach doctrine to people who are not
theologians, how they present contested doctrines fairly, and how they tie
every doctrinal claim back to the text.

**Method and limits.** Page fetches fail in this sandbox, so no live page or
screenshot was seen. I used 45 web searches aimed at the products' own pages,
app-store listings, publisher descriptions, reviews and press. None of the
products studied is open source. A GitHub search for catechism software
turned up only small hobby apps (the largest has six stars), so there was no
real product code to read. I did read the topic page of Sefaria (already
cloned in the scratchpad for the sibling clusters) for its source-sorting
logic, and I read LiveWell's own doctrine data and pages so that every pattern
lands on something real. Nothing below describes a feature I did not see
described. Third-party and secondhand descriptions are marked. Section 6 lists
what I could not see.

---

## 0. The short verdict

The best doctrine products agree on four habits. They give a **short answer
before the long one**: New City Catechism's adult answer runs "a sentence or
two" past the child's, and the Catholic Catechism closes each unit with an
"In Brief" summary in "condensed formulae" meant to be memorized. They make
**every claim carry its text**: the Westminster Shorter Catechism is printed
"with proofs," the Catholic Catechism puts cross-reference numbers in the
margin, and the Reformation Study Bible's notes sit beside the verse. They keep
**a cadence measured in weeks and years** instead of streaks: 52 questions,
52 Lord's Days, a Catechism in a Year. And they let **more than one voice
speak, in order**: New City Catechism pairs a past preacher with a
contemporary one on every question, and Zondervan's Counterpoints books let
each view answer the others.

What none of them does is the thing LiveWell is already half built to do. The
catechisms state one confession and are not built to show where faithful
churches differ. The question-and-answer sites (Got Questions, the TGC
essays) give one tradition's answer even on second-order questions, and
reviewers say so. The tools that compare traditions honestly (Logos's Theology
Guide) sit behind expensive desktop software. LiveWell already holds 31
doctrine pages that state each position in its own defenders' voice and sort
the question as first-, second- or third-order, beside a 76-question catechism,
62 Study Bible doctrine studies, and 14 creeds with phrase annotations. They
sit on five shelves under five names and barely touch.

So the work is less about adding than about joining and making touchable: one
door for doctrine entered by question, an "In brief" at the top of every
doctrine, the triage drawn as a map a reader can tap, proofs that open at the
clause, two voices on every question (one from the church's memory, one from
now), a side-by-side compare with each view's reply, and a way to learn the
answers by heart with no scoreboard. Section 4 ranks fourteen patterns.
Section 5 names what to refuse, including the AI "priest" one ministry
launched and withdrew within a day.

---

## 1. What LiveWell already has on this ground

Read from the repository on 2026-10-27.

- **The family catechism** (`/family/catechism`, `client/public/family-catechism.json`,
  `client/src/pages/FamilyCatechism.tsx`). Seventy-six questions in six parts
  (God, Creation, and Humanity 13; Sin, the Law, and Our Need 11; Christ and
  Redemption 16; The Spirit, New Life, the Church, and Last Things 12; Prayer,
  the Commandments, and the Christian Life 12; Hard Questions Children Ask 12).
  Each holds `answer`, `kidsAnswer`, one `scripture` reference with its text,
  a `commentary` for the parent, and a `prayer`. A "this week" pick walks every
  question in turn (`client/src/lib/familyCatechism.ts`). The page describes
  itself as "in the New City Catechism tradition." It lives under Family only,
  so the skeptic and the adult Christian never meet it.
- **The doctrine debate pages** (`/theology/doctrine/:slug`,
  `client/public/theology/<slug>.json`, `client/src/pages/TheologyDoctrine.tsx`).
  Thirty-one pages: 5 first-order (christology, divine-attributes,
  god-and-trinity, trinity, problem-of-evil), 20 second-order, 6 third-order.
  Each has a `question`, `whyItMatters`, a `triage` and `triageNote`, a list
  of `positions` each with `inOneLine` and `bestCase` and `keyTexts`,
  `biblicalEvidence` rows with `leansToward`, `hardFor` and `howOthersRead`,
  a `weighing`, `charitableDisagreement`, `relatedDebates`, and
  `furtherReading` sorted by side. This is already the CLAUDE.md contested
  doctrine method in data form, and it is stronger on fairness than anything
  in section 2.
- **The Study Bible doctrines** (`/study/bible/doctrines/:id`,
  `client/public/bible/doctrines.json`, `client/src/pages/StudyBibleDoctrines.tsx`).
  Sixty-two doctrines in ten loci (God Speaks; God; God's Works; Humanity and
  Sin; Christ; Salvation; The Spirit; The People of God; The Life of Faith;
  The Last Things), each with a summary, the Old and New Testament study, key
  texts, the church's confession, where Christians differ, and every verse
  whose note teaches it. Thirty-seven of the 62 link to a debate page through
  a `page` field ("The systematic study of this doctrine, with every major
  view").
- **The creeds** (`/resources/creeds/:slug`, `client/public/creeds/documents/`).
  Fourteen documents; the Nicene Creed carries ten phrase `annotations`
  ("begotten of his Father before all worlds": "Against Arius's slogan ...").
  MASTER-PLAN U44 already plans tap-a-phrase annotations, side-by-side
  versions, and a memorize mode.
- **The glossary** (`/theology/glossary`, `client/public/theology/theology-glossary.json`)
  and **Honest Answers** (`/answers`).
- **The joins already built**: `VerseRef` (link and sheet modes) and live
  Scripture references on family, plans, context guides and creeds (U16), and
  passage lookup in search (U15).

The gap, in one line: a reader who opens the catechism's "Who is Jesus
Christ?" cannot get from there to the Study Bible's incarnation study, the
Nicene phrase that confesses it, or the christology page that shows every view
the early church weighed. The material for the best doctrine experience on the
web is already in the repository. It is not yet one thing.

---

## 2. The products

Each entry: who it serves; how it is organized; its signature features and the
interaction behind them; look and type where described; how it holds attention;
what to steal; what is weak.

### 2.1 New City Catechism (TGC and Crossway; site, app, book)

**Who.** Families and churches, "children and adults alike" (App Store). Tim
Keller wrote it for Redeemer Presbyterian and it was then offered to a wider
evangelical audience (EFCA blog). Free on iPhone, iPad and Android.

**How it is organized.** Fifty-two questions in three parts: God, creation and
fall, law (20); Christ, redemption, grace (15); Spirit, restoration, growing in
grace (17) (EFCA blog). It draws chiefly on the Heidelberg Catechism, with
Calvin's Geneva Catechism and the Westminster Shorter and Larger Catechisms,
and "also looks at some of the questions people are asking today" (EFCA blog).
The website's sections, read from search-result URLs: an Introduction (by
Timothy Keller, per its slug), Mobile Apps, Books, Videos, and Translations
(Japanese, French, Korean, Chinese Simplified, Spanish, Filipino).

**Signature features.**
- *Two registers of one answer.* "The same Catechism is used for both children
  and adults, with the adults learning an additional sentence or two" (EFCA
  blog). A child who learns the short answer has learned the start of the long
  one.
- *Two voices on every question.* "Each question and answer is followed by a
  short commentary taken from the writings or sayings of a past preacher as
  well as a commentary from a contemporary preacher. Each question ends with a
  short, original prayer" (newcitycatechism.com). Contemporary contributors
  include John Piper, Timothy Keller and Kevin DeYoung; historical ones
  include Augustine, John Calvin and Martin Luther.
- *Scripture with every answer,* an ESV reading in the app (App Store).
- *Songs that do the memorizing.* A children's mode with shorter answers and
  "kid-friendly songs," playable "as a playlist with the app in the
  background" (App Store).
- *Videos.* A Tim Keller reading and short explainers such as "The Benefits of
  Catechizing Your Children" (site's Videos page).

**Attention and habit.** One question a week, so it "fits into church
calendars" (EFCA blog). Churches publish their own weekly NCC videos (several
congregations' YouTube series turned up in search), which means the product
travels through congregations.

**Steal.** The nested registers. The paired old and new voice on every
question. The prayer at the end instead of an application. The 52-week shape,
chosen on purpose against Heidelberg's 129 and Westminster's 107.

**Weak.** A catechism confesses one faith and is not built to show where
faithful churches differ. `benchmark.md` notes modest app reach (176 App Store
ratings) and nothing on the world a child walks into. The App Store lists no
privacy practices from Crossway. I could not see the website's question-page
layout (section 6).

### 2.2 The Reformation catechisms online: Westminster Shorter and Heidelberg

**Who.** Presbyterian and Reformed churches and households; the Heidelberg
also serves the continental Reformed churches.

**How they are organized.** The Westminster Shorter Catechism has 107
questions and the Heidelberg 129 (EFCA blog's comparison). The Heidelberg is
divided into 52 Lord's Days, one for each Sunday of the year (app listings
below).

**Signature features.**
- *Proofs printed with the answers.* The OPC publishes "Westminster Shorter
  Catechism with Scripture proofs" (opc.org PDF). Great Commission
  Publications' 32-page edition carries the 107 questions "with Scripture
  references only as proof texts," prepared by an OPC committee in 1978.
- *A historic commentary one click from each question.* shortercatechism.com
  (Bible Presbyterian Church General Synod) hosts Thomas Vincent's commentary
  with a "View commentary" link for each question (seen for Q20, Q21, Q27,
  Q103). Vincent's *The Shorter Catechism Explained from Scripture* is a
  Banner of Truth book; Thomas Watson's *A Body of Divinity* is a sermon
  series on the same catechism.
- *Apps built on the Lord's Day rhythm.* Pilgrim: Bible & Prayer lists a
  52-week Heidelberg reading plan and a catechism browser with "every question,
  every answer, every proof text," whose references open in its Bible reader
  (App Store). The Heidelberg Catechism (RCUS) app offers "three tabs to help
  you memorize all 129 questions and answers" (App Store). A third-party review
  of another free app reports a Lord's Day schedule and a memorization drill
  that "keeps the scripture proofs and the Lord's Day rhythm intact"
  (learnofchrist.com, on two ratings).
- *Commentary by the week.* The Three Forms Podcast takes the Heidelberg one
  Lord's Day at a time; James Visscher's *I Belong* is a commentary organized by
  Lord's Day.

**Attention and habit.** The calendar does the work: one Lord's Day each
Sunday, every year.

**Steal.** Proofs as part of the answer, not a reading list after it. One
historic commentary attached to each question. A proof reference that opens
the verse where you are.

**Weak.** In print, proofs are bare references a reader must look up. The apps
are small and largely about memorizing words, with little on meaning. One
confession's voice throughout, by design. I found no Westminster Shorter
Catechism app with a described feature set.

### 2.3 The Catechism of the Catholic Church online, the Compendium, the Ascension Edition with Catechism in a Year, and YOUCAT

**Who.** Catholics, catechists, converts in formation, and (for YOUCAT) young
people.

**How it is organized.** "Four pillars": the baptismal profession of faith
(the Creed), the sacraments, the life of faith (the Commandments), and the
prayer of the believer (the Lord's Prayer) (vatican.va). A study guide gives
the paragraph ranges: Creed 26 to 1065, Liturgy and Sacraments 1066 to 1690,
Morality 1691 to 2557, Prayer 2558 to 2865 (School of Faith; unofficial).

**Signature features, in the Catechism's own "Practical Directions" (CCC 18 to
22, vatican.va, USCCB flipbook):**
- *Cross-references in the margin*: "italicized numbers referring to other
  paragraphs that deal with the same theme," alongside an analytical index.
- *Small print as a layer*: passages of "an historical or apologetic nature,
  or supplementary doctrinal explanations," and quotations from "patristic,
  liturgical, magisterial or hagiographical sources," are set in smaller type.
- *"In Brief"*: at the end of each thematic unit, "a series of brief texts in
  small italics sums up the essentials ... in condensed formulae," which "may
  suggest ... brief summary formulae that could be memorized." Life Teen calls
  them "Catechism cliff notes."

**The Compendium (2005).** The same four parts in 598 questions and answers
(Part I to Q217; II to 356; III to 533; IV to 598). Fourteen works of
Christian art introduce the parts; publishers describe them as setting "a tone
for each part or section." Each answer carries the numbers of the full
Catechism's paragraphs in its margin, and some Catechism quotations sit in
sidebars (Zenit via gathman.org; publisher listings).

**The Ascension Edition and Catechism in a Year.** The Ascension Edition's
"Foundations of Faith" system gives each of the four parts its own color;
"small colored numbers" beside paragraphs mark color-coded connections between
the pillars; each major section opens with an introduction tying it to
Scripture and Tradition; boxes at the start of each chapter list the relevant
Scripture, councils, liturgy and writers; and colored boxes set off the In
Brief paragraphs (Ascension Press product pages). The *Catechism in a Year*
podcast with Fr. Mike Schmitz read the whole Catechism in 365 daily episodes
from January 1, 2023, with a reading plan offered at sign-up (Catholic World
Report; Ascension). Its early episodes orient the listener before any
content: "Day 2: How the Catechism Works," then "Day 3: What We Believe (Part 1
Introduction)" (transcript titles). The Ascension app holds the Bible and
Catechism text, both podcasts with transcripts and summaries, an interactive
reading plan, highlights, notes, bookmarks, audio speed and text size, and
"linked references and Bible verses"; full access was $8.99 a month or $59.99
a year when Our Sunday Visitor reported it.

**YOUCAT (2011).** A numbered question, a short bold answer, then a plainer
commentary (third-party review). The publisher describes "summary definitions
of key terms, Bible citations and inspiring and thought-provoking quotes from
Saints and others in the margins"; a review mentions cartoon illustrations.
Same four-part structure; 8 by 5 inches, 305 pages (Ignatius Press).

**Attention and habit.** A year with a start date and a host's voice; the
church's own calendar.

**Steal.** In Brief at the end of each unit. Margin cross-references. Small
print as a distinct layer for history and apologetics. Color by part so the
reader always knows where they are. A "sources for this chapter" box. Art at
each part's door. An orientation episode that teaches how to read the book
before the book begins.

**Weak.** The app's full content sits behind a subscription. The 365-day pace
leans on a beloved host to carry 2,865 paragraphs. One magisterial voice by
design. YOUCAT's reported cartoon style would betray LiveWell's grown-up
register.

### 2.4 Ligonier Ministries (Learn site and app, Reformation Study Bible, Tabletalk, Connect, Ask Ligonier, State of Theology)

**Who.** Reformed and broadly evangelical laypeople, small groups, Sunday
school classes.

**How it is organized.** learn.ligonier.org lists Teaching Series, Conference
Messages, a Questions & Answers archive, Devotionals ("short Bible studies and
theological reflections"), Articles, Sermons, Podcasts, a **Topic Index** and a
**Scripture Index**. The free app lets users "browse by topic, teacher, or
Scripture passage," with daily teaching videos and devotional readings, more
than 50 free teaching series, offline downloads, casting and notifications
(App Store).

**Signature features.**
- *Reformation Study Bible notes, free beside the text.* Bible Gateway says
  all the study notes "are available to freely read right alongside
  Scripture," with no membership, shown verse by verse in a side panel (22
  notes on John 3). The print edition, edited by R.C. Sproul, adds
  "theological notes" and cross-references.
- *Tabletalk's daily study.* Each monthly issue has weekday studies and a
  weekend study, usable in personal or family worship. Each holds "a Bible
  passage reference, a selection from that passage printed on the page, a
  devotional commentary on the passage, a brief and concise application
  (called Coram Deo), and a suggestion of Bible passages for further study"
  (Ligonier). Bible Gateway's reprints add "The Bible in a year."
- *Ligonier Connect.* Video lessons with a study guide, "optional quizzes,
  discussion questions, and visible progress at every step"; groups "set a
  custom schedule, track your group's progress, and address questions along
  the way," with in-platform discussion and one community subscription for the
  group; $9 a month (Ligonier). An unofficial forum post mentions a
  certificate after passing an exam.
- *Ask Ligonier.* Launched 2018 as a chat staffed by a team across time
  zones, 24 hours Monday to Saturday, on the site, the app and social channels,
  with answers drawn from Sproul's work, the teaching fellows, the study Bible
  and Tabletalk; Sunday messages answered "within 24 business hours" (Religion
  News Service). Also a podcast of listener questions and live Q&A events.
- *The State of Theology.* A biennial survey with Lifeway Research since 2014
  (2025: more than 3,000 U.S. adults). In 2020 Ligonier invited readers to
  "take the survey yourself or create a private group survey for a group of
  friends or members of your church." A critical article on the 2025 release
  says the data explorer "even includes a link to the 'correct' answers" and
  that the survey was shaped around Calvinist distinctives (Good Faith Media;
  opinionated).

**Attention and habit.** A daily devotional in print and app, a radio and
podcast presence, groups with a schedule.

**Steal.** The Topic Index plus Scripture Index pair. A group schedule a leader
sets once. A human team answering questions. "Take it yourself, or as a
church" for a belief survey. A study note beside the verse it explains.

**Weak.** The course library sits behind a subscription, with quizzes,
progress and (reportedly) certificates. A single tradition throughout, and its
national survey is criticized for scoring Americans against that tradition's
distinctives. The Coram Deo box is, structurally, the clean application turn
CLAUDE.md warns against. I saw nothing describing RefNet beyond its name.

### 2.5 The Gospel Coalition (TGC Essays, the "concise theology" series)

**Who.** Evangelical pastors and laypeople; about 30 million users by TGC's
2023 count (`benchmark.md`).

**How it is organized.** A bounded set: "250 theological essays" in "12 major
categories" such as the Bible, God, salvation and sin, launched in September
2020 (TGC; Andy Naselli's post calls them "250 concise theology essays").
Fred Zaspel proposed and edited the project.

**Signature features.** Free, "not hidden behind a paywall," and
"intentionally written to be understandable and accessible to those without
formal theological education," with few footnotes (TGC; university library
guide). Titles are often the reader's own question: Naselli's six include
"Must Jesus Be Lord?", "What Is Apostasy?", "The Unpardonable Sin" and "Models
of Sanctification."

**Steal.** A finite, edited canon of doctrine pages instead of an endless
feed. Questions as titles. Plain words for people without seminary.

**Weak.** "Generally presented from an evangelical baptist or reformed
perspective" (university guide), so second-order questions get one side's
answer. Many authors, so the voice changes page to page. I could not see the
essay page layout or the twelve category names.

### 2.6 Desiring God (Look at the Book, Biblearc, Ask Pastor John)

**Who.** Evangelical readers who want to see doctrine come out of the text.

**Signature features.**
- *Look at the Book.* Eight- to twelve-minute videos in which the camera is on
  the text, not the teacher: John Piper narrates while his pen "underlines and
  circles words, draws connections, and adds notes," so that viewers see "not
  only what he sees, but where he sees it and how he found it" (Faithlife and
  Logos product pages). Each lab comes with "an outline, study questions,
  principles for Bible reading, and links to relevant articles" (Logos). The
  site lists it as "Interactive Bible study with John Piper"; labs are dated,
  tagged with references, and split into numbered parts (1 Peter 2:9 to 10,
  Parts 1 and 2), from 2015 to 2026 (desiringgod.org/labs listings).
- *Biblearc,* from Bethlehem College & Seminary, where Piper is listed as
  founder-teacher: graphical methods for "arcing" (divide the text into
  propositions and note the logical relationship between them), bracketing,
  phrasing (indent subordinate ideas; arrows, relationship comments, "Dot
  Notes") and sentence diagramming, in Hebrew, Greek and English, with
  published pages, groups and courses that offer personal feedback
  (biblearc.com; app listings).
- *Ask Pastor John.* Since January 2013, listeners email a question with
  their first name and hometown and Piper answers it; past 2,000 episodes; the
  relaunch aimed at four- to eight-minute answers, recent ones run 11 to 16
  minutes; the most-heard episode is on marriage and sex (Desiring God;
  directories; Christian Post on 100 million listens).
- *A usability-first site.* A 2014 account of the 2009 redesign says the team
  made usability the guiding principle and tested the old site and others with
  users (What's Best Next).

**Steal.** Show the work on the text: the reader watches the doctrine emerge
from grammar and connectives. Questions from a named person. Usability tested,
not assumed.

**Weak.** Video carries the method, so it does not work on a quiet phone
screen or for a reader who skims. One teacher's voice. That Biblearc teaches
its methods through courses suggests they need teaching before they help
(my inference).

### 2.7 Got Questions

**Who.** Anyone who types a Bible or theology question into a search engine.
MinistryWatch reports 13 million monthly visitors.

**How it is organized.** A search box; "Top 20 Questions," the 100 newest
articles and "Top 20 Articles" on the home page (2021 review); menu shortcuts
including "How to go to heaven" and "Random"; a weekly email, the Question of
the Week, "a popular and/or relevant article" (gotquestions.org subscribe
page). Apps for iPhone, Android and Alexa (Gazette).

**Signature feature: the question at the grain people ask it.** One doctrine
is many pages, each a question as typed: "What is the Trinity?", "What does
the Bible teach about the Trinity?", "What is the origin of the doctrine of the
Trinity?", "How is the doctrine of the Trinity not tritheism?", "What are some
popular illustrations of the Holy Trinity?", "What is the ontological
Trinity?", "What is Trinity Sunday?" (gotquestions.org search results). URLs
are readable (`/Tritheism-Trinity.html`).

**Process.** More than 10,000 published answers from 200-plus volunteer
writers; staff review for accuracy, final approval by the founder (Logos
listing; learnofchrist review). A conversational tone "with love and grace."

**Steal.** Pages titled as the reader's own question, small enough to answer
one thing. A weekly question by email. A "Random" door that rewards
curiosity.

**Weak.** Reviewers say answers are written from "a broadly evangelical
Protestant perspective," so readers of other traditions "find many answers
framed from outside their tradition"; strong on Bible references, weaker on
other traditions (learnofchrist). Rethinking Hell says its annihilationism
article falls short. Ten thousand answers is a content farm's scale, whatever
the care behind each one.

### 2.8 Theopedia

**Who.** Readers who want a reference entry, not an argument.

**How it is organized.** "An encyclopedia of Biblical Christianity," its main
page sorted into God, Jesus Christ, the Holy Spirit, Church history,
Salvation, End times and the Bible. Entries cover movements (Scholasticism,
Thomism), people (Athanasius, John Bunyan, Robert Letham, Rudolf Bultmann),
groups (the Nicolaitans) and concepts (Substance) (theopedia.com search
results). Closed to public editing (Evangelicals Now review, 2022, "the
Wikipedia of Biblical Christianity"). Text under Creative Commons Attribution
3.0.

**Steal.** People, movements and ideas in one interlinked registry. Reuse of
public-domain reference text with attribution (its Bunyan entry includes
Schaff-Herzog).

**Weak.** Some entries are thin (Substance is "mostly a list of related
philosophy topics"); biographies cite Wikipedia for career facts. Its editors
and approval process were not visible.

### 2.9 Credo House and Credo Courses (C. Michael Patton)

**Who.** Laypeople who want seminary-shaped theology without seminary.

**How it is organized.** Built on Patton's six-course "The Theology Program"
(2001 to 2006); Credo Courses since 2013, with contributors including Gary
Habermas, Doug Groothuis, Daniel Wallace and Darrell Bock and "millions of
course downloads" (credohouse.org). Course pages show audio sessions of about
an hour, a downloadable workbook, a discussion forum, and readings keyed to a
textbook; older pages describe weekly live meetings and prerequisites.

**Signature feature: essentials drawn.** "My ministry is based on pushing
essentials," Patton told a military chapel class (JBER). His blog has a post,
"Distinguishing Between Essentials and Non-Essentials," offering "a chart to
help distinguish" essential (cardinal) from non-essential doctrines, and a
"Charts" category whose posts say "feel free to use." A commenter elsewhere
describes a bullseye: "Essential for Salvation" at the center, then "Essential
for Historic Christian Orthodoxy," "Traditional Christian Orthodoxy,"
"Denominational Orthodoxy," "Important but not Essential," and "Not
Important" (secondhand; labels unverified).

**Steal.** The order of importance drawn as rings a reader can take in at a
glance. Charts free to reuse. A workbook per session.

**Weak.** Hour-long audio. I could not see the chart itself.

### 2.10 BibleProject themes (the doctrine angle only)

`A-bible-readers.md` 2.1 covers BibleProject's reading features. For doctrine:
Themes are a video category; the themes page lists each with a downloadable
"Study Notes" file, sortable by latest or oldest, filtered by Character of God,
How to Read the Bible, Luke-Acts, Torah and Visual Commentary
(bibleproject.com). The study notes are "the foundation" for the videos and
podcasts, and the podcast grows out of the hosts' conversations before each
video. Classroom is "free, self-paced classes" for wrestling with hard
passages; one reviewer calls it seminary weight.

The lesson for doctrine is in the criticism. TGC Australia's review calls
BibleProject "Brilliant but Flawed," and a more partisan critic says it avoids
penal substitution and propitiation. Tracing a doctrine as a theme through the
story is powerful, and confessional readers notice what the story route can
leave unsaid. LiveWell should show both routes for each doctrine: the theme
through the canon (the Study Bible study) and the church's systematic
confession (the creed and the debate page).

### 2.11 Added: Logos Theology Guide

Built on the Lexham Survey of Theology, 234 topics, each with an
introduction, "theologically related passages," recommended reading, and a
list of systematic theologies; a user moves "from one systematic theology to
another," comparing views and surveying related references (logos.com).
With the Systematic Theology Cross-References Dataset, the Passage Guide
"breaks down results according to the denominational affiliation of the
author," sorted by locus (Prolegomena, Theology Proper, Bibliology,
Christology). Included in Silver and up; one product page says the guide is
"not currently available to purchase"; the Systematic Theology Collection is
listed at $2,999.99; a forum user says it keeps defaulting to one older
systematic.

**Steal.** From any passage, the systematic theologies that cite it, grouped
by tradition. From any doctrine, a move between traditions on the same
topic. **Weak.** Price and desktop software.

### 2.12 Added: Zondervan's Counterpoints series (a print format worth stealing)

Each contributor writes an essay defending one view, the others respond, and
the author answers in a rejoinder (publisher description of *Four Views on
Heaven*; reader review of *Two Views on the Doctrine of the Trinity*).
Reviewers value that every chapter is written by someone who holds the view.
This is the response round LiveWell's debate pages do not yet have: the
positions are stated well, but they never answer each other.

### 2.13 Cautionary: Catholic Answers' "Father Justin"

On April 23, 2024, Catholic Answers launched an AI avatar dressed as a priest
to answer Catholic questions. Testers got it to claim it was ordained and could
absolve sins and witness a marriage. Within a day the organization "rendered"
the character as "just 'Justin'" in a button-down shirt; its president said
the aim was never to replace human interaction with priests (America; OSV
News; NCR). A persona that answers doctrine in a pastor's voice will be pushed
until it claims an authority it does not have.

---

## 3. What the best share, and what none does

**Five moves the best make.**

1. *Short answer first, long answer beneath.* NCC's nested registers, the In
   Brief, YOUCAT's bold answer, the Compendium. The short form is the thing a
   reader keeps; the long form earns it.
2. *Every claim carries its text,* and the best let the reader open it in
   place (Pilgrim's proof texts, Reformation Study Bible notes beside the
   verse, CCC margin numbers).
3. *A cadence in weeks and years.* NCC's 52, the Lord's Days, a Catechism in a
   Year, Tabletalk's month. The calendar is the habit; no streak is needed.
4. *More than one voice, in order.* An old voice and a new one (NCC), a small
   print layer for history and apologetics (CCC), each view answering the
   others (Counterpoints), traditions side by side (Logos).
5. *A person behind the answer.* Ask Pastor John's named listener, Ask
   Ligonier's human team. The one bot in this survey failed in a day.

**What none does.** None joins the confession, the contested question, and
the present together. Catechisms bind one confession. Question sites flatten
second-order disputes into one frame. Comparison tools hide behind price. None
speaks to life after Christendom. LiveWell's triaged debate pages already do
the hardest part. The patterns below join them to the catechism and the Study
Bible and make them something a reader can touch.

---

## 4. The patterns most worth bringing to LiveWell, ranked

Ranked by value to LiveWell's readers (skeptic first), weighed against effort.
Effort: S is days, M is a week or two, L is more, with James's reading time
counted. Every pattern uses tokens from `client/src/index.css`, works at phone
width first, and passes the existing gates.

### 1. One door for doctrine, entered by question

**Seen in.** NCC (doctrine taught as 52 questions); the Compendium (each
answer carries the paragraph numbers of the full Catechism); the CCC's four
pillars; Ligonier's Topic Index and Scripture Index.

**What it is.** One place where all of LiveWell's doctrine meets, entered by
the question a person would ask, with every question leading down a fixed
ladder to the deeper material.

**On LiveWell.** A Doctrine row in the Study door (an IA change that needs
James's yes, as in MASTER-PLAN 3.3), landing on one page with three ways in:
*By question* (the 76 catechism questions in the adult register, the
children's answer one tap away); *By the map* (pattern 3); *By the Bible's
order* (the ten loci and 62 doctrines already in `doctrines.json`). Each
catechism question gets its own page (the family page keeps its route and
links to the same pages). Under the answer sits a short ladder, always in the
same order: **In Scripture** (the Study Bible doctrine study, such as
`/study/bible/doctrines/incarnation`), **Confessed** (the creed phrase that
says it, opened at its annotation in `/resources/creeds/nicene-creed`),
**Where Christians differ** (the debate page with its triage badge, such as
`/theology/doctrine/christology`), **Words** (glossary terms). The reader asks
"Who is Jesus Christ?" and, in three taps, is reading what Nicaea said and why
Arius lost.

**Data.** One new joins file mapping catechism number to doctrine ids, creed
phrase ids and glossary terms, with a validator that every question has at
least one doctrine link and every link resolves. Most joins already exist one
level down (37 doctrines already point to a debate page).

**Fit.** Core: it turns five shelves into one subject. **Effort.** M.

### 2. "In brief" first, the long study beneath

**Seen in.** The CCC's In Brief ("condensed formulae" that "could be
memorized"); the Ascension Edition's colored In Brief boxes; NCC (adults learn
"an additional sentence or two"); YOUCAT's bold answer before commentary.

**What it is.** Two to four sentences at the top of every doctrine that a
reader could carry out of the room, before the long study.

**On LiveWell.** A white card lifted on the cream page, eyebrow "In brief" in
mustard, Cormorant Garamond 500 at about 1.35rem, ink text, a Copy button
(`lib/clipboard.ts`) and a "Learn it" button (pattern 9). On the 62 Study Bible
doctrines it states the confession plainly. On the 31 debate pages it states
the triage in sentences: what the church confesses, where faithful churches
differ, where LiveWell lands, "and why, below." In the catechism, where the
wording allows, the children's answer is the opening clause of the adult
answer (NCC's nesting), so the two registers are one sentence.

**Data.** An `inBrief` field, validated for length (60 words or fewer) and
forbidden language. James reads every one.

**Fit.** Core: it serves the seeker on a Tuesday and the skeptic who wants the
claim before the case. **Effort.** S for the component, M for the writing.

### 3. The doctrine map: what the creeds bind, what faithful churches dispute, what is left open

**Seen in.** Patton's essentials rings (secondhand) and his "pushing
essentials"; the Ascension Edition's color per pillar; LiveWell's own triage
field.

**What it is.** The order of importance drawn as three rings that a reader can
take in at a glance and tap.

**On LiveWell.** On the doctrine landing, an inline SVG of three concentric
rings in ink lines on cream. The center ring is the confessional floor named in
CLAUDE.md (the Trinity, the deity and humanity of Christ, the bodily
resurrection, salvation by grace through the cross, Scripture, the life of the
world to come), each pointing to its Study Bible study and creed phrase rather
than to a "debate." The middle ring holds the 20 second-order pages; the outer
ring the 6 third-order ones. Tap a point: a sheet opens with the page's question
and triage note and an Open link. Mustard marks only the selected point. A
plain list below carries the same data in the same order for screen readers
and for anyone who prefers text. The map also shows James his own filing at a
glance: today "problem-of-evil" is filed first-order and the bodily
resurrection has no page of its own, both choices worth his confirming.

**Why it works.** For the doubting Christian, the map is the news that not
every question is a hill. For the skeptic, it shows the platform knows the
difference between what Christianity is and what Christians argue about.

**Fit.** Core. **Effort.** M.

### 4. Proofs at the clause, opened in place

**Seen in.** The Westminster Shorter Catechism "with Scripture proofs" (OPC,
GCP); Pilgrim's proof texts that open in its Bible reader; the CCC's margin
numbers; Reformation Study Bible notes beside the verse.

**What it is.** Each clause of an answer carries the texts that ground it, and
tapping the mark shows the verse without leaving the page.

**On LiveWell.** Today each catechism question has one `scripture` reference.
Split each adult answer into clauses with superscript letters (a, b, c) in
JetBrains Mono at small size; each letter holds one to three references;
tapping opens the existing `VerseRef` sheet with the ESV text. The same
treatment goes to every In brief (pattern 2) and every creed phrase (with
U44's annotations). A reader who doubts "the Son is eternal" taps the letter
and reads John 1:1 and Colossians 1:17 in place.

**Data.** `proofs: [{ clause, refs }]` per answer, every reference parsed by
the single parser in `client/src/lib/scripture-ref.ts`, ESV limits per
MASTER-PLAN 9.4.

**Fit.** Core: it is the CLAUDE.md rule that Scripture "travels with the
quote" made visible. **Effort.** S to M.

### 5. Two voices on every question: one from the church's memory, one from now

**Seen in.** NCC (a past preacher and a contemporary preacher on every
question); shortercatechism.com (Vincent's commentary per question); the CCC's
small print for patristic and liturgical quotations.

**What it is.** Beside James's word on each question, one short, verbatim
witness from the church's long memory.

**On LiveWell.** Each catechism question page gains a block headed "From the
church's memory": one quotation of no more than 80 words from a public-domain
source (Augustine, Athanasius, Luther's Small Catechism, the Heidelberg, the
Westminster standards, Bonhoeffer where rights allow), cited with work,
section, translation and date, set a step smaller in the CCC's manner, with
the witness's name linking to their card in the church history registry
(MASTER-PLAN 7.2). James's existing commentary stays as the voice from now.
Over 76 weeks a family meets dozens of the church's teachers by name, which
answers the "older than my culture" line of the Constitution's final
impression.

**Guardrail.** Every quotation must pass the same integrity gate the history
course uses (U07: excerpts checked against stored public-domain texts in
`scripts/data/history-sources/`). If a quotation cannot be found in a stored
text, it does not ship.

**Fit.** Core. **Effort.** M (sourcing and verification; James reads 76
quotations).

### 6. Compare two views side by side, with each one's reply

**Seen in.** Counterpoints (essay, responses, rejoinder); Logos's Theology
Guide (move between systematic theologies on one topic; passage results
grouped by the author's tradition).

**What it is.** The reader picks two positions and sees them aligned row by
row, including what each says back to the other.

**On LiveWell.** On the 26 second- and third-order debate pages, a Compare
control under "The positions." On a wide screen, two columns; on a phone, two
cards with a fixed header naming both and a swipe or tab between them. The rows
come from data the pages already hold: In one line; The best case; Its key
texts; How it reads the other's key text (`howOthersRead`); The text hardest
for it (`hardFor`). One new field, `reply`, gives each position's answer to
the other in the form its own defenders would sign. James's own landing stays
where it is, in "Weighing," after the reader has seen both sides (the CLAUDE.md
rule that the steelman should not reveal where the author lands).

**Fit.** Strong: it is the most direct expression of "a thoughtful Christian
from the other side ... should finish feeling understood, not beaten."
**Effort.** M (UI S; `reply` writing M).

### 7. Trace the argument: watch the doctrine come out of the grammar

**Seen in.** Look at the Book (camera on the text; pen underlines, circles,
draws connections; an outline, study questions and reading principles with
each lab); Biblearc (phrasing by indentation; arcing propositions by their
logical relationship).

**What it is.** A passage set in phrases, with marks drawn one at a time as the
reader steps through, each mark explained in a sentence or two.

**On LiveWell.** On the Study Bible doctrine studies, for the ten or twelve
passages that carry the most doctrinal weight (for example John 1:1 to 18,
Philippians 2:5 to 11, Colossians 1:15 to 20, Romans 3:21 to 26, Ephesians
2:1 to 10, 1 Corinthians 15:1 to 8), a "Trace the argument" view. The passage
is set as phrases, subordinate clauses indented. The reader taps Next: the
repeated word is underlined, an arc joins "for" to the claim it grounds, a
bracket marks the purpose clause, each with James's sentence beneath. Inline
SVG and text, no video, keyboard operable; with reduced motion every mark
shows at once. The last step shows the whole marked passage with a link to
the doctrine it grounds. It is Look at the Book for a reader with no sound on.

**Fit.** Strong: it teaches the reader to see, which is the Formation
Standard's "better able to see." **Effort.** L (component M; each passage M,
with ESV limits per MASTER-PLAN 9.4).

### 8. The questions people actually ask, answered in place, by a person

**Seen in.** Got Questions (one doctrine split into the questions people type:
what it is, where it came from, why it is not tritheism, which illustrations
fail); TGC essays titled as questions; Ask Pastor John (a listener's first
name and hometown); Ask Ligonier (a human team).

**What it is.** Each doctrine page carries the handful of questions people
really bring to it, each answered briefly with a link into the deeper page,
and a plain way to send James another.

**On LiveWell.** A "Questions people ask" section on each doctrine page: five
to eight questions phrased as typed ("Is the Trinity in the Bible?", "Did
Nicaea invent the deity of Jesus?"), each a short answer of one to three
paragraphs with its own anchor, linking down into the positions and evidence.
The rows feed the Topics index, site search (U15) and `llms.txt`, so a search
lands on the exact question. At the foot, "Ask James a question" opens the
existing contact form with the page named; an answered question may become a
new row, with the asker's first name and town only if they agree. No promised
reply time, and no chatbot (section 5).

**Fit.** Strong. **Effort.** M (content).

### 9. Learn it by heart, without a scoreboard

**Seen in.** NCC's songs and background playlist; the Heidelberg (RCUS) app's
three memorization tabs; another Heidelberg app's memorization drill; the
CCC's In Brief "could be memorized"; a forum's point that word-perfect recall
works better for set texts than loose flashcards.

**What it is.** A short, private drill for any catechism answer, In brief or
creed.

**On LiveWell.** A "Learn it" button on each catechism question, each In
brief and each creed (U44 already plans the creed version by reusing Scripture
Memory's first-letter drill in `client/src/pages/tools/ScriptureMemory.tsx`).
Steps: read it; first letters only; words fading; say it, then reveal. The
children's answer is the default when the family band is set. What the reader
has learned is kept on the device through `lib/storage.ts`
(`livewell-progress-catechism`) and shown only as a quiet "You know these"
list on their own catechism page. No streaks, no reminders, no points. LiveWell
has no music, and NCC's songs are not ours to copy; sung settings are a
question for James, not a feature to fake.

**Fit.** Strong. **Effort.** S (reuse).

### 10. One question a week, kept in step at the table, the study and the church

**Seen in.** NCC (52 questions so it fits church calendars); the Heidelberg's
52 Lord's Days and Pilgrim's 52-week plan; Catechism in a Year; Tabletalk's
monthly issue; Got Questions' Question of the Week.

**What it is.** The same question that week, everywhere it appears.

**On LiveWell.** The "this week" pick already walks the 76 questions in turn.
Make that week's question appear in three places at once: at the table
(`/family`), on the doctrine door ("This week's question," with its ladder from
pattern 1), and on the pastor's one-page sheet (MASTER-PLAN 3.1, "This week at
your table"), so a church can teach the same question from pulpit to table.
Then consider keying the year to the church calendar rather than the plain
rotation: the Trinity questions in the week of Trinity Sunday, the incarnation
in Advent, the resurrection at Easter, with some weeks carrying two questions
so 76 fit the year.

**Fit.** Strong: the cadence is the habit, and the pastor channel carries it.
**Effort.** S.

### 11. Define in place; keep the witnesses in the margin

**Seen in.** YOUCAT (definitions of key terms, Bible citations and quotations
in the margins); the CCC (small print for history and apologetics, margin
cross-references); the Ascension Edition's box of sources at the start of each
chapter.

**What it is.** Technical words stay in the sentence, and their definitions
sit beside it.

**On LiveWell.** On doctrine pages and catechism questions, terms in
`theology-glossary.json` carry a faint dotted underline; tapping opens a
two-line definition with a link to the full glossary entry. On screens of
about 1100px and wider, definitions and short witness quotations sit in a
right margin aligned with their paragraph; on a phone they open in place. Each
doctrine study opens with a small "Sources" box: the key Scripture, the
council or creed, the confession. CLAUDE.md asks for technical vocabulary
"used naturally, never defined condescendingly"; the margin is how a page
does both.

**Fit.** Strong. **Effort.** M.

### 12. End in prayer, not a takeaway

**Seen in.** NCC (every question ends in a short original prayer); LiveWell's
own catechism (each question has a prayer). The counterexample is Tabletalk's
Coram Deo, a brief application paragraph after each study.

**What it is.** A doctrine page closes in prayer that confesses the doctrine,
not in a list of applications.

**On LiveWell.** Each Study Bible doctrine study and debate page ends with a
prayer the church has prayed (a collect or historic prayer, verbatim, public
domain, with its source; for example the Book of Common Prayer's collect for
Trinity Sunday), or a short prayer in James's voice where none fits. No
"three takeaways" box anywhere in the doctrine pages.

**Fit.** Strong: an ending that "leaves weight" and keeps the reader inside
worship, not a checklist. **Effort.** S (quotations verified like pattern 5).

### 13. Where the creeds stand, and where you do: a private self-check

**Seen in.** Ligonier and Lifeway's State of Theology ("take the survey
yourself or create a private group survey" for a church), and the criticism
it drew for linking "correct" answers and for scoring Americans against one
tradition's distinctives.

**What it is.** A short set of belief statements a reader answers privately,
then sees each one placed on the map.

**On LiveWell.** "What do I actually believe?": twelve to fifteen statements,
most on the confessional floor and a few marked plainly as second-order. The
reader answers agree, unsure or disagree. At the end there is no score. Each
statement shows either "The church confesses" with the creed phrase and its
date (Nicaea 325 and 381, Chalcedon 451) or "Faithful churches differ" with
its debate page, and every "unsure" becomes a short reading list. Answers stay
on the device. A pastor can print the statements as a handout with no data
collected. No national figures are printed unless checked against the primary
report (the `benchmark.md` rule).

**Fit.** Maybe: high value to pastors and doubting Christians, with a real
risk of the certainty trade if the copy slips into scoring. **Effort.** M.

### 14. A group session for every doctrine

**Seen in.** Ligonier Connect (study guide, discussion questions, a leader's
custom schedule); Credo Courses (session, workbook, readings); Tabletalk used
in family worship.

**What it is.** One printable page per doctrine that a small group can use
next Sunday.

**On LiveWell.** "Study this with a group" on each debate page: one page with
the In brief, each position in one line, four discussion questions that ask
the group to state each side at its best before judging, three texts, and a
leader's note on keeping second-order disagreement brotherly. Built to PDF by
`scripts/build-pdfs.mjs`, linked to the 68 group study guides where one fits.
No accounts and no group tracking; the pastor is the distribution.

**Fit.** Strong: PCN distribution built in. **Effort.** S to M.

### Also considered, not ranked

- **Art at the doorway of each part** (the Compendium's fourteen artworks).
  One public-domain work of Christian art opening each catechism part, with
  two sentences reading the image. Good, but behind the joins above; rights
  must be checked work by work.
- **A Scripture index for doctrine** (Ligonier's Scripture Index; Logos's
  passage results grouped by tradition). Covered by the sibling cluster's
  "verse as a hub"; the doctrine pages should feed it.
- **Doctrine as a theme through the canon** (BibleProject themes). Covered by
  `A-bible-readers.md` ("threads across the canon"); pattern 1's "In
  Scripture" rung is where it lands.
- **An orientation page before the catechism** (Catechism in a Year's "How the
  Catechism Works"). A short "How to use this" on the doctrine door, folded
  into pattern 1.
- **A human chat** (Ask Ligonier). Beyond what one pastor can staff; pattern 8
  keeps the honest version.

---

## 5. What to avoid

Each would betray "Unhurried. Weighted. Grown-up." or the integrity rules.

1. **A bot that speaks with a pastor's authority.** Catholic Answers' "Father
   Justin" claimed it could absolve and marry and was withdrawn in a day. No
   "Ask James" chatbot, no avatar, and no AI-written answer presented as
   James's.
2. **Scores, "correct answers," quizzes and certificates on belief.** The
   State of Theology explorer's "correct" answers drew criticism; Connect's
   quizzes and reported certificates turn formation into a test. A score makes
   the reader surer of their side, which is the certainty trade.
3. **Streaks, badges, points and push reminders.** The weekly question is the
   rhythm. Progress lives quietly on the device and is never shown as a chain
   to keep unbroken.
4. **One tradition's answer presented as "what the Bible says" on second-order
   questions.** Got Questions, the TGC essays and the State of Theology all
   draw this criticism. Second- and third-order questions stay open, with each
   view stated by its defenders.
5. **Volume as the product.** Ten thousand answer pages from two hundred
   writers is a feed, not a library. Keep a bounded, edited canon (TGC's 250
   is the right instinct) and let every page be James-read.
6. **The application box.** Tabletalk's Coram Deo shows the shape; CLAUDE.md
   names it the clean application turn. Doctrine pages end in prayer or a
   verdict, never three takeaways.
7. **Paywalls around the core teaching.** Connect at $9 a month, the Ascension
   app at $8.99, Logos's guide in paid tiers. Everything doctrinal on LiveWell
   stays free and printable.
8. **Video-first doctrine and the talking head.** Look at the Book works
   because the camera is on the text. Doctrine pages stay text-first and fast
   on a phone; anything drawn is SVG, not autoplay video.
9. **Cartoon styling of adult doctrine.** YOUCAT's reported cartoons suit a
   youth book; on LiveWell the children's register lives in words, not clip
   art.
10. **Capture before content.** No pop-ups, sign-up walls or modal emails on
    doctrine pages. A weekly question email, if James wants one, is an opt-in
    line at the foot.
11. **Invented witnesses.** The two-voice pattern tempts a writer to supply a
    plausible line from Augustine. Every quotation is verbatim from a stored
    public-domain text, or it is cut.

---

## 6. What I could not see

- The New City Catechism website's question pages: whether there is an
  adult/child toggle on the web, how the two commentaries and the video sit on
  the page, and the app's visual design.
- Any Westminster Shorter Catechism app with a described feature set.
- The Vatican and USCCB online Catechisms as interfaces (only the Catechism's
  own printed conventions were described), the Ascension app's screens, and
  whether YOUCAT uses stick figures or a flip-book device.
- Ligonier.org's own Reformation Study Bible reader (only Bible Gateway's
  side panel was described), whether cross-references appear online, Connect's
  screens and any leader dashboard, how Tabletalk's monthly theme ties the
  daily studies together, RefNet beyond its name, and the State of Theology
  explorer's filters.
- The TGC essay page layout and the names of its twelve categories.
- A Look at the Book lab page (only the Logos listing's account of outline,
  questions and principles).
- Got Questions' article structure (summary, related questions, sourcing) and
  any topic index.
- Theopedia's article layout, editorial governance and theological stance.
- Patton's essentials chart itself; the ring labels above are a commenter's.
- Credo Courses' current catalogue and screens.
- BibleProject's theme page layout beyond the list, notes and filters.
- Any design case study for Ligonier, TGC, Got Questions or New City Catechism.
- Whether Logos's Theology Guide is still sold.

---

## 7. Evidence

### Code and data read directly

- LiveWell: `client/public/family-catechism.json` (76 questions, six parts,
  fields), `client/src/pages/FamilyCatechism.tsx` (this-week pick, VerseRef
  link, "in the New City Catechism tradition"),
  `client/public/theology/index.json` and the 31 `<slug>.json` debate files
  (triage counts, position and evidence fields),
  `client/src/pages/TheologyDoctrine.tsx`, `client/public/bible/doctrines.json`
  (62 doctrines, 10 loci, 37 `page` links),
  `client/src/pages/StudyBibleDoctrines.tsx`,
  `client/public/creeds/documents/nicene-creed.json` (10 phrase annotations),
  `client/src/App.tsx` routes, `client/src/lib/siteNav.ts`,
  `docs/work/plan/MASTER-PLAN.md` (sections 1, 3, 7.3, 9.4; units U07, U16,
  U44), `docs/work/plan/benchmark.md` (section 2).
- Sefaria `static/js/TopicPage.jsx` (scratchpad clone): source tabs (notable
  sources, all sources, sheets) with "Relevance" and "Chronological" sorts
  ordered by composition date. Already used by `A-text-study-gold.md`.
- GitHub repository search for catechism apps: only small hobby projects
  (largest six stars); no target product is open source.

### Web sources (reached through search; what each showed)

- [New City Catechism, App Store](https://apps.apple.com/us/app/new-city-catechism/id564035762): 52 Q&A, ESV passage, prayers, devotional commentary from Piper, Keller, DeYoung; children's mode with shorter answers and songs; songs as a background playlist; free; no privacy practices listed.
- [newcitycatechism.com](https://newcitycatechism.com/) and [Mobile Apps](https://newcitycatechism.com/mobile-apps/): a past preacher's and a contemporary preacher's commentary per question; an original prayer per question; historical contributors Augustine, Calvin, Luther; translations list.
- [NCC Introduction page](https://newcitycatechism.com/introduction-timothy-keller/) and [Videos](https://newcitycatechism.com/videos/): introduction by Timothy Keller (slug); Keller reading; explainer videos.
- [EFCA blog on New City Catechism](https://blogs.efca.org/strands-of-thought/posts/new-city-catechism): Keller wrote it for Redeemer; adults learn "an additional sentence or two"; 52 against 129 and 107; three parts of 20, 15, 17; sources; "fits into church calendars"; reading, commentary, prayer and video per entry.
- [OPC, Shorter Catechism with Scripture proofs (PDF)](https://opc.org/documents/SCLayout.pdf) and [GCP edition](https://gcp.org/products/shorter-catechism-with-proofs-opc): proofs printed as references; 1978 OPC committee.
- [shortercatechism.com](https://www.shortercatechism.com/) and [Vincent commentary page](https://shortercatechism.com/resources/vincent/wsc_vi_000.html): "View commentary" per question.
- [Pilgrim: Bible & Prayer, App Store](https://apps.apple.com/app/id6769929244): 52-week Heidelberg plan; every question, answer and proof text; references open in its reader.
- [Heidelberg Catechism (RCUS), App Store](https://apps.apple.com/app/id1443296306): three tabs to memorize all 129.
- [learnofchrist.com, Heidelberg Catechism review](https://learnofchrist.com/resources/heidelberg-catechism): Lord's Day schedule and memorization drill in a free app (two ratings).
- [Three Forms Podcast, Lord's Day 52](https://threeformspodcast.substack.com/p/episode-52-heidelberg-lords-day-52): week-by-week Heidelberg commentary.
- [Vatican, CCC Practical Directions](https://www.vatican.va/archive/ENG0015/__P6.HTM) and [USCCB flipbook](https://usccb.org/sites/default/files/flipbooks/catechism/13): margin cross-references, small print layer, In Brief "condensed formulae ... could be memorized."
- [Vatican, CCC prologue plan](https://www.vatican.va/archive/ENG0015/__P5.HTM): the four pillars.
- [Life Teen, Reading the Catechism 101](https://lifeteen.com/?p=19971): cross-references on almost every paragraph; In Brief as "cliff notes."
- [School of Faith CCC Study Guide](https://schooloffaith.com/s/CCC-Study-Guide.pdf): paragraph ranges per part (unofficial).
- [Compendium via Zenit, gathman.org](https://gathman.org/pipermail/apologetics/2005-June/000715.html) and [publisher listings](https://ctsbooks.org/product/compendium-of-the-catechism-of-the-catholic-church): 598 Q&A, part ranges, 14 artworks, margin paragraph numbers, sidebars.
- [Ascension Edition page](https://ascensionpress.com/pages/catechism-ascension-edition) and [press release](https://ascensionpress.com/blogs/press-releases/press-release-groundbreaking-ascension-edition-catechism-poised-to-reach-even-more-catholics-in-2023): color per part, colored connection numbers, section introductions, source boxes, colored In Brief boxes.
- [Catholic World Report on Catechism in a Year](https://www.catholicworldreport.com/2022/12/20/catechism-in-a-year-podcast-with-fr-mike-schmitz-begins-january-1st/), [Ascension podcast page](https://media.ascensionpress.com/category/ascension-podcasts/catechisminayear), [Day 2 transcript](https://podcasts.happyscribe.com/the-catechism-in-a-year-with-fr-mike-schmitz/day-2-how-the-catechism-works-2026), [Day 3 transcript](https://podcasts.happyscribe.com/the-catechism-in-a-year-with-fr-mike-schmitz/day-3-what-we-believe-part-1-introduction-with-jeff-cavins-2024): 365 days from January 1, 2023; orientation episodes.
- [Our Sunday Visitor on the Ascension app](https://www.oursundayvisitor.com/new-app-promises-to-transform-lives-this-advent/) and [Ascension app page](https://ascensionpress.com/pages/upsell-offer/ascension-app-catechism): app features; $8.99 a month or $59.99 a year.
- [Ignatius Press, YOUCAT](https://ignatius.com/youcat-ycatp) and [learnofchrist.com YOUCAT review](https://learnofchrist.com/resources/youcat): margin definitions, citations and quotations; bold answer then commentary; cartoon illustrations; 8 by 5 in, 305 pp.
- [learn.ligonier.org](https://learn.ligonier.org/): Teaching Series, Q&A, Devotionals, Topic Index, Scripture Index.
- [Ligonier app, App Store](https://apps.apple.com/app/id371390152) and [faith.tools](https://faith.tools/app/ligonier-ministries): browse by topic, teacher, passage; 50+ free series; offline; partner access to 230+ series (third-party).
- [Bible Gateway on Reformation Study Bible notes](https://www.biblegateway.com/blog/?p=24062): notes free beside Scripture, side panel, 22 notes on John 3.
- [Ligonier, using Tabletalk in family worship](https://www.ligonier.org/posts/how-to-use-tabletalks-daily-bible-studies-in-family-worship) and [Bible Gateway Tabletalk reprint](https://www.biblegateway.com/devotionals/tabletalk-coram/2024/02/05): daily study parts, Coram Deo, further study, Bible in a year.
- [Ligonier Connect, grow with your group](https://www.ligonier.org/posts/ligonier-connect-grow-with-your-group) and [save 30%](https://www.ligonier.org/posts/save-30-on-ligonier-connect-for-your-group): study guides, quizzes, discussion questions, visible progress, group schedule, community subscriptions, $9 a month.
- [PuritanBoard on Connect](https://puritanboard.com/threads/ligonier-connect-online-courses.77866/latest): course forums and a certificate after an exam (unofficial).
- [RNS on Ask Ligonier](https://religionnews.com/2018/01/11/ligonier-ministries-launches-ask-ligonier-as-a-24-hour-biblical-and-theological-chat-service/): 2018 chat, hours, channels, sources of answers, 24 business hours on Sundays.
- [Ligonier, State of Theology](https://learn.ligonier.org/articles/state-of-theology), [2020 results post](https://www.ligonier.org/blog/state-theology-survey-2020-results), [Lifeway 2025 report](https://news.lifeway.com/2025/11/18/lifeway-researchs-state-of-theology-insights-report-equips-leaders-to-engage-todays-spiritual-landscape/), [Good Faith Media critique](https://goodfaithmedia.org/ligoniers-state-of-theology-survey-alarms-orthodox-gatekeepers/): biennial since 2014; 3,000+ adults in 2025; take it yourself or as a private group; "correct" answers link; Calvinist shaping (critic).
- [TGC Essays](https://www.thegospelcoalition.org/article/tgc-essays/), [Naselli, 250 concise theology essays](https://andynaselli.com/250-concise-theology-essays), [UNWSP library guide](https://guide.unwsp.edu/bible_theology/theology/online): 250 essays, 12 categories, free, accessible, few footnotes, Zaspel editor, September 2020, Baptist or Reformed perspective.
- [Faithlife, Look at the Book](https://ebooks.faithlife.com/product/54898/look-at-the-book), [Logos, Look at the Book](https://www.logos.com/product/54898/look-at-the-book), [Logos, how to use it](https://www.logos.com/grow/how-to-use-john-pipers-look-at-the-book-in-logos), [DG Labs listing](https://www.desiringgod.org/labs/all.html): 8 to 12 minutes, camera on the text, pen marks; outline, questions, principles, article links; dated, tagged, numbered parts.
- [Biblearc](https://biblearc.com) and [Gospel Translations on arcing](https://en.gospeltranslations.org/wiki/Where_can_I_learn_more_about_the_Bible_study_method_called_%22arcing%22%3F): arcing, bracketing, phrasing, diagramming; propositions and logical relationships; Bethlehem College & Seminary; courses with feedback.
- [DG, behind the scenes at Ask Pastor John](https://www.desiringgod.org/interviews/behind-the-scenes-at-ask-pastor-john), [APJ relaunch](https://desiringgod.org/articles/ask-pastor-john-podcast-relaunch), [Christian Post, 100 million listens](https://www.christianpost.com/news/john-pipers-ask-pastor-episodes-hit-100-million-listens-marriage-sex-question-being-no-1-226293/): since 2013; 2,000+ episodes; name and hometown; 4 to 8 minute aim.
- [What's Best Next on DG usability](https://www.whatsbestnext.com/2014/11/the-meaning-of-usability-for-ministry-websites-why-it-matters-and-how-to-do-it/): usability as the principle of the 2009 redesign; user testing.
- [Got Questions subscribe page](https://www.gotquestions.org/subscribe.html), [Evangelicals Now review](https://www.e-n.org.uk/reviews/2021-09-659442-bible-questions), [MinistryWatch](https://ministrywatch.com/got-questions-reaches-13-million-monthly-visitors-with-biblical-answers/), [Gazette](https://gazette.com/?p=1213568), [Logos Got Questions database](https://www.logos.com/resource/LLS$GOTQDATABASE), [learnofchrist review](https://learnofchrist.com/resources/got-questions), [Rethinking Hell](https://rethinkinghell.com/es/tag/gotquestions-org/): Question of the Week; Top 20 and newest; Random; 13 million monthly; apps; 10,000+ answers, 200+ volunteers, review process; evangelical Protestant framing; annihilationism critique.
- [gotquestions.org Trinity pages](https://www.gotquestions.org/what-is-the-Trinity.html), [origin](https://www.gotquestions.org/origin-doctrine-Trinity.html), [tritheism](https://www.gotquestions.org/Tritheism-Trinity.html): one doctrine as many question-shaped pages.
- [Theopedia main page](https://theopedia.com/main-page), [Substance](https://theopedia.com/substance), [John Bunyan](https://theopedia.com/john-bunyan), [Evangelicals Now on Bible wikis](https://www.e-n.org.uk/reviews/2022-07-bible-wiki): sections, entry types, thin entries, Wikipedia and Schaff-Herzog sourcing, CC BY 3.0, closed editing.
- [Credo House about](https://credohouse.org/about), [Theology Program pages](https://credohouse.org/blog/the-theology-program-courses), [Patton blog index](https://credohouse.org/blog/author/c-michael-patton/page/47), [JBER Bible Boot Camp](https://www.jber.jb.mil/News/News-Articles/Article/290570/jber-chapel-hosts-bible-boot-camp), [Substack comment on the rings](https://greatlywondering.substack.com/p/which-hills-are-worth-dying-on-a/comments): course history and format; essentials chart post; "pushing essentials"; secondhand ring labels.
- [BibleProject study notes, themes](https://bibleproject.com/other-resources/study-notes/themes), [Study Notes article](https://bibleproject.com/articles/study-notes-for-the-bible/), [learnofchrist BibleProject review](https://learnofchrist.com/resources/bibleproject): themes with notes and filters; notes as foundation; Classroom.
- [TGC Australia, "Brilliant but Flawed"](https://acl.asn.au/review-the-bible-project-brilliant-but-flawed/) and [Servants of Grace](https://servantsofgrace.org/the-bible-project-theological-drift/): confessional criticism of BibleProject (the second partisan).
- [Logos Theology Guide](https://www.logos.com/theology-guide), [product page](https://logos.com/product/182947/theology-guide), [cross-references dataset](https://logos.com/product/183794/systematic-theology-cross-references-dataset), [forum](https://community.logos.com:443/forums/t/173727.aspx): 234 topics; compare systematic theologies; passage results by tradition; tiers; "not currently available to purchase"; $2,999.99 collection.
- [Christianbook, Four Views on Heaven](https://www.christianbook.com/four-views-on-heaven/john-feinberg/9780310093886/pd/093886) and [Goodreads, Two Views on the Trinity](https://www.goodreads.com/en/book/show/19800128-two-views-on-the-doctrine-of-the-trinity): essay, responses, rejoinder.
- [America on "Father Justin"](https://www.americamagazine.org/faith/2024/04/25/ai-priest-catholic-answers-laicized-father-justin-247799/), [OSV News](https://www.oursundayvisitor.com/?p=92365), [NCR](https://www.ncronline.org/node/270246): launch April 23, 2024; claims to absolve and marry; persona withdrawn in a day.
- [PuritanBoard on memorization apps](https://puritanboard.com/threads/bible-memorization-apps.114759/): word-perfect recall preferred to loose flashcards for set texts.
