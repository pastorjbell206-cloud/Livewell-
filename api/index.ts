// Minimal Vercel serverless entry for LiveWell.
// Does NOT import the existing server/* tree (Vercel @vercel/node ESM builder
// does not auto-bundle those with --packages=external + "type":"module").
// Exposes /api/health and /api/admin/seed using only direct mysql2 + package
// dependencies that Vercel resolves from node_modules.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import mysql from "mysql2/promise";

async function withConn<T>(fn: (c: mysql.Connection) => Promise<T>): Promise<T> {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  const conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: true } });
  try {
    return await fn(conn);
  } finally {
    await conn.end();
  }
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
    } catch (e: any) {
      out.dbReachable = false;
      out.dbError = String(e?.message || e).slice(0, 400);
    }
  }
  res.status(200).json(out);
}

async function seedTables(_req: VercelRequest, res: VercelResponse) {
  if (!process.env.JWT_SECRET) {
    return res.status(401).json({ error: "JWT_SECRET not set" });
  }
  const key = _req.query.key || _req.headers["x-seed-key"];
  if (key !== process.env.JWT_SECRET) {
    return res.status(401).json({ error: "unauthorized" });
  }
  try {
    const out = await withConn(async (c) => {
      const [tables] = await c.query("SHOW TABLES");
      return { tables };
    });
    res.status(200).json({ ok: true, ...out });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = req.url || "";
    if (url.startsWith("/api/health")) return health(req, res);
    if (url.startsWith("/api/admin/seed")) return seedTables(req, res);
    res.status(404).json({ error: "Not found", url });
  } catch (e: any) {
    res.status(500).json({ error: "handler crashed", message: String(e?.message || e) });
  }
}
