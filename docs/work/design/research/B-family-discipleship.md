# B. Family discipleship: how the best products make faith at home a habit, and what LiveWell should take

Prepared 2026-10-27 for the design research cluster "family-discipleship,"
answering James's brief ("the most organized, well-designed website that helps
people to study the Bible, to understand doctrine ... tools and resources
available ... interactive, with things that draw people's attention ... a
useful tool for people to study and learn and grow"). Companion to
`docs/work/plan/benchmark.md` section 2.1, which placed New City Catechism,
Long Story Short, The Jesus Storybook Bible, Training Hearts, Whitney's
*Family Worship*, Lectio 365, Dwell, YouVersion's kids' app, Hallow, Axis and
Natasha Crain at the level of audience and strategy, and to the sibling
`A-doctrine-catechesis.md`, which already covers New City Catechism's two
registers, its paired voices and a memorization drill. This file does not
repeat them. It asks one narrower question: **how do the best household
products make a ten-minute habit stick for a tired parent without cheapening
what is taught, and which of their moves fit a site that is "Unhurried.
Weighted. Grown-up."?**

**Method and limits.** Page fetches fail in this sandbox, so no live page,
screen or app was seen. I used 40 web searches aimed at publishers' and
products' own pages, app-store listings, help centers, church and parish pages
that describe how families use a product, reviews, and one usability study.
None of the products in this cluster is open source, and this session's GitHub
access is limited to its own repository (the search API answered 403), so no
product code was read. I read LiveWell's own family code and data on the work
branch (`client/src/pages/family/*`, `client/public/family-*.json`,
`MASTER-PLAN.md` section 5, `inventory-family.md`) so every pattern lands on
something real. Nothing below describes a feature I did not see described.
Secondhand descriptions (a church page describing an app, a reviewer
describing a book) are marked. Section 6 lists what I could not see.

---

## 0. The short verdict

The products that last in this space agree on three things, and the flashy
ones get all three wrong.

**They lower the bar on purpose, then hold the content high.** Whitney's whole
method is read, pray, sing, in any order, "brief, regular, flexible," about ten
minutes and less for little ones, one verse of a hymn unaccompanied if that is
all there is. *Long Story Short* puts "ten-minute" on the cover and lets
families "go at our own pace." Lectio for Families promises five to ten
minutes. Yet none of them waters down the text: *The Jesus Storybook Bible*
and *The Biggest Story* are written and drawn with a care adults notice, and
both tell the whole canon as one plot.

**They put the faith into the hours a family already has.** Orange's Parent
Cue is built on four cues a week for morning, drive time, mealtime and
bedtime. Seeds Family Worship's founder reads Proverbs with his children on the
drive to school. Hallow has a Family Prayer Morning and a Family Prayer Dinner;
Lectio for Families is used at meals, in the car and at bedtime. Chandler and
Griffin's *Family Discipleship* names the frame plainly: time, moments,
milestones.

**They keep the church and the home on the same page.** Lifeway's Gospel
Project sends a card home every week with that Sunday's Big Picture Question
and its Christ Connection. Orange puts a Parent Cue sheet in every weekly
folder, printable and emailable, and churches hand the cards out at pickup.
*Long Story Short* is keyed to the Gospel Story curriculum. A PCA church
publishes its own weekly family-worship guide. Hallow runs its seasonal
challenges through parish pages.

