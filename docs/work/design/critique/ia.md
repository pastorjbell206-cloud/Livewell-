# Information architecture review

Lens: is it organized? The menu and its five doors, labels, wayfinding, how a first-time visitor finds the Bible, doctrine, post-Christian America, church history, family, and the tools; dead ends, duplicates, orphans, search, the footer.

Read: `CLAUDE.md`, `docs/work/design/critique/INVENTORY.md`, every `-phone-first.png` and the full-page desktop shots in `docs/work/design/shots/current/` (plus crops of `/theology/history` and `/help/anxiety`), and, to confirm causes, `client/src/lib/siteNav.ts`, `client/src/components/MinimalNav.tsx`, `client/src/lib/catalog.ts`, `client/src/lib/subjects.ts`, `client/src/pages/Search.tsx`, `client/src/App.tsx`, `vercel.json`.

Capture caveats that bear on this lens: `search.global` was stubbed to null, so database essays and admin resources are missing from `/search`; production would add them below the client-side results shown. `serve -s` does not apply `vercel.json` redirects, so I checked those in the file.

## Verdict

LiveWell holds more serious study material than almost anything in its niche: notes on 1,189 chapters, 62 doctrine studies, 22 church-history essays, 14 creeds, 41 context guides, 69 Integrated Life guides, 132 how-tos, 68 group studies, 40 care pages, 29 eight-week plans, 72 family devotions, 36 tools. The structure on top of it is the shape of James's output, not the shape of a reader's question. The five doors (Study, Essays, Books, Resources, About) sort by format and by author; of the five things James says the site is for (study the Bible, understand doctrine, understand post-Christian America, learn how to live it, use the tools), only the Bible has a door. Doctrine is a row on a hub. The post-Christian America material, which is the home page's own H1, is scattered across an essay section holding one essay, a fourteen-page `/nation` library that no menu reaches, and the last three cards on `/tools`. "How to live it" sits in a drawer called Resources, and the 69-guide Integrated Life library sits nowhere. Underneath, the same job is built two to five times: two doctrine systems, two glossaries, two creed hubs, four ways to study a passage, five ways to ask what the Bible says about something, six search boxes with six different reaches. The one site search cannot find a doctrine, a glossary term, or a chapter note when you type a word. Church history runs three periodizations on one page and ends every era essay in a dead end. The redesign does not need more pages. It needs fewer and truer doors named for the reader's question, one canonical home for each thing, one search that knows everything, and a content graph wired at the hinges (passage, doctrine, creed, council, heresy, person). The Find Help hub and the Study Bible chapter page prove the team already knows how to do this; the rest of the site should be rebuilt on their pattern.

## Findings

### Critical

#### C1. The menu, every page: the doors sort by what James made, not by what a reader came to do

**What is there.** Desktop header: Study (dropdown) · Essays · Books · Resources · About · Find Help · search icon · Subscribe. The Study dropdown holds six links: Start here: study the Bible (`/study`), The Study Bible, Church history, Creeds and confessions, The Bible in its context, Study with a group. Three of the five doors describe James's output or James himself (Essays, Books, About). Books holds three titles. Resources holds ten destinations, from PDFs to the family room.

Map the doors against James's own brief:

- *Study the Bible* has a door. Good.
- *Understand doctrine* is not in the menu at all. The 62 doctrine studies are row five of six on `/study` ("Sixty-two doctrine studies") and one of four cards on `/study/bible`: two clicks and a scroll from home, and invisible from the menu.
- *Understand post-Christian America* has no door (C2).
- *How to live it*: marriage, parenting and household are under Resources, fourth section, "For families." The Integrated Life (`/life`, 69 deep guides on marriage, work, money, the body, singleness, aging parents) appears in no header, no footer, no hub; a reader meets it only by accident in search or a related list.
- *Tools*: Resources, then a section showing 6 of 36, then "Every tool."

**Why it costs the reader.** A first-time visitor reads the menu as the site's table of contents, and this one says "a pastor's blog with a Bible attached." The skeptic, the doubter and the parent never see their question named, and they have to guess that a marriage in trouble lives under "Resources." That is recall where there should be recognition, and it is the first three seconds of every visit.

