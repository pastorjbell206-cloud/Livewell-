/**
 * Post-purchase download page for "Heaven Is Not Your Reward" (/heaven-is-not-your-reward/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function HeavenIsNotYourRewardThankYou() {
  return <EbookThankYou slug="heaven-is-not-your-reward" title="Heaven Is Not Your Reward" />;
}
