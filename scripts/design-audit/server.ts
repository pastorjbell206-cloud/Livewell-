/**
 * Local stand-in for Vercel, for design audits: serves the built site from
 * dist/public in the same order Vercel does (file, then prerendered
 * route/index.html, then the SPA shell) and sends /api/* through the real
 * production handler (api/index.ts) and /api/og through api/og.tsx, so pages
 * render with real essays, not an empty dev database.
 *
 *   pnpm build && pnpm prerender
 *   PORT=4400 npx tsx scripts/design-audit/server.ts
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import handler from "../../api/index";
import og from "../../api/og";

// api/og.tsx is compiled for Vercel's automatic JSX runtime; tsx uses the
// classic one, which needs React in scope.
(globalThis as any).React = React;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../dist/public");
const PORT = Number(process.env.PORT || 4400);
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".woff2": "font/woff2", ".ico": "image/x-icon", ".xml": "application/xml",
  ".txt": "text/plain", ".pdf": "application/pdf", ".epub": "application/epub+zip",
};

function adapt(req: any, res: any, body: string) {
  const u = new URL(req.url, "http://localhost");
  req.query = Object.fromEntries(u.searchParams);
  try { req.body = body ? JSON.parse(body) : undefined; } catch { req.body = body; }
  req.cookies = {};
  res.status = (c: number) => { res.statusCode = c; return res; };
  res.send = (b: any) => {
    if (!res.getHeader("content-type")) res.setHeader("content-type", "application/json");
    res.end(typeof b === "string" || Buffer.isBuffer(b) ? b : JSON.stringify(b));
    return res;
  };
  res.json = (b: any) => { res.setHeader("content-type", "application/json"); res.end(JSON.stringify(b)); return res; };
  res.redirect = (a: any, b?: any) => {
    const [code, loc] = typeof a === "number" ? [a, b] : [302, a];
    res.statusCode = code; res.setHeader("location", loc); res.end(); return res;
  };
}

function serveFile(res: any, file: string) {
  res.setHeader("content-type", TYPES[path.extname(file)] || "application/octet-stream");
  fs.createReadStream(file).pipe(res);
}

http.createServer((req: any, res: any) => {
  const p = decodeURIComponent((req.url || "/").split("?")[0]);
  if (p === "/api/og") {
    (async () => {
      try {
        const r: Response = await (og as any)(new Request("http://localhost" + req.url));
        res.statusCode = r.status;
        r.headers.forEach((v, k) => res.setHeader(k, v));
        res.end(Buffer.from(await r.arrayBuffer()));
      } catch (e: any) { res.statusCode = 500; res.end(String(e?.message || e)); }
    })();
    return;
  }
  if (p.startsWith("/api/")) {
    let body = "";
    req.on("data", (c: any) => (body += c));
    req.on("end", async () => {
      adapt(req, res, body);
      try { await handler(req, res); } catch (e: any) { res.statusCode = 500; res.end(String(e?.message || e)); }
    });
    return;
  }
  const direct = path.join(ROOT, p);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return serveFile(res, direct);
  const pre = path.join(ROOT, p, "index.html");
  if (fs.existsSync(pre)) return serveFile(res, pre);
  if (path.extname(p)) { res.statusCode = 404; return res.end("not found"); }
  return serveFile(res, path.join(ROOT, "index.html"));
}).listen(PORT, () => console.log(`[design-audit] serving dist/public with the prod API at http://localhost:${PORT}`));
