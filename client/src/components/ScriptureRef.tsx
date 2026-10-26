/**
 * ScriptureRef: a Scripture citation held as data (a doctrine's key texts, a
 * passage under discussion) rendered as a link into the Study Bible chapter
 * (master plan 7.1; it used to open the Passage Context tool).
 *
 * The field is not always one clean reference: "Jonah 3:10 with Jeremiah
 * 18:7-10" makes both references live, "Acts 2 (Pentecost and Peter's
 * sermon)" links the reference and keeps the note as text, and a book outside
 * the Protestant canon ("Wisdom 2:12-20") stays plain text. Link mode, so the
 * page's own translation is never set beside another.
 */
import type { CSSProperties } from "react";
import { RefText, VerseRef } from "@/components/VerseRef";
import { parseScriptureRef } from "@/lib/scripture-ref";

export function ScriptureRef({
  reference,
  style,
}: {
  reference: string;
  style?: CSSProperties;
}) {
  const ref = (reference ?? "").trim();
  if (!ref) return null;
  if (parseScriptureRef(ref)) return <VerseRef reference={ref} mode="link" style={style} />;
  return (
    <span style={style}>
      <RefText text={ref} mode="link" />
    </span>
  );
}

export default ScriptureRef;
