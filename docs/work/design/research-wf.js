export const meta = {
  name: 'livewell-design-research',
  description: 'One wave of niche and best-in-class design research for the LiveWell redesign: researchers per cluster, then a wave synthesis with a completeness check',
  phases: [
    { title: 'Research', detail: 'one researcher per cluster, web search plus open-source code' },
    { title: 'Synthesize', detail: 'merge the wave, rank stealable patterns, name what is missing' },
  ],
}

// args: { wave: 'A', title: '...', clusters: [{ key, focus, products }] , searches: 40 }
const MAIN = '/home/user/Livewell-'
const OUT = MAIN + '/docs/work/design/research'
const SEARCHES = args.searches || 40

const FINDINGS = { type: 'object', properties: {
  key: { type: 'string' },
  products_covered: { type: 'array', items: { type: 'string' } },
  top_patterns: { type: 'array', items: { type: 'object', properties: {
    name: { type: 'string' }, seen_in: { type: 'string' }, what_it_is: { type: 'string' },
    why_it_works: { type: 'string' }, livewell_application: { type: 'string' },
    fit: { type: 'string', enum: ['core', 'strong', 'maybe'] }, effort: { type: 'string', enum: ['S', 'M', 'L'] },
    evidence: { type: 'string' } },
    required: ['name', 'seen_in', 'what_it_is', 'why_it_works', 'livewell_application', 'fit', 'effort', 'evidence'] } },
  avoid: { type: 'array', items: { type: 'string' } },
  could_not_see: { type: 'array', items: { type: 'string' } },
  searches_used: { type: 'integer' } },
  required: ['key', 'products_covered', 'top_patterns', 'avoid', 'could_not_see', 'searches_used'] }

const CONTEXT = `LiveWell (www.livewellbyjamesbell.co) is James Bell's site: a pastor who came to faith from atheism, writing for skeptics, doubting Christians, pastors and people trying to live well. James's brief for the redesign, in his words: "the most organized, well-designed website that helps people to study the Bible, to understand doctrine, to understand what a post-Christian world is in America, and how to live it ... tools and resources available ... elite and world-class, made by some of the best designers in the world, very critical of what currently is, with a fresh vision ... interactive, with things that draw people's attention ... a useful tool for people to study and learn and grow." Read ${MAIN}/CLAUDE.md (brand contract: palette, typography, the emotional brief "Unhurried. Weighted. Grown-up.", audiences) and ${MAIN}/docs/work/plan/benchmark.md (earlier research: go beyond it, do not repeat it). Skim ${MAIN}/docs/work/plan/MASTER-PLAN.md sections 0 to 3 for what is already planned.

How to see products from this sandbox: direct page fetches fail (curl and WebFetch cannot resolve outside hosts). Use WebSearch (ToolSearch "select:WebSearch"; mode "standard", "extended" for hard items), aiming at sources that describe the product in detail: its own help-center and feature pages, release notes, design case studies (the agency's or designer's write-up, Awwwards, Behance, Dribbble, Figma community), conference talks, reviews, app-store descriptions, press. raw.githubusercontent.com and git clone DO work: where a product is open source (for example Sefaria-Project on GitHub, STEPBible), read its code and copy for real structure (routes, components, UI strings). Clone into /tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/design-src/ and reuse what is there. Budget: about ${SEARCHES} searches. Never describe a feature you did not see described; put unknowns under could_not_see.`

phase('Research')
const results = await parallel(args.clusters.map((c) => () => agent(`${CONTEXT}

YOUR CLUSTER: ${c.key}. ${c.focus}
Products to study (add any better one you find; drop one only if nothing about it can be seen): ${c.products.join('; ')}.

For each product: who it serves; its information architecture (top-level sections, how a reader finds things); signature features and the interaction patterns behind them (what the user does, what happens); visual and typographic choices where described; how it holds attention and builds a habit without cheapening the content; what is genuinely excellent and stealable, and what is weak. Then rank the 10 to 15 patterns most worth bringing to LiveWell, each with a concrete description of how it would look and work on LiveWell (which page, what the reader does), its fit, and its effort. Then what to avoid (patterns that would betray "Unhurried. Weighted. Grown-up." or the integrity rules: gamified streak pressure, engagement bait, infinite feeds, cheap badges).

Write the full report to ${OUT}/${args.wave}-${c.key}.md (product sections, then the ranked patterns, the avoid list, and an evidence list of every source with what it showed). Return the structured findings.`, { label: `research:${c.key}`, phase: 'Research', schema: FINDINGS })))

const done = results.filter(Boolean)
log(`${done.length}/${args.clusters.length} clusters reported; ${done.reduce((n, r) => n + r.top_patterns.length, 0)} patterns`)

phase('Synthesize')
const synth = await agent(`You synthesize wave ${args.wave} (${args.title}) of the design research for the LiveWell redesign. Read ${MAIN}/CLAUDE.md's brand contract and James's brief: ${CONTEXT.slice(0, 1200)}

The cluster reports are in ${OUT}/${args.wave}-*.md; their structured findings: ${JSON.stringify(done).slice(0, 50000)}

Write ${OUT}/${args.wave}-SYNTHESIS.md:
1. The patterns that recur across the best products in this wave (what world-class means here), with the products that do each best.
2. A ranked list of the 15 to 25 patterns most worth bringing to LiveWell, merged and de-duplicated, each with: what it is, where it is done best, how it would work on LiveWell, fit and effort, and the evidence.
3. The tensions: where "draw people's attention" pulls against "Unhurried. Weighted. Grown-up.", and how the best products resolve it.
4. Completeness: what this wave could not see or did not cover that a later wave or James's widened network access should check (be specific: product, page, question).
Then commit only the research folder: git -C ${MAIN} add docs/work/design/research && git -C ${MAIN} commit -q -m "Work in progress: design research wave ${args.wave}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e" -- docs/work/design/research && git -C ${MAIN} pull -q --rebase origin claude/todo-implementation-hhp4bm && git -C ${MAIN} push -q origin claude/todo-implementation-hhp4bm (retry up to five times on a lock or a rejected push). Return the markdown of section 2 and section 4.`, { label: 'synthesize', phase: 'Synthesize' })

return { clusters: done.map((r) => ({ key: r.key, products: r.products_covered.length, patterns: r.top_patterns.length, searches: r.searches_used, could_not_see: r.could_not_see.length })), synthesis: synth }
