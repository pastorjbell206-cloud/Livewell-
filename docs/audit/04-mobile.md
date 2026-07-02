# 04 — Mobile Experience Audit

> Site-elevation audit, step 1.4. Read-only investigation on commit `24fa9ae`
> (branch `site-elevation`, 2026-07-01). Method: Playwright (chromium,
> 375×812, DPR 2, `isMobile: true`, `hasTouch: true`) against `vite preview`
> of the committed `dist/`, on 11 representative pages: `/`, `/writing`,
> `/babylon`, `/books`, `/tools`, `/tools/theology-quiz`, `/tools/life-audit`,
> `/tools/marriage-assessment`, `/leadership`, `/leadership/sermon-prep`,
> `/start-here`. A throttled-load run (CDP: 400 ms latency, 50 KB/s down, 4×
> CPU) reproduces the mobile lab Speed Index of ~19–21 s recorded in
> `00-baseline.md`. All file:line citations verified on this commit. Raw
> measurement JSON and screenshots in the session scratchpad (`mobile/`).

---

## 1. What is already right (established first, so the fixes stay scoped)

- **Viewport meta is correct.** `client/index.html:5` ships
  `width=device-width, initial-scale=1.0` — and does *not* set
  `maximum-scale` or `user-scalable=no`, so pinch-zoom stays available.
- **No horizontal overflow anywhere.** On all 11 pages,
  `scrollWidth === innerWidth` (375) after a full-page scroll to mount lazy
  content. Not one element extends past the right edge. The single most
  common mobile failure is simply absent.
- **The nav has a real mobile path, sized correctly.** `MinimalNav.tsx`
  swaps `.desktop-nav` for `.mobile-nav` (hamburger + full-screen menu) at
  900 px via an embedded media query
  (`client/src/components/MinimalNav.tsx:881-882`). The hamburger and search
  buttons carry explicit `minWidth/minHeight: 44px`
  (`MinimalNav.tsx:661-662`), and every mobile menu item is driven by
  `onClick`, not hover.
- **No hover-gated content.** Of 29 files using `onMouseEnter`, only two set
  React state: the desktop nav dropdown
  (`client/src/components/MinimalNav.tsx:441` — which also has an `onClick`
  toggle at line 436 and is display-hidden under 900 px anyway) and the
  theology-quiz option highlight (`client/src/pages/TheologyQuiz.tsx:113` —
  style-only; the adjacent `onClick` answers the question). Every other
  `onMouseEnter` mutates inline hover styling (e.g. `pages/Home.tsx:387`,
  `pages/ToolsHub.tsx:246`). Nothing on the site is reachable only by hover.
- **The dedicated newsletter component will not trigger iOS auto-zoom.** All
  three `NewsletterSignup.tsx` variants set the email input to
  `fontSize: "16px"` (`client/src/components/NewsletterSignup.tsx:101,148,223`);
  the nav search input is `clamp(28px, 4vw, 48px)` (`MinimalNav.tsx:311`).
  (Other form components regressed — section 4.)
- **Sticky chrome is modest.** One sticky nav, 60 px tall, on every page; no
  fixed banners, no cookie bars, no app-install interstitials (details in
  section 6).
- **CLS is 0.000 on every page** (baseline lab data) — nothing jumps while
  loading.

The mobile layout, in short, is structurally sound. The problems are
(1) what a slow connection shows the reader for the first twenty seconds,
(2) a handful of touch targets well below any minimum, and (3) small-type
density on exactly the pages that sell and convert.

---

## 2. CRITICAL — The slow-network first visit: a blank room, then an unbranded spinner, then the page

**Measured timeline** (fresh profile, no cache, CDP emulation: 400 ms RTT,
50 KB/s down, 4× CPU — a mid-tier phone on weak cellular; timings from an
instrumented run against `vite preview`, which serves uncompressed):

