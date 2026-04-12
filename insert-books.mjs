import mysql from 'mysql2/promise';
import { URL } from 'url';

const booksData = [
  {
    title: "What Elders Are For",
    author: "James Bell",
    description: "Elder dysfunction is one of the most common, most damaging, and least discussed problems in the local church. This book recovers a biblical understanding of eldership—not as a governance function, but as a shepherding calling. Perfect for pastors struggling with board dynamics, church leaders wanting to reset their elder teams, and anyone nominated to an elder position seeking clarity on what they're actually agreeing to.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-what-elders-are-for-FWpH9meBhoLnttwoJSxdzU.webp",
    purchaseUrl: "https://www.amazon.com/What-Elders-Are-Biblical-Description/dp/B0D7KXQFPQ",
    bookType: "authored",
    sortOrder: 1,
    published: true
  },
  {
    title: "Qualified",
    author: "James Bell",
    description: "Planting a church is exhilarating and terrifying in equal measure. This book addresses the question every church planter wrestles with: Am I qualified for this? It's not a how-to manual for church planting logistics. It's a biblical and practical guide to the character, conviction, and competence required to plant a church that lasts—and to lead it with integrity when the initial excitement fades.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-qualified-cRdAiAXGuJbTAZrjcSHUXK.webp",
    purchaseUrl: "https://www.amazon.com/Qualified-What-Takes-Plant-Church/dp/B0D7KXQFPQ",
    bookType: "authored",
    sortOrder: 2,
    published: true
  },
  {
    title: "Finding and Installing Elders",
    author: "James Bell",
    description: "You understand what elders should be. Now what? This practical guide walks pastors through the process of identifying, developing, and installing elders in their congregation. From recognizing potential leaders to having difficult conversations, from setting expectations to building accountability structures—this book provides the roadmap for building an elder team that actually functions according to biblical design.",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-finding-installing-elders-hvDqUxnSN4SKh9ArhEUTLf.webp",
    purchaseUrl: "https://www.amazon.com/Finding-Installing-Elders-Practical-Leadership/dp/B0D7KXQFPQ",
    bookType: "authored",
    sortOrder: 3,
    published: true
  }
];

async function insertBooks() {
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

  console.log(`Starting insertion of ${booksData.length} books...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < booksData.length; i++) {
    const book = booksData[i];
    try {
      const query = `
        INSERT INTO books (title, author, description, coverImage, purchaseUrl, bookType, sortOrder, published, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const now = new Date();
      await connection.execute(query, [
        book.title,
        book.author,
        book.description,
        book.coverImage,
        book.purchaseUrl,
        book.bookType,
        book.sortOrder,
        book.published,
        now,
        now,
      ]);
      
      successCount++;
      console.log(`✓ [${successCount}/${booksData.length}] Inserted: ${book.title}`);
    } catch (error) {
      errorCount++;
      console.error(`✗ Error [${i + 1}/${booksData.length}] ${book.title}: ${error.message}`);
    }
  }
  
  await connection.end();
  
  console.log(`\n✓ Insertion complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Errors: ${errorCount}`);
  process.exit(errorCount > 0 ? 1 : 0);
}

insertBooks().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
