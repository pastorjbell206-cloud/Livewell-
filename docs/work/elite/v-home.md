# Unit v-home: Home, rebuilt as a gallery

Branch `elite/v-home`, from `origin/claude/todo-implementation-hhp4bm` at 32089d4b. Date: 2026-11-18.

James on the first preview: "It just looks like a lot of words. There's no icons, no pictures, no imagery. There's no interactive things you can click on to see visuals." This unit rebuilds Home from the chosen mockup, "The Gallery" (`/home/user/elite-shots/visual/concept-gallery/`), with the 66-book shelf grafted from "The Atlas", redrawn in the Gallery's hand.

## The new look

An engraved, plate-style illustration hand: an ink line on paper, shade by hatching, one tone block per shape set off register (olive, slate blue, clay), and one mustard mark per plate, the light. Every picture hangs in the same frame (ink rule, paper margin, hairline). Cream and charcoal sections alternate as before; type is unchanged (Cormorant, Inter, Source Serif 4).

From the top:

1. **Hero.** Plate I, "The road" (a grown-up and a child on a road toward a town at sunrise), beside James's headline, word for word, and the Find field (now a ruled field with a search mark). Tonight's devotion line under it. On a phone the plate runs edge to edge above the headline; plate, headline and Find fill the first screen, with tonight's line under them.
2. **Ten doors, as picture cards.** Study the Bible (large), Church history, Hard questions, Family, Start here; then smaller: Context and creeds (/study), Tools, Essays, Books, Find James (/connect). Every route exists in `siteNav.ts` and `App.tsx`. Each door has its own plate.
3. **The whole Bible on one shelf** (dark). The 66 books as spines.
4. **Ask it straight.** The open tomb plate beside the question picker.
5. **Tonight at the table.** Tonight's devotion in four tabs beside the table plate.
6. **Two thousand years on one line** (dark). The church history strip.
7. **From the desk.** The first shelf essay to start with, under the arch plate; the latest writing with dates (the same `HomeLatest`); the three book covers.
8. **Find James.** The letter plate; Write to James, Speaking, About James; the Follow row (unchanged component); the Find Help bar.

## What a visitor can touch

- **The shelf of 66 books.** Every spine is a button, as wide as its book is long and coloured by its kind of writing (law and story, poetry and wisdom, prophets and visions, gospels, letters). Touch one, or slide a finger along the shelf, and the readout names the book, its testament, its place (book 43 of 66), its genre and chapters, and the one line of its purpose from the Study Bible's own introductions; "Read John" opens it; "Chapters" opens every chapter as a 44px tile; previous and next step through the canon. The legend lights one kind at a time. One tab stop for the whole shelf; arrow keys, Home and End move along it. Opens on John.
- **Ask it straight.** Type a word and the 35 Honest Answers narrow to those that use it; touch a question and the start of its answer appears, verbatim from `data/answers.ts`, with "Read the whole answer" (`/answers#<slug>`). Three questions show first; "All 35 questions" shows the rest.
- **Tonight at the table.** Tonight's devotion (the same night as the tonight line and /family/tonight) in Read, Talk, Do, Pray tabs (a tablist with arrow keys). Talk switches between younger kids and teens and steps through the questions. This week's catechism question is a card that turns over to its answer. "Open tonight's devotion" and "A year of them".
- **Two thousand years on one line.** The seven ages, each as wide as its years, each with its roundel (flame, palm, creed, gospel book, cathedral window, the door with its notice, the globe). Touch an age: its name and years, the course lesson that begins it, its first events; touch an event for its note.

All four are their own lazy chunks (React.lazy), mounted as they near the screen, in boxes that hold their measured height. Every control has a visible focus ring (the site's global ring), a 44px or larger target (the spines themselves are narrower, see below), and the global reduced-motion guard turns off their transitions.

## Words, before and after

Counted in Chromium on the built site (`serve-like-vercel.mjs`, tRPC stubbed), visible text inside `<main>` only (not the header or footer, not screen-reader-only text, not hidden elements), after scrolling so every lazy piece is on the page.

| | Before | After |
|---|---|---|
| Phone, 390 x 844 | 317 | 325 |
| Desktop, 1440 x 900 | 470 | 402 |
| Running prose (paragraphs of 12 words or more) | 76 | 38 |

Honest reading: on a desktop there are about 15% fewer words and half the prose. On a phone the count is level, because the old phone page had hidden every door's line and showed names only, while the new one carries the labels of four interactive pieces (book names, ages and dates, the question chips, tonight's tabs). What changed is what the words are: the paragraphs under each door and the "Also here, all free" sentence are gone, and nearly everything left is a label on a picture or a control.

## Files

New: `client/src/components/art/` (`PlateSvg.tsx`, `RoadPlate.tsx`, `plates.tsx`, `Plate.tsx`, `PlateFrame.tsx`, `DoorCard.tsx`, `Roundel.tsx`, `useNear.ts`, `README.md`); `client/src/pages/home/` (`BibleShelf.tsx`, `QuestionPicker.tsx`, `TonightTable.tsx`, `HistoryStrip.tsx`, `historyLessons.ts`, `home.css`, `pieces.test.tsx`).

