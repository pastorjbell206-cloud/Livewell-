/**
 * pdf-kit — the shared print kit for every PDF the site ships.
 *
 * One place for the things every printable needs, so no builder hand-rolls
 * them again:
 *
 *   - the brand faces, embedded (not the pdfkit Times fallback): Cormorant
 *     Garamond for display, Source Serif 4 for long-form text (the site's
 *     --font-text reading face), Inter for labels and short-form body, and
 *     JetBrains Mono for data labels. Static TTF instances live in ./fonts
 *     (OFL; licences beside them). They were cut from the Google Fonts
 *     variable masters at wght 400/500/600 (Inter and Source Serif at their
 *     text optical size) and subset to Latin, Latin Extended, Greek and
 *     general punctuation, which covers every character in the content.
 *   - the palette: ink on white paper for anything meant to be printed at
 *     home, cream for covers, mustard only as a thin rule or a small label.
 *   - document metadata (Title, Author "James Bell", Subject, Keywords), the
 *     en-US language tag, PDF 1.7, DisplayDocTitle, and tagged output: every
 *     heading, paragraph, list item and link goes into the structure tree;
 *     running heads, folios, rules and backgrounds are marked as artifacts.
 *   - running heads, page numbers, a cover page, bookmarks (the PDF outline),
 *     clickable links, and a per-page note band (used by the care-plan
 *     workbooks for the path-to-help box).
 *
 * Usage:
 *   const kit = new Kit({ title, subject, keywords, size: "letter" });
 *   kit.cover({ kicker, title, subtitle });
 *   kit.h1("Session one", { bookmark: true });
 *   kit.p("Body text with *italic*, **bold** and [a link](/writing/x).");
 *   const { pages, bytes } = await kit.save("client/public/downloads/x.pdf");
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIR = path.join(HERE, "fonts");
const BOOK_FONT_DIR = path.join(HERE, "..", "book-pipeline", "fonts");

export const SITE = "https://www.livewellbyjamesbell.co";
export const DOMAIN = "livewellbyjamesbell.co";
export const TAGLINE = "Connecting the depth of theology to the weight of everyday life.";

/** Brand colours (the :root tokens in client/src/index.css), print subset. */
export const C = {
  ink: "#14110C",
  black: "#1A1A1A",
  cream: "#F5F0E6",
  creamWarm: "#EDE8DC",
  mustard: "#D4A017", // rules and small marks only
  mustardText: "#7A6010", // --mustard-text: the mustard that can carry text
  muted: "#5A5448",
  rule: "#D9D3C4", // --bone-muted hairline
  white: "#FFFFFF",
};

export const SIZES = {
  letter: [612, 792],
  a4: [595.28, 841.89],
  tabloid: [792, 1224], // 11 x 17
  "6x9": [432, 648],
};

// Fixed timestamp so identical content yields byte-identical PDFs.
export const FIXED_DATE = new Date("2026-01-01T00:00:00Z");

// Font buffers are read once per process and handed to every document.
const FONT_FILES = {
  display: [FONT_DIR, "CormorantGaramond-Regular.ttf"],
  displayMedium: [FONT_DIR, "CormorantGaramond-Medium.ttf"],
  displayItalic: [FONT_DIR, "CormorantGaramond-Italic.ttf"],
  serif: [FONT_DIR, "SourceSerif4-Regular.ttf"],
  serifBold: [FONT_DIR, "SourceSerif4-SemiBold.ttf"],
  serifItalic: [FONT_DIR, "SourceSerif4-Italic.ttf"],
  sans: [FONT_DIR, "Inter-Regular.ttf"],
  sansMedium: [FONT_DIR, "Inter-Medium.ttf"],
  sansBold: [FONT_DIR, "Inter-SemiBold.ttf"],
  sansItalic: [FONT_DIR, "Inter-Italic.ttf"],
  mono: [FONT_DIR, "JetBrainsMono-Regular.ttf"],
  // The house book faces (scripts/book-pipeline/fonts), for the 6x9 ebooks so
  // the whole paid catalogue reads as one design.
  bookBody: [BOOK_FONT_DIR, "IBMPlexSerif-Regular.ttf"],
  bookBold: [BOOK_FONT_DIR, "IBMPlexSerif-Bold.ttf"],
  bookItalic: [BOOK_FONT_DIR, "IBMPlexSerif-Italic.ttf"],
  bookDisplay: [BOOK_FONT_DIR, "YoungSerif-Regular.ttf"],
  bookDisplayItalic: [BOOK_FONT_DIR, "InstrumentSerif-Italic.ttf"],
};
const fontCache = new Map();
function fontBuffer(role) {
  if (!fontCache.has(role)) {
    const [dir, file] = FONT_FILES[role];
    fontCache.set(role, fs.readFileSync(path.join(dir, file)));
  }
  return fontCache.get(role);
}

