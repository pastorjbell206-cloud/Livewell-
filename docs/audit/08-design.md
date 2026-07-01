# Audit 1.8 — Design System & Visual Consistency

**Date:** 2026-07-01 · **Auditor:** Claude Code (design-director pass)
**Method:** Read `/mnt/skills/public/frontend-design/SKILL.md` (exists; craft bar applied), `CLAUDE.md` (Color Palette / Typography / Emotional Brief), root `design-system.md`, `client/src/index.css` `:root`. Served the pre-built `dist/public` via `vite preview` on :4178 and screenshotted 10 routes at 1440px and 375px plus a dark-mode capture (Playwright/Chromium). Every code claim cites `file:line`; every visual claim names its screenshot (scratchpad `design/shots/`).

**Environment caveat:** the preview had no database, so API-backed content (essay lists, book catalog counts, theology quiz) rendered its loading/empty fallbacks. Those fallbacks are shipped code and are judged as such; the missing content itself is not held against the design. The About portrait failed to load because it is a remote CloudFront URL blocked in the sandbox (`client/src/pages/About.tsx:7`) — noted as a fragility, not a rendering bug.

---

## 0. The authority conflict: `design-system.md` contradicts CLAUDE.md and the code

Root `design-system.md` opens with "This document is the single source of truth for every visual decision" (`design-system.md:5`). It is not — CLAUDE.md's Decision Log names `client/src/index.css` `:root` as the token source of truth, and the code agrees with CLAUDE.md, not with `design-system.md`. Specific contradictions:

| Fact | design-system.md | CLAUDE.md / index.css (actual) |
|---|---|---|
| Light surface | `--bone: #F4F1EA` (`design-system.md:18`) | Cream `#F5F0E6` (`CLAUDE.md` palette; `index.css:21`) |
| Mustard | `#C8A951` (`design-system.md:21`) | `#D4A017` (`CLAUDE.md`; `index.css:31`) |
| Mustard hover | `--mustard-deep: #A88838` (`design-system.md:22`) | `#B08A12` (`index.css:32`) |
| `--mustard-soft: #E5D8A8` | defined (`design-system.md:23`) | does not exist in `index.css` |
| Pure white | "never appear[s]" (`design-system.md:31`) | `--card: #FFFFFF` is a first-class token (`index.css:24`); CLAUDE.md explicitly assigns white to cards/inputs |
| Spacing tokens | `--space-1…9` (`design-system.md:71-81`) | actual names are `--s-1…9` (`index.css:68-69`) |
| Type scale | `--text-xs…6xl` (`design-system.md:47-58`) | **no `--text-*` tokens exist anywhere in `index.css`** — the documented scale was never implemented |
| Containers | `--container-prose` etc. (`design-system.md:87-92`) | actual names are `--w-prose/--w-content/--w-default/--w-wide` (`index.css:72`) |
| Primary button | bone/charcoal fill, padding `1rem 2.5rem`, mustard *underline reveal*, "never full [mustard] button fills" (`design-system.md:98-100`, `:29`) | 122 mustard-filled buttons/blocks in `pages/`+`components/` (grep `background: "var(--mustard)"`), e.g. `client/src/pages/LeadMagnetLanding.tsx:195`, `client/src/pages/landing/MarriageCrisis.tsx:88` |

Anyone who reads `design-system.md` first will hardcode the wrong mustard, the wrong bone, and reference tokens that don't exist. CLAUDE.md's punctuation on this ("when this file and a linked doc disagree, the more specific source wins") resolves it in principle, but the doc still claims supremacy in its own second sentence. This is the cheapest high-yield fix in the whole audit.

---

## 1. Typography

### 1.1 Scale coherence: there is no scale — there are 154 of them

Grep across `client/src/pages/` (`fontSize:` in inline styles): **154 distinct values**. A disciplined system has 8–10. The distribution shows per-page improvisation, not a scale:

