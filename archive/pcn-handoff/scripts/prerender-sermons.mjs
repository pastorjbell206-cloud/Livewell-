#!/usr/bin/env node
/**
 * prerender-sermons.mjs
 *
 * Runs AFTER `vite build` (and after prerender-heads). For every book in the
 * whole-Bible sermon library, write dist/public/leadership/bible-sermons/<book>/
 * index.html with:
 *   - a keyword-rich, SEO <head> (title, description, canonical, OG, JSON-LD
 *     CreativeWorkSeries listing every sermon), and
 *   - the FULL sermon text injected into #root as crawlable HTML.
 *
 * Why: the SPA loads sermon manuscripts client-side from JSON, so search
 * engines could not read the sermons or their SEO titles/points. This makes the
 * whole library server-visible. React's createRoot replaces #root on mount, so
 * the injected block is crawler-only and never affects the human SPA view.
 *
 * Also emits the /leadership/bible-sermons index page with a linked book list.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist/public");
const SITE = "https://www.livewellbyjamesbell.co";
const SITE_NAME = "LiveWell by James Bell";
const AUTHOR = "James Bell";
const INDEX_JSON = path.join(ROOT, "client/public/leadership/whole-bible-sermons.json");
const SERMON_DIR = path.join(ROOT, "client/public/leadership/sermons");

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const escJson = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

/** Minimal, safe Markdown → HTML for the sermon manuscripts (##, ###, bold,
 *  italics, bullet lists, paragraphs). Escapes first, then applies inline. */
function mdToHtml(md) {
  const inline = (t) =>
    esc(t)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*(?!\*)([^*]+?)\*(?!\*)/g, "$1<em>$2</em>");
  const out = [];
  for (const raw of String(md ?? "").replace(/\r\n/g, "\n").split(/\n{2,}/)) {
    const b = raw.trim();
    if (!b) continue;
    if (/^###\s/.test(b)) { out.push(`<h3>${inline(b.replace(/^###\s+/, ""))}</h3>`); continue; }
    if (/^##\s/.test(b)) { out.push(`<h2>${inline(b.replace(/^##\s+/, ""))}</h2>`); continue; }
    if (/^\s*[-*]\s+/m.test(b) && b.split("\n").every((l) => /^\s*[-*]\s+/.test(l) || !l.trim())) {
      const items = b.split("\n").filter((l) => l.trim()).map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ""))}</li>`);
      out.push(`<ul>${items.join("")}</ul>`); continue;
    }
    if (/^\*[^*].*\*$/.test(b)) { out.push(`<p><em>${inline(b.replace(/^\*|\*$/g, ""))}</em></p>`); continue; }
    out.push(`<p>${inline(b.replace(/\n/g, " "))}</p>`);
  }
  return out.join("\n");
}

const firstTitle = (sermon, fallback) => (sermon.match(/^##\s+(.+)$/m)?.[1] || fallback || "").trim();
const clip = (s, n) => { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s; };

function head({ title, description, url, schemas }) {
  const bits = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(clip(description, 160))}">`,
    `<meta name="author" content="${esc(AUTHOR)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(clip(description, 200))}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(clip(description, 200))}">`,
  ];
  for (const s of schemas || []) bits.push(`<script type="application/ld+json">${escJson(s)}</script>`);
  return bits.join("\n    ");
}

function rewrite(template, headHtml, bodyHtml) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[\s\S]*?>/gi, "")
    .replace(/<meta\s+name="author"[\s\S]*?>/gi, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?>/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[\s\S]*?>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[\s\S]*?>/gi, "")
    .replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, "");
  html = html.replace("</head>", `    ${headHtml}\n  </head>`);
  if (bodyHtml) html = html.replace('<div id="root">', `<div id="root">\n${bodyHtml}`);
  return html;
}

