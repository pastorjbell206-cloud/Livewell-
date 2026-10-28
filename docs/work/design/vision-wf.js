export const meta = {
  name: 'livewell-design-vision',
  description: 'Four independent design directions for the LiveWell redesign, judged from six seats, merged into one vision, attacked by three critics, and revised',
  phases: [
    { title: 'Directions', detail: 'four directors, each from a different starting conviction' },
    { title: 'Judge', detail: 'six judges score every direction and name what to graft' },
    { title: 'Synthesize', detail: 'one vision from the winner plus the best grafts' },
    { title: 'Attack', detail: 'three critics try to break the vision' },
    { title: 'Revise', detail: 'answer every attack, final VISION.md and prototype brief' },
  ],
}

const MAIN = '/home/user/Livewell-'
const D = MAIN + '/docs/work/design'
const COMMIT = (msg, paths) => `git -C ${MAIN} add ${paths} && git -C ${MAIN} commit -q -m "${msg}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e" -- ${paths} && git -C ${MAIN} pull -q --rebase origin claude/todo-implementation-hhp4bm && git -C ${MAIN} push -q origin claude/todo-implementation-hhp4bm (retry up to five times; a fetch can hang on the network, so wrap it in timeout 90)`

const BRIEF = `James Bell's brief for LiveWell (www.livewellbyjamesbell.co), in his words: "I want Live Well to be the most organized design, well-designed website that helps people to study the Bible, to understand doctrine, to be able to understand what a post-Christian world is in America, how to live it. I want the tools and the resources to be available. I want this to be an elite and world-class website made by some of the best designers in the world that are very critical of what currently is and have a fresh vision how to make this. I want you to research all of other websites that might be in this niche and take the best things. I would like it to be interactive and have things that draw people's attention, and I really want this to become like a useful tool for people to use to study and learn and grow." Earlier he asked for "the best church history study available ... very interactive", family devotions, tools and topics "to truly help people live in a post-Christian nation", and chose header doors Study, Topics, Family, Essays, About.

Read before anything else: ${MAIN}/CLAUDE.md (the brand contract: palette, typography, emotional brief "Unhurried. Weighted. Grown-up.", audiences with the skeptic first, integrity rules, two runtimes, tokens only); ${D}/CRITIQUE.md and the critic reports in ${D}/critique/ (what is wrong today, what to keep); the research syntheses ${D}/research/A-SYNTHESIS.md, B-SYNTHESIS.md, C-SYNTHESIS.md (and the cluster reports they cite when you need detail); ${MAIN}/docs/work/plan/MASTER-PLAN.md sections 0 to 3 and 10.6 (what is planned and built); ${MAIN}/docs/work/NOTES.md (decisions). Look at the current screenshots in ${D}/shots/current/ (Read the PNGs).`

const DIRECTION = { type: 'object', properties: {
  key: { type: 'string' }, promise: { type: 'string' }, doors: { type: 'array', items: { type: 'string' } },
  signature: { type: 'array', items: { type: 'string' } }, contract_changes: { type: 'array', items: { type: 'string' } },
  cuts: { type: 'array', items: { type: 'string' } }, risks: { type: 'array', items: { type: 'string' } } },
  required: ['key', 'promise', 'doors', 'signature', 'contract_changes', 'cuts', 'risks'] }
const SCORE = { type: 'object', properties: {
  seat: { type: 'string' },
  scores: { type: 'array', items: { type: 'object', properties: {
    key: { type: 'string' }, total: { type: 'number' }, criteria: { type: 'string' }, strongest: { type: 'string' }, weakest: { type: 'string' } },
    required: ['key', 'total', 'criteria', 'strongest', 'weakest'] } },
  winner: { type: 'string' }, graft: { type: 'array', items: { type: 'string' } }, must_not_lose: { type: 'array', items: { type: 'string' } } },
  required: ['seat', 'scores', 'winner', 'graft', 'must_not_lose'] }
