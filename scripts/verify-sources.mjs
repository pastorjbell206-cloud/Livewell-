#!/usr/bin/env node
/**
 * verify-sources.mjs — every primary-source excerpt the church history course
 * prints is really in the public-domain text it cites (master plan 7.2 and
 * 9.2, unit U07).
 *
 * It checks three things and fails on the first sign of any of them going
 * wrong:
 *
 *   corpus      each stored text in scripts/data/history-sources/ has a
 *               complete manifest entry (author, work, translator, edition,
 *               public-domain basis, repository, commit, path, URL, date) and
 *               is byte for byte the file that was fetched (its sha256), and
 *               no file sits there unlisted;
 *   provenance  PROVENANCE.md lists exactly what the manifest says;
 *   excerpts    every excerpt in client/public/history/sources/ and
 *               client/public/history/sessions/ (the registry and the session
 *               pages, U30 and U32) is a normalized substring of the stored
 *               text it names (of the author's words, or of the notes when
 *               the card says "inNote": true), and every source card names
 *               one.
 *
 * The rules for matching are in scripts/lib/history-sources.mjs. A stored text
 * is never edited to make a quotation pass: fix the quotation.
 *
 *   node scripts/verify-sources.mjs               the CI gate
 *   node scripts/verify-sources.mjs <file> ...    check the excerpts in these JSON files only (a draft)
 *   node scripts/verify-sources.mjs --write       regenerate PROVENANCE.md's list from manifest.json
 *   --root <dir>                                  run against another checkout (tests)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { CORPUS_DIR, PROVENANCE_FILE, ROOT, loadManifest, renderProvenance, verifySources } from "./lib/history-sources.mjs";

function main(argv) {
  let root = ROOT;
  let write = false;
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root") root = resolve(argv[++i]);
    else if (argv[i] === "--write") write = true;
    else files.push(resolve(argv[i]));
  }

  if (write) {
    const { texts, problems } = loadManifest(root);
    if (!texts) {
      for (const p of problems) console.error(`  ✗ ${p}`);
      return 1;
    }
    const file = join(root, CORPUS_DIR, PROVENANCE_FILE);
    const next = renderProvenance(readFileSync(file, "utf8"), texts);
    if (next === null) {
      console.error(`  ✗ ${CORPUS_DIR}/${PROVENANCE_FILE} has lost its generated-list markers`);
      return 1;
    }
    writeFileSync(file, next);
    console.log(`verify-sources: wrote the list of ${texts.length} stored texts into ${CORPUS_DIR}/${PROVENANCE_FILE}`);
  }

  const { problems, texts, checked } = verifySources({ root, files: files.length ? files : null });
  if (problems.length) {
    console.error(`verify-sources: ${problems.length} problem(s)`);
    for (const p of problems) console.error(`  ✗ ${p}`);
    return 1;
  }
  console.log(`verify-sources: ${texts} stored texts intact and listed; ${checked} excerpt(s) found in the texts they cite`);
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exit(main(process.argv.slice(2)));
}
