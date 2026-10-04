# The next session: seven steps, in order

Paste everything below the line into a fresh Claude Code session on this repository. It is written to stand alone. Where a step needs a decision only James can make, the prompt says exactly when to stop and what to ask, and gives the default if he has already answered.

---

You are working in the LiveWell by James Bell repository (`livewellbyjamesbell.co`). Read `CLAUDE.md` top to bottom before the first edit, then `docs/ARCHITECTURE.md`, `docs/EDITORIAL-CONSTITUTION.md` and `docs/VOICE-JAMES-BELL.md`. Those four files govern everything you do here. Then read `docs/WORLD-CLASS-AUDIT.md` (the re-graded scorecard and "What James does to reach A+"), which is where the seven steps below come from.

Work on branch `claude/next-seven` from the latest `main`. Push after every step, keep one draft pull request open for the branch, and update its description as each step lands. Do not push to any other branch.

## Standing rules for the whole session

1. **Never fabricate.** No invented quotes, dates, scholars, studies, Facebook posts or sentences in James's name. If a fact cannot be verified from the repository or from something James supplies, leave it out and say so.
2. **Voice is governed, not improvised.** Anything a reader sees follows `docs/VOICE-JAMES-BELL.md` and the Forbidden Language list in `CLAUDE.md`. No exclamation marks outside verbatim Scripture. Prose, not bullet sludge.
3. **Two runtimes.** Any API procedure exists in both `server/` (dev) and `api/index.ts` (prod) or it does not exist; `server/api-parity.test.ts` enforces this.
4. **Stateful operations stop first.** Anything that writes to the production database, calls a `/api/admin/*` one-shot endpoint, changes auth, or cannot be undone with `git revert`: describe exactly what will run and wait for James to say go. A draft, a script that prints a plan, or a dry run does not need permission; executing it does.
5. **Verify before "done."** Every step ends with `pnpm check`, `pnpm test`, the content validators listed in `.github/workflows/ci.yml`, and `pnpm build && pnpm run prerender`, watched, not assumed. Report what passed and what you did not run.
6. **Minimal blast radius.** Touch only what the step needs. No reformatting, renaming or "while I was here" changes. Styling goes through the `:root` tokens in `client/src/index.css`, never hardcoded hex.
7. **One decision at a time.** When a step needs James, ask one clear question with a recommended default, then stop. Do not bundle three questions into one message, and do not proceed on an assumption where the wrong assumption would publish content or change money.

Do the steps in this order. Finish each one, including its gates and its commit, before starting the next.

## Step 1. The rewrites, and then the 59 survey essays

**Goal.** Get James's yes or no on the three rewritten openings, and if yes, give the 59 survey essays the same treatment so the writing grade reaches A.

**Where.** `docs/audit-voice/rewrites-for-review.md` (the three drafts, each with the original beside it); `docs/audit-voice/machine-tells.md` (the list of the 59 first-person survey essays and why they read as summaries); `scripts/voice-tells.mjs` (the scanner); `content/voice-edits-library.json` and `scripts/apply-library-voice-edits.mjs` (exact-match edits applied to every copy of an essay in the library); `content/static-library.generated.json` (the library; `pnpm run essays:public` rebuilds `client/public/essays/`).

**Do.**
- Present the three rewrites to James as three short before-and-after pairs, verbatim from the file, and ask for a yes, a no, or a note on each. Stop and wait. If he has already answered in this conversation, use that answer.
- For each yes: apply the rewrite through the edits file and the applier, never by hand-editing the library or a database row, so every copy stays consistent. Rerun the scanner and the `validate-no-emdash` and `validate-content-integrity` validators.
- For each no: leave the essay as it is and record the no in the review file so nobody proposes it again.
- If at least two of the three are a yes: draft the same treatment for the 59 survey essays, five at a time, as before-and-after pairs in a new file `docs/audit-voice/survey-rewrites-batch-N.md`. Each rewrite touches only the opening movement (the first two or three paragraphs) unless the essay's whole spine is a summary, in which case say so and propose the essay for a full rewrite by James rather than by you. Every draft passes the Revision Pass in `CLAUDE.md` and the Formation Test. Do not apply a batch until James has read it and said yes to the batch or to named essays in it.
- If two of the three are a no: stop after recording them. Say plainly that the survey treatment should not proceed on this evidence and ask James what he wants instead.

**Done means.** The review file records a decision on all three; the applied edits are in the edits file, the library, and the public essays; the scanner shows no regression; every batch file for the 59 is either applied with James's yes or waiting on him, and the PR description says which.

## Step 2. Reseed the 128 stub rows; move the 93 pastor essays to PCN

**Goal.** Make the writing index honest (no database row is a 50-word abstract of an essay the library holds in full) and stop carrying pastor-facing material on a site whose audience is skeptics, doubting Christians and households.

