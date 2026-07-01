import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * PageEndNav — a small "what next" block for the foot of a detail page so no
 * page is a dead end. Always offers a way back to the hub it came from, and
 * optionally a few onward links. Token-styled to match the editorial system.
 */
export interface OnwardLink {
  href: string;
  label: string;
}

interface PageEndNavProps {
  /** The hub this page belongs to, e.g. { href: "/writing", label: "All essays" }. */
  back: OnwardLink;
  /** Optional onward links ("read next"). */
  next?: OnwardLink[];
}

export default function PageEndNav({ back, next }: PageEndNavProps) {
  return (
    <nav
      aria-label="Where to go next"
      style={{
        maxWidth: "var(--w-prose)",
        margin: "var(--s-6) auto 0",
        padding: "var(--s-5) var(--s-4) 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <Link
        href={back.href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--U)",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--mustard-text)",
          textDecoration: "none",
        }}
      >
        <ArrowLeft size={16} aria-hidden />
        {back.label}
      </Link>

      {next && next.length > 0 && (
        <div style={{ marginTop: "var(--s-4)" }}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>
            Read next
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
            {next.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--B)",
                    fontSize: "16px",
                    color: "var(--ink)",
                    textDecoration: "none",
                  }}
                >
                  <ArrowRight size={15} aria-hidden style={{ color: "var(--mustard-text)", flexShrink: 0 }} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
