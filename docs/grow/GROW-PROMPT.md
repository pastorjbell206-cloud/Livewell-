# The Grow Commission: the prompt for LiveWell's library of practical help

> Hand this whole file to an agent working in this repository and say "run
> this." It convenes a commission, gives it James's brief in his own words, the
> measured state of the Grow section, what people are actually looking for and
> how they say it, the standard every resource must meet, the care rules that
> protect the reader, the order of the work, and the tests that decide when each
> piece is finished. It sits under `CLAUDE.md` (voice, palette, engineering),
> `docs/EDITORIAL-CONSTITUTION.md` (mission), and `docs/VOICE-JAMES-BELL.md`
> (the governing voice standard), and it builds on the design system in
> `docs/design/BOARD-OF-EXPERTS.md`. Where this file and those disagree, they
> win.

---

## 1. The mandate

James asked for this in his own words, and every decision answers to them:

> Take the Grow section, all my tools, my assessments, my study guides,
> downloads, PDFs, and "find help for what you're facing," and expand it to the
> extreme. Make them deep. Exhaustive. Professional. Like a professional
> publication, in my tone, style, and voice. Look at what would be most
> popular, what would be most sought after, what people want, in normal,
> everyday, common language, and help people where they're at.

Read that brief as two commitments held together. The first is depth: this is
a publication, not a content farm, and nothing ships that a serious editor
would be embarrassed by. The second is reach: the section starts from the
words a hurting or hungry person actually types at eleven at night, not from
the categories a theologian would file things under. The work fails if it
achieves either one without the other.

The mission test still governs. Every resource helps answer the central
question in `docs/EDITORIAL-CONSTITUTION.md` (how Christians live faithfully
and wisely in a post-Christian America while recovering the depth of historic
Christianity), and every one should leave the reader with the Constitution's
final impression: Christianity is deeper than my politics, older than my
culture, wiser than my assumptions, and more demanding, and more beautiful,
than I realized. Practical help is where that impression is won or lost for
most readers. A person who came for help with their marriage and found only
tips will not come back for the theology.

---

## 2. The commission

You are not one writer. You are a commission of nine, and every resource you
touch passes each member's question before it ships. When members disagree,
the chair decides, and the reader in front of the page is the tiebreaker.

**The Editor in Chief (chair).** Owns the voice, the standard, and the final
read. Holds `docs/VOICE-JAMES-BELL.md` as law and the Forbidden Language list
in `CLAUDE.md` as literal. Vetoes anything generic, anything that sounds like
a devotional mill, and anything that could have been written by any competent
Christian blogger. *Asks: could only James have published this?*

**The Pastoral Care Lead.** Owns the reader in distress. Knows that the first
screen of a help page may be the only screen a person in crisis reads. Holds
the care rules in Section 8 and the crisis block as non-negotiable. Vetoes
condemnation, easy reassurance, diagnosis of a condition the reader never
named, and any counsel that puts reconciliation ahead of safety. *Asks: if the
reader is in the worst moment of their life, does this page help them tonight?*

**The Clinical Adviser.** Not a clinician, and never pretends to be one. Owns
the line between pastoral help and professional care: when to refer, how to
find a counselor, what a doctor needs to know, and what the site must never
claim. Uses only published public guidance from recognized health bodies,
cited, and never invents clinical scoring. Vetoes any page that poses as
treatment. *Asks: would a licensed counselor reading this be glad the reader
found it, or worried?*

**The Curriculum Designer.** Owns study guides, care plans, and anything a
group works through together. Thinks in sessions, arcs, leader notes, and what
people actually do between meetings. Holds the Formation Standard in
`CLAUDE.md` (symptom, cause, wisdom). *Asks: could a volunteer leader with
thirty minutes of preparation run this well on a Tuesday night?*

**The Assessment Designer.** Owns every self-check and instrument. Writes items
that measure one thing each, scores them honestly, interprets every band in
full, and never dresses a reflection exercise up as a validated test. Refuses
to imitate proprietary instruments. *Asks: does every possible result tell the
reader something true, useful, and specific to them?*

**The Demand Researcher.** Owns what people are actually looking for and how
they say it: search language, the questions pastors hear most, the seasons of
the year, and the site's own data. Keeps Section 5 current and ranks the work
by it. *Asks: is this the thing people are looking for, in the words they use?*

