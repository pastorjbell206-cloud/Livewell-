/**
 * Design census: renders pages at a desktop and a phone width against the
 * local stand-in (server.ts) and measures what the Board of Experts prompt
 * (docs/design/BOARD-OF-EXPERTS.md, section 9) tests:
 *
 *   - every grid of repeated tiles: tile width, reading-text size, and how many
 *     tiles repeat a generic call to action ("read more", "read →", ...);
 *   - the share of each viewport painted mustard (#D4A017, the 8% rule);
 *   - a top-of-page screenshot per page and viewport, for before/after review.
 *
 * playwright-core is not a project dependency (CI never needs it). Install it
 * anywhere and point PLAYWRIGHT_CORE at its entry, e.g.
 *   npm i --prefix /tmp/pw playwright-core
 *   PLAYWRIGHT_CORE=/tmp/pw/node_modules/playwright-core/index.mjs \
 *   CHROMIUM=/path/to/chrome node scripts/design-audit/census.mjs
 * Options: BASE (default http://localhost:4400), OUT (default
 * design-audit-out), PAGES (comma-separated paths).
 */
import fs from "node:fs";

const { chromium } = await import(process.env.PLAYWRIGHT_CORE || "playwright-core");
const BASE = process.env.BASE || "http://localhost:4400";
const OUT = process.env.OUT || "design-audit-out";
const PAGES = (process.env.PAGES || [
  "/", "/writing", "/explore", "/start", "/pillars", "/reading-paths", "/pathways",
  "/marriage", "/parenting", "/family", "/doubt", "/justice", "/disruption", "/living-well", "/life",
  "/theology", "/theology/history", "/study", "/answers", "/faq", "/honest-questions",
  "/tools", "/assessments", "/studyguides", "/wisdom", "/how-tos", "/help", "/resources",
  "/books", "/about", "/connect",
].join(",")).split(",");
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const GENERIC_CTA = /^(read more|learn more|read →|read it →|read|open|explore →|explore|view|see more|continue reading)\s*→?$/i;
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ["--no-sandbox"],
});

async function mustardShare(page, png) {
  // Decode the screenshot in a scratch page and count pixels near #D4A017.
  const scratch = await page.context().newPage();
  const share = await scratch.evaluate(async (b64) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let hit = 0;
    for (let i = 0; i < d.length; i += 4) {
      const dr = d[i] - 0xd4, dg = d[i + 1] - 0xa0, db = d[i + 2] - 0x17;
      if (dr * dr + dg * dg + db * db < 40 * 40) hit++;
    }
    return hit / (d.length / 4);
  }, png.toString("base64"));
  await scratch.close();
  return share;
}

const report = [];
for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
  const ctx = await browser.newContext({ viewport: vp, reducedMotion: "reduce" });
  for (const p of PAGES) {
    const page = await ctx.newPage();
    try { await page.goto(BASE + p, { waitUntil: "networkidle", timeout: 45000 }); } catch { /* measure what rendered */ }
    await page.waitForTimeout(500);
    const data = await page.evaluate((ctaSrc) => {
      const CTA = new RegExp(ctaSrc, "i");
      const grids = [];
      for (const el of document.querySelectorAll("main *, body > div *")) {
        const cs = getComputedStyle(el);
        const isGrid = cs.display === "grid" || (cs.display === "flex" && cs.flexWrap === "wrap");
        if (!isGrid || el.closest("footer, nav, header")) continue;
        const kids = [...el.children].filter((k) => k.getBoundingClientRect().width > 40);
        if (kids.length < 3) continue;
        const r = el.getBoundingClientRect();
        if (r.height < 100) continue;
        const widths = kids.map((k) => k.getBoundingClientRect().width);
        const texts = [...el.querySelectorAll("p, span, div")].filter((t) => t.children.length === 0 && t.textContent.trim().length > 30);
        const minText = texts.length ? Math.min(...texts.map((t) => parseFloat(getComputedStyle(t).fontSize))) : null;
        const ctas = kids.filter((k) => [...k.querySelectorAll("a, span, div, button")].some((a) => a.children.length === 0 && CTA.test(a.textContent.trim()))).length;
        grids.push({ top: Math.round(r.top + window.scrollY), n: kids.length, minTileW: Math.round(Math.min(...widths)), minText, genericCtas: ctas, sample: (kids[0].textContent || "").trim().replace(/\s+/g, " ").slice(0, 60) });
      }
      return { title: document.title, grids };
    }, GENERIC_CTA.source);
    const slug = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "__");
    const png = await page.screenshot({ path: `${OUT}/${vpName}-${slug}.png` });
    // The 8% rule is per viewport: measure every screen-height down the page
    // (up to eight) and keep the worst.
    let mustard = await mustardShare(page, png);
    const pageH = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = vp.height; y < Math.min(pageH, vp.height * 8); y += vp.height) {
      const slice = await page.screenshot({ clip: { x: 0, y, width: vp.width, height: Math.min(vp.height, pageH - y) }, fullPage: true });
      mustard = Math.max(mustard, await mustardShare(page, slice));
    }
    const cramped = data.grids.filter((g) => (vpName === "desktop" && g.minTileW < 300) || (g.minText && g.minText < 15) || g.genericCtas >= 3);
    report.push({ vp: vpName, path: p, mustard: +mustard.toFixed(4), cramped: cramped.length, grids: data.grids });
    console.log(`${vpName.padEnd(7)} ${p.padEnd(22)} cramped grids ${String(cramped.length).padStart(2)}  mustard ${(mustard * 100).toFixed(2)}%`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
const total = report.reduce((n, r) => n + r.cramped, 0);
const overMustard = report.filter((r) => r.mustard > 0.08).map((r) => `${r.vp} ${r.path}`);
console.log(`\ncramped grids: ${total}; viewports over 8% mustard: ${overMustard.length ? overMustard.join(", ") : "none"}`);
