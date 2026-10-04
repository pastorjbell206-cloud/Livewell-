/**
 * Post-purchase download page for the three-book bundle. Checkout returns
 * here with ?session_id=...; each book's files are served only against that
 * paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function TheThreeBooksThankYou() {
  return <EbookThankYou slug="the-three-books" title="the three books" bookPath="/books" />;
}
