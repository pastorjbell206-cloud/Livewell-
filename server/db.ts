import { desc, eq, and, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  files, InsertFileRecord,
  posts, InsertPost,
  resources, InsertResource,
  books, InsertBook,
  siteSettings, InsertSiteSetting,
  subscribers, notifications, adminNotifications,
  InsertSubscriber, InsertNotification, InsertAdminNotification,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ───────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);

  if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Files ───────────────────────────────────────────────────────────

export async function createFileRecord(record: InsertFileRecord) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(files).values(record);
  const rows = await db.select().from(files).where(eq(files.id, result[0].insertId)).limit(1);
  return rows[0];
}

export async function listUserFiles(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(files).where(eq(files.userId, userId)).orderBy(desc(files.createdAt));
}

export async function getFileById(fileId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(files).where(and(eq(files.id, fileId), eq(files.userId, userId))).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function deleteFileRecord(fileId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(files).where(and(eq(files.id, fileId), eq(files.userId, userId)));
}

export async function updateFileDescription(fileId: number, userId: number, description: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(files).set({ description }).where(and(eq(files.id, fileId), eq(files.userId, userId)));
  return getFileById(fileId, userId);
}

// ─── Posts ───────────────────────────────────────────────────────────

export async function createPost(data: InsertPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(posts).values(data);
  const rows = await db.select().from(posts).where(eq(posts.id, result[0].insertId)).limit(1);
  return rows[0];
}

export async function listPosts(onlyPublished = false) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (onlyPublished) {
    return db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.publishedAt));
  }
  return db.select().from(posts).orderBy(desc(posts.createdAt));
}

/**
 * Slim list for the /writing index. Excludes the body field so the index
 * page doesn't ship ~50MB of markdown over the wire when there are 200+
 * articles in the DB. Use this everywhere the page only renders cards.
 */
export async function listPostsForIndex() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      pillar: posts.pillar,
      topic: posts.topic,
      coverImage: posts.coverImage,
      readingTimeMinutes: posts.readingTimeMinutes,
      readTime: posts.readTime,
      format: posts.format,
      audience: posts.audience,
      audience_type: posts.audience_type,
      contentType: posts.contentType,
      difficulty: posts.difficulty,
      publishedAt: posts.publishedAt,
      featured: posts.featured,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt));
}

export async function getPostById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function getPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function getFeaturedPost() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(posts).where(and(eq(posts.featured, true), eq(posts.published, true))).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function updatePost(id: number, data: Partial<InsertPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(posts).set(data).where(eq(posts.id, id));
  return getPostById(id);
}

export async function deletePost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(posts).where(eq(posts.id, id));
}

// ─── Two-level taxonomy (sub-pathway nav) ────────────────────────────
/** Slim per-post feed for the primary nav: pillar + sub-pathway + series flag. */
export async function listNavIndex() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({ slug: posts.slug, pillar: posts.pillar, subPathway: posts.subPathway, isSeries: posts.isSeries })
    .from(posts)
    .where(eq(posts.published, true));
}

/** Idempotently add the subPathway + isSeries columns (dev path). */
export async function migrateTaxonomy() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const added: string[] = [];
  try { await db.execute(sql`ALTER TABLE \`posts\` ADD COLUMN \`subPathway\` varchar(128) NULL`); added.push("subPathway"); } catch { /* exists */ }
  try { await db.execute(sql`ALTER TABLE \`posts\` ADD COLUMN \`isSeries\` boolean NOT NULL DEFAULT false`); added.push("isSeries"); } catch { /* exists */ }
  return { added, alreadyPresent: added.length === 0, error: null as string | null };
}

