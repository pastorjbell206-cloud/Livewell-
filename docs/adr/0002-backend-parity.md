# 0002 — Backend Parity Matrix: `api/index.ts` vs `server/` (tRPC)

- Status: Informational (companion to ADR 0001)
- Date: 2026-06-03
- Related: ADR 0001 (Backend Architecture Decision — recommends Option B: make `server/` tRPC canonical)

## Purpose

ADR 0001 recommends consolidating onto the `server/` tRPC app router and retiring the
hand-rolled `api/index.ts` serverless dispatcher. Before any cutover, whoever performs
the migration needs to know **exactly** which procedures each backend implements, so no
endpoint is silently dropped. This document is that endpoint-by-endpoint parity matrix.

> How this was produced: the procedure lists were derived programmatically from the
> source on `main`. `server/routers.ts` plus the mounted sub-router files were parsed for
> `name: publicProcedure | protectedProcedure | adminProcedure` definitions; `api/index.ts`
> was parsed for its `case '<procedure>':` dispatch labels. Counts and names below reflect
> that parse and should be re-verified against the code at migration time.

## Summary

| Backend | Procedures handled |
| --- | --- |
| `server/` tRPC (canonical) | ~82 |
| `api/index.ts` (serverless) | ~48 dispatch cases |

**Key finding:** the tRPC server is effectively a *superset*. `api/index.ts` implements a
subset focused on the admin CMS + public reads, and is missing ~38 procedures — including
whole feature areas (search, recommendations, analytics, files, lead magnets, Stripe,
email). The live frontend already calls tRPC batch URLs (`/api/trpc/...`), confirming
tRPC is the real surface. This strongly supports Option B.

## Procedures in `server/` tRPC but MISSING from `api/index.ts`

These would break (or are already served only by tRPC) if `api/index.ts` were the sole backend:

### Whole feature areas absent from `api/index.ts`
- `search.global`, `search.articles`, `search.resources`, `search.trending`
- `recommendations.getRecommendations`, `recommendations.getTrending`, `recommendations.getEditorsPicks`
- `relatedArticles.getRelated`
- `analytics.trackView`, `analytics.trackConversion`, `analytics.getMetrics`, `analytics.getTrending`, `analytics.getConversionFunnel`, `analytics.getReferrals`
- `files.list`, `files.get`, `files.upload`, `files.updateDescription`, `files.delete`
- `leadMagnets.signup`, `leadMagnets.getStats`
- `stripe.createCheckoutSession`, `stripe.getProductPrices`, `stripe.validateCheckout`
- `email.subscribe`, `email.unsubscribe`

### Partial gaps within shared feature areas
- `books.getBySlug` (api has list/CRUD but not getBySlug)
- `posts.listForIndex`
- `notifications.getBanners`, `notifications.list` (api has listAll/create/delete only)
- `subscribers.list`, `subscribers.remove` (api has subscribe only)
- `sync.feeds`
- `community.comments.submit`, `community.comments.getByPost`
- `community.testimonials.submit`, `community.testimonials.getApproved`, `community.testimonials.getFeatured`

## Procedures/labels in `api/index.ts` but NOT in `server/` tRPC

These are aliases, not true gaps:
- `bySlug` — legacy alias for `posts.getBySlug`
- `subscribe` (bare) — legacy alias for `subscribers.subscribe` / `email.subscribe`

No `api/index.ts` capability is genuinely missing from tRPC.

## Auth / security notes for the cutover

- `api/index.ts` performs its own session check and (after PR #106) uses
  `crypto.timingSafeEqual` for the session signature compare. The tRPC server enforces
  auth via `protectedProcedure` / `adminProcedure` middleware. Confirm the tRPC context
  applies the same admin gating to every `[admin]` procedure listed in ADR 0001 before
  retiring `api/index.ts`.
- Verify cookie/session issuance is identical (name, flags, signing secret) so existing
  logged-in sessions survive the cutover.

## Recommended cutover checklist (for the executor)

1. Stand up `server/` tRPC as the deployed handler (Option B in ADR 0001).
2. Smoke-test every procedure in the "missing from api" list above against the new handler.
3. Repoint `/api/trpc/*` (and the legacy `bySlug`/`subscribe` aliases) to tRPC; add thin
   alias shims if any client still calls the bare names.
4. Re-run the live network capture on `www.livewellbyjamesbell.co` and confirm all
   `/api/trpc/...` batch calls return 200 with expected shapes.
5. Remove `api/index.ts` only after a full preview-deploy verification.

## Caveat

Procedure counts/names here are a static-parse snapshot of `main`. Treat them as a guide,
not a contract; re-derive and diff against the live tree immediately before migrating.
