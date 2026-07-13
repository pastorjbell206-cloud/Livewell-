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
// Search-engine ownership verification. Set these in the Vercel build env
// (VITE_ prefix so they travel with the rest of the build config). Each is the
// bare token Search Console / Bing hands you for the "HTML tag" method; when
// empty the meta tag is simply omitted. See docs/SEO-LAUNCH.md.
const GOOGLE_VERIFICATION =
  process.env.VITE_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || "";
const BING_VERIFICATION =
  process.env.VITE_BING_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION || "";
// Branded default card rendered by the dynamic OG Edge function (api/og.tsx).
// There is no static og-default.png in the repo; this endpoint always renders.
const OG_DEFAULT = ogImageUrl("LiveWell by James Bell", "Theology for everyday life");
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
    path: "/membership",
    title: "Membership — LiveWell by James Bell",
    description: "Full access to the essays, member-only writing, curated reading paths, and the deeper room where theology meets the weight of real life.",
    type: "website",
  },
  {
    path: "/justice",
    title: "Prophetic Justice — Where the church went silent",
    description: "Mishpat and tsedaqah — justice and right relationship — sit near the heart of God. The poor at the gate, the worker and the wage, the vulnerable, refusing capture by either political tribe.",
    type: "website",
  },
  {
    path: "/disruption",
    title: "Prophetic Disruption — Truth that does not take a side",
    description: "The church's captivity to its tribe, its nation, and its culture — and the indictment falls on the left and the right alike, the writer included.",
    type: "website",
  },
  {
    path: "/nation",
    title: "Christ and the Nation",
    description: "Was America a Christian nation? How close is each party to the Bible? What a biblical government would actually mean.",
    type: "website",
  },
  {
    path: "/diagnostic",
    title: "Diagnostic — Where are you with God right now?",
    description: "Eight questions across four dimensions. Honest answers. A specific essay, a book, and an email track for what to do next.",
    type: "website",
  },
  // ── Shared-component routes (NationEssay slug=…, Prophetic* config=…,
  // FormationGuides, WholeBibleSermons). Their SEOMeta is computed from props
  // or fetched JSON, so the route-table extraction below cannot read it; the
  // copy here mirrors each page's actual title/subtitle content.
  {
    path: "/leadership/guides",
    title: "Free Church Leadership Training Guides — Elders & Deacons",
    description: "Free, session-by-session training guides for the church: a Servant Leadership Bible study, an Elder Training Manual, a Deacon Training Manual, and more.",
    type: "website",
  },
  {
    path: "/leadership/bible-sermons",
    title: "Sermon Series for Every Book of the Bible — Free Outlines",
    description: "Free, Christ-centered sermon series for all 66 books of the Bible — the big idea, the Christ connection, and a ready-to-preach arc, Genesis to Revelation.",
    type: "website",
  },
  {
    path: "/disruption/posture",
    title: "The Posture — Prophetic Disruption",
    description: "Before any argument about justice, the ground rules first: biblical justice defined from the text up, and the binding command versus prudential policy.",
    type: "website",
  },
  {
    path: "/disruption/consistency",
    title: "The Consistency Check — Prophetic Disruption",
    description: "A searching self-examination of whether you defend truth selectively, one standard for your side and another for your opponents. A mirror, not a weapon.",
    type: "website",
  },
  {
    path: "/disruption/glossary",
    title: "Glossary — Prophetic Disruption",
    description: "The words of biblical justice, from mishpat and tsedaqah to jubilee and Christian nationalism — politically loaded ones included, defined even-handedly.",
    type: "website",
  },
  {
    path: "/disruption/questions",
    title: "Hard Questions — Prophetic Disruption",
    description: "Is the gospel political? Is Christianity left or right? What even is social justice? Honest answers that take the suspicion seriously from every direction.",
    type: "website",
  },
  {
    path: "/disruption/witnesses",
    title: "The Witnesses — Prophetic Disruption",
    description: "The people across history who told the church and the powers costly truth and refused to be captured — hopeful, concrete, and honest about their flaws.",
    type: "website",
  },
  {
    path: "/justice/posture",
    title: "The Call — Prophetic Justice",
    description: "Justice is not the margin of the faith but near its middle: biblical justice defined from the text up, and God's lean toward the poor and the foreigner.",
    type: "website",
  },
  {
    path: "/justice/glossary",
    title: "Glossary — Prophetic Justice",
    description: "The words of biblical justice, from mishpat and tsedaqah to shalom and jubilee — including the politically loaded ones, defined even-handedly, text first.",
    type: "website",
  },
  {
    path: "/justice/witnesses",
    title: "The Witnesses — Prophetic Justice",
    description: "The people who did justice at real cost across history, from the abolitionists to the rescuers of the trafficked — hopeful, and honest about their flaws.",
    type: "website",
  },
  {
    path: "/nation/christian-nation",
    title: "Was America Founded as a Christian Nation?",
    description: "The strongest case for yes, the strongest case for no, the Baptists who built the wall of separation, and the deeper question both sides forget to ask.",
    type: "website",
  },
  {
    path: "/nation/theocracy",
    title: "What an Old Testament Theocracy Actually Was",
    description: "A covenant, not a constitution: a people God ruled directly, the prophets as the check on kings, and why no one can rebuild ancient Israel's arrangement.",
    type: "website",
  },
  {
    path: "/nation/empire",
    title: "The Danger of Empire",
    description: "From Babel to Babylon to Rome, every kingdom that asks you to kneel is asking for something that was never theirs. What empire always wants of the church.",
    type: "website",
  },
  {
    path: "/nation/which-party",
    title: "Which Party Fits the Bible More?",
    description: "A straight answer to a loaded question: where the right sits nearer the Bible, where the left does, why neither party fits, and the test it sets for you.",
    type: "website",
  },
  {
    path: "/nation/render",
    title: "Render to Caesar — What a Christian Owes the State",
    description: "The coin, the image, and dual citizenship: what a Christian owes the state, what a Christian owes God, and the difference that orders a whole life ahead.",
    type: "website",
  },
  {
    path: "/nation/christian-nationalism",
    title: "What Christian Nationalism Actually Is",
    description: "A definition built on the research, the spectrum instead of the cartoon, where sincere belief turns into idolatry, and the same idol across the aisle.",
    type: "website",
  },
  {
    path: "/nation/nationalism-history",
    title: "How We Got Here: A History of Christian Nationalism in America",
    description: "From a Puritan sermon to a modern rallying cry: how the faith kept getting recruited to bless the nation, and what finally tells worship from idolatry.",
    type: "website",
  },
  {
    path: "/nation/power-and-church",
    title: "When Power Takes the Church: What History Keeps Showing Us",
    description: "From Constantine to apartheid, the recurring bargain in which the church trades its independent voice for a place beside power — and the few who refused.",
    type: "website",
  },
  {
    path: "/nation/progressive-captivity",
    title: "The Other Captivity: When the Faith Dissolves Into a Cause",
    description: "The right makes Christianity the conservative platform at prayer. The left makes it the progressive one. By opposite doors, both hand over the same thing.",
    type: "website",
  },
  {
    path: "/nation/compassion-and-coercion",
    title: "When Compassion Hardens Into Coercion",
    description: "A real virtue turns dangerous when it fuses with power to compel — the mirror the left holds up to the right's will to power, taken with equal seriousness.",
    type: "website",
  },
];

