#!/usr/bin/env node
/**
 * validate-explorer.mjs: the content gate for the Bible Explorer
 * (/study/explorer, client/public/explorer/).
 *
 * It holds the library to its shape and to the site's rules:
 *   - every stop is present, numbered 1 to N with no gap, filed under one of
 *     the eleven acts of the Bible's Story, with a one-line summary at both
 *     reading levels;
 *   - a finished stop has its scene, its story and "what this shows us about
 *     God" at both levels, one or two verses, chapters to read, and one
 *     activity whose shape the page can run;
 *   - every quoted verse is the Berean Standard Bible word for word
 *     (client/public/bible, through scripts/lib/bsb.mjs), and every other
 *     quotation in the prose is found in a chapter the file itself cites;
 *   - every reference can be read and every link reaches a live page; no
 *     link points at a stop that is still being drawn;
 *   - no em-dash, none of CLAUDE.md's Forbidden Language, no exclamation
 *     mark outside quoted Scripture, no emoji, nothing that blames the Jewish
 *     people for the death of Jesus;
 *   - the threads and the "Why we believe" cards point only at stops that
 *     exist, and a card's catechism numbers exist in the family catechism.
 *
 * Run: node scripts/validate-explorer.mjs   (exits 1 on any finding)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { passage, readRef } from "./lib/bsb.mjs";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import { resolveHref } from "./lib/site-routes.mjs";
import { buildIndex } from "./build-explorer-index.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "client/public/explorer");
const read = p => JSON.parse(fs.readFileSync(p, "utf8"));
const problems = [];
const fail = (where, msg) => problems.push(`${where}: ${msg}`);

const LEVELS = ["younger", "older"];
const KINDS = new Set(["tap", "order", "match", "reveal"]);
const norm = s =>
  s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();

const storyline = read(
  path.join(ROOT, "client/public/theology/biblical-theology-storyline.json")
).acts;
const actIds = new Set(storyline.map(a => a.id));
const catechism = read(path.join(ROOT, "client/public/family-catechism.json"));
const catechismNumbers = new Set(catechism.map(q => q.number));

// ── Text rules ────────────────────────────────────────────────────────────
/** Every string in a value, with its path. */
function strings(value, at, out = []) {
  if (typeof value === "string") out.push([at, value]);
  else if (Array.isArray(value))
    value.forEach((v, i) => strings(v, `${at}[${i}]`, out));
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) strings(v, `${at}.${k}`, out);
  return out;
}

/** The text with every “quotation” blanked out. */
const outsideQuotes = t => t.replace(/“[^”]*”/g, m => " ".repeat(m.length));

function textRules(where, value) {
  for (const [at, t] of strings(value, where)) {
    if (/—/.test(t)) fail(at, "holds an em-dash");
    for (const m of setAsideAllowed(t).matchAll(forbiddenRe))
      fail(at, `uses the forbidden word "${m[1]}"`);
    const scripture = /verses\[\d+\]\.text$|\.quote\.text$|\.promise$/.test(at);
    if (!scripture && /!/.test(outsideQuotes(t)))
      fail(at, "has an exclamation mark outside quoted Scripture");
    if (/\p{Extended_Pictographic}/u.test(t)) fail(at, "holds an emoji");
    if (/\bawesome\b/i.test(t)) fail(at, `says "awesome"`);
    if (
      /\bjews (killed|murdered|crucified)\b|\bchrist-?killers?\b/i.test(t) &&
      !/lie|false|reject/i.test(t)
    )
      fail(at, "blames the Jewish people for the death of Jesus");
  }
}

// ── Scripture ─────────────────────────────────────────────────────────────
function bsbText(ref) {
  try {
    return norm(passage(ref).text);
  } catch {
    return null;
  }
}

/** A quoted verse must be the BSB text of its reference, word for word (it may be trimmed). */
function verseRule(where, { ref, text }) {
  if (!readRef(ref)) return fail(where, `cannot read the reference "${ref}"`);
  const full = bsbText(ref);
  if (full === null) return fail(where, `no BSB text for "${ref}"`);
  if (!text || !full.includes(norm(text)))
    fail(where, `is not the BSB text of ${ref} word for word: "${text}"`);
}

