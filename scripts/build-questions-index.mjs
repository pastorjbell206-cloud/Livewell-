#!/usr/bin/env node
/**
 * build-questions-index.mjs: writes client/public/questions/index.json, the
 * apologetics library's manifest, from areas.json and the area and piece
 * files (scripts/lib/questions.mjs). The room (/questions), the area pages and
 * the claims index read it; each piece page reads its own file.
 *
 * Every area is listed (an area with no finished piece shows as "being
 * written"). Pieces and claims carry `status` and `live`, so a live page can
 * leave out what is pending, and a pending page (on the preview) can show it.
 *
 *   node scripts/build-questions-index.mjs           write the manifest
 *   node scripts/build-questions-index.mjs --check   exit 1 if it is out of date (CI)
 */
import fs from "node:fs";
import path from "node:path";
import { buildQuestionsIndex, questionsDir } from "./lib/questions.mjs";

const OUT = path.join(questionsDir(), "index.json");

const text = JSON.stringify(buildQuestionsIndex(), null, 2) + "\n";
const rel = path.relative(process.cwd(), OUT);
if (process.argv.includes("--check")) {
  const have = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (have !== text) {
    console.error(`[questions-index] ${rel} is out of date. Run: node scripts/build-questions-index.mjs`);
    process.exit(1);
  }
  console.log(`[questions-index] up to date`);
} else {
  fs.writeFileSync(OUT, text);
  console.log(`[questions-index] wrote ${rel}`);
}
