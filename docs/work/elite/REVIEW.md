# The whole site, walked once as a stranger (unit "review", 2026-11-18)

Branch `elite/review`. Built with sitemap and prerender, served as Vercel serves it (`scripts/serve-like-vercel.mjs`, port 4490), walked with Playwright at 390x844, then 1440x900, day and night (night by the `dark` class; App.tsx keeps night off for visitors on purpose). Screens: `/home/user/elite-shots/review/`.

## What I walked

- Every address in the catalogue (88, at phone size, each with its label, H1, title, overflow and errors read) and every link on /explore (115; the 31 not in the catalogue opened too).
- The five visitors from Home, using only what was on screen.
- Every door's menu on the phone sheet and on a laptop; the seven door pages and five more pages day and night on a laptop; eighteen inner pages on a phone.
- The interactive pieces: the shelf of 66, the history timeline, the ask box (ten questions, below), tonight at the table, the catechism card, a /start road ticked and reloaded (it stays ticked), the tools find box (eight words), Read and Study on John 1, the seven-step walk on John 1 and Psalm 23, Find James.

## The five visitors, taps from Home

| Visitor | Before | After |
|---|---|---|
| Mother: tonight's devotion | 1 (the "Tonight at the table" link in the hero) | 1 |
| Skeptic: the resurrection | 2 by the search box (type, Enter, tap the answer). Typing the question into Home's "Ask it straight" was a dead end: "No question uses that word yet" | 2 by search; 1 by "Ask it straight", which now finds the answer to a whole question |
| New Christian: read the Bible | 3 (Study the Bible card, "the Gospel of John", a chapter). The card was named for a different page | 3, the card named for where it goes |
| Serious reader: church history with sources | 2 (Church history, Start at lesson 1) | 2 |
| Pastor: reach James | 1 ("Write to James" at the foot of Home) or 3 by the menu (About, Contact) | same |

Off the five roads: the four reading paths under Tools (Small group study guides) were dead ends; now each is one page of study guides in order.

## What I fixed

1. **Four dead ends.** `/reading-paths/skeptic`, `doubt`, `marriage`, `parenting` showed "That path isn't here". They now read `client/public/reading-paths/index.json` word for word and link each stop to its study guide (`pages/reading-paths/GuidePath.tsx`, tested).
2. **The ask box.** Whole words only ("real" no longer finds "really"); a Find Help page steps behind an Honest Answer as good as it, unless the words call for help, when it steps ahead; two pages added to what it matches (Where Christians differ, How to pray). The suffering answer got the words people use for it (`askedAs`, matching only; its text is untouched). Home's picker matches a whole question the same way and shows the first answer it finds. The ten questions are a test in `hq.test.tsx`.
3. **Home's speed.** The cost was one React render of about 400 ms (at 8x CPU) right after the static hero, which is most of Lighthouse's blocking time on a slow runner. On "/" only, the first render is now a transition, so React works in short slices behind the static hero that is already on screen. The latest-writing row no longer wakes the browser's locale data (`toLocaleDateString`, `localeCompare`) on a first visit. At 8x CPU: 88-91 before, 97-100 after (blocking time 390-470 ms to 90-200 ms). The CI command: 100, 100, 100 (three runs of three).
4. **Labels that named a door the site no longer has.** Nine pages opened with "Study ·" (compare, creeds, doctrine, glossary, how to use the doctrines, more questions, search, traditions, a verse in context); each now names its door (Questions, History, Bible) and its catalogue name. The eight-week plans say Tools, not Find help.
5. **One name per page.** Home's lead card "Study the Bible" opened the Study Bible; it says "Read the Study Bible". "Guides to reading it" is "Guides to reading the Bible" in the menu, on /study and on the Study Bible front. Search's Main Pages now take the catalogue's names ("Hard questions", "Where Christians differ", "Bible background"...), and its /connect entry describes Find James as it is. The topic pages and topics rows call five tools by their tool-list names, and the money self-check calls itself Financial Health Self-Check.

## What I left, and why

