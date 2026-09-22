# Open branches — inventory and verdicts (Foundation Prompt, Phase 0)

> Read-only. Nothing here has been merged, folded, or closed. James approves
> the list at Gate 0; then the actions run, one branch at a time.
>
> Measured 2026-09-22 against `main` at `baac0d9`. "Files" is the diff between
> the pull request's own recorded base and its head, which is the honest size
> of the change; the GitHub "files changed" number for the July branches is
> inflated by everything `main` did since. This session's clone is shallow, so
> ancestry of the July bases could not be proven; the verdicts do not depend
> on it.

## Summary

| PR | Age | Files | Merges onto `main`? | Already on `main`? | Verdict |
|---|---|---|---|---|---|
| #459 Dark mode, PCN move, pillar merge, brand alignment, static essays… | active today | 344 | clean | partly | **DO NOT MERGE AS A UNIT**; cherry-pick four parts, fold six into phases, reject two (§2) |
| #521 Completion audit: duplicate hrefs on four pages | 4 weeks | 5 lines of code + stale doc deletions | conflict on `ledger.json` | no (3 of 4 pages still carry the duplicate) | **FOLD** the five-line fix; close the PR |
| #518 Marriage and Parenting: the middle movement | 4 weeks | 2 pages of prose | clean | no | **FOLD** into the Phase 5 review queue (prose; two first-person claims for James) |
| #441 dependabot: setup-node 4 → 7 | 9 weeks | 2 workflow files | clean | no (`main` still on v4, with Node 20 deprecation warnings) | **FOLD** into Phase 8 hardening with the other action bumps |
| #377 Docs: the Fable 5 depth-board prompt | 10 weeks | 1 doc | clean | no | **CLOSE**: superseded by `docs/FOUNDATION-PROMPT.md` and the voice standard |
| #376 A11y: `<main>` landmark on six pages | 10 weeks | 6 pages, 2 lines each | conflicts (`Parenting.tsx`, stale `prerender-heads.mjs`) | no (all six still lack a `<main>`) | **FOLD** into Phase 8 accessibility |
| #375 Care: crisis help on `/doubt` and Deconstruction; advice disclaimer | 10 weeks | 1 component + 3 pages | conflicts (`Doubt.tsx`, stale `prerender-heads.mjs`) | no | **FOLD**, early: crisis-page care is a `CLAUDE.md` standard, not a nice-to-have |
| #374 Perf: lazy-load the seed corpus off the admin bundle | 10 weeks | 1 file | conflicts | **yes** (`AdminDashboard.tsx` already uses the dynamic import) | **CLOSE**: already done |
| #370 SEO: Person entity for the author | 10 weeks | 3 files | conflicts (`About.tsx`) | no | **FOLD** into Phase 2 (JSON-LD is rebuilt there) |
| #368 Analytics: reader's-journey funnel events | 10 weeks | 10 files | conflicts in 5 | no | **FOLD** the design into Phase 3; re-implement, do not merge |
| #524 Docs: the Foundation Prompt (this branch) | today | 1 doc (+ this inventory) | clean | no | **MERGE** on green `build` |

## 1. The nine small branches, one at a time

**#521 — the completion audit's first fix.** The code is five lines: on
`BaptistVsMethodist`, `CalvinismVsArminianism`, `EvangelicalVsMainline`, and
the `ChurchHistory` landing, card lists where two titles shared one `href`.
Three of the four pages still carry the duplicate on `main` (React warns on
every render; readers get two cards to one essay). The rest of the diff is a
stale-base artifact: the branch predates `docs/VOICE-JAMES-BELL.md` and the
voice ledger, so the PR reads as deleting them. It must not be merged as is.
**Fold:** re-apply the five lines on a fresh branch; close #521 with that note.
Its `docs/audit/COMPLETION-PROMPT.md` is superseded by the Foundation Prompt.

