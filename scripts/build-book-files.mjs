#!/usr/bin/env node
/**
 * build-book-files.mjs: a book's PDF and EPUB, typeset from its own text.
 *
 *   node scripts/build-book-files.mjs <id>            build one book
 *   node scripts/build-book-files.mjs --all           build every book that has a source folder
 *   node scripts/build-book-files.mjs <id> --verify   also prove the files carry the source folder's text
 *   ... --out <dir>     write there instead of client/public/ebook/<id>/
 *   ... --keep <dir>    keep the print HTML and the passes there (to look at)
 *
 * Run by hand, never in CI. It needs a Chromium through the `playwright`
 * package (the one the other browser scripts here use) and poppler's
 * `pdftotext`. No dependency was added for it.
 *
 * THE SOURCE is content/books-src/<id>/: `book.json` and the book's text as
 * the XHTML files of its EPUB, one per chapter, one block per line. `<id>` is
 * the book's folder under client/public/ebook/ and its cover's file name; it
 * never changes. The title and subtitle are read from
 * client/src/data/book-names.json, the cover from client/public/covers/, the
 * picture on the title page from scripts/lib/cover-art.mjs and the colours
 * from the tokens in client/src/index.css. So a rename is: change
 * book-names.json, run sync-book-names and build-covers as before, then this.
 *
 * THE ONE RULE: the typesetter adds nothing. This script sets the words in
 * content/books-src/<id>/ and changes none of them. What it does to the text
 * is listed in TYPESETTING below and counted on every run; --verify takes the
 * source folder's text, applies only those listed changes, and fails unless
 * the result is, word for word, the text in the new EPUB and the text on the
 * pages of the new PDF.
 *
 * WHOSE WORDS THE SOURCE FOLDER HOLDS. Until 2026-11-25 the rule was that
 * the source folder was the original EPUB's text, unchanged, and --verify
 * proved that too. On 2026-11-25 James asked for his books to be edited: "i
 * also want you to go through all the book, pdfs, and downloadable content to
 * make it sound human and like me", and, of fragments, "use full paragraphs
 * in the books too". So a book whose book.json has an `edited` entry (its
 * date, his instruction and where the record is kept) is no longer compared
 * with its original EPUB: its source folder is the edited text, and the proof
 * of what the edit kept (every quotation, Scripture reference, year, number,
 * name, heading and hedge) is the fact diff recorded in the file `edited`
 * names, run chapter by chapter against the original. A book without an
 * `edited` entry is still held to the old rule: its source folder must be
 * the original EPUB's text, word for word. The originals stay untouched in
 * content/held-downloads/originals/ either way.
 *
 * WHEN THE ORIGINAL PDF AND EPUB DIFFER. A book's two original files may not
 * carry the same things (Believe's PDF had a dedication and four part pages
 * its EPUB lacked; the EPUB had two appendices the PDF lacked). Nothing of
 * the author's is dropped: book.json may give a `dedication` (set on its own
 * page after the copyright page) and may name, in `fromOriginalPdf`, section
 * files whose words come from the original PDF. --verify leaves those
 * sections out of the comparison with the original EPUB and instead checks
 * that their words, and the dedication's, are in the original PDF letter for
 * letter. A source paragraph marked `class="first"` (the first under a
 * heading) is read as a paragraph; the typesetter sets its own indents.
 *
 * TYPESETTING (each is counted in the run's report):
 *   - straight quotation marks and apostrophes set as curly ones;
 *   - unrendered Markdown removed: *Label* headings, "1\." list numbers, the
 *     backslashes in "\_\_\_" and "\...", one stray "*";
 *   - end-of-chapter lists that the source ran together with double spaces,
 *     or wrote as "- " paragraphs, set one item to a line with a bullet;
 *     the "- " before a source in "Sources & Notes" dropped, so every
 *     chapter's sources are set alike;
 *   - a reference written at the end of a quotation ("... —Hosea 2:5") set
 *     on its own line; the source's empty <cite></cite> elements dropped;
 *   - in a section book.json lists under `entries` (a reading list, a
 *     glossary), each paragraph under a heading set as an entry with a hanging
 *     indent, like a source in "Sources & Notes";
 *   - a label the source writes all in capitals ("APPENDIX A") set in capitals
 *     and small letters in the contents and the bookmarks;
 *   - LORD, where the source has it in capitals, set in small capitals;
 *   - the first three words of a chapter and its labels set in capitals by
 *     the stylesheet (the words in the file are unchanged);
 *   - in the PDF only, a soft hyphen where a line breaks inside a word that
 *     Chromium will not hyphenate itself (one that begins with a capital, or
 *     ends in ’s), at the point its own dictionary gives the word in small
 *     letters. It shows as a hyphen at the end of that line and nowhere else.
 *
 * THE PDF is 6 by 9 inches, laid out by Chromium's print engine from one HTML
 * file with CSS paged media: mirrored margins, running heads and folios in
 * the page margin boxes, each chapter on a named page. Chromium has no
 * "first page of a chapter" selector, no page-number cross references and no
 * recto breaks, so the book is laid out twice: the first pass measures where
 * every chapter falls and where its opening page ends; the second splits each
 * chapter at that point (the opening page carries no running head), adds the
 * blank versos, and prints the page numbers in the contents. The second pass
 * is set twice, with every soft hyphen and then with only those a line broke
 * at, and the lines are compared; it is then checked against the first.
 * Title, author, subject, page labels (roman for the front matter) and the
 * bookmarks are written into the PDF afterwards as an incremental update.
 * Display type is Cormorant Garamond, the text Source Serif 4, the running
 * heads and labels letterspaced capitals of Source Serif 4. Chromium embeds a
 * variable font (Cormorant's upright) as a Type 3 font: it prints and reads
 * as text, but a printer's preflight may flag it.
 *
 * THE EPUB is EPUB 3 with an NCX for older readers: one XHTML file per
 * chapter (the source's own file names), a nav with landmarks, a stylesheet
 * in relative units that sets no text colour and no body font, and Cormorant
 * Garamond embedded for headings (SIL Open Font License 1.1; the font file
 * carries its own copyright and licence address).
 */
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { ART_META, BOOK_ART, hatchDefs, pen } from "./lib/cover-art.mjs";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "content/books-src");
const ORIGINALS = path.join(ROOT, "content/held-downloads/originals");
const FONTS = path.join(ROOT, "client/public/fonts");
const SITE = "livewellbyjamesbell.co";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => (args.includes(`--${name}`) ? args[args.indexOf(`--${name}`) + 1] : null);
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
const fail = (msg) => {
  throw new Error(`build-book-files: ${msg}`);
};

// ── colours: the tokens, resolved (the day palette is the first value) ────

