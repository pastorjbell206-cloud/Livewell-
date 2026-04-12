import fs from 'fs';
import mysql from 'mysql2/promise';
import { URL } from 'url';

const articlesData = JSON.parse(fs.readFileSync('/home/ubuntu/trench_work_articles.json', 'utf-8'));

async function insertArticles() {
  // Parse DATABASE_URL
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

  console.log(`Starting insertion of ${articlesData.length} articles...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const article of articlesData) {
    try {
      // Create slug from title
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Calculate read time (roughly 200 words per minute)
      const wordCount = article.body.split(/\s+/).length;
      const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;
      
      const query = `
        INSERT INTO posts (title, slug, body, pillar, readTime, published, publishedAt, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const now = new Date();
      await connection.execute(query, [
        article.title,
        slug,
        article.body,
        'Leadership Formation',
        readTime,
        true,
        now,
        now,
        now,
      ]);
      
      successCount++;
      console.log(`✓ [${successCount}/${articlesData.length}] Inserted: ${article.title.substring(0, 50)}`);
    } catch (error) {
      errorCount++;
      console.error(`✗ Error inserting ${article.title}:`, error.message);
    }
  }
  
  await connection.end();
  
  console.log(`\n✓ Insertion complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);
  process.exit(errorCount > 0 ? 1 : 0);
}

insertArticles().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
