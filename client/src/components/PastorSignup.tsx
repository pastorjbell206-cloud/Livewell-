/**
 * PastorSignup — the on-site step of the pastor funnel.
 *
 * Before this existed, the pastors pages handed readers straight to the
 * external PCN link and the platform kept nothing. This captures the email
 * first — recorded with the pastor segment — and then presents the network
 * link as the next step, so the handoff still happens but the relationship
 * is ours too.
 */
import { useState } from "react";
import { ExternalLink } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { useToast } from "@/contexts/ToastContext";

interface PastorSignupProps {
  /** Where this form sits (attribution) — recorded on the subscriber row. */
  source: string;
  /** The external PCN join link, shown as the next step after capture. */
  networkUrl?: string | null;
}

export function PastorSignup({ source, networkUrl }: PastorSignupProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const toastCtx = useToast();
  const addToast = toastCtx?.addToast;

  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: () => setDone(true),
    onError: () => {
      addToast?.({
        type: "error",
        title: "That didn't go through",
        message: "Check the email address and try once more.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email, source, audienceType: "pastor" });
  };

  if (done) {
    return (
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--mustard)",
          padding: "var(--s-4)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--F)",
            fontSize: "24px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            marginBottom: "10px",
          }}
        >
          You're on the list
        </h3>
        <p
          style={{
            fontFamily: "var(--B)",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--ink-muted)",
            marginBottom: "14px",
            maxWidth: "55ch",
          }}
        >
          The pastoral letter will come to that address. In the meantime, here
          is something you can put in your people&rsquo;s hands this week — a
          study guide with a leader&rsquo;s copy and a participant handout, free
          to use in your church.
        </p>
        <a
          href="/studyguides"
          style={{
            display: "inline-block",
            marginBottom: "18px",
            fontFamily: "var(--U)",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--mustard-text)",
            textDecoration: "none",
          }}
        >
          Open the study-guide library &rarr;
        </a>
        <div />
        {networkUrl ? (
          <a
            href={networkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 22px",
              background: "var(--mustard)",
              color: "var(--ink)",
              textDecoration: "none",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <ExternalLink size={16} /> Join the Pastors Connection Network
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderLeft: "2px solid var(--mustard)",
        padding: "var(--s-4)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--F)",
          fontSize: "24px",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
          marginBottom: "10px",
        }}
      >
        Start with the letter
      </h3>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--ink-muted)",
          marginBottom: "16px",
          maxWidth: "55ch",
        }}
      >
        Leave your email and you'll get the writing for pastors first — the
        essays on the weight of the work, the resources you can hand to your
        people, and the invitation to the network when you're ready.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email address"
          style={{
            flex: "1 1 220px",
            padding: "12px 14px",
            background: "var(--bone)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--B)",
            fontSize: "16px",
            color: "var(--ink)",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={subscribe.isPending}
          style={{
            padding: "12px 22px",
            background: "var(--ink)",
            color: "var(--bone)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--U)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: subscribe.isPending ? "wait" : "pointer",
          }}
        >
          {subscribe.isPending ? "Sending…" : "Send me the letter"}
        </button>
      </form>
    </div>
  );
}

export default PastorSignup;
