#!/usr/bin/env node
/**
 * build-pray-psalms.mjs: the files Pray the Psalms reads
 * (/tools/pray-the-psalms), built from one hand-written source,
 * client/public/pray-psalms/psalms.json (each psalm's kinds, the times of
 * life it fits, a line on what it prays and a guide to praying it), the
 * Berean Standard Bible in client/public/bible/ch/psalms/ (every verse, never
 * typed by hand), and the Study Bible's notes on the Psalms in
 * client/public/bible/notes/psalms/ (each psalm's title, summary and outline,
 * the plain notes' care paragraphs, and four parts of the book page), all
 * copied word for word.
 *
 * Writes, under client/public/pray-psalms/:
 *   index.json        the kinds, the "when" tags with their psalms, all 150
 *                     psalms in brief, the morning and evening plan, and the
 *                     teaching panels
 *   psalm/<n>.json    one psalm: its text, the stanzas for slow reading (the
 *                     Study Bible's outline), its kinds with the note's own
 *                     words, the line, the guide, the care paragraphs
 *
 *   node scripts/build-pray-psalms.mjs           write the files
 *   node scripts/build-pray-psalms.mjs --check   fail if any differ (CI)
 *
 * scripts/validate-pray-psalms.mjs checks the source and the result.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { passage } from "./lib/bsb.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "client/public/pray-psalms/psalms.json");
const OUT = path.join(ROOT, "client/public/pray-psalms");
const NOTES = path.join(ROOT, "client/public/bible/notes/psalms");
const CHECK = process.argv.includes("--check");
const readJson = (f) => JSON.parse(fs.readFileSync(f, "utf8"));

/** The book page's parts shown on the page, by id. */
export const TEACHING = { minute: "in-a-minute", howTo: "how-to-pray", kinds: "kinds-of-psalm", cursing: "cursing-psalms" };
/** The longest stretch shown at once in the slow reading; longer outline parts are split evenly. */
export const MAX_STANZA = 10;

export const note = (n) => readJson(path.join(NOTES, `${n}.json`));
export const plain = (n) => readJson(path.join(NOTES, "plain", `${n}.json`));
export const intro = () => readJson(path.join(NOTES, "intro.json"));
export const paragraphs = (text) => (text ?? "").split(/\n\n+/);

/** Where a kind's evidence is read: a note's field, a plain note's whole text, or a part of the book page. */
export function evidenceText([from, field]) {
  if (from === "intro") {
    const i = intro();
    if (field === "overview") return i.overview;
    return i.teaching.parts.find((p) => p.id === field)?.body ?? null;
  }
  if (field === "plain") return plain(from).passages.map((p) => ["t", "happening", "hearers", "later", "hard", "asks"].map((k) => p[k] ?? "").join("\n\n")).join("\n\n");
  return note(from)[field] ?? null;
}

/** A plain note's paragraph: [passage range, field, paragraph index]. */
export function plainParagraph(n, [v, field, i]) {
  const p = plain(n).passages.find((x) => x.v === v);
  return p ? paragraphs(p[field])[i] ?? null : null;
}

/** The outline's parts as verse spans covering the whole psalm, long parts split evenly. */
export function stanzasOf(outline, last) {
  const starts = outline
    .map((o) => ({ from: Number(/^(\d+)/.exec(o.v)?.[1]), title: o.t }))
    .filter((o) => Number.isFinite(o.from))
    .sort((a, b) => a.from - b.from);
  if (!starts.length || starts[0].from > 1) starts.unshift({ from: 1, title: "" });
  const out = [];
  starts.forEach((s, i) => {
    const to = i + 1 < starts.length ? starts[i + 1].from - 1 : last;
    const size = to - s.from + 1;
    if (size <= 0) return;
    const parts = Math.ceil(size / MAX_STANZA);
    const each = Math.ceil(size / parts);
    for (let k = 0; k < parts; k++) {
      const a = s.from + k * each;
      const b = Math.min(to, a + each - 1);
      if (a <= b) out.push({ from: a, to: b, title: s.title, part: parts > 1 ? k + 1 : 0, parts: parts > 1 ? parts : 0 });
    }
  });
  return out;
}

