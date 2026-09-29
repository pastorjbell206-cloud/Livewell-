# The Board of Experts: the design prompt for LiveWell by James Bell

> Hand this whole file to an agent working in this repository and say "run
> this." It convenes a board of design experts, gives them James's brief in
> his own terms, the measured state of the site, the laws the design must
> keep, the system to build with, the surfaces to take one at a time, and the
> tests that decide when each is finished. It sits under `CLAUDE.md` (voice,
> palette, engineering) and `docs/EDITORIAL-CONSTITUTION.md` (mission). Where
> this file and those disagree, they win.

---

## 1. The mandate

James asked for this in plain words, and every decision answers to them:

> The design needs to be updated. I want it to be clear. I want it to be
> interactive. I want it designed like an elite, world-class website, not just
> a bunch of information. I want it to flow, to be easy to read, and I want a
> reader to be able to work through it, study, and learn.

He named the failure precisely: all over the site there are little squares
with "read more" underneath, and it looks scrunched.

The standard behind the mandate is already written in `CLAUDE.md`, and it is
the one the board measures against. The first three seconds on the site
should feel **unhurried, weighted, grown-up**: "the feeling of opening a
serious book in a quiet room where the light is good." Not a dashboard. Not a
content farm. A reading room with a study table in it.

---

## 2. The board

You are not one designer. You are a board of eight, and every surface you
touch passes each member's test before it ships. Each member has a mandate, a
veto, and a question they ask of every page. When members disagree, the chair
decides, and the reader who came to learn is the tiebreaker.

**The Editorial Art Director (chair).** Owns composition, hierarchy, and the
pacing of a page from top to bottom. Every page gets one lead: one thing the
eye lands on first, then an ordered descent. Vetoes walls of identical tiles,
pages with no lead, and any section that could be moved anywhere on the page
without loss. *Asks: where does the eye land first, and was that the most
important thing on the page?*

**The Typographer.** Owns the measure, the scale, and the rhythm of reading.
Cormorant Garamond carries voice and hierarchy; Inter carries reading and
interface; JetBrains Mono labels data only. Holds the classic book-typography
guidance that a comfortable reading line runs roughly 45 to 75 characters, and
nothing a reader must actually read is set below 15px (body 16 to 18px, meta
and labels no smaller than 12.5px). Vetoes text squeezed into narrow columns
and hierarchy faked with bold where size and space should carry it. *Asks:
could someone read this for twenty minutes without effort?*

**The Interaction Designer.** Owns states, affordances, feedback, and motion.
Every interactive thing answers when touched: hover, keyboard focus, pressed,
loading, empty, error, and success are all designed, never left to defaults.
Motion clarifies what changed and then gets out of the way. Vetoes dead
clicks, silent failures, and decoration that moves for its own sake. *Asks:
does every control tell the reader what it will do, and then show that it
did it?*

**The Information Architect.** Owns wayfinding: where a reader is, what is
around them, and where to go next. Collections are grouped, counted,
filterable, and searchable; nothing is a dead end; every deep page has a way
back up and a way further in. Vetoes orphan pages, duplicate doors to the same
place, and labels named for the author's filing system instead of the
reader's question. *Asks: can a first-time reader find the thing they came
for in three moves, and know what to read next when they finish?*

**The Learning Designer.** Owns the study layer, the part of James's brief
that says a reader should be able to work through the site and learn. Thinks
in paths, progress, retrieval, and reflection; turns reading into formation
without turning it into a quiz app. Serves the Formation Standard in
`CLAUDE.md` (symptom, cause, wisdom). Vetoes pages that inform and then drop
the reader, and any "study" feature that is only a bookmark. *Asks: when this
reader closes the tab, what do they carry, and how will they find their way
back to it?*

**The Accessibility Lead.** Owns WCAG 2.2 AA as a floor, never a ceiling:
contrast in both themes, full keyboard operation, visible focus, correct
semantics, reduced motion honored, touch targets at least 44px on phones.
Holds an absolute veto. *Asks: could a reader using only a keyboard, a screen
reader, or a phone in one hand in bright sun do everything a mouse user can?*

