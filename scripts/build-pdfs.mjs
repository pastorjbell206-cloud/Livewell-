/**
 * build-pdfs.mjs — generates downloadable PDF study guides at build time.
 *
 * Sources:
 *   client/public/context/guides/*.json          → client/public/downloads/context/<slug>.pdf
 *   client/public/leadership/sermon-series.json  → client/public/downloads/sermon-series/<id>.pdf
 *
 * Run:  node scripts/build-pdfs.mjs
 *
 * Rerun whenever a context guide or sermon series is added or edited —
 * the PDFs are static files served from /downloads/, and they do not
 * regenerate themselves. The script is idempotent: it overwrites every
 * PDF on each run, so running it twice is always safe.
 *
 * Layout: Times-Roman family (pdfkit built-in), 72pt margins, footer with
 * the site domain and page number on every page. No external assets.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GUIDES_DIR = path.join(ROOT, "client/public/context/guides");
const SERIES_FILE = path.join(ROOT, "client/public/leadership/sermon-series.json");
const OUT_CONTEXT = path.join(ROOT, "client/public/downloads/context");
const OUT_SERIES = path.join(ROOT, "client/public/downloads/sermon-series");
const STUDYGUIDES_DIR = path.join(ROOT, "client/public/studyguides");
const OUT_STUDYGUIDES = path.join(ROOT, "client/public/downloads/studyguides");

// Palette (print-safe subset of the brand tokens)
const INK = "#14110C";
const MUTED = "#5A5448";
const MUSTARD = "#9A7412"; // darkened mustard so it reads on white paper
const RULE = "#C9C2B4";

const MARGIN = 72;

// Fixed timestamp so identical content yields byte-identical PDFs. Without
// this, pdfkit stamps the current time into every file and every build dirties
// the whole downloads/ tree even when nothing changed.
const FIXED_DATE = new Date("2026-01-01T00:00:00Z");

function newDoc(meta) {
  return new PDFDocument({
    size: "LETTER",
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    bufferPages: true,
    info: {
      Title: meta.title, Author: "James Bell", Creator: "LiveWell by James Bell",
      CreationDate: FIXED_DATE, ModDate: FIXED_DATE,
    },
  });
}

function contentWidth(doc) {
  return doc.page.width - doc.page.margins.left - doc.page.margins.right;
}

/** Start a new page if fewer than `needed` points remain below the cursor. */
function ensureRoom(doc, needed) {
  if (doc.y + needed > doc.page.height - doc.page.margins.bottom) doc.addPage();
}

function kickerLine(doc, text, color = MUSTARD) {
  doc.font("Times-Roman").fontSize(9).fillColor(color)
    .text(text.toUpperCase(), { characterSpacing: 2.2 });
}

function thinRule(doc, color = MUSTARD, width = 0.75) {
  const y = doc.y;
  doc.save()
    .moveTo(doc.page.margins.left, y)
    .lineTo(doc.page.width - doc.page.margins.right, y)
    .lineWidth(width)
    .strokeColor(color)
    .stroke()
    .restore();
  doc.y = y;
}

/** Title-page block: kicker, large title, subtitle, thin rule. */
function titleBlock(doc, { kicker, title, subtitle }) {
  doc.moveDown(1.5);
  if (kicker) {
    kickerLine(doc, kicker);
    doc.moveDown(1);
  }
  doc.font("Times-Roman").fontSize(30).fillColor(INK)
    .text(title, { lineGap: 2 });
  if (subtitle) {
    doc.moveDown(0.6);
    doc.font("Times-Italic").fontSize(13).fillColor(MUTED)
      .text(subtitle, { lineGap: 3 });
  }
  doc.moveDown(1.2);
  thinRule(doc);
  doc.moveDown(2);
}

function sectionHeading(doc, { kicker, title }) {
  ensureRoom(doc, 110); // keep headings off the last lines of a page
  if (kicker) {
    kickerLine(doc, kicker);
    doc.moveDown(0.45);
  }
  doc.font("Times-Bold").fontSize(16).fillColor(INK).text(title, { lineGap: 2 });
  doc.moveDown(0.6);
}

function bodyParagraphs(doc, body) {
  for (const p of body.split("\n\n").map((s) => s.trim()).filter(Boolean)) {
    doc.font("Times-Roman").fontSize(11).fillColor(INK)
      .text(p, { lineGap: 4.5, paragraphGap: 0 });
    doc.moveDown(0.8);
  }
}

function listHeading(doc, label) {
  ensureRoom(doc, 90);
  kickerLine(doc, label);
  doc.moveDown(0.5);
}

