/**
 * reading-plans.mjs — printable Bible reading plans (docs/grow/GROW-PROMPT.md
 * 7.6: "reading plans (30 days, 90 days, a year, a Gospel in a month)").
 *
 * The plans are named in client/src/data/bible-reading-plans.json. The days
 * are computed here from the Bible data (client/public/bible/), never typed by
 * hand: the chapters in scope, in canonical order, are cut into contiguous
 * days whose verse counts come as close as whole chapters allow to an equal
 * share, so each day asks about the same time of the reader. A plan with
 * `unit: "scene"` cuts at the scenes in the Study Bible notes' outlines
 * instead, so each day ends where a story ends (the Lent plan through Mark);
 * `through` stops at a chapter, and `finale` adds a closing reading outside
 * the count (Easter morning). Each plan prints in US Letter and A4 to
 * client/public/downloads/reading-plans/<id>-<size>.pdf: a checklist, with a
 * line to write on for the plans of forty-five days or fewer.
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
const SIZES = { letter: "LETTER", a4: "A4" };

/** Every chapter in scope, in canonical order, with its verse count. `through` stops at that chapter. */
export function chaptersFor(root, scope, through = Infinity) {
  const books = JSON.parse(fs.readFileSync(path.join(root, "client/public/bible/books.json"), "utf8"));
  const inScope = books.filter((b) => (scope === "ALL" ? true : scope === "NT" || scope === "OT" ? b.testament === scope : scope.includes(b.slug)));
  const out = [];
  for (const b of inScope) {
    for (let c = 1; c <= Math.min(b.chapters, through); c++) {
      const ch = JSON.parse(fs.readFileSync(path.join(root, "client/public/bible/ch", b.slug, `${c}.json`), "utf8"));
      out.push({ book: b.name, slug: b.slug, chapters: b.chapters, c, verses: ch.verses.length });
    }
  }
  return out;
}

/**
 * The scenes of each chapter in scope, from the Study Bible notes' outlines
 * (client/public/bible/notes/<book>/<chapter>.json), so a day can end where
 * a story ends. A chapter without an outline counts as one scene.
 */
export function sectionsFor(root, scope, through = Infinity) {
  const out = [];
  for (const ch of chaptersFor(root, scope, through)) {
    let outline = [];
    try {
      outline = JSON.parse(fs.readFileSync(path.join(root, "client/public/bible/notes", ch.slug, `${ch.c}.json`), "utf8")).outline || [];
    } catch { /* no notes for this chapter */ }
    const parts = outline.map((o) => {
      const [a, b] = String(o.v).split("-").map(Number);
      return { from: a, to: Number.isFinite(b) ? b : a, title: o.t };
    });
    const covers = parts.length && parts[0].from === 1 && parts[parts.length - 1].to === ch.verses &&
      parts.every((x, i) => i === 0 || x.from === parts[i - 1].to + 1);
    if (!covers) { out.push({ ...ch, from: 1, to: ch.verses, title: "" }); continue; }
    for (const x of parts) out.push({ ...ch, from: x.from, to: x.to, title: x.title, verses: x.to - x.from + 1 });
  }
  return out;
}

/**
 * Cut `chapters` into `days` contiguous groups, each at least one chapter,
 * each boundary placed where the running verse count comes closest to the
 * day's equal share.
 */
