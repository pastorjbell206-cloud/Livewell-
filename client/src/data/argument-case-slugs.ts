/**
 * The essays an argument case is built on. A slug set only, so the essay page
 * can decide whether to load the case data at all. Kept in sync with
 * argumentCases.ts by server/lazy-essay-data.test.ts.
 */
export const ARGUMENT_CASE_SLUGS = new Set<string>([
  "did-the-resurrection-happen",
  "does-hell-exist",
  "is-hell-eternal",
  "meaning-without-god",
  "if-god-is-good-why-suffering",
  "why-trust-the-bible",
  "was-jesus-just-a-good-teacher",
  "who-did-jesus-claim-to-be",
  "is-faith-just-wishful-thinking",
  "is-jesus-really-the-only-way",
  "is-faith-irrational",
  "is-god-real",
  "does-god-actually-exist",
  "what-secular-explanations-still-have-to-explain",
  "can-you-be-good-without-god",
  "personhood-in-the-age-of-ai",
  "augustine-the-restless-man",
  "the-christian-mystics",
  "the-historical-jesus-without-the-shortcuts",
  "the-historical-jesus",
  "are-miracles-believable",
  "the-god-who-hides",
  "when-god-is-silent-and-the-room-is-empty",
  "faith-and-science",
  "apologetics-hasnt-the-church-done-terrible-things",
  "church-credibility-problem",
  "did-god-command-genocide",
  "why-didnt-the-bible-ban-slavery",
  "why-did-jesus-have-to-die"
]);
