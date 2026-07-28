#!/usr/bin/env node
/**
 * audit-canonicals.mjs
 *
 * Every URL in sitemap.xml must serve exactly one canonical tag, and that
 * canonical must point at itself. A canonical that points somewhere else tells
 * Google "index the other page, not this one" — on a site with 1,700+ URLs a
 * single wrong default would silently delist the whole library. This is the
 * acceptance test for that.
 *
 * Two modes:
 *
 *   node scripts/audit-canonicals.mjs
 *     Audits the BUILT OUTPUT in dist/public. For every sitemap URL it opens
 *     the prerendered dist/public/<route>/index.html — byte for byte what a
 *     crawler receives, since Vercel serves that file directly. Requires
 *     `pnpm build && node scripts/prerender-heads.mjs` to have run.
 *
 *   node scripts/audit-canonicals.mjs --live [https://www.livewellbyjamesbell.co]
 *     Fetches each URL over the network instead. Slower, needs outbound
 *     access, and is the stronger check because it also catches host
 *     misconfiguration and redirects. Use it in CI against a Vercel preview.
 *
 * Flags:
 *   --limit N   audit only the first N URLs (smoke check)
 *   --quiet     summary only, no per-failure lines
 *
 * Exit code is non-zero if anything fails, so it can gate a build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(REPO_ROOT, "dist/public");
// generate-sitemap.mjs writes to client/public/sitemap.xml and `vite build`
// copies it into dist. Read whichever exists, preferring the source copy, so
// the audit works whether the sitemap was regenerated before or after the
// build — running it after leaves dist holding the previous run's file.
const SITEMAP_CANDIDATES = [
  path.join(REPO_ROOT, "client/public/sitemap.xml"),
  path.join(DIST_DIR, "sitemap.xml"),
];
const SITEMAP = SITEMAP_CANDIDATES.find((p) => fs.existsSync(p));
const DEFAULT_ORIGIN = "https://www.livewellbyjamesbell.co";

const argv = process.argv.slice(2);
const LIVE = argv.includes("--live");
const QUIET = argv.includes("--quiet");
const limitIdx = argv.indexOf("--limit");
const LIMIT = limitIdx >= 0 ? Number(argv[limitIdx + 1]) : Infinity;
const ORIGIN = argv.find((a) => a.startsWith("http")) || DEFAULT_ORIGIN;

if (!SITEMAP) {
  console.error("✗ No sitemap.xml found. Looked in:");
  for (const p of SITEMAP_CANDIDATES) console.error(`    ${path.relative(REPO_ROOT, p)}`);
  console.error("  Run: pnpm run sitemap");
  process.exit(1);
}

const xml = fs.readFileSync(SITEMAP, "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (urls.length === 0) {
  console.error("✗ sitemap.xml contains no <loc> entries");
  process.exit(1);
}

/** Strip a trailing slash so "/books/" and "/books" compare equal. */
function normalize(u) {
  try {
    const parsed = new URL(u);
    let p = parsed.pathname.replace(/\/+$/, "");
    return `${parsed.protocol}//${parsed.host}${p}`;
  } catch {
    return u.replace(/\/+$/, "");
  }
}

