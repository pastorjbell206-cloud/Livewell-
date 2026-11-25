#!/usr/bin/env node
/**
 * build-bible-hard-index.mjs
 *
 * Writes client/public/bible/explore/hard-passages.json, read by
 * /study/hard-passages: every hard passage the book pages list, each with the chapter its note is in.
 * Every word in it is copied from the book pages' own data
 * (client/public/bible/notes/<book>/intro.json, `teaching`); the rules are in
 * scripts/lib/bible-explore.mjs. Rerun it after a book page's teaching data
 * changes.
 *
 *   node scripts/build-bible-hard-index.mjs           write the file
 *   node scripts/build-bible-hard-index.mjs --check   exit 1 if the file is out of date (CI)
 */
import { run } from "./lib/bible-explore.mjs";

run("hard");
