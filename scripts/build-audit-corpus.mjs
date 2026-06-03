#!/usr/bin/env node
/**
 * build-audit-corpus.mjs — LiveWell by James Bell
 *
 * Builds a dry-run corpus for voice-audit.mjs WITHOUT touching the database, by
 * harvesting the full essay text already committed to the repo:
 *
 *   - scripts/*.mjs content scripts  — full essays in `body: ` template literals
 *   - scripts/*.sql seed files       — full essays in INSERT INTO posts/articles
 *   - scripts/content-data.json      — the seed set (mostly short summaries)
 *
 * Essays are deduped by slug; when the same slug appears twice we keep the
 * longest body (the full essay beats the summary). Output:
 * scripts/.essays-corpus.json — the same shape db-export-essays.mjs produces, so
 * voice-audit.mjs reads either one transparently.
 *
 * This is a stand-in for the live export so you can see a real ranked report
 * now. It is NOT the full 161 essays — it is whatever full text lives in the
 * repo. The console prints exactly how many it found and from where.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, ".essays-corpus.json");

const SELF = new Set([
  "voice-audit.mjs",
  "db-export-essays.mjs",
  "build-audit-corpus.mjs",
]);

/** Read a backtick template-literal body starting just after the opening `. */
function readTemplateBody(text, openIdx) {
  let i = openIdx;
  let out = "";
  while (i < text.length) {
    const ch = text[i];
    if (ch === "\\") {
      out += text[i + 1] ?? "";
      i += 2;
      continue;
    }
    if (ch === "`") return { body: out, end: i };
    out += ch;
    i++;
  }
  return null; // unterminated — skip
}

