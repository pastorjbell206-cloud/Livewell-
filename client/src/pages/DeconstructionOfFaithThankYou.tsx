/**
 * Post-purchase download page for The Deconstruction of Faith. Checkout returns here with
 * ?session_id=...; the files are served only against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function DeconstructionOfFaithThankYou() {
  return <EbookThankYou slug="deconstruction-of-faith" title="The Deconstruction of Faith" bookPath="/books/deconstruction-of-faith" />;
}
