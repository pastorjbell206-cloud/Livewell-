# LiveWell stock-take: pages and the map

Inventory key: `pages-and-map`. Taken 2026-11-18 from `/home/user/Livewell-` on branch `claude/todo-implementation-hhp4bm` (head `7ef918a3`). Read-only: nothing was edited and no build was run.

**How this was done.** Every `<Route>` in `client/src/App.tsx` was read and sorted. `client/src/lib/siteNav.ts`, `vercel.json`, `client/src/lib/site-structure.test.ts` and `scripts/generate-sitemap.mjs` were read in full. A script followed the literal links in every routed page (and the components each imports) to work out how many taps each page is from Home and which pages nothing reaches. That script reads code, not a browser: a link built from data at run time can be missed, and a link that is passed to a component but never drawn can be counted. Where a finding rests on that, it says so.

**A "tap" here** means one press on a link. Opening a menu is not counted, so a page listed in the header menu is 1 tap on a laptop and, in practice, 2 presses on a phone (open the menu, press the link).

---

## 1. The headline

The route table holds **300 addresses**: 182 that draw a page, 94 that only send the visitor on, 23 admin pages and the not-found page. Of the 182 real pages, **110 should stay as they are, 23 should fold into another page, 9 need a plainer name, 3 need rebuilding, and 37 should come down** (34 of those 37 are book sales and thank-you pages for books James has taken off the shelf). Nothing James named is missing, and all of it is within three taps of Home. The trouble is the opposite: the same job is done at two, three or five addresses, and **45 live pages are reached by no menu, hub or link** (32 of them thank-you pages).

---

## 2. Where the audit of 2026-11-17 is now out of date

The code has moved since `docs/work/audit-2026-11/`. These audit statements are no longer true on this branch:

| The audit said | On this branch |
|---|---|
| No Family or Topics door; the pending menu was not merged | Merged. The header carries Study, Topics, Family, Essays, About (`siteNav.ts`). |
| `/connect` redirects to `/about`; there is no one place to find James | `/connect` is a live page ("Find James"), in the About menu and the footer, and a test holds it there. The Decision Log in `CLAUDE.md` still lists `/connect` as folded; that line is stale. |
| `/membership` is live and sells a membership | Redirects to `/subscribe` (both runtimes). |
| `/authors/james-bell` and `/dashboard` are leftover live pages | Redirect to `/about` and `/my-library`. |
| No page says "new here"; `/start` is a quiz | `/start` is a page ("New to Faith, or Coming Back: Where to Start"), in two menus and on Home. The quiz moved to `/start/quiz`. |
| The compare page is built and nothing links to it | `/theology/compare` is in the Study menu. |
| A reader cannot search the Bible for a word | `/study/bible/search` exists and is routed. (Not opened in a browser here.) |
| `/roadmap` is in the sitemap and linked from `/books` | Out of the sitemap, marked noindex, linked from nowhere. Still a live page. |
| Five off-shelf books are in the sitemap and indexed | Out of the sitemap and marked noindex. Still live sales pages (see 6.4). |
| Most tool and page titles are slogans | Many of the audit's renames are already in: the 36 tool names in `ToolsHub.tsx`, the menu labels, and the search titles of `/diagnostic`, `/skeptic-track`, `/start/quiz`, `/theology/which-view`, `/tools/theology-quiz`. |
| The shelf goes to 40 essays once pending work merges | Not on this branch. `shelf.json` has 60 essays: 15 live, 45 pending, and 5 of the pending have their file in `client/public/essays/`. So **20 essays are public and 40 addresses answer with the notice**. |

Still true: `/theology/creeds` and `/theology/questions` are live doubles; there are two glossaries; `/quiz` still draws the quiz inside the app.

---

## 3. The true map today

### 3.1 On every page

Header: **Study · Topics · Family · Essays · About**, with Find Help, search and Subscribe beside them. The footer repeats every group and adds My Library, Privacy, Terms and Accessibility.

### 3.2 Home (`/`)

Links drawn on the page: `/start`, `/study/bible`, `/theology/history`, `/topics`, `/family`, `/writing`, `/books`, `/resources`, `/studyguides`, `/help`, three featured essays, the Find field (opens passages and search) and tonight's devotion.

### 3.3 The five doors, and what is under each

| Door | In the header menu (1 tap) | On the hub page, one tap further (2 taps) | Deeper |
|---|---|---|---|
| **Study** `/study` | Study overview; The Study Bible `/study/bible`; New to faith `/start`; Church history `/theology/history`; Creeds `/resources/creeds`; Bible background `/resources/context`; Small group study guides `/studyguides`; Compare the views `/theology/compare`; Read the Bible in a year `/study/bible/guides/whole-story-2027` | The story of the Bible `/study/bible/story`; doctrines `/study/bible/doctrines`; guides `/study/bible/guides`; any book and chapter; traditions `/theology/traditions`; the injustice timeline `/justice/timeline`; two witnesses pages; glossary `/theology/glossary`; `/theology/search`; `/tools` | A history essay, a creed, a context guide, a study guide: 2 taps. A doctrine study `/theology/doctrine/:slug`: 2 to 3. `/theology/how-to-use`: 3. The six `/compare/*` pages: 2. |
| **Topics** `/topics` | Hard questions by topic; Honest answers `/answers`; Eight-week plans `/plans`; Self-checks `/assessments`; All tools `/tools`; New to faith `/start`; All resources `/resources`. Footer only: Find help, How-to guides `/how-tos`, Downloads, Booklets for elders | The three topic pages `/topics/:slug`; each tool; each plan; each self-check | `/theology/questions` (from `/answers`); `/theology/which-view` (from `/assessments`); `/life` (from `/how-tos`, `/wisdom`); `/wisdom` (from `/tools`); `/pathways/:slug` (from a topic page or two tools): all 2 to 3 |
| **Family** `/family` | Family overview; Tonight `/family/tonight`; All devotions `/family/devotions`; Catechism `/family/catechism`; Reading plans `/family/reading-plans` | A devotion `/family/devotions/:id`; ten how-to guides; five tools; `/skeptic-track`; `/help/parenting`, `/help/marriage`; `/topics/raising-children-in-a-secular-age` | |
| **Essays** `/writing` | One link | An essay `/writing/:slug` | The group guide for an essay `/group-guide/:slug`: 3 |
| **About** `/about` | About James; Books `/books`; Speaking; Contact; Find James `/connect`. Footer only: the three book pages, Subscribe, the podcast, ENDS | | |
| **Find Help** `/help` | One link, on every page | 40 help pages `/help/:slug` | |