function refRule(where, ref) {
  if (typeof ref !== "string") return fail(where, "has no reference");
  for (const one of ref.split(/;\s*(?=[1-3]?\s?[A-Z])/))
    if (!readRef(one.trim())) fail(where, `cannot read the reference "${one}"`);
}

/** The chapters a file cites anywhere: "Genesis 12:3", "(Exodus 4:22-23)", "/study/bible/genesis/1". */
function citedChapters(value) {
  const chapters = new Set();
  const add = ref => {
    const r = readRef(ref);
    if (!r) return;
    for (const p of r.parts)
      for (let c = p.c1; c <= p.c2; c++) chapters.add(`${r.book.name} ${c}`);
  };
  for (const [, t] of strings(value, "")) {
    for (const m of t.matchAll(
      /\b((?:[1-3] )?[A-Z][a-z]+(?: of [A-Z][a-z]+)? \d+(?::\d+(?:-\d+)?)?)/g
    ))
      add(m[1]);
    const href = t.match(/^\/study\/bible\/([a-z0-9-]+)\/(\d+)$/);
    if (href) add(`${href[1].replace(/-/g, " ")} ${href[2]}`);
  }
  return [...chapters];
}

/** Every “quotation” in the prose is found in one of the chapters the file cites. */
function quotationRule(where, value) {
  const texts = citedChapters(value).map(bsbText).filter(Boolean);
  for (const [at, t] of strings(value, where)) {
    for (const m of t.matchAll(/“([^”]+)”/g)) {
      const q = norm(m[1]).replace(/[,.;:]$/, "");
      if (!texts.some(c => c.includes(q)))
        fail(
          at,
          `quotes words not found in any chapter the file cites: “${m[1]}”`
        );
    }
  }
}

// ── Links ─────────────────────────────────────────────────────────────────
function linkRule(where, href, finished) {
  if (typeof href !== "string" || !href.startsWith("/"))
    return fail(where, `has no internal href (${href})`);
  const explorer = href.match(/^\/study\/explorer\/([a-z0-9-]+)/);
  if (explorer && !finished.has(explorer[1]))
    return fail(where, `links ${href}, a stop that is still being drawn`);
  const r = resolveHref(href);
  if (r.status === "missing")
    fail(where, `links ${href}, which is not a live page`);
  if (r.status === "redirect")
    fail(
      where,
      `links ${href}, which redirects to ${r.to}; link the destination`
    );
}

// ── Stops ─────────────────────────────────────────────────────────────────
const files = fs
  .readdirSync(path.join(DIR, "stops"))
  .filter(f => f.endsWith(".json"))
  .sort();
const stops = files.map(f => ({
  file: f,
  stop: read(path.join(DIR, "stops", f)),
}));
const slugs = new Set(stops.map(s => s.stop.slug));
const finished = new Set(
  stops.filter(s => s.stop.status === "finished").map(s => s.stop.slug)
);

const numbers = stops.map(s => s.stop.n).sort((a, b) => a - b);
numbers.forEach((n, i) => {
  if (n !== i + 1)
    fail(
      "stops",
      `are not numbered 1 to ${numbers.length} without a gap (found ${numbers.join(", ")})`
    );
});
if (stops.length < 11)
  fail("stops", `only ${stops.length}; the map needs every act of the story`);
for (const a of actIds)
  if (!stops.some(s => s.stop.act === a))
    fail("stops", `no stop for the act "${a}"`);

const levelPair = (where, v, max) => {
  for (const l of LEVELS) {
    const x = v?.[l];
    const ok = Array.isArray(x)
      ? x.length > 0 && x.every(p => typeof p === "string" && p.trim())
      : typeof x === "string" && x.trim();
    if (!ok) fail(where, `has no text for ${l} readers`);
    if (max && typeof x === "string" && x.length > max)
      fail(where, `${l} line is ${x.length} characters; keep it to ${max}`);
  }
};