**Where.** The stub problem is described in `docs/WORLD-CLASS-AUDIT.md` ("One thing needed correcting rather than merging") and in the PR #459 description. The 128 rows are database seed rows whose slugs the library (`content/static-library.generated.json`) holds at about 1,700 words each. `api/index.ts` and `scripts/prerender-heads.mjs` currently paper over this by preferring the library body when the row is a stub (`preferFullBody`). The seed pipeline is `scripts/seed-all-content.mjs` (`pnpm db:seed`) and `server/seed-*`. `scripts/unpublish-stubs.mjs` exists from a merged branch and must not be run expecting the essays to disappear; they will not, and they should not. The pastor material and its README live in `archive/pcn-handoff/`; pastor URLs already redirect to `pastorsconnectionnetwork.com` in `vercel.json`. The 93 pastor essays are the ones filed under the pastoring pillars in `client/src/lib/pillar-assignments.ts` and named in the audit's information-architecture section.

**Do.**
- Write a script `scripts/reseed-stubs-from-library.mjs` that, for each of the 128 slugs, replaces the row's body, excerpt, word count and read time with the library's, keeps the row's id, publish date, pillar and any takedown flag, and prints a plan (slug, old word count, new word count) with a `--dry-run` flag. Run the dry run and show James the plan. Executing it against production needs `DATABASE_URL` and his go; stop and ask. If he prefers, offer the same change as a seed-file update so the next `pnpm db:seed` carries it.
- After the reseed is confirmed, remove the `preferFullBody` exceptions only if a test proves every one of the 128 rows now carries the full body; otherwise leave them, since they are the safety net.
- For the 93 pastor essays: produce an export bundle under `archive/pcn-handoff/essays/` (one Markdown file per essay with front matter: title, slug, date, pillar, deck, canonical URL on PCN) and a manifest, so the PCN site can import them. Then remove them from this site's index and sitemap (`scripts/build-public-essays.mjs`, `scripts/generate-sitemap.mjs`, `pillar-assignments.ts`), add a 301 for each old URL to its PCN address in `vercel.json` (follow the existing pastor redirects; keep the file under Vercel's redirect limit and say what the count is), and update `llms.txt` and `llms-full.txt` builders so answer engines stop seeing them here. Do not delete the source content; archive it.
- Tell James in one paragraph what a reader who bookmarked a pastor essay will now see, and that the redirects only work once PCN publishes the same slugs.

**Done means.** The reseed has run with his go (or the seed file carries it and he knows), the index and sitemap no longer list stubs or pastor essays, every old pastor URL redirects, the export bundle exists, and the validators, tests, build and prerender are green.

## Step 3. Read the numbers

**Goal.** Replace the audit's D in analytics with a first honest look at what readers actually open, and a cut list drawn from it.

**Where.** Vercel Analytics through the Vercel tools if James approves the read in his connector settings; otherwise the site's own traffic table, written by `client/src/components/PageTracker.tsx` to `/api/track` and shown in the admin Traffic panel (`client/src/pages/admin/`), plus the real-user vitals from `WebVitalsBeacon.tsx`.

**Do.**
- Ask James once: approve the Vercel Analytics read, or paste the top twenty routes from the Vercel dashboard for the last thirty days. If neither, use the site's own traffic table (read only; no writes).
- Write `docs/audit/TRAFFIC-2026-09.md`: the top twenty routes with views and unique visitors, the ten routes with the highest bounce or shortest read, the real-user LCP and CLS at the 75th percentile if available, and the search queries readers typed into the site's own search if the beacon records them.
- From the numbers, name at most five concrete cuts or promotions (a page nobody opens that the nav still carries; an essay everyone opens that the front page hides) and put them in the same file as recommendations. Do not make the cuts in this step; that is a decision for James.

**Done means.** The file exists with real numbers and their source, the recommendations are specific, and the PR description links it.

## Step 4. Decide the membership question

**Goal.** Either the membership page sells something, or it does not exist. A door that opens onto a waiting room costs trust.

**Where.** The membership page under `client/src/pages/`, the Stripe configuration in `api/index.ts` (checkout is live only when `STRIPE_SECRET_KEY` and the `stripeMembershipPriceId` site setting exist; otherwise the page falls back to the waitlist), the site-settings admin, `client/src/lib/siteNav.ts`, `vercel.json` redirects, and the sitemap builder.

**Do.**
- Ask James one question with two answers: price it, or remove it. If price it: what the monthly and annual prices are, and whether he has already created the two Stripe prices (he needs the two price IDs; if he has not, tell him exactly where in the Stripe dashboard to create them and what to paste, and stop).
- If price it: set the two IDs in site settings through the admin (his click or yours with his go), verify the checkout end to end in test mode, make the page say plainly what a member gets (from existing copy only; do not invent benefits), and remove the waitlist fallback text from the page so it cannot show a waiting room again.
- If remove it: delete the page and its route, remove it from the nav and the sitemap, redirect `/membership` to `/subscribe` (or `/books` if James prefers) in `vercel.json`, keep the waitlist addresses already collected (export them to a file James can import into his email list; do not delete them), and note the removal in the audit.

