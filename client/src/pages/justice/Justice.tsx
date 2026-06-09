/**
 * Prophetic Justice hub (/justice). The front door to the section that teaches a
 * skeptical, often younger reader to hold truth consistently, even when it costs
 * their own tribe. Leads with the posture and the flagship consistency check,
 * surfaces the tools and the hard questions, and maps every topic by group.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TOPIC_INDEX, TOPIC_GROUPS, type TopicIndexEntry } from "@/lib/justice";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card = {
  background: "var(--card)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", padding: "var(--s-4)",
  textDecoration: "none", color: "inherit", display: "block",
} as const;

function TopicCard({ t }: { t: TopicIndexEntry }) {
  const inner = (
    <>
      <div style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.25 }}>{t.title}</div>
      <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{t.blurb}</div>
      {t.ready ? (
        <div style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", marginTop: "12px" }}>Read it →</div>
      ) : (
        <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "12px" }}>In the writing</div>
      )}
    </>
  );
  return t.ready ? (
    <Link href={`/justice/topic/${t.slug}`} style={{ ...card, borderTop: "3px solid var(--mustard)" }}>{inner}</Link>
  ) : (
    <div style={{ ...card, opacity: 0.82 }}>{inner}</div>
  );
}

export default function Justice() {
  const byGroup = (g: string) => TOPIC_INDEX.filter((t) => t.group === g);
  const readyCount = TOPIC_INDEX.filter((t) => t.ready).length;

  return (
    <Layout>
      <SEOMeta
        title="Prophetic Justice — Truth That Doesn't Take Sides"
        description="One reason younger people distrust the church is that they have watched Christians defend truth selectively. This section holds the gospel's call to justice and honesty without taking a tribe, indicting the left and the right alike."
        url="https://www.livewellbyjamesbell.co/justice"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>Prophetic Justice</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 66px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "17ch" }}>
            Truth that does not take a side.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
            One reason younger people distrust the church is that they have watched many Christians defend truth selectively. Truth matters when it confronts an opponent. Truth becomes negotiable when it would cost an ally. That inconsistency wrecks the witness. This section holds the gospel's call to justice and honesty without holding a tribe, and the indictment falls on the left and the right alike, the writer included.
          </p>
        </div>
      </section>

      {/* POSTURE + CONSISTENCY CHECK */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          <Link href="/justice/posture" style={{ ...card, borderTop: "3px solid var(--mustard)", padding: "var(--s-5)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Read this first</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>The posture</div>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "10px" }}>
              Biblical justice defined from the text up, the non-tribal commitment, and the one distinction the whole section turns on: the binding command versus the prudential policy. How to read this without weaponizing it.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Start here →</span>
          </Link>
          <Link href="/justice/consistency" style={{ ...card, borderTop: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", padding: "var(--s-5)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>The tool</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>The consistency check</div>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "10px" }}>
              A mirror, not a scorecard. A searching self-examination of whether you defend truth selectively, applying one standard to your side and another to theirs. For your own heart, not for accusing anyone else.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Search your own heart →</span>
          </Link>
        </div>
      </section>

      {/* MORE TOOLS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) 0" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)" }}>Also here</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {[
              { href: "/justice/questions", title: "Hard questions", desc: "Is the gospel political? Is Christianity left or right? What is social justice?" },
              { href: "/justice/glossary", title: "Justice glossary", desc: "Mishpat, tsedaqah, shalom, jubilee, and the loaded words, defined fairly." },
            ].map((x) => (
              <Link key={x.href} href={x.href} style={{ ...card, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", marginBottom: "6px" }}>{x.title}</div>
                <div style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{x.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE TOPICS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>The questions</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>Worked one at a time</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-5)" }}>
            {`Each question gets the same treatment: the biblical foundation, the church's honest record, where Christians agree on the principle, how each side captures it, where faithful people legitimately differ, and the cost. ${readyCount} written so far. The rest are coming.`}
          </p>
          {TOPIC_GROUPS.map((group) => {
            const items = byGroup(group);
            if (items.length === 0) return null;
            return (
              <div key={group} style={{ marginBottom: "var(--s-5)" }}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>{group}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                  {items.map((t) => <TopicCard key={t.slug} t={t} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
