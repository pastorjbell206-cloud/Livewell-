#!/usr/bin/env node
/**
 * site-audit-manifest.mjs — the completeness spine of the world-class site
 * work (docs/WORLD-CLASS-SITE-PROMPT.md).
 *
 * Same idea as voice-audit-manifest.mjs: enumerate every surface a reader can
 * reach, one row each, and refuse to call the work finished while a row is
 * still pending. Units:
 *
 *   route    every concrete (non-parameterised) route in client/src/App.tsx
 *   tool     every tool registered in client/src/pages/ToolsHub.tsx
 *   nav      every header/footer link in client/src/lib/siteNav.ts
 *   library  the church-history JSON files + the history essay index
 *   reading  the essay reading experience, as one unit
 *
 *   node scripts/site-audit-manifest.mjs --init      build/refresh the ledger (keeps verdicts)
 *   node scripts/site-audit-manifest.mjs --stats     coverage by kind and status
 *   node scripts/site-audit-manifest.mjs --next 12   next unaudited batch
 *   node scripts/site-audit-manifest.mjs --verify    exit 1 if anything is pending
 *   node scripts/site-audit-manifest.mjs --routes    print the concrete route list (for walkers)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const DIR = join(ROOT, "docs", "audit-site");
const LEDGER = join(DIR, "ledger.json");

function routes() {
  const src = readFileSync(join(ROOT, "client", "src", "App.tsx"), "utf8");
  const found = new Set();
  for (const m of src.matchAll(/<Route\s+path="([^"]+)"/g)) {
    const p = m[1];
    if (p.includes(":") || p.includes("*")) continue;
    found.add(p);
  }
  return [...found].sort();
}

function tools() {
  const src = readFileSync(join(ROOT, "client", "src", "pages", "ToolsHub.tsx"), "utf8");
  return [...new Set([...src.matchAll(/href:\s*"(\/tools\/[^"]+)"/g)].map((m) => m[1]))].sort();
}

function navLinks() {
  const src = readFileSync(join(ROOT, "client", "src", "lib", "siteNav.ts"), "utf8");
  const out = [];
  for (const m of src.matchAll(/\{\s*label:\s*"([^"]+)",\s*href:\s*"([^"]+)"/g)) out.push({ label: m[1], href: m[2] });
  return out;
}

function libraries() {
  const out = [];
  const th = join(ROOT, "client", "public", "theology");
  if (existsSync(th)) for (const f of readdirSync(th)) if (f.startsWith("church-history-")) out.push(`client/public/theology/${f}`);
  const hi = join(ROOT, "client", "public", "history", "essays-index.json");
  if (existsSync(hi)) out.push("client/public/history/essays-index.json");
  return out;
}

function units() {
  const rows = [];
  for (const r of routes()) rows.push({ kind: "route", ref: r });
  for (const t of tools()) rows.push({ kind: "tool", ref: t });
  for (const l of navLinks()) rows.push({ kind: "nav", ref: `${l.href}`, label: l.label });
  for (const l of libraries()) rows.push({ kind: "library", ref: l });
  rows.push({ kind: "reading", ref: "client/src/pages/ArticleDetail.tsx", label: "the essay reading experience" });
  return rows;
}

const load = () => (existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, "utf8")) : { created: new Date().toISOString(), units: {} });
const save = (l) => { mkdirSync(DIR, { recursive: true }); writeFileSync(LEDGER, JSON.stringify(l, null, 2) + "\n"); };

function init() {
  const ledger = load();
  let added = 0;
  for (const u of units()) {
    const id = `${u.kind}:${u.ref}`;
    if (ledger.units[id]) continue;
    ledger.units[id] = { ...u, id, status: "pending", verdict: null, notes: null, auditedAt: null };
    added++;
  }
  save(ledger);
  console.log(`ledger: ${LEDGER}\nunits: ${Object.keys(ledger.units).length} total, ${added} newly added`);
  stats();
}

function stats() {
  const us = Object.values(load().units);
  if (!us.length) return console.log("ledger empty — run --init");
  const done = us.filter((u) => u.status !== "pending").length;
  console.log(`\ncoverage: ${done}/${us.length} (${Math.round((done / us.length) * 100)}%)\n\nby kind:`);
  const kinds = {};
  for (const u of us) kinds[u.kind] = kinds[u.kind] || { n: 0, d: 0 }, kinds[u.kind].n++, u.status !== "pending" && kinds[u.kind].d++;
  for (const [k, v] of Object.entries(kinds)) console.log(`  ${k.padEnd(8)} ${String(v.d).padStart(4)}/${String(v.n).padEnd(5)} audited`);
  const st = {};
  for (const u of us) st[u.status] = (st[u.status] || 0) + 1;
  console.log("\nby status:");
  for (const [k, v] of Object.entries(st)) console.log(`  ${k.padEnd(10)} ${v}`);
}

function next(n) {
  const pend = Object.values(load().units).filter((u) => u.status === "pending");
  if (!pend.length) return console.log("nothing pending — the site ledger is complete");
  const order = { reading: 0, tool: 1, route: 2, library: 3, nav: 4 };
  pend.sort((a, b) => order[a.kind] - order[b.kind]);
  console.log(`next ${Math.min(n, pend.length)} of ${pend.length} pending:\n`);
  for (const u of pend.slice(0, n)) console.log(`  ${u.id}${u.label ? `   · ${u.label}` : ""}`);
}

function verify() {
  const us = Object.values(load().units);
  const pend = us.filter((u) => u.status === "pending");
  if (pend.length) {
    console.error(`INCOMPLETE — ${us.length - pend.length}/${us.length} audited, ${pend.length} still pending.`);
    const k = {};
    for (const u of pend) k[u.kind] = (k[u.kind] || 0) + 1;
    for (const [a, b] of Object.entries(k)) console.error(`  ${a}: ${b} pending`);
    console.error("\nThe site work is not finished. Do not report it as finished.");
    process.exit(1);
  }
  console.log(`COMPLETE — all ${us.length} units carry a verdict.`);
}

const arg = process.argv[2];
if (arg === "--init") init();
else if (arg === "--stats") stats();
else if (arg === "--verify") verify();
else if (arg === "--next") next(parseInt(process.argv[3] || "10", 10));
else if (arg === "--routes") console.log(routes().join("\n"));
else { console.log("usage: --init | --stats | --next <n> | --verify | --routes"); process.exit(1); }
