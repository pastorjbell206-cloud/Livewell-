#!/usr/bin/env node
/**
 * build-search-index.mjs
 *
 * Writes client/public/search-index.json: the sources on-site search (/search)
 * reads that are too large, or too scattered, to fetch whole when a reader
 * types a question. The wisdom topics alone are 700 KB in full; search needs
 * only each one's name, the words people use for it, and a line to show.
 *
 *   Wisdom topics        client/public/wisdom/topics.json      -> /wisdom/<id>
 *   Honest Answers       client/src/data/answers.ts            -> /answers#<slug>
 *   Family devotions     client/public/family-devotions*.json  -> the devotions library
 *   Family Catechism     client/public/family-catechism.json   -> /family/catechism
 *   Christ and the Nation client/public/nation/<slug>.json     -> /nation/<slug>
 *
 * Nothing here is written copy: every title and line is read from the source
 * the page itself renders. The rewritten essays are searched from
 * essayOverrides.generated.ts, and the other libraries from their own
 * manifests (lib/catalog.ts), so neither is repeated here.
 *
 * Run with tsx, because Honest Answers is a TypeScript data module:
 *   pnpm run search:index            write the index
 *   pnpm run search:index --check    exit 1 if the index is stale (a CI gate)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { devotionsIn } from "./lib/family-devotion-file.mjs";

import { ANSWERS } from "../client/src/data/answers.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "client/public");
export const OUT = "client/public/search-index.json";

/** Where a weekly devotion opens: its own page (The Table, U17). */
const devotionHref = (id) => `/family/devotions/${id}`;

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(PUB, rel), "utf8"));
const str = (x) => (typeof x === "string" ? x.trim() : "");

/**
 * A line short enough to show under a result: whole sentences up to about
 * 200 characters, or, when that leaves too little ("No."), the text cut at a
 * word break.
 */
export function clip(text, max = 200) {
  const s = str(text).replace(/\s+/g, " ");
  if (s.length <= max) return s;
  let out = "";
  for (const sentence of s.match(/[^.?!]+[.?!]+(?=\s|$)|[^.?!]+$/g) ?? []) {
    if ((out + sentence).length > max) break;
    out += sentence;
  }
  if (out.trim().length >= 60) return out.trim();
  const cut = s.slice(0, max + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

function wisdom() {
  return readJson("wisdom/topics.json").topics.map((t) => ({
    title: str(t.label),
    blurb: clip(t.framing),
    keywords: (t.keywords ?? []).map(str).filter(Boolean).join(" · "),
    href: `/wisdom/${t.id}`,
  }));
}

function answers() {
  return ANSWERS.map((a) => ({
    title: str(a.question),
    blurb: clip(a.paragraphs?.[0]),
    href: `/answers#${a.slug}`,
  }));
}

function devotions() {
  const weekly = ["family-devotions.json", "family-devotions-2.json"].flatMap((f) => devotionsIn(readJson(f)).devotions);
  return weekly.map((d) => ({
    title: str(d.title),
    blurb: clip(d.bigIdea),
    facet: str(d.theme),
    keywords: str(d.passage),
    href: devotionHref(d.id),
  }));
}

function catechism() {
  return readJson("family-catechism.json").map((q) => ({
    title: str(q.question),
    blurb: clip(q.answer || q.kidsAnswer),
    facet: str(q.part),
    keywords: str(q.scripture),
    href: "/family/catechism",
  }));
}

function nation() {
  return fs
    .readdirSync(path.join(PUB, "nation"))
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => readJson(`nation/${f}`))
    // The scorecard and the policy page are tools, and the tools are searched from the /tools registry.
    .filter((n) => str(n.slug) && str(n.title))
    .map((n) => ({ title: str(n.title), blurb: clip(n.subtitle), href: `/nation/${n.slug}` }));
}

/** The index, sources in the order a tie between them should fall. */
export function buildSearchIndex() {
  const drop = (e) => Object.fromEntries(Object.entries(e).filter(([, v]) => v !== ""));
  // One result per question per page: the catechism asks five of its questions
  // twice (once in their part, again in the last), and both open the same page.
  const once = (e, i, all) => all.findIndex((x) => x.title === e.title && x.href === e.href) === i;
  const source = (label, indexHref, entries) => ({ label, indexHref, entries: entries.filter((e) => e.title).filter(once).map(drop) });
  return {
    sources: [
      source("Honest Answers", "/answers", answers()),
      source("Christ and the Nation", "/nation", nation()),
      source("Family Devotions", "/family/devotions", devotions()),
      source("Family Catechism", "/family/catechism", catechism()),
      source("What the Bible Says", "/wisdom", wisdom()),
    ],
  };
}

export function renderSearchIndex(index = buildSearchIndex()) {
  return `${JSON.stringify(index)}\n`;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const out = path.join(ROOT, OUT);
  const index = buildSearchIndex();
  const text = renderSearchIndex(index);
  const count = index.sources.reduce((n, s) => n + s.entries.length, 0);
  if (process.argv.includes("--check")) {
    const current = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
    if (current !== text) {
      console.error(`[search-index] ${OUT} is stale. Run: pnpm run search:index`);
      process.exit(1);
    }
    console.log(`[search-index] up to date (${count} entries)`);
  } else {
    fs.writeFileSync(out, text);
    console.log(`[search-index] wrote ${count} entries (${(text.length / 1024).toFixed(1)} KB) to ${OUT}`);
  }
}
