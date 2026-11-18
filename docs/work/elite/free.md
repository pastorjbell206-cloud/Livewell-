# Unit free: every ebook is a free download

Branch `elite/free`, from `origin/claude/todo-implementation-hhp4bm`. Date: 2026-11-18.

James's decisions (2026-11-18): "The ebooks I want you to ... give away for free for people to download." Asked to choose: **Everything free** (pastors' books included; nothing on the site sold as an ebook). For the seven ebooks whose files name the Pastors Connection Network: **Hold them back** until he sends corrected files.

## Where an ebook was sold, priced or sent through checkout (before)

| Place | What it did |
|---|---|
| `/books` (Books.tsx) and its prerendered head (`scripts/prerender-heads.mjs`) | "Each is an ebook for $8.99" in the description and the lede |
| `/books/believe`, `/books/the-monster-in-the-mirror`, `/books/deconstruction-of-faith`, `/books/the-reliability-of-scripture`, `/books/bible-and-homosexuality`, `/books/bible-and-transgender-identity`, `/books/critical-race-theory-biblical` | Stripe Payment Link button "Get the ebook — $8.99", "$8.99 for the complete ebook ... delivered the moment you check out", "secure checkout by Stripe" |
| `/books/when-god-bless-america` | Stripe's embedded Buy Button (js.stripe.com script), the same $8.99 lines |
| Nine `/books/<slug>/thank-you` pages | Post-payment pages linking the PDF and EPUB (the files were already static) |
| Sixteen + seven `/<slug>/thank-you` pages (older ebooks) | Stripe session check, then the PDF streamed from `api/_ebooks/` by `/api/download` |
| `api/index.ts`: `/api/checkout`, `/api/download`, `EBOOKS`, `EBOOK_PRICE_CENTS`, `create-stripe-prices` | Stripe Checkout and gated delivery for the 23 older PDFs |
| `/downloads` | "The books James Bell wrote himself are for purchase, not download." |
| `scripts/build-catalogue.mjs` | The three books marked `access: "paid"`; `/explore` shows "Book · for purchase" for that |
| Unrouted pages (`pages/books/*.tsx`, `ConsiderTheBirds.tsx`, `WhereYourTreasureIs.tsx`, `RaisingBelievers.tsx`, `ArticleCollections.tsx`) | Prices and JSON-LD offers at 8.99; no route reaches them (their addresses already redirected). Left as they are |
| `BookDetail.tsx` (`/books/:slug`, database rows) | "Buy the book" to the row's `purchaseUrl`. Not changed: the rows are not readable from here; shelf books have their own routes, so only noindexed leftovers reach it |
| `Terms.tsx`, `Privacy.tsx` | "Ebook Purchases and Refunds" and Stripe payment wording. Legal text; listed for James, not changed |

## Every ebook and what it is now

**Free, PDF and EPUB, on their own pages and on `/downloads`:** When God Bless America Replaces Thy Kingdom Come, The Monster in the Mirror, Believe (the three shelf books; they were sold here through Stripe, not by an outside bookseller, so they became free), The Deconstruction of Faith, The Reliability of Scripture, What Does the Bible Really Say About Homosexuality?, What Does the Bible Say About Transgender Identity?, Is Critical Race Theory Biblical?, Raising Believers (no page of its own; `/books/raising-believers` now lands on `/downloads`).

**Free, PDF only, on `/downloads`** (moved from `api/_ebooks/` to `client/public/ebook/<slug>/<slug>.pdf`, file names unchanged): Babylon, Born Again From Atheism, Faith After Deconstruction, How to Read the Bible, Why Not What, The God Who Is Not Nice, The Scandal of the Cross, Prayer in the Dark, Be True to Yourself, Rule of Life, Ordinary Holiness, Covenant, HealWell, The Body You Left, The Sermon on the Mount as Politics, What Belongs to the Poor.

**Free already, now also on the ebooks shelf:** the three Hard Issues booklets for church leaders (Deacon Qualifications and Selection, Church Governance That Works, Change Without Casualties).

**Held** (moved to `content/held-downloads/`, with a README): Alone in a Crowded Church, Consider the Birds, Heaven Is Not Your Reward, Marriage in Ministry, Prophetic Justice 101, The Loneliness of the Pastor, Where Your Treasure Is. Not served, not listed. Each old address (`/consider-the-birds` and so on) is now a short noindex page, "This ebook is being revised", with the way on to the free ebooks and James's three books below. Their 301s to `/books` were removed so the page can answer (a browser that cached the old 301 still goes to `/books`).

28 ebooks are listed free in all (`client/src/data/ebooks.ts`, 25, plus the 3 booklets).

## What a visitor sees

- `/downloads` opens on **Free ebooks**: four shelves (Books by James Bell, Hard questions, For church leaders, More ebooks), each ebook a card with its cover, title, the line the site already had for it, and **Download free (PDF)** with **EPUB** beside it where one exists. No email, no checkout. The printables follow as before; the shelf cards gain "Free ebooks"; the opening line counts the ebooks.
- `/books`: no price. Each book has Download free and EPUB, then "See what is in the book". The "Looking for a book that used to be here?" band adds one plain line, "Until then, the older versions are free to download, with every other ebook on the site.", and a link to them. James's own sentences there are unchanged.
- The eight book pages: "Free Ebook" label, Download free and EPUB in the hero and in "Read it now", whose line is now "Free to download: an EPUB for your e-reader and a PDF for everything else." Their two dark bands are `--charcoal` now (they were `--ink`, which turns light at night while their text stayed light).

