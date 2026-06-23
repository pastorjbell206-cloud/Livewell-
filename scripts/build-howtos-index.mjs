#!/usr/bin/env node
/**
 * build-howtos-index.mjs
 *
 * Publishes the how-to article clusters in scripts/articles/*.json as a STATIC
 * library the site can serve without a database:
 *   - client/public/howtos/index.json    (slug, title, excerpt, topic, readTime)
 *   - client/public/howtos/a/<slug>.json  (full article incl. Markdown body)
 *
 * The How-To Library pages (/how-tos and /how-tos/<slug>) load these. Re-run
 * after editing any cluster:  node scripts/build-howtos-index.mjs
 *
 * (The DB seed at scripts/seed-articles.mjs remains for environments with a
 * DATABASE_URL; this static path makes the same content live without one.)
 */
import fs from "node:fs";
import path from "node:path";

const SRC = "scripts/articles";
const OUT = "client/public/howtos";

const words = (s) => (s || "").split(/\s+/).filter(Boolean).length;

const files = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter((f) => f.endsWith(".json")).sort() : [];
fs.mkdirSync(path.join(OUT, "a"), { recursive: true });

const index = [];
const seen = new Set();
let problems = 0;

for (const f of files) {
  let arr;
  try {
    arr = JSON.parse(fs.readFileSync(path.join(SRC, f), "utf8"));
  } catch (e) {
    console.error(`[howtos] ${f}: invalid JSON: ${e.message}`);
    problems++;
    continue;
  }
  for (const a of arr) {
    if (!a?.slug || !a?.title || !a?.body) {
      console.error(`[howtos] ${f}: entry missing slug/title/body`);
      problems++;
      continue;
    }
    if (seen.has(a.slug)) {
      console.warn(`[howtos] duplicate slug "${a.slug}" (first wins)`);
      continue;
    }
    seen.add(a.slug);
    const minutes = Math.max(1, Math.round(words(a.body) / 220));
    const readTime = a.readTime || `${minutes} min read`;
    fs.writeFileSync(
      path.join(OUT, "a", a.slug + ".json"),
      JSON.stringify({ slug: a.slug, title: a.title, excerpt: a.excerpt || "", topic: a.topic || "", readTime, body: a.body }, null, 2)
    );
    index.push({ slug: a.slug, title: a.title, excerpt: a.excerpt || "", topic: a.topic || "", readTime });
  }
}

index.sort((x, y) => (x.topic + x.title).localeCompare(y.topic + y.title));
fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify({ articles: index }, null, 2) + "\n");
console.log(`[howtos] wrote ${index.length} articles + index (${problems} problem(s))`);
process.exit(problems ? 1 : 0);
