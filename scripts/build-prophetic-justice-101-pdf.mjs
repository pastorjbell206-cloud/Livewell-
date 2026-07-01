/**
 * build-prophetic-justice-101-pdf.mjs — render the "Prophetic Justice 101" manuscript
 * (content/books/prophetic-justice-101.md) into the gated ebook PDF served by /api/download.
 * Run:  node scripts/build-prophetic-justice-101-pdf.mjs
 *
 * Idempotent: overwrites api/_ebooks/prophetic-justice-101.pdf each run.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "content/books/prophetic-justice-101.md");
const OUT = path.join(ROOT, "api/_ebooks/prophetic-justice-101.pdf");

const INK = "#14110C";
const MUTED = "#5A5448";
const MUSTARD = "#9A7412";
const TITLE = "Prophetic Justice 101";
const SUBTITLE = "Mishpat, Tsedaqah, and What the Church Owes Its Neighborhood";
const AUTHOR = "James Bell";
const EPIGRAPH = "But let justice roll down like waters, and righteousness like an ever-flowing stream.";
const EPIGRAPH_BY = "Amos, the prophet, eighth century BC";

const md = fs.readFileSync(SRC, "utf8");
const hr = md.indexOf("\n---\n");
const body = (hr >= 0 ? md.slice(hr + 5) : md).trim();

const blocks = [];
for (const raw of body.split(/\n\n+/)) {
  const t = raw.trim();
  if (!t || t === "---") continue;
  if (t.startsWith("## ")) blocks.push({ type: "chapter", text: t.slice(3).trim() });
  else if (t.startsWith("> ")) blocks.push({ type: "quote", text: t.replace(/^>\s?/gm, "").replace(/\*/g, "").trim() });
  else if (t.startsWith("*") && t.endsWith("*") && t.length < 120) blocks.push({ type: "ref", text: t.replace(/^\*|\*$/g, "").trim() });
  else blocks.push({ type: "para", text: t.replace(/\n/g, " ").replace(/\*/g, "").trim() });
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const doc = new PDFDocument({
  size: "A5",
  margins: { top: 60, bottom: 64, left: 58, right: 58 },
  info: { Title: TITLE, Author: AUTHOR },
});
doc.pipe(fs.createWriteStream(OUT));

doc.font("Times-Roman").fillColor(INK);
doc.moveDown(5);
doc.fontSize(30).text(TITLE, { align: "center" });
doc.moveDown(0.7);
doc.fontSize(13).font("Times-Italic").fillColor(MUTED).text(SUBTITLE, { align: "center" });
doc.moveDown(3);
doc.font("Times-Roman").fillColor(INK).fontSize(14).text(AUTHOR, { align: "center" });
doc.fontSize(9.5).fillColor(MUSTARD).text("LIVEWELL BY JAMES BELL", { align: "center", characterSpacing: 1.5 });

doc.addPage();
doc.moveDown(6);
doc.font("Times-Italic").fillColor(INK).fontSize(13).text(EPIGRAPH, { align: "center" });
doc.moveDown(0.8);
doc.font("Times-Roman").fillColor(MUTED).fontSize(10.5).text("— " + EPIGRAPH_BY, { align: "center" });

for (const blk of blocks) {
  if (blk.type === "chapter") {
    doc.addPage();
    doc.moveDown(1.5);
    doc.font("Times-Bold").fillColor(INK).fontSize(19).text(blk.text);
    const y = doc.y + 7;
    doc.moveTo(58, y).lineTo(118, y).strokeColor(MUSTARD).lineWidth(2).stroke();
    doc.moveDown(1.3);
  } else if (blk.type === "ref") {
    doc.font("Times-Italic").fillColor(MUSTARD).fontSize(11).text(blk.text);
    doc.moveDown(0.5);
  } else if (blk.type === "quote") {
    doc.moveDown(0.5);
    doc.font("Times-Italic").fillColor(MUSTARD).fontSize(13).text(blk.text, { indent: 14, align: "left", lineGap: 1 });
    doc.moveDown(0.6);
  } else {
    doc.font("Times-Roman").fillColor(INK).fontSize(11.5).text(blk.text, { align: "justify", lineGap: 1.5 });
    doc.moveDown(0.55);
  }
}

doc.end();
console.log("Building PDF →", path.relative(ROOT, OUT), `(${blocks.length} blocks)`);
