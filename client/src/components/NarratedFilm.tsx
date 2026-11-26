/**
 * A narrated film on its page. A page says where it is (`page`, its own
 * address); if a film has been made live for that address
 * (scripts/build-narrated-films.mjs writes the two data files) the film is
 * shown, and otherwise nothing is. No page holds a list of films.
 *
 * The film itself, and its words, load in their own chunk
 * (NarratedFilmBody), so a page without a film pays for one small map.
 */
import { Suspense, lazy } from "react";
import pages from "@/data/narrated-film-pages.json";

const Body = lazy(() => import("./NarratedFilmBody"));
const PAGES = pages as Record<string, string>;

/** Whether a narrated film is live for this address. */
export function hasNarratedFilm(page: string): boolean {
  return Boolean(PAGES[page]);
}

export default function NarratedFilm({
  page,
  band = "bone",
}: {
  /** The page's own address, e.g. "/books/blind-spots". */
  page: string;
  /** The background the film sits on. */
  band?: "bone" | "warm";
}) {
  const slug = PAGES[page];
  if (!slug) return null;
  return (
    <Suspense fallback={null}>
      <Body slug={slug} band={band} />
    </Suspense>
  );
}
