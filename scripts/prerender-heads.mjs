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
import { buildSync } from "esbuild";
import { essayDate, loadEssayShelf, loadTakenDown, RETIRED_SENTENCE, PENDING_SENTENCE } from "./lib/shelf.mjs";
import { loadQuestions } from "./lib/questions.mjs";
import { SUPPORT_HEAD, givingOpen, supportNoindex, writeBuiltLlms } from "./lib/giving.mjs";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(REPO_ROOT, "dist/public");
const SITE_URL = "https://www.livewellbyjamesbell.co";
const SITE_NAME = "LiveWell by James Bell";
// The short ending every search title carries (SEOMeta.tsx has the same).
const TITLE_SUFFIX = "LiveWell";
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
// Search titles that differ from a page's own headline (the question or the
// essay title stays as the H1). The pages read the same file.
const SEARCH_TITLES = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "client/src/lib/searchTitles.json"), "utf8"));
const FALLBACK_DESC =
  "Study the Bible, church history, family devotions, and honest answers to hard questions, by James Bell.";

const STATIC_PAGES = [
  {
    path: "",
    title: "Study the Bible, Church History, Family Devotions | LiveWell",
    // The same description the home page's SEOMeta declares.
    description: positioningString("META_DESCRIPTION") || FALLBACK_DESC,
    type: "website",
    schemas: [orgSchema(), webSiteSchema()],
  },
  {
    path: "/about",
    title: "About James Bell",
    description: "Who James Bell is and why he writes: his story in his own words, the church he pastors, and how to reach him.",
    type: "profile",
    // Its own share card, so a link to About unfurls as About (lazy: ogImageUrl is declared below).
    get image() { return ogImageUrl("About James Bell", "LiveWell"); },
    schemas: [personSchema()],
  },
  {
    path: "/writing",
    title: "Essays by James Bell",
    description: "A short shelf of essays by James Bell on the church after Christendom, the long history of the faith, and reading the Bible in its world.",
    type: "website",
    get image() { return ogImageUrl("Essays by James Bell", "LiveWell"); },
  },
  {
    path: "/books",
    title: "Books by James Bell",
    description: "The books James Bell wrote himself: A Higher Allegiance, Blind Spots, and Believe. Each is a free ebook to download.",
    type: "website",
    get image() { return ogImageUrl("Books by James Bell", "LiveWell"); },
  },
  {
    path: "/connect",
    title: "Find James Bell: Substack, Facebook, Essays, and Contact",
    description: "Everything James Bell does, on one page: LiveWell, ENDS, his Substack, his Facebook, his books, speaking, and contact.",
    type: "website",
    // Its own share card: the address James puts in his Facebook and Substack profiles.
    get image() { return ogImageUrl("Find James Bell", "LiveWell"); },
  },
  {
    path: "/tools",
    title: "Free Bible Study, Prayer, and Family Tools",
    description: "Free tools for Bible study, prayer, marriage, and family life: a verse finder, written prayers, a family devotion builder, and self-checks.",
    type: "website",
  },
  {
    path: "/skeptic-track",
    title: "For Skeptics: Start Here",
    description: "Seven essays in argument order. Written for skeptics first by a pastor who came to faith from atheism. No conversion bait.",
    type: "website",
  },
  {
    path: "/nation",
    title: "The Bible and American Politics",
    description: "Was America founded as a Christian nation? How close is each party to the Bible? What would a biblical government mean? An even-handed look.",
    type: "website",
  },
  {
    path: "/diagnostic",
    title: "Where Are You With God? A Short Self-Check",
    description: "Eight questions in four areas, for reflection, not a test: how you treat people, handle doubt, work and rest, and pray. Your answers stay on your device.",
    type: "website",
  },
  // ── Shared-component routes (NationEssay slug=…, Prophetic* config=…,
  // FormationGuides, WholeBibleSermons). Their SEOMeta is computed from props
  // or fetched JSON, so the route-table extraction below cannot read it; the
  // copy here mirrors each page's actual title/subtitle content.
  {
    path: "/disruption/consistency",
    title: "Do You Hold Your Own Side to the Same Standard?",
    description: "A self-check on whether you defend truth selectively, with one standard for your side and another for your opponents. A mirror, not a weapon.",
    type: "website",
  },
  {
    path: "/justice/witnesses",
    title: "Christians Who Fought Injustice, and What It Cost",
    description: "The people who did justice at real cost, across the church's history. Hopeful, concrete, and honest about their flaws.",
    type: "website",
  },
  {
    path: "/disruption/witnesses",
    title: "Christians Who Told the Church the Truth",
    description: "The people who told the church a costly truth, across its history. Hopeful, concrete, and honest about their flaws.",
    type: "website",
  },
  {
    path: "/nation/state-of-the-american-church",
    title: "The State of the American Church",
    description: "Captive, and not finished. The two captivities, right and left, that keep trading a crucified God for what can be weaponized, and the older faith beneath both.",
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

/** The slugs on the /books shelf (client/src/lib/bookShelf.ts). */
const SHELF_BOOK_SLUGS = new Set(["a-higher-allegiance", "blind-spots", "believe"]);

function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
    jobTitle: "Pastor and writer",
    description:
      "James Bell pastors First Baptist Church of Fenton, Michigan, and writes. He came to faith from atheism, was raised without a father, and has five sons.",
    sameAs: [
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

/** Some essay bodies are stored as simple HTML (the post-Christian series;
 *  the client converts them with client/src/lib/htmlToMarkdown.ts). Treated
 *  as Markdown they would be escaped into one paragraph of visible tags, so
 *  they pass through here instead, reduced to an allow-list of prose tags
 *  with no attributes except a safe href. */
const HTML_BODY_HINT = /<\/?(p|h[1-6]|em|strong|blockquote|ul|ol|li|br|a)\b[^>]*>/i;
function isHtmlBody(s) {
  return HTML_BODY_HINT.test(String(s ?? ""));
}
function safeProseHtml(html) {
  const ALLOWED = new Set(["p", "h2", "h3", "h4", "em", "strong", "b", "i", "blockquote", "ul", "ol", "li", "a", "br", "hr"]);
  return String(html)
    .replace(/<(script|style|iframe|object|embed)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<(\/?)([a-z0-9]+)\b([^>]*)>/gi, (m, close, tag, attrs) => {
      const t = tag.toLowerCase();
      const level = t === "h1" ? "h2" : t; // h1 is reserved for the title
      if (!ALLOWED.has(level)) return "";
      if (level === "a" && !close) {
        const href = (attrs.match(/href="([^"]*)"/i) || [])[1] || "";
        return /^(https?:|\/|#|mailto:)/i.test(href) ? `<a href="${href}">` : "<a>";
      }
      return `<${close}${level}>`;
    });
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
  // writeRoute wraps this in .prerender-content (styled in index.css).
  return parts.filter(Boolean).join("\n");
}

/** Turn a content object (or raw markdown) into the injected body HTML. */
function bodyFromContent({ title, subtitle, sectionLabel, markdown, contentObj }) {
  let contentHtml = "";
  if (markdown) {
    contentHtml = isHtmlBody(markdown) ? safeProseHtml(markdown) : mdToHtml(markdown);
  } else if (contentObj) {
    const paras = extractReadableText(contentObj);
    contentHtml = paras.map((p) => mdToHtml(p)).filter(Boolean).join("\n");
  }
  if (!contentHtml) return "";
  return renderArticleBody({ title, subtitle, contentHtml, sectionLabel });
}

function articleSchema(post, url, image) {
  const bodyText = markdownToPlainText(isHtmlBody(post.body) ? String(post.body).replace(/<[^>]+>/g, " ") : post.body);
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

// BreadcrumbList so a search result shows the trail (Home › Section › Title)
// and the page's place in the site. crumbs: [{ name, path }] — path is relative
// to SITE_URL (empty string = the home page).
function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

// Route prefix → the section hub the item sits under (all verified real routes).
// The middle crumb of each library page's breadcrumb. Absent → a 2-level trail.
const SECTION_BY_ROUTE = {
  "/resources/context/": { name: "Context Guides", path: "/resources/context" },
  "/resources/context/world/": { name: "Bible background", path: "/resources/context" },
  "/life/": { name: "The Integrated Life", path: "/life" },
  "/resources/creeds/": { name: "Creeds & Confessions", path: "/resources/creeds" },
  "/theology/history/": { name: "Church History", path: "/theology/history" },
  "/studyguides/": { name: "Study Guides", path: "/studyguides" },
  "/how-tos/": { name: "How-To Library", path: "/how-tos" },
  "/plans/": { name: "Care Plans", path: "/plans" },
  "/tracks/": { name: "Tracks", path: "/tracks" },
  "/theology/doctrine/": { name: "Theology", path: "/theology" },
  "/justice/topic/": { name: "Prophetic Justice", path: "/justice" },
  "/disruption/topic/": { name: "Prophetic Disruption", path: "/disruption" },
  "/wisdom/": { name: "Wisdom", path: "/wisdom" },
  "/help/": { name: "Find Help", path: "/help" },
  "/family/devotions/": { name: "Family Devotions", path: "/family/devotions" },
  "/topics/": { name: "Topics", path: "/topics" },
  "/answers/": { name: "Honest Answers", path: "/answers" },
};

// ---------------------------------------------------------------------------
// Hub index pages shipped ~5.3KB of shell with no content: the essays are on
// their own prerendered pages (each carries its full body), but the hub itself
// listed nothing a crawler could follow or read. This injects a real, linked
// listing so each hub has substance and passes link equity to its children.
// Capped per hub: the sitemap carries the complete set, so a hub needs a
// representative body, not every row.
const HUB_LISTINGS = {
  // The public essay shelf only (client/src/lib/shelf.json), in shelf order.
  "/writing": { label: "Essays", cap: 150, load: () => {
    const shelf = loadEssayShelf(REPO_ROOT);
    return shelf.liveEssays().map((e) => {
      const rewrite = shelf.overrideRecords.get(e.slug);
      return { title: rewrite?.title || e.title, href: `/writing/${e.slug}`, blurb: rewrite ? rewrite.excerpt : e.blurb || "" };
    });
  } },
  "/books": { label: "Books", cap: 10, load: () => [
    { title: "A Higher Allegiance", href: "/books/a-higher-allegiance", blurb: "A pastor's critique of political idolatry in the American church." },
    { title: "Blind Spots", href: "/books/blind-spots", blurb: "Why every generation gets the Bible wrong, and what to do about ours." },
    { title: "Believe", href: "/books/believe", blurb: "Rational answers to the hardest questions skeptics ask, from a former atheist." },
  ] },
  // The five roads on /start, each step by step, the two readers' pages, then where the road for someone new goes on.
  "/start": { label: "Start where you are", cap: 42, load: () => {
    const d = readJsonSafe("client/src/lib/startRoad.json") || {};
    return [
      ...(d.roads || []).flatMap((r) => [
        ...(r.track ? [{ title: `${r.chip}: the track, in ${r.track.sessions} sessions`, href: `/tracks/${r.track.slug}`, blurb: "Short sessions in order, about ten minutes each, with your place kept." }] : []),
        ...(r.steps || []).map((x) => ({ title: `${r.chip}: ${x.title}`, href: x.href, blurb: x.line })),
      ]),
      ...(d.pages || []).map((p) => ({ title: `${p.chip}: ${p.link}`, href: p.href, blurb: p.note })),
      ...(d.next || []).map((x) => ({ title: x.link, href: x.href, blurb: x.lead })),
    ];
  } },
  // Every track on /tracks, each of its sessions, its leader's guide when it has one, and the whole track to print, from the tracks index (scripts/build-tracks-index.mjs).
  "/tracks": { label: "Tracks", cap: 120, load: () => {
    const d = readJsonSafe("client/public/tracks/index.json") || {};
    return (d.tracks || []).flatMap((t) => [
      { title: t.title, href: `/tracks/${t.slug}`, blurb: t.subtitle },
      ...t.sessions.map((x) => ({ title: `Session ${x.n}: ${x.title}`, href: `/tracks/${t.slug}/${x.n}`, blurb: `About ${x.minutes} minutes. Opens: ${x.opens}.` })),
      ...(t.leader ? [{ title: `Leader's guide: ${t.title}`, href: `/tracks/${t.slug}/leader`, blurb: "How to run a small group through the track, and each session's group guide in order." }] : []),
      { title: `${t.title}: the whole track, to print`, href: `/tracks/${t.slug}/print`, blurb: "Every session on one page, a session to a sheet." },
    ]);
  } },
  // Every reading plan on /study/plans, opening the plan itself.
  "/study/plans": { label: "Bible reading plans", cap: 20, load: () => {
    const d = readJsonSafe("client/src/data/bible-reading-plans.json") || {};
    const fam = readJsonSafe("client/public/family-reading-plans.json") || [];
    return [
      { title: "The Bible in a year, 2027", href: "/study/bible/guides/whole-story-2027", blurb: "365 days, every chapter in the order the story happened." },
      ...(d.plans || []).map((p) => ({ title: p.title, href: `/downloads/reading-plans/${p.id}-letter.pdf`, blurb: `${p.days} days. A chart to print.` })),
      { title: "Proverbs in 31 Days", href: "/tools/proverbs-31", blurb: "31 days, a chapter a day." },
      { title: "The Bible's story", href: "/study/bible/story", blurb: "The whole Bible as one story in eleven parts, at your own pace." },
      ...(Array.isArray(fam) ? fam : []).map((p) => ({ title: p.title, href: "/family/reading-plans", blurb: `${p.days.length} days. For the family: ${String(p.audience).toLowerCase()}.` })),
    ];
  } },
  // Every question on /topics, opening the page it opens today.
  "/topics": { label: "Topics", cap: 40, load: () => {
    const d = readJsonSafe("client/public/topics/index.json");
    const shelf = loadEssayShelf(REPO_ROOT);
    // A row to an essay not public yet opens its stand-in, as the page does (lib/topics rowTarget).
    const opens = (r) => {
      const essay = /^\/writing\/([^/?#]+)$/.exec(String(r.href));
      return r.standIn && essay && !shelf.isPublic(decodeURIComponent(essay[1])) ? r.standIn : r.href;
    };
    return ((d && d.rows) || []).map((r) => ({ title: r.askedAs, href: opens(r), blurb: r.line || "" }));
  } },
  // Every door, room and page of the site catalogue, in its words (/explore).
  "/explore": { label: "Everything on LiveWell", cap: 200, load: () => catalogEntries().filter((e) => e.href.startsWith("/")) },
  "/studyguides": { label: "Study guides", cap: 80, load: () => {
    const d = readJsonSafe("client/public/studyguides/index.json");
    return ((d && d.guides) || []).map((g) => ({ title: g.title, href: `/studyguides/${g.slug}`, blurb: g.blurb || "" }));
  } },
  // The Downloads shelf renders from the catalogue at runtime; give crawlers
  // the same list as plain links (built by build-catalogue.mjs before this
  // script runs). (/explore, the old Library, now 301s to /writing.)
  "/downloads": { label: "Downloads", cap: 200, load: () => {
    const c = readJsonSafe("client/public/catalogue/index.json");
    return ((c && c.items) || []).filter((i) => i.files && i.files.length)
      .map((i) => ({ title: i.title, href: i.files[0].href, blurb: i.summary || "" }));
  } },
  // Read the whole story in 2027 (scripts/build-story-plan.mjs): each day
  // with its date and chapters, linked to the day's first chapter.
  // The family hub and tonight's forwarding page: the family pages of the
  // menu, then every devotion by name.
  "/family": { label: "For families", cap: 160, load: () => [...familyNavLinks(), ...familyDevotionLinks()] },
  "/family/tonight": { label: "For families", cap: 160, load: () => [...familyNavLinks(), ...familyDevotionLinks()] },
  "/family/devotions": { label: "Family devotions", cap: 160, load: () => familyDevotionLinks() },
  "/study/bible/guides/whole-story-2027": { label: "The days", cap: 365, load: () => {
    const p = readJsonSafe("client/public/bible/guides/whole-story-2027.json");
    return ((p && p.days) || []).map((d, i) => {
      const when = new Date(2027, 0, i + 1).toLocaleDateString("en-US", { month: "long", day: "numeric" });
      return { title: `Day ${i + 1}, ${when}: ${d.label}`, href: `/study/bible/${d.read[0][0]}/${d.read[0][1]}`, blurb: "" };
    });
  } },
};

// ---------------------------------------------------------------------------
// Full text for the pages that answer, teach and serve a family. Until
// 2026-11 the answers page, the family pages, the 208 "What the Bible Says"
// topics and the 31 doctrine pages shipped a head and an empty body, so a
// link preview, an archive, or an AI assistant that does not run scripts
// found no words on them (docs/work/audit-2026-11/technical.md, T5). Every
// line below is read from the data the page itself renders, under the
// headings the page itself uses. Nothing is written here.
const paras = (text) =>
  String(text ?? "").split(/\n{2,}/).map((x) => x.trim()).filter(Boolean).map((x) => `<p>${inline(x)}</p>`).join("\n");
const sec = (heading, body) => (body ? `<section><h2>${escapeHtml(heading)}</h2>\n${body}</section>` : "");
const article = (parts) => `<article>\n${parts.filter(Boolean).join("\n")}\n</article>`;

/** An argued answer's parts and sources (answers.ts `sections`, `sources`), as plain HTML. */
function argued(a) {
  const parts = (a.sections ?? []).map((sec) => {
    const body = sec.body
      .map((b) =>
        typeof b === "string"
          ? `<p>${escapeHtml(b)}</p>`
          : `<figure><figcaption>${escapeHtml(b.kind)}</figcaption><ol>${b.premises.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ol><p>So: ${escapeHtml(b.conclusion)}</p></figure>`,
      )
      .join("\n");
    return `<h2>${escapeHtml(sec.heading)}</h2>\n${body}`;
  });
  const sources = a.sources ?? [];
  if (sources.length) {
    const li = (x) =>
      `<li>${escapeHtml(x.author)}, ${x.in ? `&ldquo;${escapeHtml(x.title)},&rdquo; <cite>${escapeHtml(x.in)}</cite>` : `<cite>${escapeHtml(x.title)}</cite>`} (${escapeHtml(x.year)}).${x.note ? ` ${escapeHtml(x.note)}` : ""}</li>`;
    parts.push(`<h2>Sources and further reading</h2>\n<ul>${sources.map(li).join("")}</ul>`);
  }
  return parts.join("\n");
}

/** client/src/data/answers.ts is TypeScript; bundle it once to read it. */
let answersCache;
async function loadAnswers() {
  if (answersCache) return answersCache;
  try {
    const out = buildSync({ entryPoints: [path.join(REPO_ROOT, "client/src/data/answers.ts")], bundle: true, format: "esm", write: false, logLevel: "silent" });
    const mod = await import(`data:text/javascript;base64,${Buffer.from(out.outputFiles[0].text).toString("base64")}`);
    answersCache = Array.isArray(mod.ANSWERS) ? mod.ANSWERS : [];
  } catch {
    answersCache = [];
  }
  return answersCache;
}

/** A TypeScript data module bundled once and read (answers, argument cases, question groups). */
const tsCache = new Map();
async function loadTs(rel) {
  if (tsCache.has(rel)) return tsCache.get(rel);
  let mod = {};
  try {
    const out = buildSync({ entryPoints: [path.join(REPO_ROOT, rel)], bundle: true, format: "esm", write: false, logLevel: "silent" });
    mod = await import(`data:text/javascript;base64,${Buffer.from(out.outputFiles[0].text).toString("base64")}`);
  } catch { /* leave empty */ }
  tsCache.set(rel, mod);
  return mod;
}

/** The church's ages, the course and the longer essays, as the history door lists them. */
function historyDoorBody(title) {
  const t = readJsonSafe("client/public/theology/church-history-timeline.json");
  const idx = readJsonSafe("client/public/history/essays-index.json");
  const eras = (t && t.eras) || [];
  const essays = (idx && idx.essays) || [];
  if (!eras.length || !essays.length) return null;
  const course = essays.filter((e) => typeof e.course === "number").sort((a, b) => a.course - b.course);
  const deeper = essays.filter((e) => typeof e.course !== "number");
  const link = (e, label) => `<li><a href="/theology/history/${escapeHtml(e.slug)}">${escapeHtml(label)}</a> ${escapeHtml(e.dateRange || "")}</li>`;
  const ages = eras.map((era) => {
    const lessons = course.filter((e) => e.era === era.name).map((e) => link(e, `Lesson ${e.course}: ${e.title}`)).join("\n");
    return `<li><h3>${escapeHtml(era.name)}</h3><p>${escapeHtml(era.range)}</p>${lessons ? `<ul>\n${lessons}\n</ul>` : ""}</li>`;
  }).join("\n");
  return {
    html: article([
      `<p class="pre-eyebrow">History</p>`,
      `<h1>Church history</h1>`,
      `<p class="pre-subtitle">Two thousand years, from the apostles to today.</p>`,
      sec("The timeline", `<ol aria-label="The seven ages of the church">\n${ages}\n</ol>`),
      sec("The course", `<ol>\n${course.map((e) => link(e, e.title)).join("\n")}\n</ol>`),
      sec("Go deeper", `<ul>\n${deeper.map((e) => link(e, e.title)).join("\n")}\n</ul>`),
      sec("Ways in", [
        `<ul>`,
        `<li><a href="/theology/history/people">People of church history</a></li>`,
        `<li><a href="/resources/creeds">Creeds and confessions</a></li>`,
        `<li><a href="/theology/traditions">Christian traditions</a></li>`,
        `<li><a href="/theology/history#councils">The councils</a></li>`,
        `<li><a href="/theology/history#heresies">The heresies</a></li>`,
        `</ul>`,
      ].join("\n")),
    ]),
  };
}

/** The family pages of the site catalogue (client/src/lib/siteCatalog.ts), in its words. */
function familyNavLinks() {
  return catalogEntries().filter((e) => e.href.startsWith("/family"));
}

/** Every entry of the site catalogue, read as text: one line each, id, name, line, href. */
function catalogEntries() {
  const src = fs.readFileSync(path.join(REPO_ROOT, "client/src/lib/siteCatalog.ts"), "utf8");
  return [...src.matchAll(/name: "([^"]+)", line: "([^"]*)", href: "([^"]+)"/g)].map((m) => ({ title: m[1], href: m[3], blurb: m[2] }));
}

/** Weekly devotions and the daily sets, by the id the family index gives them. */
let devotionCache;
function devotionById(id) {
  if (!devotionCache) {
    devotionCache = new Map();
    const index = readJsonSafe("client/public/family/index.json");
    const files = new Set((index?.devotions ?? []).map((d) => d.file).filter(Boolean));
    for (const file of files) {
      const data = readJsonSafe(`client/public${file}`);
      if (!data) continue;
      const weekly = Array.isArray(data) ? data : Array.isArray(data.devotions) ? data.devotions : null;
      if (weekly) for (const d of weekly) if (d?.id) devotionCache.set(d.id, d);
    }
    const seasonal = readJsonSafe("client/public/family-seasonal.json") ?? {};
    for (const d of index?.devotions ?? []) {
      if (d.kind !== "seasonal") continue;
      const key = Object.keys(seasonal).find((k) => k.toLowerCase() === String(d.set).replace(/-/g, "").toLowerCase());
      const day = key && (seasonal[key] ?? []).find((x) => x.day === d.day);
      if (day) devotionCache.set(d.id, day);
    }
  }
  return devotionCache.get(id) ?? null;
}

/** A family devotion under the page's own headings: Read, Talk, Do, Pray. */
function devotionBody(row) {
  const d = devotionById(row.id);
  if (!d) return "";
  const questions = Array.isArray(d.questions)
    ? d.questions
    : d.questions && typeof d.questions === "object"
      ? Object.values(d.questions).flat()
      : d.question ? [d.question] : [];
  return article([
    `<p class="pre-eyebrow">${escapeHtml(row.theme || row.label || "Family devotion")}</p>`,
    `<h1>${escapeHtml(row.title)}</h1>`,
    d.bigIdea ? `<p class="pre-subtitle">${escapeHtml(d.bigIdea)}</p>` : "",
    sec("Read", [d.passage ? `<p><strong>${escapeHtml(d.passage)}</strong></p>` : "", d.passageText ? `<blockquote>${escapeHtml(d.passageText)}</blockquote>` : ""].join("\n")),
    sec("Talk", [paras(d.reflection), questions.length ? `<ul>${questions.filter((q) => typeof q === "string").map((q) => `<li>${escapeHtml(q)}</li>`).join("\n")}</ul>` : ""].join("\n")),
    d.activity ? sec("Do", paras(d.activity)) : "",
    d.prayer ? sec("Pray", paras(d.prayer)) : "",
  ]);
}

/** A "What the Bible Says" topic: the framing, the verses, and the three lenses. */
function wisdomBody(t) {
  const verses = (t.verses ?? []).filter((v) => v?.text)
    .map((v) => `<blockquote>${escapeHtml(v.text)} <strong>${escapeHtml(v.ref ?? "")}</strong></blockquote>`).join("\n");
  return article([
    `<p class="pre-eyebrow">What the Bible Says</p>`,
    `<h1>${escapeHtml(t.label)}</h1>`,
    t.framing ? `<p class="pre-subtitle">${escapeHtml(t.framing)}</p>` : "",
    sec("What Scripture says", verses),
    sec("The world it was written in", paras(t.cultural)),
    sec("How the church has understood it", paras(t.historical)),
    ...wisdomDeep(t.id, t.application),
  ]);
}

/** A topic written in full (client/public/wisdom/entry/<id>.json, deep): the whole Bible's wisdom, the often-misread verses, the prayer. */
function wisdomDeep(id, application) {
  const d = readJsonSafe(`client/public/wisdom/entry/${id}.json`)?.deep;
  if (!d) return [sec("Living it now", paras(application))];
  return [
    sec("What the whole Bible says", (d.whole ?? []).map((p) => paras(p)).join("\n")),
    sec("Often misread", (d.misread ?? []).map((m) => `<blockquote>${escapeHtml(m.text)} <strong>${escapeHtml(m.ref)}</strong></blockquote>\n${paras(m.says)}`).join("\n")),
    sec("Pray", `<blockquote>${escapeHtml(d.prayer?.text ?? "")} <strong>${escapeHtml(d.prayer?.ref ?? "")}</strong></blockquote>`),
  ];
}

/** A debated doctrine, step by step, as the page lays it out. */
function doctrineBody(e) {
  const d = readJsonSafe(`client/public/theology/${e.slug}.json`);
  if (!d) return "";
  const loose = (obj, skip = []) => {
    const copy = { ...obj };
    for (const k of skip) delete copy[k];
    return extractReadableText(copy).map((x) => mdToHtml(x)).filter(Boolean).join("\n");
  };
  const positions = (d.positions ?? []).map((pos) =>
    `<h3>${escapeHtml(pos.name ?? "")}</h3>\n${pos.inOneLine ? `<p><em>${escapeHtml(pos.inOneLine)}</em></p>` : ""}\n${loose(pos, ["name", "inOneLine"])}`
  ).join("\n");
  const evidence = (d.biblicalEvidence ?? []).map((b) =>
    `<h3>${escapeHtml(b.passage ?? "")}</h3>\n${loose(b, ["passage"])}`
  ).join("\n");
  return article([
    `<h1>${escapeHtml(d.title ?? e.title)}</h1>`,
    d.subtitle ? `<p class="pre-subtitle">${escapeHtml(d.subtitle)}</p>` : "",
    d.triageNote ? paras(d.triageNote) : "",
    sec("The question", paras(d.question)),
    sec("Why it matters", paras(d.whyItMatters)),
    sec("The positions", positions),
    sec("The biblical evidence", evidence),
    sec("Weighing it", paras(d.weighing)),
    sec("Charitable disagreement", paras(d.charitableDisagreement)),
  ]);
}

/** A world portrait (/resources/context/world/:id): the intro, every part with the passages it opens, and the sources, as the page shows them. */
function worldBody(e) {
  const d = readJsonSafe(`client/public/context/worlds/${e.id}.json`);
  if (!d) return "";
  const p = (x) => `<p>${escapeHtml(x)}</p>`;
  const parts = (d.parts ?? []).map((part, i) => {
    const read = (part.read ?? []).map((r) =>
      `<li><blockquote><p>${escapeHtml(r.text)}</p><p><a href="${escapeHtml(r.href)}">${escapeHtml(r.ref)}</a></p></blockquote>${p(r.note)}</li>`
    ).join("\n");
    return `<section id="${escapeHtml(part.id)}"><p class="pre-eyebrow">Part ${i + 1} of ${d.parts.length}</p><h2>${escapeHtml(part.title)}</h2>\n${p(part.line)}\n${(part.body ?? []).map(p).join("\n")}${read ? `\n<h3>How it changes what you read</h3>\n<ul>${read}</ul>` : ""}</section>`;
  });
  const books = (d.sources?.modern ?? []).map((b) => `<li>${escapeHtml(`${b.author}, ${b.title}${b.in && b.in !== "an essay" ? `, ${b.in}` : ""} (${b.year}).`)}</li>`).join("");
  const ancient = (d.sources?.ancient ?? []).map((a) => `<li>${escapeHtml(a.name)}${a.note ? `. ${escapeHtml(a.note)}` : ""}</li>`).join("");
  return article([
    `<p class="pre-eyebrow">Bible background</p>`,
    `<h1>${escapeHtml(d.title ?? e.title)}</h1>`,
    d.line ? `<p class="pre-subtitle">${escapeHtml(d.line)}</p>` : "",
    (d.intro ?? []).map(p).join("\n"),
    ...parts,
    sec("Sources and further reading", `<h3>Ancient sources</h3><ul>${ancient}</ul><h3>Modern books</h3><ul>${books}</ul>`),
  ]);
}

const PAGE_BODIES = {
  // The Downloads page: its top and its first shelf of books, covers and all,
  // so the first cover (the page's largest paint on a phone) is drawn from the
  // HTML instead of after the app starts; then every download as a plain link,
  // as before. Each cover keeps its 400 by 600 box (the same file and width as
  // the real shelf), so nothing moves when it arrives; the head preloads the
  // first one (headExtra) and the others load lazily.
  "/downloads": async () => {
    const { SHELF_GROUPS = [], SHELF_ITEMS = [], formatLine } = await loadTs("client/src/lib/shelfItems.ts");
    const group = SHELF_GROUPS[0];
    const books = SHELF_ITEMS.filter((b) => group && b.group === group.id);
    if (!books.length || typeof formatLine !== "function") return null;
    const card = (b, i) => {
      const img = `<img class="pre-cover" src="${escapeHtml(b.cover.src)}" alt="${escapeHtml(b.cover.alt)}" width="${b.cover.width}" height="${b.cover.height}"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
      const cover = b.page ? `<a href="${escapeHtml(b.page)}" tabindex="-1" aria-hidden="true">${img}</a>` : img;
      const title = b.page ? `<a href="${escapeHtml(b.page)}">${escapeHtml(b.title)}</a>` : escapeHtml(b.title);
      const file = (href, kind) => `<a href="${escapeHtml(href)}" aria-label="${escapeHtml(`Download ${b.title}, as ${kind === "PDF" ? "a PDF" : "an EPUB"}`)}">${kind}</a>`;
      const files = [file(b.pdf, "PDF"), b.epub ? file(b.epub, "EPUB") : ""].filter(Boolean).join(" · ");
      return `<li>${cover}<h4>${title}</h4><p class="pre-book-sub">${escapeHtml(b.subtitle)}</p><p class="pre-book-meta">${escapeHtml(formatLine(b))}</p><p class="pre-book-meta">${files}</p></li>`;
    };
    const html = [
      `<h1>Downloads</h1>`,
      `<p class="pre-subtitle">Every printable, in one place</p>`,
      `<h2>${givingOpen() ? "Books and booklets" : "Free ebooks"}</h2>`,
      `<h3 class="pre-eyebrow">${escapeHtml(group.label)}</h3>`,
      `<p>${escapeHtml(group.line)}</p>`,
      `<ul class="pre-shelf">\n${books.map(card).join("\n")}\n</ul>`,
      hubListingHtml("/downloads"),
    ].join("\n");
    return { html, headExtra: `<link rel="preload" as="image" href="${escapeHtml(books[0].cover.src)}" fetchpriority="high">` };
  },
  // The index of the Honest Answers: every question, grouped as the page
  // groups them, each linking to its own page. Each row carries the answer's
  // slug as its id, so an old /answers#<slug> link still lands on it with
  // scripts off.
  "/answers": async (title) => {
    const answers = await loadAnswers();
    if (!answers.length) return null;
    const { QUESTION_GROUPS = [] } = await loadTs("client/src/data/questionGroups.ts");
    const bySlug = new Map(answers.map((a) => [a.slug, a]));
    const row = (a) => `<li id="${escapeHtml(a.slug)}"><a href="/answers/${escapeHtml(a.slug)}">${escapeHtml(a.question)}</a></li>`;
    const listed = new Set();
    const groups = QUESTION_GROUPS.map((g) => {
      const items = g.answers.map((s) => bySlug.get(s)).filter(Boolean);
      items.forEach((a) => listed.add(a.slug));
      return items.length ? sec(g.name, `<ul>\n${items.map(row).join("\n")}\n</ul>`) : "";
    });
    const rest = answers.filter((a) => !listed.has(a.slug));
    return {
      html: article([
        `<h1>Honest answers to hard questions</h1>`,
        ...groups,
        rest.length ? sec("More questions", `<ul>\n${rest.map(row).join("\n")}\n</ul>`) : "",
      ]),
    };
  },
  // How to study the Bible: the seven steps, word for word from the one
  // source the page and the guided study read (client/src/lib/study-method.ts).
  "/study/how-to-study": async () => {
    const { STUDY_STEPS = [], KEPT_HERE = "" } = await loadTs("client/src/lib/study-method.ts");
    if (!STUDY_STEPS.length) return null;
    return {
      html: article([
        `<p class="pre-eyebrow"><a href="/study">Bible</a></p>`,
        `<h1>How to study the Bible</h1>`,
        `<p class="pre-subtitle">Seven steps that work on any chapter. Learn them here, then try them on a real one.</p>`,
        sec("Seven steps, in order", `<ol>\n${STUDY_STEPS.map((s) => `<li><strong>${escapeHtml(s.title)}.</strong> ${escapeHtml(s.what)}</li>`).join("\n")}\n</ol>\n<p>${escapeHtml(KEPT_HERE)}</p>`),
        `<p><a href="/study/bible/john/3?study=walk">Try it on John 3</a></p>`,
      ]),
    };
  },
  // Paul's travels: every trip's places in order with what happened there and
  // its Acts reference, then the churches and the letters written to them
  // (client/public/explorer/travels.json; places named as the Acts book page
  // names them, client/public/bible/notes/acts/intro.json).
  "/study/explorer/pauls-travels": async () => {
    const t = readJsonSafe("client/public/explorer/travels.json");
    const intro = readJsonSafe("client/public/bible/notes/acts/intro.json");
    if (!t?.trips?.length || !intro) return null;
    const names = new Map();
    for (const m of intro.teaching.map) for (const p of m.places || []) if (!names.has(p.id)) names.set(p.id, p.name);
    const trip = (tr) =>
      sec(`${tr.name} (${tr.range})`, `<p>${escapeHtml(tr.line)}</p><ol>${tr.steps.map((st) => `<li><strong>${escapeHtml(st.name ?? names.get(st.place) ?? st.place)}.</strong> ${escapeHtml(st.text)} (${escapeHtml(st.ref)})</li>`).join("")}</ol>`);
    const church = (c) =>
      `<li><strong>${escapeHtml(c.name)}.</strong> ${escapeHtml(c.text)} (${escapeHtml(c.ref)})${c.letters.map((l) => ` <a href="/study/bible/${escapeHtml(l.book)}">${escapeHtml(l.name)}</a>: ${escapeHtml(l.note)}`).join("")}</li>`;
    return {
      html: article([
        `<p class="pre-eyebrow"><a href="/study/explorer">Bible Explorer</a></p>`,
        `<h1>Paul's travels</h1>`,
        `<p class="pre-subtitle">${escapeHtml(t.intro)}</p>`,
        `<p>${escapeHtml(t.routeNote)}</p>`,
        ...t.trips.map(trip),
        sec("Churches and letters", `<p>${escapeHtml(t.churchesIntro)}</p><ol>${t.churches.map(church).join("")}</ol><p>${escapeHtml(t.churchesNote)}</p>`),
        `<p><a href="/study/explorer">The whole map</a></p>`,
      ]),
    };
  },
  // Abraham's road: every part's places in order with what happened there and
  // its Genesis reference (client/public/explorer/abrahams-road.json; places
  // named as the Genesis book page names them, or as the road renames them).
  "/study/explorer/abrahams-road": async () => {
    const r = readJsonSafe("client/public/explorer/abrahams-road.json");
    const intro = readJsonSafe("client/public/bible/notes/genesis/intro.json");
    if (!r?.parts?.length || !intro) return null;
    const names = new Map();
    for (const m of intro.teaching.map) for (const p of m.places || []) if (!names.has(p.id)) names.set(p.id, (r.names || {})[p.id] ?? p.name);
    const part = (pt) =>
      sec(`${pt.name} (${pt.range})`, `<p>${escapeHtml(pt.line)}</p><ol>${pt.steps.map((st) => `<li><strong>${escapeHtml(st.name ?? names.get(st.place) ?? st.place)}.</strong> ${escapeHtml(st.text)} (${escapeHtml(st.ref)})</li>`).join("")}</ol>`);
    return {
      html: article([
        `<p class="pre-eyebrow"><a href="/study/explorer">Bible Explorer</a></p>`,
        `<h1>Abraham's road</h1>`,
        `<p class="pre-subtitle">${escapeHtml(r.intro)}</p>`,
        `<p>${escapeHtml(r.routeNote)}</p>`,
        ...r.parts.map(part),
        `<p><a href="/study/explorer/abraham">Stop 3: Abraham and the Promise</a></p>`,
        `<p><a href="/study/explorer">The whole map</a></p>`,
      ]),
    };
  },
  // The Bible Explorer: every stop on the map with its line for younger and
  // older readers (client/public/explorer/index.json); a finished stop links
  // its own page, one still being drawn is named without a link.
  "/study/explorer": async () => {
    const d = readJsonSafe("client/public/explorer/index.json");
    if (!d?.stops?.length) return null;
    const stop = (st) => {
      const name = st.status === "finished" ? `<a href="/study/explorer/${escapeHtml(st.slug)}">${escapeHtml(st.title)}</a>` : escapeHtml(st.title);
      return `<li><h3>${st.n}. ${name}</h3><p>${escapeHtml(st.summary.younger)}</p><p>${escapeHtml(st.summary.older)}</p>${st.status === "finished" ? "" : "<p>This stop is being drawn.</p>"}</li>`;
    };
    const thread = (d.threads || []).find((t) => t.status === "finished");
    const cards = (d.cards || []).filter((c) => c.status === "finished");
    return {
      html: article([
        `<p class="pre-eyebrow"><a href="/study">Bible</a></p>`,
        `<h1>Bible Explorer</h1>`,
        `<p class="pre-subtitle">The whole Bible as one story, on one map, for ages 7 to 16. Follow the road from the garden to the city.</p>`,
        sec("The map", `<ol>\n${d.stops.map(stop).join("\n")}\n</ol>`),
        thread ? sec(`A thread through the whole Bible: ${thread.name}`, `<p>${escapeHtml(thread.line.older)}</p>`) : "",
        (d.filmGroups || []).length
          ? sec(
              "Watch and learn",
              (d.filmGroups || [])
                .map((g) => {
                  const mine = (d.films || []).filter((f) => f.group === g.id);
                  const item = (f) => (f.status === "finished" ? `<li><a href="/study/explorer/watch/${escapeHtml(f.slug)}">${escapeHtml(f.title)}</a>: ${escapeHtml(f.line?.older ?? "")}</li>` : `<li>${escapeHtml(f.title)} (coming)</li>`);
                  return `<h3>${escapeHtml(g.name)}</h3><p>${escapeHtml(g.line)}</p><ul>${mine.map(item).join("")}</ul>`;
                })
                .join("\n")
            )
          : "",
        cards.length ? sec("Why we believe", cards.map((c) => `<h3>${escapeHtml(c.title)}</h3><p>${escapeHtml(c.statement.older)}</p>`).join("\n")) : "",
      ]),
    };
  },
  // The history door: the ages, the course, the longer essays, the rooms.
  "/theology/history": async (title) => historyDoorBody(title),
  // Every person, A to Z, with years, role and place, under their own anchor.
  "/theology/history/people": async () => {
    const d = readJsonSafe("client/public/theology/church-history-figures.json");
    const figures = ((d && d.figures) || []).slice().sort((a, b) => a.name.replace(/^The\s+/i, "").localeCompare(b.name.replace(/^The\s+/i, "")));
    if (!figures.length) return null;
    const id = (n) => `person-${n.toLowerCase().replace(/,.*$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
    return {
      html: article([
        `<p class="pre-eyebrow"><a href="/theology/history">History</a></p>`,
        `<h1>People of church history</h1>`,
        `<ul>\n${figures.map((f) => `<li id="${escapeHtml(id(f.name))}"><h2>${escapeHtml(f.name)}</h2><p>${escapeHtml(f.dates)}. ${escapeHtml(f.role)}${f.place ? `, ${escapeHtml(f.place)}` : ""}.</p><p>${escapeHtml(f.summary)}</p><p><strong>Why they matter.</strong> ${escapeHtml(f.whyTheyMatter)}</p></li>`).join("\n")}\n</ul>`,
      ]),
    };
  },
  // For skeptics: Test the Case, the first questions, the eight-week plan.
  "/skeptics": async () => {
    const answers = await loadAnswers();
    const { ARGUMENT_CASES = [] } = await loadTs("client/src/data/argumentCases.ts");
    const { QUESTION_GROUPS = [] } = await loadTs("client/src/data/questionGroups.ts");
    const first = QUESTION_GROUPS.filter((g) => g.id === "true").flatMap((g) => g.answers)
      .map((s) => answers.find((a) => a.slug === s)).filter(Boolean);
    return {
      html: article([
        `<p class="pre-eyebrow"><a href="/topics">Questions</a></p>`,
        `<h1>For skeptics</h1>`,
        `<p class="pre-subtitle">Weigh the case at your own pace. Push back anywhere.</p>`,
        sec("Test the Case", `<ul>\n${ARGUMENT_CASES.map((c) => `<li><a href="/tools/test-the-case?case=${escapeHtml(c.slug)}">${escapeHtml(c.title)}</a></li>`).join("\n")}\n</ul>`),
        sec("The first questions", `<ul>\n${first.map((a) => `<li><a href="/answers/${escapeHtml(a.slug)}">${escapeHtml(a.question)}</a></li>`).join("\n")}\n</ul>`),
        sec("Take longer", `<ul>\n<li><a href="/plans/skeptic">Eight Weeks for the Curious Skeptic</a></li>\n<li><a href="/topics">Hard questions</a></li>\n</ul>`),
      ]),
    };
  },
  // Every catechism question with its answers and its verse.
  "/family/catechism": async (title) => {
    const list = readJsonSafe("client/public/family-catechism.json");
    if (!Array.isArray(list) || !list.length) return null;
    const out = [`<h1>${escapeHtml(title)}</h1>`];
    let part = null;
    for (const q of list) {
      if (q.part && q.part !== part) {
        part = q.part;
        out.push(`<h2>${escapeHtml(part)}</h2>`);
      }
      out.push([
        `<h3>${escapeHtml(`${q.number}. ${q.question}`)}</h3>`,
        q.kidsAnswer ? `<p><strong>${escapeHtml(q.kidsAnswer)}</strong></p>` : "",
        q.answer ? `<p>${escapeHtml(q.answer)}</p>` : "",
        q.scriptureText ? `<blockquote>${escapeHtml(q.scriptureText)} <strong>${escapeHtml(q.scripture ?? "")}</strong></blockquote>` : "",
      ].filter(Boolean).join("\n"));
    }
    return { html: article(out) };
  },
  // Each reading plan with every day's passage and prompt.
  "/family/reading-plans": async (title) => {
    const plans = readJsonSafe("client/public/family-reading-plans.json");
    if (!Array.isArray(plans) || !plans.length) return null;
    const out = [`<h1>${escapeHtml(title)}</h1>`];
    for (const plan of plans) {
      out.push(`<h2>${escapeHtml(plan.title)}</h2>`);
      if (plan.description) out.push(`<p>${escapeHtml(plan.description)}</p>`);
      const meta = [plan.audience, plan.length].filter(Boolean).join(" · ");
      if (meta) out.push(`<p>${escapeHtml(meta)}</p>`);
      const days = (plan.days ?? []).map((d) => `<li><strong>${escapeHtml(d.passage ?? "")}</strong>. ${escapeHtml(d.prompt ?? "")}</li>`).join("\n");
      if (days) out.push(`<ol>\n${days}\n</ol>`);
    }
    return { html: article(out) };
  },
};

/** A static route's own body and structured data, when it has one. */
async function pageBody(routePath, title) {
  const make = PAGE_BODIES[routePath];
  if (!make) return null;
  try { return await make(title); } catch { return null; }
}

function readJsonSafe(rel) {
  try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), rel), "utf8")); }
  catch { return null; }
}


function familyDevotionLinks() {
  const index = readJsonSafe("client/public/family/index.json");
  return (index?.devotions ?? []).map((d) => ({ title: d.title, href: `/family/devotions/${d.id}`, blurb: d.description || "" }));
}

function hubListingHtml(routePath) {
  const cfg = HUB_LISTINGS[routePath];
  if (!cfg) return "";
  let items;
  try { items = cfg.load(); } catch { return ""; }
  if (!items || !items.length) return "";
  const rows = items.slice(0, cfg.cap).map((it) => {
    const blurb = it.blurb ? `<p>${escapeHtml(String(it.blurb).slice(0, 160))}</p>` : "";
    return `<li><a href="${escapeHtml(it.href)}">${escapeHtml(it.title)}</a>${blurb}</li>`;
  }).join("\n");
  return `<nav aria-label="${escapeHtml(cfg.label)}"><h2>${escapeHtml(cfg.label)}</h2><ul>\n${rows}\n</ul></nav>`;
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

// A search description of about 155 characters: a longer one is cut back to
// its last whole sentence that fits, or to a whole word with an ellipsis.
// Mirrors capDescription in client/src/components/SEOMeta.tsx.
function capDescription(text, max = 155) {
  const t = String(text ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const end = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "));
  if (end >= 60) return t.slice(0, end + 1);
  return `${t.slice(0, max - 1).replace(/\s+\S*$/, "").replace(/[,;:]$/, "")}\u2026`;
}

// Build the head block for one route. Returns string of <meta>/<link>/<script>.
function buildHead({ title, description: rawDescription, url, image, type, publishedDate, modifiedDate, schemas = [], noindex = false }) {
  // Brand-once, mirroring SEOMeta.tsx.
  const fullTitle =
    title.includes("James Bell") || title.includes("LiveWell") ? title : `${title} | ${TITLE_SUFFIX}`;
  const description = capDescription(rawDescription);
  const lines = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="author" content="${escapeHtml(AUTHOR_NAME)}" />`,
    // Retired essays (off the shelf) say noindex in the head itself: crawlers
    // that never run JS see only this file, not the SPA's SEOMeta.
    noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
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
  // buildHead always writes the route's own robots tag; drop the shell's, or
  // a retired essay's noindex would sit beside the shell's "index, follow".
  html = html.replace(/<meta\s+name="robots"[\s\S]*?>/gi, "");
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

const HOME_HERO_MARKER = /\s*<!--\s*prerender:home-hero[\s\S]*?-->/;

/**
 * The front page's hero, as static HTML, from the same constants Home.tsx
 * renders (client/src/lib/positioning.ts) and the same classes (index.css,
 * .home-hero*), so the two cannot drift and React's mount moves nothing.
 *
 * Why: on the home page the largest contentful paint is the hero text. As a
 * SPA it only existed after the JS bundle downloaded and ran, which under a
 * throttled mobile connection put LCP near four seconds against a 90-score
 * budget. Painting it from the HTML, inside the existing static shell, moves
 * the largest paint to the first paint. main.tsx waits for that paint to be
 * recorded before React replaces it (lib/static-hero.ts). The hero is the
 * headline, Find, and the empty frame Plate I fills; no photograph.
 */
function positioningString(name) {
  const src = fs.readFileSync(
    path.join(REPO_ROOT, "client/src/lib/positioning.ts"),
    "utf8"
  );
  const m = src.match(
    new RegExp(`export const ${name}\\s*=\\s*"((?:[^"\\\\]|\\\\.)*)"`)
  );
  return m ? m[1].replace(/\\"/g, '"') : "";
}

function homeHeroHtml() {
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // A dash keeps to the word before it, as in Home.tsx.
  const headline = positioningString("HOME_HEADLINE").replace(/ \u2014/g, "\u00A0\u2014");
  const word = positioningString("HOME_LINKED_WORD");
  const href = positioningString("HOME_LINKED_HREF");
  // The one sentence under the headline: what the site is for, as in Home.tsx.
  const line = positioningString("HOME_LINE");
  if (!headline) return "";
  // "post-Christian" in the headline opens the page that explains it, as in Home.tsx.
  const [before, after] = word && href && headline.includes(word) ? headline.split(word) : [headline, null];
  const title = after === null ? esc(headline) : `${esc(before)}<a href="${esc(href)}">${esc(word)}</a>${esc(after)}`;
  // Find works before the app runs: a plain GET to /search. Plate I's frame is
  // here, empty, at the size the drawing fills when React mounts.
  const label = "Look up a passage or ask a question";
  // Tonight's line arrives with the app into a slot of the same height (Home.tsx),
  // and under it the choices of /start as one row of chips, as Home draws them
  // (pages/home/roadChips.ts): a road opens on /start, a reader's page opens itself.
  const start = readJsonSafe("client/src/lib/startRoad.json") || {};
  const choice = new Map([
    ...(start.roads || []).map((r) => [r.id, { chip: r.chip, href: `/start#${r.id}` }]),
    ...(start.pages || []).map((p) => [p.id, { chip: p.chip, href: p.href }]),
  ]);
  const chips = (start.order || (start.roads || []).map((r) => r.id))
    .map((id) => choice.get(id))
    .filter(Boolean)
    .map((c) => `<li><a class="home-road" href="${esc(c.href)}">${esc(c.chip)}</a></li>`)
    .join("");
  const roads = chips
    ? `
              <nav class="home-roads" aria-labelledby="home-roads-label"><p id="home-roads-label" class="home-roads__label">Start where you are</p><ul class="home-roads__list">${chips}</ul></nav>`
    : "";
  return `
        <section class="home-hero">
          <div class="home-hero__inner">
            <div class="home-hero__words">
              <h1 class="home-hero__title">${title}</h1>${line ? `
              <p class="home-hero__line">${esc(line)}</p>` : ""}
              <form role="search" class="home-find" action="/search" method="get" aria-label="${label}">
                <div class="home-find__row">
                  <input class="home-find__input" type="search" name="q" autocomplete="off" placeholder="John 3:16, or your question" aria-label="${label}">
                  <button type="submit" class="home-find__go" aria-label="Find"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button>
                </div>
              </form>
              <div class="home-tonight home-tonight--slot" aria-hidden="true"></div>${roads}
            </div>
            <figure class="lw-frame-fig home-hero__art"><div class="lw-frame"><div class="lw-frame__in"></div></div><figcaption class="lw-cap"><span>Plate I</span><span>The road</span></figcaption></figure>
          </div>
        </section>`;
}

/**
 * The page's own code, preloaded from its prerendered HTML.
 *
 * Every page but Home is a lazy chunk (React.lazy in App.tsx). The browser
 * only learned a chapter page needed StudyBible-<hash>.js after the entry
 * bundle had downloaded and run, and "One moment." was what showed while it
 * fetched. The route table says which page component an address renders and
 * Vite names the chunk after the component's file, so the prerendered HTML
 * can ask for that chunk, and the chunks it imports, at once.
 */
let routeChunks = null;
function loadRouteChunks() {
  const app = fs.readFileSync(path.join(REPO_ROOT, "client/src/App.tsx"), "utf8");
  const fileOf = new Map();
  for (const m of app.matchAll(/const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\("([^"]+)"\)/g)) {
    fileOf.set(m[1], path.basename(m[2]));
  }
  const routes = [];
  for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+component=\{(\w+)\}/g)) {
    const file = fileOf.get(m[2]);
    if (!file) continue;
    const pattern = m[1]
      .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
      .replace(/:\w+\*/g, ".*")
      .replace(/:\w+/g, "[^/]+");
    routes.push({ re: new RegExp(`^${pattern}$`), file });
  }
  let assets = [];
  try { assets = fs.readdirSync(path.join(DIST_DIR, "assets")).filter((f) => f.endsWith(".js")); } catch { /* no build */ }
  return { routes, assets, cache: new Map() };
}

function chunkPreloads(routePath, template) {
  routeChunks ??= loadRouteChunks();
  const hit = routeChunks.routes.find((r) => r.re.test(routePath || "/"));
  if (!hit) return "";
  if (routeChunks.cache.has(hit.file)) return routeChunks.cache.get(hit.file);
  let html = "";
  // "<File>-<hash>.js": the hash is eight URL-safe characters with no dot.
  const own = routeChunks.assets.filter((f) => new RegExp(`^${hit.file}-[A-Za-z0-9_-]{8}\\.js$`).test(f));
  if (own.length === 1) {
    let code = "";
    try { code = fs.readFileSync(path.join(DIST_DIR, "assets", own[0]), "utf8"); } catch { /* skip */ }
    const names = [own[0]];
    for (const m of code.matchAll(/(?:from|import)"\.\/([^"]+\.js)"/g)) {
      if (!names.includes(m[1])) names.push(m[1]);
    }
    html = names
      // The entry and the React vendor file are already in the shell's head.
      .filter((n) => !template.includes(`/assets/${n}`))
      .map((n) => `<link rel="modulepreload" crossorigin href="/assets/${n}">`)
      .join("\n    ");
  }
  routeChunks.cache.set(hit.file, html);
  return html;
}

function writeRoute(template, route, head, bodyHtml = "") {
  const isHome = route.path === "" || route.path === "/";
  const target = isHome
    ? path.join(DIST_DIR, "index.html")
    : path.join(DIST_DIR, route.path.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const preloads = isHome ? "" : chunkPreloads(route.path, template);
  let html = rewriteIndexHtml(template, preloads ? `${head}\n    ${preloads}` : head);
  // The page's own text goes inside the static shell, under the masthead, in
  // the site's own type (.prerender-content in index.css). A crawler, a link
  // preview and a browser with scripts blocked read it there. For everyone
  // else it is the first thing on screen, and main.tsx keeps it there until
  // the real page has its content (lib/prerender-hold.ts), so a reader on a
  // phone never watches the text vanish behind "One moment."
  const body = bodyHtml ? `\n        <div class="prerender-content">\n${bodyHtml}\n        </div>` : "";
  // The static hero paints from the HTML on the front page only; every other
  // route drops the marker so a deep link never flashes the home hero.
  if (HOME_HERO_MARKER.test(html)) {
    html = html.replace(HOME_HERO_MARKER, () => (isHome ? homeHeroHtml() : "") + body);
  } else if (body) {
    html = html.replace('<div id="root">', () => `<div id="root">${body}`);
  }
  fs.writeFileSync(target, html);
  return target;
}

/**
 * The Study Bible (client/public/bible/*): every book, every chapter, the
 * eleven acts of the story, and the doctrine pages are param routes, so the
 * route-table pass cannot reach them. Each gets its own head and, for
 * crawlers, its introduction or study notes and (for a chapter) the Berean
 * Standard Bible text as plain HTML. The client replaces #root on mount.
 */
function prerenderStudyBible(template) {
  const BIBLE = path.join(REPO_ROOT, "client/public/bible");
  const read = (rel) => { try { return JSON.parse(fs.readFileSync(path.join(BIBLE, rel), "utf8")); } catch { return null; } };
  const books = read("books.json");
  if (!books) return 0;
  const story = read("story.json");
  const doctrines = read("doctrines.json")?.doctrines ?? [];
  const index = read("notes-index.json") ?? { titles: {}, doctrines: {} };
  let storyline = [];
  try { storyline = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "client/public/theology/biblical-theology-storyline.json"), "utf8")).acts; } catch { /* acts keep their ids */ }
  const para = (t) => String(t ?? "").split(/\n\s*\n/).filter(Boolean).map((x) => `<p>${escapeHtml(x)}</p>`).join("\n");
  const section = (h, body) => (body ? `<section><h2>${escapeHtml(h)}</h2>\n${body}</section>` : "");
  const root = { name: "The Study Bible", path: "/study/bible" };
  const trim = (t, n = 158) => { const x = String(t ?? "").replace(/\s+/g, " ").trim(); return x.length > n ? `${x.slice(0, n - 1).replace(/\s+\S*$/, "")}…` : x; };
  // "Psalm 23", not "Psalms 23": one psalm takes the singular.
  const chName = (bk) => (bk.slug === "psalms" ? "Psalm" : bk.name);
  const titleOf = (slug, c) => index.titles?.[slug]?.[c - 1] ?? null;
  let n = 0;
  const emit = (routePath, title, description, crumbs, body, type = "website") => {
    const url = `${SITE_URL}${routePath}`;
    const head = buildHead({ title, description, url, image: ogImageUrl(title), type, schemas: [breadcrumbSchema([{ name: "Home", path: "" }, ...crumbs])] });
    writeRoute(template, { path: routePath }, head, `<article>\n${body}\n</article>`);
    n++;
  };

  for (const b of books) {
    const intro = read(`notes/${b.slug}/intro.json`);
    const chapters = Array.from({ length: b.chapters }, (_, i) => i + 1)
      .map((c) => `<li><a href="/study/bible/${b.slug}/${c}">${escapeHtml(`${chName(b)} ${c}`)}${titleOf(b.slug, c) ? `: ${escapeHtml(titleOf(b.slug, c))}` : ""}</a></li>`)
      .join("\n");
    const bookBody = [
      `<h1>${escapeHtml(b.name)}</h1>`,
      intro ? `<p>${escapeHtml(intro.tagline)}</p>` : "",
      intro ? section("What this book is", para(intro.overview)) : "",
      intro ? section("How it is built", `<ol>${intro.structure.map((x) => `<li><strong>${escapeHtml(`${b.name} ${x.range}: ${x.title}`)}</strong>. ${escapeHtml(x.summary)}</li>`).join("\n")}</ol>`) : "",
      section("The chapters", `<ol>\n${chapters}\n</ol>`),
      // A book with a teaching introduction (Mark first) shows it, in plain words, before the fuller notes.
      ...(intro?.teaching?.parts ?? []).map((t) => section(t.h, para(t.body))),
      intro ? section("Who wrote it", para(intro.author)) : "",
      intro ? section("When", para(intro.date)) : "",
      intro ? section("The world it was written in", para(intro.setting)) : "",
      intro ? section("Why it was written", para(intro.purpose)) : "",
      intro ? section("Where it sits in the story", para(intro.story)) : "",
      intro ? section(b.testament === "OT" ? "How it points to Christ" : "What it shows of Christ", para(intro.christ)) : "",
      intro ? section("Themes to follow", intro.themes.map((t) => `<h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.body)}</p>`).join("\n")) : "",
      intro ? section("How to read it well", para(intro.reading)) : "",
      intro?.text ? section(`The text of ${b.name}`, para(intro.text)) : "",
      intro?.reception ? section(`How ${b.name} has been read`, para(intro.reception)) : "",
      intro?.furtherReading?.length ? section("Further reading", `<ul>${intro.furtherReading.map((r) => `<li>${escapeHtml(`${r.author}, ${r.title}${r.series ? ` (${r.series}${r.year ? `, ${r.year}` : ""})` : r.year ? ` (${r.year})` : ""}. ${r.note}`)}</li>`).join("")}</ul>`) : "",
    ].join("\n");
    emit(
      `/study/bible/${b.slug}`,
      intro ? `${b.name}: Introduction, Outline, and Study Notes` : `${b.name}: Study Notes, Hebrew and Greek`,
      intro ? trim(intro.tagline) : `Every chapter of ${b.name} with study notes and the original language beneath every word.`,
      [root, { name: b.name, path: `/study/bible/${b.slug}` }],
      bookBody
    );

    for (let c = 1; c <= b.chapters; c++) {
      const note = read(`notes/${b.slug}/${c}.json`);
      const vnotes = read(`notes/${b.slug}/verses/${c}.json`)?.verses ?? [];
      const text = read(`ch/${b.slug}/${c}.json`);
      // One running block with the verse numbers raised, as the reader shows it.
      const verses = (text?.verses ?? []).filter((v) => v.t).map((v) => `<sup>${v.v}</sup>${escapeHtml(v.t)}`).join("\n");
      const lang = b.testament === "OT" ? "Hebrew" : "Greek";
      const body = [
        `<h1>${escapeHtml(`${chName(b)} ${c}`)}${note ? `: ${escapeHtml(note.title)}` : ""}</h1>`,
        note ? `<p>${escapeHtml(note.summary)}</p>` : "",
        verses ? section(`${chName(b)} ${c} (Berean Standard Bible)`, `<p>\n${verses}\n</p>`) : "",
        note ? section("Where we are in the story", para(note.story)) : "",
        note ? section("The historical setting", para(note.historical)) : "",
        note ? section("The world behind the text", para(note.cultural)) : "",
        note ? section("How the chapter is built", `${para(note.literary)}\n<ol>${note.outline.map((o) => `<li>${escapeHtml(`${c}:${o.v} ${o.t}`)}</li>`).join("")}</ol>`) : "",
        note ? section("What it teaches", note.doctrines.map((d) => `<p><a href="/study/bible/doctrines/${escapeHtml(d.id)}">${escapeHtml(doctrines.find((x) => x.id === d.id)?.name ?? d.id)}</a>. ${escapeHtml(d.note)}</p>`).join("\n")) : "",
        note ? section(`Key ${lang} words`, note.words.map((w) => `<p>${escapeHtml(w.note)}</p>`).join("\n")) : "",
        vnotes.length ? section("Verse by verse", vnotes.map((e) => [
          `<h3>${escapeHtml(`${chName(b)} ${c}:${e.v}`)}</h3>`,
          para(e.context),
          e.grammar ? `<h4>The ${lang}</h4>\n${para(e.grammar)}` : "",
          e.history ? `<h4>Background</h4>\n${para(e.history)}` : "",
          (e.theology ?? []).map((t) => `<p><a href="/study/bible/doctrines/${escapeHtml(t.id)}">${escapeHtml(doctrines.find((x) => x.id === t.id)?.name ?? t.id)}</a>. ${escapeHtml(t.note)}</p>`).join("\n"),
          e.text ? `<h4>The text</h4>\n${para(e.text)}` : "",
          ...["ot", "nt"].flatMap((k) => (e[k] ?? []).map((x) => `<p><strong>${escapeHtml(x.ref)}</strong>. ${escapeHtml(x.note)}</p>`)),
        ].filter(Boolean).join("\n")).join("\n")) : "",
        note ? section(b.testament === "OT" ? "How it points to Christ" : "What it shows of Christ", para(note.christ)) : "",
        note?.interpretation ? section("How it has been read", para(note.interpretation)) : "",
        note?.text ? section("The text and translations", para(note.text)) : "",
        ...(note?.hard == null ? [] : Array.isArray(note.hard) ? note.hard : [note.hard]).map((h) => section("A hard question", `<p><em>${escapeHtml(h.q)}</em></p>\n${para(h.a)}`)),
        note?.teach ? section("For teaching and preaching", `<p><strong>${escapeHtml(note.teach.big)}</strong></p>\n<ol>${note.teach.outline.map((o) => `<li>${escapeHtml(`${c}:${o.v} ${o.t}`)}</li>`).join("")}</ol>\n${para(note.teach.pitfalls)}${note.teach.pastoral ? `\n${para(note.teach.pastoral)}` : ""}`) : "",
        note ? section("Questions for study or a group", `<ol>${(Array.isArray(note.questions) ? note.questions : [...note.questions.observe, ...note.questions.interpret, ...note.questions.apply]).map((q) => `<li>${escapeHtml(q)}</li>`).join("")}</ol>`) : "",
        `<nav><a href="/study/bible/${b.slug}">${escapeHtml(b.name)}</a>${c > 1 ? ` · <a href="/study/bible/${b.slug}/${c - 1}">${escapeHtml(`${chName(b)} ${c - 1}`)}</a>` : ""}${c < b.chapters ? ` · <a href="/study/bible/${b.slug}/${c + 1}">${escapeHtml(`${chName(b)} ${c + 1}`)}</a>` : ""}</nav>`,
      ].join("\n");
      emit(
        `/study/bible/${b.slug}/${c}`,
        note ? `${chName(b)} ${c} Study Notes \u2013 ${note.title}` : `${chName(b)} ${c} Study Notes, Hebrew and Greek`,
        note ? trim(note.summary) : `${chName(b)} ${c} with study notes, cross-references, and the ${lang} beneath every word.`,
        [root, { name: b.name, path: `/study/bible/${b.slug}` }, { name: `${chName(b)} ${c}`, path: `/study/bible/${b.slug}/${c}` }],
        body,
        "article"
      );
    }
  }

  const bookName = (slug) => books.find((b) => b.slug === slug)?.name ?? slug;
  for (const act of story?.acts ?? []) {
    const line = storyline.find((l) => l.id === act.id) ?? {};
    const links = act.path.flatMap((r) => Array.from({ length: r.to - r.from + 1 }, (_, k) => r.from + k).map((c) =>
      `<li><a href="/study/bible/${r.book}/${c}">${escapeHtml(`${chName({ slug: r.book, name: bookName(r.book) })} ${c}`)}${titleOf(r.book, c) ? `: ${escapeHtml(titleOf(r.book, c))}` : ""}</a></li>`)).join("\n");
    emit(
      `/study/bible/story/${act.id}`,
      line.act ? `${line.title ?? act.id}: ${line.act.replace(/^Act /, "Part ")} of the Bible's Story` : `${line.title ?? act.id}: The Story of the Bible`,
      trim(line.turning ?? act.watch),
      [root, { name: "The Story of the Bible", path: "/study/bible/story" }, { name: line.title ?? act.id, path: `/study/bible/story/${act.id}` }],
      [`<h1>${escapeHtml(line.title ?? act.id)}</h1>`, `<p>${escapeHtml(act.dates)}</p>`, section("What happens", para(line.summary)), section("The world behind it", para(act.world)), section("What to watch for", para(act.watch)), section("Read it, chapter by chapter", `<ol>\n${links}\n</ol>`)].join("\n")
    );
  }

  for (const d of doctrines) {
    const keys = index.doctrines?.[d.id] ?? [];
    const st = read(`doctrines/${d.id}.json`);
    const studyBody = st ? [
      section("What it is", para(st.definition)),
      section("In the Old Testament", para(st.ot)),
      section("In the New Testament", para(st.nt)),
      section("Key texts", `<ol>${st.keyTexts.map((k) => `<li><strong>${escapeHtml(k.ref)}</strong>. ${escapeHtml(k.why)}</li>`).join("\n")}</ol>`),
      section("How the church has confessed it", para(st.history)),
      section("Where Christians differ", st.differ.map((x) => `<h3>${escapeHtml(x.view)}</h3>\n${para(x.body)}`).join("\n")),
      section("Misunderstandings the church has rejected", para(st.errors)),
      section("Why it matters", para(st.life)),
    ].join("\n") : "";
    const links = keys.map((k) => { const [slug, c] = k.split("/"); return `<li><a href="/study/bible/${slug}/${c}">${escapeHtml(`${chName({ slug, name: bookName(slug) })} ${c}`)}${titleOf(slug, +c) ? `: ${escapeHtml(titleOf(slug, +c))}` : ""}</a></li>`; }).join("\n");
    emit(
      `/study/bible/doctrines/${d.id}`,
      `${d.name}: What the Bible Teaches`,
      trim(d.summary),
      [root, { name: "The Doctrines of the Bible", path: "/study/bible/doctrines" }, { name: d.name, path: `/study/bible/doctrines/${d.id}` }],
      [`<h1>${escapeHtml(d.name)}</h1>`, para(d.summary), studyBody, links ? section("Chapters that teach it", `<ol>\n${links}\n</ol>`) : ""].join("\n")
    );
  }
  const gi = read("guides/index.json");
  for (const g of gi?.groups ?? [])
    for (const x of g.guides) {
      const gd = read(`guides/${x.id}.json`);
      if (!gd) continue;
      const body = [
        `<h1>${escapeHtml(gd.title)}</h1>`,
        `<p>${escapeHtml(gd.summary)}</p>`,
        ...gd.sections.map((s) => section(s.h, `${para(s.body)}${s.table ? `\n<table>${s.table.caption ? `<caption>${escapeHtml(s.table.caption)}</caption>` : ""}<tr>${s.table.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr>${s.table.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`).join("")}</table>` : ""}`)),
      ].join("\n");
      emit(`/study/bible/guides/${x.id}`, gd.title, trim(gd.summary), [root, { name: "Guides", path: "/study/bible/guides" }, { name: gd.title, path: `/study/bible/guides/${x.id}` }], body, "article");
    }
  return n;
}

/**
 * A SELECT list of the wanted columns that the live table actually has, each
 * aliased to the name the code reads. Production's tables have drifted from
 * drizzle/schema.ts (no posts.coverImage, no posts.readingTimeMinutes), and a
 * single unknown column used to abort the whole database pass.
 */
async function selectList(conn, table, wanted) {
  const [cols] = await conn.query(`SHOW COLUMNS FROM \`${table}\``);
  const actual = new Map(cols.map((c) => [String(c.Field).toLowerCase(), String(c.Field)]));
  const missing = wanted.filter((c) => !actual.has(c.toLowerCase()));
  if (missing.length) console.warn(`[prerender] ${table} has no column(s): ${missing.join(", ")} (skipped)`);
  return wanted
    .filter((c) => actual.has(c.toLowerCase()))
    .map((c) => `\`${actual.get(c.toLowerCase())}\` AS \`${c}\``)
    .join(", ");
}

// ---------------------------------------------------------------------------
// The essay shelf (client/src/lib/shelf.json, read through scripts/lib/shelf.mjs).
// A public essay gets its full head and crawlable body, from its rewrite when
// one exists (client/public/essays/<slug>.json). A retired essay keeps its URL
// but its file says noindex and carries only the notice the SPA shows: title,
// one sentence, and the ways on. Static copies in api/index.ts's TAKEN_DOWN
// are never written (when-fear-rewrites-theology's AI draft among them).
const SHELF = loadEssayShelf(REPO_ROOT);
const TAKEN_DOWN = loadTakenDown(REPO_ROOT);

function writeRetiredEssay(template, { slug, title, pending }) {
  const url = `${SITE_URL}/writing/${slug}`;
  const sentence = pending ? PENDING_SENTENCE : RETIRED_SENTENCE;
  const head = buildHead({ title, description: sentence, url, type: "website", noindex: true });
  // The pending essay's own section, when that section has public essays
  // (the same rule as nearestSection in client/src/lib/shelf.ts).
  const own = pending ? SHELF.entries.get(slug) : null;
  const liveSections = new Set(SHELF.liveEssays().map((e) => e.section));
  const section = own && liveSections.has(own.section) ? SHELF.sections.find((x) => x.slug === own.section) : null;
  const links = [
    `<li><a href="/writing">Read the essays</a></li>`,
    section ? `<li><a href="/writing?section=${escapeHtml(section.slug)}">Go to ${escapeHtml(section.name)}</a></li>` : "",
    `<li><a href="/study/bible">Open the Study Bible</a></li>`,
    `<li><a href="/help">Find Help</a></li>`,
  ].filter(Boolean).join("\n");
  const body = `<article><h1>${escapeHtml(title)}</h1>\n<p>${escapeHtml(sentence)}</p>\n<ul>\n${links}\n</ul></article>`;
  writeRoute(template, { path: `/writing/${slug}` }, head, body);
}

/** Every skeptic-track stop is an essay on the public shelf (the SKEPTIC_TRACK_LIVE rule). */
function skepticTrackLive() {
  try {
    const src = fs.readFileSync(path.join(REPO_ROOT, "client/src/lib/skepticTrack.ts"), "utf8");
    const slugs = [...src.matchAll(/slug:\s*(?:"([^"]+)"|null)/g)].map((m) => m[1] ?? null);
    return slugs.length > 0 && slugs.every((slug) => slug !== null && SHELF.isPublic(slug));
  } catch {
    return false;
  }
}

/** A public essay with its rewrite applied, when one exists. */
function withRewrite(rec) {
  const rewrite = SHELF.overrideRecords.get(rec.slug);
  return rewrite
    ? { ...rec, title: rewrite.title, excerpt: rewrite.excerpt, body: rewrite.body, updatedAt: rewrite.updated }
    : rec;
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
  // Support this work (/support) is written beside the curated pages, since
  // its noindex follows the giving switch (scripts/lib/giving.mjs) and a
  // conditional noindex cannot be read from the page's own SEOMeta.
  for (const page of [...STATIC_PAGES, SUPPORT_HEAD]) {
    const url = `${SITE_URL}${page.path}`;
    // The Christ-and-the-Nation pages (the flagship and the nation essays) get a
    // branded per-title Open Graph card, so a shared link unfurls as itself
    // rather than the generic default. Other static pages keep the default.
    const image =
      page.image ||
      (page.path.startsWith("/nation/") ? ogImageUrl(page.title, "Christ and the Nation") : undefined);
    const own = await pageBody(page.path, page.title);
    const head = buildHead({
      title: SEARCH_TITLES[page.path] || page.title,
      description: page.description,
      url,
      image,
      type: page.type,
      schemas: [...(page.schemas || []), ...(own?.schemas ?? [])],
      // The skeptic track says noindex while any stop is off the public shelf
      // (SKEPTIC_TRACK_LIVE in client/src/lib/skepticTrack.ts), as its page does.
      noindex: (page.path === "/skeptic-track" && !skepticTrackLive()) || (page.path === SUPPORT_HEAD.path && supportNoindex()),
    });
    writeRoute(template, page, own?.headExtra ? `${head}\n    ${own.headExtra}` : head, own?.html || hubListingHtml(page.path));
    wrote++;
  }

  // File-driven library pages: read the generated manifests and emit a real
  // head (title, description, per-page OG image) for each, so the leadership
  // articles, context guides, life domains, formation topics, creeds, history
  // essays, and toolkits unfurl and index with their own title and image.
  const LIBRARY_SOURCES = [
    { file: "client/public/context/guides-index.json", key: "guides", route: "/resources/context/", ogPrefix: "resources-context", contentDir: "client/public/context/guides" },
    // The world portraits (/resources/context/world/:id), from the index
    // scripts/build-context-index.mjs writes. The title is the page's own
    // SEOMeta title; the body is the whole portrait (worldBody).
    { file: "client/public/context/worlds-index.json", key: "worlds", route: "/resources/context/world/", ogPrefix: "resources-context-world", slugField: "id", titleField: "seoTitle", preferTitleField: true, desc: "blurb", body: worldBody },
    { file: "client/public/life/domains-index.json", key: "domains", route: "/life/", ogPrefix: "life", contentDir: "client/public/life/domains" },
    { file: "client/public/creeds/documents-index.json", key: "documents", route: "/resources/creeds/", ogPrefix: "resources-creeds", contentDir: "client/public/creeds/documents" },
    { file: "client/public/history/essays-index.json", key: "essays", route: "/theology/history/", ogPrefix: "theology-history", contentDir: "client/public/history/essays" },
    // The four families the sitemap already lists but the prerender didn't
    // (audit 02 #4): study-guide toolkits, Table studies, the How-To library,
    // and the read-online books.
    { file: "client/public/studyguides/index.json", key: "guides", route: "/studyguides/", ogPrefix: "studyguides", desc: "eyebrow", contentDir: "client/public/studyguides" },
    { file: "client/public/howtos/index.json", key: "articles", route: "/how-tos/", ogPrefix: "howtos", desc: "excerpt", contentDir: "client/public/howtos/a" },
    { file: "client/public/plans/plans-index.json", key: "plans", route: "/plans/", ogPrefix: "plans", desc: "blurb", contentDir: "client/public/plans" },
    // The contested-doctrine pages (/theology/doctrine/:slug) — manifest
    // from scripts/build-theology-index.mjs; subtitle is the description.
    { file: "client/public/theology/index.json", key: "docs", route: "/theology/doctrine/", ogPrefix: "theology-doctrine", desc: "subtitle", body: doctrineBody },
    // Sermon series for all 66 books of the Bible. The manifest keys the entry
    // by `id`/`name` (not slug/title), so map them; content files are arrays of
    // markdown sermons, so the body injects at full depth.
    // (The Prophetic Justice / Disruption per-topic pages are folded into the
    // essay shelf and 301 in vercel.json, so they get no head of their own.)
    // The 208 wisdom topics (/wisdom/:id). Manifest keys by id/label; the
    // framing is the description, and the title matches the page's own
    // "{label} — What the Bible Says" so scrapers see the same head.
    { file: "client/public/wisdom/topics.json", key: "topics", route: "/wisdom/", ogPrefix: "wisdom", slugField: "id", titleField: "label", desc: "framing", titleFn: (t) => (/^(When|Why)\b/.test(t) ? `${t}: What the Bible Says` : `What the Bible Says About ${t}`), body: wisdomBody },
    // The 13 guided reading pathways (/pathways/:slug) and the 4 formation
    // guides (/leadership/guides/:slug). Both are param routes, so the route
    // table extractor skips them by design and only a manifest pass reaches
    // them; the sitemap has listed both families all along.
    { file: "client/public/pathways/index.json", route: "/pathways/", ogPrefix: "pathways", desc: "subtitle" },
    // Find Help care pages (/help/:slug) from the needs registry
    // (scripts/build-needs-index.mjs). Only needs with a written page are
    // routes; starter entries live on /help itself. The head carries the
    // search title, not the reader's-words H1, plus the FAQ as structured
    // data; registry and review fields stay out of the crawlable body.
    {
      file: "client/public/needs/index.json", key: "needs", route: "/help/", ogPrefix: "help", desc: "description",
      contentDir: "client/public/needs", titleField: "seoTitle", preferTitleField: true, faq: true,
      filter: (e) => e.page === true,
      omitKeys: ["slug", "page", "rank", "seoTitle", "description", "summary", "askedAs", "states", "sensitivity", "crisisTopics", "kit", "related", "slots", "sources", "reviewed"],
    },
    // A page per family devotion (/family/devotions/:id): the 72 weekly ones
    // and each day of the daily sets, from the family index
    // (scripts/build-family-index.mjs). The title matches the page's own
    // "{title}: A Family Devotion"; the description is the big idea, or the
    // opening of a daily reflection. The body is the devotion itself, read
    // from the file the index names for it (devotionBody).
    { file: "client/public/family/index.json", key: "devotions", route: "/family/devotions/", ogPrefix: "family-devotions", slugField: "id", desc: "description", titleTemplate: "{title}: A Family Devotion", body: devotionBody },
    // The topic pages (/topics/:slug), from the topics index
    // (scripts/build-topics-index.mjs). The title is the question, as the
    // page's own SEOMeta has it; the page file's prose (the short answer and
    // the lines under each part) is the crawlable body. The essay slots are
    // left out: which of them the page shows depends on the shelf (a lead not
    // public yet shows its stand-in), so the body never names an essay the
    // reader cannot open.
    {
      file: "client/public/topics/index.json", key: "pages", route: "/topics/", ogPrefix: "topics", desc: "description",
      contentDir: "client/public/topics",
      omitKeys: ["slug", "title", "description", "askedAs", "essay", "essayStandIn", "alsoEssays", "politics", "sensitive", "folds", "updated", "reviewed"],
    },
  ];
  let withBody = 0;
  for (const src of LIBRARY_SOURCES) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, src.file), "utf8"));
    } catch { continue; }
    // Most manifests are `{ key: [...] }`; a couple (pathways) are a bare array.
    const entries = Array.isArray(data) ? data : data[src.key] || [];
    for (const e of entries) {
      if (src.filter && !src.filter(e)) continue;
      // Most manifests key by slug/title; a few (e.g. the whole-Bible sermons)
      // key by id/name, so allow a per-source field alias.
      const slug = e.slug || (src.slugField ? e[src.slugField] : undefined);
      const rawTitle = (src.preferTitleField && e[src.titleField]) || e.title || (src.titleField ? e[src.titleField] : undefined);
      if (!slug || !rawTitle) continue;
      const title = src.titleFn ? src.titleFn(rawTitle) : src.titleTemplate ? src.titleTemplate.replace(/\{title\}/g, rawTitle) : rawTitle;
      const url = `${SITE_URL}${src.route}${slug}`;
      const ogRel = `client/public/og/${src.ogPrefix}-${slug}.png`;
      const image = fs.existsSync(path.join(REPO_ROOT, ogRel))
        ? `${SITE_URL}/og/${src.ogPrefix}-${slug}.png`
        : OG_DEFAULT;
      const description = e[src.desc || "blurb"] || e.blurb || e.subtitle
        || (src.descTemplate ? src.descTemplate.replace(/\{title\}/g, title) : title);
      // Read the entry's full content file (when present) up front: the prose
      // injects into #root at full depth, and for books its chapter list also
      // feeds the Book schema below.
      let contentObj;
      if (src.contentDir) {
        const cf = path.join(REPO_ROOT, src.contentDir, `${slug}.json`);
        if (fs.existsSync(cf)) {
          try { contentObj = JSON.parse(fs.readFileSync(cf, "utf8")); }
          catch { /* leave head-only */ }
        }
      }
      const faqEntries = src.faq && Array.isArray(contentObj?.faq) ? contentObj.faq : [];
      if (contentObj && src.omitKeys) for (const k of src.omitKeys) delete contentObj[k];
      // Books get a subtitle-enriched <title> (matching the client SEOMeta) and
      // a Book JSON-LD carrying every chapter as a hasPart node, so search can
      // deep-link the exact chapter that answers a reader's question.
      const headTitle = SEARCH_TITLES[`${src.route}${slug}`] || (src.type === "book" && e.subtitle ? `${title} — ${e.subtitle}` : title);
      // BreadcrumbList (Home › Section › Title) on every library page.
      const section = SECTION_BY_ROUTE[src.route];
      const crumbs = [{ name: "Home", path: "" }];
      if (section) crumbs.push(section);
      crumbs.push({ name: title, path: `${src.route}${slug}` });
      const schemas = [breadcrumbSchema(crumbs)];
      if (faqEntries.length) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntries.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: String(f.a).replace(/[*_]/g, "") },
          })),
        });
      }
      if (src.type === "book") {
        const chapters = Array.isArray(contentObj?.chapters) ? contentObj.chapters : [];
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Book",
          name: title,
          ...(e.subtitle ? { alternativeHeadline: e.subtitle } : {}),
          ...(e.blurb ? { description: e.blurb } : {}),
          author: { "@type": "Person", name: AUTHOR_NAME },
          url,
          bookFormat: "https://schema.org/EBook",
          inLanguage: "en",
          isAccessibleForFree: true,
          ...(chapters.length ? { numberOfPages: chapters.length } : {}),
          ...(chapters.length ? {
            hasPart: chapters.map((c) => ({
              "@type": "Chapter",
              position: c.n,
              name: c.title,
              url: `${url}#ch-${c.n}`,
            })),
          } : {}),
        });
      }
      const head = buildHead({ title: headTitle, description, url, image, type: src.type || "article", schemas });
      let bodyHtml = "";
      if (src.body) {
        try {
          bodyHtml = src.body(e) || "";
          if (bodyHtml) withBody++;
        } catch { /* leave head-only */ }
      } else if (contentObj) {
        try {
          bodyHtml = bodyFromContent({ title, subtitle: e.subtitle || description, sectionLabel: e.group || e.kicker, contentObj });
          if (bodyHtml) withBody++;
        } catch { /* leave head-only */ }
      }
      writeRoute(template, { path: `${src.route}${slug}` }, head, bodyHtml);
      wrote++;
    }
  }
  console.log(`[prerender] injected crawlable body content into ${withBody} library pages`);

  // A page per Honest Answer (/answers/:slug). The head is built from the
  // answer itself: the question is the title (as the page's SEOMeta has it),
  // the first paragraph, cut to a whole sentence, the description. The body
  // is the answer word for word, the essay while it is public, the book, and
  // the previous and next question.
  {
    const answers = await loadAnswers();
    const shelf = loadEssayShelf(REPO_ROOT);
    answers.forEach((a, i) => {
      const route = `/answers/${a.slug}`;
      const url = `${SITE_URL}${route}`;
      const head = buildHead({
        title: a.question,
        description: (a.paragraphs ?? [])[0] || a.question,
        url,
        image: ogImageUrl(a.question),
        type: "article",
        schemas: [breadcrumbSchema([{ name: "Home", path: "" }, SECTION_BY_ROUTE["/answers/"], { name: a.question, path: route }])],
      });
      const prev = answers[i - 1];
      const next = answers[i + 1];
      const body = article([
        `<p class="pre-eyebrow"><a href="/answers">Honest answers</a></p>`,
        `<h1>${escapeHtml(a.question)}</h1>`,
        (a.paragraphs ?? []).map((x) => `<p>${escapeHtml(x)}</p>`).join("\n"),
        argued(a),
        a.essaySlug && shelf.isPublic(a.essaySlug) ? `<p><a href="/writing/${escapeHtml(a.essaySlug)}">The full essay: ${escapeHtml(a.essayTitle ?? "")}</a></p>` : "",
        a.bookHref && a.bookTitle ? `<p><a href="${escapeHtml(a.bookHref)}">The book behind it: ${escapeHtml(a.bookTitle)}</a></p>` : "",
        `<nav aria-label="Previous and next question"><ul>`,
        prev ? `<li><a href="/answers/${escapeHtml(prev.slug)}">Previous: ${escapeHtml(prev.question)}</a></li>` : "",
        next ? `<li><a href="/answers/${escapeHtml(next.slug)}">Next: ${escapeHtml(next.question)}</a></li>` : "",
        `<li><a href="/answers">All the questions</a></li>`,
        `</ul></nav>`,
      ]);
      writeRoute(template, { path: route }, head, body);
      wrote++;
    });
    console.log(`[prerender] wrote ${answers.length} Honest Answer pages`);
  }

  // The tracks (/tracks/:slug and /tracks/:slug/:n), from client/public/tracks.
  // A track's head is its own title and subtitle, and its body the sessions
  // in order. A session's body is the session as the page shows it: the
  // teaching, the page it opens, the question, the thing to do, the verse,
  // any care line, and the group guide.
  {
    const index = readJsonSafe("client/public/tracks/index.json");
    let n = 0;
    const linkLi = (l) => `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>: ${escapeHtml(l.why)}</li>`;
    for (const brief of index?.tracks || []) {
      const t = readJsonSafe(`client/public/tracks/${brief.slug}.json`);
      if (!t) continue;
      const total = t.sessions.length;
      const route = `/tracks/${t.slug}`;
      const crumbs = [{ name: "Home", path: "" }, SECTION_BY_ROUTE["/tracks/"], { name: t.title, path: route }];
      // The page's one data file, asked for with the page (the same request its fetch makes).
      const data = `\n    <link rel="preload" as="fetch" crossorigin="anonymous" href="/tracks/${t.slug}.json">`;
      const title = `${t.title}: A Track in ${total} Sessions`;
      writeRoute(
        template,
        { path: route },
        buildHead({ title, description: t.subtitle, url: `${SITE_URL}${route}`, image: ogImageUrl(t.title), type: "article", schemas: [breadcrumbSchema(crumbs)] }) + data,
        article([
          `<p class="pre-eyebrow"><a href="/tracks">Tracks</a></p>`,
          `<h1>${escapeHtml(t.title)}</h1>`,
          `<p class="pre-subtitle">${escapeHtml(t.subtitle)}</p>`,
          t.intro.map((x) => `<p>${escapeHtml(x)}</p>`).join("\n"),
          sec(`The ${total} sessions`, `<ol>\n${t.sessions.map((x) => `<li><a href="${route}/${x.n}">${escapeHtml(x.title)}</a>: about ${x.minutes} minutes. Opens: ${escapeHtml(x.open.label)}.</li>`).join("\n")}\n</ol>`),
        ]),
      );
      n++;
      for (const x of t.sessions) {
        const sRoute = `${route}/${x.n}`;
        const sTitle = `${x.title}, Session ${x.n} of ${total}`;
        const prev = t.sessions[x.n - 2];
        const next = t.sessions[x.n];
        writeRoute(
          template,
          { path: sRoute },
          buildHead({
            title: sTitle,
            description: x.teaching[0].split(/(?<=[.?])\s/).slice(0, 2).join(" "),
            url: `${SITE_URL}${sRoute}`,
            image: ogImageUrl(x.title),
            type: "article",
            schemas: [breadcrumbSchema([...crumbs, { name: x.title, path: sRoute }])],
          }) + data,
          article([
            `<p class="pre-eyebrow"><a href="${route}">${escapeHtml(t.title)}</a>, session ${x.n} of ${total}</p>`,
            `<h1>${escapeHtml(x.title)}</h1>`,
            x.teaching.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n"),
            (x.care || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("\n"),
            sec("Then open this", `<ul>\n${[x.open, ...(x.also || [])].map(linkLi).join("\n")}\n</ul>`),
            sec("One question", `<p>${escapeHtml(x.question)}</p>`),
            sec("One thing to do", `<p>${escapeHtml(x.do)}</p>`),
            sec("One verse to keep", `<blockquote><p>${escapeHtml(x.verse.text)}</p><p>${escapeHtml(x.verse.ref)}, Berean Standard Bible</p></blockquote>`),
            sec("With a group", [`<p>${escapeHtml(x.group.open)}</p>`, `<ol>\n${x.group.discuss.map((q) => `<li>${escapeHtml(q)}</li>`).join("\n")}\n</ol>`, `<p>${escapeHtml(x.group.pray)}</p>`].join("\n")),
            `<nav aria-label="Previous and next session"><ul>`,
            prev ? `<li><a href="${route}/${prev.n}">Session ${prev.n}: ${escapeHtml(prev.title)}</a></li>` : "",
            next ? `<li><a href="${route}/${next.n}">Session ${next.n}: ${escapeHtml(next.title)}</a></li>` : "",
            `<li><a href="${route}">All ${total} sessions</a></li>`,
            `</ul></nav>`,
          ]),
        );
        n++;
      }
      // The leader's guide (/tracks/:slug/leader), when the track has one: how
      // to run the group, then every session's group guide in order, as the page
      // shows them. Its head matches the page's own SEOMeta (TrackLeader.tsx).
      const groupGuide = (x) =>
        [
          `<p>Before you meet, each person opens <a href="${escapeHtml(x.open.href)}">${escapeHtml(x.open.label)}</a>.</p>`,
          `<p>${escapeHtml(x.question)}</p>`,
          `<p>${escapeHtml(x.group.open)}</p>`,
          `<ol>\n${x.group.discuss.map((q) => `<li>${escapeHtml(q)}</li>`).join("\n")}\n</ol>`,
          `<p>${escapeHtml(x.verse.text)} (${escapeHtml(x.verse.ref)})</p>`,
          `<p>${escapeHtml(x.group.pray)}</p>`,
          (x.care || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("\n"),
        ].join("\n");
      if (t.leader) {
        const lRoute = `${route}/leader`;
        writeRoute(
          template,
          { path: lRoute },
          buildHead({
            title: `Leader's Guide: ${t.title}`,
            description: `How to run a small group through ${t.title}, ${total} sessions: the group, the room, the order of a meeting, hard questions, and each session's group guide.`,
            url: `${SITE_URL}${lRoute}`,
            image: ogImageUrl(`Leader's guide: ${t.title}`),
            type: "article",
            schemas: [breadcrumbSchema([...crumbs, { name: "Leader's guide", path: lRoute }])],
          }) + data,
          article([
            `<p class="pre-eyebrow"><a href="${route}">${escapeHtml(t.title)}</a></p>`,
            `<h1>${escapeHtml(`Leader's guide: ${t.title}`)}</h1>`,
            t.leader.about.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n"),
            ...t.leader.sections.map((p) =>
              sec(p.title, [p.body.map((b) => `<p>${escapeHtml(b)}</p>`).join("\n"), p.steps ? `<ol>\n${p.steps.map((x) => `<li>${escapeHtml(x)}</li>`).join("\n")}\n</ol>` : ""].join("\n")),
            ),
            sec(`The ${total} sessions, in order`, t.sessions.map((x) => `<h3><a href="${route}/${x.n}">Session ${x.n}: ${escapeHtml(x.title)}</a></h3>\n${groupGuide(x)}`).join("\n")),
            `<p><a href="${route}/print">The whole track on one page, to print</a></p>`,
          ]),
        );
        n++;
      }
      // The whole track on one page, to print (/tracks/:slug/print).
      const pRoute = `${route}/print`;
      writeRoute(
        template,
        { path: pRoute },
        buildHead({
          title: `${t.title}: The Whole Track, to Print`,
          description: `All ${total} sessions of ${t.title} on one page, to print or keep: the teaching, the page each session opens, one question, one thing to do, one verse, and the group guide.`,
          url: `${SITE_URL}${pRoute}`,
          image: ogImageUrl(t.title),
          type: "article",
          schemas: [breadcrumbSchema([...crumbs, { name: "The whole track, to print", path: pRoute }])],
        }) + data,
        article([
          `<p class="pre-eyebrow"><a href="${route}">${escapeHtml(t.title)}</a>, the whole track</p>`,
          `<h1>${escapeHtml(t.title)}</h1>`,
          `<p class="pre-subtitle">${escapeHtml(t.subtitle)}</p>`,
          t.intro.map((x) => `<p>${escapeHtml(x)}</p>`).join("\n"),
          ...t.sessions.map((x) =>
            sec(
              `Session ${x.n}: ${x.title}`,
              [
                x.teaching.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n"),
                (x.care || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("\n"),
                `<ul>\n${[x.open, ...(x.also || [])].map(linkLi).join("\n")}\n</ul>`,
                `<p>${escapeHtml(x.question)}</p>`,
                `<p>${escapeHtml(x.do)}</p>`,
                `<blockquote><p>${escapeHtml(x.verse.text)}</p><p>${escapeHtml(x.verse.ref)}, Berean Standard Bible</p></blockquote>`,
                `<p>${escapeHtml(x.group.open)}</p>`,
                `<ol>\n${x.group.discuss.map((q) => `<li>${escapeHtml(q)}</li>`).join("\n")}\n</ol>`,
                `<p>${escapeHtml(x.group.pray)}</p>`,
              ].join("\n"),
            ),
          ),
        ]),
      );
      n++;
    }
    wrote += n;
    console.log(`[prerender] wrote ${n} track, session, leader's guide and print pages`);
  }

  // A page per finished stop of the Bible Explorer (/study/explorer/:slug).
  // The head is the stop's own (its title, its line for older readers); the
  // body is the story at both reading levels, the verses, and the chapters.
  {
    const d = readJsonSafe("client/public/explorer/index.json");
    let n = 0;
    for (const st of (d?.stops || []).filter((x) => x.status === "finished")) {
      const s = readJsonSafe(`client/public/explorer/stops/${st.slug}.json`);
      if (!s) continue;
      const route = `/study/explorer/${s.slug}`;
      const title = `${s.title}: Bible Explorer`;
      const head = buildHead({
        title,
        description: s.summary.older,
        url: `${SITE_URL}${route}`,
        image: ogImageUrl(title),
        type: "article",
        schemas: [breadcrumbSchema([{ name: "Home", path: "" }, { name: "Bible Explorer", path: "/study/explorer" }, { name: s.title, path: route }])],
      });
      const paras = (list) => (list || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("\n");
      const body = article([
        `<p class="pre-eyebrow"><a href="/study/explorer">Bible Explorer</a></p>`,
        `<h1>${escapeHtml(s.title)}</h1>`,
        `<p class="pre-subtitle">${escapeHtml(s.summary.younger)}</p>`,
        sec("The story, for ages 7 to 11", paras(s.story?.younger)),
        sec("The story, for ages 12 to 16", paras(s.story?.older)),
        sec("What this shows us about God", `<p>${escapeHtml(s.god?.younger ?? "")}</p><p>${escapeHtml(s.god?.older ?? "")}</p>`),
        (s.verses || []).map((v) => `<blockquote>${escapeHtml(v.text)} <strong>${escapeHtml(v.ref)}</strong></blockquote>`).join("\n"),
        sec("Read it yourself", `<ul>${(s.read || []).map((r) => `<li><a href="${escapeHtml(r.href)}">${escapeHtml(r.label)}</a></li>`).join("")}</ul>`),
        `<p><a href="/study/explorer">The whole map</a></p>`,
      ]);
      writeRoute(template, { path: route }, head, body);
      wrote++;
      n++;
    }
    console.log(`[prerender] wrote ${n} Bible Explorer stops`);
  }

  // A page per finished moving picture of the Bible Explorer
  // (/study/explorer/watch/:slug). The head matches the page's own SEOMeta
  // (FILM_META in ExplorerFilm.tsx, held to the film's file by a test); the
  // body is every frame's caption at both reading levels, with its verse, so
  // the film reads in full before the script arrives.
  {
    const d = readJsonSafe("client/public/explorer/index.json");
    let n = 0;
    for (const fs0 of (d?.films || []).filter((x) => x.status === "finished")) {
      const f = readJsonSafe(`client/public/explorer/films/${fs0.slug}.json`);
      if (!f) continue;
      const route = `/study/explorer/watch/${f.slug}`;
      const title = `${f.title}: Bible Explorer`;
      // A shared link shows the film's own opening card (its poster,
      // written by scripts/export-film-video.mjs, 1200 by 630).
      const poster = `client/public/explorer/video/${f.slug}-poster.jpg`;
      const head = buildHead({
        title,
        description: f.line.older,
        url: `${SITE_URL}${route}`,
        image: fs.existsSync(poster) ? `${SITE_URL}/explorer/video/${f.slug}-poster.jpg` : ogImageUrl(title),
        type: "article",
        schemas: [breadcrumbSchema([{ name: "Home", path: "" }, { name: "Bible Explorer", path: "/study/explorer" }, { name: f.title, path: route }])],
      });
      const frame = (fr, i) =>
        `<li><h3>${i + 1}. ${escapeHtml(fr.name)}</h3><p>${escapeHtml(fr.younger)}</p><p>${escapeHtml(fr.older)}</p>${fr.verse ? `<blockquote>${escapeHtml(fr.verse.text)} <strong>${escapeHtml(fr.verse.ref)}</strong></blockquote>` : ""}</li>`;
      const body = article([
        `<p class="pre-eyebrow"><a href="/study/explorer">Bible Explorer</a></p>`,
        `<h1>${escapeHtml(f.title)}</h1>`,
        `<p class="pre-subtitle">${escapeHtml(f.line.younger)}</p>`,
        sec(`A moving picture in ${f.frames.length} parts`, `<ol>\n${f.frames.map(frame).join("\n")}\n</ol>`),
        sec("Think about it", `<p>${escapeHtml(f.think.younger)}</p><p>${escapeHtml(f.think.older)}</p>`),
        f.differ ? sec("Where churches differ", `<p>${escapeHtml(f.differ.text)} ${f.differ.links.map((l, i, all) => `${i === 0 ? "" : i === all.length - 1 ? " and " : ", "}<a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>`).join("")}.</p>`) : "",
        sec("Where the Bible says it", `<ul>${(f.read || []).map((r) => `<li><a href="${escapeHtml(r.href)}">${escapeHtml(r.label)}</a></li>`).join("")}</ul>`),
        `<p><a href="/study/explorer#watch">Everything in Watch and learn</a></p>`,
      ]);
      writeRoute(template, { path: route }, head, body);
      wrote++;
      n++;
    }
    console.log(`[prerender] wrote ${n} Bible Explorer moving pictures`);
  }

  wrote += prerenderQuestions(template);

  const studyBible = prerenderStudyBible(template);
  wrote += studyBible;
  console.log(`[prerender] wrote ${studyBible} Study Bible pages (books, chapters, acts, doctrines)`);

  // Route-table extraction: every static route whose component declares
  // <SEOMeta title="..." description="..." /> as string literals gets a real
  // head built from its own copy — the prerendered head is exactly what the
  // SPA renders client-side. Param routes, admin, thank-you flows, and
  // noindex pages are skipped; curated STATIC_PAGES above win on conflict.
  const written = new Set([...STATIC_PAGES, SUPPORT_HEAD].map((p) => p.path));
  const appSrc = fs.readFileSync(path.join(REPO_ROOT, "client/src/App.tsx"), "utf8");
  const importMap = {};
  // Two lazy forms are in use: the one-liner `lazy(() => import("./pages/X"))`
  // and the named-export form, which wraps and usually breaks across lines:
  //   const X = lazy(() =>
  //     import("./pages/X").then((m) => ({ default: m.X }))
  //   );
  // Matching only the first form silently dropped the second from prerendering
  // — a page could ship a perfect literal <SEOMeta> and still serve the
  // homepage head. Match up to the closing quote of the import path and let
  // whatever follows be whatever it is.
  for (const m of appSrc.matchAll(/const (\w+) = lazy\(\(\) =>\s*import\("(\.\/pages\/[^"]+)"/g)) {
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
    if (!rel) {
      // A redirect route (ToToolsRedirect, ToStudyRedirect, …) has no
      // page of its own and needs no head; it is not an uncovered page.
      if (/Redirect$/.test(comp)) continue;
      // Report rather than skip in silence. A component the import scanner
      // cannot resolve is exactly how /book-bundles and /article-collections
      // went un-prerendered without anything saying so.
      uncovered.push(`${routePath} (component ${comp} — import not resolved)`);
      continue;
    }
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
    // A page that says noindex (the off-shelf book pages, /roadmap) gets its
    // own head with noindex in it, so the static file says what the page says
    // instead of serving the shell's "index, follow".
    // A conditional noindex={...} cannot be resolved here; skip it as before.
    if (/\bnoindex=\{/.test(tag)) continue;
    const pageNoindex = /\bnoindex\b/.test(tag);
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
    const own = await pageBody(routePath, title);
    const head = buildHead({
      title,
      description,
      url,
      image: ogImageUrl(title),
      type: "website",
      noindex: pageNoindex,
      schemas: own?.schemas ?? [],
    });
    writeRoute(template, { path: routePath }, own?.headExtra ? `${head}\n    ${own.headExtra}` : head, own?.html || hubListingHtml(routePath));
    written.add(routePath);
    extracted++;
    wrote++;
  }
  console.log(`[prerender] extracted ${extracted} route heads from component SEOMeta literals`);
  if (uncovered.length) {
    console.log(`[prerender] ${uncovered.length} static routes still serve the homepage head (no literal SEOMeta):`);
    for (const u of uncovered) console.log(`  - ${u}`);
  }

  // Track which /writing/:slug essays already got prerendered from the DB, so
  // the static-library pass below doesn't double-write them.
  const writtenEssaySlugs = new Set();

  // Slugs whose database row exists but is unpublished: the admin takedown.
  // The API 404s them and never falls back to a static copy, so neither the
  // static-library pass nor the shelf pass below may write them a head.
  const unpublishedSlugs = new Set();

  // DB-driven pages
  const conn = await loadDb();
  if (conn) {
    try {
      try {
        const [hidden] = await conn.query("SELECT slug FROM posts WHERE published = false");
        for (const r of hidden) if (r?.slug) unpublishedSlugs.add(r.slug);
      } catch { /* legacy schema: nothing to hold back */ }
      const [posts] = await conn.query(
        `SELECT ${await selectList(conn, "posts", ["slug", "title", "excerpt", "pillar", "body", "coverImage", "publishedAt", "updatedAt", "createdAt"])} FROM posts WHERE published = true`
      );
      for (const row of posts) {
        const visibility = SHELF.visibility(row.slug, essayDate(row));
        if (visibility === "retired" || visibility === "pending") {
          const pending = visibility === "pending";
          writeRetiredEssay(template, { slug: row.slug, title: pending ? SHELF.entries.get(row.slug).title : row.title, pending });
          wrote++;
          writtenEssaySlugs.add(row.slug);
          continue;
        }
        const post = withRewrite(row);
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
          schemas: [
            articleSchema(post, url, image),
            breadcrumbSchema([
              { name: "Home", path: "" },
              { name: "Writing", path: "/writing" },
              { name: post.title, path: `/writing/${post.slug}` },
            ]),
          ],
        });
        const bodyHtml = bodyFromContent({
          title: post.title,
          subtitle: post.excerpt || "",
          sectionLabel: post.pillar || "",
          markdown: post.body || "",
        });
        writeRoute(template, { path: `/writing/${post.slug}` }, head, bodyHtml);
        wrote++;
        writtenEssaySlugs.add(post.slug);
      }

      const [books] = await conn.query(
        `SELECT ${await selectList(conn, "books", ["slug", "title", "description", "author", "coverImage"])} FROM books WHERE published = true AND slug IS NOT NULL`
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
          // Only the three books on the /books shelf are offered to crawlers.
          noindex: !SHELF_BOOK_SLUGS.has(book.slug),
          schemas: [
            bookSchema(book, url, image),
            breadcrumbSchema([
              { name: "Home", path: "" },
              { name: "Books", path: "/books" },
              { name: book.title, path: `/books/${book.slug}` },
            ]),
          ],
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
    } catch (e) {
      // A database problem costs the database pages only; the static essay
      // library below must still be written (it used to be skipped entirely,
      // leaving every essay with the homepage's title and description).
      console.error(`[prerender] database pages skipped: ${e.message}`);
    } finally {
      await conn.end();
    }
  }

  // Static-library essays. These are served by api/index.ts behind the live DB
  // (no DB row of their own), so without this pass they appear in the sitemap
  // but get the generic SPA shell head and an empty crawlable body. Prerender
  // every static essay not already written from the DB. Runs with or without a
  // DB connection, since the generated file is a committed build artifact.
  try {
    const staticLib = JSON.parse(
      fs.readFileSync(path.join(REPO_ROOT, "content/static-library.generated.json"), "utf8")
    );
    let staticWrote = 0;
    let staticRetired = 0;
    for (const raw of staticLib) {
      if (!raw || !raw.slug || raw.published === false) continue;
      if (writtenEssaySlugs.has(raw.slug) || TAKEN_DOWN.has(raw.slug) || unpublishedSlugs.has(raw.slug)) continue;
      const visibility = SHELF.visibility(raw.slug, essayDate(raw));
      if (visibility === "retired" || visibility === "pending") {
        const pending = visibility === "pending";
        writeRetiredEssay(template, { slug: raw.slug, title: pending ? SHELF.entries.get(raw.slug).title : raw.title, pending });
        wrote++;
        staticRetired++;
        writtenEssaySlugs.add(raw.slug);
        continue;
      }
      const rec = withRewrite(raw);
      const url = `${SITE_URL}/writing/${rec.slug}`;
      const image = rec.coverImage || ogImageUrl(rec.title, rec.pillar || undefined);
      const description = rec.excerpt || rec.title;
      const publishedIso = rec.publishedAt
        ? new Date(rec.publishedAt).toISOString()
        : new Date(rec.createdAt || Date.parse("2026-01-01")).toISOString();
      const modifiedIso = rec.updatedAt ? new Date(rec.updatedAt).toISOString() : publishedIso;
      const head = buildHead({
        title: rec.title,
        description,
        url,
        image,
        type: "article",
        publishedDate: publishedIso,
        modifiedDate: modifiedIso,
        schemas: [articleSchema(rec, url, image)],
      });
      const bodyHtml = bodyFromContent({
        title: rec.title,
        subtitle: rec.excerpt || "",
        sectionLabel: rec.pillar || "",
        markdown: rec.body || "",
      });
      writeRoute(template, { path: `/writing/${rec.slug}` }, head, bodyHtml);
      wrote++;
      staticWrote++;
      writtenEssaySlugs.add(rec.slug);
    }
    console.log(`[prerender] static library: ${staticWrote} essays prerendered, ${staticRetired} retired notices (of ${staticLib.length})`);
  } catch (e) {
    console.warn(`[prerender] static library skipped: ${e.message}`);
  }

  // The shelf itself: a public shelf essay neither pass above wrote (a build
  // with no database, or a rewrite with no row anywhere) still gets its own
  // head, from its rewrite or the committed shelf, so it never unfurls as the
  // home page.
  let shelfWrote = 0;
  for (const e of SHELF.liveEssays()) {
    if (writtenEssaySlugs.has(e.slug) || unpublishedSlugs.has(e.slug)) continue;
    const rewrite = SHELF.overrideRecords.get(e.slug);
    const url = `${SITE_URL}/writing/${e.slug}`;
    const title = rewrite?.title || e.title;
    const description = (rewrite ? rewrite.excerpt : e.blurb) || title;
    const image = ogImageUrl(title);
    const rec = rewrite
      ? { slug: e.slug, title, excerpt: rewrite.excerpt, body: rewrite.body, publishedAt: rewrite.updated, createdAt: rewrite.updated, updatedAt: rewrite.updated }
      : null;
    const head = buildHead({
      title,
      description,
      url,
      image,
      type: "article",
      publishedDate: rec ? new Date(rec.publishedAt).toISOString() : undefined,
      modifiedDate: rec ? new Date(rec.updatedAt).toISOString() : undefined,
      schemas: rec ? [articleSchema(rec, url, image)] : [],
    });
    const bodyHtml = rec ? bodyFromContent({ title, subtitle: rec.excerpt, sectionLabel: "", markdown: rec.body }) : "";
    writeRoute(template, { path: `/writing/${e.slug}` }, head, bodyHtml);
    wrote++;
    shelfWrote++;
    writtenEssaySlugs.add(e.slug);
  }
  if (shelfWrote) console.log(`[prerender] shelf: ${shelfWrote} essays written from the shelf (no database or static row)`);

  console.log(`[prerender] wrote ${wrote} per-route HTML files into ${DIST_DIR}`);
  // llms.txt names the Support page only once giving is open; the committed file never does.
  if (writeBuiltLlms(DIST_DIR)) console.log("[prerender] added the Support page to llms.txt (giving is open)");
}

/**
 * The apologetics library (client/public/questions/, scripts/lib/questions.mjs):
 * the room, the claims index, each area with a page, and each piece, its
 * whole text in the static shell for first paint. A pending page's head says
 * noindex (the SPA's SEOMeta says the same) and its text carries the review
 * line; none of them is in the sitemap. A live page lists only live pages.
 */
const QUESTIONS_REVIEW = "This page is being reviewed and is not yet published.";
function prerenderQuestions(template) {
  const q = loadQuestions(REPO_ROOT);
  if (!q.areas.length) return 0;
  let n = 0;
  const review = (pending) => (pending ? `<p class="pre-subtitle">${escapeHtml(QUESTIONS_REVIEW)}</p>` : "");
  const room = { name: "The case for the faith", path: "/questions" };
  const write = (route, { title, description, pending, type = "website", crumbs, body }) => {
    const head = buildHead({
      title,
      description,
      url: `${SITE_URL}${route}`,
      image: ogImageUrl(title),
      type,
      noindex: pending,
      schemas: pending ? [] : [breadcrumbSchema([{ name: "Home", path: "" }, ...crumbs])],
    });
    writeRoute(template, { path: route }, head, body);
    n++;
  };
  const shown = (a, pending) => a.pieces.filter((p) => p.live || pending);
  const list = (items) => `<ul>\n${items.map((x) => `<li>${inline(x)}</li>`).join("\n")}\n</ul>`;

  // The room and the claims index (pending while no area is live).
  const roomPending = !q.roomLive;
  write("/questions", {
    title: "The case for the faith",
    description: "Hard questions about Christianity, taken one at a time: the objection at its strongest, what is true in it, the evidence, the argument, and books on both sides.",
    pending: roomPending,
    crumbs: [room],
    body: article([
      `<p class="pre-eyebrow"><a href="/topics">Questions</a></p>`,
      `<h1>The case for the faith</h1>`,
      review(roomPending),
      sec("Ten areas", `<ol>\n${q.areas.map((a) => {
        const k = shown(a, roomPending).length;
        return k && a.page ? `<li><a href="/questions/${escapeHtml(a.slug)}">${escapeHtml(a.title)}</a> (${k} ${k === 1 ? "piece" : "pieces"})${a.line ? `. ${escapeHtml(a.line)}` : ""}</li>` : `<li>${escapeHtml(a.title)} (being written)</li>`;
      }).join("\n")}\n</ol>`),
    ]),
  });
  const claims = q.areas.flatMap((a) => a.pieces.filter((p) => p.live || roomPending).flatMap((p) => (p.claims || []).map((c) => ({ ...c, a, p }))));
  write("/questions/claims", {
    title: "Look up a claim",
    description: "Claims made against the Christian faith, each with the work it comes from and a link to the page that answers it.",
    pending: roomPending,
    crumbs: [room, { name: "Look up a claim", path: "/questions/claims" }],
    body: article([
      `<p class="pre-eyebrow"><a href="/questions">The case for the faith</a></p>`,
      `<h1>Look up a claim</h1>`,
      review(roomPending),
      `<ul>\n${claims.map((c) => `<li>${escapeHtml(c.claim)}. ${escapeHtml(c.proponent)}, <cite>${escapeHtml(c.work)}</cite> (${c.year}). <a href="/questions/${escapeHtml(c.a.slug)}/${escapeHtml(c.p.slug)}">${escapeHtml(c.p.question)}</a></li>`).join("\n")}\n</ul>`,
    ]),
  });

  for (const a of q.areas.filter((x) => x.page)) {
    const areaRoute = `/questions/${a.slug}`;
    const pg = a.page;
    write(areaRoute, {
      title: a.title,
      description: pg.intro.split("\n\n")[0],
      pending: !a.live,
      crumbs: [room, { name: a.title, path: areaRoute }],
      body: article([
        `<p class="pre-eyebrow"><a href="/questions">The case for the faith</a></p>`,
        `<h1>${escapeHtml(a.title)}</h1>`,
        review(!a.live),
        mdToHtml(pg.intro),
        sec("The questions", `<ol>\n${shown(a, !a.live).map((p) => `<li><a href="/questions/${escapeHtml(a.slug)}/${escapeHtml(p.slug)}">${escapeHtml(p.question)}</a></li>`).join("\n")}\n</ol>`),
        sec("Words these pages use", `<dl>\n${(pg.words || []).map((w) => `<dt>${escapeHtml(w.term)}</dt><dd>${escapeHtml(w.meaning)}</dd>`).join("\n")}\n</dl>`),
        sec("Where else to look", list(pg.elsewhere || [])),
      ]),
    });
    for (const p of a.pieces) {
      const route = `/questions/${a.slug}/${p.slug}`;
      const parts = p.sections.map((s) =>
        sec(s.heading, s.role === "argument"
          ? [mdToHtml(s.intro), `<ol>\n${s.steps.map((t) => `<li>${inline(t)}</li>`).join("\n")}\n</ol>`, `<p><strong>${inline(s.conclusion)}</strong></p>`, mdToHtml(s.after)].join("\n")
          : mdToHtml(s.body))
      );
      write(route, {
        title: p.question,
        description: p.shortAnswer,
        pending: !p.live,
        type: "article",
        crumbs: [room, { name: a.title, path: areaRoute }, { name: p.question, path: route }],
        body: article([
          `<p class="pre-eyebrow"><a href="${areaRoute}">${escapeHtml(a.title)}</a></p>`,
          `<h1>${escapeHtml(p.question)}</h1>`,
          review(!p.live),
          sec("The short answer", mdToHtml(p.shortAnswer)),
          ...parts,
          sec("Read the other side", list(p.otherSide || [])),
          sec("Read further", list(p.further || [])),
          sec("On the site", list(p.onSite || [])),
        ]),
      });
    }
  }
  console.log(`[prerender] wrote ${n} pages of the questions library (${q.roomLive ? "room live" : "all pending, noindex"})`);
  return n;
}

main().catch(err => {
  console.error("[prerender] failed:", err.message);
  // Don't fail the deploy — the SPA shell still works
  process.exit(0);
});
