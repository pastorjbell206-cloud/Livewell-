import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// The exact 20 cornerstone article titles from the analysis
const CORNERSTONE_TITLES = [
  'What to Do When You Want to Quit Ministry',
  'How to Preach to a Politically Divided Congregation',
  'Signs of Pastor Burnout and How to Recover',
  'How to Lead a Dying Church',
  'What Gen Z Actually Wants From Church',
  'How to Handle Church Conflict as a Pastor',
  'Protecting Your Marriage in Ministry',
  'The Best Books for New Pastors',
  'Building a Culture of Discipleship, Not Just Attendance',
  'What the Bible Says About Leadership',
  'How to Start a Small Group Ministry From Scratch',
  'A Sabbatical for Pastors',
  'How to Reach the Unchurched in Your Community',
  'Pastor Depression: Why It\'s Not a Faith Problem',
  'How to Fire a Church Staff Member With Integrity',
  'Church Metrics That Actually Matter',
  'When Short-Term Mission Trips Help and When They Hurt',
  'How to Navigate the Abortion Conversation in Church',
  'Bivocational Ministry: A Complete Guide for Tent-Making Pastors',
  'Building a Personal Board of Accountability'
];

async function republishCornerstoneArticles() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('Republishing cornerstone articles...\n');
    
    // First, unpublish all articles
    await connection.query('UPDATE posts SET published = false');
    console.log('✓ Unpublished all articles\n');
    
    // Now republish only the cornerstone articles
    let republished = 0;
    let notFound = [];
    
    for (const title of CORNERSTONE_TITLES) {
      const [rows] = await connection.query(
        'SELECT id, title FROM posts WHERE title LIKE ? LIMIT 1',
        [`%${title}%`]
      );
      
      if (rows.length > 0) {
        const article = rows[0];
        await connection.query('UPDATE posts SET published = true WHERE id = ?', [article.id]);
        console.log(`✓ REPUBLISHED: "${article.title}"`);
        republished++;
      } else {
        console.log(`✗ NOT FOUND: "${title}"`);
        notFound.push(title);
      }
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`SUMMARY:`);
    console.log(`- Republished: ${republished} articles`);
    console.log(`- Not found: ${notFound.length} articles`);
    console.log(`${'='.repeat(60)}\n`);
    
    if (notFound.length > 0) {
      console.log('Articles not found:');
      notFound.forEach(title => console.log(`  - "${title}"`));
      console.log();
    }
    
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
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

republishCornerstoneArticles().then(() => {
  console.log('\n✓ Cornerstone articles republished!');
  process.exit(0);
}).catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
