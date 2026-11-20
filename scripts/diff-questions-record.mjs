#!/usr/bin/env node
/**
 * diff-questions-record.mjs: proves a library piece's prose is word for word
 * the Markdown it came from. For every file in client/public/questions/ that
 * names a `record` (the pilot's Markdown in docs/work/elite/apol-pilot/), it
 * rebuilds the Markdown from the data and compares the two with whitespace
 * collapsed. Only whitespace and the move of a heading into a field may
 * differ; any other difference is printed and the script exits 1.
 *
 *   node scripts/diff-questions-record.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIR = path.join(ROOT, "client/public/questions");
const norm = (s) => s.replace(/\s+/g, " ").trim();
const list = (xs) => xs.map((x) => `- ${x}`).join("\n");

function pieceMarkdown(p) {
  const out = [`# ${p.question}`, "## The short answer", p.shortAnswer];
  for (const s of p.sections) {
    out.push(`## ${s.heading}`);
    if (s.role === "argument") out.push(s.intro, s.steps.map((t, i) => `${i + 1}. ${t}`).join("\n"), s.conclusion, s.after);
    else out.push(s.body);
  }
  out.push("## Read the other side", list(p.otherSide), "## Read further", list(p.further), "## On the site", list(p.onSite));
  return out.join("\n\n");
}

function areaMarkdown(a) {
  return [
    `# ${a.title}`, a.intro,
    "## The questions", a.pieces.map((x, i) => `${i + 1}. **${x.question}** ${x.blurb}`).join("\n"),
    "## Words these pages use", list(a.words.map((w) => `**${w.term}**: ${w.meaning}`)),
    "## Where else to look", list(a.elsewhere),
  ].join("\n\n");
}

let bad = 0, checked = 0;
for (const area of fs.readdirSync(DIR, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  for (const f of fs.readdirSync(path.join(DIR, area.name)).filter((x) => x.endsWith(".json"))) {
    const data = JSON.parse(fs.readFileSync(path.join(DIR, area.name, f), "utf8"));
    if (!data.record) continue;
    const md = fs.readFileSync(path.join(ROOT, data.record), "utf8").replace(/^---\n[\s\S]*?\n---\n/, "");
    const built = f === "_area.json" ? areaMarkdown(data) : pieceMarkdown(data);
    checked++;
    const a = norm(md), b = norm(built);
    if (a === b) { console.log(`ok   ${area.name}/${f} = ${data.record} (${a.split(" ").length} words)`); continue; }
    bad++;
    let i = 0;
    while (i < a.length && a[i] === b[i]) i++;
    console.log(`DIFF ${area.name}/${f} against ${data.record} at character ${i}:\n  record: …${a.slice(Math.max(0, i - 60), i + 80)}\n  data:   …${b.slice(Math.max(0, i - 60), i + 80)}`);
  }
}
console.log(`[questions-record] ${checked} files compared, ${bad} differ`);
process.exit(bad ? 1 : 0);
