export const meta = {
  name: 'livewell-code-wave',
  description: 'Build a wave of LiveWell master-plan code units in isolated worktrees, each reviewed and fixed; patches pushed to docs/work/patches',
  phases: [
    { title: 'Build', detail: 'one agent per unit in its own git worktree' },
    { title: 'Review', detail: 'adversarial review and fix in the same worktree' },
  ],
}

// args: { units: ['U08', ...], wave: 'wave 2', siblings: 'U08 home perf, ...' }
const MAIN = '/home/user/Livewell-'
const PLAN = MAIN + '/docs/work/plan/MASTER-PLAN.md'
const NOTES = MAIN + '/docs/work/NOTES.md'
const UNITS = args.units
const SIBS = args.siblings

const BUILD_SCHEMA = { type: 'object', properties: {
  id: { type: 'string' }, worktree: { type: 'string' }, branch: { type: 'string' }, base_sha: { type: 'string' }, head_sha: { type: 'string' },
  files: { type: 'array', items: { type: 'string' } }, summary: { type: 'string' },
  verified: { type: 'array', items: { type: 'string' } }, not_verified: { type: 'array', items: { type: 'string' } } },
  required: ['id', 'worktree', 'branch', 'base_sha', 'head_sha', 'files', 'summary', 'verified', 'not_verified'] }
const REVIEW_SCHEMA = { type: 'object', properties: {
  id: { type: 'string' }, verdict: { type: 'string', enum: ['ready', 'ready-with-notes', 'blocked'] },
  findings: { type: 'array', items: { type: 'string' } }, fixes_made: { type: 'array', items: { type: 'string' } },
  head_sha: { type: 'string' }, checks: { type: 'array', items: { type: 'string' } }, not_verified: { type: 'array', items: { type: 'string' } } },
  required: ['id', 'verdict', 'findings', 'fixes_made', 'head_sha', 'checks', 'not_verified'] }

const SAVE = (id, msg) => `Save your work so a container reset cannot lose it:
  rm -rf ${MAIN}/docs/work/patches/${id} && git format-patch <base_sha>..HEAD -o ${MAIN}/docs/work/patches/${id}/
  then, retrying up to five times on a lock or rejected push:
  git -C ${MAIN} add -A -- docs/work/patches/${id} docs/work/plan/units/${id}.md && git -C ${MAIN} commit -q -m "Work in progress: ${msg}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e" -- docs/work/patches/${id} docs/work/plan/units/${id}.md && git -C ${MAIN} pull -q --rebase origin claude/todo-implementation-hhp4bm && git -C ${MAIN} push -q origin claude/todo-implementation-hhp4bm
Do not commit screenshots to git; save them under ${MAIN}/docs/work/plan/shots/<ID>/ only (that folder is not committed).`

const COMMON = `You are working on one unit of the LiveWell master plan. Read, in order: ${MAIN}/CLAUDE.md (all of it), ${PLAN} sections 0, 2 and 9, your unit's card in section 10.6 and every section it points to, and ${NOTES} (decisions, including James's answers of 2026-10-26: writing is reviewed by sample per section; code merges once checks pass; ESV with an API key not yet available; header doors Study/Topics/Family/Essays/About; the Advent calendar kept and fixed). Wave 1 (U03 essay gate, U04 essay first screen, U06 cleanup, U09 the shared Scripture parser in client/src/lib/scripture-ref.ts and scripts/lib/bsb.mjs, U10 church-year rules and familyYear.generated.ts, U12 family repairs and validate-family.mjs, U14 Sheet/Stepper/PageHead) is merged: build on it.

Constraints that override the plan where they differ:
- This session may push only to the branch claude/todo-implementation-hhp4bm. Never push your worktree's branch and never open a PR. Work only in your git worktree, commit on its local branch.
- Units built in parallel this wave: ${SIBS}. Touch only the files your unit needs; additive edits to shared files (ci.yml, index.css, App.tsx) are fine.
- Do not edit anything under docs/work except your own unit file and patch folder, written to absolute paths under ${MAIN}/docs/work.
- Run "pnpm install --frozen-lockfile" first. Before you finish run pnpm check; npx eslint <touched files> --max-warnings 0; the affected tests, then the full pnpm test; every validator your change touches; pnpm build if you touch UI or build scripts; and, if you add or move a route, pnpm run sitemap && pnpm run prerender && pnpm run audit:canonicals plus the route checklist in plan 9.3. For a UI change, look at the changed pages at 390x844 and 1440x900 with Chromium (playwright at /opt/node22/lib/node_modules/playwright/index.mjs; find the chromium executable under /opt/pw-browsers; serve dist/public with npx serve -s dist/public -l <free port>; stub /api/trpc/* with {result:{data:{json:null}}}).
- Tokens only, no hex; literal SEOMeta; shared helpers; no em-dashes in new reader-facing text; no invented biography or quotations; new reader-facing writing is plain, in James's register (docs/VOICE-JAMES-BELL.md), and short.
Commit messages end with the trailers "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" and "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e". Write ${MAIN}/docs/work/plan/units/<ID>.md beginning "status: in review" (or "status: reviewed" after review), with what changed, what you verified and what you did not.`

const res = await pipeline(
  UNITS,
  (id) => agent(`${COMMON}

YOUR UNIT: ${id}. Build it as its card describes. If part of it depends on a unit not built yet, build the rest and say what you left out.
${SAVE(id, `${id} built`)}`, { label: `build:${id}`, phase: 'Build', schema: BUILD_SCHEMA, isolation: 'worktree' }),
  (b, id) => b ? agent(`${COMMON}

YOUR JOB: adversarially review and fix unit ${id}, built in the git worktree ${b.worktree} (branch ${b.branch}, base ${b.base_sha}). cd into it and work there. Builder's summary: ${JSON.stringify(b).slice(0, 4000)}
Review the diff (git diff ${b.base_sha}..HEAD) against the card: correctness, edge cases, conventions, accessibility and phone layout, tests and validators genuinely passing (run them yourself), and conflicts with the siblings beyond additive edits. Fix every real problem, commit, re-run the checks.
${SAVE(id, `${id} reviewed`)}
Return your verdict.`, { label: `review:${id}`, phase: 'Review', schema: REVIEW_SCHEMA }).then(r => ({ build: b, review: r })) : null,
)
return res.filter(Boolean)
