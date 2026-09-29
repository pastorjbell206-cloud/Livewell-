#!/usr/bin/env node
/**
 * export-waitlist.mjs — the membership waitlist, as a CSV.
 *
 * The membership page was removed (September 2026; it only ever showed a
 * waitlist, because no Stripe price was set). The addresses people left are
 * not lost: the page stored each one in the subscribers table under the
 * source "membership-waitlist" and pushed it to the newsletter provider at
 * signup. This writes them out so James can import or mail them.
 *
 * Read-only: one SELECT. Needs DATABASE_URL.
 *
 *   DATABASE_URL="mysql://..." node scripts/export-waitlist.mjs > waitlist.csv
 */
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[waitlist] DATABASE_URL is required (read-only)");
  process.exit(1);
}
const csv = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

const conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: true } });
try {
  const [rows] = await conn.query(
    "SELECT email, name, source, created_at FROM subscribers WHERE source = 'membership-waitlist' ORDER BY created_at ASC"
  );
  process.stdout.write("email,name,source,created_at\n");
  for (const r of rows) process.stdout.write([r.email, r.name, r.source, r.created_at ? new Date(r.created_at).toISOString() : ""].map(csv).join(",") + "\n");
  console.error(`[waitlist] ${rows.length} address(es)`);
} finally {
  await conn.end();
}
