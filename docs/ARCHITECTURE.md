# LiveWell — System Architecture

> A senior engineer's map of the system as it actually exists today, not a
> from-scratch rebuild. Organized around the six things you'd hand a new
> engineer on day one: architecture, file structure, database, API, UI, and an
> honest production-readiness verdict.
>
> Current as of this branch (synced to `main`, 2026-06-22). The platform has
> grown a lot — ~190 routes, 32 tables — so treat the database schema and
> `taxonomy.ts` as the source of truth if this doc and the code ever disagree.

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
                          │  full tRPC router            │   server/routers.ts (+ ~13 sub-routers)
                          └──────────────┬──────────────┘
                                         │
        PROD runtime ───▶ ┌──────────────▼──────────────┐
        (Vercel)          │  ONE serverless function     │   api/index.ts (~2,040 lines)
                          │  self-contained, hand-rolled │   pooled MySQL (this branch)
                          │  procedure dispatch          │
                          └──────────────┬──────────────┘
                                         │  mysql2 pool
                          ┌──────────────▼──────────────┐
                          │  MySQL (Drizzle ORM)         │   28 tables + 4 bundle tables
                          └─────────────────────────────┘
```

**The single most important architectural fact:** there are two server
implementations of the same API.

- **Development** (`pnpm dev`) runs an Express server (`server/_core/index.ts`)
  that mounts the full tRPC router in `server/routers.ts` and ~13 sub-routers —
  search, community, email, recommendations, syndication, quiz, lead-magnets,
  Stripe, analytics, feed-sync, related-articles, sitemap, and team-collab.
- **Production on Vercel** runs a *single* serverless function, `api/index.ts`
  (~2,040 lines), which is deliberately **self-contained** ("no `../server/*`
  imports", per the file header). It re-implements each procedure by hand and
  talks directly to MySQL, returning the same superjson-wrapped envelope the
  tRPC client expects.

This keeps the Vercel cold-start small, but the two can **drift**: a procedure
added to `server/routers.ts` does not exist in production until it is also added
to `api/index.ts`. See §6 — this is now the top item.

**Stack**

| Layer | Choice |
|-------|--------|
| Language | TypeScript end to end |
| Front-end | React 18, Vite, `wouter`, TanStack Query, tRPC client |
| Styling | Tailwind CSS, Radix UI primitives (shadcn-style), Framer Motion, `recharts`; inline styles bound to CSS-variable design tokens |
| Server (dev) | Express + tsx watch, full tRPC router |
| Server (prod) | Vercel serverless function (`api/index.ts`) |
| Database | MySQL via Drizzle ORM + `mysql2` driver (pooled) |
| Auth | bcrypt password → HMAC-signed session cookie (`lw_session`) |
| Payments | Stripe (config-driven: live when keys + price ID are set) |
| Integrations | Mailchimp, AWS S3, RSS/Substack sync |
| Deploy | Vercel; `vercel.json` controls build, headers, redirects |

**Deployment pipeline** (`vercel.json`): the build runs
`sitemap → vite build → prerender` and also generates leadership manual PDFs.
The prerender step injects per-page `<head>` tags for SEO into the static
output. Non-asset/non-API routes rewrite to `index.html` (SPA); `/api/*`
rewrites to the serverless function; the apex domain 301-redirects to `www`.
Security headers (HSTS, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`) are global.

---

## 2. File structure

```
/
├── api/
│   └── index.ts          Vercel serverless entry — routes + procedures + pooled MySQL
├── client/
│   ├── src/
│   │   ├── App.tsx        route table (~190 routes), providers
│   │   ├── index.css      design tokens (:root CSS variables)
│   │   ├── pages/         ~180 page components (pillars, tools/, landing/, admin/)
│   │   ├── components/    shared UI (incl. shadcn-style primitives)
│   │   ├── contexts/ hooks/ data/
│   │   └── lib/
│   │       ├── taxonomy.ts          two-movement / six-pillar content taxonomy
│   │       ├── pillar-assignments.ts per-essay pillar map (generated)
│   │       └── trpc.ts              typed client
│   └── public/           content-as-data libraries + assets:
│       ├── leadership/ life/ creeds/ context/ history/ theology/
│       ├── justice/ nation/ disruption/ prophetic/ plans/ studyguides/
│       ├── books/ ebook/   and llms.txt (for answer engines)
├── server/               DEV runtime + business logic, fully typed
│   ├── _core/  routers.ts  routers/ (lead-magnets, stripe, team-collab)
│   ├── *-router.ts  *-service.ts  db*.ts   *.test.ts (broad coverage)
├── drizzle/
│   ├── schema.ts          28 tables (source of truth)
│   └── bundles-schema.ts  4 commerce/bundle tables
├── scripts/              ~75 scripts: content pipeline, index builders, validators, SEO, PDFs
├── docs/                 documentation (this file, audits, voice guide)
├── vercel.json  drizzle.config.ts  vite.config.ts  CLAUDE.md
```

---

## 3. Database schema

MySQL, modeled in `drizzle/schema.ts` (**28 tables**) plus `bundles-schema.ts`
(**4 tables**). Grouped by purpose:

**Content (the product)**
- `posts` — articles/essays (title, slug, body, excerpt, pillar, audience,
  format, difficulty, published/featured flags, timestamps). `pillar` ties into
  `taxonomy.ts`.
- `books`, `resources`, `reading_paths`, `reading_path_articles`,
  `featured_articles`, `related_articles`, `author_profiles`, `book_bundles`,
  `bundle_books`

**People & auth**
- `users` (role gates admin), `subscribers`

**Commerce**
- `book_purchases`, `email_campaigns`
- bundles schema: `product_bundles`, `bundle_items`, `bundle_purchases`,
  `bundle_access`

**Community**
- `comments`, `testimonials` (both moderated)

**Team collaboration** (newer — the PCN/leadership workspace)
- `teams`, `team_members`, `team_channels`, `team_posts`, `team_tasks`,
  `team_announcements`

**Operations**
- `files` (S3), `site_settings` (key/value config, incl. Stripe price ID),
  `notifications`, `admin_notifications`, `lead_magnet_signups`

Migrations via Drizzle Kit (`pnpm db:push`).

---

## 4. API endpoints

Two surfaces, both served by `api/index.ts` in production.

**Procedure calls** (tRPC-style, superjson-encoded — the SPA's data layer).
By volume of operations: `posts.*` (the largest surface), `books.*`,
`community.*` (comments + testimonials moderation), `settings.*`, `resources.*`,
`quiz.*`, `notifications.*`, `adminNotifications.*`, `auth.*`, `feedSync.*`,
`subscribers.subscribe`.

**Plain HTTP endpoints**

| Route | Purpose |
|-------|---------|
| `POST /api/auth/login` · `/me` · `/logout` | bcrypt password → session cookie |
| `GET /api/health` | DB ping + env presence |
| `GET /api/admin/status` | which env vars are configured + `adminReady` |
| `/api/admin/{db-inventory,organize-articles,fix-apostrophes,seed,seed-content}` | one-shot ops, gated by `JWT_SECRET` as an API key |
| `POST /api/checkout` | Stripe checkout session |
| `GET /api/download` | gated book/ebook delivery |
| `POST /api/contact` · `/api/subscribe` · `/api/pcn/signup` | forms, list, PCN |
| `GET /api/sitemap.xml` · `/api/robots.txt` | crawler surfaces |
| `GET /api/rss.xml` · `/feed` · `/api/rss/substack` | feeds |
| `GET /api/articles` | article data |

**Auth model.** Two mechanisms (by design): (1) **Session** for the `/admin`
UI — `bcrypt.compare` against `ADMIN_PASSWORD_HASH` issues an HMAC-SHA256 cookie
signed with `JWT_SECRET`; (2) **API key** — one-shot seed/admin endpoints accept
`JWT_SECRET` as a query param / `x-seed-key` header. CORS is locked to the
production domains.

---

## 5. UI architecture

~190 routes in `client/src/App.tsx` (~180 page components), grouped as:

- **The pillars / content** — route families per the taxonomy:
  `/theology/*` (history, creeds, doctrine, hermeneutics, traditions, compare,
  glossary, paths), `/justice/*`, `/disruption/*`, `/nation/*`, `/life/*`,
  `/leadership/*`, plus `/marriage`, `/parenting`, `/family/*`, `/doubt`. The
  writing surface is `/writing`, `/writing/:slug`, `/reading-paths`,
  `/article-collections`, `/authors/:slug`, `/studyguides`.
- **Leadership / PCN** (the deepest area) — sermon prep, illustrations,
  visitation, governance, budgets, decision log, whole-Bible sermon series,
  formation guides, the servant-leadership handbook, and a team workspace
  (`/leadership/team`).
- **Books & commerce** — `/books`, per-title funnels with gated `/thank-you`
  delivery (e.g. `/books/believe`, `/consider-the-birds`), `/book-bundles`,
  `/membership` (+ `/membership/success`).
- **Tools** (`/tools/*`) — ~18 interactive tools: verse finder, prayer
  generator, Bible study, marriage/financial/emotional assessments, sermon
  outline, scripture memory, conflict guide, pastor burnout, life audit, church
  health, deep-Bible companion, theology quiz, family devotions.
- **Conversion landing pages** — `/faith-crisis`, `/marriage-crisis`, `/grief`,
  `/parenting-help`, `/pastoral-burnout`, plus quizzes/`/start`.
- **Admin CMS** (`/admin/*`, behind `ProtectedRoute requireAdmin`) — ~22 routes:
  dashboard, posts/books/resources editors, settings, subscribers, content sync,
  publish-content, dedupe, Substack import, moderation, notifications.

**Content taxonomy** (`client/src/lib/taxonomy.ts`) — the spine of the content
IA: **two movements** (*Diagnosis* — "what was lost and why"; *Formation* —
"how to live well on the other side") over **six pillars** (Capture by the
Right, Capture by the Left, Reading Scripture Past Our Politics, After
Christendom, The Pastoral Angle, Living Well After Christendom). A legacy→V2 map
classifies older essays — the taxonomy is mid-migration.

**Content-as-data** — long-form libraries ship as JSON in `client/public/*`
(leadership formation, integrated life, creeds, context guides, church history,
study guides), with generated manifests (`scripts/build-*-index.mjs`) and CI
validators (`validate-formation`, `validate-life`) that gate the build.

**Design system** — tokens are CSS variables in `index.css`; components
reference them inline, so brand changes flow from `:root`. Cormorant Garamond +
Inter; cream/black with mustard as <8% punctuation. Contract in `CLAUDE.md`.

---

## 6. Production-readiness verdict

**Solid and shipping**
- Content delivery, SEO (sitemap + per-page prerendered `<head>` + RSS +
  `llms.txt` + OG images + PWA icons), global security headers, apex→www.
- Admin auth done properly: bcrypt + HMAC-signed `HttpOnly; Secure` cookie.
- Typed API end to end; broad Vitest coverage; content validators gate CI.
- A real content pipeline (`scripts/publish-*`, index builders, PDF generation).
- **Database connection pooling — fixed in this branch.** Previously the
  serverless function opened and destroyed a MySQL connection on every request;
  it now reuses a pool cached per warm instance. This was the prior #1 finding.

**Gaps to close**

1. **Two API implementations can drift (now the #1 item).** Production
   (`api/index.ts`, ~2,040 lines) re-derives the dev tRPC router by hand.
   Anything added to `server/routers.ts` must be mirrored into the serverless
   function or it won't exist in prod. Worth a parity test, or a shared module
   both runtimes import.
2. **`api/index.ts` is a 2,040-line single file.** It works, but its size is a
   maintainability risk; splitting it into modules (routes, procedures, db,
   auth) would help — ideally as part of resolving #1.
3. **Stripe is config-driven, not necessarily on.** Checkout/membership go live
   only when `STRIPE_SECRET_KEY` and the `stripeMembershipPriceId` setting both
   exist; otherwise the membership page falls back to a waitlist.
4. **Taxonomy migration is in flight.** `taxonomy.ts` runs a V2 six-pillar model
   with a legacy fallback map. Intentional, but worth finishing so the fallback
   can be retired.

**Bottom line:** a mature, content-heavy product — not an MVP scaffold.
Production-ready for content, commerce-ready pending Stripe keys. With pooling
handled, the next highest-value work is closing the dev/prod API drift.
