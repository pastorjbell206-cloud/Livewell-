#!/usr/bin/env node
/**
 * validate-family.mjs — the family libraries (client/public/family-*.json):
 * their Scripture, their structure, and the copy that describes them.
 *
 * Every file matching client/public/family-*.json is read; none is listed by
 * hand. A file's name says what kind of library it is (KINDS below), and its
 * kind says which translation the pages show it in. A family file this script
 * does not recognize fails the gate until it is given a kind, so a new strand
 * cannot ship unchecked.
 *
 * Scripture (unchanged from the first version of this gate):
 *   - Devotion passageText and catechism scriptureText must be a continuous
 *     stretch of the Berean Standard Bible for their reference (an ellipsis may
 *     mark a gap), with quotation marks that open and close in order. To
 *     refresh a passage, copy it from `node scripts/bsb.mjs "<ref>"`.
 *   - The seasonal packs retell each passage for children and print the
 *     passage itself from its reference: each day carries its fields, its
 *     reference resolves in the BSB, and the retelling uses no quotation marks
 *     (it is a paraphrase, not a quotation).
 *
 * Structure (MASTER-PLAN 5.8 and 9.2):
 *   - Devotion ids are unique across every devotion file and safe in a URL;
 *     devotion titles are unique; catechism numbers run 1 to N and catechism
 *     questions are unique, except the repeats already flagged for U40 below.
 *   - Bands are present where claimed: a devotion whose questions are split by
 *     age carries both the younger and the older list; every catechism answer
 *     has its child's answer beside it.
 *   - Counts match copy: each reading plan's "N days" matches its days, and
 *     every page, script, or text that says how many catechism questions (in
 *     copy that points at the family catechism) or weekly devotions there are
 *     says the number the data holds.
 *   - One translation per surface: each family page that shows verse text
 *     names, in its <ScriptureNote>, exactly the translations of the libraries
 *     it shows (PAGES below), and a references-only page names none.
 *   - No em-dash (and no "--" standing in for one) anywhere in the family
 *     files outside quoted Scripture and other verbatim quotations, which keep
 *     their own punctuation.
 *   - The year map, once U10 generates it, names only devotions that exist.
 *
 * Strand files (family-devotions-<strand>.json, U11) are { live, devotions }:
 * every devotion in one is checked like any other, and its id is unique across
 * all of them, but while live is false it is not frozen yet and the year map
 * may not name it (a hand override may pin it; the pin waits for live). See
 * scripts/lib/family-devotion-file.mjs for publishing one.
 *
 * The id freeze (5.6): a printed card's QR code points at
 * /family/devotions/<id> and cannot be recalled, so every devotion id ever
 * committed is recorded in scripts/data/family-devotion-ids.json. An id may
 * leave the data only with a vercel.json redirect from its old address to the
 * devotion that replaces it. A new devotion's id is added to the record with
 *
 *   node scripts/validate-family.mjs --freeze   (adds new ids; never removes one)
 *   node scripts/validate-family.mjs            CI gate
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { passage, quotesPassage } from "./lib/bsb.mjs";
import { devotionsIn } from "./lib/family-devotion-file.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** The record of every devotion id ever committed (the freeze). */
export const FROZEN_IDS = "scripts/data/family-devotion-ids.json";
/** Where U10 writes the generated year map; checked once it exists. */
export const YEAR_MAP = "client/src/lib/familyYear.generated.ts";

/**
 * Each family file's kind, by name, and the translation its verse text is
 * shown in. `null` means the surface shows references only, no verse text.
 */
const KINDS = {
  devotions: { translation: "bsb", scriptureField: "passageText" },
  catechism: { translation: "bsb", scriptureField: "scriptureText" },
  seasonal: { translation: "paraphrase", scriptureField: null },
  "reading-plans": { translation: null, scriptureField: null },
  "year-overrides": { translation: null, scriptureField: null },
};

export function kindOf(name) {
  if (/^family-devotions(-[a-z0-9]+(-[a-z0-9]+)*)?\.json$/.test(name)) return "devotions";
  if (name === "family-catechism.json") return "catechism";
  if (name === "family-seasonal.json") return "seasonal";
  if (name === "family-reading-plans.json") return "reading-plans";
  if (name === "family-year-overrides.json") return "year-overrides";
  return null;
}

/** The weekly set /family/devotions lists (the Foundations strand); "N weekly devotions" counts these. */
const FOUNDATIONS = ["family-devotions.json", "family-devotions-2.json"];

