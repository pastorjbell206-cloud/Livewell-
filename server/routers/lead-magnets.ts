import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

export const leadMagnetsRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        magnetId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Track signup
      const signup = {
        id: crypto.randomUUID(),
        email: input.email,
        magnetId: input.magnetId,
        signedUpAt: new Date(),
      };

      // TODO: Save to database when email service is set up
      // For now, just notify owner
      await notifyOwner({
        title: "New Lead Magnet Signup",
        content: `${input.email} signed up for ${input.magnetId}`,
      });

      return {
        success: true,
        message: "Check your email for your guide!",
      };
    }),

  getStats: publicProcedure.query(async () => {
    // TODO: Return signup statistics when database is ready
    return {
      totalSignups: 0,
      byMagnet: {
        "leadership-audit": 0,
        "prophetic-manifesto": 0,
        "theology-workbook": 0,
        "life-diagnostic": 0,
        "community-roadmap": 0,
      },
    };
  }),
});