### 3.4 How far each thing James named is from Home

| What James named | Address | Taps |
|---|---|---|
| The Study Bible | `/study/bible` | 1 |
| A Bible chapter | `/study/bible/:book/:chapter` | 2 (or 1 from the Find field) |
| Bible context | `/resources/context` | 1; a guide is 2 |
| Church history | `/theology/history` | 1; a lesson is 2 |
| Hard questions | `/topics`, `/answers` | 1 |
| Family, tonight's devotion | `/family`, `/family/tonight` | 1 |
| Discipleship (start here) | `/start` | 1 |
| Essays | `/writing` | 1; an essay is 2 |
| Books | `/books` | 1; a book is 2 (1 from the footer) |
| Tools | `/tools` | 1; a tool is 2 |
| Reaching James | `/connect`, `/contact` | 1 |

The three-tap rule in the project prompt is met for everything he named. What fails is "a stranger could hold it in their head": the Study menu has 9 items, the Topics group has 11, and `/start` sits in both.

### 3.5 Pages that no menu, hub or in-page link reaches (45)

| Pages | Count | Why it matters |
|---|---|---|
| `/faq/*` (ten question pages) | 10 | They link only to each other. All ten are in the sitemap, so Google sends people into a room with no door back to the Honest Answers. |
| `/reading-paths/:slug` | 1 template (4 paths in `client/public/reading-paths/index.json`) | Linked only from page files that are no longer routed. Prerendered at build, so search engines can still find them. |
| `/roadmap` | 1 | Noindex, unlinked, still live. |
| `/quiz` | 1 | `vercel.json` already sends it to `/tools/theology-quiz`; the app still draws the quiz at the old address. |
| Thank-you pages for the three shelf books | 3 | Meant to be unlinked: Stripe sends a buyer there. Fine. |
| Thank-you pages for books off the shelf | 29 | Six under `/books/…/thank-you` and 23 at the top level (`/covenant/thank-you` and the like). Their sales pages already redirect to `/books`, so these are download pages for books no longer sold. Anyone with the address can open them. |
| `/tools/glossary` | (reached, but only from `/tools`) | Listed here because its twin `/theology/glossary` is the one the Study page links. |

Reached, but thinly (one or two inbound links): `/nation` (only from its own scorecard and policy tools and the consistency check, 3 taps; it is linked in the data of one topic page as well), `/theology/how-to-use` (only from a doctrine study, 3 taps), `/life` (in no menu and not in the footer, though it holds 69 guides), `/skeptic-track` (from `/help` and `/family` only), `/contact` (menu and `/about` only), the five off-shelf book pages (see 6.4).

### 3.6 The sitemap, checked against the route table

`scripts/generate-sitemap.mjs` lists 119 fixed pages and 13 content families. It lists no address that only redirects (the test holds this). It does list the ten orphaned `/faq/*` pages and the doubles `/theology/creeds`, `/theology/questions` and `/tools/glossary`. It does not list `/study/bible/story`, `/study/bible/doctrines`, `/study/bible/guides`, `/study/bible/guides/whole-story-2027`, `/study/bible/search`, `/theology/search` or `/my-library` in the fixed list; the Bible pages may be added by the Bible manifest further down the script, which was not traced line by line.

### 3.7 Page files that are no longer on the site

`client/src/pages/` holds 309 files. **109 are routed nowhere and imported by nothing**: the old leadership section (22 files), the ten crisis landings, the old hubs (`Theology`, `Pillars`, `Map`, `Explore`, `Library`, `Doubt`, `Marriage`, `Parenting`, `Membership` and others), 19 old book sales pages, the table pages and four pastor tools. The Decision Log says folded page files stay in the repo so a page can come back. They cost nothing to a visitor, but they are where stale links and old claims about James live, and they are why a code search turns up addresses that no longer exist. See the decision list.

---

## 4. Same content or job at two addresses

