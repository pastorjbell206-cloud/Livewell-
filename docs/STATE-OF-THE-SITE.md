# State of the site — the one page

The single place to look. If something is being worked on, waiting on a decision, or
already done, it is here. When it changes, change it here rather than starting a new
document.

Last updated: 25 July 2026. **All 18 substantive pull requests have now been read** — the
diffs, not just the titles — and checked against the current tree.

---

## 1. Why it feels jumbled

It is not a feeling. Both the site and the work on it outgrew their organization.

**The site.**

| | Now |
|---|---|
| Routes (239 public, 23 admin) | 262 |
| Distinct top-level areas | **97** |
| Links in the header | 33 |
| Separate "where do I start" flows | **5** |
| Competing taxonomies | **2** (the pillars, and the homepage/nav "wings") |
| Routes with no literal inbound link | **6** (to verify, not defects) |

A visitor arriving cold meets five front doors that do not agree with each other, and two
different names for how the writing is organized depending on which page they land on.

**Ninety-seven top-level areas** is the number that best explains the feeling. That is not
a site with sections; it is a site where almost every page is its own section. No
navigation organizes 97 peers — which is why the header carries 33 links and still does
not feel like it covers anything.

`node scripts/route-inventory.mjs` regenerates all of this from the code, so the next IA
attempt starts from what is true today rather than a map that ages the moment it is written
— which is exactly what happened to #216.

Six routes have no literal inbound link: `/articles`, `/authors/:slug`, `/dashboard`,
`/for-families`, `/search`, `/substack`. **Worth checking, not assuming.** The tool cannot
see links built from a variable, and three separate passes at this number produced 52, then
9, then 6 — each earlier figure wrong because a real link was invisible to a regex. The
count is a list to check by hand, and the script says so.

**The work — the larger half, and the part nobody was tracking.**

30 open pull requests. 12 are dependency bumps; **18 are real work**, the oldest open 51
days, from sessions that could not see each other. Work has been started faster than it is
finished.

The clearest evidence: **two separate PRs each found a real bug, and both bugs were still
live weeks later** because the PR was never merged and nobody re-derived the finding.
Both are now fixed (see §3).

---

## 2. The 18 pull requests, triaged

Read in full. Verdicts are against the current tree, not the PR's own base.

### Merge — clean, still wanted

| PR | What it is | Note |
|---|---|---|
| **#376** a11y main landmarks | **The missing half of this branch's own a11y work.** Superseded — fixed directly here instead. **Close it.** |
| **#486** group guides batch 3 | Adds 5 guides, 85 → 90, coverage complete. All refs verified live. One file, pure append, `clean`. **Merge.** |
| **#377** depth-board docs | Single new docs file, no code, no collision. **Merge.** |

### Close — already landed, or superseded

| PR | Why |
|---|---|
| **#374** perf: 2.3 MB off the admin bundle | **Already shipped in #433.** My earlier guess that this was the biggest win in the pile was wrong — the lazy import is in production. Only a loading/error-state polish remains. |
| **#110** two-level nav | Its contents reached main another way (`subPathway`, `isSeries`, `?sub=`/`?series=` all present). What is left is a conflicting nav rewrite. **Its `coverImage` bug is now fixed here.** |
| **#108** ADR parity matrix | A hand-counted snapshot, superseded by `server/api-parity.test.ts`, which cannot go stale. |
| **#106** security + CI hardening | 3 of 4 fixes already on main in *stronger* form (timing-safe compare, enforcing CSP, frozen lockfile). **One real gap remains — see §4.** |

### Rebuild — the idea is good, the branch is not salvageable