// Dynamic per-essay Open Graph card via the /api/og Edge function (api/og.tsx).
// Mirrors client/src/lib/site.ts → ogImageUrl so essays without a coverImage
// still get a unique branded social card instead of a missing static image.
function ogImageUrl(title, pillar) {
  const params = new URLSearchParams({ title });
  if (pillar) params.set("pillar", pillar);
  return `${SITE_URL}/api/og?${params.toString()}`;
}

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

// Strip common Markdown syntax to plain text so the JSON-LD articleBody is
// readable prose for non-JS / AI crawlers. Best-effort; not a full parser.
function markdownToPlainText(md) {
  return String(md ?? "")
    .replace(/```[\s\S]*?```/g, " ")          // fenced code blocks
    .replace(/`([^`]+)`/g, "$1")               // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")     // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")   // links → text
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")         // ATX headings
    .replace(/^\s{0,3}>\s?/gm, "")              // blockquotes
    .replace(/^\s{0,3}[-*+]\s+/gm, "")          // bullet markers
    .replace(/^\s{0,3}\d+\.\s+/gm, "")          // ordered markers
    .replace(/(\*\*|__)(.*?)\1/g, "$2")         // bold
    .replace(/(\*|_)(.*?)\1/g, "$2")            // italic
    .replace(/~~(.*?)~~/g, "$1")                // strikethrough
    .replace(/^\s{0,3}([-*_])\s*(\1\s*){2,}$/gm, " ") // hr
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text) {
  const t = String(text ?? "").trim();
  return t ? t.split(/\s+/).length : 0;
}

// ── Crawlable body content ────────────────────────────────────────────────
// The SPA ships an empty <div id="root">; Google can render the JS, but for a
// new site it does so slowly and shallowly. Injecting the real prose into the
// initial HTML gets every essay indexed at full depth, and gives no-JS and AI
// crawlers the actual text. The client mounts with createRoot (a fresh render,
// not hydration), so React clears #root on mount — the injected content is
// crawler-only and never double-renders for humans.

/** Light, safe Markdown → HTML: headings, paragraphs, blockquotes, emphasis.
 *  Links collapse to their text. Everything is escaped first, so no raw HTML
 *  from content can inject into the page. */
function mdToHtml(md) {
  const src = String(md ?? "").replace(/\r\n/g, "\n").trim();
  if (!src) return "";
  const blocks = src.split(/\n{2,}/);
  const out = [];
  for (let raw of blocks) {
    let b = raw.trim();
    if (!b) continue;
    // strip image syntax before escaping
    b = b.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
    const heading = b.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = Math.min(heading[1].length + 1, 6); // h1 reserved for the title
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    if (/^\s{0,3}>\s?/.test(b)) {
      const quote = b.replace(/^\s{0,3}>\s?/gm, "").trim();
      out.push(`<blockquote>${inline(quote)}</blockquote>`);
      continue;
    }
    if (/^\s{0,3}([-*_])\s*(\1\s*){2,}$/.test(b)) continue; // hr
    out.push(`<p>${inline(b.replace(/\n/g, " "))}</p>`);
  }
  return out.join("\n");
}

/** Inline formatting on already-block-split text: bold/italic kept, links →
 *  text, then HTML-escaped. */
function inline(text) {
  let t = String(text ?? "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")     // links → text
    .replace(/`([^`]+)`/g, "$1");                 // inline code
  t = escapeHtml(t);
  t = t
    .replace(/(\*\*|__)(.+?)\1/g, "<strong>$2</strong>")
    .replace(/(\*|_)(.+?)\1/g, "<em>$2</em>");
  return t;
}

