/**
 * Post-purchase download page for "Be True to Yourself"
 * (/be-true-to-yourself/thank-you). Stripe redirects here after payment;
 * the gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function BeTrueToYourselfThankYou() {
  return <EbookThankYou slug="be-true-to-yourself" title="Be True to Yourself" />;
}
