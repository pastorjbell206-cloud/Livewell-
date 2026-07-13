/**
 * ArticleProgress — a sticky progress bar that shows scroll progress through
 * the article body and estimated reading time.
 *
 * - Thin mustard bar (3px) fixed at the top of the viewport.
 * - Shows estimated reading time and percentage complete in a small chip
 *   that appears once the reader scrolls past the hero area (~200px).
 * - Disappears when scrolled to the top (hero visible).
 * - Mobile-friendly: chip collapses to percentage only on narrow screens.
 *
 * All styles are inline, referencing CSS variables from index.css.
 */

import { useEffect, useState, useCallback } from "react";

interface ArticleProgressProps {
  readTime: string;
}

function readScrollProgress(): number {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 0;
  return Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
}

export default function ArticleProgress({ readTime }: ArticleProgressProps) {
  // Initialized from the live scroll position so a page loaded mid-scroll
  // (back navigation, etc.) starts correct without a synchronous effect.
  const [progress, setProgress] = useState(readScrollProgress);
  const [visible, setVisible] = useState(() => window.scrollY > 200);

  const handleScroll = useCallback(() => {
    setProgress(readScrollProgress());

    // Show after scrolling past the hero area (~200px)
    setVisible(window.scrollY > 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!visible) return null;

  const roundedPct = Math.round(progress);

  return (
    <div
      role="progressbar"
      aria-valuenow={roundedPct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Reading progress: ${roundedPct}%`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          height: "3px",
          background: "var(--border)",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--mustard)",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Reading info chip */}
      <div
        style={{
          position: "absolute",
          top: "3px",
          right: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderTop: "none",
          borderRadius: "0 0 var(--radius-sm) var(--radius-sm)",
          padding: "6px 12px",
          fontFamily: "var(--U)",
          fontSize: "11px",
          fontWeight: 500,
          color: "var(--ink-muted)",
          boxShadow: "0 2px 8px rgba(20, 17, 12, 0.06)",
          pointerEvents: "auto",
          opacity: progress > 0 ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        {/* Reading time — hidden on very small screens */}
        <span
          style={{
            whiteSpace: "nowrap",
          }}
          className="progress-readtime"
        >
          {readTime}
        </span>
        <span
          aria-hidden
          style={{
            width: "1px",
            height: "12px",
            background: "var(--border)",
          }}
          className="progress-divider"
        />
        <span
          style={{
            fontWeight: 600,
            color: roundedPct === 100 ? "var(--mustard-text)" : "var(--ink-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {roundedPct}%
        </span>
      </div>

      {/* Mobile-responsive: hide readtime + divider on narrow viewports */}
      <style>{`
        @media (max-width: 480px) {
          .progress-readtime,
          .progress-divider {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
