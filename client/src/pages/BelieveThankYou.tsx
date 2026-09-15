/**
 * Post-purchase download page for Believe. Checkout returns here with
 * ?session_id=...; the files are served only against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function BelieveThankYou() {
  return <EbookThankYou slug="believe" title="Believe" bookPath="/books/believe" />;
}
