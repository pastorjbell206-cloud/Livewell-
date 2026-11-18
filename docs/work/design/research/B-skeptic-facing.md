# B. Skeptic-facing: how apologetics and seeker products earn trust, and where they lose it

Research for the LiveWell redesign, cluster B ("skeptic-facing"), prepared
2026-10-27. James's brief asks for "the most organized, well-designed website
that helps people to study the Bible, to understand doctrine, to understand
what a post-Christian world is in America, and how to live it ... very critical
of what currently is, with a fresh vision ... interactive." CLAUDE.md ranks the
skeptic first among four readers and makes him the tiebreaker. This file asks
one question of each product that writes or builds for skeptics and seekers:
how does it organize the hard questions, put the objection at its strongest,
invite without pressure, and keep an intelligent unbeliever reading, and where
does it lose him?

It goes beyond `docs/work/plan/benchmark.md` (which names this audience's
demand, gap 3, "nobody writes toward the skeptic and the family at the same
time," and McLaughlin's teen book as evidence) and beyond the sibling file
`B-post-christian-thought.md`, which already covers CPX's *For the Love of God*,
the Veritas Forum's equal-time format, *the objection in the objector's own
words* (a quoted objection field), *corrections in public*, *the open evidence
file*, and *better and worse than you think*. Those are not repeated here. Where
a pattern below touches one of them, it says so and states what it adds.

**Method and limits.** Direct page fetches fail in this sandbox, and the
GitHub search API is closed to this session (checked today: `gh search repos`
returns HTTP 403, "sessions are bound to their configured repositories"). None
of the products in this cluster is open source in any form I could find or
reach, so there was no code to read for them. One open-source explorable
already cloned in `design-src/` (Nicky Case's *The Evolution of Trust*) was
read for one structural point. Everything else came through 45 web searches,
and **the search tool returns summaries and snippets of pages, not the pages
themselves.** Each claim below is marked **(own words)** when it comes from the
product's own pages, help text, URLs, or guides as summarized in search
results, and **(secondary)** when it comes from reviews, press, church pages
reusing a product, or reference works. **(inference)** marks my reading. No
screen layout, typeface, or color is described unless a source described it in
words; most could not be seen and are listed in section 4.

**What LiveWell already has, so the patterns are calibrated.** The skeptic is
better served on this site than on most Christian sites, which is why the
patterns below are mostly sharpenings rather than new doors:

- **Honest Answers** (`/answers`, `client/src/data/answers.ts`): 35 reader
  questions, each answered in three paragraphs on a fixed shape ("direct
  answer → strongest ground → the weight it leaves"), laddering to the essay
  and a book, all on one page with anchors and FAQPage JSON-LD. Several already
  concede the objection's strength (Ivan Karamazov's returned ticket; "You can
  weigh it all and still conclude it did not happen. That is a respectable
  place to stand.").
- **Test the Case** (`/tools/test-the-case`, `client/src/data/argumentCases.ts`):
  nine published cases worked one move at a time; at each move the reader picks
  the objection he actually holds and gets an answer, and every move shows
  `grants`, "what this step honestly does NOT settle." The intro promises "You
  can walk away unconvinced at any point and I will not chase you." Progress
  persists on the device.
- **The Skeptic's Track** (`/skeptic-track`, `client/src/lib/skepticTrack.ts`):
  seven essays in argument order, noindexed until every stop is public. The
  page currently carries a `PillarLeadMagnet` and a `NewsletterSignup`
  ("Seven essays sent over four weeks").
- The **topics index** (U25) with an *Is Christianity actually true?* row, the
  Study Bible with chapter notes and `VerseRef`, and the plan's essay page
  with sources, questions, and *Write to James* (MASTER-PLAN 6.2).

So LiveWell does not need an apologetics section. It needs the habits of the
few products below that skeptics actually trust, applied to what it has, and
it needs to refuse the habits that make the rest of the genre read, to an
unbeliever, like a sales floor.

---

## 0. The short verdict

The products skeptics trust share three things, and none of them is a
feature. **They give the other side a real chair.** *Unbelievable?* has, since
2005, sat a Christian and a non-Christian side by side, and the guests who
praise it say the atheist sometimes does better. The Veritas Forum puts Peter
Singer and Steven Pinker on its stages. BioLogos spent a decade in public
dialogue with Reasons to Believe, the camp it disagrees with, and published the
record as a book. **They tell the reader what the argument does not prove.**
Alpha's hosts are told they are there to listen and not to win; Alpha's
materials, and the churches that run it, promise no pressure and no
follow-up; Test the Case, on LiveWell
itself, prints what each step leaves unsettled. **And the messenger is
accountable.** The collapse of RZIM in 2021 showed how fast a skeptic-facing
ministry loses everything when its speaker is above question.

The products skeptics distrust share the opposite habits. They write about the
skeptic as a target (a Reasonable Faith Q&A is titled *Questions to Ask an
Atheist*). They give one anonymous answer and call it the biblical one (Got
Questions defends this on brevity grounds: "where do you draw the line?").
They borrow a credential to carry the argument (the homicide detective). They
gamify (a Cold-Case kids' "Certificate of Merit"). They build toward an
emotional climax (Alpha's Holy Spirit weekend, the course's most controversial
element by its supporters' own admission). And, by a sociologist's count, the
best-known of them mostly serves people who already believe.

The open ground for LiveWell is a site that does all three trust habits on
every page, at the level of structure rather than tone: the objection stated
so its holders would sign it before any answer; what the answer does not
settle printed beside it; the positions on second-order questions shown before
James's landing; the skeptic never addressed as a project; and a messenger who
says plainly who holds him to account. Most of the machinery exists. The work
is making it the rule rather than the habit of the best pages, and adding three
things no one in this field does well: a reading of a Gospel built for a
believer and a skeptic to do together, a teen edition of the skeptic's path in
the same order as the adult one, and a correspondence with a real skeptic in
which both voices get the same space and the same type.

---

## 1. The products

Each entry: who it serves; how it is organized; signature features and the
interaction behind them; visual choices where described; how it holds
attention; what is excellent and stealable; what is weak. Products are in the
order of the brief, with three additions at the end (Explore God; three secular
method benchmarks; RZIM as the cautionary case).

### 1.1 The Veritas Forum

**Who it serves.** University students and faculty, believers and not. Founded
at Harvard in 1992 **(secondary, Wikipedia)**. Its stated aim is to "create
university events engaging students and faculty in exploring life's hardest
questions and the relevance of Jesus Christ to all of life" **(own words, as
quoted by Wikipedia)**.

**Organization and format.** Christian student groups host and other campus
organizations co-sponsor; events are evening keynotes, workshops, debates, and
discussions; Wikipedia counts over 2,000 forums at more than 200 universities
in North America and Europe; past speakers include Peter Singer and Steven
Pinker **(secondary)**. The Harvard chapter's page says it puts "the historic
Christian faith in conversation with other religious, ethical, and spiritual
worldviews" and speaks of "courageous discourse"; a Caltech listing uses
"courageous conversations that place the historic Christian faith in dialogue
with other beliefs" **(own words, chapter pages)**. The sibling file records
the common pattern of two speakers, one from each side, then moderated
questions.

**What builds trust.** The non-Christian is a speaker of standing, invited by
name, on a university stage, not a foil in someone else's talk. The campus
co-sponsorship (inference) lends neutral ground.

**Weak.** Event-bound. The online archive and its organization could not be
seen in any search.

### 1.2 Centre for Public Christianity (CPX) and Undeceptions

**Who it serves.** The Australian public, sceptics included. John Dickson
co-founded CPX in 2007 with Greg Clarke **(secondary, Wikipedia and Wheaton
faculty page)**. The sibling file covers CPX's documentary *For the Love of
God* and its four-session course. CPX's own site, podcast, and short films did
not surface in any search and could not be seen.

**Undeceptions** is Dickson's later platform (launched September 2019) and is
the clearest statement of the CPX stance in his own words. Each episode
explores "some aspect of life, faith, history, culture, or ethics that is
either much misunderstood or mostly forgotten," with "people who know what
they're talking about," to "undeceive ourselves" **(own words, podcast
listing)**. Some episodes are single-topic investigations (one asks whether
there is room for the supernatural alongside modern medicine); others are Q&A
episodes in which Dickson takes the top listener questions **(own words,
episode listings)**. Dickson calls the show "simultaneously for the sceptic and
for the believer" and has said that engaging a sceptical world means "you have
to concede a lot" **(secondary, Eternity News and Outreach interview)**. It is
reported as Australia's top religion podcast **(secondary)**.

**Excellent and stealable.** The word *ourselves*. The "undeception" is aimed
at the believer's misconceptions as much as the sceptic's, which is CLAUDE.md's
self-implication made into a format. The concession named as a method.

**A correction for planners.** *Jesus the Game Changer*, a ten-part
documentary often mentioned beside CPX, is Karl Faase's series for Olive Tree
Media, with Dickson as one of thirty interviewees **(secondary)**. It is not a
CPX product.

### 1.3 BioLogos

**Who it serves.** Christians wrestling with science, and the scientists and
pastors around them; founded by Francis Collins, who led the Human Genome
Project and came to faith from atheism **(secondary)**. Its posture is
"evolutionary creation."

**Information architecture.** The **Common Questions** began, by press
accounts in 2008, as essays answering the questions Collins kept receiving in
reader email (Time says about 25; a Nature blog says 33) **(secondary)**. Today
they sit in five categories: Christianity & Science, Scientific Evidence,
Biblical Interpretation, God's Relationship to Creation, and Human Origins
**(own words, the Common Questions page)**. Each question has its own page
titled as the reader would ask it ("Are gaps in scientific knowledge evidence
for God?", "Did Death Occur Before the Fall?", "Is historical science
reliable?", "Were Adam and Eve historical figures?"), carries topic tags, and
links related questions **(own words, page titles; secondary, summaries)**. One
of them is a comparison: "How is Evolutionary Creation different from
Evolutionism, Intelligent Design, and Creationism?" **(own words)**. A
contributor reports that one entry was drafted by Tremper Longman III and
revised with John Walton **(secondary, J. Richard Middleton)**, so the answers
are signed scholarship, not house copy.

Around them: a **Resources** library whose URLs show faceted filtering by a
two-level topic tree ("Science > What is Science?" then "Medicine") and by
content type (articles, personal stories, series, resources, common questions,
podcast episodes) **(own words, URL structure)**; a **Start** page (Welcome to
BioLogos, Common Questions, Podcasts, with suggested first videos such as
"Francis Collins | Finding a New Story" and "Jane Goodall & Francis Collins |
Being Human") and an older **Getting Started** page of short introductory
videos **(own words)**; a **Pastors Resource Center** **(own words)**; and
**Personal Stories**, where people "share how they came to peace with science
or came back to God or came to know him for the first time" **(own words)**.
Story titles include "From Young-Earth Creationist to Whale Evolution Expert:
My Story," "From Intelligent Design to BioLogos: My Story," and, notably, "How
Science Shook My Faith" **(own words)**.

**Signature features.** *Integrate*, a supplement for high-school biology and
Bible teachers: fifteen units, each built from five module types, with videos,
interviews, discussion prompts, and activities, sold as digital downloads
**(secondary, partner and review pages)**. A decade of public dialogue with
Reasons to Believe (old-earth creationists who reject BioLogos's view of
common descent), recorded in *Old-Earth or Evolutionary Creation?* (IVP
Academic, 2017) **(secondary)**; an AP story in 2012 described the "gracious
dialogue" between Southern Baptist seminary professors and evangelical
scientists hosted on the BioLogos site **(secondary)**. Its ECFA profile
describes working "in a spirit of gracious dialogue," rejecting vitriol
**(secondary paraphrase)**.

**Where it loses people.** It is attacked from both flanks: a prominent
atheist biologist's blog says it has not made "much of a dent" in evangelical
views; young-earth readers say it trades Scripture for consensus; posters on a
rival forum call its own forum a "ghost town" and allege that discussions were
closed when conclusions displeased **(secondary, partisan, unverified)**.
Being criticized from both sides is weak evidence of fairness, not proof of it.

**Excellent and stealable.** One page per question, titled as asked, grouped
in a handful of families, with related questions; a page that compares the
positions, including the ones BioLogos rejects; signed scholarly authors; a
Start page; personal stories that include faith shaken, not only faith found;
dialogue with an opponent published as a record.

### 1.4 Reasonable Faith (William Lane Craig)

**Who it serves.** Christians who want rigorous arguments, and skeptics who
want the strongest philosophical case. Its stated mission is "an articulate,
intelligent voice for biblical Christianity in the public arena" **(own
words, as quoted on a partner page)**. A review calls it "the most
academically rigorous Christian apologetics site on the internet," entirely
free **(secondary, learnofchrist.com)**.

**Information architecture.** Writings split into **Popular Writings**
("articles and talks by Dr. Craig intended for a general audience," filed by
topic: apologetics, Jesus of Nazareth, science and theology, the existence and
nature of God) and **Scholarly Writings** **(own words)**, though some pieces
are filed under both paths **(own words, inconsistent breadcrumbs)**. **Debates**
offer videos with transcripts, sectioned into opening speeches, rebuttals,
Q&A, and closings (the 2009 Craig–Hitchens transcript; a 2025 debate with
Louise Antony) **(own words)**. The **Defenders** class is a multi-year free
course in three parts with audio, slides, and transcripts **(secondary)**.
There is an animated video series (the kalam cosmological argument, Leibniz's
contingency argument, fine-tuning, the ontological argument, the logical
problem of evil) that the homepage calls a great place to begin, with a
Translations page **(own words, as summarized)**; local **chapters** exist
(the site has `/chapters/anaheim-ca/`) **(own words, URL)**; and an app
streams Defenders live and archives the rest **(secondary)**.

**Signature feature: the Question of the Week.** Numbered and dated (for
example, #922 "Faith Supported by Evidence," January 13, 2025); the reader's
letter printed under "Q," usually beginning "Dear Dr Craig"; Craig's answer
under "A," often addressing the writer by first name and signed **(own words,
as summarized)**. A directory listing reports the series past #998
**(secondary)**. A page titled "How to Write a Question of the Week" exists;
older guidance asks for questions of wide interest, that show some knowledge
of and interact with his work, and that are self-contained rather than a
request to react to a link **(own words, older post, as summarized)**.

**How it holds attention.** A weekly letter with a running number; a weekly
class; a podcast; years of debates. Habit through cadence and a single voice,
with no game mechanics visible in any source.

**Where it loses the intelligent skeptic.** A Q&A titled *Questions to Ask an
Atheist* sits in the same archive the atheist is invited to read **(own words,
title)**. The material is built from formal debate, a format another Christian
philosopher says reinforces "tribalism, competition, and spin-doctoring"
(section 1.15). The review that praised it says it is less suited to readers
who want "a site that surveys multiple Christian philosophical positions
evenhandedly" **(secondary)**.

**Excellent and stealable.** Two registers of the same argument, labeled; the
reader's letter printed in full and answered by name, numbered over years; a
debate transcript cut into labeled rounds so a reader can find the rebuttal he
cares about.

### 1.5 Be Thinking (bethinking.org, UCCF) and Uncover

**Who it serves.** UCCF runs it "with and for students," but the resources are
open to anyone, Christian or not. Its About page names three aims: exploring
Christian beliefs and the reasons for them, comparing other belief systems
with Christianity, and looking at how Christian answers apply to everyday life
**(own words)**. Material can be watched, listened to, or read **(own words)**.

**Information architecture.** The URLs show the shape **(own words, URL
structure)**: an **Explore** section and an **Engage** section (each with a
"page/all" listing), a **Relate** section with a "popular" listing, topic hubs
whose slugs are the question itself
(`/would-a-good-god-allow-suffering/how-can-god-allow-suffering`), a **Jesus**
section, content-type listings (`/type/article`, `/type/audio`), a "related
resources" page for each item (`.../related/5`), **Booklets**, and a full
**Index** of every title. Titles are questions in the reader's words: "How do
you know God exists?", "Isn't the Bible Full of Contradictions?", "Can we
believe the Bible's miracles?", "What Kind of God Doesn't Prevent Suffering?"
**(own words)**. Contributors are named (Richard Cunningham, Timothy Keller,
Adrian Holloway), and the site hosts a debate between William Lane Craig and
the atheist philosopher Stephen Law **(own words)**. What *Explore*, *Engage*,
and *Relate* each hold could not be confirmed; I read them, from the names and
the About page's three aims, as material for those exploring, material for
Christians engaging, and material on life (inference).

**Uncover** is UCCF's seeker Bible study: six studies in Luke (2011), then John
(2015) and Mark (2018), for small groups or one-to-one with a friend; the
Uncover Gospels print the Gospel text with discussion questions **(own words,
UCCF pages)**. The 2012 launch put QR codes throughout the printed Gospel
linking to two video strands, one addressing "the apologetic questions raised
by the passage," the other a contemporary retelling of seven key passages
**(secondary, Evangelicals Now, 2012)**. UCCF reports the material in more than
20 languages **(own words)**. One critic calls the leader's notes prescriptive
**(secondary)**.

**Excellent and stealable.** Topic URLs that are the question; an index of
every title; related resources per item; an audience split by section (if my
reading is right) so that equipping material and exploring material are not
the same page; and, from Uncover, the idea that a passage of Scripture can
carry, at the point it raises a question, a door to the answer.

**Weak.** Dates on some pieces suggest years without revision (a talk indexed
about 2,372 days ago) **(secondary, search metadata)**.

### 1.6 *Unbelievable?* (Premier) and *The Big Conversation*

**Who it serves.** Christians who want to understand their faith and talk with
unbelievers, and the unbelievers themselves. Begun on Premier Christian Radio
in the UK in 2005 **(secondary)**; reported past 900 episodes, with an annual
conference **(secondary)**.

**Format.** "A long-form discussion between two different perspectives (often
an atheist and a Christian in dialogue)" **(secondary)**; in Justin Brierley's
words, "I sit down with a Christian and a non-Christian, usually, to talk about
why one believes and the other doesn't" **(own words, interview)**. Early
listeners objected: "This is a terrible idea because you are bringing these
atheists on to argue for atheism" **(own words, interview)**. Guests describe
him as "a balanced moderator" who is also informed, and say that "sometimes the
atheist does better. Sometimes the Christian does better" **(secondary, guest
blogs)**. One profile describes him as "mediator rather than preacher," whose
tool is "the well-timed question offered in service of the listener"
**(secondary, Reform magazine)**. His book is titled *Unbelievable? Why After
Ten Years of Talking with Atheists I'm Still a Christian* (2017) **(own
words)**.

***The Big Conversation*** (from 2018, with the John Templeton Foundation)
runs in seasons of six shows on science, faith, philosophy, and being human;
at least one episode was filmed before a live audience in London with the
audience Q&A released as a separate video; Steven Pinker debated the future
of humanity with Nick Spencer of the Christian think tank Theos **(secondary,
diocesan and Premier listings)**.

**How it holds attention.** A weekly show for twenty years, then seasons, then
a conference. The draw is the risk: a listener does not know who will have the
better night.

**Excellent and stealable.** The other side's chair is real and the host does
not rig it. The book title concedes that the question stayed open for ten
years. Seasons of six give a shape in time.

**Weak.** Debate as entertainment can reward the quick line over the true one
(section 1.15). Brierley's own explanation of how he earned atheist listeners'
trust could not be read.

### 1.7 Alpha

**Who it serves.** Guests exploring Christianity, through local churches
worldwide.

**Format.** Every session is food, a short talk, and discussion **(own words,
Alpha Team Guide)**. The guide gives hosts three keys (love, listening, and a
non-teaching model): "the role of the hosts and helpers is to listen; not to
have all the answers or to win an argument," and discussion is "the most
important part of Alpha where guests get to say exactly what they think"
**(own words)**. It suggests two hosts, two helpers, and about eight guests,
and a fixed finish time; local materials promise "no pressure, no follow up,
no charge" **(own words and church pages)**. In Nicky Gumbel's early account,
any question could be asked, would be answered courteously, and people were
free to come back or not with no one chasing them **(secondary, Equip)**.
Alpha Canada publishes "Seven Best Practices" **(own words, title only)**.

**Where it loses the skeptic.** The **Holy Spirit weekend** is "one of the most
significant, and controversial, aspects of the course"; the common criticism
is that it is "too charismatic"; supporters reply that many conversion
testimonies cite it **(secondary)**. The sociologist Stephen Hunt's *The Alpha
Enterprise*, built on surveys of churches and participants, reports that some
80% of participants were already converted and about 4% of attendees became
Christians, and that the meals can be "rather intimidating" for some
**(secondary, a review of Hunt)**. The figures reached me through a hostile
review and should not be quoted on the site.

**Excellent and stealable.** Listening as the host's job, stated in writing;
"no one chasing them" as policy; small fixed groups and a fixed finish.

**Weak.** An emotional climax built into a course that began as conversation;
the measured audience is mostly the church.

### 1.8 Christianity Explored

**Who it serves.** People with no church background, through churches, in
groups or one-to-one **(own words and retailer pages)**.

**Format.** Seven sessions reading Mark's Gospel "to find out more about the
life of the person at the heart of the Christian faith"; each session is a
short Bible study, a talk (by a leader or from the course films), and
discussion; the session list is Good News, Identity, Sin, The Cross,
Resurrection, Grace, and Come and Die, each anchored in passages (Mark
4:35–41 for Identity; Mark 1:14–15 and 8:34–38 for Come and Die) **(own
words)**. The guest handbook prints the full text of Mark at the front; leaders
get a training podcast **(own words)**.

**Excellent and stealable.** The text itself is the curriculum, and the guest
holds the whole Gospel in his hands from the first night. The last session is
named for the cost ("Come and Die"), so the aim is not hidden.

**Weak.** The seeker-facing website, if it still has one, could not be seen.

### 1.9 Redeemer's *Questioning Christianity* (Tim Keller)

**Who it serves.** Seekers and skeptics in New York, brought by Redeemer
members.

**Format.** A seven-week series (January 30 to March 13, 2014) in which "each
night featured a talk and Q&A by Tim Keller followed by a reception"
**(secondary, byFaith)**. A livestream version had "each week's theme
introduced by a different artist, followed by a 30-minute talk from Keller and
30 minutes of Q&A," the Q&A facilitated by a Redeemer community-group director
**(secondary)**. Members could bring "friends who don't consider themselves
Christian but are open to exploring the toughest questions" **(secondary)**.
The talks are sold as a series by Gospel in Life **(own words)**. Redeemer had
long held weekly discussion sessions for non-Christians **(secondary, Salvo)**.
*The Reason for God*'s preface: "If you think Christianity doesn't hold much
promise of making sense to a thinking person, then this book is written for
you" **(own words, as quoted by Salvo)**; CT called the book the distillation
of Keller's method of "preaching and teaching directly to the contemptuous no
of unbelief and unmasking the unexamined assumptions of skepticism"
**(secondary)**.

**Excellent and stealable.** Equal time for the talk and the questions; a
facilitator who is not the speaker; art opening each theme; a series that ends
on a date; a book that names its reader as the person who thinks this will not
make sense.

### 1.10 Rebecca McLaughlin

**Who it serves.** Thoughtful adults and, in a later book, teenagers.

**Format.** *Confronting Christianity: 12 Hard Questions for the World's
Largest Religion* (Crossway, 2019) is twelve essays, each built on a question,
from "Aren't We Better Off Without Religion?" to "How Could a Loving God Send
People to Hell?" (chapter 9, "Isn't Christianity homophobic?"; chapter 10,
"Doesn't the Bible condone slavery?") **(own words, publisher listing)**. A
review says each chapter opens with an example or illustration before she sets
out her response **(secondary)**. Her podcast, *Confronting Christianity*,
belongs to Training the Church and is produced by The Good Podcast Co.; its
tagline is "Hard questions, faithfully explored"; each episode's notes carry a
"Questions Covered in This Episode" list; episodes run about 30 to 45 minutes
in numbered seasons **(own words, podcast listings)**. Her teen book passed
100,000 copies (benchmark.md).

**Excellent and stealable.** The question as chapter title, in the hostile
form ("Isn't Christianity homophobic?") rather than a softened one; the
episode notes that list the questions covered, so a listener can see before
pressing play whether his question is in it; one set of questions carried to
adults and then to teenagers.

**Weak or unknown.** Her own site's organization could not be seen.

### 1.11 Cold-Case Christianity (J. Warner Wallace)

**Who it serves.** Christians who want evidence-based confidence, and
skeptics who respect investigation. Wallace is a former atheist and Los
Angeles County homicide detective **(own words, publisher)**.

**Format.** *Cold-Case Christianity* teaches ten principles of cold-case
investigation and applies them to the Gospel writers, weighing eyewitness
testimony, corroboration, transmission, and bias to build a cumulative case
**(own words and secondary)**; a chapter titled "Test Your Witnesses" names
"four critical areas of concern" for an eyewitness **(own words, reader
notes)**. He teaches abductive reasoning, inference to the best explanation, as
the approach to the resurrection **(own words, video page)**.
*Cold-Case Christianity for Kids* (2016, with Susie Wallace) follows the same
chapter sequence as the adult book "so parents and children can discuss and
explore the evidence together, chapter by chapter"; its companion site offers
downloadable activities and "case notes" which, assembled in an "Academy
Notebook," qualify a reader for a Cold-Case Academy "Certificate of Merit";
the young characters "begin a Cadet Academy" **(own words, publisher and
retailer pages)**.

**Excellent and stealable.** Treating the reader as an investigator who will
weigh evidence himself; the parallel adult and children's books in the same
order so a parent and child are on the same page the same week.

**Where it loses the intelligent skeptic.** The credential carries the
argument ("a homicide detective investigates") when the historical method is
what should; Wallace's own account describes critics who want the testimony
"tossed out" as hearsay, which is his framing of them rather than theirs
**(own words)**; and the kids' academy turns study into rank and certificate.

### 1.12 Got Questions (the contrast)

**Who it serves.** Anyone who types a Bible question into a search box: about
13 million visitors a month and nearly 700,000 questions answered **(secondary,
MinistryWatch)**.

**How it works.** A submitted question goes to a volunteer writer with a
deadline of usually three to four days; staff editors review or edit the answer
before it goes to the asker; final approval rests with the founder, S. Michael
Houdmann; writers include pastors, missionaries, counselors, and students, and
more than 200 volunteers write **(own words, the apply page; secondary)**. A
review says a Got Questions page appears in the top three search results for
many Bible queries and that it is "strong on biblical text references but
weaker on traditions outside that lens" **(secondary)**.

**Its stated position on one answer.** The ministry calls itself "moderately
Calvinistic," treats eternal security as non-negotiable, and considers
dispensationalism and premillennialism "far more biblically sound" **(own
words, gotquestions.blog)**. Asked why it does not give alternate views, it
answers that askers want "brief, to-the-point, succinct, and easy-to-understand
answers," not "here are the seven possible interpretations of this passage,
and here is the one we prefer"; that it sometimes includes alternatives when
they help; that people mostly ask for alternatives when they disagree; and
"once you start giving alternative viewpoints, where do you draw the line?"
**(own words)**.

**Excellent and stealable.** The question as the title; one page per
question; speed; a review step before anything goes out.

**Where it loses the intelligent skeptic, and the doubting Christian.** A
house voice with no named author answers contested second-order questions as
"the" biblical answer. The brevity argument is real, but it is answered by
keeping each position short, not by omitting the others. Scale is the product,
and the archive reads (inference) as a reference desk rather than a person.

### 1.13 Added: Explore God

**Who it serves.** Cities. A nonprofit begun by Dan Smith in Austin ran its
first campaign there in 2013 with more than 300 congregations from 12
denominations; later campaigns ran in Richmond (about 140 churches, 2016),
Chicago (2019), Miami (2020), and the Bay Area (September 24 to November 12,
2023) **(secondary, local press)**.

**Format.** Seven questions, the same in every city: Does life have a purpose?
Is there a god? Why does God allow pain and suffering? Is Christianity too
narrow? Is Jesus really God? Is the Bible reliable? Can I know God personally?
Churches preach a sermon series on them while discussion groups meet in
churches, homes, campuses, coffee shops, and pubs; yard signs carry only the
web address **(secondary)**. Each session page has a sequence: a **"Pulse of
the World"** video first (inference from the name and summary: ordinary
people's answers), pause on on-screen questions, then a **"Curiosity
Collective"** video of "thought leaders, experts, pastors, and theologians,"
then six discussion questions (for session 4: personal identification, how the
media and the church represent Christianity, the claim that all religions are
the same, religion's good and bad uses, exclusive claims) and a transcript
**(own words, session page)**. Related videos include "Do Christians Represent
Christ?" **(own words)**.

**Excellent and stealable.** A dated season across a whole city; the same
seven questions everywhere, so a pastor can join without inventing; the
ordinary voice before the expert voice; a transcript for every video.

### 1.14 Added: three secular method benchmarks for stating the other side

These are not products in the field. They are the best-known tools for the
discipline CLAUDE.md asks for ("steelman ... in the form its own defenders
would sign") and they make that rule testable.

- **Rapoport's rules**, as Daniel Dennett gives them in *Intuition Pumps and
  Other Tools for Thinking*: first re-express your target's position so
  clearly that your target says, "Thanks, I wish I'd thought of putting it
  that way"; then list points of agreement; then mention anything you learned
  from the target; only then rebut **(secondary, The Marginalian, Big Think,
  Skeptic UK)**. Dennett's case is practical: it makes the other side a
  receptive audience **(secondary)**.
- **The ideological Turing test**, coined by Bryan Caplan on EconLog in 2011:
  can you state an opposing view so well that its own adherents cannot tell
  you from one of them? His proposed test put one partisan among five of the
  other side and let readers of that side vote out the impostor **(secondary,
  LessWrong and EA Forum summaries)**.
- **Kialo**, an argument-mapping site: a thesis at the top, every claim marked
  pro or con, each claim branching into claims that support or challenge it,
  shown as an interactive tree; Kialo Edu lets teachers lock, reorganize, or
  highlight claims and allows student anonymity **(secondary, university and
  vendor pages)**. One user's critique: context gets lost as you move through
  a tree **(secondary, forum)**.

And one open-source explorable, read from the clone in `design-src/ncase_trust`:
*The Evolution of Trust* ends by stating the three conditions its game showed,
then, before the last lesson, "Of course, real-world trust is affected by much
more than this," and links "my footnotes for this game" (`words.html`, the
`conclusion_*` paragraphs and the credits). An interactive argument that names
the limits of its own model at the point of conclusion is the design move Test
the Case's `grants` field already makes.

### 1.15 Added: where the genre loses the skeptic, by its own critics

- **Debate culture.** Randal Rauser, a Christian philosopher, lists the
  problems of contemporary apologetics: the debate format reinforces
  "tribalism, competition, and spin-doctoring/motivated reasoning to the end
  of winning the debate," and many apologists neglect their audience: "what
  good is it if you win every argument but lose your audience?" **(own words,
  Rauser's essay)**. Stephen Bedard, also a Christian writer, says the straw
  man "is seen a lot, especially when an apologist is trying to build up the
  confidence of Christians who are encountering skeptical arguments"
  **(own words)**. The atheist physicist Victor Stenger, as summarized by a
  Christian rebuttal, held that debates are about making impressions rather
  than substance **(secondary, through an opponent)**.
- **The messenger.** In September 2020 Christianity Today reported allegations
  against Ravi Zacharias; RZIM commissioned an investigation by the law firm
  Miller & Martin, whose report confirmed allegations dating to 2004 and
  continuing until months before his death in May 2020; RZIM planned to lay
  off 60% of its staff, and its UK affiliate cut ties and changed its name
  **(secondary, AP, Baptist Press, Premier Christianity)**. Premier
  Christianity's verdict: he had been raised to a position where he could not
  be questioned, travelled for months on end, and was not a member of a
  church; "no Christian leader or pastor should ever be above the requirement
  for full accountability" **(secondary)**. The board's open letter regretted
  that "misplaced trust in Ravi" had given him "less oversight and
  accountability than would have been wise and loving" **(own words, as
  quoted)**. A critic noted RZIM had not disclosed a Form 990 since 2015
  **(secondary)**.

---

## 2. The patterns, ranked

Ranked by how much each would raise the skeptic's trust on LiveWell per unit of
effort, with the doubting Christian, the pastor, and the seeker as the
secondary test. Each says where it is seen, what it is, why it works, how it
would look and work on LiveWell (which page, what the reader does), what it
retires where it adds a surface (MASTER-PLAN's one-in-one-out rule), fit,
effort, and evidence. Fit: **core** (the skeptic promise depends on it),
**strong**, **maybe**. Effort: **S** (days, mostly data or copy), **M** (a
unit), **L** (several units or substantial new writing by or for James).

### 1. The four moves before any verdict (Rapoport's order, made structural)

**Seen in:** Rapoport's rules (Dennett); the ideological Turing test (Caplan);
Alpha's "not to win an argument"; Test the Case's `grants`; Undeceptions'
"you have to concede a lot."

**What it is.** Every skeptic-facing answer, on the page itself, makes four
moves in order: the objection stated so its holders would sign it; what the
objection gets right; the answer; what the answer does not settle. And before
a piece goes live, someone who actually holds the objection reads the first
move and says whether it is his view.

**Why it works.** The skeptic decides in the first lines whether he is being
met or handled. A restatement he would sign tells him the writer has listened;
the concession tells him the writer is not selling; the "does not settle"
line tells him he is trusted to judge. The Turing-test read turns CLAUDE.md's
steelman rule from an aspiration into a check that can fail.

**On LiveWell.** In `client/src/data/answers.ts`, each `Answer` gains three
required fields: `steelman` (one or two sentences, rendered first in the
answer as *Put at its strongest*), `concedes` (one sentence, *What it gets
right*), and `doesNotSettle` (one sentence, *What this does not settle*,
borrowing Test the Case's word and shape). The three existing paragraphs stay
between them; several already contain the concession and only need it lifted
out. The seeker still gets the direct answer within the first screen of each
entry (the practical door first, per CLAUDE.md's audience standard), because
the steelman is a sentence, not a section. The `answers` validator already in
the content-gates step requires all three fields on every entry. For Test the
Case, the case `intro` gains the same `steelman` line. The essay ledger (and
an `answers` ledger) records, per piece, "objection read by someone who holds
it: yes, on <date>" or "not yet"; no name is published. This sharpens the
sibling file's quoted-objection field (which gives a verbatim quotation where
the essay turns) by making the four-move order the skeleton of every short
answer. **Retires:** nothing; it reshapes `answers.ts`.

**Fit:** core. **Effort:** M (schema, renderer, validator are small; the
writing of 35 steelmen and the outside reads are the work).

**Evidence:** Dennett's rules (The Marginalian, Big Think, Skeptic UK); Caplan
(LessWrong, EA Forum); Alpha Team Guide; `argumentCases.ts` (`grants`);
Undeceptions and Outreach interviews.

### 2. Never write about the skeptic as a target

**Seen in:** by contrast, Reasonable Faith's *Questions to Ask an Atheist*;
Rauser's "win every argument but lose your audience"; Bedard on straw men
built to reassure believers. Positively, Be Thinking's separate sections for
exploring and for engaging (if the reading in 1.5 is right); Alpha's "no one
chasing them."

**What it is.** The pages a skeptic reads speak to him, never about him.
Material that equips Christians to talk with skeptics lives in leader notes,
group guides, and the pastor's sheet, never on the skeptic's own pages, and
no skeptic-facing page asks him for anything.

**Why it works.** An unbeliever who finds a page about how to handle people
like him stops trusting every other page on the site. This is the cheapest
trust a site can buy and the most common one apologetics sites throw away.

**On LiveWell.** Three moves. (a) A word check added to the content gates for
skeptic-facing surfaces (`/answers`, `/skeptic-track`, `/tools/test-the-case`,
the Doubt essays, the *Is Christianity actually true?* topic row): it flags
"atheist friend," "unbeliever in your life," "win," "tactic," "ammunition,"
"defeat," "evangelize," and "lost" used as a label, with an allowlist for
quotations. (b) Equipping copy ("how to use this with a friend who doubts")
moves to group guides and the weekly pastor's sheet. (c) `SkepticTrack.tsx`
drops the `PillarLeadMagnet` and the in-page `NewsletterSignup`; the footer's
quiet newsletter line remains. MASTER-PLAN 3.1 already says of the skeptic,
"The page he lands on never asks him for anything"; today the track's own page
does. **Retires:** the lead magnet on the skeptic track.

**Fit:** core. **Effort:** S.

**Evidence:** Reasonable Faith Q&A title; Rauser; Bedard; Be Thinking URL
structure and About page; Alpha (Equip on Gumbel); `SkepticTrack.tsx` lines
16–20 and 198–215; MASTER-PLAN 3.1.

### 3. Read Mark with a friend: a Gospel reading built for a believer and a skeptic together

**Seen in:** Christianity Explored (seven sessions in Mark, the whole Gospel
printed at the front of the guest's handbook, one-to-one or in groups);
UCCF's Uncover (six passages, printed Gospel, QR codes beside the passage
opening "the apologetic questions raised by the passage"); Explore God's
transcript beside every video.

**What it is.** A short, fixed reading of one Gospel in sittings, made for two
people (one who believes and one who does not, or two who are unsure), where
the text comes first and the hard question each passage raises is marked in
the margin of the passage itself, opening the honest answer.

**Why it works.** It puts the skeptic in front of the primary text rather than
the apologist, which is what *Why would anyone trust the Bible?* already asks
of him ("It is asking to be opened"). It gives the believer something to do
with a friend that is not an argument. It gives the pastor (PCN) a free
evangelistic resource he does not have to defend, because it is mostly
Scripture. No one in the field joins this shape to a study Bible with notes on
every chapter.

**On LiveWell.** A page in the Study door, *Read Mark with a friend*, holding
seven sittings (LiveWell's own divisions of Mark, not Christianity Explored's
titles). Each sitting: the passage opened in the Study Bible chapter view;
three open questions written for two readers ("What does this passage claim
about Jesus? What would you need to believe for it to be true? What do you make
of the people around him?"); and, in the Study Bible margin at the verse
where it arises, a *The question this raises* note (new `marginQuestions`
entries on the chapter data) linking to its Honest Answer: the storm and the
demoniac (Mark 4:35 to 5:20) to *Are miracles believable?*; Peter's confession
and the cost (Mark 8:27–38) to *Was Jesus just a good teacher?*; the empty tomb
(Mark 16) to *Did the resurrection actually happen?*; the short ending at 16:8
to *Why would anyone trust the Bible?* The reader sees "Sitting 3 of 7" on this
device, never a count of days. A printable booklet (the passages with QR codes
to each sitting, reusing U21's PDF and QR machinery) is the pastor's handout.
**Retires:** nothing on the skeptic side; it adds no door (it lives under
Study and is linked from the Skeptic Track's last stop and the topics row).

**Fit:** core. **Effort:** M (the margin notes and questions are new writing
for James to read; the page and PDF reuse existing parts).

**Evidence:** Christianity Explored course pages and handbook listings; UCCF
Uncover editions and the 2012 Evangelicals Now feature; Explore God session
page.

### 4. One page per hard question, with a ladder down to the literature on both sides

**Seen in:** BioLogos (each Common Question its own page, five families,
related questions, signed scholarly authors); Be Thinking (question slugs,
related resources per item, an index of every title); Got Questions (one page
per question, titled as asked); Reasonable Faith (Popular and Scholarly
writings).

**What it is.** Each hard question has its own URL, titled exactly as asked,
in a small set of families, with a visible ladder: the two-minute answer; the
case worked step by step where one exists; the essay; the book; and, last,
the strongest published work on each side for the reader who wants to check.

**Why it works.** A shared link to `/answers#did-the-resurrection-actually-happen`
lands a skeptic in the middle of a page of thirty-five; a page of its own
lands him on his question, with its own title in search and in a text message.
The bottom rung is the trust rung: a reader who sees the best skeptical
scholar named beside the best Christian one knows he is not being kept in a
room.

**On LiveWell.** `/answers` becomes the index (the five or six families:
God; Jesus and the resurrection; the Bible; suffering and evil; science and
being human; church, doubt, and the life of faith) and `/answers/:slug`
renders one answer with the four moves of pattern 1, then *Test it step by
step* (where a Test the Case exists; each of the nine cases maps to an answer), *The full
argument* (the essay), *Further* (the book), and *The strongest work on each
side* (two to four sources per side, each with one sentence on what it
argues, every one verified and ledgered under the Scholarship Standard), then
*Related questions*. FAQPage JSON-LD moves to each page. The param route
follows MASTER-PLAN 9.3 (registered for prerender, literal fallback meta, the
canonical audit). **Retires:** the single long page; old anchors redirect to
the new pages by a client-side hash check on `/answers`.

**Fit:** strong. **Effort:** M (route work and 35 literature lists, which are
the slow part).

**Evidence:** BioLogos Common Questions page and question URLs; Be Thinking
URLs and index; Got Questions; Reasonable Faith Writings sections;
`Answers.tsx` (the anchor scroll on one page).

### 5. See the whole argument: Test the Case as a map you can enter at your own objection

**Seen in:** Kialo (thesis, pro and con claims branching into sub-claims, an
interactive tree; teachers can highlight claims); its critic's point that
context is lost as you move through a tree; *The Evolution of Trust* (the
model's limits stated at the conclusion, footnotes linked); Reasonable Faith's
debate transcripts cut into labeled rounds.

**What it is.** Beside Test the Case's one-move-at-a-time stepper, an outline
of the whole case on one screen: each move, the objections raised at it, and
what it does not settle, with each objection a link into the stepper at that
point.

**Why it works.** The intelligent skeptic usually arrives with one objection
and wants to see whether it is taken seriously before he gives ten minutes to
the sequence. The outline shows him, at a glance, that his objection is there
and where, and shows the argument's shape, including its weakest joint. The
stepper stays the default because the critic is right that a tree loses
context.

**On LiveWell.** On `/tools/test-the-case`, a plain *See the whole case* link
toggles an outline (a nested list in the prose column, no canvas, no graph
library): "Move 2: The timing" with its objections as links and its `grants`
line in muted ink. Tapping an objection opens the stepper at that move with
that objection expanded. The URL carries the state
(`?case=resurrection&move=early&objection=2`) so a reader can send a friend
straight to the answer to his objection. *Print the case* renders the outline
as one page for a group. **Retires:** nothing; it is a view of existing data.

**Fit:** strong. **Effort:** S.

**Evidence:** Kialo pages and the forum critique; `ncase_trust/words.html`
conclusion and credits; Reasonable Faith debate transcripts;
`argumentCases.ts` (moves, objections, grants already structured).

### 6. The positions before the verdict, on every second-order question

**Seen in:** BioLogos's comparison page (its own view beside the three it
rejects) and its decade of published dialogue with Reasons to Believe; Got
Questions as the contrast, in its own words ("where do you draw the line?").

**What it is.** Where a hard question is second- or third-order (where
faithful churches divide), the page sets out each position at equal length in
its defenders' best terms, names who has held it, labels the order of the
question, and only then gives James's landing and the objection he has not
fully answered.

**Why it works.** CLAUDE.md's test for contested doctrine is that "the reader
should not be able to tell, from the steelman alone, where the author lands."
A skeptic reads a single confident answer to a question Christians have
disputed for centuries as evidence that the site hides things; the doubting
Christian reads it as the narrowness she left. Got Questions' brevity argument
is answered by keeping each position to one paragraph, not by dropping the
others.

**On LiveWell.** At least six of the 35 Honest Answers are second-order or
open questions: *Is hell forever, or does it end?*, *Does God choose us, or do
we choose him?*, *Can you lose your salvation?*, *How should a Christian read
Genesis 1?*, *What about those who never heard of Jesus?*, and *What does the
Bible say about divorce and remarriage?* (*Is Jesus really the only way to
God?* is first-order at its core and stays a single answer). On those pages (pattern 4), a
`positions` block renders before the answer: each position a short paragraph
of identical width and type, in historical order, each with "held by" (two or
three names across the centuries) and a verse or two it rests on; a line
naming the order ("This divides faithful churches; it does not divide the
faith"); then *Where I land*. The `answers` validator requires `positions` on
entries tagged second-order and fails if one position's text is more than
half again as long as another's. The sibling file proposes *Where faithful
Christians disagree* for topic pages; this carries the same rule into the
short answers, where the Got Questions habit most tempts. **Retires:**
nothing.

**Fit:** strong. **Effort:** M (content, and a James read on every landing).

**Evidence:** BioLogos comparison page title; IVP book and reviews; AP on
"gracious dialogue"; gotquestions.blog on alternate viewpoints and on its
theological commitments; CLAUDE.md "Handling a contested doctrine."

### 7. The two-sided myth check

**Seen in:** Undeceptions ("undeceive ourselves," misunderstood or forgotten
things, "simultaneously for the sceptic and for the believer"); CPX's good and
bad together (sibling file); Be Thinking's "Isn't the Bible Full of
Contradictions?"

**What it is.** Wherever the site corrects a popular belief, it corrects
believers' myths with the same instrument as skeptics' myths, side by side.

**Why it works.** A myth check that only ever corrects the other side is a
tribe in robes, which is CLAUDE.md's own test for the orthodoxy guardrail. A
skeptic who sees the site correct a myth Christians love will believe its
correction of one he holds.

**On LiveWell.** The plan already gives church-history sessions a myth check
(benchmark 4 and MASTER-PLAN 7.2). Add the rule: every myth-check set, on any
page, holds at least one myth believers commonly tell beside the myths
skeptics hold, each answered from the record with a source, and
`validate-history` (or a shared `myths` validator) fails a set without a
`believerMyth: true` entry. The reader's interaction stays private and
unscored: *I had heard this* is a tap that changes nothing but the reader's
own memory on the device. Candidate believer myths are drafted only after a
source check (the plan's ledgers), never from memory. **Retires:** nothing.

**Fit:** strong. **Effort:** S for the rule and validator; M for content.

**Evidence:** Undeceptions listings and Dickson interviews; CPX in the sibling
file; Be Thinking index titles.

### 8. Letters: one reader's question at a time, printed with the answer

**Seen in:** Reasonable Faith's Question of the Week (numbered, dated, the
letter printed under "Q," the answer to the writer by first name and signed,
published guidance on what makes a good question); Undeceptions' Q&A episodes;
Got Questions' review step before an answer goes out; McLaughlin's
"Questions Covered in This Episode."

**What it is.** A slow, dated correspondence: a reader writes, James answers
one letter at a time, and the letter (with permission) and answer are
published together, numbered, filed by question family, and linked to the
relevant answer and essay.

**Why it works.** It is the honest form of a habit: a reason to come back that
is a person, not a streak. It proves the site reads what skeptics send. It
keeps the questions in the reader's words, which keeps the site's titles
honest. It gives the essays a living edge without a comments section.

**On LiveWell.** `/letters`, with *No. 14 · 3 March 2027* above each; the
letter in the reader's own words (first name or initials, by their choice,
consent recorded in the ledger with the date), James's reply below in the same
column, and *Related* links. *Write a letter* explains, adapted from Craig's
guidance, what helps: one question, in your own words, saying what you have
already read. The cadence is what James can sustain (monthly is the default
assumption), and the plan's *Write to James* link at the foot of essays is the
intake. No comment threads, no counts of letters received. The integrity rule
is absolute: no letter is ever composed, merged, or paraphrased into a letter;
an agent drafts nothing in James's first person (MASTER-PLAN 2). **Retires:**
nothing; it gives *Write to James* a public end.

**Fit:** strong. **Effort:** M (small data and page; James's time is the
cost, and question 12-style approval is needed).

**Evidence:** Reasonable Faith Q&A pages, the "How to Write a Question of the
Week" page, faith.tools listing; Undeceptions; Got Questions apply page;
McLaughlin podcast listings.

### 9. The host's card: a mixed-room kit with the listening rules and the no-follow-up promise in writing

**Seen in:** Alpha (food, talk, discussion; hosts listen and do not win; two
hosts, two helpers, about eight guests; a fixed finish; "no pressure, no
follow up, no charge"); Redeemer's *Questioning Christianity* (seven weeks,
equal time for talk and questions, a facilitator who is not the speaker, a
reception, members bring friends); Explore God (the same questions in homes,
pubs, and churches across a city, with a transcript and six questions per
session); Christianity Explored one-to-one.

**What it is.** A free, printable six-session kit, built on the Skeptic's
Track, for a Christian to host a few friends who do not believe, with the
host's rules and the guest's promises printed.

**Why it works.** The skeptic's fear in a church-run group is the hidden
agenda: the friendly meal before the emotional weekend, the phone call after.
Printing the rules on the guest's card ("Nobody will contact you afterward
unless you ask. You do not have to say anything. We finish at 9.") removes the
fear. Printing the host's ("You are there to listen, not to win") disciplines
the believer. It distributes through pastors (PCN) at no cost.

**On LiveWell.** *Host an evening of questions* on the Skeptic's Track page
and in the pastor's materials: six sessions, each a stop on the track (an
essay excerpt to read aloud, about ten minutes, or the whole essay beforehand
for those who want it), four to six open questions from the essay's group
guide, and two cards: the host's (Alpha's listening rules in James's words,
two hosts, no more than eight guests, a fixed finish, never more than half the
time talking) and the guest's (the promises above, and the essay URL to read
alone). No session is built as a climax; the sixth ends with the track's last
stop and the weight it leaves. The sibling file's reading circles and supper
kits are for readers who already belong; this one is for a room with
unbelievers in it. **Retires:** the skeptic track's lead magnet (pattern 2)
is replaced by this as the page's one offer, which asks nothing of the
skeptic and is addressed to his friend.

**Fit:** strong. **Effort:** M (writing and print layout; reuses group-guide
questions).

**Evidence:** Alpha Team Guide and Alpha Canada guide; Equip on Gumbel; Hunt
via review (the meal can intimidate); byFaith and Gospel in Life on
*Questioning Christianity*; Explore God session page and local press;
Christianity Explored listings.

### 10. The teen track, in the same order as the adult one

**Seen in:** *Cold-Case Christianity for Kids* (same chapter sequence as the
adult book "so parents and children can discuss and explore the evidence
together, chapter by chapter"); McLaughlin's adult book of twelve questions
and her teen book (benchmark.md: past 100,000 copies); BioLogos's *Integrate*
for high-school classes.

**What it is.** A seven-stop version of the Skeptic's Track for readers
roughly 13 to 17, one stop for each adult stop, the same question in the same
order, shorter and in a register a teenager reads without being talked down
to, with questions for a parent and teen to talk through.

**Why it works.** It is benchmark gap 3, built: the skeptic and the family at
the same time. A parent reading stop 3 on suffering and a fourteen-year-old
reading stop 3 on suffering can talk at dinner because they read the same
question that week. The parent research in benchmark.md (conversation at home
is the strongest predictor) points straight at this.

**On LiveWell.** `/skeptic-track` gains a plain switch, *For a teenage
reader*, beside the stop list (the same pattern as The Table's younger and
older bands from U21, state in the URL). Each teen stop is 700 to 1,000 words,
argues the same case at the same honesty (it concedes as much as the adult
stop), and ends with three questions marked *To talk about with a parent*.
The Table can surface a teen stop as a week's older-band reading. No academy,
no certificate, no completion count. **Retires:** nothing; it doubles an
existing door rather than adding one.

**Fit:** core. **Effort:** L (seven new pieces, each read by James under the
byline rule).

**Evidence:** David C Cook, Biola store, and Sean McDowell interview on the
kids' book; McLaughlin publisher listings; BioLogos *Integrate* reviews;
benchmark.md sections 1.2 (topic 3) and 3 (gap 3).

### 11. Equal chairs: a written exchange with a real skeptic

**Seen in:** *Unbelievable?* (a Christian and a non-Christian, a host who does
not rig it, "sometimes the atheist does better"); *The Big Conversation*
(seasons, a live audience, the audience's questions published too);
Reasonable Faith's debate transcripts in labeled rounds; the Veritas Forum's
named non-Christian speakers; BioLogos's published dialogue with Reasons to
Believe.

**What it is.** An occasional correspondence between James and a named,
thoughtful unbeliever on one question, in fixed rounds of equal length,
published whole, with both voices in the same type at the same width.

**Why it works.** Nothing tells a skeptic the site is honest like his own side
argued well on it, unedited, at full strength, and sometimes left with the
better of it. It is CLAUDE.md's skeptic test ("I do not believe this, but I no
longer think believing it is stupid") offered from the other direction.

**On LiveWell.** `/exchanges/<slug>`: four rounds (case, reply, rebuttal, last
word) under a word cap for each round; the guest approves every word of his
own text and nothing of his is cut to help James; the last word alternates
between exchanges; the two voices are set identically (no portrait for one
and initials for the other, no mustard on one side); a round index at the top
lets the reader jump to a round, as Reasonable Faith's transcripts do. Each
exchange links its Honest Answer and Test the Case. One or two a year is
enough. The sibling file's *conversations published transcript first* covers
recorded conversation; this adds the written form and its equal-space rules.
**Retires:** nothing.

**Fit:** strong. **Effort:** M (the page is small; finding the interlocutor
and James's time are the cost; a James question).

**Evidence:** Unbelievable interviews and guest accounts; Big Conversation
listings; Reasonable Faith debates page; Veritas Forum (Wikipedia, chapter
pages); BioLogos and RTB book reviews.

### 12. The messenger's accountability, on the page

**Seen in:** RZIM by its absence (above question, not a church member,
"less oversight and accountability than would have been wise and loving," no
Form 990 after 2015); Got Questions' named review chain (writer, staff
editor, founder's approval); BioLogos's signed scholarly authors.

**What it is.** A short, plain statement of who holds the writer to account:
the church he serves and its leaders, who reads his work before it is
published, how errors are corrected, and how a reader can raise a concern
about the writer with someone other than the writer.

**Why it works.** After 2021, a skeptic who reads a confident apologist asks,
reasonably, who checks this man. A site built on one voice (benchmark gap 10,
its strength) carries this risk in proportion. Saying it plainly costs a
paragraph.

**On LiveWell.** On `/about`, a section *Who holds me to account*, linked
from the footer beside the corrections page the sibling file proposes: First
Baptist Church of Fenton and its leadership (as James describes them), the
review each piece receives (the plan's ledgers and the byline rule, stated for
readers), the corrections page, and a contact for concerns that does not go
to James (only if he names one). No speaking-fee language, no "world-renowned"
framing anywhere on the site. **Retires:** nothing.

**Fit:** strong. **Effort:** S (copy), gated on James.

**Evidence:** AP, Baptist Press, and Premier Christianity on RZIM; the RZIM
board letter as quoted; Got Questions apply page; BioLogos contributor
account.

### 13. Your strongest objection, kept or sent

**Seen in:** Alpha ("guests get to say exactly what they think"); Reasonable
Faith's letters that "interact with" the work; Cold-Case's reader as
investigator (without the certificate); LiveWell's own storage pattern
("Change my answers").

**What it is.** At the close of each Test the Case, an optional private field:
*In your own words, what is the strongest point against this case?* Saved on
the device, editable, never scored, never sent unless the reader chooses
*Send this to James*, which opens the letters intake (pattern 8) with it
prefilled.

**Why it works.** It asks the skeptic for the one thing the site wants from
him, his best objection, and asks for nothing else (not a verdict, not an
email). It feeds the steelman discipline of pattern 1 with real objections.

**On LiveWell.** Below the case's `close`, a text area through
`lib/storage.ts` (`livewell-progress-case-<slug>-objection`), the save-failure
copy the helper already renders, and a quiet *Send this to James* link. No
"Where do you stand now?" multiple choice: a verdict picker after an argument
reads as a funnel, which is what pattern 2 forbids. Telemetry records nothing
about the note. **Retires:** nothing.

**Fit:** maybe (strong if Letters ships). **Effort:** S.

**Evidence:** Alpha Team Guide; Reasonable Faith question guidance; Cold-Case
kids' case notes (the good half); CLAUDE.md Elevation Standards on long
instruments.

### 14. Stories in both directions

**Seen in:** BioLogos Personal Stories (faith found, faith returned, and
"How Science Shook My Faith"); Brierley's title (still a Christian after ten
years, which admits the question stayed live); Wallace's and Collins's
accounts of leaving atheism.

**What it is.** First-person accounts, each in its author's own words and
with consent, of how a person came to faith, came back, or is still unsure,
including accounts in which faith was shaken.

**Why it works.** The skeptic trusts a site that admits people leave and
doubt; the doubting Christian finds herself named. James's own path from
atheism is the most credible thing the site owns.

**On LiveWell.** Only James can write his part: *How I got here* in his words,
placed as the first stop's companion on the Skeptic's Track. Other stories
only from real people with written consent, never composed, and never only
the ones that end in faith. Given MASTER-PLAN's rule against supplied first
person, this is a request to James, not a unit. **Retires:** nothing.

**Fit:** maybe (gated). **Effort:** M (all of it James's or contributors').

**Evidence:** BioLogos personal-story pages and the Getting Started page;
Brierley's book title; Cold-Case publisher bio.

### Also considered, not ranked

- **An animated short per argument** (Reasonable Faith's series, called the
  place to begin, translated). LiveWell's plan allows drawn teaching sparingly
  (MASTER-PLAN 8.5); one static diagram of an argument's premises inside Test
  the Case would serve recall better than motion. Parked.
- **A faceted library** (BioLogos's topic-tree and type filters). LiveWell's
  search and topics index already do this job at its size.
- **A full A to Z index of every title** (Be Thinking). Cheap and useful; it
  belongs to the search and sitemap work, not this cluster.
- **A city-wide dated season** (Explore God). The sibling file's *season's
  question* and the plan's church-year rhythm cover the shape; a skeptic
  season through PCN churches (the seven Skeptic's Track stops over seven
  weeks after Easter, say) is a later idea for James.
- **An "ask a question" service with a volunteer writing team** (Got
  Questions). James is the scarcest resource in the plan; Letters (pattern 8)
  is the honest scale.
- **Debates.** The equal-chairs exchange takes what is good in them without
  the scoring.

---

## 3. What to avoid

Each item is something a product in this cluster does or shows, that would
betray "Unhurried. Weighted. Grown-up." or the integrity rules.

1. **Writing about the skeptic as a target.** Titles like *Questions to Ask an
   Atheist*, "win your friend," "tactics," "ammunition," "defeaters," and any
   page that would embarrass its writer if the skeptic read it (Reasonable
   Faith; Rauser; Bedard). Pattern 2.
2. **Asking the skeptic for something on his first page.** Lead magnets, email
   gates, "join the 7-day challenge," on the skeptic track (`SkepticTrack.tsx`
   today). The skeptic's page asks for nothing.
3. **The emotional climax.** A course or sequence that builds to a weekend, an
   altar moment, or a session designed to produce an experience (Alpha's Holy
   Spirit weekend, by its supporters' own description the most controversial
   part). Endings leave weight; they do not press.
4. **Follow-up the reader did not ask for.** Phone calls, drip emails after a
   tool, "a friend will contact you." Alpha's own policy is the floor: no one
   chases.
5. **One anonymous answer to a second-order question.** The house voice that
   answers election, the millennium, or eternal security as "the" biblical
   view (Got Questions, by its own explanation). Named author, positions first
   (pattern 6).
6. **Volume as the product.** Hundreds of thousands of answers written to rank
   (Got Questions' scale). Curation is the promise; every answer has a named
   writer and a review.
7. **Credentials doing the arguing.** "A homicide detective investigates,"
   "a world-class scientist says," a speaker's degrees on the poster. The
   evidence and the method carry the case; James's biography is a reason to
   listen, never a proof.
8. **Certainty language beyond the evidence.** "Proves," "case closed,"
   "verdict: guilty." Test the Case's `grants` and the four moves of pattern 1
   are the guard.
9. **Academies, certificates, badges, ranks** for study, adult or child (the
   Cold-Case kids' "Certificate of Merit" and "Cadet Academy"). Position, not
   performance.
10. **Debate as sport.** Scoring who won, audience polls, highlight clips of
    "destroying" an atheist, thumbnails with red arrows (the impression
    culture Stenger and Rauser describe). No polls on any argument, ever.
11. **Straw men and the weakest opponent.** Quoting the most embarrassing
    unbeliever because it reassures believers (Bedard). The strongest
    opponent or no quotation.
12. **Conversion counts as social proof.** "Hundreds have come to faith,"
    "thousands of decisions" (reach claims on seeker programs). No counts of
    souls, readers, or completions anywhere.
13. **A celebrity messenger above question.** The RZIM pattern: travel, fame,
    no church, a board that defers. Pattern 12.
14. **Myth checks that only fire in one direction.** Correcting the skeptic's
    myths and never the believer's. Pattern 7.
15. **Hidden aims.** Christianity Explored names its last session "Come and
    Die," and that honesty is to its credit; the betrayal is the course or page
    whose real aim is disclosed only at the end. LiveWell says on the first
    screen who wrote this and what he believes.
16. **Infinite feeds and autoplay** of clips (the debate-video channels), and
    any "next question" autoplay in the Answers. A reader finishes a page and
    chooses where to go.

---

## 4. What could not be seen

No live page was loaded; everything came through search summaries. In
particular:

- **Visual and typographic design of every product in this cluster.** No
  source described a typeface, color system, or layout for Reasonable Faith,
  BioLogos, Be Thinking, Got Questions, Veritas, CPX, Alpha, Christianity
  Explored, Explore God, McLaughlin's site, or Cold-Case. Nothing in this file
  describes a screen.
- **Be Thinking's section contents.** The meaning of *Explore*, *Engage*, and
  *Relate* is inferred from URL names and the About page's three aims.
- **CPX's own site, its *Life & Faith* podcast, and its short films.** No
  search reached them.
- **Rebecca McLaughlin's website organization** beyond one book page.
- **Christianity Explored's current seeker website** and any online course.
- **Alpha's full current session list and length**, its online and film-series
  formats, and Alpha's own response to Hunt's findings. Hunt's figures came
  through a hostile review and are not fit to quote.
- **The BioLogos forum's current status and moderation rules**; only partisan
  critics' claims were found.
- **Explore God's "Pulse of the World" videos.** That they are ordinary
  people's voices is inferred from the name and the summary.
- **Brierley's own account of how he earned atheist listeners' trust** (the
  Premier Christianity article surfaced only by title).
- **Kialo's "impact" voting** and how it weights claims.
- **Unbelievable?'s and Reasonable Faith's audience figures** in any checked
  form.
- **Any product's code.** None is open source as far as could be found, and
  GitHub repository search is closed to this session.

---

## 5. Evidence

Every source used, with what it showed. "Summary" means the search tool's
summary of the page, not a reading of the page.

### Veritas Forum
- [Wikipedia: Veritas Forum](https://en.wikipedia.org/wiki/Veritas_Forum): founded 1992 at Harvard; hosted by Christian student groups; keynotes, workshops, debates, discussions; over 2,000 forums at 200+ universities; Singer and Pinker among speakers; mission wording.
- [Harvard Undergraduate Veritas Forum](https://soco.college.harvard.edu/350028/home): "historic Christian faith in conversation with other religious, ethical, and spiritual worldviews"; "courageous discourse."
- [Caltech event page](https://studentaffairs.caltech.edu/calendar/veritas-forum-at-caltech): "courageous conversations that place the historic Christian faith in dialogue with other beliefs."

### CPX, John Dickson, Undeceptions
- [Wikipedia: John Dickson](https://en.wikipedia.org/wiki/John_Dickson_(author)) and [Wheaton faculty page](https://www.wheaton.edu/academics/faculty/john-dickson): co-founded CPX in 2007 with Greg Clarke; now at Wheaton.
- [Undeceptions on Million Podcasts](https://www.millionpodcasts.com/podcasts/undeceptions-with-john-dickson) and [Great Australian Pods](https://www.greataustralianpods.com/undeceptions-with-john-dickson/): the "misunderstood or mostly forgotten ... undeceive ourselves" description; Q&A episodes; guest list.
- [Player FM: Medical Miracles](https://nl.player.fm/series/undeceptions-with-john-dickson/medical-miracles): a single-topic episode on the supernatural and medicine.
- [Eternity News on Undeceptions](https://eternitynews.com.au/podcast/undeceptions-john-dickson/) and [on the Undeceptions conference](https://eternitynews.com.au/australia/john-dicksons-all-star-undeceptions-conference-for-sceptics-and-believers/): "simultaneously for the sceptic and for the believer"; ranking claim.
- [Outreach Magazine interview](https://outreachmagazine.com/?p=77818): "you have to concede a lot"; scholarship into the vernacular.
- [FIEC](https://fiec.org.uk/resources/jesus-the-game-changer), [Eternity News](https://eternitynews.com.au/australia/jesus-the-game-changer-changes-up-for-a-second-season/), [TheTVDB](https://www.thetvdb.com/series/jesus-the-game-changer): *Jesus the Game Changer* is Karl Faase's ten-part series (Olive Tree Media), not CPX's.

### BioLogos
- [Common Questions](https://biologos.org/common-questions): the five categories.
- Question pages: [How is Evolutionary Creation different ...](https://biologos.org/common-questions/how-is-biologos-different-from-evolutionism-intelligent-design-and-creationism), [Are gaps in scientific knowledge evidence for God?](https://biologos.org/common-questions/are-gaps-in-scientific-knowledge-evidence-for-god), [Did Death Occur Before the Fall?](https://biologos.org/common-questions/did-death-occur-before-the-fall), [What is Evolution?](https://biologos.org/common-questions/what-is-evolution), [Is historical science reliable?](https://biologos.org/common-questions/is-historical-science-reliable): one page per question, titled as asked; the comparison page.
- [Resources (faceted URL)](https://biologos.org/resources): topic hierarchy and type filters visible in the query string, including personal stories and common questions as types.
- [Start](https://biologos.org/start) and [Getting Started](https://biologos.org/getting-started): the start page's sections and first videos; short introductory videos; the Personal Stories description.
- Personal stories: [How Science Shook My Faith](https://biologos.org/personal-stories/how-science-shook-my-faith), [From Young-Earth Creationist to Whale Evolution Expert](https://biologos.org/personal-stories/from-young-earth-creationist-to-whale-evolution-expert-my-story), [From Intelligent Design to BioLogos](https://biologos.org/personal-stories/from-intelligent-design-to-biologos-my-story), [Francis Collins testimony](https://biologos.org/personal-stories/is-there-a-god-and-does-he-care-about-me-the-testimony-of-biologos-founder-francis-collins).
- [Pastors Resource Center](https://biologos.org/pastors-resource-center): exists.
- [Nature blog, 2008](https://blogs.nature.com/blog/collins_answers_the_big_questi_1/) and [Templeton-Cambridge/Time](https://www.templeton-cambridge.org/fellows/showarticle_article-444.html): the questions began from reader email (33 and about 25).
- [J. Richard Middleton](https://jrichardmiddleton.com/2018/01/15/how-long-are-the-days-of-genesis-1/): a Common Question drafted by Longman and revised with Walton.
- [CurriculumTrak](https://www.curriculumtrak.com/blog/biologos), [Templeton grant page](https://www.templeton.org/grant/multiplying-the-impact-of-the-integrate-curriculum), [Peaceful Science thread](https://discourse.peacefulscience.org/t/biologos-integrate/13131): *Integrate*'s fifteen units, five module types, audience, pricing, critique.
- [IVP: Old-Earth or Evolutionary Creation?](https://ivpress.com/old-earth-or-evolutionary-creation), [ISCAST review](https://journal.iscast.org/archive/book-review-old-earth-or-evolutionary-creation-discussing-origins-with-reasons-to-believe-and-biologos), [Washington Examiner/AP](https://www.washingtonexaminer.com/?p=1570326): the RTB dialogue and "gracious dialogue."
- [ECFA profile](https://www.ecfa.org/MemberProfile.aspx?ID=43006): the gracious-dialogue mission statement.
- [Why Evolution Is True](https://whyevolutionistrue.com/2022/08/08/a-check-in-with-biologos/) and [Peaceful Science threads](https://discourse.peacefulscience.org/t/biologos-criticism-atheists-welcome/7830?page=3): critics from the atheist and forum sides (partisan).

### Reasonable Faith
- [Home](https://www.reasonablefaith.org/): animated series as a place to begin; Translations page.
- [How to Write a Question of the Week](https://www.reasonablefaith.org/writings/question-answer/how-to-write-a-question-of-the-week), [#922 Faith Supported by Evidence](https://www.reasonablefaith.org/question-answer/p20/faith-supported-by-evidence), [Questions to Ask an Atheist](https://www.reasonablefaith.org/question-answer/P720/questions-to-ask-an-atheist), [Loving Christ](https://www.reasonablefaith.org/writings/question-answer/loving-christ): the Q and A format, numbering, dating, guidance, and the target-language title.
- [Popular Writings](https://www.reasonablefaith.org/writings/popular-writings/), [God's Existence](https://www.reasonablefaith.org/writings/popular-writings/existence-nature-of-god), [Christian Apologetics: Who Needs It?](https://www.reasonablefaith.org/writings/scholarly-writings/divineeternity/christian-apologetics-who-needs-it), [Debating Q&A](https://www.reasonablefaith.org/writings/question-answer/debating): Popular and Scholarly split; inconsistent filing.
- [Debates](https://www.reasonablefaith.org/media/debates), [Debate transcripts page 3](https://www.reasonablefaith.org/media/debates/P3), [Does God Exist?](https://www.reasonablefaith.org/media/debates/does-god-exist): videos with sectioned transcripts.
- [Anaheim chapter](https://www.reasonablefaith.org/chapters/anaheim-ca/): local chapters exist.
- [faith.tools listing](https://faith.tools/app/247-reasonable-faith) and [learnofchrist.com review](https://learnofchrist.com/resources/reasonable-faith): the app, QoW past #998, Defenders format, "most academically rigorous," less even-handed across positions.
- [Goodreads author post listing the animations](https://www.goodreads.com/author_blog_posts/16197968-philosophical-arguments-for-the-existence-of-god): the animated titles.

### Be Thinking and Uncover
- [About](https://bethinking.org/about): UCCF; open to anyone; three aims; watch, listen, read; reuse terms.
- [Index](https://www.bethinking.org/index), [Explore](https://www.bethinking.org/explore/page/all), [Engage](https://www.bethinking.org/engage/page/all), [Relate: popular](https://bethinking.org/relate/popular/page/20), [Jesus](https://www.bethinking.org/jesus/), [Articles by type](https://www.bethinking.org/type/article/page/all), [Audio by type](https://www.bethinking.org/type/audio/page/all), [Booklets](https://www.bethinking.org/booklets): the section and type structure.
- [How Can God Allow Suffering?](https://www.bethinking.org/would-a-good-god-allow-suffering/how-can-god-allow-suffering) and [its related resources](https://www.bethinking.org/would-a-good-god-allow-suffering/how-can-god-allow-suffering/related/5), [Powerless and Uncaring](https://www.bethinking.org/would-a-good-god-allow-suffering/powerless-and-uncaring): question-slug hubs and related pages; dated talk.
- [Be Thinking review of Unbelievable?](https://www.bethinking.org/is-christianity-true/unbelievable-review): an "is-christianity-true" section path.
- [UCCF Uncover editions](https://www.uccf.org.uk/uncover/editions), [Uncover resources](https://www.uccf.org.uk/uncover/about/uncover-resources), [Using Uncover John in your CU (PDF)](https://uccf.org.uk/media/pages/uncover/john/using-uncover-john-in-your-cu/2524153007-1724852466/using_uncover_john_gospels_in_your_cu.pdf), [IFES](https://scriptureengagement.ifesworld.org/?p=542), [Evangelicals Now, 2012](https://e-n.org.uk/features/2012-10-50000-students-and-luke), [critic's Substack](https://fundiebookclub.substack.com/p/uncover-using-uncover-in-your-christian): editions, format, QR video strands, languages, critique.

### Unbelievable? and The Big Conversation
- [Christianity Today, 2025](https://christianitytoday.com/2025/03/justin-brierley-podcast-christian-faith-rebirth-uk): format and history.
- [Cross Rhythms interview](https://crossrhythms.co.uk/articles/life/Conversations_Between_Christians_And_Atheists/60659/p1): "I sit down with a Christian and a non-Christian"; the "terrible idea" objection.
- [Reform magazine](https://www.reform-magazine.co.uk/2017/08/for-the-sake-of-argument/): mediator rather than preacher; the well-timed question.
- [Randal Rauser on Loftus debate](https://randalrauser.com/2013/06/randal-and-john-loftus-debate-the-outsider-test-and-miracles-on-unbelievable/), [Deeper Waters](https://www.deeperwatersapologetics.com/?p=7189), [Sean McDowell interview](https://seanmcdowell.org/blog/unbelievable-interview-with-justin-brierley-about-his-new-book): balanced moderation; sometimes the atheist does better; collegial episodes.
- [10ofthose listing](https://uk.10ofthose.com/product/9780281077984): the 2017 book and its subtitle; the conference.
- [Diocese of Norwich](https://www.dioceseofnorwich.org/resource/the-big-conversation/), [Premier project page](https://www.premier.org.uk/Projects/The-Big-Conversation-Live-Debate), [Pinker vs Spencer](https://premierunbelievable.com/unbelievable/steven-pinker-vs-nick-spencer-have-science-reason-and-humanism-replaced-faith/11877.article), [TheTVDB](https://www.thetvdb.com/series/the-big-conversation/episodes/7367755): seasons of six, Templeton partnership, live audience and separate Q&A video, the Pinker episode.

### Alpha
- [Alpha Team Guide (PDF)](https://app.alpha.org/ca/wp-content/uploads/2019/06/Alpha_Team_Guide-3.pdf) and [Alpha Canada 2020 guide (PDF)](https://run.alphacanada.org/wp-content/uploads/sites/2/2016/12/AlphaTeamGuideFeb2020.pdf): food, talk, discussion; the three keys; listen, not win; group size; fixed finish.
- [Alpha Canada: Seven Best Practices](https://alphacanada.org/what-are-the-seven-best-practices-of-alpha/): exists.
- [St Monica Parish](https://stmonicaparish.ca/resources/what-is-alpha-how-does-it-work) and church registration pages: "no pressure, no follow up, no charge."
- [Equip: Evaluating Alpha](https://www.equip.org/articles/alpha-course-evaluating-alpha/): Gumbel's account of questions answered courteously and no one chasing.
- [Routledge: The Alpha Enterprise](https://www.routledge.com/products/9780754650355), [Prophecy Today review](https://www.prophecytoday.uk/study/resources/item/2651-review-repackaging-christianity.html), [Psephizo](https://www.psephizo.com/?p=14433), [Christian Science Monitor, 1999](https://csmonitor.com/1999/0715/p15s1.html): Hunt's study and its figures (through a review), the Holy Spirit weekend controversy, "too charismatic."

### Christianity Explored
- [Course page](https://www.christianityexplored.org/course-ce), [Getting Started](https://www.christianityexplored.org/Groups/275669/Getting_Started/Getting_Started_CE/Getting_Started_CE.aspx), [The Good Book Company](https://thegoodbook.co.uk/ce), [handbook listing](https://media.standaardboekhandel.be/p/christianity-explored-handbook-9781784980771), [St Andrew's](https://www.standrewschurch.org.uk/groups/christianity-explored): seven sessions in Mark, session names and passages, handbook with Mark's text, films and training podcast, one-to-one use.

### Redeemer's Questioning Christianity and Keller
- [Gospel in Life series](https://gospelinlife.com/series/questioning-christianity) and [archive](https://archived.gospelinlife.com/downloads/questioning-christianity/): the series as sold.
- [byFaith](https://byfaithonline.com/?p=17716): seven weeks, talk and Q&A then reception; the livestream format with artists, 30 and 30 minutes, staff facilitator; bring a friend.
- [Salvo review](https://salvomag.com/article/salvo41/come-believe): Redeemer's weekly sessions for non-Christians; the preface quotation.
- [Christianity Today review](https://christianitytoday.com/?p=92914): "the contemptuous no of unbelief."

### Rebecca McLaughlin
- [Publishers Weekly](https://publishersweekly.com/9781433564239), [Solas review](https://www.solas-cpc.org/book-confronting-christianity-by-rebecca-mclaughlin/), [Redeemed Reader](https://redeemedreader.com/12-hard-questions-for-the-worlds-largest-religion/), [author page](https://rebeccamclaughlin.org/confronting-christianity): the twelve questions; chapters open with an illustration.
- [Apple Podcasts](https://podcasts.apple.com/de/podcast/introducing-confronting-christianity/id1637505896), [Metacast](https://metacast.app/podcast/confronting-christianity-with-rebecca-mclaughlin/jzVbI1UG/filter/date/after/2022-09-13T05%3A00%3A00.000Z), [Castbox](https://castbox.fm/channel/5025799): Training the Church; tagline; "Questions Covered in This Episode"; seasons and length.

### Cold-Case Christianity
- [Wikipedia: J. Warner Wallace](https://en.wikipedia.org/wiki/J._Warner_Wallace) and [David C Cook](https://shop.davidccook.org/products/cold-case-christianity-j-warner-wallace): background, ten principles, cumulative case.
- [Abductive reasoning video page](https://coldcasechristianity.com/videos/why-abductive-reasoning-is-the-best-way-to-investigate-the-resurrection-video/): the method.
- [Goodreads reader notes](https://www.goodreads.com/notes/128652911-cold-case-christianity-updated-expanded-edition/77119184-dewayne-ruggles?page=8): "Test Your Witnesses," "four critical areas," critics as wanting testimony "tossed out."
- [Cold-Case Christianity for Kids page](https://coldcasechristianity.com/cold-case-christianity-for-kids-by-j-warner-and-susie-wallace/), [Biola store](https://apologetics-store.biola.edu/products/cold-case-christianity-for-kids-investigate-jesus-with-a-real-detective), [Faithlife](https://ebooks.faithlife.com/products/128079/cold-case-christianity-for-kids), [Sean McDowell interview](https://seanmcdowell.org/blog/a-cold-case-detective-writes-an-apologetics-book-for-kids-interview-with-j-warner-wallace): same chapter sequence; case notes; Academy Notebook; Certificate of Merit; Cadet Academy.

### Got Questions
- [Apply page](https://www.gotquestions.org/apply.html): the writing and review chain.
- [MinistryWatch](https://ministrywatch.com/got-questions-reaches-13-million-monthly-visitors-with-biblical-answers/): 13 million monthly visitors; about 700,000 questions.
- [Why doesn't GotQuestions.org always provide alternate viewpoints?](https://gotquestions.blog/different-interpretations.html), [Is GotQuestions.org Reformed?](https://gotquestions.blog/gotquestions-reformed.html), [About](https://gotquestions.blog/about.html): the one-answer rationale and theological commitments.
- [learnofchrist.com review](https://learnofchrist.com/resources/got-questions): search position; weaker outside its tradition.
- [Rethinking Hell](https://rethinkinghell.com/es/tag/gotquestions-org/): a substantive critic.

### Explore God
- [Session 4: Is Christianity Too Narrow?](https://exploregod.com/videos/session-4-is-christianity-too-narrow): Pulse of the World, pause, Curiosity Collective, six questions, transcript.
- [ALCF](https://www.alcf.net/ischristianitytoonarrow) and [Moody Church](https://www.moodychurch.org/?p=20929): church reuse; related videos.
- [Richmond Free Press](https://richmondfreepress.com/news/2016/sep/30/explore-god-discussion-series-140-area-churches), [Explore God Bay Area](https://exploregod.com/explore-god-bay-area), [WY Daily](https://wydaily.com/latest/local/2018/08/27/we-had-questions-about-those-explore-god-signs-heres-what-they-are-about/), [Claude Mariottini on Chicago 2019](https://claudemariottini.com/2019/01/12/explore-god-chicago-2019/): the seven questions; origins and scale; venues; signs.

### Method benchmarks
- [The Marginalian on Rapoport's rules](https://www.themarginalian.org/2014/03/28/daniel-dennett-rapoport-rules-criticism/), [Big Think](https://bigthink.com/?p=576173), [Skeptic UK](https://www.skeptic.org.uk/2024/05/how-to-engage-with-arguments-rationally-respectfully-and-with-humility/): the four rules and Dennett's rationale.
- [LessWrong: Ideological Turing Tests](https://lesswrong.com/w/ideological-turing-tests), [EA Forum](https://forum.effectivealtruism.org/topics/ideological-turing-test/history): Caplan's 2011 coinage and proposed test.
- [Wikipedia: Kialo](https://Www.Wikipedia.org/wiki/Kialo), [IU Pressbooks](https://iu.pressbooks.pub/resourceconveniencestore/chapter/kialo-external/), [AVID](https://www.avid.org/digital-tools/Kialo-Edu), [Humane Tech forum critique](https://community.humanetech.com/t/improving-online-discourse-encourage-critical-thinking-with-argument-maps/4891): tree structure, classroom controls, the context-loss critique.
- `design-src/ncase_trust/words.html` (code read): the conclusion's stated limits and footnotes link.

### Critiques and the RZIM case
- [Christian Post: Top 5 Problems With Contemporary Christian Apologetics (Rauser)](https://www.christianpost.com/voices/top-5-problems-with-contemporary-christian-apologetics.html): debate culture; audience neglect.
- [Stephen Bedard](https://www.stephenjbedard.com/dangerous-fallacies-commonly-used-by-christian-apologists/): straw men to reassure believers.
- [Credo House](https://credohouse.org/blog/how-not-to-debate-a-christian-apologist): Stenger's view, through a rebuttal.
- [Claims Journal/AP](https://www.claimsjournal.com/news/national/2021/01/05/301283.htm), [Baptist Press](https://www.baptistpress.com/resource-library/news/zacharias-ministry-roiled-by-sexual-misconduct-scandal/), [Premier Christianity: The fall of Ravi Zacharias](https://www.premierchristianity.com/the-fall-of-ravi-zacharias/3918.article), [ChurchLeaders](https://churchleaders.com/?p=438369): the investigation, its findings, the fallout, the accountability verdict, the board letter.

### LiveWell files read
- `client/src/data/answers.ts` and `client/src/pages/Answers.tsx`: 35 questions, the three-paragraph shape, one page with anchors and FAQPage JSON-LD.
- `client/src/data/argumentCases.ts` and `client/src/pages/tools/TestTheCase.tsx`: nine published cases, objections, `grants`, the no-chase intro, device progress.
- `client/src/lib/skepticTrack.ts` and `client/src/pages/SkepticTrack.tsx`: seven stops; the lead magnet and newsletter on the page.
- `docs/work/plan/benchmark.md`, `docs/work/plan/MASTER-PLAN.md` sections 0 to 3, and `docs/work/design/research/B-post-christian-thought.md` (to avoid repeating its CPX, Veritas, objection-field, corrections, and evidence-file patterns).