| Clock | `/babylon` (deep link — the Facebook-share case) |
|-------|---------------------------------------------------|
| +0.5 s | HTML arrives (3.4 KB shell; `<div id="root">` is empty — no prerender) |
| +2.1 s | CSS arrives (98 KB). Page turns cream. Still empty. |
| +5.2–13.5 s | Entry JS `assets/index-BwH6iIdR.js` (616 KB raw) downloads. **The reader stares at a blank cream page the whole time.** |
| +13.5 s | `load` fires; React mounts; the lazy route boundary renders — **a lone spinner on cream. No header, no wordmark, no text.** |
| +14.2 s | Route chunk `Babylon-DIvgt54_.js` (6 KB) arrives instantly — then imports the shared secondary chunk |
| +19.8 s | `assets/index-CUt06uHX.js` (862 KB raw / 269 KB gz) finishes |
| **+20.0 s** | H1 "Babylon" renders. First real content. |

Screenshot evidence: at 10 s the viewport is a cream field with a small
dark spinner centered and nothing else (`throttle-babylon-10s.png`); the
same run on `/` eventually paints the full hero and nav in one frame —
CSR's all-at-once reveal.

Three distinct facts compound here, and they map to different fixes:

1. **The HTML shell is empty** (`dist/public/index.html`, 3.4 KB,
   `<div id="root"></div>`). Until the entry bundle executes, the brand
   does not exist. The repo has a `pnpm prerender` script; its output is
   not in this build. Even a static header + wordmark + tagline in
   `client/index.html` (or actually running the prerender step in the
   Vercel build) converts 13 s of blank cream into 13 s of a recognizable,
   readable page. This is the cheapest large win on mobile.
2. **The Suspense fallback is a bare spinner.** Deep-linked lazy routes —
   every `/babylon`-style book page, `ArticleDetail`, `BookDetail`
   (`client/src/App.tsx:14-25`) — show an unbranded spinner for the entire
   secondary-chunk download. Deep links from Facebook (the platform's
   existing audience, per CLAUDE.md) are precisely the URLs that hit this
   path. A fallback that renders the nav shell and a cream skeleton would
   keep the reader oriented for free.
3. **Lazy routes pull an 862 KB raw (269 KB gz) shared chunk**
   (`index-CUt06uHX.js`) before first content — 6.5 s at this profile
   *after* the app has booted. This is the bundle-architecture problem
   already documented in `01-performance.md`; it is cited here because its
   mobile symptom is the spinner phase, not just a lab number.

Real-world caveat, stated honestly: Vercel serves these assets compressed
(entry ≈ 168 KB gz, secondary ≈ 269 KB gz), so production transfer is
~3× faster than this uncompressed preview run — but the baseline Lighthouse
mobile lab (which throttles against production-like serving) still lands
Speed Index at **19–21 s on every page**, so the emulated experience above
matches what the lab already says. CLS during all of this is 0.000; the
wait is blank, but at least nothing jumps.

**Severity: Critical. Effort:** small for the shell/fallback (hours);
medium-to-large for the chunk split (tracked in `01-performance.md`).

---

## 3. HIGH — Touch targets: two real failures and a long tail

Runtime scan: visible `a`/`button`/`[role=button]` elements with a bounding
box under 44×44 px (Apple HIG minimum; WCAG 2.5.8 AA floor is 24×24).

| Page | <44 px | <24 px | Worst offender |
|------|-------:|-------:|----------------|
| `/tools/life-audit` | **66** | **49** | **10×10 px** category dots |
| `/tools/marriage-assessment` | **63** | **46** | **10×10 px** category dots |
| `/leadership/sermon-prep` | 45 | 41 | footer links (20 px tall) |
| `/` | 44 | 42 | 177×15 px "Or start here if you're a skeptic" |
| `/writing` | 44 | 41 | footer links |
| `/books` | 43 | 42 | 128×20 px "Read the essays"; 12 px buy links |
| `/leadership` | 43 | 42 | 138×18 px "See all ten booklets →" |
| `/babylon`, `/tools`, `/tools/theology-quiz`, `/start-here` | 41–42 | 41 | footer links |

