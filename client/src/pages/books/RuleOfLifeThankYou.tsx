/**
 * Post-purchase download page for "Rule of Life"
 * (/rule-of-life/thank-you). Stripe redirects here after payment;
 * the gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function RuleOfLifeThankYou() {
  return <EbookThankYou slug="rule-of-life" title="Rule of Life" />;
}
