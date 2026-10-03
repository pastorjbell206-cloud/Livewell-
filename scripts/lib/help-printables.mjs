/**
 * help-printables.mjs — the printables in each Find Help kit.
 *
 * For every care page (client/public/needs/<slug>.json with page: true) this
 * writes four files, each in US Letter and A4, to
 * client/public/downloads/help/<slug>-<kind>-<size>.pdf:
 *
 *   guide      a one-page guide: the answer, this week's steps, the signs that
 *              mean more help, and (on a sensitive subject) the crisis lines
 *   prayer     two prayer cards to a page, with a cut line
 *   scripture  the page's passages as cards, four to a page, with cut lines
 *   week       a worksheet for the week: each step with room to write
 *
 * It also prints every care plan as a booklet
 * (client/public/downloads/plans/<slug>-booklet-<size>.pdf) and the seasonal
 * family packs (client/public/downloads/seasonal/).
 *
 * A printable is designed to be printed, not a web page saved as a PDF
 * (docs/grow/GROW-PROMPT.md 7.6). Tagged PDF with a document language and
 * title, headings and paragraphs as structure, decoration as artifacts.
 * Times (pdfkit's built-in), like the site's other PDFs. Scripture is the
 * Berean Standard Bible, public domain. Crisis numbers come from the one
 * verified file, client/src/data/crisis-resources.json.
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { readingText } from "./bsb.mjs";

const INK = "#14110C";
const MUTED = "#5A5448";
const MUSTARD = "#9A7412"; // darkened mustard so it reads on white paper
const RULE = "#C9C2B4";
const FIXED_DATE = new Date("2026-01-01T00:00:00Z");
const SITE = "livewellbyjamesbell.co";

export const SIZES = { letter: "LETTER", a4: "A4" };
export const KINDS = ["guide", "prayer", "scripture", "week"];

function newDoc(size, title, margins = 54) {
  return new PDFDocument({
    size,
    margins: { top: margins, bottom: margins, left: margins, right: margins },
    bufferPages: true,
    tagged: true,
    lang: "en-US",
    displayTitle: true,
    pdfVersion: "1.7",
    info: { Title: title, Author: "James Bell", Creator: "LiveWell by James Bell", CreationDate: FIXED_DATE, ModDate: FIXED_DATE },
  });
}

/** Run `draw` as a tagged structure element of `type` under `parent`. */
function tag(doc, parent, type, draw) {
  parent.add(doc.struct(type, () => draw()));
}

/** Decoration (rules, boxes, cut lines) is an artifact, not content. */
function artifact(doc, draw) {
  doc.markContent("Artifact");
  draw();
  doc.endMarkedContent();
}

function firstSentence(text) {
  const plain = String(text).replace(/[*_]/g, "").replace(/\s+/g, " ").trim();
  const m = plain.match(/^(.{20,220}?[.?])\s/);
  return m ? m[1] : plain.slice(0, 220);
}

function plain(text) {
  return String(text).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_]/g, "").trim();
}

function crisisLinesFor(crisis, topics) {
  const want = new Set(topics);
  return crisis.resources.filter((r) => r.id === "988" || r.topics.some((t) => want.has(t)));
}

function checkedLabel(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m - 1]} ${d}, ${y}`;
}

function masthead(doc) {
  const W = doc.page.width;
  artifact(doc, () => {
    doc.save().rect(0, 0, W, 34).fill(INK).restore();
    doc.fillColor(MUSTARD).font("Times-Bold").fontSize(10).text("LIVEWELL", 0, 12, { width: W / 2 - 8, align: "right", characterSpacing: 3, lineBreak: false });
    doc.fillColor("#F5F0E6").font("Times-Roman").fontSize(7).text("BY JAMES BELL", W / 2 + 8, 14, { characterSpacing: 2, lineBreak: false });
  });
}

function footer(doc, text) {
  const W = doc.page.width;
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const bottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    artifact(doc, () => {
      doc.font("Times-Roman").fontSize(7.5).fillColor(MUTED).text(text, 36, doc.page.height - 30, { width: W - 72, align: "center", lineBreak: false });
    });
    doc.page.margins.bottom = bottom;
  }
}

function rule(doc, x1, x2, y, color = RULE, width = 0.6, dash = null) {
  artifact(doc, () => {
    doc.save().lineWidth(width).strokeColor(color);
    if (dash) doc.dash(dash.len, { space: dash.space });
    doc.moveTo(x1, y).lineTo(x2, y).stroke();
    doc.undash().restore();
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

/** The one-page guide. Shrinks its type until the page holds everything. */
export async function guidePdf(need, crisis, size) {
  // Sensitive pages, and ordinary pages that still name abuse or substance use,
  // print their help lines on the one-page guide.
  const sensitive = need.sensitivity !== "ordinary" || (need.crisisTopics || []).some((t) => t !== "suicide");
  const lines = sensitive ? crisisLinesFor(crisis, need.crisisTopics || ["suicide"]) : [];
  for (const base of [11, 10.5, 10, 9.5, 9, 8.5]) {
    const doc = newDoc(size, `${need.title}: a one-page guide`, 48);
    const root = doc.struct("Document");
    doc.addStructure(root);
    masthead(doc);
    const left = doc.page.margins.left;
    const width = doc.page.width - left * 2;
    doc.y = 56;
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(8).fillColor(MUSTARD).text("FIND HELP · A ONE-PAGE GUIDE", left, doc.y, { width, characterSpacing: 2 }));
    doc.moveDown(0.3);
    tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(base + 11).fillColor(INK).text(need.title, { width }));
    doc.moveDown(0.3);
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(base).fillColor(INK).text(plain(need.answer), { width, lineGap: 1.5 }));

    if (sensitive) {
      doc.moveDown(0.5);
      const top = doc.y;
      tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(base + 1).fillColor(INK).text("Help, right now", left + 10, top + 6, { width: width - 20 }));
      for (const r of lines) {
        const acts = r.actions.filter((a) => a.kind !== "chat").map((a) => a.label).join(" · ");
        tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(base - 1).fillColor(INK).text(`${r.name}: ${acts}.${r.more ? ` ${r.more}` : ""}`, left + 10, doc.y, { width: width - 20, lineGap: 1 }));
      }
      tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(base - 1).fillColor(INK).text(`${crisis.emergency.label}: ${crisis.emergency.for}`, left + 10, doc.y, { width: width - 20 }));
      tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(base - 2.5).fillColor(MUTED).text(`Numbers checked ${checkedLabel(crisis.checked)} against each service's official site (US).`, left + 10, doc.y, { width: width - 20 }));
      const bottom = doc.y + 6;
      artifact(doc, () => { doc.save().lineWidth(0.8).strokeColor(MUSTARD).rect(left, top, width, bottom - top).stroke().restore(); });
      doc.y = bottom;
      doc.x = left;
    }

    doc.moveDown(0.6);
    tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(base + 2).fillColor(INK).text("What to do this week", left, doc.y, { width }));
    const list = doc.struct("L");
    root.add(list);
    need.thisWeek.steps.forEach((s, i) => {
      list.add(doc.struct("LI", () => {
        doc.font("Times-Bold").fontSize(base).fillColor(INK).text(`${i + 1}. ${plain(s.title)}. `, left, doc.y, { width, continued: true, lineGap: 1 });
        doc.font("Times-Roman").text(firstSentence(s.body), { lineGap: 1 });
      }));
      doc.moveDown(0.2);
    });
    list.end();

    doc.moveDown(0.4);
    tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(base + 2).fillColor(INK).text("Signs it is time to call someone", left, doc.y, { width }));
    const signs = doc.struct("L");
    root.add(signs);
    for (const s of need.moreHelp.signs.slice(0, 7)) {
      signs.add(doc.struct("LI", () => doc.font("Times-Roman").fontSize(base).fillColor(INK).text(`•  ${plain(s)}`, left, doc.y, { width, lineGap: 1 })));
    }
    signs.end();

    doc.moveDown(0.5);
    tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(base - 1.5).fillColor(MUTED).text(`Read the whole page, with Scripture, a prayer, and help for helpers: ${SITE}/help/${need.slug}. This is pastoral counsel, not medical, legal, or financial advice.`, left, doc.y, { width }));
    root.end();
    const fits = doc.bufferedPageRange().count === 1;
    footer(doc, `${SITE}/help/${need.slug}`);
    const buf = await toBuffer(doc);
    if (fits || base === 8.5) return buf;
  }
  throw new Error("unreachable");
}

