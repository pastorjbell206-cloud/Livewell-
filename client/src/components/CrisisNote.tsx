/**
 * CrisisNote: the line that sits beside every form that writes to James
 * (/contact and /connect). A message form is not crisis care, so the way to
 * real help stays next to it. One wording, in one place.
 */
import { Link } from "wouter";

export default function CrisisNote({ style }: { style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)", margin: 0, ...style }}>
      If you are in crisis or thinking about ending your life, do not wait on a reply here. In the US, call or text
      988 for the Suicide and Crisis Lifeline.{" "}
      <Link
        href="/help"
        style={{ color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "1px" }}
      >
        Find Help
      </Link>{" "}
      has more.
    </p>
  );
}
