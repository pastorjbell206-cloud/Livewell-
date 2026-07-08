// LiveWell serverless entry (Vercel @vercel/node, ESM).
// Self-contained: no ../server/* imports. Uses only package deps.
import type { VercelRequest, VercelResponse } from "@vercel/node";
import mysql from "mysql2/promise";
import crypto from "node:crypto";
import postChristianArticles from "./post-christian-articles.json" with { type: "json" };
import integratedLifeArticles from "./integrated-life-articles.json" with { type: "json" };
import womanhoodDoubtDevotionalArticles from "./womanhood-doubt-devotional-articles.json" with { type: "json" };
import bcrypt from "bcryptjs";
import superjson from "superjson";
// Static essay library (143 long-form essays). Served behind the live DB so the
// content is on the site without a per-essay DB write: DB rows always win on a
// slug collision; static fills the rest; if the DB is unreachable the site still
// serves the library. Regenerate with `node scripts/build-static-library.mjs`.
import STATIC_LIBRARY from "./static-library.generated.js";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import Stripe from "stripe";

// ---------------------------------------------------------------------------
// Database access — one pool per warm serverless instance, reused across
// invocations.
//
// Vercel runs this function on short-lived, horizontally-scaled instances. The
// earlier implementation opened a brand-new MySQL connection (TCP + TLS
// handshake + auth) on every request and tore it down in a `finally`. That adds
// round-trips of latency to every call and, under concurrency, multiplies open
// connections until the database refuses new ones — the first thing that breaks
// at scale. (A hand-rolled single-connection cache, `withPubConn`, had been
// left in for one path to dodge this; the pool below supersedes it, so it is
// gone.)
//
// The pool is cached on `globalThis` so it survives module re-evaluation. Each
// unit of work borrows a connection for the duration of its callback and
// returns it with `release()` — never closing it — so connections are reused,
// not rebuilt. mysql2's pool transparently replaces dropped connections, and
// keep-alive stops idle ones being culled mid-flight. Behaviour is otherwise
// identical: every callback still runs against a single dedicated connection,
// so all existing call sites are unchanged.
//
// `connectionLimit` is intentionally small: serverless scales by adding
// instances, and total DB connections ≈ instances × limit, so a modest
// per-instance cap is what keeps the database healthy. Tunable via DB_POOL_SIZE.
// ---------------------------------------------------------------------------

const DB_POOL_SIZE = Math.max(1, Number(process.env.DB_POOL_SIZE) || 5);

const globalForDb = globalThis as unknown as { __lwPool?: mysql.Pool };

function getPool(): mysql.Pool {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  if (!globalForDb.__lwPool) {
    globalForDb.__lwPool = mysql.createPool({
      uri: url,
      ssl: { rejectUnauthorized: true },
      waitForConnections: true,
      connectionLimit: DB_POOL_SIZE,
      maxIdle: DB_POOL_SIZE,
      idleTimeout: 60_000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10_000,
    });
  }
  return globalForDb.__lwPool;
}

async function withConn<T>(fn: (c: mysql.PoolConnection) => Promise<T>): Promise<T> {
  const conn = await getPool().getConnection();
  try {
    return await fn(conn);
  } finally {
    conn.release();
  }
}

function constantTimeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function authed(req: VercelRequest): boolean {
  // Read the key ONLY from the x-seed-key header so it never leaks into URLs/logs.
  const key = (req.headers["x-seed-key"] as string) || "";
  if (!key) return false;
  // Dedicated SEED_KEY only — no JWT_SECRET fallback. The session-signing
  // secret and the seed/admin-endpoint key must not be the same credential:
  // one leaked JWT_SECRET used to unlock both session forgery AND every
  // seed/inventory endpoint. If SEED_KEY is unset, header auth fails closed
  // (admin-session auth on these endpoints still works via authedSession).
  const expected = process.env.SEED_KEY || "";
  if (!expected) return false;
  return constantTimeEqual(key, expected);
}

// ---------------------------------------------------------------------------
// In-memory sliding-window rate limiter. Scope: one warm serverless instance
// — enough to blunt naive brute force on the single admin password and spam
// bursts on the public write endpoints, which today have no protection at
// all. A durable cross-instance store (e.g. Upstash Redis via env) is the
// documented upgrade path (roadmap QW-23 remainder / owner provisioning).
// ---------------------------------------------------------------------------
const rlBuckets = new Map<string, number[]>();
function rateLimited(req: VercelRequest, bucket: string, limit: number, windowMs: number): boolean {
  const ip = (String(req.headers["x-forwarded-for"] || "").split(",")[0].trim()) || "unknown";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const hits = (rlBuckets.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    rlBuckets.set(key, hits);
    return true;
  }
  hits.push(now);
  rlBuckets.set(key, hits);
  if (rlBuckets.size > 5000) {
    // Bounded memory: drop the oldest tracked keys wholesale.
    for (const k of rlBuckets.keys()) {
      rlBuckets.delete(k);
      if (rlBuckets.size <= 2500) break;
    }
  }
  return false;
}

function getAllowedOrigin(req: VercelRequest): string {
  const origin = req.headers.origin || "";
  const allowed = [
    "https://www.livewellbyjamesbell.co",
    "https://livewellbyjamesbell.co",
  ];
  if (process.env.NODE_ENV === "development") {
    allowed.push("http://localhost:3000", "http://localhost:5173");
  }
  // Do NOT fall back to the production origin for unknown origins.
  return allowed.includes(origin) ? origin : "";
}

function corsHeaders(req: VercelRequest): Record<string, string> {
  const origin = getAllowedOrigin(req);
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,x-seed-key",
    "Vary": "Origin",
  };
  // Only set Allow-Origin (and credentials) when the origin is on the allow-list.
  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Credentials"] = "true";
  }
  return headers;
}

function applyCors(req: VercelRequest, res: VercelResponse) {
  for (const [k, v] of Object.entries(corsHeaders(req))) res.setHeader(k, v);
}

function json(res: VercelResponse, status: number, body: any) {
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
      out.dbError = "db unavailable";
    }
  }
  json(res, 200, out);
}

