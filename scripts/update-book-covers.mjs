import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const bookCovers = [
  { title: "When God Bless America Replaces Thy Kingdom Come", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-1-when-god-bless-america-v2-iRnCXqV2c24twMKiNVjNvk.webp" },
  { title: "The Monster in the Mirror", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-2-monster-in-mirror-v2-VUHg7fhaJAKHAEQaVeg9PB.webp" },
  { title: "What Elders Are For", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-3-what-elders-are-for-v2-DABBDUiyLegGrpfQBewENr.webp" },
  { title: "Qualified", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-4-qualified-v2-icTB5WWzVJkdqkUsnWRXcM.webp" },
  { title: "Finding and Installing Elders", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-5-finding-installing-elders-v2-j5gzRCg4PeZvc8YoUi8MWs.webp" },
  { title: "When Elders Disagree", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-6-when-elders-disagree-v2-662ecP9fVVCUpjE9SFvzVo.webp" },
  { title: "Removing an Elder", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-7-removing-elder-v2-KvueeR2yvYXNotgbALUokn.webp" },
  { title: "The Solo Pastor and His Board", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-8-solo-pastor-v2-57Lj49tyUcyg2Vg3pku7MR.webp" },
  { title: "Why Pastors Quit", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-9-why-pastors-quit-v2-M5JrbWKrnVhZmbsJbxCpm8.webp" },
  { title: "The Hidden Life", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-10-hidden-life-v2-RHj2BHuXvaeDG2zeSnB5Us.webp" },
  { title: "The Pastor's Home", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/book-cover-11-pastors-home-v2-6vYDDbtTJRY4Zm5DmqWsGd.webp" },
];

async function updateBookCovers() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    for (const bookCover of bookCovers) {
      await connection.execute(
        'UPDATE books SET coverImage = ? WHERE title = ?',
        [bookCover.url, bookCover.title]
      );
      console.log(`✓ Updated: ${bookCover.title}`);
    }
    console.log('\n✓ All book covers updated successfully!');
  } catch (error) {
    console.error('Error updating book covers:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

updateBookCovers();
