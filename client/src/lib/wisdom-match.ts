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
 * Before scoring, the sentence is read the way a person types it:
 * - a misspelled word is mended when the library knows a word one letter
 *   away (two for long words), or two letters swapped ("greif" to "grief");
 *   only words of five letters or more, only when the word itself is unknown,
 *   and only when one known word is nearest, so short words never collide;
 * - a rewrite (a phrase such as "passed away") still meets a long word typed
 *   one letter off ("pasted away"), when at least one of its words is exact;
 * - a synonym is found by its stem too ("pastors" as "pastor");
 * - a concept (matching.json "concepts": illness words, family roles, work
 *   and rest, church and its leaders, housing and unfairness) adds the
 *   library's own word for the thing to any sentence that names a member.
 * Safety comes first: a sentence carrying a safety word (matching.json
 * "safety", set only by the rewrites for self-harm, abuse and danger, and by
 * "safetyPairs": control said of a partner, such as "my husband checks my
 * phone and wont let me see my friends") puts
 * that word's help topic first, whatever else scores, and its own related
 * subjects next.
 * When fewer than three topics score near the best, the best topic's related
 * subjects fill the second and third places, so a reader is never shown one
 * subject alone; `close` names those scoring nearly as high as the best.
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

export interface FinderConcept {
  name: string;
  /** Member words, matched on their stem. */
  words: string[];
  /** The words the concept adds to the sentence. */
  adds: string;
}

/**
 * Two words that together mean danger though neither does alone: a control
 * word (a rewrite of "checks my phone", "wont let me see") after a partner
 * word ("husband", "girlfriend") adds a safety word.
 */
export interface FinderSafetyPair {
  word: string;
  with: string[];
  adds: string;
}

export interface FinderIndex {
  rewrites: Record<string, string>;
  synonyms: Record<string, string>;
  concepts?: FinderConcept[];
  /** A word a safety rewrite adds, and the help topic it puts first. */
  safety?: Record<string, string>;
  safetyPairs?: FinderSafetyPair[];
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

/**
 * The sentence's words, with the rewrites and synonyms applied, stemmed.
 * A rewrite is matched word by word on stems, as phrases are, so "hurting
 * myself", "ending it all" and "credit cards" meet "hurt myself", "end it all"
 * and "credit card". Rewrites apply in order, so one rewrite's words can
 * complete a later one ("do not want to live" becomes "dont want to live").
 */
export function queryWords(index: FinderIndex, sentence: string): Set<string> {
  const words = (text: string) =>
    normalize(text)
      .split(" ")
      .filter(Boolean)
      .map((raw) => ({ raw, s: stem(raw) }));
  const lex = lexicon(index);
  const toks = words(sentence).map((w) => {
    const fixed = mend(lex, w.raw);
    return fixed === w.raw ? w : { raw: fixed, s: stem(fixed) };
  });
  for (const [from, to] of Object.entries(index.rewrites)) {
    const f = words(from);
    if (!f.length) continue;
    const add = words(to);
    for (let i = 0; i + f.length <= toks.length; i++) {
      let exact = 0;
      const fits = f.every((x, j) => {
        const t = toks[i + j];
        if (t.s === x.s) return ++exact > 0;
        // A long word typed one letter off still meets a rewrite of two words or more.
        return f.length > 1 && x.raw.length >= 5 && t.raw.length >= 5 && editDistance(t.raw, x.raw, 1) <= 1;
      });
      if (!fits || !exact) continue;
      toks.splice(i + f.length, 0, ...add);
      i += f.length + add.length - 1;
    }
  }
  const out = new Set<string>();
  const addAll = (text: string) => contentWords(text).forEach((x) => out.add(x));
  for (const { raw, s } of toks) {
    if (STOP.has(raw)) continue;
    out.add(s);
    const more = index.synonyms[raw] ?? inflected(lex, raw, s);
    if (more) addAll(more);
    for (const c of lex.conceptsByStem.get(s) ?? []) addAll(c.adds);
  }
  // A control word counts as danger only when a partner word comes before it
  // ("my husband checks my phone"), not after it ("my dad wont let me see my boyfriend").
  for (const pair of index.safetyPairs ?? []) {
    const at = toks.findIndex((t) => t.s === stem(normalize(pair.word)));
    const partners = new Set(pair.with.map((w) => stem(normalize(w))));
    if (at > 0 && toks.slice(0, at).some((t) => partners.has(t.s))) addAll(pair.adds);
  }
  return out;
}

/**
 * The number of single-letter edits (insert, delete, change, or two
 * neighbours swapped) between two words, or max + 1 once it is over max.
 */
export function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const rows: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    rows.push([i]);
    let low = i;
    for (let j = 1; j <= b.length; j++) {
      if (i === 0) {
        rows[0][j] = j;
        continue;
      }
      let d = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d = Math.min(d, rows[i - 2][j - 2] + 1);
      rows[i][j] = d;
      if (d < low) low = d;
    }
    if (i > 0 && low > max) return max + 1;
  }
  return Math.min(rows[a.length][b.length], max + 1);
}

