#!/usr/bin/env node
/**
 * build-catalogue.mjs — one record for everything James Bell has published on
 * the site, so the Library (/explore) and the Downloads shelf (/downloads) can
 * show all of it from a single file.
 *
 *   pnpm run catalogue          (tsx scripts/build-catalogue.mjs)
 *
 * Writes client/public/catalogue/index.json (gitignored; built on every deploy,
 * after `pnpm pdfs` so generated PDFs have real sizes).
 *
 * Sources, in the order a reader thinks of them:
 *   essays         → the production database at build time (the record), the
 *                    same query the sitemap uses; merged with the static essay
 *                    library exactly as the API merges it. Without
 *                    DATABASE_URL (local, CI, previews) the static library
 *                    alone stands in, and the output says so.
 *   books          → the eight book pages routed in App.tsx
 *   booklets       → client/src/data/booklets.ts (free PDF + EPUB)
 *   every library  → the manifests under client/public/* the site itself reads
 *   answers, argument cases, group guides → their data modules
 *
 * Nothing here is authored copy: every title and summary is read from the
 * source the page itself renders. Run with tsx, because three sources are
 * TypeScript data modules.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath, pathToFileURL } from "node:url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

import { ANSWERS } from "../client/src/data/answers.ts";
import { ARGUMENT_CASES } from "../client/src/data/argumentCases.ts";
import { DISCUSSION_GUIDES } from "../client/src/data/discussion-guides.ts";
import { BOOKLETS } from "../client/src/data/booklets.ts";

dotenv.config();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "client/public");
export const OUTPUT = path.join(PUB, "catalogue/index.json");

/** Display order of kinds; also the order the Library lists its shelves. */
export const KIND_ORDER = [
  "Essay",
  "Book",
  "Booklet",
  "Study guide",
  "Answer",
  "Wisdom",
  "How-to",
  "Everyday life",
  "Context guide",
  "Doctrine",
  "Church history",
  "Creed",
  "Justice",
  "Church and power",
  "Nation",
  "Pathway",
  "Care plan",
  "Group guide",
  "Argument",
  "Family",
];

const SUMMARY_MAX = 140;

// ── helpers ────────────────────────────────────────────────────────────────

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(PUB, rel), "utf8"));
const exists = (rel) => fs.existsSync(path.join(PUB, rel));

