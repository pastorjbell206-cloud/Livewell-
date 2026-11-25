#!/usr/bin/env node
/**
 * build-bible-keys-index.mjs
 *
 * Writes client/public/bible/explore/key-chapters.json, read by
 * /study/key-chapters, where to start in every book: each book's key chapters with the book's own reason.
 * Every word in it is copied from the book pages' own data
 * (client/public/bible/notes/<book>/intro.json, `keyChapters`); the rules are in
 * scripts/lib/bible-explore.mjs. Rerun it after a book page's introduction
 * changes.
 *
 *   node scripts/build-bible-keys-index.mjs           write the file
 *   node scripts/build-bible-keys-index.mjs --check   exit 1 if the file is out of date (CI)
 */
import { run } from "./lib/bible-explore.mjs";

run("keys");