| # | The job | Where it lives today | Keep | Fold |
|---|---|---|---|---|
| 1 | The creeds | `/resources/creeds` (library, full texts) and `/theology/creeds` | `/resources/creeds` | `/theology/creeds` (on the never-redirect list: James) |
| 2 | Hard questions index | `/topics`, `/answers`, `/theology/questions`, ten `/faq/*` pages | `/topics` (by subject) and `/answers` (the answers) | `/theology/questions` and the ten `/faq/*` |
| 3 | Glossary | `/theology/glossary` and `/tools/glossary` | `/theology/glossary` | `/tools/glossary` (a tool address: James) |
| 4 | "What do I believe" quiz | `/tools/theology-quiz`, `/quiz`, `/theology/which-view` | `/tools/theology-quiz` | `/quiz` now; `/theology/which-view` if the tools stock-take agrees they are one job |
| 5 | "Where do I start" | `/start`, `/start/quiz`, `/diagnostic`, `/skeptic-track`, and `/start` twice in the menus | `/start` as the one road; `/diagnostic` as a self-check | `/start/quiz` into `/start` |
| 6 | What I saved | `/my-library` and `/tools/saved` | `/my-library` | `/tools/saved` (tool address: James) |
| 7 | A whole-life check | `/life/assessment` and `/tools/life-audit` | `/life/assessment` | `/tools/life-audit` (tool address: James) |
| 8 | Verses by subject | `/tools/verse-finder`, `/tools/parenting-verses`, `/tools/bible-on`, `/tools/wisdom-finder`, `/wisdom` (the last three read the same file, `wisdom/topics.json`) | `/tools/verse-finder` and `/tools/bible-on` | the other three hubs; the `/wisdom/:id` pages stay (tool addresses: James) |
| 9 | Study a book of the Bible | `/tools/bible-study` (12 books), `/tools/deep-bible` (20 books), and the Study Bible's own 66 book introductions | The Study Bible, with `/tools/deep-bible` | `/tools/bible-study` (tool address: James) |
| 10 | Search | `/search`, `/theology/search`, `/study/bible/search` | `/search` for the site, `/study/bible/search` for words in the Bible | `/theology/search` (never-redirect list: James) |
| 11 | Doctrine studies | `/study/bible/doctrines/:id` (62) and `/theology/doctrine/:slug` (31) | Both for now, cross-linked | Whether the 31 fold into the 62 is a content call (never-redirect list: James) |
| 12 | Everything to use | `/resources`, `/tools`, `/downloads`, `/assessments` | All four, but `/resources` becomes the plain map of the whole site | |
| 13 | Everyday Christian life | `/life` (69 guides), `/how-tos` (132), `/wisdom` (topics) | `/life` as the one hub, listing the how-tos | `/wisdom` hub (see 8) |
| 14 | One page per hard season | `/help/:slug` (40), `/plans/:slug` (29), `/pathways/:slug` (12), `/topics/:slug` (3) | `/help` (first aid), `/plans` (eight weeks), `/topics` (the question) | `/pathways/:slug`, each to its matching topic or help page |
| 15 | Faith and politics | `/nation` (hub, 11 essays, 2 tools), the "faith and power" essay section, `/topics/faith-politics-and-the-flag`, `/disruption/consistency` | All; the topic page is the front door and links the rest | |
| 16 | Witnesses | `/justice/witnesses` and `/disruption/witnesses` (one component, two lists) | Both addresses, shown as two tabs of "People" inside church history | |
| 17 | Timelines | `/justice/timeline` and the timeline inside `/theology/history` | Both; link each from the other | |
| 18 | Compare the views | `/theology/compare`, six `/compare/*` pages, `/faq/catholic-vs-protestant` | The first seven | the FAQ page |
| 19 | A devotion for tonight | `/family/tonight` and `/tools/family-devotions` (a builder) | Both; the builder is offered from Tonight, not as a rival | |
| 20 | Reaching James | `/connect`, `/contact`, `/about` ("Reach James"), `/subscribe`, `/speaking` | All; `/connect` is the hub and the others are its rooms | |
| 21 | A verse in context | `/theology/passage` and the chapter page of the Study Bible | Both; link the tool from every chapter | |
| 22 | Books | `/books`, three shelf pages, five off-shelf pages, `/books/:slug` from the database, `/roadmap` | `/books` and the three | the rest (James) |

---

## 5. The simplest map that still holds everything

### 5.1 The napkin

```
                         HOME
        one sentence · a search box · tonight's devotion
                           |
   -------------------------------------------------------------
   |            |            |           |          |          |
 STUDY       QUESTIONS     FAMILY      ESSAYS     ABOUT     FIND HELP
 the Bible   and everyday  at the      James's    James,    (every page)
 and the     life          table       writing    books,
 church's                                         contact
 story
```

Five doors and Find Help, as James chose on 2026-10-26. Nothing new is added to the header. What changes is that **each door opens to no more than six things, the hub page and the menu show the same six in the same order, and no link appears under two doors.**

| Door | The six (or fewer) | What sits inside each |
|---|---|---|
| **Study** | 1. Start here `/start` | The road for a new or returning Christian: one Gospel, the Apostles' Creed, the new-believer plan, a weekly rhythm, first memory verses. This is where discipleship lives. |
| | 2. The Study Bible `/study/bible` | Read, search a word, the story in eleven parts, the reading guides, the year plan, read a verse in context |
| | 3. Church history `/theology/history` | The course, the timeline, the people (both witnesses lists), the traditions, the injustice timeline |
| | 4. Bible background `/resources/context` | The 41 context guides |
| | 5. What Christians believe `/study/bible/doctrines` | The doctrine studies, the creeds and confessions, compare the views, the glossary |
| | 6. Study with a group `/studyguides` | The 68 guides, the booklets for elders, downloads |
| **Topics** (see decision 2 on the word) | 1. Hard questions `/topics` | The topic pages and the Honest Answers `/answers` |
| | 2. For skeptics `/skeptic-track` | Test the Case, the skeptic's plan |
| | 3. Everyday life `/life` | The 69 life guides, the 132 how-tos, what the Bible says about each subject |
| | 4. Eight-week plans `/plans` | The 29 plans |
| | 5. Tools and self-checks `/tools` | Every tool; `/assessments` is the self-check view of the same list |
| | 6. Find help `/help` | The 40 help pages |
| **Family** | Tonight · All devotions · The catechism · Reading plans | As today. Parenting and marriage help are linked from the hub, not the menu. |
| **Essays** | One link | The shelf; the faith-and-politics library `/nation` linked from its section |
| **About** | About James · Books · Speaking · Find James `/connect` · Contact | Subscribe, Substack, Facebook, the podcast and ENDS live on Find James |

Footer: the same five groups, then one line: My Library · Everything on one page `/resources` · Downloads · Privacy · Terms · Accessibility.

Counts: the Study menu goes from 9 links to 6, Topics from 11 to 6, About from 11 to 5. Every address in the old menus still works and is one tap from the hub that now holds it.

### 5.2 What moves where

