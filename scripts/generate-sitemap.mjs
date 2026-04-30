import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://thelivewell.manus.space';

async function generateSitemap() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('Generating sitemap...\n');
    
    // Get all published articles
    const [articles] = await connection.query(
      'SELECT slug, updatedAt FROM posts WHERE published = true ORDER BY updatedAt DESC'
    );
    
    // Get all published books
    const [books] = await connection.query(
      'SELECT slug, updatedAt FROM books WHERE published = true ORDER BY updatedAt DESC'
    );
    
    // Get all reading paths (if table exists)
    let readingPaths = [];
    try {
      const [paths] = await connection.query(
        'SELECT slug, updatedAt FROM reading_paths ORDER BY updatedAt DESC'
      );
      readingPaths = paths;
    } catch (e) {
      console.log('Note: reading_paths table not found, skipping...');
    }
    
    // Build sitemap XML
    let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: '/writing', priority: '0.9', changefreq: 'daily' },
      { url: '/books', priority: '0.9', changefreq: 'weekly' },
      { url: '/reading-paths', priority: '0.8', changefreq: 'weekly' },
      { url: '/membership', priority: '0.8', changefreq: 'monthly' },
      { url: '/resources', priority: '0.7', changefreq: 'monthly' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
    ];
    
    staticPages.forEach(page => {
      sitemapXml += '  <url>\n';
      sitemapXml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
      sitemapXml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemapXml += `    <priority>${page.priority}</priority>\n`;
      sitemapXml += '  </url>\n';
    });
    
    // Add articles
    articles.forEach(article => {
      sitemapXml += '  <url>\n';
      sitemapXml += `    <loc>${BASE_URL}/article/${article.slug}</loc>\n`;
      sitemapXml += `    <lastmod>${new Date(article.updatedAt).toISOString().split('T')[0]}</lastmod>\n`;
      sitemapXml += '    <changefreq>monthly</changefreq>\n';
      sitemapXml += '    <priority>0.8</priority>\n';
      sitemapXml += '  </url>\n';
    });
    
    // Add books
    books.forEach(book => {
      sitemapXml += '  <url>\n';
      sitemapXml += `    <loc>${BASE_URL}/book/${book.slug}</loc>\n`;
      sitemapXml += `    <lastmod>${new Date(book.updatedAt).toISOString().split('T')[0]}</lastmod>\n`;
      sitemapXml += '    <changefreq>monthly</changefreq>\n';
      sitemapXml += '    <priority>0.7</priority>\n';
      sitemapXml += '  </url>\n';
    });
    
    // Add reading paths
    if (readingPaths && readingPaths.length > 0) {
      readingPaths.forEach(path => {
        sitemapXml += '  <url>\n';
        sitemapXml += `    <loc>${BASE_URL}/reading-path/${path.slug}</loc>\n`;
        sitemapXml += `    <lastmod>${new Date(path.updatedAt).toISOString().split('T')[0]}</lastmod>\n`;
        sitemapXml += '    <changefreq>monthly</changefreq>\n';
        sitemapXml += '    <priority>0.7</priority>\n';
        sitemapXml += '  </url>\n';
      });
    }
    
    sitemapXml += '</urlset>';
    
    // Write sitemap to public directory
    fs.writeFileSync('client/public/sitemap.xml', sitemapXml);
    
    console.log(`✓ Sitemap generated successfully!`);
    console.log(`  - ${staticPages.length} static pages`);
    console.log(`  - ${articles.length} articles`);
    console.log(`  - ${books.length} books`);
    console.log(`  - ${readingPaths?.length || 0} reading paths`);
    console.log(`\n✓ Saved to: client/public/sitemap.xml`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

generateSitemap().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('Failed:', error);
  process.exit(1);
});
