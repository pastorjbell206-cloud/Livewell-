/**
 * Post-purchase download page for What the Bible Says About Transgender Identity. Checkout returns here with
 * ?session_id=...; the files are served only against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function BibleAndTransgenderIdentityThankYou() {
  return <EbookThankYou slug="bible-and-transgender-identity" title="What the Bible Says About Transgender Identity" bookPath="/books/bible-and-transgender-identity" />;
}
