# The Measurement Playbook — turning telemetry into decisions

> Recommendation #2, the buildable half. The platform is now instrumented
> (`essay_read_complete`, `path_step_complete`, `return_reader`,
> `newsletter_signup` — see `docs/measurement-strategy.md`), but data without a
> decision loop is exhaust. These are the reusable templates that make it steer:
> a monthly review, a 30/60/90 arc, and an experiment register. Copy the template,
> fill only with real data, and file the result.

## The one rule
Every metric points at a decision. A number that would not change what you do
does not belong in the review. And a rising number is not automatically good —
pair every outcome with its guardrail (a higher signup rate with a widening
accepted-vs-confirmed gap is *worse*, not better).

---

## Monthly review template (copy per month)

```
LiveWell — Review, [Month YYYY]        Owner: [ ]     Data window: [ – ]
Data quality: [ trustworthy / caveat: ___ ]   (bots, previews, blocked scripts?)

WHAT MOVED
  Essay completion rate ......... [ ]   (finished / opened)      vs last: [ ]
  Path progression .............. [ ]   (steps done / path entries)
  Return-reader rate ............ [ ]
  Signups (accepted) ............ [ ]   by source: [ ]   by segment: [ ]
  Signups (confirmed) ........... [ ]   ← once the provider webhook exists
  Broken-link / 404 trend ....... [ ]

WHAT DIDN'T MOVE (and should have): [ ]

THREE FINDINGS (observation → plausible cause → confidence)
  1. [ ]
  2. [ ]
  3. [ ]

DECISIONS MADE: [ ]
EXPERIMENTS OPENED / CLOSED: [ ]
NEXT REVIEW: [ date ]   OPEN QUESTIONS FOR JAMES: [ ]
```

## The 30/60/90 arc (once, after the send goes live)

- **Day 30 — is it stable?** Errors, 404s, form/newsletter failures, canonical +
  sitemap health, mobile-vs-desktop completion, first Start-Here use. Fix before
  optimize. Baseline nothing yet — the window is too short and too noisy.
- **Day 60 — how do they read?** Entry-page quality, article continuation, series
  progression, returning readers, confirmed-subscription rate and early retention,
  failed internal searches, book/resource discovery. Generate hypotheses, not
  verdicts.
- **Day 90 — what do we invest in?** Is the positioning understood? Do the Start-
  Here paths serve distinct readers? Is the editorial load sustainable? Which
  content earns investment, revision, or retirement? Set the first real targets —
  from a clean post-launch window, never backfilled from the months signups went
  unmeasured.

---

## Experiment register (append-only)

Do not experiment with theological claims to lift a number. Prefer small,
reversible tests: a navigation label, a Start-Here order, a subscription
explanation, a related-reading module.

```
ID   | Problem (evidence) | Hypothesis | Change | Primary metric | Guardrail | Owner | Status | Result
E-01 | ...                | ...        | ...    | ...            | ...       | ...   | idea   | —
```

### First candidates (from what this session shipped)
- **E-01 — Signup source quality.** Now that `newsletter_signup` carries `source`,
  compare signup *and 60-day return* by source. Hypothesis: crisis/landing pages
  convert high but return low; the deep essays convert low but return high.
  Guardrail: confirmed-subscription rate. Decision it informs: where to place the
  ask, and where not to.
- **E-02 — Does Focus mode deepen reading?** Segment `essay_read_complete` by
  whether reading-focus was on. Hypothesis: focus sessions finish more often.
  Guardrail: none needed (read-only). Informs: whether to surface the toggle more.
- **E-03 — Do Topic Pathways move readers?** `path_step_complete` per pathway vs
  entries. Hypothesis: pathways lift multi-essay sessions over the bare listing.
  Informs: whether to extend pathways to every topic (Rec #4) or stop at eight.
- **E-04 — Read-next lift.** Does the post-purchase "read next" raise return
  visits from buyers? Informs: whether to add the same gentle next-step elsewhere.

Each has its measurement already wired; none needs a new event. Open one at a
time; close it with a decision, not a shrug.
