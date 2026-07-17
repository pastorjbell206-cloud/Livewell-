import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

/**
 * ToolStrip — surfaces the working instruments inside the room they serve
 * (the audit's "re-attachment rule": a tool drawer at /tools is not a
 * workflow). Compact card grid in house tokens; renders on light sections.
 */
export interface ToolStripItem {
  href: string;
  label: string;
  blurb: string;
}

export default function ToolStrip({
  heading = "The instruments",
  intro,
  tools,
}: {
  heading?: string;
  intro?: string;
  tools: ToolStripItem[];
}) {
  if (!tools.length) return null;
  return (
    <div>
      <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "0.75rem" }}>{heading}</div>
      {intro && (
        <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "1.4rem" }}>
          {intro}
        </p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.75rem" }}>
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            style={{ display: "block", textDecoration: "none", background: "var(--card)", border: "1px solid rgba(20,17,12,0.12)", padding: "1.1rem 1.2rem" }}
          >
            <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.08rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.3rem" }}>
              {t.label} <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
            </span>
            <span style={{ display: "block", fontSize: "0.83rem", lineHeight: 1.55, color: "var(--ink-muted)" }}>{t.blurb}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
