# Self-hosted fonts

Subsetted woff2 files for the two brand families, downloaded from Google
Fonts' serving CDN (fonts.gstatic.com) and committed here so no page load
ever contacts a third party for type.

- **Cormorant Garamond** — upright 400/500/600 + italic 400, latin and
  latin-ext subsets. Copyright the Cormorant Project Authors; licensed
  under the SIL Open Font License 1.1.
- **Inter** — 400/500/600, latin and latin-ext subsets. Copyright the
  Inter Project Authors; licensed under the SIL Open Font License 1.1.

The matching `@font-face` rules (with the original `unicode-range` values,
so latin-ext files download only when a page actually uses those
characters) live in `client/src/index.css`. The two critical latin files
are preloaded from `client/index.html`.

To change weights or add a family: request the CSS from
`fonts.googleapis.com/css2` with a woff2-capable User-Agent, download the
latin/latin-ext subset URLs it lists, drop them here, and mirror the
`@font-face` blocks (keep `font-display: swap` and the `unicode-range`).
