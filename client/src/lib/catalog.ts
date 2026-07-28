/**
 * The unified content catalog.
 *
 * The site's content lives in many shapes — database essays, ~10 static JSON
 * libraries under client/public, the free books, and the interactive tools.
 * Each historically had its own index page, which is exactly why nothing felt
 * findable. This module is the single registry of every static content source
 * so both on-site search (Search.tsx) and the unified browse page (Explore.tsx)
 * read from one place and can never drift apart.
 *
 * Database essays are NOT listed here — they come live from `posts.listPublished`
 * and are merged in by the consumer (Explore) so the catalog reflects the DB.
 */

/** A registered static-library manifest and how to link into it. */
export interface LibrarySource {
  /** Public URL of the manifest JSON (by directory, not route). */
  url: string;
  /** Top-level array property inside the manifest. */
  listKey: string;
  /** Human label shown as the entry's source. */
  label: string;
  /** The catalog Type facet this library maps to. */
  type: string;
  /** Build the detail-page route for an item slug. */
  buildHref: (slug: string) => string;
  /** The library's own index page, for "see all of this source". */
  indexHref: string;
}

/**
 * Every static content library. `url` points at the manifest's real file
 * location (by directory); `buildHref`/`indexHref` use the app route — the two
 * legitimately differ (e.g. the file at /history/… renders at /theology/history/…).
 */
export const LIBRARY_SOURCES: LibrarySource[] = [
  {
    url: "/context/guides-index.json",
    listKey: "guides",
    label: "Reading Scripture in Context",
    type: "Bible in Context",
    buildHref: (slug) => `/resources/context/${slug}`,
    indexHref: "/resources/context",
  },
  {
    url: "/life/domains-index.json",
    listKey: "domains",
    label: "The Integrated Life",
    type: "Everyday Life",
    buildHref: (slug) => `/life/${slug}`,
    indexHref: "/life",
  },
  {
    url: "/howtos/index.json",
    listKey: "articles",
    label: "How-To Library",
    type: "How-To",
    buildHref: (slug) => `/how-tos/${slug}`,
    indexHref: "/how-tos",
  },
  {
    url: "/studyguides/index.json",
    listKey: "guides",
    label: "Study Guides",
    type: "Study Guide",
    buildHref: (slug) => `/studyguides/${slug}`,
    indexHref: "/studyguides",
  },
  {
    url: "/history/essays-index.json",
    listKey: "essays",
    label: "Church History",
    type: "Church History",
    buildHref: (slug) => `/theology/history/${slug}`,
    indexHref: "/theology/history",
  },
  {
    url: "/creeds/documents-index.json",
    listKey: "documents",
    label: "Creeds & Confessions",
    type: "Creed",
    buildHref: (slug) => `/resources/creeds/${slug}`,
    indexHref: "/resources/creeds",
  },
];

/** First value that is a non-empty string, else "". */
export function pickString(...vals: unknown[]): string {
  for (const v of vals) {
    if (typeof v === "string" && v.trim().length > 0) return v;
  }
  return "";
}

/** A single browsable thing, normalized across every content shape. */
export interface CatalogItem {
  title: string;
  blurb: string;
  href: string;
  /** Type facet: Essay, Tool, Book, Study Guide, Creed, … */
  type: string;
  /** Where it comes from (library label, "Tools", "Books"). */
  source: string;
}

async function fetchLibrary(source: LibrarySource): Promise<CatalogItem[]> {
  try {
    const res = await fetch(source.url);
    if (!res.ok) return [];
    const data = await res.json();
    const list = data?.[source.listKey];
    if (!Array.isArray(list)) return [];
    return list
      .filter((i: any) => i && typeof i.slug === "string" && typeof i.title === "string")
      .map((i: any) => ({
        title: i.title,
        blurb: pickString(i.blurb, i.excerpt, i.summary, i.subtitle),
        href: source.buildHref(i.slug),
        type: source.type,
        source: source.label,
      }));
  } catch {
    return [];
  }
}

/**
 * Every static (non-database) catalog item: all the libraries plus the books
 * (registered as a source above). Tools are added by the consumer from the
 * exported TOOLS registry, and database essays are merged in live. Each source
 * fails soft to [].
 */
export async function fetchStaticCatalog(): Promise<CatalogItem[]> {
  const lists = await Promise.all(LIBRARY_SOURCES.map(fetchLibrary));
  return lists.flat();
}