**The world-class version.** GOV.UK's founding rule: organize by what the user needs to do, not by who made the thing. BibleProject's "Explore" sorts by Book, Theme and Topic, never by format. Name the doors for James's five aims, for example **Bible · Doctrine · History · Our Moment (post-Christian America) · Living**, and make formats (essay, guide, tool, group study, plan, printable) filters inside each door instead of doors themselves. Books and About move to the right-hand cluster beside Subscribe and Find Help, which stays exactly where it is. On desktop, search becomes a visible field rather than an icon.

#### C2. Home H1 "post-Christian America": the site's defining subject has no home

**What is there.** The home page promises "Learning to follow Jesus, and live well, in post-Christian America." Here is where that subject actually lives:

- `/writing` "After Christendom": one essay (When the Church Married Empire), which is also #2 in "Start with these." "Faith and Power" holds four more.
- `/nation`, "Christ and the Nation": a hub and thirteen pages (christian-nation, christian-nationalism, empire, theocracy, which-party, state-of-the-american-church, progressive-captivity, render, nationalism-history, power-and-church, compassion-and-coercion, scorecard, policy). It is in no menu, no footer and no hub. The only live way in is the last two cards at the bottom of `/tools` (The Party Scorecard, If We Had a Biblical Government), whose breadcrumbs then reveal that the hub exists. CLAUDE.md calls it "reachable, out of the nav"; in practice it is an orphan.
- The church-history era "After Christendom (AD 2010 to present)" is card 22 of 22 on `/theology/history`.
- Which Lens Has You? and The Consistency Check are inside Tools.
- *When God Bless America Replaces Thy Kingdom Come* is under Books.
- "Politics is tearing my family apart" is under Find Help.
- `/writing/the-rise-of-the-nones`, the most obvious essay on the subject, answers "James is revising this essay."

That is seven fragments spread across five doors and one orphan, with no index joining them.

**Why it costs the reader.** The subject that defines the audience is the hardest one on the site to find. A skeptic who wants to know what "post-Christian America" means, and what it asks of him, lands on an essay section of one.