const css = fs.readFileSync(path.join(ROOT, "client/src/index.css"), "utf8");
function token(name) {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{3,8})`));
  if (!m) fail(`token --${name} is not in client/src/index.css`);
  return m[1];
}
const T = {
  ink: token("ink"),
  muted: token("ink-muted"),
  bone: token("bone"),
  mustard: token("mustard"),
  accent: token("mustard-deep"),
  art: { ink: token("art-ink"), blue: token("art-blue"), olive: token("art-olive"), clay: token("art-clay") },
};

// ── the text ──────────────────────────────────────────────────────────────

const ENTITY = { quot: '"', amp: "&", lt: "<", gt: ">", apos: "'" };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) => {
    if (e[0] === "#") return String.fromCodePoint(/^#x/i.test(e) ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITY[e] ?? fail(`unknown entity ${m}`);
  });
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");

/** One source file, read into blocks. The files hold one block per line. */
function parseSection(file) {
  const src = fs.readFileSync(file, "utf8");
  const body = /<body>([\s\S]*)<\/body>/.exec(src)?.[1] ?? fail(`${file}: no <body>`);
  const text = (s) => {
    if (s.includes("<")) fail(`${file}: markup inside a block, which this script does not set: ${s.slice(0, 80)}`);
    return decode(s);
  };
  const blocks = [];
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    let m;
    if ((m = /^<p class="partlabel">(.*?)<\/p><h1 class="partname">(.*?)<\/h1><hr class="rule"\/><p class="parttag">(.*?)<\/p>$/.exec(line))) {
      blocks.push({ t: "part", label: text(m[1]), name: text(m[2]), tag: text(m[3]) });
    } else if ((m = /^<p class="(eyebrow|subtitle|pull)">(.*)<\/p>$/.exec(line))) blocks.push({ t: m[1], text: text(m[2]) });
    else if ((m = /^<h1>(.*)<\/h1>$/.exec(line))) blocks.push({ t: "h1", text: text(m[1]) });
    else if ((m = /^<h2>(.*)<\/h2>$/.exec(line))) blocks.push({ t: "h2", text: text(m[1]) });
    else if (line === '<hr class="rule"/>') blocks.push({ t: "rule" });
    else if ((m = /^<blockquote><p>(.*)<\/p><cite>(.*)<\/cite><\/blockquote>$/.exec(line))) blocks.push({ t: "bq", text: text(m[1]), cite: text(m[2]) });
    else if ((m = /^<p(?: class="first")?>(.*)<\/p>$/.exec(line))) blocks.push({ t: "p", text: text(m[1]) });
    else fail(`${file}: a line this script does not know how to set: ${line.slice(0, 120)}`);
  }
  return blocks;
}

/** The plain words of the source blocks, in order: what --verify starts from. */
function sourceWords(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.t === "rule") continue;
    if (b.t === "part") out.push(b.label, b.name, b.tag);
    else out.push(b.text, ...(b.cite ? [b.cite] : []));
  }
  return out.join(" ").split(/\s+/).filter(Boolean);
}

const OPENERS = new Set(["", " ", " ", "(", "[", "{", "—", "–", "-", "/", "“", "‘"]);
const ELISION = /^(tis|twas|til|em|cause|n)\b|^\d\ds?\b/i;

/** Straight quotation marks and apostrophes, set as curly ones. */
function curl(s, stats) {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch !== '"' && ch !== "'") {
      out += ch;
      continue;
    }
    const prev = out.slice(-1);
    const next = s[i + 1] ?? "";
    // A mark opens after a space or an opening mark, unless punctuation follows it; a quotation may open on an ellipsis.
    const opens = OPENERS.has(prev) && next !== "" && (!/[\s.,;:!?)\]]/.test(next) || s.startsWith("...", i + 1));
    if (ch === '"') {
      out += opens ? "“" : "”";
      stats.quotes++;
    } else {
      const inWord = /[\p{L}\p{N}]/u.test(prev) && /\p{L}/u.test(next);
      out += !inWord && opens && !ELISION.test(s.slice(i + 1)) ? "‘" : "’";
      stats.apostrophes++;
    }
  }
  return out;
}

const END_LABELS = ["Key Takeaways", "Reflection Questions", "Practices", "Sources & Notes"];

/**
 * The typesetting: source blocks in, set blocks out. Everything this does to
 * the text is counted in `stats`. Set blocks: head (eyebrow, title, subtitle),
 * part, pull, h2, p, bq (text, ref), label, li, num (n), src.
 */
function typeset(blocks, stats) {
  const out = [];
  let mode = null;
  const clean = (text) => {
    let s = text;
    s = s.replace(/([.!?])\*(?= |$)/g, (m, p) => (stats.strayAsterisk++, p));
    s = s.replace(/\\([._])/g, (m, p) => (stats.markdownEscapes++, p));
    if (/[*\\]/.test(s)) fail(`an asterisk or backslash this script does not know how to set: ${s.slice(0, 100)}`);
    s = s.replace(/ {2,}/g, () => (stats.doubleSpaces++, " "));
    return curl(s.trim(), stats);
  };
  let head = null;
  for (const b of blocks) {
    if (b.t === "part") {
      out.push({ t: "part", label: clean(b.label), name: clean(b.name), tag: clean(b.tag) });
      continue;
    }
    if (b.t === "eyebrow") {
      head = { t: "head", eyebrow: clean(b.text), title: "", subtitle: "" };
      out.push(head);
      continue;
    }
    if (b.t === "h1") {
      if (!head) out.push((head = { t: "head", eyebrow: "", title: "", subtitle: "" }));
      head.title = clean(b.text);
      continue;
    }
    if (b.t === "subtitle") {
      head.subtitle = clean(b.text);
      continue;
    }
    if (b.t === "rule") continue; // the head draws its own
    if (b.t === "bq" && !b.cite) {
      if (b.cite === "") stats.emptyCites++;
      const bare = b.text.replace(/^\*(.*)\*$/, "$1");
      if (END_LABELS.includes(bare)) {
        if (bare !== b.text) stats.markdownLabels++;
        out.push({ t: "label", text: clean(bare), first: mode === null });
        mode = bare;
        continue;
      }
    }
    if (mode && (b.t === "bq" || b.t === "p")) {
      const pieces = b.text.split(/ {2,}/);
      stats.listSeparators += pieces.length - 1;
      for (const piece of pieces) {
        let m;
        if ((m = /^• (.*)$/.exec(piece))) out.push({ t: "li", text: clean(m[1]) });
        else if ((m = /^- (.*)$/.exec(piece))) {
          if (mode === "Sources & Notes") {
            stats.sourceHyphensDropped++;
            out.push({ t: "src", text: clean(m[1]) });
          } else {
            stats.hyphensToBullets++;
            out.push({ t: "li", text: clean(m[1]) });
          }
        } else if ((m = /^(\d+)(\\?)\. (.*)$/.exec(piece))) {
          if (m[2]) stats.markdownNumbers++;
          out.push({ t: "num", n: m[1], text: clean(m[3]) });
        } else if (mode === "Sources & Notes") out.push({ t: "src", text: clean(piece) });
        else fail(`an item under "${mode}" with no bullet or number: ${piece.slice(0, 80)}`);
      }
      continue;
    }
    if (b.t === "bq") {
      if (b.cite) {
        out.push({ t: "bq", text: clean(b.text), ref: clean(b.cite) });
        continue;
      }
      // A reference the source wrote at the end of the quotation: its own line.
      const m = /^(.*\S) (—[\p{Lu}\d][^—]{2,90})$/u.exec(b.text);
      if (m) {
        stats.referenceLines++;
        // The quotation is curled on its own, so the mark before the dash closes.
        out.push({ t: "bq", text: clean(m[1]), ref: clean(m[2]) });
      } else out.push({ t: "bq", text: clean(b.text), ref: "" });
      continue;
    }
    if (b.t === "pull" || b.t === "h2" || b.t === "p") {
      out.push({ t: b.t, text: clean(b.text) });
      continue;
    }
    fail(`a block of kind "${b.t}" this script does not set`);
  }
  // The lead-in: the first three words of the chapter's first paragraph.
  const first = out.find((b) => b.t === "p");
  if (first && head) {
    const m = /^(\S+ \S+ \S+)( .*)$/.exec(first.text);
    if (m) {
      first.lead = m[1];
      first.text = m[2].trimStart();
      stats.leadIns++;
    }
  }
  return out;
}

/** The words of the set blocks, as a reader of the plain text would have them. */
function setWords(set) {
  const out = [];
  for (const b of set) {
    if (b.t === "head") out.push(b.eyebrow, b.title, b.subtitle);
    else if (b.t === "part") out.push(b.label, b.name, b.tag);
    else if (b.t === "li") out.push("•", b.text);
    else if (b.t === "num") out.push(`${b.n}.`, b.text);
    else if (b.t === "bq") out.push(b.text, b.ref);
    else if (b.t === "p") out.push(b.lead ?? "", b.text);
    else out.push(b.text);
  }
  return out.join(" ").split(/\s+/).filter(Boolean);
}

/** Inline HTML for a run of text: escaped, with LORD in small capitals. */
function inline(text, stats) {
  return esc(text).replace(/\bLORD\b/g, () => {
    if (stats) stats.lordSmallCaps++;
    return 'L<span class="sc">ORD</span>';
  });
}

// ── a book ────────────────────────────────────────────────────────────────

function loadBook(id) {
  const dir = path.join(SRC, id);
  if (!fs.existsSync(path.join(dir, "book.json"))) fail(`no content/books-src/${id}/book.json`);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, "book.json"), "utf8"));
  const named = readJson("client/src/data/book-names.json").books.find((b) => b.id === id);
  const cover = readJson("client/src/data/covers.json").books.find((b) => b.id === id) ?? fail(`"${id}" has no cover in covers.json`);
  const title = named?.title ?? cover.title ?? fail(`"${id}" has no title`);
  const subtitle = named?.subtitle ?? cover.subtitle ?? "";
  const formerly = named?.was?.length ? named.was[named.was.length - 1].title : "";
  const stats = {
    quotes: 0, apostrophes: 0, markdownLabels: 0, markdownNumbers: 0, markdownEscapes: 0, strayAsterisk: 0, listSeparators: 0, doubleSpaces: 0,
    hyphensToBullets: 0, sourceHyphensDropped: 0, emptyCites: 0, referenceLines: 0, entries: 0, leadIns: 0, lordSmallCaps: 0, softHyphensAtBreaks: 0,
  };
  const sections = meta.sections.map((file, i) => {
    const source = parseSection(path.join(dir, file));
    const set = typeset(source, stats);
    // A reading list or a glossary: every paragraph under a heading is an entry, set with a hanging indent.
    if ((meta.entries ?? []).includes(file)) {
      let under = false;
      for (const b of set) {
        if (b.t === "h2") under = true;
        else if (under && b.t === "p") {
          b.t = "src";
          stats.entries++;
        }
      }
    }
    const part = set.find((b) => b.t === "part");
    const head = set.find((b) => b.t === "head");
    if (!part && !head) fail(`${id}/${file}: neither a part page nor a chapter`);
    const eyebrow = part ? part.label : head.eyebrow;
    const kind = part ? "part" : /^introduction/i.test(eyebrow) ? "introduction" : /^conclusion/i.test(eyebrow) ? "conclusion" : /^appendix/i.test(eyebrow) ? "appendix" : "chapter";
    return { file, n: i + 1, kind, eyebrow, title: part ? part.name : head.title, source, set };
  });
  const dedication = (meta.dedication ?? []).map((l) => curl(l, stats));
  return { id, dir, meta, title, subtitle, formerly, cover, sections, stats, dedication, author: meta.author };
}

/** A chapter's number as the contents page prints it. */
const NUMBER_WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
function chapterNumber(eyebrow) {
  const m = /^chapter\s+(\S+)$/i.exec(eyebrow);
  if (!m) return "";
  if (/^\d+$/.test(m[1])) return m[1];
  const i = NUMBER_WORDS.indexOf(m[1].toLowerCase());
  return i >= 0 ? String(i + 1) : m[1];
}

/** The running heads: letterspaced capitals of the reading face, measured so a head never outruns the text block. */
const HEAD = { size: 7.2, track: 0.17, max: 300 };
const fontkit = createRequire(require.resolve("pdfkit"))("fontkit");
const HEAD_FONT = fontkit.create(fs.readFileSync(path.join(FONTS, "source-serif-4-400-latin.woff2")));
function headWidth(text) {
  const run = HEAD_FONT.layout(text.toUpperCase());
  const advance = run.positions.reduce((sum, p) => sum + p.xAdvance, 0);
  return (advance * HEAD.size) / HEAD_FONT.unitsPerEm + HEAD.track * HEAD.size * (run.glyphs.length - 1);
}

/** The running head: the chapter's title, or its main title (before a colon or a dash) when the whole will not fit. */
function runningHead(title) {
  if (headWidth(title) <= HEAD.max) return title;
  const m = /^(.{4,}?)(?::\s|—)/.exec(title);
  if (m && headWidth(m[1]) <= HEAD.max) return m[1];
  return fail(`the running head "${title}" does not fit the text block, and has no shorter main title`);
}

const copyrightLines = (book) => [
  ...book.meta.copyright,
  ...(book.formerly ? [`Previously published as ${book.formerly}.`] : []),
  ...(book.meta.copyright.some((l) => l.includes(SITE)) ? [] : [SITE]),
];

/** The picture from the book's cover, redrawn for a white page. */
function artSvg(book, { plate = null } = {}) {
  const draw = BOOK_ART[book.cover.art] ?? fail(`no drawing "${book.cover.art}"`);
  const meta = { horizon: 300, band: true, box: [0, 0, 400, 340], ...(ART_META[book.cover.art] ?? {}) };
  const [x0, y0, x1, y1] = meta.box;
  const paper = plate ?? "#FFFFFF";
  const p = pen({ paper, ink: T.art.ink, tone: T.art[book.cover.tone], mustard: T.mustard, light: paper, dark: T.art.ink });
  const pad = plate ? 28 : 6;
  const vb = [x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad];
  const ground = `<rect x="${x0}" y="${meta.horizon - 1.4}" width="${x1 - x0}" height="2.8" fill="${T.art.ink}"/>`;
  const band = meta.band ? `<rect x="${x0}" y="${meta.horizon + 8}" width="${x1 - x0}" height="16" fill="url(#hh)" fill-opacity="0.6"/>` : "";
  const bg = plate ? `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="${plate}"/>` : "";
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(" ")}" role="img" aria-label="${attr(book.cover.alt)}"><defs>${hatchDefs(T.art.ink)}</defs>${bg}${band}${ground}${draw(p)}</svg>`, ratio: vb[3] / vb[2] };
}

