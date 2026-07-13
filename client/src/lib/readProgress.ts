import { readStoredJSON, writeStoredJSON } from "@/lib/storage";

/**
 * readProgress — the site's memory of which essays a reader has opened
 * (board audit P13: "depth's memory"). One localStorage key, a plain list
 * of slugs, capped so it can never grow unbounded. Device-local; never
 * sent anywhere.
 */
const KEY = "livewell-read-essays";
const CAP = 800;

const isSlugList = (x: unknown): x is string[] =>
  Array.isArray(x) && x.every((s) => typeof s === "string");

export function getReadEssays(): Set<string> {
  return new Set(readStoredJSON<string[]>(KEY, isSlugList, []));
}

export function markEssayRead(slug: string): void {
  if (!slug) return;
  const list = readStoredJSON<string[]>(KEY, isSlugList, []);
  if (list.includes(slug)) return;
  list.push(slug);
  // Cap by dropping the oldest; the recent tail is what resume needs.
  writeStoredJSON(KEY, list.slice(-CAP));
}
