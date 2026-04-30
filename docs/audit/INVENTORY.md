# Codebase Inventory

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, Wouter (routing), Tailwind CSS 4, shadcn/ui (Radix primitives) |
| Backend | Express, tRPC 11.6, Drizzle ORM 0.44, mysql2 |
| Deployment | Vercel serverless (`api/index.ts`) + static SPA |
| Package Manager | pnpm 10.4.1 |
| Node | LTS (no `engines` field specified) |

## Entry Points

| Entry Point | File | Notes |
|---|---|---|
| Client | `client/src/main.tsx` → `client/src/App.tsx` | 40+ routes via Wouter |
| Server (local dev) | `server/_core/index.ts` | Express static server |
| Serverless (Vercel) | `api/index.ts` | 746 lines — Express-based handler for `/api/*` |
| Database schema | `drizzle/schema.ts` | 20+ tables |
| Database schema (bundles) | `drizzle/bundles-schema.ts` | 4 tables |

## Routing

### Public Routes

| Path | Description |
|---|---|
| `/` | Home |
| `/writing` | Writing index |
| `/writing/:slug` | Individual article |
| `/books` | Books index |
| `/books/:slug` | Individual book |
| `/about` | About page |
| `/quiz` | Quiz |
| `/search` | Search |
| `/resources` | Resources |
| `/pillars` | Pillars |
| `/for-pastors` | For Pastors |
| `/for-leaders` | For Leaders |
| `/marriage` | Marriage |
| `/parenting` | Parenting |
| `/doubt` | Doubt |
| `/membership` | Membership |
| `/reading-paths` | Reading Paths |
| `/tools` | Tools |
| `/start` | Start |
| `/substack` | Substack |

### Admin Routes (protected)

`/admin`, `/admin/login`, `/admin/posts`, `/admin/resources`, `/admin/books`, `/admin/settings`, `/admin/sync`, `/admin/moderation`, `/admin/notifications`, `/admin/about`

### Redirects

| From | To |
|---|---|
| `/articles` | `/writing` |
| `/for-families` | `/parenting` |

## Auth Flow

- **Admin login**: Password-based — `POST /api/auth/login` with bcrypt comparison against `ADMIN_PASSWORD_HASH` env var.
- **Session**: HMAC-SHA256 signed cookie (7-day TTL, cookie name `app_session_id`).
- **tRPC authorization layers**: `publicProcedure`, `protectedProcedure` (requires `ctx.user`), `adminProcedure` (requires admin role).
- **OAuth**: Client-side redirect to `VITE_OAUTH_PORTAL_URL` (Manus-based), falls back to `/admin/login`.

## Database Access Pattern

There are **two parallel data-access paths**, both connecting via `DATABASE_URL`:

| Path | Method | Tables |
|---|---|---|
| `api/index.ts` | Raw SQL via mysql2 | articles, subscribers, rss_cache, pcn_signups |
| `server/db.ts` → `server/routers.ts` | Drizzle ORM | All 20+ tables |

This duplication is a known issue. Both paths serve overlapping content APIs.

## Environment Variables

### Server Runtime

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL connection string |
| `JWT_SECRET` | Token signing |
| `ADMIN_PASSWORD_HASH` | Admin password (bcrypt) |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `MAILCHIMP_API_KEY` | Mailchimp integration |
| `MAILCHIMP_LIST_ID` | Mailchimp list |
| `NODE_ENV` | Environment flag |
| `PORT` | Server port |
| `BUILT_IN_FORGE_API_URL` | Forge API endpoint |
| `BUILT_IN_FORGE_API_KEY` | Forge API key |

### Client Build-Time

| Variable | Purpose |
|---|---|
| `VITE_OAUTH_PORTAL_URL` | OAuth redirect target |
| `VITE_APP_ID` | Application identifier |
| `VITE_FRONTEND_FORGE_API_KEY` | Client-side Forge API key |
| `VITE_FRONTEND_FORGE_API_URL` | Client-side Forge API endpoint |

### Legacy (seed/migration `.mjs` scripts)

`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

## Duplicated Logic

| Area | Locations | Issue |
|---|---|---|
| Content APIs (articles, subscribe, auth) | `api/index.ts` and `server/routers.ts` + `server/db.ts` | Same endpoints implemented twice — raw SQL vs Drizzle ORM |
| Quiz logic | `api/index.ts` and `server/quiz-router.ts` | Duplicated handlers |

## Scripts (`package.json`)

| Script | Command |
|---|---|
| `dev` | `NODE_ENV=development tsx watch server/_core/index.ts` |
| `build` | `vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist` |
| `start` | `NODE_ENV=production node dist/index.js` |
| `check` | `tsc --noEmit` |
| `format` | `prettier --write .` |
| `test` | `vitest run` |
| `db:push` | `drizzle-kit generate && drizzle-kit migrate` |

## Root-Level Clutter

| Item | Count | Recommended Location |
|---|---|---|
| Seed/migration `.mjs` scripts | 37+ | `scripts/` |
| Markdown docs | 20+ | `docs/` |
| `patches/` directory | 1 patch | `wouter@3.7.1.patch` — adds `window.__WOUTER_ROUTES__` for runtime route discovery |
