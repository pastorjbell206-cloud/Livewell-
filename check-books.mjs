import mysql from 'mysql2/promise';
import { URL } from 'url';

async function checkBooks() {
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

  const [books] = await connection.execute('SELECT id, title, author, bookType, coverImage FROM books ORDER BY sortOrder, id');
  
  console.log('\n=== Books in Database ===\n');
  books.forEach((book, idx) => {
    console.log(`${idx + 1}. ${book.title}`);
    console.log(`   Author: ${book.author}`);
    console.log(`   Type: ${book.bookType}`);
    console.log(`   Has Cover: ${book.coverImage ? 'Yes' : 'No'}`);
    console.log('');
  });

  await connection.end();
}

checkBooks().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
