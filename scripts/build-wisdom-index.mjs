#!/usr/bin/env node
/**
 * build-wisdom-index.mjs
 *
 * Builds the wisdom library (the Wisdom Finder at /tools/wisdom-finder and the
 * topic pages at /wisdom/:id) from its sources:
 *
 *   client/public/wisdom/topics/*.json   the 208 topics (arrays), as before
 *   client/public/wisdom/deep/<id>.json  a topic written to the full standard:
 *                                        its passages read in context, the
 *                                        "often misread" layer, the whole
 *                                        Bible's wisdom, where Christians
 *                                        differ, a question to sit with, a
 *                                        prayer from a psalm, where to go next
 *   client/public/wisdom/matching.json   the finder's hand-written matching
 *                                        data and the areas of life
 *
 * and writes:
 *
 *   client/public/wisdom/topics.json     every topic in the old shape (the
 *                                        search index, the passage index, the
 *                                        sitemap, the prerender and /wisdom
 *                                        read it); a deep topic's verses are
 *                                        its passages
 *   client/public/wisdom/finder.json     what the finder needs to match and
 *                                        list (no verse text): small
 *   client/public/wisdom/entry/<id>.json one file per topic page: everything
 *                                        the page shows, Scripture filled in
 *                                        from the Berean Standard Bible
 *
 * Scripture in a deep file is a reference only; its words come from
 * client/public/bible/ch/ (scripts/lib/bsb.mjs), never typed by hand.
 *
 *   node scripts/build-wisdom-index.mjs           write
 *   node scripts/build-wisdom-index.mjs --check   fail if any output is stale (CI)
 *
 * Topic shape (topics/*.json): { id, label, keywords[], framing, cultural,
 * historical, application, verses: [{ ref, text }], related?, articles? }.
 * The deep shape is checked by scripts/validate-wisdom.mjs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { passage, readingText, readRef } from "./lib/bsb.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const W = path.join(ROOT, "client/public/wisdom");
const DIR = path.join(W, "topics");
const DEEP = path.join(W, "deep");
const OUT = path.join(W, "topics.json");
const FINDER = path.join(W, "finder.json");
const ENTRY = path.join(W, "entry");
const SENSITIVE = path.join(ROOT, "client/src/data/sensitive-pages.json");
const REQUIRED = ["id", "label", "keywords", "framing", "cultural", "historical", "application", "verses"];
const CHECK = process.argv.includes("--check");

const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).sort() : [];
const byId = new Map();
let problems = 0;

for (const f of files) {
  let arr;
  try {
    arr = readJson(path.join(DIR, f));
  } catch (e) {
    console.error(`[wisdom] ${f}: invalid JSON: ${e.message}`);
    problems++;
    continue;
  }
  if (!Array.isArray(arr)) {
    console.error(`[wisdom] ${f}: expected an array`);
    problems++;
    continue;
  }
  for (const t of arr) {
    const missing = REQUIRED.filter((k) => t[k] === undefined || t[k] === null || t[k] === "");
    if (missing.length) {
      console.error(`[wisdom] ${f}: topic "${t.id || "?"}" missing ${missing.join(", ")}`);
      problems++;
      continue;
    }
    if (!Array.isArray(t.keywords) || t.keywords.length === 0) {
      console.error(`[wisdom] ${f}: topic "${t.id}" needs a non-empty keywords array`);
      problems++;
      continue;
    }
    if (!Array.isArray(t.verses) || t.verses.length === 0) {
      console.error(`[wisdom] ${f}: topic "${t.id}" needs at least one verse`);
      problems++;
      continue;
    }
    if (byId.has(t.id)) console.warn(`[wisdom] duplicate id "${t.id}" (later file wins)`);
    byId.set(t.id, t);
  }
}

// The deep layer, one file per topic.
const deep = new Map();
for (const f of fs.existsSync(DEEP) ? fs.readdirSync(DEEP).filter((x) => x.endsWith(".json")).sort() : []) {
  const d = readJson(path.join(DEEP, f));
  if (!byId.has(d.id) || `${d.id}.json` !== f) {
    console.error(`[wisdom] deep/${f}: id "${d.id}" is not a topic, or the file is not named for it`);
    problems++;
    continue;
  }
  deep.set(d.id, d);
}

const matching = readJson(path.join(W, "matching.json"));
const sensitive = readJson(SENSITIVE).wisdom;
const careFor = (id) => sensitive.lead[id] ?? sensitive.end[id] ?? null;
const careLead = (id) => Boolean(sensitive.lead[id]);
const areaOf = new Map();
for (const a of matching.areas) for (const id of a.topics) areaOf.set(id, a.id);

/** Where a reference sits: book slug, chapter, first and last verse in that chapter. */
function place(ref) {
  const r = readRef(ref);
  if (!r) throw new Error(`cannot read reference "${ref}"`);
  const p = r.parts[0];
  const last = r.parts[r.parts.length - 1];
  const v2 = last.c2 === p.c1 && Number.isFinite(last.v2) ? last.v2 : p.v1;
  return { slug: r.book.slug, chapter: p.c1, v1: p.v1, v2 };
}

