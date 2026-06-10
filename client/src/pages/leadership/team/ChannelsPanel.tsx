/** Channel conversation view: posts oldest-to-newest with a composer at the bottom. */
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { bodyText, heading, input, muted, primaryButton } from "./ui";
import { formatDateTime } from "./types";

export default function ChannelsPanel({ channelId, channelName }: { channelId: number; channelName: string }) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const utils = trpc.useUtils();

  const postsQuery = trpc.teamCollab.post.list.useQuery(
    { channelId },
    { refetchInterval: 5000 }
  );

  const createPost = trpc.teamCollab.post.create.useMutation({
    onSuccess: () => {
      setDraft("");
      utils.teamCollab.post.list.invalidate({ channelId });
    },
    onError: (err) => toast.error(err.message),
  });

  const posts = postsQuery.data ?? [];

  // Keep the log pinned to the newest message as it grows.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [posts.length]);

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    createPost.mutate({ channelId, body });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px", marginBottom: "12px" }}>
        <div style={{ ...heading, fontSize: "22px" }}># {channelName}</div>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", minHeight: 0, paddingRight: "4px" }}>
        {postsQuery.isLoading ? (
          <p style={muted}>Loading the conversation.</p>
        ) : posts.length === 0 ? (
          <p style={muted}>No messages yet. Start the conversation below.</p>
        ) : (
          posts.map((p) => (
            <div key={p.id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "2px" }}>
                <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>
                  {p.authorName || "A member"}
                </span>
                <span style={{ ...muted, fontSize: "12px" }}>{formatDateTime(p.createdAt)}</span>
              </div>
              <div style={{ ...bodyText, whiteSpace: "pre-wrap" }}>{p.body}</div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              send();
            }
          }}
          placeholder={`Message #${channelName}`}
          rows={2}
          style={{ ...input, resize: "none", flex: 1 }}
        />
        <button
          onClick={send}
          disabled={createPost.isPending || !draft.trim()}
          style={{ ...primaryButton, alignSelf: "flex-end", opacity: createPost.isPending || !draft.trim() ? 0.6 : 1 }}
        >
          {createPost.isPending ? "Sending" : "Send"}
        </button>
      </div>
    </div>
  );
}
