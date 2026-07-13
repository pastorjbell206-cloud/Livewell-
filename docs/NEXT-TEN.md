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

### 2. Close the citation flags ◐
- ☑ Tier-1 lead flags closed (#391): Peterson's 1962, the Elijah quotes, John 6:67.
- ☑ A reusable scanner (`pnpm scan:citations` → docs/audit-corpus/CITATION-SCAN.md)
  flags the audit's top risk patterns — unsourced empirical claims and bare
  statistics — corpus-wide. It cut the noisy "139 flags" to a precise **10
  essays**, most already sound (Pew, the military-lending cap, Carson are all
  real and sourced). The genuine open item is the pastor-quitting statistic in
  the-pastor-nobody-checks-on: source it from a primary study or soften to a
  non-numeric claim (owner/primary-source call — never invent a citation).
- ☐ A deep per-essay ESV-wording verification still wants live Bible-text
  access (blocked at build); best run when that is available.

## Tier 2 — the growth engine (disciple, and see it working)

### 3. Turn signup into a discipleship sequence, not a newsletter ◐
The two six-week tracks are written and verified (docs/email-tracks/):
the Skeptic Track and the Doubting Christian Track — one essay a week in a
designed order, every quote character-exact, care posture held. ☐ Remaining:
owner loads them into Mailchimp journeys (steps in the README, ~10 min/track).

### 4. Measurement tuned to depth, not vanity ◐
The depth-telemetry seam (`lib/telemetry.ts`) forwards privacy-light custom
events to Vercel Web Analytics — the tracker already loaded, so **Vercel
Analytics is the owner dashboard** (no bespoke DB/endpoint needed; that would
duplicate it). Of the four Constitution metrics: ☑ scroll-to-finish
(`essay_read_complete`, wired in ArticleDetail), ☑ return visits
(`return_reader`, now fired once per load via `trackReturnReaderOnce` in App),
☑ essay→book clickthrough (`essay_book_click`, now on the KeepReadingBook CTA).
☐ Reading-path completion (`path_step_complete`) is defined but unwired, and
that is blocked upstream: there are **three** overlapping reading-path systems
(`/reading-paths` → `ReadingPathDetail`, `/pathways` → `TopicPathway` reading
`public/pathways/*.json`, and an orphaned `lib/readingPaths.ts`). Until one is
made canonical (see `docs/site-audit.md`), there is no single clean per-step
"done" signal to emit. Consolidate first, then wire this one event. No PII,
no cookie.

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
