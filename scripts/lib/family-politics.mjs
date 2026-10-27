/**
 * family-politics.mjs: the same-instrument rule for family devotions on
 * politics (MASTER-PLAN 2 and 9.2, U11), run by scripts/validate-politics.mjs.
 *
 * A family devotion about politics is read aloud at a table where people may
 * have voted differently, so it may not speak to one side only. It carries
 * `politics: true` and exactly two `sides`, each a short paragraph with its
 * own label, read in turn: the glad and the sad after a vote, the ones whose
 * candidates won and lost, or right and left. The two sides are held to the
 * word band validate-politics.mjs already applies to the disruption and
 * justice topics (neither more than 55% longer than the other), so no side is
 * a strawman by brevity.
 *
 * Every family-devotions*.json file is read, hidden strands too (a hidden
 * devotion is ready the day it goes live). A devotion that talks about
 * voting, elections, parties, or politics without `politics: true` fails, so
 * the rule cannot be skipped by leaving the flag off. Quoted Scripture
 * (passageText) is exempt from the style check; everything else carries no
 * exclamation point and none of the gate's forbidden words.
 */
import fs from "node:fs";
import path from "node:path";
import { devotionsIn } from "./family-devotion-file.mjs";

/** Words that make a family devotion a politics piece. */
export const POLITICS_WORDS = /\b(vot(?:e|ed|es|ing|er|ers)|elections?|ballots?|republicans?|democrats?|partisan|politics|political|politicians?)\b/i;
/** The two sides may differ by no more than this share of the longer. */
export const SIDE_BAND = 0.55;

const wc = (s) => String(s ?? "").trim().split(/\s+/).filter(Boolean).length;
const isText = (v) => typeof v === "string" && v.trim().length > 0;

function* strings(value, at) {
  if (typeof value === "string") yield [at, value];
  else if (Array.isArray(value)) for (let i = 0; i < value.length; i++) yield* strings(value[i], `${at}[${i}]`);
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) yield* strings(v, at ? `${at}.${k}` : k);
}

/**
 * Check every family devotion file in publicDir. Returns { findings: [file,
 * message][], pieces } where pieces counts the politics devotions checked.
 */
export function checkFamilyPolitics({ publicDir, forbidden = [] }) {
  const findings = [];
  let pieces = 0;
  const files = fs.existsSync(publicDir) ? fs.readdirSync(publicDir).filter((n) => /^family-devotions(-[a-z0-9-]+)?\.json$/.test(n)).sort() : [];
  for (const name of files) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(publicDir, name), "utf8"));
    } catch (e) {
      findings.push([name, `unparseable JSON (${e.message})`]);
      continue;
    }
    devotionsIn(data).devotions.forEach((d, i) => {
      if (!d || typeof d !== "object") return;
      const where = `${d.id ?? `[${i}]`}`;
      const note = (msg) => findings.push([name, `${where}: ${msg}`]);
      if (d.politics !== undefined && typeof d.politics !== "boolean") note("politics must be true or false");
      // The writing itself: not the id, the reference, quoted Scripture, or a link.
      const prose = [...strings(d, "")].filter(([at]) => !/(^|\.)(id|passage|passageText|href)$/.test(at));

      if (d.politics !== true) {
        const hit = prose.map(([, t]) => POLITICS_WORDS.exec(t)?.[0]).find(Boolean);
        if (hit) note(`talks about politics ("${hit}") but is not marked politics: true; mark it and give it two sides, read in turn, so it speaks to the whole table`);
        if (d.sides !== undefined) note("has sides but is not marked politics: true");
      } else {
        pieces++;
        const sides = d.sides;
        if (!Array.isArray(sides) || sides.length !== 2) {
          note("a politics piece needs exactly two sides, each { label, text } (the same-instrument rule)");
        } else {
          sides.forEach((s, j) => {
            if (!isText(s?.label) || !isText(s?.text)) note(`sides[${j}] needs a label and a text`);
          });
          if (isText(sides[0]?.label) && sides[0].label.trim() === sides[1]?.label?.trim()) note("the two sides need different labels");
          const [a, b] = [wc(sides[0]?.text), wc(sides[1]?.text)];
          const max = Math.max(a, b);
          if (max > 0 && (max - Math.min(a, b)) / max > SIDE_BAND) {
            note(`side imbalance: ${a}/${b} words differ by more than ${Math.round(SIDE_BAND * 100)}%; one side reads as a strawman`);
          }
        }
      }

      for (const [at, text] of prose) {
        if (text.includes("!")) note(`${at}: exclamation point (outside quoted Scripture the verdict lands on a period)`);
        for (const w of forbidden) if (new RegExp(`\\b${w}\\b`, "i").test(text)) note(`${at}: forbidden word "${w}"`);
      }
    });
  }
  return { findings, pieces };
}
