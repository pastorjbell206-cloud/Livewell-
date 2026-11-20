/**
 * The Wisdom Finder's matcher: a sentence in the reader's own words, matched
 * to the topics in the wisdom library, with no server and no AI. Everything it
 * knows is data: client/public/wisdom/matching.json (hand-written phrasings,
 * rewrites, synonyms, what should push a topic down), merged by
 * scripts/build-wisdom-index.mjs into client/public/wisdom/finder.json with
 * each topic's own label, keywords and framing.
 *
 * How a topic scores against a sentence:
 * - a phrase (a curated phrasing or one of the topic's keywords) whose words
 *   are all in the sentence: 4 for one word, 3 more for each further word;
 *   curated phrasings count 2 more than keywords. At most 24 from phrases.
 * - a word of the topic's name: 4; any other word of its keywords: 2;
 *   a word of its framing paragraph: 0.5 (at most 2 in all).
 * - a "not" phrase in the sentence: minus 10.
 * Each word of the sentence counts once per topic, at its best weight. Words
 * are compared by a plain stem ("worrying" and "worried" meet at "worry").
 * A top score under MIN_SCORE means nothing fits well, and the finder says so.
 *
 * client/src/lib/wisdom-match.test.ts holds the hit rate on a fixture of plain
 * sentences (wisdom-match.fixture.json).
 */

export interface FinderTopic {
  id: string;
  label: string;
  area: string;
  line: string;
  keywords: string[];
  phrases: string[];
  not: string[];
  related: string[];
  framing: string;
  /** True when the topic is written to the full standard (the deep layer). */
  deep?: boolean;
  /** True on the heavy subjects that carry the help lines. */
  care?: boolean;
}

export interface FinderArea {
  id: string;
  name: string;
  line: string;
  topics: string[];
}

export interface FinderIndex {
  rewrites: Record<string, string>;
  synonyms: Record<string, string>;
  areas: FinderArea[];
  topics: FinderTopic[];
}

export const isFinderIndex = (x: unknown): x is FinderIndex => {
  const d = x as FinderIndex;
  return !!d && typeof d === "object" && Array.isArray(d.topics) && Array.isArray(d.areas) && !!d.synonyms && !!d.rewrites;
};

/** Below this, nothing fits well enough to put first. */
export const MIN_SCORE = 6;

const STOP = new Set(
  "a an the i im ive id me my mine myself we our us you your yours he him his she her they them their it its is am are was were be been being to of and or but in on at for with this that these those so just very really about all any do does did doing have has had having what when how which who whom there here then than as by from into out up down over again once some such no nor too can will would should could may might must shall get got gets getting go goes going went feel feels feeling felt like know think thing things want wants every always never anymore much more still ever one also even let lot lots".split(
    " ",
  ),
);

/** Lowercase, apostrophes dropped ("can't" -> "cant"), anything else not a letter or digit a space. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** A plain stem: enough that "worrying", "worried" and "worries" meet. */
export function stem(w: string): string {
  let s = w;
  if (s.length > 4 && s.endsWith("ies")) s = s.slice(0, -3) + "y";
  else if (s.length > 4 && s.endsWith("ied")) s = s.slice(0, -3) + "y";
  else if (s.length > 5 && s.endsWith("ing")) s = s.slice(0, -3);
  else if (s.length > 4 && s.endsWith("ed")) s = s.slice(0, -2);
  else if (s.length > 4 && /(ss|x|z|ch|sh)es$/.test(s)) s = s.slice(0, -2);
  else if (s.length > 3 && s.endsWith("s") && !s.endsWith("ss") && !s.endsWith("us") && !s.endsWith("is")) s = s.slice(0, -1);
  if (s.length > 5 && s.endsWith("ness")) s = s.slice(0, -4);
  else if (s.length > 5 && s.endsWith("ly")) s = s.slice(0, -2);
  // "running" -> "runn" -> "run"; "hoping" -> "hop" and "hope" -> "hop" meet below.
  if (s.length > 3 && /([b-df-hj-np-tv-z])\1$/.test(s) && !/(ll|ss|ff|zz)$/.test(s)) s = s.slice(0, -1);
  if (s.length > 3 && s.endsWith("e")) s = s.slice(0, -1);
  return s;
}

