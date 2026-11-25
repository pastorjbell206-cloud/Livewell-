/**
 * The Wisdom Finder's word vectors: client/public/wisdom/vectors.bin, built by
 * scripts/build-wisdom-vectors.mjs from GloVe 6B (Stanford, 2014; public
 * domain under the Open Data Commons PDDL 1.0). About 30,000 words, each a
 * direction in 100 dimensions: words used in the same kinds of sentences sit
 * near each other ("furious" near "angry", "congregation" near "church").
 *
 * A sentence becomes one vector: its words' vectors added, each weighted by
 * how uncommon the word is, so "the", "really" and "today" count for little
 * (smooth inverse frequency, after Arora, Liang and Ma, "A Simple but
 * Tough-to-Beat Baseline for Sentence Embeddings", 2017), then scaled to
 * length one. lib/wisdom-match.ts compares it with each subject's own name and
 * phrasings, made into vectors the same way.
 *
 * The file is fetched only when a reader starts to use the finder (3.4 MB,
 * never on first paint): pages/tools/WisdomFinder.tsx.
 */
import { fetchArrayBuffer } from "@/lib/fetch-json";

export const VECTORS_URL = "/wisdom/vectors.bin";

export interface WordVectors {
  dims: number;
  /** A word's place in the file: GloVe's own order, most frequent first. */
  rank: Map<string, number>;
  /** Each word's vector length. */
  lengths: Float32Array;
  /** Each word's direction, `dims` signed bytes (the unit vector times 127). */
  dirs: Int8Array;
}

/** The file's layout is in scripts/build-wisdom-vectors.mjs. Null when it is not that file. */
export function parseVectors(buf: ArrayBuffer): WordVectors | null {
  if (buf.byteLength < 16) return null;
  const head = new DataView(buf);
  if (String.fromCharCode(head.getUint8(0), head.getUint8(1), head.getUint8(2), head.getUint8(3)) !== "LWV1") return null;
  const dims = head.getUint32(4, true);
  const count = head.getUint32(8, true);
  const listBytes = head.getUint32(12, true);
  if (16 + listBytes > buf.byteLength) return null;
  const words = new TextDecoder().decode(new Uint8Array(buf, 16, listBytes)).split("\n");
  let at = 16 + listBytes;
  at += (4 - (at % 4)) % 4;
  if (words.length !== count || buf.byteLength !== at + count * 4 + count * dims) return null;
  const lengths = new Float32Array(count);
  for (let i = 0; i < count; i++) lengths[i] = head.getFloat32(at + i * 4, true);
  const dirs = new Int8Array(buf, at + count * 4, count * dims);
  return { dims, rank: new Map(words.map((w, i) => [w, i])), lengths, dirs };
}

let loading: Promise<WordVectors | null> | null = null;

/** The vectors, fetched once; null when they cannot be had (the finder then matches on words alone). */
export function fetchVectors(): Promise<WordVectors | null> {
  loading ??= fetchArrayBuffer(VECTORS_URL)
    .then(parseVectors)
    .catch(() => null)
    .then((v) => {
      // A failed fetch may be tried again by a later use.
      if (!v) loading = null;
      return v;
    });
  return loading;
}

/** GloVe 6B's vocabulary, the scale for a word's frequency from its rank (Zipf). */
const GLOVE_WORDS = 400000;
/** Smooth inverse frequency's constant: a word as common as "today" counts about half. */
const SIF = 1e-3;

/** A word's weight in a sentence: near 1 for an uncommon word, small for a very common one. */
export function wordWeight(rank: number): number {
  const p = 1 / ((rank + 1) * Math.log(1.78 * GLOVE_WORDS));
  return SIF / (SIF + p);
}

/** The words' vector, weighted and scaled to length one; null when no word is known. */
export function sentenceVector(v: WordVectors, words: string[]): Float32Array | null {
  const out = new Float32Array(v.dims);
  let any = false;
  for (const w of words) {
    const i = v.rank.get(w);
    if (i === undefined) continue;
    any = true;
    const k = (wordWeight(i) * v.lengths[i]) / 127;
    const base = i * v.dims;
    for (let d = 0; d < v.dims; d++) out[d] += k * v.dirs[base + d];
  }
  return any ? unit(out) : null;
}

/** Scaled to length one, in place. */
export function unit(x: Float32Array): Float32Array {
  let n = 0;
  for (let d = 0; d < x.length; d++) n += x[d] * x[d];
  n = Math.sqrt(n) || 1;
  for (let d = 0; d < x.length; d++) x[d] /= n;
  return x;
}
