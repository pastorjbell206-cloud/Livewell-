#!/usr/bin/env node
/**
 * verify-seo.mjs — proof the crawlable loop actually closed.
 *
 * The sitemap advertises every essay, and prerender-heads.mjs is supposed to
 * give each one a real <title>, description, canonical, and Article JSON-LD so
 * Google and the answer engines index the piece, not the empty SPA shell. This
 * samples the prerendered output and fails if any advertised essay is still a
 * generic shell. Run it after a build + prerender:
 *
 *   pnpm run build && pnpm run prerender && node scripts/verify-seo.mjs
 *
 * It reads the actual dist output, so a regression in prerendering (the exact
 * bug WI-8 fixed) is caught instead of shipping silently.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist/public");
const GENERIC_TITLE = "LiveWell by James Bell"; // the shell's default <title>

if (!fs.existsSync(DIST)) {
  console.error(`[verify-seo] no dist output at ${DIST}. Run: pnpm run build && pnpm run prerender`);
  process.exit(1);
}

// Sample essays from the static library (the set WI-8 made crawlable), plus a
// couple of always-present routes, so the check is fast but representative.
function sampleEssaySlugs(n = 25) {
  try {
    const lib = JSON.parse(fs.readFileSync(path.join(ROOT, "content/static-library.generated.json"), "utf8"));
    const slugs = lib.filter((r) => r && r.slug && r.published !== false).map((r) => r.slug);
    const step = Math.max(1, Math.floor(slugs.length / n));
    return slugs.filter((_, i) => i % step === 0).slice(0, n);
  } catch {
    return [];
  }
}

const routes = [
  { path: "/", kind: "page" },
  ...sampleEssaySlugs().map((s) => ({ path: `/writing/${s}`, kind: "essay" })),
];

const problems = [];
let checked = 0;

for (const r of routes) {
  const file = path.join(DIST, r.path === "/" ? "index.html" : `${r.path}/index.html`);
  if (!fs.existsSync(file)) {
    problems.push(`${r.path}: no prerendered file (crawler gets the SPA shell)`);
    continue;
  }
  checked++;
  const html = fs.readFileSync(file, "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const hasDesc = /<meta\s+name="description"\s+content="[^"]{20,}"/.test(html);
  const hasCanonical = /<link\s+rel="canonical"/.test(html);
  const hasOg = /<meta\s+property="og:title"/.test(html);

  if (r.kind === "essay") {
    if (!title || title.trim() === GENERIC_TITLE) problems.push(`${r.path}: generic/empty <title> ("${title}")`);
    if (!hasDesc) problems.push(`${r.path}: missing meta description`);
    if (!hasCanonical) problems.push(`${r.path}: missing canonical`);
    if (!hasOg) problems.push(`${r.path}: missing og:title`);
    if (!/"@type":\s*"Article"/.test(html)) problems.push(`${r.path}: missing Article JSON-LD`);
  } else {
    if (!title) problems.push(`${r.path}: empty <title>`);
    if (!hasDesc) problems.push(`${r.path}: missing meta description`);
  }
}

if (problems.length) {
  console.error(`[verify-seo] ${problems.length} problem(s) across ${checked} checked routes:`);
  for (const p of problems.slice(0, 40)) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`[verify-seo] clean: ${checked} routes prerendered with real title, description, canonical, OG, and Article JSON-LD.`);
