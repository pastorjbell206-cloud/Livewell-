#!/usr/bin/env node
/**
 * build-essay-volumes.mjs — LiveWell by James Bell
 *
 * Gathers every standalone essay (from the code-shipped article libraries) that
 * is NOT already a chapter in one of James's 22 authored books, groups them into
 * themed volumes by topic, and writes each volume as a readable book
 * (client/public/books/<slug>.json) plus an entry in books/index.json. Each
 * essay becomes a chapter. Volumes render at /read/:slug via BookReader.
 *
 * Deterministic: keyword scoring constrained by each essay's pillar, so the
 * grouping is reproducible and reviewable. Run with --write to emit files;
 * default is a dry-run report.
 *
 * SAFETY:
 *  - Never touches the 22 authored books (only writes VOLUME_SLUGS files and
 *    their index entries; preserves every other index entry).
 *  - Skips any essay whose body still contains an unresolved "[cite" placeholder
 *    (no fabricated-looking citations go into a book).
 */
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BOOKS_DIR = join(ROOT, "client/public/books");
const INDEX = join(BOOKS_DIR, "index.json");
const WRITE = process.argv.includes("--write");

// ── Themed volumes: slug, title, subtitle, blurb, pillar, and the keywords that
//    pull an essay in. Order matters — first strong match wins within a pillar. ──
const VOLUMES = [
  { slug: "essays-marriage-and-family", title: "On Marriage & Family", pillar: "Integrated Life",
    subtitle: "Covenant, conflict, and the long work of staying",
    blurb: "Essays on marriage as covenant rather than contract — communication, conflict, intimacy, forgiveness, and the slow, unglamorous faithfulness of two people keeping a promise they are still learning to understand.",
    kw: ["marriage","spouse","husband","wife","covenant","divorce","in-law","intimacy","romance","one flesh","adultery","affair","newlywed","wedding"] },
  { slug: "essays-parenting", title: "On Parenting", pillar: "Integrated Life",
    subtitle: "Raising children in a faith you are still learning",
    blurb: "Essays for parents raising children in the faith without fear, formula, or guilt — discipline, teenagers, prodigals, and handing on a faith worth keeping.",
    kw: ["parenting","parent","children","child","kids","raising","teenager","teen","toddler","discipline","prodigal","son and","daughter and","raise your"] },
  { slug: "essays-manhood", title: "On Manhood", pillar: "Integrated Life",
    subtitle: "Fatherhood, work, and being a man who stays",
    blurb: "Essays on manhood from a man raised without a father and raising five sons — fatherhood, provision, anger, presence, and the men the church forgot to form.",
    kw: ["manhood","masculin","fatherhood","father","fathers","the father","sons","brotherhood","a man ","men who","being a man","male"] },
  { slug: "essays-womanhood", title: "On Womanhood", pillar: "Integrated Life",
    subtitle: "Identity, calling, and worth beyond the roles",
    blurb: "Essays on womanhood — identity, calling, motherhood, singleness, and worth that does not depend on a role or a season.",
    kw: ["womanhood","woman","women","feminin","motherhood","mother","daughter","wife and","single woman","sisterhood","her worth"] },
  { slug: "essays-money-work-vocation", title: "On Money, Work & Vocation", pillar: "Integrated Life",
    subtitle: "Calling, provision, and the God of the ordinary job",
    blurb: "Essays on money, work, and calling — debt, generosity, ambition, rest from hustle, and the sacredness of an ordinary Tuesday's labor.",
    kw: ["money","finance","financial","debt","generosity","giving","wealth","rich","poor budget","work","vocation","calling","career","job","ambition","hustle","retirement","provision","tithe"] },
  { slug: "essays-rhythms-rest-prayer", title: "On Rhythms, Rest & Prayer", pillar: "Integrated Life",
    subtitle: "Sabbath, silence, and a life that can be sustained",
    blurb: "Essays on the practices that hold a life together — sabbath, rest, prayer, silence, and the spiritual disciplines that form a soul over time.",
    kw: ["sabbath","rest","rhythm","prayer","pray","fasting","silence","solitude","meditation","spiritual discipline","spiritual formation","habit","practice","liturgy","anxiety","burnout of the soul","attention","technolog","phone"] },
  { slug: "essays-faith-and-doubt", title: "On Faith & Doubt", pillar: "Integrated Life",
    subtitle: "Honest questions and a faith worth keeping",
    blurb: "Essays for the doubting and the deconstructing — honest questions taken seriously, the faith the church poorly defended, and a way to keep the question inside the faith instead of leaving to keep it.",
    kw: ["doubt","deconstruct","questioning","skeptic","unbelief","faith after","is god real","why believe","suffering and god","reconstruct","apologetic","evidence for"] },
  { slug: "essays-daily-devotionals", title: "Daily Devotionals", pillar: "Integrated Life",
    subtitle: "Short readings for an ordinary morning",
    blurb: "Short devotional readings — a passage, a thought, and a prayer — for the ordinary mornings that make up most of a life with God.",
    kw: ["devotional","devotion","daily reading","morning prayer","a meditation on","reflection on psalm","day ","advent","lent","holy week"] },
  { slug: "essays-doctrine-and-scripture", title: "On Doctrine & Scripture", pillar: "Theological Depth",
    subtitle: "The great truths, explained without condescension",
    blurb: "Essays on the doctrines the church confesses and the Scripture it reads — the Trinity, the gospel, grace, atonement, the reliability of the Bible, and how to read it without making it say what we want.",
    kw: ["doctrine","trinity","gospel","grace","atonement","incarnation","resurrection","justification","sanctification","inerrancy","scripture","the bible","hermeneutic","exegesis","read the bible","holy spirit","salvation","sin ","imputation"] },
  { slug: "essays-church-history", title: "On Church History & the Creeds", pillar: "Theological Depth",
    subtitle: "The story you were born into",
    blurb: "Essays on the church's long memory — the councils, the creeds, the Reformation, the awakenings, and the people who carried the faith to us.",
    kw: ["church history","reformation","nicaea","council","creed","crusade","awakening","luther","augustine","athanasius","church father","heresy","denomination","tradition","history of the church","early church","monastic"] },
  { slug: "essays-biblical-theology", title: "On Biblical Theology", pillar: "Theological Depth",
    subtitle: "The whole Bible as one story that ends in Christ",
    blurb: "Essays tracing the Bible as one story climaxing in Christ — the kingdom of God, exodus, covenant, the image of God, and living between the already and the not yet.",
    kw: ["kingdom of god","biblical theology","exodus","the whole bible","one story","image of god","already and not yet","typolog","covenant of","the storyline","genesis","revelation and","eschatolog","new creation"] },
  { slug: "essays-after-christendom", title: "After Christendom & the Captive Church", pillar: "Prophetic Disruption",
    subtitle: "Faith after the flag, the tribe, and the empire",
    blurb: "Essays on the church's captivity to nation, tribe, and culture — Christian nationalism, the end of cultural Christianity, and what a faithful, exiled church looks like on the other side.",
    kw: ["nationalism","nationalist","patriot","flag","empire","constantine","render unto","caesar","christendom","post-christian","exile","secular","cultural christianity","civil religion","political idol","two kingdoms","captive church","decline of the church","the religious right"] },
  { slug: "essays-justice-and-the-vulnerable", title: "On Justice & the Vulnerable", pillar: "Prophetic Justice",
    subtitle: "Mishpat, the poor at the gate, and the church's silence",
    blurb: "Essays on biblical justice — mishpat and tsedaqah, the poor and the stranger, race and reconciliation, and the church's long silence where it should have spoken.",
    kw: ["justice","mishpat","tsedaqah","poor","poverty","widow","orphan","stranger","immigrant","refugee","race","racial","reconciliation","vulnerable","incarceration","prison","disability","jubilee","oppress","the least of these","housing","solidarity"] },
  { slug: "essays-pastoring-and-the-church", title: "On Pastoring & the Church", pillar: "Leadership Formation",
    subtitle: "The weight of leading the people of God",
    blurb: "Essays for pastors and lay leaders — burnout and health, preaching, staff and elders, church revitalization, and the loneliness of the job up front.",
    kw: ["pastor","pastoral","ministry","minister","preaching","preach","sermon","elder","deacon","burnout","church health","revitaliz","church plant","staff","congregation","shepherd","leadership","discipleship","the pulpit","bivocational"] },
];
const VOLUME_SLUGS = new Set(VOLUMES.map((v) => v.slug));

