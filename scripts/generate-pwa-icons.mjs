// Generates PWA icons (192x192, 512x512) with no image-library dependencies.
// Solid charcoal (#1A1A1A) background with a cream (#F5F0E6) "LW" mark,
// rendered from a coarse bitmap grid and scaled to the target size.
// PNG encoding is done by hand: IHDR + IDAT (zlib deflate) + IEND.

import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "..", "client", "public");

const CHARCOAL = [0x1a, 0x1a, 0x1a];
const CREAM = [0xf5, 0xf0, 0xe6];

// 24x16 grid spelling "LW". 1 = cream, 0 = charcoal.
// L occupies columns 1-9, W occupies columns 11-23.
const GRID_W = 24;
const GRID_H = 16;
const rows = [
  "........................",
  "........................",
  ".##........##.......##..",
  ".##........##.......##..",
  ".##........##.......##..",
  ".##........##.......##..",
  ".##........##..##...##..",
  ".##........##..##...##..",
  ".##........##.####..##..",
  ".##........##.#..#..##..",
  ".##.......######..####..",
  ".##.......####....####..",
  ".########..##......##...",
  ".########..##......##...",
  "........................",
  "........................",
];

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(size) {
  // Raw RGB scanlines, each prefixed with filter byte 0 (None).
  const raw = Buffer.alloc(size * (1 + size * 3));
  // Letterbox the grid into the middle ~70% of the icon.
  const drawW = Math.round(size * 0.78);
  const cell = drawW / GRID_W;
  const drawH = cell * GRID_H;
  const offX = (size - drawW) / 2;
  const offY = (size - drawH) / 2;

  for (let y = 0; y < size; y++) {
    const rowStart = y * (1 + size * 3);
    raw[rowStart] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const gx = Math.floor((x - offX) / cell);
      const gy = Math.floor((y - offY) / cell);
      const lit =
        gx >= 0 && gx < GRID_W && gy >= 0 && gy < GRID_H && rows[gy][gx] === "#";
      const [r, g, b] = lit ? CREAM : CHARCOAL;
      const p = rowStart + 1 + x * 3;
      raw[p] = r;
      raw[p + 1] = g;
      raw[p + 2] = b;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); // width
  ihdr.writeUInt32BE(size, 4); // height
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor RGB
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

for (const size of [192, 512]) {
  const file = path.join(outDir, `pwa-${size}x${size}.png`);
  writeFileSync(file, encodePng(size));
  console.log(`wrote ${file}`);
}
