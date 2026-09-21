/**
 * Post-purchase download page for Is Critical Race Theory Biblical?. Checkout returns here with
 * ?session_id=...; the files are served only against that paid session.
 */
import { EbookThankYou } from "@/components/EbookThankYou";

export default function IsCriticalRaceTheoryBiblicalThankYou() {
  return <EbookThankYou slug="critical-race-theory-biblical" title="Is Critical Race Theory Biblical?" bookPath="/books/critical-race-theory-biblical" />;
}
