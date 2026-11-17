# Mission fit: does the site do what James says it is for?

Audit of 2026-11-17, lens "mission-fit". Written for James.

**What was looked at.** The live site (the code of `origin/main`, served locally at port 4311) and the pending build of PR #540 (port 4312), both in a real Chromium browser at phone size (390 x 844). Screenshots are in `docs/work/audit-2026-11/shots/mission-fit/`. Facts about content come from the code and data files.

**What the sandbox could not show.** There is no database here. Essays that still live in the database (fifteen of the twenty on the live shelf) show "This essay didn't load" locally; on the real site they load. The portrait on the home page is a broken image here because its host is unreachable from the sandbox. Facebook, Substack and the other outside sites could not be opened. No finding below depends on any of these unless it says so.

**Scores, for this lens only.** Live site: **6 out of 10**. After PR #540 and the twenty essays waiting in PR #541 and `land-next`: **7 out of 10**. The material is deeper than the score. The score is low because a first-time visitor on a phone cannot see most of it from the front door.

---

## 1. The short answer

James, the site holds almost everything you listed. Counted from the data files: a Study Bible with notes on all 1,189 chapters, 62 doctrine studies, 22 church-history essays, 72 weekly family devotions, 40 seasonal ones, a 76-question family catechism, 4 family reading plans, 68 group study guides, 29 eight-week plans, 35 Honest Answers, 36 tools, 619 free printables, and three books. Very few ministry sites have this much, and none of it hides behind a sign-up.

What is not yet true is the sentence you gave me: "one place for families to go to read, to study." On the live home page, on a phone, four of your eleven goals have no door at all:

| Your goal | A door on the live home page? | Taps from home on a phone (live) | After PR #540 |
|---|---|---|---|
| 1. Living well in a post-Christian world | Headline only; no page explains it | none direct | 2 (Hard questions, then the first topic) |
| 2. Discipleship | No. The word is not on the page | none direct | none direct |
| 3. Church history | No. Named in the paragraph, not linked | 3 (menu, Study, Church history) | 3, unchanged |
| 4. Hard questions | No. Only in the footer | 1, after scrolling 5 screens | 1 |
| 5. Study the Bible | Yes | 1 | 1 |
| 6. Resources | One small line | 1 | 1 |
| 7. Books | Yes | 1 | 1 |
| 8. Family devotions | No | 3, with 5.5 screens of scrolling | 1 |
| 9. One place for families | No | same as 8 | 1 |
| 10. Intellectual readers | Essays door | 1 | 1 |
| 11. Facebook, Substack, contact | Substack in the footer; Facebook nowhere | Facebook: 2 taps and 8 screens | unchanged |

PR #540 fixes families and hard questions. It does not fix church history, discipleship, or the Facebook and Substack question.

**Is your vision stated on the home page in words a stranger understands?** Partly. The headline, "Learning to follow Jesus — and live well — in post‑Christian America," says the purpose. The paragraph under it names three things: "study the Bible in its context, learn the church's long history, and think through the hardest questions of our time." A stranger is not told that this is a place for his family tonight, that there are devotions for his children, that everything is free, or what "post-Christian" means. Your list to me had eleven things. The home page promises three and links one.

---

## 2. Findings, most important first

Each finding gives the place, what a visitor sees, why it matters, the fix, the size (S under an hour, M under a day, L more), and the status.

### F1. A parent cannot find family devotions from the live home page

