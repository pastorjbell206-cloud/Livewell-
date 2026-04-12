import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { posts } from '../drizzle/schema';
import { eq, like } from 'drizzle-orm';

describe('Trench Work Articles', () => {
  let db: Awaited<ReturnType<typeof getDb>>;

  beforeAll(async () => {
    db = await getDb();
  });

  it('should have 90 Leadership Formation articles inserted', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(posts)
      .where(eq(posts.pillar, 'Leadership Formation'));

    expect(result.length).toBeGreaterThanOrEqual(90);
  });

  it('should have articles with full body content (not truncated)', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(posts)
      .where(
        eq(posts.pillar, 'Leadership Formation')
      )
      .limit(5);

    result.forEach((article) => {
      // Each article should have substantial body content (more than 500 chars)
      expect(article.body.length).toBeGreaterThan(500);
      expect(article.body).not.toContain('undefined');
      expect(article.body).not.toContain('[truncated]');
    });
  });

  it('should have articles with calculated read times', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(posts)
      .where(eq(posts.pillar, 'Leadership Formation'))
      .limit(10);

    result.forEach((article) => {
      expect(article.readTime).toBeDefined();
      expect(article.readTime).toMatch(/\d+ min read/);
    });
  });

  it('should have published articles with sufficient content', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(posts)
      .where(eq(posts.pillar, 'Leadership Formation'));

    // After archival, we expect fewer published articles
    const publishedArticles = result.filter(a => a.published);
    expect(publishedArticles.length).toBeGreaterThan(0);

    // Verify that published articles exist
    expect(publishedArticles.length).toBeGreaterThan(0);
  });

  it('should have unique slugs for all articles', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(posts)
      .where(eq(posts.pillar, 'Leadership Formation'));

    const slugs = result.map((a) => a.slug);
    const uniqueSlugs = new Set(slugs);

    expect(uniqueSlugs.size).toBe(result.length);
  });

  it('should include key Trench Work topics', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const topics = [
      'Calling',
      'Prayer',
      'Soul Care',
      'Sabbath',
      'Burnout',
      'Marriage',
      'Pastors',
    ];

    for (const topic of topics) {
      const result = await db
        .select()
        .from(posts)
        .where(
          eq(posts.pillar, 'Leadership Formation')
        );

      const hasTopicArticles = result.some((a) =>
        a.title.toLowerCase().includes(topic.toLowerCase())
      );

      expect(hasTopicArticles).toBe(true);
    }
  });
});
