# Design review — what would make the site look better

A read of the design system as it actually stands in the code, not as the brand doc
describes it. Ranked by how much each change would improve what a visitor sees.

Counts below are measured, not estimated.

---

## What is genuinely working

Worth saying plainly, because the fixes below are small next to it.

The **type pairing is right.** Cormorant Garamond at display sizes has the gravity of a
hardcover spine, and Inter disappears at body sizes the way body type should. The
**palette holds**: mustard stays punctuation rather than decoration, cream and charcoal
alternate so no two sections blur together, and pure white is correctly reserved for
cards that need to lift. The **first-paint contract** is unusual and valuable — the
masthead and nav render from committed data before the API answers, so the site never
shows a skeleton where a brand should be.

The problems are not the design. They are the *consistency* of its application.

---

## 1. The type scale — WITHDRAWN, the first reading was wrong

**What I first claimed:** 284 `h1`/`h2` headings use `clamp()` while 97 are hardcoded px,
so the scale is enforced in two places and the 97 should be swapped to tokens —
"mechanical, low risk."

**What is actually true, after looking at them:** the 97 are almost all *component-level*
headings, and they are correctly sized. Of the six fixed-size `h1`s, three are empty-state
messages ("That book is not here yet") that should not render at 56px. The fixed `h2`s are
card titles (`ToolsHub`), list-item titles (`TheologyExplorer`), quiz prompts
(`TheologyQuiz`), and legal subsections (`Terms`).

So the site's real convention is: **`clamp()` for headings that span the viewport, fixed px
for headings inside a component.** That is a reasonable rule, not drift. Swapping the 97 to
a section-heading token would have inflated card titles from 22px to 36px and broken those
grids.

**Revised recommendation:** leave the sizes alone. The only defect is that the convention is
unwritten, so new pages have to guess. Worth naming — a `--fs-card-title` token and a line
in the brand doc — but this is documentation, not a redesign, and it is not the "single most
visible inconsistency." That claim was wrong.

## 2. Spacing — the scale is missing a step

**Evidence:** 447 sections pad with `var(--s-*)` tokens; 133 use raw px. But the dominant
raw value is `80px`, used by **73 sections**, and 80px is exactly `5rem`.

The scale runs `--s-5:3rem`, `--s-6:4rem`, `--s-7:6rem`. **There is no 5rem step.** Those 73
sections are not drifting away from the system; they are supplying a value the system does
not offer. The same is true of `72px` (4.5rem) and `56px` (3.5rem).

So "map to the nearest step" — my original advice — would have resized 73 section paddings
by 20% and changed the vertical rhythm of a third of the site.

**Revised fix:** add the missing steps (`5rem`, and probably `3.5rem`), then the raw values
map exactly, with **zero visual change**. That is the genuinely mechanical version of this
task. Low value, but real, and it stops the next person hardcoding for the same reason.

## 3. Hardcoded hex values now break a shipped feature — FIXED

**Evidence:** 32 hardcoded colours outside the admin area — 29 across `pages/` and
`components/`, plus 3 in `lib/theology.ts` that a first pass missed by scanning only the
component directories.

This mattered less when the site was light-only. **Dark mode now ships**, and a hardcoded
hex cannot flip — so each of these was a patch of the wrong colour in dark mode, and a
place a future brand change would silently miss.

Twenty-one were genuine bugs and are now fixed: three `#FFFFFF` card backgrounds that
stayed white on a near-black page, ten `#666` muted-text values, the five prophetic
timeline category hues (deep colours used as *text* on a card that flips near-black), and
the three doctrinal-triage hues. All are now theme-aware tokens with lightened dark-mode
variants.

Two related traps were fixed with them: `` `${color}1A` `` string concatenation built an
8-digit hex from a raw value, which silently produces invalid CSS the moment the value
becomes `var(…)`. Both sites now use `color-mix(in srgb, … , transparent)`.

The remaining eleven — the quiz option accents in `StartHereQuiz` — are **not** bugs.
They paint a fixed mid-tone background under fixed white text, so both themes read
correctly; the same principle as `--charcoal-fg`.

## 4. The site looks the same all the way down

**Evidence:** 73 pages build their content out of `auto-fit minmax` card grids. The
editorial components that exist to break that rhythm — `PullQuote`, `StatementBand`,
`SectionArt` — appear on **17 of 241 pages**.

This is the biggest *aesthetic* finding, and the cheapest to act on, because the toolkit
is already built and already on-brand. A theology essay site that renders everything as a
uniform card grid reads like a directory. The pages that do use the editorial blocks —
Home, Family, the Prophetic hub — feel markedly more like a publication and less like a
catalogue.

**Fix:** on the twenty highest-traffic pages, break every third or fourth card grid with a
pull quote from the piece itself, or a statement band carrying the section's claim. No new
components, no new colours. This is the change that would most alter the impression of
"unhurried, weighted, grown-up" the brief asks for.

## 5. The nav still asks too much

The header exposes roughly forty destinations across its groups, several near-synonymous.
The audit covered this; it remains true, and it is a design problem as much as an
information one — a menu that cannot be scanned is a menu that gets ignored, and the
work behind it goes unread.

**Fix:** render only the links already flagged `primary: true` in `siteNav.ts` and let the
footer carry the full map. The data already distinguishes them; the header just is not
using the distinction.

## 6. "Library" names four different things

`/library` is a quotations commonplace. `/explore` is titled "The Whole Library."
`/resources` presents a grid of "Libraries." (A fourth, the Leadership Library, has now
left with the pastor material.) A visitor who clicks "Library" expecting the catalogue
lands on a quote archive.

**Fix:** name them for what they are — the commonplace, the catalogue, the resource hub —
and use those names everywhere. This is a copy change, not a build.

---

## What I would do, in order

1. **Editorial variety on the top twenty pages** (#4). Highest visible payoff, lowest risk,
   uses components that already exist. This is now the only finding that would visibly
   change how the site feels.
2. ~~**Hardcoded hex** (#3)~~ — done. Twenty-one real dark-mode bugs.
3. **Add the missing spacing steps** (#2). Zero visual change; stops the hardcoding.
4. **Name the heading convention** (#1). A token and a doc line, not a redesign.
5. **Nav trim and the naming pass** (#5, #6). Decisions about words, so they want the
   author's hand more than mine.

---

## A correction worth recording

Two of the six findings above — the type scale and the spacing — were **wrong on first
reading**, and both were wrong the same way: I measured a pattern, saw it deviate from the
tokens, and assumed deviation meant drift. Looking at what the code was actually doing
showed the opposite. The fixed heading sizes are a sensible convention; the raw 80px
paddings exist because the scale has no 5rem step.

Acting on either as first written would have damaged the site — inflating ninety card
titles, or shifting the vertical rhythm of seventy-three sections — while reporting it as
routine cleanup. A measurement is not yet a finding. The count tells you where to look, not
what is wrong.
