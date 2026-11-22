#!/usr/bin/env node
/**
 * build-download-items.mjs: the list of everything a reader can download,
 * as { "<kind>:<slug>": "Title" }, written to shared/download-items.json.
 *
 *   pnpm exec tsx scripts/build-download-items.mjs           write
 *   pnpm exec tsx scripts/build-download-items.mjs --check   fail on drift
 *
 * Both runtimes read it to check a download gift (shared/downloads.ts,
 * checkDownloadGift): an id that is not in this file is refused, so the page
 * can never name a file. It is built from the same sources the Downloads
 * shelf lists (scripts/build-catalogue.mjs), the ebook and booklet data, and
 * the reading paths, so a new study guide or printable joins it by a rebuild.
 * Run with tsx: three sources are TypeScript data modules.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LIBRARIES } from "./build-catalogue.mjs";
import { FREE_EBOOKS } from "../client/src/data/ebooks.ts";
import { BOOKLETS } from "../client/src/data/booklets.ts";
import { asksForGift, downloadIdForHref, suggestedCents } from "../shared/downloads.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = path.join(ROOT, "shared/download-items.json");
const CHECK = process.argv.includes("--check");

const items = new Map();
const problems = [];

function add(href, title) {
  const id = downloadIdForHref(href);
  if (!id) {
    problems.push(`${href} ("${title}") is offered for download and shared/downloads.ts does not know its kind`);
    return;
  }
  if (!items.has(id)) items.set(id, title);
}

for (const b of FREE_EBOOKS) add(b.pdf, b.title);
for (const b of BOOKLETS) add(b.pdf, b.title);

const SEASONS = { thanksgiving: "Thanksgiving week at the family table", advent: "Advent at the family table", "holy-week": "Holy Week at the family table" };

for (const name of ["studyguides", "context", "needs", "plans", "worksheets", "cardSets", "workbooks", "readingPlans", "family"]) {
  for (const item of LIBRARIES[name]()) {
    for (const file of item.files ?? []) {
      const id = downloadIdForHref(file.href);
      // The three seasonal booklets hang off one catalogue row; each is its own download.
      const season = id?.startsWith("family:") ? SEASONS[id.slice(7)] : null;
      if (id?.startsWith("family:") && !season) problems.push(`${file.href}: a family booklet with no name in SEASONS`);
      add(file.href, season ?? item.title);
    }
  }
}

for (const p of JSON.parse(fs.readFileSync(path.join(ROOT, "client/public/reading-paths/index.json"), "utf8")).paths) {
  add(`/downloads/reading-paths/${p.slug}.pdf`, p.title);
}

if (problems.length) {
  for (const p of problems) console.error(`[download-items] ${p}`);
  process.exit(1);
}

const sorted = Object.fromEntries([...items.entries()].sort(([a], [b]) => a.localeCompare(b)));
const json = `${JSON.stringify(sorted, null, 1)}\n`;
const asked = Object.keys(sorted).filter(asksForGift).length;

if (CHECK) {
  const onDisk = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, "utf8") : "";
  if (onDisk !== json) {
    console.error("[download-items] shared/download-items.json is out of date. Run: pnpm exec tsx scripts/build-download-items.mjs");
    process.exit(1);
  }
  console.log(`[download-items] in step (${items.size} downloads, ${asked} carry a suggested gift)`);
} else {
  fs.writeFileSync(OUTPUT, json);
  const total = Object.keys(sorted).reduce((n, id) => n + suggestedCents(id), 0);
  console.log(`[download-items] wrote ${items.size} downloads to shared/download-items.json (${asked} carry a suggested gift; ${(total / 100).toFixed(2)} if every one were given once)`);
}
