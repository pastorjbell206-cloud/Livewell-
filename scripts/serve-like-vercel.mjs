#!/usr/bin/env node
/**
 * Serve dist/public the way Vercel serves it, for local and CI measurement.
 *
 * `serve -s` answers every address with the home page's HTML, so Lighthouse
 * and axe never saw a chapter's or an essay's own prerendered file. That is
 * how a Study Bible chapter sat at 43 for performance while the home page
 * read 100 (docs/work/audit-2026-11/technical.md, T13). This server follows
 * vercel.json instead: the redirects first, then the file at the address,
 * then the address's own prerendered index.html, then the app shell.
 *
 * There is no database here. /api/trpc/* answers with empty data so a page
 * shows its no-data state at once instead of waiting on a refused connection;
 * every other /api address answers 404.
 *
 * Usage: node scripts/serve-like-vercel.mjs [--port 4173] [--dir dist/public]
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const PORT = Number(arg("port", "4173"));
const DIR = path.resolve(REPO_ROOT, arg("dir", "dist/public"));

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".epub": "application/epub+zip",
};

/** A vercel.json `source` pattern as a RegExp with named groups. */
export function sourceToRegExp(source) {
  let i = 0;
  const pattern = source
    .replace(/[.+?^${}|[\]\\]/g, (m) => (m === "." ? "\\." : m))
    .replace(/:([A-Za-z0-9_]+)(\*)?/g, (_m, name, star) => (star ? `(?<${name}>.*)` : `(?<${name}>[^/]+)`))
    .replace(/\((?!\?)/g, () => `(?<_${++i}>`);
  return new RegExp(`^${pattern}/?$`);
}

function loadRedirects() {
  const config = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "vercel.json"), "utf8"));
  return (config.redirects ?? [])
    // Host rules (the apex to www redirect) have no meaning on localhost.
    .filter((r) => !r.has)
    .map((r) => ({ re: sourceToRegExp(r.source), destination: r.destination, status: r.permanent ? 308 : 307 }));
}

function redirectFor(redirects, pathname) {
  for (const r of redirects) {
    const m = pathname.match(r.re);
    if (!m) continue;
    const groups = m.groups ?? {};
    return {
      status: r.status,
      location: r.destination
        .replace(/:([A-Za-z0-9_]+)\*?/g, (whole, name) => (name in groups ? groups[name] ?? "" : whole))
        .replace(/\$(\d+)/g, (_whole, n) => groups[`_${n}`] ?? ""),
    };
  }
  return null;
}

function fileAt(rel) {
  const full = path.join(DIR, rel);
  if (!full.startsWith(DIR)) return null;
  try {
    return fs.statSync(full).isFile() ? full : null;
  } catch {
    return null;
  }
}

// Vercel compresses text on the way out; without it Lighthouse's simulated
// phone connection spends its whole budget downloading plain JSON and HTML.
const COMPRESSIBLE = /^(text\/|application\/(json|xml|manifest\+json)|image\/svg)/;
const gzipped = new Map();

function send(req, res, status, file) {
  const type = TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const immutable = file.includes(`${path.sep}assets${path.sep}`);
  const headers = {
    "Content-Type": type,
    "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
  };
  if (COMPRESSIBLE.test(type) && /\bgzip\b/.test(String(req.headers["accept-encoding"] ?? ""))) {
    let body = gzipped.get(file);
    if (!body) {
      body = zlib.gzipSync(fs.readFileSync(file));
      gzipped.set(file, body);
    }
    res.writeHead(status, { ...headers, "Content-Encoding": "gzip", Vary: "Accept-Encoding", "Content-Length": body.length });
    res.end(body);
    return;
  }
  res.writeHead(status, headers);
  fs.createReadStream(file).pipe(res);
}

export function createServer() {
  const redirects = loadRedirects();
  return http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      pathname = url.pathname;
    }

    if (pathname.startsWith("/api/trpc/")) {
      // One empty result per batched procedure, in the shape the client reads.
      const calls = pathname.slice("/api/trpc/".length).split(",").length;
      const one = { result: { data: { json: null } } };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(url.searchParams.has("batch") ? Array.from({ length: calls }, () => one) : one));
      return;
    }
    if (pathname.startsWith("/api/") || pathname.startsWith("/_vercel/")) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not available without the API");
      return;
    }

    const hit = redirectFor(redirects, pathname);
    if (hit) {
      res.writeHead(hit.status, { Location: hit.location + url.search });
      res.end();
      return;
    }

    const clean = pathname.replace(/\/+$/, "");
    const direct = clean && fileAt(clean);
    if (direct) return send(req, res, 200, direct);
    // A missing file with an extension is a real 404 on Vercel (the catch-all
    // rewrite skips any path with a dot in it).
    if (/\.[A-Za-z0-9]+$/.test(clean)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const own = fileAt(path.join(clean, "index.html"));
    send(req, res, 200, own ?? path.join(DIR, "index.html"));
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!fs.existsSync(path.join(DIR, "index.html"))) {
    console.error(`No build at ${DIR}. Run: pnpm run sitemap && pnpm run build && pnpm run prerender`);
    process.exit(1);
  }
  createServer().listen(PORT, () => console.log(`Serving ${DIR} the way Vercel does on http://localhost:${PORT}`));
}
