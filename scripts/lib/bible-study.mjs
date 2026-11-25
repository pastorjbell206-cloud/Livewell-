/**
 * bible-study.mjs: two indexes over the Study Bible's own data
 * (client/public/bible/, written by scripts/build-bible.mjs), for two pages:
 *
 *   /study/word, /study/word/<strong>   client/public/bible/words/
 *   /study/cross-references             client/public/bible/xref/
 *
 * Nothing is written here that the data does not hold. The word index counts
 * what the chapter files hold, word by word; the cross-reference index
 * copies each verse's links out of its chapter file.
 *
 * WORDS. The lexicon shards (bible/lex/) give a word's entry, its count and
 * the first 60 verses that use it; 937 words are used in more verses than
 * that, and the lexicon has no count by book. So, from the chapter files:
 *
 *   words/occ/<H|G>/<bucket>.json   one file per 100 Strong's numbers:
 *       { "<strong>": { n, b: [[book, count]...], g: [glosses], v: [[book, ch, v, g...]...] } }
 *     `book` is the book's place in the canon (0 to 65); a verse row names the
 *     glosses the word has in that verse (indexes into `g`), in the order the
 *     verse has them. A word used in more than PAGE verses has `p` (its
 *     number of pages), `vn` (its number of verses) and `s` (the row each
 *     book's verses begin at) in place of `v`, and its rows are in
 *   words/occ/<H|G>/p/<strong>-<i>.json   PAGE verse rows each, in canon order.
 *   words/find/<ab>.json   the words whose meaning or transliteration has a
 *       word beginning "ab": [[strong, lemma, transliteration, meaning, count]...]
 *   words/index.json       the counts, and which buckets and two-letter lists
 *       exist, so the page never asks for a file that is not there.
 *
 * So no fetch is large: a bucket, one page of a common word, one two-letter
 * list. Counts are checked against the lexicon's own (bibleWords.test.ts).
 *
 * CROSS-REFERENCES. Each verse's links are in its chapter file beside every
 * word of the chapter (John 3 is 42 KB). The page needs only the links:
 *
 *   xref/<book>/<n>.json   { "<verse>": ["Jhn.1.1", ...] } for the verses that have any
 *       (every chapter has a file, so none is ever asked for and not found)
 *   xref/examples.json     the verses the most other verses link to, counted
 *       from the data, offered as places to start. Chosen by count, not by hand.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BIBLE = path.join(ROOT, "client/public/bible");
export const WORDS_DIR = path.join(BIBLE, "words");
export const XREF_DIR = path.join(BIBLE, "xref");

/** Verse rows in one page of a common word. */
export const PAGE = 300;
/** Strong's numbers in one bucket. */
export const BUCKET = 100;
/** How many starting places the cross-reference page offers. */
export const EXAMPLES = 12;

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const books = () => readJson(path.join(BIBLE, "books.json"));

/** Every chapter in canon order: { book, index, chapter, verses }. */
function* chapters() {
  const all = books();
  for (let i = 0; i < all.length; i++) {
    for (let c = 1; c <= all[i].chapters; c++) {
      yield { book: all[i], index: i, chapter: c, verses: readJson(path.join(BIBLE, "ch", all[i].slug, `${c}.json`)).verses };
    }
  }
}

/** The whole lexicon: Strong's number -> entry. */
export function lexicon() {
  const out = new Map();
  for (const lang of ["H", "G"]) {
    const dir = path.join(BIBLE, "lex", lang);
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
      for (const [k, e] of Object.entries(readJson(path.join(dir, f)))) out.set(k, e);
    }
  }
  return out;
}

export const bucketOf = (strong) => Math.floor(parseInt(strong.slice(1, 5), 10) / BUCKET);
/** Letters only, without accents: how a meaning or a transliteration is looked up. */
export const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]+/g, " ").trim();
/** Words too common to look a meaning up by. */
const SMALL = new Set(["to", "the", "a", "an", "of", "be", "and", "or", "in", "on", "obj"]);

