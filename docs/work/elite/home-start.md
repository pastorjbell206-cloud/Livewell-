# Unit home-start: the front door, and the road for someone new

Branch `elite/home-start` (local, not pushed), from 6cc48594. Audit items: section 4 items 1 and 11, section 9 "Discipleship for an adult", roadmap 9, 13, 19.

## What changed, and why

**Home (`client/src/pages/Home.tsx`, `.home-hero*` in `client/src/index.css`, `scripts/prerender-heads.mjs`).**
- The hero is James's headline and one sentence. The sentence is the last sentence of the paragraph he chose on 2026-10-14 (`HOME_WHY`), word for word, kept as `HOME_LINE` in `client/src/lib/positioning.ts`; a test holds the two together. The second paragraph (who he is) and the portrait are off Home. `/about` still opens with the full paragraph and the photograph.
- "post-Christian" in the headline links to `/topics/living-after-christendom`. A dash in the headline keeps to the word before it (a non-breaking space at render), so no line opens on a dash. His words are unchanged.
- On a 390 x 844 phone the masthead, headline, sentence, Find, tonight's devotion and all the doors end at y = 725 (measured in Chromium). On a phone the doors are names only, two to a row; from 761px each has its line.
- Doors: a line "New here? Start here" (`/start`), then Study the Bible, Church history, Hard questions, Family devotions, Essays, Books. One added sentence under them for group leaders, linking `/studyguides`.
- "Latest writing" (`client/src/pages/home/HomeLatest.tsx`): the five newest public essays with dates, beside the three "Start with these". Dates for shelf essays live only in the database, so the row asks the same listing `/writing` asks (`posts.listPublished` with the shelf input, both runtimes already answer it) and applies `isPublicEssay`. Until it answers, or if it never does, the row shows the rewritten essays from the committed index with their own dates. A post James publishes through the admin appears here on its own.
- The static hero in the prerendered "/" matches the mounted one exactly (same top, bottom and headline height at both sizes, measured on a build).

**/start (`client/src/pages/Start.tsx`, `client/src/lib/startRoad.json`).** "New to faith, or coming back": six steps, one sentence and one link each, all existing pages: John in the Study Bible, Eight Weeks of Learning to Pray, Finding a church, Eight Weeks of Beginnings, the catechism, the New Believers study guide. Then "What next" (seven lines), a line to the church-hurt care page for someone coming back, and the Find Help line. `start.test.tsx` checks every count the copy states against the data files.

**The address `/start` was taken.** It held the "Find Your Path" quiz. The quiz now lives at `/start/quiz` (same page file, canonical updated, in the sitemap), `/start` links to it, and the live links that meant the quiz (Self-checks page, the essay next-steps card, the dashboard, the folded Discipleship and Framework pages) point there. `/start-here` still 301s to `/start`.

**`/pathways/discipleship`** 301s to `/start` (vercel.json, with a stub route in App.tsx before `/pathways/:slug`). Its data file is deleted and the pathways index rebuilt (12 pathways), so the sitemap and prerender no longer list it. Five links to it (four Life domain files and `LifeIndex.tsx`) now go to `/start`.

**Menus (`client/src/lib/siteNav.ts`).** "New to faith? Start here" added to the Study and Topics menus (and so to the footer, twice).

**/study.** One line under the Study Bible's description: "Where should I start? If you've never read the Bible, begin with the Gospel of John, and here is the road after that."

**Route checklist for /start:** App.tsx, sitemap (`generate-sitemap.mjs`), prerender (head from the SEOMeta literals, plus a crawlable list from `startRoad.json`), `llms.txt`. `site-routes.mjs` needed nothing (it reads literal routes from App.tsx).

## What I ran

- `pnpm check`: pass.
- All 33 commands of the content-gates step in ci.yml: pass.
- `pnpm test`: 114 files passed, 7 skipped; 1312 tests passed, 73 skipped (route smoke test included). The first full run had one failure (`server/reading-paths-source.test.ts`, which pins the folded reading path to `/start`); I put that link back and the second full run was clean.
- eslint on the touched source files: clean.
- `pnpm sitemap`, `pnpm build`, `pnpm prerender`, `pnpm audit:canonicals`: 2273 pages checked, 0 failures. `dist/` deleted afterwards.
- Looked at `/`, `/start`, `/study` in Chromium at 390 x 844 and 1440 x 900, and `/` and `/start` in dark mode. Screenshots: `/home/user/elite-shots/home-start/`.

## Not verified

- Lighthouse was not run. The hero lost an image and gained no code, but the entry chunk size was not measured.
- The latest-writing row was seen only with its committed fallback (no database here). The path with real rows is covered by a unit test of `latestFrom`, not by a browser.
- The Vercel redirect itself (only the rule and the client stub were tested).
- The Advent window: from November 22 the tonight line can run to two or three lines on a phone, which would push the last row of doors below the first screen.

## For the merge

- `client/src/lib/siteNav.test.tsx`: I raised the header cap from 7 to 8 for Study. `elite/names-pages` raises the same line to 8 for a different link, so merged it must be 9 (or one link leaves the Study menu).
- `Home.tsx` conflicts lightly with `elite/names-pages` (SEOMeta title), `elite/truth` (books link) and `elite/connect` (newsletter block); I left those lines as they were.
- `HOME_WHO` and `PORTRAIT_URL` stay exported; Home no longer uses them.

## Waits for James

- Which Gospel first. The page says John, as the brief asked. His own eight-week plan for a new Christian has the reader in Mark. Audit decision 20.
- The order of the six steps on `/start`, and whether the catechism (written for families) is what he wants an adult pointed to.
- The one sentence under the headline: I took the last sentence of his paragraph. He may want a different one.
- Whether Home should keep both "Latest writing" and "Start with these".
- Folding the Find Your Path quiz (audit decision 25); it is only moved, not changed.

## Decision Log lines to add

- Home's hero is the headline and one sentence (`HOME_LINE`), no photograph; "post-Christian" links to `/topics/living-after-christendom`. Home's doors: Start here, Study the Bible, Church history, Hard questions, Family devotions, Essays, Books.
- `/start` is the road for a new or returning Christian (steps in `client/src/lib/startRoad.json`). The Find Your Path quiz is at `/start/quiz`. `/pathways/discipleship` 301s to `/start`.
