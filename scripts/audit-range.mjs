// Usage: node scripts/audit-range.mjs <minNum> <maxNum>
// Audits content/drafts/full-<n>-*.md for n in [min,max], prints forbidden findings.
import { readFileSync, readdirSync } from "node:fs";
import { auditText } from "./voice-audit.mjs";

const min = Number(process.argv[2] ?? 0);
const max = Number(process.argv[3] ?? 9999);
let bad = 0, total = 0;
for (const f of readdirSync("content/drafts").sort()) {
  const m = f.match(/^full-(\d+)-/);
  if (!m) continue;
  const n = Number(m[1]);
  if (n < min || n > max) continue;
  total++;
  const body = readFileSync("content/drafts/" + f, "utf8")
    .replace(/^---[\s\S]*?---/, "").replace(/^>.*$/gm, "");
  const r = auditText(body);
  const forb = r.findings.filter((x) => x.severity === "forbidden");
  if (forb.length) {
    bad++;
    console.log("FORBIDDEN " + f + " :: " + forb.map((x) => `${x.term}(${x.count})`).join(", "));
  }
}
console.log(`\n${total} files checked, ${bad} with forbidden terms.`);
process.exit(bad ? 1 : 0);
