# Site Audit — 2026-07 (current state)

> A fresh forensic pass run against `main` after the site-elevation program and
> the Next-Ten work, using the Opus 4.8 audit prompt. Read-only: no public code
> was changed to produce this. Method: four independent read-only reviewers
> (routes, brand tokens, accessibility, SEO/parity) plus the real local gates.
>
> This does **not** replace the deep dimension audits in `docs/audit/00–17`; it
> reconciles with them and reports what is **new or actionable now**. The live
> program roadmap is `NEXT-TEN.md`; the near-term fix list distilled from this
> pass is in `docs/roadmap.md`.

## Environment note (honest scope)

This audit ran in a network-isolated sandbox with **no live site and no
secrets**. So the evidence here is: the real local gates (below), plus direct
code/config inspection. It does **not** include live Lighthouse, a live axe
crawl, real-browser screenshots, or DNS verification — those need a deployed
URL and are marked *unverified (needs browser/deploy)* wherever they arise.

## Gate evidence (this session, actually run)

- `pnpm check` — **clean** (tsc --noEmit, 0 errors).
- `pnpm test` — **274 passed, 72 skipped, 0 failed** (89s). The ~260-route
  render-smoke net is green; money-path and helper contract tests pass.
- `pnpm build` — **exit 0**, built in ~11s.

## Headline findings

1. **No P0s, and no dead routes.** All 288 routes resolve; the 404 catch-all is
   wired; parity is clean (`KNOWN_PROD_GAPS` empty, 58 client procedures all
   prod-handled). The estate is in genuinely good shape — this is polish, not
   rescue.
2. **The single largest client asset is `content-data-*.js` at 2,715 kB
   (934 kB gzip)** — but verification showed it is a *lazy, admin-only* chunk
   (a dynamic import in `AdminDashboard` only); regular readers never load it, so
   it is **not** a public perf problem. Public content comes via tRPC.
