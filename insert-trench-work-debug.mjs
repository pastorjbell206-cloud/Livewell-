import fs from 'fs';
import mysql from 'mysql2/promise';
import { URL } from 'url';

const articlesData = JSON.parse(fs.readFileSync('/home/ubuntu/trench_work_articles.json', 'utf-8'));

async function insertArticles() {
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

  console.log(`Starting insertion of ${articlesData.length} articles...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  
  for (const article of articlesData) {
    try {
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
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
    } catch (error) {
      errorCount++;
      errors.push({
        title: article.title.substring(0, 60),
        error: error.message,
        code: error.code,
      });
    }
  }
  
  await connection.end();
  
  console.log(`\n✓ Insertion complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);
  
  if (errors.length > 0) {
    console.log(`\n📋 Error Details:`);
    errors.slice(0, 10).forEach((err, i) => {
      console.log(`  ${i + 1}. "${err.title}"`);
      console.log(`     Error: ${err.error}`);
      console.log(`     Code: ${err.code}\n`);
    });
  }
  
  process.exit(errorCount > 0 ? 1 : 0);
}

insertArticles().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
