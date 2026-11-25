# Four pages across the book pages

James, 2026-11-25: "i want more content and videos and interactive pages than
bible project." Every book page already holds verified data that nobody could
explore across books. These four pages let a reader do that. They add no new
claim: every word shown comes from the book pages' own files
(`client/public/bible/notes/<book>/intro.json`, under `teaching`), and each
item links to its book page and chapter.

| Page | Address | Reads | Built by |
|------|---------|-------|----------|
| The Bible's timeline | /study/timeline | `bible/explore/timeline.json` | `scripts/build-bible-timeline-index.mjs` |
| The Bible atlas | /study/atlas | `bible/explore/atlas.json` | `scripts/build-bible-atlas-index.mjs` |
| Key words of the Bible | /study/words | `bible/explore/words.json` | `scripts/build-bible-words-index.mjs` |
| Hard passages | /study/hard-passages | `bible/explore/hard-passages.json` | `scripts/build-bible-hard-index.mjs` |

All four scripts are thin: the rules are in `scripts/lib/bible-explore.mjs`.
Each has `--check`, and the four checks are in the content-gates step of
`.github/workflows/ci.yml` (58 commands now). **After a book page's teaching
data changes, rerun the four scripts**, or the gate fails by name.

The pages are in the catalogue inside "Read the Study Bible"
(`client/src/lib/siteCatalog.ts`), so they are in "Everything in Bible",
/explore, the search index and the sitemap. No door or room changed. Each
page: `fetchJson` with a shape guard (`client/src/lib/bibleExplore.ts`),
`LoadFailed`, a literal `<SEOMeta>`, `InnerHead` with its place, its words in
the prerender (`PAGE_BODIES` in `scripts/prerender-heads.mjs`), tokens only,
and a test file beside it (`client/src/pages/bible-explore/`).

## The rules each page keeps