// ── the EPUB ──────────────────────────────────────────────────────────────

const EPUB_CSS = `@font-face{font-family:"Cormorant Garamond";font-style:normal;font-weight:300 700;src:url(fonts/cormorant-garamond-400-latin.woff2) format("woff2")}
@font-face{font-family:"Cormorant Garamond";font-style:italic;font-weight:400;src:url(fonts/cormorant-garamond-400-italic-latin.woff2) format("woff2")}
body{margin:0 5%;line-height:1.5}
h1,h2,h3{font-family:"Cormorant Garamond",serif;-webkit-hyphens:none;hyphens:none}
header{margin:3em 0 0;text-align:center}
.eyebrow{margin:0;font-size:.72em;letter-spacing:.2em;text-transform:uppercase;text-indent:0}
h1{margin:.5em 0 0;font-size:2em;font-weight:500;line-height:1.12}
.subtitle{margin:.6em 1.2em 0;font-family:"Cormorant Garamond",serif;font-style:italic;font-size:1.15em;line-height:1.3;text-indent:0}
hr.rule{width:3em;height:0;margin:1.5em auto 2em;border:0;border-top:.12em solid ${T.accent}}
h2{margin:1.9em 0 .55em;font-size:1.35em;font-weight:600;line-height:1.2;text-align:left}
h3{margin:1.8em 0 .5em;font-size:1.15em;font-weight:600;line-height:1.2;text-align:left}
p{margin:0;text-indent:1.4em}
p.ni{text-indent:0}
.lead{font-size:.82em;letter-spacing:.07em;text-transform:uppercase}
.sc{font-size:.8em;letter-spacing:.04em}
p.pull{margin:1.6em 1.4em;font-family:"Cormorant Garamond",serif;font-style:italic;font-size:1.3em;line-height:1.35;text-align:center;text-indent:0}
blockquote{margin:1.1em 1.4em}
blockquote p{text-indent:0}
p.ref{margin-top:.35em;font-size:.82em;letter-spacing:.04em;text-align:right}
hr.end{width:3em;height:0;margin:2.6em auto 0;border:0;border-top:.06em solid;opacity:.5}
ul,ol{margin:.2em 0 0;padding-left:1.4em}
li{margin:0 0 .45em}
p.src{margin:0 0 .45em;padding-left:1.4em;text-indent:-1.4em}
.part{margin-top:22%;text-align:center}
.part h1{font-size:2.4em}
.part .tag{margin:0 1.2em;font-family:"Cormorant Garamond",serif;font-style:italic;font-size:1.2em;text-indent:0}
.cover{margin:0;text-align:center}
.cover img{max-width:100%;height:auto}
.titlepage{margin-top:12%;text-align:center}
.titlepage h1{font-size:2.5em;letter-spacing:.03em;text-transform:uppercase}
.titlepage .art{margin:2em auto;width:62%;max-width:20em}
.titlepage .art img{width:100%;height:auto}
.titlepage .author{margin-top:1.5em;font-size:.85em;letter-spacing:.3em;text-transform:uppercase;text-indent:0}
.copyright p{margin:0 0 1em;font-size:.85em;text-indent:0}
.dedication{margin-top:20%;text-align:center}
.dedication p{margin:0 0 1em;font-style:italic;text-indent:0}
nav ol{margin:0;padding:0;list-style:none}
nav li{margin:.55em 0}
nav ol ol{margin-left:1.4em}
nav a{text-decoration:none}
nav h1{margin-bottom:1em;text-align:center}
`;

const xhtml = (title, body, { bodyAttr = "" } = {}) =>
  `<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en" xml:lang="en"><head><meta charset="utf-8"/><title>${esc(title)}</title><link rel="stylesheet" type="text/css" href="style.css"/></head><body${bodyAttr}>\n${body}\n</body></html>\n`;

const EPUB_TYPE = { introduction: "introduction", chapter: "chapter", conclusion: "conclusion", appendix: "appendix", part: "part" };

/** The set blocks of one section as EPUB markup. Lists are real lists here. */
function epubBlocks(section, stats) {
  const out = [];
  let prev = null;
  let list = null;
  const close = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  for (const b of section.set) {
    if (b.t !== "li" && b.t !== "num") close();
    if (b.t === "part") {
      out.push(`<div class="part"><p class="eyebrow">${inline(b.label)}</p>\n<h1>${inline(b.name)}</h1>\n<hr class="rule"/>\n<p class="tag">${inline(b.tag)}</p></div>`);
    } else if (b.t === "head") {
      out.push(`<header>${b.eyebrow ? `<p class="eyebrow">${inline(b.eyebrow)}</p>\n` : ""}<h1>${inline(b.title)}</h1>${b.subtitle ? `\n<p class="subtitle">${inline(b.subtitle)}</p>` : ""}</header>\n<hr class="rule"/>`);
    } else if (b.t === "pull") out.push(`<p class="pull">${inline(b.text)}</p>`);
    else if (b.t === "h2") out.push(`<h2>${inline(b.text)}</h2>`);
    else if (b.t === "label") out.push(`${b.first ? '<hr class="end"/>\n' : ""}<h3>${inline(b.text)}</h3>`);
    else if (b.t === "bq") out.push(`<blockquote><p>${inline(b.text, stats)}</p>${b.ref ? `<p class="ref">${inline(b.ref)}</p>` : ""}</blockquote>`);
    else if (b.t === "li" || b.t === "num") {
      const want = b.t === "li" ? "ul" : "ol";
      if (list !== want) {
        close();
        out.push(`<${want}>`);
        list = want;
      }
      out.push(`<li>${inline(b.text, stats)}</li>`);
    } else if (b.t === "src") out.push(`<p class="src">${inline(b.text, stats)}</p>`);
    else if (b.t === "p") {
      const indent = prev === "p";
      out.push(`<p${indent ? "" : ' class="ni"'}>${b.lead ? `<span class="lead">${inline(b.lead, stats)}</span> ` : ""}${inline(b.text, stats)}</p>`);
    }
    prev = b.t;
  }
  close();
  return out.join("\n");
}

/** The contents as a tree: a part holds the chapters after it; the introduction, conclusion and appendices stand alone. */
function contentsTree(book) {
  const items = [];
  let open = null;
  for (const s of book.sections) {
    const li = { s, kids: [] };
    if (s.kind === "part") {
      items.push((open = li));
    } else if (open && s.kind === "chapter") open.kids.push(li);
    else {
      open = null;
      items.push(li);
    }
  }
  return items;
}

/** A label the source writes all in capitals ("APPENDIX A"), in capitals and small letters for the contents and bookmarks. */
const labelCase = (e) => (/[a-z]/.test(e) ? e : e.replace(/[A-Z]{2,}/g, (w) => w[0] + w.slice(1).toLowerCase()));

const tocLabel = (s) => (s.kind === "part" ? `${labelCase(s.eyebrow)}: ${s.title}` : s.kind === "chapter" ? `${chapterNumber(s.eyebrow)}. ${s.title}` : `${labelCase(s.eyebrow)}: ${s.title}`);

