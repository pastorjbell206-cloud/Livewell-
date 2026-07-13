# Operations & Readiness (L5, L7, L10, L11, L12)

> Gap-closing program, closing prompts. The remaining steps are governance
> specs and a readiness gate, not code defects — consolidated here (one
> maintainable doc, per the pack's own anti-bloat rule) with each area's real
> current state and the owner/human items. Ends with the L12 readiness verdict.

## L5 — Editorial governance & corrections — FUNCTIONAL

**Present:** drafts (a post with `published=false`), a live editor + preview
(`AdminAbout`, `AdminBookEditor`), publish, and **unpublish that now actually
pulls content** (fixed in L9 — honored at the URL in both runtimes; the
`TAKEN_DOWN` lever covers static-only essays). Content is validated structurally
by six CI validators + the new content-integrity guard.

**Recommend (small, owner-owned):**
- A **correction-note convention** for *material* factual/theological changes:
  a dated line at the foot of the piece ("Updated [date]: corrected …"), so the
  correction history is never silently erased. Typos/formatting need no note.
- No **scheduled publish** exists (publishing is immediate). Not a defect; add
  only if a real workflow needs it.

## L7 — Subscriber lifecycle & deliverability — FUNCTIONAL TO THE SEAM

**Present:** capture writes to the `subscribers` table **and** dual-writes to
Mailchimp; the insert is idempotent (`ON DUPLICATE KEY UPDATE`), so
already-subscribed is handled gracefully; the form has real error handling
(`onError`) and the Substack handoff is what actually starts the emails. L3
made the signup measurable at server-accepted success, with no PII.

**Owner-gated (the send):** setting `MAILCHIMP_API_KEY` + `MAILCHIMP_LIST_ID`
turns the weekly send live; until then Substack is the sender. Bounce/complaint/
suppression/deletion handling lives in the provider and needs the send decision
first. This is L0 P0 #2.

## L10 — Browser & assistive-technology validation — AUTOMATED STRONG, MANUAL HUMAN-GATED

**Automated (in CI):** 37 test files including the ~260-route render-smoke net
and money-path contract tests; **axe + Lighthouse** run against the built site.
Recent real a11y fixes: WCAG-AA contrast, 44px tap targets, purchase-flow
labels, screen-reader announcement of assessment results.

**Needs a human (cannot be simulated):** one real pass each on iOS VoiceOver and
Windows NVDA, and a real-device mobile pass. The matrix: current Chrome/Safari/
Firefox desktop, iOS Safari, Android Chrome, keyboard-only, 200–400% zoom,
reduced-motion. Mark each tested-by-a-person or untested; do not claim a
screen-reader pass that no person ran.

## L11 — Post-launch learning — INSTRUMENTED, LOOP NEEDS AN OWNER

**Present:** the depth telemetry now fires (`essay_read_complete`,
`path_step_complete`, `return_reader`, `newsletter_signup`) and Core Web Vitals
report on the admin dashboard. The measurement spec + scorecard is in
`docs/measurement-strategy.md`.

**Recommend:** a light 30/60/90 cadence — Day 30 operational (errors, 404s, form
failures), Day 60 reading behavior (completion, continuation, returns), Day 90
strategy (positioning, what to invest/retire). Every change tied to a stated
problem and a guardrail metric. Set baselines from a clean post-fix period —
never backfill from the months when signups were unmeasured.

---

## L12 — Operating-readiness scorecard (the gate)

Verdict per category: **PASS** (works, verified) · **PASS w/ limits** ·
**OWNER** (one decision unblocks it) · **HUMAN** (needs real people).

| Category | Verdict | Note |
| :--- | :--- | :--- |
| Canonical publishing model | **PASS w/ limits** | website-canonical, documented (L1); confirm Substack backlinks |
| Content integrity | **PASS** | 68 defects fixed + CI guard (L1) |
| Emergency takedown | **PASS** | works in both runtimes + static lever (L9) |
| Subscription measurement | **PASS** | server-confirmed, no PII (L3) |
| Link integrity | **PASS** | 12 dead links fixed; 0 remain, verified |
| Redirects | **PASS** | 139 rules, all resolve |
| Cross-property identity | **PASS** | consistent bio, clean schema (L2) |
| Privacy / PII hygiene | **PASS** | no PII in logs/analytics/URLs (L8) |
| Assets / provenance | **PASS w/ limits** | no broken assets; 4 owner provenance items (L6) |
| Redundancy (git + static lib) | **PASS** | survives a total DB loss |
| **DB backup + restore drill** | **OWNER** | the one real infra exposure — confirm + test (L9) |
| **The weekly send** | **OWNER** | two env vars (L7) |
| **Membership offer** | **OWNER** | price + promise |
| Editorial corrections | **PASS w/ limits** | works; add a correction-note convention (L5) |
| Manual browser/AT QA | **HUMAN** | real VoiceOver/NVDA/device pass (L10) |
| Real-user research | **HUMAN** | L4 needs participants |
| Post-launch review loop | **OWNER** | instrumented; needs a cadence owner (L11) |

**Overall:** the *code and content* side of operating-readiness is **green** —
every autonomously-fixable category passes, four real defects fixed and gated
this program. Nothing is BLOCKED. What remains is a short list of **owner
decisions** (the backup drill, the send, membership, the review cadence) and
**human-only** validation (screen-reader QA, user research). None is a code
defect; all are named here with their next step.
