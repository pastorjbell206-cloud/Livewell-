/**
 * build-book-covers.mjs — branded SVG covers for the reading-library books.
 *
 * The paid ebooks ship hand-made SVG covers; the free reading-library books in
 * client/public/books/*.json had none and fell back to a placeholder. This
 * renders one cover per library book from its own title/subtitle/pillar, in the
 * brand palette and type treatment (cream ground, mustard eyebrow rule,
 * Cormorant-style serif title, author block). Output: client/public/books/<slug>.svg.
 *
 * Run:  node scripts/build-book-covers.mjs   (rerun after adding/renaming a book)
 * Idempotent: overwrites every generated cover on each run.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BOOKS_DIR = "client/public/books";
const CREAM = "#F5F0E6";
const INK = "#1A1A1A";
const MUSTARD = "#D4A017";
const MUTED = "#5A5448";

// Pillar → the eyebrow label that sits above the title.
const PILLAR_EYEBROW = {
  "Theological Depth": "THEOLOGY",
  "Faith & Theology": "THEOLOGY",
  "Prophetic Justice": "PROPHETIC JUSTICE",
  "Prophetic Disruption": "THE AMERICAN CHURCH",
  "Leadership Formation": "PASTORAL MINISTRY",
  "Pastoral Ministry": "PASTORAL MINISTRY",
  "Integrated Life": "THE INTEGRATED LIFE",
  "Living Well": "THE INTEGRATED LIFE",
  "The Table": "DISCIPLE-MAKING",
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Word-wrap a title to fit the cover width at a given font size. Cormorant runs
// narrow, ~0.46em average; the usable text column is ~648px (x 76→724).
function wrapTitle(title, fontSize, maxWidth = 648) {
  const perChar = fontSize * 0.46;
  const maxChars = Math.max(6, Math.floor(maxWidth / perChar));
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Pick a title font size so the longest word fits and we stay within ~3 lines.
function titleFontSize(title) {
  const longest = title.split(/\s+/).reduce((m, w) => Math.max(m, w.length), 0);
  const words = title.split(/\s+/).length;
  let size = 132;
  if (longest > 9 || words >= 4) size = 104;
  if (longest > 12 || words >= 6) size = 82;
  if (longest > 16 || words >= 8) size = 64;
  return size;
}

function coverSvg({ title, subtitle, eyebrow }) {
  const fs = titleFontSize(title);
  const lines = wrapTitle(title, fs);
  const lineHeight = fs * 1.02;
  // Vertically center the title block around y=500.
  const blockH = lines.length * lineHeight;
  let ty = 500 - blockH / 2 + fs * 0.8;
  const titleLines = lines
    .map((ln) => {
      const t = `<text x="76" y="${Math.round(ty)}" font-family="Palatino, 'Palatino Linotype', Georgia, serif" font-size="${fs}" font-weight="400" fill="${INK}">${esc(ln)}</text>`;
      ty += lineHeight;
      return t;
    })
    .join("\n  ");

  // Subtitle wraps at a fixed size below the title block.
  let subEls = "";
  if (subtitle) {
    const subLines = wrapTitle(subtitle, 25, 640).slice(0, 3);
    let sy = Math.round(ty) + 34;
    subEls = subLines
      .map((ln) => {
        const t = `<text x="80" y="${sy}" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="${MUTED}">${esc(ln)}</text>`;
        sy += 36;
        return t;
      })
      .join("\n  ");
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200" role="img" aria-label="${esc(title)} by James Bell">
  <rect width="800" height="1200" fill="${CREAM}"/>
  <rect x="28" y="28" width="744" height="1144" fill="none" stroke="${INK}" stroke-width="1.5" opacity="0.18"/>

  <text x="80" y="156" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="6" font-weight="700" fill="${MUSTARD}">${esc(eyebrow)}</text>
  <line x1="80" y1="182" x2="720" y2="182" stroke="${MUSTARD}" stroke-width="2"/>

  ${titleLines}

  ${subEls}

  <line x1="80" y1="1024" x2="188" y2="1024" stroke="${MUSTARD}" stroke-width="3"/>
  <text x="80" y="1086" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="4" font-weight="700" fill="${INK}">JAMES BELL</text>
  <text x="80" y="1120" font-family="Helvetica, Arial, sans-serif" font-size="16" letter-spacing="2.5" fill="${MUSTARD}">LIVEWELL BY JAMES BELL</text>
</svg>
`;
}

const index = JSON.parse(readFileSync(join(BOOKS_DIR, "index.json"), "utf8"));
const list = Array.isArray(index) ? index : index.books || [];
let written = 0;
for (const entry of list) {
  const slug = entry.slug;
  const file = join(BOOKS_DIR, `${slug}.json`);
  if (!existsSync(file)) continue;
  // Never overwrite a hand-made cover; only fill gaps.
  const out = join(BOOKS_DIR, `${slug}.svg`);
  if (existsSync(out)) continue;
  const book = JSON.parse(readFileSync(file, "utf8"));
  const eyebrow = PILLAR_EYEBROW[book.pillar] || "LIVEWELL BOOKS";
  const svg = coverSvg({ title: book.title, subtitle: book.subtitle, eyebrow });
  writeFileSync(out, svg);
  written++;
}
console.log(`Wrote ${written} book covers to ${BOOKS_DIR}/<slug>.svg`);
