# A. Courses and learning paths: how faith formation is sequenced, sustained and measured, and what LiveWell should take

Prepared 2026-10-27 for the design research cluster "courses-learning,"
answering James's brief ("the most organized, well-designed website that helps
people to study the Bible, to understand doctrine, to understand what a
post-Christian world is in America, and how to live it ... interactive ... a
useful tool for people to study and learn and grow"). Companion to
`docs/work/plan/benchmark.md`, which placed BibleProject, Ligonier, RightNow,
Hallow, YouVersion, Dwell, Bible in a Year and The Bible Recap at the level of
audience and strategy, and to the two sibling reports in this folder
(`A-bible-readers.md`, `A-text-study-gold.md`), which already argued for plans
that forgive and a shared calendar instead of a streak. This file goes one
level further in a different direction: how a course or a year-long program is
*built*, unit by unit, so that a person is still there in month seven and has
actually learned something, and how it ends.

**Method and limits.** Page fetches fail in this sandbox and GitHub search is
refused (`gh search repos` returns 403: the session is bound to its configured
repositories), and none of the products in this cluster is open source, so no
course player, app screen, or source code was seen directly. I used 41 web
searches aimed at help centers, partner documentation, publisher pages, press
releases, church-hosted FAQs, app-store listings, third-party reviews, and
four pieces of learning research. Where a source was third-party, old, or
contradicted by another, it says so. I also read LiveWell's own course-shaped
material so every pattern lands on something real: the care plans
(`client/public/plans/`, `client/src/pages/plans/CarePlan.tsx`), the study
guides (`client/public/studyguides/`), the family reading plans
(`client/public/family-reading-plans.json`), the story of the Bible
(`client/public/bible/story.json`, `client/src/pages/StudyBibleStory.tsx`), The
Table's table mode (`client/src/pages/family/TableMode.tsx`), the progress
reader (`client/src/lib/myProgress.ts`), and the 2027 whole-story plan as it
stands in `docs/work/patches/U28/0001-U28-Read-the-whole-story-in-2027.patch`.
Nothing below describes a feature I did not see described; section 6 lists
what I could not see. Figures quoted from the products (downloads, joiners)
are planning notes under MASTER-PLAN section 2 and are not for the site.

---

## 0. The short verdict