## Past buyers

- Free books: every old thank-you address (`/books/<slug>/thank-you`, `/<slug>/thank-you`) is a one-hop 301 to `/downloads` in `vercel.json`, mirrored in `App.tsx`; the book is there, free. A saved `/api/download?session_id=...` link for one of the sixteen still passes the Stripe check and then redirects (302) to the static file.
- Held books: `/<slug>/thank-you?session_id=...` still works as before. `/api/download` checks the paid session and streams the file from `content/held-downloads/`, which `vercel.json` now bundles (`includeFiles: "{api/_data,content/held-downloads}/**"`). Not tested against live Stripe from here.
- `/api/checkout` stays in the code but refuses: a free book answers 410 with its file's address, a held book 503. No page calls it. The tRPC `stripe.*` book and membership procedures are untouched in both runtimes.

## Prices removed

`/books` (description, lede, prerendered head), the eight book pages (button labels, "$8.99 for the complete ebook" lines, "secure checkout by Stripe"), the WGBA embedded Stripe Buy Button and its script, `/downloads` ("for purchase, not download"), the catalogue (`access: "paid"` to `"free"`, with files). llms.txt says the books are free ebooks and lists ebooks under Downloads. The search index gains "ebook epub free" keywords for Downloads and Books (rebuilt). No sitemap or JSON-LD on a routed page carried a price.

## The files' own text, checked again

`pdftotext` on every PDF, and every EPUB unzipped to a scratch folder and searched (Pastors Connection, PCN, membership, gift, donate, a price, years in ministry, lead or senior pastor, First Baptist, Fenton).

- The Pastors Connection Network: in exactly the seven held PDFs. In none of the served files.
- Offers or prices printed inside: none. ("$5,000 in 1945" and "$150,000 by 1975" in Is Critical Race Theory Biblical? are history in the text.) "Membership" everywhere is church membership.
- Listed for James, not edited, not held: **Ordinary Holiness** ("I have spent fifteen years as a pastor of an ordinary congregation, First Baptist Church of Fenton"), **Raising Believers** ("fifteen years of ministry and five sons", and "twenty years of pastoral" twice), **What the Bible Says About Homosexuality** ("twenty years of ministry"), **What the Bible Says About Transgender Identity** ("At First Baptist Church of Fenton"). He now says sixteen years. Born Again From Atheism and Faith After Deconstruction say "my years of ministry" with no number.

## What I ran, watched pass

- `pnpm check`: pass.
- All 35 content-gate commands of ci.yml: pass.
- `pnpm test`: 143 files passed, 1 failed on a 5-second timeout under load (`fes.test.tsx`), which passed alone (4/4). New `client/src/data/ebooks.test.ts` (4 tests): every listed file served, held files off the site and still reachable by the API, old addresses on `/downloads`, no price or Stripe link on a reader page.
- ESLint on every changed client file: clean. Not run on `api/index.ts` (a tool guard here refuses commands that name that file); `pnpm check` typechecks it.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender` (0 failures), `pnpm run audit:canonicals`: pass.
- Served with `scripts/serve-like-vercel.mjs` on 4561: redirects answer 308 to `/downloads`, `/ebook/babylon/babylon.pdf` 200 `application/pdf`, EPUB 200 `application/epub+zip`, `/ebook/consider-the-birds/...` 404.
- Screenshots, 390x844 and 1440x900, day and night: `/home/user/elite-shots/free/` (downloads, downloads-ebooks, books, believe, reliability, held).
- Lighthouse median of three (accessibility, CLS, performance): `/downloads` 100, 0.000, 72 (it read 74 to 82 in the inner unit; the spread here is about three points); `/books` 100, 0.000, 90; `/books/believe` 100, 0.000, 89; `/consider-the-birds` 100, 0.000, 90 (SEO 69 because it is noindex on purpose).

## Not verified

- The paid download for a held book against real Stripe, and that Vercel's `includeFiles` picks up `content/held-downloads/` in the deployed function (the path and the glob were checked; no deploy was made).
- Covers were not read as images for the network's name (the earlier unit painted it out of the booklet covers; the sixteen older covers are SVG and their text was read: none).
- The EPUBs were searched as text, not opened in a reader.

## Waits for James

1. Corrected files for the seven held ebooks (or the word to drop them).
2. Four ebooks state facts about him: Ordinary Holiness (fifteen years, First Baptist Church of Fenton), Raising Believers (fifteen and twenty years), What the Bible Says About Homosexuality (twenty years), What the Bible Says About Transgender Identity (First Baptist Church of Fenton). He has said sixteen years. Send corrected files, or say the lines may stand.
3. The sixteen older ebooks are free downloads by his "Everything free", but `/books` still says he took them down to rewrite them in his own hand. Confirm he wants the older versions offered meanwhile, or say which to take down.
4. Terms and Privacy still describe ebook purchases and refunds. Say how they should read now (past purchases still exist).
5. The Stripe products and Payment Links still exist in his Stripe account; turning them off there is his to do.