async function buildEpub(book, outFile) {
  const files = [];
  const add = (name, data, type, extra = "") => files.push({ name, data: Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8"), type, extra });
  const full = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
  const stats = book.stats;

  add("style.css", EPUB_CSS, "text/css");
  add("cover.jpg", fs.readFileSync(path.join(ROOT, "client/public/covers", `${book.id}.jpg`)), "image/jpeg", ' properties="cover-image"');
  add("fonts/cormorant-garamond-400-latin.woff2", fs.readFileSync(path.join(FONTS, "cormorant-garamond-400-latin.woff2")), "font/woff2");
  add("fonts/cormorant-garamond-400-italic-latin.woff2", fs.readFileSync(path.join(FONTS, "cormorant-garamond-400-italic-latin.woff2")), "font/woff2");
  const art = artSvg(book, { plate: T.bone });
  add("title-art.png", await sharp(Buffer.from(art.svg), { density: 220 }).resize({ width: 900 }).png({ compressionLevel: 9, palette: true }).toBuffer(), "image/png");

  add("cover.xhtml", xhtml("Cover", `<section epub:type="cover" class="cover"><img src="cover.jpg" alt="${attr(`The cover of ${full}, by ${book.author}. ${book.cover.alt}`)}"/></section>`), "application/xhtml+xml");
  add(
    "title.xhtml",
    xhtml(book.title, `<section epub:type="titlepage" class="titlepage"><h1>${esc(book.title)}</h1>${book.subtitle ? `\n<p class="subtitle">${esc(book.subtitle)}</p>` : ""}\n<hr class="rule"/>\n<div class="art"><img src="title-art.png" alt="${attr(book.cover.alt)}"/></div>\n<p class="author">${esc(book.author)}</p></section>`),
    "application/xhtml+xml"
  );
  add(
    "copyright.xhtml",
    xhtml("Copyright", `<section epub:type="copyright-page" class="copyright"><p>${esc(full)}</p>\n${copyrightLines(book).map((l) => `<p>${esc(l)}</p>`).join("\n")}</section>`),
    "application/xhtml+xml"
  );

  if (book.dedication.length) add("dedication.xhtml", xhtml("Dedication", `<section epub:type="dedication" class="dedication">${book.dedication.map((l) => `<p>${inline(l)}</p>`).join("\n")}</section>`), "application/xhtml+xml");

  const items = contentsTree(book);
  const navLi = (li) => `<li><a href="${li.s.file}">${esc(tocLabel(li.s))}</a>${li.kids.length ? `<ol>${li.kids.map(navLi).join("")}</ol>` : ""}</li>`;
  const firstBody = book.sections[0].file;
  add(
    "nav.xhtml",
    xhtml("Contents", `<nav epub:type="toc" id="toc"><h1>Contents</h1><ol>${items.map(navLi).join("")}</ol></nav>\n<nav epub:type="landmarks" id="landmarks" hidden=""><h2>Guide</h2><ol><li><a epub:type="cover" href="cover.xhtml">Cover</a></li><li><a epub:type="titlepage" href="title.xhtml">Title page</a></li><li><a epub:type="toc" href="nav.xhtml">Contents</a></li><li><a epub:type="bodymatter" href="${firstBody}">Start of the book</a></li></ol></nav>`),
    "application/xhtml+xml",
    ' properties="nav"'
  );
  for (const s of book.sections) {
    add(s.file, xhtml(s.title, `<section epub:type="${EPUB_TYPE[s.kind]}">\n${epubBlocks(s, stats)}\n</section>`, { bodyAttr: ' epub:type="bodymatter"' }), "application/xhtml+xml");
  }
  let play = 0;
  const point = (href, label) => `<navPoint id="np${++play}" playOrder="${play}"><navLabel><text>${esc(label)}</text></navLabel><content src="${href}"/></navPoint>`;
  add(
    "toc.ncx",
    `<?xml version="1.0" encoding="utf-8"?>\n<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1"><head><meta name="dtb:uid" content="${attr(book.meta.identifier)}"/><meta name="dtb:depth" content="1"/><meta name="dtb:totalPageCount" content="0"/><meta name="dtb:maxPageNumber" content="0"/></head><docTitle><text>${esc(book.title)}</text></docTitle><navMap>${point("title.xhtml", book.title)}${book.sections.map((s) => point(s.file, tocLabel(s))).join("")}</navMap></ncx>\n`,
    "application/x-dtbncx+xml"
  );

  const idOf = (name) => (name === "toc.ncx" ? "ncx" : name === "cover.jpg" ? "cover-image" : name.replace(/\.[a-z0-9]+$/, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^(\d)/, "x$1"));
  const spine = ["cover.xhtml", "title.xhtml", "copyright.xhtml", ...(book.dedication.length ? ["dedication.xhtml"] : []), "nav.xhtml", ...book.sections.map((s) => s.file)];
  const opf = `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bid" xml:lang="${book.meta.language}">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="bid">${esc(book.meta.identifier)}</dc:identifier>
<dc:title id="title">${esc(book.title)}</dc:title>
<meta refines="#title" property="title-type">main</meta>${book.subtitle ? `\n<dc:title id="subtitle">${esc(book.subtitle)}</dc:title>\n<meta refines="#subtitle" property="title-type">subtitle</meta>` : ""}
<dc:creator id="creator">${esc(book.author)}</dc:creator>
<meta refines="#creator" property="role" scheme="marc:relators">aut</meta>
<dc:language>${book.meta.language}</dc:language>${book.meta.date ? `\n<dc:date>${esc(book.meta.date)}</dc:date>` : ""}
<meta property="dcterms:modified">${book.meta.modified}</meta>
<meta name="cover" content="cover-image"/>
</metadata>
<manifest>
${files.map((f) => `<item id="${idOf(f.name)}" href="${f.name}" media-type="${f.type}"${f.extra}/>`).join("\n")}
</manifest>
<spine toc="ncx">
${spine.map((name) => `<itemref idref="${idOf(name)}"/>`).join("\n")}
</spine>
</package>
`;
  const entries = [
    { name: "mimetype", data: Buffer.from("application/epub+zip"), store: true },
    { name: "META-INF/container.xml", data: Buffer.from(`<?xml version="1.0" encoding="utf-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>\n`) },
    { name: "OEBPS/content.opf", data: Buffer.from(opf) },
    ...files.map((f) => ({ name: `OEBPS/${f.name}`, data: f.data, store: /\.(jpg|png|woff2)$/.test(f.name) })),
  ];
  fs.writeFileSync(outFile, zip(entries));
}

// ── zip, written and read here so no dependency is needed ─────────────────

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** A zip with fixed dates, so the same text builds the same file. */
function zip(entries) {
  const parts = [];
  const central = [];
  let offset = 0;
  for (const e of entries) {
    const name = Buffer.from(e.name, "utf8");
    const body = e.store ? e.data : zlib.deflateRawSync(e.data, { level: 9 });
    const crc = crc32(e.data);
    const head = Buffer.alloc(30);
    head.writeUInt32LE(0x04034b50, 0);
    head.writeUInt16LE(20, 4);
    head.writeUInt16LE(0x0800, 6);
    head.writeUInt16LE(e.store ? 0 : 8, 8);
    head.writeUInt16LE(0, 10);
    head.writeUInt16LE(0x0021, 12);
    head.writeUInt32LE(crc, 14);
    head.writeUInt32LE(body.length, 18);
    head.writeUInt32LE(e.data.length, 22);
    head.writeUInt16LE(name.length, 26);
    head.writeUInt16LE(0, 28);
    parts.push(head, name, body);
    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(e.store ? 0 : 8, 10);
    cd.writeUInt16LE(0, 12);
    cd.writeUInt16LE(0x0021, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(body.length, 20);
    cd.writeUInt32LE(e.data.length, 24);
    cd.writeUInt16LE(name.length, 28);
    cd.writeUInt32LE(offset, 42);
    central.push(cd, name);
    offset += 30 + name.length + body.length;
  }
  const cdBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cdBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, cdBuf, end]);
}

/** Every entry of a zip, in the order of its central directory. */
export function unzip(buf) {
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd < 0) fail("not a zip file");
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const out = [];
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.subarray(p + 46, p + 46 + nameLen).toString("utf8");
    const dataAt = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(dataAt, dataAt + csize);
    out.push({ name, method, offset: local, data: method === 0 ? Buffer.from(raw) : zlib.inflateRawSync(raw) });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return out;
}

// ── the PDF ───────────────────────────────────────────────────────────────

// The page, in points. The text block is 27 picas by 35 lines of 15 points.
const PAGE = { w: 432, h: 648, top: 57.6, bottom: 65.4, inside: 61.2, outside: 46.8, lead: 15 };
const BLOCK_H = PAGE.h - PAGE.top - PAGE.bottom;

const fontUrl = (name) => pathToFileURL(path.join(FONTS, name)).href;
const cssString = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

