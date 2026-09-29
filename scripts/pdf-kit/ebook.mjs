/**
 * The 6x9 ebook interior, on the print kit. Same design as the house book
 * pipeline (scripts/book-pipeline/build-interior.cjs) that set the
 * professionally typeset titles: cream pages, the house book faces
 * (Young Serif display, IBM Plex Serif text, Instrument Serif italic),
 * a title page, a copyright page, a contents page with page numbers and dot
 * leaders, chapter openers with an eyebrow and a short mustard rule, lead-in
 * small caps on each section's first paragraph, set-apart quotations, running
 * heads (book title verso, chapter title recto), and folios. On top of that
 * the kit adds what the old A5 Times drafts lacked: embedded fonts, tagged
 * structure, bookmarks, a clickable contents, and full metadata.
 *
 * Used by the scripts/build-<slug>-pdf.mjs builders; each passes its own
 * title, subtitle and epigraph and keeps its output path.
 */
import fs from "node:fs";
import path from "node:path";
import { Kit, C, smart, stripInline } from "./index.mjs";

const PT = 72;
const W = 6 * PT;
const H = 9 * PT;
const ML = 0.88 * PT;
const MR = 0.78 * PT;
const MT = 0.85 * PT;
const MB = 0.8 * PT;
const CW = W - ML - MR;
const LABEL = "#B08A12"; // --mustard-deep: the gold labels of the house design
const BODY = 10.7;

