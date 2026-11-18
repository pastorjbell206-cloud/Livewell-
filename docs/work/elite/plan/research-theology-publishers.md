# Research notes: theology publishers

Group: The Gospel Coalition, Desiring God, Ligonier (with its teaching series and Tabletalk).
Date: 2026-11-18. Read first: `docs/work/elite/PROJECT-PROMPT.md` and `docs/work/audit-2026-11/AUDIT.md` sections 1 to 4.

## How far to trust these notes

**No page on any of the three sites was fetched.** The session's network refused all three hosts (`www.thegospelcoalition.org`, `www.desiringgod.org`, `www.ligonier.org`: "getaddrinfo ENOTFOUND", which in this environment means the host is outside the allowed network list). I did not swap in other sites, because the block is on the network, not on these sites, and an equivalent publisher would have failed the same way.

Everything below comes from **14 web searches restricted to the sites' own domains**: page titles, page addresses, and the search engine's summaries of those pages. That is good evidence for how a library is organized (the address patterns show it plainly) and for what a section says about itself. It is weak or no evidence for how a page looks. So:

- I report nothing about typography, layout, spacing, the look of an essay page, where the newsletter box sits, or what the home pages show. None of that was seen.
- Counts and dates come from search summaries, which the search tool warned may be from older snapshots.
- To finish this group properly, these three hosts (plus `learn.ligonier.org` and `tabletalkmagazine.com`) need to be allowed in the session's network settings and the home page, one essay page and one index page of each fetched.

Nothing here copies text, artwork or code. The borrowings are patterns.

---

## 1. The Gospel Coalition (thegospelcoalition.org)

### Seen (search results only, not fetched)

