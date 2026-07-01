/**
 * Post-purchase download page for "Prophetic Justice 101" (/prophetic-justice-101/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function PropheticJustice101ThankYou() {
  return <EbookThankYou slug="prophetic-justice-101" title="Prophetic Justice 101" />;
}
