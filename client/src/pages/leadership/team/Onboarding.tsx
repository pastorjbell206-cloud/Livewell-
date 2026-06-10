/** Shown to a signed-in member of no teams: create a team or join one by code. */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { card, heading, input, muted, primaryButton } from "./ui";

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const createTeam = trpc.teamCollab.team.create.useMutation({
    onSuccess: () => { toast.success("Team created"); onDone(); },
    onError: (err) => toast.error(err.message),
  });

  const joinTeam = trpc.teamCollab.team.joinByCode.useMutation({
    onSuccess: () => { toast.success("You joined the team"); onDone(); },
    onError: (err) => toast.error(err.message),
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
      <div style={{ ...card, borderTop: "3px solid var(--mustard)" }}>
        <div style={{ ...heading, fontSize: "22px", marginBottom: "6px" }}>Create a team</div>
        <p style={{ ...muted, marginBottom: "14px" }}>
          Start a workspace for your leadership team. You become its first pastor and can invite the rest.
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Team name, e.g. FBC Fenton Elders"
          style={{ ...input, marginBottom: "12px" }}
        />
        <button
          onClick={() => { const n = name.trim(); if (n) createTeam.mutate({ name: n }); }}
          disabled={createTeam.isPending || !name.trim()}
          style={{ ...primaryButton, opacity: createTeam.isPending || !name.trim() ? 0.6 : 1 }}
        >
          {createTeam.isPending ? "Creating" : "Create team"}
        </button>
      </div>

      <div style={card}>
        <div style={{ ...heading, fontSize: "22px", marginBottom: "6px" }}>Join a team</div>
        <p style={{ ...muted, marginBottom: "14px" }}>
          Have an invite code from your team lead. Enter it here to join.
        </p>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Invite code"
          style={{ ...input, marginBottom: "12px" }}
        />
        <button
          onClick={() => { const c = code.trim(); if (c) joinTeam.mutate({ inviteCode: c }); }}
          disabled={joinTeam.isPending || !code.trim()}
          style={{ ...primaryButton, opacity: joinTeam.isPending || !code.trim() ? 0.6 : 1 }}
        >
          {joinTeam.isPending ? "Joining" : "Join team"}
        </button>
      </div>
    </div>
  );
}
