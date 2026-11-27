// YouTube thumbnails for the narrated films, 1280x720, in the LiveWell look.
// Run from the repo root:  node film/tools/thumbs.mjs [slug ...]
// Reads client/src/data/narrated-films.json for titles and film/out/<slug>-poster.jpg for the picture.
// Writes film/out/thumbs/<slug>.jpg. The picture is the film's own poster frame, cropped to the drawing.
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const films = JSON.parse(fs.readFileSync("client/src/data/narrated-films.json", "utf8")).films;
// A finished film not yet on the site is named on the command line; its title comes from its script.
for (const s of process.argv.slice(2)) if (!films.some((f) => f.slug === s) && fs.existsSync(`film/${s}/script.json`)) films.push({ slug: s, title: JSON.parse(fs.readFileSync(`film/${s}/script.json`, "utf8")).title });
const idx = JSON.parse(fs.readFileSync("client/public/explorer/index.json", "utf8"));
const items = Array.isArray(idx) ? idx : idx.films || idx.items;
const kind = Object.fromEntries(items.map((i) => [i.slug || i.id, i.kind || i.group]));
const LABEL = { books: "Books of the Bible", beliefs: "What Christians believe", story: "The story of the Bible", questions: "Honest questions", ideas: "Big ideas of the Bible", verses: "Well-known verses", stories: "Bible stories" };
const b64 = (f) => fs.readFileSync(path.resolve(f)).toString("base64");
const font = (f) => b64("client/public/fonts/" + f);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const page = (f) => {
  const [head, ...rest] = f.title.split(": ");
  const sub = rest.join(": ");
  const big = sub ? head : f.title;
  // A long title with no subtitle is set on two lines, broken near the middle.
  let lines = [big];
  if (!sub && big.length > 16) { const w = big.split(" "); let best = 1, d = 1e9; for (let i = 1; i < w.length; i++) { const x = Math.abs(w.slice(0, i).join(" ").length - w.slice(i).join(" ").length); if (x < d) { d = x; best = i; } } lines = [w.slice(0, best).join(" "), w.slice(best).join(" ")]; }
  const longest = Math.max(...lines.map((l) => l.length));
  const size = lines.length === 2 ? (longest <= 14 ? 104 : longest <= 18 ? 92 : 78) : sub ? (longest <= 9 ? 138 : longest <= 14 ? 116 : 92) : (longest <= 9 ? 150 : 124);
  const label = LABEL[kind[f.slug]] || (f.slug.startsWith("apol-") ? "Is the Bible reliable?" : f.slug.startsWith("doc-") ? "What Christians believe" : f.slug.startsWith("hist-") ? "Church history" : "A short film");
  return `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:"Display";font-style:normal;font-weight:400 600;src:url(data:font/woff2;base64,${font("cormorant-garamond-400-latin.woff2")}) format("woff2");}
@font-face{font-family:"Display";font-style:italic;font-weight:400;src:url(data:font/woff2;base64,${font("cormorant-garamond-400-italic-latin.woff2")}) format("woff2");}
@font-face{font-family:"Sans";font-weight:400 600;src:url(data:font/woff2;base64,${font("inter-400-latin.woff2")}) format("woff2");}
*{margin:0;box-sizing:border-box}
body{width:1280px;height:720px;background:#14110C;overflow:hidden;position:relative;font-family:"Sans"}
.top{position:absolute;left:0;top:0;width:1280px;height:286px;padding:30px 64px 0 64px}
.kick{color:#D4A017;font-size:22px;letter-spacing:.2em;text-transform:uppercase;font-weight:500}
.rule{width:84px;height:4px;background:#D4A017;margin:12px 0 2px}
.head{font-family:"Display";color:#F5F0E6;font-size:${size}px;line-height:.98;letter-spacing:-.02em;white-space:nowrap}
.sub{font-family:"Display";font-style:italic;color:#D9D3C4;font-size:44px;line-height:1.05;margin-top:0;white-space:nowrap}
.mark{position:absolute;right:56px;top:36px;color:#F5F0E6;font-family:"Display";font-size:30px;letter-spacing:.01em}
.mark small{display:block;font-family:"Sans";font-size:12px;letter-spacing:.24em;color:#D9D3C4;text-transform:uppercase;margin-top:2px;text-align:right}
.pic{position:absolute;left:0;top:286px;width:1280px;height:434px;background:#F5F0E6 url(data:image/jpeg;base64,${b64(`film/out/${f.slug}-poster.jpg`)}) no-repeat;background-size:1280px 720px;background-position:0 -113px;border-top:6px solid #D4A017}
</style><body>
<div class="top"><div class="kick">${esc(label)}</div><div class="rule"></div><div class="head">${lines.map(esc).join("<br>")}</div>${sub ? `<div class="sub">${esc(sub)}</div>` : ""}</div>
<div class="mark">LiveWell<small>by James Bell</small></div>
<div class="pic"></div></body>`;
};

const want = process.argv.slice(2);
fs.mkdirSync("film/out/thumbs", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const p = await browser.newPage({ viewport: { width: 1280, height: 720 } });
let n = 0;
for (const f of films) {
  if (want.length && !want.includes(f.slug)) continue;
  if (!fs.existsSync(`film/out/${f.slug}-poster.jpg`)) { console.log("no poster", f.slug); continue; }
  await p.setContent(page(f)); await p.evaluate(() => document.fonts.ready);
  const over = await p.evaluate(() => [...document.querySelectorAll(".head,.sub")].some((e) => e.scrollWidth > 1150 - (e.classList.contains("head") ? 190 : 0)));
  await p.screenshot({ path: `film/out/thumbs/${f.slug}.jpg`, type: "jpeg", quality: 90 });
  n++; if (over) console.log("check width", f.slug, f.title);
}
await browser.close();
console.log("thumbnails", n);
