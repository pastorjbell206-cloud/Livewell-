#!/usr/bin/env node
/**
 * build-book-covers.mjs — generates on-brand SVG covers for the essay-volume
 * books (client/public/books/essays-*.json) that don't have a cover yet, in the
 * same 800x1200 charcoal/cream/mustard style as James's authored-book covers.
 *
 * Writes client/public/books/<slug>.svg. Idempotent; safe to rerun. Only touches
 * essays-* volumes (never the authored books' covers).
 *
 *   node scripts/build-book-covers.mjs
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_DIR = join(__dirname, "..", "client/public/books");

const INK = "#1A1A1A", CREAM = "#F5F0E6", MUTED = "#C9C1AE", MUSTARD = "#D4A017";
const W = 800, H = 1200, LEFT = 80, MAXW = 648;

// Short mustard kicker per pillar.
const KICKER = {
  "Integrated Life": "LIVING WELL",
  "Theological Depth": "THEOLOGY",
  "Prophetic Disruption": "AFTER CHRISTENDOM",
  "Prophetic Justice": "JUSTICE",
  "Leadership Formation": "FOR PASTORS & LEADERS",
};

const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Greedy word-wrap; approximate glyph width for the serif face.
function wrap(text, fontSize, maxWidth, cwFactor = 0.54) {
  const maxChars = Math.max(6, Math.floor(maxWidth / (fontSize * cwFactor)));
  const words = String(text).split(/\s+/);
  const lines = []; let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if (t.length <= maxChars || !cur) cur = t; else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}
// Pick the largest title size that fits in <= 3 lines.
function fitTitle(title) {
  for (const fs of [100, 88, 76, 66, 58, 50, 44]) {
    const lines = wrap(title, fs, MAXW);
    const longest = Math.max(...lines.map((l) => l.length));
    // Accept only if it fits in <= 3 lines AND the widest line stays in the margin.
    if (lines.length <= 3 && longest * fs * 0.54 <= MAXW) return { fs, lines };
  }
  return { fs: 42, lines: wrap(title, 42, MAXW) };
}

function coverSvg({ title, subtitle, pillar }) {
  const kicker = KICKER[pillar] || "COLLECTED ESSAYS";
  const { fs, lines } = fitTitle(title);
  const lh = Math.round(fs * 1.06);
  // Vertically center the title block in the upper-middle band.
  const blockH = lines.length * lh;
  let ty = Math.round(470 - blockH / 2 + fs);
  const titleTspans = lines.map((l, i) =>
    `<text x="${LEFT - 4}" y="${ty + i * lh}" font-family="Palatino, 'Palatino Linotype', Georgia, serif" font-size="${fs}" font-weight="400" fill="${CREAM}">${esc(l)}</text>`
  ).join("\n  ");
  const subY = ty + (lines.length - 1) * lh + 74;
  const subLines = wrap(subtitle || "", 24, MAXW, 0.5).slice(0, 2);
  const subTspans = subLines.map((l, i) =>
    `<text x="${LEFT}" y="${subY + i * 34}" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="${MUTED}">${esc(l)}</text>`
  ).join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)} by James Bell">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect x="28" y="28" width="${W - 56}" height="${H - 56}" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.18"/>

  <text x="${LEFT}" y="156" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="6" font-weight="700" fill="${MUSTARD}">${esc(kicker)}</text>
  <line x1="${LEFT}" y1="182" x2="${W - LEFT}" y2="182" stroke="${MUSTARD}" stroke-width="2"/>

  ${titleTspans}

  ${subTspans}

  <line x1="${LEFT}" y1="1024" x2="188" y2="1024" stroke="${MUSTARD}" stroke-width="3"/>
  <text x="${LEFT}" y="1086" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="4" font-weight="700" fill="${CREAM}">JAMES BELL</text>
  <text x="${LEFT}" y="1120" font-family="Helvetica, Arial, sans-serif" font-size="16" letter-spacing="2.5" fill="${MUSTARD}">LIVEWELL BY JAMES BELL</text>
</svg>
`;
}

const COVER_EXT = ["svg", "jpg", "jpeg", "webp", "png"];
const hasCover = (slug) => COVER_EXT.some((e) => fs.existsSync(join(BOOKS_DIR, `${slug}.${e}`)));

const files = fs.readdirSync(BOOKS_DIR).filter((f) => f.endsWith(".json") && f !== "index.json");
let n = 0, filled = 0;
for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  const book = JSON.parse(fs.readFileSync(join(BOOKS_DIR, f), "utf8"));
  if (!book.title || !Array.isArray(book.chapters)) continue;
  // Always (re)generate covers for our essay volumes; for authored books, only
  // fill a gap — never overwrite an existing hand-made cover.
  const isEssay = slug.startsWith("essays-");
  if (!isEssay && hasCover(slug)) continue;
  fs.writeFileSync(join(BOOKS_DIR, slug + ".svg"), coverSvg(book));
  n++; if (!isEssay) filled++;
}
console.log(`[build-book-covers] wrote ${n} SVG covers (${filled} filled for authored books missing one).`);