**The Theologian.** Owns the orthodoxy floor, Scripture in context, and the
handling of contested questions (`CLAUDE.md`, "Handling a contested
doctrine"). Checks every quotation. *Asks: is this faithful to the text and
the historic faith, and fair to Christians who disagree?*

**The Print and Product Designer.** Owns the tools as products and every file
a reader can print or save: layout, typography, accessibility, and the
experience of using a resource with a pen at a kitchen table. Builds on the
editorial system in `docs/design/BOARD-OF-EXPERTS.md`. *Asks: would a reader
keep this on the refrigerator, or throw it away?*

**The Engineer.** Owns content-as-data, validators, the two runtimes, search
visibility, speed, and the tests that keep all of it true after it ships.
*Asks: will this still be correct in a year, when nobody remembers why it was
built this way?*

---

## 3. The reader, where they actually are

People do not arrive at the Grow section wanting "an assessment" or "a
curriculum." They arrive with a need, in their own words, and in one of five
states. Build for the state first and the format second.

1. **"I'm in trouble right now."** Crisis: thoughts of ending their life,
   danger at home, a marriage ending tonight, a relapse, a death this week.
   They need safety, one clear next step, and a human to call. Depth can wait.
2. **"I'm carrying something."** A struggle that has lasted weeks or years:
   anxiety, a cold marriage, a child who stopped talking, debt, doubt, grief
   that everyone else has moved past. They need to be understood, then given a
   path they can walk.
3. **"I want to grow."** Not in crisis. They want to pray better, read the
   Bible, build habits, understand what they believe. They need a plan and
   companionship.
4. **"I'm helping someone."** A parent, a friend, a spouse, a small-group
   leader, a pastor. They need to know what to say, what not to say, and when
   to bring in someone else.
5. **"I'm leading a group."** They need curriculum that works, printed, with
   leader notes, in a format that fits their calendar.

Every resource declares which states it serves. The Grow front door routes by
state and need in the reader's own words ("What are you facing?"), never by
our internal formats.

---

## 4. Where the Grow section stands (measured, not guessed)

A read-only inventory of the section (commit `d249b740`) found a great deal of
authored material, badly connected, unevenly deep, and inconsistent in care.
The numbers are the starting line.

**What exists**

| Area | Count | Typical depth | Notes |
|---|---|---|---|
| Tools (`/tools`) | 29 listed; 14 save progress, 13 save nothing; 8 can print | From 27 one-line practices (Rule of Life) to about 38,600 words (Deep Bible Companion) | 5 tools link readers to retired pages; the hub's group filters point at 5 routes missing from its own list, so the Diagnostic never appears |
| Assessments | 12 live instruments, only 7 listed on `/assessments` | 3 to 30 items; interpretation from one sentence to about 110 words per band | Only Whole-Life keeps history; no couple or group mode anywhere; no item anywhere asks about self-harm or safety at home |
| Study guides (`/studyguides`) | 62 guides, 311 sessions, about 1.38 million words | Median about 22,600 words per guide; leader notes, objections, and primers are genuinely deep | 124 PDFs (leader and participant); only 4 guides link to an essay; none link to a tool, plan, life page, or how-to; the index cannot be filtered (no theme field); none for teens or children |
| Downloads (`/downloads`) | 103 items, 175 files | Guides, 31 context guides, 10 Hard Issues booklets | Study-guide PDFs are email-gated on the guide page but linked openly on `/downloads`; care plans, life pages, how-tos, and assessment results cannot be downloaded |
| Find Help (`/help`) | 11 needs, 52 links | About 740 words in total, 40 to 91 per need | One plain-text 988 line for the whole page; no domestic-violence, addiction, or text-line numbers; no links to any study guide or how-to; on phones help is reachable only through the menu (the side tab is hidden below 1024px by design) |
| Life pages (`/life`) | 69 pages, about 373,000 words | Median about 5,400 words, 8 fixed sections | 84% of their related links go to other life pages; none to guides, plans, or how-tos; 988 in 9 pages |
| How-tos (`/how-tos`) | 132 guides, about 750 words each | Essay body only | Not one written-in link in any of the 132; 12 teach a retired feature |
| Care plans (`/plans`) | 7 plans, 8 weeks each | About 1,100 to 1,400 words per plan | `/plans` itself is a 404; 12 of 112 links hit redirects; no plan for money, depression, addiction, loneliness, parenting, divorce, anger, or burnout |
| Wisdom topics | 208 topics | About 370 words and 5 verses each | 988 in 5 topics |

**The ten gaps that matter most**

1. Crisis care depends on low scores. No instrument asks directly about
   safety; crisis lines are missing from most care-adjacent pages, including
   grief and anxiety guides, and `/help` shows one line of plain text.
2. `/help` is the smallest thing in the section and the most important. Eleven
   needs, a few dozen words each, and no path into the deep material that
   already exists on addiction, depression, divorce, infertility, loneliness,
   unemployment, or anger.
3. Results are thin or oversold. One sentence per area on the Diagnostic; the
   same advice at every level of Emotional Health; a "theology quiz" that sorts
   readers into three retired site sections.
4. Next steps point at retired pages or generic lists.
5. `/assessments` omits five live instruments and advertises one that is gone.
6. Care plans are few, short, partly broken, and have no index.
7. Almost nothing prints, apart from study guides.
8. The libraries are islands: tools are not in the Library catalogue, how-tos
   link nowhere, and 58 of 62 guides link nothing.
9. Several tools are thin or promise more than they do.
10. Needs a reader would expect have no home at all: addiction and recovery,
    abuse and safety, suicidal thoughts, sexuality, divorce, caregiving,
    chronic illness, loneliness, and anything for teenagers or children.

**Overlaps with no links between them.** Anxiety alone is served by a tool,
five verse tools, two guides, two life pages, a plan, and two how-tos that
barely know each other. The same is true of grief, marriage, money, anger,
forgiveness, and Sabbath. There are four versions of a rule of life, three
life check-ups, six "verses by topic" tools, two glossaries, and two families
of small-group material (62 study guides and 90 group guides).

The lesson of the inventory is the thesis of this prompt: **the Grow section
does not mainly need more words. It needs every need to have one complete,
connected kit, a front door in the reader's language, and care that never
depends on a score.** Where depth is thin, deepen it. Where material is
duplicated, consolidate it. Where a need has no home, build one.

---

## 5. What people are looking for, and how they say it

### 5.1 How this map was built, and how to keep it honest

The map below comes from a research pass on the week this prompt was written.
Every figure carries its source. Three grades:

- **V**: a figure from a named source.
- **V·P**: three or more independent datasets point the same way.
- **J**: judgment. All rankings and all format choices are judgment.

One limitation matters. The research environment blocked direct page fetches,
so the evidence was read from search-engine excerpts of the publishers' own
pages. **Before any figure appears on a published page, the Demand Researcher
re-opens its source and confirms the exact wording.** Before building each
kit, refresh the map with the site's own Search Console queries and analytics
(Section 12) and with Google Trends, neither of which was reachable here.

### 5.2 How people say it

- **Single words inside Bible apps** (V): love, anxiety, peace, prayer, hope,
  healing, fear.
- **"Bible verses about [topic]" or "[topic] Bible verses"** (V): how Bible
  Study Tools labels its most-searched topics.
- **A verse reference** (V): Psalm 23:4, Jeremiah 29:11, Proverbs 3:5-6.
- **"What does the Bible say about ...?" and "Is it a sin to ...?"** (V): the
  forms that fill GotQuestions' most-asked lists.
- **Prayer searches surge in a crisis** (V): searches for prayer in March
  2020 reached "the highest level ever recorded"
  ([Bentzen, Journal of Economic Behavior and Organization, 2021](https://www.sciencedirect.com/science/article/pii/S0167268121004443)).
- **"How to ...," "signs of ...," "how do I know if ...," "prayer for [a
  person]"** (J): likely, not confirmed here. Confirm with Search Console and
  Trends before titling pages this way.

Titles and first lines use these forms. Every registry entry lists them in
`askedAs`.

### 5.3 The ranked needs

Audiences: S skeptic, C Christian with real questions, P pastor, L the person
trying to live well. "Kit emphasis" is the format that should lead; the rest
of the kit follows Section 6.

| # | The need, in the reader's words | For | Strongest evidence | Kit emphasis |
|---|---|---|---|---|
| 1 | "I can't stop worrying"; "Bible verses about anxiety" | L C S | V·P. Philippians 4:6 was YouVersion's 2024 Verse of the Year ([YouVersion](https://www.youversion.com/news/youversions-verse-of-the-year-reflects-global-trend-of-seeking-peace-through-prayer)); "anxiety" among its most-searched terms in 2023 and 2025 ([2025](https://www.youversion.com/news/youversion-announces-2025-verse-of-the-year)); "Bible verses about worry/anxiety" ranked sixth on Bible Study Tools in 2024 ([BST](https://www.biblestudytools.com/bible-study/topical-studies/the-top-20-most-searched-bible-themestopics-on-bible-study-tools-in-2024.html)) | Care page, Scripture cards, 7-day and 8-week plans; no diagnostic screener |
| 2 | "I'm scared about the future"; "Bible verses about fear" | L C | V·P. Isaiah 41:10 was YouVersion's verse of the year "the fourth time in six years" in 2025; Psalm 23:4 was Bible Gateway's most-read verse in 2024; 39% of Gen Z "frequently feel uncertain about the future" ([Barna, 2024](https://www.barna.com/trends/gen-z-emotions/)) | Care page; cards for Isaiah 41, Psalm 23, Psalm 91; plan |
| 3 | "I feel so alone" | all | V·P. Daily loneliness "edged up to 20%" ([Gallup, 2024](https://news.gallup.com/poll/651881/daily-loneliness-afflicts-one-five.aspx)); "Nearly three in four Americans report moderate to high levels of loneliness" ([American Bible Society, 2024](https://www.americanbible.org/news/press-releases/articles/state-of-the-bible-2024-chapter-8/)) | Care page (new need); friendship and belonging guide; a connection planner tool |
| 4 | "My dad just died"; "Bible verses about grief"; "What happens after death?" | L C S | V·P. Psalm 23 held Bible Gateway's top six verses in 2025 ([Baptist Press](https://www.baptistpress.com/resource-library/news/isaiah-4110-psalms-23-and-91-among-most-popular-bible-app-verses-for-2025/)); "What happens after death?" is in GotQuestions' top 20 ([GotQuestions](https://www.gotquestions.org/top20.html)) | Care page; Psalm 23 printable; a first-year-of-grief calendar; guide |
| 5 | "Why does God allow suffering?" | S C | V. Among Christians who doubt, "Human suffering is the top response (23%)" ([Barna, 2023](https://www.barna.com/research/doubt-faith/)) | Long care page; Job and Lamentations guide |
| 6 | "Is God real?"; "I'm doubting my faith" | S C | V. 65% of current or former Christians have experienced doubt ([Barna](https://www.barna.com/research/two-thirds-christians-face-doubt/)); among 18-24s, "26% are former Christians, while only 5% are converts" ([Pew, 2025](https://www.pewresearch.org/religion/2025/12/08/religion-holds-steady-in-america/)) | Care-page series; skeptic reading path; a guide for groups of mixed belief |
| 7 | "I feel empty"; "Bible verses about hope" | L C P | V. 13.1% of people aged 12 and over "had depression in a given 2-week period" in 2021-23, up from 8.2% ([CDC](https://www.cdc.gov/nchs/products/databriefs/db527.htm)) | Care page with the help block; no diagnosing; a lament printable |
| 8 | "How do I pray?" | C L S | V·P. "Two of the most searched terms in the Bible app were prayer and peace" ([Christianity Today, 2024](https://www.christianitytoday.com/2024/12/top-bible-verses-anxiety-fear-psalms-philippians/)) | Prayer journal printable; guided-prayer tool (the Prayer Generator, rebuilt) |
| 9 | "My marriage is falling apart" | L C P | V. Three months before separating, "7 in 10 regular churchgoers who divorce are attending church once a week or more" ([Lifeway, 2015](https://research.lifeway.com/2015/10/29/threat-of-divorce-hard-to-spot-among-churchgoing-couples/)): they struggle in silence, so private help matters | Private couples' check-up (original); care page; couples' guide |
| 10 | "Where do I start reading the Bible?"; "Bible reading plan" | C S L | V. On January 5, 2025, "more than 3 million people" subscribed to one-year plans, "an 18% increase" ([YouVersion](https://www.youversion.com/news/record-breaking-millions-turn-to-scripture-in-the-new-year)) | Printable plans (a year, 90 days, a Gospel for skeptics); a tracker |
| 11 | "What should I do?"; Proverbs 3:5-6 | L C | V. "Proverbs 3:5-6 is the most searched Bible verse in nearly every state" ([Bible Study Tools](https://www.biblestudytools.com/most-searched-bible-verse/map/)) | Discernment worksheet; care page |
| 12 | "I can't forgive him" | C L | V·P. 23% of practicing Christians have someone they "just can't forgive" ([Barna, 2019](https://www.barna.com/research/forgiveness-christians/)) | Care page; guide; worksheet |
| 13 | "Bible verses for healing"; "prayer for healing" | C L | V·P. Healing ranked second on Bible Study Tools in 2024 ([BST](https://www.biblestudytools.com/bible-study/topical-studies/the-top-20-most-searched-bible-themestopics-on-bible-study-tools-in-2024.html)) and was among YouVersion's most-searched themes in 2023 | Care page; prayer cards; guard against prosperity teaching |
| 14 | "My teen is depressed"; "I'm worried about my kids" | L C P | V. "Four-in-ten" parents are extremely or very worried their child will struggle with anxiety or depression ([Pew, 2023](https://www.pewresearch.org/social-trends/2023/01/24/parenting-in-america-today/)) | Care page; parent guide; conversation cards |
| 15 | "How do we do family devotions?" | L C | V. Childhood Bible reading is "far and away the best predictor" of a spiritually healthy young adult ([Lifeway, 2017](https://research.lifeway.com/2017/10/17/young-bible-readers-more-likely-to-be-faithful-adults-study-finds/)) | Family devotion printables; a family plan |
| 16 | "How do I be a dad when I never had one?" | L C | V plus J. 68% name their mother's Christian example as the most influential, 46% their father's ([Barna](https://www.barna.com/research/faith-heritage-faith-practice/)); this is James's own ground | Men's guide; care page; a Father's Day printable (his story only if he writes it) |
| 17 | "What's the point of my life?" (young men) | S L | V. "Young Men Experiencing Greatest 'Identity Crisis'" ([American Bible Society, 2025](https://www.americanbible.org/news/press-releases/articles/state-of-the-bible-2025-chapter-6/)) | Men's group guide; reading path |
| 18 | "How do I stop watching porn?"; "My husband watches porn" | C L P | V. "Over Half of Practicing Christians Admit They Use Pornography"; 53% want their church to address it, only 10% know of a church program ([Barna, 2024](https://www.barna.com/research/address-porn-use/)) | Private self-check (non-clinical); pages for the one struggling and for the spouse |
| 19 | "How do I get out of debt?"; "budget worksheet"; tithing | L C | V. 63% could cover a $400 emergency with cash ([Federal Reserve, 2026](https://www.federalreserve.gov/newsevents/pressreleases/other20260513a.htm)) | Budget printable; a debt plan; not financial advice, said plainly |
| 20 | "Caring for my mom is crushing me" | L P | V. "63 million Americans, 1 in 4 adults" are family caregivers ([AARP, 2025](https://www.aarp.org/press/releases/2025-07-24-new-report-reveals-crisis-point-for-americas-63-million-family-caregivers.html)) | Care page; a caregiver's Sabbath plan (printable) |
| 21 | "I'm burned out at work" | L | V. Half of U.S. and Canadian employees report "significant daily stress, the highest rate worldwide" ([Gallup](https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx)) | Care page; vocation and Sabbath guide |
| 22 | "I'm thinking about quitting ministry" | P | V·P. 42% of pastors considered quitting in 2022; 43% of those cited feeling "lonely and isolated" ([Barna](https://www.barna.com/research/pastors-quitting-ministry/)) | Private pastor self-check; a PCN cohort guide (coordinate with PCN, where pastors' material now lives) |
| 23 | "When should I refer someone to a counselor?" | P | V. Pastors keeping a counselor referral list fell from 67% (2015) to 52% (2025) ([Lifeway](https://research.lifeway.com/2025/07/01/pastors-have-increasingly-complicated-relationship-with-counseling/)) | A referral-list template (printable); a pastor's care page |
| 24 | "I'm done with church" | S C | V. 27% trace their doubt to "past experiences with a religious institution" ([Barna, 2023](https://www.barna.com/research/doubt-faith/)) | Care page; the reconstruction guide |
| 25 | "Is it a sin to drink, get a tattoo, gamble?" | C S | V. These questions fill GotQuestions' most-asked and all-time lists ([GotQuestions](https://www.gotquestions.org/top20-all-time.html)) | A care-page series plus one conscience page built on Romans 14 |
| 26 | "What does the Bible say about homosexuality?" | S C P | V. Third on Bible Study Tools' 2024 topics; second on GotQuestions' list | A long-form guide under the contested-doctrine discipline; James decides the order and his landing |
| 27 | "My spouse drinks too much" | L C P | V. "16.8% (or 48.4 million people)" had a past-year substance use disorder ([SAMHSA, 2024](https://www.samhsa.gov/data/report/2024-nsduh-annual-national-report)) | Pages for the person and the family, with the SAMHSA helpline |
| 28 | "Is this abuse?"; "I don't feel safe at home" | L C P | V. Two-thirds of pastors say domestic or sexual violence occurs in their congregation ([Lifeway, 2018](https://research.lifeway.com/2018/09/18/pastors-more-likely-to-address-domestic-violence-still-lack-training/)) | Care page with hotlines and a quick-exit button; no quiz |
| 29 | "What does the Bible say about suicide?" | C L | V. Eighth on GotQuestions' list; 32% of churchgoers have lost a close friend or relative to suicide ([Lifeway, 2017](https://research.lifeway.com/2017/09/29/suicide-remains-a-taboo-topic-at-churches/)) | Care page under the safe-messaging rules, with the help block |
| 30 | "Christian dating advice"; "Should we get married?" | L C | V. 78% of unmarried Gen Z want to marry ([Barna, 2025](https://www.barna.com/research/gen-z-marriage-delay/)) | An original premarital workbook (printable) |
| 31 | "Spiritual gifts test" | C P | V (2009, dated) plus J. 20% of Christians are unsure whether they have a spiritual gift ([Barna](https://www.barna.com/research/awareness-of-spiritual-gifts-is-changing/)) | An original self-check that states the continuationist and cessationist views fairly; a group guide |
| 32 | "What do Christians actually believe?" | S L | V, contested. Barna reports rising commitment to Jesus; Pew finds "no clear evidence of a religious revival among young adults." Build for curiosity, not a presumed revival | New-believer guide (the Creed, the Gospel of Mark) |
| 33 | "Politics is tearing my family apart" | P C | V. 62% call societal division a significant stressor ([APA, 2025](https://www.apa.org/news/press/releases/2025/11/nation-suffering-division-loneliness)) | A guide; a pastor's page |
| 34 | "My ministry is costing my family" | P | V. 29% of pastors say they need to give more attention to their children, 26% to their marriage ([Lifeway, 2022](https://research.lifeway.com/greatestneeds/)) | A pastor-family page; a retreat guide (coordinate with PCN) |
| 35 | "Can I trust the Bible?" | S C | Weak V (a truncated excerpt); J | Care page; the skeptic guide |
| 36 | "Bible verses about fasting"; Lent | C | V. Fasting is in Bible Study Tools' 2024 top 20 | A Lent and fasting printable, live before Ash Wednesday |
| 37 | "What does the Bible say about women pastors?" | C P | V. First on GotQuestions' list | A contested-doctrine guide; James decides his landing |
| 38 | "Do pets go to heaven?" | L C S | V. Ninth and tenth on GotQuestions' list | A gentle care page, grief-adjacent |

**Across the map.** Privacy is the strongest reason to offer self-checks at
all: couples in trouble keep quiet at church (row 9), and only one in ten
Christians knows of a church program for pornography (row 18). Every
self-check should be reflective, never diagnostic, and should lead to real
help. On what pastors counsel most, no representative survey was found; the
best available signals (an informal Church Answers poll, a small 2014 CBHD
survey, and Barna's finding that 75% of pastors minister to people
struggling with pornography) point to infidelity, divorce, abuse, mental
health, addiction, grief, and church conflict.

### 5.4 Scripture demand

- **YouVersion Verse of the Year:** Isaiah 41:10 in 2023 (matching top
  searches for "love, peace, hope, healing and anxiety"), Philippians 4:6 in
  2024 ("seeking peace through prayer"), Isaiah 41:10 again in 2025, "the
  fourth time in six years," with Jeremiah 29:11 and Romans 12:2 among the top
  verses and "love, anxiety, and peace" the most-searched terms.
- **Bible Gateway:** Psalm 23:4 the most-read verse in 2024; in 2025 Psalm 23
  held the top six verses and all sixteen verses of Psalm 91 were in the top
  25 (reported by Baptist Press; Bible Gateway's own page was not found).
- **Bible Study Tools:** Jeremiah 29:11 the most-searched verse and Psalm 91
  the most-searched chapter in 2025; Proverbs 3:5-6 first in nearly every
  state.
- **The clusters:** fear and the assurance of God's presence (Isaiah 41:10,
  Psalm 23:4, Philippians 4:6); protection (Psalm 91); the future and
  guidance (Jeremiah 29:11, Proverbs 3:5-6); renewal (Romans 12:2); love and
  salvation (John 3:16).
- **The opening for this publication.** Several of the most-searched verses
  are also the most proof-texted. Jeremiah 29:11 was written to exiles in
  Babylon. A "read it in context" series (a card, a short page, and a group
  session for each of the most-searched verses) meets the demand and keeps the
  Scholarship Standard at the same time. Build it early.

### 5.5 The calendar (dates computed for the next twelve months)

| Window | Signal | Have live |
|---|---|---|
| October 2026 | Domestic Violence Awareness Month ([the Hotline](https://www.thehotline.org/stakeholders/domestic-violence-awareness-month/)) | The abuse and safety page; a pastor's care pack |
| November 2026 (Thanksgiving November 26; Advent begins November 29) | Fall Sundays are among YouVersion's highest days | A gratitude devotional; "grief at the holidays"; the Advent guide live before November 29 |
| December 2026 | YouVersion announces its Verse of the Year in early December; Christmas Eve is the best-attended service for 48% of churches ([Lifeway](https://research.lifeway.com/2022/11/29/pastors-say-christmas-eve-is-most-attended-holiday-service/)) | An Advent family printable; a read-it-in-context page on the new Verse of the Year; New Year reading plans posted by mid-December |
| January 2027 | Reading-plan subscriptions set records on January 5, 2025 and January 1, 2026 | Reading plans, the tracker, "where do I start?" |
| February 2027 (Ash Wednesday February 10) | Searches for "love" rise around Valentine's Day (Bible Gateway, 2018) | The marriage check-up; the Lent guide |
| March 2027 (Palm Sunday March 21; Easter March 28) | Easter 2026 was YouVersion's biggest day ever, "more than 21.6 million" ([YouVersion](https://www.youversion.com/news/easter-marks-the-highest-bible-engagement-day-in-youversion-history)) | The resurrection page for skeptics; a Holy Week plan |
| May 2027 (Mother's Day May 9) | 51% of pastors put Mother's Day among their top three for attendance (Lifeway, 2024) | A page for hard Mother's Days (loss, infertility, estrangement) |
| June 2027 (Father's Day June 20) | Father's Day ranked last of seven special days for attendance ([Lifeway, 2012](https://research.lifeway.com/2012/05/11/mothers-day-church-attendance-third-among-holidays-fathers-day-last/)) | Fatherhood material |
| August and September 2027 | Fall Sundays spike; September is Suicide Prevention Awareness Month ([SAMHSA](https://www.samhsa.gov/about/digital-toolkits/suicide-prevention-month)); 988 Day is September 8 | Group guides for the fall; parenting teens; a pastor's crisis-care kit |

### 5.6 Verified crisis resources (the starting set)

Re-verify each on its official site at publish time and record the date in
`crisis-resources.json`.

- **Immediate danger:** 911. The Hotline's own wording: "If you are in
  immediate danger, please contact 911."
- **988 Suicide and Crisis Lifeline** ([988](https://988lifeline.org/get-help/),
  [SAMHSA](https://www.samhsa.gov/mental-health/988/faqs)): "call or text the
  number 988 or chat online at 988lifeline.org," "24/7/365 ... free and
  confidential," and "People do not have to be suicidal to call." Spanish:
  "dial 988 and then press 2" or "send the word AYUDA to 988." Veterans:
  "calling 988 and pressing 1, texting 838255." (The LGBTQ+ youth "Press 3
  option" ended July 17, 2025; do not list it.)
- **Crisis Text Line** ([crisistextline.org](https://www.crisistextline.org/)):
  "Text HOME to 741741," free, 24/7, English and Spanish (Spanish: AYUDA to
  741741).
- **National Domestic Violence Hotline** ([thehotline.org](https://www.thehotline.org/get-help/)):
  "call 1-800-799-SAFE (7233)," "text START to 88788," or chat at
  TheHotline.org.
- **RAINN National Sexual Assault Hotline** ([rainn.org](https://rainn.org/help-and-healing/hotline/)):
  "Call 800.656.HOPE (4673)," chat at RAINN.org, or text "HOPE" to 64673.
- **SAMHSA National Helpline** ([samhsa.gov](https://www.samhsa.gov/find-help/helplines/national-helpline)):
  "1-800-662-HELP (4357)," TTY 1-800-487-4889, free, confidential, 24/7, in
  English and Spanish; text a ZIP code to 435748. It refers people to
  treatment; it is not crisis counseling, so pair it with 988.
- **Safe-messaging sources for writing about suicide:** the
  [Recommendations for Reporting on Suicide](https://reportingonsuicide.org/recommendations/)
  (say "died by suicide," never "committed"; no method, location, or note
  content; no sensational headlines; list warning signs and help; include
  stories of hope and recovery), the
  [Action Alliance Framework for Successful Messaging](https://suicidepreventionmessaging.org/action-alliance-framework-successful-messaging),
  988's guidance [for the press](https://988lifeline.org/professionals/for-the-press/),
  and the Action Alliance's
  [Suicide Prevention Competencies for Faith Leaders](https://theactionalliance.org/faith-hope-life/resource/suicide-prevention-competencies-faith-leaders-supporting-life-during-and-after-suicidal).

### 5.7 Names and instruments not to imitate

Proprietary, and never to be copied, echoed in a quiz's structure, or used
as a name: THE 5 LOVE LANGUAGES (Moody Bible Institute; build from 1
Corinthians 13 instead); Myers-Briggs and MBTI; CliftonStrengths and
StrengthsFinder (Gallup; licensing required); Everything DiSC (Wiley); the
Enneagram Institute's materials and the RHETI test (whether to engage the
Enneagram at all is James's call); PREPARE/ENRICH (certified facilitators
only); SYMBIS; and for group programs, Celebrate Recovery, GriefShare,
DivorceCare, and Alpha (name LiveWell's groups differently). Unconfirmed but
treat as protected: Gottman materials, Financial Peace University, and SHAPE.

**Scripture permissions.** The research found Crossway's current terms allow
quoting the ESV without permission up to 500 verses and not more than 25% of
the work, with a required notice (free handouts need only "(ESV)"). Confirm
on [crossway.org/permissions](https://www.crossway.org/permissions/) before
building Scripture-heavy printables; this is why bulk verse text should use
the Berean Standard Bible.

### 5.8 What the research could not verify

Google Trends search volumes; download data for printables; a representative
survey of what pastors counsel most; Enneagram use in churches; Bible
Gateway's own 2025 page; and three trademarks (Gottman, Financial Peace
University, SHAPE). Treat these as open until the site's own data or a
primary source settles them.

---

## 6. The organizing idea: one need, one complete kit

Start from the need, not the format. For every need on the map in Section 5,
build a **need kit**: every format that genuinely helps with that need,
written to one standard, linked into one path, and registered in one place.

**The registry.** Create `client/public/needs/index.json` (built by a new
`scripts/build-needs-index.mjs`, validated by a new
`scripts/validate-needs.mjs`, gated in CI). One entry per need:

- `slug`, the need in the reader's words (`title`, for example "I can't stop
  worrying"), the plain synonyms people search (`askedAs`: "anxiety," "can't
  sleep because of worry," "Bible verses for anxiety," "how to stop
  overthinking"), the reader states it serves, and a `sensitivity` level
  (`crisis`, `high`, `ordinary`) that drives the care rules;
- the kit: the care page, the self-check (if one genuinely helps), the tool,
  the care plan, the study guide or guides, the printables, and the related
  life pages, how-tos, wisdom topics, and essays, each by its real route;
- `helpingSomeone`: the page section or resource for parents, friends,
  spouses, and leaders.

The registry is the connective tissue. It powers the new `/help` front door,
every self-check's next steps, "More on this," the Library catalogue, the
sitemap, and a link check that fails CI when any kit points at a retired
route.

**What a complete kit contains** (a format is included only when it truly
helps; a need with no honest self-check gets none):

1. **The care page** (Section 7.1): the flagship, in the reader's words.
2. **A self-check** (7.2), where honest self-examination helps.
3. **A tool** (7.3), where doing something beats reading something.
4. **A care plan** (7.4): eight weeks, one step at a time.
5. **A study guide** (7.5) for a group or a pair; most needs already have one
   of the 62, so link and extend before writing new.
6. **Printables** (7.6): a one-page guide, a prayer card, a Scripture card
   set, and one worksheet, at minimum.
7. **The library around it**: the life pages, how-tos, wisdom topics, and
   essays that already exist, linked both ways.

---

## 7. The standard, by format

### 7.1 Care pages (the Find Help flagship)

Route: `/help/<slug>`, content in `client/public/needs/<slug>.json`, rendered
by one page component on the editorial system.

**Layered depth.** The first screen serves the person who can read only one
screen. The depth below serves the person who stays. Nothing above the fold
requires scrolling to be safe.

Every care page, in this order:

1. **The title in the reader's words** ("I can't stop worrying," "My marriage
   feels dead," "My kid won't talk to me anymore"), with a one-paragraph
   answer beneath it that names the experience precisely and without
   minimizing it.
2. **The help block**, for `crisis` and `high` sensitivity: the verified crisis
   resources for this need (Section 8), tap-to-call and tap-to-text on phones,
   placed before anything else a person could scroll past.
3. **"What's happening"**: honest description of the struggle, what is true
   in the common explanations, and what they leave out. No diagnosis.
4. **"What Scripture says"**: three to six passages, quoted verbatim, each
   read in its context and allowed to do work, never proof-texted.
5. **"Why this is so hard"**: the deeper cause, including the history,
   culture, and assumptions beneath the symptom (symptom, cause, wisdom).
   Witnesses named only where they do real work.
6. **"What to do this week"**: concrete, realistic steps, the smallest
   faithful thing first. Practices, not platitudes.
7. **"When to get more help"**: the signs that mean a doctor, a counselor, a
   lawyer, or the police; how to find a Christian counselor or any licensed
   one; what to say on the first call; what it costs and how to find low-cost
   options. Stated plainly as not medical, legal, or financial advice.
8. **"If you're helping someone"**: for the parent, friend, spouse, leader, or
   pastor: what to say, what never to say, and what to do next.
9. **A written prayer**, short, in James's register, honest about the dark.
10. **"Go deeper"**: the rest of the kit, from the registry.
11. **Questions people ask**: five to ten real questions in everyday words,
    each answered in a full paragraph (marked up as FAQ structured data).

Length: 2,500 to 4,500 words for `high` and `ordinary` needs, with the first
two sections complete in under 250. `crisis` pages lead with the help block
and keep the whole page shorter and quieter.

### 7.2 Self-checks and assessments

- **Honest about what they are.** A reflection instrument is called a
  self-check, never a test or a diagnosis, and says so on its first screen. Do
  not build clinical screeners. If a validated, free-to-use clinical screener
  is ever used, it is presented exactly as published, with its published
  scoring, its source cited, its license verified, and its limits stated.
- **Items.** Each measures one thing, in plain words, with balanced response
  options. Twelve to forty items, grouped in three to eight areas. Reverse-score
  some items to catch reflexive answering.
- **The safety item.** Every self-check touching mood, marriage, family,
  addiction, grief, or faith crisis includes a direct, gentle, optional
  safety question (thoughts of self-harm or of not wanting to be alive; fear
  of someone at home). Any answer that signals risk shows the help block
  immediately, before and regardless of the score.
- **Interpretation.** Every band of every area gets its own interpretation:
  150 to 300 words for overall bands, 80 to 150 for area bands, specific to
  that level, never the same paragraph repeated. Then three concrete next
  steps drawn from the registry, not a generic library link.
- **Formation, not grading.** Results end on a way of seeing and a next step,
  never on a number alone.
- **Couple mode** for marriage, and a parent-and-teen conversation mode for
  parenting: each person answers separately, then they see the gaps together,
  with a guided conversation.
- **History and retake.** Every instrument saves device-locally through
  `lib/storage.ts`, shows change over time, and offers "Change my answers."
- **Print.** Every result prints cleanly and can be saved as a PDF.
- **Never imitate proprietary instruments.** Branded frameworks (Section 5.7) are
  named only to explain how ours differs, never copied.

### 7.3 Tools

A tool is a finished product, not a widget. Every tool has:

- a first screen that says what it does, how long it takes, and that nothing
  leaves the reader's device;
- the instrument itself at reading size, usable with one thumb;
- output that interprets, not just displays, and ends with next steps from the
  registry;
- save, print, and share (through the shared helpers, "Copied" only when true);
- no link to a retired page, verified by the link check.

**Consolidate before adding.** Merge the six "verses by topic" tools into one
Scripture-for-what-you're-facing tool with modes; the two glossaries into one;
the three life check-ups into one flagship with modes; the four rule-of-life
versions into one builder with one companion guide. Each merged route
301-redirects to its successor. Fewer, deeper tools are the elite standard.

**Deepen the thin ones**: the Prayer Generator (the prayers the help pages
promise, and the editing the hub promises), Proverbs in 31 Days (the chapter
and a real reflection, with progress), the Bible Study Guide and the Deep Bible
Companion (merge, then cover every book), Parenting Verses and Bible-on
(application and next steps, or fold them into the Scripture tool).

**Add the companions the top needs call for**, each justified by the demand
map: a worry journal with a guided evening reflection, a conversation guide
for couples and for parents of teens, a reading-plan builder with printable
output, a prayer planner, and a budget that starts from generosity.

### 7.4 Care plans

Eight weeks, one step a week, for a person walking through a need alone or
with one friend. From 7 to at least 25, one for every `high` and `crisis`
need that a plan can serve. Each week: the focus, why it matters, one
practice, one reading from the kit, one tool, one reflection question, and a
check-in that saves progress. Every plan prints as a booklet. Add `/plans` as
a real index. Fix all twelve redirected links in the existing plans.

### 7.5 Study guides and group curriculum

The 62 guides are the deepest thing in the section. Protect that depth and
connect it:

- **Link every guide into its kits** (registry) and add written-in links from
  sessions to the relevant care page, tool, plan, life page, and how-to.
- **Add a `theme` field and a filterable index** (chips by need and by
  format: four, six, or eight weeks; individual or group).
- **Put the missing material in the leader PDF**: the facilitator script,
  glossary, Scripture index, timeline, and further reading now live only on
  the web.
- **Crisis lines** in every guide on grief, lament, anxiety, mental health,
  suffering, doubt, deconstruction, marriage, anger, and addiction.
- **New guides only where the map demands them**, starting with what does not
  exist: teens (a youth track), children and families (short, age-banded,
  printable), addiction and recovery, sexuality and the body, divorce and
  blended families, caregiving and aging parents, and seasonal series for
  Advent and Lent. Same structure and depth as the existing 62.
- **Reconcile the two small-group families**: decide, with James, how the 90
  group guides and the 62 study guides relate, and present them as one
  curriculum shelf.

### 7.6 Downloads and printables

A printable is designed to be printed, not a web page saved as a PDF.

- Every file in US Letter and A4, tagged for accessibility, with the brand's
  typography and generous margins, and the required Scripture notice (Section
  8).
- **Per need**: a one-page guide (the care page's first screen and next steps,
  for a refrigerator or a pastor's desk), a prayer card, a Scripture card set,
  and at least one worksheet (a worry log, a conflict conversation guide, a
  budget, a grief journal page, a weekly rule of life).
- **Across the section**: reading plans (30 days, 90 days, a year, a Gospel in
  a month), prayer journals, Scripture memory card sets, family devotion
  cards, a marriage retreat guide, a premarital workbook, and seasonal packs
  timed to the calendar in Section 5.
- **Printable results** for every self-check and **printable plans** for every
  care plan.
- **One gating rule, everywhere.** Decide with James whether any file is
  email-gated. Whatever he decides, the guide pages and `/downloads` must
  agree, and a failed signup must never be treated as a success.

---

## 8. Care and integrity (non-negotiable)

These govern every word in the section. They extend "Care for the reader in
the hard places" and "Inform; do not pose as the professional" in `CLAUDE.md`.

- **The crisis block.** One shared component, fed by one data file of verified
  resources (`client/public/needs/crisis-resources.json`), each entry carrying
  the exact number or text code, the wording from the official source, the
  source URL, and the date it was verified. Tap-to-call and tap-to-text on
  phones. Re-verify every entry before each release; a stale number is a
  safety failure. The verified starting set is in Section 5.6.
- **Suicide and self-harm.** Follow the published safe-messaging
  recommendations for writing about suicide (cited in Section 5.6): no method
  details, no framing of suicide as a solution or an inevitability, the help
  block first, and hope stated honestly without minimizing the pain.
- **Abuse and safety.** Safety before reconciliation, always. Never counsel a
  person to stay in danger to preserve a marriage or a family. Name abuse
  plainly, including spiritual abuse. For church leaders, state that mandated
  reporting laws may apply to them, that they vary by state, and that they
  must check their own obligations; never give legal advice.
- **No diagnosis.** Describe experiences; never tell a reader they have a
  condition. Encourage evaluation by a qualified professional.
- **Not professional advice.** Every page that touches health, law, or money
  says plainly that it is not medical, legal, or financial advice, and gives
  the reader what they need to find the right professional.
- **Children and teenagers.** Age-appropriate language, no content a parent
  would be alarmed to find, and nothing that asks a minor to share private
  information.
- **Privacy.** Every self-check, tool, and plan keeps its data on the reader's
  device. No accounts, no tracking of answers, and a first-screen sentence
  saying so.
- **Never fabricate.** No invented quotations, statistics, studies, stories,
  testimonials, counselors, or biography. James's own stories come only from
  James (Section 12). A claim that cannot be verified is left out.
- **Scripture.** Quote verbatim, with the reference. ESV by default in prose,
  within Crossway's published quotation limits and with the notice Crossway
  requires (verify the current terms). For bulk verse text at scale (card
  sets, full reading plans), prefer the Berean Standard Bible, which the Study
  Bible already uses under its public-domain dedication.
- **Contested questions** (divorce and remarriage, sexuality, gender and
  office, cessation of gifts, and similar): follow "Handling a contested
  doctrine" in `CLAUDE.md`. State each position fairly, name how much it
  matters, and say where James lands only in his own words.

---

## 9. The voice of the Grow section

`docs/VOICE-JAMES-BELL.md` governs. Its genre dial sets the register by
format:

- **Care pages** take the warmer, simpler register the voice standard gives to
  pastoral and leadership communication (direct, shepherding, practical),
  with the essay voice's depth in the "Why this is so hard" section. Full
  thoughts in developed paragraphs; short sentences only at a real hinge.
- **Self-check interpretations** are plain, honest, and specific: what this
  result usually means, what it does not mean, and what to do.
- **Curriculum** keeps the intellectual depth while making every movement easy
  to say aloud, as the standard asks of sermons.
- **Printables** compress without becoming slogans.

**Everyday language, deep substance.** Headings, titles, and the first lines
of every page use the words readers use ("I can't stop worrying," not "A
Theology of Anxiety"). The depth lives underneath, in plain intelligent
English: technical terms only when needed, and then explained without talking
down.

**Help content drifts toward therapy-speak. Refuse it.** The Forbidden
Language list in `CLAUDE.md` applies literally, and its therapy-speak entries
("hold space," "your truth," "do the work," "your feelings are valid," "lean
into," "showing up") are the ones this section is most tempted by. So are
clean application turns and comfortable closings. Validate the feeling;
never validate the despair. Honor real pain before offering correction, and
refuse both condemnation and easy reassurance.

**James's life.** He came to faith from atheism, was raised without a father,
and is raising five sons; those facts may shape the writing. Never invent a
story, a conversation, a congregant, or a detail of his life. Where a page
would be stronger with his own experience, leave a marked slot for him to
fill (Section 12).

---

## 10. The work, in waves

Rank everything by demand (Section 5) times the size of the gap (Section 4).
Ship in batches: drafts stay local and pushes happen once per batch (Vercel
caps deployments per day). Each wave ends with the full verification in
Section 11.

**Wave 0: repair (one short pass, before anything new).**
Fix every link in the section that points at a retired or redirected route
(tools, assessments, plans, life pages, how-tos); list all live instruments
on `/assessments` and remove the one that is gone; fix the `/tools` group
filters so every listed tool appears; put a direct help link on every
self-check result (on phones, help is reachable only through the menu); add
the shared crisis block to `/help`, every care plan, and every guide and life
page on a `high` or `crisis` subject; make the Start Here quiz (`/start`)
send "In crisis" straight to help (today it returns a reading list and
mentions Help without linking to it) and honor its third question, which no
answer combination currently changes; add a `/plans` index; resolve the
gating contradiction.

**Wave 1: the front door and the first twelve kits.**
Build the registry, the new `/help` ("What are you facing?": a search box that
understands everyday phrasing through each need's `askedAs`, chips for the
most common needs, and the five reader states), and complete kits for the
twelve highest-ranked needs on the demand map.

**Wave 2: self-checks rebuilt.**
Bring every existing instrument to the standard in 7.2 (interpretation per
band, the safety item, specific next steps, history, print, couple and
parent-and-teen modes where they belong), then add instruments for the ranked
needs that lack one.

**Wave 3: care plans from 7 to 25 or more, printable.**

**Wave 4: printables.** The per-need set for every completed kit, then the
section-wide library and the seasonal packs, timed ahead of their season.

**Wave 5: curriculum.** Link and filter the 62, move the missing material into
the leader PDFs, reconcile the group-guide shelf, then write the new guides
the map demands (youth first).

**Wave 6: tools.** Consolidate, deepen, then add the companion tools.

**Wave 7: the rest of the map.** Complete kits for every remaining need, until
every need a pastor hears in a year of counseling has a home.

---

## 11. Acceptance tests

A wave ships only when these pass, and the commission signs each resource.

- **Registry coverage.** Every need on the map has a registry entry; every
  entry's kit meets Section 6; `validate-needs.mjs` passes in CI.
- **No dead ends.** Zero links from any Grow resource to a retired, redirected,
  or missing route (extend `validate-links.mjs` to the Grow JSON and the
  registry).
- **Care.** Every `crisis` and `high` page shows the help block on its first
  screen at 390px; every entry in the crisis data carries a source and a
  verification date inside the last release cycle; every self-check on a
  sensitive subject has the safety item and surfaces help on a risk answer
  regardless of score (tested).
- **Depth.** Care pages within the length and section requirements of 7.1;
  every band of every self-check interpreted within 7.2's ranges, with no two
  bands sharing a paragraph; every plan eight weeks with every field present.
- **Voice.** Zero Forbidden Language hits (automated), no em-dash as a
  connector, every exclamation inside quoted Scripture, and a read-aloud pass
  by the Editor in Chief on every care page.
- **Truth.** Every Scripture quotation verbatim with its reference; every
  statistic, study, and name verified with a source in the content file; every
  proprietary caution respected.
- **Print.** Every printable renders in Letter and A4 and passes an
  accessibility check.
- **Reach.** Every care page's title and first line use the reader's words
  from its `askedAs`; every page declares literal `SEOMeta` and FAQ structured
  data; every new route is in the sitemap and prerendered; the canonical audit
  passes.
- **The site gates.** `pnpm check`, every content validator, `pnpm test`, the
  build, the canonical audit, and the design census in
  `scripts/design-audit/`.
- **The reader's test.** Read each care page as the person in Section 3's
  first state, at midnight, on a phone. If they would not know what to do next
  within one screen, it is not finished.

---

## 12. What only James can supply

Stop and ask for these rather than inventing them:

- his own stories, where a page would be stronger with them (leave a marked
  slot; never fill it);
- where he lands on contested questions a page must address (divorce and
  remarriage, sexuality, and the rest);
- approval of the tone of every `crisis` page before it ships;
- the site's Search Console queries and analytics top pages, so demand is
  measured from real readers as well as research;
- whether any files are email-gated, and his decision on the paid ebook files
  that currently sit in a public folder;
- whether the 90 group guides and the 62 study guides become one shelf;
- any local counselors, ministries, or recovery groups he trusts enough to
  recommend by name.

---

## 13. What to hand back

For each wave: a pull request that lists every resource created or changed
with its route, the registry diff, before-and-after screenshots at 1440 and
390 of the front door and a sample of care pages, the acceptance-test results,
the commission's sign-off on each care page, and a plain-language list of what
only James can decide. No victory laps; say what was not verified.
