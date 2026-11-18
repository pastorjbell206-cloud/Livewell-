#!/usr/bin/env node
/**
 * The icons LiveWell is opened from, once it is on a phone or computer
 * (/app): the favicon's mark (client/public/favicon.svg), a gilded serif
 * "L" on charcoal, drawn in the site's own Cormorant Garamond and rendered
 * to PNG in headless Chromium.
 *
 * Writes into client/public:
 *   pwa-192x192.png, pwa-512x512.png       purpose "any", the mark large
 *   pwa-maskable-192x192.png, -512x512.png purpose "maskable", the mark kept
 *                                          inside the centre circle a phone
 *                                          may crop to
 *   apple-touch-icon.png (180)             iPhone and iPad home screen
 *
 * The colours are the brand's charcoal and mustard (CLAUDE.md, index.css
 * :root); a PNG cannot read a CSS variable, so they are written here once.
 *
 * Needs Playwright's Chromium, which is not a dependency of the site:
 *   PLAYWRIGHT=/path/to/playwright/index.mjs node scripts/generate-pwa-icons.mjs
 * (defaults to the "playwright" package if it can be imported).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "client/public");
const CHARCOAL = "#1A1A1A";
const MUSTARD = "#D4A017";
const font = readFileSync(path.join(OUT, "fonts/cormorant-garamond-400-latin.woff2")).toString("base64");

const pw = process.env.PLAYWRIGHT ? await import(pathToFileURL(process.env.PLAYWRIGHT).href) : await import("playwright");
const { chromium } = pw.default ?? pw;

/** The mark at `size` px, its letter `scale` of the icon's height. */
function page(size, scale) {
  const fs = Math.round(size * scale);
  return `<!doctype html><html><head><style>
@font-face{font-family:C;src:url(data:font/woff2;base64,${font}) format("woff2")}
html,body{margin:0;width:${size}px;height:${size}px;background:${CHARCOAL}}
div{width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-family:C;font-size:${fs}px;line-height:1;color:${MUSTARD}}
span{display:block;transform:translateY(${Math.round(fs * 0.04)}px)}
</style></head><body><div><span>L</span></div></body></html>`;
}

const ICONS = [
  { file: "pwa-192x192.png", size: 192, scale: 0.72 },
  { file: "pwa-512x512.png", size: 512, scale: 0.72 },
  { file: "pwa-maskable-192x192.png", size: 192, scale: 0.5 },
  { file: "pwa-maskable-512x512.png", size: 512, scale: 0.5 },
  { file: "apple-touch-icon.png", size: 180, scale: 0.62 },
];

const browser = await chromium.launch();
try {
  for (const { file, size, scale } of ICONS) {
    const p = await browser.newPage({ viewport: { width: size, height: size } });
    await p.setContent(page(size, scale));
    await p.evaluate(() => document.fonts.ready);
    writeFileSync(path.join(OUT, file), await p.screenshot({ type: "png" }));
    await p.close();
    console.log(`wrote client/public/${file}`);
  }
} finally {
  await browser.close();
}