/** Parse the manuscript: front matter before the first rule, then blocks. */
export function parseManuscript(md) {
  const hr = md.indexOf("\n---\n");
  const body = (hr >= 0 ? md.slice(hr + 5) : md).trim();
  const chapters = [];
  let cur = null;
  for (const raw of body.split(/\n\s*\n/)) {
    const t = raw.trim();
    if (!t || t === "---") continue;
    if (t.startsWith("## ")) {
      const head = t.slice(3).trim();
      const m = head.match(/^((?:Chapter|Week|Part|Day)\s+[\w-]+|Introduction|Conclusion|Epilogue|Prologue|Afterword|Postscript)\s*:\s*(.+)$/i);
      cur = { eyebrow: m ? m[1] : null, title: m ? m[2] : head, blocks: [] };
      chapters.push(cur);
      continue;
    }
    if (!cur) {
      cur = { eyebrow: null, title: "", blocks: [] };
      chapters.push(cur);
    }
    if (/^#{3,}\s/.test(t)) cur.blocks.push({ type: "h2", text: t.replace(/^#+\s*/, "") });
    else if (t.startsWith(">")) {
      const lines = t.split("\n").map((l) => l.replace(/^>\s?/, "").trim());
      let ref = null;
      if (lines.length > 1 && /^[—–-]{1,2}\s*\S/.test(lines[lines.length - 1])) ref = lines.pop().replace(/^[—–-]{1,2}\s*/, "");
      cur.blocks.push({ type: ref ? "q" : "pull", text: lines.join(" ").replace(/\*/g, ""), ref });
    } else if (/^\*[^*].*\*$/.test(t) && t.length < 120 && !t.includes("\n")) cur.blocks.push({ type: "ref", text: t.replace(/^\*|\*$/g, "") });
    else cur.blocks.push({ type: "p", text: t.replace(/\s*\n\s*/g, " ") });
  }
  return chapters;
}

export async function buildEbook({ src, out, title, subtitle, author = "James Bell", epigraph, epigraphBy, subject, keywords = [] }) {
  const md = fs.readFileSync(src, "utf8");
  const chapters = parseManuscript(md);
  const k = new Kit({
    title: subtitle ? `${title}: ${subtitle}` : title,
    subject: subject || subtitle || title,
    keywords: ["James Bell", "LiveWell", title, ...keywords],
    size: "6x9",
    margins: { top: MT, bottom: MB, left: ML, right: MR },
    chrome: false,
    bodyFamily: "book",
    pageBackground: C.cream,
  });
  const d = k.doc;
  const ctr = (text, role, size, color, extra = {}) =>
    d.font(role).fontSize(size).fillColor(color).text(smart(text), ML, extra.y != null ? extra.y : d.y, { width: CW, align: "center", ...extra, y: undefined });
  const rule = (y, half, w = 1.5) =>
    k.artifact(() => d.save().lineWidth(w).strokeColor(C.mustard).moveTo(W / 2 - half, y).lineTo(W / 2 + half, y).stroke().restore());

  // ---- Title page
  k.bookmark(title, 0);
  d.y = 2.7 * PT;
  const titleSize = title.length > 28 ? 26 : title.length > 18 ? 30 : 34;
  k.tag("H1", () => ctr(title, "bookDisplay", titleSize, C.black));
  if (subtitle) {
    d.y += 10;
    k.tag("P", () => ctr(subtitle, "bookDisplayItalic", 14.5, C.ink));
  }
  d.y = H - 2.5 * PT;
  rule(d.y, 30);
  d.y += 12;
  k.tag("P", () => ctr(author.toUpperCase(), "bookBold", 12.5, C.black, { characterSpacing: 2.5 }));

  // ---- Copyright
  k.newPage();
  d.y = H - 3.6 * PT;
  k.tag("P", () =>
    d.font("bookBody").fontSize(9).fillColor(C.muted).text(
      `${title}\n\nCopyright © 2026 by ${author}. All rights reserved. No part of this book may be reproduced in any form without written permission, except for brief quotations in reviews.\n\nPublished by LiveWell by James Bell.  livewellbyjamesbell.co\n\nUnless otherwise noted, Scripture quotations are from the English Standard Version (ESV).`,
      ML, d.y, { width: CW, lineGap: 2.5 }
    )
  );

  // ---- Epigraph
  if (epigraph) {
    k.newPage();
      d.y = 2.6 * PT;
    k.tag("BlockQuote", () => ctr(epigraph, "bookDisplayItalic", 15, C.ink, { lineGap: 2.5 }));
    if (epigraphBy) {
      d.y += 12;
      k.tag("P", () => ctr(epigraphBy.toUpperCase(), "bookBold", 8, C.muted, { characterSpacing: 1.4 }));
    }
  }

  // ---- Contents (page numbers filled in after the body is set)
  k.newPage();
  k.bookmark("Contents", 1);
  d.y = 2.0 * PT;
  k.tag("H2", () => ctr("Contents", "bookDisplay", 26, C.black));
  d.y += 8;
  rule(d.y, 26);
  d.y += 22;
  const tocRefs = [];
  chapters.forEach((ch, ci) => {
    if (!ch.title) return;
    if (d.y > H - MB - 0.6 * PT) {
      k.newPage();
          d.y = MT + 0.2 * PT;
    }
    const y = d.y;
    const pageIndex = k.pageIndex;
    k.tag("TOCI", () => {
      if (ch.eyebrow) {
        d.font("bookBody").fontSize(10.3).fillColor(C.black).text(smart(ch.eyebrow), ML, y, { width: CW * 0.62, lineBreak: false, goTo: `ch-${ci}` });
        d.font("bookBody").fontSize(10.3).fillColor(C.ink).text(smart(ch.title), ML + 0.16 * PT, y + 14, { width: CW - 0.16 * PT - 0.5 * PT, goTo: `ch-${ci}` });
      } else {
        d.font("bookBody").fontSize(10.3).fillColor(C.black).text(smart(ch.title), ML, y, { width: CW - 0.5 * PT, goTo: `ch-${ci}` });
      }
    });
    tocRefs.push({ pageIndex, y, ci });
    d.y += 7;
  });
  const bodyStart = k.pageIndex + 1;

  // ---- Body
  const chapStart = []; // {pageIndex, title}
  const para = (text, first) => {
    const clean = smart(text);
    if (first) {
      const words = clean.split(" ");
      const n = Math.min(4, words.length);
      const lead = stripInline(words.slice(0, n).join(" ")).toUpperCase();
      const rest = words.slice(n).join(" ");
      k.tag("P", () => k.rich(`**${lead} **${rest}`, { raw: true, family: "book", size: BODY, align: "justify", gap: 2.6, color: C.black }));
      d.y += 2;
    } else {
      k.tag("P", () => k.rich(clean, { raw: true, family: "book", size: BODY, align: "justify", gap: 2.6, indent: 15, color: C.black }));
      d.y += 1.5;
    }
  };
  chapters.forEach((ch, ci) => {
    k.newPage();
    chapStart.push({ pageIndex: k.pageIndex, title: ch.title || title });
    d.addNamedDestination(`ch-${ci}`);
    if (ch.title) k.bookmark(ch.eyebrow ? `${ch.eyebrow}: ${ch.title}` : ch.title, 1);
    d.y = MT + 1.4 * PT;
    k.group("Sect", () => {
      if (ch.eyebrow) {
        k.tag("P", () => d.font("bookBold").fontSize(10).fillColor(LABEL).text(smart(ch.eyebrow).toUpperCase(), ML, d.y, { width: CW, align: "center", characterSpacing: 3.5 }));
        d.y += 6;
      }
      if (ch.title) {
        k.tag("H1", () => d.font("bookDisplay").fontSize(25).fillColor(C.black).text(smart(ch.title), ML, d.y, { width: CW, align: "center", lineGap: 1 }));
        d.y += 6;
        rule(d.y, 22);
        d.y += 20;
      }
      let first = true;
      for (const b of ch.blocks) {
        if (b.type === "p") {
          para(b.text, first);
          first = false;
        } else if (b.type === "ref") {
          k.tag("P", () => d.font("bookDisplayItalic").fontSize(13).fillColor(C.ink).text(smart(b.text), ML, d.y, { width: CW, align: "center" }));
          d.y += 12;
          first = true;
        } else if (b.type === "h2") {
          d.y += 14;
          k.ensure(70);
          k.tag("H2", () => d.font("bookBold").fontSize(10.5).fillColor(LABEL).text(smart(stripInline(b.text)).toUpperCase(), ML, d.y, { width: CW, characterSpacing: 2.2, lineGap: 1.5 }));
          d.y += 8;
          first = true;
        } else if (b.type === "pull") {
          d.y += 10;
          k.ensure(90);
          rule(d.y, 26);
          d.y += 12;
          k.tag("BlockQuote", () => d.font("bookDisplayItalic").fontSize(17).fillColor(C.black).text(smart(b.text), ML + 0.5 * PT, d.y, { width: CW - PT, align: "center", lineGap: 2.5 }));
          d.y += 8;
          rule(d.y, 26);
          d.y += 16;
          first = true;
        } else if (b.type === "q") {
          d.y += 8;
          const qx = ML + 0.5 * PT;
          const qw = CW - PT;
          d.font("bookDisplayItalic").fontSize(11.8);
          const h = d.heightOfString(smart(b.text), { width: qw, lineGap: 2.2 });
          k.ensure(Math.min(h, 200) + 24);
          const sy = d.y;
          k.tag("BlockQuote", () => d.font("bookDisplayItalic").fontSize(11.8).fillColor(C.ink).text(smart(b.text), qx, sy, { width: qw, lineGap: 2.2 }));
          const ey = d.y;
          if (ey > sy) k.artifact(() => d.save().lineWidth(2.5).strokeColor(C.mustard).moveTo(ML + 0.26 * PT, sy + 1).lineTo(ML + 0.26 * PT, ey - 1).stroke().restore());
          d.y += 3;
          if (b.ref) k.tag("P", () => d.font("bookBold").fontSize(8).fillColor(C.muted).text(smart(b.ref).toUpperCase(), qx, d.y, { width: qw, characterSpacing: 1.4 }));
          d.y += 12;
          first = true;
        }
      }
    });
  });

  // ---- Running heads, folios, contents page numbers
  const last = d.bufferedPageRange().count - 1;
  const openers = new Set(chapStart.map((c) => c.pageIndex));
  const titleFor = (p) => {
    let t = title;
    for (const c of chapStart) if (c.pageIndex <= p) t = c.title;
    return t;
  };
  for (let p = bodyStart; p <= last; p++) {
    d.switchToPage(p);
    d.page.margins = { top: 0, bottom: 0, left: ML, right: MR };
    const folio = p - bodyStart + 1;
    k.artifact(() => {
      d.font("bookBody").fontSize(9).fillColor(C.muted).text(String(folio), ML, H - MB + 10, { width: CW, align: "center", lineBreak: false });
      if (!openers.has(p)) {
        const verso = folio % 2 === 0;
        const txt = (verso ? title : titleFor(p)).toUpperCase();
        d.font("bookBold").fontSize(7.5).fillColor(C.muted).text(txt, ML, MT - 22, { width: CW, align: verso ? "left" : "right", characterSpacing: 2, lineBreak: false, height: 10, ellipsis: true });
      }
    }, "Pagination");
  }
  const chapPage = new Map(chapStart.map((c, ci) => [ci, c.pageIndex]));
  for (const r of tocRefs) {
    d.switchToPage(r.pageIndex);
    d.page.margins = { top: 0, bottom: 0, left: ML, right: MR };
    const folio = chapPage.get(r.ci) - bodyStart + 1;
    k.artifact(() => {
      d.font("bookBody").fontSize(10.3).fillColor(C.muted).text(String(folio), W - MR - 0.4 * PT, r.y, { width: 0.4 * PT, align: "right", lineBreak: false });
      d.save().fillColor("#C9C0AD");
      const numX = W - MR - 0.3 * PT;
      for (let x = ML + CW * 0.66; x < numX - 0.18 * PT; x += 5) d.circle(x, r.y + 7, 0.6).fill();
      d.restore();
    });
  }

  fs.mkdirSync(path.dirname(out), { recursive: true });
  const res = await k.save(out);
  console.log(`${title}: ${res.pages} pages, ${(res.bytes / 1024).toFixed(0)} KB -> ${path.relative(process.cwd(), out)}`);
  return res;
}