interface Lexicon {
  /** Every word the library knows, as typed (lowercase). */
  known: Set<string>;
  /** Their stems. */
  stems: Set<string>;
  /** Words a misspelling may be mended to, by length. */
  byLength: Map<number, string[]>;
  synonymByStem: Map<string, { key: string; adds: string }>;
  conceptsByStem: Map<string, FinderConcept[]>;
}

const lexicons = new WeakMap<FinderIndex, Lexicon>();

/** What the library knows, gathered once per index. */
function lexicon(index: FinderIndex): Lexicon {
  const had = lexicons.get(index);
  if (had) return had;
  const known = new Set<string>();
  // Words a misspelling may be mended to: the matching words, not the framing prose.
  const strong = new Set<string>();
  let into = strong;
  const add = (text: string) =>
    normalize(text)
      .split(" ")
      .forEach((w) => {
        if (!w) return;
        known.add(w);
        into.add(w);
      });
  for (const t of index.topics) {
    add(t.label);
    t.keywords.forEach(add);
    t.phrases.forEach(add);
    t.not.forEach(add);
  }
  for (const [k, v] of Object.entries(index.rewrites)) {
    add(k);
    add(v);
  }
  for (const [k, v] of Object.entries(index.synonyms)) {
    add(k);
    add(v);
  }
  for (const c of index.concepts ?? []) {
    c.words.forEach(add);
    add(c.adds);
  }
  // Known, so never mended, but never a word to mend to.
  into = new Set<string>();
  for (const t of index.topics) {
    add(t.line);
    add(t.framing);
  }
  const byLength = new Map<number, string[]>();
  for (const w of Array.from(strong)) {
    if (w.length < 4 || /\d/.test(w)) continue;
    const list = byLength.get(w.length) ?? [];
    list.push(w);
    byLength.set(w.length, list);
  }
  const synonymByStem = new Map<string, { key: string; adds: string }>();
  for (const [k, v] of Object.entries(index.synonyms)) if (!synonymByStem.has(stem(k))) synonymByStem.set(stem(k), { key: k, adds: v });
  const conceptsByStem = new Map<string, FinderConcept[]>();
  for (const c of index.concepts ?? []) {
    for (const w of c.words) {
      const s = stem(normalize(w));
      conceptsByStem.set(s, [...(conceptsByStem.get(s) ?? []), c]);
    }
  }
  const lex = { known, stems: new Set(Array.from(known).map(stem)), byLength, synonymByStem, conceptsByStem };
  lexicons.set(index, lex);
  return lex;
}

/**
 * A synonym found by stem, only for a plain inflection of its key ("pastors",
 * "landlords", "yelled"), so "made" never reaches the synonym for "mad".
 */
function inflected(lex: Lexicon, raw: string, s: string): string | undefined {
  const hit = lex.synonymByStem.get(s);
  if (!hit || !raw.startsWith(hit.key)) return undefined;
  return /^(s|es|ed|d|ing)$/.test(raw.slice(hit.key.length)) ? hit.adds : undefined;
}

/**
 * A misspelled word, mended to the one known word nearest it; any other word
 * as it was. Only words of five letters or more that the library does not
 * know (as typed or by stem) are touched: one edit away for words up to nine
 * letters, two for longer ones, and only when one matching word is nearest.
 */
