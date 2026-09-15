#!/usr/bin/env node
/**
 * build-og-images.mjs
 *
 * Generates a branded 1200x630 PNG share image per file-driven library page,
 * so the context guides, life domains,
 * creeds, history essays, and study-guide toolkits each unfurl with their own
 * title instead of the single og-default.png. Output: client/public/og/<key>.png
 * where <key> mirrors the route (e.g. resources-context-the-slavery-texts.png).
 *
 * Run:  node scripts/build-og-images.mjs   (also runs in the Vercel build)
 *
 * Rendered from an SVG template via sharp. The whole run is wrapped so a
 * missing or broken sharp can never fail the deploy: it logs and exits 0,
 * and pages fall back to og-default.png as before.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "client/public/og");

// Brand (print/raster-safe subset of the tokens)
const CHARCOAL = "#1A1A1A";
const BONE = "#F5F0E6";
const MUSTARD = "#D4A017";
const MUTED = "rgba(245,240,230,0.55)";

// Each source maps a manifest to { key prefix, eyebrow, fields }.
const SOURCES = [
  { file: "client/public/context/guides-index.json", key: "guides", prefix: "resources-context", eyebrow: "Reading Scripture in Context" },
  { file: "client/public/life/domains-index.json", key: "domains", prefix: "life", eyebrow: "Integrated Life" },
  { file: "client/public/creeds/documents-index.json", key: "documents", prefix: "resources-creeds", eyebrow: "Creeds and Confessions" },
  { file: "client/public/history/essays-index.json", key: "essays", prefix: "theology-history", eyebrow: "Church History" },
];

const STUDYGUIDES_DIR = path.join(ROOT, "client/public/studyguides");

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

/** Greedy word-wrap to <= maxChars per line, capped at maxLines (ellipsis). */
function wrap(title, maxChars, maxLines) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; }
    else cur = (cur + " " + w).trim();
    if (lines.length === maxLines) break;
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\.*$/, "") + "...";
  }
  return lines;
}

function svg(eyebrow, title) {
  const lines = wrap(title, 26, 4);
  const fontSize = lines.length > 3 ? 58 : lines.length > 2 ? 66 : 76;
  const lineGap = fontSize * 1.12;
  const blockH = lines.length * lineGap;
  let y = 315 - blockH / 2 + fontSize * 0.8;
  const tspans = lines.map((l) => {
    const t = `<text x="90" y="${Math.round(y)}" fill="${BONE}" font-family="Cormorant Garamond" font-size="${fontSize}" font-weight="400">${esc(l)}</text>`;
    y += lineGap;
    return t;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${CHARCOAL}"/>
  <rect x="0" y="0" width="10" height="630" fill="${MUSTARD}"/>
  <text x="90" y="120" fill="${MUSTARD}" font-family="Inter" font-size="22" font-weight="600" letter-spacing="4">${esc(eyebrow.toUpperCase())}</text>
  <rect x="90" y="140" width="64" height="3" fill="${MUSTARD}"/>
  ${tspans}
  <text x="90" y="565" fill="${MUTED}" font-family="Inter" font-size="22" font-weight="500" letter-spacing="1">livewellbyjamesbell.co</text>
</svg>`;
}

async function main() {
  let sharp;
  try {
    // Point fontconfig (used by libvips/librsvg inside sharp) at the static brand
    // fonts in api/_fonts, so font-family="Cormorant Garamond" / "Inter" in the
    // SVG resolve to the real faces instead of a silent system fallback. Must be
    // set BEFORE sharp is first imported: fontconfig initialises lazily.
    {
      const fontsDir = path.join(ROOT, "api/_fonts");
      const confDir = fs.mkdtempSync(path.join(os.tmpdir(), "og-fontconfig-"));
      const cacheDir = path.join(confDir, "cache");
      fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(
        path.join(confDir, "fonts.conf"),
        `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${fontsDir}</dir><cachedir>${cacheDir}</cachedir><include ignore_missing="yes">/etc/fonts/fonts.conf</include></fontconfig>`
      );
      process.env.FONTCONFIG_PATH = confDir;
      process.env.FONTCONFIG_FILE = path.join(confDir, "fonts.conf");
    }
    sharp = (await import("sharp")).default;
  } catch (err) {
    console.warn(`[og] sharp unavailable (${err.message}). Skipping OG image generation; pages keep the default image.`);
    return;
  }
  fs.mkdirSync(OUT, { recursive: true });

  const items = [];
  for (const s of SOURCES) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(ROOT, s.file), "utf8"));
      for (const e of data[s.key] || []) {
        if (e.slug && e.title) items.push({ key: `${s.prefix}-${e.slug}`, eyebrow: s.eyebrow, title: e.title });
      }
    } catch (err) {
      console.warn(`[og] could not read ${s.file}: ${err.message}`);
    }
  }
  if (fs.existsSync(STUDYGUIDES_DIR)) {
    for (const f of fs.readdirSync(STUDYGUIDES_DIR).filter((x) => x.endsWith(".json"))) {
      try {
        const g = JSON.parse(fs.readFileSync(path.join(STUDYGUIDES_DIR, f), "utf8"));
        if (g.slug && g.title) items.push({ key: `studyguides-${g.slug}`, eyebrow: "Leader's Toolkit", title: g.title });
      } catch { /* skip */ }
    }
  }

  let written = 0;
  for (const it of items) {
    const outPath = path.join(OUT, `${it.key}.png`);
    try {
      await sharp(Buffer.from(svg(it.eyebrow, it.title))).png().toFile(outPath);
      written++;
    } catch (err) {
      console.warn(`[og] failed ${it.key}: ${err.message}`);
    }
  }
  console.log(`[og] wrote ${written} share images to client/public/og/`);
}

main().catch((err) => { console.warn("[og] generation skipped:", err.message); });
