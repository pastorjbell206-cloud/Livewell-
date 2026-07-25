/**
 * NewsletterSignup — the single, real newsletter form.
 *
 * All other (fake) forms in the codebase have been replaced with this
 * component. The submit handler calls the real trpc.subscribers.subscribe
 * mutation; no silent failures.
 */
import { useState } from "react";
import { Mail } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { useToast } from "@/contexts/ToastContext";
import { substackSubscribeUrl } from "@/lib/site";
import { trackNewsletterSignup } from "@/lib/telemetry";

interface NewsletterSignupProps {
  variant?: "inline" | "footer" | "minimal";
  title?: string;
  description?: string;
  /** Where this signup was placed; helps with conversion attribution. */
  source?: string;
  /**
   * Which audience this placement implies (e.g. the pastors pages tag
   * "pastor") — recorded on the subscriber row for the welcome sequence.
   */
  audienceType?: "skeptic" | "christian" | "pastor" | "exploring";
}

export function NewsletterSignup({
  variant = "inline",
  title = "One serious essay a week",
  description = "Theology that meets the actual Tuesday afternoon of marriage, money, parenting, and doubt. Written slow, sent once a week. No spam, ever.",
  source,
  audienceType,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  // The essay itself is delivered by Substack, which has no signup API — so
  // after recording the email here, we surface the confirm link instead of
  // pretending the local row finished the job.
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);
  const toastCtx = useToast();
  const addToast = toastCtx?.addToast;
  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: (_data, variables) => {
      trackNewsletterSignup(variables.source, variables.audienceType);
      setHandoffUrl(substackSubscribeUrl(variables.email, source));
      addToast?.({
        type: "success",
        title: "One more step",
        message: "You're on our list — confirm on Substack to get the essays.",
      });
      setEmail("");
    },
    onError: error => {
      console.error(error);
      addToast?.({
        type: "error",
        title: "Subscription failed",
        message: "That didn't go through. Check the email address and try once more.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email, source, audienceType });
  };

  // Shared post-signup state: the local record is saved; the Substack
  // confirmation is what actually starts the essays arriving.
  const confirmLink = (onDark: boolean) =>
    handoffUrl ? (
      <p
        role="status"
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          lineHeight: 1.6,
          color: onDark ? "rgba(245,240,230,0.8)" : "var(--ink-muted)",
          margin: 0,
        }}
      >
        You're on our list.{" "}
        <a
          href={handoffUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: onDark ? "var(--mustard)" : "var(--ink)",
            textDecorationColor: "var(--mustard)",
            fontWeight: 600,
          }}
        >
          Confirm on Substack
        </a>{" "}
        to start getting the essays.
      </p>
    ) : null;

  if (variant === "footer") {
    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Mail size={18} aria-hidden style={{ color: "var(--mustard)" }} />
          <span
            style={{
              fontFamily: "var(--F)",
              fontWeight: 500,
              fontSize: "16px",
              color: "var(--bone)",
            }}
          >
            {title}
          </span>
        </div>
        {handoffUrl ? (
          confirmLink(true)
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Email address"
              style={{
                flex: "1 1 140px",
                minWidth: 0,
                padding: "10px 12px",
                background: "var(--charcoal-soft)",
                border: "1px solid var(--charcoal-soft)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--B)",
                fontSize: "16px",
                color: "var(--bone)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={subscribe.isPending}
              style={{
                padding: "13px 18px",
                minHeight: "44px",
                background: "var(--mustard)",
                color: "var(--ink)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--U)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: subscribe.isPending ? "wait" : "pointer",
              }}
            >
              {subscribe.isPending ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
        )}
      </form>
    );
  }

  if (variant === "minimal") {
    if (handoffUrl) return <div style={{ maxWidth: "420px" }}>{confirmLink(false)}</div>;
    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "420px" }}
      >
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email address"
          style={{
            flex: "1 1 180px",
            minWidth: 0,
            padding: "12px 14px",
            background: "var(--card)",
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
                minHeight: "44px",
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
          {subscribe.isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
    );
  }

  // inline (default)
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
          fontSize: "22px",
          fontWeight: 500,
          color: "var(--ink)",
          marginBottom: "8px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--ink-muted)",
          marginBottom: "16px",
          maxWidth: "55ch",
        }}
      >
        {description}
      </p>
      {handoffUrl ? (
        confirmLink(false)
      ) : (
      <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email address"
          style={{
            flex: "1 1 180px",
            minWidth: 0,
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
                minHeight: "44px",
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
          {subscribe.isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      )}
    </div>
  );
}

export default NewsletterSignup;
