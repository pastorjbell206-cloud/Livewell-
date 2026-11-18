#!/usr/bin/env node
/**
 * build-history-index.mjs
 *
 * Scans client/public/history/essays/*.json and writes
 * client/public/history/essays-index.json, the manifest the Church History
 * library loads. Run this after adding or changing any history essay JSON file.
 *
 *   node scripts/build-history-index.mjs
 *
 * The manifest entry for each essay is { slug, title, blurb, era, dateRange },
 * where blurb is taken from the essay subtitle, plus where it sits in the
 * course: the essays filed under one of the seven timeline eras are the
 * course, numbered in shelf order ("course": 1, 2, ...); every other essay is
 * a longer one to go deeper with, and "under" names the timeline era it shares
 * the most years with. "sources" counts the checked source cards an essay has in
 * client/public/history/sources/<slug>.json (scripts/verify-sources.mjs).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ESSAY_DIR = path.resolve(__dirname, "..", "client", "public", "history", "essays");
const OUT = path.resolve(__dirname, "..", "client", "public", "history", "essays-index.json");

const SOURCES_DIR = path.resolve(__dirname, "..", "client", "public", "history", "sources");
const TIMELINE = path.resolve(__dirname, "..", "client", "public", "theology", "church-history-timeline.json");

const files = fs.readdirSync(ESSAY_DIR).filter((f) => f.endsWith(".json") && f !== "essays-index.json");
const essays = [];
for (const f of files) {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(ESSAY_DIR, f), "utf8"));
    if (!d.slug || !d.title) continue;
    essays.push({
      slug: d.slug,
      title: d.title,
      blurb: d.subtitle || "",
      era: d.era || "",
      dateRange: d.dateRange || "",
    });
  } catch (err) {
    console.warn(`[build-history-index] skipped ${f}:`, err.message);
  }
}

// Chronological shelf order: eras ranked per the timeline (an alphabetical
// sort would file "The Age of the Councils" before "The Apostolic Age").
const ERA_ORDER = [
  "The Apostolic Age",
  "The Persecuted Church",
  "The Age of the Councils",
  "The Early Medieval Church",
  "The High Medieval Church",
  "The Reformation",
  "The Modern and Global Church",
];
const rank = (e) => {
  const i = ERA_ORDER.indexOf(e.era);
  return i === -1 ? ERA_ORDER.length : i;
};
const firstYear = (e) => {
  const m = String(e.dateRange).match(/\d{2,4}/);
  return m ? Number(m[0]) : 9999;
};
// A tie on the first year falls to the slug, which does not change when a
// title is reworded, so renaming an essay cannot renumber the course.
essays.sort((a, b) => rank(a) - rank(b) || firstYear(a) - firstYear(b) || a.slug.localeCompare(b.slug));

// The course and what hangs beside it. An era's span comes from the timeline
// file, the same one the hub reads, so the two cannot disagree.
const eras = JSON.parse(fs.readFileSync(TIMELINE, "utf8")).eras.map((e) => {
  const nums = (e.range.match(/\d+/g) || []).map(Number);
  return { name: e.name, start: nums[0] ?? 0, end: /today/i.test(e.range) ? 9999 : (nums[1] ?? nums[0] ?? 0) };
});
// A longer essay sits under the era it shares the most years with (the
// earlier one on a tie), so "AD 1648-1800" files under the modern church and
// not under the Reformation it only touches.
const span = (e) => {
  const nums = (String(e.dateRange).match(/\d{2,4}/g) || []).map(Number);
  const start = nums[0] ?? 0;
  return { start, end: /present|today/i.test(e.dateRange) ? new Date().getFullYear() : (nums[1] ?? start) };
};
const eraForSpan = ({ start, end }) => {
  let best = "";
  let most = -1;
  for (const e of eras) {
    const shared = Math.min(end, e.end) - Math.max(start, e.start);
    if (shared > most) { most = shared; best = e.name; }
  }
  return best;
};
let n = 0;
for (const e of essays) {
  if (ERA_ORDER.includes(e.era)) e.course = ++n;
  else e.under = eraForSpan(span(e));
  const src = path.join(SOURCES_DIR, `${e.slug}.json`);
  if (fs.existsSync(src)) {
    const cards = JSON.parse(fs.readFileSync(src, "utf8")).cards;
    if (Array.isArray(cards) && cards.length) e.sources = cards.length;
  }
}
fs.writeFileSync(OUT, JSON.stringify({ essays }, null, 2));
console.log(`[build-history-index] wrote ${essays.length} essays to ${path.relative(process.cwd(), OUT)}`);
