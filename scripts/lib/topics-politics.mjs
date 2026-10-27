/**
 * topics-politics.mjs — the same instrument, on the topic pages (U25; run by
 * validate-politics.mjs).
 *
 * A topic page flagged politics: true (client/public/topics/<slug>.json, the
 * politics page first) names both directions: bothWays.right and
 * bothWays.left, each a line, an essay, and a guided path, the two lines
 * within the same 55% word band the gate applies to the disruption and
 * justice topics, so neither side is a strawman by brevity. Its short answer
 * names both (the words "right" and "left"), and its prose keeps the house
 * style this gate checks everywhere: no exclamation point, no forbidden word.
 */
import fs from "node:fs";
import path from "node:path";

const wc = (s) => String(s ?? "").trim().split(/\s+/).filter(Boolean).length;

/** Findings as [file, message] pairs, and how many politics pages were checked. */
export function checkTopicPolitics({ publicDir, forbidden = [] }) {
  const findings = [];
  const dir = path.join(publicDir, "topics");
  let pages = 0;
  if (!fs.existsSync(dir)) return { findings, pages };
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json") && x !== "index.json").sort()) {
    const rel = `topics/${f}`;
    let t;
    try {
      t = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    } catch (e) {
      findings.push([rel, `unparseable JSON (${e.message})`]);
      continue;
    }
    if (t?.politics !== true) continue;
    pages++;
    const both = t.bothWays || {};
    for (const side of ["right", "left"]) {
      const w = both[side];
      if (!w) {
        findings.push([rel, `bothWays is missing the ${side} side; the same-instrument rule requires both`]);
        continue;
      }
      if (!w.line) findings.push([rel, `bothWays.${side} needs its line`]);
      if (!w.essay?.href) findings.push([rel, `bothWays.${side} needs an essay`]);
      if (!w.path?.href) findings.push([rel, `bothWays.${side} needs a guided path`]);
    }
    if (both.right?.line && both.left?.line) {
      const r = wc(both.right.line);
      const l = wc(both.left.line);
      const max = Math.max(r, l);
      if ((max - Math.min(r, l)) / max > 0.55) findings.push([rel, `bothWays imbalance: right/left lines ${r}/${l} words differ by more than 55%; one side reads as a strawman`]);
    }
    const short = Array.isArray(t.short) ? t.short.join(" ") : "";
    if (!/\bright\b/i.test(short) || !/\bleft\b/i.test(short)) findings.push([rel, "the short answer names the temptation on the right and on the left"]);
    const prose = JSON.stringify([t.title, t.short, t.bothWays, t.description]);
    if (prose.includes("!")) findings.push([rel, "exclamation point"]);
    for (const w of forbidden) if (new RegExp(`\\b${w}\\b`, "i").test(prose)) findings.push([rel, `forbidden word "${w}"`]);
  }
  return { findings, pages };
}