function printCss(book, { final }) {
  const head = `font:400 ${HEAD.size}pt/1 "Source Serif 4";letter-spacing:${HEAD.track}em;color:${T.muted};vertical-align:bottom;padding-bottom:19pt`;
  const folio = `font:400 9pt/1 "Source Serif 4";color:${T.ink};vertical-align:top;padding-top:21pt`;
  const pages = [];
  if (final) {
    for (const s of book.sections) {
      if (s.kind === "part") continue;
      pages.push(
        `@page c${s.n}{counter-increment:bd}`,
        `@page c${s.n}:left{@top-left{content:${cssString(book.title.toUpperCase())};${head}}@bottom-left{content:counter(bd);${folio}}}`,
        `@page c${s.n}:right{@top-right{content:${cssString(runningHead(s.title).toUpperCase())};${head}}@bottom-right{content:counter(bd);${folio}}}`
      );
    }
    pages.push(`@page open{counter-increment:bd;@bottom-right{content:counter(bd);${folio}}}`);
    pages.push(`@page fmtoc{counter-increment:fm}`, `@page fmtoc:left{@bottom-left{content:counter(fm,lower-roman);${folio}}}`, `@page fmtoc:right{@bottom-right{content:counter(fm,lower-roman);${folio}}}`);
  }
  return `
@font-face{font-family:"Source Serif 4";font-style:normal;font-weight:400;src:url(${fontUrl("source-serif-4-400-latin.woff2")}) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2212}
@font-face{font-family:"Source Serif 4";font-style:normal;font-weight:400;src:url(${fontUrl("source-serif-4-400-latin-ext.woff2")}) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1EFF}
@font-face{font-family:"Source Serif 4";font-style:italic;font-weight:400;src:url(${fontUrl("source-serif-4-400-italic-latin.woff2")}) format("woff2")}
@font-face{font-family:"Source Serif 4";font-style:normal;font-weight:600;src:url(${fontUrl("source-serif-4-600-latin.woff2")}) format("woff2")}
@font-face{font-family:"Cormorant Garamond";font-style:normal;font-weight:300 700;src:url(${fontUrl("cormorant-garamond-400-latin.woff2")}) format("woff2")}
@font-face{font-family:"Cormorant Garamond";font-style:italic;font-weight:400;src:url(${fontUrl("cormorant-garamond-400-italic-latin.woff2")}) format("woff2")}
@page{size:${PAGE.w}pt ${PAGE.h}pt;margin:${PAGE.top}pt ${PAGE.outside}pt ${PAGE.bottom}pt ${PAGE.inside}pt}
@page :left{margin-left:${PAGE.outside}pt;margin-right:${PAGE.inside}pt}
@page :right{margin-left:${PAGE.inside}pt;margin-right:${PAGE.outside}pt}
@page cover{margin:0}
@page fm{counter-increment:fm}
@page blank{counter-increment:bd}
@page part{counter-increment:bd}
${pages.join("\n")}
*{box-sizing:border-box}
html{font:400 10.5pt/${PAGE.lead}pt "Source Serif 4",serif;color:${T.ink};font-kerning:normal;font-variant-ligatures:common-ligatures;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0}
.cover{page:cover;width:${PAGE.w}pt;height:${PAGE.h}pt;overflow:hidden}
.cover img{display:block;width:${PAGE.w}pt;height:${PAGE.h}pt}
.cover-verso{page:cover;height:1pt;break-before:page}
.blank{page:blank;height:1pt;break-before:page}
.fm{page:fm;break-before:page;height:${BLOCK_H - 1}pt;display:flex;flex-direction:column;text-align:center;overflow:hidden}
.fm-blank{page:fm;height:1pt;break-before:page}
.half .t{margin-top:150pt;font:500 17pt/22pt "Cormorant Garamond";letter-spacing:.14em;text-transform:uppercase}
.tp .t{margin-top:36pt;font:500 35pt/37pt "Cormorant Garamond";letter-spacing:.035em;text-transform:uppercase;text-wrap:balance}
.tp .s{margin:15pt 26pt 0;font:italic 400 14pt/18.5pt "Cormorant Garamond";text-wrap:balance}
.rule{width:36pt;height:0;margin:20pt auto 0;border-top:1.1pt solid ${T.accent}}
.tp .art{margin:auto;width:196pt}
.tp .art svg{display:block;width:100%;height:auto}
.tp .a{font:400 9pt/12pt "Source Serif 4";letter-spacing:.3em;text-transform:uppercase;padding-bottom:6pt}
.cr{justify-content:flex-end;text-align:left}
.ded{justify-content:flex-start;padding-top:132pt}
.ded p{margin:0 auto 13pt;max-width:236pt;font:italic 400 12.5pt/17.5pt "Cormorant Garamond";text-indent:0;text-align:center;hyphens:none;text-wrap:balance}
.cr p{max-width:262pt;margin:0 0 9.5pt;font-size:8.2pt;line-height:11.6pt;text-indent:0;text-align:left;hyphens:none}
.toc{page:fmtoc}
.toc h1{margin:0;padding-top:30pt;font:400 27pt/30pt "Cormorant Garamond";text-align:center}
.toc .rule{margin-bottom:26pt}
.toc .row{display:flex;align-items:baseline;gap:9pt;margin:0 0 5pt;break-inside:avoid}
.toc .no{flex:0 0 17pt;font-size:9.5pt;color:${T.muted};text-align:right}
.toc .tt{flex:1 1 auto;font-size:10.5pt;line-height:14.5pt;text-wrap:pretty}
.toc .lab{font-style:italic;padding-right:5pt}
.toc .pn{flex:0 0 22pt;font-size:9.5pt;text-align:right}
.toc .pt{margin:13pt 0 7pt 26pt;font:400 7.2pt/12pt "Source Serif 4";letter-spacing:.2em;text-transform:uppercase;color:${T.muted};break-after:avoid}
.partpage{page:part;height:${BLOCK_H - 1}pt;text-align:center;overflow:hidden}
.partpage .eyebrow{padding-top:165pt}
.partpage h1{margin:0}
.partpage .h1t{font-size:31pt;line-height:34pt}
.partpage .tag{margin:18pt 34pt 0;font:italic 400 13.5pt/18.5pt "Cormorant Garamond";text-indent:0;text-align:center;hyphens:none;text-wrap:balance}
h1,h2,h3{font-weight:400}
.ch-head{padding-top:66pt;margin-bottom:28pt;text-align:center}
.ch-head h1{margin:0}
.eyebrow{display:block;font:400 7.6pt/${PAGE.lead}pt "Source Serif 4";letter-spacing:.24em;text-transform:uppercase;color:${T.muted};margin-bottom:12pt}
.h1t{display:block;font:400 27pt/30pt "Cormorant Garamond";letter-spacing:-.005em;hyphens:none;text-wrap:balance}
.ch-head .subtitle{margin:12pt 22pt 0;font:italic 400 12.75pt/17pt "Cormorant Garamond";text-indent:0;text-align:center;hyphens:none;text-wrap:balance}
p{margin:0;text-indent:${PAGE.lead}pt;text-align:justify;hyphens:auto;hyphenate-limit-chars:6 3 3;widows:2;orphans:2}
p.ni{text-indent:0}
p.keep{break-inside:avoid}
p.greedy,.greedy p{text-wrap:wrap}
p.cut-a{text-align-last:justify}
.lead{font-size:8.5pt;letter-spacing:.075em;text-transform:uppercase}
.sc{font-size:8.3pt;letter-spacing:.03em}
h2{margin:22.5pt 0 7.5pt;font:600 13.6pt/${PAGE.lead}pt "Cormorant Garamond";text-align:left;hyphens:none;text-wrap:balance;break-after:avoid}
p.pull{margin:22.5pt 30pt;font:italic 400 15pt/22.5pt "Cormorant Garamond";text-indent:0;text-align:center;hyphens:none;text-wrap:balance;break-inside:avoid}
.ch-head + p.pull{margin-top:0}
p.pull + h2{margin-top:0}
blockquote{margin:${PAGE.lead}pt 0 ${PAGE.lead}pt 18pt;padding-right:18pt}
blockquote.short{break-inside:avoid}
blockquote.cut-a{margin-bottom:0}
blockquote.cut-b{margin-top:0}
blockquote p{font-size:10pt;text-indent:0}
blockquote p.ref{font-size:8.1pt;letter-spacing:.07em;text-align:right;color:${T.muted};break-before:avoid}
h2 + blockquote{margin-top:0}
.endrule{width:36pt;height:0;margin:22.5pt auto 7.5pt;border-top:.6pt solid ${T.muted};break-after:avoid}
h3{margin:18pt 0 6pt;font:600 12.4pt/${PAGE.lead}pt "Cormorant Garamond";text-align:left;break-after:avoid}
p.li,p.num,p.src{margin:0 0 4.5pt;padding-left:14pt;text-indent:-14pt;font-size:9.6pt;line-height:13.5pt;text-align:left;orphans:2;widows:2}
p.li .mk,p.num .mk{display:inline-block;width:14pt;text-indent:0;color:${T.muted}}
p.num .mk{font-size:9pt}
`;
}

/** The visible text of a set block, exactly as the print HTML carries it. */
function printText(b) {
  if (b.t === "head") return [b.eyebrow.toUpperCase(), b.title, b.subtitle].join("");
  if (b.t === "part") return [b.label.toUpperCase(), b.name, b.tag].join("");
  if (b.t === "li") return `•${b.text}`;
  if (b.t === "num") return `${b.n}.${b.text}`;
  if (b.t === "bq") return b.text + b.ref;
  if (b.t === "p") return (b.lead ? b.lead.toUpperCase() : "") + b.text;
  return b.text;
}

/** Text with everything a line or page break can add or take away removed. */
const squeeze = (s) => s.normalize("NFKC").replace(/[\s­‐‑-]/g, "");

/** One set block as print HTML. `cut` is "a" or "b" for the halves of a block split at a page end. */
function printBlock(b, prev, { cut = "", greedy = false } = {}) {
  const cls = (...names) => {
    const list = names.filter(Boolean);
    return list.length ? ` class="${list.join(" ")}"` : "";
  };
  const cutCls = cut ? `cut-${cut}` : "";
  const g = greedy ? "greedy" : "";
  if (b.t === "pull") return `<p${cls("pull")}>${inline(b.text)}</p>`;
  if (b.t === "h2") return `<h2>${inline(b.text)}</h2>`;
  if (b.t === "label") return `${b.first ? '<div class="endrule"></div>' : ""}<h3>${inline(b.text)}</h3>`;
  // A quotation of three lines or fewer is never split; a longer one may run over a page, two lines or more each side.
  if (b.t === "bq") return `<blockquote${cls(cutCls, g, !cut && b.text.length < 185 ? "short" : "")}><p${cls(cutCls)}>${inline(soften(b.text))}</p>${b.ref ? `<p class="ref">${inline(b.ref)}</p>` : ""}</blockquote>`;
  const keep = !cut && b.text.length < 215 ? "keep" : "";
  if (b.t === "li") return `<p${cls("li", cutCls, keep)}>${cut === "b" ? "" : '<span class="mk">•</span>'}${inline(soften(b.text))}</p>`;
  if (b.t === "num") return `<p${cls("num", cutCls, keep)}>${cut === "b" ? "" : `<span class="mk">${b.n}.</span>`}${inline(soften(b.text))}</p>`;
  if (b.t === "src") return `<p${cls("src", cutCls, keep)}>${inline(soften(b.text))}</p>`;
  if (b.t === "p") {
    const indent = prev === "p" && cut !== "b";
    return `<p${cls(indent ? "" : "ni", cutCls, g, keep)}>${b.lead ? `<span class="lead">${inline(b.lead)}</span> ` : ""}${inline(soften(b.text))}</p>`;
  }
  return fail(`no print form for "${b.t}"`);
}

const headHtml = (b) =>
  `<header class="ch-head"><h1>${b.eyebrow ? `<span class="eyebrow">${inline(b.eyebrow)}</span> ` : ""}<span class="h1t">${inline(b.title)}</span></h1>${b.subtitle ? `<p class="subtitle">${inline(b.subtitle)}</p>` : ""}<div class="rule"></div></header>`;

/**
 * The whole book as one HTML file. `plan` is null on the measuring pass; on
 * the final pass it says where each chapter's opening page ends, where the
 * blank pages go, and each section's page number.
 */
function printHtml(book, plan) {
  const final = !!plan;
  softIndex = 0;
  const full = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
  const out = [];
  out.push(`<div class="cover"><img src="${pathToFileURL(path.join(ROOT, "client/public/covers", `${book.id}.jpg`)).href}" alt="${attr(`The cover of ${full}, by ${book.author}. ${book.cover.alt}`)}"></div>`);
  out.push(`<div class="cover-verso"></div>`);
  out.push(`<div class="fm half"><div class="t">${esc(book.title)}</div></div>`);
  out.push(`<div class="fm-blank"></div>`);
  out.push(`<div class="fm tp"><div class="t">${esc(book.title)}</div>${book.subtitle ? `<div class="s">${esc(book.subtitle)}</div>` : ""}<div class="rule"></div><div class="art">${artSvg(book).svg}</div><div class="a">${esc(book.author)}</div></div>`);
  out.push(`<div class="fm cr"><p>${esc(full)}</p>${copyrightLines(book).map((l) => `<p>${esc(l)}</p>`).join("")}</div>`);
  if (book.dedication.length) out.push(`<div class="fm ded">${book.dedication.map((l) => `<p>${inline(l)}</p>`).join("")}</div>`, `<div class="fm-blank"></div>`);

  const rows = book.sections.map((s) => {
    const pn = final ? plan.folio[s.n] : "000";
    if (s.kind === "part") return `<div class="pt">${esc(s.eyebrow)} · ${esc(s.title)}</div>`;
    const no = s.kind === "chapter" ? chapterNumber(s.eyebrow) : "";
    const lab = s.kind === "chapter" ? "" : `<span class="lab">${esc(labelCase(s.eyebrow))}</span> `;
    return `<div class="row"><span class="no">${no}</span><span class="tt">${lab}${esc(s.title)}</span><span class="pn">${pn}</span></div>`;
  });
  out.push(`<div class="toc"><h1>Contents</h1><div class="rule"></div>${rows.join("")}</div>`);
  if (final && plan.frontBlank) out.push(`<div class="fm-blank"></div>`);

  for (const s of book.sections) {
    if (final && plan.blankBefore[s.n]) out.push(`<div class="blank"></div>`);
    if (s.kind === "part") {
      const b = s.set[0];
      out.push(`<section class="partpage" id="s${s.n}"><h1><span class="eyebrow">${inline(b.label)}</span> <span class="h1t">${inline(b.name)}</span></h1><div class="rule"></div><p class="tag">${inline(b.tag)}</p></section>`);
      continue;
    }
    const blocks = s.set;
    const html = [];
    const cut = final ? plan.cut[s.n] : null;
    // On both passes the chapter's first blocks are broken line by line, so a
    // block split at the page end sets exactly as it did when measured.
    let budget = 3600;
    let prev = null;
    const open = [];
    const rest = [];
    blocks.forEach((b, i) => {
      const greedy = budget > 0;
      if (b.t !== "head") budget -= printText(b).length;
      const target = cut && i < cut.block ? open : rest;
      if (b.t === "head") {
        (cut ? open : rest).push(headHtml(b));
      } else if (cut && i === cut.block && cut.at > 0) {
        const a = { ...b, text: b.text.slice(0, cut.at).trimEnd(), ref: "" };
        const z = { ...b, text: b.text.slice(cut.at).trimStart(), lead: undefined };
        open.push(printBlock(a, prev, { cut: "a", greedy: true }));
        rest.push(printBlock(z, prev, { cut: "b", greedy: true }));
      } else target.push(printBlock(b, prev, { greedy }));
      prev = b.t;
    });
    if (cut) html.push(`<div style="page:open">${open.join("\n")}</div>`, `<div style="page:c${s.n}">${rest.join("\n")}</div>`);
    else html.push(`<div style="page:c${s.n}">${rest.join("\n")}</div>`);
    out.push(`<section id="s${s.n}">${html.join("\n")}</section>`);
  }
  return `<!doctype html>\n<html lang="${book.meta.language}"><head><meta charset="utf-8"><title>${esc(book.title)}</title><style>${printCss(book, { final })}</style></head><body>\n${out.join("\n")}\n</body></html>\n`;
}

