/**
 * The Integrated Life hub index (/life). Lists the deep domains by pillar from
 * client/public/life/domains-index.json (scripts/build-life-index.mjs) and
 * leads with the integrated vision: one undivided life, not balanced boxes.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import LibraryIndex, { type LibGroup } from "@/components/art/LibraryIndex";
import SectionHead from "@/components/art/SectionHead";
import IconTile from "@/components/art/IconTile";
import { fetchJson } from "@/lib/fetch-json";
import { BookOpenText, Briefcase, Compass, Flame, Globe, HeartPulse, House, Lightbulb, Route, Sprout, Users, ClipboardCheck, Hourglass } from "lucide-react";


interface Entry { slug: string; title: string; blurb: string; pillar: string }
function isIndex(x: unknown): x is { domains: Entry[] } {
  return !!x && typeof x === "object" && Array.isArray((x as { domains?: unknown }).domains);
}

/** The pillars, in order, each with its icon; the pillar's name is its id in the index. */
const PILLARS: LibGroup[] = [
  { id: "The Integrated Vision", name: "The Integrated Vision", icon: Compass },
  { id: "The Inner Life", name: "The Inner Life", icon: Flame },
  { id: "The Body and the Rhythms", name: "The Body and the Rhythms", icon: HeartPulse },
  { id: "The Home and Relationships", name: "The Home and Relationships", icon: House },
  { id: "Work, Money, and Calling", name: "Work, Money, and Calling", icon: Briefcase },
  { id: "The Life in the World", name: "The Life in the World", icon: Globe },
  { id: "The Seasons and the Crises", name: "The Seasons and the Crises", icon: Hourglass },
];

/** The pages next to this one (the links the page has always offered). */
const NEXT = [
  { name: "The Whole-Life Assessment", line: "Where life is flourishing, and where it has gone quiet", href: "/life/assessment", icon: ClipboardCheck },
  { name: "Marriage", line: "The long covenant", href: "/life/marriage-the-long-covenant", icon: Users },
  { name: "Parenting", line: "Raising children in grace", href: "/life/raising-children-in-grace", icon: Sprout },
  { name: "Family Discipleship", line: "Faith at the family table", href: "/family", icon: House },
  { name: "How-Tos for Making Disciples", line: "Short, plain guides", href: "/how-tos?topic=discipleship", icon: Route },
  { name: "Wisdom for All of Life", line: "What the Bible says, by subject", href: "/wisdom", icon: Lightbulb },
  { name: "New to Faith, or Coming Back", line: "One road, step by step", href: "/start", icon: Sprout },
];

export default function LifeIndex() {
  // Loading, failed, and loaded-but-empty are three different truths, keyed to
  // a retry nonce so "Try again" resets cleanly. The old version swallowed the
  // error and left the reader on "Loading the domains…" forever.
  const [loaded, setLoaded] = useState<{ nonce: number; domains: Entry[] } | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const failed = failedAt === nonce;
  const items = loaded && loaded.nonce === nonce ? loaded.domains : null;

  useEffect(() => {
    let stale = false;
    fetchJson("/life/domains-index.json", isIndex)
      .then((d) => { if (!stale) setLoaded({ nonce, domains: d.domains }); })
      .catch(() => { if (!stale) setFailedAt(nonce); });
    return () => { stale = true; };
  }, [nonce]);

  const libItems = useMemo(
    () => items?.map((e) => ({ href: `/life/${e.slug}`, title: e.title, line: e.blurb, group: e.pillar })) ?? null,
    [items],
  );

  return (
    <Layout>
      <SEOMeta
        title="Christian Living: Home, Work, Money, Body, Soul"
        description="One undivided life before God: the inner life, the body, the home, work and money, and the world. Scripture, tradition, and tested knowledge."
        url="https://www.livewellbyjamesbell.co/life"
      />

      <InnerHead path="/life" title="Everyday life" line="Following Jesus in every part of life" plate="tree" action={
        <Link href="/life/assessment" className="btn btn--quiet">
          Take the Whole-Life Assessment
        </Link>
      } />

      {/* FIRST: find the part of life you are in. */}
      <LibraryIndex
        id="life"
        items={items === null ? null : libItems}
        failed={failed ? { what: "The life domains", onRetry: () => setNonce((n) => n + 1), backHref: "/", backLabel: "Back home" } : null}
        groups={PILLARS}
        icon={Sprout}
        noun={["guide", "guides"]}
        findLabel="Find a guide"
        placeholder="Try: marriage, money, grief, sleep"
        bandTitle="What part of life are you in?"
        none={<p>The domains are being written. Check back soon, or try another word.</p>}
      />

      {/* An honest look, and the pages near this one. */}
      <section className="home-sec" aria-labelledby="life-next-title">
        <div className="home-wrap">
          <SectionHead icon={Compass} label="Start with an honest look" title="Where to go next." id="life-next-title" />
          <ul className="lw-tiles">
            {NEXT.map((t) => (
              <li key={t.href}>
                <IconTile {...t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The page's own words on how every guide here is written. */}
      <section className="home-sec home-sec--warm" aria-labelledby="life-why-title">
        <div className="home-wrap">
          <SectionHead icon={BookOpenText} label="How these guides are written" title="One life, offered whole." id="life-why-title" />
          <div className="lw-prose-band__body">
            <p>
              The modern person lives in boxes. Faith in one, work in another, the body in another, money in a fourth that nobody opens in church. The gospel claims all of it. To live well is not to balance the boxes. It is to dissolve them.
            </p>
            <p>
              Every domain here is worked the same way: the real struggle named without shame, the biblical vision in context, the tradition's wisdom, the best of modern knowledge tested against Scripture, the places faithful people differ treated fairly, and a practice you can start this week. The standard is flourishing. Not productivity. Not appearance. Not willpower.
            </p>
            <p>
              The Whole-Life Assessment maps where your life is flourishing and where it has gone quiet, then hands you a rule of life for this season. It is not a scorecard. God is not grading you.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