**#518 — Marriage and Parenting gain a middle movement.** Two pages of prose
(Bellah's *Habits of the Heart* and Cherlin on deinstitutionalised marriage;
the National Study of Youth and Religion and Monica's prayers for Augustine on
parenting). It merges clean and its citations are real. It is prose, so rule 4
applies: it carries two first-person claims James must confirm or cut ("I have
stood with couples while they said those words, and I have needed them
myself"; "I have five sons, and I have been the inconsistent man in that
house…"). **Fold:** stage both pages as candidates in the Phase 5 review queue
with the two sentences flagged; close #518 pointing there.

**#441 — dependabot, `actions/setup-node` v4 → v7.** Still needed: `main` runs
v4 and every CI run prints the Node 20 deprecation warning for `checkout@v4`,
`setup-node@v4`, and `pnpm/action-setup@v4`. **Fold** into the Phase 8
hardening branch as one commit that bumps all three actions together, with CI
watched. Close the dependabot PR when that merges (dependabot re-opens if the
bump is missing).

**#377 — the depth-board prompt.** A docs-only prompt from July for a
board-of-experts sweep. The approach it describes (whole-corpus sweeps) is the
one the Foundation Prompt rules out; the voice standard and review queue
replace it. **Close** with a note naming the replacement.

**#376 — `<main>` landmark on six pages.** `Doubt`, `Parenting`, `Marriage`,
`StartHereDiagnostic`, `StartHereQuiz`, `TheologyQuiz` compose nav and footer
directly and have no main landmark; screen readers have no skip target. Still
true on `main`. **Fold** into Phase 8 accessibility (two lines per page,
re-applied by hand; the branch's `prerender-heads.mjs` change is a stale-base
artifact and must not come with it).

**#375 — crisis help and the advice disclaimer.** Adds the shared `CrisisHelp`
note to `/doubt` and the Deconstruction landing (988, the Lifeline, a link to
`/help`, placed right after the hero) and an `AdviceDisclaimer` component
used on the Financial Health tool. `CLAUDE.md` names doubt as a crisis-facing
page that must keep a path to help; `main` does not have this. **Fold**, and
sooner than Phase 8: it is a care item and a small one. Same caveat on the
stale `prerender-heads.mjs` hunk.

**#374 — lazy-load the seed corpus in the admin.** Already on `main`
(`AdminDashboard.tsx` line 117 uses the dynamic import). **Close** as done.

**#370 — Person entity for the author.** `getPersonSchema()` in `SEOMeta.tsx`
rendered on `/about`, with `sameAs` matching the Organization founder. Not on
`main`. Sound, facts-only. **Fold** into Phase 2, where every essay's JSON-LD
is rebuilt with the static pages and the author entity belongs in the same
pass.

**#368 — the reader's-journey funnel.** Adds `book_open`, `book_cta_click`,
`subscribe_start`, `purchase_intent` to the telemetry seam, wired into
`BookReader`, `SegmentedSignup`, and the home `LibraryStrip`. Not on `main`;
conflicts in five files, including `content-data.json` and the CI workflow,
and it deletes `essayQuality.ts`. The design is right and is most of what
Phase 3 specifies. **Fold** the design (event names, no-PII contract, tests);
re-implement on the Phase 3 branch rather than merge.

## 2. PR #459 — the full read

Reviewed from the real diff, not the description, in a separate worktree at
the branch head, with the gates run there. Size: 344 files, +14,294 / −3,553,
719 non-merge commits with author dates from March to today (rebased
history). It merges onto current `main` with no textual conflict and does not
touch the five files `main` corrected yesterday, so the 128-essay reversal
survives a merge. Gates on the branch: `pnpm check` 0 errors; `pnpm test`
368 passed, 72 skipped; `pnpm build` clean; the essay export and prerender
run clean (678 essays, 1,441 HTML files). Not run: the other twelve
validators, lint, Lighthouse, axe.

**Verdict: do not merge as a unit.** It bundles about a dozen unrelated
decisions. Several contradict `main`'s recorded decisions (dark mode off, the
six-pillar spine, the database as the record). It changes live purchase flows
in a way that breaks every existing download link and depends on Stripe
redirect settings nobody has verified. And it ships eight essays and a
site-wide positioning sentence in James's first person on the strength of a
commit message. Cherry-pick the parts that are plainly correct; put the rest
in front of James one at a time.

### Area by area

