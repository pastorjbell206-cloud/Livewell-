export const meta = {
  name: 'livewell-essay-verify',
  description: 'Close every open item in one LiveWell essay claims ledger (quotations, Scripture, dates) using search and public-domain texts; commit to claude/essays',
  phases: [{ title: 'Verify', detail: 'one essay per run, so it has the full search budget' }],
}
// args: { slug }
const WT = '/home/user/livewell-essays'
const slug = args.slug
const SCHEMA = { type: 'object', properties: {
  slug: { type: 'string' }, open_before: { type: 'integer' }, verified: { type: 'integer' }, corrected: { type: 'array', items: { type: 'string' } },
  made_paraphrase_or_cut: { type: 'array', items: { type: 'string' } }, still_open: { type: 'array', items: { type: 'string' } }, searches_used: { type: 'integer' } },
  required: ['slug', 'open_before', 'verified', 'corrected', 'made_paraphrase_or_cut', 'still_open', 'searches_used'] }

const r = await agent(`You close the open items in one LiveWell essay's claims ledger before publication. Work only in the git worktree ${WT} (branch claude/essays). Essay: ${WT}/docs/work/essays/${slug}.md. Ledger: ${WT}/docs/work/essays/ledgers/${slug}.md. Read ${WT}/CLAUDE.md (integrity rules), ${WT}/docs/work/essays/BRIEF.md and ${WT}/docs/work/NOTES.md first.

Every ledger line that is not yet verified is your work: lines marked QUOTATION NOT VERIFIED, ESV wording not checked, not checked in this run, unverified, or anything that only rests on memory or "textbook" judgment for a quotation or a number. You have this run's whole web-search budget to yourself (about 200 searches), so use it; spend it on the riskiest items first: quotations of non-Scripture sources, then numbers, then Scripture wording, then dates and names.

Tools and sources:
- WebSearch (load with ToolSearch "select:WebSearch"). esv.org, biblegateway, newadvent, ccel, wikisource and gutenberg.org cannot be fetched from this sandbox, so match against search results that quote the source (for ESV wording, a search such as: John 3:16 ESV "For God so loved").
- Public-domain texts on GitHub (raw.githubusercontent.com and git clone work): Project Gutenberg mirrors under the GITenberg organization (git clone --depth 1 https://github.com/GITenberg/<Title>_<ebook number>.git), and the church fathers in https://github.com/HistoricalChristianFaith/Writings-Database (git clone --depth 1 --filter=blob:none --no-checkout into the scratchpad, read with git show 'HEAD:<path>'; ANF/NPNF and Pearse translations only). Clone into /tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/sources/ and reuse what is already there.
- The site's Berean Standard Bible text in ${WT}/client/public/bible/ch/ confirms where a verse is and what it says, not ESV wording.

For each item: if a source you actually saw matches, mark it verified with the method in those words. If it differs, correct the essay to the source and record it. If after a real effort you cannot match a non-Scripture quotation, make it marked paraphrase without quotation marks (or cut it) in the essay; a number you cannot confirm is cut or generalized. For ESV wording you cannot confirm, keep the quotation only if the BSB confirms the verse says it and record "ESV wording not confirmed by search; BSB confirms the sense", so James's API key can settle it later. Never claim a source you did not see. Do not change voice or structure beyond what accuracy requires, and keep the essay free of em-dashes outside verbatim quotations.

Then commit and push, retrying on a lock or rejected push:
  git -C ${WT} add docs/work/essays/${slug}.md docs/work/essays/ledgers/${slug}.md && git -C ${WT} commit -q -m "Essays: ${slug} ledger closed" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e" -- docs/work/essays/${slug}.md docs/work/essays/ledgers/${slug}.md && git -C ${WT} pull -q --rebase origin claude/essays && git -C ${WT} push -q origin claude/essays
Report the counts.`, { label: `verify:${slug}`, phase: 'Verify', schema: SCHEMA })
return r
