/**
 * Post-purchase download page for "Babylon"
 * (/babylon/thank-you). Stripe redirects here after payment;
 * the gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function BabylonThankYou() {
  return <EbookThankYou slug="babylon" title="Babylon" />;
}
