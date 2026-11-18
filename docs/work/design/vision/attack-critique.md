# Attack: does VISION.md fix what CRITIQUE.md found?

Hostile review of `docs/work/design/VISION.md` (step 3 of the design program, 2026-10-27) against the ten problems in `docs/work/design/CRITIQUE.md` and every finding marked critical in the seven reports in `docs/work/design/critique/`. Written 2026-10-28.

**Read for it.** `CLAUDE.md` in full; `CRITIQUE.md`; all seven critic reports (`editorial`, `product`, `ia`, `mobile`, `brand`, `learning`, `visitor`); `research/A-SYNTHESIS.md` (patterns 19 to 21 in detail, the rest by heading); `docs/work/plan/MASTER-PLAN.md` sections 0 to 3, 7.2 and the 10.6 unit cards; `docs/work/NOTES.md`; VISION in full; the current first screens for Home (phone and desktop), John 1 and Find Help.

**Checked in the tree, not taken from a summary.** `client/src/lib/siteNav.ts` (the menu rows that exist today); `vite.config.ts` (the service worker); `api/index.ts` lines 1478 to 1480 (the theology quiz); `client/src/pages/study-bible/ChapterNotes.tsx` (Mark as read, the external translation links); `client/src/lib/myProgress.ts` (what the device remembers); `client/public/history/essays/*.json` (the 22 era essays and their ranges); `client/public/needs/*.json` (sensitivity); `scripts/build-bible.mjs` (the BSB source); and every quotation VISION prints from a stored text or the BSB (results under "What VISION does fix").

---

## The verdict

VISION is a strong design and a conditional fix. Its surfaces answer most of the critique on paper: the desk with notes beside the verse, a real verse sheet, one search that answers by kind, one long-read template for essays, the skeptic's door, the Line. But it does not fix every problem, and on several it makes things worse.

Three things decide that. First, almost every critical fix is routed through a gate for James (P1 to P11, D1 to D15) in the busiest weeks of his year, and where VISION states a default it is today's site: problems 2 and 5 stand under the defaults, and five gates (D6, D7, D8, D11, D14) have no default at all, so the course, the moved curricula, the essay ending, the history spine and offline reading have no path to shipping without him. Second, where it builds, it adds: doctrine gains a third and fourth home, history gains a third narrative per Part and a periodization that cannot be drawn, and the "fewer, truer things" the critique asked for becomes more things. Third, several critical findings are scheduled into Phase 4 (March 29 to autumn 2027) or given no unit at all: the reader's marks and recall, translation comparison and copy, and the 22 era essays that every critic said dead-end.

One break is fatal, fourteen serious, eleven minor.

---

## Scorecard: the ten problems

"As designed" assumes James says yes to everything. "Under its defaults" is what VISION itself says ships if he does not answer.

| # | Problem (CRITIQUE severity) | As designed | Under its defaults | Left standing or made worse |
|---|---|---|---|---|
| 1 | Study Bible chapter keeps notes from verses; Scripture not set as Scripture (critical) | Mostly fixed (U76 to U78) | Same (no gate) | No paragraphs, prologue not in sense-lines (break 5); Read default and the loss of Mark as read (6); no compare, copy or marks before Phase 4 (7); the desk lands after January 1 or during the Advent the plan protects (14) |
| 2 | Same job built two to five times (critical) | Partly, Phase 4 (U66) | **Standing** (D3: nothing moves) | **Worse for doctrine** (2); Deep Bible stays "Flagship," the quiz keeps a forbidden word (1) |
| 3 | The site cannot find its own material (critical) | Fixed in design (U85, February 12) | Same | Era essays keep dead references (8); new privacy hazard in "Recently visited" (12) |
| 4 | Doors named for what James made (critical) | Partly (his doors kept by his decision) | Partly | Menu rows the vision specifies can never ship (11); breadcrumb and URL disagree, no vocabulary (17); the Integrated Life library still has no row (18) |
| 5 | Subject and first reader lack a front door (critical) | Partly | **Standing** (D2, D5, D9 defaults) | Headline and caption still speak to believers first (9); no descriptor on a phone (10); skeptic's door skips the hurt-by-church pages (20); Home's title (21) |
| 6 | A library with no teacher (critical) | Partly; the course goes live only when James picks the turns | **Standing** (D6, D7 have no default) | Recall and marks in Phase 4, recall never where adults read (7); Mark as read removed (6) |
| 7 | The reading surface is not yet a book (critical) | Fixed for essays (U70 italic, U23, U24) | Ending gated on D8, no default (1) | Era essays get no unit (8); mustard versal (22); the "nothing interactive" rule contradicts the template (23) |
| 8 | Two thousand years have no shape (critical) | Partly | Partly (D6 no default) | A fourth, overlapping, partly undated periodization (3); *The short version* mislabels the only modern essays, three narratives per Part (4); era essays no unit (8); maps promised and excluded (16) |
| 9 | On a phone, and at night, the site works against the reader (critical) | Partly | Night needs P6; offline has no default and no unit | Known AA failures grandfathered (13); Night in March, offline incoherent (15); Find below the real first screen (19); `/help` black and long (24) |
| 10 | No identity; the seams show (major) | Partly | Partly | Maps and figures have no plate (16); stale pilot facts in the prototype brief (26); fact sheet waits to February 26 (U92) |

