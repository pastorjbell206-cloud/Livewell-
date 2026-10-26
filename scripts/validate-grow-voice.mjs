#!/usr/bin/env node
/**
 * validate-grow-voice.mjs — the Forbidden Language list, literally, across the
 * Grow section's libraries (docs/grow/GROW-PROMPT.md Section 11: "Zero
 * Forbidden Language hits (automated)").
 *
 * Scans the prose of the wisdom topics, life pages, how-tos, study guides,
 * care plans, pathways, and the needs registry for the words and phrases in
 * CLAUDE.md's Forbidden Language section. Text inside double quotation marks
 * that is verbatim Berean Standard Bible is Scripture and is not ours to edit;
 * a few ordinary senses are allowed (foster care, a literal journey in a
 * verse reference's neighborhood is still flagged, so rephrase it).
 *
 * The rewritten essays (client/public/essays/*.json) are in scope too. They
 * quote the ESV and named sources, not the BSB, so there every quotation is set
 * aside (scripts/lib/essay-text.mjs), along with link targets; their own gate
 * is validate-essays.mjs, which reads the same list.
 *
 *   node scripts/validate-grow-voice.mjs                 CI gate
 *   node scripts/validate-grow-voice.mjs --report        print every hit, exit 0
 *   node scripts/validate-grow-voice.mjs --essays <dir>  only the essay files in <dir> (the seeded-file test)
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { ROOT, listFiles } from "./lib/site-routes.mjs";
import { normalize } from "./lib/bsb.mjs";
import { forbiddenRe, setAsideAllowed } from "./lib/forbidden-language.mjs";
import { readEssayText } from "./lib/essay-text.mjs";

const REPORT = process.argv.includes("--report");
const essaysAt = process.argv.indexOf("--essays");
const ESSAYS_ONLY = essaysAt > 0 ? resolve(process.argv[essaysAt + 1] ?? "") : null;

const essayFiles = ESSAYS_ONLY
  ? (existsSync(ESSAYS_ONLY) ? readdirSync(ESSAYS_ONLY) : []).filter((f) => f.endsWith(".json")).map((f) => join(ESSAYS_ONLY, f))
  : listFiles("client/public/essays", [".json"]);
const ESSAYS = new Set(essayFiles);
const FILES = ESSAYS_ONLY
  ? essayFiles
  : [
      ...listFiles("client/public/wisdom/topics", [".json"]),
      ...listFiles("client/public/life/domains", [".json"]),
      ...listFiles("client/public/howtos/a", [".json"]),
      ...listFiles("client/public/studyguides", [".json"]),
      ...listFiles("client/public/plans", [".json"]),
      ...listFiles("client/public/pathways", [".json"]),
      ...listFiles("client/public/needs", [".json"]),
      ...essayFiles,
    ];

// Fields that hold Scripture text, search keywords, or other people's titles.
const EXEMPT_PATH = /(^|\.)(verses\[\d+\]\.text|passages\[\d+\]\.text|keywords(\[\d+\])?|source|cite|sources\[\d+\]\.[a-z]+|bibliography\[\d+\]\.title)$/;

// The whole BSB, normalized, read once and only when a non-essay file needs it.
let bible = null;
function bibleText() {
  if (bible !== null) return bible;
  const books = JSON.parse(readFileSync(join(ROOT, "client/public/bible/books.json"), "utf8"));
  bible = "";
  for (const b of books)
    for (let c = 1; c <= b.chapters; c++)
      bible += " " + JSON.parse(readFileSync(join(ROOT, "client/public/bible/ch", b.slug, `${c}.json`), "utf8")).verses.map((v) => normalize(v.t)).join(" ");
  return bible;
}

/** Every string value in a JSON document, with its path. */
function* strings(value, path = "") {
  if (typeof value === "string") yield [path, value];
  else if (Array.isArray(value)) for (let i = 0; i < value.length; i++) yield* strings(value[i], `${path}[${i}]`);
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) {
    // Titles of other people's books and authors' names are not our prose.
    if (k === "title" && /bibliography|sources|furtherReading/.test(path)) continue;
    if (k === "author") continue;
    yield* strings(v, path ? `${path}.${k}` : k);
  }
}

const hits = [];
for (const rel of FILES) {
  if (rel.endsWith("index.json") || rel.endsWith("plans-index.json")) continue;
  let doc;
  try { doc = JSON.parse(readFileSync(resolve(ROOT, rel), "utf8")); } catch { continue; }
  for (const [path, text] of strings(doc)) {
    if (/^(slug|href|url|id)$|\.(slug|href|url|id)$/.test(path)) continue;
    if (EXEMPT_PATH.test(path)) continue;
    // Set aside verbatim Scripture in double quotes; in an essay, every
    // quotation and link target (the ESV and named sources are not ours to edit).
    const prose = setAsideAllowed(
      ESSAYS.has(rel)
        ? readEssayText(text).prose
        : text.replace(/[“"]([^”"]+)[”"]/g, (m, q) => (bibleText().includes(normalize(q)) && normalize(q).split(" ").length >= 3 ? " " : m))
    );
    for (const m of prose.matchAll(forbiddenRe)) hits.push({ rel, path, word: m[1], at: prose.slice(Math.max(0, m.index - 40), m.index + 50).replace(/\s+/g, " ") });
    // A style note left in reader-facing text ("Not X. Y." is the name of a move, not a sentence).
    if (!/reviewed\.notes$/.test(path)) for (const m of text.matchAll(/\bNot X\. Y\./g)) hits.push({ rel, path, word: "Not X. Y.", at: text.slice(Math.max(0, m.index - 40), m.index + 50).replace(/\s+/g, " ") });
  }
}

if (hits.length) {
  const out = REPORT ? console.log : console.error;
  out(`\nGrow voice: ${hits.length} forbidden-language hit(s)\n`);
  for (const h of hits) out(`  ${h.rel} ${h.path}: "${h.word}"  …${h.at}…`);
  if (!REPORT) {
    console.error("\nRewrite each in plain words (CLAUDE.md, Forbidden Language). Scripture quoted verbatim is exempt.\n");
    process.exit(1);
  }
} else {
  console.log(`Grow voice: clean (${FILES.length} files).`);
}
