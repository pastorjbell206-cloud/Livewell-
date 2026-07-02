/**
 * Post-purchase download page for "How to Read the Bible"
 * (/how-to-read-the-bible/thank-you). Stripe redirects here after payment;
 * the gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function HowToReadTheBibleThankYou() {
  return <EbookThankYou slug="how-to-read-the-bible" title="How to Read the Bible" />;
}
