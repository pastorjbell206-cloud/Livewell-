#!/usr/bin/env node
/**
 * build-webp-covers.mjs — emit a .webp sibling for every book-cover JPG.
 *
 * The covers are the only heavy rasters on the site (16 files over 200 kB,
 * ~3 MB total). Each gets a .webp at 640 px wide (2× the largest display
 * size, ~320 px) and q80 — typically a 70–85% byte cut. The JPGs stay: they
 * remain the og:image format (social scrapers prefer jpg/png) and the
 * <picture> fallback. Generated .webp files are committed like the other
 * built assets; rerun after adding new covers.
 *
 *   node scripts/build-webp-covers.mjs
 */
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIR = "client/public/books";
const files = readdirSync(DIR).filter((f) => f.endsWith(".jpg"));
let made = 0;
let saved = 0;

for (const f of files) {
  const src = join(DIR, f);
  const out = src.replace(/\.jpg$/, ".webp");
  const before = statSync(src).size;
  await sharp(src).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  const after = statSync(out).size;
  made++;
  saved += Math.max(0, before - after);
  console.log(`${f} -> ${out.split("/").pop()} (${(before / 1024).toFixed(0)}kB -> ${(after / 1024).toFixed(0)}kB)`);
}

console.log(`\n${made} covers converted, ~${(saved / 1024 / 1024).toFixed(1)} MB lighter where webp is served.`);
