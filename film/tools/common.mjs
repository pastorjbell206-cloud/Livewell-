// Shared by the film tools: opens a film's film.html in Chrome with its script and timeline handed in.
// Run every tool from the repo root, e.g.  FILM_DIR=film/trust-the-bible node film/tools/sheet.mjs
import { chromium } from "playwright-core";
import path from "node:path";
import fs from "node:fs";
export const FD = process.env.FILM_DIR;
if (!FD) { console.error("Set FILM_DIR, e.g. FILM_DIR=film/trust-the-bible"); process.exit(1); }
export const script = JSON.parse(fs.readFileSync(`${FD}/script.json`, "utf8"));
export const timeline = fs.existsSync(`${FD}/timeline.json`) ? JSON.parse(fs.readFileSync(`${FD}/timeline.json`, "utf8")) : null;
export const filmUrl = (query) => "file://" + path.resolve(`${FD}/film.html`) + "?" + query;
export const launch = () => chromium.launch({ channel: "chrome" });
export const open = async (browser, viewport) => {
  const p = await browser.newPage({ viewport }); const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.addInitScript(([s, t]) => { window.SCRIPT = s; window.TIMELINE = t; }, [script, timeline]);
  return [p, errors];
};
const b64 = (f) => fs.readFileSync(path.resolve("client/public/fonts/" + f)).toString("base64");
// The frame export draws the SVG as an image, which cannot load files, so the fonts go in as data.
export const fontCss = () => `
@font-face{font-family:"Display";font-style:normal;font-weight:400 600;src:url(data:font/woff2;base64,${b64("cormorant-garamond-400-latin.woff2")}) format("woff2");}
@font-face{font-family:"Display";font-style:italic;font-weight:400;src:url(data:font/woff2;base64,${b64("cormorant-garamond-400-italic-latin.woff2")}) format("woff2");}
@font-face{font-family:"Sans";font-style:normal;font-weight:400 600;src:url(data:font/woff2;base64,${b64("inter-400-latin.woff2")}) format("woff2");}`;
