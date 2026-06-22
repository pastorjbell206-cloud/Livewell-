# Audit & Phase Status — LiveWell by James Bell

Final state of the world-class program (see `docs/WORLD-CLASS-BRIEF.md`). Each
phase is marked **Done**, **Closed (decision)**, or **User-gated**. Measurements
are real, taken from the build and lint output.

_Last updated: 2026-06-18._

---

## Scorecard

| Phase | State | Result |
|-------|-------|--------|
| 0 — Stabilize gates | **Done** | `pnpm check`, `pnpm build`, validate-life, validate-formation all green. |
| 1 — Audit fixes | **Done** (#202) | Dead `/pcn` link fixed; 47 `preserve-caught-error` cleared; cover 601K→217K. |
| 1b — set-state-in-effect | **Closed (decision)** (#206) | `useIsMobile` → `useSyncExternalStore`. Remaining ~43 intentionally deferred — see below. |
| 2 — SEO | **Done** (#203, +#201) | 45 pages self-canonicalize; Book/Offer/Breadcrumb JSON-LD on the product pages. |
| 3 — Accessibility | **Closed (audit)** | Baseline already strong — no fixes needed. Evidence below. |
| 4 — Performance | **Done** (#204, #205) | Main bundle **1,626 kB → 883 kB** (gzip 452 → 270 kB), ~40% lighter. |
| 5 — Content | **Done** (#207, #208, #209) | 4 SEO articles (2/book), Substack + Facebook pack, idempotent publish script. |

**Lint:** 98 → 50 errors (none in the CI gate). **CI:** green throughout.

---

## Prioritized residual list

### Critical
_None._ No broken builds, no dead static links (85 internal targets checked), no
console errors on load, no failing gates.

### Should-fix (your call — each is a real but non-urgent improvement)
1. **~43 remaining `react-hooks/set-state-in-effect` lint errors.** These are
   heterogeneous and mostly *acceptable* patterns the linter flags
   conservatively (close-menu-on-route-change in `MinimalNav`, sync-derived
   state in the admin `DashboardLayout`, content pages that set state on mount).
   They are **not** in the CI gate. Rewriting ~40 components risks real
   render/fetch regressions for a cosmetic count, so they should be fixed
   case-by-case where they cause an actual bug — not swept. `useIsMobile` (the
   one with a clean canonical fix and app-wide reach) is done.
2. **Deeper bundle splitting.** The 883 kB main chunk is now mostly React +
   framer-motion + tRPC + the core eager pages. Splitting framer-motion would
   shave more but touches many components — a careful, measured follow-up.

### Nice-to-have
1. **Responsive cover images.** Covers are 196–221 kB JPGs served at one size.
   Generating AVIF/WebP + width variants (sharp is already a dep) would cut image
   bytes further; not the LCP element on most routes, so low priority.
2. **`when-god-bless-america.jpg`** is already recompressed (601K→217K, #202).

---

## Accessibility evidence (why Phase 3 needed no fixes)

- Global `:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px }`.
- A real `.skip-link` (used in `Layout.tsx`).
- `prefers-reduced-motion` handled in `index.css` and `brand-override.css`.
- `<html lang="en">`.
- **100% image alt coverage** (0 `<img>` without `alt`).
- A contrast-safe `--mustard-text:#7A6010` for labels; the bright
  `--mustard:#D4A017` is decorative only (the `.eyebrow` label uses the dark
  token, the accent line uses the bright one). **Watch item:** never put body
  text in bright `--mustard` on cream — it fails AA. Audit any new component for
  this.
- Nav icon controls carry `aria-label` + `aria-hidden` on the icons.

---

## User-gated (only you can unblock — not engineering work)

1. **Go live (PR #201).** The two book product pages + Stripe checkout + gated
   download are built, CI-green, and verified on preview with a 4242 test card.
   Live requires the 3 **production** Stripe env vars (`STRIPE_SECRET_KEY` +
   the two `STRIPE_PRICE_*` ids). There is no tool to write Vercel env from here,
   so this needs a Vercel token or the dashboard. The buy button degrades to an
   "email us" fallback if the env is absent, so it never hard-errors.
2. **Surface the articles.** The 4 SEO articles are in the repo and publish with
   one idempotent command — `DATABASE_URL=… node scripts/publish-livewell-articles.mjs`
   — or your normal content seed. They appear on `/writing` after that.

---

## Definition-of-done check (vs the brief's targets)

- CI green (typecheck + validators + build): **yes.**
- SEO: canonical on every page, Book/Article/Breadcrumb/Org/WebSite JSON-LD
  wired, sitemap coverage of static + DB content: **yes** (book product pages
  land with #201).
- Accessibility baseline (focus, skip-link, alt, lang, reduced-motion,
  contrast-safe tokens): **yes.**
- Performance: main bundle cut ~40%; markdown renderer off the critical path;
  fonts preconnected with `display: swap`: **yes.**
- Voice: every shipped public word passes the `CLAUDE.md` kill-list; content
  drawn from his own manuscripts, nothing invented: **yes.**
- Payments verified end-to-end on preview; live only after confirmation: **yes**
  (live still gated on env, by design).

The remaining open items are decisions and credentials, not unfinished
engineering.
