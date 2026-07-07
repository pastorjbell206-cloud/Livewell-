# The Admin Console

The admin (`/admin/*`) is the operating cockpit for LiveWell: one place to see
the truth of the platform (traffic, audience, revenue, catalog), publish and
sell, manage content, and run maintenance safely. It is intentionally a light
workspace (`.admin-scope`) and never dark-mode.

## Architecture

| Piece | Where |
|---|---|
| Section registry (the sidebar's source of truth) | `client/src/components/admin/nav.ts` |
| Shell (sidebar, breadcrumbs, mobile drawer) | `client/src/components/AdminLayout.tsx` |
| Shared primitives (StatTile, Panel, SectionHeader, notes) | `client/src/components/admin/primitives.tsx` |
| Pages | `client/src/pages/Admin*.tsx`, `client/src/pages/admin/*` |
| Routes (all wrapped in `ProtectedRoute requireAdmin`) | `client/src/App.tsx` |
| Admin API (production) | `api/index.ts` — `/api/admin/*` REST handlers, gated by `authed()` (x-seed-key) or `authedSession()` (session cookie) |

Key admin endpoints: `/api/admin/metrics` (audience/sales/catalog),
`/api/admin/analytics` (traffic: views, visitors, daily, top pages, referrers),
`/api/admin/commerce-status` (per-ebook checkout truth),
`/api/admin/create-stripe-prices` (idempotent "turn on checkout"),
`/api/admin/contact-messages`, `/api/track` (the public page-view beacon).

## Adding a new admin section (the whole pattern)

1. Create the page in `client/src/pages/AdminYourThing.tsx`, composed from the
   primitives (`SectionHeader`, `Panel`, `StatTile`, `LoadingNote`, `ErrorNote`,
   `EmptyNote`) so it is consistent by construction.
2. Register it: one entry in the right group in
   `client/src/components/admin/nav.ts` (icon from lucide).
3. Route it: one `<Route path="/admin/your-thing"><ProtectedRoute
   component={AdminYourThing} requireAdmin /></Route>` in `client/src/App.tsx`
   (plus its lazy import).
4. If it needs data, add a `/api/admin/your-thing` handler in `api/index.ts`
   gated by `authed(req) || authedSession(req)`; create any new table lazily
   with `CREATE TABLE IF NOT EXISTS` (see `page_views`), never a migration that
   can drop data. tRPC procedures must exist in BOTH runtimes
   (`server/routers.ts` + `api/index.ts`) or `api-parity.test.ts` fails —
   REST `/api/admin/*` handlers live in prod only and sidestep parity.

Rules every screen keeps: real loading/empty/error states (no infinite
spinners, no silent failures); wrap-friendly layouts that cannot overlap at any
width (`flex-wrap` + `minWidth: 0`); destructive actions confirmed and honest
about what they did; no invented metrics — measure it or don't show it.

## Seams left for the future (labeled, not stubbed)

- Reading-depth analytics (essays finished, returning readers) — needs a
  client reading-progress beacon; the Traffic section notes it.
- Role-based access — auth is a single admin today (`ADMIN_PASSWORD_HASH`);
  `authedSession()` is the one gate to extend.
- Scheduled publishing — posts have `publishedAt`; a cron + a "publish at"
  field on the editor is the seam.
