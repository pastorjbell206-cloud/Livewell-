/**
 * /support/thanks: where Stripe sends a giver back after a gift
 * (GIFT_THANKS_PATH in shared/giving.ts). A calm thank-you and the two plain
 * facts a giver needs afterwards. Always noindex: it is a return address, not
 * a page to find. Nothing is read from Stripe here and nothing is stored.
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { ADVICE_LINE } from "@/lib/giving";
import "./support/support.css";

export default function SupportThanks() {
  return (
    <Layout>
      <SEOMeta
        title="Thank You for Your Gift"
        description="A thank-you to readers who give to keep LiveWell free for everyone."
        url="https://www.livewellbyjamesbell.co/support/thanks"
        noindex
      />

      <InnerHead
        path="/support/thanks"
        title="Thank you"
        line="Your gift helps keep LiveWell free for everyone who reads it."
        plate="jar"
        width="var(--w-content)"
      />

      <section className="home-sec sp-sec">
        <div className="sp-wrap">
          <div className="sp-prose">
            <p>Stripe, the company that handled the payment, holds the record of your gift. LiveWell keeps no list of who gives.</p>
            <p>
              To stop or change a monthly gift, write through the <Link href="/contact">Contact page</Link>.
            </p>
            <p>{ADVICE_LINE}</p>
          </div>
          <p className="sp-next">
            <Link href="/explore" className="btn">
              Back to reading
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