/**
 * Catechism questions asked twice, flagged by the family inventory and kept
 * until U40 de-duplicates the catechism (Q47 and Q61 wait on James's answer
 * about baptism, question 7). A new repeat fails; a pair that stops repeating
 * must come off this list.
 */
export const KNOWN_CATECHISM_REPEATS = [
  [8, 64],
  [11, 56],
  [21, 58],
  [47, 61],
  [48, 62],
];

/** Each family page that shows verse text, and the libraries it shows. */
export const PAGES = [
  // /family and the library list titles and references, no verse text (U17).
  ["client/src/pages/Family.tsx", []],
  ["client/src/pages/FamilyDevotions.tsx", []],
  // A devotion's page and table mode show a weekly devotion (BSB) or a day of
  // a daily set (paraphrase).
  ["client/src/pages/family/DevotionPage.tsx", ["devotions", "seasonal"]],
  ["client/src/pages/family/TableMode.tsx", ["devotions", "seasonal"]],
  ["client/src/pages/FamilyCatechism.tsx", ["catechism"]],
  ["client/src/pages/FamilyReadingPlans.tsx", ["reading-plans"]],
];

/** Where copy describes the family set, scanned for count claims. */
const COPY_DIRS = ["client/src/pages", "client/src/components"];
const COPY_FILES = ["scripts/build-catalogue.mjs", "scripts/lib/help-printables.mjs", "client/public/llms.txt", "client/index.html"];

const RENDERINGS = new Set(["esv", "bsb", "kjv", "niv", "nasb", "unverified", "abridged", "paraphrase"]);
const DEVOTION_FIELDS = ["id", "title", "theme", "passage", "passageText", "bigIdea", "reflection", "activity", "prayer"];
const CATECHISM_FIELDS = ["part", "question", "answer", "kidsAnswer", "scripture", "scriptureText", "commentary"];
const SEASONAL_FIELDS = ["label", "title", "passage", "passageText", "reflection", "question", "prayer"];
const BANDS = ["together", "younger", "older"];

const TENS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const ONES = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
const NUM = `(\\d{2,}|(?:${Object.keys(TENS).join("|")})(?:-(?:${Object.keys(ONES).join("|")}))?)`;
const CATECHISM_CLAIM = new RegExp(`\\b${NUM}[- ]questions?\\b`, "gi");
const WEEKLY_CLAIM = new RegExp(`\\b${NUM}[- ]weekly\\s+(?:family\\s+)?devotions?\\b`, "gi");

/** "76", "Seventy-six", "seventy" → a number. */
export function countWord(word) {
  if (/^\d+$/.test(word)) return Number(word);
  const [tens, ones] = word.toLowerCase().split("-");
  return (TENS[tens] ?? NaN) + (ones ? ONES[ones] ?? NaN : 0);
}

const isText = (v) => typeof v === "string" && v.trim().length > 0;
const isTextList = (v) => Array.isArray(v) && v.length > 0 && v.every(isText);
const normalizeQuestion = (q) => q.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

/** Text with every “double-quoted” or "straight-quoted" span blanked out. */
function outsideQuotations(text) {
  return text.replace(/“[^”]*”/g, " ").replace(/"[^"]*"/g, " ");
}

/** Every string in a JSON value, with its path. */
function* strings(value, at) {
  if (typeof value === "string") yield [at, value];
  else if (Array.isArray(value)) for (let i = 0; i < value.length; i++) yield* strings(value[i], `${at}[${i}]`);
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) yield* strings(v, `${at}.${k}`);
}

function checkScripture(errors, where, ref, text, field) {
  try {
    if (!quotesPassage(text, ref)) errors.push(`${where}: ${field} is not verbatim BSB (copy it from: node scripts/bsb.mjs "${ref}")`);
  } catch (e) {
    errors.push(`${where}: ${e.message}`);
  }
  // Every closing mark has an opening mark before it, and none is left open.
  let depth = 0;
  for (const ch of text) {
    if (ch === "“") depth++;
    else if (ch === "”" && --depth < 0) break;
  }
  if (depth !== 0) errors.push(`${where}: unpaired quotation marks`);
}

function readJson(errors, file, label) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    errors.push(`${label}: cannot read (${e.message})`);
    return undefined;
  }
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(p, out);
    else if (/\.(tsx?|mjs|txt|html)$/.test(e.name) && !/\.test\./.test(e.name)) out.push(p);
  }
  return out;
}

