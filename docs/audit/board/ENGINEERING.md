# Audit Findings — LiveWell by James Bell

## 1. Performance

**HIGH — `client/src/pages/AdminDashboard.tsx:6`.** A top-level `import contentData from "@/data/content-data.json"` statically bundles a 2.34 MB JSON file (802 KB gzip) into the `/admin` route chunk (confirmed in `dist/`: `AdminDashboard-*.js` = 2.3 MB raw), even though the data is only read inside a click handler (lines 89, 97, 422). *Fix:* replace the static import with a dynamic `import("@/data/content-data.json")` inside the handler so it loads only on click.

**MEDIUM — `client/src/pages/Books.tsx:127-682` (22 images) and 68 of 78 `<img>` tags site-wide.** No `loading="lazy"` anywhere in the codebase; the Books grid eagerly fetches every book cover regardless of scroll position. *Fix:* add `loading="lazy"` to below-the-fold images; leave hero/LCP images eager.

**NICE-TO-HAVE — `vite.config.ts:112-121`.** VitePWA's workbox config still runtime-caches `fonts.googleapis.com`/`fonts.gstatic.com`, which is unreachable dead config now that fonts are self-hosted (`index.css` `@font-face`) and the CSP's `font-src 'self'` (`vercel.json`) blocks Google Fonts outright. *Fix:* delete the rule.

Checked clean: route-splitting is essentially complete (every route is `React.lazy` except the eagerly-imported `Home`, the correct call for a landing page); `vendor-react`/`vendor-ui` manual chunking is sound; `QueryClient` defaults (`retry:1`, 5 min `staleTime`, no refetch-on-focus, `main.tsx:18-26`) are deliberate and reasonable; no remote/CDN images found — all same-origin.

## 2. Accessibility (WCAG 2.1 AA)

**HIGH — `client/src/pages/ReadingPaths.tsx`, `ReadingPathDetail.tsx`.** Neither imports `Layout`, `MinimalNav`, or `Footer` — both render with zero site chrome and no `<main>` landmark; a visitor has no way to navigate elsewhere except the browser back button. *Fix:* wrap both in `Layout`.

**HIGH — `client/src/components/ShoppingCart.tsx:65-69,88-90,107-119,121-126` and `BookPreview.tsx:33-38`.** Icon-only buttons (cart toggle, close, quantity +/-, remove, modal close) with no `aria-label` and no text — a screen reader announces each as bare "button," on an actual purchase flow. *Fix:* add `aria-label` to each (e.g. "Close cart," "Remove item").

**MEDIUM — `Home.tsx`, `Marriage.tsx`, `Parenting.tsx`, `StartHereDiagnostic.tsx` (the `/start` route), `TheologyQuiz.tsx`.** All bypass `Layout.tsx`, so none render its skip-to-content link; `Marriage`/`Parenting`/`StartHereDiagnostic`/`TheologyQuiz` additionally have zero `<main>` element (`Home.tsx:111` at least added its own `<main id="main">`, still no skip link). *Fix:* route through `Layout`, or replicate its skip-link + `<main id="main">` pattern.

**MEDIUM — `components/CommandPalette.tsx`, `BookPreview.tsx`, `ShoppingCart.tsx` slide-out panel.** None of the three custom overlays set `role="dialog"`/`aria-modal`, trap focus, or move focus on open (`CommandPalette` composes bare `cmdk` `Command.Input`/`Command.List` rather than its accessible `Command.Dialog` wrapper). *Fix:* add dialog semantics + focus management, or reuse the existing `components/ui/dialog.tsx` Radix primitive instead of hand-rolling.

**LOW — `components/AdminLayout.tsx:278`.** `<main>` has no `id="main"` and the admin area has no skip link (`AdminLogin.tsx` has no `<main>` at all). *Fix:* add the id and a matching skip link.

