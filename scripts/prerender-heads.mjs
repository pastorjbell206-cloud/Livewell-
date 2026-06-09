#!/usr/bin/env node
/**
 * prerender-heads.mjs
 *
 * After `vite build`, write per-route HTML files into dist/public/<route>/
 * with the SPA shell's head tags rewritten to reflect the actual route.
 *
 * Why this exists: a Vite SPA without SSR ships the same index.html for every
 * route. Social scrapers (X, Facebook, Slack, iMessage), most RSS readers,
 * and a non-trivial slice of Google's discovery surface read the raw head and
 * never execute JS — so every URL unfurls identically.
 *
 * This script only rewrites the head. The body remains the SPA shell, which
 * hydrates and renders the real content client-side. Scrapers get the
 * per-route title, description, canonical, OG, Twitter, and JSON-LD;
 * humans get the same SPA experience as before.
 *
 * Falls back to a static set of nav pages if DATABASE_URL is missing.
 */
import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(REPO_ROOT, "dist/public");
const SITE_URL = "https://www.livewellbyjamesbell.co";
const SITE_NAME = "LiveWell by James Bell";
const AUTHOR_NAME = "James Bell";
const OG_DEFAULT = `${SITE_URL}/og-default.png`;
const FALLBACK_DESC =
  "Theology that carries the weight of everyday life. Essays on faith, justice, marriage, parenting, and pastoral ministry by James Bell.";

const STATIC_PAGES = [
  {
    path: "",
    title: "LiveWell by James Bell — Theology That Carries the Weight of Everyday Life",
    description: FALLBACK_DESC,
    type: "website",
    schemas: [orgSchema(), webSiteSchema()],
  },
  {
    path: "/about",
    title: "About James Bell",
    description: "Lead Pastor of First Baptist Church of Fenton, founder of the Pastors Connection Network, author of twenty-one books. Came to faith from atheism. Raised without a father. Five sons.",
    type: "profile",
    schemas: [personSchema()],
  },
  {
    path: "/writing",
    title: "Writing — Essays by James Bell",
    description: "Essays on faith, justice, marriage, parenting, and pastoral ministry. Read by skeptics, Christians, pastors, and people seeking to live well.",
    type: "website",
  },
  {
    path: "/books",
    title: "Books — by James Bell",
    description: "Books on theology, ministry, marriage, and the Christian life. Twenty-one titles spanning church leadership, prophetic justice, and the integrated life.",
    type: "website",
  },
  {
    path: "/reading-paths",
    title: "Reading Paths — Curated Collections",
    description: "Curated reading paths: burnout and sabbatical, prophetic justice, new pastors, marriage in ministry. Each path is an argument arc, not a topic list.",
    type: "website",
  },
  {
    path: "/marriage",
    title: "Marriage — Essays for Couples",
    description: "Marriage essays for couples in ministry, midlife, and beyond. Honest, theologically grounded, never tip-shaped.",
    type: "website",
  },
  {
    path: "/parenting",
    title: "Parenting — From a Father of Five",
    description: "Essays on parenting from a pastor and father of five sons. Formation over performance, presence over advice.",
    type: "website",
  },
  {
    path: "/tools",
    title: "Tools for Pastors and Readers",
    description: "Practical tools for pastors and serious readers: verse finder, prayer generator, sermon-prep helpers.",
    type: "website",
  },
  {
    path: "/work-with-james",
    title: "Work with James Bell",
    description: "Pulpit supply, pastoral consulting, revitalization, and church-board coaching. Get in touch.",
    type: "website",
  },
  {
    path: "/skeptic-track",
    title: "The Skeptic's Track — Start here",
    description: "Seven essays in argument order. Written for skeptics first by a pastor who came to faith from atheism. No conversion bait.",
    type: "website",
  },
  {
    path: "/pastors-resource-wall",
    title: "Pastor's Resource Wall",
    description: "Sermon prep, citation tools, discussion guides, and the Pastors Connection Network. Tools for the work that does not finish.",
    type: "website",
  },
  {
    path: "/roadmap",
    title: "The Roadmap — 48 books",
    description: "What James Bell has shipped, what's in development, and the planned roadmap of the next ten years.",
    type: "website",
  },
  {
    path: "/library",
    title: "The Library — A commonplace book",
    description: "Curated quotes from Keller, Brueggemann, Peterson, Bonhoeffer, Newbigin, Taylor, Bellah, Haidt.",
    type: "website",
  },
  {
    path: "/diagnostic",
    title: "Diagnostic — Where are you with God right now?",
    description: "Eight questions across four dimensions. Honest answers. A specific essay, a book, and an email track for what to do next.",
    type: "website",
  },
];

function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
    jobTitle: "Lead Pastor, Author, Founder",
    description:
      "Lead Pastor at First Baptist Church of Fenton, author of twenty-one books, and founder of the Pastors Connection Network.",
    sameAs: [
      "https://pastorsconnectionnetwork.com",
      "https://substack.com/@jamesbell333289",
      "https://www.facebook.com/james.bell.609252",
    ],
  };
}

function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Connecting the depth of theology to the weight of everyday life.",
    founder: { "@type": "Person", name: AUTHOR_NAME, url: `${SITE_URL}/about` },
    sameAs: [
      "https://www.facebook.com/james.bell.609252",
      "https://pastorsconnectionnetwork.com",
      "https://substack.com/@jamesbell333289",
    ],
  };
}

function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: FALLBACK_DESC,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/writing?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function articleSchema(post, url, image) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    image: image || OG_DEFAULT,
    url,
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : new Date(post.createdAt).toISOString(),
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.createdAt).toISOString(),
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

