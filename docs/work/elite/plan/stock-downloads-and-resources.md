# Stock-take: downloads and printable resources

Written 2026-11-18. A read-only inventory of `/home/user/Livewell-` on branch `claude/todo-implementation-hhp4bm` (head `b2e655e6`). Nothing was built or edited. The printable PDFs are made at deploy time by `pnpm pdfs` and are not in the checkout, so every count below comes from the source files and the builders, and no PDF made by the builder was opened. The 38 files in `client/public/ebook/` are committed; those were opened and searched.

## The short version

- The site offers **619 free files** on `/downloads`: 599 PDFs built at deploy and 20 committed booklet files. The audit's count still holds.
- Four more PDFs are built and listed nowhere (the "reading lists"), 18 paid book files sit at open addresses, and 23 older paid PDFs are held back for past buyers. In all, **664 files** a person can end up with.
- Most printables can be reached from the page they belong to. The exceptions are in section 4.
- Two things break the standing rules today. The study guide page and the skeptic page ask for a sign-up before the file opens. Seven of the ten church-leader booklets name the Pastors Connection Network inside the file.
- Ten study guides (twenty PDFs) say they are drawn from a James Bell book that is not on the three-book shelf.

## 1. Count by kind

| # | Kind | Items | Files | Where the files come from | Who it is for |
|---|------|------:|------:|---------------------------|---------------|
| 1 | Study guide: leader's guide and participant handout | 68 | 136 | `scripts/build-pdfs.mjs` from `client/public/studyguides/*.json` | Small-group leaders, Sunday school teachers, pastors |
| 2 | Context guide printable | 41 | 41 | `scripts/build-pdfs.mjs` from `client/public/context/guides/*.json` | Serious readers, teachers |
| 3 | Find Help kit (one-page guide, prayer cards, Scripture cards, week worksheet; Letter and A4) | 40 | 320 | `scripts/lib/help-printables.mjs` from `client/public/needs/*.json` | A person in a hard season, and the friend or pastor beside them |
| 4 | Eight-week plan booklet (Letter and A4) | 29 | 58 | `scripts/lib/help-printables.mjs` from `client/public/plans/*.json` | The same person, over two months |
| 5 | Bible reading plan chart (Letter and A4) | 5 | 10 | `scripts/lib/reading-plans.mjs` from `client/src/data/bible-reading-plans.json` | New Christians, any reader |
| 6 | Worksheet (Letter and A4) | 10 | 20 | `scripts/lib/help-printables.mjs` (blank forms) | Tool users, couples, church leaders |
| 7 | Card set (Letter and A4) | 2 | 4 | `scripts/lib/help-printables.mjs` from the family devotions and the care pages | Families; anyone in a hard season |
| 8 | Workbook (Letter and A4) | 2 | 4 | `scripts/lib/workbooks.mjs` from `client/public/workbooks/*.json` | Married and engaged couples, retreat leaders |
| 9 | Seasonal family booklet (Letter and A4) | 3 | 6 | `scripts/lib/help-printables.mjs` from `client/public/family-seasonal.json` | Parents |
| 10 | Church-leader booklet (PDF and EPUB) | 10 | 20 | Committed files in `client/public/ebook/`, listed in `client/src/data/booklets.ts` | Elders, deacons, pastors |
| | **Listed on `/downloads`** | **210** | **619** | | |
| 11 | Reading list PDF (built, not listed) | 4 | 4 | `scripts/build-pdfs.mjs` from `client/public/reading-paths/index.json` | Skeptics; three have no page left |
| 12 | Paid book files at open addresses (PDF and EPUB) | 9 | 18 | Committed files in `client/public/ebook/` | Buyers; in fact anyone with the address |
| 13 | Paid PDFs held for past buyers | 23 | 23 | Committed files in `api/_ebooks/`, handed over by `api/index.ts` after a Stripe check | People who bought the older "LiveWell series" titles |
| | **All files a person can end up with** | | **664** | | |
| 14 | Book opening samples (Markdown) | 20 | 20 | `client/public/books/*-sample.md` | No one: only unrouted pages read them |

Also present, and not files: about fifteen pages offer the browser's own Print (essays, the catechism, care pages and others through `components/TakeItWithYou.tsx`, and ten tools through `window.print`). Those belong to the tools and pages inventories and are not itemized here.

**Builders that now make nothing.** `build-pdfs.mjs` still has a branch for free book PDFs (`/downloads/books/`) and one for sermon-series PDFs (`/downloads/sermon-series/`). Their source files are gone (`client/public/books/index.json`, `client/public/leadership/sermon-series.json`), so both write no files. Twenty-one `scripts/build-<book>-pdf.mjs` scripts and `scripts/book-pipeline/` exist only to make the 23 held-back PDFs.

## 2. Where the audit of 2026-11-15 is now out of date

| The audit said | What the code says now |
|---|---|
| "619 free printables. Nothing hides behind a sign-up." | 619 is right. The second sentence is not. `/studyguides/<slug>` wraps both PDFs in `components/GatedDownload.tsx`, which asks for an address and joins the person to the essay list before the file opens. `/skeptic-track` does the same for its reading list. The same study guide files open with one tap, no sign-up, on `/downloads`. |
| The auditors could not open the printable PDFs. | Still true of the built PDFs. The committed booklet files were opened for this stock-take; seven of ten name the Pastors Connection Network (section 3.9). |
| Five taken-down books "still open from Google as full sales pages." | Since commit `84fbf852` (2026-11-17) the five pages are noindex, out of the sitemap and unlinked. They are still routed, still show the $8.99 button, and their files are still at open addresses. |
| "The paid ebook files can be downloaded by anyone who has the address." | Unchanged: eighteen files, nine titles. |
| The membership page and the gift link | Gone. `/membership` sends to `/subscribe`; the gift link left the study guides and the booklet page; the old pastors' addresses land on `/resources`. No builder and no printable source names a membership or a gift. The word "membership" appears only as church membership inside studies and booklets. |
| "The Hard Issues booklets" should read "Booklets for elders and church leaders." | Done in the header and footer menus (`lib/siteNav.ts`). Not done on the page itself, on `/resources`, or in the `/downloads` shelf heading. |
| F12: the catechism and the family reading plans cannot be printed. | Unchanged. |
| Study guide titles such as "How the Story Ends." | Renamed since: the source files now lead with the topic ("The End Times: A Bible Study on How the Story Ends"). The catalogue file on disk (`client/public/catalogue/index.json`, built 2026-11-17, gitignored) is older than both changes; it still lists eight books and the old titles. The next build corrects it. |

## 3. Every item, with a verdict

