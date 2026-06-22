# LiveWell — System Architecture

> A senior-engineer's map of the system as it actually exists today, not a
> from-scratch rebuild. Organized around the six things you'd hand a new
> engineer on day one: architecture, file structure, database, API, UI, and an
> honest production-readiness verdict.

---

## 1. System architecture

LiveWell is a TypeScript monorepo: a React single-page app on the front, a
MySQL database on the back, and **two different server runtimes** depending on
where it runs.

```
                          ┌─────────────────────────────┐
   Browser  ──────────▶   │  React SPA (Vite build)      │
                          │  wouter routing              │
                          │  TanStack Query + tRPC client│
                          └──────────────┬──────────────┘
                                         │  HTTP (superjson-encoded)
                          ┌──────────────▼──────────────┐
        DEV runtime  ───▶ │  Express server              │   server/_core/index.ts
                          │  full tRPC router            │   server/routers.ts (+ sub-routers)
                          └──────────────┬──────────────┘
                                         │
        PROD runtime ───▶ ┌──────────────▼──────────────┐
        (Vercel)          │  ONE serverless function     │   api/index.ts
                          │  self-contained, hand-rolled │   (no server/* imports)
                          │  procedure dispatch          │
                          └──────────────┬──────────────┘
                                         │  mysql2
                          ┌──────────────▼──────────────┐
                          │  MySQL (Drizzle ORM)         │   drizzle/schema.ts — 21 tables
                          └─────────────────────────────┘
```

**The single most important architectural fact:** there are two server
implementations of the same API.

- **Development** (`pnpm dev`) runs an Express server (`server/_core/index.ts`)
  that mounts the full tRPC router in `server/routers.ts` and its many
  sub-routers — search, community, email sequences, recommendations,
  syndication, quizzes, lead magnets, Stripe, analytics, feed-sync, sitemap.
- **Production on Vercel** runs a *single* serverless function, `api/index.ts`,
  which is deliberately **self-contained** ("no `../server/*` imports", per the
  file header). It re-implements each procedure by hand in a big `switch`
  statement and talks directly to MySQL via `mysql2`, returning the same
  superjson-wrapped envelope the tRPC client expects.

This keeps the Vercel cold-start small and dependency-free, but it means the dev
router and the prod function can **drift**: a procedure added to
`server/routers.ts` does not exist in production until it is also added to the
`api/index.ts` switch. See §6.

**Stack**

| Layer | Choice |
|-------|--------|
| Language | TypeScript end to end |
| Front-end | React 18, Vite, `wouter` (routing), TanStack Query, tRPC client |
| Styling | Tailwind CSS, Radix UI primitives (shadcn-style), Framer Motion, inline styles bound to CSS-variable design tokens |
| Server (dev) | Express + tsx watch, full tRPC router |
| Server (prod) | Vercel serverless function (`api/index.ts`) |
| Database | MySQL via Drizzle ORM + `mysql2` driver |
| Auth | bcrypt password → HMAC-signed session cookie (`lw_session`) |
| Integrations | Stripe (pending), Mailchimp, AWS S3, RSS/Substack sync |
| Deploy | Vercel (SPA + serverless), `vercel.json` controls build, headers, redirects |

**Deployment pipeline** (`vercel.json`): the build runs
`sitemap → vite build → prerender` (the prerender step injects per-page `<head>`
tags for SEO into the static output). All non-asset, non-API routes rewrite to
`index.html` (SPA), `/api/*` rewrites to the serverless function, and the apex
domain 301-redirects to `www`. Security headers (HSTS, `X-Frame-Options`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) are set
globally.

---

## 2. File structure

