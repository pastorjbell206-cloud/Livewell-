# Where the stored history sources came from

These are the public-domain texts the church history course quotes from
(master plan 7.2, unit U07). Every source card on a session page prints a
short excerpt from one of them, and `scripts/verify-sources.mjs` fails the
build unless the excerpt is really there. The texts live here, under
`scripts/data/`, so CI can read them on `main`.

## How they were fetched

On 2026-10-27, from a sandbox whose network reached GitHub's raw file host
(`raw.githubusercontent.com`) and refused CCEL, Wikisource, Project Gutenberg's
own site, New Advent, the Internet Archive and HathiTrust. Every text below
came from the HistoricalChristianFaith Writings-Database, a public repository
of the Ante-Nicene and Nicene and Post-Nicene Fathers series and Roger
Pearse's collections, pinned to one commit. The commit id was read from a
clone made in the same sandbox on 2026-10-26; each file was fetched by a URL
that names that commit, so the URL keeps returning the same bytes. Each file
is stored exactly as fetched, and its sha256 is in `manifest.json`: fetch the
URL again and compare.

The repository also holds English made by machine translation from Migne's
Latin and Greek. None of that is used here, and none may be: every text below
is a nineteenth-century printed translation.

## What "identified" means

Most files carry no translator's name; they are the series' text with its
headings and notes. Where the file names no translator, the translator and
volume below were identified from the file's own evidence (its chapter
headings, the editors' notes, a mirror comment, a translator speaking in a
note) and from the standard make-up of the series. No scan of a printed
volume could be reached to confirm them. Confirm against a scan before a
translator's name is printed on a source card as a settled fact.

## Why they are public domain

Every text below was printed in the United States between 1885 and 1900, in
the Ante-Nicene Fathers (1885-1887, revising the Edinburgh Ante-Nicene
Christian Library of 1867-1872) or the Nicene and Post-Nicene Fathers
(1886-1900). Works published before 1931 are in the public domain in the
United States. The source repository also states that every work in it is in
the public domain.

## The rules a quotation must keep

- An excerpt must be a normalized substring of the stored text it names: case,
  quotation-mark style, dash style and spacing are ignored; every word and
  every other mark must match. Footnote numbers are not part of the text.
- An omission is marked with an ellipsis ("...", "…" or "[...]"); the pieces
  either side are each found, in order, in one passage. A note is searched on
  its own, never joined to the body. Each piece must be at least eight
  characters.
- No editorial insertions inside an excerpt. Put a clarification outside it.
- A stored text is never edited to make a quotation pass. Fix the quotation.

## For the registry and the session pages (U30, U32)

`verify-sources.mjs` reads every JSON file under
`client/public/history/sources/` and `client/public/history/sessions/`. In
them, any object with an `"excerpt"` key, and every source card (an object
with `"type": "source"`), is checked against the stored text named by its
`"corpus"` key, or by the nearest enclosing object's `"corpus"`. Scripture
blocks (`"type": "scripture"`) are left to the quotation gate (U27). A source
card with no stored text fails: where a source could not be reached, the session
tells it in the narrative and says so, rather than carrying a card no gate can
check (master plan 7.2). Sources still in copyright are quoted briefly in the
narrative or summarized, never on a card.

## Adding a text

Fetch it by a URL that names a commit (or, where no commit can be read, record
the branch and the date), store the file unchanged in `texts/<id>.<ext>`, add
its entry to `manifest.json` with every field filled in, and run
`node scripts/verify-sources.mjs --write` to refresh the list below. A new file
format (a Project Gutenberg text is `"text"`; a TEI file from Perseus or the
Text Creation Partnership would need a converter) is added to
`scripts/lib/history-sources.mjs` with a test. `SURVEY.md` beside this file
says, for every source the course plans to use, where a public-domain text
was found or that none could be reached.

## The stored texts

<!-- generated from manifest.json by `node scripts/verify-sources.mjs --write`: do not edit by hand -->

### martyrdom-of-polycarp

