/**
 * Post-purchase download page for "Born Again From Atheism" (/born-again-from-atheism/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function BornAgainFromAtheismThankYou() {
  return <EbookThankYou slug="born-again-from-atheism" title="Born Again From Atheism" />;
}
