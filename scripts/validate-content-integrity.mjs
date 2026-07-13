#!/usr/bin/env node
/**
 * validate-content-integrity.mjs — the publishing-integrity guard (L1 #10).
 *
 * The platform serves essays from three stores (the DB wins on slug, the
 * committed static library backs it, Substack distributes). Cross-store slug
 * overlap is intentional and NOT an error. What IS an error, and what this
 * catches, is corruption WITHIN a store: the same slug twice in one file (only
 * one can resolve at the URL — the others are dead or shadowing weight), a
 * malformed or impossible publication date, or a post with no pillar to file it.
 *
 * Sources checked:
 *   - client/src/data/content-data.json   (the client seed snapshot)
 *   - content/static-library.generated.json (the API's behind-the-DB library)
 *
 * Run:  node scripts/validate-content-integrity.mjs
 * Exit 1 on any error so CI can gate it once the corpus is clean.
 */
import { readFileSync } from "node:fs";

const MIN_TS = Date.parse("2015-01-01");
const MAX_TS = Date.parse("2027-06-01");

function load(path) {
  try {
    const raw = JSON.parse(readFileSync(path, "utf8"));
    const arr = Array.isArray(raw) ? raw : raw.posts || raw.articles || [];
    return { arr, ok: true };
  } catch (e) {
    return { arr: [], ok: false, err: e.message };
  }
}

function checkStore(label, posts, { requirePillar }) {
  const errors = [];
  const seen = new Map();
  for (const p of posts) {
    if (!p || !p.slug) {
      errors.push(`${label}: an entry has no slug`);
      continue;
    }
    seen.set(p.slug, (seen.get(p.slug) || 0) + 1);
    const d = p.publishedAt;
    if (d != null && typeof d === "string") {
      const t = Date.parse(d);
      if (Number.isNaN(t) || t < MIN_TS || t > MAX_TS) {
        errors.push(`${label}: ${p.slug} has a malformed/impossible publishedAt "${d}"`);
      }
    }
    if (requirePillar && !p.pillar) {
      errors.push(`${label}: ${p.slug} has no pillar (cannot be filed)`);
    }
  }
  for (const [slug, n] of seen) {
    if (n > 1) errors.push(`${label}: slug "${slug}" appears ${n} times (only one can resolve at the URL)`);
  }
  return errors;
}

const stores = [
  { label: "content-data.json", path: "client/src/data/content-data.json", requirePillar: true },
  { label: "static-library.generated.json", path: "content/static-library.generated.json", requirePillar: false },
];

let allErrors = [];
for (const s of stores) {
  const { arr, ok, err } = load(s.path);
  if (!ok) {
    console.error(`SKIP ${s.label}: ${err}`);
    continue;
  }
  allErrors = allErrors.concat(checkStore(s.label, arr, { requirePillar: s.requirePillar }));
}

if (allErrors.length) {
  console.error(`\nContent integrity: ${allErrors.length} issue(s)\n`);
  for (const e of allErrors) console.error("  - " + e);
  console.error("\nSee docs/publishing-operating-model.md for the remediation each class needs.");
  process.exit(1);
}
console.log("Content integrity: clean.");
