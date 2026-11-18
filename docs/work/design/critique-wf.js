export const meta = {
  name: 'livewell-design-critique',
  description: 'Photograph the current LiveWell site, then a panel of seven hard critics (each a different discipline) audits it, and one synthesis names what world-class would change',
  phases: [
    { title: 'Capture', detail: 'build main, render real content, screenshot every key page at phone and desktop' },
    { title: 'Critique', detail: 'seven critics, each a different discipline, read-only' },
    { title: 'Synthesize', detail: 'the verdict, what to keep, what to change first' },
  ],
}

const MAIN = '/home/user/Livewell-'
const WT = '/home/user/livewell-audit'
const SHOTS = MAIN + '/docs/work/design/shots/current'
const OUT = MAIN + '/docs/work/design/critique'

const CAPTURE = { type: 'object', properties: {
  pages: { type: 'array', items: { type: 'object', properties: {
    route: { type: 'string' }, phone: { type: 'string' }, desktop: { type: 'string' }, notes: { type: 'string' } },
    required: ['route', 'phone', 'desktop', 'notes'] } },
  inventory: { type: 'string' }, stubs: { type: 'string' }, not_captured: { type: 'array', items: { type: 'string' } } },
  required: ['pages', 'inventory', 'stubs', 'not_captured'] }
const CRIT = { type: 'object', properties: {
  lens: { type: 'string' }, verdict: { type: 'string' },
  findings: { type: 'array', items: { type: 'object', properties: {
    page: { type: 'string' }, problem: { type: 'string' }, why_it_matters: { type: 'string' },
    world_class_version: { type: 'string' }, severity: { type: 'string', enum: ['critical', 'major', 'minor'] } },
    required: ['page', 'problem', 'why_it_matters', 'world_class_version', 'severity'] } },
  keep: { type: 'array', items: { type: 'string' } } },
  required: ['lens', 'verdict', 'findings', 'keep'] }

phase('Capture')
const cap = await agent(`You photograph the current LiveWell site so a panel of design critics can judge it. Read ${MAIN}/CLAUDE.md first.
Set up a clean build of what is live now, in your own worktree:
  git -C ${MAIN} fetch -q origin main; if [ -d ${WT} ]; then git -C ${WT} checkout -q --detach origin/main; else git -C ${MAIN} worktree add --detach ${WT} origin/main; fi
  cd ${WT} && pnpm install --frozen-lockfile && pnpm build
Serve dist/public (npx serve -s dist/public -l <free port>) and drive Chromium with playwright (/opt/node22/lib/node_modules/playwright/index.mjs; chromium under /opt/pw-browsers). The site reads essays, books and settings from /api/trpc; the database is not reachable here, so intercept /api/trpc/* and answer from real committed content where it exists so the pages look the way readers see them: posts lists and posts.getBySlug from ${WT}/content/static-library.generated.json (array of {slug,title,body}; shape each response to what the calling page reads; read the client code for the procedure's shape) and the shelf in client/src/lib/shelf.json; anything else {result:{data:{json:null}}}. Say exactly what you stubbed and how.
Capture full-page screenshots at 390x844 and 1440x900 (PNG, device scale 1) of at least: /, /study, /study/bible (and one open chapter, e.g. John 1), /writing, two essays (one long), /books, /resources, /tools and three of the most-used tools, /family, /family/tonight, /family/devotions, /theology/history, a creed page, a context guide, /help and one /help/<topic> page, /about, /subscribe, /search?q=grace, and the header menu open on phone. Save as ${SHOTS}/<route-slug>-phone.png and -desktop.png. Also capture the first screen only (viewport, not full page) of the same pages at 390x844 as -phone-first.png: the first screen is what a visitor judges.
Write ${MAIN}/docs/work/design/critique/INVENTORY.md: for each captured page, its route, purpose, and its structure as text (headings in order, primary links and buttons, the first screen's words), plus total page height at phone width. Return the list.`, { label: 'capture', phase: 'Capture', schema: CAPTURE })
if (!cap) return { capture: null }

const BASE = `You are on a panel of the most demanding designers and educators in the world, hired by James Bell to judge his site LiveWell before a redesign. He wants it to be "the most organized, well-designed website that helps people to study the Bible, to understand doctrine, to understand what a post-Christian world is in America, and how to live it ... tools and resources ... elite and world-class ... very critical of what currently is ... interactive, things that draw people's attention ... a useful tool to study and learn and grow." Read ${MAIN}/CLAUDE.md (the brand contract: palette, type, the emotional brief "Unhurried. Weighted. Grown-up.", audiences ranked skeptic first) and ${MAIN}/docs/work/design/critique/INVENTORY.md, then LOOK at the screenshots in ${SHOTS}/ (Read each PNG; at least every -phone-first.png and the full-page shots your lens needs). Stubs used: ${cap.stubs.slice(0, 1500)}. Be specific and unsparing: name the page, the element, what is wrong, why it costs the reader, and what the world-class version looks like (name the product that does it best when you know one). Credit what already works; James should keep it. You are read-only: write only your own report file.`

