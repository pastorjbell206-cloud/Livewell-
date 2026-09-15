/**
 * Post-purchase download page for The Monster in the Mirror. Checkout returns
 * here with ?session_id=...; the files are served only against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function TheMonsterInTheMirrorThankYou() {
  return (
    <EbookThankYou
      slug="the-monster-in-the-mirror"
      title="The Monster in the Mirror"
      bookPath="/books/the-monster-in-the-mirror"
    />
  );
}
