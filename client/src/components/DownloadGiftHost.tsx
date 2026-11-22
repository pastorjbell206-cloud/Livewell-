/**
 * The one place a download becomes an ask (James, 2026-11-22).
 *
 * Mounted once, beside the router. While giving is held (the switch in
 * client/src/lib/giving.json is off, or the server has no Stripe key) it
 * renders nothing and listens to nothing: every download link on the site is
 * the plain link it always was.
 *
 * When giving is open it listens for a click on any link to a download
 * (shared/downloads.ts knows which addresses are downloads) and, the first
 * time, raises the gift sheet instead of following the link. Every page's
 * links stay ordinary links, so none of them had to change, a link that is
 * added later is covered, and a reader with no JavaScript still gets the
 * file. The sheet's own "Download without giving" link, a modified click
 * (new tab, save as), and anything the reader has already been asked about
 * today all pass straight through.
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { markAsked, shouldAsk, useGivingOpen } from "@/lib/downloadGift";
import { GIVING } from "@/lib/giving";
import { downloadIdForHref } from "@shared/downloads";

const DownloadGiftSheet = lazy(() => import("./DownloadGiftSheet"));

export interface GiftAsk {
  itemId: string;
  /** The file the reader asked for, as the link gave it. */
  href: string;
  /** Whether the link opened the file in a new tab, or saved it. */
  newTab: boolean;
  save: boolean;
}

function Listening() {
  const open = useGivingOpen(true);
  const [ask, setAsk] = useState<GiftAsk | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.dataset.giftSkip !== undefined) return;
      const href = link.getAttribute("href") ?? "";
      const itemId = downloadIdForHref(href);
      if (!itemId || !shouldAsk(itemId)) return;
      e.preventDefault();
      markAsked(itemId);
      setAsk({ itemId, href, newTab: link.target === "_blank", save: link.hasAttribute("download") });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  if (!open) return null;
  return (
    <>
      {/* Says, to a test and to anyone reading the page's source, that downloads are being watched. */}
      <span hidden data-gift-listening="" />
      {ask && (
        <Suspense fallback={null}>
          <DownloadGiftSheet ask={ask} onClose={() => setAsk(null)} />
        </Suspense>
      )}
    </>
  );
}

/** `switchOn` is the switch in lib/giving.json; a test passes it in. */
export default function DownloadGiftHost({ switchOn = GIVING.open }: { switchOn?: boolean }) {
  // Held: nothing mounts, so the server is never asked and no click is watched.
  return switchOn ? <Listening /> : null;
}
