# The Tools door: audit and rebuild plan

Date: 2026-11-20. Branch `elite/tools`. This run changed no code and no site content. It walked every tool on the live site (www.livewellbyjamesbell.co) with Playwright at 390 and 1440 wide, read every tool's source and data, checked every verse record in the tools against the Berean Standard Bible text in the repo, and checked the research and history claims it could against outside sources.

James, 2026-11-20: "Also, I want you to really expand the tools section. Find tools, keep the tools that really work. I feel like there's a lot of tools, but not all of them are necessary. If they think there's better tools that you would create that would be more fitting, create those. You can eliminate ones that you don't think are useful or fitting. I like the Bible wisdom ones, but the ones you're going to keep, I want you to expand them, make them exhaustive, make them more interactive, make them more professional, elite, world class, thorough."

Screenshots: `docs/work/elite/tools-shots/` (nine). The full set (190, start and result of each tool at both widths) is outside the repo at `/home/user/elite-shots/tools/`.

---

## 1. What is there

`client/src/lib/toolsList.ts` holds 40 entries: 33 listed and 7 folded (live at their address, listed nowhere). Two more tool pages sit outside the list: Saved Items (`/tools/saved`) and the start quiz (`/start/quiz`, owned by /start). Four pastor tools were already retired before this run (`/tools/sermon-outline`, `/tools/pastor-burnout`, `/tools/church-health`, `/tools/discipleship-table`, each a redirect to /tools). So the audit covers **42 pages**.

Baseline on the live site, all 42 plus /tools, /assessments and /wisdom, at both widths: no script errors, no horizontal scroll, and no form control without a label. Those are good. Everything below is about what the tools say and do, not whether they load.

### Where the Scripture in the tools comes from

A script compared every verse record (a reference with its text) in the tools against the BSB files in `client/public/bible/text/`.

| Source | Verse records | Exact BSB | Other |
|---|---|---|---|
| `client/public/wisdom/topics.json` (Wisdom Finder, /wisdom, /wisdom/:id) | 1,040 | 1,040 | 0 |
| Emotional Health, Spiritual Gifts, Financial Health | 17 | 16 (one an exact excerpt) | 0 |
| Verse Finder (folded) | 100 | 11 | 89 NIV-like or paraphrase |
| Bible Reference, "Misused Bible Verses" | 77 | 2 | 75 NIV-like, joined across verses, or paraphrase |
| Bible On (folded) | 72 | 3 | 69 mixed |
| Proverbs in 31 Days | 62 | 2 | 60, ESV wording ("Wine is a mocker, strong drink a brawler") |
| Memorize Scripture | 40 | 7 | 33 NIV wording ("Do not be anxious about anything, but in every situation") |
| Conflict Guide | 40 | 6 | 34 NIV wording |
| Parenting Verses (folded) | 30 | 0 | 30 ESV wording |
| Family Devotion Builder | (not parsed) | | prints "(KJV)" on screen |

The pages label this honestly ("The verse text here has not been checked word for word against one translation"), which is better than silence, but a reader memorizing a verse should not be told the words may be wrong. The BSB was placed in the public domain on 30 April 2023 (berean.bible, licensing and terms pages), so moving every tool to the repo's BSB text both fixes accuracy and removes any question of quotation permission. **Rule for every rebuilt tool: Scripture comes from `client/public/bible/text/` by reference at build time, never typed by hand.**

---

## 2. The standard

A tool earns a place on the Tools door only if it meets all six:

1. **It forms.** It moves symptom, cause, wisdom (CLAUDE.md, Formation Standard). It is not a personality quiz that hands back a label, it does not make the reader surer of their side (the certainty trade), it does not flatter a tribe, and its result is not a four-step takeaway box.
2. **The result is worth a week.** A thoughtful adult would act on it or think about it for days, and the result depends on the answers given, not a paragraph anyone would get.
3. **It is honest about its reach.** No diagnosis. On law, money and medicine it informs and says plainly it is not advice. Wherever a person might be in danger, the crisis path is on screen.
4. **It is grounded.** Scripture verbatim (BSB from the repo), with the reference, in context. Any psychological or sociological framework is real and named correctly, or it is not there.
5. **It is the best free version.** A person could not get the same thing better for free elsewhere, or it is the version that carries this site's depth (history, steelman, the church's long memory).
6. **It is a tool.** It does something with the reader's input: choosing, answering, writing, keeping a place. A long article with an accordion is a reading and belongs in a door's reading, not in Tools.

---

## 3. Every tool, sorted

