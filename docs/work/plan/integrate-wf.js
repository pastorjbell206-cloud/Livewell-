export const meta = {
  name: 'livewell-integrate-wave',
  description: 'Merge a wave of reviewed LiveWell units in order in a dedicated worktree, close the seams between them, run every gate, then three reviewers and one fix pass; pushes to the work branch',
  phases: [
    { title: 'Integrate', detail: 'merge unit branches in order, resolve seams, regenerate, gate' },
    { title: 'Review', detail: 'seams and correctness, the pages as readers see them, gates and performance' },
    { title: 'Fix', detail: 'judge findings, fix, re-gate, push' },
  ],
}

// args: { wave, units: [{id, branch}] (merge order), followups: '...' }
const MAIN = '/home/user/Livewell-'
const WT = '/home/user/livewell-integrate'
const SHOTS = MAIN + '/docs/work/plan/shots/' + args.wave.replace(/\s+/g, '-')
const TRAILERS = `-m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e"`
const PUSH = `timeout 120 git -C ${WT} push origin HEAD:claude/todo-implementation-hhp4bm; if rejected (other sessions push docs/work commits to that branch), timeout 120 git -C ${WT} pull --no-rebase --no-edit origin claude/todo-implementation-hhp4bm, keep both sides (they only touch docs/work), and push again, up to five tries`
const GATES = `every command in .github/workflows/ci.yml's content-gates step exactly as CI runs it, then pnpm check, pnpm test, pnpm build, and pnpm run sitemap && pnpm run prerender && pnpm run audit:canonicals; npx eslint --max-warnings 0 on every client and server file the wave touched`
const UNITS = args.units.map((u) => `${u.id} (local branch ${u.branch}; its unit file ${MAIN}/docs/work/plan/units/${u.id}.md)`).join('; ')

const RESULT = { type: 'object', properties: {
  head_sha: { type: 'string' }, merged: { type: 'array', items: { type: 'string' } }, seams: { type: 'array', items: { type: 'string' } },
  followups_done: { type: 'array', items: { type: 'string' } }, gates: { type: 'array', items: { type: 'string' } },
  screenshots: { type: 'array', items: { type: 'string' } }, not_verified: { type: 'array', items: { type: 'string' } } },
  required: ['head_sha', 'merged', 'seams', 'followups_done', 'gates', 'screenshots', 'not_verified'] }
const FINDINGS = { type: 'object', properties: {
  lens: { type: 'string' }, findings: { type: 'array', items: { type: 'object', properties: {
    where: { type: 'string' }, problem: { type: 'string' }, evidence: { type: 'string' }, fix: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] } },
    required: ['where', 'problem', 'evidence', 'fix', 'severity'] } }, clean: { type: 'array', items: { type: 'string' } } },
  required: ['lens', 'findings', 'clean'] }

phase('Integrate')
const integ = await agent(`You integrate ${args.wave} of the LiveWell master plan: units built and reviewed in parallel, each on its own local branch, now merged together and made to work as one. Read ${MAIN}/CLAUDE.md, then every unit file named below (each lists its seams with siblings and its follow-ups).
Set up your own worktree so you never disturb the shared checkout, where other agents commit docs:
  timeout 120 git -C ${MAIN} fetch -q origin claude/todo-implementation-hhp4bm main
  if [ -d ${WT} ]; then git -C ${WT} checkout -q -B integrate origin/claude/todo-implementation-hhp4bm; else git -C ${MAIN} worktree add -B integrate ${WT} origin/claude/todo-implementation-hhp4bm; fi
  cd ${WT} && git merge --no-edit origin/main (if main moved) && pnpm install --frozen-lockfile
Merge in this order with git merge --no-ff (message "Merge <ID>: <title>" plus the trailers ${TRAILERS}): ${UNITS}.
After each merge: resolve conflicts so both units keep their behavior (read both sides and both unit files; never drop a feature to make a conflict go away), regenerate every generated file with the repo's own builders rather than by hand (build-family-index, build-family-year, build-search-index, build-bible-text, build-essays-index, build-topics-index, build-story-plan and any other build-*.mjs whose inputs changed, each followed by its --check), and run pnpm check and the touched tests before the next merge.
Then close the seams the unit files name (for example a strand file's shape read by another unit's loop, titles read through a shared helper, two units editing the same validator, a menu link to a route another unit added, a Home door to a page another unit built) and do these follow-ups: ${args.followups}.
Then run ${GATES}. Fix what fails with the smallest change and say what. Look at the changed pages in Chromium at 390x844 and 1440x900 (playwright at /opt/node22/lib/node_modules/playwright/index.mjs; chromium under /opt/pw-browsers; serve dist/public with npx serve -s dist/public -l <free port>; stub /api/trpc/* with {result:{data:{json:null}}}): at least the home page, the header menus open on phone and desktop, every new route, and every page two units both changed; save to ${SHOTS}/ (not committed). Commit any fixes (list paths, trailers), then ${PUSH}. Report every gate's result plainly and what you could not verify.`, { label: 'integrate', phase: 'Integrate', schema: RESULT })
if (!integ) return { integrate: null }

