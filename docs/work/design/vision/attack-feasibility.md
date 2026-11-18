# Attack: can VISION.md be built?

One of the attacks on `docs/work/design/VISION.md`. The lens is feasibility. Can a small team (agent lanes, and one pastor who decides and reads) build it in phases in this codebase? Does it keep the home page inside its Lighthouse budget on a phone, stay clear of heavy libraries, hold content as data behind validators, and leave the redirects, SEO, the two runtimes and merged work intact? Where is it too big, underspecified, or in the wrong order? Prepared 2026-10-28.

**Read for this attack.** `CLAUDE.md`; `CRITIQUE.md`; `research/A-`, `B-` and `C-SYNTHESIS.md` (structure and the patterns VISION cites); `MASTER-PLAN.md` sections 0 to 3, 8.6, 9, 10.1 to 10.3 and the unit cards in 10.6; `NOTES.md`; `VISION.md` in full; `judge-engineer.md`; the current screenshots of Home, John 1 and the history door; the unit files for U08 and U18.

**Checked in the repo** (work branch `claude/todo-implementation-hhp4bm` at ecfb3e21; `origin/main` at fea345a4):

- `App.tsx:23` imports `Home` directly, not through `React.lazy` (186 other routes are lazy). Whatever Home imports goes into the entry chunk that every route loads.
- The CI `quality` job (`.github/workflows/ci.yml`) runs Lighthouse on `/` only and has `continue-on-error: true`. Its thresholds are performance 90, accessibility 90, best practices 95, SEO 95. U18 measured Home at 93 to 95, with LCP at 2.6 to 2.7 s and TBT of 60 to 150 ms, and the portrait unreachable in the sandbox. U18 grew the entry chunk by 4.8 KB gzip. U08's 83 in CI came from the portrait.
- `scripts/prerender-heads.mjs:652-704`. The static home hero is an HTML string written by hand. It reads `HOME_HEADLINE` and the other strings out of `positioning.ts` with a regex. `main.tsx` mounts with `createRoot`, which replaces it once the paint is recorded (`lib/static-hero.ts`). Home's LCP depends on that race (U08).
- The CSS ships as one render-blocking stylesheet: `index.css` is 85 KB of source and 127 KB once built.
- `familyYear.generated.ts` is 34.6 KB raw. The 2027 plan, `bible/guides/whole-story-2027.json`, is 100.5 KB and is fetched through `fetchStoryPlan()`.
- The Bible data. `bible/ch/john/1.json` is 54 KB, and each verse holds `t`, `w` (the interlinear) and `x` (the twelve cross-references) side by side. `bible/lex/` is 9.1 MB in 75 buckets with no index by word. Chapter `summary` fields total 535 KB raw. `interpretation` is one prose paragraph per chapter and exists in 114 chapters.
- Search. `/search` loads `search-index.json` (129 KB) and every `LIBRARY_SOURCES` manifest. It also queries `trpc.search.global`, `search.articles` and `search.resources`, which are server procedures in both runtimes, for essays held in the database.
- Essays. `client/public/essays/` on the work branch holds only `README.md`. The five pilots are on `main` (fea345a4), and their override JSON has `slug, title, excerpt, body, updated` and nothing else. The fifteen live shelf essays are database rows, mirrored in `client/src/data/content-data.json` (the 3.1 MB `content-data` chunk).
- History. There is no registry yet (U30 has not been built). Dates are strings ("around 35 to 108"). MASTER-PLAN 7.2's Parts VI to VIII have no years, and Part VI (The American Experiment) overlaps Part V (1650 to 1900) in time.
- Night. `ThemeProvider defaultTheme="light"` is global. Components hold 691 `rgba(` literals in 205 `.tsx` files and 178 hex literals. `PageHead` is used in 8 page files, while 245 files under `pages/` reference charcoal.
- `Sheet.tsx` is a Radix modal: focus is trapped, the page behind is inert and held still, and it becomes a right-hand panel from 1024px. `vaul` is already a dependency (`components/ui/drawer.tsx`). So is `qrcode-generator`. No chart or map library is installed.
- `client/src/data/answers.ts` stores each answer as `paragraphs: string[]` (36 entries). `validate-answers.mjs` checks only that each `essaySlug` resolves.
- The catechism is keyed by `number` (1 to 76). Questions 47 and 61 are the baptism pair that U40 will de-duplicate.
- Routes. `/theology/history/:slug` (era essays) is a single-segment catch-all. `/theology/history/timeline` does not exist yet. `/start-here` already 301s to `/start`.

