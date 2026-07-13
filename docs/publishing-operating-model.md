# Publishing Operating Model (L1)

> Gap-closing program, Prompt L1. Resolves how the website, Substack, domains,
> feeds, and article ownership relate. Per L1's rule, no canonical model was
> *changed* without approval — this documents the model already in force,
> evaluates the alternatives, recommends, and flags the one decision that is
> James's to make. It also ships the integrity guard L1 requires.

## Executive summary (for a non-technical editor)

**The website is the home of your writing. Substack is how it goes out by email.**
That is already how the site is built — every essay lives at
`livewellbyjamesbell.co/writing/<slug>` with the full text, and each page tells
search engines it is the original (the "canonical"). Substack sends the email
edition and should link back to the website as the source. The recommendation is
simply to *keep and formalize* this, not to change it. The one thing only you can
confirm: that Substack email editions carry a "read the original at
livewellbyjamesbell.co" link, so the two never compete for the same reader in
search.

## Current state (verified)

- **Website is canonical, by implementation.** `SEOMeta` self-canonicalizes every
  route to `SITE_URL + pathname`; the site serves 584 full essay bodies (DB +
  static library). VERIFIED.
- **Substack is distribution.** The code links *out* to Substack (footer, signup,
  `/substack` → the `substackUrl` setting, default `jamesbell333289.substack.com`).
  It is the newsletter channel, not the essays' canonical home. VERIFIED.
- **Three content stores, one winner.** MySQL (wins on slug) ← static library
  (`content/static-library.generated.json`, behind the DB in `api/index.ts`) ←
  Substack (separate). The 310 DB/static-lib slug overlaps are the intentional
  merge, not a conflict. VERIFIED.
- **Redirects are mature.** 149 rules in `vercel.json` consolidate legacy slugs
  (46 → `/writing`, 31 → `/leadership`, 26 → `/justice`, …). VERIFIED, in-repo.

## The options, evaluated

| Option | Fit for LiveWell | Verdict |
| :--- | :--- | :--- |
| **A. Website-canonical, Substack distributes** | The site already owns the full corpus, the reading paths, the design, the analytics, and the discovery surfaces; Substack email drives return visits back. | **Recommended** — it is the current state; adopt it explicitly. |
| B. Substack-canonical | Would cede the depth, design control, reading paths, and answer-engine indexing (`llms-full.txt`) that are the platform's whole point. | Reject — betrays the depth-first mission. |
| C. Controlled dual publication | Real content in both, one canonical, explicit sync. Higher editorial burden; the `AdminSyncPanel` hints at partial sync but it is not the spine. | Reject for now — cost without benefit given A already holds. |
| D. Hybrid by type | e.g. book chapters canonical on-site, short notes on Substack. No verified need today. | Defer — revisit only if a content type genuinely wants a different home. |

## Decision table (per object)

| Object | Authoritative | Canonical URL | Substack role |
| :--- | :--- | :--- | :--- |
| Full essays | Website (DB→static) | `/writing/:slug` | email edition + backlink |
| Excerpts | Website | on the essay | email teaser |
| Book chapters read free | Website | `/read/:slug` | — |
| Static pages (About, Books, Start Here) | Website | their route | — |
| Newsletter signup | Website form → Mailchimp + Substack | `/subscribe` | the list itself |
| Subscriber record | Provider (Mailchimp/Substack) | — | source of truth |
| RSS/feed | Substack (email) + sitemap (site) | — | feed owner |

## The one decision for James

Confirm **A**, and confirm that Substack email editions link back to the website
as the original. Everything else in this doc is already true. (If you would
rather Substack be canonical, say so — but it would mean surrendering the
site's depth and discoverability, which the mission ranks first.)

## Integrity guard shipped this wave (L1 #10)

`scripts/validate-content-integrity.mjs`, wired into CI, catches corruption
*within* a store (cross-store overlap is intentional and ignored): a slug that
appears twice in one file, a malformed or impossible publication date, or a post
with no pillar.

**It immediately caught 68 real defects, now fixed:**
- **66 posts carried a broken date** — the literal SQL `NOW()`/`NOW(` had leaked
  into `content-data.json` as a string, so those essays had no real publish date
  (they would sort wrong and read as "Invalid Date"). Each was corrected to its
  **real date from the static library** — sourced, never invented.
- **3 duplicate slug copies** — `where-church-was-silent` existed three times
  (the real 13,973-char essay plus an empty copy and a 336-char stub) and
  `complicity-not-innocence` twice; the junk copies could shadow the real essay
  depending on iteration order. Kept the longest body per slug, dropped the rest.

The validator now reports clean and gates the build so this class of defect
cannot return.

## What remains human / external
- Confirm the `.co` canonical and that `www`/`.com`/HTTP all 301 to it (DNS —
  not visible from the repo).
- Confirm Substack editions carry the canonical backlink.
- Decide whether the `AdminSyncPanel` sync is kept, formalized, or retired.
