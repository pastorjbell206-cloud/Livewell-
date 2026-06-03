// Usage: node scripts/audit-full.mjs   -> audits all content/full/*.md
// Flags any file under 1500 body words or containing forbidden terms.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { auditText } from "./voice-audit.mjs";
const dir = "content/full";
if (!existsSync(dir)) { console.log("no content/full yet"); process.exit(0); }
const wc = (s) => s.trim().split(/\s+/).filter(Boolean).length;
let under = 0, forb = 0, ok = 0, total = 0;
for (const f of readdirSync(dir).filter((x) => x.endsWith(".md")).sort()) {
  total++;
  const raw = readFileSync(dir + "/" + f, "utf8");
  const body = raw.replace(/^---[\s\S]*?---/, "").trim();
  const w = wc(body);
  const r = auditText(body);
  const bad = r.findings.filter((x) => x.severity === "forbidden");
  const probs = [];
  if (w < 1500) { probs.push(`UNDER(${w}w)`); under++; }
  if (bad.length) { probs.push("FORBIDDEN:" + bad.map((x) => x.term).join(",")); forb++; }
  if (probs.length) console.log(f + " :: " + probs.join("  "));
  else ok++;
}
console.log(`\n${total} files | ${ok} clean & >=1500w | ${under} under-length | ${forb} with forbidden`);
process.exit(under || forb ? 1 : 0);
