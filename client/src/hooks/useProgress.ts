import { useCallback, useState } from "react";
import { readStoredJSON, writeStoredJSON, removeStoredJSON } from "@/lib/storage";

/**
 * "The page remembers where you stopped." Extracted from the Discipleship
 * Pathway's inline persistence so every checklist-style surface (the pathway,
 * the family catechism, the reading plans) behaves the same way: a set of
 * completed item ids kept in guarded localStorage, with a non-destructive reset.
 *
 * `persisted` is false when the browser refused the last save (private mode,
 * full quota) so a page can tell the reader their progress will not survive a
 * reload, per the storage-honesty standard.
 */
type DoneMap = Record<string, boolean>;

const isDoneMap = (x: unknown): x is DoneMap =>
  !!x && typeof x === "object" && !Array.isArray(x);

export interface Progress {
  done: DoneMap;
  isDone: (id: string) => boolean;
  toggle: (id: string) => void;
  reset: () => void;
  count: number;
  persisted: boolean;
}

export function useProgress(key: string): Progress {
  const [done, setDone] = useState<DoneMap>(() => readStoredJSON<DoneMap>(key, isDoneMap, {}));
  const [persisted, setPersisted] = useState(true);

  const toggle = useCallback(
    (id: string) => {
      setDone((prev) => {
        const next = { ...prev };
        if (next[id]) delete next[id];
        else next[id] = true;
        setPersisted(writeStoredJSON(key, next));
        return next;
      });
    },
    [key]
  );

  const isDone = useCallback((id: string) => Boolean(done[id]), [done]);

  const reset = useCallback(() => {
    setDone({});
    removeStoredJSON(key);
    setPersisted(true);
  }, [key]);

  const count = Object.values(done).filter(Boolean).length;

  return { done, isDone, toggle, reset, count, persisted };
}
