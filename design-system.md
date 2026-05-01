# LiveWell by James Bell — Design System

> Connecting the depth of theology to the weight of everyday life.

This document is the single source of truth for every visual decision on the site. Every value used in markup must reference a token defined here. No hardcoded hex, no magic numbers.

---

## 1. Color System

### Palette

| Token | Hex | Role |
|---|---|---|
| `--charcoal` | `#1A1A1A` | Primary dark — backgrounds, body text on light |
| `--charcoal-deep` | `#0F0F0F` | Footer, modal overlays, deepest sections |
| `--charcoal-soft` | `#2A2A2A` | Card surfaces on dark, secondary panels |
| `--bone` | `#F4F1EA` | Primary light — backgrounds, text on dark |
| `--bone-warm` | `#EDE8DC` | Secondary light — alternating sections |
| `--bone-muted` | `#D9D3C4` | Dividers, subtle borders on light |
| `--mustard` | `#C8A951` | Accent — links, CTAs, underlines, pull quotes |
| `--mustard-deep` | `#A88838` | Hover state, active state |
| `--mustard-soft` | `#E5D8A8` | Tints, highlight backgrounds (use sparingly) |
| `--ink` | `#14110C` | Body text on bone — warmer than pure black |
| `--ink-muted` | `#5A5448` | Secondary text, captions, metadata |

### Usage Rules (Enforced)

1. **Mustard appears on less than 8% of any given viewport.** It is punctuation, not a paragraph. Used for: primary CTAs (underline reveal), link underlines on hover, section number indicators, pull-quote rules, the logomark. Never used for: full button fills on hero CTAs, large background blocks, body text.
2. **Charcoal and bone alternate as section backgrounds** to create visual cadence. No three consecutive sections share a background.
3. **Pure white (#FFFFFF) and pure black (#000000) never appear.** Bone and charcoal carry the weight.

---

## 2. Typography

### Families

| Token | Stack | Use |
|---|---|---|
| `--font-display` | `'Cormorant Garamond', 'EB Garamond', Georgia, serif` | Headlines, section titles, pull quotes |
| `--font-body` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` | Body copy, UI, buttons |
| `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` | Code, ISBNs, data labels |

### Type Scale (1.25 ratio, mobile-first)

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 0.75rem (12px) | Captions, metadata |
| `--text-sm` | 0.875rem (14px) | UI labels, footnotes |
| `--text-base` | 1rem (16px) | Body |
| `--text-lg` | 1.125rem (18px) | Lead paragraphs |
| `--text-xl` | 1.5rem (24px) | Subheadings |
| `--text-2xl` | 2rem (32px) | Section titles (mobile) |
| `--text-3xl` | 2.75rem (44px) | Section titles (desktop) |
| `--text-4xl` | 3.75rem (60px) | Page titles |
| `--text-5xl` | 5rem (80px) | Hero (mobile) |
| `--text-6xl` | 7rem (112px) | Hero (desktop) |

### Type Rules

- Display type: `font-weight: 400`, `letter-spacing: -0.02em`. Serifs carry weight through size and tracking, not boldness.
- Body copy: `font-weight: 400`, `line-height: 1.7`, `max-width: 68ch`.
- Eyebrow labels: Inter at 0.75rem, `letter-spacing: 0.18em`, `font-weight: 500`, uppercase.
- Italics (display serif) carry emphasis. Bold sans-serif is for UI affordances only.

---

## 3. Spacing

| Token | Value |
|---|---|
| `--space-1` | 0.5rem (8px) |
| `--space-2` | 1rem (16px) |
| `--space-3` | 1.5rem (24px) |
| `--space-4` | 2rem (32px) |
| `--space-5` | 3rem (48px) |
| `--space-6` | 4rem (64px) |
| `--space-7` | 6rem (96px) |
| `--space-8` | 8rem (128px) |
| `--space-9` | 12rem (192px) |

**Section padding:** `--space-7` mobile, `--space-9` desktop.

### Container Widths

| Token | Value | Use |
|---|---|---|
| `--container-prose` | 680px | Article body |
| `--container-narrow` | 880px | Hero copy, CTAs |
| `--container-default` | 1180px | Most sections |
| `--container-wide` | 1440px | Hero imagery |

---

## 4. Buttons

Three styles. No more.

**Primary** — Bone fill on charcoal, charcoal fill on bone. Padding: `1rem 2.5rem`. Border-radius: `2px`. On hover: mustard underline reveals beneath label (240ms ease-out).

**Secondary (Ghost)** — Transparent, 1px border in current color. On hover: background fills mustard, text inverts to charcoal, border matches.

**Tertiary (Link)** — Inline mustard underline at 0.5em offset. On hover: underline thickens 1px to 2px, slides to 0.25em offset.

### Interaction Grammar

- All transitions: `cubic-bezier(0.22, 1, 0.36, 1)` at `240ms`
- Focus: 2px mustard outline, 4px offset
- Cursor: pointer only on actual interactive elements

---

## 5. Layout

- Grid: 12-column desktop, --space-3 gutter. 8-column at 768px. 4-column at 480px.
- Every section: eyebrow → headline → supporting paragraph → content → optional CTA.

---

## 6. Mood

The site feels like the foyer of a cathedral that has a writing desk in it. Sacred enough to matter, working enough to be used.

**Reference points:** Plough Quarterly, The Atlantic long-form, Penguin Classics hardcovers, Walker Art Center print.

**What it is not:** minimalist-Scandinavian, boutique-hotel, playful.

The mustard does what gold leaf does on a worn Bible cover — it appears where it matters and nowhere else.