The programs that keep people for a year are not held together by rewards.
They are held together by structure: a **shared calendar** with a door that
stays open (Bible in a Year "is designed to be started at any point"; The
Bible Recap starts January 1 and tells latecomers to pick up today's reading;
Hallow's Lent challenge starts Ash Wednesday and lets people join later); a
**map of the whole** that tells the reader where he is (Ascension's twelve
periods of the Great Adventure timeline, each with a special episode when the
story turns); a **unit of fixed shape and honest size** (two or three readings,
a reflection, a prayer, 20 to 25 minutes; or read, then a five-minute recap);
**one voice** the reader comes to trust; and, for the deepest of them, **a
room**: Alpha's meal and table, Bible Study Fellowship's group, Ligonier's
study group, Practicing the Way's guided conversation.

The course platforms (BibleProject Classroom, Ligonier Connect, Our Daily Bread
University, RTS) get the *unit* right (a 20 to 30 minute session with notes,
optional quiz, reflection questions) and the *map* right where they have one
(Ligonier's roadmap "visible throughout"). They are weakest at the two ends: the
calendar (self-paced, so nothing tells you when to start or that anyone else is
starting) and the close (a certificate). The habit platforms (YouVersion,
Hallow) are strongest on the calendar and the ritual of starting, and then
measure the wrong thing: streaks, "longest streak," minutes prayed, badges,
counters of how many joined. YouVersion's own partner documentation concedes
the core problem in one line: it accepts fewer 365-day plans "because we see
our users more likely completing shorter Plans," with completion peaking
between 3 and 21 days.

The group programs teach the most important lesson in this cluster. Formation
happens in conversation, and the best ones design for it: Alpha's host is told
to listen rather than "win an argument," guests are told they do not have to
talk, and the newer films stop at set points to put a question on the screen;
Bible Study Fellowship puts the reader's own answers to the week's questions
*before* the group, the teaching, and the notes, in that order.

LiveWell already owns most of the content a serious course program needs, and
more group scaffolding than any of these products gives away free: 68 study
guides, every one with session timing, discussion questions with a "behind
this question" note for the leader, objections stated at full strength, a
facilitator's opening, transition and close, and three cadences (for example
5, 8 or 4 weeks); 29 eight-week care plans with "grace built in"; four family
reading plans of 21 and 30 days; the 2027 whole-story plan built on the eleven
acts of `story.json`; and a church history course whose session shape (myth
check, story, the other side, the mirror, check yourself, talk, leader notes,
handout) is already planned. What it lacks is the frame around them: the map
in view, a start date a church can share, a mode that runs a session in a room,
a recurring question the reader answers in his own words, finishable units,
and an ending worthy of the work. Section 4 ranks fifteen patterns that supply
that frame. Nearly all of them are small, and none needs an account.

---

## 1. What LiveWell already has on this ground

Read in the repo on the work branch (`claude/todo-implementation-hhp4bm`), so
the patterns below build on real files:

- **Care plans** (`/plans/:slug`, 29 plans, `client/public/plans/*.json`):
  eight weeks, each week a `focus`, a `why`, one `practice`, one `read`, one
  `tool`, and one `reflection`; a start date and checked weeks kept in this
  browser (`lw-plan-<slug>`); the file's own header says "a missed week is
  named as normal, never failure." `myProgress.ts` already reads these back as
  "3 of 8 weeks walked."
- **Study guides** (`/studyguides/:slug`, 68 guides): sessions with `aim`,
  `keyScripture`, `timing` (for example Open 5, Discuss 35, Close 10 minutes),
  `discussion` (each question with a `behind` note for the leader),
  `objections` with responses, a `quietRoomQuestion`, a `practice`, a
  `closingPrayer`, `teaching`, `scriptureStudy`, `caseStudy`, `memoryVerse`;
  per guide a `leaderPrimer`, `faq`, `timeline`, `facilitatorScript` (`open`,
  `transition`, `close`), `cadences` (all 68 have them), `bibliography`,
  `glossary`, `scriptureIndex`, and a `promoKit` with a bulletin blurb and pulpit
  announcement. This is a group course kit already; it has no room mode and no
  dated schedule.
- **Family reading plans** (`/family/reading-plans`): four plans,
  `life-of-jesus` (30 days), `heroes-and-promises` (30), `psalms-for-the-family`
  (30), `foundations` (21), each day a passage and a spoken prompt.
- **The story of the Bible** (`/study/bible/story`, `/study/bible/story/:act`):
  eleven acts from Creation to the New Creation, each with `dates`, `world`,
  `watch`, `people`, and a reading `path` across all 1,189 chapters.
- **Read the whole story in 2027** (U28, in the patch above): a page at
  `/study/bible/guides/whole-story-2027`, 365 days each tagged with its act,
  "Day 40 of 365 · Tuesday, February 9," a place kept on the device, "pick up
  at your place, or at today's day," and a calendar reminder (`RemindMe.tsx`).
  Counting the days per act in that patch: Creation 1, the Fall 3, Abraham 15,
  Exodus and Sinai 53, the Land and the Judges 18, the Kingdom 93, the
  Prophets and Exile 78, the Return and the Silence 18, Christ 39, the Church
  and the Spirit 41, the New Creation 6. The Kingdom opens on Day 91 (Thursday,
  April 1); the Prophets and Exile on Day 184 (Saturday, July 3); Christ on Day
  280 (Thursday, October 7).
- **Table mode** (`/family/devotions/:id?mode=table`): one part per screen,
  large type, Back and Next in thumb reach, the step held in the URL, the screen
  kept awake, ending on a plain "We did this tonight" that records the date on
  the device and nothing more. This is the right template for a room mode.
- **The church history course** (MASTER-PLAN 7.2, U30 to U33): sessions with a
  myth check before and after, source cards, "how it looked from the other
  side," "where we do this too," retrieval questions with no score, discussion,
  leader plans of 45 and 75 minutes, a handout, and "Session 3 of 6 in Part I."

---

## 2. The products

Each entry: who it serves; how it is organized; its signature features and the
interaction behind them; look and type where described; how it holds attention;
what to steal; what is weak.

### 2.1 BibleProject Classroom

**Who.** Free, self-paced courses for lay adults who want seminary-shaped
teaching without enrolling, and for groups.

**How it is organized.** The help center groups Classroom questions under
Getting Started (including "an overview of Classroom's playback features"),
Taking Classes, Classroom in the App, Class Resources (where to download the
Teacher Notes handouts), and Other Questions. The Classroom page says classes
"range from four to sixteen hours" and "come with a collection of student
resources"; a third-party listing says most are a 12 to 15 hour commitment.
BibleProject adds about three or four classes a year. In 2022 Classroom was
unified with the main app and site (a third-party analysis).

**Signature features and the interaction behind them.**
- *The session as the unit.* Third-party descriptions agree that sessions run
  20 to 30 minutes, pairing a lecture "filmed with a live cohort of students"
  with teacher's notes, interactive quizzes, and reflection questions. A
  student testimonial on the Classroom page praises that "the materials showed
  up on the screen along with the video."
- *Two named group formats.* The help center: either each person watches with
  a personal account and the group gathers to discuss afterward, or a leader
  shows the videos and facilitates; facilitator guides exist for select
  classes.
- *A ceiling, stated honestly.* Completing every session earns "a digital
  achievement certificate," and the help center says plainly the classes are
  not designed for academic credit. Northern Seminary separately lets
  Classroom students apply up to six credits toward a certificate or master's
  degree with additional work.
- *Its own history.* An older listing describes Classroom as live seminars of
  12 students "taught by Tim" (Mackie, by every other source) over two or three
  days, which appears to be the origin of the "filmed with a cohort" lectures.

**Look and type.** Not seen. A former product designer (Jeremy Spingath,
2018 to 2024) lists Classroom as "an online learning management system" he
worked on; no case study of it was found.

**Attention and habit.** Free, slow, and curated: a few classes a year, each
substantial, each with the same session grammar.

**Steal.** The 20 to 30 minute session as the honest unit. Teacher's notes as
a handout you can print. The two group formats, named so a leader can choose.
A deliberately small catalogue. The candor about what a completion means.

**Weak.** Video-first teaching cannot be searched, quoted, or skimmed; a
personal account is required to track progress; the finish line is a
certificate; nothing tells a reader when to start or that anyone else is
starting.

### 2.2 Ligonier Connect

**Who.** Adults and churches in the Reformed tradition: individuals, Sunday
school classes, small groups. Paid; a third-party review gives about $25 a
month or $250 a year (may be out of date); a "community subscription" lets one
person manage everyone's access.

**How it is organized.** 100+ video courses (115+ in `benchmark.md`) in
biblical studies, theology, Christian living, worldview, and church history.

**Signature features and the interaction behind them.**
- *The roadmap.* Ligonier's description: each course "starts with a roadmap
  showing every lesson and step, and that path stays visible throughout," so the
  learner sees what is finished and what is next.
- *The lesson's opening.* "Each lesson begins with an introduction, learning
  goals, and key ideas" (Ligonier, on Sunday school use). The printed and
  digital study guides list lesson objectives, a message outline, study
  questions, and discussion questions.
- *Recall, kept optional.* Each video lesson (20 to 30 minutes) has an optional
  quiz "for checking recall and comprehension of the main points," described
  elsewhere as "a multiple-choice review quiz," plus discussion questions that
  prompt application.
- *The study group.* A leader "can set a schedule for finishing a course,
  track the group's progress, and work through questions along the way"; the
  group can keep talking online during the week.
- *The flipped classroom.* Ligonier tells Sunday school teachers to have the
  class watch the lesson during the week and use the hour for discussion.

**Look and type.** Not seen.

**Attention and habit.** A visible path, a group schedule, and a teacher whose
voice runs through the whole catalogue (R.C. Sproul).

**Steal.** The roadmap on screen from the first moment to the last. The
lesson's opening triad. A schedule a leader sets once for the whole group. The
flipped-classroom advice, written for the person who actually runs the room.

**Weak.** A paywall. Lecture as the only medium. One tradition's reading. A
leader view that tracks each member's progress, which turns a study into
supervision. Multiple-choice recall tests recognition, the weakest kind.

### 2.3 Ascension: The Bible in a Year, the Great Adventure timeline, and the Family Edition

**Who.** Catholic adults first (a billion downloads reported in March 2026,
*secondhand*), and from January 1, 2027, families with children 7 to 12.

**How it is organized.** 365 daily episodes, plus twelve special episodes in
which Jeff Cavins joins Fr. Mike Schmitz to introduce each new period of the
timeline. An app carries an interactive reading plan for Bible in a Year and
its sibling, Catechism in a Year.

**Signature features and the interaction behind them.**
- *The day's fixed shape.* Ascension's help center: each 20 to 25 minute
  episode has two to three Scripture readings, a reflection, and a guided
  prayer. "You don't need a copy of The Great Adventure Bible to follow along."
  It "is designed to be started at any point in the year."
- *The map.* The order follows the Great Adventure Bible Timeline: 14
  "narrative" books carry the story, and the other 59 "supplemental" books are
  "placed into their historical context." The story is cut into 12 periods,
  each with a color chosen as a memory aid, which Ascension explains: Early
  World turquoise (the earth seen from space), Patriarchs burgundy (the blood
  covenant with Abraham), Egypt and Exodus red (the Red Sea), Desert Wanderings
  tan, Conquest and Judges green (the hills of Canaan), Royal Kingdom purple.
  The wall chart adds the covenants, Jesus's genealogy, 68 key events as an
  outline of the story, the reigning world power for each period, and events
  in world history "in real time." There is a folding kids' chart.
- *The turn at each period.* A special episode with Cavins when a new period
  begins, "to help you understand the context of each reading."
- *Checkpoints.* Episode listings show special episodes titled "Messianic
  Checkpoint: The Gospel of Matthew" (and of Mark, Luke, and John), with
  Cavins. One listing places the John checkpoint near Day 99, a day whose
  readings were John 4 to 6 and Proverbs 5:7 to 14, which suggests the Gospels
  are read inside the year's Old Testament stretch rather than saved for the
  end (exact placement unverified).
- *Text beside the voice.* The Ascension app includes "the exact wording of Fr.
  Mike's daily prayers," summaries, and extra content for every episode; "an
  interactive reading plan ... that tracks your progress"; notes and bookmarks
  "so you can quickly pick up where you left off." A paid Companion adds a
  "Take It to Prayer" section. Catechism in a Year carries transcripts,
  "answered questions," and linked references and verses.
- *The Family Edition.* Announced in 2026: 365 episodes with Fr. Josh Johnson,
  each a reading, a reflection for young listeners, answers to children's Bible
  questions, and a prayer; a daily video in which the passage appears on screen
  as he reads and "sacred artwork helps children remember the characters," with
  audio as "a screen-free option"; on the same Great Adventure timeline.

**Look and type.** The color system is the signature: one mnemonic color per
period, reused on the chart, the Bible's tabs, and the kids' materials.

**Attention and habit.** One voice daily; a map of the whole; a second voice at
every turn of the story; a start date that does not punish a late start; and
now the same story for the children.

**Steal.** The map that travels with the plan. The difference between the
books that carry the story and the books that sit inside it. An introduction
at every turn of the story. A look toward Christ inside the Old Testament
year. The prayer's text published, not only spoken. A family edition on the
same calendar.

**Weak.** 20 to 25 minutes a day is a heavy unit. Twelve hues would break
LiveWell's palette (mustard is punctuation; cream and black are the rooms).
The best study aids sit in a paid companion.

### 2.4 The Bible Recap

**Who.** Lay readers following a one-year chronological plan, often as a
whole church (many church pages host the plan with their own FAQ).

**How it is organized.** A daily podcast; the plan in YouVersion and Dwell; a
book of recaps; a study guide; a chronological ESV study Bible; and D-Group, a
network of discipleship groups founded by the host, Tara-Leigh Cobble.

**Signature features and the interaction behind them.**
- *Read first, then the recap.* Church guides: "read the assigned scripture
  reading, then tune in to The Bible Recap podcast, video or book." The book's
  recaps are about two pages, "about 5 minutes."
- *Prep episodes.* Episodes launch daily from January 1; a latecomer is told to
  "scroll back to listen to the Prep Episodes" and set the podcast player to
  sequential order. Churches tell members to watch the prep episodes before
  day one.
- *Pick up today.* A church FAQ: "you can join at any time," "catch up at your
  own pace," "pick up on today's reading and keep moving forward." Two sizes:
  the whole Bible in 365 days, or the New Testament in three months.
- *One lens for every day.* Cobble's *The God Shot* (Bethany House, 2022)
  gathers "100 snapshots of God's character" and promises readers will "learn
  how to spot God shining through in your own Bible reading." The study guide
  gives "reflection and research questions specific to each day's reading" with
  space to write.

**Look and type.** Not seen.

**Attention and habit.** A short, warm voice after the reading, a calendar the
whole church shares, and one recurring question that trains the eye.

**Steal.** Reading before explanation. A prep week. "Pick up today's reading."
One recurring lens question, asked every day, so the reader learns to ask it
himself.

**Weak.** A recap can become a substitute for reading. The chronological order
surprises readers who expect canonical order (noted in the sibling report).
The lens is phrased in brand language.

### 2.5 Our Daily Bread University

**Who.** Free learners "of all levels," including pastors and small-group
leaders; formerly Christian University GlobalNet.

**How it is organized.** Courses in the Old and New Testaments, theology,
biblical languages, ministry leadership, apologetics, church history. Counts
conflict: 100+ (a 2026 review), 170+ in six languages (a third-party page), and
200 "through a premium subscription" (an ODB description). Whether there is a
paid tier at all is contradicted between sources.

**Signature features and the interaction behind them.** A 2018 account: a short
syllabus, lectures "delivered via PDF document, audio, and video," and "a
listening guide for notes"; the example course had four lectures and a 37-page
study guide. Most courses carry "individual and small-group study guides." It
calls itself "non-degree, certificate-level"; each course earns a certificate
of completion. Most sessions can be previewed before creating an account.

**Steal.** Every lecture in three forms (text, audio, video). The listening
guide: a fill-in sheet keyed to the lecture, the oldest effective study aid
there is. Preview without an account.

**Weak.** Catalogue sprawl, conflicting public information about what is free,
and the certificate as the goal.

### 2.6 RightNow Media

**Who.** Churches subscribe; members get the library free (20,000+ titles per a
2026 review; its own marketing calls it "the Netflix of Bible study video").

**Signature features and the interaction behind them.** Leader's guides "to
take as much of the work as possible out of preparing a small group session";
group spaces "for planning meetings, sharing prayer requests, and discussing
content," with chat threads on videos; **Watch Together**, a link sent by email
or text that opens a shared viewing with video chat; a custom library where a
church adds its own videos; leaders invite members from inside the library;
interactive content with "response boxes, polls, multiple-choice questions,"
which leaders can assign "and see when the assignments are completed";
offline playback and audio-only mode; "Keep Watching" and "My Saved" in app
listings.

**Steal.** Distribution through the pastor, which is the PCN channel exactly.
Leader preparation done for the leader. Resume where you stopped. Audio-only.

**Weak.** Volume over curation; "video, not a study suite" (the same review);
completion monitoring of members; a social network inside a Bible study.

### 2.7 Reformed Theological Seminary: free courses and the RTS app

**Who.** Lay readers and pastors who want real seminary lectures.

**What it is.** Free audio lectures that, per a long-standing free-courses
list, are "the very same courses enrolled students use," first on iTunes U and
in an RTS app, now in the RTS Mobile app (2026 listings: more than 30 Global
Education courses). The lists give numbered series: a 30-part Gospels course,
40-part pastoral and church history series, a 29-part Christology,
Soteriology, and Eschatology course in video. The same list mentions an RTS
app for learning the Westminster Shorter Catechism.

**Steal.** The candor of "the same lectures our students hear," free. A long,
numbered series as a curriculum spine.

**Weak.** No scaffolding at all: a list of lectures, no questions, no checks,
no group guide. The iTunes U home it was built for was retired, a reminder that
a course should live on its own site.

### 2.8 Alpha (in person and online)

**Who.** Guests exploring Christianity, hosted by local churches; online since
the pandemic.

**How it is organized.** About eleven weeks: weekly sessions plus a weekend (or
day) away. The adult Film Series has 15 videos of about 30 minutes, four of
them for the weekend (Alpha Canada); episode lists differ by country (one runs
to 13, another to 16). The first four titles agree across sources: "Is there
more to life than this?", "Who is Jesus?", "Why did Jesus die?", "How can I have
faith?" The two Holy Spirit sessions sit on the weekend away (a diocesan
guide).

