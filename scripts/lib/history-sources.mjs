/**
 * scripts/lib/history-sources.mjs — the stored public-domain texts behind the
 * church history course, and the check that every quoted excerpt is really in
 * one of them (master plan 7.2 and 9.2, unit U07).
 *
 * The corpus lives in scripts/data/history-sources/:
 *
 *   manifest.json   one entry per stored text: what it is, who translated it,
 *                   why it is public domain, where it came from (repository,
 *                   commit, path, raw URL, date fetched), and the sha256 of the
 *                   file exactly as fetched;
 *   texts/<id>.*    the file, byte for byte as it was fetched, so anyone can
 *                   fetch the same URL again and compare the hash;
 *   PROVENANCE.md   the same facts for a person to read; its list of texts is
 *                   generated from the manifest and must not drift from it.
 *
 * An excerpt passes when it is a normalized substring of the text it names:
 * case, curly and straight quotation marks, dash forms, and runs of white
 * space are ignored; every word and every other mark must match. An ellipsis
 * ("...", "…", or "[...]") marks an omission: the pieces either side must each
 * be found, in order, within one passage. Footnote numbers are not part of the
 * text, and a note is searched on its own, never joined to the body.
 *
 * Plain node, no dependencies: CI runs it on main without a build.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(fileURLToPath(new URL("../..", import.meta.url)));
export const CORPUS_DIR = "scripts/data/history-sources";
export const MANIFEST_FILE = "manifest.json";
export const PROVENANCE_FILE = "PROVENANCE.md";
export const TEXTS_DIR = "texts";
/** Folders whose JSON may carry excerpts (the registry and sessions, U30 and U32). */
export const EXCERPT_DIRS = ["client/public/history/sources", "client/public/history/sessions"];

export const FORMATS = ["wdb-html", "text"];
const GENERATED_START = "<!-- generated from manifest.json by `node scripts/verify-sources.mjs --write`: do not edit by hand -->";
const GENERATED_END = "<!-- end of generated list -->";

/** Shortest piece of an excerpt (between omissions) worth checking. */
export const MIN_PIECE = 8;

/* ------------------------------------------------------------------ text */

const NAMED = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", sect: "§", para: "¶", middot: "·",
  mdash: "—", ndash: "–", hellip: "…", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", laquo: "«", raquo: "»",
  shy: "", copy: "©", deg: "°", frac12: "½", frac14: "¼", frac34: "¾", times: "×", dagger: "†", Dagger: "‡",
  aelig: "æ", AElig: "Æ", oelig: "œ", OElig: "Œ", szlig: "ß", ccedil: "ç", Ccedil: "Ç", ntilde: "ñ", Ntilde: "Ñ",
};
const ACCENTED = {
  agrave: "à", aacute: "á", acirc: "â", atilde: "ã", auml: "ä", aring: "å",
  egrave: "è", eacute: "é", ecirc: "ê", euml: "ë",
  igrave: "ì", iacute: "í", icirc: "î", iuml: "ï",
  ograve: "ò", oacute: "ó", ocirc: "ô", otilde: "õ", ouml: "ö",
  ugrave: "ù", uacute: "ú", ucirc: "û", uuml: "ü",
  yacute: "ý",
};
for (const [name, ch] of Object.entries(ACCENTED)) {
  NAMED[name] = ch;
  NAMED[name[0].toUpperCase() + name.slice(1)] = ch.toUpperCase();
}

/** Decode the HTML character references the stored texts use. Unknown names are left as written. */
export function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, ref) => {
    if (ref[0] === "#") {
      const code = ref[1] === "x" || ref[1] === "X" ? parseInt(ref.slice(2), 16) : parseInt(ref.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return Object.hasOwn(NAMED, ref) ? NAMED[ref] : m;
  });
}

const BLOCK = /<\/?(?:br|p|div|h[1-6]|li|ul|ol|tr|td|table|section|article|blockquote|hr|pre)\b[^>]*>/gi;