## Scorecard: critical findings in the seven critic reports

| Critic | Critical finding | Status in VISION |
|---|---|---|
| editorial | Long-form text in the UI face; fake italics | Fixed: U70 self-hosts Inter's true italic whatever P1 says; the serif on P1 |
| editorial | The ending is drowned | Fixed in design (5.24), gated on D8 with no default (break 1) |
| editorial | John 1 not typeset as Scripture; notes hidden | Partly: headings in the text and the margin, but no paragraphs or sense-lines (5) |
| product | Notes severed from verses | Fixed (U76, U77) |
| product | The reader cannot leave a mark | **Standing** until Phase 4; compare and copy absent (7) |
| product | Parallel tools with different data | **Standing** by default; doctrine made worse (1, 2) |
| product | Search cannot see the study content | Fixed in design (U85) |
| ia | C1 doors sort by what James made | Partly; his five doors kept by his decision; rows blocked (11, 17, 18) |
| ia | C2 post-Christian America has no home | Partly; by default `/post-christian` and `/exile` still land on the shelf section (1) |
| ia | C3 the index cannot find doctrine | Fixed in design |
| ia | C4 the same job two to five times | **Standing**, doctrine worse (1, 2) |
| ia | C5 three timelines, two series, dead ends | Partly; a fourth periodization, a third narrative, era essays unassigned (3, 4, 8) |
| mobile | No night reading | **Standing** to March 12, and only with P6 (15) |
| mobile | The Bible laid out as a document | Fixed (U76: verse 1 on the first screen, bottom bar, *John 2* at the last verse) |
| mobile | Mustard text fails AA; nothing in CI catches it | Gate added; existing failures grandfathered (13) |
| brand | No signature visual language | Fixed in design (the plates, U95); maps excluded (16) |
| brand | Home's first screen is a letter, not a door | Fixed only if James says yes to D9 (1, 9) |
| brand | `/study/bible` is a directory listing | Fixed (U79, Plate II) |
| learning | C1 a catalogue where a course should be | Gated on D6 and D7, neither with a default (1) |
| learning | C2 the best curricula filed as crisis care | Gated on D7 with no default, though 3.5 and 5.2 assume a yes (1) |
| learning | C3 the thesis has no course | Partly: the topic page links the existing `/studyguides/after-christendom`; nothing on Home or `/study` sequences it |
| learning | C4 nothing asks the reader to remember | **Standing** for chapters and essays until Phase 4 (7) |
| visitor | The site never answers the question that brought him | Partly: the topic page leads with a definition (U25, U48, February 19); Home's definition and the 301s gated on D2 (1, 9) |
| visitor | The front door speaks to the insider; the skeptic's door is missing | **Standing** by default (D9); with a yes, the headline still speaks to believers first (1, 9) |
| visitor | The numbers about James disagree | Fixed by D10's default (no page prints a count), but not until U92, February 26 |

---

## The breaks

### 1. The fixes are gated, and the gates default to the site the critique condemned (fatal)

**Claim.** 6.11: "Each ships a default if he does not answer." 1.4 rows 26, 28 and 30; 2.7's "James?" column; D2, D3, D5, D9.

**Problem.** The stated defaults are today's site on the critical problems. D2's default keeps `/post-christian` and `/exile` pointing at the one-section shelf the visitor critic found (problem 5). D3's default is "nothing on the never-redirected list moves," which keeps every duplicate in problem 2, including Deep Bible labelled "Flagship" and the theology quiz, whose options still read "Finding authentic Christian community," "Freedom to live authentically" and "Community and authentic relationships" (`api/index.ts` lines 1478 to 1480: a word on the Forbidden Language list, three times, live) and score into the retired three-pillar taxonomy. D5's default is "Home keeps its current hero"; D9's is "the hero keeps #533 as it is." Under those, problem 5 stands whole: no skeptic's door, the atheist sentence at the foot of the first screen, every line addressed to a believer. Five gates have no default at all, contradicting 6.11's own sentence: D6 (the history spine, problem 8), D7 (moving the skeptic and new-believer eight weeks out of "Help in a hard season," learning C2), D8 (the essay ending, problem 7), D11 (offline, problem 9) and D14 (the graded care cards). Sections 3.5 and 5.2 are written as if D7 were already yes.

