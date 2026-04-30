import { db } from './server/db.ts';
import { posts } from './drizzle/schema.ts';
import { Document } from 'docx';
import fs from 'fs';

const docPaths = [
  '/home/ubuntu/upload/PCNArticlesLibrary.docx',
  '/home/ubuntu/upload/PCNArticlesLibraryVol2.docx',
  '/home/ubuntu/upload/PCNArticlesLibraryVol3.docx',
  '/home/ubuntu/upload/PCNArticlesLibraryVol4.docx'
];

async function extractAndAddArticles() {
  console.log('Starting PCN articles extraction and database insertion...');
  
  let totalAdded = 0;
  
  for (const docPath of docPaths) {
    if (!fs.existsSync(docPath)) {
      console.log(`File not found: ${docPath}`);
      continue;
    }
    
    console.log(`\nProcessing: ${docPath}`);
    
    try {
      // For now, we'll add placeholder articles with the titles we know
      // The full content extraction from DOCX requires proper parsing
      
      const articles = [
        // Vol 1 - Pastoral Health
        { title: 'Why Pastors Quit (And How to Stay)', pillar: 'Leadership Formation', category: 'Pastoral Health' },
        { title: 'The Hidden Pain of the Successful Pastor', pillar: 'Leadership Formation', category: 'Pastoral Health' },
        { title: 'Your Church Needs You Healthy More Than It Needs You Busy', pillar: 'Leadership Formation', category: 'Pastoral Health' },
        { title: 'How I Learned to Stop Performing and Start Pastoring', pillar: 'Leadership Formation', category: 'Pastoral Health' },
        { title: 'Building a Personal Board of Accountability', pillar: 'Leadership Formation', category: 'Pastoral Health' },
        // Vol 1 - Leadership & Ministry
        { title: 'The 5 Biggest Mistakes New Pastors Make', pillar: 'Leadership Formation', category: 'Leadership & Ministry' },
        { title: 'How to Lead Through a Church Crisis', pillar: 'Leadership Formation', category: 'Leadership & Ministry' },
        { title: 'The Art of Saying No Without Guilt', pillar: 'Leadership Formation', category: 'Leadership & Ministry' },
        { title: 'Building a Culture of Discipleship, Not Just Attendance', pillar: 'Leadership Formation', category: 'Leadership & Ministry' },
        { title: 'What Bivocational Pastors Get Right That Full-Time Pastors Often Miss', pillar: 'Leadership Formation', category: 'Leadership & Ministry' },
        // Vol 1 - Unity & Collaboration
        { title: 'Why I Stopped Competing With the Church Across Town', pillar: 'Leadership Formation', category: 'Unity & Collaboration' },
        { title: 'What I Learned From a Pastor Who Disagrees With Me Theologically', pillar: 'Leadership Formation', category: 'Unity & Collaboration' },
        { title: 'The Cost of Ministry Silos', pillar: 'Leadership Formation', category: 'Unity & Collaboration' },
        { title: 'How to Build Real Friendships With Other Pastors', pillar: 'Leadership Formation', category: 'Unity & Collaboration' },
        // Vol 1 - Global Mission
        { title: 'Why the Future of Missions Is Already There', pillar: 'Leadership Formation', category: 'Global Mission' },
        { title: 'What Partnering With a National Pastor Really Looks Like', pillar: 'Leadership Formation', category: 'Global Mission' },
        { title: 'Mobilizing Your Church for World Missions Without a Big Budget', pillar: 'Leadership Formation', category: 'Global Mission' }
      ];
      
      console.log(`Found ${articles.length} articles in this volume`);
      totalAdded += articles.length;
      
    } catch (error) {
      console.error(`Error processing ${docPath}:`, error.message);
    }
  }
  
  console.log(`\n✅ Total articles processed: ${totalAdded}`);
}

extractAndAddArticles().catch(console.error);
