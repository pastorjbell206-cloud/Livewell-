/**
 * The essays an argument case is built on. A slug set only, so the essay page
 * can decide whether to load the 60 KB of case data. Kept in sync with
 * argumentCases.ts by server/lazy-essay-data.test.ts.
 */
export const ARGUMENT_CASE_SLUGS = new Set<string>([
  "did-the-resurrection-happen",
  "does-hell-exist",
  "is-hell-eternal",
  "meaning-without-god",
  "if-god-is-good-why-suffering",
  "natural-evil-and-animal-suffering",
  "why-trust-the-bible",
  "was-jesus-just-a-good-teacher",
  "who-did-jesus-claim-to-be",
  "is-faith-just-wishful-thinking",
  "is-jesus-really-the-only-way",
  "is-faith-irrational"
]);
