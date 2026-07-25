/**
 * Depth telemetry (board rec #17).
 *
 * The platform's definition of success is DEPTH — finished essays, return
 * readers, completed reading paths — yet nothing measured it. This is the thin
 * seam that does, and nothing more.
 *
 * Privacy-light by construction: it forwards to Vercel Web Analytics, the
 * tracker the app already loads (see client/src/main.tsx renders <Analytics/>).
 * No PII ever — only slugs, pathway/step identifiers, and counts. No cookie,
 * fingerprint, or third-party tracker is introduced here.
 *
 * Contract: this module must NEVER throw and must never affect rendering.
 * Every call is wrapped in try/catch and no-ops under SSR (no `window`), so a
 * missing or broken tracker degrades to silence, never to a crash.
 *
 * Stable event names — do not rename; any dashboard built on this depends on
 * them:
 *   - "essay_read_complete" — a reader reached the end of an essay body.
 *   - "path_step_complete"  — a reader finished a step of a reading pathway.
 *   - "return_reader"       — a returning reader was seen.
 *   - "argument_case_start"        — a Test the Case flow was opened.
 *   - "argument_objection_raised"  — which pushback a reader actually holds.
 *   - "argument_case_complete"     — a reader reached a case verdict.
 *   - "group_guide_view"           — a discussion guide was opened.
 */
import { track as vercelTrack } from "@vercel/analytics";

/** Event properties: primitives only, never PII. */
export type TelemetryProps = Record<string, string | number | boolean>;

/**
 * Forward a custom event to Vercel Web Analytics. Best-effort and silent: it
 * never throws, and no-ops server-side or when the tracker is unavailable.
 */
export function track(event: string, props?: TelemetryProps): void {
  if (typeof window === "undefined") return;
  try {
    vercelTrack(event, props);
  } catch {
    // Telemetry is best-effort. A tracker failure must never surface to the
    // reader or interrupt rendering — swallow it.
  }
}

/** A reader reached the end of an essay body — the core "finished" signal. */
export function trackEssayComplete(slug: string): void {
  track("essay_read_complete", { slug });
}

/** A reader completed one step of a named reading pathway. */
export function trackPathStep(pathway: string, step: string): void {
  track("path_step_complete", { pathway, step });
}

/** A reader opened a Test the Case flow. Event: "argument_case_start". */
export function trackCaseStart(caseSlug: string): void {
  track("argument_case_start", { case: caseSlug });
}

/**
 * A reader raised a specific objection inside a case. This is the most
 * editorially useful signal the site produces: it says which pushbacks readers
 * actually hold, in their own order of interest, rather than which ones we
 * assumed they would. The objection is identified by its index within the step,
 * never by its text, so nothing free-form is ever transmitted.
 * Event: "argument_objection_raised".
 */
export function trackObjection(caseSlug: string, stepId: string, index: number): void {
  track("argument_objection_raised", { case: caseSlug, step: stepId, index });
}

/** A reader reached the closing verdict of a case. Event: "argument_case_complete". */
export function trackCaseComplete(caseSlug: string): void {
  track("argument_case_complete", { case: caseSlug });
}

/**
 * A group discussion guide was opened. The PCN distribution signal: which
 * essays pastors actually take to a group. Event: "group_guide_view".
 */
export function trackGroupGuideView(slug: string): void {
  track("group_guide_view", { slug });
}

/** A returning reader was seen (a count only — no identity, no PII). */
export function trackReturnReader(): void {
  track("return_reader");
}

/** A reader clicked through from an essay to its recommended book — the
 *  article-to-book funnel, the platform's primary book-discovery path. Slugs
 *  only, never PII. Event: "essay_book_click". */
export function trackBookClick(fromSlug: string, bookSlug: string): void {
  track("essay_book_click", { from: fromSlug, book: bookSlug });
}

/**
 * Fire `return_reader` once for a reader who has been seen before. A first-ever
 * visitor is recorded but not counted; every later page load counts as a return
 * visit. One localStorage flag, no PII, no cookie. Best-effort and silent: safe
 * under SSR and when storage is blocked (private mode, quota) — it never throws.
 */
export function trackReturnReaderOnce(): void {
  if (typeof window === "undefined") return;
  try {
    const KEY = "lw-seen";
    if (window.localStorage.getItem(KEY)) {
      trackReturnReader();
    } else {
      window.localStorage.setItem(KEY, "1");
    }
  } catch {
    // Storage unavailable — return-reader is best-effort; swallow.
  }
}

/**
 * A newsletter subscription the backend accepted. Fire this in the subscribe
 * mutation's onSuccess — not on submit — so it counts confirmed requests, not
 * mere intent. Carries the source and (if the reader self-selected one) the
 * audience, never the email. Full double-opt-in confirmation is a provider
 * concern; this is the truthful client-side success boundary.
 */
export function trackNewsletterSignup(source?: string, audienceType?: string): void {
  const src = source || "unknown";
  track("newsletter_signup", audienceType ? { source: src, audienceType } : { source: src });
}
