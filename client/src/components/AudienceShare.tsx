/**
 * AudienceShare — three buttons that replace the single "share" CTA.
 *
 * Bell's three-audience model (skeptic / pastor / spouse) is unique in the
 * theology field. The share menu honors it: each button opens a mailto with
 * a different pre-filled note appropriate to that relationship.
 *
 * Replaces the original SendToPastor (kept as an alias for legacy callers).
 */
import { useState } from "react";
import { Mail, Send, Users } from "lucide-react";

interface AudienceShareProps {
  title: string;
  url: string;
}

type Recipient = "skeptic" | "pastor" | "spouse";

const NOTES: Record<Recipient, { subject: string; body: string; label: string; icon: typeof Mail }> = {
  skeptic: {
    label: "Send to a skeptic",
    icon: Send,
    subject: "Saw this and thought of you",
    body:
      "Not trying to convert you — but this essay takes the questions seriously. Curious what you'd push back on.\n\n",
  },
  pastor: {
    label: "Send to a pastor",
    icon: Users,
    subject: "Thought you might want to read this",
    body:
      "I read this and thought of you. From a pastor who knows the work.\n\n",
  },
  spouse: {
    label: "Send to your spouse",
    icon: Mail,
    subject: "Read this when you have ten quiet minutes",
    body:
      "I want to talk about this when we get a minute.\n\n",
  },
};

export function AudienceShare({ title, url }: AudienceShareProps) {
  const [open, setOpen] = useState(false);

  const buildMailto = (r: Recipient) => {
    const { subject, body } = NOTES[r];
    const fullBody = `${body}"${title}"\n${url}\n\n— Forwarded from LiveWell by James Bell`;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Share this essay"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 16px",
          fontFamily: "var(--U)",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--ink-muted)",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <Mail size={14} aria-hidden />
        Send to…
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-modal)",
            padding: "6px",
            minWidth: "240px",
            zIndex: 10,
          }}
        >
          {(Object.keys(NOTES) as Recipient[]).map(recipient => {
            const Icon = NOTES[recipient].icon;
            return (
              <a
                key={recipient}
                role="menuitem"
                href={buildMailto(recipient)}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.background = "var(--bone-warm)")
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <Icon size={14} aria-hidden style={{ color: "var(--mustard)" }} />
                {NOTES[recipient].label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AudienceShare;
