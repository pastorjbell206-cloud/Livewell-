// Contact sheet: small stills across the film, to look at before rendering.
// Run: FILM_DIR=film/<name> node film/tools/sheet.mjs [t1,t2,...]   (default: one still every ~2.4 seconds)
import path from "node:path"; import fs from "node:fs";
import { FD, launch, open, filmUrl } from "./common.mjs";
const out = path.resolve("film/shots/" + path.basename(FD)); fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const b = await launch(); const [p, errors] = await open(b, { width: 1280, height: 720 });
await p.goto(filmUrl("rec=1")); await p.waitForFunction(() => document.title === "ready");
const length = await p.evaluate(() => window.LENGTH);
const n = Math.round(length / 2.4);
const times = process.argv[2] ? process.argv[2].split(",").map(Number) : [...Array(n)].map((_, i) => +(((i + 0.5) / n) * length).toFixed(1));
const files = [];
for (const t of times) { await p.evaluate((t) => window.__frame(t), t); const f = `${out}/f-${String(t).padStart(6, "0")}.png`; await p.screenshot({ path: f }); files.push([f, t]); }
const cols = process.argv[3] ? Number(process.argv[3]) : 4, w = Math.floor(1560 / cols);
fs.writeFileSync(`${out}/s.html`, `<body style="margin:0;background:#555;display:flex;flex-wrap:wrap;gap:6px;padding:6px">${files.map(([f, t]) => `<figure style="margin:0"><img src="${path.basename(f)}" style="display:block;width:${w}px"><figcaption style="font:12px sans-serif;color:#fff">${t}s</figcaption></figure>`).join("")}</body>`);
const s = await b.newPage({ viewport: { width: 1600, height: 600 } });
await s.goto(`file://${out}/s.html`); await s.screenshot({ path: `${out}/sheet.png`, fullPage: true });
await b.close(); console.log("length", length.toFixed(1), "stills", files.length, "errors", JSON.stringify(errors));
