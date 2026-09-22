# log.md — working log

Newest first. One entry per working session: what changed, what broke, what
is next. Decisions made without asking are recorded with their reason.

## 2026-09-22 — Foundation Prompt, Phase 0: the branch inventory

**Changed.** `docs/FOUNDATION-PROMPT.md` written (the plan a firm would run:
reconcile branches, one source of truth, essays as HTML, measure, cut,
editorial machine, photography, money, blocking gates). Phase 0 opened
read-only: `docs/branches/INVENTORY.md` with a verdict on each of the ten
open pull requests. No branch merged, folded, or closed.

**Found.** Nine of the ten are one-commit branches from July and August. One
is already on `main` (#374). Three are docs or prose (#377, #518, #521's
prompt). Five carry small, still-needed code that `main` lacks: crisis help
on `/doubt` (#375), the `<main>` landmark on six pages (#376), the author
Person schema (#370), the funnel telemetry (#368), the setup-node bump
(#441). Their GitHub "files changed" counts are inflated by stale bases; the
real diffs are a few lines to a few dozen. #459 is the one large branch
(344 files, active today); its full read, with the gates run in a separate
worktree, is recorded in the inventory.

**Decided.** Small branches are folded by re-applying their intent on the
phase branch that owns the concern, never by merging a stale base. Every
close carries a note naming what was in it and where it went.

**Next.** Gate 0: James approves the merge, fold, and close list. Then the
actions run one at a time, and Phase 1 opens with the backup.

## 2026-09-22 — Correction: the 128 "placeholders" are real essays; retirement reversed

**Found.** Checking production after the merge: all 128 slugs the audit
called placeholders are published, full-length essays in the live database
(7–10 minute reads, every one present in the live index), and their full
text is in the repo at `content/full/<slug>.md` (1,522–2,104 words each). The
seed file holds 50-word abstracts under those slugs, and the first pass
judged from the seed. One of them is the voice exemplar "You Are Not the
Exception," which the audit had reported as absent from the site.

**Changed.** Reversed the retirement on `main`: the 128 slugs are no longer
hidden from the writing index; the 24 reading-path entries are available
again with their slugs; the Blind Spots guide chapter is available again;
the seed rows are `published: true` again; `scripts/unpublish-stubs.mjs`
deleted, since running it would have unpublished 128 real essays.
`AUDIT.md` §0, §2, and §5 corrected in place. The pages whose stub picks were
swapped for other real essays (`ReadingPaths.tsx`, `Dashboard.tsx`,
`StartHereQuiz.tsx`) were left as they are: both sets are real essays, and
those files also carry voice repairs that would have been lost in a revert.

**Broke.** For about a day on production, the 128 essays were missing from
the `/writing` index and from five reading paths. Direct links, search
engines, and the essay pages themselves were unaffected.

**Decided.** The database and `content/full/` are the record of an essay's
length and existence; the seed file is not. Recorded so no later pass repeats
the mistake. The 128 full bodies have not been voice-audited and join the
Phase 4 queue.

**Next.** Merge, confirm the index on production, then Phase 1 as listed
below minus the withdrawn P0.

## 2026-09-21 — Gate 1 approved; PR #522 merged

**Changed.** James approved and merged all of the latest work. PR #522 squash-
merged to `main` as `5331be6` (133 files): the 128 placeholder retirement,
pillar map, five-door header, `/study`, the history timeline, home performance,
the voice audit ledgers and 120 surface repairs, 43 gated essay rewrites (still
candidates pending per-essay "save it"), `AUDIT.md`, `log.md`. Vercel deploys
`main` to production.

**Broke.** Nothing. CI `build` green on the merged head; `quality` red on the
asserted performance floor only (83 vs 90), non-blocking, explained on the PR.

**Decided.** Merging counts as Gate 1 approval of the audit and plan. The brand
ruling (keep cream/mustard/Cormorant vs the prompt's palette) is still open and
gates Phase 2; Phase 1 does not depend on it.

**Next.** Production still serves the 128 placeholders and the old essay
bodies until the DB steps run with `DATABASE_URL`. Then Phase 1: contrast and
axe fixes on 44 routes, the 11 dead ends, admin middleware guard and login
rate limit, dependency upgrades, `brief.md` and `handover.md`.

## 2026-09-21 — Phase 0 under the master site prompt

**Changed.** `AUDIT.md` written at the repo root (read-only discovery; all
numbers measured from this branch, CI, and a real-browser walk of 229
routes). `log.md` created. No code changed this session after the master
prompt arrived; the in-flight essay-repair workflow (scratch output only) was
stopped and nothing from it applied.

**Decided.** (1) The repo's existing token contract (`CLAUDE.md`,
`client/src/index.css`) governs over the prompt's paper/forest/oxblood palette
and Fraunces/Source Serif type, per the prompt's own rule 4.2 — the conflict
is reported in `AUDIT.md` §0 for James to rule on, not applied. (2) The 43
essay rewrites already gated onto this branch are reclassified as
*candidates* for the Phase 4 pipeline, not approved work, because rule 5
requires a side-by-side diff and James's "save it." (3) Prior work on this
branch (stub retirement, header recomposition, `/study`, history timeline,
performance) stays on the draft PR #522 for James to keep or reverse; it is
inventoried in `AUDIT.md` §2 and §6.

**Broke.** Nothing. Gates on the branch: `pnpm check` clean, 313 tests pass,
build succeeds, CI `quality` job fails at Lighthouse performance 83 (asserted
floor 90, job non-blocking).

**Next.** Gate 1: James approves or amends `AUDIT.md` and rules on the token
conflict. Then Phase 1 in this order: prod stub retirement, contrast/axe
fixes, dead ends, admin middleware guard + login rate limit, dependency
upgrades, `brief.md` and `handover.md`.
