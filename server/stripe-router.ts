import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  createCheckoutSession,
  getCheckoutSession,
  BOOK_PRICES,
  isStripeConfigured,
  createMembershipCheckoutSession,
} from "./stripe-service";
import { getBookPurchasesByEmail, getBookSalesStats } from "./db-email-books";
import { getSetting } from "./db";

export const stripeRouter = router({
  /**
   * Whether membership checkout is live: needs both a real STRIPE_SECRET_KEY
   * in the environment and a stripeMembershipPriceId in Site Settings.
   * The membership page falls back to the waitlist when this is false.
   */
  membershipEnabled: publicProcedure.query(async () => {
    if (!isStripeConfigured()) return { enabled: false, annual: false };
    const priceId = await getSetting("stripeMembershipPriceId");
    const annualPriceId = await getSetting("stripeMembershipPriceIdAnnual");
    // Annual is offered only when its own price is set; otherwise the page
    // shows monthly only, exactly as before.
    return { enabled: !!priceId?.trim(), annual: !!annualPriceId?.trim() };
  }),

  /**
   * Start a membership subscription checkout. Returns the Stripe-hosted
   * checkout URL to redirect the browser to. `plan` selects monthly (default)
   * or annual; annual requires stripeMembershipPriceIdAnnual to be set.
   */
  createMembershipCheckout: publicProcedure
    .input(
      z.object({
        customerEmail: z.string().email(),
        origin: z.string().url(),
        plan: z.enum(["monthly", "annual"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const key =
        input.plan === "annual" ? "stripeMembershipPriceIdAnnual" : "stripeMembershipPriceId";
      const priceId = await getSetting(key);
      if (!priceId?.trim()) throw new Error("Membership is not open yet.");
      const { sessionUrl, sessionId } = await createMembershipCheckoutSession(
        input.customerEmail,
        priceId.trim(),
        input.origin
      );
      return { success: true, sessionUrl, sessionId };
    }),

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
        throw new Error(error.message || "Failed to create checkout session", { cause: error });
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
        throw new Error(error.message || "Failed to retrieve session", { cause: error });
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
        throw new Error(error.message || "Failed to retrieve purchase history", { cause: error });
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
      throw new Error(error.message || "Failed to retrieve sales stats", { cause: error });
    }
  }),
});
