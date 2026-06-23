/**
 * Post-purchase download page for "After Christendom"
 * (/after-christendom/thank-you). Stripe redirects here after payment;
 * the gated PDF is unlocked by verifying the paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function AfterChristendomThankYou() {
  return <EbookThankYou slug="after-christendom" title="After Christendom" />;
}
