/**
 * The case for the faith's areas that are live today, as catalogue entries,
 * read from the library's own manifest (client/public/questions/index.json).
 * The site catalogue is a committed, static list; the library publishes area
 * by area. So the pages that list everything (/explore, and the Questions
 * door's own page) take the areas from the manifest: an area is listed the
 * day it goes live and never before, with no second list to keep.
 *
 * Until the manifest answers, and if it does not, a page shows the catalogue
 * as it stands.
 */
import { useEffect, useState } from "react";
import type { CatalogEntry, Room } from "@/lib/siteCatalog";
import { areaHref, fetchQuestionsIndex, QUESTIONS_ROOM } from "@/lib/questions";

export function useLiveAreas(on = true): CatalogEntry[] | null {
  const [areas, setAreas] = useState<CatalogEntry[] | null>(null);
  useEffect(() => {
    if (!on) return;
    let stale = false;
    fetchQuestionsIndex()
      .then((d) => {
        if (stale) return;
        setAreas(
          d.areas
            .filter((a) => a.live && a.hasPage)
            .map((a) => {
              const n = a.pieces.filter((p) => p.live).length;
              return { id: `questions.${a.slug}`, name: a.title, line: `${n} ${n === 1 ? "question" : "questions"}, each answered in full.`, href: areaHref(a.slug), icon: "Library" as const };
            }),
        );
      })
      .catch(() => {});
    return () => {
      stale = true;
    };
  }, [on]);
  return areas;
}

/** A room as the catalogue lists it, with the case's live areas ahead of whatever else is inside it. */
export function withLiveAreas(room: Room, areas: CatalogEntry[] | null): Room {
  if (room.href !== QUESTIONS_ROOM || !areas?.length) return room;
  const live = new Set(areas.map((a) => a.href));
  return { ...room, inside: [...areas, ...(room.inside ?? []).filter((i) => !live.has(i.href))] };
}
