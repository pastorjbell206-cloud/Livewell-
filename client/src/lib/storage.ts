/**
 * Guarded localStorage JSON (roadmap HS-4, audit 15 H3), modeled on
 * FormationInventory's read/save pair — the pattern that never crashed.
 *
 * Read: try/catch around getItem + JSON.parse, then the CALLER's shape guard
 * decides whether the parsed value is trustworthy; anything else returns the
 * fallback. This is what stands between corrupt storage and a blank page
 * over pastoral-care records.
 *
 * Write: try/catch returning success, so a page that promises "this stays on
 * your device" can tell the truth when the device says no (private mode,
 * full quota) — render one quiet, persistent line on false:
 * "Couldn't save to this browser — your work here will not survive a reload."
 */
export function readStoredJSON<T>(
  key: string,
  validate: (x: unknown) => x is T,
  fallback: T
): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredJSON(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** The shape guard most call sites need: an array whose elements pass `check`. */
export function isArrayOf<T>(check: (x: unknown) => x is T) {
  return (x: unknown): x is T[] => Array.isArray(x) && x.every(check);
}
