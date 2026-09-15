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
const SEO = path.join(ROOT, "content/seo-layer.generated.json");
const OUT = path.join(ROOT, "client/public/essays");

/** Merge the plain-language search layer (meta description, question and answer) into a record. */
export function withSeo(r, layer) {
  const e = layer && r && layer[r.slug];
  if (!e) return r;
  return { ...r, metaDescription: e.metaDescription, ...(e.qa ? { qa: e.qa } : {}) };
}

/** The index record: everything a listing needs, no body. */
export function indexRecord(r) {
  const { body: _body, ...rest } = r;
  return rest;
}

/** Slugs are used as file names; refuse anything that could escape the directory. */
export function safeSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9][a-z0-9-]{0,200}$/.test(slug);
}

export function build(records, outDir = OUT, layer = {}) {
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const index = [];
  let written = 0;
  const skipped = [];
  for (const raw of records) {
    if (!raw || raw.published === false || !safeSlug(raw.slug)) { skipped.push(raw?.slug ?? "(no slug)"); continue; }
    const r = withSeo(raw, layer);
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
  const layer = existsSync(SEO) ? JSON.parse(readFileSync(SEO, "utf8")) : {};
  const { written, indexed, skipped } = build(records, OUT, layer);
  console.log(`[essays] wrote ${written} essay files + index.json (${indexed} entries) to client/public/essays/`);
  if (skipped.length) console.log(`[essays] skipped ${skipped.length}: ${skipped.slice(0, 5).join(", ")}${skipped.length > 5 ? "…" : ""}`);
}
