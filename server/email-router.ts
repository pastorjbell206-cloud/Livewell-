import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { addSubscriber, removeSubscriber } from "./db";

export const emailRouter = router({
  /**
   * Subscribe to email list
   */
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        // Add subscriber to database
        await addSubscriber(input.email);

        return {
          success: true,
          message: "Successfully subscribed! Check your email for confirmation.",
        };
      } catch (error: any) {
        console.error("[Email Router] Subscription error:", error);
        throw new Error(error.message || "Failed to subscribe");
      }
    }),

  /**
   * Unsubscribe from email list
   */
  unsubscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        // Remove subscriber from database
        await removeSubscriber(input.email);

        return {
          success: true,
          message: "Successfully unsubscribed",
        };
      } catch (error: any) {
        console.error("[Email Router] Unsubscribe error:", error);
        throw new Error(error.message || "Failed to unsubscribe");
      }
    }),
});
