// LiveWell serverless entry (Vercel @vercel/node, ESM).
// Self-contained: no ../server/* imports. Uses only package deps.
import type { VercelRequest, VercelResponse } from "@vercel/node";
import mysql from "mysql2/promise";

async function withConn<T>(fn: (c: mysql.Connection) => Promise<T>): Promise<T> {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  const conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: true } });
  try { return await fn(conn); } finally { await conn.end(); }
}

function authed(req: VercelRequest): boolean {
  const key = (req.query.key as string) || (req.headers["x-seed-key"] as string) || "";
  return Boolean(process.env.JWT_SECRET) && key === process.env.JWT_SECRET;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,x-seed-key",
};

function json(res: VercelResponse, status: number, body: any) {
  for (const [k, v] of Object.entries(CORS)) res.setHeader(k, v);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(status).send(JSON.stringify(body));
}

async function readBody(req: VercelRequest): Promise<any> {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch { return {}; } }
  return {};
}

async function health(_req: VercelRequest, res: VercelResponse) {
  const out: any = {
    ok: true,
    ts: new Date().toISOString(),
    hasDbUrl: Boolean(process.env.DATABASE_URL),
    hasJwtSecret: Boolean(process.env.JWT_SECRET),
  };
  if (process.env.DATABASE_URL) {
    try {
      const result = await withConn(async (c) => {
        const [rows] = await c.query("SELECT 1 as ping");
        return rows;
      });
      out.dbReachable = true;
      out.dbResult = JSON.stringify(result).slice(0, 120);
      const tables = await withConn(async (c) => {
        const [rows] = await c.query("SHOW TABLES");
        return rows;
      });
      out.tableCount = Array.isArray(tables) ? tables.length : 0;
    } catch (e: any) {
      out.dbReachable = false;
      out.dbError = String(e?.message || e).slice(0, 400);
    }
  }
  json(res, 200, out);
}

