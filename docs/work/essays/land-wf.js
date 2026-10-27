export const meta = {
  name: 'livewell-land-essays',
  description: 'Land finished LiveWell essays on claude/essays: publish files, shelf, 301s, gates, screenshots; then a two-lens final read per essay and one fix pass',
  phases: [
    { title: 'Land', detail: 'merge main, land the essays, redirects, every gate, screenshots' },
    { title: 'Read', detail: 'per essay: a voice reader and an integrity auditor, read-only' },
    { title: 'Fix', detail: 'judge every finding, apply the real ones, re-land, re-gate' },
  ],
}

// args: { essays: [{slug, section?}], redirects: [{from, to}], extra: '...', label: 'pilots' }
const MAIN = '/home/user/Livewell-'
const WT = '/home/user/livewell-land'
const ESSAYS = args.essays
const SLUGS = ESSAYS.map((e) => e.slug)
const REDIRECTS = args.redirects || []
const EXTRA = args.extra || ''
const TRAILERS = `-m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e"`

const LAND_SCHEMA = { type: 'object', properties: {
  head_sha: { type: 'string' }, merged_main: { type: 'boolean' }, landed: { type: 'array', items: { type: 'string' } },
  redirects: { type: 'array', items: { type: 'string' } }, other_changes: { type: 'array', items: { type: 'string' } },
  gates: { type: 'array', items: { type: 'string' } }, screenshots: { type: 'array', items: { type: 'string' } },
  not_verified: { type: 'array', items: { type: 'string' } } },
  required: ['head_sha', 'merged_main', 'landed', 'redirects', 'other_changes', 'gates', 'screenshots', 'not_verified'] }