/** The text of every page's text block (no running head, no folio), squeezed. */
function pageTexts(pdf) {
  const raw = execFileSync("pdftotext", ["-raw", "-r", "72", "-x", "0", "-y", String(Math.floor(PAGE.top - 6)), "-W", String(PAGE.w), "-H", String(Math.ceil(BLOCK_H + 12)), pdf, "-"], { encoding: "utf8", maxBuffer: 1 << 28 });
  const pages = raw.split("\f");
  if (pages[pages.length - 1].trim() === "") pages.pop();
  return pages.map(squeeze);
}

async function renderPdf(browser, html, file, keep, name) {
  const dir = keep ?? fs.mkdtempSync(path.join(os.tmpdir(), "book-"));
  const htmlFile = path.join(dir, `${name}.html`);
  fs.writeFileSync(htmlFile, html);
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlFile).href);
  await page.evaluate(() => document.fonts.ready);
  // Chromium's own outline lists every heading, run together with its label; the bookmarks are written in stampPdf instead.
  await page.pdf({ path: file, preferCSSPageSize: true, printBackground: true, outline: false, tagged: true });
  await page.close();
  if (!keep) fs.rmSync(dir, { recursive: true, force: true });
}

/** Where every section starts in a rendered PDF, as 0-based page indexes. */
function sectionStarts(book, texts, from = 0) {
  const starts = {};
  let p = from;
  for (const s of book.sections) {
    const want = squeeze(printText(s.set[0]));
    while (p < texts.length && !texts[p].startsWith(want)) p++;
    if (p >= texts.length) fail(`${book.id}: could not find where "${s.eyebrow} ${s.title}" starts in the PDF`);
    starts[s.n] = p++;
  }
  return starts;
}

/**
 * Chromium hyphenates no word that begins with a capital (Christianity,
 * Scripture) and no word with an apostrophe in it (community’s), so a line
 * that ends before one is often set loose. These words get soft hyphens in
 * the print HTML only, at the points Chromium's own dictionary gives the
 * same word in small letters, under the same limits as the body text. A
 * soft hyphen is invisible unless the line breaks there; the text does not
 * change.
 */
const SOFT_WORD = /(?<![\p{L}\p{N}])([A-Z][a-z]{5,}|[a-z]{6,})(?=’s(?![\p{L}])|(?![\p{L}\p{N}’]))/gu;
let SOFT = new Map();
/** Pass three keeps only the soft hyphens a line actually broke at: their numbers, in the order printHtml writes them. */
let SOFT_KEEP = null;
let softIndex = 0;

function softCandidates(book) {
  const words = new Set();
  for (const s of book.sections) {
    for (const b of s.set) {
      if (!["p", "bq", "li", "num", "src"].includes(b.t)) continue;
      const text = `${b.lead ?? ""} ${b.text}`;
      for (const m of text.matchAll(SOFT_WORD)) {
        const w = m[1];
        const possessive = text.slice(m.index + w.length, m.index + w.length + 2) === "’s";
        if (/^[A-Z]/.test(w) || possessive) words.add(w.toLowerCase());
      }
    }
  }
  return [...words].sort();
}

/** Where Chromium would hyphenate each word: the word set in a column exactly as wide as each prefix and a hyphen. */
async function hyphenPoints(browser, words, dir) {
  const file = path.join(dir, "hyphen-probe.html");
  fs.writeFileSync(file, `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>@font-face{font-family:"Source Serif 4";src:url(${fontUrl("source-serif-4-400-latin.woff2")}) format("woff2")}body{margin:0;font:20px/30px "Source Serif 4"}div{hyphens:auto;hyphenate-limit-chars:6 3 3;white-space:normal}span{white-space:pre}</style></head><body><span id="m"></span><main></main></body></html>`);
  const page = await browser.newPage();
  try {
    await page.goto(pathToFileURL(file).href);
    await page.evaluate(() => document.fonts.ready);
    const found = await page.evaluate((words) => {
      const m = document.getElementById("m");
      const main = document.querySelector("main");
      const width = (s) => ((m.textContent = s), m.getBoundingClientRect().width);
      const jobs = [];
      for (const w of words) {
        for (let k = 3; k <= w.length - 3; k++) {
          const d = document.createElement("div");
          d.style.width = `${width(w.slice(0, k) + "\u2010") + 0.5}px`;
          d.textContent = w;
          main.appendChild(d);
          jobs.push([w, k, d]);
        }
      }
      const out = {};
      for (const [w, k, d] of jobs) {
        if (d.getBoundingClientRect().height < 45) continue; // one line: no break
        // The second line starts at the first letter drawn below the first. (A range's first rect at a
        // line break can be the empty end of the line before, so each letter's last rect is read.)
        const t = d.firstChild;
        const top = (i) => {
          const g = document.createRange();
          g.setStart(t, i);
          g.setEnd(t, i + 1);
          const rects = g.getClientRects();
          return rects[rects.length - 1].top;
        };
        const first = top(0);
        let second = -1;
        for (let i = 1; i < w.length && second < 0; i++) if (top(i) > first + 15) second = i;
        if (second === k) (out[w] ??= []).push(k);
      }
      return out;
    }, words);
    return new Map(Object.entries(found));
  } finally {
    await page.close();
  }
}

/** A PDF's lines in reading order, each its words joined by one space (pdftotext -bbox-layout). */
function pdfLines(pdf) {
  const xml = execFileSync("pdftotext", ["-bbox-layout", pdf, "-"], { encoding: "utf8", maxBuffer: 1 << 29 });
  const lines = [];
  for (const m of xml.matchAll(/<line [^>]*>([\s\S]*?)<\/line>/g)) {
    lines.push([...m[1].matchAll(/<word [^>]*>([\s\S]*?)<\/word>/g)].map((w) => decode(w[1])).join(" "));
  }
  return lines;
}

/** For each soft hyphen in a PDF, in reading order: did a line break at it? (Its word then ends the line.) */
function softStates(lines) {
  const states = [];
  for (const line of lines) {
    const words = line.split(" ");
    words.forEach((w, j) => {
      const n = (w.match(/\u00AD/g) ?? []).length;
      for (let q = 0; q < n; q++) states.push(j === words.length - 1 && q === n - 1 && /\u00AD-?$/.test(w));
    });
  }
  return states;
}

/** A run of body text with soft hyphens in the words Chromium will not hyphenate itself. */
function soften(text) {
  if (!SOFT.size) return text;
  return text.replace(SOFT_WORD, (w, _word, offset) => {
    const at = SOFT.get(w.toLowerCase());
    if (!at || !(/^[A-Z]/.test(w) || text.slice(offset + w.length, offset + w.length + 2) === "\u2019s")) return w;
    let out = "";
    let from = 0;
    for (const k of at) {
      if (w[k - 1] === "f" && "fil".includes(w[k])) continue; // never between the letters of a ligature
      const i = softIndex++;
      out += w.slice(from, k) + (SOFT_KEEP === null || SOFT_KEEP.has(i) ? "\u00AD" : "");
      from = k;
    }
    return out + w.slice(from);
  });
}

