/** Inline-style tokens shared across the team workspace, using the brand vars. */
import type { CSSProperties } from "react";

export const card: CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "var(--s-4)",
};

export const eyebrow: CSSProperties = {
  fontFamily: "var(--U)",
  fontWeight: 500,
  fontSize: "0.72rem",
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "var(--mustard-text)",
};

export const heading: CSSProperties = {
  fontFamily: "var(--F)",
  fontWeight: 500,
  color: "var(--ink)",
  letterSpacing: "-0.01em",
};

export const bodyText: CSSProperties = {
  fontFamily: "var(--B)",
  fontSize: "15px",
  lineHeight: 1.65,
  color: "var(--ink)",
};

export const muted: CSSProperties = {
  fontFamily: "var(--B)",
  fontSize: "13px",
  lineHeight: 1.55,
  color: "var(--ink-muted)",
};

export const input: CSSProperties = {
  width: "100%",
  fontFamily: "var(--B)",
  fontSize: "15px",
  color: "var(--ink)",
  background: "#FFFFFF",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "10px 12px",
  outline: "none",
};

export const primaryButton: CSSProperties = {
  fontFamily: "var(--U)",
  fontWeight: 600,
  fontSize: "14px",
  color: "var(--charcoal)",
  background: "var(--mustard)",
  border: "none",
  borderRadius: "var(--radius-sm)",
  padding: "10px 18px",
  cursor: "pointer",
};

export const ghostButton: CSSProperties = {
  fontFamily: "var(--U)",
  fontWeight: 600,
  fontSize: "13px",
  color: "var(--ink)",
  background: "transparent",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "8px 14px",
  cursor: "pointer",
};
