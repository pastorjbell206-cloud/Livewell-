#!/usr/bin/env node
/**
 * voice-audit.mjs — LiveWell by James Bell
 *
 * Mechanical check against the forbidden language in CLAUDE.md. This does NOT
 * judge whether a sentence sounds like Bell — that needs a human. What it does
 * is reliable and worth doing first: it finds every forbidden word, phrase,
 * therapy-ism, and signpost, then ranks the essays by how much human attention
 * they need so you read the worst ones first.
 *
 * Input:  a corpus JSON — an array of { title, slug, body, pillar, published }.
 *         Defaults to scripts/.essays-export.json (the live DB export) and
 *         falls back to scripts/.essays-corpus.json (the from-repo dry-run set).
 *         Override with:  node scripts/voice-audit.mjs <path-to-corpus.json>
 *
 * Output: scripts/voice-audit-report.json  (machine-readable, full detail)
 *         scripts/voice-audit-report.md     (ranked human report)
 *         and a ranked summary printed to the console.
 *
 * Severities:
 *   forbidden — an exact match on the banned list. Should almost always change.
 *   review    — a flagged term that CLAUDE.md only forbids in a specific sense
 *               ("journey" as metaphor, "blessed" as adjective). A human decides.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── The forbidden lists, lifted verbatim from CLAUDE.md ──────────────────

/** Single words. Flagged wherever they appear, as whole words. */
// Note: "foster" is on CLAUDE.md's forbidden list but handled separately below
// so the literal "foster care" noun isn't miscounted as filler.
const FORBIDDEN_WORDS = [
  "delve", "leverage", "unlock", "transformative", "navigate", "tapestry",
  "unpack", "landscape", "nuanced", "multifaceted", "holistic",
];

/** Multi-word phrases. Apostrophes are normalized so curly/straight both match. */
const FORBIDDEN_PHRASES = [
  "in today's world", "now more than ever", "here's the thing",
  "i want to be real with you", "god's got this", "gospel-centered",
  "authentic community",
];

const THERAPY_SPEAK = [
  "hold space", "your truth", "do the work", "your feelings are valid",
  "lean into", "showing up",
];

/** Structural signposting — the moves CLAUDE.md says to avoid. */
const SIGNPOSTING = [
  "here is what i mean", "here's what i mean", "let me explain",
  "what i mean is", "in other words", "to put it simply",
];

/**
 * Context-dependent terms. CLAUDE.md forbids these only in one sense, so we
 * surface them for a human rather than calling them violations outright.
 */
const REVIEW_WORDS = [
  { term: "journey", note: "forbidden only as a metaphor — fine if literal travel" },
  { term: "authentic", note: "forbidden as filler; 'authentic community' is a hard ban (caught separately)" },
];
const REVIEW_PHRASES = [
  { term: "blessed", note: "forbidden as an adjective ('blessed life'); fine as a verb ('God blessed them')" },
];

// ─── Matching ─────────────────────────────────────────────────────────────

/** Normalize curly apostrophes/quotes to straight so phrase matching is stable. */
function normalize(text) {
  return text
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"');
}

