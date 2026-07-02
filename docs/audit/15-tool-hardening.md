# 15 — Tool UX & Error Hardening (Findings Only)

**Audit 3.3 · 2026-07-01 · FINDINGS ONLY — no fixes applied. Every fix below is written to be executed verbatim after owner approval.**

Scope: the money path (ebook checkout → thank-you → download, newsletter/email capture), the four entry diagnostics, the six self-assessments, the eleven leadership instruments + four JSON engines, all 26 `client/src/pages/tools/*` pages, `TheologyQuiz`, the storage hooks (`useFavorites`, `useFormationTracker`), and the assessment-history pages (`FormationInventory`, `WholeLifeAssessment`). Method: direct file reads plus three line-verified sweeps; every `file:line` cited here was checked against source at audit time. Repo-wide greps confirmed two absolute facts used throughout: **zero `maxLength` attributes exist anywhere in `client/src`**, and **no `onClick` handlers sit on non-interactive elements in any tool page** (keyboard baseline is clean).

Effort legend: **S** = under an hour, single file. **M** = half a day. **L** = multi-day.

---

## Part A — The Money Path (most critical surface)

The purchase flow is `BuyEbookButton` (embedded across the book catalog) → Stripe Checkout → `/{slug}/thank-you` (`EbookThankYou`, embedded in 10+ thank-you pages) → `/api/download`. Server behavior verified in `api/index.ts` (`ebookCheckout` :2587–2610, `ebookDownload` :2612–2636).

### client/src/components/BuyEbookButton.tsx — mostly well-hardened

What it gets right (verified): double-click during redirect is impossible — `disabled={loading}` (:110) and the success path `return`s before `setLoading(false)` (:76–77, :89), so the button stays "Redirecting to checkout…" and disabled through navigation. Stripe-not-configured degrades cleanly: server returns 503 when the key or the book's price env is missing (api/index.ts:2590, :2597) and the client turns 503 into a "Request your copy by email" mailto CTA (:81–82, :92–103). Bad JSON from the server is absorbed (`res.json().catch(() => ({}))` :74). Network failure and non-503 errors both render an error line with a mailto fallback (:84–88, :115–123). No dead ends.

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Raw server error string rendered to the buyer | BuyEbookButton.tsx:84 (`data?.error \|\| …`) + api/index.ts:2608 (`String(e?.message \|\| e)`) | A Stripe exception surfaces verbatim, e.g. `No such price: 'price_1abc…'` — internal config leaked into buyer-facing copy at the moment of purchase | In the client, show the generic "Checkout is unavailable right now." for any 5xx and reserve `data.error` for 4xx copy written for humans; server-side, log the real error and return a stable message | S |
| Hardcoded hex for error text | BuyEbookButton.tsx:116 (`color: "#9b1c1c"`) | Breaks dark mode and the token contract (CLAUDE.md: no hardcoded hex) | Add/use an error token (e.g. `var(--alert)` already used in EmailResults.tsx:176) | S |
| No fetch timeout | BuyEbookButton.tsx:69 | If `/api/checkout` hangs, the button reads "Redirecting to checkout…" disabled until the browser gives up — no retry affordance | `AbortSignal.timeout(15000)` on the fetch; the existing catch already renders the retryable error state | S |

### client/src/components/EbookThankYou.tsx — the post-payment gaps

What it gets right: a missing `session_id` renders the honest "We couldn't confirm a purchase" state, never a broken download (:28, :78–92); every state keeps the "Email us" escape hatch (:94–98); the page re-verifies on each load, so a bookmarked link keeps working (:30–40).

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **Download link is a bare anchor to a JSON API — a paid buyer can land on a raw JSON error page** | EbookThankYou.tsx:42, :71 (`<a href={downloadHref}>`); server failure paths api/index.ts:2626 (402 `{"error":"payment not completed"}`) and :2634 (500) | The single worst money-path outcome: someone who just paid clicks "Download the PDF" during a Stripe hiccup / stale session / missing file and their browser navigates to unstyled JSON — off the site, no message, no way back but the back button | Replace the bare anchor with a handler that `fetch`es the endpoint, checks `res.ok`, streams to a blob download on success, and on failure renders an inline "The download didn't start — try again or email us" with a retry button (keep a plain-anchor fallback inside `<noscript>`); alternatively make `/api/download` return a styled HTML error page for non-PDF failures | M |
| **Verification conflates a network/Stripe outage with "not paid"** | EbookThankYou.tsx:33–36 (`.catch(() => … setStatus("unpaid"))`, no `r.ok` check); server returns `{ok:false, paid:false}` on any exception (api/index.ts:2633) | A real buyer on a flaky connection sees "We couldn't confirm a purchase" seconds after being charged — the scariest possible copy for a transient error | Track a third state: fetch rejection / `!r.ok` / `d.ok === false` → "We couldn't reach the server to confirm — check your connection and try again" with a **Try again** button (retry nonce re-running the effect); reserve the "couldn't confirm a purchase" copy for a genuine `{ok:true, paid:false}` | S |
| No `r.ok` check before `.json()` | EbookThankYou.tsx:34 | A 500 with an HTML body throws into the catch and masquerades as "unpaid" (same conflation as above) | Covered by the fix above (`if (!r.ok) throw`) | S |

### components/EmailResults.tsx — "Check your inbox" for an email that never sends

Embedded in the three heaviest assessments: `tools/MarriageAssessment.tsx` (:1131), `tools/LifeAudit.tsx` (:1395), `tools/PastorBurnout.tsx`. Verified end to end:

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **"Results sent. Check your inbox." — but no email is ever sent to anyone.** `/api/contact` only INSERTs into `contact_messages`; no mail-sending code exists anywhere in `api/index.ts` (grep-verified: no nodemailer/resend/mail call) | EmailResults.tsx:18–27 (POST `/api/contact`), :91 ("Results sent. Check your inbox."); api/index.ts:2372–2375 (INSERT only) | A pastor finishes a 24-question burnout assessment, types their email to save the results, is told to check their inbox — and nothing ever arrives. This is a trust-contract break on the platform's most sensitive tools | Two-stage: (1) immediately make the copy truthful — "We received it. James will send your results by email." — and gate it on a real save (below); (2) wire an actual transactional send of `resultsSummary` to the reader server-side | S now, M for real send |
| **Success is reported even when nothing was saved.** The DB write is `catch { /* DB save is best-effort */ }` and the handler returns 200 `{ok:true}` unconditionally | api/index.ts:2377–2378 | Worst case stack: DB down → results stored nowhere, emailed to no one, user told to check their inbox | Return 500 when the insert fails so the client's existing `error` state (:171–181) fires; the client already handles it correctly | S |

### client/src/components/NewsletterSignup.tsx — verified solid

