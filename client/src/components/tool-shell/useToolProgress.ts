/**
 * useToolProgress: a tool's saved place, kept on this device through
 * lib/storage.ts under `livewell-progress-<tool>`. The shape guard decides
 * whether what is stored can be trusted; anything else starts fresh.
 *
 *   const p = useToolProgress("wisdom-finder", isFinderPlace, { q: "" });
 *   p.value            what is saved (or the start value)
 *   p.set(next)        save (a value or an updater)
 *   p.resumed          true when the page opened on a saved place
 *   p.saveFailed       true once the browser refused a write: show SAVE_FAILED
 *   p.clear()          forget it (Start over)
 */
import { useCallback, useRef, useState } from "react";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";

/** The sentence every tool shows when the browser will not keep its work (CLAUDE.md, Elevation Standards). */
export { SAVE_FAILED } from "@/components/TakeItWithYou";

export const progressKey = (tool: string) => `livewell-progress-${tool}`;

/**
 * `where`: "local" (the default) keeps the place until the reader clears it;
 * "session" keeps it only until the tab closes, for anything a reader might
 * not want left on a shared device (what they typed into a search).
 */
function readStart<T>(key: string, guard: (x: unknown) => x is T, start: T, store: Storage | undefined): { value: T; resumed: boolean } {
  try {
    const stored = readStoredJSON<T | null>(key, (x): x is T | null => guard(x), null, store);
    return stored === null ? { value: start, resumed: false } : { value: stored, resumed: true };
  } catch {
    return { value: start, resumed: false };
  }
}

function write(key: string, v: unknown, store: Storage | undefined): boolean {
  try {
    return writeStoredJSON(key, v, store);
  } catch {
    return false;
  }
}

export function useToolProgress<T>(tool: string, guard: (x: unknown) => x is T, start: T, where: "local" | "session" = "local") {
  const key = progressKey(tool);
  const store = () => (where === "session" && typeof window !== "undefined" ? window.sessionStorage : undefined);
  const [init] = useState(() => readStart(key, guard, start, store()));
  const [value, setValue] = useState<T>(init.value);
  const [saveFailed, setSaveFailed] = useState(false);
  const current = useRef<T>(init.value);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const v = typeof next === "function" ? (next as (p: T) => T)(current.current) : next;
      current.current = v;
      setValue(v);
      if (!write(key, v, store())) setSaveFailed(true);
    },
    // `store` reads `where`, which is in the list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, where],
  );

  const clear = useCallback(() => {
    try {
      removeStoredJSON(key, store());
    } catch {
      /* storage unavailable: nothing to clear */
    }
    current.current = start;
    setValue(start);
    // `start` is the caller's initial value; a new object each render must not re-run this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, where]);

  return { value, set, clear, saveFailed, resumed: init.resumed };
}
