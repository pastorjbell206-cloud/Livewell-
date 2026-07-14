#!/usr/bin/env node
/**
 * validate-links.mjs — the dead-content-link guard.
 *
 * A link audit against the real-URL set found 12 hardcoded /writing/ links
 * pointing at essays that never existed — most on the apologetics FAQ, the worst
 * place for a skeptic to hit a 404. They were fixed; this keeps them fixed.
 *
 * It checks every hardcoded /writing/<slug> and /read/<slug> reference in the
 * client source against the real content: the client seed (content-data.json),
 * the served static library (static-library.generated.json), the books index,
 * and the redirect sources in vercel.json (a /writing/<slug> the redirect map
 * resolves is not dead). Parametric refs (`:slug`, template literals) are
 * ignored — only literal, lowercase, hardcoded slugs are checked.
 *
 * Run:  node scripts/validate-links.mjs   (CI gate — exits 1 on any dead link)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function loadJSON(p) {
  try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; }
}

const essaySlugs = new Set();
const bookSlugs = new Set();

const cd = loadJSON("client/src/data/content-data.json");
for (const p of (cd?.posts || cd || [])) if (p?.slug) essaySlugs.add(p.slug);

const lib = loadJSON("content/static-library.generated.json");
for (const r of (Array.isArray(lib) ? lib : [])) if (r?.slug) essaySlugs.add(r.slug);

const books = loadJSON("client/public/books/index.json");
for (const b of (Array.isArray(books) ? books : books?.books || [])) if (b?.slug) bookSlugs.add(b.slug);

// Redirect sources resolve too: /articles/:slug etc. are parametric (skip), but
// a literal legacy /writing/<slug> or /read/<slug> source is a real destination.
const vc = loadJSON("vercel.json");
for (const r of (vc?.redirects || [])) {
  const s = r?.source || "";
  if (/^\/writing\/[a-z0-9-]+$/.test(s)) essaySlugs.add(s.slice("/writing/".length));
  if (/^\/read\/[a-z0-9-]+$/.test(s)) bookSlugs.add(s.slice("/read/".length));
}

const dead = new Map(); // "/writing/x" -> Set(files)
function record(href, file) {
  if (!dead.has(href)) dead.set(href, new Set());
  dead.get(href).add(file);
}

function scan(file) {
  const t = readFileSync(file, "utf8");
  for (const m of t.matchAll(/\/writing\/([a-z0-9-]{4,})/g)) {
    if (!essaySlugs.has(m[1])) record("/writing/" + m[1], file);
  }
  for (const m of t.matchAll(/\/read\/([a-z0-9-]{4,})/g)) {
    // a /read/ slug may be a book OR a readable essay volume
    if (!bookSlugs.has(m[1]) && !essaySlugs.has(m[1])) record("/read/" + m[1], file);
  }
}

function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) { if (!/node_modules|\.git|dist/.test(p)) walk(p); }
    else if (/\.tsx?$/.test(f)) scan(p);
  }
}

walk("client/src");

if (dead.size) {
  console.error(`\nDead content links: ${dead.size}\n`);
  for (const [href, files] of dead) {
    console.error(`  ${href}  <- ${[...files].map((f) => f.replace("client/src/", "")).join(", ")}`);
  }
  console.error("\nEach points at an essay/book slug that does not exist. Remap to a real");
  console.error("slug or a real hub (a reader hitting a 404 from an internal link is a bug).\n");
  process.exit(1);
}

console.log(`Content links: clean (${essaySlugs.size} essay slugs, ${bookSlugs.size} book slugs checked).`);