```
/
├── api/                  Vercel serverless entry (production API)
│   └── index.ts          self-contained handler: routes + procedures + MySQL
├── client/
│   └── src/
│       ├── App.tsx        route table (~78 routes), providers
│       ├── main.tsx       React entry
│       ├── index.css      design tokens (:root CSS variables)
│       ├── pages/         one file per route (public, tools/, landing/, admin/)
│       ├── components/    shared UI (incl. shadcn-style primitives)
│       ├── contexts/      React context providers
│       ├── hooks/         custom hooks
│       ├── lib/           tRPC client, utilities
│       └── data/          static data
├── server/               DEV runtime + business logic, fully typed
│   ├── _core/            Express bootstrap, env, vite middleware
│   ├── routers.ts        root tRPC router
│   ├── routers/          feature routers (lead-magnets, stripe, …)
│   ├── *-router.ts       search, community, email, recommendation, syndication…
│   ├── *-service.ts      stripe, search, analytics, rss services
│   ├── db*.ts            data-access helpers
│   └── *.test.ts         Vitest suites (broad coverage)
├── drizzle/
│   ├── schema.ts         21 tables (source of truth for the DB)
│   └── bundles-schema.ts 4 commerce/bundle tables
├── shared/               types shared between client and server
├── scripts/              content pipeline (publish docx/md, seed, sitemap, prerender)
├── content/              source manuscripts / content assets
├── docs/                 documentation (this file, audits, voice guide)
├── vercel.json           build, rewrites, redirects, security headers
├── drizzle.config.ts     Drizzle Kit config (migrations)
├── vite.config.ts        client build config
└── CLAUDE.md             brand, voice, palette — the source of truth for design
```

---

## 3. Database schema

MySQL, modeled in `drizzle/schema.ts` (21 tables) plus `bundles-schema.ts`
(4 tables). Grouped by purpose:

**Content (the product)**
- `posts` — articles/essays. Columns: `id, title, slug, body, excerpt, pillar,
  readTime, coverImage, published, featured, contentType, audience_type, topic,
  format, audience, difficulty, readingTimeMinutes, publishedAt, createdAt,
  updatedAt`. The `pillar` column is the canonical six-pillar taxonomy.
- `books` — `id, title, slug, author, description, coverImage, purchaseUrl,
  sampleExcerpt, bookType, sortOrder, published, …`
- `resources`, `reading_paths`, `reading_path_articles`, `featured_articles`,
  `related_articles`, `author_profiles`, `book_bundles`, `bundle_books`

**People & auth**
- `users` — `id, openId, name, email, loginMethod, role, …` (role gates admin)
- `subscribers` — newsletter list

**Commerce**
- `book_purchases`, `email_campaigns`
- bundles schema: `product_bundles`, `bundle_items`, `bundle_purchases`,
  `bundle_access`

**Community**
- `comments`, `testimonials` (both moderated — see the admin moderation panel)

**Operations**
- `files` (S3-backed), `site_settings` (key/value config), `notifications`,
  `admin_notifications`, `lead_magnet_signups`

Migrations are managed by Drizzle Kit (`pnpm db:push` →
`drizzle-kit generate && migrate`).

---

## 4. API endpoints

The API has two surfaces, both served by `api/index.ts` in production.