function clip(text) {
  const t = String(text ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[*_#>`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (t.length <= SUMMARY_MAX) return t;
  const cut = t.slice(0, SUMMARY_MAX);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + "…";
}

function minutesFrom(v) {
  if (typeof v === "number" && v > 0) return Math.round(v);
  const m = String(v ?? "").match(/(\d+)/);
  return m ? Number(m[1]) : undefined;
}

function isoDate(v) {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

/** A public file, with its size when it exists on disk (generated PDFs exist after `pnpm pdfs`). */
function file(label, href) {
  const abs = path.join(PUB, href.replace(/^\//, ""));
  let bytes;
  try { bytes = fs.statSync(abs).size; } catch { /* not built yet */ }
  return bytes ? { label, href, bytes } : { label, href };
}

function uniq(list, max = 12) {
  return [...new Set(list.map((s) => String(s).trim()).filter(Boolean))].slice(0, max);
}

/** Parse a quoted-string Set declaration out of a TS source file (sitemap does the same). */
function parseSet(relFile, name) {
  try {
    const src = fs.readFileSync(path.join(ROOT, relFile), "utf8");
    const m = src.match(new RegExp(`${name} = new Set<string>\\(\\[([\\s\\S]*?)\\]\\)`));
    if (!m) return new Set();
    return new Set([...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]));
  } catch {
    return new Set();
  }
}

/** "pastoral-ministry" → "Pastoral Ministry"; real phrases pass through untouched. */
function humanize(group) {
  const g = String(group ?? "").trim();
  if (!g || /\s/.test(g) || g !== g.toLowerCase()) return g;
  return g.split(/[-_]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

function item(fields) {
  if (fields.group) fields.group = humanize(fields.group);
  const out = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
}

// ── essays ───────────────────────────────────────────────────────────────

async function loadDbEssays() {
  if (!process.env.DATABASE_URL) return null;
  let conn;
  try {
    conn = await mysql.createConnection({ uri: process.env.DATABASE_URL, ssl: { rejectUnauthorized: true } });
    // Ask for only the columns the live table actually has: the production
    // schema and drizzle/schema.ts have drifted (no readingTimeMinutes there).
    const [cols] = await conn.query("SHOW COLUMNS FROM posts");
    const actual = new Map(cols.map((c) => [String(c.Field).toLowerCase(), String(c.Field)]));
    const wanted = ["slug", "title", "excerpt", "pillar", "readingTimeMinutes", "readTime", "publishedAt", "createdAt"]
      .filter((c) => actual.has(c.toLowerCase()))
      .map((c) => `\`${actual.get(c.toLowerCase())}\` AS \`${c}\``);
    const [rows] = await conn.query(
      // The same guard the sitemap and the API index use: a body under 600
      // characters is an abstract, not an essay.
      `SELECT ${wanted.join(", ")} FROM posts WHERE published = true AND CHAR_LENGTH(body) >= 600`
    );
    return rows;
  } catch (err) {
    console.warn(`[catalogue] database unavailable (${err.message}); essays from the static library only`);
    return null;
  } finally {
    if (conn) await conn.end().catch(() => {});
  }
}

function loadStaticEssays() {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(ROOT, "content/static-library.generated.json"), "utf8"));
    return raw.filter((r) => r && r.slug && r.title && r.published !== false && r.published !== 0);
  } catch {
    return [];
  }
}

function essayItems(dbRows, staticRows) {
  const takenDown = parseSet("api/index.ts", "TAKEN_DOWN");
  const hidden = parseSet("client/src/lib/hiddenSlugs.ts", "HIDDEN_SLUGS");
  const bySlug = new Map();
  // Database first; the static library fills in slugs the database lacks,
  // exactly as posts.listPublished merges them.
  for (const r of [...(dbRows ?? []), ...staticRows]) {
    if (!r.slug || bySlug.has(r.slug) || takenDown.has(r.slug) || hidden.has(r.slug)) continue;
    bySlug.set(r.slug, item({
      kind: "Essay",
      title: r.title,
      summary: clip(r.excerpt),
      href: `/writing/${r.slug}`,
      group: r.pillar,
      minutes: minutesFrom(r.readingTimeMinutes) ?? minutesFrom(r.readTime),
      date: isoDate(r.publishedAt ?? r.createdAt),
    }));
  }
  return [...bySlug.values()];
}

// ── books and booklets ─────────────────────────────────────────────────────

/**
 * The eight book pages routed in App.tsx. Titles and summaries are the pages'
 * own SEOMeta strings (the " — by James Bell" suffix dropped). The ebook files
 * behind them are sold, so no file is listed here.
 */
export const BOOKS = [
  ["when-god-bless-america", "When God Bless America Replaces Thy Kingdom Come", "A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary."],
  ["the-monster-in-the-mirror", "The Monster in the Mirror", "Why every generation gets the Bible wrong, why yours is no different, and what to do about it. A pastoral reckoning with our own blind spots."],
  ["believe", "Believe: The Rational Case for Christian Faith", "Rational answers to the hardest questions skeptics ask about God, the Bible, the resurrection, suffering, and hell, from a pastor who was once an atheist."],
  ["deconstruction-of-faith", "The Deconstruction of Faith", "An honest reckoning with why people are leaving the church, what the church owes them, and where faith goes from here. Not a defense and not a surrender."],
  ["the-reliability-of-scripture", "The Reliability of Scripture", "Why we can trust the Bible we have — the manuscripts, the canon, the archaeology, and the difference between what inerrancy claims and what its critics attack."],
  ["bible-and-homosexuality", "What Does the Bible Really Say About Homosexuality?", "Scripture, same-sex relationships, and the church's Christ-centered response — a pastoral reading that refuses the false choice between truth and love."],
  ["bible-and-transgender-identity", "What Does the Bible Say About Transgender Identity?", "Gender, the body, and the church's Christ-centered response — a pastoral reading where clarity and compassion occupy the same room."],
  ["critical-race-theory-biblical", "Is Critical Race Theory Biblical?", "Race, justice, and what the church actually owes the world — a Scripture-first reckoning that refuses both wholesale adoption and reflexive dismissal."],
];

function bookItems() {
  return BOOKS.map(([slug, title, summary]) =>
    item({ kind: "Book", title, summary: clip(summary), href: `/books/${slug}`, access: "paid" })
  );
}

function bookletItems() {
  return BOOKLETS.map((b) =>
    item({
      kind: "Booklet",
      title: b.title,
      summary: clip(b.subtitle),
      href: "/resources/hard-issues-series",
      group: b.group === "eldership" ? "Eldership" : "Church governance",
      files: [file("PDF", b.pdf), file("EPUB", b.epub)],
      access: "free",
    })
  );
}

// ── the JSON libraries ─────────────────────────────────────────────────────

function list(rel, key) {
  const data = readJson(rel);
  const arr = key ? data?.[key] : data;
  if (!Array.isArray(arr)) throw new Error(`${rel}: expected an array at ${key ?? "top level"}`);
  return arr;
}

function detail(rel) {
  try { return readJson(rel); } catch { return null; }
}

export const LIBRARIES = {
  howtos: () =>
    list("howtos/index.json", "articles").map((a) =>
      item({ kind: "How-to", title: a.title, summary: clip(a.excerpt), href: `/how-tos/${a.slug}`, group: a.topic, minutes: minutesFrom(a.readTime) })
    ),
  life: () =>
    list("life/domains-index.json", "domains").map((d) =>
      item({ kind: "Everyday life", title: d.title, summary: clip(d.blurb), href: `/life/${d.slug}`, group: d.pillar })
    ),
  studyguides: () =>
    list("studyguides/index.json", "guides").map((g) => {
      const d = detail(`studyguides/${g.slug}.json`);
      const refs = [
        ...(d?.sessions ?? []).map((s) => s?.keyScripture?.ref),
        ...(d?.scriptureIndex ?? []).map((s) => s?.ref),
      ];
      return item({
        kind: "Study guide",
        title: g.title,
        summary: clip(g.blurb ?? g.eyebrow),
        href: `/studyguides/${g.slug}`,
        group: g.audience,
        scripture: uniq(refs),
        files: [
          file("Leader's guide", `/downloads/studyguides/${g.slug}-leader.pdf`),
          file("Participant handout", `/downloads/studyguides/${g.slug}-participant.pdf`),
        ],
        access: "free",
      });
    }),
  doctrines: () =>
    list("theology/index.json", "docs")
      .filter((d) => exists(`theology/${d.slug}.json`))
      .map((d) => {
        const full = detail(`theology/${d.slug}.json`);
        return item({
          kind: "Doctrine",
          title: d.title,
          summary: clip(d.subtitle ?? d.question),
          href: `/theology/doctrine/${d.slug}`,
          scripture: uniq((full?.biblicalEvidence ?? []).map((e) => e?.passage)),
        });
      }),
  historyEssays: () =>
    list("history/essays-index.json", "essays").map((e) =>
      item({ kind: "Church history", title: e.title, summary: clip(e.blurb), href: `/theology/history/${e.slug}`, group: e.era, date: undefined, period: e.dateRange })
    ),
  historyReference: () => [
    ...list("theology/church-history-councils.json", "councils").map((c) =>
      item({ kind: "Church history", title: c.name, summary: clip(c.calledOver), href: "/theology/history", group: "Councils", period: c.year })
    ),
    ...list("theology/church-history-figures.json", "figures").map((f) =>
      item({ kind: "Church history", title: f.name, summary: clip(f.summary), href: "/theology/history", group: "Figures", period: f.dates })
    ),
    ...list("theology/church-history-heresies.json", "heresies").map((h) =>
      item({ kind: "Church history", title: h.name, summary: clip(h.claim), href: "/theology/history", group: "Heresies", period: h.era })
    ),
  ],
  context: () =>
    list("context/guides-index.json", "guides").map((g) => {
      const d = detail(`context/guides/${g.slug}.json`);
      return item({
        kind: "Context guide",
        title: g.title,
        summary: clip(g.blurb),
        href: `/resources/context/${g.slug}`,
        group: g.group,
        scripture: uniq(d?.keyTexts ?? []),
        files: [file("Printable PDF", `/downloads/context/${g.slug}.pdf`)],
        access: "free",
      });
    }),
  wisdom: () =>
    list("wisdom/topics.json", "topics").map((t) =>
      item({
        kind: "Wisdom",
        title: t.label,
        summary: clip(t.framing),
        href: `/wisdom/${t.id}`,
        scripture: uniq((t.verses ?? []).map((v) => v?.ref), 8),
        terms: uniq(t.keywords ?? [], 10).join(" "),
      })
    ),
  creeds: () =>
    list("creeds/documents-index.json", "documents").map((c) =>
      item({ kind: "Creed", title: c.title, summary: clip(c.blurb), href: `/resources/creeds/${c.slug}`, group: c.group, period: c.date })
    ),
  pathways: () =>
    list("pathways/index.json").map((p) =>
      item({ kind: "Pathway", title: p.title, summary: clip(p.subtitle ?? p.forWhom), href: `/pathways/${p.slug}` })
    ),
  plans: () =>
    list("plans/plans-index.json", "plans").map((p) =>
      item({ kind: "Care plan", title: p.title, summary: clip(p.blurb), href: `/plans/${p.slug}` })
    ),
  justice: () =>
    list("justice/topics-index.json", "topics").map((t) =>
      item({ kind: "Justice", title: t.title, summary: clip(t.blurb), href: `/justice/topic/${t.slug}` })
    ),
  disruption: () =>
    list("disruption/topics-index.json", "topics").map((t) =>
      item({ kind: "Church and power", title: t.title, summary: clip(t.blurb), href: `/disruption/topic/${t.slug}` })
    ),
  nation: () =>
    fs.readdirSync(path.join(PUB, "nation"))
      .filter((f) => f.endsWith(".json") && !["scorecard.json", "policy.json"].includes(f))
      .sort()
      .map((f) => {
        const n = readJson(`nation/${f}`);
        return item({ kind: "Nation", title: n.title, summary: clip(n.subtitle), href: `/nation/${n.slug ?? f.replace(/\.json$/, "")}` });
      }),
  family: () => {
    const devotions = [...list("family-devotions.json"), ...list("family-devotions-2.json")].length;
    return [
      item({ kind: "Family", title: "Family Catechism", summary: clip("A 52-question family catechism in the New City Catechism tradition. Each week: a question, answers for adults and children, a verse, a reflection, a prayer."), href: "/family/catechism", period: `${list("family-catechism.json").length} questions` }),
      item({ kind: "Family", title: "Family Devotions", summary: clip("A full year of family devotions to do together, plus daily Advent and Holy Week devotionals — each with a passage, a question, an activity, and a prayer."), href: "/family/devotions", period: `${devotions} devotions` }),
      item({ kind: "Family", title: "Family Reading Plans", summary: clip("Read the Bible together as a family: the life of Jesus, the Old Testament for kids, the Psalms, and a starter plan. A passage and a prompt for each day."), href: "/family/reading-plans", period: `${list("family-reading-plans.json").length} plans` }),
    ];
  },
};

// ── the TypeScript data modules ────────────────────────────────────────────

function answerItems() {
  return ANSWERS.map((a) =>
    item({ kind: "Answer", title: a.question, summary: clip(a.paragraphs?.[0]), href: `/answers#${a.slug}` })
  );
}

function argumentItems() {
  return ARGUMENT_CASES.filter((c) => c.published).map((c) =>
    item({ kind: "Argument", title: c.title, summary: clip(c.intro), href: `/tools/test-the-case?case=${c.slug}`, group: c.kicker })
  );
}

function groupGuideItems() {
  return Object.values(DISCUSSION_GUIDES).map((g) =>
    item({ kind: "Group guide", title: g.articleTitle, summary: clip(g.groupDiscussion?.[0]), href: `/group-guide/${g.slug}` })
  );
}

// ── assemble ───────────────────────────────────────────────────────────────

/** Build the catalogue. `dbRows` null means "no database": static essays only. */
export function assemble(dbRows) {
  const staticEssays = loadStaticEssays();
  const parts = {
    essays: essayItems(dbRows, staticEssays),
    books: bookItems(),
    booklets: bookletItems(),
    answers: answerItems(),
    arguments: argumentItems(),
    groupGuides: groupGuideItems(),
  };
  for (const [name, fn] of Object.entries(LIBRARIES)) parts[name] = fn();

  const kindRank = (k) => { const i = KIND_ORDER.indexOf(k); return i === -1 ? KIND_ORDER.length : i; };
  const items = Object.values(parts).flat().sort((a, b) =>
    kindRank(a.kind) - kindRank(b.kind) ||
    (b.date ?? "").localeCompare(a.date ?? "") ||
    a.title.localeCompare(b.title)
  );

  const counts = {};
  for (const it of items) counts[it.kind] = (counts[it.kind] ?? 0) + 1;

  return {
    generatedAt: new Date().toISOString(),
    essaysFrom: dbRows ? "database" : "static-library",
    counts,
    parts: Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, v.length])),
    items,
  };
}

export async function buildCatalogue() {
  return assemble(await loadDbEssays());
}

async function main() {
  const catalogue = await buildCatalogue();
  const { parts, ...shipped } = catalogue;
  const json = JSON.stringify(shipped);
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, json);
  const gz = zlib.gzipSync(json).length;
  console.log(`[catalogue] ${catalogue.items.length} items (essays from ${catalogue.essaysFrom}), ${(json.length / 1024).toFixed(0)} KB, ${(gz / 1024).toFixed(0)} KB gzipped`);
  for (const [k, n] of Object.entries(parts)) console.log(`  ${k.padEnd(18)} ${n}`);
  if (catalogue.essaysFrom !== "database" && process.env.VERCEL_ENV === "production") {
    console.error("[catalogue] PRODUCTION build without the database: the Library lists the static essay library only. Expose DATABASE_URL to the build.");
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((err) => {
    console.error("[catalogue] failed:", err);
    process.exit(1);
  });
}
