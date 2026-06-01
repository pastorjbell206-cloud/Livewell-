#!/usr/bin/env node
/**
 * publish-all-drafts.mjs
 *
 * Walks content/drafts/ and publishes every full-*.md essay through the
 * publish-md.ts CLI. Defaults to dry-run; pass --apply to actually write.
 *
 *   node scripts/publish-all-drafts.mjs              # dry-run all 47 essays
 *   node scripts/publish-all-drafts.mjs --apply      # write live
 *   node scripts/publish-all-drafts.mjs --apply --draft   # write as drafts
 *   node scripts/publish-all-drafts.mjs --start 10 --limit 5  # essays 10-14
 *
 * Resumable: each essay's publish is independent. Re-runs upsert by slug.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRAFTS_DIR = path.resolve(__dirname, "..", "content", "drafts");

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const DRAFT = args.includes("--draft");
const START = (() => {
  const i = args.indexOf("--start");
  return i >= 0 ? parseInt(args[i + 1], 10) : 0;
})();
const LIMIT = (() => {
  const i = args.indexOf("--limit");
  return i >= 0 ? parseInt(args[i + 1], 10) : null;
})();

if (APPLY && !process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is required for --apply mode.");
  console.error("Set it in _livewell_repo/.env or pass it inline:");
  console.error('  DATABASE_URL="mysql://..." node scripts/publish-all-drafts.mjs --apply');
  process.exit(1);
}

if (!fs.existsSync(DRAFTS_DIR)) {
  console.error(`Drafts directory not found: ${DRAFTS_DIR}`);
  process.exit(1);
}

const allEntries = fs
  .readdirSync(DRAFTS_DIR)
  .filter(f => /^full-\d+.*\.md$/.test(f))
  .sort();

let entries = allEntries.slice(START);
if (LIMIT !== null) entries = entries.slice(0, LIMIT);

console.log(`Publishing ${entries.length} of ${allEntries.length} drafts.`);
console.log(`Mode: ${APPLY ? (DRAFT ? "APPLY (drafts)" : "APPLY (live)") : "DRY RUN"}`);
console.log("");

let ok = 0;
let fail = 0;
let warn = 0;

for (let i = 0; i < entries.length; i++) {
  const filename = entries[i];
  const filepath = path.join(DRAFTS_DIR, filename);
  process.stdout.write(`[${i + 1}/${entries.length}] ${filename.padEnd(60)} `);

  const cliArgs = ["tsx", "scripts/publish-md.ts", filepath];
  if (!APPLY) cliArgs.push("--dry-run");
  if (DRAFT) cliArgs.push("--draft");

  const res = spawnSync("npx", cliArgs, {
    env: process.env,
    encoding: "utf8",
    shell: true,
  });

  const stdout = res.stdout || "";
  const warnMatch = stdout.match(/(\d+) voice warning/);
  const warnCount = warnMatch ? parseInt(warnMatch[1], 10) : 0;
  warn += warnCount;

  if (res.status === 0) {
    ok++;
    process.stdout.write(`OK${warnCount > 0 ? ` (${warnCount} voice)` : ""}\n`);
  } else {
    fail++;
    process.stdout.write(`FAIL\n`);
    const err = (res.stderr || stdout).trim().split("\n").slice(-3).join(" / ");
    console.error(`    ${err.slice(0, 200)}`);
  }
}

console.log("");
console.log(`=== ${ok} published, ${fail} failed, ${warn} total voice warnings ===`);
process.exit(fail > 0 ? 1 : 0);
