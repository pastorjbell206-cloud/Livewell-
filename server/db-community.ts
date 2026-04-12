import { getDb } from "./db";
import { comments, testimonials, Comment, InsertComment, Testimonial, InsertTestimonial } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

// ─── Comments ────────────────────────────────────────────────────────

export async function createComment(data: InsertComment): Promise<Comment> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    await db.insert(comments).values(data);
    const result = await db.select().from(comments).where(eq(comments.authorEmail, data.authorEmail)).orderBy((c) => c.id).limit(1);
    return result[0];
  } catch (error: any) {
    console.error("[DB] Error creating comment:", error);
    throw new Error(error.message || "Failed to create comment");
  }
}

export async function listCommentsByPost(postId: number, onlyApproved = true): Promise<Comment[]> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const query = onlyApproved
      ? db.select().from(comments).where(and(eq(comments.postId, postId), eq(comments.approved, true)))
      : db.select().from(comments).where(eq(comments.postId, postId));

    return await query;
  } catch (error: any) {
    console.error("[DB] Error listing comments:", error);
    throw new Error(error.message || "Failed to list comments");
  }
}

export async function listAllComments(onlyUnapproved = false): Promise<Comment[]> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const query = onlyUnapproved
      ? db.select().from(comments).where(eq(comments.approved, false))
      : db.select().from(comments);

    return await query;
  } catch (error: any) {
    console.error("[DB] Error listing all comments:", error);
    throw new Error(error.message || "Failed to list comments");
  }
}

export async function approveComment(commentId: number): Promise<Comment> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    await db
      .update(comments)
      .set({ approved: true })
      .where(eq(comments.id, commentId));

    const result = await db.select().from(comments).where(eq(comments.id, commentId));
    return result[0];
  } catch (error: any) {
    console.error("[DB] Error approving comment:", error);
    throw new Error(error.message || "Failed to approve comment");
  }
}

export async function deleteComment(commentId: number): Promise<void> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    await db.delete(comments).where(eq(comments.id, commentId));
  } catch (error: any) {
    console.error("[DB] Error deleting comment:", error);
    throw new Error(error.message || "Failed to delete comment");
  }
}

// ─── Testimonials ────────────────────────────────────────────────────

export async function createTestimonial(data: InsertTestimonial): Promise<Testimonial> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    await db.insert(testimonials).values(data);
    const result = await db.select().from(testimonials).where(eq(testimonials.authorName, data.authorName)).orderBy((t) => t.id).limit(1);
    return result[0];
  } catch (error: any) {
    console.error("[DB] Error creating testimonial:", error);
    throw new Error(error.message || "Failed to create testimonial");
  }
}

export async function listTestimonials(onlyApproved = true): Promise<Testimonial[]> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const query = onlyApproved
      ? db.select().from(testimonials).where(eq(testimonials.approved, true))
      : db.select().from(testimonials);

    return await query;
  } catch (error: any) {
    console.error("[DB] Error listing testimonials:", error);
    throw new Error(error.message || "Failed to list testimonials");
  }
}

export async function listFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    return await db
      .select()
      .from(testimonials)
      .where(and(eq(testimonials.approved, true), eq(testimonials.featured, true)));
  } catch (error: any) {
    console.error("[DB] Error listing featured testimonials:", error);
    throw new Error(error.message || "Failed to list featured testimonials");
  }
}

export async function approveTestimonial(testimonialId: number): Promise<Testimonial> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    await db
      .update(testimonials)
      .set({ approved: true })
      .where(eq(testimonials.id, testimonialId));

    const result = await db.select().from(testimonials).where(eq(testimonials.id, testimonialId));
    return result[0];
  } catch (error: any) {
    console.error("[DB] Error approving testimonial:", error);
    throw new Error(error.message || "Failed to approve testimonial");
  }
}

export async function toggleFeaturedTestimonial(testimonialId: number, featured: boolean): Promise<Testimonial> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    await db
      .update(testimonials)
      .set({ featured })
      .where(eq(testimonials.id, testimonialId));

    const result = await db.select().from(testimonials).where(eq(testimonials.id, testimonialId));
    return result[0];
  } catch (error: any) {
    console.error("[DB] Error toggling featured testimonial:", error);
    throw new Error(error.message || "Failed to toggle featured testimonial");
  }
}

export async function deleteTestimonial(testimonialId: number): Promise<void> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    await db.delete(testimonials).where(eq(testimonials.id, testimonialId));
  } catch (error: any) {
    console.error("[DB] Error deleting testimonial:", error);
    throw new Error(error.message || "Failed to delete testimonial");
  }
}
