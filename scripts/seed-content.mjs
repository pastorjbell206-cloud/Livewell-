import { getDb } from './server/db.ts';
import { siteSettings, posts, books } from './drizzle/schema.ts';

const db = await getDb();

if (!db) {
  console.error('Database not available');
  process.exit(1);
}

// Add Substack URL
await db.insert(siteSettings).values({
  key: 'substackUrl',
  value: 'https://substack.com/@jamesbell333289?r=6hl3j&utm_medium=ios&utm_source=stories&shareImageVariant=blur',
  createdAt: new Date(),
  updatedAt: new Date(),
}).onDuplicateKeyUpdate({
  set: {
    value: 'https://substack.com/@jamesbell333289?r=6hl3j&utm_medium=ios&utm_source=stories&shareImageVariant=blur',
    updatedAt: new Date(),
  },
});

// Add Pastors Connection URL
await db.insert(siteSettings).values({
  key: 'pastorsConnectionUrl',
  value: 'https://www.pastorsconnection.network',
  createdAt: new Date(),
  updatedAt: new Date(),
}).onDuplicateKeyUpdate({
  set: {
    value: 'https://www.pastorsconnection.network',
    updatedAt: new Date(),
  },
});

// Add books
await db.insert(books).values([
  {
    title: 'When God Bless America Replaces Thy Kingdom Come',
    author: 'James Bell',
    description: 'How Patriotism Became Our Practical Savior. A direct examination of how patriotism has replaced the kingdom of God as the practical savior in American Christianity.',
    bookType: 'authored',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'The Monster in the Mirror',
    author: 'James Bell',
    description: 'Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It. An exploration of how each generation interprets Scripture through its own cultural lens.',
    bookType: 'authored',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// Add blog posts
await db.insert(posts).values([
  {
    title: 'When God Bless America Replaces Thy Kingdom Come',
    slug: 'when-god-bless-america-replaces-thy-kingdom-come',
    excerpt: 'How Patriotism Became Our Practical Savior. A direct examination of how patriotism has replaced the kingdom of God as the practical savior in American Christianity.',
    content: 'When God Bless America Replaces Thy Kingdom Come - Full essay content from the book.',
    pillar: 'Prophetic Justice',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'The Monster in the Mirror',
    slug: 'the-monster-in-the-mirror',
    excerpt: 'Why Every Generation Gets the Bible Wrong, Why Yours Is No Different, and What to Do About It.',
    content: 'The Monster in the Mirror - Full essay content from the book.',
    pillar: 'Theological Depth',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

console.log('✓ Content added successfully');
process.exit(0);