KEEP means keep and rebuild in the shared shell (section 6). MERGE names the survivor. RETIRE means a one-hop permanent redirect in `vercel.json`, a `redirectTo` stub in `App.tsx`, the page file left in the repo, and the entry removed from `toolsList.ts` (so `site-structure.test.ts`'s "never redirects any tool in the registry" still holds). MOVE means the page stays where it is, unredirected, but is listed by another door instead of Tools.

### Study

| Tool | Verdict | Reason |
|---|---|---|
| Read the Study Bible (/study/bible) | MOVE (Bible door) | It is the Bible door's main room, not a tool. Tools links to it; it stops counting as one of the tools. |
| Search the Bible (/study/bible/search) | MOVE (Bible door) | Works well (whole-Bible search in the browser). It belongs beside the Study Bible. |
| What Does the Bible Say About What I Am Facing? (/tools/wisdom-finder) | **KEEP, flagship** | The best asset in the door: 208 topics, 1,040 verses all exact BSB, each with the world the text was written in, how the church has read it, and what it means now. Its weakness is matching and depth (section 4). |
| Misused Bible Verses (/tools/bible-says) | MERGE into the Wisdom Finder, then RETIRE to /tools/wisdom-finder | Fifteen topics that all exist among the 208. Its real value, the "common misuses" and "interpretive range" sections, becomes a layer on those fifteen entries. It also has the live bugs: the H1 reads "About…" literally, emoji icons off the design, and three names for one page. |
| Memorize Scripture: 40 Key Verses (/tools/scripture-memory) | **KEEP** | A real tool with five recall modes and a place kept. Needs BSB text, spaced review, and a larger, better chosen set. |
| Theology glossary (/theology/glossary) | MOVE (Questions door) | A reference page, already listed by Questions. |
| Quotes From the Essays and Books (/tools/quotes) | MOVE (Essays door) | 399 lines from James's own writing, filtered to public essays. Useful, but it is the essays' shelf of lines, not a tool for the reader's life. |

### Tools for hard questions

| Tool | Verdict | Reason |
|---|---|---|
| Test the Case for Christianity (/tools/test-the-case) | **KEEP** | Exactly this site's work for the skeptic: nine cases, one move at a time, push back with your own objection, and each move says what it does not prove. Its named sources check out (section 9). Grow it to the full set of the skeptic's questions and tie each move to the Honest Answers. |
| What Shapes the Way You Read the Bible? (/tools/which-lens) | MERGE with the both-sides check into a new **Examen of loyalties** (section 5), then RETIRE to it | Fair in both directions and self-implicating, but the result is a label ("The Flag", "The Cause"), which is the personality-quiz shape the standard refuses, and the forced two-way choices are admitted by the page itself to be "most of them unfair". |
| Do You Hold Both Sides to the Same Standard? (/disruption/consistency) | MERGE into the Examen of loyalties, then RETIRE to it | The strongest prose in this group (an examen in the old sense, a mirror not a weapon), but it is an accordion of thirteen questions with nothing to answer, so it is not yet a tool. |
| Where Christians differ (/theology/compare) | MOVE (Questions door) | A reading library of steelmanned views, already listed by Questions. |
| Which view do I lean toward? (/theology/which-view) | MERGE into Where Christians differ, then RETIRE to /theology/compare | Six careful quizzes on second-order questions with every view stated in its own voice. They work best as the last step on each comparison page ("where do you lean, now that you have read all three?") rather than as a separate tool. |
| How Close Is Each Party to the Bible? (/nation/scorecard) | Off Tools. **James to decide** (section 8) | Not a tool: it takes no input. It is James's own judgment, theme by theme, with a tally (4 Left, 0 Center, 3 Right) printed right after "No team scores highest", and red, orange and green dots that read as grades. Recommended: keep the page as a reading in /nation without the tally or the traffic lights. |
| What Would a Biblical Government Look Like? (/nation/policy) | MOVE (/nation reading) | Nine laws of Moses read for the principle beneath them, indicting right and left alike. Good reading, no input. It belongs in /nation. |

### Check yourself

| Tool | Verdict | Reason |
|---|---|---|
| Where Are You With God? (/diagnostic) | MERGE into the Whole-Life Assessment as its short form, then RETIRE to /life/assessment?length=short | Very good: a crisis question before results, a plain reading that names ordinary causes and refuses to equate a low score with lost faith, a "start here" area, history, change answers. But it measures a subset of the Whole-Life Assessment's five domains. One check in two lengths is clearer than two checks. |
| The Whole-Life Assessment (/life/assessment) | **KEEP, as the Life Check** | Thirty statements in five domains (Inner Life; Body and Rhythms; Home and Relationships; Work, Money and Calling; Life in the World), yearly, with a map and real books (Augustine, Scazzero, Comer, Warren, Butterfield, Brother Lawrence, Alcorn). It becomes the frame the other checks hang from. |
| Marriage Health Self-Check (/tools/marriage-assessment) | **KEEP, as a Life Check module** (Home) | Careful: safety question first, domestic violence path near the top, couple mode, history. One fix is required: its "leave a copy with us" posts answers to /api/contact. Every other check says nothing leaves the device. Remove it. |
| Emotional Health Self-Check (/tools/emotional-health) | **KEEP, as a Life Check module** (Inner Life) | Strong crisis care ("talk with a real person this week", 988, a doctor first) and honest about what a score cannot know. |
| Financial Health Self-Check (/tools/financial-health) | **KEEP, as a Life Check module** (Work and Money) | Says plainly it is not financial advice and names the right professionals (nonprofit credit counselor, fee-only planner). |
| Spiritual Gifts Self-Check (/tools/spiritual-gifts) | **KEEP, as a Life Check module** (Life in the World) | The best of the checks: asks what you have done, not what you are like; says gifts are confirmed by the church; and states the cessationist and continuationist positions fairly. |
| Theology Quiz (/tools/theology-quiz) | RETIRE to /start (and re-point /quiz to /start). **James to confirm** | Recommends essays James has taken down (including the three "What Christians Can Learn From..." pieces, which now open a "taken down" notice), shows "12 min min read", sorts the reader into the site's own "primary pillar", has three names, and is the only tool that needs the server (`quiz.getQuestions`). /start already does the job of "where should I begin". |

### Pray and practise

| Tool | Verdict | Reason |
|---|---|---|
| Prayers for When You Have No Words (/tools/prayer-generator) | **KEEP, rebuilt as Pray the Psalms** (same address) | Generates nothing: twelve fixed written prayers. The need is real; the Psalms are the Bible's own answer to it. |
| The Prayer Planner (/tools/prayer-planner) | MERGE into Pray the Psalms as its "People I pray for" part, then RETIRE to /tools/prayer-generator | A working list of names by day. It belongs in the one prayer tool, not beside it. Its storage key carries over. |
| The Worry Journal (/tools/worry-journal) | MERGE into Pray the Psalms as the evening practice, then RETIRE to /tools/prayer-generator | Writing tonight's worries down and handing them over (1 Peter 5:7) is prayer. One tool with three doors in is clearer than three tools. |
| A Plan for When You Feel Alone (/tools/connection-planner) | **KEEP** | Small, kind, specific, and safe (988 on screen, "this is a planner, not counseling"). Rebuild in the shell; no new content needed beyond Scripture on friendship from the Wisdom library. |
| Build a Weekly Rhythm of Prayer and Rest (/tools/rule-of-life) | **KEEP, rebuilt as Rule of Life and Sabbath** | A checklist of practices today; it should become a week you can see, print and keep. |
| Proverbs in 31 Days (/tools/proverbs-31) | **KEEP, rebuilt as the Wisdom Books Explorer** (same address) | Two verses a day in ESV wording, labeled unchecked. Proverbs has 915 verses and the Study Bible already has notes on all 31 chapters. |
| Work Through a Fight in Five Steps (/tools/conflict-guide) | **KEEP** | Useful and specific (each kind of fight has its own questions and "what not to do"). NIV text, and "--" for dashes throughout. Rebuild with BSB and link from the Marriage module. |

### For families (listed by the Family door)

| Tool | Verdict | Reason |
|---|---|---|
| Family Devotion Builder (/tools/family-devotions) | KEEP (Family door) | Fills a gap the 72 devotions do not (ages 3 to 6, teens). Move its KJV text to BSB. |
| The Parent and Teen Conversation (/tools/parent-teen-conversation) | KEEP (Family door) | Kept in the tab only, by design, for a shared device. Good. |
| What Your Child Needs at Each Age (/tools/parenting-guide) | KEEP (Family door), with a sourcing pass | Sound pastoral sense, but its statements about development ("six-to-ten-year-olds develop a fierce sense of fairness") are unattributed. Each claim is either tied to a real, named source or rewritten as pastoral observation. |

### Listed by another door

| Tool | Verdict | Reason |
|---|---|---|
| Read any verse in context (/theology/passage) | MOVE (Bible door, already) | Unchanged. |
| Bible background (/resources/context) | MOVE (Bible door, already) | Unchanged. |

### Folded (live, listed nowhere): retire now that James allows it

| Tool | Verdict | Redirect to |
|---|---|---|
| What the Bible Says About Money, Anger, Work (/tools/bible-on) | RETIRE | /tools/wisdom-finder |
| Bible Verse Finder (/tools/verse-finder) | RETIRE | /tools/wisdom-finder |
| Parenting Bible Verses (/tools/parenting-verses) | RETIRE | /tools/wisdom-finder |
| Book-by-Book Bible Study (/tools/deep-bible) | RETIRE | /study/bible. My Library still reads its notes (`lw-deep-bible`); keep that reading so nobody loses notes. It also holds the one unattributed claim found (section 9). |
| How to Study a Book of the Bible (/tools/bible-study) | RETIRE | /study/how-to-study (the same job, done better) |
| A Quick Check on Eight Areas of Life (/tools/life-audit) | RETIRE | /life/assessment. My Library reads its history key; keep that. |
| Theological Vocabulary (/tools/glossary) | RETIRE | /theology/glossary. It also carries off-palette purple, teal and brown category colors. |

### Outside the list

| Page | Verdict | Reason |
|---|---|---|
| Saved Items (/tools/saved) | MERGE into My Library, then RETIRE to /my-library | My Library already links here to show saved verses and prayers in full; show them there instead. |
| Start quiz (/start/quiz) | Unchanged | Owned by /start, not Tools. |

**Count:** 14 kept and rebuilt (6 of them Bible wisdom or prayer tools, 5 life-check parts, Test the Case, the connection planner, the conflict guide), 3 family tools kept, 8 merged, 9 retired outright (the 7 folded, the Theology Quiz, Saved Items), 9 moved to another door.

---

## 4. "The Bible wisdom ones"

**Which tools these are.** The site names one family of pages "Bible Wisdom": /wisdom's own title is "Bible Wisdom for Money, Work, Anger, Marriage", and its hub sends readers to three things: the Wisdom Finder (/tools/wisdom-finder), "What the Bible says about" (the folded /tools/bible-on), and Proverbs in 31 Days. All of them, plus the 208 /wisdom/:id entry pages, read one file, `client/public/wisdom/topics.json`, or link into it. The folded Verse Finder and Parenting Verses and the "Misused Bible Verses" page do the same job with older data. So the Bible wisdom tools are taken to be: **the Wisdom Finder and its 208 entries, /wisdom, Proverbs in 31 Days, and the older verse-by-topic tools they replaced.** This is the group the plan builds first.

**What was found in them.**

- The library is the strongest content on the door. 208 topics, each with a framing paragraph, the world the text was written in, how the church has read it, what it means now, five verses and related pages. All 1,040 verses match the BSB word for word. They draw on 52 books; Psalms (151) and Proverbs (126) lead, and the wisdom books are about a third of all verses.
- Every topic has exactly five verses. That is a template, not a judgment: grief and money deserve more; "Being Reliable" may need fewer.
- Matching is word matching. "My son has walked away from the faith" finds A Wayward Child first (right) but lists The Resurrection among the closest. "I was passed over for promotion and I am bitter" puts Self-Pity first, ahead of envy, work, or bitterness. Nonsense input gets an honest "no close match" and the full list, which is right.
- Verses are shown alone. The Study Bible has notes on every chapter and the passage index has "Go deeper" files for each chapter; none of it is reached from an entry, so a reader gets the verse but not the context the site already wrote.
- The verse of the day ends mid-sentence ("healthy and green they will remain,"), because Psalm 92:14 runs into verse 15.
- Proverbs in 31 Days gives two verses a day out of 915, in ESV wording, with a note that the text is unchecked, and one "carry it into the day" question that ends in a period.
- The older verse tools mix NIV, ESV and KJV wording (table in section 1).
- One historical claim was checked outside the repo: Monica's bishop telling her that a son of so many tears could not be lost is Augustine, Confessions III.12. Correct.

---

## 5. New tools, at most eight

None needs an account, a server procedure, AI at run time, or data leaving the device. Each is content-as-data under `client/public/`, built by a script, held by a validator.

| # | Tool | For | What the person does | What they get |
|---|---|---|---|---|
| N1 | **Bible Reading Planner** | Christians, seekers | Picks what to read (a book, a Testament, the Gospels, the whole Bible, the Story path), days a week, and minutes a day | A plan sized by the BSB's real verse counts, "Day 6 of 30", today's reading opening the Study Bible, a printable chart; missed days never counted against them |
| N2 | **The Wisdom Books Explorer** (rebuild of Proverbs in 31 Days) | All four | Reads Proverbs by date or by theme (speech, money, work, anger, friendship, laziness, pride, the fool, the king, the family), then Ecclesiastes, Job and James by theme | Every proverb on a theme in one place, in context, with the Study Bible's note; "proverbs are patterns, not promises" taught where it matters |
| N3 | **Pray the Psalms** (rebuild of the prayer tool) | Christians, doubting Christians | Says what kind of day it is (grief, fear, guilt, anger, thanks, waiting, joy); is led to psalms of that kind; writes a prayer in the psalm's own movement; keeps a list of people and a bedtime worry page | A prayer in their own words shaped by a psalm, a list of names by day, and the evening practice |
| N4 | **The Doubt Map** | Skeptics, doubting Christians | Picks the question that is actually pressing (and how it presses: intellectual, moral, experiential, a church wound) | A route: the right Honest Answer, the Test the Case case, the study guide, and Find Help if the doubt is grief or harm |
| N5 | **Examen of loyalties** (merge of Which Lens and the both-sides check) | Christians, pastors | Answers the thirteen tests honestly, marking "this is me", "sometimes", "not me" | No label. The tests they marked, each with the Scripture beneath it and the essay that takes it further, and a printed page to pray through |
| N6 | **Rule of Life and Sabbath** (rebuild) | Christians, seekers | Builds a week: fixed prayer times, a Sabbath day they can keep, practices for each area | A week on one page to print, a Sabbath plan (what stops, what starts), kept on the device and revisited |
| N7 | **A Decision Walk-Through** | Seekers, Christians | Names a decision where no command reaches (a job, a move, a relationship) and works through it in stages over days | A one-page record of the decision: what Scripture forbids or requires, the counsel sought, motives examined, the options weighed, and what they will do |
| N8 | **Small Group and Sermon Companion** | Pastors | Picks any chapter | A discussion sheet built from that chapter's Study Bible notes, the passage index and the site's seven-step study method, ready to print for a group |

The family conversation deck from the brief is folded into the Family door's work (it would draw on the 76 catechism questions and the devotions), not added here; the door is already full.

---

## 6. The door and the one shell

### Rooms (six)

| Room | Address | What is in it |
|---|---|---|
| Bible wisdom | /tools#wisdom | Wisdom Finder; Wisdom Books Explorer; Memorize Scripture; Reading Planner |
| Pray | /tools#pray | Pray the Psalms (with the prayer list and the evening worry page) |
| Check your life | /tools#check | The Life Check (short and full) and its four modules: Inner Life (emotional health), Home (marriage), Work and Money (financial), Gifts |
| Hard questions | /tools#hard-questions | Test the Case; the Doubt Map; the Examen of loyalties; a link to Where Christians differ |
| Rhythms and decisions | /tools#rhythms | Rule of Life and Sabbath; the Decision Walk-Through; Work Through a Fight; A Plan for When You Feel Alone |
| Plans and guides | /plans, with study guides and downloads inside | Eight-week plans, small group study guides (with the Companion for pastors), downloads |

The family tools stay on the Family door with one line on /tools pointing there, as now. `siteCatalog.ts` takes these six rooms; `siteCatalog.test.ts` checks the counts.

### The shell every tool shares

This answers the review's "three quizzes, three looks". Build it once in `client/src/components/tool-shell/`, then move each tool into it.

- **Top:** `PageHead size="inner"` with the tool's one name from `toolsList.ts`, the job line, the time, and "What this keeps: ..." in plain words. For checks, the not-a-diagnosis line sits here, once.
- **One question card:** one statement or question at a time on a phone (several per screen at 1440 for the long checks), the answer scale as full-width buttons at least 44px tall, `role="radiogroup"` with arrow keys, the number keys 1 to 5 as shortcuts, focus moved to the next question's heading.
- **One progress pattern:** "Question 7 of 30 · Home and relationships" in text plus a thin bar; a "Back" link; the place kept through `lib/storage.ts` (`livewell-progress-<tool>`), and "Pick up where you left off" on return.
- **One safety step:** for every check that can touch despair or danger, the shared question already used by the Diagnostic and Marriage check ("In the past two weeks...") before results, skippable, never saved.
- **One result layout:** a plain-words reading first (what your answers suggest, what they do not mean, the ordinary causes, what to do first), then the areas as a chart drawn in the palette (ink bars on cream, mustard only for the one area marked "start here"), then Scripture in context, then two or three next steps by subject. Actions in one row: "Change my answers" (keeps every answer), "Print", "Send to my phone" (`TakeItWithYou`), "Start over". Past results in "Since the last time", kept only on the device.
- **One print pattern:** a print stylesheet that drops the site chrome and prints the result as one or two clean pages with the date, the Scripture and the next steps; no answers printed unless the reader ticks "include my answers".
- **Tokens only:** no hex in the shell; mustard under 8% of any screen (the scan in this run found mustard backgrounds under 1% on every tool page today; the shell keeps it that way on results, where the review found it overused).

---

## 7. Build specifications

Size is given in runs (one agent run, built, checked and committed). Every tool: content-as-data under `client/public/<tool>/`, a `scripts/build-<tool>-index.mjs` where a manifest is needed, a `scripts/validate-<tool>.mjs` added to the CI content gates, Scripture pulled from `client/public/bible/text/` by reference, `SEOMeta` with string literals, and a route smoke test that passes by name.

### 7.1 Wisdom Finder (KEEP, flagship): 3 runs

- **Content to be exhaustive:** keep the 208 topics; add about 40 missing situations found by reading Find Help's 40 needs and the Honest Answers' 35 questions against the topic list (examples to check: infertility, miscarriage, caring for a parent with dementia, pornography, gambling, a church split, losing faith in a leader, chronic pain, a prodigal parent, moving to a new town). Verses per topic set by need, 4 to 12, not fixed at 5. Each verse carries a "read it in context" range (the paragraph it sits in) drawn from the BSB file. Add the 15 "common misuses" and "interpretive range" sections from Misused Bible Verses to their matching topics, rewritten in the current voice. Each topic gains links to the chapter notes for each verse (the files exist under `client/public/bible/notes/`), the Honest Answer and Find Help page where one fits.
- **Matching:** a keyword and phrase index built at build time (`scripts/build-wisdom-index.mjs`): each topic's keywords, synonyms and common phrasings ("passed over", "laid off", "can't forgive"), weighted; plus "Did you mean..." showing three topics with a one-line framing so the reader picks. Test set of 150 plain sentences with expected topics in `validate-wisdom.mjs`; the build fails if fewer than 90% land in the top three.
- **Interaction on a phone:** one box ("Tell us in your own words"), chips for common struggles, then the entry: framing, Scripture (each verse expandable to its paragraph and the chapter note), the world it was written in, how the church has read it, what it means now, "Often misread" where it applies, then next steps. Save a verse or the whole entry; copy a verse with its reference.
- **Output:** a printable entry (one page) and a "carry this" card with one verse and one sentence.
- **Persistence:** saved entries and verses, `livewell-wisdom-saved`, read by My Library.
- **World class means:** the best topical Bible tools let you search by situation and show verses in context with cross-references; the best study Bibles add notes and background. This one does both and adds the church's memory and an honest "often misread". No other free tool joins situation, verse in context, notes and history.
- **Accessibility:** results announced in a live region with the count; every verse expander a real button with `aria-expanded`.

### 7.2 Wisdom Books Explorer (rebuild of Proverbs in 31 Days, same address): 3 runs

- **Content:** all 915 verses of Proverbs, 222 of Ecclesiastes, 1,070 of Job (read in its speeches, not as proverbs), 108 of James, tagged by theme. About 25 themes for Proverbs (speech, money, work and laziness, anger, friendship, the fool, pride and humility, the king and justice, family and children, sexual faithfulness, wealth and poverty, wisdom personified, the fear of the LORD, and others), each verse tagged by hand in a JSON file and checked by a validator that every verse in the four books is tagged at least once or marked "narrative" (Job's frame, Ecclesiastes' prologue). The 31 chapter notes already in the Study Bible are linked; a short essay per theme draws the thread through the verses.
- **Interaction:** three ways in: "Today" (the chapter for the date, as now, but the whole chapter), "By theme" (all the verses on one theme, in book order, each with its chapter link), and "By book". A tap on any verse shows its neighbors.
- **Teaching:** a fixed panel on reading proverbs as patterns, not promises (Proverbs 26:4 and 26:5 side by side is the classic case), and on Ecclesiastes and Job as wisdom that argues with simple wisdom.
- **Output:** a printable theme sheet; "carry one line" into the day, saved.
- **Persistence:** chapters read and saved lines, `livewell-progress-wisdom-books`.
- **World class means:** the best Proverbs-by-topic studies collect every proverb on a subject; few connect them to Job and Ecclesiastes' pushback. This one does, with notes on every chapter.

### 7.3 Pray the Psalms (rebuild of the prayer tool, same address): 3 runs

- **Content:** all 150 psalms classified by kind (lament, individual and communal; thanksgiving; praise; trust; penitential, the traditional seven: 6, 32, 38, 51, 102, 130, 143; royal; wisdom; songs of ascents, 120 to 134; and the cursing psalms, handled with a note on why they are in the Bible), each with the situations it fits and its movement marked by verse ranges. The frame for laments, the complaint, the turn to trust and the vow of praise, is widely taught; Walter Brueggemann's reading of the Psalms as orientation, disorientation and new orientation (The Message of the Psalms, 1984) may be named as one reading, verified against the book before it is quoted. The twelve existing written prayers stay as "Prayers for when you have no words".
- **Interaction:** "What kind of day is it?" (eight choices) leads to two or three psalms; the reader reads one, then writes a prayer in its movement with prompts drawn from the psalm's own lines; the list of people (from the Prayer Planner, its data migrated) and the bedtime worry page (from the Worry Journal) are the other two doors.
- **Output:** a printable prayer with the psalm beside it; the list printed by day of the week.
- **Persistence:** prayers written, the list, the worries, each in its own key through `lib/storage.ts`; the old keys read once and moved.
- **World class means:** the best prayer apps keep a list and remind; the best Psalms guides teach the forms. This joins both and teaches prayer from the Bible's own prayer book rather than a generator.
- **Care:** the grief and fear doors carry the Find Help link and 988.

### 7.4 Memorize Scripture: 2 runs

- **Content:** about 120 verses and passages in themed sets (who God is, the gospel, identity in Christ, fear and anxiety, temptation, grief, guidance, the church, the Psalms most worth knowing: 23, 46, 51, 103, 121, 139), all BSB from the repo; plus "add your own" by reference (the text is fetched from the BSB file, so it is always right).
- **Interaction:** the five recall modes kept; a spaced review schedule (a verse returns after 1, 3, 7, 14 and 30 days if recalled, sooner if missed), a "Today's review" queue, typing or speaking the verse aloud with a self-check.
- **Persistence:** `livewell-progress-scripture-memory` with each verse's next review date.
- **Output:** printable cards, four to a page.

### 7.5 The Life Check (Whole-Life Assessment, with Diagnostic, Emotional, Marriage, Financial and Gifts as parts): 4 runs

- **Content:** keep every statement and every result text in the five tools; the short form is the Diagnostic's eight questions; the full form the thirty; each domain offers its module ("Go further on the inner life", and so on). Result text already does symptom, cause, wisdom; keep it.
- **Interaction:** choose short or full; the shell's card, progress, safety step and result.
- **Output:** the five-domain chart (the review's "four-bar chart" request, now five), the "start here" area, the module invitations, printable.
- **Persistence:** each part keeps its current keys; history shown together in "Since the last time".
- **Required fix:** remove the Marriage check's "leave a copy with us" (`EmailResults`, posts to /api/contact).
- **Care:** every module keeps its crisis and not-advice lines word for word.

### 7.6 Test the Case: 2 runs

- **Content:** from nine cases to about twenty, chosen from the Honest Answers' 35 questions and the skeptic's reading path (examples: the problem of divine hiddenness, the Old Testament violence passages, science and miracles, the exclusivity of Christ, the reliability of the Old Testament, religious experience, the church's own crimes). Each move names what it does not prove; each case ends with the strongest objection still standing; each links its Honest Answer.
- **Sources:** every named scholar checked against the primary text, as the existing ones were (section 9).
- **Persistence:** where you stopped in each case (now kept), plus "objections you pressed".
- **Output:** a printable case summary with the objections you raised and the answers given.

### 7.7 The Doubt Map (new): 2 runs

- Data: each of the 35 Honest Answers, the Test the Case cases, the relevant study guides and Find Help pages, tagged by kind of doubt (intellectual, moral, experiential, a church wound, grief). The reader picks the question and how it presses; the map shows a route of two to four pages in order. No storage beyond the last route.

### 7.8 Examen of loyalties (new, merging two): 1 run

- The thirteen tests from the both-sides check, the thirteen scenarios from Which Lens rewritten as "this is me / sometimes / not me", Scripture under each (Proverbs 11:1 on the false balance, Matthew 7:3 to 5, and so on, from the BSB), no lens name in the result. Answers stay on the device. Flag for James (section 8).

### 7.9 Rule of Life and Sabbath: 2 runs

- Keep the five areas and their Scripture anchors; add a week grid (morning, midday, evening by day), a Sabbath plan (what stops, what starts, who it is with), drawn from Exodus 20:8 to 11 and Deuteronomy 5:12 to 15 (where the reasons differ: creation and deliverance). Abraham Joshua Heschel's The Sabbath (1951) may be named, quoted only after checking the text. Printable week; kept on the device; a "review your rule" prompt each season.

### 7.10 Bible Reading Planner (new): 2 runs

- Data from `client/public/bible/books.json` and the BSB chapter files (verse counts and approximate reading time per chapter). Plans: any book, the Gospels, the New Testament, the whole Bible, the Story path. The reader sets days per week and minutes per day; the plan divides by chapters, never mid-paragraph. "Day 6 of 30", today's reading opens the Study Bible at the chapter, done marks match the Study Bible's own "mark read". Shown on /study/plans beside the existing plans.

### 7.11 Decision Walk-Through (new): 2 runs

- Stages over days, not one sitting: what Scripture requires or forbids here (with the Wisdom Finder linked); what the people who know you say (James 1:5, Proverbs 15:22); what you want and why (Psalm 139:23 to 24); the options, each with its cost; prayer; the decision and what you will do if it goes wrong. The early church's own wording, "it seemed good to the Holy Spirit and to us" (Acts 15:28), framed as decision in community. Ignatius of Loyola's rules for discernment may be named as one tradition, checked against the Spiritual Exercises before any wording is used. A one-page record to print; nothing leaves the device; the tool says plainly that legal, medical and money decisions need the right professional.

### 7.12 Small Group and Sermon Companion (new): 2 runs

- For any of the 1,189 chapters with notes: the chapter's outline, the questions of the seven-step method in `lib/study-method.ts` applied to it, the "Go deeper" files from the passage index, and space for the leader's notes; printed as a group sheet. Nothing generated at run time; the sheet is assembled from existing files.

### 7.13 Kept as they are, in the shell: 1 run together

Conflict Guide (BSB, remove "--"), A Plan for When You Feel Alone, Family Devotion Builder (BSB), the Parent and Teen Conversation, What Your Child Needs at Each Age (sourcing pass).

---

## 8. Retirements James should confirm by name

1. **How Close Is Each Party to the Bible?** Recommended: off the Tools door; keep the page in /nation as a reading, without the tally and without the red, orange and green dots. If he prefers, retire it to /nation.
2. **What Shapes the Way You Read the Bible?** (Which Lens) and **Do You Hold Both Sides to the Same Standard?** Recommended: merge into the Examen of loyalties with no label as a result.
3. **Theology Quiz.** Recommended: retire to /start, and /quiz with it. It currently sends readers to essays he took down.
4. **Which view do I lean toward?** Recommended: move each quiz onto its comparison page in Where Christians differ, then redirect.
5. **Where Are You With God?** Recommended: becomes the short form of the Life Check (its words kept).

---

## 9. Claims checked, and what was not

Checked and correct: Monica and the bishop (Confessions III.12); C. S. Lewis, "the doors of hell are locked on the inside" (The Problem of Pain); Sartre, "condemned to be free"; William Rowe's fawn (1979); Plantinga's free-will defense; the early date of the creed in 1 Corinthians 15:3 to 7, which skeptical scholars including Gerd Lüdemann place within a few years of the crucifixion (a small minority argue it is a later insertion; the case could say so); Cicely Saunders and the hospice movement in the 1960s; the Hebrew of Proverbs 22:6 ("according to his way"); the books cited by the Whole-Life Assessment exist under those authors.

Unattributed or unverifiable: the folded Book-by-Book Bible Study says an ancient vinedresser "would cut back up to 90% of the previous year's growth". No source is given and it could not be confirmed for first-century practice; the page is being retired. What Your Child Needs at Each Age makes developmental claims with no source. No invented quotation or study was found.

Not checked: all 208 "how the church has read it" paragraphs (five sampled); the family devotions' text; a real phone, Safari or a screen reader; a full keyboard pass (form labels were counted, and none is missing); the Marriage check's send (not submitted, by the brief's rule).

---

## 10. Bugs on the live site

1. /tools/bible-says: the H1 shows "About…" as literal text; emoji icons; three names for one page.
2. /tools/theology-quiz: recommends taken-down essays; "12 min min read"; "YOUR PRIMARY PILLAR"; three names.
3. /nation/scorecard: the tally after "No team scores highest"; traffic-light dots off the palette.
4. /tools/marriage-assessment: "leave a copy with us" sends answers to the server, unlike every other check.
5. Mixed and unchecked Scripture text in seven tools (section 1); KJV in the Family Devotion Builder.
6. Wisdom Finder: weak matches (examples in section 4); the verse of the day cut mid-sentence.
7. "--" for dashes in the Conflict Guide and the parenting guide; em-dashes in Which Lens.
8. Prayers for When You Have No Words is listed as a generator and generates nothing.
9. The folded glossary uses purple, teal and brown category colors.

---

## 11. Build order

1. **The shell and the Wisdom Finder** (4 runs). The flagship of the group James named, on data that is already exact. Show James first: one entry, "A Wayward Child", on a phone, with the verse opening to its paragraph and note, the "often misread" layer on Money, and the matching test set's score.
2. **The Wisdom Books Explorer** (3 runs). The rest of "the Bible wisdom ones", from two verses a day to all of Proverbs by theme.
3. **Pray the Psalms** (3 runs), folding in the prayer list and worry journal.
4. The retirements and redirects of section 3, once James answers section 8 (1 run).
5. The Life Check (4 runs), Test the Case and the Doubt Map (4 runs), Memorize Scripture and the Reading Planner (4 runs), Rule of Life and the Decision Walk-Through (4 runs), the Examen (1 run), the Companion (2 runs), the kept tools in the shell (1 run), and the door's six rooms in `siteCatalog.ts` (1 run).

Every retirement keeps `site-structure.test.ts`, `siteCatalog.test.ts`, `toolsList.test.tsx` and the route smoke test green, adds a Decision Log line in CLAUDE.md with James's words of 2026-11-20, and leaves the page file in the repo.

---

## 12. Build 1, as built (2026-11-20): the tool shell and the Wisdom Finder

Retires nothing and changes no menu or catalogue. Ledger of every new claim: `docs/work/elite/tools-ledger.md`. Screenshots: `docs/work/elite/tools-shots/` (finder-390, finder-results-390, topic-wayward-child-390 and -1440, topic-misread-390, topic-print).

### The shell (`client/src/components/tool-shell/`)

- `ToolHead`: PageHead at the inner size with the tool's one name (from `toolsList.ts`), one line, "How long" and "What this keeps", and an optional not-a-diagnosis line.
- `QuestionCard`: one question as a fieldset and legend; answers are real radio buttons (or checkboxes with `multiple`) styled as full-width choices at least 56px tall; Tab, arrows and Space as the browser gives them, and the number keys 1 to 9.
- `useToolProgress(tool, guard, start, "local" | "session")` keeps the place under `livewell-progress-<tool>` through `lib/storage.ts`; `ProgressLine` shows "Question 7 of 30 · section", Back, a thin bar, and the site's save-failure sentence.
- `ResultReading`, `ScoreChart` (ink bars on cream, mustard only on the one "Start here" row, read as words by a screen reader), `ResultNext`, and `ResultActions` (Change my answers, Print, Start over with an inline confirm, and Send to my phone through `TakeItWithYou`, which sends the page's address only).
- `tool-shell.css` carries the one print sheet. `tool-shell.test.tsx` holds the contract.
- How a later tool adopts it: the four steps in `components/tool-shell/index.ts`. The Wisdom Finder and the topic pages are the first users; no other tool was converted.

### Matching

Data, not code: `client/public/wisdom/matching.json` (rewrites such as "passed away" and "laid off", synonyms, per-topic phrasings, "not" phrases, related topics, and eleven areas of life holding all 208 topics). `scripts/build-wisdom-index.mjs` merges it into `finder.json`; `client/src/lib/wisdom-match.ts` stems, weighs phrases above name words above keyword words above framing words, subtracts for "not" phrases, and reports "nothing fits that well" under a floor. Fixture: `client/src/lib/wisdom-match.fixture.json`, 74 cases and 19 holdout sentences plus one nonsense line. Old matcher: cases 62.2% top 1, 83.8% top 3; holdout 57.9% and 78.9%. New: cases 100% and 100% (the phrases were written with these in view); holdout 84.2% and 100% (not looked at while writing them). `wisdom-match.test.ts` holds floors under those numbers.

### The data

`build-wisdom-index.mjs` (with `--check`, in CI) now writes `topics.json` unchanged in shape, `finder.json` (match data, areas, one whole-sentence verse per topic for the verse of the day), and `entry/<id>.json` per topic, the only file a topic page loads (it loaded the whole 700 KB library before). A topic written in full lives in `client/public/wisdom/deep/<id>.json`; its Scripture is a reference, filled from the BSB at build time. `scripts/validate-wisdom.mjs` (in CI) checks every verse word for word (1,099 now), every Study Bible chapter linked, the areas, the deep shape, the misread layer on the old Misused Bible Verses topics, care lines word for word against the plain notes they name, and the prose rules.

### Twelve topics written in full

wayward-child, anxiety, grief, anger, financial-hardship, forgiveness, doubt, loneliness, marriage-conflict, calling-and-purpose, temptation, suffering. Nine of them carry the Misused Bible Verses material, rewritten and corrected (thirteen misread verses in all).

### The other 196, in batches

One run each, about sixteen topics, in this order (heaviest need first; each batch closes with the validator, the passage index rebuild and a look at three pages):

1. The rest of the misread layer and the gravest subjects: money, parenting-struggles, sexual-purity, justice-and-the-poor, submitting-to-leaders, rest-and-sabbath, gossip-and-the-tongue (after these the Misused Bible Verses tool is redundant and can be retired when James agrees); suicidal-thoughts, depression, despair-and-hope, self-hatred, toxic-relationships, addiction, alcohol-and-drinking, pornography.
2. Loss: losing-a-child, losing-a-parent, losing-a-spouse, sudden-loss, miscarriage, infertility, survivors-guilt, terminal-diagnosis, facing-death, serious-illness, chronic-pain, aging, heaven-and-eternity, when-life-is-unfair, the-problem-of-evil.
3. Marriage and family: marriage-communication, marriage-intimacy, marriage-after-an-affair, cheating, parenting-young-children, raising-teenagers, parenting-adult-children, new-parenthood, empty-nest, going-to-college, caring-for-aging-parents and caregiving (two topics with one name today: merge or rename, James to see), difficult-family, sibling-conflict, estrangement.
4. Love and singleness, and people: dating, dating-a-nonbeliever, breakup, longing-for-marriage, singleness, revenge, betrayal, reconciliation, conflict-with-others, deep-friendship, codependency, people-pleasing, setting-boundaries, saying-no, loving-your-enemies, when-someone-wont-change.
5. The mind: overthinking, fear-and-courage, fear-of-the-future, the-news-and-fear, information-overload, courage, need-for-control, numbness, mental-exhaustion, sensitivity, peace, restlessness, apologizing-well, encouraging-others, keeping-confidence, kindness, gentleness.
6. Work and money: purpose-and-meaning, work-and-burnout, work-life-balance, job-loss, career-change, conflict-at-work, success-and-failure, status-and-recognition, retirement, saving-and-spending, greed, generosity-and-giving, giving-to-the-church, consumerism-and-stuff, stewardship, gambling.
7. and 8. Habits (26 topics, two runs): lust through hardness-of-heart.
9. and 10. Faith (28 topics, two runs): anger-at-god through being-discipled.
11. Who I am (15).
12. and 13. Pace (26, two runs).
14. Church and the world (13).

### Bugs fixed

The Misused Bible Verses heading (its literal escape) now shows the tool's one name, and its fifteen emoji are line icons; "12 min min read" in the theology quiz; "--" as a dash in the conflict guide and the parenting guide (the one left is inside a Song of Songs quotation, Scripture wording the tool's later BSB pass will replace); emoji in the prayer and verse share lines; the folded glossary's off-palette category colours.

### Not done in this run

No tool besides the Wisdom Finder moved into the shell. No retirements, redirects, menu or catalogue changes. The 196 topics keep their five verses and old prose. The deep layer is not yet in the site search index (the topic pages are). The Westminster, Baptist Faith and Message, Methodist and Catholic Catechism references in the ledger were cited from knowledge and not opened.

---

## 13. Build 2, as built (2026-11-20): batch 1 of the other 196

Fourteen topics written in full to the standard of the first twelve, one commit each; 26 of 208 are now written in full. Ledger rows for every new claim: `docs/work/elite/tools-ledger.md`.

- **The rest of the misread layer:** money, parenting-struggles, sexual-purity, justice-and-the-poor, submitting-to-leaders, rest-and-sabbath, gossip-and-the-tongue. Every topic the Misused Bible Verses tool covered (`MISREAD_REQUIRED` in `validate-wisdom.mjs`) now carries the layer, so that tool is redundant whenever James agrees to retire it (not done; no tool was retired or re-listed).
- **The gravest subjects, in the plan's order:** suicidal-thoughts, depression, despair-and-hope, self-hatred, toxic-relationships, addiction, alcohol-and-drinking. Pornography, the last of batch 1, is the first topic of the next run.
- Each: ten or eleven passages with "where it stands" checked against the chapter's Study Bible notes; the often-misread layer where it applies (all but suicidal-thoughts and despair-and-hope, where none fits safely); the whole Bible's wisdom in four paragraphs; where Christians differ with shared ground first (left out on suicidal-thoughts, despair-and-hope and self-hatred, where no real division between churches bears on the reader's need); a question to sit with; a psalm to pray; care lines word for word from the plain notes on every heavy subject; the not-advice line on money (money), law (toxic-relationships) and medicine (suicidal-thoughts, depression, despair-and-hope, addiction, alcohol-and-drinking).
- The heavy pages open their whole-Bible section with the path to help, name no means of self-harm, never validate despair, and say plainly that abuse is never the victim's fault and that submission language never applies to abuse.

### Matching

Twenty new sentences (`holdout2` in `wisdom-match.fixture.json`) were written and committed before `matching.json` was touched. Before: cases 100% / 100%, holdout 84.2% / 100%, holdout2 65.0% / 80.0% (top 1 / top 3). Four phrases were then added for known misses ("tempted to cheat", "friend lied about me", "retired and feel useless", "boss humiliated me"). After: cases 100% / 100%, holdout 100% / 100% (three of its sentences were the ones tuned for, so it is no longer clean), holdout2 65.0% / 80.0% (not tuned for; the honest number). "Will my dog go to heaven" lands on Heaven and Eternity; the real answer is the Find Help page "Will I see my pet again?", which the finder cannot point to. `wisdom-match.test.ts` reports holdout2 and holds floors under it.

### Search

`scripts/build-search-index.mjs` now indexes each written topic's often-misread verses (found by the saying people quote: "spare the rod", "touch not my anointed"), what the whole Bible says, and where Christians differ, each opening its own section of the topic page; the page scrolls to the section once loaded.

### The two "Caring for Aging Parents"

caring-for-aging-parents and caregiving still share one name (James to decide: merge or rename). The first no longer lists the second as a related subject, which showed as a link with the page's own name. Both still appear under the same name in the finder's Family area and A to Z list, each with its own first line, and both pages carry the same title in search results and the browser tab.

### Not done in this run

Pornography and batches 2 to 14 (182 topics). The holdout2 misses (control in a dating relationship, sex outside marriage, gossip about a coworker, care for the homeless, how much to give, infertility first) were left untuned so the number stays honest.

---

## 14. Build 3, as built (2026-11-20): pornography and batch 2

Fourteen topics written in full to the standard of the first twenty-six, one commit each; 40 of 208 are now written in full. Ledger rows for every new claim: `docs/work/elite/tools-ledger.md`.

- **The topics:** pornography (the last of batch 1), then losing-a-child, losing-a-parent, losing-a-spouse, sudden-loss, miscarriage, infertility, survivors-guilt, terminal-diagnosis, facing-death, serious-illness, chronic-pain, aging, heaven-and-eternity. when-life-is-unfair and the-problem-of-evil, the last two of batch 2, open the next run.
- Each: ten or eleven passages, each "where it stands" written against that chapter's Study Bible note and plain note and agreeing with them; the often-misread layer where a verse on the subject really is commonly misread (Romans 7:19, Romans 8:28, Psalm 116:15, Matthew 22:30, 1 Corinthians 10:13, Exodus 23:26, Psalm 37:4, James 5:15, Isaiah 53:5, 2 Corinthians 4:17, 1 Corinthians 2:9; none on survivors-guilt, facing-death or aging, where none fits); the whole Bible's wisdom in four paragraphs; where Christians differ only on infertility (IVF and donation, as the Find Help page already sets it out), serious-illness (anointing and gifts of healing, as the notes on James 5 and 1 Corinthians 12 set it out) and heaven-and-eternity (the dead before the resurrection, as the notes on 2 Corinthians 5 and Luke 23 set it out); a question; a psalm; care lines word for word from the plain notes on every heavy page and on survivors-guilt and chronic-pain; the not-medical-advice line on infertility, terminal-diagnosis, serious-illness and chronic-pain.
- Every heavy page opens its whole-Bible section with the path to help, names no means of self-harm, and gives no phone number of its own (the site's CrisisBlock carries those). No page says anything about the eternal state of a person who died by suicide; the loss pages do not raise the cause of a death at all. Matthew 5:27-30 is opened only to verse 28, so the page never quotes the eye and hand sayings. 2 Samuel 1 (the Amalekite's account of Saul's death) was left out of sudden-loss for the same reason, and John 21:18 was left out of aging because it is about Peter's martyrdom, not old age.
- The medical not-advice line on the topic page now fits illness as well as sadness ("For your health and your treatment, or if worry or sadness is taking your sleep, your appetite or your days, talk to a doctor").

### Matching

Fifteen new sentences (`holdout3`) were written and committed before `matching.json` was touched. Before: cases 100% / 100% (74), holdout 100% / 100% (19), holdout2 65.0% / 80.0% (20), holdout3 53.3% / 73.3% (15) (top 1 / top 3). Then phrases and "not" phrases were added for the seven holdout2 misses named in section 13 (control in a dating relationship, hating the face in the mirror, sex outside marriage, gossip about a coworker, care for the homeless, how much to give, infertility under the marriage topics). After: cases 100% / 100%, holdout 100% / 100%, holdout2 100% / 100% (now tuned for; not a clean set), holdout3 53.3% / 73.3% (untouched; the honest number). holdout3's misses are known and were left alone so the number stays honest: "the doctor says I have maybe six months", "I was in the car crash and my friend didn't make it", "my teenage son was killed by a drunk driver", "my mother never told me she loved me and now she's gone" find nothing near; a miscarriage at eight weeks lands on Losing a Child first; chronic back pain and aging land second. A fourth holdout should be written before those are tuned.

The finder cannot point to a Find Help page: it ranks wisdom topics only. That was not built. "Will my dog go to heaven" still lands on Heaven and Eternity, whose next steps now include the Find Help page "Will I see my pet again?".

### The anchor on a topic page

`/wisdom/money#misread` landed the heading 624px down a 390px phone screen (312px at 1440). Traced on the served build: `followHash` scrolled while the prerendered text was still held over the page (`lib/prerender-hold.ts`), and when the real page took its place the section sat 540px lower. `followHash` now waits until no held text remains. Measured after, on the served build at 390 and 1440: `/wisdom/money#misread`, `#differ`, `#sit`, `/wisdom/pornography#whole`, `/wisdom/miscarriage#misread` and `/wisdom/infertility#differ` all land at 84px, the sections' scroll margin, just below the sticky header. `lib/followHash.test.ts` holds it.

### Not done in this run

when-life-is-unfair, the-problem-of-evil and batches 3 to 14. The holdout3 misses. The two "Caring for Aging Parents" topics (James to decide). Nothing outside the repo was opened; the Catechism references in the ledger are described from knowledge, not quoted.

---

## 15. Build 4, as built (2026-11-20): three checks on the shell, the Wisdom Books Explorer, holdout4

Retires, renames, merges and re-lists nothing; `toolsList.ts`, `siteCatalog.ts` and the menus are untouched. Ledger rows: `docs/work/elite/tools-ledger.md`, "Fourth build".

### Three kept tools on the shell

The first tools in the build order marked KEEP with no decision waiting on James and no excluded part: the Life Check's own parts, in the order of 7.5. The Whole-Life Assessment (`/life/assessment`), the Emotional Health Self-Check (`/tools/emotional-health`) and the Financial Health Self-Check (`/tools/financial-health`). Not taken: the Wisdom Books Explorer and Pray the Psalms (rebuilds that replace their tools rather than move them; the first is built below as a new page), Where Are You With God? (its merge waits on James, section 8), the Marriage check (its send-to-server part), the Theology Quiz, Which Lens, "Which view" and Misused Bible Verses.

- **The shell grew one part:** `CheckPart` (`components/tool-shell/CheckPart.tsx`), one part of a self-check at a time: `ProgressLine` ("Part 2 of 5", "Domain 2 of 5") with the answered count, the part's heading and line, a `QuestionCard` per statement, and Back and Continue (Continue waits for the part's answers). Focus moves to a part's heading when the reader moves to it, never on a fresh load. `focusResultTop` brings a result in at its safety question. `ResultReading` takes an `id` so its heading can take focus. The shell's CSS gained the page band and column, the resume line, an area block, a verse block and steps.
- **What changed for a reader:** each check's top is `ToolHead` with the tool's one name from `toolsList.ts`, its time, and what it keeps; the not-a-diagnosis line (and on money, the not-advice line) sits there once. The Emotional check moved from fifteen statements on one screen to five parts of three. Answers are radio buttons in a fieldset (Tab, arrows, Space, number keys 1 to 5). The result opens on the safety question, then the reading with the score and band as its lead, the areas as a `ScoreChart` (ink bars, mustard only on the lowest area, "Start here"), "Since the last time", the band's next step, the area-by-area readings with their verse, steps and next pages, Find Help as `ResultNext`, and `ResultActions` (Change my answers keeps every answer; Print; Start over asks first and leaves past results alone; Send to my phone). The Financial check's traffic-light colours (ok, strain, alert) are gone; its levels are words. The Whole-Life Assessment keeps its own printed record, its rule of life with the weeks, the statement-by-statement drilldown and the year-over-year view; its mustard verdict box and mustard bars are now the shell's reading and chart, and "Copy this rule" uses `lib/clipboard.ts`.
- **What did not change:** every statement, answer label, score, band, reading, step, verse and link. The data and scoring sections of each file are identical line for line to the version before the move (checked with `diff`); the only edits above each component are the imports and the Whole-Life page's progress loader, which became the guard `useToolProgress` reads with. Saved answers: all three already kept their place under `livewell-progress-<tool>`, the shell's own key, so there was no older key to move; the shapes were kept as they were (`{ answers, step, savedAt }`, and the Whole-Life page's `{ answers, screen, savedAt, runDate? }`), and a save written by the old pages opens on the new ones (tested, and seeded and loaded on the served build). History keys (`lw-whole-life`, `lw-whole-life-rule`, the self-check history) are untouched.
- **Tests:** the Whole-Life page's contract test passes unchanged. `pages/tools/self-checks-shell.test.tsx` adds ten: resume from a pre-move save for each tool, resume on the part reached, the result and Change my answers, the storage refusal sentence, and Tab, arrows, Space and number keys.
- **Found and left alone (wording):** the Whole-Life introduction says "about eight minutes" while `toolsList.ts` says 15 minutes (the head shows the list's time); the Emotional and Financial lines say "a few minutes" while the list says 10 and 8. The Emotional check names its lowest level "Critical". Neither was changed.

### The Wisdom Books Explorer (`/tools/wisdom-books`), Proverbs in full

The first new tool in the build order (7.2), its first part: Proverbs. Ecclesiastes, Job and James are not built yet.

- **Data:** `client/public/wisdom-books/proverbs.json`, written by hand: twenty themes (the fear of the LORD; wisdom and her call; the two ways; the LORD who sees and directs; listening, correction and counsel; the fool, the mocker and the simple; words and the tongue; anger, quarrels and peace; pride and humility; the heart; friends, neighbors and companions; parents and children; marriage and faithfulness; work and the slacker; wealth, poverty and generosity; kindness and faithfulness; honest dealing; justice, rulers and the king; envy and revenge; wine, appetite and self-control), each with one line, the introduction theme it draws on where there is one, and the wisdom topics that go deeper; and every one of the 915 verses tagged with one or more themes (eleven heading verses marked). No verse text is typed: `scripts/build-wisdom-books-index.mjs` (with `--check`, in CI) fills it from the BSB and copies the Study Bible's notes word for word into `client/public/wisdom-books/proverbs/` (an index, 31 chapter files, 20 theme files). `scripts/validate-wisdom-books.mjs` (in CI) holds every verse tagged, every tag and range real, every theme ten verses or more, every verse and note word for word, every theme file exactly its verses in order, and the prose rules.
- **The page:** on the shell (`ToolHead`, `QuestionCard` for the way in and the theme, `useToolProgress` under `livewell-progress-wisdom-books`, `ResultSection`, `ResultNext`, `ResultActions`). Three ways in: today's chapter (the day of the month), by theme (every verse in book order, each opening to the two verses either side, with "Read all of Proverbs N here" and the chapter's notes), and chapter by chapter (a grid of 31; each chapter under the Study Bible's own outline, title and summary; each verse with its themes as buttons into the theme and "Keep this line"; "I have read Proverbs N"). Lines kept and chapters read stay on the device. A fixed panel teaches how to read a proverb in the notes' own words, with 26:4-5 side by side. Prints the chosen chapter or theme.
- **Where it is:** registered in `App.tsx` (the route smoke test covers it), prerendered with its own head and `noindex`, in the site search (`MAIN_PAGES`), and linked from the Wisdom Finder's "More ways in". Not in `toolsList.ts`, `siteCatalog.ts`, any menu, or the sitemap: the canonical audit fails any sitemap URL that says noindex, so it joins the sitemap when James names it and the noindex comes off. "The Wisdom Books Explorer" is the plan's working name. `/tools/proverbs-31` is unchanged.

### Matching

Fifteen new sentences (`holdout4`) were written and committed before `matching.json` was touched. Then the seven holdout3 misses named in section 14 were fixed by data only (phrases and "not" phrases; three topics gained related subjects). Before and after (top 1 / top 3):

| Set | Before | After |
|---|---|---|
| cases (74) | 100% / 100% | 100% / 100% |
| holdout (19) | 100% / 100% | 100% / 100% |
| holdout2 (20) | 100% / 100% | 100% / 100% |
| holdout3 (15) | 53.3% / 73.3% | 100% / 100% (now tuned for) |
| holdout4 (15) | 86.7% / 100% | 86.7% / 100% (untouched; the clean set) |

holdout4's misses, left alone: "I want to believe but I keep thinking it's all made up" puts Assurance of Faith before Doubt; "I said yes to everything and now I'm drowning" puts Setting Boundaries before Saying No.

### Not done in this run

Ecclesiastes, Job and James in the explorer; Pray the Psalms; the other Life Check parts (Spiritual Gifts, Marriage, the short form); the 168 wisdom topics still in their first form; any retirement or listing.
