import { db } from './server/db.ts';
import { posts } from './drizzle/schema.ts';
import fs from 'fs';

const articles = JSON.parse(fs.readFileSync('/home/ubuntu/pcn_articles.json', 'utf8'));

console.log(`Adding ${articles.length} PCN articles with full content...`);

let added = 0;

for (const article of articles) {
  const slug = article.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, '-')
    .trim('-');

  try {
    await db.insert(posts).values({
      title: article.title,
      slug: slug,
      body: article.content,
      pillar: 'Leadership Formation',
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    added++;
    if (added % 10 === 0) {
      console.log(`✓ ${added}/${articles.length}`);
    }
  } catch (error) {
    console.error(`✗ ${article.title}: ${error.message}`);
  }
}

console.log(`\n✅ Added ${added} articles`);
process.exit(0);
