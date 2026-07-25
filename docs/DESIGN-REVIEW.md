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

## 1. The type scale is enforced in two places at once

**Evidence:** 284 `h1`/`h2` headings size themselves with `clamp()`; **97 are hardcoded
px**.

Those 97 do not scale. On a phone they crowd the gutter; on a wide display they look
undersized against neighbouring sections that grow. A reader moving between pages feels
the site subtly change register for no reason. This is the single most visible
inconsistency, because headings are the first thing the eye lands on.

**Fix:** promote the clamp values already in use into named tokens — `--fs-display`,
`--fs-h2`, `--fs-h3` — and replace the 97 fixed sizes with them. Mechanical, low risk,
and it makes every future page correct by default.

## 2. Spacing drifts the same way

**Evidence:** 447 sections pad with `var(--s-*)` tokens; **133 use raw px**.

The section rhythm is the quiet thing that makes a long essay site feel composed. When a
third of sections breathe on a different grid, pages feel assembled rather than designed —
hard to name as a reader, easy to feel.

**Fix:** same treatment. Map the raw values to the nearest scale step and replace.

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

1. **Editorial variety on the top twenty pages** (#4). Highest visible payoff, lowest
   risk, uses components that already exist.
2. **Type scale tokens** (#1). Mechanical, and it stops the drift recurring.
3. ~~**Hardcoded hex** (#3)~~ — done.
4. **Spacing tokens** (#2). Same pass as #1.
5. **Nav trim and the naming pass** (#5, #6). Both are decisions about words, so they want
   the author's hand more than mine.

Items 1 through 4 are safe to execute and verify. Items 5 and 6 change what things are
called, which is a voice decision.