Several of the bundled fixes do not change the contract at all and need no gate: the skeptic's row is new copy beside James's, not a change to it; dropping "Flagship" and ordering Deep Bible canonically is the critique's own "until then" fix (8, the `/tools/deep-bible` row, filed under U66 in Phase 4); taking the forbidden word out of the quiz is a contract repair; re-pointing an existing 301 keeps the 2026-10-12 fold intact and changes only its target. VISION's own risk 1 (10.7) says James's time in Advent and Lent is the scarcest thing in the plan. A vision whose default is the status quo, landing on a man with no time, does not fix the problems it lists.

**Fix.** Split every gate into its contract-neutral part, which ships by default, and the part that truly changes his words, his doors or the Decision Log. Ship by default: the skeptic's row and the Tonight row under the existing hero (as U18 added Find); Deep Bible without "Flagship," in canonical order, full passages; the quiz with the forbidden word and the pillar scoring removed (or hidden from `/tools` without a redirect); the 301 targets re-pointed to `/topics/living-after-christendom`. Give D6, D7, D8, D11 and D14 forward defaults in writing: D8 defaults to depth over reach, which `CLAUDE.md` already decides ("When a choice trades depth for reach, depth wins"); D7 defaults to listing both eight-week plans on the Study router while leaving them where they are under help; D6 defaults to the registry's seven eras (break 3); D11 and D14 default to "not built" and say so in 8. Then 6.11's sentence is true.

### 2. Doctrine is made more duplicated, not less (serious)

**Claim.** 2.2 (`/study/doctrine`, `/study/doctrine/q/:n`, "New"; the 62 studies and 31 debate pages "Kept"); 5.6 to 5.8 ("One home for a doctrine is James's call"); U90.

**Problem.** Problem 2 and ia C4 named two doctrine systems; learning M4 named five places a reader meets the Trinity. VISION keeps both systems (`/study/bible/doctrines/:id`, `/theology/doctrine/:slug`), adds a doctrine room, and adds 76 question pages that repeat `/family/catechism`'s 76 questions with the same adult and child answers. Doctrine now lives in at least seven places: the studies, the debate pages, the room, the question pages, the family catechism, the creed notes and the glossary. The master plan's "one in, one out" rule (section 2: "A unit that adds a reader-facing surface names ... the surface it retires") is not applied to U90 or to any of U69 to U101. The critique's verdict was "fewer, truer things wired together."

**Fix.** Make the question page the catechism's one page (one route, adult register first, the child's answer as a tab, `/family/catechism` linking into it) rather than a second copy. Do not build U90's 76 pages until James has chosen one home between the studies and the debate pages; until then the room is a view over what exists. Write the one-in, one-out line into every new unit card.

### 3. The course's Parts cannot be the one periodization the Line draws (serious)

**Claim.** 1.4 row 27: "The course's Parts (0 to VIII) everywhere: the Line, era kickers, search ... one periodization replaces three." 3.4 and 4.1: "the Parts as alternating bands," to scale.

**Problem.** The Parts in MASTER-PLAN 7.2 are not a periodization. Part V runs 1650 to 1900; Part VI, "The American Experiment," runs from Roger Williams through the Civil War and overlaps V; Part VII, "The Twentieth Century," overlaps VI's tail. Parts VI to VIII carry no years in 7.2, and VISION's own prototype brief admits it ("Parts VI to VIII with years to set," screen 4). Overlapping spans cannot be alternating bands on one to-scale axis, and the Line already gives America its own row below, so Part VI is drawn twice. Meanwhile the registry holds seven eras, the 22 essays keep their own ranges in their kickers, and the timeline keeps its seven. The critique counted three periodizations on one page; VISION adds a fourth and calls it one. Critique #8's "shape before detail" fails at the drawing meant to carry the shape.

**Fix.** Draw the bands from the registry's seven eras (the critique's choice, already in the data), with Part VI as the "In America" row the Line already has and the Parts as the course's table of contents, not the axis. Or make the Parts contiguous and dated, with every year entered in the ledger before U75 starts. Either way, re-kick the 22 essays and the timeline from that one source in U31.

### 4. *The short version* lands on the only essays that cover 1800 to now, and each Part gets three narratives (serious)

