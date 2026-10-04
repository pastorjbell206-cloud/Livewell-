/**
 * LoadFailed — the shared error panel for data that did not arrive
 * (roadmap HS-4, audit 15 H2). Replaces the infinite "Loading…" spinner
 * with the truth and two ways forward: try again, or go back.
 */
import { Link } from "wouter";

export function LoadFailed({
  what = "This page's content",
  onRetry,
  backHref,
  backLabel,
}: {
  /** What failed to load, in reader words: "The assessment", "The library". */
  what?: string;
  onRetry: () => void;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div
      role="alert"
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "var(--s-5) var(--s-4)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--F)",
          fontSize: "26px",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
          margin: "0 0 10px",
        }}
      >
        {what} didn't load.
      </h2>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--ink-muted)",
          margin: "0 0 22px",
        }}
      >
        A connection problem, most likely — not your device. Nothing you
        entered is affected.
      </p>
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={onRetry}
          style={{
            background: "var(--charcoal)",
            color: "var(--charcoal-fg)",
            border: "none",
            borderBottom: "2px solid var(--mustard)",
            borderRadius: "var(--radius-sm)",
            padding: "12px 24px",
            fontFamily: "var(--U)",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        {backHref && (
          <Link
            href={backHref}
            style={{
              fontFamily: "var(--U)",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--ink)",
              textDecoration: "none",
              borderBottom: "1px solid var(--mustard)",
              paddingBottom: "2px",
            }}
          >
            {backLabel ?? "Go back"}
          </Link>
        )}
      </div>
    </div>
  );
}

export default LoadFailed;
