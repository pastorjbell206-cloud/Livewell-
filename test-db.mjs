import { db } from './server/db.ts';
import { posts } from './drizzle/schema.ts';
import { sql } from 'drizzle-orm';

try {
  console.log('Testing database connection...');
  
  // Test a simple query
  const result = await db.select({ count: sql`COUNT(*)` }).from(posts);
  console.log('✓ Database connection works');
  console.log('Current posts:', result);
  
  // Try inserting one test article
  console.log('\nTesting insert...');
  const inserted = await db.insert(posts).values({
    title: 'Test Article',
    slug: 'test-article',
    body: 'This is a test article with full content that should be saved to the database.',
    pillar: 'Leadership Formation',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  console.log('✓ Insert successful');
  
} catch (error) {
  console.error('✗ Error:', error.message);
  console.error(error.stack);
}

process.exit(0);
