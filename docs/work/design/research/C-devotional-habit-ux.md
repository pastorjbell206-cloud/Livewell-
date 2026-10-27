# C. Devotional habit UX: how daily prayer and Scripture apps build a rhythm, and where habit turns into pressure

Prepared 2026-10-27 for the design research cluster "devotional-habit-ux,"
answering James's brief ("the most organized, well-designed website that helps
people to study the Bible, to understand doctrine, to understand what a
post-Christian world is in America, and how to live it ... tools and resources
available ... interactive, with things that draw people's attention ... a useful
tool for people to study and learn and grow").

**Where this sits.** `docs/work/plan/benchmark.md` placed Hallow, Lectio 365,
Dwell and YouVersion at the level of audience and strategy. In this folder,
`A-courses-learning.md` already took Hallow's season-as-door, the one session
released per day, and the great book read beside Scripture; Dwell's plans named
by their size; YouVersion's partner rules. `A-bible-readers.md` took Dwell's
read-along. `A-SYNTHESIS.md` set the governing rules (position, not
performance; the shared calendar; the closing rite) and `C-learning-ux.md` split
the learning products into the family that brings you back and the family that
makes you keep what you met. This file does not repeat any of that. It goes into
the craft those files left alone, the daily session itself, and asks six
narrower questions:

1. What is the **shape of one session** that people return to for years?
2. How does a product know **what hour and what season** it is, and meet the
   reader there?
3. How is Scripture **heard and paced** for prayer: voice, repetition, silence,
   bell, music?
4. How does the reader **respond** (an examen, a prayer list, a journal line),
   and how does what they wrote **come back** to them?
5. How does a product **invite return without coercing it**: reminders, time
   windows, catch-up, the missed day?
6. What do **the money and the data model** do to all of the above?

**Method and limits.** Page fetches fail in this sandbox. I ran 44 web searches
aimed at official help centers, app-store listings, release notes, the makers'
own announcements, reviews, a behavioral-design case study, and two research
papers. I read the source of two open-source products cloned into
`/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/design-src/`:
**Venite** (`gbj_venite`, the Episcopal and Anglican daily-office app sponsored
by Forward Movement; Angular and Ionic with Stencil components) and **Medito**
(`meditohq_medito-app`, the nonprofit meditation app; Flutter). Where code showed
a UI string, a default, or a rule, it is quoted from the file named. Hallow,
Calm, Headspace, Waking Up, Day One, Lectio 365, Pray As You Go, Sacred Space
and the rest are closed; nothing of theirs was seen except through their own
documentation, listings and reviews, and section 6 lists what stayed out of
reach. I also read the LiveWell files each pattern lands on (section 8).
Company figures and third-party numbers below are planning notes, never for the
site (MASTER-PLAN section 2).

---

## 0. The short verdict

The products in this cluster split along a different line from the learning
products, and the line is the lesson.

**The office family** (Pray As You Go, Lectio 365, Sacred Space, Reimagining the
Examen, and the daily-office apps: Venite, Universalis, the Church of England's
Time to Pray, Mission St. Clare, dailyoffice2019, Divine Office) builds every
session on a **fixed frame borrowed from the church**: Lectio's P.R.A.Y. in the
morning and a four-part Examen at night; Sacred Space's six stages; the
Examen's five steps; Morning Prayer, Noonday, Evening Prayer and Compline. The
**center changes daily** from a lectionary or a psalter, the product **knows the
hour and the season** (Venite picks the office from the clock; Time to Pray lets
the reader set when day turns to night), and the reader is held by the frame and
the calendar rather than by a counter. Almost all of them are free: Jesuit
funding and donations (Pray As You Go, Sacred Space), donor support (Lectio
365), a publisher's sponsorship (Venite, "Sponsored by Forward Movement").
Their weakness is the mirror of their strength: they teach little, the reader
makes almost nothing, none writes toward a skeptic, and some look their age.

**The wellness family** (Calm, Headspace, Hallow, Abide, Glorify, Medito, Waking
Up, Day One) treats the session as a content product and holds people with
**counts**: Calm's Mindfulness Streak and mindful minutes, Headspace's run
streak, Hallow's Current and Longest Streak, Day One's Streak widget, Medito's
"Current Streak," "Longest Streak" and **streak freezes** ("Congratulations! You
earned a streak freeze for reaching a 7-day milestone!"). Their craft is often
excellent (the time-of-day home screen, the countdown and bell, the reminder
window, the private journal that returns an old entry on its date). Their
measuring is where it goes wrong, and two pieces of evidence show it from inside
the industry. Irrational Labs' redesign of Headspace's onboarding **more than
doubled course starts** and raised app opens, but produced **no statistically
significant increase in active meditation days**. And Medito, a nonprofit with
no ads and no investors, ships an **"Edit stats"** page and a "Restore previous
stats" screen with twenty saved snapshots: the counter became so central to its
users that they needed a way to repair it.

**What LiveWell should take.** The office family's architecture (fixed frame,
changing center, the hour and the season deciding the door, dated pages,
mercy for the missed day, free) with the wellness family's best craft (an
honest length chosen up front, a slow voice with pauses and a bell, a reminder
the reader sets inside a window, a private line that comes back on its date),
and none of either family's counting.

**What LiveWell lacks today.** The site has the parts and no place where they
meet at a given hour. There is a Prayer Planner (`/tools/prayer-planner`: a
private prayer list by weekday with a dated record of answered prayer), a Worry
Journal (`/tools/worry-journal`: five minutes before bed), a Rule of Life tool,
an eight-minute how-to article on the Examen
(`client/public/howtos/a/sf-how-to-examine-your-day-the-daily-examen.json`), a
`ListenButton` that reads text with the device's own voice, Table mode with the
Screen Wake Lock, and `lib/calendar.ts` reminders that go to the reader's own
calendar. It has the BSB psalms (`client/public/bible/text/psalms/`), the
catechism and the creeds. There is no morning or evening prayer, no Examen you
can pray rather than read about, and no daily page a reader can return to.

**The open ground.** No Protestant product found in this wave offers a free,
web-first, unhurried morning and close-of-day prayer that carries the church's
dated memory with it and refuses every counter. Lectio 365 comes closest (its
Lent 2026 series drew on the Desert Fathers) but it is an app, not a page, and
it does not teach. The opening is the office shape, built from what LiveWell
already holds, in James's register, with the skeptic able to read every line of
it and see where it comes from.

---

## 1. The products

Each entry: who it serves; how it is organized; its signature features and the
interaction behind them; what is known of the look; how it holds people; what is
worth stealing; what is weak. Dwell and YouVersion are covered in the A-wave
files and appear here only where they sharpen a point.

### 1.1 Pray As You Go (Jesuits in Britain)

**Who.** Commuters first: it began in 2006 as a Lenten podcast for people
travelling to work or study, became an app in 2014, and is produced by Jesuit
Media Initiatives with material written by Jesuits in Britain and beyond. The
Jesuits' own 20th-anniversary note speaks of a global community "of over half a
million" *(company figure)*; the Jesuit podcast says "hundreds of thousands,"
especially in North America. Its director since the mid-2020s is Emma Holland,
interviewed on the Jesuits' AMDG podcast in March 2024.

**How it is organized.** One daily session, new every working day plus one for
the weekend, drawn from the lectionary. Around it: imaginative contemplations,
the Examen, sleep prayers, mental-health prayer guides, material for children
and families, prayers in sign language, digital retreats, and series such as
*Rosary Reflections* on the Discover page.

**Signature feature: a frame, not a talk.** Each session lasts ten to thirteen
minutes and "combines music, scripture and some questions for reflection." Its
own description says what it is not: "not a 'Thought for the Day', a sermon or
a bible-study, but rather a framework for your own prayer." One review times a
weekday session at about eleven minutes, with music opening and closing the
prayer around a short passage and the questions; reviewers describe deliberately
slow pacing with long pauses for quiet. One commentary (RAPT Interviews) says
the passage is read slowly, aloud, and twice, and that the app never explains
the passage but "waits with the listener"; that detail is from one source only.

**Look and sound.** The music is the signature: reviewers name King's College
Cambridge, the Swedish duo Salt of the Sound, the Kyiv Chamber Choir and the
Monks of Keur Moussa in Senegal. The App Store listing names VoiceOver, Larger
Text and Dark Interface support. No designer write-up was found.

**How it holds people.** The fixed shape, the commute as the cue, and a voice
that does not hurry. Twenty years without a paywall: "All of our content is
always free, no subscription required," funded by donations through Jesuit
Media.

**Steal.** The refusal to explain inside the prayer. Scripture read slowly and
(reportedly) twice. A session sized to a real slot in the day. A daily new
center inside a frame that never changes.

**Weak.** Nothing for the reader to keep or make; no teaching at all, by design;
the strongest material (the Examen, the retreats) sits behind the daily
session with no path into it that I could see described.

### 1.2 Lectio 365 and Lectio for Families (24-7 Prayer)

**Who.** Launched in Advent 2019 by the 24-7 Prayer movement for ordinary
Christians across traditions; free and donor-supported. The benchmark file
already records its reported reach (past 2 million downloads, about 330,000
monthly users, *company figures*).

**How it is organized.** Three times of day, each with its own fixed shape:

- **Morning, P.R.A.Y.:** Pause, Rejoice and Reflect, Ask, Yield. A Salvation
  Army reviewer describes the order closely: the opening Pause offers the same
  prayer each day; Rejoice begins with a psalm and then the day's main
  Scripture; Ask poses two questions, one about applying the passage to
  yourself and one about praying for others; Yield rereads the passage and
  closes with a prayer of surrender; every day ends with the same Trinitarian
  closing prayer.
