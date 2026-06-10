/**
 * The Leadership Team workspace (/leadership/team). Placeholder shell for the
 * authenticated collaboration app (channels, posts, tasks, announcements). The
 * data layer (tables + tRPC routers) lands in the next build and is switched on
 * once the database migration is deployed.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

const PLANNED = [
  { title: "Channels", body: "Threaded conversations by ministry, team, or topic. Elders here, worship there, the whole staff in one place." },
  { title: "Tasks", body: "Who owns what, what is due, and what is blocked. The follow-through a meeting usually loses." },
  { title: "Announcements", body: "The things everyone needs once, without burying them in a chat. Pinned and durable." },
  { title: "Roles", body: "Pastors, elders, deacons, and team leaders, each seeing what is theirs to see." },
];

export default function LeadershipTeam() {
  return (
    <Layout>
      <SEOMeta title="The Leadership Team Workspace — Coming Soon" description="A shared workspace for pastors, elders, deacons, and ministry team leaders to work together: channels, tasks, and announcements in one place." url="https://www.livewellbyjamesbell.co/leadership/team" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The team workspace</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.03em", marginBottom: "18px", maxWidth: "18ch" }}>One place to lead together.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>A shared workspace for the people who carry a church. Channels for the conversations, tasks for the follow-through, announcements for the things that matter, with each office seeing what is theirs. It is being built now and will switch on once the team data layer is deployed.</p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {PLANNED.map((p) => (
            <div key={p.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
              <div style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{p.title}</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
