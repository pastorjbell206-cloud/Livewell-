#!/usr/bin/env node
/**
 * build-wisdom-vectors.mjs
 *
 * Writes client/public/wisdom/vectors.bin, the Wisdom Finder's word vectors:
 * a word typed in the finder is placed near the words of each subject's own
 * phrasings, so "furious" can find Anger and "congregation" the church
 * subjects though no phrasing uses those words. The finder fetches the file
 * only when a reader starts to use it (pages/tools/WisdomFinder.tsx); it is
 * read by lib/wisdom-vectors.ts.
 *
 * Source and licence. GloVe 6B, 100 dimensions (Jeffrey Pennington, Richard
 * Socher and Christopher D. Manning, "GloVe: Global Vectors for Word
 * Representation", Stanford, 2014; trained on Wikipedia 2014 and Gigaword 5),
 * released under the Open Data Commons Public Domain Dedication and License
 * v1.0 (https://opendatacommons.org/licenses/pddl/1-0/). Read here from the
 * npm package wink-embeddings-sg-100d 1.1.0 (MIT licence, GRAYPE Systems),
 * which carries glove.6B.100d as JSON; its ACKNOWLEDGEMENT.md names the
 * source and its first vector ("the") is glove.6B.100d's own. Tarball:
 * https://registry.npmjs.org/wink-embeddings-sg-100d/-/wink-embeddings-sg-100d-1.1.0.tgz
 * (sha256 2d1bea7fa5525661598829da929d628e5c76e6206a4923c6b464f30c1a5d647c).
 *
 * Kept: the KEEP commonest words made of letters only, in GloVe's order
 * (most frequent first, which lib/wisdom-vectors.ts reads as each word's
 * frequency), then every other word the finder's own data uses (each
 * subject's name, keywords and phrasings, the rewrites, synonyms and
 * concepts in client/public/wisdom/finder.json) that GloVe knows, in the
 * same order. Each word keeps its length as a float32 and its direction as
 * DIMS signed bytes (the unit vector times 127, rounded).
 *
 * File, little-endian: the bytes "LWV1"; uint32 dims; uint32 count; uint32
 * byte length of the word list; the words joined by "\n" in UTF-8; zero
 * padding to a multiple of 4; count float32 lengths; count × dims int8.
 *
 * Not run in CI: the source is 300 MB and is not kept in the repository.
 *   curl -sO https://registry.npmjs.org/wink-embeddings-sg-100d/-/wink-embeddings-sg-100d-1.1.0.tgz
 *   tar -xzf wink-embeddings-sg-100d-1.1.0.tgz package/wink-embeddings-sg-100d.json
 *   node scripts/build-wisdom-vectors.mjs package/wink-embeddings-sg-100d.json
 * The same source gives the same file, byte for byte.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalize } from "./lib/wisdom-words.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FINDER = path.join(ROOT, "client/public/wisdom/finder.json");
const OUT = path.join(ROOT, "client/public/wisdom/vectors.bin");
const KEEP = 30000;
const DIMS = 100;

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/build-wisdom-vectors.mjs <wink-embeddings-sg-100d.json>");
  process.exit(2);
}
const glove = JSON.parse(fs.readFileSync(src, "utf8"));
if (glove.dimensions !== DIMS || !Array.isArray(glove.words) || !glove.vectors) {
  console.error(`[vectors] ${src}: not the 100-dimension GloVe file this script expects`);
  process.exit(1);
}
// glove.6B.100d's own first vector, so a different file is never taken for it.
const THE = [-0.038194, -0.24487, 0.72812, -0.39961];
if (THE.some((x, i) => Math.abs(glove.vectors.the?.[i] - x) > 1e-6)) {
  console.error(`[vectors] ${src}: "the" is not glove.6B.100d's vector`);
  process.exit(1);
}

// Every word the finder's own data uses.
const finder = JSON.parse(fs.readFileSync(FINDER, "utf8"));
const own = new Set();
const take = (text) => normalize(String(text ?? "")).split(" ").forEach((w) => w && own.add(w));
for (const t of finder.topics) {
  take(t.label);
  t.keywords.forEach(take);
  t.phrases.forEach(take);
}
for (const [k, v] of Object.entries(finder.rewrites)) take(`${k} ${v}`);
for (const [k, v] of Object.entries(finder.synonyms)) take(`${k} ${v}`);
for (const c of finder.concepts ?? []) take(`${c.words.join(" ")} ${c.adds}`);

const words = [];
let common = 0;
for (const w of glove.words) {
  if (!/^[a-z]+$/.test(w)) continue;
  if (common < KEEP) {
    common++;
    words.push(w);
  } else if (own.has(w)) words.push(w);
}

const list = Buffer.from(words.join("\n"), "utf8");
const pad = (4 - (list.length % 4)) % 4;
const head = Buffer.alloc(16);
head.write("LWV1", 0, "latin1");
head.writeUInt32LE(DIMS, 4);
head.writeUInt32LE(words.length, 8);
head.writeUInt32LE(list.length, 12);
const lengths = Buffer.alloc(words.length * 4);
const dirs = Buffer.alloc(words.length * DIMS);
words.forEach((w, i) => {
  const v = glove.vectors[w];
  let n = 0;
  for (let d = 0; d < DIMS; d++) n += v[d] * v[d];
  n = Math.sqrt(n);
  lengths.writeFloatLE(n, i * 4);
  for (let d = 0; d < DIMS; d++) dirs.writeInt8(Math.max(-127, Math.min(127, Math.round((127 * v[d]) / (n || 1)))), i * DIMS + d);
});
const file = Buffer.concat([head, list, Buffer.alloc(pad), lengths, dirs]);
fs.writeFileSync(OUT, file);
const missing = [...own].filter((w) => /^[a-z]+$/.test(w) && !glove.vectors[w]);
console.log(
  `[vectors] wrote ${path.relative(ROOT, OUT)}: ${words.length} words (${KEEP} commonest, ${words.length - KEEP} more from the finder's own data), ${DIMS} dimensions, ${(file.length / 1e6).toFixed(2)} MB; ${missing.length} of the finder's words are not in GloVe`,
);
