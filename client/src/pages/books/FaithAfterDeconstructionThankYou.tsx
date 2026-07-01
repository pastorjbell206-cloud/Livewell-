/**
 * Post-purchase download page for "Faith After Deconstruction" (/faith-after-deconstruction/thank-you). Stripe
 * redirects here after payment; the gated PDF is unlocked by verifying the paid
 * session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function FaithAfterDeconstructionThankYou() {
  return <EbookThankYou slug="faith-after-deconstruction" title="Faith After Deconstruction" />;
}
