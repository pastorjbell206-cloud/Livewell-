# Unit pdfs: the downloads after the writing changed, and housekeeping

Branch `elite/pdfs`, from `origin/claude/todo-implementation-hhp4bm` at 578eb7e4. Date: 2026-11-18.

## The downloads

**How they are made.** Two kinds.

- **Generated (603 PDFs).** `pnpm pdfs` (`scripts/build-pdfs.mjs` with `scripts/lib/help-printables.mjs`, `reading-plans.mjs`, `workbooks.mjs`) reads the libraries in `client/public/*` and `client/src/data/*` and writes `client/public/downloads/`. It works offline and needs no database (19 seconds here). The folder is gitignored, and `build:vercel` runs `pnpm pdfs` first on every deploy, so the files James's readers get are always rebuilt from the current wording. **Nothing to commit: 0 files changed in git, 0 bytes.** The rebuild here was only to read the result.
- **Hand-made (committed).** `client/public/ebook/` (12 titles, each as a PDF and an EPUB, among them the three shelf books and the three church-leader booklets still offered), and `api/_ebooks/` (23 older paid PDFs, handed over by `api/index.ts` only after a Stripe check). No builder makes these. `content/held-booklets/` holds the seven booklets an earlier unit took off the site.

**What was searched.** Every one of the 603 generated PDFs (text pulled with `pdftotext`), the 24 files in `client/public/ebook/` (PDF text, and each EPUB unzipped to a scratch folder, its XHTML, OPF and NCX), the 23 PDFs in `api/_ebooks/`, and the book samples in `client/public/books/*.md`. Terms: "Pastors Connection", "PCN", "membership", "Give a gift", "$9" and "$8.99", a title ("lead pastor", "senior pastor", "First Baptist"), years in ministry, a book count, and the renamed tools ("Parenting Stage Guide", "Conflict Resolution Guide"). Every printed site address in the generated PDFs (414 distinct) was also checked against the retired addresses.

**Hits, and what was done.**

| Where | Hit | Done |
|---|---|---|
| Generated PDFs (603) | No PCN, no gift line, no price, no title, years or book count, no old tool name, no retired address | Nothing needed |
| Generated PDFs: 6 study guide files (baptism-and-communion, mishpat, new-believer, singleness, the-church leader and participant) | "membership" 13 times | All church membership in the study's own subject. No offer. Left |
| `ebook/raising-believers/Raising-Believers.pdf` and `.epub` | "Here is what fifteen years of ministry and five sons have..." | Years in ministry. Hand-made, cannot regenerate. Listed for James |
| `ebook/bible-and-homosexuality/What-the-Bible-Says-About-Homosexuality.pdf` and `.epub` | "...from twenty years of ministry..." | Years in ministry, and it disagrees with the line above. Listed for James |
| `ebook/bible-and-transgender-identity/What-the-Bible-Says-About-Transgender-Identity.pdf` and `.epub` | "At First Baptist Church of Fenton, this is beginning." | Names his church. Listed for James |
| `ebook/` six more titles | "membership" (church membership), "senior pastor" (the office, in the governance and deacon booklets), "25 years after" (of Paul, in Reliability) | Not about James and not an offer. Left |
| `api/_ebooks/` (paid, held for past buyers) | Pastors Connection or PCN in 7 files: alone-in-a-crowded-church, consider-the-birds, heaven-is-not-your-reward, marriage-in-ministry, prophetic-justice-101, the-loneliness-of-the-pastor, where-your-treasure-is. "Years of ministry" in born-again-from-atheism, faith-after-deconstruction, the-loneliness-of-the-pastor. "First Baptist" in marriage-in-ministry, ordinary-holiness, prophetic-justice-101. "Lead pastor" in where-your-treasure-is | Not in a served folder: a file is handed only to a past buyer after a payment check. Moving them would break what people paid for. Left in place and listed for James |
| `client/public/books/marriage-in-ministry-sample.md` | "First Baptist Church of Fenton" twice | No page reads this file (the stock-take found only unrouted pages do). Left; listed |

No served file names the Pastors Connection Network, so nothing was moved to `content/held-downloads/` and no address was redirected.

## Housekeeping

- **CLAUDE.md**: the content-gates count is 35 (the passage index drift check added to the list). Seven Decision Log lines, one or two sentences each, from the unit notes: the art kit and PageHead (kit-pagehead.md), `/answers/<slug>` (hq.md), `/study/how-to-study` and the guided walk (desk.md), `/skeptics` (hq.md), `/james` (hub.md), the passage index (deeper.md), and Lighthouse 13.6.0 on Node 22 (commit 3d574634). No existing line was rewritten.
- **ESLint**: `docs/work/**` is ignored. Before: 11 errors (all parse errors in `docs/work/**/*-wf.js`) and 523 warnings. After: 0 errors, and every real source file reports exactly what it did before (compared file by file). `pnpm lint` still fails on the 523 old warnings under `--max-warnings 0`; they were not chased.

## What I ran, watched pass

- `pnpm pdfs`: 603 PDFs written, offline.
- `pnpm check`: pass.
- All 35 commands of the content-gates step: pass.
- `pnpm test`: 143 files passed, 7 skipped; 1,635 tests passed, 73 skipped.
- ESLint, whole repo, before and after (above).
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass, 0 failures.

## Not verified

- No page changed, so no screenshots and no Lighthouse run.
- The PDF text search reads what `pdftotext` extracts; words inside images (covers) were not read. The earlier unit painted the network's name out of the booklet covers.
- The EPUBs were searched as text, not opened in a reader.

## Waits for James

1. Three public booklets state facts about you: Raising Believers ("fifteen years of ministry and five sons"), What the Bible Says About Homosexuality ("twenty years of ministry"), and What the Bible Says About Transgender Identity ("At First Baptist Church of Fenton"). The two years disagree. Send corrected files, or say the lines may stand.
2. Seven paid PDFs held for past buyers in `api/_ebooks/` name the Pastors Connection Network, and several state years in ministry, your church or "lead pastor". Say whether past buyers should keep getting them as they are, get corrected files, or no longer get them.
