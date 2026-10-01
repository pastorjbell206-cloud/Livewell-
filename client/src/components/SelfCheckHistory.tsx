/**
 * SelfCheckHistory — what has moved since the last time you looked.
 *
 * docs/grow/GROW-PROMPT.md 7.2: every instrument saves device-locally
 * through lib/storage, shows change over time, and offers "Change my
 * answers." The Whole-Life Assessment already keeps a history; this gives
 * every other self-check the same thing with one line on its results screen:
 *
 *   <SelfCheckHistory id="emotional-health" total={pct} areas={{ Rest: 0.4 }} />
 *
 * A run is recorded once per completed result (the same answers on a
 * re-render never count twice), kept to the last twelve, and never leaves
 * the browser. When the browser refuses to save, the page says so.
 */
import { useState } from "react";
import { readStoredJSON, writeStoredJSON, removeStoredJSON } from "@/lib/storage";

export interface SelfCheckRun {
  date: string;
  /** 0..1 */
  total: number;
  /** area name -> 0..1 */
  areas: Record<string, number>;
  /** fingerprint of the answers, so a re-render never records twice */
  key: string;
}

const MAX_RUNS = 12;
const storageKey = (id: string) => `livewell-history-${id}`;

const isRuns = (x: unknown): x is SelfCheckRun[] =>
  Array.isArray(x) &&
  x.every((r) => r && typeof r.date === "string" && typeof r.total === "number" && typeof r.areas === "object" && typeof r.key === "string");

export function loadRuns(id: string): SelfCheckRun[] {
  return readStoredJSON(storageKey(id), isRuns, []);
}

const pct = (x: number) => `${Math.round(x * 100)}%`;

function change(now: number, then: number): string {
  const d = Math.round((now - then) * 100);
  if (d === 0) return "no change";
  return d > 0 ? `up ${d} points` : `down ${-d} points`;
}

export function SelfCheckHistory({
  id,
  total,
  areas,
  answersKey,
}: {
  id: string;
  total: number;
  areas: Record<string, number>;
  /** Any stable string built from the answers (e.g. JSON of the answer map). */
  answersKey: string;
}) {
  // Record this finished run once, while the component first renders: the
  // same answers never count twice, so a remount (or React's development
  // double render) adds nothing.
  const [{ runs, saveFailed }, setHistory] = useState(() => {
    const existing = loadRuns(id);
    if (existing.length && existing[existing.length - 1].key === answersKey) return { runs: existing, saveFailed: false };
    const next = [...existing, { date: new Date().toISOString(), total, areas, key: answersKey }].slice(-MAX_RUNS);
    return { runs: next, saveFailed: !writeStoredJSON(storageKey(id), next) };
  });

  const previous = runs.length >= 2 ? runs[runs.length - 2] : null;
  const clear = () => {
    if (!window.confirm("Clear the history of this self-check from this browser? Your results on screen stay.")) return;
    removeStoredJSON(storageKey(id));
    setHistory({ runs: [], saveFailed: false });
  };

  return (
    <section aria-label="Your history with this self-check" style={{ maxWidth: "var(--w-prose)", margin: "var(--s-4) auto", textAlign: "left" }}>
      <h2 style={{ fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, color: "var(--ink)", margin: "0 0 8px" }}>Since the last time</h2>
      {previous ? (
        <>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 10px" }}>
            You last took this on {new Date(previous.date).toLocaleDateString()}. Overall you are at {pct(total)}, {change(total, previous.total)}.
          </p>
          <ul style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0, paddingLeft: "1.2em" }}>
            {Object.entries(areas).map(([name, v]) =>
              previous.areas[name] === undefined ? null : (
                <li key={name}>{name}: {pct(v)}, {change(v, previous.areas[name])}</li>
              ),
            )}
          </ul>
        </>
      ) : (
        <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink-muted)", margin: 0 }}>
          This is your first time here, or the first this browser remembers. Come back in a few months and this will show what has moved.
        </p>
      )}
      <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "10px 0 0" }}>
        Saved only in this browser, never sent anywhere.{" "}
        {runs.length > 0 && (
          <button type="button" onClick={clear} style={{ font: "inherit", color: "var(--mustard-text)", background: "none", border: 0, padding: 0, cursor: "pointer", textDecoration: "underline" }}>
            Clear history
          </button>
        )}
      </p>
      {saveFailed && (
        <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "6px 0 0" }}>
          Couldn't save to this browser — your work here will not survive a reload.
        </p>
      )}
    </section>
  );
}

export default SelfCheckHistory;
