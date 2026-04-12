import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createCheckoutSession, getCheckoutSession, BOOK_PRICES } from "./stripe-service";
import { getBookPurchasesByEmail, getBookSalesStats } from "./db-email-books";

export const stripeRouter = router({
  /**
   * Create a checkout session for book purchase
   */
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        bookId: z.number(),
        customerEmail: z.string().email(),
        customerName: z.string(),
        origin: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { sessionUrl, sessionId } = await createCheckoutSession(
          input.bookId,
          input.customerEmail,
          input.customerName,
          input.origin
        );

        return {
          success: true,
          sessionUrl,
          sessionId,
        };
      } catch (error: any) {
        console.error("[Stripe Router] Checkout error:", error);
        throw new Error(error.message || "Failed to create checkout session");
      }
    }),

  /**
   * Get checkout session details
   */
  getCheckoutSession: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      try {
        const session = await getCheckoutSession(input.sessionId);
        return {
          success: true,
          session: {
            id: session.id,
            status: session.payment_status,
            amount: session.amount_total,
            currency: session.currency,
            customerEmail: session.customer_email,
          },
        };
      } catch (error: any) {
        console.error("[Stripe Router] Session retrieval error:", error);
        throw new Error(error.message || "Failed to retrieve session");
      }
    }),

  /**
   * Get user's purchase history
   */
  getPurchaseHistory: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      try {
        const purchases = await getBookPurchasesByEmail(input.email);
        return {
          success: true,
          purchases: purchases.map((p) => ({
            id: p.id,
            bookId: p.bookId,
            amount: (p.amountCents / 100).toFixed(2),
            status: p.status,
            createdAt: p.createdAt,
          })),
        };
      } catch (error: any) {
        console.error("[Stripe Router] Purchase history error:", error);
        throw new Error(error.message || "Failed to retrieve purchase history");
      }
    }),

  /**
   * Get book pricing (public)
   */
  getBookPrices: publicProcedure.query(() => {
    return {
      success: true,
      prices: BOOK_PRICES,
    };
  }),

  /**
   * Admin: Get sales statistics
   */
  getSalesStats: protectedProcedure.query(async ({ ctx }) => {
    // Check if user is admin
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    try {
      const stats = await getBookSalesStats();
      return {
        success: true,
        stats,
      };
    } catch (error: any) {
      console.error("[Stripe Router] Stats error:", error);
      throw new Error(error.message || "Failed to retrieve sales stats");
    }
  }),
});