/** Ruled lines for handwritten notes under each sermon in a printed copy. */
function notesLines(doc, count) {
  const lineHeight = 20;
  ensureRoom(doc, count * lineHeight + 16);
  doc.font("Times-Italic").fontSize(9).fillColor(MUTED).text("Notes");
  doc.moveDown(0.5);
  const left = doc.page.margins.left;
  const right = doc.page.width - doc.page.margins.right;
  let y = doc.y + lineHeight - 6;
  doc.save().lineWidth(0.5).strokeColor(RULE);
  for (let i = 0; i < count; i++) {
    doc.moveTo(left, y).lineTo(right, y).stroke();
    y += lineHeight;
  }
  doc.restore();
  doc.y = y - lineHeight + 6;
}

/** A short label run followed by body text on the next line. */
function labelBody(doc, label, text) {
  ensureRoom(doc, 56);
  kickerLine(doc, label);
  doc.moveDown(0.35);
  doc.font("Times-Roman").fontSize(11).fillColor(INK).text(text, { lineGap: 3.5 });
  doc.moveDown(0.7);
}

// ---------------------------------------------------------------------------
// Study-guide toolkits: a Leader's Guide and a Participant Handout per series
// ---------------------------------------------------------------------------

async function buildStudyGuideLeader(g) {
  const outPath = path.join(OUT_STUDYGUIDES, `${g.slug}-leader.pdf`);
  await writePdf(outPath, (doc) => {
    titleBlock(doc, { kicker: "Leader's Guide", title: g.title, subtitle: g.audience + ". " + g.sessionsLabel + "." });
    doc.moveDown(1);
    bodyParagraphs(doc, g.summary);

    if (g.leaderPrimer) {
      doc.addPage();
      sectionHeading(doc, { kicker: "Before you begin", title: "Leader training primer" });
      bodyParagraphs(doc, g.leaderPrimer);
    }

    for (const s of g.sessions) {
      doc.addPage();
      sectionHeading(doc, { kicker: "Session " + s.n, title: s.title });
      labelBody(doc, "Aim", s.aim);
      labelBody(doc, "Timing", s.timing.map((t) => t.segment + " " + t.minutes + " min").join("   "));
      if (s.teaching) { listHeading(doc, "Teaching notes"); bodyParagraphs(doc, s.teaching); }
      labelBody(doc, "Key Scripture", s.keyScripture.ref + ". " + s.keyScripture.why);
      if (s.scriptureStudy?.length) {
        listHeading(doc, "The passage, worked through");
        s.scriptureStudy.forEach((v) => {
          ensureRoom(doc, 46);
          doc.font("Times-Bold").fontSize(11).fillColor(INK).text(v.ref + ". ", { continued: true })
            .font("Times-Roman").text(v.note, { lineGap: 3 });
          doc.moveDown(0.4);
        });
      }
      listHeading(doc, "Discussion");
      s.discussion.forEach((d, i) => {
        ensureRoom(doc, 70);
        doc.font("Times-Bold").fontSize(11).fillColor(INK).text((i + 1) + ". " + d.q, { lineGap: 3 });
        doc.font("Times-Italic").fontSize(10).fillColor(MUTED).text("Behind it: " + d.behind, { lineGap: 3, indent: 14 });
        doc.moveDown(0.5);
      });
      labelBody(doc, "If the room goes quiet", s.quietRoomQuestion);
      listHeading(doc, "Anticipated objections");
      s.objections.forEach((o) => {
        ensureRoom(doc, 64);
        doc.font("Times-Bold").fontSize(11).fillColor(INK).text("'" + o.objection + "'", { lineGap: 3 });
        doc.font("Times-Roman").fontSize(11).fillColor(INK).text(o.response, { lineGap: 3 });
        doc.moveDown(0.5);
      });
      if (s.caseStudy) { listHeading(doc, "A scenario for the room"); bodyParagraphs(doc, s.caseStudy); }
      if (s.goingDeeper) { listHeading(doc, "Going deeper"); bodyParagraphs(doc, s.goingDeeper); }
      if (s.memoryVerse) labelBody(doc, "Memory verse", s.memoryVerse);
      labelBody(doc, "Closing prayer", s.closingPrayer);
    }

    if (g.faq?.length) {
      doc.addPage();
      sectionHeading(doc, { kicker: "Reference", title: "Hard questions" });
      g.faq.forEach((f) => {
        ensureRoom(doc, 70);
        doc.font("Times-Bold").fontSize(11).fillColor(INK).text(f.q, { lineGap: 3 });
        doc.font("Times-Roman").fontSize(11).fillColor(INK).text(f.a, { lineGap: 3 });
        doc.moveDown(0.6);
      });
    }

    doc.addPage();
    sectionHeading(doc, { kicker: "Reference", title: "Three ways to run it" });
    for (const c of g.cadences) {
      listHeading(doc, c.name);
      c.plan.forEach((p) => doc.font("Times-Roman").fontSize(11).fillColor(INK).text(p, { lineGap: 3 }));
      doc.moveDown(0.6);
    }
    sectionHeading(doc, { kicker: "Reference", title: "Bibliography" });
    g.bibliography.forEach((b) => {
      ensureRoom(doc, 40);
      doc.font("Times-Italic").fontSize(11).fillColor(INK).text(b.title, { continued: true })
        .font("Times-Roman").text(", " + b.author + ". ", { continued: true })
        .fillColor(MUTED).text(b.note);
      doc.moveDown(0.4);
    });
  }, { title: g.title + " — Leader's Guide" });
  return outPath;
}

