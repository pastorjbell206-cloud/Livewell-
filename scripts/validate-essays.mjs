#!/usr/bin/env node
/**
 * validate-essays.mjs — the gate every rewritten essay passes before readers
 * see it (client/public/essays/<slug>.json, master plan section 9.2).
 *
 * A rewrite turns a pending shelf essay public the moment its file lands, so
 * this reads each file the way an editor would before it goes out:
 *
 *   shape       the override shape build-essays-index.mjs reads
 *               (scripts/lib/shelf.mjs), no field the site ignores, no second
 *               H1, and no opening paragraph that repeats the excerpt;
 *   language    CLAUDE.md's Forbidden Language list
 *               (scripts/lib/forbidden-language.mjs) and the essay brief's
 *               rulebook leakage, in our own prose;
 *   dashes      no em-dash in our own prose, nor the "---", "--", or spaced
 *               en-dash typed in its place; the title and excerpt carry none at
 *               all, since they feed the listings and llms-full.txt;
 *   "!"         only inside quoted Scripture: a quotation with its reference
 *               beside it;
 *   links       every internal link reaches a public page directly: a public
 *               shelf essay, or a live route that is not a redirect;
 *   references  the essay cites Scripture by reference at least once, and a
 *               Closing Texts line reads *"Quote."* (Reference) on one line.
 *
 * Quotations keep their own words and punctuation (scripts/lib/essay-text.mjs).
 * References are recognized by shape, not yet parsed; the shared reference
 * parser (U09) and the quotation verifier (U27) tighten this gate later.
 *
 *   node scripts/validate-essays.mjs                  every essay file (CI gate)
 *   node scripts/validate-essays.mjs <file|dir> ...   only these (a draft, or the seeded-file test)
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, OVERRIDES_DIR, createShelf, loadEssayShelf, overrideProblems } from "./lib/shelf.mjs";
import { resolveHref } from "./lib/site-routes.mjs";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import {
  SCRIPTURE_REF_SOURCE,
  around,
  dashesIn,
  hasReferenceBeside,
  hasScriptureRef,
  lineAt,
  readEssayText,
} from "./lib/essay-text.mjs";

/** The fields an essay file holds; the site reads nothing else. */
export const ESSAY_FIELDS = ["slug", "title", "excerpt", "body", "updated"];

/**
 * Rulebook leakage, from the essay writers' brief (docs/work/essays/BRIEF.md
 * on the work branch): the editorial rules written into the prose. The fair
 * thing is done, never announced.
 */
const RULEBOOK = [
  /\bsteel[- ]?m[ae]n\w*/gi,
  /\bverdicts?\b/gi,
  /\bindictments?\b/gi,
  /\bself-implicat\w*/gi,
  /\bboth-?sides-?ism\b/gi,
  /\bthe fair place to begin\b/gi,
  /\bdeserves to be stated the way\b/gi,
  /\bdeserves to be granted plainly\b/gi,
  /\bthe objection runs like this\b/gi,
  /\bNot X\. Y\./g,
];

const ITALIC_QUOTE_LINE = /^[ \t]*([*_])[“"].*?[”"][.,]?\1(.*)$/gm;
const CLOSING_TEXT_TRAILER = new RegExp(String.raw`^\s+\([^()]*${SCRIPTURE_REF_SOURCE}[^()]*\)\s*$`);

/** The rules every reader-facing field shares. `strictDashes`: no dash even inside a quotation. */
function proseProblems(field, text, strictDashes) {
  const out = [];
  const at = (i) => (field === "body" ? `body line ${lineAt(text, i)}` : field);
  const near = (i) => `("…${around(text, i)}…")`;
  const { prose, quotes, unbalanced } = readEssayText(text);

  for (const i of unbalanced)
    out.push(`${at(i)}: a quotation mark with no partner in its paragraph ${near(i)}; the gate cannot tell the quotation from the prose`);
  for (const m of setAsideAllowed(prose).matchAll(forbiddenRe))
    out.push(`${at(m.index)}: Forbidden Language "${m[1]}" ${near(m.index)}`);
  for (const re of RULEBOOK)
    for (const m of prose.matchAll(re))
      out.push(`${at(m.index)}: rulebook leakage "${m[0]}" ${near(m.index)}; do the fair thing without announcing it`);
  for (const d of dashesIn(strictDashes ? text : prose, { standIns: true }))
    out.push(`${at(d.index)}: ${d.kind} ${near(d.index)}; use a comma, colon, period, or parentheses`);

  // "![" opens a Markdown image; it is not an exclamation.
  for (const m of prose.matchAll(/!(?!\[)/g))
    out.push(`${at(m.index)}: exclamation point outside quoted Scripture ${near(m.index)}`);
  for (const q of quotes)
    if (text.slice(q.start, q.end).includes("!") && !hasReferenceBeside(text, q))
      out.push(`${at(q.start)}: exclamation point in a quotation with no Scripture reference beside it ${near(q.start)}; only quoted Scripture keeps one`);
  return out;
}

/** Does an internal link reach a public page directly? null when it does. */
function linkProblem(href, shelf) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return null; // https:, mailto: (off the site)
  if (href.startsWith("#")) return null;
  if (!href.startsWith("/") || href.startsWith("//")) return `link "${href}" is not a site path (internal links start with /)`;
  const path = href.split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";
  const essay = path.match(/^\/writing\/([^/]+)$/);
  if (essay) {
    let slug = essay[1];
    try {
      slug = decodeURIComponent(slug);
    } catch {
      return `link ${href} is not a readable address`;
    }
    const seen = shelf.visibility(slug);
    if (seen === "shelf") return null;
    const r = resolveHref(path);
    if (r.status === "redirect") return `link ${href} redirects to ${r.to}; link there directly`;
    return `link ${href} is not a public essay (${seen === "pending" ? "on the shelf with no rewrite yet" : "not on the shelf, so retired"})`;
  }
  const r = resolveHref(path);
  if (r.status === "ok") return null;
  if (r.status === "redirect") return `link ${href} redirects to ${r.to}; link there directly`;
  if (r.status === "missing") return `link ${href} is not a page on the site`;
  return `link ${href} cannot be confirmed as a public page; link to one the gate can check`;
}