Where the products go wrong is the same place every time: points, gems, stars
and prizes for reading the Bible (Superbook's site, YouVersion's kids' app);
trivia as the main mode; a countdown of the weeks left before a child leaves
home (Parent Cue); celebrities as the draw (Hallow's Advent challenge);
sleep-story libraries that drift away from Scripture (Abide). Every one of them
treats the family as an audience to be kept rather than a household to be
formed.

LiveWell has already built the core the products share (Tonight, a page per
devotion, table mode with the screen kept awake, "We did this tonight" with no
count), and the plan carries two bands, a three-night split, a weekly sheet,
and a catechism you can learn. What the evidence adds is the next layer: **a
hard-night minimum** that gives a tired parent permission to read and pray and
stop; **a church's own term carried by a link,** so a pastor can put his
families on the same week without accounts; **four doors in a day**
(morning, the road, the table, bedtime) drawn from the devotion already
written; **questions of two kinds,** plus one the child asks the grown-up;
**a minute for the parent before they sit down,** with honest content notes;
**a season you can hold,** one object a day and the last one empty; **one story
and where tonight sits in it;** **cards made to keep;** **a human voice** for
the car and the bedside; and **prayers for the moments nobody schedules.**
Section 3 ranks fourteen.

---

## 1. What LiveWell already has on this ground

Read on the work branch, 2026-10-27, so the patterns below build on what is
there rather than restating it.

- **Built.** `/family/tonight` resolves to tonight's devotion;
  `/family/devotions/:id` gives each its own page; table mode
  (`client/src/pages/family/TableMode.tsx`) shows one part per screen (Read,
  Talk, Ask, Do, Remember, Pray), keeps the screen awake (`useWakeLock`), holds
  the step in the URL, offers Listen (the device's own speech synthesis,
  `components/ListenButton.tsx`), and ends on a plain "We did this tonight"
  that records the date on the device. The Advent set surfaces itself from the
  generated year map. Scripture references open the Study Bible.
- **In the plan** (MASTER-PLAN 5): younger and older question bands with
  "together" as the default (U21); a three-night split and "Remind me"
  through calendar files (U21); `/family/this-week`, a one-page sheet a pastor
  can forward (U20); the world strand (U22) and the church-remembers strand
  (U49); a catechism with a recite mode and fridge cards (U40); one devotion
  system from the Builder (U41); a combined PDF of cards with QR codes.
- **The data.** 72 weekly devotions (BSB passage, big idea, a 100 to 160 word
  reflection, three questions, an activity, a prayer); 40 seasonal days
  (Advent, Holy Week, Thanksgiving) with one question each; a 76-question
  catechism whose part six, "Hard Questions Children Ask" (Q65 to Q76), carries
  the strongest parent notes on the site; four reading plans; the Devotion
  Builder's 40 age-banded pieces; the Parenting Stage Guide's six stages.

---

## 2. The products

Each entry: who it serves; how it is organized; its signature features and the
interaction behind them; visual choices where described; how it holds
attention and builds a habit; what to steal; what is weak. Products already
summarized in `benchmark.md` get only what that file did not say.

### 2.1 *Long Story Short* and *Old Story New* (Marty Machowski, New Growth Press), with *Prepare Him Room*

**Who.** Families with children from preschool through high school (publisher).
The introduction tells parents how to use it with preschoolers, grade
schoolers and young teens; one reviewer calls that chapter the book's
"instruction manual" (ministry-to-children.com).

**How it is organized.** A week per Bible episode, five days a week, about ten
minutes a day, organized by the question "How does this passage point forward
to Jesus?" (Exodus Books listing). The length is reported two ways: Exodus
Books says 61 weeks for the Old Testament volume, while `benchmark.md` recorded
78 from the publisher; I could not settle it. A reader who used it in 2014 and
2015 describes the week: days one and two in the main passage, day three in a
New Testament passage that relates to it, day four back in the main story for
its conclusion, day five in the Prophets or the Psalms on Jesus (Goodreads
review). Aaron Armstrong's review likewise makes day three the day the story
"points forward to Jesus." Another reviewer says day one opens with a concrete
object lesson that needs "minimal prep" (Little Book Big Story).

**Signature interaction.** Each day carries "usually 3 questions" for
comprehension and listening, **"a question for kids to ask parents"** about
the day's reading, and a closing prompt to pray for or thank God for something
tied to the reading (Goodreads review, secondhand). The child asking the parent
is the most unusual move in the cluster: it turns the parent from quizmaster
into witness.

**Seasonal sibling.** *Prepare Him Room* (2014) is a four-week Advent set:
an original Christmas short story, thirteen family devotions (three a week and
one for Christmas), suggested prayer topics, hymns to sing, a craft each week,
and suggestions such as listening to Handel's *Messiah* or building an Advent
wreath, with a companion album from Sovereign Grace Music (Servants of Grace
review; 10ofThose and TGC store listings).

**Habit.** The promised time, the scripted parent, minimal preparation, and the
week's arc (the same story four days running, so a missed night costs little).

**Steal.** The question the child asks the grown-up. The week's arc, in which
the Christ connection has its own day instead of a sentence bolted onto every
reading. The season as a short set (thirteen nights, not twenty-five) with
singing and a thing to make.

**Weak.** Story only: nothing on the world the child walks into and nothing
from church history (`benchmark.md`). I could not see the actual pages.

### 2.2 New City Catechism, the family edge

`A-doctrine-catechesis.md` 2.1 covers the catechism itself. What matters for
the household: the free app has **a children's mode** with the short answers
and quick access to songs (App Store). All the answers were set to music word
for word in **46 songs** by Frank Hernandez, arranged by Fletch Wiley and
recorded with young singers, free to stream on Bandcamp, YouTube and the apps
(TGC announcements); the app plays them as a background playlist. A separate
**52-lesson curriculum** for ages 8 to 11 serves Sunday school, classroom or
homeschool (search summary of the curriculum listing). An independent app,
Catechism.app, puts several catechisms (NCC, Heidelberg, Westminster Shorter,
Geneva, a children's catechism) in one library with memorization modes (Learn
of Christ review).

**Steal.** Music that does the memorizing and plays in the car. **Weak.** The
songs belong to NCC's wording, so they cannot serve LiveWell's own 76-question
catechism.

### 2.3 *The Jesus Storybook Bible* (Sally Lloyd-Jones, illustrated by Jago; Zonderkidz)

**Who.** Young children, and the adults who read to them (`benchmark.md`).

**What I could see beyond the benchmark.** The interactive side is audio, not
an app. David Suchet narrates the text word for word; libraries list the
unabridged audio at 3 hours 22 minutes; the 2012 Apple Books edition came out
on October 9, 2012 in three volumes because of digital file-size limits, each
story with Suchet's narration; a deluxe edition put the narration on three CDs
"so children can read along"; a collector's edition added a DVD on which the
whole book is animated; a Spanish edition is narrated by Tony Plana (author's
site; Apple Books; library catalogues; retailer listings). A Suchet-narrated
edition also runs inside the Olive Tree Bible app. I found no evidence of an
interactive JSB app.

**Habit.** None is built in. The book is the habit's object: it is read because
adults like reading it.

**Steal.** A trusted human voice reading the exact text, and read-along (the
words in front of the child while the voice reads them). The proof that
children's material can be literary enough that the adult wants it too.

**Weak.** A book, not a practice: no questions, no rhythm, no culture
(`benchmark.md`).

### 2.4 *Training Hearts, Teaching Minds* (Starr Meade, P&R)

One Westminster Shorter Catechism question a week, with **six days of
readings** per question, each a few minutes "out of consideration for
children's short attention spans," each supported by the catechism's proof
texts; 107 weeks; 349 pages (Heritage Books, Grace and Truth Books, WTS
listings). Six readings a week leaves the seventh day free; no source says it
is meant to be Sunday, so that is my inference.

**Steal.** One truth turned over for a week, a few minutes a day, with its
Scripture beside it. **Weak.** Two years end to end with no age bands; reviewers
cited in `benchmark.md` find it forced at times.

### 2.5 The Gospel Project for Kids at home (Lifeway): Big Picture Cards and the Home Edition

**Who.** Families whose church uses The Gospel Project for Kids, and, through
the Home Edition, homeschooling and family-study households with children in
kindergarten through fifth grade (Lifeway product pages; Lifeway News, 2018).

**How it is organized.** The church curriculum runs in quarterly volumes
through the canon (Volume 1, *Creation and Covenant*, Fall 2024, Genesis and
Job; Volume 2, *Law and Life*, Exodus to Deuteronomy; Volume 6, *Prophets and
Provision*, Winter 2026). Each week has a **Big Picture Question** with its
answer and a **Christ Connection**.

**Signature features.**
- *The card that goes home.* Each child gets one card a week "that corresponds
  with the lesson they learned in class": the Bible art on the front, the Big
  Picture Question and answer, and the Christ Connection (Lifeway kids-ministry
  blog). Current packs are thirteen 2.5 by 3.5 inch cards, trading-card size,
  one pack a quarter (Lifeway listings).
- *Games with the cards.* Lifeway suggests hiding the cards around the house
  for children to find and **sort into chronological order**; covering key
  phrases with a dry-erase marker so children call them out; and a guessing
  game from a card's picture that ends by reviewing the story, the question
  and the Christ Connection (Lifeway kids-ministry blog).
- *The Home Edition.* Eighteen weeks a semester, five lessons a week, a
  teacher guide, two workbooks (K to 2, 3 to 5) with coloring and activity
  pages, weekly Bible story videos and "discussion starter" videos. Lifeway's
  stated reason: "parents are the primary disciplers of their children and the
  church is called to partner with them" (Lifeway listings; Lifeway News).

**Visual.** Bright, illustrated cards meant to be collected (listings); I saw no
card design.

**Habit.** The church hands the home a small object every week, and the object
is a game.

**Steal.** The card that matches Sunday. The chronological sort, which is
retrieval practice disguised as a game. **Weak.** Built around a paid church
curriculum; the Home Edition's five lessons a week is a load few working
parents carry.

### 2.6 Parent Cue (Orange)

**Who.** Parents from a baby's first weeks through high school, mostly through
churches using Orange curricula. The app says it partners with "over 34,000
churches" (App Store, developer's claim). Free in English and Spanish (church
pages); one listing describes a paid subscription for weekly cues, so the
current price is unclear.

**How it is organized.** By the child's phase. Each child added to the app gets
weekly cues that change with "their phase of life, from babies to high school"
(theparentcue.org/app). The app gives **four cues each week**, tied to
**morning time, drive time, mealtime and bedtime** (App Store; Salvation Army
Australia, 2012; church pages), plus monthly topics on faith and character and
weekly Bible-story videos and memory verses for each child's age (App Store).
A "Parent Time" section holds material for the parents themselves (church
page). Churches can sync the app with their own ministry (church page).

**The phases.** Orange's Phase Guides (Kristen Ivy and Reggie Joiner), one
journal-style book per year of childhood, look ahead at how a child grows that
year "physically, mentally, socially, emotionally, and spiritually," with a
name for each year: the "I Can Do It" phase for two-year-olds, "Look at Me"
for kindergarten, "I've Got This" for fifth grade (HomeWord; AbeBooks
listings). *It's Just a Phase* is the leaders' long version.

**The church card.** Orange describes Parent CUE cards as a weekly and monthly
lesson summary "that suggests ways for parents to continue the week's lesson
at home," printable and emailable; a Parent Cue sheet sits in each weekly
curriculum folder; churches hand the cards out at pickup (Orange blog; church
pages).

**The countdown.** The app shows a countdown of about 936 weeks from a child's
birth (eighteen years), which the parent can switch off when adding a child
(App Store, as summarized by the search).

**Steal.** The four moments of an ordinary day. The phase as a short, named
description of what this age can carry. The card at pickup. **Weak.** The
countdown (section 4). Phase-driven content risks being about parenting
technique more than about God; I could not read a cue to judge.

### 2.7 Hallow's family and kids content (Catholic)

**Who.** Catholic families; the kids' material is grouped for "Littles,"
"Middles" and "Teens" (Hallow help center).

**Signature features.**
- *Bedtime.* Bible sleep stories read aloud slowly by adult voices, about 4 to
  40 minutes, in the Sleep tab; children's bedtime stories such as "Lost and
  Found" (the lost sheep, read by Jonathan Roumie), "Creation Story" and "Two
  Gardens" (Hallow blog; help center).
- *Family sessions.* A Family Prayer Morning (a song, a psalm, a chance to talk
  about the day) and a Family Prayer Dinner (grace and discussion questions);
  the parenting guide suggests a family Litany of Saints (Hallow blog).
- *Saints for children.* *Saints Alive*, a radio-drama series a parent says her
  children ask for on car rides; a daily "Guess That Saint" trivia series
  (Hallow blog; Aleteia).
- *The seasonal serial.* Each Lent a daily kids' listening challenge made with
  the *Saints Alive* team, one episode a day. Lent 2026, *Miracle Hunters*, for
  ages 6 to 12, follows four children and, per one reviewer, takes on
  unanswered prayer and disappointment; Advent 2025, *Finding Fiat*, follows a
  girl preparing to play Mary in a school nativity (CatholicMom; parish pages).
  Families join through their parish's page in the app's Community tab; one
  blog says the kids' challenge is premium, while parish pages suggest parish
  challenges are open on the free version (parish pages; CatholicMom).
- *The celebrity invitation.* Chris Pratt, Jonathan Roumie and Gwen Stefani
  invited people into an Advent challenge (ChurchLeaders).

**Habit.** The season as a dated serial, joined with your parish; bedtime as a
nightly slot.

**Steal.** The family morning and dinner as named, short sessions. The season
as a story told a day at a time. The willingness to take on unanswered prayer
with children. **Weak.** Celebrity voices, an account and a parish page as the
way in, the paywall question, trivia as a daily habit.

### 2.8 Seeds Family Worship

**Who.** Families who want to memorize Scripture by singing it.

**What it is.** Bible verses set to music **word for word**, 170+ songs on the
streaming services, CDs, videos and hand motions (EMCC resource index). Song
titles carry their references, for example "The Word of God (Hebrews 4:12)"
and "Impress Them (Deuteronomy 6:4-7)" (ministry-to-children.com), and an
independent index lists Seeds songs in canonical order (Expository Songs). The
founder, Jason Houser, has written and produced 150+ Scripture songs; a 2024
podcast credits the ministry with more than 80 million downloads
(secondhand). One search summary also mentions free family devotionals and a
quarterly subscription box; I could not tie that to the official site.

**Habit.** On *FamilyLife Today* Houser ties Deuteronomy 6 to bedtime, waking
and the road, and describes reading Proverbs with his children on devices
during the drive to school, time "they would have spent anyway" (FamilyLife,
secondhand summary).

**Steal.** The exact words, so a child memorizes the text and not a paraphrase.
The reference sung or printed with the song. The drive as a slot. **Weak.**
Music is not LiveWell's medium, and Seeds sings several translations; the
match to the BSB a LiveWell child memorizes is not guaranteed.

### 2.9 *The Biggest Story* (Kevin DeYoung, illustrated by Don Clark; Crossway)

**Who.** Children, and in its newer storybook, ages 6 to 12 (Crossway).

**The suite.** A ten-chapter picture book telling the Bible from the garden to
the cross to the new creation; a **26-minute animated film** (2016) narrated by
DeYoung, with an original score by John Poon and about forty animators,
directed by Jorge Canedo Estrada (Crossway blog); and *The Biggest Story Bible
Storybook* (2024): **104 stories** from Genesis to Revelation, each with a Don
Clark illustration, each explaining how it fits the larger storyline, each
ending with a prayer. The large-format edition is 10 by 14.25 inches, with **a
single-page story facing full poster art** (Crossway; 10ofThose listings). A
set of 104 videos uses Clark's art, narrated by Michael Reeves.

**Visual.** Clark runs Invisible Creature with his brother; mid-century design
and illustration shape the studio's look. Crossway's project page calls the
art "completely original, timeless, rich, colorful"; Clark calls the book the
largest project of his career, since most picture books run 24 to 32 pages
(Crossway interview with Don Clark). One artist's hand carries the book, the
film, the storybook and the videos.

**Habit.** 104 stories is two a week for a year; no source says that was the
design, so that is my inference.

**Steal.** One plot, told whole. One visual grammar across every format. Text on
one side, art on the other. The prayer as the ending, not an application.
**Weak.** No questions are described after each story.

### 2.10 Superbook (CBN)

**Who.** Children, through an animated series, a website and an app.

**Signature features.** The app, relaunched in October 2025, combines a Bible
reader with the show: the episodes (faith.tools says all 68, free; a CBN Europe
page says 14 free, so one is out of date), 20+ Bible games (trivia, word
searches, verse scrambles), interactive devotionals called "Quests," 80+ topic
pages on subjects such as anxiety and friendship, and highlighting with
illustrated notes (faith.tools). The website offers games "where kids can earn
points and prizes" and *Gizmo's Bible Adventures*, a 30-day devotional for
children and parents together (CBN). For each episode CBN publishes **a family
discussion guide** "designed to help you talk with your children after
watching an episode," naming the lesson (temptation, disobedience and
forgiveness for Jonah; power and transformation for the road to Damascus) and
warning parents to "preview this video, as some scenes may be too intense for
young children" (CBN Europe PDFs, seasons 1 to 5). A 2026 paper evaluates the
app with children against Nielsen's five usability dimensions, combining
self-report with observation because questionnaires alone are weak with young
children.