**Signature features and the interaction behind them.**
- *A timed evening.* One run sheet: team prayer, a 10-minute welcome, 45
  minutes of dinner, a 30-minute talk, 45 minutes of discussion, a 15-minute
  team debrief.
- *Discussion breaks.* In the Film Series with Discussion Breaks, "the host is
  prompted to pause the video, and a discussion question appears on screen";
  after the group talks, the host resumes.
- *The host's covenant.* Guests are told "you don't have to talk, but we'd love
  to hear everyone's thoughts." Team guides: the host's role "is to listen; not
  to have all the answers or to win an argument"; groups are "ruined" by hosts
  and helpers talking too much or by one guest dominating; helpers "listen and
  pray silently." Online: groups of no more than eight (six guests, host,
  helper) and discussion of no more than 30 minutes.

**Steal.** Session titles phrased as the guest's own questions. The break in
the teaching where the question goes up on the screen. A written covenant for
the host. The timed run sheet. Small groups, kept small.

**Weak.** The meal and the weekend cannot live on a website. The weekend's
emphasis is a second-order question LiveWell would hold open. Numbering and
content vary by country.

### 2.9 YouVersion plans

**Who.** Everyone; plans supplied by publishers under YouVersion's rules.

**Signature features and the interaction behind them.**
- *The partner rules, which are the best public data in this cluster.* Plans
  run 3 to 365 days; YouVersion is "accepting fewer 365-day Plans (especially
  in English) because we see our users more likely completing shorter Plans,"
  with "spikes in completion success between 3 days and 21 days." Daily
  devotional text "at or under 400 words" because most readers are on phones.
  The devotional comes first and the day's Scripture after it. No links out
  except one call to action at the end. No attacking people or political
  platforms. Two weeks' lead time, four for seasonal plans; third-party
  deadlines for 2026 were October 21 (Advent) and November 20 (January and
  365-day plans), both now past or near.
- *Plans with Friends.* Invite friends into a plan; a group view shows
  progress; at the end of each day a "Talk It Over" question invites
  discussion; a "Private" setting keeps a plan off the friends feed.
- *Streaks and badges.* Streaks count consecutive days in the app, with
  "mini-celebrations" at milestones; badges for highlights, notes, and
  completed plans.

**Steal.** The size data. The per-day word budget. One "talk it over"
question at the end of the day.

**Weak.** Streaks, badges, a friends feed of spiritual activity, and depth that
varies by publisher. The rule that devotional comes before Scripture is the
opposite of what LiveWell should do (pattern 7).

### 2.10 Dwell listening plans

**Who.** Listeners; subscription after a seven-day trial ($59.99 a year solo,
per the App Store listing).

**What it is.** "75+ listening plans to guide you through Scripture day by
day" (an older listing said 44), named by size: *Proverbs in 30 Days*,
*Romans in 7 Days*, *the Parables of Jesus in 14 Days*, *The Bible in a Year*.
Plans pair with daily reminders; a sleep mode; themed playlists (hope,
discipleship, salvation) kept separate from plans.

**Steal.** Names that state the size. The difference between a plan (a
sequence with days) and a collection (a playlist with no order).

**Weak.** Paid, reminder-driven, and no teaching between the passages.

### 2.11 Hallow challenges

**Who.** Catholics; seasonal challenges are the front door.

