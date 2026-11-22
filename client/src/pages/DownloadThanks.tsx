/**
 * /downloads/thanks: where Stripe sends a reader back after a gift given
 * with a download (DOWNLOAD_THANKS_PATH in shared/downloads.ts), or after
 * they leave the payment page without giving (?cancelled=1).
 *
 * The address names the download by its id; the file itself is the one this
 * device remembered when the reader went to give, and is handed back only if
 * it is one of this site's own downloads for that id. After a gift the
 * download starts by itself and a plain link to it stays on the page. Always
 * noindex. Nothing is read from Stripe and nothing is stored.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { clearPending, pendingFor, type PendingDownload } from "@/lib/downloadGift";
import { ADVICE_LINE } from "@/lib/giving";
import "./support/support.css";

export default function DownloadThanks() {
  const [pending, setPending] = useState<PendingDownload | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const wasCancelled = query.get("cancelled") === "1";
    const found = pendingFor(query.get("item") ?? "");
    setCancelled(wasCancelled);
    setPending(found);
    if (found && !wasCancelled && !started.current) {
      // Start the download once; the link below stays for a browser that holds it back.
      started.current = true;
      clearPending();
      const a = document.createElement("a");
      a.href = found.href;
      a.download = "";
      a.dataset.giftSkip = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="Your Download"
        description="Where a reader returns after giving with a download: the file, and a thank-you."
        url="https://www.livewellbyjamesbell.co/downloads/thanks"
        noindex
      />

      <InnerHead
        path="/downloads/thanks"
        title={cancelled ? "Nothing was charged" : "Thank you"}
        line={cancelled ? "You left the payment page before giving. Your download is still yours." : "Your gift helps keep this work going."}
        plate="jars"
        width="var(--w-content)"
      />

      <section className="home-sec sp-sec">
        <div className="sp-wrap">
          <div className="sp-prose">
            {pending ? (
              <p>
                {cancelled ? "Here it is: " : "Your download should have started. If it has not, here it is: "}
                <a href={pending.href} download data-gift-skip="">
                  Download {pending.title}
                </a>
                .
              </p>
            ) : (
              <p>
                Your download is on the <Link href="/downloads">Downloads page</Link>, with everything else there is to print or read.
              </p>
            )}
            {!cancelled && <p>Stripe, the company that handled the payment, holds the record of your gift. LiveWell keeps no list of who gives.</p>}
            {!cancelled && <p>{ADVICE_LINE}</p>}
          </div>
          <p className="sp-next">
            <Link href="/downloads" className="btn">
              Back to Downloads
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
