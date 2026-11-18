# Wave 3 review: correctness at the seams

Reviewer lens: where two units meet (shared files, data shapes, generated
files, validators, routes, nav, search sources, storage keys), what one unit
broke for another, edge cases (dates, empty data, hidden flags), and anything
the integrator resolved by dropping a feature.

Branch `claude/todo-implementation-hhp4bm`, worktree `/home/user/livewell-integrate`
at `aa31178a` (read-only). Diff reviewed: `git diff origin/main...HEAD -- . ':!docs/work'`
(121 files). The pull at `aa31178a` touched only `docs/work` (checked:
`git diff --stat 37a679c4 aa31178a -- . ':!docs/work'` is empty).

## Verdict

No blocker and no major. Every seam the integrator names holds, in the
committed state (the world strand hidden) and in a simulated publish (the
world strand live). Four minor findings, all latent or gaps rather than
breakage today: a year-map promise that is false for a pin after the rotation
epoch, a search index that will never list a live strand's devotions, a
dropped U18 follow-up (Continue and the 2027 plan), and a plan page no search
reaches.

## What I ran (seen)

Committed tree (`/home/user/livewell-integrate`, left clean: `git status` empty after):

- All 33 commands of CI's content-gates step: 33 of 33 exit 0.
  `validate-family`: 74 devotions, "2 of them hidden until their strand goes
  live". `build-family-year --check`: up to date, two notes for the waiting
  pins (2026-11-08, 2026-11-15). `validate-politics`: "1 politics topic page"
  and "2 family politics devotions". `build-search-index --check`: 397 entries.
  `build-story-plan --check`: 365 days. `verify-sources`: 22 texts.
- `pnpm check`: exit 0.
- `pnpm test`: 113 files passed, 7 skipped (the DB-backed server suites);
  1,303 tests passed, 73 skipped. The wave-3 files among them: siteNav 22,
  site-structure 16, table-two 13, topics 13, familyTable 17, world 7,
  StudyBibleYear 10, home 16, storyPlan 14, family-world 18, history-sources
  18, family-index 11, topics-gate 12, posts-listing 12.
- `npx eslint --max-warnings 0` on the seam files: the only warnings are three
  in `server/routers.ts` that predate this wave (unused
  `createAdminNotification`, two `any`), none on a changed line.

Simulated publish (a `git archive` copy of HEAD in the scratchpad; the four
steps in `scripts/lib/family-devotion-file.mjs`):

- `"live": true`, `validate-family --freeze`, `build-family-index`,
  `build-family-year`. Changed: the world file, `family/index.json` (two rows
  with U21's grown-ups line to `/help/politics`, titled "Politics is tearing my
  family apart", and a `strands` entry `world · 2`), the year map (only
  2026-11-08 and 2026-11-15 change, now pinned, and one title added to
  `FAMILY_TITLES`), and the freeze file.
- Gates after: validate-family, both `--check`s, validate-politics,
  validate-links, `build-search-index --check`, validate-catalogue,
  validate-topics, validate-design: all clean.
- Full `pnpm test` in that copy: 113 passed, 7 skipped; 1,303 passed.
- `pnpm run sitemap && pnpm build && pnpm run prerender && pnpm run audit:canonicals`:
  2,953 route files, 2,270 sitemap URLs, 0 not prerendered, 0 failures.
  `/family/devotions/grown-ups-voted-differently/` prerenders with its own
  title; `/topics` and `/study/bible/guides/whole-story-2027` canonicalise to
  themselves.

## Seams checked and clean

- **U11 and U21, family index.** U21's `STRANDS` loop reads every file through
  `devotionsIn` and keeps a hidden strand out entirely; U11's dropped
  `STRAND_FILES` loop did nothing U21's does not (numbering within the strand,
  the `strands` entry, rows only when live), and U21's adds the grown-ups
  title. Not a dropped feature.
