import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getDb } from './db';
import { books } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Books Management', () => {
  let db: Awaited<ReturnType<typeof getDb>>;

  beforeAll(async () => {
    db = await getDb();
  });

  it('should have 3 key authored books inserted', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(books);

    const keyBooks = result.filter((b) => 
      ['What Elders Are For', 'Qualified', 'Finding and Installing Elders'].includes(b.title)
    );

    expect(keyBooks.length).toBe(3);
  });

  it('should have all key books with cover images', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(books);

    const keyBooks = result.filter((b) => 
      ['What Elders Are For', 'Qualified', 'Finding and Installing Elders'].includes(b.title)
    );

    keyBooks.forEach((book) => {
      expect(book.coverImage).toBeDefined();
      expect(book.coverImage).toBeTruthy();
      expect(book.coverImage).toMatch(/https:\/\//);
    });
  });

  it('should have all key books published', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(books);

    const keyBooks = result.filter((b) => 
      ['What Elders Are For', 'Qualified', 'Finding and Installing Elders'].includes(b.title)
    );

    keyBooks.forEach((book) => {
      expect(book.published).toBe(true);
    });
  });

  it('should have all key books with purchase URLs', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(books);

    const keyBooks = result.filter((b) => 
      ['What Elders Are For', 'Qualified', 'Finding and Installing Elders'].includes(b.title)
    );

    keyBooks.forEach((book) => {
      expect(book.purchaseUrl).toBeDefined();
      expect(book.purchaseUrl).toBeTruthy();
    });
  });

  it('should have all key books with descriptions', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(books);

    const keyBooks = result.filter((b) => 
      ['What Elders Are For', 'Qualified', 'Finding and Installing Elders'].includes(b.title)
    );

    keyBooks.forEach((book) => {
      expect(book.description).toBeDefined();
      expect(book.description?.length).toBeGreaterThan(100);
    });
  });

  it('should have key books with correct sort order', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(books);

    const keyBooks = result.filter((b) => 
      ['What Elders Are For', 'Qualified', 'Finding and Installing Elders'].includes(b.title)
    );

    const sortOrders = keyBooks.map((b) => b.sortOrder).sort((a, b) => a - b);
    expect(sortOrders).toEqual([1, 2, 3]);
  });

  it('should include all key book titles', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(books);

    const titles = result.map((b) => b.title);
    expect(titles).toContain('What Elders Are For');
    expect(titles).toContain('Qualified');
    expect(titles).toContain('Finding and Installing Elders');
  });

  it('should have key books with authored type', async () => {
    if (!db) {
      console.warn('Database not available, skipping test');
      return;
    }

    const result = await db
      .select()
      .from(books);

    const keyBooks = result.filter((b) => 
      ['What Elders Are For', 'Qualified', 'Finding and Installing Elders'].includes(b.title)
    );

    keyBooks.forEach((book) => {
      expect(book.bookType).toBe('authored');
    });
  });
});