/** Strip a little markdown so we audit prose, not syntax. */
function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/[#>*_~]/g, " "); // heading/emphasis markers
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Count word-boundary matches and capture a short context snippet for each. */
function findMatches(haystack, needle) {
  const re = new RegExp(`\\b${escapeRegExp(needle)}\\b`, "gi");
  const hits = [];
  let m;
  while ((m = re.exec(haystack)) !== null) {
    const start = Math.max(0, m.index - 35);
    const end = Math.min(haystack.length, m.index + needle.length + 35);
    const snippet = haystack
      .slice(start, end)
      .replace(/\s+/g, " ")
      .trim();
    hits.push({ index: m.index, snippet: `…${snippet}…` });
    if (hits.length >= 25) break; // cap noise on pathological cases
  }
  return hits;
}

function wordCount(text) {
  const words = text.trim().match(/\S+/g);
  return words ? words.length : 0;
}

// ─── Audit one essay ────────────────────────────────────────────────────────

export function auditText(rawBody, rawTitle = "") {
  const text = normalize(stripMarkdown(`${rawTitle}\n\n${rawBody}`));
  const findings = [];

  const collect = (category, severity, term, note) => {
    const hits = findMatches(text, term);
    if (hits.length > 0) {
      findings.push({ category, severity, term, note, count: hits.length, hits });
    }
  };

  for (const w of FORBIDDEN_WORDS) collect("forbidden-word", "forbidden", w);

  // "foster" is banned as filler ("foster community"), but "foster care /
  // parent / child / family / home / system" is a literal noun the justice
  // essays use legitimately. Catch it, but as a judgment call, not a violation.
  {
    const hits = findMatches(text, "foster");
    const literal = (s) => /\bfoster\s+(care|parent|child|famil|home|system|youth)/i.test(s);
    const filler = hits.filter((h) => !literal(h.snippet));
    const literalHits = hits.filter((h) => literal(h.snippet));
    if (filler.length)
      findings.push({ category: "forbidden-word", severity: "forbidden", term: "foster", count: filler.length, hits: filler });
    if (literalHits.length)
      findings.push({
        category: "review-word", severity: "review", term: "foster",
        note: "literal 'foster care/parent/etc.' — almost certainly fine; flagged only because 'foster' is on the filler list",
        count: literalHits.length, hits: literalHits,
      });
  }
  for (const p of FORBIDDEN_PHRASES) collect("forbidden-phrase", "forbidden", p);
  for (const t of THERAPY_SPEAK) collect("therapy-speak", "forbidden", t);
  for (const s of SIGNPOSTING) collect("signposting", "forbidden", s);
  for (const { term, note } of REVIEW_WORDS) collect("review-word", "review", term, note);
  for (const { term, note } of REVIEW_PHRASES) collect("review-word", "review", term, note);

  const forbidden = findings
    .filter((f) => f.severity === "forbidden")
    .reduce((n, f) => n + f.count, 0);
  const review = findings
    .filter((f) => f.severity === "review")
    .reduce((n, f) => n + f.count, 0);

  return {
    words: wordCount(text),
    forbidden,
    review,
    findings: findings.sort((a, b) =>
      a.severity === b.severity ? b.count - a.count : a.severity === "forbidden" ? -1 : 1
    ),
  };
}

// ─── Corpus loading ───────────────────────────────────────────────────────

function loadCorpus(explicitPath) {
  const candidates = explicitPath
    ? [resolve(explicitPath)]
    : [join(__dirname, ".essays-export.json"), join(__dirname, ".essays-corpus.json")];

  for (const p of candidates) {
    if (existsSync(p)) {
      const data = JSON.parse(readFileSync(p, "utf8"));
      const items = Array.isArray(data) ? data : data.posts;
      if (!Array.isArray(items)) {
        throw new Error(`${p} is not an array of essays (or { posts: [...] }).`);
      }
      return { path: p, items };
    }
  }
  throw new Error(
    "No corpus found. Run `node scripts/db-export-essays.mjs` (live) or " +
      "`node scripts/build-audit-corpus.mjs` (from-repo dry run) first, " +
      "or pass a path: node scripts/voice-audit.mjs <corpus.json>"
  );
}

// ─── Report ─────────────────────────────────────────────────────────────────

function rank(results) {
  // Worst first: forbidden hits dominate, review hits break ties, then density.
  return [...results].sort((a, b) => {
    if (b.forbidden !== a.forbidden) return b.forbidden - a.forbidden;
    if (b.review !== a.review) return b.review - a.review;
    return b.densityPer1k - a.densityPer1k;
  });
}

function buildMarkdown(ranked, corpusPath) {
  const flagged = ranked.filter((r) => r.forbidden > 0 || r.review > 0);
  const clean = ranked.length - flagged.length;
  const totalForbidden = ranked.reduce((n, r) => n + r.forbidden, 0);
  const totalReview = ranked.reduce((n, r) => n + r.review, 0);

  const lines = [];
  lines.push("# LiveWell Voice Audit");
  lines.push("");
  lines.push(`Source corpus: \`${corpusPath}\``);
  lines.push("");
  lines.push(
    `**${ranked.length} essays scanned** — ${flagged.length} need a human pass, ` +
      `${clean} are mechanically clean. ` +
      `${totalForbidden} hard forbidden hits, ${totalReview} judgment-call flags.`
  );
  lines.push("");
  lines.push(
    "_Mechanical only. A clean score means no banned words — not that the prose " +
      "carries Bell's voice. Read the top of this list first._"
  );
  lines.push("");
  lines.push("## Ranked — essays needing the most attention");
  lines.push("");
  lines.push("| # | Essay | Forbidden | Review | per 1k words |");
  lines.push("|--:|-------|----------:|-------:|-------------:|");
  flagged.forEach((r, i) => {
    lines.push(
      `| ${i + 1} | ${r.title || r.slug} | ${r.forbidden} | ${r.review} | ${r.densityPer1k.toFixed(1)} |`
    );
  });
  lines.push("");
  lines.push("## Detail (flagged essays only)");
  lines.push("");
  for (const r of flagged) {
    lines.push(`### ${r.title || r.slug}`);
    if (r.slug) lines.push(`\`${r.slug}\`${r.published === false ? " — _(draft)_" : ""}`);
    lines.push("");
    for (const f of r.findings) {
      const tag = f.severity === "forbidden" ? "**FORBIDDEN**" : "_review_";
      lines.push(`- ${tag} · \`${f.term}\` · ${f.count}× · ${f.category}`);
      if (f.note) lines.push(`  - ${f.note}`);
      for (const h of f.hits.slice(0, 3)) lines.push(`  - ${h.snippet}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function main() {
  const arg = process.argv[2];
  const { path: corpusPath, items } = loadCorpus(arg);

  const results = items.map((it) => {
    const audit = auditText(it.body || "", it.title || "");
    return {
      title: it.title || "",
      slug: it.slug || "",
      pillar: it.pillar || null,
      published: it.published,
      words: audit.words,
      forbidden: audit.forbidden,
      review: audit.review,
      densityPer1k: audit.words > 0 ? (audit.forbidden / audit.words) * 1000 : 0,
      findings: audit.findings,
    };
  });

  const ranked = rank(results);
  const flagged = ranked.filter((r) => r.forbidden > 0 || r.review > 0);

  const reportJsonPath = join(__dirname, "voice-audit-report.json");
  const reportMdPath = join(__dirname, "voice-audit-report.md");
  writeFileSync(
    reportJsonPath,
    JSON.stringify({ corpus: corpusPath, generatedAt: new Date().toISOString(), results: ranked }, null, 2)
  );
  writeFileSync(reportMdPath, buildMarkdown(ranked, corpusPath));

  // Console summary
  const totalForbidden = ranked.reduce((n, r) => n + r.forbidden, 0);
  const totalReview = ranked.reduce((n, r) => n + r.review, 0);
  console.log(`\nVoice audit — corpus: ${corpusPath}`);
  console.log(
    `${ranked.length} essays · ${flagged.length} need a human pass · ` +
      `${totalForbidden} forbidden hits · ${totalReview} review flags\n`
  );
  console.log("Top essays to read first:");
  flagged.slice(0, 15).forEach((r, i) => {
    console.log(
      `  ${String(i + 1).padStart(2)}. [${r.forbidden}F ${r.review}R] ${r.title || r.slug}`
    );
  });
  console.log(`\nFull report → ${reportMdPath}`);
  console.log(`Machine detail → ${reportJsonPath}\n`);
}

// Run as CLI, stay importable for tests.
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