**Signature features and the interaction behind them.**
- *The season as the door.* Pray40 begins on Ash Wednesday; people can join
  later; "a guided audio path releases one new session per day through Lent"
  (Hallow's 2026 FAQ). Each year has a theme.
- *A great book beside Scripture.* 2026's *The Return*: the prodigal son, with
  Dostoevsky's *The Brothers Karamazov*, Jonathan Roumie leading "short daily
  episodes summarizing key moments, then reflecting on characters, themes, and
  spiritual relevance," alternating with Henri Nouwen's *The Return of the
  Prodigal Son*. A separate program walks through *The Screwtape Letters*.
- *Counting.* A "joined" or "praying" counter (the Pray40 page showed 1.91M
  joined); the Activity screen shows Prayer Goal, Goals Completed, Minutes
  Prayed, Current Streak, and Longest Streak; "routines" with reminder
  notifications. A National Catholic Register writer compares the approach to
  Duolingo and Strava.
- *Groups and price.* Kick-off webinars show how to set up a small group in the
  app; participation needs a trial or subscription (a three-month trial offer).
  Celebrity guides lead parallel fasting challenges.

**Criticism seen.** *Crisis* objected to "problematic monetization and
celebritization of prayer"; UnHerd's Giles Fraser criticized the pricing;
Mozilla's privacy review rated it "A little creepy" (all via the Wikipedia
summary and Mozilla's page).

**Steal.** The church season as the start. One session released per day so
everyone is on the same page. A great book read alongside Scripture.

**Weak.** Counters, streaks, minutes, celebrity, a paywall on the season, and
data used for marketing.

### 2.12 Added: Bible Study Fellowship

**Who.** Lay adults worldwide, in weekly groups of about 90 minutes over a
30-week study; a free WordGo app gives church small groups "chapter-by-chapter
Bible study curriculum" with a daily reading and daily questions.

**What it is.** BSF's own four-step model runs in a fixed order: personal study
with daily questions, small-group discussion, teaching from a trained leader,
and the lesson notes last. A local group describes it as personal study during
the week, then lecture and discussion on Monday evening, then "notes/commentary
to read after Monday."

**Steal.** The reader's own answer before anyone else's. Notes last.

**Weak.** Thirty weeks of homework is heavy, and the order can feel rigid.

### 2.13 Added: Practicing the Way

**Who.** Churches and groups; free resources funded by donors (`benchmark.md`).

**What it is.** An eight-session course of "teaching, guided conversation, and
spiritual exercises," each session with a practice for the week; session 7 has
participants craft a personal Rule of Life, with a web Rule of Life Builder
(described as drag and drop of disciplines, rhythms and habits). A host guide
asks leaders to let members lead the discussion rather than lecture. A
four-session offering per practice repeats the shape: teaching, guided
discussion, exercises.

**Steal.** A practice as the homework, not a worksheet. A course that ends in
something the person makes and keeps.

**Weak.** TGC's review calls it individualistic (`benchmark.md`); little
history.

### 2.14 Reference: Daf Yomi and the siyum

Not a product, but the oldest working model of what this cluster is trying to
do. Daf Yomi reads the Babylonian Talmud's 2,711 pages one page a day, in
sequence, worldwide; the thirteenth cycle ended January 4, 2020, and the
fourteenth began the next day. The end of each tractate is marked by a small
*siyum*, a celebration of completion; the end of the whole cycle by the Siyum
HaShas (January 1, 2020, at MetLife Stadium, over 90,000 people, with speeches,
singing and dancing). No streak, no badge: completion is a communal rite at a
natural joint in the text, and the next cycle starts the next day. (The
sibling report covers Sefaria's calendars; this adds the ending.)

### 2.15 Research that bears on the design

- **The fresh start effect.** Dai, Milkman and Riis (*Management Science*,
  2014) found that aspirational behavior (searches for "diet," gym visits,
  goal commitments) rises at temporal landmarks: the start of a week, a month,
  a semester, after a birthday or holiday, and at the New Year. Starts are
  doors; a program with many legitimate starts has many doors.
- **Long courses lose nearly everyone.** Reich and Ruipérez-Valiente (*Science*,
  2019), on 5.6 million edX learners from 2012 to 2018: completion stayed low
  and did not improve in six years (3.13% of all participants in one year, per
  Inside Higher Ed); more than half of registrants never opened the
  courseware.
- **Retrieval beats rereading.** Roediger and Karpicke (*Psychological
  Science*, 2006): on tests two days and a week later, students who had been
  tested on a passage retained "substantially greater" amounts than those who
  restudied it (secondary sources give 61% against 40% at one week; I did not
  see those figures in the abstract). The advantage is for recall at a delay,
  which is what a year-long reader needs.
- **Expected rewards undermine the thing rewarded.** Deci, Koestner and Ryan
  (*Psychological Bulletin* 125, 1999), a meta-analysis of 128 studies:
  engagement-, completion- and performance-contingent rewards significantly
  reduced free-choice intrinsic motivation (d = -0.40, -0.36, -0.28). The
  finding is contested (Cameron and Pierce), but it is the strongest general
  argument against completion badges for a practice meant to be loved.

---

## 3. The anatomy the lasting programs share

Set side by side, every program that keeps people for months has five layers,
and each product's weakness is a missing layer.

| Layer | What it answers | Done best by | Missing or wrong in |
|---|---|---|---|
| **Calendar** | When do I start, and who else is reading this today? | Bible in a Year, The Bible Recap, Pray40, Daf Yomi | Classroom, Ligonier, ODBU, RTS (self-paced only) |
| **Map** | Where am I in the whole? | Great Adventure timeline, Ligonier's roadmap | YouVersion plans, Dwell, RightNow |
| **Unit** | What is today, and how long will it take? | Classroom and Ligonier sessions (20 to 30 min), The Bible Recap (read, then 5 minutes), YouVersion's 400 words | RTS (40-part lists), Bible in a Year (25 minutes is heavy) |
| **Room** | Who do I talk to, and how is the talk led? | Alpha, BSF, Practicing the Way, Ligonier groups | Hallow, Dwell, YouVersion (a feed, not a room) |
| **Record and close** | What did I keep, and how does it end? | Daf Yomi's siyum; Practicing the Way's Rule of Life; The Bible Recap's written answers | Certificates (Classroom, ODBU), streaks and badges (Hallow, YouVersion) |

LiveWell holds strong units (study guide sessions, care-plan weeks, devotions,
the history session design) and the beginnings of a room (leader notes in every
guide). The patterns below add the calendar, the map, the room mode, the record
in the reader's own words, and the close.

---

## 4. The patterns most worth bringing to LiveWell, ranked

Ranked by value to James's brief against cost, inside the rules of MASTER-PLAN
section 2 (position, not performance; personal state on the device; shareable
state in the URL; tokens only; no accounts). Where a sibling report already
proposed the base idea, this says what is added.

### 1. The story's map, always in view

*Seen in:* Ascension's Great Adventure timeline (12 periods with mnemonic
colors; 14 narrative books carrying the story, 59 placed inside it; 68 key
events; the reigning world power per period); Bible in a Year's special
episode at each new period; the Messianic Checkpoint episodes; Ligonier's
roadmap "visible throughout."

*What it is.* Every day of a long plan shows the whole story as a band, names
the part the reader is in, and marks today. Each new part opens with its own
introduction. Readings that sit inside the story (a psalm, a prophet) are
labeled as such so the reader knows why Amos is beside 2 Kings.

*Why it works.* A year is too long to hold without a picture. Ascension's
whole system is built on the reader always knowing which period he is in;
the second voice at each turn is the moment the reader re-orients.

*On LiveWell.* On `/study/bible/guides/whole-story-2027` and each day card, a
thin band of the eleven acts from `story.json` (Creation through the New
Creation), with "Day 214 · The Prophets and Exile." Not twelve colors: the
palette forbids it. Acts differ by position and label, past and future acts in
`--ink-muted`, the current act in `--ink`, a single mustard tick for today.
Tapping an act opens `/study/bible/story/:act`. The first day of each act is
an **act opening**: the act's existing `world` and `watch` text as the day's
preface (already written; no new prose needed), the way Bible in a Year gives a
special episode at each turn. Where a day's chapters are a prophet or psalm set
into its moment, a small label says "Written in this moment." Later, if James
wants it, one New Testament passage at the close of each Old Testament act as
a "look ahead" (the checkpoint idea, kept to one passage so story order holds).

*Fit:* core. *Effort:* M (UI over data the U28 schedule already carries: each
day has its `act`).

### 2. Doors at the joints: a prep week, a shared first day, and an on-ramp at every act

*Seen in:* Bible in a Year ("designed to be started at any point"); The Bible
Recap (episodes from January 1, prep episodes before, "pick up on today's
reading"); Pray40 (Ash Wednesday, join later); Daf Yomi (the next cycle starts
the next day); the fresh start effect.

*What it is.* A plan publishes its starts: one shared first day, a short
preparation before it, and a named on-ramp at every natural joint, so a reader
who missed January has a dignified door in April.

*Why it works.* People start things at landmarks (Dai, Milkman and Riis); a
year-long plan with one start date has one door, and a plan with eleven has
eleven. The sibling report's "plans that forgive" handles the reader who
stopped; this handles the reader who never began.

*On LiveWell.* From December 26, a **Before Day 1** section on the 2027 plan
page: how a day works, how long it takes, what to do on a missed day ("read
today's, not yesterday's"), and why the order is the story's order. On the plan
page all year, one line: "Starting now? *The Kingdom* begins on Day 91,
Thursday, April 1," with *Add to calendar* for that date (the existing
`RemindMe` `.ics`). Each act start is a door the newsletter can name. The same
treatment for Lent (Ash Wednesday, February 10, 2027) when a Lent plan exists.

*Fit:* core. *Effort:* S.

### 3. One question every day, answered in your own words

*Seen in:* The Bible Recap's "God shot" ("learn how to spot God shining through
in your own Bible reading") and its study guide's daily questions with space
to write; YouVersion's "Talk It Over"; Bible Study Fellowship's daily
questions.

*What it is.* The same short question closes every day of a plan. The reader
can write one line, kept on the device. At the end of a part, the lines come
back in order.

*Why it works.* A recurring question trains the eye: after a month the reader
asks it without being asked, which is the skill a plan exists to give. Writing
one line is retrieval, which is what makes reading stick (Roediger and
Karpicke). Reading the lines back is the only "progress" worth showing: what
the reader saw, not how many days he logged.

*On LiveWell.* Each day card in the 2027 plan ends with a two-part question,
the same all year (wording for James): *What did today's reading show you
about God? What did it show you about us?* The second half keeps the reader
inside the indictment, per CLAUDE.md. A one-line field, saved through
`lib/storage.ts` under the day, said plainly ("kept on this device"). On the
act's last day: "What you saw in *The Kingdom*," the reader's own lines in
order. No count of answered days, no sharing.

*Fit:* core. *Effort:* S.

### 4. Lead this session: a room mode with discussion breaks

*Seen in:* Alpha's Film Series with Discussion Breaks (the host pauses, a
question appears on screen); Alpha's timed run sheet; RightNow's Watch
Together; BibleProject's "leader shows the video and facilitates"; Ligonier's
flipped classroom.

*What it is.* A full-screen mode for running a session in a room: one step
per screen, large enough for a television or a laptop at the head of the
table, with the question held on the screen while people talk, and the
leader's notes visible only to the leader.

