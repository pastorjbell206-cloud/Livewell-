# log.md — working log

Newest first. One entry per working session: what changed, what broke, what
is next. Decisions made without asking are recorded with their reason.

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
