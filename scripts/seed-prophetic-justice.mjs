import fs from 'fs';
import mysql from 'mysql2/promise';

// Read extracted articles
const articlesJson = fs.readFileSync('/tmp/prophetic-justice-articles.json', 'utf-8');
const articles = JSON.parse(articlesJson);

async function seedArticles() {
  // Parse DATABASE_URL
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  // mysql://user:password@host:port/database?ssl=...
  const urlMatch = dbUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/);
  if (!urlMatch) {
    console.error('Invalid DATABASE_URL format');
    process.exit(1);
  }

  const [, user, password, host, port, database] = urlMatch;

  const connection = await mysql.createConnection({
    host,
    port: parseInt(port),
    user,
    password,
    database,
    ssl: {},
  });

  console.log(`Starting to seed ${articles.length} Prophetic Justice articles...`);
  
  let added = 0;
  let skipped = 0;
  
  for (const article of articles) {
    try {
      // Check if article already exists
      const [existing] = await connection.execute(
        'SELECT id FROM posts WHERE slug = ?',
        [article.slug]
      );
      
      if (existing.length > 0) {
        skipped++;
        continue;
      }
      
      // Insert article
      await connection.execute(
        `INSERT INTO posts (title, slug, excerpt, body, pillar, published, audience_type, contentType, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          article.title,
          article.slug,
          article.excerpt,
          article.excerpt, // body
          'Prophetic Justice', // pillar
          true, // published
          'general', // audience_type
          'general' // contentType
        ]
      );
      
      added++;
      
      if (added % 50 === 0) {
        console.log(`Added ${added} articles...`);
      }
    } catch (error) {
      console.error(`Error adding article "${article.title}":`, error.message);
    }
  }
  
  console.log(`\nSeeding complete!`);
  console.log(`Added: ${added}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Total processed: ${added + skipped}`);
  
  await connection.end();
  process.exit(0);
}

seedArticles().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
