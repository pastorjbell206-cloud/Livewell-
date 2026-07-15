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

## P2 punch list — status after the follow-up pass

Closed in the post-gate P2 pass:
- ☑ **A11y attribute batch** on the older tools (Likert `aria-pressed` across
  6 assessments, category-dot `aria-current` across 5, filter-chip
  `aria-pressed` across 5, "Copied" live regions, FAQ glyphs `aria-hidden`,
  `ScriptureMemory` textarea label, `LandingSignup`/`LifeIndex` status roles).
  Attribute-only; zero behavior change.
- ☑ **Dead component removed**: `components/ShoppingCart.tsx` (verified
  unreferenced — only the lucide icon of that name is used anywhere).
- ☑ **Sitemap honors TAKEN_DOWN**: `generate-sitemap.mjs` now parses the
  blocklist declaration fail-soft (verified against empty + populated forms)
  and excludes those slugs; a shape-guard comment sits on the declaration.
- ☑ **Parity-net scope note** added to `api-parity.test.ts` (REST endpoints
  are outside its tRPC-walking net, some deliberately prod-only).

Still open (browser- or owner-dependent):
- **MinimalNav search overlay**: works (Escape, labels) but lacks
  `role="dialog"` + focus trap — browser-verify before changing the global nav.
- **Error-log growth**: `client_errors` has no retention purge; in-memory rate
  limit resets per serverless instance.
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
