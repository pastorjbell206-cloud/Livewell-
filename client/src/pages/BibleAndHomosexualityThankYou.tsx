/**
 * Post-purchase download page for What the Bible Says About Homosexuality. Checkout returns here with
 * ?session_id=...; the files are served only against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function BibleAndHomosexualityThankYou() {
  return <EbookThankYou slug="bible-and-homosexuality" title="What the Bible Says About Homosexuality" bookPath="/books/bible-and-homosexuality" />;
}
