#!/usr/bin/env node
/**
 * docx-to-resource-pdf.mjs — turn a .docx into a clean, on-brand resource PDF.
 *
 * Self-contained: reads word/document.xml straight out of the .docx (a zip) via
 * `unzip`, infers structure from run font sizes / bold / centering, and renders
 * with pdfkit using the bundled house serif fonts. No LibreOffice/pandoc needed.
 *
 * Usage: node scripts/docx-to-resource-pdf.mjs INPUT.docx OUTPUT.pdf
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const [docxPath, outPath] = process.argv.slice(2);
if (!docxPath || !outPath) {
  console.error("Usage: node scripts/docx-to-resource-pdf.mjs INPUT.docx OUTPUT.pdf");
  process.exit(1);
}
const FONTS = path.join(path.dirname(fileURLToPath(import.meta.url)), "book-pipeline", "fonts");

const xml = execSync(`unzip -p "${docxPath}" word/document.xml`, { maxBuffer: 64 * 1024 * 1024 }).toString();
const dec = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");

const paras = [];
for (const m of xml.matchAll(/<w:p\b[^>]*>([\s\S]*?)<\/w:p>/g)) {
  const block = m[1];
  const text = dec([...block.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((t) => t[1]).join("")).trim();
  if (!text) continue;
  // Skip stray style/markup artifacts that some .docx files embed as text.
  if (/lsdException|<w:|w:val=|mso-|\{\s*font|p\.p\d+\s*\{/i.test(text)) continue;
  const sizes = [...block.matchAll(/<w:sz w:val="(\d+)"/g)].map((s) => +s[1]);
  const sz = sizes.length ? Math.max(...sizes) / 2 : 11; // w:sz is half-points
  const center = /<w:jc w:val="center"/.test(block);
  const bold = /<w:b\/>|<w:b /.test(block);
  paras.push({ text, sz, center, bold });
}

const INK = "#14110C", MUTED = "#5A5448", MUSTARD = "#B08A12";
const doc = new PDFDocument({ size: "LETTER", margins: { top: 84, bottom: 84, left: 90, right: 90 } });
doc.pipe(fs.createWriteStream(outPath));
doc.registerFont("body", path.join(FONTS, "IBMPlexSerif-Regular.ttf"));
doc.registerFont("bodyI", path.join(FONTS, "IBMPlexSerif-Italic.ttf"));
doc.registerFont("bodyB", path.join(FONTS, "IBMPlexSerif-Bold.ttf"));
doc.registerFont("display", path.join(FONTS, "YoungSerif-Regular.ttf"));

let first = true;
for (const p of paras) {
  const isTitle = p.sz >= 18 || (p.center && p.sz >= 15 && p.text === p.text.toUpperCase() && p.text.length < 70);
  const isHead = !isTitle && (p.sz >= 14 || (p.bold && p.text.length < 80));
  if (isTitle) {
    if (!first) doc.moveDown(1.2);
    doc.font("display").fontSize(Math.min(p.sz + 4, 26)).fillColor(INK)
      .text(p.text, { align: p.center ? "center" : "left" });
    doc.moveDown(0.4);
  } else if (isHead) {
    doc.moveDown(0.8);
    doc.font("bodyB").fontSize(13).fillColor(MUSTARD).text(p.text, { align: p.center ? "center" : "left" });
    doc.moveDown(0.3);
  } else {
    doc.font(p.center ? "bodyI" : "body").fontSize(11).fillColor(p.center ? MUTED : INK)
      .text(p.text, { align: p.center ? "center" : "left", lineGap: 3 });
    doc.moveDown(0.5);
  }
  first = false;
}
doc.end();
console.log(`wrote ${outPath} (${paras.length} paragraphs)`);
