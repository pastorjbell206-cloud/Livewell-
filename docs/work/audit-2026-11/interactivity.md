# Interactivity audit — LiveWell, November 2026

Lens: James asked for a site that is "more interactive", where "people can click through and be very creative." This report lists every interactive thing on the site today, says what happened when each was used to the end on a phone, and then proposes what to build next.

**How this was done.** A real browser (Chromium, phone size 390x844 and desktop 1440x900) against two local copies: LIVE (the code visitors see today, `origin/main`) and PENDING (PR #540). Neither copy has a database, so anything that needs the server shows its error state here; where a finding depends on that, it says so. Times are the site's own stated times or a count of the questions; a script cannot measure how long a person takes. Screenshots are in `docs/work/audit-2026-11/shots/interactivity/`.

**Scores (against a world-class bar).** Live: **6 of 10**. After the pending work lands: **7 of 10**.

**The one-paragraph verdict.** The site already has more working interactive things than most ministry sites: about 36 tools, 12 self-checks, a Study Bible where you can tap a verse or a Greek word, a family table mode, and a library that remembers your place with no login. Almost all of it works on a phone and almost all of it keeps your progress. The problem is not that the site lacks interactivity. It is that the interactivity is hidden, repeated, and almost entirely made of buttons and lists. The home page has nothing to do on it but read and subscribe. There is not one thing on the site you can drag, scrub, or see drawn. And the two things James names by name, a church history people can explore and hard questions people can find answers to, are the weakest interactive pages on the site.

---

## 1. What is already strong

- **The Study Bible chapter** (`/study/bible/john/3`). Tap a verse number and a panel opens with study notes, the Greek, and every word of the verse as a button (John 3:16 shows 25 word buttons). A Reading/Greek switch, previous and next chapter, a "Go to: John 3:16, Romans 8" box, and "Mark John 3 as read," which then shows in My Library as "1 chapter marked read." On desktop the panel sits beside the text. This is the best interactive thing on the site.
- **Test the Case** (`/tools/test-the-case`). Nine questions a skeptic asks, each argued in five moves. At each move you can push back ("Scholars have an agenda, so their agreement proves nothing.") and get an answer. It ends: "You can weigh all of that and still walk away unconvinced, and keep reading here, and be welcome." It keeps your place after a reload. Nothing like it exists on the other Christian sites I know (my own knowledge, not checked from here).
- **Tonight at the table** (`/family/tonight`). Opens this week's devotion. "Start at the table" turns it into six full-screen steps (Read, Talk, Ask, Do, Remember, Pray) with Back and Next, a Listen button, and "We did this tonight." The family page then shows "Last time: Taking Care Of What Is Not Yours, tonight."
- **The self-checks.** Marriage, emotional health, money, spiritual gifts, the Life Audit, and "Where are you with God?" all run to the end on a phone, save your place ("Picked up where you left off. Start fresh"), ask a safety question before results, keep a private history ("Since the last time"), and offer "Change my answers," Print, and "Send to my phone." The marriage check has a couple mode.
- **Which Lens Has You?** Thirteen forced choices, a named result ("The Flag") written with the author inside the indictment, and essays to read next.
- **Find Help's box** (`/help`). Type "my son says he is an atheist" and get matching care pages. **Wisdom Finder** does the same for Scripture: "I am angry at my wife" returns "Anger and Resentment," "Marriage Trouble," "Talking with Your Spouse."
- **Verse references that open in place.** On the creeds, family pages, plans and context guides, tapping "1 Peter 3:19" opens the verse in a sheet with "Open in the Study Bible."
- **No login anywhere, and it says so.** "It lives in this browser on this device: LiveWell keeps no account and sees none of it."
- **Small helps that work:** Remind me (adds a calendar reminder), Listen (reads aloud), text size, copy citation, 619 printables with a find box.

---

## 2. The inventory

"Home" = taps from the home page today (live), then after PR #540, counted by a crawl of the links on each page; a link in the footer or menu counts as one tap. "Kept" = whether a reload half-way keeps your place.

### Study

| Thing | Where | What you do | Works on phone | Gives back | Kept | Home (live / pending) |
|---|---|---|---|---|---|---|
| Study Bible chapter | `/study/bible/:book/:chapter` | Tap verse, tap word, switch Greek, mark read | Yes; verse numbers are tiny (24x24) | Notes, Greek, word study | Read marks kept | 2 / 2 |
| Go to a passage | header search, `/study/bible` | Type "John 3:16" | Yes | "Open John 3:16 in the Study Bible" | n/a | 1 / 0 (Find field on Home) |
| Story of the Bible | `/study/bible/story` | Read eleven acts, follow links | Yes | A reading path | No progress shown | 2 / 2 |
| Doctrines | `/study/bible/doctrines` | Pick one of 62 | Yes | A study with its verses | No | 2 / 2 |
| Church history | `/theology/history` | Four tabs: timeline 7, councils 11, heresies 10, people 36; open an era | Yes, but the tabs start about seven screens down | Text in accordions | No | 2 / 2 |
| Injustice timeline | `/justice/timeline` | Filter 45 events by five kinds | Yes; the page is 45,571px tall (about 54 phone screens) | A long list | No | 2 / 2 |
| Compare the views | `/theology/compare` | Pick a doctrine; positions in columns | Yes; "Swipe sideways to see every column." | Side-by-side table for 31 debates | No | **not reachable in 3 taps** |
| Which View Am I? | `/theology/which-view` | Six short quizzes (salvation, baptism, end times...) | Yes | Where you lean, with a fair caveat | No | 2 / 2 |
| Six "X vs Y" pages | `/compare/...` | Read | Yes | Article | n/a | only from `/theology/compare` |
| Passage Context Tool | `/theology/passage` | Enter a reference | Yes | Passage in the World English Bible with context | No | 2 / 2 |
| Deep Bible Companion | `/tools/deep-bible` | Book, passage, six layers | Yes | 37 worked passages | No (resets on reload) | 2 / 2 |
| Bible Study Guide | `/tools/bible-study` | Pick a book | Yes | Reading | No | 2 / 2 |
| Two glossaries | `/theology/glossary`, `/tools/glossary` | Search | Yes | Definitions | n/a | 2 / 2 |
| Theology Quiz | `/tools/theology-quiz` | Ten questions | **Could not test: needs the server.** Here it shows "Loading your quiz…" then "Try again." The production code does implement it. | A score | No | 2 / 2 |
| 2027 reading plan | `/study/bible/guides/whole-story-2027` | Check off 365 days | Yes | "Your place is kept on this device." | Yes | **not live** / 1 |

### Hard questions

| Thing | Where | What you do | Works | Gives back | Kept | Home |
|---|---|---|---|---|---|---|
| Test the Case | `/tools/test-the-case` | 9 cases x 5 moves, push back | Yes | An argued case, no altar call | Yes | 2 / 2 (from Topics) |
| Honest Answers | `/answers` | Scroll | Yes, but 54,570px tall with **no search, filter or jump list** | Two-minute answers | n/a | 2 / 2 |
| The questions | `/theology/questions` | 112 accordions | Yes; 32,046px | Short answers | n/a | 2 / 2 |
| Topics | `/topics` | Pick a question | Yes | The one best page for it | n/a | **not live** / 1 |
| Skeptic's Track | `/skeptic-track` | Seven stops | All seven show "ESSAY IN PROGRESS" here (it reads the essay list from the server, so production may differ) | Nothing yet | n/a | **not linked** |
| Site search | header, `/search` | Type, press Enter | Yes for most words | Grouped results | n/a | 1 / 0 |

### Family

| Thing | Where | What you do | Works | Gives back | Kept | Home |
|---|---|---|---|---|---|---|
| Tonight | `/family/tonight` | Start at the table, six steps | Yes | A ten-minute devotion; "We did this tonight" | Yes | 3 / **1** |
| Year of devotions | `/family/devotions` | Browse 72 (+ seasons) | Yes; pending adds themes and age bands | Devotion pages, print cards | Yes | 2 / 1 |
| Catechism | `/family/catechism` | Open any of 76 questions | Yes | Adult answer, child answer, verse, prayer; "0 of 76 learned" | Yes | 2 / 1 |
| Family reading plans | `/family/reading-plans` | Open a plan, check off days | Yes; checkboxes are 20px tall | Four plans | Yes | 2 / 1 |
| Family Devotion Builder | `/tools/family-devotions` | Pick an age and one of ten themes | Yes | One of 40 pre-written devotions, in the King James Version | No | 2 / 2 |
| Parent and Teen Conversation | `/tools/parent-teen-conversation` | Each answers 12, swap codes | Yes | Where you differ, with questions | No | 2 / 2 |
| Parenting Stage Guide, Parenting Verses | `/tools/...` | Pick an age or topic | Yes | Reading | n/a | 2 / 2 |

### Living it (self-checks, planners, journals)

| Thing | Where | Length (site's words) | Works | Gives back | Kept | Home |
|---|---|---|---|---|---|---|
| Start Here | `/start` | "Three questions. About a minute." | Yes | A path of three links | Yes | 2 / 2 |
| Where Are You With God? | `/diagnostic` | 8 questions, "about three minutes" | Yes | "OVERALL: 24 OF 32. Steady in most places" and places to go | Yes | 2 / 2 |
| Whole-Life Assessment | `/life/assessment` | 30 statements | Yes | A map and a rule of life | **No: a reload sends you back to "Begin the assessment"** | 2 / 2 |
| Life Audit | `/tools/life-audit` | 24, "about ten minutes" | Yes | "96 / 120 Thriving" | Yes | 2 / 2 |
| Marriage, Emotional, Financial, Spiritual Gifts | `/tools/...` | 15, 15, 12, 32 | Yes | A score band, next steps, history | Yes | 2 / 2 |
| Which Lens Has You? | `/tools/which-lens` | 13 choices | Yes | A named lens and essays | Yes (this tab) | 2 / 2 |
| Consistency Check | `/disruption/consistency` | 13 questions | Opens and closes only | Text. No answers are taken. | n/a | 2 / 2 |
| Rule of Life Builder | `/tools/rule-of-life` | Pick practices | Yes | A rule to copy or print | Yes | 2 / 2 |
| Worry Journal, Prayer Planner, Connection Planner | `/tools/...` | A few minutes | Yes | A dated private record | Yes (after "Close the day") | 2 / 2 |
| Scripture Memory | `/tools/scripture-memory` | 40 verses, 4 practice modes | Yes; buttons 27px tall | "0 of 40 memorized" | Yes | 2 / 2 |
| Proverbs in 31 Days | `/tools/proverbs-31` | Today's chapter | Yes | A reflection, Remind me | n/a | 2 / 2 |
| Prayer Generator | `/tools/prayer-generator` | Pick one of 12 | Yes | A written prayer | Saved prayers kept | 2 / 2 |
| Verse Finder, What the Bible Says About, Misused Verses, Wisdom Finder, Quote Library | `/tools/...` | Pick or type | Yes | Verses or quotes to copy and save | Saves kept | 2 / 2 |
| Conflict Guide | `/tools/conflict-guide` | Pick a kind, 5 steps | Yes | Steps | No | 2 / 2 |
| Eight-week plans | `/plans/:slug` | "Begin week one" | Yes | A weekly walk | Yes | 2 / 2 |
| Party Scorecard, Biblical Government | `/nation/...` | Open accordions | Yes | Reading | n/a | 2 / 2 |

### Memory and saving

| Thing | Where | Works | Note |
|---|---|---|---|
| My Library | `/my-library` | Yes | Shows saved and started things. Good. |
| Saved verses and prayers | `/tools/saved` | Yes | A second, older saving place beside My Library. |
| "Your Formation" | `/dashboard` | Loads | **Not linked from anywhere.** A third memory page: "0 ARTICLES READ · 0 TOOLS USED · 0 DAY STREAK." |
| Essay tools (Listen, text size, save, cite, share) | `/writing/:slug` | Could not test: essays load from the server. After about nine seconds here the page says "This essay didn't load... Try again · All essays," which is the right failure. |

---

## 3. Findings, most important first

### F1. The home page gives a visitor nothing to do. (LIVE-PROBLEM; partly FIXED-IN-PENDING #540)
- **Where:** `/` — `client/src/pages/Home.tsx`.
- **What a visitor sees:** a headline, two paragraphs, three text doors ("Study the Bible," "Read the essays," "The books"), three essay links, three books, and one box: "Email address · Subscribe." The only thing on the page to type into is the newsletter. No tool, no question, no tonight, no family.
- **Why it fails:** James wants people to "click through." The first screen is a page to read. Every tool is two taps away, through the footer or a page called "Resources."
- **Pending:** #540 adds "Look up a passage or ask a question · Find," a line "Tonight at the table: Taking Care Of What Is Not Yours," and Topics and Family doors. That is a real gain. It still shows nothing a visitor can try on the spot.
- **Fix:** add one band, "Try it," with three live samples: the first move of Test the Case, one verse you can tap open, and tonight's devotion. Size M. **STILL-OPEN-AFTER-PENDING** for the "try it" part.

### F2. Church history, the thing James asked for twice, is a list of accordions. (STILL-OPEN-AFTER-PENDING)
- **Where:** `/theology/history` (`TheologyHistory.tsx`), `/justice/timeline` (`PropheticTimeline.tsx`).
- **What a visitor sees:** under "The story you were born into," 22 essay links come first. On a phone the four tabs ("The timeline · 7," "The councils · 11," "The heresies · 10," "The people · 36") begin about 6,000 pixels down. "The timeline" is seven boxes that open and close. Nothing is drawn to scale, nothing can be scrubbed, and no person or council opens its own page. The injustice timeline is one column 45,571 pixels tall.
- **Why it fails:** "I want them to understand church history" and "more interactive." This page teaches by reading only. The 2026-10-27 critique said the same ("seven equal accordions"); it is still true, and the Line in VISION.md is planned, not built.
- **Fix:** now (S): move the four tabs above the essay list and give each era a "jump to" chip. Next (L): build the timeline in proposal P1.

### F3. Side-by-side views of contested questions already exist, and nobody can find them. (STILL-OPEN-AFTER-PENDING)
- **Where:** `/theology/compare`, six `/compare/...` pages, `/skeptic-track`, `/dashboard`.
- **What a visitor sees:** nothing; no menu, hub or footer leads to them. A crawl three taps deep from Home, on both live and pending, never reached any of them. Yet `/theology/compare` says "See the positions side by side. Pick a doctrine and lay its views in a row" and does it for 31 debates, with each position's "IN ONE LINE" and "THE CASE, IN BRIEF."
- **Why it fails:** this is the exact feature James describes ("answer hard questions," "intellectual, academic") and it is built and orphaned.
- **Fix:** add "Compare the views" to the Study menu and to `/study`, and a "See the views side by side" link at the top of every doctrine debate page. Size S.

### F4. The same job is done three or four times, so a visitor cannot tell which one is "the" one. (STILL-OPEN-AFTER-PENDING; needs James)
- **Where:** `/tools` (36 tiles, 10,525px tall on a phone) and `/assessments` (12).
- **What a visitor sees:** three "where do I start" quizzes (`/start`, `/diagnostic`, `/tools/which-lens`); two whole-life checks ("The Whole-Life Assessment," 30 statements, and "Life Audit," 24); five ways to look up verses by topic (Verse Finder, What the Bible Says About, Parenting Bible Verses, Wisdom Finder, Misused Verses); four ways to study a passage (the Study Bible, Deep Bible Study Companion, Bible Study Guide, Passage Context Tool, the last in a different translation); two glossaries; two family devotion makers (the Builder, in the King James Version, and the 72-week library, in the Berean Standard Bible); three places that remember things (My Library, Saved Items, Your Formation).
- **Why it fails:** "one place" becomes many places. A world-class site has one front door per job.
- **Fix:** carry out the folds already proposed in VISION.md section 2.6 and cut the hub to about fifteen real instruments. The tool URLs are on James's never-redirect list, so this is his call. Size M.

### F5. Hard questions are a 65-screen scroll. (LIVE-PROBLEM; partly FIXED-IN-PENDING #540)
- **Where:** `/answers` (`Answers.tsx`), `/theology/questions`.
- **What a visitor sees:** "The questions people actually ask." then one page 54,570 pixels tall on a phone, with no search box, no filter and no jump list. `/theology/questions` is 112 accordions.
- **Why it fails:** "I want them to be able to answer hard questions." A person with one question has to scroll past all the others.
- **Pending:** `/topics` ("Hard questions, and where to start") routes each question to its best page. Good, but `/answers` itself is unchanged.
- **Fix:** put the same find-as-you-type box that `/help` and `/tools` already have on `/answers`, plus a jump list of the questions at the top. Size S. Then proposal P2.

### F6. A thirty-question assessment forgets everything if the page reloads. (STILL-OPEN-AFTER-PENDING)
- **Where:** `/life/assessment` — `client/src/pages/life/WholeLifeAssessment.tsx`.
- **What a visitor sees:** answer eighteen statements, lock the phone, come back, the browser reloads: "Begin the assessment."
- **Why it fails:** the site's own rule says long instruments keep their place; every other self-check does ("Picked up where you left off"). The Conflict Guide, Which View Am I, Deep Bible and the Parent and Teen Conversation also reset, though they are short.
- **Fix:** save in-progress answers with the existing storage helper, as the other self-checks do. Size S.

### F7. Many buttons are too small for a thumb. (STILL-OPEN-AFTER-PENDING)
- **Where and what (phone, measured):** Study Bible verse numbers 24x24 pixels, and the number is the only way to open a verse's notes (`StudyBible.tsx`); family reading-plan day checkboxes 62x20; Scripture Memory's "Full Text / First Letter / Fill in Blank / Full Recall" 27 high; Emotional Health answers 33 high; Marriage, Financial and Life Audit answers 38 high with 24x24 section dots; filter chips 31 to 34 high on the context guides and the injustice timeline; Copy and Share on the Prayer Generator 29 high.
- **Why it fails:** the common guideline is about 44 pixels. On the Study Bible, the best tool on the site, the main action is the hardest to hit.
- **Fix:** make the whole verse tappable, not only its number; raise the rest to 44. Size M in total (S each).

### F8. Three tools tell you their Bible text is unchecked, and one of them is the memory tool. (STILL-OPEN-AFTER-PENDING)
- **Where:** `/tools/scripture-memory`, `/tools/verse-finder`, `/tools/proverbs-31` (the notice comes from `ScriptureNote.tsx`); `/tools/family-devotions`.
- **What a visitor sees:** "The verse text here has not been checked word for word against one translation." On Scripture Memory this sits under the verse you are asked to memorize. The Family Devotion Builder gives a three-year-old "Enter into his gates with thanksgiving... his truth endureth to all generations" (KJV) while the rest of the family pages use the Berean Standard Bible.
- **Why it fails:** the notice is honest, but a memory tool with unverified wording undercuts "study the Bible," and the site's own standard is verbatim Scripture.
- **Fix:** draw these verses from the Study Bible's own text files (`client/public/bible/text/`, already on the site), then drop the notice. Size M.

### F9. Search misses plain words. (LIVE-PROBLEM; unchanged in pending)
- **Where:** header search and `/search`; `/tools/verse-finder`.
- **What a visitor sees:** searching "timeline" returns a study guide on the end times first, not church history. Typing a question in the header shows nothing until Enter is pressed; only a Bible reference answers as you type. In Verse Finder, typing "lonely" gives 'No topics match "lonely"' although a "Loneliness" button is on the page. (Searching "325" here gave "The search didn't load"; that path needs the server, so I could not judge it.)
- **Fix:** add plain-word aliases for the hub pages to the search index ("timeline," "quiz," "devotions tonight," "compare"); match word beginnings in Verse Finder; show the top three results under the header box as you type. Size S to M.

### F10. Several "tools" are articles with an "Open the tool" button. (STILL-OPEN-AFTER-PENDING)
- **Where:** `/tools` — `ToolsHub.tsx`.
- **What a visitor sees:** every tile ends "Open the tool →," including "The Consistency Check" (13 paragraphs that open and close; no answer is taken, nothing is given back), "The Party Scorecard," "If We Had a Biblical Government," "Parenting Stage Guide," "Reading Scripture in Context" and "Wisdom for All of Life." "Prayer Generator" offers twelve written prayers; "Family Devotion Builder" offers forty.
- **Why it fails:** a visitor who opens three of these learns that "tool" means "page," and stops opening them.
- **Fix:** label reading pages "Read" and real instruments "Start"; rename the Generator and Builder for what they are ("Prayers for the hour," "A devotion for tonight"). Size S.

### F11. An orphan page promises streaks. (LIVE-PROBLEM; unchanged in pending)
- **Where:** `/dashboard` — `Dashboard.tsx`.
- **What a visitor sees:** "YOUR FORMATION · Good evening · 0 ARTICLES READ · 0 TOOLS USED · 0 BOOKS STUDIED · 0 PATHS COMPLETED · 0 DAY STREAK."
- **Why it fails:** it duplicates My Library, nothing links to it, and VISION.md rules out "streaks, badges, percentages of a person."
- **Fix:** redirect `/dashboard` to `/my-library`. Size S.

### F12. Nothing a visitor makes or finds can be shared as itself. (STILL-OPEN-AFTER-PENDING)
- **Where:** `/tools/quotes` (399 quotes), self-check results, verse panels.
- **What a visitor sees:** "Copy" and "Share" buttons that pass a link or plain text. There is no card, no image, nothing made for a Facebook post.
- **Why it fails:** James wants the site to be the hub for his Facebook and Substack. The cheapest road from the site to a feed is a good-looking card that carries the site's name.
- **Fix:** proposal P4. Size S to M.

---

## 4. What to build, ranked by value over cost

Everything below runs on what the site already is: React, JSON files in `client/public`, the browser's own storage, no login. None needs a charting or mapping library.

| # | What the visitor does | Data needed | Exists already? | Size | Serves |
|---|---|---|---|---|---|
| **P1** | **Surface what is built.** Put "Compare the views," Test the Case and "Which View Am I?" in the Study and Topics menus; move the history tabs to the top; add a find box to `/answers`. | None | Yes | **S** | Hard questions, church history |
| **P2** | **"Ask a hard question."** One box on Home and `/topics`: type or tap a question and get one best answer, then "argue it with me" (the matching Test the Case case), "see where Christians differ" (compare), and "the long version" (essay or doctrine). | Honest Answers, 9 cases, 112 theology questions, 41 care pages, the pending topics index | Yes, in five separate places. Needs one small file mapping each question to its pages and the plain phrasings people use. | **M** | Hard questions; the skeptic |
| **P3** | **A devotion for tonight, picked by you.** Three taps: how old are the kids, how long do you have (5, 10, 15 minutes), what is going on (a hard day, a fight, thankful, a big question). You get one devotion and "Start at the table." | 72 devotions with themes; pending #540 adds age bands and the three-short-nights split; 76 catechism questions | Yes | **S to M** | Family devotions. Replaces the KJV Builder. |
| **P4** | **Quote and verse cards.** On any quote, verse panel or self-check result: "Make a card." The browser draws a cream-and-black card with the line, the source and the site name, to save or share. | 399 quotes (in `QuoteLibrary.tsx`), Bible text files | Yes | **S to M** | Facebook and Substack hub |
| **P5** | **Catechism out loud.** A practice mode for the 76 questions: the question fills the screen, the family answers, tap to reveal, "We know this one" or "Again next week." This week's question first. | `family-catechism.json`; the "learned" count already exists | Yes | **S** | Discipling kids |
| **P6** | **Finish the tappable chapter.** Tap anywhere on a verse; cross-references as chips that open in place; highlight a verse and write a private note; "copy verse with reference"; a share link that opens on that verse. | Verse notes already hold cross-reference fields; verse anchors (`#v16`) exist | Mostly. Highlights and notes are new, stored on the device. | **M** | "The best Bible study tool" |
| **P7** | **Reading paths that show your place.** On the essay shelf and the Skeptic's Track: "3 of 7 read," the next one marked, and a line in My Library. | `shelf.json`, the reading paths, the essay-completion record | Yes | **S to M** | Intellectual readers; coming back |
| **P8** | **The church history timeline you can scrub.** One line, drawn to scale, from AD 30 to today. Drag or step a year marker; the page says who was alive, which council met, what was being argued, and which essay covers it. Tap any mark to open it. A second row shows America. On a phone it runs top to bottom. A plain list sits beside it for screen readers. | 68 dated events, 11 councils, 36 people with dates, 10 heresies, 22 era essays, 45 injustice events | Yes, but dates are written as words ("around 35 to 108"); they need a start and end year added. The page already contains code that reads them. | **L** (a list with a year stepper first: M) | Church history. This is the signature piece; VISION.md calls it the Line. |
| **P9** | **A doctrine explorer.** Start from the Nicene Creed set large; tap a line ("of one substance with the Father") to see the doctrine, the year it was fought over, the verses, the catechism question, and where Christians still differ. | Creeds with phrase notes, 62 doctrine studies, verse lists per doctrine, 31 debates, 76 catechism questions | Yes. Needs a small map from creed lines to doctrines. | **M to L** | Doctrine, church history, academic readers |
| **P10** | **One "Where should I start?"** Fold `/start`, `/diagnostic` and the Home rows into one three-question opener on Home that ends in one page, not a list. | The three existing quizzes | Yes | **S**, plus James's yes to the fold | Everyone new |
| **P11** | **Check yourself after a history essay.** Three or four questions at the end of each era essay, answered privately, returning once a few weeks later. Replaces the Theology Quiz. | New questions for 22 essays | **No. New writing James must read.** | **M** | Formation, not only information |
| **P12** | **Maps of the biblical world.** Tap a place in a chapter and see it on a simple line map; follow Paul's road. | Place names and coordinates | **No.** Nothing in `client/public` has coordinates. Open place data exists (my own knowledge; its licence would need checking). VISION.md set maps aside as James's call. | **L** | Bible study |

**Order I would build them in:** P1 this week; then P3, P5 and P10 (small, and all for families and newcomers); then P2 and P4; then P6 and P7; then P8, which is the largest and the one people will remember; P9 after it, since it reuses the same parts; P11 when James has time to read questions; P12 only if James wants an atlas.

---

## 5. Decisions only James can make

1. Which duplicate tools fold into which (F4). The tool URLs are on his never-redirect list.
2. Whether the church history timeline (P8) is built now as a list with a year stepper, or waits for the full drawn Line in VISION.md.
3. Whether he wants maps (P12). The October vision set them aside.
4. Whether shareable cards (P4) may carry his name and the site address onto Facebook, and in what wording.
5. Whether `/dashboard` ("Your Formation," with its day streak) should go (F11).
6. Whether `/roadmap` should keep the sentence "Forty-eight books is the plan. Twenty-one are already in print," given his standing rule that the site never states a book count. (Outside this lens; seen in passing.)

## 6. What I did not or could not check

- Anything that needs the server: the Theology Quiz, essay pages and their Listen, save and share tools, the short-query search path, the Skeptic's Track's real state.
- PR #541 and the `land-next` essays: they add essays, not interactive features, so they do not change this report.
- How long a real person takes on each tool. The times in the tables are the site's own.
- The other sites named for comparison were not visited from here.
