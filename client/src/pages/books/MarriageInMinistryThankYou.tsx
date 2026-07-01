/**
 * Post-purchase download page for "Marriage in Ministry" (/marriage-in-ministry/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function MarriageInMinistryThankYou() {
  return <EbookThankYou slug="marriage-in-ministry" title="Marriage in Ministry" />;
}