// ---------------------------------------------------------------------------
// Read-only schema inventory. Requires the x-seed-key header (SEED_KEY or JWT_SECRET).
// Performs only SHOW / SELECT COUNT / DESCRIBE / SELECT ... LIMIT 1 queries.
// No writes. Used by the content-migration project to decide whether the live
// DB uses the Drizzle `posts` table or the flat `articles` table.
// ---------------------------------------------------------------------------
async function dbInventory(req: VercelRequest, res: VercelResponse) {
  if (!authed(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const out = await withConn(async (c) => {
      const [tablesRaw] = await c.query("SHOW TABLES");
      const tables = Array.isArray(tablesRaw)
        ? (tablesRaw as any[]).map((row) => Object.values(row)[0] as string)
        : [];

      const inspectTargets = ["posts", "articles"];
      const tableInfo: Record<string, any> = {};

      for (const name of inspectTargets) {
        if (!tables.includes(name)) {
          tableInfo[name] = { exists: false };
          continue;
        }
        const info: any = { exists: true };
        try {
          const [countRows]: any = await c.query(
            `SELECT COUNT(*) AS n FROM \`${name}\``
          );
          info.rowCount = countRows?.[0]?.n ?? null;
        } catch (e: any) {
          info.rowCountError = String(e?.message || e).slice(0, 300);
        }
        try {
          const [descRows]: any = await c.query(`DESCRIBE \`${name}\``);
          info.columns = Array.isArray(descRows)
            ? descRows.map((r: any) => ({
                field: r.Field,
                type: r.Type,
                nullable: r.Null,
                key: r.Key,
                default: r.Default,
              }))
            : [];
        } catch (e: any) {
          info.describeError = String(e?.message || e).slice(0, 300);
        }
        try {
          const [sampleRows]: any = await c.query(
            `SELECT * FROM \`${name}\` ORDER BY 1 DESC LIMIT 1`
          );
          const row = Array.isArray(sampleRows) ? sampleRows[0] ?? null : null;
          if (row) {
            const redacted: Record<string, any> = {};
            for (const [k, v] of Object.entries(row)) {
              if (typeof v === "string" && v.length > 120) {
                redacted[k] = v.slice(0, 120) + `â¦(+${v.length - 120} chars)`;
              } else {
                redacted[k] = v;
              }
            }
            info.sampleRow = redacted;
          } else {
            info.sampleRow = null;
          }
        } catch (e: any) {
          info.sampleError = String(e?.message || e).slice(0, 300);
        }
      }

      return { tables, tableInfo };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e).slice(0, 500) });
  }
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
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
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
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

async function seedArticleSet(req: VercelRequest, res: VercelResponse, set: any[]) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const out = await withConn(async (c) => {
      let inserted = 0;
      for (const a of set) {
        try {
          const [r]: any = await c.execute(
            `INSERT IGNORE INTO posts (title, slug, body, excerpt, pillar, readTime, published, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, true, NOW(), NOW())`,
            [a.title, a.slug, a.body, a.excerpt, a.pillar, a.readTime]
          );
          if (r.affectedRows) inserted++;
        } catch {}
      }
      const [rows] = await c.query("SELECT COUNT(*) as n FROM posts");
      return { inserted, totalArticles: set.length, totalPosts: (rows as any)[0].n };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

async function seedPostChristianArticles(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const out = await withConn(async (c) => {
      let inserted = 0;
      for (const a of postChristianArticles as any[]) {
        try {
          const [r]: any = await c.execute(
            `INSERT IGNORE INTO posts (title, slug, body, excerpt, pillar, readTime, published, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, true, NOW(), NOW())`,
            [a.title, a.slug, a.body, a.excerpt, a.pillar, a.readTime]
          );
          if (r.affectedRows) inserted++;
        } catch {}
      }
      const [rows] = await c.query("SELECT COUNT(*) as n FROM posts");
      return { inserted, totalArticles: postChristianArticles.length, totalPosts: (rows as any)[0].n };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

// Publish every draft resource in a single UPDATE. The admin "Publish all
// drafts" button previously fired one write per resource from the browser, all
// at once; a large flush exhausted the serverless DB connections and the whole
// batch failed. One statement is atomic, fast, and cannot overrun the pool.
async function publishAllResources(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const out = await withConn(async (c) => {
      const [r]: any = await c.execute(
        "UPDATE resources SET published = true, updatedAt = NOW() WHERE published = false"
      );
      const [rows]: any = await c.query("SELECT COUNT(*) as n FROM resources WHERE published = true");
      return { published: r.affectedRows || 0, totalPublished: (rows as any)[0].n };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

// Refresh already-published articles from the shipped JSON sets. The seed
// endpoints use INSERT IGNORE (idempotent, never duplicate), which also means
// they never UPDATE a row that already exists — so a correction shipped in the
// JSON (a fixed citation, a voice edit) would never reach rows seeded earlier.
// This endpoint closes that gap: for every shipped article it UPDATEs the
// matching slug's title/body/excerpt/pillar/readTime, and inserts any slug not
// yet present. Content-only refresh: published/featured flags and timestamps
// of existing rows are left alone (except updatedAt).
async function refreshArticles(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  const SETS: Array<{ name: string; set: any[] }> = [
    { name: "post-christian", set: postChristianArticles as any[] },
    { name: "integrated-life", set: integratedLifeArticles as any[] },
    { name: "womanhood-doubt-devotionals", set: womanhoodDoubtDevotionalArticles as any[] },
  ];
  try {
    const out = await withConn(async (c) => {
      const breakdown: Record<string, { updated: number; inserted: number; total: number }> = {};
      let updated = 0, inserted = 0;
      for (const { name, set } of SETS) {
        let u = 0, i = 0;
        for (const a of set) {
          try {
            const [r]: any = await c.execute(
              `UPDATE posts SET title = ?, body = ?, excerpt = ?, pillar = ?, readTime = ?, updatedAt = NOW() WHERE slug = ?`,
              [a.title, a.body, a.excerpt, a.pillar, a.readTime, a.slug]
            );
            if (r.affectedRows) { u++; continue; }
            const [ins]: any = await c.execute(
              `INSERT IGNORE INTO posts (title, slug, body, excerpt, pillar, readTime, published, createdAt, updatedAt)
               VALUES (?, ?, ?, ?, ?, ?, true, NOW(), NOW())`,
              [a.title, a.slug, a.body, a.excerpt, a.pillar, a.readTime]
            );
            if (ins.affectedRows) i++;
          } catch {}
        }
        breakdown[name] = { updated: u, inserted: i, total: set.length };
        updated += u; inserted += i;
      }
      return { updated, inserted, breakdown };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

// One-shot "publish everything": inserts every code-shipped article set (the
// post-Christian series, the Integrated Life expansion, and the womanhood/doubt/
// devotional set) in a single admin action. Idempotent — INSERT IGNORE on the
// unique slug means re-running only fills gaps and never duplicates. Returns a
// per-set breakdown so the admin sees exactly what landed.
async function seedAllArticles(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  const SETS: Array<{ name: string; set: any[] }> = [
    { name: "post-christian", set: postChristianArticles as any[] },
    { name: "integrated-life", set: integratedLifeArticles as any[] },
    { name: "womanhood-doubt-devotionals", set: womanhoodDoubtDevotionalArticles as any[] },
  ];
  try {
    const out = await withConn(async (c) => {
      const breakdown: Record<string, { inserted: number; total: number }> = {};
      let inserted = 0;
      let total = 0;
      for (const { name, set } of SETS) {
        let n = 0;
        for (const a of set) {
          try {
            const [r]: any = await c.execute(
              `INSERT IGNORE INTO posts (title, slug, body, excerpt, pillar, readTime, published, createdAt, updatedAt)
               VALUES (?, ?, ?, ?, ?, ?, true, NOW(), NOW())`,
              [a.title, a.slug, a.body, a.excerpt, a.pillar, a.readTime]
            );
            if (r.affectedRows) n++;
          } catch {}
        }
        breakdown[name] = { inserted: n, total: set.length };
        inserted += n;
        total += set.length;
      }
      const [rows] = await c.query("SELECT COUNT(*) as n FROM posts");
      return { inserted, total, breakdown, totalPosts: (rows as any)[0].n };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

// The standalone ebooks (code-driven funnel pages + gated PDFs) that should also
// have a row in the `books` table so they appear in the DB-driven catalog and
// the roadmap "Published" count. purchaseUrl points at the funnel page; the
// authored grid -> BookDetail -> "get the ebook" button routes there.
const EBOOK_CATALOG: Array<{ slug: string; title: string; description: string; cover: string; url: string }> = [
  { slug: "babylon", title: "Babylon", description: "The part of Jeremiah's letter we never read. Not how to take the country back, and not how to make peace with losing it. How to build, plant, and seek the good of the city in Christian exile.", cover: "/books/babylon.svg", url: "/babylon" },
  { slug: "how-to-read-the-bible", title: "How to Read the Bible", description: "Reading Scripture without bending it to what you already believe, from proof-texting to the passages we skip.", cover: "/books/how-to-read-the-bible.svg", url: "/how-to-read-the-bible" },
  { slug: "be-true-to-yourself", title: "Be True to Yourself", description: "The age's one commandment, named as the lie it is, and the older freedom underneath it: you are not your own.", cover: "/books/be-true-to-yourself.svg", url: "/be-true-to-yourself" },
  { slug: "what-belongs-to-the-poor", title: "What Belongs to the Poor", description: "What the ancient church knew about wealth and justice, recovered from Basil and the Fathers, who called giving justice, not charity.", cover: "/books/what-belongs-to-the-poor.svg", url: "/what-belongs-to-the-poor" },
  { slug: "rule-of-life", title: "Rule of Life", description: "The ancient practices the church used to form durable souls, recovered for an age engineered to deform us.", cover: "/books/rule-of-life.svg", url: "/rule-of-life" },
  { slug: "sermon-on-the-mount-as-politics", title: "The Sermon on the Mount as Politics", description: "The Sermon read as the constitution of the kingdom, not private inner life. Power, money, enemies, truth, and the poor.", cover: "/books/sermon-on-the-mount-as-politics.svg", url: "/sermon-on-the-mount-as-politics" },
  { slug: "prophetic-justice-101", title: "Prophetic Justice 101", description: "Mishpat, tsedaqah, Micah 6:8, and what the church owes its neighborhood. The prophetic tradition recovered, never partisan.", cover: "/books/prophetic-justice-101.svg", url: "/prophetic-justice-101" },
  { slug: "marriage-in-ministry", title: "Marriage in Ministry", description: "Protecting the covenant when the church demands everything, and the pressures the parsonage puts on a marriage.", cover: "/books/marriage-in-ministry.svg", url: "/marriage-in-ministry" },
  { slug: "the-loneliness-of-the-pastor", title: "The Loneliness of the Pastor", description: "Why pastors quit, and the brotherhood that could let them stay. The book the Pastors Connection Network was built around.", cover: "/books/the-loneliness-of-the-pastor.svg", url: "/the-loneliness-of-the-pastor" },
  { slug: "healwell", title: "HealWell: 52 Weeks in Costly Hope", description: "A year of honest devotionals for tired believers, written from inside the wound and pointed toward a costly hope.", cover: "/books/healwell.svg", url: "/healwell" },
  { slug: "why-not-what", title: "Why Not What", description: "How theology starts with the right question. Why before what, the order the whole Bible insists on.", cover: "/books/why-not-what.svg", url: "/why-not-what" },
  { slug: "covenant", title: "Covenant", description: "Why marriage is a promise, not a deal. The culture sold us a contract and called it romance.", cover: "/books/covenant.svg", url: "/covenant" },
  { slug: "alone-in-a-crowded-church", title: "Alone in a Crowded Church", description: "Why pastors burn out in silence, and how brotherhood brings them back.", cover: "/books/alone-in-a-crowded-church.svg", url: "/alone-in-a-crowded-church" },
  { slug: "consider-the-birds", title: "Consider the Birds", description: "What the Bible says about anxiety, and the peace Christ gives instead.", cover: "/books/consider-the-birds.jpg", url: "/consider-the-birds" },
  { slug: "where-your-treasure-is", title: "Where Your Treasure Is", description: "What the Bible says about money, and the heart it means to free.", cover: "/books/where-your-treasure-is.jpg", url: "/where-your-treasure-is" },
  { slug: "when-god-bless-america", title: "When God Bless America Replaces Thy Kingdom Come", description: "How patriotism became our practical savior. Civil religion is idolatry with a flag for a shroud.", cover: "/books/when-god-bless-america.jpg", url: "/books/when-god-bless-america" },
  { slug: "born-again-from-atheism", title: "Born Again From Atheism", description: "How an unbeliever came to faith as a grown man, and what he found there. The doubts taken at full strength, and the God he did not want to meet.", cover: "/books/born-again-from-atheism.svg", url: "/born-again-from-atheism" },
  { slug: "the-god-who-is-not-nice", title: "The God Who Is Not Nice", description: "Recovering the weight of God in a sentimental age. Nice is not holy, and a God with no weight cannot save.", cover: "/books/the-god-who-is-not-nice.svg", url: "/the-god-who-is-not-nice" },
  { slug: "faith-after-deconstruction", title: "Faith After Deconstruction", description: "How to lose the faith you were given and find the one that holds. What should fall, what must not, and the way through.", cover: "/books/faith-after-deconstruction.svg", url: "/faith-after-deconstruction" },
  { slug: "ordinary-holiness", title: "Ordinary Holiness", description: "Finding God in the life you actually have. Work, the body, the table, the neighbor, and the faithfulness no one applauds.", cover: "/books/ordinary-holiness.svg", url: "/ordinary-holiness" },
  { slug: "the-scandal-of-the-cross", title: "The Scandal of the Cross", description: "Why the death of God is the center of everything. The cross recovered from jewelry, and the atonement held together instead of traded for a slogan.", cover: "/books/the-scandal-of-the-cross.svg", url: "/the-scandal-of-the-cross" },
  { slug: "heaven-is-not-your-reward", title: "Heaven Is Not Your Reward", description: "The resurrection hope the church traded for an escape. A new heaven and a new earth, not clouds and harps, and what that changes.", cover: "/books/heaven-is-not-your-reward.svg", url: "/heaven-is-not-your-reward" },
  { slug: "prayer-in-the-dark", title: "Prayer in the Dark", description: "Talking to God when you are not sure anyone is listening. For prayers that hit the ceiling, without the formulas or the guilt.", cover: "/books/prayer-in-the-dark.svg", url: "/prayer-in-the-dark" },
  { slug: "the-body-you-left", title: "The Body You Left", description: "A case for the church in an age that walked away. An honest reckoning with why people left, and why the body of Christ still matters.", cover: "/books/the-body-you-left.svg", url: "/the-body-you-left" },
];

// Admin-triggered DB presence for the standalone ebooks. Idempotent: keyed on
// the UNIQUE slug, so re-running only refreshes the funnel-linking fields and
// never duplicates. Owner triggers it while authenticated (admin session).
async function seedEbooks(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const out = await withConn(async (c) => {
      let inserted = 0;
      let updated = 0;
      for (let i = 0; i < EBOOK_CATALOG.length; i++) {
        const b = EBOOK_CATALOG[i];
        const [r]: any = await c.execute(
          `INSERT INTO books (title, slug, author, description, coverImage, purchaseUrl, bookType, sortOrder, published)
           VALUES (?, ?, 'James Bell', ?, ?, ?, 'authored', ?, true)
           ON DUPLICATE KEY UPDATE
             coverImage = VALUES(coverImage),
             purchaseUrl = VALUES(purchaseUrl),
             bookType = 'authored',
             published = true,
             description = COALESCE(NULLIF(description, ''), VALUES(description)),
             title = VALUES(title)`,
          [b.title, b.slug, b.description, b.cover, b.url, 10 + i]
        );
        if (r.affectedRows === 1) inserted++;
        else updated++;
      }
      const [rows]: any = await c.query("SELECT COUNT(*) as n FROM books WHERE published = true");
      return { inserted, updated, total: EBOOK_CATALOG.length, publishedRows: rows[0].n };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

// Resolve the Stripe price for an ebook: an explicit STRIPE_PRICE_<SLUG> env var
// wins (that is how the earliest ebooks were configured), otherwise fall back to
// a price id stored in site_settings under `stripe_price_<slug>` by the admin
// create-stripe-prices endpoint. Returns null if neither exists (not on sale).
async function resolveEbookPriceId(slug: string, priceEnv: string): Promise<string | null> {
  const fromEnv = process.env[priceEnv]?.trim();
  if (fromEnv) return fromEnv;
  try {
    return await withConn(async (c) => {
      const [rows]: any = await c.execute(
        "SELECT settingValue FROM site_settings WHERE settingKey = ?",
        [`stripe_price_${slug}`],
      );
      const v = rows?.[0]?.settingValue?.trim();
      return v || null;
    });
  } catch {
    return null;
  }
}

// Admin-triggered: create (idempotently) a Stripe product + a one-time $9.99 USD
// price for every ebook that is not already configured, and store the price id
// in site_settings so checkout can use it without any Vercel env editing. Uses
// the server's own STRIPE_SECRET_KEY (already set in production). Books that
// already have a STRIPE_PRICE_<SLUG> env var are left untouched.
async function createStripePrices(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  const stripe = getStripe();
  if (!stripe) return json(res, 503, { ok: false, error: "Stripe is not configured on the server." });
  try {
    await withConn(async (c) => {
      await c.execute(`CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        settingKey VARCHAR(191) NOT NULL UNIQUE,
        settingValue TEXT,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    });
    const results: Array<{ slug: string; status: string; priceId: string | null }> = [];
    for (const [slug, book] of Object.entries(EBOOKS)) {
      // Configured via env var already: do not touch (these are already selling).
      if (process.env[book.priceEnv]?.trim()) {
        results.push({ slug, status: "env", priceId: null });
        continue;
      }
      // Already created and stored: reuse.
      const existing = await withConn(async (c) => {
        const [rows]: any = await c.execute(
          "SELECT settingValue FROM site_settings WHERE settingKey = ?",
          [`stripe_price_${slug}`],
        );
        return rows?.[0]?.settingValue?.trim() || null;
      });
      if (existing) {
        results.push({ slug, status: "exists", priceId: existing });
        continue;
      }
      // Find or create the product (matched by metadata.slug so re-runs reuse it).
      let product: Stripe.Product | null = null;
      try {
        const found = await stripe.products.search({ query: `metadata['slug']:'${slug}'` });
        product = found.data[0] || null;
      } catch {
        /* search index may lag on new accounts; fall through to create */
      }
      if (!product) {
        product = await stripe.products.create({
          name: `${book.title} (ebook)`,
          metadata: { slug, series: "LiveWell", author: "James Bell" },
        });
      }
      const prices = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
      let price = prices.data.find((p) => p.unit_amount === 999 && p.currency === "usd" && !p.recurring);
      if (!price) {
        price = await stripe.prices.create({ product: product.id, unit_amount: 999, currency: "usd" });
      }
      await withConn(async (c) => {
        await c.execute(
          "INSERT INTO site_settings (settingKey, settingValue, updatedAt) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE settingValue = VALUES(settingValue), updatedAt = NOW()",
          [`stripe_price_${slug}`, price.id],
        );
      });
      results.push({ slug, status: "created", priceId: price.id });
    }
    const created = results.filter((r) => r.status === "created").length;
    const reused = results.filter((r) => r.status === "exists").length;
    const envConfigured = results.filter((r) => r.status === "env").length;
    json(res, 200, { ok: true, created, reused, envConfigured, total: results.length, results });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

async function adminSeedContent(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const body = await readBody(req);
    const posts: any[] = body?.posts || [];
    const booksData: any[] = body?.books || [];
    const settings: Record<string, string> = body?.settings || {};
    const resourcesData: any[] = body?.resources || [];

    const out = await withConn(async (c) => {
      // Create tables if they don't exist
      await c.execute(`CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        settingKey VARCHAR(191) NOT NULL UNIQUE,
        settingValue TEXT,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await c.execute(`CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(191) NOT NULL UNIQUE,
        body LONGTEXT,
        excerpt TEXT,
        pillar VARCHAR(64),
        readTime VARCHAR(20),
        published BOOLEAN DEFAULT false,
        featured BOOLEAN DEFAULT false,
        contentType VARCHAR(32) DEFAULT 'general',
        audience VARCHAR(64) DEFAULT 'general',
        topic VARCHAR(64),
        publishedAt DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await c.execute(`CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(191) UNIQUE,
        author VARCHAR(200) DEFAULT 'James Bell',
        description TEXT,
        coverImage VARCHAR(1000),
        purchaseUrl VARCHAR(1000),
        bookType VARCHAR(32) DEFAULT 'authored',
        sortOrder INT DEFAULT 0,
        published BOOLEAN DEFAULT true,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await c.execute(`CREATE TABLE IF NOT EXISTS resources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        category VARCHAR(64),
        fileType VARCHAR(32),
        url VARCHAR(1000),
        published BOOLEAN DEFAULT true,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await c.execute(`CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(32) DEFAULT 'info',
        title VARCHAR(500),
        message TEXT,
        showAsBanner BOOLEAN DEFAULT false,
        active BOOLEAN DEFAULT true,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await c.execute(`CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200),
        content TEXT,
        approved BOOLEAN DEFAULT false,
        featured BOOLEAN DEFAULT false,
        imageUrl VARCHAR(1000),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      await c.execute(`CREATE TABLE IF NOT EXISTS comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        postId INT,
        name VARCHAR(200),
        content TEXT,
        approved BOOLEAN DEFAULT false,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

      let postsInserted = 0, booksInserted = 0, settingsSet = 0, resourcesInserted = 0;

      for (const p of posts) {
        try {
          const slug = p.slug || p.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          await c.execute(
            `INSERT IGNORE INTO posts (title, slug, body, excerpt, pillar, readTime, published, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [p.title || "", slug, p.body || "", p.excerpt || "", p.pillar || "Theological Depth", p.readTime || "5 min", p.published ?? true]
          );
          postsInserted++;
        } catch { /* skip duplicates */ }
      }

      for (const b of booksData) {
        try {
          const slug = b.slug || b.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          await c.execute(
            `INSERT IGNORE INTO books (title, slug, author, description, coverImage, bookType, published, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [b.title || "", slug, b.author || "James Bell", b.description || "", b.coverImage || null, b.bookType || "authored", b.published ?? true]
          );
          booksInserted++;
        } catch { /* skip duplicates */ }
      }

      for (const [key, value] of Object.entries(settings)) {
        await c.execute(
          "INSERT INTO site_settings (settingKey, settingValue, updatedAt) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE settingValue = VALUES(settingValue), updatedAt = NOW()",
          [key, value]
        );
        settingsSet++;
      }

      for (const r of resourcesData) {
        try {
          await c.execute(
            `INSERT IGNORE INTO resources (title, description, category, fileType, url, published, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [r.title || "", r.description || "", r.category || "", r.fileType || "", r.url || "", r.published ?? true]
          );
          resourcesInserted++;
        } catch { /* skip duplicates */ }
      }

      return { postsInserted, booksInserted, settingsSet, resourcesInserted };
    });

    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

/**
 * One-shot repair for apostrophes stripped from imported content (Gods -> God's,
 * churchs -> church's, dont -> don't, ...). Word-boundary matches on text fields
 * only; slugs are never touched so no URL changes. Idempotent: rerunning after a
 * clean pass updates zero rows, and rows edited in the admin keep their edits.
 */
async function adminFixApostrophes(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  const MAP: Record<string, string> = {
    Gods: "God's", Churchs: "Church's", churchs: "church's", Worlds: "World's",
    worlds: "world's", Lords: "Lord's", lifes: "life's",
    dont: "don't", Dont: "Don't", cant: "can't", Cant: "Can't",
    doesnt: "doesn't", Doesnt: "Doesn't", isnt: "isn't", Isnt: "Isn't",
    havent: "haven't", Havent: "Haven't", wasnt: "wasn't", didnt: "didn't",
    wouldnt: "wouldn't", couldnt: "couldn't", shouldnt: "shouldn't",
    youre: "you're", Youre: "You're", theyre: "they're", Theyre: "They're",
    theyve: "they've", Theyve: "They've", Youve: "You've", youve: "you've",
    Weve: "We've", weve: "we've",
  };
  const pat = new RegExp("\\b(" + Object.keys(MAP).join("|") + ")\\b", "g");
  const fix = (s: string) => s.replace(pat, (m) => MAP[m]);
  try {
    const out = await withConn(async (c) => {
      let postsFixed = 0, booksFixed = 0;
      const [postRows] = await c.execute("SELECT id, title, body, excerpt FROM posts");
      for (const p of postRows as any[]) {
        const title = fix(p.title || ""), body = fix(p.body || ""), excerpt = fix(p.excerpt || "");
        if (title !== (p.title || "") || body !== (p.body || "") || excerpt !== (p.excerpt || "")) {
          await c.execute("UPDATE posts SET title = ?, body = ?, excerpt = ? WHERE id = ?", [title, body, excerpt, p.id]);
          postsFixed++;
        }
      }
      const [bookRows] = await c.execute("SELECT id, title, description FROM books");
      for (const b of bookRows as any[]) {
        const title = fix(b.title || ""), description = fix(b.description || "");
        if (title !== (b.title || "") || description !== (b.description || "")) {
          await c.execute("UPDATE books SET title = ?, description = ? WHERE id = ?", [title, description, b.id]);
          booksFixed++;
        }
      }
      return { postsFixed, booksFixed };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
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
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
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
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

async function substackRss(req: VercelRequest, res: VercelResponse) {
  const CACHE_TTL = 30 * 60 * 1000;
  const fresh = /[?&]fresh=1/.test(req.url || "");
  // full=1 includes each post's complete body (content:encoded) for the
  // importer. It's large, so it bypasses the lightweight DB cache entirely.
  const full = /[?&]full=1/.test(req.url || "");
  try {
    const cached = fresh || full ? null : await withConn(async (c) => {
      const [rows]: any = await c.execute(
        "SELECT payload, fetched_at FROM rss_cache WHERE source = 'substack' ORDER BY fetched_at DESC LIMIT 1"
      );
      return rows[0] || null;
    });
    if (cached && Date.now() - new Date(cached.fetched_at).getTime() < CACHE_TTL) {
      res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1800");
      return json(res, 200, { ok: true, cached: true, ...JSON.parse(cached.payload) });
    }
    const feedUrl = process.env.SUBSTACK_FEED_URL || "https://jamesbell333289.substack.com/feed";
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
      const item: any = {
        title: pick("title"),
        link: pick("link"),
        pubDate: pick("pubDate"),
        description: pick("description").replace(/<[^>]+>/g, "").slice(0, 400),
        guid: pick("guid"),
      };
      if (full) item.content = pick("content:encoded");
      items.push(item);
    }
    const payload = { items, fetchedAt: new Date().toISOString() };
    if (!full) {
      await withConn(async (c) => {
        await c.execute("INSERT INTO rss_cache (source, payload) VALUES ('substack', ?)", [JSON.stringify(payload)]);
        await c.execute("DELETE FROM rss_cache WHERE source='substack' AND id NOT IN (SELECT id FROM (SELECT id FROM rss_cache WHERE source='substack' ORDER BY fetched_at DESC LIMIT 3) t)");
      });
    }
    res.setHeader("Cache-Control", full ? "no-store" : "public, s-maxage=600, stale-while-revalidate=1800");
    json(res, 200, { ok: true, cached: false, ...payload });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

// Best-effort dual-write of a new subscriber to an external newsletter provider,
// so the owned DB list and the sending platform stay in sync. Config-driven and
// provider-agnostic: set NEWSLETTER_WEBHOOK_URL to forward to any service (a
// Zapier/Make hook that adds to Substack, Mailchimp via automation, etc.), or set
// MAILCHIMP_API_KEY + MAILCHIMP_SERVER_PREFIX + MAILCHIMP_LIST_ID for a direct
// Mailchimp upsert. No-op and never throws if nothing is configured; the owned DB
// write is always the source of truth.
async function pushToNewsletterProvider(email: string, name: string | null, source: string): Promise<void> {
  try {
    const hookUrl = process.env.NEWSLETTER_WEBHOOK_URL?.trim();
    if (hookUrl) {
      await fetch(hookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source }),
      });
      return;
    }
    const mcKey = process.env.MAILCHIMP_API_KEY?.trim();
    const mcServer = process.env.MAILCHIMP_SERVER_PREFIX?.trim();
    const mcList = process.env.MAILCHIMP_LIST_ID?.trim();
    if (mcKey && mcServer && mcList) {
      const hash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
      await fetch(`https://${mcServer}.api.mailchimp.com/3.0/lists/${mcList}/members/${hash}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(`anystring:${mcKey}`).toString("base64"),
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: "subscribed",
          merge_fields: name ? { FNAME: name } : {},
        }),
      });
    }
  } catch {
    /* best-effort; the owned DB write is the source of truth */
  }
}

async function subscribe(req: VercelRequest, res: VercelResponse) {
  if (rateLimited(req, "subscribe", 10, 60 * 1000)) return json(res, 429, { error: "Too many requests. Give it a minute and try again." });
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
    await pushToNewsletterProvider(email, name, source);
    json(res, 200, { ok: true });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

async function pcnSignup(req: VercelRequest, res: VercelResponse) {
  if (rateLimited(req, "pcn", 10, 60 * 1000)) return json(res, 429, { error: "Too many requests. Give it a minute and try again." });
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
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

// Lead-magnet email capture. The client (LeadMagnetLanding) POSTs here as a raw
// REST call and only checks response.ok, so we return 200 as long as the email
// is valid — persistence is best-effort and never blocks the signup UX.
async function leadMagnetSignup(req: VercelRequest, res: VercelResponse) {
  try {
    const body = await readBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(res, 400, { success: false, error: "invalid email" });
    const magnetId = String(body.magnetId || "unknown").slice(0, 128);
    try {
      const publicId = (globalThis.crypto && globalThis.crypto.randomUUID)
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      await withConn(async (c) => {
        await c.execute(
          "INSERT INTO lead_magnet_signups (publicId, email, magnetId) VALUES (?, ?, ?)",
          [publicId, email, magnetId]
        );
      });
    } catch (e) {
      // Table may not exist yet, or a transient DB error — do not fail the user.
      console.warn("[lead-magnets] persist failed:", e);
    }
    return json(res, 200, { success: true, message: "Check your email for your guide!" });
  } catch (e: any) {
    return json(res, 500, { success: false, error: String(e?.message || e) });
  }
}

async function sitemap(_req: VercelRequest, res: VercelResponse) {
  try {
    const base = "https://www.livewellbyjamesbell.co";
    const staticPaths = ["/", "/writing", "/books", "/consider-the-birds", "/where-your-treasure-is", "/about", "/quiz", "/search", "/marriage", "/parenting", "/doubt", "/start", "/for-pastors", "/for-leaders", "/membership", "/reading-paths", "/resources"];
    let articles: any[] = [];
    try {
      articles = await withConn(async (c) => {
        const [rows]: any = await c.execute("SELECT slug, updatedAt FROM posts WHERE published = true ORDER BY createdAt DESC LIMIT 2000");
        return rows;
      });
    } catch {
      try {
        articles = await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT slug, updated_at as updatedAt FROM articles ORDER BY updated_at DESC LIMIT 2000");
          return rows;
        });
      } catch { /* no articles table either */ }
    }
    let bookSlugs: any[] = [];
    try {
      bookSlugs = await withConn(async (c) => {
        const [rows]: any = await c.execute("SELECT slug FROM books WHERE published = true");
        return rows;
      });
    } catch { /* no books table */ }
    const urls: { loc: string; pri: string; mod?: string }[] = [
      ...staticPaths.map(p => ({ loc: base + p, pri: p === "/" ? "1.0" : "0.8" })),
      ...articles.map((a: any) => ({ loc: `${base}/writing/${a.slug}`, pri: "0.7", mod: a.updatedAt ? new Date(a.updatedAt).toISOString() : undefined })),
      ...bookSlugs.filter((b: any) => b.slug).map((b: any) => ({ loc: `${base}/books/${b.slug}`, pri: "0.6" })),
    ];
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc>${u.mod ? `<lastmod>${u.mod}</lastmod>` : ""}<priority>${u.pri}</priority></url>`).join("\n")}\n</urlset>`;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600");
    res.status(200).send(body);
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
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

// ----- Static essay library: shaping + merge helpers -----
// Each generated record is mapped into the SAME shape the DB rows produce so the
// frontend can't tell the difference. `full` includes the markdown body; the
// slim variant drops it for index/listing pages.
function staticFullCard(r: any): any {
  return {
    id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt || "",
    body: r.body || null, content: r.body || null,
    pillar: r.pillar || "Theological Depth", readTime: r.readTime || "5 min",
    readingTimeMinutes: r.readingTimeMinutes || readTime(null),
    published: true, featured: false, topic: r.topic || null,
    audience: r.audience || null, contentType: r.contentType || null,
    subPathway: null, isSeries: false,
    createdAt: r.createdAt, publishedAt: r.publishedAt,
  };
}
function staticSlimCard(r: any): any {
  const { body, content, ...rest } = staticFullCard(r);
  return rest;
}
function byDateDesc(a: any, b: any): number {
  const ta = new Date(a?.publishedAt || a?.createdAt || 0).getTime();
  const tb = new Date(b?.publishedAt || b?.createdAt || 0).getTime();
  return tb - ta;
}
// Append the static essays the DB doesn't already have (DB wins on slug), then
// order the whole set newest-first so the index reads as one library.
function mergeWithStatic(dbRows: any[], slim: boolean): any[] {
  const have = new Set((dbRows || []).map((r) => r.slug));
  const extra = (STATIC_LIBRARY as any[])
    .filter((r) => !have.has(r.slug))
    .map(slim ? staticSlimCard : staticFullCard);
  return [...(dbRows || []), ...extra].sort(byDateDesc);
}
function staticBySlugOrId(id: number | string): any | null {
  const s = String(id);
  const rec = (STATIC_LIBRARY as any[]).find((r) => r.slug === s || String(r.id) === s);
  return rec ? staticFullCard(rec) : null;
}

// Card shape for `posts` rows (camelCase columns) — distinct from toPostCard,
// which maps the snake_case `articles` table. Used by posts.getFeatured.
function toFeaturedPostCard(row: any): any {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    pillar: row.pillar || "Theological Depth",
    readTime: row.readTime || "5 min",
    readingTimeMinutes: row.readingTimeMinutes ?? 5,
    author: "James Bell",
    createdAt: row.createdAt || row.publishedAt,
    publishedAt: row.publishedAt || row.createdAt,
  };
}

// Slim card list for listings. Bodies are omitted (fetched per-article by
// getBySlug) so the response stays small even with 400+ posts, then the static
// essay library is merged in behind the DB rows.
async function listSlimPosts(): Promise<any[]> {
  let dbRows: any[] = [];
  try {
    dbRows = await withConn(async (c) => {
      const base = "id, slug, title, excerpt, pillar, readTime, published, featured, publishedAt, createdAt";
      // Try the two-level taxonomy columns; fall back if the migration hasn't run.
      let rows: any = null;
      try {
        [rows] = await c.execute(
          `SELECT ${base}, subPathway, isSeries FROM posts WHERE published = true ORDER BY createdAt DESC LIMIT 2000`
        );
      } catch {
        try {
          [rows] = await c.execute(
            `SELECT ${base} FROM posts WHERE published = true ORDER BY createdAt DESC LIMIT 2000`
          );
        } catch { rows = null; }
      }
      if (Array.isArray(rows) && rows.length > 0) {
        return (rows as any[]).map((r) => ({
          id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt || "",
          body: null, content: null,
          pillar: r.pillar || "Theological Depth", readTime: r.readTime || "5 min",
          published: r.published, featured: r.featured, topic: r.topic || null,
          subPathway: r.subPathway ?? null, isSeries: !!r.isSeries,
          createdAt: r.createdAt || r.publishedAt, publishedAt: r.publishedAt || r.createdAt,
        }));
      }
      const [arows]: any = await c.execute(
        "SELECT id, slug, title, subtitle, excerpt, topic, pillar, source, external_url, image_url, word_count, published_at, created_at FROM articles ORDER BY published_at DESC LIMIT 500"
      );
      return (arows as any[]).map(toPostCard);
    });
  } catch { dbRows = []; /* no DB / unreachable: serve the static library alone */ }
  return mergeWithStatic(dbRows, true);
}

async function trpcListPosts(): Promise<any[]> {
  return listSlimPosts();
}

// Slim list for index/listing pages — identical shape to trpcListPosts.
async function trpcListPostsForIndex(): Promise<any[]> {
  return listSlimPosts();
}

async function trpcGetPost(id: number | string): Promise<any | null> {
  try {
    const dbRow = await withConn(async (c) => {
      const isNum = /^\d+$/.test(String(id));
      try {
        const sql = isNum
          ? "SELECT * FROM posts WHERE id = ? LIMIT 1"
          : "SELECT * FROM posts WHERE slug = ? LIMIT 1";
        const [rows]: any = await c.execute(sql, [id]);
        if (rows[0]) {
          const r = rows[0];
          return {
            id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt || "",
            body: r.body || null, content: r.body || null,
            pillar: r.pillar || "Theological Depth", readTime: r.readTime || "5 min",
            published: r.published, featured: r.featured,
            createdAt: r.createdAt, publishedAt: r.publishedAt || r.createdAt,
          };
        }
      } catch { /* posts table may not exist */ }
      const sql = isNum
        ? "SELECT * FROM articles WHERE id = ? LIMIT 1"
        : "SELECT * FROM articles WHERE slug = ? LIMIT 1";
      const [rows]: any = await c.execute(sql, [id]);
      if (!rows[0]) return null;
      const row = rows[0];
      return { ...toPostCard(row), body: row.body || null, content: row.body || null };
    });
    if (dbRow) return dbRow;
  } catch { /* no DB / unreachable: fall through to the static library */ }
  // Not in the DB (or DB down): serve from the static essay library.
  return staticBySlugOrId(id);
}

// Related essays from the merged (DB + static) library: same pillar first, then
// fill with the newest others. Returns slim cards (no body).
async function trpcGetRelated(slug: string, pillar?: string): Promise<any[]> {
  const all = await trpcListPostsForIndex();
  const pool = all.filter((p) => p.slug !== slug);
  const norm = (v: any) => String(v || "").toLowerCase();
  const same = pillar ? pool.filter((p) => norm(p.pillar) === norm(pillar)) : [];
  const seen = new Set(same.map((p) => p.slug));
  const fill = pool.filter((p) => !seen.has(p.slug));
  return [...same, ...fill].slice(0, 4);
}

const FALLBACK_BOOKS = [
    { id: 1, slug: "the-monster-in-the-mirror", title: "The Monster in the Mirror", subtitle: "How Culture Shapes the God We Think We See", status: "published", pillar: "Prophetic Disruption", coverImage: null, description: "The monster is never in the mirror. That is the problem. A book that names six American cultural lenses distorting Scripture â and shows what reading against our own assumptions looks like.", releaseDate: "2025-09-01", createdAt: "2025-09-01T00:00:00Z" },
    { id: 2, slug: "when-god-bless-america-replaces-thy-kingdom-come", title: "When God Bless America Replaces Thy Kingdom Come", subtitle: "How Patriotism Became Our Practical Savior", status: "in-development", pillar: "Prophetic Justice", coverImage: null, description: "Civil religion is idolatry with a flag for a shroud. America is not Israel. The new covenant is made with people through Christ's blood â not with nations.", releaseDate: "2026-11-01", createdAt: "2026-01-01T00:00:00Z" },
    { id: 3, slug: "why-we-need-each-other", title: "Why We Need Each Other", subtitle: "Pastor Loneliness and the Case for Brotherhood", status: "in-development", pillar: "Leadership Formation", coverImage: null, description: "Pastor loneliness is a crisis. Brotherhood is the answer. The case for the Pastors Connection Network and the men it was built to carry.", releaseDate: "2026-06-01", createdAt: "2026-02-01T00:00:00Z" },
    { id: 4, slug: "healwell-devotionals", title: "HealWell: 52 Weeks in Costly Hope", subtitle: "A Year of Honest Devotionals for Tired Believers", status: "in-development", pillar: "Integrated Life", coverImage: null, description: "Fifty-two weeks of devotionals for people who have stopped pretending. Written from the room where people fall apart and the room where they find their footing.", releaseDate: "2026-12-01", createdAt: "2026-03-01T00:00:00Z" },
];

async function trpcListBooks(): Promise<any[]> {
  try {
    return await withConn(async (c) => {
      const [rows]: any = await c.execute("SELECT * FROM books ORDER BY sortOrder ASC, createdAt DESC");
      if (Array.isArray(rows) && rows.length > 0) return rows;
      return FALLBACK_BOOKS;
    });
  } catch {
    return FALLBACK_BOOKS;
  }
}

// Public path: only published books. DB rows use a `published` column;
// the FALLBACK_BOOKS use a `status` string ("published" vs in-development).
async function trpcListPublishedBooks(): Promise<any[]> {
  try {
    return await withConn(async (c) => {
      const [rows]: any = await c.execute("SELECT * FROM books WHERE published = true ORDER BY sortOrder ASC, createdAt DESC");
      if (Array.isArray(rows) && rows.length > 0) return rows;
      return FALLBACK_BOOKS.filter((b) => b.status === "published");
    });
  } catch {
    return FALLBACK_BOOKS.filter((b) => b.status === "published");
  }
}

function trpcOk(res: VercelResponse, payload: any, status = 200) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=120, stale-while-revalidate=600");
  const serialized = superjson.serialize(payload);
  res.status(status).send(JSON.stringify([{ result: { data: serialized } }]));
}

function trpcErr(res: VercelResponse, code: string, message: string, status = 500) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(status).send(JSON.stringify([{ error: { message, code: -32603, data: { code, httpStatus: status } } }]));
}

// ----- Theology Quiz: questions, scoring, helper functions -----
// Self-contained: kept in api/index.ts to avoid importing from ../server/*.
// Source of truth for the same data lives at server/quiz-router.ts; if you
// change one, change the other (they are intentionally duplicated to keep
// the serverless function bundle small and import-free).
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  pillarWeights: Record<string, number[]>;
}

const THEOLOGY_QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, question: "How do you approach biblical interpretation?", options: [ "Literal, word-for-word reading", "Historical-critical scholarship", "Theological and pastoral application", "Combination of all approaches" ], pillarWeights: { "Theological Depth": [3, 2, 2, 3], "Prophetic Disruption": [1, 2, 3, 2], "Integrated Life": [1, 1, 3, 2] } },
  { id: 2, question: "What's your primary concern about the American church?", options: [ "Theological decline and biblical illiteracy", "Political compromise and cultural captivity", "Lack of practical discipleship", "Institutional irrelevance" ], pillarWeights: { "Theological Depth": [3, 1, 1, 1], "Prophetic Disruption": [2, 3, 2, 3], "Integrated Life": [1, 1, 3, 1] } },
  { id: 3, question: "How do you view the relationship between faith and justice?", options: [ "Personal salvation is primary", "Systemic justice is essential to the gospel", "Both equally important but distinct", "Justice flows from transformed hearts" ], pillarWeights: { "Theological Depth": [2, 2, 3, 2], "Prophetic Disruption": [1, 3, 2, 2], "Integrated Life": [2, 2, 2, 3] } },
  { id: 4, question: "What's your biggest question about God?", options: [ "How can God be both just and merciful?", "Why does God permit suffering?", "What does God's kingdom actually look like?", "How should God's character shape my life?" ], pillarWeights: { "Theological Depth": [3, 3, 2, 2], "Prophetic Disruption": [1, 2, 3, 1], "Integrated Life": [1, 2, 2, 3] } },
  { id: 5, question: "How do you respond to cultural issues (LGBTQ, race, politics)?", options: [ "Apply biblical principles directly", "Listen to marginalized voices first", "Seek nuance and complexity", "Avoid taking strong positions" ], pillarWeights: { "Theological Depth": [2, 1, 3, 1], "Prophetic Disruption": [1, 3, 2, 1], "Integrated Life": [2, 2, 3, 1] } },
  { id: 6, question: "What does spiritual maturity look like?", options: [ "Deep theological knowledge", "Prophetic courage and truth-telling", "Integrated faith affecting all of life", "Radical obedience to Jesus" ], pillarWeights: { "Theological Depth": [3, 1, 1, 2], "Prophetic Disruption": [1, 3, 1, 2], "Integrated Life": [1, 1, 3, 2] } },
  { id: 7, question: "How should the church engage politics?", options: [ "Remain neutral and apolitical", "Prophetically critique all political systems", "Engage selectively on moral issues", "Partner with one political movement" ], pillarWeights: { "Theological Depth": [2, 2, 3, 1], "Prophetic Disruption": [1, 3, 2, 1], "Integrated Life": [1, 2, 3, 1] } },
  { id: 8, question: "What's your biggest struggle in faith?", options: [ "Doubts about biblical reliability", "Anger at injustice and suffering", "Living out faith in daily decisions", "Finding authentic Christian community" ], pillarWeights: { "Theological Depth": [3, 1, 1, 1], "Prophetic Disruption": [1, 3, 1, 1], "Integrated Life": [1, 1, 3, 2] } },
  { id: 9, question: "How do you define Christian freedom?", options: [ "Freedom from sin through Christ", "Freedom to challenge unjust systems", "Freedom to live authentically", "Freedom to follow Jesus fully" ], pillarWeights: { "Theological Depth": [3, 1, 1, 2], "Prophetic Disruption": [1, 3, 1, 2], "Integrated Life": [1, 1, 3, 2] } },
  { id: 10, question: "What would help your faith most right now?", options: [ "Deeper theological understanding", "Prophetic challenge to status quo", "Practical guidance for daily living", "Community and authentic relationships" ], pillarWeights: { "Theological Depth": [3, 1, 1, 1], "Prophetic Disruption": [1, 3, 1, 1], "Integrated Life": [1, 1, 3, 2] } }
];

function quizPillarMessage(pillar: string): string {
  const messages: Record<string, string> = {
    "Theological Depth": "You're drawn to deep theological understanding and biblical truth. These articles explore the foundational questions of faith, God's character, and Scripture.",
    "Prophetic Disruption": "You're called to prophetic challenge and truth-telling. These articles address the uncomfortable questions the church needs to face.",
    "Integrated Life": "You're seeking to live out your faith in every area of life. These articles help bridge the gap between belief and practice.",
  };
  return messages[pillar] || "Here are some articles tailored to your interests.";
}

async function quizGetRecommendations(input: any) {
  const answers: number[] = Array.isArray(input?.answers) ? input.answers : [];
  const pillarScores: Record<string, number> = {
    "Theological Depth": 0,
    "Prophetic Disruption": 0,
    "Integrated Life": 0,
  };
  answers.forEach((answerIndex, questionIndex) => {
    const q = THEOLOGY_QUIZ_QUESTIONS[questionIndex];
    if (!q) return;
    Object.entries(q.pillarWeights).forEach(([pillar, weights]) => {
      const w = (weights as number[])[answerIndex];
      if (typeof w === "number") pillarScores[pillar] = (pillarScores[pillar] || 0) + w;
    });
  });
  const sorted = Object.entries(pillarScores).sort(([, a], [, b]) => (b as number) - (a as number));
  const topPillar = sorted[0]?.[0] || "Theological Depth";
  const allPosts = await trpcListPosts();
  const recommendedArticles = (Array.isArray(allPosts) ? allPosts : [])
    .filter((p: any) => p && p.pillar === topPillar)
    .slice(0, 6);
  return {
    topPillar,
    pillarScores,
    recommendedArticles,
    message: quizPillarMessage(topPillar),
  };
}

// ─── Search (ported from server/search-service.ts) ──────────────────────────
// Mirrors the dev tRPC search router: FULLTEXT MATCH/AGAINST with a graceful
// LIKE fallback when the FULLTEXT indexes are absent. Each sub-search borrows
// its own pooled connection so global search can run them in parallel.
type SearchResult = {
  id: number;
  type: "article" | "resource" | "book";
  title: string;
  excerpt?: string;
  slug?: string;
  url?: string;
  category?: string;
  publishedAt?: unknown;
  relevance?: number;
};

function clampLimit(n: unknown, def = 20, max = 50): number {
  const v = Math.floor(Number(n));
  return Number.isFinite(v) && v >= 1 ? Math.min(max, v) : def;
}

async function searchArticlesProd(c: mysql.PoolConnection, query: string, limit: number): Promise<SearchResult[]> {
  try {
    const [rows]: any = await c.query(
      "SELECT id, title, excerpt, slug, pillar, topic, publishedAt, " +
        "MATCH(title, excerpt, body) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance " +
        "FROM posts WHERE published = true " +
        "AND MATCH(title, excerpt, body) AGAINST(? IN NATURAL LANGUAGE MODE) " +
        "ORDER BY relevance DESC LIMIT " + limit,
      [query, query],
    );
    return (rows as any[]).map((a) => ({
      id: a.id, type: "article", title: a.title, excerpt: a.excerpt ?? undefined,
      slug: a.slug, category: a.topic ?? a.pillar ?? undefined,
      publishedAt: a.publishedAt ?? undefined, relevance: a.relevance,
    })) as SearchResult[];
  } catch {
    const term = `%${query}%`;
    const [rows]: any = await c.query(
      "SELECT id, title, excerpt, slug, pillar, topic, publishedAt FROM posts " +
        "WHERE published = true AND (title LIKE ? OR excerpt LIKE ? OR body LIKE ?) " +
        "ORDER BY publishedAt DESC LIMIT " + limit,
      [term, term, term],
    );
    return (rows as any[]).map((a) => ({
      id: a.id, type: "article", title: a.title, excerpt: a.excerpt ?? undefined,
      slug: a.slug, category: a.topic ?? a.pillar ?? undefined,
      publishedAt: a.publishedAt ?? undefined,
    })) as SearchResult[];
  }
}

async function searchResourcesProd(c: mysql.PoolConnection, query: string, limit: number): Promise<SearchResult[]> {
  const term = `%${query}%`;
  const [rows]: any = await c.query(
    "SELECT id, title, description, category, url FROM resources " +
      "WHERE published = true AND (title LIKE ? OR description LIKE ?) LIMIT " + limit,
    [term, term],
  );
  return (rows as any[]).map((r) => ({
    id: r.id, type: "resource", title: r.title, excerpt: r.description ?? undefined,
    category: r.category ?? undefined, url: r.url ?? undefined,
  })) as SearchResult[];
}

async function searchBooksProd(c: mysql.PoolConnection, query: string, limit: number): Promise<SearchResult[]> {
  try {
    const [rows]: any = await c.query(
      "SELECT id, title, description, author, slug, " +
        "MATCH(title, description, sampleExcerpt) AGAINST(? IN NATURAL LANGUAGE MODE) AS relevance " +
        "FROM books WHERE published = true " +
        "AND MATCH(title, description, sampleExcerpt) AGAINST(? IN NATURAL LANGUAGE MODE) " +
        "ORDER BY relevance DESC LIMIT " + limit,
      [query, query],
    );
    return (rows as any[]).map((b) => ({
      id: b.id, type: "book", title: b.title, excerpt: b.description ?? undefined,
      category: b.author ?? undefined, slug: b.slug ?? undefined, relevance: b.relevance,
    })) as SearchResult[];
  } catch {
    const term = `%${query}%`;
    const [rows]: any = await c.query(
      "SELECT id, title, description, author, slug FROM books " +
        "WHERE published = true AND (title LIKE ? OR description LIKE ? OR author LIKE ?) LIMIT " + limit,
      [term, term, term],
    );
    return (rows as any[]).map((b) => ({
      id: b.id, type: "book", title: b.title, excerpt: b.description ?? undefined,
      category: b.author ?? undefined, slug: b.slug ?? undefined,
    })) as SearchResult[];
  }
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
          input = parsed?.["0"]?.json ?? parsed?.json ?? parsed ?? null;
        } catch { /* ignore */ }
      }
    } else if (req.method === "POST") {
      const body = await readBody(req);
      // Batch POST: { "0": { "json": ... } } OR bare { json: ... }
      input = body?.["0"]?.json ?? body?.json ?? body ?? null;
    }

    switch (proc) {
      case "auth.me": {
        const session = authedSession(req);
        if (!session) return trpcOk(res, null);
        return trpcOk(res, {
          id: 1,
          openId: "admin",
          name: "Admin",
          email: null,
          loginMethod: "password",
          role: "admin" as const,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        });
      }
      case "auth.logout": {
        const logoutCookie = [
          `${SESSION_COOKIE}=`,
          "HttpOnly",
          "Secure",
          "SameSite=Lax",
          "Path=/",
          "Max-Age=0"
        ].join("; ");
        res.setHeader("Set-Cookie", logoutCookie);
        return trpcOk(res, { ok: true });
      }
      case "posts.listPublished": {
        const data = await trpcListPosts();
        return trpcOk(res, data);
      }
      case "posts.listAll": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const data = await trpcListPosts();
        return trpcOk(res, data);
      }
      case "posts.listForIndex": {
        const data = await trpcListPostsForIndex();
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
      case "relatedArticles.getRelated": {
        const data = await trpcGetRelated(input?.slug ?? "", input?.pillar);
        return trpcOk(res, data);
      }
      case "books.listPublished": {
        const data = await trpcListPublishedBooks();
        return trpcOk(res, data);
      }
      case "books.listAll": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
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
        await pushToNewsletterProvider(email, name, source);
        return trpcOk(res, { ok: true });
      }
      case "quiz.getQuestions": {
        return trpcOk(res, THEOLOGY_QUIZ_QUESTIONS);
      }
      case "quiz.getRecommendations": {
        const data = await quizGetRecommendations(input);
        return trpcOk(res, data);
      }
      case "posts.create": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const slug = input?.slug || input?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return await withConn(async (c) => {
          const [r]: any = await c.execute(
            `INSERT INTO posts (title, slug, body, excerpt, pillar, readTime, published, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [input?.title || "", slug, input?.body || "", input?.excerpt || "", input?.pillar || "Theological Depth", input?.readTime || "5 min", input?.published ?? false]
          );
          const created = await trpcGetPost(r.insertId);
          return trpcOk(res, created);
        });
      }
      case "posts.update": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const postId = input?.id;
        if (!postId) return trpcErr(res, "BAD_REQUEST", "id required", 400);
        return await withConn(async (c) => {
          const sets: string[] = [];
          const params: any[] = [];
          for (const field of ["title", "slug", "body", "excerpt", "pillar", "readTime", "published", "featured"]) {
            if (input?.[field] !== undefined) {
              sets.push(`${field} = ?`);
              params.push(input[field]);
            }
          }
          if (sets.length === 0) return trpcOk(res, { ok: true });
          sets.push("updatedAt = NOW()");
          params.push(postId);
          await c.execute(`UPDATE posts SET ${sets.join(", ")} WHERE id = ?`, params);
          const updated = await trpcGetPost(postId);
          return trpcOk(res, updated);
        });
      }
      case "posts.delete": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const delId = input?.id ?? input;
        await withConn(async (c) => { await c.execute("DELETE FROM posts WHERE id = ?", [delId]); });
        return trpcOk(res, { ok: true });
      }
      case "posts.publishFullBodies": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const dryRun = !!(input?.dryRun);
        // The client downloads the content file once and sends small batches of
        // items here. Each call only does a handful of quick writes — no 3MB
        // fetch per call, so it never times out.
        const items: { slug: string; body: string; readingTimeMinutes: number }[] =
          Array.isArray(input?.items) ? input.items : [];
        // Guard: never publish a body that still carries unresolved citation
        // placeholders ([cite ...]). Shipping them would put fabricated-looking
        // sources live — a violation of the never-fabricate rule. Skip those
        // items and report them back so they can be resolved before publishing.
        const hasCite = (b: string) => /\[cite/i.test(b || "");
        const blocked: string[] = items.filter((i) => hasCite(i.body)).map((i) => i.slug);
        const safeItems = items.filter((i) => !hasCite(i.body));
        let matched = 0, updated = 0;
        const missing: string[] = [];
        let dbError: string | null = null;
        if (safeItems.length) {
          try {
            await withConn(async (c) => {
              const slugs = safeItems.map((i) => i.slug);
              const placeholders = slugs.map(() => "?").join(",");
              const [existRows]: any = await c.execute(
                `SELECT slug FROM posts WHERE slug IN (${placeholders})`, slugs
              );
              const existing = new Set(existRows.map((r: any) => r.slug));
              const toUpdate = safeItems.filter((it) => existing.has(it.slug));
              for (const it of safeItems) if (!existing.has(it.slug)) missing.push(it.slug);
              matched = toUpdate.length;
              if (!dryRun && toUpdate.length) {
                // One UPDATE per article keeps each statement tiny and avoids
                // huge multi-row CASE statements that some MySQL hosts reject.
                for (const it of toUpdate) {
                  await c.execute(
                    "UPDATE posts SET body = ?, readTime = ?, updatedAt = NOW() WHERE slug = ?",
                    [it.body, `${it.readingTimeMinutes} min read`, it.slug]
                  );
                  updated++;
                }
              }
            });
          } catch (e: any) {
            // Surface the real DB error instead of letting it become an opaque
            // 500 ("unable to transform" on the client). Logged for diagnosis.
            dbError = String(e?.code ? e.code + " " : "") + String(e?.sqlMessage || e?.message || e);
            console.error("publishFullBodies DB error:", dbError, "| firstSlug:", items[0]?.slug);
          }
        }
        return trpcOk(res, { matched, updated, missing, blocked, dryRun, error: dbError });
      }
      case "posts.navIndex": {
        // Slim per-post feed for the primary nav: just what's needed to know
        // which pillars/sub-pathways/series have published posts. Defensive: if
        // the two-level columns don't exist yet, returns them as null/false.
        let rows: any = [];
        await withConn(async (c) => {
          try {
            [rows] = await c.execute(
              "SELECT slug, pillar, subPathway, isSeries FROM posts WHERE published = true LIMIT 2000"
            );
          } catch {
            try {
              const [r2]: any = await c.execute("SELECT slug, pillar FROM posts WHERE published = true LIMIT 2000");
              rows = (r2 as any[]).map((r) => ({ ...r, subPathway: null, isSeries: 0 }));
            } catch { rows = []; }
          }
        });
        return trpcOk(res, (rows as any[]).map((r) => ({
          slug: r.slug, pillar: r.pillar ?? null,
          subPathway: r.subPathway ?? null, isSeries: !!r.isSeries,
        })));
      }
      case "posts.migrateTaxonomy": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const added: string[] = [];
        let migErr: string | null = null;
        try {
          await withConn(async (c) => {
            const [db]: any = await c.query("SELECT DATABASE() AS db");
            const dbName = db[0].db;
            const has = async (col: string) => {
              const [r]: any = await c.execute(
                "SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=? AND TABLE_NAME='posts' AND COLUMN_NAME=? LIMIT 1",
                [dbName, col]
              );
              return r.length > 0;
            };
            if (!(await has("subPathway"))) { await c.query("ALTER TABLE `posts` ADD COLUMN `subPathway` varchar(128) NULL"); added.push("subPathway"); }
            if (!(await has("isSeries"))) { await c.query("ALTER TABLE `posts` ADD COLUMN `isSeries` boolean NOT NULL DEFAULT false"); added.push("isSeries"); }
          });
        } catch (e: any) {
          migErr = String(e?.sqlMessage || e?.message || e);
          console.error("migrateTaxonomy error:", migErr);
        }
        return trpcOk(res, { added, alreadyPresent: added.length === 0, error: migErr });
      }
      case "posts.backfillSubPathways": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const items: { id?: number; slug?: string; pillar?: string | null; sub?: string | null; series?: boolean }[] =
          Array.isArray(input?.items) ? input.items : [];
        let updated = 0;
        const missing: (number | string)[] = [];
        let bErr: string | null = null;
        try {
          await withConn(async (c) => {
            for (const it of items) {
              const sub = it.sub ?? null;
              const series = it.series ? 1 : 0;
              const pillar = it.pillar ?? null;
              // When a pillar is supplied, correct it too (many posts move out of
              // the catch-all). Otherwise only tag the sub-pathway + series flag.
              const cols = pillar ? "pillar = ?, subPathway = ?, isSeries = ?" : "subPathway = ?, isSeries = ?";
              const vals = pillar ? [pillar, sub, series] : [sub, series];
              let res2: any;
              if (it.id != null) {
                [res2] = await c.execute(`UPDATE posts SET ${cols} WHERE id = ?`, [...vals, it.id]);
              } else if (it.slug) {
                [res2] = await c.execute(`UPDATE posts SET ${cols} WHERE slug = ?`, [...vals, it.slug]);
              } else { continue; }
              if (res2 && res2.affectedRows > 0) updated++; else missing.push(it.id ?? it.slug ?? "?");
            }
          });
        } catch (e: any) {
          bErr = String(e?.sqlMessage || e?.message || e);
          console.error("backfillSubPathways error:", bErr);
        }
        return trpcOk(res, { updated, missing, error: bErr });
      }
      case "posts.findDuplicates": {
        // Read-only: group posts by normalized title and return groups that
        // have more than one copy, with a suggested "keep" per group. Nothing
        // is modified. Admin-gated because it exposes the full post inventory.
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        let groups: any[] = [];
        let dErr: string | null = null;
        try {
          await withConn(async (c) => {
            const [rows]: any = await c.execute(
              "SELECT id, slug, title, pillar, published, featured, publishedAt, createdAt, CHAR_LENGTH(COALESCE(body,'')) AS bodyLen FROM posts"
            );
            const norm = (t: any) =>
              String(t || "").toLowerCase().replace(/[‘’“”]/g, "'").replace(/[^a-z0-9]+/g, " ").trim();
            const map: Record<string, any[]> = {};
            for (const r of rows as any[]) {
              const k = norm(r.title);
              if (!k) continue;
              (map[k] = map[k] || []).push(r);
            }
            groups = Object.values(map)
              .filter((g) => g.length > 1)
              .map((g) => {
                // Suggested keep: published first, then longest body, then newest.
                const sorted = [...g].sort(
                  (a, b) =>
                    (Number(b.published) - Number(a.published)) ||
                    (Number(b.bodyLen) - Number(a.bodyLen)) ||
                    (new Date(b.publishedAt || b.createdAt).getTime() -
                      new Date(a.publishedAt || a.createdAt).getTime())
                );
                return {
                  title: sorted[0].title,
                  keepId: sorted[0].id,
                  copies: sorted.map((r) => ({
                    id: r.id, slug: r.slug, pillar: r.pillar ?? null,
                    published: !!r.published, featured: !!r.featured,
                    bodyLen: Number(r.bodyLen) || 0,
                  })),
                };
              })
              .sort((a, b) => b.copies.length - a.copies.length);
          });
        } catch (e: any) {
          dErr = String(e?.sqlMessage || e?.message || e);
          console.error("findDuplicates error:", dErr);
        }
        return trpcOk(res, { groups, error: dErr });
      }
      case "posts.retirePosts": {
        // Unpublish (never delete) the given post ids — reversible cleanup for
        // duplicate rows. Returns how many rows were actually changed.
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const ids: number[] = (Array.isArray(input?.ids) ? input.ids : [])
          .map((n: any) => Number(n))
          .filter((n: number) => Number.isFinite(n));
        let updated = 0;
        let rErr: string | null = null;
        try {
          await withConn(async (c) => {
            for (const id of ids) {
              const [r]: any = await c.execute(
                "UPDATE posts SET published = false, updatedAt = NOW() WHERE id = ?",
                [id]
              );
              updated += r?.affectedRows || 0;
            }
          });
        } catch (e: any) {
          rErr = String(e?.sqlMessage || e?.message || e);
          console.error("retirePosts error:", rErr);
        }
        return trpcOk(res, { updated, error: rErr });
      }
      case "posts.createDrafts": {
        // Insert essays as UNPUBLISHED posts (idempotent by slug). Used by the
        // admin "Load draft essays" button. Inserts the core columns only, then
        // best-effort tags subPathway/isSeries if those columns exist.
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const items: any[] = Array.isArray(input?.items) ? input.items : [];
        let inserted = 0;
        const skipped: string[] = [];
        let cErr: string | null = null;
        try {
          await withConn(async (c) => {
            for (const it of items) {
              if (!it?.slug || !it?.title || !it?.body) continue;
              const [ex]: any = await c.execute("SELECT id FROM posts WHERE slug = ? LIMIT 1", [it.slug]);
              if (Array.isArray(ex) && ex.length > 0) { skipped.push(it.slug); continue; }
              await c.execute(
                "INSERT INTO posts (title, slug, body, excerpt, pillar, readTime, published, featured, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, 0, 0, NOW(), NOW())",
                [it.title, it.slug, it.body, it.excerpt ?? null, it.pillar ?? null, it.readTime ?? null]
              );
              inserted++;
              // Tag taxonomy if those columns exist (post-migration); harmless otherwise.
              try {
                await c.execute(
                  "UPDATE posts SET subPathway = ?, isSeries = ? WHERE slug = ?",
                  [it.subPathway ?? null, it.series ? 1 : 0, it.slug]
                );
              } catch { /* columns not migrated yet — safe to ignore */ }
            }
          });
        } catch (e: any) {
          cErr = String(e?.sqlMessage || e?.message || e);
          console.error("createDrafts error:", cErr);
        }
        return trpcOk(res, { inserted, skipped, error: cErr });
      }
      case "posts.publishBySlugs": {
        // Bulk publish/unpublish by slug (the admin "Publish all" button).
        // Sets published, and on publish stamps publishedAt if not already set.
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const slugs: string[] = Array.isArray(input?.slugs) ? input.slugs.filter((s: any) => typeof s === "string") : [];
        const publish = input?.published !== false; // default true
        let updated = 0;
        let pErr: string | null = null;
        try {
          await withConn(async (c) => {
            for (const slug of slugs) {
              const [r]: any = publish
                ? await c.execute(
                    "UPDATE posts SET published = 1, publishedAt = COALESCE(publishedAt, NOW()), updatedAt = NOW() WHERE slug = ?",
                    [slug]
                  )
                : await c.execute(
                    "UPDATE posts SET published = 0, updatedAt = NOW() WHERE slug = ?",
                    [slug]
                  );
              updated += r?.affectedRows || 0;
            }
          });
        } catch (e: any) {
          pErr = String(e?.sqlMessage || e?.message || e);
          console.error("publishBySlugs error:", pErr);
        }
        return trpcOk(res, { updated, error: pErr });
      }
      case "books.create": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        return await withConn(async (c) => {
          const slug = input?.slug || input?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          const [r]: any = await c.execute(
            `INSERT INTO books (title, slug, author, description, coverImage, bookType, published, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [input?.title || "", slug, input?.author || "James Bell", input?.description || "", input?.coverImage || null, input?.bookType || "authored", input?.published ?? false]
          );
          const [rows]: any = await c.execute("SELECT * FROM books WHERE id = ?", [r.insertId]);
          return trpcOk(res, rows[0] || null);
        });
      }
      case "books.update": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const bookId = input?.id;
        if (!bookId) return trpcErr(res, "BAD_REQUEST", "id required", 400);
        return await withConn(async (c) => {
          const sets: string[] = [];
          const params: any[] = [];
          for (const field of ["title", "slug", "author", "description", "coverImage", "purchaseUrl", "bookType", "published"]) {
            if (input?.[field] !== undefined) {
              sets.push(`${field} = ?`);
              params.push(input[field]);
            }
          }
          if (sets.length === 0) return trpcOk(res, { ok: true });
          sets.push("updatedAt = NOW()");
          params.push(bookId);
          await c.execute(`UPDATE books SET ${sets.join(", ")} WHERE id = ?`, params);
          const [rows]: any = await c.execute("SELECT * FROM books WHERE id = ?", [bookId]);
          return trpcOk(res, rows[0] || null);
        });
      }
      case "books.delete": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const bDelId = input?.id ?? input;
        await withConn(async (c) => { await c.execute("DELETE FROM books WHERE id = ?", [bDelId]); });
        return trpcOk(res, { ok: true });
      }
      case "resources.create": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        return await withConn(async (c) => {
          const [r]: any = await c.execute(
            `INSERT INTO resources (title, description, category, fileType, url, published, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [input?.title || "", input?.description || "", input?.category || "", input?.fileType || "", input?.url || "", input?.published ?? false]
          );
          const [rows]: any = await c.execute("SELECT * FROM resources WHERE id = ?", [r.insertId]);
          return trpcOk(res, rows[0] || null);
        });
      }
      case "resources.getById": {
        const rId = input?.id ?? input;
        return await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT * FROM resources WHERE id = ?", [rId]);
          if (!rows[0]) return trpcErr(res, "NOT_FOUND", "resource not found", 404);
          return trpcOk(res, rows[0]);
        });
      }
      case "resources.update": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const resId = input?.id;
        if (!resId) return trpcErr(res, "BAD_REQUEST", "id required", 400);
        return await withConn(async (c) => {
          const sets: string[] = [];
          const params: any[] = [];
          for (const field of ["title", "description", "category", "fileType", "url", "published"]) {
            if (input?.[field] !== undefined) {
              sets.push(`${field} = ?`);
              params.push(input[field]);
            }
          }
          if (sets.length === 0) return trpcOk(res, { ok: true });
          sets.push("updatedAt = NOW()");
          params.push(resId);
          await c.execute(`UPDATE resources SET ${sets.join(", ")} WHERE id = ?`, params);
          const [rows]: any = await c.execute("SELECT * FROM resources WHERE id = ?", [resId]);
          return trpcOk(res, rows[0] || null);
        });
      }
      case "resources.delete": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const rDelId = input?.id ?? input;
        await withConn(async (c) => { await c.execute("DELETE FROM resources WHERE id = ?", [rDelId]); });
        return trpcOk(res, { ok: true });
      }
      case "settings.get": {
        const key = input?.key ?? input;
        return await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT settingValue FROM site_settings WHERE settingKey = ?", [key]);
          return trpcOk(res, rows[0]?.settingValue ?? null);
        });
      }
      case "settings.getAll": {
        return await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT settingKey, settingValue FROM site_settings");
          const settings: Record<string, string> = {};
          for (const r of rows as any[]) settings[r.settingKey] = r.settingValue;
          return trpcOk(res, settings);
        });
      }
      case "settings.set": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const sKey = input?.key;
        const sVal = input?.value;
        if (!sKey) return trpcErr(res, "BAD_REQUEST", "key required", 400);
        await withConn(async (c) => {
          await c.execute(
            "INSERT INTO site_settings (settingKey, settingValue, updatedAt) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE settingValue = VALUES(settingValue), updatedAt = NOW()",
            [sKey, sVal ?? ""]
          );
        });
        return trpcOk(res, { ok: true });
      }
      case "settings.setMultiple": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const entries = input?.settings ?? input;
        if (!entries || typeof entries !== "object") return trpcErr(res, "BAD_REQUEST", "settings required", 400);
        await withConn(async (c) => {
          for (const [k, v] of Object.entries(entries)) {
            await c.execute(
              "INSERT INTO site_settings (settingKey, settingValue, updatedAt) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE settingValue = VALUES(settingValue), updatedAt = NOW()",
              [k, String(v ?? "")]
            );
          }
        });
        return trpcOk(res, { ok: true });
      }
      case "notifications.listAll": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        return await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT * FROM notifications ORDER BY createdAt DESC LIMIT 50");
          return trpcOk(res, rows);
        });
      }
      case "notifications.create": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        return await withConn(async (c) => {
          await c.execute(
            "INSERT INTO notifications (type, title, message, showAsBanner, createdAt) VALUES (?, ?, ?, ?, NOW())",
            [input?.type || "info", input?.title || "", input?.message || "", input?.showAsBanner ?? false]
          );
          return trpcOk(res, { ok: true });
        });
      }
      case "posts.getFeatured": {
        return await withConn(async (c) => {
          const [rows]: any = await c.execute(
            "SELECT id, slug, title, excerpt, pillar, readTime, readingTimeMinutes, publishedAt, createdAt FROM posts WHERE featured = true AND published = true ORDER BY createdAt DESC LIMIT 10"
          );
          return trpcOk(res, (rows as any[]).map(toFeaturedPostCard));
        });
      }
      case "search.global": {
        const q = typeof input?.query === "string" ? input.query : "";
        const lim = clampLimit(input?.limit);
        if (!q) return trpcOk(res, { success: true, query: "", results: [], count: 0 });
        const [articles, books, resources] = await Promise.all([
          withConn((c) => searchArticlesProd(c, q, lim)).catch(() => [] as SearchResult[]),
          withConn((c) => searchBooksProd(c, q, lim)).catch(() => [] as SearchResult[]),
          withConn((c) => searchResourcesProd(c, q, lim)).catch(() => [] as SearchResult[]),
        ]);
        const results = [...articles, ...books, ...resources].slice(0, lim);
        return trpcOk(res, { success: true, query: q, results, count: results.length });
      }
      case "search.articles": {
        const q = typeof input?.query === "string" ? input.query : "";
        const lim = clampLimit(input?.limit);
        if (!q) return trpcOk(res, { success: true, query: "", results: [], count: 0 });
        const results = await withConn((c) => searchArticlesProd(c, q, lim));
        return trpcOk(res, { success: true, query: q, results, count: results.length });
      }
      case "search.resources": {
        const q = typeof input?.query === "string" ? input.query : "";
        const lim = clampLimit(input?.limit);
        if (!q) return trpcOk(res, { success: true, query: "", results: [], count: 0 });
        const results = await withConn((c) => searchResourcesProd(c, q, lim));
        return trpcOk(res, { success: true, query: q, results, count: results.length });
      }
      case "books.getBySlug": {
        const slug = typeof input?.slug === "string" ? input.slug : "";
        if (!slug) return trpcOk(res, null);
        const book = await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT * FROM books WHERE slug = ? LIMIT 1", [slug]);
          return rows[0] || null;
        });
        if (!book || !book.published) return trpcOk(res, null);
        return trpcOk(res, book);
      }
      case "subscribers.list": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const rows = await withConn(async (c) => {
          const [r]: any = await c.execute("SELECT * FROM subscribers WHERE active = true");
          return r as any[];
        });
        return trpcOk(res, rows);
      }
      case "subscribers.remove": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const email = typeof input?.email === "string" ? input.email : "";
        if (!email) return trpcErr(res, "BAD_REQUEST", "email required", 400);
        await withConn(async (c) => { await c.execute("DELETE FROM subscribers WHERE email = ?", [email]); });
        return trpcOk(res, { success: true });
      }
      case "stripe.membershipEnabled": {
        if (!stripeConfigured()) return trpcOk(res, { enabled: false });
        const priceId = await withConn(async (c) => {
          const [rows]: any = await c.execute(
            "SELECT settingValue FROM site_settings WHERE settingKey = ?",
            ["stripeMembershipPriceId"],
          );
          return rows[0]?.settingValue ?? null;
        });
        return trpcOk(res, { enabled: !!(priceId && String(priceId).trim()) });
      }
      case "stripe.createMembershipCheckout": {
        const stripe = getStripe();
        if (!stripe || !stripeConfigured()) return trpcErr(res, "BAD_REQUEST", "Membership is not open yet.", 400);
        const email = typeof input?.customerEmail === "string" ? input.customerEmail : "";
        if (!email) return trpcErr(res, "BAD_REQUEST", "A valid email is required.", 400);
        const priceId = await withConn(async (c) => {
          const [rows]: any = await c.execute(
            "SELECT settingValue FROM site_settings WHERE settingKey = ?",
            ["stripeMembershipPriceId"],
          );
          return String(rows[0]?.settingValue ?? "").trim();
        });
        if (!priceId) return trpcErr(res, "BAD_REQUEST", "Membership is not open yet.", 400);
        const origin = typeof input?.origin === "string" && input.origin ? input.origin : siteOrigin(req);
        const session = await stripe.checkout.sessions.create({
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [{ price: priceId, quantity: 1 }],
          customer_email: email,
          allow_promotion_codes: true,
          metadata: { kind: "membership", customer_email: email },
          success_url: `${origin}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/membership`,
        });
        return trpcOk(res, { success: true, sessionUrl: session.url || "", sessionId: session.id });
      }
      case "stripe.getCheckoutSession": {
        const stripe = getStripe();
        const sessionId = typeof input?.sessionId === "string" ? input.sessionId : "";
        if (!stripe || !sessionId) return trpcErr(res, "BAD_REQUEST", "Session unavailable.", 400);
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return trpcOk(res, {
          success: true,
          session: {
            id: session.id,
            status: session.payment_status,
            amount: session.amount_total,
            currency: session.currency,
            customerEmail: session.customer_email,
          },
        });
      }
      case "stripe.createCheckoutSession": {
        const stripe = getStripe();
        if (!stripe || !stripeConfigured()) return trpcErr(res, "BAD_REQUEST", "Stripe is not configured.", 400);
        const BOOK_PRICES: Record<number, { title: string; priceUSD: number }> = {
          1: { title: "Book One", priceUSD: 14.99 },
          2: { title: "Book Two", priceUSD: 16.99 },
          3: { title: "Book Three", priceUSD: 12.99 },
        };
        const bookId = Number(input?.bookId);
        const email = typeof input?.customerEmail === "string" ? input.customerEmail : "";
        const name = typeof input?.customerName === "string" ? input.customerName : "";
        const origin = typeof input?.origin === "string" && input.origin ? input.origin : siteOrigin(req);
        const bp = BOOK_PRICES[bookId];
        if (!bp) return trpcErr(res, "BAD_REQUEST", "Book " + bookId + " not found in pricing", 400);
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [{
            price_data: { currency: "usd", product_data: { name: bp.title, description: "Purchase of " + bp.title }, unit_amount: Math.round(bp.priceUSD * 100) },
            quantity: 1,
          }],
          mode: "payment",
          customer_email: email,
          client_reference_id: "book_" + bookId + "_" + Date.now(),
          metadata: { book_id: String(bookId), customer_email: email, customer_name: name },
          success_url: origin + "/books-store?session_id={CHECKOUT_SESSION_ID}&success=true",
          cancel_url: origin + "/books-store?canceled=true",
          allow_promotion_codes: true,
        });
        await withConn((c) =>
          c.execute(
            "INSERT INTO book_purchases (bookId, stripePaymentIntentId, customerEmail, customerName, amountCents, status, sessionId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 'pending', ?, NOW(), NOW())",
            [bookId, (session.payment_intent as string) || null, email, name, Math.round(bp.priceUSD * 100), session.id]
          )
        ).catch((err: any) => console.error("[stripe] purchase record failed:", err?.message));
        return trpcOk(res, { success: true, sessionUrl: session.url || "", sessionId: session.id });
      }

      // ─── Files (admin; scoped to the admin user) ───────────────────
      case "files.list": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const rows = await withConn(async (c) => {
          const [r]: any = await c.execute("SELECT * FROM files WHERE userId = ? ORDER BY createdAt DESC", [1]);
          return r as any[];
        });
        return trpcOk(res, rows);
      }
      case "files.updateDescription": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const id = Number(input?.id);
        if (!Number.isFinite(id)) return trpcErr(res, "BAD_REQUEST", "id required", 400);
        const description = typeof input?.description === "string" ? input.description : "";
        const row = await withConn(async (c) => {
          await c.execute("UPDATE files SET description = ?, updatedAt = NOW() WHERE id = ? AND userId = ?", [description, id, 1]);
          const [r]: any = await c.execute("SELECT * FROM files WHERE id = ? AND userId = ? LIMIT 1", [id, 1]);
          return r[0] || null;
        });
        return trpcOk(res, row);
      }
      case "files.delete": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const id = Number(input?.id);
        if (!Number.isFinite(id)) return trpcErr(res, "BAD_REQUEST", "id required", 400);
        await withConn((c) => c.execute("DELETE FROM files WHERE id = ? AND userId = ?", [id, 1]));
        return trpcOk(res, { success: true });
      }
      case "files.upload": {
        if (!authedSession(req)) return trpcErr(res, "UNAUTHORIZED", "unauthorized", 401);
        const filename = typeof input?.filename === "string" ? input.filename : "";
        const mimeType = typeof input?.mimeType === "string" ? input.mimeType : "application/octet-stream";
        const base64Data = typeof input?.base64Data === "string" ? input.base64Data : "";
        if (!filename || !base64Data) return trpcErr(res, "BAD_REQUEST", "filename and base64Data required", 400);
        const buffer = Buffer.from(base64Data, "base64");
        if (buffer.length > 16 * 1024 * 1024) return trpcErr(res, "BAD_REQUEST", "File size exceeds 16MB limit", 400);
        const baseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const apiKey = process.env.BUILT_IN_FORGE_API_KEY || "";
        if (!baseUrl || !apiKey) return trpcErr(res, "BAD_REQUEST", "Storage proxy not configured", 400);
        const suffix = crypto.randomBytes(9).toString("base64url");
        const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
        const fileKey = "user-1/files/" + safeFilename + "-" + suffix;
        const uploadUrl = new URL("v1/storage/upload", baseUrl + "/");
        uploadUrl.searchParams.set("path", fileKey);
        const form = new FormData();
        form.append("file", new Blob([new Uint8Array(buffer)], { type: mimeType }), safeFilename);
        const up = await fetch(uploadUrl, { method: "POST", headers: { Authorization: "Bearer " + apiKey }, body: form });
        if (!up.ok) return trpcErr(res, "INTERNAL_SERVER_ERROR", "Storage upload failed", 500);
        const url = (await up.json()).url;
        const row = await withConn(async (c) => {
          const [ins]: any = await c.execute(
            "INSERT INTO files (userId, filename, fileKey, url, mimeType, size, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [1, filename, fileKey, url, mimeType, buffer.length, input?.description ?? null]
          );
          const [rows]: any = await c.execute("SELECT * FROM files WHERE id = ? LIMIT 1", [ins.insertId]);
          return rows[0] || null;
        });
        return trpcOk(res, row);
      }

      default:
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
// ---------------------------------------------------------------------------
// Session auth (cookie-based) for /admin UI.
// Distinct from authed() which uses JWT_SECRET as a query/header key for one-shot endpoints.
// Issue an HMAC-signed cookie on login, verify on subsequent requests.
// ---------------------------------------------------------------------------

const SESSION_COOKIE = "lw_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getJwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET missing");
  return s;
}

function signSession(user: string, expMs: number): string {
  const payload = JSON.stringify({ u: user, e: expMs });
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", getJwtSecret()).update(b64).digest("base64url");
  return b64 + "." + sig;
}

function verifySession(token: string | undefined): { user: string } | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [b64, sig] = parts;
  const expected = crypto.createHmac("sha256", getJwtSecret()).update(b64).digest("base64url");
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(b64, "base64url").toString());
    if (typeof payload.e !== "number" || payload.e < Date.now()) return null;
    if (typeof payload.u !== "string") return null;
    return { user: payload.u };
  } catch { return null; }
}

function getCookie(req: VercelRequest, name: string): string | undefined {
  const raw = req.headers.cookie || "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}

function authedSession(req: VercelRequest): { user: string } | null {
  return verifySession(getCookie(req, SESSION_COOKIE));
}

async function authLogin(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }
  // Single admin password; previously unlimited attempts.
  if (rateLimited(req, "login", 5, 10 * 60 * 1000)) {
    res.status(429).json({ error: "Too many attempts. Try again in a few minutes." });
    return;
  }
  try {
    const body = await readBody(req);
    const password = typeof body?.password === "string" ? body.password : "";
    const hash = process.env.ADMIN_PASSWORD_HASH || "";
    if (!hash) {
      res.status(500).json({ error: "server misconfigured", message: "ADMIN_PASSWORD_HASH not set" });
      return;
    }
    if (!password) {
      res.status(400).json({ error: "password required" });
      return;
    }
    const ok = await bcrypt.compare(password, hash);
    if (!ok) {
      res.status(401).json({ error: "invalid credentials" });
      return;
    }
    const token = signSession("admin", Date.now() + SESSION_TTL_MS);
    const cookie = [
      `${SESSION_COOKIE}=${token}`,
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      "Path=/",
      "Max-Age=604800"
    ].join("; ");
    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ ok: true, user: "admin" });
  } catch (err: any) {
    res.status(500).json({ error: "login failed", message: String(err?.message || err) });
  }
}

async function authMe(req: VercelRequest, res: VercelResponse) {
  const session = authedSession(req);
  if (!session) {
    res.status(401).json({ error: "unauthenticated" });
    return;
  }
  res.status(200).json({ user: session.user });
}

async function authLogout(_req: VercelRequest, res: VercelResponse) {
  const cookie = [
    `${SESSION_COOKIE}=`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    "Max-Age=0"
  ].join("; ");
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ ok: true });
}

async function processProc(req: VercelRequest, res: VercelResponse, proc: string, input: any): Promise<any> {
  switch (proc) {
    case "auth.me": {
      const session = authedSession(req);
      if (!session) return { result: { data: superjson.serialize(null) } };
      return { result: { data: superjson.serialize({
        id: 1, openId: "admin", name: "Admin", email: null,
        loginMethod: "password", role: "admin" as const,
        createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date(),
      })}};
    }
    case "auth.logout": {
      res.setHeader("Set-Cookie", [`${SESSION_COOKIE}=`, "HttpOnly", "Secure", "SameSite=Lax", "Path=/", "Max-Age=0"].join("; "));
      return { result: { data: superjson.serialize({ ok: true }) } };
    }
    case "posts.listPublished":
      return { result: { data: superjson.serialize(await trpcListPosts()) } };
    case "posts.listAll": {
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      return { result: { data: superjson.serialize(await trpcListPosts()) } };
    }
    case "posts.listForIndex":
      return { result: { data: superjson.serialize(await trpcListPostsForIndex()) } };
    case "posts.getById": {
      const row = await trpcGetPost(input?.id ?? input);
      if (!row) return { error: { message: "post not found", code: -32603, data: { code: "NOT_FOUND", httpStatus: 404 } } };
      return { result: { data: superjson.serialize(row) } };
    }
    case "posts.bySlug":
    case "posts.getBySlug": {
      const row = await trpcGetPost(input?.slug ?? input);
      if (!row) return { error: { message: "post not found", code: -32603, data: { code: "NOT_FOUND", httpStatus: 404 } } };
      return { result: { data: superjson.serialize(row) } };
    }
    case "relatedArticles.getRelated":
      return { result: { data: superjson.serialize(await trpcGetRelated(input?.slug ?? "", input?.pillar)) } };
    case "books.listPublished":
      return { result: { data: superjson.serialize(await trpcListPublishedBooks()) } };
    case "books.listAll":
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      return { result: { data: superjson.serialize(await trpcListBooks()) } };
    case "books.getById": {
      const all = await trpcListBooks();
      const row = all.find((b: any) => String(b.id) === String(input?.id ?? input) || b.slug === String(input?.id ?? input));
      if (!row) return { error: { message: "book not found", code: -32603, data: { code: "NOT_FOUND", httpStatus: 404 } } };
      return { result: { data: superjson.serialize(row) } };
    }
    case "resources.listPublished":
    case "resources.listAll": {
      // listPublished is public; listAll (admin) returns unpublished rows too.
      const wantAll = proc === "resources.listAll";
      if (wantAll && !authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        return await withConn(async (c) => {
          // Both are bounded so the payload can't run away.
          const [rows]: any = await c.execute(
            wantAll
              ? "SELECT * FROM resources ORDER BY createdAt DESC LIMIT 1000"
              : "SELECT * FROM resources WHERE published = true ORDER BY createdAt DESC LIMIT 1000"
          );
          return { result: { data: superjson.serialize(rows) } };
        });
      } catch { return { result: { data: superjson.serialize([]) } }; }
    }
    case "settings.get": {
      const key = input?.key ?? input;
      try {
        return await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT settingValue FROM site_settings WHERE settingKey = ?", [key]);
          return { result: { data: superjson.serialize(rows[0]?.settingValue ?? null) } };
        });
      } catch { return { result: { data: superjson.serialize(null) } }; }
    }
    case "settings.getAll":
      try {
        return await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT settingKey, settingValue FROM site_settings");
          const settings: Record<string, string> = {};
          for (const r of rows as any[]) settings[r.settingKey] = r.settingValue;
          return { result: { data: superjson.serialize(settings) } };
        });
      } catch { return { result: { data: superjson.serialize({}) } }; }
    case "subscribers.subscribe": {
      const email = String(input?.email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: { message: "invalid email", code: -32603, data: { code: "BAD_REQUEST", httpStatus: 400 } } };
      // Segment travels inside source ("pastors-page:pastor") so no schema
      // change is needed; first write wins so the original context sticks.
      const audienceType = typeof input?.audienceType === "string" ? input.audienceType.slice(0, 24) : "";
      const source = [String(input?.source || "site").slice(0, 48), audienceType].filter(Boolean).join(":");
      try {
        await withConn(async (c) => {
          try {
            await c.execute("INSERT INTO subscribers (email, name, source) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=COALESCE(VALUES(name), name)", [email, input?.name || null, source]);
          } catch {
            // The live table may lack name/source columns; never lose the email.
            await c.execute("INSERT INTO subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE active=1", [email]);
          }
        });
        await pushToNewsletterProvider(email, input?.name || null, String(input?.source || "site"));
      } catch { /* ignore */ }
      return { result: { data: superjson.serialize({ ok: true }) } };
    }
    case "quiz.getQuestions":
      return { result: { data: superjson.serialize(THEOLOGY_QUIZ_QUESTIONS) } };
    case "quiz.getRecommendations":
      return { result: { data: superjson.serialize(await quizGetRecommendations(input)) } };
    case "notifications.listAll":
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        return await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT * FROM notifications ORDER BY createdAt DESC LIMIT 50");
          return { result: { data: superjson.serialize(rows) } };
        });
      } catch { return { result: { data: superjson.serialize([]) } }; }
    case "posts.getFeatured":
      try {
        return await withConn(async (c) => {
          const [rows]: any = await c.execute("SELECT id, slug, title, excerpt, pillar, readTime, readingTimeMinutes, publishedAt, createdAt FROM posts WHERE featured = true AND published = true ORDER BY createdAt DESC LIMIT 10");
          return { result: { data: superjson.serialize((rows as any[]).map(toFeaturedPostCard)) } };
        });
      } catch { return { result: { data: superjson.serialize([]) } }; }
    case "community.testimonials.listAll":
      // Moderation queue: includes pending/unapproved rows + submitter PII. Admin-only.
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        return await withConn(async (c) => {
          const [pending]: any = await c.execute("SELECT * FROM testimonials WHERE approved = false ORDER BY createdAt DESC");
          const [approved]: any = await c.execute("SELECT * FROM testimonials WHERE approved = true ORDER BY createdAt DESC");
          return { result: { data: superjson.serialize({ pending, approved }) } };
        });
      } catch { return { result: { data: superjson.serialize({ pending: [], approved: [] }) } }; }
    case "community.testimonials.approve":
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        await withConn(async (c) => { await c.execute("UPDATE testimonials SET approved = true WHERE id = ?", [input?.id ?? input]); });
        return { result: { data: superjson.serialize({ ok: true }) } };
      } catch (e: any) { return { error: { message: String(e?.message), code: -32603, data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 } } }; }
    case "community.testimonials.delete":
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        await withConn(async (c) => { await c.execute("DELETE FROM testimonials WHERE id = ?", [input?.id ?? input]); });
        return { result: { data: superjson.serialize({ ok: true }) } };
      } catch (e: any) { return { error: { message: String(e?.message), code: -32603, data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 } } }; }
    case "community.testimonials.toggleFeatured":
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        await withConn(async (c) => { await c.execute("UPDATE testimonials SET featured = NOT featured WHERE id = ?", [input?.id ?? input]); });
        return { result: { data: superjson.serialize({ ok: true }) } };
      } catch (e: any) { return { error: { message: String(e?.message), code: -32603, data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 } } }; }
    case "community.comments.listAll":
      // Moderation queue: includes pending/unapproved rows + submitter PII. Admin-only.
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        return await withConn(async (c) => {
          const [pending]: any = await c.execute("SELECT * FROM comments WHERE approved = false ORDER BY createdAt DESC");
          const [approved]: any = await c.execute("SELECT * FROM comments WHERE approved = true ORDER BY createdAt DESC");
          return { result: { data: superjson.serialize({ pending, approved }) } };
        });
      } catch { return { result: { data: superjson.serialize({ pending: [], approved: [] }) } }; }
    case "community.comments.approve":
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        await withConn(async (c) => { await c.execute("UPDATE comments SET approved = true WHERE id = ?", [input?.id ?? input]); });
        return { result: { data: superjson.serialize({ ok: true }) } };
      } catch (e: any) { return { error: { message: String(e?.message), code: -32603, data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 } } }; }
    case "community.comments.delete":
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        await withConn(async (c) => { await c.execute("DELETE FROM comments WHERE id = ?", [input?.id ?? input]); });
        return { result: { data: superjson.serialize({ ok: true }) } };
      } catch (e: any) { return { error: { message: String(e?.message), code: -32603, data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 } } }; }
    case "feedSync.getStatus":
      return { result: { data: superjson.serialize({ sources: [{ name: "Substack", url: "https://jamesbell333289.substack.com/feed", lastSync: null, status: "idle" }], schedule: "Manual" }) } };
    case "feedSync.syncAll":
    case "feedSync.syncSource":
      return { result: { data: superjson.serialize({ ok: true, message: "Feed sync not yet configured. Use the admin panel to add articles manually." }) } };
    case "notifications.delete":
      if (!authedSession(req)) return { error: { message: "unauthorized", code: -32603, data: { code: "UNAUTHORIZED", httpStatus: 401 } } };
      try {
        await withConn(async (c) => { await c.execute("DELETE FROM notifications WHERE id = ?", [input?.id ?? input]); });
        return { result: { data: superjson.serialize({ ok: true }) } };
      } catch (e: any) { return { error: { message: String(e?.message), code: -32603, data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 } } }; }
    case "adminNotifications.list":
    case "adminNotifications.unread":
    case "adminNotifications.markAsRead":
      return { result: { data: superjson.serialize([]) } };
    default:
      if (proc.endsWith(".listPublished") || proc.endsWith(".listAll")) return { result: { data: superjson.serialize([]) } };
      return { error: { message: "procedure not found: " + proc, code: -32603, data: { code: "NOT_FOUND", httpStatus: 404 } } };
  }
}

async function trpcBatchHandler(req: VercelRequest, res: VercelResponse, procs: string[]) {
  try {
    let parsedInputs: Record<string, any> = {};
    if (req.method === "GET") {
      const raw = (req.query.input as string) || "";
      if (raw) { try { parsedInputs = JSON.parse(raw); } catch { /* ignore */ } }
    } else if (req.method === "POST") {
      parsedInputs = await readBody(req) || {};
    }

    const results = await Promise.all(
      procs.map(async (proc, i) => {
        const input = parsedInputs?.[String(i)]?.json ?? null;
        try {
          return await processProc(req, res, proc, input);
        } catch (e: any) {
          return { error: { message: String(e?.message || e), code: -32603, data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 } } };
        }
      })
    );

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).send(JSON.stringify(results));
  } catch (e: any) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(500).send(JSON.stringify(procs.map(() => ({ error: { message: String(e?.message || e), code: -32603, data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500 } } }))));
  }
}

async function organizeArticles(req: VercelRequest, res: VercelResponse) {
  if (!authedSession(req) && !authed(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const out = await withConn(async (c) => {
      const [rows]: any = await c.execute("SELECT id, title, body, pillar FROM posts");
      let updated = 0;
      for (const row of rows as any[]) {
        const text = ((row.title || "") + " " + (row.body || "")).toLowerCase();
        let pillar = row.pillar;
        if (text.match(/marriage|spouse|husband|wife|divorce|covenant|intimacy|emotional labor|wedding|vow/)) pillar = "Living Well";
        else if (text.match(/parent|child|son|daughter|family|fatherhood|motherhood|raising|teenager/)) pillar = "Living Well";
        else if (text.match(/finances|money|stewardship|budget|tithe|giving|debt/)) pillar = "Living Well";
        else if (text.match(/justice|racism|inequality|oppression|silent|prophetic|politics|nationalism|empire|complicit/)) pillar = "Prophetic Justice";
        else if (text.match(/doubt|skeptic|atheist|deconstruct|crisis|question|believe|faith.*crisis|dark night/)) pillar = "Faith & Theology";
        else if (text.match(/pastor|ministry|burnout|church.*lead|shepherd|preach|sermon|congregation|elder|deacon/)) pillar = "Pastoral Ministry";
        else if (text.match(/theology|scripture|bible|hermeneutic|doctrine|atonement|trinity|creation|eschatology|soteriology/)) pillar = "Theological Depth";
        if (pillar !== row.pillar) {
          await c.execute("UPDATE posts SET pillar = ? WHERE id = ?", [pillar, row.id]);
          updated++;
        }
      }
      const [counts]: any = await c.execute("SELECT pillar, COUNT(*) as n FROM posts GROUP BY pillar ORDER BY n DESC");
      return { updated, total: rows.length, distribution: counts };
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

async function adminStatus(req: VercelRequest, res: VercelResponse) {
  const adminReady = Boolean(process.env.JWT_SECRET && process.env.ADMIN_PASSWORD_HASH);
  // The login page probes this while logged out to decide whether to show the
  // "Setup required" banner; gating the whole endpoint made the banner fire
  // unconditionally. Unauthenticated callers get only the boolean.
  if (!authedSession(req)) return json(res, 200, { ok: true, adminReady });
  json(res, 200, {
    ok: true,
    configured: {
      DATABASE_URL: Boolean(process.env.DATABASE_URL),
      JWT_SECRET: Boolean(process.env.JWT_SECRET),
      ADMIN_PASSWORD_HASH: Boolean(process.env.ADMIN_PASSWORD_HASH),
      STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY),
    },
    adminReady,
  });
}

async function contactForm(req: VercelRequest, res: VercelResponse) {
  if (rateLimited(req, "contact", 10, 60 * 1000)) return json(res, 429, { error: "Too many requests. Give it a minute and try again." });
  if (req.method !== "POST") return json(res, 405, { error: "method not allowed" });
  try {
    const body = await readBody(req);
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const subject = String(body?.subject || "").trim();
    const message = String(body?.message || "").trim();
    if (!email || !message) return json(res, 400, { error: "Email and message are required" });
    // The save IS the product here: the site tells people a person reads
    // these. Returning ok:true after a failed insert made every client
    // error state unreachable and silently dropped the message.
    try {
      await withConn(async (c) => {
        await c.execute(
          `CREATE TABLE IF NOT EXISTS contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(200),
            email VARCHAR(320) NOT NULL,
            subject VARCHAR(500),
            message TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
        );
        await c.execute(
          "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
          [name || null, email, subject || null, message]
        );
      });
    } catch (dbErr: any) {
      console.error("[contact] save failed:", dbErr?.message || dbErr);
      return json(res, 500, { ok: false, error: "We couldn't save your message. Please try again." });
    }
    json(res, 200, { ok: true, message: "Message received. Thank you." });
  } catch (e: any) {
    console.error("[contact]", e?.message || e);
    json(res, 500, { ok: false, error: "We couldn't save your message. Please try again." });
  }
}

// Admin-only datasets moved out of the public dist (QW-29): 4.3 MB of
// pre-publication draft bodies (with unverified [cite] stubs) and the article
// library were previously served to anyone at a public URL.
const ADMIN_DATASETS: Record<string, URL> = {
  "article-bodies": new URL("./_data/admin-article-bodies.json", import.meta.url),
  "article-library": new URL("./_data/article-library.json", import.meta.url),
  "draft-essays": new URL("./_data/draft-essays.json", import.meta.url),
};
async function adminDataset(req: VercelRequest, res: VercelResponse, key: string) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  const file = ADMIN_DATASETS[key];
  if (!file) return json(res, 404, { error: "unknown dataset" });
  try {
    const raw = await readFile(file, "utf8");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(raw);
  } catch (e: any) {
    console.error("[admin:dataset]", key, e?.message || e);
    return json(res, 500, { error: "Could not load dataset." });
  }
}

// Minimal admin reader for the contact inbox — until this existed, nothing
// anywhere read contact_messages, so every submission (including assessment
// results people asked to keep on file) went into a dead-letter table.
async function adminContactMessages(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const rows = await withConn(async (c) => {
      const [r]: any = await c.query(
        "SELECT id, name, email, subject, message, createdAt FROM contact_messages ORDER BY createdAt DESC LIMIT 100"
      );
      return r;
    });
    return json(res, 200, { ok: true, messages: rows });
  } catch (e: any) {
    console.error("[contact:list]", e?.message || e);
    return json(res, 500, { ok: false, error: "Could not load messages." });
  }
}

// ---------------------------------------------------------------------------
// LiveWell RSS feed at /api/rss.xml (the rewrite below also catches /rss.xml).
// Returns RSS 2.0 with full <content:encoded> CDATA bodies — the elite cut for
// feed readers like Feedly, NetNewsWire, etc.
// ---------------------------------------------------------------------------
function escapeXml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function rssLiveWell(_req: VercelRequest, res: VercelResponse) {
  const SITE_URL = "https://www.livewellbyjamesbell.co";
  const SITE_NAME = "LiveWell by James Bell";
  const DESC = "Theology that carries the weight of everyday life. Essays on faith, justice, marriage, parenting, and pastoral ministry by James Bell.";
  try {
    const rows: any[] = await withConn(async (c) => {
      const [posts]: any = await c.query(
        `SELECT slug, title, excerpt, body, coverImage, publishedAt, updatedAt
           FROM posts
          WHERE published = true
          ORDER BY publishedAt DESC, updatedAt DESC
          LIMIT 50`
      );
      return Array.isArray(posts) ? posts : [];
    });
    const buildDate = new Date().toUTCString();
    const items = rows
      .map((p) => {
        const url = `${SITE_URL}/writing/${p.slug}`;
        const pubDate = (p.publishedAt ? new Date(p.publishedAt) : new Date(p.updatedAt || Date.now())).toUTCString();
        const excerpt = p.excerpt || (p.body || "").slice(0, 280);
        return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(excerpt)}</description>
      <content:encoded><![CDATA[${p.body || ""}]]></content:encoded>
      <dc:creator>James Bell</dc:creator>
    </item>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(DESC)}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>Pastorjbell206@gmail.com (James Bell)</managingEditor>
${items}
  </channel>
</rss>`;
    res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300, s-maxage=600");
    res.status(200).send(xml);
  } catch (e: any) {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(500).send(`<?xml version="1.0"?><error>${escapeXml(String(e?.message || e))}</error>`);
  }
}

// ---------------------------------------------------------------------------
// LiveWell-series ebooks: Stripe Checkout + gated PDF delivery.
//
// The PDFs live in api/_ebooks/ (referenced via new URL(..., import.meta.url) so
// Vercel's file tracer bundles them into the function) and are NEVER served as
// static assets — the only way to fetch one is through /api/download with a
// Stripe session that is actually paid. Price IDs come from env so flipping
// test -> live keys needs no code change.
// ---------------------------------------------------------------------------
interface EbookConfig {
  title: string;
  priceEnv: string;
  file: URL;
  filename: string;
}

const EBOOKS: Record<string, EbookConfig> = {
  "consider-the-birds": {
    title: "Consider the Birds",
    priceEnv: "STRIPE_PRICE_CONSIDER_THE_BIRDS",
    file: new URL("./_ebooks/consider-the-birds.pdf", import.meta.url),
    filename: "Consider-the-Birds.pdf",
  },
  "where-your-treasure-is": {
    title: "Where Your Treasure Is",
    priceEnv: "STRIPE_PRICE_WHERE_YOUR_TREASURE_IS",
    file: new URL("./_ebooks/where-your-treasure-is.pdf", import.meta.url),
    filename: "Where-Your-Treasure-Is.pdf",
  },
  "alone-in-a-crowded-church": {
    title: "Alone in a Crowded Church",
    priceEnv: "STRIPE_PRICE_ALONE_IN_A_CROWDED_CHURCH",
    file: new URL("./_ebooks/alone-in-a-crowded-church.pdf", import.meta.url),
    filename: "Alone-in-a-Crowded-Church.pdf",
  },
  "covenant": {
    title: "Covenant",
    priceEnv: "STRIPE_PRICE_COVENANT",
    file: new URL("./_ebooks/covenant.pdf", import.meta.url),
    filename: "Covenant.pdf",
  },
  "babylon": {
    title: "Babylon",
    priceEnv: "STRIPE_PRICE_BABYLON",
    file: new URL("./_ebooks/babylon.pdf", import.meta.url),
    filename: "Babylon.pdf",
  },
  "how-to-read-the-bible": {
    title: "How to Read the Bible",
    priceEnv: "STRIPE_PRICE_HOW_TO_READ_THE_BIBLE",
    file: new URL("./_ebooks/how-to-read-the-bible.pdf", import.meta.url),
    filename: "How-to-Read-the-Bible.pdf",
  },
  "be-true-to-yourself": {
    title: "Be True to Yourself",
    priceEnv: "STRIPE_PRICE_BE_TRUE_TO_YOURSELF",
    file: new URL("./_ebooks/be-true-to-yourself.pdf", import.meta.url),
    filename: "Be-True-to-Yourself.pdf",
  },
  "what-belongs-to-the-poor": {
    title: "What Belongs to the Poor",
    priceEnv: "STRIPE_PRICE_WHAT_BELONGS_TO_THE_POOR",
    file: new URL("./_ebooks/what-belongs-to-the-poor.pdf", import.meta.url),
    filename: "What-Belongs-to-the-Poor.pdf",
  },
  "rule-of-life": {
    title: "Rule of Life",
    priceEnv: "STRIPE_PRICE_RULE_OF_LIFE",
    file: new URL("./_ebooks/rule-of-life.pdf", import.meta.url),
    filename: "Rule-of-Life.pdf",
  },
  "why-not-what": {
    title: "Why Not What",
    priceEnv: "STRIPE_PRICE_WHY_NOT_WHAT",
    file: new URL("./_ebooks/why-not-what.pdf", import.meta.url),
    filename: "Why-Not-What.pdf",
  },
  "sermon-on-the-mount-as-politics": {
    title: "The Sermon on the Mount as Politics",
    priceEnv: "STRIPE_PRICE_SERMON_ON_THE_MOUNT_AS_POLITICS",
    file: new URL("./_ebooks/sermon-on-the-mount-as-politics.pdf", import.meta.url),
    filename: "The-Sermon-on-the-Mount-as-Politics.pdf",
  },
  "prophetic-justice-101": {
    title: "Prophetic Justice 101",
    priceEnv: "STRIPE_PRICE_PROPHETIC_JUSTICE_101",
    file: new URL("./_ebooks/prophetic-justice-101.pdf", import.meta.url),
    filename: "Prophetic-Justice-101.pdf",
  },
  "marriage-in-ministry": {
    title: "Marriage in Ministry",
    priceEnv: "STRIPE_PRICE_MARRIAGE_IN_MINISTRY",
    file: new URL("./_ebooks/marriage-in-ministry.pdf", import.meta.url),
    filename: "Marriage-in-Ministry.pdf",
  },
  "the-loneliness-of-the-pastor": {
    title: "The Loneliness of the Pastor",
    priceEnv: "STRIPE_PRICE_THE_LONELINESS_OF_THE_PASTOR",
    file: new URL("./_ebooks/the-loneliness-of-the-pastor.pdf", import.meta.url),
    filename: "The-Loneliness-of-the-Pastor.pdf",
  },
  "healwell": {
    title: "HealWell",
    priceEnv: "STRIPE_PRICE_HEALWELL",
    file: new URL("./_ebooks/healwell.pdf", import.meta.url),
    filename: "HealWell.pdf",
  },
  "born-again-from-atheism": {
    title: "Born Again From Atheism",
    priceEnv: "STRIPE_PRICE_BORN_AGAIN_FROM_ATHEISM",
    file: new URL("./_ebooks/born-again-from-atheism.pdf", import.meta.url),
    filename: "Born-Again-from-Atheism.pdf",
  },
  "the-god-who-is-not-nice": {
    title: "The God Who Is Not Nice",
    priceEnv: "STRIPE_PRICE_THE_GOD_WHO_IS_NOT_NICE",
    file: new URL("./_ebooks/the-god-who-is-not-nice.pdf", import.meta.url),
    filename: "The-God-Who-Is-Not-Nice.pdf",
  },
  "faith-after-deconstruction": {
    title: "Faith After Deconstruction",
    priceEnv: "STRIPE_PRICE_FAITH_AFTER_DECONSTRUCTION",
    file: new URL("./_ebooks/faith-after-deconstruction.pdf", import.meta.url),
    filename: "Faith-after-Deconstruction.pdf",
  },
  "ordinary-holiness": {
    title: "Ordinary Holiness",
    priceEnv: "STRIPE_PRICE_ORDINARY_HOLINESS",
    file: new URL("./_ebooks/ordinary-holiness.pdf", import.meta.url),
    filename: "Ordinary-Holiness.pdf",
  },
  "the-scandal-of-the-cross": {
    title: "The Scandal of the Cross",
    priceEnv: "STRIPE_PRICE_THE_SCANDAL_OF_THE_CROSS",
    file: new URL("./_ebooks/the-scandal-of-the-cross.pdf", import.meta.url),
    filename: "The-Scandal-of-the-Cross.pdf",
  },
  "heaven-is-not-your-reward": {
    title: "Heaven Is Not Your Reward",
    priceEnv: "STRIPE_PRICE_HEAVEN_IS_NOT_YOUR_REWARD",
    file: new URL("./_ebooks/heaven-is-not-your-reward.pdf", import.meta.url),
    filename: "Heaven-Is-Not-Your-Reward.pdf",
  },
  "prayer-in-the-dark": {
    title: "Prayer in the Dark",
    priceEnv: "STRIPE_PRICE_PRAYER_IN_THE_DARK",
    file: new URL("./_ebooks/prayer-in-the-dark.pdf", import.meta.url),
    filename: "Prayer-in-the-Dark.pdf",
  },
  "the-body-you-left": {
    title: "The Body You Left",
    priceEnv: "STRIPE_PRICE_THE_BODY_YOU_LEFT",
    file: new URL("./_ebooks/the-body-you-left.pdf", import.meta.url),
    filename: "The-Body-You-Left.pdf",
  },
};

const PRODUCTION_SITE_URL = "https://livewellbyjamesbell.co";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

/** A real Stripe key is present (not the build-time placeholder). */
function stripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY?.trim() || "";
  return key.startsWith("sk_") && key !== "sk_test_placeholder";
}

// Build absolute URLs from the request so checkout works on Vercel preview
// deployments too, not just the production domain.
function siteOrigin(req: VercelRequest): string {
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host = (req.headers["x-forwarded-host"] as string) || req.headers.host || "";
  return host ? `${proto}://${host}` : PRODUCTION_SITE_URL;
}

async function ebookCheckout(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return json(res, 405, { error: "method not allowed" });
  const stripe = getStripe();
  if (!stripe) return json(res, 503, { error: "Checkout is not configured yet." });
  try {
    const body = await readBody(req);
    const slug = String(body?.slug || "");
    const book = EBOOKS[slug];
    if (!book) return json(res, 400, { error: "Unknown book." });
    const priceId = await resolveEbookPriceId(slug, book.priceEnv);
    if (!priceId) return json(res, 503, { error: "This book is not on sale yet." });
    const origin = siteOrigin(req);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/${slug}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${slug}`,
      metadata: { slug },
    });
    return json(res, 200, { url: session.url });
  } catch (e: any) {
    // Log the real error server-side; never leak raw Stripe internals to the
    // buyer-facing button (key names, decline plumbing, stack fragments).
    console.error("[checkout]", e?.message || e);
    return json(res, 500, { error: "Checkout is unavailable right now. Please try again in a few minutes." });
  }
}

async function ebookDownload(req: VercelRequest, res: VercelResponse) {
  const check = req.query.check === "1";
  const stripe = getStripe();
  const sessionId = String(req.query.session_id || "");
  if (!stripe) return json(res, 503, { error: "not configured", paid: false, ok: false });
  if (!sessionId) return json(res, 400, { error: "missing session_id", paid: false, ok: false });
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const slug = String(session.metadata?.slug || "");
    const book = EBOOKS[slug];
    const paid = (session.payment_status === "paid" || session.status === "complete") && Boolean(book);
    // Record the purchase durably on the thank-you round-trip too, so a record
    // exists even if the Stripe webhook was slow or never fired.
    if (paid) { try { await recordPurchase(session); } catch { /* best-effort */ } }
    if (check) {
      return json(res, 200, { ok: true, paid, slug, title: book?.title || null });
    }
    if (!paid) return json(res, 402, { error: "payment not completed" });
    const data = readFileSync(book!.file);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${book!.filename}"`);
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).send(data);
  } catch (e: any) {
    if (check) return json(res, 200, { ok: false, paid: false });
    return json(res, 500, { error: String(e?.message || e) });
  }
}

// Durable record of a completed ebook purchase. Authenticity is guaranteed by
// re-retrieving the checkout session from Stripe (a forged webhook body cannot
// fabricate a paid session), so this does not depend on raw-body signature
// verification, which a shared catch-all serverless function cannot obtain cleanly.
async function recordPurchase(session: Stripe.Checkout.Session): Promise<void> {
  const slug = String(session.metadata?.slug || "");
  if (!slug || !EBOOKS[slug]) return;
  const email = session.customer_details?.email || session.customer_email || null;
  const amount = session.amount_total ?? null;
  const currency = session.currency ?? null;
  await withConn(async (c) => {
    await c.execute(`CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      sessionId VARCHAR(255) NOT NULL UNIQUE,
      slug VARCHAR(191) NOT NULL,
      email VARCHAR(320),
      amountTotal INT,
      currency VARCHAR(12),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    await c.execute(
      "INSERT INTO purchases (sessionId, slug, email, amountTotal, currency) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email = COALESCE(VALUES(email), email), amountTotal = VALUES(amountTotal), currency = VALUES(currency)",
      [session.id, slug, email, amount, currency],
    );
  });
}

// Durable record of a new member (a completed membership subscription checkout),
// so a paying supporter is captured for the member letter even if the success
// redirect drops. Members live in the subscribers table under source "membership".
async function recordMember(session: Stripe.Checkout.Session): Promise<void> {
  const email = session.customer_details?.email || (session.metadata?.customer_email as string) || session.customer_email || null;
  if (!email) return;
  const lower = email.toLowerCase();
  await withConn(async (c) => {
    await c.execute(
      "INSERT INTO subscribers (email, name, source) VALUES (?, ?, 'membership') ON DUPLICATE KEY UPDATE source = 'membership'",
      [lower, null],
    );
  });
  try { await pushToNewsletterProvider(lower, null, "membership"); } catch { /* best-effort */ }
}

// Stripe webhook. Stripe POSTs here when a checkout completes. We re-retrieve the
// session from Stripe (which authenticates it far more strongly than trusting the
// posted body) and record the purchase durably, so a paying customer is never lost
// even if the browser redirect to the thank-you page drops. Always answers 2xx
// quickly so Stripe does not enter a retry storm on a transient hiccup we handle.
async function stripeWebhook(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return json(res, 405, { error: "method not allowed" });
  const stripe = getStripe();
  if (!stripe) return json(res, 200, { received: true, note: "stripe not configured" });
  try {
    const event = await readBody(req);
    const type = String(event?.type || "");
    const obj: any = event?.data?.object || {};
    if (type === "checkout.session.completed" || type === "checkout.session.async_payment_succeeded") {
      const sessionId = String(obj?.id || "");
      if (sessionId) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const paid = session.payment_status === "paid" || session.status === "complete";
        if (paid) {
          try { await recordPurchase(session); } catch { /* best-effort durability */ }
          if (session.metadata?.kind === "membership") {
            try { await recordMember(session); } catch { /* best-effort */ }
          }
        }
      }
    }
    return json(res, 200, { received: true });
  } catch (e: any) {
    // Still answer 2xx so Stripe does not hammer retries on a transient error.
    return json(res, 200, { received: true, error: String(e?.message || e) });
  }
}

// Read-only owner metrics for the admin dashboard: audience (subscribers), sales
// (orders + revenue from the purchases table, by book and recent), and catalog
// counts. Every table read is guarded so a fresh install never 500s. Reading-depth
// events (essays finished, returns) require client instrumentation not yet present.
async function adminMetrics(req: VercelRequest, res: VercelResponse) {
  if (!authed(req) && !authedSession(req)) return json(res, 401, { error: "unauthorized" });
  try {
    const out = await withConn(async (c) => {
      const has = async (t: string): Promise<boolean> => {
        try { const [r]: any = await c.query("SHOW TABLES LIKE ?", [t]); return Array.isArray(r) && r.length > 0; } catch { return false; }
      };
      const result: any = {
        audience: { subscribers: 0, newThisMonth: 0, members: 0 },
        sales: { orders: 0, revenueCents: 0, currency: "usd", byBook: [] as any[], recent: [] as any[] },
        catalog: { publishedPosts: 0, publishedBooks: 0 },
      };
      if (await has("subscribers")) {
        try { const [r]: any = await c.query("SELECT COUNT(*) AS n FROM subscribers"); result.audience.subscribers = Number(r?.[0]?.n ?? 0); } catch { /* noop */ }
        try { const [r]: any = await c.query("SELECT COUNT(*) AS n FROM subscribers WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)"); result.audience.newThisMonth = Number(r?.[0]?.n ?? 0); } catch { /* noop */ }
        try { const [r]: any = await c.query("SELECT COUNT(*) AS n FROM subscribers WHERE source LIKE 'member%'"); result.audience.members = Number(r?.[0]?.n ?? 0); } catch { /* noop */ }
      }
      if (await has("purchases")) {
        try { const [r]: any = await c.query("SELECT COUNT(*) AS n, COALESCE(SUM(amountTotal),0) AS rev, MAX(currency) AS cur FROM purchases"); result.sales.orders = Number(r?.[0]?.n ?? 0); result.sales.revenueCents = Number(r?.[0]?.rev ?? 0); result.sales.currency = r?.[0]?.cur || "usd"; } catch { /* noop */ }
        try { const [rows]: any = await c.query("SELECT slug, COUNT(*) AS orders, COALESCE(SUM(amountTotal),0) AS rev FROM purchases GROUP BY slug ORDER BY orders DESC"); result.sales.byBook = (rows as any[]).map((x) => ({ slug: x.slug, title: EBOOKS[x.slug]?.title || x.slug, orders: Number(x.orders), revenueCents: Number(x.rev) })); } catch { /* noop */ }
        try { const [rows]: any = await c.query("SELECT slug, email, amountTotal, createdAt FROM purchases ORDER BY createdAt DESC LIMIT 10"); result.sales.recent = (rows as any[]).map((x) => ({ slug: x.slug, title: EBOOKS[x.slug]?.title || x.slug, email: x.email, amountTotal: x.amountTotal, createdAt: x.createdAt })); } catch { /* noop */ }
      }
      if (await has("posts")) { try { const [r]: any = await c.query("SELECT COUNT(*) AS n FROM posts WHERE published = true"); result.catalog.publishedPosts = Number(r?.[0]?.n ?? 0); } catch { /* noop */ } }
      if (await has("books")) { try { const [r]: any = await c.query("SELECT COUNT(*) AS n FROM books WHERE published = true"); result.catalog.publishedBooks = Number(r?.[0]?.n ?? 0); } catch { /* noop */ } }
      return result;
    });
    json(res, 200, { ok: true, ...out });
  } catch (e: any) {
    json(res, 500, { ok: false, error: String(e?.message || e) });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  try {
    const url = (req.url || "").split("?")[0];
    if (url === "/api/auth/login") return authLogin(req, res);
    if (url === "/api/auth/me") return authMe(req, res);
    if (url === "/api/auth/logout") return authLogout(req, res);
    if (url === "/api/health" || url.startsWith("/api/health")) return health(req, res);
    if (url === "/api/rss.xml" || url === "/rss.xml" || url === "/feed" || url === "/feed.xml") return rssLiveWell(req, res);
    if (url === "/api/admin/status") return adminStatus(req, res);
    if (url === "/api/admin/contact-messages") return adminContactMessages(req, res);
    if (url === "/api/admin/article-bodies") return adminDataset(req, res, "article-bodies");
    if (url === "/api/admin/article-library") return adminDataset(req, res, "article-library");
    if (url === "/api/admin/draft-essays") return adminDataset(req, res, "draft-essays");
    if (url === "/api/admin/organize-articles") return organizeArticles(req, res);
    if (url === "/api/admin/db-inventory") return dbInventory(req, res);
    if (url === "/api/admin/metrics") return adminMetrics(req, res);
    if (url.startsWith("/api/admin/seed-articles")) return adminSeedArticles(req, res);
    if (url === "/api/admin/seed-content") return adminSeedContent(req, res);
    if (url === "/api/admin/seed-post-christian") return seedPostChristianArticles(req, res);
    if (url === "/api/admin/seed-integrated-life") return seedArticleSet(req, res, integratedLifeArticles as any[]);
    if (url === "/api/admin/seed-womanhood-doubt-devotionals") return seedArticleSet(req, res, womanhoodDoubtDevotionalArticles as any[]);
    if (url === "/api/admin/seed-all") return seedAllArticles(req, res);
    if (url === "/api/admin/refresh-articles") return refreshArticles(req, res);
    if (url === "/api/admin/publish-all-resources") return publishAllResources(req, res);
    if (url === "/api/admin/seed-ebooks") return seedEbooks(req, res);
    if (url === "/api/admin/create-stripe-prices") return createStripePrices(req, res);
    if (url === "/api/admin/fix-apostrophes") return adminFixApostrophes(req, res);
    const notifMatch = url.match(/^\/api\/admin\/notifications\/(\d+)$/);
    if (notifMatch && req.method === "DELETE") {
      if (!authedSession(req)) return json(res, 401, { error: "unauthorized" });
      const nId = notifMatch[1];
      await withConn(async (c) => { await c.execute("DELETE FROM notifications WHERE id = ?", [nId]); });
      return json(res, 200, { ok: true });
    }
    if (url === "/api/admin/seed") return adminSeed(req, res);
    if (url === "/api/rss" || url === "/api/rss/substack") return substackRss(req, res);
    if (url === "/api/contact") return contactForm(req, res);
    if (url === "/api/checkout") return ebookCheckout(req, res);
    if (url === "/api/download") return ebookDownload(req, res);
    if (url === "/api/stripe/webhook") return stripeWebhook(req, res);
    if (url === "/api/subscribe") return subscribe(req, res);
    if (url === "/api/pcn/signup") return pcnSignup(req, res);
    if (url === "/api/lead-magnets/signup") return leadMagnetSignup(req, res);
    if (url === "/api/sitemap.xml" || url === "/api/sitemap") return sitemap(req, res);
    if (url === "/api/robots.txt" || url === "/api/robots") return robotsTxt(req, res);
    if (url === "/api/articles") return listArticles(req, res);
    const ma = url.match(/^\/api\/articles\/([^\/]+)/);
    if (ma) return getArticle(req, res, decodeURIComponent(ma[1]));
    const mt = url.match(/^\/api\/trpc\/([^\/]+)/);
    if (mt) {
      const procNames = decodeURIComponent(mt[1]).split(",");
      if (procNames.length === 1) {
        return trpcHandler(req, res, procNames[0]);
      }
      return trpcBatchHandler(req, res, procNames);
    }
    json(res, 404, { error: "Not found", url });
  } catch (e: any) {
    json(res, 500, { error: "handler crashed", message: String(e?.message || e) });
  }
}
