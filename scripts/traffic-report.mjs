#!/usr/bin/env node
/**
 * traffic-report.mjs — the site's own numbers, read once, written down.
 *
 * Vercel Web Analytics has never been enabled on the project (the API answers
 * "Web Analytics not found"), so the only record of what readers open is the
 * site's own beacon: client/src/components/PageTracker.tsx posts one row per
 * view to /api/track (table page_views), ReadDepthBeacon posts one row when a
 * reader reaches the end of an essay (read_events), and WebVitalsBeacon posts
 * settled Core Web Vitals (web_vitals). The admin Traffic panel shows a slice
 * of this; this script writes the whole thirty-day picture to a file the
 * audit can cite and the next session can act on.
 *
 * Read-only: every statement is a SELECT. Needs DATABASE_URL.
 *
 *   DATABASE_URL="mysql://..." node scripts/traffic-report.mjs
 *   DATABASE_URL="mysql://..." node scripts/traffic-report.mjs --days 30 --out docs/audit/TRAFFIC-2026-09.md
 */
import mysql from "mysql2/promise";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const DAYS = Number(opt("--days", 30));
const now = new Date();
const stamp = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
const OUT = path.resolve(ROOT, opt("--out", `docs/audit/TRAFFIC-${stamp}.md`));

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[traffic] DATABASE_URL is required (read-only; every statement is a SELECT)");
  process.exit(1);
}

function readJson(rel) {
  try { return JSON.parse(readFileSync(path.join(ROOT, rel), "utf8")); } catch { return null; }
}
function navHrefs() {
  try {
    const src = readFileSync(path.join(ROOT, "client/src/lib/siteNav.ts"), "utf8");
    return [...new Set([...src.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]).filter((h) => h.startsWith("/")))];
  } catch { return []; }
}
const p75 = (xs) => { if (!xs.length) return null; const s = [...xs].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(0.75 * (s.length - 1)))]; };
const fmt = (n) => Number(n || 0).toLocaleString("en-US");
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : "n/a");

