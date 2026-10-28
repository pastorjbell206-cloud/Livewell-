# B. Church history teaching: how the best history products make a long story findable, personal and lasting, and what LiveWell should take

Prepared 2026-10-27 for the design research cluster "church-history-teaching,"
answering James's brief ("the most organized, well-designed website that helps
people to study the Bible, to understand doctrine, to understand what a
post-Christian world is in America, and how to live it ... interactive, with
things that draw people's attention ... a useful tool for people to study and
learn and grow"), read with his church history brief of 2026-10-14 ("the best
church history study available ... very interactive").

Companion to `docs/work/plan/benchmark.md` (which placed Ligonier and Christian
History Institute at the level of audience and named the gap: "Nobody teaches
church history to laypeople as an interactive, primary-source course with a
family edition"), to MASTER-PLAN section 7.2 (the course, the registry, the
session template, the views), and to the A-wave in this folder, whose synthesis
already ranks a drawn band with "you are here" (A pattern 10), honest
uncertainty about dates and places (A 9), sources in history's order (A 23) and
a people-places-events registry (A 24). This file does not repeat those. It
asks a narrower question: **what do the best history teachers on the web and
in print do so that a two-thousand-year story can be entered anywhere, held in
the head, and carried into a life,** and how should the course in 7.2 do it.

**Method and limits.** Page fetches fail in this sandbox, so no product below
was seen live. I used 45 web searches aimed at help centers, publishers' and
editors' own pages, teacher documentation, reviews, conference papers and
press. Two products are open source and I read their code: Knight Lab's
TimelineJS3 and StoryMapJS (cloned into the scratchpad at
`design-src/timelinejs3` and `design-src/storymapjs`: options, JSON format,
FAQ, tips, best-practice notes, a shipped example). I also read Sefaria's
experimental text timeline (`design-src/sefaria/static/js/timeline.js`) from
the clone an earlier run made. Where sources disagree (issue counts, chapter
counts, lesson counts) I say so. Every pattern lands on something in the repo:
`client/src/pages/TheologyHistory.tsx` (today's four tabs: timeline, councils,
heresies, figures), `client/public/theology/church-history-*.json`, the 22
essays in `client/public/history/essays/`, and the U07 sources survey
(`docs/work/plan/units/U07.md`: 136 planned sources, 22 stored, 74 reachable,
16 reachable only in early spelling, 17 not reachable, 7 in copyright).
Nothing here describes a feature I did not see described; section 6 lists what
I could not see. Historical examples in the LiveWell applications are
**candidates to verify** against the stored texts and the registry, never
claims for the site.

---

## 0. The short verdict

The products that teach history best do not win by showing more of it. They
win by choosing a **unit a person can hold** and making every unit open onto
the whole.

Noll's *Turning Points* makes the unit a hinge: thirteen moments, each read for
what changed before and after. Shelley's *Church History in Plain Language*
(over 330,000 copies by its publisher's count) makes it a scene: every chapter
opens with "characters, setting, plot." BBC Radio 4 and the British Museum
made it an object: one thing, fifteen minutes, a hundred weekdays, a world
history. *Christian History* magazine makes it an issue: one theme, a timeline
spread, the FAQs, the quotations, the recommended resources, free for forty
years. The Met's Heilbrunn Timeline makes it a cell in a grid of region by
period, each cell with an overview, key events and up to ten works. Joseph
Priestley, in 1765, made it a line: one life as one bar, so that a reader sees
at a glance who was alive at the same time, with dots where the dates are
uncertain.

The teaching products add the second half: **a way of reading.** Stanford's
*Reading Like a Historian* gives every lesson a central question and a set of
documents, and teaches four moves (sourcing, contextualization, close reading,
corroboration). The OER Project, now the spine of Khan Academy's World History
(June 2026), teaches Three Close Reads (gist, content, then evaluating and
corroborating) and four "claim testers" (intuition, logic, authority, evidence),
and offers the same article at several reading levels. Smarthistory replaced
the textbook's single voice with unscripted conversation because it "reveal[s]
disagreement, emotion, and the experience of looking."

The spectacle products are the warning. Histography's 14 billion years of
Wikipedia dots and the British Museum's WebGL *Museum of the World* drew press
and then stopped: one is unmaintained and ends in 2015; the other was a Chrome
experiment whose only exits led off the site. Lent Madness teaches the saints
by making them compete in a bracket for a "Golden Halo," and its later rounds
move, by design, into "quirks," "legends" and "saintly kitsch."

LiveWell's course (MASTER-PLAN 7.2) already has the right bones: sessions, a
myth check, source cards, the other side, a mirror, retrieval, leader notes,
a registry, a list-first timeline. What it does not yet have is the **unit
grammar** and the **reading method** the best teachers use. The fifteen
patterns in section 4 supply them. The five that matter most: teach the reader
to read a source, not only to see one (pattern 1); hang the two thousand years
on a dozen turning points (2); open every session on a person in a place on a
day, taken from the source (3); draw lives as lines so the reader sees who
lived together (4); and give each session three depths, five minutes, the full
session, and the table (5). Together they make the course the thing
`benchmark.md` says nobody has built, without a streak, a counter or a moving
picture.

---

## 1. Where LiveWell starts, and what this report adds

**Today.** `/theology/history` is a reading page with four tabs (timeline,
councils, heresies, figures) over 7 eras, 68 events, 11 councils, 10 heresies
and 36 people, plus 22 era essays. The timeline tab is era summaries with
buttons that switch tabs. There is no person page, no source beside the story,
no date control, no position in a course.

**Already planned** (MASTER-PLAN 7.2, units U07, U30 to U33, U49, U51 to U65,
U54, U68): nine Parts and about 34 sessions; a session page with a myth check,
the story with source cards and Scripture, "How it looked from the other side,"
"Where we do this too," retrieval questions with no score, discussion, leader
notes, a handout and a strip of events; a connected registry (people, events,
places, councils, controversies, sources) with sheets addressed by query
parameter; a list-first timeline with an era jump bar and filters including
"alive in a given year"; a controversies explorer; an atlas only if James wants
it; a family strand, "the church remembers"; and a verifier that fails any
excerpt not found in its stored public-domain text.

**What this report adds.** Not more features but the grammar inside the
planned ones: what the unit of a session's first screen is (a scene, pattern 3),
what the course's spine is (turning points, 2), what a source card teaches
(four reading moves, 1), how "alive in a given year" should look (lives as
lines, 4), how one session serves a skeptic, a pastor and a child (three depths,
5), how the course becomes a weekly practice without a streak (the church
remembers, 6), how the losing side speaks for itself (facing page, 7), how
every claim says how we know it (8), and how the course's coverage of the
church outside the West is made visible and kept honest (10).

---

## 2. The products

Each entry: who it serves; how it is organized; its signature features and the
interaction behind them; look and type where described; how it holds attention;
what to steal; what is weak. Sources are listed in section 7.

### 2.1 Christian History Institute and *Christian History* magazine

**Who it serves.** Lay readers, pastors and homeschoolers. CHI is a nonprofit
in Worcester, Pennsylvania; it adheres to the Apostles' Creed and is not
aligned with a denomination. A third-party review calls it "a favorite of
pastors, homeschoolers, and curious lay readers."

**How it is organized.** The magazine is quarterly and every issue is built on
one theme (a person, a movement, a region, a question). It began in 1982 as
resource guides for films about figures in church history, went to Christianity
Today in 1989, stopped after issue 99 in 2008, and was revived by CHI in 2011.
The archive is free on the site as PDF and as HTML "with the original images,
sidebars, and timelines intact." Counts differ: Logos lists issues 1 to 155; one
review says 150+ issues, a later one 200+; all agree there is no paywall and no
sign-up.

**Signature features.** Each issue repeats a furniture of sections: a
"Christian History timeline" placing the issue's people and events in 2,000
years; an FAQ; a page of quotations; and "Recommended resources" listing what
the scholars used or endorse. Issue 28 surveyed the whole of church history;
issue 144 (the fortieth anniversary) told it in images. The editors decline
footnotes on purpose: the magazine is for general readers, each issue has a
scholar-advisor, and an editor's column records the house instruction to
"drop footnotes and add anecdotes." The Recommended Resources page stands in
for the apparatus.

**Family edition.** CHI's *Torchlighters* (with Voice of the Martyrs) are
animated biographies for about ages 8 to 12, begun in 2005 with Jim Elliot; 23
episodes include Augustine, Tyndale, Bunyan, Harriet Tubman and Luther. Each
DVD carries a leader's guide with lesson plans and reproducible handouts, a
four-lesson curriculum and a feature-length documentary. The idea came from a
father who wanted his children to have heroes other than athletes.

**Bulletin edition.** *Glimpses of Christian History*, a four-page, full-color
monthly insert on one topic, edited when it was a Christianity Today product
and now sold by Tyndale; a 2009 Reformation21 post recommends it as a cheap
way to bring church history to a congregation. A different body, Concordia
Historical Institute, publishes a "Today in History" series by month and day
that may be "freely reproduced and distributed" with its credit line.

**Look and attention.** Full-color and illustrated; the issue is the habit
(quarterly), and the free archive is the depth. The site itself is described as
"a little dated ... the navigation is plain, the search is plain."

**Steal.** The theme-issue furniture (timeline, FAQ, quotations, resources); one
scholar-advisor per issue; a bulletin-sized edition; the leader's guide and
reproducible handout with every family piece; free, complete and old enough to
be trusted.

**Weak.** Authority without visible sources (a deliberate choice LiveWell
cannot make under its integrity rules); a plain archive with no way to move
through time across issues; hero biography for children that, from the listings,
leans toward the admirable and away from the church's failures (I saw no
episode description of a reckoning).

### 2.2 Ligonier: Godfrey's *A Survey of Church History* and Stephen Nichols

**Who it serves.** Reformed and broadly evangelical adults, church classes and
Ligonier Connect study groups.

