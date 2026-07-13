# Asset Register & Provenance (L6)

> Gap-closing program, Prompt L6. What every public image, cover, font, download,
> and Scripture quotation is, whether it resolves, and what provenance is on
> record. Consolidated into one doc.
>
> **Headline: no broken assets.** All 105 referenced public assets resolve (or are
> generated at build time). The open items are provenance/permission records that
> are owner-only — not code defects.

## Verified: asset references resolve

An audit of every `/downloads`, `/books`, `/covers`, `/og`, `/fonts`, `/context`,
`/creeds` asset referenced in code or JSON against the files on disk found **2
apparent misses, both false positives**: `elder-training-manual.pdf` and
`deacon-training-manual.pdf` are **generated at deploy time** by
`scripts/build-leadership-manuals.mjs` (wired into the Vercel build via
`pnpm run manuals`), so they exist in production. Every other asset resolves.

A guard for this could be added (a build-time check that every referenced
download/image resolves in the built `dist`), but the current surface is clean;
noted as an optional follow-up, not a fix.

## Asset inventory (types + governance status)

| Type | Where | Provenance status |
| :--- | :--- | :--- |
| Book covers (SVG generated + raster) | `client/public/books/*` | generated covers = own work; the ~22 authored-book raster covers = James's, confirm no third-party cover art |
| Generated library covers | inline SVG (`GeneratedCover`) | own work — no external asset |
| Author headshot(s) | `client/public` | **HUMAN-ONLY** — name the authoritative image + permitted uses |
| Church / family / ministry photos | (mostly absent from repo) | if added, record subject consent + license |
| OG / social cards | `client/public/og/*` (generated) | own work — the generator uses brand tokens, not third-party images |
| Fonts | `client/public/fonts/*` (self-hosted) | confirm the license permits self-hosting (Cormorant, Inter, JetBrains Mono are open-licensed — confirm the exact files) |
| Downloads (PDFs, manuals) | `client/public/downloads/*` (mostly generated) | own content |
| Scripture quotations | in content JSON | ESV by default — confirm ESV quotation-permission limits (word count / percentage) for the volume quoted |
| Named quotations (scholars) | in essays | the editorial rule already forbids fabricated quotes; provenance is the citation itself |

## Open provenance items — HUMAN-ONLY (not code defects)
1. **Headshot** — the authoritative image and where it may be used.
2. **Font licenses** — confirm each self-hosted family's license allows web self-hosting (all three are open-licensed; confirm the specific files shipped).
3. **Scripture** — confirm the ESV (and any other translation used) quotation limits are respected for the total volume quoted across the site.
4. **Authored-book cover art** — confirm the raster covers carry no third-party artwork needing a license.

## What's already sound (no action)
- Self-hosted fonts (no CDN) — a deliberate elevation invariant.
- Covers and OG images are generated from brand tokens, not scraped third-party imagery.
- The no-fabricated-citation editorial rule is enforced in review and by the
  content validators, so scholar quotations carry their own provenance.
