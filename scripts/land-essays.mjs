#!/usr/bin/env node
/**
 * land-essays.mjs
 *
 * Turns finished drafts in docs/work/essays/<slug>.md into the rewritten-essay
 * files the site reads (client/public/essays/<slug>.json), and puts each slug
 * on the shelf (client/src/lib/shelf.json) when it is not there yet.
 *
 *   node scripts/land-essays.mjs <slug> [<slug> ...]
 *   node scripts/land-essays.mjs --section faith-and-power <new-slug>
 *
 * A draft opens with "# Title", then one italic standfirst line, then the
 * body. The title and standfirst become the file's title and excerpt; the
 * shelf entry's title follows the draft. A slug not yet on the shelf needs
 * --section and joins the end of that section as "pending" (an override makes
 * it public). shelf.json keeps its one-entry-per-line layout.
 *
 * Afterwards run: node scripts/build-essays-index.mjs && node scripts/validate-essays.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRAFTS = path.join(ROOT, "docs/work/essays");
const OUT = path.join(ROOT, "client/public/essays");
const SHELF = path.join(ROOT, "client/src/lib/shelf.json");

const argv = process.argv.slice(2);
let section = null;
const slugs = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--section") section = argv[++i];
  else slugs.push(argv[i]);
}
if (!slugs.length) {
  console.error("usage: node scripts/land-essays.mjs [--section <section>] <slug> ...");
  process.exit(1);
}

function parseDraft(slug) {
  const file = path.join(DRAFTS, `${slug}.md`);
  const lines = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i++;
  if (!lines[i]?.startsWith("# ")) throw new Error(`${slug}: the draft must open with "# Title"`);
  const title = lines[i].slice(2).trim();
  i++;
  while (i < lines.length && !lines[i].trim()) i++;
  const m = /^\*([^*].*?)\*$|^_([^_].*?)_$/.exec(lines[i]?.trim() ?? "");
  if (!m) throw new Error(`${slug}: no italic standfirst line after the title`);
  const excerpt = (m[1] ?? m[2]).trim();
  const body = lines.slice(i + 1).map((l) => l.replace(/\s+$/, "")).join("\n").trim() + "\n";
  return { slug, title, excerpt, body };
}

const shelf = JSON.parse(fs.readFileSync(SHELF, "utf8"));
const bySlug = new Map(shelf.essays.map((e) => [e.slug, e]));
const sectionSlugs = new Set(shelf.sections.map((s) => s.slug));
const updated = new Date().toISOString().slice(0, 10) + "T00:00:00.000Z";
fs.mkdirSync(OUT, { recursive: true });

for (const slug of slugs) {
  const rec = { ...parseDraft(slug), updated };
  fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(rec, null, 2) + "\n");
  const entry = bySlug.get(slug);
  if (entry) {
    entry.title = rec.title;
  } else {
    if (!section || !sectionSlugs.has(section)) throw new Error(`${slug} is not on the shelf: pass --section <one of ${[...sectionSlugs].join(", ")}>`);
    const last = shelf.essays.map((e) => e.section).lastIndexOf(section);
    const added = { slug, section, status: "pending", title: rec.title };
    shelf.essays.splice(last + 1, 0, added);
    bySlug.set(slug, added);
  }
  console.log(`landed ${slug}: ${rec.title} (${rec.body.split(/\s+/).filter(Boolean).length} words)`);
}

// Keep shelf.json's layout: one key per line, one compact entry per array line.
const compact = (v) =>
  Array.isArray(v)
    ? `[${v.map(compact).join(", ")}]`
    : v && typeof v === "object"
      ? `{${Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${compact(x)}`).join(", ")}}`
      : JSON.stringify(v);
const out = ["{"];
const keys = Object.keys(shelf);
keys.forEach((k, n) => {
  const v = shelf[k];
  const end = n < keys.length - 1 ? "," : "";
  if (Array.isArray(v) && v.length && typeof v[0] === "object") {
    out.push(`  ${JSON.stringify(k)}: [`);
    v.forEach((x, m) => out.push(`    ${compact(x)}${m < v.length - 1 ? "," : ""}`));
    out.push(`  ]${end}`);
  } else {
    out.push(`  ${JSON.stringify(k)}: ${compact(v)}${end}`);
  }
});
out.push("}");
fs.writeFileSync(SHELF, out.join("\n") + "\n");