/** Two prayer cards to a page, cut along the dashed line. */
export async function prayerPdf(need, size) {
  const doc = newDoc(size, `${need.title}: a prayer card`, 0);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const W = doc.page.width;
  const H = doc.page.height;
  const pad = 54;
  for (let card = 0; card < 2; card++) {
    const top = card * (H / 2);
    const text = plain(need.prayer);
    let fs = 13;
    doc.font("Times-Italic");
    while (fs > 8 && doc.fontSize(fs).heightOfString(text, { width: W - pad * 2, lineGap: 2 }) > H / 2 - 150) fs -= 0.5;
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(8).fillColor(MUSTARD).text("A PRAYER", pad, top + 42, { width: W - pad * 2, characterSpacing: 2 }));
    tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(15).fillColor(INK).text(need.title, pad, doc.y + 4, { width: W - pad * 2 }));
    tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(fs).fillColor(INK).text(text, pad, doc.y + 8, { width: W - pad * 2, lineGap: 2 }));
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(7.5).fillColor(MUTED).text(`LiveWell by James Bell · ${SITE}/help/${need.slug}`, pad, top + H / 2 - 40, { width: W - pad * 2, lineBreak: false }));
  }
  rule(doc, 24, W - 24, H / 2, MUTED, 0.5, { len: 4, space: 4 });
  artifact(doc, () => doc.font("Times-Roman").fontSize(6.5).fillColor(MUTED).text("cut here", W - 60, H / 2 - 10, { lineBreak: false }));
  root.end();
  return toBuffer(doc);
}

/** The passages as cards, four to a page (two by two), with cut lines. */
export async function scripturePdf(need, size) {
  const doc = newDoc(size, `${need.title}: Scripture cards`, 0);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const W = doc.page.width;
  const H = doc.page.height;
  const cw = W / 2;
  const ch = H / 2;
  const pad = 30;
  need.scripture.passages.forEach((p, i) => {
    if (i > 0 && i % 4 === 0) doc.addPage();
    const col = i % 2;
    const row = Math.floor((i % 4) / 2);
    const x = col * cw + pad;
    const y = row * ch + pad + 8;
    const width = cw - pad * 2;
    let fs = 15;
    doc.font("Times-Roman");
    while (fs > 8 && doc.fontSize(fs).heightOfString(p.text, { width, lineGap: 2 }) > ch - 120) fs -= 0.5;
    // Center the verse and its reference in the space above the card's footer.
    const blockH = doc.fontSize(fs).heightOfString(p.text, { width, lineGap: 2 }) + 26;
    const top = Math.max(y, row * ch + (ch - 40 - blockH) / 2);
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(fs).fillColor(INK).text(p.text, x, top, { width, lineGap: 2 }));
    tag(doc, root, "P", () => doc.font("Times-Bold").fontSize(10).fillColor(MUSTARD).text(`${p.ref} (BSB)`, x, doc.y + 8, { width }));
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(7).fillColor(MUTED).text(`LiveWell by James Bell · ${SITE}/help/${need.slug}`, x, row * ch + ch - pad - 6, { width, lineBreak: false }));
    if (i % 4 === 3 || i === need.scripture.passages.length - 1) {
      rule(doc, 18, W - 18, ch, MUTED, 0.5, { len: 4, space: 4 });
      artifact(doc, () => { doc.save().lineWidth(0.5).strokeColor(MUTED).dash(4, { space: 4 }).moveTo(cw, 18).lineTo(cw, H - 18).stroke().undash().restore(); });
    }
  });
  root.end();
  return toBuffer(doc);
}

/** The week, on paper: each step with a box to tick and room to write. */
export async function weekPdf(need, crisis, size) {
  const doc = newDoc(size, `${need.title}: this week`, 54);
  const root = doc.struct("Document");
  doc.addStructure(root);
  masthead(doc);
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  doc.y = 62;
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(8).fillColor(MUSTARD).text("FIND HELP · A WORKSHEET FOR THIS WEEK", left, doc.y, { width, characterSpacing: 2 }));
  doc.moveDown(0.3);
  tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(20).fillColor(INK).text(need.title, { width }));
  doc.moveDown(0.3);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(plain(need.thisWeek.intro), { width, lineGap: 1.5 }));
  const writeLines = (n) => {
    for (let k = 0; k < n; k++) {
      doc.y += 20;
      rule(doc, left + 18, left + width, doc.y);
    }
    doc.y += 10;
  };
  need.thisWeek.steps.forEach((s, i) => {
    if (doc.y > doc.page.height - 190) { doc.addPage(); doc.y = doc.page.margins.top; }
    doc.moveDown(0.6);
    const y = doc.y;
    artifact(doc, () => { doc.save().lineWidth(0.8).strokeColor(INK).rect(left, y + 2, 10, 10).stroke().restore(); });
    tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text(`${i + 1}. ${plain(s.title)}`, left + 18, y, { width: width - 18 }));
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9.5).fillColor(MUTED).text(firstSentence(s.body), left + 18, doc.y + 2, { width: width - 18 }));
    writeLines(3);
  });
  if (doc.y > doc.page.height - 200) { doc.addPage(); doc.y = doc.page.margins.top; }
  doc.moveDown(0.6);
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text("One person I will tell this week", left, doc.y, { width }));
  writeLines(1);
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text("What I will say if I call a doctor or counselor", left, doc.y, { width }));
  writeLines(3);
  // The same lines the one-page guide prints, from the verified file: on sensitive pages,
  // and on ordinary pages that still name abuse, assault, or substance use.
  if (need.sensitivity !== "ordinary" || (need.crisisTopics || []).some((t) => t !== "suicide")) {
    const lines = crisisLinesFor(crisis, need.crisisTopics || ["suicide"]);
    if (doc.y > doc.page.height - 60 - lines.length * 13) { doc.addPage(); doc.y = doc.page.margins.top; }
    tag(doc, root, "P", () => doc.font("Times-Bold").fontSize(9).fillColor(INK).text("If you are in danger or thinking about ending your life", left, doc.y + 4, { width }));
    for (const r of lines) {
      const acts = r.actions.filter((a) => a.kind !== "chat").map((a) => a.label).join(" · ");
      tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(INK).text(`${r.name}: ${acts}.`, left, doc.y + 1, { width }));
    }
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(INK).text(`${crisis.emergency.label}: ${crisis.emergency.for}`, left, doc.y + 1, { width }));
    tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8).fillColor(MUTED).text(`Free and confidential. Numbers checked ${checkedLabel(crisis.checked)} against each service's official site (US).`, left, doc.y + 2, { width }));
  }
  root.end();
  footer(doc, `${SITE}/help/${need.slug}`);
  return toBuffer(doc);
}

/** Write every printable for every care page. Returns the paths written. */
export async function buildHelpPrintables(root) {
  const needsDir = path.join(root, "client/public/needs");
  const out = path.join(root, "client/public/downloads/help");
  if (!fs.existsSync(needsDir)) return [];
  fs.mkdirSync(out, { recursive: true });
  const crisis = JSON.parse(fs.readFileSync(path.join(root, "client/src/data/crisis-resources.json"), "utf8"));
  const written = [];
  const files = fs.readdirSync(needsDir).filter((f) => f.endsWith(".json") && f !== "index.json").sort();
  for (const f of files) {
    const need = JSON.parse(fs.readFileSync(path.join(needsDir, f), "utf8"));
    if (need.page !== true) continue;
    for (const [name, size] of Object.entries(SIZES)) {
      const docs = {
        guide: await guidePdf(need, crisis, size),
        prayer: await prayerPdf(need, size),
        scripture: await scripturePdf(need, size),
        week: await weekPdf(need, crisis, size),
      };
      for (const [kind, buf] of Object.entries(docs)) {
        const p = path.join(out, `${need.slug}-${kind}-${name}.pdf`);
        fs.writeFileSync(p, buf);
        written.push(p);
      }
    }
  }
  return written;
}

