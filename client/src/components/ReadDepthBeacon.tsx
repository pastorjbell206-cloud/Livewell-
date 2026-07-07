/**
 * ReadDepthBeacon — records that a reader actually finished a piece.
 *
 * Render it immediately after a long-form body. When its sentinel scrolls into
 * view (the reader reached the end), it POSTs one "read" event to /api/track,
 * once per mount. This is what turns "essays finished" on the admin dashboard
 * from a promise into a number. Failures are swallowed; the reader never
 * notices this exists.
 */
import { useEffect, useRef } from "react";

/**
 * Record one "finished reading" event in the site's own read_events table
 * (via /api/track). Safe anywhere: never throws, never blocks, no PII beyond
 * the random per-browser visitor id.
 */
export function recordReadEvent(path: string): void {
  try {
    let vid = "anon";
    try { vid = localStorage.getItem("lw_vid") || "anon"; } catch { /* noop */ }
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, visitorId: vid, event: "read" }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* never affect the reader */ }
}

export function ReadDepthBeacon({ path }: { path: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    fired.current = false;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (fired.current) return;
        if (!entries.some((e) => e.isIntersecting)) return;
        fired.current = true;
        io.disconnect();
        recordReadEvent(path);
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [path]);

  return <div ref={ref} aria-hidden style={{ height: 1 }} />;
}

export default ReadDepthBeacon;
