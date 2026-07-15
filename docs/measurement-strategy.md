# Measurement Strategy & Scorecard (L3)

> Gap-closing program, Prompt L3. A privacy-conscious measurement system tied to
> decisions, not vanity metrics. Consolidated (strategy + event taxonomy + metric
> dictionary + scorecard + data-quality) into one doc. Provider: **Vercel
> Analytics only** — no second stack, no cookie banner, no ad trackers. That is
> the right restraint; do not add a heavy analytics stack to answer these
> questions.

> **This wave fixed the platform's most important measurement bug.** The
> subscription — the conversion the whole mission points at — was firing a
> `newsletter_signup` **window CustomEvent that nothing listened to**, on submit
> (intent), before the backend responded. It reached no analytics at all. All
> three signup components (`LandingSignup`, `NewsletterSignup`, `SegmentedSignup`)
> now call `trackNewsletterSignup(source, audienceType)` from `lib/telemetry.ts`
> in the mutation's `onSuccess` — server-confirmed, no email, reaching Vercel
> Analytics. Signups are now counted, at the right boundary, for the first time.

## The events (canonical, all via lib/telemetry.ts → Vercel)

| Event | Fires when | Props | Boundary |
| :--- | :--- | :--- | :--- |
| `essay_read_complete` | reader reaches the foot of an essay body | `slug` | true completion (IntersectionObserver sentinel) |
| `path_step_complete` | a reading-path step is finished | `pathway`, `step` | true |
| `return_reader` | a returning reader is seen | — | count only |
| `essay_book_click` | reader clicks an essay's "Read the book" CTA (KeepReadingBook) | `from` (essay slug), `book` (book slug) | click intent — the article→book funnel |
| `newsletter_signup` | the subscribe mutation succeeds | `source`, `audienceType?` | server-accepted (see below) |

No PII ever — slugs, sources, segment labels, and counts only. The test-only
`boom_event`/`bare_event`/`ssr_event` names live in `telemetry.test.ts` and never
ship.

## Metric dictionary (each tied to a decision)

| Metric | Decision it informs | Numerator / denominator | Confirmed? |
| :--- | :--- | :--- | :--- |
| **Essay completion rate** | Which essays hold a reader to the end → what to write more of | `essay_read_complete` / essay views | yes (sentinel) |
| **Path progression** | Do Start-Here paths actually move readers deeper | `path_step_complete` per path / path entries | yes |
| **Return-reader rate** | Is the platform worth coming back to (the north-star signal) | `return_reader` / visitors | count-level |
| **Signup rate** | Is the subscribe ask working, and from where | `newsletter_signup` / eligible views, by `source` | **server-accepted, not double-opt-in** |
| **Segment mix** | Which of the four readers is converting | `newsletter_signup` by `audienceType` | yes |

## The one honest limitation

`newsletter_signup` now fires when the backend *accepts* the request — the
truthful client-side boundary. **True confirmed subscription** (the reader clicks
the Substack/Mailchimp double-opt-in) is a *provider webhook*, not visible from
the browser, and wiring it depends on the same decision that gates the weekly
send (the Mailchimp keys / Substack-only call, L0 P0 #2). Until then, read
"signup" as "submitted and accepted," and expect provider-confirmed numbers to
be somewhat lower. Do not report signup as confirmed subscription.

## Data-quality standard
- **Server boundary for conversions** — done for signup (onSuccess), essays
  (real completion sentinel). Never fire a conversion on a click/submit again.
- **No PII** in any event — enforced by the helper API (it takes slugs/sources,
  never email). The old event even carried the email in its detail; that is gone.
- **Bots / internal / preview** — Vercel Analytics filters bots; exclude admin
  routes and previews when reading. Localhost does not emit.
- **One provider** — no cross-tool dedup problem to manage.

## Executive scorecard (monthly, one page)
Read these five together, never a number alone: essay completion, path
progression, return-reader rate, signup rate by source, and — as the guardrail —
the confirmed-vs-accepted gap once the provider webhook exists. A rising signup
rate with a widening accepted-vs-confirmed gap is *worse*, not better: it means
the ask works but the confirmation is failing.

## What remains (owner / dependent)
- Provider-confirmed subscription event → gated on the send decision (L0 P0 #2).
- A real dashboard/report → needs Vercel Analytics access (HUMAN-ONLY).
- Targets/baselines → set from a clean post-fix period; do not backfill from the
  months when signups were unmeasured.