- **About twenty-five inner pages still wear the old look**: a charcoal block, a paragraph or two, no plate, a label in an old style or none (/life, /how-tos, /wisdom, /plans, /studyguides, /theology/compare, /theology/glossary, /theology/questions, /help, /downloads, /my-library, /family/reading-plans, /search, /compare/*, /faq/* and most /tools/* pages). Moving each into PageHead is a page-top unit's work, more than an hour, and some of their H1s are slogans ("Faith at the family table", "Every word, explained plainly.") where the rule asks for the plain name; whose words those are is not mine to decide.
- **The essay page (80-84)** was left. Its LCP of 4.2 s is the held prerendered text being replaced by the real page; the simulation then counts the whole bundle. I tried rendering held pages as a transition too: the essay went to 83-84, but a Study Bible chapter's LCP moved later, so it was taken back out. A real gain needs the essay's own HTML to stay the painted text (as Home's static hero does).
- **Night mode** stays off for visitors, as App.tsx says. Under it the old charcoal heroes lose their H1 (their text is `var(--bone)`, which turns dark). The door pages and kit pages are right at night.
- **The reading path pages** score SEO 92: like every page without its own prerendered file they carry Home's canonical in the shell. They are not in the sitemap.
- **The comparison table** on /theology/compare shows an empty first column on a phone.
- **Mustard as a button fill** on /wisdom and the book pages.
- Tool page titles that differ from the tool list (listed by the tools unit for James).

## Honest scores, as a stranger would feel them

| | Score | What still separates it from a 10 |
|---|---|---|
| Finding things | 8 | Seven clear doors, /explore and search agree on names now. A quarter of inner pages still look and label themselves like an older site, so a visitor feels the seam. |
| Bible study | 8 | Reader, notes, word search, Greek and Hebrew, the seven-step walk, highlights. No second translation side by side; poetry is laid out from punctuation; notes' author unnamed. |
| Church history | 8 | One course with a timeline and people; sources on cards. Eight essays tell the same era twice; several quotations are unchecked against their sources. |
| Hard questions | 7 | 35 straight answers and an ask box that now finds the right one. Many questions people ask (death, prayer as a doubt, other religions) have no page of their own; the answers vary widely in length. |
| Family | 8 | Tonight in one tap, the table in three steps, the catechism card. The doubled catechism questions and the voice of the devotions wait for James. |
| Discipleship | 7 | /start's five roads remember progress. Past the roads there is no plan that carries a new Christian week to week except the reading plans. |
| Design | 7 | Home and the seven doors are distinctive and consistent. Inner pages are not yet, and night mode is unfinished. |
| Speed | 8 | Home is fast even on a slow runner now; chapters and essays are slower (80-90) on Lighthouse's phone. |

## What I ran, watched pass

- `pnpm check`: pass.
- The 34 content-gate commands in ci.yml, each run: 0 failures.
- `pnpm test`: 140 files passed, 7 skipped; 1620 tests passed (two tests updated to the new names, two added).
- ESLint on changed files: no errors (warnings in untouched lines of TheologySearch and PassageContext were there before).
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass ("Every audited page canonicalises to itself").
- Lighthouse, the CI command on Home, three times: 100 / 100 / 100 (accessibility 100, CLS 0). At 8x CPU: 97, 98, 100.
- Lighthouse medians (local): chapter 88 (the same as the branch before this unit, measured again on a clean copy), essay 80, /topics 93, /theology/compare 92, /study 94, /reading-paths/skeptic 89; accessibility 100 on all of them.

## Not verified

- A real phone, Safari, or a screen reader.
- GitHub's runner itself: the speed claim rests on local runs at 4x and 8x CPU.
- Anything that needs the database (essays from the database, the theology quiz, latest writing with real rows).

## Findings in full (from the walk)

**Must**: M1 the four reading paths (fixed); M2 the ask box's first results (fixed); M3 Home's picker dead end on a typed question (fixed); M4 Home's speed on a slow runner (fixed).

**Should**: S1 "Study ·" labels (fixed, and the longer label kept on one line); S2 Home's lead card name (fixed); S3 old tool names (fixed); S4 search names and /connect (fixed); S5 "Guides to reading it" (fixed); S6 old-look inner pages (left); S7 tool pages' labels (left); S8 slogan H1s (left); S9 "Context and creeds" opens /study (left, for James); S10 tool titles (left, for James); S11 essay speed (left); S12 compare table's empty column (left); S13 reading path canonical (left).

**Consider**: night mode on old heroes; mustard fills; "John 1" in Cormorant reads "John I"; Study Bible pages label themselves "The Study Bible" while doors say "Bible"; /about's portrait is an outside image; "What happens when we die?" opens the resurrection answer (no page on death and hope); "I feel like giving up" finds nothing and is not a crisis phrase (the box offers search and Find Help).

## For James

Sorted by how much it matters. Merged from every unit note; duplicates removed.

1. One set of facts the site may state about you (title, years, book count), or the word to state none.
2. Are these true as written: "I built an atheism at nineteen", "For most of my life I was an atheist", "They were right about the church I was leaving", and the first-person lines in the history essays ("I was one of the ones", "I was trained inside this era", "The Baptist church I pastor is congregational...")?
3. Is your church part of the Southern Baptist Convention (so "my convention" can return to the American history essay)?
4. A few sentences of your own: the marked places on every Find Help page, a remembered moment in the plans, four or five devotions, and the endings of four history essays.
5. Contact messages are saved to the admin inbox and not emailed: do you read that inbox, or should a mail service be set up?
6. The doubled catechism questions (8 and 64, 11 and 56, 21 and 58, 47 and 61, 48 and 62) and the baptism and Lord's Supper wording.
7. Which Gospel a new Christian starts with: /start says John, your eight-week plan says Mark.
8. Which series is the history course (the fourteen shorter essays now, the eight longer as "Go deeper"), and whether to keep one telling of each era.
9. Quotations printed as exact that nobody has checked against a source (Nagel, Hearst, Christian Smith, Wesley's journal, Polycarp, the Ninety-five Theses, the Rule of Benedict, Lincoln, Kepler, "Jesus spoke about money more than heaven and hell"), and four numbers that disagree between essays.
10. Mark's date disagrees between the book's short line (late 50s to 60s) and its introduction (late 60s to early 70s).
11. Seven Hard Issues booklets are off the site because they name the Pastors Connection Network: send corrected files or leave them off; whose name goes on their copyright line.
12. The five books no longer on the shelf can still be bought at their old addresses, and paid ebook files can be downloaded by address: keep or switch off.
13. Eleven study guides say "drawn from James Bell's book ..." naming books not on the shelf: keep the line?
14. Your portrait on /about loads from an outside address: send the photograph, or say if "no photograph" should mean /about too.
15. The podcast's https address, the church's web address, two or three sentences on ENDS in your words, and confirm ENDS stays and its address is right.
16. Confirm the Substack feed address, and whether a pace ("one essay a week") should be stated; that line still appears in several sign-up boxes.
17. Whether to show Facebook or Substack posts on the site (supply them or approve an embed); today they are links.
18. Who is named as author of the Study Bible notes.
19. Which voice description governs: the saved Substack profile or the voice statement kept with the site.
20. One Bible wording: the site rule says ESV; the plans, Find Help, family devotions and catechism quote the Berean Standard Bible, the Devotion Builder the KJV.
21. Where your three facts (atheism, raised without a father, five sons) should appear: which eight or ten answers keep the atheist past, which Find Help pages.
22. The political-party answer needs one concrete sentence about the left, in your words; the two anxiety answers pull against each other; one length for all Honest Answers.
23. Home's "Context and creeds" card opens /study ("Study the Bible"); it could open Bible background alone, and the line under the headline could come back.
24. Whether Home keeps both "Latest writing" and "Start with these"; the order of the steps on /start; the five road names.
25. Names and wording that are yours: the Questions groups, "Guide" as a label, /skeptics' line, the door "Topics" or "Questions", "the table" as a phrase, tool page titles that differ from the tool list, whether the folds of tools are right (a yes or no per row), the Theology Quiz (rewrite or retire).
26. Inner page H1s that are slogans ("Faith at the family table", "Every word, explained plainly.", "The questions you actually came with."): keep, or use the plain page name with the line under it.
27. Speaking still offers "Writing and ghostwriting" and ends "A network of pastors who have been through the same"; About keeps "How the writing works"; the Believe page's large line and third-person blurb; "I wrote all three of these myself." in place of "Three books. Every word mine."
28. Devotions: the Trinity apple, "Let today feel heavy. It was." on Good Friday, Easter's closing line, three titles ("The Thief of Glad", "What You Are Made Of", "A Glimpse of the Mender"), contractions on family pages, and the new line "tell a grown-up you trust".
29. The family page pull quote, the teen line "written for adults, so read them together", the retelling under the Bible text, and the chooser's lists.
30. Polycarp's words in two translations; "Books behind this essay" as a label; printing translators' names on source cards.
31. "Verdict" 22 times in the plans; "which bears David's name"; "he" or "He" for God; "eight week" or "eight-week".
32. The essay's top no longer offers Send to my phone or Print before the text; block quotations stay in Cormorant italic.
33. Whether Scripture is set in the serif face, and whether a hard question's answer sits one tap under it or open.
34. The infertility plan's "and I've helped hold it up", the family-devotions Find Help ending, and the fatherless page's sentence about your sons.
35. Two Bible-door rooms the map still points elsewhere: a single timeline and a single people list (decision 5); whether the witnesses lists join the people page.
36. Put livewellbyjamesbell.co/connect (or /james) in your Facebook, Substack and podcast profiles.