/**
 * A care plan as a booklet (docs/grow/GROW-PROMPT.md 7.4: "Every plan prints
 * as a booklet"): the cover with the plan's introduction and care note, how
 * to use it, the help lines, then one page per week with the focus, why it
 * matters, the practice, what to read and use, and the reflection question
 * with room to write and a box to tick.
 */
export async function planBookletPdf(plan, crisis, size) {
  const doc = newDoc(size, `${plan.title}: an eight-week plan`, 54);
  const root = doc.struct("Document");
  doc.addStructure(root);
  masthead(doc);
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  const bottomLimit = () => doc.page.height - doc.page.margins.bottom - 24;

  doc.y = 110;
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(MUSTARD).text("FIND HELP · AN EIGHT-WEEK PLAN", left, doc.y, { width, align: "center", characterSpacing: 2.4 }));
  doc.moveDown(0.6);
  tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(28).fillColor(INK).text(plain(plan.title), left, doc.y, { width, align: "center" }));
  doc.moveDown(0.3);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(13).fillColor(MUTED).text(plain(plan.subtitle), left, doc.y, { width, align: "center" }));
  doc.moveDown(1.4);
  for (const para of String(plan.intro).split(/\n\n+/)) {
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(11).fillColor(INK).text(plain(para), left, doc.y, { width, lineGap: 2 }));
    doc.moveDown(0.5);
  }
  if (plan.careNote) {
    tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(10.5).fillColor(MUTED).text(plain(plan.careNote), left, doc.y, { width, lineGap: 1.5 }));
  }

  if (doc.y > doc.page.height - 330) { doc.addPage(); doc.y = doc.page.margins.top; }
  doc.moveDown(1);
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(14).fillColor(INK).text("How to use this booklet", left, doc.y, { width }));
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(11).fillColor(INK).text(
    `One week to a page. Read the week on its first day, do the practice each day, and write your answer to the question on the lines. Tick the box when you have walked the week. Miss a week and simply pick up where you are; this is a companion, not a test. The readings and tools are on the website at the addresses given, and the plan can also be walked there, with your progress saved in your browser: ${SITE}/plans/${plan.slug}.`,
    left, doc.y + 4, { width, lineGap: 2 }));
  doc.moveDown(0.8);
  // The help lines, from the one verified file.
  const lines = crisisLinesFor(crisis, ["suicide", "abuse"]);
  const top = doc.y;
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text("If you are in danger", left + 12, top + 10, { width: width - 24 }));
  for (const r of lines) {
    const acts = r.actions.filter((a) => a.kind !== "chat").map((a) => a.label).join(" · ");
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(`${r.name}: ${acts}.`, left + 12, doc.y + 2, { width: width - 24, lineGap: 1 }));
  }
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(`${crisis.emergency.label}: ${crisis.emergency.for}`, left + 12, doc.y + 2, { width: width - 24 }));
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(`Free and confidential. Numbers checked ${checkedLabel(crisis.checked)} against each service's official site (US). This plan is pastoral counsel, not medical, legal, or financial advice.`, left + 12, doc.y + 4, { width: width - 24 }));
  const boxBottom = doc.y + 10;
  artifact(doc, () => { doc.save().lineWidth(0.8).strokeColor(MUSTARD).rect(left, top, width, boxBottom - top).stroke().restore(); });
  doc.x = left;
  doc.y = boxBottom;

  for (const w of plan.weeks) {
    doc.addPage();
    doc.y = doc.page.margins.top;
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(MUSTARD).text(`WEEK ${w.n} OF ${plan.weeks.length}`, left, doc.y, { width, characterSpacing: 2 }));
    tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(20).fillColor(INK).text(plain(w.focus), left, doc.y + 4, { width }));
    doc.moveDown(0.4);
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(11).fillColor(INK).text(plain(w.why), left, doc.y, { width, lineGap: 2 }));
    const section = (heading, text, font = "Times-Roman") => {
      doc.moveDown(0.6);
      tag(doc, root, "H3", () => doc.font("Times-Bold").fontSize(11).fillColor(INK).text(heading, left, doc.y, { width }));
      tag(doc, root, "P", () => doc.font(font).fontSize(11).fillColor(INK).text(text, left, doc.y + 2, { width, lineGap: 2 }));
    };
    section("This week's practice", plain(w.practice));
    section("Read", `${plain(w.read.label)}: ${SITE}${w.read.href}`);
    section("Use", `${plain(w.tool.label)}: ${SITE}${w.tool.href}`);
    section("Reflect", plain(w.reflection), "Times-Italic");
    // Room to write: at least three lines, more when the page allows.
    if (bottomLimit() - doc.y < 3 * 22 + 40) { doc.addPage(); doc.y = doc.page.margins.top; }
    doc.y += 4;
    while (doc.y + 22 < bottomLimit() - 30) {
      doc.y += 22;
      rule(doc, left, left + width, doc.y);
    }
    const y = doc.y + 16;
    artifact(doc, () => { doc.save().lineWidth(0.8).strokeColor(INK).rect(left, y + 1, 10, 10).stroke().restore(); });
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(`I walked week ${w.n}.     Date: ____________________`, left + 18, y, { width: width - 18, lineBreak: false }));
  }
  root.end();
  footer(doc, `${SITE}/plans/${plan.slug}`);
  return toBuffer(doc);
}

/** Write a booklet for every care plan, in Letter and A4. Returns the paths written. */
export async function buildPlanBooklets(root) {
  const plansDir = path.join(root, "client/public/plans");
  const out = path.join(root, "client/public/downloads/plans");
  if (!fs.existsSync(plansDir)) return [];
  fs.mkdirSync(out, { recursive: true });
  const crisis = JSON.parse(fs.readFileSync(path.join(root, "client/src/data/crisis-resources.json"), "utf8"));
  const written = [];
  const files = fs.readdirSync(plansDir).filter((f) => f.endsWith(".json") && !f.includes("index")).sort();
  for (const f of files) {
    const plan = JSON.parse(fs.readFileSync(path.join(plansDir, f), "utf8"));
    if (!Array.isArray(plan.weeks) || !plan.weeks.length) continue;
    for (const [name, size] of Object.entries(SIZES)) {
      const p = path.join(out, `${plan.slug}-booklet-${name}.pdf`);
      fs.writeFileSync(p, await planBookletPdf(plan, crisis, size));
      written.push(p);
    }
  }
  return written;
}

/**
 * The Worry Journal on paper (/tools/worry-journal): a week of evenings, two
 * to a page, each with the four prompts and room to write, then a page for
 * looking back on how the worries turned out.
 */