// Parsing a font with fontkit costs more than laying out a one-page sheet, so
// each face is parsed once per process and shared: every document gets its
// own pdfkit EmbeddedFont (its own subset) over the same parsed font.
const parsed = new Map();
const layoutCaches = new Map();
let EmbeddedFont = null;
function sharedFont(role) {
  if (!parsed.has(role)) {
    const boot = new PDFDocument({ autoFirstPage: false });
    boot.font(fontBuffer(role));
    parsed.set(role, boot._font.font);
    EmbeddedFont = boot._font.constructor;
  }
  return parsed.get(role);
}

/** Text families: which roles make up roman / bold / italic for rich text. */
const FAMILIES = {
  serif: { r: "serif", b: "serifBold", i: "serifItalic", bi: "serifBold" },
  sans: { r: "sans", b: "sansBold", i: "sansItalic", bi: "sansBold" },
  display: { r: "display", b: "displayMedium", i: "displayItalic", bi: "displayItalic" },
  book: { r: "bookBody", b: "bookBold", i: "bookItalic", bi: "bookBold" },
};

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

/** Curly quotes and apostrophes. Leaves dashes alone (no em-dash injection). */
export function smart(s) {
  if (s == null) return "";
  return String(s)
    .replace(/(^|[\s([{—–/-])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/(\w)'(\w)/g, "$1’$2")
    .replace(/(^|[\s([{—–/-])'/g, "$1‘")
    .replace(/'/g, "’");
}

/** The first sentence of a passage (used for pull quotes). */
export function firstSentence(s) {
  const t = String(s || "").trim();
  const m = t.match(/^[\s\S]*?[.?!](?=["”’)]?\s|["”’)]?$)["”’)]?/);
  return (m ? m[0] : t).trim();
}

/** Site-relative href -> absolute URL on the canonical host. */
export function absUrl(href) {
  if (!href) return SITE;
  if (/^(https?:|mailto:|tel:)/.test(href)) return href;
  return SITE + (href.startsWith("/") ? href : "/" + href);
}

/**
 * Parse inline markdown into runs: **bold**, *italic* / _italic_, [label](url).
 * Anything else is literal. Nesting is shallow on purpose (the content uses
 * nothing deeper).
 */
export function inlineRuns(src) {
  const runs = [];
  const s = String(src ?? "");
  const re = /\*\*([^*]+)\*\*|\*([^*\n]+)\*|(?<![\w])_([^_\n]+)_(?![\w])|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(s))) {
    if (m.index > last) runs.push({ text: s.slice(last, m.index) });
    if (m[1] != null) runs.push({ text: m[1], bold: true });
    else if (m[2] != null) runs.push({ text: m[2], italic: true });
    else if (m[3] != null) runs.push({ text: m[3], italic: true });
    else runs.push({ text: m[4].replace(/\*/g, ""), link: absUrl(m[5]) });
    last = re.lastIndex;
  }
  if (last < s.length) runs.push({ text: s.slice(last) });
  return runs.filter((r) => r.text.length);
}

export function stripInline(s) {
  return inlineRuns(s).map((r) => r.text).join("");
}

// ---------------------------------------------------------------------------
// The Kit
// ---------------------------------------------------------------------------

export class Kit {
  /**
   * @param {object} o
   * @param {string} o.title       document title (metadata + running head)
   * @param {string} [o.subject]   one-line description (metadata)
   * @param {string[]|string} [o.keywords]
   * @param {"letter"|"a4"|"tabloid"|"6x9"|number[]} [o.size]
   * @param {"portrait"|"landscape"} [o.layout]
   * @param {object} [o.margins]   {top,bottom,left,right}
   * @param {string} [o.runningHead] short title for the running head
   * @param {boolean} [o.chrome]   running heads + folios (default true)
   * @param {{text:string,height:number}} [o.pageNote] band above the footer
   * @param {string} [o.pageBackground] fill every page (ebooks)
   * @param {"serif"|"sans"|"book"} [o.bodyFamily]
   */
  constructor(o) {
    this.o = o;
    const size = Array.isArray(o.size) ? o.size : SIZES[o.size || "letter"];
    this.pageNote = o.pageNote || null;
    const noteH = this.pageNote ? this.pageNote.height + 14 : 0;
    const margins = {
      top: 76,
      bottom: 78 + noteH,
      left: 96,
      right: 96,
      ...(o.margins || {}),
    };
    if (o.margins && o.margins.bottom != null) margins.bottom = o.margins.bottom + noteH;
    const keywords = Array.isArray(o.keywords) ? o.keywords.join(", ") : o.keywords || "";
    this.doc = new PDFDocument({
      size,
      layout: o.layout || "portrait",
      margins,
      bufferPages: true,
      autoFirstPage: false,
      pdfVersion: "1.7",
      tagged: true,
      lang: "en-US",
      displayTitle: true,
      info: {
        Title: o.title,
        Author: "James Bell",
        Subject: o.subject || o.title,
        Keywords: keywords,
        Creator: "LiveWell by James Bell",
        Producer: "LiveWell print kit (pdfkit)",
        CreationDate: FIXED_DATE,
        ModDate: FIXED_DATE,
      },
    });
    const doc = this.doc;
    for (const role of Object.keys(FONT_FILES)) {
      if (role.startsWith("book") && o.bodyFamily !== "book") continue;
      const font = sharedFont(role);
      // doc.font(role) finds this by name; it embeds only if drawn with.
      const ef = new EmbeddedFont(doc, font, `F${++doc._fontCount}`);
      // Word layouts (glyph runs, already scaled) are pure functions of the
      // face, so one cache per face serves every document in the process.
      if (!layoutCaches.has(role)) layoutCaches.set(role, Object.create(null));
      ef.layoutCache = layoutCaches.get(role);
      doc._fontFamilies[role] = ef;
    }
    this.family = o.bodyFamily || "serif";
    this.bodySize = o.bodySize || (this.family === "sans" ? 10 : 10.75);
    this.leading = o.leading || 1.55;
    this.noChrome = new Set(); // page indexes without running head / folio
    this.noNote = new Set(); // page indexes without the note band
    this.noHead = new Set(); // page indexes with a folio but no running head
    this.outlineStack = [];
    this.runningHead = o.runningHead || o.title;
    this.pageHeads = new Map(); // page index -> running-head override
    doc.on("pageAdded", () => this._onPage());
    this.root = doc.struct("Document");
    doc.addStructure(this.root);
    this.stack = [this.root];
    doc.addPage();
  }

  // ---- geometry ----------------------------------------------------------
  get page() { return this.doc.page; }
  get left() { return this.doc.page.margins.left; }
  get right() { return this.doc.page.width - this.doc.page.margins.right; }
  get width() { return this.right - this.left; }
  get top() { return this.doc.page.margins.top; }
  get bottom() { return this.doc.page.height - this.doc.page.margins.bottom; }
  get pageIndex() { return this.doc.bufferedPageRange().count - 1; }
  get y() { return this.doc.y; }
  set y(v) { this.doc.y = v; }
  room() { return this.bottom - this.doc.y; }

  _onPage() {
    this.pageHeads.set(this.doc.bufferedPageRange().count - 1, this.runningHead);
    if (this.o.pageBackground) {
      const d = this.doc;
      // Text that overflows onto this page keeps pdfkit's current fill colour,
      // so put it back after painting the background.
      const prev = d._fillColor;
      this.artifact(() => {
        d.save().rect(0, 0, d.page.width, d.page.height).fill(this.o.pageBackground).restore();
      }, "Background");
      if (prev) d.fillColor(prev[0], prev[1]);
    }
  }

  newPage(opts) {
    this.doc.addPage(opts);
    return this;
  }
  /** New page unless fewer than `needed` points are free below the cursor. */
  ensure(needed) {
    if (this.doc.y + needed > this.bottom) this.newPage();
    return this;
  }
  space(pt = 10) {
    this.doc.y += pt;
    return this;
  }
  hideChrome(pageIndex = this.pageIndex) {
    this.noChrome.add(pageIndex);
    this.noNote.add(pageIndex);
  }
  /** Keep the folio, drop the running head (title pages that open a piece). */
  hideHead(pageIndex = this.pageIndex) {
    this.noHead.add(pageIndex);
  }
  setRunningHead(text) {
    this.runningHead = text;
    if (this.doc.page) this.pageHeads.set(this.pageIndex, text);
  }

  // ---- structure ---------------------------------------------------------
  /** A leaf structure element (H1, P, LI...) whose content `fn` draws. */
  tag(type, fn, opts = {}) {
    const parent = this.stack[this.stack.length - 1];
    parent.add(this.doc.struct(type, opts, fn));
    return this;
  }
  /** A container structure element (Sect, L, Table...) around `fn`. */
  group(type, fn, opts = {}) {
    const parent = this.stack[this.stack.length - 1];
    const el = this.doc.struct(type, opts);
    parent.add(el);
    this.stack.push(el);
    try {
      fn(el);
    } finally {
      this.stack.pop();
      el.end();
    }
    return this;
  }
  /** Decoration that is not content: rules, fills, running heads. */
  artifact(fn, type = "Layout") {
    this.doc.markContent("Artifact", { type });
    try {
      fn();
    } finally {
      this.doc.endMarkedContent();
    }
    return this;
  }

  // ---- fonts -------------------------------------------------------------
  font(role, size) {
    this.doc.font(role);
    if (size) this.doc.fontSize(size);
    return this.doc;
  }
  /** lineGap that turns `size` into the requested leading for `role`. */
  gap(role, size, leading = this.leading) {
    this.doc.font(role).fontSize(size);
    return Math.max(0, size * leading - this.doc.currentLineHeight(false));
  }

  // ---- bookmarks ---------------------------------------------------------
  /** Add a PDF outline entry at the current page. level 0 = top. */
  bookmark(title, level = 0) {
    const t = stripInline(smart(title));
    const parent = level === 0 ? this.doc.outline : this.outlineStack[level - 1] || this.doc.outline;
    const item = parent.addItem(t);
    this.outlineStack[level] = item;
    this.outlineStack.length = level + 1;
    return item;
  }

  // ---- rich text ---------------------------------------------------------
  /**
   * Draw inline-markdown text as one flowing paragraph.
   * opts: family, size, color, align, indent, width, x, leading, italic, gap
   */
  rich(text, opts = {}) {
    const d = this.doc;
    const fam = FAMILIES[opts.family || this.family];
    const size = opts.size || this.bodySize;
    const color = opts.color || C.ink;
    const runs = inlineRuns(opts.raw ? text : smart(text));
    if (!runs.length) return this;
    const lineGap = opts.gap != null ? opts.gap : this.gap(fam.r, size, opts.leading);
    const x = opts.x != null ? opts.x : this.left;
    const width = opts.width || this.right - x;
    const base = {
      width,
      align: opts.align || "left",
      lineGap,
      indent: opts.indent || 0,
      characterSpacing: opts.characterSpacing || 0,
      paragraphGap: 0,
    };
    runs.forEach((r, i) => {
      const role = r.bold && (r.italic || opts.italic) ? fam.bi : r.bold ? fam.b : r.italic || opts.italic ? fam.i : fam.r;
      // Italic inside an italic paragraph flips back to roman.
      const roleFinal = opts.italic && r.italic && !r.bold ? fam.r : role;
      d.font(roleFinal).fontSize(size).fillColor(r.link ? opts.linkColor || C.mustardText : color);
      const o = { ...base, continued: i < runs.length - 1, link: r.link || null, underline: false };
      if (i === 0) d.text(r.text, x, d.y, o);
      else d.text(r.text, o);
    });
    return this;
  }

  // ---- blocks ------------------------------------------------------------
  /** Paragraph (tagged P). */
  p(text, opts = {}) {
    if (text == null || text === "") return this;
    const after = opts.after != null ? opts.after : (opts.size || this.bodySize) * 0.8;
    this.tag(opts.tag || "P", () => this.rich(text, opts));
    this.doc.y += after;
    return this;
  }
  /** Several paragraphs from a "\n\n"-separated string. */
  paras(body, opts = {}) {
    if (!body || typeof body !== "string") return this;
    for (const para of body.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)) {
      this.p(para.replace(/\n/g, " "), opts);
    }
    return this;
  }

  /** Small uppercase tracked label (Inter Medium, mustard-text). */
  eyebrow(text, opts = {}) {
    if (!text) return this;
    const d = this.doc;
    const size = opts.size || 7.5;
    this.tag(opts.tag || "P", () => {
      d.font("sansMedium").fontSize(size).fillColor(opts.color || C.mustardText)
        .text(smart(String(text)).toUpperCase(), opts.x != null ? opts.x : this.left, d.y, {
          width: opts.width || this.right - (opts.x != null ? opts.x : this.left),
          align: opts.align || "left",
          characterSpacing: size * 0.18,
          lineGap: 2,
        });
    });
    d.y += opts.after != null ? opts.after : 6;
    return this;
  }

  /** Display heading in Cormorant Garamond. level 1..3. */
  heading(text, opts = {}) {
    const d = this.doc;
    const level = opts.level || 1;
    const size = opts.size || [0, 28, 20, 15][level];
    const role = level >= 3 ? "displayMedium" : "display";
    const t = smart(stripInline(text));
    d.font(role).fontSize(size);
    const h = d.heightOfString(t, { width: opts.width || this.width, lineGap: size * 0.08 });
    if (opts.keep !== false) this.ensure(h + (opts.keepWith != null ? opts.keepWith : 70));
    if (opts.bookmark) this.bookmark(opts.bookmarkTitle || t, opts.bookmarkLevel != null ? opts.bookmarkLevel : Math.max(0, level - 1));
    this.tag("H" + level, () => {
      d.font(role).fontSize(size).fillColor(opts.color || C.ink)
        .text(t, opts.x != null ? opts.x : this.left, d.y, {
          width: opts.width || this.width,
          align: opts.align || "left",
          lineGap: size * 0.08,
          characterSpacing: -0.02 * size * (level === 1 ? 1 : 0.5),
        });
    });
    d.y += opts.after != null ? opts.after : size * 0.45;
    return this;
  }
  h1(text, opts = {}) { return this.heading(text, { ...opts, level: 1 }); }
  h2(text, opts = {}) { return this.heading(text, { ...opts, level: 2 }); }
  h3(text, opts = {}) { return this.heading(text, { ...opts, level: 3 }); }

  /** Eyebrow + heading, kept together. */
  titled(kicker, title, opts = {}) {
    this.ensure(opts.keep || 120);
    if (kicker) this.eyebrow(kicker, { after: 5 });
    return this.heading(title, { keep: false, ...opts });
  }

  /** A short hairline rule (mustard by default), as an artifact. */
  rule(opts = {}) {
    const d = this.doc;
    const len = opts.length != null ? opts.length : 36;
    const x = opts.x != null ? opts.x : opts.center ? (d.page.width - len) / 2 : this.left;
    const y = opts.y != null ? opts.y : d.y;
    this.artifact(() => {
      d.save().lineWidth(opts.width || 1.2).strokeColor(opts.color || C.mustard)
        .moveTo(x, y).lineTo(x + len, y).stroke().restore();
    });
    if (opts.y == null) d.y = y + (opts.after != null ? opts.after : 12);
    return this;
  }
  /** Full-width hairline in the neutral rule colour. */
  hairline(opts = {}) {
    return this.rule({ length: opts.length || this.width, color: C.rule, width: 0.6, ...opts });
  }

  /** A set-apart quotation (Scripture or source) with an optional reference. */
  quote(text, ref, opts = {}) {
    const d = this.doc;
    const indent = opts.indent != null ? opts.indent : 18;
    const size = opts.size || this.bodySize + 2.5;
    const x = this.left + indent;
    const width = this.width - indent - (opts.rightIndent || 0);
    const fam = opts.family || "display";
    d.font(FAMILIES[fam].i).fontSize(size);
    const t = smart(text);
    const h = d.heightOfString(stripInline(t), { width, lineGap: this.gap(FAMILIES[fam].i, size, 1.4) });
    this.ensure(Math.min(h, 120) + 20);
    const y0 = d.y;
    this.tag("BlockQuote", () => this.rich(t, { raw: true, family: fam, italic: true, size, x, width, leading: 1.4, color: opts.color || C.ink }));
    const y1 = d.y;
    if (d.page === this.page && y1 > y0) {
      this.artifact(() => {
        d.save().lineWidth(1.5).strokeColor(C.mustard).moveTo(this.left + 2, y0 + 2).lineTo(this.left + 2, y1 - 2).stroke().restore();
      });
    }
    if (ref) {
      d.y += 3;
      this.tag("P", () => {
        d.font("sansMedium").fontSize(7.5).fillColor(C.muted)
          .text(String(ref).toUpperCase(), x, d.y, { width, characterSpacing: 1.1 });
      });
    }
    d.y += opts.after != null ? opts.after : 12;
    return this;
  }

  /** Label + body pair ("Aim", "Practice"...). */
  labelled(label, text, opts = {}) {
    if (!text) return this;
    this.ensure(opts.keep || 54);
    this.eyebrow(label, { after: 3, color: opts.labelColor });
    return this.p(text, opts);
  }

  /** A list; items are inline-markdown strings. */
  list(items, opts = {}) {
    const d = this.doc;
    const size = opts.size || this.bodySize;
    const fam = FAMILIES[opts.family || this.family];
    const indent = opts.indent != null ? opts.indent : 18;
    this.group("L", () => {
      items.forEach((item, i) => {
        const label = opts.numbered ? `${i + 1}.` : opts.marker ?? "•";
        d.font(fam.r).fontSize(size);
        const h = d.heightOfString(stripInline(smart(item)), { width: this.width - indent, lineGap: this.gap(fam.r, size) });
        this.ensure(Math.min(h, 60) + 4);
        this.group("LI", () => {
          const y = d.y;
          if (label && indent > 6) this.tag("Lbl", () => {
            d.font(opts.numbered ? fam.b : fam.r).fontSize(size).fillColor(opts.markerColor || C.mustardText)
              .text(label, this.left, y, { width: indent - 4, lineBreak: false });
          });
          d.y = y;
          this.tag("LBody", () => this.rich(item, { ...opts, x: this.left + indent, width: this.width - indent }));
        });
        d.y += opts.itemGap != null ? opts.itemGap : size * 0.45;
      });
    });
    d.y += opts.after != null ? opts.after : 6;
    return this;
  }

  /** A clickable link on its own line (tagged Link). */
  linkLine(label, href, opts = {}) {
    const d = this.doc;
    const url = absUrl(href);
    this.tag("Link", () => {
      d.font(opts.role || "sansMedium").fontSize(opts.size || 8.5).fillColor(opts.color || C.mustardText)
        .text(smart(label), opts.x != null ? opts.x : this.left, d.y, { width: opts.width || this.width, link: url, align: opts.align || "left", characterSpacing: opts.characterSpacing || 0 });
    });
    d.y += opts.after != null ? opts.after : 6;
    return this;
  }

  /** Ruled writing lines. */
  lines(count, opts = {}) {
    const d = this.doc;
    const lh = opts.lineHeight || 22;
    this.ensure(count * lh + 8);
    const x0 = opts.x != null ? opts.x : this.left;
    const x1 = opts.width ? x0 + opts.width : this.right;
    let y = d.y + lh - 4;
    this.artifact(() => {
      d.save().lineWidth(0.5).strokeColor(C.rule);
      for (let i = 0; i < count; i++) {
        d.moveTo(x0, y).lineTo(x1, y).stroke();
        y += lh;
      }
      d.restore();
    });
    d.y = y - lh + 10;
    return this;
  }

  /** An empty checkbox at (x, y). */
  checkbox(x, y, s = 9) {
    const d = this.doc;
    this.artifact(() => {
      d.save().lineWidth(0.7).strokeColor(C.muted).rect(x, y, s, s).stroke().restore();
    });
    return this;
  }

  /**
   * A boxed panel. `fn` draws inside it. A fill needs `height` (measured by
   * the caller) because pdfkit cannot paint behind content already drawn;
   * borders and the mustard accent bar are drawn after, at the real height.
   * The panel never splits: when `height` will not fit, it starts a new page.
   */
  panel(fn, opts = {}) {
    const d = this.doc;
    const pad = opts.padding != null ? opts.padding : 14;
    if (opts.height) this.ensure(opts.height + pad * 2);
    const x = opts.x != null ? opts.x : this.left;
    const w = opts.width || this.right - x;
    const y0 = d.y;
    const page = d.page;
    const h = opts.height || 0;
    if (opts.fill && h) {
      this.artifact(() => d.save().rect(x, y0, w, h + pad * 2).fill(opts.fill).restore());
    }
    d.y = y0 + pad;
    const inset = opts.accent ? 4 : 0;
    fn({ x: x + pad + inset, width: w - pad * 2 - inset });
    const samePage = d.page === page;
    const y1 = samePage ? Math.max(d.y, y0 + h + pad) + pad : d.y;
    if (samePage && (opts.border || opts.accent)) {
      this.artifact(() => {
        d.save();
        if (opts.border) d.lineWidth(0.6).strokeColor(opts.border).rect(x, y0, w, y1 - y0).stroke();
        if (opts.accent) d.lineWidth(2).strokeColor(C.mustard).moveTo(x + 1, y0).lineTo(x + 1, y1).stroke();
        d.restore();
      });
    }
    d.y = y1 + (opts.after != null ? opts.after : 12);
    return this;
  }

  /** Height a paragraph of `text` would take at the given size and width. */
  measure(text, opts = {}) {
    const d = this.doc;
    const fam = FAMILIES[opts.family || this.family];
    const size = opts.size || this.bodySize;
    d.font(opts.italic ? fam.i : fam.r).fontSize(size);
    return d.heightOfString(stripInline(smart(text)), { width: opts.width || this.width, lineGap: this.gap(fam.r, size, opts.leading) });
  }

  // ---- cover -------------------------------------------------------------
  /**
   * Cover page on cream. Draws on the current page (which must be empty),
   * bookmarks it, suppresses its chrome, and starts a fresh page after.
   */
  cover({ kicker, title, subtitle, note, meta, bleed = true, breakAfter = true } = {}) {
    const d = this.doc;
    const W = d.page.width;
    const H = d.page.height;
    const L = Math.max(72, W * 0.12);
    const cw = W - L * 2;
    const savedBottom = d.page.margins.bottom;
    d.page.margins.bottom = 24; // the foot block sits inside the usual margin
    this.hideChrome();
    // A page note (the care plans' path-to-help band) stays on the cover too.
    const noteLift = this.pageNote ? this.pageNote.height + 14 : 0;
    if (this.pageNote) this.noNote.delete(this.pageIndex);
    if (bleed) this.artifact(() => d.save().rect(0, 0, W, H).fill(C.cream).restore(), "Background");
    // Wordmark
    this.artifact(() => {
      d.font("display").fontSize(19).fillColor(C.ink).text("LiveWell", L, 64, { lineBreak: false });
      const ww = d.widthOfString("LiveWell");
      d.font("sansMedium").fontSize(6.8).fillColor(C.muted)
        .text("BY JAMES BELL", L + ww + 8, 72, { lineBreak: false, characterSpacing: 1.3 });
      d.save().lineWidth(0.6).strokeColor(C.ink).opacity(0.14).moveTo(L, 96).lineTo(W - L, 96).stroke().restore();
    });
    // Title block in the lower-middle of the page: weight by size, not bold.
    const titleSize = title.length > 60 ? 32 : title.length > 34 ? 38 : 46;
    d.font("display").fontSize(titleSize);
    const th = d.heightOfString(smart(title), { width: cw, lineGap: titleSize * 0.02 });
    // Whole block height, so a long subtitle or note never runs into the foot.
    let block = th + (kicker ? 26 : 0) + 30;
    if (subtitle) block += d.font("displayItalic").fontSize(16).heightOfString(smart(subtitle), { width: cw * 0.9, lineGap: 3 });
    if (note) block += 16 + d.font("sans").fontSize(9).heightOfString(smart(note), { width: cw * 0.85, lineGap: 4 });
    const footTop = H - 112 - noteLift - 36;
    const y = Math.max(128, Math.min(Math.max(H * 0.36, H * 0.6 - th), footTop - block));
    d.y = y;
    if (kicker) this.eyebrow(kicker, { x: L, width: cw, after: 14, size: 8 });
    this.bookmark(title, 0);
    this.tag("H1", () => {
      d.font("display").fontSize(titleSize).fillColor(C.ink)
        .text(smart(title), L, d.y, { width: cw, lineGap: titleSize * 0.02, characterSpacing: -0.02 * titleSize });
    });
    d.y += 14;
    this.rule({ x: L, length: 44, width: 1.6, after: 16 });
    if (subtitle) {
      this.tag("P", () => {
        d.font("displayItalic").fontSize(16).fillColor(C.muted)
          .text(smart(subtitle), L, d.y, { width: cw * 0.9, lineGap: 3 });
      });
    }
    if (note) {
      d.y += 16;
      this.tag("P", () => {
        d.font("sans").fontSize(9).fillColor(C.muted).text(smart(note), L, d.y, { width: cw * 0.85, lineGap: 4 });
      });
    }
    // Foot: author, tagline, domain.
    const fy = H - 112 - noteLift;
    this.tag("P", () => {
      d.font("sansMedium").fontSize(8).fillColor(C.ink).text("JAMES BELL", L, fy, { characterSpacing: 1.6, lineBreak: false });
    });
    this.tag("P", () => {
      d.font("displayItalic").fontSize(12).fillColor(C.muted).text(TAGLINE, L, fy + 16, { width: cw, lineBreak: false });
    });
    this.tag("Link", () => {
      d.font("sans").fontSize(8).fillColor(C.mustardText).text(meta || DOMAIN, L, fy + 38, { link: SITE, width: cw, characterSpacing: 0.4 });
    });
    d.page.margins.bottom = savedBottom;
    if (breakAfter) this.newPage();
    return this;
  }

  // ---- running heads + folios -------------------------------------------
  _chrome() {
    const d = this.doc;
    const range = d.bufferedPageRange();
    let folio = 0;
    for (let i = range.start; i < range.start + range.count; i++) {
      d.switchToPage(i);
      const W = d.page.width;
      const H = d.page.height;
      const m = d.page.margins;
      const saved = { ...m };
      d.page.margins = { top: 0, bottom: 0, left: 0, right: 0 };
      if (!this.noChrome.has(i) && this.o.chrome !== false) {
        folio++;
        this.artifact(() => {
          const head = this.pageHeads.get(i) || this.runningHead;
          if (this.noHead.has(i)) {
            d.font("sans").fontSize(8).fillColor(C.muted)
              .text(String(folio + (this.o.folioOffset || 0)), 0, H - 44, { width: W, align: "center", lineBreak: false });
            return;
          }
          d.font("sansMedium").fontSize(6.5).fillColor(C.muted)
            .text("LIVEWELL BY JAMES BELL", saved.left, 40, { lineBreak: false, characterSpacing: 1.2 });
          d.font("sansMedium").fontSize(6.5);
          const ht = String(head || "").toUpperCase();
          const maxW = W - saved.left - saved.right - 150;
          let shown = ht;
          while (d.widthOfString(shown, { characterSpacing: 1.2 }) > maxW && shown.length > 4) shown = shown.slice(0, -2);
          if (shown !== ht) shown = shown.trimEnd() + "…";
          const hw = d.widthOfString(shown, { characterSpacing: 1.2 });
          d.fillColor(C.muted).text(shown, W - saved.right - hw, 40, { lineBreak: false, characterSpacing: 1.2 });
          d.font("sans").fontSize(8).fillColor(C.muted)
            .text(String(folio + (this.o.folioOffset || 0)), 0, H - 44, { width: W, align: "center", lineBreak: false });
        }, "Pagination");
      }
      if (this.pageNote && !this.noNote.has(i)) {
        const nh = this.pageNote.height;
        const x = saved.left;
        const w = W - saved.left - saved.right;
        const y = H - 60 - nh;
        this.artifact(() => {
          d.save().rect(x, y, w, nh).fill(C.creamWarm).restore();
          d.save().lineWidth(2).strokeColor(C.mustard).moveTo(x, y).lineTo(x, y + nh).stroke().restore();
          d.font("sans").fontSize(7.4).fillColor(C.ink)
            .text(this.pageNote.text, x + 12, y + 8, { width: w - 22, lineGap: 1.6, height: nh - 6 });
        }, "Pagination");
      }
      d.page.margins = saved;
    }
  }

  /** Finish: stamp chrome, close the structure tree, write the file. */
  save(outPath) {
    const d = this.doc;
    this._chrome();
    this.root.end();
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const pages = d.bufferedPageRange().count;
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(outPath);
      stream.on("finish", () => resolve({ pages, bytes: fs.statSync(outPath).size }));
      stream.on("error", reject);
      d.pipe(stream);
      d.end();
    });
  }
}

/**
 * One-page sheets: find the fullest version of a sheet that still fits on
 * one page. `renderAt(kit, level)` draws the sheet with level 0 the fullest;
 * each trial runs on a throwaway document. Returns the first level that
 * fits, or `maxLevel`.
 */
export function fitLevel(options, renderAt, maxLevel, pages = 1) {
  for (let level = 0; level < maxLevel; level++) {
    const trial = new Kit(options);
    renderAt(trial, level);
    if (trial.doc.bufferedPageRange().count <= pages) return level;
  }
  return maxLevel;
}
