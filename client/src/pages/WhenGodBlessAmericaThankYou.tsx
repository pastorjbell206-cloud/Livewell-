/**
 * Post-purchase download page for When God Bless America Replaces Thy Kingdom
 * Come. Checkout returns here with ?session_id=...; the files are served only
 * against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function WhenGodBlessAmericaThankYou() {
  return (
    <EbookThankYou
      slug="when-god-bless-america"
      title="When God Bless America Replaces Thy Kingdom Come"
      bookPath="/books/when-god-bless-america"
    />
  );
}
