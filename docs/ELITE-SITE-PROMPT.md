# LIVEWELL BY JAMES BELL — THE ELITE SITE PROMPT

> Paste this whole file as the opening message of a working session, or say
> "run the elite site prompt." It sits under `CLAUDE.md` and runs **after**
> `docs/FOUNDATION-PROMPT.md` Phases 0–2 (branches reconciled, one source of
> truth for content, essays served as HTML). If those are not done, do them
> first; everything below stands on them.

You are the creative director, lead engineer, and librarian for
livewellbyjamesbell.co. James Bell's brief, in his words: make this **the
one-stop place for everything I have written — all my content, all my PDFs —
and make it elite.** He loves how the site is organized now, loves the opening
content on the front page, and loves the footer row that shows every place a
reader can connect with him: the newsletter, Substack, the podcast, speaking,
the Pastors Connection Network. He wants the whole site to carry that spirit.

The standard is the best author sites and serious publications on the web: a
reader arrives, knows in three seconds whose house this is, finds anything
James has ever made in two clicks, reads it beautifully, downloads it
cleanly, and leaves with a way back.

---

## 0. What is true now (measured 2026-09-23 on `main`)

- **Production is healthy.** Vercel production deploys READY; no failed
  deployments; no 5xx in the last seven days. One recurring warning: Node's
  `url.parse()` deprecation from a dependency inside `/api/index`.
- **Gates.** Typecheck clean, 313 tests pass, all content validators pass,
  build clean. Lint has 0 errors and ~540 warnings (mostly `any` in
  `api/index.ts`). Dependency audit: 1 low. The Lighthouse `quality` job fails
  on front-page performance (74–83 against a floor of 90) and is
  non-blocking.
- **The corpus** (what "everything" means):

  | Kind | Count | Where it lives |
  |---|---|---|
  | Published essays and articles | 959 | production database |
  | Full-text essay sources | 306 | `content/full/*.md` |
  | Books | 21 (3 hand-written on the shelf) | database + `client/src/pages/books/` |
  | Ebooks (PDF + EPUB) | 19 each | `client/public/ebook/` |
  | Generated PDFs (context guides, sermon series) | built at deploy | `scripts/build-pdfs.mjs` → `client/public/downloads/` |
  | How-tos | 133 | `client/public/howtos/` |
  | Life domains | 70 | `client/public/life/` |
  | Study guides | 63 | `client/public/studyguides/` |
  | Church history and theology | 51 + 23 | `client/public/theology/`, `history/` |
  | Context guides | 32 | `client/public/context/` |
  | Wisdom topics | 208 in 27 files | `client/public/wisdom/` |
  | Creeds, plans, pathways, justice, nation, disruption | 15, 8, 14, 15, 13, 18 | `client/public/*` |
  | Devotionals, family devotions, catechism | several libraries | `client/src/data/`, `client/public/family-*` |
  | Newsletter | weekly | Substack |
  | Podcast | *Following the Way* | followingthewaypodcast.com |
  | Pastors' material | moved | Pastors Connection Network |

  It is all real and almost none of it is findable from one place. A reader
  cannot see "everything James has written" anywhere on the site.

- **Voice and brand** are governed by `CLAUDE.md` and
  `docs/VOICE-JAMES-BELL.md`. The palette (cream, black, mustard) and type
  (Cormorant Garamond, Inter) are settled. The tagline is **"Connecting the
  depth of theology to the weight of everyday life."** James does **not** want
  "a theology for a Tuesday afternoon" or its variants as a tagline; it has
  been removed from the site's taglines and signup copy. It still appears
  inside some essay prose and one paragraph of the About page, which are his
  words and change only with his "save it."

---

## 1. Rules that do not bend

All ten rules of `docs/FOUNDATION-PROMPT.md` §1 apply. The ones that bite
hardest here:

1. **Never lose a word, never change a slug.** Every URL that exists today
   still resolves when you finish, directly or by 301.
2. **No prose goes live without James.** You build rooms; you do not rewrite
   what hangs in them. New site copy (headings, labels, one-line
   descriptions) is staged in a single file, `content/site-copy.md`, for his
   approval before it ships.
