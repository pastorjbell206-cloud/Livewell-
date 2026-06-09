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

## TODO — remaining brief steps (not yet done)

- **Step 2 — Taxonomy reconciliation** (5 pillars vs. 3 homepage "Lede Arcs"). The highest-value structural fix. Needs a `taxonomy` config + mapping the 3 arcs to their parent pillar(s).
- **Step 3 — Hero CTA / shortened subhead / A/B variant.** Needs the owner's call on copy and which secondary CTA.
- **Step 4 — "From the writing" excerpt block on homepage** (pull a featured essay excerpt dynamically).
- **Step 5 — SEO foundation.** This is an SPA (no SSR); there is already a `prerender-heads.mjs` + `SEOMeta` + `generate-sitemap.mjs`. Need: per-pillar/essay titles+descriptions, OG/Twitter, JSON-LD Book/Article, canonical URLs for `?pillar=&sub=` variants.
- **Step 6 — Book purchase paths.** The data model already has `purchaseUrl` (all 21 are currently `null`). Render a buy button only when set. **OWNER TODO: provide retailer URLs for the 21 books** (none are known — will not be invented).
- **Step 7 — Membership waitlist nurture tag.** The form already posts `source: "membership-waitlist"`. Confirm the email provider segments on it. **OWNER TODO: confirm or wire the email provider.**
- **Step 8 — Consistency test + guardrails.**
