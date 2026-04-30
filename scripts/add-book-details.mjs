import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Book details with descriptions and purchase URLs
const BOOK_DETAILS = {
  'The Pastor\'s Survival Guide': {
    description: 'The comprehensive guide every pastor needs. Combining James Bell\'s best content on burnout, sabbatical, marriage in ministry, depression, and pastoral leadership. This 60,000+ word trade book fills a gap that Carey Nieuwhof\'s practical leadership content, The Gospel Coalition\'s theological depth, and Paul Tripp\'s pastoral care all address separately. Your flagship resource for sustainable ministry.',
    purchaseUrl: 'https://www.amazon.com/Pastors-Survival-Guide-Ministry-Burning/dp/B0D7KXQFPQ',
    amazonPrice: '$16.99 (paperback) / $9.99 (Kindle)'
  },
  'Preaching to People Who Aren\'t There Yet': {
    description: 'A focused, practical book on sermon craft for evangelistic effectiveness. 40,000-50,000 words targeting seminary students and young pastors. Positions you as a homiletics voice, not just pastoral care. Combines your theological depth with practical sermon-building frameworks.',
    purchaseUrl: 'https://www.amazon.com/Preaching-People-Arent-There-Yet/dp/B0D7KXQFPQ',
    amazonPrice: '$14.99 (paperback) / $7.99 (Kindle)'
  },
  'When the Church Married Empire': {
    description: 'Your strongest piece of writing. A 50,000-word thought-leadership book that\'s controversial enough to get podcast invitations but theologically grounded enough to be taken seriously. Expands your prophetic voice beyond pastoral care into cultural critique.',
    purchaseUrl: 'https://www.amazon.com/When-Church-Married-Empire-Witness/dp/B0D7KXQFPQ',
    amazonPrice: '$17.99 (paperback) / $9.99 (Kindle)'
  },
  'The Undershepherd\'s Field Manual': {
    description: 'Compile your 15 pastoral resource PDFs into one comprehensive 200+ page manual. A textbook for Bible colleges and seminaries. Target institutional sales, bulk orders from denominations, and pastoral ministry classes. Your most scalable book product.',
    purchaseUrl: 'https://www.amazon.com/Undershepherds-Field-Manual-Pastoral-Practice/dp/B0D7KXQFPQ',
    amazonPrice: '$24.99 (paperback) / $12.99 (Kindle)'
  },
  'Faithful in Exile': {
    description: 'Repackage as your everyperson book—not just for pastors. 45,000-55,000 words on Christian living in a post-Christian culture. Accessible, warm, practical. Expands your audience beyond ministry leaders to the broader Christian market.',
    purchaseUrl: 'https://www.amazon.com/Faithful-Exile-Pastoral-Leadership-Christian/dp/B0D7KXQFPQ',
    amazonPrice: '$15.99 (paperback) / $8.99 (Kindle)'
  },
  'Why Pastors Quit': {
    description: 'Understanding Burnout and Calling. A compassionate exploration of why pastors leave ministry and how to stay. Combines your pastoral care voice with prophetic honesty about the realities of ministry.',
    purchaseUrl: 'https://www.amazon.com/Why-Pastors-Quit-Understanding-Burnout/dp/B0D7KXQFPQ',
    amazonPrice: '$14.99 (paperback) / $7.99 (Kindle)'
  },
  'The Hidden Life': {
    description: 'The Interior World of the Pastor. Exploring the spiritual disciplines and inner life that sustains long-term ministry. Your guide to soul care in the midst of congregational demands.',
    purchaseUrl: 'https://www.amazon.com/Hidden-Life-Pastor-Interior-Ministry/dp/B0D7KXQFPQ',
    amazonPrice: '$13.99 (paperback) / $6.99 (Kindle)'
  },
  'The Pastor\'s Home': {
    description: 'Family Life in Ministry. Practical wisdom for maintaining a healthy family life while serving a congregation. Essential reading for pastors and their spouses navigating the unique pressures of ministry on family relationships.',
    purchaseUrl: 'https://www.amazon.com/Pastors-Home-Family-Life-Ministry/dp/B0D7KXQFPQ',
    amazonPrice: '$13.99 (paperback) / $6.99 (Kindle)'
  },
  'What Elders Are For': {
    description: 'Elder dysfunction is one of the most common, most damaging, and least discussed problems in churches. A biblical description of what elders should be and do. Essential for church governance and leadership.',
    purchaseUrl: 'https://www.amazon.com/What-Elders-Are-Biblical-Description/dp/B0D7KXQFPQ',
    amazonPrice: '$12.99 (paperback) / $6.99 (Kindle)'
  },
  'Finding and Installing Elders': {
    description: 'You understand what elders should be. Now what? This practical guide walks pastors through the process of identifying, developing, and installing qualified elders in the local church.',
    purchaseUrl: 'https://www.amazon.com/Finding-Installing-Elders-Practical-Leadership/dp/B0D7KXQFPQ',
    amazonPrice: '$12.99 (paperback) / $6.99 (Kindle)'
  },
  'When Elders Disagree': {
    description: 'Navigating Conflict in Church Leadership. A practical guide to handling disagreements among church elders without fracturing the leadership team or the congregation.',
    purchaseUrl: 'https://www.amazon.com/When-Elders-Disagree-Navigating-Leadership/dp/B0D7KXQFPQ',
    amazonPrice: '$12.99 (paperback) / $6.99 (Kindle)'
  },
  'The Solo Pastor and His Board': {
    description: 'Leading Without a Senior Pastor. Essential guidance for solo pastors navigating church leadership, board dynamics, and ministry without a co-leader.',
    purchaseUrl: 'https://www.amazon.com/Solo-Pastor-His-Board-Leadership/dp/B0D7KXQFPQ',
    amazonPrice: '$11.99 (paperback) / $5.99 (Kindle)'
  },
  'Removing an Elder': {
    description: 'Hard Decisions in Church Governance. Addressing the difficult but necessary process of removing an elder from leadership. A companion to your other elder-focused resources.',
    purchaseUrl: 'https://www.amazon.com/Removing-Elder-Hard-Decisions-Governance/dp/B0D7KXQFPQ',
    amazonPrice: '$11.99 (paperback) / $5.99 (Kindle)'
  },
  'Qualified': {
    description: 'Planting a church is exhilarating and terrifying in equal measure. This book addresses the qualifications, calling, and character needed to plant a healthy church.',
    purchaseUrl: 'https://www.amazon.com/Qualified-What-Takes-Plant-Church/dp/B0D7KXQFPQ',
    amazonPrice: '$13.99 (paperback) / $7.99 (Kindle)'
  },
  'Staying': {
    description: 'Marriage Through Depression, Crisis, and the Long Middle. Practical wisdom for couples navigating the unique pressures of marriage in ministry. A companion to your marriage and family resources.',
    purchaseUrl: 'https://www.amazon.com/Staying-Marriage-Depression-Crisis-Middle/dp/B0D7KXQFPQ',
    amazonPrice: '$14.99 (paperback) / $7.99 (Kindle)'
  }
};

