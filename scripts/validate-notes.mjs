#!/usr/bin/env node
/**
 * validate-notes.mjs — CI gate for the short-form Notes library.
 *
 * client/public/notes/notes.json holds James's Facebook-length pieces. Each
 * note must have a unique id, a real date, plain-prose text, a known source,
 * no banned word, no em-dash (the site's content libraries are dash-free),
 * and no exclamation outside a quotation. An empty library is valid: the
 * page shows its empty state until the posts are imported.
 *
 *   node scripts/validate-notes.mjs
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FORBIDDEN } from "./build-seo-layer.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = path.join(ROOT, "client/public/notes/notes.json");

const doc = JSON.parse(readFileSync(FILE, "utf8"));
const notes = Array.isArray(doc.notes) ? doc.notes : null;
const errors = [];
if (!notes) errors.push("notes.json must be { notes: [...] }");

const ids = new Set();
for (const n of notes || []) {
  const tag = n?.id ?? "(no id)";
  if (!n || typeof n !== "object") { errors.push(`${tag}: not an object`); continue; }
  if (typeof n.id !== "string" || !/^[a-z0-9][a-z0-9-]{2,80}$/.test(n.id)) errors.push(`${tag}: id must be a slug`);
  if (ids.has(n.id)) errors.push(`${tag}: duplicate id`);
  ids.add(n.id);
  if (typeof n.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(n.date) || Number.isNaN(Date.parse(n.date))) errors.push(`${tag}: date must be YYYY-MM-DD`);
  if (typeof n.text !== "string" || n.text.trim().length < 20) errors.push(`${tag}: text is missing or too short`);
  if (typeof n.text === "string" && n.text.length > 6000) errors.push(`${tag}: text over 6000 chars; that is an essay, not a note`);
  if (!["facebook", "site"].includes(n.source)) errors.push(`${tag}: source must be "facebook" or "site"`);
  if (n.url !== undefined && !/^https:\/\//.test(String(n.url))) errors.push(`${tag}: url must be https`);
  if (typeof n.text === "string") {
    if (/<[a-z][^>]*>/i.test(n.text)) errors.push(`${tag}: text must be plain prose, not HTML`);
    if (/[—–]/.test(n.text)) errors.push(`${tag}: em-dash in text`);
    if (FORBIDDEN.test(n.text)) errors.push(`${tag}: forbidden word in text`);
    if (/!/.test(n.text.replace(/"[^"]*"|“[^”]*”/g, ""))) errors.push(`${tag}: exclamation outside a quotation`);
  }
}

if (errors.length) {
  console.error(`[validate-notes] ${errors.length} error(s):\n  ${errors.slice(0, 30).join("\n  ")}`);
  process.exit(1);
}
console.log(`[validate-notes] ${notes.length} note(s), all clean.`);
