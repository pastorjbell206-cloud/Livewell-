/**
 * The download plan: every PDF `pnpm pdfs` writes to client/public/downloads,
 * derived from the content in the repo. build-pdfs.mjs renders it;
 * validate-downloads.mjs checks links against it without rendering anything.
 *
 * Each job: { file, title, category, spec(), page?, gated? }, where `file` is
 * relative to client/public/downloads and spec() returns the product (kit
 * options plus render); spec() is only called when a job is rendered. `page`
 * is the site page a download belongs to; `gated` marks the email-gated
 * toolkits (study guides, reading paths), which the /resources list sends to
 * their page rather than linking the file directly.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { studyGuideLeader, studyGuideParticipant, studyGuidePacket } from "./products/studyguides.mjs";
import { contextGuide, readingPath } from "./products/guides.mjs";
import { catechismCards, catechismChart, devotionsVolume, adventPack, holyWeekPack } from "./products/family.mjs";
import { carePlanWorkbook } from "./products/careplans.mjs";
import { pathwayReader } from "./products/pathways.mjs";
import { creedsReader } from "./products/creeds.mjs";
import { doctrineSheet, doctrineSheetsAll } from "./products/doctrines.mjs";
import { bookSummary, bookSummariesAll } from "./products/bible.mjs";
import { essayEdition } from "./products/essays.mjs";
import { timelinePoster, storyPoster } from "./products/posters.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const OUT_DIR = path.join(ROOT, "client/public/downloads");
const PUB = path.join(ROOT, "client/public");

/** Category order and the one line the /resources hub shows under each. */
export const CATEGORIES = [
  { name: "For the household", blurb: "Catechism cards and a fridge chart, the family devotions in twelve-week volumes, and Advent and Holy Week packs." },
  { name: "Care plan workbooks", blurb: "Each eight-week care plan as a workbook with room to write, and a path to real help on every page." },
  { name: "Essays to print", blurb: "The canon essays, set for reading on paper, with discussion questions where a guide exists." },
  { name: "Pathway readers", blurb: "Each topical pathway as a printed reader: the essays' own words, the studies, and questions to carry." },
  { name: "Study guides", blurb: "Leader's guides and participant handouts for every small-group study." },
  { name: "Group leader packets", blurb: "The leader's guide and the participant handout for a study in one file." },
  { name: "Reading Scripture in Context", blurb: "The background guides: the worlds the Bible was written in." },
  { name: "Creeds and confessions", blurb: "The creeds, confessions and catechisms with introductions and notes." },
  { name: "Doctrine sheets", blurb: "One page per doctrine: what Scripture teaches, where the church still disagrees, and where to read." },
  { name: "Books of the Bible", blurb: "A one-page summary of each of the 66 books, from the Study Bible's introductions." },
  { name: "Posters", blurb: "Eleven by seventeen inches: the story of the Bible and the story of the church." },
  { name: "Reading paths", blurb: "Short guided routes through the studies." },
];

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const exists = (p) => fs.existsSync(p);
const jsonFiles = (dir, skip = ["index.json"]) =>
  exists(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !skip.includes(f)).sort() : [];

let guidesPromise = null;
/** DISCUSSION_GUIDES from the TypeScript data file, compiled on the fly. */
export function loadDiscussionGuides() {
  if (!guidesPromise) {
    guidesPromise = (async () => {
      const { transformSync } = await import("esbuild");
      const src = fs.readFileSync(path.join(ROOT, "client/src/data/discussion-guides.ts"), "utf8");
      const js = transformSync(src, { loader: "ts", format: "esm" }).code;
      const mod = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
      return mod.DISCUSSION_GUIDES || {};
    })();
  }
  return guidesPromise;
}

let libCache = null;
function essayLibrary() {
  if (!libCache) {
    const p = path.join(ROOT, "content/static-library.generated.json");
    const list = exists(p) ? readJson(p) : [];
    libCache = new Map(list.filter((e) => e && e.slug && e.published !== false).map((e) => [e.slug, e]));
  }
  return libCache;
}

