# Design Review — Imagery & Visual Rhythm

> A board-of-experts review answering one question: the content is strong and
> the writing is loved, but the site reads as wordy — should there be more
> images, and where? Held to the existing brand ("the feeling of opening a
> serious book in a quiet room"; an explicit *no* to coffee-shop warmth; mustard
> under 8% of any viewport; cream is the room). Governs nothing on its own — it
> is a plan. The brand contract in `CLAUDE.md` wins any conflict.

## The verdict

The symptom is real; the cure is not "more images." It is **more visual
registers.** Today the whole site breaks up text with exactly two devices:
flipping the section background (cream → charcoal → cream) and putting hairline-
mustard borders on cards. Every page repeats those two moves. The eye gets no
relief because it keeps being handed the *same* relief. Stock photography would
violate the brand. The fix is to break the page the way a fine hardcover or a
literary magazine does: photography used **surgically** (almost all of one man —
James Bell and his actual world, treated to sit in the palette), plus a family
of typographic and generated-art devices — several of which the codebase already
built and then left unplugged.

## What exists today (grounding)

- **Images on the site are almost entirely book covers.** ~90 static files in
  `client/public/`, essentially all covers (41 generated SVG + jpg/webp
  siblings). Every other `public/` subfolder is JSON content, no images.
- **Exactly three real photographs, all remote (CloudFront), none in the repo:**
  the James Bell portrait (About + end-of-article `AuthorBio`), and two full-
  bleed *hero-background* photos under heavy charcoal gradients on **Substack**
  and **Pastors**. That gradient-over-photo treatment is already the on-brand
  pattern for "weighted, not warm."
- **The reading experience is deliberately photo-free.** `ArticleHero`
  documents "no stock photography"; every essay uses `GeneratedHero` — procedural
  SVG art, six motif families chosen by pillar, hashed by slug, drawn in tokens,
  dark-mode aware. Keep this stance.
- **Two token-driven generators already exist** (`GeneratedHero`, the
  `api/og.tsx` edge card) — proof that branded visuals can be generated from
  nothing but tokens, with zero asset management and zero layout shift.
- **`BookCover`** lazy-loads, reserves a 2:3 box, and degrades to a branded
  typographic placeholder on error.
- **Icons carry the visual load on text pages:** `lucide-react` is imported in
  ~135 files — often the only recurring visual element on a page.
- **Pages with zero imagery:** Home (literally none), every pillar hub
  (`Pillars`, `Writing`, `HistoricFaith`, `LivingWell`, the whole `Theology`
  cluster), the Table studies, and every file-driven library reader.

## Two stranded assets (the cheapest wins on the site)

The article CSS already defines beautiful devices that **never render**:

- `.pullquote` (centered display serif, mustard rules top and bottom) —
  unreachable, because the Markdown renderer strips the raw HTML that would
  trigger it.
- `.scripture-ref` — defined and emitted by nothing. Scripture, the most central
  thing in the brand, currently gets no distinct visual treatment.

Activating these (as reachable React components) is the highest-leverage,
most-on-brand text-relief available, and needs no photography.

## The block kit (the scalable answer)

A page-density problem across ~180 pages has to be solved with components, not
per-page hand-work. Ship a small kit and drop its blocks *between* the card
grids so the scroll has punctuation:

- **`PullQuote`** — a lifted line in the display serif, mustard rules; the
  reachable version of `.pullquote`.
- **`ScriptureBlock`** — the verse set large, the reference traveling with it in
  a mustard label (brand rule: the reference always follows the quote).
- **`StatementBand`** — one sentence, full-bleed, alone on its own color field:
  the horizontal "rest" that punctuates a run of vertical card stacks.
- **`SectionArt`** — a slim generated divider in the same procedural language as
  `GeneratedHero`, sized down to a strip so it reads as punctuation, not a hero.

All four live in `client/src/components/EditorialBlocks.tsx`, styled only from
`:root` tokens, each with a `tone="dark"` variant for the charcoal/ink bands.

## Photography — fewer, better, mostly of one man

The honest answer to "more images": **yes, but almost all of James Bell and his
real world**, and only on identity surfaces — never inside essay prose.
Documentary, black-and-cream or duotone under the existing charcoal-gradient
treatment so it sits in the palette: a marked-up manuscript page, hands, a pulpit
in Fenton, a study with the light good. Three or four of these, placed full-bleed,
carry more of the "break up the text" job than any amount of iconography. This is
the one part that needs *real* photos the platform must supply; the `Figure`
slots and duotone treatment can be built to receive them.

## Per-page prescriptions

- **About** — the densest page (a tiny portrait, then five straight prose
  sections). Highest-impact surface for real photography: 2–3 documentary images
  and one full-bleed statement.
- **Home** — currently zero images. Alongside About, the top surface once photos
  exist (hero-background treatment already proven on Substack/Pastors).
- **Historic Faith** — three identical eyebrow→headline→cards blocks. Vary them
  with the block kit. *(Done — this is the pilot.)*
- **Theology / pillar hubs** — six card grids back-to-back. Insert a
  `StatementBand` or `SectionArt` between grids.
- **Books** — ~20 identical promo strips. Covers *are* the imagery (good), but
  group them (a featured few, then a denser cover wall) so it reads as a shelf.
- **Table studies** — a long column of identical session cards. Let sessions vary
  lightly and let the "Pass it on" callout do more work.

## Roadmap (in order)

1. **Activate the stranded devices** — reachable `PullQuote` + a real
   `ScriptureBlock`. Cheapest, most on-brand relief on the site. *(Done.)*
2. **Ship the block kit** — `PullQuote` / `ScriptureBlock` / `StatementBand` /
   `SectionArt`, tokens only, dark variants. *(Done.)*
3. **Fix the worst monotony pages with the kit** — Historic Faith *(done, pilot)*,
   then the About wall, then insert breaks in the Theology hubs.
4. **Place 3–4 treated photographs of Bell and his world** — About first, then
   Home hero and one hub. Needs real photos supplied; build the `Figure` slots
   and duotone treatment to receive them.

The through-line: this is a **writer's** platform, so images stay in service of
the words — a few, weighted, mostly of the founder — while the day-to-day relief
comes from a richer typographic system. That keeps the "serious book in a quiet
room" feeling intact while giving the eye somewhere to rest.
