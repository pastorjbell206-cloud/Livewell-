import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "livewell",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function unpublishChapters() {
  const conn = await pool.getConnection();
  try {
    // Find all articles starting with "Chapter"
    const [chapters] = await conn.execute(
      "SELECT id, title FROM posts WHERE title LIKE 'Chapter %' AND published = 1"
    );

    console.log(`Found ${chapters.length} chapter articles to unpublish`);

    // Unpublish each one
    for (const chapter of chapters) {
      await conn.execute(
        "UPDATE posts SET published = 0 WHERE id = ?",
        [chapter.id]
      );
      console.log(`✓ Unpublished: ${chapter.title}`);
    }

    console.log(`\nSuccessfully unpublished ${chapters.length} chapter articles`);
  } finally {
    conn.release();
    await pool.end();
  }
}

unpublishChapters().catch(console.error);
