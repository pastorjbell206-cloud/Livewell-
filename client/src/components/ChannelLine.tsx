/**
 * ChannelLine — one quiet line at the end of an essay naming where else James
 * writes, read from lib/channels.ts so it can never drift from the footer, the
 * Connect page, or the Person schema. Deliberately small: it sits under the
 * essay's one primary next step and never competes with it.
 */
import { Link } from "wouter";
import { liveChannels } from "@/lib/channels";

const link = { color: "var(--ink)", backgroundImage: "none", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "4px" } as const;

export default function ChannelLine() {
  const channels = liveChannels();
  if (!channels.length) return null;
  return (
    <div style={{ background: "var(--bone)", padding: "var(--s-4)", borderTop: "1px solid var(--border)" }}>
      <p style={{ maxWidth: "var(--w-prose)", margin: "0 auto", fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.8, color: "var(--ink-muted)" }}>
        <span style={{ color: "var(--ink)", fontWeight: 600 }}>James also writes elsewhere:</span>{" "}
        {channels.map((c, i) => (
          <span key={c.id}>
            <a href={c.url} target="_blank" rel="noopener noreferrer" style={link}>{c.label}</a>
            {i < channels.length - 1 ? " · " : ""}
          </span>
        ))}
        {" · "}
        <Link href="/connect" style={{ ...link, fontWeight: 600 }}>Everywhere James is</Link>
      </p>
    </div>
  );
}
