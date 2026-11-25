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
  Mirror" becomes "Blind Spots". For "When God Bless America Replaces Thy
  Kingdom Come" he first said "American Idols", then sent thirteen cover and
  title ideas of his own, and the same day chose from them ("yes do what you
  recommend"): **"A Higher Allegiance", subtitle "Reclaiming Jesus from
  American Politics"**, with the picture from his "Two Kingdoms" cover: a
  small white church on the horizon and the Capitol dome upside down beneath
  it. "American Idols" is dropped. Every other title is proposed here for him
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
file after the Stripe check (`/api/download` in `api/index.ts`), untouched;
`server/download-gifts-held.test.ts` now proves it, and proves that a gift
given with a download never opens a held book.

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
| Find Help printables (one-page guide, prayer cards, Scripture cards, worksheet; Letter and A4) | 40 | 320 | 1 to 2 | each care page, /downloads | `client/public/needs/*.json` |
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

### The two James renamed (2026-11-22)

| Was | Now | Subtitle | Address |
|---|---|---|---|
| The Monster in the Mirror | **Blind Spots** | Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It (unchanged, from the file) | `/books/blind-spots` (the old address goes there once) |
| When God Bless America Replaces Thy Kingdom Come | **A Higher Allegiance** | Reclaiming Jesus from American Politics (his own words, from his cover 04; the file's own subtitle is "How Patriotism Became Our Practical Savior") | `/books/a-higher-allegiance` (the old address goes there once) |

**The files carry the new titles (2026-11-23).** Until then both PDFs and
both EPUBs said the old title inside, and each card and page said so. James
asked for that to be fixed and for the inside to look "elite and
professional": both books were rebuilt from their own EPUB text by
`scripts/build-book-files.mjs`, word for word, with the new title in the
apparatus (section 8). `fileTitle` in `client/src/data/book-names.json` is now
the new title, so the cards say nothing about the old one; each book's own
page keeps one short line, "Published earlier as [old title].", for a reader
who knew it by that name.

The files now take the new names in the same folders:
`/ebook/the-monster-in-the-mirror/Blind-Spots.pdf` and `.epub`,
`/ebook/when-god-bless-america/A-Higher-Allegiance.pdf` and `.epub`. Each old
file address (`.../The-Monster-in-the-Mirror.pdf`, `.../When-God-Bless-America.pdf`
and their EPUBs) is a permanent redirect, one hop, in `vercel.json`, so no
saved link breaks and a reader who downloads gets a file named for the book.
The original four files are kept, unserved, in
`content/held-downloads/originals/`.

**A rename is one data change.** `client/src/data/book-names.json` holds each
of these books' name in use and its earlier names. To rename one: copy its
current slug, title and subtitle into `was`, write the new ones, and run

    node scripts/sync-book-names.mjs
    node scripts/build-covers.mjs
    pnpm exec tsx scripts/build-download-items.mjs
    pnpm run search:index

The first command rewrites every page, list, script and text file that prints
the name, adds the one-hop redirect in `vercel.json` and its stub in
`App.tsx`, and keeps the "Published earlier as" line right. Its `--check` is
in the content gates, so a name changed by hand in one place fails CI. A
Higher Allegiance was made this way. If the cover's `lines` in
`client/src/data/covers.json` no longer spell the title, the cover build says
so; fix or delete them.

**What a rename does not touch:** the PDF and EPUB (for these two books, one
more command rebuilds them: section 8); the essays (an essay that
is still "pending" on the essay shelf is titled "When God Bless America
Replaces Thy Kingdom Come", and is not public); the database; the old Stripe
ebook list in `api/index.ts`, which sells nothing; the old cover images under
`client/public/books/`, which no page shows any more.

**Two things to know about the new names.**

- "Blind Spots" is already the title of a live essay on the shelf
  (`/writing/blind-spots`) and is the name the code gives the Substack
  book-in-public (`client/src/lib/blindSpots.ts`). The book and the essay now
  share a name at two addresses.
- Before either title goes to print it should be searched for other books of
  the same name.

### The thirteen ideas James sent for the politics book

Kept on the build machine, outside the repo, and none of them is on the site.
They were read as the brief for the whole shelf: bold, real-book covers, one
strong picture, big assured title type.

| # | Title on his cover | Subtitle on it | Honest note | Fits the short pattern? |
|---|---|---|---|---|
| 01 | Our True Home | Faith, Politics, and Finding Our Hope in Something Greater | Warm, but says nothing about the church and the nation until the subtitle; could be a book about heaven. | Yes |
| 02 | Jesus Above America | What We Lose When Politics Becomes Our Gospel | Clear and strong. Reads as a slogan, and "above" can be heard as a ranking of nations. The picture is a face. | Yes |
| 03 | The American Gospel | How Political Power Has Reshaped the Faith of Many Christians | Says the thesis in three words. The phrase is in wide use already, so it would be hard to find by search. | Yes |
| 04 | **A Higher Allegiance** | Reclaiming Jesus from American Politics | **Chosen.** Names the book's own question, who you worship, without naming an enemy. Three words, a plain subtitle. | Yes |
| 05 | Two Kingdoms | Following Jesus in an Age of Christian Nationalism | The best picture of the thirteen, and the one used. As a title it is also the name of a particular Lutheran doctrine, which the book is not an account of. | Yes |
| 06 | The Gospel and the Nation | How to Love Our Country Without Losing Our Faith | Plain and accurate; reads as a textbook. | Nearly (five words) |
| 07 | Losing Jesus to Save America | How Political Convictions have Reshaped the Faith of Many American Christians | The sharpest sentence of the set. Five words. The picture is a face. | No |
| 08 | The American Idol | When Love of Country Becomes Political Idolatry | True to the book's argument. A search for it finds a television show first. | Yes |
| 09 | Loving America Without Losing Jesus | What Political Power Is Costing the American Church | Generous to the reader it is written to. Long: five words that have to be read as a sentence. | No |
| 10 | Saving America, Losing Jesus | Love Your Country, Worship Your King | A strong pair, and a good subtitle. The picture is a face. | Nearly (four words) |
| 11 | Saving America, Losing Jesus | Love Your Country, Worship Your King | The same title; the picture is a figure with the face left blank. | Nearly |
| 12 | Saving America, Losing Jesus | Love Your Country, Worship Your King | The same title; the upside-down dome alone. | Nearly |
| 13 | Loving America Without Losing Jesus | What Political Power Is Costing the American Church | The same title as 09; the picture is a face. | No |

**Recommended, and chosen:** the title of 04 with the picture of 05. The
runner-up, for a later edition or a study guide: "Saving America, Losing
Jesus" with its subtitle "Love Your Country, Worship Your King".

### Every other title: proposals, nothing changed

The pattern "Blind Spots" and "A Higher Allegiance" set: two or three plain
words that could sit on a spine, then a subtitle that says what the book is. Where a book's title is the
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

A renamed book needs what the two above needed: a PDF and EPUB that carry the
new title, since the title is printed inside each file. For a book whose text
is in `content/books-src/<id>/` that is one command (section 8); the other
books' text is not in the repo in that form yet (their EPUB text can be
taken out the same way).

## 3. Covers

One cover system, drawn from data by `scripts/build-covers.mjs`.

**The family.** A 6 by 9 cover. The title large at the head in Cormorant
Garamond capitals, one word in the accent colour; the subtitle in italic; a
short rule; one engraved picture that tells the book's idea; "JAMES BELL"
letterspaced at the foot; a spine band at the left with one small mustard
mark. Grounds alternate between cream and charcoal so each book is told apart
at thumbnail size. The three booklets are the same book with a charcoal band
at the head ("A booklet for church leaders") and the title in upper and lower
case. The short printables wear a lighter card by kind: a cream sheet, a
roundel with a small emblem, the kind's name.

**The hand.** The site's own (`client/src/components/art/README.md`): an ink
line with square ends, shade by hatching only, one flat tone block printed
off register, one mustard mark as the light. No faces, no photographs, no
stock pictures. The colours are the tokens in `client/src/index.css`, read by
the script, so a change to the palette changes the covers on the next build.
The type is the site's self-hosted fonts, set as outlines
(`scripts/lib/cover-type.mjs`), so a cover is the same on every machine.

**The pictures** (`scripts/lib/cover-art.mjs`), each drawn for its book:

| Book | Picture |
|---|---|
| A Higher Allegiance | A small white church on the horizon; beneath the line, where its reflection would be, a capitol dome upside down. James's idea (his cover 05), redrawn; his file was not traced or shipped. |
| Blind Spots | A pair of spectacles over an open Bible, one lens blacked out. |
| Believe | A balance: a stone in the high pan, a small light in the low one. |
| The Deconstruction of Faith | A church front with its stones taken down and stacked beside it, the round window still lit. |
| The Reliability of Scripture | A clay storage jar and an unrolled scroll, its first letter gilded. |
| What Does the Bible Really Say About Homosexuality? | A long table set with bread and a cup, under an arched window (the book's conclusion is "The Table Is Bigger Than the Argument"). |
| What Does the Bible Say About Transgender Identity? | A door standing open, light falling through it across the floor. |
| Is Critical Race Theory Biblical? | A plumb line hanging between a wall built true and a wall that leans. (A first drawing hung the line from a beam on a post; on this book that shape was wrong, and it was redrawn with no beam and no post.) |
| Raising Believers | A young tree tied to a stake beside a house, the sun above it. |
| Deacon Qualifications and Selection | A basin, a pitcher and a towel. |
| Church Governance That Works | Three columns carrying a pediment. |
| Change Without Casualties | A compass rose, its north point gilded. |

**The files**, under `client/public/covers/`, named by the book's folder under
`/ebook/` (which a rename never changes): `<id>-400.webp` (400 by 600, the
shelf), `<id>-800.webp` (800 by 1200, a book's own page), `<id>.jpg` (1200 by
1800, the share image), and `kind-<kind>-400.webp` (400 by 518). 46 files,
about 2.4 MB.

**To change a cover:** edit its entry in `client/src/data/covers.json`
(`lines`, `ground`, `tone`, `art`), or its drawing, and run
`node scripts/build-covers.mjs`. Add `--sheet <file.png>` for a contact sheet.

**To use a finished cover image instead of the drawn one** (James may want
one of his own used as it is): put the file in `content/cover-uploads/`, add
`"image": "content/cover-uploads/<file>"` to the book's entry, and run the
build. The image is cropped to 2 by 3 and written at the same three sizes, so
no page changes. Tried with a plain test image; none of James's thirteen is in
the repo.

**The drift check.** `node scripts/build-covers.mjs --check` redraws every
cover and compares its fingerprint with `scripts/covers-manifest.json`, and
checks each file's size. It is in the content gates, so a change to the data,
a drawing, the type or a colour token that was not followed by a rebuild
fails CI.

**How the type is made, and one thing to know.** No dependency was added.
`fontkit`, which reads the font files, is resolved through `pdfkit` (already
used by `scripts/build-pdfs.mjs`); `sharp`, which renders, is already used for
share images. fontkit cannot make a weight of a variable WOFF2 file, so
`cover-type.mjs` applies the weight glyph by glyph with fontkit's own
variation processor. If a later pdfkit drops fontkit, this script is where it
shows.

## 4. Suggested gifts on downloads

### The ladder (`shared/downloads.ts`, the one data file)

| Suggested | What | Why |
|---|---|---|
| $8.99 | A Higher Allegiance, Blind Spots, Believe, The Deconstruction of Faith, Raising Believers | The amount James named. The three shelf books, and the two others of 350 pages or more. |
| $6.99 | The Reliability of Scripture | A shorter book, 261 pages. |
| $5.99 | The two "What Does the Bible Say" books, Is Critical Race Theory Biblical? | Short books, about 200 pages each. |
| $4.99 | A workbook (A Weekend for Two, Before You Marry) | 18 to 28 pages, used by a couple or a group over several sittings. |
| $3.99 | A booklet for church leaders | About 40 pages. |
| $2.99 | A study guide (leader's guide and handout together), the Advent family booklet (26 pages), an eight-week plan booklet | One ask covers every file of the guide. |
| $1.99 | A context guide, a worksheet, a card set, a Bible reading plan, a family booklet, a reading path, a care page's set of printables | Anything short. One ask covers Letter and A4. |

Nothing is suggested below $1.99. Stripe keeps 30 cents and 2.9 percent of
each payment, which is a third of a 99-cent gift, and the least a gift can be
is $1, the giving page's own floor. A reader can still type $1.

An amount is by kind, with a short list of items that differ
(`ITEM_SUGGESTED_CENTS`). To change one, edit `shared/downloads.ts`; nothing
else needs rebuilding.

### Where no one is asked

The Find Help printables (40 care pages), the 29 eight-week care plans, and
five worksheets written for grief, abuse and a marriage in trouble download at
once, with no sheet, in both states. James said "everything"; this is the one
place his word was not followed to the letter, because a request for money
standing between a person in distress and the page they came for breaks the
site's own rule for the hard places (CLAUDE.md, "Care for the reader in the
hard places"). Each keeps a suggested amount in the data. To turn the ask on
for them, set `ask: true` on `care-page` and `care-plan` in
`shared/downloads.ts` and empty `NO_ASK_ITEMS`. It is his to decide.

### What a reader sees

**Held (today: `open` is false in `client/src/lib/giving.json`).** Exactly
what they saw before: every download is a plain link, the ebook buttons read
"Download free", nothing mounts and the server is never asked.

**Open.** The first time a reader asks for a download, a small sheet rises
(from the foot of a phone's screen; centred on a laptop):

- the cover, the label "Your download", the title;
- "Suggested gift: $8.99";
- "A gift with this book helps keep the work going. Give what you like, or
  nothing." (book, study guide, worksheet and so on, by kind);
- four amounts, the suggested one already chosen ($5, $8.99, $15, $25 for a
  full book), and "Another amount";
- the button "Give $8.99 and download";
- beneath it the plain link "Download without giving", which is the very file
  that was asked for;
- small: "You give on Stripe's payment page, then come back here and the
  download starts." then the giving page's two lines (who receives gifts, and
  that a gift is not tax-deductible) and "Nothing on this page is tax or
  financial advice."

Other lines a reader can meet: "Enter an amount in dollars and cents, such as
5 or 8.99."; "The smallest gift this page takes is $1."; "The largest gift
this page takes is $5,000."; "The gift could not be started. Nothing was
charged."; "Opening the payment page".

After a gift Stripe returns the reader to `/downloads/thanks`: "Thank you" /
"Your gift helps keep this work going." / "Your download should have started.
If it has not, here it is: Download [title]." / "Stripe, the company that
handled the payment, holds the record of your gift. LiveWell keeps no list of
who gives." / "Nothing on this page is tax or financial advice." / "Back to
Downloads". If they leave Stripe's page without giving: "Nothing was charged"
/ "You left the payment page before giving. Your download is still yours." /
"Here it is: Download [title]." On another device, where the file is not
remembered: "Your download is on the Downloads page, with everything else
there is to print or read."

While open, the shelf also shows "Suggested gift: $8.99" on each book and
"Suggested gift: $2.99" on each printable that asks; the ebook buttons read
"Download"; the book pages read "Suggested gift: $8.99 · EPUB and PDF · no
email asked" and "An EPUB for your e-reader and a PDF for everything else.
The download carries a suggested gift, which you can change or skip."; and
the top of the bookshelf on /downloads reads "Each download carries a
suggested gift. You can change the amount or skip it: no account, and no one
is turned away." followed by the giving page's two lines and the advice line.

**It does not nag.** A download that has raised the sheet does not raise it
again that day, by any of its files. Once any $1.99 thing has raised it, no
other $1.99 thing does that day. So a parent printing the family cards meets
the sheet at most once a day and is two taps from the file when they do. The
device remembers this (`livewell-gift-asked-v1`, through the storage helper);
nothing is sent anywhere. A click meant for a new tab or a save passes
straight through, and a reader with no JavaScript gets the file.

### How it is built

- **One listener, no page edited.** `components/DownloadGiftHost.tsx` is
  mounted once beside the router. Held, it renders nothing. Open, it watches
  for a click on any link whose address `shared/downloads.ts` knows as a
  download, and raises the sheet in its place. Every download link on the
  site stays an ordinary link, and a link added later is covered.
- **The server takes an id and an amount, nothing else.**
  `giving.createDownloadCheckout`, in both runtimes
  (`server/giving-router.ts`, `api/index.ts`), from one shared module. The id
  is looked up in `shared/download-items.json` (216 downloads, written by
  `scripts/build-download-items.mjs` from the same sources the Downloads shelf
  lists); an id that is not in it is refused, so the page can never name a
  file. The return address is built by the server. The price is sent inline.
  Nothing is stored, and nothing about the giver or the gift is logged.
  `server/api-parity.test.ts` is green and `KNOWN_PROD_GAPS` is still empty.
- **The files stay where they are.** No token, no account: he chose that no
  one is blocked. The thank-you page hands back only a file this device
  remembered and that is one of this site's own downloads for that id.
- **The old Stripe ebook code is untouched** and still sells nothing. A
  download gift carries no book slug, so the old webhook ignores it and it
  can never open a held book.

## 5. What opens it

The same two things as the giving page (`docs/work/elite/giving.md`), and
they open together:

1. `STRIPE_SECRET_KEY` set in Vercel for Production, and the site redeployed.
2. `"open": true` in `client/src/lib/giving.json`, then
   `pnpm run search:index`, committed together (the giving page's own step).

Nothing else. No price or product has to be made in Stripe, no webhook is
needed, and no other index changes with the switch. With the switch on and no
key, every download is still a plain link.

**Indexes to rebuild when the content changes, not when the switch does:**
after adding a study guide, a printable or an ebook, run
`pnpm exec tsx scripts/build-download-items.mjs`; after a change to
`covers.json`, a drawing or a colour token, `node scripts/build-covers.mjs`.
Both have `--check` in the content gates.

**Wording that stays "free" while giving is open, for James to settle:** the
search title of /downloads ("Free Printable Bible Study Guides and PDFs") and
the Downloads room's line in the menus ("Free guides and plans to print or
keep.") are fixed text read by the build, so they do not follow the switch.
They are true (nothing is charged for), but they sit near an ask.

## 6. Tests

- `server/download-gifts.test.ts`: the amounts data (every download has a
  kind, a title and an amount on the ladder; the hard places never ask); which
  address is which download; the one check (a bad id, a file path, a held
  book, a bad amount); the Stripe request; both runtimes with a stand-in for
  Stripe (no key, a bad download, a bad amount, POST only, Stripe failing,
  nothing logged, nothing stored).
- `server/download-gifts-held.test.ts`: with the switch off both runtimes
  refuse even with a key; a past buyer of a held book still gets the file
  after the Stripe check; an unpaid session gets nothing; a download gift
  never opens a held book; the old checkout still refuses to sell one.
- `client/src/components/DownloadGift.test.tsx`: held, a plain download and
  the server never asked; open with no key, the same; open, the sheet, the
  skip link, giving, another amount, asked once, small things once a day, the
  hard places never, Stripe failing; the thank-you page in its three states;
  the words.
- `client/src/data/book-names.test.ts`: the two renames, each old address one
  hop to its book, "Published earlier as", the covers present for every
  listed book and for no held one, and both scripts' `--check`.

No real payment was made. Stripe was a stand-in in every test.

## 7. Questions for James

1. Done 2026-11-23: Blind Spots and A Higher Allegiance were rebuilt under
   their new titles from their own text (section 8, which has his questions
   about the two files).
2. The titles table above: which of the proposals, if any.
3. Are the amounts right, and is $1.99 the right floor?
4. The Find Help printables and the care plans do not ask. Should they?
5. Do you want any cover replaced with a finished image of your own?
6. Three files say "James C. Bell" and nine say "James Bell". Which is it on
   a cover? (The drawn covers all say James Bell.)
7. Is Critical Race Theory Biblical? ends with five sections called
   "Expansions". Are they meant to be in the published file?
8. "Blind Spots" is also the title of a live essay. Is that all right?
9. Should /downloads stop calling itself "Free Printable ..." in search
   results once giving opens?

## 8. The two renamed books, rebuilt (2026-11-23)

James asked on 2026-11-22 that the PDF and EPUB of Blind Spots and A Higher
Allegiance stop carrying the old titles inside, and that "the inside look
elite and professional". Both books were rebuilt from their own text.

### How it is made

`content/books-src/<id>/` holds each book's text: the chapter files of its
original EPUB (`sec01.xhtml` and on, since edited at James's instruction for both
books, see "The edit" below), and
`book.json` (the
author's name as the file has it, the EPUB identifier, the copyright notice,
the served and original file names). The title and subtitle come from
`client/src/data/book-names.json`, the cover from `client/public/covers/`, the
title-page picture from `scripts/lib/cover-art.mjs` and the colours from the
tokens in `client/src/index.css`.

    node scripts/build-book-files.mjs <id> --verify    one book
    node scripts/build-book-files.mjs --all --verify   both

It is run by hand, not in CI, and needs the machine's Playwright Chromium and
poppler's `pdftotext`; no dependency was added. It writes the PDF and EPUB
into `client/public/ebook/<id>/` (`--out` writes elsewhere, `--keep` keeps
the print HTML and each pass). After a rebuild, put the new page count in
`client/src/data/ebooks.ts`.

**The PDF** is a 6 by 9 trade interior set by Chromium's print engine with CSS
paged media. The new cover is the first page, full bleed. Then a half-title,
the title page with the cover's engraved picture, the copyright page and the
contents with page numbers, the front matter numbered in roman. Every chapter
opens on a right-hand page with a generous sink: the chapter's label in
letterspaced capitals, the title in Cormorant Garamond, the subtitle in
italic, a short rule in the accent, and the first three words in small
capitals. The text is Source Serif 4 at 10.5 points on 15, justified and
hyphenated, with first-line indents and no space between paragraphs.
Margins are mirrored with a wider gutter. Running heads (the book's title on
the left, the chapter's on the right) are letterspaced capitals and are left
off chapter openers, part pages and blank pages; folios sit at the foot on
the outside. Quotations are set in from both sides with their reference on
its own line. Bookmarks list the contents, parts and chapters; the title,
author, subject, language and page labels are set. Chromium does not
hyphenate a word that begins with a capital or ends in "'s", so such a word
gets a soft hyphen at the point Chromium's own dictionary gives it, and only
where a line actually breaks (the book is set twice to find those places,
and the lines are compared to prove nothing else moved).

**The EPUB** is EPUB 3 with the same identifier as before (so a reader's
library treats it as an update), the new cover with alt text, one file per
chapter, a contents nav with landmarks and an NCX. Its stylesheet uses
relative sizes only and sets no text colour, background or body font, so a
reader's own font, size and night mode apply; Cormorant Garamond is embedded
for headings (SIL Open Font License, which allows it; the font files carry
their copyright and licence address).

### The one rule: the typesetter adds nothing

The script is a typesetter: it sets the words in the source folder and
changes none of them. When this section was written (2026-11-23) the rule
went further, that the source folder was the original EPUB's text and the
author's words did not change at all. On 2026-11-25 James asked for his
books to be edited (see "The edit" below), so the rule now has two halves.
`--verify` proves that the built PDF and EPUB are, word for word, the source
folder's text with only the typesetting listed here. And for a book whose
`book.json` records no edit, it still proves the source folder is the
original EPUB's text. What an edit kept is proved elsewhere, by the fact
diff against the original. The originals stay untouched in
`content/held-downloads/originals/`.

What the script does to the text, each counted on every run (both columns
are the edited texts, 2026-11-25):

| Change | Blind Spots | A Higher Allegiance |
|---|---|---|
| Straight double quotation marks set as curly ones | 298 | 1,090 |
| Straight apostrophes and single quotation marks set as curly ones | 652 | 494 |
| Double hyphens set as dashes | 0 (none in the text) | 0 (none in the text) |
| Markdown asterisks around an end-of-chapter label removed, the label set as a heading (Key Takeaways, Reflection Questions, Practices, Sources & Notes) | 0 | 32 labels |
| Markdown backslashes removed from list numbers ("1\\." to "1.") | 0 | 42 |
| Other Markdown backslashes removed ("\\_" in a fill-in blank, "\\..." twice) | 0 | 9 |
| A stray Markdown asterisk removed (chapter 1: "...that you would condemn in your opponents.*") | 0 | 1 |
| List items the source ran together with double spaces set one to a line | 0 | 165 breaks |
| "- " list items set with a bullet | 0 | 48 |
| "- " before a source in Sources & Notes dropped (every chapter's sources set alike) | 0 | 17 |
| Empty citation elements dropped (stray empty blocks) | 0 | 133 |
| A reference at the end of a quotation set on its own line (no word moved) | 0 | 53 |
| LORD, written in capitals in the source, set in small capitals | 12 | 0 |
| First three words of a chapter set in small capitals by the stylesheet | 15 | 11 |
| Soft hyphens at a line break (PDF only, invisible elsewhere) | 85 | 61 |

Widows and orphans are held to two lines; headings keep with what follows.

**The proof as first run, 2026-11-23, before any edit** (`--verify`, and an
independent check written apart from the script). The old EPUB's chapter text
and the new EPUB's were compared word by
word with only whitespace and quotation-mark shapes normalised, the list
markers a reader's software draws put back: Blind Spots 65,747 words against
65,747, no difference at all; A Higher Allegiance 56,548 against 56,531, and
every difference falls in the classes above (56 label words with asterisks,
42 escaped list numbers, 3 escaped words, 48 hyphens set as bullets, 17
hyphens dropped before sources, 1 stray asterisk), nothing else. The new
PDF's pages, from the first chapter on and without running heads or folios,
were compared with the new EPUB character by character with whitespace
removed, ligatures unfolded and line-end hyphens resolved against the text:
Blind Spots 338,952 characters, A Higher Allegiance 287,939, no difference.

**The old PDF against the old EPUB.** Compared the same way (letters, digits
and punctuation; case, spacing and quotation-mark shapes set aside), the two
old files of each book carry the same text. The one difference: the old A
Higher Allegiance PDF printed a lone dash under each of its 133 quotations
whose citation was empty in the EPUB. Nothing had to be reconciled.

### The edit (2026-11-25)

James, 2026-11-25: "i also want you to go through all the book, pdfs, and
downloadable content to make it sound human and like me". And, the same day,
on whether a book keeps its fragments: "use full paragraphs in the books
too", so `docs/VOICE-JAMES-BELL.md` governs the books as well as the site.

Blind Spots was the first book. Its chapter files in
`content/books-src/the-monster-in-the-mirror/` were edited as exact old/new
pairs, one commit a chapter; `book.json` now carries `edited` (the date, his
words, and where the record is). The record is
`docs/work/elite/voice-books/blind-spots.md`: per chapter, the counts, the
fact diff's result, five pairs, and what was left alone and why. In short:
em-dashes in his prose fell from 853 to 148 (13.9 to 2.4 per 1,000 words;
his limit is 4 to 6; headings, subtitles and block quotes keep theirs), fragment stacks were joined into
sentences, a few filler words went, and nothing else changed. The fact diff
passed on all fifteen chapters: every heading, subtitle, pull quote and block
quote identical; every quotation, Scripture reference, year, number, name
and hedge word by count.

What `--verify` proves now, on the rebuilt files:

- the EPUB carries exactly the source folder's text with the listed
  typesetting: 65,014 words against 65,014, no difference (the original had
  65,747 by the same count, which counts a spaced dash as a word; the edit
  removed 705 dashes and 28 words);
- the PDF's pages, from the first chapter on, carry the same text character
  for character: 338,523 characters against 338,523;
- A Higher Allegiance, not yet edited when Blind Spots was rebuilt, was
  still held to its original: 56,548 words in the source folder against
  56,548 in the original EPUB, no difference.

The PDF is still 244 pages (so `client/src/data/ebooks.ts` is unchanged),
1.8 MB; the EPUB is 409 KB. The contents, a chapter opening, a spread and
the last pages were looked at as images after the rebuild.

**A Higher Allegiance was the second book, the same day.** Its profile is
the reverse of Blind Spots: almost no long dashes, but the most runs of very
short sentences of any of his books and many one-line paragraphs in a row.
Its chapter files in `content/books-src/when-god-bless-america/` were edited
the same way, one commit a chapter, and its `book.json` carries `edited`.
The record is `docs/work/elite/voice-books/a-higher-allegiance.md`. In
short: 344 edits; his prose went from 985 paragraphs to 826 and from 174
paragraphs of fifteen words or fewer to 76 (none now next to another); runs
of three fragments fell from 62 to 11; length moved by less than half a
percent (45,246 words to 45,053); ten words from CLAUDE.md's Forbidden
Language list were replaced with the plain word. Every paired criticism of
right and left is word for word. The end matter of every chapter (Key
Takeaways, Reflection Questions, Practices, Sources & Notes) is identical to
the original. The fact diff passed on all eleven chapters.

`--verify` on its rebuilt files: the EPUB carries exactly the source
folder's text with the listed typesetting (56,225 words compared after the
list marks are set aside, no difference); the PDF's pages carry the same
text character for character (286,910 against 286,910). The PDF is 207
pages (it was 212; `client/src/data/ebooks.ts` now says 207), 1.7 MB; the
EPUB is 353 KB. The contents, a chapter opening, two spreads and a page of
Sources & Notes were looked at as images.

Both books are now edited, so no book is at present held to its original by
`--verify`; the check stays in the script for the next book that is typeset
before it is edited.

### Believe, brought into the typesetter (2026-11-25)

Believe: The Rational Case for Christian Faith (id `believe`) was the third
book. It had no source folder, so before any word was edited it was brought
in as the other two were: the original PDF and EPUB are kept, untouched, in
`content/held-downloads/originals/` (`Believe.pdf`, `Believe.epub`), the
EPUB's fifteen chapter files are in `content/books-src/believe/` byte for
byte, and the book was built once with no edit and verified against the
original.

**Its two original files did not carry the same things.** Compared letter by
letter, the old PDF's text from the introduction to chapter 12 is the old
EPUB's, with these differences:

- the PDF had a dedication ("For Susanna ... For five sons ... For the
  atheist I was ...") and four part pages (Part One, Foundation, "Can we
  know anything at all?"; Part Two, The Person, "Who was Jesus, really?";
  Part Three, The Hard Questions, "What about the things that make belief
  hard?"; Part Four, The Verdict, "What will you do with what you now
  know?"). The EPUB had neither;
- the EPUB had two appendices (A, Recommended Reading; B, Greek & Hebrew
  Glossary). The PDF had neither;
- the PDF's title page said "The Rational Case for Christian Faith", the
  site's subtitle; the EPUB's said "The Evidence for God, the Reliability
  of the Bible, and the Case That Jesus Rose from the Dead".

Nothing of his was dropped: the new PDF and EPUB both carry the dedication,
the four part pages and the two appendices, and both use the site's
subtitle. The typesetter was changed for this in general terms, not for
this book alone (each is in the script's header):

- `book.json` may give a `dedication`, set on its own page after the
  copyright page (and as its own file in the EPUB);
- `book.json` may name, in `fromOriginalPdf`, section files whose words come
  from the original PDF (here `part1.xhtml` to `part4.xhtml`). `--verify`
  leaves them out of the comparison with the original EPUB and checks
  instead that their words, and the dedication's, are in the original PDF
  letter for letter;
- `book.json` may name, in `entries`, sections whose paragraphs under a
  heading are entries of a list (the reading list and the glossary): each
  is set with a hanging indent, as a source is in "Sources & Notes" (80
  entries);
- a source paragraph marked `class="first"` is read as a paragraph (this
  EPUB marks the first paragraph under each heading; the typesetter sets
  its own indents);
- a label the source writes all in capitals ("APPENDIX A", "INTRODUCTION")
  is set in capitals and small letters in the contents and bookmarks.

**The proof, before any edit.** `--verify`: the source folder's EPUB-derived
text is the original EPUB's, 49,624 words against 49,624, no difference; the
part pages and the dedication are in the original PDF; the new EPUB carries
exactly the set text (49,667 words, the 43 more being the part pages); the
new PDF's pages carry the same text character for character (235,684
against 235,684). Typesetting counted: 82 straight double quotation marks
and 206 apostrophes set curly, 80 entries, 15 lead-ins, 67 soft hyphens at
line breaks. The two earlier books were built again with the changed script
(into a scratch folder; their served files were not touched) and verify as
before: Blind Spots 244 pages, A Higher Allegiance 207, both identical.

**The files.** The old PDF was 392 small-type pages; the new one is 191
pages in the same 6 by 9 design as the other two (`client/src/data/ebooks.ts`
now says 191). The names did not change (`Believe.pdf`, `Believe.epub`), so
no redirect was needed. The dedication, the contents, a part page, a
chapter opening, a spread with a block quotation, the reading list and the
glossary were looked at as images.

**Left as found, for James.** In Appendix A, under "The Problem of Evil and
Suffering: Best Books", four entries are run together in one paragraph with
no space between them ("... (Intro)Lewis, C. S. A Grief Observed. ...
wife's death.Moltmann, Jürgen. ..."). That is how the original EPUB has it,
and the typesetter does not change his text.

### The apparatus

- The new title and subtitle are on the cover, half-title, title page,
  copyright page, running heads, bookmarks, the EPUB's title record, nav and
  NCX, and the PDF's title, author and subject. Neither book has an "also
  by" page.
- Copyright page: the unfilled "ISBN: ____" line is gone. Added: "Previously
  published as [old title]." and, for A Higher Allegiance, the site's address
  (Blind Spots already printed it). Nothing else was added: no ISBN,
  publisher, edition, year, Library of Congress or printer line. Blind
  Spots uses the notice its old PDF printed ("... No part of this book may be
  reproduced in any form without written permission, except for brief
  quotations in reviews."), which is fuller than its old EPUB's; both new
  files carry it. A Higher Allegiance's notice is the same in its old PDF
  and EPUB.
- The author is "James Bell" in both books, as both files had it.
- Neither book names the Pastors Connection Network.

### Where the old titles' words stay in the text

Left exactly as written:

- **Blind Spots, chapter 3**: its title is "The Monster Is Never the One in
  the Mirror", and the chapter says "The monster is never the one in the
  mirror.", with "The Mirror Test" as a heading.
- **Blind Spots, chapter 10, under "The Face in the Mirror"**: "We have
  arrived, at the end of ten chapters, at the place where the book's title
  finds its full meaning. The monster in the mirror is not a dramatic
  horror ..." and, later, "The monster in the mirror is something
  considerably more disturbing ...". This sentence names the old title as
  the book's title.
- **Blind Spots, Appendix C**: "... is the empirical background for Chapter
  3's argument about the monster in the mirror."
- The image of the mirror runs through chapters 3, 6 ("The Mirror Test,
  Applied"), 7 ("The Other Side of the Mirror"), 10 and the conclusion.
- **A Higher Allegiance, chapter 5 (Civil Religion)**: three sentences quote
  the two phrases of the old title: "... singing "Holy, Holy, Holy" or "God
  Bless America."", "... how "God Bless America" quietly replaced "Thy
  Kingdom Come" as the functional prayer of the church ...", and "Let "Thy
  Kingdom Come" be the prayer of the church. And let "God Bless America"
  return to what it was always meant to be ...".

### The files

| | Pages | PDF | EPUB |
|---|---|---|---|
| Blind Spots, before | 274 | 756 KB | 274 KB |
| Blind Spots, 2026-11-23 | 244 | 1.7 MB | 399 KB |
| Blind Spots, edited, 2026-11-25 | 244 | 1.8 MB | 409 KB |
| A Higher Allegiance, before | 495 | 767 KB | 733 KB |
| A Higher Allegiance, 2026-11-23 | 212 | 1.7 MB | 345 KB |
| A Higher Allegiance, edited, 2026-11-25 | 207 | 1.7 MB | 353 KB |
| Believe, before | 392 | 636 KB | 180 KB |
| Believe, typeset, 2026-11-25 (no word changed) | 191 | 1.4 MB | 300 KB |

The old PDFs were set loosely (A Higher Allegiance at about 115 words a
page); the new ones at about 270. The new PDFs are larger: they carry the
cover image, the embedded fonts and the tags a screen reader uses.

### Checked, and not

- epubcheck is not on the build machine and was not installed, so it was not
  run. The EPUBs were checked by a script instead: the mimetype first and
  stored, container.xml, the package against the files, every chapter well
  formed, every link and anchor resolving, the contents in spine order,
  landmarks present. Both pass.
- The PDFs were checked for lines running past the text block (none),
  headings stranded at a page foot (none), single lines at a page top or foot
  (none), and soft hyphens anywhere but a line end (none). About 100 lines in
  each book still have word gaps wider than 7 points (of about 6,000), and a
  page ends two to six lines short where a heading, a short quotation or the
  end-of-chapter section would not fit beneath it.
- Chromium embeds Cormorant Garamond's upright (a variable font) as a Type 3
  font. It prints and reads as text, but a commercial printer's preflight may
  flag it.
- Pages were looked at as images (the contact sheets) and the EPUB chapters
  at a phone's width, in light and dark. No person has read either new file
  from end to end.

### Questions for James

1. Blind Spots, chapter 10, says "the place where the book's title finds its
   full meaning. The monster in the mirror is ..." Under the new title, do
   you want to change that sentence? (Nothing in the text was changed.)
2. A Higher Allegiance, chapter 1: "...that you would condemn in your
   opponents.*" carried a stray asterisk, which was taken out as a leftover
   mark. Was something meant there?
3. Blind Spots' copyright page now carries the fuller notice its old PDF
   had. Is that the notice you want, and do you want an ISBN when there is
   one?

## 9. /downloads paints its first shelf from the HTML (2026-11-23)

Lighthouse scored /downloads 59 for performance because the page's largest
paint on a phone, the first cover, only existed after the app's script had
run. The prerendered page (`scripts/prerender-heads.mjs`, `PAGE_BODIES`) now
carries the top of the page and the first shelf: the three books with their
covers, titles, subtitles, page counts and file links, before the plain list
of every download it already had for crawlers. Each cover is the same file
and box as the real shelf's (400 by 600, shown 230 wide on a phone), so
nothing moves when it arrives, and the head preloads the first one. The
styles are `.prerender-content .pre-shelf` and its parts in `index.css`.

`lib/prerender-hold.ts` keeps the held page on screen until a picture it
shows has been loaded, decoded and drawn (two frames after `decode()`, or
the hold's longest wait). Without that, on a fast load the app could take the
held page away before its cover was painted, and the real page's cover
became the largest paint, timed from the app. Only /downloads holds a
picture today. The second and third covers load lazily.

Measured with the pinned Lighthouse (`scripts/lighthouse-median.mjs`, phone,
three runs) on the served build (`scripts/serve-like-vercel.mjs`), the
machine's load under 6:

| | Performance (runs) | Median | LCP (Lighthouse's estimate) | LCP in the browser | CLS |
|---|---|---|---|---|---|
| Before | 67, 62, 57 | 62 | 5.2 s | 0.6 to 1.0 s (the cover the app draws) | 0 |
| After | 70, 69, 66 | 69 | 4.0 s | 0.26 to 0.31 s (the cover in the HTML) | 0 |

The paint a reader sees came forward by more than half a second. Lighthouse's
estimate moved less, because it counts every file requested before the
largest paint (the app's script among them) as if fetched on a slow phone
network; the score is held down most by the app's script time (about 0.7 to
0.9 s of blocking). Two cautions for anyone measuring: the local server keeps
compressed files in memory, so restart it after a rebuild; and
`prerender-heads.mjs` must run once on a fresh `pnpm build`, since a second
run reads its own output as the template and puts the page text outside the
shell, where the hold cannot find it.
