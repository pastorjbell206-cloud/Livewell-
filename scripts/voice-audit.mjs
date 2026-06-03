/**
 * voice-audit.mjs — forensic Voice & Kill-List sweep for James Bell's writing.
 *
 * Implements the mechanical layer of the editing system (§5 kill list + the
 * AI-tell inventory from "The Voice & Authenticity Audit"). It does NOT edit
 * anything — it flags, ranks, and reports, so a human can do the lightest-touch
 * pass the system requires. Over-editing is the primary failure mode; this tool
 * exists to find WHERE attention is needed, not to rewrite.
 *
 * Source of text (first found wins):
 *   1. --file <path.json>  — a JSON array of { title, slug, body } or the
 *      content-data.json shape ({ posts: [...] }).
 *   2. default: client/src/data/content-data.json
 *
 * NOTE: content-data.json carries only short excerpts, not full essays. Point
 * --file at a full-text export (Substack export JSON, or a DB dump shaped as
 * {title,slug,body}) to audit the real prose.
 *
 * Usage:
 *   node scripts/voice-audit.mjs
 *   node scripts/voice-audit.mjs --file ./export.json > docs/voice-audit-report.md
 */
import { readFileSync } from "node:fs";

const arg = process.argv.indexOf("--file");
const file =
  arg !== -1 ? process.argv[arg + 1] : "client/src/data/content-data.json";

const raw = JSON.parse(readFileSync(file, "utf8"));
const posts = Array.isArray(raw) ? raw : raw.posts || raw.articles || [];

// Pattern groups. word-boundary, case-insensitive. Phrases matched literally.
const GROUPS = {
  "AI-tell vocabulary": [
    "delve", "delves", "delving", "tapestry", "multifaceted", "foster",
    "fostering", "leverage", "leveraging", "unpack", "unpacking",
    "navigate the", "navigating the", "robust", "myriad", "plethora",
    "in the realm of", "a testament to", "it's important to note",
    "dive in", "comprehensive", "nuanced", "at its core",
  ],
  "Banned openers": [
    "in today's world", "in a world where", "now more than ever",
    "here's the thing", "i want to be real with you", "let me be honest",
    "let me tell you",
  ],
  "Therapy-speak": [
    "hold space", "your feelings are valid", "do the work", "your truth",
    "show up for yourself", "showing up", "lean into",
  ],
  "Signposting": [
    "here's what i mean", "let me explain", "in other words", "put simply",
    "let me be clear", "bear with me", "stay with me",
    "here's where it gets interesting",
  ],
  "Reader-directive": [
    "let that land", "read that again", "don't skip past that",
    "sit with it", "pause here", "take a moment",
  ],
  "Announced honesty": [
    "here's what nobody talks about", "nobody says this", "real talk",
    "i'll just say it",
  ],
  "Spiritual cliché": [
    "god's got this", "transformational", "transformative",
    "authentic community", "do life together", "season of life",
    "gospel-centered",
  ],
  // Flagged but contextual — common legit uses; verify, don't auto-cut.
  "Soft / verify": [
    "ultimately", "indeed", "journey", "holistic", "ecosystem", "landscape",
  ],
};

function escapeRx(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function countMatches(text, phrase) {
  const boundary = /^[a-z']+$/i.test(phrase) ? "\\b" : "";
  const rx = new RegExp(`${boundary}${escapeRx(phrase)}${boundary}`, "gi");
  return (text.match(rx) || []).length;
}

const results = [];
let totals = {};
let exclamationTotal = 0;

for (const p of posts) {
  const text = [p.title, p.excerpt, p.body].filter(Boolean).join("\n");
  if (!text) continue;
  const hits = {};
  let score = 0;
  for (const [group, phrases] of Object.entries(GROUPS)) {
    for (const ph of phrases) {
      const n = countMatches(text, ph);
      if (n > 0) {
        hits[group] = hits[group] || [];
        hits[group].push(`${ph}×${n}`);
        if (group !== "Soft / verify") score += n;
        totals[ph] = (totals[ph] || 0) + n;
      }
    }
  }
  const bangs = (text.match(/!/g) || []).length;
  exclamationTotal += bangs;
  // Em-dash density per 500 words (target: max 2–3 per 500).
  const words = text.split(/\s+/).length;
  const emdashes = (text.match(/—/g) || []).length;
  const emPer500 = words ? (emdashes / words) * 500 : 0;

  if (score > 0 || bangs > 0 || emPer500 > 3) {
    results.push({ slug: p.slug, title: p.title, score, hits, bangs, emPer500, words });
  }
}

results.sort((a, b) => b.score - a.score || b.bangs - a.bangs);

const line = s => process.stdout.write(s + "\n");
line(`# Voice & Kill-List Audit`);
line("");
line(`Source: \`${file}\` — ${posts.length} posts scanned.`);
line(`Flagged: ${results.length}. Total hard violations: ${Object.entries(totals)
  .filter(([k]) => !GROUPS["Soft / verify"].includes(k))
  .reduce((s, [, n]) => s + n, 0)}. Exclamation marks: ${exclamationTotal}.`);
line("");
line(`> NOTE: if the source carries only excerpts, this audits headlines and`);
line(`> teasers only. Point \`--file\` at full essay text for the real sweep.`);
line("");
line(`## Worst offenders`);
line("");
for (const r of results.slice(0, 40)) {
  const groups = Object.entries(r.hits)
    .map(([g, arr]) => `${g}: ${arr.join(", ")}`)
    .join(" · ");
  const flags = [];
  if (r.bangs) flags.push(`! ×${r.bangs}`);
  if (r.emPer500 > 3) flags.push(`em-dash ${r.emPer500.toFixed(1)}/500`);
  line(`- **${r.title}** (\`${r.slug}\`) — score ${r.score}${flags.length ? " · " + flags.join(" · ") : ""}`);
  if (groups) line(`  - ${groups}`);
}
line("");
line(`## Total by phrase (hard violations)`);
line("");
Object.entries(totals)
  .filter(([k]) => !GROUPS["Soft / verify"].includes(k))
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, n]) => line(`- \`${k}\` — ${n}`));
