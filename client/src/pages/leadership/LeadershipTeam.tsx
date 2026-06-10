/**
 * The Leadership Team workspace (/leadership/team). A private collaboration
 * space for a church leadership team: channels for conversation, tasks for
 * follow-through, announcements for the durable things, all scoped to a team
 * you create or join by invite code.
 *
 * States handled here:
 *  - loading auth
 *  - not signed in (a panel that sends the visitor to the existing sign-in)
 *  - signed in, member of no teams (create or join)
 *  - signed in, in one or more teams (the full workspace)
 *  - the data layer is not yet migrated (a friendly "being set up" panel)
 *
 * Authorization lives on the server. This page only renders what the API
 * returns for the signed-in user.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import Onboarding from "./team/Onboarding";
import Workspace from "./team/Workspace";
import { card, heading, muted, primaryButton } from "./team/ui";
import type { TeamRole } from "./team/types";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

function Hero() {
  return (
    <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
      <div style={wrap}>
        <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
          <Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The team workspace
        </div>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.03em", marginBottom: "16px", maxWidth: "18ch" }}>
          One place to lead together.
        </h1>
        <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>
          A shared workspace for the people who carry a church. Channels for the conversations, tasks for the follow-through, announcements for the things that matter, with each office seeing what is theirs.
        </p>
      </div>
    </section>
  );
}

export default function LeadershipTeam() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const teamsQuery = trpc.teamCollab.team.listMine.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  return (
    <Layout>
      <SEOMeta
        title="The Leadership Team Workspace"
        description="A shared workspace for pastors, elders, deacons, and ministry team leaders: channels, tasks, and announcements in one place."
        url="https://www.livewellbyjamesbell.co/leadership/team"
      />

      <Hero />

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {authLoading ? (
            <p style={muted}>Loading.</p>
          ) : !isAuthenticated ? (
            <div style={{ ...card, borderTop: "3px solid var(--mustard)", maxWidth: "560px" }}>
              <div style={{ ...heading, fontSize: "24px", marginBottom: "8px" }}>Sign in to your team</div>
              <p style={{ ...muted, fontSize: "15px", marginBottom: "18px" }}>
                The workspace is private to your leadership team. Sign in with your account to create a team or join one with an invite code.
              </p>
              <a href={getLoginUrl()} style={{ ...primaryButton, display: "inline-block", textDecoration: "none" }}>
                Sign in
              </a>
            </div>
          ) : teamsQuery.isLoading ? (
            <p style={muted}>Loading your teams.</p>
          ) : (teamsQuery.data ?? []).length === 0 ? (
            <Onboarding onDone={() => teamsQuery.refetch()} />
          ) : (
            <Workspace
              teams={(teamsQuery.data ?? []).map((t) => ({ ...t, role: t.role as TeamRole }))}
              myUserId={user!.id}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}