const READ_SCHEMA = { type: 'object', properties: {
  slug: { type: 'string' }, lens: { type: 'string' },
  findings: { type: 'array', items: { type: 'object', properties: {
    where: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' }, severity: { type: 'string', enum: ['must', 'should', 'consider'] } },
    required: ['where', 'problem', 'fix', 'severity'] } },
  clean_checks: { type: 'array', items: { type: 'string' } } },
  required: ['slug', 'lens', 'findings', 'clean_checks'] }
const FIX_SCHEMA = { type: 'object', properties: {
  head_sha: { type: 'string' }, applied: { type: 'array', items: { type: 'string' } },
  rejected: { type: 'array', items: { type: 'string' } }, gates: { type: 'array', items: { type: 'string' } },
  for_james: { type: 'array', items: { type: 'string' } }, not_verified: { type: 'array', items: { type: 'string' } } },
  required: ['head_sha', 'applied', 'rejected', 'gates', 'for_james', 'not_verified'] }

const PUSH = `push to origin claude/essays: git -C ${WT} push origin HEAD:claude/essays; if rejected, git -C ${WT} pull --rebase=merges origin claude/essays (keep the merge from main; other sessions push essay ledger commits to that branch; they touch only docs/work/essays/*.md and ledgers, so keep both sides) and push again, up to five tries`

phase('Land')
const land = await agent(`You land finished LiveWell essays so they go public. Read ${MAIN}/docs/work/essays/BRIEF.md, ${MAIN}/docs/work/NOTES.md, and the U05 card in ${MAIN}/docs/work/plan/MASTER-PLAN.md (search "U05 Ship the five pilots") first.

Work in your own git worktree so you never touch the files other agents are editing in /home/user/livewell-essays:
  git -C ${MAIN} fetch -q origin claude/essays main
  if [ -d ${WT} ]; then git -C ${WT} checkout -q -B land origin/claude/essays; else git -C ${MAIN} worktree add -B land ${WT} origin/claude/essays; fi
  cd ${WT} && git merge --no-edit origin/main   (resolve any conflict keeping both sides' intent; main's code wins on code, the branch wins on docs/work/essays)
  pnpm install --frozen-lockfile

The essays (drafts in docs/work/essays/<slug>.md, claims ledgers in docs/work/essays/ledgers/<slug>.md): ${JSON.stringify(ESSAYS)}.
1. Land them with scripts/land-essays.mjs (pass --section <section> for each one that names a section; it adds a pending shelf entry; the published file makes it public). Then node scripts/build-essays-index.mjs.
2. Permanent redirects in vercel.json for slugs these essays absorb, in the existing /writing/<slug> redirect format and next to the others: ${JSON.stringify(REDIRECTS)}. Only where the old slug is not itself on the shelf (client/src/lib/shelf.json) and the destination is now public; say which you skipped and why.
3. ${EXTRA || 'No other changes.'}
4. Run every content gate in .github/workflows/ci.yml's content-gates step exactly as CI does, then pnpm check, pnpm test, pnpm build, and the canonical audit (pnpm run sitemap && pnpm run prerender && pnpm run audit:canonicals). Fix what fails and say what you fixed. Watch for: em-dashes outside quotations (validate-no-emdash), forbidden words (grow-voice, validate-essays), links that land on a retired essay (validate-links).
5. Look at each landed essay at 390x844 and 1440x900 in Chromium (playwright at /opt/node22/lib/node_modules/playwright/index.mjs; chromium under /opt/pw-browsers; serve dist/public with npx serve -s dist/public -l <free port>; stub /api/trpc/* with {result:{data:{json:null}}} and, if the essay page needs a post to render the rewrite, stub posts.getBySlug with the minimal shape ArticleDetail.tsx reads). Check: the title, standfirst and first paragraph render; headings and Scripture references render; the Closing Texts block renders; no raw Markdown. Also look at /writing?section=<each section touched>. Save screenshots under ${MAIN}/docs/work/plan/shots/land/ (not committed).
6. Commit only the files this job changed (never git add -A; list paths), message "Essays: land ${SLUGS.join(', ')}" with the trailers ${TRAILERS}, then ${PUSH}.
Report what you did and what you did not verify.`, { label: 'land', phase: 'Land', schema: LAND_SCHEMA })

if (!land) return { land: null }

phase('Read')
const LENSES = [
  { key: 'voice', prompt: (slug) => `You are the last reader before James Bell's essay "${slug}" goes public on his site. You are read-only: do not edit any file. Read ${WT}/client/public/essays/${slug}.json (the published text; the body is Markdown) against ${MAIN}/docs/work/essays/BRIEF.md (the register, the stamps, the AI tells the judges caught, the integrity rules, biography), ${MAIN}/docs/VOICE-JAMES-BELL.md, and CLAUDE.md's Forbidden Language list (literal search, every word and phrase). Read it aloud in your head as the skeptic he writes toward and as a pastor deciding whether to hand it to a congregation. Report every place that fails: forbidden language, rulebook leakage, announced turns, aphoristic closers, tidy triplets, a stamp used more than once, a scholar parade, biography beyond the confirmed facts or used as a credential, any statement of his title, years, book count or Southern Baptist membership, an exclamation point outside quoted Scripture, an em-dash outside a quotation, a heading that is literary rather than plain, a standfirst that is a balanced antithesis, political criticism that fires in only one direction, a contested second-order question where the essay asserts his position, an ending that recaps instead of leaving weight, a crisis-facing passage without a path to help. For each, quote the exact words, say what is wrong, and give the exact replacement text in his register (as small as possible; never restructure). Also list the checks that came back clean.` },
  { key: 'integrity', prompt: (slug) => `You audit the facts in James Bell's essay "${slug}" before it goes public. You are read-only: do not edit any file. Read ${WT}/client/public/essays/${slug}.json (published text) and its claims ledger ${WT}/docs/work/essays/ledgers/${slug}.md. Go through the essay sentence by sentence and list every checkable claim: each quotation (Scripture or not), number, date, name, title of a book or study, and attribution of a view to a real person. For each, find its ledger line. Report: (a) a claim with no ledger line; (b) a ledger line still marked unverified, not checked, open, or resting on memory, where the essay still states the claim as fact or keeps quotation marks; (c) a mismatch between the ledger (including its corrections and generalizations) and the essay text; (d) a quotation whose punctuation or wording in the essay differs from what the ledger says was matched; (e) Scripture not in ESV form or missing its reference, or a reference that does not match the verse (check the verse's sense in ${WT}/client/public/bible/ch/ where the BSB text is); (f) any sentence about a living person that could be unfair or unsupported. You may run up to 30 web searches (ToolSearch "select:WebSearch") on the riskiest open items; say what you saw. For each finding give the exact fix: the corrected text, or the generalized wording, or "cut the sentence", following the integrity rules in ${MAIN}/docs/work/essays/BRIEF.md. Also list what you checked that was clean.` },
]
const reads = await parallel(SLUGS.flatMap((slug) => LENSES.map((l) => () =>
  agent(l.prompt(slug), { label: `read:${l.key}:${slug}`, phase: 'Read', schema: READ_SCHEMA }))))
const findings = reads.filter(Boolean)
const total = findings.reduce((n, r) => n + r.findings.length, 0)
log(`${total} findings across ${findings.length} reads`)

phase('Fix')
const fix = await agent(`You make the final fixes to James Bell's essays before they go public. Work in the git worktree ${WT} (branch land, tracking claude/essays): git -C ${WT} pull --rebase origin claude/essays first (use --rebase=merges). Read ${MAIN}/docs/work/essays/BRIEF.md and CLAUDE.md's voice and integrity sections.

Readers (a voice reader and an integrity auditor per essay) reported these findings, read-only:
${JSON.stringify(findings, null, 1).slice(0, 60000)}

Judge each finding yourself against the essay text, the ledger, and the brief: apply the real ones, reject the wrong or stylistically doubtful ones (say why), and never restructure an essay or change its argument. Integrity findings of severity "must" are applied unless you can show they are wrong. Make every change in the DRAFT (docs/work/essays/<slug>.md) and, where a fact changed, its ledger; then re-run scripts/land-essays.mjs for the changed slugs (with the same --section flags as before: ${JSON.stringify(ESSAYS)}) and node scripts/build-essays-index.mjs, so draft and published file stay identical. Re-run the content gates from ci.yml, pnpm check, and pnpm test. Commit only the files you changed, message "Essays: final read fixes" with the trailers ${TRAILERS}, then ${PUSH}.
Also list, in for_james, anything only James can decide (his own position on a contested question, a biographical detail, a judgment call on tone), each in one plain sentence.`, { label: 'fix', phase: 'Fix', schema: FIX_SCHEMA })

return { land, reads: findings.map((r) => ({ slug: r.slug, lens: r.lens, n: r.findings.length, must: r.findings.filter((f) => f.severity === 'must').length })), fix }
