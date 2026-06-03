#!/usr/bin/env node
/**
 * scan-site-copy.mjs — LiveWell by James Bell
 *
 * Audits the user-facing copy baked into the React app (client/src) for the
 * same forbidden language as voice-audit.mjs. The hard part is telling prose
 * from code: `navigate` is React Router's hook, not the banned word. So this
 * only looks at text a visitor could actually read —
 *   - the contents of string / template literals, and
 *   - JSX prose lines (no code punctuation, several real words) —
 * and ignores everything else. Output is file:line + snippet, lower precision
 * than the essay audit, so treat each as a candidate to eyeball.
 *
 * Writes scripts/site-copy-audit.md and prints a summary.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import { auditText } from "./voice-audit.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "client", "src");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|jsx|js)$/.test(name)) out.push(p);
  }
  return out;
}

/** Pull only human-facing text out of a source line. */
function proseFromLine(line) {
  const trimmed = line.trim();
  if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("import")) return "";

  const parts = [];
  // string + template literal contents
  for (const m of line.matchAll(/"([^"]*)"|'([^']*)'|`([^`]*)`/g)) {
    const s = m[1] ?? m[2] ?? m[3] ?? "";
    // skip strings that are clearly not prose: urls, paths, class lists, identifiers
    if (/^[#/.]/.test(s) || /^[\w-]+$/.test(s) || /^https?:/.test(s)) continue;
    parts.push(s);
  }
  // a bare JSX prose line: no code punctuation, several words
  if (!/[{}()=;<>]/.test(line) && (line.match(/[A-Za-z]{2,}/g) || []).length >= 4) {
    parts.push(trimmed);
  }
  return parts.join("  ");
}

function main() {
  const files = walk(ROOT);
  const rows = [];
  let totalForbidden = 0;
  let totalReview = 0;

  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      const prose = proseFromLine(line);
      if (!prose) return;
      const r = auditText(prose);
      if (r.forbidden === 0 && r.review === 0) return;
      for (const f of r.findings) {
        rows.push({
          file: relative(join(__dirname, ".."), file),
          line: i + 1,
          severity: f.severity,
          term: f.term,
          text: line.trim().slice(0, 160),
        });
        if (f.severity === "forbidden") totalForbidden += f.count;
        else totalReview += f.count;
      }
    });
  }

  rows.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === "forbidden" ? -1 : 1));

  const md = [];
  md.push("# LiveWell Site-Copy Audit");
  md.push("");
  md.push(`Scanned \`client/src\` (${files.length} files).`);
  md.push("");
  md.push(
    `**${rows.length} candidate hits** — ${totalForbidden} forbidden, ${totalReview} review. ` +
      "Candidates only: this reads prose out of source, so eyeball each before changing it."
  );
  md.push("");
  md.push("| Severity | Term | Location | Line |");
  md.push("|----------|------|----------|------|");
  for (const r of rows) {
    md.push(`| ${r.severity === "forbidden" ? "**FORBIDDEN**" : "review"} | \`${r.term}\` | \`${r.file}:${r.line}\` | ${r.text.replace(/\|/g, "\\|")} |`);
  }
  md.push("");
  const outPath = join(__dirname, "site-copy-audit.md");
  writeFileSync(outPath, md.join("\n"));

  console.log(`Site-copy audit — ${files.length} files in client/src`);
  console.log(`${rows.length} candidate hits · ${totalForbidden} forbidden · ${totalReview} review`);
  for (const r of rows.filter((x) => x.severity === "forbidden")) {
    console.log(`  FORBIDDEN [${r.term}] ${r.file}:${r.line}`);
  }
  console.log(`\nFull report → ${outPath}`);
}

main();
