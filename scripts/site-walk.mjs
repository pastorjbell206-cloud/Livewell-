#!/usr/bin/env node
/**
 * site-walk.mjs — the browser gates from docs/WORLD-CLASS-SITE-PROMPT.md,
 * run against the built site in a real browser, on every concrete route:
 *
 *   axe        WCAG 2.x A/AA violations per route (not only "/")
 *   contrast   every visible text node's rendered contrast (AA: 4.5:1, or
 *              3:1 for large text), in the shipped light mode
 *   reach      the click graph: which routes a reader can reach from "/" in
 *              three clicks, and which they cannot
 *   dead ends  pages that offer no onward link outside the header and footer
 *
 * The CI axe step only audits "/" because every other route is a lazy chunk
 * the static crawler never mounts. This walker mounts them.
 *
 *   node scripts/site-walk.mjs --base http://localhost:4173 [--limit N] [--only /path,/path]
 *
 * Needs a Chromium and the playwright + axe-core packages resolvable from
 * NODE_PATH (CI: npx -p playwright -p axe-core; local: a scratch install).
 * CHROME_PATH points at the browser binary. Writes docs/audit-site/walk.json
 * and prints a summary; exits 1 on any serious/critical axe violation.
 */
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

// WALK_MODULES points at a node_modules holding playwright + axe-core (a
// scratch install locally; `npx -p playwright -p axe-core` in CI). Without it,
// resolution falls back to the repo's own node_modules.
const require = createRequire(
  process.env.WALK_MODULES ? process.env.WALK_MODULES.replace(/\/?$/, "/") : import.meta.url
);
const { chromium } = require("playwright");
const AXE_SRC = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg("--base", "http://localhost:4173");
const LIMIT = parseInt(arg("--limit", "0"), 10);
const ONLY = arg("--only", "");
const OUT = "docs/audit-site/walk.json";

let routes = ONLY
  ? ONLY.split(",")
  : execFileSync("node", ["scripts/site-audit-manifest.mjs", "--routes"], { encoding: "utf8" })
      .split("\n").filter(Boolean).filter((r) => !r.startsWith("/admin"));
if (LIMIT) routes = routes.slice(0, LIMIT);

const CONTRAST_JS = `(() => {
  const lum = (r,g,b) => { const f = (c) => { c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); }; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
  const parse = (s) => { const m = s && s.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const p = m[1].split(',').map(Number); return { r:p[0], g:p[1], b:p[2], a: p.length>3 ? p[3] : 1 }; };
  const bgOf = (el) => { let n = el; while (n && n !== document.documentElement) { const c = parse(getComputedStyle(n).backgroundColor); if (c && c.a > 0.99) return c; n = n.parentElement; } return { r:255,g:255,b:255,a:1 }; };
  const out = []; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode; const text = (t.textContent||'').trim(); if (text.length < 3) continue;
    const el = t.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
    if (el.closest('[aria-hidden="true"],script,style,noscript')) continue;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const rect = el.getBoundingClientRect(); if (!rect.width || !rect.height) continue;
    if (el.closest('button:disabled,[aria-disabled="true"]')) continue;
    const fg = parse(cs.color); if (!fg) continue; const bg = bgOf(el);
    const L1 = lum(fg.r,fg.g,fg.b), L2 = lum(bg.r,bg.g,bg.b); const ratio = (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    const size = parseFloat(cs.fontSize); const bold = parseInt(cs.fontWeight,10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold); const min = large ? 3 : 4.5;
    if (ratio < min) out.push({ ratio: +ratio.toFixed(2), min, tag: el.tagName, text: text.slice(0,60), interactive: !!el.closest('a,button,[role=button],input,select,textarea') });
  }
  return out;
})()`;

const LINKS_JS = `(() => {
  const inChrome = (a) => !!a.closest('header,nav,footer,[role=navigation],[role=banner],[role=contentinfo]');
  const all = Array.from(document.querySelectorAll('a[href]'));
  const norm = (h) => { try { const u = new URL(h, location.origin); if (u.origin !== location.origin) return null; return u.pathname.replace(/\\/$/, '') || '/'; } catch { return null; } };
  const internal = all.map((a) => ({ href: norm(a.getAttribute('href')), chrome: inChrome(a) })).filter((x) => x.href);
  return { links: [...new Set(internal.map((x) => x.href))], bodyLinks: [...new Set(internal.filter((x) => !x.chrome).map((x) => x.href))], h1: !!document.querySelector('h1'), main: !!document.querySelector('main,[role=main]') };
})()`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ["--no-sandbox"] });
const ctx = await browser.newContext({ viewport: { width: 412, height: 823 } });
const page = await ctx.newPage();
const results = {};
let i = 0;
for (const route of routes) {
  i++;
  const r = { axe: [], contrast: [], links: [], bodyLinks: [], h1: false, main: false, error: null };
  try {
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(400);
    await page.addScriptTag({ content: AXE_SRC });
    const axe = await page.evaluate(async () => {
      const res = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
      return res.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help }));
    });
    r.axe = axe;
    r.contrast = await page.evaluate(CONTRAST_JS);
    Object.assign(r, await page.evaluate(LINKS_JS));
  } catch (e) {
    r.error = String(e.message || e).slice(0, 200);
  }
  results[route] = r;
  const bad = r.axe.filter((v) => v.impact === "serious" || v.impact === "critical").length;
  process.stdout.write(`${String(i).padStart(3)}/${routes.length} ${route.padEnd(44)} axe:${bad ? "FAIL " + bad : "ok"}  contrast:${r.contrast.length}  links:${r.links.length}${r.error ? "  ERR " + r.error : ""}\n`);
}
await browser.close();

// Reach: BFS from "/" over the click graph, depth 3.
const depth = { "/": 0 };
const q = ["/"];
while (q.length) {
  const cur = q.shift();
  if (depth[cur] >= 3) continue;
  for (const l of (results[cur]?.links || [])) if (!(l in depth)) { depth[l] = depth[cur] + 1; q.push(l); }
}
const unreachable = routes.filter((r) => !(r in depth));
const deadEnds = routes.filter((r) => results[r] && !results[r].error && results[r].bodyLinks.length === 0);
const axeFails = routes.filter((r) => results[r].axe.some((v) => v.impact === "serious" || v.impact === "critical"));
const contrastFails = routes.filter((r) => results[r].contrast.some((c) => c.interactive || c.ratio < 3));

mkdirSync("docs/audit-site", { recursive: true });
writeFileSync(OUT, JSON.stringify({ base: BASE, at: new Date().toISOString(), routes: routes.length, results, reach: { depth, unreachable }, deadEnds, axeFails, contrastFails }, null, 2) + "\n");

console.log(`\n=== walk of ${routes.length} routes ===`);
console.log(`axe serious/critical on ${axeFails.length} route(s)`);
console.log(`contrast fails (interactive text, or any text under 3:1) on ${contrastFails.length} route(s)`);
console.log(`not reachable from / within three clicks: ${unreachable.length}`);
console.log(`dead ends (no onward link outside header/footer): ${deadEnds.length}`);
console.log(`written: ${OUT}`);
process.exit(axeFails.length ? 1 : 0);