**How it is organized.** W. Robert Godfrey's *Survey* is 73 lectures in six
parts by centuries (100 to 600, 500 to 1500, 1500 to 1600, 1600 to 1800, 1800
to 1900, 1900 to 2000), each lecture about 23 minutes; Part 6 has twelve. The
study guide gives each lesson "Lesson Objectives, Message Outline, Study
Questions, Discussion Questions" for individual or group use. Stephen Nichols'
*Christianity in America* is a survey framed as two paths, figures who
"accommodated to the spirit of the age" and others who kept faith with
Scripture ("A Tale of Two Paths"); his Jonathan Edwards course paired five
topical lessons with optional readings from his own guided tour of Edwards.
Connect enrollment was listed at $9 a month.

**Signature feature: 5 Minutes in Church History.** Weekly since August 2013,
about five minutes, now 670-plus episodes, "an informal and informative look"
at people, events and places. Two recurring formats: *on location* ("London on
Location: The English Reformation in 5 Acts," a series confessing "like it's
1559" across European cities) and *in 5 sayings* ("Luther in 5 Sayings,"
"Isaac Watts in 5 Sayings"). There is a companion book.

**Steal.** The study-guide anatomy (objectives, outline, study and discussion
questions), which LiveWell's leader notes already exceed; the five-minute
weekly unit; "X in 5 sayings" as a person format; "on location" as a reason to
name the place.

**Weak.** Lecture video as the main medium; one tradition's reading presented
as the survey; a moral binary (two paths) that flatters the hearer's side;
paid group access.

### 2.3 Smarthistory and *Reframing Art History*

**Who it serves.** Students and teachers of art history; self-learners.
Founded by Beth Harris and Steven Zucker in 2005 as a blog of free museum
audio guides; it became a free, Creative Commons multimedia web-book and long
supplied Khan Academy's art history.

**How it is organized.** Chronologically and by style: a reader picks an era on
a timeline, then chooses among thumbnails of the period's key works. About
4,000 to 5,000 essays and 1,000-plus videos by some 500 contributors. Its
newer *Reframing Art History* is a guided "textbook" in six parts plus an
introduction; each chapter was built by an expert who chose up to twenty
existing essays and videos, wrote two to four guiding questions, and closed
with key terms, "Learn more," and the list of collaborators. Many chapters are
still marked "coming soon."

**Signature feature: the conversation.** Videos are unscripted conversations
between two art historians in front of the object. The founders' paper
("Conversation is the Key," Open Ed 2010) says they chose conversation over
"the impersonal voice of the typical textbook in order to reveal disagreement,
emotion, and the experience of looking," and that it models "close looking and
a willingness to encounter and engage the unfamiliar."

**Steal.** Two voices that can disagree, with the object in view; guiding
questions at the top of a chapter; a curated path through a large free library
rather than more library.

**Weak.** Common Sense notes uneven depth across videos and some flat text
entries; a guided path still half built.

### 2.4 Khan Academy and the OER Project (World History Project, Big History)

**Who it serves.** High-school and AP students and their teachers; free and
CC BY 4.0. Khan Academy's redesigned World History course (late June 2026)
"combines OER Project's comprehensive curriculum with Khan Academy's videos,
articles, and mastery-based practice," with goals such as analyzing primary and
secondary sources across cultures and periods.

**How it is organized.** Big History has ten units "like chapters in a book"
and eight *thresholds*, turning points "when precise ingredients came together
under Goldilocks Conditions"; some units hold several thresholds, some none.
The World History Project pairs each article with a guiding question, Key Ideas
questions, and "Evaluating and Corroborating" questions; readings carry
guiding questions at three stages (skim, while you read, after you read).

**Signature features.** *Three Close Reads*: the first read is a quick preview
for the gist, the second is for content, the third is conceptual ("Evaluating
and Corroborating" in WHP); the team says it is "more like 1¾ reads," and there
are versions for video, data and graphic biographies. *Claim testing*: four
testers, intuition, logic, authority and evidence. *Leveled reading*: through
Newsela, articles exist at several Lexile levels a student can choose, with
audio and Spanish only at the highest level; a teacher's thread shows levels
lagging on new articles. *Scale switching*: moving between the large frame
and the close case.

**Steal.** A named reading method practiced on every text; a short list of
named ways to test a claim; the same article at more than one depth; a few
named thresholds that organize a vast span.

**Weak.** Mastery points and practice scores (Khan's model), which LiveWell's
rules forbid; Lexile is a sentence-length measure, so a lower level is not a
simpler idea.

### 2.5 Google Arts & Culture, and the British Museum's *Museum of the World*

**Who it serves.** Everyone, through more than 1,000 partner museums and
archives (it launched in 2011 with 17).

**How it is organized.** Items, partner-made *Stories*, historical figures
(9,831 on the Explore page) and historical events (661), browsable
alphabetically or on a timeline you drag (a teacher's guide says it starts at
500); a "Daily Digest" of on-this-day items. Figure pages are "selected
collections of pictures accompanied by a biographical synopsis taken from
Wikipedia"; expert-written *Historic Moments* stories go deeper. Partners build
Stories in a Story Editor, which now offers "Help me Write" drafting with
Gemini, and can allow embedding.

**Signature features.** The Art Camera's gigapixel images (a robotic camera
takes hundreds or thousands of close-ups that are stitched into one); Street
View walk-throughs of galleries; timelines of a movement or an artist.

***Museum of the World*** (British Museum with the Google Cultural Institute,
November 2015, built with the studio Weir + Wong): about 4,500 objects on one
screen running from about two million years ago to now, with colored tracks of
dots for Africa, the Americas, Asia, Europe and Oceania; clicking an object
draws lines to related objects. A WebGL "Chrome experiment." Internet
Archaeology's review found it impressive and raising real questions about how
world history is presented, and noted that the only ways off the main screen
were links to the Museum, the Institute and Google's privacy policy. A
teaching listing advises faculty to set context before using it.

**Steal.** Close looking at one high-resolution image; people and events as
first-class doors; a timeline of a single life's work.

**Weak.** Wikipedia synopses as authority; AI drafting for institutions;
color-coded continents; a showpiece canvas with no way into a text.

### 2.6 Knight Lab's TimelineJS and StoryMapJS (code read)

**Who it serves.** Journalists, teachers and archives who want a timeline or
map story from a spreadsheet or JSON, embedded in a page. Showcase titles
include Time's *Mandela: A Life of Purpose*, the Newberry Library's *Midwest
Time Machine*, and Knight Lab's own *Hieronymus Bosch: Garden of Earthly
Delights*.

**TimelineJS structure (from `Timeline.js` and the docs).** A story slider on
top and a "timenav" below it (25% of the height, 40% on mobile, at least 175
px). Each slide may carry a `group` (events with the same group share a row,
labeled at the left edge), a `display_date` that overrides formatting, a
`unique_id` used for `hash_bookmark` deep links and `goToId()`, and an optional
`background`. `eras` label spans of time on the navigation. A `title` slide goes
first whatever its date. Zoom steps through a Fibonacci sequence. Options track
"back_to_start," next, previous and zoom events for analytics. Dates run to the
beginning of time on a "cosmological" scale.

**The tips Knight Lab gives its own users.** "Keep it short. We recommend not
having more than 20 slides." "Pick stories that have a strong chronological
narrative. It does not work well for stories that need to jump around." "Write
each event as a part of a larger narrative." "Include events that build up to
major occurrences, not just the major events."

**StoryMapJS structure (from `StoryMap.js`, `BEST_PRACTICES.md`, an example).**
An *overview* slide shows every marker and the connecting line first; each
later slide flies to one place, and a dashed "history line" keeps the route
already travelled (`show_history_line`, `line_follows_path`). An optional
call-to-action button starts the story. In *gigapixel* mode the "map" is one
huge image: the shipped Seurat example walks a painting from the overview to
"Small Horizontal Brushstrokes," "Complementary Colors" and "Small Dots," each
a zoomed detail with two sentences. The best-practice note distinguishes
*image mode* (markers on hover, no lines, for details with no spatial order)
from *cartography mode* (markers and lines always shown, for movement).

**Steal.** The data model (eras, groups as labeled rows, stable ids that are
also URLs, a title slide); the overview-then-step grammar; "include the
build-up"; "keep it under twenty."

**Weak.** Third-party media embeds, a Google Sheets dependency, analytics
hooks, eased animation and a horizontal timenav that is cramped on a phone;
none of which suits LiveWell's runtime. Borrow the model, not the library.

### 2.7 The Met's Heilbrunn Timeline of Art History

**Who it serves.** Students, teachers, museum visitors; launched in 2000.

**How it is organized.** Four kinds of thing joined by keywords:
*chronologies* (a region in a period, chosen by clicking a map or from drop-down
menus; each has a timeline, an overview, key events and up to ten
representative works), *essays* (more than 1,000, on movements, sites, empires,
themes, media and artists), *works of art* (about 8,000, each placed in time,
place and theme), and *keywords* (movement and style, maker, geography, period,
material, object, subject). A "reboot" renamed the old "timelines" as
"chronologies"; its address is moving under the Met's `/essays` section.

**Steal.** The region-by-period cell as a unit, with a fixed anatomy and a cap
("up to ten works"); a map or a menu as two ways to the same cell; keywords
that let essays, chronologies and objects find each other.

**Weak.** An encyclopedia, not a course: no sequence, no questions, no
position.

### 2.8 World History Encyclopedia

**Who it serves.** Students and general readers; a UK charity, founded 2009 as
Ancient History Encyclopedia, renamed in 2021 as it moved past antiquity; its
founder reported over 136 million users.

**How it is organized.** A menu of Encyclopedia, Index (including by region),
Timeline, Maps and Book Reviews, with Teaching Materials, Quizzes, Primary
Sources and a School Subscription; themed *collections* such as visual guides.

**Signature features.** "Cite This Work" in APA, Chicago and MLA on articles,
images and videos; peer-reviewed articles; audio versions of articles (sources
disagree on how many); translations; an editorial policy on images.

**Weak.** Advertising, with a "Membership: No ads" upgrade and "Remove Ads"
prompts; Common Sense notes thin non-European coverage.

**Steal.** A citation offered on every page, for the student and the pastor
who will quote it.

### 2.9 BiblicalTraining.org

**Who it serves.** Lay leaders to seminarians; free with registration.

**How it is organized.** Four levels (Basics, Foundations, Academy, Institute);
Foundations is nine classes, about 70 hours; Academy nine classes, about 120
hours; certificate programs in a defined sequence with quizzes, a printed
certificate mailed on completion. Church History I (Gerald Bray, Pentecost to
the Reformation) and Church History II (Robert Tuttle). Class notes and
transcripts can be read along and searched; Student Guides for church groups
hold lesson outlines, summaries and discussion questions.

**Steal.** Transcripts beside every lecture; group guides as a free standard.

**Weak.** Audio lectures as the core; certificates as the end of learning.

### 2.10 Ryan Reeves' lectures (Gordon-Conwell, now Kairos Pacific)

**Who it serves.** Seminarians and a large public audience on YouTube.

**What it is.** A 55-lecture playlist on early and medieval history (about 30
minutes each) and 39 lectures on the Reformation and modern church, plus short
biographies of 6 to 8 minutes. A listing site calls them "more careful and
nuanced than some other introductory resources." Ligonier also lists him as a teacher.

**Steal.** The short biography beside the long lecture: two depths of one
subject.

**Weak.** A wall of videos with no text, map, or sequence beyond playlist
order; I could not see slides, subscriber counts or format details.

### 2.11 Histography

**What it is.** Matan Stauber's 2015 final project at Bezalel: every Wikipedia
event as a dot on a 14-billion-year timeline; zoom from decades to millions of
years; category filters make the non-matching dots "roll away"; a click opens
the Wikipedia entry and related events; a spiral of "the most notable events."
Earlier designs were 3-D and map-like.

**Weak, and instructive.** Its own subject is the density of Wikipedia, not
history; FlowingData notes it only counts what Wikipedia holds; a university course
review found it unmaintained, its links failing, and nothing after 2015; at
launch it worked in Chrome and Safari only.

**Steal.** Only the honesty of its premise: what a timeline shows is what its
sources recorded. LiveWell's coverage grid (pattern 10) makes that visible on
purpose.

### 2.12 Noll's *Turning Points*, with Shelley's *Church History in Plain Language*

**Noll.** *Turning Points: Decisive Moments in the History of Christianity*
(Baker; third edition) tells the whole story through a small number of hinges.
Reviews of the third edition describe 13 chapters and an afterword
(publisher listings say "fourteen key moments"; the counts conflict). Chapters
I could confirm: 1, the fall of Jerusalem and the church cast into the world;
2 and 3, Nicaea and Chalcedon with Constantine and church-state tension; 4,
monasticism and Benedict's Rule; 5, Charlemagne's coronation and papal
authority; 7, the Diet of Worms; 13 (new), Vatican II and the Lausanne Congress.
Each chapter ends with further reading.

**Shelley.** Eight ages (Jesus and the Apostles; Catholic Christianity; the
Christian Roman Empire; the Christian Middle Ages; the Reformation; Reason and
Revival; Progress; Ideologies). Every chapter opens "like a skilled
screenwriter ... with three elements: characters, setting, plot," a real person
in a real place acting or being acted upon, before widening to the age.
Praised for balance and plain language; criticized for value judgments in its
"we" language. The fifth edition (2021) adds Asia, India and Africa.

**Steal.** The hinge as the spine (Noll); the scene as the door (Shelley);
named ages that are memorable because there are few of them.

### 2.13 Added: *Reading Like a Historian* (Stanford History Education Group, now Digital Inquiry Group)

Free document-based lessons (counts given as 73 and as 100-plus), each built
on a central historical question and a small set of primary documents adapted
for a range of readers. Students practice the four moves Sam Wineburg found
historians use and others do not: *sourcing* (who made this, why, for whom, can
it be trusted), *contextualization* (what was happening), *close reading* (what
it argues and how), *corroboration* (what other documents say). A Historical
Thinking Chart gives what each move looks like and sentence frames. **Steal:**
the four moves, named, practiced on every source, and a single question per
lesson.

### 2.14 Added: *A History of the World in 100 Objects* (BBC Radio 4 and the British Museum)

From January 18, 2010, twenty weeks of fifteen-minute weekday episodes, each on
one object in the Museum, with specialist interviews, music and quotations;
objects from the same period grouped to explore a theme and make connections
across the world. Won the 2011 Art Fund Prize for the Museum; a book (2010) and
a touring exhibition (2016) followed. A reviewer notes it reached "a kind of
cult status" as radio about objects the audience could not see. **Steal:** one
thing per episode can carry a world history; a fixed, short, daily or weekly
slot.

### 2.15 Added: Priestley's *A Chart of Biography* (1765)

A companion to Priestley's lectures: about 2,000 lives from about 1200 BC to
1800, each a bar, in six categories (statesmen and warriors, poets and artists,
and others), so lifespans can be compared across the whole. The University of
Oregon's Time Charts project reports a solid line where dates are certain and
dots for degrees of uncertainty. Followed by the *New Chart of History* (1769).
**Steal:** lives as lines; uncertainty drawn, not hidden.

### 2.16 Added: ORBIS, the Stanford Geospatial Network Model of the Roman World

Walter Scheidel and Elijah Meeks' route planner for antiquity about 200 CE:
choose origin, destination, season and mode (fourteen road modes, river boats,
two kinds of sailing ship) and it estimates time and cost over some 630 to 750
sites, about 84,600 km of roads and 28,300 km of rivers and canals, with
sailing times taken from ancient sources. **Steal:** the one interaction that
makes distance in the ancient church felt ("how long did a letter take?"),
cited as a model, not a fact.

### 2.17 Added: the calendar of witnesses (Episcopal commemorations, Concordia's "Today in History," Lent Madness)

The Episcopal Church's *Lesser Feasts and Fasts* gives each optional
commemoration a short biography, a collect and readings; *Holy Women, Holy Men*
(2010) expanded it; a 2022 General Convention resolution asks for its revision
as *A Great Cloud of Witnesses*. Concordia Historical Institute's "Today in
History" (Lutheran) is freely reproducible with credit. *Lent Madness* (begun
2010 by Tim Schenck, run with Forward Movement) posts two saints each Lenten
weekday for a 24-hour vote; rounds move from biography to "quotes and quirks"
to legends to "saintly kitsch," and the winner takes the "Golden Halo"; it
ships bulletin inserts. **Steal:** the date as the door to a person, a
biography with a prayer and a reading, and a reproducible sheet. **Refuse:**
the vote.