/** The two-letter lists a word is filed under: the start of each word of its meaning, and of its transliteration. */
export function findKeys(entry) {
  const keys = new Set();
  for (const w of fold(entry.g).split(" ")) if (w.length >= 2 && !SMALL.has(w)) keys.add(w.slice(0, 2));
  const tr = fold(entry.tr).replace(/ /g, "");
  if (tr.length >= 2) keys.add(tr.slice(0, 2));
  return [...keys];
}

/** Every file of the word index: "occ/G/0.json" -> its contents. */
export function wordFiles() {
  const lex = lexicon();
  const words = new Map(); // strong -> { n, b: Map(book -> count), g: [], gi: Map, v: [] }
  for (const ch of chapters()) {
    for (const verse of ch.verses) {
      // A verse the critical text omits is not counted in the lexicon, so not here.
      if (verse.later) continue;
      const seen = new Map();
      for (const w of verse.w) {
        const strong = w[3];
        if (!strong || !lex.has(strong)) continue;
        let word = words.get(strong);
        if (!word) words.set(strong, (word = { n: 0, b: new Map(), g: [], gi: new Map(), v: [] }));
        word.n++;
        word.b.set(ch.index, (word.b.get(ch.index) ?? 0) + 1);
        let gi = word.gi.get(w[2]);
        if (gi === undefined) {
          gi = word.g.length;
          word.g.push(w[2]);
          word.gi.set(w[2], gi);
        }
        let row = seen.get(strong);
        if (!row) {
          row = [ch.index, ch.chapter, verse.v];
          seen.set(strong, row);
          word.v.push(row);
        }
        row.push(gi);
      }
    }
  }

  const files = new Map();
  const buckets = new Map();
  let paged = 0;
  for (const strong of [...words.keys()].sort()) {
    const w = words.get(strong);
    const entry = { n: w.n, b: [...w.b.entries()], g: w.g };
    if (w.v.length > PAGE) {
      entry.p = Math.ceil(w.v.length / PAGE);
      entry.vn = w.v.length;
      // Where each book's verses begin among the rows, so one book's verses can be fetched alone.
      entry.s = [];
      w.v.forEach((row, i) => {
        if (!entry.s.length || entry.s[entry.s.length - 1][0] !== row[0]) entry.s.push([row[0], i]);
      });
      for (let i = 0; i < entry.p; i++) files.set(`occ/${strong[0]}/p/${strong}-${i}.json`, `${JSON.stringify(w.v.slice(i * PAGE, (i + 1) * PAGE))}\n`);
      paged++;
    } else entry.v = w.v;
    const file = `occ/${strong[0]}/${bucketOf(strong)}.json`;
    if (!buckets.has(file)) buckets.set(file, {});
    buckets.get(file)[strong] = entry;
  }
  for (const [file, data] of buckets) files.set(file, `${JSON.stringify(data)}\n`);

  const find = new Map();
  for (const strong of [...lex.keys()].sort()) {
    const e = lex.get(strong);
    if (!words.has(strong)) continue;
    for (const k of findKeys(e)) {
      if (!find.has(k)) find.set(k, []);
      find.get(k).push([strong, e.l, e.tr, e.g, words.get(strong).n]);
    }
  }
  for (const [k, rows] of find) files.set(`find/${k}.json`, `${JSON.stringify(rows.sort((a, b) => b[4] - a[4] || a[0].localeCompare(b[0])))}\n`);

  const count = (lang) => [...words.keys()].filter((k) => k[0] === lang).length;
  files.set("index.json", `${JSON.stringify({ v: 1, page: PAGE, bucket: BUCKET, words: { H: count("H"), G: count("G") }, paged, buckets: [...buckets.keys()].map((f) => f.slice(4, -5)).sort(), find: [...find.keys()].sort() })}\n`);
  return files;
}

