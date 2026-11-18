# Titles audit: are the titles in plain, everyday language?

Auditor lens: "titles-content". Date: 2026-11-17. For James Bell.

## The short version

I read every title a visitor can reach today, and every title that is about to go public, and asked three questions of each one. Is it the phrase a normal person would type into a search box or say out loud? Does it promise what the piece delivers? Would a parent or a new Christian understand it without a seminary word?

The site is in better shape on this than I expected. Most of the practical library already speaks the reader's language: the Find Help pages ("I can't stop worrying"), the Honest Answers ("Did the resurrection actually happen?"), the how-to guides, the everyday-life questions and the context guides are close to a model of how to do it. The 20 essays waiting in PR #541 and on the land-next branch were all retitled as plain questions, and that work is good.

The weak spots are the places a first-time visitor meets first:

1. **The essay shelf that is live today.** 8 of the 20 public essays carry literary titles ("Blind Spots", "The Monster Is Never the One in the Mirror", "When the Church Had Nothing to Lose"). Two essays have titles one word apart.
2. **Church history.** 15 of the 22 era titles use historians' labels ("The Constantinian Turn", "The Attractional Era", "The Long Middle"), and two overlapping series cover the same ground under different names.
3. **Three broken titles are showing on the live site right now** ("Reformation Actually About", "Church Megaproject Widow Mite", "Psalm 82 Unjust Systems").
4. **Study guides without a subject word** (8 of 68: "How the Story Ends", "Where Your Treasure Is"), and three titled "An 8-Week Study" whose own subtitle says "five-session study".
5. **The tools.** Thirteen of 36 have names that do not say what the tool does, and several pairs cannot be told apart ("Bible Study Guide" and "Deep Bible Study Companion"; "Life Audit" and "The Whole-Life Assessment").

A rule for every future title is at the end. The counts are in the scoreboard just below; the full tables follow the findings.

How I worked: titles were read from the code and data on each branch (the catalogue at `client/public/catalogue/index.json`, which lists 951 items; `client/src/lib/shelf.json`; `client/public/essays/*.json`; `client/src/data/answers.ts`; `client/src/pages/ToolsHub.tsx`; the family, history, topics and Bible-guide data), and the main index pages were opened in a real browser at 1440 and 390 wide on the live build (port 4311) and the PR #540 build (port 4312). Screenshots are in `docs/work/audit-2026-11/shots/titles-content/`. The local builds have no database, so the 15 older essays show "This essay didn't load." on their own pages; their titles are taken from `shelf.json` and the catalogue, which is what the live site prints on the Essays page. Judging a title is a judgment call. Where I was unsure I passed the title and said so.

## Scoreboard

| Group | Titles | Pass | Fix |
|---|---|---|---|
| Essays public today (live site) | 20 | 12 | 8 |
| Essays in PR #541 (ten Doubt essays) | 10 | 10 | 0 |
| Essays on the land-next branch (ten more) | 10 | 9 | 1 |
| Essays waiting for a rewrite (planned titles) | 25 | 21 | 4 |
| Essay section names | 8 | 4 | 4 |
| Honest Answers (/answers) | 35 | 33 | 2 |
| Topic questions on /topics | 17 | 14 | 3 |
| Study guides (/studyguides) | 68 | 52 | 16 |
| Context guides (/resources/context) | 41 | 38 | 3 |
| Creeds (/resources/creeds) | 14 | 13 | 1 |
| Church history era essays (/theology/history) | 22 | 7 | 15 |
| Timeline entries (/justice/timeline) | 45 | 43 | 2 |
| Bible reading plans (/plans) | 5 | 5 | 0 |
| Family reading plans (/family/reading-plans) | 4 | 2 | 2 |
| Eight-week plans (/plans/<slug>) | 29 | 19 | 10 |
| Weekly family devotions | 72 | 72 | 0 |
| Seasonal family devotions | 40 | 40 | 0 |
| Family catechism questions | 76 | 71 | 5 |
| Tools registry (/tools) | 36 | 23 | 13 |
| The three books | 3 | 3 | 0 |
| Booklets ("The Hard Issues" series) | 10 | 8 | 2 |
| Download headings, worksheets, workbooks | 23 | 23 | 0 |
| Find Help pages (/help) | 40 | 40 | 0 |
| Guides to reading the Bible (/study/bible/guides) | 24 | 23 | 1 |
| Doctrine pages (/theology/doctrine/<slug>) | 31 | 27 | 4 |
| Everyday-life questions (/life/<slug>) | 69 | 69 | 0 |
| How-to guides (/how-tos/<slug>) | 132 | 128 | 4 |
| What the Bible says about (/wisdom/<slug>) | 208 | 208 | 0 |
| Group discussion guides (/group-guide/<slug>) | 90 | 80 | 10 |
| Reading pathways (/pathways/<slug>) | 13 | 9 | 4 |
| Justice topics (/justice/topic/<slug>) | 10 | 1 | 9 |
| Church and power topics (/disruption/topic/<slug>) | 12 | 6 | 6 |
| Faith and nation pages (/nation/<slug>) | 11 | 10 | 1 |
| **All titles scored** | **1253** | **1123** | **130** |

That is 90 percent passing overall. The number flatters the front of the house: the large practical libraries pull it up, while the essays public today pass at 60 percent and the church history titles at 32 percent.


## What is already strong

