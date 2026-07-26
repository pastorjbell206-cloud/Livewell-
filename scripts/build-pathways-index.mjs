#!/usr/bin/env node
/**
 * build-pathways-index.mjs — regenerate client/public/pathways/index.json from
 * the pathway files themselves.
 *
 * Two jobs:
 *   1. Kill the drift. The manifest used to be hand-maintained, so adding a
 *      pathway file meant remembering to edit a second file. Now the files are
 *      the source of truth and this rebuilds the list, alphabetically.
 *   2. Carry the step slugs. Each entry gains `steps`: the slugs of the
 *      readable items on that route (essays, nation pieces, study guides,
 *      books). The pathways index uses them to show a reader how far through a
 *      route they already are, using only the device-local read memory. No
 *      progress data ever leaves the browser.
 *
 * Run: node scripts/build-pathways-index.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.resolve(process.cwd(), "client/public/pathways");
const OUT = path.join(DIR, "index.json");

/** The last path segment is the slug the read-memory records. */
const slugOf = (href) => String(href || "").split("?")[0].split("/").filter(Boolean).pop() || "";

const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && f !== "index.json")
  .sort();

const entries = [];
for (const file of files) {
  let doc;
  try {
    doc = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"));
  } catch (e) {
    console.error(`[pathways-index] skipping ${file}: ${e.message}`);
    continue;
  }
  if (!doc || !doc.slug || !doc.title) {
    console.error(`[pathways-index] skipping ${file}: missing slug/title`);
    continue;
  }
  const steps = [];
  for (const m of doc.movements || []) {
    for (const it of m.items || []) {
      const s = slugOf(it.href);
      // Skip bare hub links (/books, /pathways) — they are not a step a reader
      // finishes, so counting them would make a route look unfinishable.
      const depth = String(it.href || "").split("?")[0].split("/").filter(Boolean).length;
      if (s && depth > 1 && !steps.includes(s)) steps.push(s);
    }
  }
  entries.push({
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle || "",
    forWhom: doc.forWhom || "",
    steps,
  });
}

fs.writeFileSync(OUT, JSON.stringify(entries, null, 2) + "\n");
console.log(
  `[pathways-index] wrote ${entries.length} pathway(s) to ${path.relative(process.cwd(), OUT)} ` +
    `(${entries.reduce((n, e) => n + e.steps.length, 0)} steps total)`
);
