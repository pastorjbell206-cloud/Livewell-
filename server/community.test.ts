import { describe, it, expect } from "vitest";
import {
  createComment,
  listCommentsByPost,
  listAllComments,
  approveComment,
  deleteComment,
  createTestimonial,
  listTestimonials,
  listFeaturedTestimonials,
  approveTestimonial,
  toggleFeaturedTestimonial,
  deleteTestimonial,
} from "./db-community";

describe("Community Features - Comments & Testimonials", () => {
  describe("Comments", () => {
    it("should create a new comment with correct properties", async () => {
      const comment = await createComment({
        postId: 1,
        authorName: "John Doe",
        authorEmail: "john@example.com",
        content: "Great article!",
        approved: false,
      });

      expect(comment).toBeDefined();
      expect(comment.authorName).toBe("John Doe");
      expect(comment.authorEmail).toBe("john@example.com");
      expect(comment.content).toBe("Great article!");
      expect(comment.approved).toBe(false);
    });

    it("should list approved comments for a post", async () => {
      const comments = await listCommentsByPost(1, true);
      expect(Array.isArray(comments)).toBe(true);
      expect(comments.every((c) => c.approved === true)).toBe(true);
    });

    it("should list all comments", async () => {
      const allComments = await listAllComments();
      expect(Array.isArray(allComments)).toBe(true);
    });

    it("should approve a comment", async () => {
      const comment = await createComment({
        postId: 2,
        authorName: "Charlie",
        authorEmail: "charlie@example.com",
        content: "Awaiting approval",
        approved: false,
      });

      const approved = await approveComment(comment.id);
      expect(approved.approved).toBe(true);
    });

    it("should delete a comment", async () => {
      const comment = await createComment({
        postId: 3,
        authorName: "Diana",
        authorEmail: "diana@example.com",
        content: "To be deleted",
        approved: false,
      });

      const commentId = comment.id;
      await deleteComment(commentId);
      
      const allComments = await listAllComments();
      const deleted = allComments.find((c) => c.id === commentId);
      expect(deleted).toBeUndefined();
    });
  });

  describe("Testimonials", () => {
    it("should create a new testimonial with correct properties", async () => {
      const testimonial = await createTestimonial({
        authorName: "Jane Smith",
        authorRole: "Pastor",
        content: "This writing changed my perspective",
        imageUrl: "https://example.com/jane.jpg",
        approved: false,
        featured: false,
      });

      expect(testimonial).toBeDefined();
      expect(testimonial.authorName).toBe("Jane Smith");
      expect(testimonial.authorRole).toBe("Pastor");
      expect(testimonial.approved).toBe(false);
      expect(testimonial.featured).toBe(false);
    });

    it("should list approved testimonials", async () => {
      const testimonials = await listTestimonials(true);
      expect(Array.isArray(testimonials)).toBe(true);
      expect(testimonials.every((t) => t.approved === true)).toBe(true);
    });

    it("should list featured testimonials", async () => {
      const featured = await listFeaturedTestimonials();
      expect(Array.isArray(featured)).toBe(true);
      expect(featured.every((t) => t.featured === true)).toBe(true);
    });

    it("should approve a testimonial", async () => {
      const testimonial = await createTestimonial({
        authorName: "Robert Brown",
        authorRole: "Theologian",
        content: "Profound theological insights",
        approved: false,
        featured: false,
      });

      const approved = await approveTestimonial(testimonial.id);
      expect(approved.approved).toBe(true);
    });

    it("should toggle featured status on testimonial", async () => {
      const testimonial = await createTestimonial({
        authorName: "Lisa Anderson",
        authorRole: "Counselor",
        content: "Transformative content",
        approved: true,
        featured: false,
      });

      const featured = await toggleFeaturedTestimonial(testimonial.id, true);
      expect(featured.featured).toBe(true);

      const unfeatured = await toggleFeaturedTestimonial(testimonial.id, false);
      expect(unfeatured.featured).toBe(false);
    });

    it("should delete a testimonial", async () => {
      const testimonial = await createTestimonial({
        authorName: "Michael Davis",
        authorRole: "Consultant",
        content: "To be deleted",
        approved: true,
        featured: false,
      });

      const testimonialId = testimonial.id;
      await deleteTestimonial(testimonialId);
      
      const testimonials = await listTestimonials(false);
      const deleted = testimonials.find((t) => t.id === testimonialId);
      expect(deleted).toBeUndefined();
    });
  });

  describe("Core Functionality", () => {
    it("should handle comment creation and retrieval", async () => {
      const comment = await createComment({
        postId: 10,
        authorName: "Test User",
        authorEmail: "testuser@example.com",
        content: "Test comment content",
        approved: true,
      });

      const comments = await listCommentsByPost(10, true);
      expect(comments.length).toBeGreaterThan(0);
    });

    it("should handle testimonial creation and retrieval", async () => {
      const testimonial = await createTestimonial({
        authorName: "Test Testimonial Author",
        authorRole: "Test Role",
        content: "Test testimonial content",
        approved: true,
        featured: false,
      });

      const testimonials = await listTestimonials(true);
      expect(testimonials.length).toBeGreaterThan(0);
    });
  });
});