**Steal.** The parent's guide with an honest content warning. **Weak.** Points
and prizes; games as the main reason to open the app.

### 2.11 Abide's kids content

80+ children's bedtime stories in the Sleep section under Topics, labelled
"Kids," with background music and sound to help children fall asleep (Abide's
site and podcast listings). The episode titles I found are mostly original
character series (*Skyship Dreamer*, *Cowboy Sam*, *Tales From the Farm*,
*Flower the Fox*) rather than retellings of Scripture. **Steal.** Bedtime as a
slot. **Weak.** A library that drifts from the text toward content for its own
sake.

### 2.12 Don Whitney, *Family Worship* (Crossway, 2016)

Beyond `benchmark.md`: about 80 pages; read, pray and sing, with catechism and
memory work optional; any order (9Marks review; Reformation 21). Younger
children hear narratives and Proverbs; the leader asks a few questions to check
understanding or has the children repeat what they remember; the father
usually leads prayer but can hand it to others or let everyone pray; singing
can be one verse, a doxology or a chorus, unaccompanied or with a recording
(review summaries). Whitney's own estimate, in a Crossway podcast, is about ten
minutes, less for very young children, with no special preparation. Chapter
four answers objections, including "What if the father is not a Christian?"
and "What if the children are very young?" (9Marks). A reviewer notes that he
"doesn't try to motivate us toward family worship through guilt, but through
encouragement" (JBTS review).

**Steal.** The minimum, stated as enough. **Weak.** A method without content
(`benchmark.md`).

### 2.13 Added: Lectio for Families (24-7 Prayer)

Free; for children about 7 to 11. Each day follows P.R.A.Y. (pause, rejoice
and reflect on a passage, ask, yield or commit), five to ten minutes; a
**weekly memory verse**, a reading in the New Century Version, one discussion
question, prayer prompts; text and audio, so a family can listen together or
"pass the device around"; **a Sabbath prayer on Sunday**; weekly themes that
follow the church calendar (Advent, Lent) or a topic such as the fruit of the
Spirit (24-7 Prayer; faith.tools). **Steal.** Passing the phone around the
table. Sunday as a different day. **Weak.** Warm and light; no hard subjects.

### 2.14 Added: Fighter Verses (Truth78)

A paid memory app: 1,000+ verses in two five-year collections, eleven
translations, six quiz modes (blanks, recite aloud with recording, typing,
first letters, word bank, ESV trivia), review at daily, weekly, monthly or
twice-yearly intervals, songs for the ESV, and **Foundation Verses, each with a
picture so young children can recognize it** (App Store). **Steal.** A picture
per verse for the child who cannot read yet. The doctrine cluster already takes
the drill.

### 2.15 Added: PJ Library and PJ Our Way (Jewish; a benchmark from outside the church)

Free books mailed monthly to families with children from birth to eight,
"age-appropriate," with suggested activities and conversation starters; a
parents' blog with discussion questions for each book and notes on values,
topics and content advisories; and PJ Our Way for ages 9 to 12, where **the
child chooses** each month (from the 1st to the 10th) among four titles
reviewed by a panel of educators, parents and children (local federation
pages, secondhand). **Steal.** Age bands that hand the older child the choice.
Content advisories before a parent commits. **Weak.** For LiveWell, nothing
structural; it is a mail program.

### 2.16 Added: Matt Chandler and Adam Griffin, *Family Discipleship* (Crossway, 2020)

Three areas: **time** (the family gathered on purpose), **moments** (everyday
openings), **milestones** (marking significant events). Each section offers
Scriptures, questions, structures and ideas, and the book "begins with the end
in mind," helping parents design their own plan (publisher listings). I found
no review. **Steal.** The three-part frame, which names what a devotion product
leaves out: moments and milestones.

### 2.17 Added: *Every Moment Holy* (Douglas Kaine McKelvey; illustrated by Ned Bustard; Rabbit Room Press)

Liturgies for ordinary acts (laundering, sharing a meal); Volume II for dying
and grief; Volume III (November 2023) adds 100+ more, including "A Liturgy
After a Fight Among Siblings" and "A Liturgy Before a Board Game"; more than
twenty illustrations by one artist in each hardcover (WTS Books; Exodus Books).
**Steal.** The form: a short, prayable text for a household moment nobody
scheduled. **Weak.** For LiveWell, the words are copyrighted; only the form can
be borrowed.

### 2.18 Added: Tiny Theologians, Jesse Trees, Resurrection Eggs, *The Advent Book* (objects that carry the faith)

- **Tiny Theologians** sells boxed card sets: *ABCs of Theology* (ages 4 to 12;
  atonement, gospel, liturgy, each tied to Scripture), *God's Attributes*,
  *Names of God*, *Church History* (the Reformation, Augustine, Elisabeth
  Elliot), and *Christ at the Center* (60+ cards walking through every book of
  the Bible to Christ); 5.75 by 4 inch cards on heavy matte stock in a lidded
  box; references mostly ESV (Reformers Bookshop listings and reviews).
- **The Jesse Tree.** Each day of Advent the family reads a story from Jesus'
  family line and hangs the matching ornament; about 25 ornaments, often
  printed for the family to color (Faithward; RCA).