Checked clean: alt text is solid (78/78 `<img>` have `alt`; the 3 empty-`alt` cases are correctly decorative hero backgrounds); the 12 spot-checked pages (Home, Writing, Books, About, Start, Pastors, ToolsHub, VerseFinder, MarriageAssessment, BibleStudy, ArticleDetail, NotFound) each have exactly one `<h1>` in correct heading order (`StartHereDiagnostic`'s two `<h1>`s are mutually-exclusive by render state, not a violation); form labeling (`WorkWithJames.tsx`, `SegmentedSignup.tsx`, `AdminLogin.tsx`) is properly wired via `htmlFor`/`id` or `aria-label`; a global `:focus-visible` style exists (`index.css:143`).

## 3. Architecture

**HIGH — `pnpm lint` (`eslint . --max-warnings 0`) is absent from `.github/workflows/ci.yml`** and currently fails with **60 errors / 517 warnings**, so real bugs ship undetected — e.g. `client/src/pages/FamilyCatechism.tsx:55` defines `QuestionCard` as a component *nested inside* `FamilyCatechism`'s own render body (used at line 115), forcing every catechism card to fully remount instead of reconcile on each render; four empty `catch {}` blocks in `api/index.ts:383,407,472,512` silently swallow row-insert errors. *Fix:* add `pnpm lint` to CI; hoist `QuestionCard` (and similarly-flagged nested components) to module scope.

**MEDIUM — hand-rolled `localStorage` bypassing the mandated `lib/storage.ts` helper** on "long instrument" pages CLAUDE.md explicitly names this pattern for: `pages/life/WholeLifeAssessment.tsx:199,215,272,297,838-839` (no helper import at all), `pages/leadership/FormationInventory.tsx`, `pages/tools/FamilyDevotionBuilder.tsx`, and `pages/tools/PastorBurnout.tsx:486,500,803` (imports and correctly uses `readStoredJSON`/`writeStoredJSON` for one key, still hand-rolls a second in the same file). Loses shape guards and the standard "Couldn't save to this browser" failure UX. *Fix:* route all through `readStoredJSON`/`writeStoredJSON`.

**MEDIUM — `client/src/pages/ArticleDetail.tsx:61-63,186-188,269-270`** reimplements clipboard-copy three separate times, calling `navigator.clipboard.writeText` directly with no fallback, instead of the shared `copyToClipboard` helper in `lib/clipboard.ts` (which has a textarea/`execCommand` fallback). Same bypass recurs in `CitationCopy.tsx`, `EmailResults.tsx`, `ToolActions.tsx`, and two more tool pages. *Fix:* switch all call sites to `copyToClipboard`.

**LOW — `client/src/App.tsx:697`.** A single global `ErrorBoundary` wraps the entire app, so an uncaught error on any one route blanks nav + footer + everything, not just that page's content. *Fix:* add a boundary around `<Router />`'s `<Switch>` so failures stay local.

**NICE-TO-HAVE — three dead page components**, never imported by `App.tsx`'s route table: `pages/Doubt.tsx`, `pages/StartHereQuiz.tsx`, `pages/ResourcesForPastors.tsx` (each superseded by a redirect to a newer page). *Fix:* delete the three files.

**NICE-TO-HAVE — `pages/NotFound.tsx` and `components/ShoppingCart.tsx`** use hardcoded Tailwind slate/blue/red/gray/white utility classes instead of the site's `:root` tokens, breaking the token-discipline rule CLAUDE.md sets for every other component (this is a token-wiring gap, not a proposed design change). *Fix:* swap the utility classes for the existing CSS-variable tokens.

## 4. Security

**HIGH — near-total CSRF gap on the authenticated write surface.** `trpcHandler`/`trpcBatchHandler` (`api/index.ts:1496-1512,2601-2609`) parse `input` from the query string on a plain GET exactly like a POST body, and none of the mutation cases (`posts.update`/`delete`, `books.update`/`delete`, `notifications.delete`, `community.comments.approve`/`delete`) or the `/api/admin/*` one-shot endpoints (`seed-all`, `refresh-articles`, `publish-all-resources`, `create-stripe-prices`, `fix-apostrophes`) re-check `req.method`; auth is the SameSite=Lax `lw_session` cookie alone, no CSRF token. `client/src/pages/AdminDashboard.tsx:439` already calls `/api/admin/organize-articles` via bare `fetch()` with no method (i.e. GET), proving this is live, not theoretical — a link clicked by the logged-in admin silently triggers whatever it points to. *Fix:* require POST (401/405 otherwise) for every mutating case, enforced once at the top of `processProc`/`trpcBatchHandler`/`trpcHandler`.

**MEDIUM — unescaped JSON-LD injection, `client/src/components/SEOMeta.tsx:104`.** `dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}` never escapes `</script>`, and `getArticleSchema` (lines 150-173) embeds the full article body; a literal `</script>` in any title/body/excerpt would close the tag early and inject markup, which the CSP's `script-src 'self' 'unsafe-inline'` (`vercel.json`) would then execute with no nonce/hash gate. Requires trusted-author content or a compromised admin account (prod has no live external feed ingestion), hence medium not high. *Fix:* escape `<` as `\u003c` before injecting.

**MEDIUM — Stripe webhook has no signature verification, `api/index.ts:3119-3145`.** It trusts the POSTed `event.type`/session id and only re-derives trust by re-fetching the session from Stripe's API — a real, self-documented mitigation, but not Stripe's mandated pattern — leaving a replay/cost-exhaustion surface for anyone holding a real `session_id` (exposed in the thank-you page URL itself). *Fix:* verify `Stripe-Signature` via `stripe.webhooks.constructEvent` before processing.

**LOW — non-constant-time session signature check, `api/index.ts:2321-2322`.** `verifySession` uses `sig !== expected`, while the codebase already has and uses a `constantTimeEqual` helper (line 78, applied in `authed()` at line 96) for exactly this purpose — just not here. *Fix:* use `constantTimeEqual(sig, expected)`.

**NICE-TO-HAVE — in-memory rate limiting, `api/index.ts:106`.** Login/subscribe/contact limiting is a `Map` scoped to one warm serverless instance; already self-documented as a known gap. *Fix:* move to a durable cross-instance store (Redis/Upstash) per the existing roadmap note.

Verified clean: SQL access is parameterized throughout, including the dynamic-column `UPDATE` builders (column names only ever come from fixed whitelists, never user input); every mutating endpoint *is* authenticated (the gap above is CSRF, not missing auth); CORS is an explicit allow-list, not a wildcard; the one hardcoded `pk_live_...` key found (`pages/WhenGodBlessAmerica.tsx:32`) is a Stripe *publishable* key, correctly public by design, not a leaked secret; no `.env` ever committed.

---

## Single highest-priority fix overall

**Security #1 — the CSRF / missing-method-enforcement gap.** It's the broadest finding in the whole audit (spans nearly every write endpoint), the most directly exploitable (one clicked link, no content-injection precondition), and threatens the thing CLAUDE.md calls the actual product — the content database, plus live Stripe price creation — yet it closes in one place: a single shared method guard at the top of `processProc`/`trpcHandler`/`trpcBatchHandler` and the `/api/admin/*` dispatcher in `api/index.ts`.
