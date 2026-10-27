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
 * The Table, part two (U21): each weekly row names its strand (MASTER-PLAN
 * 5.4) and, for the library, its theme group; a devotion with a line "for the
 * grown-ups" carries it here with the title of the page it links, read from
 * that page's own data so the link can never name a page that is not there.
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

/**
 * The weekly strands (MASTER-PLAN 5.4), each read from its own files in this
 * order. A strand whose file does not exist yet is left out of the index, so
 * the world and church strands appear in the library the day their files land.
 */
export const STRANDS = [
  { key: "foundations", label: "Foundations", files: ["family-devotions.json", "family-devotions-2.json"] },
  { key: "world", label: "The world we live in", files: ["family-devotions-world.json"] },
  { key: "church", label: "The church remembers", files: ["family-devotions-church.json"] },
];

/**
 * The library's theme groups, in the order the library shows them. Every
 * Foundations devotion names one as its `group`; another strand may.
 */
export const GROUPS = [
  { key: "god", label: "Who God is" },
  { key: "story", label: "The big story" },
  { key: "following", label: "Following Jesus" },
  { key: "character", label: "Growing in character" },
  { key: "others", label: "Living with other people" },
  { key: "feelings", label: "Hard days and big feelings" },
  { key: "everyday", label: "Work, rest, and what we have" },
];

/**
 * Where a devotion's line "for the grown-ups" may point, and the title the
 * link shows: a care page (/help/<slug>, from client/public/needs/<slug>.json
 * with page: true). Topic pages join once they exist (U25). Returns the title,
 * or the reason the link cannot be made.
 */
export function grownupsTarget(href, { needsDir = path.join(ROOT, "client/public/needs") } = {}) {
  const help = /^\/help\/([a-z0-9-]+)$/.exec(href ?? "");
  if (!help) return { problem: `"${href}" is not a page a grown-ups line can link yet (a care page, /help/<slug>); teach grownupsTarget in scripts/lib/family-index.mjs` };
  const file = path.join(needsDir, `${help[1]}.json`);
  if (!fs.existsSync(file)) return { problem: `"${href}" has no care page (client/public/needs/${help[1]}.json)` };
  const need = JSON.parse(fs.readFileSync(file, "utf8"));
  if (need.page !== true || typeof need.title !== "string") return { problem: `"${href}" is not a published care page` };
  return { title: need.title };
}

const SEASONAL_FILE = "family-seasonal.json";

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

  const groupKeys = new Set(GROUPS.map((g) => g.key));
  const strands = [];
  const groupCounts = new Map();
  const claimed = new Set(STRANDS.flatMap((s) => s.files));
  for (const name of fs.readdirSync(path.join(root, "client/public"))) {
    if (/^family-devotions(-[a-z0-9-]+)?\.json$/.test(name) && !claimed.has(name)) {
      problems.push(`client/public/${name}: no strand reads this file; add it to STRANDS in scripts/lib/family-index.mjs`);
    }
  }
  for (const strand of STRANDS) {
    let n = 0;
    for (const file of strand.files) {
      if (!fs.existsSync(path.join(root, "client/public", file))) continue;
      // A strand file is a plain list, or { live, devotions } held back until
      // `live` is true (U11's world strand): a held-back strand has no rows.
      const { live, devotions: all } = devotionsIn(read(root, file));
      const list = live ? all : [];
      for (const d of list) {
        n += 1;
        const where = `client/public/${file} ${d.id}`;
        if (d.group !== undefined || strand.key === "foundations") {
          if (!groupKeys.has(d.group)) problems.push(`${where}: group "${d.group ?? ""}" is not one of the library's groups (${[...groupKeys].join(", ")})`);
          else if (strand.key === "foundations") groupCounts.set(d.group, (groupCounts.get(d.group) ?? 0) + 1);
        }
        let grownups;
        if (d.grownups !== undefined) {
          const target = grownupsTarget(d.grownups?.href, { needsDir: path.join(root, "client/public/needs") });
          if (target.problem) problems.push(`${where}: grownups link ${target.problem}`);
          else grownups = { line: d.grownups.line, href: d.grownups.href, title: target.title };
        }
        add(
          {
            id: d.id,
            kind: "weekly",
            n,
            strand: strand.key,
            title: d.title,
            theme: d.theme,
            ...(d.group !== undefined ? { group: d.group } : {}),
            passage: d.passage,
            href: studyHref(d.passage),
            file: `/${file}`,
            description: d.bigIdea,
            ...(grownups ? { grownups } : {}),
          },
          where,
        );
      }
    }
    if (n > 0) strands.push({ key: strand.key, label: strand.label, count: n });
  }
  const weekly = strands.find((s) => s.key === "foundations")?.count ?? 0;

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
      weekly,
      strands,
      groups: GROUPS.map((g) => ({ ...g, count: groupCounts.get(g.key) ?? 0 })),
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
