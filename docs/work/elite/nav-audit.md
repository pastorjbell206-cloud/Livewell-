# Finding your way: the navigation audit and what was done

Branch `elite/nav`, from `origin/claude/todo-implementation-hhp4bm` at d3e789bf. Dates: 2026-11-20 to 21.

James on 2026-11-20: "make this website very easy to navigate." His earlier word stands: seven doors (Bible, History, Questions, Family, Tools, Essays, About) beside Find Help, search and Subscribe, and six rooms or fewer in a door's panel.

Everything here was measured on the built site, served the way Vercel serves it (`scripts/serve-like-vercel.mjs`, port 4688), in Chromium through Playwright. No dev server. A "tap" is one tap or click, or one thing typed and sent. Opening the phone menu counts as a tap.

## Part 1. The audit

### Ten visitors, from the home page

"Before" is the site as this unit found it, walked at 390px. The before column at 1440 was not walked by script: the counts there are read from the same catalogue the header drew, and are marked (read). "After" was walked at 390 and at 1440, in day and night colours, on the final build.

| # | Visitor | Before, 390 | After, 390 | After, 1440 | Dead ends before | Dead ends after |
|---|---|---|---|---|---|---|
| 1 | Someone grieving: Find Help, then "Someone I love has died" | 2 | 2 | 2 | none | none |
| 2 | A skeptic with one objection ("the Gospels contradict each other"), by search | 1, then nothing | 2 (the search, then the first result: a piece in Contradictions and hard passages) | 2 | The search answered "Nothing here" and offered only the essays and the tools | none |
| 2 | The same skeptic, by the menu: Questions, The case for the faith, the area, a piece | 3 to a room that listed one area of ten; the area he wanted was not published | 5 | 4 | The room had no page for his objection | none |
| 3 | A parent wanting something for a 9-year-old tonight: tonight's devotion | 1 (the line under the search box) | 1 | 1 | none | none |
| 3 | The same parent, wanting Bible Explorer | 4 (menu, Family, Everything in Family, a link inside a sentence) | 2 (the chip "I'm leading a family", then the road's fifth step) | 2 | none, but the link was one sentence in a long page | none |
| 4 | Someone who wants to read Romans 8 with help | 1 (type "Romans 8", Go); the jump "Passage by passage" then stopped 2,210px short of its part | 2, and the jump lands on its part | 2 | The jump link missed its target on a phone | none |
| 5 | A new Christian who does not know where to start: "I'm new to this", then step one | 2 | 2 | 2 | none | none |
| 6 | A pastor wanting something to hand a church member on anxiety: Find Help, "I can't stop worrying", Print it | 3 | 3 | 3 | none. The Find Help line does not say the word "anxiety" (see the ideas below) | none |
| 6 | The same pastor, by search ("anxiety") | 1, first result an Honest Answer | 1 | 1 | none | none |
| 7 | Someone who wants to watch the Explorer film on prayer, by the Bible door | 5, with two long scrolls: Bible Explorer was one sentence at the foot of /study, and the films sit far down a page 37 phone screens long | 5 (menu, Bible, Everything in Bible, Watch and learn, Prayer), no hunting | 4 | none, but slow | none |
| 7 | The same, by search ("prayer film") | 2 | 2 | 2 | none | none |
| 8 | Someone who read an essay and wants the next one | 2 (the essay, then the next-essay card at its end) | 2 | 2 | none | none |
| 9 | Someone who typed a misspelled search ("forgivness") | 1, then nothing | 2 (the search says it is showing "forgiveness"; then the first result) | 2 | "Nothing here for forgivness" | none. A search with no match at all now offers Find Help, the seven doors, the start road and Everything on LiveWell |
| 10 | Someone who landed on Romans 8 from a search engine | 0 to know where: the label "The Study Bible", the book's name, and previous and next. 1 tap up to Romans, 2 to the Study Bible | the same | the same | none | none |

Keyboard, after (two visitors, and the skip link): Tab reaches "Skip to content" first on every page walked, with a visible ring; after it the next Tab is the first link of the page's own content. The grieving visitor: 10 Tabs to Find Help and 21 on that page to "Someone I love has died" at 1440 (3 and 15 at 390), Enter on each. Romans 8: 14 Tabs to the home find box at 1440 (8 at 390), type, Enter, then 15 Tabs (9 at 390) to "Next chapter". Every focused control was visible and ringed.

Part of visitor 2's gain is not this unit's: the nine other areas of The case for the faith were published by another run on 2026-11-21. This unit's part is that the search finds the piece, and that /explore and the Questions door's page list the areas from the library's own manifest.

### By script, across the route table

A sample of 490 pages was opened at 390px: every static route that is not a redirect, an admin page or a thank-you page, and for each library the first, second, middle and last page. For each: links back up, previous and next, the page's H1, every link's text and size, sideways scroll, console errors, the skip link.

**Pages with no way back up** (no link in the page's own content to the page that lists it):

| Pages | Count | Done |
|---|---|---|
| Eight-week care plans (/plans/:slug): linked Find Help, never the list of plans | 29 | The line over the title now reads "Tools · Eight-week plans" |
| The three books (/books/believe and the two beside it) | 3 | "About · Books · Free ebook" |
| Topic pathways (/pathways/:slug) | 12 | "Essays · Topic pathway". Their own hub folds into /writing (see the ideas) |
| The longer doctrine studies (/theology/doctrine/:slug): a "Questions" label, and a foot link named "Study" | 31 | "Questions · Where Christians differ", and the foot link leads there under that name |
| The start quiz (/start/quiz): also no skip link and no main landmark | 1 | "New here? Start here" over the quiz; skip link and landmark added |
| The two tools no menu lists (/tools/wisdom-books, /tools/pray-the-psalms) | 2 | Each now carries "Tools" over its title. They stay out of every menu and list (waiting for James) |
| /quiz, /roadmap, /skeptic-track | 3 | Left as they are: no page links to them (see the ideas) |
| The twenty-four held ebook pages | 24 | Left: held on purpose (James, 2026-11-18) |

**Pages whose way up used a different name than the menus:** everyday-life guides ("Integrated Life"), context guides ("Reading Scripture in Context"), creeds ("Creeds, Confessions, and Classics" at the top and "Creeds & Confessions" at the foot), the nation essays ("Christ and the Nation"), care pages ("Find help"), history lessons ("Church History"). All now take the catalogue's name through one part.

**No "next" on something read in order:** the wisdom topics of one subject (208 topics, 11 subjects; they had "Close to this" only), and an Explorer film had a next but no previous. Both done. Chapters, Honest Answers, the questions pieces, the story's acts, the reading guides, the doctrine studies in the Study Bible, the history lessons and the family devotions already had both. Left without: the six comparison pages and the ten /faq pages (sixteen hand-built pages, a list more than a sequence), and the libraries that are not sequences (study guides, how-to guides, everyday-life guides, care pages, creeds, context guides).

**Orphans** (no menu, hub, /explore, search entry or crawled page reaches them): /quiz, /roadmap, /skeptic-track, five folded tools that stay live at their address by rule (/tools/bible-study, /tools/parenting-verses, /tools/saved, /tools/deep-bible, /tools/glossary), and the twenty-four held ebook pages. /start/quiz is linked from the start road once a road is open. Reached thinly: the twelve topic pathways (from seven pages), five book pages off the shelf (from /downloads).

**"Everything in a door" that was not everything:** the Questions door's page (/topics) showed five room cards; The case for the faith was missing, and so were twenty-seven pages inside the rooms. The Bible door's page did not link How to study the Bible, Read any verse in context or The Bible in a year, and gave Bible Explorer one sentence. The Tools door's page did not link the four reading paths, the booklets or All resources.

**Hubs longer than a screenful:** /downloads is 62 phone screens (852 links under 15 headings); /study/explorer is 37; /how-tos 26; /explore 16 (grouped by door). All are grouped; the first two are long enough to want a jump list or a split (see the ideas).

**Link text that does not say where it goes:** none found ("click here", "read more", "learn more", a bare arrow).

**Tap targets under 44px in navigation:** three, all in the footer, all 44 high but narrow: Privacy (42 wide), Terms (35), RSS (27). Fixed. After: none.

**Focus order and skip link:** present and first on every page that uses the site's layout. Missing on /start/quiz (fixed) and /quiz (left; see the ideas).

**The header on scroll:** sticky, 64px, at the top throughout (measured while scrolling a chapter). The Find Help tab stays at the right edge on a wide screen.

**Sideways scroll:** none on any of the 490 pages at 390px.

**Is a page's name the same everywhere it is linked?** In the menus, the footer, /explore and search, yes (one catalogue). On the pages themselves, not always: the H1 differs from the menu's name on these. Changing an H1 is page wording, so none was changed.

| Address | The menus call it | The page's own H1 |
|---|---|---|
| /study/bible | Read the Study Bible | The Study Bible |
| /resources/context | Bible background | The world the Bible was written in |
| /study/plans | Reading plans | Bible reading plans |
| /study/bible/story | The Bible's story | The Story of the Bible |
| /study/bible/doctrines | What Christians believe | The Doctrines of the Bible |
| /theology/history/people | The people | People of church history |
| /resources/creeds | Creeds and confessions | The creeds and confessions of the church |
| /answers | Honest Answers | Honest answers to hard questions |
| /family | Family | Faith at the family table |
| /family/devotions | All family devotions | A devotion a week, together. |
| /resources | All resources, on one page | Resources |
| /contact | Contact | Write to James |
| /start | New here? Start here | Start where you are |
| the six /compare pages | "Catholic and Protestant" | "Catholic vs. Protestant" |

## Part 2. What was done

Smallest change first, tokens only, the existing parts (PageHead, .eyebrow, .btn, IconTile), no new dependency, no API procedure, nothing in the first paint that waits on a network.

**a. Where am I.** `lib/pagePlace.ts` gained `trailFor(path)`: the door and room of any address, from the site catalogue, a page inside a library included. `components/art/Place.tsx` draws it as the small label the inner pages already had; `InnerHead` uses it, and a page with a top of its own draws `<Place path>`. The old `components/Breadcrumb.tsx` was not copied; no second trail was made.

**b. What's next.** `components/TurnNav.tsx` (the Honest Answers' two cards) closes each wisdom topic with the subject before and after it in its own area. The pair is written into each topic's file by `scripts/build-wisdom-index.mjs` from `matching.json`. An Explorer film links the film before it. `PageEndNav` names the hub by its catalogue name.

**c. The doors.** Exactly what changed in the menus:

| Door | Before | After |
|---|---|---|
| Bible, room 3 | Guides to reading the Bible (/study/bible/guides), with How to study the Bible inside it | How to study the Bible (/study/how-to-study), with Guides to reading the Bible inside it. This is the room James's map names |
| Bible, inside The Bible's story | Bible Explorer | Bible Explorer, Watch and learn (/study/explorer#watch), Abraham's road, Paul's travels |
| Questions, inside The case for the faith | Can we trust the text of the New Testament?, Look up a claim | The live areas, from the library's manifest (ten today), then Look up a claim |
| Every other door and room | | unchanged. No door or room was renamed or removed. Six or fewer holds: Bible 6, History 5, Questions 6, Family 4, Tools 6, About 5 |

The door pages /study and /topics now read their room cards from the catalogue (so /topics shows The case for the faith), and /study, /topics and /tools list every page inside their rooms through one part, `components/art/DoorInside.tsx`.

**d. Everything on LiveWell.** /explore was already drawn from the catalogue, the tools list and the essay shelf. It now also lists the case for the faith's live areas from `client/public/questions/index.json`, so an area appears the day it is published. The Questions door's own page does the same. The footer reads the same catalogue and needed no change beyond the 44px fix.

**e. Start here.** Every step of the five roads is checked against the site's own data by `start.test.tsx` (it passes: each leads to a live, public page), and the walks opened the new steps. The family road gained a step, Bible Explorer. "What next" on the road for someone new gained two lines: a chapter in plain words (Mark 1, passage by passage) and the page of Bible reading plans. The six steps for someone new are word for word as they were.

**f. Search.** `scripts/build-search-index.mjs` adds every page the catalogue lists to the hubs, under its menu name. `lib/searchMend.ts`, loaded by /search alone, gives a search that found nothing two more tries: a misspelled word mended (by the Wisdom Finder's rule for a misspelling), then the nearest pages. A tool is found by its short name ("wisdom finder"). A search with no match at all offers Find Help, the seven doors, the start road and /explore. First results on the served build: "how do i pray" is the care page "I don't know how to pray"; "is the bible true" is the film of that name, then the catechism's answer and the care page; "my marriage is falling apart" is the care page of that name; "bible for kids" is the guide "How to Read the Bible With Young Children".

**g. Pathways and plans.** See the next section for how they stand. /study/plans opens with "Pick up where you left off" on a device that has begun a plan (the year plan at its next day, a family plan at today's day, the Bible's story), read through `lib/storage.ts`. A topic pathway offers "Continue" at its first unread step. Each day of the year plan and of the family plans already linked its chapter in the Study Bible, where the plain-words notes are; that was checked, not built.

**h. Also.** The footer's short links are 44px wide. A chapter's jump links ("Passage by passage", "Study questions", "Study notes") hold their target while the notes above them finish loading (`holdInView` in `lib/followHash.ts`).

## How the pathways stand, and their gaps (for a writing run)

"Bible pathways" could mean three things on this site. All three were read.

1. **Bible reading plans** (/study/plans, the Bible door's sixth room): the year through the whole story, five charts to print, Proverbs in 31 days, the Bible's story at your own pace, four family plans. No gap found: the four family plans have every day in order (30, 30, 30 and 21), each with a passage and a prompt.
2. **Topic pathways** (/pathways/:slug, twelve of them: a few essays, a study, then a book). Their hub, /pathways, has been a redirect to /writing since the simplified site of 2026-10-12, so nothing lists them. Gaps a reader hits:
   - Eight of the twelve open on an empty first step ("The essays for this step are off the shelf for now"): manhood, marriage, money, parenting, prayer, rest-and-rhythm, suffering-and-grief, work-and-vocation. Every essay in their first step is retired.
   - The other four show part of their first step: anxiety 1 of 4 essays, christian-nationalism 2 of 5, doubt-and-deconstruction 1 of 4, progressive-captivity 1 of 5.
   - The last step is headed "Then, the book", but in ten pathways it leads to something that is not a book: a self-check (marriage, money), a tool (rest-and-rhythm), a study guide (anxiety, parenting, prayer, suffering-and-grief), an everyday-life guide (work-and-vocation), /writing?track=manhood, or the list of books with no title named.
3. **Reading paths** (/reading-paths/:slug, four: ordered sets of study guides). Listed on /explore and on the Tools door's page. No gap found.

## Ideas that are James's to decide (not built), ranked

1. **Give Bible Explorer a room in the Family door.** Family has four rooms and room for two more. A parent looks for something for a child under Family; today the Explorer sits inside "The Bible's story" in the Bible door. It would stay one page with one name; only its home door would change.
2. **Decide the twelve topic pathways.** Either bring their hub back (/pathways is one redirect rule) and have the empty first steps written, or retire them. Today they are live, half-empty and all but unlisted.
3. **One name for a page, on the page too.** The table above lists fourteen pages whose H1 differs from the name the menus give them. Either the H1s change or the catalogue does; both are his words.
4. **Call the Wisdom Finder by that name.** The tool is listed as "What Does the Bible Say About What I Am Facing?". He calls it the Wisdom Finder, and so will readers. Search now finds it either way.
5. **Shorten the two longest pages.** /downloads is 62 phone screens and the Explorer's front page is 37. A jump list at the top of each, or a split of /downloads by kind, would save the most scrolling on the site.
6. **Home's ten numbered cards and the header's seven doors are two lists.** Home shows "06 Context and creeds", "09 Books", "05 Start here" beside doors the header names differently. Drawing Home's cards from the seven doors would make the first screen teach the menu. This is a change to the home page, so it waits for him.
7. **Put the plain subject on Find Help's lines.** "I can't stop worrying" is right for the person carrying it; a pastor or a friend scanning for "anxiety" does not see the word. A small second line under each (Anxiety, Grief, Marriage) would serve both.
8. **The two tools no menu lists** (The Wisdom Books Explorer, Pray the Psalms): their final names, and whether they join Tools › Study and Tools › Pray and practise. Both groups stand at seven tools.
9. **Retire or redirect /quiz, /roadmap and /skeptic-track.** No page links to them; /quiz has no skip link.
10. **Name the door on a chapter's top.** A chapter says "The Study Bible" and the book; it does not say "Bible", the word in the header. Small, and it touches the most-visited page type, so it is his call.

## Measurements

Lighthouse 13.6.0, the median of three runs each, phone profile, on the served build:

| Page | Before: performance / accessibility / CLS | After: performance / accessibility / CLS |
|---|---|---|
| / | 99 / 100 / 0.000 | 100 / 100 / 0.000 |
| /study/bible/romans/8 | 89 / 100 / 0.000 | 90 / 100 / 0.000 |
| /explore | 90 / 100 / 0.000 | 90 / 100 / 0.000 |
| /questions | 93 / 100 / 0.000 | 94 / 100 / 0.000 |

Best practices 96 and SEO 100 on all four, before and after. "Before" was measured on this unit's starting point; the branch it merges into, built without this unit on 2026-11-21, measured 99, 87, 90 and 93.

One thing was caught by these numbers and put right. /explore first read 88 to 89 after the change, because the page had begun to ask for the questions manifest (over 100 KB) as it loaded. The manifest is now read by a file of its own, only when the Questions listing nears the screen and the browser is idle (`useLiveAreas` in `lib/siteNav.ts`, `lib/liveAreas.ts`), and /explore's own files are what they were. The search's spelling test carries its own copy of the Wisdom Finder's edit distance (a test holds the two together), so the finder's matcher stays in the finder's own file.

Sideways scroll: none, on 58 key pages at 390 and at 1440 on the final build, and on every step of every walk. Console errors: none beyond the local server's missing /_vercel scripts and /api/track.

Screenshots: `/home/user/elite-shots/nav/` (before: `base-*`, `look-*`; after: `a-*`, `after-*`, `final-*`).

## Not verified

- A real phone, Safari, or a screen reader. Focus order and rings were checked by script in Chromium only.
- The before walks at 1440 (read from the catalogue, not walked).
- An essay that lives only in the database: the local server has no database, so such an essay's page draws empty there. The next-essay card was seen on essays that have a file.
- Lighthouse on any page but the four above. axe was not run by itself (Lighthouse's accessibility score includes its rules).
- The live site: nothing was deployed or looked at there.
