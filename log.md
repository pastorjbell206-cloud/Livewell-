# log.md — working log

Newest first. One entry per working session: what changed, what broke, what
is next. Decisions made without asking are recorded with their reason.

## 2026-09-25 — The Study Bible: learn the whole Bible

**Changed.** The Study Bible is now a place to learn the whole Bible, not only to read it.
- **The story:** `/study/bible/story` tells the Bible as one story in eleven acts (the site's storyline). Each act gives its dates, the history behind it, what to watch for, the people, and a reading path. Together the paths walk all 1,189 chapters once, in the order the story happened. Reading progress is kept in the browser.
- **Every book:** each of the 66 books has an introduction covering author, date, setting, purpose, structure, themes, where it sits in the story, how it points to Christ, how to read it well, and key chapters.
- **Every chapter:** each of the 1,189 chapters has study notes covering where it sits in the story, its history, its culture, how it is built (with a verse outline), the doctrines it teaches, key Hebrew or Greek words, how it points to Christ, a hard question where one arises, and three questions for reflection. About 1.8 million words in all, in a plain reference voice, not James's.
- **Doctrines:** `/study/bible/doctrines` gives 29 doctrines, each with every chapter that teaches it and LiveWell's writing on it.
- **Links out:** every chapter links to LiveWell items that cite it (the Psalm/Psalms mismatch is now handled), to its passage guide where one exists, to related writing by doctrine, and to other translations (linked out, never stored).
- **Search engines:** the prerender gives every book, chapter, act, and doctrine page its own title, description, and readable text (1,295 pages), and the sitemap lists them all.

**How it was made and checked.** `docs/BIBLE-NOTES-SPEC.md` is the writers' brief. `scripts/validate-bible-notes.mjs` gates CI. It checks shape, the forbidden language, and em-dashes or exclamation points outside quoted Scripture, and it verifies every quotation of three or more words against the Berean Standard Bible. Then a reviewer fact-checked every book and corrected errors in place. `docs/BIBLE-NOTES-REVIEW.md` records every correction, plus the claims flagged for James's team to confirm against a primary source.

**Needs James.** The hard question on Leviticus 18:22 states the historic and revisionist readings without saying where LiveWell lands. The contested-doctrine standard asks the author to name his position, so James should write the closing line. Crisis-facing notes (Job, Lamentations, Jeremiah 20, Psalms 39 and 88, 1 Samuel 31, 2 Samuel 13 and 17, Judges 19 and 21, Ezekiel 16 and 23, 2 Corinthians 1 and 4) point to real help, with US numbers named first; the site may want one standard wording.

**Verified.** Typecheck clean. 336 tests pass. Every CI validator passes, including the full notes check (66 introductions, 1,189 chapter notes, story path complete). The build, sitemap, prerender, and canonical audit are clean. Axe finds no serious issues on nine Study Bible pages at 1440 and 390 wide, with all note sections open.

## 2026-09-24 — The Study Bible, Phase 1

**Changed.** `docs/STUDY-BIBLE-PROMPT.md` is the expert board's prompt: seats, rules, sources, five phases, and gates. Phase 1 is built:
- **`/study/bible`**: all 66 books and 1,189 chapters in the Berean Standard Bible (public domain).
- **Interlinear:** a Hebrew and Greek interlinear for every verse, from STEPBible TAHOT and TAGNT (Tyndale House, CC BY 4.0).
- **Word panel:** tap any word for its grammar in plain language (TEHMC and TEGMC), its dictionary entry (TBESH and TBESG, 21,232 entries), and its occurrence count with the first 60 places, in canonical order.
- **Verse panel:** tap any verse for its words, its 12 strongest cross-references (OpenBible.info, CC BY), and every LiveWell item that treats that chapter.
- **Greek editions:** where the major Greek editions differ, the words are marked and the editions named.
- **Omitted verses:** the 16 verses the critical text omits (Acts 8:37 and the rest) are shown, with their later-edition Greek and a plain note.
- **Data:** `scripts/build-bible.mjs` builds the data into `client/public/bible/` (46 MB, one file per chapter, loaded one at a time). `scripts/validate-bible.mjs` gates CI.
- **Entry points:** the Study page leads with it, the Study menu links it, and the sitemap lists it.

**Verified.** Typecheck clean. 329 tests pass, 4 of them new. Every validator passes. Lint shows 0 errors. Build and prerender are clean. Axe finds no serious issues on the index, Genesis 1, Psalm 23, John 1, John 3:16, and Acts 8:37, at 1440 and 390 wide, in reading and interlinear modes, with the word and verse panels open.

**Known and stated.** Three Old Testament verses have no original words: Hebrew and English number them differently. 15 Strong's numbers, out of 16,958 used, have no brief-lexicon entry, and the panel says so.

**Next (Phases 2–5 of the prompt).** Word-study pages with the full LSJ lexicon, and search by grammar. Person and place pages from TIPNR. Authored book introductions and context notes, through James's "save it". Reading with the church. A study method and sermon builder.

## 2026-09-24 — Elite Site Prompt, Phases A–D finished; the blank-page safeguard

**Changed.**
- **More on this.** Every study guide, how-to, wisdom topic, context guide, life domain, doctrine, and church-history essay now ends with up to four related items from the catalogue. Shared Scripture counts most, then subject, then title words, with no more than two of one kind. Essays keep their existing related block.
- **Connect.** `/connect` gathers every place to find James: the front page's "Follow the writing" block, which gains a Library tile, the newsletter, and speaking through Work with James. Every essay now ends with a one-line "James also writes elsewhere" list read from `lib/channels.ts`. The Library ends with the same block, the footer links to Connect, and the sitemap lists it.
- **Print and wrapping.** The print stylesheet hides navigation and end-of-page blocks, shows link addresses, and sets page margins. Headlines wrap evenly.
- **Crawlable lists.** The prerender gives crawlers the Library's 400 non-essay items and the Downloads files as plain links.
- **Self-heal.** A small script in `client/index.html` watches the static shell. If the page has loaded and the app still hasn't replaced the shell four seconds later, it clears service workers and caches and reloads, once per session. James's desktop Chrome was stuck on the shell while fresh browsers loaded normally.

**Verified.** Typecheck clean. 325 tests pass, 2 of them new. Every validator passes. Lint shows 0 errors. Build and prerender are clean. Axe finds no serious issues on `/connect`, a study guide, a wisdom topic, an essay, or the home page, at 1440 and 390 wide. The self-heal was tested both ways: a normal load is untouched, and a broken first load reloads once and then mounts.

**Not done, with reasons.** There is no `/speaking` page with topics or events: those must come from James, and Work with James already takes requests. Phase D's per-file structured data and Phase E's admin "add anything" screen and monthly depth report depend on Foundation Phases 1 and 3. New wording is staged in `content/site-copy.md`.

## 2026-09-23 — Elite Site Prompt, Phase A: the Library

**Changed.** One catalogue of everything on the site,
`scripts/build-catalogue.mjs`, rebuilt on every build. On deploy it reads the
essays from the database, the same way the sitemap does. It covers 20 kinds:
essays, books, the free booklets, study guides, answers, wisdom topics,
how-tos, life domains, context guides, doctrines, church history, creeds,
justice, the church and power, nation, pathways, care plans, group guides,
arguments, and the family resources. `/explore` became the Library. It has one
search across all of it, including Scripture references and corrections for a
misspelled word. Its filters are kind, subject, length, and "only things I can
download," every view is a shareable URL, and each result has its downloads
inline. `/downloads` now reads the same catalogue and gains the ten free
booklets and a books shelf. Search links into the Library. The Read menu leads
with "The Library: everything." `/downloads` joined the sitemap. The booklet
list moved into `client/src/data/booklets.ts` so the page and the catalogue
share it. New wording is staged in `content/site-copy.md` for approval.

**Decided.** The Library lives at `/explore`, not `/library`. `/library` is The
Commonplace, an indexed page, and the prompt's own rule forbids changing an
address. `/explore` was already the "everything" page, so no address changed.
The reading-path PDFs stay off the open shelf because they are email-gated.
The paid ebooks are listed as books, never as files.

**Found.** The nine paid ebooks (the three shelf books, the five unshelved
book pages, and Raising Believers) sit as public files under `/ebook/<slug>/`.
Anyone with the address can download them without paying. That is a money
path for James to rule on. The fix is to move them behind the paid-session
download the 23 other ebooks already use.

**Verified.** Typecheck clean. 323 tests pass, 10 of them new. Every CI
validator passes, including the new `validate-catalogue`, which checks that
every item resolves to a real route and every file exists or is built by the
deploy. Lint shows 0 errors. The build and prerender are clean. Axe finds no
serious violations on `/explore` or `/downloads` at 1440 or 390 wide.
Screenshots were checked at both widths.

**Not done in Phase A.** A4, the "More on this" block on every item page drawn
from the catalogue, is not built. The site search's own library results still
cover six libraries; it now links to the Library for the rest. Church-history
figures, councils, and heresies link to the history page rather than each
entry. The podcast and Substack feeds belong to Phase B.

**Next.** Gate A: James searches for five things he knows he wrote and
downloads one PDF on his phone. Then Phase B, "Everywhere James is."

## 2026-09-22 — Foundation Prompt, Phase 0: the branch inventory

**Changed.** `docs/FOUNDATION-PROMPT.md` written (the plan a firm would run:
reconcile branches, one source of truth, essays as HTML, measure, cut,
editorial machine, photography, money, blocking gates). Phase 0 opened
read-only: `docs/branches/INVENTORY.md` with a verdict on each of the ten
open pull requests. No branch merged, folded, or closed.

**Found.** Nine of the ten are one-commit branches from July and August. One
is already on `main` (#374). Three are docs or prose (#377, #518, #521's
prompt). Five carry small, still-needed code that `main` lacks: crisis help
on `/doubt` (#375), the `<main>` landmark on six pages (#376), the author
Person schema (#370), the funnel telemetry (#368), the setup-node bump
(#441). Their GitHub "files changed" counts are inflated by stale bases; the
real diffs are a few lines to a few dozen. #459 is the one large branch
(344 files, active today); its full read, with the gates run in a separate
worktree, is recorded in the inventory.

**Decided.** Small branches are folded by re-applying their intent on the
phase branch that owns the concern, never by merging a stale base. Every
close carries a note naming what was in it and where it went.

**Next.** Gate 0: James approves the merge, fold, and close list. Then the
actions run one at a time, and Phase 1 opens with the backup.

## 2026-09-22 — Correction: the 128 "placeholders" are real essays; retirement reversed

**Found.** Checking production after the merge: all 128 slugs the audit
called placeholders are published, full-length essays in the live database
(7–10 minute reads, every one present in the live index), and their full
text is in the repo at `content/full/<slug>.md` (1,522–2,104 words each). The
seed file holds 50-word abstracts under those slugs, and the first pass
judged from the seed. One of them is the voice exemplar "You Are Not the
Exception," which the audit had reported as absent from the site.

**Changed.** Reversed the retirement on `main`: the 128 slugs are no longer
hidden from the writing index; the 24 reading-path entries are available
again with their slugs; the Blind Spots guide chapter is available again;
the seed rows are `published: true` again; `scripts/unpublish-stubs.mjs`
deleted, since running it would have unpublished 128 real essays.
`AUDIT.md` §0, §2, and §5 corrected in place. The pages whose stub picks were
swapped for other real essays (`ReadingPaths.tsx`, `Dashboard.tsx`,
`StartHereQuiz.tsx`) were left as they are: both sets are real essays, and
those files also carry voice repairs that would have been lost in a revert.

**Broke.** For about a day on production, the 128 essays were missing from
the `/writing` index and from five reading paths. Direct links, search
engines, and the essay pages themselves were unaffected.

**Decided.** The database and `content/full/` are the record of an essay's
length and existence; the seed file is not. Recorded so no later pass repeats
the mistake. The 128 full bodies have not been voice-audited and join the
Phase 4 queue.

**Next.** Merge, confirm the index on production, then Phase 1 as listed
below minus the withdrawn P0.

## 2026-09-21 — Gate 1 approved; PR #522 merged

**Changed.** James approved and merged all of the latest work. PR #522 squash-
merged to `main` as `5331be6` (133 files): the 128 placeholder retirement,
pillar map, five-door header, `/study`, the history timeline, home performance,
the voice audit ledgers and 120 surface repairs, 43 gated essay rewrites (still
candidates pending per-essay "save it"), `AUDIT.md`, `log.md`. Vercel deploys
`main` to production.

**Broke.** Nothing. CI `build` green on the merged head; `quality` red on the
asserted performance floor only (83 vs 90), non-blocking, explained on the PR.

**Decided.** Merging counts as Gate 1 approval of the audit and plan. The brand
ruling (keep cream/mustard/Cormorant vs the prompt's palette) is still open and
gates Phase 2; Phase 1 does not depend on it.

**Next.** Production still serves the 128 placeholders and the old essay
bodies until the DB steps run with `DATABASE_URL`. Then Phase 1: contrast and
axe fixes on 44 routes, the 11 dead ends, admin middleware guard and login
rate limit, dependency upgrades, `brief.md` and `handover.md`.

## 2026-09-21 — Phase 0 under the master site prompt

**Changed.** `AUDIT.md` written at the repo root (read-only discovery; all
numbers measured from this branch, CI, and a real-browser walk of 229
routes). `log.md` created. No code changed this session after the master
prompt arrived; the in-flight essay-repair workflow (scratch output only) was
stopped and nothing from it applied.

**Decided.** (1) The repo's existing token contract (`CLAUDE.md`,
`client/src/index.css`) governs over the prompt's paper/forest/oxblood palette
and Fraunces/Source Serif type, per the prompt's own rule 4.2 — the conflict
is reported in `AUDIT.md` §0 for James to rule on, not applied. (2) The 43
essay rewrites already gated onto this branch are reclassified as
*candidates* for the Phase 4 pipeline, not approved work, because rule 5
requires a side-by-side diff and James's "save it." (3) Prior work on this
branch (stub retirement, header recomposition, `/study`, history timeline,
performance) stays on the draft PR #522 for James to keep or reverse; it is
inventoried in `AUDIT.md` §2 and §6.

**Broke.** Nothing. Gates on the branch: `pnpm check` clean, 313 tests pass,
build succeeds, CI `quality` job fails at Lighthouse performance 83 (asserted
floor 90, job non-blocking).

**Next.** Gate 1: James approves or amends `AUDIT.md` and rules on the token
conflict. Then Phase 1 in this order: prod stub retirement, contrast/axe
fixes, dead ends, admin middleware guard + login rate limit, dependency
upgrades, `brief.md` and `handover.md`.
