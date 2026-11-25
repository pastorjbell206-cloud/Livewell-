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
their own, so the page's care is its own: the way to Find Help, in the
catalogue's words, at the top of the list and after each testament, beside
the site's standing Find Help tab.

## Where the data was thin

- **Books.** 42 of the 66 book pages have `teaching` as of this run (it began
  with 39; Ezra, Nehemiah and 2 Kings arrived during it). Each page names the books it does not hold yet
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

The timeline's 96 for accessibility in the last run is one finding, a link
"with contrast 1.08" far down the page. The link is ink on cream like every
other; it sits in a list not yet laid out (`.bx-far`), and the checker read
the wrong background for it. The first run, before more books arrived, read
100. Worth a second look in CI against a preview.

What the measuring changed: a list of several hundred entries is drawn in two
steps (its top and first group at once, the rest in a transition:
`useStaged`), far groups are laid out only as they near the screen
(`.bx-far`, and `.pre-far` in the held text), and the opening paragraph of a
list page is kept short so that it is not counted, late, as the largest
paint.

Pushes: the timeline alone (8d7c3e36..372cd185); then the atlas, key words
and hard passages together, because the shared branch moved between every
run and each full run took twenty minutes or more on the shared machine.
