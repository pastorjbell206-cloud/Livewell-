import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";

/**
 * Merge the hand-written article library (make-articles.mjs output) with every
 * per-sub-pathway file the writing agents produce in client/src/data/articles/,
 * de-duplicating by slug, into the single client/public/article-library.json
 * that the admin loader reads. Idempotent.
 */
const root = new URL("../client/public/", import.meta.url);
const libPath = new URL("article-library.json", root);
const dir = new URL("../client/src/data/articles/", import.meta.url);

const bySlug = new Map();
const add = (arr, source) => {
  for (const it of arr) {
    if (!it || !it.slug || !it.title || !it.body) {
      console.warn("  skip malformed item in", source);
      continue;
    }
    bySlug.set(it.slug, it);
  }
};

// Seed with the existing merged library (carries the 10 hand-written articles).
if (existsSync(libPath)) {
  try { add(JSON.parse(readFileSync(libPath, "utf8")), "article-library.json"); } catch {}
}
// Fold in every agent file.
if (existsSync(dir)) {
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
    try { add(JSON.parse(readFileSync(new URL(f, dir), "utf8")), f); }
    catch (e) { console.warn("  could not parse", f, String(e?.message || e)); }
  }
}

const items = [...bySlug.values()];
writeFileSync(libPath, JSON.stringify(items, null, 2) + "\n");
console.log("merged article-library.json:", items.length, "articles");
