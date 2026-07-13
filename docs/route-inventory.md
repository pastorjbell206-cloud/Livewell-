# Route Inventory

> Generated during the 2026-07 forensic audit (Prompt 1 of the Opus 4.8 pack).
> Source of truth: `client/src/App.tsx` (the `<Switch>`, ~288 `<Route>` entries)
> and `vercel.json` (139 server redirects). Read alongside `docs/site-audit.md`
> (findings) and `NEXT-TEN.md` (the live roadmap).

## Verdict

All 288 route component references resolve to real imports — **zero dead
routes**. The 404 catch-all is correctly positioned. The SEOMeta string-literal
convention holds on static pages; the gaps are the dynamic/config-driven slug
pages (see findings). No P0 routing defects.

## Route families (grouped; counts approximate)

| Family | Count | Notes |
|--------|------:|-------|
| Core / top-level | ~30 | `/`, `/about`, `/explore`, `/library`, `/pillars`, `/answers`, `/assessments`, `/diagnostic`, `/subscribe`, `/pastors`, `/marriage`, `/parenting`, … |
| Legal | 3 | `/privacy`, `/accessibility`, `/terms` |
| Prophetic pillars | ~14 | `/disruption*` (hub, posture, consistency, glossary, questions, witnesses, topic/:slug), `/justice*`, `/lament` |
| Nation | ~16 | `/nation`, `/nation/scorecard`, `/nation/policy`, + 10 hard-coded essay slugs |
| Theology | ~19 | `/theology` + biblical, compare, glossary, creeds, hermeneutics, which-view, doctrine/:slug, history/:slug, … |
| Leadership | ~29 | `/leadership` hub + ~28 sub-routes (sermon-prep, illustrations, formation/:slug, guides/:slug, …) |
| Tools | ~26 | `/tools` hub + ~25 tools (verse-finder, deep-bible, family-devotions, theology-quiz, …) |
| Life | 3 | `/life`, `/life/:slug`, `/life/assessment` |
| Family | 4 | `/family`, `/family/catechism`, `/family/devotions`, `/family/reading-plans` |
| Books catalog | ~15 | `/books`, `/books/:slug`, + ~13 explicit book + thank-you pairs |
| LiveWell series landings | ~24 | `/covenant`, `/babylon`, `/healwell`, `/rule-of-life`, … each with a gated `/thank-you` |
| Landing pages | ~10 | `/pastoral-burnout`, `/faith-crisis`, `/grief`, `/deconstruction`, `/church-hurt`, … |
| FAQ | 11 | `/faq` + 10 `/faq/:topic` |
| Comparisons | 6 | `/compare/*` |
| Resources | ~6 | `/resources`, context/:slug, creeds/:slug, hard-issues-series |
| Writing / content | ~10 | `/writing/:slug`, `/reading-paths/:slug`, `/pathways/:slug`, `/table/:slug`, `/read/:slug`, `/how-tos/:slug`, … |
| Admin | ~23 | `/admin/login` + `/admin` and 21 `ProtectedRoute` sub-routes |
| Fallback | 2 | `/404` + unnamed catch-all (`NotFound`) |

## Redirects (`vercel.json`)

139 entries. The bulk (~115) are legacy `/writing/<old-slug>` → new slug or
pillar. Plus structural redirects (`/articles`, `/quiz`, `/for-families`,
`/books-store`, `/resources-for-pastors`, `/lead-magnets/:magnetId`) and a
host-canonicalization catch-all.

## Routing issues (detail in site-audit.md)

- **P1** — `/books-store` (`BooksStore`) and `/resources-for-pastors`
  (`ResourcesForPastors`) render live components but are 301-shadowed to
  `/books` and `/for-pastors`. The components are orphaned in prod. Decide:
  redirect **or** keep, not both.
- **P1** — dynamic `SEOMeta` (template literals) on `/nation/*` essays (10),
  the `/justice` + `/disruption` hubs, and `/theology/doctrine/:slug` isn't
  prerender-covered → generic meta fallback on those routes.
- **P2** — dead SPA redirect components behind server 301s: `/articles`
  (`ArticlesRedirect`), `/for-families` (`ForFamiliesRedirect`), `/quiz`
  (`TheologyQuiz`). Server redirect always wins; the components are dead code.
- **P2** — duplicate redirect object: `/writing/complicity-not-innocence` →
  `/justice` appears twice in `vercel.json` (lines ~81 and ~221).
- **P2** — competing onboarding: `/start` (`StartHereQuiz`) vs `/start-here`
  (`StartHereDiagnostic`) are two experiences for the same intent. Confirm the
  canonical one (open decision, also noted in `docs/audit/ELEVATION-SUMMARY.md`).
- **Note** (not a defect) — pillar asymmetry: `/disruption` exposes
  `consistency` and `questions` sub-routes; `/justice` does not. Product gap.
