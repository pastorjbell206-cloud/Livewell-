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

## Brand reference

- `CLAUDE.md` — voice, palette, typography, forbidden language
- `design-system.md` — visual token reference
- `client/src/index.css` — CSS token source of truth
