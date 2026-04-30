import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const ebooks = [
  {
    title: "Leading the Local Church",
    author: "Pastors Connection Network",
    description: "Comprehensive guide to pastoral leadership, staff culture, and church management. Covers decision-making, staff dynamics, feedback, termination, and what makes a leader worth following.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/ebook-leading-local-church-d6F6rF9uRVHFsYosvP5Ju3.webp",
    purchaseUrl: "https://pastorsconnectionnetwork.com/store",
    slug: "pcn-leading-local-church",
    sortOrder: 29
  },
  {
    title: "The Honest Marriage",
    author: "James Bell",
    description: "What Nobody Told You Before the Wedding. Practical wisdom for couples navigating marriage with honesty, vulnerability, and grace.",
    coverUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/ebook-honest-marriage-Yrs29xZ4TAnRfFPqg3NiWG.webp",
    purchaseUrl: "https://pastorsconnectionnetwork.com/store",
    slug: "livewell-honest-marriage",
    sortOrder: 30
  }
];

async function insertEbooks() {
  const dbUrl = process.env.DATABASE_URL;
  const urlParts = dbUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  
  if (!urlParts) {
    console.error("Invalid DATABASE_URL format");
    process.exit(1);
  }

  const [, user, password, host, port, database] = urlParts;

  const connection = await mysql.createConnection({
    host,
    user,
    password,
    database,
    port: parseInt(port),
    ssl: {
      rejectUnauthorized: false
    }
  });

  let inserted = 0;
  let errors = 0;

  for (const ebook of ebooks) {
    try {
      await connection.execute(
        `INSERT INTO books (title, author, description, coverUrl, purchaseUrl, slug, sortOrder, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [ebook.title, ebook.author, ebook.description, ebook.coverUrl, ebook.purchaseUrl, ebook.slug, ebook.sortOrder]
      );
      inserted++;
      console.log(`✓ Inserted: ${ebook.title}`);
    } catch (error) {
      errors++;
      console.error(`✗ Error inserting ${ebook.title}:`, error.message);
    }
  }

  await connection.end();
  console.log(`\nSummary: ${inserted}/${ebooks.length} inserted, ${errors} errors`);
}

insertEbooks().catch(console.error);
