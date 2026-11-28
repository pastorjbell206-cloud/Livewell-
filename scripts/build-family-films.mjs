#!/usr/bin/env node
/**
 * build-family-films.mjs
 *
 * Writes client/public/family/films.json: which Bible Explorer film each
 * family devotion and each catechism question offers under "Watch first"
 * (scripts/lib/family-films.mjs has the rule). Run it after a film is added
 * or changed, after its voice is made again (scripts/build-film-audio.mjs:
 * the recorded voice's length is the film's minutes), after a devotion's
 * passage or title changes, or after editing
 * client/public/family-film-picks.json. It reads the family index and the
 * Explorer index, so rebuild those first when their sources changed.
 *
 *   node scripts/build-family-films.mjs           write the map
 *   node scripts/build-family-films.mjs --check   exit 1 if it is stale or cannot be built
 *   node scripts/build-family-films.mjs --list    print every match
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, OUT, buildFamilyFilms, renderFamilyFilms } from "./lib/family-films.mjs";

const CHECK = process.argv.includes("--check");
const LIST = process.argv.includes("--list");
const { map, problems, counts } = buildFamilyFilms(ROOT);
if (problems.length) {
  console.error("[family-films] the map cannot be built:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

const out = path.join(ROOT, OUT);
const text = renderFamilyFilms(map);
if (LIST) {
  for (const [id, f] of Object.entries(map.devotions)) console.log(`devotion ${id} -> ${f.slug} (${f.by}, about ${f.minutes} min)`);
  for (const [n, f] of Object.entries(map.catechism)) console.log(`question ${n} -> ${f.slug} (${f.by})`);
}
if (CHECK) {
  const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  if (current !== text) {
    console.error(`[family-films] ${OUT} is stale. Run: node scripts/build-family-films.mjs`);
    process.exit(1);
  }
} else if (!LIST) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, text);
}
console.log(
  `[family-films] ${CHECK ? "up to date" : LIST ? "listed" : "wrote"} ${OUT}: ${counts.devotions} of ${counts.of} devotions and ${counts.catechism} of ${counts.questions} catechism questions offer one of ${counts.films} finished films`,
);
