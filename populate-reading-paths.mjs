import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const url = new URL(connectionString);

const connection = await mysql.createConnection({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: {
    rejectUnauthorized: false,
  },
});

// Get all published articles
const [articles] = await connection.execute(
  'SELECT id, title, pillar FROM posts WHERE published = true ORDER BY createdAt DESC'
);

console.log(`Found ${articles.length} published articles`);

// Define reading paths
const readingPaths = [
  {
    slug: 'pastors-guide',
    title: 'A Pastor\'s Guide to Thriving',
    pillars: ['Leadership Formation'],
    limit: 8,
  },
  {
    slug: 'church-leadership',
    title: 'Church Leadership Essentials',
    pillars: ['Leadership Formation'],
    limit: 7,
  },
  {
    slug: 'marriage-family',
    title: 'Marriage & Family in Ministry',
    pillars: ['Integrated Life'],
    limit: 6,
  },
  {
    slug: 'spiritual-formation',
    title: 'Spiritual Formation & Prayer',
    pillars: ['Leadership Formation'],
    limit: 6,
  },
  {
    slug: 'new-to-ministry',
    title: 'New to Ministry',
    pillars: ['Leadership Formation'],
    limit: 5,
  },
  {
    slug: 'cultural-engagement',
    title: 'Cultural Engagement & Justice',
    pillars: ['Prophetic Justice'],
    limit: 7,
  },
  {
    slug: 'editors-picks',
    title: 'Editor\'s Picks',
    pillars: [],
    limit: 12,
  },
];

// Populate reading paths
for (const path of readingPaths) {
  console.log(`\nPopulating "${path.title}"...`);
  
  let selectedArticles = [];
  
  if (path.slug === 'editors-picks') {
    selectedArticles = articles.slice(0, 12);
  } else {
    selectedArticles = articles
      .filter(a => path.pillars.length === 0 || path.pillars.includes(a.pillar))
      .slice(0, path.limit);
  }
  
  console.log(`  Selected ${selectedArticles.length} articles`);
  
  // Insert reading path
  const [pathResult] = await connection.execute(
    'INSERT INTO reading_paths (slug, title, description, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
    [path.slug, path.title, `Curated collection: ${path.title}`]
  );
  
  const pathId = pathResult.insertId;
  
  // Link articles to reading path
  for (const article of selectedArticles) {
    await connection.execute(
      'INSERT INTO reading_path_articles (readingPathId, postId, sortOrder, createdAt) VALUES (?, ?, ?, NOW())',
      [pathId, article.id, selectedArticles.indexOf(article)]
    );
  }
  
  console.log(`  ✓ Created reading path with ${selectedArticles.length} articles`);
}

console.log('\n✓ Reading paths populated successfully!');
await connection.end();