- Dense cluster at the small end: `14px` ×394, `13px` ×310, `15px` ×282, `11px` ×263, `16px` ×231, `18px` ×200, `12px` ×171 — seven adjacent sizes all in heavy rotation, including half-pixel inventions (`13.5px` ×24, `17.5px` ×19, `14.5px` ×13, `12.5px` ×9).
- **~40 distinct `clamp()` recipes for what is visually the same H1/H2**: `clamp(32px,5vw,60px)` ×24, `clamp(32px, 5vw, 52px)` ×20, `clamp(32px, 5vw, 48px)` ×16, `clamp(32px, 4.6vw, 50px)` ×14, `clamp(32px, 4.6vw, 52px)` ×12, `clamp(34px, 5vw, 56px)` ×6, `clamp(32px, 5.2vw, 56px)` ×8 … each page re-derives its own hero size by feel.
- Units mix freely: px, rem (`0.75rem` ×73, `0.85rem` ×18, `0.9rem` ×16), and clamp, for the same roles.

The `design-system.md:47-58` type scale (`--text-xs`…`--text-6xl`) would have prevented all of this; it was documented and never built (§0).

### 1.2 Hierarchy on the screenshots: mostly lands

- **home-desktop.png / home-hero-viewport.png** — the eye lands exactly right: mustard kicker → 76px Cormorant H1 → italic serif deck → body → two CTAs. This is the best type moment on the site.
- **life-audit-desktop.png** — model page: "Life *Audit*" (italic mustard second word), part label, serif section head, numbered white cards. Clear three-level hierarchy.
- **about-desktop.png** — prose-led with italic-serif micro-heads ("It starts at the root…"); quiet and correct.
- **leadership-desktop.png** — hierarchy collapses in the tool grid: ~26 near-identical small cards, each with its own eyebrow+title+caption, so no card wins and the eye skates (see §5).
- **writing-desktop.png** — hero fine; below it the page is a search field over an empty region (preview artifact), but the fallback is a bare `"Loading the writing…"` string (`client/src/pages/Writing.tsx:609`) — no skeleton, off-brief.

### 1.3 Line length

Long-form reading is genuinely disciplined. Measured on **babylon-prose-viewport.png**: paragraph column 654px at 22px serif ≈ 58–60ch, line-height 1.85 — inside the 68ch contract and comfortable. Across pages the prose caps are mostly ch-based (`68ch` ×60, `64ch` ×74, `62ch` ×75, `60ch` ×64, `52ch` ×32) or `var(--w-prose)` ×95 — but there are also 76 uses of `maxWidth: "720px"` and 48 of `"560px"` doing the same job with different numbers. Measure is respected; the vocabulary for it is not shared.

### 1.4 Cormorant/Inter role discipline

- **No display font on UI controls:** grep for `var(--F)` combined with button/cursor styles returned **0 hits** — the serif never leaks onto buttons. Good.
- **Weight discipline on H1s holds where it matters:** the Home hero H1 is `fontFamily: var(--F), fontWeight: 400` (`client/src/pages/Home.tsx:157-160`), per contract.
- **Ten violations of "display weight 400/500":** `var(--F)` at `fontWeight: 600` on the H2s of `client/src/pages/Privacy.tsx:14-22` and `client/src/pages/Terms.tsx:14-18` (legal pages — low stakes, still off-contract).
- **A real deviation worth a decision, not a patch:** the Babylon book-reading body is **Cormorant Garamond at 22px**, not Inter (measured live; babylon-prose-viewport.png). CLAUDE.md's contract says body = Inter. A serif book page is a defensible editorial choice — it reads like a hardcover, which serves the emotional brief — but it is currently an undocumented exception. Either write it into CLAUDE.md ("long-form book pages set body in Cormorant at ≥21px") or bring it back to Inter. Don't leave it as silent drift.
- **The nav logo** is `var(--F)` at `font-weight: 600` (`client/src/index.css:138`) — a third quiet weight violation, though visually acceptable at 21px.

---

## 2. Spacing rhythm

### 2.1 Tokens vs raw px: a near 50/50 split

In `client/src/pages/`: **731** `padding` declarations reference `var(--s-*)` vs **860** raw-px paddings, across **182 distinct raw padding strings**. The most common raw value, `"80px 24px"` ×91, is a hand-typed near-equivalent of the tokenized section padding other pages use (`var(--s-7) var(--s-4)`) — same intent, two spellings, so a future rhythm change at `:root` will move half the site and strand the other half. Other high-frequency raw values (`"14px 28px"` ×32, `"12px 28px"` ×23, `"12px 24px"` ×21…) are the button-padding zoo (§4.1).

