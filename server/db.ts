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
  teams, teamMembers, teamChannels, teamPosts, teamTasks, teamAnnouncements,
  InsertTeam, InsertTeamMember, InsertTeamChannel, InsertTeamPost, InsertTeamTask, InsertTeamAnnouncement,
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

/** Backfill pillar (optional) + subPathway + isSeries by id (or slug). */
export async function backfillSubPathways(
  items: { id?: number; slug?: string; pillar?: string | null; sub?: string | null; series?: boolean }[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let updated = 0;
  const missing: (number | string)[] = [];
  for (const it of items) {
    const set: any = { subPathway: it.sub ?? null, isSeries: !!it.series };
    if (it.pillar) set.pillar = it.pillar;
    if (it.id != null) { await db.update(posts).set(set).where(eq(posts.id, it.id)); updated++; }
    else if (it.slug) { await db.update(posts).set(set).where(eq(posts.slug, it.slug)); updated++; }
    else missing.push("?");
  }
  return { updated, missing, error: null as string | null };
}

/** Group posts by normalized title; return groups with more than one copy. */
export async function findDuplicatePosts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select({
      id: posts.id, slug: posts.slug, title: posts.title, pillar: posts.pillar,
      published: posts.published, featured: posts.featured,
      publishedAt: posts.publishedAt, createdAt: posts.createdAt, body: posts.body,
    })
    .from(posts);
  const norm = (t: any) =>
    String(t || "").toLowerCase().replace(/[‘’“”]/g, "'").replace(/[^a-z0-9]+/g, " ").trim();
  const map: Record<string, any[]> = {};
  for (const r of rows) {
    const k = norm(r.title);
    if (!k) continue;
    (map[k] = map[k] || []).push({ ...r, bodyLen: (r.body ?? "").length });
  }
  const groups = Object.values(map)
    .filter((g) => g.length > 1)
    .map((g) => {
      const sorted = [...g].sort(
        (a, b) =>
          (Number(b.published) - Number(a.published)) ||
          (b.bodyLen - a.bodyLen) ||
          (new Date(b.publishedAt || b.createdAt).getTime() -
            new Date(a.publishedAt || a.createdAt).getTime())
      );
      return {
        title: sorted[0].title,
        keepId: sorted[0].id,
        copies: sorted.map((r) => ({
          id: r.id, slug: r.slug, pillar: r.pillar ?? null,
          published: !!r.published, featured: !!r.featured, bodyLen: r.bodyLen,
        })),
      };
    })
    .sort((a, b) => b.copies.length - a.copies.length);
  return { groups, error: null as string | null };
}

/** Insert essays as UNPUBLISHED posts, idempotent by slug. Returns a summary. */
export async function createDraftPosts(
  items: { slug: string; title: string; body: string; excerpt?: string | null; pillar?: string | null; subPathway?: string | null; series?: boolean; readTime?: string | null }[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let inserted = 0;
  const skipped: string[] = [];
  for (const it of items) {
    if (!it?.slug || !it?.title || !it?.body) continue;
    const existing = await db.select({ id: posts.id }).from(posts).where(eq(posts.slug, it.slug)).limit(1);
    if (existing.length > 0) { skipped.push(it.slug); continue; }
    await db.insert(posts).values({
      title: it.title, slug: it.slug, body: it.body,
      excerpt: it.excerpt ?? null, pillar: it.pillar ?? null,
      readTime: it.readTime ?? null, subPathway: it.subPathway ?? null,
      isSeries: !!it.series, published: false, featured: false,
    } as any);
    inserted++;
  }
  return { inserted, skipped, error: null as string | null };
}

/** Bulk publish/unpublish posts by slug. On publish, stamps publishedAt if unset. */
export async function publishBySlugs(slugs: string[], published: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let updated = 0;
  for (const slug of slugs) {
    const set: any = { published };
    if (published) set.publishedAt = sql`COALESCE(publishedAt, NOW())`;
    await db.update(posts).set(set).where(eq(posts.slug, slug));
    updated++;
  }
  return { updated, error: null as string | null };
}

/** Unpublish (never delete) the given post ids. Reversible duplicate cleanup. */
export async function retirePosts(ids: number[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let updated = 0;
  for (const id of ids) {
    await db.update(posts).set({ published: false }).where(eq(posts.id, id));
    updated++;
  }
  return { updated, error: null as string | null };
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

// ─── Team collaboration (data helpers) ───────────────────────────────
//
// NOTE: the team-collaboration feature (router + UI) was removed; these data
// helpers and their tables are retained for now. They do NOT enforce
// authorization — any future caller MUST verify the caller's team membership
// (and role where required) before invoking a helper that reads or writes
// team-scoped data. Never trust an id passed in.

export async function createTeam(data: InsertTeam) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(teams).values(data);
  const rows = await db.select().from(teams).where(eq(teams.id, result[0].insertId)).limit(1);
  return rows[0];
}

export async function getTeamBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(teams).where(eq(teams.slug, slug)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function getTeamByInviteCode(inviteCode: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(teams).where(eq(teams.inviteCode, inviteCode)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function getTeamById(teamId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(teams).where(eq(teams.id, teamId)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

/** Teams the user belongs to, via the team_members join. */
export async function listTeamsForUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      id: teams.id,
      name: teams.name,
      slug: teams.slug,
      inviteCode: teams.inviteCode,
      createdByUserId: teams.createdByUserId,
      createdAt: teams.createdAt,
      role: teamMembers.role,
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, userId))
    .orderBy(asc(teams.name));
}

/** The role enum without undefined: insert types mark defaulted columns optional. */
type TeamRole = NonNullable<InsertTeamMember["role"]>;

/** Idempotent on (teamId, userId): returns the existing or newly created membership. */
export async function addMember(teamId: number, userId: number, role: TeamRole = "member") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getMembership(userId, teamId);
  if (existing) return existing;
  await db.insert(teamMembers).values({ teamId, userId, role: role ?? "member" });
  return getMembership(userId, teamId);
}

/** The caller's membership row for a team, or null. The authorization primitive. */
export async function getMembership(userId: number, teamId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select()
    .from(teamMembers)
    .where(and(eq(teamMembers.userId, userId), eq(teamMembers.teamId, teamId)))
    .limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function listMembers(teamId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      id: teamMembers.id,
      userId: teamMembers.userId,
      role: teamMembers.role,
      createdAt: teamMembers.createdAt,
      name: users.name,
      email: users.email,
    })
    .from(teamMembers)
    .leftJoin(users, eq(teamMembers.userId, users.id))
    .where(eq(teamMembers.teamId, teamId))
    .orderBy(asc(teamMembers.createdAt));
}

/** Count of members holding a given role on a team (used to protect the last pastor). */
export async function countMembersWithRole(teamId: number, role: TeamRole) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(teamMembers)
    .where(and(eq(teamMembers.teamId, teamId), eq(teamMembers.role, role)));
  return Number(rows[0]?.count ?? 0);
}

/** Set a member's role. Scoped by both teamId and userId so a stray userId cannot reach another team. */
export async function setMemberRole(teamId: number, userId: number, role: TeamRole) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(teamMembers)
    .set({ role })
    .where(and(eq(teamMembers.teamId, teamId), eq(teamMembers.userId, userId)));
  return getMembership(userId, teamId);
}