async function main() {
  const conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: true } });
  const q = async (sql, params = []) => { try { const [rows] = await conn.query(sql, params); return rows; } catch (e) { return { error: String(e.message || e) }; } };
  const one = async (sql, params) => { const r = await q(sql, params); return Array.isArray(r) && r[0] ? Number(Object.values(r[0])[0]) : null; };
  try {
    const since = `DATE_SUB(NOW(), INTERVAL ${DAYS} DAY)`;
    const totals = {
      views: await one(`SELECT COUNT(*) FROM page_views WHERE createdAt >= ${since}`),
      visitors: await one(`SELECT COUNT(DISTINCT visitorId) FROM page_views WHERE visitorId IS NOT NULL AND createdAt >= ${since}`),
      allTime: await one("SELECT COUNT(*) FROM page_views"),
      first: await one("SELECT MIN(createdAt) FROM page_views"),
    };
    const routes = await q(`SELECT path, COUNT(*) AS views, COUNT(DISTINCT visitorId) AS visitors FROM page_views WHERE createdAt >= ${since} GROUP BY path ORDER BY views DESC LIMIT 20`);
    const essays = await q(`SELECT path, COUNT(*) AS views, COUNT(DISTINCT visitorId) AS visitors FROM page_views WHERE path LIKE '/writing/%' AND createdAt >= ${since} GROUP BY path ORDER BY views DESC LIMIT 40`);
    const reads = await q(`SELECT path, COUNT(*) AS reads FROM read_events WHERE createdAt >= ${since} GROUP BY path`);
    const readBy = new Map(Array.isArray(reads) ? reads.map((r) => [r.path, Number(r.reads)]) : []);
    const referrers = await q(`SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(referrer, '/', 3), '//', -1) AS host, COUNT(*) AS views FROM page_views WHERE referrer IS NOT NULL AND referrer <> '' AND createdAt >= ${since} GROUP BY host ORDER BY views DESC LIMIT 10`);
    const daily = await q(`SELECT DATE(createdAt) AS d, COUNT(*) AS views, COUNT(DISTINCT visitorId) AS visitors FROM page_views WHERE createdAt >= ${since} GROUP BY DATE(createdAt) ORDER BY d ASC`);
    const vitals = await q(`SELECT metric, value, rating FROM web_vitals WHERE createdAt >= ${since} LIMIT 50000`);
    const errors = await one(`SELECT COUNT(*) FROM client_errors WHERE createdAt >= ${since}`);

    const seen = new Map(Array.isArray(routes) ? routes.map((r) => [r.path, Number(r.views)]) : []);
    const allPaths = await q(`SELECT path, COUNT(*) AS views FROM page_views WHERE createdAt >= ${since} GROUP BY path`);
    const viewsByPath = new Map(Array.isArray(allPaths) ? allPaths.map((r) => [r.path, Number(r.views)]) : []);
    const nav = navHrefs();
    const quietNav = nav.filter((h) => !viewsByPath.has(h.split("?")[0])).slice(0, 30);
    const featured = new Set((readJson("client/src/data/featured.json")?.flagship || []).map((s) => `/writing/${s}`));
    const canon = new Set((readJson("client/src/data/canon.json")?.slugs || []).map((s) => `/writing/${s}`));
    const hiddenHits = (Array.isArray(essays) ? essays : []).filter((e) => !featured.has(e.path) && !canon.has(e.path)).slice(0, 8);

    const vit = {};
    if (Array.isArray(vitals)) for (const v of vitals) (vit[v.metric] ||= []).push(Number(v.value));

    let md = `# Traffic, the last ${DAYS} days\n\n*Written by \`scripts/traffic-report.mjs\` on ${now.toISOString().slice(0, 10)} from the site's own beacon (page_views, read_events, web_vitals). Vercel Web Analytics is not enabled on the project, so this is the only record. Read-only; nothing here changes the site.*\n\n`;
    md += `| Measure | Value |\n|---|---|\n| Page views | ${fmt(totals.views)} |\n| Unique visitors | ${fmt(totals.visitors)} |\n| Views since the beacon began (${totals.first ? String(totals.first).slice(0, 10) : "unknown"}) | ${fmt(totals.allTime)} |\n| Client-side errors reported | ${fmt(errors)} |\n\n`;
    md += `## The twenty routes readers open most\n\n| # | Route | Views | Visitors |\n|---|---|---|---|\n`;
    (Array.isArray(routes) ? routes : []).forEach((r, i) => { md += `| ${i + 1} | \`${r.path}\` | ${fmt(r.views)} | ${fmt(r.visitors)} |\n`; });
    md += `\n## Essays: opened, and finished\n\nA read is one visitor reaching the end of the essay. The lowest completion is the closest thing the beacon has to a bounce.\n\n| Essay | Views | Visitors | Finished | Completion |\n|---|---|---|---|---|\n`;
    (Array.isArray(essays) ? essays : []).forEach((e) => { const r = readBy.get(e.path) || 0; md += `| \`${e.path.replace("/writing/", "")}\` | ${fmt(e.views)} | ${fmt(e.visitors)} | ${fmt(r)} | ${pct(r, Number(e.visitors))} |\n`; });
    md += `\n## Where readers come from\n\n| Referrer | Views |\n|---|---|\n`;
    (Array.isArray(referrers) ? referrers : []).forEach((r) => { md += `| ${r.host || "(direct)"} | ${fmt(r.views)} |\n`; });
    md += `\n## Real-user Core Web Vitals, 75th percentile\n\n| Metric | p75 | Samples |\n|---|---|---|\n`;
    for (const m of ["LCP", "INP", "CLS", "FCP", "TTFB"]) { const xs = vit[m] || []; const v = p75(xs); md += `| ${m} | ${v === null ? "no data" : m === "CLS" ? v.toFixed(3) : `${Math.round(v)} ms`} | ${fmt(xs.length)} |\n`; }
    md += `\n## Day by day\n\n| Day | Views | Visitors |\n|---|---|---|\n`;
    (Array.isArray(daily) ? daily : []).forEach((d) => { md += `| ${String(d.d).slice(0, 10)} | ${fmt(d.views)} | ${fmt(d.visitors)} |\n`; });
    md += `\n## Candidates, from the numbers\n\nNot decisions. The two lists the audit asked for: what the nav carries that nobody opened, and what readers open that the front page hides.\n\n**Navigation links with no views in ${DAYS} days** (${quietNav.length}${nav.length ? ` of ${nav.length}` : ""}):\n\n`;
    md += quietNav.length ? quietNav.map((h) => `- \`${h}\``).join("\n") + "\n" : "- none\n";
    md += `\n**Most-opened essays that are neither featured nor in the canon:**\n\n`;
    md += hiddenHits.length ? hiddenHits.map((e) => `- \`${e.path.replace("/writing/", "")}\` (${fmt(e.views)} views)`).join("\n") + "\n" : "- none\n";
    md += `\n## Recommendations\n\n*Filled in by hand after reading the numbers: at most five cuts or promotions, each one specific.*\n`;
    for (const [k, v] of Object.entries({ routes, essays, reads, referrers, daily, vitals })) if (v && v.error) md += `\n> Query "${k}" failed: ${v.error}\n`;

    mkdirSync(path.dirname(OUT), { recursive: true });
    writeFileSync(OUT, md);
    console.log(`[traffic] wrote ${path.relative(ROOT, OUT)}: ${fmt(totals.views)} views, ${fmt(totals.visitors)} visitors in ${DAYS} days`);
  } finally {
    await conn.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
