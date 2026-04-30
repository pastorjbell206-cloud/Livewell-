import fs from 'fs';
import { db } from './server/db.ts';
import { posts } from './drizzle/schema.ts';

// Load extracted articles
const articles = JSON.parse(fs.readFileSync('/home/ubuntu/pcn_articles.json', 'utf8'));

console.log(`Loading ${articles.length} PCN articles with full content...`);

let added = 0;
let errors = 0;

for (const article of articles) {
  try {
    // Generate slug from title
    const slug = article.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[-\s]+/g, '-')
      .trim('-');
    
    // Insert into database
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
      console.log(`✓ Added ${added} articles...`);
    }
  } catch (error) {
    errors++;
    console.error(`✗ Error adding "${article.title}": ${error.message}`);
  }
}

console.log(`\n✅ Successfully added ${added} articles`);
if (errors > 0) {
  console.log(`⚠️  ${errors} errors encountered`);
}

process.exit(0);
