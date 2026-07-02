/**
 * Post-purchase download page for "The Scandal of the Cross" (/the-scandal-of-the-cross/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function TheScandalOfTheCrossThankYou() {
  return <EbookThankYou slug="the-scandal-of-the-cross" title="The Scandal of the Cross" />;
}