No address in this table changes unless the last column says so. A "move" is a change of which menu or hub links to the page.

| Item | Today | Proposed | Address change |
|---|---|---|---|
| `/start` | In the Study menu and the Topics menu | First item under Study only; the button on Home | None |
| Creeds `/resources/creeds` | Study menu | Inside "What Christians believe" and on `/study` | None |
| Compare the views `/theology/compare` and six `/compare/*` | Study menu | Inside "What Christians believe" | None |
| Glossary `/theology/glossary` | `/study` page | Inside "What Christians believe" | None |
| Year plan `/study/bible/guides/whole-story-2027` | Study menu | On `/study/bible` and Home | None |
| `/justice/timeline`, both witnesses pages, `/theology/traditions` | Loose rows on `/study` | Tabs or rows inside `/theology/history` | None |
| `/theology/passage` | `/tools` only | Linked from every chapter page | None |
| `/life`, `/how-tos`, `/wisdom/:id` | `/life` in no menu; `/how-tos` footer only | One hub, "Everyday life", under Topics | `/wisdom` hub folds (decision 4) |
| `/skeptic-track` | Linked from `/help` and `/family` | Second item under Topics; linked from `/start` and `/answers` | None |
| `/assessments` | Topics menu | A view of `/tools`; linked from `/tools` and `/help` | None |
| `/resources` | Topics menu and footer | Footer; rebuilt as the plain map of the whole site | None |
| `/downloads`, `/resources/hard-issues-series` | Footer | Footer, and under "Study with a group" | None |
| `/nation` and its 13 pages | Out of the nav, 3 taps | Linked from `/topics/faith-politics-and-the-flag` and the faith-and-power essay section: 2 taps | None |
| `/theology/how-to-use` | From a doctrine study only | Linked from the top of both doctrine indexes | None |
| The three book pages | Footer | On `/books` only | None |
| Subscribe, podcast, ENDS | About footer group | On `/connect` | None |
| `/theology/questions` | Live | Redirect to `/answers` | Yes |
| Ten `/faq/*` pages | Live, orphaned | Each redirects to its matching Honest Answer, or `/answers` where there is none (section 6.2) | Yes |
| `/start/quiz` | Live | Folds into `/start` | Yes |
| `/quiz` | Live in the app | Stub to `/tools/theology-quiz`, matching `vercel.json` | Yes (already 301 in production) |
| `/roadmap` | Live, unlinked | Redirect to `/books` | Yes |
| `/reading-paths/:slug` | Live, orphaned | Redirect to `/start` | Yes |
| `/pathways/:slug` (12) | Live | Each redirects to its topic or help page as that page is ready | Yes, in stages |
| Five off-shelf book pages and 29 thank-you pages | Live | Redirect to `/books` | Yes (decision 5) |
| `/theology/creeds`, `/theology/search` | Live, on the never-redirect list | Fold into `/resources/creeds` and `/search` | Only on James's word (decision 3) |
| Seven tool doubles (section 4, rows 3, 6, 7, 8, 9) | Live, in the tools registry | Fold into their twins | Only on James's word (decision 4) |

**Rules for every redirect.** One permanent hop in `vercel.json`, a matching `redirectTo` stub in `App.tsx`, an entry in `FOLDED` in `site-structure.test.ts`, the address removed from the sitemap, `prerender-heads.mjs` and `llms.txt`, and every in-app link re-pointed so a reader never takes the extra hop. A redirect never lands on another redirect. A page on the never-redirect list is first taken off `KEPT` in the test, which is why it needs James.

### 5.3 The order to do it in

1. **No decision needed (small):** stub `/quiz`; redirect `/theology/questions`, `/roadmap`, `/reading-paths/:slug` and the ten `/faq/*`; take `/start` out of the Topics menu; add `/life` and `/skeptic-track` to the Topics group; link `/nation` from its topic page; correct the `/connect` line in the Decision Log.
2. **Menus and hubs (medium):** cut the three menus to the six-item lists; make `/study` and `/topics` show the same six; rebuild `/resources` as the plain map; move the timeline, witnesses and traditions inside church history.
3. **On James's word:** the off-shelf books and their thank-you pages; the tool doubles; the two never-redirect doubles; the word on the Topics door.
4. **In stages, with the writing work:** `/pathways/:slug` into topic pages; the 31 older doctrine studies.

---

## 6. The inventory: one row per item

Verdicts: **keep**, **merge** (into what), **rename** (to what), **rewrite**, **retire** (and where its address sends people). "Taps" is from Home on this branch. A star marks a page nothing reaches.

### 6.1 Main pages (54)