| PR | What survives |
|---|---|
| **#365** reader's journey (essay→book) | **The most valuable engineering in the backlog.** But its resolver sends 8 books to `/leadership`, which now redirects off-site, and it stacks a second funnel above the existing `KeepReadingBook`. Re-do the spine, fix the mapping. |
| **#216** IA overhaul Phase 0 | **The brief is excellent and should be reused nearly verbatim** — the phases, the never-delete-a-URL rule, the measurable done-criteria. Its 153-route map is a photograph of a site that has since lost a section and gained ~100 routes. Re-run the inventory, keep the method. |
| **#375** crisis help + advice disclaimers | All four changes are genuinely new and unduplicated. The base is stale and `Doubt.tsx` drifted at the insertion point. Re-apply the same four edits. |
| **#109** perf | Only one of nine items survives: six surfaces still call `posts.listPublished` (full article bodies) where `listForIndex` would do. ~6 lines. It would also reintroduce a Google Fonts CDN the CSP now blocks. |
| **#368** analytics funnel | Small and worth having, but main already ships `trackBookClick` and `trackNewsletterSignup` — reconcile rather than add parallel events. |
| **#370** author SEO entity | `/about` already renders a Person schema. Only the `knowsAbout` enrichment and extract-to-tested-helper remain. |

### Needs James — a decision, not an engineering call

| PR | The question |
|---|---|
| **#480** two finished essays | *"The Doubt You Did Not Choose"* and a second essay, complete and in your voice, waiting on your read. Its bundled SEO title-rewrite doc targets pastor essays that are leaving — drop that part. |
| **#214** gate the Hard Issues booklets | The page still exists and is still ungated, but it is PCN-facing by its own copy. **Does `/resources/hard-issues-series` stay on this site at all?** Gate it only if yes. |
| **#310** Vision Program prompt | Not docs-only: it carries 12 unverified content essays with named figures, dates and sources. That is a citation-integrity call. |
| **#107** ADR backend architecture | Recommends deleting `api/index.ts`. The codebase has since settled on keeping both runtimes with a parity test. Merging would enshrine a reversed decision. |

---

## 3. Two live bugs the backlog was hiding — now fixed

Both had been found before, in PRs that never merged.

1. **The skip link had no target on six pages.** It points at `#main`; only Home and
   Layout declared that landmark. On Doubt, Marriage, Parenting, StartHereDiagnostic,
   StartHereQuiz and TheologyQuiz, "Skip to content" did nothing. I had verified it on the
   homepage — the one page that worked — and generalized. #376 spotted this two weeks ago.
2. **Essays silently lost their cover image.** `posts.create`/`posts.update` never accepted
   `coverImage`, though the admin editor has always had the field and the table has always
   had the column. Zod stripped it on every save, with no error. #110 reported it 46 days
   ago. Fixed in both runtimes.

---

## 4. Waiting on you

1. **Merge #459.** It has been brought current with main (43 commits merged, five
   conflicts resolved) and re-verified: check clean, 308 tests, all 15 validators,
   `build:vercel` exits 0. Everything else is downstream of it — and main moved 43 commits
   while it sat, so the cost of leaving it is not hypothetical.
2. **Close five PRs in one sitting**: #374, #110, #108, #376, #106. All superseded.
3. **Batch the 12 dependabot PRs.**
4. **The 93 pastor essays** are still published. `archive/pcn-handoff/pastor-essays-in-database.md`
   has every slug and the safe order: publish on PCN, redirect, *then* unpublish.
5. **#480** — two finished essays waiting on your read.
6. **#214** — does the Hard Issues series stay on this site?

**One gap worth closing directly:** ESLint has never run in CI, though `pnpm lint` exists.
That was #106's one un-landed fix. Adding the step is a few lines — but run `pnpm lint`
first, because it has never been enforced and may not be green.

---

## 5. The order I would work in

1. **Merge #459** — already updated from main and re-verified.
2. **Close the five superseded PRs** and batch the dependabot ones. That is 17 of 30 gone
   in an afternoon, and the list becomes readable.
3. **Merge #486 and #377** — both clean and additive.
4. **Reconcile the two taxonomies.** The nav spine and `PILLARS_V2` currently disagree, and
   no route map can be drawn until they do. This blocks the IA work and it is yours.
5. **Then re-run #216's Phase 0** against the settled tree, reusing its brief.
6. **Then rebuild #365** — the reader's journey is the best remaining engineering idea.

The discipline worth keeping, whatever else happens: **finish or close before starting.**
Eighteen open branches is not eighteen projects in progress. It is eighteen unfinished
things, and two of them were hiding live bugs for over a month.
