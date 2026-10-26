#!/usr/bin/env node
/**
 * validate-design.mjs — the token ratchet.
 *
 * CLAUDE.md: "Styling flows through tokens. Components use inline styles
 * referencing the CSS variables in index.css; never hardcode hex values in
 * components. Brand changes happen at :root." A hardcoded hex breaks dark mode,
 * the admin light scope, and every future brand change, and it had no gate: the
 * rule lived in prose and the count regrew unwatched.
 *
 * This is a ratchet, not a purge. Existing violations are grandfathered in
 * scripts/design-baseline.json, file by file. CI fails when a file holds MORE
 * hardcoded hex than its baseline allows, or when a file with no baseline entry
 * gains any. It never demands that old debt be paid, only that no new debt is
 * taken on. When a file improves, lock the gain in with `--update`.
 *
 * Scope is exactly what CLAUDE.md mandates: hex colours in client/src .ts/.tsx.
 * The drift report at the end (font sizes, clamp recipes, radii, mustard fills,
 * rgba literals) is INFORMATION ONLY and never fails the build. CLAUDE.md sets
 * no type scale, radius or card primitive, so gating them would enforce rules
 * the author has not ratified. Promote a metric to a gate only after he has.
 *
 * Escape hatch, for a colour that genuinely cannot be a token (a canvas or SVG
 * export that must embed a literal):
 *     // design-allow-hex: <reason>
 * on the same line or the line above. A marker with no reason does not count.
 *
 * Known limits (deliberate, documented rather than patched):
 *   - It counts per file, so swapping one old hex for another in the same file
 *     passes; an improved file keeps its old ceiling until someone runs --update.
 *   - Prose that happens to read as hex ("#100", "#decade") counts: add the marker.
 *   - Moving or renaming a grandfathered file needs `--update --allow-increase`
 *     in the same PR; the baseline diff shows the reviewer it was a move.
 *   - Percent-encoded SVG (%23ff0000) and non-.ts/.tsx files are out of scope.
 *
 * Usage:
 *   node scripts/validate-design.mjs                    check (CI)
 *   node scripts/validate-design.mjs --update           lower the baseline
 *   node scripts/validate-design.mjs --update --allow-increase   raise it (rare, deliberate)
 *   --root <dir>  --baseline <file>                     for tests
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const o = {
    root: path.resolve(HERE, ".."),
    baseline: null,
    update: false,
    allowIncrease: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--update") o.update = true;
    else if (a === "--allow-increase") o.allowIncrease = true;
    else if (a === "--root") o.root = path.resolve(argv[++i] ?? "");
    else if (a === "--baseline") o.baseline = path.resolve(argv[++i] ?? "");
    else {
      console.error(`[design] unknown argument: ${a}`);
      process.exit(2);
    }
  }
  if (!o.baseline) o.baseline = path.join(o.root, "scripts", "design-baseline.json");
  return o;
}

/* ------------------------------------------------------------ file walk */

function walk(dir, out = [], top = dir) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || (e.name === "test" && dir === top)) continue;
      walk(full, out, top);
    } else if (
      /\.(ts|tsx)$/.test(e.name) &&
      !/\.(test|spec)\.(ts|tsx)$/.test(e.name) &&
      !e.name.endsWith(".d.ts")
    ) {
      out.push(full);
    }
  }
  return out;
}

const posix = (root, file) => path.relative(root, file).split(path.sep).join("/");

/* ------------------------------------------------------------ hex scan */

