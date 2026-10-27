/**
 * story-plan.mjs: "Read the whole story in 2027", derived from the Study
 * Bible's story path (client/public/bible/story.json), which already walks all
 * 1,189 chapters once in the order the story happened.
 *
 * The path is cut into 365 days of about the same length. Length is the
 * number of words in the Berean Standard Bible text the Study Bible serves
 * (client/public/bible/text/<book>/<n>.json), so a day of short psalms and a
 * day of Psalm 119 take about as long to read. The cut is the one that keeps
 * every day closest to the average (least squares over the whole year, by
 * dynamic programming), never splits a chapter, keeps the story's order, and
 * starts each of the eleven acts on a day of its own.
 *
 * Each day also names the context guide (client/public/context/guides) whose
 * first key text falls in that day's chapters, so the day that reads
 * Jeremiah 29 offers "What Does Jeremiah 29:11 Really Mean?".
 *
 * Nothing here is written copy: chapter titles come from the chapter notes
 * (notes-index.json), act titles from the site's storyline, and guide titles
 * from the guides themselves.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { readRef } from "./bsb.mjs";

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const PLAN_ID = "whole-story-2027";
export const OUT_FILE = path.join(ROOT, "client/public/bible/guides", `${PLAN_ID}.json`);
export const START = "2027-01-01";
export const DAYS = 365;
/** No day holds more chapters than this (the Songs of Ascent are the most a balanced day wants). */
const MAX_CHAPTERS_PER_DAY = 20;

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));

/** Every chapter in story order: { slug, chapter, act }. */
export function storySteps(story) {
  const out = [];
  for (const act of story.acts)
    for (const r of act.path)
      for (let c = r.from; c <= r.to; c++) out.push({ slug: r.book, chapter: c, act: act.id });
  return out;
}

/**
 * Cut `weights` (in order) into `days` contiguous runs of at least one item
 * each, minimizing the sum of squared differences from the average run. A run
 * never crosses an index in `breaks` (each one starts a run). Returns the
 * start index of each run plus the end (length days + 1).
 */
export function balancedCuts(weights, days, breaks = [], maxPerDay = MAX_CHAPTERS_PER_DAY) {
  const n = weights.length;
  const isBreak = new Uint8Array(n + 1);
  for (const b of breaks) if (b > 0 && b < n) isBreak[b] = 1;
  if (days < 1 || n < days) throw new Error(`cannot cut ${n} chapters into ${days} days`);
  if (n > days * maxPerDay) throw new Error(`${n} chapters do not fit in ${days} days of ${maxPerDay}`);
  const cum = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) cum[i + 1] = cum[i] + weights[i];
  const mean = cum[n] / days;
  const W = n + 1;
  const cost = new Float64Array((days + 1) * W).fill(Infinity);
  const prev = new Int32Array((days + 1) * W).fill(-1);
  cost[0] = 0;
  for (let d = 1; d <= days; d++) {
    for (let i = d; i <= n; i++) {
      let best = Infinity;
      let at = -1;
      for (let k = i - 1; k >= Math.max(d - 1, i - maxPerDay); k--) {
        // The run k..i-1 may start at a break but not contain one.
        if (k + 1 < i && isBreak[k + 1]) break;
        const before = cost[(d - 1) * W + k];
        if (before === Infinity) continue;
        const x = cum[i] - cum[k] - mean;
        const v = before + x * x;
        if (v < best) {
          best = v;
          at = k;
        }
      }
      cost[d * W + i] = best;
      prev[d * W + i] = at;
    }
  }
  if (cost[days * W + n] === Infinity) throw new Error("no cut found");
  const cuts = [n];
  for (let d = days; d > 0; d--) cuts.push(prev[d * W + cuts[cuts.length - 1]]);
  return cuts.reverse();
}

