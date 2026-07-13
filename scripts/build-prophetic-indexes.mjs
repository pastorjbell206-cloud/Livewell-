#!/usr/bin/env node
/**
 * build-prophetic-indexes.mjs — writes client/public/justice/topics-index.json
 * and client/public/disruption/topics-index.json, the manifests that let
 * prerender-heads.mjs emit a real per-topic <head> and crawlable body for each
 * Prophetic Justice / Prophetic Disruption topic. Without them, /justice/topic/:slug
 * and /disruption/topic/:slug served the homepage head to scrapers.
 *
 * Source of truth is client/src/lib/prophetic.ts (the DISRUPTION and JUSTICE
 * topic arrays). Only topics marked `ready: true` are indexed, so a drafted
 * topic never gets a prerendered head for a page that is not live yet.
 *
 *   node scripts/build-prophetic-indexes.mjs
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "client/src/lib/prophetic.ts");

const ts = fs.readFileSync(SRC, "utf8");

// The file defines DISRUPTION first, then JUSTICE. Split on the JUSTICE export
// so each half's topic objects are attributed to the right section.
const jIdx = ts.indexOf("export const JUSTICE");
if (jIdx < 0) {
  console.error("[build-prophetic-indexes] could not find JUSTICE export in prophetic.ts");
  process.exit(1);
}
const sections = { disruption: ts.slice(0, jIdx), justice: ts.slice(jIdx) };

// One topic object per line: { slug, group, title, blurb, ready }. Fields are
// skipped with [^}]*? so the regex stays inside a single object.
const TOPIC = /\{\s*slug:\s*"([^"]+)"[^}]*?title:\s*"([^"]+)"[^}]*?blurb:\s*"((?:[^"\\]|\\.)*)"[^}]*?ready:\s*(true|false)\s*\}/g;

for (const [name, chunk] of Object.entries(sections)) {
  const topics = [];
  for (const m of chunk.matchAll(TOPIC)) {
    if (m[4] !== "true") continue;
    topics.push({ slug: m[1], title: m[2], blurb: m[3].replace(/\\"/g, '"') });
  }
  const out = join(ROOT, "client/public", name, "topics-index.json");
  fs.writeFileSync(out, JSON.stringify({ topics }, null, 2) + "\n");
  console.log(`[build-prophetic-indexes] wrote ${topics.length} ${name} topic(s) to ${out}`);
}