- `https://www.thegospelcoalition.org/` (title and menu summary only)
- `https://www.thegospelcoalition.org/topics/` and topic pages `/topics/church-history/`, `/topics/early-church/`, `/topics/american-church-history/`, `/topics/general-history/`, `/topics/catechism/`, `/topics/commentary/`
- `https://www.thegospelcoalition.org/sections/` ("Resources by Section Type")
- `https://www.thegospelcoalition.org/courses/`, `/courses/about`, `/courses/search/`, and course pages such as `/course/knowing-bible-mark/`, `/course/hebrews/`, `/course/19th-20th-century-church-history/`
- `https://www.thegospelcoalition.org/commentary/` and book pages `/commentary/matthew/`, `/commentary/genesis/`, `/commentary/romans/`, `/commentary/psalm-1-psalm-41/`
- `https://www.thegospelcoalition.org/essay/biblical-theology/` and the announcement `/article/tgc-essays/`
- `https://www.thegospelcoalition.org/new-city-catechism/` and `/article/introducing-new-city-catechism/`
- `https://www.thegospelcoalition.org/newsletters/` and `/article/tgc-launches-topical-newsletters/`
- `https://www.thegospelcoalition.org/the-carson-center/`, `/pastors/`
- Author addresses follow `/profile/<name>/` (seen in one article's metadata, not opened)

### What the search results showed

- **Five ways into one library.** The site-wide filters are named Scripture, Topics, Sections, Authors and Series. The Scripture index begins at Genesis. A "sections" page lists resources by kind.
- **Topic pages are titled "Resources on X"** and the church history one opens with a short definition of the subject and its periods with dates (Patristic 100 to 500, Medieval 500 to 1500, Reformation 1500 to 1600, Post-Reformation 1600 to 1700, Modern 1700 to now) before the list. One topic page showed a "More Resources" filter by kind: article, podcast, blog, book review, video, course, essay, conference media, journal, sermon, scripture.
- **The topics index is a tree.** Under History and Biography: General History, Church History, Early Church, Medieval Church, Reformation, Modern Church History, American Church History. A "Browse" row at the top offers a few popular essays and "See All Essays."
- **Three reference shelves sit apart from the daily articles:** about 250 short theology essays in 12 categories (the Bible, the Christian life, the church, creation, end times, God, the Holy Spirit, humanity, Jesus Christ, salvation, sin, systems and methods); a free commentary with one named author per Bible book, indexed by section of the Bible; and courses. The essay page seen carries a "Further Reading" heading and an open licence notice (CC BY-SA 4.0).
- **Courses say their terms out loud.** The courses section describes itself as free of charge, free of ads, with no sign-up, login or payment, and says each section of each course has its own address so it can be shared. The church history track is split by period (Early Christianity, Middle Ages, Protestant Reformation, Post-Reformation) with separate courses on single figures (Luther, Calvin, Edwards, Spurgeon). Bible-book courses are twelve-week studies.
- **The catechism is one question a week for a year:** 52 questions in three parts, each with a short children's answer and a longer adult answer, a short commentary from a historical preacher and a short video from a living one.
- **Newsletters are plural and chosen by the reader:** a weekly digest with an editor's pick, a daily recap, and topical lists (ministry, women, books, arts and culture).
- **A Bible reading plan paired with a daily reflection** (the M'Cheyne plan with a devotional on one of the day's passages) sits in the main menu as "Read the Bible."
- The main menu also lists Podcasts, Publications and Store, and a set of named columnists' blogs.

### Best at

Being a reference library and a magazine at once: the timely articles sit on top of three permanent shelves (short theology essays, a commentary on every book, free courses), and every item can be reached five ways (Scripture, topic, kind, author, series). The courses section's plain statement of terms ("free, no ads, no sign-up") is the clearest promise of its kind I found in this group.

### Borrow

1. **A Scripture index over everything, not only the Bible reader.** LiveWell has notes on 1,189 chapters, and separately 62 doctrine studies, 68 study guides, 36 honest answers, 22 history essays, devotions and essays that all cite passages. Build one generated index (the same pattern as the existing `build-*-index.mjs` scripts) that, for each book and chapter, lists every piece on the site that treats it. Show it on the chapter page as "Elsewhere on LiveWell for John 3" and as a browsable index from Study.
2. **Topic pages that open with two sentences of definition and then group by kind.** LiveWell's /topics pages already exist; give each a short plain definition, then fixed groups in a fixed order: the Honest Answer, Bible chapters, doctrine study, history lesson, study guide, family devotion, tool. Same order on every topic, so a reader learns the shape once.
3. **Church history split by period, with single-figure lessons hanging off each period.** The audit says LiveWell's 22 essays run the timeline twice. Choose one numbered path by period with dates in the title line, and attach the people and councils entries (which already exist as data) to their period as side lessons.
4. **State the terms on the door of every library.** One quiet line at the top of Study, Family, Topics and the downloads page: free, no ads, no account, nothing gated. LiveWell already keeps this promise; it says it in only one place.
5. **Every part of a long piece has its own address.** Each catechism question, each night of a devotion, each lesson question set and each Honest Answer step should be linkable and shareable on its own, so a parent can text one question and a pastor can link one lesson.
6. **Catechism as a year: one question a week, child's answer and adult's answer side by side, plus one short voice from church history.** LiveWell's 76 questions already carry a "for the little ones" answer. Add a week-by-week pacing view and, only where a real primary text is already in the verified sources store, one short checked quotation. No wording of the catechism changes without James.

### Refuse

- **The volume and the many voices.** Dozens of authors, blogs, podcasts, conference media and a store make a portal. LiveWell is one man's voice; its index should stay small enough to read in one screen per topic.
- **The store and "Publications" in the main menu.** The brief says no giving page and no membership; books stay under About.
- **A stack of newsletters.** One letter, one sign-up, linked to Substack.
- **Filters as the main way in.** Eleven kinds of resource is a librarian's view. LiveWell's reader should meet seven fixed groups at most, in plain names.
- **A coalition's tone.** Search results cannot show tone, so this is a caution from the brief and not a finding: a network site speaks for a camp. LiveWell writes toward the skeptic and must not read as a tribe's house organ.
- **Timely commentary as the front page.** The audit already found the home page reads as "mainly about politics." The reference shelves lead; the news cycle does not.

---

## 2. Desiring God (desiringgod.org)

### Seen (search results only, not fetched)

- `https://www.desiringgod.org/topics` ("Topic Index for Resources"), `/topics/with-books`, and topic pages such as `/topics/god/all`, `/topics/bible-reading/all`, `/topics/creation/interviews`, `/topics/pastoral-ministry/all`
- `https://www.desiringgod.org/resources/all` (with sort by views)
- `https://www.desiringgod.org/scripture/romans`, `/scripture/romans/messages`, `/scripture/romans/articles`, `/scripture/romans/8/messages`, `/scripture/romans/8/labs`, `/scripture/1-peter/1/labs`
- `https://www.desiringgod.org/series/romans-the-greatest-letter-ever-written/messages`
- `https://www.desiringgod.org/labs`, `/labs/all`, `/labs/the-greatest-chapter`
- `https://www.desiringgod.org/authors`, `/authors/with-books`, `/authors/john-piper`, `/authors/john-piper/books`

### What the search results showed

- **The address is the index.** Scripture goes book, then chapter, then kind: `/scripture/romans`, `/scripture/romans/8`, `/scripture/romans/8/messages`, `/scripture/romans/8/labs`. Topics go `/topics/<topic>/<kind>`. Authors go `/authors/<name>` and `/authors/<name>/books`. A reader, or a search engine, can guess any address.
- **Lists can be sorted** by Bible verse order or by most viewed.
- **Every entry carries its kind and its passage** as a small label ("Article", "Look at the Book", "Light + Truth", with "Scripture: 1 Peter 3:19–20").
- **The topic index is a tree with counts** beside each subtopic, under broad heads such as The Christian Life, God, and Bible Translation and Interpretation.
- **Four named formats recur everywhere:** a question-and-answer series, a daily devotional, a classic sermon series, and Look at the Book.
- **Look at the Book** describes itself as videos of 8 to 12 minutes in which the camera stays on the Bible text while the teacher underlines, circles, draws connections and writes notes on it. Episodes are filed by book and passage and gathered into short series (one on Romans 8).
- **The author index** lists about 860 names alphabetically with a count each, and a second, shorter index of authors who have books.
- Not found in results: the top-level Scripture index page, a topic index for the question-and-answer series, the article page layout, the newsletter, any donation ask. I report nothing on those.

### Best at

Teaching a reader how to read a passage, and filing a whole life's teaching by passage. Look at the Book puts the text on screen and marks it up in front of you, and the Scripture index goes down to the chapter and then to the kind of resource, so "what is there on Romans 8" has one predictable address.

### Borrow

1. **"Watch the passage being read": a marked-up text view for chosen passages.** LiveWell already has verse-by-verse notes and Greek and Hebrew under every word. For a few dozen key passages, build a step-through view where the text stays on screen and each tap adds one mark: a repeated word highlighted, a "therefore" linked back to its ground, a contrast bracketed, with one sentence from the existing notes beside it. No video needed; it is text and drawn marks, works on a phone, and is exactly the "tools that teach" the brief asks for. Start with the passages that already have verse-level notes.
2. **Guessable addresses for the Scripture index.** `/study/john/3` is the chapter; let `/study/john/3/answers`, `/study/john/3/guides` and so on (or one "Elsewhere" panel with anchors) list each kind. The data is the generated index proposed under TGC item 1.
3. **A small kind-and-passage label on every card.** One line above every title, site-wide, in the existing eyebrow style: the kind in plain words (Answer, History lesson, Devotion, Study guide, Tool) and the main passage. This also serves the audit's "one word per thing" finding.
4. **Counts in the indexes.** "Suffering (4 answers, 3 guides, 2 devotions)" tells a reader the shelf is real before they tap. LiveWell's manifests already hold the numbers.
5. **Two sort orders on long lists, no more:** Bible order and "start here" (an editor's order, since LiveWell does not and should not rank by views).
6. **A few named recurring formats, kept to a few.** The audit found five names for self-checks and four indexes of hard questions. Settle on a short fixed set of format names and use each the same way everywhere.

### Refuse

- **The size.** Ten thousand entries under one name is an archive to be searched; LiveWell is a course to be walked. Do not build paginated lists that run to hundreds of pages.
- **Sorting by popularity.** It trains a site toward the hot take. The brief says depth over reach.
- **Video and audio as the main form.** LiveWell is a reading site and has no such library; do not start one to imitate this. The marked-up passage should be built in text.
- **An author index.** One author. The About page is the author page.
- **Format names that are brand names.** A newcomer cannot tell what an insider title holds. The audit's plain-language rule stands: name the thing by what it is.

---

## 3. Ligonier (ligonier.org, learn.ligonier.org) and Tabletalk (tabletalkmagazine.com)

### Seen (search results only, not fetched)

- `https://learn.ligonier.org/series`, `https://ligonier.org/learn/series/?filter=free`
- `https://learn.ligonier.org/series/a-survey-of-church-history-part-1` (also parts 4, 5, 6 and `/series/survey-of-church-history-parts-1-6`), with lesson pages such as `/series/a-survey-of-church-history-part-1/constantine-and-the-church`
- `https://learn.ligonier.org/topics` ("Topic Index"), `/topics/church-history`, `/topics/general-church-history`, `/topics/american-church-history`, `/topics/biblical-studies`
- `https://learn.ligonier.org/guides`, `/guides/church-history`, and the announcement `https://ligonier.org/learn/articles/guides`
- `https://learn.ligonier.org/devotionals`, `/devotionals/book-scripture`
- `https://www.ligonier.org/posts/how-to-use-ligonier-resources-for-personal-study-and-discipleship` (and the Bible study and Sunday school versions)
- `https://www.ligonier.org/posts/ligonier-connect-announces-unlimited-access-plan`, `https://www.ligonier.org/faqs/what-is-my-learning-library`
- `https://store.ligonier.org/a-survey-of-church-history-part-1-study-guide`
- `https://tabletalkmagazine.com/`, `/issue-archive/`, `/print-issue/`, `/daily-study/`, `/daily-study/2026/11/the-testimony-of-god/`, `/about/`

### What the search results showed

- **Teaching series are the unit.** More than two hundred series, each a set of short messages, many with a study guide. The series list filters by topic, teacher and Bible book, and there is a "free" filter in the address.
- **Church history is one course in six parts by century band** (100 to 600, then onward to 1900 to 2000), about twelve lessons a part, one teacher throughout. Each lesson has its own page and address under its series, with a plain title ("Constantine and the Church", "Developing Theology").
- **Guides are a layer above the topic index.** They are described as overviews and explanations drawn from the topic index, with quotations and links on to further topics and resources. Each guide card carries its category (Theology, Christian Living, Worldview and Culture, Church History, Biblical Studies). The church history guide frames the subject as two strands, the events and the teachings, and breaks it into dated periods.
- **The topic index is a tree.** Church History holds General Church History, Biography, Theologians, Missionary Biography, Eras and Movements and more. A topic page has a Scripture filter.
- **Devotionals are filed by topic, teacher and passage,** and many are reprinted from the magazine's daily studies.
- **"How to use" pages by setting:** personal study and discipleship, a Bible study group, Sunday school. The personal one says: pick a series on a topic or book, watch the messages, complete the study guide as you go.
- **Tabletalk is a monthly issue with one theme** (the latest three: the mortification of sin, faith and work, assurance of salvation) plus a study for each day of the month that walks through one Bible book (November 2026 is in 1 John). The daily studies are archived by month, each with its own page and passage.
- **Money.** Study guides are sold (a PDF guide was listed at $3.75). A paid subscription gives access to more than 100 courses with quizzes and discussion questions. The magazine is offered on a free three-month trial, "no credit card required," with the archive attached to the subscription. Purchased guides live in a "My Library."
- Not found in results: a teachers index page, the newsletter sign-up, the home page, the look of a lesson page. I report nothing on those.

### Best at

Turning a library into courses. One teacher takes a subject (church history, a Bible book) through a numbered run of short lessons with a study guide, and a "guide" page above the topic index explains the subject in plain words before sending you to the lessons. Tabletalk adds the monthly rhythm: one theme, and one book of the Bible read a day at a time.

### Borrow

1. **Church history as parts and numbered lessons.** This is the audit's item 8 and the brief's "done" line 4. Set LiveWell's history as a few parts by century band, each with numbered lessons that have plain titles, their own addresses, previous and next, the checked primary sources (22 are already verified in the sources store), and the questions for each lesson, free on the page. LiveWell's edge is that the questions and sources are not sold separately.
2. **A guide page for each big subject: the plain overview above the shelf.** One page each for a short list (the Trinity, the resurrection, the Reformation, how we got the Bible, suffering, and so on): three or four paragraphs in James's voice saying what it is and why it matters, then the doctrine study, the history lesson, the Bible chapters, the Honest Answer and the study guide in a fixed order. This is how the 62 doctrine studies, 22 history essays and 36 answers stop being separate shelves. The overviews are new writing and go to James first.
3. **"How to use this" by setting.** Three short pages or one page with three parts: on your own, with your family, with a group or class. Each puts existing pieces in order. This answers the audit's item 11 ("shelves and no road") and gives the pastor reader his "can I hand this to my people" page.
4. **A monthly rhythm made from what exists.** One theme a month on the home page, drawing one essay, one answer, one study guide and that month's family devotions together, with a day-by-day reading through one Bible book using the chapter notes already written. The reading plan "that knows today" in the brief is the engine; the theme is an editor's choice, twelve a year.
5. **Daily studies with their own dated addresses, kept forever.** Each day of a reading plan gets a stable address and stays reachable in an archive by month and by book, so a reader who misses a week can pick up, and a link shared in June still opens in December.
6. **Category on every guide and lesson card,** in the eyebrow line, from a short fixed list. Same point as Desiring God item 3; two of three sites do it.

### Refuse

- **Every form of the paywall.** Paid study guides, a paid course subscription, a free trial that leads to a bill, an archive tied to a subscription, a "My Library" of purchases. The brief: "Everything is free and nothing hides behind a sign-up." LiveWell's "My Library" stays what it is, things saved on the device.
- **Quizzes and progress kept in an account.** Keep place and progress on the device with the existing storage helper.
- **A store in the path of study.** A reader who wants the questions for lesson 4 should never meet a price.
- **Many teachers.** The course works because one voice carries it; LiveWell already has that and should not dilute it.
- **A confessional camp as the frame.** Seen in results: courses titled as the basics and foundations of one tradition's theology. LiveWell's brief and its Scholarship Standard require second-order questions to be stated in each side's strongest voice and left open. Borrow the course shape, not the party line.
- **Two front doors.** The results show the library on one host and the ministry on another, with two address patterns for the same series list. LiveWell keeps one site, one address per thing.

---

## What the three have in common, and what it means for LiveWell

1. **Scripture and topic are the two universal indexes.** All three file everything both ways, and the addresses show it. LiveWell has a superb Bible reader and a topics door but nothing that joins the two to the rest of the site. The single highest-value borrowing in this group is one generated cross-index: for every chapter and every topic, everything on the site that treats it.
2. **A reference shelf under the magazine.** The best of each site is the permanent material: short theology essays, a commentary, courses, guides. LiveWell's permanent material is already larger than its essay shelf. Lead with it.
3. **Courses are numbered lessons with their own addresses and a study guide.** Two of three do this for church history by century band. LiveWell should, and can give away what Ligonier sells.
4. **Kind and passage labelled on every card.** Cheap, and it fixes a named audit finding.
5. **A daily or weekly rhythm.** A reading plan with a reflection, a study a day, a catechism question a week. LiveWell has tonight's devotion and a reading plan; add the catechism week and the monthly theme.

**Where LiveWell can be better than all three.** None of the three, on this evidence, puts the Bible text, the notes, the original languages, the history and the family table in one place in one voice, free with no account. The Gospel Coalition comes nearest on free reference material but in many voices and without a Bible reader in these results. Ligonier has the course shape but sells the study guides. Desiring God has the deepest Scripture index but it points to sermons, not to a text you study in. LiveWell's combination is the one the brief names.

## What I could not learn

- The look of any page: type, layout, the essay title block, the end of an essay, the newsletter box, the footer.
- Any home page.
- How the essay page handles related reading, author line, sharing and asks. Only one heading ("Further Reading") was seen on one TGC essay.
- Author and teacher page layouts.
- Whether any of the three shows ads or donation asks on content pages.

These need the three hosts allowed and three fetches each.