*Why it works.* The weakest moment in a small group is the leader paging
through a PDF. Alpha's newest format solves it by putting the question on the
screen at the moment it is needed and stopping the teaching for the talk.

*On LiveWell.* On `/studyguides/:slug` (all 68 guides already carry `timing`,
`discussion` with `behind`, and `facilitatorScript`), a *Lead this session*
button opens a mode built on The Table's `TableFrame` and `Stepper`: Open (the
facilitator's opening) → key Scripture → each discussion question alone on a
screen → the quiet-room question → practice → closing prayer. The segment
minutes from `timing` show as a quiet "about 35 minutes" label, never a
countdown. "Behind this question" opens on the leader's own phone (the same URL
with `&leader=1`). Step in the URL (`?lead=1&step=4`), screen kept awake. The
history sessions (U32) reuse it.

*Fit:* core. *Effort:* M (the template exists; the content exists).

### 5. Run it with your church: a dated schedule from one start date

*Seen in:* Ligonier study groups (a leader sets the schedule); RightNow
(distribution through the church, invitations); BibleProject's two group
formats; churches hosting The Bible Recap plan with their own dates and FAQ.

*What it is.* A leader picks a start date and a pace; the page writes the dates
beside every session and hands back a link, a calendar file, and a printable
schedule that every member can open. No accounts, and no one tracks anyone.

*Why it works.* The calendar is the layer the self-paced course platforms
lack, and it is what a pastor actually needs to start a study on Sunday.
RightNow and Ligonier show that churches will distribute what serves their
members; PCN is LiveWell's channel for exactly that.

*On LiveWell.* On each study guide (and later each history Part), a *Plan it
for your group* box: a start date and one of the guide's existing `cadences`
("5 sessions," "8 weeks," "4 weeks"). The roadmap (pattern 6) then shows
"Session 3 · Sunday, February 7." The state lives in the URL
(`/studyguides/after-christendom?start=2027-01-10&cadence=8`), so the link a
pastor sends opens the same dated roadmap for everyone. Beside it: *Add every
meeting to my calendar* (`.ics`) and *Print the schedule* (with the guide's
`promoKit` bulletin blurb). Nothing about who attended or finished.

*Fit:* core. *Effort:* M.

### 6. The roadmap of questions, on screen one

*Seen in:* Ligonier's roadmap; Alpha's titles ("Who is Jesus?", "Why did Jesus
die?"); Classroom's stated hours per class; Dwell's plan names that state the
size ("Romans in 7 Days").

*What it is.* Every course-shaped thing opens with its whole path: each session
numbered, titled as the question it answers, with its length and kind of work,
and a quiet mark for the ones done on this device.

*Why it works.* A reader commits to what he can see the end of. Titles phrased
as questions tell the skeptic and the doubting Christian that their question
is the agenda, which is the promise Alpha makes in its first episode title.

*On LiveWell.* On study guides, care plans, the history course front door, and
the act list of the story plan: a list on screen one, "1. What has actually
ended? · 25 minutes · read and talk," "Session 3 of 5," a check for done.
Position only, per MASTER-PLAN ("Session 3 of 6" yes; "68% complete" no).
Where titles are statements today, the question form is a content edit for
James to approve.

*Fit:* core. *Effort:* S (UI); titles are content.

### 7. Your answers before ours

*Seen in:* Bible Study Fellowship's order (personal questions, then group, then
teaching, then notes last); The Bible Recap (read first, recap after); the
testing effect.

*What it is.* The reader meets the question before the explanation. Not
gated (a reader can open the teaching at any time), but ordered.

*Why it works.* A person who has tried to answer reads the answer differently,
and remembers it (Roediger and Karpicke). It also honors the skeptic: he is
asked what he thinks before he is told.

*On LiveWell.* The participant view of a study guide session shows the
discussion questions and key Scripture before the `teaching` text, which sits
in a *Read the teaching* disclosure after them. In history sessions, at least
one source card per session comes with two questions before James's narrative
interprets it. In the 2027 plan, the chapters come first and any note after
(pattern 13). The opposite of YouVersion's rule that the devotional precedes
Scripture.

*Fit:* strong. *Effort:* S to M.

### 8. A closing rite, not a certificate

*Seen in:* Daf Yomi's siyum at the end of each tractate and the Siyum HaShas;
Practicing the Way ending in a Rule of Life the person makes. Set against
Classroom's and ODBU's certificates, Hallow's "Longest Streak," YouVersion's
badges and "mini-celebrations."

*What it is.* When a part of the work ends, the reader gets an ending with
weight: Scripture, a prayer, his own words read back, and the next door.

*Why it works.* An ending is where formation is consolidated or lost. A
certificate tells an adult he has been graded; a rite tells him he has been
changed and is not alone. CLAUDE.md asks endings to "leave weight, never
resolve it"; this is that rule for a course.

*On LiveWell.* A closing page at the end of each act of the 2027 plan, each
care plan, each study guide, and each history Part: the act's last passage or
a psalm, a short prayer, the reader's own lines (pattern 3), in history the
myth-check statements asked again beside his first answers, and "What comes
next: *The Prophets and Exile* begins Saturday, July 3." For groups, a
printable closing for the last meeting (a responsive reading and a prayer).
No certificate, no confetti, no percentage.

*Fit:* core. *Effort:* S to M.

### 9. Sized to finish: acts and movements as units

*Seen in:* YouVersion (completion peaks between 3 and 21 days; fewer 365-day
plans accepted); the edX completion data; Dwell's sized plan names; The Bible
Recap's three-month New Testament option.

*What it is.* A long plan is offered as a chain of finishable units, each with
its own start, end and close.

*Why it works.* People finish what they can see the end of. A year is a
promise few keep; three weeks is one most can.

*On LiveWell.* Count the U28 schedule: the acts run from 1 day (Creation) to
93 (the Kingdom), 78 (the Prophets and Exile), 53 (Exodus and Sinai). Present
the year as acts, and divide the four longest into **movements** of two to
four weeks using the chapter titles already in the schedule (for example, the
Kingdom as Saul and David, Solomon, the divided kingdom; the exact cuts are an
editorial call). Each movement gets its own line on the roadmap, its own door
(pattern 2), and its own short close (pattern 8). A reader can commit to
"Exodus and Sinai, part one: three weeks" without committing to a year. The
care plans (eight weeks) and family plans (21 and 30 days) are already sized.

*Fit:* core. *Effort:* S.

### 10. One story at two tables

*Seen in:* Ascension's Bible in a Year: Family Edition (the same timeline,
ages 7 to 12, children's questions answered, sacred art for memory, audio as a
screen-free option) and the Great Adventure kids' chart.

*What it is.* The household follows the same part of the story the adults are
reading, in its own register, the same weeks.

*Why it works.* A parent who reads the Kingdom in April and hears David at the
dinner table that week holds one story twice, and the child hears that the
parent is reading too. It is the cheapest form of the household faith the
benchmark's parent research points to.

*On LiveWell.* In 2027, The Table's weekly line can say which act the year
plan is in and, where one exists, offer the devotion or family reading-plan
day that belongs to it (`heroes-and-promises` for the patriarchs and judges;
`life-of-jesus` when the plan reaches Christ on October 7). The year map
(`familyYear.ts`) records the pairing; where no family piece fits an act, the
line is simply absent. No new devotions are required to start.

*Fit:* core. *Effort:* M.

### 11. The host's covenant

*Seen in:* Alpha's host and team guides ("you don't have to talk"; the host's
role "is to listen; not to have all the answers or to win an argument"; do not
let one person dominate; online groups of eight or fewer); Practicing the Way's
host guide (let members lead).

*What it is.* A short, fixed set of promises the leader makes to the room,
printed on every guide.

*Why it works.* A skeptic will come once to a group where he is safe to
disagree and never to one where he is handled. The covenant is the
Audience Standard of CLAUDE.md made into four sentences a volunteer can keep.

*On LiveWell.* A *Before you lead* card at the top of each study guide's leader
material and each history session's leader notes, written once in James's
voice: no one has to speak; the leader listens more than he talks; the hardest
objection in the room is welcome and is stated at its strongest before anyone
answers it; we stop on time. Plus size guidance (eight or fewer around one
table; split the group above that). Printable, and the first screen of the room
mode (pattern 4).

*Fit:* strong. *Effort:* S.

### 12. A practice for the week, from the church's own past

*Seen in:* Practicing the Way (a practice per session; a Rule of Life at the
end); LiveWell's own care plans (a practice each week) and study guides (a
`practice` per session).

*What it is.* Each history session ends with one practice the period itself
kept, quoted from its own source, to try for a week.

*Why it works.* It turns church history from information into formation (the
Formation Standard's third movement) and makes the older church a teacher, not
an exhibit.

*On LiveWell.* For Part I, for example, the Didache's instruction to fast on
Wednesday and Friday and to pray the Lord's Prayer three times a day (Didache 8,
in the ANF translation U07 can reach; verify the wording against the stored
text before use). Each practice links to the Rule of Life tool
(`/tools/rule-of-life`) so the reader can keep the ones he wants. Nothing
records whether he did.