3. **Never fabricate.** No invented testimonials, endorsements, speaking
   engagements, download counts, podcast episodes, or book blurbs. A
   speaking page lists only events James supplies. Where something real is
   missing, leave a `[[JAMES: …]]` marker in the staging file, never a
   plausible fake on the live site.
4. **Tokens only; one design system.** Every new surface uses the `:root`
   tokens and the typography contract. No new palette, no new typeface, no
   dark mode.
5. **Performance is a feature.** No new page ships above the Lighthouse
   floor it is measured against; no library loads its whole index on a page
   that shows six items.
6. **One branch at a time, gated.** Each phase below is its own branch and
   pull request, merged green before the next begins.

Report at every stop: **Done / Found / Decided / Needs James / Next.**

---

## 2. Phase A — The Library: everything, in one place

**Goal.** One address, `/library`, where a reader can see and search every
single thing James has made, in every format, and get to it in one click.

1. **Build the catalogue.** A build-time script,
   `scripts/build-catalogue.mjs`, reads every source in §0 (the database
   export, every `client/public/*` library, the books, the ebooks, the
   generated PDFs, the podcast feed, the Substack feed) and emits one
   normalized record per item: `id, kind, title, slug/href, summary, pillar,
   subjects, scripture refs, date, reading time or page count, formats
   (web / PDF / EPUB / audio), price (free / member / paid), and source`.
   Output `client/public/catalogue/index.json` (lean fields only, gzip under
   150 KB) plus per-kind shards. A validator fails CI if any source item is
   missing from the catalogue or any catalogue `href` 404s in the prerender.
2. **The Library page.** A reading-room index, not a card grid:
   - A single search box across everything (title, summary, subjects,
     Scripture reference), instant and client-side over the catalogue,
     forgiving of typos, with "John 3" and "marriage" both working.
   - Facets that match how James's readers think: **Kind** (essays, books,
     guides, how-tos, devotionals, study guides, PDFs, audio), **Pillar**,
     **Subject**, **Book of the Bible**, **Length** (a five-minute read, an
     evening, a weekend), **Free / Members**.
   - A sort by newest, most read (once Foundation Phase 3 measures it), and
     A–Z.
   - Every result shows its kind, its length, and its formats as small
     mustard-underlined labels, and the PDF/EPUB download is reachable from
     the result itself.
   - Deep-linkable: every filter state is a URL.
3. **The Shelf of downloads.** `/library/downloads` lists every PDF and EPUB
   on the site, grouped by kind, with file size and page count, a clean
   cover or typographic thumbnail, and one-click download. Free files
   download directly; member and paid files show their gate honestly
   ("Members" or the price) and route to checkout. Every generated PDF
   carries the LiveWell masthead, the canonical URL, and the date on its
   first page, so a PDF that travels still points home.
4. **Every item knows its neighbours.** Each essay, guide, and book page ends
   with "More on this" drawn from the catalogue by shared subject and
   Scripture, not by hand-maintained lists.
5. **The existing doors stay.** Read, Study, Answers, Grow, Books remain the
   header; `/library` joins them as the door for "show me everything."
   `/writing`, `/downloads`, `/resources`, and the per-kind indexes become
   filtered views of the Library or 301 to one.

**Gate A.** James searches for five things he knows he wrote and finds each
in under ten seconds, and downloads one PDF on his phone.

---

## 3. Phase B — "Everywhere James is": the connect row, grown into the site

**Goal.** The thing James loves at the bottom of the page becomes a
first-class part of the site's identity: every channel, one sentence each,
honestly described.

1. **One source of truth**, `client/src/lib/channels.ts`: newsletter
   (Substack), podcast (*Following the Way*), speaking and "Work with James,"
   the Pastors Connection Network, ENDS, Facebook, contact. Each entry has a
   name, one sentence on what a reader gets there, a cadence if there is one
   ("weekly," "monthly"), and the link. The footer, the About page, the new
   Connect page, and the end of every essay all read from it.
2. **`/connect`**: a quiet, well-set page that answers "where else can I
   find James?" Each channel in its own band, the newsletter signup inline,
   the latest podcast episode and latest Substack post pulled from their
   feeds at build time, and a single contact line. No social-proof counters,
   no invented quotes.
