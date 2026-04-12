import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const stripeRouter = router({
  // Stripe checkout router
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            type: z.enum(["book", "bundle", "collection"]),
            id: z.string(),
            title: z.string(),
            price: z.number(),
            quantity: z.number().default(1),
          })
        ),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        input.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              metadata: {
                type: item.type,
                id: item.id,
              },
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }));

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        customer_email: ctx.user?.email || undefined,
        metadata: {
          userId: ctx.user?.id?.toString() || "guest",
          userName: ctx.user?.name || "Guest",
        },
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    }),

  getProductPrices: publicProcedure.query(async () => {
    if (!process.env.STRIPE_SECRET_KEY) {
      return [];
    }
    const products = await stripe.products.list({
      limit: 100,
    });

    const prices = await Promise.all(
      products.data.map(async (product) => {
        const productPrices = await stripe.prices.list({
          product: product.id,
        });

        return {
          productId: product.id,
          name: product.name,
          prices: productPrices.data.map((price) => ({
            priceId: price.id,
            amount: (price.unit_amount || 0) / 100,
            currency: price.currency,
          })),
        };
      })
    );

    return prices;
  }),

  validateCheckout: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      if (!process.env.STRIPE_SECRET_KEY) {
        return { status: "error", paymentStatus: "unknown" };
      }
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);

      return {
        status: session.payment_status,
        paymentStatus: session.payment_status,
        customerId: session.customer,
        email: session.customer_email,
        amount: (session.amount_total || 0) / 100,
      };
    }),
});
