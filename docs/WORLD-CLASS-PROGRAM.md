# The world-class program

James asked for LiveWell to be one of the best websites in the world: modern
and professional design, essays that are search-optimized in the words people
actually use, an image on every article, a voice that sounds like a person,
one place for all his writing including the short posts, Bible study, help for
families, and a purchase path that works perfectly. This is the plan, the
order, and the honest accounting of what was verified before anything was
changed. It is the working document; update it, do not fork it.

## 1. What was checked first, and what turned out to be true

Two of the loudest-looking defects were artifacts of how I looked, not of the
site. They are recorded here so nobody re-finds them.

- **The site is not broken on phones.** My first screenshots at 390 pixels
  showed the homepage hero and subscribe card clipped at the right edge, and a
  pixel heuristic "confirmed" clipping on 25 of 28 routes. Measured properly,
  through the browser's debugging protocol with real mobile emulation, every
  route lays out at exactly 390 pixels with zero overrunning elements. The
  screenshots had rendered a desktop-width layout and cropped it.
- **The book covers are fine.** Two of three showed as blank rectangles because
  they lazy-load below the fold and the screenshot did not wait. All three
  JPEGs are valid; the page also ships smaller WebP versions it does not yet use.

What is real, verified by reading the code and the numbers:

- **No essay has an image.** 0 of 678 library essays and 0 of 350 seeded essays
  carry a cover. The essay page substitutes generated geometry — thin
  one-pixel line motifs, no fill, no texture — which is tasteful and does not
  read as an image. Nothing on the home, writing, tools, or family surfaces
  shows any picture at all. This is most of what "not modern" means here.
- **Essays depend on the API even though they are static.** 678 essays ship as
  a static file, but the essay page and the writing index both wait on a
  network round trip and show "didn't load" if the function is slow.
- **Text walls.** The tools hub is twelve identical white cards with long
  paragraphs; the subscribe block repeats on the homepage, at the end of the
  writing index, and in the footer of the same page.
- **Prose length.** Across a sample of fifty essays, sentences average 18 words
  and one in six runs past 30. Titles are often already plain questions
  ("Does God Change His Mind?"); the bodies are where the plain-language work
  is.
- **No short-form writing on the site.** The Facebook posts have no home here.
- **Purchase.** Book checkout is wired server-side and the prod key is set;
  membership falls back to a waitlist until two Stripe price IDs are entered
  as site settings.
- **The site reset never shipped.** Found while chasing clipped homepage
  cards in phase 3: since July, a comment in `index.css` mentioned Tailwind's
  `mb-*` and `p-*` classes with a slash between them, the asterisk-slash closed
  the comment early, and the browser swallowed the global reset (border-box,
  zero margins and padding) as an invalid rule. Every page had been laying out
  on browser defaults: extra paragraph margins, content-box padding pushing
  cards past their grid rows, uneven card heights. Restored, with a test that
  strips comments the way a browser does and fails if the reset is gone. Most
  of "the spacing feels off" was this one line.

## 2. The phases, in order

Each phase ships on its own, verified, before the next starts.

1. **Instant essays.** A build step emits one JSON file per library essay plus a
   body-less index. The essay page paints from the static file and falls back
   to the API only for database essays; the writing index paints from the
   static index and upgrades when the API list arrives. No reader waits on a
   function for content that never changes between deploys.
2. **An image for every essay, everywhere.** Upgrade the generated art into a
   poster system: filled, layered shapes in the brand palette with paper grain,
   a dozen motif families, the essay's own title set in Cormorant as part of
   the image. Deterministic per essay, so it is the same on the card, the essay
   hero, and the share card. Real photography stays for the author and the
   books; a real cover, when James adds one, always wins over the generated art.
3. **Design elevation.** The homepage leads with imagery and featured essays
   before it asks for an email. Cards carry art. The tools hub gets rhythm.
   One subscribe block per page. Verified by screenshots under real mobile
   emulation, not window resizing.
4. **Plain-language SEO layer.** Shipped as `scripts/build-seo-layer.mjs`.
   For every essay, a meta description of 70 to 155 characters in whole
   sentences, no em-dashes, no forbidden words: hand-written in
   `content/seo-overrides.json` for the flagship and most-asked essays,
   otherwise assembled from the essay's own standfirst and opening, sentence
   by sentence, so nothing is claimed the essay does not say. Where the title
   is a question (92 essays), QAPage structured data carries the question and
   the essay's own standfirst as the answer. Rides on the static essay files
   and the prerendered heads; the essay page itself still shows James's
   standfirst. `docs/seo/plain-language-report.md` lists the derived
   descriptions that still read at college level, the queue for hand
   rewrites. Verdict-style titles stay as headlines.
