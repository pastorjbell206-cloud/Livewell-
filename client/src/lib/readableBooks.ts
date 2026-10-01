/**
 * readableBooks.ts — maps a catalog book (the long DB/content-data slug shown
 * at /books/:slug) to the short slug of a full on-site manuscript at
 * /read/:slug.
 *
 * The map is empty on purpose. The free on-site library was retired when
 * James reduced the shelf to the three books he wrote by hand (the
 * manuscripts are archived, not deleted, and /read/* 301s to /books), so no
 * catalog entry may promise "read the full book free" — the button renders
 * only for slugs listed here. If a manuscript ever returns to
 * client/public/books/, add its entry and the promise becomes true again.
 */
export const READABLE_BOOKS: Record<string, string> = {};

/** The read slug for a catalog book, or null if no on-site manuscript exists. */
export function readSlugFor(catalogSlug: string | null | undefined): string | null {
  if (!catalogSlug) return null;
  return READABLE_BOOKS[catalogSlug] ?? null;
}
