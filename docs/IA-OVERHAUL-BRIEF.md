# IA Overhaul Brief — clarity, wayfinding, and discipleship-first

The standing operating brief for reorganizing livewellbyjamesbell.co so a stranger
can find anything in three clicks, and so it becomes the clearest place on the web
to come for discipleship and resources. Hand this to any capable agent; it is
self-contained and seeded with the site's real structure.

---

## Role

Principal information architect, designer, and front-end engineer for **LiveWell by
James Bell** (React 19 + Vite + tRPC + Drizzle + MySQL on Vercel). Reorganize the
whole site for clarity and wayfinding, discipleship-first. Read `CLAUDE.md`,
`docs/EDITORIAL-CONSTITUTION.md`, `design-system.md`, and `docs/AUDIT-STATUS.md` first.

## The vision (what "done" feels like)

A skeptic, a questioning Christian, a pastor, and a tired parent each land on the
home page and within one screen know exactly where to go. Every page answers "where
am I, what is this, where do I go next." Nothing duplicated, nothing orphaned,
nothing dead-ends. One calm, well-lit library — not a pile of features.

## Prime directives (never violate)

1. Branches + a **draft** PR per coherent unit; keep CI green. A second Claude
   session is also editing this repo (book pipeline, Hard Issues, donate lib) —
   touch the fewest shared files possible and flag overlaps for the human.
2. **Never delete a URL.** Anything moved/renamed gets a 301 in `vercel.json`. Zero
   new 404s.
3. Reuse the design system — CSS vars in `client/src/index.css` (`--ink`, `--bone`,
   `--mustard`, `--mustard-text`), Cormorant Garamond + Inter, the <8%-mustard rule,
   mustard never as body text on cream. No new fonts/palette/component library.
4. Voice on every visible word (`CLAUDE.md`). "navigate" is a forbidden word — use
   "find your way," "move through," "where to start." No therapy-speak, no
   signposting, no exclamation marks.
5. Don't invent content. Reorganize, relabel, connect what exists.
6. Verify on a Vercel preview.

## Current state (start here)

- **Spine:** the five pillars are the only taxonomy — Theological Depth, Prophetic
  Disruption, Prophetic Justice, Integrated Life, Leadership Formation. Footer
  mirrors the header. "Resources" names one thing (the hub at `/resources`). Tools
  live under `/tools`. `/quiz` 301s to `/tools/theology-quiz`.
- **Audiences (in weight):** skeptics, questioning Christians, pastors (PCN), people
  seeking to live well.
- **The sprawl:** 185 routes; ~31 reachable from nav/footer. Real, good content that
  is hard to find and labeled inconsistently: `/writing`, `/books`, `/resources`,
  `/studyguides/*`, `/leadership` (+`/formation`, `/inventory`, `/sermon-series`),
  `/resources/hard-issues-series`, `/family/*`, `/theology/*`, `/reading-paths`,
  `/plans/*`, `/tools/*`, `/lead-magnets/*`, `/life/*`, `/discipleship`.
- **List-building:** reusable `GatedDownload` (email → `/api/subscribe`) already
  exists; Study Guides + Hard Issues use it. Growing the list via gated resources is
  a goal.
- SEO/perf/a11y already strong (`docs/AUDIT-STATUS.md`) — do not regress.

## The work — one draft PR per phase

- **Phase 0 — Inventory & map.** `docs/IA-MAP.md`: every route, what it is, audience,
  pillar, how it's reached, overlaps; each marked KEEP / MERGE / RENAME / RELOCATE /
  REDIRECT. No code changes; the human approves this first.
- **Phase 1 — One taxonomy, one label per thing.** Lock a short primary nav: five
  pillars + "Start here" + "For Pastors" + "Resources" + "Books." Collapse synonyms
  into one hub each; one canonical URL and one label per destination.
- **Phase 2 — Wayfinding.** Rebuild MinimalNav to the spine (two levels max), footer
  mirrors it, breadcrumbs on every interior page.
- **Phase 3 — Discipleship pathways.** A `/start` that routes by need into ordered,
  finishable sequences (article → guide → book) with a next step at every stop. No
  dead ends.
- **Phase 4 — Unified Resources hub.** One `/resources` listing everything
  downloadable with search + pillar/audience/format filters; ONE card component and
  ONE email-gated download pattern (every free resource grows the list).
- **Phase 5 — Template consistency.** Every page type: a one-line "what this is," the
  content, a "next step" block, breadcrumbs; consistent empty/loading/error states.
- **Phase 6 — Search & labels.** One obvious search across articles/books/resources;
  plain, consistent, voice-true labels.
- **Phase 7 — Redirects & cleanup.** 301s for every moved route; regenerate sitemap
  to match the new IA; update `llms.txt`.

## Definition of done (measure)

- Three-click rule from home to any article/book/resource/pathway (show a click-path
  table for 10 tasks).
- Zero orphans (every route reachable), zero dead ends (every page has a next step).
- Zero broken URLs (every old path resolves 200 or 301); new 404s = 0.
- One label per destination; one card component; one gated-download pattern.
- Header = footer spine; breadcrumbs on every interior page.
- `/start` routes every audience to a finishable pathway.
- `/resources` lists 100% of downloads, all gated, filterable.
- No regressions: Lighthouse SEO ≥ 98 / Perf ≥ 90 mobile / a11y ≥ 98; sitemap 100%;
  CI green; every visible word passes the kill-list.

## Workflow

Phase 0 is a doc the human approves before code. Then one draft PR per phase,
smallest diffs on shared files, each with before/after click-paths and a redirect
list. Verify on preview. Flag overlaps with the parallel session. Never merge red,
never delete a URL.
