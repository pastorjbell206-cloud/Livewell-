#!/usr/bin/env node
/**
 * build-bible.mjs — builds the Study Bible's data from licensed sources into
 * client/public/bible/ (committed; the sources are not fetched at deploy).
 *
 *   STEP_DIR=/path/to/STEPBible-Data BSB_JSON=/path/to/BSB.json \
 *   XREF_DIR=/path/to/cross-reference-sql node scripts/build-bible.mjs
 *
 * Sources (docs/STUDY-BIBLE-PROMPT.md §2):
 *   - Berean Standard Bible, public domain (scrollmapper/bible_databases BSB.json)
 *   - STEPBible TAHOT / TAGNT tagged Hebrew and Greek, CC BY 4.0 (Tyndale House)
 *   - STEPBible TBESH / TBESG brief lexicons, CC BY 4.0
 *   - STEPBible TEHMC / TEGMC morphology expansions, CC BY 4.0
 *   - OpenBible.info cross-references, CC BY (via scrollmapper SQL dump)
 *
 * Output:
 *   bible/books.json                      66 books: code, slug, name, testament, chapters
 *   bible/ch/<slug>/<n>.json              one chapter: BSB text, original words, cross-refs
 *   bible/lex/<H|G>/<bucket>.json         lexicon shards (250 numbers each) + occurrence counts
 *   bible/morph/<H|G>.json                grammar code -> plain-language expansion
 *
 * Word tuple in a chapter file: [original, transliteration, gloss, strong, grammar, editions?]
 * (editions only on Greek words that differ between the major editions).
 */
import fs from "node:fs";
import path from "node:path";

const STEP = process.env.STEP_DIR;
const BSB = process.env.BSB_JSON;
const XREF = process.env.XREF_DIR;
if (!STEP || !BSB || !XREF) {
  console.error("Set STEP_DIR, BSB_JSON, and XREF_DIR (see header).");
  process.exit(1);
}
const OUT = path.resolve("client/public/bible");

// Canonical order: STEPBible codes, in the order the BSB lists its books.
const CODES = "Gen Exo Lev Num Deu Jos Jdg Rut 1Sa 2Sa 1Ki 2Ki 1Ch 2Ch Ezr Neh Est Job Psa Pro Ecc Sng Isa Jer Lam Ezk Dan Hos Jol Amo Oba Jon Mic Nam Hab Zep Hag Zec Mal Mat Mrk Luk Jhn Act Rom 1Co 2Co Gal Eph Php Col 1Th 2Th 1Ti 2Ti Tit Phm Heb Jas 1Pe 2Pe 1Jn 2Jn 3Jn Jud Rev".split(" ");

const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const read = (p) => fs.readFileSync(p, "utf8");
const writeJson = (p, data) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data));
};

// ── books and English text ───────────────────────────────────────────────────
const bsb = JSON.parse(read(BSB));
if (bsb.books.length !== 66) throw new Error(`BSB has ${bsb.books.length} books`);
const displayName = (n) =>
  n.replace(/^III /, "3 ").replace(/^II /, "2 ").replace(/^I /, "1 ").replace(/^Revelation of John$/, "Revelation");
bsb.books.forEach((b) => { b.name = displayName(b.name); });
const books = bsb.books.map((b, i) => ({
  code: CODES[i],
  slug: slugify(b.name),
  name: b.name,
  testament: i < 39 ? "OT" : "NT",
  chapters: b.chapters.length,
}));
const byCode = new Map(books.map((b, i) => [b.code, { ...b, index: i }]));
const byName = new Map(bsb.books.map((b, i) => [b.name.toLowerCase(), i]));

// chapters[bookIndex][chapter] = Map(verse -> { t, w: [], x: [] })
const chapters = bsb.books.map((b) => {
  const chs = {};
  for (const c of b.chapters) {
    const m = new Map();
    for (const v of c.verses) m.set(v.verse, { v: v.verse, t: String(v.text).trim(), w: [], x: [] });
    chs[c.chapter] = m;
  }
  return chs;
});

