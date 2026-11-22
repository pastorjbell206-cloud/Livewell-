/**
 * Type for the cover generator (scripts/build-covers.mjs): the site's own
 * self-hosted fonts (client/public/fonts/*.woff2) turned into SVG outlines,
 * so a cover's lettering is drawn the same on every machine and needs no
 * installed font.
 *
 * fontkit reads the files. It is not a dependency of its own here: pdfkit
 * (already used by scripts/build-pdfs.mjs) ships it, so it is resolved
 * through pdfkit. fontkit cannot make a weight instance of a variable WOFF2
 * file, so the weight is applied here, glyph by glyph, with fontkit's own
 * variation processor before a glyph's outline is first read.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const fontkit = createRequire(require.resolve("pdfkit"))("fontkit");
const FONTS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/public/fonts");

const FILES = {
  display: "cormorant-garamond-400-latin.woff2",
  italic: "cormorant-garamond-400-italic-latin.woff2",
  ui: "inter-400-latin.woff2",
};

const cache = new Map();

/**
 * fontkit unpacks a WOFF2 glyph table with a bare stand-in for the glyph, and
 * that stand-in breaks on a composite glyph once a weight is set. Unpack
 * composites as if no weight were set; their parts are moved in vary().
 */
let patched = false;
function patchComposite(font) {
  if (patched) return;
  patched = true;
  const proto = Object.getPrototypeOf(Object.getPrototypeOf(font.getGlyph(0)));
  const original = proto._decodeComposite;
  proto._decodeComposite = function decodeComposite(glyph, stream, offset) {
    if (typeof this._getPhantomPoints === "function") return original.call(this, glyph, stream, offset);
    const plain = Object.create(this._font, { _variationProcessor: { value: null } });
    return original.call({ _font: plain }, glyph, stream, offset);
  };
}

/** A face at a weight. `face` is display | italic | ui; the italic file has one weight. */
function face(name, weight) {
  const key = `${name}@${weight}`;
  if (cache.has(key)) return cache.get(key);
  patchComposite(fontkit.create(fs.readFileSync(path.join(FONTS, FILES[name]))));
  const font = fontkit.create(fs.readFileSync(path.join(FONTS, FILES[name])));
  const variable = font.variationAxes && font.variationAxes.wght;
  if (variable) font.variationCoords = [weight];
  const entry = { font, variable: Boolean(variable), varied: new Set() };
  cache.set(key, entry);
  return entry;
}

/** Move a simple glyph's points to the face's weight, once, before its outline is read. */
function vary(entry, id) {
  if (!entry.variable || entry.varied.has(id)) return;
  entry.varied.add(id);
  const { font } = entry;
  font.getGlyph(id)._decode(); // makes fontkit unpack the WOFF2 glyph table
  const raw = font._transformedGlyphs?.[id];
  const processor = font._variationProcessor;
  if (!raw || !processor) return;
  for (const part of raw.components ?? []) vary(entry, part.glyphID);
  if (!Array.isArray(raw.points) || raw.points.length === 0) return;
  const phantom = [0, 1, 2, 3].map(() => {
    const p = raw.points[0].copy();
    p.x = 0;
    p.y = 0;
    p.onCurve = true;
    p.endContour = true;
    return p;
  });
  const points = [...raw.points, ...phantom];
  processor.transformPoints(id, points);
}

const r = (n) => Math.round(n * 100) / 100;

/**
 * One line of text as an SVG path.
 *   size      font size in px
 *   tracking  extra space after each letter, in em
 *   anchor    start | middle | end, about x
 * Returns { d, width } with the baseline at y.
 */
export function line(text, { face: name = "display", weight = 400, size, x = 0, y = 0, tracking = 0, anchor = "start" }) {
  const entry = face(name, weight);
  const { font } = entry;
  const scale = size / font.unitsPerEm;
  const run = font.layout(String(text));
  for (const g of run.glyphs) vary(entry, g.id);
  let width = 0;
  run.positions.forEach((p, i) => {
    width += p.xAdvance * scale + (i < run.positions.length - 1 ? tracking * size : 0);
  });
  let pen = anchor === "middle" ? x - width / 2 : anchor === "end" ? x - width : x;
  const parts = [];
  run.glyphs.forEach((g, i) => {
    const pos = run.positions[i];
    const ox = pen + pos.xOffset * scale;
    const oy = y - pos.yOffset * scale;
    const d = g.path
      .scale(scale, -scale)
      .translate(ox, oy)
      .toSVG()
      .replace(/-?\d+\.\d{3,}/g, (m) => String(r(Number(m))));
    if (d) parts.push(d);
    pen += pos.xAdvance * scale + tracking * size;
  });
  return { d: parts.join(""), width };
}

/** The width of a line without drawing it. */
export function measure(text, opts) {
  const entry = face(opts.face ?? "display", opts.weight ?? 400);
  const scale = opts.size / entry.font.unitsPerEm;
  const run = entry.font.layout(String(text));
  let width = 0;
  run.positions.forEach((p, i) => {
    width += p.xAdvance * scale + (i < run.positions.length - 1 ? (opts.tracking ?? 0) * opts.size : 0);
  });
  return width;
}

/** Break text into lines no wider than maxWidth, greedily, never splitting a word. */
export function wrap(text, maxWidth, opts) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (cur && measure(next, opts) > maxWidth) {
      lines.push(cur);
      cur = w;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}
