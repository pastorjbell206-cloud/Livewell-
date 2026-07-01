/**
 * Post-purchase download page for "The Body You Left" (/the-body-you-left/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function TheBodyYouLeftThankYou() {
  return <EbookThankYou slug="the-body-you-left" title="The Body You Left" />;
}
