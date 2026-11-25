#!/usr/bin/env node
/**
 * build-bible-timeline-index.mjs
 *
 * Writes client/public/bible/explore/timeline.json, read by
 * /study/timeline, the Bible's timeline: every book page's timeline entries in one list, by the year each book's own words name.
 * Every word in it is copied from the book pages' own data
 * (client/public/bible/notes/<book>/intro.json, `teaching`); the rules are in
 * scripts/lib/bible-explore.mjs. Rerun it after a book page's teaching data
 * changes.
 *
 *   node scripts/build-bible-timeline-index.mjs           write the file
 *   node scripts/build-bible-timeline-index.mjs --check   exit 1 if the file is out of date (CI)
 */
import { run } from "./lib/bible-explore.mjs";

run("timeline");