export async function planDownloads() {
  const jobs = [];
  const add = (file, title, category, spec, extra = {}) => jobs.push({ file, title, category, spec, ...extra });

  // Study guides: leader + participant (existing names) + the combined packet.
  for (const f of jsonFiles(path.join(PUB, "studyguides"))) {
    const g = readJson(path.join(PUB, "studyguides", f));
    const sg = { page: `/studyguides/${g.slug}`, gated: true };
    add(`studyguides/${g.slug}-leader.pdf`, `${g.title}: Leader's Guide`, "Study guides", () => studyGuideLeader(g), sg);
    add(`studyguides/${g.slug}-participant.pdf`, `${g.title}: Participant Handout`, "Study guides", () => studyGuideParticipant(g), sg);
    add(`studyguides/${g.slug}-packet.pdf`, `${g.title}: Group Leader Packet`, "Group leader packets", () => studyGuidePacket(g), sg);
  }

  // Reading Scripture in Context.
  for (const f of jsonFiles(path.join(PUB, "context/guides"), [])) {
    const guide = readJson(path.join(PUB, "context/guides", f));
    add(`context/${guide.slug}.pdf`, guide.title, "Reading Scripture in Context", () => contextGuide(guide), { page: `/resources/context/${guide.slug}` });
  }

  // Reading paths (email-gated lead magnets).
  const rpFile = path.join(PUB, "reading-paths/index.json");
  if (exists(rpFile)) {
    // The pages that carry each path's email gate (PillarLeadMagnet).
    const host = { skeptic: "/skeptic-track", doubt: "/doubt", marriage: "/marriage", parenting: "/parenting" };
    for (const rp of readJson(rpFile).paths || []) {
      add(`reading-paths/${rp.slug}.pdf`, rp.title, "Reading paths", () => readingPath(rp), { page: host[rp.slug] || "/reading-paths", gated: true });
    }
  }

  // For the household.
  const cat = readJson(path.join(PUB, "family-catechism.json"));
  add("family/catechism-cards.pdf", "The Family Catechism: Cards", "For the household", () => catechismCards(cat));
  add("family/catechism-chart.pdf", "The Family Catechism: Fridge Chart", "For the household", () => catechismChart(cat));
  const devotions = [...readJson(path.join(PUB, "family-devotions.json")), ...readJson(path.join(PUB, "family-devotions-2.json"))];
  const volumes = [];
  for (let i = 0; i + 12 <= devotions.length; i += 12) volumes.push(devotions.slice(i, i + 12));
  volumes.forEach((items, i) => {
    add(`family/devotions-volume-${i + 1}.pdf`, `Family Devotions, Volume ${i + 1}`, "For the household", () => devotionsVolume(i + 1, items, volumes.length));
  });
  const seasonal = readJson(path.join(PUB, "family-seasonal.json"));
  if (seasonal.advent?.length) add("family/advent-at-home.pdf", "Advent at Home", "For the household", () => adventPack(seasonal.advent));
  if (seasonal.holyWeek?.length) add("family/holy-week-at-home.pdf", "Holy Week at Home", "For the household", () => holyWeekPack(seasonal.holyWeek));

  // Care plan workbooks.
  const plansIndex = readJson(path.join(PUB, "plans/plans-index.json"));
  for (const entry of plansIndex.plans || []) {
    const pf = path.join(PUB, "plans", `${entry.slug}.json`);
    if (!exists(pf)) continue;
    const p = readJson(pf);
    add(`care-plans/${p.slug}.pdf`, `${p.title}: A Workbook`, "Care plan workbooks", () => carePlanWorkbook(p));
  }

  // Shared lookups for the readers and sheets.
  const lib = essayLibrary();
  const studyguides = new Map(jsonFiles(path.join(PUB, "studyguides")).map((f) => {
    const g = readJson(path.join(PUB, "studyguides", f));
    return [g.slug, g];
  }));
  const books = readJson(path.join(PUB, "bible/books.json"));
  const booksBySlug = new Map(books.map((b) => [b.slug, b]));
  const notesIndex = readJson(path.join(PUB, "bible/notes-index.json"));
  const guides = await loadDiscussionGuides();
  const ctx = {
    essay: (slug) => lib.get(slug) || null,
    guide: (slug) => guides[slug] || null,
    studyguide: (slug) => studyguides.get(slug) || null,
    theology: (slug) => {
      const p = path.join(PUB, "theology", `${slug}.json`);
      return exists(p) ? readJson(p) : null;
    },
    doctrineChapters: (id) => notesIndex.doctrines?.[id] || [],
    books: booksBySlug,
  };

  // Pathway readers.
  for (const f of jsonFiles(path.join(PUB, "pathways"))) {
    const p = readJson(path.join(PUB, "pathways", f));
    add(`pathways/${p.slug}.pdf`, `${p.title}: A Pathway Reader`, "Pathway readers", () => pathwayReader(p, ctx));
  }

  // Essays to print: the canon, then any flagship not already in it.
  const canon = readJson(path.join(ROOT, "client/src/data/canon.json")).slugs || [];
  const flagship = readJson(path.join(ROOT, "client/src/data/featured.json")).flagship || [];
  const canonSet = new Set(canon);
  for (const slug of [...new Set([...canon, ...flagship])]) {
    const e = lib.get(slug);
    if (!e) continue;
    const kicker = canonSet.has(slug) ? "An essay from the canon" : "An essay";
    add(`essays/${slug}.pdf`, e.title, "Essays to print", () => essayEdition(e, { guide: guides[slug] || null, kicker }));
  }

  // Creeds reader.
  const creedIndex = readJson(path.join(PUB, "creeds/documents-index.json"));
  const creeds = (creedIndex.documents || [])
    .map((d) => path.join(PUB, "creeds/documents", `${d.slug}.json`))
    .filter(exists)
    .map(readJson);
  if (creeds.length) add("creeds/creeds-reader.pdf", "The Creeds Reader", "Creeds and confessions", () => creedsReader(creeds));

  // Doctrine sheets.
  const doctrines = readJson(path.join(PUB, "bible/doctrines.json")).doctrines || [];
  add("doctrines/all-doctrine-sheets.pdf", "Doctrine Sheets: All in One", "Doctrine sheets", () => doctrineSheetsAll(doctrines, ctx));
  doctrines.forEach((doc, i) => {
    add(`doctrines/${doc.id}.pdf`, doc.name, "Doctrine sheets", () => doctrineSheet(doc, i, doctrines.length, ctx));
  });

  // Books of the Bible.
  const intros = books.map((b) => {
    const p = path.join(PUB, "bible/notes", b.slug, "intro.json");
    return exists(p) ? readJson(p) : null;
  });
  if (intros.every(Boolean)) {
    add("bible/all-66-books.pdf", "The Books of the Bible: All 66", "Books of the Bible", () => bookSummariesAll(books, intros));
  }
  books.forEach((b, i) => {
    if (intros[i]) add(`bible/${b.slug}.pdf`, b.name, "Books of the Bible", () => bookSummary(b, intros[i], i));
  });

  // Posters.
  add("posters/story-of-the-bible.pdf", "The Story of the Bible (11x17)", "Posters", () =>
    storyPoster(readJson(path.join(PUB, "theology/biblical-theology-storyline.json")), readJson(path.join(PUB, "bible/story.json"))));
  add("posters/church-history-timeline.pdf", "The Story of the Church (11x17)", "Posters", () =>
    timelinePoster(readJson(path.join(PUB, "theology/church-history-timeline.json"))));

  return jobs;
}