**Claim.** 1.4 row 27, 2.7, 5.10: "the 22 era essays filed under them, the eight broad ones marked *The short version*."

**Problem.** Checked in `client/public/history/essays/`: the fourteen-essay series ends with *The Missionary Century* (1792 to 1910) and *The Modern Church and the Global Shift* (1900 to today). The eight-essay series holds *The American Experiment* (1800 to 1950), *The Attractional Era* (1950 to 2010) and *After Christendom* (2010 to present), and no essay in the fourteen covers any of them. Marking all eight *The short version* tells the reader a longer version exists when it does not, on the three essays the thesis rests on: the moment band links them (3.5 item 4), and *After Christendom* is the one pinned as *Start where you are standing* (5.10). A skeptic who looks for the long version finds nothing, which is the seam the visitor critic said he hunts for. And each Part page then lists sessions, era essays and short versions: three accounts of the same ground, where the critique's complaint was two (problem 8: "two series and three sets of dates on the page meant to get the story right").

**Fix.** Label by pairing, not by series: an essay is *the short version* only where a longer essay covers the same span; the three modern essays are simply the readings. State the hierarchy once on every Part page: the session is the course, the era essay is the reading, and a short version is one quiet link under it.

### 5. Paragraphs and the prologue as a hymn are deferred on a licensing premise that does not hold (serious)

**Claim.** 4.4: "paragraph and poetry lines only once a formatted BSB source has been licensed and read by `build-bible.mjs` (nothing promises poetry lines before then)."

**Problem.** Critique #1 (critical) and the editorial critic's critical finding ask for the text "paragraphed ... the prologue in sense-lines." VISION gives headings in the text and nothing else, indefinitely: no unit acquires a formatted source and no date is set. The premise is wrong on its face: `scripts/build-bible.mjs` itself calls the Berean Standard Bible "public domain" and reads a verse-only file (scrollmapper `BSB.json`). The missing thing is a formatted public-domain source, not a licence. Until then John 1 stays fifty-one verses in eight blocks, and the prologue, the passage VISION chose for its own showcase (Trace the argument, the verse panel, screen 2), is not set as the hymn it is.

**Fix.** A Platform unit (S to M) before U76: import a formatted public-domain BSB (paragraph and poetry markers) into the text shards with a drift check. Until it lands, break paragraphs at the outline's section boundaries and hand-set sense-lines for John 1:1-18 and the passages Trace the argument names, ledgered as typesetting, not text. Mark the source's reachability through the proxy as unverified.

### 6. The flagship's fix is off by default for its largest audience, and "Mark as read" disappears (serious)

**Claim.** 4.4 Defaults: "Read when the reader comes from Tonight, a devotion, a care page or the 2027 plan." 2.7: "'Mark as read' alone → 'I've answered these.'" 4.5.

**Problem.** VISION says the 2027 plan makes the chapter page the most visited page on the site from January 1 (10.3). Those readers land in Read: no verse numbers, no dots, no verse panel, the notes behind a tap on "Study this passage." The critique's core finding (notes kept from verses) is fixed only for readers who arrive from search. Then "Mark as read" retires. Today it is the button in `ChapterNotes.tsx` that feeds `myProgress.ts`'s "chapters marked read," "Continue the story" and VISION's own canon fill (5.3: "chapters read on this device filled in `--ink`"). Its replacement asserts that the reader answered questions, which a plan reader may not have done and which Read depth does not even show. CRITIQUE section 4 lists both "Mark as read" and "Continue the story" under what to keep. Separately, 4.4 says the depth is "remembered on the device" and also defaults by route, and never says which wins.

**Fix.** Keep a plain "Mark as read" at the last verse in every depth, beside the *John 2* button, separate from "I've answered these." Give Read quiet verse numbers or a toggle in Aa. State the precedence: a choice the reader made on this device beats a route default.

### 7. The reader still cannot compare, copy or keep anything, and recall stays off the pages adults read, until Phase 4 (serious)

