/**
 * Post-purchase download page for "Alone in a Crowded Church"
 * (/alone-in-a-crowded-church/thank-you). Stripe redirects here after payment;
 * the gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function AloneInACrowdedChurchThankYou() {
  return <EbookThankYou slug="alone-in-a-crowded-church" title="Alone in a Crowded Church" />;
}
