#!/usr/bin/env node
/**
 * build-bible-words-index.mjs
 *
 * Writes client/public/bible/explore/words.json, read by
 * /study/words, key words of the Bible: every key word the book pages explain, with each book's own explanation.
 * Every word in it is copied from the book pages' own data
 * (client/public/bible/notes/<book>/intro.json, `teaching`); the rules are in
 * scripts/lib/bible-explore.mjs. Rerun it after a book page's teaching data
 * changes.
 *
 *   node scripts/build-bible-words-index.mjs           write the file
 *   node scripts/build-bible-words-index.mjs --check   exit 1 if the file is out of date (CI)
 */
import { run } from "./lib/bible-explore.mjs";

run("words");
