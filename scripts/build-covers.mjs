#!/usr/bin/env node
/**
 * build-covers.mjs: every cover on the shelf, drawn from data.
 *
 *   node scripts/build-covers.mjs            draw and write
 *   node scripts/build-covers.mjs --check    fail if the committed covers are
 *                                            not what the data draws today
 *   node scripts/build-covers.mjs --sheet <file.png>   also write a contact sheet
 *
 * Reads client/src/data/covers.json (which book, which drawing, which ground)
 * and client/src/data/book-names.json (the names of the books James is
 * renaming). Writes, under client/public/covers/:
 *
 *   <id>-400.webp   400 x 600    the shelf
 *   <id>-800.webp   800 x 1200   a book's own page
 *   <id>.jpg        1200 x 1800  the share image
 *   kind-<id>-400.webp  400 x 518  the card for a kind of printable
 *
 * and scripts/covers-manifest.json, which records the fingerprint of each
 * cover's drawing (the SVG, or the uploaded image's bytes). --check redraws
 * every SVG and compares fingerprints, so a change to the data, the type, a
 * drawing or a colour token that was not followed by a rebuild fails CI.
 *
 * One family: a 6 by 9 cover, the title large at the head in Cormorant
 * Garamond capitals with one word in the accent colour, the subtitle in
 * italic, a short rule, one engraved picture, the author's name letterspaced
 * at the foot, a spine band at the left. Booklets are the same book with a
 * charcoal band at the head. Colours are the tokens in client/src/index.css,
 * resolved here; the type is the site's own self-hosted fonts, set as outlines
 * (scripts/lib/cover-type.mjs). Rendered with sharp, which the repo already
 * uses for share images.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { ART_META, BOOK_ART, KIND_ART, hatchDefs, pen } from "./lib/cover-art.mjs";
import { line, measure, wrap } from "./lib/cover-type.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "client/public/covers");
const MANIFEST = path.join(ROOT, "scripts/covers-manifest.json");
const CHECK = process.argv.includes("--check");
const SHEET = process.argv.includes("--sheet") ? process.argv[process.argv.indexOf("--sheet") + 1] : null;

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
const COVERS = readJson("client/src/data/covers.json");
const NAMES = new Map(readJson("client/src/data/book-names.json").books.map((b) => [b.id, b]));

// ── colours: the tokens, resolved ────────────────────────────────────────

const css = fs.readFileSync(path.join(ROOT, "client/src/index.css"), "utf8");
function token(name, nth = 0) {
  const all = [...css.matchAll(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{3,8})`, "g"))].map((m) => m[1]);
  if (!all[nth]) throw new Error(`build-covers: token --${name} (${nth}) is not in client/src/index.css`);
  return all[nth];
}
// The first value of a token is the day palette (:root); the second is html.dark.
const T = {
  charcoal: token("charcoal"),
  charcoalSoft: token("charcoal-soft"),
  bone: token("bone"),
  boneWarm: token("bone-warm"),
  boneMuted: token("bone-muted"),
  ink: token("ink"),
  inkMuted: token("ink-muted"),
  mustard: token("mustard"),
  mustardDeep: token("mustard-deep"),
  art: { paper: token("art-paper"), ink: token("art-ink"), blue: token("art-blue"), olive: token("art-olive"), clay: token("art-clay") },
  artDark: { paper: token("art-paper", 1), ink: token("art-ink", 1), blue: token("art-blue", 1), olive: token("art-olive", 1), clay: token("art-clay", 1) },
};

/** Everything a cover needs to know about its ground. */
function palette(ground, tone) {
  if (ground === "dark") {
    return {
      field: T.charcoal, spine: T.charcoalSoft, fg: T.bone, muted: T.boneMuted, accent: T.mustard, rule: T.mustard,
      pen: { paper: T.charcoalSoft, ink: T.artDark.ink, tone: T.artDark[tone], mustard: T.mustard, light: T.bone, dark: T.charcoal },
    };
  }
  return {
    field: T.bone, spine: T.boneWarm, fg: T.charcoal, muted: T.inkMuted, accent: T.mustardDeep, rule: T.mustardDeep,
    pen: { paper: T.art.paper, ink: T.art.ink, tone: T.art[tone], mustard: T.mustard, light: T.art.paper, dark: T.art.ink },
  };
}

// ── the title ────────────────────────────────────────────────────────────

/** "of *Scripture" → [{ text: "OF ", accent: false }, { text: "SCRIPTURE", accent: true }] */
function runs(raw, upper) {
  const at = raw.indexOf("*");
  const set = (s) => (upper ? s.toUpperCase() : s);
  if (at < 0) return [{ text: set(raw), accent: false }];
  return [
    { text: set(raw.slice(0, at)), accent: false },
    { text: set(raw.slice(at + 1)), accent: true },
  ].filter((r) => r.text);
}

