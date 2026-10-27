#!/usr/bin/env node
/**
 * bring-portrait-home.mjs: serve James's portrait from this site (U08).
 *
 * The home hero, /about, and the author card under every essay load the
 * portrait from a legacy CloudFront host (d2xsxph8kpxj0f.cloudfront.net), a
 * single point of failure this repo does not control, at whatever size it was
 * uploaded. This writes one 4:5 crop, cut the way the pages already show it
 * (centred, as object-fit: cover does), at 640 x 800: about 4x the home
 * byline (168 x 210 on a computer), and enough for /about's figure.
 *
 *   node scripts/bring-portrait-home.mjs                 # from PORTRAIT_URL
 *   node scripts/bring-portrait-home.mjs <url or file>   # another source
 *
 * It writes client/public/images/james-bell-portrait.jpg and, only when that
 * succeeds and PORTRAIT_URL still names the CloudFront file, points
 * PORTRAIT_URL (client/src/lib/positioning.ts) at it. Home, /about, the author
 * card, and the prerendered home hero all read that one constant. Run it from
 * a machine that can reach the source (the agent sandbox cannot reach
 * CloudFront), look at the image, then commit both files.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSITIONING = path.join(ROOT, "client/src/lib/positioning.ts");
const OUT = path.join(ROOT, "client/public/images/james-bell-portrait.jpg");
const PUBLIC_PATH = "/images/james-bell-portrait.jpg";
const LEGACY_HOST = "d2xsxph8kpxj0f.cloudfront.net";

const positioning = fs.readFileSync(POSITIONING, "utf8");
const current = positioning.match(/export const PORTRAIT_URL\s*=\s*"([^"]+)"/)?.[1];
const source = process.argv[2] ?? (/^https?:\/\//.test(current ?? "") ? current : undefined);
if (!source) {
  console.error(
    current === PUBLIC_PATH
      ? `PORTRAIT_URL already names "${PUBLIC_PATH}"; pass a URL or a file to replace the photograph.`
      : "No source: pass a URL or a file, or set PORTRAIT_URL in positioning.ts."
  );
  process.exit(1);
}

let input;
if (/^https?:\/\//.test(source)) {
  const res = await fetch(source).catch((err) => {
    console.error(`Could not reach ${source} (${err.cause?.code ?? err.message}). Pass a file instead.`);
    process.exit(1);
  });
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !type.startsWith("image/")) {
    console.error(`Could not fetch an image from ${source} (HTTP ${res.status}, ${type || "no type"}).`);
    process.exit(1);
  }
  input = Buffer.from(await res.arrayBuffer());
} else {
  input = fs.readFileSync(source);
}

const meta = await sharp(input).metadata();
if (!meta.width || !meta.height) {
  console.error(`${source} is not an image sharp can read.`);
  process.exit(1);
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
await sharp(input)
  .rotate() // honor the camera's orientation before cropping
  .resize({ width: 640, height: 800, fit: "cover", position: "centre", withoutEnlargement: true })
  .jpeg({ quality: 80, progressive: true, mozjpeg: true })
  .toFile(OUT);
const out = await sharp(OUT).metadata();
console.log(
  `${path.relative(ROOT, OUT)}: ${out.width} x ${out.height}, ${(fs.statSync(OUT).size / 1024).toFixed(0)} kB ` +
    `(source ${meta.width} x ${meta.height}, ${(input.length / 1024).toFixed(0)} kB)`
);

if (current?.includes(LEGACY_HOST)) {
  fs.writeFileSync(POSITIONING, positioning.replace(`"${current}"`, `"${PUBLIC_PATH}"`));
  console.log(`PORTRAIT_URL now "${PUBLIC_PATH}" in ${path.relative(ROOT, POSITIONING)}.`);
} else if (current !== PUBLIC_PATH) {
  console.log(`PORTRAIT_URL left as "${current}"; point it at "${PUBLIC_PATH}" if that is the intent.`);
}
