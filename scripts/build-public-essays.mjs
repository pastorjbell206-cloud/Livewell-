#!/usr/bin/env node
/**
 * build-public-essays.mjs — ship the static essays as static files.
 *
 * 678 essays live in content/static-library.generated.json and are served in
 * production through the API. That made every essay page wait on a network
 * round trip, and show "This essay didn't load" whenever the function was slow
 * or down — for content that never changes between deploys. This emits:
 *
 *   client/public/essays/<slug>.json   one full record per essay (~12 KB)
 *   client/public/essays/index.json    every record without its body, for the
 *                                      /writing index (title, excerpt, pillar…)
 *
 * The essay page tries /essays/<slug>.json first and falls back to the API for
 * database-only essays; /writing paints from index.json and upgrades to the API
 * list when it arrives. The directory is gitignored and built at deploy, like
 * the share cards. Run: node scripts/build-public-essays.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "content/static-library.generated.json");
const OUT = path.join(ROOT, "client/public/essays");

/** The index record: everything a listing needs, no body. */
export function indexRecord(r) {
  const { body: _body, ...rest } = r;
  return rest;
}

/** Slugs are used as file names; refuse anything that could escape the directory. */
export function safeSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9][a-z0-9-]{0,200}$/.test(slug);
}

export function build(records, outDir = OUT) {
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const index = [];
  let written = 0;
  const skipped = [];
  for (const r of records) {
    if (!r || r.published === false || !safeSlug(r.slug)) { skipped.push(r?.slug ?? "(no slug)"); continue; }
    writeFileSync(path.join(outDir, `${r.slug}.json`), JSON.stringify(r));
    index.push(indexRecord(r));
    written++;
  }
  writeFileSync(path.join(outDir, "index.json"), JSON.stringify(index));
  return { written, indexed: index.length, skipped };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const records = JSON.parse(readFileSync(SRC, "utf8"));
  const { written, indexed, skipped } = build(records);
  console.log(`[essays] wrote ${written} essay files + index.json (${indexed} entries) to client/public/essays/`);
  if (skipped.length) console.log(`[essays] skipped ${skipped.length}: ${skipped.slice(0, 5).join(", ")}${skipped.length > 5 ? "…" : ""}`);
}
