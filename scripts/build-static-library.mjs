/**
 * build-static-library.mjs — turn the 143 drafted essays into a static library
 * the server can serve WITHOUT a database connection.
 *
 * Two jobs:
 *   1. Strip the `> [PERSONAL STORY — James to supply]` placeholder blockquotes
 *      out of every source markdown file in place (James asked for them gone;
 *      nothing should wait on a human pass).
 *   2. Emit server/static-library.generated.json — an array of fully-shaped
 *      post objects (matching drizzle posts.$inferSelect) that db.ts merges in
 *      behind the live DB rows (DB always wins on slug collision).
 *
 * Run: node scripts/build-static-library.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

// dir -> classification. pillar must be a value pillarToTrack() resolves, so the
// essay lands in the right /writing track and content-pillar. Editorial; James
// can recategorize freely (client/src/lib/pillars.ts + taxonomy.ts).
const DIRS = {
  "docs/drafts/capture-left":            { pillar: "politics",           audience: "individuals", pastoral: false },
  "content/drafts/capture-right":        { pillar: "politics",           audience: "individuals", pastoral: false },
  "content/drafts/scripture-past-politics": { pillar: "theology",        audience: "individuals", pastoral: false },
  "content/drafts/after-christendom":    { pillar: "after-christendom",  audience: "individuals", pastoral: false },
  "content/drafts/pastoral-angle":       { pillar: "pastoral-ministry",  audience: "pastors",     pastoral: true },
  "content/drafts/pastoral-burnout":     { pillar: "pastoral-ministry",  audience: "pastors",     pastoral: true },
  "content/drafts/marriage":             { pillar: "marriage",           audience: "couples",     pastoral: false },
  "content/drafts/parenting":            { pillar: "parenting",          audience: "individuals", pastoral: false },
  "content/drafts/faith-crisis":         { pillar: "doubt",              audience: "individuals", pastoral: false },
  "content/drafts/grief":                { pillar: "doubt",              audience: "individuals", pastoral: false },
  "content/drafts/creeds":               { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/church-calendar":      { pillar: "devotionals",        audience: "individuals", pastoral: false },
  "content/drafts/sacraments":           { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/disciplines":          { pillar: "devotionals",        audience: "individuals", pastoral: false },
  "content/drafts/why-believe":          { pillar: "doubt",              audience: "individuals", pastoral: false },
  "content/drafts/who-is-god":           { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/the-story":            { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/church-history":       { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/prayer":               { pillar: "devotionals",        audience: "individuals", pastoral: false },
  "content/drafts/living-well":          { pillar: "devotionals",        audience: "individuals", pastoral: false },
  "content/drafts/who-is-jesus":         { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/sermon-on-the-mount":  { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/holy-spirit":          { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/last-things":          { pillar: "theology",           audience: "individuals", pastoral: false },
  "content/drafts/why-church":           { pillar: "american-church",    audience: "individuals", pastoral: false },
};

function stripPlaceholders(md) {
  const lines = md.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith(">")) {
      const block = [];
      let j = i;
      while (j < lines.length && lines[j].trimStart().startsWith(">")) {
        block.push(lines[j]);
        j++;
      }
      const blockText = block.join("\n");
      if (/\[?PERSONAL STORY|James to supply/i.test(blockText)) {
        i = j - 1;
        continue;
      }
      out.push(...block);
      i = j - 1;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { fm: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end < 0) return { fm: {}, body: raw };
  const fmRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\n+/, "");
  const fm = {};
  for (const line of fmRaw.split("\n")) {
    const m = /^([a-zA-Z_]+)\s*:\s*(.*)$/.exec(line.trim());
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value === "null" || value === "~" || value === "") value = null;
    else if (/^\d+$/.test(value)) value = parseInt(value, 10);
    fm[m[1]] = value;
  }
  return { fm, body };
}

function mdFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map(f => join(dir, f))
    .filter(p => statSync(p).isFile());
}

// Stable timestamps: spread descending from a fixed base so ordering is
// deterministic and reproducible (no Date.now() — keeps the JSON stable in git).
const BASE = Date.parse("2026-05-01T12:00:00Z");
const DAY = 86_400_000;

const records = [];
let idx = 0;
let stripped = 0;
for (const [dir, meta] of Object.entries(DIRS)) {
  for (const file of mdFiles(dir)) {
    const raw = readFileSync(file, "utf8");
    const { fm, body: rawBody } = parseFrontmatter(raw);
    const body = stripPlaceholders(rawBody);
    if (body !== rawBody.trim()) {
      // rewrite the source file with placeholders removed
      const fmBlock = raw.slice(0, raw.indexOf("\n---", 3) + 4);
      writeFileSync(file, `${fmBlock}\n\n${body}\n`);
      stripped++;
    }
    const slug = fm.slug || file.split("/").pop().replace(/\.md$/, "");
    const minutes = Number(fm.read_time_minutes) || Math.max(3, Math.round(body.split(/\s+/).length / 220));
    const when = new Date(BASE - idx * 2 * DAY).toISOString();
    records.push({
      id: 1_000_000 + idx,
      title: fm.title || slug,
      slug,
      body,
      excerpt: fm.excerpt || null,
      pillar: meta.pillar,
      readTime: `${minutes} min read`,
      coverImage: null,
      published: true,
      featured: false,
      contentType: meta.pastoral ? "pastoral" : "general",
      audience_type: meta.pastoral ? "pastors" : "general",
      topic: null,
      format: "article",
      audience: meta.audience,
      difficulty: "intermediate",
      readingTimeMinutes: minutes,
      publishedAt: when,
      createdAt: when,
      updatedAt: when,
    });
    idx++;
  }
}

const outPath = "api/static-library.generated.ts";
const banner =
  "// AUTO-GENERATED by scripts/build-static-library.mjs — do not edit by hand.\n" +
  "// The 143 long-form essays, shaped for api/index.ts to serve behind the live DB.\n" +
  "/* eslint-disable */\n";
