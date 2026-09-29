/**
 * Post-purchase download page for The Reliability of Scripture. Checkout returns here with
 * ?session_id=...; the files are served only against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function TheReliabilityOfScriptureThankYou() {
  return <EbookThankYou slug="the-reliability-of-scripture" title="The Reliability of Scripture" bookPath="/books/the-reliability-of-scripture" />;
}
