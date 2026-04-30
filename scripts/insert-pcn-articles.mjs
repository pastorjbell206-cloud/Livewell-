import fs from 'fs';
import mysql from 'mysql2/promise';
import { URL } from 'url';

const articlesData = JSON.parse(fs.readFileSync('/home/ubuntu/upload/Pasted_content_02.txt', 'utf-8'));

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

  console.log(`Starting insertion of ${articlesData.length} PCN articles...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  const usedSlugs = new Set();
  
  for (let i = 0; i < articlesData.length; i++) {
    const article = articlesData[i];
    try {
      // Create a unique slug
      let slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // If slug already exists, append the index to make it unique
      if (usedSlugs.has(slug)) {
        slug = `${slug}-${i}`;
      }
      usedSlugs.add(slug);
      
      const wordCount = article.body.split(/\s+/).length;
      const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;
      
      // Map category to pillar
      let pillar = 'Leadership Formation';
      const category = article.category || '';
      
      if (category.includes('Global Mission')) {
        pillar = 'Prophetic Justice';
      } else if (category.includes('Church') || category.includes('Community')) {
        pillar = 'Integrated Life';
      } else if (category.includes('Vision') || category.includes('Calling')) {
        pillar = 'Leadership Formation';
      }
      
      const query = `
        INSERT INTO posts (title, slug, body, pillar, readTime, published, publishedAt, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const now = new Date();
      await connection.execute(query, [
        article.title,
        slug,
        article.body,
        pillar,
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
      console.error(`✗ Error [${i + 1}/${articlesData.length}] ${article.title.substring(0, 50)}: ${error.message}`);
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
