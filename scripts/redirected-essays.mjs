/**
 * redirected-essays.mjs — the essay addresses vercel.json sends elsewhere.
 *
 * An essay whose /writing/<slug> redirects away must not be listed: not in the
 * writing index, the sitemap, or the Library. Listing it sent readers and
 * search engines to one page and delivered them to another (64 essays were in
 * that state in September 2026, retired as stubs to hubs years earlier while
 * their full text stayed in the library). When an essay is rewritten,
 * scripts/apply-rewrites.mjs removes its redirect and it is listed again.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

export function redirectedEssaySlugs(root = process.cwd()) {
  try {
    const { redirects = [] } = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));
    const out = new Set();
    for (const r of redirects) {
      const m = String(r.source || "").match(/^\/writing\/([a-z0-9][a-z0-9-]*)$/);
      if (m) out.add(m[1]);
    }
    return out;
  } catch {
    return new Set();
  }
}
