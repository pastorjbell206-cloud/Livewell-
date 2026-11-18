# Unit tools: the Tools door, one list, one name

Branch `elite/tools`, from `origin/claude/todo-implementation-hhp4bm`. Date: 2026-11-18.

James: "I want the tools to be easy to find... I want you to expand the tools and make them exhaustive and organized." This unit rebuilds /tools the way a door's page is built, makes `client/src/lib/toolsList.ts` the one source of every tool's name, lists each tool once, folds the doubles from the listing (never from the address), repairs the tools that forgot their place or ended nowhere, and lets My Library see the four tools it could not.

## One list, one name

`client/src/lib/toolsList.ts` holds 40 entries: for each an id, the plain name, the job in one sentence a visitor would say, about how long it takes, what it keeps on the device (or "Nothing"), its group, a lucide icon, its address, and `replacedBy` for a folded tool. Helpers: `toolById`, `toolByHref`, `toolName`, `survivorOf`, `foldedInto`; exports `TOOLS` (listed), `TOOL_GROUPS`, `FAMILY_TOOLS`, `OLD_GROUP_HASHES`.

Read from it now: /tools (`pages/ToolsHub.tsx`, `pages/ToolsBody.tsx`), /assessments, My Library (`lib/myProgress.ts`), site search (`pages/Search.tsx`, folded names as keywords of the survivor), the search index builder (`scripts/build-search-index.mjs` reads the file as text; a main page that is a tool takes the tool's name), /explore (`pages/Everything.tsx`), the old `Explore.tsx`, the family page, /resources, /start (the step that opens a tool), the start quiz, the Parenting page, and the "what next" lines in Which Lens, the Parent and Teen Conversation, the Life Audit, the Marriage self-check, and the new NextStep lines.

`lib/toolsList.test.tsx` fails when: two tools share an id, a name or an address; a job is not one plain sentence or holds an em-dash, "!" or a forbidden word; a tool folds into a folded tool; a listed tool is in no place; the catalogue names a tool's address differently or lists a folded tool; the search index titles a tool's address differently; or, rendered, /tools, /assessments, /explore, /resources, /start, /family, the start quiz or My Library show a tool's address under any words that do not contain its one name (and, except My Library, link a folded tool at all).

## The tools page (/tools)

1. PageHead, door size: label "Tools", H1 "Tools and resources", the catalogue's line, the compass plate (the Tools door's plate), "Find a tool".
2. A charcoal band: "28 tools, each listed once", "What do you want to do?", the find box. It narrows the tiles by name, job, group and the names of the tools folded into each ("verse finder" finds the Bible finder), finds the family tools too, counts the matches in a status line, and says "No tool matches" with links to search the whole site and Find Help. Under it, the four groups as jump links with counts.
3. The four groups, each a section with a SectionHead and ToolTiles (icon in the kit's ruled square, name, job, time, what it keeps). Linkable: `/tools#study`, `#hard-questions`, `#check-yourself`, `#pray-and-practise`. Arriving cold with a hash scrolls the group to just under the header (measured 72px at 390 and 1440); the older hashes (`#self-checks`, `#scripture-and-theology`, `#help-for-a-decision-or-a-hard-day`, `#faith-and-politics`, `#family-marriage-and-the-household`) are followed to the new parts.
4. "More to use": three picture cards, Eight-week plans ("Plans for a hard season, one week at a time", lantern), Small group study guides ("For groups and churches", table), Downloads (jars). The cards carry the pages' own catalogue names; the brief's phrases are their lines, so each address keeps one name.
5. One line for families naming the three family tools and the family page, and one line for My Library.

The page top paints first; the rest (`pages/ToolsBody.tsx`) is its own chunk behind a charcoal box that holds its place (this took Lighthouse performance from 88 to 90).

### The groups and every tile as built

| Group (address) | Tiles |
|---|---|
| Study (`#study`), 7 | Read the Study Bible · Search the Bible · What Does the Bible Say About What I Am Facing? · Misused Bible Verses: What They Actually Mean · Memorize Scripture: 40 Key Verses · Theology glossary · Quotes From the Essays and Books |
| Tools for hard questions (`#hard-questions`), 7 | Test the Case for Christianity · What Shapes the Way You Read the Bible? A Self-Check · Do You Hold Both Sides to the Same Standard? A Self-Check · Where Christians differ · Which view do I lean toward? · How Close Is Each Party to the Bible? · What Would a Biblical Government Look Like? |
| Check yourself (`#check-yourself`), 7 | Where Are You With God? A Self-Check · The Whole-Life Assessment · Marriage Health Self-Check · Emotional Health Self-Check · Financial Health Self-Check · Spiritual Gifts Self-Check · Theology Quiz |
| Pray and practise (`#pray-and-practise`), 7 | Prayers for When You Have No Words · The Prayer Planner · The Worry Journal · A Plan for When You Feel Alone · Build a Weekly Rhythm of Prayer and Rest (a Rule of Life) · Proverbs in 31 Days · Work Through a Fight in Five Steps |
| For families (on /family; named in the line on /tools; found by the find box), 3 | Family Devotion Builder · The Parent and Teen Conversation · What Your Child Needs at Each Age |
| Listed by the Bible door, 2 | Read any verse in context (/theology/passage) · Bible background (/resources/context) |

The group named "Hard questions" in the brief is "Tools for hard questions" because the catalogue holds one address per name and "Hard questions" is /topics.

**The catalogue** (`lib/siteCatalog.ts`, Tools entries only): rooms Study (`/tools#study`, with "Tools for hard questions" one tap inside), Check yourself, Pray and practise (by hash), Eight-week plans, Small group study guides, Downloads. Six rooms, as the map allows. `/assessments` is no longer a room; it stays live.

**/assessments** stays live and now shows the Check yourself group from the list (PageHead "Self-checks", the seven tiles, a line to Tools for hard questions). Its SEOMeta is unchanged. The start quiz, Which View, Which Lens and the both-sides check came off it (the last three are in Tools for hard questions).

## Doubles listed once (the fold table)

Each folded tool is still live at its own address, listed nowhere, and carries one line at its top (`components/FoldedNote.tsx`): "This tool still works, but the site now lists one tool for this job:" and the survivor's name as a link. To reverse a fold, delete its `replacedBy` line in `toolsList.ts`; its FoldedNote then renders nothing.

| Folded tool | Survivor | Why |
|---|---|---|
| What the Bible Says About Money, Anger, Work and More (/tools/bible-on) | What Does the Bible Say About What I Am Facing? (/tools/wisdom-finder) | Same job, "what does the Bible say about X". Its 14 topics are all among the finder's 208 (money, anger, work, anxiety, marriage...). |
| Bible Verse Finder (/tools/verse-finder) | the same | Same job; 20 topics, all covered by the 208 (anxiety, grief, courage, loneliness...). |
| Parenting Bible Verses (/tools/parenting-verses) | the same | Same job for parents; the 208 include Parenting Struggles, Parenting Young Children, Raising Teenagers, Parenting Adult Children. |
| Book-by-Book Bible Study: 20 Books in Depth (/tools/deep-bible) | Read the Study Bible (/study/bible) | Same job, studying a passage; the Study Bible does it for all 66 books. (Its private notes are still read by My Library.) |
| How to Study a Book of the Bible: 12 Books (/tools/bible-study) | Read the Study Bible | Same job, how to read a book; the Study Bible's book introductions cover all 66. |
| A Quick Check on Eight Areas of Life (/tools/life-audit) | The Whole-Life Assessment (/life/assessment) | Same job, a check on the whole of life; the survivor is the fuller one and keeps a rule. |
| Theological Vocabulary: 100 Terms Explained (/tools/glossary) | Theology glossary (/theology/glossary) | Same job, what a church word means. |

The survivor of the "what does the Bible say about X" fold is the finder, not /wisdom as the plan proposed: opened side by side, /wisdom is a hub (a guide, arenas that link to /tools/bible-on, a "Tell us what you are facing" button to the finder); the finder is the tool that searches the 208 topics. /wisdom stays in the Questions door under its catalogue name.

**Checked and not folded:**

- Family Devotion Builder vs the chooser on /family: not the same job. The builder writes for ages 3 to 6 and for teens by age; the chooser's 72 devotions have no material for little ones. Kept, under For families.
- Read any verse in context (/theology/passage): the Bible door already lists it; it is off the tools page, not folded.
- Bible background (/resources/context): a library, listed by the Bible door; off the tools page.
- The start quiz (/start/quiz): /start offers it on purpose and its test pins that link; folding it means changing /start. Left; only removed from /assessments.
- Saved Items (/tools/saved): My Library still only counts saved verses and prayers and links here, so it does not yet do the same job. Not folded.
- /theology/search: on the never-redirect list, James's call (plan, decision 12).
- Theology Quiz: kept and listed (Check yourself). It is a rewrite in the plan, not a fold; it does not do Which View's job.

## Repairs (TOOLS-PLAN unit 11)

Remember the place (each reloaded mid-way in Playwright at 390 and 1440, day and night, and in `pages/tools/remember-place.test.tsx`):

- **Work Through a Fight in Five Steps** (/tools/conflict-guide): the kind of fight and the step, key `livewell-progress-conflict-guide`; "Change topic" clears it.
- **What Shapes the Way You Read the Bible?** (/tools/which-lens): answers and question, now on the device, key `livewell-progress-which-lens` (was tab-only); an older tab save is picked up once; "Change my answers" and "Start over" as before. The intro now says the answers stay on this device.
- **The Parent and Teen Conversation**: side, answers and whether finished, key `livewell-progress-parent-teen` in **sessionStorage**, so a reload keeps the place but nothing outlives the tab. A parent and teen often share a device, and the page promised a teen nothing is kept; the page now says so plainly. "Change my answers" kept; "Start over" added (clears).
- **Which view do I lean toward?** (/theology/which-view): the quiz and its answers, key `livewell-progress-which-view`; a `?topic=` link still wins. Added "Change my answers" (back to the questions, every answer kept) beside "Start over" (clears).

A real next step (`components/NextStep.tsx`, named from the list):

- Misused Bible Verses: Read the Study Bible.
- Memorize Scripture: Read the Study Bible.
- Parenting Bible Verses: What Your Child Needs at Each Age.
- Which view do I lean toward?: Where Christians differ.
- Do You Hold Both Sides to the Same Standard?: What Shapes the Way You Read the Bible?
- What Your Child Needs at Each Age: its end card now opens tonight's family devotion (was the whole essay shelf).

Two renames, each with its page title following the new name as a string literal: **What Your Child Needs at Each Age** (was Parenting Stage Guide; SEOMeta title was "Christian Parenting by Age: Toddlers to Teens") and **Work Through a Fight in Five Steps** (was Conflict Resolution Guide; title was "Resolve a Conflict: Five Steps for Couples"). H1 and structured-data name follow. The labels naming them in six eight-week plans and four Find Help pages were updated to the new names (indexes rebuilt; unchanged).

## My Library (unit 22, first half)

It now shows, by their one name: a half-done Whole-Life check ("3 statements answered so far"), Deep Bible notes and marks (`lw-deep-bible`), a family devotion series (`lw-family-devotions`, "1 of 3 weeks done"), and Test the Case progress (`lw-test-the-case`, steps passed or cases argued to the end). Every other row's name now comes from the list ("Life Audit" is now "A Quick Check on Eight Areas of Life", "Scripture Memory System" is "Memorize Scripture: 40 Key Verses", "The Connection Planner" is "A Plan for When You Feel Alone", "The Study Bible" is "Read the Study Bible"). Home's "Continue" line reads the name too ("Continue a Quick Check on Eight Areas of Life"; `home.test.tsx` and `myProgress.test.ts` were updated for it). The save-to-file half was not built.

## The worn-out pastor's old address

`/tools/pastor-burnout` already redirects to /tools (vercel.json and App.tsx). Sending it to /help/pastors would change a tool address's redirect, so it is left as it is.

## What I ran, and what passed

- `pnpm check`: pass.
- All 34 commands of the content-gates step in `.github/workflows/ci.yml`: pass (search index rebuilt; `build-search-index.mjs --check` pass).
- `pnpm test`: 131 files passed, 7 skipped; 1,476 tests passed, 73 skipped. New: `lib/toolsList.test.tsx` (18), `pages/tools/remember-place.test.tsx` (4); changed: `siteCatalog.test.ts`, `Everything.test.tsx`, `ToolsHub.test.ts`, `myProgress.test.ts`, `home.test.tsx`.
- ESLint `--max-warnings 0` on every changed source file: clean.
- `pnpm build`; `pnpm run sitemap && pnpm run prerender && pnpm run audit:canonicals`: pass.
- Served with `scripts/serve-like-vercel.mjs --port 4450`, tRPC stubbed, Playwright: /tools at 390x844 and 1440x900, day and night (first screen, full page, the leading cards, the find box with "worry" and with nothing matching, a cold `/tools#pray-and-practise`, a jump link); no sideways scroll, no target under 44px in `<main>`; the two folded pages /tools/verse-finder and /tools/life-audit; the four repaired tools reloaded mid-way (all four back where they were, in all four views); My Library with the four new stores; /assessments. Screenshots: `/home/user/elite-shots/tools/`. Read and fixed: a doubled focus ring on the find box, long phone sections (tighter padding), and the Lighthouse score (body split into its own chunk).
- Lighthouse (`scripts/lighthouse-median.mjs`) on /tools: performance 90, accessibility 100, best practices 96, SEO 100, CLS 0.000, LCP 3.5 s (under a load average near 8; /study measured 93 in the same conditions).

## Not verified

- A real phone, Safari, or a screen reader.
- Lighthouse on /assessments, My Library or any tool page; axe on its own.
- The folded tools other than verse-finder and life-audit were not screenshotted (the same component draws the line on all seven; the route smoke test renders each).
- The new next steps were checked in code and by the route smoke test, not each by eye.

## What waits for James

1. Each fold in the table (a yes or no per row; reversing is one line).
2. Topic pages still name four tools their own way ("The Consistency Check", "Which Lens Has You?", "The Party Scorecard", "If We Had a Biblical Government") in `client/public/topics/*.json`, and the raising-children topic says "Parenting Stage Guide". Those files belong to the topics unit; the name test covers the pages this unit owns.
3. Page titles that still differ from the list's names, left because the rule keeps titles unless a tool is renamed: e.g. Misused Bible Verses ("Misread Bible Topics: What the Text Says"), the Prayer Planner ("A Weekly Prayer List You Can Keep"). Say the word and the names and titles become one.
4. Several list names are long (they are the names /tools already used). Shorter names (the plan's "Prayer list", "Worry journal") would mean renaming each page's title too.
5. The Theology Quiz: rewrite as knowledge checks, or retire to Which View (plan 5.1). It stays listed until then.
6. The two politics pages stay listed under Tools for hard questions (plan decision 5).
7. The start quiz fold, Saved Items into My Library (once My Library shows saved verses in full), and /pastor-burnout to /help/pastors (a redirect change).
