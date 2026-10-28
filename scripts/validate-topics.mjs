#!/usr/bin/env node
/**
 * validate-topics.mjs — the gate for the topic pages and the /topics index
 * (MASTER-PLAN 4.4). A topic page is one question with one assembled answer
 * across formats; this holds every page to that shape and to the house rules:
 *
 *   - every address resolves (scripts/lib/site-routes.mjs): a live route, a
 *     public essay (the shelf, scripts/lib/shelf.mjs), or, where the essay is
 *     not public yet, a named stand-in that is; never through a redirect; an
 *     Honest Answer's #anchor exists;
 *   - every Scripture reference parses with the shared parser (scripts/lib/bsb.mjs);
 *   - no slot empty without a stand-in: the short answer (150 to 250 words),
 *     a lead to read first, three to five passages, a witness from church
 *     history, a devotion for the table, something to use;
 *   - Forbidden Language (the full list), no em-dash, no exclamation point (a
 *     topic page quotes no Scripture), no percentage or "N in 10" in a short
 *     answer (the plan prints no statistics);
 *   - a page flagged sensitive carries a care link with its crisis lines;
 *     a page about politics is flagged politics (validate-politics.mjs then
 *     holds it to both directions); at most two tools, the politics page the
 *     four public-square instruments (7.4); at most six pages.
 *
 *   node scripts/validate-topics.mjs                     CI gate
 *   node scripts/validate-topics.mjs --dir <folder>      check the pages in another folder (tests)
 *
 * Essays named before they are public (a pilot on its way to the shelf) are
 * listed as waiting; the page shows the stand-in until they are.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { resolveHref } from "./lib/site-routes.mjs";
import { loadEssayShelf } from "./lib/shelf.mjs";
import { readRef } from "./lib/bsb.mjs";
import { SCRIPTURE_REF_SOURCE } from "./lib/essay-text.mjs";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import { MAX_PAGES, ROOT, ROWS_FILE, TOPICS_DIR, buildTopicsIndex, readRows, readTopicPages, topicStrings, words } from "./lib/topics.mjs";

const CRISIS_TOPICS = new Set(["suicide", "abuse", "sexual-assault", "substance"]);
const POLITICS_WORDS = /\b(politic\w*|nationalis\w*|partisan|election\w*|vote\w*|voting)\b/i;
const STATISTIC = /\d\s*%|\bper\s?cent\b|\b(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:in|out of)\s+(?:\d+|three|four|five|six|seven|eight|nine|ten)\b/i;
const REFS = new RegExp(SCRIPTURE_REF_SOURCE, "g");
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** What the gate reads besides the pages: the shelf, the family index, the Honest Answers' anchors. */
export function loadContext(root = ROOT) {
  const shelf = loadEssayShelf(root);
  const family = JSON.parse(fs.readFileSync(path.join(root, "client/public/family/index.json"), "utf8"));
  const devotions = new Map((family.devotions || []).map((d) => [d.id, d.title]));
  const answersSrc = fs.readFileSync(path.join(root, "client/src/data/answers.ts"), "utf8");
  const answers = new Set([...answersSrc.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]));
  return { shelf, devotions, answers };
}

/**
 * Where an address stands: "ok", "waiting" (an essay not public yet), or a
 * problem in words. `essayOk` allows an essay that is not public yet.
 */
function hrefStatus(href, ctx, { essayOk = false } = {}) {
  if (typeof href !== "string" || !href.startsWith("/")) return "is not a site address";
  const essay = href.match(/^\/writing\/([a-z0-9-]+)$/);
  if (essay) {
    const slug = essay[1];
    if (ctx.shelf.isPublic(slug)) return "ok";
    if (!essayOk) return `is an essay that is not public (${ctx.shelf.entries.has(slug) ? "pending on the shelf" : "not on the shelf"})`;
    return "waiting";
  }
  const section = href.match(/^\/writing\?section=([a-z0-9-]+)$/);
  if (section) {
    const live = new Set(ctx.shelf.liveEssays().map((e) => e.section));
    return live.has(section[1]) ? "ok" : `names a shelf section with no public essay ("${section[1]}")`;
  }
  const [base, anchor] = href.split("#");
  if (anchor && base === "/answers" && !ctx.answers.has(anchor)) return `names an Honest Answer that does not exist (#${anchor})`;
  const r = resolveHref(href);
  if (r.status === "ok") return "ok";
  if (r.status === "redirect") return `only works through a redirect (link ${r.to} instead)`;
  return r.status === "missing" ? "goes nowhere" : `cannot be checked (${r.status})`;
}

