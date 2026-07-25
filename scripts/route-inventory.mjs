#!/usr/bin/env node
/**
 * route-inventory.mjs — the current route map, derived rather than remembered.
 *
 * IA work keeps starting from a hand-written map that is stale before it is
 * finished (docs/IA-MAP.md inventoried 153 routes; the site now has ~260). This
 * reads the route table and every internal link in the client, and reports:
 *
 *   - every route, grouped by area
 *   - ORPHANS: routes nothing links to (reachable only by typing the URL)
 *   - DEAD ENDS: pages that link nowhere onward
 *
 * Read-only. Writes nothing. Run:  node scripts/route-inventory.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Every path="..." in the route table. */
function routes() {
  const src = readFileSync(path.join(root, "client/src/App.tsx"), "utf8");
  return [...src.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
}

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = path.join(dir, e);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|mjs)$/.test(full)) out.push(full);
  }
  return out;
}

/** Every internal link target that appears anywhere in the client or nav data. */
function linkTargets() {
  const targets = new Set();
  for (const f of walk(path.join(root, "client/src"))) {
    const src = readFileSync(f, "utf8");
    for (const m of src.matchAll(/(?:href|to)=["'`](\/[^"'`?#${]*)/g)) targets.add(m[1]);
    for (const m of src.matchAll(/href:\s*["'`](\/[^"'`?#${]*)/g)) targets.add(m[1]);
    for (const m of src.matchAll(/(?:setLocation|navigate)\(["'`](\/[^"'`?#${]*)/g)) targets.add(m[1]);
    for (const m of src.matchAll(/(?:indexHref|ctaHref|backHref):\s*["'`](\/[^"'`?#${]*)/g)) targets.add(m[1]);
    // Template-literal links — href={`/how-tos/${slug}`} and buildHref: (s) => `/x/${s}`.
    // Without these, every dynamic route looks like an orphan. Record the static
    // prefix up to the first interpolation.
    for (const m of src.matchAll(/[`"'](\/[a-z0-9/-]*\/)\$\{/gi)) targets.add(m[1]);
  }
  return targets;
}

/** A dynamic route (/x/:slug) counts as linked if anything points into /x/. */
function isReachable(route, targets) {
  if (targets.has(route)) return true;
  const base = route.includes(":") ? route.slice(0, route.indexOf(":")) : null;
  if (base) {
    // A template-literal link records the static prefix exactly (`/how-tos/`),
    // so an equal match counts — excluding it made every dynamic route look
    // orphaned. A longer match (a hardcoded child URL) counts too.
    for (const t of targets) if (t === base || t.startsWith(base)) return true;
  }
  return false;
}

function area(route) {
  const seg = route.split("/")[1] || "(home)";
  return seg.startsWith(":") ? "(dynamic)" : seg;
}

const all = routes();
const targets = linkTargets();
const admin = (r) => r.startsWith("/admin");

const publicRoutes = all.filter((r) => !admin(r));
const TRANSACTIONAL = /\/thank-you$|^\/404$|\/success$/;

/**
 * Reachable, but not by a literal this script can resolve. Each entry is a
 * limitation of static analysis, not a finding — recorded so the orphan count
 * stays honest rather than alarming.
 */
const KNOWN_REACHABLE = new Map([
  ["/disruption/topic/:slug", "linked from PropheticHub via `${config.base}/topic/${slug}` — variable prefix"],
  ["/justice/topic/:slug", "same PropheticHub template, variable prefix"],
  ["/quiz", "a vercel.json redirect source (301 → /tools/theology-quiz), never meant to be linked"],
  ["/the-pastoral-angle", "linked from /pillars via ROUTE_FOR_PILLAR[p.slug] — variable-indexed lookup"],
  ["/disruption/posture", "linked from PropheticHub via `${config.base}/posture`"],
  ["/justice/posture", "same PropheticHub template"],
]);
const orphans = publicRoutes.filter(
  (r) => !isReachable(r, targets) && !TRANSACTIONAL.test(r) && !KNOWN_REACHABLE.has(r),
);
const transactional = publicRoutes.filter((r) => TRANSACTIONAL.test(r));

const byArea = new Map();
for (const r of publicRoutes) {
  const a = area(r);
  if (!byArea.has(a)) byArea.set(a, []);
  byArea.get(a).push(r);
}

console.log(`ROUTE INVENTORY — generated ${new Date().toISOString().slice(0, 10)}\n`);
console.log(`  total routes      ${all.length}`);
console.log(`  public            ${publicRoutes.length}`);
console.log(`  admin             ${all.length - publicRoutes.length}`);
console.log(`  distinct areas    ${byArea.size}`);
console.log(`  post-transaction  ${transactional.length}  (thank-you / success / 404 — reached by redirect, not link)`);
console.log(`  known-reachable   ${KNOWN_REACHABLE.size}  (linked via a variable or a redirect — see KNOWN_REACHABLE)`);
console.log(`  UNRESOLVED        ${orphans.length}  (no literal link found — verify by hand)\n`);

console.log("BY AREA (count — largest first)\n");
for (const [a, rs] of [...byArea.entries()].sort((x, y) => y[1].length - x[1].length)) {
  console.log(`  ${String(rs.length).padStart(3)}  /${a}`);
}

console.log("\nUNRESOLVED — no literal link found\n");
console.log("  A static scan cannot prove a route is unreachable: links built from a");
console.log("  variable (ROUTE_FOR_PILLAR[slug], `${config.base}/posture`) are invisible");
console.log("  to it. Treat this as a list to check, not a list of defects.\n");
for (const r of orphans.sort()) console.log(`  ${r}`);

console.log("\nKNOWN-REACHABLE EXCEPTIONS (not orphans)\n");
for (const [r, why] of KNOWN_REACHABLE) console.log(`  ${r}\n      ${why}`);