// Pillar -> its candidate volumes (for pillar-constrained scoring)
const byPillar = {};
for (const v of VOLUMES) { (byPillar[v.pillar] = byPillar[v.pillar] || []).push(v); }
// Fallback volume per pillar (when no keyword matches within the pillar)
const PILLAR_FALLBACK = {
  "Integrated Life": "essays-faith-and-doubt",
  "Theological Depth": "essays-doctrine-and-scripture",
  "Prophetic Disruption": "essays-after-christendom",
  "Prophetic Justice": "essays-justice-and-the-vulnerable",
  "Leadership Formation": "essays-pastoring-and-the-church",
};
const LEGACY_TO_FALLBACKPILLAR = { // normalize odd pillar labels
  "Pastoral Ministry": "Leadership Formation",
  "The Table": "Leadership Formation",
  "After Christendom": "Prophetic Disruption",
};

function score(text, kws) { let s = 0; for (const k of kws) { if (text.includes(k)) s++; } return s; }

function classify(essay) {
  let pillar = (essay.pillar || "").trim();
  if (LEGACY_TO_FALLBACKPILLAR[pillar]) pillar = LEGACY_TO_FALLBACKPILLAR[pillar];
  const cands = byPillar[pillar] || VOLUMES; // in array order = priority
  const head = ((essay.title || "") + " " + (essay.slug || "").replace(/-/g, " ")).toLowerCase();
  const body = (essay.body || "").slice(0, 1500).toLowerCase();
  // 1) Title/slug is the strong signal: first volume (by priority) whose keyword
  //    appears in the title wins. This keeps "Marriage After Children" in Marriage.
  for (const v of cands) { if (v.kw.some((k) => head.includes(k))) return v.slug; }
  // 2) No title hit — fall back to body keyword scoring across the pillar.
  let best = null, bestScore = 0;
  for (const v of cands) { const sc = score(body, v.kw); if (sc > bestScore) { bestScore = sc; best = v; } }
  if (best) return best.slug;
  // 3) Nothing — the pillar's fallback volume.
  return PILLAR_FALLBACK[pillar] || cands[0].slug;
}