- **U11 and U21, client.** `familyTable.ts` keeps U11's `strandOf`/`placeOf`
  branch and U21's `FamilyShelf`; `FamilyDevotions.tsx` builds tabs from
  `index.strands`, so a hidden strand has no tab and `?tab=world` falls to
  Foundations; `DevotionPage` neighbours stay within a strand; `TalkPart`
  shows U11's two sides; `devotionFrom` reads `{ live, devotions }` files.
- **U11 and U18, year map.** `loadInputs` reads every devotion file through
  `devotionsIn`, keeps hidden ids apart for waiting pins, and records hidden
  titles, but `buildYearMap` writes a title only for ids on the map, so the
  committed `familyYear.generated.ts` holds no hidden title. Going live adds
  the one pinned title, and Home's tonight line names it from the map alone.
- **U11, U25, validate-politics.** Both checks run and report; the topic gate
  uses the file's short word list, but `validate-topics` applies the full
  Forbidden Language list to the same pages.
- **U19, U25, U28, nav and routes.** `/topics`, `/topics/:slug` and
  `/study/bible/guides/whole-story-2027` are routed (the plan before
  `/study/bible/guides/:id`), in the sitemap, prerendered, and none is a
  redirect source. All 40 hrefs in `siteNav.ts` and all Home door hrefs
  checked against `vercel.json` sources: none redirects. `currentDoor` picks the
  longest matching header link, so `/resources/creeds` reads as Study and
  `/resources` as Topics. `AWAITING_ITS_PAGE` is gone.
- **U18 and U25, Home doors.** Five doors in the order the test expects; the
  Hard questions note is `Topics.tsx`'s SEO description word for word.
- **U21 and U25, search.** `build-search-index` now sends a devotion to
  `/family/devotions/<id>`; every Foundations id has an index row and a page.
  Topics are a search source through `LIBRARY_SOURCES` with `askedAs` as
  keywords. `/explore` (the other `LIBRARY_SOURCES` consumer) redirects to
  `/writing`, so the catalogue not listing topics is not a gap.
- **U29.** Both runtimes apply the same `{ slugs, since }` rule; prod unwraps
  `{ "0": { json } }` before `pickListing`; every other `posts.listPublished`
  caller passes no input and gets the full listing as before.
- **Storage keys.** `livewell-progress-story-2027` (U28),
  `livewell-progress-family-v1` with its `band` (U17, unchanged shape),
  `lw-plan-*` and the self-check drafts (U18): no collisions, and nothing
  scans the `livewell-progress-` prefix.
- **U07.** The corpus sits under `scripts/data/history-sources/` with
  `texts/** -text` and a `.prettierignore` line; no validator, lint or build
  step reads it besides `verify-sources`.
- **llms.txt.** Sorted-line diff against main: only the five-doors sentence,
  the section headings, and U25's and U28's own entries differ.

## Findings

### 1. minor: going live with a pin after the rotation epoch reshuffles every later week

`scripts/lib/family-devotion-file.mjs` (lines 24 to 26) promises: "On the
year map, going live changes only the weeks pinned to the strand's devotions;
every other week keeps its devotion." That holds only for pins before
`ROTATION_EPOCH` (2026-11-29). In `scripts/lib/family-year.mjs`, a waiting
pin's week has `pinned` undefined, so `rotates: !set && !pinned` (line 248) is
true and it takes a rotation slot (line 253, `slot.set(i, n++)`). Once the
strand is live the week is `pinned`, takes no slot, and every rotating week
after it moves up one devotion.

