/**
 * The three short lines beside a book's download on its own page. While
 * giving is held they read as they have since 2026-11-18 ("Free ..."). When
 * giving is open (James, 2026-11-22) they name the suggested gift instead,
 * and never call the book free beside the ask.
 */
import { useGivingOpen } from "@/lib/downloadGift";
import { downloadIdForHref, formatUsd, suggestedCents } from "@shared/downloads";

/** The small label over the title: "Free ebook", or "Ebook" while giving is open. */
export function useEbookLabel(): string {
  return useGivingOpen() ? "Ebook" : "Free ebook";
}

export function EbookLabel() {
  return <>{useEbookLabel()}</>;
}

/** Beside the buttons: "Free · EPUB and PDF · no email asked". */
export function OfferMeta({ pdf }: { pdf: string }) {
  const giving = useGivingOpen();
  const id = downloadIdForHref(pdf);
  const lead = giving && id ? `Suggested gift: ${formatUsd(suggestedCents(id))}` : "Free";
  return <>{lead} · EPUB and PDF · no email asked</>;
}

/** Under "Read it now". */
export function OfferLine() {
  const giving = useGivingOpen();
  return (
    <>
      {giving
        ? "An EPUB for your e-reader and a PDF for everything else. The download carries a suggested gift, which you can change or skip."
        : "Free to download: an EPUB for your e-reader and a PDF for everything else."}
    </>
  );
}