// ── tagged original-language text ────────────────────────────────────────────
const occ = { H: new Map(), G: new Map() }; // strong -> { n, refs[] }
const usedMorph = { H: new Set(), G: new Set() };
let placed = 0, orphan = 0;

function addOcc(lang, strong, ref) {
  const o = occ[lang].get(strong) ?? { n: 0, refs: [] };
  o.n++;
  if (o.refs.length < 60 && o.refs[o.refs.length - 1] !== ref) o.refs.push(ref);
  occ[lang].set(strong, o);
}

function place(code, ch, v, word) {
  const b = byCode.get(code);
  const verse = b && chapters[b.index][ch]?.get(v);
  if (!verse) { orphan++; return; }
  verse.w.push(word);
  placed++;
}

// Words from outside the critical text, per verse; used only where the
// critical text has no words at all for that verse.
const later = new Map();
function placeLater(code, ch, v, word) {
  const k = `${code}.${ch}.${v}`;
  (later.get(k) ?? later.set(k, []).get(k)).push(word);
}

const REF = /^([1-3]?[A-Z][a-z]{1,2})\.(\d+)\.(\d+)[^#]*#\d+=(\S+)/;
const tagDir = path.join(STEP, "Translators Amalgamated OT+NT");
// Read the source files in canonical order (their names sort Act-Rev before
// Mat-Jhn), so occurrence lists run from Genesis and Matthew forward.
const canonical = (prefix) =>
  fs.readdirSync(tagDir)
    .filter((f) => f.startsWith(prefix))
    .sort((a, b) => CODES.indexOf(a.split(" ")[1].split("-")[0]) - CODES.indexOf(b.split(" ")[1].split("-")[0]));

for (const f of canonical("TAHOT")) {
  for (const line of read(path.join(tagDir, f)).split("\n")) {
    const m = line.match(REF);
    if (!m) continue;
    const type = m[4];
    // The reading tradition: Leningrad (L…) and Qere (Q…) words; skip the
    // written-only Ketiv forms and editorial rows.
    if (!/^L|^Q/.test(type)) continue;
    const c = line.split("\t");
    // "/" splits prefixes and "\\" sets off punctuation (sof pasuq, maqaf) in
    // the source; the reader sees the word as printed.
    const heb = (c[1] || "").replace(/[\/\\]/g, "").trim();
    const tr = (c[2] || "").replace(/\//g, "").trim();
    const gloss = (c[3] || "").replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim();
    const dstrong = c[4] || "";
    const main = (dstrong.match(/\{([^}]+)\}/) || [])[1] || dstrong.split("/").pop() || "";
    const grammar = (c[5] || "").trim();
    grammar.split("/").forEach((seg, i) => usedMorph.H.add(i === 0 ? seg : `H${seg}`));
    const ref = `${m[1]}.${m[2]}.${m[3]}`;
    place(m[1], +m[2], +m[3], [heb, tr, gloss, main, grammar]);
    if (main) addOcc("H", main, ref);
  }
}

const FULL = "NA28+NA27+Tyn+SBL+WH+Treg+TR+Byz";
for (const f of canonical("TAGNT")) {
  for (const line of read(path.join(tagDir, f)).split("\n")) {
    const m = line.match(REF);
    if (!m) continue;
    const type = m[4];
    // The critical text (Nestle-Aland): words whose type includes N/n. Words
    // only in other editions are kept aside, and used for a verse the
    // critical text omits entirely (e.g. Acts 8:37), marked with their editions.
    const inCritical = /[Nn]/.test(type);
    const c = line.split("\t");
    const gm = (c[1] || "").match(/^(.*?)\s*\((.*)\)\s*$/);
    const greek = (gm ? gm[1] : c[1] || "").trim();
    const tr = (gm ? gm[2] : "").trim();
    const gloss = (c[2] || "").trim();
    const [strongRaw = "", grammar = ""] = (c[3] || "").split("=");
    const strong = strongRaw.trim();
    const editions = (c[5] || "").trim();
    usedMorph.G.add(grammar.trim());
    const ref = `${m[1]}.${m[2]}.${m[3]}`;
    const word = [greek, tr, gloss, strong, grammar.trim()];
    if (editions && editions !== FULL) word.push(editions);
    if (!inCritical) { placeLater(m[1], +m[2], +m[3], word); continue; }
    place(m[1], +m[2], +m[3], word);
    if (strong) addOcc("G", strong, ref);
  }
}

let restored = 0;
for (const [k, ws] of later) {
  const [code, ch, v] = k.split(".");
  const b = byCode.get(code);
  const verse = b && chapters[b.index][+ch]?.get(+v);
  if (verse && verse.w.length === 0) { verse.w = ws; verse.later = true; restored++; }
}

// ── cross-references ─────────────────────────────────────────────────────────
const nameIndex = (n) => {
  const k = n.toLowerCase();
  if (byName.has(k)) return byName.get(k);
  const alias = { "psalms": "psalm", "song of songs": "song of solomon", "song of solomon": "song of songs", "revelation": "revelation of john" };
  return byName.get(alias[k] ?? "") ?? -1;
};
const XROW = /\('([^']+)',\s*(\d+),\s*(\d+),\s*'([^']+)',\s*(\d+),\s*(\d+),\s*(\d+),\s*(-?\d+)\)/g;
let xrefs = 0, xrefMiss = new Set();
for (const f of fs.readdirSync(XREF).filter((f) => f.endsWith(".sql")).sort()) {
  for (const m of read(path.join(XREF, f)).matchAll(XROW)) {
    const [, fb, fc, fv, tb, tc, tvs, tve, votes] = m;
    const fi = nameIndex(fb), ti = nameIndex(tb);
    if (fi < 0) { xrefMiss.add(fb); continue; }
    if (ti < 0) { xrefMiss.add(tb); continue; }
    if (+votes < 1) continue;
    const verse = chapters[fi][+fc]?.get(+fv);
    if (!verse) continue;
    verse.x.push([`${books[ti].code}.${tc}.${tvs}${+tve > +tvs ? `-${tve}` : ""}`, +votes]);
    xrefs++;
  }
}

// ── write chapters ───────────────────────────────────────────────────────────
fs.rmSync(OUT, { recursive: true, force: true });
let bytes = 0, emptyWords = 0;
books.forEach((b, i) => {
  for (const [ch, verses] of Object.entries(chapters[i])) {
    const out = {
      book: b.code,
      chapter: +ch,
      verses: Array.from(verses.values()).map((v) => {
        if (!v.w.length) emptyWords++;
        const x = v.x.sort((a, b) => b[1] - a[1]).slice(0, 12).map((r) => r[0]);
        const base = { v: v.v, t: v.t, w: v.w, ...(v.later ? { later: true } : {}) };
        return x.length ? { ...base, x } : base;
      }),
    };
    const p = path.join(OUT, "ch", b.slug, `${ch}.json`);
    writeJson(p, out);
    bytes += fs.statSync(p).size;
  }
});
writeJson(path.join(OUT, "books.json"), books);

// ── lexicons ─────────────────────────────────────────────────────────────────
const clean = (html) =>
  String(html || "")
    .replace(/<ref=['"]([^'"]+)['"]>(.*?)<\/ref>/g, "$2")
    .replace(/__/g, "") // Abbott-Smith's indentation markers
    .replace(/<(\/?)(b|i)>/gi, "<$1$2>")
    .replace(/<br\s*\/?>/gi, "<br>")
    .replace(/<(?!\/?(?:b|i)>|br>)[^>]*>/gi, "")
    .replace(/\s+/g, " ")
    .trim();

const lexDir = path.join(STEP, "Lexicons");
const lexFiles = { H: fs.readdirSync(lexDir).find((f) => f.startsWith("TBESH")), G: fs.readdirSync(lexDir).find((f) => f.startsWith("TBESG")) };
const lexStats = {};
for (const lang of ["H", "G"]) {
  const shards = {};
  let entries = 0;
  for (const line of read(path.join(lexDir, lexFiles[lang])).split("\n")) {
    const c = line.split("\t");
    // Column 2 is "<eStrong> = <relation>", column 3 the related entry.
    const [keyPart, relation = ""] = (c[1] || "").split("=");
    const key = keyPart.trim();
    if (!new RegExp(`^${lang}\\d{4}[A-Za-z]?$`).test(key)) continue;
    const related = (c[2] || "").trim();
    const num = parseInt(key.slice(1, 5), 10);
    const bucket = String(Math.floor(num / 250));
    const o = occ[lang].get(key);
    (shards[bucket] ??= {})[key] = {
      l: (c[3] || "").trim(),
      tr: (c[4] || "").trim(),
      pos: (c[5] || "").trim(),
      g: (c[6] || "").trim(),
      d: clean(c[7]),
      n: o?.n ?? 0,
      r: o?.refs ?? [],
      ...(relation.trim() && related && related !== key ? { rel: `${relation.trim()} ${related}` } : {}),
    };
    entries++;
  }
  for (const [bucket, data] of Object.entries(shards)) writeJson(path.join(OUT, "lex", lang, `${bucket}.json`), data);
  const keys = new Set(Object.values(shards).flatMap((s) => Object.keys(s)));
  let found = 0, missing = 0;
  for (const k of occ[lang].keys()) (keys.has(k) || keys.has(k.replace(/[A-Za-z]$/, "")) ? found++ : missing++);
  lexStats[lang] = { entries, wordsWithEntry: found, wordsWithout: missing };
}

// ── grammar codes ────────────────────────────────────────────────────────────
const morphDir = path.join(STEP, "Morphology codes");
for (const lang of ["H", "G"]) {
  const f = fs.readdirSync(morphDir).find((f) => f.startsWith(lang === "H" ? "TEHMC" : "TEGMC"));
  const map = {};
  for (const line of read(path.join(morphDir, f)).split("\n")) {
    const [code, expansion] = line.split("\t");
    const k = (code || "").trim();
    if (usedMorph[lang].has(k) && expansion && !map[k]) map[k] = expansion.replace(/\s+/g, " ").replace(/\s;/g, ";").trim();
  }
  writeJson(path.join(OUT, "morph", `${lang}.json`), map);
  lexStats[`${lang}-morph`] = { used: usedMorph[lang].size, expanded: Object.keys(map).length };
}

writeJson(path.join(OUT, "sources.json"), {
  builtAt: new Date().toISOString(),
  sources: [
    { name: "Berean Standard Bible", licence: "Public domain", url: "https://berean.bible" },
    { name: "STEPBible Data (Tyndale House, Cambridge): TAHOT, TAGNT, TBESH, TBESG, TEHMC, TEGMC", licence: "CC BY 4.0", url: "https://www.STEPBible.org" },
    { name: "OpenBible.info cross-references", licence: "CC BY", url: "https://www.openbible.info/labs/cross-references/" },
  ],
});

console.log(`[bible] ${books.length} books, ${books.reduce((n, b) => n + b.chapters, 0)} chapters, ${(bytes / 1048576).toFixed(1)} MB of chapter files`);
console.log(`[bible] verses restored from later editions: ${restored}`);
console.log(`[bible] original words placed: ${placed}, unplaced (versification): ${orphan}, verses without words: ${emptyWords}`);
console.log(`[bible] cross-references: ${xrefs}${xrefMiss.size ? `, unmatched book names: ${[...xrefMiss].join(", ")}` : ""}`);
console.log(`[bible] lexicons and grammar:`, JSON.stringify(lexStats));