- **Work:** The church at Smyrna, *The Martyrdom of Polycarp*, the whole letter, with the translators' notes
- **Translator:** Alexander Roberts and James Donaldson (not named in the file; identified, see below)
- **Edition:** Ante-Nicene Fathers, vol. 1 (1885)
- **Identified by:** The file names no translator. Its chapter headings ("Chapter I.-Subject of Which We Write.") and notes (one compares Wake's rendering) are those of the Ante-Nicene Fathers text. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the American edition of the Ante-Nicene Fathers (1885-1887), which revised the Ante-Nicene Christian Library (Edinburgh, 1867-1872). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Polycarp of Smyrna/Martyrdom of Polycarp.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Polycarp%20of%20Smyrna/Martyrdom%20of%20Polycarp.html>
- **Stored as:** `texts/martyrdom-of-polycarp.html` (31033 bytes, sha256 `8bc7ba36a75a8c2f760131eee0ea9947216c72c8fc9266a52c42c2d61c4fd245`)

### passion-of-perpetua

- **Work:** Perpetua and an unnamed editor, *The Passion of the Holy Martyrs Perpetua and Felicitas*, the whole text, with notes
- **Translator:** R. E. Wallis (not named in the file; identified, see below)
- **Edition:** Ante-Nicene Fathers, vol. 3 (1885)
- **Identified by:** The file names no translator. Its "Argument" chapter headings and the American editor's bracketed notes (one cites "the Edinburgh series (translation)") are those of the Ante-Nicene Fathers text. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the American edition of the Ante-Nicene Fathers (1885-1887), which revised the Ante-Nicene Christian Library (Edinburgh, 1867-1872). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Passion of Saints Perpetua and Felicity/The Passion of the Holy Martyrs Perpetua and Felicitas.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Passion%20of%20Saints%20Perpetua%20and%20Felicity/The%20Passion%20of%20the%20Holy%20Martyrs%20Perpetua%20and%20Felicitas.html>
- **Stored as:** `texts/passion-of-perpetua.html` (40029 bytes, sha256 `b8a29e801c365cd1cfe0890d92aef0ec9549748835d3b7168088e7215bc195c0`)

### eusebius-church-history-3

- **Work:** Eusebius of Caesarea, *Church History*, Book 3, with the translator's notes
- **Translator:** Arthur Cushman McGiffert (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 1 (1890)
- **Identified by:** The file names no translator. The notes are McGiffert's (they cite the Ante-Nicene Fathers by volume and page, and the note to 3.33 translates Pliny's letter in full), as printed in the Nicene and Post-Nicene Fathers. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Eusebius of Caesarea/THE CHURCH HISTORY OF EUSEBIUS/Book 3.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Eusebius%20of%20Caesarea/THE%20CHURCH%20HISTORY%20OF%20EUSEBIUS/Book%203.html>
- **Stored as:** `texts/eusebius-church-history-3.html` (303724 bytes, sha256 `c0f9856a4e96a4d7dd99912729dbec6f79b4e27621040ab4d4a186e99decb3b2`)
- **Holds:** Pliny the Younger, Letters 10.96 and Trajan's reply 10.97, translated in full in McGiffert's note to 3.33; Tertullian on Pliny's letter (3.33)

### eusebius-church-history-5

- **Work:** Eusebius of Caesarea, *Church History*, Book 5, with the translator's notes
- **Translator:** Arthur Cushman McGiffert (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 1 (1890)
- **Identified by:** The file names no translator. The notes are McGiffert's (they cite the Ante-Nicene Fathers by volume and page, and the note to 3.33 translates Pliny's letter in full), as printed in the Nicene and Post-Nicene Fathers. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Eusebius of Caesarea/THE CHURCH HISTORY OF EUSEBIUS/Book 5.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Eusebius%20of%20Caesarea/THE%20CHURCH%20HISTORY%20OF%20EUSEBIUS/Book%205.html>
- **Stored as:** `texts/eusebius-church-history-5.html` (305775 bytes, sha256 `6b96ab56d0184a6d36d0dc78a3a57a70845ea0e957b98f4532381aa9b9002af8`)
- **Holds:** the letter of the churches of Vienne and Lyon on the persecution of 177 (5.1-5.3)

### eusebius-church-history-6

- **Work:** Eusebius of Caesarea, *Church History*, Book 6, with the translator's notes
- **Translator:** Arthur Cushman McGiffert (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 1 (1890)
- **Identified by:** The file names no translator. The notes are McGiffert's (they cite the Ante-Nicene Fathers by volume and page, and the note to 3.33 translates Pliny's letter in full), as printed in the Nicene and Post-Nicene Fathers. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Eusebius of Caesarea/THE CHURCH HISTORY OF EUSEBIUS/Book 6.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Eusebius%20of%20Caesarea/THE%20CHURCH%20HISTORY%20OF%20EUSEBIUS/Book%206.html>
- **Stored as:** `texts/eusebius-church-history-6.html` (307256 bytes, sha256 `9dcdc7b6261722f638a3321696cf67643536b7e630867d2ce5936cfb65105e67`)
- **Holds:** the persecution under Decius (6.39), and Dionysius of Alexandria on it (6.40-6.42); Cornelius of Rome's count of the Roman clergy and the widows (6.43)

### eusebius-church-history-7

- **Work:** Eusebius of Caesarea, *Church History*, Book 7, with the translator's notes
- **Translator:** Arthur Cushman McGiffert (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 1 (1890)
- **Identified by:** The file names no translator. The notes are McGiffert's (they cite the Ante-Nicene Fathers by volume and page, and the note to 3.33 translates Pliny's letter in full), as printed in the Nicene and Post-Nicene Fathers. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Eusebius of Caesarea/THE CHURCH HISTORY OF EUSEBIUS/Book 7.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Eusebius%20of%20Caesarea/THE%20CHURCH%20HISTORY%20OF%20EUSEBIUS/Book%207.html>
- **Stored as:** `texts/eusebius-church-history-7.html` (231879 bytes, sha256 `c498ccec10b899c5c5f89039fd3ceed53e7832a67075ed41d8046477f0023509`)
- **Holds:** Dionysius of Alexandria on the plague (7.22)

### eusebius-church-history-8

- **Work:** Eusebius of Caesarea, *Church History*, Book 8, with the translator's notes
- **Translator:** Arthur Cushman McGiffert (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 1 (1890)
- **Identified by:** The file names no translator. The notes are McGiffert's (they cite the Ante-Nicene Fathers by volume and page, and the note to 3.33 translates Pliny's letter in full), as printed in the Nicene and Post-Nicene Fathers. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Eusebius of Caesarea/THE CHURCH HISTORY OF EUSEBIUS/Book 8.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Eusebius%20of%20Caesarea/THE%20CHURCH%20HISTORY%20OF%20EUSEBIUS/Book%208.html>
- **Stored as:** `texts/eusebius-church-history-8.html` (225548 bytes, sha256 `6ba642dd67552c06458a4d881f1726cf2ee6c9c47279023e53331e2e80c0dc3b`)
- **Holds:** Eusebius on the long peace before the Great Persecution and the laxity it bred (8.1)

### epistle-to-diognetus

- **Work:** Unknown, *The Epistle to Diognetus*, the whole letter
- **Translator:** Alexander Roberts and James Donaldson (not named in the file; identified, see below)
- **Edition:** Ante-Nicene Fathers, vol. 1 (1885)
- **Identified by:** The file names no translator. Its chapter headings are the Ante-Nicene Fathers headings, and its notes link to the CCEL edition of that series, volume 1 ("ANF-01"). Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the American edition of the Ante-Nicene Fathers (1885-1887), which revised the Ante-Nicene Christian Library (Edinburgh, 1867-1872). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Epistle to Diognetus/The Epistle to Diognetus.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Epistle%20to%20Diognetus/The%20Epistle%20to%20Diognetus.html>
- **Stored as:** `texts/epistle-to-diognetus.html` (36110 bytes, sha256 `c764e1cd1b9f66dddcb05ee608bffb26d5c549a0ce323c533c94919ef404694d`)
- **Holds:** the Christians in the world: 'every foreign land is to them as their native country' (chapter 5)

### justin-first-apology

- **Work:** Justin Martyr, *The First Apology*, the whole work, with notes
- **Translator:** Marcus Dods (not named in the file; identified, see below)
- **Edition:** Ante-Nicene Fathers, vol. 1 (1885)
- **Identified by:** The file names no translator. Its chapter headings ("Chapter I.-Address.") and the American editor's bracketed notes are those of the Ante-Nicene Fathers text. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the American edition of the Ante-Nicene Fathers (1885-1887), which revised the Ante-Nicene Christian Library (Edinburgh, 1867-1872). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Justin Martyr/The First Apology.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Justin%20Martyr/The%20First%20Apology.html>
- **Stored as:** `texts/justin-first-apology.html` (152585 bytes, sha256 `fd8866e03adb84203e916bc84408dd850a03814a42ceada46c763f0239598ec2`)
- **Holds:** Sunday worship and the 'memoirs of the apostles' (chapters 65-67); against exposing infants (chapters 27 and 29)

### irenaeus-against-heresies-3

- **Work:** Irenaeus of Lyon, *Against Heresies*, Book 3, with notes
- **Translator:** Alexander Roberts and W. H. Rambaut (not named in the file; identified, see below)
- **Edition:** Ante-Nicene Fathers, vol. 1 (1885)
- **Identified by:** The file names no translator. Its chapter headings and notes are those of the Ante-Nicene Fathers text. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the American edition of the Ante-Nicene Fathers (1885-1887), which revised the Ante-Nicene Christian Library (Edinburgh, 1867-1872). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Irenaeus/Irenaeus Against Heresies Book 3.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Irenaeus/Irenaeus%20Against%20Heresies%20Book%203.html>
- **Stored as:** `texts/irenaeus-against-heresies-3.html` (303264 bytes, sha256 `8a727890592f0510542eb4a71122a7ac48ffb51e6ce78f1bf18cb37e06d0c579`)
- **Holds:** the four Gospels and no more (3.11.8); the apostolic tradition in the churches (3.1-3.4)

### tertullian-apology

- **Work:** Tertullian, *The Apology*, the whole work, with notes
- **Translator:** S. Thelwall (named in the file)
- **Edition:** Ante-Nicene Fathers, vol. 3 (1885)
- **Identified by:** The file opens "[Translated by the Rev. S. Thelwall, Late Scholar of Christ's College, Cantab.]", the Ante-Nicene Fathers label. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the American edition of the Ante-Nicene Fathers (1885-1887), which revised the Ante-Nicene Christian Library (Edinburgh, 1867-1872). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Tertullian/The Apology.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Tertullian/The%20Apology.html>
- **Stored as:** `texts/tertullian-apology.html` (206815 bytes, sha256 `b5d555b7d0da9e00bcbbb1aeb6f57ad6ae6180f50392dfba67858013b7958e78`)
- **Holds:** the common fund and the care of the poor (chapter 39); prayer for the emperors (chapters 30 and 39); Christians in the common life of the empire (chapter 42); the blood of Christians as seed (chapter 50)

### origen-against-celsus-3

- **Work:** Origen, *Against Celsus*, Book 3, with notes
- **Translator:** Frederick Crombie (not named in the file; identified, see below)
- **Edition:** Ante-Nicene Fathers, vol. 4 (1885)
- **Identified by:** The file names no translator. Its chapter headings and the translator's notes on readings ("which we have adopted in the translation") are those of the Ante-Nicene Fathers text. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the American edition of the Ante-Nicene Fathers (1885-1887), which revised the Ante-Nicene Christian Library (Edinburgh, 1867-1872). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Origen of Alexandria/Against Celsus/Book 3.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Origen%20of%20Alexandria/Against%20Celsus/Book%203.html>
- **Stored as:** `texts/origen-against-celsus-3.html` (195430 bytes, sha256 `0f1aa51bb74a4e9496b495275aa45bc11ca2c748060e250b13076470c816233c`)
- **Holds:** the martyrs as men 'who can be easily numbered' (3.8)

### cyprian-on-the-lapsed

- **Work:** Cyprian of Carthage, *On the Lapsed (Treatise 3)*, the whole treatise
- **Translator:** Ernest Wallis (not named in the file; identified, see below)
- **Edition:** Ante-Nicene Fathers, vol. 5 (1886)
- **Identified by:** The file names no translator. Its "Argument" heading and numbering are those of the Ante-Nicene Fathers text. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the American edition of the Ante-Nicene Fathers (1885-1887), which revised the Ante-Nicene Christian Library (Edinburgh, 1867-1872). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Cyprian/Treatise 3. On the Lapsed.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Cyprian/Treatise%203.%20On%20the%20Lapsed.html>
- **Stored as:** `texts/cyprian-on-the-lapsed.html` (64485 bytes, sha256 `9f6f7a9b086392f3b291ee3c4f4e89488585d4b01564506d4bc199f609624b88`)

### nicaea-325-creed

- **Work:** The Council of Nicaea (325), *The Nicene Creed (the creed of 325, with its anathemas)*, the creed with the editor's notes
- **Translator:** Henry R. Percival (editor) (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 14 (1900)
- **Identified by:** The file names no translator. Its introductory note ("Found in the Acts of the Ecumenical Councils of Ephesus and Chalcedon, in the Epistle of Eusebius of Caesarea...") and transliterated Greek glosses are those of the Seven Ecumenical Councils volume of the Nicene and Post-Nicene Fathers. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Council of Nicaea of 325/The Nicene Creed.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Council%20of%20Nicaea%20of%20325/The%20Nicene%20Creed.html>
- **Stored as:** `texts/nicaea-325-creed.html` (3196 bytes, sha256 `deeb0d703d962ec4e775ff34d836f4508491ec7c318c94aaae288cf939e0e535`)

### nicaea-325-synodal-letter

- **Work:** The Council of Nicaea (325), *The Synodal Letter to the church of Alexandria*, the whole letter
- **Translator:** Henry R. Percival (editor) (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 14 (1900)
- **Identified by:** The file names no translator. Its source note ("Found in Gelasius, Historia Concilii Nicaeni... Socr., H. E.... Theodor., H. E....") is that of the Seven Ecumenical Councils volume of the Nicene and Post-Nicene Fathers. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Council of Nicaea of 325/The Synodal Letter.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Council%20of%20Nicaea%20of%20325/The%20Synodal%20Letter.html>
- **Stored as:** `texts/nicaea-325-synodal-letter.html` (6150 bytes, sha256 `61df19fabdf5c14621df5024d79325f8f1701cf0b6f4080f0227866cca3bbb28`)

### athanasius-de-decretis

- **Work:** Athanasius of Alexandria, *Defence of the Nicene Definition (De Decretis)*, the whole work, with notes and appendices
- **Translator:** Not named in the file; the Nicene and Post-Nicene Fathers translation edited by Archibald Robertson (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 4 (1892)
- **Identified by:** The file names no translator. Its chapter summaries and notes are those of the Athanasius volume of the Nicene and Post-Nicene Fathers; which hand in that volume translated this treatise was not confirmed. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Athanasius of Alexandria/De Decretis or Defence of the Nicene Definition.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Athanasius%20of%20Alexandria/De%20Decretis%20or%20Defence%20of%20the%20Nicene%20Definition.html>
- **Stored as:** `texts/athanasius-de-decretis.html` (140886 bytes, sha256 `1ca04e24a5a2a889641a3863edbc1a45f3ecdd82a0ead1f4782bf27971556f3c`)

### athanasius-on-the-incarnation

- **Work:** Athanasius of Alexandria, *On the Incarnation of the Word*, the whole work, with notes
- **Translator:** Archibald Robertson (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 4 (1892)
- **Identified by:** The file is a 2004 copy of the CCEL page for this volume (its own comment reads "Mirrored from www.ccel.org/fathers2/NPNF2-04/Npnf2-04-16.htm", and its title "Nicene and Post-Nicene Fathers, Series II, Vol. IV"); a translator's note reads "In the next clause I formerly translated...", Robertson revising his own earlier translation. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Athanasius of Alexandria/On the Incarnation of the Word.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Athanasius%20of%20Alexandria/On%20the%20Incarnation%20of%20the%20Word.html>
- **Stored as:** `texts/athanasius-on-the-incarnation.html` (264950 bytes, sha256 `8239dac327f438f2010eb2e7dd49bd7f1a0a7f65f8ce4616165454faeed1959e`)

### ambrose-letter-40

- **Work:** Ambrose of Milan, *Letter 40, to the Emperor Theodosius, on the synagogue at Callinicum*, the whole letter, with notes
- **Translator:** H. de Romestin (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 10 (1896)
- **Identified by:** The file names no translator. It is one of the selected letters with an italic summary and numbered sections, the form of the Nicene and Post-Nicene Fathers selection; the same repository also holds the complete Library of the Fathers translation (Oxford, 1881) under "Letters 31-40", which is a different text. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Ambrose of Milan/Letters/Letter 40.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Ambrose%20of%20Milan/Letters/Letter%2040.html>
- **Stored as:** `texts/ambrose-letter-40.html` (29304 bytes, sha256 `5a1cb832f8543d85fbe87a1ff7d5edfa4e6247d0fef9cca07900f0264a477392`)

### ambrose-letter-41

- **Work:** Ambrose of Milan, *Letter 41, to his sister Marcellina, on Callinicum*, the whole letter, with notes
- **Translator:** H. de Romestin (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 10 (1896)
- **Identified by:** The file names no translator. It has the italic summary and numbered sections of the Nicene and Post-Nicene Fathers selection (see ambrose-letter-40). Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Ambrose of Milan/Letters/Letter 41.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Ambrose%20of%20Milan/Letters/Letter%2041.html>
- **Stored as:** `texts/ambrose-letter-41.html` (28400 bytes, sha256 `0cc8da3ec267453a8c6d3a6676fbf1279317d9c8d4e1ebee137d08001fc015c0`)

### ambrose-letter-51

- **Work:** Ambrose of Milan, *Letter 51, to the Emperor Theodosius, after the massacre at Thessalonica*, the whole letter, with notes
- **Translator:** H. de Romestin (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 10 (1896)
- **Identified by:** The file names no translator. It has the italic summary ("Addressed to the Emperor Theodosius after the massacre at Thessalonica...") and numbered sections of the Nicene and Post-Nicene Fathers selection (see ambrose-letter-40). Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Ambrose of Milan/Letters/Letter 51.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Ambrose%20of%20Milan/Letters/Letter%2051.html>
- **Stored as:** `texts/ambrose-letter-51.html` (15251 bytes, sha256 `fc537ad2395fb32eb24406b6ad24bacea21dd015f14d024fc5456e64aaef596b`)

### theodoret-church-history-5

- **Work:** Theodoret of Cyrus, *Ecclesiastical History*, Book 5, with the translator's notes
- **Translator:** Blomfield Jackson (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, Second Series, vol. 3 (1892)
- **Identified by:** The file names no translator. Its chapter headings and the translator's notes ("which I have followed") are those of the Nicene and Post-Nicene Fathers text. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Theodoret of Cyrus/The Ecclesiastical History of Theodoret/Book 5.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Theodoret%20of%20Cyrus/The%20Ecclesiastical%20History%20of%20Theodoret/Book%205.html>
- **Stored as:** `texts/theodoret-church-history-5.html` (154026 bytes, sha256 `92b0796875a65b933caabc8aafb4eaedfd3ee3eb24751b322832bbd82f9f7ea6`)
- **Holds:** the massacre at Thessalonica and Ambrose's refusal of Theodosius (5.17-5.18)

### augustine-city-of-god-5

- **Work:** Augustine of Hippo, *The City of God*, Book 5
- **Translator:** Marcus Dods (not named in the file; identified, see below)
- **Edition:** Nicene and Post-Nicene Fathers, First Series, vol. 2 (1887)
- **Identified by:** The file names no translator. Its book "Argument" ("Augustin first discusses the doctrine of fate...") and chapter headings are those of the Dods translation as printed in the Nicene and Post-Nicene Fathers. Not checked against a scan of the printed volume: no scan library (CCEL, the Internet Archive, HathiTrust) could be reached from the sandbox.
- **Public domain:** Printed in the Nicene and Post-Nicene Fathers (New York, 1886-1900). Published before 1931, so in the public domain in the United States; the source repository also states that every work in it is in the public domain.
- **Repository:** https://github.com/HistoricalChristianFaith/Writings-Database, commit `328918aa7054fbcb2a8068e96b326a94a97345a2`
- **Path:** `Augustine of Hippo/The City of God/Book 5.html`
- **Fetched:** 2026-10-27, from <https://raw.githubusercontent.com/HistoricalChristianFaith/Writings-Database/328918aa7054fbcb2a8068e96b326a94a97345a2/Augustine%20of%20Hippo/The%20City%20of%20God/Book%205.html>
- **Stored as:** `texts/augustine-city-of-god-5.html` (121932 bytes, sha256 `896cc23cdef9a3baab717a4d89a1fe77a452ed270ce6e0bc2e0e5f7b0c6ab562`)
- **Holds:** Theodosius's public penance after Thessalonica (5.26)

<!-- end of generated list -->
