# CHANGES — sitewide consistency fixes

Work against the LiveWell consistency/gaps brief. One section per commit.

## Step 0 + Step 1 — Single source of truth for counts (DONE)

**Ground truth (verified against the live `books` table and `posts` feed):**
- **Books: 21** (all published, `bookType: authored`). The site prose said "Twenty-five" / "25" in several places. Fixed.
- **Essays: now ~247 published** (after publishing the article library), so the old hardcoded "160+" was stale. It already had a dynamic hook (`useArticleCount`); the hardcoded copies now use it and render the rounded live value (e.g. "240+").

**Added:** `client/src/config/siteStats.ts` — the single source for `bookCount` (21), spelled forms, years in ministry, sons. Essay count is intentionally NOT hardcoded here; it stays live via `useArticleCount()`.

**Routed through the config (no more hardcoded book counts):**
- `pages/Books.tsx` — hero line, SEO description, CollectionPage JSON-LD
- `pages/About.tsx` — meta description, "Author of N books"
- `pages/Membership.tsx` — "N books" + the stale "160+ essays" (now live via hook)
- `pages/RoadMap.tsx` — "N already in print"
- `lib/positioning.ts` — SHORT_BIO
- `components/AuthorBio.tsx` — end-of-article bio
- `components/SEOMeta.tsx` — Person JSON-LD description
- `scripts/prerender-heads.mjs` — static SEO head tags (value corrected; keep in sync with siteStats)
- `CLAUDE.md` — project doc

The catalog label "All {n} books" was already computed from the rendered list (correct at 21); only the prose was wrong.

---

## TODO — remaining brief steps

- **Step 2 — Taxonomy reconciliation** (5 pillars vs. 3 homepage "Lede Arcs"). Deeper than the brief assumed: three layered systems coexist (old `tracks`, `PILLARS_V2` of 6, and the current 5-pillar nav in `subPathways.ts`). The homepage "Lede Arcs" are the old `FEATURED_TRACKS`. Reconciling fully is an architectural refactor touching track pages, footer, and chips — handling carefully and separately to avoid breakage.
- **Step 3 — Hero CTA / shortened subhead / A/B variant. (DONE)** Added `PRIMARY_SUBHEAD_SHORT` (two sentences, same claims, no new copy; long version kept for variant B). Added a `HERO_VARIANT` flag (default "A") in `Home.tsx`: variant A shows the short subhead and a "Find your track" secondary CTA → `/start`, with the skeptic entry kept as a tertiary link; variant B is the original.
- **Step 4 — "From the writing" excerpt.** Largely already present: the homepage renders a featured "lede" essay card above the fold, sourced live. May refine to show 2–3 sentences ending on a verdict line.
- **Step 5 — SEO foundation.** SPA with existing `prerender-heads.mjs` + `SEOMeta` + `generate-sitemap.mjs`. Still to add: canonical URLs for `?pillar=&sub=` variants, Book/Article JSON-LD coverage, OG/Twitter completeness audit.
- **Step 6 — Book purchase paths. (RENDERING DONE)** `BookDetail.tsx` already renders a buy link only when `purchaseUrl` is set, and hides it otherwise. **OWNER TODO: all 21 books currently have `purchaseUrl: null` — provide retailer URLs (none invented).**
- **Step 7 — Membership waitlist nurture tag.** The form already posts `source: "membership-waitlist"`. **OWNER TODO: confirm the email provider segments on that tag.**
- **Step 8 — Consistency test + guardrails. (DONE)** `server/consistency.test.ts` asserts `bookCount === 21` and fails if `twenty-five books` / `25 books` / `160+ essays` reappear in client source.

