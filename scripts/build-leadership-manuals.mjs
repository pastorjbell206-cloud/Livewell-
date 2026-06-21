#!/usr/bin/env node
/**
 * Builds long-form PDF manuals (Elder Training, Deacon Training) from
 * client/public/leadership/formation-guides.json into
 * client/public/downloads/leadership/. Run before build so the PDFs ship.
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const FONTS = "scripts/book-pipeline/fonts";
const F = {
  body: path.join(FONTS, "IBMPlexSerif-Regular.ttf"),
  bold: path.join(FONTS, "IBMPlexSerif-Bold.ttf"),
  ital: path.join(FONTS, "IBMPlexSerif-Italic.ttf"),
  display: path.join(FONTS, "YoungSerif-Regular.ttf"),
};
const INK = "#14110C", MUST = "#7A6010", MUTED = "#5b5547";
const data = JSON.parse(fs.readFileSync("client/public/leadership/formation-guides.json", "utf8"));

function stripInline(s) {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`(.+?)`/g, "$1").replace(/^#+\s*/, "");
}

function renderTeaching(doc, md) {
  const blocks = md.split(/\n\s*\n/);
  for (let raw of blocks) {
    const b = raw.trim();
    if (!b) continue;
    if (/^###\s/.test(b)) {
      doc.moveDown(0.5).font(F.bold).fontSize(12).fillColor(INK).text(stripInline(b), { align: "left" }).moveDown(0.2);
    } else if (/^##\s/.test(b)) {
      doc.moveDown(0.6).font(F.bold).fontSize(14).fillColor(MUST).text(stripInline(b), { align: "left" }).moveDown(0.25);
    } else if (/^>\s/.test(b)) {
      const q = b.split("\n").map(l => l.replace(/^>\s?/, "")).join(" ");
      doc.moveDown(0.2).font(F.ital).fontSize(11).fillColor(MUTED).text(stripInline(q), { indent: 18, align: "left", lineGap: 2 }).moveDown(0.2);
    } else {
      const para = b.split("\n").map(l => l.trim()).join(" ");
      doc.font(F.body).fontSize(11).fillColor(INK).text(stripInline(para), { align: "justify", lineGap: 3 }).moveDown(0.5);
    }
  }
}

function buildManual(guide, outfile) {
  const doc = new PDFDocument({ size: "LETTER", margins: { top: 72, bottom: 72, left: 72, right: 72 }, bufferPages: true });
  const stream = fs.createWriteStream(outfile);
  doc.pipe(stream);

  // Cover
  doc.moveDown(4);
  doc.font(F.display).fontSize(34).fillColor(INK).text(guide.title, { align: "left" });
  doc.moveDown(0.4).font(F.ital).fontSize(16).fillColor(MUST).text(guide.subtitle, { align: "left" });
  doc.moveDown(1.5).font(F.body).fontSize(11.5).fillColor(INK).text(guide.intro, { align: "left", lineGap: 3 });
  doc.moveDown(2).font(F.bold).fontSize(11).fillColor(MUTED).text("James Bell", { align: "left" });
  doc.font(F.body).fontSize(10).fillColor(MUTED).text("livewellbyjamesbell.co  ·  Free to use, copy, and teach.", { align: "left" });

  if (guide.process) {
    doc.addPage();
    doc.font(F.bold).fontSize(16).fillColor(MUST).text("The Process", { align: "left" }).moveDown(0.5);
    guide.process.forEach((p, i) => {
      doc.font(F.bold).fontSize(11).fillColor(INK).text(`${i + 1}.  `, { continued: true }).font(F.body).fillColor(INK).text(p, { lineGap: 2 }).moveDown(0.4);
    });
  }

  guide.sessions.forEach((s, i) => {
    doc.addPage();
    doc.font(F.bold).fontSize(11).fillColor(MUST).text(`SESSION ${i + 1}`, { characterSpacing: 1.5 });
    doc.moveDown(0.2).font(F.display).fontSize(24).fillColor(INK).text(s.title, { lineGap: 1 });
    doc.moveDown(0.2).font(F.ital).fontSize(12).fillColor(MUTED).text(`${s.headline}  ·  ${s.scripture}`).moveDown(0.8);
    if (s.teaching) renderTeaching(doc, s.teaching);

    doc.moveDown(0.6).font(F.bold).fontSize(12).fillColor(MUST).text("The big idea").moveDown(0.15);
    doc.font(F.ital).fontSize(12).fillColor(INK).text(s.bigIdea, { lineGap: 2 }).moveDown(0.6);

    doc.font(F.bold).fontSize(12).fillColor(MUST).text("For discussion").moveDown(0.15);
    s.discussion.forEach((q, j) => doc.font(F.body).fontSize(11).fillColor(INK).text(`${j + 1}.  ${q}`, { lineGap: 2 }).moveDown(0.15));
    doc.moveDown(0.4);

    doc.font(F.bold).fontSize(12).fillColor(MUST).text("This week, try this").moveDown(0.15);
    doc.font(F.body).fontSize(11).fillColor(INK).text(s.practice, { lineGap: 2 }).moveDown(0.6);

    doc.font(F.bold).fontSize(11).fillColor(MUST).text("Closing prayer.  ", { continued: true }).font(F.body).fillColor(INK).text(s.prayer, { lineGap: 2 }).moveDown(0.4);
    doc.font(F.ital).fontSize(11).fillColor(MUST).text(`"${s.memoryVerse.text}" — ${s.memoryVerse.ref}`);
  });

  // page numbers
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.font(F.body).fontSize(9).fillColor(MUTED).text(`${i + 1}`, 72, doc.page.height - 50, { align: "center", width: doc.page.width - 144 });
  }

  doc.end();
  return new Promise((res) => stream.on("finish", res));
}

const targets = [
  { slug: "elder-training-manual", out: "client/public/downloads/leadership/elder-training-manual.pdf" },
  { slug: "deacon-training-manual", out: "client/public/downloads/leadership/deacon-training-manual.pdf" },
];
for (const t of targets) {
  const g = data.guides.find((x) => x.slug === t.slug);
  await buildManual(g, t.out);
  const kb = Math.round(fs.statSync(t.out).size / 1024);
  console.log(`built ${t.out} — ${kb} KB, ${g.sessions.length} sessions`);
}
