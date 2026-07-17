#!/usr/bin/env node
/**
 * build-llms-full.mjs
 *
 * Generates client/public/llms-full.txt: a complete, AI-readable index of the
 * whole library, in the llms.txt markdown convention that answer engines
 * (ChatGPT, Perplexity, Claude, Gemini) look for. The short curated llms.txt is
 * the front door; this is the full map, so a model that wants to know what the
 * site covers can read titles, URLs, and one-line summaries for everything in a
 * single fetch.
 *
 * Deterministic and dependency-free: reads the committed content manifests and
 * the essay seed. No database needed. Fails soft per source.
 *
 *   node scripts/build-llms-full.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE = "https://www.livewellbyjamesbell.co";
const OUT = path.join(ROOT, "client/public/llms-full.txt");

function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
  } catch {
    return null;
  }
}

/** Collapse whitespace and clip a summary to one clean line. */
function oneLine(s, max = 200) {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : t;
}

function entryLine(title, url, summary) {
  const t = oneLine(title, 140);
  const s = summary ? `: ${oneLine(summary)}` : "";
  return `- [${t}](${url})${s}`;
}

// Each section: how to read its manifest and where each item lives.
const SECTIONS = [
  {
    heading: "Essays",
    intro: "Long-form essays on theology, culture, marriage, parenting, doubt, and pastoral ministry.",
    build() {
      const data = readJson("client/src/data/content-data.json");
      const posts = Array.isArray(data) ? data : data?.posts;
      if (!Array.isArray(posts)) return [];
      return posts
        .filter((p) => p && p.slug && p.title && p.published !== false)
        .map((p) => entryLine(p.title, `${SITE}/writing/${p.slug}`, p.excerpt || p.summary || p.subtitle));
    },
  },
  {
    heading: "Christ and the Nation",
    intro: "The platform's political theology: the church and power, Christian nationalism and its progressive mirror, and the flagship on the state of the American church. The most careful, least tribal treatment on the site, criticizing right and left with the same instrument.",
    build() {
      const dir = path.join(ROOT, "client/public/nation");
      const SPECIAL = new Set(["scorecard.json", "policy.json", "index.json"]);
      let files;
      try {
        files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !SPECIAL.has(f));
      } catch {
        return [];
      }
      const FLAGSHIP = "state-of-the-american-church.json";
      files.sort((a, b) => (a === FLAGSHIP ? -1 : b === FLAGSHIP ? 1 : a.localeCompare(b)));
      return files
        .map((f) => {
          const e = readJson(`client/public/nation/${f}`);
          if (!e || !e.title) return null;
          return entryLine(e.title, `${SITE}/nation/${f.replace(/\.json$/, "")}`, e.subtitle);
        })
        .filter(Boolean);
    },
  },
  { heading: "Read-Online Books", intro: "Full-length books, readable free online.", file: "client/public/books/index.json", key: "books", route: "/read/", desc: ["blurb", "subtitle"] },
  { heading: "The Leadership Library", intro: "A working library for pastors and lay leaders.", file: "client/public/leadership/articles-index.json", key: "articles", route: "/leadership/article/", desc: ["blurb", "subtitle"] },
  { heading: "The Integrated Life", intro: "One undivided life before God: the inner life, the body, the home, work and money.", file: "client/public/life/domains-index.json", key: "domains", route: "/life/", desc: ["blurb", "pillar"] },
  { heading: "How-To Guides", intro: "Practical, honest guides for the ordinary work of following Jesus.", file: "client/public/howtos/index.json", key: "articles", route: "/how-tos/", desc: ["excerpt"] },
  { heading: "Study Guides", intro: "Session-by-session guides for individuals and small groups.", file: "client/public/studyguides/index.json", key: "guides", route: "/studyguides/", desc: ["blurb", "eyebrow"] },
  { heading: "Reading Scripture in Context", intro: "How to read the Bible in its historical and literary world.", file: "client/public/context/guides-index.json", key: "guides", route: "/resources/context/", desc: ["blurb"] },
  { heading: "Church History", intro: "The councils, the creeds, the schisms, and the people who carried the faith.", file: "client/public/history/essays-index.json", key: "essays", route: "/theology/history/", desc: ["blurb", "era"] },
  { heading: "Creeds & Confessions", intro: "The texts the church has confessed in every age, with plain-language notes.", file: "client/public/creeds/documents-index.json", key: "documents", route: "/resources/creeds/", desc: ["blurb"] },
  { heading: "The Table", intro: "Short studies for making disciples around a table.", file: "client/public/table/studies-index.json", key: "studies", route: "/table/", desc: ["summary", "subtitle"] },
];

function pickDesc(item, keys) {
  for (const k of keys || []) if (typeof item[k] === "string" && item[k].trim()) return item[k];
  return item.blurb || item.subtitle || item.summary || "";
}

let out = `# LiveWell by James Bell: Full Content Index

> The complete, machine-readable index of LiveWell by James Bell
> (${SITE}). The short summary lives at ${SITE}/llms.txt; this file lists every
> essay, book, guide, and reference entry with its URL and a one-line summary,
> so answer engines can find and cite the right piece. LiveWell connects the
> depth of theology to the weight of everyday life, written for skeptics,
> doubting Christians, pastors, and people seeking to live well.

`;

let total = 0;
for (const sec of SECTIONS) {
  let lines = [];
  if (sec.build) {
    lines = sec.build();
  } else {
    const data = readJson(sec.file);
    const items = data?.[sec.key];
    if (Array.isArray(items)) {
      lines = items
        .filter((e) => e && e.slug && e.title)
        .map((e) => entryLine(e.title, `${SITE}${sec.route}${e.slug}`, pickDesc(e, sec.desc)));
    }
  }
  if (!lines.length) continue;
  total += lines.length;
  out += `## ${sec.heading}\n\n${sec.intro ? sec.intro + "\n\n" : ""}${lines.join("\n")}\n\n`;
}

out += `## Contact\n\nPastorjbell206@gmail.com\n`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log(`[llms-full] wrote ${OUT} — ${total} entries, ${(out.length / 1024).toFixed(1)} KB`);
