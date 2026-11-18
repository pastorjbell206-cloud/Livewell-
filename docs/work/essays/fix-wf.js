export const meta = {
  name: 'livewell-essay-final-fixes',
  description: 'Apply final-read findings to landed LiveWell essays one essay at a time in the landing worktree, then rebuild, audit and look at each changed essay',
  phases: [
    { title: 'Fix', detail: 'one essay at a time, judged and applied in the draft, re-landed' },
    { title: 'Check', detail: 'gates, build, canonical audit, screenshots, push' },
  ],
}

// args: { essays: [{slug, section?}], findingsDir }
const MAIN = '/home/user/Livewell-'
const WT = '/home/user/livewell-land'
const TRAILERS = `-m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e"`
const PUSH = `git -C ${WT} push origin HEAD:claude/essays; if rejected, git -C ${WT} pull --rebase=merges origin claude/essays and push again, up to five tries`
const FIX = { type: 'object', properties: {
  slug: { type: 'string' }, applied: { type: 'array', items: { type: 'string' } }, rejected: { type: 'array', items: { type: 'string' } },
  already_done: { type: 'array', items: { type: 'string' } }, for_james: { type: 'array', items: { type: 'string' } }, head_sha: { type: 'string' } },
  required: ['slug', 'applied', 'rejected', 'already_done', 'for_james', 'head_sha'] }

phase('Fix')
const fixes = []
for (const e of args.essays) {
  const r = await agent(`You make the final fixes to one of James Bell's essays before it goes public: "${e.slug}". Work in the git worktree ${WT} (local branch land, which tracks claude/essays); first run git -C ${WT} pull --rebase=merges origin claude/essays. Read ${MAIN}/docs/work/essays/BRIEF.md and CLAUDE.md's voice and integrity sections.

Two read-only readers (a voice reader and a fact auditor) reported findings on the published text. They are in ${args.findingsDir}/${e.slug}.json; read the whole file. Judge each finding yourself against the current draft (${WT}/docs/work/essays/${e.slug}.md), its ledger (${WT}/docs/work/essays/ledgers/${e.slug}.md) and the brief. Apply the real ones; reject the wrong or stylistically doubtful ones and say why; never restructure the essay or change its argument; keep James's register (plain, developed paragraphs, no em-dashes outside quotations, no announced turns, no rulebook leakage). Integrity findings of severity "must" are applied unless you can show they are wrong. A finding whose fix is already in the text goes under already_done. A restoration (the writer's original, more specific wording confirmed by a source the ledger records) is applied when the ledger shows the source was actually seen. Where a fact changes, update the ledger. Do not add biography beyond docs/work/NOTES.md's confirmed facts; a question only James can answer goes in for_james as one plain sentence.

Then re-land: cd ${WT} && node scripts/land-essays.mjs ${e.section ? `--section ${e.section} ` : ''}${e.slug} && node scripts/build-essays-index.mjs, and confirm the draft body and the published JSON body are identical. Run node scripts/validate-essays.mjs, node scripts/validate-no-emdash.mjs, node scripts/validate-grow-voice.mjs and node scripts/validate-links.mjs. Commit only this essay's draft, ledger, published JSON and the generated index if it changed, message "Essays: final read fixes, ${e.slug}" with the trailers ${TRAILERS}; then ${PUSH}.`, { label: `fix:${e.slug}`, phase: 'Fix', schema: FIX })
  fixes.push(r)
}

phase('Check')
const check = await agent(`Final check of the landed essays on claude/essays, in the worktree ${WT}: git -C ${WT} pull --rebase=merges origin claude/essays. Run every command in .github/workflows/ci.yml's content-gates step exactly as CI does, then pnpm check, pnpm test, pnpm build, and pnpm run sitemap && pnpm run prerender && pnpm run audit:canonicals. Fix anything that fails (smallest change; say what). Then serve dist/public (npx serve -s dist/public -l <free port>), stub /api/trpc/* with {result:{data:{json:null}}}, and with Chromium (playwright at /opt/node22/lib/node_modules/playwright/index.mjs, chromium under /opt/pw-browsers) open each of these essays at 390x844 and 1440x900: ${args.essays.map((e) => '/writing/' + e.slug).join(', ')}, plus /writing/what-christian-nationalism-is-and-is-not. Confirm the title, standfirst, headings, Scripture references and Closing Texts render, there is no raw Markdown and no sideways scroll. Save screenshots to ${MAIN}/docs/work/plan/shots/land/final/ (not committed). Commit only if you changed something (list paths, trailers ${TRAILERS}) and ${PUSH}. Report every gate's result plainly.`, { label: 'check', phase: 'Check' })

return { fixes, check }