writeFileSync(
  outPath,
  `${banner}const STATIC_LIBRARY: any[] = ${JSON.stringify(records, null, 2)};\nexport default STATIC_LIBRARY;\n`
);
// Also emit a plain JSON twin for tooling that can't import TS (the sitemap
// generator reads this so the essays get <url> entries even though they aren't
// DB rows).
const jsonPath = "content/static-library.generated.json";
writeFileSync(jsonPath, JSON.stringify(records, null, 2) + "\n");

// Merge the essays into client/src/data/content-data.json (the admin "Load
// articles" seed source + the reading-paths test's known-slug set). DB-snapshot
// posts are preserved; we only append slugs not already present. This is also
// the one-click DB-publish path: the admin "Load" button seeds these into the
// posts table, after which the live DB rows take over from the static library.
const contentDataPath = "client/src/data/content-data.json";
const contentData = JSON.parse(readFileSync(contentDataPath, "utf8"));
const existingSlugs = new Set((contentData.posts || []).map((p) => p.slug));
let appended = 0;
for (const r of records) {
  if (existingSlugs.has(r.slug)) continue;
  contentData.posts.push({
    title: r.title,
    slug: r.slug,
    body: r.body,
    excerpt: r.excerpt || "",
    pillar: r.pillar,
    readTime: r.readTime,
    published: true,
    publishedAt: r.publishedAt,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  });
  existingSlugs.add(r.slug);
  appended++;
}
writeFileSync(contentDataPath, JSON.stringify(contentData, null, 2) + "\n");
console.log(`content-data.json: appended ${appended} essays (now ${contentData.posts.length} posts)`);
console.log(`Wrote ${records.length} essays to ${outPath}`);
console.log(`Stripped placeholders from ${stripped} source files`);
// slug collision sanity-check within the static set
const seen = new Map();
for (const r of records) seen.set(r.slug, (seen.get(r.slug) || 0) + 1);
const dupes = [...seen].filter(([, n]) => n > 1);
if (dupes.length) console.log("WARNING duplicate slugs:", dupes);