Explicitly checked per the audit brief: **the `onError` toast is real** (:40–46) and the ToastProvider mounts globally (App.tsx:563), so failures are never silent; **double-submit is blocked** — `disabled={subscribe.isPending}` on all three variants (:108, :155, :230); empty submit is double-guarded (`required` + `if (!email) return;` :51); the email is preserved on error for retry and cleared only on success (:38). One nit:

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Attribution event fires even when the mutation later fails | NewsletterSignup.tsx:52–62 (dispatch immediately after `mutate`) | Conversion attribution counts failed subscribes (analytics skew only; no user harm) | Move the `dispatchEvent` into `onSuccess` | S |

`SegmentedSignup` (the Diagnostic's email capture) was audited with the entry diagnostics — see Part B; it is the best-hardened capture on the platform.

---

## Part B — Entry Diagnostics (/diagnostic, /start, /start-here, /theology/which-view, /quiz)

### client/src/pages/StartHereDiagnostic.tsx (/start-here)

Handles well: scoring skips missing/unknown safely (:229–237); result can never be undefined (best init "skeptic", bestScore −1, :239–247); visible selected state (:439); Back preserves state (:318–327); "Not quite right?" escape lists all 6 paths (:729–770); real buttons (:441–443).

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **Double-click race — white screen or soft-lock (top one-line fix in the audit).** `handleSelect` never checks `transitioning`; each click schedules `setStep((s) => s + 1)` in a 300 ms `setTimeout` | :295–316 (increment at :301–305) | Two rapid clicks on the last question push `step` past the end: `QUESTIONS[step]` is `undefined` (:285) and the render (`currentQuestion.title`, :433) throws → **white screen** on the flagship entry point. Two rapid clicks earlier skip a question whose answer is never recorded, so `isComplete` (:284) never becomes true → **stuck forever**, no message | `if (transitioning) return;` first line of `handleSelect`; clamp `setStep((s) => Math.min(s + 1, totalSteps - 1))`; optional-chain :297/:433 as a belt | S |
| Soft-lock has no diagnostics even without the race | :284, :306–312 (no-op when an answer is missing) | A user stuck at "complete but not complete" gets nothing | On final-question select with `!isComplete`, jump to the first unanswered question with a one-line note | S |
| No email capture at all | whole file | The flagship entry diagnostic is the only one of the three with zero capture | Add the `SegmentedSignup`/`NewsletterSignup` block on the results screen | S |
| No back from results; restart only | :329–333 | Changing one answer costs all five | "Change my answers" that returns to questions with state intact | S |
| Answers lost on refresh | :274–275 (plain useState) | Refresh mid-quiz wipes progress | sessionStorage mirror | S |
| Progress bar math jumps after Back | :374 | Bar moves backward inconsistently | Base width on `step / totalSteps` | S |
| Copy says "Five questions" but SEO copy elsewhere says six; file has 5 (:35–96, :342) | :35–96 | Cosmetic mismatch | Align copy | S |
| `minHeight: calc(100vh - 73px)` (iOS dynamic toolbar), hover-only affordances, sticky bar `zIndex 100` may overlap MinimalNav | :386, :458–469, :363–365 | Mobile jank | `dvh/svh`; add focus styles | S |

### client/src/pages/StartHereQuiz.tsx (/start)

Handles well: Next disabled until answered (:217); Back works with visible selection (:119–123, :175–178); result falls back to `READING_PATHS.default` (:104–109); real buttons (:171); 44 px tap targets (:202, :222). Email capture via inline `NewsletterSignup` is solid.

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **Personalization is mostly dead.** Key built as `${concern}-${situation}-${format}` (:107) against two-part keys like `"marriage-crisis-articles"` (:48–101); `"pastoral-articles"` (:84) omits the situation segment entirely | :104–109 vs :48–101 | Any format answer ≠ "articles" (3 of 4 choices) matches nothing; pastors can never match; only ~4 of ~96 combinations personalize — **most users get the generic default no matter what they answer**, defeating the tool's purpose | Staged fallback: full key → `${concern}-${situation}-articles` → concern-level → default; fix the pastoral key to include situation or match on concern alone | S |
| "See My Path" button is dead code; last answer unreviewable | :111–117 (auto-completes on 3rd select), :211–230 (button never fires) | The visible CTA does nothing; results appear before the user confirms | Gate results on an explicit `submitted` flag set by the button | S |
| Mojibake arrow | :266 (double-encoded) | Renders literally as "Read â†'" in shipped UI | Replace with `→` | S |
| `<Link><button>` nesting | :285–289 | Invalid HTML, double tab-stop | Style the Link as a button | S |
| No back from results (full reset only) | :304–312 | Revising one answer redoes all three | Non-destructive "Change answers" | S |
| Answers lost on refresh | :9–10 | Mid-quiz refresh wipes progress | sessionStorage mirror | S |
| Hardcoded hex + off-system tokens | :18–22, :29–32, :39–42, :175–178, :256, :286, :309 (#9B8BA8, #8B4545, #E0D9CC, #FFF; `--gold/--paper/--ink3/--line`) | Token-contract violations; dark-mode breakage | Swap for `:root` tokens | M |

### client/src/pages/Diagnostic.tsx (/diagnostic)

Handles well: completion gated on all 8 answers (`isDone` :182); scoring defends missing answers (`answers[q.id] ?? 0` :164); lead result never undefined (:186–188); real `<button type="button">` options (:284–287). Its email capture (`SegmentedSignup`) is the best on the platform: native email validation (SegmentedSignup.tsx:277–280), guard (:75), disabled-while-pending (:298), popup-blocked fallback panel (:112–168).

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Back shows no prior selection | :283–310 (no selected styling; contrast StartHereDiagnostic.tsx:439) | Going back means re-answering blind | Style options matching `answers[...]` + a Next button | S |
| No way back from results — full reset only | :453–470, :198–201 | Changing one answer costs all 8 | "Change my answers" preserving state | S |
| Answers lost on refresh | :180–181 | Mid-quiz refresh wipes progress | sessionStorage mirror | S |
| Subscribe DB write fails silently (intentional — Substack handoff :97–99 is the real subscribe, manual fallback :149–166) | SegmentedSignup.tsx:64–71 (`onError` → `console.warn`) | Acceptable by design | Optional soft toast | S |
| Hover-only option feedback | :301–306 | No touch feedback; cosmetic | Add active/selected styles | S |

### client/src/pages/theology/… TheologyDiagnostic.tsx (/theology/which-view)

Well-hardened: completion requires all answered (:38); explicit tie handling with honest copy (:47–50, :134, :139); `result.result` null-guarded (:135); unknown views skipped (:44–45); real buttons with selected state (:114–118); Start over preserves the chosen quiz (:54). One gap:

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Fetch failure swallowed → "Loading…" forever | :28–31 (`.catch(() => {})`), :83 | 404/network/bad JSON = permanent spinner, no retry | Error state + retry (shared engine pattern, Part G) | S |

### client/src/pages/TheologyQuiz.tsx (/quiz — tRPC-backed)

Prod parity verified: `quiz.getQuestions` / `quiz.getRecommendations` exist in `api/index.ts` (:1284–1288, :2188–2190) — no parity gap. Retake works (:35–40, :211–216); options are real buttons with selected state (:110–150); progress guarded against division by zero (:42–45).

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **Questions query failure → dead page with no message.** Error isn't loading, so the spinner ends; `questions = questionsQuery.data \|\| []` and the card renders only behind `questions[currentQuestion] &&` | :15, :21–22, :47, :103 | On API failure the user sees the hero, "Question 1 of 0", "0% complete", and **nothing else** — no error, no retry, forever | Add `questionsQuery.isError` branch: message + button calling `questionsQuery.refetch()` | S |
| **Recommendations failure or pending → "Your Results" header over a void.** Results body renders only behind `{recommendationsQuery.data && …}`; there is no loading or error branch | :16–19, :158–162, :164 | A user answers all 10 questions and gets a page saying "Your Results / Here's what your answers reveal…" with nothing under it — while loading it looks broken; on error it stays broken, with no retry | Add `isLoading` spinner and `isError` message + `refetch()` button between :162 and :164 | S |
| No back navigation mid-quiz | :24–33 (auto-advance only) | A mis-click cannot be corrected; selected styling exists (:120) but is unreachable | Back button decrementing `currentQuestion` | S |
| Answers lost on refresh | :10–11 | 10 questions gone on refresh | sessionStorage mirror | S |
| `article.readTime` rendered unguarded | :200 | `undefined min read` if the API omits it | `{article.readTime ?? "—"}` or hide | S |
| Off-token styling throughout: literal `"white"` backgrounds, `#FDF5E6`/`#FDFAF5`, `--gold/--paper/--ink3/--paper2/--line` | :104, :122, :139–140, :167, :196, :213, :218 | Dark-mode and brand-token violations | Swap to `:root` tokens | M |

---

## Part C — The Six Self-Assessments (client/src/pages/tools/)

All six: no NaN/undefined ever reaches the user (constant denominators, `answers[q.id] || 0`, seeded reduces, bounded string-keyed lookups); a11y baseline good (real buttons, `aria-label`ed progress dots, selected state survives Back). The gaps are systemic and near-identical:

### The systemic dead "See Results" button (5 of 6 — all the wizards)

Every wizard gates the final button on `!canProceed` (**current category answered**) while `handleNext` requires `allAnswered` (**every question answered**). The progress dots allow jumping to the last category. A user who jumps, answers only the final section, sees an **enabled** mustard "See Results" button — and clicking it silently does nothing. It looks frozen at the exact payoff moment.

| Tool | Button gate | Mismatched condition | Dots that enable the bug | Fix (identical, one line each) | Effort |
|---|---|---|---|---|---|
| MarriageAssessment.tsx | :674 `disabled={!canProceed}` | :298 vs :307 `if (isLastCategory && allAnswered)` | :467 | `disabled={isLastCategory ? !allAnswered : !canProceed}` (or have the click jump to the first unanswered category with a note) | S |
| FinancialHealth.tsx | :684 | :272 vs :281 | :441 | same | S |
| LifeAudit.tsx (24 Qs — highest cost) | :857 | :460 vs :471 | :643 | same | S |
| ChurchHealth.tsx | :764 | :366 vs :377 | :551 | same | S |
| PastorBurnout.tsx | :862 | :460 vs :471 | :649 | same | S |

`EmotionalHealth.tsx` is immune (single page; `disabled={!allAnswered}` :452, live "N OF 15 ANSWERED" label :471, guard in submit :258) — it is the gating model for the rest.

### Per-tool remainder

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Zero persistence in all six — answers in plain `useState` | MarriageAssessment :289, FinancialHealth :263, EmotionalHealth :248, LifeAudit :451, ChurchHealth :357, PastorBurnout :451 | A refresh, mis-tap on browser Back, or mobile tab eviction silently discards 12–24 answers on tools that take 10+ minutes | Guarded localStorage per tool (`try/catch` both ways, shape-validate on read — copy the FormationInventory pattern, Part F) persisting `answers` + `currentCategory` | M (×6) |
| Results are full-reset only in all six | Marriage :325/:1106, Financial :299/:1083, Emotional :261–262/:481, LifeAudit :489/:1370, ChurchHealth :395/:1312, Burnout :489/:1524 | Revising one rating means redoing the entire assessment | Non-destructive "Change my answers" (`setShowResults(false)` without clearing) | S (×6) |
| **PastorBurnout latent reverse-scoring bug**: `6 - (answers[q.id] \|\| 0)` scores an *unanswered* reverse question as 6 — higher than any real answer | :388–389 (21 reverse-scored IDs, :381) | Currently masked by the `allAnswered` gate; if that gate ever regresses (e.g., a bad fix to the dead-button bug), the burnout tool **under-reports burnout** on a mental-health surface | Skip unanswered in the reverse branch (or assert allAnswered before scoring) — fix alongside the dead-button change, not after | S |
| EmotionalHealth fragile `...data[name]` coupling | :208, crash at :792 (`cat.scripture.text`) | Silent white screen if a category name ever diverges from a data key (currently safe) | Fallback object or type the keys against the union | S |
| Result article links are plain `<a href>` | all six results screens | Full page reload inside the SPA | wouter `Link` | S |

Handles well, worth keeping: PastorBurnout's crisis resources are correct (988 at :1266, `rel="noopener noreferrer"` :1272–1282) and its healthy/high key remap prevents undefined recovery text (:1339); ChurchHealth renders strengths/concerns behind length guards (:975, :1055).

---

## Part D — Leadership Instruments (11 files + 4 JSON engines, client/src/pages/leadership/)

### The four JSON engines (LeaderAssessment, ProfileSurvey, GuidedWorkflow, ServiceBuilder)

All four fetch `/leadership/*/${slug}.json`, check `r.ok`, then swallow every failure with `.catch(() => {})` — **no error state exists anywhere**, so 404 / network / bad JSON = infinite "Loading…", no retry (effects keyed only on slug). One shared error+retry pattern covers all four plus IllustrationLibrary (fix spec in Part H).

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **ServiceBuilder cross-slug save clobber — the one genuine data-corruption bug in the audit.** On slug change, `data`/`st` are NOT reset (:27–39); the save effect depends on `[st, KEY, data]` (:41), so the instant KEY changes it writes the **previous** service's state under the **new** slug's key | ServiceBuilder.tsx:27–41 | Pastor builds a funeral service, then opens the wedding builder: the funeral's state is instantly saved under the wedding key; if the wedding JSON fetch then fails (`.catch(() => {})` :38) the clobber is permanent — **saved work destroyed** | Reset `data`/`st` at the top of the slug effect; only save after this slug's data has loaded (guard `data.slug === slug` or a `loadedSlug` ref) | M |
| ServiceBuilder saved-state shape unvalidated: :30 parses in try/catch but :34 applies blind | :30, :34; crash at :74 (`st.include[el.id]`) | Corrupt-but-valid JSON (`{}` without `include`) → render crash → blank page | Validate `saved.include/pick/text` before `setSt` | S |
| Infinite "Loading…" on fetch failure (all four engines + TheologyDiagnostic) | LeaderAssessment :35/:62/:67, ProfileSurvey :39/:78/:83, GuidedWorkflow :33/:64/:69, ServiceBuilder :31/:62/:67 | Permanent spinner, no retry, no way back | Shared error state + retry nonce + "back to Leadership" link | M total |
| GuidedWorkflow: saved answers exist in localStorage (:34) but are unreachable behind a failed fetch | :33–39 | User's own written work locked behind a network error | On fetch error, offer "Copy everything you wrote" from saved answers | M |
| LeaderAssessment answers not persisted (:29); ProfileSurvey not persisted (:33) — the longest instruments (60+ answers) | LeaderAssessment :29, ProfileSurvey :33 | Reload wipes a full assessment silently | localStorage `livewell-assessment-${slug}` like GuidedWorkflow | S/M |
| GuidedWorkflow/ServiceBuilder copy: `navigator.clipboard?.writeText` not awaited, no feedback | GuidedWorkflow :50–55, ServiceBuilder :103 | Denied permission = user believes it copied | Shared `copyToClipboard` helper (Part H) | S |

Engines handle well: submit disabled until all answered (LeaderAssessment :90–92, ProfileSurvey :106–108); divide-by-zero guards and clamps (ProfileSurvey :54–64, LeaderAssessment :51); GuidedWorkflow's debounced saves are try/caught with an honest "Saved" indicator (:34, :39); ServiceBuilder falls back to sample text safely (:36, :43).

### The localStorage tools

| Tool | Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|---|
| VisitationTracker.tsx | Parse try/caught but **no shape check** | :31; crash at :47 (`people.filter`) | Corrupt non-array → blank page on a tool holding **pastoral-care names** — reads as losing the flock list | `Array.isArray` guard | S (high value) |
| | No save indicator despite "Everything stays on your device" (:57) | :32 | Private-mode silently breaks the page's own promise | Persist-error warning (Part H) | M |
| | Add rejects empty name silently; no maxLength | :34–35, :64–65 | No cue why nothing happened | Disable Add when `!name.trim()` | S |
| DecisionLog.tsx | Parse try/caught, **no `Array.isArray`** | :31; crash at :42/:72/:77 | Corrupt → blank page over **confidential benevolence records** | Guard | S |
| | No save indicator despite "This stays on your device" (:52); silent empty-title reject (:34–35, :67); no maxLength (:60–66) | — | Same silent-loss family | Persist-error warning; disable button | S–M |
| MeetingBuilder.tsx | `o.items` unvalidated | :54; crash at :96 (`items.map`) / :61 (reduce) | `{"items":{}}` → blank page | `Array.isArray` | S |
| | Minutes input: no `min`; `Number("")→0`; negative minutes → negative total; blank rows export as "1.  — 10 min"; fully silent save (:57) | :104, :61, :67–70 | Garbage export, sign errors | `min={0}`, clamp, skip blanks in copy | S |
| BudgetCalculator.tsx | `if (o.cats) setCats(o.cats)` unvalidated; `if (o.income)` drops saved 0 | :32; crash at :35 (reduce); `"$NaN"` via `money()` (:26, :66, :72) | Corrupt storage renders **"$NaN"**; negative income renders "$-150,000"; number twin lacks the range cap (:76 vs 70) | Validate + coerce `Number(c.pct)||0`; `o.income != null`; `min/max` + clamp | S |
| SermonWorkbench.tsx | Quota/private-mode save failure invisible | :53 | Pastor writes 4 days of prep on iPhone private mode; reload; gone — under a local-save promise (:4) | Persistent "Couldn't save to this browser" warning in the catch | M |
| | No maxLength on title/12 textareas — a pasted manuscript can hit the ~5 MB quota, triggering the silent failure above; copy unawaited (:68) | :85, :96 | Silent data loss amplifier | `maxLength={20000}`/textarea or the warning | S |
| IllustrationLibrary.tsx | Fetch failure → `items []` → "Loading…" forever; empty-but-valid library indistinguishable from loading | :26, :68 | Permanent spinner on network error | Error state + retry; distinguish empty | S |
| | Saved bookmarks parse unvalidated; `d.illustrations \|\| d` accepts arbitrary objects | :27, :26; crash at :37/:64/:75 (`saved.includes`), :32 (`.map`) | Blank page | `Array.isArray` both | S |
| DecisionLog/VisitationTracker/MeetingBuilder/BudgetCalculator | Clipboard exports unawaited, no feedback | MeetingBuilder :70, BudgetCalculator :42 (+ SermonWorkbench :68) | False confidence in copied text | Shared helper (Part H) | S |

**BeforeYouPost.tsx — cleanest tool in the audit. No gaps filed** (no fetch/storage/free-text; submit disabled until all answered :60–61; scoring counts only defined :31; real buttons throughout).

Cross-cutting for Part D (grep-verified in the sweep): `res.ok` checked at all 5 fetch sites; `JSON.parse` try/caught at all 8 read sites but **shape never validated at 6 of them**; `setItem` try/caught at all 9 write sites but **failure silent everywhere**; all 31 onClicks on real `<button>`s; no drag/tables/fixed widths (mobile-safe); only cosmetic nit LeaderAssessment :82 scale rows wrapping on narrow phones.

---

## Part E — Generator & Free-Text Tools (client/src/pages/tools/)

### SermonOutline.tsx

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **4 of 10 dropdown topics have no outline and silently serve the Grace outline** | :315 (`OUTLINES.find`), fallback :319 (`return OUTLINES[0]`), badge :736 | Selecting Identity/Mission/Wisdom/Family yields a complete *Grace* sermon (titles, points, big idea) under a `GRACE` badge while the scaffold above (:361) talks about the topic actually picked — a self-contradicting page | Only list topics that have outlines, or write the 4 missing outlines | M |
| Audience dropdown is decorative — no effect on output | :315 (topic-only match), :750 (`MIXED CONGREGATION` shown regardless) | User picks "Youth", output says otherwise; the control looks functional and isn't | Filter audiences per topic or drop the control | M |
| Garbage/empty scripture embedded verbatim, uppercased, untruncated | :357 (`scripture.trim() \|\| "your text"`), :361, :765 (`{scripture.toUpperCase()}`) | "asdfgh", emoji, or a 50 k-char paste lands raw in the Big Idea sentence and the badge; no crash, but nonsense output | Trim + cap; show the badge only for plausible references (reuse PassageContext's regex), else omit | S |
| No maxLength on the scripture input | :511–529 | Huge paste bloats scaffold and layout | `maxLength={120}` | S |
| No copy/print/export of the generated outline | whole file | User hand-selects long text | Add a Copy button via the shared helper | S |

Handles well: Generate disabled until both dropdowns set (:621); `findOutline` can never crash; reset clears cleanly (:386–392).

### PassageContext.tsx

Its **remote** bible-api call is the reference implementation for the whole repo: `r.ok` checked (:155), empty-verse guard (:158), `.catch(() => setTextState("error"))` (:161), real loading state (:287), and a genuinely helpful failure panel that still renders every teaching section (:288–291). The gaps are all in the **local** data path:

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **Local JSON fetch failure silently breaks the whole tool — and blames the user's input** | :127–128 (no `r.ok`, `.catch(() => {})`), :131 (`data?.books ?? []`), :144 | If `bible-books.json` fails, every submission — including a perfectly valid "John 3:16" — shows `Could not read 'John 3:16'. Try a form like John 6:44` | Add a `booksState` (loading/error) with an error banner + retry; distinguish "data not loaded" from "unparseable reference" | M |
| Verse numbers unvalidated (only chapter is, :80) | :71–90 | "John 3:999" renders a blank passage panel; "John 3:0" shows the full chapter labeled ":0" | Clamp/validate `start`/`end`; treat 0 as absent | S |
| Empty submit allowed; no maxLength; 50 k-char paste runs the regex (:71) on the whole string | :219–226 (no `disabled`, no `maxLength`) | `Could not read ''.` with blank quotes | Early-return on blank; `maxLength={80}` | S |
| **Perf-as-hardening: fetches 692 kB `passage-notes.json` with `cache: "no-store"` on every visit** | :127–128 | On a slow connection the tool sits unusable long enough to read as broken (the same "loading forever" perception as a real failure) | Drop `no-store` (version the filename for cache-busting), or split notes per book | M |

### PrayerGenerator.tsx

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Copy not awaited/try-caught; success reported unconditionally | :175 → :176 (`setCopied(true)`) | Insecure context: click **throws**, nothing happens; permission denied: UI lies "Copied" | Shared `copyToClipboard` helper; set state only on success | S |
| Share has the identical flaw | :184 → :185 | Same | Same | S |
| Daily-prayer copy unguarded **and reuses the main `copied` flag** | :262 → :263 (flag :76, read :351) | Copying the daily prayer flips the selected prayer's button to "Copied" too | Guard + separate state | S |
| Favorites shape unvalidated (via `useFavorites`) | hook :14; breaks :221 (`favorites.length`) | See Part F — white-screen family | Fix in the hook | S |

Handles well: selection-only UI (no garbage vector); Pray-Along `setInterval` cleaned up on end/unmount/change (:138–162).

### FamilyDevotionBuilder.tsx, RuleOfLife.tsx, ConflictGuide.tsx, ParentingGuide.tsx, BibleStudy.tsx

| Tool | Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|---|
| FamilyDevotionBuilder | Copy unawaited, unconditional "Copied" | :700 → :701 | False success / throw on insecure context | Shared helper | S |
| | Selections lost on refresh | :671–673 | Built devotion disappears (2 clicks to rebuild — low stakes) | URL/sessionStorage | M |
| RuleOfLife | **Composed rule lost on refresh — highest-value loss in this family.** Hand-picked practices across six categories in a `Set` in state | :109 | One refresh wipes a personal rule of life; Copy is the only save path | Persist `chosen` to localStorage (try/catch), restore on mount | M |
| | Copy catch is a silent no-op — the only *correct* await/try-catch here still gives zero failure feedback | :142–150, catch :147 | Click, nothing, no message | Error state in catch | S |
| ConflictGuide | Multi-step progress not persisted | :807–808 | Refresh mid-guide returns to type selection (no data entered — low stakes) | URL/sessionStorage sync | M |
| | Internal links are plain `<a href>` | :1401–1403 | Full reload | wouter `Link` | S |
| ParentingGuide | Selection not persisted; plain `<a href>` CTA | :368, :838–839 | Refresh returns to grid; full reload | URL param; `Link` | S |
| BibleStudy | **All 12 "Companion Reading" links point to the generic `/writing` index**, not the named essay | :37/:59/:81/:104/:127/:150/:173/:196/:219/:242/:265/:288, rendered :735 | Card promises "When the Promise Takes Longer Than You Expected", delivers the essays index with no way to find it | Point each to the real essay slug (or relabel "Browse essays") | S |
| | Plain `<a href>` companion link; selection not persisted | :734–735, :296 | Full reload; refresh to grid | `Link`; URL sync | S |

Handle well: FamilyDevotionBuilder disables themes until a band is chosen with a friendly hint (:779, :893–898); ConflictGuide triple-guards its render (:1036) and disables Back on step 0 (:1322); ParentingGuide/BibleStudy null-guard selections (:370/:534, :298/:530); BibleStudy guards its `" -- "` split (:606, :619).

---

## Part F — Library/Reference Tools & Storage Hooks

### client/src/hooks/useFavorites.ts — one line, four pages

Consumers (grep-verified): `tools/VerseFinder.tsx`, `tools/SavedItems.tsx`, `tools/PrayerGenerator.tsx`, `pages/ToolsHub.tsx`.

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| **Parsed shape never validated** | :14 (`return stored ? JSON.parse(stored) : [];`) | Valid-but-wrong JSON (`{}`) in one `livewell-saved-*` key → `favorites.some` throws during render (`isFavorite`, :43; VerseFinder :355) → **white screen**; in SavedItems `.length` is `undefined` → hero prints **"NaN items saved across your tools"** (SavedItems :18/:58); PrayerGenerator breaks at :221 | `const parsed = JSON.parse(stored); return Array.isArray(parsed) ? parsed : [];` | S |
| `setItem` silent on failure | :20–26 (comment: "fail silently") | Private mode/quota: saves vanish with zero feedback across all four consumers | Return a `persistError` flag consumers can surface (Part H) | M |

Handles well: parse and write both try/caught; `addFavorite` dedupes (:31); stable callbacks.

### client/src/pages/tools/SavedItems.tsx (the hub)

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Unguarded `v.content.ref` on stored records | :25 (export), :123 (render); prayers partially safer (:171 optional-chained) but `p.content.text` :192 unguarded | One malformed saved record (schema drift/corrupt storage) → "cannot read 'ref' of undefined" → **whole hub white-screens** | `const c = v.content ?? {}` + optional-chain throughout | M |
| Export copy unawaited, no try/catch, unconditional success | :37 → :38, label :77 | Insecure context: button silently dead; rejection: shows "Copied to Clipboard" falsely | Shared helper | S |
| "NaN items saved" | :18 → :58 (downstream of the hook gap) | See above | Fixed by the hook; belt: `(verses.favorites?.length ?? 0)` | S |
| "Invalid Date" for bad `savedAt` | :9, rendered :127/:175 | Literal "Invalid Date" in UI | `isNaN(d.getTime())` guard | S |

Handles well: real empty state with CTA (:82–102); singular/plural correct (:58); per-item Remove wired (:130, :178).

### WisdomFinder.tsx (fetches /wisdom/topics.json)

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Fetch failure fully swallowed — no error state, no retry | :55–58 (`.catch(() => {});`) | Offline/network error → "Loading the wisdom library…" forever | Error state in catch + retry button | S |
| `!r.ok` collapses into loading | :56–57 (`r.ok ? r.json() : null`, `d && setTopics`) | 404/500 indistinguishable from loading | Branch `!r.ok` to the error message | S |
| Loading vs empty-library indistinguishable | :162 (keyed on `topics.length === 0`) | Empty file reads as perpetual loading | Gate on a `loading` boolean | S |
| Shape unvalidated | :57 (`d.topics \|\| []`) | Non-array `topics` → `.slice().map` throws (:155) | `Array.isArray(d?.topics) ? d.topics : []` | S |
| **Perf-as-hardening: 645 kB JSON fetched upfront with `cache: "no-store"`** | :55 | Slow connections sit on the loading text long enough to read as broken | Cache properly / split the library | M |

Handles well: the copy is the model — awaited in try/catch, "Copied" only on success (:104–110); genuine no-match empty state with fallback chips (:170–182); `?q=` deep-link prefill (:61–62).

### ScriptureMemory.tsx (progress deep-dive)

| Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|
| Stored shape unvalidated — a JSON **string** is iterable | :246–252, :248 (`new Set(JSON.parse(stored))`) | `"abc"` in storage → `Set{"a","b","c"}` → hero renders **"3 of 40 memorized"** and an ~8% bar (:279, :401–408) the user never earned (an `{}` throws and is safely caught) | `const arr = JSON.parse(stored); if (Array.isArray(arr)) setMemorized(new Set(arr.filter(x => typeof x === "string")))` | S |
| Save silent on quota/private mode | :256–263 (:259, catch :261) | "Memorized" toggle appears to work; nothing persists; no warning | Persist-error note (Part H) | M |

Handles well: load and save both try/caught; percent guards `totalVerses > 0` (:404, :421); recall accuracy divide-guarded (:304).

### The rest of the library set

| Tool | Gap | Where | User-facing failure | Fix | Effort |
|---|---|---|---|---|---|
| VerseFinder.tsx | Copy & Share: no await/try-catch; success state set unconditionally | :183 → :184, :190 → :191 | Insecure context **throws** (button dead); rejection shows false "Copied" | Shared helper | S |
| | No empty-state once a topic is `selected`; no maxLength | :378 (`{!selected && …}`), :284–302 | Garbage filter hides all chips silently while old verses remain | Show the empty message regardless of `selected` | S |
| ParentingVerses.tsx | Copy optional-chained but still false "Copied" | :143 → :144 | No crash (better than VerseFinder) but lies on failure | Shared helper | S |
| | No no-match empty state | :182 (`visibleTopics.map`), fallback :130 | Garbage query → blank chip row, stale detail card, no message | "No topics match" when `visibleTopics.length === 0` | S |
| BibleOnTopic.tsx | Copy correct but catch silent | :220–225 | Failed copy → zero feedback (no false success though) | "Copy failed" note in catch | S |
| DiscipleshipTable.tsx | Copy correct (guard :145, await :147) but catch silent | :147–149 | Same silent-failure nit | Same | S |
| QuoteLibrary.tsx | **Gold-standard clipboard** (await + try/catch + `execCommand` textarea fallback :50–68); one nit: fallback ignores `execCommand`'s boolean | :57–64 | Failed legacy copy still shows "Copied" | Check the return value | S |
| TheologyGlossary.tsx | No maxLength on search; `t.term[0]` assumes non-empty | :1153–1170, :1009 | Cosmetic; would throw on an empty static term | `maxLength`; `t.term?.[0]` guard | S |
| DeepBibleCompanion.tsx | "Coming soon" books inert but not `disabled` | :1725–1727 | Keyboard/AT users get no inert affordance | `disabled={!hasContent}` | S |
| BibleReference.tsx / Proverbs31.tsx | **No gaps filed** — static, bounds-safe (Proverbs31 clamps day 1–31 :59, wraps cleanly :91/:102; BibleReference falls back on unknown icons :1091) | — | — | — | — |

### client/src/hooks/useFormationTracker.ts (Dashboard)

Best-hardened storage read in the codebase after the two below: try/catch + per-field defaults (:68–84, catch :81). Residual: `|| []` defaults pass truthy non-arrays (:74–79) → `for (const a of data.articlesRead)` (:106) throws inside `calculateStreak`, crashing the Dashboard stats (:257). Fix: `Array.isArray(parsed.articlesRead) ? … : []` per field. **S**. Save silent on failure (:86–92) — persist-error flag. **M**.

### The model implementations (copy these, change nothing)

`leadership/FormationInventory.tsx` and `life/WholeLifeAssessment.tsx` — **zero storage gaps filed**. Both: parse in try/catch **with `Array.isArray` + per-entry shape filtering** (FormationInventory :237–247, filter :242; WholeLifeAssessment :183–197, filter :188–191), `setItem` try/caught with honest comments (:249–255 / :199–205), and completion-gated submit (`disabled={!complete}` — FormationInventory :541, WholeLifeAssessment :487). Their `loadHistory`/`saveHistory` pair is the template for the shared storage helper in Part H.

---

## Part G — Cross-Cutting Patterns

1. **Fetch error UX is a uniform gap.** Eight data-loading sites have no error state and no retry: the four leadership engines, IllustrationLibrary, TheologyDiagnostic, WisdomFinder, and TheologyQuiz's two tRPC queries — all render an infinite "Loading…" (or a header over a void) on failure. PassageContext's local JSONs fail differently but worse: silently broken while blaming the user's input. The in-repo model to copy is PassageContext's **remote** call (:155–161 + :288–291).
2. **localStorage: parse universally guarded, shape almost universally unvalidated.** Every read site wraps `JSON.parse` in try/catch; only FormationInventory/WholeLifeAssessment validate what came out. Corrupt-but-valid JSON is the live risk: white screens (useFavorites → 4 pages; VisitationTracker; DecisionLog; MeetingBuilder; IllustrationLibrary; ServiceBuilder; SavedItems), "$NaN" (BudgetCalculator), "NaN items saved" (SavedItems), bogus memorized counts (ScriptureMemory), Dashboard crash (useFormationTracker).
3. **Every `setItem` failure is silent** (11+ write sites), several under explicit "stays on your device" promises (VisitationTracker :57, DecisionLog :52, SermonWorkbench :4). Safari/iOS private mode silently discards pastoral data.
4. **Clipboard is bimodal.** Correct-and-awaited: WisdomFinder :105, BibleOnTopic :220, DiscipleshipTable :147, QuoteLibrary :52 (gold standard, has execCommand fallback), RuleOfLife :142. Broken (no await, unconditional success, throws on insecure context): VerseFinder :183/:190, SavedItems :37, PrayerGenerator :175/:184/:262, FamilyDevotionBuilder :700. Middle (safe but lying or silent): ParentingVerses :143, and the leadership `?.writeText` sites (SermonWorkbench :68, MeetingBuilder :70, BudgetCalculator :42, GuidedWorkflow :54, ServiceBuilder :103).
5. **maxLength: zero attributes in the entire client** (grep-verified). Mostly cosmetic (filters), real only where storage quota (SermonWorkbench) or generated output (SermonOutline, PassageContext) is involved.
6. **Keyboard/a11y baseline is good everywhere**: no `onClick` on non-interactive elements anywhere in the tools; two markup faults total (StartHereQuiz button-in-Link :285; DeepBibleCompanion missing `disabled` :1727).
7. **No user-reachable NaN/undefined render** except: SavedItems "NaN items"/"Invalid Date", BudgetCalculator "$NaN" (corrupt storage), TheologyQuiz `readTime` (API-dependent) — everything else is defended by `|| 0`, constant denominators, and seeded reduces.
8. **Refresh amnesia is the default.** Outside the leadership localStorage tools and the two model inventories, essentially every multi-step tool loses all state on refresh; the costliest are the six assessments (12–24 answers), ProfileSurvey (60+), and RuleOfLife (a composed rule).

---

## Part H — The Three Shared Fixes (clear the most findings at once)

**H1. `copyToClipboard(text): Promise<boolean>`** — one helper in `client/src/lib/`, modeled on QuoteLibrary :50–68 (await + try/catch + `execCommand` textarea fallback, **plus** checking `execCommand`'s boolean return). Every call site sets its "Copied" state only on `true` and shows a small "Copy failed — select and copy manually" on `false`. Clears ~16 findings across 13 files (VerseFinder ×2, SavedItems, PrayerGenerator ×3, FamilyDevotionBuilder, ParentingVerses, BibleOnTopic, DiscipleshipTable, RuleOfLife, QuoteLibrary nit, SermonWorkbench, MeetingBuilder, BudgetCalculator, GuidedWorkflow, ServiceBuilder).

**H2. A fetch error+retry pattern for the JSON engines** — `const [error, setError] = useState(false); const [nonce, setNonce] = useState(0);` effect keyed on `[slug, nonce]`, `.catch(() => setError(true))` and `!r.ok → setError(true)`; render three states (loading spinner / error panel with a Retry button (`setNonce(n => n+1)`) and a back-link / content), and distinguish "loaded but empty." Apply to LeaderAssessment, ProfileSurvey, GuidedWorkflow (plus its "copy what you wrote" recovery), ServiceBuilder, IllustrationLibrary, TheologyDiagnostic, WisdomFinder, and the same shape via `isError`/`refetch` for TheologyQuiz's two queries. Clears 9+ infinite-loading findings. PassageContext gets the variant with a `booksState` error banner.

**H3. `readStoredJSON<T>(key, validate: (x: unknown) => x is T)` / `writeStoredJSON(key, value): boolean`** — modeled verbatim on FormationInventory :237–255 / WholeLifeAssessment :183–205. Read: try/catch + caller-supplied shape guard (usually `Array.isArray` + element filter), returning a safe default. Write: try/catch returning success, so callers can set a `persistError` flag rendered as one quiet, persistent line: "Couldn't save to this browser — your work here will not survive a reload." Clears the ~12 shape-crash findings and the entire silent-save family (VisitationTracker, DecisionLog, MeetingBuilder, BudgetCalculator, IllustrationLibrary, ServiceBuilder, SermonWorkbench, ScriptureMemory, useFavorites, useFormationTracker, GuidedWorkflow).

---

## Part I — Ranked Master List (likelihood a normal user hits it × severity)

### CRITICAL

| # | Finding | Where | Why it ranks here |
|---|---|---|---|
| 1 | **Paid buyer's "Download the PDF" can navigate to a raw JSON error page** | EbookThankYou.tsx:42/:71; api/index.ts:2626/:2634 | Money taken, product not delivered, buyer dumped off-site onto unstyled JSON. Any Stripe hiccup or stale session triggers it. Fix: blob-fetch with `res.ok` + inline retry/email fallback. |
| 2 | **Post-payment verification conflates outage with "not paid," no retry** | EbookThankYou.tsx:33–36; api/index.ts:2633 | A flaky mobile connection right after a charge shows "We couldn't confirm a purchase." Fix: third state + Try again button. |
| 3 | **EmailResults says "Results sent. Check your inbox." — no email is ever sent; success shown even if the DB insert failed** | EmailResults.tsx:18–36/:91; api/index.ts:2372–2378 | Trust-contract break on the three heaviest assessments (Marriage, LifeAudit, PastorBurnout — up to 24 answers entrusted). Fix: truthful copy + non-best-effort insert now; real transactional send next. |
| 4 | **StartHereDiagnostic double-click race → white screen or unrecoverable soft-lock** | StartHereDiagnostic.tsx:295–316 (:285/:433 crash) | Flagship entry point; impatient double-taps are routine. One-line fix (`if (transitioning) return;` + clamp). |
| 5 | **ServiceBuilder cross-slug save clobber — permanent destruction of saved work** | ServiceBuilder.tsx:27–41 | The audit's only true data-corruption bug: opening a second service builder overwrites the first one's saved state. Fix: reset on slug change + gate save on loaded slug. |
| 6 | **StartHereQuiz personalization is dead for most users** | StartHereQuiz.tsx:104–109 vs :48–101 (:84) | ~4 of ~96 answer combinations personalize; pastors and 3 of 4 format choices always get the generic path — the tool's purpose silently fails for nearly everyone. Fix: staged key fallback. |
| 7 | **Dead "See Results" button in all five wizard assessments** | Marriage :674/:298/:307; Financial :684/:272/:281; LifeAudit :857/:460/:471; ChurchHealth :764/:366/:377; PastorBurnout :862/:460/:471 | An enabled button that silently no-ops at the payoff moment; progress dots invite exactly the jump that triggers it. One-line fix ×5. |

### HIGH

| # | Finding | Where |
|---|---|---|
| 8 | TheologyQuiz: query failure → "Question 1 of 0" dead page; recommendations pending/failed → "Your Results" over a void after 10 answered questions; no retry either way | TheologyQuiz.tsx:21–22/:47/:103, :158–164 |
| 9 | Infinite "Loading…" with no error/retry across 7 JSON loaders | LeaderAssessment :35/:62; ProfileSurvey :39/:78; GuidedWorkflow :33/:64; ServiceBuilder :31/:62; IllustrationLibrary :26/:68; TheologyDiagnostic :28–31/:83; WisdomFinder :55–58/:162 |
| 10 | PassageContext local-data failure silently breaks the tool and blames the user's valid input | PassageContext.tsx:127–128/:131/:144 |
| 11 | useFavorites shape gap → white screens on VerseFinder/PrayerGenerator/ToolsHub and "NaN items saved" on SavedItems | useFavorites.ts:14; SavedItems.tsx:18/:58; VerseFinder :355; PrayerGenerator :221 |
| 12 | SavedItems unguarded `v.content.ref` → one malformed record white-screens the whole hub | SavedItems.tsx:25/:123/:192 |
| 13 | Leadership localStorage shape crashes → blank pages over pastoral-care names, benevolence records, budgets, agendas | VisitationTracker :31→:47; DecisionLog :31→:42/:72/:77; MeetingBuilder :54→:96/:61; BudgetCalculator :32→:35 ("$NaN"); IllustrationLibrary :27→:37; ServiceBuilder :34→:74 |
| 14 | SermonOutline: 4 phantom topics silently serve the Grace outline; audience dropdown decorative | SermonOutline.tsx:315/:319/:736; :750 |
| 15 | Zero persistence on the longest instruments: 6 assessments (12–24 answers), ProfileSurvey (60+), LeaderAssessment, RuleOfLife's composed rule | Part C table; ProfileSurvey :33; LeaderAssessment :29; RuleOfLife :109 |
| 16 | GuidedWorkflow: user's own written answers locked behind a failed fetch | GuidedWorkflow.tsx:33–39 |

### MEDIUM

| # | Finding | Where |
|---|---|---|
| 17 | Silent `setItem` failure everywhere, incl. under explicit "stays on your device" promises (Safari private mode discards pastoral data) | VisitationTracker :32/:57; DecisionLog :32/:52; SermonWorkbench :53; ScriptureMemory :259–261; useFavorites :23; useFormationTracker :89; MeetingBuilder :57; BudgetCalculator :33 |
| 18 | Clipboard family: false "Copied" / sync throw / silent failure across 16+ sites | Part G item 4 (full site list) |
| 19 | No revise-from-results anywhere — full reset only (6 assessments + 3 diagnostics + TheologyQuiz) | Part B/C tables |
| 20 | Answers lost on refresh in all four entry diagnostics | Diagnostic :180; StartHereQuiz :9; StartHereDiagnostic :274; TheologyQuiz :10 |
| 21 | BuyEbookButton: raw Stripe error strings shown to buyers; hardcoded `#9b1c1c`; no fetch timeout | BuyEbookButton.tsx:84/:116/:69; api/index.ts:2608 |
| 22 | StartHereQuiz visible defects: mojibake "Read â†'" arrow; dead "See My Path" button; button-in-Link | StartHereQuiz.tsx:266; :111–117/:211–230; :285–289 |
| 23 | SermonWorkbench: silent quota failure can eat days of sermon prep (no maxLength amplifies) | SermonWorkbench.tsx:53; :85/:96 |
| 24 | PastorBurnout latent reverse-score bug — unanswered scores as 6 (healthy); currently masked by the gate, must be fixed with #7 | PastorBurnout.tsx:388–389 |
| 25 | Perf-as-hardening: PassageContext 692 kB notes with `cache:"no-store"` every visit; WisdomFinder 645 kB upfront | PassageContext.tsx:127–128; WisdomFinder.tsx:55 |
| 26 | BibleStudy: all 12 companion links promise a named essay, deliver the generic index | BibleStudy.tsx:37…:288/:735 |
| 27 | PassageContext: verse numbers unvalidated (John 3:999 → blank panel); empty submit "Could not read ''" | PassageContext.tsx:80/:71–90; :219–226 |
| 28 | ScriptureMemory bogus memorized count from corrupt storage ("3 of 40" never earned) | ScriptureMemory.tsx:248→:279 |
| 29 | Diagnostic: Back shows no prior selection; hover-only feedback | Diagnostic.tsx:283–310; :301–306 |
| 30 | StartHereDiagnostic secondary: soft-lock lacks diagnostics; no email capture; progress-bar jump; 100vh on iOS | :306–312; whole file; :374; :386 |
| 31 | TheologyQuiz: no back navigation; `readTime` unguarded; off-token styling | TheologyQuiz.tsx:24–33; :200; :104–218 |
| 32 | MeetingBuilder: negative minutes/negative totals; blank rows in export | MeetingBuilder.tsx:104/:61/:67–70 |
| 33 | BudgetCalculator: negative income "$-150,000"; number twin bypasses the 70% cap | BudgetCalculator.tsx:75–76 |
| 34 | Multi-step state lost on refresh (generator family): FamilyDevotionBuilder, ConflictGuide, ParentingGuide, BibleStudy selections | :671–673; :807–808; :368; :296 |
| 35 | useFormationTracker `\|\| []` passes truthy non-arrays → Dashboard crash | useFormationTracker.ts:74–79→:106 |
| 36 | EmotionalHealth `...data[name]` coupling — silent white screen if keys ever diverge | EmotionalHealth.tsx:208→:792 |

### LOW

| # | Finding | Where |
|---|---|---|
| 37 | maxLength absent on every input in the client (grep-verified); add where output/storage is affected first | SermonOutline :511; PassageContext :219; SermonWorkbench :85/:96; search filters |
| 38 | Plain `<a href>` for internal SPA routes (full reloads) | ConflictGuide :1401; ParentingGuide :838; BibleStudy :734; assessment results links |
| 39 | Missing no-match empty states: ParentingVerses blank chip row; VerseFinder when a topic is selected | ParentingVerses :182; VerseFinder :378 |
| 40 | SavedItems "Invalid Date" for bad `savedAt` | SavedItems.tsx:9/:127/:175 |
| 41 | SermonOutline has no copy/export of its output | SermonOutline.tsx (whole) |
| 42 | DeepBibleCompanion "Coming soon" books lack `disabled`; TheologyGlossary `t.term[0]` guard | :1725–1727; :1009 |
| 43 | QuoteLibrary execCommand fallback ignores boolean return | QuoteLibrary.tsx:57–64 |
| 44 | Off-token hex/white across TheologyQuiz, StartHereQuiz, EmailResults input `#FFFFFF` | TheologyQuiz (Part B); StartHereQuiz :18–309; EmailResults.tsx:128 |
| 45 | NewsletterSignup attribution event fires on failed subscribes | NewsletterSignup.tsx:52–62 |
| 46 | Hover-only affordances / missing focus styles on result CTAs; LeaderAssessment scale rows wrap on narrow phones | StartHereDiagnostic :584/:641/:732; LeaderAssessment :82 |
| 47 | Empty-add rejected silently (no disabled state) in VisitationTracker/DecisionLog | VisitationTracker :34–35; DecisionLog :34–35/:67 |
| 48 | Diagnostic subscribe DB write silent (intentional; Substack is the real path) | SegmentedSignup.tsx:64–71 |

### Explicitly clean (no gaps filed — use as in-repo models)

`BeforeYouPost` (cleanest tool), `BibleReference`, `Proverbs31`, `DeepBibleCompanion` (one nit), `FormationInventory` + `WholeLifeAssessment` (storage model), `QuoteLibrary` (clipboard model), `EmotionalHealth` (gating model), PassageContext's remote fetch (error-UX model), `NewsletterSignup` + `SegmentedSignup` (capture models), `BuyEbookButton` (checkout-degradation model, minus its three nits).

---

*Findings only. No code was changed. Fix sequencing suggestion for the approval conversation: Critical 1–7 first (all S/M, independent), then the three shared helpers (Part H) which retire most of High/Medium mechanically.*
