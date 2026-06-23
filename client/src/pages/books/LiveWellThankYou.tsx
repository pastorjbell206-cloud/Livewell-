/**
 * Post-purchase download page for "Live Well"
 * (/live-well/thank-you). Stripe redirects here after payment;
 * the gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function LiveWellThankYou() {
  return <EbookThankYou slug="live-well" title="Live Well" />;
}
