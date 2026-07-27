/**
 * PersistentHelpTab — a quiet, always-reachable door to /help.
 *
 * The pastoral-care page is the one destination a reader may need on any page,
 * at the worst possible moment, and it should not cost a primary nav slot to
 * reach it. So it rides the right edge instead: vertical text, appearing only
 * after the reader has scrolled past the first screen, dismissible, and
 * remembered as dismissed for the rest of the session.
 *
 * Deliberate restraint, because this is a pastoral site and not a storefront:
 *   - hidden below 1024px, where it would cover content on a phone
 *   - hidden on /help itself, and on the admin surface
 *   - never animated, never a pop-up, never re-appears after dismissal
 *   - honors prefers-reduced-motion by having no motion at all
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { X } from "lucide-react";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

const DISMISS_KEY = "livewell-help-tab-dismissed";
const SHOW_AFTER_PX = 400;

const isBool = (x: unknown): x is boolean => typeof x === "boolean";

export default function PersistentHelpTab() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(() =>
    readStoredJSON<boolean>(DISMISS_KEY, isBool, false)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never shadow the page it points at, and stay out of the admin workspace.
  const suppressed = location === "/help" || location.startsWith("/admin");
  if (suppressed || dismissed || !scrolled) return null;

  return (
    <div
      className="persistent-help-tab"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 150,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link
        href="/help"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          background: "var(--charcoal)",
          color: "var(--bone)",
          textDecoration: "none",
          fontFamily: "var(--U)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "18px 10px",
          borderRadius: "var(--radius-sm) 0 0 var(--radius-sm)",
          borderLeft: "3px solid var(--mustard)",
        }}
      >
        Find help
      </Link>
      <button
        type="button"
        aria-label="Hide the find help tab"
        onClick={() => {
          setDismissed(true);
          writeStoredJSON(DISMISS_KEY, true);
        }}
        style={{
          position: "absolute",
          top: "-10px",
          left: "-10px",
          width: "24px",
          height: "24px",
          borderRadius: "999px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--ink-muted)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <X size={13} aria-hidden />
      </button>
    </div>
  );
}
