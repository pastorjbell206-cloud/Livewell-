/**
 * The case for the faith's areas that are live today, as catalogue entries,
 * read from the library's own manifest (client/public/questions/index.json).
 * The site catalogue is a committed, static list; the library publishes area
 * by area. So the pages that list everything (/explore, and the Questions
 * door's own page) take the areas from the manifest: an area is listed the
 * day it goes live and never before, with no second list to keep.
 *
 * This module is a chunk of its own, asked for by useLiveAreas (lib/siteNav.ts)
 * only once a page has loaded and the browser is idle, so it adds nothing to
 * any page's first paint. It reads the manifest's few fields itself and does
 * not import the questions pages' own module.
 */
import type { CatalogEntry, Room } from "@/lib/siteCatalog";
import { fetchJson } from "@/lib/fetch-json";

const CASE_ROOM = "/questions";

interface ManifestArea {
  slug: string;
  title: string;
  live: boolean;
  hasPage: boolean;
  pieces: { live: boolean }[];
}

const isManifest = (x: unknown): x is { areas: ManifestArea[] } =>
  !!x &&
  typeof x === "object" &&
  Array.isArray((x as { areas?: unknown }).areas) &&
  (x as { areas: ManifestArea[] }).areas.every((a) => !!a && typeof a.slug === "string" && typeof a.title === "string" && Array.isArray(a.pieces));

/** A room as the catalogue lists it, with the case's live areas ahead of whatever else is inside it. */
export function withLiveAreas(room: Room, areas: CatalogEntry[]): Room {
  if (room.href !== CASE_ROOM || !areas.length) return room;
  const live = new Set(areas.map((a) => a.href));
  return { ...room, inside: [...areas, ...(room.inside ?? []).filter((i) => !live.has(i.href))] };
}

/** Reads the manifest and answers with the one thing a listing needs: a room in, the same room with its live areas out. */
export async function loadLiveAreas(): Promise<(room: Room) => Room> {
  const d = await fetchJson("/questions/index.json", isManifest);
  const areas: CatalogEntry[] = d.areas
    .filter((a) => a.live && a.hasPage)
    .map((a) => {
      const n = a.pieces.filter((p) => p.live).length;
      return { id: `questions.${a.slug}`, name: a.title, line: `${n} ${n === 1 ? "question" : "questions"}, each answered in full.`, href: `${CASE_ROOM}/${a.slug}`, icon: "Library" as const };
    });
  return (room) => withLiveAreas(room, areas);
}
