# Unit kit-pagehead: one page top, and the Study door as the model

Branch `elite/kit`, from `origin/claude/todo-implementation-hhp4bm` at 3e4469fb. Date: 2026-11-18.

James on the new Home: "I want you to go full-blown and design all the websites... I want people to understand the purpose of it." This unit carries Home's look onto the tops of the other pages and rebuilds /study as the door every other door copies.

## New kit pieces (`client/src/components/art/`)

- `PageHead.tsx`: the one page top. `door` (label naming the door), `doorHref`, `title` (plain H1), `line` (one short line), `action` (`.btn`, `.btn btn--quiet`), `plate` or `art` (a picture in the kit frame), `children`, `size="door" | "inner"`, plus `titleId`, `titleRef`, `width`, `className`. Door size: large plate beside the words on a laptop, edge to edge above them on a phone, title at `--fs-display`. Inner size: a small mark (216px on a laptop, 84px beside the title on a phone), or none, title at `--fs-h1`. The frame's ratio is set in CSS so the space is held before the lazy plate arrives (CLS 0.000 on /study). It is built on the old `.pg-head` classes, and `components/editorial/PageHead.tsx` is now a thin wrapper over it (older props `eyebrow`, `lede`, `actions`), so Family, Topics, Tonight and the rest share the same top and its print rules still apply. This replaces the three page-top patterns WAVE-1 found (cream with eyebrow, charcoal block, centred cream) on every page touched here.
- `SectionHead.tsx`: lucide icon, small label, H2 at `--fs-h2`, optional link; `dark` on a charcoal band.
- RoomCard: not added. `DoorCard` already is a picture-led room card; rooms go in `<ul className="lw-rooms">` (three across, two on a phone).
- `IconTile.tsx`: icon in a ruled square, name, one line; in `<ul className="lw-tiles">`.
- `.lw-newline`: the ruled line for someone new.
- Three new plates in the same hand (in `plates.tsx`, the lazy chunk): `lens` (a reading glass over a scroll, for Search), `sundial` (a day at a time, for the year plan), `lectern` (for Speaking).
- README: the page parts and "How a door's page is built" (PageHead; the one thing to do first; the rooms as picture cards, six or fewer; what is new or next).
- CSS appended to `index.css` (`.pg-head--door`, `--inner`, `--art`, `.pg-head__art`, `.lw-sec-head`, `.lw-rooms`, `.lw-tiles`, `.lw-tile`, `.lw-newline`, `.home-hero__line`). Tokens only; no hex.

## The Study door (/study)

1. PageHead, door size: label "Bible", H1 "Study the Bible", line "Read it, search it, and learn the world it was written in.", the open-book plate, "Open the Study Bible".
2. First thing: Home's shelf of 66 books (`pages/home/BibleShelf`, the same lazy chunk), in a box that holds its height, on a charcoal band: "Pick a book to open."
3. Six rooms as picture cards: Read the Study Bible (/study/bible), Search the Bible (/study/bible/search), Guides to reading it (/study/bible/guides), The Bible's story (/study/bible/story), Bible background (/resources/context), The Bible in a year (/study/bible/guides/whole-story-2027).
4. Go deeper: six tiles (doctrine studies, church history, creeds and confessions, glossary, group study guides, study tools), then "New to the Bible? Begin with the Gospel of John, or start here." (/start).

Rooms on the map with no page of their own: "How to study the Bible" has none; its card opens the Study Bible's reading guides under the true name "Guides to reading it". "Reading plans" has no one page for Bible plans; the card opens the one Bible plan there is, named "The Bible in a year". (/family/reading-plans exists but belongs to the Family door.)

Cut from /study (still live and linked elsewhere: the menus, /theology/history, /tools, search): /theology/traditions, /justice/timeline, /justice/witnesses, /disruption/witnesses, /theology/search, and the verse-notes link to /study/bible/matthew/1. `validate-links` and the route tests pass without them.

### Words on /study (visible text in `<main>`, after scrolling so the shelf loads; same method as v-home)

| | Before | After |
|---|---|---|
| Phone 390 x 844 | 676 | 200 |
| Laptop 1440 x 900 | 676 | 201 |

Most of what is left is labels on the shelf, the cards and the tiles.

## Page tops (inner size; bodies left alone)

