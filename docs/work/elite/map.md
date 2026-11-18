# Unit map: seven doors, one catalogue, and the Everything page

Branch `elite/map`, from `origin/claude/todo-implementation-hhp4bm` at 3e4469fb. Date: 2026-11-18.

James on 2026-11-18: "I want the tools to be easy to find. I feel like sometimes it gets buried under like long tabs, and it's hard to find or know what's fully on this website." This unit puts the map of PROJECT-PROMPT.md (last section) into the header, the phone menu, the footer, the search shortcuts, and one new page, /explore, "Everything on LiveWell".

## What was built

- **One catalogue.** `client/src/lib/siteCatalog.ts` holds every door, its own page, its rooms (six or fewer), and the pages one tap inside each room: an id, the plain name, one short line, the address, a lucide icon name and, where the repo holds one, a real count. `lib/siteIcons.ts` maps the icon names to lucide components (stroke 1.75). `lib/siteNav.ts` keeps its exports (`SITE_NAV_GROUPS`, `HELP_LINK`, `LIBRARY_LINK`, `SEARCH_SHORTCUTS`, `headerLinks`, `soleHeaderLink`) and now derives them from the catalogue; it adds `EVERYTHING_LINK`.
- **The tools list moved, unchanged.** `TOOLS` and `TOOL_GROUPS` now live in `client/src/lib/toolsList.ts`, byte for byte as they were in `pages/ToolsHub.tsx`. The tools page imports them and re-exports both names, so older importers keep working; `Search.tsx` imports from the new module. /tools itself is not redesigned.
- **The header** (`components/MinimalNav.tsx`, styles in `components/site-nav.css`). Seven doors: Bible, History, Questions, Family, Tools, Essays (a plain link), About, then Find Help, search and Subscribe. Each door opens a panel of its rooms (icon, name, one line) with a foot of two quiet links: "Everything in <door>" (the door's page) and "New here? Start here" (/start). Keyboard: Tab through the bar; Enter or Space opens; Left and Right move between doors (wrapping); Down opens a panel at its first room; Up, Down, Home, End inside it; Up from the first room returns to the door; Escape closes and returns focus to the door; tabbing out of a panel closes it. The doors show from 1024px; below that the menu button opens the phone sheet.
- **The phone sheet.** Full screen under the bar: "New here? Start here" first, then the seven doors as large rows with their icons (Essays a plain link; the others open to their rooms and "Everything in <door>"), then Find Help, My Library, Everything on LiveWell and Subscribe. Find Help and Subscribe also stay in the bar beside the menu button.
- **The footer** (`components/Footer.tsx`). The seven doors, each with its page and rooms (closed rows on a phone), the Substack signup under About, the Follow row, then one line: Find Help · My Library · Everything on LiveWell · Downloads · Privacy · Terms · Accessibility (and the light and dark switch where it exists).
- **/explore, "Everything on LiveWell"** (`pages/Everything.tsx`, `pages/explore.css`). One section per door in the header's order, each under the door's plate from the art kit, every room as a tile (icon, name, line, count), the pages inside each room listed under its tile, every tool once under Tools (in the tools page's five groups, under the catalogue's name where it has one), and the shelf's live sections under Essays. A find box narrows the tiles as you type, counts the matches aloud (a status line), and says so when nothing matches, with a link to search every page. An old `/explore?q=` link opens with its words in the box.
- **Search shortcuts** read the catalogue: Read the Study Bible, Church history, Hard questions, Tonight's devotion, Tools and resources, Essays, Everything on LiveWell, Find Help.
- **Home**: one line only, "See everything on LiveWell" in the doors section's head.

## The map as built

| Door | Its page | Rooms, in order (address) |
|---|---|---|
| Bible | Study the Bible (/study) | Read the Study Bible (/study/bible) · Search the Bible (/study/bible/search) · Guides to reading the Bible (/study/bible/guides) · The Bible's story (/study/bible/story) · Bible background (/resources/context) · Read the Bible in a year (/study/bible/guides/whole-story-2027) |
| History | Church history (/theology/history) | The course (#course) · The timeline (#timeline) · The people (#people) · Creeds and confessions (/resources/creeds) · Christian traditions (/theology/traditions) |
| Questions | Hard questions (/topics) | Honest Answers (/answers) · For skeptics (/skeptic-track) · What Christians believe (/study/bible/doctrines) · Where Christians differ (/theology/compare) · Everyday life (/life) |
| Family | Family (/family) | Tonight's devotion (/family/tonight) · All family devotions (/family/devotions) · The family catechism (/family/catechism) · Family reading plans (/family/reading-plans) |
| Tools | Tools and resources (/tools) | Scripture and theology (/tools#scripture-and-theology) · Help for a decision or a hard day (/tools#help-for-a-decision-or-a-hard-day) · Self-checks (/assessments) · Eight-week plans (/plans) · Small group study guides (/studyguides) · Downloads (/downloads) |
| Essays | Essays (/writing) | A plain link in the header. On /explore: the shelf's sections that have public essays (/writing?section=…) |
| About | About James (/about) | Books (/books) · Speaking (/speaking) · Find James (/connect) · Contact (/contact) · Subscribe (/subscribe) |

One tap inside a room (shown on /explore): Read any verse in context (Bible › Read the Study Bible); The councils and The heresies (History › The course, tab hashes); Timeline of injustice (History › The timeline); the two witnesses pages (History › The people); The creeds in brief, /theology/creeds (History › Creeds); More questions, answered short (/theology/questions) and the ten /faq pages (Questions › Honest Answers); Theology glossary, How to use the doctrine studies, Search the doctrines, creeds and glossary (Questions › What Christians believe); Which view do I lean toward? and the six /compare pages (Questions › Where Christians differ); How-to guides, What the Bible says by subject (/wisdom), Christ and the nation (/nation) (Questions › Everyday life); the four reading paths and the elders' booklets (Tools › Small group study guides); All resources, on one page (Tools › Downloads); the three books (About › Books); the podcast and ENDS, outbound (About › Find James).

Counts shown, each checked against the repo's data by `siteCatalog.test.ts`: 66 books, 24 Bible reading guides, 11 parts of the story, 41 background guides, 36 people, 14 creeds and confessions, 35 Honest Answers, 62 doctrine studies, 69 life guides, 132 how-to guides, 208 Bible subjects, 76 catechism questions, 4 family plans, 12 and 9 tools in the two tool groups, 29 eight-week plans, 68 study guides, 3 books, 40 Find Help pages.

## Planned rooms pointed elsewhere or left out, and why

- **Bible › How to study the Bible**: no page yet. Points at "Guides to reading the Bible" (/study/bible/guides), whose first two groups are "Start here" and "How to read each kind of writing". Add the room when its page is built.
- **Bible › Reading plans** (one page of all plans): no page yet. Points at "Read the Bible in a year" (the 2027 plan). The family plans sit under Family. SITE-MAP 6, row 18, and 10.2 (`/study/bible/plans`) describe the page to build.
- **History › The course, The timeline, People**: no separate pages; each points at its tab on /theology/history by hash (the page already opens a tab from its hash). The tab is named "The people" on the page, so the room is too. A single timeline and a single people list (SITE-MAP rows 15 and 16) wait for James (decision 5).
- **Questions › Hard questions by topic**: left out as a room because it is the door's own page (/topics); the panel's foot "Everything in Questions" opens it.
- **Questions › For skeptics**: /skeptic-track exists ("For Skeptics: Start Here"), so it is listed. The fuller one-page room in SITE-MAP 2 is not built.
- **Tools › Study, Pray and practise, Check yourself, Plans for a hard season, For groups and churches**: named for the page they open, since one name per address is the rule: "Scripture and theology" and "Help for a decision or a hard day" (the tools page's own group names, linked by hash), "Self-checks" (/assessments), "Eight-week plans" (/plans), "Small group study guides" (/studyguides). When the tools are regrouped (now one module, `lib/toolsList.ts`), rename these rooms to the new group names.
- **About › About James**: the door's own page, so not repeated as a room.
- **Family › Tonight, All devotions, The catechism, Reading plans**: built, under the names their pages use (Tonight's devotion, All family devotions, The family catechism, Family reading plans).

## The pages no menu reached (the stock-take's 45), and where each now sits

| Pages | Count | Now |
|---|---|---|
| The ten /faq question pages | 10 | /explore, Questions › Honest Answers |
| /reading-paths/:slug (skeptic, doubt, marriage, parenting) | 1 template, 4 pages | /explore, Tools › Small group study guides (each path is an ordered set of study guides) |
| /roadmap | 1 | Not linked. A page to retire (noindex today). |
| /quiz | 1 | Not linked. `vercel.json` already sends it to /tools/theology-quiz; App.tsx still draws the quiz. A redirect stub is a later unit's (no redirects were added here). |
| Thank-you pages of the three shelf books | 3 | Left unlinked on purpose: Stripe sends a buyer there. |
| Thank-you pages of books off the shelf | 29 | Not linked. Pages to retire, with James (SITE-MAP decision 7). |

Pages that were reached thinly and are now one tap from /explore: /nation, /theology/how-to-use, /life, /skeptic-track, /contact, /theology/creeds, /theology/questions, /theology/which-view, /theology/search, the six /compare pages, /justice/timeline, /justice/witnesses, /disruption/witnesses, /resources/hard-issues-series, /resources.

## Other changes the new shape needed

- **/explore was a redirect to /writing.** Its rule is removed from `vercel.json`, its App.tsx stub replaced by the page, and it is out of `FOLDED` in `site-structure.test.ts`. No other redirect was added or changed.
- Route checklist for /explore: App.tsx; `scripts/generate-sitemap.mjs`; the prerendered head comes from the page's literal `<SEOMeta>`, and `prerender-heads.mjs` adds a body listing of every catalogue entry for crawlers; `client/public/llms.txt` (seven doors, and /explore under Start here); `scripts/build-search-index.mjs` (MAIN_PAGES) and the rebuilt `client/public/search-index.json`. `scripts/lib/site-routes.mjs` reads routes from App.tsx and needed no change.
- `prerender-heads.mjs` read the family links out of `siteNav.ts` as text; it now reads `siteCatalog.ts`. `scripts/site-audit-manifest.mjs` reads the tools from `lib/toolsList.ts` and the nav from the catalogue. `validate-grow-links.mjs` also checks `lib/toolsList.ts`.
- Tests: `lib/siteCatalog.test.ts` (new: seven doors, six or fewer, plates exist, every address a real non-redirect route, one name per address and one address per name, unique ids, known icons, short plain lines with no em-dash or forbidden word, no membership or giving or network, counts true of the data, tool and history hashes real); `lib/siteNav.test.tsx` (rewritten: the seven doors, each panel's rooms and foot, hover then click, the keyboard, the current door, the phone sheet, the footer); `lib/site-structure.test.ts` (tools read from the new module; the catalogue links no redirect; the doors' pages and /explore never redirect); `pages/Everything.test.tsx` (new); `pages/home/home.test.tsx` (the doors section now leads with the /explore link).
- CLAUDE.md: the IA paragraph of the Decision Log, and nothing else.
- In-app links with a hash (`/tools#…`, `/theology/history#…`) go through `lib/followHash.ts`, which tells the page the hash changed and scrolls the part into view once it has loaded.

## What I ran, and what passed

- `pnpm check`: pass.
- All 34 commands of the content-gates step in `.github/workflows/ci.yml`: pass.
- `pnpm test`: before the merge, 128 files passed, 7 skipped; 1,451 tests passed, 73 skipped. After merging the branch's newer work (unit kit-pagehead), `pnpm check`, all 34 content gates and `pnpm test` (129 files passed, 7 skipped; 1,454 tests passed, 73 skipped) pass again (a mid-unit run failed only `home.test.tsx`, which pinned Home's door links; it now expects the /explore link first).
- ESLint (`--max-warnings 0`) on every changed source file: clean.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass ("Every audited page canonicalises to itself, exactly once"); /explore is in the sitemap and prerendered with its own title.
- Served with `scripts/serve-like-vercel.mjs --port 4410`, tRPC stubbed, Playwright (Chromium), day and night (class `dark` on `<html>`): header closed and each of six panels open at 1024, 1280, 1440 (one row of controls at every width, every control 44px high, every panel inside the viewport); phone sheet closed, open, with Questions open, and scrolled to its end at 390x844 (no horizontal scroll, no target under 44px); /explore at 390 and 1440, top, full page, every door section, the find box with "prayer" (4 places) and with nothing matching; the footer at 390 and 1440. Screenshots: `/home/user/elite-shots/map/`. Read and fixed: the panel widened so lines wrap less, the Explore column lined up with the page head, the count label set in the UI face, the door's title put above its plate, and a doubled focus ring on the find box removed.
- Keyboard, by script at 1280: Tab reaches Bible; Right and Left move between doors; Enter opens; Escape closes and returns to the door; Down opens at the first room; Down, End, Home, Up behave; Tab out of the panel closes it; Enter on History › The timeline lands on /theology/history#timeline with the Timeline tab selected. Focus ring: 2px solid.
- First paint: the static masthead bar and the mounted nav are both 70px high at 1280 (no shift).
- Lighthouse (`scripts/lighthouse-median.mjs`) on `/`: performance 98, accessibility 100, best practices 96, SEO 100, CLS 0.000. On `/explore`: performance 92, accessibility 100, CLS 0.000.

## Not verified

- A real phone, Safari, or a screen reader; the sheet's focus and the panel's region roles were checked only by script and tests.
- Touch hover on a tablet between 1024 and 1100px (a tap opens a door as a click does; not tried on a device).
- Lighthouse on any page but `/` and `/explore`; axe was not run separately.
- The hash scroll on /tools after a cold load from outside the site (in-app links were checked; the browser cannot scroll to a part that the app has not drawn yet).

## What waits for James, or for the next unit

1. The names of the Tools rooms follow today's tool groups; when the tools are regrouped (one module now), the rooms take the new group names.
2. Two addresses still share a name on /explore because two pages do the same job: "Theology glossary" (/theology/glossary) and the tools page's "Theology Glossary" (/tools/glossary). SITE-MAP decision 3.
3. Three tools are named differently on /tools than in the catalogue: /resources/context, /wisdom and /theology/passage. The Everything page uses the catalogue's name; /tools keeps its own until it is rebuilt.
4. The search index (`build-search-index.mjs` MAIN_PAGES) still uses its own older titles for main pages ("The Study Bible", "Tools", "Topics: the hard questions"); align them with the catalogue in the search unit.
5. /roadmap, /quiz and the 29 off-shelf thank-you pages: retire or keep (decision 7). No redirect was added.
6. The new /study (unit kit-pagehead, merged after this unit was built) names two of its room cards differently from the catalogue: "Guides to reading it" (catalogue: "Guides to reading the Bible") and "The Bible in a year" (catalogue: "Read the Bible in a year", the name the site already uses on three other pages). One of the two files should change so the names match; the catalogue is the place that feeds the menus.
7. Rooms to add when their pages exist: one page of Bible reading plans, "How to study the Bible", a fuller page for skeptics, a people list and a timeline of their own.