- **Resurrection Eggs** (FamilyLife, since 1995). Twelve plastic eggs, each with
  an object from the Passion story; open one a day for the twelve days before
  Easter; **the last egg is empty**, opened on Easter Sunday; a booklet tells the
  parent what to say at each egg; ages 3 to 10 (FamilyLife).
- ***The Advent Book*** (Jack and Kathy Stockman; first published by Crossway).
  Twenty-five doors, one a day, each opening on a picture and the next part of
  the Christmas story (listings).

**Steal.** One object a day; the story told a piece at a time; the waiting made
physical; the empty last one. **Weak.** Plastic kits and boxed sets cost money
and storage; the web can give the form free and printable.

### 2.19 Added: Godly Play and the "I wonder" question

A Montessori method for Christian education (Jerome Berryman): a story told with
simple materials, then **"I wonder" questions** with no right answers, then time
to respond. The standard four ask which part the child liked best, which part
is most important, which part is about the child, and whether any part could
be left out; "sometimes they lead to uncomfortable spots" (Wikipedia; parish
and preaching sources). Berryman wrote a home version, *Stories of God at Home*.
**Steal.** The open question, offered as open.

### 2.20 Added: The Family Dinner Project (secular benchmark for the table)

Conversation starters filterable by age and theme; printable "Dinner Tonight"
cards that combine a recipe, an activity and conversation starters (Ohio State
Extension; MGH partner page; Harvard Project Zero). **Steal.** Age and theme as
the two filters a parent actually uses. LiveWell's U21 library by theme already
does this.

### 2.21 Cautionary: YouVersion's Bible App for Kids, Kids Corner, and a church's own sheet

- **Bible App for Kids** (YouVersion and OneHope): 41 stories with narration,
  music and touch-activated animation; after each, games (Story Memory Match,
  Sticker Story Time, Story Mixup); collectible gems and stars; challenges that
  open related stories (faith.tools; Scripture Engagement; store listings).
  Free and enormous, and built on reward mechanics.
- **Kids Corner** devotions app: a recognizable character guides the child;
  completing activities earns rewards that personalize the child's space
  (Kids Corner's own blog).
- **A church's own sheet.** Bethel Church (PCA) publishes a weekday family
  worship guide each week: Scripture memory, a children's catechism question,
  a Shorter Catechism question, songs and five days of devotions (church
  site). It is the shape of MASTER-PLAN's *This week at your table*, made by a
  congregation for itself.

---

## 3. What the best share, and what none does

**Shared.** A small, promised time. The whole Bible as one story. A week as the
unit (one question, one passage, one card). Something that goes from the church
to the home. A voice reading aloud. A season with a start date.

**Not done by any of them.** None brings a Christian child's present world to
the table with the church's memory behind it (`benchmark.md` gap 2, still
open). None tells a parent plainly that the short version counts and builds
the product around it. None carries a church's own sequence to its families
without an account or a paid curriculum. None asks the child to put a question
to the parent as a regular part of the evening except *Long Story Short*. None
separates "what happened" from "I wonder" in the same set of questions.
None keeps the seasonal object free and printable with the text verified.

---

## 4. The patterns most worth bringing to LiveWell, ranked

Ranked by value to a tired parent, fit with "Unhurried. Weighted. Grown-up.",
and cost. Effort: S (a day or two, mostly reuse), M (a unit), L (more than a
unit, or art or recording to commission). Each names the page and what the
reader does. None needs an account; personal state stays on the device through
`lib/storage.ts`, shareable state in the URL (MASTER-PLAN 2).

### 1. On a hard night: the smallest faithful version

**Seen in.** Whitney (read, pray, sing in any order; brief, regular, flexible;
about ten minutes and less for little ones; one verse sung unaccompanied);
*Long Story Short* ("go at our own pace"); Lectio for Families (five to ten
minutes); *Training Hearts* (a few minutes a day).

**What it is.** A second way to start, beside the full devotion, that is
explicitly enough.

**On LiveWell.** On `/family/tonight`, on every devotion page and on the Home
"Tonight" line: under "Start," one plain link, *Read and pray*. It opens table
mode with only the Read and Pray steps (`?mode=table&parts=read,pray`), about
three minutes, and still ends on "We did this tonight." The copy above it is
one sentence of permission, in the platform's register, never a pep talk:
"Some nights the passage and a prayer are the whole of it." The full devotion
stays the default.

**Why it works.** The products that outlast their launch year all tell the
parent the minimum is enough. A product that offers only the full ten minutes
loses the family in the first bad week; the short version keeps the habit
alive until the next good night.

**Fit.** Core. **Effort.** S (a parts filter on `partsOf`; no new content).

### 2. Church and home on the same page: a church's own term, carried by a link

**Seen in.** The Gospel Project's weekly Big Picture Card matched to the class
lesson; Orange's Parent Cue sheet in every weekly folder, cards at pickup,
printable and emailable, app sync with the church; *Long Story Short* keyed to
the Gospel Story curriculum; Hallow's parish pages hosting the season; a PCA
church's own weekly family-worship guide.

**What it is.** The pastor chooses the sequence; the family's Tonight follows it.