export function splitDays(chapters, days) {
  if (chapters.length < days) throw new Error(`${chapters.length} chapters cannot fill ${days} days`);
  const total = chapters.reduce((s, x) => s + x.verses, 0);
  const cum = [];
  let run = 0;
  for (const x of chapters) cum.push((run += x.verses));
  const cuts = []; // index of the last chapter of each day except the final day
  let prev = -1;
  for (let k = 1; k < days; k++) {
    const target = (total * k) / days;
    // Leave at least one chapter for each remaining day.
    const lo = prev + 1;
    const hi = chapters.length - 1 - (days - k);
    let best = lo;
    for (let i = lo; i <= hi; i++) {
      if (Math.abs(cum[i] - target) < Math.abs(cum[best] - target)) best = i;
      if (cum[i] > target) break;
    }
    cuts.push(best);
    prev = best;
  }
  // Smooth: a very long chapter (Psalm 119) can leave a sliver of a day after
  // it. Nudge each boundary a chapter at a time while that evens out the two
  // days it separates, until nothing moves.
  const mean = total / days;
  const sum = (a, b) => cum[b] - (a > 0 ? cum[a - 1] : 0); // verses in chapters a..b
  const dayStart = (j) => (j === 0 ? 0 : cuts[j - 1] + 1);
  const dayEnd = (j) => (j === cuts.length ? chapters.length - 1 : cuts[j]);
  const cost = (a, b) => (sum(a, b) - mean) ** 2;
  for (let pass = 0, moved = true; moved && pass < 1000; pass++) {
    moved = false;
    for (let j = 0; j < cuts.length; j++) {
      const a = dayStart(j);
      const z = dayEnd(j + 1);
      const now = cost(a, cuts[j]) + cost(cuts[j] + 1, z);
      for (const c of [cuts[j] - 1, cuts[j] + 1]) {
        if (c < a || c + 1 > z) continue; // each day keeps at least one chapter
        if (cost(a, c) + cost(c + 1, z) < now - 1e-9) {
          cuts[j] = c;
          moved = true;
          break;
        }
      }
    }
  }
  const groups = [];
  let start = 0;
  for (const end of [...cuts, chapters.length - 1]) {
    groups.push(chapters.slice(start, end + 1));
    start = end + 1;
  }
  return groups;
}

/** "Mark 1:1-20", "Mark 1:40-2:12": the label for a run of scenes. */
function sceneLabel(group) {
  const first = group[0];
  const last = group[group.length - 1];
  if (first.slug !== last.slug) return `${first.book} ${first.c}:${first.from} to ${last.book} ${last.c}:${last.to}`;
  if (first.c === last.c) return `${first.book} ${first.c}:${first.from}-${last.to}`;
  return `${first.book} ${first.c}:${first.from}-${last.c}:${last.to}`;
}

/** "Genesis 1-3", "Obadiah", "Genesis 50 to Exodus 2", "Psalm 23". */
export function labelFor(group) {
  if (group[0].from !== undefined) return sceneLabel(group);
  const name = (x) => (x.slug === "psalms" ? "Psalm" : x.book);
  const one = (x) => (x.chapters === 1 ? x.book : `${name(x)} ${x.c}`);
  const first = group[0];
  const last = group[group.length - 1];
  if (group.length === 1) return one(first);
  if (first.slug === last.slug) {
    const plural = first.slug === "psalms" ? "Psalms" : first.book;
    return `${plural} ${first.c}-${last.c}`;
  }
  return `${one(first)} to ${one(last)}`;
}

export function planDays(root, plan) {
  const units = plan.unit === "scene" ? sectionsFor(root, plan.scope, plan.through) : chaptersFor(root, plan.scope, plan.through);
  const days = splitDays(units, plan.days).map((g, i) => ({
    day: i + 1,
    reading: labelFor(g),
    ...(plan.unit === "scene" ? { note: g.map((x) => x.title).filter(Boolean).join("; ") } : {}),
  }));
  // A closing reading outside the count (Easter morning, after Lent's forty days).
  if (plan.finale) days.push({ day: plan.finale.label, reading: plan.finale.reading, note: plan.finale.note || "" });
  return days;
}

