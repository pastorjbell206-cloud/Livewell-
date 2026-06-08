#!/usr/bin/env node
/**
 * migrate-two-level.mjs
 *
 * Idempotently adds the two-level-taxonomy columns to `posts`:
 *   - subPathway  varchar(128) NULL
 *   - isSeries    boolean NOT NULL DEFAULT false
 *
 * Safe to run repeatedly: it checks information_schema first and only adds a
 * column if it is missing. No existing column or row is modified.
 *
 * Requires DATABASE_URL.
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL required.");
  process.exit(1);
}

const conn = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const [dbRow] = await conn.query("SELECT DATABASE() AS db");
  const db = dbRow[0].db;

  async function hasColumn(col) {
    const [rows] = await conn.execute(
      "SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'posts' AND COLUMN_NAME = ? LIMIT 1",
      [db, col]
    );
    return rows.length > 0;
  }

  if (await hasColumn("subPathway")) {
    console.log("subPathway: already exists, skipping.");
  } else {
    await conn.query("ALTER TABLE `posts` ADD COLUMN `subPathway` varchar(128) NULL");
    console.log("subPathway: added.");
  }

  if (await hasColumn("isSeries")) {
    console.log("isSeries: already exists, skipping.");
  } else {
    await conn.query("ALTER TABLE `posts` ADD COLUMN `isSeries` boolean NOT NULL DEFAULT false");
    console.log("isSeries: added.");
  }

  console.log("Migration complete.");
} finally {
  await conn.end();
}
