#!/usr/bin/env node
/**
 * build-bible-themes-index.mjs
 *
 * Writes client/public/bible/explore/themes.json, read by
 * /study/themes, themes of the Bible: every book's themes, each with the book's own paragraph.
 * Every word in it is copied from the book pages' own data
 * (client/public/bible/notes/<book>/intro.json, `themes`); the rules are in
 * scripts/lib/bible-explore.mjs. Rerun it after a book page's introduction
 * changes.
 *
 *   node scripts/build-bible-themes-index.mjs           write the file
 *   node scripts/build-bible-themes-index.mjs --check   exit 1 if the file is out of date (CI)
 */
import { run } from "./lib/bible-explore.mjs";

run("themes");