function newDoc(size, title) {
  return new PDFDocument({
    size,
    margins: { top: 54, bottom: 54, left: 54, right: 54 },
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

/** Decoration (rules, boxes) is an artifact, not content. */
function artifact(doc, draw) {
  doc.markContent("Artifact");
  draw();
  doc.endMarkedContent();
}

export async function readingPlanPdf(plan, days, size) {
  const doc = newDoc(size, `${plan.title}: a Bible reading plan`);
  const root = doc.struct("Document");
  doc.addStructure(root);
  const tag = (type, draw) => root.add(doc.struct(type, () => draw()));
  const W = doc.page.width;
  const left = doc.page.margins.left;
  const width = W - left * 2;

  artifact(doc, () => {
    doc.save().rect(0, 0, W, 34).fill(INK).restore();
    doc.fillColor(MUSTARD).font("Times-Bold").fontSize(10).text("LIVEWELL", 0, 12, { width: W / 2 - 8, align: "right", characterSpacing: 3, lineBreak: false });
    doc.fillColor("#F5F0E6").font("Times-Roman").fontSize(7).text("BY JAMES BELL", W / 2 + 8, 14, { characterSpacing: 2, lineBreak: false });
  });
  doc.y = 62;
  tag("P", () => doc.font("Times-Roman").fontSize(8).fillColor(MUSTARD).text("A BIBLE READING PLAN", left, doc.y, { width, characterSpacing: 2 }));
  tag("H1", () => doc.font("Times-Bold").fontSize(22).fillColor(INK).text(plan.title, left, doc.y + 4, { width }));
  doc.moveDown(0.3);
  tag("P", () => doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(plan.blurb, left, doc.y, { width, lineGap: 1.5 }));
  doc.moveDown(0.3);
  tag("P", () => doc.font("Times-Italic").fontSize(9).fillColor(MUTED).text(
    `Tick each day as you read it. Any translation will do; the site's Bible, with notes on every chapter, is at ${SITE}/study/bible.`,
    left, doc.y, { width }));
  doc.moveDown(0.6);

  const box = (x, y) => artifact(doc, () => { doc.save().lineWidth(0.7).strokeColor(INK).rect(x, y + 1.5, 8, 8).stroke().restore(); });
  const bottom = () => doc.page.height - doc.page.margins.bottom - 18;
  const list = doc.struct("L");
  root.add(list);

  if (days.length <= 45) {
    // One row per day, with a line to write on; a plan read by scenes names them.
    const label = (d) => (typeof d.day === "number" ? `Day ${d.day}` : d.day);
    const labelW = days.some((d) => typeof d.day !== "number") ? 82 : 50;
    for (const d of days) {
      const rowH = d.note ? 41 : 34;
      if (doc.y + rowH > bottom()) { doc.addPage(); doc.y = doc.page.margins.top; }
      const y = doc.y;
      box(left, y);
      list.add(doc.struct("LI", () => {
        doc.font("Times-Bold").fontSize(10.5).fillColor(INK).text(label(d), left + 14, y, { width: labelW, lineBreak: false });
        doc.font("Times-Roman").fontSize(10.5).fillColor(INK).text(d.reading, left + 16 + labelW, y, { width: width - 16 - labelW, lineBreak: false });
        if (d.note) doc.font("Times-Italic").fontSize(8.5).fillColor(MUTED).text(d.note, left + 16 + labelW, y + 13, { width: width - 16 - labelW, lineBreak: false, ellipsis: true });
      }));
      artifact(doc, () => { doc.save().lineWidth(0.5).strokeColor(RULE).moveTo(left + 16 + labelW, y + rowH - 6).lineTo(left + width, y + rowH - 6).stroke().restore(); });
      doc.y = y + rowH;
    }
  } else {
    // A checklist in columns: three on Letter and A4.
    const cols = 3;
    const gap = 14;
    const colW = (width - gap * (cols - 1)) / cols;
    const rowH = 14;
    let top = doc.y;
    let col = 0;
    let y = top;
    for (const d of days) {
      if (y + rowH > bottom()) {
        col++;
        y = top;
        if (col === cols) { doc.addPage(); col = 0; top = doc.page.margins.top; y = top; }
      }
      const x = left + col * (colW + gap);
      box(x, y);
      list.add(doc.struct("LI", () => {
        doc.font("Times-Bold").fontSize(8.5).fillColor(INK).text(String(d.day), x + 12, y + 1, { width: 22, lineBreak: false });
        doc.font("Times-Roman").fontSize(8.5).fillColor(INK).text(d.reading, x + 34, y + 1, { width: colW - 34, lineBreak: false, ellipsis: true });
      }));
      y += rowH;
    }
  }
  list.end();
  root.end();

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const mb = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;
    artifact(doc, () => {
      doc.font("Times-Roman").fontSize(7.5).fillColor(MUTED).text(`${SITE} · ${plan.title}`, 36, doc.page.height - 30, { width: W - 72, align: "center", lineBreak: false });
    });
    doc.page.margins.bottom = mb;
  }
  return toBuffer(doc);
}

export async function buildReadingPlans(root) {
  const plans = JSON.parse(fs.readFileSync(path.join(root, "client/src/data/bible-reading-plans.json"), "utf8")).plans;
  const out = path.join(root, "client/public/downloads/reading-plans");
  fs.mkdirSync(out, { recursive: true });
  const written = [];
  for (const plan of plans) {
    const days = planDays(root, plan);
    for (const [name, size] of Object.entries(SIZES)) {
      const p = path.join(out, `${plan.id}-${name}.pdf`);
      fs.writeFileSync(p, await readingPlanPdf(plan, days, size));
      written.push(p);
    }
  }
  return written;
}