const isText = (x) => typeof x === "string" && x.trim().length > 0;

/** One topic page's problems, and the essays it names that are not public yet. */
export function topicProblems(page, fileSlug, ctx) {
  const problems = [];
  const waiting = [];
  const fail = (where, msg) => problems.push(`${fileSlug}.json${where ? ` ${where}` : ""}: ${msg}`);
  if (!page || typeof page !== "object" || Array.isArray(page)) return { problems: [`${fileSlug}.json: not a JSON object`], waiting };

  const link = (where, l, opts = {}) => {
    if (!l || typeof l !== "object") return fail(where, "is missing");
    if (!isText(l.label)) fail(where, "needs a label");
    if (opts.line !== false && !isText(l.line)) fail(where, "needs a line");
    const s = hrefStatus(l.href, ctx, opts);
    if (s === "waiting") waiting.push(`${fileSlug}: ${l.href} (${where})`);
    else if (s !== "ok") fail(where, `${l.href} ${s}`);
    return s;
  };

  if (page.slug !== fileSlug) fail("slug", `"${page.slug}" does not match the file name`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fileSlug)) fail("", "the file name is not a lowercase slug");
  if (!isText(page.title) || !page.title.trim().endsWith("?")) fail("title", "is the question as asked, ending in a question mark");
  if (!isText(page.description) || page.description.length < 60 || page.description.length > 200) fail("description", "needs 60 to 200 characters (the search snippet)");
  if (!Array.isArray(page.askedAs) || page.askedAs.length < 3 || !page.askedAs.every(isText)) fail("askedAs", "needs at least three phrasings people search");

  // 1. The short answer.
  const short = Array.isArray(page.short) ? page.short : [];
  if (short.length < 1 || !short.every(isText)) fail("short", "needs its paragraphs");
  const n = words(short.join(" "));
  if (n < 150 || n > 250) fail("short", `is ${n} words (150 to 250)`);
  if (STATISTIC.test(short.join(" "))) fail("short", "carries a statistic (a percentage or \"N in 10\"); the short answer argues from Scripture, history, and the essay");

  // 2. Read this first: the lead, or the stand-in that shows until it is public.
  let leadPublic = false;
  if (page.essay !== null) {
    const s = link("essay", page.essay, { essayOk: true });
    if (typeof page.essay?.href === "string" && !page.essay.href.startsWith("/writing/")) fail("essay", "is an essay (/writing/<slug>); another kind of lead goes in essayStandIn with essay null");
    leadPublic = s === "ok";
  }
  if (!leadPublic) {
    if (!page.essayStandIn) fail("essayStandIn", "is needed: the lead essay is not public, and no slot stays empty");
    else if (link("essayStandIn", page.essayStandIn) !== "ok") fail("essayStandIn", "must be a live page");
  } else if (page.essayStandIn) link("essayStandIn", page.essayStandIn);
  const also = Array.isArray(page.alsoEssays) ? page.alsoEssays : [];
  if (!Array.isArray(page.alsoEssays)) fail("alsoEssays", "is a list (empty is fine)");
  if (also.length > 2) fail("alsoEssays", "holds at most two further essays");
  also.forEach((e, i) => {
    link(`alsoEssays[${i}]`, e, { essayOk: true });
    if (typeof e?.href === "string" && !e.href.startsWith("/writing/")) fail(`alsoEssays[${i}]`, "is an essay (/writing/<slug>)");
  });
  if (page.section !== undefined) {
    const sec = page.section;
    if (!isText(sec?.slug) || !isText(sec?.label) || !isText(sec?.line)) fail("section", "needs slug, label, and line");
    else {
      const s = hrefStatus(`/writing?section=${sec.slug}`, ctx);
      if (s !== "ok") fail("section", s);
    }
  }
  if (page.bothWays !== undefined) {
    for (const side of ["right", "left"]) {
      const w = page.bothWays?.[side];
      if (!w) continue; // validate-politics.mjs names a missing side
      link(`bothWays.${side}.essay`, w.essay, { line: false });
      link(`bothWays.${side}.path`, w.path, { line: false });
    }
  }

  // 3. Scripture, read in its world.
  const passages = Array.isArray(page.scripture) ? page.scripture : [];
  if (passages.length < 3 || passages.length > 5) fail("scripture", `has ${passages.length} passages (three to five)`);
  passages.forEach((p, i) => {
    if (!readRef(p?.ref)) fail(`scripture[${i}]`, `"${p?.ref}" is not a reference the parser can read`);
    if (!isText(p?.line)) fail(`scripture[${i}]`, "needs its one line");
    if (p?.context !== undefined) {
      link(`scripture[${i}].context`, p.context, { line: false });
      if (typeof p.context?.href === "string" && !p.context.href.startsWith("/resources/context/")) fail(`scripture[${i}].context`, "is a context guide (/resources/context/<slug>)");
    }
  });

  // 4. The church has been here before.
  if (!page.witness || !isText(page.witness.name)) fail("witness", "needs one witness from church history, named");
  else link("witness", page.witness);

  // 5. At the table.
  const table = page.table;
  if (!table || !isText(table.devotion)) fail("table", "needs a family devotion (its id, or \"tonight\")");
  else {
    if (table.devotion !== "tonight") {
      const title = ctx.devotions.get(table.devotion);
      if (!title) fail("table.devotion", `"${table.devotion}" is not in client/public/family/index.json`);
      else if (table.label !== title) fail("table.label", `is the devotion's own title ("${title}")`);
    }
    if (!isText(table.line)) fail("table", "needs a line");
    (Array.isArray(table.also) ? table.also : []).forEach((l, i) => link(`table.also[${i}]`, l));
  }

  // 6. Use this.
  const use = page.use || {};
  if (use.plan) {
    link("use.plan", use.plan);
    if (!String(use.plan.href).startsWith("/plans/")) fail("use.plan", "is an eight-week plan (/plans/<slug>)");
  }
  if (use.study) {
    link("use.study", use.study);
    if (!String(use.study.href).startsWith("/studyguides/")) fail("use.study", "is a study guide (/studyguides/<slug>)");
  }
  const tools = Array.isArray(use.tools) ? use.tools : [];
  const toolCap = page.politics === true ? 4 : 2;
  if (tools.length > toolCap) fail("use.tools", `holds at most ${toolCap} tools`);
  tools.forEach((t, i) => link(`use.tools[${i}]`, t));
  const paths = Array.isArray(use.paths) ? use.paths : [];
  paths.forEach((t, i) => {
    link(`use.paths[${i}]`, t);
    if (!String(t?.href).startsWith("/pathways/")) fail(`use.paths[${i}]`, "is a guided path (/pathways/<slug>)");
  });
  if (!use.plan && !use.study && !tools.length && !paths.length) fail("use", "needs something to use: a plan, a study guide, a tool, or a path");

  // Care, and crisis care where the page is sensitive.
  const care = page.care === undefined ? [] : page.care;
  if (!Array.isArray(care) || care.length > 2) fail("care", "is a list of at most two care pages");
  (Array.isArray(care) ? care : []).forEach((c, i) => {
    link(`care[${i}]`, c);
    if (!String(c?.href).startsWith("/help/")) fail(`care[${i}]`, "is a Find Help page (/help/<slug>)");
    if (c?.crisis !== undefined && (!Array.isArray(c.crisis) || !c.crisis.every((t) => CRISIS_TOPICS.has(t)))) fail(`care[${i}].crisis`, `names crisis lines from ${[...CRISIS_TOPICS].join(", ")}`);
  });
  if (typeof page.sensitive !== "boolean") fail("sensitive", "is true or false");
  if (page.sensitive === true && !(Array.isArray(care) && care.some((c) => Array.isArray(c?.crisis) && c.crisis.length))) fail("care", "a sensitive page carries a care link with its crisis lines");
  if (typeof page.politics !== "boolean") fail("politics", "is true or false");
  if (page.politics !== true && POLITICS_WORDS.test([page.title, ...(page.askedAs || [])].join(" "))) fail("politics", "the question is about politics, so the page is flagged politics: true (validate-politics.mjs holds it to both directions)");
  if (page.politics === true && !page.bothWays) fail("bothWays", "a politics page names both directions (validate-politics.mjs)");

  if (!Array.isArray(page.folds) || !page.folds.every((h) => typeof h === "string" && h.startsWith("/pathways/"))) fail("folds", "lists the /pathways/ pages this page retires (none until James says yes, question 6)");
  if (!ISO_DATE.test(page.updated ?? "")) fail("updated", "is a date (YYYY-MM-DD)");
  if (page.reviewed !== null && !(ISO_DATE.test(page.reviewed?.on ?? "") && isText(page.reviewed?.by))) fail("reviewed", "is null until read, then { on, by }");

  // House style over every reader-facing string; every reference in them parses.
  for (const [where, s] of topicStrings(page)) {
    for (const m of setAsideAllowed(s).matchAll(forbiddenRe)) fail(where, `Forbidden Language: "${m[0]}"`);
    if (/—/.test(s) || /\s–\s/.test(s) || /--/.test(s)) fail(where, "carries an em-dash (use a comma, colon, period, or parentheses)");
    if (s.includes("!")) fail(where, "carries an exclamation point (a topic page quotes no Scripture, so none at all)");
    for (const m of s.matchAll(REFS)) if (!readRef(m[0])) fail(where, `"${m[0]}" is not a reference the parser can read`);
  }
  return { problems, waiting };
}