### 2.2 Do the pages breathe the same? Mostly yes

Comparing section air across home-desktop.png, about-desktop.png, books-desktop.png, life-audit-desktop.png: vertical rhythm is consistent — generous dark heroes, `--s-6`/`--s-7`-scale section padding, and the alternating bands land at similar heights. Two pages break the rhythm: **leadership-desktop.png** (card grids packed with `~16-24px` internal gaps run for thousands of pixels without a rest — the densest page on the site) and **tools-desktop.png** (24+ uniform cards with identical spacing produce a wall, not a rhythm). Mobile (home-mobile.png, books-mobile.png) stacks cleanly; nothing collides at 375px.

---

## 3. Color

### 3.1 Mustard discipline: holds on screen, leaks in code

Measured visually: home hero viewport mustard ≈ 1–2% (kicker, hairline, button underline — home-hero-viewport.png); tools page ≈ 2–3% (icons + card left-borders — tools-desktop.png); books rows ≈ 2–3% (CTA fills on dark rows — books-desktop.png). **No screenshot approaches the 8% ceiling. Mustard-as-punctuation is genuinely delivered.**

In code, `background: "var(--mustard)"` appears **122 times** (pages + components). Most are small fills (buttons, progress bars, 32–40px divider rules) that CLAUDE.md's "CTAs, dividers" reading permits — but they flatly contradict `design-system.md:29,100` ("never full button fills"; primary = underline reveal). The heaviest concentrations are the conversion surfaces: `client/src/pages/LeadMagnetLanding.tsx:195,258,362`, `client/src/pages/EmailSignup.tsx:99,119,251`, and every `pages/landing/*` subscribe row. One of the two contracts has to win (§0); as shipped, the site follows CLAUDE.md.

### 3.2 Section alternation ("no three consecutive share a background")

- **Home** (`client/src/pages/Home.tsx:109,330,443,567,583`): charcoal → bone → bone-warm → charcoal → bone. Passes cleanly (home-desktop.png).
- **Books** (`client/src/pages/Books.tsx:84-516`): the letter of the rule survives; the spirit does not. Rows at `:309` and `:339` are back-to-back `var(--ink)`; rows `:435` (`var(--ink)` = `#14110C`) and `:459` (`var(--charcoal)` = `#1A1A1A`) are consecutive and **perceptually identical darks** — on books-desktop.png they read as one long dark slab. Two further problems: (a) the page uses `--ink`, a *text* token, as a section background nine times (`Books.tsx:185,247,309,339,387,435`…), which the palette table explicitly scopes to type; (b) fourteen visually identical full-width book rows in a row is monotony the alternation rule was written to prevent.
- **About** tail: charcoal verdict band (`client/src/pages/About.tsx:130`) flows into the dark footer — two consecutive darks, acceptable if the footer is exempt, but it reads as one undifferentiated block on about-desktop.png.

### 3.3 Hardcoded hex — user-visible vs admin-only

The architecture map's ~62 component hexes split cleanly:

**Admin-only (defensible — the light `.admin-scope` workspace):** `AdminSyncPanel.tsx` ×25, `AdminLayout.tsx` ×22, `AdminTestimonialsPanel.tsx` ×6, `AdminCommentsPanel.tsx` ×6. Low priority.

**User-visible (should be tokens):**
- `client/src/components/Footer.tsx:7,19` — `#ffffff` twice, in the site-wide footer.
- `client/src/components/BookRecommendations.tsx:36,61` — `#E5E7EB` (a Tailwind grey, **off-palette**) and `#FFFFFF`.
- `client/src/components/ArticleCard.tsx:31` — `bg-[#2D4A3E]` (an off-palette green).
- `client/src/components/BuyEbookButton.tsx:116` — `#9b1c1c` error text (should be `--alert`).
- `client/src/components/EmailResults.tsx:128` — `#FFFFFF`.

