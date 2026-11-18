# Home speed on GitHub's runner (unit "homelcp", 2026-11-18)

Branch `elite/homelcp`. One fix, in `client/src/lib/static-hero.ts`, with its tests, and the axe wait in `.github/workflows/ci.yml`. Nothing a visitor sees was removed or moved.

## The yardstick

Lighthouse at its default settings scores Home 100 here, so it proves nothing about GitHub. A heavier simulated CPU (`--throttling.cpuSlowdownMultiplier` 8, 12, 20) does not help either: it only scales the blocking time, because the simulation keeps the order of events it saw on this fast machine, where the hero's paint is reported before the app mounts.

What reproduces GitHub is a slow machine during the load itself. The yardstick:

1. Gather with a real 4x CPU slowdown and no network throttling (`lighthouse --throttling-method=devtools --throttling.cpuSlowdownMultiplier=4 --throttling.requestLatencyMs=0 --throttling.downloadThroughputKbps=0 --throttling.uploadThroughputKbps=0 -G`), so the page runs in the order a slow runner sees.
2. Score those artifacts with Lighthouse's own simulated phone at 2x CPU (`-A`, settings otherwise the defaults), so the total CPU cost is 8x, which matches GitHub's blocking time.

Scripts: `/home/user/tmp-homelcp/lhslow.sh`, `reaudit.sh`, `yard.sh` (scratch, not committed).

Before the fix, five runs: 95, 93, **89 (LCP 3.71 s)**, **85 (LCP 3.77 s)**, 94. GitHub's last run: 93, 89, 89 with LCP 2.9, 3.4, 3.4 s. Same shape: some runs fine, some with LCP far behind FCP.

## The chain, from the report and the trace

LCP element on a phone: the static hero's `H1.home-hero__title` (Cormorant Garamond), in `#lw-shell .home-hero` from the prerendered `/`. Sizes before any change (transfer / raw):

| On the chain | Size |
|---|---|
| Document `/` (static hero inside) | 4.1 KB / 10.5 KB |
| Render-blocking stylesheet `index-*.css` | 41.3 KB / 236 KB |
| Cormorant 400 latin (headline face, preloaded, `font-display: swap`) | 37.8 KB |
| Inter 400 latin (preloaded) | 48.5 KB |
| Entry script `index-*.js` | 88.3 KB / 298 KB |
| `vendor-react-*.js` (modulepreload) | 61.0 KB / 194 KB |
| Lazy chunks after mount (tonight, family year, tools list, icons, sonner, plates...) | about 45 KB in 20 files |

When things go right, only the first four are on the chain and LCP is 0.9 s.

What went wrong, read from the trace of a failing run: the hero was painted at 253 ms, but Chrome reported that paint (first contentful paint) only at 1,198 ms. `mountAfterStaticHero` waits for that report, capped at 300 ms. The cap ran out at 818 ms, React mounted and replaced the hero before its paint was reported, so Chrome dropped the static headline as a candidate and counted React's copy at 1,479 ms. Lighthouse's simulation then put the entry script, React and every lazy chunk ahead of the largest paint: LCP 3.7 to 4.8 s.

The stylesheet, the fonts and the static hero were not the problem: the hero paints first and matches the live one to the pixel (CLS 0 in every run).

## What changed

- The wait for the hero's paint report is 2.5 s, not 300 ms. On a normal phone the report comes a frame or two after the paint, so React mounts as soon as before. On a slow machine the hero stays (it is the same page) until its paint is counted.
- A tap, a key, a wheel, a touch or a scroll mounts the app at once, so nobody types into a field that is not live yet.
- Two tests: the 2.5 s default, and mounting on input.
- Axe's `--load-delay` on Home is 3 s (was 1 s), with the comment above it updated, so axe never audits the static shell before the app mounts.

## Numbers after

- Yardstick, ten runs over two builds: 98, 100, 95, 97, 96, then 97, 97, 98. LCP 0.90 to 0.91 s in every run. Blocking time 91 to 263 ms. Accessibility 100, CLS 0.
- The CI command at default settings: 100, 100, 100, LCP 0.9 s, accessibility 100, best practices 96, SEO 100, CLS 0.
- Chapter (`/study/bible/john/3`), CI command: 87, 90, 85 (median 87, LCP 3.5 s, CLS 0). Before (REVIEW.md, local): 88. GitHub before: 85.
- Essay (`/writing/what-post-christian-means`), CI command: 82, 79, 81 (median 81, LCP 4.2 s, CLS 0). Before (REVIEW.md, local): 80. Those pages never reach the changed code (it returns at once for any path but `/`).

## What I ran, watched pass

- `pnpm check`: pass.
- The 34 content-gate commands in ci.yml: 34 ran, 0 failed.
- `pnpm test`: 140 files passed, 7 skipped; 1,622 tests passed.
- ESLint on the two changed source files: clean.
- `pnpm run build`, `pnpm run sitemap`, `pnpm run prerender`, `pnpm run audit:canonicals`: pass.
- Screens at 390x844 and 1440x900, day and night, of the static hero (entry script blocked) and the live page: `/home/user/elite-shots/homelcp/`. Headline, sentence, Find field and chips sit in the same place in both.

## Not verified

- GitHub's runner itself. The claim rests on the yardstick above, which reproduced GitHub's failing shape before the fix and did not show it in ten runs after.
- A real slow phone. There the hero is the same; only the live copy (menu buttons, the plate drawing, tonight's line) could come later on a device that reports its paint late, never more than 2.5 s, and at once on a tap.
- Seen in passing, not touched: under a forced `dark` class the static masthead bar is cream with a pale wordmark. Night mode is off for visitors (App.tsx), so no visitor sees it.

## For James

Nothing. No wording, picture or threshold changed.