/** The index rows, as built: each resolves, and an essay not public yet names a live stand-in. */
export function rowProblems(rows, ctx) {
  const problems = [];
  const waiting = [];
  rows.forEach((r, i) => {
    const where = `index row ${i + 1} ("${r.askedAs}")`;
    if (!isText(r.askedAs)) problems.push(`${where}: needs the question in the reader's words`);
    if (!isText(r.line)) problems.push(`${where}: needs a line`);
    if (r.kind === "topic") return;
    const s = hrefStatus(r.href, ctx, { essayOk: true });
    if (s === "waiting") {
      if (!r.standIn) problems.push(`${where}: ${r.href} is not public yet and the row names no standIn`);
      else waiting.push(`index: ${r.href}`);
    } else if (s !== "ok") problems.push(`${where}: ${r.href} ${s}`);
    if (r.standIn) {
      if (!/^\/writing\/[^/?#]+$/.test(r.href)) problems.push(`${where}: standIn is only for a row to an essay (/writing/<slug>); the page never opens it here`);
      const t = hrefStatus(r.standIn, ctx);
      if (t !== "ok") problems.push(`${where}: standIn ${r.standIn} ${t}`);
    }
    if (r.also) {
      const t = hrefStatus(r.also.href, ctx);
      if (t !== "ok") problems.push(`${where}: also ${r.also.href} ${t}`);
      if (!isText(r.also.label)) problems.push(`${where}: also needs a label`);
    }
    for (const str of [r.askedAs, r.line, r.also?.label, r.also?.line].filter(isText)) {
      for (const m of setAsideAllowed(str).matchAll(forbiddenRe)) problems.push(`${where}: Forbidden Language: "${m[0]}"`);
      if (/—/.test(str) || /--/.test(str)) problems.push(`${where}: carries an em-dash`);
      if (str.includes("!")) problems.push(`${where}: carries an exclamation point`);
    }
  });
  const seen = new Set();
  for (const r of rows) {
    if (seen.has(r.href)) problems.push(`index: ${r.href} is opened by two rows; one question, one best page`);
    seen.add(r.href);
  }
  return { problems, waiting };
}

/** The whole gate: the pages in `dir`, and the index built from them and the rows file. */
export function checkTopics({ dir = path.join(ROOT, TOPICS_DIR), rowsFile = path.join(ROOT, ROWS_FILE), ctx = loadContext() } = {}) {
  const pages = readTopicPages(dir);
  const problems = [];
  const waiting = [];
  if (pages.length > MAX_PAGES) problems.push(`${pages.length} topic pages; at most ${MAX_PAGES} until search data argues for more (James's call)`);
  for (const p of pages) {
    if (!p.data) {
      problems.push(`${p.file}: not readable JSON (${p.error})`);
      continue;
    }
    const r = topicProblems(p.data, p.slug, ctx);
    problems.push(...r.problems);
    waiting.push(...r.waiting);
  }
  const built = buildTopicsIndex(pages, readRows(rowsFile));
  problems.push(...built.problems);
  const rows = rowProblems(built.index.rows, ctx);
  problems.push(...rows.problems);
  waiting.push(...rows.waiting);
  return { pages: pages.length, rows: built.index.rows.length, problems, waiting };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const at = process.argv.indexOf("--dir");
  const dir = at > 0 ? path.resolve(process.argv[at + 1] ?? "") : undefined;
  const { pages, rows, problems, waiting } = checkTopics(dir ? { dir } : {});
  if (problems.length) {
    console.error(`\n[validate-topics] ${problems.length} problem(s):\n`);
    for (const p of problems) console.error(`  - ${p}`);
    console.error("\nMASTER-PLAN 4.3 and 4.4 say what each slot holds; CLAUDE.md holds the Forbidden Language list.\n");
    process.exit(1);
  }
  console.log(`[validate-topics] clean: ${pages} topic pages, ${rows} index rows.`);
  if (waiting.length) {
    console.log(`[validate-topics] ${waiting.length} essay link(s) wait for the shelf; the page shows the named stand-in until each is public:`);
    for (const w of waiting) console.log(`  - ${w}`);
  }
}
