# CLAUDE.md — LiveWell by James Bell

> Read this file first. Do not deviate from voice or palette.
>
> This file governs voice, palette, and engineering. Editorial mission is
> governed by `docs/EDITORIAL-CONSTITUTION.md` — the top-level constitution
> every content decision nests under. Read it before content work.

---

## Platform & Founder

**LiveWell by James Bell** is the digital home of James Bell — Lead Pastor of First Baptist Church of Fenton (Michigan), founder of the Pastors Connection Network (PCN), author of 21 books. He came to faith from atheism. He was raised without a father. He has five sons. Those last two facts shape everything he writes.

**Tagline:** Connecting the depth of theology to the weight of everyday life.

**Domain:** livewellbyjamesbell.co

**Stack:** React + Vite + tRPC + Drizzle ORM + MySQL, deployed on Vercel.

---

## Audiences (in order of weight)

1. **Skeptics** — the hardest case, the one Bell writes toward
2. **Christians** — carrying real questions the church avoids
3. **Pastors** — the strategic distribution channel via PCN
4. **People seeking to live well** — marriage, parenting, vocation

---

## Positioning Statement

For the reader whose faith has outgrown the answers they were given — whose marriage needs more than tips, whose doubts deserve more than platitudes, whose calling costs more than anyone told them — LiveWell by James Bell is the theological writing platform that refuses to separate intellectual depth from lived experience, unlike the devotional mills that offer comfort without cost and the academic journals that offer rigor without warmth, because Bell writes from inside the room where people fall apart, not from a safe distance — as a working pastor with 15 years of ministry, five sons, and 25 books that prove theology can carry the weight of a Tuesday afternoon.

---

## Voice & Tone

### Long-form register (essays, books, sermons published as prose)

Prophetic and pastoral simultaneously, never one without the other. Intellectual anchors: Tim Keller (architecture), Walter Brueggemann (prophetic imagination), Eugene Peterson (pastoral texture), Dietrich Bonhoeffer (willingness to name the thing at cost).

Requirements:
- Named scholars as structural witnesses (Bellah, James K.A. Smith, Newbigin, Taylor, Haidt)
- Specific historical dates and events
- Technical theological vocabulary used naturally, never defined condescendingly
- The full historical arc — never starting at the proximate cause
- Self-implication: the writer is always inside the indictment
- Verdicts, not summaries
- Endings that leave weight, never resolve it

### Short-form register (Facebook, brief notes, captions)

Direct, pastoral, emotionally precise. No academic apparatus. The same voice stripped to its bones — a sentence that lands in someone's feed and stops them. Still refuses the forbidden language. Still self-implicating.

---

## Forbidden Language

### Words
delve, leverage, unlock, transformative, navigate, tapestry, foster, unpack, landscape, nuanced, multifaceted, authentic, journey (as metaphor), holistic

### Phrases
"in today's world," "now more than ever," "here's the thing," "I want to be real with you," "God's got this," "blessed" (as adjective), "gospel-centered" (without earning it), "authentic community"

### Therapy-speak
"hold space," "your truth," "do the work," "your feelings are valid," "lean into," "showing up"

### Structural moves to avoid
Signposting ("here is what I mean," "let me explain"). Clean application turns. Comfortable closings. Bullet lists where prose belongs.

---

## Structural Moves (the Bell patterns)

1. **"Not X. Y."** — ground-clearing with a hard period, never a comma. "This is not about politics. It is about the cross."
2. **Short-Long-Short** — sentence rhythm. A short declaration. A longer sentence that builds the evidence, names the history, implicates the reader. Then the verdict: three to eight words.
3. **The building triplet** — but only when the thinking actually produces three elements of equal weight. Never forced.
4. **Self-implication** — the writer is always inside the indictment, never pointing from outside. "We did this. I did this."
5. **Verdicts** — short, final, after the evidence. Not summaries. Verdicts.
6. **Endings that leave weight** — the last paragraph does not resolve. It names what remains. The reader carries it out.

