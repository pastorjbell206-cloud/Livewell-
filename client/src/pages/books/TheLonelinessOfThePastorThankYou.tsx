/**
 * Post-purchase download page for "The Loneliness of the Pastor" (/the-loneliness-of-the-pastor/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function TheLonelinessOfThePastorThankYou() {
  return <EbookThankYou slug="the-loneliness-of-the-pastor" title="The Loneliness of the Pastor" />;
}
