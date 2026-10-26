export const meta = {
  name: 'livewell-essays',
  description: 'Write, verify and voice-audit LiveWell essays to docs/work/essays with claim ledgers; every agent commits and pushes its own files',
  phases: [
    { title: 'Write', detail: 'draft plus claims ledger' },
    { title: 'Verify', detail: 'check every claim and Scripture quotation, record the method' },
    { title: 'Voice', detail: 'voice edit, mechanics, care and audit' },
  ],
}

// args: [{ slug, mode: 'rewrite'|'new'|'pilot', brief?: string }]
const MAIN = '/home/user/Livewell-'
const ESS = MAIN + '/docs/work/essays'
const SAVE = (paths, msg) => `When you finish, save your work so a container reset cannot lose it. Retry up to five times if git reports a lock or a rejected push:
  git -C ${MAIN} add -A -- ${paths} && git -C ${MAIN} commit -q -m "Work in progress: ${msg}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e" -- ${paths} && git -C ${MAIN} pull -q --rebase origin claude/todo-implementation-hhp4bm && git -C ${MAIN} push -q origin claude/todo-implementation-hhp4bm
Never touch any other file in the repo, and never switch branches.`
const COMMON = `Read first: ${ESS}/BRIEF.md (it governs), ${MAIN}/docs/work/NOTES.md (decisions, James's answers of 2026-10-26, the essays each rewrite folds in, the titles the earlier writers chose), ${MAIN}/docs/VOICE-JAMES-BELL.md, and at least two of the approved pilots in ${ESS}/ (the-early-church-under-rome.md, what-christian-nationalism-is-and-is-not.md, was-america-founded-as-a-christian-nation.md, what-post-christian-means.md, why-didnt-the-bible-ban-slavery.md). James reviews a sample of each section on a preview; write so every piece could be the one he samples.`

const W_SCHEMA = { type: 'object', properties: { slug: { type: 'string' }, title: { type: 'string' }, words: { type: 'integer' }, needs_james: { type: 'boolean' }, needs_james_reason: { type: 'string' }, notes: { type: 'string' } }, required: ['slug', 'title', 'words', 'needs_james', 'needs_james_reason', 'notes'] }
const V_SCHEMA = { type: 'object', properties: { slug: { type: 'string' }, claims: { type: 'integer' }, corrected: { type: 'array', items: { type: 'string' } }, removed: { type: 'array', items: { type: 'string' } }, unverified_kept: { type: 'array', items: { type: 'string' } }, scripture_checked: { type: 'integer' }, scripture_unverified: { type: 'array', items: { type: 'string' } } }, required: ['slug', 'claims', 'corrected', 'removed', 'unverified_kept', 'scripture_checked', 'scripture_unverified'] }
const A_SCHEMA = { type: 'object', properties: { slug: { type: 'string' }, ship: { type: 'boolean' }, voice_before: { type: 'integer' }, voice_after: { type: 'integer' }, fixes: { type: 'array', items: { type: 'string' } }, blockers: { type: 'array', items: { type: 'string' } }, needs_james: { type: 'boolean' }, needs_james_reason: { type: 'string' }, title: { type: 'string' }, standfirst: { type: 'string' }, words: { type: 'integer' }, emdashes_left_outside_quotes: { type: 'integer' }, reader_test: { type: 'string' } }, required: ['slug', 'ship', 'voice_before', 'voice_after', 'fixes', 'blockers', 'needs_james', 'needs_james_reason', 'title', 'standfirst', 'words', 'emdashes_left_outside_quotes', 'reader_test'] }

