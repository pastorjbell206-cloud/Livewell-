import { getDb } from './server/db.ts';
import { users, posts, siteSettings } from './drizzle/schema.ts';

async function addContent() {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  try {
    // Add about content
    await db.insert(siteSettings).values({
      key: 'aboutContent',
      value: `James C. Bell is a pastor, author, and ministry leader whose work spans local church leadership, global pastoral training, and public theological writing. He serves as Lead Pastor of First Baptist Church of Fenton in Fenton, Michigan, where he has shepherded the congregation since 2016. He is the husband of Susanna and the father of five sons.

James's ministry career spans more than two decades, during which he has served in roles including assistant pastor, executive pastor, and executive director of a large nonprofit organization. His leadership has been shaped not only by formal training but by the full weight of pastoral experience.

He is the founder of the Pastors Connection Network (PCN), a national and international ministry dedicated to connecting, mentoring, and equipping pastors and churches for sustainable, faithful ministry.

James is the founder of LiveWell, a writing and ministry platform committed to biblical depth, cultural clarity, and prophetic honesty.

He is the host of Following the Way, a podcast exploring what it means to follow Jesus faithfully in the world we actually live in.

At his core, James Bell is a pastor. Not a platform. Not a brand. A pastor.`,
      aboutImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg'
    }).onDuplicateKeyUpdate({
      set: {
        value: 'James C. Bell is a pastor, author, and ministry leader...',
        aboutImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg'
      }
    });

    console.log('✅ About content added');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addContent();
