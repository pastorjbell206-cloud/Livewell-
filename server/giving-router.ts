/**
 * Gifts to LiveWell (/support), the dev runtime. Mirrored by hand in
 * api/index.ts ("giving.status", "giving.createCheckout"); the amounts, the
 * check and the Stripe request are one shared file (shared/giving.ts), so the
 * two runtimes cannot drift on what a gift is.
 *
 * Two gates, both needed before a gift can start: the switch in
 * client/src/lib/giving.json (`open`), and a real STRIPE_SECRET_KEY in the
 * environment. With either one off, `status` answers { open: false } and
 * `createCheckout` refuses with "Giving isn't open yet."
 *
 * No gift is stored here, and nothing about the giver or the gift is logged.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { GIFT_MAX_USD, GIFT_MIN_USD, GIVING_CLOSED_MESSAGE, checkGift } from "@shared/giving";
import GIVING_FACTS from "../client/src/lib/giving.json";
import { publicProcedure, router } from "./_core/trpc";
import { createGiftCheckoutSession, isStripeConfigured } from "./stripe-service";

const PRODUCTION_SITE_URL = "https://www.livewellbyjamesbell.co";

function givingOpen(): boolean {
  return GIVING_FACTS.open === true && isStripeConfigured();
}

/** The site's own address, from the request. Never taken from the page's input. */
function siteOrigin(req: unknown): string {
  const r = (req ?? {}) as { headers?: Record<string, string | string[] | undefined>; protocol?: string };
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";
  const host = first(r.headers?.["x-forwarded-host"]) || first(r.headers?.host);
  const proto = first(r.headers?.["x-forwarded-proto"]) || r.protocol || "https";
  return host ? `${proto}://${host}` : PRODUCTION_SITE_URL;
}

export const givingRouter = router({
  /** Whether a gift can be started right now. The page shows its button only on true. */
  status: publicProcedure.query(() => ({ open: givingOpen() })),

  /** Start a gift. Returns the address of Stripe's hosted checkout page. */
  createCheckout: publicProcedure
    .input(
      z.object({
        frequency: z.enum(["once", "monthly"]),
        amountUsd: z.number().int().min(GIFT_MIN_USD).max(GIFT_MAX_USD),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!givingOpen()) throw new TRPCError({ code: "BAD_REQUEST", message: GIVING_CLOSED_MESSAGE });
      const checked = checkGift(input);
      if (!checked.ok) throw new TRPCError({ code: "BAD_REQUEST", message: checked.error });
      try {
        const { sessionUrl } = await createGiftCheckoutSession(checked.gift, siteOrigin(ctx.req));
        if (!sessionUrl) throw new Error("no checkout address");
        return { sessionUrl };
      } catch {
        // Stripe's own words never reach the page, and nothing about the gift is logged.
        console.error("[giving] the checkout could not be started");
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "The gift could not be started. Nothing was charged." });
      }
    }),
});
