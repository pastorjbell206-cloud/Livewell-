#!/usr/bin/env node
/**
 * publish-from-plan.mjs
 *
 * Consumes scripts/publish-plan.json (produced by survey-manuscripts.mjs)
 * and runs the right publisher (publish-book.ts for books, publish-docx.ts
 * for articles) against every file in priority order.
 *
 * Defaults to dry-run. Pass --apply to write to the database. Add --live
 * to publish=true (otherwise everything lands as drafts for admin review).
 *
 *   node scripts/publish-from-plan.mjs                # dry-run, all files
 *   node scripts/publish-from-plan.mjs --apply        # write as drafts
 *   node scripts/publish-from-plan.mjs --apply --live # write live
 *   node scripts/publish-from-plan.mjs --priority 1 --apply  # only P1
 *   node scripts/publish-from-plan.mjs --kind book --apply
 *
 * Resumable: if a file fails, the script logs the error and continues. Re-
 * runs are idempotent thanks to slug-keyed UPSERT in the publishers.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import dotenv from "dotenv";

dotenv.config();

const PLAN_PATH = path.resolve("scripts/publish-plan.json");

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const LIVE = args.includes("--live");
const PRIORITY = (() => {
  const i = args.indexOf("--priority");
  return i >= 0 ? parseInt(args[i + 1], 10) : null;
})();
const KIND = (() => {
  const i = args.indexOf("--kind");
  return i >= 0 ? args[i + 1] : null;
})();
const LIMIT = (() => {
  const i = args.indexOf("--limit");
  return i >= 0 ? parseInt(args[i + 1], 10) : null;
})();
const SKIP = (() => {
  const i = args.indexOf("--skip");
  return i >= 0 ? parseInt(args[i + 1], 10) : 0;
})();

if (!fs.existsSync(PLAN_PATH)) {
  console.error(
    `${PLAN_PATH} not found. Run \`node scripts/survey-manuscripts.mjs\` first.`
  );
  process.exit(1);
}

if (APPLY && !process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required when --apply is used.");
  process.exit(1);
}

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));
let candidates = plan.publish;
if (PRIORITY !== null) candidates = candidates.filter(c => c.priority === PRIORITY);
if (KIND) candidates = candidates.filter(c => c.kind === KIND);
if (SKIP) candidates = candidates.slice(SKIP);
if (LIMIT) candidates = candidates.slice(0, LIMIT);

console.log(`Publishing ${candidates.length} of ${plan.publish.length} files in plan.`);
console.log(`Mode: ${APPLY ? (LIVE ? "APPLY + LIVE" : "APPLY (drafts)") : "DRY RUN"}`);
console.log();

let ok = 0;
let fail = 0;
let dry = 0;

for (let i = 0; i < candidates.length; i++) {
  const c = candidates[i];
  const flags = [
    "--track", c.track,
    "--audience", c.audience,
    "--title", c.title,
    "--slug", c.suggestedSlug,
  ];

  const cli = c.kind === "book" ? "scripts/publish-book.ts" : "scripts/publish-docx.ts";
  const cmdFlags = [...flags];
  if (APPLY) {
    if (c.kind === "book") {
      cmdFlags.push("--apply");
    }
    if (LIVE) cmdFlags.push("--live");
  } else if (c.kind === "docx") {
    cmdFlags.push("--dry-run");
  }
  // publish-docx defaults to publish; needs --dry-run when we want no write
  if (c.kind === "article" && !APPLY) {
    cmdFlags.push("--dry-run");
  }
  if (c.kind === "article" && APPLY && LIVE) {
    cmdFlags.push("--live");
  }

  const argv = ["tsx", cli, c.path, ...cmdFlags];
  process.stdout.write(`[${i + 1}/${candidates.length}] ${c.kind.padEnd(7)} ${c.track.padEnd(20)} ${c.title.slice(0, 60).padEnd(60)} `);

  const res = spawnSync("npx", argv, {
    env: process.env,
    encoding: "utf8",
    shell: true,
  });

  if (res.status === 0) {
    if (APPLY) {
      ok += 1;
      process.stdout.write(`OK\n`);
    } else {
      dry += 1;
      process.stdout.write(`dry\n`);
    }
  } else {
    fail += 1;
    process.stdout.write(`FAIL\n`);
    const err = (res.stderr || res.stdout || "").trim().split("\n").slice(-3).join(" / ");
    console.error(`    ${err.slice(0, 200)}`);
  }
}

console.log();
console.log(`=== ${ok} published, ${dry} dry-run, ${fail} failed ===`);
process.exit(fail > 0 ? 1 : 0);