/** The copy that describes the family set: [label, text] pairs. */
export function defaultCopy(root = REPO) {
  const files = [...COPY_DIRS.flatMap((d) => walkFiles(path.join(root, d))), ...COPY_FILES.map((f) => path.join(root, f))];
  return files.filter((f) => fs.existsSync(f)).map((f) => [path.relative(root, f), fs.readFileSync(f, "utf8")]);
}

/** The renderings a page's <ScriptureNote rendering=…> attributes can name. */
export function renderingsIn(source) {
  const found = new Set();
  for (const m of source.matchAll(/<ScriptureNote\b[^>]*?\brendering=(?:"([^"]*)"|\{([^}]*)\})/g)) {
    for (const lit of m[1] !== undefined ? [m[1]] : [...m[2].matchAll(/"([^"]*)"/g)].map((x) => x[1])) {
      if (RENDERINGS.has(lit)) found.add(lit);
    }
  }
  return found;
}

/**
 * Check the family libraries. Every path defaults to the repository; a test
 * points `publicDir` (and the others) at a seeded copy.
 */
export function checkFamily({
  root = REPO,
  publicDir = path.join(root, "client/public"),
  frozenFile = path.join(root, FROZEN_IDS),
  redirectsFile = path.join(root, "vercel.json"),
  yearMapFile = path.join(root, YEAR_MAP),
  pages = PAGES.map(([p, kinds]) => [p, kinds, path.join(root, p)]),
  copy = defaultCopy(root),
} = {}) {
  const errors = [];
  const notes = [];
  // Sorted without the extension, so family-devotions.json comes before family-devotions-2.json.
  const stem = (n) => n.replace(/\.json$/, "");
  const files = fs.readdirSync(publicDir).filter((n) => /^family-.*\.json$/.test(n)).sort((a, b) => (stem(a) < stem(b) ? -1 : 1));
  const devotionIds = [];
  const counts = { files: files.length, devotions: 0, foundations: 0, hidden: 0, passages: 0, catechism: 0, seasonalDays: 0, plans: 0 };
  const titles = new Map();
  const deferred = [];

  for (const name of files) {
    const kind = kindOf(name);
    const label = `client/public/${name}`;
    if (!kind) {
      errors.push(`${label}: not a family library this gate knows. Name a new devotion strand family-devotions-<strand>.json (the devotion shape, BSB), or give the file a kind and a translation in KINDS in scripts/validate-family.mjs.`);
      continue;
    }
    const data = readJson(errors, path.join(publicDir, name), label);
    if (data === undefined) continue;
    const scriptureField = KINDS[kind].scriptureField;

    // No em-dash outside quoted Scripture and other verbatim quotations.
    for (const [at, text] of strings(data, "")) {
      if (scriptureField && at.endsWith(`.${scriptureField}`)) continue;
      const prose = outsideQuotations(text);
      if (/—/.test(prose)) errors.push(`${label}${at}: em-dash outside a quotation (the em-dash rule; recast the sentence)`);
      if (/--/.test(prose)) errors.push(`${label}${at}: "--" standing in for a dash (recast the sentence)`);
    }

    if (kind === "devotions") {
      const file = devotionsIn(data);
      if (!file.shape) { errors.push(`${label}: expected a list of devotions, or a strand { "live": true or false, "devotions": [...] }`); continue; }
      if (file.shape === "strand") {
        if (typeof data.live !== "boolean") errors.push(`${label}: "live" must be true or false`);
        if (FOUNDATIONS.includes(name)) errors.push(`${label}: the Foundations set is always live; keep it a plain list`);
        if (!file.live) counts.hidden += file.devotions.length;
      }
      const list = file.devotions;
      const at = file.shape === "strand" ? ".devotions" : "";
      list.forEach((d, i) => {
        const where = `${label}${at}[${i}] ${d?.id ?? "(no id)"}`;
        for (const k of DEVOTION_FIELDS) if (!isText(d?.[k])) errors.push(`${where}: needs ${k}`);
        if (isText(d?.id)) {
          if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.id)) errors.push(`${where}: id must be lowercase words joined by hyphens (it becomes /family/devotions/${d.id})`);
          devotionIds.push([d.id, where, file.live]);
        }
        if (isText(d?.title)) {
          const key = d.title.trim().toLowerCase();
          if (titles.has(key)) errors.push(`${where}: title "${d.title}" is also ${titles.get(key)}`);
          else titles.set(key, where);
        }
        const q = d?.questions;
        if (Array.isArray(q)) {
          if (!isTextList(q)) errors.push(`${where}: questions must be a list of questions`);
        } else if (q && typeof q === "object") {
          for (const band of Object.keys(q)) if (!BANDS.includes(band)) errors.push(`${where}: questions.${band} is not a band (${BANDS.join(", ")})`);
          for (const band of ["younger", "older"]) if (!isTextList(q[band])) errors.push(`${where}: questions are split by age, so questions.${band} needs its questions`);
          if (q.together !== undefined && !isTextList(q.together)) errors.push(`${where}: questions.together must be a list of questions`);
        } else {
          errors.push(`${where}: needs questions`);
        }
        if (isText(d?.passage) && isText(d?.passageText)) {
          counts.passages++;
          checkScripture(errors, `${label}${at}[${i}] ${d.passage}`, d.passage, d.passageText, "passageText");
        }
      });
      counts.devotions += list.length;
      if (FOUNDATIONS.includes(name)) counts.foundations += list.length;
    }

    if (kind === "catechism") {
      if (!Array.isArray(data)) { errors.push(`${label}: expected a list of questions`); continue; }
      counts.catechism = data.length;
      const seen = new Map();
      data.forEach((e, i) => {
        const where = `${label}[${i}] Q${e?.number ?? "?"}`;
        if (e?.number !== i + 1) errors.push(`${where}: questions are numbered 1 to ${data.length} in order; this one is ${e?.number}`);
        // "An answer for the grown-ups and a shorter one for the little ones":
        // the child's answer is the catechism's claimed band.
        for (const k of CATECHISM_FIELDS) if (!isText(e?.[k])) errors.push(`${where}: needs ${k}`);
        if (isText(e?.question)) {
          const key = normalizeQuestion(e.question);
          if (!seen.has(key)) seen.set(key, []);
          seen.get(key).push(e.number);
        }
        if (isText(e?.scripture) && isText(e?.scriptureText)) {
          counts.passages++;
          checkScripture(errors, `${label}[${i}] ${e.scripture}`, e.scripture, e.scriptureText, "scriptureText");
        }
      });
      const known = new Set(KNOWN_CATECHISM_REPEATS.map((pair) => pair.join(",")));
      const repeats = [...seen.values()].filter((nums) => nums.length > 1).map((nums) => nums.join(","));
      for (const r of repeats) {
        if (known.has(r)) notes.push(`catechism Q${r.replace(",", " and Q")} ask the same question (flagged; U40 removes the repeat)`);
        else errors.push(`${label}: questions ${r.split(",").map((n) => `Q${n}`).join(" and ")} ask the same question`);
      }
      for (const k of known) if (!repeats.includes(k)) errors.push(`${label}: Q${k.replace(",", " and Q")} no longer repeat; take them off KNOWN_CATECHISM_REPEATS in scripts/validate-family.mjs`);
    }

    if (kind === "seasonal") {
      if (!data || typeof data !== "object" || Array.isArray(data)) { errors.push(`${label}: expected seasons, each a list of days`); continue; }
      for (const [season, list] of Object.entries(data)) {
        if (!Array.isArray(list)) { errors.push(`${label} ${season}: expected a list of days`); continue; }
        const days = new Set();
        list.forEach((d, i) => {
          const where = `${label} ${season}[${i}] ${d?.passage ?? "(no reference)"}`;
          for (const k of SEASONAL_FIELDS) if (!isText(d?.[k])) errors.push(`${where}: needs ${k}`);
          if (days.has(d?.day)) errors.push(`${where}: day ${d?.day} appears twice in ${season}`);
          days.add(d?.day);
          if (typeof d?.passage === "string") {
            try { if (!passage(d.passage).text) errors.push(`${where}: no BSB text for this reference`); }
            catch (e) { errors.push(`${where}: ${e.message}`); }
          }
          if (typeof d?.passageText === "string" && /["“”]/.test(d.passageText)) errors.push(`${where}: the retelling is a paraphrase, so it may not use quotation marks`);
          counts.seasonalDays++;
        });
      }
    }

    if (kind === "reading-plans") {
      if (!Array.isArray(data)) { errors.push(`${label}: expected a list of plans`); continue; }
      counts.plans = data.length;
      const ids = new Set();
      data.forEach((p, i) => {
        const where = `${label}[${i}] ${p?.id ?? "(no id)"}`;
        for (const k of ["id", "title", "description", "audience", "length"]) if (!isText(p?.[k])) errors.push(`${where}: needs ${k}`);
        if (ids.has(p?.id)) errors.push(`${where}: plan id appears twice`);
        ids.add(p?.id);
        if (!Array.isArray(p?.days) || p.days.length === 0) { errors.push(`${where}: needs days`); return; }
        const claimed = /^(\d+) days?$/.exec(p.length ?? "");
        if (!claimed) errors.push(`${where}: length should read "N days", not "${p.length}"`);
        else if (Number(claimed[1]) !== p.days.length) errors.push(`${where}: says "${p.length}" but has ${p.days.length} days`);
        p.days.forEach((d, j) => {
          if (d?.day !== j + 1) errors.push(`${where} day ${j + 1}: days are numbered 1 to ${p.days.length} in order; this one is ${d?.day}`);
          if (!isText(d?.passage) || !isText(d?.prompt)) errors.push(`${where} day ${j + 1}: needs passage and prompt`);
          if ("passageText" in (d ?? {})) errors.push(`${where} day ${j + 1}: the plans show references only; verse text here needs a translation named on the page first`);
        });
      });
    }

    if (kind === "year-overrides") deferred.push([label, data]);
  }

  // Devotion ids are unique across every devotion file, hidden or live.
  const byId = new Map();
  const hidden = new Set();
  for (const [id, where, live] of devotionIds) {
    if (byId.has(id)) errors.push(`${where}: id "${id}" is also ${byId.get(id)} (each devotion gets its own page and printed card)`);
    else {
      byId.set(id, where);
      if (!live) hidden.add(id);
    }
  }
  const everyId = new Set(byId.keys());
  // The devotions the site shows: the year map may name only these, and only these are frozen.
  const ids = [...byId.keys()].filter((id) => !hidden.has(id));
  const known = new Set(ids);

  // The year map and its hand overrides name only devotions that exist.
  const devotionRefs = (text) => [...text.matchAll(/["']?\b(?:devotion|devotionId)["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1]);
  if (fs.existsSync(yearMapFile)) {
    const refs = devotionRefs(fs.readFileSync(yearMapFile, "utf8"));
    if (refs.length === 0) errors.push(`${path.relative(root, yearMapFile)}: no devotion ids found; teach scripts/validate-family.mjs how to read the year map`);
    for (const id of new Set(refs)) {
      if (hidden.has(id)) errors.push(`${path.relative(root, yearMapFile)}: names devotion "${id}", which is hidden until its strand file goes live; regenerate the map (node scripts/build-family-year.mjs)`);
      else if (!known.has(id)) errors.push(`${path.relative(root, yearMapFile)}: names devotion "${id}", which does not exist`);
    }
    counts.yearMap = new Set(refs).size;
  }
  for (const [label, data] of deferred) {
    // A hand override may pin a hidden devotion; the year map leaves the pin out until it goes live.
    for (const id of new Set(devotionRefs(JSON.stringify(data)))) if (!everyId.has(id)) errors.push(`${label}: names devotion "${id}", which does not exist`);
  }

  // The freeze: every devotion id ever committed still resolves.
  const frozen = readJson(errors, frozenFile, path.relative(root, frozenFile));
  const frozenIds = Array.isArray(frozen?.ids) ? frozen.ids : [];
  if (frozen !== undefined && !Array.isArray(frozen?.ids)) errors.push(`${path.relative(root, frozenFile)}: expected { "ids": [...] }`);
  const redirects = new Map();
  const vercel = readJson(errors, redirectsFile, path.relative(root, redirectsFile));
  for (const r of vercel?.redirects ?? []) {
    const from = /^\/family\/devotions\/([a-z0-9-]+)$/.exec(r.source ?? "");
    const to = /^\/family\/devotions\/([a-z0-9-]+)$/.exec(r.destination ?? "");
    if (from) redirects.set(from[1], to ? to[1] : null);
  }
  const seenFrozen = new Set();
  for (const id of frozenIds) {
    if (seenFrozen.has(id)) errors.push(`${FROZEN_IDS}: "${id}" is listed twice`);
    seenFrozen.add(id);
    if (known.has(id)) continue;
    if (hidden.has(id)) {
      errors.push(`devotion id "${id}" is frozen (it has been live, and a printed card may point at /family/devotions/${id}), but its strand file is no longer live. Set "live" back to true, or move the devotion to a live file.`);
      continue;
    }
    const to = redirects.get(id);
    if (to === undefined) errors.push(`devotion id "${id}" was removed or renamed without a redirect entry. A printed card's QR code points at /family/devotions/${id}: restore the id, or add a vercel.json redirect from /family/devotions/${id} to the devotion that replaces it.`);
    else if (to === null || !known.has(to)) errors.push(`vercel.json: /family/devotions/${id} must redirect to /family/devotions/<id> of a devotion that exists${to ? ` ("${to}" does not)` : ""}`);
  }
  const unfrozen = ids.filter((id) => !seenFrozen.has(id));
  for (const id of unfrozen) errors.push(`devotion id "${id}" is not in ${FROZEN_IDS} yet: run node scripts/validate-family.mjs --freeze to record it`);

  // One translation per surface: each page names what its libraries are shown in.
  for (const [rel, kinds, file] of pages) {
    if (!fs.existsSync(file)) { errors.push(`${rel}: listed in PAGES in scripts/validate-family.mjs but not found; update PAGES`); continue; }
    const want = new Set(kinds.map((k) => KINDS[k].translation).filter(Boolean));
    const have = renderingsIn(fs.readFileSync(file, "utf8"));
    const show = (s) => (s.size ? [...s].sort().join(" and ") : "none");
    if (show(want) !== show(have)) errors.push(`${rel}: its <ScriptureNote> names ${show(have)}, but the libraries it shows are in ${show(want)}`);
  }

  // Counts match copy. A catechism count is read only in copy that points at
  // the family catechism (its page or its data file), so a glossary or history
  // page giving the Heidelberg or Westminster catechism's own count is not
  // mistaken for a claim about this one.
  for (const [rel, text] of copy) {
    const ours = /catechism/i.test(path.basename(rel)) || /\/family\/catechism|family-catechism/.test(text);
    for (const m of ours ? text.matchAll(CATECHISM_CLAIM) : []) {
      const near = text.slice(Math.max(0, m.index - 160), m.index + m[0].length + 160);
      if (!/catechism/i.test(path.basename(rel)) && !/catechism/i.test(near)) continue;
      const n = countWord(m[1]);
      if (n !== counts.catechism) errors.push(`${rel}: says "${m[0]}" about the catechism, which has ${counts.catechism} questions`);
    }
    for (const m of text.matchAll(WEEKLY_CLAIM)) {
      const n = countWord(m[1]);
      if (n !== counts.foundations) errors.push(`${rel}: says "${m[0]}", but /family/devotions lists ${counts.foundations}`);
    }
  }

  return { errors, notes, counts, ids, unfrozen, hidden: [...hidden] };
}

/** Add every current devotion id missing from the freeze record. Never removes one. */
export function freezeIds({ root = REPO, frozenFile = path.join(root, FROZEN_IDS), ...rest } = {}) {
  const { ids } = checkFamily({ root, frozenFile, ...rest });
  const record = fs.existsSync(frozenFile) ? JSON.parse(fs.readFileSync(frozenFile, "utf8")) : {};
  const have = new Set(Array.isArray(record.ids) ? record.ids : []);
  const added = ids.filter((id) => !have.has(id));
  const next = { ...record, ids: [...(Array.isArray(record.ids) ? record.ids : []), ...added] };
  fs.writeFileSync(frozenFile, `${JSON.stringify(next, null, 2)}\n`);
  return added;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  if (process.argv.includes("--freeze")) {
    const added = freezeIds();
    console.log(added.length ? `Froze ${added.length} new devotion id(s): ${added.join(", ")}` : "No new devotion ids to freeze.");
  }
  const { errors, notes, counts } = checkFamily();
  for (const n of notes) console.log(`  note: ${n}`);
  if (errors.length) {
    console.error(`\nFamily libraries: ${errors.length} problem(s)\n`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log(
    `Family libraries: clean (${counts.files} files; ${counts.devotions} devotions with unique, frozen ids` +
      `${counts.hidden ? ` (${counts.hidden} of them hidden until their strand goes live, so not frozen yet)` : ""}; ` +
      `${counts.catechism} catechism questions; ${counts.seasonalDays} seasonal days; ${counts.plans} reading plans; ` +
      `${counts.passages} passages verbatim BSB; copy counts and translation labels match; ` +
      `${counts.yearMap === undefined ? "year map not generated yet" : `year map names ${counts.yearMap} devotions, all real`}).`,
  );
}
