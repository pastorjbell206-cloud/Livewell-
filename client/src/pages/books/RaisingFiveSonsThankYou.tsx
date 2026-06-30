/**
 * Post-purchase download page for "Raising Five Sons"
 * (/raising-five-sons/thank-you). Stripe redirects here after payment; the
 * gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function RaisingFiveSonsThankYou() {
  return <EbookThankYou slug="raising-five-sons" title="Raising Five Sons" />;
}