/** The words of a phrase or sentence that carry meaning, stemmed. */
function contentWords(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

export interface PreparedTopic {
  t: FinderTopic;
  label: Set<string>;
  keyWords: Set<string>;
  framing: Set<string>;
  phrases: { words: string[]; curated: boolean }[];
  not: string[][];
}

export interface Prepared {
  index: FinderIndex;
  topics: PreparedTopic[];
  byId: Map<string, FinderTopic>;
}

export function prepare(index: FinderIndex): Prepared {
  const topics = index.topics.map((t) => {
    const phrases: PreparedTopic["phrases"] = [];
    const seen = new Set<string>();
    const add = (p: string, curated: boolean) => {
      const words = Array.from(new Set(contentWords(p)));
      const key = words.join(" ");
      if (!words.length || seen.has(key)) return;
      seen.add(key);
      phrases.push({ words, curated });
    };
    t.phrases.forEach((p) => add(p, true));
    t.keywords.forEach((p) => add(p, false));
    return {
      t,
      label: new Set(contentWords(t.label)),
      keyWords: new Set(phrases.flatMap((p) => p.words)),
      framing: new Set(contentWords(t.framing)),
      phrases,
      not: t.not.map((n) => contentWords(n)).filter((w) => w.length),
    };
  });
  return { index, topics, byId: new Map(index.topics.map((t) => [t.id, t])) };
}

/** The sentence's words, with the rewrites and synonyms applied, stemmed. */
export function queryWords(index: FinderIndex, sentence: string): Set<string> {
  let s = ` ${normalize(sentence)} `;
  for (const [from, to] of Object.entries(index.rewrites)) {
    const f = ` ${normalize(from)} `;
    if (s.includes(f)) s = s.split(f).join(` ${f.trim()} ${to} `);
  }
  const out = new Set<string>();
  for (const w of s.split(/\s+/)) {
    if (!w || STOP.has(w)) continue;
    out.add(stem(w));
    const more = index.synonyms[w];
    if (more) for (const m of more.split(/\s+/)) if (m) contentWords(m).forEach((x) => out.add(x));
  }
  return out;
}

export interface Match {
  topic: FinderTopic;
  score: number;
}

export function scoreTopic(p: PreparedTopic, q: Set<string>): number {
  let phraseScore = 0;
  const covered = new Map<string, number>();
  for (const ph of p.phrases) {
    if (!ph.words.every((w) => q.has(w))) continue;
    phraseScore += 4 + 3 * (ph.words.length - 1) + (ph.curated ? 2 : 0);
  }
  for (const w of Array.from(q)) {
    let best = 0;
    if (p.label.has(w)) best = 4;
    else if (p.keyWords.has(w)) best = 2;
    else if (p.framing.has(w)) best = 0.5;
    if (best) covered.set(w, best);
  }
  let words = 0;
  let framing = 0;
  for (const v of Array.from(covered.values())) {
    if (v === 0.5) framing += v;
    else words += v;
  }
  let score = Math.min(phraseScore, 24) + words + Math.min(framing, 2);
  if (p.not.some((n) => n.every((w) => q.has(w)))) score -= 10;
  return score;
}

/** Topics for a sentence, best first. `confident` is false when the best is under MIN_SCORE. */
export function findTopics(prep: Prepared, sentence: string, limit = 6): { matches: Match[]; confident: boolean } {
  const q = queryWords(prep.index, sentence);
  if (!q.size) return { matches: [], confident: false };
  const scored = prep.topics
    .map((p) => ({ topic: p.t, score: scoreTopic(p, q) }))
    .filter((m) => m.score >= 2)
    .sort((a, b) => b.score - a.score || a.topic.label.localeCompare(b.topic.label));
  const top = scored[0]?.score ?? 0;
  // Keep the ones near the top; a long tail of one-word hits is noise.
  const near = scored.filter((m) => m.score >= Math.max(2, top * 0.35)).slice(0, limit);
  return { matches: near, confident: top >= MIN_SCORE };
}
