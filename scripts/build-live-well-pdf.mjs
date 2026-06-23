/**
 * build-live-well-pdf.mjs — render the "Live Well" manuscript
 * (content/books/live-well.md) into the gated ebook PDF served by
 * /api/download. Run:  node scripts/build-live-well-pdf.mjs
 *
 * Idempotent: overwrites api/_ebooks/live-well.pdf each run.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "content/books/live-well.md");
const OUT = path.join(ROOT, "api/_ebooks/live-well.pdf");

const INK = "#14110C";
const MUTED = "#5A5448";
const MUSTARD = "#9A7412"; // darkened for white paper
const TITLE = "Live Well";
const SUBTITLE = "Seeking the Good of the City in Christian Exile";
const AUTHOR = "James Bell";
const EPIGRAPH = "Build houses and live in them. Plant gardens and eat their produce... But seek the welfare of the city where I have sent you into exile, and pray to the Lord on its behalf, for in its welfare you will find your welfare.";
const EPIGRAPH_BY = "Jeremiah 29:5, 7";

const md = fs.readFileSync(SRC, "utf8");
const hr = md.indexOf("\n---\n");
const body = (hr >= 0 ? md.slice(hr + 5) : md).trim();

const blocks = [];
for (const raw of body.split(/\n\n+/)) {
  const t = raw.trim();
  if (!t || t === "---") continue;
  if (t.startsWith("## ")) blocks.push({ type: "chapter", text: t.slice(3).trim() });
  else if (t.startsWith("> ")) blocks.push({ type: "quote", text: t.replace(/^>\s?/gm, "").replace(/\*/g, "").trim() });
  else blocks.push({ type: "para", text: t.replace(/\n/g, " ").replace(/\*/g, "").trim() });
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const doc = new PDFDocument({
  size: "A5",
  margins: { top: 60, bottom: 64, left: 58, right: 58 },
  info: { Title: TITLE, Author: AUTHOR },
});
doc.pipe(fs.createWriteStream(OUT));

// ── Title page ──
doc.font("Times-Roman").fillColor(INK);
doc.moveDown(5);
doc.fontSize(30).text(TITLE, { align: "center" });
doc.moveDown(0.7);
doc.fontSize(13).font("Times-Italic").fillColor(MUTED).text(SUBTITLE, { align: "center" });
doc.moveDown(3);
doc.font("Times-Roman").fillColor(INK).fontSize(14).text(AUTHOR, { align: "center" });
doc.fontSize(9.5).fillColor(MUSTARD).text("LIVEWELL BY JAMES BELL", { align: "center", characterSpacing: 1.5 });

// ── Epigraph page ──
doc.addPage();
doc.moveDown(6);
doc.font("Times-Italic").fillColor(INK).fontSize(13).text(EPIGRAPH, { align: "center" });
doc.moveDown(0.8);
doc.font("Times-Roman").fillColor(MUTED).fontSize(10.5).text("— " + EPIGRAPH_BY, { align: "center" });

// ── Body ──
for (const b of blocks) {
  if (b.type === "chapter") {
    doc.addPage();
    doc.moveDown(1.5);
    doc.font("Times-Bold").fillColor(INK).fontSize(19).text(b.text);
    const y = doc.y + 7;
    doc.moveTo(58, y).lineTo(118, y).strokeColor(MUSTARD).lineWidth(2).stroke();
    doc.moveDown(1.3);
  } else if (b.type === "quote") {
    doc.moveDown(0.5);
    doc.font("Times-Italic").fillColor(MUSTARD).fontSize(13).text(b.text, { indent: 14, align: "left", lineGap: 1 });
    doc.moveDown(0.6);
  } else {
    doc.font("Times-Roman").fillColor(INK).fontSize(11.5).text(b.text, { align: "justify", lineGap: 1.5 });
    doc.moveDown(0.55);
  }
}

doc.end();
doc.on("end", () => {});
console.log("Building PDF →", path.relative(ROOT, OUT), `(${blocks.length} blocks)`);