/** Find the last `field: "..."` (or '...') value before position `before`. */
function lastFieldBefore(text, field, before) {
  const re = new RegExp(`${field}:\\s*("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')`, "g");
  let last = null;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > before) break;
    last = m[1];
  }
  if (!last) return null;
  // Unquote + unescape just enough for our purposes.
  return last.slice(1, -1).replace(/\\(["'`\\])/g, "$1").replace(/\\n/g, "\n");
}

function harvestMjs(text) {
  const found = [];
  const re = /body:\s*`/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const open = m.index + m[0].length;
    const read = readTemplateBody(text, open);
    if (!read) continue;
    const before = m.index;
    found.push({
      title: lastFieldBefore(text, "title", before) || "",
      slug: lastFieldBefore(text, "slug", before) || "",
      pillar: lastFieldBefore(text, "pillar", before) || null,
      body: read.body.trim(),
      published: true,
    });
    re.lastIndex = read.end + 1;
  }
  return found;
}

/**
 * Parse `INSERT INTO <table> (<cols>) VALUES (...), (...);` statements,
 * mapping each row's fields to the declared columns. Handles SQL single-quoted
 * strings with '' escaping. body comes from a `body` or `content` column.
 */
function harvestSql(text) {
  const found = [];
  const insertRe = /INSERT\s+INTO\s+`?(\w+)`?\s*\(([^)]*)\)\s*VALUES/gi;
  let m;
  while ((m = insertRe.exec(text)) !== null) {
    const cols = m[2].split(",").map((c) => c.trim().replace(/`/g, "").toLowerCase());
    const iTitle = cols.indexOf("title");
    const iSlug = cols.indexOf("slug");
    const iPillar = cols.indexOf("pillar");
    const iBody = cols.indexOf("body") !== -1 ? cols.indexOf("body") : cols.indexOf("content");
    if (iBody === -1) continue;

    // Skip whitespace, commas, and `-- ...` line comments between tuples.
    const skipGaps = (pos) => {
      while (pos < text.length) {
        if (/[\s,]/.test(text[pos])) { pos++; continue; }
        if (text[pos] === "-" && text[pos + 1] === "-") {
          const nl = text.indexOf("\n", pos);
          if (nl === -1) return text.length;
          pos = nl + 1;
          continue;
        }
        break;
      }
      return pos;
    };

    // Walk from end of VALUES, parsing row tuples until the terminating `;`.
    let i = insertRe.lastIndex;
    while (i < text.length) {
      i = skipGaps(i);
      if (text[i] === ";" || text[i] !== "(") break;
      i++; // consume the tuple's opening '('
      const fields = [];
      let cur = "";
      let inStr = false;
      let depth = 0; // paren depth for unquoted regions, e.g. NOW()
      while (i < text.length) {
        const ch = text[i];
        if (inStr) {
          if (ch === "'") {
            if (text[i + 1] === "'") { cur += "'"; i += 2; continue; }
            inStr = false; i++; continue;
          }
          if (ch === "\\" && text[i + 1] !== undefined) { cur += text[i + 1]; i += 2; continue; }
          cur += ch; i++; continue;
        }
        if (ch === "'") { inStr = true; i++; continue; }
        if (ch === "(") { depth++; cur += ch; i++; continue; }
        if (ch === ")" && depth > 0) { depth--; cur += ch; i++; continue; }
        if (ch === ",") { fields.push(cur.trim()); cur = ""; i++; continue; }
        if (ch === ")") { fields.push(cur.trim()); i++; break; } // closes the tuple
        cur += ch; i++;
      }
      const val = (idx) => {
        if (idx === -1 || idx >= fields.length) return "";
        const f = fields[idx];
        if (f === "" || /^(NULL|NOW\(\)|true|false|\d+)$/i.test(f)) return f.replace(/^['"]|['"]$/g, "");
        return f.replace(/^['"]|['"]$/g, "");
      };
      const body = val(iBody);
      // Lower bound drops headers; upper bound drops any runaway parse that
      // swallowed past a row boundary (real essays are well under this).
      if (body && body.length > 50 && body.length < 60000) {
        found.push({
          title: val(iTitle),
          slug: val(iSlug),
          pillar: iPillar !== -1 ? val(iPillar) || null : null,
          body: body.trim(),
          published: true,
        });
      }
    }
  }
  return found;
}

function harvestJson(path) {
  const data = JSON.parse(readFileSync(path, "utf8"));
  const posts = Array.isArray(data) ? data : data.posts || [];
  return posts
    .filter((p) => p && p.body)
    .map((p) => ({
      title: p.title || "",
      slug: p.slug || "",
      pillar: p.pillar || null,
      body: String(p.body).trim(),
      published: p.published !== false,
    }));
}

function main() {
  const sources = {};
  const bySlug = new Map();
  let noSlug = 0;

  const add = (item, source) => {
    if (!item.body) return;
    const key = item.slug || `__noslug_${noSlug++}`;
    const existing = bySlug.get(key);
    if (!existing || item.body.length > existing.body.length) {
      bySlug.set(key, item);
    }
    sources[source] = (sources[source] || 0) + 1;
  };

  // 1. content scripts with template-literal bodies
  for (const file of readdirSync(__dirname)) {
    if (!file.endsWith(".mjs") || SELF.has(file)) continue;
    const text = readFileSync(join(__dirname, file), "utf8");
    if (!/body:\s*`/.test(text)) continue;
    for (const item of harvestMjs(text)) add(item, file);
  }

  // 2. SQL seed files with INSERT INTO posts/articles
  for (const file of readdirSync(__dirname)) {
    if (!file.endsWith(".sql")) continue;
    const text = readFileSync(join(__dirname, file), "utf8");
    if (!/INSERT\s+INTO\s+`?(posts|articles)`?/i.test(text)) continue;
    for (const item of harvestSql(text)) add(item, file);
  }

  // 3. the JSON seed set
  const jsonPath = join(__dirname, "content-data.json");
  if (existsSync(jsonPath)) {
    for (const item of harvestJson(jsonPath)) add(item, "content-data.json");
  }

  const corpus = [...bySlug.values()].sort((a, b) => b.body.length - a.body.length);
  writeFileSync(OUT, JSON.stringify(corpus, null, 2));

  console.log(`Built dry-run corpus → ${OUT}`);
  console.log(`  ${corpus.length} unique essays (deduped by slug, longest body kept)`);
  console.log("  raw items seen per source:");
  for (const [src, n] of Object.entries(sources).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(n).padStart(4)}  ${src}`);
  }
  const lens = corpus.map((c) => c.body.length).sort((a, b) => a - b);
  console.log(
    `  body length — min ${lens[0]}, median ${lens[Math.floor(lens.length / 2)]}, max ${lens[lens.length - 1]}`
  );
  console.log("\nNext: node scripts/voice-audit.mjs");
}

main();