- /start: label "Start here", the tree plate; line shortened to "Six steps, in order. Take them at your own pace."
- /connect: label "About", the letter plate, line "Read him, write to him, or invite him to speak.", the four jump links kept under it. The two-sentence lede is gone (the body says the same).
- /books: was a charcoal block. Label "About", the books plate; James's two sentences kept word for word ("I wrote all three of these myself." as the line, his second paragraph under it).
- /resources: was a charcoal block. Label "Tools", the dividers plate, line "Downloads, tools, help for a hard season, and things for home. All free."; My Library (with its count) and Search everything as quiet buttons.
- /subscribe: was a centred charcoal block. Label "About", the quill plate, the same H1, line "Leave your email below and finish the sign-up on Substack. You can leave at any time.", "Read on Substack first".
- /contact: H1 moved into PageHead with the letter plate and the line "A message sent here is saved for James to read."; the body keeps "If it cannot wait, write to the address below." and everything else.
- /about: was a charcoal block. Label "About", H1 "James Bell", his roles list, his paragraph (HOME_WHY) and the three links, all word for word, with the existing portrait as the small picture (4:5). No sentence of his was reworded. (The portrait was already on /about; nothing new was added. It does not load in this sandbox, which has no network to its host.)
- /speaking: was a charcoal block. Label "About", the new lectern plate, the same H1 and line, "Ask James to speak" (jumps to the form) and "Who James is".

## The sentence on Home

`HOME_LINE` in `client/src/lib/positioning.ts`, James's own sentence (the last sentence of `HOME_WHY`), says the purpose plainly, so it is restored under the headline:

> This site is here to help you study the Bible in its context, learn the church's long history, and think through the hardest questions of our time with patience and depth.

It is in the live hero (`Home.tsx`, `.home-hero__line`) and in the static hero `scripts/prerender-heads.mjs` writes for "/" (the `client/index.html` marker comment says so). The headline is unchanged. Measured with scripts blocked against the mounted page: headline, sentence, Find and the plate's frame sit at the same place and size at 390 and 1440 (to the pixel). At 390 x 844 the plate (unchanged height), headline, sentence and Find end at 596px, with tonight's line under them, all in the first screen. Home's words: 325 to 356 on a phone, 403 to 434 on a laptop (the sentence).

## What I ran

- `pnpm check`: pass.
- All 34 commands of the content-gates step in `ci.yml`: pass.
- `pnpm test`: 127 files passed, 7 skipped; 1,438 tests passed, 73 skipped. New: `components/art/PageHead.test.tsx`; changed: the /study and Home hero tests in `lib/siteNav.test.tsx`.
- ESLint `--max-warnings 0` on every changed source file: clean.
- `pnpm build`; `pnpm run sitemap && pnpm run prerender && pnpm run audit:canonicals`: pass.
- Lighthouse (`scripts/lighthouse-median.mjs`, served by `serve-like-vercel.mjs`, Chrome from Playwright via `CHROME_PATH`): `/` performance 98, accessibility 100, CLS 0.000; `/study` performance 92, accessibility 100, CLS 0.000 (LCP 3.3 s).
- Screenshots, 390 x 844 and 1440 x 900, day and night: `/home/user/elite-shots/kit/` (Home and /study first screens, /study full with the shelf opened on Psalms and its chapters, the top of each of the eight inner pages; `before/` holds the base). Read and fixed: a hairline under the door head above the charcoal band, and the small plate floating mid-height beside a long About head.

## Not verified

- A real phone or Safari; touch on the shelf only by its code (unchanged from Home).
- Mustard was judged by eye on the screenshots (the plates' one light, the eyebrow rules, link underlines); not pixel-counted this time.
- axe was not run on its own (Lighthouse accessibility 100 on / and /study only; the eight inner pages were not run through Lighthouse).
- Family, Topics, Tonight and the other pages that use `editorial/PageHead` now draw through the kit's PageHead; their look should be unchanged (same classes, no picture), but they were not screenshotted.

## Waits for James

1. The /study rooms where the map's room has no page: "Guides to reading it" for "How to study the Bible", and "The Bible in a year" for "Reading plans". A real "How to study the Bible" page is the obvious next piece of writing.
2. /about's portrait stays as it was. If "no photograph" should mean /about too, the plate frame can take a drawing instead.
3. /resources is labelled with the Tools door; when /tools is rebuilt it may fold in.
