# Site Brief — LiveWell by James Bell

> The one-page orientation the prompt pack calls for. Durable facts only, each
> verified against the repo or the live Vercel project. Deeper sources:
> `CLAUDE.md` (voice/palette/engineering contract), `docs/ARCHITECTURE.md`
> (system map), `docs/EDITORIAL-CONSTITUTION.md` (editorial mission),
> `docs/site-audit.md` + `docs/roadmap.md` (current state and plan).

## Mission

The digital home of James Bell — Lead Pastor of First Baptist Church of Fenton
(Michigan), founder of the Pastors Connection Network, author of 21 books; came
to faith from atheism, raised without a father, raising five sons. Tagline:
**"Connecting the depth of theology to the weight of everyday life."** Depth is
the product; reach is downstream of depth, never the reverse.

## Audiences (in order of weight)

1. **Skeptics** — the hardest case, the one Bell writes toward.
2. **Christians** carrying real questions the church avoids.
3. **Pastors** — the strategic distribution channel (PCN).
4. **People seeking to live well** — marriage, parenting, vocation.

When audiences conflict, the skeptic wins the tie.

## Priority reader outcomes

Understand what the site is within seconds → find a guided place to begin
(diagnostic, tracks, pathways) → read long-form without friction → subscribe
(Substack is the newsletter channel) → discover the books → trust the platform
because nothing on it lies.

## Canonical domain

**`https://www.livewellbyjamesbell.co`** — the `www` subdomain. The bare apex
301s to it (verified in `vercel.json` + the Vercel project). All code emits
`www` canonicals (`client/src/lib/site.ts` `SITE_URL`, sitemap, robots,
`llms.txt`). The `.com` in older briefs is incorrect.

## Authoritative routes (the spine, not the full ~288-route table)

| Purpose | Route |
|---|---|
| Home | `/` |
| Onboarding | `/start` (quiz), `/start-here` (diagnostic), `/diagnostic` |
| The taxonomy | `/pillars` (six pillars under two movements) |
| Essays | `/writing`, `/writing/:slug` |
| Guided sequences | `/reading-paths/*` and `/pathways/*` — **two intentional, distinct features**, both in the canonical nav |
| Books | `/books`, `/books/:slug`, ~24 title landing pages, `/read/:slug` (read online) |
| Skeptics | `/skeptic-track`, `/doubt`, `/answers` |
| Pastors | `/for-pastors`, `/leadership/*`, `/pastors-resource-wall` |
| Membership | `/membership` (config-driven Stripe checkout; waitlist fallback) |
| About / trust | `/about`, `/work-with-james`, legal (`/privacy`, `/terms`, `/accessibility`) |

Full inventory: `docs/route-inventory.md`. 404 catch-all wired; zero dead routes
as of the 2026-07 audit.

## Design principles (compact brand lock)

Palette: cream `#F5F0E6` is the room; black/charcoal `#1A1A1A` for dark
sections; **mustard `#D4A017` is punctuation, never a background** (<8% of any
viewport); white for cards/inputs only, never a page background. Type:
Cormorant Garamond (display, weight over boldness) + Inter (body) + JetBrains
Mono (data), all self-hosted. Every brand value lives in `:root` of
`client/src/index.css`; components reference tokens, never hardcoded hex. Feel:
unhurried, weighted, grown-up — a serious book in a quiet room. No gradient
blobs, glassmorphism, bento grids, carousels, or decorative animation.

## Voice (compact)

Prophetic and pastoral at once; self-implicating; verdicts, not summaries;
endings that leave weight. Forbidden-language list and punctuation mechanics in
`CLAUDE.md` — zero tolerance. Exclamation points only inside verbatim quoted
Scripture. Never fabricate a quote, date, scholar, study, or statistic.

## Content sources (where the words actually live)

- **DB (MySQL via Drizzle)** — essays (`posts`), books, reading paths; mirrored
  in `client/src/data/content-data.json` (admin tooling only — lazy,
  admin-gated chunk; readers get content via tRPC).
- **Content-as-data JSON libraries** in `client/public/*` (leadership,
  context, creeds, history, life, table, how-tos, studyguides, pathways, books)
  with generated manifests and CI validators.
- **Filing an essay** = one line in `client/src/lib/pillar-assignments.ts`.

## Technical stack (as built — do not migrate)

TypeScript; React 19 + Vite 7 SPA, wouter, TanStack Query + tRPC v11,
Tailwind v4 + Radix primitives; Drizzle ORM + mysql2 (MySQL); Vercel; pnpm@10.
**Two runtimes for one API**: dev = `server/*` (full tRPC), prod = the
self-contained `api/index.ts`. Every client-called procedure must exist in
both — `server/api-parity.test.ts` is the ratchet. Gates on every PR:
`pnpm check`, content validators, `pnpm test` (incl. the ~260-route smoke
net), `pnpm build`.

## Measurement (depth, not vanity)

Four custom events flow to Vercel Web Analytics (the owner dashboard):
`essay_read_complete`, `return_reader`, `essay_book_click`,
`path_step_complete`. Emitted via `client/src/lib/telemetry.ts` — best-effort,
no PII, no cookie.

## Unresolved questions (owner-gated)

- Stripe activation: set `stripeMembershipPriceId` (and optionally the annual
  price id) in Admin → Site Settings; do one live annual test purchase.
- `/start` vs `/start-here`: two onboarding experiences, one intent — canonical
  choice still open.
- `DATABASE_URL` in the Vercel **build** env (sitemap + DB prerender heads
  silently degrade without it).
- Founder photography for the `Figure` slots; Mailchimp email tracks (deferred
  by owner); browser-verified P2s (mobile-drawer focus trap,
  FamilyDevotionBuilder dark-mode cards).
