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
| Length of a weekly devotion | 275 to 369 words, about 320 on average; the talk is 100 to 142 words | same |
| Question sets | one set of three, "Together" | Younger (about 4 to 10) and Older (about 11 to 17), 72 of 72 |
| Seasonal daily sets | Thanksgiving week 7, Advent 25, Holy Week 8 (40 days) | same |
| Catechism | 76 questions in six parts, each with a grown-up answer, a "little ones" answer (3 to 16 words), a verse, a note, a prayer | same |
| Family reading plans | 4: Life of Jesus (30 days), Heroes and Promises (30, younger kids), Psalms (30), Foundations (21, families new to faith) | same |
| Devotion Builder | 10 themes x 4 age bands (3-6, 7-11, 12-18, mixed) = 40 pieces | same |
| "For the grown-ups" lines | none | 12 of 72 devotions |
| "World we live in" devotions | none | 2 written, switched off until James reads them |
| Family and parenting how-to guides | 24 | 24 |
| Eight-week plans / study guides / care pages | 29 / 68 / 40 | same |

Ages named anywhere: toddler to young adult in the Parenting Stage Guide; 3 to 18 in the Builder; 4 to 17 on the nightly devotion (pending only).

---

## The parent's evening, tap by tap

| Task | Live | With #540 |
|---|---|---|
| Home to tonight's devotion | 4 taps: Menu, Resources, scroll to "For families", Start. The word "family" is not on the home page above the footer, and not in the phone menu. | 1 tap on "Tonight at the table: Taking Care Of What Is Not Yours." But that line sits 1,145 px down a phone, below the first screen. Or Menu, Family: 2 to 3 taps. |
| Do it | Table mode: six screens (Read, Talk, Ask, Do, Remember, Pray), large type, Back / "1 of 6" / Next. Works well. | Same, plus Younger / Older questions |
| Find the catechism | same 4 taps, then one more | Menu, Family, The family catechism |
| Something for a five-year-old | Only the Builder's "Young children (3-6)" | Same. "Younger" questions are not written for five |
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
- **Why it fails:** a four-year-old cannot answer these, and the parent is left translating in front of the child. The site's real writing for ages 3 to 6 is in the Builder ("What is one thing you are happy God gave you today?"), which covers ten themes, quotes the King James ("whithersoever thou goest"), and makes the parent build a "term" of at least two weeks before anything appears.
- **Fix:** add a "Little ones (about 3 to 6)" band to each devotion: one sentence, one question, one thing to do. Start by moving the Builder's young band into the ten matching devotions, and relabel today's "Younger" as about 7 to 10. **Size:** L (62 new short sets to write). **Status:** STILL-OPEN-AFTER-PENDING.

### 3. The site has nothing to say on the second night
- **Where:** `/family/tonight`, `/family`, `pages/family/DevotionPage.tsx`.
- **What a visitor sees:** after tapping "We did this tonight": "Done. This device will remember that you did this one tonight." The next evening the same devotion returns with the same "Start" button.
- **Why it fails:** there is one devotion a week, and the page never says so. A parent who had a good night comes back and is handed last night again. Nothing tells them what to do next.
- **Fix:** when this week's devotion is done, change the card to "Done this week. The next one comes Sunday" and offer the rest of the week from what exists: this week's catechism question, today's day in a reading plan, the memory verse. Remember which of the three short nights (pending) a family has done. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 4. The catechism asks five questions twice, with different answers, and a new family starts at question 47
- **Where:** `/family/catechism`, `client/public/family-catechism.json`, `lib/familyCatechism.ts`.
- **What a visitor sees:** question 47 "What is baptism?" with "Baptism is a sign that I belong to Jesus." Question 61 "What is baptism?" with "Baptism is a sign that we belong to God and are washed clean by Jesus." The same happens with 8 and 64, 11 and 56, 21 and 58, 48 and 62. This week every family, new or not, is shown question 47, and it will sit under an Advent reading too.
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
- **What a visitor sees:** nothing. Guides exist on praying with your kids at bedtime, reading the Bible with young children, using a family catechism, keeping Lent and Easter, a family screen covenant, apologizing to your kids, talking to your kids about sex. Only `/help/family-devotions` links to four of them.
- **Why it fails:** these answer the parent's first question, "how do I even start?", in plain words.
- **Fix:** a "How to" shelf on `/family`, and "How to use a catechism" at the top of the catechism page. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 8. An adult has no marked road from new to mature
- **Where:** `/`, `/topics`, `/plans`, `/plans/new-believer`, `/start`, `/study`.
- **What a visitor sees:** no door or link says "new here" or "new to faith". `/start` is a three-question quiz that no header or footer link reaches. "I'm a new Christian. What do I do now?" is the 29th tile on `/plans`, under the kicker "FIND HELP · CARE PLANS", as if new faith were a hard season. Its last line is "← Find help for something else". The pending `/topics` page does not mention the new Christian.
- **Why it fails:** James wants "discipleship". The pieces of a road exist (Eight Weeks of Beginnings, the Foundations family plan, the New Believers study guide, Eight Weeks With an Open Bible, the 2027 whole-story plan, the doctrine studies), and nothing joins them. The earlier critique's line still holds: every learning page is a shelf and none is a syllabus.
- **Fix:** one page, "New to faith, or coming back", that sets those pieces in order, linked from Home and the footer. Then a "What next" block at the foot of every plan, devotion, study guide and self-check naming one next step. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 9. The church year stops at three seasons, and Advent is dated December 1
- **Where:** `/family/tonight`, `/family`, `lib/familyYear.generated.ts`.
- **What a visitor sees:** on Sunday November 29, 2026, the first day of Advent, the devotion is headed "December 1 · Genesis 3:15", and it stays for three nights. `/family` says "Advent · December 1 to 25". On December 27 the family is back at "Made On Purpose", week 1. There is nothing for Lent, the weeks after Easter, Pentecost, or the days after Christmas, and nothing for a baptism, a birthday, a death in the family or the first day of school.
- **Fix:** label the set "Day 1" in place of a date on the nights before December 1 (S). Then a short Lent set and an Easter week (L, needs writing). **Status:** STILL-OPEN-AFTER-PENDING.

