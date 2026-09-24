#!/usr/bin/env node
/**
 * apply-rewrites.mjs — lay the rewritten essays over the essay library.
 *
 * James asked (24 Sept 2026) for the family, home, American-church and
 * historic-faith writing to be rewritten to the bar in docs/rewrites/STANDARD.md.
 * Each rewrite is one file, content/rewrites/<slug>.md, with front matter (title,
 * excerpt, metaDescription, pillar, replaces, sources, review) and a Markdown
 * body. This script is the one place they touch the site:
 *
 *   1. The library record for <slug> takes the rewrite's title, deck, body,
 *      description and pillar; its updatedAt becomes the rewrite date. The slug,
 *      id and publishedAt stay, so the address keeps its search standing.
 *   2. Every slug in `replaces` (essays merged into this one) leaves the library.
 *   3. content/rewrites.generated.json (and its copy api/rewrites.json, which the
 *      self-contained serverless function imports) lists the rewritten slugs and
 *      the merged ones, so a stale database row never outranks a rewrite and a
 *      merged essay never reappears in a listing.
 *   4. vercel.json gets a 301 from each merged address to the kept one; any
 *      redirect that pointed at a merged address is re-aimed at the kept one; and
 *      any redirect sending a rewritten essay's own address elsewhere is removed,
 *      since the essay is now worth reading at its address.
 *   5. api/static-library.generated.ts is regenerated from the library, as
 *      build-static-library.mjs does.
 *
 * Idempotent: running it twice changes nothing the second time.
 * Run after adding rewrites: node scripts/apply-rewrites.mjs
 * Then: node scripts/build-seo-layer.mjs && node scripts/build-public-essays.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (rel) => path.join(ROOT, rel);
const DIR = "content/rewrites";

/** Minimal front-matter parser for the rewrite files: scalars, [inline, lists] and "- item" lists. */
export function parseRewrite(raw) {
  const m = String(raw).replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error("no front matter");
  const fm = {};
  let listKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) { fm[listKey].push(unquote(item[1])); continue; }
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, rest] = kv;
    listKey = null;
    const value = rest.replace(/\s+#.*$/, "").trim();
    if (value === "") { fm[key] = []; listKey = key; continue; }
    if (/^\[.*\]$/.test(value)) { fm[key] = value.slice(1, -1).split(",").map((s) => unquote(s.trim())).filter(Boolean); continue; }
    fm[key] = unquote(value);
  }
  return { ...fm, body: m[2].trim() };
}
function unquote(s) {
  const t = String(s).trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1).replace(/\\"/g, '"');
  return t;
}

export function loadRewrites(root = ROOT) {
  const dir = path.join(root, DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const r = parseRewrite(readFileSync(path.join(dir, f), "utf8"));
      const slug = r.slug || f.replace(/\.md$/, "");
      if (slug !== f.replace(/\.md$/, "")) throw new Error(`${f}: front-matter slug "${slug}" does not match the file name`);
      return { ...r, slug, replaces: Array.isArray(r.replaces) ? r.replaces : r.replaces ? [r.replaces] : [], file: `${DIR}/${f}` };
    });
}

const words = (s) => String(s || "").split(/\s+/).filter(Boolean).length;

/** Apply rewrites to library records. Pure: returns the new records and the index. */
export function applyToLibrary(records, rewrites, today = new Date().toISOString()) {
  const merged = {};
  for (const rw of rewrites) for (const from of rw.replaces) {
    if (from === rw.slug) throw new Error(`${rw.slug}: replaces itself`);
    if (merged[from] && merged[from] !== rw.slug) throw new Error(`${from} is merged into both ${merged[from]} and ${rw.slug}`);
    merged[from] = rw.slug;
  }
  const bySlug = new Map(rewrites.map((rw) => [rw.slug, rw]));
  for (const slug of bySlug.keys()) if (merged[slug]) throw new Error(`${slug} is rewritten and also merged away into ${merged[slug]}`);
  const have = new Set(records.map((r) => r && r.slug));
  for (const slug of bySlug.keys()) if (!have.has(slug)) throw new Error(`${slug}: no library record to rewrite`);

  const out = [];
  for (const r of records) {
    if (!r || merged[r.slug]) continue;
    const rw = bySlug.get(r.slug);
    if (!rw) { out.push(r); continue; }
    const n = words(rw.body);
    const minutes = Math.max(1, Math.round(n / 230));
    // Keep the rewrite date stable across reruns: reuse it if the body is unchanged.
    const unchanged = r.body === rw.body && r.rewrittenAt;
    const stamp = unchanged ? r.rewrittenAt : today;
    out.push({
      ...r,
      title: rw.title || r.title,
      excerpt: rw.excerpt || r.excerpt,
      body: rw.body,
      pillar: rw.pillar || r.pillar,
      metaDescription: rw.metaDescription || r.metaDescription,
      readTime: `${minutes} min read`,
      readingTimeMinutes: minutes,
      updatedAt: stamp,
      rewrittenAt: stamp,
    });
  }
  return { records: out, index: { rewritten: [...bySlug.keys()].sort(), merged } };
}

