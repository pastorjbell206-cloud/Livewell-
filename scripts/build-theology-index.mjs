#!/usr/bin/env node
/**
 * build-theology-index.mjs — generates client/public/theology/index.json,
 * the manifest for the 50 contested-doctrine pages at /theology/doctrine/:slug.
 *
 * The doctrine library was the largest content family with no manifest, which
 * kept it out of both the sitemap and the build-time meta system (board audit
 * P9). Each entry carries slug/title/subtitle plus the doctrine's central
 * question — the question feeds the QAPage structured data in
 * scripts/prerender-heads.mjs.
 *
 * Run after adding or editing a doctrine JSON:  pnpm theology-index
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "../client/public/theology");
const OUT = path.join(DIR, "index.json");

const docs = [];
for (const file of fs.readdirSync(DIR).sort()) {
  if (!file.endsWith(".json") || file === "index.json") continue;
  const full = path.join(DIR, file);
  let doc;
  try {
    doc = JSON.parse(fs.readFileSync(full, "utf8"));
  } catch (e) {
    console.error(`[theology-index] ${file}: unparseable JSON — ${e.message}`);
    process.exitCode = 1;
    continue;
  }
  // The theology dir also holds support-data libraries (glossary, timelines,
  // church-history sets). Doctrine docs are the ones with slug + title;
  // everything else is skipped silently by design.
  if (!doc.slug || !doc.title) continue;
  docs.push({
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle || "",
    question: doc.question || "",
  });
}

fs.writeFileSync(OUT, JSON.stringify({ docs }, null, 2) + "\n");
console.log(`[theology-index] wrote ${docs.length} doctrine entries to ${path.relative(process.cwd(), OUT)}`);
