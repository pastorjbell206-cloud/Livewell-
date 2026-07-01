/**
 * Post-purchase download page for "Why Not What" (/why-not-what/thank-you).
 * Stripe redirects here after payment; the gated PDF is unlocked by verifying
 * the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function WhyNotWhatThankYou() {
  return <EbookThankYou slug="why-not-what" title="Why Not What" />;
}
