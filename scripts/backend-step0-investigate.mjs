/**
 * backend-step0-investigate.mjs — READ-ONLY investigation for the backend
 * unification plan (docs/backend-unification-plan.md, Step 0).
 *
 * It answers the questions that gate the whole migration:
 *   1. How many rows are in `posts` vs the orphan `articles` table?
 *   2. Which slugs exist in one table but not the other?
 *   3. Do the two tables have different column sets?
 *   4. Which table is actually serving published content?
 *
 * It runs ONLY SELECT / SHOW / information_schema queries. It writes nothing,
 * alters nothing, drops nothing. Safe to run against production.
 *
 * Usage:
 *   DATABASE_URL='mysql://user:pass@host:3306/dbname' node scripts/backend-step0-investigate.mjs
 *
 * (No DATABASE_URL was available in the environment where this was written, so
 *  it has not yet been run — output is produced wherever a DB is reachable.)
 */
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "DATABASE_URL is not set. Provide a read-only or standard connection string:\n" +
      "  DATABASE_URL='mysql://user:pass@host:3306/db' node scripts/backend-step0-investigate.mjs"
  );
  process.exit(1);
}

const line = (s = "") => console.log(s);
const rule = () => line("─".repeat(64));

async function tableExists(conn, name) {
  const [rows] = await conn.query(
    "SELECT COUNT(*) AS n FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?",
    [name]
  );
  return rows[0].n > 0;
}

async function columns(conn, name) {
  const [rows] = await conn.query(
    "SELECT column_name FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? ORDER BY ordinal_position",
    [name]
  );
  return rows.map(r => r.column_name ?? r.COLUMN_NAME);
}

async function main() {
  const conn = await mysql.createConnection(url);
  try {
    const [[{ db }]] = [await conn.query("SELECT DATABASE() AS db")].map(r => r[0]);
    line(`Database: ${db}`);
    rule();

    const hasPosts = await tableExists(conn, "posts");
    const hasArticles = await tableExists(conn, "articles");
    line(`posts table exists:    ${hasPosts}`);
    line(`articles table exists: ${hasArticles}`);
    rule();

    // 1. Counts
    if (hasPosts) {
      const [[c]] = [await conn.query("SELECT COUNT(*) AS n FROM posts")];
      const [[p]] = [
        await conn.query(
          "SELECT COUNT(*) AS n FROM posts WHERE published = 1 OR published = TRUE"
        ),
      ].map(r => r);
      line(`posts:    ${c[0].n} total, ${p[0].n} published`);
    }
    if (hasArticles) {
      const [[c]] = [await conn.query("SELECT COUNT(*) AS n FROM articles")];
      line(`articles: ${c[0].n} total`);
    }
    rule();

    // 2. Column diff
    if (hasPosts && hasArticles) {
      const pc = new Set(await columns(conn, "posts"));
      const ac = new Set(await columns(conn, "articles"));
      const onlyPosts = [...pc].filter(c => !ac.has(c));
      const onlyArticles = [...ac].filter(c => !pc.has(c));
      line("Columns only in posts:    " + (onlyPosts.join(", ") || "(none)"));
      line("Columns only in articles: " + (onlyArticles.join(", ") || "(none)"));
      rule();

      // 3. Slug divergence (only if both have a `slug` column)
      if (pc.has("slug") && ac.has("slug")) {
        const [missingFromPosts] = await conn.query(
          "SELECT a.slug FROM articles a LEFT JOIN posts p ON p.slug = a.slug WHERE p.slug IS NULL LIMIT 50"
        );
        const [missingFromArticles] = await conn.query(
          "SELECT p.slug FROM posts p LEFT JOIN articles a ON a.slug = p.slug WHERE a.slug IS NULL LIMIT 50"
        );
        line(
          `Slugs in articles but NOT posts (${missingFromPosts.length}${
            missingFromPosts.length === 50 ? "+" : ""
          }):`
        );
        missingFromPosts.forEach(r => line("  - " + (r.slug ?? r.SLUG)));
        line(
          `Slugs in posts but NOT articles (${missingFromArticles.length}${
            missingFromArticles.length === 50 ? "+" : ""
          }):`
        );
        missingFromArticles.forEach(r => line("  - " + (r.slug ?? r.SLUG)));
        rule();
      }
    }

    line("Done. This was read-only. Next: decide the canonical table (Step 1),");
    line("then write the idempotent backfill (Step 2) — see the plan doc.");
  } finally {
    await conn.end();
  }
}

main().catch(err => {
  console.error("Investigation failed:", err.message);
  process.exit(1);
});