/** A verse that ends its sentence can stand alone (the verse of the day draws only from these). */
const endsSentence = (text) => /[.?!][”’"')]*$/.test(text.trim());

const firstSentence = (s) => {
  const m = s.match(/^.*?[.?!](?=\s|$)/);
  return (m ? m[0] : s).trim();
};

// The verse's words exactly; a psalm quoted from verse 1 drops its heading ("For the choirmaster. A Psalm of David."), as the Study Bible's reading text does.
const fill = (ref) => {
  const r = readRef(ref);
  return r && r.book.slug === "psalms" && r.parts[0].v1 === 1 ? readingText(ref) : passage(ref).text;
};
const placeFields = (ref) => {
  const at = place(ref);
  return { slug: at.slug, chapter: at.chapter, v1: at.v1, v2: at.v2 };
};

const topics = Array.from(byId.values()).sort((a, b) => a.label.localeCompare(b.label));
const outTopics = [];
const finderTopics = [];
const daily = [];
const entries = new Map();

for (const t of topics) {
  const d = deep.get(t.id);
  const m = matching.topics[t.id] ?? {};
  try {
    const verses = d ? d.passages.map((p) => ({ ref: p.ref, text: fill(p.ref) })) : t.verses.map((v) => ({ ref: v.ref, text: v.text }));
    // Same keys in the same order as the source, so a topic without a deep file is written unchanged.
    outTopics.push(Object.fromEntries(Object.entries(t).map(([k, v]) => [k, k === "verses" ? verses : v])));

    finderTopics.push({
      id: t.id,
      label: t.label,
      area: areaOf.get(t.id) ?? "",
      line: firstSentence(t.framing),
      keywords: t.keywords,
      phrases: m.phrases ?? [],
      not: m.not ?? [],
      related: m.related ?? [],
      framing: t.framing,
      ...(d ? { deep: true } : {}),
      ...(careFor(t.id) ? { care: true } : {}),
    });

    const source = d ? d.passages : t.verses;
    const versesOut = source.map((p, i) => ({
      ref: p.ref,
      text: verses[i].text,
      ...placeFields(p.ref),
      whole: endsSentence(verses[i].text),
      ...(p.context ? { context: p.context, contextAt: placeFields(p.context) } : {}),
      ...(p.where ? { where: p.where } : {}),
    }));
    // The verse of the day draws only from verses that end their sentence, so it is never cut mid-sentence.
    const whole = versesOut.find((v) => v.whole);
    if (whole) daily.push({ id: t.id, label: t.label, ref: whole.ref, text: whole.text });
    const entry = {
      id: t.id,
      label: t.label,
      area: areaOf.get(t.id) ?? "",
      framing: t.framing,
      cultural: t.cultural,
      historical: t.historical,
      application: t.application,
      keywords: t.keywords.slice(0, 10),
      verses: versesOut,
      related: (m.related ?? []).filter((id) => byId.has(id)).map((id) => ({ id, label: byId.get(id).label })),
      links: [...(t.related ?? []), ...(t.articles ?? [])],
      care: careFor(t.id) ? { topics: careFor(t.id), lead: careLead(t.id) } : null,
    };
    if (d) {
      entry.deep = {
        updated: d.updated,
        misread: (d.misread ?? []).map((x) => ({ ...x, text: fill(x.ref), ...placeFields(x.ref) })),
        whole: d.whole,
        differ: d.differ ?? null,
        sit: d.sit,
        prayer: { ...d.prayer, text: readingText(d.prayer.ref) },
        next: d.next ?? [],
        careLines: d.careLines ?? [],
        notAdvice: d.notAdvice ?? null,
      };
    }
    entries.set(t.id, entry);
  } catch (e) {
    console.error(`[wisdom] ${t.id}: ${e.message}`);
    problems++;
  }
}

const finder = {
  about: "Built by scripts/build-wisdom-index.mjs from topics/*.json, deep/*.json and matching.json. Do not edit by hand.",
  rewrites: matching.rewrites,
  synonyms: matching.synonyms,
  areas: matching.areas,
  topics: finderTopics,
  daily,
};

const outputs = new Map();
outputs.set(OUT, JSON.stringify({ topics: outTopics }, null, 2) + "\n");
outputs.set(FINDER, JSON.stringify(finder) + "\n");
for (const [id, e] of entries) outputs.set(path.join(ENTRY, `${id}.json`), JSON.stringify(e) + "\n");

if (CHECK) {
  let stale = 0;
  for (const [f, body] of outputs) {
    const now = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
    if (now !== body) {
      console.error(`[wisdom] stale: ${path.relative(ROOT, f)}`);
      stale++;
    }
  }
  for (const f of fs.existsSync(ENTRY) ? fs.readdirSync(ENTRY) : []) {
    if (!entries.has(f.replace(/\.json$/, ""))) {
      console.error(`[wisdom] stale: entry/${f} has no topic`);
      stale++;
    }
  }
  if (stale || problems) {
    console.error(`[wisdom] ${stale} stale file(s), ${problems} problem(s). Run: node scripts/build-wisdom-index.mjs`);
    process.exit(1);
  }
  console.log(`[wisdom] up to date: ${outTopics.length} topics (${deep.size} written in full), finder.json, ${entries.size} entry files`);
  process.exit(0);
}

fs.mkdirSync(ENTRY, { recursive: true });
for (const f of fs.readdirSync(ENTRY)) if (!entries.has(f.replace(/\.json$/, ""))) fs.unlinkSync(path.join(ENTRY, f));
for (const [f, body] of outputs) fs.writeFileSync(f, body);
console.log(`[wisdom] wrote ${outTopics.length} topics to topics.json (${deep.size} written in full), finder.json, ${entries.size} entry files (${problems} problem(s))`);
process.exit(problems ? 1 : 0);