### 2.18 Added: Dictionary of African Christian Biography (DACB)

An online, interconfessional dictionary "exploiting the full range of oral and
written records," in English with growing French, Portuguese and Swahili
entries; 105 participating institutions in twenty African countries with
liaison coordinators; training seminars where each participant writes one
biography; author guidelines ask for 500 to 3,000 words and categories that
begin with given and family names, kinship and ethno-linguistic group, and
birth. **Steal:** a people template that does not assume a Latin name, a
bishop's see and a written corpus; local sources treated as sources.

### 2.19 Added: the Searchable Museum (Smithsonian NMAAHC)

Launched November 18, 2021, its first exhibition the museum's *Slavery and
Freedom*, built by the Baltimore firm Fearless with UMBC alumni and funded by
Bloomberg Philanthropies. It adapts the gallery's narrative structure and tone
for self-paced visits, with recreations (the History Elevator, the slave-ship
displays), videos, podcasts, research material and "Lesser-Known Stories."
**Steal:** the reckoning told as the museum tells it, from sources and
objects, with the lesser-known people given their own door. **Not at
LiveWell's scale:** the recreations.

### 2.20 Added: Sefaria's text timeline (code)

`static/js/timeline.js` dates every linked text by its composition date minus
its error margin, then partitions a passage's links into **past, concurrent and
future**, recursively, to draw what a text drew on and who answered it; it
drops commentary branches that lead nowhere. Topic pages show a person's
period name and year range; the admin editor sorts authors into named eras.
**Steal:** a dated reception list on every source and council.

---

## 3. What the best of them share

Six moves recur across products that otherwise have little in common.

1. **A unit a person can hold.** A hinge (Noll, Big History's thresholds), a
   scene (Shelley), an object (100 Objects), an issue (*Christian History*), a
   cell (the Met), a line (Priestley). Each is small enough to finish and
   shaped so it opens onto the whole.
2. **Few, named divisions.** Eight ages, six parts, ten units, thirteen hinges.
   Memorable because there are few, and named for what happened rather than
   numbered.
3. **A method of reading taught once and used everywhere.** Four moves
   (Stanford), three reads and four claim testers (OER), close looking in
   conversation (Smarthistory). The method is the transferable thing; it is
   what lets a reader apply the course to a source it never mentioned, which
   is CLAUDE.md's Formation Test.
4. **The source in view.** The object on screen while two historians talk; the
   documents in the lesson; the quotation page in the magazine; the gigapixel
   detail. Where the source disappears (lecture walls, Wikipedia synopses), the
   teaching flattens.
5. **More than one depth.** The five-minute podcast beside the 23-minute
   lecture; the six-minute biography beside the thirty-minute lecture; Lexile
   levels; the children's animation with its leader's guide; the bulletin
   insert beside the quarterly.
6. **A date as a door.** The commemoration, the daily digest, "Today in
   History." The products that build a habit around dates do it with the
   church's oldest tool, the calendar, and the cheap versions turn it into
   trivia or a contest.

What the weak ones share is the inverse: **density as the message** (Histography,
*Museum of the World*), **a single voice with no sources** (lecture walls, the
footnote-free magazine), and **engagement borrowed from games** (brackets,
mastery points, certificates).

---

## 4. The patterns worth bringing to LiveWell, ranked

Ranked by value against James's brief and the brand, then by effort. "Fit" is
core (the course is not world-class without it), strong, or maybe. "Effort" is
S (days), M (a unit), L (more than a unit). Each names the page and what the
reader does, and the planned unit it belongs in.

| # | Pattern | Fit | Effort | Lands in |
|---|---|---|---|---|
| 1 | Read the source like a historian | core | M | U32 session, U30 source records, Part 0 |
| 2 | Turning points as the spine | core | S to M | U31 front door, U30 events |
| 3 | Open on a person, a place, a day | core | S | U32 page head, U33 slice |
| 4 | Lives as lines: who was alive together | core | M | U31 timeline |
| 5 | Three depths of one story | core | M | U32, U49 |
| 6 | The church remembers this week | core | M | U30 people, U31, U49, handouts |
| 7 | Let both sides speak: the facing page | strong | M | U32, U54 |
| 8 | How do we know? Evidence on every claim | core | M | U30, U31 filters, Part 0 |
| 9 | One thing, looked at closely | strong | M | U32, U30 objects |
| 10 | The region-by-Part grid, empty cells shown | strong | S to M | U31 front door, U30 |
| 11 | Each Part as an issue | strong | S to M | U31 Part openers |
| 12 | Before and after this text | strong | M | U30, U54, source sheets |
| 13 | A person in five sayings | strong | S | U30 people sheets |
| 14 | The question the session answers | core | S | U32 page head and close |
| 15 | The journey: overview first, then the road | maybe | M to L | U68 (gated) |

### 1. Read the source like a historian

**What it is.** Every source card in a session does more than show an excerpt.
It teaches the reader to read it, using four named moves practiced on every
card: *Who wrote this, when, to whom, and why?* (sourcing). *What was happening
around it?* (context). *What does it claim, and how?* (close reading). *Who else
saw it, and do they agree?* (corroboration). Where two or three stored sources
describe the same event, a **Compare the witnesses** block sets them side by
side in the order they were written, with the gap from the event stated.

**Seen in.** Stanford's *Reading Like a Historian* (the four moves; a central
question; documents adapted for different readers); OER's Three Close Reads
(gist, content, evaluating and corroborating; "more like 1¾ reads"); the
WHP's "Evaluating and Corroborating" questions; Smarthistory's "close looking."

