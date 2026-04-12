import Stripe from "stripe";
import { createBookPurchase, updateBookPurchaseStatus } from "./db-email-books";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export const BOOK_PRICES: Record<number, { title: string; priceUSD: number; stripePriceId: string }> = {
  1: { title: "Book One", priceUSD: 14.99, stripePriceId: "price_book_1" },
  2: { title: "Book Two", priceUSD: 16.99, stripePriceId: "price_book_2" },
  3: { title: "Book Three", priceUSD: 12.99, stripePriceId: "price_book_3" },
};

/**
 * Create a Stripe checkout session for book purchase
 */
export async function createCheckoutSession(
  bookId: number,
  customerEmail: string,
  customerName: string,
  origin: string
): Promise<{ sessionUrl: string; sessionId: string }> {
  const bookPrice = BOOK_PRICES[bookId];
  if (!bookPrice) {
    throw new Error(`Book ${bookId} not found in pricing`);
  }

  try {
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: bookPrice.title,
              description: `Purchase of ${bookPrice.title}`,
            },
            unit_amount: Math.round(bookPrice.priceUSD * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: customerEmail,
      client_reference_id: `book_${bookId}_${Date.now()}`,
      metadata: {
        book_id: bookId.toString(),
        customer_email: customerEmail,
        customer_name: customerName,
      },
      success_url: `${origin}/books-store?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${origin}/books-store?canceled=true`,
      allow_promotion_codes: true,
    });

    // Create purchase record in database
    await createBookPurchase({
      bookId,
      stripePaymentIntentId: session.payment_intent as string,
      customerEmail,
      customerName,
      amountCents: Math.round(bookPrice.priceUSD * 100),
      sessionId: session.id,
    });

    return {
      sessionUrl: session.url || "",
      sessionId: session.id,
    };
  } catch (error: any) {
    console.error("[Stripe] Checkout session error:", error);
    throw new Error(`Failed to create checkout session: ${error.message}`);
  }
}

/**
 * Retrieve checkout session details
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error: any) {
    console.error("[Stripe] Session retrieval error:", error);
    throw new Error(`Failed to retrieve session: ${error.message}`);
  }
}

/**
 * Handle Stripe webhook events
 */
export async function handleStripeWebhook(event: Stripe.Event) {
  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[Stripe] Payment succeeded:", paymentIntent.id);
        await updateBookPurchaseStatus(paymentIntent.id, "succeeded");
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[Stripe] Payment failed:", paymentIntent.id);
        await updateBookPurchaseStatus(paymentIntent.id, "failed");
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("[Stripe] Checkout completed:", session.id);
        if (session.payment_intent) {
          await updateBookPurchaseStatus(session.payment_intent as string, "succeeded");
        }
        break;
      }

      default:
        console.log("[Stripe] Unhandled event type:", event.type);
    }
  } catch (error: any) {
    console.error("[Stripe] Webhook handling error:", error);
    throw error;
  }
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error: any) {
    console.error("[Stripe] Signature verification failed:", error.message);
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }
}
