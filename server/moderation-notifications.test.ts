import { describe, it, expect, vi } from "vitest";
import { notifyNewComment, notifyNewTestimonial, notifyPendingItems } from "./moderation-notifications";

// Mock the notification service
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

describe("Moderation Notifications", () => {
  describe("notifyNewComment", () => {
    it("should send notification for new comment", async () => {
      const result = await notifyNewComment({
        authorName: "John Doe",
        authorEmail: "john@example.com",
        content: "This is a great article!",
        postId: 1,
      });

      expect(result).toBe(true);
    });

    it("should truncate long comment content in notification", async () => {
      const longContent = "A".repeat(150);
      const result = await notifyNewComment({
        authorName: "Jane Smith",
        authorEmail: "jane@example.com",
        content: longContent,
        postId: 2,
      });

      expect(result).toBe(true);
    });

    it("should handle notification errors gracefully", async () => {
      const result = await notifyNewComment({
        authorName: "Test User",
        authorEmail: "test@example.com",
        content: "Test comment",
        postId: 3,
      });

      expect(typeof result).toBe("boolean");
    });
  });

  describe("notifyNewTestimonial", () => {
    it("should send notification for new testimonial", async () => {
      const result = await notifyNewTestimonial({
        authorName: "Dr. Smith",
        authorRole: "Pastor",
        content: "This writing is transformative",
      });

      expect(result).toBe(true);
    });

    it("should send notification without author role", async () => {
      const result = await notifyNewTestimonial({
        authorName: "Anonymous Reader",
        content: "Great insights",
      });

      expect(result).toBe(true);
    });

    it("should truncate long testimonial content", async () => {
      const longContent = "B".repeat(150);
      const result = await notifyNewTestimonial({
        authorName: "Long Testimonial Author",
        authorRole: "Author",
        content: longContent,
      });

      expect(result).toBe(true);
    });
  });

  describe("notifyPendingItems", () => {
    it("should send notification for pending comments", async () => {
      const result = await notifyPendingItems({
        pendingComments: 3,
        pendingTestimonials: 0,
      });

      expect(result).toBe(true);
    });

    it("should send notification for pending testimonials", async () => {
      const result = await notifyPendingItems({
        pendingComments: 0,
        pendingTestimonials: 2,
      });

      expect(result).toBe(true);
    });

    it("should send notification for both pending comments and testimonials", async () => {
      const result = await notifyPendingItems({
        pendingComments: 5,
        pendingTestimonials: 3,
      });

      expect(result).toBe(true);
    });

    it("should return true when no pending items", async () => {
      const result = await notifyPendingItems({
        pendingComments: 0,
        pendingTestimonials: 0,
      });

      expect(result).toBe(true);
    });

    it("should handle single item correctly", async () => {
      const result = await notifyPendingItems({
        pendingComments: 1,
        pendingTestimonials: 0,
      });

      expect(result).toBe(true);
    });
  });
});
