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

**The files still carry the old titles.** Both PDFs and both EPUBs are
finished files: the title page, the running heads, the copyright page and the
EPUB's title record all say the old title, and "the monster in the mirror" is
also a phrase the book itself uses (chapter 3 is "The Monster Is Never the
One in the Mirror"). They were not edited. The site shows the new title, and
each book's card and page carries one line: "Published earlier as [old
title]. The file still carries that title." **James needs to supply
corrected files** (PDF and EPUB) for both. They go at the same addresses
under `client/public/ebook/`; then set `fileTitle` to the new title in
`client/src/data/book-names.json` and run `node scripts/sync-book-names.mjs`,
and the "Published earlier as" lines go.

The file addresses did not change (`/ebook/the-monster-in-the-mirror/...`,
`/ebook/when-god-bless-america/...`), so no saved link to a file breaks. A
reader who downloads one gets a file named for the old title.

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

**What a rename does not touch:** the PDF and EPUB; the essays (an essay that
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

A renamed book needs what the two above needed: a corrected PDF and EPUB from
James, since the old title is printed inside each file.

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
| Is Critical Race Theory Biblical? | A plumb line hanging true beside a wall that leans. |
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

1. The corrected PDF and EPUB for Blind Spots and for A Higher Allegiance:
   until they come, each says "Published earlier as ...".
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
