/**
 * Post-purchase download page for "The God Who Is Not Nice" (/the-god-who-is-not-nice/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function TheGodWhoIsNotNiceThankYou() {
  return <EbookThankYou slug="the-god-who-is-not-nice" title="The God Who Is Not Nice" />;
}
