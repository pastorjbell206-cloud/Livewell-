#!/usr/bin/env node
/**
 * classify-pillars.mjs — LiveWell by James Bell
 *
 * STEP 0 proposal only. Proposes a primaryPillar (+ movement, + Pillar 6
 * sub-themes) for every essay under the new two-movement / six-pillar taxonomy,
 * with a confidence and the keywords that drove the call. It CHANGES NOTHING —
 * no DB writes, no taxonomy code edits. The output table is for James to review
 * and correct before any re-filing.
 *
 * Heuristic keyword scoring on title (weighted) + body. Nuanced theology does
 * not reduce cleanly to keywords, so low-confidence and cross-signal rows are
 * flagged for human judgment — that is the point of Step 0.
 *
 * Output: scripts/pillar-mapping.md  +  scripts/pillar-mapping.json
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cd = JSON.parse(readFileSync(join(__dirname, "content-data.json"), "utf8"));
const corpusPath = join(__dirname, ".essays-corpus.json");
const bodyBySlug = existsSync(corpusPath)
  ? Object.fromEntries(JSON.parse(readFileSync(corpusPath, "utf8")).map((c) => [c.slug, c.body || ""]))
  : {};

const PILLARS = {
  1: { name: "The Capture by the Right", movement: "diagnosis",
       kw: ["nationalism","nationalist","patriot","patriotism","flag","god and country","civil religion","maga","trump","empire","restoration","make america","god bless america","christian america","power","partisan","republican","political savior","idol of nation"] },
  2: { name: "The Capture by the Left", movement: "diagnosis",
       kw: ["progressive","woke","wokeness","identity politics","cancel","social gospel","compassion","coercion","inclusion","affirming","deconstruct","liberal orthodoxy","activism","ideology","critical theory"] },
  3: { name: "Reading Scripture Past Our Politics", movement: "diagnosis",
       kw: ["scripture","interpret","interpretation","hermeneutic","translation","exegesis","read the bible","proof-text","prooftext","context","greek","hebrew","biblical","tradition","canon","literal","misread","text says"] },
  4: { name: "After Christendom", movement: "diagnosis",
       kw: ["post-christian","christendom","secular","secularization","decline","nones","unaffiliated","church closure","closures","plateau","exile","cultural christianity","end of christian america","decline of the church","what comes next","institution"] },
  5: { name: "The Pastoral Angle", movement: "diagnosis",
       kw: ["pastor","pastoral","ministry","minister","congregation","sermon","preaching","leadership","leader","burnout","church health","shepherd","elder","deacon","pcn","referral","revitalization","missions","missionary","church plant","discipleship","staff"] },
  6: { name: "Living Well After Christendom", movement: "formation",
       kw: ["marriage","spouse","husband","wife","covenant","romance","father","fatherhood","son","parenting","children","child","family","household","home","friendship","friend","community","vocation","work","calling","career","habit","practice","rhythm","discipline","prayer life","money","finances","generosity","rest","sabbath"] },
};

const SUBTHEMES = {
  "marriage-covenant": ["marriage","spouse","husband","wife","covenant","romance","divorce"],
  "fatherhood": ["father","fatherhood","dad","sons","my five sons"],
  "parenting": ["parenting","children","raising","kids","child"],
  "family-household": ["family","household","home","domestic"],
  "friendship-community": ["friendship","friend","community","belonging","loneliness"],
  "vocation-work": ["vocation","work","calling","career","job","ambition"],
  "practices": ["habit","practice","rhythm","discipline","prayer","sabbath","rest","spiritual formation"],
};

function countHits(text, kws) {
  let score = 0; const hit = [];
  for (const k of kws) {
    const re = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    const n = (text.match(re) || []).length;
    if (n) { score += n; hit.push(k); }
  }
  return { score, hit };
}

function classify(post) {
  const title = (post.title || "").toLowerCase();
  const body = (bodyBySlug[post.slug] || post.body || "").toLowerCase();
  const scores = {};
  const hits = {};
  for (const [id, p] of Object.entries(PILLARS)) {
    const t = countHits(title, p.kw);
    const b = countHits(body, p.kw);
    scores[id] = t.score * 3 + b.score; // weight title
    hits[id] = [...new Set([...t.hit, ...b.hit])];
  }
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topId, topScore] = ranked[0];
  const second = ranked[1][1];
  // sub-themes (mainly Pillar 6)
  const subs = [];
  for (const [name, kws] of Object.entries(SUBTHEMES)) {
    if (countHits(title + " " + body, kws).score >= (topId === "6" ? 1 : 2)) subs.push(name);
  }
  const margin = topScore - second;
  const lowConf = topScore === 0 || (topScore <= 2 && margin <= 1) || margin === 0;
  return {
    slug: post.slug,
    title: post.title,
    currentPillar: post.pillar || "(none)",
    proposedPillar: Number(topId),
    proposedName: PILLARS[topId].name,
    movement: PILLARS[topId].movement,
    subThemes: Number(topId) === 6 ? subs : subs.filter((s) => false), // sub-themes primarily on P6
    secondarySignals: ranked.filter(([, s]) => s > 0 && s !== topScore).slice(0, 2).map(([id]) => Number(id)),
    confidence: lowConf ? "LOW" : margin >= 4 ? "high" : "med",
    rationale: hits[topId].slice(0, 4).join(", ") || "no strong signal",
  };
}

const rows = cd.posts.map(classify);

// distribution
const dist = {};
for (const r of rows) dist[r.proposedPillar] = (dist[r.proposedPillar] || 0) + 1;
const flagged = rows.filter((r) => r.confidence === "LOW");

writeFileSync(join(__dirname, "pillar-mapping.json"), JSON.stringify(rows, null, 2));

const md = [];
md.push("# Proposed pillar mapping — two movements, six pillars");
md.push("");
md.push("**STEP 0 PROPOSAL — nothing has been re-filed.** Review and correct the `proposedPillar` / `subThemes` columns, then I'll apply. Heuristic first pass; LOW-confidence rows especially need your eye.");
md.push("");
md.push("## Proposed distribution");
md.push("");
md.push("| # | Pillar | Movement | Essays |");
md.push("|--:|--------|----------|------:|");
for (const id of [1, 2, 3, 4, 5, 6]) md.push(`| ${id} | ${PILLARS[id].name} | ${PILLARS[id].movement} | ${dist[id] || 0} |`);
md.push("");
md.push(`${flagged.length} of ${rows.length} are LOW confidence (flagged below and in the table).`);
md.push("");
md.push("## Full mapping");
md.push("");
md.push("| Essay | Current | → Pillar | Move | Sub-themes | Conf | Signals |");
md.push("|-------|---------|----------|------|------------|------|---------|");
for (const r of rows) {
  md.push(`| ${r.title} | ${r.currentPillar} | **${r.proposedPillar}. ${r.proposedName}** | ${r.movement} | ${r.subThemes.join(", ")} | ${r.confidence} | ${r.rationale} |`);
}
writeFileSync(join(__dirname, "pillar-mapping.md"), md.join("\n"));

console.log("Proposed pillar distribution (NOTHING re-filed):");
for (const id of [1, 2, 3, 4, 5, 6]) console.log(`  ${id}. ${PILLARS[id].name.padEnd(34)} ${dist[id] || 0}`);
console.log(`\n${flagged.length} LOW-confidence rows need your judgment.`);
console.log("Full table → scripts/pillar-mapping.md");
