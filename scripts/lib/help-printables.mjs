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
  const sensitive = need.sensitivity !== "ordinary";
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
  if (need.sensitivity !== "ordinary") {
    tag(doc, root, "P", () => doc.font("Times-Italic").fontSize(9).fillColor(INK).text(`If you are in danger or thinking about ending your life: call or text 988, text HOME to 741741, or call 911. Numbers checked ${checkedLabel(crisis.checked)}.`, left, doc.y + 4, { width }));
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
 * The help box for the study guide PDFs on heavy subjects (the list is
 * client/src/data/sensitive-pages.json). The leader's copy says what to do if
 * someone in the group is in danger; the participant's copy speaks to the
 * reader. Numbers come from the verified crisis file.
 */
export function studyGuideHelpBox(doc, crisis, audience) {
  const left = doc.page.margins.left;
  const width = doc.page.width - left * 2;
  const dv = crisis.resources.find((r) => r.id === "dv-hotline");
  const dvCall = dv.actions.find((a) => a.kind === "call").label.replace(/^Call /, "");
  const dvText = dv.actions.find((a) => a.kind === "text").label.replace(/^Text /, "text ");
  const text = audience === "leader"
    ? `Some sessions in this study touch grief, despair, anger, or abuse. If anyone says they are thinking about ending their life, or that they are not safe at home, stop the lesson and help them reach a person: call or text 988, the Suicide & Crisis Lifeline; in immediate danger, call 911; for fear of someone at home, the National Domestic Violence Hotline, ${dvCall}, or ${dvText}. Never ask anyone to disclose abuse in the group. Talk with them privately afterward. If you are a church leader, mandated-reporting laws may apply to you; they vary by state, so check your own obligations. Numbers checked ${checkedLabel(crisis.checked)}.`
    : `If you are in danger or thinking about ending your life, call or text 988, the Suicide & Crisis Lifeline, any hour. In immediate danger, call 911. If you are afraid of someone at home, call the National Domestic Violence Hotline, ${dvCall}, or ${dvText}. These lines are free and confidential. Numbers checked ${checkedLabel(crisis.checked)}.`;
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