// ── Load all writing sources, dedup by slug, drop [cite] and book-chapter slugs ──
function load(p) { try { const j = JSON.parse(fs.readFileSync(join(ROOT, p), "utf8")); return Array.isArray(j) ? j : (j.articles || j.essays || j.posts || []); } catch { return []; } }
const sources = [
  "api/post-christian-articles.json", "api/integrated-life-articles.json",
  "api/womanhood-doubt-devotional-articles.json", "api/_data/article-library.json",
];
const dataDir = join(ROOT, "client/src/data/articles");
if (fs.existsSync(dataDir)) for (const f of fs.readdirSync(dataDir)) if (f.endsWith(".json")) sources.push("client/src/data/articles/" + f);

const W = new Map();
for (const s of sources) for (const a of load(s)) { if (a && a.slug && a.body && !W.has(a.slug)) W.set(a.slug, a); }

const idx = JSON.parse(fs.readFileSync(INDEX, "utf8"));
const existingBooks = idx.books || idx;
const bookChapterSlugs = new Set();
for (const b of existingBooks) { try { const bf = JSON.parse(fs.readFileSync(join(BOOKS_DIR, b.slug + ".json"), "utf8")); for (const ch of (bf.chapters || [])) if (ch.slug) bookChapterSlugs.add(ch.slug); } catch { /**/ } }

const hasCite = (b) => /\[cite/i.test(b || "");
let skippedCite = 0, alreadyInBook = 0;
const buckets = {}; for (const v of VOLUMES) buckets[v.slug] = [];
for (const a of W.values()) {
  if (bookChapterSlugs.has(a.slug)) { alreadyInBook++; continue; }
  if (hasCite(a.body)) { skippedCite++; continue; }
  buckets[classify(a)].push(a);
}

console.log(`Writings: ${W.size} unique | already in a book: ${alreadyInBook} | held back for [cite]: ${skippedCite}`);
console.log(`\nThemed volumes (${WRITE ? "WRITING" : "dry-run"}):`);
let totalCh = 0;
for (const v of VOLUMES) {
  const ch = buckets[v.slug]; totalCh += ch.length;
  console.log(`  ${String(ch.length).padStart(3)}  ${v.title}`);
}
console.log(`  ${String(totalCh).padStart(3)}  TOTAL chapters across ${VOLUMES.length} volumes`);

if (!WRITE) {
  console.log("\n(dry-run — pass --write to generate the book files. Sample of the biggest volume:)");
  const biggest = VOLUMES.map((v) => [v, buckets[v.slug]]).sort((a, b) => b[1].length - a[1].length)[0];
  console.log(`  ${biggest[0].title}:`); for (const a of biggest[1].slice(0, 8)) console.log(`    - ${a.title}`);
  process.exit(0);
}

// ── Write the volume book files (the index is regenerated separately by
//    scripts/build-books-index.mjs, which scans every books/*.json). ──
let written = 0;
for (const v of VOLUMES) {
  const list = buckets[v.slug];
  if (list.length < 3) continue; // skip a near-empty volume
  list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  const chapters = list.map((a, i) => ({
    n: i + 1, slug: a.slug, title: a.title || a.slug,
    summary: a.excerpt || null, body: a.body,
  }));
  const book = { title: v.title, subtitle: v.subtitle, blurb: v.blurb, pillar: v.pillar, chapters };
  fs.writeFileSync(join(BOOKS_DIR, v.slug + ".json"), JSON.stringify(book, null, 2) + "\n");
  written++;
}
console.log(`\nWrote ${written} themed-volume book files. Now run: node scripts/build-books-index.mjs`);
