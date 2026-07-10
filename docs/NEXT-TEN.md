# The Next Ten — program roadmap

> The board's ten recommendations after the corpus audit, as an execution
> program. Ordered by leverage. Each item names its concrete sub-steps and its
> status. Two are hard-blocked on the founder (payments credentials, photos);
> the rest are being executed as reviewable PRs in the order below.

Status legend: ☐ not started · ◐ in progress · ☑ shipped · ⛔ owner-blocked

---

## Tier 1 — trust debts (do before distribution traffic scales)

### 1. Fill or bury the 156 stubs ◐
The length guard hides stubs from listings and the sitemap; it did not fix the
underlying holes (live URLs, no essay). Sub-steps:
- ☑ Triage all 156 → 27 COMMISSION / 44 MERGE / 85 RETIRE
  (`docs/audit-corpus/STUB-TRIAGE.md`).
- ☑ 301 redirects (vercel.json) for the 129 MERGE + RETIRE stubs → the full
  essay that covers the topic, or the pillar hub.
- ☐ Commission the 27 COMMISSION essays in the voice, through the rubric,
  skeptic- and seeker-facing first (the writing queue in STUB-TRIAGE.md).

### 2. Close the 139 citation flags ☐
A verification sweep over the flagged essays: normalize Scripture to ESV with
references traveling, name or cut every vague "study/survey," verify dates and
attributions, remove anything unverifiable (never invent). Produces a fix
ledger; the mechanical normalizations get applied, the judgment calls surfaced
to the founder.

## Tier 2 — the growth engine (disciple, and see it working)

### 3. Turn signup into a discipleship sequence ☐
Design the 6-week Skeptic Track and Doubting-Christian Track as ordered essay
sequences with an email spine — a subscriber enters a formed path, not a
newsletter. Content-as-data + the existing segmented signup.

### 4. Measurement tuned to depth, not vanity ☐
Privacy-respecting analytics for the metrics the Constitution names — scroll-to-
finish, reading-path completion, return visits, essay→book clickthrough — and an
owner dashboard reading those four numbers.

## Tier 3 — owner-gated

### 5. Activate payments + scope the membership product ⛔/☐
Payments: `docs/GO-LIVE-PAYMENTS.md` (founder runs the Stripe steps). Product:
draft three membership tiers (priced, scoped) so the first buyer gets something
worth buying — I can do the product design and wiring; activation needs the key.

### 6. Founder photography ⛔
The `Figure` duotone primitive is built and empty. Needs 3–4 real documentary
photos from the founder; I place and treat them on About and Home.

## Tier 4 — polish and compounding

### 7. Make the skeptic's end-to-end path airtight ☐
A skeptic-specific "keep going" rail on the doubt/skeptic essays — "you don't
believe this, read this next" — parallel to the book funnel, built for the
unconvinced the distribution engine is about to send.

### 8. Unify the scattered assessments ☐
One "Where are you actually?" entry that sequences the Whole-Life Assessment,
Formation Inventory, theology quiz, and consistency check, and outputs a personal
reading path + a rule of life. The pieces exist; they need a spine.

### 9. Invest in the answer-engine surface ☐
JSON-LD per essay, the flagship set written into `llms.txt`, denser essay-to-
essay internal linking (the `relatedArticles` machinery exists). How depth
compounds into reach without chasing it.

### 10. Fix the listing performance regression ☐
`posts.listPublished` ships every full essay body to the browser on `/writing`
and the homepage (the "slim endpoint" comment is stale). Point those surfaces at
the body-less `listForIndex`, moving the stub guard server-side with it — faster
first paint, honors the first-paint contract, closes a real regression.

---

## Execution notes

- Trust debts (1, 2) lead: distribution is about to point skeptics at the
  corpus, and one stub or bad citation costs more than ten good essays earn.
- Each item ships as its own reviewable PR, verified (`check`/`test`/`build`)
  before merge.
- The two ⛔ items need the founder; everything else proceeds without waiting.
