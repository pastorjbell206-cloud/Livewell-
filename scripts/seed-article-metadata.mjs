import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DATABASE_URL?.split('@')[1]?.split(':')[0] || 'localhost',
  user: 'root',
  password: process.env.DATABASE_URL?.split(':')[1]?.split('@')[0],
  database: process.env.DATABASE_URL?.split('/').pop(),
  ssl: { rejectUnauthorized: false }
});

// Keyword mapping for intelligent categorization
const topicKeywords = {
  'justice': ['justice', 'racism', 'inequality', 'oppression', 'prophetic', 'witness', 'culture', 'social', 'border', 'refugee', 'gentrification', 'reparation', 'doctrine of discovery'],
  'leadership': ['leadership', 'pastor', 'leader', 'vision', 'governance', 'team', 'authority', 'shepherd', 'undershepherd', 'calling'],
  'spiritual-formation': ['prayer', 'spiritual', 'formation', 'discipline', 'contemplation', 'faith', 'transformation', 'growth', 'soul', 'inner'],
  'church-health': ['church', 'health', 'unity', 'body', 'fellowship', 'community', 'gathering', 'worship'],
  'personal-growth': ['marriage', 'family', 'parenting', 'personal', 'individual', 'self', 'growth', 'development', 'mental health', 'weakness'],
  'pastoral-care': ['care', 'counseling', 'grief', 'suffering', 'pain', 'comfort', 'compassion', 'listening', 'moral injury']
};

const audienceKeywords = {
  'pastors': ['pastor', 'pastors', 'ministry', 'pulpit', 'preaching'],
  'church-leaders': ['leader', 'leadership', 'elder', 'deacon', 'governance', 'team'],
  'small-groups': ['group', 'community', 'gathering', 'discussion'],
  'individuals': ['personal', 'individual', 'marriage', 'family', 'self'],
  'couples': ['marriage', 'couple', 'spouse', 'husband', 'wife', 'relationship']
};

function categorizeArticle(title, body) {
  const text = (title + ' ' + body).toLowerCase();
  
  // Determine topic
  let topic = 'justice'; // default
  for (const [key, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(kw => text.includes(kw))) {
      topic = key;
      break;
    }
  }
  
  // Determine audience
  let audience = 'individuals'; // default
  for (const [key, keywords] of Object.entries(audienceKeywords)) {
    if (keywords.some(kw => text.includes(kw))) {
      audience = key;
      break;
    }
  }
  
  // Determine format (default: article)
  const format = 'article';
  
  // Determine difficulty based on text complexity
  const wordCount = text.split(/\s+/).length;
  let difficulty = 'intermediate';
  if (wordCount < 500) difficulty = 'beginner';
  if (wordCount > 2000) difficulty = 'advanced';
  
  // Reading time
  const readingTimeMinutes = Math.max(3, Math.ceil(wordCount / 200));
  
  return { topic, format, audience, difficulty, readingTimeMinutes };
}

// Get all published articles
const [articles] = await connection.execute('SELECT id, title, body FROM posts WHERE published = true');

console.log(`\n📝 Seeding metadata for ${articles.length} articles...`);

let updated = 0;
for (const article of articles) {
  const metadata = categorizeArticle(article.title, article.body || '');
  
  await connection.execute(
    'UPDATE posts SET topic = ?, format = ?, audience = ?, difficulty = ?, readingTimeMinutes = ? WHERE id = ?',
    [metadata.topic, metadata.format, metadata.audience, metadata.difficulty, metadata.readingTimeMinutes, article.id]
  );
  
  updated++;
  if (updated % 50 === 0) {
    console.log(`  ✓ Updated ${updated}/${articles.length} articles`);
  }
}

console.log(`\n✅ Successfully seeded metadata for ${updated} articles!`);

// Show distribution
const [distribution] = await connection.execute(`
  SELECT 
    topic, COUNT(*) as count 
  FROM posts 
  WHERE published = true 
  GROUP BY topic 
  ORDER BY count DESC
`);

console.log('\n📊 Topic Distribution:');
distribution.forEach(row => {
  console.log(`  ${row.topic}: ${row.count} articles`);
});

await connection.end();