| Area | What it actually does | Verdict |
|---|---|---|
| **Static essays** (`scripts/build-public-essays.mjs`, `ArticleDetail`, `Writing`, `Home`, `Search`) | Exports 678 essays from a committed JSON library (`content/static-library.generated.json`) to `client/public/essays/<slug>.json` plus an index, featured, and canon file at deploy. Pages fetch the JSON client-side and fall back to the API on a miss. **Not static HTML**: the body reaches the served page only through the crawler-only injection the prerender step already did, and `createRoot` discards it, so a reader sees the prerendered essay, then a blank, then the JSON-rendered essay. It also splits long essays at two-thirds to insert related essays. | **FOLD.** The export is a good CDN cache but it hardens the JSON library as the source of truth, the opposite of Phase 1. Rebuild it as an export *from the database* once `content/full/` is imported (Phase 2 does exactly this, with real hydration). |
| **Stub heuristics** (`api/index.ts` `preferFullBody`, unpublished-stub exception, same in the prerender) | Prod-only: swaps a short database body for the library's longer one by word count; serves the library essay when a database row is unpublished. Dev has no equivalent. | **REJECT.** `main` fixed the root cause. This changes takedown semantics (an unpublished row no longer hides the essay) and widens dev/prod asymmetry. |
| **Performance** (`vite-paint-first.ts`, deferred analytics, lazy guide/argument data, WebP covers, deterministic essay art, two font weights dropped) | Removes the module script from the head and re-injects it after first paint; loads data only on the pages that use it; SVG essay art replaces per-card image fetches. Dropping Cormorant 600 renders "600" as 500. | **FOLD** as its own PR after a real-device check. Paint-first lengthens the visible re-render described above; take it with Phase 2's hydration fix, not before. |
| **CI** (`ci.yml`) | checkout v5, setup-node v5, Node 22; two more validators in the blocking step; Lighthouse median of three; axe over ten prerendered routes; thresholds unchanged, still non-blocking. | **MERGE AS IS** after confirming the Vercel project's Node version. Also covers #441. |
| **Money paths** (ebook gate, bundle, Resend receipt; 18 ebook files moved out of `client/public/`) | Six older ebooks and the three hand-written books served only against a paid Checkout session; a three-book bundle at $19.99; a receipt email on first purchase when `RESEND_API_KEY` is set. No keys in code. | **FOLD**, gated on James: (a) every past buyer's direct download link 404s with no redirect possible; (b) the Stripe Payment Links and Buy Buttons must redirect with `?session_id={CHECKOUT_SESSION_ID}` or every buyer lands on "missing session"; (c) `STRIPE_PRICE_THE_THREE_BOOKS` must exist. Belongs to Phase 7 with a live test purchase. |
| **Dark mode** (`App.tsx` `switchable`, ~109 files of token swaps, six new `--cat-*` tokens) | Re-enables the footer theme toggle that `main` deliberately turned off, on a mechanical token swap across 109 files with no visual verification. | **REJECT** for now. Contradicts a Decision Log entry. Re-propose as its own PR with screenshots of every dark section in both themes. The six tokens are correctly placed and harmless. |
| **Hardcoded hex** | None added in components. `api/og.tsx` edge constants updated to brand values (pre-existing pattern; the edge function cannot read CSS). | Clean. |
| **Prose and positioning** (see the list below) | 28 library essays edited: 8 with rewritten openings that put first-person biographical claims in James's voice, 20 with forbidden-word swaps. A new site-wide brand sentence replaces the meta description, RSS, `index.html`, and homepage subhead. A first-person Substack pitch. 23 hand-written meta descriptions and QAPage JSON-LD for 678 essays. Docs on the branch say James accepted the eight rewrites on 22 September; the repo cannot verify that. | **FOLD** only what James confirms in writing, through the Phase 5 queue. Nothing here rides in on a merge. |
| **Routes and redirects** | `/explore`, `/map`, `/article-collections` 301 to `/writing` in both wouter and `vercel.json`; new `/canon`, `/notes`, `/the-pastoral-angle`, a bundle thank-you page. `vercel.json` was reindented from two to four spaces: 1,050 lines of churn for three redirects and one header. | **FOLD.** Re-apply the three redirects and the header on a clean file. |
| **PCN move, pillar merge, taxonomy** | Moves 30 already-unrouted pastor pages and four scripts to `archive/`; deletes pillar four from `taxonomy.ts` and merges it into six; reassigns 16 slugs; rewrites `CLAUDE.md` to "five pillars". | **REJECT** the taxonomy change (the six pillars are the recorded spine; `taxonomy.ts` is never edited to fit a piece). The archive move is acceptable as its own commit. |
| **Substack sync and API fixes** (both runtimes, tests) | Feed sync inserts unpublished drafts idempotently under a real pillar instead of published duplicates; fixes the prod-only "procedure not found" on the footer subscribe form; the admin cover-image field is finally saved. Parity test green. | **MERGE AS IS.** Genuine bug fixes with tests. |
| **Product changes** (four-section homepage with a photo slot, `/canon` of twelve, empty `/notes`, tools hub leads with eight, announcement bar off, client-side search) | Product decisions James has not signed; the canon is marked "proposal" in its own comment. | **FOLD** one at a time after James picks the canon and the homepage, in Phase 4. |
| **Docs and audits** | Session write-ups (`WORLD-CLASS-AUDIT.md`, brand-alignment docs, state of the site, voice notes). | **MERGE AS IS** or drop; no runtime effect. |

### Prose on #459 that would go live (for James)

Eight library essays with rewritten openings carrying new first-person
claims: `non-denominational-doesnt-mean-no-tradition` ("I pastor a church with
a denomination in its name"), `toxic-masculinity-in-the-pulpit` ("I have five
sons…"), `religious-trauma-is-real` ("I came to faith as an adult, from
outside…"), `what-christians-can-learn-from-buddhism`, `the-anabaptist-option`
("I am a Baptist pastor. I baptize people who can answer for themselves…"),
`the-death-of-christendom`, `why-people-are-leaving-the-church` ("I have sat
in the meetings where we explained this to ourselves…"),
`why-young-adults-arent-coming-back`. Twenty more with word-level swaps only.
Site copy: the brand sentence in `positioning.ts` ("The American church traded
the gospel for power; James Bell writes from inside the trade…"), the Substack
pitch ("I have sat with enough of the dying to know what a flag cannot do"),
the homepage ("Three books. Every word mine."), subscribe copy on four
components, the Pillars page ("Four pillars… the fifth"), and 23 hand-written
meta descriptions.

### What to do with #459 at Gate 0

Leave the pull request open and stop pushing to it. Cherry-pick, onto fresh
branches in this order, each green before the next: (1) the Substack sync,
subscribe fix, and cover-image field; (2) the CI workflow, folding #441;
(3) the three redirects and cache header on a clean `vercel.json`;
(4) the docs. Then close #459 with a note pointing at those merges and at
the phase that owns each remaining piece: static export and performance to
Phase 2, product changes to Phase 4, prose to Phase 5, the ebook gate and
bundle to Phase 7, dark mode and the taxonomy change declined with reasons.
