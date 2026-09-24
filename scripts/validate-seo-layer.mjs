#!/usr/bin/env node
/**
 * validate-seo-layer.mjs — CI gate for the plain-language search layer.
 *
 * Every published library essay has a description; each is 70 to 155
 * characters, ends a sentence, carries no em-dash and no forbidden word;
 * question data is a real question with a non-empty answer; and hand
 * overrides name essays that exist. Fails the build on any miss, and fails
 * if the generated file is stale against the overrides or the library.
 */
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildLayer, FORBIDDEN, MIN_LEN, MAX_LEN } from "./build-seo-layer.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = p => JSON.parse(readFileSync(path.join(ROOT, p), "utf8"));

const records = read("content/static-library.generated.json");
const overrides = existsSync(path.join(ROOT, "content/seo-overrides.json")) ? read("content/seo-overrides.json") : {};
const layer = read("content/seo-layer.generated.json");

const errors = [];
const published = records.filter(r => r && r.slug && r.published !== false);

for (const slug of Object.keys(overrides)) {
  if (!records.some(r => r.slug === slug)) errors.push(`override for unknown essay: ${slug}`);
}

for (const r of published) {
  const e = layer[r.slug];
  if (!e) { errors.push(`${r.slug}: no entry`); continue; }
  const d = e.metaDescription || "";
  if (d.length < MIN_LEN || d.length > MAX_LEN) errors.push(`${r.slug}: description is ${d.length} chars (${MIN_LEN}-${MAX_LEN})`);
  if (!/[.!?]['"”’)]?$/.test(d)) errors.push(`${r.slug}: description does not end a sentence`);
  if (/[—–]/.test(d)) errors.push(`${r.slug}: em-dash in description`);
  if (FORBIDDEN.test(d)) errors.push(`${r.slug}: forbidden word in description`);
  if (/!/.test(d.replace(/"[^"]*"|“[^”]*”/g, ""))) errors.push(`${r.slug}: exclamation outside a quotation`);
  if ((d.match(/"/g) || []).length % 2 === 1) errors.push(`${r.slug}: unbalanced quotation mark`);
  if (e.qa) {
    if (!/\?$/.test(e.qa.question || "")) errors.push(`${r.slug}: question does not end with ?`);
    if (!(e.qa.answer || "").trim()) errors.push(`${r.slug}: empty answer`);
    if ((e.qa.answer || "").length > 700) errors.push(`${r.slug}: answer over 700 chars`);
  }
}

// Staleness: regenerate in memory and compare.
const fresh = buildLayer(records, overrides).layer;
if (JSON.stringify(fresh) !== JSON.stringify(layer)) {
  errors.push("content/seo-layer.generated.json is stale: run `node scripts/build-seo-layer.mjs`");
}

if (errors.length) {
  console.error(`[validate-seo-layer] ${errors.length} error(s):\n  ${errors.slice(0, 30).join("\n  ")}`);
  process.exit(1);
}
console.log(`[validate-seo-layer] ${published.length} essays, ${Object.keys(overrides).length} hand-written, all clean.`);
