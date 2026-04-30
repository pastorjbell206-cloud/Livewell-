import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Articles to KEEP published (best standalone articles)
const ARTICLES_TO_KEEP = [
  '80% of Churches Are Plateaued or Declining',
  'AI, Authenticity, and the Pastor',
  'Anxiety, Perfectionism, and the Pastor',
  'Building a Culture of Discipleship',
  'Building a Leadership Team',
  'Building a Mission-Sending Culture',
  'Building a Personal Board of Accountability',
  'Building a Staff Culture Where People Don\'t Burn Out',
  'When Short-Term Mission Trips Help and When They Hurt',
  'Why Pastors Quit',
  'Why the Church Needs Theologians',
  'When the Church Married Empire',
  'What the Bible Actually Says About Submission',
  'What the Church Owes the Woman in Crisis Pregnancy',
  'When a Church Member\'s Abortion Is the Secret',
  'How to Navigate the Abortion Conversation',
  'When Is It Time to Revitalize',
  'When You Discover Your Predecessor Did Serious Damage',
  'When a Church Split Happens',
  'When a Staff Member Is Going Through Personal Crisis',
  'When to Fire Someone',
  'When Fear Rewrites Theology',
  'When God Bless America Replaces Thy Kingdom Come',
  'Sabbatical for Pastors',
  'Bivocational Ministry'
];

async function keepBestArticles() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('Archiving chapter excerpts and keeping best articles...\n');
    
    // First, unpublish all articles
    await connection.query('UPDATE posts SET published = false');
    console.log('✓ Unpublished all articles\n');
    
    // Now republish only the best articles
    let kept = 0;
    let archived = 0;
    
    for (const title of ARTICLES_TO_KEEP) {
      const [rows] = await connection.query(
        'SELECT id, title FROM posts WHERE title LIKE ? LIMIT 1',
        [`%${title}%`]
      );
      
      if (rows.length > 0) {
        const article = rows[0];
        await connection.query('UPDATE posts SET published = true WHERE id = ?', [article.id]);
        console.log(`✓ KEPT: "${article.title}"`);
        kept++;
      } else {
        console.log(`? NOT FOUND: "${title}"`);
      }
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`SUMMARY:`);
    console.log(`- Kept (published): ${kept} articles`);
    console.log(`- Archived (unpublished): All others`);
    console.log(`${'='.repeat(60)}\n`);
    
    // Verify
    const [publishedCount] = await connection.query(
      'SELECT COUNT(*) as count FROM posts WHERE published = true'
    );
    const [archivedCount] = await connection.query(
      'SELECT COUNT(*) as count FROM posts WHERE published = false'
    );
    
    console.log(`Verification:`);
    console.log(`- Published articles: ${publishedCount[0].count}`);
    console.log(`- Archived articles: ${archivedCount[0].count}`);
    console.log(`- Total: ${publishedCount[0].count + archivedCount[0].count}`);
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

keepBestArticles().then(() => {
  console.log('\n✓ Article curation complete!');
  process.exit(0);
}).catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