**Procedure calls** (tRPC-style, superjson-encoded — the SPA's data layer):

| Domain | Procedures |
|--------|-----------|
| Content | `posts.listPublished/listAll/getById/getBySlug/getFeatured/create/update/delete`, `books.*`, `resources.*` |
| Config | `settings.get/getAll/set/setMultiple` |
| Audience | `subscribers.subscribe`, `quiz.getQuestions/getRecommendations` |
| Community | `community.testimonials.listAll/approve/delete/toggleFeatured`, `community.comments.listAll/approve/delete` |
| Notifications | `notifications.listAll/create/delete`, `adminNotifications.list/unread/markAsRead` |
| Auth | `auth.me`, `auth.logout` |
| Syndication | `feedSync.getStatus/syncAll/syncSource` |

**Plain HTTP endpoints**:

| Route | Purpose |
|-------|---------|
| `POST /api/auth/login` | bcrypt password → session cookie |
| `GET /api/auth/me`, `/api/auth/logout` | session |
| `GET /api/health` | DB ping + env presence |
| `GET /api/admin/status` | reports which env vars are configured + `adminReady` |
| `GET /api/rss.xml`, `/feed`, `/api/rss/substack` | RSS / Substack feed |
| `POST /api/contact` | contact form → DB (and email) |
| `POST /api/subscribe`, `/api/pcn/signup` | list + PCN signups |
| `GET /api/sitemap.xml` | sitemap |
| `/api/admin/seed*`, `/organize-articles`, `/db-inventory` | one-shot ops, gated by `JWT_SECRET` as an API key |

**Auth model.** Two distinct mechanisms (by design):
1. **Session** — `/admin` UI. `bcrypt.compare(password, ADMIN_PASSWORD_HASH)`
   issues an HMAC-SHA256 cookie (`lw_session`) signed with `JWT_SECRET`,
   7-day TTL, `HttpOnly; Secure; SameSite=Lax`.
2. **API key** — one-shot seed/admin endpoints accept `JWT_SECRET` as a query
   param / `x-seed-key` header.

CORS is locked to the production domains (plus localhost in dev).

---

## 5. UI architecture

~78 client routes in `client/src/App.tsx`, in five groups:

- **Marketing / brand** — `/`, `/about`, `/membership`, `/work-with-james`,
  `/for-pastors`, `/for-leaders`, `/pastors`.
- **Pillars (content taxonomy)** — `/pillars`, `/marriage`, `/parenting`,
  `/doubt`, and the writing surface: `/writing`, `/writing/:slug`,
  `/reading-paths`, `/reading-paths/:slug`, `/article-collections`,
  `/authors/:slug`.
- **Books & commerce** — `/books`, `/books/:slug`, `/book-bundles`,
  `/books-store`, `/library`.
- **Interactive tools** (`/tools/*`) — 15+ tools: verse finder, prayer
  generator, Bible study, marriage assessment, financial/emotional health,
  parenting guide, sermon outline, scripture memory, conflict guide, pastor
  burnout, life audit, church health, deep-Bible companion, saved items.
- **Conversion landing pages** — `/faith-crisis`, `/marriage-crisis`,
  `/grief`, `/parenting-help`, `/pastoral-burnout`, plus quizzes
  (`/start`, `/quiz`, `/skeptic-track`).
- **Admin CMS** (`/admin/*`, all behind `ProtectedRoute requireAdmin`) —
  dashboard, posts/books/resources editors, about, settings, content sync,
  moderation, notifications.

**Design system.** Tokens live as CSS variables in `client/src/index.css`;
every component references them via inline styles, so brand changes flow from
`:root`. Typography is Cormorant Garamond (display) + Inter (body); the palette
is cream/black with mustard as <8%-of-viewport punctuation. The full contract is
in `CLAUDE.md` and `design-system.md`. UI primitives are Radix-based
(shadcn-style) under `client/src/components`.

---

## 6. Production-readiness verdict

The prompt asks for something that "could scale to millions of users." Here is
the honest read.

**Solid and shipping**
- Content delivery, SEO (sitemap + per-page prerendered `<head>` + RSS),
  global security headers, apex→www redirect.
- Admin auth is done properly: bcrypt + HMAC-signed `HttpOnly; Secure` cookie,
  not a plaintext token.
- The API is typed end to end; there is broad Vitest coverage
  (`server/*.test.ts`).
- A real content pipeline exists (`scripts/publish-*`) — docx/markdown in,
  database rows out.

**Gaps to close before "millions"**

1. **No database connection pooling (the real scaling ceiling).** In production,
   `api/index.ts`'s `withConn()` opens a fresh `mysql.createConnection()` and
   calls `.end()` on **every request**. Serverless + one-connection-per-request
   exhausts the database's connection limit under load. To scale, put a pooler
   in front of MySQL (e.g. PlanetScale / a serverless-friendly pool) or reuse a
   warm connection across invocations. This is the first thing that breaks at
   volume.
2. **Two API implementations can drift.** Production (`api/index.ts`) re-derives
   the dev tRPC router by hand. Anything added to `server/routers.ts` must be
   mirrored into the serverless switch or it simply won't exist in prod. Worth a
   test that asserts parity, or a shared module both runtimes import.
3. **Stripe is not live.** `STRIPE_SECRET_KEY` is unset; `stripe-service.ts`
   falls back to `sk_test_placeholder`. The commerce tables, bundles, and
   checkout UI exist, but no real payment will process until the key is set
   (and a webhook secret wired up).
4. **Mailchimp falls back to placeholders** when its keys are unset — newsletter
   sync is inert until configured.
5. **Env scoping inconsistency.** `ADMIN_PASSWORD_HASH` is scoped to Production
   *and* Preview, but `JWT_SECRET` and `DATABASE_URL` are Production-only — so
   admin login on Preview deploys would accept the password then fail to sign a
   session (and has no DB). Either drop the hash from Preview or add the other
   two.

**Bottom line:** this is a mature, real product — not an MVP scaffold. It is
production-ready for content and admin today. The work between here and
"millions of users" is connection pooling first, then closing the dev/prod API
drift, then turning on Stripe.
