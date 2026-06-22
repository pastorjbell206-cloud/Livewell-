/**
 * Leadership Formation hub (/leadership). The home for the working pastor and
 * the lay leader. Lists the tools first (the workspace, the workbenches, the
 * assessments) and then the article corpus grouped by theme. Content config in
 * client/src/lib/leadership.ts.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LEADERSHIP_GROUPS, LEADERSHIP_ARTICLES, LEADERSHIP_TOOLS } from "@/lib/leadership";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", textDecoration: "none", color: "inherit", display: "block" } as const;

export default function LeadershipHub() {
  return (
    <Layout>
      <SEOMeta title="Leadership Formation — Tools and Writing for Pastors and Leaders" description="A working library for the pastor and the lay leader: the inner life, leading people, the work of ministry, preaching, administration, and the building and rebuilding of churches. Plus a shared team workspace and a bank of practical tools." url="https://www.livewellbyjamesbell.co/leadership" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>Leadership Formation</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "20ch" }}>
            The weight of leading the church.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "64ch" }}>
            Most of the job is not the part anyone applauds. It is the hospital room, the budget meeting, the volunteer who quit, the sermon due in four days, the elder who will not be moved. This is a working library for the people who carry a church. The inner life that holds the work up. The people who have to be led. The craft of preaching. The systems under the soul. And the slow labor of building a church, or bringing a dying one back.
          </p>
        </div>
      </section>

      {/* TOOLS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>The tools</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-4)" }}>Built for the work, not the bookshelf</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {LEADERSHIP_TOOLS.map((t) => (
              <Link key={t.href} href={t.href} style={{ ...card, borderTop: "3px solid var(--mustard)" }}>
                <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{t.kicker}</div>
                <div style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>{t.title}</div>
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{t.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING BOOKLETS — the Hard Issues Series, surfaced from Resources */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Elder &amp; deacon training</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "12px" }}>
            The Hard Issues Series
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
            Ten free booklets for the men who carry a church — five on the office of elder, five on leading and governing. Pair them with the readiness assessments above: train the team, then take an honest measure of where it stands. Free PDF and EPUB; a gift to PCN is optional.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            <Link href="/resources/hard-issues-series" style={{ ...card, borderLeft: "2px solid var(--mustard)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Part One · Eldership</div>
              <div style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>What elders are for, and how to find them</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>The job, the qualifications, finding and installing elders, handling disagreement, and the hardest act of all — removing one. Five booklets.</p>
            </Link>
            <Link href="/resources/hard-issues-series" style={{ ...card, borderLeft: "2px solid var(--mustard)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Part Two · Leading &amp; Governing</div>
              <div style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>Deacons, polity, and the work of change</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>Deacon qualifications and selection, governance that works, and the patient art of changing what a church believes it cannot change. Five booklets.</p>
            </Link>
          </div>
          <div style={{ marginTop: "var(--s-4)" }}>
            <Link href="/resources/hard-issues-series" style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--ink)", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px", textDecoration: "none" }}>
              See all ten booklets →
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLES BY GROUP */}
      {LEADERSHIP_GROUPS.map((group, gi) => {
        const items = LEADERSHIP_ARTICLES.filter((a) => a.group === group);
        if (!items.length) return null;
        return (
          <section key={group} style={{ background: gi % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
            <div style={wrap}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{group}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "14px", marginTop: "var(--s-3)" }}>
                {items.map((a) => (
                  <Link key={a.slug} href={`/leadership/article/${a.slug}`} style={{ ...card }}>
                    <div style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>{a.title}</div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{a.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
        <div style={wrap}>
          <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 400, lineHeight: 1.5, color: "var(--bone)", maxWidth: "60ch", marginBottom: "14px" }}>
            The work is long and local and mostly unseen. It was always going to be. The question is not whether you can build a crowd. It is whether you can be faithful in a place over time.
          </p>
        </div>
      </section>
    </Layout>
  );
}
