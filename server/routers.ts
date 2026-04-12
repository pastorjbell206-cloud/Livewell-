import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { storagePut } from "./storage";
import { syncAllFeeds } from "./rss-service";
import { stripeRouter } from "./stripe-router";
import { syndicationRouter } from "./syndication-router";
import { searchRouter } from "./search-router";
import { communityRouter } from "./community-router";
import { feedSyncRouter } from "./feed-sync-router";
import { sitemapRouter } from "./sitemap-router";
import { relatedArticlesRouter } from "./related-articles-router";
import { quizRouter } from "./quiz-router";
import { leadMagnetsRouter } from "./routers/lead-magnets";
import { recommendationRouter } from "./recommendation-router";
import { analyticsRouter } from "./analytics-router";
import { emailRouter } from "./email-router";
import {
  // Files
  createFileRecord, listUserFiles, getFileById, deleteFileRecord, updateFileDescription,
  // Posts
  createPost, listPosts, getPostById, getPostBySlug, getFeaturedPost, updatePost, deletePost,
  // Resources
  createResource, listResources, getResourceById, updateResource, deleteResource,
  // Books
  createBook, listBooks, getBookById, updateBook, deleteBook,
  // Settings
  getSetting, setSetting, getAllSettings,
  // Subscribers & Notifications
  addSubscriber, listSubscribers, removeSubscriber,
  createNotification, listNotifications, getBannerNotifications,
  createAdminNotification, listAdminNotifications, markAdminNotificationAsRead,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  stripe: stripeRouter,
  email: emailRouter,
  syndication: syndicationRouter,
  search: searchRouter,
  community: communityRouter,
  feedSync: feedSyncRouter,
  sitemap: sitemapRouter,
  relatedArticles: relatedArticlesRouter,
  quiz: quizRouter,
  leadMagnets: leadMagnetsRouter,
  recommendations: recommendationRouter,
  analytics: analyticsRouter,

  // ─── Auth ────────────────────────────────────────────────────────
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Files ───────────────────────────────────────────────────────
  files: router({
    list: protectedProcedure.query(async ({ ctx }) => listUserFiles(ctx.user.id)),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const file = await getFileById(input.id, ctx.user.id);
        if (!file) throw new Error("File not found");
        return file;
      }),

    upload: protectedProcedure
      .input(z.object({
        filename: z.string().min(1).max(512),
        mimeType: z.string().min(1).max(128),
        base64Data: z.string(),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const buffer = Buffer.from(input.base64Data, "base64");
        if (buffer.length > 16 * 1024 * 1024) throw new Error("File size exceeds 16MB limit");
        const suffix = nanoid(12);
        const safeFilename = input.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
        const fileKey = `user-${ctx.user.id}/files/${safeFilename}-${suffix}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        return createFileRecord({
          userId: ctx.user.id, filename: input.filename, fileKey, url,
          mimeType: input.mimeType, size: buffer.length, description: input.description ?? null,
        });
      }),

    updateDescription: protectedProcedure
      .input(z.object({ id: z.number(), description: z.string() }))
      .mutation(async ({ ctx, input }) => updateFileDescription(input.id, ctx.user.id, input.description)),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteFileRecord(input.id, ctx.user.id);
        return { success: true };
      }),
  }),

  // ─── Posts (Writing) ─────────────────────────────────────────────
  posts: router({
    /** Public: list published posts */
    listPublished: publicProcedure.query(async () => listPosts(true)),

    /** Public: get a single post by slug */
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await getPostBySlug(input.slug);
        if (!post || !post.published) return null;
        return post;
      }),

    /** Public: get featured post */
    getFeatured: publicProcedure.query(async () => getFeaturedPost()),

    /** Admin: list all posts (including drafts) */
    listAll: adminProcedure.query(async () => listPosts(false)),

    /** Admin: get post by ID */
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => getPostById(input.id)),

    /** Admin: create a post */
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        body: z.string().min(1),
        excerpt: z.string().optional(),
        pillar: z.string().optional(),
        readTime: z.string().optional(),
        featured: z.boolean().optional(),
        published: z.boolean().optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        return createPost({
          ...input,
          excerpt: input.excerpt ?? null,
          pillar: input.pillar ?? null,
          readTime: input.readTime ?? null,
          featured: input.featured ?? false,
          published: input.published ?? false,
          publishedAt: input.publishedAt ?? new Date(),
        });
      }),

    /** Admin: update a post */
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        body: z.string().optional(),
        excerpt: z.string().optional(),
        pillar: z.string().optional(),
        readTime: z.string().optional(),
        featured: z.boolean().optional(),
        published: z.boolean().optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updatePost(id, data);
      }),

    /** Admin: delete a post */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deletePost(input.id);
        return { success: true };
      }),
  }),

  // ─── Resources ───────────────────────────────────────────────────
  resources: router({
    /** Public: list published resources */
    listPublished: publicProcedure.query(async () => listResources(true)),

    /** Admin: list all resources */
    listAll: adminProcedure.query(async () => listResources(false)),

    /** Admin: get resource by ID */
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => getResourceById(input.id)),

    /** Admin: create a resource */
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        category: z.string().optional(),
        url: z.string().optional(),
        fileType: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        return createResource({
          ...input,
          description: input.description ?? null,
          category: input.category ?? null,
          url: input.url ?? null,
          fileType: input.fileType ?? null,
          published: input.published ?? false,
        });
      }),

    /** Admin: update a resource */
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        url: z.string().optional(),
        fileType: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateResource(id, data);
      }),

    /** Admin: delete a resource */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteResource(input.id);
        return { success: true };
      }),
  }),

  // ─── Books ───────────────────────────────────────────────────────
  books: router({
    /** Public: list published books */
    listPublished: publicProcedure.query(async () => listBooks(true)),

    /** Admin: list all books */
    listAll: adminProcedure.query(async () => listBooks(false)),

    /** Admin: get book by ID */
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => getBookById(input.id)),

    /** Admin: create a book */
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        author: z.string().optional(),
        description: z.string().optional(),
        coverImage: z.string().optional(),
        purchaseUrl: z.string().optional(),
        bookType: z.enum(["authored", "recommended"]).optional(),
        sortOrder: z.number().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        return createBook({
          ...input,
          author: input.author ?? null,
          description: input.description ?? null,
          coverImage: input.coverImage ?? null,
          purchaseUrl: input.purchaseUrl ?? null,
          bookType: input.bookType ?? "recommended",
          sortOrder: input.sortOrder ?? 0,
          published: input.published ?? false,
        });
      }),

    /** Admin: update a book */
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        author: z.string().optional(),
        description: z.string().optional(),
        coverImage: z.string().optional(),
        purchaseUrl: z.string().optional(),
        bookType: z.enum(["authored", "recommended"]).optional(),
        sortOrder: z.number().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateBook(id, data);
      }),

    /** Admin: delete a book */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteBook(input.id);
        return { success: true };
      }),
  }),

  // ─── Site Settings ───────────────────────────────────────────────
  settings: router({
    /** Public: get all settings (for rendering public pages) */
    getAll: publicProcedure.query(async () => getAllSettings()),

    /** Public: get a single setting */
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => getSetting(input.key)),

    /** Admin: update a setting */
    set: adminProcedure
      .input(z.object({ key: z.string(), value: z.string() }))
      .mutation(async ({ input }) => {
        await setSetting(input.key, input.value);
        return { success: true };
      }),

    /** Admin: update multiple settings at once */
    setMultiple: adminProcedure
      .input(z.object({ settings: z.record(z.string(), z.string()) }))
      .mutation(async ({ input }) => {
        for (const [key, value] of Object.entries(input.settings)) {
          await setSetting(key, value);
        }
        return { success: true };
      }),
  }),

  // ─── Content Sync ────────────────────────────────────────────────
  sync: router({
    /** Admin: Sync all RSS feeds (Substack, external blogs, etc.) */
    feeds: adminProcedure
      .mutation(async () => {
        try {
          const imported = await syncAllFeeds();
          return { success: true, imported };
        } catch (error) {
          console.error("[Sync] Error syncing feeds:", error);
          throw new Error("Failed to sync feeds");
        }
      }),
  }),

  // ─── Subscribers ─────────────────────────────────────────────────
  subscribers: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await addSubscriber(input.email);
        return { success: true };
      }),

    list: adminProcedure.query(async () => listSubscribers(true)),

    remove: adminProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await removeSubscriber(input.email);
        return { success: true };
      }),
  }),

  // ─── Notifications ───────────────────────────────────────────────
  notifications: router({
    getBanners: publicProcedure.query(async () => getBannerNotifications()),

    list: publicProcedure.query(async () => listNotifications(true)),

    create: adminProcedure
      .input(z.object({
        type: z.string(),
        title: z.string(),
        message: z.string(),
        showAsBanner: z.boolean().optional(),
        relatedId: z.number().optional(),
        relatedType: z.string().optional(),
        expiresAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        return createNotification({
          ...input,
          active: true,
          showAsBanner: input.showAsBanner ?? false,
        });
      }),

    listAll: adminProcedure.query(async () => listNotifications(false)),
  }),

  // ─── Admin Notifications ─────────────────────────────────────────
  adminNotifications: router({
    list: adminProcedure.query(async () => listAdminNotifications(false)),

    unread: adminProcedure.query(async () => listAdminNotifications(true)),

    markAsRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await markAdminNotificationAsRead(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