**Page-level hotspots (worse than the components):**
- `client/src/pages/tools/DeepBibleCompanion.tsx` — **73 hexes**, including the brand values themselves hardcoded (`#14110C` ×29, `#D4A017` ×23, `#F5F0E6` ×9) plus greys `#666/#ccc/#999`. This page ignores the token layer entirely — it will not respond to dark mode or any brand change.
- `client/src/pages/tools/QuoteLibrary.tsx` — 41 hexes incl. off-palette `#6B8E6B` green ×5.
- `client/src/pages/StartHereQuiz.tsx:18-29` — 16 off-palette category colors (`#9B8BA8` purple, `#8B6B7F`, `#8B4545`…), a parallel mini-palette nothing else uses.
- `client/src/index.css:135` — `.nav-wrap` background is hardcoded `rgba(250,248,244,.97)`, not a token, with no dark override (consequence in §6).

---

## 4. Component consistency

### 4.1 Buttons: one primary button, ~15 recipes

The "same" primary CTA is hand-built per page. Padding variants in `pages/` alone: `14px 28px` ×32, `12px 28px` ×23, `12px 24px` ×21, `13px 24px` ×16, `15px 32px` ×11, `16px 28px` ×9, `10px 20px` ×10 … plus the map's known `13px 26px` outlier (`client/src/components/KeepReadingBook.tsx:93`). Radius drifts with it: buttons use `var(--radius-sm)`/`2px` in most places but `3px` on every `pages/landing/*` CTA (`client/src/pages/landing/MarriageCrisis.tsx:88,103` etc.). Font size wobbles 14–16px, weight 500–700 (`Home.tsx:139` area vs `CarePlan.tsx:109` at 700). `design-system.md:96-104` specifies exactly three button styles; none of the three (underline-reveal primary, mustard-fill-on-hover ghost) is what shipped. There is no `<Button>` shared by the public pages — this is the single largest source of visible drift.

### 4.2 Cards: three families, close but not identical

From tools-desktop.png, books-desktop.png, home-desktop.png: white cards on cream with hairline borders is the consistent family resemblance (good). But tool cards carry a colored left-border accent (mustard on some, ink on others, with no discernible rule for which — tools-desktop.png), essay/pillar cards on Home use a mustard bottom rule, and book rows are borderless full-bleed bands. Radius across `pages/`: `var(--radius-sm)` ×247 **and its literal value `"2px"` ×167** (same look, two spellings — harmless today, a trap tomorrow), then genuine drift: `3px` ×65, `4px` ×57, `6px` ×31, `8px` ×49, `10px/12px` stragglers. Shadows: the two shadow tokens are nearly unused (2 uses of `--shadow-modal`); 10+ raw `rgba(0,0,0,…)` shadow recipes float free (`0 16px 48px rgba(0,0,0,.55)` ×13 …).

### 4.3 Eyebrow labels: the 0.75rem/0.18em contract is a suggestion in practice

Contract: Inter 0.75rem, 500, uppercase, 0.18em. Reality: `letterSpacing` on eyebrow-shaped labels spreads across `0.2em` ×132, `0.18em` ×106, `0.15em` ×63, `0.12em` ×52, `0.1em` ×34, `0.14em` ×19, `0.08em` ×27; sizes run 10–13px and weight 500–700. Even the flagship Home kicker is off-spec: 11px / weight 600 (`client/src/pages/Home.tsx:144-147`). No shared `<Eyebrow>` exists, so every page re-types it.

---

## 5. Distinctiveness & the emotional brief

**Where it is delivered.** The homepage hero (home-hero-viewport.png) is the thesis stated correctly: near-black room, a 76px Garamond declaration, an italic deck, one hairline of mustard. It is unhurried, weighted, grown-up — and notably it *is* the "cream + serif + warm accent" family the frontend-design skill flags as an AI default, but here the brief itself mandates the palette, and the execution (dark-first hero, hairline mustard, no gradients, no glassmorphism) is specific enough to escape the template smell. **start-here-desktop.png** (a single question, six quiet charcoal cards, nothing else on screen) and **life-audit-desktop.png** (numbered serif diagnosis cards) are the most distinctive interior pages — they feel like the writing sounds. **about-desktop.png** and the Babylon reading page are honest, book-like, and calm. **books-desktop.png**'s typographic cover thumbnails (serif titles on bone/charcoal minimal covers) are a genuinely ownable asset.

