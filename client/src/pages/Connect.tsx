/**
 * /connect: "Find James". The one page that holds everything James does, so
 * he can link it from anywhere (James, 2026-11-18: "tie in all that I do...
 * into kind of one thing"). The short address /james lands here.
 *
 * In order (the model James was shown, BLUEPRINT.html "One home for all you
 * do"):
 * 1. The page top, with a plate.
 * 2. LiveWell itself, the wide first card: the home and the library.
 * 3. ENDS, the missionary work James founded, as a wide card of its own
 *    (lib/works.ts endsWork; its home page only).
 * 4. His other work at its own address: Substack (the letter), Facebook (the
 *    front porch). One line each, one button
 *    that opens it.
 * 5. The newest on Substack: titles and dates, each a link out
 *    (components/SubstackLatest.tsx). Never the posts themselves.
 * 6. Books, speaking and contact, as cards.
 * 7. This page's own address, with a Copy button.
 *
 * Every address and label comes from lib/works.ts, which reads
 * lib/channels.ts. Nothing from Facebook or Substack is fetched into the
 * browser or embedded. The church has no verified web address, so it has no
 * card.
 */
import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, Compass, Newspaper, Smartphone } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import SectionHead from "@/components/art/SectionHead";
import WorkCard from "@/components/art/WorkCard";
import SubstackLatest from "@/components/SubstackLatest";
import { copyToClipboard } from "@/lib/clipboard";
import { ogImageUrl } from "@/lib/site";
import { HOME_WORKS, LIVEWELL_WORK, elsewhereWorks, endsWork } from "@/lib/works";
import "./connect.css";

/** What a reader sees; the apex address forwards to the www one. */
const SHORT_ADDRESS = "livewellbyjamesbell.co/connect";
/** What the Copy button puts on the clipboard. */
const FULL_ADDRESS = "https://www.livewellbyjamesbell.co/connect";

function CopyAddress() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  return (
    <p className="cn-address">
      <span>
        This page's address is <strong className="cn-address__url">{SHORT_ADDRESS}</strong>
      </span>
      <button
        type="button"
        className="btn btn--quiet cn-address__btn"
        onClick={async () => setState((await copyToClipboard(FULL_ADDRESS)) ? "copied" : "failed")}
      >
        {state === "copied" ? "Copied" : "Copy"}
        <span className="sr-only"> this page's address</span>
      </button>
      <span role="status" className="cn-address__status">
        {state === "failed" && "Could not copy. Select the address and copy it."}
        {state === "copied" && <span className="sr-only">Copied</span>}
      </span>
    </p>
  );
}

export default function Connect() {
  const elsewhere = elsewhereWorks();
  const ends = endsWork();

  return (
    <Layout>
      <SEOMeta
        title="Find James Bell: Substack, Facebook, Essays, and Contact"
        description="Everything James Bell does, on one page: LiveWell, ENDS, his Substack, his Facebook, his books, speaking, and contact."
        image={ogImageUrl("Find James Bell", "LiveWell")}
        url="https://www.livewellbyjamesbell.co/connect"
      />

      <PageHead
        door="About"
        doorHref="/about"
        title="Find James"
        titleId="connect-title"
        line="James Bell has been a pastor for 16 years. Everything he does is here, in one place."
        plate="tree"
      />

      {/* LIVEWELL: the home and the library. */}
      <section className="cn-sec cn-sec--first" aria-label="LiveWell, the home and the library">
        <div className="cn-wrap">
          <WorkCard work={LIVEWELL_WORK} label="The home and the library" lead headingLevel={2}>
            <Link href="/start" className="btn btn--quiet lw-work__btn">
              New here? Start here
            </Link>
          </WorkCard>
        </div>
      </section>

      {/* ENDS: the missionary work James founded, seen high on the page
          (James, 2026-11-18: "make sure people see that"). Home page only. */}
      {ends && (
        <section className="cn-sec cn-sec--warm" aria-label="ENDS, the missionary work James founded">
          <div className="cn-wrap">
            <WorkCard work={ends} label="The missionary work James founded" lead headingLevel={2} />
          </div>
        </section>
      )}

      {/* HIS WORK AT ITS OWN ADDRESS */}
      {elsewhere.length > 0 && (
        <section className="cn-sec" aria-labelledby="cn-elsewhere-title">
          <div className="cn-wrap">
            <SectionHead icon={Compass} label="Elsewhere" title="Where else James is." id="cn-elsewhere-title" />
            <ul className="lw-works lw-works--three">
              {elsewhere.map((w) => (
                <li key={w.id}>
                  <WorkCard work={w} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* THE NEWEST ON SUBSTACK, linked out. */}
      <section className="cn-sec cn-sec--dark" aria-labelledby="cn-substack-title">
        <div className="cn-wrap">
          <SectionHead dark icon={Newspaper} label="Substack" title="New on Substack." id="cn-substack-title" />
          <SubstackLatest tone="dark" />
        </div>
      </section>

      {/* BOOKS, SPEAKING, CONTACT */}
      <section className="cn-sec" aria-labelledby="cn-here-title">
        <div className="cn-wrap">
          <SectionHead icon={BookOpen} label="Here on LiveWell" title="Books, speaking, and contact." id="cn-here-title" />
          <ul className="lw-works lw-works--three">
            {HOME_WORKS.map((w) => (
              <li key={w.id}>
                <WorkCard work={w} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* THIS PAGE'S ADDRESS */}
      <section className="cn-sec cn-sec--warm cn-sec--foot" aria-label="This page's address">
        <div className="cn-wrap">
          <CopyAddress />
          <p className="cn-appline">
            <Smartphone aria-hidden="true" size={20} strokeWidth={1.75} />
            <span>
              Want LiveWell one tap away? <Link href="/app">Put it on your phone or computer</Link>.
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
}
