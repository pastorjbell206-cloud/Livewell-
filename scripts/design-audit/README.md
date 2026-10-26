# Design audit tooling

Measures the site the way `docs/design/BOARD-OF-EXPERTS.md` (sections 8 and 9)
asks: real pages, real content, numbers instead of impressions.

1. Build and prerender: `pnpm build && pnpm prerender`.
2. Serve the build with the production API behind it (the dev server has no
   essay library without a database; this uses `api/index.ts` and its static
   fallback, plus `api/og.tsx` for card art):
   `PORT=4400 npx tsx scripts/design-audit/server.ts`
3. Run the census (playwright-core is not a project dependency; install it in
   a scratch prefix):

   ```sh
   npm i --prefix /tmp/pw playwright-core
   PLAYWRIGHT_CORE=/tmp/pw/node_modules/playwright-core/index.mjs \
   CHROMIUM=/path/to/chrome \
   node scripts/design-audit/census.mjs
   ```

   It prints, per page and viewport, how many tile grids break the laws (tiles
   under 300px on desktop, reading text under 15px, three or more repeated
   generic calls to action) and the share of the viewport painted mustard, and
   writes screenshots plus `report.json` to `design-audit-out/` (gitignored
   output; delete it when done).