function bookSchema(book, url, image) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.description || book.title,
    author: { "@type": "Person", name: book.author || AUTHOR_NAME },
    image: image || OG_DEFAULT,
    url,
  };
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeJson(s) {
  // For inline <script type="application/ld+json"> safety, prevent </script>
  // and HTML comment sequences from breaking out.
  return JSON.stringify(s).replace(/</g, "\\u003c");
}

// Build the head block for one route. Returns string of <meta>/<link>/<script>.
function buildHead({ title, description, url, image, type, publishedDate, modifiedDate, schemas = [] }) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const lines = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(image || OG_DEFAULT)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image || OG_DEFAULT)}" />`,
  ];
  if (publishedDate) lines.push(`<meta property="article:published_time" content="${escapeHtml(publishedDate)}" />`);
  if (modifiedDate) lines.push(`<meta property="article:modified_time" content="${escapeHtml(modifiedDate)}" />`);
  if (type === "article") lines.push(`<meta property="article:author" content="${escapeHtml(AUTHOR_NAME)}" />`);
  for (const s of schemas) {
    lines.push(`<script type="application/ld+json">${escapeJson(s)}</script>`);
  }
  return lines.join("\n    ");
}

// Replace the SPA's head with route-specific tags. Keeps charset, viewport,
// preconnect, font links, favicon, and the boot <script> intact.
function rewriteIndexHtml(template, routeHead) {
  // Strip the existing <title>, og:*, twitter:*, canonical, description,
  // and the legacy Organization JSON-LD. Leave everything else.
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, "");
  html = html.replace(/<meta\s+name="description"[\s\S]*?>/gi, "");
  html = html.replace(/<meta\s+name="author"[\s\S]*?>/gi, "");
  html = html.replace(/<link\s+rel="canonical"[\s\S]*?>/gi, "");
  html = html.replace(/<meta\s+property="og:[^"]+"[\s\S]*?>/gi, "");
  html = html.replace(/<meta\s+name="twitter:[^"]+"[\s\S]*?>/gi, "");
  html = html.replace(/<meta\s+property="article:[^"]+"[\s\S]*?>/gi, "");
  html = html.replace(
    /<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi,
    ""
  );
  // Insert the route-specific head right before </head>
  html = html.replace("</head>", `    ${routeHead}\n  </head>`);
  return html;
}

function writeRoute(template, route, head) {
  const target =
    route.path === ""
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, route.path.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const html = rewriteIndexHtml(template, head);
  fs.writeFileSync(target, html);
  return target;
}

async function loadDb() {
  if (!process.env.DATABASE_URL) return null;
  try {
    return await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: true },
    });
  } catch (err) {
    console.warn(`[prerender] DB unreachable (${err.message}) — static pages only`);
    return null;
  }
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.warn(`[prerender] ${DIST_DIR} does not exist — run vite build first`);
    return;
  }
  const indexPath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.warn(`[prerender] no index.html in dist; skipping`);
    return;
  }

  const template = fs.readFileSync(indexPath, "utf8");
  let wrote = 0;

  // Static pages
  for (const page of STATIC_PAGES) {
    const url = `${SITE_URL}${page.path}`;
    const head = buildHead({
      title: page.title,
      description: page.description,
      url,
      type: page.type,
      schemas: page.schemas || [],
    });
    writeRoute(template, page, head);
    wrote++;
  }

  // DB-driven pages
  const conn = await loadDb();
  if (conn) {
    try {
      const [posts] = await conn.query(
        "SELECT slug, title, excerpt, coverImage, publishedAt, updatedAt, createdAt FROM posts WHERE published = true"
      );
      for (const post of posts) {
        const url = `${SITE_URL}/writing/${post.slug}`;
        const image = post.coverImage || OG_DEFAULT;
        const description = post.excerpt || post.title;
        const publishedIso = post.publishedAt
          ? new Date(post.publishedAt).toISOString()
          : new Date(post.createdAt).toISOString();
        const modifiedIso = post.updatedAt
          ? new Date(post.updatedAt).toISOString()
          : publishedIso;
        const head = buildHead({
          title: post.title,
          description,
          url,
          image,
          type: "article",
          publishedDate: publishedIso,
          modifiedDate: modifiedIso,
          schemas: [articleSchema(post, url, image)],
        });
        writeRoute(template, { path: `/writing/${post.slug}` }, head);
        wrote++;
      }

      const [books] = await conn.query(
        "SELECT slug, title, description, author, coverImage FROM books WHERE published = true AND slug IS NOT NULL"
      );
      for (const book of books) {
        const url = `${SITE_URL}/books/${book.slug}`;
        const image = book.coverImage || OG_DEFAULT;
        const description = book.description || book.title;
        const head = buildHead({
          title: `${book.title} — ${book.author || AUTHOR_NAME}`,
          description,
          url,
          image,
          type: "book",
          schemas: [bookSchema(book, url, image)],
        });
        writeRoute(template, { path: `/books/${book.slug}` }, head);
        wrote++;
      }

      try {
        const [paths] = await conn.query(
          "SELECT slug, title, description FROM reading_paths WHERE published = true"
        );
        for (const p of paths) {
          const url = `${SITE_URL}/reading-paths/${p.slug}`;
          const head = buildHead({
            title: `${p.title} — Reading Path`,
            description: p.description || `Curated reading path: ${p.title}.`,
            url,
            type: "website",
          });
          writeRoute(template, { path: `/reading-paths/${p.slug}` }, head);
          wrote++;
        }
      } catch {
        // table may not exist
      }
    } finally {
      await conn.end();
    }
  }

  console.log(`[prerender] wrote ${wrote} per-route HTML files into ${DIST_DIR}`);
}

main().catch(err => {
  console.error("[prerender] failed:", err.message);
  // Don't fail the deploy — the SPA shell still works
  process.exit(0);
});
