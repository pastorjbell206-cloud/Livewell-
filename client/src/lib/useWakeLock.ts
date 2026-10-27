/**
 * Keep the screen awake while `active` (table mode: a phone propped against
 * the salt shaker should not go dark mid-prayer). Uses the Screen Wake Lock
 * API where the browser has it, and does nothing where it does not. The
 * browser drops the lock whenever the page is hidden, so it is asked for
 * again when the page comes back. A browser that refuses a lock asked for
 * without a tap (the page opens after a fetch) is asked again on the next
 * tap or key, such as Next. The lock is let go when `active` turns false or the
 * component leaves.
 */
import { useEffect } from "react";

interface Sentinel {
  release: () => Promise<void>;
  addEventListener?: (type: "release", listener: () => void) => void;
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
    let asking = false;
    let live = true;
    const ask = () => {
      if (!live || sentinel || asking || document.visibilityState !== "visible") return;
      asking = true;
      wl.request("screen")
        .then((s) => {
          asking = false;
          if (!live) {
            s.release().catch(() => {});
            return;
          }
          sentinel = s;
          // The browser lets go on its own (the page hidden, battery saver).
          s.addEventListener?.("release", () => {
            if (sentinel === s) sentinel = null;
          });
        })
        .catch(() => {
          // Refused (battery saver, no tap yet, a frame without permission):
          // the screen sleeps as it always has, until the next tap asks again.
          asking = false;
        });
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") ask();
      else sentinel = null; // released by the browser when the page hides
    };
    ask();
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pointerdown", ask);
    document.addEventListener("keydown", ask);
    return () => {
      live = false;
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerdown", ask);
      document.removeEventListener("keydown", ask);
      sentinel?.release().catch(() => {});
    };
  }, [active]);
}
