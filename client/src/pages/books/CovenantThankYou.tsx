/**
 * Post-purchase download page for "Covenant" (/covenant/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function CovenantThankYou() {
  return <EbookThankYou slug="covenant" title="Covenant" />;
}
