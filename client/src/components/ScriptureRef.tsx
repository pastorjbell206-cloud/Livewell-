/**
 * ScriptureRef — a Scripture citation that reads its own context.
 *
 * Renders a reference (e.g. "John 3:16", "Romans 13:1-7") as a quiet link into
 * the Passage Context tool, which already resolves `?ref=` deep links and shows
 * the passage's background, flow, and the debates around it. A dotted mustard
 * underline signals it is live; the title gives the hover hint. No network
 * fetch here — the tool does the work — so it never fails or half-loads.
 *
 * Use it anywhere a Scripture reference is rendered as structured data (a
 * doctrine's key texts, a question's passages, a topic's proof texts) to turn
 * every citation into a door to its context instead of dead text.
 */
import { Link } from "wouter";
import type { CSSProperties } from "react";

export function ScriptureRef({
  reference,
  style,
}: {
  reference: string;
  style?: CSSProperties;
}) {
  const ref = (reference ?? "").trim();
  if (!ref) return null;
  return (
    <Link
      href={`/theology/passage?ref=${encodeURIComponent(ref)}`}
      title={`Read ${ref} in context`}
      style={{
        color: "inherit",
        borderBottom: "1px dotted var(--mustard)",
        textDecoration: "none",
        cursor: "help",
        ...style,
      }}
    >
      {ref}
    </Link>
  );
}

export default ScriptureRef;