| # | Address | What it is | Taps | Verdict | Note |
|---|---|---|---|---|---|
| 1 | `/` | Home | 0 | rewrite | One sentence, the search box and tonight's devotion on the first phone screen; six doors under it. Design wave. |
| 2 | `/study` | Study hub | 1 | keep | Show the same six items as the menu |
| 3 | `/study/bible` | The Study Bible | 1 | keep | |
| 4 | `/study/bible/story` | The Bible's story in eleven parts | 2 | keep | |
| 5 | `/study/bible/doctrines` | 62 doctrine studies | 2 | rename | Menu label "What Christians believe"; it becomes the hub for creeds, compare and glossary |
| 6 | `/study/bible/guides` | Reading guides | 2 | keep | |
| 7 | `/study/bible/guides/whole-story-2027` | The Bible in a year | 1 | keep | |
| 8 | `/study/bible/search` | Search the Bible for a word | 2 | keep | |
| 9 | `/theology/history` | Church history | 1 | keep | Becomes the course; holds the timeline, people and traditions |
| 10 | `/theology/compare` | 31 debated doctrines side by side | 1 | keep | |
| 11 | `/theology/glossary` | Glossary | 2 | keep | Takes in `/tools/glossary` |
| 12 | `/theology/creeds` | Second creeds page | 2 | merge | Into `/resources/creeds`. Never-redirect list: James. |
| 13 | `/theology/questions` | Third hard-questions index | 2 | merge | Into `/answers` |
| 14 | `/theology/traditions` | The Christian traditions | 2 | rename | "The Christian traditions: who believes what"; shown inside church history |
| 15 | `/theology/search` | Search of the doctrine section | 2 | merge | Into `/search`. Never-redirect list: James. |
| 16 | `/theology/how-to-use` | How to use the doctrine studies | 3 | rename | Heading "How to use the doctrine studies"; link it from both doctrine indexes |
| 17 | `/justice/timeline` | Timeline of injustice | 2 | rename | "A timeline of injustice, in the church and outside it" |
| 18 | `/justice/witnesses` | People who fought injustice | 2 | rename | "Christians who fought injustice, and what it cost them" |
| 19 | `/disruption/witnesses` | People who corrected the church | 2 | rename | "Christians who told the church the truth" |
| 20 | `/resources` | "All resources, on one page" | 1 | rewrite | As the plain map of the whole site, in the order of the five doors |
| 21 | `/resources/context` | Bible background library | 1 | keep | |
| 22 | `/resources/creeds` | Creeds and confessions library | 1 | keep | |
| 23 | `/resources/hard-issues-series` | Booklets for elders | 1 | keep | Seven booklets that name the network are held back as of the last commit |
| 24 | `/downloads` | Every printable | 1 | keep | |
| 25 | `/studyguides` | 68 group study guides | 1 | keep | |
| 26 | `/topics` | Hard questions by topic | 1 | keep | |
| 27 | `/answers` | Honest answers, all on one page | 1 | keep | |
| 28 | `/help` | Find Help | 1 | keep | |
| 29 | `/plans` | 29 eight-week plans | 1 | keep | |
| 30 | `/start` | Where to start | 1 | rewrite | As the discipleship road: five ordered steps, each a page that already exists |
| 31 | `/skeptic-track` | For skeptics | 2 | rename | Menu label "For skeptics: start here"; give it a place under Topics |
| 32 | `/life` | Hub of 69 life guides | 2 | rename | "Everyday life"; drop "Integrated Life" and "The Capstone" |
| 33 | `/wisdom` | Index of "what the Bible says about" | 2 | merge | Into `/tools/bible-on`, which reads the same file. Tool registry: James. |
| 34 | `/how-tos` | 132 how-to guides | 1 | keep | Listed under Everyday life |
| 35 | `/family` | Family hub | 1 | keep | |
| 36 | `/family/tonight` | Tonight's devotion | 1 | keep | |
| 37 | `/family/devotions` | All devotions | 1 | keep | |
| 38 | `/family/catechism` | The catechism | 1 | keep | Wording changes only on James's word |
| 39 | `/family/reading-plans` | Family reading plans | 1 | keep | |
| 40 | `/writing` | Essays | 1 | keep | |
| 41 | `/books` | Books | 1 | keep | |
| 42 | `/roadmap` ★ | Books in progress | none | retire | To `/books` |
| 43 | `/about` | About James | 1 | keep | Facts wait on James |
| 44 | `/speaking` | Speaking | 1 | keep | |
| 45 | `/contact` | Contact | 1 | keep | |
| 46 | `/connect` | Find James | 1 | keep | |
| 47 | `/subscribe` | Subscribe | 1 | keep | |
| 48 | `/search` | Site search | 1 | keep | |
| 49 | `/my-library` | What this reader saved | 1 | keep | Takes in `/tools/saved` |
| 50 | `/assessments` | Self-checks | 1 | keep | A view of `/tools`; out of the menu |
| 51 | `/privacy` | Privacy | 1 | keep | |
| 52 | `/terms` | Terms | 1 | keep | |
| 53 | `/accessibility` | Accessibility | 1 | keep | |
| 54 | `/nation` | The Bible and American politics | 3 | rename | "The Bible and American politics"; linked from its topic page |

### 6.2 Content templates (49)