**Where it breaks.**
1. **The card walls.** tools-desktop.png (24+ identical white cards) and especially leadership-desktop.png (~50 cards in relentless 3-col grids) read as directory software, not a working library. This is where the site looks most "default AI-built": uniform cards, icon + title + two lines, repeat. The content deserves editorial grouping — a featured tool, grouped shelves, prose interstitials — not a parking lot.
2. **The loading/empty fallbacks.** Bare `Loading…` text in an otherwise empty cream band (home-desktop.png "Start with these"; writing-desktop.png), a naked spinner on quiz-desktop.png, and — worst — **"All 0 books by James Bell"** rendered while the catalog loads (books-desktop.png bottom; `client/src/pages/Books.tsx:733` interpolates `authored.length` with no loading guard). A serious book in a quiet room does not say "Loading…"; skeleton bands in `--bone-warm` would hold the mood.
3. **The nav at 1440px** (writing-desktop.png, quiz-desktop.png): "Post-Christian World" wraps to three lines, "Start here"/"The Table" to two — item heights ragged, the wordmark's "BY JAMES BELL" breaks awkwardly. Ten items + search + CTA is one item too many for the type size; the first three seconds feel slightly crowded, against the brief.
4. **The hero's right half** at 1440 is empty (copy capped at 780px inside a full-bleed band, home-hero-viewport.png). Quiet is the brand, but this reads as *unused* rather than *composed* — the vision card below sits in the same left channel, so the whole dark block lists to port.

**No generic gradients** (only 4 `linear-gradient` uses in all of `pages/`, all charcoal scrims) and no border-radius soup — restraint is real.

---

## 6. Dark sections & dark mode

**Dark sections (light mode)** are the site's strength: charcoal bands with bone type are consistently legible and carry the gravitas (home, books, start-here screenshots).

**Dark mode is reachable but shipped broken.** The toggle exists and is discoverable in the footer (`client/src/components/Footer.tsx:114-116`, `client/src/contexts/ThemeContext.tsx:34-37`, wired in `client/src/App.tsx:562`). On home-dark.png:

1. **The hero H1 and deck are illegible — near-black on near-black.** Root cause: dark sections pair `background: var(--charcoal)` with `color: var(--bone)` (`client/src/pages/Home.tsx:109-110`); in `html.dark`, `--charcoal` stays dark (`#0F0F0F`) but `--bone` *also* flips dark (`#14110C`, `client/src/index.css:76-77`). The token system conflates "bone = light surface" with "bone = light text on dark," and the two invert differently. Every `charcoal`+`bone` section on the site has this failure mode. The ghost button label ("Find your track") vanishes entirely.
2. **The nav stays light with washed-out links** — `.nav-wrap`'s hardcoded `rgba(250,248,244,.97)` (`client/src/index.css:135`) has no `html.dark` override, and nav link colors flip light, giving cream-on-cream (home-dark.png, top bar).
3. Conversely, `Books.tsx`'s `--ink` backgrounds invert to light-with-dark-text — readable but the page's dark/light rhythm silently flips.

**Admin light-scope is correctly engineered:** `.admin-scope, html.dark .admin-scope` re-asserts every light token plus a guaranteed background/color (`client/src/index.css:103-113`) — admin cannot render dark-on-dark. The admin's 47 hardcoded hexes are consistent with its intentionally fixed light workspace.

Verdict: either dark mode gets an on-dark text token (`--text-on-dark` or per-section `data-surface` pattern) plus a nav override, or the toggle should be removed until it does. A broken dark mode is worse than none — it is the one place the site currently looks careless.

---

## 7. Ranked fixes (by perceived-quality lift)

