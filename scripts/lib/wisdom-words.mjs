/**
 * The Wisdom Finder's word handling, for the build: the same normalize, stop
 * words and stem as client/src/lib/wisdom-match.ts, so the term weights that
 * scripts/build-wisdom-index.mjs writes into finder.json are keyed exactly as
 * the browser reads a sentence. client/src/lib/wisdom-match.test.ts fails if
 * the two ever disagree on any word in the finder data.
 */

export const STOP = new Set(
  "a an the i im ive id me my mine myself we our us you your yours he him his she her they them their it its is am are was were be been being to of and or but in on at for with this that these those so just very really about all any do does did doing have has had having what when how which who whom there here then than as by from into out up down over again once some such no nor too can will would should could may might must shall get got gets getting go goes going went feel feels feeling felt like know think thing things want wants every always never anymore much more still ever one also even let lot lots".split(
    " ",
  ),
);

/** Lowercase, apostrophes dropped ("can't" -> "cant"), anything else not a letter or digit a space. */
export function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** A plain stem: enough that "worrying", "worried" and "worries" meet. */
export function stem(w) {
  let s = w;
  if (s.length > 4 && s.endsWith("ies")) s = s.slice(0, -3) + "y";
  else if (s.length > 4 && s.endsWith("ied")) s = s.slice(0, -3) + "y";
  else if (s.length > 5 && s.endsWith("ing")) s = s.slice(0, -3);
  else if (s.length > 4 && s.endsWith("ed")) s = s.slice(0, -2);
  else if (s.length > 4 && /(ss|x|z|ch|sh)es$/.test(s)) s = s.slice(0, -2);
  else if (s.length > 3 && s.endsWith("s") && !s.endsWith("ss") && !s.endsWith("us") && !s.endsWith("is")) s = s.slice(0, -1);
  if (s.length > 5 && s.endsWith("ness")) s = s.slice(0, -4);
  else if (s.length > 5 && s.endsWith("ly")) s = s.slice(0, -2);
  if (s.length > 3 && /([b-df-hj-np-tv-z])\1$/.test(s) && !/(ll|ss|ff|zz)$/.test(s)) s = s.slice(0, -1);
  if (s.length > 3 && s.endsWith("e")) s = s.slice(0, -1);
  return s;
}

/** The words of a text that carry meaning, stemmed. */
export function contentWords(text) {
  return normalize(text)
    .split(" ")
    .filter((w) => w && !STOP.has(w) && !/^\d+$/.test(w))
    .map(stem);
}
