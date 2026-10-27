# B. Post-Christian thought: how serious Christian publications organize, argue, and keep their readers

Research for the LiveWell redesign, cluster B ("post-christian-thought"),
prepared 2026-10-27. James's brief asks for "the most organized, well-designed
website that helps people ... to understand what a post-Christian world is in
America, and how to live it ... very critical of what currently is, with a
fresh vision ... a useful tool for people to study and learn and grow." This
file looks at the publications that already do long-form Christian thought
about culture well, and at two secular benchmarks, and asks one question of
each: how does it organize essays into something a reader can find, finish,
argue with, and come back to, without cheapening what it publishes?

It goes beyond `docs/work/plan/benchmark.md`, which gave *Plough* and *Mere
Orthodoxy* one paragraph (themed issues, a keepable print issue) and treated
Christianity Today and the Keller Center only as evidence of demand. It
assumes `MASTER-PLAN.md` sections 0 to 3 and 6 (the shelf redone, the essay
page with questions, sources, "Next in this section," "Related," "Take it with
you," and "Write to James"; the topics index; the church history course; the
integrity rules) and proposes only what that plan does not already hold, or a
sharper form of something it parks.

**Method and limits.** Direct page fetches fail in this sandbox (checked again
today: `www.plough.com` and `www.afterbabel.com` were both refused by the
egress proxy). None of the products in this cluster is open source, so unlike
cluster A there was no code to read. The evidence is of two kinds and each
claim below says which: **(own words)** the product's own pages, help text,
product listings, editor's notes, and event pages, as they reached me through
search results; **(secondary)** press, reviews, church pages that reuse a
product, and reference works. 44 web searches were used. No live page was
seen, so nothing here describes a screen layout that was not described in
words somewhere. Where I infer, I say so. Unknowns are listed in section 4.

**What LiveWell already has, so the patterns are calibrated.** The essay shelf
(`client/src/lib/shelf.json`) has eight sections (The Mirror; Faith and Power;
After Christendom; The American Church; The Ancient Church; Reading the Bible
in Its World; Doubt and Hard Questions; Marriage, Family and Ordinary
Faithfulness), a three-essay *Start with these* list, and 58 essays, of which
15 are live and 43 pending rewrite. The plan gives each essay discussion
questions, a group guide, sources, series order, hand-picked related links,
an honest revised date, and a "Write to James" link (MASTER-PLAN 6.2). The
site also has 68 group study guides, the Honest Answers, a Skeptic's Track, the
topics index (U25), Find Help's care pages, a Substack newsletter, and the
church history course in planning. What it does not yet have is what the best
publications in this field share: **a shape in time** (an issue, a season, a
dated read-along) that gives a reader a reason to return that is not a feed;
**the primary text set beside the essay**; **gatherings that readers run
themselves**; and **visible machinery of honesty** (the objection quoted in its
defender's words, the correction logged in public, the evidence on both sides
kept open).

---

## 0. The short verdict

The best long-form Christian publications do not compete with the feed. They
replace it with **a shape in time.** *Plough* and *Comment* each organize a
quarter around one theme; *Mere Orthodoxy* sends members a print journal three
times a year; *Breaking Ground* gathered a whole year's crisis into a web
commons and then a book; the Keller Center runs eight Wednesday evenings and
then stops. A reader always knows what this season's question is, when it
began, and that it will end. That is the opposite of the infinite scroll, and
it is the single most stealable idea in this cluster.

The second idea is **the primary text, introduced.** The Trinity Forum's whole
business is a short classic (King's letter, Sayers, Tocqueville, Augustine)
with an introduction by a living writer and questions for a group, sold singly
or in collections such as a "Prisoner's Collection." It turns the church's
long memory into something a reader can hold in one sitting and a group can
discuss in one evening. LiveWell is already gathering primary sources for the
history course; it can publish them this way, free.

The third is **gatherings that readers run themselves.** *Comment* invites
readers to host a supper for a small table around each issue and supplies the
prompts (and, charmingly, a recipe and a playlist); a Lutheran church reuses
the kit. *First Things* readers form independent circles that read one article
a month. Neither publication has to staff an event. Both turn readers into
hosts, which is the deepest kind of return a publication can earn, and it is
exactly the PCN pastor's channel.

The fourth is **visible honesty.** The strongest secular benchmark, Jonathan
Haidt's After Babel, says its purpose was "to elicit objections and alternate
theories," publishes posts that test rival explanations one at a time, keeps
public review documents with evidence on both sides and invites critics to add
to them, and maintains a page titled "Errors in The Anxious Generation" that
the book itself points readers to. The Veritas Forum puts a Christian and a
non-Christian scholar on one stage with a neutral moderator. Psyche date-stamps
its practical guides and reviews them. LiveWell's integrity rules already
demand this honesty in private (claims ledgers, steelmans, the
both-directions check). The patterns below make it visible to the skeptic, who
is the reader most likely to check.

What is weak across the field is equally clear: metered paywalls and "one free
article a month" (First Things, Image), membership urgency ("become a member
before January 10"), crowds of writers diluting a voice, daily cadences that
become filler, certificates for formation, and public comment threads. None of
those fits "Unhurried. Weighted. Grown-up."

---

## 1. The products

Each entry: who it serves; how it is organized; its signature features and
what the reader actually does; visual and typographic choices where any were
described; how it holds attention and builds a habit; what is excellent and
stealable; what is weak.

### 1.1 The Trinity Forum (ttf.org): Readings, Conversations, Reading Groups

**Who it serves.** Thoughtful Christian professionals and leaders,
historically in Washington, D.C., and now online; reading groups and book
clubs; people who want "the best of the Christian intellectual tradition"
(the podcast's own description) without a seminary.

**How it is organized.** Three products carry the site **(own words)**:
*Trinity Forum Readings*, short classic and contemporary texts "introduced by
today's experts, and tailored for individual reflection and group discussion";
*Conversations* (in-person Evening Conversations, Online Conversations, and a
podcast drawn from them); and *Reading Groups*, including a quarterly
*Bookclub Box*.

**Signature features and interactions.**
- **The Reading.** A single primary text with an introduction by a living
  writer, followed by discussion questions. King's *Letter from Birmingham
  Jail* is sold with introductions by Robert M. Franklin and Andrew Young;
  Sayers's *Creed or Chaos* with an introduction by David W. Miller **(own
  words, product pages)**. Readings are "relatively brief," and the format is
  "flexible, so that a curriculum may be covered over a period of time or in
  one or two sittings" **(own words)**. The reader buys a digital download
  ($5 to $10) or a print copy.
- **Collections.** Readings are bundled by theme across centuries: the
  *Freedom & Justice Collection* (King with a reading on Mandela and others),
  the *Faithful Citizenship Collection* (King with *Democracy in America* and
  *City of God*), and the *Prisoner's Collection* (works written in prison,
  including Bonhoeffer's) **(own words, product pages)**. The collection is a
  reading path made of primary sources.
- **The moderator's rule.** A guide to leading a Trinity Forum discussion says
  the moderator may briefly introduce each reading but "should lead as
  inductively as possible. He or she draws the answers out of the group, and
  avoids lecturing" **(secondary, a church's leader guide)**.
- **Bookclub Box.** A new theme each quarter, with a host guide and a
  discussion guide **(own words)**.
- **Online Conversations.** A host (Cherie Harder, the president) interviews a
  guest, usually about a book. The event page carries the date and a short
  description; afterward the podcast publishes "an edited version," and the
  full conversation "with video and transcript" is linked. Podcast pages end
  with "Trinity Forum Readings that are pertinent to this discussion" **(own
  words)**. Evening Conversations are posted as full unedited videos tagged by
  speaker, topic, date, and city **(own words)**.

**Visual and type.** Not described in anything I could reach.

**Attention and habit.** The quarter (a new Box each quarter), the scheduled
conversation with a date, and the group. Nothing daily. Every conversation
hands the listener to a Reading, so each format sells the slower one.

**Excellent and stealable.** The primary text with a contemporary
introduction is the best format in this cluster for LiveWell's audience:
it gives the skeptic the source, the doubter the church's own voice, and the
pastor a one-evening study. Collections across centuries are a reading path
with real authority. Transcript plus related readings makes a conversation
studyable.

**Weak.** Readings are paid and, as far as I could see, sold as downloads
rather than read on the page; the archive is organized as a shop. The
audience skews toward elites and Washington.

### 1.2 *Comment* (Cardus)

**Who it serves.** Christians who work in and lead institutions (schools,
businesses, public life), mostly in North America; Reformed and neo-Calvinist
in its roots; published by Cardus, which calls itself a non-partisan think
tank on how institutions work together for the common good **(own words)**.

**How it is organized.** Print issues, each "a crafted feature of narrative,
argument, conversation, and art" (the issues archive, **own words**); the home
page leads with the current issue (Vol. 44, No. 3, *The Paradoxes of Control*,
at the time cached). Audio series (*The Understory*, *Conversing*, *The
Sacred*, *Zealots at the Gate*) sit under podcasts; a **Gather** menu holds
*Comment Suppers* and *The Understory* **(own words, as summarized by search)**.
Themed issues are long-standing: the Fall 2012 issue, guest-edited by Peter
Leithart, was on "Word of God in the City of Man" **(secondary)**.

**Signature features and interactions.**
- **Comment Suppers.** The reader is invited to host a meal for a small group
  "around the theme of the latest issue." It can be "a supper club, a
  workplace discussion series, or a one-table conversation at home or in a
  restaurant." The page gives a hosting checklist (planning, invitations,
  menu, prompts), and each supper comes with discussion prompts, a recipe, and
  a playlist **(own words)**. The page gives the table as four to eight guests
  in one place and six to ten in another. A Lutheran congregation's page says
  every print issue includes **a bookmark** with starter ideas for a meal and
  conversation, and shows its own kit for the Fall 2024 issue (on Advent,
  apocalypse, and hope): two suggested articles and discussion questions
  **(secondary)**.
