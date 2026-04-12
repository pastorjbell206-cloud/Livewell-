import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
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
import { notifyNewComment, notifyNewTestimonial } from "./moderation-notifications";

export const communityRouter = router({
  // ─── Comments ────────────────────────────────────────────────────

  /**
   * Submit a new comment on an article
   */
  comments: router({
    submit: publicProcedure
      .input(
        z.object({
          postId: z.number(),
          authorName: z.string().min(1).max(256),
          authorEmail: z.string().email(),
          content: z.string().min(1).max(5000),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const comment = await createComment({
            postId: input.postId,
            authorName: input.authorName,
            authorEmail: input.authorEmail,
            content: input.content,
            approved: false,
          });

          // Send notification to owner
          await notifyNewComment({
            authorName: input.authorName,
            authorEmail: input.authorEmail,
            content: input.content,
            postId: input.postId,
          });

          return {
            success: true,
            message: "Comment submitted for moderation",
            comment,
          };
        } catch (error: any) {
          console.error("[Community Router] Error submitting comment:", error);
          throw new Error(error.message || "Failed to submit comment");
        }
      }),

    /**
     * Get approved comments for a post
     */
    getByPost: publicProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ input }) => {
        try {
          const comments = await listCommentsByPost(input.postId, true);
          return {
            success: true,
            comments,
            count: comments.length,
          };
        } catch (error: any) {
          console.error("[Community Router] Error getting comments:", error);
          throw new Error(error.message || "Failed to get comments");
        }
      }),

    /**
     * Admin: List all comments (pending and approved)
     */
    listAll: protectedProcedure.query(async ({ ctx }) => {
      try {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const allComments = await listAllComments();
        const pending = allComments.filter((c) => !c.approved);
        const approved = allComments.filter((c) => c.approved);

        return {
          success: true,
          pending,
          approved,
          total: allComments.length,
        };
      } catch (error: any) {
        console.error("[Community Router] Error listing all comments:", error);
        throw new Error(error.message || "Failed to list comments");
      }
    }),

    /**
     * Admin: Approve a comment
     */
    approve: protectedProcedure
      .input(z.object({ commentId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
          const comment = await approveComment(input.commentId);

          return {
            success: true,
            message: "Comment approved",
            comment,
          };
        } catch (error: any) {
          console.error("[Community Router] Error approving comment:", error);
          throw new Error(error.message || "Failed to approve comment");
        }
      }),

    /**
     * Admin: Delete a comment
     */
    delete: protectedProcedure
      .input(z.object({ commentId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
          await deleteComment(input.commentId);

          return {
            success: true,
            message: "Comment deleted",
          };
        } catch (error: any) {
          console.error("[Community Router] Error deleting comment:", error);
          throw new Error(error.message || "Failed to delete comment");
        }
      }),
  }),

  // ─── Testimonials ────────────────────────────────────────────────

  /**
   * Submit a new testimonial
   */
  testimonials: router({
    submit: publicProcedure
      .input(
        z.object({
          authorName: z.string().min(1).max(256),
          authorRole: z.string().max(256).optional(),
          content: z.string().min(1).max(5000),
          imageUrl: z.string().url().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const testimonial = await createTestimonial({
            authorName: input.authorName,
            authorRole: input.authorRole,
            content: input.content,
            imageUrl: input.imageUrl,
            approved: false,
            featured: false,
          });

          // Send notification to owner
          await notifyNewTestimonial({
            authorName: input.authorName,
            authorRole: input.authorRole,
            content: input.content,
          });

          return {
            success: true,
            message: "Testimonial submitted for moderation",
            testimonial,
          };
        } catch (error: any) {
          console.error("[Community Router] Error submitting testimonial:", error);
          throw new Error(error.message || "Failed to submit testimonial");
        }
      }),

    /**
     * Get approved testimonials
     */
    getApproved: publicProcedure.query(async () => {
      try {
        const testimonials = await listTestimonials(true);
        return {
          success: true,
          testimonials,
          count: testimonials.length,
        };
      } catch (error: any) {
        console.error("[Community Router] Error getting testimonials:", error);
        throw new Error(error.message || "Failed to get testimonials");
      }
    }),

    /**
     * Get featured testimonials for homepage
     */
    getFeatured: publicProcedure.query(async () => {
      try {
        const testimonials = await listFeaturedTestimonials();
        return {
          success: true,
          testimonials,
          count: testimonials.length,
        };
      } catch (error: any) {
        console.error("[Community Router] Error getting featured testimonials:", error);
        throw new Error(error.message || "Failed to get featured testimonials");
      }
    }),

    /**
     * Admin: List all testimonials
     */
    listAll: protectedProcedure.query(async ({ ctx }) => {
      try {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const allTestimonials = await listTestimonials(false);
        const pending = allTestimonials.filter((t) => !t.approved);
        const approved = allTestimonials.filter((t) => t.approved);

        return {
          success: true,
          pending,
          approved,
          total: allTestimonials.length,
        };
      } catch (error: any) {
        console.error("[Community Router] Error listing all testimonials:", error);
        throw new Error(error.message || "Failed to list testimonials");
      }
    }),

    /**
     * Admin: Approve a testimonial
     */
    approve: protectedProcedure
      .input(z.object({ testimonialId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
          const testimonial = await approveTestimonial(input.testimonialId);

          return {
            success: true,
            message: "Testimonial approved",
            testimonial,
          };
        } catch (error: any) {
          console.error("[Community Router] Error approving testimonial:", error);
          throw new Error(error.message || "Failed to approve testimonial");
        }
      }),

    /**
     * Admin: Toggle featured status
     */
    toggleFeatured: protectedProcedure
      .input(z.object({ testimonialId: z.number(), featured: z.boolean() }))
      .mutation(async ({ input, ctx }) => {
        try {
          if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
          const testimonial = await toggleFeaturedTestimonial(input.testimonialId, input.featured);

          return {
            success: true,
            message: input.featured ? "Testimonial featured" : "Testimonial unfeatured",
            testimonial,
          };
        } catch (error: any) {
          console.error("[Community Router] Error toggling featured testimonial:", error);
          throw new Error(error.message || "Failed to toggle featured testimonial");
        }
      }),

    /**
     * Admin: Delete a testimonial
     */
    delete: protectedProcedure
      .input(z.object({ testimonialId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        try {
          if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
          await deleteTestimonial(input.testimonialId);

          return {
            success: true,
            message: "Testimonial deleted",
          };
        } catch (error: any) {
          console.error("[Community Router] Error deleting testimonial:", error);
          throw new Error(error.message || "Failed to delete testimonial");
        }
      }),
  }),
});
