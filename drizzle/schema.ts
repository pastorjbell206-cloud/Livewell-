import { bigint, boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

// ─── Users ───────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Files ───────────────────────────────────────────────────────────
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  filename: varchar("filename", { length: 512 }).notNull(),
  fileKey: varchar("fileKey", { length: 1024 }).notNull(),
  url: text("url").notNull(),
  mimeType: varchar("mimeType", { length: 128 }).notNull(),
  size: bigint("size", { mode: "number" }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FileRecord = typeof files.$inferSelect;
export type InsertFileRecord = typeof files.$inferInsert;

// ─── Posts (Writing / Blog) ──────────────────────────────────────────
export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  /** Post title */
  title: varchar("title", { length: 512 }).notNull(),
  /** URL-friendly slug */
  slug: varchar("slug", { length: 512 }).notNull().unique(),
  /** Full body content (Markdown) */
  body: text("body").notNull(),
  /** Short excerpt for cards / previews */
  excerpt: text("excerpt"),
  /** Content pillar category */
  pillar: varchar("pillar", { length: 128 }),
  /** Estimated read time, e.g. "8 min read" */
  readTime: varchar("readTime", { length: 32 }),
  /** Optional cover image URL */
  coverImage: text("coverImage"),
  /** Whether the post is published or still a draft */
  published: boolean("published").default(false).notNull(),
  /** Whether this is the featured post on the homepage */
  featured: boolean("featured").default(false).notNull(),
  /** Content type: pastoral (for pastors) or general (for everyone) */
  contentType: mysqlEnum("contentType", ["pastoral", "general"]).default("general").notNull(),
  /** Audience type: pastors, leaders, or general */
  audience_type: varchar("audience_type", { length: 64 }).default("general").notNull(),
  /** Topic: justice, leadership, spiritual-formation, church-health, personal-growth, pastoral-care */
  topic: mysqlEnum("topic", ["justice", "leadership", "spiritual-formation", "church-health", "personal-growth", "pastoral-care"]),
  /** Format: article, book-chapter, study-guide, sermon-series, devotional, podcast */
  format: mysqlEnum("format", ["article", "book-chapter", "study-guide", "sermon-series", "devotional", "podcast"]).default("article").notNull(),
  /** Audience: pastors, church-leaders, small-groups, individuals, couples */
  audience: mysqlEnum("audience", ["pastors", "church-leaders", "small-groups", "individuals", "couples"]).default("individuals").notNull(),
  /** Difficulty: beginner, intermediate, advanced */
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"]).default("intermediate").notNull(),
  /** Reading time in minutes */
  readingTimeMinutes: int("readingTimeMinutes").default(5).notNull(),
  /** Publish date (can be future-dated) */
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

// ─── Resources ───────────────────────────────────────────────────────
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  /** Resource title */
  title: varchar("title", { length: 512 }).notNull(),
  /** Description of the resource */
  description: text("description"),
  /** Category (e.g. "Study Guides", "Sermon Series", "Discussion Guides") */
  category: varchar("category", { length: 128 }),
  /** Download/access URL (S3 or external) */
  url: text("url"),
  /** File type label (e.g. "PDF", "Video", "Audio") */
  fileType: varchar("fileType", { length: 64 }),
  /** Whether the resource is visible on the public site */
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

// ─── Books ───────────────────────────────────────────────────────────
export const books = mysqlTable("books", {
  id: int("id").autoincrement().primaryKey(),
  /** Book title */
  title: varchar("title", { length: 512 }).notNull(),
  /** URL-friendly slug */
  slug: varchar("slug", { length: 512 }).unique(),
  /** Author name */
  author: varchar("author", { length: 256 }),
  /** Book description / summary */
  description: text("description"),
  /** Cover image URL */
  coverImage: text("coverImage"),
  /** Purchase / Amazon link */
  purchaseUrl: text("purchaseUrl"),
  /** Sample chapter or excerpt for preview */
  sampleExcerpt: text("sampleExcerpt"),
  /** "authored" = James's own books, "recommended" = reading list */
  bookType: mysqlEnum("bookType", ["authored", "recommended"]).default("recommended").notNull(),
  /** Display order (lower = first) */
  sortOrder: int("sortOrder").default(0).notNull(),
  /** Whether the book is visible on the public site */
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Book = typeof books.$inferSelect;
export type InsertBook = typeof books.$inferInsert;

// ─── Site Settings (key-value store) ─────────────────────────────────
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  /** Setting key (unique identifier) */
  settingKey: varchar("settingKey", { length: 128 }).notNull().unique(),
  /** Setting value (JSON or plain text) */
  settingValue: text("settingValue"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

// ─── Subscribers ────────────────────────────────────────────────────────
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  active: boolean("active").default(true).notNull(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

// ─── Notifications ──────────────────────────────────────────────────────
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  type: varchar("type", { length: 64 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  message: text("message").notNull(),
  relatedId: int("relatedId"),
  relatedType: varchar("relatedType", { length: 64 }),
  showAsBanner: boolean("showAsBanner").default(false).notNull(),
  active: boolean("active").default(true).notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// ─── Admin Notifications ────────────────────────────────────────────────
export const adminNotifications = mysqlTable("admin_notifications", {
  id: int("id").autoincrement().primaryKey(),
  type: varchar("type", { length: 64 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  relatedId: int("relatedId"),
  relatedType: varchar("relatedType", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminNotification = typeof adminNotifications.$inferSelect;
export type InsertAdminNotification = typeof adminNotifications.$inferInsert;

// ─── Book Purchases (Stripe Integration) ────────────────────────────────
export const bookPurchases = mysqlTable("book_purchases", {
  id: int("id").autoincrement().primaryKey(),
  bookId: int("bookId").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 256 }).notNull().unique(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerName: varchar("customerName", { length: 256 }),
  amountCents: int("amountCents").notNull(),
  status: mysqlEnum("status", ["pending", "succeeded", "failed"]).default("pending").notNull(),
  sessionId: varchar("sessionId", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BookPurchase = typeof bookPurchases.$inferSelect;
export type InsertBookPurchase = typeof bookPurchases.$inferInsert;

// ─── Email Campaigns ────────────────────────────────────────────────────
export const emailCampaigns = mysqlTable("email_campaigns", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  type: mysqlEnum("type", ["welcome", "digest", "manual", "article_notification"]).notNull(),
  subject: varchar("subject", { length: 512 }).notNull(),
  htmlBody: text("htmlBody").notNull(),
  status: mysqlEnum("status", ["draft", "scheduled", "sent", "failed"]).default("draft").notNull(),
  sentCount: int("sentCount").default(0).notNull(),
  scheduledAt: timestamp("scheduledAt"),
  sentAt: timestamp("sentAt"),
  relatedArticleId: int("relatedArticleId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type InsertEmailCampaign = typeof emailCampaigns.$inferInsert;


// ─── Comments ────────────────────────────────────────────────────────
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  authorName: varchar("authorName", { length: 256 }).notNull(),
  authorEmail: varchar("authorEmail", { length: 320 }).notNull(),
  content: text("content").notNull(),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

// ─── Testimonials ────────────────────────────────────────────────────
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  authorName: varchar("authorName", { length: 256 }).notNull(),
  authorRole: varchar("authorRole", { length: 256 }),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  approved: boolean("approved").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// ─── Reading Paths (Curated Collections) ────────────────────────────────
export const readingPaths = mysqlTable("reading_paths", {
  id: int("id").autoincrement().primaryKey(),
  /** Path title (e.g., "New to Ministry") */
  title: varchar("title", { length: 256 }).notNull(),
  /** URL-friendly slug */
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  /** Description of the reading path */
  description: text("description"),
  /** Icon or emoji for visual identification */
  icon: varchar("icon", { length: 64 }),
  /** Target persona (e.g., "pastor", "leader", "couple") */
  persona: varchar("persona", { length: 128 }),
  /** Display order (lower = first) */
  sortOrder: int("sortOrder").default(0).notNull(),
  /** Whether the path is visible on the public site */
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ReadingPath = typeof readingPaths.$inferSelect;
export type InsertReadingPath = typeof readingPaths.$inferInsert;

// ─── Reading Path Articles (Join Table) ─────────────────────────────────
export const readingPathArticles = mysqlTable("reading_path_articles", {
  id: int("id").autoincrement().primaryKey(),
  pathId: int("pathId").notNull(),
  postId: int("postId").notNull(),
  /** Order within the path (1, 2, 3, etc.) */
  orderInPath: int("orderInPath").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReadingPathArticle = typeof readingPathArticles.$inferSelect;
export type InsertReadingPathArticle = typeof readingPathArticles.$inferInsert;

// ─── Featured Articles (Editor's Picks) ─────────────────────────────────
export const featuredArticles = mysqlTable("featured_articles", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull().unique(),
  /** Curator's note explaining why this article is featured */
  curatorNote: text("curatorNote"),
  /** Display order (lower = first) */
  sortOrder: int("sortOrder").default(0).notNull(),
  /** Whether this is currently featured */
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FeaturedArticle = typeof featuredArticles.$inferSelect;
export type InsertFeaturedArticle = typeof featuredArticles.$inferInsert;

// ─── Related Articles (Article Relationships) ────────────────────────────
export const relatedArticles = mysqlTable("related_articles", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  relatedPostId: int("relatedPostId").notNull(),
  /** Relationship strength (1-5, for sorting) */
  relevanceScore: int("relevanceScore").default(3).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RelatedArticle = typeof relatedArticles.$inferSelect;
export type InsertRelatedArticle = typeof relatedArticles.$inferInsert;

// ─── Author Profiles ────────────────────────────────────────────────────
export const authorProfiles = mysqlTable("author_profiles", {
  id: int("id").autoincrement().primaryKey(),
  /** Author name (unique identifier) */
  name: varchar("name", { length: 256 }).notNull().unique(),
  /** Author bio/description */
  bio: text("bio"),
  /** Author photo URL */
  photoUrl: text("photoUrl"),
  /** Author website or social link */
  website: varchar("website", { length: 512 }),
  /** Twitter handle */
  twitter: varchar("twitter", { length: 128 }),
  /** Instagram handle */
  instagram: varchar("instagram", { length: 128 }),
  /** Whether this author profile is published */
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AuthorProfile = typeof authorProfiles.$inferSelect;
export type InsertAuthorProfile = typeof authorProfiles.$inferInsert;

// ─── Book Bundles (Themed Collections) ──────────────────────────────────
export const bookBundles = mysqlTable("book_bundles", {
  id: int("id").autoincrement().primaryKey(),
  /** Bundle title (e.g., "Leadership Essentials") */
  title: varchar("title", { length: 256 }).notNull(),
  /** URL-friendly slug */
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  /** Bundle description */
  description: text("description"),
  /** Bundle cover image */
  coverImage: text("coverImage"),
  /** Discount percentage (0-100) */
  discountPercent: int("discountPercent").default(0).notNull(),
  /** Display order */
  sortOrder: int("sortOrder").default(0).notNull(),
  /** Whether the bundle is published */
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BookBundle = typeof bookBundles.$inferSelect;
export type InsertBookBundle = typeof bookBundles.$inferInsert;

// ─── Book Bundle Items (Join Table) ─────────────────────────────────────
export const bundleBooks = mysqlTable("bundle_books", {
  id: int("id").autoincrement().primaryKey(),
  bundleId: int("bundleId").notNull(),
  bookId: int("bookId").notNull(),
  /** Order within the bundle */
  orderInBundle: int("orderInBundle").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BundleBook = typeof bundleBooks.$inferSelect;
export type InsertBundleBook = typeof bundleBooks.$inferInsert;