**On LiveWell.** The Devotion Builder (`/tools/family-devotions`, which U41
turns into "plan a term" over the family data) gains *Plan for your church*: a
pastor picks a start Sunday and a run of devotions (the Advent set, eight
weeks of the world strand, the catechism's part on Christ) and gets one link,
for example `/family/term?start=2027-01-10&d=exiles-in-babylon,the-coin,...`,
plus a printable sheet per week through the U20 print path. A family who opens
the link sees "Week 3 of your church's plan" on `/family/tonight`; the device
remembers the term (`livewell-progress-family-term`) until its last week, then
falls back to the calendar. Each sheet ends with a Sunday line drawn from
Lectio's Sabbath day: "On Sunday, ask each other what you heard at church."
No church name is taken from the URL (arbitrary text in a link is an
impersonation risk), no list of families, nothing reported back.

**Why it works.** Every product with real reach in this cluster travels through
the church. PCN is LiveWell's church channel, and a free link a pastor can
send is the smallest version of what Lifeway and Orange sell.

**Fit.** Core. **Effort.** M (URL-state term resolver, the Builder's output,
tests; ids are already frozen by U12).

### 3. Four doors in a day: morning, the road, the table, bedtime

**Seen in.** Parent Cue's four weekly cues for morning, drive time, mealtime
and bedtime; Houser reading Proverbs on the drive to school (Seeds); Hallow's
Family Prayer Morning and Dinner; Lectio for Families at meals, in the car, at
bedtime; Chandler and Griffin's "moments."

**What it is.** The week's devotion, carried out of the dinner hour into the
other three times a family is together, without new screens.

**On LiveWell.** At the foot of each devotion page and on the back of its
printed card, a short strip under Deuteronomy 6:7 (BSB, verbatim): *In the
morning*, this week's memory line or the catechism's child answer; *On the
road*, one question (from the older band where there is one); *At the table*,
the devotion; *At bedtime*, one sentence of tonight's prayer for a child to
say back. In table mode it is the last screen before "We did this tonight."
No notifications; the calendar reminder (U21) can carry the morning line.

**Why it works.** It asks nothing new of the parent. It reuses what is written
and puts it where the family already is.

**Fit.** Core. **Effort.** S to M (layout and print reuse; 72 short bedtime
lines written new and read by James's editor).

### 4. Two kinds of question, and one the child asks the grown-up

**Seen in.** Godly Play's "I wonder" questions (open, no right answer,
"sometimes they lead to uncomfortable spots"); *Long Story Short*'s three
comprehension questions plus "a question for kids to ask parents"; Whitney's
few questions to check understanding.

**What it is.** Questions labelled for what they do.

**On LiveWell.** The Ask step shows three kinds, each labelled: *What happened?*
(one recall question the youngest can answer, so the pre-reader has a win);
*I wonder* (one or two open questions, marked as having no right answer);
*Your turn* (a question the child asks the grown-up: "When was a time you were
afraid and God was with you?"). The grown-up's answer is the lesson: the adult
is inside the question, which is the platform's self-implication rule at a
kitchen table. Data: each question gains a `kind` (`recall`, `wonder`,
`ask-the-grown-up`); `validate-family.mjs` requires at least one `wonder` and
one `ask-the-grown-up` per devotion. Re-tag the existing questions; write 72
"Your turn" questions.

**Why it works.** A wondering question tells a child the faith can bear his
honest thought, which is what the skeptic needed to hear at eight and did not.
A question asked of the parent makes faith something the child sees an adult
carry, which is how the benchmark's research says it is handed down (talk, not
attendance).

**Fit.** Core. **Effort.** M (content, validator, small UI).

### 5. Before you sit down: one minute for the parent, with an honest content note

**Seen in.** Parent Cue's "Parent Time"; Superbook's family discussion guides
and their warning to preview an episode because "some scenes may be too intense
for young children"; PJ Library's content advisories before a family chooses a
book (secondhand); NCC's adult commentary beside the child's answer; a family
Scripture app that separates a parent view (questions, background) from a
child's full-screen verse.

**What it is.** A short note for the adult, shown before the family gathers.

**On LiveWell.** A collapsed panel at the top of each devotion page (not in
table mode, which is the child-facing view): what tonight is about in one
sentence; the hard question a child may ask and a two-line honest answer; and,
where the passage involves death, violence, the body or family breakdown, a
plain content note ("This passage tells of a death. Younger children may ask
whether it could happen to you."). Where the theme touches grief, fear or
family breakdown, the panel carries the Find Help path. Data: optional
`parentNote` and `contentNote`; the validator requires `contentNote` on
devotions tagged with those themes. The existing "For the grown-ups" line (the
essay behind tonight) sits at the panel's foot.

**Why it works.** A parent who has been surprised once by a hard question in
front of three children stops opening the app. One minute of warning keeps
him, and the care rules in CLAUDE.md ask for exactly this on crisis-adjacent
material.

**Fit.** Core. **Effort.** M (content for the 72 and the seasons; validator).

### 6. The season you can hold: one object a day, the last one empty

**Seen in.** The Jesse Tree (read a story, hang its ornament; about 25,
colored by the family); Resurrection Eggs (twelve days, one egg a day, the last
one empty on Easter morning, a booklet that tells the parent what to say);
*The Advent Book* (25 doors); *Prepare Him Room* (thirteen nights, a craft,
carols); Hallow's daily kids' episodes through Advent and Lent.

**What it is.** A seasonal set given a physical anchor and a daily reveal.

**On LiveWell.** The Advent page shows the season as a grid of days. Today's
door opens; the days ahead stay closed until their date (waiting is what
Advent is); days past stay open for a family that missed one. Each day carries
one simple drawn symbol (pattern 14) tied to its passage, and the Advent
booklet gains a printable sheet of those symbols to color, cut and hang after
the reading. Holy Week gets the same with eight symbols, and its last card is
blank: Easter's card shows only the empty tomb's words from Luke 24:6 (BSB,
checked verbatim before print). The device remembers which doors were opened;
nothing is counted. The date gate is computed after mount from the generated
year map, so nothing waits on the network.

**Why it works.** The oldest household practices in this cluster are objects
and dates, not apps. The empty last egg is the single best piece of teaching
design I found: the lesson is an absence the child discovers.

**Fit.** Strong. **Effort.** M (grid, print sheet, drawings).

### 7. One story, and where tonight sits in it

**Seen in.** *The Jesus Storybook Bible* (every story whispering his name);
*The Biggest Story* (garden to cross to new creation; 104 stories, each
explaining how it fits the storyline); *Long Story Short*'s day for how the
story points forward to Jesus; The Gospel Project's Christ Connection on every
card; Tiny Theologians' *Christ at the Center*, a card for every book of the
Bible.

**What it is.** Every devotion placed on the one line of the canon.

**On LiveWell.** A thin rule across each devotion page and printed card: the
acts of the Bible's story as `/study/bible/story` already divides them,
tonight's passage marked with a small mustard point, each act a link to
`/study/bible/story/:act`. Under it, one sentence, *Where this goes*, written for
that passage and not from a template, connecting it to Christ or to the end of
the story. In table mode it is a single line on the Read step.

**Why it works.** Children who learn stories as separate morals grow into
adults who think the Bible is a book of morals. The one-plot products are the
ones adults keep for themselves.

**Fit.** Strong. **Effort.** M (a small SVG primitive; 72 written lines; the
"Where this goes" line must never become formula, which is the complaint
reviewers make of *Training Hearts*).

### 8. Cards made to keep, and a game to play with them

**Seen in.** The Gospel Project's weekly card and its games (hide the cards and
sort them chronologically; cover phrases with a dry-erase marker; guess from
the picture); Tiny Theologians' boxed sets (heavy matte stock, one term or one
person per card, Scripture on each); Fighter Verses' Foundation Verses with a
picture for children who cannot read.

**What it is.** Small printed cards for the catechism and for the church's
witnesses, plus an ordering exercise.

**On LiveWell.** A print page per set, four to a letter or A4 sheet with crop
marks, from the existing *Take it with you* path and in the combined PDF:
catechism cards (question on the front with a small drawing; the child's answer
and its BSB verse on the back) and, when U49 lands, witness cards for *The
church remembers* (name, date and place on the front; two lines and one
question on the back). The game: *Put them in order*, on paper with the
printed witness cards and on screen as a short tap-to-order exercise that
reveals the true order and the dates. Retrieval, not points: no score, no
timer, a plain "See the order" button.

**Why it works.** A card on the fridge is the week's lesson in sight at
breakfast. Ordering the witnesses teaches the shape of church history the way
the adult history course will.

**Fit.** Strong. **Effort.** M (print layouts reuse #534; the order exercise
reuses the history timeline data).

### 9. A human voice for the car and the bedside

**Seen in.** David Suchet reading *The Jesus Storybook Bible* word for word,
with read-along editions; Hallow's Bible sleep stories read slowly by adult
voices; Abide's 80+ children's bedtime stories; Lectio for Families' audio,
passed around the table; Seeds' Scripture songs and NCC's free song playlist
for the car.

**What it is.** A recorded reading, not synthesized speech.

**On LiveWell.** Listen today is the device's speech synthesis. Record each
season's set and each week's passage and prayer (by James if he is willing;
otherwise a named reader he chooses) as small audio files, played with the
text in view in table mode (read-along). Add *For the car*: the passage, the
road question and the prayer, about three minutes, playing with the screen
off. *For bedtime*: the passage and the prayer only, read slowly. Where a
memory verse has an existing word-for-word Scripture song with the same
reference, a quiet *Sung* link may point to it; NCC's songs fit only NCC's
wording, not LiveWell's catechism. Each recording names its translation.

**Why it works.** Most of the church has received Scripture by ear, and the
car and the bed are where families are still together. A known voice is the
moat `benchmark.md` gap 10 names.

**Fit.** Strong, gated on James. **Effort.** M (recording and hosting; the
player exists).

### 10. Prayers for the moments nobody schedules

**Seen in.** *Every Moment Holy*'s liturgies for household acts and its third
volume's "After a Fight Among Siblings" and "Before a Board Game"; Chandler and
Griffin's moments and milestones; Orange's named phases; Hallow's family Litany
of Saints.

**What it is.** A short shelf of prayable texts for unplanned household moments.

**On LiveWell.** `/family/moments`, twelve to start: the first day of school, a
new baby, a move, a pet dies, after a fight, a grandparent dies, a frightening
diagnosis, a baptism, a birthday, the night before a test, when the news is
frightening, when a parent travels. Each holds one passage (BSB), a short
prayer the household says together, one question, and for grief and fear the
Find Help path. Each prints as a card. Reached from `/family`, from the care
pages on family and grief, and from a devotion whose theme matches. The form is
borrowed; every word is LiveWell's own (*Every Moment Holy* is copyrighted).

**Why it works.** Devotions cover the planned evening; the moments that form a
child are mostly unplanned. A family who found the right prayer the night the
dog died comes back.

**Fit.** Strong. **Effort.** M (content and James's reading; a list page and a
card layout).

### 11. When your child asks: the hard questions, answered for the parent first

**Seen in.** Hallow's *Miracle Hunters* taking on unanswered prayer with
children; Superbook's 80+ topic pages (anxiety, friendship); NCC's attention
to "the questions people are asking today" (doctrine cluster); LiveWell's own
catechism part six, "Hard Questions Children Ask."

**What it is.** The questions children actually put to parents, with an answer
built for the adult first.

**On LiveWell.** A section on `/family` (or `/family/questions`) indexed in the
child's words: "Where did Grandpa go?", "Why didn't God fix it?", "Is the
Bible true?", "Why don't my friends go to church?", "Why are Christians on TV
so angry?" Each answer has three layers: for the parent (what the question
usually means at that age, the honest answer, what not to say), two sentences
for a younger child, two for a teenager; then the catechism question, Honest
Answer or topic page behind it. Built first from Q65 to Q76's parent notes
and the topics index. The skeptic's rule holds: concede what is hard before
answering it.

**Why it works.** This is where the parent feels least able (the benchmark's
Barna figure on what parents feel unable to teach, unverified) and where
LiveWell's voice, a man who came to faith from atheism, is rarest.

**Fit.** Strong. **Effort.** M (content; one index page).

### 12. What this age can carry