/** Recursively collect prose from an arbitrary content-JSON object, in order.
 *  Handles the varied library shapes (single `body`, `sections[].body`,
 *  `chapters[].body`, etc.) without per-type logic. Returns Markdown-ish text. */
function extractReadableText(obj, acc = [], depth = 0) {
  if (depth > 6 || acc.join(" ").length > 60000) return acc;
  if (typeof obj === "string") {
    const s = obj.trim();
    if (s.length > 40 && /\s/.test(s)) acc.push(s);
    return acc;
  }
  if (Array.isArray(obj)) {
    for (const v of obj) extractReadableText(v, acc, depth + 1);
    return acc;
  }
  if (obj && typeof obj === "object") {
    // Prefer the fields most likely to be prose, in a sensible reading order.
    const ordered = ["heading", "title", "kicker", "subtitle", "summary", "body", "content", "text", "sections", "chapters", "parts"];
    const keys = [...ordered.filter((k) => k in obj), ...Object.keys(obj).filter((k) => !ordered.includes(k))];
    for (const k of keys) {
      if (["slug", "id", "url", "href", "image", "coverImage", "author", "date", "readTime", "group", "topic", "pillar"].includes(k)) continue;
      extractReadableText(obj[k], acc, depth + 1);
    }
  }
  return acc;
}

/** Build the crawlable <article> body block for #root. */
function renderArticleBody({ title, subtitle, contentHtml, sectionLabel }) {
  const parts = [
    `<article itemscope itemtype="https://schema.org/Article">`,
    sectionLabel ? `<p class="pre-eyebrow">${escapeHtml(sectionLabel)}</p>` : "",
    `<h1 itemprop="headline">${escapeHtml(title)}</h1>`,
    subtitle ? `<p class="pre-subtitle">${escapeHtml(subtitle)}</p>` : "",
    `<p class="pre-byline">By <span itemprop="author">${escapeHtml(AUTHOR_NAME)}</span></p>`,
    `<div itemprop="articleBody">`,
    contentHtml,
    `</div>`,
    `</article>`,
  ];
  // A tiny style keeps the crawler-only content readable if JS ever fails to
  // boot, without shifting the real SPA paint (React replaces #root on mount).
  return `<div class="prerender-content" style="max-width:68ch;margin:0 auto;padding:2rem 1.25rem;font-family:Georgia,serif;line-height:1.7">${parts.filter(Boolean).join("\n")}</div>`;
}

