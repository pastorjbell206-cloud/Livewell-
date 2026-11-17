# Family devotions and discipleship: audit, 2026-11-17

Lens: a parent on a phone at 8pm, then an adult who wants to grow, then a small-group leader.
Tested in Chromium at 390x844 (and 1440x900 for two pages) against LIVE (origin/main, port 4311) and PENDING (PR #540, port 4312). Screenshots: `docs/work/audit-2026-11/shots/family-discipleship/`.

**Score: live 6 of 10. With PR #540 merged: 7 of 10.**

The family material is sound, short and usable, and Table mode is the best thing on the site for a tired parent. What holds it back: a family on the live site can hardly find it, nothing on the nightly path is written for a small child, the site has little to say on the second night of the week, and an adult has no marked road from "new to this" to mature.

What I could not check: the printable PDFs (family cards, seasonal booklets, study-guide PDFs) are made during the Vercel build, so the local servers answer those addresses with the app shell. The links are in the code; I did not see the files. I did not hear the Listen voice.

---

## What exists (counted from the data)

| | Live | With #540 |
|---|---|---|
| Weekly devotions | 72 (one a week; the cycle restarts 2026-12-27) | 72, now in seven theme groups |
| Length of a weekly devotion | about 230 to 300 words, about 260 on average (passage, big idea, talk, three questions, activity, prayer); the talk is 100 to 142 words | about 280 to 380 words, about 325 on average, because each devotion now carries a second set of three questions |
| Question sets | one set of three, "Together" | Younger (about 4 to 10) and Older (about 11 to 17), 72 of 72 |
| Seasonal daily sets | Thanksgiving week 7, Advent 25, Holy Week 8 (40 days) | same |
| Catechism | 76 questions in six parts, each with a grown-up answer, a "little ones" answer (3 to 16 words), a verse, a note, a prayer | same |
| Family reading plans | 4: Life of Jesus (30 days), Heroes and Promises (30, younger kids), Psalms (30), Foundations (21, families new to faith) | same |
| Devotion Builder | 10 themes x 4 age bands (3-6, 7-11, 12-18, mixed) = 40 pieces | same |
| "For the grown-ups" lines | none | 12 of 72 devotions |
| "World we live in" devotions | none | 2 written, switched off until James reads them |
| Family and parenting how-to guides | 24 | 24 |
| Eight-week plans / study guides / care pages | 29 / 68 / 40 | same |
| Site search | "family devotions", "devotions for kids" and "catechism" do not return the family pages (finding 19) | same |

Ages named anywhere: toddler to young adult in the Parenting Stage Guide; 3 to 18 in the Builder; 4 to 17 on the nightly devotion (pending only).

---

## The parent's evening, tap by tap

| Task | Live | With #540 |
|---|---|---|
| Home to tonight's devotion | 4 taps: Menu, Resources, "For families" (the tenth and last link in that group), Start. The word "family" is not on the home page above the footer, and not among the five words the phone menu opens with. | 1 tap on "Tonight at the table: Taking Care Of What Is Not Yours." But that line sits 1,145 px down a phone, below the first screen. Or Menu, Family: 2 to 3 taps. |
| Do it | Table mode: six screens (Read, Talk, Ask, Do, Remember, Pray), large type, Back / "1 of 6" / Next. Works well. | Same, plus Younger / Older questions |
| Find the catechism | same 4 taps, then one more | Menu, Family, The family catechism |
| Something for a five-year-old | The Builder's "Young children (3-6)" (two taps once you are in the tool) and the catechism's "For the little ones" answers | Same. "Younger" questions are not written for five |
| Something for a teenager | "For teenagers" holds one link, to /answers | Older questions on every devotion; the teen section unchanged |
| A reading plan | /family/reading-plans, four plans, tick the days | same |
| Print or save | Print gives one clean page per devotion. Save goes to My Library. | same |
| Come back tomorrow | Same devotion, same Start button, plus "Last time: Taking Care Of What Is Not Yours, last night" | same |

---

## Findings, most important first

### 1. On the live site a parent cannot find the family devotions
- **Where:** `/` and the phone menu (`client/src/lib/siteNav.ts`, `pages/Home.tsx`).
- **What a visitor sees:** the menu reads "Study, Essays, Books, Resources, About". The home page's "Where to begin" offers "Study the Bible", "Read the essays", "The books". "For families" is the tenth link under Resources in the footer.
- **Why it fails:** James wants "one place for families to go". Today the family room is four taps deep and unnamed.
- **Fix:** merge PR #540 (Family door, a "Family devotions" card, a "Tonight at the table" line). **Size:** done. **Status:** FIXED-IN-PENDING (#540).

### 2. Nothing on the nightly path is written for a small child
- **Where:** `/family/tonight`, `client/public/family-devotions*.json`, `/tools/family-devotions`.
- **What a visitor sees (pending):** "Younger is about 4 to 10", then "How might you use your time, money, or talents in a way that honors the One who gave them?" Another night: "Where do you feel pressure to be someone you are not so people will like you?" These "younger" questions are the old all-ages questions with a new label; only the Older set was newly written.
- **Why it fails:** a four-year-old cannot answer these, and the parent is left translating in front of the child. The site's real writing for ages 3 to 6 is in the Builder ("What is one thing you are happy God gave you today?"), which covers ten themes and quotes the King James ("whithersoever thou goest"). The Builder itself is quick (pick an age, pick a theme, and the devotion appears), but it is a separate tool off the nightly path, and tonight's devotion never points a parent of small children to it.
- **Fix:** add a "Little ones (about 3 to 6)" band to each devotion: one sentence, one question, one thing to do. Start by moving the Builder's young band into the ten matching devotions, and relabel today's "Younger" as about 7 to 10. **Size:** L (62 new short sets to write). **Status:** STILL-OPEN-AFTER-PENDING.

### 3. The site has nothing to say on the second night
- **Where:** `/family/tonight`, `/family`, `pages/family/DevotionPage.tsx`.
- **What a visitor sees:** after tapping "We did this tonight": "Done. This device will remember that you did this one tonight." The next evening the same devotion returns with the same "Start" button.
- **Why it fails:** there is one devotion a week, and the page never says so. A parent who had a good night comes back and is handed last night again. Nothing tells them what to do next.
- **Fix:** when this week's devotion is done, change the card to "Done this week. The next one comes Sunday" and offer the rest of the week from what exists: this week's catechism question, today's day in a reading plan, the memory verse. Remember which of the three short nights (pending) a family has done. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 4. The catechism asks five questions twice, with different answers, and a new family starts at question 47
- **Where:** `/family/catechism`, `client/public/family-catechism.json`, `lib/familyCatechism.ts`.
- **What a visitor sees:** question 47 "What is baptism?" with "Baptism is a sign that I belong to Jesus." Question 61 "What is baptism?" with "Baptism is a sign that we belong to God and are washed clean by Jesus." The same happens with 8 and 64, 11 and 56, 21 and 58, 48 and 62. This week every family, new or not, is shown question 47 ("THIS WEEK — QUESTION 47"), and the week's question also sits under the seasonal readings. Identical on the pending build.
- **Why it fails:** a child who learned one answer is corrected by the other. A family that begins tonight begins in the middle; "Who made you?" is 30 weeks away.
- **Fix:** merge the five pairs (71 questions, or write five new ones), and let a family choose "Start at question 1" with its place kept on the device. **Size:** S for the pairs once James picks the wording, M for a family's own place. **Status:** LIVE-PROBLEM, STILL-OPEN-AFTER-PENDING.

### 5. In Advent, Holy Week and Thanksgiving the family reads a paraphrase, not the Bible
- **Where:** `/family/devotions/advent-1` and the other 39 seasonal days; `client/public/family-seasonal.json`.
- **What a visitor sees:** under "Read · Genesis 3:15": "God spoke to the serpent and said that the offspring of the woman would one day crush its head, even as it struck his heel." Then, in small type: "The wording here is a paraphrase, not a quotation."
- **Why it fails:** the house rule is Scripture verbatim. The printed booklet already gives "each passage in full from the Berean Standard Bible"; the screen at the table does not. Seasonal days also have one question, no "Do", and no age bands.
- **Fix:** show the same Bible text the booklet prints. Add a second, simpler question per day. **Size:** M. **Status:** LIVE-PROBLEM, STILL-OPEN-AFTER-PENDING.

### 6. Teenagers get one link
- **Where:** `/family`, section "FOR TEENAGERS · Why we believe".
- **What a visitor sees:** one card, "On doubt and hard questions", which opens `/answers`: 65 phone screens written for adults (one of its questions is "What do I do when my teenager says they don't believe?"). Of 68 study guides, the filter shows "For teenagers 1".
- **Why it fails:** James wants parents to "disciple their kids". The teen years are where parents are most afraid, and the best teen material is not linked here: the Builder's teen band, The Parent and Teen Conversation tool, and the how-tos on discipling teenagers at home and staying close to a teenager who is pulling away.
- **Fix:** rebuild the section from those four pieces now. Later, a page written to the teenager. **Size:** S now, L later. **Status:** STILL-OPEN-AFTER-PENDING.

### 7. Twenty-four how-to guides for parents are not linked from the family page
- **Where:** `/family`, `/family/catechism`; guides at `/how-tos/fam-*` and `/how-tos/parenting-*`.
- **What a visitor sees:** nothing. Guides exist on praying with your kids at bedtime, reading the Bible with young children, using a family catechism, keeping Lent and Easter, a family screen covenant, apologizing to your kids, talking to your kids about sex. `/help/family-devotions` links to seven of them, and the site search finds them, but the family pages themselves link to none (checked on both builds: no `/how-tos/` link on `/family` or `/family/catechism`).
- **Why it fails:** these answer the parent's first question, "how do I even start?", in plain words.
- **Fix:** a "How to" shelf on `/family`, and "How to use a catechism" at the top of the catechism page. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 8. An adult has no marked road from new to mature
- **Where:** `/`, `/topics`, `/plans`, `/plans/new-believer`, `/start`, `/study`.
- **What a visitor sees:** no door or link says "new here" or "new to faith". `/start` is a three-question quiz that no header or footer link reaches. "I'm a new Christian. What do I do now?" is the 28th of 29 tiles on `/plans`, under the kicker "FIND HELP · CARE PLANS", as if new faith were a hard season. Its last line is "← Find help for something else". The pending `/topics` page does not mention the new Christian. (In fairness, a search for "new christian" does find the care page and two study guides.)
- **Why it fails:** James wants "discipleship". The pieces of a road exist (Eight Weeks of Beginnings, the Foundations family plan, the New Believers study guide, Eight Weeks With an Open Bible, the 2027 whole-story plan, the doctrine studies), and nothing joins them. The earlier critique's line still holds: every learning page is a shelf and none is a syllabus.
- **Fix:** one page, "New to faith, or coming back", that sets those pieces in order, linked from Home and the footer. Then a "What next" block at the foot of every plan, devotion, study guide and self-check naming one next step. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 9. The church year stops at three seasons, and Advent is dated December 1
- **Where:** `/family/tonight`, `/family`, `lib/familyYear.generated.ts`.
- **What a visitor sees:** on Sunday November 29, 2026, the first day of Advent, the devotion is headed "December 1 · Genesis 3:15", and it stays for three nights (November 29, 30 and December 1). `/family` does explain it on those nights ("Advent has begun. The family Advent calendar starts Tuesday, December 1"), but the devotion page a parent lands on from Tonight does not; it only shows the December 1 heading. On December 27 the family is back at "Made On Purpose", week 1. There is nothing for Lent, the weeks after Easter, Pentecost, or the days after Christmas, and nothing for a baptism, a birthday, a death in the family or the first day of school.
- **Fix:** label the set "Day 1" in place of a date on the nights before December 1 (S). Then a short Lent set and an Easter week (L, needs writing). **Status:** STILL-OPEN-AFTER-PENDING.

### 10. Four different Bible wordings in the family room
- **Where:** weekly devotions (Berean Standard Bible), seasonal days (paraphrase), the Builder ("Scripture quotations are from the King James Version"), study guides (memory verse "For this child I prayed, and the Lord has granted me my petition", which is ESV wording).
- **Why it fails:** a child memorising a verse needs one wording. The King James for ages 3 to 6 is the hardest of the four.
- **Fix:** one translation for everything read aloud to children; James decides which (the earlier critique's question 2). **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 11. Words over a parent's head
- **Where and what:** the browser title of `/family` is "Family Discipleship — Devotions, Apologetics, and Parenting". On `/family` the catechism is introduced as "Seventy-six questions, one a week, in the New City Catechism tradition", a phrase most parents will not know. (The catechism page itself does explain it plainly: "by question and answer, said out loud together until it lives in them".) The devotion carries three counters: live, "72 of 72 · Weekly devotions · Week 47 of the year"; pending, "72 of 72 · Foundations · Week 47 of the year" ("Foundations" is also the name of a reading plan, so the pending build adds a small confusion). Titles are in capitals a child reads oddly: "Taking Care Of What Is Not Yours". The read-aloud talk turns to the adults mid-paragraph: "Parents, this lands on us first."
- **Fix:** title "Family devotions, the catechism, and help for parents"; on `/family`, drop "in the New City Catechism tradition" and borrow the plain sentence the catechism page already has; one counter; sentence-case titles; set parent asides apart from the read-aloud text. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 12. Printing: good for one devotion, thin for everything else
- **Where:** `/family/catechism`, `/family/reading-plans`, `/downloads`.
- **What a visitor sees:** a devotion prints to one page. The catechism has no booklet or cards (the browser prints an eight-page list). Reading plans cannot be printed as a chart. `/downloads` says "619 files" and "FOR FAMILIES 1".
- **Fix:** a catechism booklet and question cards, a one-page chart per reading plan, and a one-page "this week at your table" sheet. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 13. The family tonight line is below the first phone screen (pending)
- **Where:** `/` on PR #540. "Tonight at the table: Taking Care Of What Is Not Yours." sits after two long paragraphs.
- **Fix:** move the Find field and the tonight line above the second paragraph on phones. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 14. A dead-end discipleship path
- **Where:** `/pathways/discipleship`, "Making Disciples at the Table".
- **What a visitor sees:** step 1, "Read these first", then "The essays for this step are off the shelf for now." Step 2 says "Sixty-two working Bible studies"; the library has 68.
- **Fix:** redirect it to the new "New to faith" page, or rebuild it from live pieces. **Size:** S. **Status:** LIVE-PROBLEM, STILL-OPEN-AFTER-PENDING.

### 15. Reading plans do not know what day it is
- **Where:** `/family/reading-plans`.
- **What a visitor sees:** four lists of days with tick buttons and "N days read". No start date, no "today is day 6", no reminder, no print button, no plan for teenagers, and no link in the page itself to "Read the whole story in 2027" (pending puts that link only in the footer).
- **Fix:** "Start today", show today's day first, add the Remind me button the devotion already has, link the 2027 plan. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 16. The bottom of the family page is a mis-sorted pile
- **Where:** `/family`, "EVERYTHING ON THIS · Home and family life" ("62 pieces in all" live, "63 pieces in all" pending). The page is 14 phone screens live and about 16 pending.
- **What a visitor sees:** "Is 2 Chronicles 7:14 a Promise to America?", "Alone in a Crowded Church", "Evangelism: A Bible Study on Sharing Your Faith" filed as family reading, then "and 34 more — search the whole site" (35 on pending), which opens an empty search box.
- **Fix:** hand-pick eight pieces that are about the home, and make "more" open a filtered list. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 17. For the small-group leader and the pastor
- **Strong:** 68 study guides, each with a leader's guide, a handout, a script and PDFs; a "When someone in the group is carrying this" block that hands the leader the right care page.
- **Problems:** a guide page is about 100 phone screens (`/studyguides/raising-believers`, 15,500 words) with leader and participant text on one page. There is no page that tells a pastor how to give the family devotions to his church (a weekly sheet, a card with a code, a line for the bulletin). Guides name books that are not on the Books page (see "Needs James").
- **Fix:** tabs or separate pages for leader and participant; one "For your church" page. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 18. Homes that are still not named
- **Fixed in pending:** "If your table looks different" (On your own; Between two homes; Beside a spouse who does not believe), with "If you are afraid of someone at home, your safety comes first, and the help lines are here."
- **Still missing:** grandparents raising children, foster and adoptive homes, a child with a disability, a toddler and a teenager at one table, the parent who has never prayed aloud. **Size:** S each. **Status:** partly FIXED-IN-PENDING (#540).

### 19. Searching for "family devotions" does not find the family devotions (added in verification)
- **Where:** `/search` on both builds; `client/public/search-index.json`, `client/src/pages/Search.tsx`.
- **What a visitor sees:** a search for "family devotions" returns "How do we do family devotions?" (a Find Help page), the "Family Devotion Builder" and "Parenting is harder than anyone said". It does not return tonight's devotion, the year of devotions, or `/family`. "devotions for kids" and "bedtime prayer" give the same help page. "catechism" returns a how-to and two historic catechisms (Heidelberg, Westminster) but not "The Family Catechism" page. Single devotions are found only by their own title ("made on purpose" works). Screenshots: `verify-pend-search-catechism.png`, `verify-pend-search-devotions-for-kids.png`.
- **Why it fails:** these are the exact words a parent types. The index lists every devotion and every catechism question, but not the four family pages themselves (`/family`, `/family/tonight`, `/family/devotions`, `/family/catechism`). This is not a missing-database effect: these pages come from the committed index, not the database.
- **Fix:** add the four family pages to the search index with the words parents use ("family devotions", "devotions for kids", "bedtime", "catechism", "tonight"). **Size:** S. **Status:** LIVE-PROBLEM, STILL-OPEN-AFTER-PENDING.

### 20. The new topic page on handing the faith to kids is not linked from the family room (added in verification)
- **Where:** pending `/family` and the Family menu (`client/src/pages/Family.tsx`, `client/src/lib/siteNav.ts` on PR #540); `/topics/raising-children-in-a-secular-age`.
- **What a visitor sees:** the topic page "How do we hand the faith to our kids in a secular age?" links into the family room (Tonight, Table mode, the catechism). Nothing on `/family`, and nothing in the Family menu ("Start here: for families, Tonight at the table, The year of devotions, The family catechism, Family reading plans"), links back to it.
- **Why it fails:** it is the best plain-language "why and how" page for a parent, and a parent who came in by the Family door will never see it.
- **Fix:** one card near the top of `/family` and one line in the Family menu. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 21. A family cannot subscribe to the family material (added in verification)
- **Where:** `/subscribe` (both builds).
- **What a visitor sees:** "One serious essay a week. Written slow, sent once." and four choices: "I'm a skeptic", "I'm a Christian", "I'm a pastor", "I'm just exploring". No parent choice, and nothing that sends this week's devotion.
- **Why it fails:** the only thing that brings a family back each week is their own memory, or (pending) the "Remind me" calendar file. For "one place for families to go", a weekly note is the plainest way to bring them back.
- **Fix:** add "I'm a parent" to the choices and, when James is ready, a short Sunday note: this week's devotion, catechism question and memory verse, each one link. **Size:** S for the choice, M for the weekly note (needs James to decide the channel). **Status:** STILL-OPEN-AFTER-PENDING.

---

## Crisis pages: the path to real help holds

`/help` opens with "In danger or thinking about ending your life? Call or text 988, text HOME to 741741, or call 911." and lists 988, Crisis Text Line, the National Domestic Violence Hotline, RAINN and SAMHSA with tap-to-call links. `/help/parenting` has an "Exit site" button, "When to get more help", "never shake a baby", and "If your child has talked about wanting to die or about hurting themselves, call or text 988 now". Every eight-week plan opens with a care note and closes with the 988 line. No finding here beyond length: `/help/parenting` is 39 phone screens, though its jump links ("What to do this week") are on the first screen.

---

## Already strong

- **Table mode.** One part per screen, large type, Back and Next, the passage first. A parent can run it without preparing.
- **Length is honest.** A weekly devotion is about 260 words read aloud (about 325 on pending with both question sets); "About ten minutes" is true. A devotion prints to one page (checked).
- **The catechism's little-ones answers** are 3 to 16 words ("God made me."), and the twelve "Hard Questions Children Ask" answer what children really ask, without pretending ("We do not know everything, but we know God is always fair and kind.").
- **Tonight knows the calendar:** Thanksgiving week, Advent and Holy Week arrive on their dates.
- **Privacy is plain.** "It goes into your calendar, not to LiveWell." "This device will remember." No account.
- **The parenting care page** refuses the guarantee reading of Proverbs 22:6 and says so kindly.
- **Pending work that helps:** the Family door, Younger and Older questions, three short nights, "For the grown-ups", "If your table looks different", the topic page "How do we hand the faith to our kids in a secular age?", Remind me, and the 2027 reading plan.

---

## Needs James

1. The catechism on baptism and the Lord's Supper: "the sign God gives to mark his people", "members of God's covenant family", "we feed on him by faith". Is this what you teach? Which of each doubled answer stays?
2. One Bible wording for children: Berean Standard Bible, ESV, or another?
3. The two "world we live in" devotions (When the Grown-Ups Voted Differently; Praying for Leaders We Did Not Choose) are waiting for your read. Their weeks, November 8 and 15, have passed.
4. Study guides say "drawn from James Bell's book Raising Believers" and name ten other titles (After Christendom, Deep Roots, Mishpat, Consider the Birds, The Undivided Life, The Captive Church, Where Your Treasure Is, Character Before Competence, Alone in a Crowded Church, Believe). Only three books are on the Books page. Are the others published, and should the line stay?
5. Every study guide shows "Give a gift →" to a live Stripe link for training pastors. The decision log says no giving until you name who receives gifts. Keep or remove?
6. Which ages do you want named on the nightly devotion: add a 3-to-6 band?

---

## Verification (second reviewer, 2026-11-17)

Every finding was re-checked in Chromium at 390x844 against the live build (port 4311) and PR #540 (port 4312), and against the data files. New screenshots are named `verify-*.png` in the shots folder.

**Confirmed as written:** 1, 3, 4, 5, 6, 10, 12, 13, 14, 17, 18, and the crisis-page section. Details checked: the live phone menu ("Study, Essays, Books, Resources, About") and zero uses of "family" in the home page body; the five doubled catechism questions (8/64, 11/56, 21/58, 47/61, 48/62) and both baptism answers; "THIS WEEK — QUESTION 47" on both builds; the same devotion and "Start" button the next evening with "Last time: Taking Care Of What Is Not Yours, last night"; the Advent paraphrase and its notice, one question and no "Do" step; the single teen link to `/answers` (64.7 phone screens); "For teenagers 1" of 68 guides; 24 how-to files; the `/pathways/discipleship` dead end and "Sixty-two working Bible studies" (both builds); "619 files" and "FOR FAMILIES 1"; the tonight line at 1,145 px on a phone (977 px on a 1440x900 desktop, also below the first screen); `/studyguides/raising-believers` at about 102 phone screens and 15,500 words; "Give a gift" opening a live Stripe donation link on each study guide checked (three of 68); the eleven book titles named in the guides; a devotion printing to one page and the catechism to eight; all 72 pending "Younger" sets identical to the live "Together" sets; 12 "For the grown-ups" lines; the hotlines and tap-to-call links on `/help`; Exit site and the 988 line on `/help/parenting` (38.9 screens).

**Corrected:**
- **Finding 2 (wrong in part).** The report said the Builder "makes the parent build a 'term' of at least two weeks before anything appears". Not so: two taps (age, theme) give a full devotion; "Build a series" is optional. The main point stands: the only writing for ages 3 to 6 is in a separate tool, in the King James, and the nightly page never points to it.
- **Word counts.** The report's "275 to 369 words, about 320" matches the pending build (two question sets), not the live one. Live is about 230 to 300, about 260 on average. Table and strengths corrected.
- **Finding 7.** `/help/family-devotions` links to seven how-to guides, not four.
- **Finding 8.** The new-Christian plan is the 28th of 29 tiles, not the 29th. Added that search does find new-believer material.
- **Finding 9 (slightly overstated).** `/family` does explain the early Advent nights ("Advent has begun. The family Advent calendar starts Tuesday, December 1"); the devotion page does not.
- **Finding 11 (overstated in part).** "Foundations" in the counter is pending only (live says "Weekly devotions"). The catechism page already explains in plain words what a catechism is; the jargon is on `/family` only. Fix trimmed to match.
- **Finding 15.** Pending does link the 2027 plan, but only in the footer.
- **Finding 16.** Live says "62 pieces in all" and "and 34 more"; the report quoted the pending numbers.
- **Taps table.** The Builder is two taps inside the tool; "For families" is inside the Resources group of the phone menu.

**Not a missing-database effect:** none of the findings depend on the API. The family pages, catechism, plans, search index and study guides are all files in the build. The one thing the local servers cannot show is the PDFs, as the report says.

**Not checked:** the PDFs themselves, the Listen voice, the 1440 layout beyond the home page, and whether every one of the 68 study guides carries the gift line (three checked, plus the shared page code).

**Claims about other sites or about James:** the report makes none that need support. "ESV wording" for the study-guide memory verse (1 Samuel 1:27) is the reviewer's own knowledge of the translation and should be confirmed by James before anyone acts on finding 10.

**Added:** findings 19 (search does not find the family pages), 20 (the kids topic page is not linked from the family room) and 21 (no way for a family to subscribe).

**Score:** unchanged. Live 6 of 10, 7 of 10 with PR #540.
