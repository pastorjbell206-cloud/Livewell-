# Taking stock: the tools

Inventory of every tool, self-check, quiz, builder and planner on LiveWell, read from the code in `/home/user/Livewell-` on the work branch (commit `b2e655e6`, 2026-11-18). Nothing was run and nothing was edited. Quality is judged from the code and its data, not from a browser.

## The short version

- The site has **62 tool-like things**: 36 on the tools page, 26 elsewhere (self-checks page, Study Bible, family, memory pages, and six addresses already retired).
- **Verdicts: keep 37, merge 13, rename 2, rewrite 4, retire 6.**
- If the merges are approved, the tools page drops from **36 tiles to 22**, and no two do the same job.
- The largest duplication is "what does the Bible say about X": **five tools, four different Bible wordings**. One should survive.
- The second largest is "study a passage": the Study Bible plus **three older tools** that cover 12, 20 and any book, in two other wordings, one of them fetched from an outside service.
- One tool is broken in purpose: the **Theology Quiz** does not test theology. It sorts the reader into three section names the site retired, and its two descriptions promise two other things.
- Six tools still print "The verse text here has not been checked word for word against one translation." One is the memory tool.
- Thirteen jobs a studying person needs have no tool yet. They are listed in section 6.

## 1. What changed since the audit of 2026-11-15

The audit (`docs/work/audit-2026-11/interactivity.md`) is right about the duplication. These findings are now out of date:

| Audit finding | State in the code today |
|---|---|
| F2: history tabs eight screens down, timeline is seven accordions | Tabs are at the top. A year-by-year stepper exists (`components/history/HistoryTimeline.tsx`): pick an era, step through years, see who was alive. Not drawn to scale; still not a line you can drag. |
| F3: Compare the views is unreachable | In the Study menu (`siteNav.ts`), linked under matching Honest Answers, and opens on a named topic (`?doctrine=`). |
| F5: `/answers` has no search | Has a find box, a jump list, "Back to the questions", and a copy-link per answer. |
| F6: Whole-Life Assessment forgets its answers | Fixed. Answers are kept as you go (`livewell-progress-whole-life`). My Library still does not list a half-done one. |
| F7: only the verse number opens the notes | A tap anywhere on the verse opens the panel. Other small buttons were not re-measured here. |
| F10: every tile says "Open the tool" | Tiles say "Read" or "Start". Names were made plainer. |
| F11: orphan `/dashboard` with a streak | Redirects to `/my-library` (App.tsx and vercel.json). |
| F13: Find Help returns unrelated pages | A floor (half the top score) and a cap are in `lib/needs.ts`. |
| P3: "a devotion for tonight, picked by you" | Built on `/family` (`TonightChooser.tsx`). The old KJV builder it was meant to replace is still live. |
| "No Bible word search" | Built at `/study/bible/search`. |
| "Consistency Check takes no answers" | It takes taps: each of 13 prompts can be marked and the page counts them. Nothing is kept and nothing follows from the count. |
| "Deep Bible resets on reload" | Half right. It keeps your notes and marks on the device (`lw-deep-bible`). Whether it reopens on the same passage was not checked. |

Still true: 36 tiles on `/tools`; F4 (duplicates); F8 (unchecked verse text); F12 (no image cards: there is no canvas or image-making code in `client/src`).

New since the audit, found here:

1. **Three lists name the same tools differently.** `ToolsHub.tsx` (TOOLS), `Assessments.tsx` (GROUPS) and `lib/myProgress.ts` each hold their own names. Example: "A Quick Check on Eight Areas of Life" on the tools page is "The Life Audit" on the self-checks page and "Life Audit" in My Library. "Memorize Scripture: 40 Key Verses" is "Scripture Memory System" in My Library. `StartHereQuiz.tsx` still says "The Marriage Assessment" and "The Consistency Check".
2. **The Passage tool sends the reader's reference to an outside service.** `PassageContext.tsx` fetches the World English Bible from `bible-api.com` at run time, while the site holds its own Berean Standard Bible text for every chapter.
3. **Verse Finder and Scripture Memory read as New International Version wording** (for example Philippians 4:6-7, "in every situation, by prayer and petition") with no translation named. That translation is under copyright. This is my reading of the text, not a word-for-word check.
4. **The pastors' tools redirect to the tools page**, including the burnout check, although a care page for pastors exists at `/help/pastors`.

## 2. The inventory: one row per item

"Needs": **nothing** = all content ships in the page; **device** = keeps something in this browser; **file** = loads a JSON file from the site; **server** = needs the API; **database** = needs MySQL. "Without database" says whether it works when the database is down.

