#!/usr/bin/env node
/**
 * seed-all-content.mjs
 *
 * Loads all LiveWell content (posts, books, resources, settings) into the database.
 * Uses INSERT IGNORE for posts/books/resources to avoid duplicates.
 *
 * Usage:
 *   DATABASE_URL="mysql://user:pass@host:3306/dbname" node scripts/seed-all-content.mjs
 *
 * Or if you have a .env file:
 *   node --env-file=.env scripts/seed-all-content.mjs
 */

import mysql from "mysql2/promise";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sqlFile = join(__dirname, "seed-all-content.sql");

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("ERROR: DATABASE_URL environment variable is required");
    console.error("Usage: DATABASE_URL=mysql://user:pass@host:3306/db node scripts/seed-all-content.mjs");
    process.exit(1);
  }

  console.log("Connecting to database...");
  const conn = await mysql.createConnection({
    uri: url,
    ssl: { rejectUnauthorized: true },
    multipleStatements: true
  });

  try {
    // Read the SQL file
    const sql = readFileSync(sqlFile, "utf-8");

    // Split into individual statements (split on semicolons followed by newlines)
    const statements = sql
      .split(/;\s*\n/)
      .map(s => s.replace(/^--.*$/gm, "").trim())
      .filter(s => s.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute`);

    let success = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      const preview = stmt.substring(0, 80).replace(/\n/g, " ");

      try {
        const [result] = await conn.execute(stmt);
        const affected = result?.affectedRows ?? 0;

        if (affected > 0) {
          console.log(`  [${i + 1}/${statements.length}] OK (${affected} rows): ${preview}...`);
          success++;
        } else {
          skipped++;
        }
      } catch (err) {
        // Some errors are expected (table already exists, column already exists, etc.)
        const msg = err.message || String(err);
        if (msg.includes("already exists") || msg.includes("Duplicate column") || msg.includes("Duplicate entry")) {
          skipped++;
        } else {
          console.error(`  [${i + 1}/${statements.length}] ERROR: ${msg.slice(0, 200)}`);
          console.error(`    Statement: ${preview}...`);
          errors++;
        }
      }
    }

    console.log("\n=== SEED COMPLETE ===");
    console.log(`  Successful: ${success}`);
    console.log(`  Skipped (already exists): ${skipped}`);
    console.log(`  Errors: ${errors}`);

    // Print content counts
    const tables = ["posts", "books", "resources", "site_settings"];
    for (const table of tables) {
      try {
        const [rows] = await conn.execute(`SELECT COUNT(*) as n FROM ${table}`);
        console.log(`  ${table}: ${rows[0].n} rows`);
      } catch {
        console.log(`  ${table}: table not found`);
      }
    }

  } finally {
    await conn.end();
  }
}

main().catch(err => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
