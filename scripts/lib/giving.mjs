/**
 * The Support page (/support) in the build: one place the scripts ask whether
 * giving is open, and what the page is called once it is.
 *
 * The switch is `open` in client/src/lib/giving.json, the same file the page
 * and both server runtimes read. Held (false): /support is out of the
 * sitemap, the search index and llms.txt, and its prerendered head says
 * noindex. Open (true): each of those is reversed, with nothing else to edit.
 *
 * Every function takes `open` so both states can be tested without touching
 * the file (client/src/lib/giving.test.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = "https://www.livewellbyjamesbell.co";

export const SUPPORT_PATH = "/support";

/** The switch, read from the committed file. Anything unreadable is held. */
export function givingOpen() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "client/src/lib/giving.json"), "utf8")).open === true;
  } catch {
    return false;
  }
}

/** The page's prerendered head (scripts/prerender-heads.mjs). The words are the page's own SEOMeta. */
export const SUPPORT_HEAD = {
  path: SUPPORT_PATH,
  title: "Support This Work",
  description: "LiveWell is free to read and stays free. Readers who want to help keep it going can give once or each month.",
  type: "website",
};

/** noindex in the static file while the page is held, as the page itself says. */
export function supportNoindex(open = givingOpen()) {
  return !open;
}

/** The sitemap's rows for the page: one when open, none while held. */
export function supportSitemapPages(open = givingOpen()) {
  return open ? [{ url: SUPPORT_PATH, priority: "0.5", changefreq: "monthly" }] : [];
}

/** The search index's rows for the page (MAIN_PAGES in scripts/build-search-index.mjs). */
export function supportSearchPages(open = givingOpen()) {
  return open
    ? [{ title: "Support this work", href: SUPPORT_PATH, blurb: "LiveWell is free and stays free. Readers who want to help keep it going can give once or each month.", keywords: "support give gift giving donate donation monthly help keep livewell free" }]
    : [];
}

const LLMS_LINE = `- Support this work (LiveWell is free and stays free; readers who want to
  help keep it going can give once or each month): ${SITE}${SUPPORT_PATH}`;
/** The line the Support page follows in llms.txt: the newsletter, in "About James Bell". */
const LLMS_AFTER = `- The newsletter: ${SITE}/subscribe`;

/**
 * llms.txt as it is served: with the Support line after the newsletter when
 * giving is open, and exactly as committed while it is held. The committed
 * file never names /support, so a held page cannot leak through it.
 */
export function llmsWithSupport(text, open = givingOpen()) {
  if (!open || text.includes(`${SITE}${SUPPORT_PATH}`)) return text;
  if (!text.includes(LLMS_AFTER)) return `${text.trimEnd()}\n\n${LLMS_LINE}\n`;
  return text.replace(LLMS_AFTER, `${LLMS_AFTER}\n${LLMS_LINE}`);
}

/** Rewrite the built llms.txt (dist/public) for the open state. Returns true when it wrote. */
export function writeBuiltLlms(distDir, open = givingOpen()) {
  const file = path.join(distDir, "llms.txt");
  if (!open || !fs.existsSync(file)) return false;
  const before = fs.readFileSync(file, "utf8");
  const after = llmsWithSupport(before, true);
  if (after === before) return false;
  fs.writeFileSync(file, after);
  return true;
}
