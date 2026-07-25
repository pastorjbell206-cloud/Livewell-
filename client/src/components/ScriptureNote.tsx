/**
 * ScriptureNote — the one place a page tells the reader what its verse text is.
 *
 * CLAUDE.md requires Scripture verbatim (ESV by default), with the translation
 * named when the choice is doing work, or marked plainly as paraphrase. The
 * tool corpora predate that rule: they mix translations without saying so. A
 * reader memorising from ScriptureMemory cannot tell which text they are
 * committing, and a pastor cannot cite a handout. Until each corpus is sourced
 * against one translation, every page that renders verse text says what that
 * text is and points to the whole passage so a reader can check it.
 *
 * `rendering` is required on purpose. The type system, not a reviewer, is what
 * keeps the next tool from shipping unlabeled Scripture;
 * `scripts/validate-scripture.mjs` is the second gate.
 */

export type ScriptureRendering =
  | "esv"
  | "kjv"
  | "niv"
  | "nasb"
  /** Text has not been checked word for word against a single translation. */
  | "unverified"
  /** Text is shortened to the line in view, not the whole verse. */
  | "abridged"
  /** Wording is our own summary of the verse, not a quotation of it. */
  | "paraphrase";

const TRANSLATION_NAMES: Partial<Record<ScriptureRendering, string>> = {
  esv: "English Standard Version",
  kjv: "King James Version",
  niv: "New International Version",
  nasb: "New American Standard Bible",
};

function claimFor(rendering: ScriptureRendering): string {
  if (rendering === "abridged") {
    return "The verse text here is shortened to the line in view, not the whole verse.";
  }
  if (rendering === "paraphrase") {
    return "The wording here is a paraphrase, not a quotation.";
  }
  if (rendering === "unverified") {
    return "The verse text here has not been checked word for word against one translation.";
  }
  return `Scripture quoted from the ${TRANSLATION_NAMES[rendering]}.`;
}

export default function ScriptureNote({
  rendering,
}: {
  rendering: ScriptureRendering;
}) {
  return (
    <p
      style={{
        fontFamily: "var(--B)",
        fontSize: "13px",
        lineHeight: 1.6,
        color: "var(--ink-muted)",
        margin: "0 0 12px",
        maxWidth: "60ch",
      }}
    >
      {claimFor(rendering)} Follow any reference to read the passage in full.
    </p>
  );
}