const LENSES = [
  ['editorial', 'Editorial and typographic director (think a design director of a great magazine or a book publisher): hierarchy, reading experience, type scale and rhythm, measure, white space, image use, how an essay page and an index page read, whether the site feels like opening a serious book in a quiet room.'],
  ['product', 'Product and interaction designer for learning tools (think the people behind the best Bible apps, Sefaria, Readwise, Brilliant): are the tools genuinely useful, is studying here faster and deeper than elsewhere, what interactions are missing (cross-references, notes, highlights, progress, comparison, timelines, maps), what is friction.'],
  ['ia', 'Information architect: is it organized? Navigation, labels, the five doors, wayfinding, how a first-time visitor finds the Bible, doctrine, post-Christian living, church history, family, tools; dead ends, duplicates, orphan pages, the search experience, the footer.'],
  ['mobile', 'Mobile and accessibility specialist: thumbs-first layout, tap targets, first screen at 390px, performance feel, contrast, focus order, motion, reading at night, what breaks or wastes the phone screen.'],
  ['brand', 'Brand and visual identity critic: does it look elite and distinctive or templated, does it hold the palette and type contract, is mustard punctuation or paint, does it have a signature visual language (iconography, illustration, data graphics, photography), does it draw attention without shouting.'],
  ['learning', 'Learning scientist and theological educator: does the site actually teach and form (symptom to cause to wisdom), sequencing and paths, retrieval and reflection, scaffolding for a beginner versus a pastor, how doctrine and history are taught, whether a reader would grow over twelve weeks here.'],
  ['visitor', 'A skeptical first-time visitor, intelligent and a little wounded by church, arriving from a search for "what does post-Christian mean": what you see in the first 3 seconds, the first 30, whether you trust it, whether you stay, what you would do next, and what would make you come back. Narrate your path page by page from the screenshots.'],
]

phase('Critique')
const crits = await parallel(LENSES.map(([key, who]) => () => agent(`${BASE}

YOUR LENS: ${who}
Write ${OUT}/${key}.md: your verdict in one paragraph, then findings page by page (critical, major, minor), then what to keep. Return the structured version.`, { label: `critic:${key}`, phase: 'Critique', schema: CRIT })))
const got = crits.filter(Boolean)
log(`${got.length}/7 critics reported; ${got.reduce((n, c) => n + c.findings.filter((f) => f.severity === 'critical').length, 0)} critical findings`)

phase('Synthesize')
const synth = await agent(`You chair the panel that judged James Bell's site LiveWell. Read ${MAIN}/CLAUDE.md's brand contract, ${MAIN}/docs/work/design/critique/INVENTORY.md, and the seven reports in ${OUT}/ (editorial, product, ia, mobile, brand, learning, visitor). Their structured findings: ${JSON.stringify(got).slice(0, 60000)}
Write ${MAIN}/docs/work/design/CRITIQUE.md: (1) the verdict in plain words, as James would want it said to him: what the site is today and how far it is from world-class; (2) the ten problems that matter most, merged across critics, each with the pages, why it matters, and the world-class version; (3) page-by-page verdicts in a table (page, keep, change, severity); (4) what to keep, so the redesign does not throw away what works; (5) questions the redesign must answer. Then commit only the critique text (not screenshots): git -C ${MAIN} add docs/work/design/CRITIQUE.md docs/work/design/critique && git -C ${MAIN} commit -q -m "Work in progress: design critique of the current site" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e" -- docs/work/design/CRITIQUE.md docs/work/design/critique && git -C ${MAIN} pull -q --rebase origin claude/todo-implementation-hhp4bm && git -C ${MAIN} push -q origin claude/todo-implementation-hhp4bm (retry up to five times). Return sections 1 and 2.`, { label: 'synthesize', phase: 'Synthesize' })

return { pages: cap.pages.length, not_captured: cap.not_captured, critics: got.map((c) => ({ lens: c.lens, critical: c.findings.filter((f) => f.severity === 'critical').length, major: c.findings.filter((f) => f.severity === 'major').length })), synthesis: synth }