**Why it works.** Information about the church fades; the habit of asking who
wrote this and why does not. It is the transferable skill the Formation Test
asks for (the reader can apply it to a situation the course never named), and
it is the skeptic's own instinct, honored rather than managed. It also makes
the integrity rule visible: the reader watches the course check itself.

**On LiveWell.** Session pages (`/theology/history/session/:slug`, U32): each
source card gets a closed **Read it closely** disclosure with the four prompts
as small-caps labels, a pause ("Think about it, then open James's reading"),
and two to four sentences labeled as James's reading. Part 0, *How to Read the
Dead*, teaches the four moves once on a single source; every later card reuses
the same four labels, so by Part II the reader does it unprompted. The **Compare
the witnesses** block for the U33 slice has two ready candidates in the stored
corpus, both to verify: Pliny's letter to Trajan (10.96, 10.97) beside
Tertullian's *Apology*, which discusses that letter; and for Thessalonica,
Ambrose's Letter 51, Theodoret's *Church History* Book 5 and Augustine's *City
of God* 5.26, ordered by when each was written, so the reader can see which
details appear only in the later accounts. No score; the reader's notes stay
on the device. Data (U30): each source record gains `written` (a date with a
margin, as Sefaria stores it), and a session block of `type: "compare"` lists
two or three source ids for one event. Validator: every James reading under 80
words and labeled; every compared source has a `written` date.

**Fit, effort.** Core · M (the component is small; the readings are writing).

**Evidence.** AHA and Common Sense on SHEG; Teaching Civics on the Historical
Thinking Chart; OER Project blog posts and AP syllabus; Harris and Zucker,
"Conversation is the Key"; U07 manifest (Pliny, Tertullian, Ambrose 51,
Theodoret 5, Augustine 5.26 stored).

### 2. Turning points as the spine

**What it is.** The two thousand years hung on a dozen or so named hinges, each
with a short sheet: *The world before*, *What happened* (date, place, people,
one source line), *The world after*, *What we still carry*, and *The road to
it*, three to five build-up events. Parts begin at hinges.

**Seen in.** Noll's *Turning Points* (13 chapters and an afterword in the
third edition, by reviews); Big History's eight thresholds organizing ten
units; Shelley's eight named ages; TimelineJS's advice to "include events that
build up to major occurrences, not just the major events."

**Why it works.** A reader cannot hold 170 events; he can hold twelve hinges
and hang the rest on them. A hinge also teaches cause, which is the CLAUDE.md
requirement to reach "the full historical arc" rather than the proximate cause:
the road to Worms begins well before 1521.

**On LiveWell.** The course front door (`/theology/history`, U31): above the
Parts, the A-synthesis band component (pattern 10 there) running from AD 30 to
now, with one tick per hinge and a label beneath; past the reader's last
session in `--ink-muted`, the rest in `--ink`, one mustard tick for "you are
here." Tapping a tick opens the hinge sheet (`?hinge=worms-1521`). Below the
band, the same hinges as an ordered list (the equivalent for screen readers and
narrow phones). Candidate hinges, drawn from the plan's own Parts and to be
verified and chosen by James: Jerusalem 70, Constantine 312 to 313, Nicaea 325,
Chalcedon 451, Benedict's Rule, 1054, Worms 1521, Schleitheim 1527, Westphalia
1648, the awakenings, the slave trade and abolition, Barmen 1934. Data:
`events.json` entries gain `hinge: true`, `before`, `after`, `carry` and
`road[]` (event ids). Validator: at most fifteen hinges; every hinge has a
source line.

**Fit, effort.** Core · S to M.

**Evidence.** Themelios and Pneuma Review on *Turning Points*; OER Project
Big History unit guide; publisher and reviews of Shelley; TimelineJS
`_overview.njk` tips.

### 3. Open on a person, a place, a day, taken from the source

**What it is.** The first thing under a session title is a dated scene: a real
person in a real place doing or suffering something, in one or two sentences
set in Cormorant, with a small strip beneath (*Place · Date · Source*) that
opens the source card. Then the scene in a paragraph or two, then the myth
check, then the widening.

**Seen in.** Shelley ("characters, setting, plot" at the head of every
chapter); *Christian History*'s house rule to "drop footnotes and add
anecdotes"; 100 Objects' single thing per episode; StoryMapJS's overview then
first location.

**Why it works.** The skeptic and the seeker both enter through a person, not
a period. It also satisfies CLAUDE.md's demand for "specific historical dates
and events" on the first screen, and it is the honest form of a hook: the
scene is in the source, so nothing is invented to make it land.

**On LiveWell.** U32 page head; the U33 slice would test it on Rome (a
candidate: the Martyrdom of Polycarp's scene before the proconsul, stored by
U07; chapter numbers to verify) and on Thessalonica (Ambrose's letter). Rule,
enforced by the session validator: `scene.source` must resolve to a registry
source and `scene.excerptId` to a verified excerpt; no interior thoughts or
dialogue that the source does not give; no first person for James. The same
opener heads hinge sheets (pattern 2) and Part openers (pattern 11).

**Fit, effort.** Core · S.

**Evidence.** Shelley reviews and publisher copy; CHI editor's column and
"Why Christian History doesn't use footnotes"; BBC and Wikipedia on 100
Objects; StoryMapJS `StoryMap.js` and the Seurat example.

### 4. Lives as lines: who was alive together

**What it is.** A view of the timeline where each person is a hairline from
birth to death, solid where both dates are attested, dotted at an uncertain
end, grouped in labeled rows by region. A year control moves one vertical rule,
and a list beneath answers "Alive in this year," with ages.

**Seen in.** Priestley's *Chart of Biography* (1765; lives as bars; solid for
certain, dots for uncertain, per the Oregon project); TimelineJS's `group`
rows labeled at the left edge; the Met's regions side by side; *Museum of the
World*'s tracks by continent (without its colors).

**Why it works.** Contemporaneity is one of the hardest things for a reader to
hold and one of the most clarifying: that Augustine, Jerome and Chrysostom
were alive in the same decade, or that Wesley and Edwards overlapped, changes
how each is read. Drawing uncertainty as dots is A pattern 9's honesty, made
visual.

**On LiveWell.** `/theology/history/timeline?view=lives&year=386` (U31). It is
the plan's "alive in a given year" filter made visible, and it replaces a
separate contemporaries view, as the plan already intends. Inline SVG from
tokens: lines in `--ink`, dotted ends in `--ink-muted`, the single year rule in
mustard. The year control is a number field with step buttons (not drag-only),
keyboard operable; the URL holds the year so a teacher can send "who was alive
in 1521." Under 600 px the drawing collapses to the list with small bars. A
person's line opens the person sheet. Data: `people.json` gets `born` and
`died` each as `{year, certainty: "attested" | "about" | "unknown"}` and a
`region`. No library, no zoom canvas.

**Fit, effort.** Core · M.

**Evidence.** Wikipedia, History of Information, NEH and the University of
Oregon on Priestley; TimelineJS JSON format docs and FAQ (groups); Met TOAH
about page; Internet Archaeology review of *Museum of the World*.

### 5. Three depths of one story

**What it is.** One switch under each session title: *In five minutes · The
session (about 25 minutes) · At the table*. The five-minute version is a 350 to
500-word précis with the same claims and the same sources (cards collapsed),
ending on the session's question. The table version is the family devotion for
that session.

**Seen in.** OER Project's articles at several Lexile levels; Ligonier's five
minute weekly podcast beside 23-minute lectures; Reeves' 6 to 8-minute
biographies beside 30-minute lectures; CHI's quarterly magazine beside its
bulletin insert and its children's animation with a leader's guide.

