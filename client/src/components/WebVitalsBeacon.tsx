/**
 * WebVitalsBeacon — reports real-user Core Web Vitals to /api/track.
 *
 * Mounted once at the app root. Uses Google's `web-vitals` library (the
 * reference implementation) so the numbers match what Google's field data
 * would show — LCP, INP, and CLS, each reported once when its value is final
 * (INP/CLS on page hide, LCP on the first interaction or hide). Each metric
 * POSTs one `event: "vital"` record to /api/track, which stores it for the
 * admin "Core Web Vitals" panel. Same discipline as PageTracker: a random
 * visitor id, no personal data, every failure swallowed, admin routes skipped.
 *
 * This is a first-party mirror of Vercel Speed Insights onto the owner's own
 * dashboard — the numbers a busy pastor will actually look at.
 */
import { useEffect } from "react";
import { onCLS, onINP, onLCP, type Metric } from "web-vitals";

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

function send(metric: Metric) {
  try {
    if (typeof window === "undefined") return;
    const path = window.location.pathname || "/";
    if (path.startsWith("/admin")) return; // never measure the admin workspace
    const body = JSON.stringify({
      event: "vital",
      path,
      metric: metric.name, // "LCP" | "INP" | "CLS"
      value: metric.value, // ms for LCP/INP; unitless layout-shift score for CLS
      rating: metric.rating, // "good" | "needs-improvement" | "poor"
      visitorId: visitorId(),
    });
    // keepalive lets the beacon survive the page-hide that finalizes the metric.
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* tracking must never affect the reader */
  }
}

export function WebVitalsBeacon() {
  useEffect(() => {
    // Each fires at most once per page load, when the metric is settled.
    // Guarded so an environment without PerformanceObserver (e.g. jsdom in
    // tests, or an old browser) can never break the render.
    try {
      onLCP(send);
      onINP(send);
      onCLS(send);
    } catch {
      /* metrics are best-effort */
    }
  }, []);

  return null;
}

export default WebVitalsBeacon;