export async function worryLogPdf(crisis, size) {
  const doc = newDoc(size, "The Worry Journal: a week of evenings", 54);
  const root = doc.struct("Document");
  doc.addStructure(root);
  masthead(doc);
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  const lines = (n) => {
    for (let k = 0; k < n; k++) {
      doc.y += 19;
      rule(doc, left, left + width, doc.y);
    }
    doc.y += 8;
  };
  doc.y = 62;
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(8).fillColor(MUSTARD).text("A COMPANION FOR ANXIETY · FIVE MINUTES BEFORE BED", left, doc.y, { width, characterSpacing: 2 }));
  tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(22).fillColor(INK).text("The Worry Journal", left, doc.y + 4, { width }));
  doc.moveDown(0.3);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(
    "Each evening, name one worry, write the one small thing that is yours to do tomorrow, name what is not yours to carry, and write a sentence of prayer. After a few days, turn to the last page and mark how each worry turned out. Your own record is worth reading the next time worry tells you it is keeping you safe.",
    left, doc.y, { width, lineGap: 1.5 }));
  doc.moveDown(0.3);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(10.5).fillColor(INK).text("\"Cast all your anxiety on Him, because He cares for you.\" 1 Peter 5:7 (BSB)", left, doc.y, { width }));
  doc.moveDown(0.3);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(
    `A journal, not treatment. If worry has taken over your days or your sleep for weeks, see a doctor or a licensed counselor. If you are in danger or thinking about ending your life, call or text 988, or call 911. Numbers checked ${checkedLabel(crisis.checked)}.`,
    left, doc.y, { width }));

  const prompts = [
    ["What am I worried about tonight?", 3],
    ["What part of this is mine to do tomorrow?", 2],
    ["What part is not mine to carry?", 2],
    ["A sentence of prayer", 2],
  ];
  // Room for one evening: the heading, then each prompt with its lines.
  const eveningHeight = 30 + prompts.reduce((h, [, n]) => h + 22 + n * 19 + 8, 0);
  for (let day = 1; day <= 7; day++) {
    doc.moveDown(day === 1 ? 0.8 : 1.2);
    if (doc.y + eveningHeight > doc.page.height - doc.page.margins.bottom) { doc.addPage(); doc.y = doc.page.margins.top; }
    tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(13).fillColor(INK).text(`Evening ${day}          Date: ____________`, left, doc.y, { width }));
    for (const [q, n] of prompts) {
      doc.moveDown(0.2);
      tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10).fillColor(MUTED).text(q, left, doc.y, { width }));
      lines(n);
    }
  }

  doc.addPage();
  doc.y = doc.page.margins.top;
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(16).fillColor(INK).text("Looking back", left, doc.y, { width }));
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(
    "A few days after each evening, write the worry in a few words and tick how it turned out.",
    left, doc.y + 4, { width }));
  doc.moveDown(0.8);
  const cols = [
    { label: "The worry", w: width - 3 * 78 },
    { label: "Did not happen", w: 78 },
    { label: "Happened; got through", w: 78 },
    { label: "Still waiting", w: 78 },
  ];
  let x = left;
  const headY = doc.y;
  for (const c of cols) {
    tag(doc, root, "P", () => doc.font("Times-Bold").fontSize(9).fillColor(INK).text(c.label, x, headY, { width: c.w - 6 }));
    x += c.w;
  }
  doc.y = headY + 26;
  for (let r = 0; r < 14; r++) {
    const y = doc.y;
    rule(doc, left, left + width, y + 22);
    let cx = left + cols[0].w;
    for (let k = 1; k < cols.length; k++) {
      artifact(doc, () => { doc.save().lineWidth(0.7).strokeColor(INK).rect(cx + 30, y + 8, 9, 9).stroke().restore(); });
      cx += cols[k].w;
    }
    doc.y = y + 26;
  }
  root.end();
  footer(doc, `${SITE}/tools/worry-journal`);
  return toBuffer(doc);
}

export async function buildToolPrintables(root) {
  const out = path.join(root, "client/public/downloads/tools");
  fs.mkdirSync(out, { recursive: true });
  const crisis = JSON.parse(fs.readFileSync(path.join(root, "client/src/data/crisis-resources.json"), "utf8"));
  const written = [];
  for (const [name, size] of Object.entries(SIZES)) {
    const p = path.join(out, `worry-log-${name}.pdf`);
    fs.writeFileSync(p, await worryLogPdf(crisis, size));
    written.push(p);
    const r = path.join(out, `referral-list-${name}.pdf`);
    fs.writeFileSync(r, await referralListPdf(crisis, size));
    written.push(r);
    const pl = path.join(out, `prayer-list-${name}.pdf`);
    fs.writeFileSync(pl, await prayerListPdf(size));
    written.push(pl);
    for (const [file, make] of [["budget", () => budgetPdf(size)], ["grief-journal", () => griefJournalPdf(crisis, size)], ["conflict-guide", () => conflictGuidePdf(size)]]) {
      const w = path.join(out, `${file}-${name}.pdf`);
      fs.writeFileSync(w, await make());
      written.push(w);
    }
  }
  return written;
}

/**
 * The Prayer Planner on paper (/tools/prayer-planner): a week of names, a day
 * to a block, and a page for prayers answered, with the date and how.
 */
export async function prayerListPdf(size) {
  const doc = newDoc(size, "The Prayer Planner: a week of names", 48);
  const root = doc.struct("Document");
  doc.addStructure(root);
  masthead(doc);
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  doc.y = 56;
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(8).fillColor(MUSTARD).text("THE PRAYER PLANNER", left, doc.y, { width, characterSpacing: 2 }));
  tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(20).fillColor(INK).text("Your people, through the week", left, doc.y + 4, { width }));
  doc.moveDown(0.2);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10).fillColor(INK).text(
    "Write the people and needs you mean to pray for under a day, or under Every day. Each morning or evening, pray that day's names. When a prayer is answered, write it on the last page with the date and how it came: some answers are yes, some are not yet, and some are a different mercy than the one you asked for.",
    left, doc.y, { width, lineGap: 1.5 }));
  doc.moveDown(0.5);
  const days = ["Every day", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const colGap = 16;
  const colW = (width - colGap) / 2;
  const blockH = 132;
  let col = 0;
  let top = doc.y;
  for (const d of days) {
    if (col === 0 && top + blockH > doc.page.height - doc.page.margins.bottom - 20) { doc.addPage(); top = doc.page.margins.top; }
    const x = left + col * (colW + colGap);
    tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(11).fillColor(INK).text(d, x, top, { width: colW }));
    let y = top + 16;
    for (let k = 0; k < 6; k++) { y += 17; rule(doc, x, x + colW, y); }
    if (col === 1) top += blockH;
    col = 1 - col;
  }
  doc.addPage();
  doc.y = doc.page.margins.top;
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(16).fillColor(INK).text("Answered", left, doc.y, { width }));
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10).fillColor(INK).text("The date, the name or need, and how the answer came.", left, doc.y + 4, { width }));
  doc.y += 14;
  while (doc.y + 22 < doc.page.height - doc.page.margins.bottom - 24) { doc.y += 22; rule(doc, left, left + width, doc.y); }
  root.end();
  footer(doc, `${SITE}/tools/prayer-planner`);
  return toBuffer(doc);
}

/** A heading, a short note, and ruled lines: the shared shape of the worksheets below. */
function promptBlock(doc, root, left, width, heading, note, lines) {
  if (doc.y + 40 + lines * 19 > doc.page.height - doc.page.margins.bottom - 24) { doc.addPage(); doc.y = doc.page.margins.top; }
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(11.5).fillColor(INK).text(heading, left, doc.y, { width }));
  if (note) tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(9).fillColor(MUTED).text(note, left, doc.y + 1, { width }));
  for (let k = 0; k < lines; k++) { doc.y += 19; rule(doc, left, left + width, doc.y); }
  doc.y += 12;
}

function worksheetHeader(doc, root, kicker, title, intro) {
  masthead(doc);
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  doc.y = 56;
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(8).fillColor(MUSTARD).text(kicker, left, doc.y, { width, characterSpacing: 2 }));
  tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(20).fillColor(INK).text(title, left, doc.y + 4, { width }));
  doc.moveDown(0.2);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10).fillColor(INK).text(intro, left, doc.y, { width, lineGap: 1.5 }));
  doc.moveDown(0.6);
  return { left, width };
}

/** A month's budget that starts with giving and saving, then the rest. */
export async function budgetPdf(size) {
  const doc = newDoc(size, "A monthly budget worksheet", 48);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const { left, width } = worksheetHeader(doc, root, "FIND HELP · MONEY", "A month, planned before it begins",
    "Fill this in before the month starts, together if you share money. Write what comes in, then decide first what you will give and save, at whatever size your life allows this month, and then plan the rest. A budget is not a verdict on you; it is a way of telling the truth about money and choosing where it goes. This is a worksheet, not financial advice: for debt or legal trouble, a nonprofit credit counselor is a good first call.");
  const rows = [
    ["Coming in", "Paychecks, benefits, other income", 3],
    ["Giving", "What you have decided to give this month", 2],
    ["Saving", "Even a little: an emergency cushion first", 2],
    ["Home", "Rent or mortgage, utilities, insurance", 3],
    ["Food and household", "Groceries, supplies", 2],
    ["Getting around", "Car payment, gas, transit, repairs", 2],
    ["Debts", "Each one: who, the minimum, the balance", 4],
    ["Everything else", "Phone, medical, children, the things that sneak up", 3],
  ];
  for (const [h, n, lines] of rows) promptBlock(doc, root, left, width, h, n, lines);
  promptBlock(doc, root, left, width, "What is left, and what we will do with it", "If it is less than zero, decide together what changes first.", 3);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(`If money is being used to control you, that is a form of abuse: the Domestic Violence Hotline is on ${SITE}/help. More: ${SITE}/help/money.`, left, doc.y, { width }));
  root.end();
  footer(doc, `${SITE}/help/money`);
  return toBuffer(doc);
}

