#!/usr/bin/env node
/**
 * validate-downloads.mjs — no link to a PDF that the build will not make.
 *
 * The PDFs under /downloads are generated at deploy time (`pnpm pdfs`, in
 * build:vercel) and are not committed, so this checks links against the
 * builder's plan (scripts/pdf-kit/plan.mjs) instead of the filesystem:
 *
 *   1. every "/downloads/..." path written in client/src resolves to a planned
 *      file. Template paths (`/downloads/context/${slug}.pdf`) must match at
 *      least one planned file, and every <PillarLeadMagnet slug="..."> must
 *      name a planned reading path;
 *   2. when a manifest exists (client/public/downloads/index.json, after
 *      `pnpm pdfs`), every entry is planned and present on disk, and every
 *      planned file is listed.
 *
 * Run: node scripts/validate-downloads.mjs   (exits non-zero on any problem)
 */
import fs from "node:fs";
import path from "node:path";
import { planDownloads, OUT_DIR, ROOT } from "./pdf-kit/plan.mjs";

const planned = new Set((await planDownloads()).map((j) => `/downloads/${j.file}`));
// The manifest itself (written by build-pdfs.mjs, read by /resources).
const MANIFEST = "/downloads/index.json";
const problems = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) walk(abs, out);
    else if (/\.(tsx?|jsx?)$/.test(e.name) && !/\.test\./.test(e.name)) out.push(abs);
  }
  return out;
}

let refs = 0;
for (const file of walk(path.join(ROOT, "client/src"))) {
  const src = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file);
  // Quoted or template-literal paths that start at /downloads/.
  for (const m of src.matchAll(/["'`](\/downloads\/[^"'`\s]+)["'`]/g)) {
    refs++;
    const p = m[1];
    if (p.includes("${")) {
      const re = new RegExp("^" + p.split(/\$\{[^}]*\}/).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[^/]+") + "$");
      if (![...planned].some((f) => re.test(f))) problems.push(`${rel}: ${p} matches no planned download`);
    } else if (!planned.has(p) && p !== MANIFEST) {
      problems.push(`${rel}: ${p} is not a planned download`);
    }
  }
  for (const m of src.matchAll(/<PillarLeadMagnet[\s\S]*?slug="([^"]+)"/g)) {
    refs++;
    const p = `/downloads/reading-paths/${m[1]}.pdf`;
    if (!planned.has(p)) problems.push(`${rel}: PillarLeadMagnet slug "${m[1]}" -> ${p} is not a planned download`);
  }
}

const manifestPath = path.join(OUT_DIR, "index.json");
let checkedManifest = false;
if (fs.existsSync(manifestPath)) {
  checkedManifest = true;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const listed = new Set();
  for (const f of manifest.files || []) {
    listed.add(f.file);
    if (!planned.has(f.file)) problems.push(`manifest: ${f.file} is not in the plan (stale manifest? rerun pnpm pdfs)`);
    if (!fs.existsSync(path.join(ROOT, "client/public", f.file))) problems.push(`manifest: ${f.file} is missing on disk`);
  }
  for (const p of planned) if (!listed.has(p)) problems.push(`manifest: planned ${p} is not listed (rerun pnpm pdfs)`);
}

if (problems.length) {
  console.error(`validate-downloads: ${problems.length} problem(s)`);
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log(
  `validate-downloads: ${refs} download link(s) in client/src resolve against ${planned.size} planned PDFs` +
    (checkedManifest ? "; manifest matches the plan and the files on disk." : "; no manifest built yet (run pnpm pdfs to check files on disk).")
);
