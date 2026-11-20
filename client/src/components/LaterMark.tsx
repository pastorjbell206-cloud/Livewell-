/**
 * The mark around verses this Bible prints but the earliest manuscripts do
 * not have (Mark 16:9-20, John 7:53 to 8:11): a small muted label and an
 * opening bracket before the first verse of a run, a closing bracket after
 * the last. A verse left out altogether (Acts 8:37) has its own note and is
 * not part of a run. Styles: .bible-later in index.css.
 */
export const LATER_LABEL = "Not in the earliest manuscripts";

type Flagged = { t: string; later?: boolean };

/** Where verse `i` sits in a run of printed, flagged verses: null outside one. */
export function laterEdge(verses: readonly Flagged[], i: number): { open: boolean; close: boolean } | null {
  const on = (j: number) => Boolean(verses[j]?.later && verses[j]?.t);
  return on(i) ? { open: !on(i - 1), close: !on(i + 1) } : null;
}

export function LaterOpen() {
  return (
    <span className="bible-later">
      <span className="bible-later__label">{LATER_LABEL}</span>{" "}
      <span className="bible-later__bracket" aria-hidden>[</span>
    </span>
  );
}

export function LaterClose() {
  return (
    <span className="bible-later">
      <span className="bible-later__bracket" aria-hidden>]</span>
      <span className="sr-only">End of the verses not in the earliest manuscripts.</span>{" "}
    </span>
  );
}
