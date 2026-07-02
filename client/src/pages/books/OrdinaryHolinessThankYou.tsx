/**
 * Post-purchase download page for "Ordinary Holiness" (/ordinary-holiness/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function OrdinaryHolinessThankYou() {
  return <EbookThankYou slug="ordinary-holiness" title="Ordinary Holiness" />;
}
