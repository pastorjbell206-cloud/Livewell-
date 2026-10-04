#!/usr/bin/env node
/**
 * import-facebook-notes.mjs — bring James's Facebook posts into the Notes library.
 *
 * Reads either:
 *   1. A Facebook "Download your information" JSON export. Facebook writes the
 *      posts to posts/your_posts_1.json (and _2, _3 ...) as an array of
 *      { timestamp, data: [{ post: "..." }], title, attachments }. Pass the
 *      file, or the folder that holds them. The export's text is usually
 *      mis-encoded (UTF-8 read as Latin-1, so "don’t" arrives as "donâ€™t");
 *      that is repaired here.
 *   2. A plain text file, one post per block, blocks separated by a line
 *      containing only "---". A block may start with a line "date: YYYY-MM-DD"
 *      and an optional "url: https://..." line. For pasting posts by hand from
 *      the page itself.
 *
 * Merges into client/public/notes/notes.json. A note is identified by a hash
 * of its text, so re-running never duplicates. Shares with no words of James's
 * own are skipped. Nothing is rewritten: the text goes in as he wrote it.
 *
 *   node scripts/import-facebook-notes.mjs <export.json | folder | posts.txt> [--write]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIB = path.join(ROOT, "client/public/notes/notes.json");
const WRITE = process.argv.includes("--write");

// Windows-1252's printable 0x80-0x9F range, for text that was decoded as
// cp1252 rather than Latin-1 ("â€™" for a right quote instead of "â").
const CP1252 = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";
const CP1252_BYTE = new Map(Array.from(CP1252).map((ch, i) => [ch, 0x80 + i]));

/** Facebook's export writes UTF-8 bytes as if they were single-byte characters. Undo that when it is present. */
export function fixEncoding(s) {
  if (!/[Â-ô]([-¿]|[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ])/.test(s)) return s;
  const bytes = [];
  for (const ch of s) {
    const code = ch.codePointAt(0);
    if (code < 0x100) bytes.push(code);
    else if (CP1252_BYTE.has(ch)) bytes.push(CP1252_BYTE.get(ch));
    else return s; // genuinely non-Latin text; leave it alone
  }
  const repaired = Buffer.from(bytes).toString("utf8");
  return repaired.includes("�") ? s : repaired;
}

export function idFor(text, date) {
  const h = createHash("sha1").update(text.trim()).digest("hex").slice(0, 8);
  return `${date}-${h}`;
}

export function cleanText(s) {
  return fixEncoding(String(s ?? ""))
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s*,\s*([,.;:!?])/g, "$1")
    .trim();
}

/** Facebook export objects → notes. Tolerant of the shapes Facebook has used. */
export function fromFacebook(items) {
  const out = [];
  for (const it of items) {
    if (!it || typeof it !== "object") continue;
    const ts = Number(it.timestamp || it.created_time || 0);
    const texts = [];
    if (Array.isArray(it.data)) for (const d of it.data) if (d && typeof d.post === "string") texts.push(d.post);
    if (typeof it.post === "string") texts.push(it.post);
    if (typeof it.message === "string") texts.push(it.message);
    const text = cleanText(texts.join("\n\n"));
    if (text.length < 20 || !ts) continue; // a share, a photo with no words, or undated
    const date = new Date(ts * (ts < 1e12 ? 1000 : 1)).toISOString().slice(0, 10);
    const url = typeof it.url === "string" && /^https:\/\//.test(it.url) ? it.url : undefined;
    out.push({ id: idFor(text, date), date, text, source: "facebook", ...(url ? { url } : {}) });
  }
  return out;
}

/** Plain text blocks → notes. */
export function fromText(raw) {
  const out = [];
  for (const block of raw.replace(/\r\n/g, "\n").split(/\n-{3,}\n/)) {
    const lines = block.trim().split("\n");
    let date = "";
    let url;
    while (lines.length) {
      const m = lines[0].match(/^(date|url):\s*(.+)$/i);
      if (!m) break;
      if (m[1].toLowerCase() === "date") date = m[2].trim();
      else url = m[2].trim();
      lines.shift();
    }
    const text = cleanText(lines.join("\n"));
    if (text.length < 20) continue;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { console.error(`skipping a block with no "date: YYYY-MM-DD" line: "${text.slice(0, 40)}..."`); continue; }
    out.push({ id: idFor(text, date), date, text, source: "facebook", ...(url ? { url } : {}) });
  }
  return out;
}

function readInput(p) {
  const st = statSync(p);
  if (st.isDirectory()) {
    const files = readdirSync(p).filter(f => /^your_posts.*\.json$/i.test(f) || /\.json$/i.test(f));
    return files.flatMap(f => readInput(path.join(p, f)));
  }
  const raw = readFileSync(p, "utf8");
  if (p.endsWith(".json")) {
    const j = JSON.parse(raw);
    const items = Array.isArray(j) ? j : Array.isArray(j.status_updates) ? j.status_updates : Array.isArray(j.posts) ? j.posts : [];
    return fromFacebook(items);
  }
  return fromText(raw);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const input = process.argv.slice(2).find(a => !a.startsWith("--"));
  if (!input) {
    console.error("usage: node scripts/import-facebook-notes.mjs <export.json | folder | posts.txt> [--write]");
    process.exit(1);
  }
  const incoming = readInput(path.resolve(input));
  const lib = JSON.parse(readFileSync(LIB, "utf8"));
  const have = new Set((lib.notes || []).map(n => n.id));
  const fresh = incoming.filter(n => !have.has(n.id));
  const merged = [...(lib.notes || []), ...fresh].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  console.log(`[notes] read ${incoming.length} post(s); ${fresh.length} new; library would hold ${merged.length}.`);
  for (const n of fresh.slice(0, 5)) console.log(`  ${n.date}  ${n.text.slice(0, 80).replace(/\n/g, " ")}${n.text.length > 80 ? "..." : ""}`);
  if (WRITE) {
    writeFileSync(LIB, JSON.stringify({ ...lib, notes: merged }, null, 2) + "\n");
    console.log(`[notes] wrote client/public/notes/notes.json. Now run: node scripts/validate-notes.mjs`);
  } else {
    console.log("[notes] dry run. Add --write to merge.");
  }
}