"Found from its own page" means the page a person would be on when they want the paper. "Passage" means a Study Bible chapter.

### 3.1 Study guides (68 guides, 136 PDFs)

**What it is:** for each guide, a leader's guide (the full teaching and the reasoning behind each question) and a participant handout. **Found today:** Study menu, "Group study guides", then the guide; or `/downloads`. **From its own page:** yes, but behind the sign-up form. **From a passage:** partly. A Study Bible chapter lists up to six related items of all kinds; when a guide is among them the link goes to the guide's page, never to the handout.

| Guide (`/studyguides/<slug>`) | Title today | Flag | Verdict |
|---|---|---|---|
| `addiction-and-recovery` | Addiction and Recovery: A Bible Study on the Long Road Back |  | keep |
| `after-christendom` | After Christendom: A Study on Post-Christian Faith | Names off-shelf book *After Christendom* | rewrite the summary line "drawn from James Bell's book After Christendom" so the guide stands on its own; both PDFs rebuild from it |
| `aging-and-legacy` | Aging and Legacy: A Bible Study on Finishing Well |  | keep |
| `alone-in-a-crowded-church` | Alone in a Crowded Church: A Study on Church Loneliness | Names off-shelf book *Alone in a Crowded Church* | rewrite the summary line "drawn from James Bell's book Alone in a Crowded Church" so the guide stands on its own; both PDFs rebuild from it |
| `anger` | Anger: A Bible Study on Temper and Righteous Anger |  | keep |
| `anxiety` | Anxiety: A Bible Study on Worry and the Peace of Christ | Names off-shelf book *Consider the Birds* | rewrite the summary line "drawn from James Bell's book Consider the Birds" so the guide stands on its own; both PDFs rebuild from it |
| `attention` | Attention: A Bible Study on Technology and Distraction |  | keep |
| `baptism-and-communion` | Baptism and Communion: A Bible Study on the Sacraments |  | keep |
| `believe` | Believe: A Bible Study for New Believers and Seekers | Title collides with `new-believer`; names the shelf book *Believe*, which is right | rename to "Believe: A Bible Study for Skeptics and Seekers" (today it says "for New Believers and Seekers", which is the job of `new-believer`) |
| `character-before-competence` | Character Before Competence: A Church Leadership Study | Names off-shelf book *Character Before Competence* | rewrite the summary line "drawn from James Bell's book Character Before Competence" so the guide stands on its own; both PDFs rebuild from it |
| `christian-nationalism` | Christian Nationalism: A Five-Session Bible Study |  | keep |
| `church-and-empire` | The Church and Political Power Through History: A Five-Session Study |  | keep |
| `contentment` | Contentment: A Bible Study on Wanting Less |  | keep |
| `deconstruction` | Deconstruction: A Bible Study for When Your Faith Comes Apart |  | keep |
| `deep-roots` | Deep Roots: A Bible Study on the Basics of the Faith | Names off-shelf book *Deep Roots* | rewrite the summary line "drawn from James Bell's book Deep Roots" so the guide stands on its own; both PDFs rebuild from it |
| `divorce-and-blended-families` | Divorce and Blended Families: A Bible Study for Starting Over |  | keep |
| `doubt` | Doubt: A Bible Study for When Faith Has Questions |  | keep |
| `economic-justice` | Money, Work and the Poor: A Five-Session Bible Study |  | keep |
| `end-times` | The End Times: A Bible Study on How the Story Ends |  | keep |
| `fatherhood` | Fatherhood: A Bible Study for Men Without a Blueprint |  | keep |
| `forgiveness` | Forgiveness: A Bible Study on the Hardest Word |  | keep |
| `forty-days` | Lent: A Bible Study for the Forty Days |  | keep |
| `friendship` | Friendship: A Bible Study on the Love We Forgot |  | keep |
| `fruit-of-the-spirit` | The Fruit of the Spirit: A Bible Study on Growth |  | keep |
| `generosity` | Generosity: A Bible Study on Giving |  | keep |
| `gratitude` | Gratitude: A Bible Study on Thanksgiving and Grace |  | keep |
| `grief` | Grief: A Bible Study on Loss and the God Who Wept |  | keep |
| `habits-and-formation` | Spiritual Habits: A Bible Study on Formation |  | keep |
| `heaven-and-hell` | Heaven and Hell: A Bible Study on the Life to Come |  | keep |
| `holy-spirit` | The Holy Spirit: A Bible Study on the Forgotten God |  | keep |
| `hospitality` | Hospitality: A Bible Study on the Open Door |  | keep |
| `identity` | Identity: A Bible Study on Who You Actually Are |  | keep |
| `knowing-god` | The Trinity: A Bible Study on Knowing God |  | keep |
| `lament` | Lament: A Bible Study on Praying Your Pain |  | keep |
| `manhood` | Manhood: A Bible Study on What a Man Is For |  | keep |
| `marriage` | Marriage: A Bible Study on Covenant Love |  | keep |
| `mental-health` | Mental Health: A Bible Study on the Weight You Carry |  | keep |
| `mishpat` | Justice: A Bible Study on What the Bible Means by Justice | Names off-shelf book *Mishpat* | rewrite the summary line "drawn from James Bell's book Mishpat" so the guide stands on its own; both PDFs rebuild from it |
| `money` | Money: A Bible Study on Where Your Treasure Is | Names off-shelf book *Where Your Treasure Is* | rewrite the summary line "drawn from James Bell's book Where Your Treasure Is" so the guide stands on its own; both PDFs rebuild from it |
| `new-believer` | New Believers: A Study on Your First Steps of Faith |  | keep |
| `parenting-formation` | Parenting: A Bible Study on Forming a Child's Faith |  | keep |
| `pastoral-health` | Pastoral Health: A Study for Leaders and Those Who Love Them |  | keep |
| `prayer` | Prayer: A Bible Study on Learning to Pray |  | keep |
| `providence` | Where Is God When It Hurts: Suffering and the Goodness of God | Duplicate | merge into `suffering` (same question, five sessions each; carry over the Job and cross sessions). `/studyguides/providence` sends to `/studyguides/suffering` |
| `raising-believers` | Raising Believers: A Bible Study for Christian Parents | Duplicate; names an off-shelf book | merge into `parenting-formation` (two guides on forming a child's faith; this one is built on a book off the shelf). `/studyguides/raising-believers` sends to `/studyguides/parenting-formation` |
| `resurrection` | The Resurrection: A Bible Study on the Evidence |  | keep |
| `sabbath` | Sabbath: A Bible Study on Rest and Hurry |  | keep |
| `sermon-on-the-mount` | The Sermon on the Mount: A Bible Study |  | keep |
| `singleness` | Singleness: A Bible Study for the Unmarried |  | keep |
| `skeptic` | Questions Skeptics Ask: A Study for Doubters | Duplicate | merge into `believe` (both open with a session called "Is There Anyone There" and walk God, Jesus, the resurrection, faith). `/studyguides/skeptic` sends to `/studyguides/believe` |
| `spiritual-warfare` | Spiritual Warfare: A Bible Study on the Unseen Battle |  | keep |
| `suffering` | Suffering: A Bible Study for When Life Does Not Make Sense |  | keep |
| `the-beatitudes` | The Beatitudes: A Bible Study on the Kingdom of God |  | keep |
| `the-captive-church` | Faith and Politics: A Bible Study on the Church and Political Power | Duplicate; names an off-shelf book | merge into `christian-nationalism` (its sessions "The Flag and the Cross" and "Constantine in the Sky" repeat that guide and `church-and-empire`; built on a book off the shelf). `/studyguides/the-captive-church` sends to `/studyguides/christian-nationalism` |
| `the-church` | The Church: A Bible Study on Why We Still Need Each Other |  | keep |
| `the-creeds` | The Creeds: A Bible Study on What Christians Believe |  | keep |
| `the-image-of-god` | The Image of God: A Bible Study on Human Worth |  | keep |
| `the-lords-prayer` | The Lord's Prayer: A Bible Study Line by Line |  | keep |
| `the-parables` | The Parables: A Bible Study on the Stories of Jesus |  | keep |
| `the-psalms` | The Psalms: A Bible Study on Honest Prayer |  | keep |
| `the-story-of-the-bible` | The Story of the Bible: A Study of the Whole Canon |  | keep |
| `the-undivided-life` | Faith on Monday: A Bible Study on Living One Whole Life | Names off-shelf book *The Undivided Life* | rewrite the summary line "drawn from James Bell's book The Undivided Life" so the guide stands on its own; both PDFs rebuild from it |
| `waiting-for-the-light` | Advent: A Bible Study on Waiting for the Light |  | keep |
| `when-our-parents-grow-old` | When Our Parents Grow Old: A Bible Study for Caregivers |  | keep |
| `witness` | Evangelism: A Bible Study on Sharing Your Faith |  | keep |
| `womanhood` | Biblical Womanhood: A Bible Study on Women of Valor |  | keep |
| `work-and-vocation` | Work and Vocation: A Bible Study on Faith and Your Job |  | keep |
| `youth-who-am-i` | Who Am I, Really? A Bible Study for Teenagers |  | keep |

The four merges rest on session titles and summaries, not on a full read of all eight guides. Each needs a side-by-side read before it is done.

### 3.2 Context guides (41 guides, 41 PDFs)

**What it is:** the background a passage assumes, one printable per guide. **Found today:** Study menu, "Context guides", then the guide; or `/downloads`. **From its own page:** yes, one open link. **From a passage:** partly, by the same mixed list as the study guides, although every guide records the verses it explains.

| Guide (`/resources/context/<slug>`) | Title today | Group | Verdict |
|---|---|---|---|
| `wisdom-and-the-nations` | Did Proverbs Borrow From Egyptian Wisdom Writing? |  | keep |
| `torah-and-the-law-codes` | How Is the Law of Moses Different From Hammurabi? |  | keep |
| `genesis-one-in-its-world` | Was Genesis 1 Answering Babylon, Not Modern Science? |  | keep |
| `covenant-and-treaty` | What Is a Biblical Covenant? The Ancient Treaty Form |  | keep |
| `the-gods-of-the-nations` | Why Did Israel's Neighbors Worship Idols? |  | keep |
| `misreading-with-western-eyes` | How Does Being Western Change the Way We Read the Bible? |  | keep |
| `collectivist-world-individualist-readers` | Is 'You' in the New Testament Singular or Plural? |  | keep |
| `hospitality-and-the-stranger` | What Did Hospitality Mean in the Ancient World? |  | keep |
| `purity-and-contagion` | What Does Clean and Unclean Mean in Leviticus? |  | keep |
| `honor-shame-vs-guilt` | What Is Honor and Shame Culture in the Bible? |  | keep |
| `the-kingdom-is-not-a-platform` | Does the Kingdom of God Belong to a Political Party? |  | keep |
| `left-lens-right-lens` | Does Your Politics Decide How You Read the Bible? |  | keep |
| `the-bible-is-not-an-american-book` | Is the Bible an American Book? What Its History Shows |  | keep |
| `exile-not-empire` | What Does It Mean That Christians Are Exiles? |  | keep |
| `what-justice-meant` | What Does Justice Mean in the Bible? Mishpat and Tsedaqah |  | keep |
| `money-texts-we-explain-away` | What Does the Bible Say About Wealth and the Poor? |  | keep |
| `between-the-testaments` | What Happened Between the Old and New Testaments? |  | keep |
| `septuagint-and-scripture` | What Is the Septuagint, and Why Does It Matter? |  | keep |
| `messianic-expectation` | What Kind of Messiah Was Israel Waiting For? |  | keep |
| `temple-and-synagogue` | What Was the Difference Between Temple and Synagogue? |  | keep |
| `pharisees-sadducees-essenes` | Who Were the Pharisees, Sadducees and Essenes? |  | keep |
| `household-codes-in-context` | What Are the Household Codes in Ephesians and Colossians? |  | keep |
| `gospel-against-empire` | What Did Gospel and Lord Mean Under Caesar? |  | keep |
| `patronage-and-grace` | What Did Grace Mean in a World Built on Patronage? |  | keep |
| `the-cities-of-paul` | Which Cities Did Paul Write To? Corinth, Ephesus, Rome |  | keep |
| `honor-status-and-the-cross` | Why Was Crucifixion So Shameful in the Roman World? |  | keep |
| `did-the-gospels-get-jesus-right` | Did the Gospels Get Jesus Right? |  | keep |
| `women-in-the-ancient-world` | How Did the Bible Treat Women Compared to Its World? |  | keep |
| `miracles-and-the-ancient-mind` | Were Ancient People Gullible About Miracles? |  | keep |
| `the-slavery-texts` | What Does the Bible Actually Say About Slavery? |  | keep |
| `the-violence-of-the-old-testament` | Why Is the Old Testament So Violent? An Honest Look |  | keep |
| `matthew-7-1-in-context` | Does ‘Judge Not’ Mean Christians Can’t Say Anything Is Wrong? |  | keep |
| `psalm-91-in-context` | Does Psalm 91 Promise Protection From Harm? |  | keep |
| `romans-13-1-in-context` | Does Romans 13 Mean Christians Must Obey Every Government? |  | keep |
| `romans-8-28-in-context` | Does Romans 8:28 Mean Everything Happens for a Reason? |  | keep |
| `2-chronicles-7-14-in-context` | Is 2 Chronicles 7:14 a Promise to America? |  | keep |
| `proverbs-3-5-6-in-context` | What Does ‘He Will Make Your Paths Straight’ Mean? |  | keep |
| `matthew-18-20-in-context` | What Does ‘Where Two or Three Are Gathered’ Really Mean? |  | keep |
| `jeremiah-29-11-in-context` | What Does Jeremiah 29:11 Really Mean? |  | keep |
| `philippians-4-13-in-context` | What Does Philippians 4:13 Really Mean? |  | keep |
| `isaiah-41-10-in-context` | Who Was Isaiah 41:10 Written To? |  | keep |

### 3.3 Find Help kits (40 pages, 320 PDFs)

**What it is:** for each care page, four printables (a one-page guide, prayer cards, Scripture cards, a worksheet for the week), each in Letter and A4. **Found today:** Find Help, the care page, the section "Print it"; or `/downloads`. **From its own page:** yes, all eight files, no sign-up. No source names a membership, a gift, or the network. The builder adds the help lines from `client/src/data/crisis-resources.json`.

| Care page (`/help/<slug>`) | What the person says | Files | Verdict |
|---|---|---:|---|
| `addiction` | I can't stop drinking or using | 8 | keep |
| `anger` | I can't control my anger | 8 | keep |
| `anxiety` | I can't stop worrying | 8 | keep |
| `cant-forgive` | I can't forgive them | 8 | keep |
| `caregiving` | Caring for my parent is wearing me out | 8 | keep |
| `church-hurt` | The church hurt me | 8 | keep |
| `curious` | I don't believe, but I'm curious | 8 | keep |
| `dating` | Should we get married? | 8 | keep |
| `decisions` | How do I know what God wants me to do? | 8 | keep |
| `deconstructing` | I'm deconstructing my faith | 8 | keep |
| `diagnosis` | I've been given a hard diagnosis | 8 | keep |
| `divorce` | My marriage has ended | 8 | keep |
| `doubt` | I'm not sure I believe anymore | 8 | keep |
| `empty` | I feel empty, and I don't know why | 8 | keep |
| `family-devotions` | How do we do family devotions? | 8 | keep |
| `fasting` | How do I fast, and what is Lent for? | 8 | keep |
| `fatherless` | How do I be a dad when I never had one? | 8 | keep |
| `fear-of-the-future` | I'm scared about the future | 8 | keep |
| `grief` | Someone I love has died | 8 | keep |
| `healing` | I'm praying for healing | 8 | keep |
| `infertility` | We can't have children | 8 | keep |
| `is-it-a-sin` | Is it a sin to drink, get a tattoo, or gamble? | 8 | keep |
| `job-loss` | I lost my job | 8 | keep |
| `loneliness` | I feel so alone | 8 | keep |
| `marriage` | My marriage is falling apart | 8 | keep |
| `money` | Money is a weight on me | 8 | keep |
| `new-believer` | I'm a new Christian. What do I do now? | 8 | keep |
| `parenting` | Parenting is harder than anyone said | 8 | keep |
| `pastors` | I'm a pastor and I'm running on empty | 8 | keep |
| `pets-and-heaven` | Will I see my pet again? | 8 | keep |
| `politics` | Politics is tearing my family apart | 8 | keep |
| `pornography` | I can't stop looking at porn | 8 | keep |
| `prayer` | I don't know how to pray | 8 | keep |
| `purpose` | What's the point of my life? | 8 | keep |
| `reading-the-bible` | Where do I start reading the Bible? | 8 | keep |
| `refer-to-counselor` | When should I refer someone to a counselor? | 8 | keep |
| `suffering` | Why would God let this happen? | 8 | keep |
| `trust-the-bible` | Can I trust the Bible? | 8 | keep |
| `whole-life` | I just want to grow and follow Jesus well | 8 | keep |
| `work-burnout` | I'm burned out at work | 8 | keep |

### 3.4 Eight-week plan booklets (29 plans, 58 PDFs)

**What it is:** each plan as a booklet, one week to a page with room to write. **Found today:** Topics menu or Find Help, then `/plans`, then the plan; or `/downloads`. **From its own page:** yes, Letter and A4, no sign-up. Twenty-three titles already say the subject in plain words. Six still lead with a picture, and the title is what prints on the cover.

| Plan (`/plans/<slug>`) | Title today | Verdict |
|---|---|---|
| `addiction` | Eight Weeks Toward Recovery from Addiction | keep |
| `anger` | Eight Weeks Toward a Slower Temper | keep |
| `anxiety` | Eight Weeks Toward a Quieter Mind | keep |
| `caregiving` | Eight Weeks of Not Carrying It Alone | rename to "Eight Weeks for the Worn-Out Caregiver" |
| `church-hurt` | Eight Weeks After the Church Hurt You | keep |
| `decisions` | Eight Weeks Toward a Decision You Can Live With | keep |
| `deconstruction` | Eight Weeks of Taking Your Questions Seriously | rename to "Eight Weeks for When Your Faith Is Coming Apart" |
| `divorce` | Eight Weeks Toward a Life After Divorce | keep |
| `doubt` | Eight Weeks for When You're Not Sure Anymore | keep |
| `empty` | Eight Weeks for When You Feel Empty | keep |
| `fatherless` | Eight Weeks Toward Being the Dad You Never Had | keep |
| `fear-of-the-future` | Eight Weeks of Facing What Is Coming | rename to "Eight Weeks for When You Fear the Future" |
| `forgiveness` | Eight Weeks Toward Forgiving Someone | keep |
| `grief` | Eight Weeks of Walking With Loss | keep |
| `infertility` | Eight Weeks for a Couple Facing Infertility | keep |
| `job-loss` | Eight Weeks Out of Work | keep |
| `loneliness` | Eight Weeks Toward Being Known | rename to "Eight Weeks for When You Feel Alone" |
| `marriage` | Eight Weeks Toward a Stronger Marriage | keep |
| `money` | Eight Weeks Toward Peace About Money | keep |
| `new-believer` | Eight Weeks for a New Christian | keep |
| `parenting` | Eight Weeks for the Worn-Out Parent | keep |
| `pornography` | Eight Weeks Toward Freedom from Porn | keep |
| `prayer` | Eight Weeks of Learning to Pray | keep |
| `purpose` | Eight Weeks of Asking What Your Life Is For | keep |
| `reading-the-bible` | Eight Weeks With an Open Bible | rename to "Eight Weeks to Start Reading the Bible" |
| `skeptic` | Eight Weeks for the Curious Skeptic | keep |
| `suffering` | Eight Weeks of Asking God Why | keep |
| `whole-life` | Eight Weeks Toward One Undivided Life | rename to "Eight Weeks Toward Following Jesus in All of Life" |
| `work-burnout` | Eight Weeks for When Work Has Burned You Out | keep |

### 3.5 Bible reading plans (5 plans, 10 PDFs)

**What it is:** a day-by-day chart to keep in a Bible. **Found today:** only on `/plans`, below the care plans, and on `/downloads`. **Where a person would want it:** no. Nothing on the Study Bible front page, a book page, or the Family pages points to them, and a new Christian asking where to start is not sent to one.

| Plan (anchor on `/plans`) | Title | Days | Verdict |
|---|---|---:|---|
| `#psalms-in-30-days` | The Psalms in Thirty Days | 30 | keep |
| `#matthew-in-a-month` | A Gospel in a Month: Matthew | 28 | keep |
| `#lent-with-mark` | Forty Days With Mark: A Lent Reading Plan | 40 | keep |
| `#new-testament-in-90-days` | The New Testament in Ninety Days | 90 | keep |
| `#bible-in-a-year` | The Bible in a Year | 365 | keep |

### 3.6 Worksheets (10 sheets, 20 PDFs)

**What it is:** blank pages for work done on paper. **Who it is for:** the person using the matching tool or care page; two are for church leaders. None names a membership, a gift, or the network.

| File (`/downloads/tools/<id>-letter.pdf` and `-a4.pdf`) | Title | Found from its own page | Verdict |
|---|---|---|---|
| `worry-log` | The Worry Journal, on paper | Yes: `/tools/worry-journal`, both sizes | keep |
| `prayer-list` | A weekly prayer list | Yes: `/tools/prayer-planner`, both sizes | keep |
| `prayer-journal` | A prayer journal: a month of mornings | On `/tools/prayer-planner`. Not on `/help/prayer`, the page `/downloads` says it goes with | keep |
| `rule-of-life` | A rule of life on one page | Yes: `/tools/rule-of-life`, both sizes | keep |
| `budget` | A monthly budget | In the text of `/help/money` and `/plans/job-loss`: Letter only | keep |
| `grief-journal` | A grief journal page | In the text of `/help/grief`, `/plans/grief`, `/plans/infertility`: Letter only | keep |
| `holidays-after-loss` | The first holidays without them | In the text of `/help/grief` and `/plans/grief`: Letter only | keep |
| `conflict-guide` | A conversation guide for couples | **Orphan.** Linked only from `/downloads`. `/help/marriage` and the tool `/tools/conflict-guide` link to each other and not to this file | keep |
| `referral-list` | A referral list for church leaders | In the text of `/help/refer-to-counselor`: Letter only | keep |
| `first-response` | When someone says they are not safe at home | In the text of `/help/refer-to-counselor` and `/help/pastors`: Letter only | keep |

### 3.7 Card sets, workbooks, and seasonal family booklets (7 items, 14 PDFs)

| Kind | File | Title today | Found from its own page | Verdict |
|---|---|---|---|---|
| Card set | `/downloads/tools/memory-cards-*` | Scripture to carry | Yes, on `/help`. Not from the Scripture Memory tool, which its file name suggests | rename to "Verse cards for hard days" (one verse for each Find Help page; it is not the forty memory verses) |
| Card set | `/downloads/tools/family-cards-*` | Family table cards | Yes, on `/family/devotions`; each card carries a code back to its devotion | keep |
| Workbook | `/downloads/workbooks/a-weekend-for-two-*` | A Weekend for Two: A Marriage Retreat | In the text of `/help/marriage` and `/plans/marriage`: Letter only | keep |
| Workbook | `/downloads/workbooks/before-you-marry-*` | Before You Marry | In the text of `/help/dating`: Letter only | rename to "Before You Marry: Eight Conversations for an Engaged Couple" |
| Seasonal booklet | `/downloads/seasonal/thanksgiving-family-*` | Thanksgiving week family booklet | Yes, on `/family/devotions` | keep |
| Seasonal booklet | `/downloads/seasonal/advent-family-*` | Advent family booklet | Yes, on `/family/devotions`; also the Advent line shown in season | keep |
| Seasonal booklet | `/downloads/seasonal/holy-week-family-*` | Holy Week family booklet | Yes, on `/family/devotions` | keep |

### 3.8 Reading lists (4 PDFs, built and not listed)

**What it is:** a short PDF that puts four existing study guides in an order, made as a sign-up gift. None is in the catalogue or on `/downloads`. Three belonged to pages that were folded on 2026-10-12 (`/doubt`, `/marriage`, `/parenting`), so nothing links to them.

| File (`/downloads/reading-paths/<slug>.pdf`) | Title inside | Linked from | Flag | Verdict |
|---|---|---|---|---|
| `skeptic` | The Skeptic's Reading Path | `/skeptic-track`, behind the sign-up form | Sign-up gate. Called "reading list" on the page and "reading path" in the file. The file says "I came to faith from atheism at twenty-four", a fact about James the site has not been cleared to state. Points to the guide `skeptic`, which section 3.1 folds into `believe` | rewrite: put the four steps on `/skeptic-track` itself as open links, keep one open PDF, and cut or confirm the age |
| `doubt` | When Faith Has Questions | Nothing | Orphan | retire; the address sends to `/answers` |
| `marriage` | The Marriage Reading Path | Nothing | Orphan | retire; the address sends to `/help/marriage` |
| `parenting` | The Parenting Reading Path | Nothing | Orphan | retire; the address sends to `/family` |

### 3.9 Booklets for church leaders (10 booklets, 20 files)

**What it is:** ten free booklets, 37 to 60 pages each, five on elders and five on governing a church, each as PDF and EPUB. **Found today:** Topics menu and footer ("Booklets for elders and church leaders"), `/resources`, `/downloads`, the study guides index. **Where a person would want it:** not from `/help/pastors`, and not from the leadership study guide `character-before-competence`. The page says "Nothing here asks you for an email address or a gift", and that is true. Each file says "Published by LiveWell by James Bell". These are ten titles by James that are not on the three-book shelf, on a site whose Books page says "Three books. Every word mine."

| Folder in `/ebook/` | Title | Pages | Names the network | Verdict |
|---|---|---:|---|---|
| `what-elders-are-for` | What Elders Are For | 60 | Imprint page: "Pastors Connection Network", its web address, and "Copyright © Pastors Connection Network"; named again on the last page | rewrite the PDF and the EPUB to take the network out (the copyright line needs James) |
| `qualified-elder` | Qualified: What the Bible Requires of an Elder | 44 | Imprint page names the network and its web address | rewrite the PDF and the EPUB to take the network out (the copyright line needs James) |
| `finding-installing-elders` | Finding and Installing Elders | 47 | Imprint page names the network and its web address | rewrite the PDF and the EPUB to take the network out (the copyright line needs James) |
| `when-elders-disagree` | When Elders Disagree | 46 | Imprint page names the network and its web address | rewrite the PDF and the EPUB to take the network out (the copyright line needs James) |
| `removing-an-elder` | Removing an Elder | 41 | Imprint page names the network and its web address; the text recommends "a PCN cohort partner" | rewrite the PDF and the EPUB to take the network out (the copyright line needs James) |
| `deacon-qualifications` | Deacon Qualifications and Selection | 41 | No | keep |
| `church-governance` | Church Governance That Works | 43 | No | keep |
| `the-patient-pastor` | The Patient Pastor | 40 | The text recommends "the PCN cohort" | rewrite the PDF and the EPUB to take the network out (the copyright line needs James) |
| `change-without-casualties` | Change Without Casualties | 37 | No | keep |
| `changing-the-unchangeable` | Changing the Unchangeable | 38 | The text recommends "a PCN cohort" | rewrite the PDF and the EPUB to take the network out (the copyright line needs James) |

### 3.10 Paid book files at open addresses (9 titles, 18 files)

**What it is:** the full EPUB and PDF of each book, at `/ebook/<slug>/…`. The thank-you page a buyer lands on after Stripe links straight to these addresses and tells the buyer to bookmark it. Anyone with the address has the book. No file names the network or a membership. *Believe* carries the dedication "For five sons".

| Folder in `/ebook/` | Title | PDF pages | Shelf | Verdict |
|---|---|---:|---|---|
| `when-god-bless-america` | When God Bless America Replaces Thy Kingdom Come | 495 | On the shelf | keep the book; move both files behind the paid download so the open address stops working |
| `the-monster-in-the-mirror` | The Monster in the Mirror | 274 | On the shelf | keep the book; move both files behind the paid download so the open address stops working |
| `believe` | Believe | 392 | On the shelf | keep the book; move both files behind the paid download so the open address stops working |
| `deconstruction-of-faith` | The Deconstruction of Faith | 391 | Off the shelf; sales page noindex, still sells | retire the open files; past buyers get theirs through the paid download; the open address sends to `/books` |
| `the-reliability-of-scripture` | The Reliability of Scripture | 261 | Off the shelf; sales page noindex, still sells | retire the open files; past buyers get theirs through the paid download; the open address sends to `/books` |
| `bible-and-homosexuality` | What Does the Bible Really Say About Homosexuality? | 189 | Off the shelf; sales page noindex, still sells | retire the open files; past buyers get theirs through the paid download; the open address sends to `/books` |
| `bible-and-transgender-identity` | What Does the Bible Say About Transgender Identity? | 201 | Off the shelf; sales page noindex, still sells | retire the open files; past buyers get theirs through the paid download; the open address sends to `/books` |
| `critical-race-theory-biblical` | Is Critical Race Theory Biblical? | 206 | Off the shelf; sales page noindex, still sells | retire the open files; past buyers get theirs through the paid download; the open address sends to `/books` |
| `raising-believers` | Raising Believers | 357 | Off the shelf; sales page already sends to `/books` | retire the open files; past buyers get theirs through the paid download; the open address sends to `/books` |

### 3.11 Paid PDFs held for past buyers (23 files in `api/_ebooks/`)

**What it is:** the older "LiveWell series" titles. Their sales pages already send to `/books`. The files are not public: `api/index.ts` hands one over only after it checks the Stripe purchase, through 23 thank-you addresses (`/<slug>/thank-you`). All 23 are books not on the three-book shelf. They cost nothing to keep, and a past buyer may come back for a copy.

| File | Verdict |
|---|---|
| `alone-in-a-crowded-church.pdf` | keep, for past buyers only, linked from nowhere |
| `babylon.pdf` | keep, for past buyers only, linked from nowhere |
| `be-true-to-yourself.pdf` | keep, for past buyers only, linked from nowhere |
| `born-again-from-atheism.pdf` | keep, for past buyers only, linked from nowhere |
| `consider-the-birds.pdf` | keep, for past buyers only, linked from nowhere |
| `covenant.pdf` | keep, for past buyers only, linked from nowhere |
| `faith-after-deconstruction.pdf` | keep, for past buyers only, linked from nowhere |
| `healwell.pdf` | keep, for past buyers only, linked from nowhere |
| `heaven-is-not-your-reward.pdf` | keep, for past buyers only, linked from nowhere |
| `how-to-read-the-bible.pdf` | keep, for past buyers only, linked from nowhere |
| `marriage-in-ministry.pdf` | keep, for past buyers only, linked from nowhere |
| `ordinary-holiness.pdf` | keep, for past buyers only, linked from nowhere |
| `prayer-in-the-dark.pdf` | keep, for past buyers only, linked from nowhere |
| `prophetic-justice-101.pdf` | keep, for past buyers only, linked from nowhere |
| `rule-of-life.pdf` | keep, for past buyers only, linked from nowhere |
| `sermon-on-the-mount-as-politics.pdf` | keep, for past buyers only, linked from nowhere |
| `the-body-you-left.pdf` | keep, for past buyers only, linked from nowhere |
| `the-god-who-is-not-nice.pdf` | keep, for past buyers only, linked from nowhere |
| `the-loneliness-of-the-pastor.pdf` | keep, for past buyers only, linked from nowhere |
| `the-scandal-of-the-cross.pdf` | keep, for past buyers only, linked from nowhere |
| `what-belongs-to-the-poor.pdf` | keep, for past buyers only, linked from nowhere |
| `where-your-treasure-is.pdf` | keep, for past buyers only, linked from nowhere |
| `why-not-what.pdf` | keep, for past buyers only, linked from nowhere |

### 3.12 Book opening samples (20 Markdown files in `client/public/books/`)

**What it is:** the first pages of 20 retired titles, read only by sales pages that are no longer routed. They are still served to anyone who types the address, and each is the opening of a book that is off the shelf.

| File | Verdict |
|---|---|
| `alone-in-a-crowded-church-sample.md` | retire; the address sends to `/books` |
| `babylon-sample.md` | retire; the address sends to `/books` |
| `be-true-to-yourself-sample.md` | retire; the address sends to `/books` |
| `born-again-from-atheism-sample.md` | retire; the address sends to `/books` |
| `covenant-sample.md` | retire; the address sends to `/books` |
| `faith-after-deconstruction-sample.md` | retire; the address sends to `/books` |
| `healwell-sample.md` | retire; the address sends to `/books` |
| `heaven-is-not-your-reward-sample.md` | retire; the address sends to `/books` |
| `how-to-read-the-bible-sample.md` | retire; the address sends to `/books` |
| `marriage-in-ministry-sample.md` | retire; the address sends to `/books` |
| `ordinary-holiness-sample.md` | retire; the address sends to `/books` |
| `prayer-in-the-dark-sample.md` | retire; the address sends to `/books` |
| `prophetic-justice-101-sample.md` | retire; the address sends to `/books` |
| `rule-of-life-sample.md` | retire; the address sends to `/books` |
| `sermon-on-the-mount-as-politics-sample.md` | retire; the address sends to `/books` |
| `the-body-you-left-sample.md` | retire; the address sends to `/books` |
| `the-god-who-is-not-nice-sample.md` | retire; the address sends to `/books` |
| `the-scandal-of-the-cross-sample.md` | retire; the address sends to `/books` |
| `what-belongs-to-the-poor-sample.md` | retire; the address sends to `/books` |
| `why-not-what-sample.md` | retire; the address sends to `/books` |

### 3.13 The pages and the machinery (15 items)

| Item | What it is today | Flag | Verdict |
|---|---|---|---|
| `/downloads` | Every file on one page, read from the catalogue, with a search field, a jump row and file sizes. The shelves run: church-leader booklets first, then study guides, Find Help, plans, worksheets, workbooks, cards, reading plans, families, context guides, then the three books as links | The first thing a parent meets is ten booklets for elders. The shelf heading still says "The Hard Issues booklets" | keep |
| `/resources` | Four short groups: downloads, tools, help in a hard season, families. Also shows any file James uploads through the admin | Its job overlaps `/tools`, `/help`, `/family` and `/downloads`. James chose on 2026-10-26 to keep it as the one page of everything to use | keep |
| `/resources/hard-issues-series` | The page for the ten booklets | Its name, its standfirst and the `/resources` link still say "The Hard Issues"; the menus already say "Booklets for elders and church leaders" | rename to "Booklets for elders and church leaders" everywhere; the address can stay |
| `/my-library` | What this reader saved and started, kept on the device | Not a download shelf; listed because `/resources` leads with it | keep |
| Sign-up form on downloads (`components/GatedDownload.tsx`, `components/PillarLeadMagnet.tsx`) | Asks for an address and joins the person to the essay list before a study guide PDF or the skeptic reading list opens | Breaks "nothing hides behind a sign-up". The same files are open on `/downloads` | retire; plain open links in its place |
| Nine book thank-you pages (`/books/<slug>/thank-you`) | Link straight to the open files in `/ebook/` | This is why the files are open | rewrite to hand over the files through the paid download |
| Twenty-three series thank-you pages (`/<slug>/thank-you`) | Hand over the held-back PDFs after a Stripe check | Books off the shelf; needed while past buyers are served | keep |
| Free-book PDF branch in `build-pdfs.mjs` (`/downloads/books/`) | Writes nothing; its source is gone | Dead | retire |
| Sermon-series PDF branch in `build-pdfs.mjs` (`/downloads/sermon-series/`) | Writes nothing; the series moved to the network | Dead. The only place the builder names the Pastors Connection Network, in a code comment | retire |
| Twenty-one `scripts/build-<book>-pdf.mjs` and `scripts/book-pipeline/` | Rebuild the held-back PDFs | Tooling for books off the shelf | retire to the archive beside the manuscripts |
| `pages/books/BookReader.tsx`, `BookLibrary.tsx` | The closed free book reader; links to `/downloads/books/<slug>.pdf`, which does not exist | Not routed | retire |
| Twenty-one series sales pages in `pages/books/` | Sales pages for the retired series; the only readers of the 20 samples | Not routed (only their thank-you pages are) | retire |
| `pages/leadership/SermonSeries.tsx`, `LeadershipHub.tsx`, `pages/PastorsResourceWall.tsx` | Pastors' pages that link to sermon-series PDFs and the booklets | Not routed; the network stays outside the site | retire |
| `pages/Library.tsx`, `pages/Explore.tsx` | Older "everything" pages; `/library` sends to `/writing` | Not routed | retire |
| Files James uploads at `/admin/resources` | Rows in the `resources` table, shown under Downloads on `/resources` | Count unknown: there is no database in this checkout | keep |

The Decision Log says the page files of folded hubs stay in the repository. The "retire" rows for unrouted pages are about pages whose product is gone (the free reader, the retired series, the pastors' wall), not folded hubs. Deleting them still wants a yes from whoever keeps the code.

## 4. What is hard to find from the page where a person wants it

| A person is on | and wants | Today |
|---|---|---|
| A study guide | the handout for Sunday | A sign-up form first. The open file is three taps away on `/downloads` |
| A Bible chapter | a study guide or context guide on that passage | A mixed list of up to six related items; the guide may not be among them, and the link never goes to the paper |
| The Study Bible front page, or `/family` | a reading plan to print | Nothing. The five charts are only on `/plans` and `/downloads` |
| `/help/marriage`, or the Conversation Guide tool | the couples' conversation sheet | Nothing. The file is linked only from `/downloads` |
| `/help/prayer` | the month-of-mornings prayer journal | Nothing. It is on the Prayer Planner tool |
| `/help/grief`, `/help/money`, `/help/dating`, `/help/marriage`, `/help/refer-to-counselor`, `/help/pastors` | the worksheet or workbook named in the text | A Letter link only; a reader outside the US has to go to `/downloads` for A4 |
| `/help/pastors`, or the leadership study guide | the booklets for elders | Nothing |
| The family catechism, or a family reading plan | something for the refrigerator | No printable exists |
| A church history lesson, a creed, an Honest Answer | a handout | No printable exists |
| The Scripture Memory tool | cards for the forty verses | No printable exists; the "Scripture to carry" cards are a different set |

## 5. Flags, gathered

**Duplicates.** Four study guide pairs (section 3.1). The reading lists repeat what the study guides index already does. `/resources` and `/downloads` both list the booklets.

**Orphans nothing links to.** Three reading-list PDFs (`doubt`, `marriage`, `parenting`). The couples' conversation sheet, outside `/downloads`. Twenty book samples. Six off-shelf book file pairs whose pages are unlinked.

**Names a membership.** None. The membership page is down and no printable source mentions one.

**Names a gift.** None since 2026-11-17.

**Names the Pastors Connection Network.** Seven booklets, in both the PDF and the EPUB: `what-elders-are-for`, `qualified-elder`, `finding-installing-elders`, `when-elders-disagree`, `removing-an-elder`, `the-patient-pastor`, `changing-the-unchangeable`. One carries the network's copyright line. No built printable source names it.

**Names a book not on the three-book shelf.** Ten study guides (twenty PDFs): `after-christendom`, `alone-in-a-crowded-church`, `anxiety` (Consider the Birds), `character-before-competence`, `deep-roots`, `mishpat`, `money` (Where Your Treasure Is), `raising-believers`, `the-captive-church`, `the-undivided-life`. Six open book file pairs, 23 held-back PDFs, 20 samples. The ten booklets are themselves titles off the shelf.

**States a fact about James that is not cleared.** The skeptic reading list: "I came to faith from atheism at twenty-four."

**Asks for a sign-up.** Every study guide page (136 files) and `/skeptic-track` (1 file).

## 6. Verdicts, counted

| Kind | Items | Keep | Merge | Rename | Rewrite | Retire |
|---|---:|---:|---:|---:|---:|---:|
| Study guide | 68 | 55 | 4 | 1 | 8 | 0 |
| Context guide | 41 | 41 | 0 | 0 | 0 | 0 |
| Find Help kit | 40 | 40 | 0 | 0 | 0 | 0 |
| Plan booklet | 29 | 23 | 0 | 6 | 0 | 0 |
| Reading plan | 5 | 5 | 0 | 0 | 0 | 0 |
| Worksheet | 10 | 10 | 0 | 0 | 0 | 0 |
| Card set | 2 | 1 | 0 | 1 | 0 | 0 |
| Workbook | 2 | 1 | 0 | 1 | 0 | 0 |
| Seasonal booklet | 3 | 3 | 0 | 0 | 0 | 0 |
| Reading list | 4 | 0 | 0 | 0 | 1 | 3 |
| Booklet | 10 | 3 | 0 | 0 | 7 | 0 |
| Paid book file | 9 | 3 | 0 | 0 | 0 | 6 |
| Buyer-only PDF | 23 | 23 | 0 | 0 | 0 | 0 |
| Sample | 20 | 0 | 0 | 0 | 0 | 20 |
| Pages and machinery | 15 | 5 | 0 | 1 | 1 | 8 |
| **All** | **281** | **213** | **4** | **10** | **17** | **37** |

One row is one item (a guide, a kit, a booklet, a page), not one file.

## 7. Proposals

1. **Open every free file with one tap.** Take the sign-up form off the study guide page and the skeptic page. Put two plain buttons in its place, "Leader's guide (PDF)" and "Handout (PDF)". A line under them can invite the reader to the newsletter; it cannot stand in the way.
2. **Put the paper where the person is.** One shared "Print this" block, read from the catalogue, on every page that has files: both paper sizes, the file size, no sign-up. Use it to close each gap in section 4: the conversation sheet on `/help/marriage` and its tool, the prayer journal on `/help/prayer`, A4 beside every Letter link in care pages and plans, the booklets on `/help/pastors`.
3. **From a passage to its handout.** On a Study Bible chapter, give the study guides and context guides that cite that chapter their own short rows, "Study this passage with a group" and "The background to this passage", each with its print link. The verse lists are already in the catalogue.
4. **Sort `/downloads` by who is asking, not by file type.** Four doors at the top: "For my family", "For my group", "For a hard season", "For studying the Bible", with "For church leaders" last. Keep the search field, the file sizes and every address. A parent should meet the family booklets and devotion cards first.
5. **One name for one thing.** "Booklets for elders and church leaders" on the page, on `/resources` and on the `/downloads` shelf, as the menus already say. "Reading plan" means a Bible reading chart; "eight-week plan" means a care plan; the words "reading path" go away with the three orphan PDFs.
6. **One kit file per care page.** Add a single "Print the whole kit" PDF per paper size beside the four separate ones. The 320 addresses stay; a person in a hard week taps once instead of four times.
7. **Fill the family and study gaps.** In the order a family would feel them: the catechism as a booklet and as cards; each family reading plan as a chart; the 2027 story plan as a chart; verse cards for the forty memory verses; a one-page handout for each church history lesson, with its sources and questions; each creed as a printable; the 35 Honest Answers as one-page sheets a pastor can hand out.
8. **Close the open book files.** Hand over the three shelf books through the paid download the site already has for the older series, so a bought book opens only for its buyer. Then remove the open copies of all nine titles.
9. **Make the study guides stand on their own.** Rewrite the eight summary lines that lean on a book a reader cannot get, and settle the four merges after a side-by-side read. Old addresses send to the guide that remains.
10. **Clear out what builds nothing.** The two dead branches in the PDF builder, the 21 per-book scripts, the unrouted reader and sales pages, and the 20 samples, once James has answered the buyer question below.
11. **Keep the count honest.** Print the number on `/downloads` from the catalogue, as now, and add a check that fails the build when a file is built and not listed, or is listed and linked from no page but `/downloads`.

## 8. What only James can decide

1. The seven booklets that name the Pastors Connection Network: take the network out of the files, or leave them as printed? One carries the line "Copyright © Pastors Connection Network". Who holds that copyright, and may the line change?
2. The ten booklets are his titles and are not among the "three books, every word mine." Do they stay as they are, come down until he has rewritten them, or get a line saying what they are?
3. People who bought one of the six off-shelf books, or one of the 23 older titles, were told to bookmark their download page. May the open files come down if those buyers can still get a copy through the paid download? Should the five unlinked sales pages stop selling, and will he switch off their Stripe payment links?
4. The eight study guides that say "drawn from James Bell's book …" for a book off the shelf: drop the line, or keep it because the book is coming back?
5. The four study guide merges (suffering, parenting, church and politics, skeptics): yes or no on each, after he has seen the pairs side by side.
6. The nine renames in section 3 (six plan titles, one study guide, one card set, one workbook): his wording or ours? The title prints on the cover.
7. The skeptic reading list says he came to faith from atheism at twenty-four. May the site state that?
8. May the sign-up form come off the study guides, knowing it is one of the ways people join the newsletter list today?
9. Has he uploaded any files through the admin that belong in this inventory? The database could not be read here.
10. New printables that carry doctrine wording (the catechism booklet and cards, the creeds) print the text exactly as it stands on the site. He should see one sample of each before it ships.

## 9. What was not checked

- No PDF made by `pnpm pdfs` was opened; their content is inferred from the builders and the source files.
- The four study guide merges rest on titles, summaries and session lists.
- Files uploaded through the admin, and anything else in the database, could not be seen.
- Whether the Stripe payment links for the off-shelf books are still live could not be tested.
- The live site was not opened; routes and redirects are read from `client/src/App.tsx` and `vercel.json`.
