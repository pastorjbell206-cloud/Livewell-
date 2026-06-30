/**
 * readableBooks.ts — maps a catalog book (the long DB/content-data slug shown at
 * /books/:slug) to the short slug of its full on-site manuscript, read free at
 * /read/:slug (served from client/public/books/<readSlug>.json by BookReader).
 *
 * These are the books written in full and published to the on-site reader so a
 * catalog entry never dead-ends. Add an entry here when a new manuscript lands
 * in client/public/books/. The reader slugs match content/books-src/<slug>.txt.
 */
export const READABLE_BOOKS: Record<string, string> = {
  "dangerous-calling-why-the-office-of-pastor-is-not-for-everyone": "dangerous-calling",
  "the-hidden-life-of-a-pastor-tending-your-soul-while-tending-the-flock": "the-hidden-life-of-a-pastor",
  "the-first-flock-the-church-s-calling-to-care-for-pastors-and-their-families": "the-first-flock",
  "earthen-vessels-why-our-bodies-matter-to-our-faith": "earthen-vessels",
  "preach-the-word-the-primacy-of-expository-preaching-in-the-local-church": "preach-the-word",
  "the-undershepherd-pastoral-leadership-authority-and-the-care-of-god-s-people": "the-undershepherd",
  "the-pruning-church-decline-faithful-endurance-and-the-promise-of-renewal": "the-pruning",
  "one-body-many-churches-a-theology-of-unity-for-a-fractured-church": "one-body-many-churches",
  "necessary-words-a-pastoral-theology-of-courage-and-difficult-conversations": "necessary-words",
  "sent-into-the-city-the-church-s-calling-to-its-neighborhood-and-world": "sent-into-the-city",
  "to-the-ends-of-the-earth-global-mission-national-partnership-and-the-sent-church": "to-the-ends-of-the-earth",
  "faithful-in-exile-pastoral-leadership-and-the-church-s-witness-in-a-post-christian-age": "faithful-in-exile",
  "common-grace-what-pastors-learn-when-they-listen-to-the-world": "common-grace",
  "the-unfinished-church-calling-vision-and-the-future-god-is-building": "the-unfinished-church",
};

/** The read slug for a catalog book, or null if no on-site manuscript exists. */
export function readSlugFor(catalogSlug: string | null | undefined): string | null {
  if (!catalogSlug) return null;
  return READABLE_BOOKS[catalogSlug] ?? null;
}
