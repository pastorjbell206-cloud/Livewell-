#!/usr/bin/env node
/**
 * report-completeness.mjs — internal, NOT reader-facing.
 *
 * WI-3 moved the "N written so far, the rest are coming" counters off the
 * public pillar hubs. This is where the author can still see written-vs-planned
 * at a glance, without exposing scaffolding to first-time readers.
 *
 *   node scripts/report-completeness.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function count(rel, label) {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const ready = (src.match(/ready:\s*true/g) || []).length;
  const notReady = (src.match(/ready:\s*false/g) || []).length;
  const total = ready + notReady;
  const pct = total ? Math.round((ready / total) * 100) : 100;
  console.log(`  ${label}: ${ready}/${total} worked (${pct}%)${notReady ? ` — ${notReady} planned` : ""}`);
  return { ready, total };
}

console.log("Completeness (internal report):");
count("client/src/lib/theology.ts", "Theology doctrines");
count("client/src/lib/prophetic.ts", "Prophetic topics (disruption + justice)");
console.log("\nReader-facing hubs show only worked items as finished collections (WI-3).");