async function buildPdf(book, outFile, keep) {
  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  const tmp = keep ?? fs.mkdtempSync(path.join(os.tmpdir(), "book-pdf-"));
  try {
    SOFT = await hyphenPoints(browser, softCandidates(book), tmp);
    // Pass one: measure.
    const measured = path.join(tmp, `${book.id}-measure.pdf`);
    await renderPdf(browser, printHtml(book, null), measured, keep, `${book.id}-measure`);
    const texts = pageTexts(measured);
    const starts = sectionStarts(book, texts, 6);
    const front = starts[book.sections[0].n];
    const plan = { cut: {}, blankBefore: {}, folio: {}, start: {}, frontBlank: front % 2 === 1, openText: {} };
    let at = front + (plan.frontBlank ? 1 : 0);
    const bodyStart = at;
    book.sections.forEach((s, i) => {
      const next = book.sections[i + 1];
      const length = (next ? starts[next.n] : texts.length) - starts[s.n];
      if (at % 2 === 1) {
        plan.blankBefore[s.n] = true; // a verso: leave it blank, start on the recto
        at++;
      }
      plan.start[s.n] = at;
      plan.folio[s.n] = at - bodyStart + 1;
      at += length;
      if (s.kind === "part") return;
      // Where the chapter's opening page ends.
      const first = texts[starts[s.n]];
      plan.openText[s.n] = first;
      if (length === 1) return; // the whole chapter is its opening page
      let seen = 0;
      for (let b = 0; b < s.set.length; b++) {
        const text = squeeze(printText(s.set[b]));
        if (seen + text.length <= first.length) {
          if (first.slice(seen, seen + text.length) !== text) fail(`${book.id}: page text does not match the source in "${s.title}", block ${b}`);
          seen += text.length;
          if (seen === first.length) {
            plan.cut[s.n] = { block: b + 1, at: 0 };
            break;
          }
          continue;
        }
        // The page ends inside this block: find the word it ends on.
        const blk = s.set[b];
        if (!["p", "bq", "li", "num", "src"].includes(blk.t)) fail(`${book.id}: a page ends inside a "${blk.t}" in "${s.title}"`);
        const fixed = squeeze(printText({ ...blk, text: "", ref: "" }));
        let need = first.length - seen - fixed.length;
        if (need <= 0) {
          plan.cut[s.n] = { block: b, at: 0 };
          break;
        }
        if (first.slice(seen) !== text.slice(0, first.length - seen)) fail(`${book.id}: page text does not match the source in "${s.title}", block ${b}`);
        let k = 0;
        while (need > 0 && k < blk.text.length) need -= squeeze(blk.text[k++]).length;
        if (k >= blk.text.length) {
          // The page holds all of the quotation and breaks before its reference.
          plan.cut[s.n] = { block: b, at: 0 };
          break;
        }
        // A word hyphenated across the page: the whole word goes over.
        if (!/\s/.test(blk.text[k])) while (k > 0 && !/\s/.test(blk.text[k - 1])) k--;
        plan.cut[s.n] = { block: b, at: k };
        plan.openText[s.n] = first.slice(0, seen) + squeeze(printText({ ...blk, text: blk.text.slice(0, k), ref: "" }));
        break;
      }
      if (!plan.cut[s.n]) fail(`${book.id}: could not find where the opening page of "${s.title}" ends`);
    });
    const total = at;

    // Pass two: the book, set twice. The first time every soft hyphen is in; the second time only those a
    // line broke at, so a reader who searches the PDF for "Christianity" finds every one. Taking out a
    // break a line did not use moves nothing, and the lines are compared to prove it.
    const every = path.join(tmp, `${book.id}-soft.pdf`);
    const html = printHtml(book, plan);
    const softTotal = softIndex;
    await renderPdf(browser, html, every, keep, `${book.id}-soft`);
    const everyLines = pdfLines(every);
    const states = softStates(everyLines);
    if (states.length !== softTotal) fail(`${book.id}: the PDF shows ${states.length} soft hyphens and the HTML has ${softTotal}`);
    SOFT_KEEP = new Set(states.flatMap((broke, i) => (broke ? [i] : [])));
    const raw = path.join(tmp, `${book.id}-raw.pdf`);
    await renderPdf(browser, printHtml(book, plan), raw, keep, `${book.id}-final`);
    const rawLines = pdfLines(raw);
    const plain = (lines) => lines.map((l) => l.replace(/\u00AD/g, "")).join("\n");
    if (plain(rawLines) !== plain(everyLines)) fail(`${book.id}: the lines moved when the unused soft hyphens were taken out`);
    const keptStates = softStates(rawLines);
    if (keptStates.length !== SOFT_KEEP.size || keptStates.some((broke) => !broke)) fail(`${book.id}: a kept soft hyphen is not at a line end`);
    book.stats.softHyphensAtBreaks = SOFT_KEEP.size;
    SOFT_KEEP = null;
    const finalTexts = pageTexts(raw);
    if (finalTexts.length !== total) fail(`${book.id}: the second pass has ${finalTexts.length} pages, the plan ${total}`);
    const finalStarts = sectionStarts(book, finalTexts, 6);
    for (const s of book.sections) {
      if (finalStarts[s.n] !== plan.start[s.n]) fail(`${book.id}: "${s.title}" starts on page ${finalStarts[s.n] + 1}, the plan said ${plan.start[s.n] + 1}`);
      if (finalStarts[s.n] % 2 !== 0) fail(`${book.id}: "${s.title}" does not start on a recto`);
      if (s.kind !== "part" && plan.cut[s.n] && finalTexts[finalStarts[s.n]] !== plan.openText[s.n]) {
        const a = finalTexts[finalStarts[s.n]];
        const b = plan.openText[s.n];
        fail(`${book.id}: the opening page of "${s.title}" set differently on the second pass (${a.length} against ${b.length} characters; it ends "${a.slice(-40)}", measured "${b.slice(-40)}")`);
      }
    }
    for (const [n, yes] of Object.entries(plan.blankBefore)) {
      if (yes && finalTexts[plan.start[n] - 1] !== "") fail(`${book.id}: the page before section ${n} should be blank`);
    }

    const labels = [[0, "/P (Cover)"], [2, "/S /r"], [bodyStart, "/S /D"]];
    // The bookmarks: the contents, then the sections as the EPUB's contents lists them.
    const contentsPage = finalTexts.findIndex((t, i) => i > 1 && t.startsWith("Contents"));
    if (contentsPage < 0) fail(`${book.id}: no contents page in the PDF`);
    const outline = [
      { title: "Contents", page: contentsPage },
      ...contentsTree(book).map((li) => ({ title: tocLabel(li.s), page: plan.start[li.s.n], kids: li.kids.map((k) => ({ title: tocLabel(k.s), page: plan.start[k.s.n] })) })),
    ];
    fs.writeFileSync(outFile, stampPdf(fs.readFileSync(raw), { title: book.title, author: book.author, subject: book.subtitle, labels, outline }));
    return { pages: total, bodyStart, plan, texts: finalTexts };
  } finally {
    await browser.close();
    if (!keep) fs.rmSync(tmp, { recursive: true, force: true });
  }
}

/** A PDF text string: UTF-16BE with a byte-order mark, as hex. */
const pdfString = (s) => `<FEFF${[...s].map((ch) => [...Buffer.from(ch, "utf16le").swap16()].map((b) => b.toString(16).padStart(2, "0")).join("")).join("").toUpperCase()}>`;

/**
 * Title, author, subject, page labels and the bookmarks, written after
 * Chromium's own file as an incremental update (new versions of the catalog
 * and the info dictionary, the outline as new objects, a second
 * cross-reference section), so nothing Chromium wrote is disturbed.
 * `outline` is [{ title, page, kids? }], `page` a 0-based page index.
 */
