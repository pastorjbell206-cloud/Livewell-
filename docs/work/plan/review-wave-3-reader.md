# Wave 3 review: the pages as readers see them

Reviewer lens: reader. Worktree `/home/user/livewell-integrate` at `aa31178a`
(code identical to `37a679c4`; the last merge touched only `docs/work`). Read
only; nothing in the worktree was changed.

## How it was looked at

- **Build.** The worktree's `dist/` was current. It was built at 19:39:55,
  after the seams commit (19:36). No file under `client/`, `scripts/` or
  `shared/` is newer than `dist/public/index.html`, the tree is clean, and
  `dist/public/search-index.json` and `llms.txt` match `client/public`
  byte for byte. It was served with `serve -s dist/public -l 4873`.
- **Browser.** Playwright 1.63 with Chromium from `/opt/pw-browsers`, at
  390 x 844 (mobile, touch) and 1440 x 900, with the time zone set to
  America/Detroit and the clock fixed at **9 p.m.** (Oct 27, Nov 8, Nov 15,
  Nov 22, Nov 29, Dec 24 2026; Jan 1 and Mar 28 2027). `/api/trpc/*`
  answered `{result:{data:{json:null}}}`. For `/writing` the stub echoed back
  the slugs it was sent. `/_vercel/*` was stubbed, and the legacy CloudFront
  portrait was aborted.
- **Routes walked at both sizes (22 x 2):** `/`, `/topics`, the three topic
  pages, an unknown topic, `/study/bible/guides/whole-story-2027`, `/study`,
  `/study/bible/guides`, `/study/bible/story`, `/writing`, `/family`,
  `/family/devotions`, two devotion pages, table mode, `/family/tonight`, the
  hidden `/family/devotions/grown-ups-voted-differently`, `/help/loneliness`,
  `/my-library`, `/search?q=christian nationalism`, `/resources`, `/about`.
  Also: all four header menus on the phone and the desktop, by mouse and by
  keyboard; Home's Find field with nine reader questions; the Home tonight
  line into the devotion, then the three-night links into table mode; the age
  band carried from one devotion to the next; Remind me on `/family` and on
  the plan; printing a devotion, a topic and the plan to PDF.
- **Automated per page:** horizontal overflow; every visible interactive
  element under 44 px, with links inside a sentence set apart; em-dash, en-dash
  as a dash, and exclamation point in the rendered text; the Forbidden
  Language list from `scripts/lib/forbidden-language.mjs`; the share of the
  first viewport filled with mustard; console and HTTP errors. Every internal
  link in `<main>` on 16 of the pages (268 links) and in the header and footer
  (36) was opened and checked for a not-found state.
- Screenshots and the raw JSON are in
  `/tmp/claude-0/-home-user-Livewell-/fa8a8758-d28a-5c2d-826b-343823c61028/scratchpad/rv/shots/`
  (walk data in `../walk-oct27-9pm.json`, focus orders in `../focus.json`).
  None are committed.

## Findings

### 1. Major: the "Three short nights" links are 17 px targets that sit side by side

`client/src/pages/family/DevotionPage.tsx` and `.tb-nights__link` in
`client/src/index.css` (U21).

This is the line under Take it with you on every weekly devotion page: "Three
short nights instead of one: Read and Talk; Ask and Do; Remember and Pray."
Each link is 17 px tall. On a 390 phone, "Read and Talk" (243,518 94x17)
ends 9 px before "Ask", and "Ask and Do" breaks across two lines
(`[346,518,26,17]` then `[16,542,48,17]`), so "Ask" is a 26 x 17 target at
the end of a line. On the desktop the three run 94, 77 and 136 px wide,
each 17 px tall, with "; " between them. The sentence also sits right on the
hairline below it, with no padding (`crops/devg-0.png`,
`desktop-dev-top.png`).

This is the 9 p.m. path: Home's tonight line, then the devotion, then a thumb
choosing a night. U18 padded its inline tonight links to 46 px, and U21's own
`.tb-different__link` has `padding:10px 0` (39 px measured). The nights links
have neither.

