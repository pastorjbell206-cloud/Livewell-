/**
 * The Historic Faith (/historic-faith). A front door for the depth: one place
 * that gathers the deep, creedal, historically grounded material and puts it in
 * front of a serious reader instead of leaving it scattered. The organizing idea
 * is recovery, not streamlining: name the lenses we read Scripture through
 * without noticing (nationalism, consumerism, the self), then show the older
 * faith underneath them. Everything here links to content that already exists;
 * this page only surfaces it.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;

interface Item {
  title: string;
  blurb: string;
  href: string;
}

// The lenses we read through without noticing, and the work that exposes each.
const LENSES: Item[] = [
  {
    title: "The Monster in the Mirror",
    blurb:
      "Six American cultural lenses that quietly distort how we read the Bible, and what it looks like to read against our own assumptions.",
    href: "/books/the-monster-in-the-mirror",
  },
  {
    title: "When God Bless America Replaces Thy Kingdom Come",
    blurb:
      "How patriotism became a practical savior. Civil religion is idolatry with a flag for a shroud, and America is not Israel.",
    href: "/books/when-god-bless-america",
  },
  {
    title: "The Body You Left",
    blurb:
      "Individualism made the church optional. A case for the body of Christ in an age that walked away, and why the faith was never solo.",
    href: "/the-body-you-left",
  },
  {
    title: "Babylon",
    blurb:
      "How to live when America stops being Christian. What is dying is not the faith but Christendom, and exile is a place the church has thrived before.",
    href: "/babylon",
  },
];

// The older faith underneath the lenses.
const UNDERNEATH: Item[] = [
  {
    title: "Church history",
    blurb:
      "The church has sat in every dark room we are in now, and come through. The long memory that steadies a short news cycle.",
    href: "/church-history",
  },
  {
    title: "The creeds",
    blurb:
      "What the whole church, across every century and continent, has confessed together. The floor beneath the arguments.",
    href: "/resources/creeds",
  },
  {
    title: "Reading Scripture in its own world",
    blurb:
      "The Ancient Near East, Second Temple Judaism, the Greco-Roman world, honor and shame. The Bible read in its context, not ours.",
    href: "/resources/context",
  },
  {
    title: "The whole biblical story",
    blurb:
      "Theology as one connected story, not a shelf of proof texts. Biblical theology, the traditions, and how to read well.",
    href: "/theology",
  },
];

// Going further: the deep essays and the books that carry the argument.
const DEEPER: Item[] = [
  {
    title: "The theological-depth essays",
    blurb: "The long-form writing, where the argument is made in full.",
    href: "/writing?pillar=theological-depth",
  },
  {
    title: "Prophetic disruption",
    blurb: "Where the recovered faith confronts the American church, right and left, with the same grief.",
    href: "/disruption",
  },
  {
    title: "The Scandal of the Cross",
    blurb: "Why the death of God is the center of everything, recovered from the jewelry we made of it.",
    href: "/the-scandal-of-the-cross",
  },
  {
    title: "Heaven Is Not Your Reward",
    blurb: "The resurrection hope the church traded for an escape. New creation, not clouds and harps.",
    href: "/heaven-is-not-your-reward",
  },
];

function Cards({ items, dark }: { items: Item[]; dark?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "var(--s-3)" }}>
      {items.map((it) => (
        <Link
          key={it.href + it.title}
          href={it.href}
          style={{
            display: "flex",
            flexDirection: "column",
            background: dark ? "rgba(245,240,230,0.05)" : "var(--card)",
            border: `1px solid ${dark ? "rgba(245,240,230,0.14)" : "var(--line)"}`,
            borderTop: "2px solid var(--mustard)",
            padding: "var(--s-4)",
            textDecoration: "none",
          }}
        >
          <div style={{ fontFamily: "var(--F)", fontSize: "21px", lineHeight: 1.2, color: dark ? "var(--bone)" : "var(--ink)", marginBottom: "8px" }}>
            {it.title}
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: dark ? "rgba(245,240,230,0.72)" : "var(--ink-muted)", margin: "0 0 14px", flex: 1 }}>
            {it.blurb}
          </p>
          <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: dark ? "var(--mustard)" : "var(--ink)", borderBottom: "1px solid var(--mustard)", alignSelf: "flex-start", paddingBottom: "2px" }}>
            Open
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function HistoricFaith() {
  return (
    <Layout>
      <SEOMeta
        title="The Historic Faith — LiveWell by James Bell"
        description="A deep, creedal, historically grounded Christianity recovered from underneath the lenses of nationalism, consumerism, and the self. Church history, the creeds, the Bible read in its own world, and the books that expose the American lens."
        url="https://www.livewellbyjamesbell.co/historic-faith"
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>The Historic Faith</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "20px", maxWidth: "20ch" }}>
            Older than your politics. Deeper than your culture.
          </h1>
          <p style={{ fontFamily: "var(--F)", fontSize: "clamp(19px, 2.4vw, 26px)", fontStyle: "italic", lineHeight: 1.4, color: "rgba(245,240,230,0.82)", maxWidth: "34ch", marginBottom: "22px" }}>
            A Christianity recovered from underneath the lenses of nationalism, consumerism, and the self.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.72)", maxWidth: "60ch" }}>
            Most of us did not choose the lenses we read the Bible through. We inherited them, from a culture that
            wrapped the faith in a flag, sold it as a product, and told us we could carry it alone. This is the older
            faith underneath all of that. Not a newer, hotter version. The oldest one, the creedal and historic one,
            the one the whole church has confessed for two thousand years, recovered and put back in front of you.
          </p>
        </div>
      </section>

      {/* THE LENSES */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>The lenses</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ink)", marginBottom: "10px", maxWidth: "24ch" }}>
            First, name what you are reading through.
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            You cannot see a lens you are looking through. These name the three that distort the American reading of
            Scripture the most, nationalism, consumerism, and individualism, and the end of the Christendom that made
            them feel like the faith itself.
          </p>
          <Cards items={LENSES} />
        </div>
      </section>

      {/* THE FAITH UNDERNEATH */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "12px" }}>The faith underneath</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: "10px", maxWidth: "24ch" }}>
            The oldest, deepest thing there is.
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "rgba(245,240,230,0.72)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            Take the lenses off and this is what is left, and it is not less than what you had. It is far more. The long
            memory of the church, the creed the whole world confesses, the Bible read in its own ancient world, and the
            one connected story that runs through all of it.
          </p>
          <Cards items={UNDERNEATH} dark />
        </div>
      </section>

      {/* GO DEEPER */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>Go deeper</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ink)", marginBottom: "10px", maxWidth: "24ch" }}>
            Where the argument is made in full.
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            The essays where the case is built, and the books that carry it the rest of the way. Read the openings free.
          </p>
          <Cards items={DEEPER} />
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontStyle: "italic", lineHeight: 1.4, color: "rgba(245,240,230,0.92)" }}>
            Christianity is deeper than your politics. Older than your culture. Wiser than your assumptions. And more
            demanding, and more beautiful, than you realized.
          </p>
        </div>
      </section>
    </Layout>
  );
}
