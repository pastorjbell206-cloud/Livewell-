# names-pages: plain names on the site's own pages

Unit of the 2026-11 elite program. Branch `elite/names-pages`, based on `6cc48594`. Source: `docs/work/audit-2026-11/AUDIT.md` sections 5.1 to 5.4, 5.11, 5.16 to 5.18, section 4 item 9; lens report `titles-pages.md`.

The rule: a page's headline is what a reader would say out loud. The line James wrote for the page sits directly under it. None of his lines was deleted.

## What changed

**Search titles and descriptions**

- Every search title now ends `| LiveWell` (was `| LiveWell by James Bell`). The change is one constant, `TITLE_SUFFIX`, in `client/src/components/SEOMeta.tsx` and `scripts/prerender-heads.mjs`. `og:site_name` still says "LiveWell by James Bell", and a title that already carries his name (About, Books, Essays, Speaking, Contact) takes no ending, as before.
- Descriptions are capped near 155 characters in both head builders (`capDescription`): a longer one is cut back to its last whole sentence that fits, or to a whole word with an ellipsis. In the prerendered build, descriptions over 155 characters went from 506 to 0 across 2,952 pages.
- The 68 study guides send their one-sentence subtitle as the description (the `eyebrow` field already in `client/public/studyguides/index.json`) in place of the whole introduction. No guide file was edited.
- Home has one title and one description in the browser tab, the static `index.html`, and the prerendered head: "Study the Bible, Church History, Family Devotions | LiveWell" and "Learn to follow Jesus in post-Christian America: a free Study Bible with notes on every chapter, church history, family devotions, and honest answers."
- About, Books, Tools, /nation and Essays each have one title in the page file and the prerender table. `client/src/lib/page-titles.test.ts` fails if any of the six drifts apart again, if a curated title runs past 60 characters, or if the two head builders disagree on the ending.
- "Psalm 23", not "Psalms 23", on all 150 psalm chapters: the title, the headline, the verse label, and the prerendered page and its links (`chapterBookName` in `client/src/lib/bible.ts`; `chName` in the prerender).
- Wisdom pages: "What the Bible Says About Anxiety and Worry" (a label that is already a clause keeps its order: "When You Are Afraid: What the Bible Says"). Story pages: "Creation: Part One of the Bible's Story".
- A search title that differs from the page's own headline lives in one file, `client/src/lib/searchTitles.json`, read by the page and by the prerender: two topic pages and seven /nation essays. Their headlines are unchanged.
- Titles over 60 characters in the build went from 1,984 (the audit's count) to 1,443. Of those, 1,148 are Study Bible chapters, where the reference comes first. The other 295 are content titles (essays, study guides, care pages, wisdom labels), which belong to the names-content unit.
- The fallback description no longer states a title or the Pastors Connection Network. The About description no longer states years or a book count.

**Headlines (plain name as H1, his line beneath as `.page-standfirst`)**

/answers, /assessments, /books, /resources/creeds, /studyguides, /theology/history, /study/bible, /tools, /how-tos, /life, /plans, /resources/context, /resources/hard-issues-series, /nation, /nation/policy, /justice/timeline, /justice/witnesses, /disruption/witnesses, /disruption/consistency, /theology/passage, /theology/compare, /theology/search, /theology/how-to-use, /roadmap, /family/catechism (line added under the headline), /family/tonight, the 2027 plan, and the tool pages below. `.page-standfirst` is one small rule appended to `client/src/index.css`; it inherits the section's text color, so it needs no new token and reads the same in dark mode.

**Menu and footer labels** (`client/src/lib/siteNav.ts`, per table 5.2)

Study overview; Bible background; Small group study guides; Compare the views (new, in the header menu); Read the Bible in a year (2027); Hard questions, by topic; Honest answers to hard questions; Eight-week plans for hard seasons; Booklets for elders and church leaders; Family overview; Tonight's family devotion; All family devotions; The family catechism: questions and answers for kids; Family Bible reading plans; Subscribe (was Newsletter); ENDS (training pastors in remote regions). The five doors are unchanged. The Study menu now holds eight links, so the cap in `siteNav.test.tsx` moved from seven to eight.

**Insider words**

"Assessments" to "Self-checks"; "Care plans" to "Eight-week plans"; "Integrated Life · The capstone" to "Christian living"; "The signature library" dropped; "Leader's Toolkits" to "Study guides for groups"; "Prophetic Disruption / Prophetic Justice" and "Theological Depth" out of titles; "Find Your Path" to "Where to Start on LiveWell"; "apologetics" and "in the New City Catechism tradition" off the Family page; "The oldest classroom" label dropped; "The season" to "Devotions for this season" (the two sets shown change with the date, so the heading names no season); "Marriage health assessment ... diagnostic" to the tool's own name; "The family room" to "For families"; "READ / WORK A STUDY" shelf labels to "Reading / Study guides"; context sections lead with the plain name ("The world of the Old Testament (Ancient Near East)"); the two "witnesses" rows on /study named for who they are; "Get the reading path (PDF)" to "Download the reading list (PDF)"; the Subscribe form heading is "Subscribe" and its description no longer promises reading paths.

**Tools** (`client/src/pages/ToolsHub.tsx` and the tool pages; no address changed)

Twenty tool names per table 5.11, three plain section names, and tiles that say "Read" or "Start" in place of "Open the tool". Every tool page has a search title under 60 characters; the five double hyphens are gone. Headlines changed on Which Lens, Wisdom Finder, Prayer Generator, Bible Study, Scripture Memory, Life Audit, Quotes, Deep Bible and the Connection Planner, whose second (print-only) H1 is now a paragraph.

## Files

`client/src/components/SEOMeta.tsx`, `scripts/prerender-heads.mjs`, `client/index.html`, `client/src/lib/positioning.ts`, `client/src/lib/bible.ts`, `client/src/lib/searchTitles.json` (new), `client/src/lib/page-titles.test.ts` (new), `client/src/lib/siteNav.ts`, `client/src/lib/siteNav.test.tsx`, `client/src/lib/myProgress.ts`, `client/src/index.css`, `client/src/components/SubjectShelf.tsx`, `client/public/llms.txt`, and about ninety page files under `client/src/pages/` (one to four lines each).

Shared files touched: `client/src/lib/siteNav.ts` (labels in place, one line added), `client/src/index.css` (one rule appended at the end), `scripts/prerender-heads.mjs`, `client/public/llms.txt` (two labels), `client/index.html` (title and description lines). Not touched: `App.tsx`, `vercel.json`.

## What I ran

- `pnpm check`: passed.
- The whole content-gates step from `.github/workflows/ci.yml` (33 commands, the drift checks included): all passed. The nine a later edit could touch were run again after it: passed.
- `pnpm test` once, in full: 114 files passed, 7 skipped (database tests), 1,319 tests passed. After that run I changed six small things (three plan labels, two lines in llms.txt, the /roadmap and /theology/how-to-use headlines) and re-ran `client/src/lib`, `client/src/test` (the route smoke net) and the plan page test: 33 files, 326 tests, passed.
- `pnpm build`, `pnpm sitemap`, `pnpm prerender`, `pnpm audit:canonicals`: passed, 0 failures. `dist/` deleted afterwards.
- `eslint --max-warnings 0` on every touched file: 0 errors, 14 warnings. All 14 are in lines this unit did not change (`any` types, an unused import). `prerender-heads.mjs` is in the ignore list.
- Looked at 40 pages in Chromium at 390x844 and 1440x900 from the built site, with the four header menus open on desktop and the phone menu open. No page scrolls sideways. Dark mode checked on three pages with the new standfirst. Screenshots: `/home/user/elite-shots/names-pages/`.

## Not verified

- Anything that needs the database: essay pages and the quiz questions did not load locally.
- How the new titles read in a real search result. The 60 and 155 limits are the audit's working rule.
- Lighthouse and axe were not run.

## Skipped, and why

- Footer "Read James on Substack", "Follow James on Facebook", and the footer line under the name: the Connect unit owns the first two; the one line for the site is James's choice (decision 12).
- The Pastors Connection Network link in the About menu group, and the PCN label and gift sentence on the Hard Issues page: left for the unit that takes PCN off the site. I took PCN out of that page's search title and description only.
- /membership: the page is coming down.
- Folding /theology/questions, /theology/creeds, the second glossary and the second quiz address: those are redirects and page merges, and the tool addresses need James's yes (decision 25).
- The search page filters (ALL / ARTICLES / RESOURCES).
- The About page body, its section heading "The church, the network, and the ends of the earth", and the facts in its structured data and in `personSchema`: facts about James wait for his word.
- Names stored in content files: the 72 devotion titles, the eight-week plan titles, the church history eras, "a Discipleship Table" in the how-tos. The names-content unit has these.
- Dropping the ending altogether on Bible chapters. They end `| LiveWell` like every other page.
- "Tonight at the table" on the Home line and the Family card: left as his phrase (decision 17). The menu, the search shortcut and the page itself say "Tonight's family devotion".
- Tool names repeated outside the tools page (rows on /resources and /assessments, the topics rows, the care pages) still use the old names in places.
- The /dashboard greeting headline.

## Waits for James

- Seven /nation essays have a plainer search title than their headline (for example "Was Old Testament Israel a Theocracy?" for "What an Old Testament Theocracy Actually Was"). Each is one line in `client/src/lib/searchTitles.json`; delete a line to go back.
- The tool names in table 5.11 are the audit's wording, not his. Each is one line in `ToolsHub.tsx`.
- "Honest answers ... from a pastor who was an atheist first" is in the /answers description, as it was before.
- Whether the door stays "Topics" (decision 16) and whether "the table" is a phrase he wants taught (decision 17).

## Decision Log lines to add

- **Titles (2026-11-17)**: search titles end `| LiveWell`; `og:site_name` keeps the full name. Descriptions are capped near 155 characters by `capDescription` in `SEOMeta.tsx` and `prerender-heads.mjs`. A hub page's H1 is its plain name, and James's line sits under it as `.page-standfirst`. A search title that differs from a page's headline goes in `client/src/lib/searchTitles.json`. `client/src/lib/page-titles.test.ts` holds the six curated titles equal in the page and the prerender.
- **Menu labels (2026-11-17)**: the plain labels of audit table 5.2 are in `siteNav.ts`; "Compare the views" is in the Study menu, which now holds eight links.