- **Midday:** the Lord's Prayer, with a focus on compassion and intercession.
- **Night (added March 2021):** an Examen in four movements, given on the
  official site as Relinquish stress, Rejoice in God's presence, Repent for
  shortcomings, Rest in his peace; shorter than the morning, using ancient
  prayers, hymns old and new, and short passages.

**Signature features.** Read or listen; the reflection is read aloud by its
author over an instrumental soundtrack; a week can be downloaded for offline
use; a 30-day archive lets a reader catch up. Series follow the church year
(Lent, Easter, Pentecost, Advent). **Lent 2026's series was "Wisdom in the
Desert," on the Desert Fathers and Mothers**, which is the church's long memory
used as the season's teacher.

**Lectio for Families** takes the same P.R.A.Y. pattern to children of about 7
to 11: a daily reading, a weekly memory verse, questions "to pause and talk
about," a special Sabbath prayer on Sundays, and occasional pauses in the
pattern "to celebrate heroes of the Christian faith." It comes as text and
audio: a family can listen together and pause to talk, or read it aloud "by
passing the device around." Its own suggestion is the dinner table, the car, or
bedtime, in five to ten minutes.

**How it holds people.** The frame and the hour. A prayer-app directory review
describes it as free "with no upsell and no streak guilt" (secondary; I could
not confirm the absence of a streak from Lectio's own pages). The 30-day archive
means a missed day is something to return to, not something lost.

**Steal.** The morning, midday and night trio, each with its own short frame.
The same opening prayer every day. Ask split into self and others. Yield as a
second reading of the same passage. The night Examen in four plain verbs.
Seasons that teach through the church's own history. The family version's
passed-around device and its Sunday difference.

**Weak.** An app first; the web site is a door to the stores. Devotional warmth
without the hard questions or the history behind the practices it borrows
(benchmark's verdict, still true). Many writers, so no single voice.

### 1.3 Sacred Space (Irish Jesuits, with Loyola Press since 2014)

**Who.** Started in 1999 in the Jesuit Communication Centre in Ireland by Alan
McGuckian SJ and Peter Scally SJ, the oldest daily-prayer site in this cluster;
now in about fifteen languages, a yearly printed prayerbook, and an app.

**How it is organized.** One prayer a day in **six stages**, in order: Presence
of God, Freedom, Consciousness, The Word, Conversation, Conclusion. The app's
listing calls each stage "a kind of exercise," beginning with preparing body and
mind ("becoming present through connecting with your breath, body, sounds") and
culminating in reflection on a Scripture passage chosen for the day. A sample
day has Freedom asking to let go of prejudice and narrow-mindedness and
Consciousness acknowledging one's fragility; the Conclusion thanks God for the
time and ends with "Amen." Each week also has a topic.

**Signature feature: every day is a page with an address.** The web prayer for
16 May 2026 lives at `sacredspace.com/daily-prayer/2026-05-16`. A day can be
linked, sent, printed, and found again.

**Look.** The site and app carry Scripture from the NRSV Updated Edition and
write the prayers in the first person "for doing, not reading aloud." I did not
see the interface itself.

**Steal.** The dated address per day. Stages that prepare the reader before the
text (presence, freedom) and a conversation after it. A web page, not an app,
as the primary home.

**Weak.** The preparatory stages lean toward a generic interior calm that a
skeptic could read as therapy; little Scripture beyond the day's passage; no
teaching.

### 1.4 Reimagining the Examen (Loyola Press, from Mark Thibodeaux SJ)

**Who.** People who want to pray the Ignatian Examen in the evening. Built in
February 2016 from Thibodeaux's book; he had kept themed Examens in a Word
document that he prayed from on his iPhone, and Loyola Press turned it into the
app. Free on iOS and Android.

**How it is organized.** Two doors: **choose an Examen that matches your current
state**, or pray the day's scheduled one. More than thirty themed versions
(relationships, a pending decision, a time of transition, gratitude, and
others). Every version walks the same **five steps**: gratitude for the day's
good moments; asking the Spirit to guide the review; reviewing the day;
repenting of mistakes; resolving to live tomorrow well.

**Signature interaction.** The frame stays fixed and the questions change with
the reader's state. A 2016 review noted that the app "takes up the entire
screen and hides notifications," with adjustable text size and optional
background music.

**Steal.** Choose by what kind of day it was, not by topic. Five steps that never
change. A screen that asks nothing else of you while you pray.

**Weak.** An app only; nothing kept between nights; no way to see last week's
resolve beside tonight's review.

### 1.5 The daily-office family

**Venite** (read in source). The home screen is titled **"Pray the Office"**: a
day name (with the Proper of the week), the liturgy, the calendar, and one
**Pray** button. The default office is chosen by the clock: in
`liturgy-select.component.ts`, `liturgyOfTheHour()` returns Morning Prayer from
4 to 11, Noonday Prayer from 11 to 2, Evening Prayer from 2 to 8, and Compline
otherwise, and a second function honors the reader's own ranges, set under
"Default Times for Liturgies." Its display settings
(`ldf/src/display-settings.ts`) are a short catalogue of what a praying reader
needs: drop caps, responses in bold, antiphons, font scale (S to XXL), Garamond
or Gill Sans, an **"ecru"** theme beside light and dark, verse numbers off by
default for psalms and readings, **"hideRubrics"** for the reader who has
learned the instructions, and read-aloud settings: a voice, a rate of **0.85**,
a background of silence, seashore, garden or night, and a **"Psalm Pause" of
1000 milliseconds**. The Meditate page is a timer colored by the liturgical
color of the day with a **singing-bowl** bell (`assets/audio/singing-bowl.mp3`).
The **Prayer List** page says: "You can use this area to take notes on prayer
intentions. The list will appear during the Daily Office, under the Prayers &
Thanksgivings," with the placeholder "I am praying for..." Reminders come with
presets: "Morning & Evening Prayer," "Daily Office," "Angelus Bells." The
author's own README calls the codebase "old and brittle"; the ideas are better
than the code.

**Church of England: Time to Pray and Daily Prayer.** *Time to Pray* is free and
gives two short services: Prayer During the Day ("suitable for any time of
day") and Night Prayer (Compline), with readings, psalms and prayers that vary
with the season and the weekday, **full audio for each service**, a setting for
**the time the app shifts from Day to Night**, reminders for one or more
services, text size, a night theme, and the option to change the psalm or
reading from the defaults. *Daily Prayer* gives the full Morning and Evening
Prayer in traditional and contemporary language.

**Universalis** (since 1995, founder Martin Kochanski). Every hour of the
Liturgy of the Hours and the Mass readings for every day. The listing's key
claims: it **works out each day's content itself** so the reader never handles
the calendar; any date past or future can be opened; local calendars by country
and diocese; built in, so it needs no connection; a one-time purchase (audio of
the full Hours is a subscription); fonts, text size, dark and light, page-turning
or scrolling. About 8,455 ratings averaging 4.9 on one storefront *(listing
figure)*.

**Mission St. Clare.** A plain web site whose purpose is stated in one line: to
give "busy people a way to particpate [sic] in Morning and Evening Prayer
including the readings and psalms for each day (along with a bit of music!)."
Also Noonday Prayer, Compline, and **Devotions for Individuals and Families**, in
English and Spanish, with a calendar for Rite I or Rite II.

**dailyoffice2019.com** (ACNA, 2019 Book of Common Prayer). A free web app that
**opens to the current day and office automatically**, with Morning, Midday,
Evening and Compline and many settings for reading cycles.

**Divine Office.** Official text and audio of the Roman Liturgy of the Hours;
downloads each day's offices automatically; and a feature users praise: a view
of **locations where other Christians are praying with you at the same time**.

**The source pattern behind all of them.** The 1979 Book of Common Prayer's
*Daily Devotions for Individuals and Families* (retained as "Family Prayer" in
the 2019 book) gives four very short forms, In the Morning, At Noon, In the
Early Evening, At the Close of Day, each a miniature of one office. That is the
church's own answer to "the full office is too long for a household."

**Steal from the family.** The hour picks the door. The calendar does the
arithmetic. Any day is reachable. The reader's prayer list appears inside the
office. A short form exists for households. Read-aloud slowed down, with a pause
between psalm verses. Hidden rubrics once learned.

**Weak.** Dense settings screens (Venite's editor, bulletins and organizations
show a product that grew toward parish administration); little teaching; most
assume the reader already belongs to a liturgical church.

### 1.6 Hallow (Catholic)

What `A-courses-learning.md` already covers (Pray40, the great book beside
Scripture, the Activity screen's streaks and minutes, celebrity guides, the
paywall, Mozilla's "A little creepy") is not repeated. New here:

- **Length chosen up front.** The App Store listing offers "3 different lengths
  for every prayer (typically 5, 10, or 15 minutes)"; Hallow's features page now
  speaks of options from 1 to 60 minutes.
- **Background.** "Calming background music like Gregorian Chant"; the site says
  more than ten background options.
- **"Journal after every prayer,"** and Prayer Families where members share
  prayers, intentions or journal reflections with family, friends, or a parish.
- **Free floor.** Daily prayers (including the rosary) and a 9-day intro
  challenge are free; the rest needs a subscription.
- **Look.** America magazine's 2021 ranking called it the most attractive
  Catholic app, for "minimalistic, colorful images" and a "breathable layout";
  a second reviewer called it a "Spotify design-inspired package." A
  screen-design archive shows a dark home with a central hero image. A product
  analysis says it borrowed the interface grammar of Calm and Headspace.
- **Data.** Coverage of BuzzFeed News's 2021 investigation of Pray.com named
  Hallow, Bible Gateway and Glorify among popular prayer apps that send user
  data to third-party attribution vendors *(secondary coverage)*.

**Steal.** The length chosen before you begin, stated in minutes. The journal
offered after the prayer, not before.

**Weak.** The wellness grammar (hero art, background music, minutes prayed)
makes prayer feel like a meditation product; streaks; paywall; data.

### 1.7 Abide

**Who.** Christians who want guided "Christian meditation" and help sleeping.
The developer lists 2,000+ Scripture-based meditations, 365+ bedtime stories,
Bible book audio guides and NIV audio; a listing says sessions can be chosen
from 2 to 15 minutes; there is a journal; $39.99 a year after a seven-day trial
*(developer claims)*.

**Steal.** Session length as the reader's choice.

**Weak.** Scripture as a sleep aid ("bedtime stories" built on Scripture to help
you "drift off") is the clearest example in this cluster of the text becoming
ambience. Subscription on the core.

### 1.8 Glorify

**Who.** Protestant daily devotion, freemium.

**How it works.** A ten-minute daily sequence: an inspirational quote, a Bible
passage, a written devotional that ties them together, and an audio "Daily Walk
with God." One review calls the main Daily Worship screen "a clear checklist"
that tracks completed items. ScreensDesign's teardown counts five onboarding
steps ending in a "Plant a new seed" animation and a soft paywall with a
seven-day trial; Glorify's help center says the Daily Devotional and the Bible
stay free without a subscription. Its CEO, Henry Costa, states the design
philosophy plainly: **"Build for habit, not hook. We're not trying to create
dependency, we're trying to support consistency."** A Portuguese-language guide
says the app tracks a sequence of completed meditations, and a podcast
write-up has Costa on "habit tracking and game-like features" for community.

**Steal.** The sentence "habit, not hook," as a test to hold the whole product
to. The fixed order of the session.

**Weak.** The quote comes before Scripture (the YouVersion partner rule
`A-courses-learning.md` rejected); the checklist turns a quiet time into a
to-do list; a growth animation and sequence tracking contradict the stated
philosophy.

### 1.9 Calm

**Who.** The mass-market wellness reader.

**How the daily works.** The Daily Calm (now "Calm Dailies") is a new session
every day, and Calm's help center ties it straight to the counter: listening
daily "is the perfect way to build your Calm Mindfulness Streak," and Dailies
need Premium. The Profile shows streak, total mindful minutes and history on a
calendar; the streak counts meditations, Sleep Stories, Breathe Bubbles, The
Spark, Calm Body and Masterclasses.

**Check-Ins.** Four kinds: Mood ("choosing from a dozen different moods"),
Sleep, Gratitude (up to three reasons), and a Mindfulness reflection tied to
that day's Daily Calm. **Check-Ins do not count toward the streak.**

**Research it funded.** Stecher, Sullivan and Huberty (JMIR mHealth and uHealth,
December 2021) randomized Calm users to a personalized anchor ("after I do X"),
a fixed anchor, or control, all with reminders, for eight weeks, then followed
for eight more. The preprint's reported conclusion: the fixed-anchor group
meditated more persistently, and those who kept to their anchor most often
persisted most *(read through abstracts and a search summary; the abstract's
group sizes do not add up, so check the paper before citing)*.

**Steal.** The reflection tied to the day's content. The anchor research.

**Weak.** The daily content exists to feed the streak; the mood picker invites
the reader to label herself daily.

### 1.10 Headspace

**Today, by time of day.** Headspace's help center says the Today tab sorts its
content by time of day and marks activities complete automatically, and that
**finishing activities in any order, or only part of them, "won't hurt your run
streak or stats."** Apple's developer feature on the redesign says user research
led the team to strip away layers of menus and give one-tap access to morning,
afternoon and night.

**The onboarding lesson.** Irrational Labs' redesigned onboarding more than
doubled course starts and raised app opens and unique open days, but did **not**
produce a statistically significant rise in active meditation days; their
conclusion is that habit needs design across the whole experience, not at the
door. An earlier Headspace onboarding change, per Appcues' teardown, raised
session one and home views and left week-two retention unchanged.

**Notifications.** Separate *Reminders* (a set time) and **Mindful Moments**
(short reflective messages through the day, switched on in settings). Headspace's
May 2026 Apple Watch release goes further: with permission, it reads Apple
Health data such as heart-rate variability "to find moments when members are
more receptive" to a break.

**A critic's line.** A Pratt design critique (February 2026) argues that streaks
move the user's model from "I meditate to feel better" to "I meditate to protect
a number" (paraphrase).

**Steal.** The day sorted by its hours. "Any order, or only part" as a stated
rule. The finding that starts are not practice.

**Weak.** Biometric timing of nudges is persuasion aimed at the moment of least
resistance. The streak survives every redesign.

### 1.11 Waking Up (Sam Harris)

**How it is organized.** Practice (a Daily Meditation and courses, including a
28-part Introductory Course), Theory (short talks, conversations, Q&A), and a
timer for unguided sitting. Release notes add a **countdown timer, a starting
bell and an ending bell** to the Daily Meditation, then to any session; a
session can be **extended**, and "extending a session turns off autoplay."
Daily Meditations and Moments are no longer auto-named with the date they were
heard.

**Notifications inside a window.** Three kinds, each opt-in: Moment (short audio
reflections through the day, by push or email), Daily Quote, and Meditation
Reminder, with **a time range during which notifications may appear**, "so
notifications stay supportive rather than intrusive." Stats: sessions completed,
minutes in the app, minutes meditating.

**Money.** A subscription, but "free for anyone who can't afford it" ("We never
want money to be the reason someone can't benefit from our app"), by request.

**Steal.** The window. The bell at both ends. Extending a sitting without
penalty. Theory beside practice. The scholarship sentence.

**Weak.** Autoplay is the default it has to switch off; minutes counted.

### 1.12 Medito (added; open source)

**Who.** A nonprofit meditation app: "Free forever. No ads. Not-for-profit."
Read in source (`lib/l10n/app_en.arb`).

**What the strings show.**
- **A first session sized to succeed:** "Just over 2 minutes," then "That's it.
  You just meditated."
- **Reminders by part of day:** "When will you meditate?" with chips Morning,
  Afternoon, Evening, Night, "Pick my own time."
- **A permission primer that argues:** "One quick thing ... Say yes so that we
  can send you a daily nudge to meditate"; "People who set a reminder are far
  more likely to meditate regularly"; "Enable notifications so you never miss a
  session."
- **The full streak apparatus:** "Current Streak," "Longest Streak," "Always
  show streak on homepage," "Practicing daily grows your streak, but it also
  makes you more mindful and happier!", streak freezes earned at seven days,
  "You missed a day ... Would you like to use one to protect your current
  streak?"
- **The repair desk:** "My stats are wrong ... You can edit them at the
  dedicated stats editing page"; "Restore previous stats," keeping "the most
  recent 20" snapshots.
- **Gating:** "Complete previous steps to unlock."
- **A post-session question:** "How do you feel after this session?"; a
  "Journal Entry" step.

**Steal.** The two-minute first session. Reminders by part of day. Plain words.

**Weak.** Even a nonprofit with no investors adopted streaks, freezes, locks and
a persuasive permission primer. That is the clearest sign in this cluster that
the streak is a default the industry reaches for, not a necessity of the
practice, and that it creates work (freezes, edits, restores) that has nothing
to do with meditating.

### 1.13 Day One (journal)

**What it does well.** A **daily prompt** from a curated set that rotates every
24 hours, with "view recent prompts" and "answer again," and optionally sent as
a notification. **On This Day:** entries from the same date in earlier years,
from a widget or the journal pane. **Reminders linked to a template**: tapping
the reminder opens that template as the new entry. Premium users can journal by
replying to a text message. **End-to-end encryption on by default** for new
journals since version 4.2, with the key held on the device; the free tier keeps
data locally. There is a Streak widget.

**Steal.** On This Day as the return of the reader's own words. A reminder that
opens straight into the right place. Privacy stated as a pledge and built in.

**Weak.** The streak widget; prompts that are generic by design.

### 1.14 PrayerMate (added)

**Who.** Christians keeping a prayer list; a ministry of a UK charity per one
directory; free with optional patron support.

**How it works.** Each day it picks one person or topic from each of the
reader's categories and shows them as swipeable cards. Items can be scheduled by
date, by weekday or day of the month, or "**just whenever they haven't been
prayed for in a while**." Churches and charities publish feeds (missions,
persecuted-church agencies, Operation World) that arrive as cards. A reviewer
calls the rotation "the killer feature."

**Steal.** Rotation by neglect rather than by score. One card per category.

**Weak.** Feeds from organizations turn a private list into an inbox.

### 1.15 Stoic (added, brief)

A journaling app built around a **morning** (planning, intentions) and an
**evening** review, with mood tracking and short exercises; newer listings add
AI features. **Steal:** morning prepares, evening reviews. **Weak:** mood
tracking as the backbone; AI in the journal.

### 1.16 Pray.com (added, as a warning)

BuzzFeed News reported in 2021 that Pray.com shared granular data about the
content its users consumed with other companies, including Facebook, and had
bought files about its users from data brokers before adding that to its
policy; a separate 2020 report found user data exposed *(secondary coverage via
NPR, Yahoo and CathNews)*. Its spokesperson said it does not share users'
prayers "for commercial purposes." Nothing here to steal; the lesson is about
what a prayer page must never carry.

### 1.17 The comparison at a glance

| Product | Fixed frame | Length | Scripture heard how | Reader's response | What brings them back | Money |
|---|---|---|---|---|---|---|
| Pray As You Go | Music, Scripture, questions, music | 10 to 13 min | Read slowly, reportedly twice, long pauses | Silent prayer; nothing kept | The commute; the frame | Free (donations) |
| Lectio 365 | P.R.A.Y.; midday Lord's Prayer; night Examen | Short; night shorter | Read by its author over instrumentals; passage reread in Yield | Ask for self and others | Three hours of the day; seasons; 30-day catch-up | Free (donations) |
| Sacred Space | Six stages | Self-paced | Text (NRSVue) | Conversation stage | A dated page each day | Free (Jesuits) |
| Reimagining the Examen | Five steps | Self-paced | Little | Review of the day | Choose by state | Free |
| Venite / Time to Pray / Universalis | The office | By office | Text; device voice at 0.85 with psalm pauses (Venite); recorded audio (Time to Pray) | Prayer list inside the office | The clock and the calendar | Free or one-time |
| Hallow | Varies by program | 5/10/15 (now 1 to 60) | Recorded, with chant or music | Journal after every prayer | Seasons, streaks, groups | Subscription |
| Calm | Daily session | About 10 min | Narrated | Check-ins | Mindfulness Streak | Subscription |
| Headspace | Today by time of day | Varies | Narrated | Little | Run streak, reminders, Mindful Moments | Subscription |
| Waking Up | Daily Meditation, Theory | Extendable | Narrated; bells | Little | Reminders inside a window | Subscription, scholarships |
| Medito | Packs, steps | From 2 min | Narrated | "How do you feel?", journal step | Streak, freezes, reminder chips | Free (donations) |
| Day One | Templates, prompts | n/a | n/a | Entries | Prompt, reminder, On This Day, streak widget | Freemium |
| PrayerMate | Cards per category | Self-paced | n/a | Prayed / answered | Rotation by neglect | Free |

---

## 2. Where habit forms and where it presses: four tests

The research gives four tests that separate a rhythm from a hook. They are the
working form of MASTER-PLAN's "position, not performance."

**1. Does the mechanic measure the practice, or the person?** A dated page, a
psalter that moves through the month, a season with a first day: these describe
where the *church* is. Streaks, minutes and "Goals Completed" describe the
*reader*. Calm's own help pages show the difference by accident: its
Check-Ins, the closest it has to reflection, "do not count toward your
streak." What counts in a product is what it is for.

**2. Does a missed day create a debt?** The best evidence on habit formation
(Lally and colleagues at UCL, *European Journal of Social Psychology*, 2010, read
through UCL's announcement and secondary write-ups) is that missing one
opportunity "did not significantly impact the habit formation process," while
long gaps and chronic inconsistency did; the oft-quoted 66 days is a median for
the participants whose curves fit, with a wide range. A product that answers a
missed day with "You missed a day ... use a streak freeze?" (Medito) has turned
a harmless gap into a loss to manage. One that answers with a 30-day archive
(Lectio) or "any order, or only part" (Headspace's stated rule) has not.

**3. Who chose the interruption, and when?** The research favors an anchor the
reader keeps (Stecher 2021: fixed anchors persisted best, and adherence to the
anchor mattered most). Waking Up lets the reader set the window in which any
notification may arrive. Headspace's 2026 watch reads heart-rate variability to
find the moment the reader is most "receptive." The first respects a choice;
the last chooses for her.

**4. Would it still make sense if nobody ever saw the number?** Glorify's CEO
says "habit, not hook," and the app still plants a seed and tracks a sequence.
Medito's users edit their stats. If a mechanic's value depends on being seen, by
the reader or anyone else, it is performance. The office family needs no number
at all: the frame and the hour are the habit.

Amber Case's *Calm Technology* (O'Reilly) gives the design rule that follows:
technology "should require the smallest possible amount of attention," should
"inform and create calm," and should use the periphery. A prayer page that is
quiet until the reader comes to it, and then asks for nothing but attention to
the text, meets that rule.

---

## 3. The patterns most worth bringing to LiveWell, ranked

Ranked by value to LiveWell's readers (the skeptic winning ties), weighed
against effort. **Fit:** core (the redesign should not ship without it), strong
(clearly right; schedule it), maybe. **Effort:** S is days, M a unit of one to
two weeks, L several units. Every pattern obeys MASTER-PLAN section 2: no
accounts, no scores, personal state on the device through `lib/storage.ts` and
said plainly, shareable state in the URL, tokens only, the BSB on household
surfaces, literal `SEOMeta`, and "one in, one out."

The first pattern proposes a new surface, so its subtraction is named now: a
daily prayer page **folds in** the daily-habit pieces that today stand alone
(the *Today in Proverbs* widget MASTER-PLAN 3.2 already moved off Home, the
Prayer Planner's "today's names," the Worry Journal's bedtime step, and the
Examen how-to's practice). The tool routes stay, because tools never redirect;
they become the office's parts rather than separate doors in the Resources list.

### 1. The office shape: a fixed frame with a changing center

*Seen in:* Lectio 365 (P.R.A.Y.; the same opening and closing prayer every day),
Sacred Space (six stages), Reimagining the Examen (five steps), the Prayer Book
offices in Venite, Time to Pray and Universalis, Pray As You Go (music,
Scripture, questions, music).

**What it is.** A short service whose order never changes and whose content
changes every day from a calendar.

**Why it works.** The frame removes every decision but one (to begin), so the
reader's attention goes to the text. The changing center keeps it from becoming
rote. The frame is the church's, so the product borrows two thousand years of
use instead of inventing a ritual. And it is the honest answer to James's
"interactive": the page walks the reader through, step by step, and asks her to
do something at each step.

**On LiveWell.** `/pray` (working name; the door it sits behind is a question for
James, section 7) with two offices, *Morning* and *Close of Day*, each one step
per screen on the existing `Stepper`, the way Table mode already works.

- *Morning* (about 10 minutes): a fixed opening verse; the psalm for the day
  from the Prayer Book's thirty-day psalter (BSB text from
  `client/public/bible/text/psalms/`); the day's reading from the 2027
  whole-story plan (U28), so the office and the plan are the same reading; one
  question from that chapter's Study Bible notes; the Lord's Prayer (Matthew
  6:9-13); today's names from the Prayer Planner (pattern 6); a fixed closing
  prayer.
- *Close of Day* (about 7 minutes): a Compline psalm (pattern 14); the Examen
  (pattern 5); Psalm 31:5 ("Into your hands I commit my spirit"); the song of
  Simeon (Luke 2:29-32); a fixed blessing.

Every fixed text is Scripture or a historic prayer quoted verbatim with its
source; nothing is invented. The frame's wording is James's to approve once.

**Fit:** strong. **Effort:** M (code over existing data; a small amount of
frame text for James to approve once).

**Evidence:** Lectio 365 official site and the Salvation Army review; Sacred
Space listing and dated pages; Reimagining the Examen terms page; Venite source;
Time to Pray listing; Pray As You Go's own description.

### 2. Mercy built in: dated by the calendar, never by the reader's chain

*Seen in:* Lectio 365's 30-day archive and "no streak guilt" (secondary);
Headspace's "any order, or only part" rule; Universalis and Venite opening any
date; Hallow's join-late seasons (A-courses-learning); Lally 2010 on the missed
day. Shown by its absence in Medito's freezes and "You missed a day."

**What it is.** The rhythm is set by the calendar, so a reader who comes back
after three days simply prays today's office. Nothing has fallen behind.

**Why it works.** It removes the shame of the gap, which the research says is
harmless if it stays a gap, and it keeps the habit's anchor (the hour, the date)
instead of a chain that one bad week breaks.

**On LiveWell.** The office never says how many days were missed and never
counts kept days. On return after a gap it says only what day it is ("Thursday
in the third week of Advent") and, if this device has a last date, "Last here:
Monday" as position. The same rule governs The Table and the story plan, where
MASTER-PLAN already applies it; this file adds the office.

**Fit:** core. **Effort:** S (a rule and copy).

**Evidence:** Lally via UCL and The Behavioral Scientist; Headspace help center;
Lectio app archive (via search summary); Medito strings.

### 3. The hour decides the door

*Seen in:* Venite's `liturgyOfTheHour()` and "Default Times for Liturgies"; Time
to Pray's setting for when Day becomes Night; dailyoffice2019 opening on the
current office; Headspace's Today tab sorted by time of day; Medito's reminder
chips by part of day.

**What it is.** The page opens on the office that fits the clock, with the other
one a tap away.

**Why it works.** It answers "what should I do now?" before it is asked, and it
ties the practice to a time of day, which is the anchor the habit research
favors.

**On LiveWell.** `/pray` opens on Morning from 4 a.m. to 2 p.m. and on Close of
Day after that, computed after mount from the device clock (never the network,
per the first-paint rule), with a plain switch, "Morning · Close of Day," at
the top. A reader can change the turn-over hour once; it is kept on the device.
Home is not changed: its one "Tonight" line stays as MASTER-PLAN 3.2 sets it.

**Fit:** strong. **Effort:** S.

**Evidence:** Venite source (`pray-menu/liturgy-select/liturgy-select.component.ts`,
`assets/i18n/en.json`); Time to Pray listing; Anglican Network on
dailyoffice2019; Headspace help center and Apple's developer feature; Medito
strings.

### 4. Scripture paced for prayer: slower voice, pauses, read twice, a bell

*Seen in:* Venite's read-aloud (rate 0.85, "Psalm Pause" of 1000 ms, a
background of silence, seashore, garden or night) and its singing-bowl timer;
Pray As You Go's slow reading, long pauses and (reportedly) the passage read
twice; Lectio's Yield, which rereads the passage; Waking Up's countdown with a
starting and ending bell; Time to Pray's full audio; Lectio's reflection read by
its author.

**What it is.** Listening built for prayer rather than for information: a slower
voice, a breath between psalm verses, the reading heard twice with a silence
between, and a bell that marks the start and end of a silence.

**Why it works.** Reading speed is the enemy of attention to the text. A second
hearing is when a phrase catches. A bell lets the reader close her eyes without
watching a clock.

**On LiveWell.** Extend the existing `ListenButton` (device voice, nothing sent)
with a *prayer pace* used only inside `/pray` and Table mode: rate about 0.85,
a pause at each psalm half-verse and verse, and the day's reading spoken twice
with a silence between. A "Be still" step offers one, two or five minutes of
silence (Psalm 46:10 above it), with a soft bell at both ends, the screen kept
awake through the existing `useWakeLock`, and no animated ring (a plain
remaining-time line; nothing moves under reduced motion). Silence is the default
background; no music. **The James option:** because the frame is fixed, a
recording of its fixed parts (opening, Lord's Prayer, closing, blessing) in
James's own voice is a one-time cost of perhaps twenty short clips that every
day reuses, while the changing psalm and reading stay with the device voice.
Lectio shows that the author's voice is what readers name. That is a question
for James, not a unit's decision.

**Fit:** strong. **Effort:** M (S for the pace and bell; the recording is a
James gate).

**Evidence:** Venite `ldf/src/display-settings.ts`, `app/src/assets/audio/`,
`app/src/app/meditate/`; Pray As You Go reviews and the RAPT commentary;
Lectio review and directory; Waking Up release notes; Time to Pray listing.

### 5. The Examen as an instrument, chosen by the kind of day it was

*Seen in:* Reimagining the Examen (choose by "current state" or the day's
scheduled one; five fixed steps; full screen, notifications hidden); Lectio 365
night prayer (four verbs); Pray As You Go's Examen; Stoic's evening review.

**What it is.** The five steps never change; the questions inside "review the
day" change with what kind of day the reader says it was.

**Why it works.** It meets the reader where she actually is (worn out, afraid,
after a fight, facing a decision, grieving, grateful) without labelling her or
scoring her mood, and the unchanging frame carries her through a night when she
has nothing to say.

**On LiveWell.** In Close of Day, the Examen step opens with "Tonight I am
coming to this ..." and six plain choices (tired; anxious; after a conflict;
facing a decision; grieving; grateful), or "Just the usual questions." The
choice changes two or three review questions and one Scripture line, never the
five steps. Nothing about the choice is stored. The questions are adapted from
LiveWell's own Examen how-to, which gains a "Pray it now" door to this step. The
Worry Journal's sorting ("what is mine to do, what is not") becomes the
"anxious" variant's review. Grief and conflict variants keep Find Help one tap
away, per the care rules in CLAUDE.md.

**Fit:** strong. **Effort:** M (about thirty short questions for James to
approve).

**Evidence:** ignatianspirituality.com app page, App Store listing, terms page,
CatholicMom review; Lectio 365 night prayers announcement; Stoic listing.

### 6. The prayer list appears inside the prayer

*Seen in:* Venite ("The list will appear during the Daily Office, under the
Prayers & Thanksgivings"; "I am praying for..."); PrayerMate's rotation "whenever
they haven't been prayed for in a while"; Lectio's Ask, split into self and
others.

**What it is.** The reader's own list surfaces at the intercession step of the
office, so the list is prayed, not just kept.

**Why it works.** A list kept in a separate tool is a list one forgets to open.
Inside the office it arrives at the moment it is needed, and the rotation keeps
a long list from becoming a wall.

**On LiveWell.** Morning's "Ask" step reads `livewell-prayer-planner` (already on
the device) and shows today's names as quiet lines, with "Add a name" inline and
"Answered" opening the planner's existing dated record. If the list is empty,
the step shows one line ("For whom will you pray today?") and the link to the
planner, nothing more. No "prayed" tally is shown in the office.

**Fit:** strong. **Effort:** S.

**Evidence:** Venite `prayer-list/` and i18n strings; PrayerMate App Store
listing, Challies and Learn of Christ reviews; Lectio review;
`client/src/pages/tools/PrayerPlanner.tsx`.

### 7. Every day is an address; yesterday and tomorrow are links

*Seen in:* Sacred Space (`/daily-prayer/2026-05-16`); Universalis (any date);
Venite's date fields; Lectio's 30-day archive; Mission St. Clare's calendar.

**What it is.** Each day's office has its own URL.

**Why it works.** A pastor can send "tomorrow morning's prayer" on Saturday
night; a reader can pray yesterday's psalm she missed; a skeptic arriving from a
link sees exactly what Christians prayed that day. Missed days become pages, not
debts.

**On LiveWell.** `/pray/2026-11-29/morning` and `/pray/2026-11-29/evening`, with
`/pray` resolving to the current one (as `/family/tonight` already does for the
Table). "Previous day" and "Next day" sit at the foot. The URL carries the day
and office only; nothing personal. The param route goes through MASTER-PLAN
9.3's checklist, since `prerender-heads.mjs` skips paths with `:`.

**Fit:** strong. **Effort:** S to M.

**Evidence:** Sacred Space dated pages; Universalis listing; Venite source;
Lectio archive.

### 8. Honest length, chosen before you begin

*Seen in:* Hallow (5, 10 or 15 minutes; now 1 to 60); Abide (2 to 15); Pray As
You Go (10 to 13, stated); Lectio for Families (5 to 10); Medito's "Just over 2
minutes"; the Prayer Book's short Daily Devotions beside the full offices.

**What it is.** The reader sees how long it takes and can pick a shorter form.

**Why it works.** It removes the fear that this will take more than she has, and
a short form on a hard day keeps the anchor without the guilt.

**On LiveWell.** Each office offers *Full* (about 10 minutes) and *Short* (about
3 minutes: one psalm verse, the Lord's Prayer, one name, the closing), stated as
which parts are included ("Short: a verse, the Lord's Prayer, the blessing").
No progress bar; the Stepper's "Step 3 of 7" is position and is enough.

**Fit:** strong. **Effort:** S.

**Evidence:** Hallow App Store listing and features page; Abide listings; Pray
As You Go description; Lectio for Families; Medito strings; BCP Daily Devotions.

### 9. Reminders the reader owns: an anchor, a window, her own calendar

*Seen in:* Waking Up (a time range for any notification); Medito's chips by part
of day; Day One reminders that open straight into a template; Time to Pray
reminders per service; Venite's presets ("Morning & Evening Prayer," "Angelus
Bells"); Stecher 2021 on fixed anchors.

**What it is.** The reader names when and after what she will pray, and the
reminder lives in her own calendar, opening straight to the right office.

**Why it works.** An anchor ("after I pour the coffee") is what the trial found
persisted. A calendar event the reader made is hers to move or delete; it cannot
escalate or be tuned against her.

**On LiveWell.** `lib/calendar.ts` already builds a reminder with no push and
nothing sent to LiveWell. On `/pray`, "Remind me" offers Morning or Close of Day,
a time, and an optional anchor line written into the event ("After breakfast:
Morning Prayer"), linking to `/pray` so it resolves to that day's office. Never
web push, never a permission primer, never a second reminder if the first is
ignored.

**Fit:** strong. **Effort:** S (the helper exists).

**Evidence:** Waking Up "More" page and Moments help; Medito strings; Day One
reminders and templates post; Time to Pray listing; Venite i18n; Stecher et al.
2021; `client/src/lib/calendar.ts`.

### 10. Seasons that teach, with the church's dated witnesses

*Seen in:* Lectio 365's Lent 2026 "Wisdom in the Desert" (the Desert Fathers
and Mothers); Lectio for Families' pauses for "heroes of the Christian faith";
Hallow's great book beside Scripture (A-courses-learning); the offices' own
seasons.

**What it is.** In Advent and Lent the office carries one short, verbatim,
dated voice from the church's history each day, beside the psalm.

**Why it works.** The season gives a start date and an end (the closing rite
A-SYNTHESIS asks for), and the witness is the thing no other Protestant daily
prayer product does: the church's long memory, sourced and checkable, at the
reader's own table. It is the history course meeting the prayer life.

**On LiveWell.** A "The church remembers" line below the psalm in season, drawn
from the history registry (U49) and verified like every source there: in Lent,
sayings of the Desert Fathers; in the last week of Advent, the ancient "O"
antiphons that the Western church has sung on the days before Christmas (each
date and text to be verified before use). Outside the seasons the slot is empty
rather than filled.

**Fit:** strong. **Effort:** M (source verification is the work).

**Evidence:** Lectio 365 listing and faith.tools (Lent 2026 series); Lectio for
Families official page; A-courses-learning 2.11.

### 11. A reading room for prayer: rubrics that can be hidden, responses in bold

*Seen in:* Venite's display settings (responses bold, drop caps, ecru, font
scale, "hideRubrics," verse numbers off for psalms); Universalis (fonts,
page-turning or scrolling); Reimagining the Examen (full screen, nothing else
asks for attention); Pray As You Go's dark interface and larger text.

**What it is.** The office set as a text to pray: the words to say large, the
instructions small and dismissible, nothing else on the screen.

**Why it works.** A first-time reader needs the instructions; the hundredth-time
reader needs them gone. Bold responses tell a household who says what.

**On LiveWell.** In `/pray`, the psalm and prayers in Cormorant Garamond at
reading size on cream; instructions ("Pause here," "Say together") in Inter,
0.75 rem, small caps, `--ink-muted`; a "Hide instructions" toggle kept on the
device; verse numbers off by default in psalms; lines said together in Inter
500. The header and footer recede to the compact page head; no related content,
no sign-up, no share bar inside the office. All tokens; new rules under a
`.pr-` prefix in `index.css`.

**Fit:** strong. **Effort:** S.

**Evidence:** Venite `ldf/src/display-settings.ts` and i18n display settings;
Universalis listing; CatholicMom on the Examen app; Pray As You Go listing.

### 12. A private line that comes back on its date

*Seen in:* Day One's On This Day and rotating daily prompt; Hallow's journal
after every prayer; Medito's journal step; LiveWell's own Worry Journal, which
lets the reader "later see how your worries turned out"; Day One's encryption
on by default.

**What it is.** One optional sentence at the end of Close of Day, kept on the
device, shown again on the same date next month or next year.

**Why it works.** It turns the Examen's "resolve" into something the reader can
look back on, and the return is the reader's own words rather than a count. It
is the deepest form of "remember" the cluster offers.

**On LiveWell.** After the Examen, one field: "One thing to carry into
tomorrow" (optional, skipped by default). Saved to `livewell-progress-pray-v1`
with the date, through `writeStoredJSON`, with the helper's standard save-failure
line. On a later Close of Day, if an entry exists for that date a month or a
year earlier, one quiet line: "On this night last year you wrote: ..." Never a
count of entries, never a calendar of filled days; "Export as text" and "Delete
all" beside it; and "Nothing you write here leaves this device" said at the
field. Never sent to telemetry.

**Fit:** maybe (strong if James wants the Examen). **Effort:** S to M.

**Evidence:** Day One On This Day guide, journaling tips, E2E FAQ and privacy
pledge; Hallow listing; Medito strings; `client/src/pages/tools/WorryJournal.tsx`.

### 13. The bedtime form for households

*Seen in:* Lectio for Families (P.R.A.Y. for ages 7 to 11; pass the device
around; a Sunday difference; five to ten minutes at the table, in the car, or at
bedtime); the BCP's Daily Devotions "At the Close of Day"; Pray As You Go's
material for children and families.

**What it is.** A three-minute close-of-day form a parent can lead at a bedside.

**Why it works.** The weekly Table carries teaching; a nightly form carries the
habit, which is what the parent research in `benchmark.md` says hands faith on
(talk about faith at home, often).

**On LiveWell.** `/pray?for=family` (or a Table-mode variant): one psalm verse,
"Where did you see something good today?" and "Is there anything you are sorry
for?", the Lord's Prayer, and the Aaronic blessing (Numbers 6:24-26), each step
labelled for "Grown-up reads" or "Everyone says," in table type. On Sundays the
form adds the week's catechism question. It links from `/family` beside
*Tonight at the table*, not instead of it.

**Fit:** maybe. **Effort:** S.

**Evidence:** Lectio for Families pages; Anglican Compass on BCP Family Prayer;
Pray As You Go 20th-anniversary note.

### 14. The church's memory as company, dated rather than counted

*Seen in:* Divine Office's view of people praying at the same time (the impulse,
not the form); Lectio's "50 million prayer times" (the form to refuse); the
offices' own antiquity.

**What it is.** In place of a crowd counter, one line that says who has prayed
these words before, and since when.

**Why it works.** The reader is told she is not alone, which is true, without a
number of people (which is applause and needs data). It answers the skeptic's
question "where does this come from?" in the same line.

**On LiveWell.** Under the Compline psalm, a line such as "Benedict's Rule
(about 530) appointed Psalms 4, 91 and 134 for the close of every day," or under
the thirty-day psalter, its origin in the Prayer Book tradition, each verified
before use against a primary text, as every history fact on the site is. Count
texts and years, never people.

**Fit:** maybe. **Effort:** S per line (verification is the cost).

**Evidence:** Divine Office App Store listing; Lectio milestone figure (via
search summary); A-SYNTHESIS tension 4 ("count things in the library ...
never people").

### 15. Free and private, said at the point of writing

*Seen in:* Pray As You Go ("always free, no subscription required"); Lectio
(free, donor-supported); Medito ("Free forever. No ads. Not-for-profit.");
Waking Up's scholarship sentence; Day One's privacy pledge. Shown by its
absence in Pray.com.

**What it is.** The prayer page states, where the reader types, that nothing
leaves the device and nothing is for sale.

**Why it works.** A reader praying for a marriage or an addiction needs to know
who else can read it. The skeptic needs to see that the piety is not a funnel.

**On LiveWell.** True already (no accounts, device storage). Make it visible: a
one-line note at the prayer list and the journal line, and in the office's foot
("Free to use and print. Nothing you write here leaves this device."). Keep
third-party scripts off `/pray` entirely; telemetry records only an
`office_complete` event with the office name, never text or names, through
`lib/telemetry.ts`.

**Fit:** core. **Effort:** S.

**Evidence:** Pray As You Go listing and JustGiving page; Lectio official site;
Medito strings; Waking Up App Store listing; Day One privacy pledge; NPR, Yahoo
and CathNews on Pray.com.

---

## 4. What to avoid

Each item would betray "Unhurried. Weighted. Grown-up." or the integrity rules,
and each is something seen in this cluster.

1. **Streaks in any costume.** Current and Longest Streak (Hallow, Medito),
   Mindfulness Streak (Calm), run streak (Headspace), the Streak widget (Day
   One), and the machinery a streak breeds: streak freezes, "You missed a day,"
   "Always show streak on homepage," edit-your-stats pages and stats snapshots
   (Medito). They measure the person, turn a harmless gap into a loss, and
   create work that is not prayer.
2. **Counting minutes, sessions or entries.** "Minutes Prayed," "mindful
   minutes," "Total Tracks Completed," "minutes spent meditating." A count of
   journal entries or kept days is the same thing in a quieter voice.
3. **Counting the crowd.** "1.91M joined" (Hallow), "50 million prayer times"
   (Lectio's milestone), a map of where others are praying (Divine Office).
   Applause in a library, and the map needs location data.
4. **Growth metaphors and checklists that reward attendance.** "Plant a new
   seed" and a sequence tracker (Glorify), a Daily Worship checklist that ticks
   off the quiet time. A devotion is not a to-do list.
5. **Locked steps.** "Complete previous steps to unlock" (Medito). Prayer is
   never gated behind completion.
6. **Persuasive permission primers and pushed nudges.** "Say yes so that we can
   send you a daily nudge," "so you never miss a session," "People who set a
   reminder are far more likely ..." (Medito); Mindful Moments that arrive
   unasked; and above all **biometric timing**, nudges sent when heart-rate
   variability says the reader is "more receptive" (Headspace, 2026). LiveWell
   sends nothing; the reader's own calendar reminds her.
7. **Scripture as ambience or sedative.** Bedtime stories built on Scripture to
   help a listener "drift off" (Abide); default background music under the
   reading (Hallow's chant, Calm's soundscapes). Silence is the default; the
   text is heard to be attended to.
8. **A quote before Scripture.** Glorify opens with an inspirational quote, then
   the passage. Scripture comes first; commentary after.
9. **Mood labelling and self-scoring.** Calm's dozen moods, Stoic's mood
   tracker, Medito's "How do you feel after this session?" logged over time. The
   Examen asks what happened and where God was, and stores nothing about the
   reader's state.
10. **Autoplay into the next thing.** Waking Up has to turn autoplay off when a
    session is extended; the default runs on. An office ends with a blessing and
    a still screen, never a "next up."
11. **Paywalls and trials on prayer.** Soft paywalls after onboarding (Glorify),
    subscriptions on the daily content (Calm Dailies, Hallow, Abide).
12. **Data trade and third-party scripts on a prayer page.** Attribution SDKs and
    data-broker files (Pray.com; secondary coverage naming Hallow, Bible Gateway
    and Glorify). No journal text, prayer name or Examen choice ever leaves the
    device.
13. **Sharing one's prayer to a feed.** "Share your Prayer" (Venite's selection
    menu), Prayer Families feeds (Hallow), community prayer posts (Glorify).
    Copying a psalm to send is fine; publishing one's own prayer is not a
    feature.
14. **Celebrity and many voices.** Hallow's famous guides; Lectio's rotating
    writers. One voice (James's, if he records the frame) or the device's.
15. **Onboarding that measures starts.** Irrational Labs doubled course starts
    and moved no practice. No welcome funnel on `/pray`: the first screen is the
    first step of today's office.

---

## 5. Notes for the planner

- **Translation.** The office is a household surface, so it quotes the BSB and
  can use `VerseRef` sheets (MASTER-PLAN section 2 and question 8). The Lord's
  Prayer and fixed texts follow the same choice.
- **What it reuses.** BSB psalms (`client/public/bible/text/psalms/`), the 2027
  story schedule (U28) for the morning reading, Study Bible chapter questions,
  the catechism (Sundays), the Prayer Planner's storage, the Worry Journal's
  sorting, the Examen how-to's content, `ListenButton`, `useWakeLock`,
  `Stepper`, `lib/calendar.ts`, `lib/storage.ts`, `lib/telemetry.ts`, and the
  church-year rules in `scripts/lib/church-year.mjs` (U10) for the season.
- **What needs writing.** The fixed frame (once; James approves), about thirty
  Examen questions, the Short forms, and verified witness lines for two seasons.
- **What needs James.** Whether a daily office belongs on LiveWell at all and
  behind which door; whether he will record the fixed frame; the wording of the
  opening and closing; the family bedtime form.
- **The calendar.** Advent begins Sunday, November 29, 2026: the first seasonal
  version could be an Advent office that ends at Christmas, the start and end
  A-SYNTHESIS asks for; Lent begins February 10, 2027.

---

## 6. What I could not see

- **Hallow's screens** for the session player, length picker and post-prayer
  journal; whether the length options are on the free tier; the 2026 range.
- **Pray As You Go's exact sequence and timing.** The "read twice" detail rests
  on one commentary; I could not confirm whether the app has stats, a streak, a
  journal, offline downloads or playback speed.
- **Sacred Space's interface** and the wording of its Conversation stage.
- **Lectio 365's in-app screens**, audio lengths, and whether it has a streak
  or a journal (only a secondary directory says "no streak guilt").
- **Calm's and Headspace's current home screens**; the text of Apple's "Behind
  the Design" piece on Headspace (seen only as a summary); Headspace's
  frequency for Mindful Moments.
- **Waking Up's stats design** beyond the named counts, and anything Sam Harris
  has said about gamification.
- **Glorify's growth tree** and checklist screens; **Abide's** interface.
- **dailyoffice2019's** source and settings (the repository was not reachable
  by the names I tried); **Mission St. Clare's** pages; **Divine Office's** audio
  and its map.
- **Day One's "Today" view.**
- **Primary research texts.** Lally et al. 2010 and Stecher et al. 2021 were
  read through announcements, abstracts and summaries, not the papers; check
  both before quoting either anywhere.
- **Retention data** from any office-family product; none was published that I
  could find, so the claim that the frame holds people rests on longevity (Sacred
  Space since 1999, Pray As You Go since 2006, Universalis since 1995) rather
  than measured return.

---

## 7. Questions this raises for James

1. Should LiveWell offer a morning and close-of-day prayer at all, and if so,
   behind which door (Study, or Family beside *Tonight at the table*)?
2. Would he record the fixed parts of the office (opening, Lord's Prayer,
   closing, blessing) in his own voice, once?
3. Does he want the Examen at the close of day, with the reader choosing what
   kind of day it was?
4. Should the family bedtime form exist, or should the weekly Table stay the
   only household surface?

---

## 8. Evidence: every source and what it showed

**Open-source code read** (cloned into
`/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/design-src/`)

- `gbj_venite/README.md`: the author calls the codebase "old and brittle," in
  maintenance mode.
- `gbj_venite/app/src/assets/i18n/en.json`: "Pray the Office," "Default Times for
  Liturgies," the Prayer List description and placeholder, reminder presets,
  display-setting labels ("Psalm Pause," "Meditation Bell," "Singing Bowl,"
  "Ecru," "Background Sounds"), "Share your Prayer," "Sponsored by Forward
  Movement."
- `gbj_venite/app/src/app/pray-menu/liturgy-select/liturgy-select.component.ts`:
  `liturgyOfTheHour()` hour ranges and `liturgyOfTheMoment()` for reader ranges.
- `gbj_venite/app/src/app/pray-menu/liturgy-select/liturgy-select.component.html`
  and `app/home/home.page.html`: day name, Proper, liturgy and calendar selects,
  one Pray button.
- `gbj_venite/ldf/src/display-settings.ts`: defaults (voiceRate 0.85,
  psalmPause 1000, meditationBell singing-bowl, darkmode auto/dark/light/ecru,
  hideRubrics, psalm and Bible verse numbers off).
- `gbj_venite/app/src/app/meditate/meditate.page.html` and `.ts`;
  `components/src/components/meditation/meditation.tsx`: timer colored by the
  day's liturgical color, start and complete events for bells.
- `gbj_venite/app/src/app/prayer-list/prayer-list.page.html`: the list as one
  free-text field shown inside the office.
- `gbj_venite/app/src/assets/audio/`: `singing-bowl.mp3`, `silence-short.mp3`.
- `meditohq_medito-app/lib/l10n/app_en.arb`: every Medito string quoted above
  (first session, reminder chips, permission primers, streak, freezes, edit and
  restore stats, locked steps, post-session question, journal step, donation
  and splash lines).

**Pray As You Go**
- [prayasyougo.org](https://prayasyougo.org/): under 15 minutes; music,
  Scripture, questions; framework for prayer, not a sermon.
- [Jesuits in Britain, 20 years](https://www.jesuit.org.uk/news/jesuit-prayer-app-pray-as-you-go-turns-20-serving-a-global-community-of-over-half-a-million):
  anniversary, community size (company figure), range of content.
- [Discover page](https://prayasyougo.org/discover): series such as Rosary
  Reflections.
- [CSJ Canada](https://www.csjcanada.org/blog/2013/4/23/pray-as-you-go.html) and
  [St Peter's Edinburgh](https://stpetersrcchurchedinburgh.org.uk/prayer-skills/pray-as-you-go/):
  10 to 13 minutes; one session each working day and one for the weekend;
  Spiritual Exercises; "not a 'Thought for the Day' ...".
- [RAPT Interviews](https://raptinterviews.com/articles/pray-as-you-go-app):
  passage read slowly, aloud, twice; never explained (single source).
- [Learn of Christ review](https://learnofchrist.com/resources/pray-as-you-go):
  about eleven minutes; music opens and closes; long pauses; 2006 podcast, 2014
  app; free.
- [Uniting Church review](https://uniting.church/pray-as-you-go/): music from
  King's College to Keur Moussa; mental-health and isolation series.
- [AMDG podcast with Emma Holland](https://www.jesuits.org/stories/amdg-podcast-making-the-jesuit-app-pray-as-you-go-with-emma-holland/):
  director; lectionary Scripture; hundreds of thousands of users.
- [App Store listing](https://apps.apple.com/us/app/pray-as-you-go-daily-prayer/id865934048):
  developer Jesuits in Britain; VoiceOver, Larger Text, Dark Interface.
- [JustGiving, Jesuit Media](https://www.justgiving.com/charity/jesuitmedia):
  donation funding.

**Lectio 365 and Lectio for Families**
- [lectio365.com](https://www.lectio365.com/): morning, midday, night; P.R.A.Y.;
  night Examen verbs; read or listen; download a week; free.
- [Salvation Army review](https://sld.saconnects.org/lectio365-app-review/):
  same opening prayer daily; Ask for self and others; Yield rereads; Trinitarian
  close.
- [24-7 Prayer, night prayers](https://signup.24-7prayer.com/blog/2893/introducing-lectio-365-night-prayers):
  2021 addition; shorter; ancient prayers and hymns.
- [24-7 Prayer, launch](https://signup.24-7prayer.com/blog/2844/introducing-lectio-365):
  November 2019.
- [faith.tools, Lectio 365](https://faith.tools/app/69-lectio-365) and app
  listings (via search summary): seasonal series; Lent 2026 "Wisdom in the
  Desert."
- [Learn of Christ prayer-app directory](https://learnofchrist.com/directory/prayer-apps)
  and [lectio365.com/the-app](https://lectio365.com/the-app/) (via search
  summary): "no upsell and no streak guilt"; 30-day catch-up; read by the author
  over an instrumental soundtrack; 50 million prayer times (company figure).
- [Lectio for Families](https://www.24-7prayer.com/lectioforfamilies/) and
  [faith.tools](https://faith.tools/app/70-lectio-for-families): ages 7 to 11;
  memory verse; questions; Sabbath prayer; heroes of the faith; pass the device;
  5 to 10 minutes.

**Sacred Space**
- [About Sacred Space](https://sacredspace.com/about/): 1999; founders; about 15
  languages; Loyola Press since 2014.
- [App Store listing](https://apps.apple.com/app/id1050192048): six stages;
  preparing body and mind; culminating in the day's Scripture.
- [Daily prayer, 16 May 2026](https://sacredspace.com/daily-prayer/2026-05-16):
  dated URL; Freedom and Consciousness content; Conclusion; NRSVue; prayers "for
  doing."
- [Crux, 2015](https://cruxnow.com/faith/2015/08/another-way-to-pray): the app's
  approach to "how do I pray?".

**Reimagining the Examen**
- [Ignatian Spirituality app page](https://www.ignatianspirituality.com/reimagining-examen-app/):
  origin in Thibodeaux's Word document; February 2016.
- [App Store listing](https://apps.apple.com/app/id1065042173): choose by current
  state or the day's scheduled Examen.
- [Terms page](https://reimaginingexamen.ignatianspirituality.com/terms.php): the
  five steps.
- [CatholicMom, 2016](https://www.catholicmom.com/articles/2016/04/29/the-examen-app):
  full screen, hides notifications; text size and music.

**Daily office**
- [Venite App Store listing](https://apps.apple.com/app/id1502034358): audio and
  psalter options.
- [Time to Pray](https://apps.apple.com/us/app/-/id1063226898): Prayer During the
  Day and Night Prayer; full audio; day-to-night switch time; reminders; text
  size; night mode; alternative psalms and readings.
- [Daily Prayer listing](https://apps.appfollow.io/ios/daily-prayer/818491760?country=gb):
  full Morning and Evening Prayer; Church House Publishing.
- [Universalis App Store listing](https://apps.apple.com/us/app/universalis/id284942719):
  every hour; works out the day; any date; local calendars; offline; one-time
  purchase; display options; ratings (listing figure).
- [Universalis, about](https://universalis.com/aboutus.htm) and
  [Pray Tell interview](https://praytellblog.com/index.php/2019/03/21/an-interview-with-martin-kochanski-founder-of-universalis-publishing/):
  founded 1995; audio by subscription; users across denominations.
- [Mission St. Clare](https://www.missionstclare.com/english/welcome/welcome.html):
  stated purpose; offices; Devotions for Individuals and Families; English and
  Spanish.
- [St John Flat Rock](https://www.stjohnflatrock.org/daily-office-resources):
  Rite I or Rite II calendar.
- [Anglican Network, Rhythms of Prayer](https://anglicannetwork.ca/news/2020/12/30/rhythms-of-prayer)
  and [Diocese of Canada](https://dioceseofcanada.ca/news/2019/11/13/online-daily-prayer-resources):
  dailyoffice2019 opens to the current office; many settings.
- [Divine Office listing](https://apps.apple.com/us/app/-/id914635909): official
  text and audio; automatic daily download; locations of others praying.
- [Anglican Compass, Family Prayer](https://anglicancompass.com/family-prayer-a-rookie-anglican-guide/)
  and [Wikisource BCP (ECUSA)](https://en.wikisource.org/wiki/Book_of_Common_Prayer_(ECUSA)):
  Daily Devotions for Individuals and Families; four short forms; kept in 2019.

**Hallow**
- [App Store listing](https://apps.apple.com/us/app/-/id1405323394): three
  lengths; chant; journal after every prayer; free floor.
- [Hallow features](https://hallow.com/features/): 1 to 60 minutes; 10+
  background options.
- [America magazine, 2021](https://www.americamagazine.org/arts-culture/2021/07/30/catholic-prayer-apps-ranking-hallow-laudate-241144/):
  most attractive Catholic app; minimalistic colorful images; breathable layout.
- [ScreensDesign, Hallow](https://screensdesign.com/apps/hallow-prayer-meditation/):
  dark home, hero graphic, reading view settings.

**Abide**
- [App Store listing](https://apps.apple.com/app/id726031617): content counts;
  bedtime stories; NIV audio (developer claims).
- [Guideposts](https://home.guideposts.org/abide-christian-meditation-prayer-app/):
  2 to 15 minutes; journaling.
- [abide.com/sleep](https://abide.com/sleep): sleep focus; price and trial.

**Glorify**
- [ScreensDesign teardown](https://screensdesign.com/showcase/glorify-devotional-prayer):
  five onboarding steps; "Plant a new seed"; soft paywall.
- [faith.tools, Glorify](https://faith.tools/app/48-glorify) and
  [Justuseapp reviews](https://justuseapp.com/en/app/1490587079/glorify-daily-worship/reviews):
  quote, passage, devotional, Daily Walk; about ten minutes; checklist.
- [Glorify help center](https://glorify-app.zendesk.com/hc/en-gb/articles/360020071400-Do-I-have-to-pay-to-use-the-app):
  free daily devotional and Bible.
- [U.S. Chamber, emotionally intelligent products](https://uschamber.com/co/good-company/ask-the-board/emotionally-intelligent-products):
  Henry Costa, "Build for habit, not hook."
- [Canaltech guide](https://canaltech.com.br/apps/como-usar-o-aplicativo-glorify/):
  a tracked sequence of meditations.
- [Patron, making worship a habit](https://patronxyz.substack.com/p/making-worship-a-habit):
  habit tracking and game-like features.

**Calm**
- [Calm Dailies](https://support.calm.com/hc/en-us/articles/115005140414-Calm-Dailies):
  daily session builds the Mindfulness Streak; Premium.
- [Stats and streak](https://support.calm.com/hc/en-us/articles/115002473827-How-to-View-Your-Meditation-Stats-History-and-Streak-in-Calm):
  streak, mindful minutes, calendar history; what counts.
- [Check-Ins](https://support.calm.com/hc/en-us/articles/9699990936731-How-to-Use-Check-Ins):
  four kinds; do not count toward the streak.

**Headspace**
- [Today tab help](https://help.headspace.com/hc/en-us/articles/1260803328650-What-is-the-new-Today-tab-and-how-does-it-work):
  sorted by time of day; any order or partial won't hurt the run streak.
- [Apple, Behind the Design](https://developer.apple.com/news/?id=fkfnhq8u) (via
  search summary): research led to fewer menus; morning, afternoon, night.
- [Irrational Labs case study](https://irrationallabs.com/case-studies/headspace-doubled-course-starts/):
  course starts doubled; no significant change in active meditation days.
- [Appcues, Headspace onboarding](https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence):
  earlier change lifted session one, not week-two retention.
- [Pratt design critique, 2026](https://ixd.prattsi.org/2026/02/design-critique-headspace-ios-app-2/):
  streaks and "protecting a number" (paraphrase).
- [Mindful Moments help](https://help.headspace.com/hc/en-us/articles/115008361068-How-can-I-set-up-Mindful-Moments),
  [Reminders help](https://help.headspace.com/hc/en-us/articles/115008276788-How-can-I-set-up-Reminders),
  [TechCrunch 2015](https://techcrunch.com/2015/09/21/meditation-startup-headspace-raised-30-million-to-help-you-be-more-mindful):
  the two notification kinds.
- [Headspace Apple Watch release](https://www.headspace.com/articles/headspace-unveils-new-apple-watch-experience):
  HRV used to find receptive moments (May 2026).

**Waking Up**
- [APKMirror release notes](https://www.apkmirror.com/apk/waking-up-llc/waking-up-beyond-meditation/):
  countdown, starting and ending bells; extending turns off autoplay; no
  auto-dated names.
- [Mindful Technology review](https://mindful.technology/?p=528): theory,
  practice, timer.
- [Inside the app, More](https://m.wakingup.com/inside-the-app/more): stats named;
  Moment, Daily Quote, Meditation Reminder; a time range.
- [What are Moments?](https://help.wakingup.com/article/81-what-are-moments):
  short audio reflections; push or email; a window.
- [App Store listing](https://apps.apple.com/app/id1307736395): free for anyone
  who can't afford it.

**Medito** (beyond the code)
- [Medito vs Waking Up](https://meditofoundation.org/medito-vs-waking-up/):
  nonprofit positioning.

**Day One**
- [Journaling tips](https://dayoneapp.com/blog/day-one-journaling-tips/): daily
  prompt; recent prompts; answer again; push.
- [Reminders and templates](https://dayoneapp.com/blog/reminders-templates/):
  reminders open a template; SMS replies.
- [On This Day](https://dayoneapp.com/guides/tips-and-tutorials/on-this-day):
  entries from the same date in earlier years.
- [Daily prompts announcement](https://dayoneapp.com/?p=1640): a prompt that
  rotates every 24 hours.
- [End-to-end encryption FAQ](https://dayoneapp.com/guides/security/end-to-end-encryption/)
  and [Privacy pledge](https://dayoneapp.com/privacy-pledge/): on by default for
  new journals; key on device.

**PrayerMate**
- [App Store listing](https://apps.apple.com/us/app/-/id434815549): feeds;
  scheduling including "whenever they haven't been prayed for in a while."
- [Challies](https://challies.com/resources/prayermate): one from each category
  daily as cards.
- [Learn of Christ review](https://learnofchrist.com/resources/prayermate):
  rotation as the core.

**Stoic**
- [App Store listing](https://apps.apple.com/app/id1312926037): morning planning,
  evening review, mood tracking, AI features.

**Pray.com and prayer-app privacy**
- [NPR, 2022](https://www.npr.org/2022/02/10/1079944694/what-we-can-learn-about-privacy-from-faith-based-apps),
  [Yahoo News](https://news.yahoo.com/nothing-sacred-apps-sell-prayers-153708345.html),
  [Inverse](https://www.inverse.com/input/culture/prayer-apps-sell-data-to-tech-facebook-personalize-ads),
  [CathNews, 2020](https://cathnews.co.nz/2020/11/26/religious-apps-not-secure):
  BuzzFeed's findings; data-broker files; 2020 exposure; other apps named.

**Habit and attention research**
- [UCL, 2009](https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit)
  and [The Behavioral Scientist](https://www.thebehavioralscientist.com/articles/how-long-to-form-a-habit):
  Lally et al.; one missed opportunity did not significantly affect habit
  formation; 66 days a median with a wide range.
- [Stecher, Sullivan and Huberty, JMIR mHealth and uHealth 2021](https://mhealth.jmir.org/2021/12/e32794/PDF):
  personalized vs fixed anchors with Calm; fixed anchors persisted best
  (preprint conclusion via search summary).
- [Amber Case, principles of calm technology](https://www.caseorganic.com/post/principles-of-calm-technology)
  and [O'Reilly book page](https://oreilly.com/library/view/~/9781491925874):
  smallest possible attention; inform and create calm; the periphery.

**LiveWell files read**
- `CLAUDE.md`; `docs/work/plan/benchmark.md`; `docs/work/plan/MASTER-PLAN.md`
  sections 0 to 3, 5 and parts of 6 and 7; `docs/work/design/research/A-SYNTHESIS.md`,
  `A-courses-learning.md` (sections 2.9 to 2.11), and the overlap search across
  the other research files.
- `client/src/lib/calendar.ts`; `client/src/components/ListenButton.tsx`;
  `client/src/pages/tools/PrayerPlanner.tsx`; `client/src/pages/tools/WorryJournal.tsx`;
  `client/src/lib/telemetry.ts`; `client/src/App.tsx` (tool and family routes);
  `client/public/howtos/a/sf-how-to-examine-your-day-the-daily-examen.json`;
  `client/public/bible/text/psalms/`.