**Seen in.** Orange's Phase Guides (one per year, named, covering physical,
mental, social, emotional and spiritual growth); Parent Cue's cues that change
with the child's phase; Hallow's Littles, Middles and Teens; PJ Library's
birth-to-eight and nine-to-twelve programs.

**What it is.** A sentence about the child beside the band switch.

**On LiveWell.** Keep the two bands (U21). Under the switch, one line each:
"Younger, about 4 to 10: a story, a promise, a short prayer they can say back."
"Older, about 11 to 17: a real question, room to disagree, a grown-up who
answers too." Each links to the matching stage of the existing Parenting Stage
Guide (`/tools/parenting-guide`), which already holds six stages.

**Fit.** Strong. **Effort.** S.

### 13. Let the older child choose

**Seen in.** PJ Our Way, where children 9 to 12 choose their own book each
month from four titles reviewed by educators, parents and children.

**What it is.** A small choice handed to the teenager.

**On LiveWell.** With the older band selected, the Tonight card shows the
week's devotion and, beneath it, "Or choose one of these," three others from
the same strand. The choice holds for the week on the device; a church term
(pattern 2) or a season overrides it.

**Why it works.** A teenager who chose the subject is in the conversation
before it starts.

**Fit.** Maybe (it competes with the church and the calendar, so it stays an
option). **Effort.** S.

### 14. One hand, one drawing style, for everything a family touches

**Seen in.** Don Clark's art across *The Biggest Story* book, film, storybook
and videos, with full-page art facing each one-page story in the large
format; Jago's art in *The Jesus Storybook Bible*; one illustrator across each
volume of *Every Moment Holy*; Tiny Theologians' boxed, consistent card sets.

**What it is.** A single illustration language for the household material.

**On LiveWell.** Define or commission one style: a single-weight ink line on
cream with at most one mustard accent, no gradients, no mascots. Use it for
the Advent and Holy Week symbols (pattern 6), the card faces (pattern 8), the
long-story rule (pattern 7) and the moments (pattern 10). On the printed card
and the last screen of table mode, a two-sided layout: text on one side, one
drawing on the other. MASTER-PLAN 8.5 ("drawn teaching, sparingly") governs
how many.

**Why it works.** The products that feel grown-up look like one person made
them. A family product assembled from stock art reads as a church bulletin.

**Fit.** Strong. **Effort.** L (art direction and commissioned drawings).

### Also considered, not ranked

- **A seasonal story serial with recurring child characters** (Hallow's
  *Saints Alive*, *Miracle Hunters*, *Finding Fiat*; Superbook; Abide's series).
  The strongest attention-holder for children in the cluster. It means fiction,
  invented characters and dialogue, and audio production under James's name;
  a question for him, not a unit.
- **Video episodes** (Superbook, The Gospel Project Home Edition, *The Biggest
  Story* film). Not LiveWell's medium.
- **A five-day arc per week** (*Long Story Short*, *Training Hearts*, the Home
  Edition's five lessons). Five times the content; the three-night split
  covers the need.
- **Spaced review of memory verses** (Fighter Verses). Taken by
  `A-doctrine-catechesis.md` pattern 9; pattern 8's picture for the pre-reader
  is the family addition.
- **Filtering starters by age and theme** (The Family Dinner Project). U21's
  library by theme already does it.

---

## 5. What to avoid

Each of these is a real practice in a product above, and each would betray
"Unhurried. Weighted. Grown-up." or the integrity rules.

1. **Points, gems, stars and prizes for Scripture.** Superbook's site invites
   children to "earn points and prizes"; the Bible App for Kids hands out
   collectible gems and stars and opens new stories as rewards for
   challenges; Kids Corner rewards completed activities by decorating the
   child's space. They teach that the Bible is a means to a reward.
   MASTER-PLAN 2 already bans points, badges and streaks.
2. **A countdown of the child's remaining weeks.** Parent Cue shows about 936
   weeks from birth (it can be switched off). It is urgency by guilt, and
   CLAUDE.md rules out manufactured urgency. LiveWell shows position
   ("Week 14 of the year"), never what is running out.
3. **Trivia as the main mode.** Superbook's 20+ games (trivia, word searches,
   verse scrambles) and Hallow's daily "Guess That Saint." Retrieval to learn
   is welcome (patterns 8 and 4); a quiz as the reason to open the page turns
   saints and Scripture into a contest.
4. **Animation inside the text.** The Bible App for Kids' tap-to-animate
   scenes put play inside the story. LiveWell's rule: interactivity where it
   helps a person learn or remember, never inside the reading.
5. **Celebrities as the draw.** Hallow's Advent challenge was introduced by
   Chris Pratt, Jonathan Roumie and Gwen Stefani. The voice here is James's or
   a reader he chooses.
6. **Seasons behind an account or a paywall.** Hallow's kids' challenge is
   reached through a parish page in a Community tab and may be premium.
   LiveWell's seasons are free and need no sign-in.
7. **A church link that reports on families.** Parent Cue's church sync and
   Hallow's parish community tie a family to an account. Pattern 2 must work
   by link alone, with nothing sent back.
8. **Story libraries that drift from Scripture.** Abide's 80+ bedtime stories
   are mostly original characters. A bedtime track on LiveWell is the passage
   and the prayer.
9. **Mascots and a cartoon register.** Kids Corner's guiding character and
   Superbook's cast. *The Jesus Storybook Bible* and *The Biggest Story* prove
   a child's book can be one an adult wants to read aloud; anything a parent
   would be embarrassed to read at the table fails.
10. **Guilt as the motive.** Whitney's reviewers single him out for encouraging
    instead of shaming. No copy on LiveWell counts missed nights or implies a
    parent is failing his children.
11. **The template Christ connection.** Reviewers find *Training Hearts* forced
    at times. Pattern 7's line is written for its passage or left out.
12. **Volume before voice.** Superbook's 80+ topic pages and the Home Edition's
    90 lessons a semester. LiveWell adds a strand only as fast as James can
    read it (MASTER-PLAN 10.5).

---

## 6. What I could not see

- **Any live page, screen, or typography.** Every product was seen through
  descriptions: listings, help pages, reviews, church pages. I saw no layout,
  type, color or illustration directly.
- ***Long Story Short*.** The sample pages; the exact wording of a day's
  questions; whether younger children get their own questions; the week count
  (61 per Exodus Books against 78 in `benchmark.md`). The child-asks-parent
  question rests on one reader's review.
- ***The Jesus Storybook Bible*.** Whether an interactive app ever existed; I
  found only the narrated eBook (2012), the Olive Tree edition, CDs and a DVD.
  No curriculum kit was confirmed.
- **The Gospel Project.** The card design; whether a "family journal" exists;
  current pricing beyond a few listings.
- **Parent Cue.** Current price (free or subscription); the fields on a Parent
  CUE card; the text of any cue; whether the countdown is on by default.
- **Hallow.** Whether the kids' challenges are free; the kids' screens; the
  text of the Family Prayer sessions.
- **Seeds Family Worship.** The official site; whether the free downloads I saw
  are official; whether the free devotionals and subscription box are current;
  which translations each song uses.
- ***The Biggest Story Bible Storybook*.** Whether there are questions after
  each story; whether 104 stories is meant as two a week (my inference).
- **Whitney.** His actual answers in chapter four (the unbelieving father, very
  young children).
- ***Training Hearts*.** A sample reading.
- **Abide.** Which children's stories, if any, retell Scripture.
- **Superbook.** The questions inside the discussion guides; whether the 2025
  app keeps points; the usability study's findings beyond its method.
- ***Prepare Him Room*'s text; *Wonder of the Cross*** (Machowski's Lent set:
  nothing found); ***Unwrapping the Greatest Gift*** (nothing found).
- **PJ Library.** Whether discussion questions are printed in the book itself;
  the sources were local federation pages.
- **Code.** No product in this cluster is open source that I could find, and
  GitHub search is closed to this session, so no routes or UI strings were
  read.

---

## 7. Evidence

### LiveWell files read

- `CLAUDE.md`; `docs/work/plan/benchmark.md` (sections 2.1, 3, 4);
  `docs/work/plan/MASTER-PLAN.md` (sections 0 to 3, and 5);
  `docs/work/plan/inventory-family.md` (verdict and inventory tables);
  `docs/work/design/research/A-doctrine-catechesis.md` (2.1 and patterns 9 and
  10, to avoid repeating them).
- `client/src/pages/family/TableMode.tsx` (one part per screen, wake lock,
  step in the URL, "We did this tonight"); `DevotionParts.tsx` (Read, Talk,
  Ask, Do, Remember, Pray; "Together"; "For the little ones");
  `client/src/components/ListenButton.tsx` (device speech synthesis);
  `client/src/App.tsx` (the `/family/*` routes and `/study/bible/story/:act`);
  `client/public/family-devotions.json` and `family-seasonal.json` (fields).