/** Every file of the cross-reference index: "john/3.json" -> its contents. */
export function xrefFiles() {
  const all = books();
  const byCode = new Map(all.map((b, i) => [b.code, i]));
  const files = new Map();
  const into = new Map(); // "Jhn.3.16" -> how many verses link to it
  const text = new Map();
  let links = 0;
  let verses = 0;
  for (const ch of chapters()) {
    const out = {};
    for (const verse of ch.verses) {
      text.set(`${ch.book.code}.${ch.chapter}.${verse.v}`, verse.t);
      if (!verse.x?.length) continue;
      out[verse.v] = verse.x;
      verses++;
      links += verse.x.length;
      // A link to a range counts for its first verse, the one the Study Bible opens it at.
      for (const x of verse.x) {
        const first = x.replace(/-\d+$/, "");
        into.set(first, (into.get(first) ?? 0) + 1);
      }
    }
    // Every chapter has a file, an empty one when it has no links, so the page never asks for a file that is not there.
    files.set(`${ch.book.slug}/${ch.chapter}.json`, `${JSON.stringify(out)}\n`);
  }
  const canon = (ref) => {
    const [code, c, v] = ref.split(".");
    return byCode.get(code) * 1e6 + +c * 1000 + +v;
  };
  const top = [...into.entries()].sort((a, b) => b[1] - a[1] || canon(a[0]) - canon(b[0])).slice(0, EXAMPLES);
  files.set("examples.json", `${JSON.stringify({ v: 1, verses, links, examples: top.map(([ref, n]) => ({ ref, into: n, t: text.get(ref) ?? "" })) })}\n`);
  return files;
}

/* Writing and checking a set of files ---------------------------------- */

function current(dir, at = "") {
  const out = new Map();
  if (!fs.existsSync(path.join(dir, at))) return out;
  for (const d of fs.readdirSync(path.join(dir, at), { withFileTypes: true })) {
    const rel = at ? `${at}/${d.name}` : d.name;
    if (d.isDirectory()) for (const [k, v] of current(dir, rel)) out.set(k, v);
    else if (d.name.endsWith(".json")) out.set(rel, fs.readFileSync(path.join(dir, rel), "utf8"));
  }
  return out;
}

const SETS = {
  word: { dir: WORDS_DIR, files: wordFiles, what: "word index" },
  xref: { dir: XREF_DIR, files: xrefFiles, what: "cross-reference index" },
};

/** Write one index, or with --check exit 1 when the files on disk are not what the Study Bible's data now gives. */
export function run(name, argv = process.argv) {
  const { dir, files, what } = SETS[name];
  const rel = path.relative(ROOT, dir);
  const want = files();
  const have = current(dir);
  const stale = [...want.keys()].filter((k) => have.has(k) && have.get(k) !== want.get(k));
  const missing = [...want.keys()].filter((k) => !have.has(k));
  const extra = [...have.keys()].filter((k) => !want.has(k));
  if (argv.includes("--check")) {
    const problems = [...stale.map((f) => `${f} differs from the Study Bible's data`), ...missing.map((f) => `${f} is missing`), ...extra.map((f) => `${f} has nothing behind it`)];
    if (problems.length) {
      console.error(`[bible-${name}] ${problems.length} files of the ${what} in ${rel} are out of date:`);
      for (const p of problems.slice(0, 20)) console.error(`  - ${p}`);
      console.error(`Run: node scripts/build-bible-${name}-index.mjs`);
      process.exit(1);
    }
    console.log(`[bible-${name}] ok: ${want.size} files of the ${what} match the Study Bible's data`);
    return;
  }
  for (const k of [...stale, ...missing]) {
    fs.mkdirSync(path.dirname(path.join(dir, k)), { recursive: true });
    fs.writeFileSync(path.join(dir, k), want.get(k));
  }
  for (const k of extra) fs.rmSync(path.join(dir, k));
  console.log(`[bible-${name}] ${want.size} files in ${rel}: ${stale.length + missing.length} written, ${extra.length} removed`);
}