| # | Address | Holds | Taps | Verdict | Note |
|---|---|---|---|---|---|
| 55 | `/study/bible/:book` | 66 book introductions | 2 | keep | |
| 56 | `/study/bible/:book/:chapter` | 1,189 chapters | 2 | keep | |
| 57 | `/study/bible/story/:act` | 11 parts | 3 | keep | |
| 58 | `/study/bible/doctrines/:id` | 62 studies | 3 | keep | |
| 59 | `/study/bible/guides/:id` | Reading guides | 3 | keep | |
| 60 | `/theology/history/:slug` | 22 history essays | 2 | keep | |
| 61 | `/theology/doctrine/:slug` | 31 older doctrine studies | 2 to 3 | keep | Cross-link to the 62; folding is a later content call |
| 62 | `/resources/context/:slug` | 41 context guides | 2 | keep | |
| 63 | `/resources/creeds/:slug` | 14 creeds and confessions | 2 | keep | |
| 64 | `/studyguides/:slug` | 68 guides | 2 | keep | |
| 65 | `/topics/:slug` | 3 topic pages (17 rows on the index) | 2 | keep | Grows as pathways fold in |
| 66 | `/help/:slug` | 40 help pages | 2 | keep | |
| 67 | `/plans/:slug` | 29 plans | 2 | keep | |
| 68 | `/life/:slug` | 69 life guides | 3 | keep | 2 once `/life` is under Topics |
| 69 | `/wisdom/:id` | "What the Bible says about" pages | 3 | keep | |
| 70 | `/how-tos/:slug` | 132 how-tos | 2 | keep | |
| 71 | `/family/devotions/:id` | 112 devotions | 2 | keep | |
| 72 | `/writing/:slug` | 60 addresses: 20 essays, 40 notices | 2 | keep | |
| 73 | `/group-guide/:slug` | Discussion guide for an essay | 3 | keep | |
| 74 | `/reading-paths/:slug` ★ | 4 old reading paths | none | retire | To `/start` |
| 75 | `/pathways/:slug` | 12 subject paths | 2 to 3 | merge | Into `/topics/:slug` or `/help/:slug`, one at a time |
| 76 | `/books/:slug` | Any book in the database | 2 | keep | An off-shelf slug should go to `/books` (decision 5) |
| 77 to 87 | `/nation/state-of-the-american-church`, `/christian-nation`, `/theocracy`, `/empire`, `/which-party`, `/render`, `/christian-nationalism`, `/nationalism-history`, `/power-and-church`, `/progressive-captivity`, `/compassion-and-coercion` | 11 essays | 4 | keep (11) | 3 once `/nation` is linked from its topic page |
| 88 to 93 | `/compare/catholic-vs-protestant`, `/calvinism-vs-arminianism`, `/baptist-vs-methodist`, `/evangelical-vs-mainline`, `/orthodox-vs-catholic`, `/liturgical-vs-contemporary` | 6 comparisons | 2 | keep (6) | |
| 94 | `/faq/does-god-exist` ★ | | none | merge | Into the matching Honest Answer |
| 95 | `/faq/is-the-bible-historically-accurate` ★ | | none | merge | Into the matching Honest Answer |
| 96 | `/faq/can-science-and-faith-coexist` ★ | | none | merge | Into the matching Honest Answer |
| 97 | `/faq/what-do-christians-believe-about-hell` ★ | | none | merge | Into the matching Honest Answer |
| 98 | `/faq/what-is-deconstruction` ★ | | none | merge | Into `/help/deconstructing` or the matching answer |
| 99 | `/faq/what-is-religious-trauma` ★ | | none | merge | Into `/help/church-hurt` |
| 100 | `/faq/why-are-people-leaving-church` ★ | | none | merge | Into the matching answer or topic page |
| 101 | `/faq/why-do-young-people-leave-church` ★ | | none | merge | Into `/topics/raising-children-in-a-secular-age` |
| 102 | `/faq/catholic-vs-protestant` ★ | | none | merge | Into `/compare/catholic-vs-protestant` |
| 103 | `/faq/what-denomination-should-i-join` ★ | | none | merge | Into `/theology/traditions` |

The targets for rows 94 to 103 are by subject. Whoever does the fold must read each FAQ page against its target first and carry over anything the target lacks; where no answer matches, the address goes to `/answers`.

### 6.3 Tools (39)

Tool addresses stay unless James says otherwise. Every "merge" below except the first two is therefore a proposal for him (decision 4). The tools stock-take should confirm each pair is truly one job.

| # | Address | Name on the tools page | Taps | Verdict | Note |
|---|---|---|---|---|---|
| 104 | `/tools` | All tools | 1 | keep | |
| 105 | `/tools/test-the-case` | Test the Case for Christianity | 2 | keep | |
| 106 | `/tools/which-lens` | What Shapes the Way You Read the Bible? | 2 | keep | |
| 107 | `/tools/deep-bible` | Book-by-Book Bible Study: 20 Books | 2 | keep | |
| 108 | `/tools/bible-study` | How to Study a Book of the Bible: 12 Books | 2 | merge | Into `/tools/deep-bible` |
| 109 | `/tools/theology-quiz` | Theology Quiz | 2 | keep | |
| 110 | `/quiz` ★ | The same quiz at its old address | none | retire | To `/tools/theology-quiz`; production already redirects |
| 111 | `/theology/which-view` | Which Christian View Do You Lean Toward? | 2 | merge | Into `/tools/theology-quiz` if they are one job |
| 112 | `/diagnostic` | Where Are You With God? | 2 | keep | |
| 113 | `/start/quiz` | Where to Start on LiveWell | 2 | merge | Into `/start` |
| 114 | `/life/assessment` | The Whole-Life Assessment | 2 | keep | |
| 115 | `/tools/life-audit` | A Quick Check on Eight Areas of Life | 2 | merge | Into `/life/assessment` |
| 116 | `/tools/bible-on` | What the Bible Says About Money, Anger, Work and More | 2 | keep | |
| 117 | `/tools/wisdom-finder` | What Does the Bible Say About What I Am Facing? | 2 | merge | Into `/tools/bible-on` (same data file) |
| 118 | `/tools/verse-finder` | Bible Verse Finder | 2 | keep | |
| 119 | `/tools/parenting-verses` | Parenting Bible Verses | 2 | merge | Into `/tools/verse-finder` as one of its subjects |
| 120 | `/tools/proverbs-31` | Proverbs in 31 Days | 2 | keep | |
| 121 | `/theology/passage` | Read Any Bible Verse in Context | 2 | keep | Link from every chapter |
| 122 | `/tools/rule-of-life` | Build a Weekly Rhythm of Prayer and Rest | 2 | keep | |
| 123 | `/tools/scripture-memory` | Memorize Scripture: 40 Key Verses | 2 | keep | |
| 124 | `/tools/prayer-generator` | Prayers for When You Have No Words | 2 | keep | |
| 125 | `/tools/prayer-planner` | The Prayer Planner | 2 | keep | |
| 126 | `/tools/worry-journal` | The Worry Journal | 2 | keep | |
| 127 | `/tools/connection-planner` | A Plan for When You Feel Alone | 2 | keep | |
| 128 | `/tools/family-devotions` | Family Devotion Builder | 2 | keep | |
| 129 | `/tools/parent-teen-conversation` | The Parent and Teen Conversation | 2 | keep | |
| 130 | `/tools/parenting-guide` | Parenting Stage Guide | 2 | keep | |
| 131 | `/tools/marriage-assessment` | Marriage Health Self-Check | 2 | keep | |
| 132 | `/tools/conflict-guide` | Conflict Resolution Guide | 2 | keep | |
| 133 | `/tools/financial-health` | Financial Health Self-Check | 2 | keep | |
| 134 | `/tools/emotional-health` | Emotional Health Self-Check | 2 | keep | |
| 135 | `/tools/spiritual-gifts` | Spiritual Gifts Self-Check | 2 | keep | |
| 136 | `/tools/bible-says` | Misused Bible Verses | 2 | keep | |
| 137 | `/tools/quotes` | Quotes From the Essays and Books | 2 | keep | |
| 138 | `/tools/glossary` | Theology Glossary | 2 | merge | Into `/theology/glossary` |
| 139 | `/tools/saved` | Saved items | 2 | merge | Into `/my-library` |
| 140 | `/disruption/consistency` | Do You Hold Both Sides to the Same Standard? | 2 | keep | |
| 141 | `/nation/scorecard` | How Close Is Each Party to the Bible? | 2 | keep | |
| 142 | `/nation/policy` | What Would a Biblical Government Look Like? | 2 | keep | |

