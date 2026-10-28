export const meta = {
  name: 'livewell-prototype-revise',
  description: 'Revise the LiveWell prototype to James\'s direction of 2026-10-28: Home led by Bible study, no portrait; a new Study the Bible door; a new Writing door (Facebook posts, Substack essays, books); then check every word',
  phases: [
    { title: 'Build', detail: 'Home rebuilt, plus two new screens, each phone and laptop' },
    { title: 'Check', detail: 'every word traced to the repo or tagged Draft for James; format rules' },
  ],
}

const MAIN = '/home/user/Livewell-'
const SP = '/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad'
const PROJ = SP + '/proto/project'
const REF = SP + '/proto-ref/artifact-type/reference'
const PACK = SP + '/proto/content-pack.json'

const JAMES = `James Bell, 2026-10-28, on seeing the first two screens: "why is there a focus on john 1? or is that just an example. i dont want my image on the frontpage or you can use the pictture from my facebook page. i want this webstite to be a page that people can go to and learn, people can study the bible. people can learn church history. also its a place with my facbook posts. and my essays from substack. with my books. etc. i want this to be the best bible study tool in the world." His order of weight: study the Bible (the best Bible study tool in the world), learn church history, then his own writing: Facebook posts, Substack essays, books. No photograph of him on the front page (none is available; never draw a placeholder portrait). His header doors stay Study, Topics, Family, Essays, About unless he changes them; the Essays door becomes the home for all his writing, labeled on the page as Writing.`

const ART = `Write Design-canvas artboards exactly as the existing ones in ${PROJ}/ do: read ${PROJ}/Main.dc.html and ${PROJ}/John-Phone.dc.html first and match their head lines, token custom properties, font link, data-props tweaks ("type": Reading serif or Inter only; "paper": Paper or Night), type scale, spacing and components, so the new screens sit beside them as one system. Rules: ${REF}/format.md and ${REF}/craft.md. Keep the <script src="./support.js"></script> line exactly; close every element and quote every attribute; fluid PAGE roots (max-width container, side padding, auto-fit grids); {{holes}} are dotted names from renderVals(); the <script type="text/x-dc" data-dc-script data-props='…'> block with class Component extends DCLogic; links between artboards as <a href="Other.dc.html"> (phone to phone, laptop to laptop; the existing files are Main.dc.html and Home-Phone.dc.html for Home, John-*.dc.html, History-*.dc.html, Essay-*.dc.html, Tonight-Phone.dc.html, Sunday-Laptop.dc.html, Doubt-*.dc.html, and the new Study-*.dc.html and Writing-*.dc.html); tap targets 44px; contrast 4.5:1; no emoji, no fake status bar, no placeholder portrait. Do not render, screenshot, publish, or write canvas.json.
Integrity (CLAUDE.md, Content Integrity): every word a reader reads is verbatim from the repo (cite the file to yourself as you work; the content pack ${PACK} has much of it), or plain interface wording, or carries a small visible "Draft for James" tag. Never invent a quotation, number, date, title, post or claim. Where his Facebook posts or the rest of his Substack archive would appear, show the honest empty state in plain words (for example "Your Facebook posts will appear here once they are imported.") and no invented examples.`

const BUILD_SCHEMA = { type: 'object', properties: {
  key: { type: 'string' },
  boards: { type: 'array', items: { type: 'object', properties: {
    file: { type: 'string' }, title: { type: 'string' }, w: { type: 'integer' }, h: { type: 'integer' }, interactive: { type: 'boolean' } },
    required: ['file', 'title', 'w', 'h', 'interactive'] } },
  drafts: { type: 'array', items: { type: 'string' } }, notes: { type: 'string' } },
  required: ['key', 'boards', 'drafts', 'notes'] }

