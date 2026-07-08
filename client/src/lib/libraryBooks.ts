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

/**
 * The ONE place a book's pillar string resolves to a landing page. Book
 * manifests carry free-form pillar names (the legacy five plus "After
 * Christendom", "Pastoral Ministry", "The Table"); every journey surface
 * (essay bands, pillar shelves, end-of-book doors) resolves through this map
 * rather than inventing its own. Unmapped strings resolve to the library.
 */
export const PILLAR_PAGES: Record<string, { href: string; label: string }> = {
  "Integrated Life": { href: "/life", label: "Integrated Life" },
  "Theological Depth": { href: "/theology", label: "Theological Depth" },
  "Prophetic Justice": { href: "/justice", label: "Prophetic Justice" },
  "Prophetic Disruption": { href: "/disruption", label: "Prophetic Disruption" },
  "After Christendom": { href: "/disruption", label: "After Christendom" },
  "Leadership Formation": { href: "/leadership", label: "Leadership Formation" },
  "Pastoral Ministry": { href: "/leadership", label: "Pastoral Ministry" },
  "The Table": { href: "/table", label: "The Table" },
};

export function pillarPageFor(pillar?: string): { href: string; label: string } {
  return (pillar && PILLAR_PAGES[pillar]) || { href: "/read", label: "The Library" };
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

/** The books filed under any of the given pillar strings, title-sorted. */
export function booksForPillars(books: LibraryBook[], pillars: string[]): LibraryBook[] {
  const want = new Set(pillars);
  return books.filter((b) => b.pillar && want.has(b.pillar)).sort((a, b) => a.title.localeCompare(b.title));
}

/** One representative book per pillar (first alphabetically), for a featured strip. */
export function featuredAcrossPillars(books: LibraryBook[], limit = 6): LibraryBook[] {
  return groupBooksByPillar(books)
    .map((g) => g.books[0])
    .filter(Boolean)
    .slice(0, limit);
}
