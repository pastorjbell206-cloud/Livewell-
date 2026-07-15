#!/usr/bin/env node
/**
 * build-book-covers.mjs — generates the covers for the books shown in the /read
 * library (client/public/books/*.json), in James's palette (charcoal / cream /
 * mustard, Cormorant-style serif).
 *
 * A mixed collection: three cover layouts (series, lower-third, centered frame)
 * rotate across the shelf, over alternating dark and cream grounds, so every
 * book has its own face while the whole set still reads as one collection. A
 * faint mustard arc, a pillar kicker, a small collection index number, and the
 * JAMES BELL byline tie them together.
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
const W = 800, H = 1200, LEFT = 80, MAXW = 648, MID = W / 2;
const SERIF = "Palatino, 'Palatino Linotype', Georgia, serif";
const SANS = "Helvetica, Arial, sans-serif";
const MONO = "'JetBrains Mono', 'Courier New', monospace";

// Short mustard kicker per pillar — one for each of the eight, so no cover
// falls back to the generic label. (Previously "After Christendom" as a pillar
// went unlabeled while "Prophetic Disruption" wore its name; each now carries
// its own.)
const KICKER = {
  "Integrated Life": "LIVING WELL",
  "Theological Depth": "THEOLOGY",
  "Prophetic Disruption": "PROPHETIC WITNESS",
  "After Christendom": "AFTER CHRISTENDOM",
  "Prophetic Justice": "JUSTICE",
  "Leadership Formation": "FOR PASTORS & LEADERS",
  "Pastoral Ministry": "PASTORAL MINISTRY",
  "The Table": "AT THE TABLE",
};

const esc = (s) => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Stable hash of a slug → used to scatter grounds/layouts across the shelf.
function hash(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
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
// Pick the largest title size from `sizes` that fits in <= maxLines AND stays in
// the margin.
function fitTitle(title, sizes, maxLines = 3) {
  for (const fs of sizes) {
    const lines = wrap(title, fs, MAXW);
    const longest = Math.max(...lines.map((l) => l.length));
    if (lines.length <= maxLines && longest * fs * 0.54 <= MAXW) return { fs, lines };
  }
  const fs = sizes[sizes.length - 1];
  return { fs, lines: wrap(title, fs, MAXW) };
}

const svgOpen = (bg, extra = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${extra}">
  <rect width="${W}" height="${H}" fill="${bg}"/>`;

const arc = (cx, cy) =>
  `<circle cx="${cx}" cy="${cy}" r="300" fill="none" stroke="${MUSTARD}" stroke-width="2" opacity="0.26"/>
  <circle cx="${cx}" cy="${cy}" r="212" fill="none" stroke="${MUSTARD}" stroke-width="2" opacity="0.16"/>`;

// --- Layout 0: series — header top, title centered, arc bottom-right --------
function layoutSeries({ title, subtitle, kicker, num, fg, sub }) {
  const { fs, lines } = fitTitle(title, [96, 84, 74, 64, 56, 48, 42]);
  const lh = Math.round(fs * 1.05);
  const ty = Math.round(540 - (lines.length * lh) / 2 + fs);
  const tt = lines.map((l, i) => `<text x="${LEFT - 4}" y="${ty + i * lh}" font-family="${SERIF}" font-size="${fs}" fill="${fg}">${esc(l)}</text>`).join("\n  ");
  const subY = ty + (lines.length - 1) * lh + 70;
  const st = wrap(subtitle || "", 23, MAXW, 0.5).slice(0, 2).map((l, i) => `<text x="${LEFT}" y="${subY + i * 33}" font-family="${SANS}" font-size="23" fill="${sub}">${esc(l)}</text>`).join("\n  ");
  return `
  ${arc(W - 36, H - 60)}
  <text x="${LEFT}" y="150" font-family="${SANS}" font-size="19" letter-spacing="5.5" font-weight="700" fill="${MUSTARD}">${esc(kicker)}</text>
  <text x="${W - LEFT}" y="152" text-anchor="end" font-family="${MONO}" font-size="22" fill="${MUSTARD}">${num}</text>
  <line x1="${LEFT}" y1="178" x2="${W - LEFT}" y2="178" stroke="${MUSTARD}" stroke-width="1.5" opacity="0.5"/>
  ${tt}
  ${st}
  <line x1="${LEFT}" y1="1052" x2="176" y2="1052" stroke="${MUSTARD}" stroke-width="3"/>
  <text x="${LEFT}" y="1110" font-family="${SANS}" font-size="28" letter-spacing="4" font-weight="700" fill="${fg}">JAMES BELL</text>`;
}

// --- Layout 1: lower-third — arc top-right, title anchored low --------------
function layoutLower({ title, subtitle, kicker, num, fg, sub }) {
  const { fs, lines } = fitTitle(title, [88, 78, 68, 60, 52, 46, 40]);
  const lh = Math.round(fs * 1.05);
  // Anchor the last line near y=930, build upward.
  const firstY = 930 - (lines.length - 1) * lh;
  const tt = lines.map((l, i) => `<text x="${LEFT - 4}" y="${firstY + i * lh}" font-family="${SERIF}" font-size="${fs}" fill="${fg}">${esc(l)}</text>`).join("\n  ");
  const subY = 930 + 58;
  const st = wrap(subtitle || "", 23, MAXW, 0.5).slice(0, 2).map((l, i) => `<text x="${LEFT}" y="${subY + i * 33}" font-family="${SANS}" font-size="23" fill="${sub}">${esc(l)}</text>`).join("\n  ");
  return `
  ${arc(W - 36, 40)}
  <text x="${LEFT}" y="150" font-family="${SANS}" font-size="19" letter-spacing="5.5" font-weight="700" fill="${MUSTARD}">${esc(kicker)}</text>
  <text x="${W - LEFT}" y="152" text-anchor="end" font-family="${MONO}" font-size="22" fill="${MUSTARD}">${num}</text>
  <line x1="${LEFT}" y1="${firstY - fs - 34}" x2="176" y2="${firstY - fs - 34}" stroke="${MUSTARD}" stroke-width="3"/>
  ${tt}
  ${st}
  <text x="${LEFT}" y="1120" font-family="${SANS}" font-size="26" letter-spacing="4" font-weight="700" fill="${fg}">JAMES BELL</text>`;
}

// --- Layout 2: centered frame — symmetric, formal ---------------------------
function layoutFrame({ title, subtitle, kicker, num, fg, sub }) {
  const { fs, lines } = fitTitle(title, [84, 74, 64, 56, 50, 44, 40]);
  const lh = Math.round(fs * 1.06);
  const ty = Math.round(560 - (lines.length * lh) / 2 + fs);
  const tt = lines.map((l, i) => `<text x="${MID}" y="${ty + i * lh}" text-anchor="middle" font-family="${SERIF}" font-size="${fs}" fill="${fg}">${esc(l)}</text>`).join("\n  ");
  const subY = ty + (lines.length - 1) * lh + 66;
  const st = wrap(subtitle || "", 22, 560, 0.5).slice(0, 2).map((l, i) => `<text x="${MID}" y="${subY + i * 32}" text-anchor="middle" font-family="${SANS}" font-size="22" fill="${sub}">${esc(l)}</text>`).join("\n  ");
  return `
  <rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="${fg}" stroke-width="1.5" opacity="0.16"/>
  <text x="${MID}" y="176" text-anchor="middle" font-family="${SANS}" font-size="19" letter-spacing="5.5" font-weight="700" fill="${MUSTARD}">${esc(kicker)}</text>
  <line x1="${MID - 34}" y1="206" x2="${MID + 34}" y2="206" stroke="${MUSTARD}" stroke-width="2"/>
  ${tt}
  ${st}
  <line x1="${MID - 30}" y1="1028" x2="${MID + 30}" y2="1028" stroke="${MUSTARD}" stroke-width="2"/>
  <text x="${MID}" y="1086" text-anchor="middle" font-family="${SANS}" font-size="26" letter-spacing="4" font-weight="700" fill="${fg}">JAMES BELL</text>
  <text x="${MID}" y="1118" text-anchor="middle" font-family="${MONO}" font-size="15" fill="${MUSTARD}">${num}</text>`;
}

const LAYOUTS = [layoutSeries, layoutLower, layoutFrame];

function coverSvg({ title, subtitle, pillar }, seq) {
  const h = hash(seq.slug);
  const dark = h % 2 === 0;
  const bg = dark ? INK : WARM;
  const fg = dark ? CREAM : INK;
  const sub = dark ? MUTED : INK_MUTED;
  const kicker = KICKER[pillar] || "COLLECTED ESSAYS";
  const num = String(seq.n).padStart(2, "0");
  // Rotate layout by shelf position so the mix is even and stable.
  const layout = LAYOUTS[seq.n % LAYOUTS.length];
  return `${svgOpen(bg, `${esc(title)} by James Bell`)}${layout({ title, subtitle, kicker, num, fg, sub })}
</svg>
`;
}

const RASTER_EXT = ["jpg", "jpeg", "webp", "png"];
const hasRaster = (slug) => RASTER_EXT.some((e) => fs.existsSync(join(BOOKS_DIR, `${slug}.${e}`)));

// Load every book manifest, sort by title (the order the /read shelf uses), and
// number the collection 01..N so the index reads as a curated series.
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
console.log(`[build-book-covers] wrote ${n} mixed-layout covers (${skipped} real raster covers left untouched).`);
