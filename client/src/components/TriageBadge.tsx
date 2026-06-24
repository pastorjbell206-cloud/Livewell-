/**
 * The doctrinal triage badge — first, second, or third order — shown on every
 * doctrine so a reader always knows how much weight a disagreement carries.
 */
import { TRIAGE, type Triage } from "@/lib/theology";

export function TriageBadge({ triage, withShort = false }: { triage: Triage; withShort?: boolean }) {
  const t = TRIAGE[triage];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      <span
        style={{
          fontFamily: "var(--U)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: t.color, background: t.bg,
          border: `1px solid ${t.color}33`, borderRadius: "999px", padding: "4px 12px",
        }}
      >
        {t.label}
      </span>
      {withShort && (
        <span style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", fontStyle: "italic" }}>
          {t.short}
        </span>
      )}
    </span>
  );
}
