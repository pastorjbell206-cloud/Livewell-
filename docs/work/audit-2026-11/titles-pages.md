# Titles and labels audit: does every door say what is behind it?

Audit date: 2026-11-17. Lens: `titles-pages`. Auditor: one of several in the November 2026 full audit.

James, this report reads every label a visitor sees before choosing where to go: the menu, the footer, each page's headline, the title Google shows, the sentence under it, and the buttons. The test for each one is simple. Would a churchgoer, a parent, or a skeptic type these words into Google, and would they know what they get when they click?

## How this was done

- **Live site** means the code of `origin/main` (commit `fea345a4`), built and served at `http://localhost:4311`. **Pending** means PR #540 (branch `claude/todo-implementation-hhp4bm`, served at `http://localhost:4312`), PR #541 (ten Doubt essays), and the local branch `land-next` (ten more essays).
- A script opened all 244 public addresses in the route table (`client/src/App.tsx`, 264 fixed addresses minus 20 admin pages) in a real browser, on both builds, and recorded the browser title, the headline (H1), and the section headings. 86 of those addresses are redirects; 158 are real pages; 124 of them are pages a visitor can land on from search (the rest are thank-you and error pages).
- A second script read the title and description that search engines and Facebook receive for every one of the 2,948 prerendered pages (`dist/public/**/index.html`), which is what `scripts/prerender-heads.mjs` writes. 2,274 of those are open to search engines; 674 are retired essays marked noindex.
- The local build has no database. Three things depend on it and showed an error state here: essay pages (`/writing/<slug>` showed "This essay didn't load"), `/quiz`, and `/tools/theology-quiz`. For those I read the prerendered head and the code instead. Every other finding was seen in the browser.
- Screenshots are in `docs/work/audit-2026-11/shots/titles-pages/` (61 files, at 1440x900 and 390x844).
- Length limits used: 60 characters for a title, 160 for a description. Those are the usual points where Google cuts a result off. This is my own working knowledge, not a measurement made here.
- I did not compare with outside sites in this lens. Nothing here depends on a claim about another site.

## The short version

**Score today: 6 out of 10. After the pending work lands: 7 out of 10.**

The best labels on this site are as good as any I know: the Find Help pages are named in the words people say out loud ("I can't stop worrying", "My marriage is falling apart"), the Honest Answers are real questions, and the twenty pending essays are almost all titled as the question a person types ("Why Does God Allow Suffering?", "Who Decided What Books Are in the Bible?"). PR #540 puts Family and Topics in the menu, which is what your goals ask for.

What holds the score down is everything around those. The home page's title names none of what the site offers. Nearly nine in ten indexed pages have a title too long to show in full, mostly because 25 characters of every title are spent on "| LiveWell by James Bell". About thirty hub and tool pages carry a slogan where a name should be ("An honest measure, before anything else", "A church without memory repeats old errors", "The deeper room"). The same thing goes by three or four names depending on which page you are on. And several descriptions still state your title, your years and a book count, which you asked the site never to do.

Almost none of this is fixed by the pending PRs. PR #540 changes the menu and adds two pages; it changes the title or headline of no existing page.

## What is already strong

1. **Find Help speaks the reader's words.** `/help` headline: "What are you facing?" Cards: "I can't stop worrying", "Someone I love has died", "I can't stop looking at porn", "The church hurt me". All 40 care pages have search titles built the right way, the plain phrase first: "Can't Stop Worrying? Anxiety, the Bible, and What Helps", "Do Pets Go to Heaven? Pet Loss, Grief, and the Bible". All 40 descriptions are under 160 characters.
2. **Honest Answers are real questions.** `/answers`: "Did the resurrection actually happen?", "Is it okay to be angry at God?", "What do I do when my teenager says they don't believe?"
3. **The pending essays are titled the way people search.** PR #541 and `land-next`: "Can You Trust the Bible?", "Was Jesus Real? What Historians Actually Know", "Why Are People Leaving the Church?", "What Does Romans 13 Say About Obeying the Government?", "Is the American Church Really Being Persecuted?". One essay kept the insider word only in its address (`/writing/excavation-not-demolition`) and got a plain title: "Deconstructing Your Faith: What to Tear Down and What to Keep". That is the model for the rest of the site.
4. **The Study Bible chapter pages lead with what people type.** "John 3 Study Notes – Nicodemus, New Birth, and God's Love for the World". The reference comes first, so even when the title is cut short the useful part survives. All 1,189 chapter descriptions are under 160 characters.
5. **The comparison and FAQ pages** are named as searches: "Catholic vs. Protestant: What's the Difference?", "What Denomination Should I Join?", "Why are there so many churches?"
6. **The context guides** are questions: "Is 2 Chronicles 7:14 a Promise to America?", "What Happened Between the Old and New Testaments?"
7. **The home headline is plain and is yours:** "Learning to follow Jesus — and live well — in post‑Christian America."
8. **The menu already uses several plain labels:** "Church history", "Creeds and confessions", "Find Help", "Self-checks", "Downloads and PDFs", "Contact", "Speaking".
9. **Duplicates are rare.** Across 2,274 indexed pages only 7 titles and 2 descriptions repeat.
10. **PR #540's new pages are named well.** `/topics` lists questions as headings ("How do we hand the faith to our kids in a secular age?", "I feel alone, even at church"). The Home field's hint reads "John 3:16, or your question".

## Findings, in order of how much they matter to a visitor

Status key: **LIVE-PROBLEM** (on the site today), **FIXED-IN-PENDING** (a named pending PR fixes it), **STILL-OPEN-AFTER-PENDING** (on the site today and still there after every pending PR lands). Size: S under an hour, M under a day, L more.

### 1. The home page title says nothing a person would search for

