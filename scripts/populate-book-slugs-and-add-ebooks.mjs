import mysql from 'mysql2/promise';
import { URL } from 'url';

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function populateSlugsAndAddEbooks() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const url = new URL(dbUrl);
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: parseInt(url.port || '4000'),
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    ssl: {
      rejectUnauthorized: true,
    },
  });

  console.log('\n=== Populating Book Slugs ===\n');

  // Get all books without slugs
  const [booksWithoutSlugs] = await connection.execute(
    'SELECT id, title FROM books WHERE slug IS NULL OR slug = ""'
  );
  
  for (const book of booksWithoutSlugs) {
    const slug = generateSlug(book.title);
    await connection.execute(
      'UPDATE books SET slug = ? WHERE id = ?',
      [slug, book.id]
    );
    console.log(`✓ ${book.title} → ${slug}`);
  }

  console.log('\n=== Adding 6 New Ebooks ===\n');

  const newEbooks = [
    {
      title: 'When Elders Disagree',
      slug: 'when-elders-disagree',
      author: 'James Bell',
      description: 'Navigating Conflict in Church Leadership. A practical guide to handling disagreements among church elders with wisdom, grace, and biblical principles.',
      coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/ebook-when-elders-disagree-EzRSZt7CJoveFVb5sqLed2.webp',
      bookType: 'authored',
      sortOrder: 4,
      published: true,
    },
    {
      title: 'Removing an Elder',
      slug: 'removing-an-elder',
      author: 'James Bell',
      description: 'Hard Decisions in Church Governance. Addressing the difficult but necessary process of removing an elder from leadership with pastoral care and biblical integrity.',
      coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/ebook-removing-an-elder-cqzb7bYK4UsKX9uDDZkU6M.webp',
      bookType: 'authored',
      sortOrder: 5,
      published: true,
    },
    {
      title: 'The Solo Pastor and His Board',
      slug: 'solo-pastor-and-his-board',
      author: 'James Bell',
      description: 'Leading Without a Senior Pastor. Essential guidance for solo pastors navigating board relationships and church governance without senior leadership support.',
      coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/ebook-solo-pastor-board-d6QD5kxtWw3DyeGHNuhfyY.webp',
      bookType: 'authored',
      sortOrder: 6,
      published: true,
    },
    {
      title: 'Why Pastors Quit',
      slug: 'why-pastors-quit',
      author: 'James Bell',
      description: 'Understanding Burnout and Calling. A compassionate exploration of why pastors leave ministry and how to recognize the warning signs of burnout before it\'s too late.',
      coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/ebook-why-pastors-quit-CAkaA2bS72dxTUPBmBqnty.webp',
      bookType: 'authored',
      sortOrder: 7,
      published: true,
    },
    {
      title: 'The Hidden Life',
      slug: 'the-hidden-life',
      author: 'James Bell',
      description: 'The Interior World of the Pastor. Exploring the spiritual disciplines and inner work necessary for pastoral leaders to maintain their own faith and calling.',
      coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/ebook-hidden-life-2eLPbRTmDqzAjFGNtYVKuB.webp',
      bookType: 'authored',
      sortOrder: 8,
      published: true,
    },
    {
      title: 'The Pastor\'s Home',
      slug: 'pastors-home',
      author: 'James Bell',
      description: 'Family Life in Ministry. Practical wisdom for maintaining a healthy family life while serving in pastoral ministry, balancing calling with family responsibilities.',
      coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/ebook-pastors-home-DhYiTiWYnhnW8P4ugYjdkr.webp',
      bookType: 'authored',
      sortOrder: 9,
      published: true,
    },
  ];

  for (const ebook of newEbooks) {
    try {
      await connection.execute(
        `INSERT INTO books (title, slug, author, description, coverImage, bookType, sortOrder, published, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          ebook.title,
          ebook.slug,
          ebook.author,
          ebook.description,
          ebook.coverImage,
          ebook.bookType,
          ebook.sortOrder,
          ebook.published,
        ]
      );
      console.log(`✓ Added: ${ebook.title}`);
    } catch (error) {
      console.error(`✗ Error adding ${ebook.title}:`, error.message);
    }
  }

  console.log('\n=== Complete ===\n');
  await connection.end();
}

populateSlugsAndAddEbooks().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