async function buildStudyGuideParticipant(g) {
  const outPath = path.join(OUT_STUDYGUIDES, `${g.slug}-participant.pdf`);
  await writePdf(outPath, (doc) => {
    titleBlock(doc, { kicker: "Participant Handout", title: g.title, subtitle: g.audience + "." });
    for (const s of g.sessions) {
      doc.addPage();
      sectionHeading(doc, { kicker: "Session " + s.n, title: s.title });
      bodyParagraphs(doc, s.summary);
      labelBody(doc, "Key Scripture", s.keyScripture.ref);
      if (s.memoryVerse) labelBody(doc, "Memory verse", s.memoryVerse);
      listHeading(doc, "Reflect");
      s.reflection.forEach((r, i) => {
        doc.font("Times-Roman").fontSize(11).fillColor(INK).text((i + 1) + ". " + r, { lineGap: 3 });
        notesLines(doc, 2);
        doc.moveDown(0.3);
      });
      labelBody(doc, "This week, try this", s.practice);

      // The five-day devotional for the week between sessions.
      if (s.devotional?.length) {
        doc.addPage();
        sectionHeading(doc, { kicker: "Session " + s.n + " · the week between", title: "Five days in the text" });
        s.devotional.forEach((d) => {
          ensureRoom(doc, 120);
          kickerLine(doc, "Day " + d.day + " · " + d.passage);
          doc.moveDown(0.3);
          doc.font("Times-Bold").fontSize(13).fillColor(INK).text(d.title);
          doc.moveDown(0.3);
          bodyParagraphs(doc, d.body);
          doc.font("Times-Italic").fontSize(10.5).fillColor(MUTED).text(d.prayer, { lineGap: 3 });
          doc.moveDown(0.8);
        });
      }
    }
  }, { title: g.title + " — Participant Handout" });
  return outPath;
}

/** Footer on every page: domain centered, page number beneath it. */
function stampFooters(doc) {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const savedBottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 0; // allow writing inside the bottom margin
    const w = doc.page.width;
    doc.font("Times-Roman").fontSize(8).fillColor(MUTED)
      .text("livewellbyjamesbell.co", 0, doc.page.height - 54, {
        width: w, align: "center", lineBreak: false, characterSpacing: 1,
      });
    doc.fontSize(8).fillColor(MUTED)
      .text(String(i + 1), 0, doc.page.height - 42, {
        width: w, align: "center", lineBreak: false,
      });
    doc.page.margins.bottom = savedBottom;
  }
}

