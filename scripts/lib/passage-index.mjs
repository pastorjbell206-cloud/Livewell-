/**
 * passage-index.mjs: for every Bible chapter, the pages on this site that
 * treat that chapter or a passage inside it ("Go deeper" on a chapter).
 *
 * Built only from references the libraries already carry in their own data.
 * Nothing is guessed from a title or a keyword. The rule, by kind:
 *
 *   question    Honest Answers (client/src/data/answers.ts): every passage
 *               the answer cites in its three paragraphs. An answer is three
 *               paragraphs; each verse it names is there on purpose.
 *   doctrine    Doctrine studies (client/public/bible/doctrines/<id>.json):
 *               every one of the study's key texts (keyTexts).
 *   history     Church history lessons (client/public/history/essays/): a
 *               passage the lesson quotes, that is a reference written beside
 *               a quotation ('..." (Acts 2:42)'). A long lesson's passing
 *               mention of a verse is not counted.
 *   background  Bible background guides (client/public/context/guides/):
 *               every one of the guide's key texts (keyTexts).
 *   guide       Study guides (client/public/studyguides/<slug>.json): each
 *               session's key Scripture (sessions[].keyScripture). The longer
 *               lists of texts a session reads along the way are not counted.
 *   devotion    Family devotions (client/public/family/index.json, live ones
 *               only): the devotion's passage.
 *   catechism   The family catechism (client/public/family-catechism.json):
 *               the question's proof text.
 *   care        Find Help pages (client/public/needs/<slug>.json): the
 *               passages the page prints in full (scripture.passages).
 *   plan        Eight-week plans (client/public/plans/<slug>.json): a week
 *               that sends the reader to the chapter in the Study Bible as its
 *               reading or its tool.
 *   essay       Essays, only while public (scripts/lib/shelf.mjs): a passage
 *               the essay quotes, as for a history lesson. The text is the rewrite in
 *               client/public/essays/ where there is one, otherwise the
 *               committed static library.
 *   wisdom      Wisdom topics (client/public/wisdom/topics.json): the verses
 *               the topic prints in full (verses[]).
 *   practice    The tools (client/src/data/tool-offers.json): the passages a
 *               tool is offered beside, by hand and only where the tool does
 *               a job the passage raises. The tool's name is the one in
 *               client/src/lib/toolsList.ts, read as text; a tool folded into
 *               another is left out.
 *   tool        "Read any verse in context" (/theology/passage): the chapters
 *               it has a passage guide for
 *               (bible/notes-index.json, "passages").
 *
 * A reference names chapters; an item is listed on each chapter its passage
 * touches, once, under the first passage it gives for that chapter. A
 * reference that runs over more than MAX_SPAN chapters (a whole book) is
 * not a passage the item treats and is left out.
 *
 * Output: client/public/index/chapters/<book>/<n>.json, one small file for
 * each chapter that has something, so a chapter fetches only its own piece:
 *
 *   [{ "k": "question", "t": "Did the resurrection actually happen?", "h": "/answers/...", "p": "1 Corinthians 15:3-8" }, ...]
 *
 * k is the kind, t the title, h the address, p the passage as the item names
 * it within this chapter. Rows are in KIND_ORDER, then in the library's own
 * order. Beside them, client/public/index/chapters.json lists which chapters
 * have a file, so the page never asks for one that is not there. Run with tsx (answers.ts and the reference finder are TypeScript):
 *
 *   pnpm exec tsx scripts/build-passage-index.mjs           write the files
 *   pnpm exec tsx scripts/build-passage-index.mjs --check   exit 1 on drift (CI)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ANSWERS, answerText } from "../../client/src/data/answers.ts";
import { findScriptureRefs } from "../../client/src/lib/scripture-find.ts";
import { parseScriptureRef, formatRef } from "../../client/src/lib/scripture-ref.ts";
import { loadEssayShelf, loadShelfData } from "./shelf.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PUB = path.join(ROOT, "client/public");
export const OUT_DIR = path.join(PUB, "index/chapters");
/**
 * The list of chapters that have a file ({ "<book>": [n, ...] }), so a
 * chapter with nothing is known without asking for a file that is not there.
 */
export const LIST_FILE = path.join(PUB, "index/chapters.json");

/** The kinds, in the order a chapter lists them. */
export const KIND_ORDER = ["film", "question", "doctrine", "history", "background", "guide", "devotion", "catechism", "care", "plan", "wisdom", "essay", "practice", "tool"];

/** A reference over more chapters than this names a book or a long stretch, not a passage. */
export const MAX_SPAN = 4;

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(PUB, rel), "utf8"));
const exists = (rel) => fs.existsSync(path.join(PUB, rel));

