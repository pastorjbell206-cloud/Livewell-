// seed-ebooks-db.mjs — give the standalone ebooks a row in the `books` table so
// they appear in the database-driven catalog (/books authored grid) and the
// roadmap "Published" count, each linking through to its funnel page.
//
// The site's standalone ebooks live as code (their own routes + gated PDFs) and
// are NOT otherwise in the `books` table, so they never showed up in the
// DB-driven listings. This script inserts one authored, published row per book,
// with purchaseUrl pointing at the funnel page and coverImage at the SVG/JPG
// cover. BookDetail (/books/:slug) renders the cover + description and a
// "get the ebook" button to purchaseUrl.
//
// Idempotent: keyed on the UNIQUE `slug` column with INSERT ... ON DUPLICATE KEY
// UPDATE, so re-running only refreshes the funnel-linking fields and never
// duplicates or clobbers an owner-curated title/description.
//
// Usage:
//   DATABASE_URL='mysql://user:pass@host:4000/db' node scripts/seed-ebooks-db.mjs
// or put DATABASE_URL in .env.local and run:
//   node scripts/seed-ebooks-db.mjs
import mysql from "mysql2/promise";
import fs from "node:fs";

// Best-effort load of .env.local so DATABASE_URL need not be exported.
try {
  const env = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
} catch {
  /* no .env.local — rely on the exported env var */
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is missing. Set it in .env.local or export it.");
  process.exit(1);
}

// The standalone ebooks, in the order they should sort in the catalog.
// coverImage and purchaseUrl are site-root-relative paths served by the app.
const EBOOKS = [
  { slug: "sermon-on-the-mount-as-politics", title: "The Sermon on the Mount as Politics", description: "The Sermon read as the constitution of the kingdom, not private inner life. Power, money, enemies, truth, and the poor.", cover: "/books/sermon-on-the-mount-as-politics.svg", url: "/sermon-on-the-mount-as-politics" },
  { slug: "prophetic-justice-101", title: "Prophetic Justice 101", description: "Mishpat, tsedaqah, Micah 6:8, and what the church owes its neighborhood. The prophetic tradition recovered, never partisan.", cover: "/books/prophetic-justice-101.svg", url: "/prophetic-justice-101" },
  { slug: "marriage-in-ministry", title: "Marriage in Ministry", description: "Protecting the covenant when the church demands everything, and the pressures the parsonage puts on a marriage.", cover: "/books/marriage-in-ministry.svg", url: "/marriage-in-ministry" },
  { slug: "the-loneliness-of-the-pastor", title: "The Loneliness of the Pastor", description: "Why pastors quit, and the brotherhood that could let them stay. The book the Pastors Connection Network was built around.", cover: "/books/the-loneliness-of-the-pastor.svg", url: "/the-loneliness-of-the-pastor" },
  { slug: "healwell", title: "HealWell: 52 Weeks in Costly Hope", description: "A year of honest devotionals for tired believers, written from inside the wound and pointed toward a costly hope.", cover: "/books/healwell.svg", url: "/healwell" },
  { slug: "why-not-what", title: "Why Not What", description: "How theology starts with the right question. Why before what, the order the whole Bible insists on.", cover: "/books/why-not-what.svg", url: "/why-not-what" },
  { slug: "covenant", title: "Covenant", description: "Why marriage is a promise, not a deal. The culture sold us a contract and called it romance.", cover: "/books/covenant.svg", url: "/covenant" },
  { slug: "after-christendom", title: "After Christendom", description: "How to follow Jesus now that the culture has stopped pretending to be Christian. What is dying is not the faith but Christendom.", cover: "/books/after-christendom.svg", url: "/after-christendom" },
  { slug: "alone-in-a-crowded-church", title: "Alone in a Crowded Church", description: "Why pastors burn out in silence, and how brotherhood brings them back.", cover: "/books/alone-in-a-crowded-church.svg", url: "/alone-in-a-crowded-church" },
  { slug: "consider-the-birds", title: "Consider the Birds", description: "What the Bible says about anxiety, and the peace Christ gives instead.", cover: "/books/consider-the-birds.jpg", url: "/consider-the-birds" },
  { slug: "where-your-treasure-is", title: "Where Your Treasure Is", description: "What the Bible says about money, and the heart it means to free.", cover: "/books/where-your-treasure-is.jpg", url: "/where-your-treasure-is" },
  { slug: "when-god-bless-america", title: "When God Bless America Replaces Thy Kingdom Come", description: "How patriotism became our practical savior. Civil religion is idolatry with a flag for a shroud.", cover: "/books/when-god-bless-america.jpg", url: "/books/when-god-bless-america" },
  { slug: "born-again-from-atheism", title: "Born Again From Atheism", description: "How an unbeliever came to faith as a grown man, and what he found there. The doubts taken at full strength, and the God he did not want to meet.", cover: "/books/born-again-from-atheism.svg", url: "/born-again-from-atheism" },
  { slug: "the-god-who-is-not-nice", title: "The God Who Is Not Nice", description: "Recovering the weight of God in a sentimental age. Nice is not holy, and a God with no weight cannot save.", cover: "/books/the-god-who-is-not-nice.svg", url: "/the-god-who-is-not-nice" },
  { slug: "faith-after-deconstruction", title: "Faith After Deconstruction", description: "How to lose the faith you were given and find the one that holds. What should fall, what must not, and the way through.", cover: "/books/faith-after-deconstruction.svg", url: "/faith-after-deconstruction" },
  { slug: "ordinary-holiness", title: "Ordinary Holiness", description: "Finding God in the life you actually have. Work, the body, the table, the neighbor, and the faithfulness no one applauds.", cover: "/books/ordinary-holiness.svg", url: "/ordinary-holiness" },
];

const url = new URL(dbUrl);
const conn = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port || "4000"),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: true },
});

// Ensure the table exists (matches api/index.ts).
await conn.execute(`CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(191) UNIQUE,
  author VARCHAR(200) DEFAULT 'James Bell',
  description TEXT,
  coverImage VARCHAR(1000),
  purchaseUrl VARCHAR(1000),
  bookType VARCHAR(32) DEFAULT 'authored',
  sortOrder INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

let inserted = 0;
let updated = 0;
for (let i = 0; i < EBOOKS.length; i++) {
  const b = EBOOKS[i];
  // sortOrder 10..N keeps these grouped; adjust if you curate a different order.
  const sortOrder = 10 + i;
  const [res] = await conn.execute(
    `INSERT INTO books (title, slug, author, description, coverImage, purchaseUrl, bookType, sortOrder, published)
     VALUES (?, ?, 'James Bell', ?, ?, ?, 'authored', ?, true)
     ON DUPLICATE KEY UPDATE
       coverImage = VALUES(coverImage),
       purchaseUrl = VALUES(purchaseUrl),
       bookType = 'authored',
       published = true,
       description = COALESCE(NULLIF(description, ''), VALUES(description)),
       title = VALUES(title)`,
    [b.title, b.slug, b.description, b.cover, b.url, sortOrder]
  );
  // affectedRows: 1 = inserted, 2 = updated (mysql convention for upsert).
  if (res.affectedRows === 1) inserted++;
  else updated++;
  console.log(`  ${b.slug} -> ${b.url}`);
}

const [[{ n }]] = await conn.execute("SELECT COUNT(*) AS n FROM books WHERE published = true");
console.log(`\nSeeded ${EBOOKS.length} ebooks (${inserted} inserted, ${updated} updated).`);
console.log(`Books table now has ${n} published rows.`);
await conn.end();