**3a. The 10×10 px progress-dot buttons (the worst control on the site).**
`client/src/pages/tools/LifeAudit.tsx:641-663` and
`client/src/pages/tools/MarriageAssessment.tsx:465-482` render one round
`<button>` per category — `width: "10px", height: "10px"`, 8 px gap, no
padding — as the way to jump between sections of a 24-question audit. A
fingertip contact patch (~34 CSS px) covers three dots at once. They have
proper `aria-label`s ("Go to Spiritual Health"), which makes them worse in
a sense: they are announced to assistive tech as buttons that a motor-
impaired user cannot physically hit. These sit inside the two
self-assessment tools — pages the platform aims at people taking stock of
their marriage and life, disproportionately on phones.
*Fix (S):* keep the 10 px visual dot, grow the hit area — e.g.
`width/height: 24px` (or 44 px with negative-margin compensation) +
`padding` and `background-clip: content-box`, or a wrapping button with the
dot as a pseudo-element. No visual change required.

**3b. Footer links and the theme toggle.** Every page ends in the same
footer (`client/src/components/Footer.tsx`): ~30 links at
`fontSize: "13px"` (`footerLink`, line 6), bottom-row legal links and the
Substack link at 12 px (lines 27, 107), and the dark-mode toggle at 12 px
text + 14 px icon = a 43×20 px control (lines 114-116). Measured boxes are
~20 px tall. Vertical rhythm between footer links is generous (~44 px
pitch, confirmed by screenshot), so mis-taps are less likely than the raw
numbers suggest — the real cost is legibility plus a toggle that is
genuinely hard to hit. *Fix (S):* bump footer link font to 14 px and add
`padding: 8px 0; display: inline-block`; give the toggle
`minWidth/minHeight: 44px` like the nav already does.

**3c. Inline text CTAs at 15–20 px tall.** The pattern
"small mustard link as the conversion moment" repeats: "Or start here if
you're a skeptic" (`pages/Home.tsx`, 177×15 px), "See all ten booklets →"
(`pages/leadership/…`, 138×18 px), "Read the essays" (`pages/Books.tsx`,
128×20 px), and — most consequentially — the per-book **"Get the ebook —
$9.99 →" purchase links at `fontSize: "12px"`**
(`client/src/pages/Books.tsx:537, 564, 593`). These are the revenue click.
*Fix (S):* 14 px minimum for link-CTAs plus vertical padding to reach a
~44 px hit box; the visual weight can stay understated.

**3d. Borderline, acceptable:** the assessment rating buttons
(`LifeAudit.tsx:780-800`) compute to ~37 px tall (`padding: "10px 16px"`,
13 px label) with 8 px gaps — under 44 but above the WCAG floor and
comfortably spaced. Raise padding to `12px 18px` when convenient; not
urgent.

**Severity: High (3a), Medium (3b, 3c), Low (3d). Effort: S each.**

---

## 4. HIGH — Inputs under 16 px: iOS Safari zooms the page on focus

iOS Safari auto-zooms the viewport when a focused input's font-size is
below 16 px, and does not zoom back out on blur — the reader is left on a
zoomed, pan-around page at exactly the moment they agreed to act. Runtime
scan of every visible input on the 11 pages:

| Where | Control | Computed | Source |
|-------|---------|---------:|--------|
| `/` (homepage signup) | email input | **14 px** | `client/src/components/SegmentedSignup.tsx:291` |
| `/writing` | search input ("Search the writing…") | **14 px** | `client/src/pages/Writing.tsx:438` |
| `/leadership/sermon-prep` | all 7 sermon-workbench textareas | **15 px** | `client/src/pages/leadership/SermonWorkbench.tsx:97` |
| `/` `/babylon` etc. | `NewsletterSignup` variants | 16 px ✓ | `NewsletterSignup.tsx:101,148,223` |
| `/leadership/sermon-prep` | sermon title input | 22 px ✓ | `SermonWorkbench.tsx` |
| nav search overlay | search input | 28–48 px ✓ | `MinimalNav.tsx:311` |