### 6.4 Sales and thank-you pages (40)

No landing page from the old `pages/landing/` folder is routed any more; all ten redirect to a Find Help page. What remains are book pages.

| # | Address | What it is | Taps | Verdict | Note |
|---|---|---|---|---|---|
| 143 | `/books/when-god-bless-america` | Shelf book | 1 | keep | |
| 144 | `/books/believe` | Shelf book | 1 | keep | |
| 145 | `/books/the-monster-in-the-mirror` | Shelf book | 1 | keep | |
| 146 to 148 | `/books/when-god-bless-america/thank-you`, `/books/believe/thank-you`, `/books/the-monster-in-the-mirror/thank-you` | Download pages after payment | by Stripe | keep (3) | They open for anyone who has the address |
| 149 to 153 | `/books/deconstruction-of-faith`, `/books/the-reliability-of-scripture`, `/books/bible-and-homosexuality`, `/books/bible-and-transgender-identity`, `/books/critical-race-theory-biblical` | Sales pages for books off the shelf, noindex, still showing a buy button | none in practice | retire (5) | To `/books`. The three shelf pages still name some of these in a "related" list passed to `BookNextSteps`; that component does not appear to draw the list, which was not confirmed in a browser. The five pages do link to each other. |
| 154 to 159 | `/books/…/thank-you` for deconstruction-of-faith, raising-believers, the-reliability-of-scripture, bible-and-homosexuality, bible-and-transgender-identity, critical-race-theory-biblical ★ | Download pages for off-shelf books | none | retire (6) | To `/books` |
| 160 to 182 | `/consider-the-birds/thank-you`, `/where-your-treasure-is/…`, `/alone-in-a-crowded-church/…`, `/covenant/…`, `/babylon/…`, `/how-to-read-the-bible/…`, `/be-true-to-yourself/…`, `/what-belongs-to-the-poor/…`, `/rule-of-life/…`, `/why-not-what/…`, `/sermon-on-the-mount-as-politics/…`, `/prophetic-justice-101/…`, `/marriage-in-ministry/…`, `/the-loneliness-of-the-pastor/…`, `/healwell/…`, `/born-again-from-atheism/…`, `/the-god-who-is-not-nice/…`, `/faith-after-deconstruction/…`, `/ordinary-holiness/…`, `/the-scandal-of-the-cross/…`, `/heaven-is-not-your-reward/…`, `/prayer-in-the-dark/…`, `/the-body-you-left/…` ★ | Download pages for 23 books whose sales pages already redirect | none | retire (23) | To `/books`, once James confirms no past buyer still needs the page |

### 6.5 Legacy addresses that redirect (94 in the app; 245 path rules in `vercel.json`)

All **keep**, as redirects. Every one is a single permanent hop and none lands on another redirect (the test holds this). Grouped by where they land:

| Lands on | Old addresses (app stubs) | Count |
|---|---|---|
| `/writing` | `/framework`, `/pillars`, `/living-well`, `/map`, `/explore`, `/library`, `/articles`, `/article-collections`, `/reading-paths`, `/pathways`, `/justice`, `/justice/posture`, `/justice/glossary`, `/justice/topic/:slug` | 14 |
| `/writing?section=faith-and-power` | `/disruption`, `/disruption/posture`, `/disruption/glossary`, `/disruption/questions`, `/disruption/topic/:slug`, `/capture-by-the-right`, `/capture-by-the-left`, `/reading-scripture-past-our-politics` | 8 |
| `/writing?section=after-christendom` | `/exile`, `/after-christendom`, `/post-christian` | 3 |
| `/study` | `/theology`, `/theology/paths`, `/historic-faith`, `/sermon-series` | 4 |
| `/study/bible/story`, `/guides`, `/doctrines` | `/theology/biblical`, `/theology/hermeneutics`, `/theology/explorer` | 3 |
| `/theology/history` | `/church-history` | 1 |
| `/studyguides/lament` | `/lament` | 1 |
| `/answers` | `/doubt`, `/faq`, `/honest-questions` | 3 |
| `/help/…` | `/marriage`, `/marriage-crisis`, `/grief`, `/faith-crisis`, `/parenting-help`, `/deconstruction`, `/church-hurt`, `/pastoral-burnout` | 8 |
| `/family` | `/parenting`, `/for-families` | 2 |
| `/start` | `/start-here`, `/pathways/discipleship` | 2 |
| `/resources` | `/leadership/*`, `/pastors`, `/for-leaders`, `/for-pastors`, `/the-pastoral-angle`, `/pastors-resource-wall` | 6 |
| `/tools` | `/table/*`, `/discipleship`, `/disciple-making`, `/tools/sermon-outline`, `/tools/pastor-burnout`, `/tools/church-health`, `/tools/discipleship-table` | 7 |
| `/books` | `/read/*`, `/book-bundles`, `/books/raising-believers`, and 23 old top-level book addresses | 26 |
| `/subscribe` | `/membership`, `/membership/success`, `/substack` | 3 |
| `/about`, `/speaking`, `/my-library` | `/authors/:slug`, `/work-with-james`, `/dashboard` | 3 |