/** Redirects: merged addresses 301 to the kept one; rewritten addresses resolve. */
export function applyToRedirects(redirects, index) {
  const rewritten = new Set(index.rewritten);
  const at = (slug) => `/writing/${slug}`;
  const next = [];
  for (const r of redirects) {
    const src = String(r.source);
    const srcSlug = src.startsWith("/writing/") ? src.slice("/writing/".length) : null;
    if (srcSlug && rewritten.has(srcSlug)) continue; // the essay is worth its own address again
    if (srcSlug && index.merged[srcSlug]) continue; // replaced below with the merge redirect
    const dst = String(r.destination);
    const dstSlug = dst.startsWith("/writing/") ? dst.slice("/writing/".length) : null;
    next.push(dstSlug && index.merged[dstSlug] ? { ...r, destination: at(index.merged[dstSlug]) } : r);
  }
  for (const [from, to] of Object.entries(index.merged).sort()) next.push({ source: at(from), destination: at(to), permanent: true });
  return next;
}

function main() {
  const rewrites = loadRewrites();
  const libPath = p("content/static-library.generated.json");
  const records = JSON.parse(readFileSync(libPath, "utf8"));
  // Earlier runs removed merged records; keep the index cumulative so a rerun
  // with the same files is a no-op rather than an error.
  const { records: next, index } = applyToLibrary(records, rewrites);
  writeFileSync(libPath, JSON.stringify(next, null, 2) + "\n");
  const banner =
    "// AUTO-GENERATED by scripts/build-static-library.mjs — do not edit by hand.\n" +
    "// The 143 long-form essays, shaped for api/index.ts to serve behind the live DB.\n" +
    "/* eslint-disable */\n";
  writeFileSync(p("api/static-library.generated.ts"), `${banner}const STATIC_LIBRARY: any[] = ${JSON.stringify(next, null, 2)};\nexport default STATIC_LIBRARY;\n`);

  const indexJson = JSON.stringify(index, null, 1) + "\n";
  writeFileSync(p("content/rewrites.generated.json"), indexJson);
  writeFileSync(p("api/rewrites.json"), indexJson);

  // Hand search overrides written for an essay that has been merged away name
  // an essay that no longer exists; the search layer refuses those.
  const ovPath = p("content/seo-overrides.json");
  if (existsSync(ovPath)) {
    const ov = JSON.parse(readFileSync(ovPath, "utf8"));
    const stale = Object.keys(ov).filter((slug) => index.merged[slug]);
    if (stale.length) {
      for (const slug of stale) delete ov[slug];
      writeFileSync(ovPath, JSON.stringify(ov, null, 2) + "\n");
      console.log(`[rewrites] dropped search overrides for merged essays: ${stale.join(", ")}`);
    }
  }

  const vercelPath = p("vercel.json");
  const vercelRaw = readFileSync(vercelPath, "utf8");
  const vercel = JSON.parse(vercelRaw);
  const before = vercel.redirects.length;
  vercel.redirects = applyToRedirects(vercel.redirects, index);
  writeFileSync(vercelPath, JSON.stringify(vercel, null, 4) + (vercelRaw.endsWith("\n") ? "\n" : ""));

  // One page for James: every rewrite, what it replaced, and what to check.
  const review = [
    "# Rewrites for James to read",
    "",
    "Generated by `scripts/apply-rewrites.mjs` from the front matter of `content/rewrites/*.md`. Each essay has been written to `docs/rewrites/STANDARD.md` and then checked by a separate reviewer for invented quotations, citations, statistics and first-person claims. What is left below is what only James can confirm.",
    "",
    ...rewrites.flatMap((rw) => [
      `## ${rw.title}`,
      "",
      `- Address: /writing/${rw.slug} (${words(rw.body).toLocaleString("en-US")} words)`,
      rw.replaces.length ? `- Replaces and redirects: ${rw.replaces.map((s) => `/writing/${s}`).join(", ")}` : "- Replaces nothing; rewritten in place",
      `- Sources: ${(rw.sources || []).join("; ")}`,
      `- To check: ${rw.review || "nothing flagged"}`,
      "",
    ]),
  ].join("\n");
  writeFileSync(p("docs/rewrites/REVIEW.md"), review);

  console.log(`[rewrites] ${index.rewritten.length} rewritten, ${Object.keys(index.merged).length} merged away; library ${records.length} -> ${next.length}; redirects ${before} -> ${vercel.redirects.length}`);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
