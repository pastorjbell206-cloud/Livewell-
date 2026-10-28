# Wave 3 review: gates and performance

Reviewer lens: gates and performance. Branch `claude/todo-implementation-hhp4bm`,
worktree `/home/user/livewell-integrate` at `aa31178a` (read only; `git status`
is still clean). Diff reviewed: `git diff origin/main...HEAD -- . ':!docs/work'`
(121 files, merge-base `a2a2ad6e`).

## Verdict

On its own, the branch is green. Every CI step I could run passed, and passed
twice where it mattered. It is not ready to merge yet, because it is one
commit behind `origin/main`. `fea345a4` ("Essays: the five pilots go public",
#539) landed on main after the merge-base. A pull request's CI runs on the
merge of the branch into main. On that merged tree `pnpm test` fails five
topics tests, each of which assumes a pilot essay is still off the shelf.
That is the one blocker. Everything else here is minor or informational.

## How it was run

Nothing ran inside the worktree. I exported `HEAD` and `origin/main` with
`git archive` into the scratchpad, and gave each tree its own copy of
`node_modules` (no hard links back to the worktree's files; checked by inode).
I added a third tree, HEAD with `fea345a4` applied (`git apply` applied it
cleanly with no conflicts), to stand in for what PR CI checks out. A fourth
tree had the world strand flipped live, to test U11's publishing claim.
Node 22.22.0, pnpm 10.4.1, Chromium 153 from `/opt/pw-browsers`, Lighthouse
12.8.2, axe-core 4.10.3.

Scratchpad root: `/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad`
(logs: `integ-*.log`, `merged-*.log`, `flip-*.log`, `main-*.log`; Lighthouse
JSON under `lh/`).

## Results, branch as committed (HEAD `aa31178a`)

| Step | Result |
|---|---|
| Content gates (every command in the ci.yml step, 33) | 33 / 33 pass |
| `pnpm check` | pass |
| `tsc -p api/tsconfig.json --noEmit` | pass |
| `pnpm test`, pass 1 | 113 files passed, 7 skipped; 1303 tests passed, 73 skipped (115.5 s) |
| `pnpm test`, pass 2 | identical: 1303 passed, 73 skipped (113.2 s); no flakes |
| `pnpm build` | pass (vite 8.9 s, server bundle 150.3 kb) |
| `sitemap` + `prerender` + `audit:canonicals` | 2268 sitemap URLs, 0 not prerendered, 0 failures |
| Vercel-only steps (`pdfs`, `og`, `howtos`, `wisdom`, `publish:articles`, `llms:full`) | all exit 0 (603 PDFs, 214 OG images) |
| `pnpm lint` (not a CI gate) | exit 1: 9 parse errors, all in `docs/work/**/*-wf.js`; product code adds 0 new problems vs main (warnings 525 to 523) |

The new routes are in the sitemap and prerendered with their own titles and
self-canonicals: `/topics`, the three `/topics/<slug>` pages, and
`/study/bible/guides/whole-story-2027`.

## Results, branch merged with origin/main (HEAD + `fea345a4`)

| Step | Result |
|---|---|
| Content gates | 33 / 33 pass (`validate-essays` now checks 5 files; `validate-topics` no longer lists essays waiting for the shelf) |
| `pnpm check` | pass |
| `pnpm test` | **fails: 2 files, 5 tests** (1298 passed) |
| build + canonical audit | pass (2273 URLs, 0 failures) |

The five failures:

- `server/topics-gate.test.ts` "an empty slot: a lead that is not public with no stand-in..." expects `essayStandIn: is needed: the lead essay is not public`. It gets only the scripture and witness problems, because `what-christian-nationalism-is-and-is-not` is now public.
- `server/topics-gate.test.ts` "an essay row with no stand-in while the essay is not public" uses `/writing/why-didnt-the-bible-ban-slavery`, which is now public, so `rowProblems` returns `""`.
- `client/src/pages/topics.test.tsx` "/topics > opens the stand-in while a row's essay is not public..." expects `/answers#why-didnt-the-bible-just-ban-slavery` but gets `/writing/why-didnt-the-bible-ban-slavery`.
- `client/src/pages/topics.test.tsx` "/topics/:slug > shows the stand-in until the lead essay is public..." cannot find the stand-in link "How Christian Nationalism Rewrites Doctrine".
- `client/src/pages/topics.test.tsx` "lib/topics > leads with the essay once it is public..." expects `{ standIn: true, href: /writing/how-christian-nationalism-rewrites }` but gets `{ standIn: false, href: /writing/what-christian-nationalism-is-and-is-not }`.

The product behaves as U25 designed it: once the pilots are public, the pages
lead with the essays. The tests read the live `shelf.json` and so pinned the
pending state. The fix is to merge `origin/main` into the branch and make
these assertions seed the shelf state instead of reading it. That is the same
move the integrator made for U11's `live` flag, where the tests now "hold
whichever way the flag is committed". Then add one assertion for the live
case the pilots now produce.

## Performance

**Home, Lighthouse with the ci.yml flags (mobile, simulated throttling), alternated runs:**

| | perf | a11y | bp | seo | FCP | LCP | TBT | CLS | bytes |
|---|---|---|---|---|---|---|---|---|---|
| wave 3 (6 warm runs) | 95, 95, 95, 95, 95, 96 | 100 | 96 | 100 | 1.85 to 2.04 s | 2.45 to 2.64 s | 36 to 61 ms | 0 | 497 KiB |
| main (6 runs) | 95 x 6 | 100 | 96 | 100 | 2.00 to 2.03 s | 2.60 to 2.63 s | 29 to 54 ms | 0 | 489 KiB |

The first wave-3 run of the session scored 68 (FCP 3.0 s). It was the
session's first Chrome launch, a cold start. Five more wave-3 runs, alternated
with main, all scored 95 or 96, so I count that 68 as noise. Home meets the
quality-job thresholds (90/90/95/95), and best-practices sits at 96 on both
sides. The only failing audit is a console error for the legacy CloudFront
portrait, blocked by this sandbox's proxy. It shows up on main as well.

**New routes**, served as Vercel serves them (the prerendered file first),
2 runs each:

| Route | perf | CLS | LCP | note |
|---|---|---|---|---|
| `/topics` | 76, 76 | 0.209 | 3.9 s | the footer shifts when the lazy page mounts |
| `/topics/faith-politics-and-the-flag` | 84, 83 | 0 | 4.2 to 4.3 s | LCP render delay 3.9 s |
| `/study/bible/guides/whole-story-2027` | 59, 73 | 0.366 | 3.3 to 4.6 s | the footer shifts; fetches a 100 KB (29 KB gz) plan JSON |
| main `/study/bible/guides` (comparison) | 65, 66 | 0.666 | 3.7 s | same footer shift |
| main `/family/devotions` (comparison) | 64, 64 | 0.510 | 4.1 s | same |
| main `/help/politics` (comparison) | 73, 73 | 0 / 0.122 | 4.8 s | |

The new routes fall below 90, but they are no worse than the inner routes
already on main. The cause is the house pattern: the lazy route mounts and
pushes the footer down. So this is inherited, not a regression. CI asserts
the thresholds only on `/`.

**Entry bundle** (the script `index.html` loads on every route):

| | JS min | JS gzip | CSS min | CSS gzip |
|---|---|---|---|---|
| main | 278.47 kB | 78.48 kB | 127.14 kB | 23.33 kB |
| wave 3 | 294.57 kB | 84.49 kB | 141.68 kB | 25.41 kB |
| change | +16.1 kB (+5.8%) | +6.0 kB (+7.7%) | +14.5 kB (+11.4%) | +2.1 kB (+8.9%) |

`source-map-explorer` over both builds attributes the JS growth to Home's
static imports. `HomeTonight.tsx` (1.5 kB) pulls in `familyTable.ts`
(3.2 kB), `myProgress.ts` (4.5 kB, which pulls `storyPlan.ts` at 1.7 kB) and
more of `familyYear.generated.ts` (+3.7 kB, now 27.3 kB, the largest app
module in the entry after `App.tsx`). `HomeFind.tsx` adds 1.2 kB. The CSS
growth is entirely new page-scoped rule families in the global `index.css`:
`.tp-*` (topics), `.sy-*` (the 2027 plan), `.tb-*` (the Table), `.home-find`,
and `.home-tonight`. Home's Lighthouse result did not move, so neither change
blocks.

## Parity

The wave touches one procedure, `posts.listPublished`, which gains an
optional `{ slugs, since }` input. It is implemented in both runtimes:
`server/posts-listing.ts` in dev via `server/routers.ts`, and `pickListing`
in `api/index.ts` on both the single and batch paths. The input is parsed the
same way the file treats other GET input (`"0".json`). The client
(`client/src/lib/shelf.ts` `shelfListingInput`) sends `toISOString()`, which
satisfies dev's `z.iso.datetime()`. `server/api-parity.test.ts` passes 2/2,
and `server/posts-listing.test.ts` passes 12/12, both on HEAD and on the
merged tree. There is one documented difference: dev rejects malformed input
with BAD_REQUEST, while prod ignores it. The client never sends malformed
input. `KNOWN_PROD_GAPS` stays empty.

## Other checks

- **axe-core** (local Chromium, 1.5 s after network idle, 1440 and 390 wide): 0 violations on `/` (wave 3 and main), `/topics`, `/topics/faith-politics-and-the-flag`, `/study/bible/guides/whole-story-2027` and `/family/devotions`. Main's `/family/devotions` has one `heading-order` violation, which the wave removes.
- **U11's publish claim holds.** In a scratch copy I set `"live": true`. The family gate, the index check and the year check then fail with the documented messages. After the three documented commands (`validate-family --freeze`, `build-family-index`, `build-family-year`), 33/33 gates pass, `pnpm check` passes, and `pnpm test` gives 1303 passed. No test needed an edit.
- **Merging is textually clean.** `fea345a4` and the wave share two files (`client/src/pages/essay-shelf.test.tsx`, `scripts/lib/site-routes.mjs`), and the patch applies to them without conflict.
- **Pre-existing, not from this wave:** the committed `client/public/llms-full.txt` is stale against `pnpm run llms:full`. The Vercel build regenerates it, and the wave does not touch it.

## Findings

1. **Blocker. The branch fails `pnpm test` once merged with main.** PR CI runs on the merge, so it will fail. Evidence and fix are above, under "Results, branch merged with origin/main".
2. **Minor. Entry JS +6.0 kB gzip on every route**, all from Home's static `HomeTonight` and `HomeFind` imports. Fix: load `HomeTonight` lazily behind a fixed-height placeholder (keep CLS at 0), or keep `familyTable`, `myProgress` and `storyPlan` out of the entry.
3. **Minor. Entry CSS +14.5 kB (+2.1 kB gzip) of page-only rules** in the global `client/src/index.css`, which blocks rendering on every route. Fix: move the `.tp-`, `.sy-` and `.tb-` blocks into CSS imported by their lazy page modules (Vite splits CSS per chunk). Tokens stay at `:root`.
4. **Minor, inherited. The new routes score 59 to 84 on Lighthouse performance,** with CLS 0.21 and 0.37 from the footer shift. This matches main's inner routes (64 to 73, CLS up to 0.67). A site-wide fix would reserve height for the lazy route so the footer does not move.
5. **Minor. CLAUDE.md's CI section is stale.** It says "24 validators", but ci.yml now runs 33 commands. This wave added four (`build-topics-index --check`, `validate-topics`, `build-story-plan --check`, `verify-sources`) without updating the list.

## Not verified

- A real Vercel preview, and `/writing` against a real database. U29's smaller payload was checked only through `server/posts-listing.test.ts`.
- `@axe-core/cli` exactly as CI runs it (no matching ChromeDriver here). I ran axe-core through Playwright in the same Chromium instead.
- Lighthouse on desktop settings, and on any route beyond those listed above.
