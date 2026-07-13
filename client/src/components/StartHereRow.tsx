/**
 * StartHereRow — the hub spine from the wayfinding audit. A hub that opens on
 * a wall of cards makes a first-time reader do the curating; this row does it
 * for them: "start with these three," in order, each with one honest line.
 * The full grids stay below — depth intact, overwhelm gone.
 */
import { Link } from "wouter";

export interface StartHereItem {
  title: string;
  blurb: string;
  href: string;
}

export function StartHereRow({
  eyebrow = "New here? Start with these",
  items,
}: {
  eyebrow?: string;
  items: StartHereItem[];
}) {
  return (
    <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "16px" }}>{eyebrow}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "16px" }}>
          {items.map((it, i) => (
            <Link
              key={it.href}
              href={it.href}
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-sm)",
                padding: "18px 20px",
                textDecoration: "none",
              }}
            >
              <span aria-hidden style={{ fontFamily: "var(--F)", fontSize: "28px", lineHeight: 1, color: "var(--mustard)", fontStyle: "italic", flex: "0 0 auto" }}>
                {i + 1}
              </span>
              <span>
                <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)", marginBottom: "6px" }}>
                  {it.title}
                </span>
                <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.55, color: "var(--ink-muted)" }}>
                  {it.blurb}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
