#!/usr/bin/env node
/**
 * validate-catalogue.mjs — the Library may never quietly lose a shelf.
 *
 *   pnpm exec tsx scripts/validate-catalogue.mjs
 *
 * Builds the catalogue in memory without a database (the static essay library
 * stands in, as it does in CI) and fails if:
 *   1. any source produced nothing (a manifest moved or its shape changed);
 *   2. an essay in the static library is missing (minus takedowns, hidden,
 *      and the essays moved to PCN);
 *   3. any item's link does not match a route in client/src/App.tsx;
 *   4. any downloadable file neither exists on disk nor is a PDF the deploy
 *      builds from a source that exists (scripts/build-pdfs.mjs);
 *   5. an item is malformed or duplicated;
 *   6. the shipped file is over its size budget.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { assemble, KIND_ORDER } from "./build-catalogue.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "client/public");
// Static-library fallback budget. With every database essay the shipped file
// runs roughly 25 KB larger; the deploy log prints the real figure.
const GZIP_BUDGET_KB = 180;

const errors = [];
const fail = (msg) => errors.push(msg);

const catalogue = assemble(null);
const { parts, ...shipped } = catalogue;

// 1. every source contributed
for (const [name, n] of Object.entries(parts)) {
  if (!n) fail(`source "${name}" produced no items`);
}

// 2. essays complete against the static library
const staticLib = JSON.parse(fs.readFileSync(path.join(ROOT, "content/static-library.generated.json"), "utf8"));
const essayHrefs = new Set(catalogue.items.filter((i) => i.kind === "Essay").map((i) => i.href));
const setFrom = (rel, name) => {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const m = src.match(new RegExp(`${name} = new Set<string>\\(\\[([\\s\\S]*?)\\]\\)`));
  return new Set(m ? [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]) : []);
};
// The essays moved to PCN (content/pcn-moved.json) redirect away and are
// deliberately left out of the Library, like takedowns and hidden slugs.
const movedToPcn = JSON.parse(fs.readFileSync(path.join(ROOT, "content/pcn-moved.json"), "utf8")).slugs ?? [];
const { redirectedEssaySlugs } = await import("./redirected-essays.mjs");
const excluded = new Set([...setFrom("api/index.ts", "TAKEN_DOWN"), ...setFrom("client/src/lib/hiddenSlugs.ts", "HIDDEN_SLUGS"), ...movedToPcn, ...redirectedEssaySlugs(ROOT)]);
for (const r of staticLib) {
  if (!r?.slug || r.published === false || r.published === 0 || excluded.has(r.slug)) continue;
  if (!essayHrefs.has(`/writing/${r.slug}`)) fail(`essay missing from the catalogue: ${r.slug}`);
}

// 3. every link resolves to a route
const app = fs.readFileSync(path.join(ROOT, "client/src/App.tsx"), "utf8");
const routeRes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map(([, p]) =>
  new RegExp("^" + p.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/:[A-Za-z0-9_]+\\\?/g, "[^/]*").replace(/:[A-Za-z0-9_]+/g, "[^/]+").replace(/\\\*/g, ".*") + "/?$")
);
const unrouted = new Set();
for (const it of catalogue.items) {
  const p = it.href.split(/[?#]/)[0];
  if (!routeRes.some((re) => re.test(p))) unrouted.add(`${it.kind}: ${it.href}`);
}
for (const u of unrouted) fail(`no route for ${u}`);

// 4. every file exists or is built from an existing source
const builtFrom = (href) => {
  let m = href.match(/^\/downloads\/studyguides\/(.+)-(leader|participant)\.pdf$/);
  if (m) return fs.existsSync(path.join(PUB, `studyguides/${m[1]}.json`));
  m = href.match(/^\/downloads\/context\/(.+)\.pdf$/);
  if (m) return fs.existsSync(path.join(PUB, `context/guides/${m[1]}.json`));
  return false;
};
for (const it of catalogue.items) {
  for (const f of it.files ?? []) {
    if (!fs.existsSync(path.join(PUB, f.href.replace(/^\//, ""))) && !builtFrom(f.href)) {
      fail(`${it.kind} "${it.title}": file not found and not built by the deploy: ${f.href}`);
    }
  }
}

// 5. well-formed, no duplicates
const seen = new Set();
for (const it of catalogue.items) {
  if (!KIND_ORDER.includes(it.kind)) fail(`unknown kind "${it.kind}" on ${it.href}`);
  if (!it.title?.trim()) fail(`untitled item at ${it.href}`);
  if (!it.href?.startsWith("/")) fail(`bad href on "${it.title}": ${it.href}`);
  const key = `${it.kind}|${it.href}|${it.title}`;
  if (seen.has(key)) fail(`duplicate: ${key}`);
  seen.add(key);
}

// 6. size budget
const gzKb = zlib.gzipSync(JSON.stringify(shipped)).length / 1024;
if (gzKb > GZIP_BUDGET_KB) fail(`catalogue is ${gzKb.toFixed(0)} KB gzipped, over the ${GZIP_BUDGET_KB} KB budget`);

if (errors.length) {
  console.error(`validate-catalogue: ${errors.length} problem(s)`);
  for (const e of errors.slice(0, 50)) console.error("  " + e);
  process.exit(1);
}
console.log(`validate-catalogue: ok (${catalogue.items.length} items across ${Object.keys(catalogue.counts).length} kinds, ${gzKb.toFixed(0)} KB gzipped)`);