5. **A human voice, audited then rewritten by hand.** Shipped as
   `scripts/voice-tells.mjs`, which measures the shipped library for the tells
   that survive a word search (sentence length, stacked triplets, the "It is
   not X. It is Y." tic, hedges, whether the writer ever appears) and writes
   `docs/audit-voice/machine-tells.md`. Finding: the banned words cluster in a
   batch of fifty-nine survey essays with HTML bodies, written in a briefing
   register; 39 exact word-level edits fixed every banned word in the banned
   sense, applied to every copy of the library through
   `scripts/apply-library-voice-edits.mjs` so a rebuild cannot bring them
   back. Three openings from that batch are rewritten in Bell's voice in
   `docs/audit-voice/rewrites-for-review.md`, unapplied, for James to accept
   or strike. Not a blind pass over 678 essays; that is how writing starts
   sounding like a machine.
6. **Notes.** Shipped as `/notes`, a content-as-data section for the
   Facebook-length pieces (`client/public/notes/notes.json`), newest first,
   grouped by year, each note with a permalink and a link back to the original
   post. `scripts/import-facebook-notes.mjs` reads a Facebook "Download your
   information" JSON export (repairing its mis-encoded text) or a plain text
   file of posts, merges without duplicating, and never rewrites a word.
   `scripts/validate-notes.mjs` gates the library in CI. The library ships
   empty on purpose: nothing is written in James's name by anyone else, and
   the page says so and points to Facebook until the posts are imported. The
   footer carries the link; the header will once there is something to read.
7. **Purchase path.** Traced end to end. Finding: the three hand-written
   books charged the card through Stripe (two by Payment Link, one by an
   embedded Buy Button) and then sent the buyer to a thank-you page that
   linked the EPUB and PDF as plain public files under `/ebook/`. Anyone who
   guessed the URL had the book free, and the thank-you page verified
   nothing. Now: the files live in the server's private ebook store with the
   other twenty-three titles; the three books are entries in the gated
   catalogue; the buy button goes through the site's own checkout (with the
   Payment Link as the fallback until the server-side price exists); and the
   thank-you page confirms the session is paid before it serves either
   format. A session from a Payment Link carries no metadata, so the page
   names the book and the server checks the claim against what the session
   actually bought. The six older ebook pages that still deliver from
   `/ebook/` (Raising Believers and the others) are unchanged and listed
   below for James.

## 3. What needs James

- **Photographs.** The portrait is the only real photograph on the site. A
  handful of his own — the church, the desk, the family table — would replace
  generated art on the pages that matter most. Until then the poster system
  carries every surface.
- **Stripe, books.** One click in the admin (Commerce, "Create Stripe
  prices") creates an $8.99 price for every ebook in the catalogue, the three
  hand-written books now included, and stores the ids as site settings. From
  then on the buy buttons use the site's own checkout, which returns the buyer
  to the thank-you page with a session id and unlocks the download. Until that
  click, the buttons fall back to the existing Payment Links. For those to
  deliver, each Payment Link (and the Buy Button for When God Bless America)
  must redirect after payment to
  `https://www.livewellbyjamesbell.co/books/<slug>/thank-you?session_id={CHECKOUT_SESSION_ID}`,
  set in the Stripe dashboard under the link's "After payment" option. Without
  the session id the thank-you page cannot confirm the purchase and offers the
  email fallback instead.
- **Stripe, membership.** The two membership price IDs, entered as site
  settings, turn the waitlist into checkout.
- **The older ebook pages.** Raising Believers, Deconstruction of Faith, The
  Reliability of Scripture, the two "What the Bible Says" titles and Is
  Critical Race Theory Biblical still deliver from public `/ebook/` folders.
  Say the word and they move behind the same gate; they were left as they are
  because they are not on the three-book shelf.
- **A Facebook export**, or the posts pasted into the import format, to fill
  the Notes section. Facebook: Settings, Your information, Download your
  information, format JSON, only "Posts". Then
  `node scripts/import-facebook-notes.mjs <the posts folder> --write`, then
  `node scripts/validate-notes.mjs`. Or paste posts into a text file, one per
  block separated by a line of three dashes, each block starting with
  `date: YYYY-MM-DD`, and run the same command on that file.
- **Reading the rewrites.** Phase 5 produces drafts in his voice for him to
  accept or strike, essay by essay.
