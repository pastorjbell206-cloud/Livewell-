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
  "content/drafts/skeptic-track":        { pillar: "doubt",              audience: "individuals", pastoral: false },
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


// ---------------------------------------------------------------------------
// Stage 2 — the publish bridge (2026-07). The 421 edited article bodies in
// api/_data/admin-article-bodies.json were pre-publication drafts waiting on
// the admin publish click. After the citation-integrity and steelman passes
// brought them to the house standard, they are served from the static library
// so they are live without a database write. The live DB still wins on slug
// collision (an admin-published row overrides these), and the markdown drafts
// above win within the static set. Server bundle only: these are NOT appended
// to client/src/data/content-data.json, so the client bundle does not grow.
const BODIES_PATH = "api/_data/admin-article-bodies.json";
const LIBRARY_PATH = "api/_data/article-library.json";
const TITLE_OVERRIDES = {
  "church-gun-violence": "The Church and Gun Violence",
  "healthcare-moral-issue": "Healthcare Is a Moral Issue",
  "church-refugee-crisis": "The Church and the Refugee",
  "environmental-racism": "Environmental Racism and the Body of Christ",
  "education-inequality": "Education Inequality and the Children We Form",
  "climate-refugees": "Climate Refugees and the Sojourner",
  "digital-divide": "The Digital Divide and the Gleaning Edge",
  "church-wage-theft": "Wage Theft and the God Who Hears",
  "human-trafficking-selective-outrage": "Human Trafficking and Our Selective Outrage",
  "church-domestic-violence": "The Church and Domestic Violence",
  "church-incarceration-silence": "The Church's Silence on Incarceration",
  "church-death-penalty": "The Church and the Death Penalty",
  "payday-lending-christians": "Payday Lending and the People of God",
  "disability-justice-theological": "Disability and the Image of God",
  "redlining-church-neighborhoods": "Redlining and the Neighborhoods We Kept",
  "color-blindness-not-virtue": "Color-Blindness Is Not the Virtue We Think It Is",
  "literacy-as-justice": "Literacy as Justice",
  "theological-case-against-torture": "The Theological Case Against Torture",
  "addiction-justice-issue": "Addiction Is a Justice Issue",
  "school-to-prison-pipeline": "The School-to-Prison Pipeline",
  "church-response-poverty-charity": "Charity, Justice, and the Church's Response to Poverty",
  "church-wealth-world-poverty": "The Church's Wealth and the World's Poverty",
  "foster-care-unfinished-mandate": "Foster Care: The Unfinished Mandate",
  "church-must-speak-housing": "Why the Church Must Speak About Housing",
  "theology-of-borders": "A Theology of Borders",
  "gender-based-violence": "Gender-Based Violence and the House of God",
  "elder-abuse-invisible": "Elder Abuse: The Invisible Sin",
  "church-food-insecurity": "The Church and Food Insecurity",
  "church-mental-health-justice": "Mental Health Is a Justice Issue",
  "moral-injury-veterans": "Moral Injury and the Veterans Among Us",
  "food-deserts-theology-bread": "Food Deserts and the Theology of Bread",
  "food-sovereignty-theology-table": "Food Sovereignty and the Theology of the Table",
  "theology-fair-wages": "A Theology of Fair Wages",
  "black-church-prophetic-justice": "The Black Church and Prophetic Justice",
  "racial-reconciliation-without-repentance": "Racial Reconciliation Without Repentance",
  "doctrine-of-discovery": "The Doctrine of Discovery",
  "theology-of-reparations": "A Theology of Reparations",
  "gentrification-displacement": "Gentrification and Displacement",
  "water-theological-issue": "Water Is a Theological Issue",
  "maternal-mortality-pro-life": "Maternal Mortality and the Meaning of Pro-Life",
  "theology-of-repair": "The Practices of Repair",
  "theology-of-land": "A Theology of Land",
  "theology-of-protest": "A Theology of Protest",
  "ai-authenticity-pastor-artificial-intelligence": "AI and the Pastor's Calling",
};
const SMALL_WORDS = new Set(["a","an","and","as","at","but","by","for","in","is","it","of","on","or","the","to","vs","with","without","when","how","what","why","are","your","you"]);
function titleFromSlug(slug) {
  const words = slug.replace(/^\d+-/, "").split("-");
  return words.map((w, i) => (i > 0 && SMALL_WORDS.has(w)) ? w : w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function excerptFromBody(body) {
  const plain = body.replace(/^#+\s.*$/gm, "").replace(/[*_>#]/g, "").replace(/\s+/g, " ").trim();
  if (plain.length <= 180) return plain;
  const cut = plain.slice(0, 180);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
  return stop > 60 ? cut.slice(0, stop + 1) : cut.trimEnd() + "\u2026";
}
const LIB_PILLAR_TO_TRACK = {
  "Theological Depth": "theology",
  "Prophetic Justice": "prophetic-justice",
  "Prophetic Disruption": "american-church",
  "Leadership Formation": "pastoral-ministry",
  "Integrated Life": "devotionals",
};
const bridgeRecords = [];
if (existsSync(BODIES_PATH)) {
  const bodies = JSON.parse(readFileSync(BODIES_PATH, "utf8"));
  const library = existsSync(LIBRARY_PATH) ? JSON.parse(readFileSync(LIBRARY_PATH, "utf8")) : [];
  const libBySlug = new Map(library.map((a) => [a.slug, a]));
  const already = new Set(records.map((r) => r.slug));
  const BASE2 = Date.parse("2026-07-01T12:00:00Z");
  let j = 0;
  for (const b of bodies) {
    if (already.has(b.slug)) continue;
    const lib = libBySlug.get(b.slug);
    const numbered = /^\d+-/.test(b.slug);
    const inJustice = Object.prototype.hasOwnProperty.call(TITLE_OVERRIDES, b.slug);
    const pillar = lib ? (LIB_PILLAR_TO_TRACK[lib.pillar] || "theology")
      : inJustice ? (b.slug === "ai-authenticity-pastor-artificial-intelligence" ? "pastoral-ministry" : "prophetic-justice")
      : numbered ? "pastoral-ministry" : "theology";
    const pastoral = pillar === "pastoral-ministry";
    const minutes = Number(b.readingTimeMinutes) || Math.max(3, Math.round(b.body.split(/\s+/).length / 220));
    const when = new Date(BASE2 - j * DAY).toISOString();
    bridgeRecords.push({
      id: 2_000_000 + j,
      title: TITLE_OVERRIDES[b.slug] || (lib && lib.title) || titleFromSlug(b.slug),
      slug: b.slug,
      body: b.body,
      excerpt: (lib && lib.excerpt) || excerptFromBody(b.body),
      pillar,
      readTime: `${minutes} min read`,
      coverImage: null,
      published: true,
      featured: false,
      contentType: pastoral ? "pastoral" : "general",
      audience_type: pastoral ? "pastors" : "general",
      topic: null,
      format: "article",
      audience: pastoral ? "pastors" : "individuals",
      difficulty: "intermediate",
      readingTimeMinutes: minutes,
      publishedAt: when,
      createdAt: when,
      updatedAt: when,
    });
    already.add(b.slug);
    j++;
  }
}
// ---------------------------------------------------------------------------
// Stage 3 — the flagship drafts (2026-07). The ten finished essays in
// api/_data/draft-essays.json were staged as unpublished DB posts for the
// admin to publish by hand. With admin publish confirmed, they are served
// from the static library like the Stage 2 bodies — live without a database
// write, still overridden by any live DB row of the same slug.
const DRAFTS_PATH = "api/_data/draft-essays.json";
const draftRecords = [];
if (existsSync(DRAFTS_PATH)) {
  const drafts = JSON.parse(readFileSync(DRAFTS_PATH, "utf8"));
  const list = Array.isArray(drafts) ? drafts : Object.values(drafts);
  const seen = new Set(allRecordsSlugs());
  const BASE3 = Date.parse("2026-07-03T12:00:00Z");
  let k = 0;
  for (const d of list) {
    if (!d || !d.slug || seen.has(d.slug)) continue;
    const track = LIB_PILLAR_TO_TRACK[d.pillar] || "theology";
    const pastoral = track === "pastoral-ministry";
    const minutes = parseInt(String(d.readTime), 10) || Math.max(3, Math.round(String(d.body).split(/\s+/).length / 220));
    const when = new Date(BASE3 - k * DAY).toISOString();
    draftRecords.push({
      id: 3_000_000 + k,
      title: d.title || titleFromSlug(d.slug),
      slug: d.slug,
      body: d.body,
      excerpt: d.excerpt || excerptFromBody(d.body),
      pillar: track,
      readTime: `${minutes} min read`,
      coverImage: null,
      published: true,
      featured: false,
      contentType: pastoral ? "pastoral" : "general",
      audience_type: pastoral ? "pastors" : "general",
      topic: null,
      format: "article",
      audience: pastoral ? "pastors" : "individuals",
      difficulty: "intermediate",
      readingTimeMinutes: minutes,
      publishedAt: when,
      createdAt: when,
      updatedAt: when,
    });
    seen.add(d.slug);
    k++;
  }
}

function allRecordsSlugs() {
  return records.map((r) => r.slug).concat(bridgeRecords.map((r) => r.slug));
}

// ---------------------------------------------------------------------------
// Stage 4 — the Post-Christian series (2026-07). The sixty finished essays in
// api/post-christian-articles.json were publishable only through the one-shot
// admin seed (/api/admin/seed-post-christian), so every /writing/:slug in the
// PostChristian hub 404'd until an admin ran it. Served from the static library
// like the other stages, they go live on build — no database write — and a live
// DB row of the same slug still overrides them.
const PC_PATH = "api/post-christian-articles.json";
const pcRecords = [];
if (existsSync(PC_PATH)) {
  const pc = JSON.parse(readFileSync(PC_PATH, "utf8"));
  const list = Array.isArray(pc) ? pc : Object.values(pc);
  const seen = new Set(allRecordsSlugs().concat(draftRecords.map((r) => r.slug)));
  const BASE4 = Date.parse("2026-07-05T12:00:00Z");
  let k = 0;
  for (const p of list) {
    if (!p || !p.slug || seen.has(p.slug)) continue;
    const track = LIB_PILLAR_TO_TRACK[p.pillar] || "theology";
    const pastoral = track === "pastoral-ministry";
    const minutes = parseInt(String(p.readTime), 10) || Math.max(3, Math.round(String(p.body).split(/\s+/).length / 220));
    const when = new Date(BASE4 - k * DAY).toISOString();
    pcRecords.push({
      id: 4_000_000 + k,
      title: p.title || titleFromSlug(p.slug),
      slug: p.slug,
      body: p.body,
      excerpt: p.excerpt || excerptFromBody(p.body),
      pillar: track,
      readTime: `${minutes} min read`,
      coverImage: null,
      published: true,
      featured: false,
      contentType: pastoral ? "pastoral" : "general",
      audience_type: pastoral ? "pastors" : "general",
      topic: null,
      format: "article",
      audience: pastoral ? "pastors" : "individuals",
      difficulty: "intermediate",
      readingTimeMinutes: minutes,
      publishedAt: when,
      createdAt: when,
      updatedAt: when,
    });
    seen.add(p.slug);
    k++;
  }
}

const allRecords = records.concat(bridgeRecords, draftRecords, pcRecords);

const outPath = "api/static-library.generated.ts";
const banner =
  "// AUTO-GENERATED by scripts/build-static-library.mjs — do not edit by hand.\n" +
  "// The 143 long-form essays, shaped for api/index.ts to serve behind the live DB.\n" +
  "/* eslint-disable */\n";
writeFileSync(
  outPath,
  `${banner}const STATIC_LIBRARY: any[] = ${JSON.stringify(allRecords, null, 2)};\nexport default STATIC_LIBRARY;\n`
);
// Also emit a plain JSON twin for tooling that can't import TS (the sitemap
// generator reads this so the essays get <url> entries even though they aren't
// DB rows).
const jsonPath = "content/static-library.generated.json";
writeFileSync(jsonPath, JSON.stringify(allRecords, null, 2) + "\n");

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
console.log(`Wrote ${records.length} markdown essays + ${bridgeRecords.length} bridged articles + ${draftRecords.length} flagship drafts + ${pcRecords.length} post-Christian essays = ${allRecords.length} to ${outPath}`);
console.log(`Stripped placeholders from ${stripped} source files`);
// slug collision sanity-check within the static set
const seen = new Map();
for (const r of allRecords) seen.set(r.slug, (seen.get(r.slug) || 0) + 1);
const dupes = [...seen].filter(([, n]) => n > 1);
if (dupes.length) console.log("WARNING duplicate slugs:", dupes);