### 2a. The 36 tiles on the tools page (`/tools`)

| # | Address | Name today | The one job, in a visitor's words | Needs | Without database | Overlaps with | How good (from the code) | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | `/tools/test-the-case` | Test the Case for Christianity | "Argue with me about whether the resurrection happened." | Device (place kept) | Yes | Honest Answers, `/skeptic-track` | Strong. 9 cases published of 11 written, five moves each, push-back at every move. The best tool for the skeptic. | **Keep** |
| 2 | `/tools/which-lens` | What Shapes the Way You Read the Bible? A Self-Check | "Show me what is bending how I read the Bible." | Device (this tab only) | Yes | Consistency check | Strong and original. 13 forced choices, five named lenses, scoring evened per lens. Forgets when the tab closes. | **Keep** |
| 3 | `/tools/deep-bible` | Book-by-Book Bible Study: 20 Books in Depth | "Walk me through this passage in depth." | Device (notes and marks) | Yes | Study Bible, 13, 21 | Deep but thin in reach: 20 books, 37 passages, six layers each. Verse text marked unchecked. 350 em-dashes in the file. Names scholars and commentaries that would need checking. | **Merge** into the Study Bible (`/study/bible`) |
| 4 | `/tools/theology-quiz` (also `/quiz`) | Theology Quiz | "Test what I know." (That is what both descriptions promise.) | Server for questions; database for results | No | Which View Am I?, Start quiz | Weak. Ten preference questions that sort the reader into "Theological Depth", "Prophetic Disruption" or "Integrated Life", names the site retired. Results list essays by that label without asking the shelf, so they can land on a retired-essay notice. The server copy contains words on the forbidden list ("authentic", "nuance"). Page headline is a third name: "Where Do You Stand Theologically?" | **Rewrite** (see 5.1) |
| 5 | `/diagnostic` | Where Are You With God? A Self-Check | "Give me an honest read on where I am with God." | Device | Yes | 6, 30, Start quiz | Good. 8 questions, four areas, a reading per area, live next steps, history, safety question. | **Keep** |
| 6 | `/life/assessment` | The Whole-Life Assessment | "Check my whole life once a year and give me a rhythm to keep." | Device (answers, history, a kept rule) | Yes | 30, 9, 5 | Good and ambitious: 30 statements, five areas, a yearly record, a rule of life with weekly kept-or-missed check-ins. Only two onward links. | **Keep** (the survivor of the whole-life pair) |
| 7 | `/wisdom` | Proverbs and Ecclesiastes: A Guide to Biblical Wisdom | "What does the Bible say about what I am dealing with?" | File | Yes | 8, 10, 14, 25, `/topics` | Good data: 208 topics in 26 files, Berean Standard Bible named. It is the browse page for the same data tool 8 searches. | **Keep** (the survivor; takes the finder) |
| 8 | `/tools/wisdom-finder` | What Does the Bible Say About What I Am Facing? | Same job as 7, by typing. | File, device (saves) | Yes | 7, 10, 14, 25, Find Help | The best of the five verse lookups: typed search, A to Z, saves, a daily entry, copy. 27 em-dashes. | **Merge** into `/wisdom` (its search box becomes the top of that page) |
| 9 | `/tools/rule-of-life` | Build a Weekly Rhythm of Prayer and Rest (a Rule of Life) | "Help me set a weekly rhythm I can keep." | Device | Yes | The rule inside 6 | Good, small, clear. Copy and keep. A second rule of life is stored separately by tool 6. | **Keep** |
| 10 | `/tools/bible-on` | What the Bible Says About Money, Anger, Work and More | Same job as 7. | Nothing | Yes | 7, 8, 14, 31 | Thin: 14 topics, verses given as the site's own paraphrase. Every topic is inside tool 7's 208. | **Merge** into `/wisdom` |
| 11 | `/tools/proverbs-31` | Proverbs in 31 Days | "Give me today's chapter of Proverbs." | Nothing (reads the date) | Yes | Reading plans | Good idea, well made, short. Verse text marked unchecked. | **Keep** (fix the verse text; list it with the reading plans) |
| 12 | `/resources/context` | Bible Background: The World the Bible Was Written In | "What was the world like when this was written?" | File | Yes | None | A library of guides, not a tool. Strong. | **Keep** (take it off the tools page; it lives under Study) |
| 13 | `/theology/passage` | Read Any Bible Verse in Context | "Show me this verse with what surrounds it." | File, plus an outside service (`bible-api.com`) | Yes, if the outside service answers | Study Bible, 3, 21 | The teaching panels are good (727 KB of passage notes, genre guidance for all 66 books). The passage itself comes from another site in another translation. | **Merge** into the Study Bible (its notes move beside the chapter) |
| 14 | `/tools/verse-finder` | Bible Verse Finder | Same job as 7. | Device (saves) | Yes | 7, 8, 10, 25 | Thin: 20 topics, five verses each. Text unchecked and reads as NIV. "lonely" still does not find "Loneliness". 13 em-dashes. | **Merge** into `/wisdom` |
| 15 | `/tools/worry-journal` | The Worry Journal | "Help me put tonight's worries down before bed." | Device | Yes | None | Strong. Four prompts, a follow-up days later on how each worry turned out, help lines at the foot, tests. | **Keep** |
| 16 | `/tools/parent-teen-conversation` | The Parent and Teen Conversation | "Help my teenager and me see where we differ, and talk." | Nothing (codes carry four scores) | Yes | None | Strong and unusual. Two devices, a swap code, safety wording for a teen. Loses your answers on a reload. | **Keep** |
| 17 | `/tools/prayer-planner` | The Prayer Planner | "Keep my prayer list and show me today's names." | Device | Yes | None | Strong. Days, answered-prayer record, tests. | **Keep** |
| 18 | `/tools/connection-planner` | A Plan for When You Feel Alone | "Give me one small step toward people this week." | Device | Yes | Loneliness care page and plan | Strong. Weekly cycle, history, help lines, tests. | **Keep** |
| 19 | `/tools/prayer-generator` | Prayers for When You Have No Words | "Give me words to pray right now." | Device (saves) | Yes | Prayer in tonight's devotion | The job is real. The 36 prayers (12 needs, three each) read as stock devotional prose, with 27 em-dashes. Nothing is generated; the address says "generator". | **Rewrite** (the prayers; add psalms and the church's own prayers) |
| 20 | `/tools/family-devotions` | Family Devotion Builder | "Give my family a devotion for tonight." | Device (a series) | Yes | `/family` chooser (46), `/family/tonight` | 40 pre-written devotions in the King James Version, including for ages 3 to 6, while the rest of the family side is in the Berean Standard Bible. Its own storage key, outside My Library. | **Merge** into "A devotion for tonight" on `/family` |
| 21 | `/tools/bible-study` | How to Study a Book of the Bible: 12 Books | "Tell me how to read this book of the Bible." | Nothing | Yes | Study Bible book pages, 3 | Sound but small: 12 books, each with an overview, themes, questions and how to read it. The Study Bible covers all 66. | **Merge** into the Study Bible book pages |
| 22 | `/tools/marriage-assessment` | Marriage Health Self-Check | "Where does our marriage stand, honestly?" | Device | Yes | None | Strong. 15 questions, five areas, a couple mode, live next steps, print. | **Keep** |
| 23 | `/tools/financial-health` | Financial Health Self-Check | "What do my money habits say about my heart?" | Device | Yes | None | Strong. 12 questions, four areas, 39 onward links, help lines. | **Keep** |
| 24 | `/tools/parenting-guide` | Parenting Stage Guide | "What does my child need at this age?" | Nothing | Yes | Family how-to shelf | Good reading: six ages, needs, how to talk about God, mistakes, one practice. One onward link. | **Rename** to "What your child needs at each age" and move it to Family |
| 25 | `/tools/parenting-verses` | Parenting Bible Verses | Same job as 7, for parents. | Nothing | Yes | 7, 8, 10, 14 | Thin: 10 moments, verse text unchecked, no onward links. The notes to the parent are the good part. | **Merge** into `/wisdom` (as its parenting topics) |
| 26 | `/tools/emotional-health` | Emotional Health Self-Check | "Why do I feel off, and where do I start?" | Device | Yes | None | Strong. 15 questions, five areas, four levels, 31 onward links, help lines. | **Keep** |
| 27 | `/tools/spiritual-gifts` | Spiritual Gifts Self-Check | "What do I have to give my church?" | Device | Yes | Which View (gifts quiz) | Strong and careful: 32 statements, reverse-scored checks, both views on the miraculous gifts stated, tests. | **Keep** |
| 28 | `/tools/scripture-memory` | Memorize Scripture: 40 Key Verses | "Help me learn this verse by heart." | Device | Yes | Memory verse in family devotions and the catechism | The four practice modes are right. The 40 verses are fixed, unchecked, and read as NIV; a reader cannot add a verse; nothing brings a verse back for review; no onward links. | **Rewrite** (see 5.2) |
| 29 | `/tools/conflict-guide` | Conflict Resolution Guide | "We just had a fight. Walk us through it." | Nothing | Yes | Marriage self-check | Good: eight kinds of conflict, five steps, questions and a warning per step. Verse text unchecked; loses your place on a reload. | **Rename** to "Work through a fight in five steps" |
| 30 | `/tools/life-audit` | A Quick Check on Eight Areas of Life | Same job as 6, shorter. | Device | Yes | 6, 5 | Well made: 24 questions, eight areas, 55 onward links, history. It is the second whole-life check. | **Merge** into `/life/assessment` (bring its next-step links, which 6 lacks) |
| 31 | `/tools/bible-says` | Misused Bible Verses: What They Actually Mean | "What does that verse everyone quotes really mean?" | Nothing | Yes | 10 by title only | Strong and distinct: 15 topics, 82 passages, each with context, the misuse, and what it teaches. No onward links; verses are shortened. Its search title says "Misread Bible Topics", a second name. | **Keep** (one name; link each verse into the Study Bible) |
| 32 | `/tools/quotes` | Quotes From the Essays and Books | "Give me a line of James's to share." | Device (saves) | Yes | None | Good: 400 quotes, search, themes, links that ask the shelf. No image card. | **Keep** |
| 33 | `/tools/glossary` | Theology Glossary | "What does this theology word mean?" | Nothing | Yes | `/theology/glossary` (41) | 100 terms at three depths, typed into the page, 269 em-dashes. A second glossary with 114 terms exists. | **Merge** into `/theology/glossary` |
| 34 | `/disruption/consistency` | Do You Hold Both Sides to the Same Standard? A Self-Check | "Am I fair to the side I disagree with?" | File | Yes | 2 | Honest writing, 13 prompts. Marks are not kept and lead only to one essay shelf. | **Keep** (keep the marks; end with a next step) |
| 35 | `/nation/scorecard` | How Close Is Each Party to the Bible? | "How do the parties measure against Scripture?" | File | Yes | 36 | A reading page with things that open and close. | **Keep** as reading (whether it stays on the tools page is James's call) |
| 36 | `/nation/policy` | What Would a Biblical Government Look Like? | "What would the Bible's own economics look like as law?" | File | Yes | 35 | A reading page. | **Keep** as reading (same call) |

### 2b. Self-checks, study instruments and planners that live elsewhere

| # | Address | Name today | The one job, in a visitor's words | Needs | Without database | Overlaps with | How good | Verdict |
|---|---|---|---|---|---|---|---|---|
| 37 | `/assessments` | Self-checks for your faith, your marriage, and your life | "Show me all the self-checks." | Nothing | Yes | The Self-checks group on `/tools` | A second list of 12 of the same things under different names. Its line for the Theology Quiz ("your place among the traditions") is not what the quiz does. | **Merge** into `/tools` (send to `/tools#self-checks`) |
| 38 | `/start/quiz` | Where to Start on LiveWell | "I am new here. Where do I start?" | Device (this tab) | Yes | `/start`, Find Help, 5 | Three questions, then a list of links. Still offers "Pastoral Ministry" and "Leading Others" as choices, and uses old tool names. `/start` is now the road for someone new, and Find Help answers "what is weighing on you". | **Retire**; send to `/start` |
| 39 | `/theology/which-view` | Which Christian View Do You Lean Toward? | "Which side of this debate do I lean toward?" | File | Yes | 40 | Good: six quizzes of eight questions (salvation, church, end times, Genesis 1, the Lord's Supper, the gifts), each with a fair caveat. Loses your answers on a reload; one onward link. | **Keep** |
| 40 | `/theology/compare` | Compare Christian Views on Disputed Doctrines | "Show me the views side by side." | File | Yes | 39, six `/compare/...` reading pages | Strong: 31 debates, each position in one line and in brief. Now reachable. | **Keep** |
| 41 | `/theology/glossary` | Theology Glossary: Christian Terms in Plain Words | "What does this word mean?" | File | Yes | 33 | 114 terms, loaded as data, searchable. | **Keep** (the survivor) |
| 42 | `/study/bible/search` | Search the Bible: Find Any Word or Phrase | "Find every verse with this word." | File (eight generated files) | Yes | None | New and sound: whole words, phrases first, filters by testament and book. | **Keep** |
| 43 | "Go to" box (header, `/study/bible`) | Go to a passage | "Take me to John 3:16." | Nothing | Yes | Site search | Works; sends anything that is not a reference to the word search. | **Keep** |
| 44 | `/theology/history#timeline` | The timeline | "Step through church history year by year." | File | Yes | 45 | New: seven eras, Earlier and Later, who was alive, which council, which essay. A list, not a drawn line. | **Keep** (and grow; see 6) |
| 45 | `/justice/timeline` | Timeline of Injustice, Inside the Church and Out | "Show me where the church got justice wrong and right." | File | Yes | 44 | 45 events, five filters, one very long column. | **Keep** (its events should also appear as a row in 44) |
| 46 | `/family` ("A devotion for tonight") | A devotion for tonight | "Pick a devotion for my kids, tonight, fast." | Device (ages and minutes) | Yes | 20, 47 | New and right: three taps to one of 72 devotions and "Start at the table". | **Keep** (the survivor) |
| 47 | `/family/tonight` and table mode | Tonight's Family Devotion | "Lead us through tonight, step by step." | File, device | Yes | 46 | Strong: six full-screen steps, Listen, "We did this tonight", a different second night. | **Keep** |
| 48 | `/family/catechism` | Family Catechism: 76 Questions and Answers | "Teach my kids the faith one question at a time." | File, device (the family's place) | Yes | None | Good: adult and child answers, verse, prayer, the family's own place. No out-loud practice yet. | **Keep** |
| 49 | `/family/reading-plans` | Family Bible Reading Plans | "Give us a reading for today." | File, device | Yes | 50, 11 | Good: four plans, "Start today", today's reading, a calendar reminder. | **Keep** |
| 50 | `/study/bible/guides/whole-story-2027` | Read the Bible in a Year: The 2027 Plan | "Take me through the whole Bible next year." | Device | Yes | 49 | Good: 365 days, place kept. Starts in 2027; nothing for an adult who wants to start today. | **Keep** |
| 51 | `/plans` and `/plans/:slug` | Eight-week plans for hard seasons | "Walk me through this season, a week at a time." | File, device | Yes | Care pages | Strong: 29 plans, place kept. | **Keep** |
| 52 | `/help` (the find box) | Find Help | "I am in trouble. Where do I go?" | File | Yes | 8, 38 | Good after the floor and cap were added. | **Keep** |
| 53 | `/search` and the header box | Search | "Find it on this site." | File; database for essays | Mostly (built-in index, tools and Bible words work; essay results need the database) | 54 | Good and improving. | **Keep** |
| 54 | `/theology/search` | Search the Doctrines, Creeds, and Glossary | Same job as 53, for one shelf. | File | Yes | 53 | A second search box a visitor has to know to look for. | **Merge** into `/search` (a "Doctrine" filter) |
| 55 | `/my-library` | My Library | "Show me what I saved and started." | Device | Yes | 56 | Good. Misses a half-done Whole-Life check and the Deep Bible and Devotion Builder stores; uses old tool names. | **Keep** (the survivor) |
| 56 | `/tools/saved` | Saved Items | Same job as 55, for verses and prayers. | Device | Yes | 55 | An older page that shows two saved lists in full and only counts the other two. | **Merge** into `/my-library` |
| 57 | `/dashboard` | (was "Your Formation") | | | | 55 | Already redirects to `/my-library`. The 911-line page file is still in the repo. | **Retire** (done) |
| 58 | `/tools/sermon-outline` | (was Sermon Outline Generator) | | | | | Already redirects to `/tools`. | **Retire** (done) |
| 59 | `/tools/pastor-burnout` | (was Pastor Burnout Diagnostic) | | | | | Already redirects to `/tools`. A worn-out pastor lands on a list of 36 tiles. | **Retire**; send to `/help/pastors` instead |
| 60 | `/tools/church-health` | (was Church Health Check) | | | | | Already redirects to `/tools`. | **Retire** (done) |
| 61 | `/tools/discipleship-table` | (was Start a Table) | | | | | Already redirects to `/tools`. | **Retire**; `/start` is the nearer answer |
| 62 | `/tools` | Free tools for Bible study, prayer, and family life | "Show me everything I can use." | Nothing | Yes | 37, `/resources` | 36 tiles in five groups with a find box. Long, and three of the tiles are reading pages. | **Rewrite** as one short page built from one list (see 5.4) |

Small helps that work and stay as they are, not counted above: Listen, Remind me (calendar), text size, copy and share, the verse sheet that opens a reference in place, "Mark as read" on a chapter.

## 3. The count

| Verdict | Count | Items |
|---|---|---|
| Keep | 37 | 1, 2, 5, 6, 7, 9, 11, 12, 15, 16, 17, 18, 22, 23, 26, 27, 31, 32, 34, 35, 36, 39 to 53 except 54, 55 |
| Merge | 13 | 3, 8, 10, 13, 14, 20, 21, 25, 30, 33, 37, 54, 56 |
| Rename | 2 | 24, 29 |
| Rewrite | 4 | 4, 19, 28, 62 |
| Retire | 6 | 38, 57, 58, 59, 60, 61 (four of them already redirect) |
| **Total** | **62** | |

## 4. The folds: which tools do the same job, and which one survives

Every fold keeps the old address working as a permanent redirect to the survivor. The tool addresses are on James's never-redirect list, so each fold below waits on his yes.

| The job | Does it today | Survivor | What moves in, and where old addresses go |
|---|---|---|---|
| **"What does the Bible say about X?"** | `/wisdom` (208 topics, BSB), `/tools/wisdom-finder` (same data, typed), `/tools/bible-on` (14, paraphrase), `/tools/verse-finder` (20, unchecked), `/tools/parenting-verses` (10, unchecked) | **`/wisdom`**, named "What the Bible says about..." | The finder's search box, saves and daily entry become the top of `/wisdom`. The ten notes to parents move in as parenting topics. Verse Finder's and Bible-On's topics are checked against the 208 and any gap is written in BSB. All four addresses redirect to `/wisdom` (a topic in the address opens that topic). |
| **"Help me study this passage or book"** | The Study Bible (66 books, every chapter), `/tools/deep-bible` (20 books, 37 passages), `/tools/bible-study` (12 books), `/theology/passage` (any reference, outside text) | **The Study Bible** (`/study/bible`) | Passage notes and genre guidance from the Passage tool show beside the chapter. The 12 "how to read this book" pieces go on the book pages. The 37 six-layer studies become "Go deeper" on their chapters after their scholar claims are checked. Deep Bible's private notes carry over into the new per-verse notes (section 6). `/theology/passage?ref=` redirects to the chapter and verse; the other two redirect to `/study/bible`. The outside fetch is removed. |
| **"Check my whole life"** | `/life/assessment` (30 statements, yearly, keeps a rule), `/tools/life-audit` (24 questions) | **`/life/assessment`**, named "Whole-Life Self-Check" | The Life Audit's 55 next-step links are mapped onto the five areas. Past Life Audit results stay readable in My Library. `/tools/life-audit` redirects. `/diagnostic` stays as the short one about God only. |
| **"A rule of life"** | `/tools/rule-of-life`, and the rule inside the Whole-Life check (stored apart) | **`/tools/rule-of-life`** | The Whole-Life results hand their suggested rule to the builder, so a person has one rule in one place. No address changes. |
| **"A devotion for tonight"** | `/family` chooser (72 devotions, BSB), `/tools/family-devotions` (40, KJV) | **The chooser on `/family`** | The builder's ages 3 to 6 material is the only writing for little ones on the site; it is listed for James to read and, if he approves, moved into the family library in BSB. `/tools/family-devotions` redirects to `/family`. |
| **"What does this word mean?"** | `/theology/glossary` (114 terms), `/tools/glossary` (100 terms) | **`/theology/glossary`** | Terms found only in the tools copy are moved across; the three depths (one line, a paragraph, why it matters) are worth keeping. `/tools/glossary` redirects. |
| **"Where do I start?"** | `/start` (the road), `/start/quiz`, the Home doors | **`/start`** | `/start/quiz` redirects to `/start`. "What is weighing on you" belongs to Find Help. |
| **"What have I saved?"** | `/my-library`, `/tools/saved`, (`/dashboard`, gone) | **`/my-library`** | Saved verses, prayers, quotes and topics show in full there. `/tools/saved` redirects. |
| **"Search the site"** | `/search`, `/theology/search` | **`/search`** | A "Doctrine" filter. `/theology/search` is on the never-redirect list: James's call. |
| **"All the self-checks"** | `/assessments`, the Self-checks group on `/tools` | **`/tools`** | `/assessments` redirects to `/tools#self-checks`. |

After the folds the tools page holds 22 things, in four groups a person would name:

- **Study** (6): Search the Bible; Misused Bible Verses; What the Bible says about...; Compare the views; Which view do I lean toward?; Memorize a verse.
- **Hard questions** (3): Test the Case; What shapes the way you read the Bible?; Do you hold both sides to the same standard?
- **Check yourself** (6): Where are you with God?; Whole-Life Self-Check; Marriage; Emotional health; Money; Spiritual gifts.
- **Pray and practise** (7): Prayers for when you have no words; Prayer list; Worry journal; A plan for when you feel alone; A weekly rhythm (rule of life); Proverbs in 31 days; Work through a fight in five steps.

Family tools (tonight's devotion, the catechism, reading plans, the parent and teen conversation, what your child needs at each age) are listed on `/family`, with one line on `/tools` pointing there. Quotes move to the essays and About side. The two politics reading pages stay reachable under `/nation`.

## 5. Renames, rebuilds and retirements

### 5.1 Rewrite: the Theology Quiz (item 4)

What is wrong: it needs the server to show ten questions that are typed into the server code; its results need the database; it measures taste, not knowledge; it sorts into retired section names; its recommended essays skip the shelf check; two pages describe it two different ways.

What to build in its place: **"Test what you know"**, a set of short quizzes that run from files with no server: one per church history lesson (the brief asks for "questions for each lesson"), one per doctrine study, and one on the story of the Bible. Right and wrong answers each explain themselves and link to the lesson. Place and past scores are kept on the device.

Until the new questions are written and James has read them, `/tools/theology-quiz` and `/quiz` should go to `/theology/which-view`, which is the nearest honest thing. The new questions are new writing and need his read.

### 5.2 Rewrite: Memorize Scripture (item 28)

Keep the four modes (read, first letters, fill the blank, recall). Change everything around them: draw every verse from the site's Berean Standard Bible files so the unchecked-text notice goes; let a reader add any verse from the Study Bible panel ("Learn this verse"); bring a verse back on a widening schedule (tomorrow, three days, a week, a month); include each week's family memory verse and the catechism verses; buttons at thumb size; one line in My Library.

### 5.3 Rewrite: Prayers for When You Have No Words (item 19)

Keep the job and the address. Replace the 36 stock prayers with three sources a reader can trust: psalms in the site's own Bible text, prayers of the church that are in the public domain (each with its source and date, checked), and a small number of prayers by James that he has read. Group by the hour and by the need. This is writing work and goes in the writing queue.

### 5.4 Rewrite: the tools page itself (item 62)

One list of tools in one file (`lib/` registry), read by the tools page, My Library, site search, the start pages and the self-check results, so a tool has one name everywhere. Each entry carries: name, the job in one sentence, how long it takes, what it keeps, and where it leads next. The page shows the four groups above, with a find box, on about four phone screens.

### 5.5 Renames

| Item | Name today | Proposed name |
|---|---|---|
| 24 `/tools/parenting-guide` | Parenting Stage Guide | What your child needs at each age |
| 29 `/tools/conflict-guide` | Conflict Resolution Guide | Work through a fight in five steps |
| 7 `/wisdom` (survivor of the fold) | Proverbs and Ecclesiastes: A Guide to Biblical Wisdom | What the Bible says about... |
| 6 `/life/assessment` | The Whole-Life Assessment | Whole-Life Self-Check (its search title already says so) |
| 31 `/tools/bible-says` | Two names: "Misused Bible Verses" and "Misread Bible Topics" | Misused Bible Verses: What They Actually Mean, in both places |
| 39 `/theology/which-view` | "Which View Am I?" on one page, "Which Christian View Do You Lean Toward?" on another | Which view do I lean toward? |

Only the first two are counted as "rename" verdicts; the rest are name fixes on tools that are kept.

### 5.6 Repairs to tools that are kept

1. **One Bible wording.** Replace unchecked verse text with the site's own in: Proverbs in 31 Days, the Conflict guide, Misused Bible Verses (shortened text), and whatever survives of the merged tools. Six tool pages carry the "not checked" notice today: Verse Finder, Scripture Memory, Proverbs in 31 Days, Parenting Verses, the Conflict guide and Deep Bible.
2. **Remember the place** in the four that still forget on a reload: the Parent and Teen Conversation, Which View, the Conflict guide, and Which Lens (kept for the tab only).
3. **Lead somewhere next.** These end with no link, or one: Misused Bible Verses, Scripture Memory, Parenting Verses, Which View, the Consistency check, the Parenting guide.
4. **My Library should know every tool:** a half-done Whole-Life check, Deep Bible notes (`lw-deep-bible`), a devotion series (`lw-family-devotions`), Test the Case progress (`lw-test-the-case`). Four tools use an older key prefix (`lw-`) that the library does not read.
5. **Em-dashes and forbidden words** in the tool copy: heaviest in Deep Bible (350), the tools glossary (269), Wisdom Finder (27), the prayers (27), Which Lens (23). Most of this goes away with the merges; the rest belongs to the writing pass.
6. **Delete the dead page files** once James agrees they are not coming back: `Dashboard.tsx`, `SermonOutline.tsx`, `PastorBurnout.tsx`, `ChurchHealth.tsx`, `DiscipleshipTable.tsx` (about 6,500 lines no visitor can reach).

## 6. Jobs a studying person needs that no tool does

In the order I would build them. The first seven are in the project brief; the rest came from reading the code.

| # | The job | What exists to build on | What is missing |
|---|---|---|---|
| G1 | **Keep a highlight and a note on a verse** | The verse panel; Deep Bible's private-notes code | Nothing in the Study Bible stores a highlight or a note. |
| G2 | **Read a second translation beside the first** | Links out to five translations on another site | No second text on the site. Needs a second public-domain text and James's choice of which. |
| G3 | **Say the catechism out loud** | 76 questions, the family's place, a Listen button | No practice mode: question on screen, answer hidden, "We know it" or "Again next week". |
| G4 | **Practise a memory verse and have it come back** | Tool 28 | See 5.2. |
| G5 | **A reading plan for an adult that starts today** | The 2027 plan, four family plans, Proverbs by date | No plan a single reader can start on any day (a Gospel in a month, the New Testament in 90 days, the Bible in a year from today). |
| G6 | **The 66 books at a glance** | `bible-books.json` (66 books, 8 genres), read marks | No one-screen map by genre and length that shows what you have read. |
| G7 | **"Who was alive when?" on a drawn line** | The year stepper already lists who was alive | No line to scale, no dragging, no row for America or for the Bible's own centuries. Dates are held as words and need start and end years. |
| G8 | **Check what I learned** | Six "which view" quizzes | No knowledge check after a history lesson, a doctrine or a book. See 5.1. |
| G9 | **Share a verse or a quotation as a picture** | 400 quotes; copy and share as text | No image-making code anywhere in the site. |
| G10 | **Ask a hard question and get one best answer** | Find box on `/answers`; `/topics`; the Home Find field | The 35 answers, 112 theology questions, 9 cases, 31 debates and 208 wisdom topics are still searched in separate places. One box should search them together and return one answer with "argue it", "see the views" and "the long version". |
| G11 | **Follow one word through the Bible** | The word panel lists every use of a Hebrew or Greek word | No page for a word of its own, and no way to search by the original word. |
| G12 | **Lead a group through a study** | 68 study guides, group guides for essays | No leader's view: time per section, which questions to cut, a page to print for the group. |
| G13 | **See a place on a map** | Nothing; no coordinates in the data | Set aside in October as James's call. |

Two smaller ones: a way to **carry what I saved to another device** (a file to save and open, since there is no login), and a **glossary word that opens in place** when it appears in an essay or a doctrine page, the way a verse reference already does.

## 7. What only James can decide

1. **Each fold in section 4.** Every tool address is on his never-redirect list. A yes or no per row.
2. **One Bible wording for the tools.** The family side and the Study Bible use the Berean Standard Bible. The tools mix the King James, wording that reads as NIV, the site's own paraphrase, and the World English Bible from an outside service. Does everything move to the Berean Standard Bible?
3. **The builder's devotions for ages 3 to 6.** They are the only material for little ones. Read them and say whether they move into the family library, in which wording.
4. **The Theology Quiz.** Replace it with knowledge checks after lessons (new questions for him to read), or simply retire it to "Which view do I lean toward?"
5. **The two politics pages on the tools page** (the party scorecard, a biblical government). Stay listed as tools, or stay reachable only under `/nation`?
6. **The pastors' tools.** They redirect today. May the page files be deleted, and should the burnout address go to `/help/pastors`?
7. **The prayers.** Which prayers of his own he wants on the page, and whether historic prayers of the church may stand beside them.
8. **A second translation in a column** (G2): which one.
9. **Maps** (G13): yes or no.
10. **Picture cards** (G9): may they carry his name and the site address, and in what wording.
11. **The six-layer studies in Deep Bible** name scholars and commentaries. Keep them only after each is checked, or drop the "scholarly views" layer?
12. **`/theology/search` and `/justice/timeline`** are on the never-redirect list. Fold the first into the site search? Show the second as a row on the main timeline?

## 8. What I did not check

- Nothing was opened in a browser. Tap sizes, layout on a phone, and whether each tool reopens exactly where it stopped are from the audit or the code, not from use.
- The live site and the database were not touched, so the Theology Quiz's real results and the essay links it produces were read from code only.
- The NIV reading of Verse Finder and Scripture Memory is from recognising the wording, not a word-for-word comparison.
- I did not check each of the 208 wisdom topics against the 44 topics in the three tools proposed to fold into it; that check is part of the fold.
- The scholar and book names in Deep Bible and the tools glossary were not verified.
- The Study Bible reader, the family devotions and the church history course are inventoried by other units; they appear here only where a tool overlaps them.