- **Where:** `/` (`client/src/pages/Home.tsx` line 90; `scripts/prerender-heads.mjs` `STATIC_PAGES`; `client/index.html` line 7).
- **What a visitor sees:** In Google and when the link is shared on Facebook: "LiveWell by James Bell — Theology That Carries the Weight of Everyday Life" (74 characters, cut off). In the browser tab: "LiveWell by James Bell". The description under it is 168 characters and loses its last words, which are "and books by James Bell".
- **Why it fails:** You named six things the site is for: studying the Bible, church history, hard questions, family devotions, books, discipleship. None of those words is in the title. A parent searching "family devotions" or a reader searching "online study Bible" has no reason to pick this result. The site also has two different titles for its own front page.
- **Fix:** One title everywhere: **"Study the Bible, Church History, Family Devotions | LiveWell"** (60 characters). Description: **"Learn to follow Jesus in post-Christian America: a free Study Bible with notes on every chapter, church history, family devotions, and honest answers."** (151).
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING (PR #540 does not change it).

### 2. Most titles are too long, and the reason is the 25-character name at the end

- **Where:** Site-wide (`client/src/components/SEOMeta.tsx`; `buildHead` in `scripts/prerender-heads.mjs`).
- **What a visitor sees:** Every title ends "| LiveWell by James Bell". Of 2,274 indexed pages, **1,984 (87%) run past 60 characters**. Of the 124 hub and tool pages, 84 do. Examples: "Study Guides — Free Leader's Toolkits for Small Groups and Sunday School | LiveWell by James Bell" (97); "Conflict Resolution Guide -- A Five-Step Process for Couples and Families | LiveWell by James Bell" (98).
- **Why it fails:** Google shows roughly the first 60 characters. On a long title the part that gets cut is fine, but on many of these the plain phrase sits in the second half and is lost.
- **Fix:** Shorten the ending to "| LiveWell" (the six `/compare/*` pages already do this). That alone brings 639 pages under the limit. Then put the plain phrase first on the rest; exact replacements are in the inventory table below. For Study Bible chapters, drop the ending altogether so the chapter's own subject shows.
- **Size:** S for the suffix (two files), M for the 60 hand-written titles. **Status:** STILL-OPEN-AFTER-PENDING.

### 3. Descriptions and one title still state your title, years and a book count

You asked that the site never state your title, your years in ministry, or a book count (`docs/work/NOTES.md` lines 34 to 36, because 12 or 15 years and 21 or 25 books are unresolved). These are the labels a stranger reads first, in Google and on Facebook:

- `/about` in search results (`scripts/prerender-heads.mjs` line 61): "James Bell has pastored First Baptist Church of Fenton, Michigan for twelve years. He founded the Pastors Connection Network and ENDS, hosts the Following the Way podcast, and has written twenty-one books." (205 characters, also cut off.)
- `/about` in the browser (`client/src/pages/About.tsx` line 91): "Pastor, author, and founder. Twelve years at First Baptist Church of Fenton ... books on theology, church history, justice, and ordinary life." with a book count filled in from `SITE_STATS.bookCount`.
- The fallback description on any page that has none (`client/index.html` line 8): "By James Bell, Lead Pastor and founder of the Pastors Connection Network."
- `/roadmap` title: "The Roadmap — 48 books". The page opens: "Forty-eight books is the plan. Twenty-one are already in print." It is in the sitemap.
- `/membership` (in the sitemap): "Curated reading guides for the 21 books".
- `/books` says "Three books. Every word mine." A visitor who reads both sees 3, 21 and 48.
- `client/public/llms.txt` line 9, read by AI answer engines: "James Bell: Lead Pastor of First Baptist Church of".

**Fix:** `/about` description: **"Who James Bell is and why he writes: his story in his own words, the church he pastors, the Pastors Connection Network, and how to reach him."** (143). Fallback: **"Study the Bible, church history, family devotions, and honest answers to hard questions, by James Bell."** Retitle `/roadmap` "Books in Progress" and take it and `/membership` out of the sitemap until you decide what they say. The About page body itself ("I have pastored ... for twelve years") is your own sentence and I have left it for you to rule on.

- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING. **Needs James.**

### 4. About thirty pages have a slogan where the name should be

A headline is the first thing a visitor reads to check "am I in the right place?" On these pages it does not say. Each line gives the page, the headline today, and the replacement. The clever line can stay as the sentence under the headline; it should not be the headline.

| Page | Headline today | Replace with |
|---|---|---|
| `/assessments` | "An honest measure, before anything else." | "Self-checks for your faith, your marriage, and your life" |
| `/resources/creeds` | "A church without memory repeats old errors" | "The creeds and confessions of the church" |
| `/studyguides` | "Teach the hard things well" | "Free Bible study guides for small groups" |
| `/theology/history` | "The story you were born into." | "Church history, from the apostles to today" |
| `/membership` | "The deeper room" | "LiveWell membership" |
| `/life` | "One life, offered whole" (label above it: "INTEGRATED LIFE · THE CAPSTONE") | "Following Jesus in every part of life" |
| `/justice/timeline` | "No one's hands are clean." | "A timeline of injustice, in the church and outside it" |
| `/justice/witnesses` and `/disruption/witnesses` | both "It has been done before." | "Christians who fought injustice, and what it cost them" / "Christians who told the church the truth" |
| `/disruption/consistency` | "One standard, or two?" | "Do you hold your own side to the same standard?" |
| `/theology/passage` | "Never read a verse alone again." | "Read any Bible verse in context" |
| `/theology/questions` | "The questions you actually came with." | fold into `/answers` (finding 6) |
| `/answers` | "The questions people actually ask." | "Honest answers to hard questions about Christianity" |
| `/tools` | "Tools for the Life You Are Actually Living" | "Free tools for Bible study, prayer, and family life" |
| `/how-tos` | "Practical help for real life" | "How-to guides for everyday Christian life" |
| `/tools/which-lens` | "Which lens has you?" | "What shapes how you read the Bible?" |
| `/tools/wisdom-finder` | "What are you facing" (the same words as `/help`) | "What does the Bible say about what I am facing?" |
| `/nation` | "The Bible is not a party." | "The Bible and American politics" |
| `/books` | "Three books. Every word mine." | "Books by James Bell" |
| `/study/bible` | "Learn the whole Bible" (the parent page `/study` says "Learn the whole Bible, and the church that carried it") | "The Study Bible" |
| `/dashboard` | "Good evening" under "YOUR FORMATION" | "Your reading and progress" |
| `/roadmap` | "What's been written. What's coming." | "Books in progress" |

- **Why it fails:** These are the hub pages for exactly the things you listed: church history, creeds, study guides, tools. A visitor who lands on "A church without memory repeats old errors" from a search for "Nicene Creed text" has to read further to learn the creeds are here.
- **Size:** M (about twenty files, one line each, plus the route smoke tests that read headings). **Status:** STILL-OPEN-AFTER-PENDING.

### 5. Insider and seminary words in labels

Each of these is a word your congregation would not use at the door. Replacement given for each.

| Word or phrase | Where a visitor meets it | Plain replacement |
|---|---|---|
| "the table", "a Discipleship Table" | `/how-tos`: "How to Start a Discipleship Table This Week", "How to Multiply a Table by Sending People to Start Their Own", "Who to Invite to Your Table"; `/pathways/discipleship` "Making Disciples at the Table" | "a small discipleship group": "How to Start a Small Discipleship Group This Week", "How to Send People Out to Start Their Own Group", "Who to Invite to Your Group" |
| "Tonight at the table" | PR #540 Family menu, Home line, search shortcut | "Tonight's family devotion" |
| "Formation" | `/dashboard` title "Your Formation"; description "your theological formation" | "Your reading and progress" |
| "Integrated Life", "The Capstone" | `/life` title and label | "Christian living" |
| "Prophetic Disruption", "Prophetic Justice" | titles of `/disruption/consistency`, `/disruption/witnesses`, `/justice/witnesses` | drop; see table in finding 4 |
| "Theological Depth" | `/theology/search` "Search the Theological Depth Section"; `/theology/how-to-use` "How to Use This Section — Theological Depth" | "Search the doctrines, creeds, and glossary"; "How to use the doctrine studies" |
| "pathways", "Find Your Path", "reading paths" | `/start` title "Find Your Path"; 13 `/pathways/*` pages still indexed; `/subscribe` description "self-paced reading paths through the whole library"; `/membership` description "curated reading paths" | "Where to start on LiveWell"; remove the "reading paths" promise from descriptions, since the reading-path hubs now redirect |
| "The Mirror" | `/writing` section "The Mirror: How Sincere Believers Go Wrong" | Already glossed after the colon. Good pattern; keep. |
| "After Christendom" | `/writing` section name with no gloss; PR #540 topic "living after Christendom" | "After Christendom: Faith in Post-Christian America" |
| "catechism" | "The family catechism" (menu), `/family/catechism` | Keep the word, add its meaning once: "The family catechism: questions and answers for kids" |
| "apologetics" | `/family` title "Family Discipleship — Devotions, Apologetics, and Parenting" | "Family Devotions and Discipling Your Kids" |
| "rule of life" | `/tools/rule-of-life` "Rule of Life Builder" | "Build a Weekly Rhythm of Prayer and Rest (a Rule of Life)" |
| "Which lens has you?", "the flag, the cause, the highlighter, the rearview, the marketplace" | `/tools/which-lens` title and description | "What Shapes How You Read the Bible? A Self-Check" |
| "Second Temple Judaism", "Ancient Near East", "The Greco-Roman World", "The Signature Library" | `/resources/context` section names and label | Keep the scholar's term, lead with the plain one: "Jewish life in Jesus's day (Second Temple Judaism)", "The world of the Old Testament (Ancient Near East)", "The Roman world of the New Testament". Drop "The Signature Library". |
| "The Constantinian Turn", "The Long Middle", "The Attractional Era", "The Desert and the Rule", "The Fathers at Work" | `/theology/history` era titles, also the search titles of those pages | Lead with the plain name and keep yours after it: "When Rome Became Christian: The Constantinian Turn", "The Middle Ages: The Long Middle", "The First Monks: The Desert and the Rule", "The Church Fathers at Work". "The Attractional Era" needs your wording; I suggest "The Megachurch Years: The Attractional Era". |
| "ENDS" | footer, with no explanation | "ENDS (training pastors in remote regions)", the wording `/about` already uses |
| "The Hard Issues booklets" | menu and footer; the ten booklets are on eldership and governing the local church | "Booklets for elders and church leaders" |
| "Leader's Toolkits", "Start with an honest reading", "The church and the public square", "Work a study" | `/studyguides` label; `/tools` section names; `/family` and `/theology/history` shelf labels "READ 42 / WORK A STUDY 20" | "Study guides for groups"; "Self-checks"; "Faith and politics"; "Essays (42) / Study guides (20)" |
| "Words Worth Sharing" | `/tools/quotes` | "Quotes from the essays and books" |
| "Prayer Generator" | `/tools/prayer-generator` | "Prayers for when you have no words" (the card on `/tools` already says "Words for when you do not have your own") |

The 29 eight-week plan pages have the same trouble in their own titles. The hub lists them plainly ("I can't stop worrying"), but the page a search engine indexes is called "Eight Weeks of Small Mercies" (the plan for feeling empty), "Eight Weeks in the Waiting" (infertility), "Eight Weeks Out of Hiding" (pornography), "Eight Weeks Toward Enough" (money), "Eight Weeks of Reading Like an Adult" (the skeptic's plan), "Eight Weeks Toward Setting Down the Debt" (forgiveness), "Eight Weeks on the Long Road Back" (addiction). **Fix:** topic first, your line second: "Anxiety: An Eight-Week Plan Toward a Quieter Mind", "Infertility: Eight Weeks in the Waiting", "Pornography: An Eight-Week Plan Out of Hiding". All 29 plan descriptions are also over 160 characters (164 to 215).

- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING. "Tonight at the table" is introduced by PR #540.

### 6. The same thing goes by several names, and "hard questions" has four front doors

A visitor learns a site's words once and expects them to hold. The design critique of 2026-10-27 raised this; it is still true today and PR #540 adds one more.

- **Hard questions, four indexes live, five after #540:** `/answers` "The questions people actually ask."; `/theology/questions` "The questions you actually came with." (title: "Hard Questions — Honest Answers to What You Actually Ask"); `/help` "What are you facing?"; ten `/faq/*` pages; and in PR #540 `/topics` "Hard questions, and where to start". **Fix:** after #540, `/topics` is the one index; redirect `/theology/questions` to it; keep `/answers` and `/help` as the two shelves it points to.
- **Self-checks, five names:** "Self-checks" (menu), "Assessments" (page label and address), "Life Audit", "Financial Health Check", "A Theology Diagnostic", "Which Lens Has You? — A Diagnostic". **Fix:** "Self-check" everywhere a visitor reads it.
- **Eight-week plans, three names:** "Eight-week plans" (menu), "Care Plans: Eight Weeks, One Step at a Time" (title), "An Eight-Week Guided Plan" (plan pages). **Fix:** "Eight-week plans".
- **Bible background, four names:** "The Bible in its context" (menu), "Reading the Bible in its context" (`/study`), "Reading Scripture in Context" (page), "Biblical Background Guides" (title). **Fix:** "Bible background" in the menu and title; "The world the Bible was written in" as the headline.
- **"What the Bible says", three tools and 208 pages:** `/tools/bible-on` "What the Bible says about"; `/tools/bible-says` "What the Bible Actually Says About…"; the tools card "Misused Verses — What the Bible Actually Says"; and every `/wisdom/*` page ends "— What the Bible Says". **Fix:** one topical tool with that name; rename `/tools/bible-says` "Commonly Misread Bible Topics".
- **Two creeds pages and two glossaries:** `/resources/creeds` and `/theology/creeds`; `/theology/glossary` ("Every word, explained plainly.") and `/tools/glossary` ("Theological Vocabulary Glossary — 100 Essential Terms"). All four are in the sitemap. **Fix:** one of each, redirect the other.
- **The tools page, three names:** browser tab "Free Christian Tools for Families", search result "Tools for Pastors and Readers", headline "Tools for the Life You Are Actually Living". **Fix:** "Free Bible Study, Prayer, and Family Tools" in all three.
- **"Start here", seven uses:** three menu items in PR #540 ("Start here: study the Bible", "Start here: every topic", "Start here: for families"), `/start` ("Find Your Path"), `/skeptic-track` ("Start here if you're skeptical."), the Study Bible card "START HERE The Story of the Bible", and a card called "Start Here" on `/assessments`. **Fix:** in menus say what the page is ("Study overview", "All topics", "Family overview") and keep "Start here" for `/start` alone.
- **Newsletter, four names:** "Subscribe" (header), "Newsletter" (footer), "One serious essay a week" (footer form), "Substack →" (footer link). **Fix:** "Subscribe" for the action, "Read James on Substack" for the link.
- **Two essays one word apart:** "When Fear Becomes Theology" and "When Fear Rewrites Theology", both on `/writing` today. **Fix:** retitle one; your call which. Suggested: "When Fear Rewrites Theology" becomes "How Fear Led Christians to Defend the Indefensible" if that matches the essay (its line on the shelf reads "How sincere Christians justified what they...").
- **Exact duplicate titles (7):** "Was America Founded as a Christian Nation?" at `/nation/christian-nation` and `/writing/was-america-founded-as-a-christian-nation`; "Theological Position Quiz" at `/quiz` and `/tools/theology-quiz`; "How We Got the New Testament", "How We Got the Old Testament" and "Why Translations Differ" each at `/study/bible/guides/...` and `/theology/doctrine/...`; "When Faith Has Questions" at `/pathways/doubt-and-deconstruction` and `/studyguides/doubt`; "Caring for Aging Parents — What the Bible Says" at `/wisdom/caregiving` and `/wisdom/caring-for-aging-parents`. **Fix:** redirect the older of each pair.

- **Size:** M for the wording, L if the duplicate pages are merged. **Status:** STILL-OPEN-AFTER-PENDING. The `land-next` branch will add a second near-duplicate: its essay "What Did Jesus Mean by 'Render Unto Caesar'?" beside `/nation/render` "Render to Caesar".

### 7. Church history and the one-stop links are not named where people look first

- **Where:** `/` "Where to begin"; footer on every page (`client/src/components/Footer.tsx`).
- **What a visitor sees:** Home's doors today: "Study the Bible", "Read the essays", "The books". PR #540 adds "Hard questions" and "Family devotions". "Church history" is not a door on Home in either build; it is inside Study. In the footer the only outside link by name is "Substack →". The word "Facebook" appears on one page of the site, `/about`.
- **Why it fails:** You named church history twice in your request and asked that this be the one place for your Facebook and Substack. A visitor has to open a menu to find the first and visit About to find the second.
- **Fix:** Add a sixth door on Home, "Church history", with the line `/study` already uses ("The councils, the figures, the heresies..."). In the footer write "Read James on Substack" and add "Follow James on Facebook" beside it.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 8. Menu labels: what is live, what PR #540 changes, and what still needs a plainer word

Full inventory is in the tables below. Verdicts:

- **FIXED-IN-PENDING (PR #540):** Family has no door in the live header (it is the last line of the footer's Resources list, "For families"). PR #540 gives it a door with four items. The live "Resources" door, which does not say what is inside, becomes "Topics" and "Family".
- **"Topics" (PR #540).** The page it opens is headed "Hard questions, and where to start", and Home calls the same door "Hard questions". "Topics" alone does not tell a skeptic that his questions are in there. You chose this word on 2026-10-26, so this is yours to rule on: keep "Topics" and make the first menu item **"Hard questions, by topic"**, or rename the door "Questions".
- **"Honest answers"** (PR #540 shortened it from the live "Honest answers to hard questions"). Restore the longer label; the short one does not say answers to what.
- **"Eight-week plans"** does not say for what. **"Eight-week plans for hard seasons"**.
- **"The year of devotions"** reads as one item, not a library. **"All family devotions"**.
- **"Study with a group"** opens 68 study guides. **"Small group study guides"**.
- **"The Bible in its context"**. **"Bible background"**.
- **"Read the whole story in 2027"** is a plan through all 1,189 chapters in a year. People search "read the Bible in a year". **"Read the Bible in a year (2027)"**. Page title: "Read the Bible in a Year: The 2027 Plan | LiveWell".
- **"All resources, on one page"** and **"All tools"** are fine.
- **"About James", "Books", "Speaking", "Contact"** are right.

- **Size:** S (one file, `client/src/lib/siteNav.ts`, plus `site-structure.test.ts`). **Status:** mixed, as marked.

### 9. "Psalms 23" should be "Psalm 23"

- **Where:** all 150 Psalm chapter pages, for example `/study/bible/psalms/23` (`client/src/pages/StudyBible.tsx` line 508; `scripts/prerender-heads.mjs` line 800).
- **What a visitor sees:** headline "Psalms 23"; title "Psalms 23 Study Notes – The LORD Is My Shepherd".
- **Why it fails:** Nobody says or searches "Psalms 23". It is the best-known chapter in the Bible and the page that should be easiest to find.
- **Fix:** When the book is Psalms, print "Psalm" before a chapter number. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 10. 506 descriptions are too long, and a few are too short

- **Where and what:** every `/wisdom/*` page (208 of 208 over 160, up to 309 characters); every `/studyguides/*` page (68 of 68); 66 of 70 `/life/*` guides (up to 384); all 29 plans; 47 how-to guides; 24 context and creed pages; 18 of 22 church-history essays (up to 253); and on the hubs: `/study` (214), `/study/bible` (220), `/study/bible/doctrines` (224), `/answers` (204), `/tools/glossary` (212), `/tools/bible-says` (209). Six essay descriptions run the other way: "The Bible Assumes You Will Be Wrong" has 35 characters of description; four more have under 70.
- **Why it fails:** Google cuts the sentence mid-thought, and on these pages the cut usually removes what the reader gets. A 35-character description gives a skeptic nothing to decide on.
- **Fix:** For the libraries, have the index builders write a description field capped at 155 characters, ending on a whole sentence, and gate it in the matching validator. For the hubs, hand-written lines. Three of them:
  - `/study`: "Study the whole Bible with notes on every chapter, then the church's history, its creeds, and the world the Bible was written in. Free." (137)
  - `/study/bible`: "A free online Study Bible: the story in eleven parts, an introduction to every book, notes on all 1,189 chapters, and the Hebrew and Greek." (140)
  - `/answers`: "Did the resurrection happen? Can you trust the Bible? Why does God allow suffering? Straight answers from a pastor who was an atheist first." (140)
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 11. Pages that should not be in search results, or show nothing

- `/quiz` and `/tools/theology-quiz` are one tool at two addresses with one title. Locally both show "The quiz didn't load" with no headline, because they need the database; on the live site the API supplies the questions. Keep one address.
- `/dashboard` ("Your Formation", "0 ARTICLES READ ... 0 DAY STREAK") is an empty personal page with an indexable head. Mark it noindex and retitle it "Your Reading and Progress".
- `/membership` is in the sitemap and offers "Join the waitlist" for "The deeper room", with "Curated reading guides for the 21 books". If membership is not open, take it out of the sitemap.
- `/tools/connection-planner` has two H1 headlines ("The Connection Planner" twice).
- `/my-library` and `/404` have no prerendered head, so a shared link shows the home page's title.
- Five tool titles use a typed double hyphen: "Bible Study Guide -- Study Any Book with Theological Depth", "Conflict Resolution Guide -- ...", "Parenting Stage Guide -- ...", "Scripture Memory System -- ...", "What the Bible Actually Says About… -- Topical Scripture Reference". Use a colon.
- Three book pages name you twice: "What Does the Bible Really Say About Homosexuality? — by James C. Bell | LiveWell by James Bell" (95 characters). Drop "— by James C. Bell".

- **Size:** S each. **Status:** STILL-OPEN-AFTER-PENDING.

### 12. Family devotion titles: every word capitalized, and poetic

- **Where:** `/family/devotions`, `/family/tonight`, Home (PR #540 shows tonight's title on the front page).
- **What a visitor sees:** "Taking Care Of What Is Not Yours", "When The Lights Go Out", "The Weight You Put Down". The plain subject sits in a small label above ("FEAR AND ANXIETY", "FORGIVENESS"). The search title is "The Weight You Put Down: A Family Devotion".
- **Why it fails:** A parent looking for a devotion on forgiveness scans titles, not labels. The capital on "Of" and "Is" reads as a typo beside the rest of the site. The critique of 2026-10-27 flagged the capitals; they are unchanged, and PR #540 now puts one on the front page.
- **Fix:** Sentence-style capitals in the data file, and the subject in the search title: "Forgiveness: The Weight You Put Down (Family Devotion)".
- **Size:** S for capitals, M for titles. **Status:** STILL-OPEN-AFTER-PENDING.

### 13. Small button and label notes on the hub pages

- `/books`: buttons "Read the opening free →" (good), "What's being written" (opens the roadmap; see finding 3).
- `/subscribe`: the form's heading is "Subscribe — and tell us where you're standing". Plainer: "Subscribe".
- `/skeptic-track`: "Get the reading path (PDF)". Plainer: "Download the reading list (PDF)". Label "OR ARGUE INSTEAD OF READ" is clear and has character; keep.
- `/family`: section "The season" opens Thanksgiving and Advent devotions. Plainer: "This season: Thanksgiving and Advent". Label "THE OLDEST CLASSROOM" names nothing; drop it.
- `/family`: "Marriage health assessment ... A 15-question diagnostic" while the tool itself is called "Marriage Health Self-Check". Use the tool's name.
- `/about`: section "The church, the network, and the ends of the earth" is a play on ENDS that a newcomer cannot get. Plainer: "The church, the pastors' network, and ENDS". "Everywhere James is" is good and is the right home for the Facebook and Substack links; label the newsletter row "Substack (the newsletter)".
- `/resources`: all four section headings are plain ("Downloads and PDFs", "Tools", "Help in a hard season", "For families"). No change.
- `/study`: all four section headings are plain. Two rows are both called "The witnesses" ("The witnesses", "The witnesses who would not be captured"); rename as in finding 4.
- `/tools`: the search field hint "Try: prayer, worry, marriage" is good.
- `/downloads`: "Cards to cut and keep", "Worksheets to print" are good plain labels.

- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

## Inventory 1: header and footer labels

**Header, live (`origin/main`):** LiveWell BY JAMES BELL · Study (menu) · Essays · Books · Resources · About · Find Help · Search ("Search, or look up a passage") · Subscribe. Phone menu: Find Help · Study · Essays · Books · Resources · About · My Library · Subscribe.

**Header, PR #540:** LiveWell BY JAMES BELL · Study (menu) · Topics (menu) · Family (menu) · Essays · About (menu) · Find Help · Search · Subscribe. Phone menu: Find Help · Study · Topics · Family · Essays · About · My Library · Subscribe.

| Group | Label | Live | #540 | Opens | Verdict | Replacement |
|---|---|---|---|---|---|---|
| Study | Start here: study the Bible | header, footer | header, footer | /study | "Start here" overused | Study overview |
| Study | The Study Bible | yes | yes | /study/bible | Plain | |
| Study | Church history | yes | yes | /theology/history | Plain | |
| Study | Creeds and confessions | yes | yes | /resources/creeds | Plain | |
| Study | The Bible in its context | yes | yes | /resources/context | Abstract | Bible background |
| Study | Study with a group | yes | yes | /studyguides | Hides the guides | Small group study guides |
| Study | Read the whole story in 2027 | no | header, footer | /study/bible/guides/whole-story-2027 | Not the search phrase | Read the Bible in a year (2027) |
| Essays | Essays | header, footer | header, footer | /writing | Plain | |
| Essays | Honest answers to hard questions | footer | moved to Topics, shortened | /answers | Plain | keep the long form |
| Books | Books | header, footer | under About | /books | Plain | |
| Books | When God Bless America Replaces Thy Kingdom Come | footer | footer | book page | Title | |
| Books | The Monster in the Mirror | footer | footer | book page | Title | |
| Books | Believe | footer | footer | book page | Title | |
| Resources | Resources | header, footer | gone as a door | /resources | Vague | fixed in #540 |
| Resources | My Library | footer list | footer bar, phone menu | /my-library | Fine | |
| Resources / Topics | Downloads and PDFs | footer | footer | /downloads | Plain | |
| Resources / Topics | The Hard Issues booklets | footer | footer | /resources/hard-issues-series | Misleads | Booklets for elders and church leaders |
| Resources / Topics | All tools | footer | header, footer | /tools | Plain | |
| Resources / Topics | Self-checks | footer | header, footer | /assessments | Plain; page disagrees | rename the page, not the label |
| Resources / Topics | How-to guides | footer | footer | /how-tos | Plain | |
| Resources / Topics | Find help in a hard season | footer | footer | /help | Plain | |
| Resources / Topics | Eight-week plans | footer | header, footer | /plans | For what? | Eight-week plans for hard seasons |
| Resources | For families | footer | becomes the Family door | /family | Plain | fixed in #540 |
| Topics | Start here: every topic | no | header, footer | /topics | "Start here" overused; "topic" vague | Hard questions, by topic |
| Topics | Honest answers | no | header, footer | /answers | Answers to what? | Honest answers to hard questions |
| Topics | All resources, on one page | no | header, footer | /resources | Plain | |
| Family | Start here: for families | no | header, footer | /family | "Start here" overused | Family overview |
| Family | Tonight at the table | no | header, footer | /family/tonight | Clever | Tonight's family devotion |
| Family | The year of devotions | no | header, footer | /family/devotions | Unclear | All family devotions |
| Family | The family catechism | no | header, footer | /family/catechism | Church word | The family catechism: questions and answers for kids |
| Family | Family reading plans | no | header, footer | /family/reading-plans | Nearly plain | Family Bible reading plans |
| About | About / About James | header, footer | header, footer | /about | Plain | |
| About | Speaking | footer | header, footer | /speaking | Plain | |
| About | Contact | footer | header, footer | /contact | Plain | |
| About | Newsletter | footer | footer | /subscribe | Fourth name for one thing | Subscribe |
| About | Following the Way (podcast) | footer | footer | outside site | Plain | |
| About | Pastors Connection Network | footer | footer | outside site | Plain | |
| About | ENDS | footer | footer | outside site | Unexplained initials | ENDS (training pastors in remote regions) |
| Utility | Find Help | header, footer | header, footer | /help | Plain | |
| Utility | Subscribe | header, footer form | same | /subscribe | Plain | |
| Footer | "Theology that carries the weight of everyday life." | yes | yes | (tagline) | Differs from the Home headline | "Learning to follow Jesus in post-Christian America." |
| Footer | Substack → | yes | yes | substack.com/@jamesbell333289 | Does not say what | Read James on Substack |
| Footer | (no Facebook link) | missing | missing | | Missing | Follow James on Facebook |
| Footer | One serious essay a week | yes | yes | (form heading) | Fine | |
| Footer | Privacy Policy · Terms of Service · Accessibility | yes | yes | | Plain | |
| Search | Shortcuts: The Study Bible · Church history · Essays · Books · Find help · Tools | yes | adds Topics, "Tonight at the table"; drops Tools | | Plain but for one | Tonight's family devotion |

## Inventory 2: section headings and buttons on the seven main pages (live, with PR #540 differences)

**Home `/`.** Headline: "Learning to follow Jesus — and live well — in post‑Christian America." Sections: "Where to begin", "Start with these", "The books", "One serious essay a week". Doors and buttons: "About James", "Study the Bible", "Read the essays", "The books", "tools, eight-week plans, and printables", "All the essays", "Read the opening of each, free", "Subscribe", "Find help for what you are facing". PR #540 adds: a field "Look up a passage or ask a question" with the button "Find" and the hint "John 3:16, or your question"; the line "Tonight at the table: Taking Care Of What Is Not Yours."; doors "Hard questions" and "Family devotions". Verdict: plain throughout. Missing door: church history (finding 7).

**Study `/study`.** Headline: "Learn the whole Bible, and the church that carried it". Sections: "The Study Bible", "Church history", "Reading the Bible in its context", "Study with a group". Buttons and rows: "Open the Study Bible", "The story of the Bible, in eleven acts", "An introduction to every book", "Notes on all 1,189 chapters", "Verse-by-verse notes", "Sixty-two doctrine studies", "Twenty-four guides to reading the Bible", "The history of the church", "Creeds and confessions", "Why there are so many churches", "The injustice timeline", "The witnesses", "The witnesses who would not be captured", "Reading Scripture in context", "The Study Bible's reading guides", "A theology glossary", "Search the theology reference", "Study guides for groups". Verdict: the plainest hub on the site. Two rows called "The witnesses".

**Family `/family`.** Headline: "Disciple your whole family, in one place." Sections: (tonight's devotion title), "This week", "The season", "Family devotions", "Why we believe", "Parenting", "Marriage", "Tools", "Home and family life". PR #540 adds "If your table looks different" with "On your own", "Between two homes", "Beside a spouse who does not believe". Small labels: "TONIGHT AT THE TABLE", "THE CATECHISM", "LEARN THE FAITH TOGETHER", "DO THIS TOGETHER", "THE OLDEST CLASSROOM", "READ IT TOGETHER", "FOR TEENAGERS", "RAISING THEM IN THE FAITH", "THE CENTER OF THE HOME", "FOR THE HOME". Buttons: "Start", "Read it first", "Learn it together", "Thanksgiving week November 20 to 26", "Advent December 1 to 25", "search the whole site". Verdict: headings plain; ten small labels is too many voices; "The season", "THE OLDEST CLASSROOM", "READ 42 / WORK A STUDY 20" need plain words (finding 13). "If your table looks different" is a kind and clear heading.

**Essays `/writing`.** Headline: "Essays". Label: "START WITH THESE". Sections: "The Mirror: How Sincere Believers Go Wrong", "Faith and Power: Christian Nationalism and Politics", "After Christendom", "The Ancient Church", "Reading the Bible in Its World", "One essay a week, for the ones who finish." Field: "Search the essays". Button: "Subscribe". The pending branches add sections "The American Church: History and Reckoning", "Doubt and Hard Questions", "Marriage, Family and Ordinary Faithfulness". Verdict: section names follow a good pattern (your phrase, then the plain one); "After Christendom" lacks its plain half. Essay titles to look at: "Blind Spots" (two words, no subject), "The Monster Is Never the One in the Mirror", and the two "When Fear ..." titles (finding 6).

**About `/about`.** Headline: "James Bell". Sections: "My story in my own words", "The heart behind it", "The church, the network, and the ends of the earth", "How the writing works" ("It starts at the root", "The writer is inside it", "It ends on a verdict, not a recap"), "Reach James", "Everywhere James is". Buttons: "Invite James to speak", "Write to James", "Get the newsletter", "Following the Way", "The books are here", "Speaking", "Contact", "The newsletter", "Pastors Connection Network", "Facebook", "ENDS", "Read the essays". Verdict: buttons are plain and are the right ones. "Everywhere James is" is the one-stop list you asked for; the word Substack is not in it.

**Resources `/resources`.** Headline: "Resources". Sections: "Downloads and PDFs", "Tools", "Help in a hard season", "For families". Buttons: "My Library", "Search everything", "Every download, on one shelf", "The Hard Issues booklets", "Rule of Life Builder", "Scripture Memory", "Test the Case", "Which Lens Has You?", "The self-checks", "Every tool", "Anxiety", "Grief", "A marriage under strain", "Taking your questions seriously", "The curious skeptic", "The new believer", "One undivided life", "Find help for what you are facing", "Every eight-week plan", "The family room", "Family devotions", "A family catechism", "Family Devotion Builder". Verdict: plain. "The family room" is a fourth name for `/family`; use "For families".

**Tools `/tools`.** Headline: "Tools for the Life You Are Actually Living". Sections: "START WITH AN HONEST READING" (5), "SCRIPTURE AND THEOLOGY" (12), "WISDOM FOR A REAL SITUATION" (9), "FAMILY, MARRIAGE, AND THE HOUSEHOLD" (7), "THE CHURCH AND THE PUBLIC SQUARE" (3). Thirty-six tool names, all listed in the page inventory below. Field: "Try: prayer, worry, marriage". Verdict: three of five section names need plain words: "Self-checks", "Help for a decision or a hard day", "Faith and politics".

## Inventory 3: every page a visitor can land on (124 pages, live build)

Columns: the title as search engines receive it with its full length including "| LiveWell by James Bell"; the headline in the browser; the description length ("OVER" means past 160); my replacement title, to which "| LiveWell" is added (every one fits in 60 characters); a replacement headline where the current one is a slogan; and the reason. A blank replacement means the title is sound and only needs the shorter ending from finding 2. PR #540 changes none of these rows; it adds `/topics` ("Topics: The Hard Questions of Faith in Post-Christian America | LiveWell by James Bell", 84 characters; use "Hard Questions About Faith, by Topic | LiveWell") and `/study/bible/guides/whole-story-2027` ("Read the Whole Story of the Bible in 2027", description 227 characters; use "Read the Bible in a Year: The 2027 Plan | LiveWell").

| Page | Title today (characters) | Headline on the page (H1) | Description length | Replacement title (add " \| LiveWell") | Replacement headline | Why |
|---|---|---|---|---|---|---|
| / | Search engines: LiveWell by James Bell — Theology That Carries the Weight of Everyday Life (74). Browser tab: LiveWell by James Bell (22) | Learning to follow Jesus — and live well — in post‑Christian America. | 168 OVER | Study the Bible, Church History, Family Devotions |  | Browser tab says only the name; search result says a slogan. Neither names what is here. |
| /about | Search engines: About James Bell (16). Browser tab: About James Bell — Pastor, Author, Writer (41) | James Bell | 205 OVER | About James Bell |  | Description states years and a book count; see finding 3. |
| /accessibility | Accessibility Statement (48) | This site is meant for everyone | 142 |  |  |  |
| /answers | Honest Answers to Hard Questions About Christianity (76) | The questions people actually ask. | 204 OVER | Hard Questions About Christianity, Answered | Honest answers to hard questions about Christianity | H1 does not say "answers". |
| /assessments | Assessments — Where Are You, Actually? (63) | An honest measure, before anything else. | 147 | Self-Checks for Faith, Marriage, and Daily Life | Self-checks for your faith, your marriage, and your life | Menu says Self-checks, page says Assessments. |
| /books | Search engines: Books — by James Bell (21). Browser tab: Books by James Bell — Three Titles, Written by Hand (51) | Three books. Every word mine. | 156 | Books by James Bell | Books by James Bell | Keep "Every word mine." as the line under it. |
| /books/believe | Believe: The Rational Case for Christian Faith — by James Bell (62) | Believe | 154 | Believe: The Rational Case for Christian Faith |  |  |
| /books/bible-and-homosexuality | What Does the Bible Really Say About Homosexuality? — by James C. Bell (95) | What Does the Bible Really Say About Homosexuality? | 151 | What Does the Bible Say About Homosexuality? |  | Author named twice in the title (95 characters). |
| /books/bible-and-transgender-identity | What Does the Bible Say About Transgender Identity? — by James C. Bell (95) | What Does the Bible Say About Transgender Identity? | 131 | What the Bible Says About Transgender Identity |  | Author named twice (95 characters). |
| /books/critical-race-theory-biblical | Is Critical Race Theory Biblical? — by James C. Bell (77) | Is Critical Race Theory Biblical? | 150 | Is Critical Race Theory Biblical? |  | Author named twice (77 characters). |
| /books/deconstruction-of-faith | The Deconstruction of Faith — by James Bell (43) | The Deconstruction of Faith | 153 |  |  |  |
| /books/the-monster-in-the-mirror | The Monster in the Mirror — by James Bell (41) | The Monster in the Mirror | 141 |  |  |  |
| /books/the-reliability-of-scripture | The Reliability of Scripture — by James Bell (44) | The Reliability of Scripture | 159 |  |  |  |
| /books/when-god-bless-america | When God Bless America Replaces Thy Kingdom Come — by James Bell (64) | When God Bless America Replaces Thy Kingdom Come | 161 OVER | When God Bless America Replaces Thy Kingdom Come |  |  |
| /compare/baptist-vs-methodist | Baptist vs. Methodist: What's the Difference? (56) | Baptist vs. Methodist | 149 |  |  |  |
| /compare/calvinism-vs-arminianism | Calvinism vs. Arminianism: What's the Difference? (60) | Calvinism vs. Arminianism | 174 OVER |  |  |  |
| /compare/catholic-vs-protestant | Catholic vs. Protestant: What's the Difference? (58) | Catholic vs. Protestant | 142 |  |  |  |
| /compare/evangelical-vs-mainline | Evangelical vs. Mainline: What's the Difference? (59) | Evangelical vs. Mainline | 143 |  |  |  |
| /compare/liturgical-vs-contemporary | Liturgical vs. Contemporary Worship: What's the Difference? (70) | Liturgical vs. Contemporary Worship | 163 OVER |  |  |  |
| /compare/orthodox-vs-catholic | Orthodox vs. Catholic: What's the Difference? (56) | Orthodox vs. Catholic | 176 OVER |  |  |  |
| /contact | Contact James Bell (18) | Write to James | 111 |  |  |  |
| /dashboard | Your Formation (39) | Good evening | 107 | Your Reading and Progress |  | "Formation" is an insider word. Page should be noindex. |
| /diagnostic | Where Are You With God Right Now? An Honest Self-Check (79) | Where are you with God right now? | 153 | Where Are You With God? A Short Self-Check |  |  |
| /disruption/consistency | The Consistency Check — Prophetic Disruption (69) | One standard, or two? | 152 | Do You Hold Your Own Side to the Same Standard? | Do you hold your own side to the same standard? | "Prophetic Disruption" is a retired section name. |
| /disruption/witnesses | The Witnesses — Prophetic Disruption (61) | It has been done before. | 138 | Christians Who Told the Church the Truth | Christians who told the church the truth | Same H1 and description as /justice/witnesses. |
| /downloads | Free Downloads: Study Guides, Curriculum, and Printable PDFs (85) | Every printable, in one place | 150 | Free Printable Bible Study Guides and PDFs |  |  |
| /family | Family Discipleship — Devotions, Apologetics, and Parenting (84) | Disciple your whole family, in one place. | 160 | Family Devotions and Discipling Your Kids |  | "Apologetics" in the title is a seminary word. |
| /family/catechism | The Family Catechism — 76 Questions to Learn Together (78) | The Family Catechism | 156 | Family Catechism: 76 Questions and Answers |  | Add a line under the H1: "Short questions and answers that teach the faith." |
| /family/devotions | Family Devotions: Weekly, Thanksgiving, Advent, and Holy Week (86) | A devotion a week, together. | 178 OVER | Family Devotions for Every Week of the Year |  |  |
| /family/reading-plans | Family Bible Reading Plans (51) | Read the Bible together. | 152 |  |  |  |
| /faq/can-science-and-faith-coexist | Can Science and Faith Coexist? 8 Questions Answered (76) | Can science and faith coexist? | 169 OVER | Can Science and Faith Coexist? |  | Good question title; only the length. |
| /faq/catholic-vs-protestant | Catholic vs. Protestant: 8 Key Differences Explained (77) | What is the difference between Catholic and Protestant? | 141 |  |  |  |
| /faq/does-god-exist | Does God Exist? 8 Honest Answers to the Hardest Question (81) | Does God exist? | 154 |  |  |  |
| /faq/is-the-bible-historically-accurate | Is the Bible Historically Accurate? 8 Questions Answered (81) | Is the Bible historically accurate? | 201 OVER |  |  |  |
| /faq/what-denomination-should-i-join | What Denomination Should I Join? 8 Questions Answered (78) | What denomination should I join? | 143 |  |  |  |
| /faq/what-do-christians-believe-about-hell | What Do Christians Believe About Hell? 8 Questions Answered (84) | What do Christians believe about hell? | 149 |  |  |  |
| /faq/what-is-deconstruction | What Is Deconstruction? 8 Honest Answers for Christians (80) | What is deconstruction? | 142 |  |  |  |
| /faq/what-is-religious-trauma | What Is Religious Trauma? 8 Questions Answered Honestly (80) | What is religious trauma? | 156 |  |  |  |
| /faq/why-are-people-leaving-church | Why Are People Leaving Church? 8 Questions Answered Honestly (85) | Why are people leaving the church? | 160 |  |  |  |
| /faq/why-do-young-people-leave-church | Why Do Young People Leave Church? 8 Questions Answered (79) | Why do young people leave the church? | 174 OVER |  |  |  |
| /help | Find Help for What You Are Facing (58) | What are you facing? | 145 | Find Help: Anxiety, Grief, Doubt, Marriage |  |  |
| /how-tos | How-To Guides — Practical, Scripture-Grounded Help for Real Life (89) | Practical help for real life | 149 | How-To Guides: Marriage, Parenting, Prayer, Money | How-to guides for everyday Christian life |  |
| /justice/timeline | The Injustice Timeline — An Honest Reckoning (69) | No one's hands are clean. | 157 | Timeline of Injustice, Inside the Church and Out | A timeline of injustice, in the church and outside it | H1 is a verdict, not a name. |
| /justice/witnesses | The Witnesses — Prophetic Justice (58) | It has been done before. | 138 | Christians Who Fought Injustice, and What It Cost | Christians who fought injustice, and what it cost them | Same H1 and description as /disruption/witnesses. |
| /life | Integrated Life — Living the Whole of Life Well (72) | One life, offered whole | 157 | Christian Living: Home, Work, Money, Body, Soul | Following Jesus in every part of life | "Integrated Life" and "The Capstone" are internal names. |
| /life/assessment | The Whole-Life Assessment — The Annual Life Check-Up (77) | The Whole-Life Assessment | 188 OVER | Whole-Life Self-Check: A Yearly Check-Up |  |  |
| /membership | Membership (35) | The deeper room | 136 | LiveWell Membership (Waitlist) | LiveWell membership | "The deeper room" names nothing. Page also states "the 21 books". |
| /my-library | My Library: What You've Saved and Started on LiveWell (53) | My Library | no prerendered head |  |  |  |
| /nation | Search engines: Christ and the Nation (46). Browser tab: Christ and the Nation — The Bible, America, and Power (78) | The Bible is not a party. | 117 | The Bible and American Politics | The Bible and American politics | Keep "The Bible is not a party." as the line under it. |
| /nation/christian-nation | Search engines: Was America Founded as a Christian Nation? (67). Browser tab: Was America Founded as a Christian Nation? (67) | Was America Founded as a Christian Nation? | 151 |  |  |  |
| /nation/christian-nationalism | Search engines: What Christian Nationalism Actually Is (63). Browser tab: What Christian Nationalism Actually Is (63) | What Christian Nationalism Actually Is | 150 |  |  |  |
| /nation/compassion-and-coercion | Search engines: When Compassion Hardens Into Coercion (62). Browser tab: When Compassion Hardens Into Coercion (62) | When Compassion Hardens Into Coercion | 155 | When Compassion Turns Into Control |  |  |
| /nation/empire | Search engines: The Danger of Empire (45). Browser tab: The Danger of Empire (45) | The Danger of Empire | 154 | What the Bible Says About Empire |  |  |
| /nation/nationalism-history | Search engines: How We Got Here: A History of Christian Nationalism in America (87). Browser tab: How We Got Here: A History of Christian Nationalism in America (87) | How We Got Here: A History of Christian Nationalism in America | 151 | A History of Christian Nationalism in America |  |  |
| /nation/policy | The Biblical Policy Explorer — What Would It Actually Look Like? (89) | If we actually had a biblical government. | 158 | What Would a Biblical Government Look Like? | What would a biblical government look like? |  |
| /nation/power-and-church | Search engines: When Power Takes the Church: What History Keeps Showing Us (83). Browser tab: When Power Takes the Church: What History Keeps Showing Us (83) | When Power Takes the Church: What History Keeps Showing Us | 153 | When the Church Trades Its Voice for Power |  |  |
| /nation/progressive-captivity | Search engines: The Other Captivity: When the Faith Dissolves Into a Cause (83). Browser tab: The Other Captivity: When the Faith Dissolves Into a Cause (83) | The Other Captivity: When the Faith Dissolves Into a Cause | 154 | When Progressive Politics Replaces the Gospel |  | "The Other Captivity" only works if you read the first one. |
| /nation/render | Search engines: Render to Caesar — What a Christian Owes the State (75). Browser tab: Render to Caesar (41) | Render to Caesar | 153 | What Does "Render to Caesar" Mean? |  |  |
| /nation/scorecard | The Scorecard — How Close Is Each Party to the Bible? (78) | How close is each party to the Bible? | 146 | How Close Is Each Party to the Bible? |  |  |
| /nation/state-of-the-american-church | Search engines: The State of the American Church (57). Browser tab: The State of the American Church (57) | The State of the American Church | 159 |  |  |  |
| /nation/theocracy | Search engines: What an Old Testament Theocracy Actually Was (69). Browser tab: What an Old Testament Theocracy Actually Was (69) | What an Old Testament Theocracy Actually Was | 153 | Was Old Testament Israel a Theocracy? |  |  |
| /nation/which-party | Search engines: Which Party Fits the Bible More? (57). Browser tab: Which Party Fits the Bible More? (57) | Which Party Fits the Bible More? | 153 |  |  |  |
| /plans | Care Plans: Eight Weeks, One Step at a Time (68) | Eight weeks, one step at a time. | 153 | 8-Week Plans for Anxiety, Grief, Marriage, Doubt | Eight-week plans for a hard season | Called Care Plans, Eight-week plans, and Guided plans in three places. |
| /privacy | Privacy Policy (39) | Privacy Policy | 115 |  |  |  |
| /quiz | Search engines: Theological Position Quiz (50). Browser tab: LiveWell by James Bell — Theology That Carries the Weight of Everyday Life (74) | (none: needs the API) | 145 | What Do You Believe? A 10-Question Quiz |  | Same page as /tools/theology-quiz; redirect one to the other. |
| /resources | Resources — Downloads, Tools, and Help (63) | Resources | 140 | Free Christian Resources: Downloads, Tools, Help |  |  |
| /resources/context | Reading Scripture in Context — Biblical Background Guides (82) | Reading Scripture in Context | 156 | Bible Background: The World Behind the Bible | The world the Bible was written in | Named four ways across the site. |
| /resources/creeds | Creeds, Confessions, and Classics — Full Texts with Plain Notes (88) | A church without memory repeats old errors | 148 | The Creeds and Confessions, With Plain Notes | The creeds and confessions of the church | H1 is a proverb, not a name. Second creeds page at /theology/creeds. |
| /resources/hard-issues-series | The Hard Issues Series — Free Booklets for Church Leaders from PCN (91) | The Hard Issues Series | 140 | Free Booklets on Elders and Church Government | Free booklets for elders and church leaders | "Hard Issues" sounds like cultural issues; the booklets are on eldership and church government. |
| /roadmap | The Roadmap — 48 books (47) | What's been written. What's coming. | 98 | Books in Progress |  | Title states a book count ("48 books"); see finding 3. |
| /search | Search (31) | Search LiveWell | 59 |  |  |  |
| /skeptic-track | The Skeptic's Track — Start here (57) | Start here if you're skeptical. | 122 | For Skeptics: Start Here |  |  |
| /speaking | Speaking — James Bell (21) | Speaking and preaching | 173 OVER | Invite James Bell to Speak or Preach |  |  |
| /start | Find Your Path (39) | What's weighing heaviest right now? | 110 | Where to Start on LiveWell |  | "Find Your Path" is the old pathways language. |
| /study | Study the Bible (40) | Learn the whole Bible, and the church that carried it | 214 OVER | Study the Bible and Church History |  |  |
| /study/bible | The Study Bible: Learn the Whole Story, With Hebrew and Greek (86) | Learn the whole Bible | 220 OVER | Free Online Study Bible: Notes on Every Chapter | The Study Bible | H1 repeats the /study H1. |
| /study/bible/doctrines | The Doctrines of the Bible, Traced Verse by Verse (74) | The Doctrines of the Bible | 224 OVER | What the Bible Teaches: 62 Doctrine Studies |  |  |
| /study/bible/guides | Guides to Reading the Bible (52) | Guides to Reading the Bible | 202 OVER |  |  |  |
| /study/bible/story | The Story of the Bible, From Creation to New Creation (78) | The Story of the Bible | 166 OVER | The Story of the Bible in Eleven Parts |  |  |
| /studyguides | Study Guides — Free Leader's Toolkits for Small Groups and Sunday School (97) | Teach the hard things well | 149 | Free Bible Study Guides for Small Groups | Free Bible study guides for small groups | H1 is a slogan. |
| /subscribe | Subscribe (34) | One serious essay a week. Written slow, sent once. | 155 | Subscribe: One Essay a Week From James Bell |  | Description still promises "self-paced reading paths". |
| /terms | Terms of Use (37) | Terms of Use | 40 |  |  |  |
| /theology/compare | Compare the Views — Doctrine Comparison Table (70) | See the positions side by side. | 141 | Compare Christian Views on Disputed Doctrines | Compare Christian views, side by side |  |
| /theology/creeds | Creeds and Confessions — The Faith in Its Own Words (76) | The faith, in its own words. | 153 |  |  | Duplicate of /resources/creeds. Redirect to it. |
| /theology/glossary | Theology Glossary — Every Term, Defined Plainly (72) | Every word, explained plainly. | 157 | Theology Glossary: Christian Terms in Plain Words |  | Second glossary at /tools/glossary. |
| /theology/history | Church History — The Story You Belong To (65) | The story you were born into. | 160 | Church History, From the Apostles to Today | Church history, from the apostles to today | A skeptic was not "born into" it. |
| /theology/how-to-use | How to Use This Section — Theological Depth (68) | How to Use This Section | 150 | How to Use the Doctrine Studies | How to use the doctrine studies | "Theological Depth" is a retired section name. |
| /theology/passage | The Passage Context Tool — Read Any Verse in Context (77) | Never read a verse alone again. | 157 | Read Any Bible Verse in Context | Read any Bible verse in context |  |
| /theology/questions | Hard Questions — Honest Answers to What You Actually Ask (81) | The questions you actually came with. | 146 |  |  | Fourth "hard questions" index. Fold into /answers (or /topics after #540). |
| /theology/search | Search the Theological Depth Section (61) | Search everything. | 135 | Search the Doctrines, Creeds, and Glossary | Search the doctrines, creeds, and glossary | "Theological Depth Section" is a retired name. |
| /theology/traditions | Why Are There So Many Churches? (56) | Why are there so many churches? | 146 |  |  |  |
| /theology/which-view | Which View Am I? A Theology Diagnostic (63) | Where do you lean, and why? | 154 | Which Christian View Do You Lean Toward? |  |  |
| /tools | Search engines: Tools for Pastors and Readers (54). Browser tab: Free Christian Tools for Families (58) | Tools for the Life You Are Actually Living | 125 | Free Bible Study, Prayer, and Family Tools | Free tools for Bible study, prayer, and family life | Three different names for this page. |
| /tools/bible-on | What the Bible Says About — A Topical Scripture Guide for Life (87) | What the Bible says about | 154 | What the Bible Says About Money, Anger, Work |  | One of three "What the Bible says" pages. |
| /tools/bible-says | What the Bible Actually Says About… -- Topical Scripture Reference (91) | What the Bible Actually Says About… | 209 OVER | Misread Bible Topics: What the Text Says |  | One of three "What the Bible says" pages. Title has "--" and "…". |
| /tools/bible-study | Bible Study Guide -- Study Any Book with Theological Depth (83) | Bible Study Guide | 153 | Bible Book Study Guides: 12 Key Books |  | Title has "--". |
| /tools/conflict-guide | Conflict Resolution Guide -- A Five-Step Process for Couples and Families (98) | Conflict Resolution Guide | 149 | Resolve a Conflict: Five Steps for Couples |  | Title has "--". |
| /tools/connection-planner | The Connection Planner: Small Steps When You Feel Alone (80) | The Connection Planner / The Connection Planner | 147 | A Weekly Plan for When You Feel Lonely |  | Page has two H1s. |
| /tools/deep-bible | Deep Bible Study Companion — Seminary Depth, Kitchen-Table Language (92) | Deep Bible Study Companion | 156 | Study a Bible Passage in Six Layers |  |  |
| /tools/emotional-health | Emotional Health Self-Check: An Honest Look at Your Inner Life (87) | Emotional Health Self-Check | 167 OVER | Emotional Health Self-Check (15 Questions) |  |  |
| /tools/family-devotions | Family Devotion Builder — 15-Minute Devotions by Age and Theme (87) | Family Devotion Builder | 145 | Build a 15-Minute Family Devotion |  |  |
| /tools/financial-health | Financial Health Check: A Self-Check on Money and Faith (80) | Financial Health Check | 163 OVER | Money and Faith Self-Check (12 Questions) |  |  |
| /tools/glossary | Theological Vocabulary Glossary — 100 Essential Terms (78) | Theological Vocabulary Glossary | 212 OVER |  |  | Duplicate glossary. Fold into /theology/glossary. |
| /tools/life-audit | Life Audit: A Self-Check Across Eight Areas of Life (76) | Life Audit | 206 OVER | Life Self-Check: Eight Areas, 24 Questions |  | Audit, Assessment, Self-Check, Health Check: pick one word. |
| /tools/marriage-assessment | Marriage Health Self-Check: A Private Look at Your Marriage (84) | Marriage Health Self-Check | 164 OVER | Marriage Self-Check (15 Questions, Private) |  |  |
| /tools/parent-teen-conversation | The Parent and Teen Conversation: See Home From Both Sides (83) | The Parent and Teen Conversation | 169 OVER | A Parent and Teen Conversation Guide |  |  |
| /tools/parenting-guide | Parenting Stage Guide -- Age-Specific Theological Parenting Guidance (93) | Parenting Stage Guide | 159 | Christian Parenting by Age: Toddlers to Teens |  | Title has "--". |
| /tools/parenting-verses | Parenting Bible Verses — Scripture for Raising Kids (76) | Parenting Bible Verses | 146 | Bible Verses for Parents |  |  |
| /tools/prayer-generator | Prayer Generator — Guided Prayers for Every Occasion (77) | Prayer Generator | 151 | Written Prayers for Morning, Evening, Hard Days | Prayers for when you have no words | "Generator" sounds like a machine wrote the prayer. |
| /tools/prayer-planner | The Prayer Planner: Your People, Through the Week (74) | The Prayer Planner | 143 | A Weekly Prayer List You Can Keep |  |  |
| /tools/proverbs-31 | Proverbs in 31 Days — A Chapter a Day for the Wise Life (80) | Proverbs in 31 days | 142 | Proverbs in 31 Days: A Chapter a Day |  |  |
| /tools/quotes | Words Worth Sharing (44) | Words Worth Sharing | 149 | Quotes From James Bell's Essays and Books | Quotes from the essays and books | "Words Worth Sharing" does not say whose. |
| /tools/rule-of-life | Rule of Life Builder — Build a Sustainable Rhythm of Grace (83) | Build a rule of life | 151 | Build a Weekly Rhythm of Prayer and Rest |  | "Rule of life" needs its plain meaning beside it. |
| /tools/saved | Saved Items — LiveWell Tools (28) | Saved Items | 108 |  |  |  |
| /tools/scripture-memory | Scripture Memory System -- Memorize Bible Verses (73) | Scripture Memory System | 126 | Memorize Bible Verses: 40 Verses, Step by Step | Memorize Bible verses | Title has "--". |
| /tools/spiritual-gifts | Spiritual Gifts Self-Check: Eight Gifts Scripture Names (80) | Spiritual Gifts Self-Check | 157 | Spiritual Gifts Self-Check |  |  |
| /tools/test-the-case | Test the Case: Push Back at Every Step (63) | Did the resurrection happen? | 193 OVER | Did the Resurrection Happen? Test the Case |  | Title does not contain the question the page answers. |
| /tools/theology-quiz | Search engines: Theological Position Quiz (50). Browser tab: LiveWell by James Bell — Theology That Carries the Weight of Everyday Life (74) | (none: needs the API) | 145 | What Do You Believe? A 10-Question Quiz |  | Duplicate of /quiz. |
| /tools/verse-finder | Bible Verse Finder — Find Scripture for Any Season (75) | Bible Verse Finder | 123 | Bible Verse Finder: Verses by Topic |  |  |
| /tools/which-lens | Which Lens Has You? — A Diagnostic (59) | Which lens has you? | 167 OVER | What Shapes How You Read the Bible? A Self-Check | What shapes how you read the Bible? | "Which lens has you?" is clever and unclear. |
| /tools/wisdom-finder | Wisdom Finder — Tell Us What You Are Facing, and What the Bible Says (93) | What are you facing | 155 | What Does the Bible Say About My Situation? | What does the Bible say about what I am facing? | Same H1 as /help. |
| /tools/worry-journal | The Worry Journal: Five Minutes Before Bed (67) | The Worry Journal | 137 | A Bedtime Worry Journal (Five Minutes) |  |  |
| /wisdom | Wisdom for All of Life — Proverbs, Ecclesiastes, and the Skill of Living (97) | Wisdom for all of life | 168 OVER | Bible Wisdom for Money, Work, Anger, Marriage |  |  |
| /writing | Search engines: Essays by James Bell (20). Browser tab: Essays (31) | Essays | 137 | Essays by James Bell |  |  |

## Inventory 4: the page families (2,274 indexed pages)

| Family | Pages | Titles over 60 | Longest title | Descriptions over 160 | Title pattern, with an example | Verdict |
|---|---|---|---|---|---|---|
| Study Bible chapters `/study/bible/<book>/<n>` | 1,189 | 1,189 | 117 | 0 | "John 3 Study Notes – Nicodemus, New Birth, and God's Love for the World" | Right words first. Drop the site name from these; fix "Psalms 23". |
| Study Bible books | 66 | 66 | | 0 | "John: Introduction, Outline, and Study Notes" | Good. |
| Doctrine studies `/study/bible/doctrines/*` | 63 | 51 | 89 | 1 | "Angels, Satan, and Spiritual Powers: What the Bible Teaches" | Good. |
| Story acts `/study/bible/story/*` | 11 | 2 | 78 | 1 | "Creation: Act One" | Add the search phrase: "Creation: Part One of the Bible's Story". |
| Reading guides `/study/bible/guides/*` | 24 | 0 | 59 | 1 | "How the Books Were Chosen", "Reading Apocalyptic" | Good. "Reading Apocalyptic" needs a gloss: "Reading Revelation and Daniel (Apocalyptic)". |
| Church history essays `/theology/history/*` | 22 | few | | 18 | "The Constantinian Turn", "The Long Middle" | Insider names (finding 5); long descriptions. |
| Older doctrine pages `/theology/doctrine/*` | 31 | some | 83 | some | "Who Is Jesus?", "What Is the Church?" | Plain questions. Three duplicate the reading guides. |
| Find Help `/help/*` | 40 | 40 | 85 | 0 | "Can't Stop Worrying? Anxiety, the Bible, and What Helps" | The best on the site. Under 60 with the short ending. |
| Eight-week plans `/plans/*` | 29 | 12 | 72 | 29 | "Eight Weeks of Small Mercies" | Topic missing (finding 5). |
| How-to guides `/how-tos/*` | 132 | 74 | 86 | 47 | "How to Age With Grace" | Good, except the "Table" guides. |
| Life guides `/life/*` | 70 | 70 | 83 | 66 | "Is Anger a Sin? What Scripture Actually Says" | Titles good. Descriptions run to 384. |
| Wisdom topics `/wisdom/*` | 208 | 181 | 82 | 208 | "Anxiety and Worry — What the Bible Says" | Put the phrase people type first: "What the Bible Says About Anxiety and Worry". One duplicate pair. |
| Study guides `/studyguides/*` | 68 | 57 | 86 | 68 | "Anxiety: A Bible Study on Worry and the Peace of Christ" | Good titles. |
| Family devotions `/family/devotions/*` | 112 | most | 86 | 8 | "The Long Wait Begins: A Family Devotion" | Subject missing (finding 12). 7 descriptions under 70. |
| Context guides and creeds `/resources/*` | 58 | 47 | 91 | 24 | "Is 2 Chronicles 7:14 a Promise to America?" | Good. |
| Essays `/writing/*` | 20 | 11 | 76 | 8 | "Why Didn't the Bible Just Ban Slavery?" | Mixed (finding 6). 6 descriptions under 70. |
| Nation `/nation/*` | 13 | 10 | 89 | 0 | "Which Party Fits the Bible More?" | Mixed; replacements in Inventory 3. |
| Old pathways `/pathways/*` | 13 | 2 | 68 | 0 | "Faith and the Flag", "Work and the Weight of Monday" | Literary names, still indexed while the hub redirects. Rename or retire. |
| FAQ `/faq/*` | 10 | 10 | 85 | 3 | "Does God Exist? 8 Honest Answers to the Hardest Question" | Good. |
| Compare `/compare/*` | 6 | 1 | 70 | 3 | "Catholic vs. Protestant: What's the Difference?" | Good; already uses the short ending. |

Totals: 1,984 of 2,274 titles over 60 characters (with the short ending "| LiveWell", 1,345 remain over, 1,109 of them Study Bible chapters where the reference comes first and the cut does no harm; 873 would be over with no site name at all); 506 descriptions over 160; 7 duplicate titles; 2 duplicate descriptions.

## Inventory 5: old addresses that redirect (86)

These need no title of their own. Listed so you can see where each old name now lands. Seven of them land on the home page, which tells the visitor nothing about why they moved: `/for-leaders`, `/for-pastors`, `/pastors`, `/pastoral-burnout`, `/the-pastoral-angle`, `/pastors-resource-wall` and `/sermon-series`. `/pastoral-burnout` should land on `/help/pastors` ("Pastor Burnout, Depression, and Thinking About Quitting"), which exists.

| Old address | Lands on |
|---|---|
| /after-christendom | /writing?section=after-christendom |
| /alone-in-a-crowded-church | /books |
| /article-collections | /writing |
| /articles | /writing |
| /babylon | /books |
| /be-true-to-yourself | /books |
| /book-bundles | /books |
| /books/raising-believers | /books |
| /born-again-from-atheism | /books |
| /capture-by-the-left | /writing?section=faith-and-power |
| /capture-by-the-right | /writing?section=faith-and-power |
| /church-history | /theology/history |
| /church-hurt | /help/church-hurt |
| /connect | /about |
| /consider-the-birds | /books |
| /covenant | /books |
| /deconstruction | /help/deconstructing |
| /disciple-making | /tools |
| /discipleship | /tools |
| /disruption | /writing?section=faith-and-power |
| /disruption/glossary | /writing?section=faith-and-power |
| /disruption/posture | /writing?section=faith-and-power |
| /disruption/questions | /writing?section=faith-and-power |
| /doubt | /answers |
| /exile | /writing?section=after-christendom |
| /explore | /writing |
| /faith-after-deconstruction | /books |
| /faith-crisis | /help/doubt |
| /family/tonight | /family/devotions/stewardship |
| /faq | /answers |
| /for-families | /family |
| /for-leaders | / |
| /for-pastors | / |
| /framework | /writing |
| /grief | /help/grief |
| /healwell | /books |
| /heaven-is-not-your-reward | /books |
| /historic-faith | /study |
| /honest-questions | /answers |
| /how-to-read-the-bible | /books |
| /justice | /writing |
| /justice/glossary | /writing |
| /justice/posture | /writing |
| /lament | /studyguides/lament |
| /library | /writing |
| /living-well | /writing |
| /map | /writing |
| /marriage | /help/marriage |
| /marriage-crisis | /help/marriage |
| /marriage-in-ministry | /books |
| /ordinary-holiness | /books |
| /parenting | /family |
| /parenting-help | /help/parenting |
| /pastoral-burnout | / |
| /pastors | / |
| /pastors-resource-wall | / |
| /pathways | /writing |
| /pillars | /writing |
| /post-christian | /writing?section=after-christendom |
| /prayer-in-the-dark | /books |
| /prophetic-justice-101 | /books |
| /reading-paths | /writing |
| /reading-scripture-past-our-politics | /writing?section=faith-and-power |
| /rule-of-life | /books |
| /sermon-on-the-mount-as-politics | /books |
| /sermon-series | / |
| /start-here | /start |
| /substack | /subscribe |
| /the-body-you-left | /books |
| /the-god-who-is-not-nice | /books |
| /the-loneliness-of-the-pastor | /books |
| /the-pastoral-angle | / |
| /the-scandal-of-the-cross | /books |
| /theology | /study |
| /theology/biblical | /study/bible/story |
| /theology/explorer | /study/bible/doctrines |
| /theology/hermeneutics | /study/bible/guides |
| /theology/paths | /study |
| /tools/church-health | /tools |
| /tools/discipleship-table | /tools |
| /tools/pastor-burnout | /tools |
| /tools/sermon-outline | /tools |
| /what-belongs-to-the-poor | /books |
| /where-your-treasure-is | /books |
| /why-not-what | /books |
| /work-with-james | /speaking |

## What needs your decision

1. **Title, years and book count in descriptions (finding 3).** May I replace the `/about` description, the site fallback description, and the `/roadmap` title with the wording given, and take `/roadmap` and `/membership` out of the sitemap?
2. **"Topics" (finding 8).** Keep the door as "Topics" with a first item "Hard questions, by topic", or rename the door "Questions"?
3. **"Tonight at the table" (finding 5).** Is "the table" a phrase you want to teach families, or shall the menu say "Tonight's family devotion" and keep "at the table" inside the page?
4. **Your own headlines (finding 4).** Twenty-one headlines move from a line of yours to a plain name, with your line kept underneath. Any you want left alone?
5. **Church-history era names (finding 5).** Approve the plain lead-ins, and give your wording for "The Attractional Era".
6. **The two "When Fear ..." essays (finding 6).** Which keeps its title?
7. **The site name at the end of titles (finding 2).** "| LiveWell" in place of "| LiveWell by James Bell"? Your name stays in the title of `/about`, `/books`, `/writing`, `/speaking` and `/contact`.
8. **One tagline.** The footer says "Theology that carries the weight of everyday life." The home page says "Learning to follow Jesus — and live well — in post‑Christian America." Which one is the site's line?
9. **A portrait on the front page.** Outside this lens, noted in passing: the home page in both builds shows a small portrait beside "James Bell / About James" (`client/src/pages/Home.tsx` line 103). Your standing note says no photograph of you on the front page. Another auditor may cover it; I flag it so it is not missed.

## What I did not verify

- Essay pages, `/quiz` and `/tools/theology-quiz` as a visitor sees them on the live site, because the local build has no database. Their titles and descriptions come from the prerendered heads and the code.
- How Google actually displays any of these today. The 60 and 160 character limits are working rules.
- The content of each church-history essay and each plan against my suggested plain names. Each replacement there is marked as a suggestion for you to confirm.
- No repository file was changed. This report and the screenshots are the only files written.
