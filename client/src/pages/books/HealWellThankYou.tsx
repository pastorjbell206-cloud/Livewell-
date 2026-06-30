/**
 * Post-purchase download page for "HealWell" (/healwell/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function HealWellThankYou() {
  return <EbookThankYou slug="healwell" title="HealWell" />;
}
