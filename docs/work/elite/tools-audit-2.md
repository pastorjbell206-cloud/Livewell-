# Tools audit 2 (2026-11-22)

James (2026-11-22): the tools expanded and improved; earlier, "I want to make sure that they're used." This is the audit that work started from, then what was done about it.

## How it was done

Every entry in `client/src/lib/toolsList.ts` (33 listed tools, 7 folded) was opened on the served build (`scripts/serve-like-vercel.mjs`, port 4674) at 390 by 844 with Playwright and walked by a script: answer every radio group, type into every empty field, press each forward button until the page stopped changing; then record sideways scroll, console errors, controls under 44px, the storage keys written, the links on the last screen, and what a reload brought back. The end and after-reload screens are in `/home/user/elite-shots/tools/audit/`. Where each tool is offered was counted by script across the data the site's pages read: the Honest Answers' companions, the wisdom topics, the track, Find Help, the family index, the chapter index, the study guides, the eight-week plans, the start road, and every page and component.

The walker is a blunt instrument. It reached a result on most checks but not all (the Whole-Life, Marriage and Emotional Health checks have a safety step or section jumps it did not follow); for those the existing contract tests (`self-checks-shell.test.tsx`, `remember-place.test.tsx`, each tool's own test) are the evidence, and the table says so. No tool threw a console error. No tool scrolled sideways at 390.

## What the audit found

1. **The tools were offered from Find Help and the eight-week plans, and almost nowhere else.** Across 104 wisdom topics written in full there were five links to a tool. Across 35 Honest Answers, three kinds of companion (Test the Case, Compare, Which View). On a Study Bible chapter, only "Read any verse in context". On a family devotion, none. A reader on the page about worry was not shown the Worry Journal.
2. **Memorize Scripture taught a wording the site does not use.** Its forty verses were typed into the page in another translation with no name on it, under a note that said the text was unverified. A reader was memorizing words nobody had checked. It also had no review after the day a verse was learned, lost the open verse on a reload, and had 28 controls under 44px on a phone.
3. **The conflict guide's forty verses were unverified too**, in the same other wording, two with a doubled hyphen in the reference.
4. **The consistency check waited for ever when its data did not load** (`.catch(() => {})`), kept nothing (thirteen slow questions lost on a reload), and ended on its closing words with no reading of what the reader had marked.
5. **Results that led nowhere:** the parenting guide, the prayers, the devotion builder and the consistency check ended with no next page chosen from what the reader picked; the conflict guide had one.
6. **Small controls** (under 44px) on a phone in Which Lens (two text buttons 15px tall), Which View, Misused Verses, the conflict guide, Proverbs in 31 Days, the Rule of Life, the Prayer Planner, the prayers, the parenting guide, the quotes (filter chips 28px tall), the Marriage check's section dots (24px) and the Diagnostic's "Clear history".
7. **The Theology Quiz cannot be walked without the API.** Its ten questions are a fixed list served by `quiz.getQuestions`; on the local server (no API) it shows "The quiz didn't load" with a retry. That is the right failure, and it works in production as far as the code shows, but it is the one listed tool whose first screen depends on a server for content that never changes.
8. **Copy that breaks the house rules, left as found:** the written prayers in "Prayers for When You Have No Words" use em-dashes throughout and are first-person prayers (which a prayer must be); several tool pages still carry an em-dash in their own interface copy ("Copy failed — select and copy manually", the shared save-failed line). These are in files the no-em-dash gate does not read.

## Every tool

"Works" means: opens, takes input, reaches its end, and a reload brings back what the tools list says it keeps. "Offered now" counts only the data-driven offers added in this run (`client/src/data/tool-offers.json`); a tool was already linked from its own door, /tools, search and My Library.

| Tool | Works at 390 | Broken or thin | Fixed in this run | Offered now from |
|---|---|---|---|---|
| Read the Study Bible | Yes | Nothing found | | Its own door |
| Search the Bible | Yes | Nothing found | | Its own door |
| What Does the Bible Say About What I Am Facing? | Yes (search, a topic, change my words; place kept in the tab) | Nothing found | | 2 answers, James 1, Proverbs 2 |
| Misused Bible Verses | Yes; keeps nothing, as it says | "All topics" 17px tall; no next page by topic | The control is 44px | 1 topic |
| Memorize Scripture: 40 Key Verses | It ran, but see finding 2 | Unverified wording, no review days, place lost on reload, 28 small controls | Rebuilt (below) | 4 topics, 4 passages, 1 devotion |
| Theology glossary | Yes | Nothing found | | Its own door |
| Quotes From the Essays and Books | Yes; saves kept | Filter chips and Copy, Share, Save are 28 to 29px tall | Not fixed (344 controls in a dense list; needs a design pass) | /tools only |
| Test the Case for Christianity | Yes; the place is kept through a reload | One next link at the end | | 3 topics, 2 passages |
| What Shapes the Way You Read the Bible? | Yes; result, Change my answers, reload keeps the result | "Change my answers" and "Start over" 15px tall | Both 44px | 3 topics, 1 answer, Acts 17 |
| Do You Hold Both Sides to the Same Standard? | It ran, but see finding 4 | Endless loading on a failed fetch; nothing kept; no reading | Improved (below) | 4 topics, 1 answer, 3 passages |
| Where Christians differ | Yes | Nothing found | | 3 topics, Romans 14 |
| Which view do I lean toward? | Yes; result kept through a reload | "Pick another" 16px tall | 44px | 2 topics (and the answers that already named it) |
| How Close Is Each Party to the Bible? | Yes; a reading tool, keeps nothing | No next page from what was read | Not changed (/nation is out of the nav by James's word) | 1 topic, 1 answer |
| What Would a Biblical Government Look Like? | Yes; a reading tool | The same | Not changed | 1 topic, 3 passages |
| Where Are You With God? | Yes; result with 14 next links, Change my answers, history kept | "Clear history" 22px tall | Not fixed (shared history component) | 5 topics, 3 passages |
| The Whole-Life Assessment | Yes by its tests (the walker stopped at a section) | Nothing found | | 4 topics, Psalm 90 |
| Marriage Health Self-Check | Yes by its tests; "Pick up where you left off" after reload | Section dots 24px | Not fixed (the dots repeat the section buttons) | 2 topics, 2 passages |
| Emotional Health Self-Check | Yes by its tests; picks up after reload | Nothing found | | 4 topics, 1 Kings 19 |
| Financial Health Self-Check | Yes; result with next links, Change my answers; reload offers to pick up | "Clear history" 22px | Not fixed | 7 topics, 1 answer, 3 passages, 3 devotions |
| Spiritual Gifts Self-Check | Yes; result, Change my answers, picks up after reload | "Clear history" 22px | Not fixed | 3 topics, 4 passages, 2 devotions |
| Theology Quiz | Not verified (finding 7) | Needs the API for a fixed list | Not changed (an API change is not this run's to make) | 1 topic |
| Prayers for When You Have No Words | Yes; saved prayers kept | No next page; Copy and Share 29px; em-dashes in the prayers | Next pages by the kind of prayer; buttons 44px | 3 topics, 2 passages |
| The Prayer Planner | Yes; the list is kept | "Mark prayed" 40px | 44px | 3 topics, 3 passages, 2 devotions |
| The Worry Journal | Yes by its test (the walker does not press "Close the day") | Nothing found | | 5 topics, 2 answers, 3 passages, 2 devotions |
| A Plan for When You Feel Alone | Yes by its test (the walker left the page through one of its links) | Nothing found | | 3 topics, 2 passages, 1 devotion |
| Build a Weekly Rhythm of Prayer and Rest | Yes; the rule is kept and picked up | "Copy rule" and "Reset" 36px | 44px | 7 topics, 3 passages, 2 devotions |
| Proverbs in 31 Days | Yes; keeps nothing, as it says | Prev and Next 39px | 44px | 3 topics, Proverbs 1, 1 devotion |
| Work Through a Fight in Five Steps | Yes; the step is kept through a reload; prints | Unverified verses; "Change topic" 15px; one next link | Verses exact BSB; 44px; next pages by the kind of fight | 2 topics, 3 passages |
| Family Devotion Builder | Yes; a series is kept once built | No next page | Next pages by theme (the matching family devotion first) | 2 topics, Psalm 78 |
| The Parent and Teen Conversation | Yes; answers kept in the tab only, by design | Nothing found | | 1 topic, 1 answer, 2 passages |
| What Your Child Needs at Each Age | Yes; keeps nothing | No next page by age; "All Age Groups" 33px | Next pages by age; 44px | 4 topics, Proverbs 22, 1 devotion |
| Read any verse in context | Yes | "Go" 35px tall | Not fixed | Already on 230 chapters |
| Bible background | Yes | Nothing found | | Its own door |
| Folded: What the Bible Says About, Bible Verse Finder, Parenting Bible Verses, Book-by-Book Bible Study, How to Study a Book, A Quick Check on Eight Areas, Theological Vocabulary | Each opens with its one line naming the tool that replaced it | Verse Finder, Parenting Verses and Book-by-Book still show unverified Scripture under an honest note; chips of 33 to 35px | Not changed: folded tools are listed nowhere, and retiring one is James's call (tools-plan section 8) | Not offered, by rule |

## What was done

### Offered where they fit (`client/src/data/tool-offers.json`)

One hand-kept file says where each tool does a job a page raises; the tool's name and its one-line job come from `toolsList.ts`. Four surfaces read it:

- a **wisdom topic** lists the tool under "Where to go next" (`WisdomTopic.tsx`);
- an **Honest Answer** gets a companion line, "A tool for this:" (`data/answerCompanions.ts`);
- a **Study Bible chapter** lists it under a new "Tools" heading in Go deeper (`scripts/lib/passage-index.mjs`, kind `practice`; 47 chapter files changed);
- a **family devotion** gets one line "For the grown-ups, a tool" (`DevotionPage.tsx`).

At most two tools on a page. No tool on any wisdom topic the site marks as heavy (`data/sensitive-pages.json`): those pages keep the path to help and nothing beside it; the Marriage check and the conflict guide were taken off "marriage-conflict" for that reason. No self-check on money trouble, a lost job or an affair. `toolOffers.test.ts` holds every id, slug and passage, and fails if a tool in the four working groups is offered nowhere. The one track already named five tools in its sessions and was left as it is.

### Next pages from the reader's own choice (`client/src/data/tool-next.json`)

Two or three pages for each choice, drawn by the shell's own `ResultNext`: the conflict guide by the kind of fight, the parenting guide by the child's age, the prayers by the kind of prayer, the devotion builder by theme, the consistency check once anything is marked; Memorize Scripture from the verse just worked on (its chapter, its set's wisdom topic, the catechism for a family verse). A choice that touches broken trust or suffering keeps Find Help in its list. `toolNext.test.ts` checks every address and name.

### The three weakest, improved

1. **Memorize Scripture** (same address, same name). The forty verses are now the Berean Standard Bible word for word, read out of the site's own Bible files by `scripts/build-memory-verses.mjs` (a new drift gate), never typed. Matthew 20:26-27 gave way to Mark 10:45 because the BSB's sentence there breaks on a dash. A verse is learned in five steps, its words hidden a quarter more each time, a hidden word shown on a tap; at the last step the reader says it, looks, and marks "I had it" or "Not yet". A verse kept comes back after 1, 3, 7, 14 and 30 days; a verse missed comes back tomorrow; "Today's review" lists what is due. Any reference up to six verses can be added and is read from the Bible files. A family can learn the verses the catechism rests on, each with its question. The open verse and its step survive a reload ("Picked up where you left off"); the verses print as cards; a reader who marked verses in the old version finds them due today, since the words changed. 19 tests.
2. **Work Through a Fight in Five Steps.** All forty verses replaced with exact BSB text by script (36 differed); two excerpts kept as excerpts and checked as continuous stretches (James 4:2, Joshua 24:15); the note under them now says Berean Standard Bible.
3. **Do You Hold Both Sides to the Same Standard?** Marks kept on the device; a failed load offers a retry; once anything is marked, "Your examen" reads the reader's own marks back with three passages quoted exactly (Proverbs 11:1, Leviticus 19:15, Psalm 139:23-24), each with one line on what it shows, says plainly that it is not a score, prints as one sheet, clears, and names where to go next. 5 tests.

### The new tool that was not built, and why

The audit's missing tool was the recommended one, "Memorize a verse": any verse, words hidden step by step, spaced days, a family mode. The site already lists a tool for that job under the name "Memorize Scripture: 40 Key Verses", and it was the weakest tool on the list. Building a second memorizing tool beside it would have left two tools for one job, and folding the old one is a retirement, which waits for James. So the whole of the recommended tool was built into the existing address. Nothing was added to `toolsList.ts`, the route table or the menus.

## Still open

- The quotes page's small controls, the "Clear history" control on four checks, the Marriage check's dots and the passage tool's "Go" button.
- The Theology Quiz's fixed questions could ship with the page, so it opens without the API. That touches the API's contract and waits for a decision.
- The seven folded tools still carry unverified Scripture. Retiring them is the clean fix.
- The written prayers' em-dashes, and the em-dash in the shared save-failed line (named word for word in CLAUDE.md, so it was reused whole).
- The conflict guide's teaching paragraphs were written beside the old wording of each verse; each still reads true against the BSB text as far as a read of the diff showed, but they were not rewritten.