const BASE = `You review the integrated ${args.wave} of LiveWell on the branch claude/todo-implementation-hhp4bm, worktree ${WT} (read-only for you: write only your own report). The integrator's report: ${JSON.stringify(integ).slice(0, 6000)}. The units: ${UNITS}. Read ${MAIN}/CLAUDE.md. The diff to review is git -C ${WT} diff origin/main...HEAD -- . ':!docs/work'.`
const LENSES = [
  ['seams', 'Correctness across units: where two units meet (shared files, shared data shapes, generated files, validators, routes, nav, search sources, storage keys), find behavior one unit broke for another, logic errors, edge cases (dates, empty data, hidden flags), and anything the integrator resolved by dropping a feature. Run the targeted tests yourself.'],
  ['reader', 'The pages as readers see them: build and serve the worktree (or use its dist if current), and in Chromium at 390x844 and 1440x900 walk the home page, the header menus, every new route and every changed page as a first-time visitor and as a parent at 9 p.m.; check copy for the brand contract (tokens, mustard as punctuation, no em-dashes in new copy, Forbidden Language), tap targets of 44 px, focus order, no sideways scroll, and that nothing promises what is not there.'],
  ['gates', 'Gates and performance: rerun every content gate, pnpm check, pnpm test (twice, to catch flakes), pnpm build and the canonical audit yourself; run Lighthouse with the flags in .github/workflows/ci.yml on the home page and two new routes (compare to main if it regressed), and axe if available; check the entry bundle size against main; check api/index.ts and server/ parity for any procedure the wave touched (server/api-parity.test.ts).'],
]
phase('Review')
const reviews = (await parallel(LENSES.map(([key, q]) => () => agent(`${BASE}
YOUR LENS: ${q}
Write ${MAIN}/docs/work/plan/review-${args.wave.replace(/\s+/g, '-')}-${key}.md and return the structured findings, each with the evidence you saw.`, { label: `review:${key}`, phase: 'Review', schema: FINDINGS })))).filter(Boolean)
const n = reviews.reduce((a, r) => a + r.findings.length, 0)
log(`${n} findings, ${reviews.reduce((a, r) => a + r.findings.filter((f) => f.severity === 'blocker').length, 0)} blockers`)

phase('Fix')
const fix = await agent(`You fix the integrated ${args.wave} of LiveWell in the worktree ${WT} (branch integrate, tracking claude/todo-implementation-hhp4bm): first timeout 120 git -C ${WT} pull --no-rebase --no-edit origin claude/todo-implementation-hhp4bm. Read ${MAIN}/CLAUDE.md. Three reviewers reported findings in ${MAIN}/docs/work/plan/review-${args.wave.replace(/\s+/g, '-')}-*.md (${n} in all); read every one in full. Reproduce each blocker and major finding before fixing it; fix the real ones with the smallest change, reject the wrong ones with the reason, and fix minor ones that are cheap and plainly right. Then run ${GATES}, look again at any page you changed (Chromium, 390 and 1440), commit (list paths, trailers ${TRAILERS}) and ${PUSH}. Return what you fixed, what you rejected and why, every gate's result, and what remains unverified, as markdown.`, { label: 'fix', phase: 'Fix' })

return { integrate: integ, reviews: reviews.map((r) => ({ lens: r.lens, blockers: r.findings.filter((f) => f.severity === 'blocker').length, major: r.findings.filter((f) => f.severity === 'major').length, minor: r.findings.filter((f) => f.severity === 'minor').length })), fix }