The irony is that the dedicated newsletter component got this right and the
**homepage's primary email capture** (`SegmentedSignup`, imported by
`Home.tsx`) regressed to 14 px — the one form most mobile visitors will
touch. The sermon workbench matters for the PCN audience specifically: a
pastor drafting on a phone or small tablet gets a zoom jump on every one of
the seven questions. `GatedDownload.tsx:82` (16 px) is already correct.

*Fix (S):* set the three cited declarations to 16 px. One-line each; no
layout impact worth mentioning.

**Severity: High (homepage signup), Medium (search, textareas). Effort: S.**

---

## 5. MEDIUM — Tiny text: the 9–12 px layer

Elements with a direct text node under 13 px computed, per page: 7–13 on
most pages, but **37 on `/books`** and **41 on `/leadership`** — the two
long catalog pages, where the pattern multiplies per card. The recurring
species, worst first:

- **9 px:** "BY JAMES BELL" under the wordmark in the sticky nav
  (`client/src/components/MinimalNav.tsx:409`) — on every page, and it is
  the founder's name. Decorative, letter-spaced, but 9 px is below any
  legibility floor; 11–12 px keeps the same visual register.
- **11 px:** the `.eyebrow` kicker class (`client/src/index.css:370`) —
  "THE VISION", "LEADERSHIP FORMATION", "FREE TOOL", the Books-page
  "NEW EBOOK · $9.99 · POST-CHRISTIAN…" kickers (`pages/Books.tsx:135,166,196`).
  Note: the CLAUDE.md typography contract specifies eyebrows at **0.75 rem
  (12 px)**; the token as built is 11 px. Aligning the CSS to the documented
  12 px fixes brand-doc drift and mobile legibility in one edit.
- **12 px:** the ebook purchase links (§3c), footer legal row, "Read the
  vision", quiz/tool progress labels ("0 of 24 answered",
  "QUESTION 1 OF 5"). Body prose everywhere measured ≥16 px — the tiny
  layer is chrome and CTAs, not reading text.

*Fix (S):* raise the eyebrow token to 12 px (also closes the doc
mismatch), the nav byline to 11–12 px, and hold interactive text to ≥14 px.
Body text needs nothing.

**Severity: Medium. Effort: S (token-level, mostly one file each).**

---

## 6. LOW — Fixed/sticky inventory (pass, with one stacking note)

| Page | Sticky elements | Height | Verdict |
|------|-----------------|-------:|---------|
| all 11 | `<nav>` top 0 | 60 px | Fine — 7% of a 812 px viewport |
| `/tools/life-audit`, `/tools/marriage-assessment` | category progress bar (`.no-print` div) | 48 px | Sticks below the nav mid-quiz → 108 px (~13%) of viewport occupied while answering. Acceptable; watch it on shorter phones (667 px → 16%). |
| `/start-here` | 3 px progress hairline | 3 px | Fine |

No fixed overlays, banners, or bottom bars anywhere. The 10×10 dots (§3a)
live inside that life-audit sticky bar, so fixing their hit area must not
grow the bar much — the 24 px dot-with-padding approach fits inside 48 px.

Two incidental notes, filed as Low:
- `dist/public/sw.js` is a **self-destroying service worker** (unregisters
  itself, clears caches) and `registerSW.js` still loads on every page — a
  removed-PWA remnant. Harmless; one dead request per visit. Remove the
  registration when convenient.
- Inline-style hover states set via `onMouseEnter`/`onMouseLeave` (the
  dominant pattern in `pages/`) can "stick" on touch after a tap, since
  `mouseleave` fires only on the next tap elsewhere. Cosmetic; no action
  needed unless a stuck state ever carries meaning.

---

## 7. Horizontal overflow — PASS

All 11 pages: `document.documentElement.scrollWidth === 375` after full
scroll; zero elements with `rect.right > innerWidth + 1`. Nothing to fix.

---

## 8. Ranked findings