Evidence: in the scratch copy I added
`{ "week": "2027-01-17", "devotion": "grown-ups-voted-differently" }` to the
overrides, built the map hidden, set `live: true` and rebuilt: 230 week lines
changed: the two committed pre-epoch pins, the new pin itself, and every
rotating week after it through 2031-11-16 (227 more). `server/family-world.test.ts` line 249 ("pins the two weeks
after the vote, and changes no other week") covers only the committed
pre-epoch pins. Today's data is safe; the next strand pin after November 29
(the church strand is planned) is not.

Fix: make a waiting week count like a pinned week for slot numbering after the
epoch (serve it the slot's devotion without advancing the counter, accepting
one repeat while it waits), or have `readOverrides` refuse a waiting pin at or
after the epoch; then add a test that a post-epoch pin going live changes
only its own week, and correct the comment either way.

### 2. minor: a live strand's devotions never reach search

`scripts/build-search-index.mjs` `devotions()` (lines 77 to 78) reads only
`family-devotions.json` and `family-devotions-2.json`. After the simulated
publish, the two world devotions had pages, sitemap entries, prerendered heads
and a library tab, but `build-search-index --check` still reported "up to date
(397 entries)": nothing lists them, and nothing fails. The four publish steps
in `family-devotion-file.mjs` do not mention the search index, so no step
would add them later either.

Fix: build `devotions()` from the live weekly rows (the index's
`kind: "weekly"` rows, or each `STRANDS` file through `devotionsIn` with its
`live` flag), and add `pnpm exec tsx scripts/build-search-index.mjs` as a
fifth publish step so CI's `--check` catches the drift.

### 3. minor: U18's flagged follow-up for U28 was dropped

U18's unit file (`docs/work/plan/units/U18.md`, "After U28 merges") names two
things: `myProgress.ts` now imports `lib/storyPlan` into Home's entry chunk,
and Continue could offer "Read the whole story in 2027". Neither is in the
integrator's done follow-ups or the seams commit. `continueHere()`
(`client/src/lib/myProgress.ts` line 168) still looks only at `lw-plan-*` and
the self-check drafts, while `collectProgress()` in the same file shows the
plan in My Library. In the scratch build the plan module sits in the entry
chunk (`dist/public/assets/index-*.js` holds `whole-story-2027.json`), so
Home pays for it without using it.

Fix: either have Continue offer the plan when `readPlanDays()` has a place
(the stored list carries no date, so ranking it against the dated items needs a
`savedAt` in storage or a fixed rule), or record the choice not to; if not,
move `collectProgress`'s plan row behind a dynamic import or split
`continueHere` into its own module so Home stops importing `storyPlan`.

### 4. minor: no search source lists the 2027 plan

Home's Find sends anything that is not a reference to `/search`. `/search`
reads `LIBRARY_SOURCES`, `search-index.json`, the tools and the essays; none
holds `/study/bible/guides/whole-story-2027` (grep: 0 in `search-index.json`,
`ToolsHub.tsx`, `catalog.ts`, `siteSearch.ts`). "Bible in a year" or "reading
plan" never reaches the plan, though it is now a Study menu link. Other Study
Bible pages (story, guides, doctrines) are not searchable either, so this
follows an existing pattern rather than breaking one.

Fix: add the plan (and, while there, the story and guides hubs) to
`build-search-index.mjs` as a small static source with keywords such as
"bible in a year", "reading plan", "chronological".

## Notes (not findings)

- `scripts/lib/family-index.mjs` line 66 still says "Topic pages join once
  they exist (U25)". They exist now; U21's deferred step (teach
  `grownupsTarget` `/topics/<slug>`) is still open. No devotion needs it yet.
- In the merged `FamilyDevotions.tsx` the world list's accessible name is
  "The world we live in devotions" (U11 had "The world we live in"); the
  integrator updated U11's test to match. It is only an `aria-label`.
- CLAUDE.md's CI section still lists 24 validators; the step now runs 33
  commands, including this wave's topics index check, `validate-topics`,
  `build-story-plan --check` and `verify-sources` (the drift began before
  this wave).
- The merge commit `aa31178a` carries git's default message without the
  session trailers, as the integrator reported.

## Not verified

- No browser pass: the five-door Home at 390 and 1440, the seven-link Study
  menu, and printing a politics devotion (U11's two sides on top of U21's
  side-by-side bands under the one-page print rule).
- Lighthouse, axe, a Vercel preview, and the production function against a real
  database for U29's narrowed listing.