/** Break a title into lines when the data gives none: as even as the words allow, the last line in the accent. */
function autoLines(title) {
  const words = title.split(/\s+/);
  const count = title.length <= 11 ? 1 : title.length <= 26 ? 2 : title.length <= 44 ? 3 : 4;
  const target = title.length / count;
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && lines.length < count - 1 && next.length > target + 2) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  lines[lines.length - 1] = `*${lines[lines.length - 1]}`;
  return lines;
}

function titleLines(entry, title) {
  const given = entry.lines;
  if (!given) return autoLines(title);
  const spelled = given.join(" ").replace(/\*/g, "").replace(/\s+/g, " ").trim();
  if (spelled !== title) throw new Error(`build-covers: the lines of "${entry.id}" spell "${spelled}", and its title is "${title}". Fix or remove "lines" in client/src/data/covers.json.`);
  return given;
}

/**
 * Set the title as a block: every line in capitals, each as large as the
 * measure allows up to a cap, so a short line stands as tall as a long one
 * is wide. Returns the paths and the block's height.
 */
function setTitle({ lines, cx, top, width, cap, weight, upper, tracking, c }) {
  const sized = lines.map((raw) => {
    const parts = runs(raw, upper);
    const text = parts.map((r) => r.text).join("");
    const unit = measure(text, { face: "display", weight, size: 100, tracking });
    return { parts, size: Math.min(cap, (width / unit) * 100) };
  });
  const capHeight = upper ? 0.64 : 0.7;
  const gap = 0.3;
  let y = top;
  const out = [];
  sized.forEach((s, i) => {
    y += s.size * capHeight;
    const total = measure(s.parts.map((r) => r.text).join(""), { face: "display", weight, size: s.size, tracking });
    let x = cx - total / 2;
    for (const r of s.parts) {
      const set = line(r.text, { face: "display", weight, size: s.size, x, y, tracking });
      // A hair of stroke in the letter's own colour: Cormorant's heaviest weight is still a light face at cover size.
      const colour = r.accent ? c.accent : c.fg;
      out.push(`<path d="${set.d}" fill="${colour}" stroke="${colour}" stroke-width="${(s.size * 0.014).toFixed(2)}" stroke-linejoin="round"/>`);
      x += measure(r.text, { face: "display", weight, size: s.size, tracking }) + tracking * s.size;
    }
    if (i < sized.length - 1) y += s.size * gap + (upper ? 0 : s.size * 0.12);
  });
  return { svg: out.join(""), bottom: y };
}

// ── a book ───────────────────────────────────────────────────────────────

const W = 600;
const H = 900;
const SPINE = 26;

