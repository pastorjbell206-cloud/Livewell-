# Final QA Report — Launch Gate (Prompt 14)

> 2026-07-15, run against `main` after the parallel-merge wave (~30 PRs, 362
> files, ~12k insertions since the 93e0680 audit baseline). Method: five
> fresh-context reviewers with non-overlapping scopes + the full local gate
> suite; every finding verified against the code or a tool run before any fix.
> Environment: network-isolated sandbox, **no live browser** — browser-only
> checks are labeled unverified, never claimed.

## Outcome

**No P0s. Launch-gate clean after fixes.** Two verified P1 classes were found
and addressed this pass; the P2 punch list is recorded below. Every gate is
green on the final tree.

## Commands run and outcomes (this session, actually watched)

| Gate | Result |
|---|---|
| `pnpm check` (tsc, both runtimes) | clean |
| `pnpm test` (server + client + ~260-route smoke net) | **288 passed / 0 failed** (72 skipped) |
| `pnpm build` (vite + esbuild) | exit 0 |
| `npx vitest run server/api-parity.test.ts` | 2/2 passed; `KNOWN_PROD_GAPS` empty |
| `node scripts/prerender-heads.mjs` | 1,063 per-route heads written, **0 uncovered** |
| `node scripts/generate-sitemap.mjs` | all new families present (208 wisdom, 49 read, map/explorer/pillars); known `DATABASE_URL` build-env caveat |

## Reviewer verdicts (scope → result)

1. **Brand/design tokens** → clean on all four hard invariants (no mustard
   misuse, no white page backgrounds, no font-family literals, no fonts CDN).
   Two token bypasses found and **fixed**: `BookRecommendations` `#E5E7EB`
   divider → `var(--border)`; `Membership` error `#9B1C1C` → `var(--alert)`.
2. **Editorial voice / UX dead-ends** → clean. Zero forbidden words/phrases in
   rendered UI copy across the 123 changed pages; CTAs accurate; no dead ends.
   Admin-only "Done!" status exclamations **fixed** to periods.
3. **Accessibility (code-level)** → the substantive list. Fixed this pass:
   - `BookPreview` modal (live on BookDetail): **Escape-to-close + focus
     move-in/restore added** (house CommandPalette pattern). Full Tab-trap
     remains unverified (needs browser).
   - `WhichLens` review screen + `RuleOfLife` practice picker: selection state
     was invisible to screen readers → **`aria-pressed` added** (+ decorative
     check glyph `aria-hidden`).
   - `BookReader`: mobile chapter menu **`aria-controls` + `aria-current`**,
     "Link copied" **`aria-live`**. `BookLibrary`: pillar chips
     **`aria-pressed`**, result count **`role="status"`**.
   - **Rejected on verification:** the "ShoppingCart drawer" P1 — the component
     is dead code (only the lucide *icon* of that name is used anywhere); noted
     for future removal, not fixed.
4. **SEO + two-runtime parity** → clean. Parity ratchet green; prerender covers
   every static route incl. the 208 new wisdom pages and `/read` books; sitemap
   carries all new families; zero non-www/`.com` host strings in the diff.
5. **Code correctness / security** → solid. Error observability well built +
   tested (caps, dedupe, truncation, no PII by design, no stored XSS);
   takedown endpoints authenticated in both runtimes; secrets hygiene clean
   (and improved — `SEED_KEY` now fails closed). One **P1 fixed as doc**:
   emergency unpublish left the prerendered full-text HTML live until the next
   deploy and the runbook didn't require one — `docs/recovery-runbook.md` now
   makes the redeploy step mandatory and explains why.

## Fixed this pass (all verified: check clean, build exit 0, suite green)

- 2 brand-token bypasses; 3 admin exclamations (commit `414188f`)
- `essay_book_click` added to the measurement event table (docs, `8b52a3f`)
- 4 a11y P1-class fixes + 6 flagship-surface P2 attributes (this commit)
- Recovery-runbook takedown amendment (this commit)

## Recorded P2 punch list (not fixed — small, non-blocking)

- **A11y attributes** on older tools (the a11y review's full list): Likert
  buttons missing `aria-pressed` (6 assessment tools), category progress dots
  missing `aria-current` (5 tools), filter chips missing `aria-pressed`
  (5 tools), "Copied" status swaps without live regions (~8 sites), FAQ
  accordion glyphs not `aria-hidden` (2 landing pages), `ScriptureMemory`
  textarea labeled by placeholder only. Reference implementations to copy:
  `CommandPalette`, `WisdomFinder`, `FamilyDevotionBuilder`.
- **MinimalNav search overlay**: works (Escape, labels) but lacks
  `role="dialog"` + focus trap — browser-verify before changing the global nav.
- **Dead component**: `components/ShoppingCart.tsx` unreferenced; remove or
  wire deliberately.
- **Sitemap vs TAKEN_DOWN**: taken-down static slugs stay listed (URL 404s);
  extract the blocklist to a shared file both consume.
- **Error-log growth**: `client_errors` has no retention purge; in-memory rate
  limit resets per serverless instance.
- **REST endpoints outside the parity net**: `/api/track`, `/api/admin/errors`,
  `/api/checkout` are prod-only by design and invisible to
  `api-parity.test.ts` (it walks tRPC call sites only) — add a comment there.
- Admin panels (`AdminCommentsPanel`, `AdminTestimonialsPanel`) inline raw hex
  instead of `admin/primitives` palette (sanctioned `.admin-scope`, low).

## Unverified (needs a live browser — not claimed)

Focus order and SR announcements for the fixed dialogs; contrast on rendered
pages; mobile layout at real widths; Lighthouse/axe scores; the annual Stripe
checkout path end-to-end (do one real test purchase).

## Deployment checklist (owner)

1. Merge the launch-gate PR; Vercel deploys `main`.
2. Confirm `DATABASE_URL` is exposed to the Vercel **build** (sitemap + DB
   prerender heads degrade silently without it).
3. Stripe: `stripeMembershipPriceId` (+ optional annual) in Admin → Site
   Settings; one live annual test purchase.
4. After any future emergency unpublish: **redeploy** (now in the runbook).
5. Post-deploy smoke: `/`, `/writing/:slug`, `/read/:slug`, `/wisdom/:id`,
   `/membership`, one pathway walk, one book purchase page.
