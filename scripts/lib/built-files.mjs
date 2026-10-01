/**
 * built-files.mjs — the downloads the deploy builds (scripts/build-pdfs.mjs,
 * inside `pnpm pdfs` in the Vercel build). The PDFs are gitignored, so a
 * fresh checkout (and CI) does not have them on disk; a link to one is real
 * when its source exists. One list, read by the link checkers
 * (scripts/lib/site-routes.mjs) and the catalogue check
 * (scripts/validate-catalogue.mjs), so they never disagree.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../..", import.meta.url).pathname;
const PUB = join(ROOT, "client/public");

/** True when `href` is a download the deploy builds from a source that exists. */
export function builtFrom(href) {
  let m = href.match(/^\/downloads\/studyguides\/(.+)-(leader|participant)\.pdf$/);
  if (m) return existsSync(join(PUB, `studyguides/${m[1]}.json`));
  m = href.match(/^\/downloads\/context\/(.+)\.pdf$/);
  if (m) return existsSync(join(PUB, `context/guides/${m[1]}.json`));
  // Find Help printables, the plan booklets, the seasonal family booklets,
  // and the tools' blank printables (scripts/lib/help-printables.mjs).
  m = href.match(/^\/downloads\/help\/(.+)-(guide|prayer|scripture|week)-(letter|a4)\.pdf$/);
  if (m) return existsSync(join(PUB, `needs/${m[1]}.json`));
  if (/^\/downloads\/seasonal\/(advent|holy-week)-family-(letter|a4)\.pdf$/.test(href)) return existsSync(join(PUB, "family-seasonal.json"));
  m = href.match(/^\/downloads\/plans\/(.+)-booklet-(letter|a4)\.pdf$/);
  if (m) return existsSync(join(PUB, `plans/${m[1]}.json`));
  if (/^\/downloads\/tools\/worry-log-(letter|a4)\.pdf$/.test(href)) return true;
  // Bible reading plans (scripts/lib/reading-plans.mjs), named in client/src/data/bible-reading-plans.json.
  m = href.match(/^\/downloads\/reading-plans\/(.+)-(letter|a4)\.pdf$/);
  if (m) return JSON.parse(readFileSync(join(ROOT, "client/src/data/bible-reading-plans.json"), "utf8")).plans.some((p) => p.id === m[1]);
  return false;
}