**Why it works.** It serves the four readers without changing the truth for
any (CLAUDE.md's Audience Standard): the pastor deciding whether to use a
session, the skeptic who wants the claim before the story, the reader with
twenty-five minutes, the family with ten. It also gives the course a door that
is not a commitment.

**On LiveWell.** Session page (U32) and the U49 "church remembers" strand
(which then becomes the session's own table depth, not a separate piece).
`?depth=short|full|table`; the last choice remembered on the device through
`lib/storage.ts`. The handout (planned) prints the five-minute version on one
side. Validator: every claim id in the short version also appears in the full
session, so the short one is never a different story; the table version keeps
the reckoning sessions' hard part (no hero-only retelling, see section 5).

**Fit, effort.** Core · M (about 15% more writing per session).

**Evidence.** OER reading guide and community threads on leveled articles;
Ligonier pages on *5 Minutes* and the *Survey*; listings of Reeves' lectures;
CHI's Torchlighters and Glimpses listings.

### 6. The church remembers this week

**What it is.** Each person in the registry who has a traditional day of
remembrance (or, failing that, a known death date) is remembered on it. A
quiet weekly line names who: "This week the church remembers Polycarp of
Smyrna." It opens a short card: a 150-word life, one line in their own words
(verified), one Scripture reading, the session where they appear, and, where
their own source preserves one, their own prayer. A half-page "Print for your
bulletin" sheet is free to reproduce with credit.

**Seen in.** *Lesser Feasts and Fasts* and *Holy Women, Holy Men* (a
biography, a collect and readings per commemoration; the revision now titled
*A Great Cloud of Witnesses*); Concordia Historical Institute's "Today in
History," freely reproducible; *Glimpses* as a bulletin insert; Google's Daily
Digest (for the shape only).

**Why it works.** It is the church's oldest way of making history a practice,
and it builds a habit with no streak: the date comes round whether or not the
reader did anything. It ties the course to the church year the plan already
honors (Advent, Lent, Easter). Framed for a Baptist reader through Hebrews
12:1 ("so great a cloud of witnesses"), it is remembrance, not veneration. And
it puts a reason to visit the history study in every week of the year.

**On LiveWell.** Data (U30): `people.json` gets `remembered: {date: "MM-DD",
basis: "traditional" | "death"}`. A line on `/theology/history` (after mount,
from the generated year map, never the network) and in The Table's week
(U49). The card is the person sheet's head. A timely first test: Lent 2027
begins February 10 and Part I goes live by March 12, and the Part I witnesses
Polycarp and Perpetua and Felicity are traditionally remembered in that window
(dates to verify against the calendar chosen). The prayer is the witness's own
words from a stored text where one exists (the Martyrdom of Polycarp contains a
prayer; chapter to verify), otherwise a psalm. Never copy collects from
*Lesser Feasts and Fasts* or *Holy Women, Holy Men* without checking the
publisher's rights. No count of weeks remembered, no reminder push beyond the
existing `lib/calendar.ts` "add to calendar" the reader chooses.

**Fit, effort.** Core · M.

**Evidence.** Wikipedia on *Lesser Feasts and Fasts*; Church Publishing on
*Holy Women, Holy Men*; Episcopal Archives resolution 2022-A010; Concordia
Historical Institute; Reformation21 and Tyndale on *Glimpses*; Educators and
TechWell on Google's Daily Digest.

### 7. Let both sides speak in their own words: the facing page

**What it is.** Where a stored source exists for the losing or opposing side,
"How it looked from the other side" becomes a facing page: two verbatim
excerpts side by side on a wide screen and stacked on a phone, the losing side
first, each with author, date and translator; one line on *what each feared*;
then James's verdict below both, labeled.

**Seen in.** Smarthistory's conversation (disagreement shown, not summarized);
Stanford's corroboration; *Christian History*'s quotation pages; the
controversies explorer the plan already intends.

**Why it works.** The plan's steelman rule ("in the form its defenders would
sign") is best met by the defenders' own signature. It is Smarthistory's
second voice without inventing a speaker, and it is the strongest thing the
course can show a skeptic: the losers quoted fairly by the winners' heirs.

**On LiveWell.** Session pages (U32) and controversy pages (U54). Candidates to
check against the U07 survey: Symmachus's memorial on the Altar of Victory and
Ambrose's replies (384), both printed in the NPNF Ambrose volume; Arius's
letter to Eusebius of Nicomedia and Alexander's encyclical (Theodoret Book 1,
which U07 did not store); Pelagius and Augustine; Luther and Erasmus only where
a public-domain translation of both exists. Data: a session block of `type:
"facing"` with two source ids and `feared: [string, string]`. Where the losing
side's words are lost or only quoted by opponents, the page says so ("we have
Arius mostly through his enemies") rather than pretending to balance.

**Fit, effort.** Strong · M.

**Evidence.** Harris and Zucker; AHA on SHEG; CHI issue furniture; MASTER-PLAN
7.2 (the other side; U54); U07 survey counts.

### 8. How do we know? Evidence on every claim

**What it is.** Every event and person in the registry carries a small label
for the kind of witness behind it: *Eyewitness or participant*, *Written within
a generation*, *Later account (about N years after)*, *Tradition*, *Legend*.
Hinge sheets add a "How do we know?" line. The timeline can filter to events
with a contemporary witness. Part 0 teaches four plain ways people decide a
claim is true, with their limits: because it feels right, because it follows,
because someone said so, because we can see the evidence.

**Seen in.** OER's four claim testers (intuition, logic, authority, evidence);
Priestley's dots; Stanford's sourcing; WHE's "Cite This Work"; and, as the
counterexample, *Christian History*'s trust in the editors in place of
footnotes.

**Why it works.** It turns the skeptic's first question into the course's own
habit, and it heads off the most common way church history is taught badly: the
legend told as event. A-synthesis pattern 9 already labels uncertain dates and
places; this extends the same labels to whether a thing happened as told.

**On LiveWell.** Data (U30): `evidence: {kind, writtenAfterYears?, note}` on
events and people; one label system shared with A pattern 9's dates. Sheets
show it in small caps under the date. `/theology/history/timeline?evidence=contemporary`
(U31). Two well-known cases that suit a Part 0 or Part IV exercise, both to be
verified before use: the two early accounts of Constantine's vision (Lactantius
and Eusebius's later *Life of Constantine*), and the posting of the
Ninety-five Theses, whose earliest account is later than the event and has been
disputed by modern historians.

**Fit, effort.** Core · M (a judgment per entry, about 400 entries).

**Evidence.** OER claim-testing materials; University of Oregon on Priestley;
WHE citation pages; CHI on footnotes.

### 9. One thing, looked at closely

**What it is.** One object or image per Part (later per session): a still,
public-domain or openly licensed image with three to six numbered details. A
tap on a number opens the detail, cropped and enlarged, with one or two
sentences and its source. The sequence can be read as a list.

**Seen in.** *A History of the World in 100 Objects*; StoryMapJS's gigapixel
*image mode* (overview, then details, markers without lines) and its Seurat
example; Google's Art Camera; the Met's "up to ten representative works" in
each chronology; Smarthistory's conversation in front of the object.

**Why it works.** An object is evidence a reader can see, which is the whole
argument of pattern 1 in a single picture, and it draws attention honestly:
the interest is in the thing, not in the interface. For the skeptic, the
church's history in objects (a mocking graffito, a house church, a printed
broadside) is harder to dismiss than a narrator.

**On LiveWell.** Within sessions (U32) and Part openers (pattern 11); an
`objects.json` in the registry (U30) with the image, its license and source
URL, and `details[{n, crop: {x, y, w, h}, caption, sourceId}]`. The crop is a
CSS `object-position` and scale on the same committed image (no tiles, no zoom
library, no map). Candidates whose rights must be checked one by one: the
Alexamenos graffito; the Dura-Europos house church and its baptistery; a
leaf of Codex Sinaiticus; an early printing of the Ninety-five Theses; the
Xi'an stele of the Church of the East. Only images whose license is recorded
in the registry ship.

**Fit, effort.** Strong · M (rights work per object).

**Evidence.** Wikipedia and Australian Book Review on 100 Objects; StoryMapJS
`BEST_PRACTICES.md` and `compiled/examples/seurat.json`; TechCrunch on the Art
Camera; Met TOAH about page.

### 10. Where and when: the region-by-Part grid, empty cells shown

**What it is.** A compact grid on the course front door: rows are regions (the
Latin West; the Greek East; Africa, from Egypt, Nubia and Ethiopia to North
Africa and later the south; Syria, Persia and Asia; the Americas; the global
church), columns are the nine Parts. A filled cell shows what the course holds
there and opens the timeline filtered to it; an empty cell says *Not yet
written*.

**Seen in.** The Met's chronologies (region by period, chosen by map or menu,
each with an overview, key events and up to ten works); DACB's people template
and its network of African contributors; Shelley's fifth edition adding Asia,
India and Africa; Histography and FlowingData's point that a timeline shows
only what its sources hold.

**Why it works.** The plan commits to the church outside the West after
Augustine, to at least twenty women and to the Black church. A grid makes that
commitment checkable by the reader and by the editor, and an honest empty cell
is a promise rather than an omission. It also gives a second way in for the
reader who thinks of history by place.

**On LiveWell.** `/theology/history` (U31), below the hinges; each cell links
to `/theology/history/timeline?part=iii&region=asia`. When a cell has content,
its landing follows the Met's anatomy: a short overview, key events, and up to
ten people and sources. People in Africa and Asia use a template that begins,
as DACB's does, with name forms (including local and liturgical names),
people and kin, place and birth, and that accepts oral and local sources with
their kind labeled (pattern 8). Data: `region` on every registry entry
(already planned for places), a small `regions.json`.

**Fit, effort.** Strong · S to M.

**Evidence.** Met TOAH about and chronology pages, CAA review; DACB "What is
DACB?", guidelines, BU coverage; Shelley fifth-edition description;
FlowingData and USask on Histography.

### 11. Each Part as an issue

**What it is.** Each Part's opener carries the furniture of a themed magazine
issue: a timeline spread for the Part (its hinge and build-up), "Questions
people ask" (five to seven short answers, each pointing to a session), "In
their own words" (five to eight verified quotations, each opening its source
card), and "Recommended reading," with the primary sources used and which of
them are free to read online.

**Seen in.** *Christian History*'s recurring sections (timeline, FAQ,
quotations, recommended resources); *Reframing Art History*'s chapter close
(terms, "Learn more," collaborators); the Met's chronologies.

**Why it works.** It is a familiar, trusted format that gives the browsing
reader four quick ways into a Part before he commits to a session, and it
produces, without extra design, a printable booklet a group can use. Unlike the
magazine, every quotation opens its source.

**On LiveWell.** A Part opener at `/theology/history/part/:n` (nine pages, each
with a literal `SEOMeta` and registered by the 9.3 checklist) or, if James
prefers fewer routes, the head of each Part's first session. Data:
`parts.json` with `faq[]`, `quotations[]` (excerpt ids), `reading[]`. Print
stylesheet as for handouts.

