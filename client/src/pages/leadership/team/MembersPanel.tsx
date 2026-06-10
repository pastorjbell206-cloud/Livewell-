/** Members list with roles and the invite code. A pastor can change roles. */
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { bodyText, card, heading, input, muted } from "./ui";
import { ROLE_LABELS, ROLE_OPTIONS, type TeamRole } from "./types";

export default function MembersPanel({
  teamId,
  inviteCode,
  myRole,
  myUserId,
}: {
  teamId: number;
  inviteCode: string;
  myRole: TeamRole;
  myUserId: number;
}) {
  const utils = trpc.useUtils();
  const membersQuery = trpc.teamCollab.team.members.useQuery({ teamId });

  const setRole = trpc.teamCollab.team.setRole.useMutation({
    onSuccess: () => utils.teamCollab.team.members.invalidate({ teamId }),
    onError: (err) => toast.error(err.message),
  });

  const isPastor = myRole === "pastor";
  const members = membersQuery.data ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ ...heading, fontSize: "22px" }}>Members</div>

      <div style={card}>
        <div style={{ ...muted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>
          Invite code
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <code style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: "16px", color: "var(--ink)", letterSpacing: "0.04em" }}>
            {inviteCode}
          </code>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(inviteCode).then(
                () => toast.success("Invite code copied"),
                () => toast.error("Could not copy")
              );
            }}
            style={{
              fontFamily: "var(--U)",
              fontWeight: 600,
              fontSize: "12px",
              color: "var(--mustard-text)",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "5px 12px",
              cursor: "pointer",
            }}
          >
            Copy
          </button>
        </div>
        <div style={{ ...muted, marginTop: "8px" }}>Share this code so others can join the team.</div>
      </div>

      {membersQuery.isLoading ? (
        <p style={muted}>Loading members.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {members.map((m) => (
            <div
              key={m.id}
              style={{ ...card, padding: "var(--s-3)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}
            >
              <div>
                <div style={{ ...bodyText, fontWeight: 600 }}>
                  {m.name || "A member"}
                  {m.userId === myUserId ? " (you)" : ""}
                </div>
                {m.email && <div style={muted}>{m.email}</div>}
              </div>
              {isPastor ? (
                <select
                  value={m.role}
                  onChange={(e) => setRole.mutate({ teamId, userId: m.userId, role: e.target.value as TeamRole })}
                  disabled={setRole.isPending}
                  style={{ ...input, width: "auto", padding: "6px 10px", fontSize: "13px" }}
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {ROLE_LABELS[r]}
                    </option>
                  ))}
                </select>
              ) : (
                <span style={{ ...muted, fontWeight: 600 }}>{ROLE_LABELS[m.role as TeamRole]}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
