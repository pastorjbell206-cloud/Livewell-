/**
 * Stripe browser-side constants.
 *
 * The publishable key is public by design (Stripe pk_* keys are meant to be
 * shipped to the browser; they can only create checkout sessions, never read
 * or move money). It lives here as the single shared constant so no page
 * carries its own inline copy.
 */
export const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51RYCqAG7Y8x20otN6Qm3UgBaVDYFC00eaEXlrVT1hShuTW7qg3ylfcX3UHGOc0oyX75k6c4DhsKyz4NFSU4aZkOx00HzSLA7FH";