Changed: `client/src/pages/Home.tsx` (rebuilt), `client/src/pages/home/HomeFind.tsx` (label visually hidden, search-mark button), `client/src/index.css` (five `--art-*` tokens in `:root` and `html.dark`; the art-kit classes; the hero, Find and tonight-line rules), `scripts/prerender-heads.mjs` (the static hero now has the headline, a working GET Find form to /search, and Plate I's empty frame), `client/index.html` (the marker's comment), `client/src/pages/home/home.test.tsx`, `client/src/lib/siteNav.test.tsx` (the Home contract).

The drawings were generated from the Gallery mockup's own `plates.py` into JSX; one plate (Books, a shelf of volumes with a gold ribbon) was drawn new in the same vocabulary. Nothing is copied from another site; no photographs.

## Kept true

- Headline exactly as in `positioning.ts`; "post-Christian" still links to its page. No photograph or portrait of James.
- The Find field, tonight's line (with Continue and the Advent line), latest writing (with dates, public essays only through `isPublicEssay`) and the Follow row all work as before.
- The lead essay comes from `START_WITH` through `isPublicEssay`.
- No membership, giving or PCN; nothing about James's title, years or number of books.
- No hex in any component (`validate-design` count unchanged); tokens only.
- New sentences are plain and short, with no em-dash.
- SEOMeta title and description are unchanged string literals.
- First paint: the static hero is in the HTML; measured with scripts blocked against the mounted page, the headline, Find and the frame sit at the same place and size at 390 and 1440 (to the pixel).
- Mustard: measured by pixel count, 0.4% of the first screen at 1440, 0.9% to 1.1% at 390, 0.9% to 1.1% on the shelf with the gospels lit.

## What I ran

- `pnpm check`: pass.
- All 34 commands of the content-gates step in `ci.yml` (including `validate-design`, `validate-links`, `validate-no-emdash`, `validate-grow-voice`): pass.
- `pnpm test`: 126 files passed, 7 skipped; 1,432 tests passed, 73 skipped.
- ESLint (`--max-warnings 0`) on every changed source file: clean.
- `pnpm build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass ("Every audited page canonicalises to itself, exactly once").
- Lighthouse, `scripts/lighthouse-median.mjs` on `/` served by `serve-like-vercel.mjs`: performance 95 (runs 95, 95, 92), accessibility 100, best practices 96, SEO 100, CLS 0.000, LCP 2.5 s. The base commit on the same machine: 96, CLS 0.012. (A first version that mounted every piece at once scored 81 with 560 ms of blocking time; the pieces and plates now mount as they near the screen.)
- Screenshots at 390 x 844 and 1440 x 900, first screen and full page, day and night, and each piece opened: `/home/user/elite-shots/visual/built-home/`. I read them and fixed what was wrong: a cramped shelf readout, a hero headline set too narrow on a desktop, a section heading the global heading rule forced into the display face, an oversized devotion panel, empty space under the pieces, and a hero that moved when the tonight line arrived.

## Not verified

- A real phone or Safari; touch-sliding along the shelf was checked only by its code and by clicks in Chromium.
- The shelf's spines are narrower than 44px (66 books in a phone's width cannot be). Every book is still reachable by 44px or larger controls: previous and next, the legend, the keyboard, and sliding a finger along the shelf.
- The Advent window: from November 22 the Advent line under tonight's line adds two or three lines on a phone; the hero grows, below the first screen's main content.
- axe was not run separately (Lighthouse accessibility 100 only).
- Latest writing with real database rows (no database here; the committed fallback was shown).

## For the other pages

- The art kit is ready to use: `<PlateFrame><Plate name="..." /></PlateFrame>`, `<DoorCard>`, the `--art-*` tokens. Plates exist for the open book, basilica, lantern, house, tree, jar and lamp, dividers, quill, books, letter, six jars, tomb, table and arch, plus seven era roundels.
- Next in line (PROJECT-PROMPT, "Home is rebuilt first, then the main doors"): /study and /study/bible (lead with the shelf), /theology/history (the strip and roundels, and the Gallery's history-door mockup at `concept-gallery/history.html`), /topics and /answers (the question picker), /family (tonight's tabs), /writing, /tools.
- The Gallery mockup's Tools section ("36 tools, five drawers") was not built; Tools is a door.
- The global `h1,h2,h3 {font-family ... !important}` rule forces every heading into Cormorant; a label that is a heading needs the `eyebrow` class.

## Waits for James

1. The look itself: yes or no on the preview.
2. The door "Context and creeds" goes to /study, which holds both; or it could go to /resources/context alone.
3. The one sentence under the headline (`HOME_LINE`) is off Home in this design (it still opens /about). He may want it back under the headline.
