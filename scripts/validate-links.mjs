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
 * the served static library (static-library.generated.json), the essay shelf
 * (client/src/lib/shelf.json), the books index, and the redirect sources in
 * vercel.json (a /writing/<slug> the redirect map
 * resolves is not dead). Parametric refs (`:slug`, template literals) are
 * ignored — only literal, lowercase, hardcoded slugs are checked.
 *
 * It also holds the essay shelf (client/src/lib/shelf.json): a literal
 * /writing/<slug> link on a live page must reach an essay that is public
 * (a live shelf essay, or a pending one whose rewrite exists), directly or
 * through its vercel.json redirect. Otherwise the reader lands on a retired
 * notice. A file that consults the shelf (imports lib/shelf) is trusted to
 * gate its own links and is only counted; page files App.tsx never routes
 * are skipped, since no reader reaches them.
 *
 * Run:  node scripts/validate-links.mjs   (CI gate — exits 1 on any dead link)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { loadEssayShelf } from "./lib/shelf.mjs";

function loadJSON(p) {
  try { return JSON.parse(readFileSync(p, "utf8")); } catch { return null; }
}

const essaySlugs = new Set();
const bookSlugs = new Set();

const cd = loadJSON("client/src/data/content-data.json");
for (const p of (cd?.posts || cd || [])) if (p?.slug) essaySlugs.add(p.slug);

const lib = loadJSON("content/static-library.generated.json");
for (const r of (Array.isArray(lib) ? lib : [])) if (r?.slug) essaySlugs.add(r.slug);

// The essay shelf (client/src/lib/shelf.json) names real essays, most of them
// database rows the two files above never carry (James's Substack chapters).
// Every shelf URL resolves: the essay itself, or the notice for one in revision.
const shelf = loadJSON("client/src/lib/shelf.json");
for (const e of (shelf?.essays || [])) if (e?.slug) essaySlugs.add(e.slug);

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

// ── The essay shelf ───────────────────────────────────────────────────────
const SHELF = loadEssayShelf();
const writingRedirect = new Map();
for (const r of (vc?.redirects || [])) {
  const m = (r?.source || "").match(/^\/writing\/([a-z0-9-]+)$/);
  if (m) writingRedirect.set(m[1], r.destination || "");
}
/** Does a literal /writing/<slug> link reach a public essay (or a non-essay page)? */
function reachesPublic(slug) {
  if (SHELF.visibility(slug) === "shelf") return true;
  const dest = writingRedirect.get(slug);
  if (dest === undefined) return false;
  const m = dest.match(/^\/writing\/([a-z0-9-]+)$/);
  return m ? SHELF.visibility(m[1]) === "shelf" : true;
}
const APP = readFileSync("client/src/App.tsx", "utf8");
const ROUTED = new Set([...APP.matchAll(/import\("\.\/([^"]+)"\)/g)].map((m) => `client/src/${m[1]}`));
const offShelf = new Map(); // "/writing/x" -> Set(files)
let gatedOffShelf = 0;

function scan(file) {
  const t = readFileSync(file, "utf8");
  const isTest = /\.test\.tsx?$/.test(file);
  const unrouted = file.startsWith("client/src/pages/") && !ROUTED.has(file.replace(/\.tsx?$/, ""));
  const gated = /from "(?:@\/lib|\.)\/shelf"/.test(t);
  for (const m of t.matchAll(/\/writing\/([a-z0-9-]{4,})/g)) {
    if (!essaySlugs.has(m[1])) record("/writing/" + m[1], file);
    else if (!isTest && !unrouted && !reachesPublic(m[1])) {
      if (gated) gatedOffShelf++;
      else {
        if (!offShelf.has("/writing/" + m[1])) offShelf.set("/writing/" + m[1], new Set());
        offShelf.get("/writing/" + m[1]).add(file);
      }
    }
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

if (offShelf.size) {
  console.error(`\nLinks to essays off the public shelf: ${offShelf.size}\n`);
  for (const [href, files] of offShelf) {
    console.error(`  ${href}  <- ${[...files].map((f) => f.replace("client/src/", "")).join(", ")}`);
  }
  console.error("\nEach lands a reader on a retired or pending notice. Gate the link through");
  console.error("isPublicEssay / isPublicEssayHref (client/src/lib/shelf.ts), or point it at a");
  console.error("live shelf essay, a /writing section, or another live page.\n");
}

if (offShelf.size && !dead.size) process.exit(1);

if (dead.size) {
  console.error(`\nDead content links: ${dead.size}\n`);
  for (const [href, files] of dead) {
    console.error(`  ${href}  <- ${[...files].map((f) => f.replace("client/src/", "")).join(", ")}`);
  }
  console.error("\nEach points at an essay/book slug that does not exist. Remap to a real");
  console.error("slug or a real hub (a reader hitting a 404 from an internal link is a bug).\n");
  process.exit(1);
}

console.log(
  `Content links: clean (${essaySlugs.size} essay slugs, ${bookSlugs.size} book slugs checked; ` +
    `${gatedOffShelf} off-shelf links sit behind a shelf check).`
);