/** A day's chapters as runs within one book: [["genesis", 1, 4], ["psalms", 90, 90]]. */
export function runsOf(steps) {
  const runs = [];
  for (const s of steps) {
    const last = runs[runs.length - 1];
    if (last && last[0] === s.slug && last[2] === s.chapter - 1) last[2] = s.chapter;
    else runs.push([s.slug, s.chapter, s.chapter]);
  }
  return runs;
}

/**
 * "Genesis 1–4; Psalm 90; Jude" (an en dash for a range, as the Study Bible
 * prints them; a one-chapter book by its name alone).
 */
export function labelOf(runs, book) {
  return runs
    .map(([slug, a, b]) => {
      const { name, chapters } = book(slug);
      if (chapters === 1) return name;
      const shown = slug === "psalms" && a === b ? "Psalm" : name;
      return a === b ? `${shown} ${a}` : `${shown} ${a}–${b}`;
    })
    .join("; ");
}

function wordCount(slug, chapter) {
  const shard = readJson(`client/public/bible/text/${slug}/${chapter}.json`);
  let n = 0;
  for (const v of shard.verses) n += (v.t || "").split(/\s+/).filter(Boolean).length;
  return n;
}

/** The plan, built from the committed data. Pure: the same inputs give the same plan. */
export function buildPlan() {
  const story = readJson("client/public/bible/story.json");
  const books = readJson("client/public/bible/books.json");
  const index = readJson("client/public/bible/notes-index.json");
  const storyline = readJson("client/public/theology/biblical-theology-storyline.json").acts;
  const guideIndex = readJson("client/public/context/guides-index.json").guides;

  const bookBySlug = new Map(books.map((b) => [b.slug, b]));
  const book = (slug) => {
    const b = bookBySlug.get(slug);
    if (!b) throw new Error(`story.json names an unknown book "${slug}"`);
    return b;
  };

  const steps = storySteps(story);
  const words = steps.map((s) => wordCount(s.slug, s.chapter));
  const actStarts = steps.flatMap((s, i) => (i > 0 && s.act !== steps[i - 1].act ? [i] : []));
  const cuts = balancedCuts(words, DAYS, actStarts);

  // Where each chapter is read: "slug/chapter" -> day (1-based).
  const dayOf = new Map();
  const days = [];
  for (let d = 0; d < DAYS; d++) {
    const own = steps.slice(cuts[d], cuts[d + 1]);
    for (const s of own) dayOf.set(`${s.slug}/${s.chapter}`, d + 1);
    const runs = runsOf(own);
    days.push({
      act: own[0].act,
      label: labelOf(runs, book),
      read: runs,
      titles: own.map((s) => index.titles?.[s.slug]?.[s.chapter - 1] ?? ""),
      guides: [],
    });
  }

  // Each context guide on the day that reads its first key text.
  const guides = [];
  for (const g of guideIndex) {
    const file = readJson(`client/public/context/guides/${g.slug}.json`);
    const first = (file.keyTexts ?? [])[0];
    const ref = first ? readRef(first) : null;
    if (!ref) throw new Error(`context guide ${g.slug}: cannot read its first key text "${first}"`);
    const day = dayOf.get(`${ref.book.slug}/${ref.parts[0].c1}`);
    if (!day) throw new Error(`context guide ${g.slug}: ${first} is not on the story path`);
    days[day - 1].guides.push(g.slug);
    guides.push({ slug: g.slug, title: g.title });
  }

  const acts = story.acts.map((a) => {
    const line = storyline.find((s) => s.id === a.id);
    if (!line) throw new Error(`story act ${a.id} has no storyline entry`);
    const first = a.path[0];
    return { id: a.id, act: line.act, title: line.title, day: dayOf.get(`${first.book}/${first.from}`) };
  });

  return {
    note: "Generated by scripts/build-story-plan.mjs from story.json (the order), the text shards (the length of each day), notes-index.json (chapter titles), the storyline (act titles), and the context guides. Do not edit by hand; rerun the script.",
    id: PLAN_ID,
    start: START,
    chapters: steps.length,
    words: words.reduce((a, b) => a + b, 0),
    books: Object.fromEntries(books.map((b) => [b.slug, b.name])),
    acts,
    guides,
    days,
  };
}

