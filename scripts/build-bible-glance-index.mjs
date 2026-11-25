#!/usr/bin/env node
/**
 * build-bible-glance-index.mjs
 *
 * Writes client/public/bible/explore/books-at-a-glance.json, read by
 * /study/books-at-a-glance, the 66 books at a glance: each book's own outline, drawn as one band.
 * Every word in it is copied from the book pages' own data
 * (client/public/bible/notes/<book>/intro.json, `structure`); the rules are in
 * scripts/lib/bible-explore.mjs. Rerun it after a book page's introduction
 * changes.
 *
 *   node scripts/build-bible-glance-index.mjs           write the file
 *   node scripts/build-bible-glance-index.mjs --check   exit 1 if the file is out of date (CI)
 */
import { run } from "./lib/bible-explore.mjs";

run("glance");