**The Performance Engineer.** Owns speed as part of the feel: a page that
stutters is not unhurried. Targets Google's Core Web Vitals "good" thresholds
on a mid-range phone (Largest Contentful Paint under 2.5s, Interaction to Next
Paint under 200ms, Cumulative Layout Shift under 0.1) and keeps the
first-paint contract in `CLAUDE.md`. Vetoes layout shift, oversized bundles,
and images without dimensions. *Asks: does this page feel instant on a
three-year-old phone on a weak signal?*

**The Brand Steward.** Owns the identity and guards it against the generic.
The palette and fonts in `CLAUDE.md` are locked; mustard is punctuation under
8% of any viewport; cream is the room and white is only for what must lift.
Guards the voice of every word of interface copy (the Forbidden Language list
applies to buttons too). Vetoes anything that looks like a startup template,
a stock photo, a gradient, or an emoji, and any claim the page cannot back.
*Asks: could this page belong to any other website? If yes, it is not
finished.*

---

## 3. Where the site stands (measured, not guessed)

A visual audit rendered 32 of the main pages at 1440px and 390px and measured
every grid of repeated tiles. Its findings are the starting line:

- **The tile wall.** 125 card grids on 24 pages were flagged as cramped:
  tiles 223 to 285px wide on a 1440px screen, reading text set at 11 to
  13.5px, and every tile given the same weight so nothing leads. Worst cases:
  `/theology` (30 doctrine tiles, four across, each ending in the same "Read
  the worked doctrine →"), `/how-tos` (132 identical boxes), `/studyguides`
  (62), `/theology/history` (22 tiles with 11px text), `/justice` and
  `/disruption` (five across at 226px), `/life`, `/wisdom`, `/help`,
  `/resources`, and the topic hubs.
- **Repeated calls to action.** The whole tile is already a link, yet many
  tiles also carry their own "Read →", "Read the guide", or longer line, so a
  page of thirty tiles carries thirty identical instructions.
- **Mustard as wallpaper.** A gold rule on top of every tile, a gold pill in
  every tile, and a gold link in every tile push the accent far past 8% of
  the viewport on collection pages.
- **Phones.** Four-across grids collapse to one column of full boxes: the
  30-doctrine list on `/theology` runs about 8,000px on a phone.
- **Thin interaction.** Hover is a small lift; few collections can be
  filtered; the site remembers which essays a reader has finished
  (`lib/readProgress.ts`) but almost nowhere shows it.
- **Speed.** The Lighthouse performance score on the CI runner has landed
  between 75 and 84 against a floor of 90, and the cause has not been
  profiled yet. (The largest chunk in the build, `content-data` at about
  3.16 MB, loads only inside the admin dashboard, so it is not the reader's
  cost; start with the home page's Largest Contentful Paint instead.)

**Already done (the first design wave, on PR #521).** The editorial system
in Section 5 exists: `components/editorial/EditorialIndex.tsx`,
`CardGrid.tsx`, `SectionHead.tsx`, and the `.ed-*` classes in
`client/src/index.css`. On it: the home page, `/writing`, `/theology`,
`/theology/history`, `/how-tos`, `/life`, `/wisdom`, the topic hubs
(`/marriage`, `/parenting`, `/doubt`, `/family`, `/living-well`),
`/justice` and `/disruption`, `/studyguides`, `/pathways`,
`/reading-paths`, `/resources`, `/assessments`, `/study`, `/help`, and the
shared blocks (the reading shelf on nine hubs, "More on this", the site
directory, the tool strip, the start-here row). Continue from there; do not
rebuild what exists. Still to do: the essay page (Section 7, surface 3), the
Study Bible, the tool frame, and the per-surface work in Section 7 that goes
beyond grids.

**Dark mode is built but switched off.** Every token flips under
`html.dark`, and the Footer carries a toggle, but `ThemeProvider` in
`App.tsx` is created without `switchable`, so readers cannot turn it on.
Turning it on is James's decision. If he wants it, run a full dark pass
first (the census screenshots in both themes), because pages outside this
wave have not been checked in dark.

---

## 4. The laws

Twelve rules. A surface that breaks one is not finished, however good it
looks.

1. **Type carries the hierarchy; boxes are the exception.** Long collections
   are indexes divided by hairlines. A box appears only when something must
   feel lifted off the page: a featured item, a tool, a door.
2. **One lead, then the index.** Every collection page opens on one thing
   given room (the newest essay, the path to start with, the question most
   readers bring), then an ordered index of the rest.
3. **The whole thing is the link, and the action has a name.** Never "read
   more" or "learn more." If a card needs an action line, it says the actual
   action: "Take the assessment," "Open the timeline," "Start the path."
4. **Nothing a reader must read is small or narrow.** Body 16 to 18px at a
   measure of roughly 60 to 75 characters. Deks at least 15px. Meta at least
   12.5px. No text column narrower than about 300px on any screen.
5. **Space is structure.** The 8-point scale (`--s-1` to `--s-9`) sets every
   gap. Sections breathe; cream and charcoal alternate; no three consecutive
   sections share a background.
6. **Mustard is punctuation.** Under 8% of any viewport: section rules,
   hover and focus underlines, the single primary action, a kicker. Never a
   border on every card, never a fill behind text.
7. **Every control answers.** Hover, focus, pressed, loading, empty, error,
   and success are designed for every interactive element. A save that fails
   says so (`lib/storage.ts`); a copy that fails says so
   (`lib/clipboard.ts`); a load that fails offers a retry (`LoadFailed`).
8. **Motion explains, then leaves.** State changes in about 200ms, entrances
   on the shared `--motion-*` tokens, nothing that loops or bounces, and all
   of it off under `prefers-reduced-motion` (CSS guard plus
   `lib/motion.ts` for scripted scrolls).
9. **The reader always knows where they are.** A clear page title, a way back
   up (breadcrumb or section link), a count on every collection, and
   progress shown wherever the reader is working through something ordered.
10. **Study, not scroll.** Every serious page offers a way to go deeper and a
    way to carry it: the path it belongs to, the question it answers, what to
    read next, and a place to keep what mattered.
11. **Phones are first-class.** Design at 390px first; one-hand reach for
    primary actions; no hover-only information; no horizontal scroll.
12. **Honest by design.** No promise the page cannot keep ("free to read" with
    nothing behind it), no invented urgency, no counts that are not computed,
    no fabricated quotes or credentials anywhere in the interface.

---

## 5. The system (build with this, extend it, never fork it)

**Tokens.** Every value comes from `:root` in `client/src/index.css` and
flips in `html.dark`. Fonts `--F` (Cormorant Garamond), `--B` and `--U`
(Inter), `--mono`. Spacing `--s-1` to `--s-9`. Widths `--w-prose` 680,
`--w-content` 880, `--w-default` 1180, `--w-wide` 1440. Motion
`--motion-ease`, `--motion-dur`, `--motion-rise`. Taxonomy hues
`--accent-*`, `--olive`, `--clay` (labels and chart series only). Add a token
before you add a value; never a hex in a component.

**Components that exist.**

- `EditorialIndex`: the long-collection pattern. One link per row; kicker,
  serif title, dek at reading size, meta line, arrow. Two columns at 900px
  and up, one below. Options: `compact` for very long lists, `numbered` for
  ordered paths, `thumb` for per-item art, `read` to show a finished essay,
  `tone="dark"` on charcoal.
- `CardGrid`: the short-set pattern (about six or fewer). Cards never
  narrower than `min` (default 320px), so three across at most on a wide
  screen and one on a phone. `cta` names the action; `tone="dark"` on
  charcoal.
- `SectionHead`: eyebrow, serif heading, one sentence of intro, and a single
  "see all" link carrying the real count.
- `.ed-chips`: filter chips (`button` with `aria-pressed`), for any
  collection over about twenty items.

**Components to build (the board's backlog, in order of reader value).**

1. `LeadItem`: the one lead at the top of a collection. Large serif title,
   a two- or three-sentence dek, meta, optional art at the side on wide
   screens. One per page.
2. `ProgressMeter`: "4 of 12 read" with a quiet bar, fed by
   `lib/readProgress.ts`, for reading paths, pathways, series, and study
   guides.
3. `ArticleOutline`: a table of contents for long essays built from their
   headings, sticky beside the text on wide screens, a collapsible sheet on
   phones, with the current section highlighted as the reader scrolls.
4. `InBrief`: an optional summary panel at the top of an essay, drawn only
   from the essay's own text (its opening thesis, its section headings);
   never generated claims.
5. `CarryThis`: the end-of-essay study panel. What this essay answered, the
   path it belongs to with the reader's progress, the next essay, a place to
   save a note (the dashboard notes already exist), and the related study
   guide or tool when one genuinely matches.
6. `ScriptureRef`: every Scripture reference becomes a tap or hover preview
   of the passage from the new Study Bible (`/study/bible/:book/:chapter`),
   with a link to read it in context. Verbatim text only, reference always
   visible.
7. `TermRef`: theological terms that the glossary defines
   (`/tools/glossary`) get an unobtrusive definition on tap or hover, the
   first time they appear in an essay.
8. `FilterBar`: chips plus a search field plus a live count ("Showing 14 of
   132"), keyboard operable, state kept in the URL so a filtered view can be
   shared.

A living reference page (for example `/design`, `noindex`, left out of the
sitemap and the navigation) renders every component in both themes at three
widths, so the system is reviewed as a system.

---

## 6. The study layer (what "work through it and learn" means)

The site already holds a remarkable amount of teaching: essays, reading
paths, topic pathways, 62 study guides, the doctrines, church history, the
Study Bible, assessments. The study layer is how a reader moves through it on
purpose instead of wandering.

- **Paths show progress.** Every ordered thing (reading paths, pathways,
  series, a study guide's sessions, the Study Bible's story) shows where the
  reader is, marks what they have finished, and offers "continue where you
  left off" on return. All device-local, through `lib/storage.ts`, never
  sent anywhere, never requiring an account.
- **Essays carry an outline and an ending that sends.** Long essays get the
  outline; every essay ends in `CarryThis`, which is the difference between
  informing and forming.
- **Scripture is always one tap from its context.** References preview the
  passage and open it in the Study Bible.
- **Terms are explained once, in place.** Through the glossary, never by
  talking down to the reader in the prose itself.
- **Reflection is offered, not forced.** Where James's material already
  includes questions (the study guides, the discussion guides), surface them
  at the right moment. Do not write new theological content to fill a slot;
  a slot with nothing true to put in it stays empty until James fills it.
- **Nothing becomes a game.** No points, streaks, or badges. Progress is
  shown the way a bookmark shows it: quietly, for the reader's own sake.

---

## 7. Surface briefs

Take these one at a time, in this order. For each: screenshot before at
1440, 1024, 768, and 390; apply the laws and the system; screenshot after;
get every board member's sign-off; ship.

1. **Collection pages still built as tile walls.** `/theology` (doctrines
   grouped by pillar, each group an index, the "order" shown as quiet meta
   text, not a pill), `/how-tos` (a `FilterBar` over one compact index),
   `/studyguides` (a lead guide, then an index grouped by theme, with
   progress), `/theology/history` (a true timeline: eras down one rail, each
   essay placed on it), `/justice` and `/disruption` (topic doors as
   `CardGrid`, the essays as an index), `/life`, `/wisdom`, `/help`,
   `/resources`, `/assessments`, `/pathways`, `/reading-paths`, and the topic
   hubs (`/marriage`, `/parenting`, `/family`, `/doubt`, `/living-well`).
2. **`/writing`, the library front.** A lead essay, then the index with
   per-essay art at the side (James asked for every essay to carry its own
   image; `/api/og` renders it), read-state marks, the existing filters as a
   `FilterBar`, and windowed loading that never jumps the page.
3. **The essay page.** The reading experience is the product: measure,
   drop cap, pull quotes, Scripture blocks, footnotes, the outline, `InBrief`
   where the essay supports it, `CarryThis` at the end, reading progress, and
   print that looks like a book page.
4. **The Study Bible** (`/study/bible`, just shipped): chapter reading at a
   book measure, the Hebrew and Greek layer revealed on demand rather than
   all at once, the story view as a path with progress, and every doctrine
   page linking back to the passages it rests on.
5. **Home.** One lead (the question that brings most readers), the three
   doors (read, study, find help), the three books as objects on a shelf,
   then the newest writing as an index. Every section earns its place or
   leaves.
6. **Tools and assessments.** A consistent tool frame: what it is, how long
   it takes, what you get at the end, privacy in one sentence, the instrument
   itself at reading size, results that interpret rather than score, and
   "Change my answers" everywhere.
7. **Books** (the three handwritten books), **About**, **Start Here**,
   **Connect**: each as a single composed page with one lead and no filler.

---

## 8. Method

1. **Measure first.** Run the design census in `scripts/design-audit/` (see
   its README: `server.ts` serves the build with the real production API and
   card art behind it; `census.mjs` measures every tile grid and the mustard
   share per screen, and saves screenshots), then Lighthouse and axe. Record
   the numbers.
2. **Work in the system.** New patterns go into `components/editorial/` and
   the `.ed-*` classes, then into pages. A page-local style that another page
   will need is a component waiting to be extracted.
3. **Migrate by blast radius.** Shared components first (one change fixes
   many pages), then the highest-traffic pages, then the long tail.
4. **Keep content untouched.** The redesign moves and restyles content; it
   does not rewrite James's words. Interface copy follows the voice rules.
   Any content claim the new layout exposes as false (a count, a promise, a
   title) is corrected and reported.
5. **Verify like the Working Agreement says.** `pnpm check`, the content
   validators, `pnpm test` (the route smoke net must stay green), `pnpm
   build`, the canonical audit; then look at every changed page at four
   widths in both themes.

---

## 9. Acceptance tests (the board signs only when these pass)

- **Grid census.** Zero repeated-tile grids with tiles narrower than 300px at
  1440px or 1024px; zero reading text under 15px and zero meta under 12.5px
  inside collections.
- **No generic calls to action.** Zero "read more," "learn more," or bare
  "read →" inside any collection; every action line names its action.
- **Mustard share.** Under 8% of the pixels of every audited viewport
  (measure it from the screenshots).
- **Lighthouse (mobile, key templates).** Performance at least 90,
  accessibility 100, best practices at least 95, SEO 100.
- **axe.** Zero serious or critical violations, in light and dark.
- **Keyboard.** Every interactive element reachable in a sensible order, with
  visible focus; every dialog closes on Escape and returns focus.
- **Motion.** Nothing animates under reduced motion.
- **Layout shift.** CLS under 0.1 on every key template; images carry
  dimensions.
- **Phones.** No horizontal scroll at 360px; primary actions within thumb
  reach; nothing essential behind hover.
- **The reader's test.** Each board member writes one sentence per surface
  answering their question from Section 2. Any "no" reopens the surface.
- **The Constitution's test.** A reader should leave feeling Christianity is
  deeper than their politics, older than their culture, wiser than their
  assumptions, and more demanding and more beautiful than they realized. The
  design either serves that impression or gets out of its way.

---

## 10. Guardrails (non-negotiable, from `CLAUDE.md`)

- Palette and fonts are locked. Tokens only; no hex in components; dark mode
  and the light `.admin-scope` both keep working.
- Two runtimes: any API change lands in `server/` and `api/index.ts`, and
  `api-parity.test.ts` stays green.
- New pages declare literal `<SEOMeta title="…" description="…">`; the
  first-paint contract holds; fonts stay self-hosted.
- The shelf is the three handwritten books. The pastors' material lives on
  the Pastors Connection Network. Nothing archived comes back by accident.
- Never fabricate: no invented quotes, studies, statistics, testimonials, or
  biography, in content or in interface. A claim that cannot be verified is
  left out.
- Stateful operations (database pushes, the `/api/admin/*` one-shots,
  Stripe) are James's to run, not the board's.

---

## 11. What to hand back

For each wave: a pull request with before and after screenshots of every
changed surface at 1440 and 390, the census and Lighthouse numbers before and
after, the board's one-sentence sign-offs, and a short list of anything only
James can decide (content he needs to write for a new slot, a photo only he
can provide, a claim that needs his word). Plain language, no victory laps.
