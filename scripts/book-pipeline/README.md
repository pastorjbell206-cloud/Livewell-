# Book / Resource Production Pipeline

Reusable tools that turn a `.docx` manuscript into LiveWell-house **interior PDF +
EPUB + cover** and place it on the site. This is the same pipeline used to ship the
17 books and the 10 Hard Issues booklets. Self-contained — the brand fonts live in
`./fonts/`, so it runs anywhere the repo is cloned.

## Requirements
- **Node** with `pdfkit` (interiors): `npm i pdfkit` if not already installed.
- **Python 3** with **Pillow** (covers): `pip install pillow`.
- EPUB + review-doc steps are pure-Python (no extra deps).

## The four steps (per book)

### 1. Parse the `.docx` → house-schema sections
```
python3 scripts/book-pipeline/parse-docx.py BOOK.docx /tmp/rw my-book-slug
```
Writes `/tmp/rw/my-book-slug-chNN.json` and `…-manifest.json`. **Open the manifest
and skim the chapter titles** — if the split looks wrong, re-run with `--chap-size N`,
`--sub-size N` (Word size = 2× pt, e.g. 36 = 18pt) or `--md`.

Section schema = array of `[type, text]`:
`eyebrow` (opt), `title`, `subtitle` (opt), `rule`, `h2`, `p`, `pull`, `q` (`"<verse> —<Ref>"`).
Voice & quality: before building, judge each book against **CLAUDE.md**'s voice and
the forbidden-words list; rewrite to match if it doesn't (preserve arguments,
Scripture, testimony). Quote Scripture verbatim.

### 2. Build the interior PDF
Write a config (see schema below) then:
```
node scripts/book-pipeline/build-interior.cjs config.json
```
Produces a 6×9 print-ready interior: TOC w/ page numbers, running heads, folios,
set-apart Scripture, lead-in caps. For **booklets**, set `series` + `publisher`.

### 3. Build the EPUB
```
python3 scripts/book-pipeline/build-epub.py config.json   # needs cover + uid + epubout fields
```

### 4. Build the cover (front + back + print-ready KDP wrap)
```
python3 scripts/book-pipeline/build-cover.py covers.json   # array of cover configs
```
Styles: `banner | midnight | goldband | minimal | split | classic`. Outputs a front
JPG, a back JPG, and a full wrap PDF sized to the page count.

*(Optional)* `make-review-docx.py` renders a Word doc from the sections for editing.

## Config schema (interior + epub share one file)
```json
{
  "prefix": "my-book-slug",
  "rwdir": "/tmp/rw",
  "title": "My Book",
  "subtitle": "The Subtitle",
  "author": "James Bell",
  "titleSize": 34,
  "series": "The Hard Issues Series",          // booklets only
  "publisher": "Pastors Connection Network",     // booklets only
  "sections": [{"t":"ch","f":"ch00"}, {"t":"part","label":"Part One","name":"...","q":"..."}, ...],
  "out": "/tmp/My-Book-interior.pdf",            // interior output
  "cover": "/tmp/my-book-cover.jpg",             // epub: cover image
  "uid": "my-book-v1",                           // epub: unique id
  "epubout": "/tmp/My-Book.epub"                 // epub output
}
```
Cover config adds: `pages` (final interior page count, for spine width), `style`,
`upper` (bool, all-caps title), `tagline`, `blurb`, `bio`, `frontout`, `backout`,
`wrapout`, `previewout`.

## Classify each file, then place it

**A full book** (sold): →
- cover JPG → `client/public/books/<slug>.jpg`
- interior PDF + EPUB → `client/public/ebook/<slug>/<Name>.pdf` / `.epub`
- product page → `client/src/pages/<Component>.tsx` + a `/<slug>` route and a
  `/<slug>/thank-you` route in `client/src/App.tsx`; add to `client/src/pages/Books.tsx`.
  Match an existing page (e.g. `Believe.tsx`, `WhenGodBlessAmerica.tsx`). Wire Stripe
  via the page's `PAYMENT_LINK` (a `buy.stripe.com` link).

**A free resource / PDF** (give-away, lead magnet): →
- file → `client/public/ebook/<slug>/<Name>.pdf` (+ EPUB), cover → `client/public/books/<slug>.jpg`
- surface on the **Resources** hub (`client/src/pages/Resources.tsx`); for gated
  delivery use the `/api/download` + thank-you pattern, otherwise a plain free link.

**Church-leadership / pastor resource** (booklet for pastors): →
- same files as above, then add it to the **Hard Issues Series** collection page
  (`client/src/pages/HardIssuesSeries.tsx`, route `/resources/hard-issues-series`),
  which is linked from `Resources.tsx`, `PastorsResourceWall.tsx`, and the footer.
  These are **free** with an optional PCN **donation** (`DONATE_URL`).

## Rules
- Read **CLAUDE.md** and obey voice/brand/palette. No forbidden words.
- Trim 6×9, white paper. Covers are typographic/house-brand (no AI imagery).
- Keep CI green (`tsc` + content validators), commit on a branch, open a PR per batch.