const JOBS = [
  { key: 'home', files: 'Main.dc.html (laptop, rewrite in place) and Home-Phone.dc.html (phone, rewrite in place)', brief: `Rebuild Home to James's order. First screen: the masthead and his headline (keep it as the current artboards have it), then the Bible study tool as the lead: one large field "Look up a passage or ask a question" with three example chips taken from real Study Bible data (a passage, a word, a question), today's reading from the 2027 plan or the family devotion's passage, and a row of entry points to the study tools that exist in the repo (the Study Bible, reading plans, word study and the Greek and Hebrew notes, the context guides, the creeds), each linking to Study-*.dc.html or John-*.dc.html. Second band: church history, with the Line from the current artboard (keep it and its Draft for James tags) linking to History-*.dc.html. Third band, "From James": his Substack essays (real ones from client/src/lib/shelf.json whose origin is his Substack, with titles and blurbs verbatim), a Facebook posts strip in its honest empty state, and his books from client/src/lib/bookShelf.ts (titles verbatim), linking to Writing-*.dc.html. Keep, lower on the page and smaller: the skeptic's row "Not sure you believe any of this?" (to Doubt-*), Tonight at the table (to Tonight-Phone / Sunday-Laptop), and the ending with his two Home paragraphs (verbatim from the current artboards). Remove every portrait and portrait placeholder.` },
  { key: 'study', files: 'Study-Phone.dc.html and Study-Laptop.dc.html (new)', brief: `A new screen: the Study the Bible door, the front door of what James wants to be the best Bible study tool in the world. Answer his question "why John 1?" by showing the whole Bible: the 66 books in canonical order grouped as the site groups them (read the group names from the Study Bible data, for example client/public/bible/ index files and story.json acts), each book opening its chapter list (a working control on the laptop: choosing Genesis shows its chapter numbers; any chapter links to John-*.dc.html as the example chapter page), a search field for a passage, a word, or a topic, the reading plans that exist (the 2027 whole-story plan, the eight-week plans) with their real names, the study tools that exist in the repo with their real names (word study with Strong's, cross-references, context guides, the creeds, church history sessions), and one line under the title saying that every chapter opens the same way John 1 does (interface wording, plain). Read client/src/pages/Study.tsx and StudyBible*.tsx for what exists and its names; never list a tool that does not exist.` },
  { key: 'writing', files: 'Writing-Phone.dc.html and Writing-Laptop.dc.html (new)', brief: `A new screen: Writing, the home for everything James writes. Three parts, in this order: Essays (his essays as they live on the site: the curated shelf from client/src/lib/shelf.json grouped by its sections, the live and the newly public ones, titles and blurbs or excerpts verbatim, plus one line that the full Substack archive will appear here once imported, in its honest empty state); From Facebook (short posts, shown in their honest empty state with one line on how they will appear: date, the post, a link to share; no invented posts); Books (the three titles in client/src/lib/bookShelf.ts with their real descriptions and links verbatim). A filter by section or kind that works (state). Link essay titles to Essay-*.dc.html for the one prototype essay; the others are plain text.` },
]

phase('Build')
const built = (await parallel(JOBS.map((j) => () => agent(`You are one of the world's best interface designers revising the LiveWell redesign prototype for James Bell. ${JAMES}

Read ${MAIN}/CLAUDE.md, ${MAIN}/docs/work/design/VISION.md sections 0, 3, 5 and 6, and the content pack ${PACK}. ${ART}

YOUR JOB: ${j.brief}
Files: ${j.files}, under ${PROJ}/. Give each artboard a frame height equal to the page's real height at its width (estimate generously). Return the boards (file, a short canvas title such as "Home · phone", w, h, interactive), every Draft for James item, and notes.`, { label: `build:${j.key}`, phase: 'Build', schema: BUILD_SCHEMA })))).filter(Boolean)

phase('Check')
const check = await agent(`You check revised artboards of the LiveWell prototype before James sees them. Read ${MAIN}/CLAUDE.md (Content Integrity). Files: ${built.map((b) => b.boards.map((x) => PROJ + '/' + x.file).join(', ')).join('; ')}.
1. Integrity: extract every reader-visible string. Each must be verbatim from the repo (find it: shelf.json, bookShelf.ts, the Study Bible data, positioning.ts, the content pack ${PACK}), plain interface wording, or tagged "Draft for James". Fix any invented or altered title, quotation, number, date, post or claim by restoring the source text or showing the honest empty state. No portrait or portrait placeholder anywhere.
2. Format: the exact support.js head line; one <x-dc> with <helmet>; a data-dc-script block whose data-props is valid JSON (after HTML-entity decoding) with $preview; class Component extends DCLogic; parse each file with an HTML parser for unclosed elements and unquoted attributes; every {{hole}} a dotted name renderVals() returns; every .dc.html href names a file in ${PROJ}/ or one of History-Phone, History-Laptop, Essay-Phone, Essay-Laptop, Tonight-Phone, Sunday-Laptop, Doubt-Phone, Doubt-Laptop; one fonts.googleapis.com css2 link and no other network; no emoji. Fix with the smallest edit. Do not render.
Return, as markdown, what you fixed per file and the Draft for James items.`, { label: 'check', phase: 'Check' })

return { built, check }
