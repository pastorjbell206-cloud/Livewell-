#!/usr/bin/env node
/**
 * validate-tracks.mjs — every track holds its shape (CI gate).
 *
 *   node scripts/validate-tracks.mjs
 *
 * A track (client/public/tracks/<slug>.json) is a few numbered sessions of
 * about ten minutes. The rules, all in scripts/lib/tracks.mjs:
 *
 * - every session has a title, its minutes, one page or tool to open with a
 *   line that says why, one or two short paragraphs of teaching, one question,
 *   one thing to do, one verse to keep, and a guide for a group (an opening
 *   question, three to discuss, a prompt for prayer that is never a prayer to
 *   recite);
 * - every link is a page that is live today and not a redirect, and is the
 *   kind of page the session says it is;
 * - a track uses at least eight kinds of page, so the tools get used;
 * - Scripture is quoted word for word from the Berean Standard Bible, with
 *   its reference;
 * - the forbidden language, the em-dash, signposting, pressure and the first
 *   person are kept out, and an exclamation point stands only in Scripture;
 * - a session that touches sin, guilt, fear, death or doubt carries a care
 *   line, reused whole from the Study Bible's plain-words notes, naming Find
 *   Help and no phone number;
 * - the index (index.json) is current.
 */
import { validateLibrary } from "./lib/tracks.mjs";

const { files, errors } = validateLibrary();
if (errors.length) {
  console.error(`\n[tracks] ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`[tracks] clean (${files.length} track${files.length === 1 ? "" : "s"}).`);