// ── references ─────────────────────────────────────────────────────────────

/** The chapters a parsed reference touches, each with the passage it names there. */
function chaptersOf(ref) {
  const out = new Map();
  for (const p of ref.parts) {
    if (p.c2 - p.c1 + 1 > MAX_SPAN) continue;
    for (let c = p.c1; c <= p.c2; c++) {
      const v1 = c === p.c1 ? p.v1 : 1;
      const v2 = c === p.c2 ? p.v2 : Infinity;
      const label = formatRef({ book: ref.book, parts: [{ c1: c, v1, c2: c, v2 }] });
      if (!out.has(c)) out.set(c, label);
    }
  }
  return [...out].map(([chapter, label]) => ({ slug: ref.book.slug, chapter, label }));
}

/** A reference string from a library's own field. */
function fieldRefs(s) {
  const r = parseScriptureRef(String(s ?? ""));
  return r ? chaptersOf(r) : [];
}

const OPEN_Q = /^[)\]]?[:,.]?\s?[“"]/;
const CLOSE_Q = /[”"][.,;!?]?$/;

/**
 * The passages a stretch of prose quotes: a reference written straight after
 * a quotation ('..." (John 3:16)', '..." John 3:16') or straight before one
 * ('Proverbs 4:26: "Make ...'). A reference standing alone is a mention.
 */
export function quotedRefs(text) {
  const out = [];
  for (const f of findScriptureRefs(String(text ?? ""))) {
    const before = text.slice(Math.max(0, f.start - 8), f.start).replace(/[\s([]+$/, "");
    const after = text.slice(f.end, f.end + 5);
    if (CLOSE_Q.test(before) || OPEN_Q.test(after)) out.push(...chaptersOf(f.ref));
  }
  return out;
}

// ── the libraries ──────────────────────────────────────────────────────────

function answers() {
  return ANSWERS.map((a) => ({
    kind: "question",
    title: a.question,
    href: `/answers/${a.slug}`,
    at: answerText(a).flatMap((p) => findScriptureRefs(p).flatMap((f) => chaptersOf(f.ref))),
  }));
}

function doctrines() {
  const { doctrines: list } = readJson("bible/doctrines.json");
  return list
    .filter((d) => exists(`bible/doctrines/${d.id}.json`))
    .map((d) => ({
      kind: "doctrine",
      title: d.name,
      href: `/study/bible/doctrines/${d.id}`,
      at: (readJson(`bible/doctrines/${d.id}.json`).keyTexts ?? []).flatMap((k) => fieldRefs(k?.ref)),
    }));
}

/** The prose of a history lesson or a background guide: its sections' bodies. */
const sectionText = (doc) => (doc.sections ?? []).map((s) => s?.body ?? "").join("\n\n");

function history() {
  const { essays } = readJson("history/essays-index.json");
  return essays
    .filter((e) => exists(`history/essays/${e.slug}.json`))
    .map((e) => ({
      kind: "history",
      title: e.title,
      href: `/theology/history/${e.slug}`,
      at: quotedRefs(sectionText(readJson(`history/essays/${e.slug}.json`))),
    }));
}

function background() {
  const { guides } = readJson("context/guides-index.json");
  return guides
    .filter((g) => exists(`context/guides/${g.slug}.json`))
    .map((g) => ({
      kind: "background",
      title: g.title,
      href: `/resources/context/${g.slug}`,
      at: (readJson(`context/guides/${g.slug}.json`).keyTexts ?? []).flatMap(fieldRefs),
    }));
}

function studyGuides() {
  const { guides } = readJson("studyguides/index.json");
  return guides
    .filter((g) => exists(`studyguides/${g.slug}.json`))
    .map((g) => ({
      kind: "guide",
      title: g.title,
      href: `/studyguides/${g.slug}`,
      at: (readJson(`studyguides/${g.slug}.json`).sessions ?? []).flatMap((s) => fieldRefs(s?.keyScripture?.ref)),
    }));
}

function devotions() {
  return readJson("family/index.json").devotions.map((d) => ({
    kind: "devotion",
    title: d.title,
    href: `/family/devotions/${d.id}`,
    at: fieldRefs(d.passage),
  }));
}

function catechism() {
  return readJson("family-catechism.json").map((q) => ({
    kind: "catechism",
    title: `Question ${q.number}: ${q.question}`,
    href: `/family/catechism#q${q.number}`,
    at: fieldRefs(q.scripture),
  }));
}

function care() {
  return readJson("needs/index.json").needs
    .filter((n) => exists(`needs/${n.slug}.json`))
    .map((n) => ({
      kind: "care",
      title: n.title,
      href: `/help/${n.slug}`,
      at: (readJson(`needs/${n.slug}.json`).scripture?.passages ?? []).flatMap((p) => fieldRefs(p?.ref)),
    }));
}

const CHAPTER_HREF = /^\/study\/bible\/([a-z0-9-]+)\/(\d+)(?:#v(\d+))?$/;

function plans() {
  const books = new Map(readJson("bible/books.json").map((b) => [b.slug, b]));
  return readJson("plans/plans-index.json").plans
    .filter((p) => exists(`plans/${p.slug}.json`))
    .map((p) => {
      const at = [];
      for (const w of readJson(`plans/${p.slug}.json`).weeks ?? []) {
        for (const link of [w?.read, w?.tool]) {
          const m = String(link?.href ?? "").match(CHAPTER_HREF);
          const book = m && books.get(m[1]);
          if (!book || +m[2] < 1 || +m[2] > book.chapters) continue;
          at.push({ slug: book.slug, chapter: +m[2], label: `${book.slug === "psalms" ? "Psalm" : book.name} ${m[2]}`, week: w.n });
        }
      }
      return { kind: "plan", title: p.title, href: `/plans/${p.slug}`, at };
    });
}

function wisdom() {
  return readJson("wisdom/topics.json").topics.map((t) => ({
    kind: "wisdom",
    title: t.label,
    href: `/wisdom/${t.id}`,
    at: (t.verses ?? []).flatMap((v) => fieldRefs(v?.ref)),
  }));
}

/** The text of a public essay: the rewrite when there is one, else the static library. */
function essays() {
  const shelf = loadEssayShelf(ROOT);
  const staticLib = (() => {
    try {
      return JSON.parse(fs.readFileSync(path.join(ROOT, "content/static-library.generated.json"), "utf8"));
    } catch {
      return [];
    }
  })();
  const bySlug = new Map(staticLib.filter((r) => r?.slug).map((r) => [r.slug, r]));
  const out = [];
  for (const e of shelf.liveEssays()) {
    const rewrite = shelf.overrideRecords.get(e.slug);
    const row = bySlug.get(e.slug);
    const body = rewrite?.body ?? row?.body ?? "";
    out.push({ kind: "essay", title: rewrite?.title ?? e.title, href: `/writing/${e.slug}`, slug: e.slug, at: quotedRefs(body) });
  }
  return out;
}

function passageGuides() {
  const { passages } = readJson("bible/notes-index.json");
  const books = new Map(readJson("bible/books.json").map((b) => [b.slug, b]));
  return passages.map((key) => {
    const [slug, n] = key.split("/");
    const name = `${slug === "psalms" ? "Psalm" : books.get(slug)?.name ?? slug} ${n}`;
    return {
      kind: "tool",
      title: `${name} in context`,
      href: `/theology/passage?ref=${encodeURIComponent(name)}`,
      at: books.has(slug) ? [{ slug, chapter: +n, label: name }] : [],
    };
  });
}

/**
 * The Bible Explorer's moving pictures: a finished film is offered on each
 * chapter one of its pictures quotes, and on the chapters it sends the reader
 * to ("Where the Bible says it").
 */
function films() {
  const { films: list } = readJson("explorer/films.json");
  return list
    .filter((f) => f.status === "finished" && exists(`explorer/films/${f.slug}.json`))
    .map((f) => {
      const film = readJson(`explorer/films/${f.slug}.json`);
      const read = (film.read ?? []).flatMap((r) => {
        const m = String(r.href ?? "").match(/^\/study\/bible\/([a-z0-9-]+)\/(\d+)$/);
        return m ? [{ slug: m[1], chapter: +m[2], label: r.label }] : [];
      });
      return {
        kind: "film",
        title: f.title,
        href: `/study/explorer/watch/${f.slug}`,
        at: [...(film.frames ?? []).flatMap((fr) => fieldRefs(fr.verse?.ref)), ...read],
      };
    });
}

/** The listed tools by id, from toolsList.ts read as text (it imports icons a script cannot use). */
export function listedTools() {
  const src = fs.readFileSync(path.join(ROOT, "client/src/lib/toolsList.ts"), "utf8");
  const tools = new Map();
  const re = /id: "([^"]+)",\s*\n\s*name: "([^"]+)",[\s\S]*?href: "([^"]+)",(\s*\n\s*replacedBy: "[^"]+")?/g;
  let m;
  while ((m = re.exec(src))) if (!m[4]) tools.set(m[1], { name: m[2], href: m[3] });
  return tools;
}

function toolOffers() {
  const { offers } = JSON.parse(fs.readFileSync(path.join(ROOT, "client/src/data/tool-offers.json"), "utf8"));
  const tools = listedTools();
  const out = [];
  for (const o of offers) {
    const tool = tools.get(o.tool);
    if (!tool) continue;
    out.push({ kind: "practice", title: tool.name, href: tool.href, at: (o.passages ?? []).flatMap((ref) => fieldRefs(ref)) });
  }
  return out;
}

/** Every item from every library, with the chapters it treats. */
export function collectItems() {
  return [
    ...films(),
    ...answers(),
    ...doctrines(),
    ...history(),
    ...background(),
    ...studyGuides(),
    ...devotions(),
    ...catechism(),
    ...care(),
    ...plans(),
    ...wisdom(),
    ...essays(),
    ...toolOffers(),
    ...passageGuides(),
  ];
}

// ── the index ──────────────────────────────────────────────────────────────

/** chapter key ("john/3") -> rows, in kind order then library order. */
export function buildPassageIndex(items = collectItems()) {
  const byChapter = new Map();
  for (const it of items) {
    const seen = new Set();
    for (const a of it.at) {
      const key = `${a.slug}/${a.chapter}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!byChapter.has(key)) byChapter.set(key, []);
      byChapter.get(key).push({ k: it.kind, t: it.title, h: it.href, p: a.label });
    }
  }
  const rank = new Map(KIND_ORDER.map((k, i) => [k, i]));
  for (const rows of byChapter.values()) rows.sort((a, b) => rank.get(a.k) - rank.get(b.k));
  return byChapter;
}

/** The files the index is written as: relative path -> text. */
export function renderFiles(index = buildPassageIndex()) {
  const files = new Map();
  const keys = [...index.keys()].sort();
  for (const key of keys) {
    const [slug, n] = key.split("/");
    files.set(`${slug}/${n}.json`, JSON.stringify(index.get(key)) + "\n");
  }
  return files;
}

/** The text of LIST_FILE for these files: each book's chapters that have one, in order. */
export function renderList(files) {
  const list = {};
  for (const rel of [...files.keys()].sort()) {
    const [slug, f] = rel.split("/");
    (list[slug] ??= []).push(Number(f.replace(/\.json$/, "")));
  }
  for (const n of Object.values(list)) n.sort((a, b) => a - b);
  return JSON.stringify(list) + "\n";
}

const LIST_REL = path.relative(OUT_DIR, LIST_FILE);
const readText = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

function listExisting(dir = OUT_DIR) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const book of fs.readdirSync(dir)) {
    const bd = path.join(dir, book);
    if (!fs.statSync(bd).isDirectory()) continue;
    for (const f of fs.readdirSync(bd)) if (f.endsWith(".json")) out.push(`${book}/${f}`);
  }
  return out;
}

/** What --check reports: files that differ, are missing, or have nothing behind them. */
export function passageIndexDrift(files = renderFiles()) {
  const existing = new Set(listExisting());
  const stale = [];
  const missing = [];
  for (const [rel, text] of files) {
    if (!existing.has(rel)) missing.push(rel);
    else if (fs.readFileSync(path.join(OUT_DIR, rel), "utf8") !== text) stale.push(rel);
    existing.delete(rel);
  }
  const list = readText(LIST_FILE);
  if (list === null) missing.push(LIST_REL);
  else if (list !== renderList(files)) stale.push(LIST_REL);
  return { count: files.size, stale, missing, extra: [...existing] };
}

export function writePassageIndex(files = renderFiles()) {
  const keep = new Set(files.keys());
  let written = 0;
  let removed = 0;
  for (const [rel, text] of files) {
    const p = path.join(OUT_DIR, rel);
    if (fs.existsSync(p) && fs.readFileSync(p, "utf8") === text) continue;
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, text);
    written++;
  }
  for (const rel of listExisting()) {
    if (keep.has(rel)) continue;
    fs.rmSync(path.join(OUT_DIR, rel));
    removed++;
  }
  const list = renderList(files);
  if (readText(LIST_FILE) !== list) {
    fs.writeFileSync(LIST_FILE, list);
    written++;
  }
  return { count: files.size, written, removed };
}

/** Counts for the report: rows and items by kind, and chapters covered. */
export function passageIndexStats(items = collectItems(), index = buildPassageIndex(items)) {
  const byKind = {};
  for (const k of KIND_ORDER) byKind[k] = { items: 0, itemsWithPassage: 0, rows: 0, chapters: 0 };
  for (const it of items) {
    byKind[it.kind].items++;
    if (it.at.length) byKind[it.kind].itemsWithPassage++;
  }
  for (const rows of index.values()) {
    const kinds = new Set();
    for (const r of rows) {
      byKind[r.k].rows++;
      kinds.add(r.k);
    }
    for (const k of kinds) byKind[k].chapters++;
  }
  return { chapters: index.size, byKind };
}

export { loadShelfData };