/** Backfill subPathway + isSeries by id (or slug). Never touches pillar. */
export async function backfillSubPathways(
  items: { id?: number; slug?: string; sub?: string | null; series?: boolean }[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let updated = 0;
  const missing: (number | string)[] = [];
  for (const it of items) {
    const set = { subPathway: it.sub ?? null, isSeries: !!it.series };
    if (it.id != null) { await db.update(posts).set(set).where(eq(posts.id, it.id)); updated++; }
    else if (it.slug) { await db.update(posts).set(set).where(eq(posts.slug, it.slug)); updated++; }
    else missing.push("?");
  }
  return { updated, missing, error: null as string | null };
}

/**
 * Bulk-update post bodies by slug (used by the admin "Publish article content"
 * button). Updates ONLY body + readingTimeMinutes; never touches published
 * status, title, taxonomy, or any other field. dryRun reports matches without
 * writing. Returns a summary.
 */
export async function bulkUpdatePostBodies(
  items: { slug: string; body: string; readingTimeMinutes: number }[],
  dryRun = false
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let matched = 0;
  let updated = 0;
  const missing: string[] = [];
  for (const it of items) {
    const rows = await db.select({ id: posts.id }).from(posts).where(eq(posts.slug, it.slug)).limit(1);
    if (!rows.length) { missing.push(it.slug); continue; }
    matched++;
    if (!dryRun) {
      await db.update(posts)
        .set({ body: it.body, readTime: `${it.readingTimeMinutes} min read` })
        .where(eq(posts.slug, it.slug));
      updated++;
    }
  }
  return { matched, updated, missing };
}

// ─── Resources ───────────────────────────────────────────────────────

export async function createResource(data: InsertResource) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(resources).values(data);
  const rows = await db.select().from(resources).where(eq(resources.id, result[0].insertId)).limit(1);
  return rows[0];
}

export async function listResources(onlyPublished = false) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (onlyPublished) {
    return db.select().from(resources).where(eq(resources.published, true)).orderBy(desc(resources.createdAt));
  }
  return db.select().from(resources).orderBy(desc(resources.createdAt));
}

export async function getResourceById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(resources).where(eq(resources.id, id)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function updateResource(id: number, data: Partial<InsertResource>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(resources).set(data).where(eq(resources.id, id));
  return getResourceById(id);
}

export async function deleteResource(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(resources).where(eq(resources.id, id));
}

// ─── Books ───────────────────────────────────────────────────────────

export async function createBook(data: InsertBook) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(books).values(data);
  const rows = await db.select().from(books).where(eq(books.id, result[0].insertId)).limit(1);
  return rows[0];
}

export async function listBooks(onlyPublished = false) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (onlyPublished) {
    return db.select().from(books).where(eq(books.published, true)).orderBy(asc(books.sortOrder));
  }
  return db.select().from(books).orderBy(asc(books.sortOrder));
}

export async function getBookById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(books).where(eq(books.id, id)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function getBookBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(books).where(eq(books.slug, slug)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function updateBook(id: number, data: Partial<InsertBook>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(books).set(data).where(eq(books.id, id));
  return getBookById(id);
}

export async function deleteBook(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(books).where(eq(books.id, id));
}

// ─── Site Settings ───────────────────────────────────────────────────

export async function getSetting(key: string): Promise<string | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
  return rows.length > 0 ? rows[0].settingValue : null;
}

export async function setSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(siteSettings).values({ settingKey: key, settingValue: value })
    .onDuplicateKeyUpdate({ set: { settingValue: value } });
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(siteSettings);
  const result: Record<string, string> = {};
  for (const row of rows) {
    if (row.settingValue !== null) result[row.settingKey] = row.settingValue;
  }
  return result;
}

// ─── Subscribers ─────────────────────────────────────────────────────────

export async function addSubscriber(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(subscribers).values({ email })
    .onDuplicateKeyUpdate({ set: { active: true, updatedAt: new Date() } });
}

export async function listSubscribers(onlyActive = true) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (onlyActive) {
    return db.select().from(subscribers).where(eq(subscribers.active, true));
  }
  return db.select().from(subscribers);
}

export async function removeSubscriber(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(subscribers).where(eq(subscribers.email, email));
}

// ─── Notifications ───────────────────────────────────────────────────────

export async function createNotification(data: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(notifications).values(data);
  return result;
}

export async function listNotifications(onlyActive = true) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (onlyActive) {
    return db.select().from(notifications).where(eq(notifications.active, true)).orderBy(desc(notifications.createdAt));
  }
  return db.select().from(notifications).orderBy(desc(notifications.createdAt));
}

export async function getBannerNotifications() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(notifications).where(and(eq(notifications.active, true), eq(notifications.showAsBanner, true))).orderBy(desc(notifications.createdAt));
}

// ─── Admin Notifications ─────────────────────────────────────────────────

export async function createAdminNotification(data: InsertAdminNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(adminNotifications).values(data);
}

export async function listAdminNotifications(onlyUnread = false) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (onlyUnread) {
    return db.select().from(adminNotifications).where(eq(adminNotifications.read, false)).orderBy(desc(adminNotifications.createdAt));
  }
  return db.select().from(adminNotifications).orderBy(desc(adminNotifications.createdAt));
}

export async function markAdminNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(adminNotifications).set({ read: true }).where(eq(adminNotifications.id, id));
}