/** A page for the days after a death: prompts, room to write, and the help lines. */
export async function griefJournalPdf(crisis, size) {
  const doc = newDoc(size, "A grief journal page", 48);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const { left, width } = worksheetHeader(doc, root, "FIND HELP · GRIEF", "A page for the days after",
    "Write as much or as little as you can. There is no right way to fill this in and no day it has to be finished. Some days one line is the whole of it. Print as many as you need.");
  promptBlock(doc, root, left, width, "Today I miss", "", 3);
  promptBlock(doc, root, left, width, "A memory I want to keep", "", 4);
  promptBlock(doc, root, left, width, "What I wish I could say to them", "", 4);
  promptBlock(doc, root, left, width, "What helped today, even a little", "", 2);
  promptBlock(doc, root, left, width, "A prayer, even an angry one", "The Psalms are full of prayers like that. God can bear yours.", 4);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(`If grief has turned into not wanting to be alive, call or text 988, any hour; in immediate danger, call 911. Numbers checked ${checkedLabel(crisis.checked)}. More: ${SITE}/help/grief.`, left, doc.y, { width }));
  root.end();
  footer(doc, `${SITE}/help/grief`);
  return toBuffer(doc);
}

/** A conversation guide for a couple's recurring argument, with safety first. */
export async function conflictGuidePdf(size) {
  const doc = newDoc(size, "A conversation guide for couples", 48);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const { left, width } = worksheetHeader(doc, root, "FIND HELP · MARRIAGE", "For the argument you keep having",
    "This is for couples who are safe with each other. If you are afraid of your spouse, if they check your phone or control where you go, or if arguments end in threats or harm, set this aside: talk alone with the Domestic Violence Hotline first, and do not try couples counseling while you are afraid. The lines are on Find Help.");
  promptBlock(doc, root, left, width, "1. Pick the time", "A calm hour, not the end of a fight. Agree on how either of you can call a pause, and when you will come back.", 1);
  promptBlock(doc, root, left, width, "2. Name the argument in one sentence", "Not who is right. Just what it is about, in words you both accept.", 2);
  promptBlock(doc, root, left, width, "3. One speaks, the other says it back", "The listener repeats what they heard until the speaker says, Yes, that's it. Then switch.", 3);
  promptBlock(doc, root, left, width, "4. What it is really about", "Underneath the dishes or the money, what is each of you afraid of, or hoping for?", 3);
  promptBlock(doc, root, left, width, "5. What I need, and what I can give", "Each of you: one thing you need, and one thing you will do.", 3);
  promptBlock(doc, root, left, width, "6. One next step, and when we will check on it", "", 2);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(`"Everyone should be quick to listen, slow to speak, and slow to anger" (James 1:19, BSB). If the same argument keeps ending in contempt or silence, a licensed marriage counselor helps, as long as you are both safe. More: ${SITE}/help/marriage.`, left, doc.y, { width }));
  root.end();
  footer(doc, `${SITE}/help/marriage`);
  return toBuffer(doc);
}

/**
 * A referral list for pastors and church leaders (the demand map's need 23:
 * "When should I refer someone to a counselor?"): the national lines printed
 * from the verified file, then blank rows by kind of help, to fill in with
 * local names before anyone needs them.
 */
export async function referralListPdf(crisis, size) {
  const doc = newDoc(size, "A referral list for pastors and church leaders", 48);
  const root = doc.struct("Document");
  doc.addStructure(root);
  masthead(doc);
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  doc.y = 56;
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(8).fillColor(MUSTARD).text("FOR PASTORS AND CHURCH LEADERS", left, doc.y, { width, characterSpacing: 2 }));
  tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(20).fillColor(INK).text("A referral list", left, doc.y + 4, { width }));
  doc.moveDown(0.2);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10).fillColor(INK).text(
    "Fill this in before anyone needs it. Call each place once yourself: ask what they treat, whether they take insurance or offer a sliding scale, how soon they can see someone, and whether they respect a person's faith. Write down who you spoke with and the date, and check the list once a year. A good referral is a warm handoff: you make the call with the person, or stay with them while they make it, and you stay their pastor afterward.",
    left, doc.y, { width, lineGap: 1.5 }));
  doc.moveDown(0.5);

  const top = doc.y;
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(11).fillColor(INK).text("National lines (free, confidential)", left + 10, top + 7, { width: width - 20 }));
  for (const r of crisis.resources) {
    const acts = r.actions.filter((a) => a.kind !== "chat").map((a) => a.label).join(" · ");
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(INK).text(`${r.name}: ${acts}.`, left + 10, doc.y + 1, { width: width - 20 }));
  }
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(INK).text(`${crisis.emergency.label}: ${crisis.emergency.for}`, left + 10, doc.y + 1, { width: width - 20 }));
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8).fillColor(MUTED).text(`Numbers checked ${checkedLabel(crisis.checked)} against each service's official site (US). If someone is in immediate danger, call 911 first.`, left + 10, doc.y + 2, { width: width - 20 }));
  const boxBottom = doc.y + 7;
  artifact(doc, () => { doc.save().lineWidth(0.8).strokeColor(MUSTARD).rect(left, top, width, boxBottom - top).stroke().restore(); });
  doc.x = left;
  doc.y = boxBottom + 10;

  const kinds = [
    "Licensed counselor or therapist (LPC, LMFT, LCSW)",
    "Psychologist or psychiatrist",
    "Addiction treatment and recovery groups",
    "Domestic violence program and shelter",
    "Sexual assault center",
    "Child protective services (to report a child at risk)",
    "Adult protective services (to report an elder or dependent adult at risk)",
    "Grief support and hospice",
    "Primary care clinic, including low-cost or free care",
    "Legal aid",
    "Nonprofit credit or financial counseling",
    "Food, housing, and emergency assistance",
  ];
  const colName = width * 0.42;
  const colPhone = width * 0.22;
  for (const k of kinds) {
    if (doc.y + 52 > doc.page.height - doc.page.margins.bottom - 20) { doc.addPage(); doc.y = doc.page.margins.top; }
    tag(doc, root, "H3", () => doc.font("Times-Bold").fontSize(10).fillColor(INK).text(k, left, doc.y, { width }));
    const y = doc.y + 2;
    artifact(doc, () => {
      doc.font("Times-Italic").fontSize(7).fillColor(MUTED);
      doc.text("Name and contact", left, y, { width: colName, lineBreak: false });
      doc.text("Phone", left + colName, y, { width: colPhone, lineBreak: false });
      doc.text("Notes (insurance, wait, faith, checked on)", left + colName + colPhone, y, { width: width - colName - colPhone, lineBreak: false });
    });
    doc.y = y + 8;
    for (let row = 0; row < 2; row++) {
      doc.y += 16;
      rule(doc, left, left + width, doc.y);
    }
    doc.y += 8;
  }
  doc.moveDown(0.4);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(
    `Church leaders may be mandated reporters of child abuse; the laws vary by state, so check your own obligations. This list is a pastoral tool, not legal or medical advice. More at ${SITE}/help.`,
    left, doc.y, { width }));
  root.end();
  footer(doc, `${SITE}/help`);
  return toBuffer(doc);
}

/**
 * The help box for the study guide PDFs on heavy subjects (the list is
 * client/src/data/sensitive-pages.json). The leader's copy says what to do if
 * someone in the group is in danger; the participant's copy speaks to the
 * reader. Numbers come from the verified crisis file.
 */