### 10. Four different Bible wordings in the family room
- **Where:** weekly devotions (Berean Standard Bible), seasonal days (paraphrase), the Builder ("Scripture quotations are from the King James Version"), study guides (memory verse "For this child I prayed, and the Lord has granted me my petition", which is ESV wording).
- **Why it fails:** a child memorising a verse needs one wording. The King James for ages 3 to 6 is the hardest of the four.
- **Fix:** one translation for everything read aloud to children; James decides which (the earlier critique's question 2). **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 11. Words over a parent's head
- **Where and what:** the browser title of `/family` is "Family Discipleship — Devotions, Apologetics, and Parenting". The catechism is introduced as "in the New City Catechism tradition" before anyone says what a catechism is. The devotion carries three counters, "72 of 72 · Foundations · Week 47 of the year" ("Foundations" is also the name of a reading plan). Titles are in capitals a child reads oddly: "Taking Care Of What Is Not Yours". The read-aloud talk turns to the adults mid-paragraph: "Parents, this lands on us first."
- **Fix:** title "Family devotions, the catechism, and help for parents"; one plain sentence ("A catechism is a set of questions and answers a family says aloud until they know them"); one counter; sentence-case titles; set parent asides apart from the read-aloud text. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

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
- **What a visitor sees:** four lists of days with tick buttons and "N days read". No start date, no "today is day 6", no reminder, no plan for teenagers, and no link to "Read the whole story in 2027".
- **Fix:** "Start today", show today's day first, add the Remind me button the devotion already has, link the 2027 plan. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 16. The bottom of the family page is a mis-sorted pile
- **Where:** `/family`, "EVERYTHING ON THIS · Home and family life · 63 pieces in all". The page is 14 to 16 phone screens.
- **What a visitor sees:** "Is 2 Chronicles 7:14 a Promise to America?", "Alone in a Crowded Church", "Evangelism: A Bible Study on Sharing Your Faith" filed as family reading, then "and 35 more — search the whole site", which opens an empty search box.
- **Fix:** hand-pick eight pieces that are about the home, and make "more" open a filtered list. **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### 17. For the small-group leader and the pastor
- **Strong:** 68 study guides, each with a leader's guide, a handout, a script and PDFs; a "When someone in the group is carrying this" block that hands the leader the right care page.
- **Problems:** a guide page is about 100 phone screens (`/studyguides/raising-believers`, 15,500 words) with leader and participant text on one page. There is no page that tells a pastor how to give the family devotions to his church (a weekly sheet, a card with a code, a line for the bulletin). Guides name books that are not on the Books page (see "Needs James").
- **Fix:** tabs or separate pages for leader and participant; one "For your church" page. **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### 18. Homes that are still not named
- **Fixed in pending:** "If your table looks different" (On your own; Between two homes; Beside a spouse who does not believe), with "If you are afraid of someone at home, your safety comes first, and the help lines are here."
- **Still missing:** grandparents raising children, foster and adoptive homes, a child with a disability, a toddler and a teenager at one table, the parent who has never prayed aloud. **Size:** S each. **Status:** partly FIXED-IN-PENDING (#540).

---

## Crisis pages: the path to real help holds

`/help` opens with "In danger or thinking about ending your life? Call or text 988, text HOME to 741741, or call 911." and lists 988, Crisis Text Line, the National Domestic Violence Hotline, RAINN and SAMHSA with tap-to-call links. `/help/parenting` has an "Exit site" button, "When to get more help", "never shake a baby", and "If your child has talked about wanting to die or about hurting themselves, call or text 988 now". Every eight-week plan opens with a care note and closes with the 988 line. No finding here beyond length: `/help/parenting` is 39 phone screens, though its jump links ("What to do this week") are on the first screen.

---

## Already strong

- **Table mode.** One part per screen, large type, Back and Next, the passage first. A parent can run it without preparing.
- **Length is honest.** Weekly devotions average about 320 words; "About ten minutes" is true.
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