function bookSvg(entry) {
  const named = NAMES.get(entry.id);
  const title = named?.title ?? entry.title;
  const subtitle = named?.subtitle ?? entry.subtitle;
  if (!title) throw new Error(`build-covers: "${entry.id}" has no title`);
  const draw = BOOK_ART[entry.art];
  if (!draw) throw new Error(`build-covers: "${entry.id}" asks for the drawing "${entry.art}", which scripts/lib/cover-art.mjs does not have`);
  const booklet = entry.form === "booklet";
  const c = palette(entry.ground, entry.tone);
  const cx = SPINE + (W - SPINE) / 2;
  const measureWidth = 486;
  const parts = [];

  parts.push(`<rect width="${W}" height="${H}" fill="${c.field}"/>`);
  // The spine: a band, a hairline, and the series mark at its foot.
  parts.push(`<rect width="${SPINE}" height="${H}" fill="${c.spine}"/>`);
  parts.push(`<rect x="${SPINE}" width="1.5" height="${H}" fill="${c.fg}" fill-opacity="0.22"/>`);
  parts.push(`<rect x="8" y="${H - 58}" width="10" height="10" fill="${T.mustard}"/>`);

  let top = 78;
  if (booklet) {
    // A booklet wears a charcoal band at the head, naming what it is.
    parts.push(`<rect x="${SPINE}" width="${W - SPINE}" height="64" fill="${T.charcoal}"/>`);
    parts.push(`<path d="${line("A BOOKLET FOR CHURCH LEADERS", { face: "ui", weight: 500, size: 14, x: cx, y: 38, tracking: 0.26, anchor: "middle" }).d}" fill="${T.bone}"/>`);
    top = 112;
  }

  const lines = titleLines(entry, title);
  const set = setTitle({
    lines, cx, top, width: measureWidth,
    cap: booklet ? 64 : lines.length === 1 ? 132 : lines.length === 2 ? 118 : 84,
    weight: booklet ? 600 : 700, upper: !booklet, tracking: booklet ? 0 : 0.015, c,
  });
  parts.push(set.svg);

  let y = set.bottom + 44;
  if (subtitle) {
    const opts = { face: "italic", weight: 400, size: 27 };
    for (const text of wrap(subtitle, 450, opts)) {
      parts.push(`<path d="${line(text, { ...opts, x: cx, y, anchor: "middle" }).d}" fill="${c.fg}"/>`);
      y += 33;
    }
  }
  y += 4;
  parts.push(`<rect x="${cx - 24}" y="${y}" width="48" height="2.5" fill="${c.rule}"/>`);
  y += 30;

  // The picture: as large as the room between the rule and the author allows.
  // It is fitted by its own bounds (ART_META.box), so a wide drawing fills
  // the width and a tall one the height.
  const meta = { horizon: 300, band: true, box: [0, 0, 400, 340], ...(ART_META[entry.art] ?? {}) };
  const [bx0, by0, bx1, by1] = meta.box;
  const artBottom = H - (meta.band ? 128 : 104);
  const scale = Math.min(500 / (bx1 - bx0), (artBottom - y) / (by1 - by0));
  const ax = cx - ((bx0 + bx1) / 2) * scale;
  const ay = artBottom - by1 * scale;
  const horizon = ay + meta.horizon * scale;
  if (meta.band) {
    parts.push(`<rect x="${SPINE + 1.5}" y="${horizon + 8}" width="${W - SPINE}" height="18" fill="url(#hh)" fill-opacity="0.6"/>`);
  }
  parts.push(`<rect x="${SPINE + 1.5}" y="${horizon - 1.4 * scale}" width="${W - SPINE}" height="${2.8 * scale}" fill="${c.pen.ink}"/>`);
  parts.push(`<g transform="translate(${ax.toFixed(2)},${ay.toFixed(2)}) scale(${scale.toFixed(4)})">${draw(pen(c.pen))}</g>`);

  parts.push(`<path d="${line("JAMES BELL", { face: "ui", weight: 500, size: 19, x: cx, y: H - 46, tracking: 0.34, anchor: "middle" }).d}" fill="${c.fg}"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${hatchDefs(c.pen.ink)}</defs>${parts.join("")}</svg>`;
}

// ── a kind of printable ──────────────────────────────────────────────────

const KW = 400;
const KH = 518;

function kindSvg(kind) {
  const draw = KIND_ART[kind.art];
  if (!draw) throw new Error(`build-covers: the kind "${kind.id}" asks for the drawing "${kind.art}", which scripts/lib/cover-art.mjs does not have`);
  const c = palette("light", kind.tone);
  const p = pen(c.pen);
  const cx = KW / 2;
  const label = kind.label.toUpperCase();
  const size = Math.min(46, (300 / measure(label, { face: "display", weight: 600, size: 100, tracking: 0.03 })) * 100);
  const disc = `M${cx - 124},196a124,124 0 1,0 248,0a124,124 0 1,0 -248,0Z`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${KW}" height="${KH}" viewBox="0 0 ${KW} ${KH}"><defs>${hatchDefs(c.pen.ink)}</defs>`,
    `<rect width="${KW}" height="${KH}" fill="${T.bone}"/>`,
    `<rect x="14" y="14" width="${KW - 28}" height="${KH - 28}" fill="none" stroke="${T.charcoal}" stroke-width="1.5"/>`,
    `<path d="${disc}" fill="${c.pen.tone}" transform="translate(5,4)"/>`,
    p.o(disc),
    `<g transform="translate(${cx - 120},76)">${draw(p)}</g>`,
    `<path d="${line(label, { face: "display", weight: 600, size, x: cx, y: 398, tracking: 0.03, anchor: "middle" }).d}" fill="${T.charcoal}"/>`,
    `<rect x="${cx - 20}" y="420" width="40" height="2.5" fill="${T.mustardDeep}"/>`,
    `<path d="${line("LIVEWELL BY JAMES BELL", { face: "ui", weight: 500, size: 11.5, x: cx, y: 470, tracking: 0.3, anchor: "middle" }).d}" fill="${T.charcoal}"/>`,
    "</svg>",
  ].join("");
}

// ── write, or check ──────────────────────────────────────────────────────

const sha = (data) => crypto.createHash("sha256").update(data).digest("hex").slice(0, 24);

/** Every cover as { name, source (SVG text or image bytes), files: [[file, width, height, format]] }. */
function plan() {
  const all = [];
  for (const entry of COVERS.books) {
    const files = [[`${entry.id}-400.webp`, 400, 600, "webp"], [`${entry.id}-800.webp`, 800, 1200, "webp"], [`${entry.id}.jpg`, 1200, 1800, "jpeg"]];
    if (entry.image) {
      const abs = path.join(ROOT, entry.image);
      if (!fs.existsSync(abs)) throw new Error(`build-covers: "${entry.id}" names the image ${entry.image}, which is not on disk`);
      all.push({ name: entry.id, uploaded: true, source: fs.readFileSync(abs), files });
    } else all.push({ name: entry.id, source: bookSvg(entry), files });
  }
  for (const kind of COVERS.kinds) all.push({ name: `kind-${kind.id}`, source: kindSvg(kind), files: [[`kind-${kind.id}-400.webp`, KW, KH, "webp"]] });
  return all;
}