function mend(lex: Lexicon, raw: string): string {
  if (raw.length < 5 || STOP.has(raw) || /\d/.test(raw) || lex.known.has(raw) || lex.stems.has(stem(raw))) return raw;
  const max = raw.length >= 10 ? 2 : 1;
  let best = max + 1;
  let found: string[] = [];
  for (let len = raw.length - max; len <= raw.length + max; len++) {
    for (const w of lex.byLength.get(len) ?? []) {
      const d = editDistance(raw, w, Math.min(max, best));
      if (d < best) {
        best = d;
        found = [w];
      } else if (d === best && d <= max) found.push(w);
    }
  }
  if (best > max) return raw;
  // Two words equally near are a guess unless they are one word in two forms.
  const stems = new Set(found.map(stem));
  return stems.size === 1 ? found[0] : raw;
}

export interface Match {
  topic: FinderTopic;
  score: number;
  /** Shown because it is close to the best topic, not because the words met it. */
  related?: boolean;
  /** First because the sentence carries a safety word. */
  safety?: boolean;
}

/** A topic scoring at least this share of the best counts as just as close. */
export const CLOSE_SHARE = 0.8;

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

export interface Found {
  matches: Match[];
  confident: boolean;
  /** The topics after the first that scored nearly as high as it (CLOSE_SHARE). */
  close: Match[];
}

/** Topics for a sentence, best first. `confident` is false when the best is under MIN_SCORE. */
export function findTopics(prep: Prepared, sentence: string, limit = 6): Found {
  const q = queryWords(prep.index, sentence);
  if (!q.size) return { matches: [], confident: false, close: [] };
  const scored: Match[] = prep.topics
    .map((p) => ({ topic: p.t, score: scoreTopic(p, q) }))
    .filter((m) => m.score >= 2)
    .sort((a, b) => b.score - a.score || a.topic.label.localeCompare(b.topic.label));
  // Safety first: the help topic of a safety word leads, whatever else scored.
  const help = Object.entries(prep.index.safety ?? {})
    .filter(([w]) => q.has(stem(normalize(w))))
    .map(([, id]) => id);
  for (const id of help.reverse()) {
    const topic = prep.byId.get(id);
    if (!topic) continue;
    const at = scored.findIndex((m) => m.topic.id === id);
    const was = at >= 0 ? scored.splice(at, 1)[0].score : 0;
    scored.unshift({ topic, score: Math.max(was, (scored[0]?.score ?? 0) + 1, MIN_SCORE), safety: true });
  }
  const top = scored[0]?.score ?? 0;
  const confident = top >= MIN_SCORE;
  // Keep the ones near the top; a long tail of one-word hits is noise.
  let near = scored.filter((m) => m.score >= Math.max(2, top * 0.35)).slice(0, limit);
  // After a help topic put first for safety, its own related subjects come next, before chance word matches.
  if (near[0]?.safety) {
    const kin = near[0].topic.related
      .map((id) => prep.byId.get(id))
      .filter((t): t is FinderTopic => !!t)
      .map((topic) => scored.find((m) => m.topic.id === topic.id) ?? { topic, score: 0, related: true });
    const kinIds = new Set(kin.map((m) => m.topic.id));
    near = [near[0], ...kin, ...near.slice(1).filter((m) => !kinIds.has(m.topic.id))].slice(0, limit);
  }
  // Never one subject alone: the best topic's related subjects fill to three.
  if (confident && near.length < 3) {
    const have = new Set(near.map((m) => m.topic.id));
    for (const id of near[0].topic.related) {
      const topic = prep.byId.get(id);
      if (!topic || have.has(id) || near.length >= 3) continue;
      have.add(id);
      near.push({ topic, score: scored.find((m) => m.topic.id === id)?.score ?? 0, related: true });
    }
  }
  // A help topic put first for safety stands alone at the top; nothing is set beside it.
  const close = confident && !near[0].safety ? near.slice(1).filter((m) => !m.related && m.score >= top * CLOSE_SHARE) : [];
  return { matches: near, confident, close };
}
