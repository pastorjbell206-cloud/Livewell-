import { db } from './server/db.ts';
import { posts } from './drizzle/schema.ts';
import fs from 'fs';

const articles = JSON.parse(fs.readFileSync('/home/ubuntu/pcn_articles.json', 'utf8'));

console.log(`Batch inserting ${articles.length} PCN articles...`);

// Prepare all articles for insertion
const articlesToInsert = articles.map(article => {
  const slug = article.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, '-')
    .trim('-');
  
  return {
    title: article.title,
    slug: slug,
    body: article.content,
    pillar: 'Leadership Formation',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

// Batch insert in chunks of 5
const chunkSize = 5;
let inserted = 0;

for (let i = 0; i < articlesToInsert.length; i += chunkSize) {
  const chunk = articlesToInsert.slice(i, i + chunkSize);
  
  try {
    await db.insert(posts).values(chunk);
    inserted += chunk.length;
    console.log(`✓ Inserted ${inserted}/${articlesToInsert.length}`);
  } catch (error) {
    console.error(`✗ Batch error at ${i}: ${error.message}`);
  }
}

console.log(`\n✅ Done! Inserted ${inserted} articles`);
process.exit(0);