/** Every <link rel="canonical"> in the document, in order. */
function canonicalsIn(html) {
  const out = [];
  const re = /<link\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    if (!/rel\s*=\s*["']?canonical["']?/i.test(tag)) continue;
    const href = tag.match(/href\s*=\s*["']([^"']+)["']/i);
    if (href) out.push(href[1].trim());
  }
  return out;
}

/** The og:url the same page advertises, which should agree with the canonical. */
function ogUrlIn(html) {
  const m = html.match(
    /<meta\b[^>]*property\s*=\s*["']og:url["'][^>]*content\s*=\s*["']([^"']+)["'][^>]*>/i,
  ) ||
    html.match(
      /<meta\b[^>]*content\s*=\s*["']([^"']+)["'][^>]*property\s*=\s*["']og:url["'][^>]*>/i,
    );
  return m ? m[1].trim() : null;
}

/** meta robots, so a stray noindex on a sitemap URL is caught too. */
function robotsIn(html) {
  const m = html.match(
    /<meta\b[^>]*name\s*=\s*["']robots["'][^>]*content\s*=\s*["']([^"']+)["'][^>]*>/i,
  );
  return m ? m[1].trim().toLowerCase() : null;
}

function distFileFor(url) {
  const { pathname } = new URL(url);
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  return clean === ""
    ? path.join(DIST_DIR, "index.html")
    : path.join(DIST_DIR, clean, "index.html");
}

async function loadLive(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "livewell-canonical-audit" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

const targets = urls.slice(0, LIMIT === LIMIT ? LIMIT : undefined);

const failures = [];
const missingFile = [];
let checked = 0;

for (const url of targets) {
  let html;
  if (LIVE) {
    const fetchUrl = url.startsWith(ORIGIN)
      ? url
      : ORIGIN + new URL(url).pathname;
    try {
      html = await loadLive(fetchUrl);
    } catch (err) {
      failures.push({ url, reason: `fetch failed: ${err.message}` });
      continue;
    }
  } else {
    const file = distFileFor(url);
    if (!fs.existsSync(file)) {
      // Not prerendered. The SPA still serves it, but a crawler that does not
      // execute JS sees the shell — worth reporting, not the same as a wrong
      // canonical, so it is counted separately.
      missingFile.push({ url, file: path.relative(REPO_ROOT, file) });
      continue;
    }
    html = fs.readFileSync(file, "utf8");
  }

  checked++;
  const found = canonicalsIn(html);
  const want = normalize(url);

  if (found.length === 0) {
    failures.push({ url, reason: "no canonical tag" });
    continue;
  }
  if (found.length > 1) {
    failures.push({
      url,
      reason: `${found.length} canonical tags: ${found.join(" , ")}`,
    });
    continue;
  }
  if (normalize(found[0]) !== want) {
    failures.push({ url, reason: `canonical points to ${found[0]}` });
    continue;
  }

  const og = ogUrlIn(html);
  if (og && normalize(og) !== want) {
    failures.push({ url, reason: `og:url disagrees with canonical (${og})` });
    continue;
  }

  const robots = robotsIn(html);
  if (robots && robots.includes("noindex")) {
    failures.push({ url, reason: `meta robots ${robots} on a sitemap URL` });
  }
}

const mode = LIVE ? `live fetch against ${ORIGIN}` : "built output in dist/public";
console.log("");
console.log(`Canonical audit — ${mode}`);
console.log(`  sitemap           ${path.relative(REPO_ROOT, SITEMAP)}`);
console.log(`  sitemap URLs      ${urls.length}`);
if (targets.length !== urls.length) console.log(`  audited           ${targets.length} (--limit)`);
console.log(`  pages checked     ${checked}`);
if (!LIVE) console.log(`  not prerendered   ${missingFile.length}`);
console.log(`  failures          ${failures.length}`);
console.log("");

if (missingFile.length && !QUIET && !LIVE) {
  console.log(`Not prerendered (crawler sees the SPA shell) — ${missingFile.length}:`);
  for (const m of missingFile.slice(0, 40)) console.log(`  ${m.url}`);
  if (missingFile.length > 40) console.log(`  … and ${missingFile.length - 40} more`);
  console.log("");
}

if (failures.length) {
  if (!QUIET) {
    console.log(`Failures — ${failures.length}:`);
    for (const f of failures.slice(0, 60)) console.log(`  ${f.url}\n    ${f.reason}`);
    if (failures.length > 60) console.log(`  … and ${failures.length - 60} more`);
    console.log("");
  }
  console.log("✗ Canonical audit FAILED");
  process.exit(1);
}

console.log("✓ Every audited page canonicalises to itself, exactly once.");