*Fit:* strong. *Effort:* S to M (content per session).

### 13. Read, then hear it told, then pray: the three beats of a day

*Seen in:* The Bible Recap (read, then a recap of about five minutes); Bible in
a Year (readings, reflection, prayer; the prayer's text published in the app);
YouVersion's 400-word ceiling.

*What it is.* A plan day has a fixed and short shape: the reading, a brief
word after it, and a one-sentence prayer.

*Why it works.* The fixed shape lowers the cost of every day; the order keeps
Scripture first; the brief word is where a trusted voice earns the habit.

*On LiveWell.* Each 2027 day card: the chapters (to the Study Bible), then
*After you read*: two or three sentences drawn from the Study Bible's existing
chapter notes for those chapters (no new writing to start), then a line of
prayer. A written note of 150 to 300 words per day in James's voice is the
richer version, but it is 365 pieces under the byline rule and needs his
decision before anyone drafts it; MASTER-PLAN already notes a 60-day "in its
world" plan with a written question per day as the Lent option.

*Fit:* strong. *Effort:* M (from existing notes) to L (new writing).

### 14. A companion book for the season

*Seen in:* Hallow's Pray40 (*The Brothers Karamazov* and Nouwen's *The Return
of the Prodigal Son* beside the parable); Hallow's *Screwtape Letters* program.

*What it is.* A season's readings are paired with one great book, read a
little each day beside Scripture.

*Why it works.* It gives the season a shape and a companion, and it treats the
reader as a grown-up who can read Dostoevsky in Lent.

*On LiveWell.* Lent 2027 (from Ash Wednesday, February 10) with Augustine's
*Confessions* in the public-domain translation in NPNF, if U07's source survey
confirms it is reachable: forty short readings, each beside a psalm or passage
the *Confessions* itself quotes, one question, and a link into the history
course's Augustine session. It is the history course's family of material
meeting the church year. Needs James.

*Fit:* maybe. *Effort:* L.

### 15. If there is a voice, the text travels with it

*Seen in:* Ascension's app (the exact wording of the daily prayers and a
summary of every episode); ODBU (each lecture as PDF, audio and video, plus a
listening guide); the Family Edition's audio as a screen-free option;
RightNow's audio-only mode.

*What it is.* Any recording is published with its full text, a short guide for
groups, and a download, and never as audio alone.

*Why it works.* Text can be searched, quoted, printed, checked, and read by
the deaf and by the skeptic who will not sit through 25 minutes of a voice he
does not yet trust.

*On LiveWell.* If James records readings of his essays or the plan's notes
(benchmark gap 10), each page carries the recording above the text it reads,
the text in full, and a printable listening guide for groups.

*Fit:* maybe (depends on James recording). *Effort:* M.

### Also considered, not ranked

- **Two named group formats** (BibleProject: alone then together, or together
  in the room): worth one sentence on each study guide's leader page; folded
  into pattern 5.
- **Preview without an account** (ODBU): LiveWell has no accounts; already
  true.
- **A "listening guide" fill-in sheet** (ODBU): the handout planned for history
  sessions covers it.
