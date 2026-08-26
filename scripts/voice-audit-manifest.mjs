#!/usr/bin/env node
/**
 * voice-audit-manifest.mjs — the completeness spine of the voice audit.
 *
 * The reason a corpus audit drifts is never bad intent. It is that nobody can
 * see what was skipped. Five hundred thousand words do not fit in one sitting,
 * so a reviewer reads the interesting pieces, writes a confident summary, and
 * the untouched remainder disappears without anyone lying about it.
 *
 * This script removes that possibility. It enumerates every auditable unit on
 * the site, writes one row per unit to a ledger, and refuses to report the work
 * finished while a single row is still pending.
 *
 *   node scripts/voice-audit-manifest.mjs --init     build the ledger (safe: keeps verdicts)
 *   node scripts/voice-audit-manifest.mjs --stats    coverage by kind and status
 *   node scripts/voice-audit-manifest.mjs --next 12  the next unaudited batch
 *   node scripts/voice-audit-manifest.mjs --verify   exit 1 if anything is unaudited
 *
 * The ledger is docs/audit-voice/ledger.json. It is the audit's memory across
 * sessions: --init re-reads the corpus and adds new units without discarding
 * verdicts already recorded.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const LEDGER_DIR = join(ROOT, "docs", "audit-voice");
const LEDGER = join(LEDGER_DIR, "ledger.json");

/** A unit is a stub, not an essay, below this. Stubs cannot be voice-audited. */
const STUB_WORDS = 200;

const words = (s) => (s || "").split(/\s+/).filter(Boolean).length;

/** Every .tsx under a directory, recursively. */
function walkTsx(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkTsx(p, out);
    else if (name.endsWith(".tsx") && !name.endsWith(".test.tsx")) out.push(p);
  }
  return out;
}

/**
 * Prose blocks in a page component: string literals long enough to be a
 * sentence a reader actually reads, rather than a class name or a route.
 */
function prosePages() {
  const pages = walkTsx(join(ROOT, "client", "src", "pages"));
  const rows = [];
  for (const file of pages) {
    const src = readFileSync(file, "utf8");
    const blocks = src.match(/"[^"\\]{140,}"/g) || [];
    if (!blocks.length) continue;
    rows.push({
      kind: "page",
      ref: relative(ROOT, file),
      words: blocks.reduce((a, b) => a + words(b), 0),
      blocks: blocks.length,
    });
  }
  return rows;
}

function corpusUnits() {
  const data = JSON.parse(readFileSync(join(ROOT, "client", "src", "data", "content-data.json"), "utf8"));
  const rows = [];

  for (const p of data.posts || []) {
    const n = words(p.body);
    rows.push({
      kind: n < STUB_WORDS ? "stub" : "essay",
      ref: p.slug,
      title: p.title || "",
      pillar: p.pillar || "(none)",
      words: n,
    });
  }

  for (const b of data.books || []) {
    rows.push({ kind: "book", ref: b.slug, title: b.title || "", words: words(b.description) });
  }

  rows.push(...prosePages());

  // Content-as-data libraries: the JSON the long-form tools read from.
  const pub = join(ROOT, "client", "public");
  for (const name of readdirSync(pub)) {
    if (name.endsWith(".json")) {
      rows.push({ kind: "library", ref: `client/public/${name}`, words: words(readFileSync(join(pub, name), "utf8")) });
    }
  }

  return rows;
}

function load() {
  if (!existsSync(LEDGER)) return { created: new Date().toISOString(), units: {} };
  return JSON.parse(readFileSync(LEDGER, "utf8"));
}

function save(l) {
  mkdirSync(LEDGER_DIR, { recursive: true });
  writeFileSync(LEDGER, JSON.stringify(l, null, 2) + "\n");
}

function init() {
  const ledger = load();
  let added = 0;
  for (const u of corpusUnits()) {
    const id = `${u.kind}:${u.ref}`;
    if (ledger.units[id]) {
      Object.assign(ledger.units[id], { words: u.words, pillar: u.pillar ?? ledger.units[id].pillar });
      continue;
    }
    ledger.units[id] = { ...u, id, status: "pending", verdict: null, notes: null, auditedAt: null };
    added++;
  }
  save(ledger);
  const total = Object.keys(ledger.units).length;
  console.log(`ledger: ${LEDGER}`);
  console.log(`units: ${total} total, ${added} newly added`);
  stats();
}

function groupCounts(units, key) {
  const m = {};
  for (const u of units) m[u[key]] = (m[u[key]] || 0) + 1;
  return m;
}

function stats() {
  const ledger = load();
  const units = Object.values(ledger.units);
  if (!units.length) return console.log("ledger empty — run --init");

  const byKind = groupCounts(units, "kind");
  const byStatus = groupCounts(units, "status");
  const done = units.filter((u) => u.status !== "pending").length;

  console.log(`\ncoverage: ${done}/${units.length} (${Math.round((done / units.length) * 100)}%)`);
  console.log("\nby kind:");
  for (const [k, v] of Object.entries(byKind).sort((a, b) => b[1] - a[1])) {
    const kindDone = units.filter((u) => u.kind === k && u.status !== "pending").length;
    console.log(`  ${k.padEnd(9)} ${String(kindDone).padStart(4)}/${String(v).padEnd(5)} audited`);
  }
  console.log("\nby status:");
  for (const [k, v] of Object.entries(byStatus).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k.padEnd(10)} ${v}`);
  }
  const prose = units.filter((u) => u.kind === "essay").reduce((a, u) => a + u.words, 0);
  console.log(`\nessay prose under audit: ${prose.toLocaleString()} words`);
}

function next(n) {
  const ledger = load();
  const pending = Object.values(ledger.units).filter((u) => u.status === "pending");
  if (!pending.length) return console.log("nothing pending — the corpus is fully audited");

  // Hardest first: the longest essays carry the most voice, and auditing them
  // while attention is fresh is the difference between a read and a skim.
  const order = { essay: 0, page: 1, book: 2, library: 3, stub: 4 };
  pending.sort((a, b) => (order[a.kind] - order[b.kind]) || b.words - a.words);

  console.log(`next ${Math.min(n, pending.length)} of ${pending.length} pending:\n`);
  for (const u of pending.slice(0, n)) {
    console.log(`  ${u.id}`);
    console.log(`      ${u.words} words${u.pillar ? ` · ${u.pillar}` : ""}${u.title ? ` · ${u.title}` : ""}`);
  }
}

function verify() {
  const ledger = load();
  const units = Object.values(ledger.units);
  const pending = units.filter((u) => u.status === "pending");
  const audited = units.length - pending.length;

  if (pending.length) {
    console.error(`INCOMPLETE — ${audited}/${units.length} audited, ${pending.length} still pending.`);
    const byKind = groupCounts(pending, "kind");
    for (const [k, v] of Object.entries(byKind)) console.error(`  ${k}: ${v} pending`);
    console.error(`\nThe audit is not finished. Do not report it as finished.`);
    process.exit(1);
  }
  console.log(`COMPLETE — all ${units.length} units carry a verdict.`);
}

const arg = process.argv[2];
if (arg === "--init") init();
else if (arg === "--stats") stats();
else if (arg === "--verify") verify();
else if (arg === "--next") next(parseInt(process.argv[3] || "10", 10));
else {
  console.log("usage: --init | --stats | --next <n> | --verify");
  process.exit(1);
}
