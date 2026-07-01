# 04 — Mobile Experience Audit

> Site-elevation audit, step 1.4. Read-only investigation on commit `24fa9ae`
> (branch `site-elevation`, 2026-07-01). Method: Playwright (chromium,
> 375×812, DPR 2, `isMobile`, `hasTouch`) against `vite preview` of the
> committed `dist/`, on 11 representative pages: `/`, `/writing`, `/babylon`,
> `/books`, `/tools`, `/tools/theology-quiz`, `/tools/life-audit`,
> `/tools/marriage-assessment`, `/leadership`, `/leadership/sermon-prep`,
> `/start-here`. Throttled-load runs (CDP: 400 ms latency, 50 KB/s down, 4×
> CPU) on `/` and `/babylon` approximate the lab Speed Index of ~19–21 s
> recorded in `00-baseline.md`. All file:line citations verified on this
> commit. Raw measurement JSON in the session scratchpad
> (`mobile/findings.json`).

---

## 1. What is already right (established first, so the fixes stay scoped)

- **Viewport meta is correct.** `client/index.html:5` ships
  `width=device-width, initial-scale=1.0` — and does *not* set
  `maximum-scale` or `user-scalable=no`, so pinch-zoom stays available.
- **No horizontal overflow anywhere.** On all 11 pages,
  `scrollWidth === innerWidth` (375) after full-page scroll. No element
  extends past the right edge. The single most common mobile failure is
  simply absent.
- **The nav has a real mobile path.** `MinimalNav.tsx` swaps
  `.desktop-nav` for `.mobile-nav` (hamburger + full-screen menu) at 900 px
  via an embedded media query (`client/src/components/MinimalNav.tsx:881-882`);
  every mobile menu item is driven by `onClick`, not hover.
- **No hover-gated content.** Of 29 files using `onMouseEnter`, only two set
  React state: the desktop nav dropdown
  (`client/src/components/MinimalNav.tsx:441` — which also has an `onClick`
  toggle at line 436 and is display-hidden under 900 px anyway) and the
  theology quiz option highlight
  (`client/src/pages/TheologyQuiz.tsx:113` — style-only; `onClick` at 112
  answers the question). Every other `onMouseEnter` mutates inline hover
  styling (e.g. `Home.tsx:387`, `ToolsHub.tsx:246`). Nothing on the site is
  reachable only by hover.
- **The newsletter email input will not trigger iOS auto-zoom.** All three
  `NewsletterSignup.tsx` variants set the email input to `fontSize: "16px"`
  (`client/src/components/NewsletterSignup.tsx:101,148,223`); the nav search
  input is `clamp(28px, 4vw, 48px)` (`MinimalNav.tsx:311`). Runtime check
  confirmed no input under 16 px on any audited page.
- **CLS is 0.000 on every page** (baseline lab data) — nothing jumps while
  loading.

The mobile layout, in short, is structurally sound. The problems are
(1) load experience on a slow connection, (2) touch-target sizing, and
(3) small-type density — in that order.

---

_(Sections 2–6: findings, filled in below.)_