/** The file's text: the header readable, one line per day. */
export function serialize(plan) {
  const { days, ...head } = plan;
  const top = JSON.stringify(head, null, 2).replace(/\n}$/, "");
  return `${top},\n  "days": [\n${days.map((d) => `    ${JSON.stringify(d)}`).join(",\n")}\n  ]\n}\n`;
}

/**
 * What is wrong with a plan, as sentences (empty when sound): 365 days, every
 * chapter of the Bible exactly once and in story order, every day at least one
 * real chapter and inside one act, every act beginning on a day of its own,
 * every guide placed once on a real day.
 */
export function planProblems(plan) {
  const problems = [];
  const story = readJson("client/public/bible/story.json");
  const books = readJson("client/public/bible/books.json");
  const chaptersIn = new Map(books.map((b) => [b.slug, b.chapters]));
  const steps = storySteps(story);
  const expected = steps.map((s) => `${s.slug}/${s.chapter}`);
  const actOf = new Map(steps.map((s) => [`${s.slug}/${s.chapter}`, s.act]));
  if (!Array.isArray(plan.days) || plan.days.length !== DAYS) problems.push(`expected ${DAYS} days, found ${plan.days?.length}`);
  const read = [];
  (plan.days ?? []).forEach((d, i) => {
    const n = i + 1;
    if (!Array.isArray(d.read) || d.read.length === 0) problems.push(`day ${n} reads nothing`);
    let count = 0;
    for (const [slug, a, b] of d.read ?? []) {
      const max = chaptersIn.get(slug);
      if (!max) problems.push(`day ${n} names an unknown book "${slug}"`);
      else if (!(a >= 1 && b >= a && b <= max)) problems.push(`day ${n}: ${slug} ${a}-${b} is not a run of real chapters`);
      for (let c = a; c <= b; c++) {
        read.push(`${slug}/${c}`);
        count++;
      }
    }
    if (!Array.isArray(d.titles) || d.titles.length !== count) problems.push(`day ${n} has ${d.titles?.length} titles for ${count} chapters`);
    if (!plan.acts?.some((a) => a.id === d.act)) problems.push(`day ${n} names an unknown act "${d.act}"`);
    for (const [slug, a, b] of d.read ?? [])
      for (let c = a; c <= b; c++) if (actOf.has(`${slug}/${c}`) && actOf.get(`${slug}/${c}`) !== d.act) problems.push(`day ${n} crosses into another act at ${slug} ${c}`);
    for (const g of d.guides ?? []) if (!plan.guides?.some((x) => x.slug === g)) problems.push(`day ${n} names an unknown guide "${g}"`);
  });
  if (read.length !== expected.length) problems.push(`the days read ${read.length} chapters; the Bible has ${expected.length}`);
  const firstWrong = expected.findIndex((k, i) => read[i] !== k);
  if (firstWrong >= 0) problems.push(`the days leave the story order at ${expected[firstWrong]} (read ${read[firstWrong] ?? "nothing"})`);
  for (const a of plan.acts ?? []) {
    const d = plan.days?.[a.day - 1];
    if (!d || d.act !== a.id || (a.day > 1 && plan.days[a.day - 2].act === a.id)) problems.push(`act ${a.id} does not begin on day ${a.day}`);
  }
  for (const g of plan.guides ?? []) {
    const on = (plan.days ?? []).filter((d) => d.guides?.includes(g.slug)).length;
    if (on !== 1) problems.push(`guide ${g.slug} is on ${on} days, not one`);
    if (!fs.existsSync(path.join(ROOT, "client/public/context/guides", `${g.slug}.json`))) problems.push(`guide ${g.slug} has no file`);
  }
  return problems;
}