export function studyGuideHelpBox(doc, crisis, audience, topics = []) {
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  const dv = crisis.resources.find((r) => r.id === "dv-hotline");
  const dvCall = dv.actions.find((a) => a.kind === "call").label.replace(/^Call /, "");
  const dvText = dv.actions.find((a) => a.kind === "text").label.replace(/^Text /, "text ");
  // Lines a guide's subject adds (studyguideTopics in client/src/data/sensitive-pages.json), from the verified file.
  const extra = crisis.resources
    .filter((r) => !["988", "crisis-text-line", "dv-hotline"].includes(r.id) && r.topics.some((t) => topics.includes(t)))
    .map((r) => `${r.name}: ${r.actions.filter((a) => a.kind !== "chat").map((a) => a.label).join(" or ")}.`)
    .join(" ");
  const more = extra ? `${extra} ` : "";
  const text = audience === "leader"
    ? `Some sessions in this study touch grief, despair, anger, or abuse. If anyone says they are thinking about ending their life, or that they are not safe at home, stop the lesson and help them reach a person: call or text 988, the Suicide & Crisis Lifeline; in immediate danger, call 911; for fear of someone at home, the National Domestic Violence Hotline, ${dvCall}, or ${dvText}. Never ask anyone to disclose abuse in the group. Talk with them privately afterward. If you are a church leader, mandated-reporting laws may apply to you; they vary by state, so check your own obligations. ${more}Numbers checked ${checkedLabel(crisis.checked)}.`
    : `If you are in danger or thinking about ending your life, call or text 988, the Suicide & Crisis Lifeline, any hour. In immediate danger, call 911. If you are afraid of someone at home, call the National Domestic Violence Hotline, ${dvCall}, or ${dvText}. These lines are free and confidential. ${more}Numbers checked ${checkedLabel(crisis.checked)}.`;
  const top = doc.y;
  doc.font("Times-Bold").fontSize(11).fillColor(INK).text(audience === "leader" ? "If someone in your group is in danger" : "If you are in danger", left + 12, top + 10, { width: width - 24 });
  doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(text, left + 12, doc.y + 4, { width: width - 24, lineGap: 2 });
  const bottom = doc.y + 10;
  doc.save().lineWidth(0.8).strokeColor(MUSTARD).rect(left, top, width, bottom - top).stroke().restore();
  doc.x = left;
  doc.y = bottom + 12;
}

/**
 * Seasonal family packs (docs/grow/GROW-PROMPT.md 7.6 and 5.5): the site's
 * own Advent (25 days) and Holy Week (8 days) family devotions, from
 * client/public/family-seasonal.json, printed as a booklet. The devotions
 * paraphrase each passage for children; the pack prints the passage itself,
 * verbatim from the Berean Standard Bible, and labels the paraphrase as one.
 */
export async function seasonalPdf(root, season, size, passageText) {
  const data = JSON.parse(fs.readFileSync(path.join(root, "client/public/family-seasonal.json"), "utf8"))[season];
  const meta = season === "advent"
    ? { title: "Advent at the Table", sub: "Twenty-five days for families, December 1 to Christmas" }
    : { title: "Holy Week at the Table", sub: "Eight days for families, Palm Sunday to Easter" };
  const doc = newDoc(size, `${meta.title}: ${meta.sub}`, 54);
  const root_ = doc.struct("Document");
  doc.addStructure(root_);
  masthead(doc);
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  doc.y = 140;
  tag(doc, root_, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(MUSTARD).text("A FAMILY DEVOTIONAL", left, doc.y, { width, align: "center", characterSpacing: 2.4 }));
  doc.moveDown(0.6);
  tag(doc, root_, "H1", () => doc.font("Times-Bold").fontSize(30).fillColor(INK).text(meta.title, { width, align: "center" }));
  doc.moveDown(0.3);
  tag(doc, root_, "P", () => doc.font("Times-Italic").fontSize(13).fillColor(MUTED).text(meta.sub, { width, align: "center" }));
  doc.moveDown(2);
  tag(doc, root_, "P", () => doc.font("Times-Roman").fontSize(11).fillColor(INK).text(
    "Ten minutes a day, around the table or at bedtime. Read the passage aloud, then the few lines that follow. Ask the question and let everyone answer, the youngest first. Close with the prayer. Miss a day and simply pick up where you are.",
    { width, align: "left", lineGap: 2 }));
  doc.moveDown(0.6);
  tag(doc, root_, "P", () => doc.font("Times-Italic").fontSize(9.5).fillColor(MUTED).text(
    "Scripture is quoted from the Berean Standard Bible (public domain). The lines marked \"In other words\" retell the passage for children; they are a paraphrase, not a quotation.",
    { width, lineGap: 1.5 }));
  for (const day of data) {
    doc.addPage();
    doc.y = doc.page.margins.top;
    tag(doc, root_, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(MUSTARD).text(String(day.label).toUpperCase(), left, doc.y, { width, characterSpacing: 2 }));
    tag(doc, root_, "H2", () => doc.font("Times-Bold").fontSize(20).fillColor(INK).text(day.title, left, doc.y + 4, { width }));
    doc.moveDown(0.5);
    tag(doc, root_, "P", () => doc.font("Times-Bold").fontSize(10.5).fillColor(INK).text(`${day.passage} (BSB)`, left, doc.y, { width }));
    tag(doc, root_, "P", () => doc.font("Times-Roman").fontSize(12).fillColor(INK).text(passageText(day.passage), left, doc.y + 2, { width, lineGap: 2 }));
    doc.moveDown(0.5);
    tag(doc, root_, "P", () => doc.font("Times-Italic").fontSize(10.5).fillColor(MUTED).text(`In other words: ${day.passageText}`, left, doc.y, { width, lineGap: 1.5 }));
    doc.moveDown(0.8);
    tag(doc, root_, "P", () => doc.font("Times-Roman").fontSize(12).fillColor(INK).text(day.reflection, left, doc.y, { width, lineGap: 2.5 }));
    doc.moveDown(0.8);
    tag(doc, root_, "H3", () => doc.font("Times-Bold").fontSize(11).fillColor(INK).text("Talk about it", left, doc.y, { width }));
    tag(doc, root_, "P", () => doc.font("Times-Roman").fontSize(12).fillColor(INK).text(day.question, left, doc.y + 2, { width, lineGap: 2 }));
    doc.moveDown(0.8);
    tag(doc, root_, "H3", () => doc.font("Times-Bold").fontSize(11).fillColor(INK).text("Pray", left, doc.y, { width }));
    tag(doc, root_, "P", () => doc.font("Times-Italic").fontSize(12).fillColor(INK).text(day.prayer, left, doc.y + 2, { width, lineGap: 2 }));
  }
  root_.end();
  footer(doc, `${SITE}/family/devotions`);
  return toBuffer(doc);
}

export async function buildSeasonalPacks(root, passageText) {
  const out = path.join(root, "client/public/downloads/seasonal");
  fs.mkdirSync(out, { recursive: true });
  const written = [];
  for (const [season, file] of [["advent", "advent-family"], ["holyWeek", "holy-week-family"]]) {
    for (const [name, size] of Object.entries(SIZES)) {
      const p = path.join(out, `${file}-${name}.pdf`);
      fs.writeFileSync(p, await seasonalPdf(root, season, size, passageText));
      written.push(p);
    }
  }
  return written;
}

/* ── Section-wide printables (docs/grow/GROW-PROMPT.md 7.6) ─────────────── */

const BSB_NOTICE = "Scripture quotations are from the Berean Standard Bible, which is in the public domain.";

/**
 * A prayer journal: a month of mornings shaped by the prayer Jesus taught,
 * which begins with God before it comes to us. The pattern page prints
 * Matthew 6:9-13 in full; each day is a page with room to write.
 */
