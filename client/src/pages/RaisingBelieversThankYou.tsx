/**
 * Post-purchase download page for Raising Believers. Checkout returns here with
 * ?session_id=...; the files are served only against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function RaisingBelieversThankYou() {
  return <EbookThankYou slug="raising-believers" title="Raising Believers" bookPath="/books/raising-believers" />;
}