export async function listChannels(teamId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(teamChannels).where(eq(teamChannels.teamId, teamId)).orderBy(asc(teamChannels.createdAt));
}

export async function getChannelById(channelId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(teamChannels).where(eq(teamChannels.id, channelId)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function createChannel(data: InsertTeamChannel) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(teamChannels).values(data);
  const rows = await db.select().from(teamChannels).where(eq(teamChannels.id, result[0].insertId)).limit(1);
  return rows[0];
}

/** Newest-first slice of a channel's posts (caller reverses for oldest-last display). */
export async function listChannelPosts(channelId: number, limit = 100) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select({
      id: teamPosts.id,
      channelId: teamPosts.channelId,
      teamId: teamPosts.teamId,
      userId: teamPosts.userId,
      body: teamPosts.body,
      createdAt: teamPosts.createdAt,
      authorName: users.name,
    })
    .from(teamPosts)
    .leftJoin(users, eq(teamPosts.userId, users.id))
    .where(eq(teamPosts.channelId, channelId))
    .orderBy(desc(teamPosts.createdAt))
    .limit(limit);
  // Return oldest-first so the UI can render top-to-bottom like a chat log.
  return rows.reverse();
}

export async function createChannelPost(data: InsertTeamPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(teamPosts).values(data);
  const rows = await db.select().from(teamPosts).where(eq(teamPosts.id, result[0].insertId)).limit(1);
  return rows[0];
}

export async function listTasks(teamId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      id: teamTasks.id,
      teamId: teamTasks.teamId,
      title: teamTasks.title,
      detail: teamTasks.detail,
      assigneeUserId: teamTasks.assigneeUserId,
      status: teamTasks.status,
      dueDate: teamTasks.dueDate,
      createdByUserId: teamTasks.createdByUserId,
      createdAt: teamTasks.createdAt,
      updatedAt: teamTasks.updatedAt,
      assigneeName: users.name,
    })
    .from(teamTasks)
    .leftJoin(users, eq(teamTasks.assigneeUserId, users.id))
    .where(eq(teamTasks.teamId, teamId))
    .orderBy(desc(teamTasks.createdAt));
}

export async function getTaskById(taskId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(teamTasks).where(eq(teamTasks.id, taskId)).limit(1);
  return rows.length > 0 ? rows[0] : null;
}

export async function createTask(data: InsertTeamTask) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(teamTasks).values(data);
  const rows = await db.select().from(teamTasks).where(eq(teamTasks.id, result[0].insertId)).limit(1);
  return rows[0];
}

/** Update task status, scoped by both id and teamId so it cannot cross team boundaries. */
export async function updateTaskStatus(taskId: number, teamId: number, status: InsertTeamTask["status"]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(teamTasks).set({ status }).where(and(eq(teamTasks.id, taskId), eq(teamTasks.teamId, teamId)));
  return getTaskById(taskId);
}

export async function listAnnouncements(teamId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select({
      id: teamAnnouncements.id,
      teamId: teamAnnouncements.teamId,
      userId: teamAnnouncements.userId,
      title: teamAnnouncements.title,
      body: teamAnnouncements.body,
      createdAt: teamAnnouncements.createdAt,
      authorName: users.name,
    })
    .from(teamAnnouncements)
    .leftJoin(users, eq(teamAnnouncements.userId, users.id))
    .where(eq(teamAnnouncements.teamId, teamId))
    .orderBy(desc(teamAnnouncements.createdAt));
}

export async function createAnnouncement(data: InsertTeamAnnouncement) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(teamAnnouncements).values(data);
  const rows = await db.select().from(teamAnnouncements).where(eq(teamAnnouncements.id, result[0].insertId)).limit(1);
  return rows[0];
}
