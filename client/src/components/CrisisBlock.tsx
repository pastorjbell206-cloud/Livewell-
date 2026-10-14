/**
 * CrisisBlock — the one place a page shows how to reach a person now.
 *
 * Every number, text code, and link comes from data/crisis-resources.json,
 * where each line carries its official source and the date it was checked
 * (scripts/validate-needs.mjs fails CI when that date goes stale). No page
 * writes a crisis number into its own copy; it renders this.
 *
 * Two forms. `full` leads a care page on a sensitive subject and sits near
 * the top of /help: tap-to-call and tap-to-text buttons sized for a thumb,
 * the lines a topic calls for, and the date the numbers were checked.
 * `compact` is one quiet paragraph for result screens and page ends.
 *
 * The 988 Lifeline always shows. `topics` adds the Crisis Text Line
 * (suicide), the Domestic Violence Hotline (abuse), RAINN (sexual-assault),
 * and SAMHSA's helpline (substance). Calm, never alarmist, never a funnel.
 */
import type { CSSProperties } from "react";
import { Link } from "wouter";
import crisis from "@/data/crisis-resources.json";

export type CrisisTopic = "suicide" | "abuse" | "sexual-assault" | "substance";

interface Action { kind: string; label: string; href: string }
interface Resource {
  id: string;
  name: string;
  for: string;
  topics: string[];
  actions: Action[];
  more?: string;
  hours: string;
  source: string;
}

const RESOURCES = crisis.resources as Resource[];

/** The lines a set of topics calls for, 988 first. */
export function crisisLines(topics: readonly CrisisTopic[]): Resource[] {
  const wanted = new Set<string>(topics);
  return RESOURCES.filter((r) => r.id === "988" || r.topics.some((t) => wanted.has(t)));
}

/** "2026-09-29" -> "September 29, 2026", without a time zone shifting the day. */
export function checkedLabel(iso: string = crisis.checked): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m - 1];
  return `${month} ${d}, ${y}`;
}

const btn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: "10px 16px",
  borderRadius: "var(--radius-pill)",
  background: "var(--charcoal)",
  color: "var(--charcoal-fg)",
  fontFamily: "var(--U)",
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const btnQuiet: CSSProperties = {
  ...btn,
  background: "transparent",
  color: "var(--ink)",
  border: "1px solid var(--border)",
};

function Line({ r }: { r: Resource }) {
  return (
    <li style={{ padding: "16px 0", borderTop: "1px solid var(--border)", listStyle: "none" }}>
      <p style={{ fontFamily: "var(--U)", fontSize: "16px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>{r.name}</p>
      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 12px", maxWidth: "60ch" }}>
        {r.for} {r.hours}.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {r.actions.map((a, i) =>
          a.kind === "chat" ? (
            <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={btnQuiet}>
              {a.label}
              <span className="sr-only"> with {r.name} (opens in a new tab)</span>
            </a>
          ) : (
            <a key={a.href} href={a.href} style={i === 0 ? btn : btnQuiet}>
              {a.label}
              <span className="sr-only"> ({r.name})</span>
            </a>
          ),
        )}
      </div>
      {r.more && (
        <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "10px 0 0", maxWidth: "60ch" }}>{r.more}</p>
      )}
    </li>
  );
}

export function CrisisBlock({
  topics = ["suicide"],
  variant = "full",
  heading = "Help, right now",
  id,
}: {
  topics?: readonly CrisisTopic[];
  variant?: "full" | "compact";
  heading?: string;
  id?: string;
}) {
  if (variant === "compact") {
    return (
      <aside
        id={id}
        role="note"
        aria-label="Where to find help now"
        style={{
          maxWidth: "var(--w-prose)",
          margin: "var(--s-4) auto",
          padding: "18px 20px",
          background: "var(--bone-warm)",
          borderLeft: "3px solid var(--mustard)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", margin: 0 }}>
          If you are in crisis or thinking about ending your life, call or text{" "}
          <a href="tel:988" style={{ color: "var(--ink)", fontWeight: 600 }}>988</a> for the Suicide &amp; Crisis
          Lifeline, or text <a href="sms:741741?&body=HOME" style={{ color: "var(--ink)", fontWeight: 600 }}>HOME to 741741</a>.
          If anyone is in immediate danger, call <a href="tel:911" style={{ color: "var(--ink)", fontWeight: 600 }}>911</a>.
          {/* Lines beyond 988 and the Crisis Text Line, when the page's subject calls for them. */}
          {crisisLines(topics)
            .filter((r) => r.id !== "988" && r.id !== "crisis-text-line")
            .map((r) => (
              <span key={r.id}>
                {" "}{r.name}:{" "}
                {r.actions.filter((a) => a.kind !== "chat").map((a, i) => (
                  <span key={a.href}>
                    {i > 0 && " or "}
                    <a href={a.href} style={{ color: "var(--ink)", fontWeight: 600 }}>{a.label.replace(/^(Call|Text) /, (m) => m.toLowerCase())}</a>
                  </span>
                ))}
                .
              </span>
            ))}{" "}
          This site supports the work of doctors, counselors, and pastors. It does not replace them.{" "}
          <Link href="/help" style={{ color: "var(--mustard-text)", fontWeight: 600, textDecoration: "none" }}>
            Find help for what you are facing →
          </Link>
        </p>
      </aside>
    );
  }

  const lines = crisisLines(topics);
  const headingId = `${id || "crisis"}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderLeft: "3px solid var(--mustard)",
        borderRadius: "var(--radius-sm)",
        padding: "clamp(18px, 3vw, 28px)",
      }}
    >
      <h2 id={headingId} style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)", margin: "0 0 8px" }}>
        {heading}
      </h2>
      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 8px", maxWidth: "62ch" }}>
        If you might hurt yourself or someone else, or you are not safe where you are, stop reading and reach a person now. These lines are free and confidential, day or night.
      </p>
      <ul style={{ margin: "8px 0 0", padding: 0 }}>
        {lines.map((r) => <Line key={r.id} r={r} />)}
        <li style={{ padding: "16px 0 4px", borderTop: "1px solid var(--border)", listStyle: "none", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <a href={crisis.emergency.href} style={btn}>{crisis.emergency.label}</a>
          <span style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>{crisis.emergency.for}</span>
        </li>
      </ul>
      {topics.includes("abuse") && (
        <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "12px 0 0", maxWidth: "62ch" }}>
          If someone checks your phone or computer, look for help on a device they cannot see, and clear your browsing history afterward.
        </p>
      )}
      <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "14px 0 0", maxWidth: "62ch" }}>
        Numbers checked {checkedLabel()} against each service's official site (US). This site supports the work of doctors, counselors, and pastors. It does not replace them.
      </p>
    </section>
  );
}

export default CrisisBlock;
