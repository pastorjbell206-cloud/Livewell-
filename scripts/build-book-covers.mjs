#!/usr/bin/env node
/**
 * build-book-covers.mjs — generates the "designed series" covers for the books
 * shown in the /read library (client/public/books/*.json), in James's palette
 * (charcoal / cream / mustard, Cormorant-style serif).
 *
 * The series treatment: alternating dark and cream grounds so the shelf has
 * rhythm, a faint mustard arc motif, a small collection index number, a pillar
 * kicker, and the JAMES BELL byline. It reads as one curated collection while
 * giving every book its own face.
 *
 * Writes client/public/books/<slug>.svg. Idempotent; safe to rerun. Never
 * overwrites a real raster cover (.jpg/.jpeg/.webp/.png) — those are James's
 * hand-made published-book covers.
 *
 *   node scripts/build-book-covers.mjs
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOOKS_DIR = join(__dirname, "..", "client/public/books");

const INK = "#1A1A1A", CREAM = "#F5F0E6", WARM = "#EDE8DC", MUTED = "#C9C1AE",
  MUSTARD = "#D4A017", INK_MUTED = "#5A5448";
const W = 800, H = 1200, LEFT = 80, MAXW = 648;
const SERIF = "Palatino, 'Palatino Linotype', Georgia, serif";
const SANS = "Helvetica, Arial, sans-serif";
const MONO = "'JetBrains Mono', 'Courier New', monospace";

// Short mustard kicker per pillar.
const KICKER = {
  "Integrated Life": "LIVING WELL",
  "Theological Depth": "THEOLOGY",
  "Prophetic Disruption": "AFTER CHRISTENDOM",
  "Prophetic Justice": "JUSTICE",
  "Leadership Formation": "FOR PASTORS & LEADERS",
};

const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Stable parity from a slug, so dark/cream grounds scatter across the shelf
// instead of forming rigid columns.
function groundIsDark(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h % 2 === 0;
}

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
// Pick the largest title size that fits in <= 3 lines AND stays in the margin.
function fitTitle(title) {
  for (const fs of [96, 84, 74, 64, 56, 48, 42]) {
    const lines = wrap(title, fs, MAXW);
    const longest = Math.max(...lines.map((l) => l.length));
    if (lines.length <= 3 && longest * fs * 0.54 <= MAXW) return { fs, lines };
  }
  return { fs: 40, lines: wrap(title, 40, MAXW) };
}

function coverSvg({ title, subtitle, pillar }, seq) {
  const dark = groundIsDark(seq.slug);
  const bg = dark ? INK : WARM;
  const fg = dark ? CREAM : INK;
  const sub = dark ? MUTED : INK_MUTED;
  const kicker = KICKER[pillar] || "COLLECTED ESSAYS";
  const num = String(seq.n).padStart(2, "0");

  const { fs, lines } = fitTitle(title);
  const lh = Math.round(fs * 1.05);
  const blockH = lines.length * lh;
  const ty = Math.round(540 - blockH / 2 + fs);
  const titleTspans = lines.map((l, i) =>
    `<text x="${LEFT - 4}" y="${ty + i * lh}" font-family="${SERIF}" font-size="${fs}" font-weight="400" fill="${fg}">${esc(l)}</text>`
  ).join("\n  ");

  const subY = ty + (lines.length - 1) * lh + 70;
  const subLines = wrap(subtitle || "", 23, MAXW, 0.5).slice(0, 2);
  const subTspans = subLines.map((l, i) =>
    `<text x="${LEFT}" y="${subY + i * 33}" font-family="${SANS}" font-size="23" fill="${sub}">${esc(l)}</text>`
  ).join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)} by James Bell">
  <rect width="${W}" height="${H}" fill="${bg}"/>

  <circle cx="${W - 36}" cy="${H - 60}" r="300" fill="none" stroke="${MUSTARD}" stroke-width="2" opacity="0.26"/>
  <circle cx="${W - 36}" cy="${H - 60}" r="212" fill="none" stroke="${MUSTARD}" stroke-width="2" opacity="0.16"/>

  <text x="${LEFT}" y="150" font-family="${SANS}" font-size="19" letter-spacing="5.5" font-weight="700" fill="${MUSTARD}">${esc(kicker)}</text>
  <text x="${W - LEFT}" y="152" text-anchor="end" font-family="${MONO}" font-size="22" fill="${MUSTARD}">${num}</text>
  <line x1="${LEFT}" y1="178" x2="${W - LEFT}" y2="178" stroke="${MUSTARD}" stroke-width="1.5" opacity="0.5"/>

  ${titleTspans}

  ${subTspans}

  <line x1="${LEFT}" y1="1052" x2="176" y2="1052" stroke="${MUSTARD}" stroke-width="3"/>
  <text x="${LEFT}" y="1110" font-family="${SANS}" font-size="28" letter-spacing="4" font-weight="700" fill="${fg}">JAMES BELL</text>
</svg>
`;
}

const RASTER_EXT = ["jpg", "jpeg", "webp", "png"];
const hasRaster = (slug) => RASTER_EXT.some((e) => fs.existsSync(join(BOOKS_DIR, `${slug}.${e}`)));

// Load every book manifest, sort by title (the same order the /read shelf uses),
// and number the collection 01..N so the index reads as a curated series.
const manifests = fs.readdirSync(BOOKS_DIR)
  .filter((f) => f.endsWith(".json") && f !== "index.json")
  .map((f) => {
    const slug = f.replace(/\.json$/, "");
    try {
      const book = JSON.parse(fs.readFileSync(join(BOOKS_DIR, f), "utf8"));
      if (!book.title || !Array.isArray(book.chapters)) return null;
      return { slug, book };
    } catch { return null; }
  })
  .filter(Boolean)
  .sort((a, b) => a.book.title.localeCompare(b.book.title));

let n = 0, skipped = 0;
manifests.forEach((m, i) => {
  if (hasRaster(m.slug)) { skipped++; return; } // never overwrite a real cover
  fs.writeFileSync(join(BOOKS_DIR, m.slug + ".svg"), coverSvg(m.book, { slug: m.slug, n: i + 1 }));
  n++;
});
console.log(`[build-book-covers] wrote ${n} designed-series covers (${skipped} real raster covers left untouched).`);
