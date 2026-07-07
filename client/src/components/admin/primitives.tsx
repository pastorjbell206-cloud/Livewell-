/**
 * Admin primitives — the small set of building blocks every admin screen is
 * composed from, so current and future pages are consistent by construction.
 *
 * Rules they encode once so pages don't have to:
 * - real loading / empty / error states (no silent failures, no infinite spinners)
 * - layouts that never overlap at any width (wrap + minWidth: 0)
 * - the admin palette (light workspace; mustard as accent only)
 */
import type { CSSProperties, ReactNode } from "react";
import { Loader2 } from "lucide-react";

// The admin's working palette (the .admin-scope light workspace).
export const A = {
  ink: "#1A1A1A",
  muted: "#6B7280",
  faint: "#9CA3AF",
  line: "#E5E7EB",
  card: "#FFFFFF",
  accent: "#B8963E", // print-safe mustard for small accents
  danger: "#9B2C2C",
  ok: "#2E7D32",
} as const;

/** A titled section with the standard heading + description rhythm. */
export function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-2xl font-bold mb-1" style={{ color: A.ink }}>{title}</h2>
      {description && <p className="font-body text-sm" style={{ color: A.muted }}>{description}</p>}
    </div>
  );
}

/** The standard white card. */
export function Panel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ background: A.card, border: `1px solid ${A.line}`, borderRadius: 8, padding: "16px 18px", ...style }}>
      {children}
    </div>
  );
}

/** A big number with a label and a footnote, top-accented. */
export function StatTile({ label, value, sub, color = "#2C3E50" }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="flex flex-col p-6 rounded-lg" style={{ background: A.card, borderTop: `5px solid ${color}`, boxShadow: "0 1px 3px rgba(26,26,26,0.08)" }}>
      <div className="font-ui text-xs uppercase tracking-wider mb-3" style={{ color: A.muted }}>{label}</div>
      <div className="font-display font-bold" style={{ color, fontSize: "2.4rem", lineHeight: 1 }}>{value}</div>
      {sub && <div className="font-ui text-xs mt-2" style={{ color: A.faint }}>{sub}</div>}
    </div>
  );
}

/** Loading line — one consistent look, never an unlabeled spinner. */
export function LoadingNote({ label = "Loading…" }: { label?: string }) {
  return (
    <p className="font-body text-sm" style={{ color: A.muted }}>
      <Loader2 size={16} className="animate-spin inline" /> {label}
    </p>
  );
}

/** Error line — states what failed and that it is safe to retry. */
export function ErrorNote({ children }: { children: ReactNode }) {
  return <p className="font-body text-sm" style={{ color: A.danger }}>{children}</p>;
}

/** Empty state — a fact, not an apology. */
export function EmptyNote({ children }: { children: ReactNode }) {
  return <p className="font-body text-sm" style={{ color: A.faint }}>{children}</p>;
}
