/** Announcements: a durable list, with a create form shown only to allowed roles. */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { bodyText, card, heading, input, muted, primaryButton } from "./ui";
import { ANNOUNCEMENT_ROLES, formatDateTime, type TeamRole } from "./types";

export default function AnnouncementsPanel({ teamId, myRole }: { teamId: number; myRole: TeamRole }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const utils = trpc.useUtils();

  const canPost = ANNOUNCEMENT_ROLES.includes(myRole);

  const listQuery = trpc.teamCollab.announcement.list.useQuery({ teamId });

  const create = trpc.teamCollab.announcement.create.useMutation({
    onSuccess: () => {
      setTitle("");
      setBody("");
      utils.teamCollab.announcement.list.invalidate({ teamId });
    },
    onError: (err) => toast.error(err.message),
  });

  const items = listQuery.data ?? [];

  const submit = () => {
    const t = title.trim();
    const b = body.trim();
    if (!t || !b) return;
    create.mutate({ teamId, title: t, body: b });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ ...heading, fontSize: "22px" }}>Announcements</div>

      {canPost && (
        <div style={card}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
            style={{ ...input, marginBottom: "10px" }}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What does the team need to know"
            rows={3}
            style={{ ...input, resize: "vertical", marginBottom: "10px" }}
          />
          <button
            onClick={submit}
            disabled={create.isPending || !title.trim() || !body.trim()}
            style={{ ...primaryButton, opacity: create.isPending || !title.trim() || !body.trim() ? 0.6 : 1 }}
          >
            {create.isPending ? "Posting" : "Post announcement"}
          </button>
        </div>
      )}

      {listQuery.isLoading ? (
        <p style={muted}>Loading announcements.</p>
      ) : items.length === 0 ? (
        <p style={muted}>Nothing posted yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((a) => (
            <div key={a.id} style={{ ...card, borderTop: "3px solid var(--mustard)" }}>
              <div style={{ ...heading, fontSize: "18px", marginBottom: "4px" }}>{a.title}</div>
              <div style={{ ...muted, marginBottom: "10px" }}>
                {a.authorName || "A leader"} · {formatDateTime(a.createdAt)}
              </div>
              <div style={{ ...bodyText, whiteSpace: "pre-wrap" }}>{a.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