/** The checks that belong to the body alone. */
function bodyProblems(body, excerpt, shelf) {
  const out = [];
  const at = (i) => `body line ${lineAt(body, i)}`;

  for (const m of body.matchAll(/^[ \t]{0,3}#[ \t]/gm))
    out.push(`${at(m.index)}: an H1 heading; the page sets the title as the only H1, so sections use ##`);

  const plain = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const first = body.split(/\n[ \t]*\n/).map((b) => b.trim()).find((b) => b && !b.startsWith("#"));
  if (excerpt.trim() && first && plain(first) === plain(excerpt))
    out.push(`${at(body.indexOf(first))}: opens by repeating the excerpt, which the page already sets under the title`);

  const hrefs = [
    ...[...body.matchAll(/\]\(\s*<?([^()\s>]+)/g)].map((m) => ({ href: m[1], index: m.index })),
    ...[...body.matchAll(/^[ \t]*\[[^\]]+\]:[ \t]*<?([^\s>]+)/gm)].map((m) => ({ href: m[1], index: m.index })),
  ];
  for (const { href, index } of hrefs) {
    const p = linkProblem(href, shelf);
    if (p) out.push(`${at(index)}: ${p}`);
  }

  if (!hasScriptureRef(body))
    out.push("body: cites no Scripture by reference (Book chapter:verse); a quotation travels with its reference");
  for (const m of body.matchAll(ITALIC_QUOTE_LINE)) {
    const trailer = m[2];
    // A line that goes on in prose after the italic quotation is not a Closing Text.
    if (trailer.trim() && !trailer.trim().startsWith("(") && !/^\s*[—–-]/.test(trailer)) continue;
    if (!CLOSING_TEXT_TRAILER.test(trailer))
      out.push(`${at(m.index)}: a Closing Texts line reads *"Quote."* (Reference), the Scripture reference in parentheses on the same line`);
  }
  return out;
}

/** Every problem with one essay file's data, as reader-facing strings. */
export function essayProblems(data, shelf) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return [];
  const out = [];
  for (const k of Object.keys(data))
    if (!ESSAY_FIELDS.includes(k)) out.push(`unknown field "${k}" (an essay file holds only ${ESSAY_FIELDS.join(", ")})`);
  const str = (k) => (typeof data[k] === "string" ? data[k] : "");
  out.push(...proseProblems("title", str("title"), true));
  out.push(...proseProblems("excerpt", str("excerpt"), true));
  if (str("body")) out.push(...proseProblems("body", str("body"), false), ...bodyProblems(str("body"), str("excerpt"), shelf));
  return out;
}

function jsonFilesIn(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => join(dir, f));
}

/** The files a run checks: the essays folder, or the files and folders named. */
export function essayFiles(args = []) {
  if (!args.length) return jsonFilesIn(join(ROOT, OVERRIDES_DIR));
  return args.flatMap((a) => {
    const p = resolve(a);
    return existsSync(p) && statSync(p).isDirectory() ? jsonFilesIn(p) : [p];
  });
}

/**
 * Check essay files against the shelf as the repository holds it. The files
 * being checked go public together with the rewrites already in place, so a
 * link from one to another counts as public. Returns { files, problems }.
 */
export function checkEssayFiles(files) {
  const current = loadEssayShelf();
  const shelfSlugs = new Set(current.data.essays.map((e) => e.slug));
  const problems = [];
  const docs = [];
  for (const file of files) {
    const name = basename(file);
    const fileSlug = name.replace(/\.json$/, "");
    let data;
    try {
      data = JSON.parse(readFileSync(file, "utf8"));
    } catch (err) {
      problems.push(`${name}: not readable JSON (${err.message})`);
      continue;
    }
    const shape = overrideProblems(data, fileSlug, shelfSlugs);
    problems.push(...shape);
    docs.push({ name, fileSlug, data, shapeOk: shape.length === 0 });
  }
  const shelf = createShelf(current.data, [...current.overrides, ...docs.filter((d) => d.shapeOk).map((d) => d.fileSlug)]);
  for (const d of docs) problems.push(...essayProblems(d.data, shelf).map((p) => `${d.name}: ${p}`));
  return { files: files.length, problems };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { files, problems } = checkEssayFiles(essayFiles(process.argv.slice(2).filter((a) => !a.startsWith("-"))));
  if (problems.length) {
    console.error(`\nEssays: ${problems.length} problem(s)\n`);
    for (const p of problems) console.error(`  - ${p}`);
    console.error("\nCLAUDE.md (Forbidden Language, Punctuation mechanics) and client/public/essays/README.md say how each should read.\n");
    process.exit(1);
  }
  console.log(`Essays: clean (${files} file${files === 1 ? "" : "s"}).`);
}