---

## The verdict

VISION can be built in this codebase without a heavy library, without an API procedure and without touching the never-redirected list. Its biggest engineering choices are right: a verse is a state of the chapter page and not one of 31,000 pages, every join is a generated file with a validator, the history drawing is SVG built at build time, and the desk is rebuilt before January 1. No break below is fatal.

It is not buildable as written on its own schedule or budget. Five things go wrong:

- The home-page budget measures the wrong thing. Home is the entry chunk for every route, and the Lighthouse gate does not block.
- Two signature interactions rest on data that does not exist in the shape they assume: the verse panel's dated church readings and its payload, and search's word shards.
- The joins assume every essay is a committed file, and the live shelf is in the database.
- The calendar ships most of the reader-visible redesign inside Advent and changes the chapter page a week into the January 1 spike, against its own risk list.
- A good share of the visible change has no unit: breadcrumbs, the site chrome, page heads on about 200 pages, the era essays, and the components. Several units depend on work scheduled after them.

Each has a direct fix, listed below. Eleven breaks are serious and ten minor.

| Question | Answer |
|---|---|
| In phases by a small team | Yes, if the history ledger is split out of U30, the prototype is cut or resized, the unassigned sweeps get units, and the Phase 2 calendar is re-cut (breaks 6, 7, 8, 9, 12) |
| Fast on a phone (Home's Lighthouse budget) | Not as specified. The budgets are counted against the wrong chunk, contradict each other, and nothing blocks (breaks 1, 2, 3, 4) |
| Without heavy libraries | Yes. Radix, `vaul` and `qrcode-generator` are already installed, and VISION refuses chart, map and canvas libraries. Use `vaul` for detents rather than hand-rolling them (break 14) |
| Content as data, with validators | Mostly. The church readings, the four moves in the answers, the dated Parts and the word index for search are new data, not existing data (breaks 3, 4, 7, 13). Committed generated joins will conflict across lanes (break 17) |
| Redirects | Safe. The folds are one hop each and go through `site-structure.test.ts`. Re-point `/start-here` with `/start` (break 19) |
| SEO | Safe apart from small seams: the visible breadcrumb against the prerendered BreadcrumbList, new static routes under `/theology/history/` registered before `:slug`, and `/week/*` heads (breaks 18, 19, 21) |
| Two runtimes | Untouched as claimed only if search keeps its server queries for database essays and VISION says so. Otherwise a reader can no longer find James's own admin posts in search (breaks 4, 5) |
| What is merged | Wave 3 is not on `main`, the pilots are not on the work branch, and Phase 1 stacks on both (break 10). U18's Home doors and U19's menu are reopened without saying so (break 9) |

---

## The breaks

### 1. The home-page budget is counted against the wrong chunk, and nothing enforces it (serious)

**Claim.** 3.1 item 5, 3.5, 4.11 ("no more than 5 KB gzip on Home's entry chunk ... over it, the current year's slice loads after mount"), 6.1 ("Home loads no new face"), 10.4 U84 ("Lighthouse no worse than after U08"), 10.7 risk 10.

**Problem.**

- **Home is the entry chunk.** `App.tsx:23` imports Home eagerly, so every module Home imports ships to all routes, including the chapter page that the 2027 plan sends readers to every day from January 1. VISION's Home pulls in the week engine, *Where you are* (`myProgress`, `storyPlan`), the Line module for both widths, Plate II (66 bars), Plate VI (the rings), the verse panel trigger over Home, the moment band, the essays band and the merged footer index. Only the week engine has a budget, and no section says which bands load lazily. U18 learned the cost already: a module shared with the entry brings every export that the lazy pages use.
- **The budgets contradict each other.**
  - The year map alone is 6.3 KB gzip, against a 5 KB budget for an engine that also carries the catechism walk, the daily sets and the 2027 plan. The plan is a 100.5 KB file that is fetched today.
  - The fallback ("the slice loads after mount") is a network fetch. That breaks the Tonight row's own rule ("never from the network").
  - 3.2 sets the hero caption on the first phone screen in "the text serif's italic ... (Inter's true italic if the serif is declined)". 6.1 says "Home loads no new face", then falls back to Inter's italic, which is not shipped today either. A face that swaps in on the first screen moves the Find field beneath it, and that is a layout shift.
- **CSS grows on Home too.** Eight lane prefixes (`.st- .pl- .hx- .tp- .tb- .pg- .ed- .cr-`) all land in the one render-blocking stylesheet (127 KB built), which Home pays for. U08 named that stylesheet as a render-blocking cost and left it alone.
- **Nothing enforces the budget.** The Lighthouse step is non-blocking and runs on `/` only. U35's payload budgets are "warning first" and due January 8, after U76 and U77 have rebuilt the chapter. The headroom is 3 to 5 points (93 to 95 against a floor of 90).

**Fix.**

- Split Home: the hero stays eager, and everything below it is one `React.lazy` band component in a reserved box. Write that into U84.
- Pull a blocking entry-chunk budget and a CSS budget (for example, entry at or under its U18 size plus 3 KB gzip, CSS at or under 25 KB brotli) into U70 in Phase 1.
- Make the quality job's Lighthouse step blocking at 90 for UI units, and add one chapter route beside `/`.
- Bake only the 2027 plan's day-to-chapter pairs into the week map, or let the plan row and *Where you are* fetch after mount below the hero. Re-state the 5 KB budget against measured numbers.
- Set the caption in Cormorant 400 italic at 22px or larger. That face is already shipped, and its size meets VISION's own floor for Cormorant. Alternatively, set the caption in Inter roman. Either way, no new face lands on Home.

### 2. The static hero quadruples in size, and its mechanism is the reason Home passes today (serious)

**Claim.** 3.1 item 5 ("everything in the hero is static HTML from `scripts/prerender-heads.mjs`, which changes together with `Home.tsx`"), 3.2, 3.4, 6.6 ("the drawing is static SVG generated at build, under 8 KB").

**Problem.** The hero that passes today is about 15 lines of HTML. `homeHeroHtml()` writes them by hand, pulling strings out of `positioning.ts` with a regex. U08 found that the score depends on React's copy replacing that static copy without winning the LCP race.

VISION's hero adds a great deal to it: two link rows, one with a reserved slot filled after mount; the Line twice (a phone SVG and a desktop SVG with up to twelve focusable marks); a caption; *See the whole story*; and the Find input. All of it must be duplicated in a Node script that cannot import TypeScript, and must match React's render "moving nothing." The "small generated module" for Home's drawing is not specified in a form both can read.

Both SVGs ship in the HTML, and the same strings ship again in the entry chunk. Text typed into the static Find field before React mounts is lost when `createRoot` replaces `#root`.

**Fix.**

- Have `build-line.mjs` write `client/public/history/line-home.json` holding the two SVG strings and their year. The prerender and Home both read it, the prerender as a file and Home through an import that Vite inlines as a string.
- Add a Vitest test that renders Home's hero to a string and compares its text and structure with `homeHeroHtml()`.
- Keep Find out of the static hero, rendered after mount in a reserved 52px box, or carry its value across the mount.
- Ship the desktop SVG's marks as plain `<a>` elements with a URL query (`?e=`), so the static copy works before React mounts.

### 3. The verse panel's payload and its "church on this verse" assume data that is not there (serious)

**Claim.** 4.3 ("the interlinear loaded only when *The words* opens"; *Elsewhere in Scripture* "the 12 strongest ... each with its first line printed"; stage one "sets the `interpretation` field of the 114 chapters as dated rules"; "a dot for each witness"), 5.4 Loading, 9 screen 3.

**Problem.**

- **The cross-references come with the interlinear.** They are the `x` array beside `w`, inside the same 54 KB `bible/ch/<book>/<n>.json`. The panel counts its rows when it opens, so the first tap loads the interlinear anyway.
- **"Its first line printed" costs about ten more fetches.** For John 1:14 that means shards from 1 John 4, 1 Timothy 3, Galatians 4, Isaiah 40, Hebrews 1, Philippians 2, John 6 and 1 Corinthians 15. They are paid again on every *Next verse*.
- **The church readings are prose.** `interpretation` is one paragraph per chapter ("The prologue has been among the most interpreted passages ..."). It has no dates, no names and no verse numbers as fields, so there is nothing to draw as dots on a rule for a verse. The prototype's five dots for John 1:14 were picked out of the prose by hand. Doing that for 114 chapters is new structured data with a ledger. Assigning chapter-level readings to one verse would also misplace claims ("both sides appealed to this chapter").

**Fix.**

- Have `build-bible.mjs` emit a small per-chapter cross-reference file with the twelve references and their first lines computed at build. The panel opens on it, and `w` stays lazy.
- Add a `readings[]` field (`who`, `date`, `certainty`, `verses`, `source`) to the chapter notes, checked by `validate-bible-notes`, and fill it by hand for the Gospels first.
- Until a chapter has that field, title the row *The church on this chapter* and show the paragraph as a labeled study note with no dots.

### 4. Search has no real budget, and its "all client-side" answer drops the database (serious)

**Claim.** 2.5 ("a head shard ... first, chapter summaries and the lexicon only when the query is a word. Today's 128 KB index is the ceiling to beat. All client-side; no API procedure changes"), 10.4 U85 (Feb 12, depends on U72 and U86).

**Problem.**

- **The shards are far larger than the ceiling.** Chapter summaries alone total 535 KB raw. The lexicon is 9.1 MB in 75 buckets keyed by Strong's number, so finding *charis* by word needs a gloss index that does not exist. "A word query" is nearly every query that is not a reference, so a phone would fetch a summaries shard four times the stated ceiling on the second keystroke.
- **The ceiling is not even today's figure.** `/search` already loads every `LIBRARY_SOURCES` manifest besides the 129 KB index.
- **The database drops out.** `/search` queries `trpc.search.global`, `search.articles` and `search.resources` for essays held in the database. "All client-side" either removes those queries, so James's admin posts and the fifteen live database essays vanish from search, or keeps them, in which case the ranking by kind of query must merge server rows, and VISION does not say how.
- **U85 depends on work scheduled after it.** The definition card for "grace" needs the catechism answer and the doctrine study for a doctrine word, which is U90's doctrine joins (Feb 26). U85 is due February 12.

**Fix.**

- Write the shard budgets into U85 and gate them in `check-payload-budget.mjs`. For example: head 60 KB gzip on focus; summaries 120 KB gzip, loaded only for a query of two or more words that matched no reference; a generated gloss-to-Strong's index of 40 KB gzip or less; never the `lex/` buckets.
- Keep the existing server queries as the *Essays* group, which needs no API change, and say so in 2.5.
- Make U85 depend on U90, or give U85 a hand-filed `doctrine-words.json` (term, glossary id, catechism number, study id) with a validator, and let U90 absorb it later.

### 5. The joins assume every essay is a committed file; the live shelf is in the database (serious)

**Claim.** 2.6 (the citation index runs "over every essay"), 2.5 ("every result ... carries its date"), 3.5 item 5 (the lead essay "with its date, minutes and first sentence"), 5.24 (margin notes, *Test this yourself* with the essay's dated hinges, *Sources and record*), 5.25 (*By passage*), 10 ("everything in this vision is static JSON generated at build").

**Problem.** The fifteen public shelf essays and every post James publishes through the admin after 2026-10-12 are database rows. The Decision Log says the admin posts "appear on their own."

The citation index is committed with a `--check` drift gate, and CI has no database, so it cannot see any of them. The same is true of *By passage*, *On LiveWell*, *Discussed on LiveWell* and the essay row in the Connected block.

The override JSON for the five pilots carries `updated` and no publication date, sources, questions, notes or hinges. The essay foot that 5.24 specifies is therefore empty for every essay except future rewrites. Home's essay band would need an API call it does not make today.

**Fix.**

- State the scope: the joins and the full foot apply to essays with a JSON override, and database-only essays get references in link mode, parsed at render, with no Connected block.
- Add a unit that moves the fifteen live essays into overrides (their text is already in `content-data.json`), with the dates James confirms.
- Home's band either reads the shelf and overrides only, or calls `posts.listPublished` after mount below the hero.
- U24 adds `published` beside `updated` to the override schema.

### 6. The calendar redesigns inside Advent and changes the chapter page a week into the spike (serious)

**Claim.** 10.7 risk 1 ("nothing a reader sees redesigned during Advent"), 10.3 Phase 2, 4.4 Defaults ("Read when the reader comes from ... the 2027 plan"), 10.7 risk 5.

**Problem.**

- **Advent gets the redesign.** Phase 2 ships about fourteen units that readers will see between December 4 and January 11 (U83, U23, U24, U76, U75, U31, U32, U82, U20, U77, U101, U78, U80, U81). Advent runs November 29 to December 24.
- **The depth control lands mid-plan.** U78 brings the depth control and its rule that plan readers open in Read, which has no verse numbers. It lands January 8. A reader who starts the plan on January 1 sees verse numbers and notes for a week, then finds a page without them.
- **U77 lands inside James's no-reading window.** It ships on December 22, between December 13 and January 6. NOTES' review rule lets code merge on green CI, but no one who can judge the reading surface sees it before the spike.

**Fix.**

- Re-state risk 1 truthfully ("nothing redesigned on the household surfaces during Advent").
- Freeze the chapter page from December 23 to January 10.
- Land U76 by December 11 and U77 by December 18, or move U77 after January 11.
- Ship U78 after January 11, and until it lands make Study the default for readers who come from the plan.
- Name the fallback: if U77 misses December 18, it waits for January 11.

### 7. The history critical path to January 11 is a verification project inside a code unit, and the Parts cannot be drawn as bands (serious)

**Claim.** 2.6 item 1 ("every node that has a date carries one, with its certainty ... and a ledger line naming its source"), 4.1 Data, 3.4 (the Parts "as alternating bands ... on to VIII · After Christendom"), 10.2 U30 changed (L, December 4), 10.3 (U75 and U31 both December 18; U80 January 8; U33 January 11 depending on U80), 6.11 D6 (no default).

**Problem.**

- **U30 now carries a verification project.** It owes a sourced ledger line for 68 events, 36 people, 11 councils, the Parts and every hinge, on top of the migration. That is fact-checking under the roughly 200-search budget per turn noted in NOTES, with newadvent, ccel and wikisource unreachable, and it is sized as one L code unit.
- **The slice's path is longer.** The January 11 slice now waits on U80, which waits on U31 (gated on D6, which has no default), which waits on U75, which waits on U30. U75 and U31 share a target date.
- **The Parts cannot be bands on one axis.** MASTER-PLAN 7.2 gives Parts VI to VIII no years, and Part VI (The American Experiment) overlaps Part V (1650 to 1900). `validate-history.mjs` cannot check a periodization nobody has drawn.

**Fix.**

- Split U30 into the schema and migration (December 4) and the ledger by Part. Parts I and II come first, since they are the slice's ground.
- The Line draws only marks that carry a ledger line. *Not yet written* covers the rest.
- Give D6 a default: Parts I to V, VII and VIII as the bands, Part VI drawn as the "In America" row the Line already has, and the era essays filed by date overlap.
- Take U80 off the slice's path. Compare the witnesses is already in the prototype, and it can follow on January 25.
- Let U31 ship list-first on December 18 and gain the Line when U75 lands.

### 8. A large share of the visible change has no unit (serious)

**Claim.** 2.1 (a breadcrumb on every page, the door lit for every page beneath it, the menu as a bottom sheet over a scrim, a desktop search field, the masthead descriptor, Subscribe as an outline button), 5 preamble ("every page head is `PageHead` on cream ... black page heads retire"), 6.3 (one gutter "on every page"), 6.7 (one eyebrow style, three buttons and one quote device, replacing six, seven and three), 5.24 (the template serving the 22 era essays; "people, councils and dates in the prose are quiet links"; numbered margin notes), section 8 rows citing "U70, U84" and "U31, U32, U51 on."

**Problem.**

- **No unit's scope names this work.** U70's row in 10.2 holds tokens and gates only, and U84's row holds Home, `/study` and the prerender.
- **The breadcrumb needs its own map.** It needs a door-and-room map for about 260 routes, and VISION does not say where that map lives.
- **The page-head sweep is large.** `PageHead` sits in 8 page files today, while 245 files under `pages/` reference charcoal.
- **The prose links have no mechanism.** Linking people and councils in prose needs markup in essay bodies or a matcher, and 2.6 rules out regex. No field holds the margin notes either.
- **The era essays get no unit.** Moving them into the template has none.

Without these, the site ships half old and half new, which is the "seams show" finding (critique #10).

**Fix.** Add the units and size them honestly:

- **Site chrome.** `MinimalNav`, `Footer`, and a `nav-map.json` of route to door and room, read by the app and by the prerender's BreadcrumbList. Frame lane, M, Phase 2.
- **Page heads and components.** A sweep in waves of about twenty pages, each with screenshots. Platform and Frame lanes, XL, Phase 3 and later.
- **Era essays.** The 22 era essays moved into the template. History lane, L.
- **Links in prose.** Drop them from 5.24 until a markup (`[[person:athanasius]]`), a remark plugin in `Markdown.tsx` and a validator exist.

### 9. Several units depend on work scheduled after them (serious)

**Claim.** 3.5 and 10.4 U84 (January 22, depending on U75, U74 and U18), 3.5 item 1 (opens `/study/doctrine/q/46`), item 3 (the Doctrine room, *Twelve weeks*, "Begin with week 1"), item 6 (`/how-we-write`), 5.2, 10.6 ("`siteNav.ts` changes only in U90's PR").

**Problem.**

- **Home and `/study` link to pages that come later.** U84 (January 22) puts on Home and `/study` links to:
  - `/study/doctrine` and its question pages (U90, February 26)
  - `/how-we-write` (U92, February 26)
  - `/theology/history/twelve` (U91, a frame on March 5 and live only when James has chosen the turns)
  - *Starting family devotions* (U93, March 19)
- **Search needs the doctrine joins first.** U85 needs U90 (break 4).
- **The essay template comes before its tokens.** U23 and U24 (December 4 and 11) use U70's `--fs-*`, `.ed-` and `SpeakerLabel` but do not depend on U70.
- **The menu rule contradicts the unit plan.** The menus in 2.1 add rows whose pages arrive in U20, U82, U92 and U93, which contradicts "`siteNav.ts` changes only in U90's PR."
- **Merged work is reopened without saying so.** U84's Home drops the typographic doors that the critique kept and that wave 3 extended with a Topics door (37a679c4). VISION does not list that as a reversal of merged work.

**Fix.**

- Apply 2.1's own rule ("rows for pages not yet built appear only when the page ships") to Home's bands and `/study`'s rooms.
- Either move U84 after U90 and U92, or ship U84 with the links that exist and let each later unit add its own link.
- Make U85 depend on U90 and U23 depend on U70.
- Let each page's unit add its own menu row, serialized in the Frame lane with `site-structure.test.ts`.
- Name the reversal of the Home doors in 8.

### 10. Phase 1 stacks on trunks that have not met (minor)

**Claim.** 0 ("five pilots sit on `origin/claude/essays` (PR #539, waiting on James's sample read)"), 9 screen 6 ("awaiting his sample read"), 10.1 ("Wave 3 ... goes to James to merge as it stands").

**Problem.**

- **The facts in section 0 are stale.** James approved the pilots on 2026-10-28, and they are on `main` as fea345a4. The work branch does not contain them.
- **Wave 3 is still off `main`.** It is about 86,000 inserted lines across 204 files. MASTER-PLAN 0.2 has code units branch from `main`, yet Phase 1's units need wave 3 code (U74 needs U28, U30 needs U07, U84 needs U18, U86 needs U25, U20 needs U21).
- **No date joins them.** Without a date for wave 3 reaching `main`, wave 4 stacks on an unmerged wave 3.

**Fix.** End Phase 0 with a dated step: wave 3 merged to `main`, then `main` merged back into the work branch, before U70 starts. Then correct section 0 and screen 6.

### 11. Night is undersized and its per-page rollout is unspecified (serious)

**Claim.** 6.9, 10.4 U89 (Platform, L; audit in February, Night on March 12, "live first on Tonight, table mode, the care pages and the chapter"), P6.

**Problem.**

- **The audit is too big for one L unit.** It covers 691 `rgba(` literals in 205 files, 178 hex literals and a render test of "every page head" under `html.dark`. MASTER-PLAN 10.7 parked it for that reason.
- **Night cannot be scoped to four pages as things stand.** The theme is a global class, and the chrome is shared: `MinimalNav`, the footer, and the static masthead shell in `index.html`, which paints cream before React mounts. Night on four kinds of page needs:
  - per-route theming;
  - an inline pre-paint script in `index.html` that reads the stored choice and the path;
  - forced light everywhere else.
- **"Follow my phone" would flicker.** It would switch the chrome between dark and light as a reader moves from a care page to a topic page.

**Fix.**

- Size the work XL in two units:
  1. Tokenize the chrome and the four surfaces, with a render test under `html.dark` for those routes only.
  2. Turn on route-scoped Night, with the inline pre-paint script and `theme-color` following it.
- Offer "Follow my phone" only once the whole site has passed the render test.
- State in P6 that the March 12 date covers only the four surfaces.

### 12. The prototype is the build in disguise, and its slip moves every gate into James's busy season (serious)

**Claim.** 9 (twelve screens, "clickable where it matters", at 390 and 1440, two switches), 10.1 U69 (Frame and Platform lanes, M, to James by November 13, his read by November 17, a throwaway branch).

**Problem.** Built on real data and working, the twelve screens contain most of Phase 2:

- the Line and its hinge sheets (U75, U80);
- the verse panel with dialog behavior and Previous and Next verse (U77);
- Compare the witnesses (U80);
- search answering by kind for three queries (U85);
- care cards and an Exit that responds to three presses of Shift (U88);
- table mode, two print previews (U20), and Night on two screens (U89).

M means one to two days. The same lanes start U70 to U73 on November 4, and the branch is thrown away, so the work is done twice.

If James's read slips past about December 12, his answers fall into the December 13 to January 6 window. P1 (U76, U23), D5 (U75), D6 (U31), D8 (U24) and D9 (U84) then all move to January.

**Fix.**

- Cut the prototype to the five screens that carry his decisions:
  1. the hero at 390 and 1440 (P7, D5, D9);
  2. John 1 with the panel at 390 (P1, D4);
  3. the history door with the Line (D5, D6);
  4. the essay with the serif switch (P1, D8);
  5. Tonight in Night (P6).
- Build them as static pages from real data, size the work L, and fix James's read no later than December 4.
- Show the rest as the real units behind a preview flag as they land.

### 13. The four moves on Honest Answers would mean an agent splitting James's published text (minor)

**Claim.** 4.6 ("wherever the data carries them (the Honest Answers through the `answers` validator ...), the answer is set in four labeled moves"), 10.4 U87 ("the four moves as fields and a validator"; Essays, M).

**Problem.** The data does not carry them. `answers.ts` stores `paragraphs: string[]`, and `validate-answers.mjs` checks only that `essaySlug` resolves. Turning 36 answers into four labeled fields is the same agent splitting of James's text that 4.6 forbids for chapter answers. It is writing work, not an M code unit.

**Fix.** U87 ships one page per answer with its paragraphs as written. The four fields are used only where James rewrites an answer (D13). The validator requires all four whenever any one is present.

### 14. The verse sheet cannot be the modal it extends (minor)

**Claim.** 4.3 (on a phone a sheet at about 40 percent "with the chosen verse still visible above it"; Previous and Next verse; drag to full height; "from 1100px ... the right margin"), 6.7 (`Sheet` "changed: detents").

**Problem.**

- **The page behind cannot move.** `Sheet` is a Radix modal: the page behind is inert and held still, so *Previous verse* cannot scroll the page to keep the verse visible.
- **The breakpoints disagree.** `Sheet` turns into a right-hand panel at 1024px, while the desk's margin starts at 1100px. Between those widths the panel covers the text.
- **Detents need no new library.** Hand-rolled drag detents are avoidable, because `vaul`, which has snap points, is already a dependency.

**Fix.** Build the phone panel on `vaul` with snap points at 0.4 and 1. Make it non-modal at the 0.4 detent, scroll the verse into view in code, and make it modal at full height. Give both components one breakpoint, 1100px.

### 15. Catechism numbers are used as keys while U40 is due to renumber them (minor)

**Claim.** 2.2 (`/study/doctrine/q/:n`), 3.5 ("Question 46 of 76"), 4.11 and 5.23 (For Sunday, printed with a QR code), 10.2 U74 (November 27) and U90 (after U40).

**Problem.** The catechism has no id field besides `number`. U40 will remove one of the baptism pair (47 and 61) once James answers. U74 bakes numbers into the week map and printed sheets in November; the de-duplication then shifts or leaves a gap in questions 62 to 76, and "of 76" is wrong after it.

**Fix.** Give each question a stable `id` slug in U74, key the URLs and the week map on it, and compute "of N" from the data.

### 16. Two gates cannot see what they are asked to check (minor)

**Claim.** 4.1 ("`validate-politics.mjs`'s both-directions check runs on every hinge title and arc"), 6.4 and 10.2 U70 (`validate-design.mjs` fails "mustard used as text on light surfaces").

**Problem.**

- **The politics check has no input on a hinge.** The both-directions rule checks `bothWays.right` and `.left` within a 55 percent word band. A hinge titled "Barmen, 1934" has neither, so the check is either vacuous or fails everything.
- **The mustard check cannot see the surface.** An inline `color: var(--mustard)` does not tell a static checker whether it sits on cream or charcoal, and it appears 467 times.

**Fix.**

- Add a `politics: true` flag on arcs and hinges that triggers the `bothWays` shape, and leave the rest unchecked by that rule.
- Write the mustard rule as an allowlist of components on charcoal plus a baseline, with a render test sampling computed colors on the 25 captured routes.

### 17. Committed generated joins will conflict across every lane (minor)

**Claim.** 2.6 (the citation index under `client/public/bible/refs/` "with a `--check` drift gate"; the Guide registry; the week map), 10.1 to 10.4 (five lanes in parallel).

**Problem.** Every content PR in every lane (an essay, a devotion, a plan, a topic, a session) changes the committed verse-to-page files. With five lanes, generated files keyed by verse location conflict on nearly every rebase.

**Fix.** Generate the citation index and the Guide registry in the build, as the sitemap and `llms-full` are, and keep a determinism test in CI rather than a committed `--check`. Alternatively, regenerate only in the integration wave.

### 18. The visible breadcrumb and the prerendered BreadcrumbList disagree (minor)

**Claim.** 2.1 ("a breadcrumb that names its door and room, whatever its URL says").

**Problem.** `prerender-heads.mjs` builds the JSON-LD BreadcrumbList from URL path crumbs. The page would show "Study › Creeds" while the structured data says "Resources › Creeds".

**Fix.** Use the one `nav-map.json` from break 8, read by the app and the prerender alike.

### 19. Route and redirect details (minor)

**Problem.**

- **`/theology/history/timeline` is new, not changed.** 2.2 lists it as "Changed (U31)", but it does not exist yet. Like `/theology/history/twelve`, it is one segment and must be registered before `/theology/history/:slug`, with both names reserved in `validate-history.mjs`'s slug-collision check.
- **`/start-here` would chain.** It 301s to `/start` today (`vercel.json` and `ToStartRedirect`), so folding `/start` to `/topics` makes a two-hop chain unless both are re-pointed.
- **Some counts are stale.** VISION counts "35 Honest Answers" where `answers.ts` holds 36, and "661 `rgba(`" where there are now 691.

**Fix.** Correct 2.2, re-point `/start-here` to `/topics` in the same PR as `/start`, and update the counts.

### 20. The rule for the Tonight row and the fallback for the week band make each other unnecessary (minor)

**Claim.** 1.4 row 20 and 3.5 item 1 ("Its static HTML holds the build week's content; after mount it is replaced from the week map").

**Problem.** Only the hero is prerendered, so the band has no static HTML. If the week map is in the entry chunk, as Tonight's "never from the network" requires, React computes the correct week on its first render and the build-week fallback never shows. If the map is not in the entry chunk, the band waits on a fetch. The specification mixes the two.

**Fix.** Pick one: either a week map in the entry within the budget from break 1 and no fallback, or a lazy band in a reserved box that fills after its chunk loads.

### 21. Week pages and printed QR codes need a retention rule (minor)

**Claim.** 4.11 and 5.23 (`/week/:sunday`, previous and next week, a QR code on the printed page; `noindex, follow`).

**Problem.** The week map keeps a twelve-month forward horizon. The arrows are unbounded, and sheets printed for past weeks carry QR codes to addresses the map may no longer hold. A param route that is not in the sitemap gets the generic head on a direct load.

**Fix.** Keep the past year in the week map. Out-of-range weeks show an honest notice and a link to this week. Add `/week/*` to the prerender as a single `noindex` template head.

---

## What holds, for fairness

- **No API change.** Every surface is static JSON and client code, except the search question in break 4, which the existing server queries already answer. `api-parity.test.ts` is not at risk.
- **No heavy library.** The Line, the plates, Lives as lines and Trace the argument are SVG and `Stepper`. The calendar file, QR codes, detents and dialogs use what is installed. Chart, map, canvas and animation libraries are refused in writing.
- **The verse is a state.** `?v=14&panel=church` gives no thin pages, adds nothing to the prerender and puts no new route on the never-redirected list.
- **The redirect discipline is kept.** Every fold is one hop, paired with the feature that absorbs it, held by `site-structure.test.ts`, and gated by James where the Decision Log protects the route. Nothing under `/theology/history` redirects.
- **The data corrections are real.** 1,033 hard questions, `teach` in 114 chapters, the Polycarp and day-302 errors, the build-time verse going stale between deploys: these checks were done in the repo and change the design.
- **The rebuild comes before the spike.** The order (refactor `StudyBible.tsx` first, then the desk, serially in one lane) is the right shape for an 843-line file. It needs only the calendar fixes in break 6.

## Not verified

No build, Lighthouse run or bundle analysis was run for this attack, and no code was changed. The `dist/` on disk dates from October 27 and was used only for chunk names. The entry-chunk and CSS figures are U18's measurements and the built CSS size on disk. The cost of the proposed Home in kilobytes is an estimate, not a measurement. Source Serif 4's file sizes and licence were not checked. The search shard sizes in break 4 are raw JSON totals and were not compressed. The count of 245 files referencing charcoal includes files whose charcoal is not a page head. The roughly 200-search budget is NOTES' figure. Whether Vercel Web Analytics custom events are enabled on the plan was not checked.
