/**
 * publish-content-library.mjs — publish the LiveWell content library (the
 * pillar + struggling-flow essays under docs/drafts and content/drafts) in one
 * command, reusing scripts/publish-md.ts per file.
 *
 * publish-md strips the [PERSONAL STORY] placeholders, runs the voice check,
 * and upserts each post by slug. This wrapper just walks the library dirs and
 * calls it on every essay.
 *
 * Usage:
 *   node scripts/publish-content-library.mjs --dry-run      # verify all parse + clean (no DB)
 *   DATABASE_URL=... node scripts/publish-content-library.mjs            # publish all as DRAFTS
 *   DATABASE_URL=... node scripts/publish-content-library.mjs --live     # publish all LIVE
 *   node scripts/publish-content-library.mjs --dry-run --dir content/drafts/grief
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const LIB_DIRS = [
  "docs/drafts/capture-left",
  "content/drafts/capture-right",
  "content/drafts/marriage",
  "content/drafts/parenting",
  "content/drafts/faith-crisis",
  "content/drafts/grief",
  "content/drafts/pastoral-burnout",
  "content/drafts/scripture-past-politics",
  "content/drafts/after-christendom",
  "content/drafts/pastoral-angle",
  "content/drafts/creeds",
  "content/drafts/church-calendar",
  "content/drafts/sacraments",
  "content/drafts/disciplines",
  "content/drafts/why-believe",
];

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const live = argv.includes("--live");
const dirIdx = argv.indexOf("--dir");
const dirs = dirIdx !== -1 ? [argv[dirIdx + 1]] : LIB_DIRS;

function mdFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map(f => join(dir, f))
    .filter(p => statSync(p).isFile());
}

const files = dirs.flatMap(mdFiles);
if (files.length === 0) {
  console.error("No draft essays found in:", dirs.join(", "));
  process.exit(1);
}

if (!dryRun && !process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Use --dry-run to verify without a database, " +
      "or set DATABASE_URL to publish."
  );
  process.exit(1);
}

const passThrough = [];
if (dryRun) passThrough.push("--dry-run");
if (!live) passThrough.push("--draft"); // default: publish as drafts for review

console.log(
  `publish-content-library: ${files.length} essays, mode=${
    dryRun ? "DRY RUN" : live ? "LIVE" : "DRAFT"
  }\n`
);

let ok = 0;
let warned = 0;
let failed = 0;
for (const file of files) {
  const r = spawnSync(
    "npx",
    ["tsx", "scripts/publish-md.ts", file, ...passThrough],
    { stdio: "inherit", encoding: "utf8" }
  );
  if (r.status === 0) ok++;
  else failed++;
}

console.log(
  `\n=== ${ok} ok, ${failed} failed of ${files.length} essays (${
    dryRun ? "dry-run" : live ? "published LIVE" : "published as DRAFTS"
  }) ===`
);
process.exit(failed > 0 ? 1 : 0);
