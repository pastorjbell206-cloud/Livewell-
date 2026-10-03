/**
 * workbooks.mjs — printable workbooks (docs/grow/GROW-PROMPT.md 7.6: "a
 * marriage retreat guide, a premarital workbook").
 *
 * A workbook is content-as-data in client/public/workbooks/<id>.json:
 *
 *   { id, title, subtitle, audience, href (the page it goes with), intro,
 *     howToUse, careNote, closing,
 *     sessions: [{ n, title, why, scripture: [{ ref, text }], questions: [..],
 *                  together, practice, lines }] }
 *
 * Each prints in US Letter and A4 to client/public/downloads/workbooks/
 * <id>-<size>.pdf: a cover, how to use it, the help lines from the verified
 * file, then a session to a page or two, with room for each person to write.
 * scripts/validate-workbooks.mjs checks the shape and the Scripture.
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { balanceQuotes } from "./bsb.mjs";

const INK = "#14110C";
const MUTED = "#5A5448";
const MUSTARD = "#9A7412";
const RULE = "#C9C2B4";
const FIXED_DATE = new Date("2026-01-01T00:00:00Z");
const SITE = "livewellbyjamesbell.co";
const SIZES = { letter: "LETTER", a4: "A4" };

function newDoc(size, title) {
  return new PDFDocument({
    size,
    margins: { top: 56, bottom: 56, left: 56, right: 56 },
    bufferPages: true,
    tagged: true,
    lang: "en-US",
    displayTitle: true,
    pdfVersion: "1.7",
    info: { Title: title, Author: "James Bell", Creator: "LiveWell by James Bell", CreationDate: FIXED_DATE, ModDate: FIXED_DATE },
  });
}

function toBuffer(doc) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    doc.end();
  });
}

function artifact(doc, draw) {
  doc.markContent("Artifact");
  draw();
  doc.endMarkedContent();
}

function checkedLabel(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m - 1]} ${d}, ${y}`;
}

export async function workbookPdf(wb, crisis, size) {
  const doc = newDoc(size, `${wb.title}: a workbook`);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const tag = (type, draw) => root.add(doc.struct(type, () => draw()));
  const W = doc.page.width;
  const left = doc.page.margins.left;
  const width = W - left * 2;
  const bottom = () => doc.page.height - doc.page.margins.bottom - 20;
  const rule = (y) => artifact(doc, () => { doc.save().lineWidth(0.6).strokeColor(RULE).moveTo(left, y).lineTo(left + width, y).stroke().restore(); });
  // A paragraph with *italic* spans, set as one run of continued text.
  const rich = (p, font, size, x, w) => {
    const segs = p.split(/(\*[^*\n]+\*)/).filter(Boolean);
    const italic = font === "Times-Roman" ? "Times-Italic" : font;
    segs.forEach((seg, i) => {
      const it = /^\*[^*\n]+\*$/.test(seg);
      doc.font(it ? italic : font).fontSize(size).fillColor(INK);
      const o = { width: w, lineGap: 2, continued: i < segs.length - 1 };
      if (i === 0) doc.text(it ? seg.slice(1, -1) : seg, x, doc.y, o);
      else doc.text(it ? seg.slice(1, -1) : seg, o);
    });
  };
  const paras = (text, font = "Times-Roman", fs_ = 11) => {
    for (const p of String(text).split(/\n\n+/)) {
      tag("P", () => rich(p, font, fs_, left, width));
      doc.moveDown(0.5);
    }
  };
  const lines = (n) => {
    for (let k = 0; k < n; k++) {
      if (doc.y + 22 > bottom()) { doc.addPage(); doc.y = doc.page.margins.top; }
      doc.y += 20;
      rule(doc.y);
    }
    doc.y += 10;
  };
  // Start a new page unless `h` more points fit, so nothing is stranded at a page's foot.
  const keep = (h) => { if (doc.y + h > bottom()) { doc.addPage(); doc.y = doc.page.margins.top; } };
  const heightOf = (text, font, size, w = width) => doc.font(font).fontSize(size).heightOfString(String(text).replace(/\*/g, ""), { width: w, lineGap: 2 });
  // A heading plus the first paragraph under it (or its first few lines), kept together.
  const headingRoom = (next) => 30 + Math.min(heightOf(String(next || "").split(/\n\n+/)[0], "Times-Roman", 11), 60);

  // Cover
  artifact(doc, () => {
    doc.save().rect(0, 0, W, 34).fill(INK).restore();
    doc.fillColor(MUSTARD).font("Times-Bold").fontSize(10).text("LIVEWELL", 0, 12, { width: W / 2 - 8, align: "right", characterSpacing: 3, lineBreak: false });
    doc.fillColor("#F5F0E6").font("Times-Roman").fontSize(7).text("BY JAMES BELL", W / 2 + 8, 14, { characterSpacing: 2, lineBreak: false });
  });
  doc.y = 150;
  tag("P", () => doc.font("Times-Roman").fontSize(9).fillColor(MUSTARD).text("A WORKBOOK", left, doc.y, { width, align: "center", characterSpacing: 2.4 }));
  doc.moveDown(0.6);
  tag("H1", () => doc.font("Times-Bold").fontSize(28).fillColor(INK).text(wb.title, left, doc.y, { width, align: "center" }));
  doc.moveDown(0.4);
  tag("P", () => doc.font("Times-Italic").fontSize(13).fillColor(MUTED).text(wb.subtitle, left, doc.y, { width, align: "center" }));
  doc.moveDown(0.4);
  tag("P", () => doc.font("Times-Roman").fontSize(10.5).fillColor(MUTED).text(`For ${wb.audience}`, left, doc.y, { width, align: "center" }));
  doc.moveDown(2);
  paras(wb.intro);

  // How to use it, the care note, and the help lines
  doc.addPage();
  doc.y = doc.page.margins.top;
  tag("H2", () => doc.font("Times-Bold").fontSize(16).fillColor(INK).text("How to use this workbook", left, doc.y, { width }));
  doc.moveDown(0.3);
  paras(wb.howToUse);
  if (wb.careNote) { doc.moveDown(0.2); paras(wb.careNote, "Times-Italic", 10.5); }
  doc.moveDown(0.4);
  const want = new Set(["suicide", "abuse"]);
  const crisisLines = crisis.resources.filter((r) => r.id === "988" || r.topics.some((t) => want.has(t)));
  const top = doc.y;
  tag("H2", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text("If anyone is in danger", left + 12, top + 10, { width: width - 24 }));
  for (const r of crisisLines) {
    const acts = r.actions.filter((a) => a.kind !== "chat").map((a) => a.label).join(" · ");
    tag("P", () => doc.font("Times-Roman").fontSize(10).fillColor(INK).text(`${r.name}: ${acts}.`, left + 12, doc.y + 1, { width: width - 24 }));
  }
  tag("P", () => doc.font("Times-Roman").fontSize(10).fillColor(INK).text(`${crisis.emergency.label}: ${crisis.emergency.for}`, left + 12, doc.y + 1, { width: width - 24 }));
  tag("P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(`Free and confidential. Numbers checked ${checkedLabel(crisis.checked)} against each service's official site (US).`, left + 12, doc.y + 3, { width: width - 24 }));
  const boxBottom = doc.y + 10;
  artifact(doc, () => { doc.save().lineWidth(0.8).strokeColor(MUSTARD).rect(left, top, width, boxBottom - top).stroke().restore(); });
  doc.y = boxBottom + 14;
  tag("P", () => doc.font("Times-Italic").fontSize(9).fillColor(MUTED).text("Scripture quotations are from the Berean Standard Bible, which is in the public domain.", left, doc.y, { width }));

  // Sessions
  for (const s of wb.sessions) {
    doc.addPage();
    doc.y = doc.page.margins.top;
    tag("P", () => doc.font("Times-Roman").fontSize(9).fillColor(MUSTARD).text(`SESSION ${s.n} OF ${wb.sessions.length}`, left, doc.y, { width, characterSpacing: 2 }));
    tag("H2", () => doc.font("Times-Bold").fontSize(20).fillColor(INK).text(s.title, left, doc.y + 4, { width }));
    doc.moveDown(0.4);
    paras(s.why);
    for (const v of s.scripture || []) {
      // Set apart by the indent and the italic, so no outer quotation marks; the BSB's own stay, paired.
      const text = balanceQuotes(v.text);
      keep(Math.min(heightOf(text, "Times-Italic", 11, width - 14), 200) + 24);
      tag("P", () => doc.font("Times-Italic").fontSize(11).fillColor(INK).text(text, left + 14, doc.y, { width: width - 14, lineGap: 2 }));
      tag("P", () => doc.font("Times-Bold").fontSize(9.5).fillColor(MUSTARD).text(`${v.ref} (BSB)`, left + 14, doc.y + 2, { width: width - 14 }));
      doc.moveDown(0.6);
    }
    if (s.questions?.length) {
      const n = Math.max(2, Math.min(5, s.lines || 3));
      // A question and its ruled lines stay on one page; the heading stays with the first question.
      const block = (q, i) => heightOf(`${i + 1}. ${q}`, "Times-Roman", 11) + n * 20 + 14;
      keep(28 + block(s.questions[0], 0));
      tag("H3", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text("Each of you, on your own", left, doc.y, { width }));
      doc.moveDown(0.3);
      s.questions.forEach((q, i) => {
        keep(block(q, i));
        tag("P", () => rich(`${i + 1}. ${q}`, "Times-Roman", 11, left, width));
        lines(n);
      });
    }
    if (s.together) {
      keep(headingRoom(s.together));
      tag("H3", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text("Together", left, doc.y, { width }));
      doc.moveDown(0.2);
      paras(s.together);
    }
    if (s.practice) {
      const last = s.n === wb.sessions.length;
      keep(headingRoom(s.practice));
      tag("H3", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text(last ? "In the weeks ahead" : "Before the next session", left, doc.y, { width }));
      doc.moveDown(0.2);
      paras(s.practice);
    }
  }

  if (wb.closing) {
    doc.addPage();
    doc.y = doc.page.margins.top;
    tag("H2", () => doc.font("Times-Bold").fontSize(16).fillColor(INK).text("At the end", left, doc.y, { width }));
    doc.moveDown(0.3);
    paras(wb.closing);
  }
  root.end();

  const range = doc.bufferedPageRange();
  for (let i = range.start + 1; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const mb = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    artifact(doc, () => {
      doc.font("Times-Roman").fontSize(7.5).fillColor(MUTED).text(`${SITE} · ${wb.title} · ${i - range.start}`, 36, doc.page.height - 30, { width: W - 72, align: "center", lineBreak: false });
    });
    doc.page.margins.bottom = mb;
  }
  return toBuffer(doc);
}

export function listWorkbooks(root) {
  const dir = path.join(root, "client/public/workbooks");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "index.json").sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
}

export async function buildWorkbooks(root) {
  const out = path.join(root, "client/public/downloads/workbooks");
  const books = listWorkbooks(root);
  if (!books.length) return [];
  fs.mkdirSync(out, { recursive: true });
  const crisis = JSON.parse(fs.readFileSync(path.join(root, "client/src/data/crisis-resources.json"), "utf8"));
  const written = [];
  for (const wb of books) {
    for (const [name, size] of Object.entries(SIZES)) {
      const p = path.join(out, `${wb.id}-${name}.pdf`);
      fs.writeFileSync(p, await workbookPdf(wb, crisis, size));
      written.push(p);
    }
  }
  return written;
}