**Fix.** Give `.tb-nights__link` the same vertical padding (about 13px 0, as
`.home-tonight__link` has) and some padding below the line before the rule.
Better still, set the three nights as three 44 px pills or rows, which would
also stop "Ask and Do" breaking across lines.

### 2. Major: the topic pages' passage references and both-sides links are 19 to 25 px tall

`client/src/pages/Topic.tsx` and the `.tp-` block in `client/src/index.css`
(U25).

Under "What Scripture says, read in its world", each passage's reference is
its only link, and each one measures 19 px tall on all three pages at both
sizes (`st-verseref st-verseref--keep`):

- Luke 19:41-42 is 101x19, Amos 3:2 69x19, 2 Chronicles 7:14 124x19, Romans
  13:1 89x19 and John 18:36 80x19.
- The children's and post-Christian pages are the same: five each, 80 to 141
  px wide, 19 px tall.

Elsewhere on the politics page:

- Under "Asked of both sides", The Conservative Blind Spot, Faith and the
  Flag, The Progressive Blind Spot and Faith and the Cause are each 20 px tall,
  two to a line.
- Under At the table, the devotion title link is 157x25 on the phone (Everyone
  You Meet; Tonight at the table on the children's page). It repeats the 44 px
  buttons beside it.

U25's review says "no target under 24 px after the fix". That fix scoped only
the Topics crumb. The page's own note reads "Each reference opens the passage
in the Study Bible", so these references are the section's action
(`crops/tpol-1.png`, `crops/tpol-2.png`, `crops/tkid-1.png`).

**Fix.** Scope a rule to `.tp-page`, as was done for the crumb:
`.tp-page .st-verseref--keep{display:inline-flex;align-items:center;min-height:44px}`.
Add vertical padding to `.tp-ways__links a`, as `.tb-different__link` has.
The At the table title can stay as it is if the buttons are enough, or take
the same padding.

### 3. Minor: a night started in table mode does not end

Table mode, `client/src/pages/family/TableMode.tsx` with `nightsOf()` (U21).

"Read and Talk" opens `?mode=table&step=1`. After Talk ("2 of 6"), Next
goes straight on to Ask ("3 of 6"), then Do, Remember and Pray. Nothing marks
the end of the night. "We did this tonight" is offered only after Pray, and
nothing records that night one was done when the family comes back for night
two. The page offers "three short nights instead of one", and the table runs
it as one long night. Seen in `phone-night1-end.png` and in the step walk:
Read 1/6, Talk 2/6, Ask 3/6.

**Fix.** Carry the night on the link (for example `&night=1`). At that
night's last step, show "That's tonight. Next time: Ask and Do." in place of
Next, with a link back to the page. Alternatively, say on the line that the
table runs straight through and the reader can stop after Talk.

### 4. Minor: site search cannot find the 2027 plan

`lib/catalog.ts`, `scripts/build-search-index.mjs` and
`client/public/search-index.json` (U28, U15 sources).

`client/public/search-index.json` has 0 hits for `whole-story-2027`, and the
plan is in no library source. From Home's Find:

- "read the bible in a year" returns a care page and five study guides.
- "bible reading plan" returns the care page and two eight-week plans.
- "read the whole story" returns one study guide.
- "whole story 2027" returns nothing at all.

A reader who saw "Read the whole story in 2027" in the Study menu and typed
it gets no result. The Family chip "Tonight at the table" has the same gap
when typed: "tonight at the table" returns nothing.

**Fix.** Add the plan, with keywords such as bible in a year, reading plan,
2027 and whole story, to the search entries the way U25 added `/topics`.
Optionally add `/family/tonight` the same way.

### 5. Minor: the Study hub row promises "a reminder on your phone"

`client/src/pages/Study.tsx` (U28).

The row reads "...with your place kept on this device and a reminder on your
phone." The control itself is a calendar entry: Remind me opens "A reminder in
your own calendar, every day of 2027, starting January 1... It goes into your
calendar, not to LiveWell." On a desktop it is not on a phone at all, and
nothing on the site sends a notification.

**Fix.** "...and a reminder in your calendar."

### 6. Minor: the plan's chapters do not lead back to the plan

`client/src/pages/StudyBibleYear.tsx` links each chapter to
`/study/bible/<book>/<n>?path=story` (U28).

On the day's last chapter (Day 1, Genesis 2), the chapter page offers "Next
in the story: Genesis 3", which is tomorrow's reading. Nothing links back to
the plan or to "Mark day 1 read", which exists only on the plan page.
"Your place is kept on this device" holds only for a reader who goes back two
pages to mark the day. Checked on `/study/bible/genesis/2?path=story`: the
links in `<main>` include no link to the plan.

**Fix.** Carry `&plan=2027&day=N` on the day's chapter links and show one
line on the chapter page: "Day N of the plan: mark it read" with a link back.
At the least, tell the reader on the card to come back here and mark the day.

### 7. Minor: the eyebrow crumbs on the new and changed pages are 20 px tall

`PageHead` eyebrow links (shared).

The crumbs measured:

- "The Study Bible" on the plan page is 137x20 (also on
  `/study/bible/guides` and `/study/bible/story`).
- "Family" on the devotion pages and the library is 57x20.

U25 fixed the same crumb for `.tp-page` only and named the family ones as
left over.

**Fix.** Apply U25's 44 px crumb rule to every `PageHead` eyebrow link, not
just `.tp-page`.

### 8. Minor: the desktop door buttons are 32 px tall

`client/src/components/MinimalNav.tsx` (U19).

In the header, Study, Topics, Family and About are each 78 to 83 x 32,
Essays and Find Help are 38, and search is 34x34. This header serves every
width from 861 px, including a touch tablet in landscape. U19 turned three
more doors into menu buttons at the same 32 px. The 64 px bar has room for
44.

**Fix.** Set `min-height:44px` on the door buttons and links, keeping the
text where it is.

### 9. Minor: the foot of a topic page has a double rule, and descriptions are cut mid-sentence

`Topic.tsx` and the `.tp-back` rule (U25).

`nav.tp-back` has its own `border-top` and `margin-top:24px`, right under
"Use this", which already ends in a hairline. The result is two rules about
50 px apart above "All topics →" on every topic page (`crops/tpol-4.png`,
`crops/tkid-3.png`).

On the phone, the clamp in the Use this rows also cuts the new descriptions
mid-clause: "...anyone tired of a phrase thrown like a rock in two directions
who…", "Thirteen choices that name the lens doing your reading for you: the
flag, the cause, the…".

**Fix.** Drop the border on `.tp-back` (or the last row's rule). Write row
lines that fit two lines on a phone, or let these rows run to three lines.

## Clean (seen, with evidence)

- **No sideways scroll anywhere.** Across the 44 page walks, `scrollWidth` was
  390 and 1440, and the same held with each phone menu group open.
- **No new em-dashes.** The only em-dashes on the walked pages are
  pre-existing: Home's hero, `/family`'s older lists, `/about`, and the BSB
  text of Psalm 56:3 ("praise— in God"), which is verbatim Scripture.
  No added line in `client/` or the topic and family data carries one outside
  quoted passage text.
- **No Forbidden Language.** The full shared list was run over the rendered
  text of every walked page, and over 4,332 added lines including the hidden
  world strand; it matched only the code identifier `navigate`.
- **No exclamation points and no hedges** in the rendered text or the added
  copy.
- **Tokens and mustard.** No hex in any added `client/src` line. Mustard is
  only rules, underlines and `--mustard-text` labels. It fills 0% of the first
  viewport on every new or changed page; only the pre-existing `/about`
  (4.6 to 6.4%) and `/search` (0.2 to 0.7%) have any. The cream is the room:
  `body` is `rgb(245,240,230)` on every page. `/family` keeps no three
  same-background sections in a row, and the new "If your table looks
  different" band is cream-warm between cream and the black band.
- **Header (U19).** Five doors on desktop and phone. The menus hold exactly
  their links, and "Read the whole story in 2027" is the last Study link at
  44 px on the phone and 42 px on the desktop. The current door is marked
  with `aria-current` on `/answers` and the topic pages (Topics), `/books`
  (About), `/family/catechism` (Family), the plan (Study) and `/writing`
  (Essays). Keyboard order: skip link, logo, Study, Topics, Family, Essays,
  About, Find Help, search, Subscribe. Enter on Topics opens it, and Tab
  walks its six links. On the phone each row is a single 49 px button, one
  group opens at a time, and every link is 44 px.
- **Home (U18, U25, seams).** Five doors in the order the test expects; "Hard
  questions" goes to `/topics`. On Oct 27 at 9 p.m. the tonight line reads
  "Tonight at the table: Strong Enough To Be Gentle." (46 px desktop, 73 px
  wrapped on phone). Tap 1 opens `/family/devotions/gentleness` and tap 2
  opens table mode. Nov 8 and Nov 15 show the rotation (Keep Going; Taking
  Care Of What Is Not Yours), not the hidden world pieces. The Nov 22, Nov 29,
  Dec 24, Jan 1 and Mar 28 lines read as U18 describes, and each link lands
  on its devotion. Find sends "christian nationalism", "post christian" and
  "raising kids" to `/search` with the topic page first or second, and
  devotion titles return the devotion's own page (the seam's new search
  href).
- **Topics (U25).** `/topics` lists 17 rows, each opening a live page. The
  three topic pages, Send/Save/Print, the both-sides section and the unknown
  slug ("That topic isn't here", with a link back) all render. 268 internal
  links from the new and changed pages land on real pages.
- **Plan (U28).** Before 2027 it opens on Day 1 with the act, the guides, a
  44 px "Mark day 1 read", Day 2, Remind me ("every day of 2027, starting
  January 1") and the January rows (44 px checks). It prints to 5 pages.
- **Family (U21, U11).**
  - Questions for: Together, Younger and Older are 44 px pills. The arrow
    keys move between them, and Older chosen on one devotion is checked in
    table mode on another.
  - "For the grown-ups" with "I can't stop worrying" (44 px+).
  - The library sorts Foundations · 72 by theme with a 44 px select.
  - "Remind me" on `/family` reads "once a week for a year".
  - The household panel's links measure 39 px.
  - Each devotion prints on one page with both bands side by side.
  - The card PDFs are built by `build:vercel` (`pnpm run pdfs`).
  - The hidden world strand stays hidden: no tab (`?tab=world` opens
    Foundations), "That devotion isn't here" at its address, and no mention
    on any page.
- **`/writing` (U29).** The request carries only `{slugs, since}`. With
  listing rows for those slugs the shelf shows 18 essay links and 15 reading
  times at both sizes. With the null stub the page shows "Nothing on this
  part of the shelf yet". That is the stub's empty listing (`loaded` with no
  rows), as before this wave, not a regression.
- **`/help/loneliness`.** The new FAQ renders, and its link to "The church
  hurt me" is 52 px.
- **Errors.** No page error and no HTTP error. The only failed request on any
  page is the legacy CloudFront portrait (`lib/positioning.ts`), which this
  run aborted on purpose.

## Seen, but not this wave's (not raised as findings)

- The phone menu does not hold focus: after Subscribe, Tab moves into the
  page behind the open panel. Escape closes the menu and leaves focus on the
  `body`. The Escape handler is unchanged from main.
- The header Subscribe is a `<button>` inside an `<a>` (two tab stops, nested
  interactive), unchanged from main.
- The portrait still loads from CloudFront (`lib/positioning.ts:51`).
- On a phone, Find and Tonight start at about 1,020 px, under James's hero.
  This was already raised to the lead in U18.
- `/about`'s small links (29 px) and em-dashes, and `/search`'s 36 px filter
  pills, predate this wave.

## Not verified

- A real phone, a screen reader, a tablet in landscape with touch, Lighthouse
  and axe, which are the gates reviewer's lens.
- Dark mode: the app is light-only (`ThemeProvider defaultTheme="light"`, not
  switchable).
- The prerendered heads.
- The plan in 2027 with days already marked. U28's tests and shots cover it.
- The live API, a database listing, and Vercel's own build of the PDFs.
