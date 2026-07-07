/**
 * libraryBooks — the shared shape + fetch/group helpers for the /read library
 * (client/public/books/index.json, built by scripts/build-books-index.mjs).
 *
 * Books carry a `pillar` string (the site's pillar names). We group and order
 * the shelf by that string directly — no taxonomy resolution — so the library
 * reads as a browsable spine. Unknown pillar values sort to the end.
 */

export interface LibraryBook {
  slug: string;
  title: string;
  subtitle?: string;
  blurb?: string;
  pillar?: string;
  chapters: number;
  cover?: string | null;
}

// The order the pillars appear when grouping the library.
export const LIBRARY_PILLAR_ORDER = [
  "Integrated Life",
  "Theological Depth",
  "Prophetic Justice",
  "Prophetic Disruption",
  "After Christendom",
  "Leadership Formation",
  "Pastoral Ministry",
  "The Table",
];

export async function fetchLibraryBooks(): Promise<LibraryBook[]> {
  try {
    const r = await fetch("/books/index.json");
    if (!r.ok) return [];
    const d = await r.json();
    return Array.isArray(d?.books) ? (d.books as LibraryBook[]) : [];
  } catch {
    return [];
  }
}

export interface PillarGroup {
  pillar: string;
  books: LibraryBook[];
}

const pillarRank = (p: string) => {
  const i = LIBRARY_PILLAR_ORDER.indexOf(p);
  return i === -1 ? LIBRARY_PILLAR_ORDER.length + 1 : i;
};

/** Group books by their pillar string, ordered by LIBRARY_PILLAR_ORDER. */
export function groupBooksByPillar(books: LibraryBook[]): PillarGroup[] {
  const map = new Map<string, LibraryBook[]>();
  for (const b of books) {
    const key = b.pillar || "More from the Library";
    (map.get(key) ?? map.set(key, []).get(key)!).push(b);
  }
  return Array.from(map.entries())
    .map(([pillar, bs]) => ({
      pillar,
      books: [...bs].sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => pillarRank(a.pillar) - pillarRank(b.pillar) || a.pillar.localeCompare(b.pillar));
}

/** One representative book per pillar (first alphabetically), for a featured strip. */
export function featuredAcrossPillars(books: LibraryBook[], limit = 6): LibraryBook[] {
  return groupBooksByPillar(books)
    .map((g) => g.books[0])
    .filter(Boolean)
    .slice(0, limit);
}