**The world-class version.** An Our World in Data–style topic page: the one place for a subject, gathering every format around it. A short framing essay, the historical arc (Christendom, disestablishment, the 1960s, the rise of the nones), the essays, the instruments (Which Lens, Consistency Check, Party Scorecard), the book, the related care page, and the matching church-history era. Give it a stable URL and a door in the menu (C1's "Our Moment"), and fold `/nation` into it.

#### C3. `/search`, the header search and five other boxes: the one index cannot find doctrine, and the boxes do not agree

**What is there.** `/search?q=grace` returns 16 cards in this order: "Grace and Works" (What the Bible Says), a context guide on patronage, "How Do You Discipline Children With Grace?", "How to Age With Grace," a Thanksgiving study, the catechism's "What is grace?", "The Love of God," "I just want to grow," "Eight Weeks Out of Hiding" (the pornography plan), "Eight Weeks Toward One Undivided Life," a covenant guide, three Integrated Life pages on blended families, aging parents and divorce, an addiction guide, and "How to Apologize to Your Kids."

Not one result comes from the Study Bible. The doctrine of salvation among the 62 studies is absent, the glossary entry for grace is absent, Ephesians 2:8–9 and Romans 3–5 are absent, and so is Augustine against Pelagius. The cause is in the index. `client/src/lib/catalog.ts` (`LIBRARY_SOURCES`) and `client/public/search-index.json` index context guides, the Integrated Life, how-tos, study guides, the history essays, creeds, care pages, plans, answers, the nation pages, devotions, the catechism, wisdom and tools. They never index `/bible/doctrines`, `/bible/guides`, the book introductions, the chapter notes, the glossary, councils, heresies, people or traditions. Those live in a second engine, `/theology/search` ("Search the theology reference"), which is linked only from one row on `/study`.

Around that, there are six search boxes, each with its own reach: the header search; `/search`; the Study Bible's "Go to"; `/writing` "Search the essays"; `/tools` "Find a tool"; `/help` "Type it in your own words"; and `/theology/search`. On `/search` the filter chips read ALL / ARTICLES / RESOURCES, which are database categories, not reader words. Results are capped, and the "See all in Church History →" link under them goes to the `/theology/history` index and drops the query.

**Why it costs the reader.** On a study site, search is the main way in for anyone who arrives holding a word: justification, Nicaea, Romans 8. A reader who types "grace" and gets a pornography-recovery plan and an article on aging before any doctrine of grace will conclude that the reference does not exist. The best material on the site is the part search cannot see.

**The world-class version.** One index and one box, with results grouped by kind and the canonical answer first: Passage (Ephesians 2:8–9, opens the chapter), Doctrine (Salvation), Glossary (grace, defined inline in one line), History (Augustine and Pelagius), then Essays, Help and Tools. Stripe Docs with Algolia DocSearch shows the pattern: Cmd-K, grouped results, full keyboard use. Logos and Blue Letter Bible put passage, lexicon and topical hits on one results page. Keep what is already right: typing "John 3:16" goes straight to the verse. The local boxes become scoped views of the one search ("in Essays," "in Tools"), and widening the scope keeps the query.

#### C4. Doctrine, glossary, creeds, passage study, topical Scripture: the same job built two to five times

**What is there** (every route below is live; none redirects):

- **Doctrine, twice.** `/study/bible/doctrines` (62 studies, `client/public/bible/doctrines`) and `/theology/doctrine/:slug` (`client/public/theology/god-and-trinity.json`, `christology.json`, and so on). `/theology/history` sends readers to the second set ("See where the creeds came from → /theology/doctrine/god-and-trinity").
- **Glossary, twice.** `/theology/glossary` (`TheologyGlossary`, linked from `/study`) and `/tools/glossary` (`ToolsGlossary`, a card on `/tools`).
- **Creed hubs, twice.** `/resources/creeds` (`CreedsLibrary`, in the menu) and `/theology/creeds` ("The confessions surveyed," linked from the foot of every creed page, including the Nicene Creed).
- **Studying a passage, four ways.** The Study Bible chapter (66 books, Hebrew and Greek); `/theology/passage` (Passage Context Tool); `/tools/deep-bible` (labelled "Flagship tool," 20 books, and it ends by telling you to "go further in the Study Bible"); `/tools/bible-study` (Bible Study Guide, 12 books).
- **What the Bible says about something, five ways, with colliding names.** `/wisdom` ("Wisdom for All of Life," labelled "What the Bible Says" in search); `/tools/bible-on` ("What the Bible Says About"); `/tools/bible-says` ("Misused Verses — What the Bible Actually Says"); `/tools/verse-finder`; `/tools/wisdom-finder`. Three labels that differ by a single word point to three different things.
- **Saved things, twice.** My Library (`/my-library`) and "Saved verses and prayers" (`/tools/saved`).

**Why it costs the reader.** The reader cannot tell which version is the real one. A reader who finds the thin version first (Deep Bible's 20 books) takes it for the site's full depth. Duplicates also split authority, search rank and upkeep, and they break the repo's own rule of one source of truth per fact.

**The world-class version.** The Stanford Encyclopedia of Philosophy keeps one canonical entry per idea, with Related Entries. LiveWell needs the same: one doctrine page per doctrine (merge the two sets), one glossary, one creeds library, and one passage page, the Study Bible chapter, with Deep Bible's six layers and Passage Context folded in as layers. Topical Scripture becomes one index searchable by need. Redirect the rest one hop, as the site already does well for folded hubs.

#### C5. `/theology/history` and every era essay: three timelines, two series, and dead ends

**What is there.** "The era essays: 22 essays, from Pentecost to the present" interleaves two series that cover the same ground. Fourteen run from The Apostolic and Sub-Apostolic Age to The Modern Church and the Global Shift; eight run from The Apostolic and Persecuted Church to After Christendom. Both start at Pentecost, so "The Reformation" and "The Reformation and Its Wars" sit side by side. The kicker labels use two periodizations: series one has the Apostolic Age at c. 30–150, the High Medieval at 1054–1517 and the Reformation at 1517–1648, while series two has Ancient at 30–313, Medieval at 590–1517 and Modern at 1648–1800, 1800–1950 and so on. The timeline tab below adds a third: seven eras of 30–100, 100–313, 313–590, 590–1054, 1054–1500, 1500–1650 and 1650 to today.

The era essay `/theology/history/the-apostolic-age` runs 13 phone screens and ends with exactly three links, all back to `/theology/history` ("← All of Church History," then "Church History" again). There is no "Next: The Age of the Martyrs." Its Key Figures (Clement, Ignatius, Polycarp, Paul) are plain text, though the hub holds 36 people. Nothing links to Acts in the Study Bible, or to the creed and council the era produced.

Below the timeline, "Everything on this: Church history, 42 pieces in all" opens with "How Should Christians Think About Sickness and Health?", "How Do You Date Wisely and Choose a Spouse?" and "How Do You Discipline Children With Grace?" The cause: `client/src/lib/subjects.ts` matches a regex (`/church history|reformation|…/`) against titles and blurbs, and every Integrated Life blurb contains the boilerplate "What Scripture, church history, and honest research say about…".

**Why it costs the reader.** History is a sequence. A reader who finishes era one has nowhere to go but back up. Two overlapping series and three sets of dates tell the reader that the site does not know its own story, on the very page that exists to tell it. Dating advice filed under "Church history" undercuts trust in everything else on that page.

**The world-class version.** The Met's Heilbrunn Timeline of Art History uses one periodization, and each period page gathers its essays, works, people and map. Wikipedia's "Part of a series on" navbox and GOV.UK's step-by-step sidebar show how to hold a reader inside a sequence. LiveWell should pick one spine of eras (the timeline's seven is the cleanest) and file one essay per era, keeping the shorter series as "the short version" of each era rather than as a rival set. Every era essay gets a series rail (← previous era · era 2 of 7 · next era →), Key Figures and councils link to their entries, and regex subject shelves give way to hand-filed relations.

### Major

#### M1. Site-wide (seen on `/resources/creeds/nicene-creed`, `/resources/context/honor-shame-vs-guilt`, `/study`, `/tools`): the "you are here" signal is wrong, and URLs contradict the doors

On the Nicene Creed and on the honor-and-shame guide, the header lights **Resources** in mustard, but the menu files both under Study. On `/study`, `/study/bible` and `/theology/history`, the Study door never lights, because `isActive` in `MinimalNav.tsx` is applied only to single-link groups. On `/tools`, `/family`, `/help/*` and `/plans`, all filed under Resources, nothing lights. The paths draw a second map that disagrees with the first: Study's children live at `/study`, `/theology/history`, `/resources/creeds`, `/resources/context` and `/studyguides`, while Resources' children live at `/tools`, `/family`, `/plans`, `/help`, `/downloads`, `/assessments` and `/how-tos`. Tool pages carry no breadcrumb; their kickers are plain text ("A DIAGNOSTIC," "TEST THE CASE," "FLAGSHIP TOOL"). The phone menu offers My Library, and the desktop header does not.

*Cost:* a reader who arrives on a creed page from search is told by the site that they are in Resources. Open Resources and there is no creed. Orientation fails exactly where most people arrive, on deep pages.

*World-class:* Apple Developer Documentation and MDN, where the breadcrumb matches the URL and the URL matches the menu. Light the door for every descendant of it, give every page a breadcrumb (Study / Creeds / The Nicene Creed), and over time move paths under their doors (`/study/creeds/…`, `/study/history/…`) with one-hop redirects.

#### M2. `/resources`: a drawer labelled "Resources"

The page has four sections: Downloads and PDFs, Tools, Help in a hard season, For families. "Resources" names nothing a reader came for. The page opens with "The Hard Issues booklets," whose own description is "on eldership and on governing a local church": a pastors-only product, under a label that suggests ethics. Families, the seeker's front door, comes fourth. The 72 family devotions are three moves from home (menu, Resources, scroll). "Find help" appears on this page, in the header, and twice in the footer. The footer's Resources column holds ten links that mix a hub (Resources), sibling hubs (All tools, Self-checks, How-to guides, Eight-week plans), a utility (My Library) and a door that is already in the header (Find help).

*World-class:* dissolve the drawer. Formats become filters inside the subject doors (C1). "Print this" becomes a facet on each item, with one `/downloads` shelf in the footer. Family moves into Living, or gets its own door if James wants the household as a front-line audience; the `/family/tonight` experience has earned that.

#### M3. `/tools`: 36 "tools," many of them libraries, and no way back

The H1 is "Tools for the Life You Are Actually Living"; the page title is "Free Christian Tools for Families," which describes a different page. Several entries are not tools at all: Quote Library, Wisdom for All of Life (`/wisdom`), Reading Scripture in Context (`/resources/context`, a Study child), Theology Glossary. The overlaps are those listed in C4. Self-checks are split three ways: five under "Start with an honest reading," Marriage Health and Financial Health under the family group, and a separate `/assessments` hub in the footer. None of the three tool pages photographed links back to `/tools`. Deep Bible lists its books out of canonical order (Genesis, Psalms, Exodus, Proverbs, Isaiah…).

*Cost:* "tools" stops meaning anything, and the instruments that are genuinely good (Test the Case, Which Lens, the Worry Journal) are lost among references.

*World-class:* separate instruments (things you do: self-checks, planners, Test the Case, Which Lens) from references (things you read). Put each instrument beside the content it serves; `/help/anxiety` already offers the Worry Journal, and that is right. Keep `/tools` as an index of instruments only, about 15, grouped by the reader's job, each with a breadcrumb home. This is GOV.UK's "one thing, one place."

#### M4. `/study`: the hub repeats itself and buries doctrine

In the first section, "Open the Study Bible," "An introduction to every book" and "Notes on all 1,189 chapters" all go to `/study/bible`: three links, one place. "Twenty-four guides to reading the Bible" and, two sections later, "The Study Bible's reading guides" both go to `/study/bible/guides`. Doctrine, the reader's second aim, is row five of six. The Church history section mixes `/theology`, `/resources`, `/justice` and `/disruption` paths, and three different sets of "witnesses" (The witnesses; The witnesses who would not be captured; and the 36 people inside `/theology/history`). The page ends "Looking for the study tools… They are all in the tools," which sends a studying reader out of Study and into Resources. The menu labels this hub "Start here: study the Bible," though it also covers history, creeds, context and group study.

*World-class:* a hub's job is one screen of distinct choices, one link per destination, as on BibleProject's Explore or a Khan Academy subject page. Doctrine gets its own section, or its own door (C1), and the study instruments appear on the hub where the studying happens.

#### M5. `/study/bible`: 66 paragraphs to find a book, and no chapter picker

The index runs 15.4 phone screens. Each of the 66 books is a card with a 30-word description, so reaching Revelation on a phone takes about 12,000px of scrolling. The chapter page (`/study/bible/john/1`) has previous and next arrows and the "Go to" field, but no book-and-chapter grid; moving from John 1 to John 15 means typing or fourteen taps. The "Go to" field is excellent for a reader who already knows a reference.

*World-class:* ESV.org and YouVersion open on a two-tap book → chapter grid (Old and New Testament, abbreviations) as the first screen, with the descriptions one tap deeper on the book page; BibleProject's book pages show how to carry the introductions there.

#### M6. `/resources/creeds/nicene-creed`, era essays, the essay page: the content graph is thin at the hinges

The Nicene Creed is where Bible, doctrine and history meet, and its page links to "← All documents," "The confessions surveyed" (the duplicate hub), "Creeds & Confessions" again, and 1 Corinthians 15:3–4. Nothing more. It does not link to The Great Councils era essay, to Arius among "The heresies," to Athanasius among "The people," to the Trinity or Christology doctrine study, or to John 1, the prologue behind the creed's "God of God, Light of Light." The essay `/writing/strongman-theology` builds on 1 Samuel 8, but its 26 links include none into the Study Bible. Compare the pages that do this well: John 1's "Go deeper on LiveWell" (study guides, a doctrine, Eutychianism) and the honor-and-shame guide's "Keep reading" with linked key texts. The pattern exists; it is applied unevenly. Separately, deep pages end with two back links to the same hub: "← All documents" plus "← Creeds & Confessions," "← All of Church History" plus "← Church History," "← All context guides" plus "← Reading Scripture in Context."

*World-class:* SEP's Related Entries and Wikipedia's two-way links, built on a typed relation model (passage ↔ doctrine ↔ creed ↔ council ↔ heresy ↔ person ↔ era ↔ essay) that renders the same "Connected" block on every kind of page. One back link per page, inside the breadcrumb.

#### M7. `/writing`: sections that are not sections, near-twin titles, and history on another shelf

The shelf holds 15 essays in five sections. "After Christendom" and "The Ancient Church" hold one essay each, and "Start with these" repeats three essays that appear again below, so there are 18 rows for 15 essays. "When Fear Becomes Theology" (The Mirror) and "When Fear Rewrites Theology" (Faith and Power) are titles one word apart. "The Bible Assumes You Will Be Wrong" has no blurb. Meanwhile the 22 era essays, which are long-form prose of exactly the same kind, sit at `/theology/history` and never appear on the Essays shelf, so "The Ancient Church" shows one essay while several on the ancient church sit one door over.

*World-class:* treat Essays as a format filter across the subject doors, as The Atlantic and Aeon do with their series pages. A section needs at least three pieces or it folds into its neighbor, and near-twin titles get renamed.

#### M8. Home and the menu: no route for the reader by who they are, and the skeptic, ranked first, has no door

`/subscribe` asks "I'm a skeptic / I'm a Christian / I'm a pastor / I'm just exploring," and it is the only page that asks. A live "Find Your Path" router exists at `/start` (`StartHereQuiz`), but only deep pages (Assessments, an essay's next steps) link to it; the menu's "Start here" goes to `/study`. Skeptic material is spread across five doors: Test the Case (Resources, then Tools), *Believe* (Books), "Honest answers to hard questions" (`/answers`, in the footer only, filed under Essays), "I'm not sure I believe anymore" and "I'm deconstructing my faith" (Find Help), and "The curious skeptic" plan (Resources, then Help). Pastors, the distribution channel, get "The Hard Issues booklets" and one care page.

*World-class:* a "Start here" that asks one question and lands each audience on a curated path, as Duolingo's and Headspace's placement questions do and as GOV.UK start pages do. Add a standing path "For the honest skeptic" (Test the Case, the opening of *Believe*, the strongest three essays, `/answers`) and one "For pastors," both reachable from home.

#### M9. `/family` and site-wide subject shelves: keyword matching files things wrongly

`/family` "Home and family life, Read 42" opens with "Is 2 Chronicles 7:14 a Promise to America?"; its blurb mentions "a people home from exile," and the subject regex matched "home." It is the same mechanism as C5's dating advice under Church history (`client/src/lib/subjects.ts`, `matchesSubject`). CLAUDE.md says the taxonomy no longer drives the menu, but these regex shelves still drive the related lists on hubs.

*World-class:* hand-filed relations (one line per item, the way `pillar-assignments.ts` already files essays), with a validator that fails a shelf when a piece's own filing disagrees with where it is shown.

#### M10. `/theology/history`, `/study/bible`, `/help`, `/family`, `/tools`: hubs that have become dumps

On a phone, `/theology/history` runs 18.4 screens, `/study/bible` 15.4, `/help` 14.4, `/family` 14.0, `/tools` 12.5 and `/family/devotions` 12.5. A hub longer than about three screens stops working as a map. `/family` lists the Family Devotion Builder twice, and its "Tools" section repeats five entries from `/tools`.

*World-class:* a hub is one first screen of choices, then "see all" list pages per kind, the way NYT Cooking's collections work.

### Minor

- **Phone menu (`header-menu-open-phone-first.png`).** The bar shows "Find Help," and the first row of the open menu is "Find Help for What You Are Facing": two of the first three targets go to the same place. Put a search field in that top slot instead; the crisis door is already in the bar.
- **Label drift.** "Creeds and confessions" (menu), "Creeds, Confessions, and Classics" (page kicker), "Creeds & Confessions" (back link and search label). "The Bible in its context" (menu), "Reading Scripture in context" (`/study`, `/tools`), "Reading the Bible in its context" (`/study` H2), "Reading the Bible in Its World" (an essay section). "Self-checks," "an honest reading," "assessment," "diagnostic." "Find Help," "Find help for what you are facing," "Find help in a hard season," "Help in a hard season." Write one controlled vocabulary and hold every surface to it.
- **Footer, every page.** It copies the menu's groups; it is not an index. Its 35 links omit the Integrated Life, Wisdom, Christ and the Nation, the doctrines, The Story of the Bible, the catechism and the devotions, and it files "Honest answers to hard questions" under Essays. It carries two newsletter destinations ("Substack →" off-site, "Newsletter" to `/subscribe`) as well as a form. GOV.UK and the New York Times use the footer as the real site index; do that, or add an A–Z page.
- **Legacy redirects.** `/map`, `/explore` and `/library` 301 to `/writing`, a 15-essay shelf. A reader who types "map" or "library" expects an index; point `/map` at a real human sitemap.
- **`/writing/strongman-theology`.** "All essays" at the top is a `<button>` calling `navigate("/writing")`, not a link, so it cannot be opened in a new tab and shows no URL on hover.
- **`/search`.** The filter chips ALL / ARTICLES / RESOURCES and the "BACK" button are system words. Use reader words (Bible, Doctrine, History, Essays, Help, Tools), and remove "Back," which the browser already provides.
- **Subscribe surfaces.** The home page shows three: the header button, the in-page box and the footer form. One persistent entry plus one contextual box is enough.

## What to keep

- **Find Help as a permanent door.** It sits in mustard in every header, with crisis lines first. The `/help` index, "What are you facing?", is the best-organized page on the site: symptom-first, in the reader's own words ("I can't stop worrying"), with intent tabs ("I'm carrying something / I want to grow / I'm helping someone / I'm leading a group") and a free-text box. It is NHS-quality symptom indexing. Build the other doors on this pattern.
- **The care-page skeleton** (`/help/anxiety`): jump chips (What to do this week, When to get more help, If you're helping someone, Go deeper, Print it), and a typed "Go deeper" list that places the right plan, tool and study beside the need.
- **The Study Bible chapter page** (`/study/bible/john/1`): the "Act Nine of the story · Christ, the Center" kicker that places the chapter in the whole story, "This chapter at a glance," notes in accordions, "Go deeper on LiveWell," "Mark John 1 as read," and "Before this in the story / Next in the story." This is the model node for the content graph.
- **Reference-first search and "Go to."** Typing "John 3:16" anywhere goes straight to the verse. Keep this at the center of the one search.
- **`/family/tonight` and the devotion pages.** "Tonight at the table" resolved by date, with Start and Read it first, and devotion pages that end "Before this / Next / All family devotions." They are the only linear series on the site with proper previous and next links.
- **The retired-essay notice** (`/writing/the-rise-of-the-nones`): "Read instead," plus four onward doors. No dead 404s.
- **The governance underneath.** One committed menu map (`siteNav.ts`), one-hop redirects for folded hubs, `site-structure.test.ts` holding the shape, and `validate-links.mjs` refusing links to retired essays. Keep this discipline and point it at the new doors.
- **Curation instincts.** `/writing`'s numbered "Start with these," the short shelf, and the honest "Looking for a book that used to be here?" on `/books`.
- **The honor-and-shame guide's "Keep reading."** Four related guides, with key texts linked into the Study Bible.
- **`/subscribe`'s four audience cards.** It is the right question asked in the wrong place; move it to the front door.
- **The framing line on `/study`**, "Learn the whole Bible, and the church that carried it." It is the right top-level idea; let the structure keep its promise.
