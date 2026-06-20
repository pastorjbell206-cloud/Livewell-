# Information Architecture — Recommendations & Plan

> Board review of livewellbyjamesbell.co, June 2026. The goal: streamline,
> functional, easy to navigate — without destroying content. Every claim below
> was verified against the actual page components before it was acted on.

## Diagnosis

The site is rich but hard to read as a map. It grew by addition: ~187 routes,
several audience landing pages, and **three or four taxonomies running at once**
(homepage Tracks, the legacy 5 Pillars with hubs, the 6-pillar `PILLARS_V2`
scheme, and the `/nation/*` politics cluster). A first-time visitor cannot form
a mental model of where things live.

**Correction after verification:** the first pass assumed most overlapping
routes were duplicates. They are not. The crisis pages (`/grief`,
`/marriage-crisis`, `/faith-crisis`, `/parenting-help`, `/pastoral-burnout`)
are distinct SEO + conversion landing pages, each with its own statistic,
curated articles, book recommendation, and email capture. `/pastors`,
`/for-pastors`, and `/for-leaders` serve different audiences. `/nation/*` is
real standalone content. The "duplicate" tools are different components. **Do
not bulk-redirect.** The lever is wayfinding, not deletion.

## What was safe to consolidate (done)

| Source | Action | Why |
|---|---|---|
| `/resources-for-pastors` | 301 → `/for-pastors` | Verified thin alias: same hero, same layout, same filtering. |
| `/books-store` | 301 → `/books` (already in `vercel.json`) | Same book source. |
| `/for-families` | 301 → `/parenting` (already) | Already redirecting. |
| `/articles`, `/articles/:slug` | 301 → `/writing` (already) | Already redirecting. |
| `/quiz` | 301 → `/tools/theology-quiz` (already) | Already redirecting. |

## Keep (verified distinct content — do NOT redirect)

- **Pastor/leader landings:** `/for-pastors` (post-filtered entry), `/pastors`
  (PCN membership), `/for-leaders` (elders/deacons), `/pastors-resource-wall`
  (tools moat). Each distinct.
- **Crisis landings:** `/help` (the seeker hub), `/faith-crisis`,
  `/marriage-crisis`, `/grief`, `/parenting-help`, `/pastoral-burnout`. Each a
  standalone conversion funnel.
- **Books/library:** `/books`, `/library` (quote commonplace book), `/writing`,
  `/article-collections`, `/book-bundles`. Distinct.
- **Onboarding:** `/start` (quiz), `/diagnostic` (spiritual health),
  `/pillars`, `/framework`, `/roadmap`. Distinct purposes.
- **`/nation/*`** — standalone "Christ and the Nation" topic site.
- **Tools** — `/tools/*` and `/leadership/*` assessments are different
  components, not the same tool at two URLs.

## The real streamline lever — a wayfinding layer (next, content-preserving)

1. **One spine on the surface.** Keep the 5 Pillars as the writing taxonomy;
   keep the 4 homepage mission doors as the public front door. Retire **Tracks**
   and **`PILLARS_V2`** as *navigation* concepts so only one model is visible.
2. **Collapse the top nav to ~5 items + one Subscribe CTA** (Writing · Study
   Guides · For Pastors · Books · About). Group the five pillars under a single
   "Writing" menu instead of five separate dropdowns. Every page stays reachable.
3. **Make each hub unambiguous.** `/help` is the seeker's door; `/for-pastors`
   is the pastor's door; `/resources` + `/studyguides` are the library. Cross-link
   them; don't multiply them.
4. **One canonical onboarding.** Point `/framework`, `/roadmap`, `/pillars` at,
   or clearly beneath, `/start` so there is one "new here?" path.

## Primary journeys to design for

1. **Skeptic** → homepage "Become a Disciple" / `/start` → skeptic essays →
   email → *When Faith Has Questions* guide.
2. **Pastor** → `/for-pastors` → `/leadership` (tools + Hard Issues training) →
   email / PCN → membership.
3. **Seeker in pain** → `/help` → `/plans/:slug` → topical guide → email.

## Roadmap

- **P0 (done):** verified-safe redirect; this plan committed.
- **P1:** nav collapse to ~5 items; retire Tracks + `PILLARS_V2` from the
  surface; single "Writing" menu listing the pillars.
- **P2:** soft email capture on books + study guides; cross-link the hubs.
- **P3:** one canonical "Start Here" experience routing by audience.

> Guiding rule: consolidate the **map**, not the **content**. Every page that
> earns a visitor or a search result stays; what we simplify is how they find it.
</content>
</invoke>
