/**
 * The in-team workspace shell: a left sidebar (team switcher, channel list, and
 * section nav) and a main pane that swaps between channels, tasks,
 * announcements, and members.
 */
import { useEffect, useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import ChannelsPanel from "./ChannelsPanel";
import TasksPanel from "./TasksPanel";
import AnnouncementsPanel from "./AnnouncementsPanel";
import MembersPanel from "./MembersPanel";
import { ghostButton, input, muted, primaryButton } from "./ui";
import { ROLE_LABELS, type TeamRole } from "./types";

type Section = "channels" | "tasks" | "announcements" | "members";

type TeamSummary = {
  id: number;
  name: string;
  slug: string;
  inviteCode: string;
  createdByUserId: number;
  createdAt: Date | string;
  role: TeamRole;
};

const navItem = (active: boolean) => ({
  display: "block",
  width: "100%",
  textAlign: "left" as const,
  fontFamily: "var(--U)",
  fontWeight: 600,
  fontSize: "13px",
  color: active ? "var(--bone)" : "rgba(245,240,230,0.65)",
  background: active ? "rgba(212,160,23,0.18)" : "transparent",
  borderLeft: active ? "3px solid var(--mustard)" : "3px solid transparent",
  borderRadius: "0",
  padding: "8px 12px",
  cursor: "pointer",
});

export default function Workspace({
  teams,
  myUserId,
}: {
  teams: TeamSummary[];
  myUserId: number;
}) {
  const [activeTeamId, setActiveTeamId] = useState<number>(teams[0]?.id ?? 0);
  const [section, setSection] = useState<Section>("channels");
  const [activeChannelId, setActiveChannelId] = useState<number | null>(null);
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const utils = trpc.useUtils();

  // If the active team is no longer in the list (rare), fall back to the first.
  useEffect(() => {
    if (!teams.find((t) => t.id === activeTeamId) && teams[0]) {
      setActiveTeamId(teams[0].id);
    }
  }, [teams, activeTeamId]);

  const activeTeam = useMemo(
    () => teams.find((t) => t.id === activeTeamId) ?? teams[0],
    [teams, activeTeamId]
  );

  const channelsQuery = trpc.teamCollab.channel.list.useQuery(
    { teamId: activeTeam?.id ?? 0 },
    { enabled: !!activeTeam }
  );

  const createChannel = trpc.teamCollab.channel.create.useMutation({
    onSuccess: (channel) => {
      setNewChannelName("");
      setShowNewChannel(false);
      utils.teamCollab.channel.list.invalidate({ teamId: activeTeam!.id });
      if (channel?.id) setActiveChannelId(channel.id);
    },
    onError: (err) => toast.error(err.message),
  });

  const channels = channelsQuery.data ?? [];

  // Default the open channel to the first one once channels load.
  useEffect(() => {
    if (section === "channels" && activeChannelId === null && channels.length > 0) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, section, activeChannelId]);

  // Reset channel selection when switching teams.
  useEffect(() => {
    setActiveChannelId(null);
  }, [activeTeamId]);

  if (!activeTeam) return null;

  const myRole = activeTeam.role;
  const activeChannel = channels.find((c) => c.id === activeChannelId) ?? null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(220px, 260px) 1fr",
        gap: "0",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        minHeight: "70vh",
        background: "var(--card)",
      }}
    >
      {/* Sidebar */}
      <aside style={{ background: "var(--charcoal)", color: "var(--bone)", display: "flex", flexDirection: "column", padding: "var(--s-3) 0" }}>
        <div style={{ padding: "0 16px 12px" }}>
          {teams.length > 1 ? (
            <select
              value={activeTeam.id}
              onChange={(e) => setActiveTeamId(Number(e.target.value))}
              style={{
                ...input,
                background: "rgba(255,255,255,0.06)",
                color: "var(--bone)",
                border: "1px solid rgba(245,240,230,0.2)",
                fontFamily: "var(--F)",
                fontSize: "16px",
              }}
            >
              {teams.map((t) => (
                <option key={t.id} value={t.id} style={{ color: "#1A1A1A" }}>
                  {t.name}
                </option>
              ))}
            </select>
          ) : (
            <div style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--bone)" }}>
              {activeTeam.name}
            </div>
          )}
          <div style={{ ...muted, color: "rgba(245,240,230,0.55)", marginTop: "4px" }}>
            You are {ROLE_LABELS[myRole].toLowerCase()}
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", marginBottom: "12px" }}>
          <button style={navItem(section === "channels")} onClick={() => setSection("channels")}>Channels</button>
          <button style={navItem(section === "tasks")} onClick={() => setSection("tasks")}>Tasks</button>
          <button style={navItem(section === "announcements")} onClick={() => setSection("announcements")}>Announcements</button>
          <button style={navItem(section === "members")} onClick={() => setSection("members")}>Members</button>
        </nav>

        {section === "channels" && (
          <div style={{ borderTop: "1px solid rgba(245,240,230,0.12)", paddingTop: "12px" }}>
            <div style={{ ...muted, color: "rgba(245,240,230,0.55)", textTransform: "uppercase", letterSpacing: "0.14em", padding: "0 16px 6px", fontWeight: 600 }}>
              Channels
            </div>
            {channelsQuery.isLoading ? (
              <div style={{ ...muted, color: "rgba(245,240,230,0.55)", padding: "0 16px" }}>Loading.</div>
            ) : channels.length === 0 ? (
              <div style={{ ...muted, color: "rgba(245,240,230,0.55)", padding: "0 16px" }}>No channels yet.</div>
            ) : (
              channels.map((c) => (
                <button
                  key={c.id}
                  style={navItem(activeChannelId === c.id)}
                  onClick={() => setActiveChannelId(c.id)}
                >
                  # {c.name}
                </button>
              ))
            )}

            <div style={{ padding: "10px 16px 0" }}>
              {showNewChannel ? (
                <div>
                  <input
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="channel name"
                    style={{ ...input, marginBottom: "6px", background: "rgba(255,255,255,0.06)", color: "var(--bone)", border: "1px solid rgba(245,240,230,0.2)" }}
                  />
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => {
                        const name = newChannelName.trim();
                        if (name) createChannel.mutate({ teamId: activeTeam.id, name });
                      }}
                      disabled={createChannel.isPending || !newChannelName.trim()}
                      style={{ ...primaryButton, padding: "6px 12px", fontSize: "12px" }}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => { setShowNewChannel(false); setNewChannelName(""); }}
                      style={{ ...ghostButton, color: "var(--bone)", borderColor: "rgba(245,240,230,0.25)", padding: "6px 12px", fontSize: "12px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewChannel(true)}
                  style={{ ...ghostButton, color: "var(--bone)", borderColor: "rgba(245,240,230,0.25)", width: "100%", fontSize: "12px" }}
                >
                  + New channel
                </button>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Main pane */}
      <main style={{ padding: "var(--s-4)", background: "var(--bone)", overflow: "auto", minHeight: 0, height: "70vh" }}>
        {section === "channels" && (
          activeChannel ? (
            <ChannelsPanel channelId={activeChannel.id} channelName={activeChannel.name} />
          ) : (
            <p style={muted}>
              {channels.length === 0
                ? "Create a channel to start the conversation."
                : "Pick a channel from the left."}
            </p>
          )
        )}
        {section === "tasks" && <TasksPanel teamId={activeTeam.id} />}
        {section === "announcements" && <AnnouncementsPanel teamId={activeTeam.id} myRole={myRole} />}
        {section === "members" && (
          <MembersPanel teamId={activeTeam.id} inviteCode={activeTeam.inviteCode} myRole={myRole} myUserId={myUserId} />
        )}
      </main>
    </div>
  );
}
