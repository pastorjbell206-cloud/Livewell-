import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { createBookPurchase, updateBookPurchaseStatus } from "./db-email-books";
import { getDb } from "./db";
import { books } from "../drizzle/schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

/**
 * One price, every ebook. This used to be a three-entry table of "Book One",
 * "Book Two", "Book Three" at made-up prices — a placeholder that would have
 * charged a real reader $14.99 for whatever book happened to be id 1. The
 * title now comes from the books table and the amount from here.
 *
 * Mirrored in api/index.ts (EBOOK_PRICE_CENTS) for the production runtime.
 */
export const EBOOK_PRICE_USD = 8.99;

/** Title for a book id, or null when no such book exists (or no database). */
async function bookTitle(bookId: number): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select({ title: books.title }).from(books).where(eq(books.id, bookId)).limit(1);
  return rows[0]?.title ?? null;
}

/**
 * Create a Stripe checkout session for book purchase
 */
export async function createCheckoutSession(
  bookId: number,
  customerEmail: string,
  customerName: string,
  origin: string
): Promise<{ sessionUrl: string; sessionId: string }> {
  const title = await bookTitle(bookId);
  if (!title) {
    throw new Error(`Book ${bookId} not found`);
  }
  const bookPrice = { title, priceUSD: EBOOK_PRICE_USD };

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
    throw new Error(`Failed to create checkout session: ${error.message}`, { cause: error });
  }
}

/** Whether a real Stripe secret key is present (not the build-time placeholder). */
export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY || "";
  return key.startsWith("sk_") && key !== "sk_test_placeholder";
}

/**
 * Create a subscription checkout session for membership. The price is a
 * Stripe Price ID configured in admin Site Settings (stripeMembershipPriceId),
 * so changing the plan never requires a deploy.
 */
export async function createMembershipCheckoutSession(
  customerEmail: string,
  priceId: string,
  origin: string
): Promise<{ sessionUrl: string; sessionId: string }> {
  if (!isStripeConfigured()) {
    throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY in the environment.");
  }
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: customerEmail,
    allow_promotion_codes: true,
    metadata: { kind: "membership", customer_email: customerEmail },
    success_url: `${origin}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/membership`,
  });
  return { sessionUrl: session.url || "", sessionId: session.id };
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
    throw new Error(`Failed to retrieve session: ${error.message}`, { cause: error });
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
    throw new Error(`Webhook signature verification failed: ${error.message}`, { cause: error });
  }
}