for (const { file, stop: s } of stops) {
  const w = `stops/${file}`;
  if (`${s.slug}.json` !== file)
    fail(w, `slug "${s.slug}" does not match the file name`);
  if (!/^[a-z0-9-]+$/.test(s.slug ?? "")) fail(w, "has no plain slug");
  if (!actIds.has(s.act))
    fail(w, `act "${s.act}" is not one of the eleven acts`);
  if (!s.title || !s.range) fail(w, "needs a title and a range");
  if (!["finished", "drawing"].includes(s.status))
    fail(w, `status "${s.status}" is not finished or drawing`);
  levelPair(`${w} summary`, s.summary, 240);
  textRules(w, s);

  if (s.status !== "finished") {
    for (const k of ["story", "verses", "activity", "scene"])
      if (k in s)
        fail(
          w,
          `is still being drawn but has "${k}"; mark it finished or remove it`
        );
    continue;
  }
  if (!s.scene || !s.sceneLabel)
    fail(w, "needs a scene and a sentence saying what the scene shows");
  levelPair(`${w} story`, s.story);
  levelPair(`${w} god`, s.god);
  if (!Array.isArray(s.verses) || s.verses.length < 1 || s.verses.length > 2)
    fail(w, "needs one or two verses");
  (s.verses ?? []).forEach((v, i) => verseRule(`${w} verses[${i}]`, v));
  if (!Array.isArray(s.read) || !s.read.length)
    fail(w, "needs chapters to read");
  (s.read ?? []).forEach((r, i) => {
    if (!/^\/study\/bible\/[a-z0-9-]+\/\d+$/.test(r.href ?? ""))
      fail(`${w} read[${i}]`, `is not a Study Bible chapter (${r.href})`);
    linkRule(`${w} read[${i}]`, r.href, finished);
  });
  (s.deeper ?? []).forEach((d, i) =>
    linkRule(`${w} deeper[${i}]`, d.href, finished)
  );
  if (s.differ) linkRule(`${w} differ`, s.differ.href, finished);
  if (
    !s.question?.ask ||
    !Array.isArray(s.question?.answer) ||
    !s.question.answer.length
  )
    fail(w, "needs the honest question a teenager asks, with its answer");
  if (!s.deeper?.length)
    fail(w, "needs somewhere to go deeper for older readers");
  levelPair(`${w} talk`, s.talk);
  quotationRule(w, s);

  const a = s.activity;
  if (!a || !KINDS.has(a.kind)) {
    fail(w, `needs one activity of a known kind (${[...KINDS].join(", ")})`);
    continue;
  }
  if (!a.title || !a.prompt)
    fail(`${w} activity`, "needs a title and a prompt");
  const ids = list => {
    const seen = new Set();
    for (const x of list) {
      if (!x.id || seen.has(x.id))
        fail(`${w} activity`, `has a missing or repeated id "${x.id}"`);
      seen.add(x.id);
    }
  };
  if (a.kind === "tap") {
    if (!Array.isArray(a.spots) || a.spots.length < 3)
      fail(`${w} activity`, "a picture to tap needs three spots or more");
    ids(a.spots ?? []);
    for (const sp of a.spots ?? []) {
      if (!(sp.x >= 0 && sp.x <= 100 && sp.y >= 0 && sp.y <= 100))
        fail(
          `${w} activity ${sp.id}`,
          "is not placed on the picture (x and y are percentages)"
        );
      if (!sp.name || !sp.text)
        fail(`${w} activity ${sp.id}`, "needs a name and what it reveals");
      refRule(`${w} activity ${sp.id}`, sp.ref);
    }
  } else if (a.kind === "order") {
    ids(a.items ?? []);
    if (!Array.isArray(a.items) || a.items.length < 3)
      fail(`${w} activity`, "an order needs three items or more");
    for (const it of a.items ?? []) refRule(`${w} activity ${it.id}`, it.ref);
    const want = (a.items ?? []).map(x => x.id);
    const start = a.start ?? [];
    if (
      start.length !== want.length ||
      [...start].sort().join() !== [...want].sort().join()
    )
      fail(`${w} activity`, "start must list every item once");
    if (start.join() === want.join())
      fail(`${w} activity`, "starts already in order");
  } else if (a.kind === "match") {
    ids(a.pairs ?? []);
    if (!Array.isArray(a.pairs) || a.pairs.length < 2)
      fail(`${w} activity`, "a match needs two pairs or more");
    for (const p of a.pairs ?? []) {
      verseRule(`${w} activity ${p.id} promise`, {
        ref: p.promiseRef,
        text: p.promise,
      });
      refRule(`${w} activity ${p.id} kept`, p.keptRef);
      if (!p.kept)
        fail(`${w} activity ${p.id}`, "needs where the promise is kept");
    }
  } else if (a.kind === "reveal") {
    ids(a.questions ?? []);
    if (!Array.isArray(a.questions) || a.questions.length < 2)
      fail(`${w} activity`, "needs two questions or more");
    for (const q of a.questions ?? []) {
      if (!q.q || !q.a)
        fail(`${w} activity ${q.id}`, "needs a question and an answer");
      refRule(`${w} activity ${q.id}`, q.ref);
    }
  }
}