const SCHEMA_SQL = [
  `CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(191) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    subtitle VARCHAR(1000),
    excerpt TEXT,
    body LONGTEXT,
    topic VARCHAR(64),
    pillar VARCHAR(64),
    source VARCHAR(32) DEFAULT 'livewell',
    external_url VARCHAR(1000),
    image_url VARCHAR(1000),
    word_count INT,
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_topic (topic),
    INDEX idx_pillar (pillar),
    INDEX idx_published (published_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(320) NOT NULL UNIQUE,
    name VARCHAR(200),
    source VARCHAR(64),
    tier VARCHAR(32) DEFAULT 'free',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    confirmed_at DATETIME NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS rss_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(64) NOT NULL,
    payload LONGTEXT,
    fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_source (source)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS pcn_signups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(320) NOT NULL,
    name VARCHAR(200),
    church VARCHAR(300),
    role VARCHAR(100),
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

async function adminSeed(req: VercelRequest, res: VercelResponse) {
  if (!authed(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const out = await withConn(async (c) => {
      for (const sql of SCHEMA_SQL) { await c.query(sql); }
      const [tables] = await c.query("SHOW TABLES");
      return { tables };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) { json(res, 500, { ok: false, error: String(e?.message || e) }); }
}

async function adminSeedArticles(req: VercelRequest, res: VercelResponse) {
  if (!authed(req)) return json(res, 401, { error: "unauthorized" });
  const seeds = [
    { slug: "constantines-bargain", title: "Constantine's Bargain", subtitle: "The day the cross picked up a sword", excerpt: "When the empire baptized itself, the church inherited a throne it was never given. We are still paying the bill.", topic: "prophetic", pillar: "Prophetic Disruption", word_count: 2400 },
    { slug: "god-bless-america-replaces-thy-kingdom-come", title: "When God Bless America Replaces Thy Kingdom Come", subtitle: "How patriotism became our practical savior", excerpt: "Civil religion is idolatry with a flag for a shroud. America is not Israel. The new covenant is made with people through Christ's blood, not with nations.", topic: "prophetic", pillar: "Prophetic Justice", word_count: 3100 },
    { slug: "the-generational-cost", title: "The Generational Cost", subtitle: "When hypocrisy makes the gospel unbelievable", excerpt: "Our children do not leave the faith because they have heard too little. They leave because they have seen too much.", topic: "leadership", pillar: "Leadership Formation", word_count: 2800 },
    { slug: "hustle-culture-is-idolatry", title: "Hustle Culture Is Idolatry", subtitle: "The Protestant work ethic never meant this", excerpt: "We baptized exhaustion. We called overwork faithful. We dressed burnout in vocational language and handed it to pastors with a smile.", topic: "integrated-life", pillar: "Integrated Life", word_count: 2200 },
    { slug: "zanah-when-you-keep-the-vows", title: "Zanah: When You Keep the Vows and Give Away the Heart", subtitle: "On fidelity, resentment, and the slow drift", excerpt: "The Hebrew prophets used one word for a particular kind of unfaithfulness â the kind that keeps the address and gives the rest away.", topic: "marriage", pillar: "Integrated Life", word_count: 2600 },
    { slug: "why-we-need-each-other", title: "Why We Need Each Other", subtitle: "Pastor loneliness is a crisis. Brotherhood is the answer.", excerpt: "Pastors are dying in isolation and nobody is saying it loud enough. The network exists because the crisis is real.", topic: "pcn", pillar: "Leadership Formation", word_count: 2100 },
    { slug: "germanys-warning", title: "Germany's Warning", subtitle: "Baptized nationalism and moral catastrophe", excerpt: "They sang hymns on Sunday. They saluted on Monday. They did not see the contradiction until it was too late. We are not smarter than they were.", topic: "prophetic", pillar: "Prophetic Disruption", word_count: 2900 },
    { slug: "the-mirror-doesnt-lie", title: "The Mirror Doesn't Lie", subtitle: "But we keep trying to bribe it", excerpt: "The problem is not that we cannot see ourselves. The problem is that we have edited the reflection so long we no longer recognize the cost.", topic: "theological", pillar: "Theological Depth", word_count: 2500 },
  ];
  try {
    const out = await withConn(async (c) => {
      let inserted = 0;
      for (const s of seeds) {
        const [r]: any = await c.execute(
          `INSERT IGNORE INTO articles (slug, title, subtitle, excerpt, topic, pillar, source, word_count, published_at)
           VALUES (?, ?, ?, ?, ?, ?, 'livewell', ?, NOW())`,
          [s.slug, s.title, s.subtitle, s.excerpt, s.topic, s.pillar, s.word_count]
        );
        if (r.affectedRows) inserted++;
      }
      const [rows] = await c.query("SELECT COUNT(*) as n FROM articles");
      return { inserted, total: (rows as any)[0].n };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) { json(res, 500, { ok: false, error: String(e?.message || e) }); }
}

async function listArticles(req: VercelRequest, res: VercelResponse) {
  try {
    const limit = Math.min(parseInt(String(req.query.limit || "50"), 10) || 50, 200);
    const topic = req.query.topic as string | undefined;
    const out = await withConn(async (c) => {
      let sql = "SELECT id, slug, title, subtitle, excerpt, topic, pillar, source, external_url, image_url, word_count, published_at FROM articles";
      const params: any[] = [];
      if (topic) { sql += " WHERE topic = ?"; params.push(topic); }
      sql += ` ORDER BY published_at DESC LIMIT ${limit}`;
      const [rows] = await c.execute(sql, params);
      return rows;
    });
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    json(res, 200, { ok: true, articles: out });
  } catch (e: any) { json(res, 500, { ok: false, error: String(e?.message || e) }); }
}

async function getArticle(req: VercelRequest, res: VercelResponse, slug: string) {
  try {
    const out = await withConn(async (c) => {
      const [rows]: any = await c.execute("SELECT * FROM articles WHERE slug = ? LIMIT 1", [slug]);
      return rows[0] || null;
    });
    if (!out) return json(res, 404, { ok: false, error: "not found" });
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    json(res, 200, { ok: true, article: out });
  } catch (e: any) { json(res, 500, { ok: false, error: String(e?.message || e) }); }
}

async function substackRss(_req: VercelRequest, res: VercelResponse) {
  const CACHE_TTL = 30 * 60 * 1000;
  try {
    const cached = await withConn(async (c) => {
      const [rows]: any = await c.execute(
        "SELECT payload, fetched_at FROM rss_cache WHERE source = 'substack' ORDER BY fetched_at DESC LIMIT 1"
      );
      return rows[0] || null;
    });
    if (cached && Date.now() - new Date(cached.fetched_at).getTime() < CACHE_TTL) {
      res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1800");
      return json(res, 200, { ok: true, cached: true, ...JSON.parse(cached.payload) });
    }
    const feedUrl = "https://livewellbyjamesbell.substack.com/feed";
    const r = await fetch(feedUrl, { headers: { "User-Agent": "LiveWellSite/1.0" } });
    if (!r.ok) throw new Error(`substack feed ${r.status}`);
    const xml = await r.text();
    const items: any[] = [];
    const re = /<item>([\s\S]*?)<\/item>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(xml)) !== null) {
      const block = m[1];
      const pick = (tag: string) => {
        const rg = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
        const x = block.match(rg);
        if (!x) return "";
        return x[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
      };
      items.push({
        title: pick("title"),
        link: pick("link"),
        pubDate: pick("pubDate"),
        description: pick("description").replace(/<[^>]+>/g, "").slice(0, 400),
        guid: pick("guid"),
      });
    }
    const payload = { items, fetchedAt: new Date().toISOString() };
    await withConn(async (c) => {
      await c.execute("INSERT INTO rss_cache (source, payload) VALUES ('substack', ?)", [JSON.stringify(payload)]);
      await c.execute("DELETE FROM rss_cache WHERE source='substack' AND id NOT IN (SELECT id FROM (SELECT id FROM rss_cache WHERE source='substack' ORDER BY fetched_at DESC LIMIT 3) t)");
    });
    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1800");
    json(res, 200, { ok: true, cached: false, ...payload });
  } catch (e: any) { json(res, 500, { ok: false, error: String(e?.message || e) }); }
}

async function subscribe(req: VercelRequest, res: VercelResponse) {
  try {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const name = body.name ? String(body.name).slice(0, 200) : null;
    const source = body.source ? String(body.source).slice(0, 64) : "site";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(res, 400, { ok: false, error: "invalid email" });
    await withConn(async (c) => {
      await c.execute(
        "INSERT INTO subscribers (email, name, source) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=COALESCE(VALUES(name), name), source=VALUES(source)",
        [email, name, source]
      );
    });
    json(res, 200, { ok: true });
  } catch (e: any) { json(res, 500, { ok: false, error: String(e?.message || e) }); }
}

async function pcnSignup(req: VercelRequest, res: VercelResponse) {
  try {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(res, 400, { ok: false, error: "invalid email" });
    const name = body.name ? String(body.name).slice(0, 200) : null;
    const church = body.church ? String(body.church).slice(0, 300) : null;
    const role = body.role ? String(body.role).slice(0, 100) : null;
    const message = body.message ? String(body.message).slice(0, 4000) : null;
    await withConn(async (c) => {
      await c.execute(
        "INSERT INTO pcn_signups (email, name, church, role, message) VALUES (?, ?, ?, ?, ?)",
        [email, name, church, role, message]
      );
    });
    json(res, 200, { ok: true });
  } catch (e: any) { json(res, 500, { ok: false, error: String(e?.message || e) }); }
}

async function sitemap(_req: VercelRequest, res: VercelResponse) {
  try {
    const base = "https://www.livewellbyjamesbell.co";
    const staticPaths = ["/", "/writing", "/books", "/about", "/pcn", "/tools", "/kits", "/marriage", "/parenting", "/doubt", "/start-here"];
    const articles = await withConn(async (c) => {
      const [rows]: any = await c.execute("SELECT slug, updated_at FROM articles ORDER BY updated_at DESC LIMIT 1000");
      return rows;
    });
    const urls = [
      ...staticPaths.map(p => ({ loc: base + p, pri: p === "/" ? "1.0" : "0.8" })),
      ...articles.map((a: any) => ({ loc: `${base}/writing/${a.slug}`, pri: "0.7", mod: new Date(a.updated_at).toISOString() })),
    ];
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc>${u.mod ? `<lastmod>${u.mod}</lastmod>` : ""}<priority>${u.pri}</priority></url>`).join("\n")}\n</urlset>`;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600");
    res.status(200).send(body);
  } catch (e: any) { json(res, 500, { ok: false, error: String(e?.message || e) }); }
}

// ---------- tRPC-compatible layer ----------
// The existing client uses @trpc/client httpBatchLink with superjson.
// We only need to shape responses so it reads data.json â no transformer needed on read.
// Response shape for a single-procedure batch: [{ result: { data: { json: <payload> } } }]

function readTime(words: number | null | undefined): number {
  const w = Number(words || 2000);
  return Math.max(3, Math.round(w / 225));
}

function toPostCard(row: any): any {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || null,
    excerpt: row.excerpt || "",
    pillar: row.pillar || "Theological Depth",
    topic: row.topic || "",
    readTime: readTime(row.word_count),
    imageUrl: row.image_url || null,
    author: "James Bell",
    createdAt: row.published_at || row.created_at || new Date().toISOString(),
    publishedAt: row.published_at || row.created_at || new Date().toISOString(),
    wordCount: row.word_count || null,
  };
}

async function trpcListPosts(): Promise<any[]> {
  return await withConn(async (c) => {
    const [rows]: any = await c.execute(
      "SELECT id, slug, title, subtitle, excerpt, topic, pillar, source, external_url, image_url, word_count, published_at, created_at FROM articles ORDER BY published_at DESC LIMIT 500"
    );
    return (rows as any[]).map(toPostCard);
  });
}

async function trpcGetPost(id: number | string): Promise<any | null> {
  return await withConn(async (c) => {
    const isNum = /^\d+$/.test(String(id));
    const sql = isNum
      ? "SELECT * FROM articles WHERE id = ? LIMIT 1"
      : "SELECT * FROM articles WHERE slug = ? LIMIT 1";
    const [rows]: any = await c.execute(sql, [id]);
    if (!rows[0]) return null;
    const row = rows[0];
    return { ...toPostCard(row), body: row.body || null, content: row.body || null };
  });
}

async function trpcListBooks(): Promise<any[]> {
  // Hardcoded in-voice book list keyed off CLAUDE.md projects. Database-backed later.
  return [
    { id: 1, slug: "the-monster-in-the-mirror", title: "The Monster in the Mirror", subtitle: "How Culture Shapes the God We Think We See", status: "published", pillar: "Prophetic Disruption", coverImage: null, description: "The monster is never in the mirror. That is the problem. A book that names six American cultural lenses distorting Scripture â and shows what reading against our own assumptions looks like.", releaseDate: "2025-09-01", createdAt: "2025-09-01T00:00:00Z" },
    { id: 2, slug: "when-god-bless-america-replaces-thy-kingdom-come", title: "When God Bless America Replaces Thy Kingdom Come", subtitle: "How Patriotism Became Our Practical Savior", status: "in-development", pillar: "Prophetic Justice", coverImage: null, description: "Civil religion is idolatry with a flag for a shroud. America is not Israel. The new covenant is made with people through Christ's blood â not with nations.", releaseDate: "2026-11-01", createdAt: "2026-01-01T00:00:00Z" },
    { id: 3, slug: "why-we-need-each-other", title: "Why We Need Each Other", subtitle: "Pastor Loneliness and the Case for Brotherhood", status: "in-development", pillar: "Leadership Formation", coverImage: null, description: "Pastor loneliness is a crisis. Brotherhood is the answer. The case for the Pastors Connection Network and the men it was built to carry.", releaseDate: "2026-06-01", createdAt: "2026-02-01T00:00:00Z" },
    { id: 4, slug: "healwell-devotionals", title: "HealWell: 52 Weeks in Costly Hope", subtitle: "A Year of Honest Devotionals for Tired Believers", status: "in-development", pillar: "Integrated Life", coverImage: null, description: "Fifty-two weeks of devotionals for people who have stopped pretending. Written from the room where people fall apart and the room where they find their footing.", releaseDate: "2026-12-01", createdAt: "2026-03-01T00:00:00Z" },
  ];
}

function trpcOk(res: VercelResponse, payload: any, status = 200) {
  for (const [k, v] of Object.entries(CORS)) res.setHeader(k, v);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=120, stale-while-revalidate=600");
  res.status(status).send(JSON.stringify([{ result: { data: { json: payload } } }]));
}

function trpcErr(res: VercelResponse, code: string, message: string, status = 500) {
  for (const [k, v] of Object.entries(CORS)) res.setHeader(k, v);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(status).send(JSON.stringify([{ error: { message, code: -32603, data: { code, httpStatus: status } } }]));
}

async function trpcHandler(req: VercelRequest, res: VercelResponse, proc: string) {
  try {
    // Parse input from query string (GET batch). POST mutations carry body.
    let input: any = null;
    if (req.method === "GET") {
      const raw = (req.query.input as string) || "";
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          input = parsed["0"]?.json ?? null;
        } catch { /* ignore */ }
      }
    } else if (req.method === "POST") {
      const body = await readBody(req);
      // Batch POST: { "0": { "json": ... } } OR bare { json: ... }
      input = body?.["0"]?.json ?? body?.json ?? body ?? null;
    }

    switch (proc) {
      case "posts.listPublished":
      case "posts.listAll": {
        const data = await trpcListPosts();
        return trpcOk(res, data);
      }
      case "posts.getById": {
        const id = input?.id ?? input;
        const row = await trpcGetPost(id);
        if (!row) return trpcErr(res, "NOT_FOUND", "post not found", 404);
        return trpcOk(res, row);
      }
      case "posts.bySlug":
      case "posts.getBySlug": {
        const slug = input?.slug ?? input;
        const row = await trpcGetPost(slug);
        if (!row) return trpcErr(res, "NOT_FOUND", "post not found", 404);
        return trpcOk(res, row);
      }
      case "books.listPublished":
      case "books.listAll": {
        const data = await trpcListBooks();
        return trpcOk(res, data);
      }
      case "books.getById": {
        const id = input?.id ?? input;
        const all = await trpcListBooks();
        const row = all.find((b: any) => String(b.id) === String(id) || b.slug === String(id));
        if (!row) return trpcErr(res, "NOT_FOUND", "book not found", 404);
        return trpcOk(res, row);
      }
      case "subscribe":
      case "subscribe.subscribe": {
        const email = String(input?.email || "").trim().toLowerCase();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return trpcErr(res, "BAD_REQUEST", "invalid email", 400);
        const name = input?.name ? String(input.name).slice(0, 200) : null;
        const source = input?.source ? String(input.source).slice(0, 64) : "site";
        await withConn(async (c) => {
          await c.execute(
            "INSERT INTO subscribers (email, name, source) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=COALESCE(VALUES(name), name), source=VALUES(source)",
            [email, name, source]
          );
        });
        return trpcOk(res, { ok: true });
      }
      default:
        // Empty list fallback for unknown list procedures so the UI degrades gracefully.
        if (proc.endsWith(".listPublished") || proc.endsWith(".listAll")) return trpcOk(res, []);
        return trpcErr(res, "NOT_FOUND", "procedure not found: " + proc, 404);
    }
  } catch (e: any) {
    return trpcErr(res, "INTERNAL_SERVER_ERROR", String(e?.message || e), 500);
  }
}

async function robotsTxt(_req: VercelRequest, res: VercelResponse) {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/admin/",
    "",
    "Sitemap: https://www.livewellbyjamesbell.co/api/sitemap.xml",
    "",
  ].join("\n");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(body);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") { for (const [k, v] of Object.entries(CORS)) res.setHeader(k, v); return res.status(204).end(); }
  try {
    const url = (req.url || "").split("?")[0];
    if (url === "/api/health" || url.startsWith("/api/health")) return health(req, res);
    if (url.startsWith("/api/admin/seed-articles")) return adminSeedArticles(req, res);
    if (url === "/api/admin/seed") return adminSeed(req, res);
    if (url === "/api/rss" || url === "/api/rss/substack") return substackRss(req, res);
    if (url === "/api/subscribe") return subscribe(req, res);
    if (url === "/api/pcn/signup") return pcnSignup(req, res);
    if (url === "/api/sitemap.xml" || url === "/api/sitemap") return sitemap(req, res);
    if (url === "/api/robots.txt" || url === "/api/robots") return robotsTxt(req, res);
    if (url === "/api/articles") return listArticles(req, res);
    const ma = url.match(/^\/api\/articles\/([^\/]+)/);
    if (ma) return getArticle(req, res, decodeURIComponent(ma[1]));
    const mt = url.match(/^\/api\/trpc\/([^\/]+)/);
    if (mt) return trpcHandler(req, res, decodeURIComponent(mt[1]));
    json(res, 404, { error: "Not found", url });
  } catch (e: any) { json(res, 500, { error: "handler crashed", message: String(e?.message || e) }); }
}