- **Subscriptions as invitations.** $24 a year buys four print issues and
  online access; paid subscribers are invited to in-person *Comment* events
  and get bonus podcast content; donor tiers add updates from the editor, Anne
  Snyder **(own words)**.
- **Art as argument.** The publisher, Ray Pennings, wrote that each issue the
  team asks how cover art can be "more than wrapping paper for the
  conversation inside," and that cover artists are paid the same as authors
  **(own words)**.

**Visual and type.** Beyond the cover-art policy, not described in anything I
reached.

**Attention and habit.** The quarter; the supper, which makes a reader a host;
the printed bookmark that travels into a church. No daily product was found.

**Excellent and stealable.** The supper kit is the finest habit mechanism in
this cluster precisely because it is not a mechanism: it asks a reader to cook
for six people and talk about one theme. It turns an issue into an evening and
a reader into a host, and churches reuse it. The "Gather" menu as a named
place for in-person life is a clear piece of information design.

**Weak.** Four podcast series with opaque names (*The Understory*, *Zealots at
the Gate*) suggest a publication that has grown more channels than a reader
can tell apart. The core sits behind a subscription.

### 1.3 *Plough Quarterly* and Plough Publishing

**Who it serves.** Readers drawn to Christian community, peace, and social
witness; published by the Bruderhof, from Walden, New York, with branches in
the UK and Australia **(own words)**.

