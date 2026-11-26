// Draws every frame of a film (60 a second, 1920x1080) into a folder.
// Run: FILM_DIR=film/<name> node film/tools/render.mjs <frames folder>
import path from "node:path"; import fs from "node:fs";
import { launch, open, filmUrl, timeline, fontCss } from "./common.mjs";
const out = path.resolve(process.argv[2]); fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const fps = 60, b = await launch(); const [p, errors] = await open(b, { width: 1280, height: 720 });
await p.goto(filmUrl("rec=1")); await p.waitForFunction(() => document.title === "ready");
await p.evaluate((css) => window.prepareStill(css, 1920), fontCss());
const total = Math.round(timeline.length * fps), t0 = Date.now();
for (let i = 0; i < total; i++) {
  const data = await p.evaluate((t) => window.still(t), i / fps);
  fs.writeFileSync(`${out}/f${String(i).padStart(5, "0")}.jpg`, Buffer.from(data.slice(data.indexOf(",") + 1), "base64"));
  if (i % 1200 === 0) console.log(`frame ${i} of ${total}`);
}
await b.close(); console.log(`rendered ${total} frames in ${Math.round((Date.now() - t0) / 1000)} s, errors ${JSON.stringify(errors)}`);
