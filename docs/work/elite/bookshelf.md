# The bookshelf and the downloads: stock-take, titles, covers, suggested gifts

Begun 2026-11-22.

## What James said (2026-11-22)

- The ebooks, the shelf books and the free PDFs are how the work is
  supported. Each download carries a suggested gift ("like $8.99, or
  diversify the prices"), on everything downloadable, smaller amounts for
  short pieces. The amount is filled in, the reader can change it, and a plain
  "Download without giving" link is always there. No one is blocked and
  nothing sits behind an account.
- The titles should match each other and the site. "The Monster in the
  Mirror" becomes "Blind Spots". "When God Bless America Replaces Thy Kingdom
  Come" becomes "American Idols". Every other title is proposed here for him
  to pick from, and is not changed.
- The covers should look real and attractive, "what people want to read", in
  the site's own pictures and colours.
- Gifts go to James Bell personally and are not tax-deductible. The Pastors
  Connection Network stays off the site. The seven held ebooks and the sixteen
  older titles stay held and unlisted.

## 1. Stock-take: everything a reader can download

Taken 2026-11-22 by reading the data files, running `node
scripts/build-pdfs.mjs`, and reading each ebook's own first pages with
`pdftotext` and each EPUB's own title record.

### Ebooks: finished files, uploaded

Twelve files are listed: nine ebooks (`client/src/data/ebooks.ts`) and three
booklets for church leaders (`client/src/data/booklets.ts`). Each is a PDF
(6 by 9 inches) and an EPUB under `client/public/ebook/<slug>/`. They were
made outside this repo from Word manuscripts (the steps are in
`scripts/book-pipeline/README.md`; the manuscripts are not in the repo), so
they are **finished files, not built from source here**. Each file's title
page and the EPUB's title record carry the title. The PDFs have no title in
their metadata.

| Title on the site (before this work) | Pages | PDF / EPUB | Offered on | The file's own title page says |
|---|---|---|---|---|
| When God Bless America Replaces Thy Kingdom Come | 495 | 767 KB / 733 KB | /books, its own page, /downloads | When God Bless America Replaces Thy Kingdom Come. How Patriotism Became Our Practical Savior |
| The Monster in the Mirror | 274 | 756 KB / 274 KB | /books, its own page, /downloads | The Monster in the Mirror. Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It |
| Believe: The Rational Case for Christian Faith | 392 | 636 KB / 180 KB | /books, its own page, /downloads | Believe. The Rational Case for Christian Faith |
| The Deconstruction of Faith | 391 | 623 KB / 212 KB | its own page, /downloads | The Deconstruction of Faith. Why People Are Leaving the Church, and What Comes After |
| The Reliability of Scripture | 261 | 665 KB / 253 KB | its own page, /downloads | The Reliability of Scripture. Why We Can Trust the Bible We Have |
| What Does the Bible Really Say About Homosexuality? | 189 | 540 KB / 280 KB | its own page, /downloads | the same, with: Scripture, Same-Sex Relationships, and the Church's Christ-Centered Response |
| What Does the Bible Say About Transgender Identity? | 201 | 568 KB / 273 KB | its own page, /downloads | the same, with: Gender, the Body, and the Church's Christ-Centered Response |
| Is Critical Race Theory Biblical? | 206 | 573 KB / 238 KB | its own page, /downloads | the same, with: Race, Justice, and What the Church Actually Owes the World |
| Raising Believers: Christian Parenting in a Post-Christian World | 357 | 574 KB / 195 KB | /downloads only (its old address goes there) | Raising Believers. Christian Parenting and the Costly Work of Forming Faith in a Post-Christian World |
| Deacon Qualifications and Selection | 41 | 124 KB / 145 KB | /resources/hard-issues-series, /downloads | Deacon Qualifications And Selection. Raising the Standard for Servant Leadership |
| Church Governance That Works | 43 | 125 KB / 141 KB | /resources/hard-issues-series, /downloads | Church Governance That Works. Polity, Structure, and Decision-Making for the Local Church |
| Change Without Casualties | 37 | 113 KB / 127 KB | /resources/hard-issues-series, /downloads | Change Without Casualties. A Playbook for Introducing Major Ministry Decisions |

**Covers before this work.** One JPG and one WebP per book under
`client/public/books/`, made by `scripts/book-pipeline/build-cover.py`
(Pillow, six flat type-only styles, fonts that are not the site's). No
picture, and each carries the old title in its pixels.

**Things found while reading the files, for James.**

- Three files give the author as "James C. Bell" (the two "What Does the
  Bible Say" books and Is Critical Race Theory Biblical?); the rest say
  "James Bell".
- Is Critical Race Theory Biblical? lists five sections called "Expansions"
  after its conclusion (pages 113 to the end), which read as working
  material left in the file.
- Every file's copyright page has an unfilled line: "ISBN: ____".
- Raising Believers has one subtitle in its file and another on the site.

### Held, not listed, not served

Twenty-three ebook PDFs in `content/held-downloads/` (seven name the Pastors
Connection Network; sixteen are the older titles James is rewriting) and
seven booklets in `content/held-booklets/`. Nothing in this work lists,
links, covers or prices them. A past buyer of a held ebook still gets the
file after the Stripe check (`ebook.verifyDownload` and
`/api/ebook-download` in `api/index.ts`), untouched.

### Printables: built from the repo's own content

Built by `scripts/build-pdfs.mjs` (pdfkit) on every deploy into
`client/public/downloads/`, which is not committed. 603 files on this build.
Each carries its title on its first page and in the PDF's metadata, both
written from the library's own JSON, so a title changed in the source changes
the file. None had a cover or thumbnail: on the site each was a text link.

| Kind | Items | Files | Pages each | Offered on | Built from |
|---|---|---|---|---|---|
| Study guides (leader's guide and participant handout) | 68 | 136 | 7 to 45 | each guide's page, /downloads | `client/public/studyguides/*.json` |
| Reading Scripture in context guides | 41 | 41 | 4 to 5 | each guide's page, /downloads | `client/public/context/guides/*.json` |
| Find Help printables (one-page guide, prayer cards, Scripture cards, worksheet; Letter and A4) | 80 | 320 | 1 to 2 | each care page, /downloads | `client/public/needs/*.json` |
| Eight-week care plans, as booklets (Letter and A4) | 29 | 58 | 9 to 10 | each plan's page, /downloads | `client/public/plans/*.json` |
| Worksheets (Letter and A4) | 10 | 20 | 1 to 32 | the tool or care page each goes with, /downloads | `scripts/lib/help-printables.mjs` |
| Card sets: Scripture to carry, Family table cards | 2 | 4 | 11 and 37 | /help, /family/devotions, /downloads | the same |
| Workbooks: A Weekend for Two, Before You Marry | 2 | 4 | 18 and 28 | their pages, /downloads | `client/public/workbooks/*.json` |
| Bible reading plans | 5 | 10 | 1 to 3 | /plans, /downloads | `client/src/data/bible-reading-plans.json` |
| Family booklets: Thanksgiving, Advent, Holy Week | 3 | 6 | 8, 26, 9 | /family/devotions, /downloads | `client/public/family-seasonal.json` |
| Reading paths | 4 | 4 | 2 | the pages that show a reading-path card | `client/public/reading-paths/index.json` |

**Found while counting.** `SermonSeries.tsx` and `BookReader.tsx` still hold
links to `/downloads/sermon-series/<id>.pdf` and `/downloads/books/<slug>.pdf`.
The build writes no file to either folder (the sermon-series source file is
not in the repo, and the sample chapters belong to held books). Left as found.

## 2. Titles

### The two James renamed

| Was | Now | Subtitle (unchanged, from the file) | Address |
|---|---|---|---|
| The Monster in the Mirror | **Blind Spots** | Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It | `/books/blind-spots` (the old address goes there once) |
| When God Bless America Replaces Thy Kingdom Come | **American Idols** | How Patriotism Became Our Practical Savior | `/books/american-idols` (the old address goes there once) |

**The files still carry the old titles.** Both PDFs and both EPUBs are
finished files: the title page, the running heads, the copyright page and the
EPUB's title record all say the old title, and "the monster in the mirror" is
also a phrase the book itself uses (chapter 3 is "The Monster Is Never the
One in the Mirror"). They were not edited. The site shows the new title, and
each book's card and page carries one line, "Published earlier as ...", so a
reader who opens the file is not confused. **James needs to supply corrected
files** (PDF and EPUB) for both; they go at the same addresses under
`client/public/ebook/`, and the "Published earlier as" lines come out of
`client/src/data/ebooks.ts` (`formerly`).

The file addresses did not change (`/ebook/the-monster-in-the-mirror/...`,
`/ebook/when-god-bless-america/...`), so no saved link to a file breaks.

**Two things to know about the new names.**

- "Blind Spots" is already the title of a live essay on the shelf
  (`/writing/blind-spots`) and is the name the code gives the Substack
  book-in-public (`client/src/lib/blindSpots.ts`). The book and the essay now
  share a name at two addresses.
- An essay that is still "pending" on the essay shelf is titled "When God
  Bless America Replaces Thy Kingdom Come" (`client/src/lib/shelf.json`). It
  is an essay, not the book, and it is not public; it was left as it is.

### Every other title: proposals, nothing changed

The pattern the two renames set: two or three plain words that could sit on a
spine, then a subtitle that says what the book is. Where a book's title is the
question people type into a search box, the question is kept as the subtitle
so the page is still found. Each proposal is drawn from the book's own
contents page or first pages, named in the last column. Before any of these
is settled it should be searched, since another author may already have a
book by the name.

| Current title | What is wrong with it | Proposals (title: subtitle) | Recommended | Drawn from |
|---|---|---|---|---|
| Believe: The Rational Case for Christian Faith | Nothing. One word, a plain subtitle. | 1. Keep it. 2. Honest Reasons: The Rational Case for Christian Faith. 3. Good Reasons: The Rational Case for Christian Faith. | **Keep "Believe".** | Its introduction, "The Case for a Reasonable Faith", and "written to be honest before it is written to be persuasive". |
| The Deconstruction of Faith | Reads as a textbook heading; "deconstruction" is a word half its readers do not use of themselves. | 1. Walking Away: Why People Are Leaving the Church, and What Comes After. 2. Taken Apart: Why People Are Leaving the Church, and What Comes After. 3. The Path Through: Faith After Deconstruction. | **Walking Away**, with the file's own subtitle. | Its subtitle; the introduction "The Exodus Nobody Wanted"; chapter 7 "The Path Through"; chapter 15 "Reconstruction". |
| The Reliability of Scripture | Accurate and dry; five words where two would do. | 1. Solid Ground: Why We Can Trust the Bible We Have. 2. Trustworthy: Why We Can Trust the Bible We Have. 3. The Book We Have: Manuscripts, Canon, and Why the Bible Can Be Trusted. | **Solid Ground**, with the file's own subtitle. | Its subtitle; chapters on the manuscript trail, the canon and the Dead Sea Scrolls. |
| What Does the Bible Really Say About Homosexuality? | Nine words; a search query, not a title. Does not match the shelf. | 1. Truth and Love: What Does the Bible Really Say About Homosexuality? 2. The Bigger Table: What Does the Bible Really Say About Homosexuality? 3. People, Not Issues: Scripture, Same-Sex Relationships, and the Church's Response. | **Truth and Love**, with the question as the subtitle. | The introduction's "the false choice between truth and love" and "People are not issues"; the conclusion "The Table Is Bigger Than the Argument". |
| What Does the Bible Say About Transgender Identity? | The same: a query, eight words. | 1. Image Bearers: What Does the Bible Say About Transgender Identity? 2. Clarity and Compassion: What Does the Bible Say About Transgender Identity? 3. The Body Matters: Gender, the Body, and the Church's Response. | **Image Bearers**, with the question as the subtitle. | The conclusion "Image-Bearers First"; chapter 3 "The Body Matters"; the introduction's "clarity and compassion can occupy the same room". |
| Is Critical Race Theory Biblical? | A yes-or-no question the book itself refuses to answer with yes or no. | 1. The Color Line: Is Critical Race Theory Biblical? 2. Justice and Mercy: Race, Justice, and What the Church Owes the World. 3. Right and Wrong: Is Critical Race Theory Biblical? | **The Color Line**, with the question as the subtitle. | The conclusion "The Cross and the Color Line"; chapter 12 "Building a Church That Does Justice and Loves Mercy"; chapters 6 and 7, "Where CRT Gets It Right" and "Where CRT Gets It Wrong". |
| Raising Believers: Christian Parenting in a Post-Christian World | Nothing in the title. The site's subtitle is not the file's. | 1. Keep it, and pick one subtitle. 2. Raising Believers: Forming Faith in Children in a Post-Christian World. 3. The First Classroom: Christian Parenting in a Post-Christian World. | **Keep "Raising Believers"**; settle the subtitle. | Its contents: "The Home Is the Primary Catechism", "Marriage as the First Classroom". |
| Deacon Qualifications and Selection | A committee agenda item. | 1. Worthy Servants: Choosing and Keeping Deacons. 2. Tested First: Choosing and Keeping Deacons. 3. Keep it. | **Worthy Servants: Choosing and Keeping Deacons.** | The conclusion "Servants Worthy of the Calling"; chapters on character, the selection process, and retiring and removing deacons. |
| Church Governance That Works | Fine, and a little like a business book. | 1. Who Decides: Polity, Structure, and Decision-Making for the Local Church. 2. Good Order: Polity, Structure, and Decision-Making for the Local Church. 3. Keep it. | **Who Decides**, with the file's own subtitle. | Chapter 3, "What Pastors Decide and What Belongs to the Congregation"; chapter 4 on decision-making structures. |
| Change Without Casualties | Nothing. Three words, a plain subtitle. | 1. Keep it. 2. Bring Them Along: A Playbook for Introducing Major Ministry Decisions. | **Keep it.** | Its introduction: a process "that brought the congregation along rather than informing them after the fact". |

A renamed book needs what the two above needed: a corrected PDF and EPUB from
James, since the old title is printed inside each file.