**How it is organized.** Plough describes itself as a publishing house
producing books, "the quarterly long-form magazine *Plough Quarterly*," and "a
daily online journal of articles, essays, prayers, and poetry," free to read,
including a *Daily Prayer* feature and the *Daily Dig* devotional reflection.
"Each *Plough Quarterly* issue is organized around a theme" (peacemaking,
capitalism, the environment, simple living are among the examples) **(own
words, the site's `llms.txt` as summarized by search)**. Articles live under
topic paths (for example `/en/topics/culture/art/...`).

**Signature features and interactions.** The themed issue that mixes long
essays with poetry and art (benchmark.md covered this); a daily free layer
beside a slow paid layer; email subscriptions that the publisher keeps sending
and uses to introduce the magazine and books **(own words, a survey-response
page)**.

**Visual and type.** The magazine is full color and ad-free **(own words,
subscription pages)**. Its designer, Rosalind Stevenson, lives at the Fox Hill
Bruderhof; covers are commissioned from named artists (Paweł Kuczyński for one
summer issue) and the publication writes about its covers ("Covering the
Cover") **(own words)**. No web typography was described.

**Attention and habit.** Two rhythms at once: a daily free reflection and a
quarterly themed issue.

**Excellent and stealable.** The theme as an editorial discipline; writing
about why a cover image was chosen; a free daily layer that feeds a paid slow
one.

**Weak.** A daily cadence needs a staff and a community of writers; for one
pastor it would become filler. I could not confirm whether the *Daily Dig*
arrives by email or only on the site.

### 1.4 *Mere Orthodoxy*

**Who it serves.** Protestants who want "serious Protestant thought"; founded
in 2005 as a blog by recent graduates of Biola's Torrey Honors Institute; edited
by Jake Meador **(own words)**.

**How it is organized.** Essays and book reviews on the site; a print journal
launched with the Fall 2021 issue; the *Mere Fidelity* podcast; transcripts and
event posts appear as site sections **(own words, as surfaced by search)**.
Issue 2 was introduced as an issue "on Nations and Nationalism" **(own words)**.

**Signature features and interactions.**
- **Membership.** Members get the journal three times a year; one page counts
  "over 1,100 members"; the site says 66% of its revenue comes from donors and
  calls itself "a reader-supported ministry" **(own words)**. A banner offered
  the winter journal to anyone who became a member before January 10 **(own
  words)**.
- **Free first, paywall later.** Meador's letter introducing the first print
  issue released its contents free on the web "to maximize our reach in these
  early days," with a paywall promised later **(own words)**.
- **A podcast of disagreement among friends.** *Mere Fidelity* is hosted by a
  rotating set of theologians (Derek Rishmawy, Alastair Roberts, Andrew Wilson,
  Brad East, James Wood, Joseph Minich) and often takes one book or one text
  per episode: Augustine's *Confessions*, Book 3; Halbertal's *On Sacrifice*;
  Yuval Levin with his own book **(own words, episode pages)**.
- **The editor's personal letter.** Meador revived a personal newsletter "for
  friends of Mere O to get personal updates from me about my work and what's
  going on" **(own words, Buttondown)**.

**Visual and type.** A 2021 post said the website was being redesigned "to
better serve the needs of a mixed-media project" **(own words)**; the result
was not described.

**Attention and habit.** The print issue three times a year as a gift to
members; the podcast weekly; the editor's letter.

**Excellent and stealable.** Three issues a year is a cadence a small team can
keep. A podcast episode built on one classic text pairs well with the Trinity
Forum's Readings. The editor's personal letter is a better newsletter than a
digest.

**Weak.** Membership deadlines and member counts are urgency and social proof;
the house is a team of writers, not one voice; the reader has to know the
names to find a series.

### 1.5 *First Things*

**Who it serves.** Religious conservatives, Catholic and Protestant, who read
long argument about religion and public life.

**How it is organized.** A monthly magazine with an archive and web pieces.
The access model **(own words, an editor's note)**: at least three articles a
month free, issues older than a year free, single articles $1.99, and a
subscription for the rest (then $19.95 a year). Some articles can be heard on
the site; the app is a separate subscription **(own words, help page)**.

**Signature features and interactions.**
- **ROFTers ("Readers Of First Things").** Independent, self-organized local
  discussion circles; "it is up to the convener to determine where and how
  often the group meets"; growth "entirely organic"; an older post counted
  groups in thirty-some states, Canada, Spain, and the UK. The site keeps a
  directory with status labels such as "Active" and "Trying to Form," and
  starting or listing a group goes through an email address and a named staff
  member **(own words)**. A Rochester parish's group meets on the third Monday
  of the month and "selects one article per month to read and discuss" **(own
  words of the parish)**.

**Visual and type.** Not described.

**Attention and habit.** The monthly issue, the metered wall, and the reading
circle. The circle is the part that runs without the publication.

**Excellent and stealable.** The circle that needs no staff: one article, one
evening a month, a convener, and a directory that says honestly which groups
are only "trying to form." The rule that the older archive is free.

**Weak.** The meter ("three free articles") makes the reader count; the
publication's own frame is one wing of American Christianity, and nothing I saw
suggests it states the other side in its own words.

### 1.6 Christianity Today (and *The Behemoth*)

**Who it serves.** American evangelicals broadly: news, theology, church life,
pastors.

**How it is organized.** A news site plus a print magazine. The 2012 website
relaunch brought "a simpler layout, subscriber-only content, and
minute-to-minute news updates" **(secondary, Adweek)**; the content system was
later moved to WordPress VIP **(secondary, the developer's portfolio)**. The
magazine was redesigned in 2013 by Metaleap Creative with wider margins, new
typefaces (Periódico Text), restructured sections, a simpler palette, and a
truncated "CT" logo **(own words, CT media room; CT's design history)**. A
July/August 2024 article, "CT Design, Redesign, and Re-redesign, from 1956 to
Today," announced "a whole new look" and an updated logo and traced every
redesign since the first (Harvey Gabor, 1963) **(own words)**. Who designed the
2024 look, and with what type, did not reach me.

**Signature features and interactions.**
- **Writing about its own design.** The 2024 design history is itself a
  reader-facing piece: a publication explaining to its readers why it looks
  the way it does. **(own words)**
- ***The Behemoth* (2014 to about 2016).** A small, ad-free digital magazine,
  every two weeks (26 issues a year), on an iPad app or a responsive site,
  named for the beast in Job that makes Job stop questioning and marvel. Its
  editor Ted Olsen wrote that the aim was to "behold" rather than "exhort,
  scold, theorize, or pontificate, but simply marvel." The first issue carried
  the physics of baseball, the martyrdom of Thomas Cranmer, and musings from
  Karl Barth. Its designer, Jennifer McGuire, stressed responsive design and
  the central role of imagery. It ran as a side project for about a year and a
  half, later with Templeton Foundation funding, and its archive now speaks of
  it in the past tense **(own words, CT's announcements and editor's notes)**.
- *The Rise and Fall of Mars Hill* (in benchmark.md) showed the audience for an
  honest account of the church's failure.

**Visual and type.** 2013: Periódico Text, wider margins, simpler palette.
2024: new look and logo, details unseen.

**Attention and habit.** News cadence, newsletters, podcasts. *The Behemoth*
was the counterexample: a slow, ad-free issue of wonder.

**Excellent and stealable.** *The Behemoth*'s editorial stance (behold, do not
scold) as a counterweight to diagnosis; a design history written for readers.

**Weak.** The news cadence is built for a newsroom, not for one writer; a
paywall on core material. Recent press about layoffs and leadership changes at
CT reached me only as headlines and is not used here.

### 1.7 The Keller Center for Cultural Apologetics (The Gospel Coalition)

**Who it serves.** "Parents, pastors, and professors" who want to share the
gospel in "the modern world"; launched in February 2023, led by Collin Hansen,
with 26 inaugural fellows and six more announced to begin in 2026 **(own
words)**. CT's headline at launch: "TGC's Keller Center Is for Apologists
Without All the Answers" **(secondary)**.

**How it is organized.** A section of TGC's site with articles by fellows, an
FAQ, cohorts, podcasts and video (including short-form platforms). The FAQ
lists "cohorts, essays, books, conferences, courses, podcasts, lectures, and
more," and the newsletter is how readers hear "when our fellows publish an
essay or release a new podcast" **(own words)**. The edited volume *The Gospel
After Christendom* defines the project.

**Signature features and interactions.**
- **The cohort.** One cohort page: eight weekly sessions, Wednesdays, 8:30 to
  10 p.m. Eastern, August 27 to October 15, 2025, $299. All sessions are
  recorded and "available for streaming or download at your leisure in
  perpetuity." Registration with books closes before registration without
  books **(own words)**.
- **The church edition.** A PDF, "Ideas on How to Use TKC Cohorts," tells a
  church it can attend live as a staff or small group, let people join from
  their own screens, or work asynchronously; church and group discounts by
  email **(own words)**.
- **A certificate** for four cohorts, "the equivalent of one year" **(own
  words)**.

**Visual and type.** Not described.

**Attention and habit.** The dated cohort with a fixed evening; recordings for
those who miss it; a church edition that makes the pastor the distributor.

**Excellent and stealable.** The cohort's shape (a start date, a weekly
evening, a finite number of sessions, recordings, a church-use guide) is
exactly right for the church history course. The honest label in CT's
headline, apologists "without all the answers," is the right posture.

**Weak.** A fee and a certificate for formation; many fellows, many voices;
apologetics framed (in the Center's own mission) as sharing the gospel "as the
only hope," which is right as confession but leaves little room, in what I
saw, for stating the objector's case in his own words.

### 1.8 Gospel in Life (Timothy Keller's sermon archive)

**Who it serves.** Anyone who wants Keller's preaching; churches and small
groups using his studies.

**How it is organized.** The full sermon archive went free in 2023, on the
site, the podcast, and YouTube, with a monthly newsletter; the ministry began in
1989 as a cassette ministry at Redeemer and in 2023 moved to Redeemer City to
City **(own words, the About page)**. Topic pages (Salvation, The Bible,
Cities, Understanding the Gospel, Jesus' Death and Resurrection, Christian
Living and Obedience) list sermons, each with its **series name, Scripture
reference, and date**, for example a sermon on Ephesians 2:1-10 of October 30,
2011, in the series *A Study of Ephesians: Who Is the Church?* Topic pages are
paginated **(own words, topic pages as summarized by search)**.

**Signature features and interactions.** Browse by topic, by series, by
Scripture; the paid eight-session *Gospel in Life* study (City to Eternity,
with Work, Justice, and Community between) with a video sold separately
**(secondary, retailer listings)**.

**Attention and habit.** A free archive, a podcast feed, a monthly newsletter.

**Excellent and stealable.** Every item carries series, Scripture, and date,
so the archive can be read three ways. Making the whole archive free was the
decisive move.

**Weak.** Paginated topic lists are a weak way into a thirty-year archive; the
studies are paid and video-bound.

### 1.9 *Public Discourse* (Witherspoon Institute)

**Who it serves.** Readers of natural-law and religious-conservative argument
on marriage, life, religious liberty, and economics.

**How it is organized.** The online publication of the Witherspoon Institute in
Princeton, founded in 2008 by Ryan T. Anderson **(secondary)**; at launch "an
interesting hybrid of the blog and journal formats" running short essays by
scholars and essay-length abstracts of their scholarly articles **(secondary,
First Things)**; it describes itself as "neither a journal nor a blog" **(own
words)**.

**Signature features and interactions.** The monthly newsletter *From the
Editor's Desk*: a reflection from the editor, essays brought back from the
archive, links to what the editors were reading elsewhere ("not necessarily
endorsements"), and events at the bottom; a later edition grouped a "long
read," a bookshelf column, and "other essays of note" **(own words)**.

**Excellent and stealable.** The newsletter as an editor's letter with fixed
parts, including the archive brought back and outside reading marked plainly as
"not necessarily endorsements." The scholarly abstract rewritten for a general
reader.

**Weak.** One school of thought; I found no standing format for publishing the
opposing view in its own words.

### 1.10 *Image* (journal of art, faith, mystery)

**Who it serves.** Writers, artists, and readers of literary work "informed
by, or grappling with, religious faith"; founded in 1989; quarterly **(own
words; secondary)**.

**How it is organized.** The quarterly journal; *Good Letters*, a blog whose
posts sit outside the paywall and are marked with a diamond; *ImageUpdate*, a
free weekly newsletter ("compelling new books, music, artwork," personal
recommendations, links); *Artist of the Month*; the Glen Workshop, a week each
summer that began in 1995 as "a workshop, an arts festival, and a spiritual
retreat," each year around a theme **(own words; dates of these pages run
2012 to 2017)**. Non-subscribers can read one archive article a month per
device **(own words)**. A recurring post asks the contributors to the current
issue what they have been reading, watching, and hearing **(own words)**.

**Excellent and stealable.** A visual mark that tells the reader what is free
(the diamond). Contributors' reading recommendations as a gift to readers. An
annual gathering with a theme.

**Weak.** A one-article meter counted per device; several overlapping channels.

### 1.11 *Breaking Ground* (2020 to 2021)

**What it was.** A web commons begun by *Comment* in spring 2020 in response
to the pandemic and that year's racial crisis; *Plough* joined, and seventeen
other institutions took part. Its essays (summer 2020 to spring 2021) mixed
reportage, conversation, and theology; contributors included N. T. Wright,
Oliver O'Donovan, Mark Noll, Marilynne Robinson, and Jake Meador. It ended
and became a book, *Breaking Ground: Charting Our Future in a Pandemic Year*
(Plough, January 2022), edited by Anne Snyder and Susannah Black **(secondary,
book listings and Foreword Reviews)**.

**Excellent and stealable.** A project with a declared beginning, a question,
and an end; the end became a keepable book. It is the clearest model in this
cluster for a season that becomes an archive.

**Weak.** I could not see the site, so its reading experience is unknown.

### 1.12 Centre for Public Christianity (CPX, Australia)

**Who it serves.** The general public, including sceptics; "no denominational
affiliation" and a commitment to "historic Christianity as defined by the
Nicene Creed"; founded 2007 **(secondary, Wikipedia)**. It keeps an online
library of interviews with writers, scholars, and commentators and releases a
weekly *Life & Faith* podcast (the latter flagged "citation needed")
**(secondary)**.

**Signature feature.** ***For the Love of God*** (released May 2018), a
documentary on Christianity's impact on the world "both good and bad,"
presented by Simon Smart, John Dickson, and Justine Toh; it reached about 150
cinemas and nearly 17,500 tickets before broadcast on ABC's *Compass*, and was
marketed as "a rigorous and engaging response, for sceptics and believers
alike." It treats the Crusades and inquisitions alongside the roots of human
rights and charity. A follow-on course, *For the Love of God: The Course*,
has four 90-minute sessions with themed videos, and there were high-school
resources **(secondary, press and reviews)**. Natasha Moore's book of the same
name carries the subtitle "how the church is better and worse than you ever
imagined" **(secondary, podcast listing)**. Reviews were mixed: praised for not
holding back on "some of the worst that the church has had a hand in," faulted
for not answering every question **(secondary)**.

**Excellent and stealable.** Opening to the sceptic with the church's failures
named first, then the counter-witness; one long work turned into a four-session
course for mixed groups.

**Weak.** Its video library and podcast could not be seen in any detail.

### 1.13 After Babel and AnxiousGeneration.com (secular benchmark)

**Who it serves.** Parents, educators, and policymakers following Jonathan
Haidt's work on social media, childhood, and democracy.

**How it is organized.** A Substack (After Babel) for new research and argument,
beside a book site (AnxiousGeneration.com) that holds the research apparatus.

**Signature features and interactions.**
- **A publication built to be argued with.** Haidt: "My goal in starting the
  After Babel substack was to elicit objections and alternate theories"; the
  post that tweet introduced, by Jean Twenge, tested the rival theory that
  rising academic pressure caused the teen mental-health crisis **(own
  words)**. Another post asks, "Is Economic Deprivation the Real Cause of The
  Adolescent Mental Health Crisis?" **(own words)**. Each rival explanation
  gets its own post.
- **Open review documents.** Haidt, Twenge, and Zach Rausch keep "an ongoing
  open-source literature review" that collects studies on each side of each
  question; Haidt describes inviting "critics to add comments and studies"
  **(own words; secondary)**. The book site lists these "collaborative review"
  documents for readers who want the literature **(own words)**.
- **Errors in public.** AnxiousGeneration.com has a page titled "Errors in The
  Anxious Generation" (dated June 8, 2024); the book tells readers to consult
  the online supplement, "where I will do my best to correct any errors I have
  made" **(own words; the book's line quoted by a reader)**. The supplement is
  organized by chapter and holds figures and text cut from the printed book
  **(own words)**.
- **An expert survey post** reporting how many researchers share the concern
  **(own words)**.

**What critics say, which matters for anyone copying this.** Candice Odgers's
*Nature* review argued that the evidence shows "a mix of no, small and mixed
associations"; Andrew Przybylski called the method "vote counting"; Chris
Ferguson's meta-analysis found no average effect in experiments; a critic
called the review's study counts "fuzzy" **(secondary)**.

**Excellent and stealable.** Objections invited by design; rival explanations
tested in the open; an errata page the book itself points to; the evidence
kept in a document anyone can read.

**Weak.** Counting studies on each side invites the "vote counting" charge; the
documents live in Google Docs, outside the publication's own pages.

### 1.14 Added: The Veritas Forum

**Who it serves.** University students and faculty, believers and not;
founded at Harvard in 1992; now books (with InterVarsity Press), podcasts, and
online video **(secondary)**.

**Format.** Christian student groups host; "a common pattern is two speakers
presenting, one from each side, followed by a moderated Q&A." At one Bowdoin
event a secular and a Christian presenter each had fifteen minutes and a
faculty member moderated the questions; at Penn in November 2025 a law and
history professor moderated and the speakers took audience questions **(own
words; secondary, campus papers)**. Veritas calls itself a place where
Christian faith is put "in dialogue with other beliefs" and participants "seek
truth together" **(own words)**.

**Excellent and stealable.** Dialogue, not debate: equal time, a moderator who
is neither speaker, and the audience's questions. The skeptic is a speaker,
not a target.

**Weak.** Event-bound; the archive of recordings is large and hard to enter
(not seen).

### 1.15 Added: Psyche Guides (Aeon; secular benchmark for the practical door)

**Who it serves.** General readers looking for practical help grounded in
psychology and philosophy.

**Format.** Guides are "longer pieces, roughly 3,000 to 4,000 words" following
"our signature, how-to structure to provide in-depth, expert-written, practical
know-how"; shorter *Ideas* run 1,000 to 1,800 words **(own words, pitch page)**.
Guides "follow a set format" meant to be "of lasting help to non-experts"
**(secondary, an author's organization)**. They are "date-stamped and routinely
reviewed and updated where necessary," and the site has a page answering "Are
Psyche Guides reliable?" **(own words)**. Each guide opens with numbered **Key
points** and ends with **Links and books**; a "Need to know" section is
referred to inside guides **(own words, guide pages as summarized by search)**.

**Excellent and stealable.** A fixed, visible shape for practical writing; a
review date; a page that explains why the reader can trust the format.

**Weak for LiveWell.** The numbered key-points box is the "clean application
turn" CLAUDE.md's formation standard refuses. Take the shape and the review
date, not the takeaway list.

---

## 2. The patterns, ranked

Ranked by what each would do for LiveWell's four readers against what it
costs. **Fit:** *core* (serves the mission directly and the plan has nothing
like it), *strong* (clear value, some overlap or dependency), *maybe* (worth
doing if there is room). **Effort:** S (a page or field and a validator,
within a week), M (a page type with data, a builder, a validator, and content
work), L (a new system or recurring editorial labor). Every pattern obeys
MASTER-PLAN section 2: tokens only, state in the URL or on the device, no
accounts, no statistics unchecked, no first person supplied for James, and one
thing retired for each thing added.

### 1. Readings: a primary text, introduced, with questions, in collections

**Seen in:** the Trinity Forum (Readings, Collections, the inductive
moderator's rule); *Mere Fidelity* (episodes on one classic text).

**What it is.** A short primary text from the church's long memory, set on its
own page with an introduction by a living writer and questions for one evening
of discussion, and gathered with other texts into collections across the
centuries.

**Why it works.** It hands the reader the source rather than a summary of it,
which is what the skeptic wants and what CLAUDE.md's Scholarship Standard
requires ("primary text, or marked as a tradition's reading"). It fits one
sitting. It gives a pastor a study with no preparation. Collections make
reading paths with real authority.

**On LiveWell.** A new page type under the Study door, *Readings*
(`/study/readings` and `/study/readings/:slug`). The reader sees, in one
column: a one-line head (who, when, where: "Frederick Douglass, appendix to his
*Narrative*, 1845"); James's introduction (600 to 1,200 words, written by him:
why this text, what to watch for, where he would push back); the text itself in
a named public-domain translation with section numbers for groups; "Questions
for reflection and discussion" (five to seven, inductive, the first answerable
by anyone at the table); and "If you want more" (two to four validated links:
the history session, the Study Bible passage, the essay). The reader can print
the reading with its questions (the #534 *Take it with you* row) and can turn
section numbers on or off. Collections are short lists on `/study/readings`,
for example *When the church had no power* (the *Epistle to Diognetus*, the
*Martyrdom of Polycarp*, a passage from *City of God* in Dods's translation)
and *The church against itself* (Douglass's distinction between "the
Christianity of Christ" and slaveholding religion; John Woolman's *Journal*).
Texts come from the sources the history course is already gathering and
storing with provenance (plan unit U07), and pass the same verbatim check.
Free, unlike the Trinity Forum's. **Retires:** the history page's loose
"further reading" lists where a Reading replaces them.

**Fit:** core. **Effort:** M (page type, data, builder, validator, PDF via the
existing pipeline; then one introduction from James per Reading).

**Evidence:** TTF product pages for King's letter, *Creed or Chaos*, and the
three collections; TTF reading-groups page; the leader guide quoting the
inductive rule; *Mere Fidelity* episode pages.

### 2. The season's question: an issue in time, not a feed

**Seen in:** *Plough Quarterly* and *Comment* (one theme per issue); *Mere
Orthodoxy* (three issues a year; an issue on nations and nationalism);
*Breaking Ground* (a declared beginning, a question, an end, a book); the
Trinity Forum (a new Bookclub Box theme each quarter).

**What it is.** A publication organizes a stretch of time around one question,
gathers pieces in different forms under it, says when it began, and closes it
into an archive.

**Why it works.** It gives a reason to return that is not a feed. It lets a
small house concentrate. It makes the archive legible (each season is a
shelf). It gives groups a natural unit (the *Comment* supper is built on the
latest issue). It is honest about cadence: the reader knows nothing new is
owed until the next season.

**On LiveWell.** Three seasons a year matched to the church calendar the plan
already uses (Advent to Epiphany; Lent to Pentecost; the long ordinary season
through autumn), each with one question drawn from the shelf's own sections
("How does a church live without power?" for After Christendom; "What does the
flag ask of a Christian?" for Faith and Power). A season page
(`/writing/seasons/:slug`) holds, in this order: James's opening letter (his
words); four to six pieces in different forms, mostly ones the site already
has: one or two essays, one Reading (pattern 1), one Study Bible passage with
its context guide, one history session or witness, the family devotion strand
for that stretch, and the host's kit (pattern 6); and a closing line saying
when the season ends and what comes next. `/writing` gains a quiet line under
its title ("This season: ...") and an archive of past seasons, which
**replaces** the "Latest" list there. The newsletter (pattern 5) follows the
season. Topics stay evergreen; seasons are dated and finite, and a topic page
can link the season that treated it.

**Fit:** core. **Effort:** M (one page type, a small JSON file per season, a
validator that every linked item is live, the route checklist in 9.3; the
curation is the work, and most pieces exist).

**Evidence:** Plough `llms.txt` and subscription pages; *Comment* issues
archive and home page; *Mere Orthodoxy* journal and Issue 2 posts; *Breaking
Ground* book listings and review; TTF Bookclub Box.

### 3. The objection in the objector's own words

**Seen in:** the Veritas Forum (a Christian and a non-Christian, equal time, a
moderator who is neither); After Babel (objections invited, each rival theory
given its own post); *Mere Fidelity* (friends who disagree on air).

**What it is.** The contested position is stated by its strongest defender, in
quotation, with a source, before the writer answers, and the page shows it as
a distinct, checkable thing rather than a paraphrase buried in the argument.

**Why it works.** It is CLAUDE.md's steelman rule made visible. The skeptic can
check that the objection is real and fairly put; the doubter sees her own
question named better than a pulpit named it; the pastor can hand the page to
a mixed group without embarrassment. It also disciplines the writer: a
paraphrased objection drifts toward a straw man; a quoted one cannot.

**On LiveWell.** An optional `objections` field on essays, topic pages, and
Honest Answers: each entry is a verbatim quotation (a named thinker, a book or
article, a page or date), one sentence of context, and the place in the piece
that answers it. It renders as a quiet indented block headed *The strongest
case against*, placed where the essay itself turns, never between the reader
and the first sentence (MASTER-PLAN refuses a quiz before an essay; this is not
one). On second-order questions, a topic page gets *Where faithful Christians
disagree*: each position quoted from its own defenders, sorted by order (first,
second, third, per the Scholarship Standard), then *Where James lands, and the
objection he has not fully answered*. A validator requires a source on every
entry and runs the quotation through the same verbatim check as other
quotations; `validate-politics.mjs`'s both-directions rule applies to any
objection set on a political page. **Retires:** nothing; it is a field, and
its placement is the essay's own hinge.

**Fit:** core. **Effort:** M (field, renderer, validator; the sourcing is
editorial work, and every quotation needs a ledger line).

**Evidence:** Veritas Forum pages and campus reports; Haidt's tweet on After
Babel's purpose; the After Babel posts testing academic pressure and economic
deprivation; *Mere Fidelity* host list.

### 4. Corrections in public, and an honest date on everything

**Seen in:** AnxiousGeneration.com ("Errors in The Anxious Generation," dated;
the book sends readers there); Psyche (guides date-stamped and routinely
reviewed; a page on whether the guides are reliable).

**What it is.** A public, dated log of substantive corrections, linked from the
pieces it corrects, and a review date on every page that gives counsel.

**Why it works.** The skeptic's first test is whether a publication admits
error. A corrections page is the cheapest way to pass it, and it makes the
private claims ledgers the plan already requires visible in their effect.

**On LiveWell.** A `/corrections` page under About (and in the footer): each
entry gives the date, the piece, what it said, what it now says, and who
caught it if they agree to be named. Essays carry an optional `corrections`
array; when present, the foot shows "Corrected October 30, 2026: the date of
the Edict of Milan" beside the planned "Revised" date, linking to the log. Care
pages and topic pages show "Reviewed [date]." A short *How we check* page
(about 300 words) says what a claims ledger is and that every quotation is
checked against its source, the honest equivalent of Psyche's reliability
page. **Retires:** nothing; the log is generated from the essay data.

**Fit:** core. **Effort:** S (a field, a builder, one page, a validator that
each entry has a date and a description).

**Evidence:** AnxiousGeneration.com research page title and date; the book's
note quoted by a reader; Psyche's pitch and guide pages.

### 5. The letter: a newsletter that is a letter, with fixed parts

**Seen in:** *Public Discourse* (*From the Editor's Desk*: a reflection, the
archive brought back, outside reading "not necessarily endorsements," events);
*Comment* (donors receive updates from the editor); Jake Meador's personal
letter "for friends of Mere O"; Gospel in Life's monthly newsletter; the
Keller Center's newsletter (when a fellow publishes); *Image*'s weekly
*ImageUpdate* and its contributors' reading recommendations.

**What it is.** A monthly letter from the editor in his own voice, with a few
fixed parts the reader learns to expect.

**Why it works.** It is the one channel that reaches a reader who will not
visit, and the editor's own voice is the moat (benchmark gap 10). Fixed parts
keep it short and keep it from becoming a digest of everything new.

**On LiveWell.** James's Substack becomes *A letter from James*, monthly, plus
one on the first day of each season. Fixed parts: the letter (his writing,
never drafted for him in the first person); this season's piece; one piece
brought back from the archive with a line on why now; "What I have been
reading" (outside links, labeled "not necessarily endorsements"); and what is
new on the site. `/subscribe` says exactly that ("one letter a month, and one
when each season begins; nothing else") and shows the last three letters, so
a reader sees what he is agreeing to. No pop-up, no count of subscribers.
**Retires:** any digest-style or automated "new post" emails, if they exist.

**Fit:** core. **Effort:** S (copy on `/subscribe`, a template; the letter
itself is James's monthly labor, which is the cost to weigh).

**Evidence:** *Public Discourse* newsletter post; *Comment* subscribe page;
Meador's Buttondown archive; Gospel in Life About page; Keller Center FAQ;
*Image* pages.

### 6. Host a table: a supper kit for each season

**Seen in:** *Comment Suppers* (a meal for a small table around the latest
issue; prompts, a recipe, a playlist, a hosting checklist; a bookmark in every
print issue; a Lutheran church reusing it); the Trinity Forum's Bookclub Box
host guide and the inductive moderator's rule.

**What it is.** A one-page kit that lets any reader host a conversation for a
small table around the season's question.

**Why it works.** It turns a reader into a host, which is a deeper return than
any notification, and it costs the publication one page per season. It reaches
people the site will never reach directly: the host's neighbors, colleagues,
and skeptical friends. It is the PCN channel in its most natural form.

**On LiveWell.** Each season page, and each Reading, offers *Host a table*: a
printable page with what to read beforehand (two pieces, with minutes), a
passage to read aloud at the start, five questions (the first open to anyone,
believer or not), a closing question to take home, and a short note for the
host: how to welcome a friend who does not believe, how to keep it a
conversation and not a debate, and the moderator's rule ("draw the answers out;
do not lecture"). Optional and plain: "a simple meal is enough." No sign-up and
no registration; the host prints it. Named to avoid confusion with *The Table*
(family devotions): "Host a table" or "A supper for six." **Retires:** nothing
new in the header; it lives on the season and Reading pages and in *Take it
with you*.

**Fit:** strong. **Effort:** S (a print template and five questions per
season).

**Evidence:** comment.org/suppers; the Georgetown Lutheran page; TTF Bookclub
Box; the TTF discussion leader guide.

### 7. A dated read-along with a church edition

**Seen in:** the Keller Center's cohorts (eight weekly sessions on a fixed
evening; recordings available after; a church-use guide offering live,
own-screen, and asynchronous options).

**What it is.** A course that runs once a year on announced dates, with a
weekly session, a way to catch up, and a page that tells a church how to run it
together.

**Why it works.** A start date is the season-as-door that Hallow proved
(benchmark.md) without Hallow's mechanics; a finite run respects the reader's
time; the church edition makes the pastor the distributor.

**On LiveWell.** The church history course (MASTER-PLAN 7.2) and the January
Bible plan each run as an annual read-along: "Begins Ash Wednesday, February
10, 2027: one session a week for six weeks." The course page shows position,
not performance ("Week 2 begins Wednesday"), with the existing calendar
reminder helper (`lib/calendar.ts`) to add the dates. *Use it with your church*
gives three ways (together on one evening, each on their own through the week,
or a mix), the leader notes, and the handout. Free, no certificate, nothing
recorded about who took part. **Retires:** nothing; it is a dated layer on the
course.

**Fit:** strong. **Effort:** S (on top of the course).

**Evidence:** Keller Center cohort pages; the church-use PDF.

### 8. The archive read three ways: by series, by passage, by date

**Seen in:** Gospel in Life (every sermon labeled with series, Scripture, and
date; the whole archive free); *First Things* (issues older than a year free).

**What it is.** Every piece carries its series, the passages it handles, and
its date, and the index can be read in any of those orders.

**Why it works.** A reader with a passage in front of him (the most common
arrival, per benchmark.md) can find what the site says about it; the pastor
preparing a sermon on Romans 13 finds the essay and the history session that
handle it.

**On LiveWell.** `/writing` keeps its sections and adds a *By passage* view
(`?by=passage`): essays listed under the books and chapters they treat, in
canonical order, from the references already in the essays and the one
reference parser the plan builds (U15). The same data feeds the Study Bible
chapter's "Go deeper" list (cluster A's verse-as-hub pattern). A *By date*
view lists everything with its revised date. **Retires:** the "Latest" block,
if pattern 2 has not already.

**Fit:** strong. **Effort:** S to M (the data exists; a builder and one view).

**Evidence:** Gospel in Life topic and About pages; *First Things* editor's
note on access.

### 9. Reading circles that run themselves

**Seen in:** *First Things*' ROFTers (independent, self-organized circles; one
article a month; a directory with "Active" and "Trying to Form").

**What it is.** A standing invitation for readers or a pastor to meet monthly
around one piece the publication names.

**Why it works.** It costs the publication one choice a month and a leader
sheet, and it creates the reader the Constitution counts as success: one who
returns, argues, and hands the piece on.

**On LiveWell.** A short page, *Read it together*, under Essays: this month's
piece (taken from the season), the leader sheet (pattern 6's questions, reused),
and *Start a circle*: meet monthly, one piece, an hour, a convener, the
moderator's rule. Pastors get it through PCN. **A public directory of circles
is not proposed now:** it would need a database, moderation, and James's
consent to list strangers' meetings, so it is a question for James, not a
unit. **Retires:** nothing.

**Fit:** strong. **Effort:** S.

**Evidence:** firstthings.com reading-groups pages; the 2013 First Thoughts
post; the Rochester parish page.

### 10. Conversations published transcript first, with a reading list

**Seen in:** the Trinity Forum (a host and a guest; an edited podcast, the full
video and transcript, then "Readings that are pertinent to this discussion");
the Veritas Forum (two chairs, one Christian and one not, a neutral moderator,
audience questions).

**What it is.** Recorded conversations published as readable, checkable text,
ending in the readings that go deeper.

**Why it works.** Text is the medium this site argues in (benchmark.md's
evidence on reading); a transcript can be quoted, searched, and checked;
audio is there for the car. The two-chair form lets a skeptic speak for
himself on LiveWell, which no essay can do.

**On LiveWell.** If James records conversations (MASTER-PLAN's question 13
already asks about his voice), each becomes a page under About,
`/conversations/:slug`: who, when, why this conversation, then the edited
transcript with speaker names and section headings, the audio below the opening
(never autoplaying), and "Read next" (two to four validated links). Some are
two chairs: James with a thoughtful unbeliever or with a Christian across a
second-order line, each given equal room, with a third person moderating when
possible. **Retires:** folds the podcast link in About into this page.

**Fit:** strong. **Effort:** M (page type and validator; transcripts need a
human check; depends on James's time).

**Evidence:** TTF podcast and Online Conversation pages; Veritas pages and
campus reports.

### 11. The open evidence file

**Seen in:** After Babel and AnxiousGeneration.com (review documents with the
evidence on each side; critics invited to add studies; rival explanations
tested one per post); its critics' warning about "vote counting."

**What it is.** For each contested empirical question the site leans on, a
maintained page of findings on each side, with what each can and cannot show,
and a standing invitation to send what is missing.

**Why it works.** benchmark.md's gap 4 (nobody reports the numbers from both
sides) is real, and this is the honest form of it: not a statistics page but
an evidence ledger that names its own limits. Pastors need it before they
quote a figure from the pulpit.

**On LiveWell.** Pages such as *Is there a revival among the young?* and *How
many Americans hold Christian nationalist views?* (both in benchmark.md's
table), each listing findings in two plain columns of prose ("What points one
way," "What points the other"), every entry with its source, date, sample, and
a sentence on what it measures; a closing paragraph on what the evidence
cannot settle; and *Send us a study we missed* (the contact form, prefilled).
No tallies of studies on each side, which is the "vote counting" error. Every
figure is checked against the primary report by a named person before the page
goes live (MASTER-PLAN's statistics rule). This sharpens the parked
"statistics page" rather than adding a new idea, so it stays parked until a
person with access can check the figures.

**Fit:** strong. **Effort:** M (content-heavy and blocked on primary checks).

**Evidence:** Haidt's descriptions of the collaborative reviews; the
AnxiousGeneration.com research page; Platformer, 3 Quarks Daily, and CJR on
the critics.

### 12. Better and worse than you think: the skeptic's first four

**Seen in:** CPX's *For the Love of God* (the good and the bad together, "for
sceptics and believers alike," and a four-session course derived from it).

**What it is.** A short sequence that opens with the church's failures named
plainly, sets a witness from inside the church beside each, and is built for a
mixed group.

**Why it works.** It does what CLAUDE.md's skeptic standard asks: name the
church's real failures honestly, then reconstruct. It answers the objection a
skeptic actually holds ("look what Christians have done") before any argument
for God.

**On LiveWell.** The Skeptic's Track gains a four-stop opening, *Better and
worse than you think*, drawn from The Mirror and The American Church sections:
each stop pairs one failure, one witness from inside (Douglass against
slaveholding religion is the obvious first), one passage of Scripture, and one
Reading, with questions written for a group of believers and skeptics
together. It reuses essays and Readings; it adds no new door. **Retires:** the
Skeptic's Track's current opening stop if it does less.

**Fit:** strong. **Effort:** M (waits on the Mirror and American Church
rewrites).

**Evidence:** CPX documentary coverage and reviews; the course description;
Natasha Moore's book subtitle.

### 13. A set shape for the practical door, with a review date

**Seen in:** Psyche Guides (a "signature, how-to structure," 3,000 to 4,000
words, date-stamped and reviewed, a page on reliability).

**What it is.** Practical counsel in one fixed, visible shape that the reader
learns once and trusts thereafter.

**Why it works.** The seeker arrives with a Tuesday-afternoon problem; a
familiar shape lets her find "what do I do this week" without hunting, and the
review date tells her someone is still standing behind it. CLAUDE.md's
audience standard asks for exactly this order: the practical door first, the
depth behind it.

**On LiveWell.** Find Help's care pages and any practical topic page follow
one order: *In short* (three or four sentences of prose, never a numbered
takeaway box, which the formation standard refuses), *What helps this week*,
*What lies underneath* (cause, then wisdom), *If it is worse than this* (the
path to real help, always visible), *Further reading* (named books), and
*Reviewed [date]*. **Retires:** the inconsistent headings across the 40 care
pages.

**Fit:** maybe (strong if the care pages are being touched anyway). **Effort:**
M (re-templating 40 pages; the content mostly stays).

**Evidence:** Psyche pitch, reliability page, guide pages.

### 14. Behold: a short form of wonder beside the diagnosis

**Seen in:** CT's *The Behemoth* (ad-free; "behold" rather than "exhort, scold,
theorize, or pontificate"; the physics of baseball beside Cranmer's martyrdom
and Barth).

**What it is.** A short recurring piece whose only job is to make the reader
marvel: at a text, a moment in the church's history, a creed's line, the
created world.

**Why it works.** LiveWell's shelf is mostly diagnosis (The Mirror, Faith and
Power, The American Church). The Constitution's last line asks that the reader
leave thinking Christianity "more beautiful than I realized." A site that only
indicts cannot earn that sentence.

**On LiveWell.** One short piece (200 to 400 words) closes each monthly letter
and sits at the foot of the season page: a page of an ancient manuscript, a
line from the Nicene Creed and the fight that produced it, a passage read in
its world. **Caution from the source:** *The Behemoth* ran about a year and a
half as a side project on grant money and stopped. Do this only at the
letter's monthly pace.

**Fit:** maybe. **Effort:** S (format) but recurring labor.

**Evidence:** CT's 2014 announcement and launch essay; the 2016 editor's note.

### 15. Art with a reason

**Seen in:** *Comment* (cover art "more than wrapping paper"; artists paid as
authors); *Plough* (named cover artists; a piece on its own cover); *Image*
(Artist of the Month); CT (a design history written for readers).

**What it is.** One deliberate image per issue, chosen or commissioned, with a
caption that says why it is there.

**Why it works.** It replaces decoration with an argument the eye can carry,
and it is a mark of a publication that is not in a hurry.

**On LiveWell.** Each season page gets one image (a public-domain work from the
church's long memory, a photograph of a place in the history course, or a
commissioned piece if James chooses to pay for one) and a short caption
paragraph on why it was chosen. It **replaces** generated art on the season
page and follows MASTER-PLAN 8.5 ("drawn teaching, sparingly"). Nothing stock,
nothing decorative.

**Fit:** maybe. **Effort:** M (sourcing and rights per image).

**Evidence:** *Comment* year-in-review; Plough "Covering the Cover"; *Image*
Artist of the Month pages; CT's 2024 design history.

### Also considered, not ranked

- **A free daily layer** (Plough's *Daily Dig* and *Daily Prayer*; *Image*'s
  daily *Good Letters*). One writer cannot sustain it without filler; the
  family devotions already give households a weekly rhythm.
- **Membership and a print journal** (*Mere Orthodoxy*, *Comment*, *Plough*).
  The Decision Log holds no giving or Support page until James names who
  receives gifts; a print annual of the year's seasons (as *Breaking Ground*
  became a book) is a later question for James.
- **The scholarly abstract for general readers** (*Public Discourse*). Useful
  if LiveWell ever summarizes academic work; the context guides already do the
  nearest thing.
- **An annual gathering with a theme** (the Glen Workshop; *Comment* events).
  Possible later through PCN; not a design pattern for the site.

---

## 3. What to avoid

Each of these is a real pattern in this cluster or its neighbors that would
betray "Unhurried. Weighted. Grown-up." or the integrity rules.

- **Metered walls and counted free reads.** "Three free articles a month"
  (*First Things*), "one archive article a month per device" (*Image*). They
  make the reader count and they put the skeptic's first visit behind a wall.
  LiveWell's core stays free and unmetered.
- **Manufactured urgency and social proof.** "Become a member before January
  10" to claim an issue; "Join over 1,100 members" (*Mere Orthodoxy*). The
  skeptic reads both as a sales funnel. No deadlines except real dates (a
  season begins on Ash Wednesday), and no counts of readers or subscribers.
- **Certificates and credentials for formation.** The Keller Center's
  certificate for four cohorts. Formation is not a transcript; a certificate
  is a badge in a robe. Show position ("Week 2 of 6"), never completion.
- **The feed and the news cadence.** "Minute-to-minute news updates" (CT's
  2012 relaunch). A river of items exposes a one-writer site's gaps, trains
  skimming, and pulls the writing toward the hot take. Seasons, not a feed.
- **Daily email as habit pressure.** A daily devotional email becomes filler
  for one writer and an unread pile for the reader. Monthly letter; weekly at
  most for households, and only where the family devotions already supply it.
- **Public comment threads.** Substack-style comments under essays invite
  tribal performance and need moderation. "Write to James" (planned) keeps the
  answer private and serious; the best replies can be printed, with consent, in
  the next letter.
- **Debate as combat.** Audience votes, "who won," a scoreboard of studies.
  Veritas's form is dialogue with a moderator; After Babel's critics showed
  that tallying studies on each side ("vote counting") is itself a distortion.
  No tallies, no winners.
- **A crowd of voices.** Fellows networks and rotating writers (Keller Center,
  CT, *Plough*) dilute the one thing no publisher can copy, which is James's
  voice. Guests appear in conversations (pattern 10), in their own names, not
  as a stable of writers.
- **Selling the primary sources.** The Trinity Forum charges $5 to $10 per
  Reading. LiveWell's Readings are free, and public-domain texts are given as
  text on the page, not as downloads behind a form.
- **Channels without names a reader understands.** Four podcast series with
  opaque titles (*Comment*). Every LiveWell surface is named for what it holds.
- **App-only or platform-bound formats.** *The Behemoth* launched on an iPad
  app; Haidt's review documents live in Google Docs outside his site. Keep
  everything on LiveWell's own pages, prerendered, linkable, and printable.
- **A cadence the house cannot keep.** *The Behemoth* ended after a year and a
  half; daily journals need staffs. Promise three seasons and twelve letters a
  year only if James can write the letters; otherwise promise fewer.
- **The takeaway box.** Psyche's numbered key points are good practice for its
  purpose and the formation standard's "clean application turn" for ours. The
  practical door opens in prose.
- **Everything already refused in the plan:** streaks, badges, points,
  completion percentages, pop-up email modals, autoplay, carousels, infinite
  scroll, social-proof counters, and interactivity inside the argument.

---

## 4. What could not be seen

- **No live page of any product.** Every description comes from search
  summaries of pages, so layouts, typography, spacing, and mobile behavior of
  the web editions of *Comment*, *Plough*, *Mere Orthodoxy*, *First Things*,
  *Public Discourse*, *Image*, the Keller Center, Gospel in Life, CPX, and
  After Babel are unknown.
- **No code.** None of these products is open source; nothing was cloned for
  this cluster.
- **Christianity Today's 2024 redesign:** the designer, typefaces, and web
  changes were not in anything I reached; only that the magazine got "a whole
  new look" and an updated logo.
- ***Plough*'s *Daily Dig*:** whether it is emailed, and what one looks like.
- ***Mere Orthodoxy*:** membership tiers and prices; what the 2021 redesign
  produced; the contents of "The Next Chapter of Mere Orthodoxy" (May 2024).
- ***Comment*:** what *The Understory* is under the Gather menu; the true table
  size for Suppers (the page says both four to eight and six to ten); a sample
  of the prompts, recipe, and playlist.
- **Trinity Forum:** the internal layout of a Reading (where the questions sit,
  whether there is a further-reading list); whether Online Conversations take
  audience questions; any "Trinity Forum Societies."
- ***First Things*:** the current ROFTers directory (the status labels seen
  came from an archived copy); the current price and meter.
- **Keller Center:** an index of its essays; whether it has a library of
  skeptics' questions.
- **CPX:** the *Life & Faith* podcast and video library in any detail.
- ***Public Discourse*:** its topic categories and whether it runs formal
  replies and rejoinders.
- ***Image*:** whether *Good Letters*, *ImageUpdate*, and *Artist of the Month*
  still run as described (the pages seen date from 2012 to 2017).
- **After Babel:** the Substack's own sections, any "start here" page, and the
  actual list of errors on the corrections page.
- **Psyche:** the full set of guide headings ("Key points" and "Links and
  books" confirmed; "Need to know" referred to; others not seen).
- **Gospel in Life:** search and filter controls on the archive.
- **Any engagement or retention figure** for any of these products. None was
  found, and none is claimed.

---

## 5. Evidence

44 searches through the WebSearch tool, standard and extended. Two direct
fetches (`www.plough.com/llms.txt`, `www.afterbabel.com/sitemap.xml`) were
refused by the egress proxy. Each source below is listed with what it showed;
"(search summary)" means the page's content reached me only through the search
tool's summary of it.

### The Trinity Forum
- [ttf.org/reading-groups](https://ttf.org/reading-groups): Readings are brief,
  followed by discussion questions, flexible over weeks or one or two sittings;
  registration fee and download (search summary).
- [ttf.org/reading-group](https://ttf.org/reading-group/) and
  [ttf.org/product/bookclub-box](https://ttf.org/product/bookclub-box/):
  quarterly themed Bookclub Box with host guide and discussion guide.
- [foclonline.org, how to lead a Trinity Forum discussion](https://foclonline.org/talk/how-lead-trinity-forum-discussion-journey):
  "lead as inductively as possible ... draws the answers out of the group, and
  avoids lecturing."
- [ttf.org/product/letter-from-birmingham-jail](https://www.ttf.org/product/letter-from-birmingham-jail):
  King's letter with introductions by Robert M. Franklin and Andrew Young; $5 to
  $10; "introduced by today's experts, and tailored for individual reflection
  and group discussion."
- [Prisoner's Collection](https://ttf.org/product/prisoners-collection),
  [Faithful Citizenship Collection](https://ttf.org/product/faithful-citizenship-collection),
  [Freedom & Justice Collection](https://ttf.org/product/freedomjusticecollection):
  thematic bundles across centuries.
- [Evening Conversation with Dana Gioia](https://ttf.org/portfolios/evening-conversation-with-dana-gioia-october-18-2012)
  and [with Os Guinness](https://www.ttf.org/portfolios/evening-conversation-with-os-guiness-september-5-2013/):
  full videos labeled by speaker, topic, date, city.
- [Episode 39, Reading and Community](https://ttf.org/podcasts/episode-39-reading-and-community/)
  and [Episode 36](https://ttf.org/podcasts/episode-36-reading-for-restoration/):
  podcast as edited Online Conversation; full video and transcript linked;
  pertinent Readings listed.
- [Online Conversation with Kate Bowler](https://ttf.org/portfolios/online-conversation-hope-heartbreak-and-meaning-with-kate-bowler/)
  and [with Curt Thompson](https://ttf.org/portfolios/online-hope-and-healing-with-curt-thompson/):
  Cherie Harder as host; transcript opening.
- [Trinity Forum Conversations, Apple Podcasts](https://podcasts.apple.com/it/podcast/trinity-forum-conversations/id1554038962):
  "the best of the Christian intellectual tradition."

### *Comment* and *Breaking Ground*
- [comment.org/issues](https://comment.org/issues/): each issue "a crafted
  feature of narrative, argument, conversation, and art."
- [comment.org](https://comment.org/) and [current issue](https://comment.org/current-issue/):
  Vol. 44, No. 3, *The Paradoxes of Control*; podcasts menu; Gather menu with
  Comment Suppers and The Understory (search summary).
- [comment.org/subscribe](https://comment.org/subscribe/): $24 a year, four
  print issues and online access; subscriber invitations to events and bonus
  podcast content; donor updates from Anne Snyder.
- [comment.org/suppers](https://comment.org/suppers/): host a meal around the
  latest issue; prompts, recipe, playlist; hosting checklist; group size given
  two ways.
- [Georgetown Lutheran, Comment Community Suppers](https://georgetownlutheran.com/comment-community-suppers):
  a bookmark in every issue; Fall 2024 kit with two articles and questions.
- [Comment: a year in review (Ray Pennings)](https://comment.org/comment-a-year-in-review/):
  cover art "more than wrapping paper"; artists paid as authors.
- [Of Scenes & Spheres](https://comment.org/podcasts/of-scenes-and-spheres/):
  one of the podcast pages.
- [Word of God, City of Man (First Things)](https://firstthings.com/word-of-god-city-of-man/):
  the Fall 2012 *Comment* issue guest-edited by Leithart.
- [Cardus appoints new Comment editor](https://www.cardus.ca/news/news-releases/cardus-appoints-new-comment-editor/):
  editorial leadership.
- [Foreword Reviews, *Breaking Ground*](https://www.forewordreviews.com/reviews/breaking-ground-9781636080420-review.pdf),
  [Davenant Institute listing](https://davenantinstitute.org/?p=24775),
  [Harvard Book Store listing](https://www.harvard.com/book/9781636080420):
  origin at *Comment* in spring 2020, *Plough* and seventeen institutions,
  contributors, editors, January 2022 book.

### *Plough*
- [plough.com/llms.txt](https://www.plough.com/llms.txt): books, quarterly,
  free daily online journal with Daily Prayer and Daily Dig; each issue themed
  (search summary; direct fetch refused).
- [Covering the Cover](https://plough.com/en/topics/culture/art/covering-the-cover?layout=amp):
  designer Rosalind Stevenson; cover by Paweł Kuczyński.
- [subscribe.plough.com](https://subscribe.plough.com/flex/pph/EPGGADS):
  full color, ad-free.
- [plough.com/survey-response](https://www.plough.com/survey-response): email
  subscribers kept and introduced to the magazine and books.

### *Mere Orthodoxy*
- [mereorthodoxy.com/membership](https://mereorthodoxy.com/membership) and
  [become a member](https://mereorthodoxy.com/become-a-member): journal three
  times a year; "over 1,100 members"; 66% of revenue from donors (search
  summary).
- [mereorthodoxy.com/journal](https://mereorthodoxy.com/journal): older "over
  1,000" figure.
- [Introducing Mere Orthodoxy #1, Fall 2021](https://mereorthodoxy.com/introducing-mere-orthodoxy-1-fall-2021/):
  first print issue; free on the web at first, paywall later; member banner for
  the winter edition.
- [Where We've Been; Where We're Going](https://mereorthodoxy.com/where-weve-been-where-were-going/):
  November 30, 2021; founded 2005 by Torrey Honors graduates.
- [Growing the merry band](https://mereorthodoxy.com/growing-the-merry-band/):
  membership appeal (search summary, with the redesign note).
- [merefidelity.com](https://merefidelity.com/) and episode pages
  ([Confessions, Book 3](https://mereorthodoxy.com/mere-fidelity-confessions-book-3/),
  [Sacrifice](https://mereorthodoxy.com/mere-fidelity-sacrifice/)): hosts;
  one-book episodes.
- [Jake Meador's newsletter](https://buttondown.com/jakemeador/archive/the-newsletters-future/):
  a personal letter for "friends of Mere O."

### *First Things*
- [firstthings.com/reading-groups](https://firstthings.com/reading-groups) and
  [/rofters](https://firstthings.com/rofters): independent, self-organized
  circles; organic growth; contacts.
- [Readers of First Things, Unite (2013)](https://www.firstthings.com/blogs/firstthoughts/2013/03/readers-of-first-things-unite):
  groups in thirty-some states, Canada, Spain, UK.
- [Sacred Heart Rochester ROFTERS](https://sacredheartrochester.org/our-faith/adult-formation/rofters/):
  third Monday; one article a month.
- [Central Virginia ROFTERS](https://firstthings.com/central-virginia-rofters):
  a local listing.
- [Note from the Editor](https://firstthings.com/note-from-the-editor/): three
  free articles a month; issues older than a year free; prices.
- [Your All-Access Pass](https://firstthings.com/your-all-access-pass/): app
  separate; some articles in audio.

### Christianity Today
- [CT Design, Redesign, and Re-redesign (2024)](https://www.christianitytoday.com/2024/07/ct-redesign-design-history-layout-font/):
  a new look and logo in 2024; the design history from 1963 (Harvey Gabor),
  2000 (Gary Gnidovic), 2013 (Metaleap, Periódico Text).
- [CT media room, 2013 redesign](https://www.christianitytoday.org/media-room/news/2013/christianity-today-surprises-with-completely-redesigned.html):
  wider margins, new typefaces, restructured sections, simpler palette,
  truncated logo.
- [Adweek, ChristianityToday.com launches clean new site design](https://www.adweek.com/media/christianitytodaycom-launches-clean-new-site-design/):
  simpler layout, subscriber-only content, minute-to-minute news.
- [WebDevStudios portfolio](https://webdevstudios.com/portfolio/christianity-today/):
  migration to WordPress VIP.
- [FrontGate Media, CT announces *The Behemoth*](https://www.frontgatemedia.com/christianity-today-announces-the-behemoth-a-magazine-that-marvels-at-gods-creation/)
  and [CT media room 2014](https://www.christianitytoday.org/media-room/news/2014/christianity-today-announces-behemoth-magazine-that.html):
  ad-free, biweekly, iPad app or responsive site; the name; designer Jennifer
  McGuire on imagery.
- [Behold, Now Behemoth (Ted Olsen)](https://christianitytoday.com/ct/2014/august-web-only/behold-now-behemoth-magazine.html):
  "behold" rather than "exhort, scold, theorize, or pontificate"; first issue
  contents; 26 issues a year.
- [Editor's note, February 18, 2016](https://www.christianitytoday.com/?p=3096)
  and [CT awarded Templeton grant (2016)](https://www.christianitytoday.org/media-room/news/2016/christianity-today-awarded-grant-to-build-audience-for.html):
  side project, grant funding, later focus on science and faith.

### The Keller Center
- [TGC announces the Keller Center](https://www.thegospelcoalition.org/article/tgc-announces-keller-center/):
  launch, audience (parents, pastors, professors), online cohorts, 26 fellows.
- [The Keller Center](https://www.thegospelcoalition.org/thekellercenter/) and
  [FAQ](https://thegospelcoalition.org/thekellercenter/faq): mission; formats;
  the newsletter.
- [CT, "Apologists Without All the Answers"](https://www.christianitytoday.com/2023/02/tgc-tim-keller-center-cultural-apologetics-collin-hansen/):
  launch coverage.
- [Cultural Apologetics 101 cohort](https://www.thegospelcoalition.org/cohort/cultural-apologetics-101/)
  and [Everyday Apologetics 2026](https://www.thegospelcoalition.org/cohort/everyday-apologetics-2026/):
  eight Wednesday sessions, $299, recordings in perpetuity, registration with
  and without books.
- [Ideas on How to Use TKC Cohorts (PDF)](https://media.thegospelcoalition.org/wp-content/uploads/2024/08/07150113/Ideas-on-How-to-Use-TKC-Cohorts.pdf):
  live, own-screen, and asynchronous church use; group discounts.
- [Keller Center cohort certification form](https://form.jotform.com/261723447270052):
  certificate after four cohorts.
- [Six new fellows](https://www.thegospelcoalition.org/article/6-new-fellows-keller-center/)
  and [*The Gospel After Christendom*](https://www.thegospelcoalition.org/publication/gospel-after-christendom/).

### Gospel in Life
- [gospelinlife.com/about](https://gospelinlife.com/about): free archive since
  2023; podcast and YouTube; monthly newsletter; 1989 cassette origin; move to
  Redeemer City to City.
- [Topic: Salvation](https://gospelinlife.com/topic/salvation) and
  [Understanding the Gospel](https://gospelinlife.com/topic/understanding-the-gospel):
  sermons labeled with series, Scripture, and date; paginated.
- [*Gospel in Life* study guide (Everand)](https://www.everand.com/book/170464254):
  eight sessions, City to Eternity; video sold separately.
- [Logos, Keller Sermon Archive 2012 to 2013](https://www.logos.com/product/42847/timothy-keller-sermon-archive-2012-2013):
  a paid transcript archive.

### *Public Discourse*
- [Witherspoon Institute, Public Discourse](https://winst.org/publications/public-discourse/):
  the online publication; mission.
- [Witherspoon Institute (Wikipedia)](https://en.wikipedia.org/wiki/Witherspoon_Institute):
  founded 2008 by Ryan T. Anderson.
- [First Things notice, 2008](https://firstthings.com/public-discourse): a
  hybrid of blog and journal; essays and abstracts.
- [From the Editor's Desk](https://www.thepublicdiscourse.com/featured/from-the-editors-desk-public-discourses-monthly-roundup/):
  newsletter parts; "not necessarily endorsements."

### *Image*
- [Image (journal), Wikipedia](https://en.wikipedia.org/wiki/Image_(journal)):
  founded 1989; quarterly; "Art, Faith, Mystery"; the Glen Workshop.
- [imagejournal.org/about](https://imagejournal.org/about) and
  [imagejournal.org/?p=7121](https://imagejournal.org/?p=7121): Good Letters
  outside the paywall, marked with a diamond; ImageUpdate weekly; archive
  meter per device (search summary).
- [Images 16, read 2016](https://imagejournal.org/2017/01/18/images-16-read-2016/):
  contributors' recommendations.
- [Red Hen, Artist of the Month](https://redhen.org/news_review/katherine-coles-is-image-journals-artist-of-the-month/).

### Centre for Public Christianity
- [Centre for Public Christianity (Wikipedia)](https://en.wikipedia.org/wiki/Centre_for_Public_Christianity):
  founding, Nicene commitment, resource library, *Life & Faith* podcast,
  *For the Love of God*.
- [Eternity News, "Christianity is bad, and good"](https://eternitynews.com.au/culture/new-on-the-abc-christianity-is-bad-and-good/),
  [Great Lakes Advocate](https://www.greatlakesadvocate.com.au/story/5706701/christianity-weighing-up-the-good-the-bad-the-ugly-and-the-unexpected/),
  [UCA Insights](https://www.insights.uca.org.au/?p=19406),
  [Third Space review](https://thirdspace.org.au/blog/love-god-film-review):
  screenings and tickets, ABC broadcast, "for sceptics and believers alike,"
  the course of four 90-minute sessions, mixed reviews.
- [The Joseph Network, Natasha Moore](https://thejosephnetwork.libsyn.com/website/natasha-moore-on-misunderstanding-pessimism-arguments-and-how-the-church-is-better-and-worse-than-you-ever-imagined):
  the "better and worse than you ever imagined" framing.

### After Babel and AnxiousGeneration.com
- [Haidt on X: the goal "to elicit objections and alternate theories"](https://x.com/JonHaidt/status/1636007415681368065).
- [After Babel, "Is Economic Deprivation the Real Cause ...?"](https://www.afterbabel.com/p/financial-crisis):
  one rival theory per post.
- [After Babel, expert consensus survey](https://www.afterbabel.com/p/social-media-consensus-paper).
- [After Babel, "It's time to free the anxious generation"](https://www.afterbabel.com/p/its-time-to-free-the-anxious-generation?lli=1):
  launch post; supplementary documents beyond the book.
- [AnxiousGeneration.com research](https://anxiousgeneration.com/research):
  "Errors in The Anxious Generation," June 8, 2024; supplement by chapter;
  collaborative review documents.
- [A reader's highlight of the book's note](https://www.goodreads.com/notes/181250294-the-anxious-generation/17372986-stephanie/adde6ee6-b399-40f8-9c03-0cb85f9614dc):
  "where I will do my best to correct any errors I have made."
- [jonathanhaidt.com, social media](https://jonathanhaidt.com/?p=219): review
  documents; critics invited to add comments and studies.
- [Platformer](https://www.platformer.news/anxious-generation-jonathan-haidt-debate-critique/),
  [3 Quarks Daily](https://3quarksdaily.com/3quarksdaily/2024/07/why-academics-are-annoyed-with-jonathan-haidt-again.html),
  [CJR](https://www.cjr.org/the_media_today/social_media_harm_teens_jonathan_haidt.php),
  [Shores of Academia](https://shoresofacademia.substack.com/p/haidt-social-media-associations-with):
  the critics (Odgers, Przybylski's "vote counting," Ferguson, the counts).
- [The College Fix on the launch](https://www.thecollegefix.com/social-psychologist-jon-haidt-launches-new-blog-after-babel/):
  the Substack's stated purpose.

### The Veritas Forum
- [Veritas Forum (Wikipedia)](https://en.wikipedia.org/wiki/Veritas_Forum):
  1992 at Harvard; books, podcasts, videos.
- [Bowdoin Orient](https://bowdoinorient.com/bonus/article/6284): fifteen
  minutes each for a secular and a Christian presenter; faculty moderator.
- [Daily Pennsylvanian, November 2025](https://www.thedp.com/article/2025/11/penn-veritas-forum-hosts-religion-debate-talk):
  moderated conversation; audience questions.
- [veritas.org/who-we-are](https://www.veritas.org/who-we-are): dialogue with
  other beliefs; seeking truth together.

### Psyche
- [psyche.co/pitch](https://psyche.co/pitch): Guides 3,000 to 4,000 words in a
  signature how-to structure; Ideas 1,000 to 1,800.
- [About Psyche Guides (reliability)](https://psyche.co/are-psyche-guides-reliable):
  date-stamped, routinely reviewed and updated.
- [How to spot who's trustworthy](https://psyche.co/guides/how-to-spot-whos-trustworthy-and-whos-not-on-what-matters),
  [How to build a memory palace](https://psyche.co/guides/how-to-build-a-memory-palace-to-store-and-revisit-information),
  [How to deal with envy](https://psyche.co/guides/how-to-deal-with-envy-and-learn-to-use-the-emotion-for-growth):
  numbered Key points at the head, Links and books at the foot, a "Need to
  know" section referred to.
- [Human Givens Institute on its Psyche Guide](https://www.hgi.org.uk/?p=3020):
  "a set format ... of lasting help to non-experts."

### LiveWell files read
- `/home/user/Livewell-/CLAUDE.md` (brand contract, audiences, standards).
- `/home/user/Livewell-/docs/work/plan/benchmark.md` (earlier research, not
  repeated here).
- `/home/user/Livewell-/docs/work/plan/MASTER-PLAN.md` sections 0 to 3 and 6.
- `/home/user/Livewell-/client/src/lib/shelf.json` (eight sections, *Start with
  these*, 58 essays: 15 live, 43 pending).
