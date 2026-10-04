#!/usr/bin/env node
/**
 * export-pcn-essays.mjs — move the pastor-trade essays to the PCN handoff.
 *
 * The pastoring and leadership material left this site for the Pastors
 * Connection Network (archive/pcn-handoff/README.md). The essays could not be
 * moved by a file move because they live in the database and the static
 * library; archive/pcn-handoff/pastor-essays-in-database.md lists their slugs.
 * This script does the move at the content level, in one pass, idempotently:
 *
 *   1. Writes one Markdown file per essay, with front matter, into
 *      archive/pcn-handoff/essays/, plus a manifest.json, so PCN can import
 *      them. Bodies come from the static library; an essay the library lacks
 *      is taken from client/src/data/content-data.json; one the code lacks
 *      entirely is listed in the manifest as "needs a database export".
 *   2. Writes content/pcn-moved.json (and a copy at api/pcn-moved.json, since
 *      api/index.ts is self-contained): the one list every surface reads to
 *      stop carrying these essays here — the public essay files, the sitemap,
 *      the prerender, llms-full.txt, and the API's listings, RSS and essay
 *      route.
 *   3. Adds a permanent redirect for each old URL to its PCN address in
 *      vercel.json, so a bookmark or a search result still lands somewhere.
 *      A slug that already has a redirect keeps it: sixty-four of these were
 *      old duplicate URLs already sent to the fuller LiveWell essay that
 *      stays, or to a hub that forwards to PCN, and those earlier decisions
 *      stand. The new redirects only resolve once PCN publishes the same
 *      slugs under PCN_BASE.
 *
 * Nothing is deleted. The source content stays where it was; git history has
 * every version besides.
 *
 *   node scripts/export-pcn-essays.mjs            do it
 *   node scripts/export-pcn-essays.mjs --dry-run  print what would change
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry-run");
const rel = (p) => path.join(ROOT, p);

/** Where PCN will publish the essays. One constant; change it here if PCN's URL shape differs. */
export const PCN_BASE = "https://pastorsconnectionnetwork.com/writing/";
const LIVEWELL = "https://www.livewellbyjamesbell.co/writing/";

const LIST = "archive/pcn-handoff/pastor-essays-in-database.md";
const OUT_DIR = "archive/pcn-handoff/essays";
const MOVED = "content/pcn-moved.json";
const MOVED_API = "api/pcn-moved.json";

const wordCount = (s) => String(s || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const yaml = (s) => JSON.stringify(String(s ?? ""));

export function listedSlugs() {
  const md = readFileSync(rel(LIST), "utf8");
  return [...new Set([...md.matchAll(/`([a-z0-9][a-z0-9-]+)`/g)].map((m) => m[1]))];
}

function sources() {
  const lib = JSON.parse(readFileSync(rel("content/static-library.generated.json"), "utf8"));
  const byLib = new Map(lib.map((r) => [r.slug, r]));
  const cd = JSON.parse(readFileSync(rel("client/src/data/content-data.json"), "utf8"));
  const byCd = new Map((cd.posts || []).map((p) => [p.slug, p]));
  return { byLib, byCd };
}

function frontMatter(rec, source) {
  const format = /^\s*<p>/.test(rec.body || "") ? "html" : "markdown";
  const lines = [
    "---",
    `title: ${yaml(rec.title)}`,
    `slug: ${yaml(rec.slug)}`,
    `date: ${yaml(rec.publishedAt || rec.createdAt || "")}`,
    `pillar: ${yaml(rec.pillar || "")}`,
    `deck: ${yaml(rec.excerpt || "")}`,
    `canonical: ${yaml(PCN_BASE + rec.slug)}`,
    `livewell_url: ${yaml(LIVEWELL + rec.slug)}`,
    `format: ${format}`,
    `words: ${wordCount(rec.body)}`,
    `source: ${yaml(source)}`,
    "---",
    "",
  ];
  return lines.join("\n");
}

export function ensureRedirects(vercel, slugs) {
  const have = new Set((vercel.redirects || []).map((r) => r.source));
  let added = 0;
  for (const slug of slugs) {
    const source = `/writing/${slug}`;
    if (have.has(source)) continue;
    vercel.redirects.push({ source, destination: PCN_BASE + slug, permanent: true });
    added++;
  }
  return added;
}

function main() {
  const slugs = listedSlugs();
  const { byLib, byCd } = sources();
  const manifest = [];
  let written = 0;
  if (!DRY) mkdirSync(rel(OUT_DIR), { recursive: true });
  for (const slug of slugs) {
    const lib = byLib.get(slug);
    const cd = byCd.get(slug);
    const rec = lib || cd;
    const source = lib ? "content/static-library.generated.json" : cd ? "client/src/data/content-data.json" : null;
    if (!rec) {
      manifest.push({ slug, file: null, status: "needs a database export: not in the static library or the seed data", canonical: PCN_BASE + slug, livewell_url: LIVEWELL + slug });
      continue;
    }
    const file = `${OUT_DIR}/${slug}.md`;
    if (!DRY) writeFileSync(rel(file), frontMatter(rec, source) + String(rec.body || "").trim() + "\n");
    written++;
    manifest.push({ slug, file, title: rec.title, pillar: rec.pillar || "", date: rec.publishedAt || rec.createdAt || "", words: wordCount(rec.body), canonical: PCN_BASE + slug, livewell_url: LIVEWELL + slug, status: "exported" });
  }
  const moved = { generated: new Date().toISOString().slice(0, 10), base: PCN_BASE, count: slugs.length, note: "Pastor-trade essays moved to the Pastors Connection Network. Every builder and the API read this list to stop carrying them here; vercel.json redirects each old URL to its PCN address. Regenerate with node scripts/export-pcn-essays.mjs.", slugs };
  const vercel = JSON.parse(readFileSync(rel("vercel.json"), "utf8"));
  const added = ensureRedirects(vercel, slugs);
  if (!DRY) {
    writeFileSync(rel(`${OUT_DIR}/manifest.json`), JSON.stringify({ generated: moved.generated, base: PCN_BASE, count: manifest.length, essays: manifest }, null, 2) + "\n");
    writeFileSync(rel(MOVED), JSON.stringify(moved, null, 2) + "\n");
    writeFileSync(rel(MOVED_API), JSON.stringify(moved, null, 2) + "\n");
    writeFileSync(rel("vercel.json"), JSON.stringify(vercel, null, 4) + "\n");
  }
  const missing = manifest.filter((m) => !m.file).map((m) => m.slug);
  console.log(`[pcn] ${DRY ? "would export" : "exported"} ${written} of ${slugs.length} essays to ${OUT_DIR}/; ${missing.length} need a database export${missing.length ? ": " + missing.join(", ") : ""}`);
  console.log(`[pcn] ${DRY ? "would add" : "added"} ${added} redirect(s); vercel.json now carries ${vercel.redirects.length} redirects`);
  console.log(`[pcn] ${DRY ? "would write" : "wrote"} ${MOVED} and ${MOVED_API} (${slugs.length} slugs)`);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
