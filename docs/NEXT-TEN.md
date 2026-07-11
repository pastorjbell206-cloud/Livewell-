# The Next Ten — program roadmap

> The board's ten recommendations after the corpus audit, as an execution
> program. Ordered by leverage. Each item names its concrete sub-steps and its
> status. Two are hard-blocked on the founder (payments credentials, photos);
> the rest are being executed as reviewable PRs in the order below.

Status legend: ☐ not started · ◐ in progress · ☑ shipped · ⛔ owner-blocked

---

## Tier 1 — trust debts (do before distribution traffic scales)

### 1. Fill or bury the 156 stubs ☑
- ☑ Triage all 156 → 27 COMMISSION / 44 MERGE / 85 RETIRE
  (`docs/audit-corpus/STUB-TRIAGE.md`).
- ☑ 301 redirects (vercel.json) for the 129 MERGE + RETIRE stubs.
- ☑ All 27 COMMISSION essays written and merged (tranches 1–4, ~60k words):
  every stub URL worth a real essay now carries one, every citation verified,
  each 2,100–2,650 words through the audit rubric.

### 2. Close the 139 citation flags ☐
A verification sweep over the flagged essays: normalize Scripture to ESV with
references traveling, name or cut every vague "study/survey," verify dates and
attributions, remove anything unverifiable (never invent). Produces a fix
ledger; the mechanical normalizations get applied, the judgment calls surfaced
to the founder.

## Tier 2 — the growth engine (disciple, and see it working)

### 3. Turn signup into a discipleship sequence, not a newsletter ◐
The two six-week tracks are written and verified (docs/email-tracks/):
the Skeptic Track and the Doubting Christian Track — one essay a week in a
designed order, every quote character-exact, care posture held. ☐ Remaining:
owner loads them into Mailchimp journeys (steps in the README, ~10 min/track).

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

### 7. Make the skeptic's end-to-end path airtight ☑ (covered)
Already served by existing machinery: every essay ends with ArticleNextSteps,
which routes reading paths with a skeptics-path fallback, plus KeepReadingBook
and the related-essays rail. No duplicate build needed.

### 8. Unify the scattered assessments ☐
One "Where are you actually?" entry that sequences the Whole-Life Assessment,
Formation Inventory, theology quiz, and consistency check, and outputs a personal
reading path + a rule of life. The pieces exist; they need a spine.

### 9. Invest in the answer-engine surface ☐
JSON-LD per essay, the flagship set written into `llms.txt`, denser essay-to-
essay internal linking (the `relatedArticles` machinery exists). How depth
compounds into reach without chasing it.

### 10. Fix the listing performance regression ◐
- ☑ The stub guard moved server-side in BOTH runtimes (CHAR_LENGTH >= 600 in
  api/index.ts listSlimPosts and server/db.ts) — the real trust half. Prod
  already served slim (body-less) rows, so prod perf was already fine.
- ☐ Optional: point /writing and Home at listForIndex in dev too (dev-only
  perf; low priority).

---

## Execution notes

- Trust debts (1, 2) lead: distribution is about to point skeptics at the
  corpus, and one stub or bad citation costs more than ten good essays earn.
- Each item ships as its own reviewable PR, verified (`check`/`test`/`build`)
  before merge.
- The two ⛔ items need the founder; everything else proceeds without waiting.
