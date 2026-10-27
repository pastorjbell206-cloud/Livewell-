/**
 * TextSize: the reader's own size for an essay's text (A− and A+).
 *
 * Four steps around the page's own size. The choice is kept on this device
 * through lib/storage, so the next essay opens at the same size, and nothing
 * leaves the browser. It is separate from Focus mode: Focus sets the measure
 * and the rhythm, and this scales the type inside whichever one the reader is
 * in. When the browser refuses the write, the size still changes for this
 * visit and a quiet line says it will not be remembered.
 */
import { useId, useState, type CSSProperties } from "react";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

export const TEXT_SIZE_KEY = "livewell-text-size";

export const TEXT_SIZES = [
  { id: "smaller", label: "Smaller", scale: 0.9 },
  { id: "standard", label: "Standard", scale: 1 },
  { id: "larger", label: "Larger", scale: 1.15 },
  { id: "largest", label: "Largest", scale: 1.3 },
] as const;

export type TextSizeId = (typeof TEXT_SIZES)[number]["id"];

const isTextSizeId = (x: unknown): x is TextSizeId => TEXT_SIZES.some((s) => s.id === x);

/** The reader's text size, read from this device once and written back on every change. */
export function useTextSize() {
  const [size, setSizeState] = useState<TextSizeId>(() => readStoredJSON(TEXT_SIZE_KEY, isTextSizeId, "standard"));
  const [saveFailed, setSaveFailed] = useState(false);
  const setSize = (next: TextSizeId) => {
    setSizeState(next);
    setSaveFailed(!writeStoredJSON(TEXT_SIZE_KEY, next));
  };
  const scale = TEXT_SIZES.find((s) => s.id === size)?.scale ?? 1;
  return { size, scale, setSize, saveFailed };
}

const button: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "44px",
  minHeight: "44px",
  padding: "8px 10px",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  background: "transparent",
  color: "var(--ink)",
  fontFamily: "var(--U)",
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: 1,
  cursor: "pointer",
};

const quiet: CSSProperties = { fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)" };

export function TextSize({
  size,
  onChange,
  saveFailed = false,
}: {
  size: TextSizeId;
  onChange: (next: TextSizeId) => void;
  /** The last change could not be written to this browser. */
  saveFailed?: boolean;
}) {
  const labelId = useId();
  const [announce, setAnnounce] = useState("");
  const index = Math.max(0, TEXT_SIZES.findIndex((s) => s.id === size));
  const atSmallest = index === 0;
  const atLargest = index === TEXT_SIZES.length - 1;

  // The buttons stay focusable at either end (aria-disabled, not disabled),
  // so a keyboard reader's focus is never dropped when a limit is reached.
  const step = (by: number) => {
    const next = TEXT_SIZES[Math.min(TEXT_SIZES.length - 1, Math.max(0, index + by))];
    if (next.id === size) return;
    onChange(next.id);
    setAnnounce(`Text size: ${next.label}`);
  };

  return (
    <div className="no-print" style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: "6px 8px" }}>
      <div role="group" aria-labelledby={labelId} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
        {/* .text-size__label: a page may hide the word on a phone (index.css); it stays the group's name. */}
        <span id={labelId} className="text-size__label" style={{ ...quiet, fontWeight: 600, marginRight: "2px" }}>
          Text size
        </span>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-disabled={atSmallest}
          aria-label="Smaller text"
          style={{ ...button, opacity: atSmallest ? 0.4 : 1, cursor: atSmallest ? "default" : "pointer" }}
        >
          A−
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-disabled={atLargest}
          aria-label="Larger text"
          style={{ ...button, fontSize: "19px", opacity: atLargest ? 0.4 : 1, cursor: atLargest ? "default" : "pointer" }}
        >
          A+
        </button>
      </div>
      <span role="status" className="sr-only">
        {announce}
      </span>
      {saveFailed && (
        <span style={quiet}>Couldn't save to this browser, so the size resets when you reload.</span>
      )}
    </div>
  );
}

export default TextSize;
