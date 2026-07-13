/**
 * report-error — a throttled, best-effort beacon for client-side errors.
 *
 * The site had no error reporting: ErrorBoundary only console.error'd and
 * nothing caught errors outside React, so a page that broke for a real visitor
 * was invisible to the owner. This posts a compact record to /api/track
 * (event:"error"), which stores it for the admin "Errors" panel — a tiny,
 * first-party stand-in for a Sentry, using the same pipeline as page views.
 *
 * Discipline: never throws, swallows every failure, carries no PII beyond the
 * random visitor id, and is capped so a render loop can't flood the endpoint.
 */
const MAX_PER_LOAD = 8; // hard cap per page load — a loop must not spam /api/track
let sent = 0;
const seen = new Set<string>(); // dedupe identical errors within one page load

function visitorId(): string {
  try {
    const KEY = "lw_vid";
    let id = localStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `v-${Date.now().toString(36)}-${Math.floor(performance.now()).toString(36)}`;
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

export function reportClientError(input: {
  message: string;
  stack?: string | null;
  kind: "react" | "window" | "promise";
}): void {
  try {
    if (typeof window === "undefined") return;
    if (sent >= MAX_PER_LOAD) return;
    const path = window.location.pathname || "/";
    if (path.startsWith("/admin")) return; // don't report the admin workspace

    const message = String(input.message || "Unknown error").slice(0, 500);
    const key = `${input.kind}:${message}`;
    if (seen.has(key)) return; // count an identical error once per load
    seen.add(key);
    sent++;

    const stack = input.stack ? String(input.stack).slice(0, 2000) : null;
    const body = JSON.stringify({
      event: "error",
      path,
      message,
      stack,
      kind: input.kind,
      visitorId: visitorId(),
    });
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* reporting an error must never cause one */
  }
}
