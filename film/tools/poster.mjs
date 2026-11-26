// One strong frame as a poster, with the kicker and captions hidden.
// Run: FILM_DIR=film/<name> node film/tools/poster.mjs <second> <out.jpg>
import { launch, open, filmUrl } from "./common.mjs";
const [t, out] = process.argv.slice(2);
const b = await launch(); const [p] = await open(b, { width: 1920, height: 1080 });
await p.goto(filmUrl("hide=1&t=" + t)); await p.waitForFunction(() => document.title.startsWith("frame"));
await p.screenshot({ path: out, type: "jpeg", quality: 90 }); await b.close(); console.log("poster", out);