function fragmentToText(html) {
  return decodeEntities(html.replace(BLOCK, "\n").replace(/<[^>]*>/g, ""))
    .replace(/[ \t ]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

/**
 * A Writings-Database page as plain passages: the body first, then each note
 * on its own. Handles the repository's standard fragment (footnote references
 * in <sup>, notes in <section class="notes">) and the older pages mirrored from
 * Word documents (endnote anchors to #_edn, notes in mso-element:endnote divs).
 */
export function wdbHtmlToPassages(html) {
  let s = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<head\b[\s\S]*?<\/head>/gi, "")
    .replace(/<(script|style|title)\b[\s\S]*?<\/\1>/gi, "");
  const notes = [];
  s = s.replace(/<section\b[^>]*class=["']?notes["']?[^>]*>([\s\S]*?)<\/section>/gi, (_, inner) => {
    for (const piece of inner.split(/(?=<span\b[^>]*\bid=["']?fn\d)/i)) notes.push(piece);
    return "\n";
  });
  s = s.replace(/<div\b[^>]*mso-element:\s*(?:endnote|footnote)(?!-)[^>]*>([\s\S]*?)<\/div>/gi, (_, inner) => {
    notes.push(inner);
    return "\n";
  });
  const dropRefs = (h) =>
    h
      .replace(/<sup\b[^>]*>[\s\S]*?<\/sup>/gi, "")
      .replace(/<a\b[^>]*href=["']?#(?:fn|r|_edn|_ftn)[^>]*>[\s\S]*?<\/a>/gi, "");
  const body = fragmentToText(dropRefs(s));
  const notePassages = notes.map((n) => fragmentToText(dropRefs(n))).filter(Boolean);
  return [body, ...notePassages].filter(Boolean);
}

/** A plain text file (a Project Gutenberg text, say) is one passage. */
export function plainTextToPassages(text) {
  return [text.replace(/\r\n?/g, "\n")];
}

export function passagesFor(format, raw) {
  if (format === "wdb-html") return wdbHtmlToPassages(raw);
  if (format === "text") return plainTextToPassages(raw);
  throw new Error(`unknown format "${format}"`);
}

/** The comparison form: what "normalized substring" means here. */
export function normalizeForMatch(s) {
  return String(s)
    .normalize("NFKC")
    .replace(/[‘’‚‛′ʼ`´]/g, "'")
    .replace(/[“”„‟″«»]/g, '"')
    .replace(/[‐-―−⸺⸻]/g, "-")
    .replace(/­/g, "")
    .replace(/\s+/g, " ")
    .replace(/ ?-+ ?/g, "-")
    .trim()
    .toLowerCase();
}

/** Split an excerpt at its marked omissions into the pieces that must be found. */
export function excerptPieces(excerpt) {
  return normalizeForMatch(excerpt)
    .split(/\s*\[?\.{3,4}\]?\s*/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Look for an excerpt in a text's passages. Returns { ok: true, passage } or
 * { ok: false, reason, agreesTo } where agreesTo is the longest opening of the
 * first missing piece that the text does contain (to show a writer where the
 * quotation departs from the source).
 */
export function findExcerpt(passages, excerpt) {
  const pieces = excerptPieces(excerpt);
  if (!pieces.length) return { ok: false, reason: "the excerpt is empty" };
  const short = pieces.find((p) => p.length < MIN_PIECE);
  if (short !== undefined) {
    return { ok: false, reason: `"${short}" is too short to check on its own; quote more around each omission` };
  }
  const hay = passages.map(normalizeForMatch);
  for (let i = 0; i < hay.length; i++) {
    let from = 0;
    let all = true;
    for (const piece of pieces) {
      const at = hay[i].indexOf(piece, from);
      if (at < 0) { all = false; break; }
      from = at + piece.length;
    }
    if (all) return { ok: true, passage: i };
  }
  const missing = pieces.find((p) => !hay.some((h) => h.includes(p))) ?? pieces[0];
  const words = missing.split(" ");
  let lo = 0;
  let hi = words.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    const prefix = words.slice(0, mid).join(" ");
    if (hay.some((h) => h.includes(prefix))) lo = mid;
    else hi = mid - 1;
  }
  const agreesTo = words.slice(0, lo).join(" ");
  const everyPieceSomewhere = pieces.every((p) => hay.some((h) => h.includes(p)));
  const reason =
    pieces.length > 1 && everyPieceSomewhere
      ? "has pieces that are each in the text, but not in this order within one passage"
      : "is not in the stored text";
  return { ok: false, reason, agreesTo: everyPieceSomewhere ? "" : agreesTo, missing };
}

/* -------------------------------------------------------------- manifest */

const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SHA_RE = /^[0-9a-f]{64}$/;
const COMMIT_RE = /^[0-9a-f]{40}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED = ["id", "file", "format", "author", "work", "sections", "translator", "translatorNamedInFile", "identification", "edition", "publicDomain", "origin", "sha256", "bytes"];
const REQUIRED_ORIGIN = ["repository", "path", "url", "fetched"];

export function loadManifest(root = ROOT) {
  const file = join(root, CORPUS_DIR, MANIFEST_FILE);
  if (!existsSync(file)) return { texts: null, problems: [`${CORPUS_DIR}/${MANIFEST_FILE} is missing`] };
  try {
    const data = JSON.parse(readFileSync(file, "utf8"));
    if (!Array.isArray(data.texts)) return { texts: null, problems: [`${CORPUS_DIR}/${MANIFEST_FILE} has no "texts" list`] };
    return { texts: data.texts, problems: [] };
  } catch (e) {
    return { texts: null, problems: [`${CORPUS_DIR}/${MANIFEST_FILE} is not valid JSON: ${e.message}`] };
  }
}

const nonEmpty = (v) => typeof v === "string" && v.trim().length > 0;

/** Every way a manifest entry or its stored file can be wrong. */
export function corpusProblems(texts, root = ROOT) {
  const problems = [];
  const dir = join(root, CORPUS_DIR);
  const seen = new Set();
  const files = new Set();
  texts.forEach((t, n) => {
    const where = `manifest text ${n + 1}${t && nonEmpty(t.id) ? ` (${t.id})` : ""}`;
    if (!t || typeof t !== "object") { problems.push(`${where}: not an object`); return; }
    for (const k of REQUIRED) {
      if (k === "translatorNamedInFile") { if (typeof t[k] !== "boolean") problems.push(`${where}: "${k}" must be true or false`); continue; }
      if (k === "origin") { if (!t.origin || typeof t.origin !== "object") problems.push(`${where}: "origin" is missing`); continue; }
      if (k === "bytes") { if (!Number.isInteger(t.bytes)) problems.push(`${where}: "bytes" must be a whole number`); continue; }
      if (!nonEmpty(t[k])) problems.push(`${where}: "${k}" is missing or empty`);
    }
    if (nonEmpty(t.id) && !ID_RE.test(t.id)) problems.push(`${where}: id must be lowercase words joined by hyphens`);
    if (nonEmpty(t.id)) {
      if (seen.has(t.id)) problems.push(`${where}: id "${t.id}" is used twice`);
      seen.add(t.id);
    }
    if (nonEmpty(t.format) && !FORMATS.includes(t.format)) problems.push(`${where}: format must be one of ${FORMATS.join(", ")}`);
    if (nonEmpty(t.sha256) && !SHA_RE.test(t.sha256)) problems.push(`${where}: sha256 must be 64 lowercase hex characters`);
    const o = t.origin;
    if (o && typeof o === "object") {
      for (const k of REQUIRED_ORIGIN) if (!nonEmpty(o[k])) problems.push(`${where}: origin.${k} is missing or empty`);
      if (!nonEmpty(o.commit) && !nonEmpty(o.branch)) problems.push(`${where}: origin needs the commit (or, where none can be read, the branch) the file was fetched from`);
      if (nonEmpty(o.commit) && !COMMIT_RE.test(o.commit)) problems.push(`${where}: origin.commit must be a full 40-character commit id`);
      if (nonEmpty(o.commit) && nonEmpty(o.url) && !o.url.includes(o.commit)) problems.push(`${where}: origin.url does not name origin.commit, so it does not pin the file`);
      if (nonEmpty(o.url) && !/^https:\/\//.test(o.url)) problems.push(`${where}: origin.url must be an https URL`);
      if (nonEmpty(o.repository) && !/^https:\/\//.test(o.repository)) problems.push(`${where}: origin.repository must be an https URL`);
      if (nonEmpty(o.fetched) && !DATE_RE.test(o.fetched)) problems.push(`${where}: origin.fetched must be a date (YYYY-MM-DD)`);
    }
    if (!nonEmpty(t.file)) return;
    if (!t.file.startsWith(`${TEXTS_DIR}/`) || t.file.includes("..")) { problems.push(`${where}: file must sit in ${TEXTS_DIR}/`); return; }
    files.add(t.file);
    const abs = join(dir, t.file);
    if (!existsSync(abs)) { problems.push(`${where}: ${CORPUS_DIR}/${t.file} is missing`); return; }
    const buf = readFileSync(abs);
    if (Number.isInteger(t.bytes) && buf.length !== t.bytes) problems.push(`${where}: ${t.file} is ${buf.length} bytes, the manifest says ${t.bytes}`);
    const sha = createHash("sha256").update(buf).digest("hex");
    if (SHA_RE.test(t.sha256 ?? "") && sha !== t.sha256) {
      problems.push(`${where}: ${t.file} has changed since it was fetched (sha256 ${sha.slice(0, 12)}…, manifest ${t.sha256.slice(0, 12)}…). A stored text is never edited; fetch it again and update the entry.`);
    }
  });
  const textsDir = join(dir, TEXTS_DIR);
  if (existsSync(textsDir)) {
    for (const name of readdirSync(textsDir)) {
      if (!files.has(`${TEXTS_DIR}/${name}`)) problems.push(`${CORPUS_DIR}/${TEXTS_DIR}/${name} is not in the manifest`);
    }
  }
  return problems;
}

/* ------------------------------------------------------------ provenance */

export function provenanceList(texts) {
  const lines = [GENERATED_START, ""];
  for (const t of texts) {
    const o = t.origin ?? {};
    lines.push(`### ${t.id}`, "");
    lines.push(`- **Work:** ${t.author}, *${t.work}*, ${t.sections}`);
    lines.push(`- **Translator:** ${t.translator}${t.translatorNamedInFile ? " (named in the file)" : " (not named in the file; identified, see below)"}`);
    lines.push(`- **Edition:** ${t.edition}`);
    lines.push(`- **Identified by:** ${t.identification}`);
    lines.push(`- **Public domain:** ${t.publicDomain}`);
    lines.push(`- **Repository:** ${o.repository}${o.commit ? `, commit \`${o.commit}\`` : `, branch \`${o.branch}\``}`);
    lines.push(`- **Path:** \`${o.path}\``);
    lines.push(`- **Fetched:** ${o.fetched}, from <${o.url}>`);
    lines.push(`- **Stored as:** \`${t.file}\` (${t.bytes} bytes, sha256 \`${t.sha256}\`)`);
    if (Array.isArray(t.holds) && t.holds.length) lines.push(`- **Holds:** ${t.holds.join("; ")}`);
    lines.push("");
  }
  lines.push(GENERATED_END);
  return lines.join("\n");
}

/** PROVENANCE.md with its generated list replaced by the one the manifest gives. */
export function renderProvenance(current, texts) {
  const start = current.indexOf(GENERATED_START);
  const end = current.indexOf(GENERATED_END);
  if (start < 0 || end < start) return null;
  return current.slice(0, start) + provenanceList(texts) + current.slice(end + GENERATED_END.length);
}

export function provenanceProblems(texts, root = ROOT) {
  const file = join(root, CORPUS_DIR, PROVENANCE_FILE);
  if (!existsSync(file)) return [`${CORPUS_DIR}/${PROVENANCE_FILE} is missing`];
  const current = readFileSync(file, "utf8");
  const next = renderProvenance(current, texts);
  if (next === null) return [`${CORPUS_DIR}/${PROVENANCE_FILE} has lost its generated-list markers`];
  if (next !== current) return [`${CORPUS_DIR}/${PROVENANCE_FILE} is out of date with manifest.json; run node scripts/verify-sources.mjs --write`];
  return [];
}

/* -------------------------------------------------------------- excerpts */

function jsonFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) out.push(...jsonFiles(abs));
    else if (name.endsWith(".json")) out.push(abs);
  }
  return out.sort();
}

/**
 * Every excerpt in a JSON value: any object with an "excerpt" key, and every
 * source card (an object with type "source"). Each is checked against the
 * stored text named by its own "corpus" key or, failing that, the nearest
 * enclosing object's, so a sources file can name its text once above a list
 * of excerpts.
 */
export function collectExcerpts(value) {
  const found = [];
  const walk = (v, p, corpus) => {
    if (Array.isArray(v)) { v.forEach((x, i) => walk(x, `${p}[${i}]`, corpus)); return; }
    if (!v || typeof v !== "object") return;
    const here = Object.hasOwn(v, "corpus") ? v.corpus : corpus;
    if (Object.hasOwn(v, "excerpt") || v.type === "source") found.push({ path: p || "(top)", corpus: here, excerpt: v.excerpt });
    for (const [k, x] of Object.entries(v)) walk(x, p ? `${p}.${k}` : k, here);
  };
  walk(value, "", undefined);
  return found;
}

export function excerptProblems(texts, root = ROOT, files = null) {
  const byId = new Map(texts.filter((t) => t && nonEmpty(t.id)).map((t) => [t.id, t]));
  const cache = new Map();
  const passagesOf = (t) => {
    if (!cache.has(t.id)) {
      const abs = join(root, CORPUS_DIR, t.file);
      cache.set(t.id, existsSync(abs) && FORMATS.includes(t.format) ? passagesFor(t.format, readFileSync(abs, "utf8")) : null);
    }
    return cache.get(t.id);
  };
  const list = files ?? EXCERPT_DIRS.flatMap((d) => jsonFiles(join(root, d)));
  const problems = [];
  let checked = 0;
  for (const abs of list) {
    const rel = relative(root, abs) || abs;
    let data;
    try {
      data = JSON.parse(readFileSync(abs, "utf8"));
    } catch (e) {
      problems.push(`${rel}: not valid JSON (${e.message})`);
      continue;
    }
    for (const x of collectExcerpts(data)) {
      const where = `${rel} ${x.path}`;
      if (!nonEmpty(x.corpus)) {
        problems.push(`${where}: a source card must name the stored text it quotes ("corpus"); a source no gate can check belongs in the narrative, not on a card`);
        continue;
      }
      const t = byId.get(x.corpus);
      if (!t) { problems.push(`${where}: "${x.corpus}" is not a stored text in ${CORPUS_DIR}/${MANIFEST_FILE}`); continue; }
      if (!nonEmpty(x.excerpt)) { problems.push(`${where}: "excerpt" is missing or empty`); continue; }
      const passages = passagesOf(t);
      if (!passages) { problems.push(`${where}: the stored text "${t.id}" cannot be read`); continue; }
      checked++;
      const r = findExcerpt(passages, x.excerpt);
      if (!r.ok) {
        const agree = r.agreesTo ? ` The text agrees as far as "…${r.agreesTo.slice(-60)}" and then differs.` : "";
        problems.push(`${where}: excerpt ${r.reason} (${t.id}).${agree}`);
      }
    }
  }
  return { problems, checked };
}

/** The whole gate: corpus, provenance, excerpts. */
export function verifySources({ root = ROOT, files = null } = {}) {
  const { texts, problems } = loadManifest(root);
  if (!texts) return { problems, texts: 0, checked: 0 };
  const all = [...corpusProblems(texts, root), ...provenanceProblems(texts, root)];
  const ex = excerptProblems(texts, root, files);
  return { problems: [...all, ...ex.problems], texts: texts.length, checked: ex.checked };
}
