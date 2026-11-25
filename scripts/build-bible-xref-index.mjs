#!/usr/bin/env node
/**
 * build-bible-xref-index.mjs
 *
 * Writes the cross-reference index (client/public/bible/xref/) read by /study/cross-references,
 * from the Study Bible's own chapter files and lexicon. The rules and the
 * shape of the files are in scripts/lib/bible-study.mjs. Run it after
 * scripts/build-bible.mjs rebuilds the Study Bible's data.
 *
 *   node scripts/build-bible-xref-index.mjs           write the files
 *   node scripts/build-bible-xref-index.mjs --check   exit 1 if any file is out of date (CI)
 */
import { run } from "./lib/bible-study.mjs";

run("xref");