function writeFile(routePath, html) {
  const target = path.join(DIST, routePath.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

function main() {
  const template = fs.existsSync(path.join(DIST, "index.html")) ? fs.readFileSync(path.join(DIST, "index.html"), "utf8") : null;
  if (!template) { console.warn("[prerender-sermons] no dist/index.html; skipping"); return; }
  const data = JSON.parse(fs.readFileSync(INDEX_JSON, "utf8"));
  const wrap = (inner) =>
    `<div class="prerender-content" style="max-width:74ch;margin:0 auto;padding:2rem 1.25rem;font-family:Georgia,serif;line-height:1.7">${inner}</div>`;

  let books = 0, sermons = 0;
  for (const book of data.books) {
    const s = data.series[book.id];
    if (!s) continue;
    const sf = path.join(SERMON_DIR, `${book.id}.json`);
    if (!fs.existsSync(sf)) continue;
    const arr = JSON.parse(fs.readFileSync(sf, "utf8"));
    const url = `${SITE}/leadership/bible-sermons/${book.id}`;
    const title = `${book.name} Sermon Series: ${arr.length} Free Expository Preaching Outlines`;
    const desc = s.bigIdea || `A free expository sermon series through ${book.name}.`;

    const seriesSchema = {
      "@context": "https://schema.org", "@type": "CreativeWorkSeries",
      name: `${book.name} Sermon Series`, description: clip(desc, 300),
      author: { "@type": "Person", name: AUTHOR, url: `${SITE}/about` },
      publisher: { "@type": "Organization", name: SITE_NAME }, url, inLanguage: "en",
      hasPart: arr.map((x, i) => ({ "@type": "Article", position: i + 1, name: firstTitle(x.sermon, `${book.name} sermon ${x.n}`), url: `${url}#sermon-${x.n}` })),
    };
    const breadcrumb = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Leadership", item: `${SITE}/leadership` },
        { "@type": "ListItem", position: 2, name: "Sermon Series", item: `${SITE}/leadership/bible-sermons` },
        { "@type": "ListItem", position: 3, name: book.name, item: url },
      ],
    };

    const body = wrap(
      `<article>` +
      `<h1>${esc(book.name)} Sermon Series: Free Expository Preaching Outlines</h1>` +
      `<p class="pre-byline">By <span>${esc(AUTHOR)}</span> · ${arr.length} sermons</p>` +
      `<p>${esc(s.bigIdea || "")}</p>` +
      (s.christConnection ? `<p><strong>The Christ connection.</strong> ${esc(s.christConnection)}</p>` : "") +
      arr.map((x) => `<section id="sermon-${esc(x.n)}">\n${mdToHtml(x.sermon)}\n</section>`).join("\n") +
      `</article>`
    );

    writeFile(`/leadership/bible-sermons/${book.id}`, rewrite(template, head({ title, description: desc, url, schemas: [seriesSchema, breadcrumb] }), body));
    books++; sermons += arr.length;
  }

  // Index page
  const idxUrl = `${SITE}/leadership/bible-sermons`;
  const idxBody = wrap(
    `<article><h1>Sermon Series for Every Book of the Bible</h1>` +
    `<p>Free expository sermon outlines through all sixty-six books, Genesis to Revelation — the big idea, the line to Christ, and a sermon-by-sermon preaching arc.</p><ul>` +
    data.books.filter((b) => data.series[b.id] && fs.existsSync(path.join(SERMON_DIR, `${b.id}.json`)))
      .map((b) => `<li><a href="/leadership/bible-sermons/${b.id}">${esc(b.name)} sermon series</a></li>`).join("") +
    `</ul></article>`
  );
  const idxSchema = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    name: "Sermon Series for Every Book of the Bible", url: idxUrl,
    description: "Free expository sermon series through all 66 books of the Bible.",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE },
  };
  writeFile(`/leadership/bible-sermons`, rewrite(template, head({ title: "Sermon Series for Every Book of the Bible (Free Expository Outlines)", description: "Free expository sermon outlines through all 66 books of the Bible — big idea, Christ connection, and a preaching arc for each.", url: idxUrl, schemas: [idxSchema] }), idxBody));

  console.log(`[prerender-sermons] wrote ${books} book pages (${sermons} sermons) + 1 index, with crawlable head + body`);
}

main();
