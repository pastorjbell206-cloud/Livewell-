# LiveWell by James Bell

Connecting the depth of theology to the weight of everyday life. 880+ essays on marriage, parenting, faith, justice, and pastoral ministry.

**Live site:** [livewellbyjamesbell.co](https://www.livewellbyjamesbell.co)

---

## Step 1 — Verify deployment target

Before making any changes, confirm Vercel is deploying to the live domain:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find the LiveWell project
3. Confirm the production domain is `www.livewellbyjamesbell.co`
4. After merging a PR, wait 1-2 minutes, then hard refresh (`Ctrl+Shift+R`)

---

## How to edit copy

All page content is in `client/src/pages/`. Open the file for the page you want to edit:

- **Homepage:** `client/src/pages/Home.tsx`
- **About:** `client/src/pages/About.tsx`
- **Marriage:** `client/src/pages/Marriage.tsx`
- **Writing:** `client/src/pages/Writing.tsx`
- **Books:** `client/src/pages/Books.tsx`

Text is inside quote marks. Change the text between the quotes. Do not change the code structure around it.

---

## How to change colors

All brand colors are in one place: `client/src/index.css` at the top in the `:root` block. See the EASY EDITS comment at the bottom of that file.

| Variable | What it controls |
|----------|-----------------|
| `--mustard` | Accent color (buttons, links, dividers) |
| `--bone` | Page background |
| `--charcoal` | Dark sections (hero, footer) |
| `--ink` | Body text color |

Change the hex code. The change propagates site-wide.

---

## How to add content

1. Log in at `/admin/login`
2. Click **Writing** in the sidebar, then **New Post**
3. Fill in title, body (markdown), pillar, click Save

Or use the **Import All Content** button on the admin dashboard.

---

## What to test before publishing

1. Hard refresh the live site after deploy (`Ctrl+Shift+R`)
2. Homepage hero text is readable (bone on charcoal)
3. Nav links are readable (dark on bone)
4. Click every nav link — no 404s
5. Open an article — body text renders
6. Mobile layout at 375px — no horizontal scroll
7. Footer links all work
8. Tools load (`/tools`, `/tools/verse-finder`, `/tools/prayer-generator`)
9. Contact form works at `/work-with-james`
10. Admin login works at `/admin/login`
11. Dark mode toggle in footer works
12. Text selection is mustard-highlighted

---

## Tech stack

React 19 + Vite 7 + TypeScript + Wouter + tRPC + Drizzle ORM + MySQL on Vercel.

## Scripts

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Start local dev server |
| `pnpm build` | Production build |
| `pnpm check` | TypeScript type check |
| `pnpm test` | Run tests |
| `pnpm lint` | ESLint |
| `pnpm db:seed` | Seed content |

## Content taxonomy — two movements, six pillars

The library is organized as two movements, each containing pillars. Every essay
resolves to exactly one primary pillar.

**Diagnosis** (what was lost and why)
1. The Capture by the Right · 2. The Capture by the Left · 3. Reading Scripture
Past Our Politics · 4. After Christendom · 5. The Pastoral Angle

**Formation** (how to live well on the other side)
6. Living Well After Christendom — with sub-themes: `marriage-covenant`,
`fatherhood`, `parenting`, `family-household`, `friendship-community`,
`vocation-work`, `practices`.

Source of truth: `client/src/lib/taxonomy.ts` (`PILLARS_V2`, `MOVEMENTS`,
`SUBTHEMES`, `pillarForPost`). Filing resolves **in code** — per-essay
assignments first, then a legacy-pillar fallback — so the legacy `posts.pillar`
values in the database keep working with no migration.

### Filing a piece

1. **Assign a pillar.** Add the slug to `client/src/lib/pillar-assignments.ts`:
   `"my-essay-slug": { pillar: 6, subThemes: ["fatherhood"], confidence: "high" }`.
   If absent, it falls back to its legacy pillar (and defaults to Pillar 5).
2. **Sub-themes** apply mainly to Pillar 6; list one or more.
3. It then appears automatically on `/pillars` (with a live count) and is
   filterable at `/writing?pillar=<slug>` and `/writing?pillar=living-well-after-christendom&subTheme=<sub>`.

No database migration is needed: the resolver reads `pillar-assignments.ts` and
leaves the legacy `posts.pillar` values untouched (they still drive the legacy
track layer). `scripts/classify-pillars.mjs` regenerates a proposed mapping
(`scripts/pillar-mapping.md`) for review; correct calls in `pillar-assignments.ts`.

## Brand reference

- `CLAUDE.md` — voice, palette, typography, forbidden language
- `design-system.md` — visual token reference
- `client/src/index.css` — CSS token source of truth