3. **Three roadmap docs of different vintages exist** (`docs/roadmap.md` [stale,
   PR #102 era], `docs/audit/ROADMAP.md` [elevation era], `NEXT-TEN.md` [live]).
   Only one is current. Fixed here: `docs/roadmap.md` rewritten to point at the
   live program.
4. **Three findings were rejected on verification** (the pack's Stage-2 pass).
   Running the actual tools showed: the "dynamic-`SEOMeta` uncovered" P1 is
   already covered (`prerender-heads.mjs` → 0 uncovered); `/about` already has a
   `Person` schema; and the `content-data` chunk is lazy + admin-only, not a
   public perf issue. Verifying beat inferring — patching any of the three would
   have done harm. The findings below are the survivors.

## Findings by dimension

Severity: **P0** blocking · **P1** high-impact · **P2** polish. Confidence in
brackets. Owner-gated items marked ⛔.

### Routing & IA
- ~~P1~~ **RESOLVED (retired).** `/books-store` + `/resources-for-pastors` were
  live components 301-shadowed to `/books` / `/for-pastors`. The consolidation
  was intentional, so the two routes + lazy imports were removed from `App.tsx`
  and the orphaned component files deleted; the 301s stay. Nothing else imported
  them (verified).
- **P2** [hi] Dead SPA redirect components behind server 301s: `/articles`,
  `/for-families`, `/quiz`. The server redirect always wins.
- **P2** [hi] Duplicate `vercel.json` redirect object for
  `/writing/complicity-not-innocence` → `/justice` (~lines 81 & 221).
- **P2** [med] Competing onboarding: `/start` vs `/start-here` — two experiences,
  one intent. Confirm canonical (⛔ owner decision; also open in ELEVATION-SUMMARY).
- **P2** [med] **Three reading-path systems** (found while wiring depth metric #4):
  `/reading-paths/:slug` → `ReadingPathDetail` (topic-filtered tRPC posts);
  `/pathways/:slug` → `TopicPathway` (renders `public/pathways/*.json`,
  arbitrary `href` items); and `lib/readingPaths.ts` (a documented "single source
  of truth" — but **imported nowhere**, orphaned). Pick one canonical system and
  consolidate. This tangle is *why* the `path_step_complete` depth metric is not
  wired: there is no single, clean per-step "done" signal to emit from. ⛔ product
  decision.

### Performance
- ~~P1~~ **REJECTED on verification.** `content-data-*.js` (2,715 kB) looked
  like a broad-loaded monolith, but it is imported in exactly one place —
  `AdminDashboard.tsx:101`, via a **dynamic** `await import(...)`. Vite splits it
  into a lazy chunk fetched **only when an authenticated admin opens the
  dashboard**. There is **no static import** anywhere; public pages
  (`Writing.tsx`, `ArticleDetail.tsx`) load content via tRPC
  (`posts.listPublished` / `getBySlug`), not this bundle. So **regular readers
  never download it** — no refactor warranted. A split would only touch the
  admin path for no public gain.
- **P2** [low] Vite emits the >500 kB chunk-size warning on build, driven by the
  admin-only chunk. Cosmetic (a lazy chunk); silence via `chunkSizeWarningLimit`
  if the log noise bothers, or leave it.

### Brand fidelity (tokens)
Clean on the big risks: **no mustard-creep**, **no white page backgrounds**,
**fonts self-hosted** (no Google Fonts CDN). Token-drift concentrated in four files:
- **P1** [hi] `StartHereQuiz.tsx` — off-palette category hues as selected-option
  backgrounds + repeated `#FFF`/`#E0D9CC` instead of `var(--card)`/`var(--border)`
  (`:15-19,:234,:278-280,:361,:424`).
- **P1** [hi] `tools/QuoteLibrary.tsx` — hardcoded category accent colors, no
  token (`:45-47,:114,:117`).
- **P1** [med] `tools/FamilyDevotionBuilder.tsx` — `#FFFFFF` card backgrounds
  instead of `var(--card)` (`:998,:1057,:1103,:1143,:1250`).
- **P2** [hi] `ArticleCard.tsx:31` — Tailwind `bg-[#2D4A3E]` off-palette dark
  green (not a brand token).
- **P2** [low] `admin/primitives.tsx`, `GeneratedCover.tsx` — literal palettes in
  print/PDF/SVG-export primitives; contained, largely by-design.

### Accessibility & mobile
Shared shell is strong: single `<main>`, working skip link, global
`:focus-visible` ring, `prefers-reduced-motion` block, alt text throughout, 44px
tap targets, Escape-to-close, `aria-expanded` on disclosures. **No P0/P1.**
- **P2** [hi] Mobile drawer (`MinimalNav.tsx`): no focus trap, no move-focus-in on
  open / restore-on-close, missing `aria-controls` + panel `id`.
- **P2** [med] Full-screen search overlay: de-facto modal without
  `role="dialog"`/`aria-modal`, no focus trap/restore.
- **P2** [low] Admin drawer backdrop is a clickable `<div>` without role/keyboard
  (`AdminLayout.tsx:211`); admin-only.

### SEO & discoverability
- ~~P1~~ **RESOLVED (www confirmed).** Code canonicalizes to
  `www.livewellbyjamesbell.co` everywhere; CLAUDE.md wrote the bare apex.
  Verified against the Vercel project + `vercel.json:757` host redirect: the
  apex 301s to `www`, so `www` is canonical and the code is correct. CLAUDE.md
  aligned; no code change needed.
- **~~P1~~ → REJECTED on verification.** The reviewer read the *component*
  (dynamic template literal) and inferred "uncovered," but `prerender-heads.mjs`
  carries a curated `STATIC_PAGES` block that mirrors exactly these routes
  (`/nation` + all 10 `/nation/*` essays, `/justice`, `/disruption`, and their
  sub-hubs — lines 136–282). Running the script against `dist` reports **0
  uncovered routes** (162 heads extracted, 722 files written). No fix needed;
  patching the components would have created duplicate heads. Only genuinely
  uncovered surfaces are `:slug` param routes (doctrine/topic), which rely on
  client render + the DB-driven `/writing` prerender by design.
- **~~P2~~ → REJECTED on verification.** `/about` already carries an inline
  `Person` schema (name, url, jobTitle, worksFor, sameAs) *and* the prerender
  emits a `personSchema()` head for `/about`. The "missing" claim was wrong;
  enrichment is optional and must avoid fabricated fields.
- **P2** [med] ⛔ `generate-sitemap.mjs` ships a DB-less fallback (drops ~200
  essays) with only a log line if `DATABASE_URL` is absent at build. Confirm it's
  exposed to the Vercel build env.
- **P2** [low] OG *image* fallback (not a head gap): `prerender-heads.mjs`
  `LIBRARY_SOURCES` already emits real heads for `table`, `howtos`, `read`, and
  `studyguides`; they only fall back to the default OG *card* when no per-page
  PNG exists in `client/public/og/`. Minor — generate those PNGs if desired.
- **P2** [low] Hardcoded `www` `/about` URL in `comparisons/OrthodoxVsCatholic.tsx:106`
  and `CatholicVsProtestant.tsx:97` (drift risk if the host changes).

### Two-runtime parity
- **Clean.** `api-parity.test.ts` green, `KNOWN_PROD_GAPS` empty; the former
  `files.*` / `stripe.createCheckoutSession` / `teamCollab.*` gaps are closed.

### Doc / stack drift
- **P2** [low] CLAUDE.md lists **Framer Motion** in the stack, but it's **not
  imported anywhere in `client/src`**. Either it was removed and the doc lagged,
  or it was never adopted. Correct the doc.
- **P2** [low] Stale roadmap (`docs/roadmap.md`, PR #102 era) — rewritten here.

## What this pass did *not* change

No public-facing code. The fixes above are ready to execute as a Prompt-2 pass
once prioritized; none is on fire (no P0). Owner-gated items (⛔): the canonical
host decision, `/start` vs `/start-here`, and `DATABASE_URL` in the Vercel build.
