/**
 * seed-articles.mjs — seed how-to article clusters into the posts table.
 *
 * Reads every JSON file in scripts/articles/ (each an array of article
 * objects) and inserts any whose slug is not already present, so the script
 * is idempotent and safe to re-run. Articles are tagged by topic (discipleship,
 * marriage, parenting, ...) so they surface on the matching section pages.
 *
 * Requires DATABASE_URL in the environment. Run from the repo root:
 *   DATABASE_URL=... npx tsx scripts/seed-articles.mjs
 *
 * Article JSON shape (per object):
 *   { title, slug, excerpt, body, topic, pillar?, readTime? }
 * body is Markdown. pillar defaults to "Integrated Life".
 */
import fs from "node:fs";
import path from "node:path";
import { createPost, getPostBySlug } from "./server/db.ts";

const DIR = "scripts/articles";

function words(s) {
  return (s || "").split(/\s+/).filter(Boolean).length;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("[seed-articles] DATABASE_URL not set. Aborting.");
    process.exit(1);
  }
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).sort()
    : [];
  if (files.length === 0) {
    console.log(`[seed-articles] no article files in ${DIR}/`);
    return;
  }

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const f of files) {
    let arr;
    try {
      arr = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    } catch (e) {
      console.error(`[seed-articles] ${f}: invalid JSON: ${e.message}`);
      failed++;
      continue;
    }
    if (!Array.isArray(arr)) {
      console.error(`[seed-articles] ${f}: expected an array`);
      failed++;
      continue;
    }
    for (const a of arr) {
      if (!a?.slug || !a?.title || !a?.body) {
        console.error(`[seed-articles] ${f}: entry missing slug/title/body`);
        failed++;
        continue;
      }
      try {
        const existing = await getPostBySlug(a.slug);
        if (existing) {
          skipped++;
          continue;
        }
        const minutes = Math.max(1, Math.round(words(a.body) / 220));
        await createPost({
          title: a.title,
          slug: a.slug,
          body: a.body,
          excerpt: a.excerpt ?? null,
          pillar: a.pillar ?? "Integrated Life",
          topic: a.topic ?? null,
          readTime: a.readTime ?? `${minutes} min read`,
          readingTimeMinutes: minutes,
          published: true,
          featured: false,
          publishedAt: new Date(),
        });
        created++;
        console.log(`[seed-articles] + ${a.slug}`);
      } catch (e) {
        failed++;
        console.error(`[seed-articles] fail ${a.slug}: ${e.message}`);
      }
    }
  }

  console.log(`[seed-articles] done: ${created} created, ${skipped} skipped, ${failed} failed`);
  process.exit(failed ? 1 : 0);
}

main();
