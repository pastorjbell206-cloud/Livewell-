# Full Audit Report — LiveWell by James Bell

**Date:** 2026-04-30
**Branch:** `claude/review-and-fix-website-INz0w`
**Base:** `main` (commit 0635af5)

---

## Summary

This audit addressed bugs, security vulnerabilities, repo hygiene, CI/CD gaps,
performance, and testing across the LiveWell codebase. Changes are organized by
phase below.

---

## Phase 0 — Inventory

- Created `docs/audit/INVENTORY.md` documenting the full stack, entry points,
  routing, auth flow, env vars, and duplicated logic between `api/index.ts`
  and `server/`.

## Phase 1 — Repo Hygiene

- Moved 19 stray markdown files from root to `docs/archive/`.
- Created `docs/README.md` (index), `docs/VOICE.md` (editorial voice stub).
- Created `docs/audit/PATCHES.md` documenting the wouter router patch.
- Added `.vercel` to `.gitignore`.
- Removed duplicate root-level `.mjs` scripts (identical copies exist in `scripts/`).

## Phase 2 — TypeScript Fixes

- **StickyNavigation.tsx**: Rewrote file — all closing tags were corrupted
  (`</Link>Link>` etc.), causing 34 TS errors and a broken component.
- **ProtectedRoute.tsx**: Fixed `isLoading` → `loading` (property name mismatch
  with `useAuth()` hook). Admin route protection was non-functional.
- **SEOMeta.tsx / seo.ts**: Added `"webpage"` to the type union — 4 pages
  used this value causing type errors.

## Phase 3 — Linting

- Added ESLint with `@typescript-eslint`, `eslint-plugin-react-hooks`,
  `eslint-config-prettier`.
- Created `eslint.config.js` (flat config).
- Added `pnpm lint` and `pnpm lint:fix` scripts.

## Phase 4 — Security

- **CORS**: Changed from wildcard `*` to explicit allowed origins with
  credentials support. Added `Vary: Origin` header.
- **Session bug**: `signSession()` was called with a TTL value instead of
  `Date.now() + TTL`, making admin sessions expire immediately after creation.
- **HSTS**: Added `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- **Error boundary**: Stack traces now hidden in production builds.
- **`.env.example`**: Fixed wrong DB protocol (`postgresql` → `mysql`), added
  all missing env vars (Stripe, Mailchimp, Forge).
- Created `SECURITY.md` vulnerability disclosure policy at repo root.
- Created `docs/audit/SECURITY.md` with findings and remaining risks.

## Phase 5 — Backend Cleanup

- Moved `dotenv` from dependencies to devDependencies (Vercel injects env vars).
- Removed unused `@radix-ui/react-alert-dialog` and
  `@radix-ui/react-navigation-menu` packages and their wrapper components.
- Removed duplicate root `.mjs` script (identical copy in `scripts/`).

## Phase 6 — Frontend Performance

- Code-split all page components with `React.lazy()` and `Suspense`:
  - 13 admin pages now lazy-loaded (zero impact on public bundle)
  - 18 secondary public pages lazy-loaded
  - Only Home, Writing, ArticleDetail, Books, BookDetail, About remain eager
    (core user journey)
- Added `<PageFallback>` loading spinner for lazy-loaded routes.

## Phase 8 — Testing

- Added `server/api-logic.test.ts` with 14 tests covering:
  - robots.txt generation (valid output, no syntax errors)
  - Quiz scoring logic (correct pillar selection, edge cases)
  - Session token signing and verification (valid, expired, tampered, wrong
    secret, malformed)
  - Email validation regex

## Phase 9 — CI/CD

- Added `.github/workflows/ci.yml`: typecheck → test → build on PR and push
  to main.
- Added `.github/dependabot.yml`: weekly npm + GitHub Actions updates.

---

## Deferred Items

These items require environment access, business decisions, or are lower
priority:

| Item | Reason Deferred |
|------|-----------------|
| Deduplicate `api/index.ts` vs `server/` | Risky refactor — needs testing with live DB and Vercel deployment |
| Separate `ADMIN_SEED_SECRET` from `JWT_SECRET` | Requires env var rotation in Vercel dashboard |
| Rate limiting on auth/subscribe endpoints | Needs upstash/ratelimit or similar; requires env config |
| Remove `express` from prod deps | Used for local dev; needs verification it's not needed on Vercel |
| Remove `axios` (consolidate to fetch) | Needs audit of all axios usage sites |
| Add CSP header | Requires careful tuning to not break inline styles/scripts |
| Drizzle schema validation vs live DB | Needs `DATABASE_URL` to run `drizzle-kit check` |
| Bundle size further reduction | Main chunk still ~478KB gzipped; mermaid/recharts are heavy |
| Branch protection on main | Settings change by repo owner (not code) |
| Enable Dependabot alerts + secret scanning | Settings change by repo owner |

---

## Production Runbook

### Rollback
1. Go to Vercel dashboard → Deployments
2. Find the last known-good deployment
3. Click "..." → "Promote to Production"

### Environment Variable Rotation
1. Generate new secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Update in Vercel dashboard → Settings → Environment Variables
3. Trigger redeployment

### Database
- Connection via `DATABASE_URL` (MySQL)
- Drizzle schema at `drizzle/schema.ts`
- Migrations: `pnpm db:push` (generates + applies)
- No automated backups configured — verify with hosting provider

---

## Scripts Reference

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Start local dev server with hot reload |
| `pnpm build` | Production build (Vite + esbuild) |
| `pnpm check` | TypeScript type checking |
| `pnpm lint` | ESLint checking |
| `pnpm test` | Run vitest test suite |
| `pnpm format` | Prettier formatting |
| `pnpm db:push` | Generate and apply DB migrations |