| # | Priority | Fix | Evidence | Effort |
|---|---|---|---|---|
| 1 | **Critical** | **Fix dark mode or pull the toggle.** Add an on-dark text token so `charcoal` sections keep light type when `--bone` inverts; add `html.dark .nav-wrap` override. Test every dark section. | home-dark.png; `Home.tsx:109-110`; `index.css:76-77,135` | M |
| 2 | **Critical** | **Reconcile `design-system.md` with CLAUDE.md + `index.css`** (wrong mustard/bone hexes, phantom `--text-*`/`--space-*`/`--container-*` token names, "no pure white" rule, button spec vs the 122 mustard fills). Demote it or regenerate it from `:root`; one source of truth. | §0 table; `design-system.md:5,18,21,29,47-58,71-92,100` | S |
| 3 | **High** | **One shared `<Button>` (and `<Eyebrow>`) for the public site.** Three variants per the (corrected) spec; collapse ~15 padding recipes, 2px/3px radius split, 14–16px sizes, and the 10 letterSpacing values on eyebrows. This is the most *visible* consistency win per hour spent. | §4.1, §4.3; `KeepReadingBook.tsx:93`; `landing/MarriageCrisis.tsx:88`; `Home.tsx:144-147` | M |
| 4 | **High** | **Design the loading/empty states.** Cream-warm skeleton bands instead of `Loading…` strings; guard `All {authored.length} books` against the 0 flash. Cheap, and it's the difference between "quiet room" and "unfinished page" on first paint. | home/writing/books/quiz-desktop.png; `Books.tsx:626,733`; `Writing.tsx:609`; `Home.tsx:493` | S |
| 5 | **High** | **Tokenize the user-visible hex hotspots**: `DeepBibleCompanion.tsx` (73 hexes — dark-mode dead), `QuoteLibrary.tsx` (41), `StartHereQuiz.tsx` category colors, `BookRecommendations.tsx:36` `#E5E7EB`, `ArticleCard.tsx:31` `#2D4A3E`, `BuyEbookButton.tsx:116` → `--alert`, `Footer.tsx:7,19`. Off-palette greens/purples/greys are the only places the palette visibly breaks. | §3.3 | M |
| 6 | **Medium** | **Implement the type scale as tokens** (`--text-*` per the corrected doc) and migrate headings first: collapse ~40 hero `clamp()` recipes to 2–3, then chip at the 154 body sizes. Biggest long-term coherence win; do it incrementally. | §1.1 | L |
| 7 | **Medium** | **Break the card walls**: /tools and /leadership need editorial grouping (featured tool, grouped shelves, prose interstitials) instead of uniform grids; /books needs its 14 identical rows batched (and the `--ink`-as-background + consecutive-dark runs fixed while in there). | tools/leadership/books-desktop.png; `Books.tsx:309,339,435,459` | M |
| 8 | **Medium** | **Nav: stop the label wrapping at 1440** — shorten or drop one item, or let labels keep to one line; ragged two/three-line items undercut "unhurried" on every page. | writing-desktop.png top bar | S |
| 9 | **Low** | Normalize radius/shadow vocabulary: `"2px"` → `var(--radius-sm)` (167 sites), fold the 10 raw shadows into the 2 tokens; migrate `"80px 24px"` sections to `--s-*`. Mechanical, low visible lift. | §2.1, §4.2 | M |
| 10 | **Low** | Compose the 1440px hero's right channel (or narrow the band); self-host the About portrait instead of the CloudFront URL; fix `var(--F)` weight-600 H2s on Privacy/Terms; document or revert the Cormorant body on book pages. | home-hero-viewport.png; `About.tsx:7`; `Privacy.tsx:14`; §1.4 | S |

---

## Verdict

The brand is real and the screenshots prove it: the palette discipline, the mustard restraint, the serif weight, and the best pages (home hero, start-here, life-audit, the Babylon reading page) deliver "a serious book in a quiet room" better than most professionally designed editorial sites. What's missing is the *system* under the brand: 154 font sizes, 182 padding strings, and 15 button recipes mean every page re-derives the design from memory — the look holds today only because one voice wrote most of it. The two documents that should prevent that drift disagree with each other and with the code, and the one systemic feature that would expose all of it — dark mode — currently does, visibly. Fix the authority conflict, the dark tokens, and the shared button/eyebrow, and the perceived quality jumps a grade without touching a single page's layout.