- **Find Help speaks the way people speak.** All 40 pages are titled with the sentence a person would say: "I can't stop worrying", "The church hurt me", "How do I be a dad when I never had one?" (http://localhost:4311/help, `client/public/needs/*.json`).
- **The Honest Answers are real questions.** 33 of 35 are exactly what a person types: "Did the resurrection actually happen?", "Can you lose your salvation?", "Is it okay to be angry at God?" (`client/src/data/answers.ts`).
- **The context guides were retitled as questions and it shows.** "What Does Jeremiah 29:11 Really Mean?", "Is 2 Chronicles 7:14 a Promise to America?", "Does Romans 8:28 Mean Everything Happens for a Reason?" are the phrases people search. 38 of 41 pass.
- **The everyday-life pages and how-to guides** (69 and 132 titles) are almost all plain: "How Do You Forgive Someone Who Really Hurt You?", "How to Pray With Your Kids at Bedtime".
- **The 20 unmerged essays are well titled.** 19 of 20 pass. The writers replaced "Excavation, Not Demolition" with "Deconstructing Your Faith: What to Tear Down and What to Keep", "The Rise of the Nones" with "Why Are People Leaving the Church?", and "The Persecution We Invented" with "Is the American Church Really Being Persecuted?". That is the right instinct and the rule at the end of this report is drawn from it.
- **The family catechism** asks its questions in a child's words ("Who made you?", "Did Jesus stay dead?").
- **The study-guide pattern** "Anxiety: A Bible Study on Worry and the Peace of Christ" puts the searched word first and says what the thing is. 52 of 68 follow it.
- **The book labels** ("For skeptics", "Politics and the church", "Reading the Bible honestly") give each literary book title a plain handle.

## Findings, in order of how much they matter to a visitor

### 1. Eight of the 20 essays public today have literary titles, and they are the first thing a new reader is handed

- **Where:** https://www.livewellbyjamesbell.co/writing (local: http://localhost:4311/writing; screenshot `live-writing-full.png`). Titles come from `client/src/lib/shelf.json` and, for the 15 older essays, from the database.
- **What a visitor sees:** Under "Start with these": "Every Generation Was Sure It Was Right", "When the Church Married Empire". Further down: "The Monster Is Never the One in the Mirror", "Blind Spots", "When Fear Becomes Theology" and, in the next section, "When Fear Rewrites Theology"; "When the Church Had Nothing to Lose"; "How the Bible Gets Translated by the Room You're In".
- **Why it fails the goal:** These read well to someone who already follows James. Each essay but one does carry a plain line under its title on /writing, which helps. But the title is what shows alone in a search result, a shared link and the browser tab, and from the title alone a parent or a new Christian cannot tell what any of these is about. None is a phrase a person would type into a search box (my judgment; no search data was available). The two "When Fear ..." titles differ by one word. "The Monster Is Never the One in the Mirror" is nearly the title of the book, so the essay and the book blur. The essays beside them that are plain ("Was America Founded as a Christian Nation?", "Why Didn't the Bible Just Ban Slavery?") show the difference at a glance.
- **Fix:** Retitle the eight with the exact titles in the essay table below. Keep the literary line as the first sentence of the blurb if James wants to keep it; the title does the finding, the blurb does the voice. Keep each web address as it is so shared links do not break.
- **Size:** S for "When the Church Had Nothing to Lose", the one of the eight whose text is a file (`client/public/essays/the-early-church-under-rome.json`); M for the other seven. The Essays page prints the title from `shelf.json` (checked: the list shows them with no database), but each essay's own page prints the title stored in the database, so James or a script must change it there as well.
- **Status:** LIVE-PROBLEM. STILL-OPEN-AFTER-PENDING: neither PR #540, PR #541 nor land-next touches these eight titles.

### 2. Church history is titled for historians, and two series tell the same story under different names

- **Where:** https://www.livewellbyjamesbell.co/theology/history (local: http://localhost:4311/theology/history; screenshot `live-history-full.png`). Data: `client/public/history/essays-index.json`.
- **What a visitor sees:** Under "The era essays": "The Apostolic and Sub-Apostolic Age", "The Desert and the Rule", "The Constantinian Turn", "The Fathers at Work", "The Long Middle", "The Attractional Era", "After Christendom". The list runs from AD 30 to today in 14 essays, then starts over at AD 30 and runs to today again in 8 more ("The Apostolic and Persecuted Church", "Councils and Creeds", "The Reformation and Its Wars").
- **Why it fails the goal:** James wants ordinary people to study church history here. "Sub-Apostolic", "Constantinian" and "Attractional" are words a reader learns in the course, so they cannot be the door to it. To be fair, every card prints an era label, the dates and a plain two-sentence summary ("THE AGE OF THE COUNCILS · AD 312-430 ... A cross in the sky in 312, and the church woke up favored"), so a patient reader is not lost; the title is still the part that shows alone in search results and links. A reader who sees "The Reformation" and "The Reformation and Its Wars" in one list cannot know which to read. Only 7 of 22 titles pass.
- **Fix:** Retitle the 15 as given in the church history table (for example "When Rome Became Christian: Constantine and What It Cost", "The Megachurch Years, 1950 to 2010"). Show the two series as two labeled lists, "The long course (14 essays)" and "The short course (8 essays)", until the planned course replaces them.
- **Size:** S for the titles (one JSON file plus its index rebuild); M for the two labeled lists.
- **Status:** LIVE-PROBLEM. STILL-OPEN-AFTER-PENDING. The master plan (`docs/work/plan/MASTER-PLAN.md`, the church history course, unit U31) already plans to merge the two series into one reading list, but that is not built, and its own working Part titles repeat the problem: "How to Read the Dead", "The Long Middle", "The American Experiment", "After Christendom". Decide the plain titles before those sessions are written.

### 3. Three broken titles are on the live site today

- **Where:** https://www.livewellbyjamesbell.co/writing/reformation-actually-about, /writing/church-megaproject-widow-mite and /writing/psalm-82-unjust-systems (local: http://localhost:4311/writing/reformation-actually-about; screenshot `live-essay-pending-notice-d.png`). File: `client/src/lib/shelf.json`.
- **What a visitor sees:** A large heading, "Reformation Actually About", over the line "James is revising this essay. It is off the site until the new version is ready." The browser tab reads the same. The other two pages are headed "Church Megaproject Widow Mite" and "Psalm 82 Unjust Systems".
- **Why it fails the goal:** These look like a machine made them from the web address. Anyone who follows an old link, from Facebook, Substack or a search result, meets a title that is not English on a site that asks to be trusted for its care with words.
- **Fix:** In `shelf.json` set the three titles to the ones the writers already chose (in `docs/work/NOTES.md`): "What Was the Reformation Actually About?", "What Does the Widow's Mite Really Mean?", "What Psalm 82 Says About Unjust Systems". While there, bring the other waiting shelf titles in line with the chosen ones (the table "Shelf essays still waiting for a rewrite" lists all of them).
- **Size:** S.
- **Status:** LIVE-PROBLEM. STILL-OPEN-AFTER-PENDING (the same three titles are in `shelf.json` on PR #540, PR #541 and land-next).

### 4. Sixteen study guides either hide their subject or promise the wrong length

- **Where:** https://www.livewellbyjamesbell.co/studyguides (local: http://localhost:4311/studyguides). Files: `client/public/studyguides/*.json`.
- **What a visitor sees:** In an alphabetical list where most cards begin with the subject ("Anxiety: A Bible Study on ..."), these do not: "How the Story Ends", "What Manhood Is For", "When Faith Has Questions", "When It All Comes Apart", "When It Does Not Make Sense", "Where Your Treasure Is", "Why We Still Need Each Other". One leads with Hebrew: "Mishpat: A Bible Study on Biblical Justice". Three say "An 8-Week Study" ("Christian Nationalism", "Church and Empire", "Economic Justice"); each file holds five sessions, each one's own subtitle says "five-session study", and every card on the page, these three included, carries the same line: "5 sessions (run as 5, 8, or 4 weeks)".
- **Why it fails the goal:** A small-group leader scanning for the money study or the end-times study will pass over "Where Your Treasure Is" and "How the Story Ends". The site's own search does find them by subject (typing "end times" returns "How the Story Ends" third), so the loss is in scanning the list, in Google results and in shared links, where the title stands alone (the page title built for search engines is just "How the Story Ends | LiveWell by James Bell"). The "8-Week" label is not false, since all 68 guides can be run as eight weeks, but it is inconsistent: three titles advertise a length that the other 65 leave to the card, and the title contradicts its own subtitle.
- **Fix:** Put the subject word first on all of them, using the exact titles in the study-guide table ("Money: A Bible Study on Where Your Treasure Is"). Change "An 8-Week Study" to "A Five-Session Bible Study" so the three match the rest; the card already says how to stretch five sessions to eight weeks.
- **Size:** S (titles in JSON, then rebuild the study-guide index, the catalogue and the PDFs).
- **Status:** LIVE-PROBLEM. STILL-OPEN-AFTER-PENDING. The "8-Week" titles on five-session guides were noted in the master plan (search "8-Week Study" in `MASTER-PLAN.md`) and are unchanged today.

### 5. Thirteen of 36 tools have names that do not say what the tool does

- **Where:** https://www.livewellbyjamesbell.co/tools (local: http://localhost:4311/tools). File: `client/src/pages/ToolsHub.tsx`.
- **What a visitor sees:** "Test the Case", "Which Lens Has You?", "The Consistency Check", "The Connection Planner", "What the Bible Says About" (the sentence stops there), "Prayer Generator", "Scripture Memory System". And pairs that cannot be told apart: "Bible Study Guide" beside "Deep Bible Study Companion" beside "Passage Context Tool" beside "Reading Scripture in Context"; "Life Audit" beside "The Whole-Life Assessment"; "Wisdom Finder" beside "Wisdom for All of Life" beside "Bible Verse Finder".
- **Why it fails the goal:** James asked for a site that is more interactive. The tools are the interactive part, and a visitor chooses one by its name alone. "Which Lens Has You?" and "The Consistency Check" are two of the most original things on the site and their names hide them. "Generator" and "System" sound like software, which is the wrong note beside a prayer.
- **Fix:** Rename the thirteen as in the tools table ("What Shapes the Way You Read the Bible? A Self-Check", "A Plan for When You Feel Alone", "Prayers for When You Have No Words"). Where two tools do the same job, keep one.
- **Size:** S for the names; M if tools are merged.
- **Status:** LIVE-PROBLEM. STILL-OPEN-AFTER-PENDING. The design critique of 2026-10-27 asked for "one naming scheme" on /tools; that has not been done.

### 6. "Christendom" and "Empire" are used as if every reader knows them, and "After Christendom" names four different things

- **Where:** "After Christendom" is an essay section on /writing (`shelf.json`), a study guide (/studyguides/after-christendom), a church history essay (/theology/history/after-christendom-era) and, in PR #540, part of a topic address (/topics/living-after-christendom). "Empire" is in "When the Church Married Empire" (/writing), "Church and Empire: An 8-Week Study", "The Danger of Empire" (/nation/empire) and "When the Church Married the Power" (/disruption/topic/church-and-empire).
- **What a visitor sees:** On the Essays page, the section heading "After Christendom". The home page headline says "post-Christian America", which is the plainer phrase.
- **Why it fails the goal:** "Christendom" is a scholar's word for the centuries when church and state were joined. The site's own promise is in plainer words, and the titles should match the promise. One name on four different things also means a reader who was told "read After Christendom" cannot find which one was meant.
- **Fix:** Use "post-Christian America" or "after Christian America" in titles, and let the essays teach the word "Christendom" inside. Rename the section "After Christian America", the era essay "The Church After Christian America, 2010 to Today", and keep "After Christendom" only for the study guide, with its plain subtitle. Use "political power" where a title says "Empire".
- **Size:** S.
- **Status:** LIVE-PROBLEM for the section, the study guide and the era essay. The topic page in PR #540 has a plain title ("What does it mean that America is post-Christian, and how do we live in it?"), so its title is FIXED-IN-PENDING (PR #540); only its address carries the word.

### 7. The 20 new essays have plain titles on addresses that still carry the old literary names

- **Where:** PR #541 and the land-next branch, `client/public/essays/*.json` and `client/src/lib/shelf.json`.
- **What a visitor will see:** The page headed "Deconstructing Your Faith: What to Tear Down and What to Keep" at the address /writing/excavation-not-demolition. "Is the American Church Really Being Persecuted?" at /writing/the-persecution-we-invented. "Why Are People Leaving the Church?" at /writing/the-rise-of-the-nones. "Was Jesus Real? What Historians Actually Know" at /writing/the-historical-jesus. On the live site already: "Why a Frightened Church Wants a King" at /writing/strongman-theology.
- **Why it fails the goal:** The address is read too: it shows in search results, in the bar of the browser, and in every link pasted into Facebook. "the-persecution-we-invented" also gives away a verdict before the reader has opened the essay, on exactly the kind of piece where James wants a skeptical or wary reader to feel met first. Five older live addresses are cut off mid-phrase ("every-generation-was-sure-it-was", "the-monster-is-never-the-one-in-the", "how-the-bible-gets-translated-by", "how-american-individualism-distorts", "how-christian-nationalism-rewrites").
- **Fix:** For the essays that are not public yet, change the address before they go live, while it costs nothing: /writing/deconstructing-your-faith, /writing/is-the-american-church-being-persecuted, /writing/why-are-people-leaving-the-church, /writing/was-jesus-real, and add one redirect line each from the old address. Leave addresses that are already public and shared alone; a working plain-enough link is worth more than a tidy one.
- **Size:** S each (a file rename, a `shelf.json` line and a redirect in `vercel.json`), M for the set with its tests.
- **Status:** STILL-OPEN-AFTER-PENDING (the titles are fixed in PR #541 and land-next; the addresses are not).

### 8. Many plain titles sit on seminary-word or riddle addresses

- **Where:** Context guides (`client/public/context/guides-index.json`) and doctrine pages (`client/public/theology/*.json`).
- **What a visitor sees:** "Does the Kingdom of God Belong to a Political Party?" at /resources/context/the-kingdom-is-not-a-platform. "Does Your Politics Decide How You Read the Bible?" at /resources/context/left-lens-right-lens. "Is 'You' in the New Testament Singular or Plural?" at /resources/context/collectivist-world-individualist-readers. "What Does the Bible Say About Wealth and the Poor?" at /resources/context/money-texts-we-explain-away. "How Are We Saved?" at /theology/doctrine/soteriology. "Does God Suffer?" at /theology/doctrine/impassibility. "Does God Change His Mind?" at /theology/doctrine/divine-foreknowledge.
- **Why it fails the goal:** Someone retitled these pages well and left the addresses behind. It is a smaller problem than a bad title, because the title is what people read first. It still tells a search engine and a careful reader two different things.
- **Fix:** Do not rename these now; they are live and linked. Adopt the rule for everything new: the address is the title in lower case with the small words dropped. If a later cleanup renames them, each needs a permanent redirect.
- **Size:** L to rename all with redirects; nothing to adopt the rule.
- **Status:** LIVE-PROBLEM (minor). STILL-OPEN-AFTER-PENDING.

### 9. Family devotion titles are capitalized on every word, one question has no question mark, and the catechism asks five questions twice

- **Where:** https://www.livewellbyjamesbell.co/family/devotions and /family/catechism (local: http://localhost:4311/family/devotions; PR #540 at http://localhost:4312/family/devotions, screenshot `pending-family-devotions-m.png`). Files: `client/public/family-devotions.json`, `family-devotions-2.json`, `family-catechism.json`.
- **What a visitor sees:** "The Towel And The Basin", "What To Do With The Fire", "Can We Trust This Book", with the theme line "IS THE BIBLE TRUE". The Advent and Holy Week devotions on the same page are set normally: "Thanks in the Middle of It", "A Branch from a Stump". In the catechism, "What is baptism?" is question 47 and again question 61, with two different answers; the same is true of four more questions.
- **Why it fails the goal:** The word-picture titles are right for children, and each one is printed with a plain theme, so a parent can still find "anger" or "forgiveness". The capital on every "And" and "The" reads as a typing default beside the careful seasonal set, and a parent leading the catechism will not know which "What is baptism?" answer to teach.
- **Fix:** Set the 72 weekly titles in the same style as the seasonal ones and add the question mark ("Can We Trust This Book?"). In the catechism, reword the second of each pair so it asks the next thing (for example question 61: "What does baptism show us?"), or merge the pairs.
- **Size:** S for the capitals; M for the catechism, because the answers must be reread and James should approve doctrine wording.
- **Status:** LIVE-PROBLEM. STILL-OPEN-AFTER-PENDING. PR #540 improves how devotions are found (grouped under "Who God is", "The big story", "Hard days and big feelings") but keeps the capitals; the design critique of 2026-10-27 already asked for "sentence-case titles".

### 10. Ten eight-week plans are named for a feeling, not for the need

- **Where:** https://www.livewellbyjamesbell.co/plans/forgiveness, /plans/empty, /plans/infertility and seven more (files: `client/public/plans/*.json`).
- **What a visitor sees:** "Eight Weeks Toward Setting Down the Debt" (the forgiveness plan, which reads like a money plan), "Eight Weeks of Small Mercies", "Eight Weeks in the Waiting", "Eight Weeks of Reading Like an Adult", "Eight Weeks Out of Hiding".
- **Why it fails the goal:** On the /plans index these sit under the reader's own sentence, which is right. On the plan's own page, in a search result and on the printed booklet, the title stands alone, and it does not say what the plan is for.
- **Fix:** Use "Eight Weeks for ..." or "Eight Weeks Toward ..." plus the plain need, as in the plans table ("Eight Weeks Toward Forgiving Someone").
- **Size:** S (then rebuild the plan PDFs).
- **Status:** LIVE-PROBLEM. STILL-OPEN-AFTER-PENDING.

### 11. Older sections still reachable carry the old poetic titles

- **Where:** /justice/topic/* (9 of 10 fail: "The Poor at the Gate", "The Groaning Creation", "The Sin We Build Together"), /disruption/topic/* (6 of 12 fail: "Moralistic Therapeutic Deism", "The Platform and the Pedestal"), /pathways/* (4 of 13: "Faith and the Cause", "Faith and the Flag"), and ten group guides that keep retired essay titles ("The Rise of the Nones", "The Anabaptist Option").
- **What a visitor sees:** These pages are out of the main menu but are linked from church history and from search. Their titles read like chapter names in a book.
- **Why it fails the goal:** They are the old site's voice. A reader who arrives from the plain new pages feels the change.
- **Fix:** Add the plain subject before the poetic phrase ("The Poor: What the Bible Says" or the exact titles in the tables). Rename a group guide whenever its essay is renamed.
- **Size:** M.
- **Status:** LIVE-PROBLEM (lower priority). STILL-OPEN-AFTER-PENDING.

### 12. Small things

- **Two rows on the new Topics page (PR #540).** "Why are Sunday mornings still divided, and what did the church do about slavery?" asks two things and opens the essay "Why Didn't the Bible Just Ban Slavery?", which is a third question (the row's own line under it says "Why the Bible never bans slavery outright, and how the Christians who defended it explained away the texts"). "Money and work" is the only row that is a label. File: `scripts/data/topics-rows.json`. Fix: "Why didn't the Bible just ban slavery?" (the title of the page it opens) and "I'm worried about money and work". Size S. Status: pending in PR #540, worth fixing before it merges.
- **One essay has no line under its title.** "The Bible Assumes You Will Be Wrong" has an empty blurb in `shelf.json`, so on /writing it is the only essay with nothing beneath it. Fix: one sentence saying what the essay shows. Size S. LIVE-PROBLEM.
- **Two Honest Answers.** "What did the New Atheists get right?" and "What do Christianity and Islam actually dispute?" Suggested: "What do atheists get right about the church?" (only if the answer's content supports the wider wording) and "How are Christianity and Islam different?". Size S. LIVE-PROBLEM.
- **"The Hard Issues" booklets** are all about elders, deacons and church government. Suggested series name: "Church Leadership Booklets". Size S. LIVE-PROBLEM.
- **"Foundations"** will label two different things once PR #540 merges. Today the live devotions page has the chip "Weekly · 72" and "Foundations" names only a family reading plan. PR #540 renames the chip to "Foundations · 72" (seen at http://localhost:4312/family/devotions), so the same word then names the 72 weekly devotions and a 21-day reading plan. Fix: keep "Weekly · 72" in PR #540, or rename the reading plan as in the family reading plans table. Size S. Not a live problem; INTRODUCED-IN-PENDING (PR #540), worth fixing before it merges.
- **Page headings that do not name the page.** /resources/creeds is headed "A church without memory repeats old errors"; /studyguides is headed "Teach the hard things well"; /justice/timeline is headed "No one's hands are clean." The browser titles are plain, so search is not hurt, but a reader who lands on the page sees a saying where the name of the page should be. Suggested: put the plain name in the heading and the saying in the line under it. Size S. LIVE-PROBLEM.


### 13. The title of the home page, the one Google and Facebook show, is an old tagline that names none of what the site offers (added in verification)

- **Where:** https://www.livewellbyjamesbell.co/ as it appears in a search result, a browser tab before the page finishes loading, and the card Facebook builds when the link is shared. Files: `client/index.html` (line 7) and `scripts/prerender-heads.mjs` (the `STATIC_PAGES` entry for the home page), which also sets the share-card title.
- **What a visitor sees:** "LiveWell by James Bell — Theology That Carries the Weight of Everyday Life". The headline on the page itself says "Learning to follow Jesus — and live well — in post-Christian America." Two more hand-set titles in the same file no longer match their pages: /tools is sent to search engines as "Tools for Pastors and Readers" while the page calls itself "Free Christian Tools for Families", and /books is "Books — by James Bell".
- **Why it fails the goal:** This is the most-seen title on the site and the one a Facebook or Substack follower meets first. It does not say Bible study, church history, hard questions or family devotions, and "theology" is the word most likely to send a parent away. The description under it is already good ("A Study Bible with notes on every chapter, the church's long history, essays, and books by James Bell").
- **Fix:** Set both places to one plain line James approves, for example "LiveWell by James Bell: Follow Jesus and Live Well in Post-Christian America", and bring the /tools and /books entries in line with their pages.
- **Size:** S.
- **Status:** LIVE-PROBLEM. STILL-OPEN-AFTER-PENDING (the same line is in both files on the PR #540 branch).

### 14. The same question titles two or three different pages, and the new essays add more (added in verification)

- **Where:** The site catalogue, `client/public/catalogue/index.json` (live), compared with the essay files on PR #541 and land-next.
- **What a visitor sees:** 18 titles on the live site each name more than one page. "Why Didn't the Bible Just Ban Slavery?" is an essay, an Honest Answer and a group guide. "Was America Founded as a Christian Nation?" is an essay and a page at /nation/christian-nation. "Is Faith Just Wishful Thinking?" is an Honest Answer, a group guide and a Test the Case walk-through. "Caring for Aging Parents" is two different pages in one list (/wisdom/caregiving and /wisdom/caring-for-aging-parents). Of the essays waiting to go public, "Can You Be Good Without God?", "Did the Resurrection Actually Happen?", "Did God Command Genocide?", "Why Does God Allow Suffering?" and "Can You Trust the Bible?" each repeat the title of an Honest Answer or a group guide that is already live.
- **Why it fails the goal:** A short answer that leads to a long essay on the same question is a good design, and the question is the right title for both. The trouble comes wherever titles are listed together without their kind: the catalogue, a search engine, and the new Topics page will show the same words twice, and the reader cannot tell the two-minute answer from the twenty-minute essay. This is the report's own fifth check ("say it once on the site"), and the 10-of-10 score for the PR #541 titles did not apply it. The site's own search already prints the kind above each result ("STUDY GUIDES", "FIND HELP"), which is the right habit.
- **Fix:** Keep the questions. Make the kind travel with the title wherever two could meet: title the 13 group guides that share a title "Discussion Guide: ..." in their data, let the page title of an essay differ from its short answer by a few words where it can ("Did the Resurrection Actually Happen? The Evidence, Weighed"), and merge or rename one of the two "Caring for Aging Parents" pages.
- **Size:** S for the group guides and the duplicate wisdom page; M to settle the essay and answer pairs with James.
- **Status:** LIVE-PROBLEM (18 groups today). GROWS-IN-PENDING: PR #541 and land-next add five more pairs.


---

## The full inventory

Every table uses the same columns. "Pass" means I would leave the title alone. "Fix" means I would change it, and the last column gives the exact words.


## Essays


### Essays public today (live site): 12 of 20 pass

Source: `client/src/lib/shelf.json` and `client/public/essays/` on origin/main. Seen at http://localhost:4311/writing (screenshot `live-writing-full.png`).

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Every Generation Was Sure It Was Right | /writing/every-generation-was-sure-it-was | Fix | A good line, but it is a statement, not what a reader asks. It is the first essay a new visitor is sent to. | Why Do Sincere Christians Keep Getting the Bible Wrong? |
| The Monster Is Never the One in the Mirror | /writing/the-monster-is-never-the-one-in-the | Fix | Literary. Almost the same words as the book title, so a reader cannot tell the essay from the book. | How Do Good People End Up Defending Evil? |
| Blind Spots | /writing/blind-spots | Fix | Two words. Nobody searches it and it does not say whose blind spots or why it matters. | Why Churches Cannot See Their Own Blind Spots |
| The Conservative Blind Spot | /writing/the-conservative-blind-spot | Pass |  |  |
| The Progressive Blind Spot | /writing/the-progressive-blind-spot | Pass |  |  |
| When Fear Becomes Theology | /writing/when-fear-becomes-theology | Fix | One word different from "When Fear Rewrites Theology", two sections away. A reader cannot tell them apart. | What Fear Does to the Way Christians Think |
| When Patriotism Becomes a Gospel | /writing/when-patriotism-becomes-a-gospel | Pass |  |  |
| How Christian Nationalism Rewrites Doctrine | /writing/how-christian-nationalism-rewrites | Pass |  |  |
| When Fear Rewrites Theology | /writing/when-fear-rewrites-theology | Fix | One word different from "When Fear Becomes Theology". | How Sincere Christians Came to Defend What They Once Condemned |
| Why a Frightened Church Wants a King | /writing/strongman-theology | Pass |  |  |
| What Christian Nationalism Is, and What It Is Not | /writing/what-christian-nationalism-is-and-is-not | Pass |  |  |
| Was America Founded as a Christian Nation? | /writing/was-america-founded-as-a-christian-nation | Pass |  |  |
| When the Church Married Empire | /writing/when-the-church-married-empire | Fix | A picture, not a subject. "Empire" is an insider word for political power. | How the Church First Tied Itself to Political Power |
| What "Post-Christian" Actually Means | /writing/what-post-christian-means | Pass |  |  |
| When the Church Had Nothing to Lose | /writing/the-early-church-under-rome | Fix | Literary. The web address already says it plainly; the title does not. | How the Early Church Lived Under Roman Persecution |
| Women in Church History: The Voices They Silenced | /writing/women-in-church-history | Pass |  |  |
| How the Bible Gets Translated by the Room You’re In | /writing/how-the-bible-gets-translated-by | Fix | A clever image, but the essay is about how the community a reader belongs to shapes what they see in the Bible, and the word "translated" will draw readers looking for help choosing a Bible translation. | Why Do Christians Read the Same Bible So Differently? |
| How American Individualism Distorts the Bible | /writing/how-american-individualism-distorts | Pass |  |  |
| The Bible Assumes You Will Be Wrong | /writing/the-bible-assumes-you-will-be-wrong | Pass |  |  |
| Why Didn't the Bible Just Ban Slavery? | /writing/why-didnt-the-bible-ban-slavery | Pass |  |  |

### Essays in PR #541 (ten Doubt essays): 10 of 10 pass

Source: `/home/user/livewell-essays/client/public/essays/`. Status of every row: pending, not yet live.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Deconstructing Your Faith: What to Tear Down and What to Keep | /writing/excavation-not-demolition | Pass |  |  |
| Can You Trust the Bible? | /writing/why-trust-the-bible | Pass |  |  |
| Was Jesus Real? What Historians Actually Know | /writing/the-historical-jesus | Pass |  |  |
| Did the Resurrection Actually Happen? | /writing/did-the-resurrection-happen | Pass |  |  |
| Why Does God Allow Suffering? | /writing/why-does-god-allow-suffering | Pass |  |  |
| Why Does God Feel So Far Away? | /writing/why-does-god-feel-far-away | Pass |  |  |
| Can You Be Good Without God? | /writing/can-you-be-good-without-god | Pass |  |  |
| Did God Command Genocide? | /writing/did-god-command-genocide | Pass |  |  |
| Doubt After Being Abused by a Church Leader | /writing/doubt-after-church-abuse | Pass |  |  |
| Did Christianity Copy Pagan Myths? | /writing/did-christianity-copy-pagan-myths | Pass |  |  |

### Essays on the land-next branch (ten more): 9 of 10 pass

Source: `/home/user/livewell-land/client/public/essays/`. Not yet in a PR.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| What Did Jesus Mean by "Render Unto Caesar"? | /writing/what-render-unto-caesar-actually-means | Pass |  |  |
| What Does Romans 13 Say About Obeying the Government? | /writing/what-romans-13-says | Pass |  |  |
| Is It Wrong to Love Your Country? | /writing/is-it-wrong-to-love-your-country | Pass |  |  |
| Why Are People Leaving the Church? | /writing/the-rise-of-the-nones | Pass |  |  |
| What Does It Mean to Seek the Welfare of the City? | /writing/what-a-christian-owes-the-city | Fix | "Seek the welfare of the city" is a Bible phrase only church people know (Jeremiah 29:7). | What Does a Christian Owe the Place They Live? |
| Is the American Church Really Being Persecuted? | /writing/the-persecution-we-invented | Pass |  |  |
| What Was Decided at the Council of Nicaea? | /writing/the-council-of-nicaea-what-was-decided-in-325 | Pass |  |  |
| What the First Christians Did About the Children Rome Threw Away | /writing/the-children-rome-threw-away | Pass |  |  |
| What the First Readers of the Bible Actually Heard | /writing/what-the-original-audience-heard | Pass |  |  |
| Who Decided What Books Are in the Bible? | /writing/who-decided-what-books-are-in-the-bible | Pass |  |  |

### Shelf essays still waiting for a rewrite

These are on the shelf list but not public. Each one's address answers with a notice that prints the shelf title as the page heading, so the shelf title is read by anyone who follows an old link. The third column is the title the writers already chose (recorded in `docs/work/NOTES.md`). My verdict is on that planned title.

| Web address | Shelf title shown on the notice today | Planned title | Verdict on the planned title | Suggested instead |
|---|---|---|---|---|
| /writing/when-god-bless-america-replaces-thy-kingdom-come | When God Bless America Replaces Thy Kingdom Come | When God Bless America Replaces Thy Kingdom Come | Fix: Same words as the book title. A reader will think it is the book page. | When Love of Country Takes the Place of the Kingdom of God |
| /writing/when-the-pulpit-became-a-precinct | When Your Church Became a Voting Bloc | When Your Church Becomes a Voting Bloc | Pass |  |
| /writing/the-end-of-home-field-advantage | The End of Home-Field Advantage | How Do You Share Your Faith in a Post-Christian America? | Pass |  |
| /writing/the-anabaptist-option | The Anabaptist Option | Who Were the Anabaptists, and Why Do They Still Matter? | Pass | (pass, but "Anabaptists" needs a plain subtitle on the card) |
| /writing/how-american-christianity-became-american | How American Christianity Became American | How American Christianity Became American | Fix: Says the same word twice and does not say what happened. | How Did Christianity in America Become So American? |
| /writing/when-politics-replaced-theology | When Politics Replaced Theology | Where Did the Religious Right Come From? | Pass |  |
| /writing/where-church-was-silent-history-injustice-reckoning | Where the Church Was Silent: A Theological Reckoning with the History the American Church Would Rather Not Own | Where Was the Church During Slavery and Jim Crow? | Pass |  |
| /writing/doctrine-of-discovery | The Doctrine of Discovery | What Is the Doctrine of Discovery? | Pass |  |
| /writing/black-church-prophetic-justice | The Black Church and Prophetic Justice | The Black Church and Prophetic Justice | Fix: "Prophetic justice" is a seminary phrase. | What the Black Church Has Taught America About Justice |
| /writing/prosperity-gospel-is-not-the-gospel | The Prosperity Gospel Is Not the Gospel | What's Wrong with the Prosperity Gospel? | Pass |  |
| /writing/the-first-christians-died-for-this | The First Christians Died for This | Why Were the Early Christian Martyrs Willing to Die? | Pass |  |
| /writing/why-people-fled-to-the-desert | Why People Fled to the Desert to Find God | Why Did the Desert Fathers Leave Everything? | Pass |  |
| /writing/augustine-the-restless-man | The Restless Man Who Couldn't Outrun God | Augustine's Confessions and the Restless Heart | Fix: Fine for readers who know Augustine. A new Christian does not. | Who Was Augustine, and Why Does His Story Still Matter? |
| /writing/christianity-was-never-western | Christianity Was Never a Western Religion | Is Christianity a White Man's Religion? | Pass |  |
| /writing/the-crusades-what-actually-happened | The Crusades: What Actually Happened | The Crusades: What Actually Happened | Pass |  |
| /writing/reformation-actually-about | Reformation Actually About | What Was the Reformation Actually About? | Pass |  |
| /writing/church-megaproject-widow-mite | Church Megaproject Widow Mite | What Does the Widow's Mite Really Mean? | Pass |  |
| /writing/how-to-read-genesis-one | How Should a Christian Read Genesis 1? | How Should a Christian Read Genesis 1? | Pass |  |
| /writing/psalm-82-unjust-systems | Psalm 82 Unjust Systems | What Psalm 82 Says About Unjust Systems | Pass |  |
| /writing/women-and-leadership-church | Women and Leadership in the Church | Can Women Be Pastors? | Pass |  |
| /writing/covenant-vs-contract-what-marriage-is | Covenant vs. Contract: What Marriage Actually Is | Is Marriage a Covenant or a Contract? | Pass |  |
| /writing/what-the-bible-says-about-submission | What the Bible Really Says About Submission in Marriage | What Does the Bible Say About Submission in Marriage? | Pass |  |
| /writing/what-fatherhood-requires | What Fatherhood Requires | What Does the Bible Say About Being a Father? | Pass |  |
| /writing/the-machine-that-forms-you | The Machine That Forms You | What Is Your Phone Doing to Your Soul? | Pass |  |
| /writing/the-theology-of-saturday | Where Is God on Holy Saturday? | What Holy Saturday Teaches About Grief | Pass |  |

21 of 25 planned titles pass. Three shelf titles in the second column are broken English and are showing on the live site today: "Reformation Actually About", "Church Megaproject Widow Mite", "Psalm 82 Unjust Systems" (finding 3).

### Essay section names on /writing

| Section name today | Verdict | Suggested |
|---|---|---|
| The Mirror: How Sincere Believers Go Wrong | Fix | How Sincere Believers Go Wrong (drop "The Mirror:") |
| Faith and Power: Christian Nationalism and Politics | Pass |  |
| After Christendom | Fix | After Christian America: Living Without Home-Field Advantage |
| The American Church: History and Reckoning | Pass |  |
| The Ancient Church | Fix | Church History in Plain Language |
| Reading the Bible in Its World | Fix | How to Read the Bible in Its Own World |
| Doubt and Hard Questions | Pass |  |
| Marriage, Family and Ordinary Faithfulness | Pass |  |

## Honest Answers


### Honest Answers (/answers): 33 of 35 pass

Source: `client/src/data/answers.ts`. Seen at http://localhost:4311/answers. This page is the model for the rest of the site.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Are miracles believable? | /answers#are-miracles-believable | Pass |  |  |
| Can a life mean anything without God? | /answers#can-life-mean-anything-without-god | Pass |  |  |
| Can you be a Christian without going to church? | /answers#can-you-be-a-christian-without-church | Pass |  |  |
| Can you be good without God? | /answers#can-you-be-good-without-god | Pass |  |  |
| Can you lose your salvation? | /answers#can-you-lose-your-salvation | Pass |  |  |
| Did God command genocide in the Old Testament? | /answers#did-god-command-genocide | Pass |  |  |
| Did the resurrection actually happen? | /answers#did-the-resurrection-actually-happen | Pass |  |  |
| Do I have to choose between faith and science? | /answers#do-i-have-to-choose-between-faith-and-science | Pass |  |  |
| Does God actually exist? | /answers#does-god-actually-exist | Pass |  |  |
| Does God choose us, or do we choose him? | /answers#does-god-choose-us-or-do-we-choose-him | Pass |  |  |
| How can God be three and one? | /answers#how-can-god-be-three-and-one | Pass |  |  |
| How should a Christian read Genesis 1? | /answers#how-should-a-christian-read-genesis-1 | Pass |  |  |
| If God is good, why is there so much suffering? | /answers#if-god-is-good-why-suffering | Pass |  |  |
| Is believing anything on faith irrational? | /answers#is-faith-irrational | Pass |  |  |
| Is faith just wishful thinking? | /answers#is-faith-just-wishful-thinking | Pass |  |  |
| Is hell forever, or does it end? | /answers#is-hell-forever-or-does-it-end | Pass |  |  |
| Is it okay to be angry at God? | /answers#is-it-okay-to-be-angry-at-god | Pass |  |  |
| Is Jesus really the only way to God? | /answers#is-jesus-the-only-way | Pass |  |  |
| Is my anxiety a spiritual failure? | /answers#is-anxiety-a-spiritual-failure | Pass |  |  |
| Should a Christian follow a political party? | /answers#should-a-christian-follow-a-political-party | Pass |  |  |
| Was Jesus just a good teacher? | /answers#was-jesus-just-a-good-teacher | Pass |  |  |
| What about those who never heard of Jesus? | /answers#what-about-those-who-never-heard | Pass |  |  |
| What did the New Atheists get right? | /answers#what-did-the-new-atheists-get-right | Fix | "New Atheists" is a label many readers will not know. | What do atheists get right about the church? |
| What do Christianity and Islam actually dispute? | /answers#christianity-and-islam-differences | Fix | "Dispute" is stiff. People say "different". | How are Christianity and Islam different? |
| What do I do when my teenager says they don't believe? | /answers#when-your-teenager-says-they-dont-believe | Pass |  |  |
| What does the Bible actually say about money? | /answers#what-does-the-bible-say-about-money | Pass |  |  |
| What does the Bible say about anxiety? | /answers#what-does-the-bible-say-about-anxiety | Pass |  |  |
| What does the Bible say about divorce and remarriage? | /answers#what-does-the-bible-say-about-divorce-and-remarriage | Pass |  |  |
| What happens after you deconstruct your faith? | /answers#what-happens-after-deconstruction | Pass |  |  |
| What if Christianity is wrong? | /answers#what-if-christianity-is-wrong | Pass |  |  |
| What if I'm done with church but not with Jesus? | /answers#done-with-church-but-not-jesus | Pass |  |  |
| What makes us human in the age of AI? | /answers#what-makes-us-human-in-the-age-of-ai | Pass |  |  |
| Why didn't the Bible just ban slavery? | /answers#why-didnt-the-bible-just-ban-slavery | Pass |  |  |
| Why does God allow earthquakes, cancer, and animal suffering? | /answers#why-does-god-allow-natural-disasters | Pass |  |  |
| Why would anyone trust the Bible? | /answers#why-would-anyone-trust-the-bible | Pass |  |  |

## Topics (PR #540, not yet live)


### Topic questions on /topics: 14 of 17 pass

Source: `client/public/topics/index.json` on the PR #540 branch. Seen at http://localhost:4312/topics (screenshot `pending-topics-full.png`). Web addresses of the three topic pages: `/topics/living-after-christendom`, `/topics/faith-politics-and-the-flag`, `/topics/raising-children-in-a-secular-age`.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| What does it mean that America is post-Christian, and how do we live in it? | /topics/living-after-christendom | Fix | Passes as a question, but it is long and its address says "christendom", a word the reader has not met yet. | Keep the title. For future topic pages, keep insider words out of the address. |
| What is Christian nationalism, and how should a Christian think about politics? | /topics/faith-politics-and-the-flag | Pass |  |  |
| How do we hand the faith to our kids in a secular age? | /topics/raising-children-in-a-secular-age | Pass |  |  |
| Is Christianity actually true? | /answers | Pass |  |  |
| Can I trust the Bible, and how do I read it? | /help/trust-the-bible | Pass |  |  |
| Can I trust the church after what it did? | /help/church-hurt | Pass |  |  |
| What are phones and AI doing to us and our kids? | /studyguides/attention | Pass |  |  |
| Why are Sunday mornings still divided, and what did the church do about slavery? | /writing/why-didnt-the-bible-ban-slavery | Fix | Two questions in one line, and it opens the essay "Why Didn't the Bible Just Ban Slavery?", which is a third. | Why didn't the Bible just ban slavery? |
| My neighbors believe something else. Is Christianity too narrow? | /answers#is-jesus-the-only-way | Pass |  |  |
| Why are there so many denominations? | /theology/traditions | Pass |  |  |
| I can't stop worrying | /help/anxiety | Pass |  |  |
| I'm afraid of where the country is going | /help/fear-of-the-future | Pass |  |  |
| Why does God allow suffering? | /help/suffering | Pass |  |  |
| I'm grieving | /help/grief | Pass |  |  |
| I feel alone, even at church | /help/loneliness | Pass |  |  |
| My marriage is in trouble | /help/marriage | Pass |  |  |
| Money and work | /help/money | Fix | The only row that is a label. Every other row is a question or a sentence a person would say. | I'm worried about money and work |

## Study guides


### Study guides (/studyguides): 52 of 68 pass

Source: `client/public/studyguides/*.json`. Seen at http://localhost:4311/studyguides. The house pattern "Subject: A Bible Study on ..." is right; the failures are the ones that do not follow it.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Addiction and Recovery: A Bible Study on the Long Road Back | /studyguides/addiction-and-recovery | Pass |  |  |
| After Christendom: A Study on Post-Christian Faith | /studyguides/after-christendom | Pass |  |  |
| Aging and Legacy: A Bible Study on Finishing Well | /studyguides/aging-and-legacy | Pass |  |  |
| Alone in a Crowded Church: A Study on Church Loneliness | /studyguides/alone-in-a-crowded-church | Pass |  |  |
| Anger: A Bible Study on Temper and Righteous Anger | /studyguides/anger | Pass |  |  |
| Anxiety: A Bible Study on Worry and the Peace of Christ | /studyguides/anxiety | Pass |  |  |
| Attention: A Bible Study on Technology and Distraction | /studyguides/attention | Pass |  |  |
| Baptism and Communion: A Bible Study on the Sacraments | /studyguides/baptism-and-communion | Pass |  |  |
| Believe: A Bible Study for New Believers and Seekers | /studyguides/believe | Pass |  |  |
| Biblical Womanhood: A Bible Study on Women of Valor | /studyguides/womanhood | Pass |  |  |
| Character Before Competence: A Church Leadership Study | /studyguides/character-before-competence | Pass |  |  |
| Christian Nationalism: An 8-Week Study | /studyguides/christian-nationalism | Fix | Says 8 weeks. The file holds 5 sessions. | Christian Nationalism: A Five-Session Bible Study |
| Church and Empire: An 8-Week Study | /studyguides/church-and-empire | Fix | Says 8 weeks. The file holds 5 sessions. "Empire" is an insider word. | The Church and Political Power Through History: A Five-Session Study |
| Contentment: A Bible Study on Wanting Less | /studyguides/contentment | Pass |  |  |
| Deep Roots: A Bible Study for Faith Beyond Slogans | /studyguides/deep-roots | Fix | Does not say what is studied. | Deep Roots: A Bible Study on the Basics of the Faith |
| Divorce and Blended Families: A Bible Study for Starting Over | /studyguides/divorce-and-blended-families | Pass |  |  |
| Economic Justice: An 8-Week Study | /studyguides/economic-justice | Fix | Says 8 weeks. The file holds 5 sessions. | Money, Work and the Poor: A Five-Session Bible Study |
| Evangelism: A Bible Study on Sharing Your Faith | /studyguides/witness | Pass |  |  |
| Fatherhood: A Bible Study for Men Without a Blueprint | /studyguides/fatherhood | Pass |  |  |
| Forgiveness: A Bible Study on the Hardest Word | /studyguides/forgiveness | Pass |  |  |
| Forty Days: A Bible Study for Lent | /studyguides/forty-days | Fix | The season should lead, as it does in a search. | Lent: A Forty-Day Bible Study |
| Friendship: A Bible Study on the Love We Forgot | /studyguides/friendship | Pass |  |  |
| Generosity: A Bible Study on Giving | /studyguides/generosity | Pass |  |  |
| Gratitude: A Bible Study on Thanksgiving and Grace | /studyguides/gratitude | Pass |  |  |
| Grief: A Bible Study on Loss and the God Who Wept | /studyguides/grief | Pass |  |  |
| Heaven and Hell: A Bible Study on the Life to Come | /studyguides/heaven-and-hell | Pass |  |  |
| Hospitality: A Bible Study on the Open Door | /studyguides/hospitality | Pass |  |  |
| How the Story Ends | /studyguides/end-times | Fix | No subject word. A reader scanning the list for "end times" or "Revelation" will pass it (the site search does find it). | The End Times: A Bible Study on How the Story Ends |
| Identity: A Bible Study on Who You Actually Are | /studyguides/identity | Pass |  |  |
| Lament: A Bible Study on Praying Your Pain | /studyguides/lament | Pass |  |  |
| Marriage: A Bible Study on Covenant Love | /studyguides/marriage | Pass |  |  |
| Mental Health: A Bible Study on the Weight You Carry | /studyguides/mental-health | Pass |  |  |
| Mishpat: A Bible Study on Biblical Justice | /studyguides/mishpat | Fix | Leads with a Hebrew word. | Justice: A Bible Study on What the Bible Means by Justice |
| New Believers: A Study on Your First Steps of Faith | /studyguides/new-believer | Pass |  |  |
| Parenting: A Bible Study on Forming a Child's Faith | /studyguides/parenting-formation | Pass |  |  |
| Pastoral Health: A Study for Leaders and Those Who Love Them | /studyguides/pastoral-health | Pass |  |  |
| Prayer: A Bible Study on Learning to Pray | /studyguides/prayer | Pass |  |  |
| Questions Skeptics Ask: A Study for Doubters | /studyguides/skeptic | Pass |  |  |
| Raising Believers: A Bible Study for Christian Parents | /studyguides/raising-believers | Pass |  |  |
| Sabbath: A Bible Study on Rest and Hurry | /studyguides/sabbath | Pass |  |  |
| Singleness: A Bible Study for the Unmarried | /studyguides/singleness | Pass |  |  |
| Spiritual Habits: A Bible Study on Formation | /studyguides/habits-and-formation | Pass |  |  |
| Spiritual Warfare: A Bible Study on the Unseen Battle | /studyguides/spiritual-warfare | Pass |  |  |
| The Beatitudes: A Bible Study on the Kingdom of God | /studyguides/the-beatitudes | Pass |  |  |
| The Captive Church: A Study on Faith and Political Power | /studyguides/the-captive-church | Fix | "Captive" is an insider image. | Faith and Politics: A Bible Study on the Church and Political Power |
| The Creeds: A Bible Study on What Christians Believe | /studyguides/the-creeds | Pass |  |  |
| The Fruit of the Spirit: A Bible Study on Growth | /studyguides/fruit-of-the-spirit | Pass |  |  |
| The Holy Spirit: A Bible Study on the Forgotten God | /studyguides/holy-spirit | Pass |  |  |
| The Image of God: A Bible Study on Human Worth | /studyguides/the-image-of-god | Pass |  |  |
| The Lord's Prayer: A Bible Study Line by Line | /studyguides/the-lords-prayer | Pass |  |  |
| The Parables: A Bible Study on the Stories of Jesus | /studyguides/the-parables | Pass |  |  |
| The Psalms: A Bible Study on Honest Prayer | /studyguides/the-psalms | Pass |  |  |
| The Resurrection: A Bible Study on the Evidence | /studyguides/resurrection | Pass |  |  |
| The Sermon on the Mount: A Bible Study | /studyguides/sermon-on-the-mount | Pass |  |  |
| The Story of the Bible: A Study of the Whole Canon | /studyguides/the-story-of-the-bible | Pass |  |  |
| The Trinity: A Bible Study on Knowing God | /studyguides/knowing-god | Pass |  |  |
| The Undivided Life: A Study on Faith Beyond Sunday | /studyguides/the-undivided-life | Fix | Abstract. | Faith on Monday: A Bible Study on Living One Whole Life |
| Waiting for the Light: A Bible Study for Advent | /studyguides/waiting-for-the-light | Fix | The season should lead. | Advent: A Bible Study on Waiting for the Light |
| What Manhood Is For | /studyguides/manhood | Fix | No "Bible study" in the title, unlike its neighbors. | Manhood: A Bible Study on What a Man Is For |
| When Faith Has Questions | /studyguides/doubt | Fix | No subject word, and the same title is used for a reading pathway. | Doubt: A Bible Study for When Faith Has Questions |
| When It All Comes Apart | /studyguides/deconstruction | Fix | Could be about divorce, grief or a job. It is about deconstruction. | Deconstruction: A Bible Study for When Your Faith Comes Apart |
| When It Does Not Make Sense | /studyguides/suffering | Fix | No subject word. It is the suffering study. | Suffering: A Bible Study for When Life Does Not Make Sense |
| When Our Parents Grow Old: A Bible Study for Caregivers | /studyguides/when-our-parents-grow-old | Pass |  |  |
| Where Is God When It Hurts: Suffering and the Goodness of God | /studyguides/providence | Pass |  |  |
| Where Your Treasure Is | /studyguides/money | Fix | A Bible allusion. The subject is money. | Money: A Bible Study on Where Your Treasure Is |
| Who Am I, Really? A Bible Study for Teenagers | /studyguides/youth-who-am-i | Pass |  |  |
| Why We Still Need Each Other | /studyguides/the-church | Fix | No subject word. It is the study on the church. | The Church: A Bible Study on Why We Still Need Each Other |
| Work and Vocation: A Bible Study on Faith and Your Job | /studyguides/work-and-vocation | Pass |  |  |

## Context guides


### Context guides (/resources/context): 38 of 41 pass

Source: `client/public/context/guides-index.json`. The titles are strong. The web addresses are another matter (finding 8), and four of the section headings on the index page are seminary terms: "Ancient Near East", "Second Temple Judaism", "The Greco-Roman World", "Honor, Shame, and Culture". Suggested: "The World of the Old Testament", "The Jewish World Jesus Was Born Into", "The Roman World of the First Churches", "Honor and Shame in the Bible's World".

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Did Proverbs Borrow From Egyptian Wisdom Writing? | /resources/context/wisdom-and-the-nations | Pass |  |  |
| Did the Gospels Get Jesus Right? | /resources/context/did-the-gospels-get-jesus-right | Pass |  |  |
| Does ‘Judge Not’ Mean Christians Can’t Say Anything Is Wrong? | /resources/context/matthew-7-1-in-context | Pass |  |  |
| Does Psalm 91 Promise Protection From Harm? | /resources/context/psalm-91-in-context | Pass |  |  |
| Does Romans 13 Mean Christians Must Obey Every Government? | /resources/context/romans-13-1-in-context | Pass |  |  |
| Does Romans 8:28 Mean Everything Happens for a Reason? | /resources/context/romans-8-28-in-context | Pass |  |  |
| Does the Kingdom of God Belong to a Political Party? | /resources/context/the-kingdom-is-not-a-platform | Pass |  |  |
| Does Your Politics Decide How You Read the Bible? | /resources/context/left-lens-right-lens | Pass |  |  |
| How Did the Bible Treat Women Compared to Its World? | /resources/context/women-in-the-ancient-world | Pass |  |  |
| How Is the Law of Moses Different From Hammurabi? | /resources/context/torah-and-the-law-codes | Pass |  |  |
| Is 'You' in the New Testament Singular or Plural? | /resources/context/collectivist-world-individualist-readers | Pass |  |  |
| Is 2 Chronicles 7:14 a Promise to America? | /resources/context/2-chronicles-7-14-in-context | Pass |  |  |
| Is the Bible an American Book? What Its History Shows | /resources/context/the-bible-is-not-an-american-book | Pass |  |  |
| Was Genesis 1 Answering Babylon, Not Modern Science? | /resources/context/genesis-one-in-its-world | Pass |  |  |
| Were Ancient People Gullible About Miracles? | /resources/context/miracles-and-the-ancient-mind | Pass |  |  |
| What Are the Household Codes in Ephesians and Colossians? | /resources/context/household-codes-in-context | Pass |  |  |
| What Did Gospel and Lord Mean Under Caesar? | /resources/context/gospel-against-empire | Pass |  |  |
| What Did Grace Mean in a World Built on Patronage? | /resources/context/patronage-and-grace | Pass |  |  |
| What Did Hospitality Mean in the Ancient World? | /resources/context/hospitality-and-the-stranger | Pass |  |  |
| What Does ‘He Will Make Your Paths Straight’ Mean? | /resources/context/proverbs-3-5-6-in-context | Pass |  |  |
| What Does ‘Where Two or Three Are Gathered’ Really Mean? | /resources/context/matthew-18-20-in-context | Pass |  |  |
| What Does Clean and Unclean Mean in Leviticus? | /resources/context/purity-and-contagion | Pass |  |  |
| What Does It Mean That Christians Are Exiles? | /resources/context/exile-not-empire | Pass |  |  |
| What Does Jeremiah 29:11 Really Mean? | /resources/context/jeremiah-29-11-in-context | Pass |  |  |
| What Does Justice Mean in the Bible? Mishpat and Tsedaqah | /resources/context/what-justice-meant | Pass |  |  |
| What Does Philippians 4:13 Really Mean? | /resources/context/philippians-4-13-in-context | Pass |  |  |
| What Does the Bible Actually Say About Slavery? | /resources/context/the-slavery-texts | Pass |  |  |
| What Does the Bible Say About Wealth and the Poor? | /resources/context/money-texts-we-explain-away | Pass |  |  |
| What Happened Between the Old and New Testaments? | /resources/context/between-the-testaments | Pass |  |  |
| What Is a Biblical Covenant? The Ancient Treaty Form | /resources/context/covenant-and-treaty | Pass |  |  |
| What Is Honor and Shame Culture in the Bible? | /resources/context/honor-shame-vs-guilt | Pass |  |  |
| What Is the Septuagint, and Why Does It Matter? | /resources/context/septuagint-and-scripture | Pass |  |  |
| What Israel Was Waiting For | /resources/context/messianic-expectation | Fix | Does not say "Messiah", which is the word a reader would use. | What Kind of Messiah Was Israel Waiting For? |
| What Was the Difference Between Temple and Synagogue? | /resources/context/temple-and-synagogue | Pass |  |  |
| What We Bring to the Text Without Knowing It | /resources/context/misreading-with-western-eyes | Fix | "The text" is classroom talk. | How Does Being Western Change the Way We Read the Bible? |
| Which Cities Did Paul Write To? Corinth, Ephesus, Rome | /resources/context/the-cities-of-paul | Pass |  |  |
| Who the Pharisees Actually Were | /resources/context/pharisees-sadducees-essenes | Fix | Fine, but the guide covers three groups and every neighbor is a question. | Who Were the Pharisees, Sadducees and Essenes? |
| Who Was Isaiah 41:10 Written To? | /resources/context/isaiah-41-10-in-context | Pass |  |  |
| Why Did Israel's Neighbors Worship Idols? | /resources/context/the-gods-of-the-nations | Pass |  |  |
| Why Is the Old Testament So Violent? An Honest Look | /resources/context/the-violence-of-the-old-testament | Pass |  |  |
| Why Was Crucifixion So Shameful in the Roman World? | /resources/context/honor-status-and-the-cross | Pass |  |  |

## Creeds and confessions


### Creeds (/resources/creeds): 13 of 14 pass

These are proper names and should stay. Each card needs one plain line under the name for the reader who has never heard of Schleitheim or Barmen (for example, under the Barmen Declaration: "What German pastors said to Hitler's church in 1934"). The page heading "A church without memory repeats old errors" does not say what the page holds; "The Creeds and Confessions, in Full, with Plain Notes" does.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| The Apostles' Creed | /resources/creeds/apostles-creed | Pass |  |  |
| The Athanasian Creed | /resources/creeds/athanasian-creed | Pass |  |  |
| The Augsburg Confession (Condensed) | /resources/creeds/augsburg-confession-summary | Pass |  |  |
| The Barmen Declaration (Condensed) | /resources/creeds/barmen-declaration-summary | Pass |  |  |
| The Canons of Dort (Condensed) | /resources/creeds/canons-of-dort-summary | Pass |  |  |
| The Chalcedonian Definition | /resources/creeds/chalcedonian-definition | Pass |  |  |
| The Heidelberg Catechism, Lord's Day 1 | /resources/creeds/heidelberg-catechism-q1 | Fix | "Lord's Day 1" means nothing outside the Reformed churches. | The Heidelberg Catechism: Question 1, "What Is Your Only Comfort?" |
| The London Baptist Confession of 1689 (Condensed) | /resources/creeds/london-baptist-confession-1689-summary | Pass |  |  |
| The New Hampshire Confession (Condensed) | /resources/creeds/new-hampshire-confession-summary | Pass |  |  |
| The Nicene Creed | /resources/creeds/nicene-creed | Pass |  |  |
| The Schleitheim Confession (Condensed) | /resources/creeds/schleitheim-confession-summary | Pass |  |  |
| The Thirty-Nine Articles (Condensed) | /resources/creeds/thirty-nine-articles-summary | Pass |  |  |
| The Westminster Confession (Condensed) | /resources/creeds/westminster-confession-summary | Pass |  |  |
| The Westminster Shorter Catechism, Q. 1–10 | /resources/creeds/westminster-shorter-catechism-q1 | Pass |  |  |

## Church history


### Church history era essays (/theology/history): 7 of 22 pass

Source: `client/public/history/essays-index.json`. Seen at http://localhost:4311/theology/history (screenshot `live-history-full.png`). The page lists 22 essays as one run, but they are two series (14, then 8) that cover the same two thousand years twice.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| The Apostolic and Sub-Apostolic Age | /theology/history/the-apostolic-age (c. AD 30-150) | Fix | "Sub-Apostolic" is a historian's term. | The First Christians: From Pentecost to the Generation After the Apostles |
| The Age of the Martyrs | /theology/history/the-age-of-martyrs (AD 64-313) | Pass |  |  |
| The Desert and the Rule | /theology/history/the-desert-and-the-rule (c. AD 270-547) | Fix | Two insider words. "The Rule" means Benedict's rule for monks. | The First Monks: Why Christians Went to the Desert |
| The Constantinian Turn | /theology/history/the-constantinian-turn (AD 312-430) | Fix | Historian's label. | When Rome Became Christian: Constantine and What It Cost |
| The Fathers at Work | /theology/history/the-fathers-at-work (AD 325-430) | Fix | "The Fathers" is church shorthand. | The Church Fathers: The Teachers Who Carried the Faith Between the Councils |
| The Great Councils | /theology/history/the-great-councils (AD 325-451) | Fix | Does not say what was decided. | Nicaea to Chalcedon: The Councils That Wrote the Creeds |
| The Church That Outlived Rome | /theology/history/the-church-that-outlived-rome (c. AD 410-1000) | Pass |  |  |
| The East and West Divide | /theology/history/the-east-west-schism (to AD 1054) | Fix | Does not name the two churches a reader knows. | Why the Catholic and Orthodox Churches Split in 1054 |
| The Medieval West | /theology/history/the-medieval-west (AD 1054-1517) | Fix | A textbook chapter name. | The Church in the Middle Ages |
| The Reformation | /theology/history/the-reformation (AD 1517-1648) | Pass |  |  |
| The Counter-Reformation and the Wars of Religion | /theology/history/the-counter-reformation (AD 1545-1648) | Pass |  |  |
| The Awakenings and the Birth of Evangelicalism | /theology/history/the-awakenings (c. AD 1730-1791) | Fix | Passable. Plainer is better. | The Great Awakening and Where Evangelicals Came From |
| The Missionary Century | /theology/history/the-missionary-century (AD 1792-1910) | Pass |  |  |
| The Modern Church and the Global Shift | /theology/history/the-global-church (AD 1900 to today) | Fix | "Global shift" is vague. | The Church Since 1900: How Christianity Moved South and East |
| The Apostolic and Persecuted Church | /theology/history/apostolic-and-persecuted (AD 30–313) | Fix | Covers the same years as two essays above it under a different name. | (merge into one series; see finding 2) |
| Councils and Creeds | /theology/history/councils-and-creeds (AD 313–590) | Pass |  |  |
| The Long Middle | /theology/history/the-long-middle (AD 590–1517) | Fix | Insider shorthand for the Middle Ages. | Nine Hundred Years: The Church from Rome's Fall to the Reformation |
| The Reformation and Its Wars | /theology/history/reformation-and-its-wars (AD 1517–1648) | Pass |  |  |
| Awakenings and Enlightenment | /theology/history/awakenings-and-enlightenment (AD 1648-1800) | Fix | Two abstract nouns. | Revival and Reason: The Church from 1648 to 1800 |
| The American Experiment | /theology/history/the-american-experiment (AD 1800-1950) | Fix | Sounds like a civics essay. | How Christianity Became American, 1800 to 1950 |
| The Attractional Era | /theology/history/the-attractional-era (AD 1950-2010) | Fix | Church-growth jargon. | The Megachurch Years, 1950 to 2010 |
| After Christendom | /theology/history/after-christendom-era (AD 2010-present) | Fix | Used as a title in four places on the site (see finding 6). | The Church After Christian America, 2010 to Today |

The same page also holds short reference entries for people, councils and heresies (57 in the catalogue: "Augustine of Hippo", "First Council of Nicaea", "Arianism", "Eutychianism, also called Monophysitism"). These are proper names and I did not score them. A one-line plain gloss on each heresy card would help a new reader ("Arianism: the teaching that Jesus was the highest creature, not God").

### Timeline entries (/justice/timeline): 43 of 45 pass

The page heading is "No one's hands are clean." and the browser title is "The Injustice Timeline". Entry titles are plain and dated.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| The Constantinian Shift | 4th century | Fix | Historian's label, and the era essay calls the same event "The Constantinian Turn". | Constantine Makes the Church the Empire's Favorite |
| Democratic Socialism and the Honest Distinction | 20th Century | Fix | Not an event, and the phrase is unclear. | Democratic Socialism Is Not Soviet Communism |

The other 43 pass as they stand. Examples: "The Spanish Inquisition", "The Doctrine of Discovery", "White Churches and the Civil Rights Era".

## Reading plans


### Bible reading plans (/plans): 5 of 5 pass

The new plan in PR #540, "Read the whole story in 2027" (`/study/bible/guides/whole-story-2027`), also passes.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| A Gospel in a Month: Matthew | /plans#matthew-in-a-month | Pass |  |  |
| Forty Days With Mark: A Lent Reading Plan | /plans#lent-with-mark | Pass |  |  |
| The Bible in a Year | /plans#bible-in-a-year | Pass |  |  |
| The New Testament in Ninety Days | /plans#new-testament-in-90-days | Pass |  |  |
| The Psalms in Thirty Days | /plans#psalms-in-30-days | Pass |  |  |

### Family reading plans (/family/reading-plans): 2 of 4 pass

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| The Life of Jesus | life-of-jesus | Pass |  |  |
| Heroes and Promises | heroes-and-promises | Fix | Does not say it is the Old Testament. | The Old Testament Story in 30 Days |
| Psalms for the Family | psalms-for-the-family | Pass |  |  |
| Foundations | foundations | Fix | One abstract word. PR #540 also uses it as the label for the 72 weekly devotions. | Start Here: 21 Days for a Family New to Faith |

### Eight-week plans (/plans/<slug>): 19 of 29 pass

On the index at /plans each plan is listed under the reader's own sentence ("I can't stop worrying"), which is right. These titles are what a reader sees on the plan's own page, in search results and on the printed booklet.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Eight Weeks After the Church Hurt You | /plans/church-hurt | Pass |  |  |
| Eight Weeks for the Worn-Out Parent | /plans/parenting | Pass |  |  |
| Eight Weeks for When You're Not Sure Anymore | /plans/doubt | Pass |  |  |
| Eight Weeks in the Waiting | /plans/infertility | Fix | Does not say infertility. | Eight Weeks for a Couple Who Cannot Have Children |
| Eight Weeks of Asking God Why | /plans/suffering | Pass |  |  |
| Eight Weeks of Asking What Your Life Is For | /plans/purpose | Pass |  |  |
| Eight Weeks of Beginnings | /plans/new-believer | Fix | Does not say new Christian. | Eight Weeks for a New Christian |
| Eight Weeks of Facing What Is Coming | /plans/fear-of-the-future | Pass |  |  |
| Eight Weeks of Learning to Pray | /plans/prayer | Pass |  |  |
| Eight Weeks of Learning to Stop | /plans/work-burnout | Fix | Does not say burnout. | Eight Weeks for When Work Has Burned You Out |
| Eight Weeks of Not Carrying It Alone | /plans/caregiving | Pass |  |  |
| Eight Weeks of Reading Like an Adult | /plans/skeptic | Fix | Sounds like an insult, and does not say who it is for. | Eight Weeks for the Curious Skeptic |
| Eight Weeks of Small Mercies | /plans/empty | Fix | Does not say it is for feeling empty. | Eight Weeks for When You Feel Empty |
| Eight Weeks of Taking Your Questions Seriously | /plans/deconstruction | Pass |  |  |
| Eight Weeks of Walking With Loss | /plans/grief | Pass |  |  |
| Eight Weeks on the Long Road Back | /plans/addiction | Fix | Does not say addiction. | Eight Weeks Toward Recovery from Addiction |
| Eight Weeks Out of Hiding | /plans/pornography | Fix | Does not say what it is for. | Eight Weeks Toward Freedom from Porn |
| Eight Weeks Out of Work | /plans/job-loss | Pass |  |  |
| Eight Weeks Toward a Decision You Can Live With | /plans/decisions | Pass |  |  |
| Eight Weeks Toward a Life After Divorce | /plans/divorce | Pass |  |  |
| Eight Weeks Toward a Quieter Mind | /plans/anxiety | Pass |  |  |
| Eight Weeks Toward a Slower Temper | /plans/anger | Pass |  |  |
| Eight Weeks Toward Being Known | /plans/loneliness | Pass |  |  |
| Eight Weeks Toward Being the Dad You Never Had | /plans/fatherless | Pass |  |  |
| Eight Weeks Toward Each Other | /plans/marriage | Fix | Does not say marriage. | Eight Weeks Toward a Stronger Marriage |
| Eight Weeks Toward Enough | /plans/money | Fix | Does not say money. | Eight Weeks Toward Peace About Money |
| Eight Weeks Toward One Undivided Life | /plans/whole-life | Pass |  |  |
| Eight Weeks Toward Setting Down the Debt | /plans/forgiveness | Fix | Reads as a money plan. It is the forgiveness plan. | Eight Weeks Toward Forgiving Someone |
| Eight Weeks With an Open Bible | /plans/reading-the-bible | Pass |  |  |

## Family devotions and catechism

### Weekly family devotions: 72 titles, all pass on one condition

Source: `client/public/family-devotions.json` and `family-devotions-2.json`. Seen at http://localhost:4311/family/devotions and http://localhost:4312/family/devotions (screenshot `pending-family-devotions-m.png`).

The titles are word pictures for children ("The Towel And The Basin", "The Thief Of Glad"). That is right for a devotion read aloud, and it works because every card prints the plain theme above the title ("7 OF 72 · WHO JESUS IS") and the search index files each devotion under its theme. The condition is that the theme always travels with the title. Three things to fix (finding 9): every word is capitalized, including "And", "Of" and "The"; a question title has no question mark ("Can We Trust This Book"); and two pairs are near twins ("He Keeps His Word" and "The God Who Keeps His Word"; two devotions both themed "Forgiveness").

| # | Title | Plain theme printed with it |
|---|---|---|
| 1 | Made On Purpose | Who God Says You Are |
| 2 | When The Lights Go Out | Fear And Anxiety |
| 3 | The Weight You Put Down | Forgiveness |
| 4 | Counting What You Already Have | Gratitude |
| 5 | The Empty Seat | Kindness To Outsiders |
| 6 | Why, Not Just What | Obedience And Heart |
| 7 | More Than A Good Teacher | Who Jesus Is |
| 8 | Talking To Someone Who Is There | Why We Pray |
| 9 | Can We Trust This Book | Is The Bible True |
| 10 | What To Do With The Fire | Handling Anger |
| 11 | Where Your Eyes Go | Screens And Attention |
| 12 | The Towel And The Basin | Serving Others |
| 13 | Walking Before You See | Faith |
| 14 | An Anchor In The Storm | Hope |
| 15 | Love That Costs Something | Love |
| 16 | The Slow Growing Things | Patience |
| 17 | The City With No Walls | Self Control |
| 18 | Nothing To Hide | Honesty |
| 19 | Open Hands | Generosity |
| 20 | The Lowest Seat | Humility |
| 21 | Brave Is Not Fearless | Courage |
| 22 | Enough Right Here | Contentment |
| 23 | The Friend Who Stays | Friendship |
| 24 | Working For The Right Boss | Work |
| 25 | Permission To Stop | Rest And Sabbath |
| 26 | Taking Care Of The Garden | Caring For Creation |
| 27 | Not A Building | The Church |
| 28 | The Meal That Remembers | The Lord's Supper |
| 29 | Every Sad Thing Undone | Heaven |
| 30 | What Love Was Willing To Do | The Cross |
| 31 | The Stone Was Moved | The Empty Tomb |
| 32 | God Who Lives Close | The Holy Spirit |
| 33 | What You Are Made Of | Worship |
| 34 | The Gift You Cannot Earn | Grace |
| 35 | Turning Around | Repentance |
| 36 | Not Getting What You Deserve | Mercy |
| 37 | Whose Voice Gets Heard | Justice And The Poor |
| 38 | The Hardest Love | Loving Your Enemies |
| 39 | Small But Powerful | The Words We Say |
| 40 | The Thief Of Glad | Jealousy And Comparison |
| 41 | The Right Kind Of Awe | The Fear Of The Lord |
| 42 | More Than Being Smart | Wisdom |
| 43 | When It Really Hurts | Suffering |
| 44 | Strength In The Waiting | Waiting On God |
| 45 | He Keeps His Word | God's Faithfulness |
| 46 | Dressed For The Day | The Armor Of God |
| 47 | What Grows On The Tree | The Fruit Of The Spirit |
| 48 | Upside Down Happy | The Beatitudes |
| 49 | The One Who Comes Looking | The Good Shepherd |
| 50 | The Father Who Runs | The Prodigal Son |
| 51 | Everyone You Meet | The Image Of God |
| 52 | You Are Not Just A Keeper | Being Sent |
| 53 | When Someone Hurts You | Forgiveness |
| 54 | The Cure For A Grumpy Heart | Thankfulness |
| 55 | Talking With God | Prayer |
| 56 | A Light For The Path | God's Word |
| 57 | Trusting Enough To Obey | Obedience |
| 58 | Small Things With Great Love | Kindness |
| 59 | A Happiness That Holds | Joy |
| 60 | When Your Heart Is Worried | Peace |
| 61 | Three And Yet One | The Trinity |
| 62 | God Called It Good | Creation |
| 63 | How It All Went Wrong | The Fall |
| 64 | The God Who Keeps His Word | God's Promises |
| 65 | God Came Close | The Incarnation |
| 66 | A Glimpse Of The Mender | The Miracles Of Jesus |
| 67 | He Is Coming Back | The Second Coming |
| 68 | Everything New Again | The New Creation |
| 69 | Strong Enough To Be Gentle | Gentleness |
| 70 | Good All The Way Through | Goodness |
| 71 | Keep Going | Perseverance |
| 72 | Taking Care Of What Is Not Yours | Stewardship |

### Seasonal family devotions: 40 titles, all pass

Thanksgiving week (7), Advent (25) and Holy Week (8). These are set in proper title case and each sits under its date label ("December 1", "Palm Sunday"). Titles: Where It All Came From; The One Who Came Back; Thanks in the Middle of It; The Year the Fig Tree Did Not Bud; The Guests Who Cannot Pay You Back; The Empty Chair; His Love Lasts Forever; The Long Wait Begins; A Family for the World; God Hears in the Dark; A King Who Lasts; Out of Bethlehem; A Child Is Given; A Light in Deep Darkness; A Branch from a Stump; Comfort My People; The Servant Who Carries It; A New Heart; How Long, O Lord; The Messenger Comes First; An Old Man Hears Good News; Let It Be; The Lowly Lifted; Joseph Stays; The Word Was God; The Word Moved In; The Night Before; No Room; Good News for Shepherds; Mary Treasured It; A Light to Everyone; He Is Here; The Wrong Kind of King; Turning Over the Tables; The Greatest Command; A Friend Walks Away; Bread, Cup, and Basin; It Is Finished; The Day of Silence; He Is Not Here.

### Family catechism: 76 questions, 71 pass

Source: `client/public/family-catechism.json`. Every question is short and in a child's words ("Who made you?", "Did Jesus stay dead?", "Will God ever stop loving me if I am bad?"). The four church words it teaches by name (grace, repentance, justification, sanctification) belong in a catechism. Five questions appear twice with different answers, which a parent will notice: "Why did God make you?" (8 and 64), "What does God require of us?" (11 and 56), "Can we keep God's law perfectly?" (21 and 58), "What is baptism?" (47 and 61), "What is the Lord's Supper?" (48 and 62). I counted the second of each pair as a fail.

| # | Part | Question |
|---|---|---|
| 1 | God, Creation, and Humanity | Who made you? |
| 2 | God, Creation, and Humanity | Is there a God, and how can we know? |
| 3 | God, Creation, and Humanity | What is God? |
| 4 | God, Creation, and Humanity | Is God one, or is God three? |
| 5 | God, Creation, and Humanity | Did God create everything? |
| 6 | God, Creation, and Humanity | How did God create human beings? |
| 7 | God, Creation, and Humanity | What does it mean to be made in God's image? |
| 8 | God, Creation, and Humanity | Why did God make you? |
| 9 | God, Creation, and Humanity | Does God control all that happens? |
| 10 | God, Creation, and Humanity | Is God good even when life is hard? |
| 11 | God, Creation, and Humanity | What does God require of us? |
| 12 | God, Creation, and Humanity | How has God spoken to us? |
| 13 | God, Creation, and Humanity | What is the Bible mainly about? |
| 14 | Sin, the Law, and Our Need | How did sin come into the world? |
| 15 | Sin, the Law, and Our Need | What is sin? |
| 16 | Sin, the Law, and Our Need | Did everyone fall into sin? |
| 17 | Sin, the Law, and Our Need | What has sin done to us? |
| 18 | Sin, the Law, and Our Need | What is God's law? |
| 19 | Sin, the Law, and Our Need | What does the law require of us toward God? |
| 20 | Sin, the Law, and Our Need | What does the law require of us toward others? |
| 21 | Sin, the Law, and Our Need | Can we keep God's law perfectly? |
| 22 | Sin, the Law, and Our Need | Then why did God give us the law? |
| 23 | Sin, the Law, and Our Need | What do our sins deserve? |
| 24 | Sin, the Law, and Our Need | Is there any hope for sinners like us? |
| 25 | Christ and Redemption | Who is Jesus Christ? |
| 26 | Christ and Redemption | Why did the Son of God become a man? |
| 27 | Christ and Redemption | How was Jesus born? |
| 28 | Christ and Redemption | What kind of life did Jesus live? |
| 29 | Christ and Redemption | Why did Jesus have to die? |
| 30 | Christ and Redemption | What happened on the cross? |
| 31 | Christ and Redemption | Did Jesus stay dead? |
| 32 | Christ and Redemption | Where is Jesus now? |
| 33 | Christ and Redemption | What does it mean that Jesus is Lord? |
| 34 | Christ and Redemption | How are we saved? |
| 35 | Christ and Redemption | What is grace? |
| 36 | Christ and Redemption | What is faith? |
| 37 | Christ and Redemption | What is repentance? |
| 38 | Christ and Redemption | What is justification? |
| 39 | Christ and Redemption | Can anything separate us from God's love in Christ? |
| 40 | Christ and Redemption | What does Jesus give us besides forgiveness? |
| 41 | The Spirit, New Life, the Church, and Last Things | Who is the Holy Spirit? |
| 42 | The Spirit, New Life, the Church, and Last Things | What is the new birth? |
| 43 | The Spirit, New Life, the Church, and Last Things | What does it mean to be adopted by God? |
| 44 | The Spirit, New Life, the Church, and Last Things | What is sanctification? |
| 45 | The Spirit, New Life, the Church, and Last Things | How does the Spirit change us? |
| 46 | The Spirit, New Life, the Church, and Last Things | What is the church? |
| 47 | The Spirit, New Life, the Church, and Last Things | What is baptism? |
| 48 | The Spirit, New Life, the Church, and Last Things | What is the Lord's Supper? |
| 49 | The Spirit, New Life, the Church, and Last Things | Why and how should we pray? |
| 50 | The Spirit, New Life, the Church, and Last Things | What did Jesus teach us to pray? |
| 51 | The Spirit, New Life, the Church, and Last Things | Will Jesus return? |
| 52 | The Spirit, New Life, the Church, and Last Things | What is our hope for the life to come? |
| 53 | Prayer, the Commandments, and the Christian Life | What is prayer? |
| 54 | Prayer, the Commandments, and the Christian Life | How did Jesus teach us to pray? |
| 55 | Prayer, the Commandments, and the Christian Life | Why do we call God Father? |
| 56 | Prayer, the Commandments, and the Christian Life | What does God require of us? |
| 57 | Prayer, the Commandments, and the Christian Life | What are the Ten Commandments? |
| 58 | Prayer, the Commandments, and the Christian Life | Can we keep God's law perfectly? |
| 59 | Prayer, the Commandments, and the Christian Life | What should we do when we sin? |
| 60 | Prayer, the Commandments, and the Christian Life | Why do we gather with the church? |
| 61 | Prayer, the Commandments, and the Christian Life | What is baptism? |
| 62 | Prayer, the Commandments, and the Christian Life | What is the Lord's Supper? |
| 63 | Prayer, the Commandments, and the Christian Life | How does the Holy Spirit change us? |
| 64 | Prayer, the Commandments, and the Christian Life | Why did God make you? |
| 65 | Hard Questions Children Ask | If God is good, why is there suffering and evil? |
| 66 | Hard Questions Children Ask | Is the Bible really true? |
| 67 | Hard Questions Children Ask | How do we know God is real if we cannot see him? |
| 68 | Hard Questions Children Ask | What about people who never heard about Jesus? |
| 69 | Hard Questions Children Ask | Is Jesus really the only way to God? |
| 70 | Hard Questions Children Ask | What happens when we die? |
| 71 | Hard Questions Children Ask | Did God make dinosaurs, and how does science fit with the Bible? |
| 72 | Hard Questions Children Ask | Why does God sometimes say no to our prayers? |
| 73 | Hard Questions Children Ask | What about other religions? |
| 74 | Hard Questions Children Ask | Will God ever stop loving me if I am bad? |
| 75 | Hard Questions Children Ask | Why do bad things happen to good people? |
| 76 | Hard Questions Children Ask | How can God be three and one at the same time? |

## Self-checks and tools


### Tools registry (/tools): 23 of 36 pass

Source: `client/src/pages/ToolsHub.tsx`. Seen at http://localhost:4311/tools. The self-checks renamed in earlier work ("Where Are You With God? A Self-Check", "Marriage Health Self-Check") are the pattern to follow.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Test the Case | /tools/test-the-case | Fix | The case for what? The tool works through nine questions about Christianity. | Test the Case for Christianity |
| Which Lens Has You? | /tools/which-lens | Fix | A riddle. Nobody knows what a "lens" is until they have taken it. | What Shapes the Way You Read the Bible? A Self-Check |
| Deep Bible Study Companion | /tools/deep-bible | Fix | Cannot be told apart from "Bible Study Guide" and the Study Bible itself. | Book-by-Book Bible Study: 20 Books in Depth |
| Theology Quiz | /tools/theology-quiz | Pass |  |  |
| Where Are You With God? A Self-Check | /diagnostic | Pass |  |  |
| The Whole-Life Assessment | /life/assessment | Pass |  |  |
| Wisdom for All of Life | /wisdom | Fix | Vague, and sits beside "Wisdom Finder". | Proverbs and Ecclesiastes: A Guide to Biblical Wisdom |
| Wisdom Finder | /tools/wisdom-finder | Pass |  |  |
| Rule of Life Builder | /tools/rule-of-life | Fix | "Rule of life" is a monastery term. | Build a Weekly Rhythm of Prayer and Rest (a Rule of Life) |
| What the Bible Says About | /tools/bible-on | Fix | An unfinished sentence. | What the Bible Says About Money, Anger, Work and More |
| Proverbs in 31 Days | /tools/proverbs-31 | Pass |  |  |
| Reading Scripture in Context | /resources/context | Pass |  |  |
| Passage Context Tool | /theology/passage | Pass |  |  |
| Bible Verse Finder | /tools/verse-finder | Pass |  |  |
| The Worry Journal | /tools/worry-journal | Pass |  |  |
| The Parent and Teen Conversation | /tools/parent-teen-conversation | Pass |  |  |
| The Prayer Planner | /tools/prayer-planner | Pass |  |  |
| The Connection Planner | /tools/connection-planner | Fix | Sounds like a networking tool. It is for loneliness. | A Plan for When You Feel Alone |
| Prayer Generator | /tools/prayer-generator | Fix | "Generator" sounds like a machine wrote the prayer. | Prayers for When You Have No Words |
| Family Devotion Builder | /tools/family-devotions | Pass |  |  |
| Bible Study Guide | /tools/bible-study | Fix | Cannot be told apart from the 68 study guides or the tool above. | How to Study a Book of the Bible: 12 Books |
| Marriage Health Self-Check | /tools/marriage-assessment | Pass |  |  |
| Financial Health Check | /tools/financial-health | Pass |  |  |
| Parenting Stage Guide | /tools/parenting-guide | Pass |  |  |
| Parenting Bible Verses | /tools/parenting-verses | Pass |  |  |
| Emotional Health Self-Check | /tools/emotional-health | Pass |  |  |
| Spiritual Gifts Self-Check | /tools/spiritual-gifts | Pass |  |  |
| Scripture Memory System | /tools/scripture-memory | Fix | "System" is cold. | Memorize Scripture: 40 Key Verses |
| Conflict Resolution Guide | /tools/conflict-guide | Pass |  |  |
| Life Audit | /tools/life-audit | Fix | Cannot be told apart from "The Whole-Life Assessment". Keep one. | (merge with The Whole-Life Assessment, or rename: A Quick Check on Eight Areas of Life) |
| Misused Verses — What the Bible Actually Says | /tools/bible-says | Fix | Has a long dash, which the house rule drops, and its address is /tools/bible-says. | Misused Bible Verses: What They Actually Mean |
| Quote Library | /tools/quotes | Pass |  |  |
| Theology Glossary | /tools/glossary | Pass |  |  |
| The Consistency Check | /disruption/consistency | Fix | Does not say consistency about what. | Do You Hold Both Sides to the Same Standard? A Self-Check |
| The Party Scorecard | /nation/scorecard | Pass |  |  |
| If We Had a Biblical Government | /nation/policy | Pass |  |  |

## Books, booklets and downloads

### The three books (/books): 3 of 3 pass

| Title | Subtitle printed with it | Label above it | Verdict |
|---|---|---|---|
| When God Bless America Replaces Thy Kingdom Come | How Patriotism Became Our Practical Savior | Politics and the church | Pass |
| The Monster in the Mirror | Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It | Reading the Bible honestly | Pass, because the subtitle and label do the plain-language work. Never show this title without them. |
| Believe | The Rational Case for Christian Faith | For skeptics | Pass, with the same condition. |

Published titles should not change. The label above each ("For skeptics") is the plain-language handle and is well chosen. Note: the catalogue (`client/public/catalogue/index.json`) still lists five more books that are off the shelf ("Is Critical Race Theory Biblical?", "The Deconstruction of Faith", "The Reliability of Scripture", and the two on sexuality), and their pages still answer. Whether those stay reachable is a decision for James, not a title problem.

### Booklets ("The Hard Issues" series): 8 of 10 pass

The series name is the larger problem. "The Hard Issues" promises hot topics. All ten booklets are about elders, deacons, church government and leading change. Suggested series name: "Church Leadership Booklets".

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Change Without Casualties | /resources/hard-issues-series | Pass |  |  |
| Changing the Unchangeable | /resources/hard-issues-series | Fix | Does not say what is being changed. | Changing the Unchangeable: Leading a Church Through a Hard Change |
| Church Governance That Works | /resources/hard-issues-series | Pass |  |  |
| Deacon Qualifications and Selection | /resources/hard-issues-series | Pass |  |  |
| Finding and Installing Elders | /resources/hard-issues-series | Pass |  |  |
| Qualified | /resources/hard-issues-series | Fix | One word. The subtitle carries the meaning and is not shown in every list. | Qualified: What the Bible Requires of an Elder |
| Removing an Elder | /resources/hard-issues-series | Pass |  |  |
| The Patient Pastor | /resources/hard-issues-series | Pass |  |  |
| What Elders Are For | /resources/hard-issues-series | Pass |  |  |
| When Elders Disagree | /resources/hard-issues-series | Pass |  |  |

### Download page headings, worksheets and workbooks (/downloads): 23 of 23 pass

"The Hard Issues booklets", "Study guides and curriculum", "Reading Scripture in context", "Find Help printables", "Eight-week plans, as booklets", "Bible reading plans", "Worksheets to print", "Workbooks", "Cards to cut and keep", "For families", "The books". All plain except the series name noted above. The ten worksheets ("A monthly budget", "A grief journal page", "The first holidays without them") and two workbooks ("Before You Marry", "A Weekend for Two: A Marriage Retreat") all pass.

## Find Help pages


### Find Help pages (/help): 40 of 40 pass

Every one is a sentence a person would actually say. This is the best-titled part of the site.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|

The other 40 pass as they stand. Examples: "I can't stop worrying", "The church hurt me", "How do I be a dad when I never had one?", "Will I see my pet again?".

## Study Bible guides and doctrine pages


### Guides to reading the Bible (/study/bible/guides): 23 of 24 pass

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Reading Apocalyptic | /study/bible/guides/reading-apocalyptic | Fix | "Apocalyptic" used as a noun is a classroom word. | Reading Revelation and Daniel (Apocalyptic Writing) |

The other 23 pass as they stand. Examples: "How the Books Were Chosen", "Why Translations Differ", "Reading the Parables".

### Doctrine pages (/theology/doctrine/<slug>): 27 of 31 pass

The titles are plain questions. The web addresses are seminary words (finding 8).

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| How God Speaks | /theology/doctrine/revelation | Fix | Every neighbor is a question. | How Does God Speak to Us? |
| How the Whole Story Fits | /theology/doctrine/covenant-frameworks | Fix | Hides the two terms a reader would search. | How Does the Whole Bible Fit Together? Covenant Theology and Dispensationalism |
| What Inspired Means | /theology/doctrine/inspiration | Fix | Same. | What Does It Mean That the Bible Is Inspired? |
| Who Is God? The Trinity | /theology/doctrine/god-and-trinity | Fix | A second Trinity page beside "What Is the Trinity? One God in Three Persons". | Who Is God? (and fold the Trinity material into the one Trinity page) |

The other 27 pass as they stand. Examples: "How Are We Saved?", "Does God Change His Mind?", "Why Does God Allow Evil and Suffering?".

## The practical libraries


### Everyday-life questions (/life/<slug>): 69 of 69 pass

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|

The other 69 pass as they stand. Examples: "How Do You Forgive Someone Who Really Hurt You?", "Is Anxiety a Sin? Faith and Mental Health", "What Do You Do When Your Child Leaves the Faith?".

### How-to guides (/how-tos/<slug>): 128 of 132 pass

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| How to Handle In-Laws (Leaving and Cleaving) | /how-tos/marriage-how-to-handle-in-laws | Fix | "Leaving and cleaving" is King James church talk. | How to Handle In-Laws |
| How to Multiply a Table by Sending People to Start Their Own | /how-tos/dm-how-to-multiply-a-table-by-sending-people | Fix | "Multiply a table" only makes sense after reading the discipleship pages. | How to Send People Out to Start Their Own Discipleship Group |
| How to Start a Discipleship Table This Week | /how-tos/dm-how-to-start-a-discipleship-table | Fix | "Discipleship table" is a house term. | How to Start Discipling a Few People Over a Meal This Week |
| What to Do When No One Comes Back | /how-tos/dm-what-to-do-when-no-one-comes-back | Fix | Comes back to what? | What to Do When No One Comes Back to Your Discipleship Group |

The other 128 pass as they stand. Examples: "How to Pray With Your Kids at Bedtime", "How to Get Out of Debt", "How to Talk to Your Kids About Sex".

### What the Bible says about (/wisdom/<slug>): 208 of 208 pass

One entry is listed twice with the same title, "Caring for Aging Parents"; I counted the pages as passing and note the duplicate for cleanup.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|

The other 208 pass as they stand. Examples: "Anxiety and Worry", "Losing a Child", "Dating a Nonbeliever".

### Group discussion guides (/group-guide/<slug>): 80 of 90 pass

These guides were written for the old essay archive and keep the old essay titles. When an essay is renamed, its guide should be renamed with it.

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Christianity After Christendom | /group-guide/christianity-after-christendom | Fix | Insider. | How Do Christians Live in a Country That Has Moved On? |
| Exvangelical: When Leaving Isn't Losing Faith | /group-guide/exvangelical-when-leaving-isnt-losing-faith | Fix | An internet label. | Leaving Evangelicalism Without Leaving Jesus |
| The Anabaptist Option | /group-guide/the-anabaptist-option | Fix | Insider. | Who Were the Anabaptists, and Why Do They Still Matter? |
| The Death of Christendom | /group-guide/the-death-of-christendom | Fix | Insider. | What Happens When a Country Stops Being Christian? |
| The Problem with Certainty | /group-guide/the-problem-with-certainty | Fix | Abstract. | Is It Wrong to Be Unsure? |
| The Rise of the Nones | /group-guide/the-rise-of-the-nones | Fix | Insider. The essay it belongs to is being renamed "Why Are People Leaving the Church?". | Why Are People Leaving the Church? |
| The Spirituality of Doubt | /group-guide/the-spirituality-of-doubt | Fix | Abstract. | Can Doubt Be Part of Faith? |
| The Suffering God Never Ordered | /group-guide/natural-evil-and-animal-suffering | Fix | Unclear. | Does God Cause Our Suffering? |
| What Following This Actually Costs | /group-guide/the-cost-of-following | Fix | "This" has no meaning on its own. | What Does It Cost to Follow Jesus? |
| What Happened to the Historical Jesus | /group-guide/the-historical-jesus | Fix | The essay is being renamed. | Was Jesus Real? What Historians Actually Know |

The other 80 pass as they stand. Examples: "Can You Lose Your Salvation?", "How to Find a Church That Won't Hurt You", "Raising Kids in a Post-Christian Culture".

## Older sections still reachable (out of the main menu)


### Reading pathways (/pathways/<slug>): 9 of 13 pass

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Anxiety and the Peace of Christ | /pathways/anxiety | Pass |  |  |
| Faith and the Cause | /pathways/progressive-captivity | Fix | Nobody knows what "the cause" is. | When Politics on the Left Replaces the Gospel |
| Faith and the Flag | /pathways/christian-nationalism | Fix | A picture. | Christian Nationalism: Where to Start Reading |
| Learning to Pray Again | /pathways/prayer | Pass |  |  |
| Making Disciples at the Table | /pathways/discipleship | Pass |  |  |
| Manhood, the Father Wound, and Raising Sons | /pathways/manhood | Pass |  |  |
| Marriage, Past the Tips | /pathways/marriage | Pass |  |  |
| Money and the Heart | /pathways/money | Pass |  |  |
| Raising Kids Who Keep the Faith | /pathways/parenting | Pass |  |  |
| Rest, Sabbath, and the Cure for Hurry | /pathways/rest-and-rhythm | Pass |  |  |
| When Faith Has Questions | /pathways/doubt-and-deconstruction | Fix | Same title as a study guide. | Doubt and Deconstruction: When Faith Has Questions |
| When the Weight Doesn't Lift | /pathways/suffering-and-grief | Fix | No subject word. | Suffering and Grief: When the Weight Doesn't Lift |
| Work and the Weight of Monday | /pathways/work-and-vocation | Pass |  |  |

### Justice topics (/justice/topic/<slug>): 1 of 10 pass

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Life at Its Edges | /justice/topic/unborn-and-edges | Fix | Poetic. | Abortion, Euthanasia and the Value of Every Life |
| Race and the Image of God | /justice/topic/race-and-image | Pass |  |  |
| The Abused and the Silence | /justice/topic/abuse-and-vulnerable | Fix | Poetic. | Abuse and the Church's Silence |
| The Foreigner Among You | /justice/topic/the-immigrant | Fix | Bible allusion. | What Does the Bible Say About Immigrants? |
| The Groaning Creation | /justice/topic/creation-care | Fix | Bible allusion. | Caring for Creation |
| The Least of These | /justice/topic/the-vulnerable | Fix | Bible allusion. | Caring for the Vulnerable |
| The Poor at the Gate | /justice/topic/the-poor | Fix | Bible allusion. | What Does the Bible Say About the Poor? |
| The Prisoner and the Gate | /justice/topic/the-prisoner | Fix | Poetic. | Prisons, Justice and Mercy |
| The Sin We Build Together | /justice/topic/systemic-sin | Fix | Poetic. | What Is Systemic Sin? |
| The Wage and the Worker | /justice/topic/the-wage | Fix | Poetic. | Fair Pay and the Worker |

### Church and power topics (/disruption/topic/<slug>): 6 of 12 pass

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| Moralistic Therapeutic Deism | /disruption/topic/moralistic-therapeutic-deism | Fix | A sociologist's term. | "God Wants Me to Be Happy and Nice": The Faith Many Americans Actually Hold |
| The Body and the Sexual Revolution | /disruption/topic/sexuality-and-body | Pass |  |  |
| The Comfortable Captivity | /disruption/topic/consumer-comfort | Fix | Poetic. | Consumer Christianity: When Comfort Runs the Church |
| The Cross and the Flag | /disruption/topic/power-and-nation | Pass |  |  |
| The Gospel of Success | /disruption/topic/prosperity-success | Pass |  |  |
| The Myth of a Christian Nation | /disruption/topic/christian-nation-myth | Pass |  |  |
| The Outrage Machine | /disruption/topic/outrage-machine | Pass |  |  |
| The Platform and the Pedestal | /disruption/topic/celebrity-platform | Fix | Poetic. | Celebrity Pastors and the Cost of Fame |
| The Sword and the Plowshare | /disruption/topic/war-and-peace | Fix | Bible allusion. | Should Christians Go to War? |
| The Therapeutic Gospel | /disruption/topic/therapeutic-gospel | Fix | Seminary phrase. | When Feeling Better Replaces Being Forgiven |
| When the Church Married the Power | /disruption/topic/church-and-empire | Fix | Near twin of the essay "When the Church Married Empire". | When the Church Gains Political Power |
| When Truth Becomes Negotiable | /disruption/topic/truth-and-tribe | Pass |  |  |

### Faith and nation pages (/nation/<slug>): 10 of 11 pass

| Title today | Where | Verdict | Why | New title |
|---|---|---|---|---|
| How We Got Here: A History of Christian Nationalism in America | /nation/nationalism-history | Pass |  |  |
| Render to Caesar | /nation/render | Pass |  |  |
| The Danger of Empire | /nation/empire | Fix | "Empire" again. | What Happens When a Church Loves Power |
| The Other Captivity: When the Faith Dissolves Into a Cause | /nation/progressive-captivity | Pass |  |  |
| The State of the American Church | /nation/state-of-the-american-church | Pass |  |  |
| Was America Founded as a Christian Nation? | /nation/christian-nation | Pass |  |  |
| What an Old Testament Theocracy Actually Was | /nation/theocracy | Pass |  |  |
| What Christian Nationalism Actually Is | /nation/christian-nationalism | Pass |  |  |
| When Compassion Hardens Into Coercion | /nation/compassion-and-coercion | Pass |  |  |
| When Power Takes the Church: What History Keeps Showing Us | /nation/power-and-church | Pass |  |  |
| Which Party Fits the Bible More? | /nation/which-party | Pass |  |  |

Sermon series (`client/src/data/sermon-series.ts`) and the pastors' area are redirected away from the public site and were not scored.

---

## A rule James can use for every future title

**Write the title the way the reader would ask it out loud. Put the line you love underneath.**

Five checks, in order. A title should pass all five.

1. **The out-loud test.** Would a tired parent say these words to a friend, or type them into a search box? "Why does God allow suffering?" passes. "The Theology of Saturday" does not.
2. **The stranger test.** Shown the title alone, with no picture and no blurb, could someone who has never heard of James say what the piece is about? "Blind Spots" fails. "Why Churches Cannot See Their Own Blind Spots" passes.
3. **No word the piece has to teach.** If the reader will learn the word by reading (Christendom, Constantinian, mishpat, the nones, attractional, rule of life), it cannot be in the title. It can be in the subtitle, in brackets, after the plain words.
4. **Subject first for anything in a list.** Study guides, plans and tools are scanned, not read. Lead with the word people look for: "Money: A Bible Study on Where Your Treasure Is".
5. **Say it once on the site.** Before publishing, search the site for the title. If the same words already name something else (as "After Christendom" names four things and "When Faith Has Questions" names two), change one.

And three habits that go with it:

- **The address matches the title.** The web address is the title in lower case, small words dropped, never cut off mid-phrase and never the old working name.
- **Keep the good line.** The literary phrase is often James's best sentence. Use it as the first line under the title or as the opening of the piece. The title finds the reader; the line keeps them.
- **The number is true.** If a title says eight weeks, forty days or twelve books, the piece holds that many.

One exception: devotions read aloud to children, and published books. A word-picture title is right there, as long as a plain label is always printed beside it.

## What I could not check

- The 15 older essays do not load in the local build (no database), so I judged their titles against their blurbs in `shelf.json`, not against the full text. Each proposed new title should be read against the essay before it is used.
- I did not compare these titles with other sites' search rankings; no search data was available. "What a normal person would search" is my judgment, not a measured keyword list.
- Sermon series and the pastors' area are redirected away from the public site and were left out.

## Verification

A second reviewer re-checked this report on 2026-11-17 against the running builds (live code on port 4311, PR #540 on port 4312, both at 1440 wide in Chromium) and against the files on all four branches. Local builds have no database; nothing below depends on it except where said.

**Checked and confirmed**

- Finding 1 (essay titles): all eight titles and both "Start with these" titles are on /writing as quoted; 20 essays are public (15 marked live in `shelf.json` plus 5 with files). The two "When Fear ..." titles and the empty line under "The Bible Assumes You Will Be Wrong" are as described.
- Finding 2 (church history): 22 essays in `essays-index.json`, in the order described (14, then 8 that start again at AD 30); every quoted title is on the page. The master plan's working Part titles are quoted correctly.
- Finding 3 (broken titles): all three pages show the broken title as heading and browser tab, on the live build and on the PR #540 build; the same three strings are in `shelf.json` on PR #540, PR #541 and land-next. The replacement titles are in `docs/work/NOTES.md` as quoted.
- Finding 4 (study guides): 68 guides; the eight titles without a subject are on the page; the three "8-Week" guides hold five sessions.
- Finding 5 (tools): 36 entries in `ToolsHub.tsx`; every quoted name is on /tools on both builds. "Test the Case" does hold nine questions; the counts in the suggested names (20 books, 12 books, 40 verses) match the tool descriptions.
- Finding 6: "After Christendom" names the essay section, a study guide, an era essay and a PR #540 topic address, plus a group guide ("Christianity After Christendom").
- Finding 7: titles and addresses of the PR #541 and land-next essays match the files; the five cut-off live addresses are in `shelf.json`.
- Finding 8: all seven title and address pairs match the catalogue.
- Finding 9: all 72 weekly titles capitalize every word; "Can We Trust This Book" has no question mark; the five catechism questions appear twice at the numbers given, with different answers. PR #540 groups the devotions by theme and keeps the capitals.
- Finding 10: 29 eight-week plans; the ten titles are as quoted; the search-engine title of /plans/forgiveness is "Eight Weeks Toward Setting Down the Debt | LiveWell by James Bell".
- Finding 11 and the tables: spot-checked 23 rows across context guides, doctrine, creeds, how-tos, group guides, justice, church and power, nation and pathways against the catalogue; all matched. Section headings on /resources/context, page headings on /resources/creeds, /studyguides and /justice/timeline, the three book labels and the ten booklet titles are as quoted. The off-shelf book pages do still answer (for example /books/critical-race-theory-biblical).
- Counts: the scoreboard rows add up to 1,253, 1,123 and 130. Library sizes were checked against the catalogue and data files (35 answers, 68 study guides, 41 context guides, 14 creeds, 45 timeline entries, 29 plans, 40 Find Help pages, 24 Bible guides, 31 doctrine pages, 69, 132, 208, 90, 13, 10, 12, 11, 76 catechism questions, 72 and 40 devotions, 17 topic rows). Pass and fix verdicts are the auditor's judgment and were not re-scored.

**Changed**

- OVERSTATED, corrected: "three '8-Week' studies that hold five sessions ... told something untrue by the title". Every study-guide card, these three included, says "5 sessions (run as 5, 8, or 4 weeks)". The titles are inconsistent with the other 65 and with their own subtitles, not false. Finding 4 and the short version now say so.
- OVERSTATED, corrected: "A reader looking for 'end times' ... will not find it". The site search returns "How the Story Ends" for "end times". The problem is in scanning the list and in outside search results and links.
- WRONG, corrected: the "Foundations · 72" chip was reported as a live problem. The live page says "Weekly · 72"; PR #540 introduces "Foundations · 72". It is now recorded as introduced in pending.
- Corrected: the suggested Topics row "What did the church do about slavery?" did not match the page the row opens; it is now "Why didn't the Bible just ban slavery?".
- Corrected: the size note in finding 1 said five of the eight essays have titles in files; only one does ("When the Church Had Nothing to Lose").
- Softened: findings 1 and 2 now say that essays and era essays carry a plain line (and, for history, an era label and dates) beside the title.
- Removed one unsupported claim about what phrase "people actually use"; statements about what people search remain the auditor's judgment, as the report already says.
- No claim about another website was found. No claim about James beyond the home page headline, which was checked.

**Added**

- Finding 13: the home page title sent to search engines and share cards is an old tagline.
- Finding 14: 18 live titles name more than one page, and the pending essays add five more.

**Not checked**

- The proposed new titles were not read against the full text of each piece.
- About half of the long inventory tables beyond the spot-checks above.
- What the live database holds for the 15 older essays' own page titles.
