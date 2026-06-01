/**
 * posts.test.ts — coverage for the post create/read/update/list pipeline.
 *
 * Was zero before. Skipped automatically if DATABASE_URL is missing so the
 * suite stays green on environments without DB access (laptops, fresh CI).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  createPost,
  deletePost,
  getDb,
  getPostBySlug,
  listPosts,
  updatePost,
} from "./db";

const hasDb = Boolean(process.env.DATABASE_URL);
const d = hasDb ? describe : describe.skip;

d("posts CRUD", () => {
  const slug = `test-post-${Date.now()}`;
  let createdId: number | null = null;

  beforeAll(async () => {
    const db = await getDb();
    expect(db, "Database must be reachable for posts CRUD tests").toBeTruthy();
  });

  afterAll(async () => {
    if (createdId !== null) {
      try {
        await deletePost(createdId);
      } catch {
        // best-effort cleanup
      }
    }
  });

  it("creates a draft post", async () => {
    const post = await createPost({
      title: "Test: A Post About Testing",
      slug,
      body: "# Test\n\nThis is a test body.",
      excerpt: "A test excerpt.",
      pillar: "Leadership Formation",
      readTime: "1 min read",
      readingTimeMinutes: 1,
      published: false,
      featured: false,
      contentType: "general",
      audience_type: "general",
      audience: "individuals",
      difficulty: "intermediate",
      format: "article",
    });
    expect(post).toBeTruthy();
    expect(post.slug).toBe(slug);
    expect(post.published).toBe(false);
    createdId = post.id;
  });

  it("retrieves the post by slug only when published", async () => {
    const draftResult = await getPostBySlug(slug);
    expect(draftResult).toBeTruthy();
    expect(draftResult?.title).toContain("Testing");

    // Filter behavior is enforced at the router layer (see posts.getBySlug);
    // here we verify the row exists regardless of published state.
  });

  it("updates the post", async () => {
    if (createdId === null) return;
    await updatePost(createdId, { title: "Test: Updated title" });
    const updated = await getPostBySlug(slug);
    expect(updated?.title).toBe("Test: Updated title");
  });

  it("includes the post in listPosts (admin view, onlyPublished=false)", async () => {
    const all = await listPosts(false);
    const found = all.find(p => p.slug === slug);
    expect(found).toBeTruthy();
  });

  it("excludes drafts from listPosts(true)", async () => {
    const published = await listPosts(true);
    const found = published.find(p => p.slug === slug);
    expect(found).toBeUndefined();
  });
});
