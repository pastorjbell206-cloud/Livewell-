# Taxonomy Reconciliation — Proposal (decision required, no code changed)

> A recommendation only. Nothing in the code is changed by this document. It
> exists so the single open question in `docs/EDITORIAL-CONSTITUTION.md` — how
> the editorial pillars relate to the code taxonomy — can be settled on purpose
> rather than by accident. Nests under `docs/VISION.md` (move #1) and the
> Constitution.

---

## The problem in one sentence

Four different content taxonomies are live at once, so a reader, a crawler, the
sitemap, and any AI assistant get four different maps of the same library — and
until one wins, every consistency check and every "related reading" feature is
built on sand.

## The four schemes, as they actually exist

| Scheme | Where it lives | What it drives | Count |
|--------|----------------|----------------|------:|
| **13 tracks** | `client/src/lib/taxonomy.ts` (`TRACKS`) | the live nav, footer, `/writing` filter, sitemap, prerender | 13 |
| **Six-pillar V2** | `taxonomy.ts` (`PILLARS_V2`, `MOVEMENTS`) + `pillar-assignments.ts` | the `/pillars` page; `pillarForPost()` resolves every essay to one | 6 |
| **Editorial five pillars** | `docs/EDITORIAL-CONSTITUTION.md` | editorial balance & investment (not code) | 5 |
| **Legacy five-pillar** | `client/src/lib/subPathways.ts` | fallback for old `posts.pillar` values via `LEGACY_TO_V2` | 5 |

The database itself stores only the legacy `posts.pillar` varchar; everything
above is resolved **in code** on top of it. That is why no migration has been
forced yet — and also why the drift has been allowed to grow.

## What it costs

- **Taxonomy debt (highest severity in the content audit).** Until one spine
  wins, consistency tests, orphaned-content checks, and cross-links can't be
  trusted (`docs/audits/content-expansion-audit.md`).
- **Pillar 6 / family has no front door** equal to `/theology`, even though the
  Constitution names family a top priority. It's under-surfaced, not missing.
- **A reader can't form a mental model.** Thirteen tracks in the nav, six pillars
  on `/pillars`, five in the brand story. No one cut is "the library."

## The key fact that makes this decidable

The Constitution already separates two jobs (lines 79–86):

> "These five are the editorial frame for balance and investment. The *code*
> taxonomy spine is a separate, still-open decision … Reconciling these five
> editorial pillars with the code taxonomy has not been decided and must not be
> done silently."

So we are **not** forced to make the public spine equal the editorial five. We
need one **code/public spine** for navigation and filing, and we keep the
**editorial five** as the lens for deciding what to invest in. They can be
different as long as there's a written crosswalk.

## Options

**Option A — Five editorial pillars become the public spine.**
Most reader-legible and most on-brand. But it requires re-tagging every essay's
`pillar` to one of five new values and rebuilding nav/sitemap/filters around
them. Highest effort, highest risk, touches the most content.

**Option B — Six-pillar V2 becomes the single spine; tracks become filters;
legacy retired. (Recommended.)**
Keep the system that already works: `/pillars` (PILLARS_V2) is the spine,
`pillarForPost()` already files every essay, the 13 tracks demote to *filters*
on top of the spine (not a parallel taxonomy), and the legacy five-pillar map is
deleted once nothing falls through. Least effort, least risk, no article
re-tagging beyond what the resolver already does. The engineering audit reached
this same conclusion independently.

**Option C — Keep 13 tracks as the nav, pillars editorial-only.**
Lowest effort but doesn't actually fix the problem — the reader still sees two
maps. Not recommended.

## Recommendation

**Adopt Option B.** Make the **six-pillar V2** the one public/code spine, demote
the 13 tracks to filters, retire the legacy five-pillar map, and keep the
**editorial five** as the investment lens with the crosswalk below.

> Note: this refines the lean in `docs/VISION.md` ("five editorial pillars as the
> public spine"). After reading the code, six-pillar V2 is the same idea at a
> fraction of the cost and risk, because the resolver already files every essay
> into it. The five stay as the editorial lens, exactly as the Constitution
> intends.

### Proposed crosswalk (editorial five → code six)

| Editorial pillar (Constitution) | Code pillar (PILLARS_V2) |
|---|---|
| 1. Christianity After Christendom | After Christendom |
| 2. The American Church and Its Blind Spots | Capture by the Right + Capture by the Left |
| 3. Discipleship & Spiritual Formation | Living Well After Christendom (practices) |
| 4. Marriage, Family, Parenting, Manhood | Living Well After Christendom (family sub-themes) |
| 5. Pastoral Leadership & Church Renewal | The Pastoral Angle |
| (cross-cutting method) | Reading Scripture Past Our Politics |

This is the part most worth your eye — it's where editorial intent meets the
code, and it shouldn't be set silently.

## Phased plan (only if Option B is approved — not yet executed)

1. **Decide + write it down.** Ratify the spine and the crosswalk in the
   Constitution so the open decision is closed.
2. **Demote tracks to filters.** Tracks stay as a filter layer over the six
   pillars; nav/footer point at the six pillars as the spine.
3. **Give Pillar 6 a real front door** (`/pillars/living-well` or `/family`)
   matching the gravity of `/theology`.
4. **Retire the legacy five-pillar map** once `pillarForPost()` resolves every
   essay without falling through (verify with the consistency test).
5. **Re-run sitemap + consistency tests; confirm zero orphans.**

No step ships until you approve the spine. This document changes nothing on its
own.
