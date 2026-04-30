import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// The 20 cornerstone article titles/keywords to keep published
const CORNERSTONE_KEYWORDS = [
  'quit ministry',
  'politically divided',
  'pastor burnout',
  'dying church',
  'gen z',
  'church conflict',
  'marriage in ministry',
  'best books',
  'discipleship culture',
  'bible says about leadership',
  'small group ministry',
  'sabbatical',
  'unchurched',
  'pastor depression',
  'fire a church staff',
  'church metrics',
  'mission trips',
  'abortion conversation',
  'bivocational ministry',
  'board of accountability'
];

async function archiveArticles() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('Starting article archival process...\n');
    
    // Get all published articles
    const [articles] = await connection.query(
      'SELECT id, title, slug FROM posts WHERE published = true ORDER BY title'
    );
    
    console.log(`Found ${articles.length} published articles\n`);
    
    let kept = 0;
    let archived = 0;
    
    // Process each article
    for (const article of articles) {
      const titleLower = article.title.toLowerCase();
      const slugLower = article.slug.toLowerCase();
      
      // Check if this article matches any cornerstone keyword
      const isCornerstone = CORNERSTONE_KEYWORDS.some(keyword => 
        titleLower.includes(keyword) || slugLower.includes(keyword)
      );
      
      if (isCornerstone) {
        console.log(`✓ KEEPING: "${article.title}" (${article.slug})`);
        kept++;
      } else {
        // Archive by setting published to false
        await connection.query(
          'UPDATE posts SET published = false WHERE id = ?',
          [article.id]
        );
        console.log(`✗ ARCHIVED: "${article.title}" (${article.slug})`);
        archived++;
      }
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`SUMMARY:`);
    console.log(`- Kept (published): ${kept} articles`);
    console.log(`- Archived (unpublished): ${archived} articles`);
    console.log(`- Total: ${kept + archived} articles`);
    console.log(`${'='.repeat(60)}\n`);
    
    // Verify the changes
    const [publishedCount] = await connection.query(
      'SELECT COUNT(*) as count FROM posts WHERE published = true'
    );
    const [archivedCount] = await connection.query(
      'SELECT COUNT(*) as count FROM posts WHERE published = false'
    );
    
    console.log(`Verification:`);
    console.log(`- Published articles in database: ${publishedCount[0].count}`);
    console.log(`- Archived articles in database: ${archivedCount[0].count}`);
    
  } catch (error) {
    console.error('Error during archival:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

archiveArticles().then(() => {
  console.log('\n✓ Article archival complete!');
  process.exit(0);
}).catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