- **Where:** `/` (`client/src/pages/Home.tsx`), the phone menu (`client/src/lib/siteNav.ts`).
- **What a visitor sees:** The home page's doors are "Study the Bible," "Read the essays," "The books." The word "family" does not appear in the body. The phone menu reads "Study, Essays, Books, Resources, About." To reach tonight's devotion she must guess "Resources," scroll 5.5 screens to the last section, tap "For families," then "Start." Screenshots: `live-mother-02-menu.png`, `live-mother-04-resources.png`.
- **Why it fails the goal:** You said "family devotions, disciple their kids ... one place for families." The best-built thing on the site for a household is the hardest thing to find.
- **Fix:** Merge PR #540. It adds a Family door to the header, a "Family devotions" door on the home page, and the line "Tonight at the table: Taking Care Of What Is Not Yours."
- **Size:** S (merge). **Status:** FIXED-IN-PENDING (PR #540).

### F2. The skeptic who searched "did the resurrection happen" lands on a notice, and the notice sends him to the wrong place

- **Where:** `/writing/did-the-resurrection-happen` (`client/src/components/RetiredEssayNotice.tsx`).
- **What a visitor sees:** "Did the Resurrection Actually Happen? James is revising this essay. It is off the site until the new version is ready. Read instead: Every Generation Was Sure It Was Right." Screenshot: `live-skeptic-01-essay-landing.png`.
- **Why it fails the goal:** He asked one question. The site has two strong answers to exactly that question (the Honest Answer at `/answers` and Test the Case at `/tools/test-the-case`, whose first screen is titled "Did the resurrection happen?"). The notice names neither. It offers an essay on a different subject. A skeptic reads that as the church changing the subject.
- **Fix:** Land the finished essay (PR #541 holds it). Separately, let the notice point to the matching Honest Answer or tool when one exists, so the forty essays still pending never dead-end a question the site can answer.
- **Size:** S to merge; S for the notice. **Status:** FIXED-IN-PENDING (PR #541) for this essay; the notice's wrong pointer is STILL-OPEN-AFTER-PENDING for every essay still waiting.

### F3. Church history has no door on the home page, live or pending

- **Where:** `/` in both builds; the hub is `/theology/history`.
- **What a visitor sees:** The home paragraph says the site will help you "learn the church's long history." No link follows. PR #540's five home doors are "Study the Bible, Hard questions, Read the essays, Family devotions, The books." On a phone the route is menu, "Study," "Church history": three taps, and the visitor has to guess that history is under Study.
- **Why it fails the goal:** You named church history twice in one paragraph of your request. It is the second thing the site is for and it is the one major library with no front door.
- **Fix:** Add a sixth home door, "Church history," with a plain line such as "Two thousand years in 22 essays, from Pentecost to today, with the creeds and the councils."
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### F4. Facebook is one link, eight screens down the About page; this is not yet a "one-stop place"

- **Where:** `/about`, `/contact`, the footer (`client/src/components/Footer.tsx`), `client/src/lib/channels.ts`.
- **What a visitor sees:** The footer has "Substack →" and nothing for Facebook. The home page has neither. `/contact` has an email address and a form, with no Facebook or Substack. The only Facebook link on the site sits under "Everywhere James is" on `/about`, 8.1 phone screens down: "Facebook → Short pastoral notes, most days. The largest room James writes into." `/connect` and `/substack` redirect away (to `/about` and `/subscribe`).
- **Why it fails the goal:** You asked for "a one-stop place for my Facebook, Substack, people to get a hold of me, my ministry." The data for it already exists in one file (`channels.ts`); it is shown in one place.
- **Fix:** Put a short "Find James" row (Substack, Facebook, podcast, Pastors Connection Network, ENDS, Contact) in the footer on every page and at the top of `/contact`, both read from `channels.ts`. Add one quiet line on the home page near the newsletter: "Also on Substack and Facebook."
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

### F5. The first phone screen is all text about the site; no door is visible for ten seconds

- **Where:** `/`, the hero (`.home-hero` in `client/src/index.css`, text in `client/src/lib/positioning.ts`).
- **What a visitor sees:** The headline, then two paragraphs that run past the bottom of the first screen. The first tappable door ("Study the Bible") starts at screen 1.2. Screenshot: `live-home-phone-fold.png`.
- **Why it fails the goal:** The ten-second test. A mother, a skeptic and a pastor each see a mission statement and a biography. None sees the word that names them. The sentence that would hold a skeptic ("after years as an atheist, so I know the objections from the inside") is below the fold.
- **Fix:** Keep the headline. Cut the hero to one sentence, and put the doors (or PR #540's Find field and tonight line) on the first screen. Move the biography paragraph below the doors or leave it to `/about`.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING (PR #540 adds the Find field, but below the same two paragraphs; the VISION.md prototype would address it).

### F6. "Post-Christian" is the headline and is never explained on the live site's front door

- **Where:** `/`; the essay `/writing/what-post-christian-means` (live); the topic page `/topics/living-after-christendom` (pending).
- **What a visitor sees:** "…in post‑Christian America." No link, no definition. A good essay exists on the live site ("What 'Post-Christian' Actually Means") but the home page does not point to it; the three essays it does feature are about blind spots, empire and Christian nationalism.
- **Why it fails the goal:** Goal 1 is the reason the site exists. An everyday reader does not use the phrase.
- **Fix:** Make the phrase in the headline, or the first line under it, a link to the page that explains it. After PR #540, that is the first topic on `/topics`: "What does it mean that America is post-Christian, and how do we live in it?" Also make that essay one of the three "Start with these."
- **Size:** S. **Status:** partly FIXED-IN-PENDING (PR #540 builds the page and a "Hard questions" door); the link from the headline and the "Start with these" choice are STILL-OPEN-AFTER-PENDING.

### F7. The three featured essays all lean one way, and none serves the family, the new Christian, or the doubter

- **Where:** `/`, "Start with these" (`startWith` in `client/src/lib/shelf.json`).
- **What a visitor sees:** "Every Generation Was Sure It Was Right," "When the Church Married Empire," "How Christian Nationalism Rewrites Doctrine." Directly below, the first book is "When God Bless America Replaces Thy Kingdom Come."
- **Why it fails the goal:** A first-time visitor concludes the site is mainly about politics and the church. That is one of your subjects, not the mission you described. A pastor deciding whether to recommend the site to his whole congregation sees three of four featured items on nationalism. The October critique said the same; it is still true in both builds.
- **Fix:** Choose three that span the mission: one on living after Christendom ("What 'Post-Christian' Actually Means"), one hard question ("Did the Resurrection Actually Happen?" once it lands), one from history or the Bible in its world. One line in `shelf.json`.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING. Needs your choice.

### F8. "Discipleship" has pieces everywhere and no path

- **Where:** `/plans`, `/tools` (Rule of Life Builder, Scripture Memory), `/family/catechism`, `/studyguides`, `/life`, `/study/bible/story`.
- **What a visitor sees:** No page or menu item uses the word "discipleship" for an adult. `/family` has the headline "Disciple your whole family, in one place," which is the only place the idea is named. The 69-guide Integrated Life library at `/life` (29 phone screens) is in no menu, no footer and no hub, live or pending.
- **Why it fails the goal:** You said "I want it to be discipleship." A new or growing Christian is offered a library, not a next step. Nothing says "start here, then this, then this."
- **Fix:** One page, "Grow as a Christian" or "Start here," with a short ordered path built only from what exists: read one Gospel with the notes, learn the Apostles' Creed, pick one eight-week plan, build a rule of life, memorize the first verses. Link it from the home page. Link `/life` from the Topics menu.
- **Size:** M. **Status:** STILL-OPEN-AFTER-PENDING.

### F9. A new Christian is handed the whole Bible, not a first step

- **Where:** `/study/bible` (15.4 phone screens), `/study/bible/john` (32 screens), `/study/bible/john/1` (13 screens).
- **What a visitor sees:** "Learn the whole Bible. Whether you have never opened it or have read it for years." Then "START HERE: The Story of the Bible ... in eleven acts," then all sixty-six books beginning with Genesis. On John 1 the first screen is the title, a "Reading / Greek" switch and a summary; verse 1 begins on the second screen. Screenshots: `live-newchristian-02-studybible.png`, `live-newchristian-05-john1.png`. The address `/study/bible/plans` answers "That book isn't in the Bible's table of contents."
- **Why it fails the goal:** "Where do I start?" is the new Christian's only question. Nothing on the page answers "Start with John" or "Start with Mark," though the family side already has a thirty-day plan through Mark. There is no adult reading plan on the live site at all.
- **Fix:** Add one line at the top of `/study/bible`: "New to the Bible? Start with the Gospel of John," linked to John's introduction, and offer the family plan "The Life of Jesus" (30 days in Mark) to adults too. PR #540's 2027 plan helps a committed reader; a beginner needs a 30-day start, not 365 days from Genesis.
- **Size:** S for the line, M for an adult starter plan. **Status:** partly FIXED-IN-PENDING (PR #540 adds "Read the whole story in 2027"); the beginner's first step is STILL-OPEN-AFTER-PENDING.

### F10. Church history "in depth" is a good survey, with two overlapping series in one list

- **Where:** `/theology/history` (18.4 phone screens; 19.1 in pending); essays in `client/public/history/essays/`.
- **What a visitor sees:** "The era essays. 22 essays, from Pentecost to the present." The list runs from "The Apostolic and Sub-Apostolic Age" to "The Modern Church and the Global Shift," then starts over at "ANCIENT · AD 30–313: The Apostolic and Persecuted Church." Those are two different series (fourteen newer essays, eight older ones) covering the same centuries twice. By my word count, fourteen of the twenty-two are between about 1,250 and 2,000 words; "The Great Councils" covers Nicaea, Constantinople, Ephesus and Chalcedon in about 1,280 words and "The Reformation" in about 1,270. Each lists four to seven books under sources but the text carries no footnotes.
- **Why it fails the goal:** You want people to "study church history" and you want the site to be "intellectual, academic." A serious reader finishes the Reformation essay in six minutes and has nowhere deeper to go on the site. The doubled list looks unedited.
- **Fix:** Show one series in one order; fold the older eight in as "A second reading of the same era" beneath their matching essay. Add at the end of each essay "Go deeper": the matching creed, councils, people, and the longer essays on the shelf (for example "When the Church Had Nothing to Lose," about 4,000 words). Longer treatments of the hinge moments (Nicaea, the Reformation) are new writing and yours to decide.
- **Size:** M for the arrangement; L for new depth. **Status:** STILL-OPEN-AFTER-PENDING (`land-next` adds an essay on Nicaea, which helps).

### F11. The About page contradicts itself and the Books page

- **Where:** `/about` (`client/src/pages/About.tsx`), `/books`.
- **What a visitor sees:** On `/about`: "Author of 21 books," "I have pastored First Baptist Church of Fenton, Michigan for twelve years," later "a pastor with fifteen years of mistakes behind him," and "21 books so far." On `/books`: "Three books. Every word mine." Both builds are identical here.
- **Why it fails the goal:** A pastor deciding whether to recommend the site reads About first. Twelve years or fifteen, twenty-one books or three: a careful reader notices, and the site's whole appeal to him is carefulness. The project notes also record that the site should not state your title, your years in ministry, or a book count, and this page states all three.
- **Fix:** Remove the counts and the years from `/about` (or give one true figure for each), and make the books sentence match the shelf.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING. Needs your word on the facts.

### F12. Your photograph is still in the home page hero

- **Where:** `/`, `home-hero__portrait` in `Home.tsx`, both builds.
- **What a visitor sees:** A small portrait beside "James Bell / About James" above the headline.
- **Why it matters:** The notes for 2026-10-28 record your decision: no photograph of you on the front page.
- **Fix:** Remove the image from the hero; keep the name and the About link.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING (the redesign prototype in VISION.md may already drop it; PR #540 does not).

### F13. Hard questions: the answers page is 65 phone screens long, and on the live site it is only in the footer

- **Where:** `/answers`; `/tools/test-the-case`.
- **What a visitor sees:** On the live site neither is on the home page or in the phone menu; "Honest answers to hard questions" is a footer link. The page itself lists 35 questions and then prints all 35 answers one after another: 64.7 screens on a phone. Screenshot: `live-skeptic-03-answers.png`.
- **Why it fails the goal:** "Answer hard questions" is goal 4, and these two are the best things on the site for a skeptic. One is hidden; once found, it is a wall.
- **Fix:** PR #540 gives it a home door ("Hard questions") and a menu place. Still to do: give each answer its own short page (better for search, where a question is exactly what people type), with the index page showing only the questions.
- **Size:** M. **Status:** door FIXED-IN-PENDING (PR #540); the length is STILL-OPEN-AFTER-PENDING.

### F14. Forty of the sixty essay addresses on the live site answer "James is revising this essay"

- **Where:** `/writing/*`, `client/src/lib/shelf.json` (15 marked live, 5 pending essays with finished rewrites, 40 still pending).
- **What a visitor sees:** For any of the forty: the title, then "James is revising this essay. It is off the site until the new version is ready." The entire Doubt section and the entire Ordinary Faithfulness section (marriage, fatherhood) have no essay live.
- **Why it fails the goal:** "Even intellectual readers" and "books to read" lean on the essay shelf. Today the shelf has nothing on doubt, suffering, marriage or fatherhood, the subjects an ordinary reader is most likely to search.
- **Fix:** Merge PR #541 and `land-next`; together they bring the public shelf from 20 to about 40. After that, the Ordinary Faithfulness section is the gap: none of its five essays is in either batch.
- **Size:** S to merge; L to write the rest. **Status:** mostly FIXED-IN-PENDING (PR #541, `land-next`); the marriage and fatherhood essays are STILL-OPEN-AFTER-PENDING.

### F15. The hub pages are very long on a phone

- **Where and how long (phone screens, measured):** `/downloads` 64, `/justice/timeline` 54, `/life` 29, `/studyguides` 23, `/study/bible/doctrines` 21, `/theology/history` 18.4, `/study/bible` 15.4, `/help` 14.4, `/family` 14 (15.8 in pending), `/tools` 12.5, `/family/devotions` 12.5.
- **Why it fails the goal:** "Normal, everyday" readers on a phone do not scroll fifteen screens to see what a page holds. The October critique measured the same pages; none has shortened, and `/family` has grown.
- **Fix:** One screen of clear choices at the top of each hub, the long lists behind "See all." Start with `/family` and `/study/bible`, the two a new visitor meets first.
- **Size:** M each. **Status:** STILL-OPEN-AFTER-PENDING.

### F16. Books: three, clearly presented, but "books to read" stops at your own

- **Where:** `/books`, the books band on `/`.
- **What a visitor sees:** "Three books. Every word mine. ... The opening of each book is free to read. The rest costs $8.99." Below: "Looking for a book that used to be here? I took the rest of the shelf down to rewrite it in my own hand."
- **Why it matters:** Honest and well said. But if "books to read" in your request also means what a growing Christian should read next, the site has no reading list. Each history essay names four to seven sources; they are not gathered anywhere.
- **Fix:** If you want it: one page, "Books worth your time," built first from the sources your history essays and doctrine studies already cite, a line on each in your words. Only titles you have read.
- **Size:** M, and it needs you. **Status:** STILL-OPEN-AFTER-PENDING.

### F17. Search labels are database words

- **Where:** `/search`.
- **What a visitor sees:** The filters "ALL / ARTICLES / RESOURCES." The search itself has improved since October: "did the resurrection happen" now returns the Honest Answer first, then the study guide on the evidence. Screenshot: `live-skeptic-02-search.png`.
- **Fix:** Name the filters for what people look for: Bible, Questions, History, Family, Essays.
- **Size:** S. **Status:** STILL-OPEN-AFTER-PENDING.

---

## 3. Your eleven goals, one by one

**1. Living well in a post-Christian world.** Exists: the essay `/writing/what-post-christian-means`; the After Christendom section of `/writing` (two essays live); the history essay `/theology/history/after-christendom-era` (about 4,600 words); the `/nation` library of fourteen pages, in no menu; `/life`, 69 guides, in no menu; the eight-week plans. Finding it from home: there is no direct door (F6). Finished? The writing is strong; the arrangement is scattered. Pending: PR #540 adds `/topics/living-after-christendom` and puts it first on `/topics`. Missing: a link from the headline, and a place in the menus for `/life`.

**2. Discipleship.** Exists: 29 eight-week plans (`/plans`), the Rule of Life Builder and Scripture Memory (`/tools`), 68 study guides (`/studyguides`), the catechism, the Study Bible. Finding it: no door, no word (F8). Finished? The parts are; the path is not built. Missing: an ordered "start here" for an adult.

**3. Studying church history.** Exists: `/theology/history` (22 essays, councils, people, heresies, a timeline), `/resources/creeds` (full texts with notes), `/theology/traditions` ("Why are there so many churches?"), `/justice/timeline`. Finding it: three taps, by guessing "Study" (F3). Finished? A solid survey; short on the hinge moments; two series in one list (F10). Pending: an essay on Nicaea in `land-next`; a verified source corpus in PR #540 that is groundwork, not yet reading.

**4. Answering hard questions.** Exists: `/answers` (35), `/tools/test-the-case` (nine cases, each move with objections the reader can press), `/help` (34 pages in a person's own words), the book *Believe*. Finding it: footer only on live (F13); one tap in pending. Finished? Yes, and good. Missing: the Doubt essays (in PR #541), and a page per answer.

**5. Studying the Bible.** Exists: `/study/bible`: an introduction to all 66 books, notes on all 1,189 chapters, Greek and Hebrew under the words, 62 doctrine studies, 24 reading guides, the story in eleven acts, 41 context guides. Finding it: one tap, the first door. Finished? Chapter notes are complete; the site says honestly that verse-by-verse notes are "written for Genesis and the four Gospels so far." This is the deepest thing on the site. Missing: a beginner's first step (F9). The reading surface itself is another auditor's lens.

**6. Resources.** Exists: `/resources`, `/downloads` ("619 files, free, nothing gated"), `/tools`, `/plans`, `/how-tos`. Finding it: one tap from a small line, "Also here, all free: tools, eight-week plans, and printables." Finished? Yes. The trouble is length (F15), not lack.

**7. Books to read.** Exists: `/books` and three book pages; free openings; $8.99 ebooks; ten free Hard Issues booklets for church leaders. Finding it: one tap. Finished? For your own books, yes. No wider reading list (F16).

**8. Family devotions and discipling kids.** Exists: `/family/tonight` (opens this week's devotion: read, talk, ask, do, remember, pray, with a "Start at the table" mode), 72 weekly devotions, readings for Thanksgiving week, Advent and Holy Week, the 76-question catechism with an answer "for the little ones," four reading plans, printable cards. Finding it: the worst route on the live site (F1); one tap in pending. Finished? Yes. This is the most complete answer to any of your goals.

**9. One place for families.** The `/family` page says it: "Disciple your whole family, in one place." The home page does not. Fixed for the door by PR #540; the page is 14 screens and growing (F15).

**10. Intellectual and academic readers.** Exists: the essays, Greek and Hebrew, the doctrine studies, creeds in full, sources named on history essays. Finding it: one tap to essays. Finished? The shelf is thin until the pending essays land (F14); history is survey-length (F10); no footnotes in history essays. The voice already sounds like your writing. Whether it "matches your Substack" visually I could not check; Substack is unreachable from here.

**11. One stop for Facebook, Substack, contact, ministry.** Exists: `/about` (story, the church, PCN, ENDS, the podcast), `/contact` (form and email), `/speaking`, `/subscribe` (the form hands the reader on to Substack). Finding it: Substack is a footer link; Facebook is one link deep in About; Contact is three taps through the menu on a phone. Not finished (F4, F11).

---

## 4. Five first-time visitors, on a phone, on the live site

### A mother who wants a devotion for tonight

1. **Home.** She reads "Learning to follow Jesus — and live well — in post‑Christian America," then two paragraphs. Nothing says family, children or tonight. She scrolls: "Study the Bible," "Read the essays," "The books." (`live-mother-01-home.png`)
2. **Menu.** "Find Help for What You Are Facing, Study, Essays, Books, Resources, About." No Family. (`live-mother-02-menu.png`) Most mothers leave here.
3. **Resources,** if she guesses. Downloads, Hard Issues booklets, tools, plans. "For families" is the last section, 5.5 screens down. (`live-mother-04-resources.png`)
4. **Family.** Now it is exactly right: "Disciple your whole family, in one place. Devotions you can actually do with your kids." A card: "TONIGHT AT THE TABLE. Taking Care Of What Is Not Yours. 1 Corinthians 4:2 · About ten minutes. Start." (`live-mother-05-family.png`)
5. **Tonight.** Read, Talk, Ask, Do, Remember, Pray, with "Send to my phone," "Print," and "We did this tonight." (`live-mother-06-tonight.png`)

**Where she gets lost:** steps 1 to 3. **Does the home page tell her in ten seconds this is for her?** No. With PR #540: yes, on the second screen ("Tonight at the table" and a "Family devotions" door); it would be better on the first.

### A skeptic who searched "did the resurrection happen"

1. **He lands on `/writing/did-the-resurrection-happen`.** "James is revising this essay. It is off the site until the new version is ready. Read instead: Every Generation Was Sure It Was Right." (`live-skeptic-01-essay-landing.png`) Most skeptics leave here.
2. **If he tries the search,** the Honest Answer comes first: "The resurrection is the best historical explanation of facts nearly all serious scholars — skeptical ones included — already grant. Not a proof. The best explanation." That is the right tone for him. (`live-skeptic-02-search.png`)
3. **`/answers`.** "The questions people actually ask. ... Written by a pastor who was an atheist first, so the questions get taken seriously, not managed." Then 65 screens. (`live-skeptic-03-answers.png`)
4. **Test the Case,** if he ever finds it (it is under Resources). "You can walk away unconvinced at any point and I will not chase you." Each move ends with "What this move does not settle." This is the best page on the site for him. (`live-skeptic-04-test-the-case.png`)
5. **Home,** if he goes there. A believer's headline; the atheist sentence is below the fold.

**Where he gets stuck:** step 1. **Does the home page tell him this is for him?** Not in ten seconds. The sentence that would is in the second paragraph.

### A new Christian who wants to start reading the Bible

1. **Home.** "Study the Bible" is the first door. One tap. Good.
2. **The Study Bible.** "Learn the whole Bible. Whether you have never opened it or have read it for years." Welcoming. Then "START HERE: The Story of the Bible ... in eleven acts," and sixty-six books from Genesis. (`live-newchristian-02-studybible.png`) He does not know whether to open Genesis or John.
3. **"New to the Bible? Guides and Tools."** Good guides: "What the Bible Is," "How the Books Were Chosen." These explain the Bible; they do not tell him what to read tomorrow morning. (`live-newchristian-06-guides.png`)
4. **John.** A fine introduction, 32 screens long. (`live-newchristian-04-john.png`)
5. **John 1.** A "Reading / Greek" switch, a passage box, a summary; verse 1 on the second screen. (`live-newchristian-05-john1.png`)

**Where he gets lost:** step 2, by too much. **Bored:** step 4. **Does the home page tell him this is for him?** Close: "Study the Bible" is plain. Add "new to it? start here" and it does.

### An intellectual reader who wants church history in depth

1. **Home.** He reads "learn the church's long history." No link. The essays door mentions "the long history of the faith."
2. **Menu, Study, Church history.** Three taps.
3. **The hub.** "The story you were born into. ... the councils that fixed the creeds you confess." Twenty-two essays, the list doubling back at "ANCIENT · AD 30–313." 18.4 screens. (`live-history-04-history.png`)
4. **"The Great Councils."** Well written: "They were arguments about words. They were not small." About 1,280 words, four key figures, four sources, no notes. He finishes in six minutes. (`live-misc-01-era.png`)
5. **The creeds.** Full texts with notes: this is the depth he wanted, and it is a separate menu item with nothing in the essay pointing to it. (`live-history-07-creeds.png`)

**Where he gets bored:** step 4, by brevity, not by quality. **Does the home page tell him this is for him?** The tone does. The doors do not.

### A pastor deciding whether to recommend the site

1. **Home.** He sees seriousness, no pop-ups, no stock photographs. He also sees three featured essays and a lead book on nationalism (F7), and wonders how that will sit with half his congregation.
2. **About.** "Lead Pastor, First Baptist Church of Fenton ... Author of 21 books." A strong, honest story: "If you do not believe any of this, I am not going to pretend your reasons are stupid." Then twelve years, then fifteen, then twenty-one books (F11). (`live-about-full.png`)
3. **Study guides.** "Teach the hard things well. ... Run a class on Sunday with no prep." Sixty-eight guides with leader's notes, free. This is what earns the recommendation. (`live-pastor-05-studyguides.png`)
4. **Downloads.** "619 files, free, nothing gated." (`live-pastor-06-downloads.png`)
5. **What he looks for and does not find:** a short statement of what you believe. The site confesses the creeds and prints them in full, but no page says in a paragraph "this is where James stands," which is the first thing a pastor checks before he hands a site to his people.

**Where he hesitates:** steps 1 and 2. **Does the home page tell him this is for him?** It names the Pastors Connection Network. It does not tell him there are 68 ready-to-teach guides for his people, which is the reason he would share it.

---

## 5. What is already strong

- The headline states the mission in one line, in your words.
- The family side: tonight's devotion, the year of them, the catechism with an answer for small children, printable cards. Complete, warm, and usable at a real table.
- The Study Bible's reach: every book introduced, every chapter with notes, and an honest note about what is still being written.
- Test the Case and the Honest Answers treat a skeptic as intelligent. "I will not chase you."
- Everything is free and says so; no pop-up, no gate.
- Find Help is one tap from every page, with the crisis lines first.
- The Books page tells the truth about why there are three.
- Search now answers a real question with the right page first.
- The pending work goes straight at the worst gaps: families, hard questions, and the missing essays.

---

## 6. Questions only James can answer

1. Should the home page have a Church history door (F3)? I recommend yes.
2. Which three essays should a stranger meet first (F7)?
3. What may `/about` say: your title, the years, the number of books (F11)? Twelve or fifteen? Twenty-one or three?
4. The photograph in the home hero: remove it, as you said on 2026-10-28 (F12)?
5. Do you want a "Books worth your time" list of other authors (F16)?
6. Do you want a short "What I believe" page for pastors?
7. Should Facebook and Substack sit in the footer of every page and on the home page (F4)?