const jobs = args
const out = await pipeline(
  jobs,
  (j) => j.mode === 'pilot'
    ? Promise.resolve({ slug: j.slug, skipped: true })
    : agent(`Write one essay for James Bell's LiveWell site, slug "${j.slug}". ${COMMON}

${j.mode === 'rewrite'
  ? `This REWRITES an existing machine-generated site essay that does not sound like James. Read the current text (BRIEF.md says how to fetch it live; a static copy may be in ${MAIN}/content/static-library.generated.json) and every essay NOTES.md says it folds in. Keep what is true and useful, discard the voice entirely, and do not trust the old facts.`
  : `This is a NEW essay. ${j.brief || ''}`}
Use the title NOTES.md lists for this slug unless a plainer, more searchable one is obvious.

Write the essay to ${ESS}/${j.slug}.md in the format BRIEF.md gives. Then write its claims ledger to ${ESS}/ledgers/${j.slug}.md: one line per checkable claim (every date, name, event, number, quotation and Scripture quotation), each with the source you relied on and "unverified" where you have not checked it yet. A separate verifier checks everything after you, so prefer leaving out a detail you cannot confirm over guessing.
${SAVE(`docs/work/essays/${j.slug}.md docs/work/essays/ledgers/${j.slug}.md`, `essay draft ${j.slug}`)}`, { label: `write:${j.slug}`, phase: 'Write', schema: W_SCHEMA }),
  (w, j) => agent(`Verify one LiveWell essay before publication: ${ESS}/${j.slug}.md, with its claims ledger at ${ESS}/ledgers/${j.slug}.md (create the ledger from the text if it does not exist; for an approved pilot it does not). ${COMMON}

Check every claim in the essay, in this order: quotations of non-Scripture sources word for word with attribution; numbers with their source and year; Scripture quotations verbatim against the ESV; dates, names, events, titles. Tools: WebSearch (load with ToolSearch "select:WebSearch"); esv.org, biblegateway, newadvent, ccel, wikisource and gutenberg.org cannot be fetched from this sandbox, so use search results that quote the source. For the church fathers you may clone the public-domain library: git clone --depth 1 --filter=blob:none --no-checkout https://github.com/HistoricalChristianFaith/Writings-Database.git into the scratchpad (/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/wdb if it is not already there) and read files with git show 'HEAD:<path>' (ANF/NPNF and Pearse translations only; avoid its machine-translated Migne material). raw.githubusercontent.com is reachable for other public-domain texts.
Fix what is wrong in place. A quotation you cannot verify becomes marked paraphrase without quotation marks, or is cut. A number you cannot verify is cut or generalized. A date or name stays only if it is textbook-certain. Remove any invented anecdote and any biography beyond NOTES.md. Do not change voice or structure beyond what accuracy requires. Rewrite the ledger so every line records the result and the method actually used, in those words (for example "matched against search results from esv.org on 2026-10-27"); never claim you opened a source you did not.
${SAVE(`docs/work/essays/${j.slug}.md docs/work/essays/ledgers/${j.slug}.md`, `essay verified ${j.slug}`)}`, { label: `verify:${j.slug}`, phase: 'Verify', schema: V_SCHEMA }),
  (v, j) => agent(`You are the last reader before a LiveWell essay goes to James: ${ESS}/${j.slug}.md (ledger ${ESS}/ledgers/${j.slug}.md). ${COMMON}

1. Voice. Score 1-10 how indistinguishable it is from the approved pilots and James's Substack, list every AI tell from BRIEF.md you find with the exact sentence, then revise in place to remove them. Add no new fact, quotation, number, date or name; keep every quotation and every link exactly.
2. Mechanics. No em-dash (U+2014) anywhere outside verbatim quotations; no en-dash or double hyphen standing in for one. Every stamp phrase from BRIEF.md at most once. Forbidden language: zero. Exclamation points only inside quoted Scripture. Closing Texts lines read *"Quote."* (Reference) on one line.
3. Care and integrity. Crisis path present where the piece faces suffering, doubt, abuse or grief. Contested second-order questions stated fairly and left open (needs_james true if the piece cannot stand without James's own position or story). Biography only as NOTES.md allows. Links only to slugs in ${ESS}/link-targets.json, /study/bible, /theology/history, /help, /books.
4. Format. Line 1 "# Title"; the next non-blank line is one italic standfirst sentence; plain ## headings; nothing else above the body.
5. Reader test. Read as the skeptic James writes toward: handled or met?
If the voice edit changed anything the ledger covers, update the ledger line. Set ship=false only for a blocker you could not fix.
${SAVE(`docs/work/essays/${j.slug}.md docs/work/essays/ledgers/${j.slug}.md`, `essay voice and audit ${j.slug}`)}`, { label: `voice:${j.slug}`, phase: 'Voice', schema: A_SCHEMA }).then(a => ({ slug: j.slug, write: w, verify: v, audit: a })),
)
return out.filter(Boolean)