**Done means.** One of the two branches is fully done, the route smoke tests pass, no link on the site points to a waitlist, and the PR description records the decision.

## Step 5. A paged writing index

**Goal.** The writing hub stops downloading the 555 KB `client/public/essays/index.json` to draw its first screen. The hub should feel as fast as the front page.

**Where.** `scripts/build-public-essays.mjs` (writes `index.json`, `featured.json`, `canon.json` and one JSON per essay), `client/src/pages/Writing.tsx` (loads the index; filters by track, pillar, sub-theme, series, audience, format and search; shows 24 at a time with a "show more"), `client/src/pages/Search.tsx` (also reads the index), `server/public-essays*.test.ts`, and the route smoke test in `client/src/test/`.

**Do.**
- Emit a light index (`index-lite.json`: slug, title, deck, pillar, track, date, art seed; under 120 KB) and per-pillar shards (`index/<pillar>.json`) with the full card fields, alongside the existing `index.json` for one release so nothing breaks.
- Make the hub load the light index first and paint from it, then fetch the shard the current filter needs. Filtering by anything other than pillar and the search box may still need the full index; load it lazily only when such a filter is active, and never on first paint of the unfiltered hub.
- Keep search working: `Search.tsx` may keep the full index since it loads only on a query.
- Measure before and after with the same CDP or Lighthouse method the audit used (the CI `quality` job prints the numbers for the front page; add `/writing` to that job's Lighthouse run and print its metrics too).
- Remove the full-index load from the hub only when the measured transfer on the unfiltered hub is under 200 KB and the filters all still work in the browser.

**Done means.** The unfiltered hub transfers under 200 KB, every filter and the search still work (checked in a headless browser, not just tests), the indexes have tests for their shape, and CI prints `/writing` alongside the front page.

## Step 6. A reply channel on every essay

**Goal.** The audit's own measure of success is "an email that argues with the piece." Give every essay a one-step way to send one.

**Where.** `client/src/pages/ArticleDetail.tsx` (the essay page; the end-of-essay area after the author card and related essays), the contact address in `CLAUDE.md` (`Pastorjbell206@gmail.com`), any existing contact procedure in `server/routers.ts` and `api/index.ts`, and `client/src/components/` for the shared pieces.

**Do.**
- Build the smallest honest version first: a short block under the essay, in James's register, with one link that opens the reader's mail client with the subject prefilled as the essay's title and the body empty. No form, no server, no tracking beyond the existing pageview. The copy is one or two sentences and must not read as a marketing ask; it is an invitation to disagree.
- Only if James wants replies without a mail client: add a form that posts to the existing contact procedure with the essay slug attached, in both runtimes, with the parity test green, a rate limit, and a plain failure state using the shared `LoadFailed` pattern. Do not build this unless he asks.
- Add the block to the prerendered essay HTML too (`scripts/prerender-heads.mjs` renders essay bodies for crawlers), so it is present before the app mounts.

**Done means.** Every essay page has the block, the link carries the essay title, the copy passes the Forbidden Language check, and the route smoke test and prerender are green.

## Step 7. Notes fed from the Facebook export

**Goal.** The Notes section (`/notes`) is built and empty. Twenty real posts make it a room.

**Where.** `scripts/import-facebook-notes.mjs` (reads a Facebook "Download your information" JSON export), `client/public/notes/notes.json`, `scripts/validate-notes.mjs`, `client/src/pages/Notes.tsx`, and the nav entry in `client/src/lib/siteNav.ts` (Notes sits in the footer tail until it has content).

**Do.**
- Ask James for the export file (Facebook, Settings, Download your information, JSON format, posts only) and where he put it. Do not proceed without a real export; do not write posts in his name.
- Run the importer on it. Show him the candidate list (date, first line, word count) and ask which to publish, or whether to publish everything above a length threshold with the ones he names excluded. Default if he says "you choose": the twenty longest posts from the last two years that contain no names of private individuals and no photos that need permission.
- Import the chosen posts, run the notes validator, and run the voice scanner over the notes as a report only: do not edit his posts. If a post contains a link to an essay on the site, link it.
- Once at least twenty notes are live, move Notes from the footer tail to a primary link in the Read menu, and add `/notes` to the CI axe route list if it is not already there.

**Done means.** Twenty or more real notes render on `/notes`, the validator is green, the nav promotes the section, and the build, prerender and sitemap include it.

## When all seven are done

Update `docs/WORLD-CLASS-AUDIT.md`: re-grade the rows the steps touched (writing, information architecture, analytics, purchase, performance, search, email) with the measurement behind each new grade, and rewrite "What James does to reach A+" so it lists only what is still his. Update the PR description to match. Then report, in one message: what shipped per step, what each gate showed, what waits on James, and what you did not verify.
