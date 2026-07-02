# LiveWell by James Bell — Design System

> Connecting the depth of theology to the weight of everyday life.

**The source of truth for every token is `client/src/index.css`** — the
`:root` block (light), `html.dark` (dark mode), and `.admin-scope` (the
admin's forced-light workspace). Components reference those variables in
inline styles; nothing user-facing hardcodes a hex. This document is the
human-readable companion: it explains the system and mirrors the real
values. If this file and `index.css` ever disagree, `index.css` wins — fix
the doc, not the CSS. The brand contract itself (palette roles, mustard
discipline, typography) lives in `CLAUDE.md`.

---

## 1. Color System

### Surfaces

| Token | Light | Role |
|---|---|---|
| `--charcoal` | `#1A1A1A` | Primary dark — hero, dark sections, footer |
| `--charcoal-deep` | `#0F0F0F` | Deepest sections, modal overlays |
| `--charcoal-soft` | `#2A2A2A` | Card surfaces on dark, secondary panels |
| `--bone` | `#F5F0E6` | Default page background — the room you read in |
| `--bone-warm` | `#EDE8DC` | Alternating section background |
| `--bone-muted` | `#D9D3C4` | Dividers, subtle borders on light |
| `--card` | `#FFFFFF` | Cards and inputs that must feel lifted |

### Text

| Token | Light | Role |
|---|---|---|
| `--ink` | `#14110C` | Body text on bone — warmer than pure black |
| `--ink-muted` | `#5A5448` | Secondary text, captions, metadata |

### Accent (mustard — punctuation, not paragraph)

| Token | Light | Role |
|---|---|---|
| `--mustard` | `#D4A017` | CTAs, dividers, kicker labels, link underlines |
| `--mustard-deep` | `#B08A12` | Hover / active state |
| `--mustard-text` | `#7A6010` | Gold as *text* on light surfaces (AA contrast) |

### Semantic score tokens (assessments and tools)

| Token | Light | Role |
|---|---|---|
| `--ok` / `--ok-bg` | `#3D5A40` / 8% tint | Healthy score |
| `--strain` / `--strain-bg` | `#B5651D` / 8% tint | Under strain |
| `--alert` / `--alert-bg` | `#9B2C2C` / 8% tint | Needs attention; error text |

### Aliases

`:root` also carries legacy aliases from earlier passes — `--gold`,
`--goldlt`, `--border`, `--line`, `--paper`, `--cream`, `--ivory`,
`--forest*`, `--rust*`, `--sage`, `--plum`, `--oxblood`, `--stone*`,
`--ink2/3` — all resolving into the same palette above. Prefer the
canonical names in new code. Note `--goldlt` is the *text-safe* gold: it
darkens on light backgrounds and lightens on dark ones.

### Dark mode and the admin scope

`html.dark` re-maps the same token names (bone becomes near-black, ink
becomes bone, mustard-text lightens); components that only ever reference
tokens get dark mode for free. The admin area opts out entirely via
`.admin-scope`, which re-asserts the light values — the admin is always a
light workspace.

### Usage Rules (enforced)

1. **Mustard appears on less than 8% of any viewport.** It is punctuation,
   not a paragraph. Never a background fill, never body text — use
   `--mustard-text` (or `--goldlt`) when gold must carry words.
2. **Charcoal and bone alternate as section backgrounds.** No three
   consecutive sections share a background.
3. **Cream is the room.** Pure white exists only as `--card` — cards and
   inputs that must feel lifted — never as a page background.

---

## 2. Typography

### Families

| Token | Stack | Use |
|---|---|---|
| `--F` | `'Cormorant Garamond', 'EB Garamond', Georgia, serif` | Headlines, section titles, pull quotes |
| `--B` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` | Body copy |
| `--U` | same as `--B` | UI, buttons, labels |

Longer-name aliases exist (`--display`, `--serif`, `--sans`). There is
**no mono token** in `:root`; JetBrains Mono appears in the CLAUDE.md brand
table but has no token yet — add one before using it in markup.

### Scale

There is no `--text-*` scale in `:root`. The body base is `1rem` at
`line-height: 1.7` (set on `body`); headings size per component, usually
with `clamp()` so display type breathes between breakpoints.

### Type Rules

- Display type: `font-weight: 400`, `letter-spacing: -0.02em`. Serifs carry
  weight through size and tracking, not boldness.
- Body copy: `font-weight: 400`, `line-height: 1.7`, `max-width: 68ch`.
- Eyebrow labels: Inter at 12px, `letter-spacing: 0.18em`,
  `font-weight: 500`, uppercase.
- Italics (display serif) carry emphasis. Bold sans-serif is for UI
  affordances only.

---

## 3. Spacing, Containers, Shape

| Token | Value |
|---|---|
| `--s-1` … `--s-9` | 0.5 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8 / 12 rem (8pt grid) |
| `--w-prose` | 680px — article body |
| `--w-content` | 880px — hero copy, CTAs |
| `--w-default` | 1180px — most sections |
| `--w-wide` | 1440px — hero imagery |
| `--radius-sm` / `--radius-md` | 2px |
| `--radius-pill` | 999px |

**Shadows** — hairlines beat shadows; shadow only on hover/float:
`--shadow-card` (0 2px 8px at 6%), `--shadow-modal` (0 24px 80px at 20%).

**Motion** — `--ease: cubic-bezier(0.22, 1, 0.36, 1)`, `--dur: 240ms`. A
global `prefers-reduced-motion` rule collapses all animation.

---

## 4. Buttons (convention)

Three styles. No more.

**Primary** — Bone fill on charcoal, charcoal (ink) fill on bone, often
with a 2px mustard bottom border carrying the accent.

**Secondary (Ghost)** — Transparent, 1px border in the current color.

**Tertiary (Link)** — Inline mustard underline.

### Focus

Focus is a two-tone ring defined globally on `:focus-visible`: a 2px
`--ink` outline over a 5px `--bone` halo (`box-shadow`), with transitions
suppressed — visible on light, dark, and mustard surfaces alike. Do not
replace it per-component.

---

## 5. Mood

The site feels like the foyer of a cathedral that has a writing desk in it.
Sacred enough to matter, working enough to be used.

**Reference points:** Plough Quarterly, The Atlantic long-form, Penguin
Classics hardcovers, Walker Art Center print.

**What it is not:** minimalist-Scandinavian, boutique-hotel, playful.

The mustard does what gold leaf does on a worn Bible cover — it appears
where it matters and nowhere else.