/** The plan made for this page: five psalms a day, three in the morning and two in the evening; the 31st, the first and the last. */
export function plan() {
  const days = [];
  for (let d = 1; d <= 30; d++) {
    const a = 5 * d - 4;
    days.push({ d, morning: [a, a + 1, a + 2], evening: [a + 3, a + 4] });
  }
  days.push({ d: 31, morning: [1], evening: [150] });
  return days;
}

export function build() {
  const src = readJson(SRC);
  const i = intro();
  const kindById = new Map(src.kinds.map((k) => [k.id, k]));

  const kindOf = (entry, id) => {
    const k = kindById.get(id);
    if (!k) throw new Error(`Psalm ${entry.n}: no kind "${id}"`);
    const own = entry.src?.[id];
    const group = own ? null : (k.groups ?? []).find((g) => g.psalms.includes(entry.n));
    const from = own ?? group?.src;
    if (!from) throw new Error(`Psalm ${entry.n}: kind "${id}" has no evidence`);
    const where = from[0] === "intro" ? "The Study Bible's introduction to the Psalms" : from[0] === entry.n ? `The Study Bible's notes on Psalm ${entry.n}` : `The Study Bible's notes on Psalm ${from[0]}`;
    return { id, name: k.name, often: (entry.often ?? []).includes(id), from: { where, text: from[2] } };
  };

  const files = new Map();
  const brief = [];
  for (const entry of [...src.psalms].sort((a, b) => a.n - b.n)) {
    const n = entry.n;
    const nt = note(n);
    const verses = passage(`Psalm ${n}`).verses.map(({ v, t }) => ({ v, t }));
    const kinds = entry.kinds.map((id) => kindOf(entry, id));
    const care = (entry.care ?? []).map((r) => ({ v: r[0], text: plainParagraph(n, r) }));
    const ending = (entry.ending ?? []).map((r) => ({ v: r[0], text: plainParagraph(n, r) }));
    for (const c of [...care, ...ending]) if (!c.text) throw new Error(`Psalm ${n}: no plain-note paragraph at ${c.v}`);
    files.set(`psalm/${n}.json`, {
      n,
      title: nt.title,
      summary: nt.summary,
      kinds,
      when: entry.when,
      line: entry.line,
      guide: entry.guide,
      care,
      ending,
      cursing: entry.kinds.includes("cursing"),
      stanzas: stanzasOf(nt.outline ?? [], verses[verses.length - 1].v),
      verses,
    });
    brief.push({ n, title: nt.title, kinds: kinds.map((k) => ({ id: k.id, often: k.often })), when: entry.when, line: entry.line, verses: verses.length, heavy: care.length > 0 });
  }

  const part = (id) => paragraphs(i.teaching.parts.find((p) => p.id === id).body);
  files.set("index.json", {
    kinds: src.kinds.map((k) => ({ id: k.id, name: k.name, line: k.line, count: brief.filter((b) => b.kinds.some((x) => x.id === k.id)).length })),
    whens: src.whens.map((w) => ({ id: w.id, name: w.name, line: w.line, psalms: brief.filter((b) => b.when.includes(w.id)).map((b) => b.n) })),
    psalms: brief,
    plan: plan(),
    teaching: Object.fromEntries(Object.entries(TEACHING).map(([k, id]) => [k, { h: i.teaching.parts.find((p) => p.id === id).h, body: part(id) }])),
  });
  return files;
}

function main() {
  const files = build();
  const stale = [];
  for (const [rel, data] of files) {
    const f = path.join(OUT, rel);
    const text = JSON.stringify(data) + "\n";
    const now = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
    if (now === text) continue;
    if (CHECK) stale.push(rel);
    else {
      fs.mkdirSync(path.dirname(f), { recursive: true });
      fs.writeFileSync(f, text);
    }
  }
  const d = path.join(OUT, "psalm");
  if (fs.existsSync(d)) {
    for (const name of fs.readdirSync(d)) {
      if (files.has(`psalm/${name}`)) continue;
      if (CHECK) stale.push(`psalm/${name} (left over)`);
      else fs.rmSync(path.join(d, name));
    }
  }
  if (CHECK) {
    if (stale.length) {
      console.error(`build-pray-psalms: ${stale.length} file(s) out of date; run node scripts/build-pray-psalms.mjs\n  ${stale.slice(0, 10).join("\n  ")}`);
      process.exit(1);
    }
    console.log(`build-pray-psalms: ${files.size} files up to date`);
  } else console.log(`build-pray-psalms: wrote ${files.size} files to client/public/pray-psalms/`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
