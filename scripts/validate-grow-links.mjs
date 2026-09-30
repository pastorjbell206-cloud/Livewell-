#!/usr/bin/env node
/**
 * validate-grow-links.mjs — no dead ends in the Grow section.
 *
 * docs/grow/GROW-PROMPT.md, Section 11: zero links from any Grow resource to a
 * retired, redirected, or missing route. This walks the section's content
 * libraries (care plans, life pages, how-tos, wisdom topics, study guides, the
 * needs registry and care pages) and its pages (help, tools, assessments,
 * plans, start, downloads), resolves every internal href against the route
 * table and the library manifests (scripts/lib/site-routes.mjs), and fails on
 * any link that is missing or that only works through a redirect.
 *
 *   node scripts/validate-grow-links.mjs          CI gate
 *   node scripts/validate-grow-links.mjs --report print findings, exit 0
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, resolveHref, hrefsIn, listFiles } from "./lib/site-routes.mjs";

const REPORT = process.argv.includes("--report");

const FILES = [
  ...listFiles("client/public/plans", [".json"]),
  ...listFiles("client/public/life", [".json"]),
  ...listFiles("client/public/howtos", [".json"]),
  ...listFiles("client/public/wisdom", [".json"]),
  ...listFiles("client/public/studyguides", [".json"]),
  ...listFiles("client/public/needs", [".json"]),
  "client/src/pages/Help.tsx",
  "client/src/pages/Assessments.tsx",
  "client/src/pages/ToolsHub.tsx",
  "client/src/pages/StartHereQuiz.tsx",
  "client/src/pages/StartHereDiagnostic.tsx",
  "client/src/pages/Diagnostic.tsx",
  "client/src/pages/Downloads.tsx",
  ...listFiles("client/src/pages/tools", [".tsx"]),
  ...listFiles("client/src/pages/plans", [".tsx"]),
  ...listFiles("client/src/pages/life", [".tsx"]),
  ...listFiles("client/src/pages/help", [".tsx"]),
  "client/src/components/CrisisBlock.tsx",
];

// Retired tools: their routes redirect to /tools and nothing imports them, so
// no reader can reach the links inside.
const RETIRED = new Set([
  "client/src/pages/tools/PastorBurnout.tsx",
  "client/src/pages/tools/ChurchHealth.tsx",
  "client/src/pages/tools/DiscipleshipTable.tsx",
  "client/src/pages/tools/SermonOutline.tsx",
]);

const findings = [];
for (const rel of new Set(FILES)) {
  if (RETIRED.has(rel)) continue;
  let text;
  try { text = readFileSync(join(ROOT, rel), "utf8"); } catch { continue; }
  for (const href of hrefsIn(text)) {
    const r = resolveHref(href);
    if (r.status === "missing") findings.push({ rel, href, why: "missing" });
    else if (r.status === "redirect") findings.push({ rel, href, why: `redirects to ${r.to}` });
  }
}

if (findings.length) {
  const byFile = new Map();
  for (const f of findings) {
    if (!byFile.has(f.rel)) byFile.set(f.rel, []);
    byFile.get(f.rel).push(f);
  }
  console[REPORT ? "log" : "error"](`\nGrow links: ${findings.length} finding(s) in ${byFile.size} file(s)\n`);
  for (const [rel, fs] of byFile) {
    console[REPORT ? "log" : "error"](`  ${rel}`);
    for (const f of fs) console[REPORT ? "log" : "error"](`    ${f.href}  (${f.why})`);
  }
  if (!REPORT) {
    console.error("\nPoint each link at the live page itself: a redirect's destination, or the");
    console.error("closest live page for a retired one (see scripts/lib/site-routes.mjs).\n");
    process.exit(1);
  }
} else {
  console.log(`Grow links: clean (${new Set(FILES).size} files checked).`);
}