/** Turn a content object (or raw markdown) into the injected body HTML. */
function bodyFromContent({ title, subtitle, sectionLabel, markdown, contentObj }) {
  let contentHtml = "";
  if (markdown) {
    contentHtml = mdToHtml(markdown);
  } else if (contentObj) {
    const paras = extractReadableText(contentObj);
    contentHtml = paras.map((p) => mdToHtml(p)).filter(Boolean).join("\n");
  }
  if (!contentHtml) return "";
  return renderArticleBody({ title, subtitle, contentHtml, sectionLabel });
}

function articleSchema(post, url, image) {
  const bodyText = markdownToPlainText(post.body);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    image: image || OG_DEFAULT,
    url,
    inLanguage: "en",
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : new Date(post.createdAt).toISOString(),
    dateModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.createdAt).toISOString(),
    ...(post.pillar ? { articleSection: post.pillar } : {}),
    ...(bodyText ? { articleBody: bodyText, wordCount: countWords(bodyText) } : {}),
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
  // Brand-once, mirroring SEOMeta.tsx.
  const fullTitle =
    title.includes("James Bell") || title.includes("LiveWell") ? title : `${title} | ${SITE_NAME}`;
  const lines = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
  ];
  if (GOOGLE_VERIFICATION) lines.push(`<meta name="google-site-verification" content="${escapeHtml(GOOGLE_VERIFICATION)}" />`);
  if (BING_VERIFICATION) lines.push(`<meta name="msvalidate.01" content="${escapeHtml(BING_VERIFICATION)}" />`);
  lines.push(
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
    `<meta name="twitter:image" content="${escapeHtml(image || OG_DEFAULT)}" />`
  );
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