export async function prayerJournalPdf(size, lordsPrayer) {
  const doc = newDoc(size, "A prayer journal: a month of mornings", 48);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const { left, width } = worksheetHeader(doc, root, "A PRAYER JOURNAL", "A month of mornings with God",
    "Prayer is easier to keep when it has a shape. This journal borrows its shape from the prayer Jesus taught his disciples, which begins with who God is before it gets to what we need. Each morning, write the date and what you read, then work down the page. A line is enough on a hard day. Some mornings you will have nothing but the asking, and the Psalms are full of prayers like that. God is not grading the page.");
  const top = doc.y;
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text("The pattern Jesus gave", left + 12, top + 10, { width: width - 24 }));
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(11).fillColor(INK).text(lordsPrayer, left + 12, doc.y + 4, { width: width - 24, lineGap: 2 }));
  tag(doc, root, "P", () => doc.font("Times-Bold").fontSize(9.5).fillColor(MUSTARD).text("Matthew 6:9-13 (BSB)", left + 12, doc.y + 4, { width: width - 24 }));
  const boxBottom = doc.y + 10;
  artifact(doc, () => { doc.save().lineWidth(0.8).strokeColor(MUSTARD).rect(left, top, width, boxBottom - top).stroke().restore(); });
  doc.y = boxBottom + 14;
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(12).fillColor(INK).text("Each page, from the top", left, doc.y, { width }));
  doc.moveDown(0.2);
  for (const [h, t] of [
    ["Who God is.", "What does what you read show you about him? Start there, with him, before the list."],
    ["What I confess.", "Name it plainly. He already knows, and he is faithful to forgive (1 John 1:9)."],
    ["What I'm thankful for.", "Small and specific counts. Gratitude teaches the eyes to see."],
    ["For others.", "Names and needs. Pray for the people who are hard to love, too."],
    ["For myself.", "Ask honestly. He invites it."],
    ["What I'll carry into today.", "One line to take with you."],
  ]) {
    tag(doc, root, "P", () => {
      doc.font("Times-Bold").fontSize(10.5).fillColor(INK).text(`${h} `, left, doc.y + 2, { width, continued: true, lineGap: 1.5 });
      doc.font("Times-Roman").text(t, { lineGap: 1.5 });
    });
  }
  doc.moveDown(0.6);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(`${BSB_NOTICE} More on prayer: ${SITE}/help/prayer.`, left, doc.y, { width }));

  for (let day = 1; day <= 30; day++) {
    doc.addPage();
    masthead(doc);
    doc.y = 56;
    tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(9).fillColor(MUSTARD).text(`DAY ${day}`, left, doc.y, { width, characterSpacing: 2 }));
    doc.y += 8;
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10).fillColor(MUTED).text("Date", left, doc.y, { lineBreak: false }));
    rule(doc, left + 30, left + width * 0.36, doc.y + 11);
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10).fillColor(MUTED).text("I read", left + width * 0.42, doc.y, { lineBreak: false }));
    rule(doc, left + width * 0.42 + 34, left + width, doc.y + 11);
    doc.y += 26;
    promptBlock(doc, root, left, width, "Who God is", "", 3);
    promptBlock(doc, root, left, width, "What I confess", "", 3);
    promptBlock(doc, root, left, width, "What I'm thankful for", "", 3);
    promptBlock(doc, root, left, width, "For others", "", 5);
    promptBlock(doc, root, left, width, "For myself", "", 4);
    promptBlock(doc, root, left, width, "What I'll carry into today", "", 3);
  }
  doc.addPage();
  doc.y = doc.page.margins.top;
  tag(doc, root, "H2", () => doc.font("Times-Bold").fontSize(16).fillColor(INK).text("Answered", left, doc.y, { width }));
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(10).fillColor(INK).text("The date, the prayer, and how the answer came. Some answers are yes, some are not yet, and some are a different mercy than the one you asked for.", left, doc.y + 4, { width }));
  doc.y += 14;
  while (doc.y + 22 < doc.page.height - doc.page.margins.bottom - 24) { doc.y += 22; rule(doc, left, left + width, doc.y); }
  root.end();
  footer(doc, `${SITE}/help/prayer`);
  return toBuffer(doc);
}

/**
 * A rule of life on one page: the shape of an ordinary week, to keep in a
 * Bible (the companion to /tools/rule-of-life).
 */
export async function ruleOfLifePdf(size) {
  const doc = newDoc(size, "A rule of life on one page", 48);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const { left, width } = worksheetHeader(doc, root, "A RULE OF LIFE", "The shape of an ordinary week",
    "A rule of life is an old idea: a short, written pattern for the week that makes room for God and for the people you love. Think of it as a trellis, not a cage. Under each heading, write one small, concrete practice, smaller than you think. A rule you keep at half strength will form you; one you abandon in a week will not.");
  for (const [h, n, lines] of [
    ["Every day: prayer", "When and where. One fixed time beats a good intention.", 2],
    ["Every day: Scripture", "What you will read, and how much.", 1],
    ["Every week: worship and the table", "Your church, and when you gather with it.", 1],
    ["Every week: rest", "Which day, what you will stop, and what you will enjoy.", 2],
    ["People", "Who you will eat with, call, or pray with on purpose.", 2],
    ["Work and service", "How your work and your time serve someone besides you.", 2],
    ["The body", "Sleep, food, and movement: the plain things that make the rest possible.", 1],
    ["What I will put down", "The habit or the screen that crowds the rest out.", 1],
    ["Who will ask me how it is going", "A name, and when you will check in.", 1],
  ]) promptBlock(doc, root, left, width, h, n, lines);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text("Look at it again when your season of life changes, not when you fail. On the day you notice you stopped, start again.", left, doc.y, { width }));
  root.end();
  footer(doc, `${SITE}/tools/rule-of-life`);
  return toBuffer(doc);
}

/**
 * Scripture to carry: one verse for each hard place on Find Help, chosen to
 * be memorized and read in its context on the care page it comes from.
 * Keyed by need slug; a card prints only once its care page is live.
 */
export const MEMORY_VERSES = {
  anxiety: "1 Peter 5:6-7",
  "fear-of-the-future": "Matthew 6:34",
  loneliness: "Psalm 25:16",
  grief: "Psalm 34:18",
  suffering: "Romans 8:18",
  doubt: "Mark 9:24",
  empty: "Psalm 42:11",
  prayer: "Romans 8:26",
  marriage: "Ephesians 4:32",
  "reading-the-bible": "Psalm 119:105",
  decisions: "Proverbs 3:5-6",
  "cant-forgive": "Colossians 3:13",
  addiction: "1 Corinthians 10:13",
  pornography: "Psalm 51:10",
  "church-hurt": "Matthew 12:20",
  caregiving: "Galatians 6:9",
  parenting: "Deuteronomy 6:6-7",
  fatherless: "Psalm 68:5",
  "work-burnout": "Matthew 11:28",
  money: "Hebrews 13:5",
  purpose: "Ephesians 2:10",
  divorce: "Psalm 147:3",
  curious: "John 1:46",
  deconstructing: "John 6:68",
  "new-believer": "2 Corinthians 5:17",
  "whole-life": "John 15:5",
  diagnosis: "2 Corinthians 4:16",
  healing: "Revelation 21:4",
  infertility: "Psalm 62:8",
  "job-loss": "Lamentations 3:22-23",
  anger: "Proverbs 15:1",
  politics: "Philippians 3:20",
  "family-devotions": "Psalm 78:4",
  "refer-to-counselor": "Exodus 18:18",
  "is-it-a-sin": "Psalm 139:23-24",
  "trust-the-bible": "2 Timothy 3:16-17",
  fasting: "Matthew 4:4",
  "pets-and-heaven": "Psalm 36:6",
  dating: "1 Corinthians 13:4-5",
};

