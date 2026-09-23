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
const FEATURED = path.join(ROOT, "client/src/data/featured.json");
const CANON = path.join(ROOT, "client/src/data/canon.json");
const OUT = path.join(ROOT, "client/public/essays");

/** Merge the plain-language search layer (meta description, question and answer) into a record. */
export function withSeo(r, layer) {
  const e = layer && r && layer[r.slug];
  if (!e) return r;
  return { ...r, metaDescription: e.metaDescription, ...(e.qa ? { qa: e.qa } : {}) };
}

/**
 * Three essays to read next, chosen from the essay's own track (and topic
 * where one is filed), newest first. Computed here so the essay page never
 * downloads the index to find them, and never falls back to a pillar default
 * that hands a doubt essay three essays about pastoring.
 */
export function relatedFor(r, all, n = 3) {
  const others = all.filter(o => o && o.slug !== r.slug && o.published !== false && safeSlug(o.slug));
  const byDate = (a, b) => String(b.publishedAt ?? "").localeCompare(String(a.publishedAt ?? ""));
  const sameTopic = r.topic ? others.filter(o => o.topic === r.topic && o.pillar === r.pillar).sort(byDate) : [];
  const sameTrack = others.filter(o => o.pillar === r.pillar && !sameTopic.includes(o)).sort(byDate);
  const picked = [...sameTopic, ...sameTrack].slice(0, n);
  return picked.map(o => ({ slug: o.slug, title: o.title, readTime: o.readTime ?? null, pillar: o.pillar ?? null }));
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

export function build(records, outDir = OUT, layer = {}, featuredSlugs = [], canonSlugs = []) {
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const index = [];
  let written = 0;
  const skipped = [];
  for (const raw of records) {
    if (!raw || raw.published === false || !safeSlug(raw.slug)) { skipped.push(raw?.slug ?? "(no slug)"); continue; }
    const r = withSeo(raw, layer);
    writeFileSync(path.join(outDir, `${r.slug}.json`), JSON.stringify({ ...r, related: relatedFor(r, records) }));
    index.push(indexRecord(r));
    written++;
  }
  writeFileSync(path.join(outDir, "index.json"), JSON.stringify(index));
  // The front page's few cards, so it never downloads the whole index (555 KB)
  // to draw them: the curated essays, then the newest one not among them.
  const bySlug = new Map(index.map(r => [r.slug, r]));
  const featured = featuredSlugs.map(s => bySlug.get(s)).filter(Boolean);
  const chosen = new Set(featured.map(r => r.slug));
  const newest = [...index]
    .filter(r => !chosen.has(r.slug) && r.publishedAt)
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)))[0];
  if (newest) featured.push({ ...newest, newest: true });
  writeFileSync(path.join(outDir, "featured.json"), JSON.stringify(featured));
  // The canon: the twelve essays to read first, in order, for /canon.
  const canon = canonSlugs.map(s => bySlug.get(s)).filter(Boolean);
  writeFileSync(path.join(outDir, "canon.json"), JSON.stringify(canon));
  return { written, indexed: index.length, featured: featured.length, canon: canon.length, skipped };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  // The pastor-trade essays moved to PCN (content/pcn-moved.json) are not
  // written, indexed, featured or related; their URLs redirect (vercel.json).
  const MOVED_FILE = path.join(ROOT, "content/pcn-moved.json");
  const moved = new Set(existsSync(MOVED_FILE) ? JSON.parse(readFileSync(MOVED_FILE, "utf8")).slugs ?? [] : []);
  const records = JSON.parse(readFileSync(SRC, "utf8")).filter((r) => !moved.has(r?.slug));
  const layer = existsSync(SEO) ? JSON.parse(readFileSync(SEO, "utf8")) : {};
  const featuredSlugs = existsSync(FEATURED) ? JSON.parse(readFileSync(FEATURED, "utf8")).flagship ?? [] : [];
  const canonSlugs = existsSync(CANON) ? JSON.parse(readFileSync(CANON, "utf8")).slugs ?? [] : [];
  const { written, indexed, featured, canon, skipped } = build(records, OUT, layer, featuredSlugs, canonSlugs);
  console.log(`[essays] wrote ${written} essay files + index.json (${indexed}) + featured.json (${featured}) + canon.json (${canon}) to client/public/essays/`);
  if (skipped.length) console.log(`[essays] skipped ${skipped.length}: ${skipped.slice(0, 5).join(", ")}${skipped.length > 5 ? "…" : ""}`);
}
