/**
 * Keep the screen awake while `active` (table mode: a phone propped against
 * the salt shaker should not go dark mid-prayer). Uses the Screen Wake Lock
 * API where the browser has it, and does nothing where it does not. The
 * browser drops the lock whenever the page is hidden, so it is asked for
 * again when the page comes back; it is let go when `active` turns false or
 * the component leaves.
 */
import { useEffect } from "react";

interface Sentinel {
  release: () => Promise<void>;
}
interface WakeLockApi {
  request: (type: "screen") => Promise<Sentinel>;
}

function api(): WakeLockApi | null {
  try {
    const wl = (navigator as Navigator & { wakeLock?: WakeLockApi }).wakeLock;
    return wl && typeof wl.request === "function" ? wl : null;
  } catch {
    return null;
  }
}

export function useWakeLock(active: boolean): void {
  useEffect(() => {
    const wl = active ? api() : null;
    if (!wl) return;
    let sentinel: Sentinel | null = null;
    let live = true;
    const ask = () => {
      if (document.visibilityState !== "visible") return;
      wl.request("screen")
        .then((s) => {
          if (live) sentinel = s;
          else s.release().catch(() => {});
        })
        .catch(() => {
          // Refused (battery saver, no user gesture yet, a frame without
          // permission): the screen simply sleeps as it always has.
        });
    };
    ask();
    document.addEventListener("visibilitychange", ask);
    return () => {
      live = false;
      document.removeEventListener("visibilitychange", ask);
      sentinel?.release().catch(() => {});
    };
  }, [active]);
}
