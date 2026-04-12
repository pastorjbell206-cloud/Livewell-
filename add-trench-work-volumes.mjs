import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost',
  user: process.env.DATABASE_URL?.split('://')[1]?.split(':')[0] || 'root',
  password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] || '',
  database: process.env.DATABASE_URL?.split('/').pop() || 'livewell',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const volumes = [
  {
    title: 'Vol. 01 — Pray for Your People',
    description: 'Building a Culture of Intercession in Pastoral Ministry. Learn how to make prayer the foundation of your pastoral ministry and help your congregation develop a culture of intercession.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 02 — Visit the Sick',
    description: 'Pastoral Care at Bedsides, in Hospitals, and Through Illness. Practical guidance for shepherding people through physical suffering and providing presence in their most vulnerable moments.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 03 — Teach the Word',
    description: 'Expository Preaching for the Faithful Shepherd. Master the craft of expository preaching that feeds your congregation and honors Scripture.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 04 — Shepherd the Congregation',
    description: 'Knowing, Feeding, and Protecting Your Flock. Essential skills for understanding your congregation, providing spiritual nourishment, and protecting them from harm.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 05 — Disciple One-on-One',
    description: 'Personal Discipleship in the Life of the Local Church. How to invest in individual believers and multiply leaders through intentional one-on-one relationships.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 06 — Counsel the Struggling',
    description: 'A Pastor\'s Guide to Walking People Through Hard Places. Develop wisdom and compassion for counseling people through grief, crisis, and spiritual struggle.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 07 — Care for the Widow',
    description: 'Practical Shepherding for the Bereaved and Alone. Specific guidance for caring for widows and those experiencing profound loss and loneliness.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 08 — Confront Sin',
    description: 'The Courage to Speak the Truth That Sets People Free. Learn how to address sin with both truth and grace, restoring people rather than condemning them.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 09 — Encourage the Weak',
    description: 'The Ministry of Strength for Those Who Are Running Low. How to identify and strengthen those who are spiritually, emotionally, or physically exhausted.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 10 — Identify and Train Leaders',
    description: 'Building the Next Generation of Shepherds Around You. Practical steps for recognizing leadership potential and developing the next generation of church leaders.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 11 — Do the Work of an Evangelist',
    description: 'Leading Your Church in the Mission of Gospel Proclamation. How to cultivate an evangelistic culture in your church and lead your congregation in gospel witness.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 12 — Conduct Weddings and Funerals',
    description: 'Shepherding People Through Life\'s Most Sacred Moments. Master the pastoral skills needed to lead meaningful weddings and funerals that honor God and serve families.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 13 — Exercise Oversight',
    description: 'Leading, Guarding, and Governing the Local Church. Develop biblical leadership and governance skills for stewarding the local church with wisdom and integrity.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 14 — Steward Church Finances',
    description: 'Honoring God with Every Dollar the Church Receives and Spends. Biblical principles for managing church finances with integrity and generosity.',
    category: 'Pastors',
    fileType: 'PDF',
  },
  {
    title: 'Vol. 15 — Gather Together Publicly',
    description: 'Leading Corporate Worship with Intention, Theology, and Care. How to lead worship services that are theologically sound, spiritually nourishing, and pastorally sensitive.',
    category: 'Pastors',
    fileType: 'PDF',
  },
];

const pdfUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/TWCompleteCollectionVol01-15_ecae02c3.pdf';

async function addVolumes() {
  const connection = await pool.getConnection();
  try {
    // First, delete the old complete collection entry
    await connection.query('DELETE FROM resources WHERE title LIKE "%Trench Work Series%"');
    
    // Add each volume
    for (const volume of volumes) {
      await connection.query(
        'INSERT INTO resources (title, description, category, fileType, url, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, true, NOW(), NOW())',
        [volume.title, volume.description, volume.category, volume.fileType, pdfUrl]
      );
      console.log(`✓ Added: ${volume.title}`);
    }
    
    console.log(`\n✓ Successfully added all 15 Trench Work volumes!`);
  } catch (error) {
    console.error('Error adding volumes:', error);
  } finally {
    await connection.release();
    await pool.end();
  }
}

addVolumes();
