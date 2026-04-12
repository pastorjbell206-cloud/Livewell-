import mysql from 'mysql2/promise';
import { URL } from 'url';

const bookCovers = {
  'When God Bless America Replaces Thy Kingdom Come': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-when-god-bless-america-K65XBoLDhEhDfWeZ99doPE.webp',
  'The Monster in the Mirror': 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-monster-in-mirror-3pkC2YUp25qUTqfkpvrfxD.webp',
};

async function updateCovers() {
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

  console.log('\n=== Updating Book Covers ===\n');

  for (const [title, coverUrl] of Object.entries(bookCovers)) {
    try {
      const [result] = await connection.execute(
        'UPDATE books SET coverImage = ? WHERE title = ?',
        [coverUrl, title]
      );
      console.log(`✓ Updated: ${title}`);
      console.log(`  Cover: ${coverUrl}`);
    } catch (error) {
      console.error(`✗ Failed to update ${title}:`, error.message);
    }
  }

  console.log('\n=== Verification ===\n');
  const [books] = await connection.execute(
    'SELECT title, coverImage FROM books WHERE title IN (?, ?)',
    ['When God Bless America Replaces Thy Kingdom Come', 'The Monster in the Mirror']
  );

  books.forEach((book) => {
    console.log(`${book.title}`);
    console.log(`  Has Cover: ${book.coverImage ? 'Yes ✓' : 'No ✗'}`);
  });

  await connection.end();
}

updateCovers().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