- **A second voice at each turn** (Jeff Cavins's period episodes): only if
  James wants a guest voice; pattern 1 uses the existing act text instead.

---

## 5. What to avoid

Each of these is in a product above and would betray "Unhurried. Weighted.
Grown-up." or the integrity rules.

1. **Streaks, longest streaks, minutes counted.** Hallow's Activity screen
   (Current Streak, Longest Streak, Minutes Prayed) and YouVersion's Streaks
   with milestone "mini-celebrations." They measure attendance, not
   formation, and expected, completion-contingent rewards undermine the
   motivation they reward (Deci, Koestner and Ryan, 1999). MASTER-PLAN already
   forbids them.
2. **Badges.** YouVersion awards them for highlights, notes, and completed
   plans. A badge for a highlight teaches the reader to highlight.
3. **Certificates of completion.** BibleProject Classroom and ODBU. Harmless in
   a seminary pipeline, but on LiveWell a printed gold star tells an adult he
   has been graded. Use the closing rite (pattern 8).
4. **Counters of how many joined or are praying.** Hallow's "joined" and
   "praying" counters (1.91M on the Pray40 page). Social proof is engagement
   bait, and it would put a number on the site no one has verified.
5. **Activity feeds and progress views of other people.** YouVersion's friends
   feed (private only if chosen), Plans with Friends' group progress view,
   RightNow's "see when the assignments are completed," Ligonier's leader who
   "tracks the group's progress." Formation is not compliance, and a pastor is
   not a supervisor of his people's devotions.
6. **Celebrity guides.** Hallow's actors and athletes; *Crisis*'s charge of
   "celebritization of prayer." LiveWell's moat is one man's voice.
7. **Gated seasons and trial upsells.** Pray40 needs a subscription or trial;
   Dwell's plans are behind a subscription; Ligonier Connect is paid. Nothing
   in a LiveWell season is behind a wall.
8. **The year as the only door.** YouVersion's own data and the edX data. Offer
   acts and movements (pattern 9).
9. **Volume.** RightNow's 20,000+ titles, ODBU's conflicting 100 to 200
   courses. Curation is the product.
10. **Scored quizzes.** Ligonier's multiple-choice review quiz and Classroom's
    quizzes. Keep retrieval (it works) and drop the score: tap to reveal,
    nothing tallied.
11. **Reminder pushes and nagging routines.** Dwell's daily reminders, Hallow's
    routines with notifications. LiveWell offers a calendar file the reader
    adds himself and nothing else.
12. **A recap that replaces the reading,** and a devotional that comes before
    Scripture (YouVersion's partner rule). Scripture first, always.
13. **Lecture lists with no scaffolding.** RTS's 40-part series with no
    questions, no checks, no guide. A list of recordings is a library, not a
    course.
14. **In-app chat, watch parties, accounts.** RightNow's chat threads and
    video-chat Watch Together. The talk belongs in a room; LiveWell has no
    accounts and should not build a social network to imitate one.
15. **Twelve colors for twelve periods.** The Great Adventure's mnemonic hues
    break LiveWell's palette contract. Position, label and one mustard tick
    carry the same information (pattern 1).

---

## 6. What I could not see

- The inside of any logged-in course player: BibleProject Classroom, Ligonier
  Connect, ODBU, RightNow Media. Layout, typography, how progress and the
  roadmap are drawn, where quizzes and reflections sit, and how resume works
  are all unseen; the help-center articles on Classroom playback were listed
  but not readable.
- Hallow's visual design: no design case study or designer write-up was found.
- The format of The Bible Recap's "God shot" inside the podcast (only the
  book's description was seen).
- The exact placement of Bible in a Year's Messianic Checkpoints across the
  year, and whether each day pairs a narrative reading with a wisdom reading
  (one sample day only).
- The colors and symbolism of the Great Adventure's periods 7 to 12 (only the
  first six were described).
- Alpha's official episode numbering (country sources conflict) and the
  current host notes in full (a 2025 PDF was found but not readable).
- The RTS Mobile app's current features (notes, offline, catechism), and
  current Dwell plan pacing (minutes per day).
- ODBU's program structure and whether a paid tier exists (sources conflict).
- Practicing the Way's four-session titles and kit contents.
- YouVersion help-center wording for Plans with Friends, and its current
  streak design.
- Any completion or retention data from these products other than
  YouVersion's partner statement; no primary data on Bible in a Year or Bible
  Recap completion.
- Any source code: none of these products is open source, and GitHub search is
  refused in this session.

---

## 7. Evidence

### LiveWell files read

- `client/public/plans/*.json` (29 plans) and `client/src/pages/plans/CarePlan.tsx`
  (header comment: "grace built in - a missed week is named as normal, never
  failure"; progress key `lw-plan-<slug>`).
- `client/public/studyguides/*.json` (68 guides; every one has `cadences`,
  session `timing`, and `facilitatorScript`), sampled in
  `after-christendom.json`.
- `client/public/family-reading-plans.json` (four plans, 21 and 30 days).
- `client/public/bible/story.json` (eleven acts: `id`, `dates`, `world`,
  `watch`, `people`, `path`) and `client/src/pages/StudyBibleStory.tsx`.
- `client/src/pages/family/TableMode.tsx` (one part per screen, step in the URL,
  wake lock, "We did this tonight").
- `client/src/lib/myProgress.ts` (device-only progress rows).
- `docs/work/patches/U28/0001-U28-Read-the-whole-story-in-2027.patch` (route
  `/study/bible/guides/whole-story-2027`, 365 days each tagged with `act`, "Day
  N of 365," "pick up at your place, or at today's day," `RemindMe.tsx`); act
  lengths and start days computed from its schedule lines.
- `docs/work/plan/MASTER-PLAN.md` sections 0 to 3 and 7.1 to 7.2;
  `docs/work/plan/benchmark.md`; `docs/work/design/research/A-bible-readers.md`
  and `A-text-study-gold.md` (to avoid repeating them).

### BibleProject Classroom

- [Help center, Classroom category](https://help.bibleproject.com/hc/en-us/categories/8055514734103-Classroom): sections Getting Started, Taking Classes, Classroom in the App, Class Resources, Other Questions.
- [Help center, Class Resources](https://help.bibleproject.com/hc/en-us/sections/23825393857687-Class-Resources) and [Getting Started](https://help.bibleproject.com/hc/en-us/sections/8270467485335-Getting-Started): Teacher Notes handouts; an overview of playback features (titles only).
- [Classroom page](https://bibleproject.com/classroom/): classes of four to sixteen hours with student resources; a student testimonial about materials on screen with the video.
- [faith.tools listing](https://faith.tools/app/36-bibleproject-classroom): 20 to 30 minute sessions, lectures filmed with a live cohort, teacher's notes, quizzes, reflection questions; certificate; not accredited; app redesign in beta; three to four new classes a year.
- [Help: school credit](https://help.bibleproject.com/hc/en-us/articles/8272263571863-Do-I-get-school-credit-for-completing-a-class): certificate, not academic credit.
- [Northern Seminary](https://www.seminary.edu/news/bibleproject-classroom/): up to six credits with additional work.
- [Help: Bible resources for groups](https://help.bibleproject.com/hc/en-us/articles/5586269406871-Bible-resources-for-groups): two group formats; facilitator guides for select classes.
- [get.bible listing](https://get.bible/featured-sites/site/classroom.bible): older format, live seminars of 12 students over two to three days.
- [Jeremy Spingath portfolio](https://www.jeremyspingath.com/project/bibleproject): product designer 2018 to 2024; Classroom as an LMS; no Classroom case study.
- [Scribd case study (third-party)](https://www.scribd.com/document/959466445/BibleProject-a-Case-Study-in-Building-a-Nonprofit-Media-Ecosystem-for-Biblical-Education): Classroom unified with app and site in 2022; lecture videos, notes, quizzes.

### Ligonier Connect

- [Ligonier Connect: Grow with Your Group](https://www.ligonier.org/posts/ligonier-connect-grow-with-your-group): leader sets a schedule, tracks group progress, works through questions; online group between meetings.
- [How to Use Ligonier Resources in Sunday School](https://www.ligonier.org/posts/how-to-use-ligonier-resources-in-sunday-school): introduction, learning goals and key ideas per lesson; multiple-choice review quiz; flipped classroom.
- [How to Use Ligonier Resources in Your Small Group](https://www.ligonier.org/posts/how-to-use-ligonier-resources-in-your-small-group) and [in a Bible Study](https://www.ligonier.org/posts/how-to-use-ligonier-resources-bible-study): video plus study guide use.
- [Ligonier Connect: Deepen Your Study of the Reformation](https://www.ligonier.org/posts/ligonier-connect-deepen-your-study-of-the-reformation) and [Basics of Reformed Theology](https://www.ligonier.org/posts/ligonier-connect-basics-of-reformed-theology): messages, embedded study guide, interactive questions, visible progress, private study groups; the roadmap description.
- [Holiness of God study guide listing](https://www.ebay.com/itm/255655139262): lesson objectives, message outline, study questions, discussion questions.
- [Learn of Christ review (third-party)](https://learnofchrist.com/resources/ligonier): price about $25 a month or $250 a year, possibly dated.

### Ascension: Bible in a Year, Great Adventure, Family Edition

- [What Is Bible in a Year](https://ascension.helpscoutdocs.com/article/71-what-is-bible-in-a-year) and [Bible in a Year Explained](https://ascension.helpscoutdocs.com/article/25-bible-in-a-year-explained): 20 to 25 minutes; two to three readings, reflection, prayer; RSV-2CE; Great Adventure Bible not required; Cavins episode per period; start at any point.
- [The Great Adventure hub](https://ascensionpress.com/pages/content-hub/the-great-adventure): 14 narrative books and 12 color-coded periods.
- [Bible Timeline colors PDF](https://ascensionpress.com/cdn/shop/files/BibleTimelineColorsLeadGen.pdf): colors and meanings for the first six periods.
- [Great Adventure Bible Timeline Chart](https://ascensionpress.com/collections/collection-bible-study-resource/products/great-adventure-bible-timeline-chart) and [Kids chart](https://ascensionpress.com/collections/charts-tabs/products/great-adventure-kids-bible-timeline-chart): narrative and supplemental books, 68 key events, covenants, genealogy, world powers; kids' accordion chart.
- [Ascension (publisher), Wikipedia](https://en.wikipedia.org/wiki/Ascension_(publisher)): background; downloads figure reported *(secondhand)*.
- [Official 365-day reading plan PDF (parish copy)](https://assumptionparish.ca/wp-content/uploads/2025/06/Official-365-day-reading-plan-for-The-Bible-in-a-Year.pdf), [episode listings](https://bibleinayear.fireside.fm/?page=31): Messianic Checkpoint episodes; Day 99 sample (John 4 to 6, Proverbs 5:7 to 14).
- [The Ascension App](https://ascensionpress.com/blogs/podcasts/the-ascension-app) and [BIY Companion offer](https://ascensionpress.com/pages/upsell-offer/ascension-app-biy-companion): exact prayer wording, summaries, interactive reading plan that tracks progress, notes, bookmarks; "Take It to Prayer"; Catechism in a Year transcripts and linked references.
- [Family Edition page](https://ascensionpress.com/biyfamily), [press release](https://ascensionpress.com/blogs/press-releases/press-release-ascension-to-bring-the-1-religion-podcast-to-the-next-generation-with-the-bible-in-a-year-family-edition-with-fr-josh-johnson-nbsp), [EWTN News](https://www.ewtnnews.com/world/us/the-bible-in-a-year-podcast-is-back-this-time-for-the-whole-family), [Aleteia](https://aleteia.org/2026/07/19/great-news-bible-in-a-year-for-kids-is-coming/): ages 7 to 12, 365 episodes from January 1, 2027, reading, reflection, children's questions, prayer, passages on screen, sacred art, audio as screen-free option.

### The Bible Recap

- [Apple Podcasts](https://podcasts.apple.com/us/podcast/the-bible-recap/id1440833267): chronological plan, short daily recap.
- [The Bible Recap book (Amazon)](https://www.amazon.com/Bible-Recap-One-Year-Reading-Understanding/dp/B09NS1BT5T): 365 readings; recaps two pages, about five minutes.
- [Study guide (Christianbook)](https://www.christianbook.com/guide-daily-questions-deepen-understanding-scripture/tara-leigh-cobble/9780764240324/pd/240325): daily reflection and research questions with space to write.
- [thebiblerecap.com/start](https://www.thebiblerecap.com/start): episodes from January 1; prep episodes; sequential playback for latecomers.
- [Church FAQ](https://dqteio.nucleus.church/the-bible-recap) and [North Park Church](https://northparkchurch.org/bible): join any time; pick up today's reading; read then listen; prep episodes; 365-day or New Testament in three months.
- [The God Shot (Eden)](https://eden.co.uk/christian-books/christian-devotional-books/the-god-shot-9780764240331): 100 snapshots of God's character; learn to spot God in your own reading; D-Group founder.

### Our Daily Bread University

- [ODB: Our Daily Bread University](https://ourdailybread.org/websites/our-daily-bread-university/): free, all levels, pastors and small-group leaders, supplemental study guides; non-degree, certificate per course.
- [Learn of Christ review (third-party, 2026)](https://learnofchrist.com/resources/our-daily-bread-university): 100+ video courses; free certificates; no paywall claimed.
- [About the Bible blog, 2018](https://aboutthebibleblog.wordpress.com/2018/03/14/our-daily-bread-christian-university/): syllabus, lectures as PDF, audio, video; listening guide; 37-page study guide.
- [Artos Academy](https://learn.artosacademy.org/tag/our-daily-bread-university/) and [freechristianuniversity.org](https://freechristianuniversity.org/english): conflicting claims (a paid tier; 170+ courses in six languages).

### RightNow Media

- [App features](https://rightnowmedia.org/us/app-features) and [features page](https://www.rightnowmedia.org/app-store): groups, chat, Watch Together, custom library, invites, interactive content, assignment completion, offline, audio-only.
- [App Store listing](https://apps.apple.com/app/id925747028): app description; "Keep Watching" and "My Saved" in listings.
- [Learn of Christ review](https://learnofchrist.com/resources/rightnow-media): 20,000+ titles; "video, not a study suite"; does not replace your pastor; "Netflix of Bible study" marketing.
- [Mark Howell](https://www.markhowelllive.com/?p=9411): a leader's setup; leader guides.

### Reformed Theological Seminary

- [Monergism: Library of Free Online Seminary Courses](https://www.monergism.com/blog/library-free-online-seminary-courses): free RTS lectures via iTunes U and app, "the very same courses enrolled students use"; numbered series; a Westminster Shorter Catechism app.
- [TGC, Justin Taylor: New App for Seminary Lectures](https://www.thegospelcoalition.org/blogs/justin-taylor/new-app-for-seminary-lectures/) and [Ligon Duncan: Get the RTS Mobile App](https://ligonduncan.com/get-the-rts-mobile-app-here/): the app.
- [Uptodown listing](https://reformed-theological-seminary.en.uptodown.com/android) and [Amazon Appstore](https://www.amazon.com/Subsplash-Inc-Reformed-Theological-Seminary/dp/B00K7F6Q60): 30+ Global Education courses; 2026 versions.

### Alpha

- [Alpha course, Wikipedia](https://en.wikipedia.org/wiki/Alpha_course): background.
- [Alpha Canada: differences between the video series](https://support.alphacanada.org/en/articles/93112-what-are-the-differences-between-the-video-series): 15 videos of about 30 minutes over 11 weeks, four for the weekend.
- [Alpha Film Series with Discussion Breaks](https://alphacourse.africa/preview/alpha-film-series-with-discussion-breaks/): host pauses; question appears on screen.
- [Alpha toolbox: session and schedule](https://s3.amazonaws.com/media.cloversites.com/7e/7e7e02bf-e6ef-4f7b-8249-c3f544bf24c5/documents/Toolbox-Session-and-Schedule.pdf): timed evening.
- [Diocese of Salford guide](https://www.dioceseofsalford.org.uk/wp-content/uploads/ALPHA-COURSE-PARISHES-1.pdf): Holy Spirit sessions on the weekend.
- [Alpha USA host and helper notes, 2025](https://alphausa.org/wp-content/uploads/2025/09/Host-Helper-Notes-2025-1-1.pdf), [Alpha Canada: tips for open discussion](https://alphacanada.org/tips-for-creating-an-open-discussion/), [Alpha team guide](https://app.alpha.org/ca/wp-content/uploads/2019/06/Alpha_Team_Guide-3.pdf), [Being on Alpha team](https://ap.church/wp-content/uploads/2018/08/Toolbox-Being-on-Alpha-Team.pdf): you don't have to talk; listen, not win; do not dominate; helpers silent.
- [Alpha Youth Online](https://alpha.org.uk/s/Alpha-Youth-Online.pdf) and [Safe Environment, Alpha Online](https://alpha.org/wp-content/uploads/2021/09/Safe-Environment-–-Alpha-Online.pdf): groups of eight or fewer, discussion of 30 minutes or less online.
- [All Saints Ecclesall, Alpha 2026](https://www.allsaintsecclesall.org.uk/alpha2026), [Alpha Australia](https://www.alpha.org.au/e42312), [TheTVDB](https://thetvdb.com/series/alpha-film-series/episodes/8553910): episode titles; numbering conflicts.

### YouVersion

- [YouVersion Partners: Bible Plan FAQs](https://www.partners.youversion.com/frequently-asked-questions-plans-1?lng=en-US): 3 to 365 days; fewer 365-day plans; completion peaks 3 to 21 days; 400 words; lead times.
- [YouVersion Connect: Bible Plan Basics](https://partner-support.youversion.com/l/en/article/g1u22q4c4r-bible-plan-basicss) and [Bible Plan FAQs](https://partner-support.youversion.com/l/en/article/9ldbls6m05-bible-plan-faq-s): content standards; no links out but one call to action; devotional first, then Scripture.
- [FrontGate Media: 2026 deadlines](https://www.frontgatemedia.com/youversion-bible-plan-deadlines-2026/): October 21 and November 20, 2026.
- [Life.Church Open blog: features for pastors](https://openblog.life.church/3-best-features-in-the-bible-app-for-pastors-to-know-about/): Plans with Friends, group progress, Talk It Over.
- [Outreach Magazine](https://outreachmagazine.com/?p=39061), [ChristianFM](https://christianfm.com/are-you-getting-the-most-from-your-bible-app/), [APKMirror 8.0.6 notes](https://www.apkmirror.com/apk/life-church/bible/bible-8-0-6-release/): streaks and mini-celebrations, badges, private plans, plan discussion.

### Dwell

- [App Store listing](https://apps.apple.com/us/app/1343917374): 75+ listening plans, named examples, reminders, sleep mode, pricing.
- [BlueStacks listing (older)](https://www.bluestacks.com/campaign/com.dwellapp.dwell/es): 44 plans in an earlier version.

### Hallow

- [Hallow Lent Pray40 FAQs](https://help.hallow.com/en/articles/10697582-hallow-lent-pray40-faqs): Ash Wednesday start, join later, one session a day, joined counter, subscription or trial, small-group webinars.
- [Pray40 page](https://hallow.com/pray40/), [Family Theater](https://www.familytheater.org/blog/hallow-roumie-pratt-karamazov), [Catholic World Report](https://www.catholicworldreport.com/2026/02/17/lent-2026-5-programs-to-help-you-grow-in-your-faith/): *The Return*, *The Brothers Karamazov*, Nouwen, 1.91M joined, celebrity fasting challenges, *Screwtape Letters* program.
- [Hallow partners: Pray40 trial](https://hallowpartners.com/pray40): three-month trial.
- [Streaks and prayer activity FAQ](https://help.hallow.com/en/articles/5761398-streaks-prayer-activity-faq): streak, goals, minutes, longest streak.
- [National Catholic Register, 1,000 days on Hallow](https://www.ncregister.com/commentaries/what-i-learned-about-prayer-and-myself-after-1-000-days): Duolingo and Strava comparison; routines and reminders.
- [Hallow (app), Wikipedia](https://en.wikipedia.org/wiki/Hallow_(app)), [America Magazine, 2021](https://www.americamagazine.org/arts-culture/2021/07/30/catholic-prayer-apps-ranking-hallow-laudate-241144/), [Mozilla Privacy Not Included](https://www.mozillafoundation.org/en/privacynotincluded/hallow/): criticism (*Crisis*, UnHerd), goals and streaks, privacy rating.

### Bible Study Fellowship

- [BSF](https://www.bsfinternational.org/bsf) and [Women's groups](https://www.bsfinternational.org/womens-groups/): four steps in order, notes last; 90-minute weekly groups; 30 weeks; WordGo for church groups.
- [RGC Fairfax](https://rgcfairfax.org/?p=10003890): personal study, Monday lecture and group, notes after.

### Practicing the Way

- [Resources](https://WWW.PRACTICINGTHEWAY.ORG/resources): four-session offering with teaching, guided discussion, exercises; Rule of Life tool.
- [Hillsong Grow](https://grow.hillsong.com/course/practicing-the-way) and [A Church Near You](https://achurchnearyou.com/church/9083/page/87341/view): eight sessions of teaching, guided conversation, exercises.
- [Trinity Thomasville, session 7](https://trinitythomasville.nucleus.church/session-7-crafting-a-rule-of-life): crafting a Rule of Life.
- [Journey Chattanooga overview](https://journeychattanooga.com/wp-content/uploads/PracticingtheWay-Overview.pdf): host guide, let members lead.

### Daf Yomi and the siyum

- [Siyum](https://en.wikipedia.org/wiki/Siyum), [Siyum HaShas](https://en.wikipedia.org/wiki/Siyum_HaShas), [Daf Yomi](https://en.wikipedia.org/wiki/Daf_Yomi), [Algemeiner](https://www.algemeiner.com/2020/01/03/tens-of-thousands-of-jews-worldwide-on-the-same-page-celebrating-13th-siyum-hashas/): 2,711 pages a page a day; cycle end January 4, 2020 and the next cycle's start; MetLife Stadium, 90,000+; a siyum per tractate.
- Sefaria clone (`design-src/sefaria`) searched for "siyum": not present in its code (only a partner listing for Hadran).

### Research

- [Dai, Milkman and Riis, 2014 (PDF)](https://faculty.wharton.upenn.edu/wp-content/uploads/2014/06/Dai_Fresh_Start_2014_Mgmt_Sci.pdf) and [APS summary](https://www.psychologicalscience.org/news/minds-business/why-monday-is-the-best-day-for-setting-new-goals.html): the fresh start effect.
- [MIT Teaching Systems Lab: The MOOC Pivot](https://tsl.mit.edu/research/the-mooc-pivot/), [Inside Higher Ed](https://www.insidehighered.com/node/7744), [Times Higher Education](https://www.timeshighereducation.com/news/online-university-courses-masses-fail-materialise): edX completion, 3.13% in one year, more than half never opened courseware.
- [Roediger and Karpicke, 2006 (PDF)](https://psychology.ecu.edu/wp-content/pv-uploads/sites/216/2019/03/Roediger-Karpicke-2006.pdf): testing beats restudy at delays of two days and a week.
- [Deci, Koestner and Ryan, 1999 (PDF)](https://depts.washington.edu/techdocs/papers/deciExtrinsicRewardsAndIntrinsicMotivation99.pdf): 128 studies; completion-contingent rewards undermine intrinsic motivation (d = -0.36).