// #RGB, #RGBA, #RRGGBB, #RRGGBBAA. Not preceded by & (HTML entity), a word
// character, #, or / (URL path); not followed by anything that would make it a
// longer word.
const HEX = /(?<![&A-Za-z0-9#/])#(?:[0-9A-Fa-f]{8}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{3,4})(?![0-9A-Za-z-])/g;
// An in-page anchor such as href="#add" is not a colour, even when its letters
// happen to be valid hex.
const ANCHOR_CONTEXT =
  /(?<![\w-])(?:href|xlinkHref|id|for|htmlFor|hash|target)\s*[=:]\s*\{?\s*["'`]$|url\(\s*["']?$/;
const ALLOW = /design-allow-hex:\s*\S/;
// The marker covers the next line only when the line above is nothing but a comment.
const COMMENT_ONLY = /^\s*(?:\/\/|\{?\s*\/\*)/;
// Block comments only where a comment can start; "**/*.ts" globs are not one.
const BLOCK_COMMENT = /(?<![*\w"'`/])\/\*[\s\S]*?\*\//g;

// Drop a trailing "// comment" only when every quote before it is balanced, so a
// " // " inside a string can never hide a real colour. When unsure it keeps the text.
function stripTrailingComment(line) {
  const m = /(^|\s)\/\/\s/.exec(line);
  if (!m) return line;
  const before = line.slice(0, m.index);
  const balanced = ['"', "'", "`"].every((q) => (before.split(q).length - 1) % 2 === 0);
  return balanced ? before : line;
}

export function scanHex(src) {
  const hits = [];
  const blanked = src.replace(BLOCK_COMMENT, (m) => m.replace(/[^\n]/g, " "));
  const lines = blanked.split(/\r?\n/);
  const raw = src.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*\/\//.test(lines[i])) continue;
    if (ALLOW.test(raw[i]) || (i > 0 && COMMENT_ONLY.test(raw[i - 1]) && ALLOW.test(raw[i - 1]))) continue;
    const code = stripTrailingComment(lines[i]);
    HEX.lastIndex = 0;
    let m;
    while ((m = HEX.exec(code))) {
      if (ANCHOR_CONTEXT.test(code.slice(Math.max(0, m.index - 24), m.index))) continue;
      hits.push({ line: i + 1, hex: m[0] });
    }
  }
  return hits;
}

/* ---------------------------------------------------- token suggestions */

const PREFERRED = [
  "charcoal", "charcoal-deep", "charcoal-soft", "bone", "bone-warm", "bone-muted",
  "bone-bright", "card", "ink", "ink-muted", "mustard", "mustard-deep", "mustard-text",
  "ok", "alert", "strain", "olive", "clay", "pillar-justice",
];

function normalizeHex(h) {
  let x = h.slice(1).toLowerCase();
  if (x.length === 3 || x.length === 4) x = [...x].map((c) => c + c).join("");
  return "#" + x;
}

function loadTokenMap(root) {
  const map = new Map();
  const css = path.join(root, "client", "src", "index.css");
  if (!fs.existsSync(css)) return map;
  const block = fs.readFileSync(css, "utf8").match(/^:root\s*\{([\s\S]*?)^\}/m);
  if (!block) return map;
  for (const m of block[1].matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9A-Fa-f]{3,8})\s*[;}]/g)) {
    const key = normalizeHex(m[2]);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(m[1]);
  }
  return map;
}

function suggest(tokenMap, hex) {
  const names = tokenMap.get(normalizeHex(hex));
  if (!names) return "no token holds this value: add one to :root in client/src/index.css first";
  const ranked = PREFERRED.filter((n) => names.includes(n));
  const use = ranked.length ? ranked : names;
  return `var(--${use[0]})${use.length > 1 ? ` (also --${use.slice(1, 3).join(", --")})` : ""}`;
}

/* ------------------------------------------------------------ baseline */

function readBaseline(file) {
  if (!fs.existsSync(file)) return { exists: false, hex: {} };
  let j;
  try {
    j = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
  } catch (e) {
    fail(`baseline ${file} is not valid JSON (${e.message}). Restore it from git.`);
  }
  const hex = j && typeof j === "object" ? j.hardcodedHex : undefined;
  if (!hex || typeof hex !== "object" || Array.isArray(hex)) {
    fail(`baseline ${file} has no "hardcodedHex" object. Restore it from git.`);
  }
  for (const [k, v] of Object.entries(hex)) {
    if (!Number.isInteger(v) || v < 0) fail(`baseline entry "${k}" is ${JSON.stringify(v)}; it must be a non-negative integer.`);
  }
  return { exists: true, hex };
}

function fail(msg) {
  console.error(`[design] ${msg}`);
  process.exit(2);
}

function writeBaseline(file, counts) {
  const sorted = {};
  for (const k of Object.keys(counts).sort()) sorted[k] = counts[k];
  const doc = {
    _readme:
      "Grandfathered hardcoded-hex counts per file. A ratchet: CI fails if a file exceeds its count " +
      "or a file without an entry gains any. Lower it with `node scripts/validate-design.mjs --update`. " +
      "Never raise it by hand. See the header of scripts/validate-design.mjs.",
    hardcodedHex: sorted,
  };
  fs.writeFileSync(file, JSON.stringify(doc, null, 2) + "\n");
}

/* --------------------------------------------------------- drift report */

function distinct(files, rx) {
  const s = new Set();
  for (const f of files) for (const m of fs.readFileSync(f, "utf8").matchAll(rx)) s.add(m[1] ?? m[0]);
  return s.size;
}

function driftReport(root, all) {
  const pages = all.filter((f) => posix(root, f).startsWith("client/src/pages/"));
  const surfaces = all.filter((f) => /^client\/src\/(pages|components)\//.test(posix(root, f)));
  const mustard = surfaces.filter((f) =>
    /background:\s*"var\(--(?:mustard|gold)\)"/.test(fs.readFileSync(f, "utf8"))
  ).length;
  let rgba = 0;
  for (const f of all) rgba += (fs.readFileSync(f, "utf8").match(/rgba?\(/g) ?? []).length;
  return [
    ["distinct fontSize string literals in pages", distinct(pages, /fontSize:\s*"([^"]+)"/g)],
    ["distinct clamp() recipes in pages", distinct(pages, /clamp\([^)]+\)/g)],
    ["distinct borderRadius string literals in pages", distinct(pages, /borderRadius:\s*"([^"]+)"/g)],
    ["files using a mustard/gold background on any element (buttons and bars included)", mustard],
    ["rgb()/rgba() literals in client/src", rgba],
  ];
}

/* ---------------------------------------------------------------- main */

function main() {
  const o = parseArgs(process.argv.slice(2));
  const srcDir = path.join(o.root, "client", "src");
  const files = walk(srcDir).sort();
  if (files.length === 0) {
    fail(`no .ts/.tsx files found under ${srcDir}. Wrong --root, or client/src moved: refusing to report a vacuous pass.`);
  }
  const tokens = loadTokenMap(o.root);

  const found = new Map(); // relpath -> hits[]
  for (const f of files) {
    const hits = scanHex(fs.readFileSync(f, "utf8"));
    if (hits.length) found.set(posix(o.root, f), hits);
  }
  const counts = Object.fromEntries([...found].map(([k, v]) => [k, v.length]));
  const base = readBaseline(o.baseline);

  if (o.update) {
    const raised = Object.keys(counts).filter((k) => counts[k] > (base.hex[k] ?? 0));
    if (raised.length && !o.allowIncrease) {
      console.error("[design] --update refuses to RAISE the baseline:");
      for (const k of raised) console.error(`  ${k}: ${counts[k]} (baseline ${base.hex[k] ?? 0})`);
      console.error("Fix the new hex, or pass --allow-increase if this is deliberate.");
      process.exit(1);
    }
    writeBaseline(o.baseline, counts);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    console.log(`[design] baseline written: ${total} hardcoded hex across ${found.size} files`);
    return;
  }

  const violations = [];
  const improved = [];
  for (const [file, hits] of found) {
    const allowed = base.hex[file] ?? 0;
    if (hits.length > allowed) violations.push({ file, hits, allowed });
    else if (hits.length < allowed) improved.push({ file, now: hits.length, allowed });
  }
  for (const [file, allowed] of Object.entries(base.hex)) {
    if (!found.has(file)) improved.push({ file, now: 0, allowed });
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const grandfathered = Object.values(base.hex).reduce((a, b) => a + b, 0);

  if (violations.length) {
    console.error("[design] Hardcoded hex above the baseline. CLAUDE.md: components reference tokens, never hex.\n");
    for (const v of violations) {
      console.error(`  FAIL ${v.file}: ${v.hits.length} hex (baseline allows ${v.allowed})`);
      for (const h of v.hits) console.error(`       line ${h.line}: ${h.hex}  ->  ${suggest(tokens, h.hex)}`);
    }
    console.error(
      "\nUse the token. If the value is genuinely new, add it to :root in client/src/index.css first.\n" +
        "A literal that truly cannot be a token (canvas/SVG export) takes a `// design-allow-hex: <reason>` comment.\n" +
        (base.exists ? "" : "\nNo baseline file found. Create it deliberately with `--update --allow-increase`.\n")
    );
    process.exit(1);
  }

  console.log(
    `[design] ok: ${total} hardcoded hex across ${found.size} files, all within the baseline (${grandfathered} grandfathered)`
  );
  if (improved.length) {
    console.log(`[design] ${improved.length} file(s) are now below their baseline. Lock the gain in: node scripts/validate-design.mjs --update`);
    for (const i of improved.slice(0, 8)) console.log(`         ${i.file}: ${i.allowed} -> ${i.now}`);
  }
  console.log("[design] drift report (information only, never fails the build):");
  for (const [label, n] of driftReport(o.root, files)) console.log(`         ${String(n).padStart(5)}  ${label}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
