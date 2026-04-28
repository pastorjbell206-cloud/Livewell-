import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { getDb } from "../db";
import { leadMagnetSignups } from "../../drizzle/schema";

const KNOWN_MAGNET_IDS = [
  "leadership-audit",
  "prophetic-manifesto",
  "theology-workbook",
  "life-diagnostic",
  "community-roadmap",
] as const;

type KnownMagnetId = (typeof KNOWN_MAGNET_IDS)[number];

function emptyByMagnet(): Record<KnownMagnetId, number> {
  return {
    "leadership-audit": 0,
    "prophetic-manifesto": 0,
    "theology-workbook": 0,
    "life-diagnostic": 0,
    "community-roadmap": 0,
  };
}

export const leadMagnetsRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        magnetId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const publicId = crypto.randomUUID();

      // Best-effort: persist the signup if a database is configured. We do
      // not let a database failure block the user-visible signup flow —
      // notifyOwner() below is the source of truth for "signup happened".
      try {
        const db = await getDb();
        if (db) {
          await db.insert(leadMagnetSignups).values({
            publicId,
            email: input.email,
            magnetId: input.magnetId,
          });
        }
      } catch (err) {
        console.warn("[lead-magnets] failed to persist signup:", err);
      }

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
    // Returns aggregate signup counts when the database is available.
    // Falls back to zero counts so the UI never breaks if the DB or table
    // is missing (e.g. before drizzle-kit generate has been run).
    const fallback = {
      totalSignups: 0,
      byMagnet: emptyByMagnet() as Record<string, number>,
    };

    try {
      const db = await getDb();
      if (!db) return fallback;

      const rows = await db
        .select({
          magnetId: leadMagnetSignups.magnetId,
          count: sql<number>`count(*)`,
        })
        .from(leadMagnetSignups)
        .groupBy(leadMagnetSignups.magnetId);

      const byMagnet: Record<string, number> = emptyByMagnet();
      let totalSignups = 0;
      for (const row of rows) {
        const n = Number(row.count) || 0;
        byMagnet[row.magnetId] = n;
        totalSignups += n;
      }

      return { totalSignups, byMagnet };
    } catch (err) {
      console.warn("[lead-magnets] getStats falling back to zeros:", err);
      return fallback;
    }
  }),
});
