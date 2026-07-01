#!/usr/bin/env node
/**
 * classify-article-library.mjs — LiveWell by James Bell
 *
 * Files the 115 articles in client/public/article-library.json into the
 * two-movement / six-pillar taxonomy by APPENDING entries to
 * client/src/lib/pillar-assignments.ts. Uses the exact same keyword tables,
 * legacy-pillar prior, and scoring as scripts/classify-pillars.mjs, so these
 * articles are filed by the same method as the existing assignments.
 *
 * Idempotent: only adds slugs not already present; never rewrites existing
 * entries. Run: node scripts/classify-article-library.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LIB = join(ROOT, "client/public/article-library.json");
const ASSIGN = join(ROOT, "client/src/lib/pillar-assignments.ts");

// ── Keyword tables copied verbatim from classify-pillars.mjs ────────────────
const PILLARS = {
  1: { kw: ["nationalism","nationalist","patriot","patriotism","flag","god and country","civil religion","maga","trump","empire","restoration","make america","god bless america","christian america","power","partisan","republican","political savior","idol of nation"] },
  2: { kw: ["progressive","woke","wokeness","identity politics","cancel","social gospel","compassion","coercion","inclusion","affirming","deconstruct","liberal orthodoxy","activism","ideology","critical theory"] },
  3: { kw: ["scripture","interpret","interpretation","hermeneutic","translation","exegesis","read the bible","proof-text","prooftext","context","greek","hebrew","biblical","tradition","canon","literal","misread","text says","doctrine","trinity","gospel","grace","creed","council","reformation","atonement","incarnation","resurrection","theology"] },
  4: { kw: ["post-christian","christendom","secular","secularization","decline","nones","unaffiliated","church closure","closures","plateau","exile","cultural christianity","end of christian america","decline of the church","what comes next","institution","two kingdoms","early church","under rome"] },
  5: { kw: ["pastor","pastoral","ministry","minister","congregation","sermon","preaching","leadership","leader","burnout","church health","shepherd","elder","deacon","pcn","referral","revitalization","missions","missionary","church plant","discipleship","staff"] },
  6: { kw: ["marriage","spouse","husband","wife","covenant","romance","father","fatherhood","son","parenting","children","child","family","household","home","friendship","friend","community","vocation","work","calling","career","habit","practice","rhythm","discipline","prayer life","money","finances","generosity","rest","sabbath"] },
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
const LEGACY_PRIOR = {
  "Leadership Formation": 5,
  "Integrated Life": 6,
  "Theological Depth": 3,
  "Prophetic Justice": 1,
  "Prophetic Disruption": 4,
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
  const body = (post.body || "").toLowerCase();
  const scores = {};
  for (const [id, p] of Object.entries(PILLARS)) {
    const t = countHits(title, p.kw);
    const b = countHits(body, p.kw);
    scores[id] = t.score * 3 + b.score;
  }
  const priorId = LEGACY_PRIOR[(post.pillar || "").trim()];
  if (priorId) scores[priorId] = (scores[priorId] || 0) + 4;
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topId, topScore] = ranked[0];
  const second = ranked[1][1];
  const subs = [];
  for (const [name, kws] of Object.entries(SUBTHEMES)) {
    if (countHits(title + " " + body, kws).score >= (topId === "6" ? 1 : 2)) subs.push(name);
  }
  const margin = topScore - second;
  const lowConf = topScore === 0 || (!priorId && topScore <= 2 && margin <= 1) || margin === 0;
  return {
    pillar: Number(topId),
    subThemes: Number(topId) === 6 ? subs : [],
    confidence: lowConf ? "LOW" : margin >= 5 ? "high" : "med",
  };
}

// ── Load + classify only the article-library slugs not already filed ────────
const lib = JSON.parse(readFileSync(LIB, "utf8"));
const articles = Array.isArray(lib) ? lib : (lib.articles || lib.posts || []);
let src = readFileSync(ASSIGN, "utf8");
const existing = new Set([...src.matchAll(/^\s*"([^"]+)":\s*\{/gm)].map((m) => m[1]));

const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
const blocks = [];
for (const a of articles) {
  if (!a.slug || existing.has(a.slug)) continue;
  const r = classify(a);
  dist[r.pillar]++;
  const body = JSON.stringify(r, null, 2).split("\n").map((l) => "  " + l).join("\n").replace(/^ {2}\{/, "{");
  blocks.push(`  ${JSON.stringify(a.slug)}: ${body}`);
}

if (!blocks.length) {
  console.log("[classify-article-library] nothing to add — all slugs already filed.");
  process.exit(0);
}

// Insert before the final "\n};" that closes PILLAR_ASSIGNMENTS.
const closeIdx = src.lastIndexOf("\n};");
if (closeIdx === -1) throw new Error("could not find the closing of PILLAR_ASSIGNMENTS");
src = src.slice(0, closeIdx) + ",\n" + blocks.join(",\n") + src.slice(closeIdx);
writeFileSync(ASSIGN, src);

console.log(`[classify-article-library] filed ${blocks.length} articles into pillar-assignments.ts`);
console.log("New distribution:");
for (const id of [1, 2, 3, 4, 5, 6]) console.log(`  pillar ${id}: ${dist[id]}`);