`vercel.json` holds a further 151 rules with no stub in the app, nearly all old essay addresses (`/writing/<old-slug>`) sent to `/writing`, a `/writing` section, `/study`, `/study/bible/doctrines`, `/help/pastors` or `/life/the-wayward-child`, plus `/quiz`, `/books-store` and seven booklet folders. They work in production. Inside the app an old essay address shows the essay notice, which is acceptable.

Two things to note for the discipleship goal: `/discipleship` and `/disciple-making` land on `/tools`, and `/pathways/discipleship` lands on `/start`. Once `/start` is the discipleship road, all three should land there. That changes an existing redirect's target, which is allowed (still one hop).

### 6.6 Admin (23) and the not-found page (1)

All **keep**. `/admin/login` and 22 protected pages: dashboard, posts (list, new, edit), resources (list, new, edit), books (list, new, edit), about, settings, subscribers, sync, publish-content, commerce, setup-navigation, deduplicate, load-drafts, import-substack, moderation, notifications. Not reviewed in depth here. Five look like one-time jobs (setup-navigation, deduplicate, load-drafts, import-substack, sync) and one serves a shop the site no longer runs as built (commerce); an engineering pass should say which James still uses. `/404` and the catch-all stay.

---

## 7. The count

| Group | Count | Keep | Merge | Rename | Rewrite | Retire |
|---|---|---|---|---|---|---|
| Main pages | 54 | 37 | 4 | 9 | 3 | 1 |
| Content templates | 49 | 37 | 11 | 0 | 0 | 1 |
| Tools | 39 | 30 | 8 | 0 | 0 | 1 |
| Sales and thank-you pages | 40 | 6 | 0 | 0 | 0 | 34 |
| **Live pages** | **182** | **110** | **23** | **9** | **3** | **37** |
| Legacy redirects (app stubs) | 94 | 94 | | | | |
| Admin | 23 | 23 | | | | |
| Not found | 1 | 1 | | | | |
| **Every address in the route table** | **300** | **228** | **23** | **9** | **3** | **37** |

Of the 23 merges, 10 wait on James (two never-redirect pages, seven tool addresses with `/wisdom` among them, and `/theology/which-view`). Of the 37 retirements, 34 wait on him (the off-shelf books). The other 13 merges and 3 retirements need no decision.

---

## 8. What only James can decide

1. **Six items a door.** May the Study, Topics and About menus be cut to the lists in 5.1, with everything else one tap inside the hub? This keeps his five doors and changes what each shows.
2. **The word on the second door.** He chose "Topics" on 2026-10-26. That door now holds hard questions, skeptics, everyday life, plans, tools and help. Keep "Topics", or call it "Questions" or "Life"?
3. **Two doubles on the never-redirect list.** May `/theology/creeds` fold into `/resources/creeds`, and `/theology/search` into `/search`?
4. **Seven tool doubles.** Tool addresses are meant to stay. May these fold, each with a redirect: `/tools/glossary` into the glossary; `/tools/saved` into My Library; `/tools/life-audit` into the Whole-Life Assessment; `/tools/wisdom-finder` and `/wisdom` into "What the Bible says about"; `/tools/parenting-verses` into the verse finder; `/tools/bible-study` into the 20-book study? And `/theology/which-view` into the theology quiz?
5. **The books off the shelf.** Five sales pages still show a buy button, and 29 thank-you pages still hand out files for books no longer sold. Take all 34 down to `/books`? Does any past buyer still need a thank-you page? (The Stripe payment links work without the site and would need switching off by him.)
6. **Where discipleship lives.** Is `/start`, rebuilt as an ordered road and placed first under Study, the right home, or does he want "Discipleship" as a word on a door?
7. **The older doctrine studies.** 31 studies at `/theology/doctrine/…` sit beside 62 at `/study/bible/doctrines/…`. Keep both sets, or fold the 31 into the 62 over time?
8. **Faith and politics.** `/nation` (11 essays, two tools) is kept out of the menus by his earlier choice. May it be linked from its topic page and the faith-and-power essay section, so it is two taps from Home and not three or four?
9. **The 109 page files that are on no address.** Leave them in the repo, as the 2026-10-12 plan says, or delete them now that the map is settled? They are invisible to visitors; they do carry old claims about him.
10. **The old discipleship addresses.** `/discipleship` and `/disciple-making` land on the tools page today. Send them to the discipleship road once it exists?

---

## 9. Files read

- `/home/user/Livewell-/docs/work/elite/PROJECT-PROMPT.md`
- `/home/user/Livewell-/client/src/App.tsx` (the route table)
- `/home/user/Livewell-/client/src/lib/siteNav.ts`
- `/home/user/Livewell-/vercel.json`
- `/home/user/Livewell-/client/src/lib/site-structure.test.ts`
- `/home/user/Livewell-/scripts/generate-sitemap.mjs`
- `/home/user/Livewell-/client/src/pages/ToolsHub.tsx` (the tools registry), and the hub pages `Home`, `Study`, `Topics`, `Family`, `Resources`, `Help`, `Assessments`, `Start`, `Books`, `Connect`, `About`
- `/home/user/Livewell-/client/src/lib/shelf.json`, `/home/user/Livewell-/client/public/*/index.json`
- `/home/user/Livewell-/docs/work/audit-2026-11/AUDIT.md` (sections 1 to 5) and `hub-connect.md`

Not done: no browser was opened, no build was run, the admin pages were not reviewed, and sections 6 onward of `AUDIT.md` and the other seven lens reports were not re-read for this inventory.