**Claim.** 4.3 (the panel's eight rows); 10.5 (U96, "March 29 to autumn 2027"); 10.6 ("Retired, not built: ... `/study/compare` ... comparison lives on the creed page"); 4.5 ("Never on Home").

**Problem.** The product critic's critical finding and critique #6 name five things: "highlight, note, bookmark, copy a verse with its reference, or compare translations in place." VISION's panel has no *Copy* row and no *Compare* row, though A-SYNTHESIS pattern 19 specified a Compare row against public-domain texts (KJV, ASV, WEB) under the one-translation rule. The five external translation links in `ChapterNotes.tsx` stay. Highlights, bookmarks, My Library by book and export arrive with U96 in Phase 4. Learning C4 (critical) asked for a "Before you read" recall question at the top of the next chapter and prompts at the foot of each era essay; VISION returns the carried question only on the `noindex` week page and in My Library, needs U96's `lib/review.ts` to schedule it, and forbids it on Home. Through the first quarter of the 2027 plan, the year's busiest reading, an adult reads a chapter a day and is asked to remember nothing on the page he reads.

**Fix.** Add *Copy* (verse, reference and "BSB") and *Compare* (the BSB beside one public-domain text, differences marked) to U77. Move the minimal mark store (bookmark, note) and its export into U77 and U78 before January 1, since 5.28 itself says export must exist "from the first note." Put one quiet "Last time" question above the text of the next chapter in the plan, answered privately, in U78.

### 8. The 22 era essays get no unit (serious)

**Claim.** 5.24: "The same template serves the era essay ..." The section 8 row for `/theology/history/the-apostolic-age` assigns "U31, U32, U51 on."

**Problem.** None of those units touches the era-essay page. U31 is the history front door, U32 the session template, U51 Part I's sessions (March 12). `HistoryEssay.tsx` appears nowhere in the build plan. So the findings every critic made about these 22 pages stand: no *Next* in a 22-part series (critique #8, and the editorial, product, ia, mobile, learning and visitor reports), left-hugging text with the right 40 percent empty, bands that change color section by section, sources in a black slab, no byline or date, figures and Acts unlinked (critique #7, #8, #3). These are the history pages readers have now; the sessions that might replace them arrive Part by Part through autumn 2027.

**Fix.** A History-lane unit in Phase 2 (S to M): `HistoryEssay.tsx` onto the one long-read template; a series rail with *Next* in the one order; byline and date; live references through `VerseRef`; key figures linked to their sheets; sources in the margin. The *Can you say it back?* prompts and *In their own words* follow under James's review.

### 9. Home still speaks to believers first, and its caption asserts the rhyme the vision says must be broken (serious)

**Claim.** 3.1 item 2: the skeptic's door "before anything addresses believers." 3.7: "It addresses the skeptic before it speaks to believers." 3.2 caption: "*The early church knew. So did believers in every age who lived without power.*" 4.1: "Wherever the two ends of the Line are set side by side, one sentence says where the likeness breaks."

**Problem.** The first words on the screen are still "Learning to follow Jesus, and live well, in post-Christian America," the line the visitor critic read as telling him in the first three seconds that the site is for people who follow Jesus. The caption under the Line is two sentences cut from #533's first paragraph, where "knew" answered "What does it look like to follow Jesus when the culture around you no longer shares your assumptions?"; under a drawing, "knew" has no object, and both sentences speak to believers. Worse, it does the opposite of 4.1's rule: the two ends of the Line sit side by side, and the caption asserts the likeness instead of saying where it breaks. The phone Line carries five labels and no hinges, so none of the reckonings "in the same ink" that 10.7 risk 3 relies on reaches the phone, where the skeptic arrives. Then row two is Tonight, and the first band below the hero is the household's week (the table, the catechism question, the table's verse): the "second clock" rule 14 keeps off the skeptic's pages, and the devotional center of gravity 1.5 rejected The Week for, moved down one band.

**Fix.** Put one line above the headline that names the readers, in James's published words (from `/about`: "If you do not believe any of this, I am not going to pretend your reasons are stupid."). Replace the caption with a sentence that says where the rhyme breaks (James's to write, D5), or with none. On the phone, draw one reckoning tick. Head the This week band *For the household* so a stranger reads it as one room of the house, not the house.

### 10. The masthead descriptor never reaches the phone and cannot fit on desktop (serious)

**Claim.** 2.1 and 3.4: "From 1100px, a plain descriptor in Inter 13px `--ink-muted` beside the name"; the header also holds five doors, Find Help, a 240px search field, Subscribe and a My Library icon.

**Problem.** The visitor critic's major finding ("the masthead says wellness site") was judged on the phone header, and VISION's phone masthead (3.2) has no descriptor: "LiveWell," "BY JAMES BELL," and a mustard "Find Help," exactly what he saw. On desktop the row does not fit. An estimate: wordmark block about 110px; descriptor about 330px for the footer's 51-character line or about 410px for the contract's 63-character tagline; five doors with gaps about 360px; Find Help about 75px; search 240px; Subscribe about 110px; My Library 44px; six or seven gaps about 160px. That is roughly 1,350 to 1,430px against the 1,180px content width (`--w-default`), and the descriptor is promised from 1,100px.

