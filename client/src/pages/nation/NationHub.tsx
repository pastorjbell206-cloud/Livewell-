/**
 * Christ and the Nation (/nation). A sub-hub spanning both prophetic sections,
 * holding the deepest political question on the site: was America founded as a
 * Christian nation, how close each party comes to the Bible, what an Old
 * Testament theocracy actually was and why it cannot be rebuilt, what biblical
 * principles might look like as policy, and the danger of empire. The thesis:
 * the Bible is not a party, no nation is the new Israel, and a coerced biblical
 * government would betray the gospel.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", textDecoration: "none", color: "inherit", display: "block" } as const;

const ITEMS = [
  { href: "/nation/christian-nation", kind: "The question", title: "Was America Founded as a Christian Nation?", desc: "The strongest case for yes, the strongest case for no, and an honest verdict that refuses the cheap answer on every side." },
  { href: "/nation/scorecard", kind: "A tool", title: "How Close Is Each Party to the Bible?", desc: "An even-handed scorecard, theme by theme. The tally is meant to come out split. No column adds up to the kingdom." },
  { href: "/nation/theocracy", kind: "The history", title: "What an Old Testament Theocracy Actually Was", desc: "How ancient Israel was really governed, the strange parts included, and why it was a one-time thing that cannot be rebuilt." },
  { href: "/nation/policy", kind: "A tool", title: "If We Actually Had a Biblical Government", desc: "The Year of Jubilee, gleaning, the warning against kings. What the principles might look like as policy, and why both parties would hate it." },
  { href: "/nation/empire", kind: "The warning", title: "The Danger of Empire", desc: "From Babel to Babylon to Rome to now. Every empire demands worship, and the church keeps being seduced by power, on the left and the right." },
];

export default function NationHub() {
  return (
    <Layout>
      <SEOMeta title="Christ and the Nation — The Bible, America, and Power" description="Was America founded as a Christian nation? How close is each party to the Bible? What did an Old Testament theocracy actually look like, and what would a biblical government mean? A serious, even-handed look at the Bible and the body politic." url="https://www.livewellbyjamesbell.co/nation" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>Christ and the Nation</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "18ch" }}>
            The Bible is not a party.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>
            America is not the new Israel. Israel's theocracy was a one-time thing that pointed to Christ and cannot be rebuilt, and a biblical government coerced onto a free people would itself betray the gospel. And yet Scripture's vision still judges every party and leaves both the left and the right homeless. This is the most careful, least tribal look this site can offer at the Bible, the nation, and power.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {ITEMS.map((it) => (
            <Link key={it.href} href={it.href} style={{ ...card, borderTop: "3px solid var(--mustard)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{it.kind}</div>
              <div style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>{it.title}</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{it.desc}</p>
            </Link>
          ))}
          <div style={{ ...card, background: "var(--charcoal)", borderTop: "3px solid var(--mustard)", color: "var(--bone)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.4, color: "var(--bone)", marginBottom: "12px" }}>Render to Caesar what is Caesar's. And to God what is God's.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
              <Link href="/disruption" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)", fontSize: "13px" }}>Prophetic Disruption →</Link>
              <Link href="/justice" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)", fontSize: "13px" }}>Prophetic Justice →</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
