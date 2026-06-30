/**
 * Post-purchase download page for "The Sermon on the Mount as Politics" (/sermon-on-the-mount-as-politics/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function SermonOnTheMountAsPoliticsThankYou() {
  return <EbookThankYou slug="sermon-on-the-mount-as-politics" title="The Sermon on the Mount as Politics" />;
}
