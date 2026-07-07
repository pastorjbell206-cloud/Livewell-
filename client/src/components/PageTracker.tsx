/**
 * PageTracker — a silent beacon that records one page view per route change.
 *
 * Mounted once at the app root. On every location change it POSTs the path to
 * /api/track, which stores it for the admin Traffic panel. A random visitor id
 * (kept in localStorage) lets the dashboard separate unique visitors from raw
 * hits; it carries no personal data. Admin routes are ignored server-side, and
 * every failure is swallowed — tracking must never affect the reader.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

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

export function PageTracker() {
  const [location] = useLocation();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (location.startsWith("/admin")) return; // never count admin visits
    if (last.current === location) return; // dedupe repeated fires for one path
    last.current = location;
    try {
      const body = JSON.stringify({
        path: location,
        referrer: document.referrer || null,
        visitorId: visitorId(),
      });
      // keepalive lets the beacon survive a navigation; failures are ignored.
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* never break navigation */
    }
  }, [location]);

  return null;
}

export default PageTracker;