3. **Speaking.** `/speaking` holds only what James supplies: topics he
   speaks on, formats (sermon, retreat, conference, pastors' gathering), a
   short bio in two lengths, a downloadable one-page speaker sheet (PDF), a
   press photo when he provides one, and an inquiry form that emails him.
   Past and upcoming events appear only when he lists them.
4. **The end of every essay** gets one quiet line from `channels.ts`
   ("James writes weekly on Substack and talks it through on *Following the
   Way*"), under the existing next-step logic, not competing with it.
5. **The footer** keeps its shape and gains the channel sentences on wide
   screens, collapsing to the current compact row on phones.

**Gate B.** James approves every channel sentence in `content/site-copy.md`.

---

## 4. Phase C — Design, elevated (same system, finished to the last pixel)

**Goal.** The feeling in `CLAUDE.md` — "a serious book in a quiet room where
the light is good" — on every page, not just the front.

1. **The front page keeps its opening** (James likes it) and tightens below:
   hero, the doors, one line from the Library ("959 essays, 21 books, 60+
   study guides, every one free to read or download"), the newest three, the
   books, the connect band. Replace the removed Tuesday pull-quote with the
   tagline or a line James chooses; nothing else invented.
2. **One page template per kind** (essay, book, guide, how-to, study guide,
   devotional, PDF landing), each with the same masthead, measure (68ch),
   type scale, eyebrow, byline, reading time, and end matter. Audit the ~180
   pages against these templates and bring the stragglers in.
3. **Typography pass.** A single type scale in tokens; hanging punctuation on
   pull quotes; true small caps for eyebrows; drop caps on long essays only;
   `text-wrap: balance` on headings and `pretty` on body.
4. **Imagery without stock.** Typographic covers generated from the palette
   for every book, guide, and PDF that lacks real art; the photograph slots
   from Foundation Phase 6 for James's portrait and places.
5. **Print and PDF.** A print stylesheet so any essay prints as cleanly as
   the generated PDFs, with the URL and date in the footer.
6. **Motion and states.** Calm, 150–200 ms, reduced-motion respected; every
   loading state a skeleton in the page's own shape; every error state the
   shared `LoadFailed` with a way back.
7. **Accessibility as craft.** Close the 44 axe and 36 contrast findings from
   the site walk; every new page passes axe in CI.

**Gate C.** Screenshots of every template at 390 and 1440 wide, before and
after, in one page for James.

---

## 5. Phase D — Search and answer engines treat it as the authority

1. Every catalogue item gets correct structured data: `Article`, `Book`,
   `DigitalDocument` for PDFs, `PodcastEpisode`, `Person` for James,
   `BreadcrumbList` everywhere.
2. The sitemap and `llms.txt` are generated from the catalogue, so a new
   item is announced the day it exists.
3. Every PDF has a landing page with its own title, description, and
   canonical, so search engines index the page and the file points back to
   it.

**Gate D.** Search Console shows the Library and the Shelf indexed; the
catalogue validator is blocking in CI.

---

## 6. Phase E — Keep it elite

1. **A monthly depth report** from Foundation Phase 3's measurement: what was
   read to the end, what was downloaded, which channels brought readers back.
2. **An "add anything" path for James.** One admin screen where he uploads a
   PDF or pastes a new piece, picks its kind and subjects, and it appears in
   the catalogue, the Library, the sitemap, and the right channel's feed with
   no code change.
3. **Quarterly walk.** Rerun the route walk, axe, contrast, and Lighthouse;
   any regression opens a pull request, not a note.

---

## 7. What you will not do

- Rewrite James's essays, books, or personal statements, or reintroduce the
  "Tuesday afternoon" tagline.
- Add a palette, typeface, dark mode, or framework.
- Invent a testimonial, event, statistic, quote, or count.
- Delete a URL, or ship a Library that hides anything the old indexes showed.
- Re-host the pastors' material that moved to the Pastors Connection
  Network. The Library lists it and links out, labeled "on PCN."

## 8. Begin

Confirm Foundation Phases 0–2 are merged. If not, run them first. Then read
`CLAUDE.md`, `docs/VOICE-JAMES-BELL.md`, `docs/FOUNDATION-PROMPT.md`, and this
file; start Phase A with the catalogue script and its validator; stop at
Gate A.
