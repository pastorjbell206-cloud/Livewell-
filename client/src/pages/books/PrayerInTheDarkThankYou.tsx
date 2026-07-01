/**
 * Post-purchase download page for "Prayer in the Dark" (/prayer-in-the-dark/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function PrayerInTheDarkThankYou() {
  return <EbookThankYou slug="prayer-in-the-dark" title="Prayer in the Dark" />;
}