---

## Color Palette

| Color | Hex | Role | Never used for |
|-------|-----|------|----------------|
| **Black** | `#1A1A1A` | Primary surface (hero, dark sections, footer), primary type on cream | Full-page background in bone-dominant layout |
| **Cream** | `#F5F0E6` | Default page background, the room you read in | Cards that need to feel lifted (use white) |
| **Cream warm** | `#EDE8DC` | Alternating section background | — |
| **Mustard** | `#D4A017` | Accent only. CTAs, dividers, kicker labels, link underlines, the weight of important moments | Large background fills, body text, decorative use |
| **White** | `#FFFFFF` | Cards that must feel set apart, input fields | Page background (always cream) |
| **Ink** | `#14110C` | Body text on cream | Text on dark sections (use cream/white) |
| **Ink muted** | `#5A5448` | Secondary text, captions, metadata | Primary body text |

**Rules:**
- Mustard appears on less than 8% of any viewport. It is punctuation, not a paragraph.
- Cream and black alternate as section backgrounds. No three consecutive sections share a background.
- Pure white (#FFFFFF) is never a page background. Cream is the room.

---

## Typography

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display (H1) | Cormorant Garamond | 400 | `letter-spacing: -0.02em`. Size carries weight, not boldness. |
| Section titles (H2) | Cormorant Garamond | 400 | — |
| Subheadings (H3) | Cormorant Garamond | 500 | — |
| Body | Inter | 400 | `line-height: 1.7`, `max-width: 68ch` |
| UI / buttons | Inter | 500 | — |
| Eyebrow labels | Inter | 500 | 0.75rem, uppercase, `letter-spacing: 0.18em`, mustard color |
| Mono (code, ISBNs) | JetBrains Mono | 400 | Data labels only |

**Justification:** Cormorant Garamond has the editorial gravitas of a hardcover spine and the confidence to carry a 7rem headline without becoming decorative. Inter is the most legible sans-serif at small sizes shipped to the web — it does not call attention to itself, which is exactly what body type should do.

---

## Emotional Brief

The first three seconds of arrival on livewellbyjamesbell.co:

**Unhurried. Weighted. Grown-up.**

Not warm in the coffee-shop sense. Not dark in the luxury-brand sense. The feeling of opening a serious book in a quiet room where the light is good.

---

## Strategic Reminders

- The PCN network (thousands of pastors) is the highest-leverage growth channel. Every feature that serves pastors has distribution built in.
- Stripe integration is pending for membership/book purchases.
- The homepage is strong; inner pages need the same design system applied.
- Facebook following (facebook.com/james.bell.609252) is the existing audience. Substack is the newsletter channel.
- Contact forms send to Pastorjbell206@gmail.com.
- The site has 161+ articles and 21 books in the database. Content is the product.
- All components use inline styles with CSS variable references. Brand changes flow through `:root` tokens in `index.css`.

---

## Engineering: Codebase Map & Workflows

> This section is the practical orientation for working in the code. The deep,
> always-current system map is `docs/ARCHITECTURE.md` (architecture, file
> structure, DB, API, UI, production verdict) — read it before non-trivial
> engineering work. The brand contract above governs anything user-facing.

### Stack (as built)

TypeScript end to end. **React 19 + Vite 7** SPA with **wouter** routing,
**TanStack Query + tRPC v11** client, **Tailwind v4 + Radix** (shadcn-style)
primitives, **Framer Motion**. **Drizzle ORM + mysql2** over **MySQL**.
**Stripe** (config-driven). Deployed on **Vercel**. Package manager is **pnpm**
(`pnpm@10`) — do not use npm/yarn.

### The one architectural fact that bites

There are **two server implementations of the same API**:

- **Dev** (`pnpm dev`) — an Express server at `server/_core/index.ts` mounting
  the full tRPC router (`server/routers.ts` + ~13 sub-routers in `server/*-router.ts`
  and `server/routers/`).
- **Production (Vercel)** — a single, deliberately self-contained serverless
  function `api/index.ts` (~2,000 lines, no `../server/*` imports) that
  re-implements each procedure by hand against pooled MySQL.

A procedure added to `server/routers.ts` **does not exist in production** until
it is also added to `api/index.ts`. `server/api-parity.test.ts` fails CI if the
client calls a procedure prod doesn't implement — respect it. Known prod gaps
(`stripe.*` REST fallback, `files.*`, `teamCollab.*`) are intentional and need
per-user auth to close.

### Directory map

| Path | What lives here |
|------|-----------------|
| `client/src/App.tsx` | Route table (~190 routes) + providers |
| `client/src/pages/` | ~180 page components (pillars, `tools/`, `landing/`, `admin/`) |
| `client/src/components/` | Shared UI, incl. `ui/` shadcn-style primitives |
| `client/src/index.css` | **Design token source of truth** (`:root` CSS vars, `html.dark`, `.admin-scope`) |
| `client/src/lib/taxonomy.ts` | Two-movement / six-pillar content taxonomy (source of truth) |
| `client/src/lib/pillar-assignments.ts` | Per-essay pillar map (how you file a piece) |
| `client/public/*` | Content-as-data JSON libraries + `llms.txt` |
| `server/` | Dev runtime + business logic + Vitest tests (`*.test.ts`) |
| `api/index.ts` | Vercel serverless entry (prod runtime) |
| `drizzle/schema.ts` | ~28 tables (DB source of truth); `bundles-schema.ts` adds 4 |
| `scripts/` | ~75 scripts: content pipeline, index builders, validators, SEO, PDFs |
| `docs/` | `ARCHITECTURE.md`, `EDITORIAL-CONSTITUTION.md`, `VOICE.md`, audits |

### Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Local dev server (Express + tsx watch, full tRPC router) |
| `pnpm build` | `vite build` + esbuild-bundle the server |
| `pnpm check` | TypeScript typecheck (`tsc --noEmit`) — **CI gate** |
| `pnpm test` | Vitest run — **CI gate** |
| `pnpm lint` / `pnpm lint:fix` | ESLint (`--max-warnings 0`) |
| `pnpm format` | Prettier |
| `pnpm db:push` | `drizzle-kit generate && migrate` |
| `pnpm db:seed` | Seed content (`scripts/seed-all-content.mjs`) |
| `pnpm sitemap` / `pnpm pdfs` / `pnpm og` / `pnpm prerender` | SEO + asset/PDF builders |
| `pnpm publish:*` | Content publishing pipeline (docx/md/book/drafts/plan) |

### Environment

Copy `.env.example` → `.env`. Server runtime needs `DATABASE_URL`, `JWT_SECRET`
(also doubles as the one-shot admin/seed API key), and `ADMIN_PASSWORD_HASH`
(bcrypt — generate with `scripts/generate-admin-hash.mjs`). Stripe, Mailchimp,
and S3/Forge are optional. `VITE_*` vars are inlined at **build** time and must
be set before the Vercel build. Auth model: bcrypt password → HMAC-SHA256
`HttpOnly; Secure` session cookie.

### CI gates (`.github/workflows/ci.yml`)

On every PR: `pnpm check` → content validators (`validate-formation.mjs`,
`validate-life.mjs`, `validate-table.mjs`) → `pnpm test` → `pnpm build`. A
separate, non-blocking `quality` job runs Lighthouse + axe against the built
site. Keep all four blocking steps green.

### Conventions for AI assistants

- **Styling flows through tokens.** Components use inline styles referencing the
  CSS variables in `index.css`; never hardcode hex values in components. Brand
  changes happen at `:root`. Honor the palette/typography contract above.
- **Filing content** = add a slug to `pillar-assignments.ts` (not a DB
  migration); `taxonomy.ts` resolves it. See README "Filing a piece".
- **Content-as-data**: long-form libraries are JSON in `client/public/*` with
  generated manifests (`scripts/build-*-index.mjs`) gated by validators. Rebuild
  the relevant index after editing a library; rerun `pnpm pdfs` after content
  changes that feed PDFs.
- **When adding/changing an API procedure, update BOTH** `server/` (dev) and
  `api/index.ts` (prod), or expect `api-parity.test.ts` to fail.
- **The admin area opts out of dark mode** via `.admin-scope` — keep it a light
  workspace.
- Match surrounding code style; run `pnpm check` and `pnpm test` before pushing.

### Working Agreement

How to work in this repo, in order of weight:

1. **Verify before "done."** A task is finished when it is *checked*, not when
   the edit lands. Run `pnpm check` and `pnpm test`; for user-facing changes,
   look at the page (or its preview). State plainly what passed and what didn't
   — never claim green you haven't seen.
2. **Simplicity first.** Prefer the smallest change that solves the problem.
   This is a content-heavy, two-runtime codebase; clever abstractions cost more
   than they save. If a fix needs a large refactor, say so before writing it.
3. **Minimal blast radius.** Touch only what the task requires. Every change
   should impact as little existing code as possible and introduce no incidental
   churn (formatting, renames, reordering) outside the work.
4. **Delegate fan-out.** For broad searches across the ~180 pages / ~75 scripts,
   use subagents to locate things and report back the conclusion, not file dumps;
   keep the main thread focused on the decision and the edit.

---

## Decision Log (engineering source of truth)

- **Stack stays React + Vite + tRPC + Drizzle + MySQL on Vercel.** Not migrated
  to Next.js: the platform is working, deployed, and content-heavy; rewrite
  risk outweighs framework preference. Canonical domain is
  **livewellbyjamesbell.co** (the .com in older briefs is incorrect).
- **Tokens**: all brand values live in `:root` of `client/src/index.css`
  (light) and `html.dark` (dark). Components use inline styles referencing the
  CSS variables. The admin area is intentionally a light workspace and opts out
  of dark mode via `.admin-scope` (same file).
- **Content-as-data pattern**: long-form libraries ship as JSON in
  `client/public/*` with generated manifests (`scripts/build-*-index.mjs`) and
  structural validators that gate CI:
  - `scripts/validate-formation.mjs` — Leadership Formation eight-part method
    (character before competence, secular sources tested against Scripture,
    equal-weight steelmans on contested topics).
  - `scripts/validate-life.mjs` — Integrated Life eight-part method plus
    enforced cross-domain integration (>= 3 real internal connections).
- **SEO**: `scripts/generate-sitemap.mjs` runs in the Vercel build, merging
  static routes, the JSON-library manifests, and database content. `llms.txt`
  is served at the site root for answer engines. JSON-LD renders via SEOMeta.
- **IA (approved blueprint, implemented)**: the five pillars are the only
  taxonomy spine; footer mirrors the header (The Five Pillars / Write & Read /
  Libraries & Tools / For Pastors / Connect); "Resources" names exactly one
  thing (the hub at /resources); all tools are registered in /tools; /quiz
  301s to /tools/theology-quiz (vercel.json).
- **Payments**: Stripe checkout is config-driven — live only when
  STRIPE_SECRET_KEY (Vercel env) and the `stripeMembershipPriceId` site
  setting both exist; the membership page falls back to the waitlist.
- **CI** (.github/workflows/ci.yml): typecheck, content validators, tests,
  build on every PR. Browser-based gates (Lighthouse, axe) belong in CI
  against Vercel previews, not local runs.
- **PDFs**: `scripts/build-pdfs.mjs` (pdfkit) renders context guides and
  sermon series to `client/public/downloads/`; rerun after content changes.
