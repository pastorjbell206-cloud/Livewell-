# Elite unit: the family table

Branch `elite/family`, worktree `/home/user/wt/family`, from `6cc48594`. Not pushed.
Source: AUDIT.md section 4 item 10, section 9 (F1 to F19), roadmap items 17 and 26, the Step 2 "Family" line; lens report `family-discipleship.md`.

## What changed, and why

1. **The second night (F3).** Tonight used to be worked out from the calendar alone, so all seven nights of an ordinary week returned the same devotion and the same Start button. `doneThisWeek` (lib/familyTable.ts) now asks whether this device has the week's devotion marked done between Sunday and tonight. When it has, the card on `/family` reads "Done this week", says when the next one comes ("comes Sunday", or "comes tomorrow" inside a daily set, from `nextNewNight`), and offers three rows from what already exists: the family's catechism question, today's day in a reading plan the family has started (or "Start a reading plan"), and the week's passage to say again. `/family/tonight` no longer redirects into the same devotion once it is done; it stays and shows the same card. The devotion page and table mode's "Done for tonight" screen each gained a link to it. The week after, tonight is tonight again.
2. **A family's own place in the catechism (F4).** New families saw the calendar's question (47 this week). A family now starts at question 1 and moves on when it taps "We learned it. Next question"; the place is kept on the device (`livewell-progress-family-catechism-place-v1`, through lib/storage). "Go back one" and "Make this our question" (on any question) move it by hand. A household learning with a church can "follow the calendar's question instead", and switch back without losing its place. `/family` ("This week"), the devotion's Remember step and table mode all ask the family's question now, labelled "Your family's question" or "This week's question" truthfully. No catechism answer or doctrine wording was touched.
3. **"A devotion for tonight" (Step 2).** On `/family`, under tonight's card: how old the kids are, how long there is, what is going on tonight, then one weekly devotion and "Start at the table". Three taps. Ages and minutes are kept on the device (`livewell-progress-family-chooser-v1`), so the next night is one tap; what is going on tonight is never kept. The ages also set whose questions the Ask step shows (the existing Younger/Older/Together choice). "About five minutes" points the family at the first of the existing three short nights (Read and Talk). It replaces nothing: tonight's calendar devotion is untouched, and "An ordinary night" simply returns it. Every devotion it can offer is one of the 72 (a test holds each id to the index).
4. **Advent's first nights (F10, roadmap 26).** Advent 2026 begins Sunday November 29; the set's day 1 is labelled "December 1". On nights a daily set serves but does not cover (Nov 29 and 30; Dec 26; the Friday and Saturday after Thanksgiving) the heading now reads "Day 1" (or "Day 25", "Day 7") in place of a date that is not tonight (`nightLabel`). December 1 itself still reads "December 1".
5. **The Bible text in the seasons (F5).** The 40 days of Advent, Holy Week and Thanksgiving held a retelling with the notice "The wording here is a paraphrase". The family index now carries each day's passage word for word from the site's own Berean Standard Bible data (`bsbReading` in scripts/lib/family-index.mjs; the index's `--check` gate covers it). The page and table mode show the Bible text, named ("Scripture quoted from the Berean Standard Bible"), and the retelling sits under it labelled "In other words (a retelling, not a quotation)", the same arrangement the printed booklets already use. All 40 references resolved to a clean passage. If a future day's reference does not, that day keeps its retelling and the paraphrase notice.
6. **Reading plans that know today (F16).** Each plan has "Start today". Once started, the page opens on "Today's reading": the plan, "Day 6 of 30", the passage and prompt, "We read it", a daily Remind me in the family's own calendar, and "Stop this plan". If earlier days are not ticked it says so without counting how far behind anyone is and offers "Make today day 3", which only moves the start date. Today's row is marked in the open list. Start dates are kept on the device (`livewell-progress-family-plan-starts-v1`); the ticks stay in their old key. The page also links "Read the whole story in 2027".
7. **`/family` itself (F7, F8, F13, F14; roadmap 17).** A card near the top for "How do we hand the faith to our kids in a secular age?" (its own title and description). A "How to" shelf in four groups (never done this, a child who won't sit still, a teenager, a spouse who doesn't believe), eleven links, every one to a piece that exists, under its own title. The teen section rebuilt from what exists: the Older questions on every devotion, the Parent and Teen Conversation, the two how-to guides, the builder's teen band, and the answers page. The catechism card lost "in the New City Catechism tradition" for a plain sentence. "Start" on tonight's card reads "Start tonight's devotion" (audit 5.12). The machine-sorted "Everything on this" shelf came off the foot of the page: it filed "Is 2 Chronicles 7:14 a Promise to America?" as family reading, and the hand-picked Parenting, Marriage and Tools sections already carry the pieces about the home. Feature cards got narrower padding on phones. Section backgrounds were re-alternated so no three in a row match.

## Files

New: `client/src/lib/familyPlans.ts`, `client/src/lib/familyChooser.ts`, `client/src/lib/familyNights.test.ts`, `client/src/pages/family/DoneThisWeek.tsx`, `client/src/pages/family/TonightChooser.tsx`, `client/src/pages/family/second-night.test.tsx`.

Changed: `client/src/lib/familyTable.ts`, `client/src/lib/familyCatechism.ts`, `client/src/pages/Family.tsx`, `client/src/pages/FamilyCatechism.tsx`, `client/src/pages/FamilyReadingPlans.tsx`, `client/src/pages/family/{DevotionPage,DevotionParts,TableMode,Tonight,TonightCard,useFamilyData}.tsx/.ts`, `scripts/lib/family-index.mjs`, `scripts/validate-family.mjs` (one comment), `client/public/family/index.json` (regenerated: a `bsb` field on the 40 seasonal rows), and the tests `client/src/pages/family/table.test.tsx`, `client/src/pages/family-pages.test.tsx`, `client/src/pages/advent-ready.test.tsx`, `client/src/components/VerseRef.test.tsx`, `server/family-index.test.ts`.

Shared files touched: none (no edit to App.tsx, siteNav.ts, index.css, prerender-heads.mjs, vercel.json or llms.txt). No new route, no new CSS class, no hex value; the new pieces reuse the `.tb-` and `.pg-action` classes. No API procedure changed.

## What I ran, and what passed

- `pnpm check`: passed.
- The whole content-gates step from `.github/workflows/ci.yml` (all 33 commands, including `validate-family`, `build-family-year.mjs --check`, `build-family-index.mjs --check`, `validate-design`, `validate-no-emdash`, `validate-links`, `validate-scripture`, `validate-grow-voice`): all 33 exited 0, run twice (after the main commit and after the last edits).
- `pnpm test` (once, in full, after the last code change): 115 files passed, 7 skipped; 1,333 tests passed, 73 skipped (the skips are the DB-gated suites). The first full run had one failure, in `VerseRef.test.tsx` (a family at question 1 now has that question open in two cards); the test was corrected and the full run repeated.
- `pnpm exec eslint --max-warnings 0` on every source and test file touched: clean. (`scripts/` is outside the ESLint config.)
- `pnpm build`: passed; `dist/` deleted afterwards.
- Looked at in Chromium at 390x844 and 1440x900 against the vite dev server with `/api/trpc/*` stubbed and the clock set: `/family` fresh, done-this-week (light and dark), the chooser answered (light and dark), `/family/tonight` done, `/family/catechism` (own place, after "Next question", following the calendar, dark), `/family/reading-plans` (fresh, started, started dark, finished), `/family/devotions/advent-1` on 2026-11-29, `/family` on 2026-11-29, `/family/devotions/advent-9` on its day (page, table mode, dark), a weekly devotion done tonight. No page errors and no horizontal overflow on any. Fixed from what I saw: 48px card padding squeezing the text on a phone; two buttons that did the same thing on a finished plan. Screenshots: `/home/user/elite-shots/family/` (40 files).

## What I did not verify

- The canonical audit step (`pnpm sitemap`, `pnpm prerender`, `audit:canonicals`) was not run: no route, title or description changed.
- The Listen button's voice on the new Bible text, and printing a seasonal day (the page still prints; I did not look at the printed sheet with the extra "In other words" lines).
- The PDFs (made in the Vercel build) are untouched and were not rebuilt.
- Not every screenshot was read. Read at full size: `/family` done-this-week (phone, desktop dark), the chooser answered (phone), the How to shelf (phone), the catechism and devotions cards (desktop), the teen section (phone), the catechism page (phone own place, desktop following the calendar), reading plans started (phone) and finished (phone, desktop), Advent day 1 on November 29 (phone, page and `/family`), Advent day 9 in table mode (phone), a weekly devotion done (phone). The rest, including the catechism and reading plans in dark mode and most desktop captures, were covered only by the page-error and overflow checks.
- Real devices, and Safari.

## Skipped, with the reason

- **F2, a "Little ones (3 to 6)" line on 72 devotions.** New writing in James's voice, 62 sets. Not attempted.
- **F9, the family pages in search.** The search index belongs to the search unit (roadmap 16).
- **F11, Lent, Easter week, Pentecost sets.** New writing.
- **F12, printable catechism booklet, cards, plan charts.** Not attempted; needs the PDF builder.
- **F15, "I'm a parent" on Subscribe; F17, leader and participant split on study guides; F18, a "For your church" page; F19, more kinds of home named.** Outside the seven items of this unit; F18 and F19 also need new copy from James.
- **F6, one wording for children.** His decision; the list is below.
- **Sentence-case devotion titles, the near-twin titles, renaming the two reading plans (audit 5.12), and the `/family` browser title.** Left for the titles unit, which owns those lines.
- The second, simpler question per seasonal day (part of F5): new writing.

## Waiting for James

1. **The doubled catechism questions (decision 22).** Untouched. 8 and 64 "Why did God make you?"; 11 and 56 "What does God require of us?"; 21 and 58 "Can we keep God's law perfectly?"; 47 and 61 "What is baptism?"; 48 and 62 "What is the Lord's Supper?". A family going in order from question 1 will now meet each second asking as a repeat. `KNOWN_CATECHISM_REPEATS` in `scripts/validate-family.mjs` still lists the five pairs.
2. **The baptism and Lord's Supper wording** ("the sign God gives to mark his people", "members of God's covenant family", "we feed on him by faith"): untouched.
3. **One Bible wording for children.** Where each wording appears on the family path today:
   - Berean Standard Bible: the 72 weekly devotions (`family-devotions.json`, `family-devotions-2.json`), the catechism's verses (`family-catechism.json`), the seasonal booklets, and now the on-screen passage of all 40 seasonal days. Six of the 68 study guides declare BSB.
   - Our own retelling (paraphrase): `family-seasonal.json` `passageText`, now shown under the Bible text as "In other words".
   - King James Version: the Family Devotion Builder, `/tools/family-devotions` (all ten themes, including the ages 3 to 6 band).
   - ESV wording, by the audit reviewer's reading, not confirmed: the memory verse in `/studyguides/raising-believers` ("For this child I prayed, and the Lord has granted me my petition", 1 Samuel 1:27). 62 of the 68 study guides name no translation.
   - Not checked against one translation ("unverified" on the page): `/tools/parenting-verses` and `/tools/scripture-memory`.
4. **A new family now starts the catechism at question 1, and Remember in every devotion asks the family's own question.** This follows the audit's recommendation and is reversible (one default in `lib/familyCatechism.ts`).
5. **The retelling stays on screen under the Bible text.** If he wants the Bible text alone, it is one block in `DevotionParts.tsx`.
6. **The chooser's lists** (which devotions answer "there was a fight", "someone is sad", and so on) are in `lib/familyChooser.ts`, four devotions or fewer per night. He may want to choose them himself.
7. **The "Everything on this · Home and family life" shelf is off `/family`.** It still shows on the other pages that use it.
8. The teen section says the answers "were written for adults, so read them together." If he would rather not say that, it is one line in `Family.tsx`.

## Decision Log lines to add

- **Family, 2026-11-17 (audit build).** Tonight is the calendar's devotion until this device has it marked done in the current week (Sunday to Saturday); after that `/family` and `/family/tonight` show "Done this week" and the rest of the week (catechism question, reading plan day, the week's passage). A family has its own place in the catechism, from question 1, kept on the device (`livewell-progress-family-catechism-place-v1`); the calendar's weekly question is an opt-in. Days of the daily sets show the Berean Standard Bible from the family index (`bsb`, built by `scripts/lib/family-index.mjs`), with the set's retelling under it marked as a retelling. Reading plans are started on a date (`livewell-progress-family-plan-starts-v1`) and open on today's reading. "A devotion for tonight" on `/family` chooses among the 72 weekly devotions (`lib/familyChooser.ts`, `livewell-progress-family-chooser-v1`). A night a daily set serves but does not cover is headed "Day N", not a date.
