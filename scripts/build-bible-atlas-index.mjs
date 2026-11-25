#!/usr/bin/env node
/**
 * build-bible-atlas-index.mjs
 *
 * Writes client/public/bible/explore/atlas.json, read by
 * /study/atlas, the Bible atlas: every place the book pages place, with the books and chapters that name it.
 * Every word in it is copied from the book pages' own data
 * (client/public/bible/notes/<book>/intro.json, `teaching`); the rules are in
 * scripts/lib/bible-explore.mjs. Rerun it after a book page's teaching data
 * changes.
 *
 *   node scripts/build-bible-atlas-index.mjs           write the file
 *   node scripts/build-bible-atlas-index.mjs --check   exit 1 if the file is out of date (CI)
 */
import { run } from "./lib/bible-explore.mjs";

run("atlas");
