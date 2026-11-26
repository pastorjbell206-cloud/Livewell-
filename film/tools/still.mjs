// One exported frame, drawn exactly as render.mjs draws it (fonts inlined), to check before a full render.
// Run: FILM_DIR=film/<name> node film/tools/still.mjs <second> <out.jpg>
import fs from "node:fs";
import { launch, open, filmUrl, fontCss } from "./common.mjs";
const [t, out] = process.argv.slice(2);
const b = await launch(); const [p, errors] = await open(b, { width: 1280, height: 720 });
await p.goto(filmUrl("rec=1")); await p.waitForFunction(() => document.title === "ready");
await p.evaluate((css) => window.prepareStill(css, 1920), fontCss());
await p.evaluate((t) => window.still(t), Number(t));            // first draw lets the inlined fonts load
const data = await p.evaluate((t) => window.still(t), Number(t));
fs.writeFileSync(out, Buffer.from(data.slice(data.indexOf(",") + 1), "base64")); await b.close(); console.log("still", out, JSON.stringify(errors));