// ── Threads ───────────────────────────────────────────────────────────────
const { threads } = read(path.join(DIR, "threads.json"));
textRules("threads.json", threads);
const threadIds = new Set();
for (const t of threads) {
  const w = `threads.json ${t.id}`;
  if (!t.id || threadIds.has(t.id)) fail(w, "has a missing or repeated id");
  threadIds.add(t.id);
  if (!t.name) fail(w, "needs a name");
  levelPair(`${w} line`, t.line);
  if (t.status === "finished") {
    if (!t.key?.near || !t.key?.apart)
      fail(w, "needs the key for its two kinds of line");
    const entries = Object.entries(t.stops ?? {});
    if (entries.length < 3) fail(w, "lights too few stops to show a theme");
    for (const [slug, at] of entries) {
      if (!slugs.has(slug)) fail(w, `lights "${slug}", which is not a stop`);
      if (!["near", "apart"].includes(at.state))
        fail(`${w} ${slug}`, `state "${at.state}" is not near or apart`);
      if (!at.line) fail(`${w} ${slug}`, "needs its one line");
      refRule(`${w} ${slug}`, at.ref);
    }
  } else if (t.status === "coming") {
    if (t.stops)
      fail(w, "is coming but already lights stops; mark it finished");
  } else fail(w, `status "${t.status}" is not finished or coming`);
}
if (threads.filter(t => t.status === "finished").length < 1)
  fail("threads.json", "needs one finished thread");

// ── Cards ─────────────────────────────────────────────────────────────────
const { cards } = read(path.join(DIR, "cards.json"));
textRules("cards.json", cards);
const cardIds = new Set();
for (const c of cards) {
  const w = `cards.json ${c.id}`;
  if (!c.id || cardIds.has(c.id)) fail(w, "has a missing or repeated id");
  cardIds.add(c.id);
  if (!c.title) fail(w, "needs a title");
  if (c.status === "coming") {
    const extra = Object.keys(c).filter(
      k => !["id", "title", "status"].includes(k)
    );
    if (extra.length) fail(w, `is coming but has ${extra.join(", ")}`);
    continue;
  }
  if (c.status !== "finished") {
    fail(w, `status "${c.status}" is not finished or coming`);
    continue;
  }
  if (!c.picture || !c.pictureLabel)
    fail(w, "needs a picture and what it shows");
  levelPair(`${w} statement`, c.statement);
  verseRule(`${w} quote`, c.quote ?? {});
  if (!Array.isArray(c.rests) || c.rests.length < 2)
    fail(w, "needs the passages it rests on");
  (c.rests ?? []).forEach(r => refRule(w, r));
  if (!c.question?.ask) fail(w, "needs the question people ask");
  levelPair(`${w} question`, c.question);
  for (const slug of c.stops ?? [])
    if (!slugs.has(slug)) fail(w, `names "${slug}", which is not a stop`);
  if (!c.stops?.length) fail(w, "needs the stops where the Bible teaches it");
  for (const n of c.catechism ?? [])
    if (!catechismNumbers.has(n))
      fail(w, `names catechism question ${n}, which does not exist`);
  (c.deeper ?? []).forEach((d, i) =>
    linkRule(`${w} deeper[${i}]`, d.href, finished)
  );
  quotationRule(w, c);
}

// ── The manifest ──────────────────────────────────────────────────────────
try {
  const want = JSON.stringify(buildIndex(), null, 2) + "\n";
  const have = fs.readFileSync(path.join(DIR, "index.json"), "utf8");
  if (want !== have)
    fail("index.json", "is stale; run node scripts/build-explorer-index.mjs");
} catch (err) {
  fail("index.json", `cannot be built: ${err.message}`);
}

if (problems.length) {
  console.error(
    `[explorer] ${problems.length} problem${problems.length === 1 ? "" : "s"}:`
  );
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(
  `[explorer] ${stops.length} stops (${finished.size} finished), ${threads.length} threads, ${cards.length} cards: all checks pass.`
);
