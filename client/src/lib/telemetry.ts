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

/** A returning reader was seen (a count only — no identity, no PII). */
export function trackReturnReader(): void {
  track("return_reader");
}
