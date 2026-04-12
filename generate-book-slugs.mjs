import mysql from 'mysql2/promise';
import { URL } from 'url';

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function generateSlugs() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const url = new URL(dbUrl);
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: parseInt(url.port || '4000'),
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    ssl: {
      rejectUnauthorized: true,
    },
  });

  console.log('\n=== Generating Book Slugs ===\n');

  const [books] = await connection.execute('SELECT id, title FROM books');
  
  for (const book of books) {
    const slug = generateSlug(book.title);
    console.log(`${book.title} → ${slug}`);
  }

  await connection.end();
}

generateSlugs().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
