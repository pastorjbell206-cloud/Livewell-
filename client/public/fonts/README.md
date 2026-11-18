# Self-hosted fonts

Subsetted woff2 files for the brand families, committed here so no page load
ever contacts a third party for type.

- **Cormorant Garamond** — upright (one variable file per subset, used at
  400 to 600) + italic 400, latin and latin-ext subsets. Copyright the Cormorant Project Authors; licensed
  under the SIL Open Font License 1.1.
- **Inter** — one variable file per subset, used at 400 to 600, latin and
  latin-ext subsets. Copyright the
  Inter Project Authors; licensed under the SIL Open Font License 1.1.

- **Source Serif 4** (the reading face, `--font-reading`): upright 400 and
  600 and italic 400, latin and latin-ext subsets, taken from the npm
  package `@fontsource/source-serif-4` 5.3.1 (`npm pack`, then the files
  under `files/`). Licensed under the SIL Open Font License 1.1 (the
  package's own LICENSE file). Not preloaded: only a page that sets long reading
  (an essay, a Bible chapter, a devotion) downloads it.

The matching `@font-face` rules (with the original `unicode-range` values,
so latin-ext files download only when a page actually uses those
characters) live in `client/src/index.css`. The two critical latin files
are preloaded from `client/index.html`.

The upright files are variable fonts (Google serves the same file for every
weight of a family), so each subset is declared once with
`font-weight: 400 600`. Do not add a second copy of a file under another
weight's name: the browser downloads each name separately.

To change weights or add a family: request the CSS from
`fonts.googleapis.com/css2` with a woff2-capable User-Agent, download the
latin/latin-ext subset URLs it lists, drop them here, and mirror the
`@font-face` blocks (keep `font-display: swap` and the `unicode-range`).