const ATTACK = { type: 'object', properties: {
  lens: { type: 'string' }, breaks: { type: 'array', items: { type: 'object', properties: {
    claim: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' }, severity: { type: 'string', enum: ['fatal', 'serious', 'minor'] } },
    required: ['claim', 'problem', 'fix', 'severity'] } } },
  required: ['lens', 'breaks'] }

const DIRS = [
  ['study-desk', 'The Study Desk. Conviction: LiveWell is first an instrument for studying Scripture and doctrine, as serious as Sefaria or Logos and as calm as a good library. Everything (essays, history, family, topics) hangs off the text and the verse.'],
  ['field-guide', 'The Field Guide. Conviction: LiveWell is first a guide for living faithfully after Christendom. Readers arrive with a situation or a question (a son who left the faith, a church split over politics, a doubt that will not go away); the site meets the question and walks them down into Scripture, doctrine and history.'],
  ['long-memory', 'The Long Memory. Conviction: the church has been here before, and the organizing spine is time: the long story of the church, its people, councils, creeds and crises, with the American present read against twenty centuries. The Bible, doctrine and today are entered through that story.'],
  ['the-week', 'The Week. Conviction: formation happens in rhythm, not in visits. LiveWell is a companion through the day, the week and the church year: a shared rhythm across Scripture, catechism, the family table, an essay and prayer, so a person or a household comes back because it fits their life.'],
]

phase('Directions')
const dirs = await parallel(DIRS.map(([key, conviction]) => () => agent(`You are one of four design directors, each among the best in the world, competing to set the redesign of James Bell's site LiveWell. ${BRIEF}

YOUR STARTING CONVICTION: ${conviction}
Push it as far as it honestly goes, but answer the whole brief: Bible study, doctrine, the post-Christian moment and how to live it, church history, family, tools and resources, for all four audiences (skeptic, doubting Christian, pastor, seeker), on a phone first.

Write ${D}/vision/${key}.md, concrete enough that a builder could start from it:
1. The promise in one sentence, and why this direction is the right one for James's mission.
2. Information architecture: the doors (James chose Study, Topics, Family, Essays, About; argue if yours is better, but say what it costs him), the top-level map, every major page type, how each of the four readers enters and where they go next, search, and what gets folded or cut.
3. The home page: the first screen at 390px and at 1440px described element by element, then the rest of the page; why it draws attention and still feels unhurried, weighted and grown-up.
4. Signature interactions (six to ten): each with what the reader does, what happens, where it lives, which research pattern it comes from, and why it serves study and growth rather than engagement.
5. Templates: Bible chapter; verse; essay; topic; doctrine; church-history person, event and era; family devotion and "tonight"; a tool; a path or plan. For each: structure, the interactive layer, and the first screen.
6. Visual language inside the brand contract: type scale, rhythm, grid, how mustard is used, cream and black sections, iconography, illustration or diagram language, data graphics, motion (purposeful, reduced-motion safe), dark mode. List separately any change to the contract you would propose to James, each with its reason; these are proposals, not decisions.
7. What it cuts or folds from today's site, with the reason.
8. Build path in this codebase (React 19 + Vite, wouter, static JSON content with validators, tokens in index.css, no heavy chart or map libraries, two API runtimes): phases, what reuses work already merged, what is new, and the biggest risks.
Use the research and the critique by name; do not invent product features or facts. Return the structured summary.`, { label: `direction:${key}`, phase: 'Directions', schema: DIRECTION })))
const got = dirs.filter(Boolean)
log(`${got.length}/4 directions written`)

const SEATS = [
  ['james', 'James Bell himself: his brief above, his mission (living well in post-Christian America, the church\'s long history), his voice, and the integrity rules. Would he be proud to send this to the pastors of PCN?'],
  ['skeptic', 'The intelligent skeptic, a little wounded by church, arriving from a search: trust, honesty, no manipulation, whether you would stay and come back.'],
  ['pastor', 'A pastor in the Pastors Connection Network deciding whether to hand this to the congregation and use it for a small group: usefulness, depth, safety, organization.'],
  ['parent', 'A tired parent on a phone at 9 p.m. who came for help with the family table, and a seeker who came for help with a Tuesday afternoon: speed to value, clarity, warmth without sentimentality.'],
  ['director', 'A world-class design director: craft, coherence, distinctiveness, typographic and visual quality, whether it would be recognized as elite rather than templated, and whether attention is earned rather than bought.'],
  ['engineer', 'The lead engineer of this codebase: feasibility in React/Vite with static JSON content and validators, performance on a phone, maintainability by a small team, reuse of what is built, and risk.'],
]
phase('Judge')
const judged = await parallel(SEATS.map(([seat, who]) => () => agent(`You judge four design directions for the redesign of LiveWell. ${BRIEF}
The directions are in ${D}/vision/ (${got.map((g) => g.key + '.md').join(', ')}); read every one in full.
YOUR SEAT: ${who}
Score each direction out of 100 against criteria you state for your seat (name them and their weights), say its strongest and weakest point, pick a winner, list the specific ideas from the other directions the winner should graft (be concrete: the interaction, the page, the section), and list what must not be lost in any merge. Write ${D}/vision/judge-${seat}.md and return the structured scores.`, { label: `judge:${seat}`, phase: 'Judge', schema: SCORE })))
const scores = judged.filter(Boolean)
const tally = {}
for (const s of scores) for (const x of s.scores) tally[x.key] = (tally[x.key] || 0) + x.total
log(`totals: ${Object.entries(tally).map(([k, v]) => `${k} ${Math.round(v)}`).join(', ')}`)

phase('Synthesize')
await agent(`You are the chief design officer who must turn four competing directions and six judges' verdicts into one vision for LiveWell that James can approve. ${BRIEF}
Directions: ${D}/vision/*.md (not judge-*). Judges: ${D}/vision/judge-*.md. Totals across judges: ${JSON.stringify(tally)}. Structured scores: ${JSON.stringify(scores).slice(0, 30000)}
Take the strongest direction as the base (not automatically the highest total if the judges' reasons show a better base), graft what the judges named, and resolve every conflict explicitly. Write ${D}/VISION.md:
0. The vision in one paragraph James can read aloud, and the promise in one sentence.
1. Why this, and what we chose not to do (the directions and ideas set aside, and why).
2. Information architecture: the doors, the full map, page types, how each reader enters, search, folds and cuts (with redirects needed).
3. The home page, element by element, phone first.
4. Signature interactions, each specified (what the reader does, what happens, where, data it needs, which research pattern, which existing component or unit it builds on).
5. Templates for every page type, with first screens.
6. The design system: type scale and rhythm, grid, color use within the contract, components (existing ones kept, changed, new), iconography and diagrams, motion, dark mode, accessibility. Contract changes proposed to James, each with its reason, kept separate.
7. How it draws attention while staying unhurried, weighted and grown-up: the rules.
8. What changes on today's site, page by page (from CRITIQUE.md), and what stays.
9. The prototype brief: the eight to twelve screens to prototype for James first, each with the real content to use (real BSB text from client/public/bible, a real landed essay from client/public/essays, a real family devotion, real church-history content) and the interactions to make clickable.
10. The build plan: phases mapped onto the master plan's units (which units change, which are new, which are retired), with order and risks.
Then: ${COMMIT('Work in progress: design vision draft', 'docs/work/design/VISION.md docs/work/design/vision')}`, { label: 'synthesize', phase: 'Synthesize' })

const LENSES = [
  ['critique', 'Does VISION.md fix every one of the ten problems in CRITIQUE.md and every critical finding in docs/work/design/critique/*.md? Name each problem it leaves standing or makes worse.'],
  ['mission', 'Does any part of VISION.md betray the brand contract, the integrity rules (no invented quotations, facts or biography; contested questions left open; right and left measured alike; crisis pages with a path to help), James\'s voice, or "Unhurried. Weighted. Grown-up."? Does anything manipulate (streak pressure, dark patterns, engagement bait)? Does it still serve the skeptic first?'],
  ['feasibility', 'Can VISION.md be built in this codebase in phases by a small team, fast on a phone (Lighthouse budget on the home page), without heavy libraries, with content-as-data and validators, and without breaking the redirects, SEO, the two runtimes or what is merged? What is too big, what is underspecified, what order is wrong?'],
]
phase('Attack')
const attacks = (await parallel(LENSES.map(([lens, q]) => () => agent(`You are a hostile, expert reviewer of the redesign vision for LiveWell. ${BRIEF}
Read ${D}/VISION.md in full. Your question: ${q}
Try to break it. For each break: the claim or section, the problem, the fix, and severity (fatal, serious, minor). Write ${D}/vision/attack-${lens}.md and return the structured list.`, { label: `attack:${lens}`, phase: 'Attack', schema: ATTACK })))).filter(Boolean)
log(`${attacks.reduce((n, a) => n + a.breaks.filter((b) => b.severity === 'fatal').length, 0)} fatal, ${attacks.reduce((n, a) => n + a.breaks.filter((b) => b.severity === 'serious').length, 0)} serious`)

phase('Revise')
const final = await agent(`You revise LiveWell's redesign vision so it survives its critics. ${BRIEF}
Read ${D}/VISION.md and the three attacks in ${D}/vision/attack-*.md. Answer every fatal and serious break in the document itself (fix it, or say in a short "Answered objections" section why the critic is wrong); fold in minor ones where they improve it. Keep the document concrete and in plain words; James must be able to read section 0 and the prototype brief and know what he is approving. Add at the top a section "Decisions for James" listing each contract change or choice only he can make, one plain sentence each with the recommendation. Then ${COMMIT('Work in progress: design vision revised', 'docs/work/design/VISION.md docs/work/design/vision')}
Return: section 0, "Decisions for James", and the prototype brief, as markdown.`, { label: 'revise', phase: 'Revise' })

return { totals: tally, winners: scores.map((s) => `${s.seat}: ${s.winner}`), attacks: attacks.map((a) => ({ lens: a.lens, fatal: a.breaks.filter((b) => b.severity === 'fatal').length, serious: a.breaks.filter((b) => b.severity === 'serious').length })), final }