async function raster(item, width, height, format) {
  const base = item.uploaded
    ? sharp(item.source).resize(width, height, { fit: "cover", position: "centre" })
    : sharp(Buffer.from(item.source), { density: (72 * width) / (item.name.startsWith("kind-") ? KW : W) }).resize(width, height);
  return format === "webp" ? base.webp({ quality: 86, effort: 6 }).toBuffer() : base.flatten({ background: T.bone }).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}

const items = plan();
const fingerprints = Object.fromEntries(items.map((i) => [i.name, sha(i.source)]));

if (CHECK) {
  const problems = [];
  const recorded = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")).covers : {};
  for (const item of items) {
    if (recorded[item.name] !== fingerprints[item.name]) problems.push(`${item.name}: the committed cover is not what the data draws now`);
    for (const [file, width, height] of item.files) {
      const abs = path.join(OUT, file);
      if (!fs.existsSync(abs)) {
        problems.push(`${file} is missing`);
        continue;
      }
      const meta = await sharp(abs).metadata();
      if (meta.width !== width || meta.height !== height) problems.push(`${file} is ${meta.width} x ${meta.height}, not ${width} x ${height}`);
    }
  }
  for (const name of Object.keys(recorded)) if (!(name in fingerprints)) problems.push(`${name}: recorded, and no longer in client/src/data/covers.json`);
  if (problems.length) {
    for (const p of problems) console.error(`[covers] ${p}`);
    console.error("[covers] run: node scripts/build-covers.mjs");
    process.exit(1);
  }
  console.log(`[covers] in step (${COVERS.books.length} covers, ${COVERS.kinds.length} kind cards)`);
} else {
  fs.mkdirSync(OUT, { recursive: true });
  const keep = new Set();
  let bytes = 0;
  for (const item of items) {
    for (const [file, width, height, format] of item.files) {
      const buf = await raster(item, width, height, format);
      fs.writeFileSync(path.join(OUT, file), buf);
      keep.add(file);
      bytes += buf.length;
    }
  }
  for (const file of fs.readdirSync(OUT)) if (!keep.has(file)) fs.unlinkSync(path.join(OUT, file));
  fs.writeFileSync(MANIFEST, `${JSON.stringify({ _about: "Written by scripts/build-covers.mjs: the fingerprint of each cover's drawing. `--check` compares these with what the data draws today.", covers: fingerprints }, null, 2)}\n`);
  console.log(`[covers] wrote ${keep.size} files (${(bytes / 1024).toFixed(0)} KB) to client/public/covers/`);
}

if (SHEET) {
  // The contact sheet: every cover, then every kind card, on one page.
  const cell = { w: 300, h: 450, gap: 24 };
  const perRow = 6;
  const books = items.filter((i) => !i.name.startsWith("kind-"));
  const kinds = items.filter((i) => i.name.startsWith("kind-"));
  const rows = Math.ceil(books.length / perRow);
  const kindCell = { w: 170, h: 220 };
  const width = perRow * cell.w + (perRow + 1) * cell.gap;
  const kindsTop = cell.gap + rows * (cell.h + cell.gap) + cell.gap;
  const height = kindsTop + kindCell.h + cell.gap * 2;
  const composite = [];
  for (const [i, item] of books.entries()) {
    const buf = item.uploaded ? await sharp(item.source).resize(cell.w, cell.h, { fit: "cover" }).png().toBuffer() : await sharp(Buffer.from(item.source), { density: (72 * cell.w) / W }).resize(cell.w, cell.h).png().toBuffer();
    composite.push({ input: buf, left: cell.gap + (i % perRow) * (cell.w + cell.gap), top: cell.gap + Math.floor(i / perRow) * (cell.h + cell.gap) });
  }
  for (const [i, item] of kinds.entries()) {
    const buf = await sharp(Buffer.from(item.source), { density: (72 * kindCell.w) / KW }).resize(kindCell.w, kindCell.h).png().toBuffer();
    composite.push({ input: buf, left: cell.gap + i * (kindCell.w + 16), top: kindsTop });
  }
  fs.mkdirSync(path.dirname(SHEET), { recursive: true });
  await sharp({ create: { width, height, channels: 3, background: T.boneMuted } }).composite(composite).png().toFile(SHEET);
  console.log(`[covers] contact sheet: ${SHEET}`);
}
