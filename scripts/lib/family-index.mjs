/**
 * family-index.mjs: the index The Table reads (client/public/family/index.json).
 *
 * One row per devotion that has its own page at /family/devotions/<id>: the 72
 * weekly devotions in client/public/family-devotions*.json (their own ids,
 * frozen by scripts/validate-family.mjs), and every day of the daily sets in
 * client/public/family-seasonal.json, addressed by set and day
 * ("advent-6", "holy-week-1", "thanksgiving-7"). Each row carries what a list,
 * a page head, the sitemap and the prerendered head need (title, passage, a
 * one-line description) and the Study Bible chapter its passage opens, worked
 * out here with the site's one reference parser so the page loads no parser.
 * The catechism's questions and the children's answers ride along, so /family
 * and table mode can show this week's question without the whole catechism.
 *
 * A strand beside the weekly set (family-devotions-world.json, U11) adds its
 * devotions as weekly rows that name their strand, numbered within it, and a
 * `strands` entry with its label and count, but only once its file is live
 * (./family-devotion-file.mjs). While it is hidden the index is exactly what it
 * would be without the file, so nothing on the site can link, prerender, or
 * list a devotion James has not read.
 *
 * Built by scripts/build-family-index.mjs; CI runs it with --check.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readRef } from "./bsb.mjs";
import { devotionsIn } from "./family-devotion-file.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const INDEX = "client/public/family/index.json";

/** The weekly files, in the order the site has always listed them. */
const WEEKLY_FILES = ["family-devotions.json", "family-devotions-2.json"];
const SEASONAL_FILE = "family-seasonal.json";
/** The strands beside the weekly set (MASTER-PLAN 5.4), each in its own file, listed once live. */
export const STRAND_FILES = [{ key: "world", label: "The world we live in", file: "family-devotions-world.json" }];

/** Each daily set: its key in family-seasonal.json, its address, and its name. */
export const SETS = [
  { key: "thanksgiving", slug: "thanksgiving", label: "Thanksgiving week" },
  { key: "advent", slug: "advent", label: "Advent" },
  { key: "holyWeek", slug: "holy-week", label: "Holy Week" },
];

/** The address of one day of a daily set. */
export function seasonalId(slug, day) {
  return `${slug}-${day}`;
}

/**
 * The opening of a passage of prose, whole sentences only, for a one-line
 * description: sentences are taken until there are at least 90 characters,
 * and one that would carry it past 220 is left off (unless it is the first).
 */
export function opening(text) {
  const flat = String(text).replace(/\s+/g, " ").trim();
  const sentences = flat.match(/[^.?!]+[.?!]+["”’']?(?=\s|$)/g) ?? [flat];
  let out = "";
  for (const s of sentences.map((x) => x.trim())) {
    const next = out ? `${out} ${s}` : s;
    if (out && next.length > 220) break;
    out = next;
    if (out.length >= 90) break;
  }
  return out;
}

function studyHref(ref) {
  const r = readRef(ref);
  if (!r) return null;
  const p = r.parts[0];
  return `/study/bible/${r.book.slug}/${p.c1}${p.v2 === Infinity ? "" : `#v${p.v1}`}`;
}

const read = (root, name) => JSON.parse(fs.readFileSync(path.join(root, "client/public", name), "utf8"));

/** The index, and the problems that stop it being built. */
export function buildFamilyIndex(root = ROOT) {
  const problems = [];
  const devotions = [];
  const seen = new Map();
  const add = (row, where) => {
    if (seen.has(row.id)) problems.push(`${where}: the address /family/devotions/${row.id} is already taken by ${seen.get(row.id)}`);
    else seen.set(row.id, where);
    if (!row.href) problems.push(`${where}: "${row.passage}" is not a reference the parser can read, so it cannot open the Study Bible`);
    devotions.push(row);
  };

  let n = 0;
  for (const file of WEEKLY_FILES) {
    const list = read(root, file);
    for (const d of list) {
      n += 1;
      add(
        {
          id: d.id,
          kind: "weekly",
          n,
          title: d.title,
          theme: d.theme,
          passage: d.passage,
          href: studyHref(d.passage),
          file: `/${file}`,
          description: d.bigIdea,
        },
        `client/public/${file} ${d.id}`,
      );
    }
  }

  const strands = [];
  for (const s of STRAND_FILES) {
    if (!fs.existsSync(path.join(root, "client/public", s.file))) continue;
    const { live, devotions: list } = devotionsIn(read(root, s.file));
    if (!live || list.length === 0) continue;
    strands.push({ key: s.key, label: s.label, count: list.length });
    list.forEach((d, i) => {
      add(
        {
          id: d.id,
          kind: "weekly",
          n: i + 1,
          strand: s.key,
          title: d.title,
          theme: d.theme,
          passage: d.passage,
          href: studyHref(d.passage),
          file: `/${s.file}`,
          description: d.bigIdea,
        },
        `client/public/${s.file} ${d.id}`,
      );
    });
  }

  const seasonal = read(root, SEASONAL_FILE);
  const sets = {};
  for (const s of SETS) {
    const days = Array.isArray(seasonal[s.key]) ? seasonal[s.key] : [];
    sets[s.key] = { slug: s.slug, label: s.label, days: days.length };
    days.forEach((d, i) => {
      if (d.day !== i + 1) problems.push(`client/public/${SEASONAL_FILE} ${s.key}[${i}]: day ${d.day} is out of order (expected ${i + 1})`);
      add(
        {
          id: seasonalId(s.slug, d.day),
          kind: "seasonal",
          set: s.key,
          day: d.day,
          label: d.label,
          title: d.title,
          passage: d.passage,
          href: studyHref(d.passage),
          file: `/${SEASONAL_FILE}`,
          description: opening(d.reflection),
        },
        `client/public/${SEASONAL_FILE} ${s.key} day ${d.day}`,
      );
    });
  }
  for (const key of Object.keys(seasonal)) {
    if (!SETS.some((s) => s.key === key)) problems.push(`client/public/${SEASONAL_FILE}: the set "${key}" has no address yet; add it to SETS in scripts/lib/family-index.mjs`);
  }

  const catechism = read(root, "family-catechism.json").map((q) => ({ number: q.number, question: q.question, kidsAnswer: q.kidsAnswer }));

  return {
    index: {
      about: "Written by scripts/build-family-index.mjs from the family libraries in client/public. Do not edit by hand.",
      weekly: n,
      ...(strands.length ? { strands } : {}),
      sets,
      devotions,
      catechism,
    },
    problems,
  };
}

export function renderFamilyIndex(index) {
  return `${JSON.stringify(index, null, 2)}\n`;
}
