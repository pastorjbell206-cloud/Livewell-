# Audit 1.3 — Accessibility (WCAG 2.1 AA)

**Date:** 2026-07-01 · **Build:** pre-built `dist/public` served via `vite preview` (port 4174)
**Method:** live axe-core sweep (tags `wcag2a, wcag2aa, wcag21a, wcag21aa`) on 12 routes; keyboard-only walkthrough of the two flagship tools; grep-based code review; computed WCAG contrast math for every token pair in play.
**Limitation:** the static preview has no API. `/tools/theology-quiz` renders its loading state only (`loading: true`, 9 buttons, no `<main>`), so its interactive flow could not be exercised. Everything else rendered fully.

---

## 1. Summary by severity

| Severity | Count | Findings |
|---|---|---|
| Critical | 0 | — |
| High | 3 | H1 mustard text on light backgrounds (axe: 14 nodes / 4 pages, 2.09–2.38:1); H2 focus ring fails non-text contrast on light backgrounds (2.09:1); H3 assessment answer state not programmatically exposed (no `aria-pressed`) |
| Medium | 3 | M1 no status announcement / focus management on section change and score reveal; M2 seven pages (incl. Home and the crisis pillars Doubt/Marriage/Parenting) bypass Layout — no `<main>`, no skip link; M3 `transition: all` fades the focus ring in over 200 ms |
| Low | 3 | L1 no `<header>`/banner landmark; L2 email inputs labelled by `aria-label` + placeholder only; L3 quiz loading state has no `role="status"`/`aria-busy` |

**What already passes (verified, not assumed):** 60/60 `<img>` tags carry `alt` (multiline-parsed, whole `client/src`); zero `onClick` on `div`/`span` in the ten biggest tool files (single-line and multiline checks); skip link exists, is visible on focus, and works (`Layout.tsx:9-11`, `index.css:114-115`) on the 200 pages that use Layout; `prefers-reduced-motion` is honored globally (`index.css:120`, `brand-override.css:48-52`) — and despite CLAUDE.md listing Framer Motion in the stack, **zero files import it**, so the CSS kill-switch actually covers all motion; `SegmentedSignup` uses `role="radiogroup"` + real `<label>`-wrapped radios (`SegmentedSignup.tsx:211-271`); `MinimalNav` has correct `aria-expanded` / `aria-haspopup` / `role="menu|menuitem"` / icon `aria-hidden` (`MinimalNav.tsx:349-755`); one `<h1>` per page, sane heading order; all dark-section cream/rgba text passes (see §5); `ink-muted` passes on every light surface; mustard-background CTAs use dark text (`var(--ink)` ×27, `var(--charcoal)` ×15 sampled — 7.93:1 / 7.33:1, pass).

---

## 2. Live axe sweep — 12 routes

One rule fired across the whole sweep: **`color-contrast` (serious)**, 14 failing nodes on 4 pages. No critical, moderate, or minor violations under the WCAG A/AA tags.

| Route | Result | Detail |
|---|---|---|
| `/` | CLEAN | — |
| `/writing` | CLEAN | — |
| `/babylon` | CLEAN | — |
| `/books` | CLEAN | — |
| `/about` | CLEAN | — |
| `/start-here` | CLEAN | — |
| `/tools` | **color-contrast, serious ×11** | "Use Tool →" card links — `#D4A017` on `#FFFFFF`, **2.37:1** (needs 4.5:1), 13px/600. Source: `client/src/pages/ToolsHub.tsx:256` (`color: var(--gold)` on white cards). Selectors: `a[href$="theology-quiz"] > div`, `a[href$="assessment"]:nth-child(4) > div`, `a[href$="wisdom"] > div`, `a[href$="rule-of-life"] > div`, `a[href$="proverbs-31"] > div`, `a[href$="passage"] > div`, `a[href$="family-devotions"] > div`, `a[href$="marriage-assessment"] > div`, +3 more |
| `/tools/theology-quiz` | CLEAN | loading state only (no API) — see Limitation |
| `/tools/life-audit` | **color-contrast, serious ×1** | "PART 1 OF …" eyebrow — `#D4A017` on `#F5F0E6`, **2.09:1**, 11px/700. `client/src/pages/tools/LifeAudit.tsx:677` (`color: var(--mustard)`). Selector `.wrap > div:nth-child(1) > div` |
| `/tools/pastor-burnout` | **color-contrast, serious ×1** | same pattern, **2.09:1** — `client/src/pages/tools/PastorBurnout.tsx:682` |
| `/tools/marriage-assessment` | **color-contrast, serious ×1** | same pattern, **2.09:1** — `client/src/pages/tools/MarriageAssessment.tsx:496` |
| `/leadership` | CLEAN | — |

