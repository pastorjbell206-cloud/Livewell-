/**
 * The way back from a page a track's session sent the reader to.
 *
 * A session notes where the reader stepped out (setReturn) as they follow its
 * link; components/TrackReturnBar draws "Back to session 3 of 12" on whatever
 * page they are on, and it goes when they come back to the tracks or hide
 * it. Kept for one sitting, in sessionStorage, through lib/storage.
 *
 * Its own small file because App.tsx reads it on every page, to know whether
 * the bar is wanted at all (the rest of lib/tracks.ts loads with the track
 * pages).
 */
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "./storage";

const TRACKS_PATH = "/tracks";
const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);

export const RETURN_KEY = "livewell-track-return-v1";

/** Kept for one sitting (sessionStorage): the session the reader stepped out of, and the page they were sent to. */
export interface TrackReturn {
  slug: string;
  n: number;
  total: number;
  /** The page the session opened. */
  to: string;
}

const isReturn = (x: unknown): x is TrackReturn =>
  isObject(x) && typeof x.slug === "string" && /^[a-z0-9-]+$/.test(x.slug) && Number.isInteger(x.n) && Number.isInteger(x.total) && typeof x.to === "string";

const sitting = () => (typeof window === "undefined" ? undefined : window.sessionStorage);

function safeSitting(): Storage | undefined {
  try {
    return sitting();
  } catch {
    return undefined;
  }
}

export function readReturn(): TrackReturn | null {
  const store = safeSitting();
  return store ? readStoredJSON<TrackReturn | null>(RETURN_KEY, (x): x is TrackReturn | null => x === null || isReturn(x), null, store) : null;
}

/** Called as the reader leaves a session for the page it opens. */
export function setReturn(r: TrackReturn): boolean {
  const store = safeSitting();
  const ok = store ? writeStoredJSON(RETURN_KEY, r, store) : false;
  if (ok && typeof window !== "undefined") window.dispatchEvent(new Event(RETURN_EVENT));
  return ok;
}

export function clearReturn(): void {
  const store = safeSitting();
  if (store) removeStoredJSON(RETURN_KEY, store);
  if (typeof window !== "undefined") window.dispatchEvent(new Event(RETURN_EVENT));
}

/** Fired on this window when the way back is set or cleared. */
export const RETURN_EVENT = "lw-track-return";

/** The words on the way back. */
export const returnLabel = (r: Pick<TrackReturn, "n" | "total">) => `Back to session ${r.n} of ${r.total}`;

/** The way back is offered on every page but the tracks' own, where the reader is already back. */
export const offersReturn = (pathname: string) => !(pathname === TRACKS_PATH || pathname.startsWith(`${TRACKS_PATH}/`)) && !pathname.startsWith("/admin");