**Fit, effort.** Strong · S to M.

**Evidence.** CHI issue 144 pages (timeline, FAQs, recommended resources);
Wikipedia on *Christian History*; Smarthistory on *Reframing Art History*.

### 12. Before and after this text

**What it is.** On every council, creed and major source, a dated list in three
parts: *It drew on* (earlier texts, Scripture first), *Written alongside*, and
*Who answered it* (later texts, in order of writing), each item opening its
sheet.

**Seen in.** Sefaria's `timeline.js` (composition date minus error margin;
past, concurrent and future links; recursive trees); A-synthesis pattern 23's
"In history's order" (for doctrines), extended here to a source's reception.

**Why it works.** It shows the church as a long conversation in which a text is
answered for centuries, the Constitution's "older than my culture" delivered
by structure. It also lets a reader follow a thread out of a session by
choice.

**On LiveWell.** Council and controversy pages (U54) and source sheets.
Example to build and verify: the Creed of Nicaea, drawing on Scripture and
earlier rules of faith; answered by Athanasius's *De Decretis* (stored by U07);
restated at Constantinople in 381 and received at Chalcedon; and received by
Protestant confessions, Baptist ones among them (which confession and article,
to verify). Data: `sources.json` gains `drewOn[]` and the inverse is computed at
build time; a validator check that every link resolves and that dates run the
right way.

**Fit, effort.** Strong · M (curation).

**Evidence.** Sefaria `static/js/timeline.js` (partitionLinks, buildPastTree,
buildFutureTree) and `TopicPage.jsx`; A-SYNTHESIS pattern 23.

### 13. A person in five sayings

**What it is.** A person sheet may carry "In five sayings": five verified short
excerpts from the person's own stored texts, each with its reference and one
line of context. A "Where it happened" line names the places, with the session
that goes there.

**Seen in.** *5 Minutes in Church History*'s "Luther in 5 Sayings" and "Isaac
Watts in 5 Sayings"; its "on location" episodes; *Christian History*'s
quotation pages.

**Why it works.** A person is remembered by what they said; five is enough to
show a mind and few enough to read on a phone. It is attention earned by the
person's own words.

**On LiveWell.** People sheets (U30, U31), only when five excerpts pass the
U07 verifier; otherwise the section is absent. A natural first set from the
stored corpus: Ignatius or Polycarp, Justin, Irenaeus, Tertullian, Cyprian,
Athanasius, Ambrose, Augustine (selection and wording to verify).

**Fit, effort.** Strong · S (once texts are stored).

**Evidence.** Ligonier episode index and podcast listings; U07 manifest.

### 14. The question the session answers

**What it is.** Each Part and session names one historical question in the
reader's words at the top ("When the church was given power, what did it do
with it?") and returns to it at the close: "Answer it now in a sentence," kept
on the device and shown beside the reader's myth-check answers.

