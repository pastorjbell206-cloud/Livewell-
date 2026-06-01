#!/usr/bin/env node
/**
 * seed-reading-paths.mjs
 *
 * Populates the `reading_paths` and `reading_path_articles` tables with
 * curated paths. Each path is an *argument arc* — the essays in the order
 * Bell would hand them to a reader.
 *
 * Path slugs:
 *   - after-christendom         (the lede arc)
 *   - skeptic-track             (matches /skeptic-track landing page)
 *   - politics-and-the-cross    (Christian nationalism reading)
 *   - american-church           (post-Christendom church identity)
 *   - prophetic-justice-101     (the justice arc)
 *   - pastoring-through-burnout (PCN entry point)
 *   - marriage-in-ministry      (pastor-marriage cluster)
 *   - doubt-and-deconstruction  (the deconstruction arc)
 *
 * Article slug references below are speculative — they assume the publish
 * pipeline has been run and the slugs match the conventions in publish-book.ts
 * (book-slug-chNN) and publish-docx.ts (filename-derived). If a referenced
 * slug doesn't exist in the DB, the script skips that step quietly and logs
 * a warning so you can fix it manually.
 *
 * Usage:
 *   DATABASE_URL=mysql://... node scripts/seed-reading-paths.mjs
 *   DATABASE_URL=mysql://... node scripts/seed-reading-paths.mjs --dry-run
 *
 * Idempotent. Re-running upserts the paths and re-syncs the article order.
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DRY_RUN = process.argv.includes("--dry-run");

// ── Path definitions ───────────────────────────────────────────────────

const PATHS = [
  {
    slug: "after-christendom",
    title: "After Christendom",
    description:
      "What happens when cultural Christianity collapses and you have to decide whether the actual faith is worth keeping. Read in order.",
    persona: "general",
    icon: "🏛",
    articles: [
      // Lede chapter from the flagship book
      "when-god-bless-america-ch01",
      "when-god-bless-america-ch02",
      "when-god-bless-america-ch03",
      // Companion essays from the manuscripts
      "the-church-after-christendom",
      "the-blindness-of-the-faithful",
      "the-real-jesus-and-his-discontents",
      "monster-in-the-mirror-ch01",
    ],
  },
  {
    slug: "skeptic-track",
    title: "The Skeptic's Track",
    description:
      "Seven essays in argument order. Written for the version of me that was an atheist. No conversion bait. No bad apologetics.",
    persona: "skeptic",
    icon: "?",
    articles: [
      "the-questions-that-actually-matter",
      "what-secular-explanations-still-have-to-explain",
      "the-problem-of-suffering-honestly",
      "the-historical-jesus-without-the-shortcuts",
      "the-bible-without-the-marketing",
      "morality-without-god-and-with-him",
      "what-following-this-actually-costs",
      // Plus a final landing from a real book
      "the-christian-and-the-skeptic",
    ],
  },
  {
    slug: "politics-and-the-cross",
    title: "Politics & the Cross",
    description:
      "Reading the American political moment from inside the room where people fall apart — the blind spots distorting left and right.",
    persona: "general",
    icon: "✕",
    articles: [
      "christianity-and-political-identity",
      "the-third-option",
      "when-god-bless-america-ch04",
      "when-god-bless-america-ch05",
      "the-kingdom-of-god-is-not-the-same-as-america",
      "the-church-and-race-in-america",
    ],
  },
  {
    slug: "american-church",
    title: "The American Church",
    description:
      "The institutions, habits, and theological drift of the church as it actually exists in America right now.",
    persona: "general",
    icon: "⛪",
    articles: [
      "the-church-after-christendom",
      "the-meaning-of-church-membership",
      "the-prosperity-gospel-and-the-god-who-suffers",
      "church-discipline-and-the-gospel",
      "the-meaning-of-marriage",
      "spiritual-abuse-and-the-misuse-of-authority",
    ],
  },
  {
    slug: "prophetic-justice-101",
    title: "Prophetic Justice 101",
    description:
      "Mishpat, tsedaqah, Micah 6:8, and the long arc. The justice arc as a 10-essay reading.",
    persona: "general",
    icon: "⚖",
    articles: [
      "the-church-and-race-in-america",
      "racial-reconciliation-and-the-body-of-christ",
      "the-stranger-and-the-border",
      "forgiveness-justice-and-the-cross",
      "jesus-and-money",
      "suffering-silence-and-the-faithfulness-of-god",
    ],
  },
  {
    slug: "pastoring-through-burnout",
    title: "Pastoring Through Burnout",
    description:
      "For the pastor on the edge of walking away. From the books written from inside the crisis, not about it.",
    persona: "pastor",
    icon: "🛟",
    articles: [
      "pastoral-sustainability-and-the-cost-of-ministry",
      "the-case-for-staying",
      "spiritual-abuse-and-the-misuse-of-authority",
      "book01-what-elders-are-for-ch01",
      "the-pastors-survival-guide-complete-book-ch01",
      "the-10-rules-of-revitalization",
    ],
  },
  {
    slug: "marriage-in-ministry",
    title: "Marriage in Ministry",
    description:
      "The pressures the parsonage carries that the rest of the marriage manuals never name.",
    persona: "couple",
    icon: "♥",
    articles: [
      "the-meaning-of-marriage",
      "the-honest-marriage-james-bell-ch01",
      "divorce-remarriage-and-grace",
      "singleness-sexuality-and-the-kingdom",
      "the-marriage-nobody-sees",
    ],
  },
  {
    slug: "doubt-and-deconstruction",
    title: "Doubt & Deconstruction",
    description:
      "For deconstructors, doubters, and Christians whose questions outgrew their answers. The honest path.",
    persona: "skeptic",
    icon: "?",
    articles: [
      "deconstruction-of-faith",
      "the-christian-and-the-skeptic",
      "apologetics-and-the-existence-of-god",
      "the-reliability-of-scripture",
      "the-doctrine-of-hell",
      "what-if-were-wrong",
      "misunderstanding-god",
    ],
  },
];

// ── Run ────────────────────────────────────────────────────────────────

async function main() {
  if (!DRY_RUN && !process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required (or pass --dry-run for preview).");
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log("=== DRY RUN — no DB writes ===\n");
    for (const p of PATHS) {
      console.log(`PATH: ${p.title}  (/reading-paths/${p.slug})`);
      console.log(`  persona: ${p.persona}`);
      console.log(`  description: ${p.description.slice(0, 80)}…`);
      console.log(`  articles (${p.articles.length}):`);
      for (const slug of p.articles) {
        console.log(`    - ${slug}`);
      }
      console.log("");
    }
    console.log(`Total: ${PATHS.length} paths, ${PATHS.reduce((sum, p) => sum + p.articles.length, 0)} article references.`);
    return;
  }

  const conn = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: true },
  });

  try {
    // Build slug → post id map
    const [postRows] = await conn.query("SELECT id, slug FROM posts");
    const postIdBySlug = new Map(postRows.map(r => [r.slug, r.id]));

    let sortOrder = 0;
    for (const p of PATHS) {
      // 1. Upsert the path itself
      await conn.execute(
        `INSERT INTO reading_paths (title, slug, description, persona, icon, sortOrder, published)
         VALUES (?, ?, ?, ?, ?, ?, true)
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           description = VALUES(description),
           persona = VALUES(persona),
           icon = VALUES(icon),
           sortOrder = VALUES(sortOrder)`,
        [p.title, p.slug, p.description, p.persona, p.icon, sortOrder]
      );
      sortOrder += 1;

      // 2. Read the path id back
      const [pathRows] = await conn.query(
        "SELECT id FROM reading_paths WHERE slug = ? LIMIT 1",
        [p.slug]
      );
      const pathId = pathRows[0]?.id;
      if (!pathId) {
        console.warn(`  ⚠ could not read back path id for ${p.slug}; skipping articles`);
        continue;
      }

      // 3. Clear existing entries for this path (re-sync)
      await conn.execute(
        "DELETE FROM reading_path_articles WHERE pathId = ?",
        [pathId]
      );

      // 4. Insert articles in order
      let resolved = 0;
      let missing = 0;
      for (let i = 0; i < p.articles.length; i++) {
        const slug = p.articles[i];
        const postId = postIdBySlug.get(slug);
        if (!postId) {
          console.warn(`  ⚠ ${p.slug}: post slug not in DB: ${slug}`);
          missing += 1;
          continue;
        }
        await conn.execute(
          `INSERT INTO reading_path_articles (pathId, postId, orderInPath)
           VALUES (?, ?, ?)`,
          [pathId, postId, i + 1]
        );
        resolved += 1;
      }

      console.log(`OK ${p.title}: ${resolved} of ${p.articles.length} articles linked (${missing} missing)`);
    }

    console.log(`\nSeeded ${PATHS.length} reading paths.`);
  } finally {
    await conn.end();
  }
}

main().catch(err => {
  console.error("Failed:", err.message);
  process.exit(1);
});