function writeRoute(template, route, head, bodyHtml = "") {
  const target =
    route.path === ""
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, route.path.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  let html = rewriteIndexHtml(template, head);
  // Inject crawlable article content at the top of #root. The client mounts
  // with createRoot, which replaces #root entirely, so this is crawler-only.
  if (bodyHtml) {
    html = html.replace('<div id="root">', `<div id="root">\n${bodyHtml}`);
  }
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

  // File-driven library pages: read the generated manifests and emit a real
  // head (title, description, per-page OG image) for each, so the leadership
  // articles, context guides, life domains, formation topics, creeds, history
  // essays, and toolkits unfurl and index with their own title and image.
  const LIBRARY_SOURCES = [
    { file: "client/public/leadership/articles-index.json", key: "articles", route: "/leadership/article/", ogPrefix: "leadership-article", contentDir: "client/public/leadership/articles" },
    { file: "client/public/context/guides-index.json", key: "guides", route: "/resources/context/", ogPrefix: "resources-context", contentDir: "client/public/context/guides" },
    { file: "client/public/leadership/formation-index.json", key: "topics", route: "/leadership/formation/", ogPrefix: "leadership-formation", contentDir: "client/public/leadership/formation" },
    { file: "client/public/life/domains-index.json", key: "domains", route: "/life/", ogPrefix: "life", contentDir: "client/public/life/domains" },
    { file: "client/public/creeds/documents-index.json", key: "documents", route: "/resources/creeds/", ogPrefix: "resources-creeds", contentDir: "client/public/creeds/documents" },
    { file: "client/public/history/essays-index.json", key: "essays", route: "/theology/history/", ogPrefix: "theology-history", contentDir: "client/public/history/essays" },
    // The four families the sitemap already lists but the prerender didn't
    // (audit 02 #4): study-guide toolkits, Table studies, the How-To library,
    // and the read-online books.
    { file: "client/public/studyguides/index.json", key: "guides", route: "/studyguides/", ogPrefix: "studyguides", desc: "blurb", contentDir: "client/public/studyguides" },
    { file: "client/public/table/studies-index.json", key: "studies", route: "/table/", ogPrefix: "table", desc: "summary", contentDir: "client/public/table/studies" },
    { file: "client/public/howtos/index.json", key: "articles", route: "/how-tos/", ogPrefix: "howtos", desc: "excerpt", contentDir: "client/public/howtos/a" },
    { file: "client/public/books/index.json", key: "books", route: "/read/", ogPrefix: "read", desc: "blurb", type: "book", contentDir: "client/public/books" },
    // The 50 contested-doctrine pages (/theology/doctrine/:slug) — manifest
    // from scripts/build-theology-index.mjs; subtitle is the description.
    { file: "client/public/theology/index.json", key: "docs", route: "/theology/doctrine/", ogPrefix: "theology-doctrine", desc: "subtitle" },
    // Sermon series for all 66 books of the Bible. The manifest keys the entry
    // by `id`/`name` (not slug/title), so map them; content files are arrays of
    // markdown sermons, so the body injects at full depth.
    { file: "client/public/leadership/whole-bible-sermons.json", key: "books", route: "/leadership/bible-sermons/", ogPrefix: "leadership-bible-sermons", slugField: "id", titleField: "name", contentDir: "client/public/leadership/sermons", descTemplate: "A free, Christ-centered sermon series for the book of {title} — the big idea, the Christ connection, and a ready-to-preach arc, chapter by chapter." },
    // Prophetic Justice / Disruption per-topic pages. Indexes are generated from
    // client/src/lib/prophetic.ts (ready topics only) by build-prophetic-indexes.mjs.
    { file: "client/public/justice/topics-index.json", key: "topics", route: "/justice/topic/", ogPrefix: "justice-topic", contentDir: "client/public/justice/topics" },
    { file: "client/public/disruption/topics-index.json", key: "topics", route: "/disruption/topic/", ogPrefix: "disruption-topic", contentDir: "client/public/disruption/topics" },
  ];
  let withBody = 0;
  for (const src of LIBRARY_SOURCES) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, src.file), "utf8"));
    } catch { continue; }
    for (const e of data[src.key] || []) {
      // Most manifests key by slug/title; a few (e.g. the whole-Bible sermons)
      // key by id/name, so allow a per-source field alias.
      const slug = e.slug || (src.slugField ? e[src.slugField] : undefined);
      const title = e.title || (src.titleField ? e[src.titleField] : undefined);
      if (!slug || !title) continue;
      const url = `${SITE_URL}${src.route}${slug}`;
      const ogRel = `client/public/og/${src.ogPrefix}-${slug}.png`;
      const image = fs.existsSync(path.join(REPO_ROOT, ogRel))
        ? `${SITE_URL}/og/${src.ogPrefix}-${slug}.png`
        : OG_DEFAULT;
      const description = e[src.desc || "blurb"] || e.blurb || e.subtitle
        || (src.descTemplate ? src.descTemplate.replace(/\{title\}/g, title) : title);
      const head = buildHead({ title, description, url, image, type: src.type || "article" });
      // Read the entry's full content file (when present) and inject its prose
      // into #root so the page indexes at full depth, not as an empty shell.
      let bodyHtml = "";
      if (src.contentDir) {
        const cf = path.join(REPO_ROOT, src.contentDir, `${slug}.json`);
        if (fs.existsSync(cf)) {
          try {
            const obj = JSON.parse(fs.readFileSync(cf, "utf8"));
            bodyHtml = bodyFromContent({ title, subtitle: e.subtitle || description, sectionLabel: e.group || e.kicker, contentObj: obj });
            if (bodyHtml) withBody++;
          } catch { /* leave head-only */ }
        }
      }
      writeRoute(template, { path: `${src.route}${slug}` }, head, bodyHtml);
      wrote++;
    }
  }
  console.log(`[prerender] injected crawlable body content into ${withBody} library pages`);

  // Route-table extraction: every static route whose component declares
  // <SEOMeta title="..." description="..." /> as string literals gets a real
  // head built from its own copy — the prerendered head is exactly what the
  // SPA renders client-side. Param routes, admin, thank-you flows, and
  // noindex pages are skipped; curated STATIC_PAGES above win on conflict.
  const written = new Set(STATIC_PAGES.map((p) => p.path));
  const appSrc = fs.readFileSync(path.join(REPO_ROOT, "client/src/App.tsx"), "utf8");
  const importMap = {};
  for (const m of appSrc.matchAll(/const (\w+) = lazy\(\(\) => import\("(\.\/pages\/[^"]+)"\)\)/g)) {
    importMap[m[1]] = m[2];
  }
  for (const m of appSrc.matchAll(/^import (\w+) from "(\.\/pages\/[^"]+)";/gm)) {
    importMap[m[1]] = m[2];
  }
  const routePairs = [];
  for (const m of appSrc.matchAll(/<Route path="([^"]+)" component=\{(\w+)\}/g)) {
    routePairs.push([m[1], m[2]]);
  }
  for (const m of appSrc.matchAll(/<Route path="([^"]+)">\s*<(\w+)[\s/>]/g)) {
    routePairs.push([m[1], m[2]]);
  }
  const uncovered = [];
  let extracted = 0;
  for (const [routePath, comp] of routePairs) {
    if (routePath.includes(":") || routePath.includes("*")) continue;
    if (routePath.startsWith("/admin")) continue;
    if (routePath.includes("thank-you") || routePath.includes("/success")) continue;
    const normalized = routePath === "/" ? "" : routePath;
    if (routePath === "/404" || written.has(normalized)) continue;
    const rel = importMap[comp];
    if (!rel) continue;
    const compPath = path.join(REPO_ROOT, "client/src", rel.replace(/^\.\//, "")) + ".tsx";
    let compSrc;
    try {
      compSrc = fs.readFileSync(compPath, "utf8");
    } catch {
      uncovered.push(`${routePath} (no file)`);
      continue;
    }
    const tagMatch = compSrc.match(/<SEOMeta([\s\S]*?)\/?>(?=[\s<])/);
    if (!tagMatch) {
      uncovered.push(`${routePath} (no SEOMeta)`);
      continue;
    }
    const tag = tagMatch[1];
    if (/\bnoindex\b/.test(tag)) continue;
    // A literal attribute, or a template literal whose ${refs} all resolve to
    // same-file `const NAME = "..."` strings (the ebook-funnel pattern).
    const resolveAttr = (name) => {
      const lit = tag.match(new RegExp(`\\b${name}="([^"{}]+)"`));
      if (lit) return lit[1];
      const wrapped = tag.match(new RegExp(`\\b${name}=\\{"([^"]+)"\\}`));
      if (wrapped) return wrapped[1];
      const tpl = tag.match(new RegExp(`\\b${name}=\\{\`([^\`]+)\`\\}`));
      if (!tpl) return null;
      let out = tpl[1];
      for (const ref of out.matchAll(/\$\{(\w+)\}/g)) {
        const constM = compSrc.match(new RegExp(`const ${ref[1]} = "([^"]+)"`));
        if (!constM) return null;
        out = out.replace(ref[0], constM[1]);
      }
      return out.includes("${") ? null : out;
    };
    const title = resolveAttr("title");
    const description = resolveAttr("description");
    if (!title || !description) {
      uncovered.push(`${routePath} (dynamic meta)`);
      continue;
    }
    const url = `${SITE_URL}${routePath}`;
    const head = buildHead({
      title,
      description,
      url,
      image: ogImageUrl(title),
      type: "website",
    });
    writeRoute(template, { path: routePath }, head);
    written.add(routePath);
    extracted++;
    wrote++;
  }
  console.log(`[prerender] extracted ${extracted} route heads from component SEOMeta literals`);
  if (uncovered.length) {
    console.log(`[prerender] ${uncovered.length} static routes still serve the homepage head (no literal SEOMeta):`);
    for (const u of uncovered) console.log(`  - ${u}`);
  }

  // DB-driven pages
  const conn = await loadDb();
  if (conn) {
    try {
      const [posts] = await conn.query(
        "SELECT slug, title, excerpt, pillar, body, coverImage, publishedAt, updatedAt, createdAt FROM posts WHERE published = true"
      );
      for (const post of posts) {
        const url = `${SITE_URL}/writing/${post.slug}`;
        // Use the essay's own cover when present; otherwise render a per-essay
        // branded card from its title (+ pillar) via the dynamic OG endpoint.
        const image =
          post.coverImage || ogImageUrl(post.title, post.pillar || undefined);
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
        const bodyHtml = bodyFromContent({
          title: post.title,
          subtitle: post.excerpt || "",
          sectionLabel: post.pillar || "",
          markdown: post.body || "",
        });
        writeRoute(template, { path: `/writing/${post.slug}` }, head, bodyHtml);
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