function writePdf(outPath, build, meta) {
  return new Promise((resolve, reject) => {
    const doc = newDoc(meta);
    const stream = fs.createWriteStream(outPath);
    stream.on("finish", resolve);
    stream.on("error", reject);
    doc.pipe(stream);
    try {
      build(doc);
      stampFooters(doc);
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ---------------------------------------------------------------------------
// Context guides
// ---------------------------------------------------------------------------

async function buildContextGuide(guide) {
  const outPath = path.join(OUT_CONTEXT, `${guide.slug}.pdf`);
  await writePdf(outPath, (doc) => {
    titleBlock(doc, {
      kicker: `Reading Scripture in Context · ${guide.kicker || guide.group || ""}`,
      title: guide.title,
      subtitle: guide.subtitle,
    });

    for (const section of guide.sections || []) {
      sectionHeading(doc, section);
      bodyParagraphs(doc, section.body || "");
      doc.moveDown(0.6);
    }

    if (guide.keyTexts?.length) {
      doc.moveDown(0.4);
      thinRule(doc, RULE, 0.5);
      doc.moveDown(1.2);
      listHeading(doc, "Key Texts");
      for (const t of guide.keyTexts) {
        doc.font("Times-Roman").fontSize(11).fillColor(INK).text(t, { lineGap: 3 });
        doc.moveDown(0.25);
      }
      doc.moveDown(0.8);
    }

    if (guide.sources?.length) {
      listHeading(doc, "Sources");
      for (const s of guide.sources) {
        doc.font("Times-Italic").fontSize(10.5).fillColor(INK)
          .text(s.title, { continued: true, lineGap: 3 })
          .font("Times-Roman").fillColor(MUTED)
          .text(`  —  ${s.author}`);
        doc.moveDown(0.25);
      }
    }
  }, { title: guide.title });
  return outPath;
}

// ---------------------------------------------------------------------------
// Sermon series
// ---------------------------------------------------------------------------

async function buildSermonSeries(series, intro) {
  const outPath = path.join(OUT_SERIES, `${series.id}.pdf`);
  await writePdf(outPath, (doc) => {
    const weeks = series.sermons?.length || 0;
    titleBlock(doc, {
      kicker: `Sermon Series · ${series.kind === "book" ? "Through a Book" : "Topical"} · ${weeks} Weeks`,
      title: series.title,
      subtitle: series.subtitle,
    });

    // Series front matter
    if (series.scriptureRange) {
      doc.font("Times-Bold").fontSize(11).fillColor(INK).text("Text. ", { continued: true })
        .font("Times-Roman").text(series.scriptureRange, { lineGap: 3 });
      doc.moveDown(0.4);
    }
    if (series.audience) {
      doc.font("Times-Bold").fontSize(11).fillColor(INK).text("Good for. ", { continued: true })
        .font("Times-Roman").text(series.audience, { lineGap: 3 });
      doc.moveDown(0.4);
    }
    if (series.bigIdea) {
      doc.font("Times-Bold").fontSize(11).fillColor(INK).text("The arc. ", { continued: true })
        .font("Times-Roman").text(series.bigIdea, { lineGap: 4 });
    }
    doc.moveDown(1.6);

    for (const sermon of series.sermons || []) {
      sectionHeading(doc, { title: `${sermon.n}. ${sermon.title}` });
      if (sermon.text) {
        doc.moveDown(-0.3);
        doc.font("Times-Italic").fontSize(10.5).fillColor(MUTED)
          .text(sermon.text, { lineGap: 3 });
        doc.moveDown(0.5);
      }
      doc.font("Times-Bold").fontSize(11).fillColor(INK).text("Big idea. ", { continued: true })
        .font("Times-Roman").text(sermon.bigIdea || "", { lineGap: 4 });
      doc.moveDown(0.4);
      doc.font("Times-Bold").fontSize(11).fillColor(INK).text("Aim. ", { continued: true })
        .font("Times-Roman").text(sermon.aim || "", { lineGap: 4 });
      doc.moveDown(0.8);
      notesLines(doc, 4);
      doc.moveDown(1.2);
    }

    // Shared guidance from the Sermon Series Library, so the PDF stands alone.
    if (intro) {
      doc.moveDown(0.4);
      thinRule(doc, RULE, 0.5);
      doc.moveDown(1.2);
      listHeading(doc, "How to Use This Series");
      bodyParagraphs(doc, intro);
    }
  }, { title: series.title });
  return outPath;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  fs.mkdirSync(OUT_CONTEXT, { recursive: true });
  fs.mkdirSync(OUT_SERIES, { recursive: true });
  fs.mkdirSync(OUT_STUDYGUIDES, { recursive: true });

  const written = [];

  if (fs.existsSync(STUDYGUIDES_DIR)) {
    const sgFiles = fs.readdirSync(STUDYGUIDES_DIR).filter((f) => f.endsWith(".json")).sort();
    for (const file of sgFiles) {
      const g = JSON.parse(fs.readFileSync(path.join(STUDYGUIDES_DIR, file), "utf8"));
      written.push(await buildStudyGuideLeader(g));
      written.push(await buildStudyGuideParticipant(g));
    }
  }

  const guideFiles = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".json")).sort();
  for (const file of guideFiles) {
    const guide = JSON.parse(fs.readFileSync(path.join(GUIDES_DIR, file), "utf8"));
    written.push(await buildContextGuide(guide));
  }

  const seriesData = JSON.parse(fs.readFileSync(SERIES_FILE, "utf8"));
  for (const series of seriesData.series || []) {
    written.push(await buildSermonSeries(series, seriesData.intro));
  }

  let total = 0;
  let smallest = Infinity;
  for (const p of written) {
    const size = fs.statSync(p).size;
    total += size;
    smallest = Math.min(smallest, size);
    console.log(`  ${(size / 1024).toFixed(1).padStart(7)} KB  ${path.relative(ROOT, p)}`);
  }
  console.log(`\n${written.length} PDFs written (${(total / 1024).toFixed(0)} KB total, smallest ${(smallest / 1024).toFixed(1)} KB).`);
}

main().catch((err) => {
  console.error("build-pdfs failed:", err);
  process.exit(1);
});
