# 00 — Baseline (the before-picture)

> Captured 2026-07-01 on commit `3967e61a4738fa8f8754557ab6e031f0088d3385`
> (branch `site-elevation`). Re-run these exact methods at the end of the
> elevation effort and write the deltas to `RESULTS.md`.

## Method (reproduce exactly)

- **Build:** `npx vite build` on this machine (Node 22.22.2, pnpm store already warm). Wall time via `date +%s.%N` around the command.
- **Serve:** `npx vite preview --port 4173` — static serve of `dist/public`, **no API/DB behind it** (API-dependent regions render their empty/fallback states). Same approach CI's quality job uses (`serve` on :4173).
- **Lighthouse:** `npx lighthouse <url> --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json` with `CHROME_PATH=/opt/pw-browsers/chromium` (Chromium 1194 build). Default mobile emulation + throttling. One run per page (no median-of-3; treat ±3 pts as noise).
- **axe:** `@axe-core/playwright` 4.x with tags `wcag2a, wcag2aa, wcag21a, wcag21aa`, Playwright chromium, `networkidle` + 1.5s settle. Violation counts are **node counts** (a rule failing on N elements counts N).
- **Cross-check:** CI quality job on the same commit (run 28541231617, job 84615277311) scored the homepage perf **87** / a11y **100** / bp **100** / seo **100** — CI's axe step was **skipped** (ChromeDriver 150 vs Chrome 149 mismatch), so the local axe run below is the only real a11y-scan baseline.

## 1. Lighthouse + Core Web Vitals (lab), 5 pages

| Page | URL | Perf | A11y | Best-Pr | SEO | LCP | CLS | TBT | FCP | Speed Index |
|---|---|---|---|---|---|---|---|---|---|---|
| Homepage | `/` | **84** | 98 | 96 | 100 | 2,559 ms | 0.000 | 55 ms | 2,406 ms | 19,204 ms |
| Writing index | `/writing` | **84** | 98 | 96 | 100 | 2,572 ms | 0.000 | 44 ms | 2,403 ms | 20,354 ms |
| Babylon (flagship product) | `/babylon` | **67** | 100 | 96 | 100 | **4,273 ms** | 0.000 | **178 ms** | 3,265 ms | 21,232 ms |
| Theology Quiz (tool) | `/tools/theology-quiz` | **83** | 98 | 96 | 100 | 2,615 ms | 0.000 | 5 ms | 2,509 ms | 20,577 ms |
| Life Audit (tool) | `/tools/life-audit` | **81** | **90** | 96 | 100 | 2,949 ms | 0.000 | 17 ms | 2,680 ms | 21,013 ms |

Read of the numbers: CLS is perfect everywhere (0.000). LCP ~2.5s on standard
pages, blown out to 4.3s on `/babylon` (4,638-word markdown sample rendered
through streamdown on load). Speed Index ~19–21s on every page is the glaring
lab anomaly — the SPA paints a spinner/blank shell for a long time under
throttling before content settles. `/tools/life-audit` is the accessibility
outlier (90; see axe below).

## 2. Bundle & assets (from `vite build` on this commit)

| Metric | Value |
|---|---|
| Total JS emitted | **17.90 MB raw** across **627 chunks** |
| Total CSS | 0.12 MB |
| dist/public total | **67 MB** |
| Build wall time | **27.4 s** (vite-reported 23.8 s) |
| Build warnings | 1: `(!) Some chunks are larger than 500 kB after minification` |

Largest JS chunks (raw / top-5 gzip):

| Chunk | Raw | Gzip | What it is |
|---|---|---|---|
| `AdminDashboard-*.js` | 2,087 kB | 709.5 kB | admin SPA page (lazy) |
| `index-*.js` (main) | 862 kB | 262.7 kB | **eager** app shell — everyone pays this |
| `emacs-lisp-*.js` | 762 kB | 192.0 kB | shiki grammar (via streamdown) |
| `index-BwH6iIdR.js` | 616 kB | 164.4 kB | secondary vendor chunk |
| `cpp-*.js` | 611 kB | 43.9 kB | shiki grammar (via streamdown) |
| `wasm-*.js` | 608 kB | — | shiki grammar |
| `mermaid.core-*.js` | 442 kB | — | diagram engine (via streamdown) |
| `cytoscape.esm-*.js` | 432 kB | — | graph engine (via streamdown) |
| `treemap-*.js` | 322 kB | — | mermaid sub-chunk |
| `DeepBibleCompanion-*.js` | 268 kB | — | tool page with inline data |

Largest non-JS assets shipped in dist:

| Asset | Size |
|---|---|
| `admin-article-bodies.json` | **4,311 kB** (public!) |
| `article-library.json` | 1,076 kB |
| `ebook/when-god-bless-america/*.pdf` | 767 kB |
| `theology/passage-notes.json` | 676 kB |

## 3. Accessibility violations (axe, WCAG 2.1 A/AA, 5 pages)

| Page | Critical | Serious | Moderate | Minor | Rules |
|---|---|---|---|---|---|
| `/` | 0 | 0 | 0 | 0 | clean |
| `/writing` | 0 | 0 | 0 | 0 | clean |
| `/babylon` | 0 | 0 | 0 | 0 | clean |
| `/tools/theology-quiz` | 0 | 0 | 0 | 0 | clean |
| `/tools/life-audit` | 0 | **1** | 0 | 0 | `color-contrast` (serious ×1) |
| **Total** | **0** | **1** | **0** | **0** | |

(Static-serve caveat: API-dependent regions were in fallback state, so
DB-rendered article content wasn't scanned. The Lighthouse a11y 98s on
home/writing/quiz and 90 on life-audit point to additional non-axe findings —
contrast and link-name checks — for the full 1.3 accessibility audit.)

## 4. Tests & coverage

| Metric | Value |
|---|---|
| Test files | 27 (server-only) |
| Passing | **232** |
| Skipped | 72 (21 suites gate on `DATABASE_URL`, unset here and in CI) |
| Failing | 0 |
| Suite duration | 5.4 s |
| Client-side tests | **0** (no *.test.tsx, no e2e) |
| Coverage tooling | **None configured** — no numeric coverage exists; "0% measured" is the honest baseline |

## 5. Known-good reference point

- Branch: `site-elevation` created from `claude/sharp-volta-i0h71q`
- Commit: `3967e61a4738fa8f8754557ab6e031f0088d3385`
- Verified at capture time: working tree clean · `tsc --noEmit` clean · `vite build` exit 0 · 232/232 runnable tests pass · CI green on the same commit (build + quality jobs, run 28541231617)
