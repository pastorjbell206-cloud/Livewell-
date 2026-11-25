#!/usr/bin/env node
/**
 * build-bible-word-index.mjs
 *
 * Writes the word index (client/public/bible/words/) read by /study/word,
 * from the Study Bible's own chapter files and lexicon. The rules and the
 * shape of the files are in scripts/lib/bible-study.mjs. Run it after
 * scripts/build-bible.mjs rebuilds the Study Bible's data.
 *
 *   node scripts/build-bible-word-index.mjs           write the files
 *   node scripts/build-bible-word-index.mjs --check   exit 1 if any file is out of date (CI)
 */
import { run } from "./lib/bible-study.mjs";

run("word");
