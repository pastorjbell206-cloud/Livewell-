/**
 * db-export-essays.mjs — READ-ONLY export of essay text for the voice audit.
 *
 * Connects with DATABASE_URL (use a READ-ONLY credential), finds the table that
 * holds the full essay bodies, and writes { slug, title, body, published } rows
 * to ./.essays-export.json (gitignored — James's full text is not committed).
 *
 * It runs only SELECT / SHOW / information_schema queries. It writes nothing to
 * the database. On first run it also reports the posts-vs-articles table layout
 * (the open Step-0 question), so we learn the schema and export in one pass.
 *
 * Usage:
 *   DATABASE_URL='mysql://readonly:pass@host:3306/db' node scripts/db-export-essays.mjs
 *   # then:
 *   node scripts/voice-audit.mjs --file ./.essays-export.json > docs/voice-audit-report.md
 */
import { writeFileSync } from "node:fs";
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "DATABASE_URL is not set. Provide a READ-ONLY connection string:\n" +
      "  DATABASE_URL='mysql://readonly:pass@host:3306/db' node scripts/db-export-essays.mjs"
  );
  process.exit(1);
}

const BODY_COLS = ["body", "content", "markdown", "html", "bodyHtml", "body_md"];
const TITLE_COLS = ["title", "name", "headline"];

async function columns(conn, table) {
  const [rows] = await conn.query(
    "SELECT column_name FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ?",
    [table]
  );
  return rows.map(r => r.column_name ?? r.COLUMN_NAME);
}

async function main() {
  // mysql2 needs SSL for most managed hosts (PlanetScale etc.). Enable unless
  // the URL already specifies it.
  const conn = await mysql.createConnection(
    url.includes("ssl") ? url : { uri: url, ssl: { rejectUnauthorized: true } }
  ).catch(async () => mysql.createConnection(url)); // fall back to plain

  try {
    const [tables] = await conn.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE()"
    );
    const names = tables.map(t => t.table_name ?? t.TABLE_NAME);
    console.error("Tables:", names.join(", "));

    const candidates = names.filter(n => /post|article|essay/i.test(n));
    let best = null;
    for (const t of candidates) {
      const cols = await columns(conn, t);
      const bodyCol = BODY_COLS.find(c => cols.includes(c));
      const titleCol = TITLE_COLS.find(c => cols.includes(c));
      const hasSlug = cols.includes("slug");
      const [[{ n }]] = [await conn.query(`SELECT COUNT(*) AS n FROM \`${t}\``)].map(r => r[0]);
      console.error(
        `  ${t}: ${n} rows | title=${titleCol ?? "?"} body=${bodyCol ?? "(none)"} slug=${hasSlug}`
      );
      if (bodyCol && titleCol && hasSlug && (!best || n > best.count)) {
        best = { table: t, bodyCol, titleCol, count: n, cols };
      }
    }

    if (!best) {
      console.error(
        "\nNo table with slug+title+body found. Columns above — tell me which table/column holds the essay text and I'll adjust."
      );
      process.exit(2);
    }

    const pubCol = best.cols.includes("published") ? "published" : null;
    const sql =
      `SELECT slug, \`${best.titleCol}\` AS title, \`${best.bodyCol}\` AS body` +
      (pubCol ? `, \`${pubCol}\` AS published` : "") +
      ` FROM \`${best.table}\``;
    const [rows] = await conn.query(sql);

    writeFileSync("./.essays-export.json", JSON.stringify(rows, null, 2));
    const withBody = rows.filter(r => (r.body || "").length > 500).length;
    console.error(
      `\nExported ${rows.length} rows from \`${best.table}\` -> ./.essays-export.json ` +
        `(${withBody} with full-length bodies). Now run:\n` +
        `  node scripts/voice-audit.mjs --file ./.essays-export.json > docs/voice-audit-report.md`
    );
  } finally {
    await conn.end();
  }
}

main().catch(err => {
  console.error("Export failed:", err.message);
  process.exit(1);
});
