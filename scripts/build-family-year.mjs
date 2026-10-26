#!/usr/bin/env node
/**
 * build-family-year.mjs
 *
 * Writes client/src/lib/familyYear.generated.ts, the family year map: the
 * seasons of the church year and the devotion for every week, five years
 * ahead, computed from the rules in scripts/lib/church-year.mjs and
 * scripts/lib/family-year.mjs. Run it after changing any family devotion
 * file, the seasonal sets, or client/public/family-year-overrides.json:
 *
 *   node scripts/build-family-year.mjs                    write the map
 *   node scripts/build-family-year.mjs --check            exit 1 if the map is stale,
 *                                                         an input has a problem, or
 *                                                         under twelve months remain
 *   node scripts/build-family-year.mjs --check --today=2030-12-01
 *                                                         the horizon check as of a date
 *
 * To pin one devotion to one week, add { "week": "<Sunday>", "devotion":
 * "<id>", "note": "<why>" } to the overrides file and run this again.
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, MODULE, buildYearMap, horizonProblem, loadInputs, renderYearModule, todayISO } from "./lib/family-year.mjs";
import { isISODate } from "./lib/church-year.mjs";

const CHECK = process.argv.includes("--check");
const todayArg = process.argv.find((a) => a.startsWith("--today="));
const today = todayArg ? todayArg.slice("--today=".length) : todayISO();
if (!isISODate(today)) {
  console.error(`[family-year] --today must be a YYYY-MM-DD date, not "${today}"`);
  process.exit(1);
}

const { map, problems, notes } = buildYearMap(loadInputs(ROOT));
for (const n of notes) console.log(`[family-year] note: ${n}`);
if (problems.length) {
  console.error("[family-year] the year map cannot be built:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const out = path.join(ROOT, MODULE);
const text = renderYearModule(map);
const summary = `${map.weeks.length} weeks, ${map.from} to ${map.through}, ${map.rotation.length} devotions in the rotation`;

if (CHECK) {
  const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  if (current !== text) {
    console.error(`[family-year] ${MODULE} is stale. Run: node scripts/build-family-year.mjs`);
    process.exit(1);
  }
} else {
  fs.writeFileSync(out, text);
}

const horizon = horizonProblem(map.through, today);
if (horizon) {
  console.error(`[family-year] ${horizon}`);
  process.exit(1);
}
console.log(`[family-year] ${CHECK ? "up to date" : `wrote ${MODULE}`} (${summary})`);
