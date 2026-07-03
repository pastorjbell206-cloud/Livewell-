/**
 * CrisisHelp — a quiet, consistent path to real help for the crisis-facing pages
 * (marriage in trouble, grief, anxiety, doubt, burnout). The wording mirrors the
 * canonical note on /help: validate the person, point to real professional and
 * emergency help, and say plainly that this site supports that help and does not
 * replace it. Never alarmist, never a funnel — care before content.
 */
export function CrisisHelp() {
  return (
    <aside
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
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "var(--ink-muted)",
          margin: 0,
        }}
      >
        If you are in crisis or thinking about ending your life, please reach out now.
        In the US, call or text <strong style={{ color: "var(--ink)" }}>988</strong> for
        the Suicide and Crisis Lifeline, and tell someone who loves you. This site
        supports the work of doctors, counselors, and pastors. It does not replace them.{" "}
        <a
          href="/help"
          style={{ color: "var(--mustard-text)", fontWeight: 600, textDecoration: "none" }}
        >
          Find more help →
        </a>
      </p>
    </aside>
  );
}