**Fix.** Set the descriptor under the wordmark at every width (in place of, or after, "BY JAMES BELL"), at 11 to 12px, so the phone gets it. Collapse the desktop search field to an expanding field below 1,280px. Measure the row at 1,100, 1,280 and 1,440 in the prototype.

### 11. The menu rows the vision specifies can never ship (serious)

**Claim.** 2.1's menus (Topics: "What 'post-Christian' means · Not sure you believe any of this? · ... · Test the case"; Family: "This week, on one page," "Starting family devotions"; About: "How we write," "What's new and corrections") against 10.6: "`siteNav.ts` changes only in U90's PR (the Study rows) and only for rows whose pages exist."

**Problem.** Checked in `client/src/lib/siteNav.ts`: the Topics menu today holds every topic, Honest answers, Eight-week plans, Self-checks, All tools and All resources. No row for the post-Christian page, the skeptic's door or Test the Case; nothing new under Family or About. The lanes rule lets only U90 touch the file, and only for Study. Critique #5 faulted Test the Case for being unreachable from the header; under VISION's own rules it stays that way.

**Fix.** Each unit that ships a page adds its row in the same PR (U82 the skeptic's rows and Test the Case, U25 and U48 the post-Christian row, U20 and U93 the Family rows, U92 the About rows), with `siteNav.ts` edits serialized by the lead as `App.tsx` already is.

### 12. New device memory shows sensitive care to whoever holds the family's phone (serious)

**Claim.** 2.5: "The empty field shows ... 'Recently visited on this device,' with Clear." 3.3: *Where you are*, "Last opened: John 1 · Continue." 7.2 rule 22: "nothing about a person enters a URL or telemetry."

**Problem.** Rule 22 covers addresses and telemetry, not the device's own screen. `myProgress.ts` already tracks eight-week plans (among them the pornography-recovery plan the critique names), self-check results and the Worry Journal; 30 care pages carry `"sensitivity": "high"`. VISION designs Home to be opened at nine at night at the family table (the Tonight row) and puts recents in the empty search field. A spouse, a parent or a child holding the same phone sees "Recently visited: ..." or "Continue: Eight Weeks Out of Hiding." The care pages already warn "if someone checks your phone" and offer Exit; the new displays undo that. This is a hazard the critique did not have, created by the redesign on the surface `CLAUDE.md` calls crisis-facing.

**Fix.** High-sensitivity care pages, recovery plans and self-check results never appear in Home's rows or in search recents; recents are off until the reader turns them on; a component test asserts it against the `sensitivity` field.

### 13. The design gates lock the known accessibility failures in rather than fix them (serious)

**Claim.** 6.4 and U70: `validate-design.mjs` fails mustard as text on light surfaces, inline `outline: none` and inputs under 16px "with a baseline like its hex baseline so new debt fails and old debt is paid down and locked in."

**Problem.** A baseline grandfathers today's debt: the 467 mustard text colors, the 37 inline `outline: none` declarations and the 31 inputs under 16px stay until someone happens to edit their file, and no unit is assigned to pay them down. `/search` keeps its 2.09:1 labels until U85 on February 12. Critique #9 and the mobile critic's critical finding call this "a plain AA failure on a core page." The input fix is one CSS rule the mobile critic wrote out (`input, textarea, select { font-size: max(16px, 1em) }`).

**Fix.** U70 pays the debt and sets the baseline at zero: the global input rule; a mechanical swap of `--mustard` text on light surfaces to `--mustard-text`; the inline `outline: none` removed or moved into classes that restore `:focus-visible`. U34's blocking axe run (master plan, January 8) then guards the result on the 25 routes.

### 14. The calendar contradicts itself on Advent and misses January 1 (serious)

**Claim.** 10.2's heading ("nothing a reader sees redesigned before Advent"); 10.3 ("U76 to U78 ... pulled forward to land before January 1"); 10.7 risk 1 ("nothing a reader sees redesigned during Advent").

**Problem.** Phase 2 runs November 29 to January 10, which is Advent through Epiphany, and ships the crisis buttons (December 4), the essay template (December 4 and 11), the chapter page (December 11), the Line and history door (December 18), the skeptic's door (December 18), For Sunday (December 16) and the verse panel (December 22): every one is reader-visible. Risk 1's hold is false. U78 (Read · Study · Teach and the leader's sheet) targets January 8, after the date it is pulled forward to meet. James merges every PR (MASTER-PLAN 0, item 5), and his reading avoids December 13 to January 6. Either the fixes for problem 1 slip past the spike, or the promise to protect Advent breaks.

**Fix.** Say which holds. If reader-visible code may ship in Advent, delete the risk-1 sentence and schedule James's merges, which need a click, not a read. If it may not, land U73 and U76 by November 28 and accept that the panel follows after Epiphany. Either way set U78's target before January 1 or drop the claim.

### 15. Night arrives after Lent begins, and offline as written cannot be built (serious)

**Claim.** 1.4 row 21 and U89 (Night, March 12, behind P6); D11 ("reversing the service worker's `selfDestroying` for those paths").

**Problem.** Critique #9 and the mobile critic's first critical finding: the pages read in the dark have no night setting. Night ships March 12, a month into Lent, and not at all if P6 is no. The charcoal browser chrome over a cream header on dark-mode phones is two `theme-color` lines in `client/index.html`, and it waits for Night too. Offline has no default and no unit, and D11 cannot be done as worded: `vite.config.ts` line 22 sets `selfDestroying: true`, which unregisters the whole worker and clears its caches; there is no "for those paths." Keeping the Bible and the care pages offline means bringing a live worker back and solving the stale-deploy problem that flag was set to cure, which VISION does not mention. (CRITIQUE section 4 listed "the manifest and service worker" as something to keep, on the mobile critic's reading; the worker is in fact destroying itself today.)

**Fix.** Fix `theme-color` now (it needs no dark palette). Pull Tonight, table mode and the care pages forward in U89 ahead of Lent, with the hero audit limited to those surfaces. Rewrite D11 honestly: a live worker with network-first navigation and an update prompt, scoped caches for `/bible/text/`, `/needs/` and the crisis-line data, and a stated budget, as its own unit with James's yes.

### 16. Maps and figures are promised and also excluded (minor)

**Claim.** Section 8's era-essay row: "a line map where one helps"; 5.9: the context guide's "figure its paragraph describes, drawn in the house line (the honor, shame and guilt triangle)." 6.6: "A new drawing needs a place in the series ... before it is drawn"; "lines, ticks, bands and cells, nothing else."

**Problem.** Critique #8 and #10, the editorial and brand critics ask for line maps on era essays and Bible books. The plate series (I to VII) has no map and no guide figure, and 6.6 forbids a drawing without a plate. So the promises cannot be kept under the vision's own rules.

**Fix.** Add a plate for the line map (places as labeled points on a hairline coast, no tiles, no library) and one for guide figures, each with its pattern page; or strike the promises from section 8 and 5.9.

### 17. The breadcrumb contradicts the URL, and no controlled vocabulary is set (minor)

**Claim.** 2.1: "URLs do not move; the breadcrumb is the map."

**Problem.** Critique #4 asked for "a breadcrumb that matches its URL and its door" and "one controlled vocabulary for every label." `/resources/creeds/*` and `/resources/context/*` will breadcrumb into Study while `/resources` itself is Topics' A to Z. VISION's own labels already drift: "The Bible in its world" (menu), "context guide" (5.9), "Reading Scripture in context" (on the site today). No vocabulary file or check is proposed.

**Fix.** One `labels.ts` for every door, room and kind name, with a test that menus, kickers and breadcrumbs read from it. Say plainly in 2.1 that URLs under `/resources/` belong to Study and leave a one-hop move under the doors as later work.

### 18. "How to live it" still has no row (minor)

**Claim.** 2.1's Topics menu; 8's footer row ("adding ... the Integrated Life guides").

**Problem.** Critique #4: "the 69-guide Integrated Life library appears in no header, footer or hub." VISION adds it to the footer (U84, January 22) and leaves its fit to the Guide's regions unchecked ("Not verified"). The brief's fourth aim, how to live it, gets no row of its own in any menu.

**Fix.** A Topics row in James's words for living it (marriage, work, money, the body), opening the Guide's matching region or `/life` until the Guide ships.

### 19. Find falls below the real first screen on a phone (minor)

**Claim.** 3.1: "the sentence, the skeptic's door and Tonight must sit above about 520px"; 3.2: Find at 745 to 797.

**Problem.** CRITIQUE's `/` row asks for Find on the first screen, and the mobile and product critics asked for a field the thumb can use there. With a phone browser's bars showing, 745 to 797 is below the visible screen, and the stricter measure exempts it.

**Fix.** Include Find in the 520px measure, or set it above the Line on a phone.

### 20. The skeptic's door skips the pages for a man hurt by church (minor)

**Claim.** 3.2: the row "Opens Test the Case at Move 1"; 5.19.

**Problem.** Critique #5's world-class version opens "Test the Case, Honest Answers and the two church-hurt pages." The visitor critic's section 10 is about the man angry at his church, not doubting the resurrection. Home sends every skeptic straight into the resurrection case; only the menu and `/answers` reach `/skeptic-track`.

**Fix.** Home's row opens `/skeptic-track` (one screen, four rows, nothing asked), with *Test the case* as its first row.

### 21. Home's title and description still sell the name (minor)

**Problem.** The visitor critic's step 0: the search result says "LiveWell by James Bell" and "A Study Bible with notes on every chapter," neither of which answers "what does post-Christian mean." VISION never mentions Home's `SEOMeta`.

**Fix.** A literal title and description on Home that carry the subject, in U84.

### 22. The mustard versal breaks the vision's own text rule (minor)

**Claim.** 5.24: "the versal (a three-line Cormorant initial in mustard ...)"; 6.4: "`--mustard-text` ... is the only mustard for text on a light surface."

**Problem.** A versal is the first letter of the essay. Bright mustard on cream is 2.09:1, below even the 3:1 that large text needs.

**Fix.** Set the versal in ink or `--mustard-text`, and let the end mark carry the bright mustard.

### 23. "Nothing interactive between the first sentence and the last" contradicts the template (minor)

**Claim.** 7.2 rule 5 and 5.24 item 2 against the same item's sheets, margin notes that open on a phone, live references, and people, councils and dates that open in place.

**Fix.** Restate the rule as what it means: nothing in the body asks the reader to act (no fields, polls, quizzes or prompts).

### 24. `/help` keeps its black hero and its length (minor)

**Claim.** 5.21: "today's first screen kept as it is"; 6.4: black "in five places only."

**Problem.** `/help` opens on black and is not one of the five; it runs 14.4 phone screens with its twelve chips repeated as 36 cards (critique #4, mobile 15). Nothing in VISION shortens it.

**Fix.** Name it as a sixth place of black with its reason, or move it to cream; apply 5.1's one-screen hub rule below the crisis panel.

### 25. Rejections the vision does not declare (minor)

**Problem.** CRITIQUE's `/family` row asks for "a year strip of nights done"; VISION refuses it (5.22, rule 6) without listing it in 1.5. Section 8 keeps "Focus" for essays, but the Aa control (5.24, 6.7) has no Focus.

**Fix.** List the year strip in 1.5 with the reason; put Focus in the Aa spec or say it retires.

### 26. Stale facts in the prototype brief (minor)

**Claim.** Section 0: "five pilots sit on `origin/claude/essays` (PR #539, waiting on James's sample read)"; section 9: "The essay screen says plainly that the pilot is awaiting his sample read."

**Problem.** NOTES records James's "merge the pilots, they look good" on 2026-10-28, and PR #539 is on `main` as `fea345a4`. The honesty line on screen 6 would now be false.

**Fix.** Update section 0 and screen 6: the pilots are live and James approved them as written.

---

## What VISION does fix, for fairness

The chapter's first screen (verse 1 by about 420px, the summary in two lines, the outline as headings in the text, the bottom bar and picker, *John 2* at the last verse, the next chapter prefetched); a verse sheet that is a real dialog with detents, Previous and Next; the margin that follows the reading on desktop; one search over one index with the answer shaped by the kind of query and the sensitive-text rule; the essay's first sentence on the first screen and an ending allowed to end; Inter's true italic whatever P1 says; one page head on cream; the crisis lines as three 44px buttons by December 4; "Next move" and "Not convinced, but go on"; the canon map in place of 66 cards; the one fact-sheet default that prints no count. The Line's honesty grammar (certainty drawn, ledger before tick, list equivalent) is well specified.

Every quotation VISION prints from a stored text or the site's data was checked and matches: the Letter to Diognetus, the Martyrdom of Polycarp, Irenaeus *Against Heresies* 3.11.3 (both excerpts), Ambrose's Letter 51, Augustine *City of God* 5.26, Theodoret 5.17 (both lines) in `scripts/data/history-sources/texts/`; Hebrews 12:1, Deuteronomy 6:7 and John 1:14 in the BSB shards; catechism questions 25, 35, 46 and 55; the glossary's line on grace.

## Not verified

No screen was rendered for this review; the header width in break 10 is an estimate from character counts, not a measurement. Whether a formatted public-domain BSB is reachable through this sandbox's proxy was not tested (break 5). That `myProgress.ts` surfaces a care page by name was not shown; it does surface plans and self-checks, and VISION's new recents would surface pages (break 12). The overlap of Parts V to VII rests on MASTER-PLAN 7.2's ranges and session lists, which that section itself calls candidates. No gate was run; this file changes no code.
