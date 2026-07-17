# Design System — the implemented contract

> Prompt 3's deliverable: the system **as built**, documented — not a proposal.
> Source of truth is `client/src/index.css` (`:root` light, `html.dark` dark,
> `.admin-scope` opt-out); this doc names the tokens, their intended use, and
> the anti-patterns. If this file and `index.css` disagree, the CSS wins —
> update this doc. Brand governance (the *why*): `CLAUDE.md`.

## How styling flows

Components use **inline styles referencing CSS variables** — never hardcoded
hex, never a fonts CDN. Brand changes happen once, at `:root`. Dark mode is
`html.dark` redefining the same tokens; the admin area opts out via
`.admin-scope` (always a light workspace, and `html.dark .admin-scope` guards
dark-on-dark). If a new value is genuinely needed, **add the token first**,
then reference it (recent example: `--pillar-justice`).

## Color tokens

| Token | Light value | Role | Never |
|---|---|---|---|
| `--bone` / `--bone-warm` / `--bone-muted` | `#F5F0E6` / `#EDE8DC` / `#D9D3C4` | Page background, alternating sections, muted edges — cream is the room | — |
| `--charcoal` (+`-deep`, `-soft`) | `#1A1A1A` | Fixed-dark surfaces: heroes, footer | — |
| `--charcoal-fg` | `#F5F0E6` | Text on fixed-dark surfaces — stays light in **both** themes (`--bone` flips dark and becomes unreadable there) | — |
| `--ink` / `--ink-muted` | `#14110C` / `#5A5448` | Body text / secondary text on cream | body text on dark sections |
| `--card` | `#FFFFFF` | Cards and inputs that must feel lifted | **page or section backgrounds** — cream is the room |
| `--mustard` / `--mustard-deep` / `--mustard-text` | `#D4A017` / `#B08A12` / `#7A6010` | Accent: CTAs, dividers, eyebrows, link underlines. `--mustard-text` is the AA-contrast text variant on light grounds | backgrounds, body text, >8% of a viewport |
| `--ok` / `--alert` / `--strain` (+`-bg`) | `#3D5A40` / `#9B2C2C` / `#B5651D` | Semantic status only (scores, errors) — sparing, comprehension-driven | decorative use |
| `--pillar-justice` | `#2D4A3E` | The Prophetic Justice badge accent (promoted from a hardcode; hue flagged for on-brand review) | anything else |
| `--nav-bg` | `rgba(245,240,230,.97)` | Sticky-nav scrim; flips with theme | — |
| Aliases: `--paper`, `--line`/`--border`, `--borderdk`, `--gold`… | | Legacy names kept so older components keep resolving — prefer the primary names in new code | — |

## Typography

| Token | Family | Use |
|---|---|---|
| `--F` | Cormorant Garamond → EB Garamond → Georgia | Display + headings, weight 400 — size carries weight, not boldness; `letter-spacing:-0.02em` on H1 |
| `--B` | Inter (system fallbacks) | Body, `line-height:1.7`, reading column ≤ `--w-prose` |
| `--U` | Inter | UI, buttons, labels; the `.eyebrow` utility is the canonical kicker (12px, 600, `.18em` tracking, mustard rule) |

Fonts are **self-hosted** (`client/public/fonts/` + `@font-face`) — never
reintroduce a CDN.

## Space, width, shape, elevation

- Spacing scale `--s-1`…`--s-9` (0.5rem → 12rem). Sections breathe at
  `--s-7`–`--s-9`; component gaps at `--s-1`–`--s-4`.
- Widths: `--w-prose` 680px (reading column) · `--w-content` 880px ·
  `--w-default` 1180px · `--w-wide` 1440px.
- Radius: `--radius-sm`/`--radius-md` **2px** (editorial, not rounded-card),
  `--radius-pill` for chips only.
- Shadows: `--shadow-card` (subtle lift), `--shadow-modal` (overlays). Nothing
  heavier.

## Shared primitives (use these; don't hand-roll)

CSS utilities in `index.css`: `.eyebrow`, `.pullquote`, `blockquote.quote-share`
(+ `__btn`), `.reading-progress`, `.skip-link`. Components/helpers (elevation
invariants): `components/Markdown` (the one renderer), `components/LoadFailed`
+ `lib/fetch-json` (no infinite spinners), `lib/clipboard` ("Copied" only on
true), `lib/storage` (guarded persistence), `SEOMeta` (string-literal
title/description). Dialog keyboard contract reference: `CommandPalette`
(Escape, focus move-in/restore); status swaps get `aria-live`/`role="status"`;
toggles get `aria-pressed` (see the launch-gate batch).

## States

Global visible focus: `:focus-visible { outline:2px solid var(--ink);
outline-offset:2px; box-shadow:0 0 0 5px var(--bone) }`. A global
`prefers-reduced-motion` block zeroes animation. Hover = subtle opacity/color
shifts, never movement. Disabled = reduced opacity + `cursor:default`.

## Anti-patterns (each has bitten this repo)

- Hardcoded hex in a component (breaks dark mode + future brand changes).
- Mustard as a background or body color — it is punctuation.
- White (`#FFF`/`--card`) as a page/section background.
- A second markdown renderer, fonts CDN, or heavier shadow/radius vocabulary.
- Styling the admin dark (`.admin-scope` exists precisely to prevent it).
- Skipping the token when a "one-off" color is needed — add the token first.
