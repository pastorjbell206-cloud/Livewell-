#!/usr/bin/env node
/**
 * clean-drafts.mjs — voice cleanup for content/drafts/*.md
 *
 * Applies exact, reviewed find->replace swaps to remove forbidden language from
 * the draft essays (same discipline as scripts/voice-edits.json: one exact
 * match each, never a blind global swap). Leaves citations alone (e.g. the Pew
 * "Religion Landscape Studies" proper noun in full-30). Dry-run by default;
 * pass --write to apply.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "content", "drafts");
const write = process.argv.includes("--write");

const EDITS = [
  ["essays-after-christendom.md", "less political leverage", "less political power"],
  ["essays-manhood.md", "form by showing up to the same gym", "form by being present at the same gym"],
  ["essays-manhood.md", "Start by showing up somewhere with men present", "Start by being present somewhere with men around"],
  ["essays-parenting.md", "the highest-leverage parenting work available", "the highest-impact parenting work available"],
  ["essays-skeptic.md", "God is still showing up.", "God is still moving."],
  ["full-02-your-marriage-will-get-worse-before-it-gets-better.md", "showing up after you said you would", "being there after you said you would"],
  ["full-03-what-five-sons-taught-me-about-god-the-father.md", "needed me to keep showing up while I did not know", "needed me to keep being there while I did not know"],
  ["full-03-what-five-sons-taught-me-about-god-the-father.md", "You have to keep showing up while you do not.", "You have to keep being there while you do not."],
  ["full-03-what-five-sons-taught-me-about-god-the-father.md", "The showing up is most of it.", "Being there is most of it."],
  ["full-06-what-the-early-church-knew.md", "They did not, in other words, run the playbook", "They did not, in the end, run the playbook"],
  ["full-08-what-persecution-actually-looks-like.md", "make it harder to do the work the actual situation requires", "make it harder to do what the actual situation requires"],
  ["full-18-the-historical-jesus-without-the-shortcuts.md", "reshaped the religious landscape of the", "reshaped the religious world of the"],
  ["full-19-the-bible-without-the-marketing.md", "if you do the work, scripture will speak", "if you do the reading, scripture will speak"],
  ["full-21-what-following-this-actually-costs.md", "to do the work of reading and conversation and thinking", "to do the reading and conversation and thinking"],
  ["full-22-what-manhood-was-is-and-is-going-to-have-to-become.md", "requires the church to do the work the church has been refusing to do", "requires the church to do what it has been refusing to do"],
  ["full-28-why-megachurches-are-failing.md", "Some pastors will do the work and will be removed", "Some pastors will do it and will be removed"],
  ["full-29-the-black-church-faithful-remnant.md", "The summary cannot do the work of the careful reading.", "The summary cannot replace the careful reading."],
  ["full-29-the-black-church-faithful-remnant.md", "Let them do the work in your understanding that they have been doing", "Let them work on your understanding the way they have worked"],
  ["full-32-what-couples-actually-fight-about.md", "Do the work the marriage is asking you to do.", "Do what the marriage is asking of you."],
  ["full-39-family-worship-in-the-home.md", "the highest-leverage parenting work available.", "the highest-impact parenting work available."],
  ["full-39-family-worship-in-the-home.md", "the highest-leverage parenting work available in our generation, and almost no one is naming it as the highest-leverage work", "the highest-impact parenting work available in our generation, and almost no one is naming it as the highest-impact work"],
  ["full-39-family-worship-in-the-home.md", "The leverage is not theoretical.", "The impact is not theoretical."],
  ["full-39-family-worship-in-the-home.md", "The leverage is documented across multiple research traditions.", "The impact is documented across multiple research traditions."],
  ["full-39-family-worship-in-the-home.md", "The leverage is being ignored", "This impact is being ignored"],
  ["full-40-how-much-should-christians-give.md", "and to navigate the relational complexity", "and to work through the relational complexity"],
  ["full-41-how-to-start-reading-the-bible.md", "adequate resources to navigate when it arrives", "adequate resources to weather when it arrives"],
  ["full-42-what-to-do-when-god-feels-distant.md", "should not navigate the condition alone", "should not face the condition alone"],
  ["full-43-christian-singleness.md", "to do the work of making the recovery concrete in particular congregations", "to make the recovery concrete in particular congregations"],
  ["full-44-sabbath-rest.md", "The first year will be transformative.", "The first year will change you."],
];

let applied = 0, missing = 0, ambiguous = 0;
const byFile = {};
for (const [file, find, replace] of EDITS) {
  const path = join(dir, file);
  const text = byFile[file] ?? (byFile[file] = readFileSync(path, "utf8"));
  const count = text.split(find).length - 1;
  if (count === 0) { missing++; console.log(`  ✗ no match: ${file} :: "${find.slice(0, 50)}"`); continue; }
  if (count > 1) { ambiguous++; console.log(`  ✗ ${count}× ambiguous: ${file} :: "${find.slice(0, 50)}"`); continue; }
  byFile[file] = text.replace(find, replace);
  applied++;
}

if (write) {
  for (const [file, text] of Object.entries(byFile)) writeFileSync(join(dir, file), text);
}
console.log(`\n${applied} ready · ${missing} no-match · ${ambiguous} ambiguous (of ${EDITS.length})`);
console.log(write ? "WRITTEN to content/drafts/." : "Dry run — pass --write to apply.");
