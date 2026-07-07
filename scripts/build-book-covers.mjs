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
const MUSTARD = "#D4A017";

// Covers hand-designed by the owner; the generator never touches these.
const HANDMADE = new Set(["born-again-from-atheism", "the-god-who-is-not-nice"]);

// Two on-brand grounds only — dark (charcoal) and light (cream/warm-cream).
// Mustard stays punctuation (eyebrow + rules), never a ground fill.
const DARK = { ground: "#1A1A1A", title: "#F5F0E6", subtitle: "#C9C1AE", author: "#F5F0E6", border: "#F5F0E6" };
const CREAM = { ground: "#F5F0E6", title: "#1A1A1A", subtitle: "#5A5448", author: "#1A1A1A", border: "#1A1A1A" };

// Pillar → { eyebrow label, ground theme }. The weightier, more confrontational
// pillars take the dark ground (matching the two hand-made covers); the warmer,
// everyday pillars take a light ground, so the shelf reads by pillar at a glance.
const PILLAR = {
  "Theological Depth":   { eyebrow: "THEOLOGY",            theme: DARK },
  "Faith & Theology":    { eyebrow: "THEOLOGY",            theme: DARK },
  "Prophetic Justice":   { eyebrow: "PROPHETIC JUSTICE",   theme: DARK },
  "Prophetic Disruption":{ eyebrow: "THE AMERICAN CHURCH", theme: DARK },
  "After Christendom":    { eyebrow: "AFTER CHRISTENDOM",   theme: DARK },
  "Leadership Formation":{ eyebrow: "PASTORAL MINISTRY",   theme: CREAM },
  "Pastoral Ministry":   { eyebrow: "PASTORAL MINISTRY",   theme: CREAM },
  "Integrated Life":     { eyebrow: "THE INTEGRATED LIFE", theme: CREAM },
  "Living Well":         { eyebrow: "THE INTEGRATED LIFE", theme: CREAM },
  "The Table":           { eyebrow: "DISCIPLE-MAKING",     theme: CREAM },
};
const DEFAULT_PILLAR = { eyebrow: "LIVEWELL BOOKS", theme: CREAM };

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

function coverSvg({ title, subtitle, eyebrow, theme }) {
  const fs = titleFontSize(title);
  const lines = wrapTitle(title, fs);
  const lineHeight = fs * 1.02;
  // Vertically center the title block around y=500.
  const blockH = lines.length * lineHeight;
  let ty = 500 - blockH / 2 + fs * 0.8;
  const titleLines = lines
    .map((ln) => {
      const t = `<text x="76" y="${Math.round(ty)}" font-family="Palatino, 'Palatino Linotype', Georgia, serif" font-size="${fs}" font-weight="400" fill="${theme.title}">${esc(ln)}</text>`;
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
        const t = `<text x="80" y="${sy}" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="${theme.subtitle}">${esc(ln)}</text>`;
        sy += 36;
        return t;
      })
      .join("\n  ");
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200" role="img" aria-label="${esc(title)} by James Bell">
  <rect width="800" height="1200" fill="${theme.ground}"/>
  <rect x="28" y="28" width="744" height="1144" fill="none" stroke="${theme.border}" stroke-width="1.5" opacity="0.18"/>

  <text x="80" y="156" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="6" font-weight="700" fill="${MUSTARD}">${esc(eyebrow)}</text>
  <line x1="80" y1="182" x2="720" y2="182" stroke="${MUSTARD}" stroke-width="2"/>

  ${titleLines}

  ${subEls}

  <line x1="80" y1="1024" x2="188" y2="1024" stroke="${MUSTARD}" stroke-width="3"/>
  <text x="80" y="1086" font-family="Helvetica, Arial, sans-serif" font-size="30" letter-spacing="4" font-weight="700" fill="${theme.author}">JAMES BELL</text>
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
  if (HANDMADE.has(slug)) continue; // never touch a hand-made cover
  const book = JSON.parse(readFileSync(file, "utf8"));
  const p = PILLAR[book.pillar] || DEFAULT_PILLAR;
  const svg = coverSvg({ title: book.title, subtitle: book.subtitle, eyebrow: p.eyebrow, theme: p.theme });
  writeFileSync(join(BOOKS_DIR, `${slug}.svg`), svg);
  written++;
}
console.log(`Wrote ${written} book covers to ${BOOKS_DIR}/<slug>.svg (${HANDMADE.size} hand-made preserved)`);
