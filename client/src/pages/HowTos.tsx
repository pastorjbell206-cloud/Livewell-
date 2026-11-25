/**
 * How-To Library (/how-tos). A static library of practical, Scripture-grounded
 * how-to guides published from scripts/articles/* via
 * scripts/build-howtos-index.mjs (client/public/howtos/index.json). Filterable
 * by topic via ?topic=<slug>. The guides read as one compact editorial index
 * under topic chips; each row links to /how-tos/<slug>.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import LibraryIndex, { type LibGroup } from "@/components/art/LibraryIndex";
import SectionHead from "@/components/art/SectionHead";
import IconTile from "@/components/art/IconTile";
import { BookOpenText, Briefcase, Compass, Flame, Globe, HeartHandshake, HeartPulse, Hourglass, House, Lightbulb, Megaphone, Sprout, Users, Baby, Route } from "lucide-react";
import { fetchJson } from "@/lib/fetch-json";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";


// readTime is usually "7 min read"; a few entries carry a bare minute count.
interface Entry { slug: string; title: string; excerpt: string; topic: string; readTime: string | number }
function isIndex(x: unknown): x is { articles: Entry[] } {
  return !!x && typeof x === "object" && Array.isArray((x as { articles?: unknown }).articles);
}
const readTimeLabel = (t: Entry["readTime"]) => {
  const s = String(t ?? "").trim();
  return /^\d+$/.test(s) ? `${s} min read` : s;
};

/** The subjects, in order, under the names the page has always used; the id is the index's topic. */
const TOPICS: LibGroup[] = [
  { id: "spiritual-formation", name: "The Inner Life", icon: Flame },
  { id: "discipleship", name: "Following Jesus", icon: Route },
  { id: "marriage", name: "Marriage", icon: HeartHandshake },
  { id: "parenting", name: "Parenting", icon: Baby },
  { id: "relationships", name: "Relationships", icon: Users },
  { id: "family", name: "The Home", icon: House },
  { id: "work", name: "Work & Money", icon: Briefcase },
  { id: "the-body", name: "The Body", icon: HeartPulse },
  { id: "suffering", name: "Hard Seasons", icon: Hourglass },
  { id: "the-life-in-the-world", name: "Life in the World", icon: Globe },
  { id: "evangelism", name: "Sharing Your Faith", icon: Megaphone },
];

export default function HowTos() {
  // Loading, failed, and loaded are distinct states keyed to a retry nonce
  // (the LifeIndex pattern), so a failed fetch offers a retry instead of an
  // endless "Loading the library…".
  const [loaded, setLoaded] = useState<{ nonce: number; articles: Entry[] } | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const failed = failedAt === nonce;
  const items = loaded && loaded.nonce === nonce ? loaded.articles : null;
  useEffect(() => {
    let stale = false;
    fetchJson("/howtos/index.json", isIndex)
      .then((d) => { if (!stale) setLoaded({ nonce, articles: d.articles }); })
      .catch(() => { if (!stale) setFailedAt(nonce); });
    return () => { stale = true; };
  }, [nonce]);

  const libItems = useMemo(
    () =>
      items?.map((e) => ({
        href: `/how-tos/${e.slug}`,
        title: e.title,
        line: e.excerpt,
        meta: readTimeLabel(e.readTime),
        group: e.topic,
      })) ?? null,
    [items],
  );

  return (
    <Layout>
      <SEOMeta
        title="How-To Guides: Marriage, Parenting, Prayer, Money"
        description="Short, practical how-to guides for marriage, parenting, money, the inner life, hard seasons, and making disciples. Plain help, grounded in Scripture."
        url="https://www.livewellbyjamesbell.co/how-tos"
      />

      <InnerHead path="/how-tos" title="How-to guides" line="How-to guides for everyday Christian life" plate="table">
        <p className="pg-head__lede">Practical help for real life.</p>
      </InnerHead>

      {/* FIRST: find a guide, by word or by subject (?topic= opens one subject). */}
      <LibraryIndex
        id="howtos"
        items={items === null ? null : libItems}
        failed={failed ? { what: "The how-to library", onRetry: () => setNonce((n) => n + 1), backHref: "/", backLabel: "Back home" } : null}
        groups={TOPICS}
        icon={Sprout}
        noun={["guide", "guides"]}
        findLabel="Find a guide"
        placeholder="Try: family worship, debt, forgive, pray"
        bandTitle="What do you need to do?"
        param="topic"
        none={<p>No guide matches. Try another word, or <Link href="/tools/wisdom-finder">tell us what you are facing</Link>.</p>}
      />

      <section className="home-sec home-sec--warm" aria-labelledby="howtos-more-title">
        <div className="home-wrap">
          <SectionHead icon={BookOpenText} label="Short, plain guides" title="Grounded in Scripture." id="howtos-more-title" />
          <div className="lw-prose-band__body">
            <p>
              Short, plain guides for the things you actually have to do: start family worship, fight fair in marriage, get out of debt, share your faith without being weird, make a disciple at your table. Grounded in Scripture, written for the long obedience of an ordinary week.
            </p>
          </div>
          <ul className="lw-tiles" style={{ marginTop: "var(--s-4)" }}>
            <li><IconTile href="/tools/wisdom-finder" icon={Lightbulb} name="Wisdom Finder" line="What the Bible says about what you face" /></li>
            <li><IconTile href="/life" icon={Compass} name="The Integrated Life" line="Every part of life, one guide each" /></li>
            <li><IconTile href="/life/making-disciples-at-the-table" icon={Users} name="Make Disciples" line="At your own table" /></li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