**The timeline.** An entry is listed at the first year its own "when" names
(`firstYear`): "AD 41 to 54" is 41, "The mid-50s" is 55, "The 800s BC" is 899
BC. The stretches of years are plain spans ("1000 to 500 BC"), not named
ages, because naming an age would be a statement the book pages do not make.
An entry whose "when" only leans on the line before it ("Soon after", "Then",
"Three years later") is listed straight after that line and says so. Every
other entry with no year ("The days of Abraham", "The second Passover", "The
beginning") is listed apart under "No year given", in the Bible's order. It
is never placed by guess.

Where more than one book tells of one event, the entries stand side by side
in one box, each in its own book's words. If their dates are not worded
alike the box says "They do not date it alike" and the page chooses none.
Which entries are one event is a judgment, kept in
`scripts/bible-timeline-same.json` (46 groups, 15 of them dated differently:
the exodus, the crucifixion, the fire of Rome and others). It holds no words
that reach the site. An entry in that list that no longer matches a book
page is dropped with a note in the build's output, so another writer's edit
never breaks the build.

An entry links to a chapter only when its own sentence names one in its own
book (`ownRefs`): "(16:3)", "(chapter 5)", "(Mark 14 to 16)". "(Acts 18:2)"
on the Romans page is not Romans. About a third of the entries name one; the
rest link to their book page.

**The atlas.** One entry per place. Two books' marks are one place when they
share an id or a name and sit within a twentieth of a degree, so "Antioch in
Syria" and "Pisidian Antioch" stay two places and "Jerusalem (Zion)" in
Psalms joins Jerusalem. A place is drawn where the first book in the Bible's
order puts it; each book keeps its own name for it, its own sentence and its
own references. The drawings are the book map's own four frames
(`FrameArt` in `pages/study-bible/BookMap.tsx`, not redrawn). No frame the
site draws reaches from Rome to Ur, so the atlas is four sheets, not one
map, and a place is on each sheet a book page draws it on. Names are set
where their books set them; where two would collide the place fewer books
name loses its name on the drawing and stays in the list. The list beside
the drawing is the keyboard's and the screen reader's way in.

**Key words.** One entry per word, with every book's own explanation. The
book pages carry no language field, so a word is under Hebrew, Aramaic or
Greek only when a book's own sentence names that language ("Greek
euangelion"). The rest are listed as "More key words" by testament, and the
page says the book pages name no language for them. It does not guess, so a
transliterated word such as Chesed sits there until its book's sentence says
"Hebrew".

**Hard passages.** Book by book, in each book's own order and words. The
data has no kinds, so the page has none and says so. A passage is listed
only when the chapter it opens has a note (the build would leave out and
report any that did not; none do today). The items carry no care lines of
their own, and the site's rule is that a care line is never newly written.
So the page carries the Study Bible notes' two standing lines, whole and
byte for byte: the one for despair ("If you have thoughts of hurting
yourself, speak to someone today...") and the one for violence and abuse
("If you are being hurt, at home, at work or in a church..."), each said in
more than ten chapters' notes and each naming Find Help, which the page
makes the link. The build copies them from the notes that say them
(`CARE_LINES` in `scripts/lib/bible-explore.mjs`); the page's test holds
them equal to their source. They stand at the top of the list and after
each testament, beside the site's standing Find Help tab.

## Where the data was thin

- **Books.** 43 of the 66 book pages have `teaching` as of this run (it began
  with 39; Ezra, Nehemiah, 2 Kings and Esther arrived during it). Each page names the books it does not hold yet
  and counts itself from the data, so it fills as book pages are written.
- **Timeline dates** are free text, written for a reader. The year rules above
  read them; about one entry in six names no year.
- **Timeline chapters.** No entry carries a chapter field.
- **Key words** carry no language and no reference field.
- **Hard passages** carry no kind and no care line.
- **Map notes** (`mapNote`) speak of one book's own drawing ("beyond the edge
  of this map"), so the atlas does not show them.
- `structure`, `keyChapters` and `themes` (all 66 books) are not used by these
  four pages.

## The run

Worktree `/home/user/wt/interactive`, branch `elite/interactive`, pushed to
`claude/todo-implementation-hhp4bm`. Before each push, on the merged tree:
the 58 content gates, `pnpm check`, `pnpm test`, `pnpm build`, then sitemap,
prerender and the canonical audit; the page used in a served build
(`scripts/serve-like-vercel.mjs`, port 4677) at 390 and 1440 wide, by mouse
and by keyboard; `scripts/lighthouse-median.mjs` (phone, three runs, the
median). The machine was shared with four other agents throughout, so the
blocking-time part of each score swung by ten points or more between runs.

Lighthouse, median of three (performance, accessibility, best practices,
SEO), with layout shift 0.000 on every page:

| Page | Score |
|------|-------|
| /study/timeline | 97, 96, 96, 100 (first push: 93, 100, 96, 100) |
| /study/atlas | 100, 100, 96, 100 |
| /study/words | 96, 100, 96, 100 |
| /study/hard-passages | 93, 100, 96, 100 |

The timeline's 96 for accessibility in the last run was one finding: a link
far down the page "with contrast 1.08, #14110c on #1a1a1a". It is not real.
Measured as rendered, before and after scrolling to it, the link is ink
(rgb 20, 17, 12) on the white of its box (rgb 255, 255, 255), about 18 to 1.
The checker met it in a list not yet laid out (`.bx-far`), where its place
on the page is an estimate, and read the charcoal of the footer behind that
place. Nothing was changed for it.

What the measuring changed: a list of several hundred entries is drawn in two
steps (its top and first group at once, the rest in a transition:
`useStaged`), far groups are laid out only as they near the screen
(`.bx-far`, and `.pre-far` in the held text), and the opening paragraph of a
list page is kept short so that it is not counted, late, as the largest
paint.

Pushes: the timeline alone (8d7c3e36..372cd185); then the atlas, key words
and hard passages together, because the shared branch moved between every
run and each full run took twenty minutes or more on the shared machine.

## Three more pages, from what all 66 book pages have

The first four pages read `teaching`, which 43 books have. These three read
`structure`, `keyChapters` and `themes`, which every book page has, so they
are complete from the start. Same contract: no new claim, one generated file
each with `--check` in the content gates (61 commands now), the catalogue
inside "Read the Study Bible", words in the prerender, tokens only, a test
file beside each page.

| Page | Address | Reads | Built by |
|------|---------|-------|----------|
| The 66 books at a glance | /study/books-at-a-glance | `bible/explore/books-at-a-glance.json` | `scripts/build-bible-glance-index.mjs` |
| Where to start in every book | /study/key-chapters | `bible/explore/key-chapters.json` | `scripts/build-bible-keys-index.mjs` |
| Themes of the Bible | /study/themes | `bible/explore/themes.json` | `scripts/build-bible-themes-index.mjs` |

**The 66 books at a glance.** 387 parts of 66 books. Each book is the book
page's own band (`.bg-band`, `.bg-part`) with the book page's own rule for a
part's width (`outlineBand` in `pages/study-bible/bookFacts.ts`), so a book
looks the same here as on its own page. On the book page a part of the band
is a button that shows its summary; here every summary is already beside the
band, so a part is a link that opens the chapter it starts at. The band is
kept out of the tab order and the reading order: the list beside it has the
same links with their titles, ranges and summaries.

**Where to start in every book.** 367 key chapters, one to eight a book. The
book pages list them in order through the book, not by rank. So "One
chapter" is the first a book lists and "Three chapters" the first three, and
the page says so in a sentence and beside each book ("1 of the 8 the Genesis
page lists"). It ranks nothing.

**Themes of the Bible.** 318 themes, 325 paragraphs. Only four titles are
shared between books (the Day of the LORD, holiness, false security, the
Holy Spirit); those stand under one title with each book's paragraph whole
and apart. Titles are matched as written, letter case aside. Nothing else is
joined and there is no scheme: the order is the alphabet.

Lighthouse, median of three, layout shift 0.000:

| Page | Score |
|------|-------|
| /study/books-at-a-glance | 96, 100, 96, 100 |
| /study/key-chapters | 98, 100, 96, 100 |
| /study/themes | LH_THEMES |

Pushes in this second run: the fixes (3eb4c9ea..b39908cb), the glance page
(b39908cb..08eabd07), then key chapters and themes together, because the
shared branch had moved again when key chapters was ready to go.
