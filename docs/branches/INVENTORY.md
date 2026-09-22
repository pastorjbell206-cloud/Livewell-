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
| #459 Dark mode, PCN move, pillar merge, brand alignment, static essays… | active today | 344 | clean (mechanically) | partly | **see §2** |
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

*(Filled in below from the branch review; see the section that follows.)*