**Seen in.** Stanford (each lesson "revolves around a central historical
question"); the WHP's guiding question per article; *Reframing Art History*'s
two to four guiding questions per chapter; Ligonier's lesson objectives.

**Why it works.** A question gives the scene and the sources a direction and
turns the end of a session into the reader's own verdict rather than a recap,
which is CLAUDE.md's "verdicts, not summaries" asked of the reader.

**On LiveWell.** U32 page head and close; uses the same answer-and-compare
component as A-synthesis patterns 5 and 14, so it is one component across the
Bible, doctrine and history. Data: `question` on sessions and Parts.

**Fit, effort.** Core · S.

**Evidence.** AHA and Common Sense on SHEG; OER AP syllabus; Smarthistory on
*Reframing*; Ligonier study guide.

### 15. The journey: overview first, then the road

**What it is.** For sessions that are a movement (Paul's cities, Patrick, the
Church of the East toward China, the missionary century), a small locator
drawing shows every place and the route at once, then a stepper moves place by
place (date, what happened, source), with the road already travelled kept and
dimmed. Where it helps, one line gives a travel time from the ORBIS model,
named as a model estimate.

**Seen in.** StoryMapJS (overview slide, then each place; `show_history_line`;
cartography mode for movement); ORBIS (time and cost by season and mode).

**Why it works.** Distance and slowness are part of the story of the early
church and hard to feel from prose.

**On LiveWell.** Only if James wants the atlas (U68). Inline SVG on the
committed Natural Earth outlines the plan names, places from the registry, a
list equivalent, motion only under user control and none under reduced motion.
Any ORBIS figure is checked in ORBIS itself and cited.

**Fit, effort.** Maybe · M to L (gated).

**Evidence.** StoryMapJS `StoryMap.js` options and best practices; ISAW, UCSB
and Scheidel's 2015 paper on ORBIS.

### Also considered, not ranked

- **A citation offered on every page** (WHE's "Cite This Work"): small and
  useful for students and pastors; fold into the source sheet footer when U30
  lands.
- **Transcripts and text with any recording** (BiblicalTraining): already a
  rule in A-synthesis; applies if James records sessions.
- **Hash-addressable stops in any sequence** (TimelineJS `unique_id` with
  `hash_bookmark`): the plan's query-parameter sheets already do this.
- **A family animation series** (Torchlighters): out of scale; the table depth
  (pattern 5) and the printable carry the family edition.

---

## 5. What to avoid

Each item would betray "Unhurried. Weighted. Grown-up." or the integrity rules.

1. **A zoomable dot cloud or WebGL canvas of all history** (Histography;
   *Museum of the World*). Density becomes the message; the sources become
   Wikipedia; color-coded continents break the palette; at launch both depended
   on particular browsers, one is unmaintained and ends in 2015, and the other
   offered no way off its main screen but out of the site. The plan already
   rules out a zoomable canvas; keep it so.
2. **Voting on saints** (Lent Madness's bracket and Golden Halo). It makes
   witnesses compete, rewards whoever is most charming, and its own later
   rounds slide into "quirks," "legends" and "saintly kitsch." Take the
   calendar and the bulletin insert; never the vote.
3. **Mastery points, scored quizzes and completion certificates** (Khan
   Academy's mastery practice; BiblicalTraining's mailed certificates).
   Retrieval stays tap-to-reveal with no score; the end of a Part is a closing
   rite (A-synthesis pattern 15), not a certificate.
4. **Hero-only history for children** (the Torchlighters listings; *The Church
   History ABCs*' "quirky facts," such as Edwards liking spiders). The table
   depth keeps the reckonings and the heroes' failures; trivia is not a hook.
5. **Wikipedia synopses and AI-drafted prose** (Google Arts & Culture figure
   pages; its Gemini "Help me Write"). Every sentence in the course is written
   for it or verified against a stored source, and every person entry cites one.
6. **Ads, "remove ads" memberships and paywalls on the course** (WHE;
   Ligonier Connect's paid groups). The course is free.
7. **Authority without visible sources** (*Christian History*'s deliberate
   choice of no footnotes). LiveWell shows the source at the point of the
   claim.
8. **Lecture walls** (long video playlists without text, map or sequence, as
   Reeves' lectures appear on YouTube). Any recording ships with its text and
   its place in the course.
9. **Embedding TimelineJS or StoryMapJS.** Third-party media embeds, a Google
   Sheets dependency, built-in analytics hooks and eased fly-to animation do
   not fit the first-paint and privacy rules. Borrow the data model (eras,
   labeled group rows, stable ids, a title stop, overview first), not the
   runtime.
10. **"On this day" as a daily trivia feed** (Google's Daily Digest). The
    calendar is weekly remembrance with a source and a prayer, never a push.
11. **One tradition's reading presented as "the history," or a two-paths moral
    tale** (Godfrey's survey within one tradition; *Christianity in America*'s
    "A Tale of Two Paths"). Name the tradition, steelman the other, and run the
    guardrail in both political directions.
12. **Recreations and immersive staging** (the Searchable Museum's recreated
    History Elevator and slave-ship displays). Right for a national museum;
    at LiveWell's scale it would be production value standing in for sources.
    Tell the reckonings in sources and prose.
13. **Counts of people and endless "related" rails** ("1.4 million joined,"
    "readers also viewed"). Count things in the library, never people; every
    page ends on the next session, not a feed.
14. **Color-coded eras and continents.** Rows, labels and position carry the
    meaning; mustard stays one tick.

---

## 6. What I could not see

Ordered by how much the answer could change a pattern.

- **LiveWell's own data.** Which `/theology/history` pages and essays readers
  land on and from which queries (Search Console, Vercel analytics): decides
  which hinges and witnesses lead (patterns 2, 6).
- **Christian History Institute's site live:** the issue page layout, how
  sidebars and timelines render in HTML, search, and whether the site has been
  redesigned; the contents of a Torchlighters leader's guide; whether *Glimpses*
  is still published and on what terms; CHI's daily "Today in Christian
  History," which no search reached.
- **Noll's full table of contents:** the third edition is described both as 13
  chapters with an afterword and as "fourteen key moments"; I confirmed
  chapters 1, 2 to 3, 4, 5, 7 and 13 only.
- **Ligonier:** the Connect course player for church history, the structure of
  a *5 Minutes* episode beyond its titles, and any Nichols church history course
  beyond *Christianity in America* and the Edwards course.
- **Smarthistory's current templates** and the *Reframing* chapter view as a
  reader sees it.
- **Khan Academy's June 2026 World History course** as built: its units, how
  the OER readings and Khan practice sit together.
- **Google Arts & Culture Stories** as an interaction (card, scroll or swipe),
  and its Experiments; only third-party and older descriptions were found.
- **The Met's Heilbrunn Timeline** after its move under `/essays`: whether the
  map selector and the chronology anatomy survive.
- **World History Encyclopedia's** timeline and maps as interactions, and its
  "related content."
- **BiblicalTraining's** course pages and player; the church history course
  list beyond two titles.
- **Reeves:** slides, format, audience size.
- **Histography's** design rationale (the Smashing Magazine interview text did
  not come through) and its current state.
- **Priestley's own key** to the dots (only the Oregon project's description).
- **The Searchable Museum's** interaction design; no agency case study was
  found.
- **DACB's** full entry template beyond the first categories.
- **Lutheran commemorations** (*For All the Saints*) and any published critique
  of Lent Madness.
- **Agency case studies** of history timelines (Bluecadet, Local Projects,
  Awwwards); the search returned vendor pages only.
- **Rights** for every candidate object in pattern 9 and every collect in
  pattern 6; and whether the U07 survey reaches Symmachus, Arius and Alexander
  for pattern 7.

---

## 7. Evidence

Every source used, with what it showed. Code paths are in the scratchpad clone
`/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/design-src/`.

**Christian History Institute and *Christian History***
- [learnofchrist.com review of CHI](https://learnofchrist.com/resources/christian-history-institute): free archive (150+ and 200+ issues, no paywall or sign-up), lay level, audiences, plain navigation and search.
- [Wikipedia, *Christian History*](https://en.wikipedia.org/wiki/Christian_History): quarterly; origin in 1982 as film resource guides; CT 1989; stopped after 99 in 2008; revived 2011; issue 28 overview.
- [CH issue 144](https://christianhistoryinstitute.org/magazine/issue/christian-history-in-images-ch-144), [CH 144 FAQs](https://christianhistoryinstitute.org/magazine/article/ch-144-faqs), [CH 144 recommended resources](https://christianhistoryinstitute.org/magazine/article/ch-144-recommended-resources): the recurring timeline, FAQ, quotations and resources sections.
- [Why Christian History doesn't use footnotes](https://christianhistoryinstitute.org/blog/post/why-christian-history-doesnt-use-footnotes) and [History, behind the scenes: from the editor](https://christianhistoryinstitute.org/magazine/article/history-behind-the-scenes-from-the-editor): no footnotes, scholar-advisor, "drop footnotes and add anecdotes."
- [Logos, CH magazine](https://www.logos.com/product/49767/christian-history-magazine) and [CHI archive DVD](https://christianhistoryinstitute.org/store/dvd/97889/christian-history-magazine-archive-dvd): issue counts; timelines, excerpts, vignettes per issue.
- [CHI about](https://christianhistoryinstitute.org/about): Apostles' Creed, nondenominational.
- [Torchlighters](https://christianhistoryinstitute.org/torchlighters), [Augustine DVD](https://christianhistoryinstitute.org/store/dvd/501505d/torchlighters-the-augustine-story), [set of 23](https://christianhistoryinstitute.org/store/dvd/97172d/torchlighters-set-of-23), [Classical Conversations on its origin](https://classicalconversations.com/blog/a-fathers-response-how-the-torchlighters-series-began/), [Wikipedia, CHI](https://en.wikipedia.org/wiki/Christian_History_Institute): ages 8 to 12, leader's guides, handouts, four lessons, episode list, founding story.
- [Reformation21 on *Glimpses*](https://reformation21.org/?p=13894), [Tyndale bulletin inserts](https://tyndale.com/stories/church-bulletin-inserts): four-page monthly single-topic insert.
- [Concordia Historical Institute](https://concordiahistoricalinstitute.org/?p=16): "Today in History," freely reproducible with credit.

**Ligonier**
- [Survey Part 1 study guide](https://store.ligonier.org/a-survey-of-church-history-part-1-study-guide), [Part 6 announcement](https://www.ligonier.org/blog/part-6-w-robert-godfreys-survey-church-history-study-series-here): six parts by centuries, 73 lectures, about 23 minutes, guide anatomy.
- [5 Minutes episode index](https://learn.ligonier.org/podcasts/index/5-minutes-in-church-history-with-stephen-nichols), [London on Location episode](https://www.podcast.de/episode/656053140/london-on-location-the-english-reformation-in-5-acts), [100th episode](https://www.ligonier.org/blog/5-minutes-church-history-celebrates-100-episodes): weekly, five minutes, since 2013, on-location and "in 5 sayings" formats.
- [Christianity in America announcement](https://ligonier.org/posts/christianity-in-america-new-teaching-series-stephen-nichols), [A Tale of Two Paths](https://learn.ligonier.org/series/christianity-in-america): two-paths frame; Connect pricing; [Goodreads review](https://www.goodreads.com/book/show/566959) on the Edwards course structure.

**Smarthistory**
- ["Conversation is the Key" (PDF)](https://smarthistory.org/wp-content/uploads/2021/01/conversationiskey.pdf), [Museums and the Web 2010 paper](https://archimuse.com/mw2010/papers/harris/harris.html), [Wikipedia](https://en.wikipedia.org/wiki/Smarthistory): conversation over monologue, close looking, origin.
- [Common Sense review](https://www.commonsense.org/education/reviews/smarthistory), [MERLOT](https://www.merlot.org/merlot/viewSite.htm?id=9159967): era timeline with thumbnails; uneven depth.
- [Reframing Art History](https://smarthistory.org/?p=59717), [How it developed](https://smarthistory.org/?p=66135), [How to use it](https://smarthistory.org/?p=66142), [Kress interview](https://www.kressfoundation.org/news/kress-grantee-spotlight-beth-harris-and-steven-zuc), [Skyline College guide](https://guides.skylinecollege.edu/oersbysubject/art): six parts, guiding questions, chapter close, contributors, "coming soon."

**OER Project and Khan Academy**
- [Three Close Reads](https://community.oerproject.com/b/blog/posts/three-close-reads-a-powerful-tool-for-training-students-to-read-critically-for-life), [Doing more with Three Close Reads](https://community.oerproject.com/b/blog/posts/doing-more-with-three-close-reads): the three reads, "1¾ reads," variants.
- [WHP AP syllabus](https://www.oerproject.com/-/media/WHP/PDF/Teacher-Resources/WHP_AP_Syllabus_2022_v2.docx), [Claim testing introduction](https://www.oerproject.com/OER-Materials/OER-Media/PDFs/1200/Unit1/Claim-Testing-Introduction): guiding question, Key Ideas, Evaluating and Corroborating; four claim testers.
- [OER reading guide](https://www.oerproject.com/OER-Materials/OER-Media/HTML-Articles/Teacher-Resources/Reading-Guide), [adjustable articles thread](https://community.oerproject.com/f/big-history/17298/adjustable-articles): Lexile levels via Newsela, audio and Spanish at highest level, lagging levels.
- [BHP Unit 1 guide](https://www.oerproject.com/OER-Materials/OER-Media/PDFs/BHP/Teacher-Resources/BHP-U1-Guide), [World History Commons on Big History](https://worldhistorycommons.org/big-history-project): ten units, eight thresholds, scale switching, three-stage reading questions.
- [Khan Academy World History notice](https://support.khanacademy.org/hc/fr/community/posts/46195287625229-Content-update-Upcoming-major-changes-to-World-History-course-combined-with-OER-Project-World-History-and-new-Career-Exploration-course), [AP World History changes](https://support.khanacademy.org/hc/fr/articles/38969346045965): the June 2026 combination with mastery practice.

**Google Arts & Culture and *Museum of the World***
- [Wikipedia](https://en.wikipedia.org/wiki/Google_Arts_%26_Culture), [TechWell 2016](https://www.techwell.com/techwell-insights/2016/08/google-s-arts-culture-app-brings-art-world-your-phone), [TechCrunch on the Art Camera](https://techcrunch.com/?p=1323168): partners, timeline browsing, Daily Digest, gigapixel, Street View.
- [Help me Write](https://support.google.com/culturalinstitute/partners/answer/15204643?hl=en), [Embed Stories](https://support.google.com/culturalinstitute/partners/answer/10968067?hl=en), [The Art Newspaper](https://www.theartnewspaper.com/feature/how-google-became-a-major-producer-of-cultural-content), [Berard and Smith 2026](https://journals.sagepub.com/doi/10.1177/13548565251413321): Story Editor, Gemini drafting, embedding, Google as cultural producer.
- [Explore](https://artsandculture.google.com/explore), [Historic Moments](https://artsandculture.google.com/project/historic-moments), [Peacefield History](https://peacefieldhistory.com/15-history-lesson-ideas-for-google-arts-and-culture/), [History Tech](https://historytech.wordpress.com/2021/06/09/how-much-do-i-love-google-arts-culture/): figures and events, Wikipedia synopses, draggable timeline.
- [Internet Archaeology review](https://intarch.ac.uk/journal/issue44/13), [Design Week](https://www.designweek.co.uk/issues/16-22-november-2015/british-museum-moves-its-collection-online-with-museum-of-the-world-timeline/), [Museums Association](https://www.museumsassociation.org/museums-journal/news/13112015-british-museum-unveils-google-partnership), [MERLOT review](https://www.merlot.org/merlot/viewCompositeReview.htm?id=1361443): 4,500 objects, continent tracks, links between objects, WebGL, Weir + Wong, no exits, set context first.

**Knight Lab (code read, NUKnightLab on GitHub)**
- TimelineJS3: `src/js/timeline/Timeline.js` (options: timenav 25% and 40% mobile, min 175 px, Fibonacci zoom, `hash_bookmark`, tracked events); `website/docs/json-format.njk` (`group`, `display_date`, `unique_id`, `background`, `eras`, cosmological scale); `website/_data/faqs.json` (groups as labeled rows, title slide first, BCE dates); `website/_overview.njk` (tips: under 20 slides, strong chronology, events as part of a larger narrative, include build-up); `website/_data/examples.json` (showcase titles).
- StoryMapJS: `src/js/storymap/StoryMap.js` (overview, `call_to_action`, `show_history_line`, `line_follows_path`, `map_as_image`, dashed line); `BEST_PRACTICES/BEST_PRACTICES.md` (image mode against cartography mode); `compiled/examples/seurat.json` (gigapixel overview and detail stops); `storymap/examples.json` (Newberry, Bosch, others).

**The Met**
- [Heilbrunn Timeline](https://www.metmuseum.org/toah), [new location](https://www.metmuseum.org/essays/timeline-of-art-history), [About](https://www.metmuseum.org/toah/about), [Chronology](https://www.metmuseum.org/toah/chronology), [CAA review](https://caareviews.org/reviews/3222), [EDSITEment](https://edsitement.neh.gov/general-resources/metropolitan-museum-arts-heilbrunn-timeline-art-history), [World History Commons](https://worldhistorycommons.org/heilbrunn-timeline-art-history), [OSU Origins](https://origins.osu.edu/connecting-history/best-history-online-heilbrunn-timeline-art-history), [Toronto Metropolitan library](https://learn.library.torontomu.ca/arthistory/eresources): four components, chronology anatomy, map or menu selection, counts, reboot.

**World History Encyclopedia**
- [Wikipedia](https://en.wikipedia.org/wiki/World_History_Encyclopedia), [rename article](https://worldhistory.org/article/1688/we-are-now-world-history-encyclopedia), [rename video](https://www.worldhistory.org/video/2288/new-name-world-history-encyclopedia/): history, charity, users.
- [Video page with citations and menu](https://www.worldhistory.org/video/2150/timeline-of-world-history--major-time-periods--age/), [Index by region](https://www.worldhistory.org/index/region/), [a collection](https://worldhistory.org/collection/93/visual-guide-to-ancient-egyptian-gods/33), [audio player](https://www.worldhistory.org/audioplayer/en/2-1688/): Cite This Work, menu, collections, audio.
- [Avondale library guide](https://wp.avondale.edu.au/library/?p=2907), [World History Commons](https://worldhistorycommons.org/world-history-encyclopedia), [Common Sense](https://www.commonsense.org/education/reviews/world-history-encyclopedia): audio, translations, teaching materials, thin non-European coverage.

**BiblicalTraining.org**
- [Home](https://www.biblicaltraining.org/), [Programs](https://www.biblicaltraining.org/programs), [For the Church](https://www.biblicaltraining.org/church), [learnofchrist review](https://learnofchrist.com/resources/biblical-training), [Reasonable Theology](https://reasonabletheology.org/all-about-biblical-training/), [Monergism list](https://www.monergism.com/blog/library-free-online-seminary-courses), [faith.tools](https://faith.tools/app/37-biblicaltraining): levels, certificates with quizzes, transcripts, student guides, Church History I and II.

**Reeves**
- [Holy Joys list](https://holyjoys.org/history-lectures-reeves/), [Biblical eLearning](https://biblicalelearning.org/?p=28714), [Ligonier teacher page](https://learn.ligonier.org/teachers/ryan-reeves): 55 and 39-lecture series, short biographies, roles.

**Histography**
- [Hyperallergic](https://hyperallergic.com/an-interactive-timeline-of-human-history-according-to-wikipedia), [Smithsonian](https://www.smithsonianmag.com/smart-news/what-14-billion-years-of-history-looks-like-180956971/), [Open Culture](https://www.openculture.com/2015/11/an-interactive-timeline-covering-14-billion-years-of-history-from-the-big-bang-to-2015.html), [FlowingData](https://flowingdata.com/?p=43255), [USask course review](https://sites.usask.ca/hist396-eveh/?p=63), [Smashing interview page](https://mobile.smashingmagazine.com/2016/09/interview-with-matan-stauber/), [TV3](https://www.3cat.cat/tv3/espai-internet/una-historia-del-mon-interactiva/post/3010564/): dots, zoom, filters, spiral, Wikipedia-only, unmaintained, browser limits.

**Noll and Shelley**
- [Themelios review](https://www.thegospelcoalition.org/themelios/review/turning-points-decisive-moments-in-the-history-of-christianity/), [Pneuma Review](https://pneumareview.com/mark-noll-turning-points/), [Wisconsin Lutheran Seminary review](https://www.wisluthsem.org/turning-points/), [WTS Books](https://www.wtsbooks.com/products/turning-points-mark-noll-9780801039966): chapter count conflict, confirmed chapters, new Vatican II and Lausanne chapter, further reading.
- [Word and Spirit review](https://wordandspirit.co.uk/2012/06/18/church-history-in-plain-language-bruce-shelley/), [Equip](https://www.equip.org/product/church-history-plain-language/), [Exodus Books](https://www.exodusbooks.com/church-history-in-plain-language/shelley/3381/), [Tenshiverse](https://tenshiverse.substack.com/p/church-history-in-plain-language), [Perlego, fifth edition](https://www.perlego.com/book/2305644/church-history-in-plain-language-fifth-edition-the-story-of-the-church-for-todays-readers-pdf): eight ages, chapter openings, sales, "we" criticism, fifth-edition additions.

**Stanford History Education Group**
- [AHA](https://www.historians.org/research-and-publications/remote-teaching-resources/reading-like-a-historian), [Common Sense](https://www.commonsense.org/education/reviews/stanford-history-education-group), [Teaching Civics](https://teachingcivics.org/lesson/reading-like-a-historian-historical-thinking-chart/), [Histolab](https://histolab.coe.int/resource-hub/141): four moves, central question, chart, lesson counts, Digital Inquiry Group.

**100 Objects**
- [Wikipedia](https://en.wikipedia.org/wiki/A_History_of_the_World_in_100_Objects), [Australian Book Review](https://australianbookreview.com.au/abr-online/archive/2011/55-june-2011/394-neil-macgregor-a-history-of-the-world-in-100-objects), [History News Network](https://www.historynewsnetwork.org/article/48143): format, dates, grouping, prize, "cult status."

**Priestley**
- [Wikipedia](https://en.wikipedia.org/wiki/A_Chart_of_Biography), [History of Information](https://historyofinformation.com/detail.php?id=2530), [University of Oregon Time Charts](https://pages.uoregon.edu/infographics/dev/timeline/pages/index.html), [Oregon chart page](https://pages.uoregon.edu/infographics/dev/timelineV2/pages/chartofBiography.html), [NEH](https://www.neh.gov/article/joseph-priestley-created-revolutionary-maps-time): bars, six categories, 2,000 names, solid and dotted lines.

**ORBIS**
- [ISAW](https://isaw.nyu.edu/exhibitions/space/orbis.html), [Scheidel 2015 (PDF)](https://www.ancientportsantiques.com/wp-content/uploads/Documents/ETUDESarchivees/MedNavigationRoutes/ORBIS-Scheidel2015.pdf), [UCSB](https://legacy.geog.ucsb.edu/interactive-map-shows-how-roman-empire-was-shaped-by-economic-constraints/), [Bucknell analysis](https://thehumanitiesnow.blogs.bucknell.edu/2014/08/31/analysis-of-orbis-the-stanford-geospatial-network-model-of-the-roman-world): model, sites, modes, seasons, sailing times.

**Calendars of witnesses**
- [Wikipedia, *Lesser Feasts and Fasts*](https://en.wikipedia.org/wiki/Lesser_Feasts_and_Fasts), [Church Publishing, *Holy Women, Holy Men*](https://churchpublishing.org/products/9780898696783-holy-women-holy-men), [Resolution 2022-A010](https://www.episcopalarchives.org/sites/default/files/gc_resolutions/2022-A010.pdf): biography, collect, readings; revision as *A Great Cloud of Witnesses*.
- [Episcopal News Service](https://www.episcopalnewsservice.org/pressreleases/supreme-executive-committee-releases-2016-lent-madness-bracket/), [Forward Movement](https://forwardmovement.org/?p=7650), [Diocese of San Diego](https://edsd.org/news/saintly-smackdown-lent-madness), [Lent Madness insert 2020 (PDF)](https://www.lentmadness.org/wp-content/uploads/2020/02/LMInsert-2020.pdf), [The Living Church](https://livingchurch.org/news/lent-madness-holiday-creep/): bracket mechanics, rounds, Golden Halo, inserts.

**DACB**
- [What is DACB?](https://dacb.org/about/what-is-dacb/), [Introduction (PDF)](https://Www.DACB.org/resources/intro-dacb-web.pdf), [General guidelines (PDF)](https://Www.DACB.org/resources/oral-history/oh-eng/dacb-general-guidelines.pdf), [BU, Biographer's Craft](https://www.bu.edu/cgcm/2015/12/14/biographers-craft/), [Newsletter fall 2006 (PDF)](https://Www.DACB.org/resources/newsletter/newsletter-fall-2006.pdf): scope, languages, participants, seminars, entry length and categories.

**Searchable Museum**
- [Smithsonian release](https://dashboard.si.edu/es/newsdesk/releases/national-museum-african-american-history-and-culture-launches-new-searchable), [NPR](https://www.npr.org/local/2021/11/22/1057964879/its-now-possible-to-visit-the-smithsonians-african-american-history-museum-virtu), [DCist](https://dcist.com/story/21/11/19/smithsonian-nmaahc-african-american-history-museum-goes-virtual), [Word in Black](https://wordinblack.com/2022/02/baltimore-based-fearless-creates-searchable-museum-for-nmaahc/), [UMBC](https://umbc.edu/?p=28207): launch, Fearless, recreations, Lesser-Known Stories, funding.

**Children's church history**
- [TGC store, *The Church History ABCs*](https://store.thegospelcoalition.org/product/9781433514722), [Redeemed Reader](https://redeemedreader.com/the-church-history-abcs-by-steven-j-nichols/): 26 figures, ages 8 to 11, quirky facts.

**Timeline design (general)**
- [History Associates, multidimensional timelines](https://www.historyassociates.com/multidimensional-timelines/): periods as chapters. [EDM Studio timeline](https://www.edmstudio.com/portfolio/timeline/): navigator strip plus local scroll. Vendor pages; illustrative only.

**Sefaria (code read)**
- `static/js/timeline.js`: `getDate = compDate - errorMargin`; `partitionLinks` into past, future, concurrent; `buildPastTree`, `buildFutureTree`; dangling commentary dropped. `static/js/TopicPage.jsx`: `TopicMetaData` shows `timePeriod.name` and `yearRange`. `static/js/AdminEditor.jsx`: author era field.

**LiveWell (repo read)**
- `client/src/pages/TheologyHistory.tsx`: four tabs, era-summary timeline. `client/public/theology/church-history-timeline.json`: era objects with long summaries. `client/public/history/essays/`: 22 essays. `docs/work/plan/MASTER-PLAN.md` 7.2 and section 2 rules. `docs/work/plan/units/U07.md`: stored corpus and the 136-source survey. `docs/work/design/research/A-SYNTHESIS.md`: patterns 9, 10, 23, 24 and the section 3 tensions this report builds on.