function stampPdf(buf, { title, author, subject, labels, outline }) {
  const text = buf.toString("latin1");
  const xrefAt = Number(/startxref\s+(\d+)\s+%%EOF\s*$/.exec(text)?.[1] ?? fail("the PDF has no startxref"));
  if (text.slice(xrefAt, xrefAt + 4) !== "xref") fail("the PDF does not end in a plain cross-reference table");
  const trailer = /trailer\s*<<([\s\S]*?)>>\s*startxref/.exec(text.slice(xrefAt))?.[1] ?? fail("the PDF has no trailer");
  const size = Number(/\/Size (\d+)/.exec(trailer)[1]);
  const root = Number(/\/Root (\d+) 0 R/.exec(trailer)[1]);
  const info = Number(/\/Info (\d+) 0 R/.exec(trailer)?.[1] ?? size);
  const offsets = [];
  const table = /^xref\s+0 (\d+)\s+([\s\S]*?)trailer/.exec(text.slice(xrefAt)) ?? fail("the cross-reference table is not one section");
  for (const m of table[2].matchAll(/(\d{10}) \d{5} [nf]/g)) offsets.push(Number(m[1]));
  const object = (n) => {
    const at = offsets[n];
    const end = text.indexOf("endobj", at);
    return text.slice(at, end);
  };
  const oldInfo = info < size ? object(info) : "";
  const keep = (key) => new RegExp(`/${key} \\(([^)]*)\\)`).exec(oldInfo)?.[0] ?? "";
  const catalog = object(root).replace(/^\d+ 0 obj\s*/, "").trim();
  if (!catalog.startsWith("<<") || !catalog.endsWith(">>")) fail("the PDF's catalog is not a plain dictionary");
  if (/\/(Outlines|PageLabels)\b/.test(catalog)) fail("the PDF's catalog already has an outline or page labels");

  // The pages in order, from the page tree.
  const pages = [];
  const walk = (n) => {
    const body = object(n);
    if (/\/Type\s*\/Pages\b/.test(body)) {
      const kids = /\/Kids\s*\[([^\]]*)\]/.exec(body)?.[1] ?? fail(`page tree node ${n} has no /Kids`);
      for (const m of kids.matchAll(/(\d+) 0 R/g)) walk(Number(m[1]));
    } else if (/\/Type\s*\/Page\b/.test(body)) pages.push(n);
    else fail(`object ${n} in the page tree is neither /Pages nor /Page`);
  };
  walk(Number(/\/Pages (\d+) 0 R/.exec(catalog)?.[1] ?? fail("the catalog has no /Pages")));

  // The outline: one object per entry, numbered from the old /Size on.
  let next = Math.max(size, info + 1);
  const objects = [];
  const outlineRoot = next++;
  const place = (items, parent) => {
    const ids = items.map(() => next++);
    let visible = 0;
    items.forEach((item, i) => {
      if (item.page == null || item.page < 0 || item.page >= pages.length) fail(`the bookmark "${item.title}" points at no page`);
      const kids = item.kids?.length ? place(item.kids, ids[i]) : null;
      visible += 1 + (kids ? kids.count : 0);
      const dict = [
        `/Title ${pdfString(item.title)}`,
        `/Parent ${parent} 0 R`,
        i > 0 ? `/Prev ${ids[i - 1]} 0 R` : "",
        i < items.length - 1 ? `/Next ${ids[i + 1]} 0 R` : "",
        kids ? `/First ${kids.first} 0 R /Last ${kids.last} 0 R /Count ${kids.count}` : "",
        `/Dest [${pages[item.page]} 0 R /Fit]`,
      ].filter(Boolean);
      objects.push([ids[i], `<< ${dict.join(" ")} >>`]);
    });
    return { first: ids[0], last: ids[ids.length - 1], count: visible };
  };
  const top = place(outline, outlineRoot);
  objects.push([outlineRoot, `<< /Type /Outlines /First ${top.first} 0 R /Last ${top.last} 0 R /Count ${top.count} >>`]);

  const nums = labels.map(([page, style]) => `${page} << ${style} >>`).join(" ");
  const prefs = /\/ViewerPreferences\b/.test(catalog) ? "" : "\n/ViewerPreferences << /DisplayDocTitle true >>";
  const newCatalog = `${catalog.slice(0, -2)}/PageLabels << /Nums [ ${nums} ] >>\n/Outlines ${outlineRoot} 0 R${prefs} >>`;
  const newInfo = `<< /Title ${pdfString(title)} /Author ${pdfString(author)}${subject ? ` /Subject ${pdfString(subject)}` : ""} ${keep("Creator")} ${keep("Producer")} ${keep("CreationDate")} ${keep("ModDate")} >>`;
  let out = "\n";
  const at = {};
  for (const [n, body] of [[root, newCatalog], [info, newInfo], ...objects]) {
    at[n] = buf.length + out.length;
    out += `${n} 0 obj\n${body}\nendobj\n`;
  }
  const xref = buf.length + out.length;
  out += "xref\n";
  for (const n of Object.keys(at).map(Number).sort((a, b) => a - b)) out += `${n} 1\n${String(at[n]).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${next} /Root ${root} 0 R /Info ${info} 0 R /Prev ${xrefAt} >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.concat([buf, Buffer.from(out, "latin1")]);
}

// ── the proof ─────────────────────────────────────────────────────────────

const straight = (w) => w.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

/** The body words of an EPUB's chapters, in spine order, tags and entities resolved. */
function epubBodyWords(entries, sectionFiles, { markers }) {
  const words = [];
  for (const file of sectionFiles) {
    const e = entries.find((x) => x.name === `OEBPS/${file}`) ?? fail(`the EPUB has no ${file}`);
    let body = /<body[^>]*>([\s\S]*)<\/body>/.exec(e.data.toString("utf8"))[1];
    if (markers) {
      // The new EPUB's lists are real lists: give each item back the mark the reader's software draws.
      body = body.replace(/<ul>([\s\S]*?)<\/ul>/g, (m, inner) => inner.replace(/<li>/g, "<li>• "));
      body = body.replace(/<ol>([\s\S]*?)<\/ol>/g, (m, inner) => {
        let n = 0;
        return inner.replace(/<li>/g, () => `<li>${++n}. `);
      });
    }
    body = body.replace(/<\/(p|h1|h2|h3|li|cite|blockquote|header|div)>/g, " ").replace(/<[^>]+>/g, "");
    words.push(...decode(body).split(/\s+/).filter(Boolean));
  }
  return words;
}

/**
 * The proof. The source folder's words, changed only by the listed
 * typesetting rules, must be the new EPUB's words; and the same words,
 * squeezed, must be the text on the new PDF's pages. A book that has not
 * been edited (no `edited` in its book.json) must also have a source folder
 * that is, word for word, its original EPUB.
 */
function verify(book, epubFile, pdfInfo) {
  const original = path.join(ORIGINALS, book.meta.original.epub);
  const oldEntries = unzip(fs.readFileSync(original));
  const files = book.sections.map((s) => s.file);
  // Sections (and a dedication) that the original PDF carried and the original EPUB did not.
  const fromPdf = new Set(book.meta.fromOriginalPdf ?? []);
  const oldWords = epubBodyWords(oldEntries, files.filter((f) => !fromPdf.has(f)), { markers: false });
  const srcWords = book.sections.flatMap((s) => sourceWords(s.source));
  const srcEpubWords = book.sections.filter((s) => !fromPdf.has(s.file)).flatMap((s) => sourceWords(s.source));
  const edited = book.meta.edited ?? null;
  const report = { book: book.id, source: `content/books-src/${book.id}`, sourceWords: srcWords.length, original: path.relative(ROOT, original), oldEpubWords: oldWords.length, differences: [] };
  // 1. An unedited book's source folder is the original EPUB's text. An edited book's is not, by the author's
  //    instruction; what the edit kept is proved by the fact diff in the record `edited` names.
  if (edited) {
    if (!edited.date || !edited.instruction || !edited.record || !fs.existsSync(path.join(ROOT, edited.record))) fail(`${book.id}: book.json's \`edited\` needs a date, the instruction and a record that exists`);
    report.edited = { ...edited, sourceIsOriginal: oldWords.join(" ") === srcEpubWords.join(" ") };
  } else if (oldWords.join(" ") !== srcEpubWords.join(" ")) report.differences.push("content/books-src is not the text of the original EPUB, and book.json records no edit");
  // 1b. What the source takes from the original PDF (part pages, a dedication) is in that PDF, letter for letter.
  if (fromPdf.size || (book.meta.dedication ?? []).length) {
    const letters = (t) => t.normalize("NFKD").replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    const oldPdf = letters(execFileSync("pdftotext", ["-raw", path.join(ORIGINALS, book.meta.original.pdf), "-"], { encoding: "utf8", maxBuffer: 1 << 28 }));
    const missing = [];
    for (const s of book.sections) if (fromPdf.has(s.file) && !oldPdf.includes(letters(sourceWords(s.source).join(" ")))) missing.push(s.file);
    if ((book.meta.dedication ?? []).length && !oldPdf.includes(letters(book.meta.dedication.join(" ")))) missing.push("the dedication");
    if (missing.length) report.differences.push(`not found in the original PDF: ${missing.join(", ")}`);
    report.fromOriginalPdf = { sections: [...fromPdf], dedication: (book.meta.dedication ?? []).length > 0, found: missing.length === 0 };
  }
  // 2. The set text is the source text with only the listed changes.
  const expected = book.sections.flatMap((s) => setWords(s.set));
  const rules = (w) =>
    w
      .join(" ")
      .replace(/(^| )\*(Key Takeaways|Reflection Questions|Practices|Sources & Notes)\*(?= |$)/g, "$1$2")
      .replace(/\\([._])/g, "$1")
      .replace(/([.!?])\*(?= )/g, "$1")
      .split(" ");
  // Marks at the head of a list item are compared apart from the words.
  const isMark = (w) => w === "-" || w === "•";
  const a = rules(srcWords).map(straight).filter((w) => !isMark(w));
  const b = expected.map(straight).filter((w) => !isMark(w));
  report.wordsCompared = a.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) {
      report.differences.push(`source and typeset text part at word ${i}: "${a.slice(i, i + 8).join(" ")}" against "${b.slice(i, i + 8).join(" ")}"`);
      break;
    }
  }
  const marksOld = rules(srcWords).filter(isMark).length;
  const marksNew = expected.filter(isMark).length;
  if (marksOld - book.stats.sourceHyphensDropped !== marksNew) report.differences.push(`list marks: ${marksOld} in the source, ${book.stats.sourceHyphensDropped} dropped, ${marksNew} set`);
  report.listMarks = { source: marksOld, droppedBeforeSources: book.stats.sourceHyphensDropped, set: marksNew };
  // 3. The new EPUB carries exactly the set text.
  if (epubFile) {
    const newWords = epubBodyWords(unzip(fs.readFileSync(epubFile)), files, { markers: true });
    report.newEpubWords = newWords.length;
    for (let i = 0; i < Math.max(newWords.length, expected.length); i++) {
      if (newWords[i] !== expected[i]) {
        report.differences.push(`new EPUB and typeset text part at word ${i}: "${newWords.slice(i, i + 8).join(" ")}" against "${expected.slice(i, i + 8).join(" ")}"`);
        break;
      }
    }
  }
  // 4. The new PDF's pages carry exactly the set text.
  if (pdfInfo) {
    const want = squeeze(book.sections.flatMap((s) => s.set.map(printText)).join(""));
    const got = pdfInfo.texts.slice(pdfInfo.bodyStart).join("");
    report.pdfBodyCharacters = { expected: want.length, onThePages: got.length };
    if (want !== got) {
      let i = 0;
      while (i < want.length && want[i] === got[i]) i++;
      report.differences.push(`the PDF's text parts from the typeset text at character ${i}: "${got.slice(i, i + 60)}" against "${want.slice(i, i + 60)}"`);
    }
    const words = execFileSync("pdftotext", ["-f", String(pdfInfo.bodyStart + 1), "-r", "72", "-x", "0", "-y", String(Math.floor(PAGE.top - 6)), "-W", String(PAGE.w), "-H", String(Math.ceil(BLOCK_H + 12)), pdfInfo.file, "-"], { encoding: "utf8", maxBuffer: 1 << 28 });
    report.pdfBodyWordsAsExtracted = words.replace(/(\p{L})[-‐]\n(\p{Ll})/gu, "$1$2").split(/\s+/).filter(Boolean).length;
  }
  report.typesetting = book.stats;
  report.identical = report.differences.length === 0;
  return report;
}

// ── run ───────────────────────────────────────────────────────────────────

async function main() {
  const ids = flag("all")
    ? fs.readdirSync(SRC).filter((d) => fs.existsSync(path.join(SRC, d, "book.json")))
    : args.filter((a, i) => !a.startsWith("--") && !["--out", "--keep"].includes(args[i - 1]));
  if (!ids.length) fail("name a book (its folder under content/books-src/) or pass --all");
  const keep = opt("keep");
  if (keep) fs.mkdirSync(keep, { recursive: true });
  let bad = false;
  for (const id of ids) {
    const book = loadBook(id);
    const outDir = opt("out") ?? path.join(ROOT, "client/public/ebook", id);
    fs.mkdirSync(outDir, { recursive: true });
    const epubFile = path.join(outDir, book.meta.files.epub);
    const pdfFile = path.join(outDir, book.meta.files.pdf);
    await buildEpub(book, epubFile);
    const pdf = await buildPdf(book, pdfFile, keep);
    const line = { book: id, title: book.title, pdf: path.relative(ROOT, pdfFile), pages: pdf.pages, pdfBytes: fs.statSync(pdfFile).size, epub: path.relative(ROOT, epubFile), epubBytes: fs.statSync(epubFile).size, sha256: { pdf: sha(pdfFile), epub: sha(epubFile) } };
    console.log(JSON.stringify(line, null, 2));
    if (flag("verify")) {
      const report = verify(book, epubFile, { ...pdf, file: pdfFile });
      console.log(JSON.stringify(report, null, 2));
      if (!report.identical) bad = true;
    } else console.log(JSON.stringify({ typesetting: book.stats }, null, 2));
  }
  if (bad) {
    console.error("build-book-files: the text is NOT identical. See the differences above.");
    process.exit(1);
  }
}

const sha = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