export async function memoryCardsPdf(cards, size) {
  const doc = newDoc(size, "Scripture to carry: a verse for each hard place", 0);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const W = doc.page.width;
  const H = doc.page.height;
  // The first page explains the set; the cards follow, four to a page.
  masthead(doc);
  const left = 54;
  const width = W - 108;
  doc.y = 140;
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(MUSTARD).text("SCRIPTURE CARDS", left, doc.y, { width, align: "center", characterSpacing: 2.4 }));
  doc.moveDown(0.6);
  tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(28).fillColor(INK).text("Scripture to carry", left, doc.y, { width, align: "center" }));
  doc.moveDown(0.3);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(13).fillColor(MUTED).text(`A verse for each hard place: ${cards.length} cards`, left, doc.y, { width, align: "center" }));
  doc.moveDown(2);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(11.5).fillColor(INK).text(
    "Each card carries one verse for one of the hard places on Find Help, printed in full. Cut the cards apart along the dotted lines. Keep one where you will see it, in a wallet, on a mirror, by the kitchen sink, and read it aloud morning and evening until you can say it without looking. Then take the next one. A verse you know by heart is there at three in the morning when your phone is not.",
    left, doc.y, { width, lineGap: 3 }));
  doc.moveDown(0.8);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(11.5).fillColor(INK).text(
    "Every verse was chosen to be read in its place, and each card names the care page where you can read it in context. A verse is a door into a passage, not a slogan.",
    left, doc.y, { width, lineGap: 3 }));
  doc.moveDown(0.8);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(9).fillColor(MUTED).text(BSB_NOTICE, left, doc.y, { width }));

  const cw = W / 2;
  const ch = H / 2;
  const pad = 30;
  cards.forEach((c, i) => {
    if (i % 4 === 0) doc.addPage();
    const col = i % 2;
    const row = Math.floor((i % 4) / 2);
    const x = col * cw + pad;
    const w = cw - pad * 2;
    let fs = 15;
    doc.font("Times-Roman");
    while (fs > 8 && doc.fontSize(fs).heightOfString(c.text, { width: w, lineGap: 2 }) > ch - 140) fs -= 0.5;
    const blockH = doc.fontSize(fs).heightOfString(c.text, { width: w, lineGap: 2 }) + 26;
    const top = Math.max(row * ch + pad + 30, row * ch + (ch - 40 - blockH) / 2);
    tag(doc, root, "H2", () => doc.font("Times-Italic").fontSize(9).fillColor(MUTED).text(c.title, x, row * ch + pad + 4, { width: w }));
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(fs).fillColor(INK).text(c.text, x, top, { width: w, lineGap: 2 }));
    tag(doc, root, "P", () => doc.font("Times-Bold").fontSize(10).fillColor(MUSTARD).text(`${c.ref} (BSB)`, x, doc.y + 8, { width: w }));
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(7).fillColor(MUTED).text(`LiveWell by James Bell · ${SITE}/help/${c.slug}`, x, row * ch + ch - pad - 6, { width: w, lineBreak: false }));
    if (i % 4 === 3 || i === cards.length - 1) {
      rule(doc, 18, W - 18, ch, MUTED, 0.5, { len: 4, space: 4 });
      artifact(doc, () => { doc.save().lineWidth(0.5).strokeColor(MUTED).dash(4, { space: 4 }).moveTo(cw, 18).lineTo(cw, H - 18).stroke().undash().restore(); });
    }
  });
  root.end();
  return toBuffer(doc);
}

/**
 * Family table cards: the site's weekly family devotions
 * (client/public/family-devotions*.json), two cards to a page, each with the
 * passage in full from the BSB, the big idea, the questions, and the prayer.
 */
export async function familyCardsPdf(devotions, size) {
  const doc = newDoc(size, "Family table cards", 0);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const W = doc.page.width;
  const H = doc.page.height;
  masthead(doc);
  const left = 54;
  const width = W - 108;
  doc.y = 140;
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(9).fillColor(MUSTARD).text("FOR FAMILIES", left, doc.y, { width, align: "center", characterSpacing: 2.4 }));
  doc.moveDown(0.6);
  tag(doc, root, "H1", () => doc.font("Times-Bold").fontSize(28).fillColor(INK).text("Family table cards", left, doc.y, { width, align: "center" }));
  doc.moveDown(0.3);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(13).fillColor(MUTED).text(`${devotions.length} cards for the dinner table, the car, or bedtime`, left, doc.y, { width, align: "center" }));
  doc.moveDown(2);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(11.5).fillColor(INK).text(
    "Cut the cards apart and keep them in a jar or a box on the table. One card a night, or one a week. Read the passage aloud, say the big idea in your own words, ask a question and let the answers take as long as they take, then pray the prayer, or one of your own. Five minutes is enough. A missed night is not a failure; pick up the next card tomorrow.",
    left, doc.y, { width, lineGap: 3 }));
  doc.moveDown(0.8);
  tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(11.5).fillColor(INK).text(
    `Each card's full devotion, with a reflection and something to do together, is on ${SITE}/family/devotions.`,
    left, doc.y, { width, lineGap: 3 }));
  doc.moveDown(0.8);
  tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(9).fillColor(MUTED).text(BSB_NOTICE, left, doc.y, { width }));

  const ch = H / 2;
  const pad = 42;
  const w = W - pad * 2;
  const draw = (d, top, scale, dry) => {
    const s = (n) => n * scale;
    const parts = [
      ["Times-Roman", 9, d.theme.toUpperCase(), MUSTARD, 2, 5],
      ["Times-Bold", 19, d.title, INK, 0, 8],
      ["Times-Roman", 12.5, d.passageText, INK, 0, 3],
      ["Times-Bold", 10, `${d.passage} (BSB)`, MUSTARD, 0, 10],
      ["Times-Italic", 12.5, d.bigIdea, INK, 0, 10],
      ["Times-Bold", 9, "TALK ABOUT IT", MUTED, 1.5, 3],
      ...d.questions.slice(0, 3).map((q) => ["Times-Roman", 12, q, INK, 0, 4]),
      ["Times-Bold", 9, "PRAY", MUTED, 1.5, 3],
      ["Times-Italic", 12, d.prayer, INK, 0, 0],
    ];
    let y = top;
    for (const [font, size, text, color, spacing, after] of parts) {
      doc.font(font).fontSize(s(size));
      const h = doc.heightOfString(text, { width: w, lineGap: 1.5, characterSpacing: spacing });
      if (!dry) tag(doc, root, font === "Times-Bold" && size === 17 ? "H2" : "P", () => doc.fillColor(color).text(text, pad, y, { width: w, lineGap: 1.5, characterSpacing: spacing }));
      y += h + s(after);
    }
    return y - top;
  };
  devotions.forEach((d, i) => {
    if (i % 2 === 0) doc.addPage();
    const row = i % 2;
    let scale = 1;
    while (scale > 0.7 && draw(d, 0, scale, true) > ch - pad - 46) scale -= 0.04;
    draw(d, row * ch + pad - 6, scale, false);
    tag(doc, root, "P", () => doc.font("Times-Roman").fontSize(7).fillColor(MUTED).text(`LiveWell by James Bell · ${SITE}/family/devotions`, pad, row * ch + ch - 26, { width: w, lineBreak: false }));
    if (row === 0) rule(doc, 18, W - 18, ch, MUTED, 0.5, { len: 4, space: 4 });
  });
  root.end();
  return toBuffer(doc);
}

/** The section-wide printables: a prayer journal, a rule of life, Scripture cards, family table cards. */
export async function buildSectionPrintables(root) {
  const out = path.join(root, "client/public/downloads/tools");
  fs.mkdirSync(out, { recursive: true });
  const lordsPrayer = readingText("Matthew 6:9-13");
  const cards = Object.entries(MEMORY_VERSES)
    .map(([slug, ref]) => {
      const file = path.join(root, "client/public/needs", `${slug}.json`);
      if (!fs.existsSync(file)) return null;
      const need = JSON.parse(fs.readFileSync(file, "utf8"));
      return need.page === true ? { slug, title: need.title, ref, text: readingText(ref) } : null;
    })
    .filter(Boolean);
  const devotions = ["family-devotions.json", "family-devotions-2.json"]
    .flatMap((f) => JSON.parse(fs.readFileSync(path.join(root, "client/public", f), "utf8")));
  const written = [];
  for (const [name, size] of Object.entries(SIZES)) {
    for (const [file, make] of [
      ["prayer-journal", () => prayerJournalPdf(size, lordsPrayer)],
      ["rule-of-life", () => ruleOfLifePdf(size)],
      ["memory-cards", () => memoryCardsPdf(cards, size)],
      ["family-cards", () => familyCardsPdf(devotions, size)],
    ]) {
      const p = path.join(out, `${file}-${name}.pdf`);
      fs.writeFileSync(p, await make());
      written.push(p);
    }
  }
  return written;
}