| # | Finding | Severity | Effort | Where |
|---|---------|----------|--------|-------|
| 1 | Slow-network first visit: blank cream ~13 s, then unbranded spinner to ~20 s on deep-linked (lazy) routes; empty HTML shell, bare Suspense fallback, 862 KB secondary chunk | **Critical** | S (shell + branded fallback) / M–L (chunk split, see `01-performance.md`) | `dist/public/index.html`, `client/src/App.tsx:14-25`, `client/index.html` |
| 2 | 10×10 px category-dot buttons in both self-assessment tools | **High** | S | `pages/tools/LifeAudit.tsx:641-663`, `pages/tools/MarriageAssessment.tsx:465-482` |
| 3 | Homepage primary email capture at 14 px → iOS zoom-on-focus | **High** | S | `components/SegmentedSignup.tsx:291` |
| 4 | Ebook purchase links at 12 px / ~17 px tall on `/books` (the revenue click) | **Medium** | S | `pages/Books.tsx:537,564,593` |
| 5 | Sermon-workbench textareas 15 px (×7) and `/writing` search 14 px → iOS zoom | **Medium** | S | `pages/leadership/SermonWorkbench.tsx:97`, `pages/Writing.tsx:438` |
| 6 | Footer: ~30 links at 13 px / 20 px tall, legal row 12 px, theme toggle 43×20 px | **Medium** | S | `components/Footer.tsx:6,27,107,114-116` |
| 7 | Inline text CTAs 15–20 px tall (skeptic path on `/`, booklets on `/leadership`, etc.) | **Medium** | S | `pages/Home.tsx`, `pages/leadership/*`, `pages/Books.tsx` |
| 8 | Tiny-text layer: 9 px nav byline; 11 px eyebrow token (doc says 12 px); heavy on `/books` (37) and `/leadership` (41) | **Medium** | S | `components/MinimalNav.tsx:409`, `client/src/index.css:370` |
| 9 | Assessment rating buttons ~37 px tall (above WCAG floor, below HIG) | **Low** | S | `pages/tools/LifeAudit.tsx:780-800` |
| 10 | Dead self-destroying service worker still registered each visit | **Low** | S | `dist/public/sw.js`, `registerSW.js` |
| 11 | Sticky stack on assessment tools = 108 px of 812 px viewport | **Low** | — (watch) | `pages/tools/LifeAudit.tsx` |

What is *not* on the list, verified clean: horizontal overflow (11/11
pages), hover-only content (0 instances), viewport meta, pinch-zoom,
mobile nav sizing, `NewsletterSignup` inputs, CLS.

---

## 9. Method appendix

- Playwright `playwright-core` + system chromium, context
  `{viewport: 375×812, deviceScaleFactor: 2, isMobile: true, hasTouch: true}`;
  each page scrolled to bottom and back before measurement to mount
  `whileInView` content. Metrics collected in-page: scrollWidth vs
  innerWidth + offending rects; visible `a`/`button` boxes <44 px; visible
  text nodes <13 px computed; `position: fixed|sticky` inventory; every
  visible input's computed font-size.
- Throttled runs used a CDP session per fresh context
  (`Network.emulateNetworkConditions` 400 ms / 50 KB/s / 20 KB/s up +
  `Emulation.setCPUThrottlingRate(4)`). One anomaly reported honestly: in
  the first screenshot run the home-page navigation appeared to outrun the
  network conditions (full render by 3 s, impossible at 50 KB/s for a
  616 KB entry); a second instrumented run (`/babylon`, response-by-response
  timings in §2) behaved exactly per the math and is the basis for the
  timeline. The qualitative phase sequence (blank → spinner → content) was
  identical in both runs and matches the baseline lab Speed Index.
- `vite preview` serves uncompressed (no `Content-Encoding`); production
  (Vercel) serves gz/br, so §2's absolute seconds are a worst-case cellular
  approximation — the baseline's Lighthouse SI 19–21 s is the
  production-calibrated figure the emulation was chosen to match.
- Screenshots reviewed: `throttle-home-3s.png`, `throttle-babylon-10s.png`,
  `spot-lifeaudit-dots.png`, `spot-books-buylink.png`, `spot-footer.png`,
  `spot-sermonprep.png` (session scratchpad, `mobile/`).