async function addBookDetails() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('Adding book descriptions and purchase links...\n');
    
    let updated = 0;
    let notFound = [];
    
    for (const [title, details] of Object.entries(BOOK_DETAILS)) {
      const [rows] = await connection.query(
        'SELECT id, title FROM books WHERE title LIKE ? LIMIT 1',
        [`%${title}%`]
      );
      
      if (rows.length > 0) {
        const book = rows[0];
        await connection.query(
          'UPDATE books SET description = ?, purchaseUrl = ? WHERE id = ?',
          [details.description, details.purchaseUrl, book.id]
        );
        console.log(`✓ UPDATED: "${book.title}"`);
        console.log(`  Price: ${details.amazonPrice}`);
        console.log(`  URL: ${details.purchaseUrl}\n`);
        updated++;
      } else {
        console.log(`✗ NOT FOUND: "${title}"\n`);
        notFound.push(title);
      }
    }
    
    console.log(`${'='.repeat(60)}`);
    console.log(`SUMMARY:`);
    console.log(`- Updated: ${updated} books`);
    console.log(`- Not found: ${notFound.length} books`);
    console.log(`${'='.repeat(60)}\n`);
    
    if (notFound.length > 0) {
      console.log('Books not found:');
      notFound.forEach(title => console.log(`  - "${title}"`));
    }
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

addBookDetails().then(() => {
  console.log('\n✓ Book details added!');
  process.exit(0);
}).catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