**Totals: 0 critical / 14 serious / 0 moderate / 0 minor.** All 14 are the same root cause: raw `--mustard`/`--gold` (#D4A017) used as *text* color on light surfaces. The token system already contains the accessible variants (`--mustard-text: #7A6010`, `--goldlt: #7A6010` — `client/src/index.css:31-43`); these spots bypass them. The `.eyebrow` class itself gets it right (`index.css:370` uses `var(--mustard-text)`) — the failing eyebrows are hand-rolled inline copies that don't.

---

## 3. Keyboard walkthrough

Run on `/tools/life-audit` (fully rendered) and `/tools/theology-quiz` (loading state only). Script: 80-stop Tab sequence recording focused element + computed `outline`/`boxShadow`, then a keyboard-only completion attempt.

**Passes.** First Tab lands on "Skip to content"; Enter jumps to `#main` and the next Tab enters page content. All 45 recorded stops are real `<a>`/`<button>` elements — no focus traps, no unreachable controls, no positive `tabindex`. A keyboard-only user can answer questions (3 answered via Enter, counter reached "3 of 24 answered"), reach "Next Section", and advance. Section-jump buttons ("Go to Spiritual Health" …) are reachable buttons.

**Failures.**

1. **Focus ring appears 200 ms late on rating buttons.** At the moment of focus, computed outline is `0px solid rgb(90,84,72)`; 350 ms later it is `2px solid rgb(212,160,23)`. Cause confirmed by live CSS-rule probe: the buttons' inline `transition: "0.2s"` (= `transition: all`) animates `outline-width` from 0 → 2px, so the `:focus-visible` ring *fades in* on every stop (`LifeAudit.tsx` rating-button style: `transition: 0.2s`). Under rapid tabbing the ring is effectively invisible. (Mitigated for reduced-motion users by the global kill-switch.)
2. **Focus is lost on section change.** After Enter on "Next Section", the new section renders (`h2: Marriage & Relationships`) but `document.activeElement` is `BODY`. A keyboard user restarts from the top of the page (through ~15 nav stops) for each of the 8 sections.
3. **Answer state is visual-only.** Selected rating buttons expose no state: `aria-pressed: null`, `role: null`, parent `role: null`. A screen-reader user cannot tell which answer is chosen (SC 4.1.2 name/role/value; also SC 1.3.1).
4. **No status announcements.** The only live region on the page is sonner's toast container (`SECTION[aria-live="polite"]`, from `<Toaster />` at `client/src/App.tsx:565`). The "N of 24 answered" counter, section changes, and the score reveal (`showResults`, `LifeAudit.tsx:885`) are silent to assistive tech (SC 4.1.3 Status Messages).
5. **Home page has no skip link and no `<main>`.** Landmarks on `/`: `NAV, FOOTER` only; `skipLink: false`; the quiz page likewise has `hasMain: false`. See M2.

Focus-ring styling elsewhere is present and instant: nav buttons show `2px solid rgb(212,160,23)` with 4px offset the moment they focus (global `:focus-visible` — `index.css:114` and `brand-override.css:42-46` with `!important`). The ring's *color* is the problem (§5).

---

## 4. Code review findings

- **Landmarks.** `client/src/components/Layout.tsx:9-11` renders the skip link + `<main id="main">`; 200 files use Layout. **Seven pages compose `MinimalNav` + `Footer` directly and ship no `<main>`, no skip link:** `client/src/pages/Home.tsx`, `Doubt.tsx`, `Parenting.tsx`, `Marriage.tsx`, `TheologyQuiz.tsx`, `StartHereDiagnostic.tsx`, `StartHereQuiz.tsx`. Zero `<main>` tags exist anywhere in `client/src/pages`. Three of the seven are crisis-facing pillar pages (Doubt, Marriage, Parenting) — exactly where an AT user should not have to hunt for content. No `<header>` element exists anywhere (`MinimalNav` renders a bare `<nav>`, `MinimalNav.tsx:369`); Footer is a proper `<footer>` (`Footer.tsx:19`).
- **aria-live.** Zero `aria-live` attributes in source. The only `role="status"`/`role="alert"` are in shadcn primitives (`ui/spinner.tsx:8`, `ui/alert.tsx:30`, `ui/field.tsx:221`) that the assessment tools do not use. Score reveals and progress counters in LifeAudit / PastorBurnout / MarriageAssessment / ChurchHealth are unannounced — confirmed live (§3.4).
- **Form labels.** `NewsletterSignup.tsx:87-93, 134-140, 209-215`: email inputs have `aria-label="Email address"` + placeholder — passes 4.1.2/3.3.2 minimally, but no visible label (placeholder disappears on input). `SegmentedSignup.tsx:213-283`: `role="radiogroup"` with `aria-label="Who are you?"`, options as `<label>`-wrapped real radio inputs, email input `aria-label` — good.
- **Reduced motion.** `index.css:120` and `brand-override.css:48-52` both zero animation/transition durations under `prefers-reduced-motion: reduce`. Effective in practice because motion here is all CSS: **framer-motion has zero imports in `client/src`** (and is absent from `package.json`), contra the CLAUDE.md stack description. No `useReducedMotion`/`MotionConfig` needed.
- **onClick on non-interactive elements.** 0 occurrences of `onClick` on `div`/`span` in the ten biggest tool files (DeepBibleCompanion 1905 ln, BibleReference 1692, PastorBurnout 1681, TheologyGlossary 1646, LifeAudit 1467, ConflictGuide 1461, ChurchHealth 1451, MarriageAssessment 1198, FinancialHealth 1163, SermonOutline 1087) — verified with a multiline regex across `client/src/pages/tools/`.
- **Alt text.** 60 `<img>` tags in `client/src`, 60 with an `alt` attribute (multiline parse of every `.tsx`). Sampled values are descriptive (book covers, author photo).
- **Focus-ring definition duplicated.** `index.css:114` (`2px var(--gold)`, offset 2px, unlayered) and `brand-override.css:42-46` (`2px var(--mustard) !important`, offset 4px) both target `:focus-visible`; the `!important` copy wins. Any fix must land in `brand-override.css:42` or consolidate the two.

---

## 5. Contrast mathematics (computed, WCAG 2.1 relative luminance)

AA thresholds: 4.5:1 normal text · 3:1 large text (≥24px / ≥18.7px bold) and non-text UI (SC 1.4.11).

| Pair | Ratio | Normal | Large/UI | Usage |
|---|---|---|---|---|
| ink `#14110C` on cream `#F5F0E6` | 16.58:1 | PASS | PASS | body text everywhere |
| ink-muted `#5A5448` on cream `#F5F0E6` | 6.61:1 | PASS | PASS | secondary text, metadata |
| ink-muted on cream-warm `#EDE8DC` | 6.14:1 | PASS | PASS | alt sections |
| ink-muted on white `#FFFFFF` | 7.51:1 | PASS | PASS | cards |
| **mustard `#D4A017` on cream `#F5F0E6`** | **2.09:1** | **FAIL** | **FAIL** | inline eyebrows/labels: `LifeAudit.tsx:677`, `PastorBurnout.tsx:682`, `MarriageAssessment.tsx:496`; part of ~656 inline `color: var(--mustard)`/`var(--gold)` uses (e.g. `Framework.tsx:63,70,102-103`, `BibleAndHomosexuality.tsx:40`, `plans/CarePlan.tsx:99`) — each on a light surface fails |
| **mustard on cream-warm `#EDE8DC`** | **1.94:1** | **FAIL** | **FAIL** | same pattern on alt sections |
| **mustard on white `#FFFFFF`** | **2.38:1** | **FAIL** | **FAIL** | "Use Tool →" on white cards, `ToolsHub.tsx:256` (axe ×11) |
| **mustard focus ring on cream/white** | **2.09 / 2.38:1** | — | **FAIL (SC 1.4.11)** | global `:focus-visible`, `brand-override.css:42`, `index.css:114` |
| mustard on dark `#1A1A1A` | 7.33:1 | PASS | PASS | dark-section accents — fine |
| mustard on ink `#14110C` | 7.93:1 | PASS | PASS | — |
| cream on dark `#1A1A1A` | 15.32:1 | PASS | PASS | dark sections |
| `rgba(245,240,230,.78)` on `#1A1A1A` | 9.70:1 | PASS | PASS | dark-section body text |
| `rgba(245,240,230,.72)` on `#1A1A1A` | 8.43:1 | PASS | PASS | e.g. `pages/table/Table.tsx:92`, `resources/ContextGuide.tsx:91`, `prophetic/PropheticPosture.tsx:62`, `PropheticLament.tsx:72`, `leadership/ProfileSurvey.tsx:151,183`, `LeadershipArticle.tsx:87`, `LeaderAssessment.tsx:100`, `history/HistoryEssay.tsx:71` |
| `rgba(245,240,230,.6)` / `.5` on `#1A1A1A` | 6.20 / 4.74:1 | PASS | PASS | muted dark-section text — safe down to 0.5 alpha |
| white on mustard `#D4A017` | 2.38:1 | FAIL | FAIL | **not found in use** — sampled mustard-bg CTAs use `var(--ink)` (7.93:1) or `var(--charcoal)` (7.33:1); keep it that way |
| **Fix targets** | | | | |
| `--mustard-text` `#7A6010` on cream / white | 5.27 / 5.99:1 | PASS | PASS | the correct substitute, already in `index.css:33` |
| dark-mode `--mustard-text` `#E0B945` on `#1A1A1A` | 9.28:1 | PASS | PASS | dark theme already flips it (`index.css:82`) |
| `--mustard-deep` `#B08A12` on cream | 2.85:1 | FAIL | FAIL | **not** a valid substitute |

Verdict: every failure on the site is one color doing one job it cannot do — raw mustard as text or focus ring on light surfaces. The palette already contains the passing variant, theme-aware, one token away.

---

## 6. Ranked fix list

| # | Sev | Finding (WCAG) | Exact fix | Effort |
|---|---|---|---|---|
| H1 | High | Mustard text on light backgrounds, 14 axe nodes on 4 pages (SC 1.4.3) | Swap `var(--gold)` → `var(--goldlt)` at `ToolsHub.tsx:256`; `var(--mustard)` → `var(--mustard-text)` at `LifeAudit.tsx:677`, `PastorBurnout.tsx:682`, `MarriageAssessment.tsx:496`. Both tokens are theme-aware, so dark mode stays correct | 15 min for the axe-confirmed 4; then a judged sweep of the ~656 inline `color: var(--mustard\|--gold)` uses (many sit on dark surfaces and pass) — 2–4 h |
| H2 | High | Global focus ring `2px var(--mustard)` = 2.09–2.38:1 on cream/white (SC 1.4.11 needs 3:1) | In `brand-override.css:42-46` (the `!important` winner) change to a two-tone ring, e.g. `outline: 2px solid var(--ink); box-shadow: 0 0 0 4px var(--bone);` — or `outline-color: currentColor`, which tracks a color that already passes on its own background. Plain `--mustard-text` passes on light but not on the dark footer, so avoid a single flat color. Consolidate with the duplicate at `index.css:114` | 30 min |
| H3 | High | Assessment answer buttons expose no selected state (SC 4.1.2, 1.3.1) | Add `aria-pressed={value === option}` to the rating buttons in LifeAudit, PastorBurnout, MarriageAssessment, ChurchHealth (or restructure each question as `role="radiogroup"` with `role="radio"`/`aria-checked`) | ~1 h across the 4 tools |
| M1 | Medium | No announcement / focus management on section change or score reveal; focus drops to `BODY` (SC 4.1.3, 2.4.3) | On section advance, `tabIndex={-1}` + `.focus()` the new section `<h2>`; wrap the "N of 24 answered" counter and the results heading in `aria-live="polite"` (or reuse `ui/alert`'s `role="alert"` for the score) | 1–2 h across the 4 tools |
| M2 | Medium | 7 pages bypass Layout: no `<main>`, no skip link — `Home.tsx`, `Doubt.tsx`, `Parenting.tsx`, `Marriage.tsx`, `TheologyQuiz.tsx`, `StartHereDiagnostic.tsx`, `StartHereQuiz.tsx` (SC 2.4.1, 1.3.1) | Wrap each in `<Layout>` (they already render MinimalNav/Footer manually — swap, don't add), or minimally add the skip link + `<main id="main">` around their content | 1–2 h |
| M3 | Medium | Inline `transition: "0.2s"` (= `all`) fades the focus ring in over 200 ms (SC 2.4.7 in practice) | On interactive elements in the tools, scope the transition: `transition: "background .2s, border-color .2s, color .2s"` | 30 min |
| L1 | Low | No banner landmark; `MinimalNav` is a bare top-level `<nav>` (`MinimalNav.tsx:369`) | Wrap the nav in `<header>` | 15 min |
| L2 | Low | Email inputs labelled only by `aria-label` + vanishing placeholder (`NewsletterSignup.tsx:87-93,134-140,209-215`) | Add a small visible `<label>` (can be the existing heading text via `htmlFor`) | 30 min |
| L3 | Low | Quiz loading state has no `role="status"`/`aria-busy`, and no `<main>` while loading (observed live) | Wrap the "Loading your quiz" block in `role="status"`; render the page shell (Layout) around both states | 15 min |

Suggested order: H2 → H1 (axe-confirmed 4) → H3 → M1 → M2 → M3 → L1–L3. H1+H2 together clear every live axe violation and the failing focus indicator with ~5 line-level edits, all inside the existing token system.

---

## Appendix — evidence trail

- Axe raw output: 12-page sweep, node-level selectors + fg/bg/ratio per violation (scratchpad `a11y/axe-results.json`; totals reproduced in §2).
- Keyboard transcript: 45-stop focus sequence, keyboard completion of 3 answers + section advance, focus-loss capture, semantics probe (scratchpad `a11y/keyboard-out.txt`; reproduced in §3).
- Focus-ring timing probe: computed outline `0px` at t=0 → `2px solid rgb(212,160,23)` at t=350 ms on the same focused button; CSS-rule walk shows both `:focus-visible` rules matching (scratchpad `a11y/probe3.mjs`, `probe4.mjs`).
- Contrast math: WCAG relative-luminance implementation, rgba composited over `#1A1A1A` before ratio (scratchpad `a11y/contrast.mjs`; full table §5).
