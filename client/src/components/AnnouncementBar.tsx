/**
 * AnnouncementBar — one line, gold on ink, dismissible with a seven-day
 * memory. The single announcement slot at the top of the funnel: the newest
 * essay or a book release, never more than one thing at a time.
 *
 * Dismissal is stored via the shared storage helper (a timestamp; the bar
 * stays gone for seven days, then may return with whatever is current).
 */
import { useState } from "react";
import { Link } from "wouter";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

const STORE_KEY = "livewell-announce-dismissed";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

/** The current announcement. Change here; keep it to one line. */
const ANNOUNCEMENT = {
  id: "three-books-2026",
  text: "The shelf is down to three books — each one written by hand.",
  cta: "See them",
  href: "/books",
};

const isDismissRecord = (x: unknown): x is { id: string; at: number } =>
  typeof x === "object" && x !== null &&
  typeof (x as { id?: unknown }).id === "string" &&
  typeof (x as { at?: unknown }).at === "number";

export default function AnnouncementBar() {
  const [hidden, setHidden] = useState(() => {
    const rec = readStoredJSON<{ id: string; at: number } | null>(STORE_KEY, (x): x is { id: string; at: number } | null => x === null || isDismissRecord(x), null);
    return !!rec && rec.id === ANNOUNCEMENT.id && Date.now() - rec.at < SEVEN_DAYS;
  });

  if (hidden) return null;

  return (
    <div
      role="region"
      aria-label="Announcement"
      style={{
        background: "var(--charcoal-deep)",
        color: "var(--mustard)",
        fontFamily: "var(--U)",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: "0.02em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "9px 44px 9px 16px",
        position: "relative",
        textAlign: "center",
      }}
    >
      <span style={{ color: "rgba(245,240,230,0.85)" }}>{ANNOUNCEMENT.text}</span>
      <Link
        href={ANNOUNCEMENT.href}
        style={{ color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "1px", whiteSpace: "nowrap" }}
      >
        {ANNOUNCEMENT.cta} →
      </Link>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          writeStoredJSON(STORE_KEY, { id: ANNOUNCEMENT.id, at: Date.now() });
          setHidden(true);
        }}
        style={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          color: "rgba(245,240,230,0.6)",
          fontSize: "16px",
          lineHeight: 1,
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
