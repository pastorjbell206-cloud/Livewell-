#!/usr/bin/env node
/**
 * build-story-plan.mjs
 *
 * Writes "Read the whole story in 2027" (client/public/bible/guides/
 * whole-story-2027.json): the Study Bible's story path cut into 365 days of
 * about the same length, each day with its chapters, their titles, its act,
 * and the context guide that belongs to it. The page is
 * /study/bible/guides/whole-story-2027 (pages/StudyBibleYear.tsx). How the
 * days are cut is in scripts/lib/story-plan.mjs. Rerun it after story.json,
 * the chapter notes' titles, or the context guides change:
 *
 *   node scripts/build-story-plan.mjs           write the plan
 *   node scripts/build-story-plan.mjs --check   exit 1 if the committed plan is stale or unsound (CI)
 */
import fs from "node:fs";
import path from "node:path";

import { OUT_FILE, ROOT, buildPlan, planProblems, serialize } from "./lib/story-plan.mjs";

const rel = path.relative(ROOT, OUT_FILE);
const plan = buildPlan();
const text = serialize(plan);
const problems = planProblems(plan);
if (problems.length) {
  console.error(`[story-plan] the plan built from the data is unsound:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

if (process.argv.includes("--check")) {
  const committed = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, "utf8") : null;
  if (committed !== text) {
    console.error(`[story-plan] ${rel} is ${committed === null ? "missing" : "out of date with its sources"}.`);
    console.error("Run: node scripts/build-story-plan.mjs");
    process.exit(1);
  }
  console.log(`[story-plan] ok: ${plan.days.length} days, ${plan.chapters} chapters, ${plan.guides.length} context guides placed`);
} else {
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, text);
  console.log(`[story-plan] wrote ${rel}: ${plan.days.length} days, ${plan.chapters} chapters, ${plan.guides.length} context guides placed`);
}