### Web sources (reached through search; what each showed)

**Long Story Short, Old Story New, Prepare Him Room**
- [Exodus Books listing](https://www.exodusbooks.com/details.aspx?ID=36527): 61 weeks of Monday-to-Friday ten-minute devotions; the guiding question about pointing forward to Jesus.
- [ministry-to-children.com](https://ministry-to-children.com/long-story-short/): the introduction on use with preschool, grade school and young teens; a weekly opening activity.
- [New Growth Press](https://newgrowthpress.com/long-story-short-ten-minute-devotions-to-draw-your-family-to-god/?revpage=2): preschool through high school.
- [Goodreads reader review](https://www.goodreads.com/book/show/18947766-long-story-short): the five-day week; about three comprehension questions; a question for children to ask parents; a prayer prompt each day; "go at our own pace."
- [Aaron Armstrong review](https://aaronarmstrong.co/book-review-long-story-short-by-marty-machowski/): day three on how the story points forward to Jesus, often with a New Testament reading.
- [Little Book Big Story](https://littlebookbigstory.com/long-story-short-marty-machowski/): day one's object lesson with minimal preparation.
- [Christianbook](https://www.christianbook.com/story-short-minute-devotions-your-family/marty-machowski/9781935273813/pd/273813): five days a week, about ten minutes.
- [Servants of Grace on Prepare Him Room](https://servantsofgrace.org/prepare-him-room-celebrating-the-birth-of-jesus), [10ofThose](https://uk.10ofthose.com/product/9781939946539/prepare-him-room-family-devotional-hardback), [TGC store](https://store.thegospelcoalition.org/tgc/products/3970/prepare-him-room-family-devotional): four weeks, 2014, an original short story, thirteen devotions, prayer topics, hymns, crafts, *Messiah*, an Advent wreath, a companion album.

**New City Catechism**
- [App Store](https://apps.apple.com/us/app/new-city-catechism/id564035762): children's mode with short answers and songs; ESV reading, prayer, commentary.
- [TGC, introducing the songs](https://www.thegospelcoalition.org/article/introducing-songs-from-the-new-city-catechism), [final installment](https://thegospelcoalition.org/article/final-installment-songs-new-city-catechism): 46 songs by Frank Hernandez, arranged by Fletch Wiley, free on Bandcamp, YouTube and the apps.
- [TGC on print, apps, music](https://www.thegospelcoalition.org/article/new-city-catechism-print-devotional-apps-music): the curriculum (52 lessons, ages 8 to 11) as summarized.
- [Learn of Christ review of Catechism.app](https://learnofchrist.com/resources/catechism-app): several catechisms in one library with memorization modes.

**The Jesus Storybook Bible**
- [Sally Lloyd-Jones, audio](https://sallylloyd-jones.com/books/jesus-storybook-bible/audio): Suchet narration; Spanish edition narrated by Tony Plana.
- [Apple Books, Vol. 1](https://books.apple.com/us/book/id585490380): October 9, 2012, Zonderkidz, Suchet narration per story, volumes split for file size.
- [Sacramento Public Library](https://catalog.saclibrary.org/Hoopla/MWT12160327): unabridged audio, 3 hours 22 minutes.
- [eBay listing](https://www.ebay.com/p/221513987): deluxe edition with three read-along CDs.
- [YA Books Central](https://www.yabookscentral.com/?p=225823): collector's edition with read-along CDs and a DVD animating the whole book.
- [Olive Tree](https://www.olivetree.com/store/product/44559): a Suchet-narrated edition in the Olive Tree app.

**Training Hearts, Teaching Minds**
- [Heritage Books](https://heritagebooks.org/products/training-hearts-teaching-minds-family-devotions-based-on-the-shorter-catechism-meade.html): six days of readings per question.
- [Grace and Truth Books](https://graceandtruthbooks.com/?p=67994): one question a week; readings kept brief.
- [WTS Books](https://www.wtsbooks.com/training-hearts-teaching-minds-starr-meade-9780875523927): P&R, 349 pages.

**The Gospel Project**
- [Lifeway kids ministry, Big Picture Cards for families](https://kidsministry.lifeway.com/2012/08/21/big-picture-cards-for-families/): art, Big Picture Q&A, Christ Connection; one a week; the three games.
- [Lifeway, Volume 1 cards](https://lifeway.com/en/product/the-gospel-project-for-kids-kids-big-picture-cards-volume-1-creation-and-covenant-P005848844), [Volume 2](https://www.lifeway.com/en/product/the-gospel-project-for-kids-kids-big-picture-cards-volume-2-law-and-life-P005849319), [Volume 6](https://www.lifeway.com/en/product/the-gospel-project-for-kids-kids-big-picture-cards-volume-6-prophets-and-provision-M00101876/005851524): thirteen 2.5 by 3.5 inch cards per quarter; volume titles and dates.
- [Lifeway, Home Edition Semester 3](https://lifeway.com/en/product/the-gospel-project-home-edition-digital-kit-semester-3-P005820241), [Semester 4](https://www.lifeway.com/en/product/the-gospel-project-home-edition-digital-kit-semester-4-P005820341): K to 5, eighteen weeks of five lessons, workbooks, weekly videos.
- [Lifeway News, 2018](https://news.lifeway.com/2018/07/25/the-gospel-project-launches-new-discipleship-tools-for-small-groups-and-families/): the Home Edition's launch and its stated reason.

**Parent Cue and Orange**
- [Parent Cue App page](https://theparentcue.org/app): weekly cues that change with the child's phase, babies to high school.
- [App Store](https://apps.apple.com/app/id433066482): four cues a week; monthly topics; weekly Bible-story videos and memory verses; church finder; 34,000 churches; the 936-week countdown.
- [ChurchLeaders, "Orange leaders cue the parents"](https://churchleaders.com/children/childrens-ministry-blogs/150893-orange_leaders_cue_the_parents.html), [Salvation Army Australia, 2012](https://salvationarmy.org.au/children/news/2012/05/18/app-parent-cue), [a school's app page](https://www.mcseaglesoh.org/apps/pages/parentcue): morning, drive, meal and bed times; Parent Time; free in English and Spanish; church sync.
- [Playlister review](https://www.playlister.app/blog/in-review-orange-apps-parent-cue): a 2021 review of the app (used for context only).
- [HomeWord, "It's Just a Phase"](https://homeword.com/jims-blog/its-just-a-phase/) and AbeBooks listings ([two-year-old](https://www.abebooks.com/9781635700398/Parenting-Two-Year-Old-Guide-Making-Phase-1635700396/plp), [first grader](https://www.abebooks.com/9781635700435/Parenting-First-Grader-Guide-Making-1635700434/plp)): the Phase Guides, one per year, the five areas, the named phases.
- [Orange blog, "What's so great about Orange?"](https://thinkorange.com/blog/whats-great-orange/): Parent CUE cards as weekly and monthly summaries, printable and emailable.

**Hallow**
- [Help center, content for kids or teens](https://help.hallow.com/en/articles/9605518-do-you-have-content-for-kids-or-teens): bedtime stories; Littles, Middles, Teens.
- [Hallow blog, Bible sleep stories](https://hallow.com/blog/fall-asleep-with-7-new-bible-stories/): slow adult voices, 4 to 40 minutes, Sleep tab.
- [Hallow blog, how to pray with kids](https://hallow.com/blog/how-to-pray-with-kids/): Family Prayer Morning and Dinner; a family Litany of Saints.
- [Hallow blog, Saints Alive](https://hallow.com/blog/saints-alive-joins-hallow/) and [Aleteia](https://it-front.aleteia.org/2023/04/27/5-inspiring-ways-to-pray-with-kids-using-hallow-app): the radio-drama series; Guess That Saint.
- [CatholicMom, Miracle Hunters](https://www.catholicmom.com/articles/hallows-lent-challenge-for-kids-miracle-hunters) and [parish page, kids' Advent challenge](https://annunciationparish-ottawa.tilmaplatform.com/hallow-kids-advent-challenge): the seasonal serials; joining through a parish page; the free-or-premium question.
- [ChurchLeaders on the Advent challenge](https://churchleaders.com/news/2209617-chris-pratt-jonathan-roumie-and-gwen-stefani-invite-people-to-hallows-advent-prayer-challenge.html): celebrity invitations.

**Seeds Family Worship**
- [EMCC resource index](https://www.emcc.ca/resource-index/seeds-family-worship): word for word; 170+ songs; CDs, videos, hand motions.
- [ministry-to-children, "The Word of God"](https://ministry-to-children.com/seeds-word-of-god): track titles with references.
- [Expository Songs](https://expositorysongs.com/artists/seeds-family-worship): songs indexed in canonical order.
- [FamilyLife Today, "Fun and Family Worship"](https://www.familylife.com/podcast/familylife-today/fun-and-family-worship/): Deuteronomy 6; Proverbs on the drive to school.
- [Scripture in Black and White podcast, 2024](https://scriptureinblackandwhite.podbean.com/e/s2-ep-14-don-t-miss-this-moment-a-call-to-family-discipleship-feat-jay-austin-and-jason-houser): 150+ songs; 80 million downloads (secondhand).

**The Biggest Story**
- [Crossway, how the film was made](https://crossway.org/blog/2016/09/how-the-biggest-story-the-animated-short-film-was-made): 26 minutes; narrated by DeYoung; about forty animators; score by John Poon; directed by Jorge Canedo Estrada.
- [Crossway, interview with Don Clark](https://www.crossway.org/blog/2015/08/an-interview-with-don-clark/): the largest project of his career; ten chapters against the usual 24 to 32 pages.
- [Invisible Creature project page](https://invisiblecreature.com/projects/thebiggeststory): the studio's work on the suite.
- [Crossway, The Biggest Story Bible Storybook](https://crossway.org/books/the-biggest-story-bible-storybook-case/) and [10ofThose large format](https://us.10ofthose.com/product/9781433598104/the-biggest-story-bible-storybook-large-format-hardback): 104 stories, ages 6 to 12, a prayer at each end; 10 by 14.25 inches, story facing poster art; September 24, 2024.
- [Crossway, storybook videos](https://www.crossway.org/books/the-biggest-story-bible-storybook-videos-dvd/): 104 videos narrated by Michael Reeves.

**Superbook**
- [faith.tools, Superbook Kids Bible App](https://faith.tools/app/127-superbook-kids-bible-app): October 2025 relaunch; games; Quests; 80+ topic pages; notes.
- [CBN, Gizmo's Bible Adventures](https://www.cbn.com/superbook/devo/adventure/): a 30-day devotional for children and parents; games with points and prizes.
- [CBN Europe apps page](https://www.cbneurope.com/superbook/apps/): fourteen free episodes (conflicts with faith.tools).
- [CBN Europe, Season 2 family discussion guides](https://cbneurope.com/wp-content/uploads/2026/03/Superbook-Season-2-Family-Discussion-Guides.pdf) and [Road to Damascus guide](https://courses.superbookacademy.com/us/pluginfile.php/24732/mod_resource/content/1/sbc_112_road_to_damascus_fdg.pdf): guides for talking after an episode; named lessons; the preview warning.
- [Usability study, 2026](https://journal.lembagakita.com/ijsecs/article/download/6592/4485/24201): Superbook app tested with children on Nielsen's five dimensions, self-report plus observation.

**Abide**
- [Abide](https://abide.com/?p=2589): 80+ kids' bedtime stories.
- [GodTube podcast listing](https://www.godtube.com/podcasts/abide-kids-bedtime-stories): episode titles, mostly original character series; Sleep, Topics, Kids.

**Whitney, Family Worship**
- [9Marks review](https://9marks.org/review/book-review-family-worship-by-don-whitney/): read, pray, sing; chapter four's objections.
- [JBTS review](https://jbtsonline.org/?p=597): encouragement rather than guilt.
- [Reformation 21, "Simplify Family Worship"](https://www.reformation21.org/blogs/donald-whitneysimplify-family-worshipthe-following.php) and [Crossway podcast on the holidays](https://www.crossway.org/articles/podcast-how-to-do-family-worship-during-the-holidays-don-whitney/): any order; brief, regular, flexible; about ten minutes; questions to check understanding; how to sing.

**Lectio for Families**
- [24-7 Prayer](https://www.24-7prayer.com/lectioforfamilies/) and [faith.tools](https://faith.tools/app/70-lectio-for-families): P.R.A.Y.; five to ten minutes; weekly memory verse; NCV; text and audio; pass the device; ages 7 to 11; Sabbath prayer; church-calendar themes.

**Fighter Verses**
- [App Store](https://apps.apple.com/us/app/id411711646): 1,000+ verses; eleven translations; six quiz modes; review intervals; songs (ESV); Foundation Verses with pictures; price.

**PJ Library**
- [JCONNECT](https://www.jconnect.org/families/pj-library/), [JUF on PJ Our Way](https://www.juf.org/pj-libary-announces-a-new-edition-pj-our-way/), [Jewish Federation of Orange County NY](https://www.jewishorangeny.org/pj-library-pj-our-way/what-is-pj-our-way): free books from birth to eight; ages 9 to 12 choose from four titles each month; parents' blog with discussion questions and content advisories (local pages, secondhand).

**Chandler and Griffin, Family Discipleship**
- [Faithlife](https://faithlife.com/store/product/198087/family-discipleship-leading-your-home-through-time-moments-and-milestones), [10ofThose](https://us.10ofthose.com/product/9781433566295/family-discipleship-hardback), [TGC store](https://store.thegospelcoalition.org/product/9781646890651/family-discipleship-audiobook): time, moments, milestones; structure of each section; 176 pages, 2020.

**Every Moment Holy**
- [WTS Books, Volume III](https://wtsbooks.com/collections/all/products/every-moment-holy-volume-iii-hardcover-the-work-of-the-people-every-moment-holy-9781951872168), [Volume II](https://wtsbooks.com/products/every-moment-holy-vol-2-death-grief-hope-9781951872052), [Exodus Books, Volume I](https://www.exodusbooks.com/every-moment-holy-volume-1/mckelvey/93181/): liturgies for ordinary acts; family liturgies in Volume III; grief in Volume II; 20+ illustrations by Ned Bustard.

**Objects and seasons**
- [Reformers Bookshop, ABCs of Theology](https://reformers.com.au/products/tt-abc-theo-abcs-of-theology-flashcards-tiny-theologians), [Church History](https://reformers.com.au/products/tt-abc-ch-abcs-of-church-history-flashcards-tiny-theologians), [Christ at the Center](https://reformers.com.au/products/tt-catc-christ-at-the-center-flashcards-tiny-theologians): sets, ages, card size and stock, lidded box, references.
- [Faithward, Jesse Tree](https://www.faithward.org/jesse-tree/printable-jesse-tree-ornaments/), [RCA, making a Jesse Tree](https://rca.org/resources/making-jesse-tree): a story and an ornament a day; about 25; colored by the family.
- [FamilyLife, Resurrection Eggs](https://www.familylife.com/articles/topics/holidays/featured-holidays/easter-and-lent/the-easter-story-explaining-the-gospel-through-resurrection-eggs/), [12 ways to use them](https://www.familylife.com/articles/topics/holidays/featured-holidays/easter-and-lent/12-ways-to-use-resurrection-eggs-to-tell-the-easter-story/), [Grace and Truth Books listing](https://graceandtruthbooks.com/product/resurrection-eggs-updated-edition-family-life/): twelve eggs since 1995; one a day; the empty last egg; the parent's booklet; ages 3 to 10.
- [PaperbackSwap, The Advent Book](https://secure.paperbackswap.com/Advent-Book/book/1581342977): Jack and Kathy Stockman; Crossway; doors with a picture and part of the story.

**Godly Play**
- [Wikipedia](https://en.wikipedia.org/wiki/Godly_Play), [Working Preacher](https://www.workingpreacher.org/?p=25617), [St John's Hingham bookshelf](https://stjohns-hingham.org/birds-blog/our-bookshelf): story, materials, "I wonder" questions, response; the four standard questions; *Stories of God at Home*.

**The Family Dinner Project**
- [Ohio State Extension](https://ohiofamiliesengage.osu.edu/?p=5787): starters filterable by age and theme.
- [MGH partner resources](https://lms.mghcme.org/node/14334): age-banded PDFs; "Dinner Tonight" cards.
- [Harvard Project Zero](https://pz.harvard.edu/resources/the-family-dinner-project-conversation-cards): the conversation cards.

**Cautionary and church examples**
- [faith.tools, Bible App for Kids](https://faith.tools/app/23-bible-app-for-kids) and [Scripture Engagement](https://scripture-engagement.org/content/bible-app-kids/): 41 stories; touch animation; games after each story; gems, stars and challenges.
- [Kids Corner parent blog](https://kidscorner.net/parent-blog/kids-corner-bible-devotions-app-building-lifelong-faith-habits): a guiding character; rewards that personalize the child's space.
- [Scripture of the Day - Family, App Store](https://apps.apple.com/us/app/id6752268819): a parent view with questions and context; a child's full-screen verse view.
- [Bethel Church PCA, weekday family worship](https://bethelchurchpca.com/weekday-family-worship): a church's own weekly guide with memory verse, two catechism questions, songs and five days.
